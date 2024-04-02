import { CheckCircleIcon, type LucideIcon, Search, Database, Globe, Webhook, Cable, Smartphone, HardDrive, BrickWall, Merge } from "lucide-react";
import { type IconType } from "react-icons";
import { SiApache, SiApachekafka, SiAzurefunctions, SiMicrosoftsqlserver, SiMysql, SiNginx, SiPostgresql, SiRabbitmq, SiSupabase, SiVercel } from "react-icons/si";
import { TbBrandFirebase } from "react-icons/tb";

const services = [
  {
    id: 1,
    name: "Website",
    icon: Globe,
    tags: ["client"],
  },
  {
    id: 2,
    name: "Database",
    icon: Database,
    tags: ["database"],
  },
  {
    id: 3,
    name: "Webhook",
    icon: Webhook,
    tags: ["serverless"],
  },
  {
    id: 4,

    name: "Mobile App",
    icon: Smartphone,
    tags: ["client"],
  },
  {
    id: 5,
    name: "API",
    icon: Cable,
    tags: ["communication"],
  },
  {
    id: 6,
    name: "Storage",
    icon: HardDrive,
    tags: ["storage"],
  },
  {
    id: 7,
    name: "Gateway",
    icon: Merge,
    tags: ["networking"],
  },
  {
    id: 8,
    name: "Firewall",
    icon: BrickWall,
    tags: ["networking"],
  },
  {
    id: 9,
    name: "Firebase",
    icon: TbBrandFirebase,
    tags: ["BaaS"],
  },
  {
    id: 10,
    name: "Azure - Functions",
    icon: SiAzurefunctions,
    tags: ["serverless"],
  },
  { id: 11, name: "Microsoft SQL", icon: SiMicrosoftsqlserver, tags: ["database"] },
  { id: 12, name: "MySQL", icon: SiMysql, tags: ["database"] },
  { id: 13, name: "PostgreSQL", icon: SiPostgresql, tags: ["database"] },
  { id: 14, name: "Vercel", icon: SiVercel, tags: ["platform"] },
  { id: 15, name: "Supabase", icon: SiSupabase, tags: ["BaaS"] },
  { id: 16, name: "Nginx", icon: SiNginx, tags: ["networking"] },
  { id: 17, name: "Apache", icon: SiApache, tags: ["networking"] },
  { id: 18, name: "Apache - kafka", icon: SiApachekafka, tags: ["message queue"] },
  { id: 19, name: "RabbitMQ", icon: SiRabbitmq, tags: ["message queue"] },
];

type archService = (typeof services)[number];

export { type archService, services };
