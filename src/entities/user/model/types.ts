export enum Roles {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

export interface User {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean | string;
  roles: Roles[];
  phoneNumber: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
  isLoaded?: boolean;
}

export interface UserRegistration {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface UserRequest {
  id?: number;
  username?: string;
  email?: string;
  phoneNumber?: string;
}

export interface UserRolesRequest {
  roles: Roles[];
}

export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean;
  limit?: number;
  offset?: number;
}

export interface MetaResponseUsers<T = User> {
  data: T[];
  meta: {
    totalAmount: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}
