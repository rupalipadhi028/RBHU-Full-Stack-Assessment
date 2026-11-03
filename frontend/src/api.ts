const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export function token() { return sessionStorage.getItem("rbhu-token") ?? ""; }
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  if (token()) headers.set("Authorization", "Bearer " + token());
  const response = await fetch(API + path, { ...options, headers });
  if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.error ?? ("Request failed: " + response.status)); }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
export { API };
