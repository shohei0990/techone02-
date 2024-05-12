import "./globals.css";
import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "techone app",
  description: "techone app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" style={{ backgroundColor: "var(--sub3)"}}>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
