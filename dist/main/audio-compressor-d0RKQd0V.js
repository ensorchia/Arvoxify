import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var lazySafeTry = (...fns) => {
	for (const fn of fns) try {
		fn();
	} catch {}
};
var Storage = class {
	lastSource = null;
	lastContext = null;
	lastCompressor = null;
	connected = /* @__PURE__ */ new WeakMap();
	connectToCompressor = (source = null, audioContext = null, compressor = null) => {
		if (!(source && audioContext && compressor)) return false;
		const current = this.connected.get(source);
		if (current === compressor) return false;
		this.lastSource = source;
		this.lastContext = audioContext;
		this.lastCompressor = compressor;
		if (current) lazySafeTry(() => source.disconnect(current), () => current.disconnect(audioContext.destination));
		else lazySafeTry(() => source.disconnect(audioContext.destination));
		try {
			source.connect(compressor);
			compressor.connect(audioContext.destination);
			this.connected.set(source, compressor);
			return true;
		} catch (error) {
			console.error("connectToCompressor failed", error);
			return false;
		}
	};
	disconnectCompressor = () => {
		const source = this.lastSource;
		const audioContext = this.lastContext;
		if (!(source && audioContext)) return false;
		const current = this.connected.get(source);
		if (!current) return false;
		lazySafeTry(() => source.connect(audioContext.destination), () => source.disconnect(current), () => current.disconnect(audioContext.destination));
		this.connected.delete(source);
		return true;
	};
};
new Storage();
var audio_compressor_default = createPlugin({
	name: () => t("plugins.audio-compressor.name"),
	description: () => t("plugins.audio-compressor.description")
});
const pluginStub = {
	name: () => t("plugins.audio-compressor.name"),
	description: () => t("plugins.audio-compressor.description")
};
export { audio_compressor_default as default, pluginStub };
