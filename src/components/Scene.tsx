"use client";

import { KageLandingPage } from "@vendor/threeui/shaders/landing-pages/LandingPages";

/**
 * The configured usage, kept exactly as specified: one full-viewport stage,
 * one framed document, the one selected variant and its control values.
 */
export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
