const configuredApiUrl = (import.meta.env.VITE_API_URL || "http://localhost:8001").replace(/\/$/, "");
const isLocalDevHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

// In local dev, use Vite proxy with relative paths. In deployed builds, use the configured API URL.
const API_BASE_URL = isLocalDevHost ? "" : configuredApiUrl;

const apiUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const assetUrl = (path = "") => {
  const safePath = path || "";
  const normalizedPath = safePath.startsWith("/") ? safePath : `/${safePath}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export { API_BASE_URL, apiUrl, assetUrl };
