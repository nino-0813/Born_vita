import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "【公式】マシン専門ピラティススタジオ｜the SILK",
  description:
    "女性専用マシンピラティススタジオ。初心者の方でも音楽に合わせて楽しくボディメイクできます。",
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
