"use client";

import React from "react";
import animation from "@/src/assets/ForgetAnimation.json";
import Lottie from "lottie-react";

export default function ForgetAnimation() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100%",
      }}
    >
      <Lottie animationData={animation} loop={true} />
    </div>
  );
}
