import type { Metadata } from "next";
import "./globals.css";
import CursorCanvas from "@/components/CursorCanvas";
import ClientShell from "@/components/ClientShell";
import { inter, doto, montreuil, werid_word, mansalva } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Sanyam Rathore's Portfolio",
  description: "Get to know Sanyam Rathore..",
  icons: { icon: "/assets/favicon.png" },
  other: {
    // This injects the link tag automatically into the <head>
    'cursor-style': 'https://cdn.cursors-4u.net/cursors/animated/paper-airplane-19477b19-32.css',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montreuil.variable} ${inter.variable} ${werid_word.variable} ${doto.variable} ${mansalva.variable} h-full antialiased md:subpixel-antialiased bg-black`}
    >
      <body className="min-h-full bg-[url('/assets/black-bg.jpeg')] bg-cover bg-center bg-fixed">
        <CursorCanvas />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}