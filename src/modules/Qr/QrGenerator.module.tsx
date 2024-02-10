"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import Container from "@components/Container/Container";
import { Download } from "lucide-react";

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
    })()
      .then()
      .catch(() => {
        console.error("Error in generating QR code");
      });

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
    })()
      .then()
      .catch(() => {
        console.error("Error in generating QR code");
      });

    return () => {
      setqrCode("");
    };
  }, [input]);

  return (
    <>
      <div className="mb-2 flex justify-end">
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download Image
        </Button>
      </div>
      <TwoEditorLayout>
        <Container>
          <Textarea className="h-full  " value={input} onChange={(e) => setinput(e.target.value)} placeholder="Type your message here." />
        </Container>
        <Container>
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative h-32 w-32 md:h-80 md:w-80">{qrCode && <Image className="rounded" src={qrCode} alt="QRCode" fill sizes="1vw" />}</div>
          </div>
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default QrCodeGenerator;
