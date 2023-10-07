import { CONSTANTS } from "../../../tools/constants";
import { CreateImage, CreateSquare } from "../../../tools/tools";
import { directions, getImageType, image } from "../../../models/GeneralTypes";
import { Sprite } from "../classes/ResourceLoader";
export class EventModel{
    private currentDir:directions = 'down'
    private xr:number = 0
    private yr:number = 0
    private sprite?:Sprite;
    public image: image = CreateSquare(CONSTANTS.tile.width, CONSTANTS.tile.height, "rgba(0,0,0,0)");
    private moveRestrictions:MoveRestrict = this.setMoveRestrictions();
    constructor(x:number, y:number ,image?:image | string | Sprite){
        this.xr = x;
        this.yr = y;
        if (image) {
            let imageType = getImageType(image);
            
            if (imageType === 'string') {
                this.image = CreateImage(image as string)
            } else if ((imageType === 'sprite')) {
                let theImage:Sprite = image as Sprite;
                this.sprite = theImage;
                this.setDirSprite(this.currentDir)
            } else if(imageType === "canvas" ){
                this.image = image as HTMLCanvasElement
            } else {
                this.image = image as HTMLImageElement
            }
        }
    }
    public get x(){
        return this.xr;
    }
    public get y(){
        return this.yr;
    }

    private setDirSprite(direction:directions){
        if (this.sprite) {
            if (direction === "up") {
                this.image = this.sprite.up[0] as image;
                this.currentDir = "up"
            }else if (direction === "down") {
                this.image = this.sprite.down[0] as image;
                this.currentDir = 'down'
            } else if (direction === "left") {
                this.image = this.sprite.left[0] as image;
                this.currentDir = 'left'
            } else if (direction === "right") {
                this.image = this.sprite.right[0] as image;
                this.currentDir = 'right'
            }
        }
    }
    
    private setMoveRestrictions(restrictions?: MoveRestrict, defaults:boolean = true): MoveRestrict {
        const width = this.image.width;
        const height = this.image.height;
        const frames = 4;
        let moveAMNTv = height / frames;
        let moveAMNTh = width / frames;
        const restrict:MoveRestrict = {
            up: [(this.yr - moveAMNTv) > 0],
            down: [(this.yr + moveAMNTv) < CONSTANTS.canvas.height - height],
            left: [(this.xr - moveAMNTh) > 0],
            right: [(this.xr + moveAMNTh) < CONSTANTS.canvas.width - width]
        }
        if (defaults) {
            if (restrictions) {
              restrictions.up.forEach(v=>{restrict.up.push(v)})
              restrictions.down.forEach(v=>{restrict.down.push(v)})  
              restrictions.left.forEach(v=>{restrict.left.push(v)})  
              restrictions.right.forEach(v=>{restrict.right.push(v)})  
            } 
        } else {
            if (restrictions) {
                return restrictions
            }
            
        }
        return restrict
    }

    public move(direction: directions) {
        const width = this.image.width;
        const height = this.image.height;
        const frames = this.sprite?.[direction]?.length ?? 4;
        let moveAMNTv = height / frames;
        let moveAMNTh = width / frames;
        this.setDirSprite(direction)
        switch (direction) {
            case "up":
                if (!this.moveRestrictions.up.includes(false)) {
                    this.yr -= moveAMNTv;
                }
                break;
            case "down":
                if (!this.moveRestrictions.down.includes(false)) {
                    this.yr += moveAMNTv;
                }
                break;
            case "left":
                if (!this.moveRestrictions.left.includes(false)) {
                    this.xr -= moveAMNTh;
                }
                break;
            case "right":
                if (!this.moveRestrictions.right.includes(false)) {
                    this.xr += moveAMNTh;
                }
                break;
        }
    }
}

interface MoveRestrict {
    up:boolean[];
    down:boolean[];
    left:boolean[];
    right:boolean[];

}