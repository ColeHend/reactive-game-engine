import { CONSTANTS } from "../../../tools/constants";
import { CreateImage, CreateSquare } from "../../../tools/tools";
import { image } from "../../../models/GeneralTypes";

export class EventModel{
    private xr:number = 0
    private yr:number = 0
    public image: image = CreateSquare(CONSTANTS.tile.width, CONSTANTS.tile.height, "rgba(0,0,0,0)");
    constructor(x:number, y:number ,image?:image | string){
        this.xr = x;
        this.yr = y;
        if (image) {
            if (typeof image === 'string') {
                this.image = CreateImage(image)
            } else {
                this.image = image;
            }
        }
    }
    public get x(){
        return this.xr;
    }
    public get y(){
        return this.yr;
    }
    public move(direction: "up" | "down" | "left" | "right") {

        const width = this.image.width;
        const height = this.image.height;
        const frames = 4;
        let moveAMNTv = height / frames;
        let moveAMNTh = width / frames;
        switch (direction) {
            case "up":
                if ((this.yr - moveAMNTv) > 0) {
                    this.yr -= moveAMNTv;
                }
                break;
            case "down":
                if ((this.yr + moveAMNTv) < CONSTANTS.canvas.height - height) {
                    this.yr += moveAMNTv;
                }
                break;
            case "left":
                if ((this.xr - moveAMNTh) > 0) {
                    this.xr -= moveAMNTh;
                }
                break;
            case "right":
                if ((this.xr + moveAMNTh) < CONSTANTS.canvas.width - width) {
                    this.xr += moveAMNTh;
                }
                break;
        }
    }
}