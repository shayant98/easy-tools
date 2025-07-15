"use client";

import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { Download } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { useCallback, useEffect, useState } from "react";

const QrCodeGenerator = () => {
  const searchParams = useSearchParams();
  const [input, setinput] = useState(searchParams?.get("val") ?? "");
  const [qrCode, setqrCode] = useState("");

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCode;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };

  const handleGenerateQrCode = useCallback(async (value: string) => {
    if (value === "") {
      setqrCode(await QRCode.toDataURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));
      return;
    }
    setqrCode(await QRCode.toDataURL(value));
  }, []);

  useEffect(() => {
    handleGenerateQrCode(input)
      .then(() => {
        console.log("QR Code Generated");
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      setqrCode("");
    };
  }, [handleGenerateQrCode, input]);

  return (
    <>
      <div className="mb-2 flex justify-end">
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download Image
        </Button>
      </div>
      <MultiEditorLayout>
        <Container>
          <Textarea className="h-full " value={input} onChange={(e) => setinput(e.target.value)} placeholder="Type your message here." />
        </Container>
        <Container>
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative h-32 w-32 md:h-80 md:w-80">{qrCode && <Image className="rounded" src={qrCode} alt="QRCode" fill sizes="1vw" />}</div>
          </div>
        </Container>
      </MultiEditorLayout>
    </>
  );
};

export default QrCodeGenerator;
