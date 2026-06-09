export type UserRole = "donor" | "organization";
 
export type RegisterFormValues = {

  fullName: string;

  bloodGroup: string;

  dateOfBirth: string;

  email: string;

  phoneNumber: string;

  address: string;

  password: string;

  confirmPassword: string;

  role: UserRole;

};
 
export type LoginFormValues = {

  email: string;

  password: string;

  role: UserRole;

};
 
export const validateRegisterForm = (values: RegisterFormValues) => {

  if (!values.fullName.trim()) {

    return "Full name is required";

  }
 
  if (!values.bloodGroup.trim()) {

    return "Blood group is required";

  }
 
  if (!values.dateOfBirth.trim()) {

    return "Date of birth is required";

  }
 
  if (!values.email.trim()) {

    return "Email is required";

  }
 
  if (!values.email.includes("@")) {

    return "Please enter a valid email address";

  }
 
  if (!values.phoneNumber.trim()) {

    return "Phone number is required";

  }
 
  if (!values.address.trim()) {

    return "Address is required";

  }
 
  if (values.password.length < 6) {

    return "Password must be at least 6 characters";

  }
 
  if (values.password !== values.confirmPassword) {

    return "Password and confirm password do not match";

  }
 
  return "";

};
 
export const validateLoginForm = (values: LoginFormValues) => {

  if (!values.email.trim()) {

    return "Email is required";

  }
 
  if (!values.email.includes("@")) {

    return "Please enter a valid email address";

  }
 
  if (!values.password.trim()) {

    return "Password is required";

  }
 
  return "";

};
 