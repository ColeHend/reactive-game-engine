import { CreateImage, CreateSpriteSheet } from '../../../tools/tools';
import { image } from '../../../models/GeneralTypes';


export class ResourceLoader {
    private tilesets: Tileset[] = [];
    private sprites: Sprite[] = [];
    private pictures: Picture[] = [];
    private spritesheets: Spritesheet[] = [];

    public addTileset(name: string, path: string, columns: number, rows: number) {
        if (name && this.tilesets.filter(t => t.name === name).length === 0 && path && columns && rows) {
            const tilesetImage = CreateImage(path);
            if (tilesetImage) {
                this.tilesets.push({
                    name, tiles: [...CreateSpriteSheet(tilesetImage, rows, columns)]
                });
            }
        }
    }
    public getTileset(name: string) {
        for (let i = 0; i < this.tilesets.length; i++) {
            const tileset = this.tilesets[i];
            if (tileset.name === name) {
                return tileset;
            }
        }
    }
    public replaceTileset(tileset: Tileset) {
        for (let i = 0; i < this.tilesets.length; i++) {
            const element = this.tilesets[i];
            if (element.name === tileset.name) {
                this.tilesets[i] = tileset;
            }
        }
    }

    public addSprite(name: string, path: string, columns: number, rows: number, directionRow: { up: number; down: number; left: number; right: number; }) {
        if (name && this.sprites.filter(s => s.name === name).length === 0 && path && rows && directionRow) {
            const spriteSheet = CreateSpriteSheet(CreateImage(path), rows, columns);
            if (spriteSheet) {
                directionRow.up = directionRow.up * columns;
                const up = spriteSheet.slice(directionRow.up, directionRow.up + columns);

                directionRow.down = directionRow.down * columns;
                const down = spriteSheet.slice(directionRow.down, directionRow.down + columns);

                directionRow.left = directionRow.left * columns;
                const left = spriteSheet.slice(directionRow.left, directionRow.left + columns);

                directionRow.right = directionRow.right * columns;
                const right = spriteSheet.slice(directionRow.right, directionRow.right + columns);
                if (up && down && left && right) {
                    this.sprites.push({
                        name,
                        up,
                        down,
                        left,
                        right,
                    });
                }
            }
        }
    }
    public getSprite(name: string) {
        for (let i = 0; i < this.sprites.length; i++) {
            const sprite = this.sprites[i];
            if (sprite.name === name) {
                return sprite;
            }
        }
    }

    public replaceSprite(sprite: Sprite) {
        for (let i = 0; i < this.sprites.length; i++) {
            const element = this.sprites[i];
            if (element.name === sprite.name) {
                this.sprites[i] = sprite;
            }
        }
    }

    public addPicture(name: string, path: string) {
        if (name && this.pictures.filter(p => p.name === name).length === 0 && path) {
            const pictureImage = CreateImage(path);
            if (pictureImage) {
                this.pictures.push({
                    name,
                    image: pictureImage
                });
            }
        }
    }

    public getPicture(name: string) {
        for (let i = 0; i < this.pictures.length; i++) {
            const picture = this.pictures[i];
            if (picture.name === name) {
                return picture.image;
            }
        }
    }

    public replacePicture(picture: Picture) {
        for (let i = 0; i < this.pictures.length; i++) {
            const element = this.pictures[i];
            if (element.name === picture.name) {
                this.pictures[i] = picture;
            }
        }
    }

    public addSpritesheet(name: string, path: string, columns: number, rows: number) {
        if (name && this.spritesheets.filter(s => s.name === name).length === 0 && path && columns && rows) {
            const spritesheetImage = CreateImage(path);
            if (spritesheetImage) {
                this.spritesheets.push({
                    name,
                    sprites: [...CreateSpriteSheet(spritesheetImage, rows, columns)]
                });
            }
        }
    }

    public getSpritesheet(name: string) {
        for (let i = 0; i < this.spritesheets.length; i++) {
            const spritesheet = this.spritesheets[i];
            if (spritesheet.name === name) {
                return spritesheet.sprites;
            }
        }
    }

    public replaceSpritesheet(spritesheet: Spritesheet) {
        for (let i = 0; i < this.spritesheets.length; i++) {
            const element = this.spritesheets[i];
            if (element.name === spritesheet.name) {
                this.spritesheets[i] = spritesheet;
            }
        }
    }
}

export interface Tileset {
    name: string;
    tiles: image[];
}

export interface Sprite {
    name: string;
    up: image[];
    down: image[];
    left: image[];
    right: image[];
}

export interface Picture {
    name: string;
    image: image;
}

export interface Spritesheet {
    name: string;
    sprites: image[];
}
