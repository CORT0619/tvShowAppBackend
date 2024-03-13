export interface Login {
  email: string;
  password: string;
}
export interface User extends Login {
  name: string;
  isAdmin: boolean;
}

export type Role = 'ADMIN' | 'USER';

export interface tokenPayload {
  userId: string;
  role?;
}
