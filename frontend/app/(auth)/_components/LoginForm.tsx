"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../schema";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/lib/actions/auth-action";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [userType, setUserType] = useState<"donor" | "organization">("donor");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setIsLoading(true);
      const response = await handleLogin(data, userType);
      console.log("Login response:", response);
      console.log("Response data:", response?.data);
      
      if (response && response.success) {
        toast.success(response.message || "Login successful!");
        
        // The response structure is: response.data contains the full API response
        // which has { success, message, token, data: { user object } }
        const apiResponse = response.data;
        
        if (apiResponse && apiResponse.data) {
          // Store user data and token in localStorage
          localStorage.setItem('user', JSON.stringify(apiResponse.data));
          localStorage.setItem('auth_token', apiResponse.token);
          
          const user = apiResponse.data;
          console.log("User data:", user);
          console.log("User role:", user.role);
          console.log("User type:", user.userType);
          
          // Redirect based on role and userType
          if (user.role === 'admin') {
            console.log("Redirecting to /admin");
            router.push('/admin');
          } else if (user.userType === 'donor') {
            console.log("Redirecting to /donor/dashboard");
            router.push('/donor/dashboard');
          } else if (user.userType === 'organization') {
            console.log("Redirecting to /organization/dashboard");
            router.push('/organization/dashboard');
          } else {
            console.log("Redirecting to /");
            router.push('/');
          }
        } else {
          console.log("No user data, redirecting to /");
          router.push('/');
        }
      } else {
        toast.error(response?.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <div className="overflow-hidden rounded-[2rem] border border-white/40 bg-white/85 shadow-[0_25px_90px_rgba(15,23,42,0.32)] backdrop-blur-2xl">
        <div className="border-b border-white/60 bg-gradient-to-r from-red-600/15 via-white/60 to-cyan-500/10 px-6 py-5 sm:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/15 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-700 shadow-sm">
            Secure login
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            LifeLine Blood Service
          </h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
            Sign in to manage donations, requests, and your account dashboard.
          </p>
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
                <span className="mt-0.5 block text-xs text-slate-500">Access donor tools and appointments</span>
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
                <span className="mt-0.5 block text-xs text-slate-500">Manage campaigns and blood requests</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`w-full rounded-2xl border px-4 py-3.5 pr-11 text-slate-900 outline-none transition focus:ring-4 focus:ring-red-500/10 ${
                    errors.email
                      ? "border-red-300 bg-red-50/70"
                      : "border-slate-200 bg-white/90 hover:border-slate-300"
                  }`}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  @
                </span>
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full rounded-2xl border px-4 py-3.5 pr-12 text-slate-900 outline-none transition focus:ring-4 focus:ring-red-500/10 ${
                    errors.password
                      ? "border-red-300 bg-red-50/70"
                      : "border-slate-200 bg-white/90 hover:border-slate-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
              )}
              <div className="mt-3 text-right">
                <Link
                  href={`/forgot-password?userType=${userType}`}
                  className="text-sm font-medium text-red-600 transition hover:text-red-700"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition hover:shadow-xl hover:shadow-red-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {isLoading ? "Logging in..." : "Login to Continue"}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
            </button>

            <p className="text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-red-600 transition hover:text-red-700">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
  