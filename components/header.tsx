"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { currentUser, logOut } from "@/redux/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Menu, X } from "lucide-react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Sell With Us", href: "/sell-with-us" },
    { name: "Products", href: "/products" },
    { name: "Profit", href: "/profit" },
    { name: "About Us", href: "/about-us" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [scrolled, setScrolled] = useState(false);
    const user = useAppSelector(currentUser);
    console.log("user", user);
    console.log("user name", user?.name);

    const handleLogout = () => {
        dispatch(logOut());
        setIsDropdownOpen(false);
        setIsOpen(false);
        router.push("/auth/login");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(".avatar-dropdown-container")) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

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
        <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300  ${scrolled ? "border-border bg-background shadow-sm py-2" : "border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-6"}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex  items-center justify-between">
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
                        <Link href="/dashboard" title="Dashboard">
                            <LayoutDashboard className="text-[#F59E0B] hover:scale-105 transition-transform" />
                        </Link>
                        {user ? (
                            <div className="relative avatar-dropdown-container">
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center focus:outline-none transition-all duration-200 hover:scale-105" aria-haspopup="true" aria-expanded={isDropdownOpen} title="User Menu">
                                    {user.profileImage ? (
                                        <Image src={user.profileImage} alt={user.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-[#F59E0B]" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-linear-to-r from-[#7C5800] to-[#FFB800] flex items-center justify-center text-white font-bold text-xs shadow-sm uppercase">
                                            {user.name
                                                ? user.name
                                                      .split(" ")
                                                      .map((n) => n[0])
                                                      .join("")
                                                      .slice(0, 2)
                                                : "U"}
                                        </div>
                                    )}
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 rounded-xl shadow-xl bg-white border border-gray-100 focus:outline-none z-50 overflow-hidden divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <div className="px-4 py-3 bg-gray-50/50">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">{user.name}</p>
                                            {user.email && <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>}
                                        </div>
                                        <div className="p-1.5 space-y-1">
                                            <Link href="/dashboard" className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-[#F59E0B]/10 hover:text-[#7C5800] rounded-lg transition-all duration-150 group font-medium" onClick={() => setIsDropdownOpen(false)}>
                                                <LayoutDashboard className="h-4 w-4 mr-2.5 text-[#F59E0B] group-hover:scale-110 transition-transform duration-150" />
                                                Dashboard
                                            </Link>
                                            <button onClick={handleLogout} className="w-full flex items-center text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-150 group font-medium cursor-pointer">
                                                <svg className="h-4 w-4 mr-2.5 text-red-500 group-hover:translate-x-0.5 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/auth/login" className="text-sm font-medium text-foreground hover:text-[#F59E0B] transition-colors">
                                    Login
                                </Link>
                                <Link href="/auth/register" className="font-bold px-6 inline-flex items-center justify-center rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800]  py-3 text-sm text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">
                                    Get Started
                                </Link>
                            </>
                        )}
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
                                {user ? (
                                    <div className="px-5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                                <LayoutDashboard className="text-[#F59E0B]" />
                                            </Link>
                                            <div className="flex items-center space-x-3">
                                                {user.profileImage ? (
                                                    <Image src={user.profileImage} alt={user.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover border border-border" />
                                                ) : (
                                                    <div className="w-9 h-9 rounded-full bg-linear-to-r from-[#7C5800] to-[#FFB800] flex items-center justify-center text-white font-bold text-xs shadow-sm uppercase">
                                                        {user.name
                                                            ? user.name
                                                                  .split(" ")
                                                                  .map((n) => n[0])
                                                                  .join("")
                                                                  .slice(0, 2)
                                                            : "U"}
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-foreground">{user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                            <Link href="/dashboard" className="flex items-center px-3 py-2 text-base font-medium rounded-md text-foreground hover:text-[#F59E0B] hover:bg-muted transition-colors" onClick={() => setIsOpen(false)}>
                                                <LayoutDashboard className="h-5 w-5 mr-3 text-[#F59E0B]" />
                                                Dashboard
                                            </Link>
                                            <button onClick={handleLogout} className="w-full flex items-center text-left px-3 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer">
                                                <svg className="h-5 w-5 mr-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Log Out
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center px-5 space-x-4">
                                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                            <LayoutDashboard className="text-[#F59E0B]" />
                                        </Link>
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
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
