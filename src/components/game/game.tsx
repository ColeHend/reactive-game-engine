import React, { useState } from 'react'
import useCanvas from './hooks/useCanvas'
import { CreateSquare } from '../../tools/tools';
import { CONSTANTS } from '../../tools/constants';
import { EventModel } from './events/Event';

const square = new EventModel(10, 10, CreateSquare(32,32, "red"))

function GameLoop() {
    const canvasRef = useCanvas({width:CONSTANTS.canvas.width, height:CONSTANTS.canvas.height,
        update:(frame)=>{
            if (frame % 8 !== 0) {
                square.move("down");
                // setSquare(square)
            }
        },
        draw:(context)=>{
            context.drawImage(square.image,square.x, square.y)
            context.fillText(`x: ${square.x}, y: ${square.y}`,250,200,640)
            
        }})

  return (
    <>
        <div style={{backgroundColor:"#fff"}}>
            <canvas ref={canvasRef}></canvas>
        </div>
    </>
  )
}

export default GameLoop