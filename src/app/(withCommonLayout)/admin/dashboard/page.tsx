import React from "react";

import WelcomeAnimation from "@/src/components/UI/Dashboard/WelcomeAnimation";

export interface IDashboardProps {}
export default function Dashboard({}: IDashboardProps) {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center">Gardenbook Dashboard</h1>
      <WelcomeAnimation />
    </div>
  );
}
