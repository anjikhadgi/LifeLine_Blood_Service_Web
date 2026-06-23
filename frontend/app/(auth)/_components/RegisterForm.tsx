"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "../schema";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/lib/actions/auth-action";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
	const router = useRouter();
	const [userType, setUserType] = useState<"donor" | "organization">("donor");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
		shouldUnregister: true,
		defaultValues: {
			userType: "donor",
			terms: false,
		} as any,
	});

	useEffect(() => {
		setValue("userType", userType as any, { shouldValidate: true });
		reset({ userType, terms: false } as any, {
			keepErrors: false,
			keepDirty: false,
			keepTouched: false,
		});
	}, [userType, setValue, reset]);

	const onSubmit = async (data: RegisterSchemaType) => {
		try {
			setIsLoading(true);
			const response = await handleRegister(data);
			if (response && response.success) {
				toast.success(response.message || "Account created successfully!");
				router.push("/login");
			} else {
				toast.error(response?.message || "Registration failed. Please try again.");
			}
		} catch (error: any) {
			toast.error(error.message || "Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-xl">
			<div className="overflow-hidden rounded-[2rem] border border-white/40 bg-white/85 shadow-[0_25px_90px_rgba(15,23,42,0.32)] backdrop-blur-2xl">
				<div className="border-b border-white/60 bg-gradient-to-r from-red-600/15 via-white/60 to-cyan-500/10 px-6 py-5 sm:px-8">
					<h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Create an account</h1>
					<p className="mt-2 max-w-md text-sm leading-6 text-slate-600 sm:text-base">Join LifeLineBloodService to manage donations and requests.</p>
				</div>

				<div className="px-6 py-6 sm:px-8 sm:py-8">
					<div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-1 shadow-inner">
						<div className="grid grid-cols-2 gap-1">
							<button
								type="button"
								onClick={() => setUserType("donor")}
								aria-pressed={userType === "donor"}
								className={`rounded-[1rem] px-4 py-3 text-left transition-all duration-200 ${
									userType === "donor"
										? "bg-white text-slate-900 shadow-lg shadow-red-100 ring-1 ring-red-200"
										: "text-slate-500 hover:bg-white/70 hover:text-slate-900"
								}`}
							>
								<span className="block text-sm font-semibold">Blood Donor</span>
								<span className="mt-0.5 block text-xs text-slate-500">Personal account</span>
							</button>
							<button
								type="button"
								onClick={() => setUserType("organization")}
								aria-pressed={userType === "organization"}
								className={`rounded-[1rem] px-4 py-3 text-left transition-all duration-200 ${
									userType === "organization"
										? "bg-white text-slate-900 shadow-lg shadow-red-100 ring-1 ring-red-200"
										: "text-slate-500 hover:bg-white/70 hover:text-slate-900"
								}`}
							>
								<span className="block text-sm font-semibold">Organization</span>
								<span className="mt-0.5 block text-xs text-slate-500">Organization account</span>
							</button>
						</div>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
						<input {...register("userType")} type="hidden" />
						{userType === "donor" ? (
							<>
								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
									<input {...register("fullName")} type="text" placeholder="Your full name" className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 outline-none ${(errors as any).fullName ? "border-red-300" : "border-slate-200"}`} />
									{(errors as any).fullName && <p className="mt-1.5 text-sm text-red-600">{(errors as any).fullName.message}</p>}
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="mb-2 block text-sm font-semibold text-slate-700">Blood Group</label>
										<select {...register("bloodGroup")} className="w-full rounded-2xl border px-4 py-3 text-slate-900 outline-none border-slate-200">
											<option value="">Select</option>
											<option value="A+">A+</option>
											<option value="A-">A-</option>
											<option value="B+">B+</option>
											<option value="B-">B-</option>
											<option value="AB+">AB+</option>
											<option value="AB-">AB-</option>
											<option value="O+">O+</option>
											<option value="O-">O-</option>
										</select>
									</div>

									<div>
										<label className="mb-2 block text-sm font-semibold text-slate-700">Date of Birth</label>
										<input {...register("dateOfBirth")} type="date" className="w-full rounded-2xl border px-4 py-3 text-slate-900 outline-none border-slate-200" />
									</div>
								</div>
							</>
						) : (
							<>
								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">Organization Name</label>
									<input {...register("organizationName")} type="text" placeholder="Organization name" className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 outline-none ${(errors as any).organizationName ? "border-red-300" : "border-slate-200"}`} />
									{(errors as any).organizationName && <p className="mt-1.5 text-sm text-red-600">{(errors as any).organizationName.message}</p>}
								</div>
								<div>
									<label className="mb-2 block text-sm font-semibold text-slate-700">Head of Organization</label>
									<input {...register("headOfOrganization")} type="text" placeholder="Head of organization" className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 outline-none ${(errors as any).headOfOrganization ? "border-red-300" : "border-slate-200"}`} />
									{(errors as any).headOfOrganization && <p className="mt-1.5 text-sm text-red-600">{(errors as any).headOfOrganization.message}</p>}
								</div>
							</>
						)}

						<div>
							<label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
							<input {...register("email")} type="email" placeholder="you@example.com" className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 outline-none ${(errors as any).email ? "border-red-300" : "border-slate-200"}`} />
							{(errors as any).email && <p className="mt-1.5 text-sm text-red-600">{(errors as any).email.message}</p>}
						</div>

						<div>
							<label className="mb-2 block text-sm font-semibold text-slate-700">Phone Number</label>
							<input {...register("phoneNumber")} type="tel" placeholder="Enter phone number" className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 outline-none ${(errors as any).phoneNumber ? "border-red-300" : "border-slate-200"}`} />
							{(errors as any).phoneNumber && <p className="mt-1.5 text-sm text-red-600">{(errors as any).phoneNumber.message}</p>}
						</div>

						<div>
							<label className="mb-2 block text-sm font-semibold text-slate-700">Address</label>
							<input {...register("address")} type="text" placeholder="Enter address" className={`w-full rounded-2xl border px-4 py-3.5 text-slate-900 outline-none ${(errors as any).address ? "border-red-300" : "border-slate-200"}`} />
							{(errors as any).address && <p className="mt-1.5 text-sm text-red-600">{(errors as any).address.message}</p>}
						</div>

						<div>
							<label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
							<div className="relative">
								<input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Create a password" className={`w-full rounded-2xl border px-4 py-3.5 pr-12 text-slate-900 outline-none ${(errors as any).password ? "border-red-300" : "border-slate-200"}`} />
								<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">{showPassword ? "Hide" : "Show"}</button>
							</div>
							{(errors as any).password && <p className="mt-1.5 text-sm text-red-600">{(errors as any).password.message}</p>}
						</div>

						<div>
							<label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label>
							<div className="relative">
								<input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" className={`w-full rounded-2xl border px-4 py-3.5 pr-12 text-slate-900 outline-none ${(errors as any).confirmPassword ? "border-red-300" : "border-slate-200"}`} />
								<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">{showConfirmPassword ? "Hide" : "Show"}</button>
							</div>
							{(errors as any).confirmPassword && <p className="mt-1.5 text-sm text-red-600">{(errors as any).confirmPassword.message}</p>}
						</div>

						<div className="flex items-center gap-3">
							<input {...register("terms")} id="terms" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
							<label htmlFor="terms" className="text-sm text-slate-600">I agree to the <Link href="/terms" className="text-red-600 font-medium">Terms of Service</Link></label>
						</div>
						{(errors as any).terms && <p className="-mt-2 text-sm text-red-600">{(errors as any).terms.message}</p>}

						<button type="submit" disabled={isLoading} className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition hover:shadow-xl hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-60">
							<span className="relative z-10">{isLoading ? "Registering..." : "Create account"}</span>
							<span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
						</button>

						<p className="text-center text-sm text-slate-600">Already have an account? <Link href="/login" className="font-semibold text-red-600">Sign in</Link></p>
					</form>
				</div>
			</div>
		</div>
	);
}
