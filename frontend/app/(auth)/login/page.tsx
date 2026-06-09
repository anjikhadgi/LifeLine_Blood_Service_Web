import LoginForm from "../_components/LoginForm";
 
export default function LoginPage() {

  return <LoginForm />;

}
 

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [userType, setUserType] = useState("donor");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {
//       email: "",
//       password: "",
//     };

//     let valid = true;

//     if (!formData.email) {
//       tempErrors.email = "Email is required";
//       valid = false;
//     }

//     if (!formData.password) {
//       tempErrors.password = "Password is required";
//       valid = false;
//     }

//     setErrors(tempErrors);
//     return valid;
//   };

//   const onSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       setIsLoading(true);

//       console.log("Login Data:", {
//         ...formData,
//         userType,
//       });

//       setTimeout(() => {
//         alert("Login Successful!");
//         router.push("/");
//       }, 1000);
//     } catch (error) {
//       alert("Login Failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
//       style={{
//         backgroundImage: "url('/background.jpeg')",
//       }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/50"></div>

//       {/* Login Card */}
//       <div className="relative w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8">

//         {/* Heading */}
//         <div className="text-center mb-7">
//           <h1 className="text-4xl font-bold text-white">
//             Welcome Back
//           </h1>
//           <p className="text-gray-200 mt-2">
//             Login to continue
//           </p>
//         </div>

//         {/* User Type */}
//         <div className="flex rounded-xl bg-white/20 p-1 mb-6">
//           <button
//             type="button"
//             onClick={() => setUserType("donor")}
//             className={`flex-1 py-2 rounded-lg transition font-medium ${
//               userType === "donor"
//                 ? "bg-blue-600 text-white"
//                 : "text-white"
//             }`}
//           >
//             Donor
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               setUserType("organization")
//             }
//             className={`flex-1 py-2 rounded-lg transition font-medium ${
//               userType === "organization"
//                 ? "bg-blue-600 text-white"
//                 : "text-white"
//             }`}
//           >
//             Organization
//           </button>
//         </div>

//         <form
//           onSubmit={onSubmit}
//           className="space-y-5"
//         >
//           {/* Email */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-white">
//               Email
//             </label>

//             <input
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full bg-white/80 border border-white/40 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-gray-800"
//             />

//             {errors.email && (
//               <p className="text-red-300 text-sm mt-1">
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-white">
//               Password
//             </label>

//             <div className="relative">
//               <input
//                 type={
//                   showPassword
//                     ? "text"
//                     : "password"
//                 }
//                 name="password"
//                 placeholder="Enter password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full bg-white/80 border border-white/40 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-gray-800"
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPassword(
//                     !showPassword
//                   )
//                 }
//                 className="absolute right-4 top-3"
//               >
//                 {showPassword
//                   ? "🙈"
//                   : "👁️"}
//               </button>
//             </div>

//             {errors.password && (
//               <p className="text-red-300 text-sm mt-1">
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Forgot */}
//           <div className="text-right">
//             <Link
//               href="/forgot-password"
//               className="text-sm text-blue-200 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading
//               ? "Logging in..."
//               : "Login"}
//           </button>
//         </form>

//         {/* Register */}
//         <p className="text-center text-gray-200 text-sm mt-6">
//           Don’t have an account?{" "}
//           <Link
//             href="/register"
//             className="text-blue-300 font-semibold hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }