import type { Metadata } from "next";
import "./globals.css";
import CursorCanvas from "@/components/CursorCanvas";
import { inter, doto, montreuil, werid_word, mansalva } from "@/lib/fonts";
import DraggableNav from "@/components/DraggableNav";

export const metadata: Metadata = {
  title: "Sanyam Rathore's Portfolio",
  description: "Get to know Sanyam Rathore..",
  icons: { icon: "/assets/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montreuil.variable} ${inter.variable} ${werid_word.variable} ${doto.variable} ${mansalva.variable} h-full antialiased md:subpixel-antialiased`}
    >
      <body className="min-h-full bg-[url('/assets/black-bg.jpeg')] bg-cover bg-center bg-fixed">
        <CursorCanvas />
        {children}
        <DraggableNav />
      </body>
    </html>
  );
}
