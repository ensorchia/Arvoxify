import { ipcMain } from "electron";
let LikeType = /* @__PURE__ */ function(LikeType$1) {
	LikeType$1["Dislike"] = "DISLIKE";
	LikeType$1["Indifferent"] = "INDIFFERENT";
	LikeType$1["Like"] = "LIKE";
	return LikeType$1;
}({});
var parseNumberFromArgsType = (args) => {
	if (typeof args === "number") return args;
	else if (Array.isArray(args)) return Number(args[0]);
	else return null;
};
var parseBooleanFromArgsType = (args) => {
	if (typeof args === "boolean") return args;
	else if (Array.isArray(args)) return args[0] === "true";
	else return null;
};
var parseStringFromArgsType = (args) => {
	if (typeof args === "string") return args;
	else if (Array.isArray(args)) return args[0];
	else return null;
};
const getSongControls = (win) => {
	return {
		previous: () => win.webContents.send("peard:previous-video"),
		next: () => win.webContents.send("peard:next-video"),
		play: () => win.webContents.send("peard:play"),
		pause: () => win.webContents.send("peard:pause"),
		playPause: () => win.webContents.send("peard:toggle-play"),
		like: () => win.webContents.send("peard:update-like", LikeType.Like),
		dislike: () => win.webContents.send("peard:update-like", LikeType.Dislike),
		seekTo: (seconds) => {
			if (parseNumberFromArgsType(seconds) !== null) win.webContents.send("peard:seek-to", seconds);
		},
		goBack: (seconds) => {
			const secondsNumber = parseNumberFromArgsType(seconds);
			if (secondsNumber !== null) win.webContents.send("peard:seek-by", -secondsNumber);
		},
		goForward: (seconds) => {
			if (parseNumberFromArgsType(seconds) !== null) win.webContents.send("peard:seek-by", seconds);
		},
		requestShuffleInformation: () => {
			win.webContents.send("peard:get-shuffle");
		},
		shuffle: () => win.webContents.send("peard:shuffle"),
		switchRepeat: (n = 1) => {
			if (parseNumberFromArgsType(n) !== null) win.webContents.send("peard:switch-repeat", n);
		},
		setVolume: (volume) => {
			if (parseNumberFromArgsType(volume) !== null) win.webContents.send("peard:update-volume", volume);
		},
		setFullscreen: (isFullscreen) => {
			const isFullscreenValue = parseBooleanFromArgsType(isFullscreen);
			if (isFullscreenValue !== null) {
				win.setFullScreen(isFullscreenValue);
				win.webContents.send("peard:click-fullscreen-button", isFullscreenValue);
			}
		},
		requestFullscreenInformation: () => {
			win.webContents.send("peard:get-fullscreen");
		},
		requestQueueInformation: () => {
			win.webContents.send("peard:get-queue");
		},
		muteUnmute: () => win.webContents.send("peard:toggle-mute"),
		openSearchBox: () => {
			win.webContents.sendInputEvent({
				type: "keyDown",
				keyCode: "/"
			});
		},
		addSongToQueue: (videoId, queueInsertPosition) => {
			const videoIdValue = parseStringFromArgsType(videoId);
			if (videoIdValue === null) return;
			win.webContents.send("peard:add-to-queue", videoIdValue, queueInsertPosition);
		},
		moveSongInQueue: (fromIndex, toIndex) => {
			const fromIndexValue = parseNumberFromArgsType(fromIndex);
			const toIndexValue = parseNumberFromArgsType(toIndex);
			if (fromIndexValue === null || toIndexValue === null) return;
			win.webContents.send("peard:move-in-queue", fromIndexValue, toIndexValue);
		},
		removeSongFromQueue: (index) => {
			const indexValue = parseNumberFromArgsType(index);
			if (indexValue === null) return;
			win.webContents.send("peard:remove-from-queue", indexValue);
		},
		setQueueIndex: (index) => {
			const indexValue = parseNumberFromArgsType(index);
			if (indexValue === null) return;
			win.webContents.send("peard:set-queue-index", indexValue);
		},
		clearQueue: () => win.webContents.send("peard:clear-queue"),
		search: (query, params, continuation) => new Promise((resolve) => {
			ipcMain.once("peard:search-results", (_, result) => {
				resolve(result);
			});
			win.webContents.send("peard:search", query, params, continuation);
		})
	};
};
export { LikeType as n, getSongControls as t };
