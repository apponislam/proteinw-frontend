import React from "react";

const footerLinks = [
    {
        title: "Resource Centre",
        links: ["FAQ", "Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
        title: "Legal",
        links: ["Phone", "E-mail"],
    },
    {
        title: "Contact",
        links: ["Contact Support", "Support Portal"],
    },
];

const Footer = () => {
    return (
        <footer className="bg-[#F5F5F4] text-[#1C1917] py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-14">
                    {/* Left Content */}
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl font-bold mb-6">NordicArchive Fund</h2>

                        <p className="text-gray-400 leading-relaxed text-sm max-w-sm">Empowering local communities through intentional design and generosity.</p>
                    </div>

                    {/* Footer Links */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-semibold mb-5">{section.title}</h3>

                                <ul className="space-y-3">
                                    {section.links.map((link, idx) => (
                                        <li key={idx}>
                                            <a href="#" className="text-gray-400 hover:text-[#EFAC02] transition-colors duration-300 text-sm">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 text-center md:text-left">© Outreach Sales Sverige AB. Kungsbjörnen. All rights reserved.</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <a href="#" className="hover:text-[#EFAC02] transition-colors">
                            Privacy
                        </a>

                        <a href="#" className="hover:text-[#EFAC02] transition-colors">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
