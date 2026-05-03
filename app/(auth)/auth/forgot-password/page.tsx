import Link from "next/link";

const page = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                        Kungsbörnen
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/auth/register" className="text-gray-700 font-medium hover:text-gray-900">
                            Sign Up
                        </Link>
                        <Link href="/auth/register" className="inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Form Card */}
                    <div className="bg-white border-dashed rounded-lg p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-black text-xl text-center font-extrabold">Kungsbjörnen</h1>
                            <h2 className="text-2xl text-gray-900">Forgot Password</h2>
                            <p className="text-sm text-gray-600 mt-2">Enter your email to receive a verification code</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                <div className="relative">
                                    <input type="email" placeholder="name@example.com" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>
                            </div>

                            {/* Send Code Button */}
                            <button type="submit" className="w-full bg-linear-to-r inline-flex items-center justify-center  from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2">
                                Send Code
                                <span>→</span>
                            </button>
                        </form>

                        {/* Back to Login Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-700">
                                Remember your password?{" "}
                                <Link href="/auth/login" className="text-amber-600 hover:text-amber-700 font-semibold">
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default page;
