import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// dto
import {LoginuserDto, Token} from "./dto"



@Controller('login')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    @HttpCode(200)
    async loginuser(@Body() userData : LoginuserDto ) : Promise<Token> {
        const token = await this.authService.loginUser(userData)
        return new Token(token)
    }
}
