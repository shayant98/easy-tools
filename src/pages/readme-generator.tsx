import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextArea from "../components/TextArea";
import BaseLayout from "../layout/BaseLayout";
import "github-markdown-css";
import { AiOutlineClear, AiOutlineCopy, AiOutlineUndo } from "react-icons/ai";
import { toast } from "react-toast";
import presets from "../data/markdown-presets";
const ReadmeGenerator = () => {
  const [value, setValue] = useState("");
  const [showFullMd, setshowFullMd] = useState(false);
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
    if (value == "") {
      toast.error("Noting to clear!");
      return;
    }
    setValue("");
    setSelectedPresets([]);
    setavailablePresets(presets);
    toast.success("Cleared editor");
  };

  const handleCopy = () => {
    if (value == "") {
      toast.error("Noting to copy!");
      return;
    }
    navigator.clipboard.writeText(value);
    toast.success("Copied Markdown");
  };

  const handlePresetEdit = (preset: { title: string; value: string }, newValue: string) => {
    preset.value = newValue;
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
      <div className="flex gap-x-2 px-20 mb-3">
        <div className="flex gap-x-1 w-1/4 ">
          <div className="bg-gray-900 rounded px-4 py-2 cursor-pointer" onClick={handleOnClear}>
            <AiOutlineUndo />
          </div>
        </div>
        <div className="flex gap-x-1 w-1/3 "></div>
        <div className="flex gap-x-1 w-1/3 ">
          <div className="flex items-center gap-1 bg-gray-900 rounded px-4 py-2 cursor-pointer  " onClick={handleCopy}>
            <AiOutlineCopy />
          </div>
        </div>
      </div>
      <div className="flex px-20 gap-x-2 h-5/6 pb-4">
        <div className="border rounded w-1/4  px-4 py-2">
          {availablePresets.map((preset, i) => (
            <div key={preset.title} className="flex items-center justify-center gap-x-2">
              <div
                onClick={() => handlePresetSelection(preset)}
                className="grow text-sm bg-gray-900 mb-1 flex justify-between rounded px-4 py-2 cursor-pointer hover:scale-105 duration-200"
              >
                {preset.title}
              </div>
              {/* {new Set(selectedPresets).has(preset) && (
                <div className="bg-red-500 text-sm rounded h-max px-4 py-2 mb-1 cursor-pointer">
                  <AiOutlineClear className="" onClick={(e) => removeselectedPreset(i)} />
                </div>
              )} */}
            </div>
          ))}
        </div>
        <div className=" w-1/3 overflow-scroll break-words">
          <TextArea language="MD" value={currentlySelectedPreset?.value ?? ""} setValue={(value: string) => handlePresetEdit(currentlySelectedPreset!, value)} />
        </div>
        <div className="grow w-1/3 overflow-y-scroll">
          <div className="rounded   markdown-body px-4 py-2 overflow-y-scroll ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedPresets.map((selectedPresets) => selectedPresets.value).join("")}</ReactMarkdown>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default ReadmeGenerator;
