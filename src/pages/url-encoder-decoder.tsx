import { useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import Editor from "@components/Editor/Editor";
const UrlEncoderDecoder = () => {
  const [inputArea, setinputArea] = useState("");
  const [outputArea, setoutputArea] = useState("");

  const handleDecode = () => {
    setoutputArea(decodeURI(inputArea));
  };
  const handleEncode = () => {
    setoutputArea(encodeURI(inputArea));
  };
  const handleClear = () => {
    setinputArea("");
    setoutputArea("");
  };
  return (
    <BaseLayout showBackButton title="URL Encoder/Decoder">
      <div className=" h-full">
        <div className="flex gap-x-2 h-1/2">
          <div className="w-1/2 ">
            <Editor placeholder="Enter encoded URL here" value={inputArea} setValue={(e) => setinputArea(e.target.value)} language="html" />
          </div>
          <div className=" w-1/2">
            <Editor placeholder="Enter decoded URL here" value={outputArea} setValue={(e) => setoutputArea(e.target.value)} language="html" />
          </div>
        </div>
        <div className="flex gap-x-3 justify-end pt-3">
          <button className="flex  items-center gap-1 px-4 py-2 bg-gray-900 rounded hover:shadow hover:scale-105 transition duration-200" onClick={handleEncode}>
            <IoArrowForwardOutline />
            Encode
          </button>
          <button className="flex  items-center gap-1 px-4 py-2 bg-gray-900 rounded hover:shadow hover:scale-105 transition duration-200" onClick={handleDecode}>
            <IoArrowBackOutline />
            Decode
          </button>
          <button className="flex  items-center gap-1 px-4 py-2 ml-4 rounded " onClick={handleClear}>
            <MdClear />
            Clear
          </button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default UrlEncoderDecoder;
