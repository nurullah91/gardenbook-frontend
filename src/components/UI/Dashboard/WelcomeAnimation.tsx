"use client";

import React from "react";
import welcomeAnimation from "@/src/assets/WelcomeAnimation.json";
import Lottie from "lottie-react";

export default function WelcomeAnimation() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        margin: "2rem auto",
        maxWidth: "100%",
      }}
    >
      <Lottie animationData={welcomeAnimation} loop={true} />
    </div>
  );
}
