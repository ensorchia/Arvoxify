import { s as __toESM } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import { f as restart, n as get } from "./config-n3n9Pwqt.js";
import { c as t } from "./utils-Dk3QnH3H.js";
import { t as tray_default } from "./tray-DJ3mcCkw.js";
import { a as registerCallback, n as SongInfoEvent } from "./song-info-BTWNuwrN.js";
import { t as getSongControls } from "./song-controls-DP9OiftJ.js";
import path from "node:path";
import { Menu, Tray, app, nativeImage, screen } from "electron";
import { join as join$1 } from "path";
var tray_paused_default = join$1(import.meta.dirname, "../../assets/tray-paused.png").replace("app.asar", "app.asar.unpacked");
var import_is = /* @__PURE__ */ __toESM(require_is());
var tray;
const setTrayOnClick = (fn) => {
	if (!tray) return;
	tray.removeAllListeners("click");
	tray.on("click", fn);
};
const setTrayOnDoubleClick = (fn) => {
	if (!tray) return;
	tray.removeAllListeners("double-click");
	tray.on("double-click", fn);
};
const setUpTray = (app$1, win) => {
	if (!get("options.tray")) {
		tray = void 0;
		return;
	}
	const { playPause, next, previous } = getSongControls(win);
	const pixelRatio = import_is.default.windows() ? screen.getPrimaryDisplay().scaleFactor || 1 : 1;
	const defaultTrayIcon = nativeImage.createFromPath(tray_default).resize({
		width: 16 * pixelRatio,
		height: 16 * pixelRatio
	});
	const pausedTrayIcon = nativeImage.createFromPath(tray_paused_default).resize({
		width: 16 * pixelRatio,
		height: 16 * pixelRatio
	});
	tray = new Tray(defaultTrayIcon);
	tray.setToolTip(t("main.tray.tooltip.default"));
	tray.setIgnoreDoubleClickEvents(true);
	tray.on("click", () => {
		if (get("options.trayClickPlayPause")) playPause();
		else if (win.isVisible()) {
			win.hide();
			app$1.dock?.hide();
		} else {
			win.show();
			app$1.dock?.show();
		}
	});
	const template = [
		{
			label: t("main.tray.play-pause"),
			click() {
				playPause();
			}
		},
		{
			label: t("main.tray.next"),
			click() {
				next();
			}
		},
		{
			label: t("main.tray.previous"),
			click() {
				previous();
			}
		},
		{
			label: t("main.tray.show"),
			click() {
				win.show();
				app$1.dock?.show();
			}
		},
		{ type: "separator" },
		{
			label: t("main.tray.restart"),
			click: restart
		},
		{ type: "separator" },
		{
			label: t("main.tray.quit"),
			role: "quit"
		}
	];
	const trayMenu = Menu.buildFromTemplate(template);
	tray.setContextMenu(trayMenu);
	registerCallback((songInfo, event) => {
		if (event === SongInfoEvent.TimeChanged) return;
		if (tray) {
			if (typeof songInfo.isPaused === "undefined") {
				tray.setImage(defaultTrayIcon);
				return;
			}
			tray.setToolTip(t("main.tray.tooltip.with-song-info", {
				artist: songInfo.artist,
				title: songInfo.title
			}));
			tray.setImage(songInfo.isPaused ? pausedTrayIcon : defaultTrayIcon);
		}
	});
};
const APP_PROTOCOL = "arvoxify";
var protocolHandler;
function setupProtocolHandler(win) {
	if (process.defaultApp && process.argv.length >= 2) app.setAsDefaultProtocolClient(APP_PROTOCOL, process.execPath, [path.resolve(process.argv[1])]);
	else app.setAsDefaultProtocolClient(APP_PROTOCOL);
	const songControls = getSongControls(win);
	protocolHandler = ((cmd, ...args) => {
		if (cmd === "play" && args.length > 0) {
			const url = args[0];
			if (url && url.startsWith("http")) {
				win.webContents.loadURL(url);
				win.show();
				win.focus();
			} else songControls.play();
		} else if (Object.keys(songControls).includes(cmd)) songControls[cmd](...args);
	});
}
function handleProtocol(cmd, ...args) {
	protocolHandler?.(cmd, ...args);
}
function changeProtocolHandler(f) {
	protocolHandler = f;
}
export { setTrayOnClick as a, setupProtocolHandler as i, changeProtocolHandler as n, setTrayOnDoubleClick as o, handleProtocol as r, setUpTray as s, APP_PROTOCOL as t };
