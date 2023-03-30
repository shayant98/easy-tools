import { useState } from "react";
import BaseLayout from "@layout/BaseLayout";
import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import * as bcrypt from "bcryptjs";
import Input from "@components/ui/Input";
import { AiOutlineCopy } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button } from "@components/ui/Button";
import Container from "@components/Container/Container";
import { Label } from "@components/ui/Label";
const UrlEncoderDecoder = () => {
  const [hash, sethash] = useState("");
  const [string, setstring] = useState("");

  const handleClear = () => {
    setstring("");
    sethash("");
  };

  const handleCheck = async () => {
    if (hash == "") {
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
    <BaseLayout
      showBackButton
      title="Bcrypt Validator"
      desc="Simply input a hash and a string to check against, and our tool will let you know if the hash is valid or not. This easy-to-use tool is perfect for verifying the integrity of passwords and other sensitive data."
    >
      <Container>
        <div className="mt-3">
          <Label>Hash</Label>
          <Input placeholder="Hash" value={hash} onChange={(e) => sethash(e.target.value)} />
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
      {/* <div className="px-20 h-full">
        <div className="mt-3">
          <Input title="Hash" value={hash} onChange={(e) => sethash(e.target.value)} />
        </div>
        <div className="mt-3">
          <Input title="String to check against" value={string} onChange={(e) => setstring(e.target.value)} />
        </div>
        <div className="flex gap-x-3 justify-end pt-3">
          <Button onClick={handleCheck}>
            <IoArrowForwardOutline />
            <span>Validate</span>
          </Button>
          <button className="flex  items-center gap-1 px-4 py-2 ml-4 rounded " onClick={handleClear}>
            <MdClear />
            Clear
          </button>
        </div>
      </div> */}
    </BaseLayout>
  );
};

export default UrlEncoderDecoder;
