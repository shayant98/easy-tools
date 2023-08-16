import { WebContainer } from "@webcontainer/api";
import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const CommandLine = ({
  xtermRef,
  terminalRef,
  containerRef,
}: {
  xtermRef: MutableRefObject<HTMLDivElement | null>;
  terminalRef: MutableRefObject<Terminal | null>;
  containerRef: MutableRefObject<WebContainer | null>;
}) => {
  const [commandInput, setcommandInput] = useState("");
  useEffect(() => {
    if (xtermRef.current == null) return;

    terminalRef.current = new Terminal({
      convertEol: true,
    });

    terminalRef.current.open(xtermRef.current);
    terminalRef.current.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");

    return () => {
      terminalRef.current?.dispose();
    };
  }, [terminalRef, xtermRef]);

  const runCommand = useCallback(
    async (cmd: string, args: string[]) => {
      const process = await containerRef.current?.spawn(cmd, args);

      process?.output.pipeTo(
        new WritableStream({
          write: (chunk) => {
            console.log(chunk);

            terminalRef.current?.write(chunk);
          },
        })
      );
    },
    [containerRef, terminalRef]
  );

  useEffect(() => {
    terminalRef.current?.onKey((e) => {
      if (e.domEvent.key === "Enter") {
        terminalRef.current?.write("\r\n");
        runCommand("ls", []);
      } else if (e.domEvent.key === "Backspace") {
        terminalRef.current?.write("\b \b");
      } else {
        terminalRef.current?.write(e.key);
      }
    });

    return () => {
      return;
    };
  }, [runCommand, terminalRef]);

  return <div ref={xtermRef}></div>;
};

export default CommandLine;
