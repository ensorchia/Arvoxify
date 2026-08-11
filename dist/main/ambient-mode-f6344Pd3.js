import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var style_default = "#song-video canvas.html5-blur-canvas,#song-image .html5-blur-image{filter:blur(var(--blur,100px));opacity:var(--opacity,1);width:var(--width,100%);height:var(--height,100%);pointer-events:none}#song-video canvas.html5-blur-canvas:not(.fullscreen),#song-image .html5-blur-image{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#song-video canvas.html5-blur-canvas.fullscreen{width:100%;height:100%;position:fixed;top:0;left:0}#song-video .html5-video-container{height:100%}#player:not([video-mode]):not(.video-mode):not([player-ui-state=MINIPLAYER]):not([is-mweb-modernization-enabled]){width:100%;overflow:visible;margin:0 auto!important}.song-button.ytmusic-av-toggle,.video-button.ytmusic-av-toggle{z-index:1;background-color:#0000}#side-panel.side-panel.ytmusic-player-page{z-index:0}";
const menu = async ({ getConfig, setConfig }) => {
	const interpolationTimeList = [
		0,
		500,
		1e3,
		1500,
		2e3,
		3e3,
		4e3,
		5e3
	];
	const qualityList = [
		10,
		25,
		50,
		100,
		200,
		500,
		1e3
	];
	const sizeList = [
		100,
		110,
		125,
		150,
		175,
		200,
		300
	];
	const bufferList = [
		1,
		5,
		10,
		20,
		30
	];
	const blurAmountList = [
		0,
		5,
		10,
		25,
		50,
		100,
		150,
		200,
		500
	];
	const opacityList = [
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
	return [
		{
			label: t("plugins.ambient-mode.menu.smoothness-transition.label"),
			submenu: interpolationTimeList.map((interpolationTime) => ({
				label: t("plugins.ambient-mode.menu.smoothness-transition.submenu.during", { interpolationTime: interpolationTime / 1e3 }),
				type: "radio",
				checked: config.interpolationTime === interpolationTime,
				click() {
					setConfig({ interpolationTime });
				}
			}))
		},
		{
			label: t("plugins.ambient-mode.menu.quality.label"),
			submenu: qualityList.map((quality) => ({
				label: t("plugins.ambient-mode.menu.quality.submenu.pixels", { quality }),
				type: "radio",
				checked: config.quality === quality,
				click() {
					setConfig({ quality });
				}
			}))
		},
		{
			label: t("plugins.ambient-mode.menu.size.label"),
			submenu: sizeList.map((size) => ({
				label: t("plugins.ambient-mode.menu.size.submenu.percent", { size }),
				type: "radio",
				checked: config.size === size,
				click() {
					setConfig({ size });
				}
			}))
		},
		{
			label: t("plugins.ambient-mode.menu.buffer.label"),
			submenu: bufferList.map((buffer) => ({
				label: t("plugins.ambient-mode.menu.buffer.submenu.buffer", { buffer }),
				type: "radio",
				checked: config.buffer === buffer,
				click() {
					setConfig({ buffer });
				}
			}))
		},
		{
			label: t("plugins.ambient-mode.menu.opacity.label"),
			submenu: opacityList.map((opacity) => ({
				label: t("plugins.ambient-mode.menu.opacity.submenu.percent", { opacity: opacity * 100 }),
				type: "radio",
				checked: config.opacity === opacity,
				click() {
					setConfig({ opacity });
				}
			}))
		},
		{
			label: t("plugins.ambient-mode.menu.blur-amount.label"),
			submenu: blurAmountList.map((blur) => ({
				label: t("plugins.ambient-mode.menu.blur-amount.submenu.pixels", { blurAmount: blur }),
				type: "radio",
				checked: config.blur === blur,
				click() {
					setConfig({ blur });
				}
			}))
		},
		{
			label: t("plugins.ambient-mode.menu.use-fullscreen.label"),
			type: "checkbox",
			checked: config.fullscreen,
			click(item) {
				setConfig({ fullscreen: item.checked });
			}
		}
	];
};
var defaultConfig = {
	enabled: false,
	quality: 50,
	buffer: 30,
	interpolationTime: 1500,
	blur: 100,
	size: 100,
	opacity: 1,
	fullscreen: false
};
var ambient_mode_default = createPlugin({
	name: () => t("plugins.ambient-mode.name"),
	description: () => t("plugins.ambient-mode.description"),
	restartNeeded: false,
	config: defaultConfig,
	stylesheets: [style_default],
	menu
});
const pluginStub = {
	name: () => t("plugins.ambient-mode.name"),
	description: () => t("plugins.ambient-mode.description"),
	restartNeeded: false,
	config: defaultConfig,
	stylesheets: [style_default],
	menu
};
export { ambient_mode_default as default, pluginStub };
