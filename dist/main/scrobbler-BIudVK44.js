import "./is-DL8kkJAd.js";
import "./config-n3n9Pwqt.js";
import { c as t, n as createBackend, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { a as registerCallback, n as SongInfoEvent, t as MediaType } from "./song-info-BTWNuwrN.js";
import { BrowserWindow, dialog, net } from "electron";
import crypto from "node:crypto";
import prompt from "custom-electron-prompt";
var ScrobblerBase = class {};
var LastFmScrobbler = class extends ScrobblerBase {
	mainWindow;
	constructor(mainWindow) {
		super();
		this.mainWindow = mainWindow;
	}
	isSessionCreated(config) {
		return !!config.scrobblers.lastfm.sessionKey;
	}
	async createSession(config, setConfig) {
		const data = {
			api_key: config.scrobblers.lastfm.apiKey,
			format: "json",
			method: "auth.getsession",
			token: config.scrobblers.lastfm.token
		};
		const apiSignature = createApiSig(data, config.scrobblers.lastfm.secret);
		const json = await (await net.fetch(`${config.scrobblers.lastfm.apiRoot}${createQueryString(data, apiSignature)}`)).json();
		if (json.error) {
			config.scrobblers.lastfm.token = await createToken(config);
			authenticate(config, this.mainWindow).then((it) => {
				if (it) this.createSession(config, setConfig);
				else setConfig(config);
			});
		}
		if (json.session) config.scrobblers.lastfm.sessionKey = json.session.key;
		setConfig(config);
		return config;
	}
	setNowPlaying(songInfo, config, setConfig) {
		if (!config.scrobblers.lastfm.sessionKey) return;
		this.postSongDataToAPI(songInfo, config, { method: "track.updateNowPlaying" }, setConfig);
	}
	addScrobble(songInfo, config, setConfig) {
		if (!config.scrobblers.lastfm.sessionKey) return;
		const data = {
			method: "track.scrobble",
			timestamp: Math.trunc((Date.now() - (songInfo.elapsedSeconds ?? 0)) / 1e3)
		};
		this.postSongDataToAPI(songInfo, config, data, setConfig);
	}
	async postSongDataToAPI(songInfo, config, data, setConfig) {
		if (!config.scrobblers.lastfm.sessionKey) await this.createSession(config, setConfig);
		const title = config.alternativeTitles && songInfo.alternativeTitle !== void 0 ? songInfo.alternativeTitle : songInfo.title;
		const artist = config.alternativeArtist && songInfo.tags?.at(0) !== void 0 ? songInfo.tags?.at(0) : songInfo.artist;
		const postData = {
			track: title,
			duration: songInfo.songDuration,
			artist,
			...songInfo.album ? { album: songInfo.album } : void 0,
			api_key: config.scrobblers.lastfm.apiKey,
			sk: config.scrobblers.lastfm.sessionKey,
			format: "json",
			...data
		};
		postData.api_sig = createApiSig(postData, config.scrobblers.lastfm.secret);
		const formData = createFormData(postData);
		net.fetch("https://ws.audioscrobbler.com/2.0/", {
			method: "POST",
			body: formData
		}).catch(async (error) => {
			if (error?.response?.data?.error === 9) {
				config.scrobblers.lastfm.sessionKey = void 0;
				config.scrobblers.lastfm.token = await createToken(config);
				authenticate(config, this.mainWindow).then((it) => {
					if (it) this.createSession(config, setConfig);
					else setConfig(config);
				});
			} else console.error(error);
		});
	}
};
var createFormData = (parameters) => {
	const formData = new URLSearchParams();
	for (const key in parameters) formData.append(key, String(parameters[key]));
	return formData;
};
var createQueryString = (parameters, apiSignature) => {
	const queryData = [];
	parameters.api_sig = apiSignature;
	for (const key in parameters) queryData.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(parameters[key]))}`);
	return "?" + queryData.join("&");
};
var createApiSig = (parameters, secret) => {
	let sig = "";
	Object.entries(parameters).sort(([a], [b]) => a.localeCompare(b)).forEach(([key, value]) => {
		if (key === "format") return;
		sig += key + value;
	});
	sig += secret;
	sig = crypto.createHash("md5").update(sig, "utf-8").digest("hex");
	return sig;
};
var createToken = async ({ scrobblers: { lastfm: { apiKey, apiRoot, secret } } }) => {
	const data = {
		method: "auth.gettoken",
		api_key: apiKey,
		format: "json"
	};
	const apiSigature = createApiSig(data, secret);
	return (await (await net.fetch(`${apiRoot}${createQueryString(data, apiSigature)}`)).json())?.token;
};
var authWindowOpened = false;
var latestAuthResult = false;
var authenticate = async (config, mainWindow) => {
	return new Promise((resolve) => {
		if (!authWindowOpened) {
			authWindowOpened = true;
			const url = `https://www.last.fm/api/auth/?api_key=${config.scrobblers.lastfm.apiKey}&token=${config.scrobblers.lastfm.token}`;
			const browserWindow = new BrowserWindow({
				width: 500,
				height: 600,
				show: false,
				webPreferences: { nodeIntegration: false },
				autoHideMenuBar: true,
				parent: mainWindow,
				minimizable: false,
				maximizable: false,
				paintWhenInitiallyHidden: true,
				modal: true,
				center: true
			});
			browserWindow.loadURL(url).then(() => {
				browserWindow.show();
				browserWindow.webContents.on("did-navigate", async (_, newUrl) => {
					const url$1 = new URL(newUrl);
					if (url$1.hostname.endsWith("last.fm")) {
						if (url$1.pathname === "/api/auth") {
							if (!await browserWindow.webContents.executeJavaScript("!!document.getElementsByName('confirm').length")) {
								resolve(true);
								latestAuthResult = true;
								browserWindow.close();
							}
						} else if (url$1.pathname === "/api/None") {
							resolve(false);
							latestAuthResult = false;
							browserWindow.close();
						}
					}
				});
				browserWindow.on("closed", () => {
					if (!latestAuthResult) dialog.showMessageBox({
						title: t("plugins.scrobbler.dialog.lastfm.auth-failed.title"),
						message: t("plugins.scrobbler.dialog.lastfm.auth-failed.message"),
						type: "error"
					});
					authWindowOpened = false;
				});
			});
		} else {
			while (authWindowOpened);
			resolve(latestAuthResult);
		}
	});
};
var ListenbrainzScrobbler = class extends ScrobblerBase {
	isSessionCreated() {
		return true;
	}
	createSession(config, _setConfig) {
		return Promise.resolve(config);
	}
	setNowPlaying(songInfo, config, _setConfig) {
		if (!config.scrobblers.listenbrainz.apiRoot || !config.scrobblers.listenbrainz.token) return;
		const body = createRequestBody("playing_now", songInfo, config);
		submitListen(body, config);
	}
	addScrobble(songInfo, config, _setConfig) {
		if (!config.scrobblers.listenbrainz.apiRoot || !config.scrobblers.listenbrainz.token) return;
		const body = createRequestBody("single", songInfo, config);
		body.payload[0].listened_at = Math.trunc(Date.now() / 1e3);
		submitListen(body, config);
	}
};
function createRequestBody(listenType, songInfo, config) {
	const title = config.alternativeTitles && songInfo.alternativeTitle !== void 0 ? songInfo.alternativeTitle : songInfo.title;
	const trackMetadata = {
		artist_name: config.alternativeArtist && songInfo.tags?.at(0) !== void 0 ? songInfo.tags?.at(0) : songInfo.artist,
		track_name: title,
		release_name: songInfo.album ?? void 0,
		additional_info: {
			media_player: "Arvoxify App",
			submission_client: "Arvoxify App - Scrobbler Plugin",
			origin_url: songInfo.url,
			duration: songInfo.songDuration
		}
	};
	return {
		listen_type: listenType,
		payload: [{ track_metadata: trackMetadata }]
	};
}
function submitListen(body, config) {
	net.fetch(config.scrobblers.listenbrainz.apiRoot + "submit-listens", {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Authorization": "Token " + config.scrobblers.listenbrainz.token,
			"Content-Type": "application/json"
		}
	}).catch(console.error);
}
const backend = createBackend({
	enabledScrobblers: /* @__PURE__ */ new Map(),
	toggleScrobblers(config, window) {
		if (config.scrobblers.lastfm && config.scrobblers.lastfm.enabled) this.enabledScrobblers.set("lastfm", new LastFmScrobbler(window));
		else this.enabledScrobblers.delete("lastfm");
		if (config.scrobblers.listenbrainz && config.scrobblers.listenbrainz.enabled) this.enabledScrobblers.set("listenbrainz", new ListenbrainzScrobbler());
		else this.enabledScrobblers.delete("listenbrainz");
	},
	async createSessions(config, setConfig) {
		for (const [, scrobbler] of this.enabledScrobblers) if (!scrobbler.isSessionCreated(config)) await scrobbler.createSession(config, setConfig);
	},
	async start({ getConfig, setConfig, window }) {
		const config = this.config = await getConfig();
		let scrobbleTimer;
		this.window = window;
		this.toggleScrobblers(config, window);
		await this.createSessions(config, setConfig);
		this.setConfig = setConfig;
		registerCallback((songInfo, event) => {
			if (event === SongInfoEvent.TimeChanged) return;
			clearTimeout(scrobbleTimer);
			if (!songInfo.isPaused) {
				const configNonnull = this.config;
				if (!configNonnull.scrobbleOtherMedia && songInfo.mediaType !== MediaType.Audio && songInfo.mediaType !== MediaType.OriginalMusicVideo) return;
				const scrobbleTime = Math.min(Math.ceil(songInfo.songDuration / 2), 240);
				if (scrobbleTime > (songInfo.elapsedSeconds ?? 0)) {
					const timeToWait = (scrobbleTime - (songInfo.elapsedSeconds ?? 0)) * 1e3;
					scrobbleTimer = setTimeout((info, config$1) => {
						this.enabledScrobblers.forEach((scrobbler) => scrobbler.addScrobble(info, config$1, setConfig));
					}, timeToWait, songInfo, configNonnull);
				}
				this.enabledScrobblers.forEach((scrobbler) => scrobbler.setNowPlaying(songInfo, configNonnull, setConfig));
			}
		});
	},
	async onConfigChange(newConfig) {
		this.enabledScrobblers.clear();
		this.toggleScrobblers(newConfig, this.window);
		for (const [scrobblerName, scrobblerConfig] of Object.entries(newConfig.scrobblers)) if (scrobblerConfig.enabled) {
			const scrobbler = this.enabledScrobblers.get(scrobblerName);
			if (this.config?.scrobblers?.[scrobblerName]?.enabled !== scrobblerConfig.enabled && scrobbler && !scrobbler.isSessionCreated(newConfig) && this.setConfig) await scrobbler.createSession(newConfig, this.setConfig);
		}
		this.config = newConfig;
	}
});
async function promptLastFmOptions(options, setConfig, window) {
	const output = await prompt({
		title: t("plugins.scrobbler.menu.lastfm.api-settings"),
		label: t("plugins.scrobbler.menu.lastfm.api-settings"),
		type: "multiInput",
		multiInputOptions: [{
			label: t("plugins.scrobbler.prompt.lastfm.api-key"),
			value: options.scrobblers.lastfm?.apiKey,
			inputAttrs: { type: "text" }
		}, {
			label: t("plugins.scrobbler.prompt.lastfm.api-secret"),
			value: options.scrobblers.lastfm?.secret,
			inputAttrs: { type: "text" }
		}],
		resizable: true,
		height: 360,
		...prompt_options_default()
	}, window);
	if (output) {
		if (output[0]) options.scrobblers.lastfm.apiKey = output[0];
		if (output[1]) options.scrobblers.lastfm.secret = output[1];
		setConfig(options);
	}
}
async function promptListenbrainzOptions(options, setConfig, window) {
	const output = await prompt({
		title: t("plugins.scrobbler.prompt.listenbrainz.token.title"),
		label: t("plugins.scrobbler.prompt.listenbrainz.token.label"),
		type: "input",
		value: options.scrobblers.listenbrainz?.token,
		...prompt_options_default()
	}, window);
	if (output) {
		options.scrobblers.listenbrainz.token = output;
		setConfig(options);
	}
}
const onMenu = async ({ window, getConfig, setConfig }) => {
	const config = await getConfig();
	return [
		{
			label: t("plugins.scrobbler.menu.scrobble-other-media"),
			type: "checkbox",
			checked: Boolean(config.scrobbleOtherMedia),
			click(item) {
				config.scrobbleOtherMedia = item.checked;
				setConfig(config);
			}
		},
		{
			label: t("plugins.scrobbler.menu.scrobble-alternative-title"),
			type: "checkbox",
			checked: Boolean(config.alternativeTitles),
			click(item) {
				config.alternativeTitles = item.checked;
				setConfig(config);
			}
		},
		{
			label: t("plugins.scrobbler.menu.scrobble-alternative-artist"),
			type: "checkbox",
			checked: Boolean(config.alternativeArtist),
			click(item) {
				config.alternativeArtist = item.checked;
				setConfig(config);
			}
		},
		{
			label: "Last.fm",
			submenu: [{
				label: t("main.menu.plugins.enabled"),
				type: "checkbox",
				checked: Boolean(config.scrobblers.lastfm?.enabled),
				click(item) {
					backend.toggleScrobblers(config, window);
					config.scrobblers.lastfm.enabled = item.checked;
					setConfig(config);
				}
			}, {
				label: t("plugins.scrobbler.menu.lastfm.api-settings"),
				click() {
					promptLastFmOptions(config, setConfig, window);
				}
			}]
		},
		{
			label: "ListenBrainz",
			submenu: [{
				label: t("main.menu.plugins.enabled"),
				type: "checkbox",
				checked: Boolean(config.scrobblers.listenbrainz?.enabled),
				click(item) {
					backend.toggleScrobblers(config, window);
					config.scrobblers.listenbrainz.enabled = item.checked;
					setConfig(config);
				}
			}, {
				label: t("plugins.scrobbler.menu.listenbrainz.token"),
				click() {
					promptListenbrainzOptions(config, setConfig, window);
				}
			}]
		}
	];
};
const defaultConfig = {
	enabled: false,
	scrobbleOtherMedia: true,
	alternativeTitles: true,
	alternativeArtist: true,
	scrobblers: {
		lastfm: {
			enabled: false,
			token: void 0,
			sessionKey: void 0,
			apiRoot: "https://ws.audioscrobbler.com/2.0/",
			apiKey: "04d76faaac8726e60988e14c105d421a",
			secret: "a5d2a36fdf64819290f6982481eaffa2"
		},
		listenbrainz: {
			enabled: false,
			token: void 0,
			apiRoot: "https://api.listenbrainz.org/1/"
		}
	}
};
var scrobbler_default = createPlugin({
	name: () => t("plugins.scrobbler.name"),
	description: () => t("plugins.scrobbler.description"),
	restartNeeded: true,
	config: defaultConfig,
	menu: onMenu,
	backend
});
const pluginStub = {
	name: () => t("plugins.scrobbler.name"),
	description: () => t("plugins.scrobbler.description"),
	restartNeeded: true,
	config: defaultConfig,
	menu: onMenu
};
export { scrobbler_default as default, defaultConfig, pluginStub };
