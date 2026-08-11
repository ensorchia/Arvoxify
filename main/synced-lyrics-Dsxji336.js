import { c as t, n as createBackend, r as createPlugin } from "./utils-Dk3QnH3H.js";
import { th as _enum } from "./schemas-BI4xZiF3.js";
import { net } from "electron";
var style_default = "#tab-renderer[page-type=MUSIC_PAGE_TYPE_TRACK_LYRICS]>*{display:none!important}#tab-renderer[page-type=MUSIC_PAGE_TYPE_TRACK_LYRICS]>#synced-lyrics-container{height:100%;display:block!important}#tab-renderer[page-type=MUSIC_PAGE_TYPE_TRACK_LYRICS]{scrollbar-width:none}@property --lyrics-duration{syntax:\"<time>\";inherits:false;initial-value:2s}:root{--global-margin:.7rem;--lyrics-padding:0;--lyrics-font-family:Satoshi,Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif;--lyrics-font-size:clamp(1.4rem,1.1vmax,3rem);--lyrics-line-height:var(--ytmusic-body-line-height);--lyrics-width:100%;--lyrics-inactive-font-weight:400;--lyrics-inactive-opacity:.33;--lyrics-inactive-scale:1;--lyrics-inactive-offset:0;--lyrics-active-font-weight:700;--lyrics-active-opacity:1;--lyrics-active-scale:1;--lyrics-active-offset:0;--lyrics-duration:2s;--lyrics-animations:lyrics-glow var(--lyrics-glow-duration)forwards,lyrics-wobble var(--lyrics-wobble-duration)forwards;--lyrics-scale-duration:.166s;--lyrics-opacity-transition:.33s;--lyrics-glow-duration:var(--lyrics-duration);--lyrics-wobble-duration:calc(var(--lyrics-duration)/2);--glow-color:#ffffff80}.lyric-container{height:100%;padding-top:16px}.description{text-align:left!important;font-size:clamp(1.4rem,1.1vmax,3rem)!important}.synced-line{width:var(--lyrics-width,100%);& .text-lyrics{cursor:pointer;padding-left:1.5rem}& .text-lyrics>.romaji{color:var(--ytmusic-text-secondary)!important;font-size:calc(var(--lyrics-font-size)*.7)!important;font-style:italic!important}}.synced-lyrics{text-align:left;justify-content:left;margin:.5rem 20px .5rem 0;transition:all .3s ease-in-out;display:block}.warning-lyrics{font-style:italic;color:var(--ytmusic-text-secondary)!important}.text-lyrics{padding-top:var(--lyrics-padding);padding-bottom:var(--lyrics-padding);scale:var(--lyrics-inactive-scale);translate:var(--lyrics-inactive-offset);transition:scale var(--lyrics-scale-duration),translate .3s ease-in-out;text-align:left;margin:var(--global-margin)0;transform-origin:0;display:block;font-family:var(--lyrics-font-family)!important;font-size:var(--lyrics-font-size)!important;font-weight:var(--lyrics-inactive-font-weight)!important;line-height:var(--lyrics-line-height)!important;&.lrc-header{padding:0;height:fit-content;padding-block:.2em;scale:.9;color:var(--ytmusic-color-grey5)!important}&>.romaji{color:var(--ytmusic-text-secondary)!important;font-size:calc(var(--lyrics-font-size)*.7)!important;font-style:italic!important}}.text-lyrics>span>span{white-space:pre-wrap;opacity:var(--lyrics-inactive-opacity);transition:opacity var(--lyrics-opacity-transition);display:inline-block}.current .text-lyrics{scale:var(--lyrics-active-scale);translate:var(--lyrics-active-offset);font-weight:var(--lyrics-active-font-weight)!important}.current .text-lyrics>span>span{opacity:var(--lyrics-active-opacity);animation:var(--lyrics-animations)}.lyrics-renderer{flex-direction:column;height:100%;display:flex}.lyrics-picker{flex-direction:row;justify-content:space-around;align-items:center;height:5em;padding-block:1em;display:flex}.lyrics-picker-content{flex-direction:column;justify-content:space-around;align-items:center;width:50%;display:flex}.lyrics-picker-content-label{width:100%;display:flex;overflow:hidden}.lyrics-picker-content-dots{list-style:none;display:block}.lyrics-picker-item{justify-content:center;align-items:center;min-width:100%;height:100%;transition:transform .25s ease-in-out;display:flex}.lyrics-picker-dot{cursor:pointer;border:1px solid #6e7c7c7f;border-radius:200px;width:5px;height:5px;margin:0 4px;display:inline-block}.lyrics-picker-left,.lyrics-picker-right{border-radius:25%;justify-content:center;align-items:center;transition:background-color .3s;display:flex;&:hover{background-color:#ffffff1a}}div:has(>.lyrics-picker){z-index:100;position:sticky!important;&>.lyrics-picker{backdrop-filter:blur(5px);transition:top .325s ease-in-out;position:relative;top:var(--lyrics-picker-top,0)!important}}@keyframes lyrics-wobble{0%{transform:translateY(0)}33.33%{transform:translateY(1.75px)}66.66%{transform:translateY(-1.75px)}to{transform:translateY(0)}}@keyframes lyrics-glow{0%{text-shadow:0 0 1.5rem var(--glow-color)}to{text-shadow:0 0 0 var(--glow-color)}}";
const providerNames = _enum(/* @__PURE__ */ function(ProviderNames$1) {
	ProviderNames$1["YTMusic"] = "YTMusic";
	ProviderNames$1["LRCLib"] = "LRCLib";
	ProviderNames$1["MusixMatch"] = "MusixMatch";
	ProviderNames$1["LyricsGenius"] = "LyricsGenius";
	return ProviderNames$1;
}({})).options;
const menu = async (ctx) => {
	const config = await ctx.getConfig();
	return [
		{
			label: t("plugins.synced-lyrics.menu.preferred-provider.label"),
			toolTip: t("plugins.synced-lyrics.menu.preferred-provider.tooltip"),
			type: "submenu",
			submenu: [{
				label: t("plugins.synced-lyrics.menu.preferred-provider.none.label"),
				toolTip: t("plugins.synced-lyrics.menu.preferred-provider.none.tooltip"),
				type: "radio",
				checked: config.preferredProvider === void 0,
				click() {
					ctx.setConfig({ preferredProvider: void 0 });
				}
			}, ...providerNames.map((provider) => ({
				label: provider,
				type: "radio",
				checked: config.preferredProvider === provider,
				click() {
					ctx.setConfig({ preferredProvider: provider });
				}
			}))]
		},
		{
			label: t("plugins.synced-lyrics.menu.precise-timing.label"),
			toolTip: t("plugins.synced-lyrics.menu.precise-timing.tooltip"),
			type: "checkbox",
			checked: config.preciseTiming,
			click(item) {
				ctx.setConfig({ preciseTiming: item.checked });
			}
		},
		{
			label: t("plugins.synced-lyrics.menu.line-effect.label"),
			toolTip: t("plugins.synced-lyrics.menu.line-effect.tooltip"),
			type: "submenu",
			submenu: [
				{
					label: t("plugins.synced-lyrics.menu.line-effect.submenu.fancy.label"),
					toolTip: t("plugins.synced-lyrics.menu.line-effect.submenu.fancy.tooltip"),
					type: "radio",
					checked: config.lineEffect === "fancy",
					click() {
						ctx.setConfig({ lineEffect: "fancy" });
					}
				},
				{
					label: t("plugins.synced-lyrics.menu.line-effect.submenu.scale.label"),
					toolTip: t("plugins.synced-lyrics.menu.line-effect.submenu.scale.tooltip"),
					type: "radio",
					checked: config.lineEffect === "scale",
					click() {
						ctx.setConfig({ lineEffect: "scale" });
					}
				},
				{
					label: t("plugins.synced-lyrics.menu.line-effect.submenu.offset.label"),
					toolTip: t("plugins.synced-lyrics.menu.line-effect.submenu.offset.tooltip"),
					type: "radio",
					checked: config.lineEffect === "offset",
					click() {
						ctx.setConfig({ lineEffect: "offset" });
					}
				},
				{
					label: t("plugins.synced-lyrics.menu.line-effect.submenu.focus.label"),
					toolTip: t("plugins.synced-lyrics.menu.line-effect.submenu.focus.tooltip"),
					type: "radio",
					checked: config.lineEffect === "focus",
					click() {
						ctx.setConfig({ lineEffect: "focus" });
					}
				}
			]
		},
		{
			label: t("plugins.synced-lyrics.menu.default-text-string.label"),
			toolTip: t("plugins.synced-lyrics.menu.default-text-string.tooltip"),
			type: "submenu",
			submenu: [
				{
					label: "♪",
					value: "♪"
				},
				{
					label: "\" \"",
					value: " "
				},
				{
					label: "...",
					value: [
						".",
						"..",
						"..."
					]
				},
				{
					label: "•••",
					value: [
						"•",
						"••",
						"•••"
					]
				},
				{
					label: "———",
					value: "———"
				}
			].map(({ label, value }) => ({
				label,
				type: "radio",
				checked: typeof value === "string" ? config.defaultTextString === value : JSON.stringify(config.defaultTextString) === JSON.stringify(value),
				click() {
					ctx.setConfig({ defaultTextString: value });
				}
			}))
		},
		{
			label: t("plugins.synced-lyrics.menu.romanization.label"),
			toolTip: t("plugins.synced-lyrics.menu.romanization.tooltip"),
			type: "checkbox",
			checked: config.romanization,
			click(item) {
				ctx.setConfig({ romanization: item.checked });
			}
		},
		{
			label: t("plugins.synced-lyrics.menu.show-time-codes.label"),
			toolTip: t("plugins.synced-lyrics.menu.show-time-codes.tooltip"),
			type: "checkbox",
			checked: config.showTimeCodes,
			click(item) {
				ctx.setConfig({ showTimeCodes: item.checked });
			}
		},
		{
			label: t("plugins.synced-lyrics.menu.show-lyrics-even-if-inexact.label"),
			toolTip: t("plugins.synced-lyrics.menu.show-lyrics-even-if-inexact.tooltip"),
			type: "checkbox",
			checked: config.showLyricsEvenIfInexact,
			click(item) {
				ctx.setConfig({ showLyricsEvenIfInexact: item.checked });
			}
		}
	];
};
var handlers = { async fetch(url, init) {
	const res = await net.fetch(url, init);
	return [
		res.status,
		await res.text(),
		Object.fromEntries(res.headers.entries())
	];
} };
const backend = createBackend({
	start(ctx) {
		ctx.ipc.handle("synced-lyrics:fetch", (url, init) => handlers.fetch(url, init));
	},
	stop(ctx) {
		ctx.ipc.removeHandler("synced-lyrics:fetch");
	}
});
var synced_lyrics_default = createPlugin({
	name: () => t("plugins.synced-lyrics.name"),
	description: () => t("plugins.synced-lyrics.description"),
	authors: [
		"Non0reo",
		"ArjixWasTaken",
		"KimJammer",
		"Strvm"
	],
	restartNeeded: true,
	addedVersion: "3.5.X",
	config: {
		enabled: false,
		preciseTiming: true,
		showLyricsEvenIfInexact: true,
		showTimeCodes: false,
		defaultTextString: "♪",
		lineEffect: "fancy",
		romanization: true
	},
	menu,
	backend,
	stylesheets: [style_default]
});
const pluginStub = {
	name: () => t("plugins.synced-lyrics.name"),
	description: () => t("plugins.synced-lyrics.description"),
	authors: [
		"Non0reo",
		"ArjixWasTaken",
		"KimJammer",
		"Strvm"
	],
	restartNeeded: true,
	addedVersion: "3.5.X",
	config: {
		enabled: false,
		preciseTiming: true,
		showLyricsEvenIfInexact: true,
		showTimeCodes: false,
		defaultTextString: "♪",
		lineEffect: "fancy",
		romanization: true
	},
	menu,
	stylesheets: [style_default]
};
export { synced_lyrics_default as default, pluginStub };
