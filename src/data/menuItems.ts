import { type LucideIcon } from "lucide-react";
import { type IconType } from "react-icons";
import { AiOutlineApi, AiOutlineFileMarkdown, AiOutlineLink, AiOutlineQrcode, AiOutlineTags } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { MdEnhancedEncryption } from "react-icons/md";
import { SiDart, SiDocker, SiJavascript, SiJson, SiTailwindcss, SiTypescript } from "react-icons/si";
import { VscJson, VscSymbolString } from "react-icons/vsc";

export interface IMenuItem {
  id: number;
  title: string;
  subtitle: string;
  icon: IconType | LucideIcon;
  link: string;
  tags: IToolTag[];
  description: string;
}

export const toolTags = [
  "TRANSFORMER",
  "GENERATOR",
  "ENCRYPTION",
  "CSS",
  "JSON",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "MD",
  "DOCKER",
  "AI",
  "SQL",
  "TS",
  "TRPC",
  "DEVOPS",
  "DART",
  "FLUTTER",
] as const;
export type IToolTag = (typeof toolTags)[number];

const menuItems: IMenuItem[] = [
  {
    id: 0,
    title: "JSON To Typescript",
    subtitle: "Generate Typescript classes from JSON",
    icon: SiTypescript,
    link: "/json-to-ts",
    description: "Generate Typescript classes from JSON",
    tags: ["TRANSFORMER", "JSON", "TYPESCRIPT"],
  },
  {
    id: 1,
    title: "Javascript To Typescript",
    subtitle: "Generate Typescript classes from Javascript Objects",
    icon: SiJavascript,
    link: "/js-to-ts",
    description: "Generate Typescript classes from Javascript Objects",
    tags: ["TRANSFORMER", "JAVASCRIPT", "TYPESCRIPT"],
  },
  {
    id: 2,
    title: "Javascript To JSON",
    subtitle: "Generate JSON models from Javascript Objects",
    icon: SiJson,
    link: "/js-to-json",
    description: "Generate JSON models from Javascript Objects",
    tags: ["TRANSFORMER", "JAVASCRIPT", "JSON"],
  },
  {
    id: 3,
    title: "QR Code Generator",
    subtitle: "Generate QR Codes",
    icon: AiOutlineQrcode,
    link: "/qrcode-generator",
    tags: ["GENERATOR"],
    description: "Generate QR Codes",
  },
  {
    id: 4,
    title: "JSON To Dart",
    subtitle: "Generate Dart classes from JSON",
    icon: SiDart,
    link: "/json-to-dart",
    description: "Generate Dart classes from JSON",
    tags: ["TRANSFORMER", "JSON", "FLUTTER"],
  },
  {
    id: 5,
    title: "URL Encoder/Decoder",
    subtitle: "Decode/Ecode URLs",
    icon: AiOutlineLink,
    link: "/url-encoder-decoder",
    tags: ["TRANSFORMER"],
    description: "Decode/Ecode URLs",
  },
  {
    id: 6,
    title: "Readme Generator",
    subtitle: "Generate standardised readme's for your projects",
    icon: AiOutlineFileMarkdown,
    link: "/readme-generator",
    tags: ["MD", "GENERATOR"],
    description: "Generate standardised readme's for your projects",
  },
  {
    id: 7,
    title: "Docker Compose Generator",
    subtitle: "Generate docker compose files",
    icon: SiDocker,
    link: "/docker-compose",
    tags: ["DEVOPS", "DOCKER", "GENERATOR"],
    description: "Generate docker compose files",
  },
  {
    id: 8,
    title: "Bcrypt",
    subtitle: "Generate or validate BCrypt hashes",
    icon: MdEnhancedEncryption,
    link: "/bcrypt-generator",
    tags: ["ENCRYPTION", "GENERATOR"],
    description: "Generate or validate BCrypt hashes",
  },
  {
    id: 9,
    title: "CSS to Tailwind",
    subtitle: "Generate Tailwind classes based on CSS",
    icon: SiTailwindcss,
    link: "/css-to-tailwind",
    tags: ["CSS", "GENERATOR"],
    description: "Generate Tailwind classes based on CSS",
  },
  {
    id: 10,
    title: "JSON to ZOD",
    subtitle: "generate ZOD validation based on JSON model",
    icon: VscJson,
    link: "/json-to-zod",
    tags: ["JSON", "TS", "TRPC", "TRANSFORMER"],
    description: "generate ZOD validation based on JSON model",
  },
  // {
  //   title: "SQL Translator",
  //   subtitle: "use AI to translate natural language into a usable SQL query",
  //   icon: SiMysql,
  //   link: "/sql-translator",
  //   tags: ["AI", "SQL", "GENERATOR"],
  //   description: "use AI to translate natural language into a usable SQL query",
  // },
  {
    id: 11,
    title: "Base64",
    subtitle: "Convert files to base64 or base64 to files",
    icon: VscSymbolString,
    link: "/base64",
    tags: ["TRANSFORMER"],
    description: "Convert files to base64 or base64 to files",
  },
  {
    id: 12,
    title: "ODATA Generator",
    subtitle: "GUI Based ODATA Generator",
    icon: AiOutlineApi,
    link: "/odata-generator",
    tags: ["GENERATOR"],
    description: "Generate ",
  },
  {
    id: 13,
    title: "Key Generator",
    subtitle: "Generate random keys",
    icon: BiLockAlt,
    link: "/keygen",
    tags: ["GENERATOR"],
    description: "Generate",
  },
  {
    id: 14,
    title: "Architectural Designer",
    subtitle: "Create top-level architecture diagrams",
    icon: BiLockAlt,
    link: "/arch-designer",
    tags: ["DEVOPS"],
    description: "Create top-level architecture diagrams",
  },
  {
    id: 15,
    title: "Open Graph Generator",
    subtitle: "A tool to generate Open Graph images for your website.",
    icon: AiOutlineTags,
    link: "/open-graph-generator",
    tags: ["GENERATOR"],
    description: " A tool to generate Open Graph images for your website.",
  },
];

export default menuItems;
