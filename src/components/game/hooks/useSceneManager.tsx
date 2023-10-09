import { useEffect, useRef, useState } from 'react';
import { SceneManager } from '../classes/SceneManager';
import { Resources } from '../classes/Resources';
import { MapData } from '../../../models/maps';

interface Props {
    mapSource?: string;
    reSource?: string;
}

async function useSceneManager({ mapSource = "./maps.json", reSource = "./resources.json" }: Props) {
    const sourceRef = useRef<Resources>();
    const mapsRef = useRef<MapData[]>();
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await fetch('http://localhost:4000/game/resources');
                if (!res.ok) {
                    throw new Error('Failed to fetch resources');
                }
                const data: Resources = await res.json();

                sourceRef.current = data;
            } catch (error) {
                console.error(error);
            }
        };


        const fetchMaps = async () => {
            try {
                const res = await fetch("http://localhost:4000/game/maps");
                if (!res.ok) {
                    throw new Error('Failed to fetch maps');
                }
                const data:MapData[] = await res.json();
                
                mapsRef.current = data;
            } catch (error) {
                console.error(error);
            }
        };

        // Use Promise.all to wait for both fetches to complete
        Promise.all([fetchResources(), fetchMaps()])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [mapSource, reSource]);

    // Return the SceneManager instance once loading is complete
    return loading ? null : new SceneManager(mapsRef.current || [], sourceRef.current);
}

export default useSceneManager;


