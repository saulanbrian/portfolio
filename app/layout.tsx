import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { MotionProvider } from "@/components/ui/motion-provider";
import { QueryProvider } from "@/components/ui/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Fullstack Mobile Developer",
  description:
    "Fullstack mobile developer specializing in PDF and image processing applications. Try interactive demos in-browser.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.toggle("dark",
              localStorage.theme === "dark" ||
              (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            );`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <MotionProvider>
          <QueryProvider>
            <main className="flex-1">{children}</main>
          </QueryProvider>
        </MotionProvider>
        <Footer />
      </body>
    </html>
  );
}
