const DEPLOYED_API_URL = "https://project-okdj.onrender.com/api";
const DEFAULT_LOCAL_API_URL = "http://localhost:5000/api";

const isLocalBrowserHost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const DEFAULT_API_URL = isLocalBrowserHost ? DEFAULT_LOCAL_API_URL : DEPLOYED_API_URL;
const API_URL = import.meta.env.VITE_API_URL || DEFAULT_API_URL;

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("nagaland_token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}
