<?php
class ErroHttp extends RuntimeException
{
    public $situacao;

    public function __construct($mensagem, $situacao)
    {
        parent::__construct($mensagem);
        $this->situacao = $situacao;
    }
}
