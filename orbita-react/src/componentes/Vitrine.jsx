import React, { useState } from "react";
import CartaoProduto from "./CartaoProduto.jsx";
import DesenhoProduto from "./DesenhoProduto.jsx";
export default function Vitrine({
  produtos,
  carregando,
  erro,
  aoRecarregar,
  aoAdicionar,
  aoDetalhar,
}) {
  const [busca, definirBusca] = useState("");
  const [categoria, definirCategoria] = useState("Todos");
  const categorias = ["Todos", "Áudio", "Periféricos", "Mesa"];
  const visiveis = produtos.filter(
    (produto) =>
      (categoria === "Todos" || produto.categoria === categoria) &&
      produto.nome
        .toLocaleLowerCase("pt-BR")
        .includes(busca.toLocaleLowerCase("pt-BR")),
  );
  return (
    <>
      <section className="abertura">
        <div className="abertura-texto">
          <p className="sobretitulo">
            <span /> CURADORIA PARA O DIA A DIA
          </p>
          <h1>
            Seu espaço.
            <br />
            Sua próxima
            <br />
            <em>boa ideia.</em>
          </h1>
          <p>
            Tecnologia que acompanha o seu ritmo.
            <br />
            Encontre o que falta na sua mesa.
          </p>
          <a href="#catalogo" className="botao principal">
            Explorar a coleção <span>↗</span>
          </a>
          <div className="nota-abertura">
            PROJETO DIDÁTICO{" "}
            <span>Produtos fictícios. Nenhuma cobrança real.</span>
          </div>
        </div>
        <div className="abertura-visual">
          <div className="orbita-decorativa" />
          <span className="rotulo-visual">ESSENCIAIS ÓRBITA / 01</span>
          <DesenhoProduto tipo="fone" cor="#dce0ce" grande />
          <div className="destaque-produto">
            <div>
              <small>DESTAQUE DA COLEÇÃO</small>
              <strong>Fone Aurora</strong>
              <span>Som para acompanhar suas ideias.</span>
            </div>
            <button aria-label="Ver Fone Aurora" onClick={() => aoDetalhar(1)}>
              ↗
            </button>
          </div>
          <span className="selo">
            Menos ruído.
            <br />
            Mais foco.
          </span>
        </div>
      </section>
      <div className="beneficios">
        <p>
          <b>01</b> Design para o cotidiano
        </p>
        <p>
          <b>02</b> Compra em poucos passos
        </p>
        <p>
          <b>03</b> Pagamento simulado
        </p>
      </div>
      <section id="catalogo" className="catalogo">
        <div className="titulo-catalogo">
          <div>
            <p className="sobretitulo">ESCOLHAS QUE FAZEM SENTIDO</p>
            <h2>Encontre seu próximo essencial.</h2>
          </div>
          <span>{visiveis.length} produtos</span>
        </div>
        <div className="ferramentas">
          <div className="categorias" aria-label="Filtrar por categoria">
            {categorias.map((item) => (
              <button
                key={item}
                aria-pressed={categoria === item}
                onClick={() => definirCategoria(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="busca">
            <span>Buscar</span>
            <input
              value={busca}
              onChange={(evento) => definirBusca(evento.target.value)}
              placeholder="O que você procura?"
              type="search"
            />
          </label>
        </div>
        {carregando ? (
          <p role="status" className="estado">
            Consultando o catálogo…
          </p>
        ) : erro ? (
          <div role="alert" className="estado erro">
            <p>{erro}</p>
            <button className="botao" onClick={aoRecarregar}>
              Tentar novamente
            </button>
          </div>
        ) : visiveis.length ? (
          <div className="grade-produtos">
            {visiveis.map((produto) => (
              <CartaoProduto
                key={produto.id}
                produto={produto}
                aoAdicionar={aoAdicionar}
                aoDetalhar={aoDetalhar}
              />
            ))}
          </div>
        ) : (
          <p role="status" className="estado">
            Nenhum produto encontrado. Experimente outro nome ou categoria.
          </p>
        )}
      </section>
    </>
  );
}
