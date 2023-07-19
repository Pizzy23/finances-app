export interface UserSearchInRegister {
  id?: number;
  name?: string;
  email: string;
  password: string;
  confirmpassword?: string;
}
export interface UserLogged {
  id: any;
  email: string;
  isLogged: boolean;
  isValidAccount: boolean;
}
export interface UserCorrect {
  id: number;
  name: string;
  email: string;
  password: string;
  isLogged?: boolean;
  newEmail: string;
}
export interface UserBaseLogin {
  id: number;
  name?: string;
  email: string;
  password?: string;
  isLogged: boolean;
  isValidAccount: boolean;
}
