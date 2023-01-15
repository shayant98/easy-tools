import type { NextPage } from "next";
import Head from "next/head";
import { SiDocker, SiTypescript } from "react-icons/si";
import { AiOutlineFileMarkdown, AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Link from "next/link";
import BaseLayout from "../layout/BaseLayout";
import { MdClear, MdEnhancedEncryption } from "react-icons/md";
import Input from "../components/Input/Input";
import { useEffect, useMemo, useState } from "react";
import { IconType } from "react-icons";
import ToolCard from "../components/ToolCard";
import Button from "../components/Button/Button";
const Home: NextPage = () => {
  const menuItems = useMemo(
    () => [
      {
        title: "JSON To Typescript",
        subtitle: "Generate Typescript classes from JSON",
        icon: SiTypescript,
        link: "/json-to-ts",
      },
      {
        title: "QR Code Generator",
        subtitle: "Generate QR Codes",
        icon: AiOutlineQrcode,
        link: "/qrcode-generator",
      },
      {
        title: "URL Encoder/Decoder",
        subtitle: "Decode/Ecode URLs",
        icon: AiOutlineLink,
        link: "/url-encoder-decoder",
      },
      {
        title: "Readme Generator",
        subtitle: "Generate standardised readme&apos;s for your projects",
        icon: AiOutlineFileMarkdown,
        link: "/json-to-ts",
      },
      {
        title: "Docker Compose Generator",
        subtitle: "Generate docker compose files",
        icon: SiDocker,
        link: "/docker-compose",
      },
      {
        title: "Bcrypt generator",
        subtitle: "Generate BCrypt hashes",
        icon: MdEnhancedEncryption,
        link: "/bcrypt-generator",
      },
      {
        title: "Bcrypt validator",
        subtitle: "Validate generated BCrypt Hashes",
        icon: HiOutlineShieldCheck,
        link: "/bcrypt-validator",
      },
    ],
    []
  );
  const [search, setSearch] = useState("");
  const [fitleredItems, setfitleredItems] = useState<
    {
      title: string;
      subtitle: string;
      icon: IconType;
      link: string;
    }[]
  >(menuItems);

  useEffect(() => {
    if (search.trim().length > 0) {
      setfitleredItems((prev) => menuItems.filter((items) => items.title.toLowerCase().includes(search) || items.subtitle.toLowerCase().includes(search)));
    } else {
      setfitleredItems(menuItems);
    }

    return () => {
      setfitleredItems([]);
    };
  }, [menuItems, search]);
  const handleClear = () => {
    setSearch("");
  };
  return (
    <BaseLayout>
      <main className="mt-10">
        <div className="flex items-center justify-center w-full">
          <div className="w-full items-end flex gap-2">
            <div className="grow">
              <Input value={search} onChange={(e) => setSearch(e.target.value)} title="Search" />
            </div>
            <Button onClick={handleClear}>
              <MdClear />
              <span>Clear</span>
            </Button>
          </div>
        </div>
        <div className="mt-10 flex justify-center flex-wrap gap-10">
          {fitleredItems.map(({ icon: Icon, title, subtitle, link }) => (
            <ToolCard key={title} icon={Icon} title={title} subtitle={subtitle} link={link} />
          ))}
        </div>
      </main>
    </BaseLayout>
  );
};

export default Home;
