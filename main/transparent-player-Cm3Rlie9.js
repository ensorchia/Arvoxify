import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { t as Platform } from "./plugins-C0sALclx.js";
let MaterialType = /* @__PURE__ */ function(MaterialType$1) {
	MaterialType$1["MICA"] = "mica";
	MaterialType$1["ACRYLIC"] = "acrylic";
	MaterialType$1["TABBED"] = "tabbed";
	MaterialType$1["NONE"] = "none";
	return MaterialType$1;
}({});
var style_default = ":root{--ytmd-transparent-player-transparency-color:#111;--ytmd-transparent-player-transparent-background:rgb(from var(--ytmd-transparent-player-transparency-color)r g b/var(--ytmd-transparent-player-opacity,.5));--ytmd-transparent-player-transparent-background-dark:rgb(from var(--ytmd-transparent-player-transparency-color)r g b/.8);--ytmd-transparent-player-backdrop-blur:blur(20px)}body.transparent-background-color{background-color:var(--ytmd-transparent-player-transparent-background)!important}body.transparent-player-backdrop-filter{& #layout{& #nav-bar-background,& #player-bar-background{backdrop-filter:var(--ytmd-transparent-player-backdrop-blur)!important}}& #search-page{& #tabs{&.stuck{backdrop-filter:var(--ytmd-transparent-player-backdrop-blur)!important}}}& ytmusic-menu-popup-renderer,& #ytmd-title-bar-main-panel{backdrop-filter:var(--ytmd-transparent-player-backdrop-blur)!important}}body.transparent-player{& ytmusic-app{& ytmusic-app-layout[player-page-open]{& #nav-bar-background.ytmusic-app-layout,& #player-bar-background.ytmusic-app-layout{opacity:0!important}}& #layout{& #nav-bar-background,& #player-bar-background{background:var(--ytmd-transparent-player-transparent-background-dark)!important}& #mini-guide-background{background:0 0!important;border:0!important}& #guide{& #guide-wrapper{background:0 0!important;border:0!important}}& ytmusic-player-bar,& #player-page{background:0 0!important}& #search-page{& #tabs{&.stuck{background:var(--ytmd-transparent-player-transparent-background)!important}}}& #browse-page{& #background{display:none!important}& .background-gradient{background:0 0!important}}}}& nav[data-ytmd-main-panel]{background-color:#0000!important}& .av-toggle.ytmusic-av-toggle{background-color:var(--ytmd-transparent-player-transparent-background)}}";
var defaultConfig = {
	enabled: false,
	opacity: .5,
	type: MaterialType.ACRYLIC
};
var opacityList = [
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
var typeList = Object.values(MaterialType);
var transparent_player_default = createPlugin({
	name: () => t("plugins.transparent-player.name"),
	description: () => t("plugins.transparent-player.description"),
	addedVersion: "3.11.x",
	restartNeeded: true,
	platform: Platform.Windows,
	config: defaultConfig,
	stylesheets: [style_default],
	async menu({ getConfig, setConfig }) {
		const config = await getConfig();
		return [{
			label: t("plugins.transparent-player.menu.opacity.label"),
			submenu: opacityList.map((opacity) => ({
				label: t("plugins.transparent-player.menu.opacity.submenu.percent", { opacity: opacity * 100 }),
				type: "radio",
				checked: config.opacity === opacity,
				click() {
					setConfig({ opacity });
				}
			}))
		}, {
			label: t("plugins.transparent-player.menu.type.label"),
			submenu: typeList.map((type) => ({
				label: t(`plugins.transparent-player.menu.type.submenu.${type}`),
				type: "radio",
				checked: config.type === type,
				click() {
					setConfig({ type });
				}
			}))
		}];
	},
	backend: {
		mainWindow: null,
		async start({ window, getConfig }) {
			this.mainWindow = window;
			const config = await getConfig();
			window.setBackgroundMaterial?.(config.type);
			window.setBackgroundColor?.(`rgba(0, 0, 0, ${config.opacity})`);
		},
		onConfigChange(newConfig) {
			this.mainWindow?.setBackgroundMaterial?.(newConfig.type);
		},
		stop({ window }) {
			window.setBackgroundMaterial?.("none");
		}
	}
});
const pluginStub = {
	name: () => t("plugins.transparent-player.name"),
	description: () => t("plugins.transparent-player.description"),
	addedVersion: "3.11.x",
	restartNeeded: true,
	platform: Platform.Windows,
	config: defaultConfig,
	stylesheets: [style_default],
	async menu({ getConfig, setConfig }) {
		const config = await getConfig();
		return [{
			label: t("plugins.transparent-player.menu.opacity.label"),
			submenu: opacityList.map((opacity) => ({
				label: t("plugins.transparent-player.menu.opacity.submenu.percent", { opacity: opacity * 100 }),
				type: "radio",
				checked: config.opacity === opacity,
				click() {
					setConfig({ opacity });
				}
			}))
		}, {
			label: t("plugins.transparent-player.menu.type.label"),
			submenu: typeList.map((type) => ({
				label: t(`plugins.transparent-player.menu.type.submenu.${type}`),
				type: "radio",
				checked: config.type === type,
				click() {
					setConfig({ type });
				}
			}))
		}];
	}
};
export { transparent_player_default as default, pluginStub };
