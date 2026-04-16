import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import "./globals.css";

// Load Inter font for non-Apple devices
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mashfiq Naushad Portfolio",
  description: "Interactive portfolio with an AI-powered Memoji that answers questions about me, my skills, and my experience",
  keywords: [
    "Mashfiq Naushad", 
    "Portfolio", 
    "Developer", 
    "AI", 
    "Interactive", 
    "Memoji", 
    "Web Development",
    "Full Stack",
    "Next.js",
    "React"
  ],
  authors: [
    {
      name: "Mashfiq Naushad",
    },
  ],
  creator: "Mashfiq Naushad",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mashfiq Naushad Portfolio",
    description: "Interactive portfolio with an AI-powered Memoji that answers questions about me",
    siteName: "Mashfiq Naushad Portfolio",
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "any",
      }
    ],
    shortcut: "/logo.png?v=4",
    apple: "/apple-touch-icon.svg?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/logo.png" sizes="any" />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QTH2CN2YRQ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window['dataLayer'] = window['dataLayer'] || [];
              function gtag(){window['dataLayer'].push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QTH2CN2YRQ');
            `,
          }}
        />
      </head>
      <body
        className={cn(
          // "min-h-screen bg-background font-sans antialiased",
          "min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans antialiased transition-colors duration-500 ease-in-out",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <main className="relative flex min-h-screen flex-col overflow-hidden">
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden">
              <div
                className="bg-gradient-to-b from-neutral-700/16 to-neutral-500/0 bg-clip-text text-[5.5rem] leading-none font-black text-transparent select-none dark:from-white/24 dark:to-white/0 sm:text-[10rem] lg:text-[16rem]"
                style={{ marginBottom: '-1rem' }}
              >
                Mashfiq
              </div>
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
              {children}
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}