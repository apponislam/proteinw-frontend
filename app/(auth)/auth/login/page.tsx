"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Please enter your password"),
    remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const page = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("Login form submitted:", data);
    };
    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50 ">
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
                    <div className="bg-white  border-dashed  rounded-lg p-8">
                        {/* Logo and Title */}
                        <div className="text-center mb-8">
                            <h1 className="text-black text-xl text-center font-extrabold">Kungsbjörnen</h1>

                            <h2 className="text-2xl  text-gray-900">Log In</h2>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                <div className="relative">
                                    <Controller name="email" control={control} render={({ field }) => <input type="email" placeholder="name@example.com" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">PASSWORD</label>
                                <div className="relative">
                                    <Controller name="password" control={control} render={({ field }) => <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                <div className="text-right mt-2">
                                    <Link href="/auth/forgot-password" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <Controller
                                    name="remember"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 cursor-pointer" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 cursor-pointer">
                                                Remember me
                                            </label>
                                        </>
                                    )}
                                />
                            </div>

                            {/* Sign In Button */}
                            <button type="submit" className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2">
                                Sign In
                                <span>→</span>
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-700">
                                Don&apos;t have an account?{" "}
                                <Link href="/auth/register" className="text-amber-600 hover:text-amber-700 font-semibold">
                                    Create an account
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
