import {TinderImage} from "./TinderImage";
import {InterestClass} from "./InterestClass";
import {TinderChat} from "./TinderChat";

export class TinderUser {
    id: string
    name: string
    age: number
    distance: number
    town: string
    interests: InterestClass[]
    description: string
    images: TinderImage[]
    mainImage: TinderImage

    static defaultUser = new TinderUser("0", "")
    constructor(id: string,
                name: string,
                age: number = 0,
                town: string = "",
                interests: InterestClass[] = [],
                description: string = "",
                images: TinderImage[] = [],
                mainImage: TinderImage = TinderImage.defaultImage) {
        this.id = id
        this.name = name
        this.age = age
        this.town = town
        this.distance = 4
        this.interests = interests
        this.description = description
        this.images = images
        this.mainImage = mainImage
    }
}