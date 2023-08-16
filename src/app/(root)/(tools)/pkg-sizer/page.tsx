"use client";

import { Button } from "@components/ui/Button";
import Input from "@components/ui/Input";
import { WebContainer } from "@webcontainer/api";
import { on } from "events";
import { CogIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";

import "xterm/css/xterm.css";
const TerminalI = dynamic(() => import("@components/CommandLine/CommandLine"), { ssr: false });

const PkgSizer = () => {
  const wc = useRef<WebContainer | null>(null);
  const [output, setoutput] = useState("");
  const [commandInput, setcommandInput] = useState("");
  const xtermRef = useRef(null);
  const terminalRef = useRef<Terminal | null>(null);

  const reportOutput = (output: string) => {
    setoutput("");
    setoutput((prev) => prev + "\n" + output);
  };

  useEffect(() => {
    async function bootWebcontainer() {
      if (wc.current == null) {
        wc.current = await WebContainer.boot();
      }
    }
    bootWebcontainer();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, []);

  // const onsubmit = useCallback(async () => {
  //   console.log("Running command...");

  //   reportOutput("Running command...");
  //   const cmd = commandInput.split(" ")[0];
  //   const args = commandInput.split(" ").slice(1);
  //   if (cmd == null) return;
  //   runCommand(cmd, args);
  // }, [commandInput]);

  return (
    <div className="h-full">
      <div className="flex gap-2">
        {/* <Input value={commandInput} onChange={(e) => setcommandInput(e.target.value)} title="Command" className="flex-1" /> */}
        {/* <Button onClick={() => onsubmit()}>
          <CogIcon />
          Generate
        </Button> */}
        <div className="rounded p-2 border">
          <TerminalI xtermRef={xtermRef} terminalRef={terminalRef} containerRef={wc} />
        </div>
        {/* <Text color="green">{output} tests passed</Text> */}
      </div>

      {/* <pre className="h-full mt-3">
        <code className="w-full bg-gray-900 p-3 overflow-auto flex h-full">{output}</code>
      </pre> */}
    </div>
  );
};

export default PkgSizer;
