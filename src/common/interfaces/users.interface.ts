import { IsString, IsNumber } from 'class-validator';

export class IUser {
    id: number;

    name: string;

    email: string;
    
    password: string;

    phone: string;

    country: string;

    address: string;

    city: string;
}

