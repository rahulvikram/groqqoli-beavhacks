"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function Home() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-center justify-center space-x-3">
        <h1 className="text-4xl font-bold">An AI Cooking Assistant powered by</h1>
        {mounted && (
          <Link href="https://www.groq.com" target="_blank">
            <Image 
              src={theme === "dark" ? "/groqwhite.svg" : "/groqblack.svg"} 
              alt="Groq Logo" 
              width={100} 
              height={100} 
              className="ml-1" 
            />
          </Link>
        )}
      </div>
    </div>
    </>
  );
}
