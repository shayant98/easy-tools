"use client";
import BaseComponent from "@/app/_components/base-component";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useSaveTool } from "@/hooks/use-tool-save-hook";
import { Heart } from "lucide-react";

import type { JSX } from "react";

const BaseLayout = ({ children, title, desc, toolId }: BaseLayoutProps) => {
	const { hasCurrentTool, saveTool, removeTool } = useSaveTool(toolId);

	return (
		<>
			<div className=" h-full pb-5">
				<div className="flex gap-3">
					<h2 className="font-bold text-3xl text-foreground tracking-tight">
						{title}
					</h2>
					{toolId !== undefined ? (
						<Button
							size={"icon"}
							variant={"ghost"}
							onClick={(e) => {
								e.preventDefault();
								hasCurrentTool ? removeTool(toolId) : saveTool(toolId);
							}}
						>
							{hasCurrentTool ? (
								<Heart className="text-red-500" />
							) : (
								<Heart className="text-gray-500" />
							)}
						</Button>
					) : null}
				</div>

				{desc && <p className="mt-3 mb-5 text-muted-foreground">{desc}</p>}
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
				<hr className="mt-3 border-muted" />
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
