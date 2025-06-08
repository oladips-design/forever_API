import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserLoginDto } from "./user-login.dto";

export class UserSignupDto extends UserLoginDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

}