import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saumya's Wordle 🐸",
  description: "A cozy, retro 8-bit daily word game with sweet affirmations, custom green tea & sunflower themes.",
  keywords: ["Wordle", "Saumya's Wordle", "retro wordle", "daily affirmation game"],
  authors: [{ name: "Antigravity" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart2P.variable} ${vt323.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cozy-cream text-retro-brown font-vt323 flex flex-col">
        {children}
      </body>
    </html>
  );
}
