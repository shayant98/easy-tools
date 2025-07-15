"use client";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Paintbrush } from "lucide-react";
import { useMemo } from "react";

const solids = [
	"#E2E2E2",
	"#ff75c3",
	"#ffa647",
	"#ffe83f",
	"#9fff5b",
	"#70e2ff",
	"#cd93ff",
	"#09203f",
];

const gradients = [
	"linear-gradient(to top left,#accbee,#e7f0fd)",
	"linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
	"linear-gradient(to top left,#000000,#434343)",
	"linear-gradient(to top left,#09203f,#537895)",
	"linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
	"linear-gradient(to top left,#f953c6,#b91d73)",
	"linear-gradient(to top left,#ee0979,#ff6a00)",
	"linear-gradient(to top left,#F00000,#DC281E)",
	"linear-gradient(to top left,#00c6ff,#0072ff)",
	"linear-gradient(to top left,#4facfe,#00f2fe)",
	"linear-gradient(to top left,#0ba360,#3cba92)",
	"linear-gradient(to top left,#FDFC47,#24FE41)",
	"linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
	"linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
	"linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
	"linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
];

const ColorPicker = ({
	background,
	setBackground,
	className,
}: {
	background: string;
	setBackground: (background: string) => void;
	className?: string;
}) => {
	const defaultTab = useMemo(() => {
		if (background.includes("url")) return "image";
		if (background.includes("gradient")) return "gradient";
		return "solid";
	}, [background]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="max-w-64 flex-wrap gap-2" variant={"outline"}>
					<div
						className="h-4 w-4 rounded"
						style={{
							background: background,
						}}
					/>
					<Paintbrush className="h-4 w-4" />
					<div className="flex-1 truncate">
						{background ? background : "Pick a color"}
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Tabs defaultValue={defaultTab} className="w-full">
					<TabsList className="mb-5">
						<TabsTrigger className="flex-1" value="solid">
							Solid
						</TabsTrigger>
						<TabsTrigger className="flex-1" value="gradient">
							Gradiant
						</TabsTrigger>
					</TabsList>
					<TabsContent value="solid" className="mt-0 flex flex-wrap gap-1">
						{solids.map((s) => (
							<div
								key={s}
								style={{ background: s }}
								className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
								onClick={() => setBackground(s)}
								onKeyDown={(e) => e.key === "Enter" && setBackground(s)}
								role="button"
								tabIndex={0}
							/>
						))}
					</TabsContent>
					<TabsContent value="gradient" className="mt-0">
						<div className="mb-2 flex flex-wrap gap-1">
							{gradients.map((s) => (
								<div
									key={s}
									style={{ background: s }}
									className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
									onClick={() => setBackground(s)}
									onKeyDown={(e) => e.key === "Enter" && setBackground(s)}
									role="button"
									tabIndex={0}
								/>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	);
};

export default ColorPicker;
