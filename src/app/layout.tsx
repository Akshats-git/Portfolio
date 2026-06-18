import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import ThemePanel from "@/components/ThemePanel";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akshat | Full Stack Developer",
  description:
    "Modern portfolio showcasing my projects, skills, and experience as a full stack developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <ThemePanel />
        </ThemeProvider>
      </body>
    </html>
  );
}