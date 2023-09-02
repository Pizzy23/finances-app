export interface UserRegister {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirmpassword?: string;
  }
  export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
  }
  export interface NewUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    confirmpassword?: string;
    token?: string;
  }