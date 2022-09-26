import { useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import QRCode from "qrcode";
import Image from "next/image";
import { AiOutlineLink } from "react-icons/ai";
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

  const dataTypes = [
    { name: "url", icon: <AiOutlineLink /> },
    { name: "text", icon: <AiOutlineLink /> },
    { name: "phone", icon: <AiOutlineLink /> },
    { name: "contact", icon: <AiOutlineLink /> },
  ];
  return (
    <BaseLayout
      showBackButton
      title="QR-Code Generator"
      desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere deserunt quis assumenda beatae placeat dolores, voluptas consequatur sunt totam ut error cum veniam vel,
          impedit recusandae ducimus nihil? Voluptate, quidem? Incidunt quae autem velit esse placeat, in voluptatum nihil corporis nulla recusandae labore deserunt, hic earum.
          Dolorum rerum earum nobis blanditiis eveniet! Ipsam, dolorum obcaecati nulla vero autem corporis commodi? Mollitia fugiat saepe eius ut. Minus iste, accusamus corporis"
    >
      <div className=" px-20 h-full w-full">
        <div className="flex gap-x-2 mb-5 w-full">
          {dataTypes.map(({ name, icon }) => (
            <div
              key={name}
              className={` flex items-center gap-1 ${selectedDataType === name && "bg-gray-900"} px-4 py-2 rounded hover:shadow hover:scale-105 duration-200 cursor-pointer`}
              onClick={() => setselectedDataType(name)}
            >
              {icon} {name}
            </div>
          ))}
        </div>
        <input className="bg-gray-300 h-10 rounded px-2 py-4 mb-5 text-black" placeholder="Value" value={input} onChange={(e) => setinput(e.target.value)} />
        <button className="flex  items-center gap-1 px-4 py-2 bg-gray-900 rounded hover:shadow hover:scale-105 transition duration-200 " onClick={handleGeneration}>
          Generate
        </button>

        <div className="flex h-32 w-32  items-center justify-center relative">
          <div className="w-32 h-32">{qrCode && <Image src={qrCode} alt="QRCode" layout="fill" />}</div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default QrCodeGenerator;
