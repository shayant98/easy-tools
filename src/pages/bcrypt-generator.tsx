import { useState } from "react";
import BaseLayout from "@layout/BaseLayout";
import { IoArrowForwardOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import * as bcrypt from "bcryptjs";
import Input from "@components/ui/Input";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import Editor from "@components/Editor/Editor";
import { Button } from "@components/ui/Button";
import Container from "@components/Container/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/Tabs";
import TabbedLayout from "@layout/TabbedLayout";
import { Label } from "@components/ui/Label";
const UrlEncoderDecoder = () => {
  const [inputArea, setinputArea] = useState("");
  const [rounds, setrounds] = useState("10");
  const [hash, setHash] = useState("");
  const [validateHash, setValidateHash] = useState("");
  const [string, setstring] = useState("");

  const handleClear = () => {
    setinputArea("");
    setrounds("10");
    setHash("");
    setstring("");
    setValidateHash("");
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

  const handleCheck = async () => {
    if (validateHash == "") {
      return;
    }
    if (string == "") {
      return;
    }

    const match = await bcrypt.compare(string, hash);

    if (match) {
      toast("Hash is valid", { type: "success" });
      return;
    }
    toast("hash is invalid", { type: "error" });
  };
  return (
    <BaseLayout showBackButton title="Bcrypt">
      <TabbedLayout
        defaultTab="generate"
        options={[
          {
            value: "generate",
            label: "Generate",
            child: (
              <>
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
              </>
            ),
          },
          {
            value: "validate",
            label: "Validate",
            child: (
              <Container>
                <div className="mt-3">
                  <Label>Hash</Label>
                  <Input placeholder="Hash" value={validateHash} onChange={(e) => setValidateHash(e.target.value)} />
                </div>
                <div className="mt-3">
                  <Label>String to check against</Label>
                  <Input placeholder="String to check against" value={string} onChange={(e) => setstring(e.target.value)} />
                </div>
                <div className="flex gap-x-3 justify-end pt-3">
                  <Button variant={"subtle"} onClick={handleClear}>
                    <MdClear />
                    Clear
                  </Button>
                  <Button onClick={handleCheck}>
                    <IoArrowForwardOutline />
                    <span>Validate</span>
                  </Button>
                </div>
              </Container>
            ),
          },
        ]}
      />
    </BaseLayout>
  );
};

export default UrlEncoderDecoder;
