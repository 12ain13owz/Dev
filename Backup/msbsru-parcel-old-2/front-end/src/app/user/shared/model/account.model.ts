export interface LoginModel {
  username: string;
  password: string;
  remember: boolean;
}

export interface UserModel {
  username: string;
  role: number;
  accessToken: string;
}

export interface AccountModel {
  id?: number;
  username: string;
  password?: string;
  firstname: string;
  lastname: string;
  role: Role;
  remark: string;
  active: boolean;
}

export interface ChangePasswordModel {
  id: number;
  opassword: string;
  npassword: string;
}

export enum Role {
  Admin,
  User,
}
