
export class InterestClass {
    color: string
    name: string
    id: number
    constructor(color: string, name: string, id: number) {
        this.color = color
        this.name = name
        this.id = id
    }
    toString = () => {
        return `${this.color},${this.name},${this.id}`
    }
}