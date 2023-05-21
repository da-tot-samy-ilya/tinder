import {TinderMessage} from "./TinderMessage";
import {TinderUser} from "./TinderUser";

export class TinderChat {
    messages: TinderMessage[]
    users: TinderUser[]
    addMessage = (message: TinderMessage) => {
        this.messages.push(message)
    }
    constructor(users: TinderUser[]) {
        this.users = users
        this.messages = []
    }
}