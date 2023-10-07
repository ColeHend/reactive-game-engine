import { EventCore } from "./events";

export interface MapData {
    tilesetName: string;
    layers: number;
    events: EventCore[];
    data: number[][][]
    
}