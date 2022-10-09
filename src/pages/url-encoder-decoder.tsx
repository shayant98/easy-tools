import { useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
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
    <BaseLayout
      showBackButton
      title="URL Encoder/Decoder"
      desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere deserunt quis assumenda beatae placeat dolores, voluptas consequatur sunt totam ut error cum veniam vel,
          impedit recusandae ducimus nihil? Voluptate, quidem? Incidunt quae autem velit esse placeat, in voluptatum nihil corporis nulla recusandae labore deserunt, hic earum.
          Dolorum rerum earum nobis blanditiis eveniet! Ipsam, dolorum obcaecati nulla vero autem corporis commodi? Mollitia fugiat saepe eius ut. Minus iste, accusamus corporis"
    >
      <div className="px-20 h-full">
        <div className="flex gap-x-2 h-1/2">
          <div className="w-1/2 ">
            <Editor
              placeholder="Enter URL here"
              value={inputArea}
              onValueChange={(value: string) => setinputArea(value)}
              highlight={(code: string) => highlight(code, languages.js!, "js")}
              padding={10}
              className="bg-gray-900 rounded h-full "
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </div>
          <div className=" w-1/2">
            <Editor
              readOnly
              value={outputArea}
              onValueChange={(value: string) => {
                return;
              }}
              highlight={(code: string) => highlight(code, languages.js!, "js")}
              padding={10}
              className="bg-gray-900 rounded h-full "
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
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
