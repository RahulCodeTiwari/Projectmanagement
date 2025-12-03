export async function fetcher(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (res.headers.get("content-type")?.includes("application/json")) {
    return res.json();
  }
  return res;
}
