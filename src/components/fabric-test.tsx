import React, { useEffect } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "../lib";

import { Button, Space } from "antd";

const FabricTest: React.FC = () => {
  const { editor, onReady } = useFabricJSEditor();

  // 线性渐变
  const gradient = new fabric.Gradient({
    type: "linear", // linear or radial
    gradientUnits: "pixels", // pixels or pencentage 像素 或者 百分比
    coords: { x1: 0, y1: 0, x2: 80, y2: 60 }, // 至少2个坐标对（x1，y1和x2，y2）将定义渐变在对象上的扩展方式
    colorStops: [
      // 定义渐变颜色的数组
      { offset: 0, color: "orange" },
      { offset: 1, color: "hotpink" },
    ],
  });

  const onAddCircle = () => {
    editor?.addCircle({
      radius: 20,
      top: 100,
      left: 100,
      stroke: "#af8e79",
      strokeWidth: 2, // 设置描边粗细
      fill: "#ed9cc2",
      shadow: "5px 5px 6px rgba(0, 0, 0, 0.1)", // 元素阴影
      // skewX: 10,
      // skewY: 10
    });
  };
  const onAddRectangle = () => {
    editor?.addRectangle({
      top: 350,
      left: 350,
      width: 60,
      height: 60,
      stroke: "#999",
      strokeWidth: 2, // 设置描边粗细
      strokeDashArray: [5, 5], // 虚线边框
      fill: gradient,
      shadow: "10px 20px 6px rgba(0, 0, 0, 0.1)", // 元素阴影
      rx: 10,
      angle: 45, // 旋转45度
    });
  };

  const onAddTriangle = () => {
    editor?.addTriangle({
        top: 150,
        left: 150,
        stroke: "#000",
        strokeWidth: 5, // 设置描边粗细
        fill:"#fff000"
    })
  }

  const onAddImage = () => {
    editor?.addImage()
  }

  return (
    <div>
      <Space direction="vertical" size={30}>
        <FabricJSCanvas className="sample-canvas" onReady={onReady} />
        <Space wrap size={20}>
          <Button onClick={onAddRectangle}>添加矩形</Button>
          <Button onClick={onAddCircle}>添加圆形</Button>
          <Button onClick={onAddTriangle}>添加三角形</Button>
          <Button onClick={onAddImage}>添加图片</Button>
        </Space>
      </Space>
    </div>
  );
};

export default FabricTest;

