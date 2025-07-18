import HeaderLayout from "@/layout/header-layout";
import Keys from "./_components/Keys";

/**
 * Renders the Key Generator page.
 */
const Page = () => {
  return (
    <HeaderLayout title="Key Generator" desc="" toolId={13}>
      <Keys />
    </HeaderLayout>
  );
};

export default Page;
