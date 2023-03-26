import { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import QRCode from "qrcode";
import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
import TwoEditorLayout from "../layout/TwoEditorLayout";
import { Button } from "@components/ui/Button";
import { Textarea } from "@components/ui/Textarea";
const QrCodeGenerator = () => {
  const [input, setinput] = useState("");
  const [qrCode, setqrCode] = useState("");
  const [selectedDataType, setselectedDataType] = useState("url");

  const handleGeneration = async () => {
    console.log(input);

    try {
      setqrCode(await QRCode.toDataURL(input));
    } catch (err) {
      console.error(err);
    }
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
    <BaseLayout showBackButton title="QR-Code Generator">
      <TwoEditorLayout>
        <div className="grow h-1/2 bg-gray-700 rounded">
          <Textarea className="h-full  " value={input} onChange={(e) => setinput(e.target.value)} placeholder="Type your message here." />
        </div>
        <div className="bg-gray-700  flex items-center h-1/2 justify-center py-5 flex-col gap-y-2 rounded">
          <div className="relative w-48 h-48">{qrCode && <Image className="rounded" src={qrCode} alt="QRCode" fill sizes="25vw" />}</div>
          <Button variant={"outline"}>Download Image</Button>
        </div>
      </TwoEditorLayout>
    </BaseLayout>
  );
};

export default QrCodeGenerator;
