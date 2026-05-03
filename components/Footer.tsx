import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "./icons/SocialIcons";

const Footer = () => {
    return (
        <footer className="bg-[#F5F5F4] text-[#1C1917] py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">NordicArchive Fund</h2>

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
                        <h3 className="text-lg font-semibold mb-5">Resource Centre</h3>

                        <ul className="space-y-3 text-sm text-gray-600">
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
                                <Link href="/cookie-policy" className="hover:text-[#EFAC02] transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">Contact</h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <Link href="/contact-support" className="hover:text-[#EFAC02] transition-colors">
                                    Contact Support
                                </Link>
                            </li>

                            <li>
                                <Link href="/support-portal" className="hover:text-[#EFAC02] transition-colors">
                                    Support Portal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">Legal</h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>Phone: +00 6543765**</li>
                            <li>E-mail: example@gmail.com</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-black/10 mt-16 pt-6">
                    <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} Outreach Sales Sverige AB. Kungsbjörnen. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
