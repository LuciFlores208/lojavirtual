import React from "react";
import DesenhoProduto from "./DesenhoProduto.jsx";
import { formatarMoeda } from "../servicos/carrinho.js";
export default function CartaoProduto({ produto, aoAdicionar, aoDetalhar }) {
  return (
    <article className="cartao-produto">
      <button
        className="imagem-produto"
        onClick={() => aoDetalhar(produto.id)}
        aria-label={`Ver detalhes de ${produto.nome}`}
        style={{ background: produto.cor + "44" }}
      >
        <DesenhoProduto tipo={produto.desenho} cor={produto.cor} />
        <span className="etiqueta">
          {produto.estoque === 0 ? "Sem estoque" : produto.categoria}
        </span>
        <span className="seta-detalhe">↗</span>
      </button>
      <div className="produto-info">
        <button className="nome-produto" onClick={() => aoDetalhar(produto.id)}>
          {produto.nome}
        </button>
        <p>
          {produto.categoria} <span>• {produto.estoque} disponíveis</span>
        </p>
        <div className="preco-linha">
          <strong>{formatarMoeda(produto.preco_centavos)}</strong>
          <button
            className="adicionar"
            disabled={!produto.estoque}
            onClick={() => aoAdicionar(produto)}
            aria-label={`Adicionar ${produto.nome} à sacola`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
