import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var exponential_volume_default = createPlugin({
	name: () => t("plugins.exponential-volume.name"),
	description: () => t("plugins.exponential-volume.description"),
	restartNeeded: true,
	config: { enabled: false }
});
const pluginStub = {
	name: () => t("plugins.exponential-volume.name"),
	description: () => t("plugins.exponential-volume.description"),
	restartNeeded: true,
	config: { enabled: false }
};
export { exponential_volume_default as default, pluginStub };
