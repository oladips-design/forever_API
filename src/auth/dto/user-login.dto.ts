import { IsEmail, IsNotEmpty,  MinLength } from "class-validator";

export class UserLoginDto {
    
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(4, { message: 'Password must be at least 4 characters long' })
    password: string;

}