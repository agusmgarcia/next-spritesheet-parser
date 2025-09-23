export default async function rawGetHash(
  imageData: ImageData,
): Promise<string> {
  return await crypto.subtle
    .digest("SHA-256", imageData.data.buffer as ArrayBuffer)
    .then((hashBuffer) => Array.from(new Uint8Array(hashBuffer)))
    .then((hashArray) => hashArray.map((b) => b.toString(16).padStart(2, "0")))
    .then((array) => array.join(""));
}
