import React from "react";
import { formatarMoeda, calcularTotal } from "../servicos/carrinho.js";
import DesenhoProduto from "./DesenhoProduto.jsx";
export default function Carrinho({ itens, aoAlterar, aoAvancar, aoFechar }) {
  return (
    <>
      <button className="fechar" onClick={aoFechar} aria-label="Fechar sacola">
        ×
      </button>
      <p className="sobretitulo">SUAS ESCOLHAS</p>
      <h2 id="titulo-dialogo">Sua sacola</h2>
      {itens.length === 0 ? (
        <div className="estado">
          <p>Sua sacola ainda está vazia.</p>
          <button className="botao principal" onClick={aoFechar}>
            Explorar produtos
          </button>
        </div>
      ) : (
        <>
          <ul className="itens-sacola">
            {itens.map(({ produto, quantidade }) => (
              <li key={produto.id}>
                <div className="miniatura">
                  <DesenhoProduto tipo={produto.desenho} cor={produto.cor} />
                </div>
                <div className="item-dados">
                  <strong>{produto.nome}</strong>
                  <span>{formatarMoeda(produto.preco_centavos)}</span>
                  <div className="quantidade">
                    <button
                      onClick={() => aoAlterar(produto.id, quantidade - 1)}
                      aria-label={`Diminuir ${produto.nome}`}
                    >
                      −
                    </button>
                    <span aria-label={`Quantidade ${quantidade}`}>
                      {quantidade}
                    </span>
                    <button
                      disabled={quantidade >= produto.estoque}
                      onClick={() => aoAlterar(produto.id, quantidade + 1)}
                      aria-label={`Aumentar ${produto.nome}`}
                    >
                      +
                    </button>
                    <button
                      className="remover"
                      onClick={() => aoAlterar(produto.id, 0)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="resumo">
            <p>
              Frete demonstrativo <strong>Grátis</strong>
            </p>
            <p className="total">
              Total <strong>{formatarMoeda(calcularTotal(itens))}</strong>
            </p>
          </div>
          <p className="texto-apoio">
            Nenhuma cobrança será realizada nesta loja escola.
          </p>
          <button className="botao principal largura" onClick={aoAvancar}>
            Continuar compra →
          </button>
        </>
      )}
    </>
  );
}
