import { IsNotEmpty } from "class-validator";

export class CurrentUserDto {
    @IsNotEmpty({message : "Please log in to get access"})
    id : string

    @IsNotEmpty({message : "Please log in to get access"})
    email : string
}