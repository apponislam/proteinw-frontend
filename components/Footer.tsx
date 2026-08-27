import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "./icons/SocialIcons";

const Footer = () => {
    return (
        <footer className="bg-[#F5F5F4] text-[#1C1917] py-12 sm:py-16 border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Kungsbjörnen</h2>
                            <p className="text-gray-600 leading-relaxed text-sm max-w-sm">
                                En enklare väg till en lyckad insamling. Vi hjälper skolor och föreningar att sälja smartare och nå sina mål tillsammans.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-6">
                            <Link 
                                href="/" 
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs text-gray-700 hover:bg-[#EFAC02] hover:text-white transition-all duration-300"
                            >
                                <FacebookIcon size={18} />
                            </Link>

                            <Link 
                                href="/" 
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs text-gray-700 hover:bg-[#EFAC02] hover:text-white transition-all duration-300"
                            >
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

                    {/* Öppettider */}
                    <div>
                        <h3 className="text-base font-bold mb-4 text-[#1C1917]">Öppettider</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                            <div>
                                <p className="font-semibold text-xs uppercase tracking-wider text-[#1C1917]">Öppettider Telefon</p>
                                <p className="text-xs text-gray-600 mt-0.5 font-medium">Måndag - Fredag 09:00 - 17:00</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs uppercase tracking-wider text-[#1C1917]">Öppettider Hämtlager</p>
                                <p className="text-xs text-gray-600 mt-0.5 font-medium">Måndag - Fredag 08:00 - 17:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base font-bold mb-4 text-[#1C1917]">Contact</h3>
                        <ul className="space-y-2.5 text-sm text-gray-600">
                            <li>
                                <span className="font-medium text-[#1C1917]">E-mail: </span>
                                <a href="mailto:kungsbjörnen@outreachsales.se" className="hover:text-[#EFAC02] transition-colors break-all">
                                    kungsbjörnen@outreachsales.se
                                </a>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-[#EFAC02] transition-colors">
                                    Contact Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-stone-200 mt-10 pt-6">
                    <p className="text-sm text-gray-500 text-center">
                        © {new Date().getFullYear()} Outreach Sales Sverige AB. Kungsbjörnen. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


