
export class Token {
    constructor(token : string){
        this.token=token
    }

    type : string = 'Bearer'
    token : string
}