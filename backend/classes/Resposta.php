<?php
class Resposta
{
    public static function enviar(mixed $dados, int $situacao = 200): never
    {
        http_response_code($situacao);
        header("Content-Type: application/json; charset=utf-8");
        header("Cache-Control: no-store");
        header("X-Content-Type-Options: nosniff");
        echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit();
    }

    public static function lerCorpo(): array
    {
        $tipo = strtolower(explode(";", $_SERVER["CONTENT_TYPE"] ?? "")[0]);
        if (trim($tipo) !== "application/json") {
            throw new ErroHttp("Envie o corpo como application/json.", 415);
        }
        $conteudo = file_get_contents("php://input", false, null, 0, 65537);
        if ($conteudo === false || strlen($conteudo) > 65536) {
            throw new ErroHttp("Corpo da requisição muito grande.", 413);
        }
        try {
            $dados = json_decode($conteudo, true, 32, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            throw new ErroHttp("JSON inválido.", 400);
        }
        // A raiz deve ser um objeto, não uma lista ou um valor isolado.
        if (!is_array($dados) || !str_starts_with(ltrim($conteudo), "{")) {
            throw new ErroHttp("Envie um objeto JSON.", 400);
        }
        return $dados;
    }
}
