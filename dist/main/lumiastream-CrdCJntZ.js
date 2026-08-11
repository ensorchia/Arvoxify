import "./is-DL8kkJAd.js";
import "./config-n3n9Pwqt.js";
import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { a as registerCallback } from "./song-info-BTWNuwrN.js";
import { net } from "electron";
var lumiastream_default = createPlugin({
	name: () => t("plugins.lumiastream.name"),
	description: () => t("plugins.lumiastream.description"),
	restartNeeded: true,
	config: { enabled: false },
	backend({ ipc }) {
		const secToMilisec = (t$1) => t$1 ? Math.round(Number(t$1) * 1e3) : void 0;
		const previousStatePaused = null;
		const data = {
			origin: "peardesktop",
			eventType: "switchSong"
		};
		const post = (data$1) => {
			const port = 39231;
			const headers = {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Access-Control-Allow-Headers": "*",
				"Access-Control-Allow-Origin": "*"
			};
			const url = `http://127.0.0.1:${port}/api/media`;
			net.fetch(url, {
				method: "POST",
				body: JSON.stringify({
					token: "lsmedia_ytmsI7812",
					data: data$1
				}),
				headers
			}).catch((error) => {
				console.log(`Error: '${error.code || error.errno}' - when trying to access lumiastream webserver at port ${port}`);
			});
		};
		ipc.on("peard:player-api-loaded", () => ipc.send("peard:setup-time-changed-listener"));
		registerCallback((songInfo) => {
			if (!songInfo.title && !songInfo.artist) return;
			if (previousStatePaused === null) data.eventType = "switchSong";
			else if (previousStatePaused !== songInfo.isPaused) data.eventType = "playPause";
			data.duration = secToMilisec(songInfo.songDuration);
			data.progress = secToMilisec(songInfo.elapsedSeconds);
			data.url = songInfo.url;
			data.videoId = songInfo.videoId;
			data.playlistId = songInfo.playlistId;
			data.cover = songInfo.imageSrc;
			data.cover_url = songInfo.imageSrc;
			data.album_url = songInfo.imageSrc;
			data.title = songInfo.title;
			data.artists = [songInfo.artist];
			data.status = songInfo.isPaused ? "stopped" : "playing";
			data.isPaused = songInfo.isPaused;
			data.album = songInfo.album;
			data.views = songInfo.views;
			post(data);
		});
	}
});
const pluginStub = {
	name: () => t("plugins.lumiastream.name"),
	description: () => t("plugins.lumiastream.description"),
	restartNeeded: true,
	config: { enabled: false }
};
export { lumiastream_default as default, pluginStub };
