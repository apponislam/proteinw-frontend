"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, X } from "lucide-react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Sell With Us", href: "/sell" },
    { name: "Products", href: "/products" },
    { name: "Profit", href: "/profit" },
    { name: "About Us", href: "/about" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            if (y > 180 && !scrolled) {
                setScrolled(true);
            } else if (y < 60 && scrolled) {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    return (
        <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? "border-border bg-background shadow-sm" : "border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex py-4 items-center justify-between">
                    {/* Left Section - Logo */}
                    <div className="shrink-0">
                        <Link href="/" className="text-xl font-bold text-black hover:text-[#F59E0B]/80 transition-colors">
                            Kungsbjörnen
                        </Link>
                    </div>

                    {/* Middle Section - Navigation (Desktop) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className={`text-sm font-medium transition-colors relative group ${item.href === pathname ? "text-[#F59E0B]" : "text-foreground hover:text-[#F59E0B]"}`}>
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F59E0B] transition-all ${item.href === pathname ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Section - Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-8">
                        <LayoutDashboard className="text-[#F59E0B]" />
                        <Link href="/auth/login" className="text-sm font-medium text-foreground hover:text-[#F59E0B] transition-colors">
                            Login
                        </Link>
                        <Link href="/auth/register" className="font-bold px-6 inline-flex items-center justify-center rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800]  py-3 text-sm text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-[#F59E0B] hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F59E0B]" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border/40">
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href} className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${item.href === pathname ? "text-[#F59E0B] bg-muted" : "text-foreground hover:text-[#F59E0B] hover:bg-muted"}`} onClick={() => setIsOpen(false)}>
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4 pb-3 border-t border-border/40">
                                <div className="flex items-center px-5 space-x-4">
                                    <LayoutDashboard className="text-[#F59E0B]" />
                                    <Link href="/auth/login" className="text-base font-medium text-foreground hover:text-[#F59E0B] transition-colors" onClick={() => setIsOpen(false)}>
                                        Login
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-4 py-2 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
