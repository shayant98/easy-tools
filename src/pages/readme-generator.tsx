import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BaseLayout from "../layout/BaseLayout";
import "github-markdown-css";
import { AiOutlineClear, AiOutlineCopy, AiOutlineUndo } from "react-icons/ai";
import { toast } from "react-toastify";
import presets from "../data/markdown-presets";
import Editor from "../components/Editor/Editor";
import { Button } from "@components/ui/Button";
import Container from "@components/Container/Container";
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

  useEffect(() => {
    setCurrentlySelectedPreset(presets[0]);
    if (presets[0]) {
      setSelectedPresets([presets[0]]);
      setValue(`${presets[0].value}`);
      setavailablePresets(presets);
    }
  }, []);

  return (
    <BaseLayout title="Markdown" showBackButton>
      <div className="flex gap-x-1 mb-2 ">
        <div className="flex gap-x-1  w-1/4">
          <Button onClick={handleOnClear}>
            <AiOutlineUndo /> Undo
          </Button>
        </div>
        <div className="flex gap-x-1  w-1/3"></div>
        <div className="flex gap-x-1  w-full justify-end">
          <Button onClick={handleCopy}>
            <AiOutlineCopy /> Copy
          </Button>
        </div>
      </div>
      <div className="flex h-full  gap-x-1 ">
        <div className=" w-1/4 max-h-96 ">
          <Container>
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
                    <AiOutlineClear className="" />
                  </Button>
                )}
              </div>
            ))}
          </Container>
        </div>
        <div className=" w-1/3 max-h-max  break-words">
          <Container>
            <Editor value={currentlySelectedPreset?.value ?? ""} setValue={(e) => handlePresetEdit(e.target.value, currentlySelectedPreset)} language="md" />
          </Container>
        </div>
        <div className="grow w-1/3 h-5/6 overflow-y-auto">
          <Container>
            <ReactMarkdown className="bg-slate-100 dark:bg-slate-900 p-4 rounded markdown-body" remarkPlugins={[remarkGfm]}>
              {selectedPresets.map((selectedPresets) => selectedPresets.value).join("")}
            </ReactMarkdown>
          </Container>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ReadmeGenerator;
