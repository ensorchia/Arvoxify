import { s as __toESM } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import "./config-n3n9Pwqt.js";
import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { a as registerCallback } from "./song-info-BTWNuwrN.js";
import { net } from "electron";
var import_is = /* @__PURE__ */ __toESM(require_is());
var tuna_obs_default = createPlugin({
	name: () => t("plugins.tuna-obs.name"),
	description: () => t("plugins.tuna-obs.description"),
	restartNeeded: true,
	config: { enabled: false },
	backend: {
		liteMode: false,
		start({ ipc }) {
			const secToMilisec = (t$1) => Math.round(Number(t$1) * 1e3);
			const post = (data) => {
				const port = 1608;
				const headers = {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Access-Control-Allow-Headers": "*",
					"Access-Control-Allow-Origin": "*"
				};
				const url = `http://127.0.0.1:${port}/`;
				net.fetch(url, {
					method: this.liteMode ? "OPTIONS" : "POST",
					headers,
					keepalive: true,
					body: this.liteMode ? void 0 : JSON.stringify({ data })
				}).then(() => {
					if (this.liteMode) {
						this.liteMode = false;
						console.debug(`obs-tuna webserver at port ${port} is now accessible. disable lite mode`);
						post(data);
					}
				}).catch((error) => {
					if (!this.liteMode) {
						if (import_is.default.dev()) console.debug(`Error: '${error.code || error.errno}' - when trying to access obs-tuna webserver at port ${port}. enable lite mode`);
						this.liteMode = true;
					}
				});
			};
			ipc.on("peard:player-api-loaded", () => ipc.send("peard:setup-time-changed-listener"));
			registerCallback((songInfo) => {
				if (!songInfo.title && !songInfo.artist) return;
				post({
					duration: secToMilisec(songInfo.songDuration),
					progress: secToMilisec(songInfo.elapsedSeconds ?? 0),
					cover: songInfo.imageSrc ?? "",
					cover_url: songInfo.imageSrc ?? "",
					album_url: songInfo.imageSrc ?? "",
					title: songInfo.title,
					alternativeTitle: songInfo.alternativeTitle ?? "",
					artists: [songInfo.artist],
					status: songInfo.isPaused ? "stopped" : "playing",
					album: songInfo.album,
					url: songInfo.url ?? "",
					tags: songInfo.tags ?? []
				});
			});
		}
	}
});
const pluginStub = {
	name: () => t("plugins.tuna-obs.name"),
	description: () => t("plugins.tuna-obs.description"),
	restartNeeded: true,
	config: { enabled: false }
};
export { tuna_obs_default as default, pluginStub };
