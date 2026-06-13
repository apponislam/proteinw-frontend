"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSellerMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const sellerRegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
    age: z.boolean().refine((val) => val === true, "You must be 18+"),
});

type SellerRegisterFormValues = z.infer<typeof sellerRegisterSchema>;

const RegisterSellerClient = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get("email") || "";

    const [registerSeller, { isLoading }] = useRegisterSellerMutation();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SellerRegisterFormValues>({
        resolver: zodResolver(sellerRegisterSchema),
        defaultValues: {
            name: "",
            email: emailFromQuery,
            phone: "",
            password: "",
            terms: false,
            age: false,
        },
    });

    useEffect(() => {
        if (emailFromQuery) {
            setValue("email", emailFromQuery);
        }
    }, [emailFromQuery, setValue]);

    const onSubmit = async (data: SellerRegisterFormValues) => {
        const toastId = toast.loading("Creating seller account...");
        try {
            const formData = new FormData();
            formData.append(
                "body",
                JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                }),
            );

            const result = await registerSeller(formData).unwrap();
            dispatch(setUser({ user: result.data.user, token: result.data.accessToken }));
            toast.success("Registration successful!", { id: toastId });
            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error?.data?.message || "Registration failed. Please try again.", { id: toastId });
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
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
                <div className="w-full max-w-xl">
                    <div className="bg-white border-dashed rounded-lg p-8 sm:p-12">
                        {/* Title */}
                        <div className="text-center mb-10">
                            <h1 className="text-black text-xl text-center font-extrabold mb-4">Kungsbjörnen</h1>
                            <h2 className="text-3xl text-gray-900 font-bold">Join the Fundraising Team</h2>
                            <p className="text-sm text-gray-600 mt-2">Create your seller account to get started.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">FULL NAME</label>
                                <Controller 
                                    name="name" 
                                    control={control} 
                                    render={({ field }) => (
                                        <input 
                                            type="text" 
                                            placeholder="Erik Andersson" 
                                            className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                            {...field} 
                                        />
                                    )} 
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            {/* Email and Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">EMAIL ADDRESS</label>
                                    <Controller 
                                        name="email" 
                                        control={control} 
                                        render={({ field }) => (
                                            <input 
                                                type="email" 
                                                disabled={!!emailFromQuery}
                                                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 text-gray-500 rounded-lg focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed" 
                                                {...field} 
                                            />
                                        )} 
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">PHONE NUMBER</label>
                                    <Controller 
                                        name="phone" 
                                        control={control} 
                                        render={({ field }) => (
                                            <input 
                                                type="tel" 
                                                placeholder="+46 00 000 00" 
                                                className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                                {...field} 
                                            />
                                        )} 
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">PASSWORD</label>
                                <Controller 
                                    name="password" 
                                    control={control} 
                                    render={({ field }) => (
                                        <input 
                                            type="password" 
                                            placeholder="••••••••" 
                                            className="w-full px-4 py-3 bg-gray-200 text-gray-600 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                            {...field} 
                                        />
                                    )} 
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-3 pt-2">
                                <Controller
                                    name="terms"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <div className="relative shrink-0 mt-0.5">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer" 
                                                    checked={field.value} 
                                                    onChange={(e) => field.onChange(e.target.checked)} 
                                                />
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all">
                                                    {field.value && (
                                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-700 flex-1">
                                                I agree to the <span className="font-semibold">Terms of Service</span> and acknowledge the <span className="font-semibold">Privacy Policy</span>.
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
                                            <div className="relative shrink-0 mt-0.5">
                                                <input 
                                                    type="checkbox" 
                                                    className="sr-only peer" 
                                                    checked={field.value} 
                                                    onChange={(e) => field.onChange(e.target.checked)} 
                                                />
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
                                {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-base font-medium text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 rounded-[24px] gap-2 mt-6 cursor-pointer disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Join Team</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegisterSellerClient;
