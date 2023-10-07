
export interface EventCore {
    x:number;
    y:number;
    img:string;
    mapName:string;
}

export interface EventExtended extends EventCore {
    bbHeight?: number;
    bbWidth?: number;
    activateType?: string;
    battleCoreName?: string;
    commands?: any[];
    behavior?: EventBehavior;
}

export interface EventBehavior {
    stats: Stats;
    nature: string;
    groupName: string;
    priority: string[];
    moveType: string;
    detectRange: number;
}

export interface Stats {
    hp: number;
    atk: number;
    sAtk: number;
    def: number;
    sDef: number;
    speed: number;
};