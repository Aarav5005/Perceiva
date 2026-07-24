import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const ibmPlexMono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-ibm-plex-mono" });

export const metadata: Metadata = {
  title: "Perceiva",
  description: "What if your classroom could think?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script defer data-domain="perceiva.in" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} font-body bg-background text-textPrimary`}>
        {children}
      </body>
    </html>
  );
}
