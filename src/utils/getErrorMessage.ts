export default function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (typeof error !== "object" || !error) return "";
  if (!("message" in error)) return "";
  if (typeof error.message !== "string") return "";
  return error.message;
}
