import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const timesNewRomanSans = localFont({
  src: "./fonts/times-new-roman.ttf",
  variable: "--font-times-new-roman-sans",
  weight: "100 900"
});
const timesNewRomanMono = localFont({
  src: "./fonts/times-new-roman.ttf",
  variable: "--font-times-new-roman",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "CineVerse",
  description: "Site de filmes e séries"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={` ${timesNewRomanMono.variable} ${timesNewRomanSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
