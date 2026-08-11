import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
const defaultPresets = ["bass-booster"];
var equalizer_default = createPlugin({
	name: () => t("plugins.equalizer.name"),
	description: () => t("plugins.equalizer.description"),
	restartNeeded: false,
	addedVersion: "3.7.X",
	config: {
		enabled: false,
		filters: [],
		presets: { "bass-booster": false }
	},
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [{
			label: t("plugins.equalizer.menu.presets.label"),
			type: "submenu",
			submenu: defaultPresets.map((preset) => ({
				label: t(`plugins.equalizer.menu.presets.list.${preset}`),
				type: "radio",
				checked: config.presets[preset],
				click() {
					setConfig({ presets: {
						...config.presets,
						[preset]: !config.presets[preset]
					} });
				}
			}))
		}];
	}
});
const pluginStub = {
	name: () => t("plugins.equalizer.name"),
	description: () => t("plugins.equalizer.description"),
	restartNeeded: false,
	addedVersion: "3.7.X",
	config: {
		enabled: false,
		filters: [],
		presets: { "bass-booster": false }
	},
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [{
			label: t("plugins.equalizer.menu.presets.label"),
			type: "submenu",
			submenu: defaultPresets.map((preset) => ({
				label: t(`plugins.equalizer.menu.presets.list.${preset}`),
				type: "radio",
				checked: config.presets[preset],
				click() {
					setConfig({ presets: {
						...config.presets,
						[preset]: !config.presets[preset]
					} });
				}
			}))
		}];
	}
};
export { equalizer_default as default, pluginStub };
