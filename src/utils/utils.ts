import { v4 as uuidv4 } from "uuid";

export const generateSKU = (prefix: string = "PRD") => {
  const guid = uuidv4();

  const shortGuid = guid.split("-")[0].toUpperCase();
  return `${prefix}-${shortGuid}`;
};
