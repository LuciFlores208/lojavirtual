# Órbita API simples para XAMPP

Estrutura baseada no README KICKS REST API para XAMPP consultado nesta revisão: scripts de endpoints na pasta api, classes por entidade e conexão compartilhada por uma classe base. Implementação própria, com nomes em português. Sem framework, Composer, Docker, .env, roteador central ou .htaccess.

## Instalação

1. Copie a pasta `orbita-api` para `C:\xampp\htdocs\orbita-api`.
2. Inicie Apache e MySQL no painel do XAMPP.
3. Abra `http://localhost/phpmyadmin` e importe `banco/estrutura.sql` e depois `banco/produtos.sql`.
4. Abra `http://localhost/orbita-api/api/produtos.php`.

Esta edição cria o banco `orbita_simples`. Não reutilize o SQL antigo sem adaptar o modelo: a categoria agora é uma entidade relacionada. A importação se destina a um banco vazio, sem apagar tabelas existentes.

Configuração em `config/configuracao.php`: servidor 127.0.0.1, porta 3306, usuário root, senha vazia. Ajuste conforme seu XAMPP. Requer PHP 8.1+ com PDO MySQL. Uso local para estudo.

## Organização

- `api/produtos.php`: listar produtos, buscar por id e filtrar por categoria.
- `api/categorias.php`: listar categorias e buscar por id.
- `api/pedidos.php`: criar ou consultar um pedido.
- `api/pagamentos.php`: aprovar ou recusar o pagamento simulado.
- `classes/Conexao.php`: criar a conexão PDO.
- `classes/ModeloBase.php`: disponibilizar a conexão às classes de consulta.
- `classes/Categoria.php`: consultar a tabela categorias.
- `classes/Produto.php`: consultar produtos e relacionar a categoria pelo JOIN.
- `classes/Pedido.php`: validar, gravar e consultar pedidos.
- `classes/PagamentoSimulado.php`: controlar pagamento e estoque em transação.
- `classes/Resposta.php`: ler e devolver JSON.
- `classes/ErroHttp.php`: representar erros esperados.
- `config/iniciar.php`: carregar classes, configurar CORS e tratar erros.
- `banco`: estrutura e carga inicial.

## Produto e categoria

Cada produto tem `categoria_id`, uma chave estrangeira para `categorias.id`. A consulta usa INNER JOIN e devolve o identificador e o nome da categoria. Não há campo de texto duplicado na tabela produtos.

Exemplo de campos retornados:

```json
{
    "id": 1,
    "nome": "Fone Aurora",
    "categoria_id": 1,
    "categoria": "Áudio",
    "preco_centavos": 24990,
    "estoque": 12
}
```

Um produto não pode apontar para uma categoria inexistente. A relação é obrigatória e uma categoria vinculada não pode ser removida diretamente pelo banco sem tratar seus produtos. Esta versão expõe consulta de catálogo e categorias, criação/consulta de pedido e pagamento simulado. Não implementa CRUD completo ou painel administrativo.

## Endpoints

| Método | Endpoint relativo a http://localhost/orbita-api/ |
| --- | --- |
| GET | api/categorias.php |
| GET | api/categorias.php?id=1 |
| GET | api/produtos.php |
| GET | api/produtos.php?id=1 |
| GET | api/produtos.php?categoria_id=1 |
| POST | api/pedidos.php |
| GET | api/pedidos.php?codigo=CODIGO |
| POST | api/pagamentos.php?codigo=CODIGO |

As URLs desta versão substituem as antigas chamadas `index.php?rota=...`.

## Exemplo de consumo com React

```javascript
const resposta = await fetch('http://localhost/orbita-api/api/produtos.php');
const dados = await resposta.json();

if (!resposta.ok) {
    throw new Error(dados.mensagem);
}

definirProdutos(dados);
```

Categorias usam `api/categorias.php`; detalhe usa `api/produtos.php?id=1`. O campo `categoria` segue contendo o nome para facilitar a exibição na loja, e `categoria_id` registra o vínculo. Configure as origens permitidas em configuracao.php se o React não estiver na porta 5173. As chamadas precisam usar os novos endpoints em vez da conversão antiga por `rota`. Não há pasta de integração React neste pacote.

## Pedido e pagamento

Envie JSON com Content-Type application/json para POST api/pedidos.php:

```json
{
    "nome": "Aluno Exemplo",
    "email": "aluno@example.com",
    "itens": [
        {
            "produto_id": 1,
            "quantidade": 1
        }
    ]
}
```

Use o código retornado para POST api/pagamentos.php?codigo=CODIGO:

```json
{
    "resultado": "aprovado"
}
```

Também é possível enviar `recusado`. O preço é calculado pelo servidor. A aprovação baixa estoque uma única vez; recusa não baixa. O pagamento é exclusivamente simulado, sem cartão ou Pix real. Use dados fictícios e não publique códigos de pedido, que permitem consultar e simular seu pagamento.

## Verificação desta revisão

Classes e endpoints formatados com quatro espaços. Sintaxe PHP verificada e suíte HTTP local aplicada, incluindo categorias, filtro e chave estrangeira, conforme resultado informado na entrega. A execução em XAMPP/Apache no Windows e MariaDB não foi observada neste ambiente. Não há testes ou relatórios de validação dentro deste pacote, conforme solicitado.

Referência consultada: README KICKS REST API, XAMPP, PHP puro, Scripts + OOP, arquivo README(20261008-204941).md fornecido anteriormente. Foi utilizada a arquitetura documentada, sem alegar cópia ou inspeção das classes originais do KICKS.
