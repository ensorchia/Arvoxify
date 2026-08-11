import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { globalShortcut } from "electron";
import prompt from "custom-electron-prompt";
var volume_hud_default = "#volumeHud{z-index:999;pointer-events:none;text-shadow:0 0 12px #00000080;padding:10px;transition:opacity .6s;position:absolute}ytmusic-player[player-ui-state_=MINIPLAYER] #volumeHud{top:0!important}";
var precise_volume_default = createPlugin({
	name: () => t("plugins.precise-volume.name"),
	description: () => t("plugins.precise-volume.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		steps: 1,
		arrowsShortcut: true,
		globalShortcuts: {
			volumeUp: "",
			volumeDown: ""
		},
		savedVolume: void 0
	},
	stylesheets: [volume_hud_default],
	menu: async ({ setConfig, getConfig, window }) => {
		const config = await getConfig();
		function changeOptions(changedOptions, options) {
			for (const option in changedOptions) options[option] = changedOptions[option];
			setConfig(options);
		}
		const kb = (label_, value_, default_) => ({
			value: value_,
			label: label_,
			default: default_ || void 0
		});
		async function promptVolumeSteps(options) {
			const output = await prompt({
				title: t("plugins.precise-volume.prompt.volume-steps.title"),
				label: t("plugins.precise-volume.prompt.volume-steps.label"),
				value: options.steps || 1,
				type: "counter",
				counterOptions: {
					minimum: 0,
					maximum: 100,
					multiFire: true
				},
				width: 380,
				...prompt_options_default()
			}, window);
			if (output || output === 0) changeOptions({ steps: output }, options);
		}
		async function promptGlobalShortcuts(options, item) {
			const output = await prompt({
				title: t("plugins.precise-volume.prompt.global-shortcuts.title"),
				label: t("plugins.precise-volume.prompt.global-shortcuts.label"),
				type: "keybind",
				keybindOptions: [kb(t("plugins.precise-volume.prompt.global-shortcuts.keybind-options.increase"), "volumeUp", options.globalShortcuts?.volumeUp), kb(t("plugins.precise-volume.prompt.global-shortcuts.keybind-options.decrease"), "volumeDown", options.globalShortcuts?.volumeDown)],
				...prompt_options_default()
			}, window);
			if (output) {
				const newGlobalShortcuts = {
					volumeUp: "",
					volumeDown: ""
				};
				for (const { value, accelerator } of output) newGlobalShortcuts[value] = accelerator;
				changeOptions({ globalShortcuts: newGlobalShortcuts }, options);
				item.checked = Boolean(options.globalShortcuts.volumeUp) || Boolean(options.globalShortcuts.volumeDown);
			} else item.checked = !item.checked;
		}
		return [
			{
				label: t("plugins.precise-volume.menu.arrows-shortcuts"),
				type: "checkbox",
				checked: Boolean(config.arrowsShortcut),
				click(item) {
					changeOptions({ arrowsShortcut: item.checked }, config);
				}
			},
			{
				label: t("plugins.precise-volume.menu.global-shortcuts"),
				type: "checkbox",
				checked: Boolean(config.globalShortcuts?.volumeUp ?? config.globalShortcuts?.volumeDown),
				click: (item) => promptGlobalShortcuts(config, item)
			},
			{
				label: t("plugins.precise-volume.menu.custom-volume-steps"),
				click: () => promptVolumeSteps(config)
			}
		];
	},
	async backend({ getConfig, ipc }) {
		const config = await getConfig();
		if (config.globalShortcuts?.volumeUp) globalShortcut.register(config.globalShortcuts.volumeUp, () => ipc.send("changeVolume", true));
		if (config.globalShortcuts?.volumeDown) globalShortcut.register(config.globalShortcuts.volumeDown, () => ipc.send("changeVolume", false));
	}
});
const pluginStub = {
	name: () => t("plugins.precise-volume.name"),
	description: () => t("plugins.precise-volume.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		steps: 1,
		arrowsShortcut: true,
		globalShortcuts: {
			volumeUp: "",
			volumeDown: ""
		},
		savedVolume: void 0
	},
	stylesheets: [volume_hud_default],
	menu: async ({ setConfig, getConfig, window }) => {
		const config = await getConfig();
		function changeOptions(changedOptions, options) {
			for (const option in changedOptions) options[option] = changedOptions[option];
			setConfig(options);
		}
		const kb = (label_, value_, default_) => ({
			value: value_,
			label: label_,
			default: default_ || void 0
		});
		async function promptVolumeSteps(options) {
			const output = await prompt({
				title: t("plugins.precise-volume.prompt.volume-steps.title"),
				label: t("plugins.precise-volume.prompt.volume-steps.label"),
				value: options.steps || 1,
				type: "counter",
				counterOptions: {
					minimum: 0,
					maximum: 100,
					multiFire: true
				},
				width: 380,
				...prompt_options_default()
			}, window);
			if (output || output === 0) changeOptions({ steps: output }, options);
		}
		async function promptGlobalShortcuts(options, item) {
			const output = await prompt({
				title: t("plugins.precise-volume.prompt.global-shortcuts.title"),
				label: t("plugins.precise-volume.prompt.global-shortcuts.label"),
				type: "keybind",
				keybindOptions: [kb(t("plugins.precise-volume.prompt.global-shortcuts.keybind-options.increase"), "volumeUp", options.globalShortcuts?.volumeUp), kb(t("plugins.precise-volume.prompt.global-shortcuts.keybind-options.decrease"), "volumeDown", options.globalShortcuts?.volumeDown)],
				...prompt_options_default()
			}, window);
			if (output) {
				const newGlobalShortcuts = {
					volumeUp: "",
					volumeDown: ""
				};
				for (const { value, accelerator } of output) newGlobalShortcuts[value] = accelerator;
				changeOptions({ globalShortcuts: newGlobalShortcuts }, options);
				item.checked = Boolean(options.globalShortcuts.volumeUp) || Boolean(options.globalShortcuts.volumeDown);
			} else item.checked = !item.checked;
		}
		return [
			{
				label: t("plugins.precise-volume.menu.arrows-shortcuts"),
				type: "checkbox",
				checked: Boolean(config.arrowsShortcut),
				click(item) {
					changeOptions({ arrowsShortcut: item.checked }, config);
				}
			},
			{
				label: t("plugins.precise-volume.menu.global-shortcuts"),
				type: "checkbox",
				checked: Boolean(config.globalShortcuts?.volumeUp ?? config.globalShortcuts?.volumeDown),
				click: (item) => promptGlobalShortcuts(config, item)
			},
			{
				label: t("plugins.precise-volume.menu.custom-volume-steps"),
				click: () => promptVolumeSteps(config)
			}
		];
	}
};
export { precise_volume_default as default, pluginStub };
