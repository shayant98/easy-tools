import type { NextPage } from "next";
import Head from "next/head";
import { SiDocker, SiTypescript } from "react-icons/si";
import { AiOutlineFileMarkdown, AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import Link from "next/link";
import BaseLayout from "../layout/BaseLayout";
import { MdEnhancedEncryption } from "react-icons/md";
const Home: NextPage = () => {
  return (
    <BaseLayout>
      <main className="mt-10">
        <div className="flex items-center justify-center w-full">{/* <input className="bg-gray-300 h-10 w-1/2 rounded px-2 py-4" placeholder="Search" /> */}</div>
        <div className="mt-10 flex justify-center flex-wrap gap-10">
          <Link href="/json-to-ts">
            <div className="flex flex-col items-center rounded bg-gray-900   p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
              <SiTypescript className="text-7xl" />
              <h3 className="text-2xl mt-5">JSON To Typescript</h3>
              <span className="text-sm">Generate Typescript classes from JSON</span>
            </div>
          </Link>
          <Link href="/qrcode-generator">
            <div className="flex flex-col items-center rounded bg-gray-900   p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
              <AiOutlineQrcode className="text-7xl" />
              <h3 className="text-2xl mt-5">QR Code Generator</h3>
              <span className="text-sm">Generate QR Codes</span>
            </div>
          </Link>
          <Link href="/url-encoder-decoder">
            <div className="flex flex-col items-center rounded bg-gray-900   p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
              <AiOutlineLink className="text-7xl" />
              <h3 className="text-2xl mt-5">URL Encoder/Decoder</h3>
              <span className="text-sm">Decode/Ecode URLs</span>
            </div>
          </Link>
          <Link href="/readme-generator">
            <div className="flex flex-col items-center rounded bg-gray-900   p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
              <AiOutlineFileMarkdown className="text-7xl" />
              <h3 className="text-2xl mt-5">Readme Generator</h3>
              <span className="text-sm">Generate standardised readme&apos;s for your projects</span>
            </div>
          </Link>
          <Link href="/docker-compose">
            <div className="flex flex-col items-center rounded bg-gray-900   p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
              <SiDocker className="text-7xl" />
              <h3 className="text-2xl mt-5">Docker Compose Generator</h3>
              <span className="text-sm">Generate docker compose files</span>
            </div>
          </Link>
          <Link href="/bcrypt-generator">
            <div className="flex flex-col items-center rounded bg-gray-900   p-5 w-72 text-center hover:scale-105 transition duration-200 cursor-pointer">
              <MdEnhancedEncryption className="text-7xl" />
              <h3 className="text-2xl mt-5">Bcrypt generator</h3>
              <span className="text-sm">Generate Bcrypt hashes</span>
            </div>
          </Link>
        </div>
      </main>
    </BaseLayout>
  );
};

export default Home;
