export function normalizeFile(file) {
  const normalizedName = file.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "");
  const normalizedFile = new File([file], normalizedName, {
    type: file.type,
  });
  return normalizedFile;
}
