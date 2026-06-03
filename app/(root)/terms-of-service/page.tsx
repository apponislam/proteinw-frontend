import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Terms of Service",
    description: "Kungsbjörnen terms of service",
};

export default function TermsOfService() {
    return (
        <main className="bg-[#F5F5F4] text-[#1C1917] py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-[#1C1917]">Terms of Service</h1>
                    <p className="text-gray-600">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">1. Agreement to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">By accessing and using the Nordic Archive Fund website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">2. Use License</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">Permission is granted to temporarily download one copy of the materials (information or software) on the Nordic Archive Fund website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose or for any public display</li>
                            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                            <li>Remove any copyright or other proprietary notations from the materials</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">3. Disclaimer</h2>
                        <p className="text-gray-700 leading-relaxed">
                            The materials on the Nordic Archive Fund website are provided on an "as is" basis. Nordic Archive Fund makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other
                            violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">4. Limitations</h2>
                        <p className="text-gray-700 leading-relaxed">In no event shall Nordic Archive Fund or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Nordic Archive Fund website.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">5. Accuracy of Materials</h2>
                        <p className="text-gray-700 leading-relaxed">
                            The materials appearing on the Nordic Archive Fund website could include technical, typographical, or photographic errors. Nordic Archive Fund does not warrant that any of the materials on its website are accurate, complete, or current. Nordic Archive Fund may make changes to the materials contained on its website at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">6. Links</h2>
                        <p className="text-gray-700 leading-relaxed">Nordic Archive Fund has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Nordic Archive Fund of the site. Use of any such linked website is at the user's own risk.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">7. Modifications</h2>
                        <p className="text-gray-700 leading-relaxed">Nordic Archive Fund may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">8. User Responsibilities</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">As a user of our website, you agree to:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Provide accurate and complete information</li>
                            <li>Maintain the confidentiality of your account information</li>
                            <li>Comply with all applicable laws and regulations</li>
                            <li>Not engage in any unlawful or prohibited activities</li>
                            <li>Not transmit viruses, malware, or any code of destructive nature</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">9. Payment Terms</h2>
                        <p className="text-gray-700 leading-relaxed">All payments are processed securely. By making a payment, you authorize Nordic Archive Fund to charge your payment method for the services or products purchased. Refund policies are detailed in our separate Refund Policy document.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 ">10. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">If you have any questions about these Terms of Service, please contact us at:</p>
                        <div className="mt-4 p-4 bg-white rounded border-l-4 border-[#EFAC02]">
                            <p className="text-gray-700">Email: example@gmail.com</p>
                            <p className="text-gray-700">Phone: +00 6543765**</p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
