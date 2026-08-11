import fs from "node:fs";
import { net } from "electron";
var isLoaded = false;
var cssToInject = /* @__PURE__ */ new Map();
var cssToInjectFile = /* @__PURE__ */ new Map();
const injectCSS = async (webContents, css) => {
	if (isLoaded) {
		const key = await webContents.insertCSS(css);
		return async () => await webContents.removeInsertedCSS(key);
	}
	return new Promise((resolve) => {
		if (cssToInject.size === 0 && cssToInjectFile.size === 0) setupCssInjection(webContents);
		cssToInject.set(css, resolve);
	});
};
const injectCSSAsFile = async (webContents, filepath) => {
	if (isLoaded) {
		const key = await webContents.insertCSS(fs.readFileSync(filepath, "utf-8"));
		return async () => await webContents.removeInsertedCSS(key);
	}
	return new Promise((resolve) => {
		if (cssToInject.size === 0 && cssToInjectFile.size === 0) setupCssInjection(webContents);
		cssToInjectFile.set(filepath, resolve);
	});
};
var setupCssInjection = (webContents) => {
	webContents.on("did-finish-load", () => {
		isLoaded = true;
		cssToInject.forEach(async (callback, css) => {
			const key = await webContents.insertCSS(css);
			const remove = async () => await webContents.removeInsertedCSS(key);
			callback?.(remove);
		});
		cssToInjectFile.forEach(async (callback, filepath) => {
			const key = await webContents.insertCSS(fs.readFileSync(filepath, "utf-8"));
			const remove = async () => await webContents.removeInsertedCSS(key);
			callback?.(remove);
		});
	});
};
const fileExists = (path, callbackIfExists, callbackIfError = void 0) => {
	fs.access(path, fs.constants.F_OK, (error) => {
		if (error) {
			callbackIfError?.();
			return;
		}
		callbackIfExists();
	});
};
const getNetFetchAsFetch = () => (async (input, init) => {
	const url = typeof input === "string" ? new URL(input) : input instanceof URL ? input : new URL(input.url);
	if (init?.body && !init.method) init.method = "POST";
	const request = new Request(url, input instanceof Request ? input : void 0);
	return net.fetch(request, init);
});
export { injectCSSAsFile as i, fileExists as n, injectCSS as r, getNetFetchAsFetch as t };
