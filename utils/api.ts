// axiosInstance.js
import axios from "axios";

// بررسی انقضای توکن
function isTokenExpired(token: string) {
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf-8")
  );
  const now = Math.floor(Date.now() / 1000); // زمان فعلی به ثانیه
  return payload.exp < now;
}

// تابع حذف کوکی‌ها و هدایت به صفحه لاگین
function clearCookiesAndRedirect() {
  if (typeof window !== "undefined") {
    document.cookie = `token=; HttpOnly; Path=/; Max-Age=0`;
    document.cookie = `refreshToken=; HttpOnly; Path=/; Max-Age=0`;
    window.location.href = "/auth/login";
  }
}

// درخواست برای تمدید توکن
async function refreshToken() {
  if (typeof document === "undefined") {
    console.warn("Cannot access cookies in the server environment.");
    return null;
  }

  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    console.warn("No refresh token found. Redirecting to login...");
    clearCookiesAndRedirect();
    return null;
  }

  try {
    const response = await axios.post("/api/auth/refresh", { refreshToken });

    // ذخیره توکن‌های جدید
    document.cookie = `token=${response.data.token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24}`;
    document.cookie = `refreshToken=${response.data.refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 30}`;

    return response.data.token; // بازگرداندن توکن جدید
  } catch (error) {
    console.error("Failed to refresh token:", error);
    clearCookiesAndRedirect();
  }
}

// صف انتظار برای درخواست‌های هم‌زمان
let isRefreshing = false;
let refreshSubscribers: any = [];

function subscribeTokenRefresh(callback: any) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: any) {
  refreshSubscribers.forEach((callback: any) => callback(token));
  refreshSubscribers = [];
}

// ایجاد اینستنس Axios
const api = axios.create({
  baseURL: "http://localhost:3000", // آدرس پایه API
});

// افزودن Interceptor برای هر درخواست
api.interceptors.request.use(async (config) => {
  if (typeof document === "undefined") {
    return config; // در سرور کوکی‌ها وجود ندارند
  }

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (token && isTokenExpired(token)) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        isRefreshing = false;
        onRefreshed(newToken);
      } catch (error) {
        isRefreshing = false;
        throw error;
      }
    }

    return new Promise((resolve) => {
      subscribeTokenRefresh((newToken: any) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  }

  return config;
});

export default api;
