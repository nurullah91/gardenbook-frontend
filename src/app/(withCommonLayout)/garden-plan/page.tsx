import dynamic from "next/dynamic";

// Dynamically import the GardenBuilder component as it's client-side
const GardenBuilder = dynamic(
  () => import("@/src/components/UI/GardenBuilder/GardenBuilder"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="text-2xl font-bold text-center my-8">
        Design Your Virtual Garden
      </h1>

      {/* Render GardenBuilder */}
      <GardenBuilder />

      <div className="static-info text-center mt-12">
        <p>This garden builder helps you create a virtual garden!</p>
        <p>Drag plants and text into the grid and download the final design!</p>
      </div>
    </div>
  );
}
