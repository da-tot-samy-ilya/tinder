export class TinderImage {
    src: string
    name: string
    static defaultImage = new TinderImage("")
    constructor(src: string) {
        this.src = src
        this.name = src.split("/").pop() || ""
    }
}