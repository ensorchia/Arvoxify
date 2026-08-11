import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var style_default = "yt-page-navigation-progress{--yt-page-navigation-container-color:#00000046!important;--yt-page-navigation-progress-color:white!important}#player-page{transition:transform .3s,background-color .3s cubic-bezier(.2,0,.6,1)!important}#nav-bar-background{transition:opacity .2s,background-color .3s cubic-bezier(.2,0,.6,1)!important}#mini-guide-background{border-right:0!important;transition:opacity .2s,background-color .3s cubic-bezier(.2,0,.6,1)!important}#guide-wrapper{transition:opacity .2s,background-color .3s cubic-bezier(.2,0,.6,1)!important}#items{border-radius:10px!important}ytmusic-app-layout>[slot=player-page]:not([is-mweb-modernization-enabled]):not(:has(ytmusic-player[player-ui-state=FULLSCREEN])){padding-top:90px;margin-top:calc(-90px + var(--menu-bar-height,0px))!important}.duration.ytmusic-player-queue-item,.byline.ytmusic-player-queue-item{color:#ffffff80!important;--yt-endpoint-color:#ffffff80!important;--yt-endpoint-hover-color:#ffffff80!important;--yt-endpoint-visited-color:#ffffff80!important}.icon.ytmusic-menu-navigation-item-renderer{color:#ffffff80!important}.menu.ytmusic-player-bar{--iron-icon-fill-color:#ffffff80!important}ytmusic-player-bar,.time-info.ytmusic-player-bar{color:#ffffff80!important}.volume-slider.ytmusic-player-bar,.expand-volume-slider.ytmusic-player-bar{--paper-slider-container-color:#ffffff80!important}ytmusic-fullbleed-thumbnail-renderer img{mask:linear-gradient(#000 0% 50%,#0000 100%)}.background-gradient.style-scope,ytmusic-app-layout[is-bauhaus-sidenav-enabled] #mini-guide-background.ytmusic-app-layout{background:var(--ytmusic-background)!important}ytmusic-browse-response[has-background]:not([disable-gradient]) .background-gradient.ytmusic-browse-response{background:unset!important}#background.immersive-background.style-scope.ytmusic-browse-response{opacity:.6}";
var album_color_theme_default = createPlugin({
	name: () => t("plugins.album-color-theme.name"),
	description: () => t("plugins.album-color-theme.description"),
	restartNeeded: false,
	config: {
		enabled: false,
		ratio: .5
	},
	stylesheets: [style_default],
	menu: async ({ getConfig, setConfig }) => {
		const ratioList = [
			0,
			.1,
			.2,
			.3,
			.4,
			.5,
			.6,
			.7,
			.8,
			.9,
			1
		];
		const config = await getConfig();
		return [{
			label: t("plugins.album-color-theme.menu.color-mix-ratio.label"),
			submenu: ratioList.map((ratio) => ({
				label: t("plugins.album-color-theme.menu.color-mix-ratio.submenu.percent", { ratio: ratio * 100 }),
				type: "radio",
				checked: config.ratio === ratio,
				click() {
					setConfig({ ratio });
				}
			}))
		}];
	}
});
const pluginStub = {
	name: () => t("plugins.album-color-theme.name"),
	description: () => t("plugins.album-color-theme.description"),
	restartNeeded: false,
	config: {
		enabled: false,
		ratio: .5
	},
	stylesheets: [style_default],
	menu: async ({ getConfig, setConfig }) => {
		const ratioList = [
			0,
			.1,
			.2,
			.3,
			.4,
			.5,
			.6,
			.7,
			.8,
			.9,
			1
		];
		const config = await getConfig();
		return [{
			label: t("plugins.album-color-theme.menu.color-mix-ratio.label"),
			submenu: ratioList.map((ratio) => ({
				label: t("plugins.album-color-theme.menu.color-mix-ratio.submenu.percent", { ratio: ratio * 100 }),
				type: "radio",
				checked: config.ratio === ratio,
				click() {
					setConfig({ ratio });
				}
			}))
		}];
	}
};
export { album_color_theme_default as default, pluginStub };
