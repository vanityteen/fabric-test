import { fabric } from "fabric";
import { useEffect, useState } from "react";
import { CIRCLE, RECTANGLE, LINE, TEXT, TRIANGLE } from "./defaultShapes";

export interface FabricJSEditor {
  canvas: fabric.Canvas;
  addCircle: (params?: any) => void;
  addRectangle: (params?: any) => void;
  addTriangle: (params?: any) => void;
  addImage: (url?: string, params?: any) => void;
  addLine: (params?: any) => void;
  addText: (text: string, params?: any) => void;
  updateText: (text: string, params?: any) => void;
  deleteAll: () => void;
  deleteSelected: () => void;
  fillColor: string;
  strokeColor: string;
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

/**
 * Creates editor
 */
const buildEditor = (
  canvas: fabric.Canvas,
  fillColor: string,
  strokeColor: string,
  _setFillColor: (color: string) => void,
  _setStrokeColor: (color: string) => void,
  scaleStep: number
): FabricJSEditor => {
  return {
    canvas,
    addCircle: (params) => {
      const object = new fabric.Circle({
        ...(params || CIRCLE),
      });
      canvas.add(object);
    },
    addRectangle: (params) => {
      const object = new fabric.Rect({
        ...(params || RECTANGLE),
      });
      canvas.add(object);
    },
    addTriangle: (params) => {
      const object = new fabric.Triangle({
        ...(params || TRIANGLE),
      });
      canvas.add(object);
    },
    addImage: (url, params) => {
      const img = new Image();
      img.onload = () => {
        const oImg = new fabric.Image(img, {
          ...params,
        });
        canvas.add(oImg);

      };
      img.src = url || "src/assets/react.svg";
    },
    addLine: (params) => {
      const object = new fabric.Line(params.points, {
        ...(params.options || LINE),
      });
      canvas.add(object);
    },
    addText: (text: string, params) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, { ...(params || TEXT) });
      object.set({ text: text });
      canvas.add(object);
    },
    updateText: (text: string, params) => {
      const objects: any[] = canvas.getActiveObjects();
      if (objects.length && objects[0].type === params.type) {
        const textObject: fabric.Textbox = objects[0];
        textObject.set({ text });
        canvas.renderAll();
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    fillColor,
    strokeColor,
    setFillColor: (fill: string) => {
      _setFillColor(fill);
      canvas.getActiveObjects().forEach((object) => object.set({ fill }));
      canvas.renderAll();
    },
    setStrokeColor: (stroke: string) => {
      _setStrokeColor(stroke);
      canvas.getActiveObjects().forEach((object) => {
        if (object.type === "text") {
          // use stroke in text fill
          object.set({ fill: stroke });
          return;
        }
        object.set({ stroke });
      });
      canvas.renderAll();
    },
    zoomIn: () => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom / scaleStep);
    },
    zoomOut: () => {
      const zoom = canvas.getZoom();
      canvas.setZoom(zoom * scaleStep);
    },
  };
};

interface FabricJSEditorState {
  editor?: FabricJSEditor;
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[];
  onReady: (canvas: fabric.Canvas) => void;
}

interface FabricJSEditorHookProps {
  defaultFillColor?: string;
  defaultStrokeColor?: string;
  scaleStep?: number;
}

const useFabricJSEditor = (
  props: FabricJSEditorHookProps = {}
): FabricJSEditorHook => {
  const scaleStep = props.scaleStep || 0.5;
  const { defaultFillColor, defaultStrokeColor } = props;
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [fillColor, setFillColor] = useState<string>(
    defaultFillColor || "rgba(255, 255, 255, 0.0)"
  );
  const [strokeColor, setStrokeColor] = useState<string>(
    defaultStrokeColor || "#000000"
  );
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([]);
  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on("selection:cleared", () => {
        setSelectedObject([]);
      });
      canvas.on("selection:created", (e: any) => {
        setSelectedObject(e.selected);
      });
      canvas.on("selection:updated", (e: any) => {
        setSelectedObject(e.selected);
      });
    };
    if (canvas) {
      bindEvents(canvas);
    }
  }, [canvas]);

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      // eslint-disable-next-line no-console
      console.log("Fabric canvas ready");
      setCanvas(canvasReady);
    },
    editor: canvas
      ? buildEditor(
          canvas,
          fillColor,
          strokeColor,
          setFillColor,
          setStrokeColor,
          scaleStep
        )
      : undefined,
  };
};

export { buildEditor, useFabricJSEditor };
export type { FabricJSEditorHook };

