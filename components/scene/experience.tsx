"use client";

import { Canvas, useFrame } from "@react-three/fiber";

import {
	Grid,
	Center,
	GizmoHelper,
	GizmoViewport,
	OrbitControls,
	Environment,
	Box,
	RoundedBox,
	useTexture,
} from "@react-three/drei";
import { ConfigProps } from "@/types";
import { useRef } from "react";

export default function Experience({
	visible,
	config,
	canvasRef,
}: {
	visible: boolean;
	config: ConfigProps;
	canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) {
	return (
		<Canvas
			ref={canvasRef}
			shadows
			camera={{ position: [3, 1, 3], fov: 45 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<ambientLight />
			<group visible={visible} position={[0, -0.5, 0]}>
				<Table config={config} />
				<Grid position={[0, -0.01, 0]} args={[10.5, 10.5]} />
			</group>
			<OrbitControls makeDefault />
			<Environment preset="city" />
			<GizmoHelper alignment="bottom-right" margin={[80, 80]}>
				<GizmoViewport
					axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
					labelColor="white"
				/>
			</GizmoHelper>
		</Canvas>
	);
}

function Table({ config }: { config: ConfigProps }) {
	const meshRef = useRef<any>(null!);
	let texture = useTexture(config.tableTexture || "/wood-texture.jpg");

	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.material.map = texture;
			meshRef.current.material.needsUpdate = true;
		}
	});

	return (
		<Center top>
			<mesh ref={meshRef} castShadow position={[0, config.legHeight, 0]}>
				<boxGeometry
					args={[
						config.tableWidth,
						config.tableHeight,
						config.tableDepth,
					]}
				/>
				<meshStandardMaterial color={config.tableColor} map={texture} />
			</mesh>
			<TableLeg
				x={config.tableWidth / 2 - 0.2}
				y={config.legHeight / 2}
				z={config.tableDepth / 2 - 0.2}
				config={config}
			/>
			<TableLeg
				x={-(config.tableWidth / 2 - 0.2)}
				y={config.legHeight / 2}
				z={config.tableDepth / 2 - 0.2}
				config={config}
			/>
			<TableLeg
				x={config.tableWidth / 2 - 0.2}
				y={config.legHeight / 2}
				z={-(config.tableDepth / 2 - 0.2)}
				config={config}
			/>
			<TableLeg
				x={-(config.tableWidth / 2 - 0.2)}
				y={config.legHeight / 2}
				z={-(config.tableDepth / 2 - 0.2)}
				config={config}
			/>
		</Center>
	);
}

function TableLeg({
	x,
	y,
	z,
	config,
}: {
	x: number;
	y: number;
	z: number;
	config: ConfigProps;
}) {
	const meshRef = useRef<any>(null!);
	let texture = useTexture(config.legTexture || "/wood-texture.jpg");

	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.material.map = texture;
			meshRef.current.material.needsUpdate = true;
		}
	});

	return (
		<>
			{config.roundedLeg ? (
				<RoundedBox
					ref={meshRef}
					args={[config.legWidth, config.legHeight, config.legWidth]}
					position={[x, y, z]}
				>
					<meshStandardMaterial
						color={config.legColor}
						map={texture}
					/>
				</RoundedBox>
			) : (
				<Box
					ref={meshRef}
					args={[config.legWidth, config.legHeight, config.legWidth]}
					position={[x, y, z]}
				>
					<meshStandardMaterial
						color={config.legColor}
						map={texture}
					/>
				</Box>
			)}
		</>
	);
}
