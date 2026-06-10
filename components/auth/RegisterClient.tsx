"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trophy, GraduationCap, Users, Target } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useRegisterMutation, useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser, currentToken } from "@/redux/features/auth/authSlice";

// Step 1 Schema
const step1Schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Please enter a valid phone number"),
    profession: z.string().min(1, "Please select your profession"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
    age: z.boolean().refine((val) => val === true, "You must be 18+"),
});

// Step 2 Schema (Address fields)
const step2Schema = z.object({
    address: z.object({
        organizationName: z.string().min(2, "Please enter organization name").optional(),
        organizationType: z.string().optional(),
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional(),
    }),
});

// Step 3 Schema
const step3Schema = z.object({
    goal: z.string().optional(),
    salesStartDate: z.string().optional(),
    salesEndDate: z.string().optional(),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;
type Step3Values = z.infer<typeof step3Schema>;

const RegisterClient = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const professionFromQuery = searchParams.get("profession");
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
    const [updateProfile, { isLoading: isUpdateLoading }] = useUpdateProfileMutation();
    const token = useSelector(currentToken);

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
        formState: { errors: errorsStep1 },
    } = useForm<Step1Values>({
        resolver: zodResolver(step1Schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            profession: "",
            password: "",
            terms: false,
            age: false,
        },
    });

    // Step 2 Form
    const {
        control: controlStep2,
        handleSubmit: handleSubmitStep2,
        formState: { errors: errorsStep2 },
        setValue: setValueStep2,
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
                country: "",
            },
        },
    });

    // Step 3 Form
    const {
        control: controlStep3,
        handleSubmit: handleSubmitStep3,
        formState: { errors: errorsStep3 },
    } = useForm<z.infer<typeof step3Schema>>({
        resolver: zodResolver(step3Schema),
        defaultValues: {
            goal: "",
            salesStartDate: "",
            salesEndDate: "",
        },
    });

    useEffect(() => {
        if (!professionFromQuery) return;

        const profession = professionFromQuery.toUpperCase();

        const validProfessions = ["LEADER", "TEACHER", "PARENT", "COACH"];

        if (validProfessions.includes(profession)) {
            setSelectedProfession(profession);
            setValueStep1("profession", profession);
        }
    }, [professionFromQuery, setValueStep1]);

    // Step 1 Submit - Register
    const onSubmitStep1 = async (data: Step1Values) => {
        try {
            const formData = new FormData();
            // Wrap data in a body field as JSON string (as expected by backend)
            formData.append(
                "body",
                JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    profession: data.profession,
                    password: data.password,
                    role: "ADMIN",
                }),
            );

            const result = await register(formData).unwrap();
            dispatch(setUser({ user: result.data.user, token: result.data.accessToken }));
            setCurrentStep(2);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    // Step 2 Submit - Address fields
    const onSubmitStep2 = async (data: Step2Values) => {
        try {
            const formData = new FormData();
            // Wrap data in a body field as JSON string (as expected by backend)
            formData.append(
                "body",
                JSON.stringify({
                    address: data.address,
                }),
            );

            const result = await updateProfile(formData).unwrap();
            dispatch(setUser({ user: result.data, token: token || "" }));
            setCurrentStep(3);
        } catch (error) {
            console.error("Profile update failed:", error);
        }
    };

    // Step 3 Submit - Goal and dates
    const onSubmitStep3 = async (data: Step3Values) => {
        try {
            const formData = new FormData();
            // Wrap data in a body field as JSON string (as expected by backend)
            formData.append(
                "body",
                JSON.stringify({
                    goal: data.goal ? Number(data.goal) : undefined,
                    salesStartDate: data.salesStartDate,
                    salesEndDate: data.salesEndDate,
                }),
            );

            const result = await updateProfile(formData).unwrap();
            dispatch(setUser({ user: result.data, token: token || "" }));
            router.push("/dashboard");
        } catch (error) {
            console.error("Profile update failed:", error);
        }
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
                            <h2 className="text-3xl text-gray-900 font-bold">
                                {currentStep === 1 && "Create your account"}
                                {currentStep === 2 && "Organization Details"}
                                {currentStep === 3 && "Your Goals"}
                            </h2>
                        </div>

                        {/* Step 1 Form */}
                        {currentStep === 1 && (
                            <form onSubmit={handleSubmitStep1(onSubmitStep1)} className="space-y-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">FULL NAME</label>
                                    <Controller name="name" control={controlStep1} render={({ field }) => <input type="text" placeholder="Erik Andersson" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    {errorsStep1.name && <p className="text-red-500 text-xs mt-1">{errorsStep1.name.message}</p>}
                                </div>

                                {/* Two Column Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                        <Controller name="email" control={controlStep1} render={({ field }) => <input type="email" placeholder="erik@archive.com" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                        {errorsStep1.email && <p className="text-red-500 text-xs mt-1">{errorsStep1.email.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">PHONE NUMBER</label>
                                        <Controller name="phone" control={controlStep1} render={({ field }) => <input type="tel" placeholder="+46 00 000 00" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
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
                                    {errorsStep1.profession && <p className="text-red-500 text-xs mt-1">{errorsStep1.profession.message}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">PASSWORD</label>
                                    <div className="relative">
                                        <Controller name="password" control={controlStep1} render={({ field }) => <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    </div>
                                    {errorsStep1.password && <p className="text-red-500 text-xs mt-1">{errorsStep1.password.message}</p>}
                                    <div className="mt-2 text-xs text-gray-600">
                                        <span className="font-semibold">STRENGTH:</span> <span className="text-blue-600">MODERATE</span>
                                    </div>
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
                                    disabled={isRegisterLoading}
                                    className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6"
                                >
                                    {isRegisterLoading ? "Creating Account..." : "Next Step"}
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
                                    <Controller name="address.organizationName" control={controlStep2} render={({ field }) => <input type="text" placeholder="Organization Name" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    {errorsStep2.address?.organizationName && <p className="text-red-500 text-xs mt-1">{errorsStep2.address.organizationName.message}</p>}
                                </div>

                                {/* Organization Type */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ORGANIZATION TYPE</label>
                                    <Controller
                                        name="address.organizationType"
                                        control={controlStep2}
                                        render={({ field }) => (
                                            <select {...field} className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                                <option value="" disabled>
                                                    Select organization type
                                                </option>
                                                {organizationTypes.map((orgType) => (
                                                    <option key={orgType} value={orgType}>
                                                        {orgType}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>

                                {/* Street */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">STREET</label>
                                    <Controller name="address.street" control={controlStep2} render={({ field }) => <input type="text" placeholder="Street Address" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                </div>

                                {/* City and State */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">CITY</label>
                                        <Controller name="address.city" control={controlStep2} render={({ field }) => <input type="text" placeholder="City" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">STATE</label>
                                        <Controller name="address.state" control={controlStep2} render={({ field }) => <input type="text" placeholder="State" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    </div>
                                </div>

                                {/* Zip Code and Country */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP CODE</label>
                                        <Controller name="address.zipCode" control={controlStep2} render={({ field }) => <input type="text" placeholder="Zip Code" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">COUNTRY</label>
                                        <Controller name="address.country" control={controlStep2} render={({ field }) => <input type="text" placeholder="Country" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                    </div>
                                </div>

                                {/* Next Button */}
                                <button
                                    type="submit"
                                    disabled={isUpdateLoading}
                                    className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6"
                                >
                                    {isUpdateLoading ? "Saving..." : "Next Step"}
                                    <span>→</span>
                                </button>
                            </form>
                        )}

                        {/* Step 3 Form */}
                        {currentStep === 3 && (
                            <form onSubmit={handleSubmitStep3(onSubmitStep3)} className="space-y-6">
                                {/* Goal */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">YOUR GOAL</label>
                                    <Controller name="goal" control={controlStep3} render={({ field }) => <input type="number" placeholder="Enter your goal" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                </div>

                                {/* Sales Start Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">SALES START DATE</label>
                                    <Controller name="salesStartDate" control={controlStep3} render={({ field }) => <input type="date" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                </div>

                                {/* Sales End Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">SALES END DATE</label>
                                    <Controller name="salesEndDate" control={controlStep3} render={({ field }) => <input type="date" className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" {...field} />} />
                                </div>

                                {/* Complete Button */}
                                <button
                                    type="submit"
                                    disabled={isUpdateLoading}
                                    className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6"
                                >
                                    {isUpdateLoading ? "Finalizing..." : "Complete & Go to Dashboard"}
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
            <div className="pb-12 max-w-2xl mx-auto">
                <p className="mb-2">Step {currentStep} of 3</p>
                <div className="flex items-center gap-3">
                    <div className={`w-full h-1.5 rounded-full ${currentStep >= 1 ? "bg-[#7C5800]" : "bg-[#D7CCB2]"}`}></div>
                    <div className={`w-full h-1.5 rounded-full ${currentStep >= 2 ? "bg-[#7C5800]" : "bg-[#D7CCB2]"}`}></div>
                    <div className={`w-full h-1.5 rounded-full ${currentStep >= 3 ? "bg-[#7C5800]" : "bg-[#D7CCB2]"}`}></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterClient;
