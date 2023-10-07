import React from 'react'
import { SceneManager } from '../classes/SceneManager';
import { Resources } from '../classes/Resources';
import { MapData } from '../../../models/maps';

interface Props {
    mapSource: string;
    reSource: string;
}

async function useSceneManager({mapSource = "./maps.json", reSource = "./resources.json"}: Props) {
    const source: Resources = await fetch(reSource).then(res => res.json());
    const Maps: MapData[] = await fetch(mapSource).then(res => res.json());;
    
    return new SceneManager(Maps, source);
}

export default useSceneManager


