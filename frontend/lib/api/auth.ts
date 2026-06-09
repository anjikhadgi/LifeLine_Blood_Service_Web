import { axiosInstance } from "./axios-instance";

import { AUTH_ENDPOINTS } from "./endpoints";

import { UserRole } from "../../app/(auth)/_components/schema";
 
export type RegisterPayload = {

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
 
export type LoginPayload = {

  email: string;

  password: string;

  role: UserRole;

};
 
export const registerApi = async (payload: RegisterPayload) => {

  const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, payload);

  return response.data;

};
 
export const loginApi = async (payload: LoginPayload) => {

  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, payload);

  return response.data;

};
 