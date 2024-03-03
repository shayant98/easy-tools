import BaseLayout from "@layout/BaseLayout";
import TabbedLayout from "@layout/TabbedLayout";
import QrCodeGenerator from "./_components/generator-form";
import QrDecoder from "./_components/decoder-form";

const QrPage = () => {
  return (
    <BaseLayout toolId={3} title="QR Code Generator" desc="Generate QR Codes for your website, or decode QR Codes to get the data inside them.">
      <TabbedLayout
        defaultTab="qr-generator"
        options={[
          {
            value: "qr-generator",
            label: "QR Code Generator",
            child: <QrCodeGenerator />,
          },
          {
            value: "qr-decoder",
            label: "QR Code Decoder",
            child: <QrDecoder />,
          },
        ]}
      />
    </BaseLayout>
  );
};

export default QrPage;
