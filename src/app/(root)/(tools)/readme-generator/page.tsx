"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import presets from "../../../../data/markdown-presets";
import Editor from "../../../../components/Editor/Editor";
import { Button } from "@components/ui/button";
import Container from "@components/Container/Container";
import MultiEditorLayout from "@layout/multi-editor-layout";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import BaseLayout from "@layout/BaseLayout";
import {
  Copy,
  DotSquare,
  Download,
  GripVertical,
  Trash,
  Undo2,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@components/ui/card";
import { toast } from "sonner";
import { markdown } from "@codemirror/lang-markdown";
import { Reorder, useDragControls } from "framer-motion";

const ReadmeGenerator = () => {
  const [value, setValue] = useState("");
  const [availablePresets, setavailablePresets] = useState<
    {
      title: string;
      value: string;
    }[]
  >([]);
  const [selectedPresets, setSelectedPresets] = useState<
    {
      title: string;
      value: string;
    }[]
  >([]);
  const [currentlySelectedPreset, setCurrentlySelectedPreset] = useState<{
    title: string;
    value: string;
  }>();

  const controls = useDragControls();

  const handlePresetSelection = (preset: { title: string; value: string }) => {
    setCurrentlySelectedPreset(preset);
    setSelectedPresets(Array.from(new Set([...selectedPresets, preset])));
  };

  const handleOnClear = () => {
    setValue("");
    if (presets[0]) setSelectedPresets([presets[0]]);
    setavailablePresets(presets);
    toast.success("Cleared editor");
  };

  const handleCopy = async () => {
    if (value == "") {
      toast("Noting to copy!");
      return;
    }
    await navigator.clipboard.writeText(value);
    toast.success("Copied Markdown");
  };

  const handlePresetEdit = (
    newValue: string,
    preset?: { title: string; value: string },
  ) => {
    if (preset === undefined) {
      return;
    }
    setCurrentlySelectedPreset({ ...preset, value: `\n${newValue}\n` });
    setSelectedPresets(
      selectedPresets.map((presets) => {
        if (presets.title === preset.title) {
          presets.value = `\n${newValue}\n`;
        }
        return presets;
      }),
    );
  };

  const removeselectedPreset = (preset: { title: string; value: string }) => {
    setSelectedPresets((arr) => arr.filter((el) => el.title !== preset.title));
  };

  const handleDownload = () => {
    if (value == "") {
      toast.error("Noting to download!");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  useEffect(() => {
    setCurrentlySelectedPreset(presets[0]);
    if (presets[0]) {
      setSelectedPresets([presets[0]]);
      setValue(`${presets[0].value}`);
      setavailablePresets(presets);
    }
  }, []);

  // const handleUpdateOrder = (
  //   movedPreset: {
  //     title: string;
  //     value: string;
  //   },
  //   newIndex: number
  // ) => {
  //   //Move the item to the new index and shift the rest
  //   const newOrder = selectedPresets.filter((_, i) => i !== newIndex);
  //   newOrder.splice(newIndex, 0, movedPreset);

  //   setSelectedPresets(newOrder);
  // };

  return (
    <BaseLayout
      title="Readme Generator"
      desc="Generate a readme for your project with ease."
      toolId={6}
    >
      <ToolButtons
        first={
          <div className="flex gap-1">
            <Button className="flex md:hidden" onClick={handleOnClear}>
              <Undo2 className="mr-2 h-4 w-4" /> Templates
            </Button>
            <Button onClick={handleOnClear} variant={"secondary"}>
              <Undo2 className="mr-2 h-4 w-4" /> Undo
            </Button>
          </div>
        }
        second={
          <div className="flex gap-1">
            <Button size={"icon"} onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
            <Button size={"icon"} onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        }
      />
      <MultiEditorLayout>
        <Container>
          <div className="hidden flex-col gap-2 md:flex">
            <Reorder.Group
              values={availablePresets}
              onReorder={setavailablePresets}
              className="grid max-h-[20vh] gap-4"
            >
              {availablePresets.map((preset) => (
                <Reorder.Item
                  key={preset.title}
                  value={preset}
                  dragListener={false}
                  dragControls={controls}
                >
                  <div
                    className="flex cursor-pointer items-center justify-between rounded bg-secondary px-4 py-2"
                    onClick={() => handlePresetSelection(preset)}
                  >
                    <span className="leading-7 [&:not(:first-child)]:mt-6">
                      {preset.title}
                    </span>
                    {new Set(selectedPresets).has(preset) && (
                      <div className="">
                        <Button
                          variant={"destructive"}
                          size={"sm"}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeselectedPreset(preset);
                          }}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                        {/* <Button
                          size={"icon"}
                          variant={"ghost"}
                          onPointerDown={(e) => {
                            controls.start(e);
                          }}
                        >
                          <GripVertical className="w-4 h-4" />
                        </Button> */}
                      </div>
                    )}
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </Container>
        <Container>
          <Editor
            placeholder="Enter encoded URL here"
            value={currentlySelectedPreset?.value.trim() ?? ""}
            setValue={(val: string) =>
              handlePresetEdit(val, currentlySelectedPreset)
            }
            language={markdown()}
          />
        </Container>
        <Container>
          <ReactMarkdown
            className="markdown-body h-full rounded bg-secondary p-4"
            remarkPlugins={[remarkGfm]}
          >
            {selectedPresets
              .map((selectedPresets) => selectedPresets.value)
              .join("")}
          </ReactMarkdown>
        </Container>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default ReadmeGenerator;
