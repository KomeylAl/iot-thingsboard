import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/api/socket");

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("📨 Received:", newData);

      // به‌روزرسانی React Query بدون refetch
      queryClient.setQueryData(["requests"], (oldData: any) => {
        return oldData ? [...oldData, newData] : [newData];
      });
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, [queryClient]);
}
