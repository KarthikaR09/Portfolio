import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karthika Ravichandran R | Quality Analyst Portfolio",
  description:
    "Proficient QA professional dedicated to ensuring software excellence through effective testing, bug reporting, and quality metrics. Experienced in manual and automation testing with Selenium and Python.",
  keywords: [
    "Quality Analyst",
    "QA Engineer",
    "Software Testing",
    "Manual Testing",
    "Automation Testing",
    "Selenium",
    "Python",
    "JIRA",
    "Postman",
    "Test Planning",
    "Bug Reporting",
    "Karthika Ravichandran",
  ],
  authors: [{ name: "Karthika Ravichandran R" }],
  creator: "Karthika Ravichandran R",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Karthika Ravichandran R | Quality Analyst Portfolio",
    description:
      "Proficient QA professional dedicated to ensuring software excellence through effective testing and analysis.",
    siteName: "Karthika Ravichandran R Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthika Ravichandran R | Quality Analyst Portfolio",
    description:
      "Proficient QA professional dedicated to ensuring software excellence through effective testing and analysis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ThemeToggle />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
