import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export const GET = ({ params: { val } }: { params: { val: string } }) => {
  redirect(`/qrcode-generator?val=${val}`);
};
