<?php
return [
    "servidor" => "127.0.0.1",
    "porta" => getenv("BANCO_PORTA") ?: "3306",
    "banco" => "orbita_simples",
    "usuario" => "root",
    "senha" => "",
    "origens" => ["http://localhost:5173", "http://127.0.0.1:5173"],
];
