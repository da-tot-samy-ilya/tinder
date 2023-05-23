import {TinderMessage} from "./TinderMessage";

export class TinderChat {
    messages: TinderMessage[]
    userID: string
    id: string
    addMessage = (message: TinderMessage) => {
        this.messages.push(message)
    }
    constructor(userID: string) {
        this.userID = userID
        this.messages = []
        this.id = Date.now().toString()
    }
}