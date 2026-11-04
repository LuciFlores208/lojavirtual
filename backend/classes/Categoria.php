<?php
require_once __DIR__ . "/ModeloBase.php";

class Categoria extends ModeloBase
{
    public function listar()
    {
        $consulta = $this->conexao->query("SELECT id, nome FROM categorias ORDER BY id");
        return $consulta->fetchAll();
    }

    public function buscar($id)
    {
        $consulta = $this->conexao->prepare("SELECT id, nome FROM categorias WHERE id = ?");
        $consulta->execute([$id]);
        $categoria = $consulta->fetch();

        if (!$categoria) {
            throw new ErroHttp("Categoria não encontrada.", 404);
        }

        return $categoria;
    }
}
