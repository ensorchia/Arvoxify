import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var force_hide_default = ".video-toggle-force-hide #main-panel{display:none!important}.video-toggle-force-hide .side-panel.ytmusic-player-page{width:100%!important;max-width:100%!important;margin:0!important}";
var button_switcher_default = ".video-toggle-custom-mode #main-panel.ytmusic-player-page{align-items:unset!important}.video-toggle-custom-mode #main-panel{position:relative}.video-toggle-custom-mode .video-switch-button{z-index:999;box-sizing:border-box;text-align:center;letter-spacing:1px;color:#fff;background:#21212166;border-radius:30px;width:20rem;margin-top:20px;margin-left:10px;padding:0 10rem 0 0;font-size:18px;position:absolute;overflow:hidden}.video-toggle-custom-mode .video-switch-button:before{content:attr(data-video-button-text);z-index:3;pointer-events:none;justify-content:center;align-items:center;width:10rem;display:flex;position:absolute;top:0;bottom:0;right:0}.video-toggle-custom-mode .video-switch-button-checkbox{cursor:pointer;opacity:0;z-index:2;width:100%;height:100%;position:absolute;top:0;bottom:0;left:0}.video-toggle-custom-mode .video-switch-button-label-span{position:relative}.video-toggle-custom-mode .video-switch-button-checkbox:checked+.video-switch-button-label:before{transition:transform .3s linear;transform:translate(10rem)}.video-toggle-custom-mode .video-switch-button-checkbox+.video-switch-button-label{user-select:none;pointer-events:none;padding:15px 0;display:block;position:relative}.video-toggle-custom-mode .video-switch-button-checkbox+.video-switch-button-label:before{content:\"\";background:#3c3c3c66;border-radius:30px;width:100%;height:100%;transition:transform .3s;position:absolute;top:0;left:0;transform:translate(0)}.video-toggle-custom-mode #av-id{display:none}";
var video_toggle_default = createPlugin({
	name: () => t("plugins.video-toggle.name"),
	description: () => t("plugins.video-toggle.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		hideVideo: false,
		mode: "custom",
		forceHide: false,
		align: "left"
	},
	stylesheets: [button_switcher_default, force_hide_default],
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [
			{
				label: t("plugins.video-toggle.menu.mode.label"),
				submenu: [
					{
						label: t("plugins.video-toggle.menu.mode.submenu.custom"),
						type: "radio",
						checked: config.mode === "custom",
						click() {
							setConfig({ mode: "custom" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.mode.submenu.native"),
						type: "radio",
						checked: config.mode === "native",
						click() {
							setConfig({ mode: "native" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.mode.submenu.disabled"),
						type: "radio",
						checked: config.mode === "disabled",
						click() {
							setConfig({ mode: "disabled" });
						}
					}
				]
			},
			{
				label: t("plugins.video-toggle.menu.align.label"),
				submenu: [
					{
						label: t("plugins.video-toggle.menu.align.submenu.left"),
						type: "radio",
						checked: config.align === "left",
						click() {
							setConfig({ align: "left" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.align.submenu.middle"),
						type: "radio",
						checked: config.align === "middle",
						click() {
							setConfig({ align: "middle" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.align.submenu.right"),
						type: "radio",
						checked: config.align === "right",
						click() {
							setConfig({ align: "right" });
						}
					}
				]
			},
			{
				label: t("plugins.video-toggle.menu.force-hide"),
				type: "checkbox",
				checked: config.forceHide,
				click(item) {
					setConfig({ forceHide: item.checked });
				}
			}
		];
	}
});
const pluginStub = {
	name: () => t("plugins.video-toggle.name"),
	description: () => t("plugins.video-toggle.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		hideVideo: false,
		mode: "custom",
		forceHide: false,
		align: "left"
	},
	stylesheets: [button_switcher_default, force_hide_default],
	menu: async ({ getConfig, setConfig }) => {
		const config = await getConfig();
		return [
			{
				label: t("plugins.video-toggle.menu.mode.label"),
				submenu: [
					{
						label: t("plugins.video-toggle.menu.mode.submenu.custom"),
						type: "radio",
						checked: config.mode === "custom",
						click() {
							setConfig({ mode: "custom" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.mode.submenu.native"),
						type: "radio",
						checked: config.mode === "native",
						click() {
							setConfig({ mode: "native" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.mode.submenu.disabled"),
						type: "radio",
						checked: config.mode === "disabled",
						click() {
							setConfig({ mode: "disabled" });
						}
					}
				]
			},
			{
				label: t("plugins.video-toggle.menu.align.label"),
				submenu: [
					{
						label: t("plugins.video-toggle.menu.align.submenu.left"),
						type: "radio",
						checked: config.align === "left",
						click() {
							setConfig({ align: "left" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.align.submenu.middle"),
						type: "radio",
						checked: config.align === "middle",
						click() {
							setConfig({ align: "middle" });
						}
					},
					{
						label: t("plugins.video-toggle.menu.align.submenu.right"),
						type: "radio",
						checked: config.align === "right",
						click() {
							setConfig({ align: "right" });
						}
					}
				]
			},
			{
				label: t("plugins.video-toggle.menu.force-hide"),
				type: "checkbox",
				checked: config.forceHide,
				click(item) {
					setConfig({ forceHide: item.checked });
				}
			}
		];
	}
};
export { video_toggle_default as default, pluginStub };
