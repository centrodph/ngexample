import { ACCESS_TYPE } from "./accessType";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  access: ACCESS_TYPE;
}

export interface LoginResponse{
    user: User;
    token: string;
}