import { ConfigProps } from "@/types";
import { useControls } from "leva";

export function useConstrolsConfig(
	tables: ConfigProps[],
	setTables: (arg0: ConfigProps[]) => void,
	selectedTableIndex: number | undefined
) {
	console.log("outside ? ", selectedTableIndex);

	function handleEditEnd(value: number) {
		console.log("inside ? ", selectedTableIndex);
		const newTables = tables.map((table, index) => {
			if (index === selectedTableIndex) {
				table.tableWidth = value;
				return table;
			}
			return table;
		});
		setTables(newTables);
	}

	const [config, setConfig] = useControls(() => ({
		tableWidth: {
			value: 2,
			min: 2,
			max: 5,
			step: 0.1,
			onEditEnd: (value) => {
				handleEditEnd(value);
			},
		},
		tableDepth: {
			value: 2,
			min: 2,
			max: 5,
			step: 0.1,
			// onEditEnd: (value) => {
			// 	setTables(
			// 		tables.map((table, index) => {
			// 			if (index === selectedTableIndex) {
			// 				table.tableDepth = value;
			// 			}
			// 			return table;
			// 		})
			// 	);
			// },
		},
		tableHeight: {
			value: 0.05,
			min: 0.05,
			max: 0.2,
			step: 0.01,
			// onEditEnd: (value) => {
			// 	setTables(
			// 		tables.map((table, index) => {
			// 			if (index === selectedTableIndex) {
			// 				table.tableHeight = value;
			// 			}
			// 			return table;
			// 		})
			// 	);
			// },
		},
		legWidth: {
			value: 0.1,
			min: 0.1,
			max: 0.2,
			step: 0.01,
			// onEditEnd: (value) => {
			// 	setTables(
			// 		tables.map((table, index) => {
			// 			if (index === selectedTableIndex) {
			// 				table.legWidth = value;
			// 			}
			// 			return table;
			// 		})
			// 	);
			// },
		},
		legHeight: {
			value: 0.5,
			min: 0.5,
			max: 1,
			step: 0.01,
			// onEditEnd: (value) => {
			// 	setTables(
			// 		tables.map((table, index) => {
			// 			if (index === selectedTableIndex) {
			// 				table.legHeight = value;
			// 			}
			// 			return table;
			// 		})
			// 	);
			// },
		},
		roundedLeg: {
			value: false,
			/**
			 * TO FIX - DOES NOT CHANGE THE ROUNDED LEG - LIBRARY BUG  MAYBE?
			 */
			// onEditEnd: () => {
			// 	setTables(
			// 		tables.map((table, index) => {
			// 			if (index === selectedTableIndex) {
			// 				table.roundedLeg = !table.roundedLeg;
			// 				console.log("Entrei ", table);
			// 			}
			// 			return table;
			// 		})
			// 	);
			// },
		},
		tableColor: {
			value: "#000000",
			// onEditEnd: (value) => {
			// 	setTables(
			// 		tables.map((table, index) => {
			// 			if (index === selectedTableIndex) {
			// 				table.tableColor = value;
			// 			}
			// 			return table;
			// 		})
			// 	);
			// },
		},
		legColor: {
			value: "#4e2929",
			// onEditEnd: (value) => {
			// 	setTables(
			// 		tables.map((table, index) => {
			// 			if (index === selectedTableIndex) {
			// 				table.legColor = value;
			// 			}
			// 			return table;
			// 		})
			// 	);
			// },
		},
	}));

	return [config, setConfig];
}
