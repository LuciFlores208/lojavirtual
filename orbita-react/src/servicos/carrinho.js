export const formatarMoeda = (centavos) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    centavos / 100,
  );
export const calcularTotal = (itens) =>
  itens.reduce(
    (total, item) => total + item.produto.preco_centavos * item.quantidade,
    0,
  );
export function adicionarItem(itens, produto) {
  const atual = itens.find((item) => item.produto.id === produto.id);
  if ((atual?.quantidade ?? 0) >= produto.estoque)
    throw new Error("Quantidade acima do estoque disponível.");
  return atual
    ? itens.map((item) =>
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      )
    : [...itens, { produto, quantidade: 1 }];
}
export function alterarQuantidade(itens, identificador, quantidade) {
  if (!Number.isInteger(quantidade) || quantidade < 0)
    throw new Error("Quantidade inválida.");
  if (quantidade === 0)
    return itens.filter((item) => item.produto.id !== identificador);
  return itens.map((item) => {
    if (item.produto.id !== identificador) return item;
    if (quantidade > item.produto.estoque)
      throw new Error("Quantidade acima do estoque disponível.");
    return { ...item, quantidade };
  });
}
