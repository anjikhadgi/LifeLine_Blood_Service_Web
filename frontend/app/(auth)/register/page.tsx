import RegisterForm from "../_components/RegisterForm";
 
export default function RegisterPage() {

  return <RegisterForm />;

}
 

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [userType, setUserType] = useState("donor");
//   const [showPassword, setShowPassword] =
//     useState(false);
//   const [
//     showConfirmPassword,
//     setShowConfirmPassword,
//   ] = useState(false);

//   const [isLoading, setIsLoading] =
//     useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     bloodGroup: "",
//     dateOfBirth: "",
//     organizationName: "",
//     headOfOrganization: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//     terms: false,
//   });

//   const [errors, setErrors] =
//     useState<any>({});

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type } = e.target;

//     setFormData({
//       ...formData,
//       [name]:
//         type === "checkbox"
//           ? (e.target as HTMLInputElement)
//               .checked
//           : value,
//     });
//   };

//   const validate = () => {
//     let newErrors: any = {};

//     if (!formData.email)
//       newErrors.email =
//         "Email is required";

//     if (!formData.phoneNumber)
//       newErrors.phoneNumber =
//         "Phone number required";

//     if (!formData.address)
//       newErrors.address =
//         "Address required";

//     if (!formData.password)
//       newErrors.password =
//         "Password required";

//     if (
//       formData.password !==
//       formData.confirmPassword
//     ) {
//       newErrors.confirmPassword =
//         "Passwords do not match";
//     }

//     if (!formData.terms)
//       newErrors.terms =
//         "Accept terms first";

//     setErrors(newErrors);

//     return (
//       Object.keys(newErrors).length === 0
//     );
//   };

//   const onSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       setIsLoading(true);

//       console.log({
//         ...formData,
//         userType,
//       });

//       setTimeout(() => {
//         alert(
//           "Registration Successful!"
//         );
//         router.push("/login");
//       }, 1000);
//     } catch {
//       alert("Registration Failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-8"
//       style={{
//         backgroundImage:
//           "url('/background.jpeg')",
//       }} 
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50"></div>

//       {/* Card */}
//       <div className="relative w-full max-w-lg bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8">

//         {/* Heading */}
//         <div className="text-center mb-6">
//           <h1 className="text-4xl font-bold text-white">
//             Create Account
//           </h1>

//           <p className="text-gray-200 mt-2">
//             Join our community
//           </p>
//         </div>

//         {/* User Type */}
//         <div className="flex bg-white/20 rounded-xl p-1 mb-6">
//           <button
//             type="button"
//             onClick={() =>
//               setUserType("donor")
//             }
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
//               setUserType(
//                 "organization"
//               )
//             }
//             className={`flex-1 py-2 rounded-lg transition font-medium ${
//               userType ===
//               "organization"
//                 ? "bg-blue-600 text-white"
//                 : "text-white"
//             }`}
//           >
//             Organization
//           </button>
//         </div>

//         <form
//           onSubmit={onSubmit}
//           className="space-y-4"
//         >
//           {/* Donor */}
//           {userType === "donor" && (
//             <>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={
//                   formData.fullName
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 className="w-full bg-white/80 rounded-xl px-4 py-3 outline-none"
//               />

//               <div className="grid grid-cols-2 gap-3">
//                 <select
//                   name="bloodGroup"
//                   value={
//                     formData.bloodGroup
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   className="bg-white/80 rounded-xl px-4 py-3"
//                 >
//                   <option value="">
//                     Blood Group
//                   </option>
//                   <option>A+</option>
//                   <option>A-</option>
//                   <option>B+</option>
//                   <option>B-</option>
//                   <option>AB+</option>
//                   <option>AB-</option>
//                   <option>O+</option>
//                   <option>O-</option>
//                 </select>

//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={
//                     formData.dateOfBirth
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   className="bg-white/80 rounded-xl px-4 py-3"
//                 />
//               </div>
//             </>
//           )}

//           {/* Organization */}
//           {userType ===
//             "organization" && (
//             <>
//               <input
//                 type="text"
//                 name="organizationName"
//                 placeholder="Organization Name"
//                 value={
//                   formData.organizationName
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 className="w-full bg-white/80 rounded-xl px-4 py-3"
//               />

//               <input
//                 type="text"
//                 name="headOfOrganization"
//                 placeholder="Head Name"
//                 value={
//                   formData.headOfOrganization
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 className="w-full bg-white/80 rounded-xl px-4 py-3"
//               />
//             </>
//           )}

//           {/* Common */}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full bg-white/80 rounded-xl px-4 py-3"
//           />

//           <input
//             type="tel"
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={
//               formData.phoneNumber
//             }
//             onChange={handleChange}
//             className="w-full bg-white/80 rounded-xl px-4 py-3"
//           />

//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={
//               formData.address
//             }
//             onChange={handleChange}
//             className="w-full bg-white/80 rounded-xl px-4 py-3"
//           />

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={
//                 showPassword
//                   ? "text"
//                   : "password"
//               }
//               name="password"
//               placeholder="Password"
//               value={
//                 formData.password
//               }
//               onChange={
//                 handleChange
//               }
//               className="w-full bg-white/80 rounded-xl px-4 py-3"
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowPassword(
//                   !showPassword
//                 )
//               }
//               className="absolute right-4 top-3"
//             >
//               {showPassword
//                 ? "🙈"
//                 : "👁️"}
//             </button>
//           </div>

//           {/* Confirm */}
//           <div className="relative">
//             <input
//               type={
//                 showConfirmPassword
//                   ? "text"
//                   : "password"
//               }
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={
//                 formData.confirmPassword
//               }
//               onChange={
//                 handleChange
//               }
//               className="w-full bg-white/80 rounded-xl px-4 py-3"
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowConfirmPassword(
//                   !showConfirmPassword
//                 )
//               }
//               className="absolute right-4 top-3"
//             >
//               {showConfirmPassword
//                 ? "🙈"
//                 : "👁️"}
//             </button>
//           </div>

//           {/* Terms */}
//           <div className="flex gap-2 text-white text-sm">
//             <input
//               type="checkbox"
//               name="terms"
//               checked={
//                 formData.terms
//               }
//               onChange={
//                 handleChange
//               }
//             />
//             <label>
//               I agree to Terms &
//               Privacy Policy
//             </label>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
//           >
//             {isLoading
//               ? "Creating..."
//               : "Create Account"}
//           </button>
//         </form>

//         {/* Login */}
//         <p className="text-center text-gray-200 text-sm mt-6">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="text-blue-300 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }