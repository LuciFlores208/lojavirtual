<?php
require_once __DIR__ . "/../classes/ErroHttp.php";
require_once __DIR__ . "/../classes/Resposta.php";
require_once __DIR__ . "/../classes/Categoria.php";
require_once __DIR__ . "/../classes/Produto.php";
require_once __DIR__ . "/../classes/Pedido.php";
require_once __DIR__ . "/../classes/PagamentoSimulado.php";

$configuracao = require __DIR__ . "/configuracao.php";
$origem = $_SERVER["HTTP_ORIGIN"] ?? "";

if (in_array($origem, $configuracao["origens"], true)) {
    header("Access-Control-Allow-Origin: " . $origem);
    header("Vary: Origin");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit();
}

set_exception_handler(function ($erro) {
    if ($erro instanceof ErroHttp) {
        Resposta::enviar(["mensagem" => $erro->getMessage()], $erro->situacao);
    }

    Resposta::enviar(["mensagem" => "Falha interna. Confira a configuração e o banco."], 500);
});

function exigirMetodo($metodos)
{
    if (!in_array($_SERVER["REQUEST_METHOD"], $metodos, true)) {
        header("Allow: " . implode(", ", $metodos));
        throw new ErroHttp("Método não permitido.", 405);
    }
}

function lerId($nome)
{
    $valor = filter_var($_GET[$nome], FILTER_VALIDATE_INT);

    if ($valor === false || $valor < 1) {
        throw new ErroHttp("Identificador inválido.", 422);
    }

    return $valor;
}

function lerCodigo()
{
    $codigo = $_GET["codigo"] ?? "";

    if (!is_string($codigo) || !preg_match('/^[a-f0-9]{32}$/', $codigo)) {
        throw new ErroHttp("Código de pedido inválido.", 422);
    }

    return $codigo;
}
