import React from "react";
export default function Cabecalho({ quantidade, aoAbrirCarrinho }) {
  return (
    <>
      <div className="faixa">
        LOJA ESCOLA <span>React + PHP + MySQL</span>
        <a href="/material.html">Aprenda a construir ↗</a>
      </div>
      <header className="cabecalho">
        <a className="marca" href="/" aria-label="Órbita início">
          <span className="simbolo">◉</span> órbita
          <span className="marca-pequena">tecnologia para o seu espaço</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#catalogo">Explorar produtos</a>
          <a href="/apresentacao.html">O projeto ↗</a>
          <button className="botao-carrinho" onClick={aoAbrirCarrinho}>
            Sacola <span>{quantidade}</span>
          </button>
        </nav>
      </header>
    </>
  );
}
