import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "AshlaNote",
  description: "Node Based Note Taking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
