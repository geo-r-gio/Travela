
export interface Tokens {
    AccessToken: string;
    RefreshToken: string; 
}

export interface Login{
    Username: string;
    Password: string;
    RoleName: string;
}

export interface Signup{
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
    RoleName: string;
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
  
