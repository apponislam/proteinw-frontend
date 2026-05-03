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
                            <h2 className="text-2xl text-gray-900">Create New Password</h2>
                            <p className="text-sm text-gray-600 mt-2">Enter your new password below</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6">
                            {/* New Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">NEW PASSWORD</label>
                                <div className="relative">
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">CONFIRM PASSWORD</label>
                                <div className="relative">
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-blue-50 p-3 rounded-lg text-xs text-gray-600">
                                <p className="font-semibold mb-2">Password must contain:</p>
                                <ul className="space-y-1">
                                    <li>✓ At least 8 characters</li>
                                    <li>✓ One uppercase letter</li>
                                    <li>✓ One lowercase letter</li>
                                    <li>✓ One number</li>
                                </ul>
                            </div>

                            {/* Reset Button */}
                            <button type="submit" className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2">
                                Reset Password
                                <span>→</span>
                            </button>
                        </form>

                        {/* Back to Login Link */}
                        <div className="text-center mt-6">
                            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default page;
