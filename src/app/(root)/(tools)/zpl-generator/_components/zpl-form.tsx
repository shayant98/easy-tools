"use client";

import MultiEditorLayout from "@layout/multi-editor-layout";
import Container from "@components/Container/Container";
import BaseLayout from "@layout/BaseLayout";
import { useState } from "react";

const ZplForm = () => {
  const [zplElements, setZplElements] = useState<ZplElement[]>([]);

  const handleElementTapped = (element: ZplElement) => {
    setZplElements([...zplElements, element]);
  };

  return (
    <div className="flex gap-2">
      <div className="h-screen bg-secondary p-8 rounded w-1/4">Elements</div>
      <div
        className="flex border-2 rounded grow pattern-cross pattern-bg-slate-900
  pattern-size-6 pattern-opacity-20 pattern-slate-50 p-10"
      >
        <div className="rounded h-full w-full grow bg-green-500">
          <p>Form</p>
        </div>
      </div>
    </div>
  );
};

export default ZplForm;

type ZplElement = {
  type: ZplElementTypes;
  label: string;
  coordinates: {
    x: number;
    y: number;
  };
  attributes: Record<string, string>;
};

type ZplElementTypes = "text" | "qr" | "barcode" | "box";

const elements: ZplElement[] = [
  {
    type: "text",
    label: "Text",
    coordinates: {
      x: 0,
      y: 0,
    },
    attributes: {
      font: "0",
      size: "40",
      text: "Hello, World!",
    },
  },
];
