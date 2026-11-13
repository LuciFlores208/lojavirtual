<?php
require_once __DIR__ . "/ModeloBase.php";

class Produto extends ModeloBase
{
    // O nome da categoria vem do relacionamento, sem repetir texto em produtos.
    private $consultaBase = 'SELECT produtos.*, categorias.nome AS categoria
                            FROM produtos
                            INNER JOIN categorias ON categorias.id = produtos.categoria_id';

    public function listar($categoriaId = null)
    {
        $sql = $this->consultaBase;
        $parametros = [];

        if ($categoriaId !== null) {
            $sql .= " WHERE produtos.categoria_id = ?";
            $parametros[] = $categoriaId;
        }

        $sql .= " ORDER BY produtos.id";
        $consulta = $this->conexao->prepare($sql);
        $consulta->execute($parametros);
        return $consulta->fetchAll();
    }

    public function buscar($id, $bloquear = false)
    {
        $sql = $this->consultaBase . " WHERE produtos.id = ?";

        if ($bloquear) {
            $sql .= " FOR UPDATE";
        }

        $consulta = $this->conexao->prepare($sql);
        $consulta->execute([$id]);
        $produto = $consulta->fetch();

        if (!$produto) {
            throw new ErroHttp("Produto não encontrado.", 404);
        }

        return $produto;
    }

    // Compartilha a transação de um pedido ao bloquear estoque.
    public function usarConexao($conexao)
    {
        $this->conexao = $conexao;
    }
}
