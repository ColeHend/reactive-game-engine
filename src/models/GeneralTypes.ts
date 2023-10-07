import { Sprite } from "../components/game/classes/ResourceLoader"
import { EventModel } from "../components/game/events/Event"
import { EventCore, EventExtended } from "./events"

export type directions = "up" | "down" | "left" | "right"

export type image = HTMLCanvasElement | HTMLImageElement 

export function getImageType(image:image | string | Sprite): "canvas" | "image" | "sprite" | "string" {
    if (typeof image === 'string') {
        return 'string'
    } else if (image instanceof HTMLCanvasElement) {
        return "canvas";
    } else if (image instanceof HTMLImageElement) {
        return "image";
    } else {
        return "sprite";
    }
}

export type eventData = EventCore | EventExtended
export type events = EventModel