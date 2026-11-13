USE orbita_simples;
INSERT INTO categorias (id, nome) VALUES (1, 'Áudio'), (2, 'Periféricos'), (3, 'Mesa');

INSERT INTO produtos (id,nome,categoria_id,preco_centavos,estoque,desenho,cor,descricao) VALUES
(1,'Fone Aurora',1,24990,12,'fone','#d4d9cc','Fone sem fio com arco ajustável e almofadas macias. Um exemplo de produto para construir sua primeira integração.'),
(2,'Teclado Prisma',2,32990,8,'teclado','#e8e0d4','Teclado compacto com teclas de perfil baixo. Layout ilustrativo e especificações fictícias para estudo.'),
(3,'Mouse Pulso',2,12990,20,'mouse','#e2d1c4','Mouse sem fio de formato ergonômico para uma mesa com menos cabos.'),
(4,'Caixa Eco',1,18990,15,'caixa','#cddbd6','Caixa de som compacta. Produto fictício usado para explorar categorias e filtros.'),
(5,'Luminária Arco',3,15990,9,'luminaria','#e4ddc8','Luminária de mesa com haste curva e base circular, pensada para compor a bancada de estudos.'),
(6,'Monitor Horizonte',3,119990,5,'monitor','#d0d9df','Monitor de 24 polegadas para ilustrar produtos de maior valor no catálogo.'),
(7,'Câmera Conecta',2,21990,10,'camera','#d7d0df','Câmera para videochamadas, com suporte ajustável. Não há envio físico nesta loja.'),
(8,'Hub Ponte',2,9990,18,'hub','#d8deda','Hub compacto com conexões ilustrativas para aprender a consultar detalhes por identificador.'),
(9,'Suporte Eleva',3,8990,14,'suporte','#e7d8cf','Suporte para notebook com inclinação fixa. Um produto simples para o exercício de carrinho.'),
(10,'Fone Essencial',1,7990,0,'fone','#d9d5ce','Produto sem estoque para demonstrar botões desabilitados e regras de disponibilidade.');
