import { s as __toESM } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import { t as require_electron_localshortcut } from "./electron-localshortcut-C08GypUP.js";
import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { BrowserWindow, Menu, ipcMain, nativeImage } from "electron";
var titlebar_default = ":root{--titlebar-background-color:var(--ytmusic-color-black3);--menu-bar-height:32px}ytmusic-app-layout{height:calc(100vh - var(--menu-bar-height,36px));backface-visibility:hidden;overflow:auto scroll}ytmusic-app-layout#layout{--ytmusic-nav-bar-offset:0px}ytmusic-app-layout>#content{padding-top:var(--menu-bar-height,36px)}ytmusic-app-layout::-webkit-scrollbar{width:var(--ytmusic-scrollbar-width)}ytmusic-app-layout::-webkit-scrollbar-thumb{background-color:#7e7e7e}ytmusic-app-layout>[slot=nav-bar],#nav-bar-background.ytmusic-app-layout{top:var(--menu-bar-height,36px)!important}#nav-bar-divider.ytmusic-app-layout{top:calc(var(--ytmusic-nav-bar-height) + var(--menu-bar-height,36px))!important}ytmusic-app[is-bauhaus-sidenav-enabled] #guide-spacer.ytmusic-app,ytmusic-app[is-bauhaus-sidenav-enabled] #mini-guide-spacer.ytmusic-app{margin-top:calc(var(--ytmusic-nav-bar-height) + var(--menu-bar-height,36px))!important}@media (width<=935px){ytmusic-app[is-bauhaus-sidenav-enabled] #guide-spacer.ytmusic-app{margin-top:calc(var(--menu-bar-height,36px))!important}ytmusic-app[is-bauhaus-sidenav-enabled] #mini-guide-spacer.ytmusic-app{margin-top:calc(var(--ytmusic-nav-bar-height) + var(--menu-bar-height,36px))!important}}ytmusic-app-layout>[slot=player-page]{margin-top:var(--menu-bar-height);height:calc(100vh - var(--menu-bar-height) - var(--ytmusic-nav-bar-height) - var(--ytmusic-player-bar-height))!important}ytmusic-guide-renderer{height:calc(100vh - var(--menu-bar-height) - var(--ytmusic-nav-bar-height))!important}ytmusic-app-layout ytmusic-player-page[is-mweb-modernization-enabled] .side-panel.ytmusic-player-page{transform:translate(0,calc(var(--ytmusic-player-page-inner-height) - var(--ytmusic-player-page-tabs-header-height) - var(--ytmusic-player-page-player-bar-height) - var(--menu-bar-height,32px)))}html{scrollbar-color:unset}ytmusic-browse-response .ytmusic-responsive-list-item-renderer{will-change:transform}ytmusic-player[player-ui-state=FULLSCREEN]{margin-top:calc(var(--menu-bar-height,32px)*-1)!important}";
var import_electron_localshortcut = /* @__PURE__ */ __toESM(require_electron_localshortcut());
const onMainLoad = ({ window: win, ipc: { handle, send } }) => {
	win.on("close", () => {
		send("close-all-in-app-menu-panel");
	});
	win.once("ready-to-show", () => {
		(0, import_electron_localshortcut.register)(win, "`", () => {
			send("toggle-in-app-menu");
		});
	});
	handle("get-menu", () => JSON.parse(JSON.stringify(Menu.getApplicationMenu(), (key, value) => key !== "commandsMap" && key !== "menu" ? value : void 0)));
	const getMenuItemById = (commandId) => {
		const menu = Menu.getApplicationMenu();
		let target = null;
		const stack = [...menu?.items ?? []];
		while (stack.length > 0) {
			const now = stack.shift();
			now?.submenu?.items.forEach((item) => stack.push(item));
			if (now?.commandId === commandId) {
				target = now;
				break;
			}
		}
		return target;
	};
	ipcMain.handle("peard:menu-event", (event, commandId) => {
		const target = getMenuItemById(commandId);
		if (target) target.click(void 0, BrowserWindow.fromWebContents(event.sender), event.sender);
	});
	handle("get-menu-by-id", (commandId) => {
		const result = getMenuItemById(commandId);
		return JSON.parse(JSON.stringify(result, (key, value) => key !== "commandsMap" && key !== "menu" ? value : void 0));
	});
	handle("window-is-maximized", () => win.isMaximized());
	handle("window-close", () => win.close());
	handle("window-minimize", () => win.minimize());
	handle("window-maximize", () => win.maximize());
	win.on("maximize", () => send("window-maximize"));
	handle("window-unmaximize", () => win.unmaximize());
	win.on("unmaximize", () => send("window-unmaximize"));
	handle("image-path-to-data-url", (imagePath) => {
		return nativeImage.createFromPath(imagePath)?.toDataURL();
	});
};
var import_is = /* @__PURE__ */ __toESM(require_is());
const onMenu = async ({ getConfig, setConfig }) => {
	const config = await getConfig();
	if (import_is.default.linux()) return [{
		label: t("plugins.in-app-menu.menu.hide-dom-window-controls"),
		type: "checkbox",
		checked: config.hideDOMWindowControls,
		click(item) {
			config.hideDOMWindowControls = item.checked;
			setConfig(config);
		}
	}];
	return [];
};
const defaultInAppMenuConfig = {
	enabled: (typeof window !== "undefined" && !window.navigator?.userAgent?.toLowerCase().includes("mac") || typeof global !== "undefined" && global.process?.platform !== "darwin") && (typeof window !== "undefined" && !window.navigator?.userAgent?.toLowerCase().includes("linux") || typeof global !== "undefined" && global.process?.platform !== "linux"),
	hideDOMWindowControls: false
};
var in_app_menu_default = createPlugin({
	name: () => t("plugins.in-app-menu.name"),
	description: () => t("plugins.in-app-menu.description"),
	restartNeeded: true,
	config: defaultInAppMenuConfig,
	stylesheets: [titlebar_default],
	menu: onMenu,
	backend: onMainLoad
});
const pluginStub = {
	name: () => t("plugins.in-app-menu.name"),
	description: () => t("plugins.in-app-menu.description"),
	restartNeeded: true,
	config: defaultInAppMenuConfig,
	stylesheets: [titlebar_default],
	menu: onMenu
};
export { in_app_menu_default as default, pluginStub };
