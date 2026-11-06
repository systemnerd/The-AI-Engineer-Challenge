import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const bodyFont = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata = {
  title: "Steady",
  description: "Chat with a supportive mental coach.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
