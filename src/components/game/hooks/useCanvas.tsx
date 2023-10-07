import React, { useEffect, useRef } from 'react'
import { CreateBuffer, CreateSquare } from '../../../tools/tools'

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
    width: number,
    height: number
    draw: (context: CanvasRenderingContext2D)=>void
    update: (frame:number) => void
}


function useCanvas({ width, height, draw, update, ...rest }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return;
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (!context) return;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        let count = 0;
        let animID: number;
        const renderer = () => {
            context.clearRect(0,0,context.canvas.width,context.canvas.height)
            count++;
            const bufferContext = CreateBuffer(context.canvas.width,context.canvas.height)
            update(count)
            draw(bufferContext)
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.drawImage(bufferContext.canvas, 0, 0)
            animID = window.requestAnimationFrame(renderer)
        }
        renderer();
        
        const resetCount = setInterval(()=>{
            document.title = `GameFPS: ${count}`;
            count = 0;
        },1000)

        return () => {window.cancelAnimationFrame(animID); clearInterval(resetCount)}
    }, [canvasRef, draw, update, height, width])

    return canvasRef
}

export default useCanvas;