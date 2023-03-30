import { useState } from "react";
import BaseLayout from "@layout/BaseLayout";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import * as bcrypt from "bcryptjs";
import Input from "@components/ui/Input";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Label } from "@radix-ui/react-label";
import Editor from "@components/Editor/Editor";
import { Button } from "@components/ui/Button";
import Container from "@components/Container/Container";
const UrlEncoderDecoder = () => {
  const [inputArea, setinputArea] = useState("");
  const [rounds, setrounds] = useState("10");
  const [hash, setHash] = useState("");

  const handleClear = () => {
    setinputArea("");
    setrounds("10");
    setHash("");
  };

  const handleGenerate = () => {
    if (inputArea == "") {
      return;
    }

    bcrypt.hash(inputArea, parseInt(rounds), function (err, hash) {
      console.log(err);

      if (err) return;
      setHash(hash);
    });
  };

  const handleCopy = () => {
    if (hash == "") {
      toast("Noting to copy!", { type: "error" });
      return;
    }
    navigator.clipboard.writeText(hash);
    toast("Copied Hash... Be careful!", { type: "success" });
  };
  return (
    <BaseLayout showBackButton title="Bcrypt Generator">
      <div className="justify-end w-full flex mb-2">
        <Button className="flex  items-center gap-1 px-4 py-2 ml-4 rounded " onClick={handleCopy}>
          <AiOutlineCopy />
          Copy
        </Button>
      </div>
      <TwoEditorLayout>
        <Container>
          <div className="">
            <Label>Rounds</Label>
            <Input placeholder="Rounds" type={"number"} value={rounds} onChange={(e) => setrounds(e.target.value)} />
          </div>
          <div className="mt-2">
            <Label>String</Label>
            <Input placeholder="String" value={inputArea} onChange={(e) => setinputArea(e.target.value)} />
          </div>
          <div className="flex gap-x-3 justify-end pt-3">
            <Button variant={"subtle"} className="flex  items-center gap-1 px-4 py-2 ml-4 rounded " onClick={handleClear}>
              <MdClear />
              Clear
            </Button>
            <Button onClick={handleGenerate} className="flex  items-center gap-1 px-4 py-2 bg-gray-900 rounded hover:shadow hover:scale-105 transition duration-200">
              <IoArrowForwardOutline />
              Generate
            </Button>
          </div>
        </Container>
        <Container>
          <Editor
            disabled
            value={hash}
            setValue={(e) => {
              return;
            }}
          />
        </Container>
      </TwoEditorLayout>
      {/* <div className="flex-col justify-center items-center h-full   ">
        <div className="bg-gray-900 px-4 py-8 rounded">
          <div className=" min-w-fit w-32 flex flex-col gap-y-2">
            <Input type="number" title="Rounds" value={rounds} onChange={(e) => setrounds(e.target.value)} />
          </div>
          <div className="mt-3">
            <Input title="String" value={inputArea} onChange={(e) => setinputArea(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-x-3 justify-end pt-3">
          <button onClick={handleGenerate} className="flex  items-center gap-1 px-4 py-2 bg-gray-900 rounded hover:shadow hover:scale-105 transition duration-200">
            <IoArrowForwardOutline />
            Generate
          </button>
          <button className="flex  items-center gap-1 px-4 py-2 ml-4 rounded " onClick={handleClear}>
            <MdClear />
            Clear
          </button>
        </div>
        <div className="px-6 py-4 bg-gray-900 mt-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold ">Generated Hash</h3>
            <div onClick={handleCopy} className="border border-white p-1 rounded hover:bg-white hover:text-gray-900 cursor-pointer">
              <AiOutlineCopy />
            </div>
          </div>
          {hash}
        </div>
      </div> */}
    </BaseLayout>
  );
};

export default UrlEncoderDecoder;
