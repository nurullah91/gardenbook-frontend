import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import the GardenBuilder component as it's client-side
const GardenBuilder = dynamic(
  () => import("@/src/components/UI/GardenBuilder/GardenBuilder"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Custom Plan",
  description:
    "Make your custom garden plan. And download the plan as jpg or pdf",
};
export default function Home() {
  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold text-center my-6">
        Design Your Virtual Garden
      </h1>

      <div className="static-info text-center">
        <p>This garden builder helps you create a virtual garden!</p>
        <p>Drag plants and text into the grid and download the final design!</p>
      </div>
      {/* Render GardenBuilder */}

      <div className="my-8">
        {/* @ts-ignore */}
        <GardenBuilder />
      </div>
    </div>
  );
}
