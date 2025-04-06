import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href }: { children: React.ReactNode, href: string }) {
    const pathname = usePathname();

    return (
        <Link 
            key={href}
            href={href}
            className={`
                flex flex-row items-center gap-2
                ${
                    pathname === href 
                        ? "font-bold bg-[var(--groq-bg-hover)] text-[var(--groq-orange)]" 
                        : "opacity-80 hover:opacity-100"
                }
                text-[var(--groq-fg)] transition-colors hover:bg-[var(--groq-bg-hover)] hover:text-[var(--groq-orange)] rounded-md navbar-link
            `}
            style={{
                cursor: "pointer",
                textDecoration: "none",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.4rem",
                transition: "all 0.2s ease"
            }}
        >
            {children}
        </Link>
    );
}
