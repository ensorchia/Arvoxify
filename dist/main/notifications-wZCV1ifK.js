import { s as __toESM } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import "./config-n3n9Pwqt.js";
import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { a as setTrayOnClick, n as changeProtocolHandler, o as setTrayOnDoubleClick } from "./protocol-handler-CuLMm9Mx.js";
import { a as registerCallback, n as SongInfoEvent } from "./song-info-BTWNuwrN.js";
import { t as getSongControls } from "./song-controls-DP9OiftJ.js";
import { t as icon_default } from "./icon-C9b4OpUp.js";
import { i as play_default, n as next_default, r as pause_default, t as previous_default } from "./previous-BWj0pjHZ.js";
import path from "node:path";
import fs from "node:fs";
import { Notification, app } from "electron";
var import_is$1 = /* @__PURE__ */ __toESM(require_is());
var userData = app.getPath("userData");
var temporaryIcon = path.join(userData, "tempIcon.png");
var temporaryBanner = path.join(userData, "tempBanner.png");
const ToastStyles = {
	logo: 1,
	banner_centered_top: 2,
	hero: 3,
	banner_top_custom: 4,
	banner_centered_bottom: 5,
	banner_bottom: 6,
	legacy: 7
};
const urgencyLevels = [
	{
		name: "Low",
		value: "low"
	},
	{
		name: "Normal",
		value: "normal"
	},
	{
		name: "High",
		value: "critical"
	}
];
var nativeImageToLogo = (nativeImage$1) => {
	const temporaryImage = nativeImage$1.resize({ height: 256 });
	const margin = Math.max(temporaryImage.getSize().width - 256, 0);
	return temporaryImage.crop({
		x: Math.round(margin / 2),
		y: 0,
		width: 256,
		height: 256
	});
};
const notificationImage = (songInfo, config$1) => {
	if (!songInfo.image) return icon_default;
	if (!config$1.interactive) return nativeImageToLogo(songInfo.image);
	switch (config$1.toastStyle) {
		case ToastStyles.logo:
		case ToastStyles.legacy: return saveImage(nativeImageToLogo(songInfo.image), temporaryIcon);
		default: return saveImage(songInfo.image, temporaryBanner);
	}
};
const saveImage = (img, savePath) => {
	try {
		fs.writeFileSync(savePath, img.toPNG());
	} catch (error) {
		console.error("Error writing song icon to disk:");
		console.trace(error);
		return icon_default;
	}
	return savePath;
};
const snakeToCamel = (string_) => string_.replaceAll(/([-_][a-z]|^[a-z])/g, (group) => group.toUpperCase().replace("-", " ").replace("_", " "));
const secondsToMinutes = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = seconds % 60;
	return `${minutes}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
};
const mediaIcons = {
	play: "ᐅ",
	pause: "‖",
	next: "ᐳ",
	previous: "ᐸ"
};
var songControls;
var savedNotification;
var interactive_default = (win, config$1, { ipc: { on, send } }) => {
	const sendNotification = (songInfo) => {
		const iconSrc = notificationImage(songInfo, config$1());
		savedNotification?.close();
		let icon;
		if (typeof iconSrc === "object") icon = iconSrc.toDataURL();
		else icon = iconSrc;
		savedNotification = new Notification({
			title: songInfo.title || "Playing",
			body: songInfo.artist,
			icon: iconSrc,
			silent: true,
			toastXml: getXml(songInfo, icon)
		});
		setTimeout(() => savedNotification?.close(), 5e3);
		savedNotification.on("close", () => {
			savedNotification = void 0;
		});
		savedNotification.show();
	};
	const getXml = (songInfo, iconSrc) => {
		switch (config$1().toastStyle) {
			default:
			case ToastStyles.logo:
			case ToastStyles.legacy: return xmlLogo(songInfo, iconSrc);
			case ToastStyles.banner_top_custom: return xmlBannerTopCustom(songInfo, iconSrc);
			case ToastStyles.hero: return xmlHero(songInfo, iconSrc);
			case ToastStyles.banner_bottom: return xmlBannerBottom(songInfo, iconSrc);
			case ToastStyles.banner_centered_bottom: return xmlBannerCenteredBottom(songInfo, iconSrc);
			case ToastStyles.banner_centered_top: return xmlBannerCenteredTop(songInfo, iconSrc);
		}
	};
	const selectIcon = (kind) => {
		switch (kind) {
			case "play": return play_default;
			case "pause": return pause_default;
			case "next": return next_default;
			case "previous": return previous_default;
			default: return "";
		}
	};
	const display = (kind) => {
		if (config$1().toastStyle === ToastStyles.legacy) return `content="${mediaIcons[kind]}"`;
		return `\
            content="${config$1().toastStyle ? "" : kind.charAt(0).toUpperCase() + kind.slice(1)}"\
            imageUri="file:///${selectIcon(kind)}"
        `;
	};
	const getButton = (kind) => `<action ${display(kind)} activationType="protocol" arguments="peardesktop://${kind}"/>`;
	const getButtons = (isPaused) => `\
    <actions>
        ${getButton("previous")}
        ${isPaused ? getButton("play") : getButton("pause")}
        ${getButton("next")}
    </actions>\
