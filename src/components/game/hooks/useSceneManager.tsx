import React from 'react'
import { SceneManager } from '../classes/SceneManager';
import { MapData } from '../../../models/maps';

interface Props {
    mapData: MapData[];
}

function useSceneManager(props:Props) {


    return (new SceneManager(props.mapData))
}

export default useSceneManager


