import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var disable_autoplay_default = createPlugin({
	name: () => t("plugins.disable-autoplay.name"),
	description: () => t("plugins.disable-autoplay.description"),
	restartNeeded: false,
	config: {
		enabled: false,
		applyOnce: false
	},
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [{
			label: t("plugins.disable-autoplay.menu.apply-once"),
			type: "checkbox",
			checked: config.applyOnce,
			async click() {
				const nowConfig = await getConfig();
				setConfig({ applyOnce: !nowConfig.applyOnce });
			}
		}];
	}
});
const pluginStub = {
	name: () => t("plugins.disable-autoplay.name"),
	description: () => t("plugins.disable-autoplay.description"),
	restartNeeded: false,
	config: {
		enabled: false,
		applyOnce: false
	},
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [{
			label: t("plugins.disable-autoplay.menu.apply-once"),
			type: "checkbox",
			checked: config.applyOnce,
			async click() {
				const nowConfig = await getConfig();
				setConfig({ applyOnce: !nowConfig.applyOnce });
			}
		}];
	}
};
export { disable_autoplay_default as default, pluginStub };
