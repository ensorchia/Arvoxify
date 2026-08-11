import "./is-DL8kkJAd.js";
import "./config-n3n9Pwqt.js";
import { c as t, l as t$1, n as createBackend, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { a as registerCallback } from "./song-info-BTWNuwrN.js";
import { n as cors, r as Hono, t as serve } from "./dist-D2dATDYX.js";
var amusePort = 9863;
var formatSongInfo = (info) => {
	return {
		player: {
			hasSong: !!(info.artist && info.title),
			isPaused: info.isPaused ?? false,
			seekbarCurrentPosition: info.elapsedSeconds ?? 0
		},
		track: {
			duration: info.songDuration,
			title: info.title,
			author: info.artist,
			cover: info.imageSrc ?? "",
			url: info.url ?? "",
			id: info.videoId,
			isAdvertisement: false
		}
	};
};
var backend_default = createBackend({
	currentSongInfo: {},
	app: null,
	server: null,
	start() {
		registerCallback((songInfo) => {
			this.currentSongInfo = songInfo;
		});
		this.app = new Hono();
		this.app.use("*", cors());
		this.app.get("/", (ctx) => ctx.body(t$1("plugins.amuse.response.query"), 200));
		const queryAndApiHandler = (ctx) => {
			return ctx.json(formatSongInfo(this.currentSongInfo), 200);
		};
		this.app.get("/query", queryAndApiHandler);
		this.app.get("/api", queryAndApiHandler);
		try {
			this.server = serve({
				fetch: this.app.fetch.bind(this.app),
				port: amusePort
			});
		} catch (err) {
			console.error(err);
		}
	},
	stop() {
		if (this.server) this.server?.close();
	}
});
const defaultConfig = { enabled: false };
var amuse_default = createPlugin({
	name: () => t("plugins.amuse.name"),
	description: () => t("plugins.amuse.description"),
	addedVersion: "3.7.X",
	restartNeeded: true,
	config: defaultConfig,
	backend: backend_default
});
const pluginStub = {
	name: () => t("plugins.amuse.name"),
	description: () => t("plugins.amuse.description"),
	addedVersion: "3.7.X",
	restartNeeded: true,
	config: defaultConfig
};
export { amuse_default as default, defaultConfig, pluginStub };
