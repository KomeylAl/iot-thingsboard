import { parseJwt } from "@/utils/token";

export async function getUserInfo(token: string | undefined) {
  const decoded = parseJwt(token);
  try {
    const response = await fetch(
      `${process.env.THINGSBOARD_URL}/api/user/${decoded.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.log("ERR_GETING_USER_INFO", error);
  }
}
