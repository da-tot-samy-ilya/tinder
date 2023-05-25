import {TinderMessage} from "./TinderMessage";
import {TinderUser} from "./TinderUser";

export class TinderChat {
    messages: TinderMessage[]
    user1: TinderUser
    user2: TinderUser
    id: string
    addMessage = (message: TinderMessage) => {
        this.messages.push(message)
    }
    constructor(user1: TinderUser, user2: TinderUser, id: string = Date.now().toString(), messages: TinderMessage[] = []) {
        this.user1 = user1
        this.user2 = user2
        this.messages = messages
        this.id = id
    }
}