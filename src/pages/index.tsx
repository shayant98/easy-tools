import type { NextPage } from "next";
import Head from "next/head";
import { SiDocker, SiMysql, SiTailwindcss, SiTypescript } from "react-icons/si";
import { AiOutlineFileMarkdown, AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { TbApi } from "react-icons/tb";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Link from "next/link";
import BaseLayout from "../layout/BaseLayout";
import { MdClear, MdEnhancedEncryption } from "react-icons/md";
import Input from "../components/Input/Input";
import { useEffect, useMemo, useState } from "react";
import { IconType } from "react-icons";
import ToolCard from "../components/ToolCard";
import Button from "../components/Button/Button";
import { VscJson } from "react-icons/vsc";
const Home: NextPage = () => {
  const menuItems = useMemo(
    () => [
      {
        title: "JSON To Typescript",
        subtitle: "Generate Typescript classes from JSON",
        icon: SiTypescript,
        link: "/json-to-ts",
        tags: ["TRANSFORMER", "JSON", "TYPESCRIPT"],
      },
      {
        title: "QR Code Generator",
        subtitle: "Generate QR Codes",
        icon: AiOutlineQrcode,
        link: "/qrcode-generator",
        tags: ["GENERATOR"],
      },
      {
        title: "URL Encoder/Decoder",
        subtitle: "Decode/Ecode URLs",
        icon: AiOutlineLink,
        link: "/url-encoder-decoder",
        tags: ["TRANSFORMER"],
      },
      {
        title: "Readme Generator",
        subtitle: "Generate standardised readme's for your projects",
        icon: AiOutlineFileMarkdown,
        link: "/readme-generator",
        tags: ["MD", "GENERATOR"],
      },
      {
        title: "Docker Compose Generator",
        subtitle: "Generate docker compose files",
        icon: SiDocker,
        link: "/docker-compose",
        tags: ["DEVOPS", "DOCKER", "GENERATOR"],
      },
      {
        title: "Bcrypt generator",
        subtitle: "Generate BCrypt hashes",
        icon: MdEnhancedEncryption,
        link: "/bcrypt-generator",
        tags: ["ENCRYPTION", "GENERATOR"],
      },
      {
        title: "Bcrypt validator",
        subtitle: "Validate generated BCrypt Hashes",
        icon: HiOutlineShieldCheck,
        link: "/bcrypt-validator",
        tags: ["ENCRYPTION"],
      },

      {
        title: "CSS to Tailwind",
        subtitle: "Generate Tailwind classes based on CSS",
        icon: SiTailwindcss,
        link: "/css-to-tailwind",
        tags: ["CSS", "GENERATOR"],
      },
      {
        title: "JSON to ZOD",
        subtitle: "generate ZOD validation based on JSON model",
        icon: VscJson,
        link: "/json-to-zod",
        tags: ["JSON", "TS", "TRPC", "TRANSFORMER"],
      },
      {
        title: "SQL Translator",
        subtitle: "use AI to translate natural language into a usable SQL query",
        icon: SiMysql,
        link: "/sql-translator",
        tags: ["AI", "SQL", "GENERATOR"],
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
      tags?: string[];
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
          <div className="w-full max-w-lg items-end flex gap-2">
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
          {fitleredItems.map(({ icon: Icon, title, subtitle, link, tags }) => (
            <ToolCard key={title} icon={Icon} title={title} subtitle={subtitle} link={link} tags={tags} />
          ))}
        </div>
      </main>
    </BaseLayout>
  );
};

export default Home;
