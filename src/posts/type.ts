import { Votes } from "src/entities/votes.entities"

export interface postResponse {
    id : string
    title : string
    description : string
    created_at : Date
    updated_at : Date
    owner : {
        id : string,
        email : string
    }
    votes : Votes[]
}