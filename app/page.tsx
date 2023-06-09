"use client";

import Experience from "@/components/scene/experience";
import Editor from "@/components/scene/editor";
import { useRef, useState } from "react";
import { ConfigProps } from "@/types";

export default function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [tables, setTables] = useState<ConfigProps[]>([]);
	const [selectedTableIndex, setSelectedTableIndex] = useState<
		number | undefined
	>(undefined);
	const [config, setConfig] = useState<ConfigProps>({
		tableWidth: 2,
		tableDepth: 2,
		tableHeight: 0.05,
		legWidth: 0.1,
		legHeight: 0.5,
		roundedLeg: false,
		tableColor: "#000000",
		legColor: "#4e2929",
		tableTexture: null,
		legTexture: null,
	});

	function handleCreateTable() {
		setTables([
			...tables,
			{
				tableWidth: 2,
				tableDepth: 2,
				tableHeight: 0.05,
				legWidth: 0.1,
				legHeight: 0.5,
				roundedLeg: false,
				tableColor: "#000000",
				legColor: "#4e2929",
				tableTexture: null,
				legTexture: null,
			},
		]);
	}

	function handleSelectTable(index: number) {
		setSelectedTableIndex(index);
		setConfig({
			tableWidth: tables[index].tableWidth,
			tableDepth: tables[index].tableDepth,
			tableHeight: tables[index].tableHeight,
			legWidth: tables[index].legWidth,
			legHeight: tables[index].legHeight,
			roundedLeg: tables[index].roundedLeg,
			tableColor: tables[index].tableColor,
			legColor: tables[index].legColor,
			tableTexture: tables[index].tableTexture,
			legTexture: tables[index].legTexture,
		});
	}
	function handleConfigChange(key: string, value: any) {
		setTables(
			tables.map((_, index) =>
				index === selectedTableIndex ? { ..._, [key]: value } : _
			)
		);
		setConfig({
			...config,
			[key]: value,
		});
	}

	function handleConfigDownload() {
		const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(tables)
		)}`;
		const link = document.createElement("a");
		link.href = jsonString;
		link.download = "data.json";

		link.click();
	}

	function handleConfigUpload(e: any) {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e: any) => {
			const parsedResult = JSON.parse(e.target.result);
			setTables(parsedResult);
			setSelectedTableIndex(undefined);
		};
	}

	return (
		<div className="relative w-screen h-screen">
			<div className="absolute bottom-3 left-3 flex gap-3 items-center z-10">
				<button
					className="border-2 p-2 rounded-md border-green-500 text-green-500 hover:bg-green-200"
					onClick={handleConfigDownload}
				>
					Export JSON
				</button>
				<input
					type="file"
					accept="application/json"
					onChange={handleConfigUpload}
				/>
			</div>
			<div className="flex items-center gap-3 absolute top-5 left-[20%] z-10">
				<button
					onClick={handleCreateTable}
					className="block border-2 p-2 rounded-md border-green-500 text-green-500 hover:bg-green-200"
				>
					Create new table
				</button>
				{tables.map((_, index) => (
					<button
						onClick={() => handleSelectTable(index)}
						key={index}
						className={`${
							selectedTableIndex === index && "bg-gray-200"
						} border-2 px-2 py-1 rounded-md`}
					>
						Table {index + 1}
					</button>
				))}
			</div>
			{tables.length > 0 && (
				<Editor
					currentConfig={tables[selectedTableIndex || 0]}
					handleConfigChange={handleConfigChange}
					canvasRef={canvasRef}
				/>
			)}
			<Experience
				visible={selectedTableIndex !== undefined}
				config={config}
				canvasRef={canvasRef}
			/>
		</div>
	);
}
