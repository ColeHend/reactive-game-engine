import { EventCore, EventExtended } from '../../../models/events';
import { MapData } from '../../../models/maps';
import { EventModel } from '../events/Event';
import { CreateImage } from '../../../tools/tools';
import { eventData, events } from '../../../models/GeneralTypes';
import { Map } from './Map';
import { ResourceLoader } from './ResourceLoader';


export function MapLoader(mapData: MapData[], resources:ResourceLoader) {
    const maps: Map[] = [];
    // parse through data and turn into the class map and event.
    for (let i = 0; i < mapData.length; i++) {
        const mapItem = mapData[i];
        const tname = mapItem.tilesetName;
        const layer = mapItem.layers;
        const eventsDat: eventData[] = mapItem.events;
        const layout = mapItem.data;
        const events: events[] = [];
        for (let i = 0; i < eventsDat.length; i++) {
            events.push(EventLoader(eventsDat[i],resources));
        }
        const map = new Map(tname, layer, events, layout, resources);
        maps.push(map);
    }
    return maps
}

function EventLoader(event: eventData, resources: ResourceLoader): events {
    const eventData = Object.entries(event);
    if (eventData.length > 3) {
        // create extended event
        let img;
        if (event.img) {
            img = CreateImage(event.img);
        }
        return new EventModel(event.x, event.y, img);

    } else {
        let img;
        let sprite = resources.getSprite(event.img);
        if (sprite) {
            img = sprite
        }
        return new EventModel(event.x, event.y, img);
    }
}

