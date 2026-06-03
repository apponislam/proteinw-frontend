"use client";

import Link from "next/link";
import { useState } from "react";
import { Trophy, GraduationCap, Users, Target } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Please enter a valid phone number"),
    organization: z.string().min(2, "Please enter your organization name"),
    groupName: z.string().min(2, "Please enter your group/team name"),
    profession: z.string().min(1, "Please select your profession"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
    age: z.boolean().refine((val) => val === true, "You must be 18+"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterClient = () => {
    const [selectedProfession, setSelectedProfession] = useState<string | null>(null);

    const professions = [
        { name: "LEADER", icon: Trophy },
        { name: "TEACHER", icon: GraduationCap },
        { name: "PARENT", icon: Users },
        { name: "COACH", icon: Target },
    ];

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            organization: "",
            groupName: "",
            profession: "",
            password: "",
            terms: false,
            age: false,
        },
    });

    const onSubmit = (data: RegisterFormValues) => {
        console.log("Form submitted:", data);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition">
                        Kungsbörnen
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href="/auth/login" className="text-gray-700 font-medium hover:text-gray-900">
                            Sign In
                        </Link>
                        <Link href="/auth/register" className="inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-2xl">
                    {/* Form Card */}
                    <div className="bg-white border-dashed rounded-lg p-8 sm:p-12">
                        {/* Logo and Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-black text-xl text-center font-extrabold mb-4">Kungsbjörnen</h1>
                            <h2 className="text-3xl text-gray-900 font-bold">Create your account</h2>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">FULL NAME</label>
                                <Controller name="fullName" control={control} render={({ field }) => <input type="text" placeholder="Erik Andersson" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                            </div>

                            {/* Two Column Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                    <Controller name="email" control={control} render={({ field }) => <input type="email" placeholder="erik@archive.com" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">PHONE NUMBER</label>
                                    <Controller name="phone" control={control} render={({ field }) => <input type="tel" placeholder="+46 00 000 00" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>

                            {/* Organization Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">ORGANIZATION CATEGORY</label>
                                <Controller name="organization" control={control} render={({ field }) => <input type="text" placeholder="School Name" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                {errors.organization && <p className="text-red-500 text-xs mt-1">{errors.organization.message}</p>}
                            </div>

                            {/* Group/Team Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">GROUP / TEAM NAME</label>
                                <Controller name="groupName" control={control} render={({ field }) => <input type="text" placeholder="Class 2024 / Team Blue" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                {errors.groupName && <p className="text-red-500 text-xs mt-1">{errors.groupName.message}</p>}
                            </div>

                            {/* Your Profession */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">YOUR PROFESSION</label>
                                <Controller
                                    name="profession"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                            {professions.map((profession) => {
                                                const Icon = profession.icon;
                                                const isSelected = selectedProfession === profession.name;
                                                return (
                                                    <button
                                                        key={profession.name}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedProfession(profession.name);
                                                            field.onChange(profession.name);
                                                        }}
                                                        className={`px-3 py-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${isSelected ? "border-[#7C5800] bg-[#FFDEA8] text-[#271900] font-semibold" : "border-white bg-[#E8E8E8] text-[#78716C] hover:border-[#EFAC02] hover:bg-white"}`}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        {profession.name}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                />
                                {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">PASSWORD</label>
                                <div className="relative">
                                    <Controller name="password" control={control} render={({ field }) => <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                <div className="mt-2 text-xs text-gray-600">
                                    <span className="font-semibold">STRENGTH:</span> <span className="text-blue-600">MODERATE</span>
                                </div>
                            </div>

                            {/* Terms & Conditions */}
                            <div className="space-y-3 pt-2">
                                <Controller
                                    name="terms"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                            <span className="text-sm text-gray-700">
                                                I agree to the <span className="font-semibold">Terms of Service</span> and acknowledge the <span className="font-semibold">Privacy Policy</span> regarding how my data is managed.
                                            </span>
                                        </label>
                                    )}
                                />
                                {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}
                                <Controller
                                    name="age"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                            <span className="text-sm text-gray-700">I am 18+</span>
                                        </label>
                                    )}
                                />
                                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                            </div>

                            {/* Create Account Button */}
                            <button type="submit" className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6">
                                Create Account
                                <span>→</span>
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="text-center mt-8">
                            <p className="text-gray-700">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="text-amber-600 hover:text-amber-700 font-semibold">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegisterClient;
