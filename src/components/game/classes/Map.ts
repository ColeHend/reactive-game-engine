import { events, image } from '../../../models/GeneralTypes';
import { CONSTANTS } from '../../../tools/constants';
import { CreateBuffer } from '../../../tools/tools';
import { ResourceLoader, Tileset } from './ResourceLoader';
const tileW = CONSTANTS.tile.width;
const tileH = CONSTANTS.tile.height;
const canvasW = CONSTANTS.canvas.width;
const canvasH = CONSTANTS.canvas.height;


export class Map {
    public tilesetName: string;
    public layers: number;
    public events: events[];
    private data: number[][][];
    public image:MapImage = {image:undefined, layers:[]};
    private resources: ResourceLoader;
    private tileset?: Tileset;
    constructor(tilesetName: string, layers: number, events: events[], data: number[][][],resources: ResourceLoader) {
        this.tilesetName = tilesetName;
        this.layers = layers;
        this.events = events;
        this.data = data;
        this.resources = resources;
        const tset = this.resources?.getTileset(this.tilesetName);
        if (tset) {
            this.tileset = tset;
        }
        for (let i = 0; i < layers; i++) {
            this.drawLayer(i);
        }
    }

    private drawMap(){
        const mapH = tileH * this.data.length;
        const mapW = tileW * this.data[0].length;
        const map = CreateBuffer(mapW, mapH)
        map.clearRect(0, 0, mapW, mapH);
        if (this.image?.layers) {
            for (let i = 0; i < this.image.layers.length; i++) {
                const layer = this.image.layers[i]
                if (layer) {
                    map.drawImage(layer,0,0)        
                }
            }
        }
        if (map) {
            this.image.image = map.canvas;
        }
    }

    private drawLayer(num:number){
        const mapH = tileH * this.data.length;
        const mapW = tileW * this.data[0].length;
        const layer = CreateBuffer(mapW, mapH)
        if (this.tileset) {
            for (let y = 0; y < this.data.length; y++) {
                for (let x = 0; x < this.data[y].length; x++) {
                    const tileNum = this.data[y][x][num];
                    if (tileNum) {
                        layer.drawImage(this.tileset.tiles[tileNum],x,y)
                    }
                }
                
            }
            if (this.image) {
                this.image.layers[num] = layer.canvas
            }
           
        }
    }
}

interface MapImage {
    image?:image;
    layers:image[];
}