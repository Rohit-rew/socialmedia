import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginuserDto {

    @IsEmail()
    email : string

    @IsNotEmpty()
    password : string
}