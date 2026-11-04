<?php
class Conexao
{
    public static function conectar()
    {
        $configuracao = require __DIR__ . "/../config/configuracao.php";
        $endereco =
            "mysql:host=" .
            $configuracao["servidor"] .
            ";port=" .
            $configuracao["porta"] .
            ";dbname=" .
            $configuracao["banco"] .
            ";charset=utf8mb4";

        return new PDO($endereco, $configuracao["usuario"], $configuracao["senha"], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    }
}