`;
	const toast = (content, isPaused) => `\
<toast>
    <audio silent="true" />
    <visual>
        <binding template="ToastGeneric">
            ${content}
        </binding>
    </visual>

    ${getButtons(isPaused)}
</toast>`;
	const xmlImage = ({ title, artist, isPaused }, imgSrc, placement) => toast(`\
            <image id="1" src="${imgSrc}" name="Image" ${placement}/>
            <text id="1">${title}</text>
            <text id="2">${artist}</text>\
`, isPaused ?? false);
	const xmlLogo = (songInfo, imgSrc) => xmlImage(songInfo, imgSrc, "placement=\"appLogoOverride\"");
	const xmlHero = (songInfo, imgSrc) => xmlImage(songInfo, imgSrc, "placement=\"hero\"");
	const xmlBannerBottom = (songInfo, imgSrc) => xmlImage(songInfo, imgSrc, "");
	const xmlBannerTopCustom = (songInfo, imgSrc) => toast(`\
            <image id="1" src="${imgSrc}" name="Image" />
            <text>ㅤ</text>
            <group>
                <subgroup>
                    <text hint-style="body">${songInfo.title}</text>
                    <text hint-style="captionSubtle">${songInfo.artist}</text>
                </subgroup>
                ${xmlMoreData(songInfo)}
            </group>\
`, songInfo.isPaused ?? false);
	const xmlMoreData = ({ album, elapsedSeconds, songDuration }) => `\
<subgroup hint-textStacking="bottom">
    ${album ? `<text hint-style="captionSubtle" hint-wrap="true" hint-align="right">${album}</text>` : ""}
    <text hint-style="captionSubtle" hint-wrap="true" hint-align="right">${secondsToMinutes(elapsedSeconds ?? 0)} / ${secondsToMinutes(songDuration)}</text>
</subgroup>\
`;
	const xmlBannerCenteredBottom = ({ title, artist, isPaused }, imgSrc) => toast(`\
            <text>ㅤ</text>
            <group>
                <subgroup hint-weight="1" hint-textStacking="center">
                    <text hint-align="center" hint-style="${titleFontPicker(title)}">${title}</text>
                    <text hint-align="center" hint-style="SubtitleSubtle">${artist}</text>
                </subgroup>
            </group>
            <image id="1" src="${imgSrc}" name="Image"  hint-removeMargin="true" />\
`, isPaused ?? false);
	const xmlBannerCenteredTop = ({ title, artist, isPaused }, imgSrc) => toast(`\
            <image id="1" src="${imgSrc}" name="Image" />
            <text>ㅤ</text>
            <group>
                <subgroup hint-weight="1" hint-textStacking="center">
                    <text hint-align="center" hint-style="${titleFontPicker(title)}">${title}</text>
                    <text hint-align="center" hint-style="SubtitleSubtle">${artist}</text>
                </subgroup>
            </group>\
