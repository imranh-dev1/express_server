export interface IUser {
    name: string;
    email: string;
    password: string;
    age: number;
    country: string;
    is_active?: boolean;
}