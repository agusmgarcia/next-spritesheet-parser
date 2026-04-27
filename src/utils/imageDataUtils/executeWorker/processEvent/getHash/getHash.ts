import { type Input, type Output } from "./getHash.types";

export default async function getHash(...[imageData]: Input): Output {
  return await crypto.subtle
    .digest("SHA-256", imageData.data.buffer as ArrayBuffer)
    .then((hashBuffer) => Array.from(new Uint8Array(hashBuffer)))
    .then((hashArray) => hashArray.map((b) => b.toString(16).padStart(2, "0")))
    .then((array) => array.join(""));
}
