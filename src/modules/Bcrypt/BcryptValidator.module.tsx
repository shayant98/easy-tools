"use client";

import Container from "@components/Container/Container";
import { Button } from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { useState } from "react";
import * as bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { ArrowRight, Eraser } from "lucide-react";

const BcryptValidator = () => {
  const [validateHash, setValidateHash] = useState("");
  const [string, setstring] = useState("");
  const [hash, setHash] = useState("");

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

  const handleClear = () => {
    setHash("");
    setstring("");
    setValidateHash("");
  };

  return (
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
          <Eraser className="w-4 h-4" />
          Clear
        </Button>
        <Button onClick={handleCheck}>
          <ArrowRight className="w-4 h-4" />
          <span>Validate</span>
        </Button>
      </div>
    </Container>
  );
};

export default BcryptValidator;
