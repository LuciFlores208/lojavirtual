import React, { useState, useEffect, useRef } from "react";
import Cabecalho from "./componentes/cabecalho.jsx";
import Vitrine from "./componentes/Vitrine.jsx";
import Carrinho from "./componentes/Carrinho.jsx";
import DetalheProduto from "./componentes/DetalheProduto.jsx";
import Finalizacao from "./componentes/Finalizacao.jsx";
import {
  listarProdutos,
  buscarProduto,
} from "./servicos/api.js";
import { adicionarItem, alterarQuantidade } from "./servicos/carrinho.js";
export default function Aplicacao() {
  const [produtos, definirProdutos] = useState([]);
  const [carregando, definirCarregando] = useState(true);
  const [erro, definirErro] = useState("");
  const [itens, definirItens] = useState([]);
  const [tela, definirTela] = useState(null);
  const [produto, definirProduto] = useState(null);
  const [mensagem, definirMensagem] = useState("");
  const [recarga, definirRecarga] = useState(0);
  const dialogo = useRef(null);
  const ultimoFoco = useRef(null);
  useEffect(() => {
    const controle = new AbortController();
    definirCarregando(true);
    definirErro("");
    listarProdutos(controle.signal)
      .then(definirProdutos)
      .catch((falha) => {
        if (falha.name !== "AbortError") definirErro(falha.message);
      })
      .finally(() => {
        if (!controle.signal.aborted) definirCarregando(false);
      });
    return () => controle.abort();
  }, [recarga]);
  useEffect(() => {
    if (tela && !dialogo.current.open) {
      ultimoFoco.current = document.activeElement;
      dialogo.current.showModal();
    } else if (!tela && dialogo.current.open) {
      dialogo.current.close();
      ultimoFoco.current?.focus();
    }
  }, [tela]);
  function adicionar(produto) {
    try {
      definirItens(adicionarItem(itens, produto));
      definirMensagem(`${produto.nome} adicionado à sacola.`);
    } catch (falha) {
      definirMensagem(falha.message);
    }
  }
  function alterar(identificador, quantidade) {
    try {
      definirItens(alterarQuantidade(itens, identificador, quantidade));
    } catch (falha) {
      definirMensagem(falha.message);
    }
  }
  async function detalhar(identificador) {
    try {
      definirProduto(await buscarProduto(identificador));
      definirTela("detalhe");
    } catch (falha) {
      definirMensagem(falha.message);
    }
  }
  function concluir() {
    definirItens([]);
    definirRecarga((valor) => valor + 1);
  }
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho
        quantidade={itens.reduce((soma, item) => soma + item.quantidade, 0)}
        aoAbrirCarrinho={() => definirTela("carrinho")}
      />
      <main id="conteudo">
        <div className="modo">
          CONSUMO DIRETO DA API PHP
          <span>
            Dados consultados nos endpoints PHP. Pedidos enviados à API.
            Pagamento sempre simulado.
          </span>
        </div>
        <Vitrine
          produtos={produtos}
          carregando={carregando}
          erro={erro}
          aoRecarregar={() => definirRecarga((valor) => valor + 1)}
          aoAdicionar={adicionar}
          aoDetalhar={detalhar}
        />
        <section className="convite">
          <div>
            <p className="sobretitulo">DO PRIMEIRO COMPONENTE À COMPRA</p>
            <h2>
              Gostou da loja?
              <br />
              Agora construa a sua.
            </h2>
          </div>
          <a className="botao principal" href="/material.html">
            Abrir o passo a passo ↗
          </a>
        </section>
      </main>
      <footer>
        <a className="marca" href="/">
          ◉ órbita
        </a>
        <p>
          Loja escola • React, PHP OOP e MySQL
          <br />
          Produtos e valores fictícios para fins de aprendizagem.
        </p>
        <a href="/apresentacao.html">Apresentação do projeto ↗</a>
      </footer>
      <div className="mensagem" role="status">
        {mensagem && (
          <>
            <span>{mensagem}</span>
            <button
              onClick={() => definirMensagem("")}
              aria-label="Dispensar mensagem"
            >
              ×
            </button>
          </>
        )}
      </div>
      <dialog
        ref={dialogo}
        aria-labelledby="titulo-dialogo"
        onCancel={() => definirTela(null)}
        onClose={() => {
          definirTela(null);
          ultimoFoco.current?.focus();
        }}
      >
        <div className="conteudo-dialogo" key={tela}>
          {tela === "carrinho" && (
            <Carrinho
              itens={itens}
              aoAlterar={alterar}
              aoAvancar={() => definirTela("finalizacao")}
              aoFechar={() => definirTela(null)}
            />
          )}{" "}
          {tela === "detalhe" && produto && (
            <DetalheProduto
              produto={produto}
              aoAdicionar={adicionar}
              aoFechar={() => definirTela(null)}
            />
          )}{" "}
          {tela === "finalizacao" && (
            <Finalizacao
              itens={itens}
              aoConcluir={concluir}
              aoVoltar={() => definirTela("carrinho")}
              aoFechar={() => definirTela(null)}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
