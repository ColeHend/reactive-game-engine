import { EventModel } from "../components/game/events/Event";
import { image } from "../models/GeneralTypes";
export function CreateSquare(width:number, height:number, color:string) {
    const buffer = CreateBuffer(width, height);
    buffer.fillStyle = color;
    buffer.fillRect(0, 0, width, height);
    return buffer.canvas;
}

export function CreateBuffer(width:number,height:number):CanvasRenderingContext2D {
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   const context = canvas.getContext("2d")!;
   context.clearRect(0, 0, width, height);

   return context; 
}

export function EventGenerator(width:number,height:number,image:image) {

    return (type:EventTypes)=>{
        switch (type) {
            case EventTypes.BaseEvent:
                const newEvent = new EventModel(0,0)
                return newEvent;
        }
    }

}

export function CreateImage(path:string): HTMLImageElement{
    const imaged = document.createElement('img');
    imaged.src = path;
    return imaged;
}

enum EventTypes {
    BaseEvent
}
