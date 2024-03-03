"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import presets from "../../../../data/markdown-presets";
import Editor from "../../../../components/Editor/Editor";
import { Button } from "@components/ui/button";
import Container from "@components/Container/Container";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import BaseLayout from "@layout/BaseLayout";
import { Copy, Download, Trash, Undo2 } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@components/ui/card";
import { toast } from "sonner";

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

  const handlePresetEdit = (newValue: string, preset?: { title: string; value: string }) => {
    if (preset === undefined) {
      return;
    }
    setCurrentlySelectedPreset({ ...preset, value: newValue });
    setSelectedPresets(
      selectedPresets.map((presets) => {
        if (presets.title === preset.title) {
          presets.value = newValue;
        }
        return presets;
      })
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
    <BaseLayout title="Readme Generator" desc="Generate a readme for your project with ease." toolId={6}>
      <ToolButtons
        first={
          <div className="flex gap-1">
            <Button className="flex md:hidden" onClick={handleOnClear}>
              <Undo2 className="mr-2 h-4 w-4" /> Templates
            </Button>
            <Button onClick={handleOnClear}>
              <Undo2 className="mr-2 h-4 w-4" /> Undo
            </Button>
          </div>
        }
        second={
          <div className="flex gap-1">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
          </div>
        }
      />
      <TwoEditorLayout>
        <Container>
          <div className="flex h-full w-full gap-2 ">
            <div className="hidden  flex-col gap-2 md:flex">
              {availablePresets.map((preset) => (
                <Card key={preset.title} onClick={() => handlePresetSelection(preset)} className={`cursor-pointer `}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-nowrap">{preset.title}</CardTitle>
                      {new Set(selectedPresets).has(preset) && (
                        <Button
                          variant={"destructive"}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeselectedPreset(preset);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="grow">
              <Editor
                placeholder="Enter encoded URL here"
                value={currentlySelectedPreset?.value ?? ""}
                setValue={(e) => handlePresetEdit(e.target.value, currentlySelectedPreset)}
                language="markdown"
              />
            </div>
          </div>
        </Container>
        <Container>
          <ReactMarkdown className="markdown-body h-full rounded bg-secondary p-4" remarkPlugins={[remarkGfm]}>
            {selectedPresets.map((selectedPresets) => selectedPresets.value).join("")}
          </ReactMarkdown>
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default ReadmeGenerator;
