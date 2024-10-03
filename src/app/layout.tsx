import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const figtree = localFont({
  src: "./fonts/figtree/Figtree-VariableFont_wght.ttf",
  variable: "--font-figtree",
  weight: "300 900",
});
const figtreeItalic = localFont({
  src: "./fonts/figtree/Figtree-Italic-VariableFont_wght.ttf",
  variable: "--font-figtree-italic",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "Offene Stellen – CreditPlus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${figtree.variable} ${figtreeItalic.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
