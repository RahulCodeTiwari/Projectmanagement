import { fetcher } from "../utils/fetcher";

const API = "/api/auth"; // proxy to backend (setup in vite config or use full URL)

export const loginUser = (data) =>
  fetcher(`${API}/login`, { method: "POST", body: JSON.stringify(data) });

export const registerUser = (data) =>
  fetcher(`${API}/register`, { method: "POST", body: JSON.stringify(data) });

export const getMe = (authFetch) => authFetch(`${API}/me`);
