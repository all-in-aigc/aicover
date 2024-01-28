import { v4 as uuidv4 } from "uuid";

export function genUuid(): string {
  return uuidv4();
}
