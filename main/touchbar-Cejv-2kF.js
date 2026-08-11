import "./is-DL8kkJAd.js";
import "./config-n3n9Pwqt.js";
import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { a as registerCallback, n as SongInfoEvent } from "./song-info-BTWNuwrN.js";
import { t as getSongControls } from "./song-controls-DP9OiftJ.js";
import { t as icon_default } from "./icon-C9b4OpUp.js";
import { t as Platform } from "./plugins-C0sALclx.js";
import { TouchBar, nativeImage } from "electron";
var touchbar_default = createPlugin({
	name: () => t("plugins.touchbar.name"),
	description: () => t("plugins.touchbar.description"),
	restartNeeded: true,
	platform: Platform.macOS,
	config: { enabled: false },
	backend({ window }) {
		const { TouchBarButton, TouchBarLabel, TouchBarSpacer, TouchBarSegmentedControl, TouchBarScrubber } = TouchBar;
		const songTitle = new TouchBarLabel({ label: "" });
		let controls = [];
		const songImage = {};
		const pausePlayButton = new TouchBarButton({});
		const buttons = new TouchBarSegmentedControl({
			mode: "buttons",
			segments: [
				new TouchBarButton({ label: "⏮" }),
				pausePlayButton,
				new TouchBarButton({ label: "⏭" }),
				new TouchBarButton({ label: "👎" }),
				new TouchBarButton({ label: "👍" })
			],
			change: (i) => controls[i]()
		});
		const touchBar = new TouchBar({ items: [
			new TouchBarScrubber({
				items: [songImage, songTitle],
				continuous: false
			}),
			new TouchBarSpacer({ size: "flexible" }),
			buttons
		] });
		const { playPause, next, previous, dislike, like } = getSongControls(window);
		window.once("ready-to-show", () => {
			controls = [
				previous,
				playPause,
				next,
				dislike,
				like
			];
			registerCallback((songInfo, event) => {
				if (event === SongInfoEvent.TimeChanged) return;
				songTitle.label = songInfo.title;
				pausePlayButton.label = songInfo.isPaused ? "▶️" : "⏸";
				songImage.icon = (songInfo.image ? songInfo.image : nativeImage.createFromPath(icon_default)).resize({ height: 23 });
				window.setTouchBar(touchBar);
			});
		});
	}
});
const pluginStub = {
	name: () => t("plugins.touchbar.name"),
	description: () => t("plugins.touchbar.description"),
	restartNeeded: true,
	platform: Platform.macOS,
	config: { enabled: false }
};
export { touchbar_default as default, pluginStub };
