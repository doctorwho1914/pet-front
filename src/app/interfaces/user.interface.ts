export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}
