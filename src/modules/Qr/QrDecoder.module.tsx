"use client";

import Container from "@components/Container/Container";
import Dropzone from "@components/Dropzone/Dropzone";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { useCallback, useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import QrScanner from "qr-scanner"; // if installed via package and bundling with a module bundler like webpack or rollup
import ToolButtons from "@components/ToolButtons/ToolButtons";
import { Button } from "@components/ui/Button";
import { Dialog, DialogContent } from "@components/ui/Dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Camera } from "lucide-react";

const QrDecoder = () => {
  const [value, setvalue] = useState("second");
  const videoRef = useRef(null);
  const [qrReader, setqrReader] = useState<QrScanner>();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    if (acceptedFiles[0] == undefined) return;
    const res: QrScanner.ScanResult = await QrScanner.scanImage(acceptedFiles[0], {});
    setvalue(res.toString());
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  useEffect(() => {
    if (videoRef.current == null) return;
    const qrScanner = new QrScanner(
      videoRef.current,
      (result: any) => {
        console.log(result);
      },
      {}
    );
    setqrReader(qrScanner);
    return () => {
      qrScanner.destroy();
    };
  }, []);

  return (
    <>
      <ToolButtons
        first={
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="mr-1"
                size={"sm"}
                onClick={async () => {
                  if (qrReader == undefined) return;
                  await qrReader.start();
                }}
              >
                <Camera className="w-4 h-4" /> Camera
              </Button>
            </DialogTrigger>
            <DialogContent>
              <video ref={videoRef}></video>
            </DialogContent>
          </Dialog>
        }
      />
      <TwoEditorLayout>
        <Container>
          <Dropzone getInputProps={getInputProps} isDragActive={isDragActive} getRootProps={getRootProps} />
        </Container>
        <Container>
          <div className="flex items-center justify-center h-full">{value}</div>
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default QrDecoder;
