import React, { useEffect, useRef, useState } from 'react'
import useCanvas from './hooks/useCanvas'
import { CONSTANTS } from '../../tools/constants';
import { SceneManager } from './classes/SceneManager';

interface GameProps {
    SceneManager:SceneManager;
}

function GameLoop({SceneManager}:GameProps) {
    const [ SceneManage ] = useState<SceneManager>(SceneManager)
    
    const canvasRef = useCanvas({
        width: CONSTANTS.canvas.width,
        height: CONSTANTS.canvas.height,
        update: (frame) => {
            SceneManage.update(frame)
        },
        draw: (context) => {
            SceneManage.draw(context);
        }
    })

    return (
        <>
            <div style={{ backgroundColor: "#fff" }}>
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    )
}

export default GameLoop