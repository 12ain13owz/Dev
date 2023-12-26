export interface Root {
  message: string;
  user: User;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
}
