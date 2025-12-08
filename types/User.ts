export interface User {
    id: number,
    email: string,
    password: string,
    refresh_token?: string | null,
    search_history: any[],
}

// required in login endpoint since we only require id, email and password
export interface UserLogin {
  id: number;
  email: string;
  password: string;
}