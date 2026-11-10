import type { Metadata } from "next";
import { Scene } from "@/components/Scene";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Abhinav Singh — Building Intelligent Experiences",
  description:
    "A live, scroll-driven portfolio: Vednix AI (shipped), Second Thought (in build), the stack behind them, and an open door to work together.",
};

export default function Page() {
  return (
    <>
      <StructuredData />
      <main>
        <Scene />
      </main>
    </>
  );
}
