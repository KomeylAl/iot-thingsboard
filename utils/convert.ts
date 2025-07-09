export function formatBytes(bytes: any, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}`;
}

export function parseISOString(s: any) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3])).toString();
}

function gregorianToJalali(gy: any, gm: any, gd: any) {
  let g_d_m = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) g_d_m[2] = 29;

  let gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400);

  for (let i = 0; i < gm; i++) days += g_d_m[i];
  days += gd;

  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jm, jd;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  return [jy, jm, jd];
}

export function convertISOToJalali(isoDate: any) {
  const date = new Date(isoDate);
  const [jy, jm, jd] = gregorianToJalali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  // ساخت خروجی به‌صورت رشته‌ای
  return `${jy}/${jm.toString().padStart(2, "0")}/${jd
    .toString()
    .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
}

export const transformTelemetryData = (wsData: any) => {
  if (!wsData) return [];

  return Object.entries(wsData)
    .filter(([key]) => key.startsWith("temperature")) // فقط داده‌های دما را بگیر
    .flatMap(([key, values]: [string, any]) =>
      values.map((item: [number, string]) => ({
        name: key, // نام سنسور
        type: "دما", // این مقدار را ثابت می‌گذاریم
        label: `${item[1]}°C`, // مقدار دما
        status: "فعال", // مقدار پیش‌فرض
        createdAtTime: new Date(item[0]).toLocaleString("fa-IR"), // تبدیل timestamp به تاریخ شمسی
      }))
    );
};

export const transformToFormValues = (data: any) => {
  const { id, name, description, profileData } = data;
  const config = profileData?.configuration;

  const rateLimits =
    config?.transportTenantMsgRateLimit?.split(",").map((item: any) => {
      const [limit, interval] = item.split(":").map(Number);
      return { limit, interval };
    }) || []; // مقدار پیش‌فرض، یک آرایه خالی

  return {
    id: id?.id ?? "",
    name: name ?? "",
    description: description ?? "",
    type: config?.type ?? "DEFAULT",
    maxDevices: config?.maxDevices ?? 0,
    maxAssets: config?.maxAssets ?? 0,
    maxCustomers: config?.maxCustomers ?? 0,
    maxUsers: config?.maxUsers ?? 0,
    maxDashboards: config?.maxDashboards ?? 0,
    maxRuleChains: config?.maxRuleChains ?? 0,
    maxEmails: config?.maxEmails ?? 0,
    smsEnabled: config?.smsEnabled ?? false,
    maxSms: config?.maxSms ?? 0,
    limit1: rateLimits?.[0]?.limit ?? 0, // اگر `rateLimits` مقدار نداشت، مقدار `0` جایگزین شود
    interval1: rateLimits?.[0]?.interval ?? 0,
    limit2: rateLimits?.[1]?.limit ?? 0,
    interval2: rateLimits?.[1]?.interval ?? 0,

    unitPrices: {
      maxDevices: profileData?.unitPrices?.maxDevices ?? 0,
      maxAssets: profileData?.unitPrices?.maxAssets ?? 0,
      maxCustomers: profileData?.unitPrices?.maxCustomers ?? 0,
      maxUsers: profileData?.unitPrices?.maxUsers ?? 0,
      maxDashboards: profileData?.unitPrices?.maxDashboards ?? 0,
      maxRuleChains: profileData?.unitPrices?.maxRuleChains ?? 0,
    },
  };
};
