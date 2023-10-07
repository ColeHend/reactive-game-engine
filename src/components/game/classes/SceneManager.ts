import { EventCore } from '../../../models/events';
import { MapData } from '../../../models/maps';


export class SceneManager {
    private mapData: MapData[];
    private eventData: EventCore[];
    constructor(mapData: MapData[], eventData: EventCore[]) {
        this.mapData = mapData;
        this.eventData = eventData;
    }
    public draw(context: CanvasRenderingContext2D) {
    }
    public update(frame: number) {
    }
}
