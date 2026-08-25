import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "./icons/SocialIcons";

const Footer = () => {
    return (
        <footer className="bg-[#F5F5F4] text-[#1C1917] py-16 sm:py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">NordicArchive Fund</h2>

                        <p className="text-gray-600 leading-relaxed text-sm max-w-xs">Empowering local communities through intentional design and generosity.</p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-6">
                            <Link href="/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#EFAC02] hover:text-white transition-all duration-300">
                                <FacebookIcon size={18} />
                            </Link>

                            <Link href="/" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#EFAC02] hover:text-white transition-all duration-300">
                                <InstagramIcon size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Resource Centre */}
                    <div>
                        <h3 className="text-base font-bold mb-4 text-[#1C1917]">Resource Centre</h3>

                        <ul className="space-y-2.5 text-sm text-gray-600">
                            <li>
                                <Link href="/faq" className="hover:text-[#EFAC02] transition-colors">
                                    FAQ
                                </Link>
                            </li>

                            <li>
                                <Link href="/privacy-policy" className="hover:text-[#EFAC02] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link href="/terms-of-service" className="hover:text-[#EFAC02] transition-colors">
                                    Terms of Service
                                </Link>
                            </li>

                            <li>
                                <Link href="/about-us" className="hover:text-[#EFAC02] transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Öppettider (Opening Hours) */}
                    <div>
                        <h3 className="text-base font-bold mb-4 text-[#1C1917]">Öppettider</h3>

                        <div className="space-y-3.5 text-sm text-gray-600">
                            <div>
                                <h4 className="font-semibold text-[#1C1917] text-xs uppercase tracking-wider">Öppettider Telefon</h4>
                                <p className="text-xs text-gray-600 mt-0.5 font-medium">Måndag - Fredag 09:00 - 17:00</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-[#1C1917] text-xs uppercase tracking-wider">Öppettider Hämtlager</h4>
                                <p className="text-xs text-gray-600 mt-0.5 font-medium">Måndag - Fredag 08:00 - 17:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base font-bold mb-4 text-[#1C1917]">Contact</h3>

                        <ul className="space-y-2.5 text-sm text-gray-600">
                            <li>
                                <Link href="/faq" className="hover:text-[#EFAC02] transition-colors">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-base font-bold mb-4 text-[#1C1917]">Legal</h3>

                        <ul className="space-y-2.5 text-sm text-gray-600">
                            <li>
                                Phone:{" "}
                                <a href="tel:+46081234567" className="hover:text-[#7c5800] transition-colors">
                                    +46 (0) 8 123 45 67
                                </a>
                            </li>
                            <li>
                                E-mail:{" "}
                                <a href="mailto:hello@nordicarchive.fund" className="hover:text-[#7c5800] transition-colors">
                                    hello@nordicarchive.fund
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-black/10 mt-12 pt-6">
                    <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} Outreach Sales Sverige AB. Kungsbjörnen. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
