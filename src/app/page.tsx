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
    <div className="">
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
      <h3 className="text-center text-lg py-3 ">Built for BeaverHacks 2025</h3>
    </div>
    </>
  );
}
