"use client";

import Container from "@/components/Container/Container";
import Editor from "@/components/Editor/Editor";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import * as bcrypt from "bcryptjs";
import { ArrowRight, Copy, Eraser } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BcryptGenerator = () => {
  const [inputArea, setinputArea] = useState("");
  const [rounds, setrounds] = useState("10");
  const [hash, setHash] = useState("");
  const handleGenerate = () => {
    if (inputArea === "") {
      return;
    }

    bcrypt.hash(inputArea, Number.parseInt(rounds), (err, hash) => {
      console.log(err);

      if (err) return;
      if (hash === undefined || hash === "") {
        toast.error("Hash generation failed");
        return;
      }
      setHash(hash);
    });
  };

  const handleCopy = async () => {
    if (hash === "") {
      toast("Noting to copy!");
      return;
    }
    await navigator.clipboard.writeText(hash);
    toast.success("Copied Hash... Be careful!");
  };

  const handleClear = () => {
    setinputArea("");
    setrounds("10");
    setHash("");
  };

  return (
    <>
      <div className="mb-2 flex w-full justify-end">
        <Button className="ml-4 flex items-center gap-1 rounded px-4 py-2 " onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
      </div>
      <MultiEditorLayout>
        <Container>
          <div className="">
            <Label>Rounds</Label>
            <Input placeholder="Rounds" type={"number"} value={rounds} onChange={(e) => setrounds(e.target.value)} />
          </div>
          <div className="mt-2">
            <Label>String</Label>
            <Input placeholder="String" value={inputArea} onChange={(e) => setinputArea(e.target.value)} />
          </div>
          <div className="flex justify-end gap-x-3 pt-3">
            <Button variant={"ghost"} className="ml-4 flex items-center gap-1 rounded px-4 py-2 " onClick={handleClear}>
              <Eraser className="mr-2 h-4 w-4" />
              Clear
            </Button>
            <Button onClick={handleGenerate} className="flex items-center gap-1 rounded px-4 py-2 transition duration-200 hover:scale-105 hover:shadow">
              <ArrowRight className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </Container>
        <Container>
          <Editor disabled value={hash} setValue={setHash} />
        </Container>
      </MultiEditorLayout>
    </>
  );
};

export default BcryptGenerator;
