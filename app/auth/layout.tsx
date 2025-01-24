import React from "react";
import '@/app/globals.css';
import { Toaster } from "react-hot-toast";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="fa">
         <body className="w-full h-screen login-body">
            <Toaster />
            {children}
         </body>
      </html>
   );
}