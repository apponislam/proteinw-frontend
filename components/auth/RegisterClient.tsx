"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trophy, GraduationCap, Users, Target, Eye, EyeOff, ChevronDown, Check, Building2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import AuthHeader from "./AuthHeader";

// Step 1 Schema
const step1Schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Please enter a valid phone number"),
    profession: z.string().min(1, "Please select your profession"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
    age: z.boolean().refine((val) => val === true, "You must be 18+"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Step 2 Schema (Organization Details & Address)
const step2Schema = z.object({
    phone: z.string().min(1, "Phone is required"),
    profession: z.enum(["LEADER", "TEACHER", "PARENT", "COACH"]),
    address: z.object({
        organizationName: z.string().optional(),
        organizationType: z.string().optional(),
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        locality: z.string().optional(),
    }),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;

const RegisterClient = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const professionFromQuery = searchParams.get("profession");
    const [currentStep, setCurrentStep] = useState(1);
    const [step1Data, setStep1Data] = useState<Step1Values | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOrgTypeOpen, setIsOrgTypeOpen] = useState(false);
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

    const professions = [
        { name: "LEADER", icon: Trophy },
        { name: "TEACHER", icon: GraduationCap },
        { name: "PARENT", icon: Users },
        { name: "COACH", icon: Target },
    ];

    const organizationTypes = ["Skola", "Gymnasium", "Lag", "Idrottsförening"];

    // Step 1 Form
    const {
        control: controlStep1,
        handleSubmit: handleSubmitStep1,
        setValue: setValueStep1,
        watch: watchStep1,
        formState: { errors: errorsStep1 },
    } = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            profession: "",
            password: "",
            confirmPassword: "",
            terms: false,
            age: false,
        },
    });

    const passwordValue = watchStep1("password");
    const confirmPasswordValue = watchStep1("confirmPassword");

    // Step 2 Form
    const {
        control: controlStep2,
        handleSubmit: handleSubmitStep2,
        formState: { errors: errorsStep2 },
    } = useForm<Step2Values>({
        resolver: zodResolver(step2Schema),
        defaultValues: {
            address: {
                organizationName: "",
                organizationType: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                locality: "",
            },
        },
    });

    useEffect(() => {
        if (!professionFromQuery) return;

        const profession = professionFromQuery.toUpperCase();

        const validProfessions = ["LEADER", "TEACHER", "PARENT", "COACH"];

        if (validProfessions.includes(profession)) {
            setValueStep1("profession", profession);
        }
    }, [professionFromQuery, setValueStep1]);

    // Step 1 - Next Step (Store Step 1 values in state)
    const onSubmitStep1 = (data: Step1Values) => {
        setStep1Data(data);
        setCurrentStep(2);
    };

    // Step 2 - Complete Registration with Full Data in 1 Request
    const onSubmitStep2 = async (data: Step2Values) => {
        if (!step1Data) return;

        try {
            const formData = new FormData();
            formData.append(
                "body",
                JSON.stringify({
                    name: step1Data.name,
                    email: step1Data.email,
                    phone: step1Data.phone,
                    profession: step1Data.profession,
                    password: step1Data.password,
                    role: "ADMIN",
                    address: data.address,
                }),
            );

            const result = await register(formData).unwrap();
            dispatch(setUser({ user: result.data.user, token: result.data.accessToken }));
            router.push("/dashboard");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-100 to-blue-50">
            {/* Header */}
            <AuthHeader activePage="register" />

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-3 sm:px-4 py-6 sm:py-12">
                <div className="w-full max-w-2xl">
                    {/* Form Card */}
                    <div className="bg-white border-dashed rounded-lg p-4 sm:p-12">
                        {/* Logo and Title */}
                        <div className="text-center mb-6 sm:mb-10">
                            <h1 className="text-2xl font-extrabold text-[#7C5800]">Kungsbjörnen</h1>
                            <h2 className="text-lg font-bold text-gray-700 mt-1">
                                {currentStep === 1 && "Create your account"}
                                {currentStep === 2 && "Organization Details"}
                            </h2>
                        </div>

                        {/* Step 1 Form */}
                        {currentStep === 1 && (
                            <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">FULL NAME</label>
                                    <Controller
                                        name="name"
                                        control={controlStep1}
                                        render={({ field }) => <input type="text" placeholder="Erik Andersson" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                    />
                                    {errorsStep1.name && <p className="text-red-500 text-xs mt-1">{errorsStep1.name.message}</p>}
                                </div>

                                {/* Two Column Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                        <Controller
                                            name="email"
                                            control={controlStep1}
                                            render={({ field }) => <input type="email" placeholder="erik@archive.com" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                        />
                                        {errorsStep1.email && <p className="text-red-500 text-xs mt-1">{errorsStep1.email.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">PHONE NUMBER</label>
                                        <Controller
                                            name="phone"
                                            control={controlStep1}
                                            render={({ field }) => <input type="tel" placeholder="+46 00 000 00" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                        />
                                        {errorsStep1.phone && <p className="text-red-500 text-xs mt-1">{errorsStep1.phone.message}</p>}
                                    </div>
                                </div>

                                {/* Your Profession */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">YOUR PROFESSION</label>
                                    <Controller
                                        name="profession"
                                        control={controlStep1}
                                        render={({ field }) => (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                                {professions.map((profession) => {
                                                    const IconComponent = profession.icon;
                                                    const isSelected = field.value === profession.name;
                                                    return (
                                                        <label
                                                            key={profession.name}
                                                            className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                                                isSelected
                                                                    ? "border-[#7C5800] bg-amber-50/50 text-[#7C5800]"
                                                                    : "border-gray-200 bg-gray-50/80 hover:border-gray-300 text-gray-700"
                                                            }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="profession"
                                                                value={profession.name}
                                                                checked={isSelected}
                                                                onChange={() => field.onChange(profession.name)}
                                                                className="sr-only"
                                                            />
                                                            <IconComponent className="w-5 h-5 mb-1.5" />
                                                            <span className="text-xs font-semibold text-center leading-tight">{profession.name}</span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    />
                                    {errorsStep1.profession && <p className="text-red-500 text-xs mt-1">{errorsStep1.profession.message}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">PASSWORD</label>
                                    <div className="relative">
                                        <Controller
                                            name="password"
                                            control={controlStep1}
                                            render={({ field }) => <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full px-4 py-3 pr-10 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                        />
                                        <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none">
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errorsStep1.password && <p className="text-red-500 text-xs mt-1">{errorsStep1.password.message}</p>}

                                    {/* Password Strength Indicator */}
                                    {(() => {
                                        const getPasswordStrength = (pass: string) => {
                                            if (!pass) return { score: 0, label: "" };
                                            let score = 0;
                                            if (pass.length >= 8) score += 1;
                                            if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
                                            if (/[0-9]/.test(pass)) score += 1;
                                            if (/[^A-Za-z0-9]/.test(pass) || pass.length >= 12) score += 1;

                                            if (score <= 1) return { score: 1, label: "WEAK" };
                                            if (score === 2) return { score: 2, label: "FAIR" };
                                            if (score === 3) return { score: 3, label: "MODERATE" };
                                            return { score: 4, label: "STRONG" };
                                        };

                                        const strength = getPasswordStrength(passwordValue || "");

                                        return (
                                            <div className="mt-2 text-xs text-gray-600">
                                                <div className="mb-2">
                                                    <span className="font-semibold">STRENGTH:</span> <span className="text-blue-600 font-semibold">{strength.label}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4].map((step) => (
                                                        <div key={step} className={`h-1.5 w-full rounded-2xl transition-all duration-300 ${strength.score > 0 && step <= strength.score ? "bg-[#7C5800]" : "bg-[#7C58004D]"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">CONFIRM PASSWORD</label>
                                    <div className="relative">
                                        <Controller
                                            name="confirmPassword"
                                            control={controlStep1}
                                            render={({ field }) => (
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="w-full px-4 py-3 pr-10 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {/* Confirm Password Error Message */}
                                    {errorsStep1.confirmPassword ? (
                                        <p className="text-red-500 text-xs mt-1">{errorsStep1.confirmPassword.message}</p>
                                    ) : (
                                        confirmPasswordValue &&
                                        passwordValue &&
                                        confirmPasswordValue !== passwordValue && (
                                            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                                        )
                                    )}
                                </div>

                                {/* Terms & Conditions */}
                                <div className="space-y-3 pt-2">
                                    <Controller
                                        name="terms"
                                        control={controlStep1}
                                        render={({ field }) => (
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <div className="relative shrink-0 mt-0.5">
                                                    <input type="checkbox" className="sr-only peer" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all">
                                                        {field.value && (
                                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-700 flex-1">
                                                    I agree to the <span className="font-semibold">Terms of Service</span> and acknowledge the <span className="font-semibold">Privacy Policy</span> regarding how my data is managed.
                                                </span>
                                            </label>
                                        )}
                                    />
                                    {errorsStep1.terms && <p className="text-red-500 text-xs">{errorsStep1.terms.message}</p>}
                                    <Controller
                                        name="age"
                                        control={controlStep1}
                                        render={({ field }) => (
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <div className="relative shrink-0 mt-0.5">
                                                    <input type="checkbox" className="sr-only peer" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                                                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all">
                                                        {field.value && (
                                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-700 flex-1">I confirm that I am 18 years of age or older.</span>
                                            </label>
                                        )}
                                    />
                                    {errorsStep1.age && <p className="text-red-500 text-xs">{errorsStep1.age.message}</p>}
                                </div>

                                {/* Next Button */}
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6 cursor-pointer"
                                >
                                    <span>Next Step</span>
                                    <span>→</span>
                                </button>
                            </form>
                        )}

                        {/* Step 2 Form */}
                        {currentStep === 2 && (
                            <form onSubmit={handleSubmitStep2(onSubmitStep2)} className="space-y-6">
                                {/* Organization Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ORGANIZATION NAME</label>
                                    <Controller
                                        name="address.organizationName"
                                        control={controlStep2}
                                        render={({ field }) => <input type="text" placeholder="Organization Name" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                    />
                                    {errorsStep2.address?.organizationName && <p className="text-red-500 text-xs mt-1">{errorsStep2.address.organizationName.message}</p>}
                                </div>

                                {/* Organization Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ORGANIZATION TYPE</label>
                                    <Controller
                                        name="address.organizationType"
                                        control={controlStep2}
                                        render={({ field }) => (
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOrgTypeOpen((prev) => !prev)}
                                                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-[#7C5800] cursor-pointer"
                                                >
                                                    <span className="flex items-center gap-2.5">
                                                        <Building2 className="w-4 h-4 text-gray-500" />
                                                        {field.value ? <span className="text-gray-900 font-semibold">{field.value}</span> : <span className="text-gray-500">Select organization type</span>}
                                                    </span>
                                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOrgTypeOpen ? "rotate-180 text-[#7C5800]" : ""}`} />
                                                </button>

                                                {/* Dropdown Menu Overlay */}
                                                {isOrgTypeOpen && (
                                                    <>
                                                        <div className="fixed inset-0 z-10" onClick={() => setIsOrgTypeOpen(false)} />
                                                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-xl z-20 overflow-hidden py-1 divide-y divide-gray-100 animate-in fade-in zoom-in-95 duration-150">
                                                            {organizationTypes.map((orgType) => {
                                                                const isSelected = field.value === orgType;
                                                                return (
                                                                    <button
                                                                        key={orgType}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            field.onChange(orgType);
                                                                            setIsOrgTypeOpen(false);
                                                                        }}
                                                                        className={`w-full px-4 py-3 flex items-center justify-between text-sm transition-all cursor-pointer ${
                                                                            isSelected ? "bg-amber-50 text-[#7C5800] font-bold" : "text-gray-700 hover:bg-stone-50 font-medium"
                                                                        }`}
                                                                    >
                                                                        <span>{orgType}</span>
                                                                        {isSelected && <Check className="w-4 h-4 text-[#7C5800]" />}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                {/* Street */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">STREET</label>
                                    <Controller
                                        name="address.street"
                                        control={controlStep2}
                                        render={({ field }) => <input type="text" placeholder="Street Address" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                    />
                                </div>

                                {/* City and State */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">CITY</label>
                                        <Controller
                                            name="address.city"
                                            control={controlStep2}
                                            render={({ field }) => <input type="text" placeholder="City" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">STATE</label>
                                        <Controller
                                            name="address.state"
                                            control={controlStep2}
                                            render={({ field }) => <input type="text" placeholder="State" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                        />
                                    </div>
                                </div>

                                {/* Zip Code and Locality */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP CODE</label>
                                        <Controller
                                            name="address.zipCode"
                                            control={controlStep2}
                                            render={({ field }) => <input type="text" placeholder="Zip Code" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">LOCALITY</label>
                                        <Controller
                                            name="address.locality"
                                            control={controlStep2}
                                            render={({ field }) => <input type="text" placeholder="Locality" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />}
                                        />
                                    </div>
                                </div>

                                {/* Complete Registration Button */}
                                <button
                                    type="submit"
                                    disabled={isRegisterLoading}
                                    className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isRegisterLoading ? "Creating Account..." : "Create Account"}
                                    <span>→</span>
                                </button>
                            </form>
                        )}

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

            {/* Progress Bar */}
            <div className="pb-12 max-w-2xl mx-auto px-4">
                <p className="mb-2 text-xs sm:text-sm font-medium text-gray-600">Step {currentStep} of 2</p>
                <div className="flex items-center gap-3">
                    <div className={`w-full h-1.5 rounded-full ${currentStep >= 1 ? "bg-[#7C5800]" : "bg-[#D7CCB2]"}`}></div>
                    <div className={`w-full h-1.5 rounded-full ${currentStep >= 2 ? "bg-[#7C5800]" : "bg-[#D7CCB2]"}`}></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterClient;
