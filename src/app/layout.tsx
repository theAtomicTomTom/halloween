import type { Metadata } from "next";
import { Amatic_SC } from "next/font/google";
import "./globals.css";

const amaticSC = Amatic_SC({ 
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Halloween RSVP",
  description: "RSVP to Halloween Murder-Mystery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={amaticSC.className}>{children}</body>
    </html>
  );
}
