import {TinderUser} from "./TinderUser";

export class TinderMessage {
    body: string
    dateTime: Date
    from: TinderUser
    constructor(body: string, dateTime: Date, from: TinderUser) {
        this.from = from
        this.body = body
        this.dateTime = dateTime
    }
}