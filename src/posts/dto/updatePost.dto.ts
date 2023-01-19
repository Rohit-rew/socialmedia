import { IsNotEmpty, isNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator"

export class updatePostDto {

    @ValidateIf(o=> !o.title && !o.description)
    @IsString()
    @IsNotEmpty()
    title?: string
    
    @ValidateIf(o=> !o.title && !o.description)
    @IsNotEmpty()
    @IsString()
    description?: string
}