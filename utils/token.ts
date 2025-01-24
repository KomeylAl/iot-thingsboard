import axios from "axios";

export function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf-8")
  );
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

export async function refreshToken() {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) throw new Error("No refresh token found");

  try {
    const response = await axios.post("/api/auth/refresh", { refreshToken });
    document.cookie = `token=${
      response.data.token
    }; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`;
    document.cookie = `refreshToken=${
      response.data.refreshToken
    }; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 30}`;

    return response.data.token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
}

export function parseJwt(token: string | undefined) {
  const base64Url = token!.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
