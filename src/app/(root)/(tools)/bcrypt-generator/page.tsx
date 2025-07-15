import HeaderLayout from "@/layout/header-layout";
import TabbedLayout from "@/layout/TabbedLayout";
import BcryptGenerator from "./_components/generator";
import BcryptValidator from "./_components/validator";

export const metadata = { title: "Tools | Bcrypt Generator", description: "Generate bcrypt hashes and validate them." };

const UrlEncoderDecoder = () => {
  return (
    <HeaderLayout toolId={8} title="Bcrypt Generator" desc="Generate or validate BCrypt hashes">
      <TabbedLayout
        defaultTab="bcrypt-generator"
        options={[
          { value: "bcrypt-generator", label: "Bcrypt Generator", child: <BcryptGenerator /> },
          { value: "bcrypt-validator", label: "Bcrypt Validator", child: <BcryptValidator /> },
        ]}
      />
    </HeaderLayout>
  );
};

export default UrlEncoderDecoder;
