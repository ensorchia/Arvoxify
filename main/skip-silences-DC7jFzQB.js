import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var skip_silences_default = createPlugin({
	name: () => t("plugins.skip-silences.name"),
	description: () => t("plugins.skip-silences.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		onlySkipBeginning: false
	}
});
const pluginStub = {
	name: () => t("plugins.skip-silences.name"),
	description: () => t("plugins.skip-silences.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		onlySkipBeginning: false
	}
};
export { skip_silences_default as default, pluginStub };
