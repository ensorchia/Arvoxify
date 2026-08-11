import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import prompt from "custom-electron-prompt";
var style_default = ".music-together-button{cursor:pointer;margin-left:8px;display:inline-flex;& svg{fill:#ffffff80;width:24px;height:24px}&:hover svg:hover{fill:#fff}}#right-content>.music-together-divider{width:1px;height:26px;margin-left:16px;margin-right:8px}.music-together-divider{background-color:#ffffff26}.music-together-divider.horizontal{width:100%;height:1px}.music-together-divider.vertical{width:1px;height:100%}.music-together-tool{opacity:0;pointer-events:none;align-items:center;gap:8px;transition:all .225s ease-out;display:flex;position:absolute;translate:50%;&.open{position:unset;opacity:1;pointer-events:all;translate:0}}.music-together-popup{z-index:1000;position:fixed}.music-together-popup-container{border-radius:10px!important}.music-together-item{--iron-icon-fill-color:#fff;align-items:center;height:48px;padding:0 8px;display:flex;&:not([is-disabled]){cursor:pointer}&:hover{background-color:var(--ytmusic-menu-item-hover-background-color,#ffffff0d)}}.music-together-status{flex-direction:column;align-items:stretch;padding:16px;display:flex}.music-together-profile{border-radius:50%;flex-shrink:0;width:24px;height:24px;overflow:hidden}.music-together-profile.big{width:32px;height:32px}.music-together-status-container{flex-direction:row;flex:1;align-items:flex-start;gap:16px;display:flex}.music-together-status-item{white-space:nowrap;text-overflow:ellipsis;flex-direction:column;align-items:flex-start;gap:4px;font-size:14px;font-weight:400;display:inline-flex;overflow:hidden}.music-together-user-container{flex-direction:row;justify-content:flex-start;align-items:center;gap:8px;padding-top:16px;font-size:14px;display:flex}.music-together-empty{color:#ffffff80;text-align:center;width:100%;font-size:14px}.music-together-owner{border-radius:50%;flex-shrink:0;width:24px;height:24px;margin-left:8px}.music-together-name{color:#fff;margin-left:8px;font-size:14px;display:none}ytmusic-player-queue-item:hover .music-together-name{display:unset}";
var music_together_default = createPlugin({
	name: () => t("plugins.music-together.name"),
	description: () => t("plugins.music-together.description"),
	restartNeeded: false,
	addedVersion: "3.2.X",
	config: { enabled: false },
	stylesheets: [style_default],
	backend({ ipc }) {
		ipc.handle("music-together:prompt", async (title, label) => prompt({
			title,
			label,
			type: "input",
			...prompt_options_default()
		}));
	}
});
const pluginStub = {
	name: () => t("plugins.music-together.name"),
	description: () => t("plugins.music-together.description"),
	restartNeeded: false,
	addedVersion: "3.2.X",
	config: { enabled: false },
	stylesheets: [style_default]
};
export { music_together_default as default, pluginStub };
