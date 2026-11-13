-- Laboratório XAMPP. Importação inicial para um banco vazio. Não execute sobre dados existentes.
CREATE DATABASE IF NOT EXISTS orbita_simples CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE orbita_simples;
CREATE TABLE categorias (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(40) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE produtos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria_id INT UNSIGNED NOT NULL,
    preco_centavos INT UNSIGNED NOT NULL,
    estoque INT UNSIGNED NOT NULL,
    descricao TEXT NOT NULL,
    desenho VARCHAR(30) NOT NULL,
    cor CHAR(7) NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
) ENGINE=InnoDB;
CREATE TABLE pedidos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codigo CHAR(32) CHARACTER SET ascii COLLATE ascii_bin NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    total_centavos BIGINT UNSIGNED NOT NULL,
    status ENUM('pendente','recusado','pago') NOT NULL DEFAULT 'pendente',
    criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE itens_pedido (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT UNSIGNED NOT NULL,
    produto_id INT UNSIGNED NOT NULL,
    nome VARCHAR(100) NOT NULL,
    preco_centavos INT UNSIGNED NOT NULL,
    quantidade SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT quantidade_positiva CHECK (quantidade BETWEEN 1 AND 99),
    CONSTRAINT produto_unico_no_pedido UNIQUE (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
) ENGINE=InnoDB;