`, isPaused ?? false);
	const titleFontPicker = (title) => {
		if (title.length <= 13) return "Header";
		if (title.length <= 22) return "Subheader";
		if (title.length <= 26) return "Title";
		return "Subtitle";
	};
	songControls = getSongControls(win);
	let currentSeconds = 0;
	on("peard:player-api-loaded", () => send("peard:setup-time-changed-listener"));
	let savedSongInfo;
	let lastUrl;
	registerCallback((songInfo, event) => {
		if (event === SongInfoEvent.TimeChanged) currentSeconds = songInfo.elapsedSeconds ?? 0;
		if (!songInfo.artist && !songInfo.title) return;
		savedSongInfo = { ...songInfo };
		if (!songInfo.isPaused && (songInfo.url !== lastUrl || config$1().unpauseNotification)) {
			lastUrl = songInfo.url;
			sendNotification(songInfo);
		}
	});
	if (config$1().trayControls) {
		setTrayOnClick(() => {
			if (savedNotification) {
				savedNotification.close();
				savedNotification = void 0;
			} else if (savedSongInfo) sendNotification({
				...savedSongInfo,
				elapsedSeconds: currentSeconds
			});
		});
		setTrayOnDoubleClick(() => {
			if (win.isVisible()) win.hide();
			else win.show();
		});
	}
	app.once("before-quit", () => {
		savedNotification?.close();
	});
	changeProtocolHandler((cmd, ...args) => {
		if (Object.keys(songControls).includes(cmd)) {
			songControls[cmd](...args);
			if (config$1().refreshOnPlayPause && (cmd === "pause" || cmd === "play" && !config$1().unpauseNotification)) setImmediate(() => sendNotification({
				...savedSongInfo,
				isPaused: cmd === "pause",
				elapsedSeconds: currentSeconds
			}));
		}
	});
};
var config;
var notify = (info) => {
	const currentNotification = new Notification({
		title: info.title || "Playing",
		body: info.artist,
		icon: notificationImage(info, config),
		silent: true,
		urgency: config.urgency
	});
	currentNotification.show();
	return currentNotification;
};
var setup = () => {
	let oldNotification;
	let currentUrl;
	registerCallback((songInfo, event) => {
		if (event !== SongInfoEvent.TimeChanged && !songInfo.isPaused && (songInfo.url !== currentUrl || config.unpauseNotification)) {
			oldNotification?.close();
			currentUrl = songInfo.url;
			setTimeout(() => {
				oldNotification = notify(songInfo);
			}, 10);
		}
	});
};
const onMainLoad = async (context) => {
	config = await context.getConfig();
	if (import_is$1.default.windows() && config.interactive) interactive_default(context.window, () => config, context);
	else setup();
};
const onConfigChange = (newConfig) => {
	config = newConfig;
};
var import_is = /* @__PURE__ */ __toESM(require_is());
const onMenu = async ({ getConfig, setConfig }) => {
	const config$1 = await getConfig();
	const getToastStyleMenuItems = (options) => {
		const array = Array.from({ length: Object.keys(ToastStyles).length });
		for (const [name, index] of Object.entries(ToastStyles)) array[index - 1] = {
			label: snakeToCamel(name),
			type: "radio",
			checked: options.toastStyle === index,
			click: () => setConfig({ toastStyle: index })
		};
		return array;
	};
	const getMenu = () => {
		if (import_is.default.linux()) return [{
			label: t("plugins.notifications.menu.priority"),
			submenu: urgencyLevels.map((level) => ({
				label: level.name,
				type: "radio",
				checked: config$1.urgency === level.value,
				click: () => setConfig({ urgency: level.value })
			}))
		}];
		else if (import_is.default.windows()) return [
			{
				label: t("plugins.notifications.menu.interactive"),
				type: "checkbox",
				checked: config$1.interactive,
				click: (item) => setConfig({ interactive: item.checked })
			},
			{
				label: t("plugins.notifications.menu.interactive-settings.label"),
				submenu: [
					{
						label: t("plugins.notifications.menu.interactive-settings.submenu.tray-controls"),
						type: "checkbox",
						checked: config$1.trayControls,
						click: (item) => setConfig({ trayControls: item.checked })
					},
					{
						label: t("plugins.notifications.menu.interactive-settings.submenu.hide-button-text"),
						type: "checkbox",
						checked: config$1.hideButtonText,
						click: (item) => setConfig({ hideButtonText: item.checked })
					},
					{
						label: t("plugins.notifications.menu.interactive-settings.submenu.refresh-on-play-pause"),
						type: "checkbox",
						checked: config$1.refreshOnPlayPause,
						click: (item) => setConfig({ refreshOnPlayPause: item.checked })
					}
				]
			},
			{
				label: t("plugins.notifications.menu.toast-style"),
				submenu: getToastStyleMenuItems(config$1)
			}
		];
		else return [];
	};
	return [...getMenu(), {
		label: t("plugins.notifications.menu.unpause-notification"),
		type: "checkbox",
		checked: config$1.unpauseNotification,
		click: (item) => setConfig({ unpauseNotification: item.checked })
	}];
};
const defaultConfig = {
	enabled: false,
	unpauseNotification: false,
	urgency: "normal",
	interactive: true,
	toastStyle: 1,
	refreshOnPlayPause: false,
	trayControls: true,
	hideButtonText: false
};
var notifications_default = createPlugin({
	name: () => t("plugins.notifications.name"),
	description: () => t("plugins.notifications.description"),
	restartNeeded: true,
	config: defaultConfig,
	menu: onMenu,
	backend: {
		start: onMainLoad,
		onConfigChange
	}
});
const pluginStub = {
	name: () => t("plugins.notifications.name"),
	description: () => t("plugins.notifications.description"),
	restartNeeded: true,
	config: defaultConfig,
	menu: onMenu
};
export { notifications_default as default, defaultConfig, pluginStub };
