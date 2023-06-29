"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Button } from "@components/ui/Button";
import { Textarea } from "@components/ui/Textarea";
import Container from "@components/Container/Container";
import { AiOutlineDownload } from "react-icons/ai";
import { useTool } from "context/ToolContext";

const QrCodeGenerator = () => {
  const [input, setinput] = useState("");
  const [qrCode, setqrCode] = useState("");

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCode;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };

  useEffect(() => {
    (async () => {
      try {
        setqrCode(await QRCode.toDataURL("https://google.com"));
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      setqrCode("");
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (input == "") {
          setqrCode(await QRCode.toDataURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));
          return;
        }
        setqrCode(await QRCode.toDataURL(input));
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      setqrCode("");
    };
  }, [input]);

  return (
    <>
      <div className="mb-2 flex justify-end">
        <Button onClick={handleDownload}>
          <AiOutlineDownload /> Download Image
        </Button>
      </div>
      <TwoEditorLayout>
        <Container>
          <Textarea className="h-full  " value={input} onChange={(e) => setinput(e.target.value)} placeholder="Type your message here." />
        </Container>
        <Container>
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 md:w-80 md:h-80">{qrCode && <Image className="rounded" src={qrCode} alt="QRCode" fill sizes="1vw" />}</div>
          </div>
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default QrCodeGenerator;
