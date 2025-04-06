import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

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
  icons: {
    icon: [
      { url: '/favicon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // make ClerkProvider auth globally available
    <ClerkProvider> 
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
            <div className="mt-16">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
