import TabbedLayout from "@layout/TabbedLayout";
import { BcryptGenerator, BcryptValidator } from "modules/Bcrypt";

export const metadata = {
  title: "Tools | Bcrypt Generator",
  description: "Generate bcrypt hashes and validate them.",
};

const UrlEncoderDecoder = () => {
  return (
    <TabbedLayout
      defaultTab="generate"
      options={[
        {
          value: "generate",
          label: "Generate",
          child: <BcryptGenerator />,
        },
        {
          value: "validate",
          label: "Validate",
          child: <BcryptValidator />,
        },
      ]}
    />
  );
};

export default UrlEncoderDecoder;
