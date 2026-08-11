import { c as t, n as createBackend, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import prompt from "custom-electron-prompt";
var back_default = createBackend({
	start({ ipc: { handle }, window }) {
		handle("peard:captions-selector", async (captionLabels, currentIndex) => await prompt({
			title: t("plugins.captions-selector.prompt.selector.title"),
			label: t("plugins.captions-selector.prompt.selector.label", { language: captionLabels[currentIndex] || t("plugins.captions-selector.prompt.selector.none") }),
			type: "select",
			value: currentIndex,
			selectOptions: captionLabels,
			resizable: true,
			...prompt_options_default()
		}, window));
	},
	stop({ ipc: { removeHandler } }) {
		removeHandler("captionsSelector");
	}
});
var captions_selector_default = createPlugin({
	name: () => t("plugins.captions-selector.name"),
	description: () => t("plugins.captions-selector.description"),
	config: {
		enabled: false,
		disableCaptions: false,
		autoload: false,
		lastCaptionsCode: ""
	},
	async menu({ getConfig, setConfig }) {
		const config = await getConfig();
		return [{
			label: t("plugins.captions-selector.menu.autoload"),
			type: "checkbox",
			checked: config.autoload,
			click(item) {
				setConfig({ autoload: item.checked });
			}
		}, {
			label: t("plugins.captions-selector.menu.disable-captions"),
			type: "checkbox",
			checked: config.disableCaptions,
			click(item) {
				setConfig({ disableCaptions: item.checked });
			}
		}];
	},
	backend: back_default
});
const pluginStub = {
	name: () => t("plugins.captions-selector.name"),
	description: () => t("plugins.captions-selector.description"),
	config: {
		enabled: false,
		disableCaptions: false,
		autoload: false,
		lastCaptionsCode: ""
	},
	async menu({ getConfig, setConfig }) {
		const config = await getConfig();
		return [{
			label: t("plugins.captions-selector.menu.autoload"),
			type: "checkbox",
			checked: config.autoload,
			click(item) {
				setConfig({ autoload: item.checked });
			}
		}, {
			label: t("plugins.captions-selector.menu.disable-captions"),
			type: "checkbox",
			checked: config.disableCaptions,
			click(item) {
				setConfig({ disableCaptions: item.checked });
			}
		}];
	}
};
export { captions_selector_default as default, pluginStub };
