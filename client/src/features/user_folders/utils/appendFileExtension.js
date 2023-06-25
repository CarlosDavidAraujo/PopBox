const mimeTypes = {
  "text/plain": "txt",
  "text/html": "html",
  "text/css": "css",
  "text/javascript": "js",
  "application/json": "json",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/midi": "midi",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "video/x-msvideo": "avi",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/octet-stream": "", // extensão em branco para dados binários não específicos
};

function getExtensionFromMimeType(mimeType) {
  return mimeTypes[mimeType] || "";
}

export const appendFileExtension = (mime_type, fileName) => {
  const extension = getExtensionFromMimeType(mime_type);
  return `${fileName}.${extension}`;
};
