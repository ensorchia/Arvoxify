import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var empty_player_default = "#visualizer{z-index:1;background-color:#000;position:absolute}";
var visualizer_default = createPlugin({
	name: () => t("plugins.visualizer.name"),
	description: () => t("plugins.visualizer.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		type: "butterchurn",
		butterchurn: {
			preset: "martin [shadow harlequins shape code] - fata morgana",
			renderingFrequencyInMs: 500,
			blendTimeInSeconds: 2.7
		},
		vudio: {
			effect: "lighting",
			accuracy: 128,
			lighting: {
				maxHeight: 160,
				maxSize: 12,
				lineWidth: 1,
				color: "#49f3f7",
				shadowBlur: 2,
				shadowColor: "rgba(244,244,244,.5)",
				fadeSide: true,
				prettify: false,
				horizontalAlign: "center",
				verticalAlign: "middle",
				dottify: true
			}
		},
		wave: { animations: [
			{
				type: "Cubes",
				config: {
					bottom: true,
					count: 30,
					cubeHeight: 5,
					fillColor: { gradient: ["#FAD961", "#F76B1C"] },
					lineColor: "rgba(0,0,0,0)",
					radius: 20
				}
			},
			{
				type: "Cubes",
				config: {
					top: true,
					count: 12,
					cubeHeight: 5,
					fillColor: { gradient: ["#FAD961", "#F76B1C"] },
					lineColor: "rgba(0,0,0,0)",
					radius: 10
				}
			},
			{
				type: "Circles",
				config: {
					lineColor: {
						gradient: [
							"#FAD961",
							"#FAD961",
							"#F76B1C"
						],
						rotate: 90
					},
					lineWidth: 4,
					diameter: 20,
					count: 10,
					frequencyBand: "base"
				}
			}
		] }
	},
	stylesheets: [empty_player_default],
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [{
			label: t("plugins.visualizer.menu.visualizer-type"),
			submenu: [
				"butterchurn",
				"vudio",
				"wave"
			].map((visualizerType) => ({
				label: visualizerType,
				type: "radio",
				checked: config.type === visualizerType,
				click() {
					setConfig({ type: visualizerType });
				}
			}))
		}];
	}
});
const pluginStub = {
	name: () => t("plugins.visualizer.name"),
	description: () => t("plugins.visualizer.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		type: "butterchurn",
		butterchurn: {
			preset: "martin [shadow harlequins shape code] - fata morgana",
			renderingFrequencyInMs: 500,
			blendTimeInSeconds: 2.7
		},
		vudio: {
			effect: "lighting",
			accuracy: 128,
			lighting: {
				maxHeight: 160,
				maxSize: 12,
				lineWidth: 1,
				color: "#49f3f7",
				shadowBlur: 2,
				shadowColor: "rgba(244,244,244,.5)",
				fadeSide: true,
				prettify: false,
				horizontalAlign: "center",
				verticalAlign: "middle",
				dottify: true
			}
		},
		wave: { animations: [
			{
				type: "Cubes",
				config: {
					bottom: true,
					count: 30,
					cubeHeight: 5,
					fillColor: { gradient: ["#FAD961", "#F76B1C"] },
					lineColor: "rgba(0,0,0,0)",
					radius: 20
				}
			},
			{
				type: "Cubes",
				config: {
					top: true,
					count: 12,
					cubeHeight: 5,
					fillColor: { gradient: ["#FAD961", "#F76B1C"] },
					lineColor: "rgba(0,0,0,0)",
					radius: 10
				}
			},
			{
				type: "Circles",
				config: {
					lineColor: {
						gradient: [
							"#FAD961",
							"#FAD961",
							"#F76B1C"
						],
						rotate: 90
					},
					lineWidth: 4,
					diameter: 20,
					count: 10,
					frequencyBand: "base"
				}
			}
		] }
	},
	stylesheets: [empty_player_default],
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [{
			label: t("plugins.visualizer.menu.visualizer-type"),
			submenu: [
				"butterchurn",
				"vudio",
				"wave"
			].map((visualizerType) => ({
				label: visualizerType,
				type: "radio",
				checked: config.type === visualizerType,
				click() {
					setConfig({ type: visualizerType });
				}
			}))
		}];
	}
};
export { visualizer_default as default, pluginStub };
