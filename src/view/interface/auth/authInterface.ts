export interface SearchByToken {
  id: number;
  email: string;
  password?: string;
  token: string;
}
export interface AuthLogin {
  id?: number;
  email: string,
  isLogged: boolean,
  isValidAccount: boolean,
}

export interface SearchByEmail {
  id: number;
  email: string;
  password?: string;
  token: string;
}
