import { IconType } from "react-icons";
import { AiOutlineApi, AiOutlineFileMarkdown, AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { MdEnhancedEncryption } from "react-icons/md";
import { SiDocker, SiJavascript, SiJson, SiMysql, SiTailwindcss, SiTypescript } from "react-icons/si";
import { VscJson, VscSymbolString } from "react-icons/vsc";

export interface IMenuItem {
  title: string;
  subtitle: string;
  icon: IconType;
  link: string;
  tags: IToolTag[];
  description: string;
}

export const toolTags = ["TRANSFORMER", "GENERATOR", "ENCRYPTION", "CSS", "JSON", "TYPESCRIPT", "JAVASCRIPT", "MD", "DOCKER", "AI", "SQL", "TS", "TRPC", "DEVOPS"] as const;
export type IToolTag = (typeof toolTags)[number];

const menuItems: IMenuItem[] = [
  {
    title: "JSON To Typescript",
    subtitle: "Generate Typescript classes from JSON",
    icon: SiTypescript,
    link: "/json-to-ts",
    description: "Generate Typescript classes from JSON",
    tags: ["TRANSFORMER", "JSON", "TYPESCRIPT"],
  },
  {
    title: "Javascript To Typescript",
    subtitle: "Generate Typescript classes from Javascript Objects",
    icon: SiJavascript,
    link: "/js-to-ts",
    description: "Generate Typescript classes from Javascript Objects",
    tags: ["TRANSFORMER", "JAVASCRIPT", "TYPESCRIPT"],
  },
  {
    title: "Javascript To JSON",
    subtitle: "Generate JSON models from Javascript Objects",
    icon: SiJson,
    link: "/js-to-json",
    description: "Generate JSON models from Javascript Objects",
    tags: ["TRANSFORMER", "JAVASCRIPT", "JSON"],
  },
  {
    title: "QR Code Generator",
    subtitle: "Generate QR Codes",
    icon: AiOutlineQrcode,
    link: "/qrcode-generator",
    tags: ["GENERATOR"],
    description: "Generate QR Codes",
  },
  {
    title: "URL Encoder/Decoder",
    subtitle: "Decode/Ecode URLs",
    icon: AiOutlineLink,
    link: "/url-encoder-decoder",
    tags: ["TRANSFORMER"],
    description: "Decode/Ecode URLs",
  },
  {
    title: "Readme Generator",
    subtitle: "Generate standardised readme's for your projects",
    icon: AiOutlineFileMarkdown,
    link: "/readme-generator",
    tags: ["MD", "GENERATOR"],
    description: "Generate standardised readme's for your projects",
  },
  {
    title: "Docker Compose Generator",
    subtitle: "Generate docker compose files",
    icon: SiDocker,
    link: "/docker-compose",
    tags: ["DEVOPS", "DOCKER", "GENERATOR"],
    description: "Generate docker compose files",
  },
  {
    title: "Bcrypt",
    subtitle: "Generate or validate BCrypt hashes",
    icon: MdEnhancedEncryption,
    link: "/bcrypt-generator",
    tags: ["ENCRYPTION", "GENERATOR"],
    description: "Generate or validate BCrypt hashes",
  },
  {
    title: "CSS to Tailwind",
    subtitle: "Generate Tailwind classes based on CSS",
    icon: SiTailwindcss,
    link: "/css-to-tailwind",
    tags: ["CSS", "GENERATOR"],
    description: "Generate Tailwind classes based on CSS",
  },
  {
    title: "JSON to ZOD",
    subtitle: "generate ZOD validation based on JSON model",
    icon: VscJson,
    link: "/json-to-zod",
    tags: ["JSON", "TS", "TRPC", "TRANSFORMER"],
    description: "generate ZOD validation based on JSON model",
  },
  {
    title: "SQL Translator",
    subtitle: "use AI to translate natural language into a usable SQL query",
    icon: SiMysql,
    link: "/sql-translator",
    tags: ["AI", "SQL", "GENERATOR"],
    description: "use AI to translate natural language into a usable SQL query",
  },
  {
    title: "Base64",
    subtitle: "Convert files to base64 or base64 to files",
    icon: VscSymbolString,
    link: "/base64",
    tags: ["TRANSFORMER"],
    description: "Convert files to base64 or base64 to files",
  },
  {
    title: "ODATA Generator",
    subtitle: "GUI Based ODATA Generator",
    icon: AiOutlineApi,
    link: "/odata-generator",
    tags: ["GENERATOR"],
    description: "Generate ",
  },
];

export default menuItems;
