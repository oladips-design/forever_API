import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) 
    {}


    async signup(body: UserSignupDto) {
      const newUser =  await this.userService.create(body);
      const access_token = await this.generateToken(newUser.id,newUser.email)
      return {access_token, data: newUser}

    }

    async login(body: UserLoginDto) {
        const user = await this.userService.findByEmail(body.email, true);
        if(!user) throw new UnauthorizedException("Invalid credentials")
        
        const matchingPass = await bcrypt.compare(body.password,user.password_hash);
        if(!matchingPass) throw new UnauthorizedException("Invalid Credentials")
     
            const access_token = await this.generateToken(user.id, user.email);
            return { access_token , data: user}

    }


    async generateToken(userId: string, email:string) {
        const payload = {sub: userId, email}

        return {
            access_token: this.jwtService.sign(payload,{expiresIn:'1h'}),
        }
    }

}
