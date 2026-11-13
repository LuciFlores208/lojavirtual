
# Loja Virtual

## 📚 Sobre o projeto

O **Loja Virtual** é um projeto de loja virtual desenvolvido no contexto de uma atividade acadêmica de aprendizagem e desenvolvimento web.

A estrutura inicial do projeto, incluindo seus códigos e funcionalidades, foi previamente disponibilizada para a realização da atividade. Dessa forma, o desenvolvimento não partiu de uma criação própria desde o início, mas da utilização de uma base já existente, que serve como referência para os estudos e experimentações.

Como aluna, minha participação consiste em explorar e compreender o funcionamento da aplicação, estudar as tecnologias utilizadas, analisar a organização dos códigos e realizar modificações, personalizações e melhorias de acordo com os conhecimentos adquiridos ao longo do processo.

O projeto tem como principal finalidade proporcionar uma experiência prática de desenvolvimento, permitindo o contato com tecnologias de Front-end e Back-end e a compreensão de como elas se integram na construção de uma aplicação web.

## 🎯 Objetivos da atividade

- Compreender a estrutura e o funcionamento de uma aplicação web já desenvolvida.
- Aprender a trabalhar com React e Vite.
- Explorar a comunicação entre Front-end e Back-end por meio de uma API.
- Compreender a utilização de PHP e MySQL.
- Desenvolver autonomia na leitura, interpretação e modificação de códigos.
- Personalizar interfaces e funcionalidades a partir da estrutura disponibilizada.
- Aplicar os conhecimentos adquiridos em HTML, CSS e JavaScript.

## 🛠️ Tecnologias utilizadas

**Front-end**

- React
- Vite
- JavaScript
- CSS3
- HTML5

**Back-end**

- PHP 8.1+
- MySQL
- PDO
- API REST

**Ambiente de desenvolvimento**

- Visual Studio Code
- Node.js e npm
- XAMPP

## ✨ Funcionalidades presentes no projeto

- Exibição de produtos consultados diretamente pela API.
- Filtragem de produtos por categoria.
- Pesquisa de produtos pelo nome.
- Visualização de detalhes dos produtos.
- Adição e remoção de itens da sacola.
- Alteração da quantidade de produtos.
- Cálculo automático do valor total da compra.
- Cadastro de dados para criação de pedidos.
- Simulação de aprovação e recusa de pagamentos.
- Consulta da situação dos pedidos.

**Observação:** o projeto possui finalidade didática. Os produtos e valores são fictícios e os pagamentos são exclusivamente simulados, sem integração com instituições financeiras ou realização de cobranças reais.

## 📁 Estrutura do projeto

```text
lojavirtual/
│
├── backend/
│   ├── api/
│   ├── banco/
│   ├── classes/
│   ├── config/
│   └── index.php
│
├── orbita-react/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── componentes/
│   │   ├── servicos/
│   │   ├── Aplicacao.jsx
│   │   ├── principal.jsx
│   │   └── estilos.css
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Como executar o projeto

### 1. Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

### 2. Configuração do Back-end

1. Copie a pasta `backend` para o diretório `C:\xampp\htdocs`.
2. Renomeie a pasta para `orbita-api`.
3. Abra o XAMPP e inicie os serviços Apache e MySQL.
4. Acesse o phpMyAdmin pelo endereço `http://localhost/phpmyadmin`.
5. Importe os arquivos SQL disponíveis em `orbita-api/banco/`, primeiro `estrutura.sql` e depois `produtos.sql`.

### 3. Configuração do Front-end

1. Abra a pasta `orbita-react` no Visual Studio Code.
2. Abra o terminal integrado.
3. Instale as dependências:

```bash
npm install
```

4. Confira se o arquivo `.env` contém o endereço da API:

```ini
VITE_ENDERECO_API=http://localhost/orbita-api
```

### 4. Executar a aplicação

No terminal do VS Code, execute:

```bash
npm run dev
```

O Vite disponibilizará um endereço local, geralmente `http://localhost:5173/`, para acessar a loja pelo navegador.

**Importante:** o Apache, o MySQL e o servidor do Vite precisam estar funcionando para que a aplicação consiga utilizar todas as funcionalidades.

## 🎓 Aprendizado e desenvolvimento

A realização desta atividade permite aprofundar os conhecimentos sobre desenvolvimento web por meio do contato direto com uma aplicação previamente estruturada.

Ao longo do processo, a proposta é estudar os códigos disponibilizados, identificar a função de cada parte do sistema, compreender a integração entre as tecnologias e desenvolver a capacidade de realizar alterações de forma independente.

Mais do que construir uma aplicação do zero, esta experiência busca desenvolver habilidades de interpretação, resolução de problemas, experimentação e personalização de projetos existentes, contribuindo para minha formação como estudante na área de tecnologia.

---

**Projeto desenvolvido no contexto de uma atividade acadêmica, utilizando uma estrutura de códigos previamente disponibilizada para fins educacionais.**
