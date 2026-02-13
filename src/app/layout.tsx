import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

import ThemeRegistry from "./ThemeRegistry";
import GlobalAudio from "../components/GlobalAudio";
import TerminalBar from "../components/TerminalBar";
import SFXPlayer from "../components/SFXPlayer";
import LockWrapper from "../components/LockWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dungeon Gate: Pre-Quest to Shadow Dimension",
  description: "This secret-quest is not meant for weak hearts",
  icons: {
    icon: "/my-icon.jpg",
  },

  openGraph: {
    title: "Dungeon Gate: Pre-Quest to Shadow Dimension",
    description: "This secret-quest is not meant for weak hearts",
    images: [
      {
        url: "/scripture.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dungeon Gate: Pre-Quest to Shadow Dimension",
    description: "This secret-quest is not meant for weak hearts",
    images: ["/scripture.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ background: "#000", color: "#00ff9c" }}
      >
        <ThemeRegistry>
          <SFXPlayer>
            <LockWrapper>
            <Providers>
              <GlobalAudio />

              {children}

              <TerminalBar />
            </Providers>
            </LockWrapper>
          </SFXPlayer>
        </ThemeRegistry>
      </body>
    </html>
  );
}
