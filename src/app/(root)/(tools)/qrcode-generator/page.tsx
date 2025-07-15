import HeaderLayout from "@/layout/header-layout";
import TabbedLayout from "@/layout/TabbedLayout";
import QrDecoder from "./_components/decoder-form";
import QrCodeGenerator from "./_components/generator-form";

const QrPage = () => {
  return (
    <HeaderLayout toolId={3} title="QR Code Generator" desc="Generate QR Codes for your website, or decode QR Codes to get the data inside them.">
      <TabbedLayout
        defaultTab="qr-generator"
        options={[
          { value: "qr-generator", label: "QR Code Generator", child: <QrCodeGenerator /> },
          { value: "qr-decoder", label: "QR Code Decoder", child: <QrDecoder /> },
        ]}
      />
    </HeaderLayout>
  );
};

export default QrPage;
