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

// Runs before the first paint so a saved theme never flashes the wrong colors.
const applySavedTheme = `try {
  const theme = localStorage.getItem("theme");
  if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
} catch {}`;

export const metadata = {
  title: "Steady",
  description: "Chat with a supportive mental coach.",
};

export default function RootLayout({ children }) {
  return (
    // applySavedTheme can add data-theme before React loads, which is expected.
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedTheme }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
