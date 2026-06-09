"use client";
 
import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { registerAction } from "../../../lib/actions/auth-action";

import { RegisterFormValues, validateRegisterForm } from "./schema";
 
export default function RegisterForm() {

  const router = useRouter();
 
  const [formData, setFormData] = useState<RegisterFormValues>({

    fullName: "",

    bloodGroup: "",

    dateOfBirth: "",

    email: "",

    phoneNumber: "",

    address: "",

    password: "",

    confirmPassword: "",

    role: "donor",

  });
 
  const [agree, setAgree] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);
 
  const handleChange = (

    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

  ) => {

    setFormData({

      ...formData,

      [event.target.name]: event.target.value,

    });
 
    setError("");

    setSuccess("");

  };
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
 
    const validationError = validateRegisterForm(formData);
 
    if (validationError) {

      setError(validationError);

      return;

    }
 
    if (!agree) {

      setError("Please agree to Terms & Privacy Policy");

      return;

    }
 
    setIsLoading(true);
 
    const response = await registerAction({

      fullName: formData.fullName,

      bloodGroup: formData.bloodGroup,

      dateOfBirth: formData.dateOfBirth,

      email: formData.email,

      phoneNumber: formData.phoneNumber,

      address: formData.address,

      password: formData.password,
      confirmPassword: formData.confirmPassword,


      role: formData.role,

    });
 
    setIsLoading(false);
 
    if (response?.success === false) {

      setError(response.message || "Registration failed");

      return;

    }
 
    setSuccess(response?.message || "Account created successfully");
 
    setTimeout(() => {

      router.push("/login");

    }, 1000);

  };
 
  return (
<main className="flex min-h-screen items-center justify-center bg-[url('/background.jpeg')] bg-cover bg-center px-4 py-8">
<div className="w-full max-w-xl rounded-3xl border border-white/30 bg-slate-500/65 px-8 py-9 text-white shadow-2xl backdrop-blur-md">
<h1 className="text-center text-4xl font-bold tracking-wider">

          Create Account
</h1>
 
        <p className="mt-3 text-center text-lg text-gray-100">

          Join our community
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
 
        {success && (
<p className="mt-5 rounded-lg border border-green-300/40 bg-green-600/30 px-4 py-3 text-center text-sm text-green-100">

            {success}
</p>

        )}
 
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
<input

            type="text"

            name="fullName"

            placeholder="Full name"

            value={formData.fullName}

            onChange={handleChange}

            className="h-13 w-full rounded-lg bg-gray-100 px-5 text-base text-black outline-none placeholder:text-gray-500"

          />
 
          <div className="grid gap-3 md:grid-cols-2">
<select

              name="bloodGroup"

              value={formData.bloodGroup}

              onChange={handleChange}

              className="h-13 w-full rounded-lg bg-gray-100 px-4 text-base text-black outline-none"
>
<option value="">Blood Group</option>
<option value="A+">A+</option>
<option value="A-">A-</option>
<option value="B+">B+</option>
<option value="B-">B-</option>
<option value="AB+">AB+</option>
<option value="AB-">AB-</option>
<option value="O+">O+</option>
<option value="O-">O-</option>
</select>
 
            <input

              type="date"

              name="dateOfBirth"

              value={formData.dateOfBirth}

              onChange={handleChange}

              className="h-13 w-full rounded-lg bg-gray-100 px-5 text-base text-black outline-none"

            />
</div>
 
          <input

            type="email"

            name="email"

            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            className="h-13 w-full rounded-lg bg-gray-100 px-5 text-base text-black outline-none placeholder:text-gray-500"

          />
 
          <input

            type="text"

            name="phoneNumber"

            placeholder="Phone Number"

            value={formData.phoneNumber}

            onChange={handleChange}

            className="h-13 w-full rounded-lg bg-gray-100 px-5 text-base text-black outline-none placeholder:text-gray-500"

          />
 
          <input

            type="text"

            name="address"

            placeholder="Address"

            value={formData.address}

            onChange={handleChange}

            className="h-13 w-full rounded-lg bg-gray-100 px-5 text-base text-black outline-none placeholder:text-gray-500"

          />
 
          <div className="relative">
<input

              type={showPassword ? "text" : "password"}

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}

              className="h-13 w-full rounded-lg bg-gray-100 px-5 pr-12 text-base text-black outline-none placeholder:text-gray-500"

            />
 
            <button

              type="button"

              onClick={() => setShowPassword(!showPassword)}

              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
>

              👁️
</button>
</div>
 
          <div className="relative">
<input

              type={showConfirmPassword ? "text" : "password"}

              name="confirmPassword"

              placeholder="Confirm Password"

              value={formData.confirmPassword}

              onChange={handleChange}

              className="h-13 w-full rounded-lg bg-gray-100 px-5 pr-12 text-base text-black outline-none placeholder:text-gray-500"

            />
 
            <button

              type="button"

              onClick={() => setShowConfirmPassword(!showConfirmPassword)}

              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
>

              👁️
</button>

</div>
 
          <label className="flex items-center gap-3 text-sm text-white">
<input

              type="checkbox"

              checked={agree}

              onChange={(event) => setAgree(event.target.checked)}

              className="h-4 w-4"

            />
<span>I agree to Terms & Privacy Policy</span>
</label>
 
          <button

            type="submit"

            disabled={isLoading}

            className="h-13 w-full rounded-lg bg-blue-600 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
>

            {isLoading ? "Creating Account..." : "Create Account"}
</button>
</form>
 
        <p className="mt-6 text-center text-gray-100">

          Already have an account?{" "}
<Link href="/login" className="font-bold text-blue-200">

            Login
</Link>
</p>
</div>
</main>

  );

}
 