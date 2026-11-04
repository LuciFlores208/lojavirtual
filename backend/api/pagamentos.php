<?php
require_once __DIR__ . "/../config/iniciar.php";

exigirMetodo(["POST"]);

$pagamento = new PagamentoSimulado();
$codigo = lerCodigo();
$dados = Resposta::lerCorpo();

Resposta::enviar($pagamento->processar($codigo, $dados));
