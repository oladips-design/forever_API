import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import {config} from "dotenv";
config();


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.secret_key

        })
    }


    async validate(payload: any) {
        console.log("JWT Strategy payload:", payload);
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }

}