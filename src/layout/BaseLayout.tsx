"use client";

import { SignedIn } from "@clerk/nextjs";
import Feedback from "@components/Feedback/Feedback";
import { usePathname } from "next/navigation";

const BaseLayout = ({ children, title, desc }: BaseLayoutProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className=" pb-5">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
          {pathname?.trim() != "/" && (
            <div className=" items-center gap-4  hidden md:flex">
              <h1 className="scroll-m-20 text-slate-800 dark:text-slate-100 text-4xl font-extrabold tracking-tight lg:text-5xl"></h1>
              <SignedIn>
                <Feedback />
              </SignedIn>
            </div>
          )}
        </div>
        {desc && <p className="text-muted-foreground ">{desc}</p>}
      </div>
      {children}
    </>
  );
};

interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
  desc?: string;
}

export default BaseLayout;
