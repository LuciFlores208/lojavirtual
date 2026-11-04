<?php
require_once __DIR__ . "/../config/iniciar.php";

exigirMetodo(["GET", "POST"]);
$pedido = new Pedido();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $dados = Resposta::lerCorpo();
    Resposta::enviar($pedido->criar($dados), 201);
}

Resposta::enviar($pedido->consultar(lerCodigo()));
