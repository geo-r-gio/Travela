
export interface Tokens {
    accessToken: string;
    refreshToken: string; 
}

export interface Login{
    username: string;
    password: string;
    roleName: string;
}

export interface Signup{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName: string;
}

export interface UserProfile {
    Id: string;
    Firstname: string;
    Lastname: string;
    Email: string;
    Username: string;
    Institution: string | null;
    IsAdmin: boolean;
  }
  
