export default function PrivacyPolicy() {
    return (
        <main className="bg-[#F5F5F4] text-[#1C1917] py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-[#1C1917]">Privacy Policy</h1>
                    <p className="text-gray-600">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">1. Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">Nordic Archive Fund ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">2. Information We Collect</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Personal Data: Name, email address, phone number, and other contact information</li>
                            <li>Payment Information: Credit card and billing information processed securely</li>
                            <li>Device Information: IP address, browser type, and operating system</li>
                            <li>Usage Data: Pages visited, time spent, and actions taken on our platform</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">3. Use of Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send promotional communications (with your consent)</li>
                            <li>Analyze usage patterns to improve user experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">4. Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">5. Third-Party Links</h2>
                        <p className="text-gray-700 leading-relaxed">Our website may contain links to third-party websites. We are not responsible for the privacy practices of other sites and encourage you to review their privacy policies.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">6. Your Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">Depending on your location, you may have certain rights regarding your personal information, including:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Right to access your data</li>
                            <li>Right to correct inaccurate data</li>
                            <li>Right to request deletion</li>
                            <li>Right to opt-out of marketing communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">7. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
                        <div className="mt-4 p-4 bg-white rounded border-l-4 border-[#EFAC02]">
                            <p className="text-gray-700">Email: example@gmail.com</p>
                            <p className="text-gray-700">Phone: +00 6543765**</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">8. Changes to This Policy</h2>
                        <p className="text-gray-700 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date above.</p>
                    </section>
                </div>
            </div>
        </main>
    );
}
