import { MapData } from '../../../models/maps';
import { ResourceLoader } from './ResourceLoader';
export class SceneManager {
    private mapData: MapData[];
    private resources: ResourceLoader;
    constructor(mapData: MapData[], resources?:Resources) {
        this.mapData = mapData;
        this.resources = this.startResouces(resources);
    }
    private startResouces(resources?:Resources){
        const manager = new ResourceLoader();
        if (resources) {
         const {sprites, spritesheets, tilesets, pictures} = resources;

         if (sprites) {
             for (let i = 0; i < sprites.images.length; i++) {
                const PathName = sprites.images[i]
                manager.addSprite(PathName.name, PathName.path, sprites.columns, sprites.rows, sprites.facing)
             } 
            
         }
         
         if (spritesheets) {
             for (let i = 0; i < spritesheets.length; i++) {
                const ele = spritesheets[i];
                manager.addSpritesheet(ele.name, ele.path, ele.columns, ele.rows)
             }
         }
         
         if (tilesets) {
             for (let i = 0; i < tilesets.length; i++) {
                const ele = tilesets[i];
                manager.addTileset(ele.name,ele.path,ele.columns,ele.rows)
             }
         }

         if (pictures) {
             for (let i = 0; i < pictures.length; i++) {
                const ele = pictures[i];
                manager.addPicture(ele.name,ele.path);
             }
         }
        }
        return manager
    }

    public draw(context: CanvasRenderingContext2D) {
    }

    public update(frame: number) {
    }
}

interface Resources {
    sprites:{
        rows:number,
        columns:number,
        facing:{
            up:number,
            down:number,
            right:number,
            left:number
        }
        images: {name:string,path:string}[]
    },
    spritesheets:{
        name:string,
        path:string,
        rows:number,
        columns:number
    }[],
    tilesets: {
        name:string,
        path:string,
        rows:number,
        columns:number
    }[],
    pictures: {
        name: string,
        path: string
    }[]

}