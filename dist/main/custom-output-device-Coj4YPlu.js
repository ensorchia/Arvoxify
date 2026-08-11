import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import prompt from "custom-electron-prompt";
var custom_output_device_default = createPlugin({
	name: () => t("plugins.custom-output-device.name"),
	description: () => t("plugins.custom-output-device.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		output: "default",
		devices: {}
	},
	menu: ({ setConfig, getConfig, window }) => {
		const promptDeviceSelector = async () => {
			const options = await getConfig();
			const response = await prompt({
				title: t("plugins.custom-output-device.prompt.device-selector.title"),
				label: t("plugins.custom-output-device.prompt.device-selector.label"),
				value: options.output || "default",
				type: "select",
				selectOptions: options.devices,
				width: 500,
				...prompt_options_default()
			}, window).catch(console.error);
			if (!response) return;
			options.output = response;
			setConfig(options);
		};
		return [{
			label: t("plugins.custom-output-device.menu.device-selector"),
			click: promptDeviceSelector
		}];
	}
});
const pluginStub = {
	name: () => t("plugins.custom-output-device.name"),
	description: () => t("plugins.custom-output-device.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		output: "default",
		devices: {}
	},
	menu: ({ setConfig, getConfig, window }) => {
		const promptDeviceSelector = async () => {
			const options = await getConfig();
			const response = await prompt({
				title: t("plugins.custom-output-device.prompt.device-selector.title"),
				label: t("plugins.custom-output-device.prompt.device-selector.label"),
				value: options.output || "default",
				type: "select",
				selectOptions: options.devices,
				width: 500,
				...prompt_options_default()
			}, window).catch(console.error);
			if (!response) return;
			options.output = response;
			setConfig(options);
		};
		return [{
			label: t("plugins.custom-output-device.menu.device-selector"),
			click: promptDeviceSelector
		}];
	}
};
export { custom_output_device_default as default, pluginStub };
