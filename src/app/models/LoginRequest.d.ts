import { ACCESS_TYPE } from "./accessType";
import { USER_STATUS } from './userStatus';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  email: string;
  password: string;
  access: ACCESS_TYPE;
  status: USER_STATUS;
}

export interface LoginResponse{
    user: User;
    token: string;
}