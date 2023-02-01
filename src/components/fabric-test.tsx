import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { Button, Space } from "antd";

const FabricTest: React.FC = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = new fabric.Canvas("fabricTest", {
            backgroundColor: "#f0f2f4",
        });
        canvasRef.current = canvas;
    }, [])


    // 将图形添加到画布中
    const addToCanvas = (graph: any) => {
        canvasRef.add(graph);
        canvasRef.requestRenderAll();
    };

    const addRectangle = () => {
        // 创建矩形元素
        const rect = new fabric.Rect({
            top: 10,
            left: 10,
            width: 60,
            height: 60,
            stroke: "#f40",
            strokeWidth: 2, // 设置描边粗细
            strokeDashArray: [5, 5], // 虚线边框
            fill: "#aa96da",
            shadow: "10px 20px 6px rgba(0, 0, 0, 0.1)", // 元素阴影
        });
        addToCanvas(rect);
    };

    return (
        <div>
            <canvas ref={canvasRef} id="fabricTest" width="500" height="500"></canvas>
            <Space wrap>
                <Button onClick={addRectangle}>添加矩形</Button>
                <Button>添加圆形</Button>
                <Button>添加椭圆形</Button>
                <Button>添加三角形</Button>
                <Button>添加图片</Button>
            </Space>
        </div>
    );
};

export default FabricTest;
