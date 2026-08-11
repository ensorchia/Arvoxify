import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { dialog } from "electron";
var quality_changer_default = createPlugin({
	name: () => t("plugins.quality-changer.name"),
	description: () => t("plugins.quality-changer.description"),
	restartNeeded: false,
	config: { enabled: false },
	backend({ ipc, window }) {
		ipc.handle("peard:quality-changer", async (qualityLabels, currentIndex) => await dialog.showMessageBox(window, {
			type: "question",
			buttons: qualityLabels,
			defaultId: currentIndex,
			title: t("plugins.quality-changer.backend.dialog.quality-changer.title"),
			message: t("plugins.quality-changer.backend.dialog.quality-changer.message"),
			detail: t("plugins.quality-changer.backend.dialog.quality-changer.detail", { quality: qualityLabels[currentIndex] }),
			cancelId: -1
		}));
	}
});
const pluginStub = {
	name: () => t("plugins.quality-changer.name"),
	description: () => t("plugins.quality-changer.description"),
	restartNeeded: false,
	config: { enabled: false }
};
export { quality_changer_default as default, pluginStub };
