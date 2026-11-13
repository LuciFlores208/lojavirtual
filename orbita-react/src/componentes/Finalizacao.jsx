import React, { useState } from "react";
import {
  criarPedido,
  simularPagamento,
  consultarPedido,
} from "../servicos/api.js";
import { formatarMoeda, calcularTotal } from "../servicos/carrinho.js";
export default function Finalizacao({ itens, aoConcluir, aoVoltar, aoFechar }) {
  const [nome, definirNome] = useState("");
  const [email, definirEmail] = useState("");
  const [pedido, definirPedido] = useState(null);
  const [ocupado, definirOcupado] = useState(false);
  const [erro, definirErro] = useState("");
  async function enviarPedido(evento) {
    evento.preventDefault();
    definirOcupado(true);
    definirErro("");
    try {
      const novo = await criarPedido({
        nome,
        email,
        itens: itens.map((item) => ({
          produto_id: item.produto.id,
          quantidade: item.quantidade,
        })),
      });
      definirPedido(novo);
    } catch (falha) {
      definirErro(falha.message);
    } finally {
      definirOcupado(false);
    }
  }
  async function pagar(resultado) {
    definirOcupado(true);
    definirErro("");
    try {
      const atualizado = await simularPagamento(pedido.codigo, resultado);
      definirPedido(atualizado);
      if (atualizado.status === "pago") aoConcluir();
    } catch (falha) {
      definirErro(falha.message);
    } finally {
      definirOcupado(false);
    }
  }
  async function recuperar() {
    definirOcupado(true);
    definirErro("");
    try {
      const atualizado = await consultarPedido(pedido.codigo);
      definirPedido(atualizado);
      if (atualizado.status === "pago") aoConcluir();
    } catch (falha) {
      definirErro(falha.message);
    } finally {
      definirOcupado(false);
    }
  }
  return (
    <>
      <button
        className="fechar"
        disabled={ocupado}
        onClick={aoFechar}
        aria-label="Fechar compra"
      >
        ×
      </button>
      <p className="sobretitulo">
        {pedido?.status === "pago"
          ? "COMPRA CONCLUÍDA"
          : pedido
            ? "ETAPA 2 DE 2 / PAGAMENTO"
            : "ETAPA 1 DE 2 / IDENTIFICAÇÃO"}
      </p>
      <h2 id="titulo-dialogo">
        {pedido?.status === "pago"
          ? "Tudo certo com sua compra."
          : pedido
            ? "Vamos testar o pagamento?"
            : "Falta pouco para finalizar."}
      </h2>
      <p className="aviso-simulacao">
        Ambiente didático. Use dados fictícios. Não informe cartão, CPF ou
        senha.
      </p>
      {erro && (
        <p role="alert" className="erro">
          {erro}
        </p>
      )}
      {!pedido ? (
        <form onSubmit={enviarPedido}>
          <label className="campo">
            Nome
            <input
              autoComplete="off"
              required
              maxLength="100"
              value={nome}
              onChange={(evento) => definirNome(evento.target.value)}
              placeholder="Aluno Exemplo"
            />
          </label>
          <label className="campo">
            E-mail
            <input
              autoComplete="off"
              type="email"
              required
              maxLength="150"
              value={email}
              onChange={(evento) => definirEmail(evento.target.value)}
              placeholder="aluno@example.com"
            />
          </label>
          <div className="resumo">
            <p>
              {itens.reduce((soma, item) => soma + item.quantidade, 0)} itens{" "}
              <strong>{formatarMoeda(calcularTotal(itens))}</strong>
            </p>
            <p className="texto-apoio">
              O servidor confirma o preço e a disponibilidade.
            </p>
          </div>
          <button
            disabled={ocupado || !itens.length}
            className="botao principal largura"
          >
            {ocupado ? "Criando pedido…" : "Criar pedido →"}
          </button>
          <button type="button" className="botao-texto" onClick={aoVoltar}>
            Voltar à sacola
          </button>
        </form>
      ) : (
        <div>
          <p className="codigo-pedido">
            Código do pedido <code>{pedido.codigo}</code>
          </p>
          <ul className="lista-resumo">
            {pedido.itens.map((item) => (
              <li key={item.produto_id}>
                {item.quantidade} × {item.nome}
                <strong>
                  {formatarMoeda(item.preco_centavos * item.quantidade)}
                </strong>
              </li>
            ))}
          </ul>
          <p className="total">
            Total confirmado{" "}
            <strong>{formatarMoeda(pedido.total_centavos)}</strong>
          </p>
          {pedido.status === "pago" ? (
            <>
              <p className="sucesso" role="status">
                Pagamento simulado aprovado. Pedido registrado!
              </p>
              <button className="botao principal largura" onClick={aoFechar}>
                Voltar para a loja
              </button>
            </>
          ) : (
            <>
              {pedido.status === "recusado" && (
                <p className="erro" role="status">
                  Simulação recusada. Você pode tentar aprovar o mesmo pedido.
                </p>
              )}
              <p className="texto-apoio">
                Escolha o resultado da simulação. Não existe integração bancária
                neste exemplo.
              </p>
              <button
                disabled={ocupado}
                className="botao principal largura"
                onClick={() => pagar("aprovado")}
              >
                {ocupado ? "Processando…" : "Simular aprovação"}
              </button>
              <button
                disabled={ocupado}
                className="botao secundaria largura"
                onClick={() => pagar("recusado")}
              >
                Simular recusa
              </button>
              <button
                disabled={ocupado}
                className="botao-texto"
                onClick={recuperar}
              >
                Consultar situação do pedido
              </button>
              <p className="texto-apoio">
                Se houver falha de rede, consulte a situação antes de tentar
                novamente.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
