"use client";
 
import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { loginAction } from "../../../lib/actions/auth-action";

import { LoginFormValues, validateLoginForm } from "./schema";
 
export default function LoginForm() {

  const router = useRouter();
 
  const [formData, setFormData] = useState<LoginFormValues>({

    email: "",

    password: "",

    role: "donor",

  });
 
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({

      ...formData,

      [event.target.name]: event.target.value,

    });
 
    setError("");

  };
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
 
    const validationError = validateLoginForm(formData);
 
    if (validationError) {

      setError(validationError);

      return;

    }
 
    setIsLoading(true);
 
    const response = await loginAction({

      email: formData.email,

      password: formData.password,

      role: formData.role,

    });
 
    setIsLoading(false);
 
    if (response?.success === false) {

      setError(response.message || "Login failed");

      return;

    }
 
    router.push("/dashboard");

  };
 
  return (
<main className="flex min-h-screen items-center justify-center bg-[url('/background.jpeg')] bg-cover bg-center px-4 py-8">
<div className="w-full max-w-lg rounded-3xl border border-white/30 bg-slate-500/65 px-8 py-10 text-white shadow-2xl backdrop-blur-md">
<h1 className="text-center text-4xl font-bold tracking-wider">

          Welcome Back
</h1>
 
        <p className="mt-3 text-center text-lg text-gray-100">

          Login to continue
</p>
 
        <div className="mt-8 grid grid-cols-2 rounded-xl bg-white/20 p-1">
<button

            type="button"

            onClick={() => setFormData({ ...formData, role: "donor" })}

            className={`rounded-lg py-3 text-base font-medium transition ${

              formData.role === "donor"

                ? "bg-blue-600 text-white"

                : "text-white hover:bg-white/10"

            }`}
>

            Donor
</button>
 
          <button

            type="button"

            onClick={() => setFormData({ ...formData, role: "organization" })}

            className={`rounded-lg py-3 text-base font-medium transition ${

              formData.role === "organization"

                ? "bg-blue-600 text-white"

                : "text-white hover:bg-white/10"

            }`}
>

            Organization
</button>
</div>
 
        {error && (
<p className="mt-5 rounded-lg border border-red-300/40 bg-red-600/30 px-4 py-3 text-center text-sm text-red-100">

            {error}
</p>

        )}
 
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
<div>
<label className="mb-2 block text-base text-white">Email</label>
<input

              type="email"

              name="email"

              placeholder="Enter email"

              value={formData.email}

              onChange={handleChange}

              className="h-14 w-full rounded-lg bg-gray-100 px-5 text-base text-black outline-none placeholder:text-gray-500"

            />
</div>
 
          <div>
<label className="mb-2 block text-base text-white">Password</label>
 
            <div className="relative">
<input

                type={showPassword ? "text" : "password"}

                name="password"

                placeholder="Enter password"

                value={formData.password}

                onChange={handleChange}

                className="h-14 w-full rounded-lg bg-gray-100 px-5 pr-12 text-base text-black outline-none placeholder:text-gray-500"

              />
 
              <button

                type="button"

                onClick={() => setShowPassword(!showPassword)}

                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
>

                👁️
</button>
</div>
</div>
 
          <div className="text-right">
<Link href="#" className="text-sm text-blue-100">

              Forgot Password?
</Link>
</div>
 
          <button

            type="submit"

            disabled={isLoading}

            className="h-14 w-full rounded-lg bg-blue-600 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
>

            {isLoading ? "Logging in..." : "Login"}
</button>
</form>
 
        <p className="mt-7 text-center text-gray-100">

          Don&apos;t have an account?{" "}
<Link href="/register" className="font-bold text-blue-200">

            Register
</Link>
</p>
</div>
</main>

  );

}
 