import { parseJwt } from "@/utils/token";

export async function getUserInfo(token: string | undefined) {
  const decoded = parseJwt(token);
  try {
    const user = await fetch(
      `http://62.60.204.234:8081/api/user/${decoded.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userInfo = await user.json();
    return userInfo;
  } catch (error) {
    console.log("ERR_GETING_USER_INFO", error);
  }
}
