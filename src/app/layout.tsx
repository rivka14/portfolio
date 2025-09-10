import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rivka - Portfolio",
  description: "Personal portfolio website showcasing my projects, skills and experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}