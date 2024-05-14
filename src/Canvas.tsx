import { useRef, useState } from 'react';

interface CanvasProps {
    className: string;
}

interface Point {
    x: number;
    y: number;
}

interface PostCoordinates {
    points: Point[]
}

function Canvas(props: CanvasProps) {
    const { className } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    const [pointsList, setPointsList] = useState<Point[]>([]);

    // mouse handlers

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const { offsetX, offsetY } = e.nativeEvent;
        setIsDrawing(true);
        setLastX(offsetX);
        setLastY(offsetY);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const { offsetX, offsetY } = e.nativeEvent;
        drawLine(ctx, offsetX, offsetY);
        setLastX(offsetX);
        setLastY(offsetY);
        setPointsList((old) => [...old, {x: offsetX, y: offsetY}]);
    }

    const handleMouseUp = () => {
        setIsDrawing(false);
        sendDrawingData();
        clearCanvas();
        setPointsList([]);
    }

    // canvas helpers

    const drawLine = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    const clearCanvas = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx || !canvasRef.current) return;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    // data flow

    const sendDrawingData = () => {
        const data: PostCoordinates = {
            points: pointsList
        };
        const payload = JSON.stringify(data);
        console.log('payload size: ', payload.length, 'sending...', data);
    }

    // return

    return (
        <canvas
            ref={canvasRef}
            id='drawingArea'
            className={className} 
            width='300'
            height='400'
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        ></canvas>
    );
}

export default Canvas;