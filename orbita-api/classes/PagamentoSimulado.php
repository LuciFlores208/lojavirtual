<?php
// Uso exclusivamente didático. Não representa um gateway de pagamento.
class PagamentoSimulado
{
    private $conexao;
    private $produtos;
    private $pedidos;

    public function __construct()
    {
        $this->conexao = Conexao::conectar();
        $this->produtos = new Produto();
        $this->produtos->usarConexao($this->conexao);
        $this->pedidos = new Pedido();
    }

    public function processar(string $codigo, array $dados): array
    {
        $resultado = $dados["resultado"] ?? "";
        if (!in_array($resultado, ["aprovado", "recusado"], true)) {
            throw new ErroHttp("Resultado da simulação inválido.", 422);
        }
        $this->conexao->beginTransaction();
        try {
            // Primeiro bloqueia o pedido para impedir duas baixas simultâneas.
            $consulta = $this->conexao->prepare(
                "SELECT id, status FROM pedidos WHERE codigo = ? FOR UPDATE",
            );
            $consulta->execute([$codigo]);
            $registro = $consulta->fetch();
            if (!$registro) {
                throw new ErroHttp("Pedido não encontrado.", 404);
            }
            if ($registro["status"] !== "pago") {
                if ($resultado === "aprovado") {
                    $pedido = $this->pedidos->consultar($codigo);
                    // Ordem fixa de produto_id reduz a possibilidade de deadlock entre pedidos.
                    foreach ($pedido["itens"] as $item) {
                        $produto = $this->produtos->buscar($item["produto_id"], true);
                        if ($produto["estoque"] < $item["quantidade"]) {
                            throw new ErroHttp(
                                "Estoque insuficiente para concluir o pagamento.",
                                409,
                            );
                        }
                    }
                    $baixa = $this->conexao->prepare(
                        "UPDATE produtos SET estoque = estoque - ? WHERE id = ?",
                    );
                    foreach ($pedido["itens"] as $item) {
                        $baixa->execute([$item["quantidade"], $item["produto_id"]]);
                    }
                }
                $atualizacao = $this->conexao->prepare(
                    "UPDATE pedidos SET status = ? WHERE id = ?",
                );
                $atualizacao->execute([
                    $resultado === "aprovado" ? "pago" : "recusado",
                    $registro["id"],
                ]);
            }
            $this->conexao->commit();
        } catch (Throwable $erro) {
            if ($this->conexao->inTransaction()) {
                $this->conexao->rollBack();
            }
            throw $erro;
        }
        return $this->pedidos->consultar($codigo);
    }
}
