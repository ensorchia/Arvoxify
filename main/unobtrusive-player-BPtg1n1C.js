import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var style_default = "body.unobtrusive-player.unobtrusive-player--did-play{overflow:visible!important;& ytmusic-player-page,& ytmusic-player-page *{visibility:hidden!important}& #content{visibility:visible!important}& ytmusic-app-layout:not(.content-scrolled) #nav-bar-background.ytmusic-app-layout,& ytmusic-app-layout:not(.content-scrolled) #nav-bar-divider.ytmusic-app-layout,& ytmusic-app-layout[is-bauhaus-sidenav-enabled][player-page-open]:not(.content-scrolled) #mini-guide-background.ytmusic-app-layout{opacity:0!important}& .toggle-player-page-button{transform:rotate(180deg)!important}}";
var unobtrusive_player_default = createPlugin({
	name: () => t("plugins.unobtrusive-player.name"),
	description: () => t("plugins.unobtrusive-player.description"),
	addedVersion: "3.8.x",
	restartNeeded: false,
	config: { enabled: false },
	stylesheets: [style_default]
});
const pluginStub = {
	name: () => t("plugins.unobtrusive-player.name"),
	description: () => t("plugins.unobtrusive-player.description"),
	addedVersion: "3.8.x",
	restartNeeded: false,
	config: { enabled: false },
	stylesheets: [style_default]
};
export { unobtrusive_player_default as default, pluginStub };
