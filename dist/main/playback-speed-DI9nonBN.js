import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var playback_speed_default = createPlugin({
	name: () => t("plugins.playback-speed.name"),
	description: () => t("plugins.playback-speed.description"),
	restartNeeded: false,
	config: { enabled: false }
});
const pluginStub = {
	name: () => t("plugins.playback-speed.name"),
	description: () => t("plugins.playback-speed.description"),
	restartNeeded: false,
	config: { enabled: false }
};
export { playback_speed_default as default, pluginStub };
