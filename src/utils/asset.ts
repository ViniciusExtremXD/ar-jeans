/** Resolve a public asset path, prepending the Vite base URL */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Avoid double slashes: strip leading slash from path if base already ends with /
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
