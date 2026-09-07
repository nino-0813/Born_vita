import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "因島の女性のための少人数ピラティス｜Born vita",
  description:
    "肩こり・腰痛・姿勢の悩みに寄り添う、因島の女性のための少人数ピラティス。何歳からでも、身体は整え直せます。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="/site-assets/main.min.css" />
        <link rel="stylesheet" href="/site-assets/custom-style.css" />
        <link rel="stylesheet" href="/site-assets/top.min.css" />
        <link rel="stylesheet" href="/site-assets/slick.css" />
        <link rel="stylesheet" href="/site-assets/style.css" />
        <link rel="stylesheet" href="/site-assets/custom-style(1).css" />
        <link rel="stylesheet" href="/site-assets/stylesheet.css" />
        <link rel="stylesheet" href="/site-assets/custom-header.css" />
        <link rel="stylesheet" href="/site-assets/index.css" />
        <link rel="stylesheet" href="/site-assets/stylesheet(1).css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
