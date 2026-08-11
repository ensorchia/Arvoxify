import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { app } from "electron";
import prompt from "custom-electron-prompt";
var style_default = "ytmusic-app-layout.pip ytmusic-player-bar svg,ytmusic-app-layout.pip ytmusic-player-bar .time-info,ytmusic-app-layout.pip ytmusic-player-bar yt-formatted-string,ytmusic-app-layout.pip ytmusic-player-bar .yt-formatted-string{filter:drop-shadow(2px 4px 6px #000);color:#fff!important;fill:#fff!important}ytmusic-app-layout.pip ytmusic-player-expanding-menu{backdrop-filter:blur(5px)brightness(20%);background-color:#0000004d;border-radius:30px}.cet-container ytmusic-app-layout.pip #volumeHud{top:22px!important}.cet-container ytmusic-app-layout.pip ytmusic-player-bar{-webkit-app-region:no-drag!important}.cet-container ytmusic-app-layout.pip #player{-webkit-app-region:drag!important}ytmusic-app-layout.pip ytmusic-player-bar .content-info-wrapper,ytmusic-app-layout.pip ytmusic-player-bar .thumbnail-image-wrapper,ytmusic-app-layout.pip ytmusic-player-bar ytmusic-menu-renderer,ytmusic-app-layout.pip .video-switch-button{display:none!important}";
var config;
const onMainLoad = async ({ window, getConfig, setConfig, ipc: { send, on } }) => {
	let isInPiP = false;
	let originalPosition;
	let originalSize;
	let originalFullScreen;
	let originalMaximized;
	const pipPosition = () => config.savePosition && config["pip-position"] || [10, 10];
	const pipSize = () => config.saveSize && config["pip-size"] || [450, 275];
	const togglePiP = () => {
		isInPiP = !isInPiP;
		setConfig({ isInPiP });
		if (isInPiP) {
			originalFullScreen = window.isFullScreen();
			if (originalFullScreen) window.setFullScreen(false);
			originalMaximized = window.isMaximized();
			if (originalMaximized) window.unmaximize();
			originalPosition = window.getPosition();
			originalSize = window.getSize();
			window.webContents.addListener("before-input-event", blockShortcutsInPiP);
			window.setMaximizable(false);
			window.setFullScreenable(false);
			send("peard:pip-toggle", true);
			app.dock?.hide();
			window.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
			app.dock?.show();
			if (config.alwaysOnTop) window.setAlwaysOnTop(true, "screen-saver", 1);
		} else {
			window.webContents.removeListener("before-input-event", blockShortcutsInPiP);
			window.setMaximizable(true);
			window.setFullScreenable(true);
			send("peard:pip-toggle", false);
			window.setVisibleOnAllWorkspaces(false);
			window.setAlwaysOnTop(false);
			if (originalFullScreen) window.setFullScreen(true);
			if (originalMaximized) window.maximize();
		}
		const [x, y] = isInPiP ? pipPosition() : originalPosition;
		const [w, h] = isInPiP ? pipSize() : originalSize;
		window.setPosition(x, y);
		window.setSize(w, h);
		window.setWindowButtonVisibility?.(!isInPiP);
	};
	const blockShortcutsInPiP = (event, input) => {
		const key = input.key.toLowerCase();
		if (key === "f") event.preventDefault();
		else if (key === "escape") {
			togglePiP();
			event.preventDefault();
		}
	};
	config ??= await getConfig();
	setConfig({ isInPiP });
	on("plugin:toggle-picture-in-picture", () => {
		togglePiP();
	});
	window.on("move", () => {
		if (config.isInPiP && !config.useNativePiP) {
			const [x, y] = window.getPosition();
			setConfig({ "pip-position": [x, y] });
		}
	});
	window.on("resize", () => {
		if (config.isInPiP && !config.useNativePiP) {
			const [width, height] = window.getSize();
			setConfig({ "pip-size": [width, height] });
		}
	});
};
const onConfigChange = (newConfig) => {
	config = newConfig;
};
const onMenu = async ({ window, getConfig, setConfig }) => {
	const config$1 = await getConfig();
	return [
		{
			label: t("plugins.picture-in-picture.menu.always-on-top"),
			type: "checkbox",
			checked: config$1.alwaysOnTop,
			click(item) {
				setConfig({ alwaysOnTop: item.checked });
				window.setAlwaysOnTop(item.checked);
			}
		},
		{
			label: t("plugins.picture-in-picture.menu.save-window-position"),
			type: "checkbox",
			checked: config$1.savePosition,
			click(item) {
				setConfig({ savePosition: item.checked });
			}
		},
		{
			label: t("plugins.picture-in-picture.menu.save-window-size"),
			type: "checkbox",
			checked: config$1.saveSize,
			click(item) {
				setConfig({ saveSize: item.checked });
			}
		},
		{
			label: t("plugins.picture-in-picture.menu.hotkey.label"),
			type: "checkbox",
			checked: !!config$1.hotkey,
			async click(item) {
				const output = await prompt({
					title: t("plugins.picture-in-picture.menu.prompt.title"),
					label: t("plugins.picture-in-picture.menu.prompt.label"),
					type: "keybind",
					keybindOptions: [{
						value: "hotkey",
						label: t("plugins.picture-in-picture.menu.prompt.keybind-options.hotkey"),
						default: config$1.hotkey
					}],
					...prompt_options_default()
				}, window);
				if (output) {
					const { value, accelerator } = output[0];
					setConfig({ [value]: accelerator });
					item.checked = !!accelerator;
				} else item.checked = !item.checked;
			}
		},
		{
			label: t("plugins.picture-in-picture.menu.use-native-pip"),
			type: "checkbox",
			checked: config$1.useNativePiP,
			click(item) {
				setConfig({ useNativePiP: item.checked });
			}
		}
	];
};
var picture_in_picture_default = createPlugin({
	name: () => t("plugins.picture-in-picture.name"),
	description: () => t("plugins.picture-in-picture.description"),
	restartNeeded: true,
	config: {
		"enabled": false,
		"alwaysOnTop": true,
		"savePosition": true,
		"saveSize": false,
		"hotkey": "P",
		"pip-position": [10, 10],
		"pip-size": [450, 275],
		"isInPiP": false,
		"useNativePiP": true
	},
	stylesheets: [style_default],
	menu: onMenu,
	backend: {
		start: onMainLoad,
		onConfigChange
	}
});
const pluginStub = {
	name: () => t("plugins.picture-in-picture.name"),
	description: () => t("plugins.picture-in-picture.description"),
	restartNeeded: true,
	config: {
		"enabled": false,
		"alwaysOnTop": true,
		"savePosition": true,
		"saveSize": false,
		"hotkey": "P",
		"pip-position": [10, 10],
		"pip-size": [450, 275],
		"isInPiP": false,
		"useNativePiP": true
	},
	stylesheets: [style_default],
	menu: onMenu
};
export { picture_in_picture_default as default, pluginStub };
