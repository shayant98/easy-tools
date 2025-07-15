"use client";;
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@components/ui/breadcrumb";
import { Button } from "@components/ui/button";
import { useSaveTool } from "hooks/use-tool-save-hook";
import { Heart } from "lucide-react";

import type { JSX } from "react";

const BaseLayout = ({ children, title, desc, toolId }: BaseLayoutProps) => {
  const { hasCurrentTool, saveTool, removeTool } = useSaveTool(toolId);

  return (
    <>
      <div className=" pb-5 h-full">
        <div className="flex gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
          {toolId != undefined ? (
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={(e) => {
                e.preventDefault();
                hasCurrentTool ? removeTool(toolId) : saveTool(toolId);
              }}
            >
              {hasCurrentTool ? <Heart className="text-red-500" /> : <Heart className="text-gray-500" />}
            </Button>
          ) : null}
        </div>

        {desc && <p className="text-muted-foreground mt-3 mb-5">{desc}</p>}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <hr className="border-muted mt-3" />
      </div>
      {children}
    </>
  );
};

interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
  desc?: string;
  toolId?: number;
}

export default BaseLayout;
