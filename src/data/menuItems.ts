import { AiOutlineFileMarkdown, AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { MdEnhancedEncryption } from "react-icons/md";
import { SiDocker, SiJavascript, SiJson, SiMysql, SiTailwindcss, SiTypescript } from "react-icons/si";
import { VscJson, VscSymbolString } from "react-icons/vsc";

const menuItems = [
  {
    title: "JSON To Typescript",
    subtitle: "Generate Typescript classes from JSON",
    icon: SiTypescript,
    link: "/tools/json-to-ts",
    tags: ["TRANSFORMER", "JSON", "TYPESCRIPT"],
  },
  {
    title: "Javascript To Typescript",
    subtitle: "Generate Typescript classes from Javascript Objects",
    icon: SiJavascript,
    link: "/tools/js-to-ts",
    tags: ["TRANSFORMER", "JAVASCRIPT", "TYPESCRIPT"],
  },
  {
    title: "Javascript To JSON",
    subtitle: "Generate JSON models from Javascript Objects",
    icon: SiJson,
    link: "/tools/js-to-json",
    tags: ["TRANSFORMER", "JAVASCRIPT", "JSON"],
  },
  {
    title: "QR Code Generator",
    subtitle: "Generate QR Codes",
    icon: AiOutlineQrcode,
    link: "/tools/qrcode-generator",
    tags: ["GENERATOR"],
  },
  {
    title: "URL Encoder/Decoder",
    subtitle: "Decode/Ecode URLs",
    icon: AiOutlineLink,
    link: "/tools/url-encoder-decoder",
    tags: ["TRANSFORMER"],
  },
  {
    title: "Readme Generator",
    subtitle: "Generate standardised readme's for your projects",
    icon: AiOutlineFileMarkdown,
    link: "/tools/readme-generator",
    tags: ["MD", "GENERATOR"],
  },
  {
    title: "Docker Compose Generator",
    subtitle: "Generate docker compose files",
    icon: SiDocker,
    link: "/tools/docker-compose",
    tags: ["DEVOPS", "DOCKER", "GENERATOR"],
  },
  {
    title: "Bcrypt",
    subtitle: "Generate or validate BCrypt hashes",
    icon: MdEnhancedEncryption,
    link: "/tools/bcrypt-generator",
    tags: ["ENCRYPTION", "GENERATOR"],
  },
  {
    title: "CSS to Tailwind",
    subtitle: "Generate Tailwind classes based on CSS",
    icon: SiTailwindcss,
    link: "/tools/css-to-tailwind",
    tags: ["CSS", "GENERATOR"],
  },
  {
    title: "JSON to ZOD",
    subtitle: "generate ZOD validation based on JSON model",
    icon: VscJson,
    link: "/tools/json-to-zod",
    tags: ["JSON", "TS", "TRPC", "TRANSFORMER"],
  },
  {
    title: "SQL Translator",
    subtitle: "use AI to translate natural language into a usable SQL query",
    icon: SiMysql,
    link: "/tools/sql-translator",
    tags: ["AI", "SQL", "GENERATOR"],
  },
  {
    title: "Base64",
    subtitle: "Convert files to base64 or base64 to files",
    icon: VscSymbolString,
    link: "/tools/base64",
    tags: ["TRANSFORMER"],
  },
];

export default menuItems;
