export const normalizeFileName = (fileName) => {
  const normalizedName = fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "")
    .replace(/\.(?=.*\.)/g, ""); // Remove todos os pontos, exceto o último
  return normalizedName;
};
