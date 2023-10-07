import { EventModel } from "../components/game/events/Event";
import { image } from "../models/GeneralTypes";
import { EventTypes } from "../models/enums";
/**
 * Creates a square with the specified width, height, and color.
 * @param width The width of the square.
 * @param height The height of the square.
 * @param color The color of the square.
 * @returns The canvas element of the created square.
 */
export function CreateSquare(width:number, height:number, color:string) {
    const buffer = CreateBuffer(width, height);
    buffer.fillStyle = color;
    buffer.fillRect(0, 0, width, height);
    return buffer.canvas;
}

/**
 * Creates a new canvas buffer with the specified width and height.
 * @param width - The width of the canvas buffer.
 * @param height - The height of the canvas buffer.
 * @returns A CanvasRenderingContext2D object representing the canvas buffer.
 */
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

/**
 * Creates an HTMLImageElement with the specified path as its source.
 * @param path - The path to the image file.
 * @returns The created HTMLImageElement.
 */
export function CreateImage(path:string): HTMLImageElement{
    const imaged = document.createElement('img');
    imaged.src = path;
    return imaged;
}

/**
 * Creates an array of HTMLCanvasElements representing a sprite sheet from a given image.
 * @param image - The HTMLImageElement to create the sprite sheet from.
 * @param rows - The number of rows in the sprite sheet.
 * @param columns - The number of columns in the sprite sheet.
 * @returns An array of HTMLCanvasElements representing the sprite sheet starting from the top moving left to right row by row.
 */
export function CreateSpriteSheet(image:HTMLImageElement, rows:number, columns:number) {
    const spriteWidth = image.width / columns;
    const spriteHeight = image.height / rows;
    const sprites:HTMLCanvasElement[] = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            const buffer = CreateBuffer(spriteWidth, spriteHeight);
            buffer.drawImage(image, x * spriteWidth, y * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
            sprites.push(buffer.canvas);
        }
    }

    return sprites;
}

