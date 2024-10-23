"use client";

import { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { HTML5Backend } from "react-dnd-html5-backend";

// Types for garden elements
interface GardenElement {
  id: string;
  type: "plant" | "text";
  content: string;
  x: number;
  y: number;
  rotation: number;
}

// Drag item types for DnD
interface DragItem {
  type: string;
  content: string;
}

const GardenBuilder = () => {
  const [gardenElements, setGardenElements] = useState<GardenElement[]>([]);

  const gardenRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ["plant", "text"],
    drop: (item: DragItem, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return;

      const newElement: GardenElement = {
        id: Math.random().toString(),
        type: item.type,
        content: item.content,
        x: offset.x,
        y: offset.y,
        rotation: 0,
      };

      setGardenElements((prev) => [...prev, newElement]);
    },
  });

  const Plant = ({ content }: { content: string }) => {
    const [, drag] = useDrag({
      type: "plant",
      item: { type: "plant", content },
    });

    return (
      <div ref={drag} className="plant-icon cursor-pointer p-2">
        {content}
      </div>
    );
  };

  const TextElement = ({ content }: { content: string }) => {
    const [, drag] = useDrag({
      type: "text",
      item: { type: "text", content },
    });

    return (
      <div ref={drag} className="text-icon cursor-pointer p-2">
        {content}
      </div>
    );
  };

  const downloadGardenAsImage = async () => {
    if (gardenRef.current) {
      const canvas = await html2canvas(gardenRef.current);
      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "garden_design.png";
      link.click();
    }
  };

  const downloadGardenAsPDF = async () => {
    if (gardenRef.current) {
      const canvas = await html2canvas(gardenRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("garden_design.pdf");
    }
  };

  const rotateElement = (id: string, angle: number) => {
    setGardenElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, rotation: el.rotation + angle } : el
      )
    );
  };

  return (
    <div className="garden-builder-container p-4">
      <div className="toolbar flex gap-4 mb-4">
        <Plant content="🌱 Plant 1" />
        <Plant content="🌿 Plant 2" />
        <TextElement content="Flower Bed" />
        <TextElement content="Vegetable Patch" />
      </div>

      <div
        ref={drop}
        className="garden-canvas border border-dashed border-gray-400 p-4 h-96 relative"
      >
        <div ref={gardenRef}>
          {gardenElements.map((el) => (
            <div
              key={el.id}
              className="absolute"
              style={{
                left: el.x,
                top: el.y,
                transform: `rotate(${el.rotation}deg)`,
              }}
            >
              {el.content}
              <div className="rotate-buttons mt-2">
                <button
                  className="mr-2 p-1 bg-blue-500 text-white"
                  onClick={() => rotateElement(el.id, 15)}
                >
                  Rotate +15°
                </button>
                <button
                  className="p-1 bg-red-500 text-white"
                  onClick={() => rotateElement(el.id, -15)}
                >
                  Rotate -15°
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions mt-4">
        <button
          onClick={downloadGardenAsImage}
          className="btn btn-primary mr-4"
        >
          Download as Image
        </button>
        <button onClick={downloadGardenAsPDF} className="btn btn-secondary">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default GardenBuilder;
