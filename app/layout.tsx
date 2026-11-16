import type { Metadata } from "next";
import "./globals.css";
import CursorCanvas from "@/components/CursorCanvas";
import ClientShell from "@/components/ClientShell";
import { inter, doto, montreuil, werid_word, mansalva, sharpenhill } from "@/lib/fonts";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sanyam Rathore — Full-Stack Software Engineer",
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Sanyam Rathore",
    "Full-Stack Engineer",
    "Software Engineer",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "Event-Driven Architecture",
    "AI Engineering",
    "LLM Integration",
    "Kafka",
    "PostgreSQL",
    "AWS",
  ],
  authors: [{ name: "Sanyam Rathore", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sanyam Rathore",
    title: "Sanyam Rathore — Full-Stack Software Engineer",
    description: SITE_DESCRIPTION,
    images: [{ url: "/assets/About me.png", width: 375, height: 473, alt: "Sanyam Rathore" }],
  },
  twitter: {
    card: "summary",
    title: "Sanyam Rathore — Full-Stack Software Engineer",
    description: SITE_DESCRIPTION,
    images: ["/assets/About me.png"],
  },
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
      className={`${montreuil.variable} ${sharpenhill.variable} ${inter.variable} ${werid_word.variable} ${doto.variable} ${mansalva.variable} h-full antialiased md:subpixel-antialiased bg-black`}
    >
      <body className="min-h-full bg-[url('/assets/black-bg.jpeg')] bg-cover bg-center bg-fixed">
        <CursorCanvas />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}