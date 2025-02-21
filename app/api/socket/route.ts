import { NextRequest } from "next/server";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws: any) => {
  console.log("🔌 Client connected");

  ws.on("message", (message: any) => {
    console.log(`📩 Received: ${message}`);
    // ارسال داده به همه کلاینت‌ها
    wss.clients.forEach((client: any) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});

// هندل درخواست‌های معمولی (اجباری برای API route)
export async function GET(req: NextRequest) {
  return new Response("WebSocket is running", { status: 200 });
}

// ارتقای HTTP به WebSocket
export const config = {
  runtime: "nodejs",
  unstable_allowDynamic: ["ws"],
};
