<?php
require_once __DIR__ . "/Conexao.php";

class ModeloBase
{
    protected $conexao;

    public function __construct()
    {
        $this->conexao = Conexao::conectar();
    }
}
