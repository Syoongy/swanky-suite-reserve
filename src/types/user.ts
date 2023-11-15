export interface User {
  user_id: string; // Assuming UUID is represented as a string
  username: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
