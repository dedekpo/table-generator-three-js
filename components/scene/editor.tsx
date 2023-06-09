import React from "react";
import * as Slider from "@radix-ui/react-slider";
import { ConfigProps } from "@/types";

export default function Editor({
	currentConfig,
	handleConfigChange,
	canvasRef,
}: {
	currentConfig: ConfigProps;
	handleConfigChange: (key: string, value: any) => void;
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) {
	function handleTextureUpload(e: any, changeKey: string) {
		if (!e.target.files[0]) {
			handleConfigChange(changeKey, undefined);
			return;
		}
		const fileReader = new FileReader();
		fileReader.readAsDataURL(e.target.files[0]);
		fileReader.onload = (e: any) => {
			handleConfigChange(changeKey, fileReader.result);
		};
	}

	function handleScreenshot() {
		if (!canvasRef.current) return;
		const link = document.createElement("a");
		link.setAttribute("download", `Table ${new Date().toISOString()}.png`);
		link.setAttribute(
			"href",
			canvasRef.current
				.toDataURL("image/png")
				.replace("image/png", "image/octet-stream")
		);
		link.click();
	}

	return (
		<div className="absolute right-3 top-3 w-[300px] bg-green-100 rounded-lg shadow-lg p-3 z-10">
			<h3 className="text-center font-bold">Table Editor</h3>
			<p>Table width</p>
			<SliderDemo
				valueKey="tableWidth"
				handleConfigChange={handleConfigChange}
				value={currentConfig.tableWidth}
				min={2}
				max={5}
				step={0.1}
			/>
			<p>Table depth</p>
			<SliderDemo
				valueKey="tableDepth"
				handleConfigChange={handleConfigChange}
				value={currentConfig.tableDepth}
				min={2}
				max={5}
				step={0.1}
			/>
			<p>Table height</p>
			<SliderDemo
				valueKey="tableHeight"
				handleConfigChange={handleConfigChange}
				value={currentConfig.tableHeight}
				min={0.05}
				max={0.2}
				step={0.01}
			/>
			<p>Leg width</p>
			<SliderDemo
				valueKey="legWidth"
				handleConfigChange={handleConfigChange}
				value={currentConfig.legWidth}
				min={0.1}
				max={0.2}
				step={0.01}
			/>
			<p>Leg height</p>
			<SliderDemo
				valueKey="legHeight"
				handleConfigChange={handleConfigChange}
				value={currentConfig.legHeight}
				min={0.5}
				max={1}
				step={0.01}
			/>
			<p>Rounded leg</p>
			<input
				type="checkbox"
				name="roundedLeg"
				id="roundedLeg"
				checked={currentConfig.roundedLeg}
				onChange={(e) =>
					handleConfigChange("roundedLeg", e.target.checked)
				}
			/>
			<p>Table color</p>
			<input
				type="color"
				name="tableColor"
				id="tableColor"
				value={currentConfig.tableColor}
				onChange={(e) =>
					handleConfigChange("tableColor", e.target.value)
				}
			/>
			<p>Leg color</p>
			<input
				type="color"
				name="legColor"
				id="legColor"
				value={currentConfig.legColor}
				onChange={(e) => handleConfigChange("legColor", e.target.value)}
			/>
			<p>Table texture</p>
			<input
				type="file"
				name="tableTexture"
				id="tableTexture"
				accept="image/*"
				onChange={(e) => handleTextureUpload(e, "tableTexture")}
			/>
			<p>Leg texture</p>
			<input
				type="file"
				name="legTexture"
				id="legTexture"
				accept="image/*"
				onChange={(e) => handleTextureUpload(e, "legTexture")}
			/>
			<button
				className="block mt-2 w-full border-2 py-2 rounded-md border-green-500 text-green-500 hover:bg-green-200"
				onClick={handleScreenshot}
			>
				Screenshot
			</button>
		</div>
	);
}

const SliderDemo = ({
	valueKey,
	handleConfigChange,
	value,
	min,
	max,
	step,
}: {
	valueKey: string;
	handleConfigChange: (key: string, value: any) => void;
	value: number;
	min: number;
	max: number;
	step: number;
}) => (
	<form>
		<Slider.Root
			className="relative flex items-center select-none touch-none w-[200px] h-[20px]"
			// defaultValue={[50]}
			value={[value]}
			min={min}
			max={max}
			step={step}
			onValueChange={(value) => {
				handleConfigChange(valueKey, value);
			}}
		>
			<Slider.Track className="relative bg-green-200 flex-1 rounded-full h-[3px]">
				<Slider.Range className="absolute bg-white rounded-full h-full" />
			</Slider.Track>
			<Slider.Thumb
				className="block w-[20px] h-[20px] bg-white rounded-md shadow-lg"
				aria-label="Volume"
			/>
		</Slider.Root>
	</form>
);
