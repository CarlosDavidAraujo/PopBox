import {
  BsFiletypeCss,
  BsFiletypeDoc,
  BsFiletypeGif,
  BsFiletypeHtml,
  BsFiletypeJpg,
  BsFiletypeJs,
  BsFiletypeJson,
  BsFiletypeMd,
  BsFiletypeMov,
  BsFiletypeMp3,
  BsFiletypeMp4,
  BsFiletypePdf,
  BsFiletypePng,
  BsFiletypeSvg,
  BsFiletypeTxt,
  BsFiletypeWav,
  BsFiletypeXls,
  BsFiletypeXlsx,
} from "react-icons/bs";
import { AiOutlineFileUnknown } from "react-icons/ai";

const mimeTypes = {
  "text/plain": <BsFiletypeTxt />,
  "text/html": <BsFiletypeHtml />,
  "text/css": <BsFiletypeCss />,
  "text/javascript": <BsFiletypeJs />,
  "application/json": <BsFiletypeJson />,
  "image/jpeg": <BsFiletypeJpg />,
  "image/png": <BsFiletypePng />,
  "image/gif": <BsFiletypeGif />,
  "image/svg+xml": <BsFiletypeSvg />,
  "audio/mpeg": <BsFiletypeMp3 />,
  "audio/wav": <BsFiletypeWav />,
  "audio/midi": <BsFiletypeMd />,
  "video/mp4": <BsFiletypeMp4 />,
  "video/quicktime": <BsFiletypeMov />,
  "video/x-msvideo": <AiOutlineFileUnknown />,
  "application/pdf": <BsFiletypePdf />,
  "application/msword": <BsFiletypeDoc />,
  "application/vnd.ms-excel": <BsFiletypeXls />,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": (
    <BsFiletypeXlsx />
  ),
  "application/octet-stream": <AiOutlineFileUnknown />, // extensão em branco para dados binários não específicos
};

export const useFileIcons = (mime_type) => {
  return mimeTypes[mime_type] ?? <AiOutlineFileUnknown />;
};
