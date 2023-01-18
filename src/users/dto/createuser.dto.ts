import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateuserDto{

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
    
}