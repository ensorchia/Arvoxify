import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var performance_improvement_default = createPlugin({
	name: () => t("plugins.performance-improvement.name"),
	description: () => t("plugins.performance-improvement.description"),
	restartNeeded: true,
	addedVersion: "3.9.X",
	config: { enabled: true }
});
const pluginStub = {
	name: () => t("plugins.performance-improvement.name"),
	description: () => t("plugins.performance-improvement.description"),
	restartNeeded: true,
	addedVersion: "3.9.X",
	config: { enabled: true }
};
export { performance_improvement_default as default, pluginStub };
