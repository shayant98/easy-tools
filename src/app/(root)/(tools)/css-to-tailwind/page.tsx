import HeaderLayout from "@/layout/header-layout";
import { Form } from "./_components/form";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Tool | CSS to Tailwind", description: "Convert CSS to Tailwind" };

const TailwindConverters = () => {
  return (
    <HeaderLayout title="CSS to Tailwind" toolId={9}>
      <Form />
    </HeaderLayout>
  );
};

export default TailwindConverters;
