import { AiOutlineFileMarkdown, AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { MdEnhancedEncryption } from "react-icons/md";
import { SiDocker, SiJavascript, SiMysql, SiTailwindcss, SiTypescript } from "react-icons/si";
import { VscJson } from "react-icons/vsc";

const menuItems = [
  {
    title: "JSON To Typescript",
    subtitle: "Generate Typescript classes from JSON",
    icon: SiTypescript,
    link: "/json-to-ts",
    tags: ["TRANSFORMER", "JSON", "TYPESCRIPT"],
  },
  {
    title: "Javascript To Typescript",
    subtitle: "Generate Typescript classes from Javascript Objects",
    icon: SiJavascript,
    link: "/js-to-ts",
    tags: ["TRANSFORMER", "JAVASCRIPT", "TYPESCRIPT"],
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
];

export default menuItems;
