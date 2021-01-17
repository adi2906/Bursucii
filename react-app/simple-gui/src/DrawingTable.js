/** @format */

import React, { useRef, useEffect, useState } from "react";
import "./myStyle.css";

function DrawingTable() {
	const canvasRef = useRef(null);
	const contextRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		canvas.width = 2000;
		canvas.height = 1200;
		canvas.style.width = `1000px`;
		canvas.style.height = `600px`;

		const context = canvas.getContext("2d");
		context.scale(2, 2);
		context.lineCap = "round";
		context.strokeStyle = "white";
		context.lineWidth = 5;
		contextRef.current = context;
	}, []);

	const startDrawing = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.beginPath();
		contextRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		contextRef.current.closePath();
		setIsDrawing(false);
	};

	const draw = ({ nativeEvent }) => {
		if (!isDrawing) {
			return;
		}
		const { offsetX, offsetY } = nativeEvent;
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.stroke();
	};

	return (
		<div className="drawing-table">
			<canvas onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} ref={canvasRef} />
		</div>
	);
}

export default DrawingTable;
