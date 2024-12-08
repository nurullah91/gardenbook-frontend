"use client";

import { useState, useRef, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDrag, useDrop } from "react-dnd";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Types for garden elements
interface GardenElement {
  id: string;
  type: string;
  content: string;
  rotation: number;
  layout: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
  };
}

// Drag item types for DnD
interface DragItem {
  type: string;
  content: string;
}

const GardenBuilder = () => {
  const [gardenElements, setGardenElements] = useState<GardenElement[]>([]);
  const [nextId, setNextId] = useState(0);
  const gardenRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ["plant", "text"],
    drop: (item: DragItem, monitor) => {
      const offset = monitor.getSourceClientOffset();

      if (!offset) return;

      const newElement: GardenElement = {
        id: `element-${nextId}`,
        type: item.type,
        content: item.content,
        rotation: 0,
        layout: {
          i: `element-${nextId}`,
          x: 0,
          y: 0,
          w: 2,
          h: 2,
          minW: 1,
          minH: 1,
        },
      };

      setNextId(nextId + 1);
      setGardenElements((prev) => [...prev, newElement]);
    },
  });

  const Plant = ({ content }: { content: string }) => {
    const ref = useRef<HTMLDivElement>(null); // Create a ref to hold the DOM element
    const [, drag] = useDrag({
      type: "plant",
      item: { type: "plant", content },
    });

    // Apply both the ref and drag function
    useEffect(() => {
      if (ref.current) {
        drag(ref.current);
      }
    }, [drag]);

    return (
      <div ref={ref} className="plant-icon bg-success-200 cursor-pointer p-2">
        {content}
      </div>
    );
  };

  const TextElement = ({ content }: { content: string }) => {
    const ref = useRef<HTMLDivElement>(null); // Create a ref to hold the DOM element
    const [, drag] = useDrag({
      type: "text",
      item: { type: "text", content },
    });

    // Apply both the ref and drag function
    useEffect(() => {
      if (ref.current) {
        drag(ref.current);
      }
    }, [drag]);

    return (
      <div ref={ref} className="text-icon bg-success-200 cursor-pointer p-2">
        {content}
      </div>
    );
  };

  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current); // Manually attach the drop target
    }
  }, [drop]);

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

  const resetGarden = () => {
    setGardenElements([]);
  };

  return (
    <div className="garden-builder-container p-4">
      <div className="toolbar flex gap-4 mb-4">
        <Plant content="🌱 Plant 1" />
        <Plant content="🌿 Plant 2" />
        <TextElement content="Flower Bed" />
        <TextElement content="Vegetable Patch" />
        <TextElement content="Footpath" />
      </div>

      <div
        ref={dropRef}
        className="garden-canvas bg-default-200 border border-dashed border-default-500 p-4 relative"
      >
        {gardenElements.length === 0 && (
          <div className="my-8 text-default-500 text-2xl text-center">
            Drag and drop elements here and resize or move anywhere you need to
            build your garden!
          </div>
        )}

        <div ref={gardenRef}>
          <ResponsiveGridLayout
            className="layout"
            layouts={{
              lg: gardenElements.map((el) => ({
                ...el.layout,
                minW: el.layout.minW,
                minH: el.layout.minH,
              })),
            }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 50, md: 50, sm: 50, xs: 50, xxs: 50 }}
            rowHeight={10}
            compactType={null}
            preventCollision={true}
            onLayoutChange={(layout) => {
              const updatedElements = gardenElements.map((el) => {
                const layoutItem = layout.find((item) => item.i === el.id);

                if (layoutItem) {
                  return {
                    ...el,
                    layout: layoutItem,
                  };
                }

                return el;
              });

              setGardenElements(updatedElements);
            }}
          >
            {gardenElements.map((el) => (
              <div
                key={el.id}
                className={`garden-item border-2 border-default-600 flex items-center justify-center w-full h-full ${el.content === "Footpath" ? "bg-default-400" : "bg-success-200"} cursor-move overflow-hidden`}
                data-grid={el.layout}
              >
                {el.content}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>

      <div className="actions mt-4 flex gap-4">
        <button onClick={downloadGardenAsImage} className="btn btn-primary">
          Download as Image
        </button>
        <button onClick={downloadGardenAsPDF} className="btn btn-secondary">
          Download as PDF
        </button>
        <button onClick={resetGarden} className="btn btn-warning">
          Reset Garden
        </button>
      </div>
    </div>
  );
};

export default GardenBuilder;
