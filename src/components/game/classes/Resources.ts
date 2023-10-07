
export interface Resources {
    sprites: {
        rows: number;
        columns: number;
        facing: {
            up: number;
            down: number;
            right: number;
            left: number;
        };
        images: { name: string; path: string; }[];
    };
    spritesheets: {
        name: string;
        path: string;
        rows: number;
        columns: number;
    }[];
    tilesets: {
        name: string;
        path: string;
        rows: number;
        columns: number;
    }[];
    pictures: {
        name: string;
        path: string;
    }[];

}
