type User = {
  email: string;
  id: string;
  name: string;
};

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: Omit<User, 'name'>;
}
