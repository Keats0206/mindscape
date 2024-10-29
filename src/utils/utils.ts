import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @param {string} [origin] - Optional origin for full URL redirects.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
  origin?: string
) {
  const fullPath = origin ? `${origin}${path}` : path;
  return redirect(`${fullPath}?${type}=${encodeURIComponent(message)}`);
}