/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import Container from "@components/Container/Container";
import Dropzone from "@components/Dropzone/Dropzone";
import TwoEditorLayout from "@layout/TwoEditorLayout";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import QrScanner from "qr-scanner"; // if installed via package and bundling with a module bundler like webpack or rollup
import ToolButtons from "@components/ToolButtons/ToolButtons";
import Editor from "@components/Editor/Editor";
import QrCameraDialog from "./qr-camera-dialog";

const QrDecoder = () => {
  const [value, setvalue] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    if (acceptedFiles[0] == undefined) return;
    const res = await QrScanner.scanImage(acceptedFiles[0], {
      returnDetailedScanResult: true,
    });

    setvalue(res.data);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <>
      <ToolButtons first={<QrCameraDialog />} />
      <TwoEditorLayout>
        <Container>
          <Dropzone getInputProps={getInputProps} isDragActive={isDragActive} getRootProps={getRootProps} />
        </Container>
        <Container>
          <Editor value={value} setValue={(e) => setvalue(e.target.value)} disabled placeholder="Content will apear here" />
        </Container>
      </TwoEditorLayout>
    </>
  );
};

export default QrDecoder;
