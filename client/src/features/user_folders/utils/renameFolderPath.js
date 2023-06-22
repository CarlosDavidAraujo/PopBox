export function renameFolderPath(caminhoAntigo, novoNome) {
  const partesCaminho = caminhoAntigo.split("/");
  const indiceUltimaParte = partesCaminho.length - 1;
  partesCaminho[indiceUltimaParte] = novoNome;
  const novoCaminho = partesCaminho.join("/");
  return novoCaminho;
}
