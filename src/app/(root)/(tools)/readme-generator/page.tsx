"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import Container from "@/components/Container/Container";
import ToolButtons from "@/components/ToolButtons/ToolButtons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import presets from "@/data/markdown-presets";
import BaseLayout from "@/layout/BaseLayout";
import TabbedLayout from "@/layout/TabbedLayout";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { markdown } from "@codemirror/lang-markdown";
import { Reorder, useDragControls } from "framer-motion";
import { Copy, DotSquare, Download, Edit, GripVertical, Trash, Undo2 } from "lucide-react";
import { toast } from "sonner";
import Editor from "../../../../components/Editor/Editor";
import ProjectTreeGen from "./_components/project-tree-generator";

const ReadmeGenerator = () => {
  const [value, setValue] = useState("");
  const [availablePresets, setavailablePresets] = useState<{ title: string; value: string }[]>([]);
  const [selectedPresets, setSelectedPresets] = useState<{ title: string; onClick?: () => void; value: string }[]>([]);
  const [currentlySelectedPreset, setCurrentlySelectedPreset] = useState<{ title: string; value: string }>();

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
    if (value === "") {
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
    setCurrentlySelectedPreset({ ...preset, value: `\n${newValue}\n` });
    setSelectedPresets(
      selectedPresets.map((presets) => {
        if (presets.title === preset.title) {
          presets.value = `\n${newValue}\n`;
        }
        return presets;
      })
    );
  };

  const removeselectedPreset = (preset: { title: string; value: string }) => {
    setSelectedPresets((arr) => arr.filter((el) => el.title !== preset.title));
  };

  const handleDownload = () => {
    if (value === "") {
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

  console.log("selected presets", selectedPresets);

  return (
    <BaseLayout title="Readme Generator" desc="Generate a readme for your project with ease." toolId={6}>
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
        <Container className="">
          <div className="grid">
            <h3 className="mb-3 font-medium text-lg">Selected Presets</h3>
            <Reorder.Group values={selectedPresets} onReorder={setSelectedPresets} className="grid gap-4">
              {selectedPresets.map((preset, i) => (
                <Reorder.Item key={preset.title} value={preset} dragControls={controls}>
                  <div className="flex justify-between rounded bg-secondary px-4 py-2 text-secondary-foreground">
                    <div className="flex items-center">
                      <Button className="cursor-grab" variant={"ghost"} size={"icon"}>
                        <GripVertical className="h-4 w-4" />
                      </Button>
                      <p>
                        {i + 1}. {preset.title}
                      </p>
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => {
                          if (preset.onClick) {
                            preset.onClick();
                          }
                          setCurrentlySelectedPreset(preset);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>

                      <Button variant={"destructive"} size={"icon"} onClick={() => removeselectedPreset(preset)}>
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
          <Separator className="my-5" />
          <div className="hidden gap-2 md:grid md:grid-cols-4">
            {availablePresets
              .filter((availablePresets) => selectedPresets.every((selectedPresets) => selectedPresets.title !== availablePresets.title))
              .map((preset) => (
                <button
                  type="button"
                  key={preset.title}
                  className="flex w-full cursor-pointer flex-wrap items-center justify-between rounded bg-secondary px-4 py-2 text-center text-xs"
                  onClick={() => handlePresetSelection(preset)}
                >
                  <span className="not-first:mt-6 leading-7">{preset.title}</span>
                </button>
              ))}
            <ProjectTreeGen setSelectedPresets={setSelectedPresets} />
          </div>
        </Container>
        <Container>
          <TabbedLayout
            defaultTab="markdown"
            options={[
              {
                label: "Markdown",
                value: "markdown",
                child: (
                  <Editor
                    placeholder="Enter encoded URL here"
                    value={currentlySelectedPreset?.value.trim() ?? ""}
                    setValue={(val: string) => handlePresetEdit(val, currentlySelectedPreset)}
                    language={markdown()}
                  />
                ),
              },
              {
                label: "Preview",
                value: "preview",
                child: (
                  <ReactMarkdown
                    // className="markdown-body h-full rounded bg-secondary p-4"
                    remarkPlugins={[remarkGfm]}
                  >
                    {selectedPresets.map((selectedPresets) => selectedPresets.value).join("\n")}
                  </ReactMarkdown>
                ),
              },
            ]}
          />
        </Container>
      </MultiEditorLayout>
    </BaseLayout>
  );
};

export default ReadmeGenerator;
