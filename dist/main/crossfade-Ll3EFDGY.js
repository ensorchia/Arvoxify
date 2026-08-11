import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { t as getNetFetchAsFetch } from "./main-BYv-PhVX.js";
import { t as Innertube } from "./node-uWJIOUoK.js";
import prompt from "custom-electron-prompt";
var crossfade_default = createPlugin({
	name: () => t("plugins.crossfade.name"),
	description: () => t("plugins.crossfade.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		fadeInDuration: 1500,
		fadeOutDuration: 5e3,
		secondsBeforeEnd: 10,
		fadeScaling: "linear"
	},
	menu({ window, getConfig, setConfig }) {
		const promptCrossfadeValues = async (win, options) => {
			const res = await prompt({
				title: t("plugins.crossfade.prompt.options"),
				type: "multiInput",
				multiInputOptions: [
					{
						label: t("plugins.crossfade.prompt.options.multi-input.fade-in-duration"),
						value: options.fadeInDuration,
						inputAttrs: {
							type: "number",
							required: true,
							min: "0",
							step: "100"
						}
					},
					{
						label: t("plugins.crossfade.prompt.options.multi-input.fade-out-duration"),
						value: options.fadeOutDuration,
						inputAttrs: {
							type: "number",
							required: true,
							min: "0",
							step: "100"
						}
					},
					{
						label: t("plugins.crossfade.prompt.options.multi-input.seconds-before-end"),
						value: options.secondsBeforeEnd,
						inputAttrs: {
							type: "number",
							required: true,
							min: "0"
						}
					},
					{
						label: t("plugins.crossfade.prompt.options.multi-input.fade-scaling.label"),
						selectOptions: {
							linear: t("plugins.crossfade.prompt.options.multi-input.fade-scaling.linear"),
							logarithmic: t("plugins.crossfade.prompt.options.multi-input.fade-scaling.logarithmic")
						},
						value: options.fadeScaling
					}
				],
				resizable: true,
				height: 360,
				...prompt_options_default()
			}, win).catch(console.error);
			if (!res) return;
			let fadeScaling;
			if (res[3] === "linear" || res[3] === "logarithmic") fadeScaling = res[3];
			else if (isFinite(Number(res[3]))) fadeScaling = Number(res[3]);
			else fadeScaling = options.fadeScaling;
			return {
				fadeInDuration: Number(res[0]),
				fadeOutDuration: Number(res[1]),
				secondsBeforeEnd: Number(res[2]),
				fadeScaling
			};
		};
		return [{
			label: t("plugins.crossfade.menu.advanced"),
			async click() {
				const newOptions = await promptCrossfadeValues(window, await getConfig());
				if (newOptions) setConfig(newOptions);
			}
		}];
	},
	async backend({ ipc }) {
		const yt = await Innertube.create({ fetch: getNetFetchAsFetch() });
		ipc.handle("audio-url", async (videoID) => {
			return (await yt.getBasicInfo(videoID)).streaming_data?.formats[0].decipher(yt.session.player);
		});
	}
});
const pluginStub = {
	name: () => t("plugins.crossfade.name"),
	description: () => t("plugins.crossfade.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		fadeInDuration: 1500,
		fadeOutDuration: 5e3,
		secondsBeforeEnd: 10,
		fadeScaling: "linear"
	},
	menu({ window, getConfig, setConfig }) {
		const promptCrossfadeValues = async (win, options) => {
			const res = await prompt({
				title: t("plugins.crossfade.prompt.options"),
				type: "multiInput",
				multiInputOptions: [
					{
						label: t("plugins.crossfade.prompt.options.multi-input.fade-in-duration"),
						value: options.fadeInDuration,
						inputAttrs: {
							type: "number",
							required: true,
							min: "0",
							step: "100"
						}
					},
					{
						label: t("plugins.crossfade.prompt.options.multi-input.fade-out-duration"),
						value: options.fadeOutDuration,
						inputAttrs: {
							type: "number",
							required: true,
							min: "0",
							step: "100"
						}
					},
					{
						label: t("plugins.crossfade.prompt.options.multi-input.seconds-before-end"),
						value: options.secondsBeforeEnd,
						inputAttrs: {
							type: "number",
							required: true,
							min: "0"
						}
					},
					{
						label: t("plugins.crossfade.prompt.options.multi-input.fade-scaling.label"),
						selectOptions: {
							linear: t("plugins.crossfade.prompt.options.multi-input.fade-scaling.linear"),
							logarithmic: t("plugins.crossfade.prompt.options.multi-input.fade-scaling.logarithmic")
						},
						value: options.fadeScaling
					}
				],
				resizable: true,
				height: 360,
				...prompt_options_default()
			}, win).catch(console.error);
			if (!res) return;
			let fadeScaling;
			if (res[3] === "linear" || res[3] === "logarithmic") fadeScaling = res[3];
			else if (isFinite(Number(res[3]))) fadeScaling = Number(res[3]);
			else fadeScaling = options.fadeScaling;
			return {
				fadeInDuration: Number(res[0]),
				fadeOutDuration: Number(res[1]),
				secondsBeforeEnd: Number(res[2]),
				fadeScaling
			};
		};
		return [{
			label: t("plugins.crossfade.menu.advanced"),
			async click() {
				const newOptions = await promptCrossfadeValues(window, await getConfig());
				if (newOptions) setConfig(newOptions);
			}
		}];
	}
};
export { crossfade_default as default, pluginStub };
