"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import Image from "next/image"

interface NavbarProps {
    title: string;
    links: {
        label: string;
        href: string;
    }[];
}

export default function Navbar({ title, links }: NavbarProps) {
    const pathname = usePathname();

    // set up theme switching hooks
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch by only showing the button after mounting
    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex justify-between items-center p-4 bg-[var(--groq-bg)] navbar-border" id="navbar">
            <div className="flex flex-col items-left space-x-4">
                <a href="/">
                    <h1 className="text-3xl font-extrabold text-[var(--groq-orange)] navbar-title">{title}</h1>
                </a>
                <p className="text-sm text-[var(--groq-fg)] flex items-center">
                    Powered by
                    {mounted && (
                        <Link href="https://www.groq.com">
                            <Image 
                                src={theme === "dark" ? "/groqwhite.svg" : "/groqblack.svg"} 
                                alt="Groq Logo" 
                                width={40} 
                                height={40} 
                                className="ml-1" 
                            />
                        </Link>
                    )}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${
                            pathname === link.href 
                                ? "font-bold" 
                                : "opacity-80 hover:opacity-100"
                        }
                                text-[var(--groq-fg)] transition-colors hover:bg-[var(--groq-bg-hover)] hover:text-[var(--groq-orange)] rounded-md navbar-link`}
                        style={{
                            cursor: "pointer",
                            textDecoration: "none",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "0.4rem",
                            transition: "all 0.2s ease"
                        }}
                    >
                        {link.label}
                    </Link>
                ))}
                
                {mounted && (
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="p-2 rounded-full hover:bg-white/10 text-[var(--groq-fg)] transition-colors"
                        aria-label="Toggle theme"
                        style={{
                            cursor: "pointer",
                            
                        }}
                    >
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                )}
            </div>
        </div>
    )
}
