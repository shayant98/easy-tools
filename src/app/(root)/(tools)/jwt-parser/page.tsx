"use client";

import Container from "@/components/Container/Container";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeaderLayout from "@/layout/header-layout";
import MultiEditorLayout from "@/layout/multi-editor-layout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const Page = () => {
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [error, seterror] = useState("");
  const [values, setValues] = useState<{ header: { alg: string; typ: string }; payload: Map<string, unknown> }>();

  useEffect(() => {
    if (!token) return;

    const [header, payload, signature] = token.split(".");

    if (!header || !payload || !signature) {
      seterror("Invalid JWT token");
      return;
    }

    try {
      const parsedHeader = JSON.parse(atob(header)) as { alg: string; typ: string };
      const parsedPayload = JSON.parse(atob(payload)) as Map<string, unknown>;
      setValues({ header: parsedHeader, payload: parsedPayload });

      // Convert secreto to base64
    } catch (error) {
      console.log(error);

      seterror("Invalid JWT token");
      return;
    }

    return () => {
      setValues({ header: { alg: "", typ: "" }, payload: new Map() });
    };
  }, [token]);

  return (
    <HeaderLayout title="JWT Parser" desc="JWT Parser">
      <MultiEditorLayout>
        <Container errorMessage={error}>
          <Textarea className="h-full" placeholder="Paste your JWT token here" value={token} onChange={(e) => setToken(e.target.value)} />
          <div className="mt-4 space-y-2">
            <Label>Secret</Label>
            <Input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
          </div>
        </Container>
        <>
          <Container className="mb-5">
            <h4 className="mb-5 font-bold text-lg">Header</h4>
            <ul className=" rounded-lg bg-secondary text-secondary-foreground">
              <li className="flex justify-between px-4 py-2">
                <span className="font-medium">Algorithm:</span> {values?.header?.alg}
              </li>
              <li className="flex justify-between px-4 py-2">
                <span className="font-medium">Type:</span> {values?.header?.typ}
              </li>
            </ul>
          </Container>
          <Container>
            <h4 className="mb-5 font-bold text-lg">Payload</h4>
            <ul className=" rounded-lg bg-secondary text-secondary-foreground">
              {values &&
                Object.entries(values.payload).map(([key, value]) => {
                  if (key === "exp" || key === "iat") {
                    value = new Date((value as number) * 1000).toLocaleString();
                  }
                  return (
                    <li key={key} className="flex justify-between px-4 py-2">
                      <span className="font-medium">
                        {key}:
                        {key === "iat" && (
                          <Badge variant={"outline"} className="ml-2">
                            Issued at
                          </Badge>
                        )}
                      </span>{" "}
                      {value}
                    </li>
                  );
                })}
            </ul>
          </Container>
        </>
      </MultiEditorLayout>
    </HeaderLayout>
  );
};

export default Page;
