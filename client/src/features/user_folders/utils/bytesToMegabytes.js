export function bytesToMegabytes(bytes) {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2); // Arredonda para 2 casas decimais
}
