import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import Navbar from "./components/navbar";

// set up fonts for layout
const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const montserratMono = Montserrat({
  variable: "--font-montserrat-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Groqqoli",
  description: "A GroqAI-powered cooking assistant!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserratSans.variable} ${montserratMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar title="Groqqoli 👨‍🍳" links={[
            { label: "About", href: "/core/about" },
            { label: "Cooking Chatbot", href: "/core/cooking-chatbot" },
            { label: "Ingredient Vision", href: "/core/ingredient-vision" },
            { label: "Recipe Assistant", href: "/core/voice-recipes" },
          ]} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
