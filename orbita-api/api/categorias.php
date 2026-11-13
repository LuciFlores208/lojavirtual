<?php
require_once __DIR__ . "/../config/iniciar.php";

exigirMetodo(["GET"]);

$recurso = new Categoria();

if (isset($_GET["id"])) {
    Resposta::enviar($recurso->buscar(lerId("id")));
}

Resposta::enviar($recurso->listar());
