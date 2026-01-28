import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Never Forget | Asia Adventures",
  description: "A visual journey through unforgettable moments in Asia",
  keywords: ["travel", "asia", "photography", "memories", "adventure"],
  openGraph: {
    title: "Never Forget | Asia Adventures",
    description: "A visual journey through unforgettable moments in Asia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
