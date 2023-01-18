import { Exclude } from "class-transformer"

export class UserResponse {

    email : string
    id : string

    @Exclude()
    password : string
    
    constructor(partial : Partial<UserResponse>){
        Object.assign(this , partial)
    }
}