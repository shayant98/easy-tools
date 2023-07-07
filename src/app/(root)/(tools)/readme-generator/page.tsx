"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import { AiOutlineClear, AiOutlineCopy, AiOutlineUndo } from "react-icons/ai";
import { toast } from "react-toastify";
import presets from "../../../../data/markdown-presets";
import Editor from "../../../../components/Editor/Editor";
import { Button } from "@components/ui/Button";
import Container from "@components/Container/Container";
import { useTool } from "context/ToolContext";
import { IoArrowUndo, IoArrowUndoOutline, IoCopyOutline, IoDownloadOutline, IoRemoveOutline } from "react-icons/io5";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import ToolButtons from "@components/ToolButtons/ToolButtons";
import BaseLayout from "@layout/BaseLayout";

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

  const handleCopy = () => {
    if (value == "") {
      toast("Noting to copy!", { type: "error" });
      return;
    }
    navigator.clipboard.writeText(value);
    toast("Copied Markdown", { type: "success" });
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
      toast("Noting to download!", { type: "error" });
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

  const handleUpdateOrder = (
    movedPreset: {
      title: string;
      value: string;
    },
    newIndex: number
  ) => {
    //Move the item to the new index and shift the rest
    const newOrder = selectedPresets.filter((_, i) => i !== newIndex);
    newOrder.splice(newIndex, 0, movedPreset);

    setSelectedPresets(newOrder);
  };

  return (
    <BaseLayout title="Readme Generator" desc="Generate a readme for your project with ease.">
      <ToolButtons
        first={
          <div className="flex gap-1">
            <Button className="flex md:hidden" onClick={handleOnClear}>
              <IoArrowUndoOutline /> Templates
            </Button>
            <Button onClick={handleOnClear}>
              <IoArrowUndoOutline /> Undo
            </Button>
          </div>
        }
        second={
          <div className="flex gap-1">
            <Button onClick={handleDownload}>
              <IoDownloadOutline /> Download
            </Button>
            <Button onClick={handleCopy}>
              <IoCopyOutline /> Copy
            </Button>
          </div>
        }
      />
      <TwoEditorLayout>
        <Container>
          <div className="flex gap-2 h-full w-full">
            <div className="hidden md:block">
              {availablePresets.map((preset, i) => (
                <div key={preset.title} className="flex items-center justify-center gap-x-2 mb-1">
                  <div
                    onClick={() => handlePresetSelection(preset)}
                    className="grow text-sm text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-900  flex justify-between rounded px-4 py-3 cursor-pointer hover:scale-105 duration-200"
                  >
                    {preset.title}
                  </div>
                  {new Set(selectedPresets).has(preset) && (
                    <Button variant={"destructive"} onClick={() => removeselectedPreset(preset)}>
                      <IoRemoveOutline className="" />
                    </Button>
                  )}
                </div>
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
          <ReactMarkdown className="bg-slate-100 dark:bg-slate-900 p-4 rounded markdown-body h-full" remarkPlugins={[remarkGfm]}>
            {selectedPresets.map((selectedPresets) => selectedPresets.value).join("")}
          </ReactMarkdown>
        </Container>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default ReadmeGenerator;
