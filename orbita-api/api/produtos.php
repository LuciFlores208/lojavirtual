<?php
require_once __DIR__ . "/../config/iniciar.php";

exigirMetodo(["GET"]);

$recurso = new Produto();

if (isset($_GET["id"])) {
    Resposta::enviar($recurso->buscar(lerId("id")));
}

$categoriaId = isset($_GET["categoria_id"]) ? lerId("categoria_id") : null;
Resposta::enviar($recurso->listar($categoriaId));
