import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    signup(@Body() body: UserSignupDto){
        return this.authService.signup(body);
    }

    @Post('login')
    signin(@Body() body:UserLoginDto){
        return this.authService.login(body)
    }

}
