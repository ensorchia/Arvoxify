import { a as __toCommonJS, i as __require, n as __esmMin, r as __export, s as __toESM, t as __commonJSMin } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import { n as require_src, t as require_electron_localshortcut } from "./electron-localshortcut-C08GypUP.js";
import { t as require_sax } from "./sax-CsO4YRek.js";
import { _ as deepmerge, a as setPartial, c as enable, f as restart, g as mainPlugins, h as allPlugins, i as setMenuOption, l as getPlugins, m as defaultConfig, n as get, o as watch, p as setupAppControls, r as set, s as disable, t as edit, u as isEnabled, v as require_semver } from "./config-n3n9Pwqt.js";
import { t as electron_is_dev_default } from "./electron-is-dev-sNMn9GQd.js";
import { a as stopPlugin, c as t, i as startPlugin, o as loadI18n, s as setLanguage, t as LoggerPrefix, u as languageResources } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { i as injectCSSAsFile, n as fileExists, r as injectCSS } from "./main-BYv-PhVX.js";
import { i as setupProtocolHandler, r as handleProtocol, s as setUpTray, t as APP_PROTOCOL } from "./protocol-handler-CuLMm9Mx.js";
import { o as setupSongInfo } from "./song-info-BTWNuwrN.js";
import "./song-controls-DP9OiftJ.js";
import path from "node:path";
import url from "node:url";
import fs from "node:fs";
import { BrowserWindow, Menu, app, clipboard, dialog, globalShortcut, ipcMain, protocol, screen, session, shell } from "electron";
import crypto from "crypto";
import process$1 from "node:process";
import os from "node:os";
import { inspect } from "node:util";
import { join as join$1 } from "path";
import prompt from "custom-electron-prompt";
import __cjs_mod__ from "node:module";
import.meta.filename;
import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
var require_config = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var presets = {
		chrome: {
			supportedSchemes: [
				"http",
				"https",
				"file",
				"ftp"
			],
			schemeStarMatchesWs: false
		},
		firefox: {
			supportedSchemes: [
				"http",
				"https",
				"ws",
				"wss",
				"ftp",
				"file"
			],
			schemeStarMatchesWs: true
		}
	};
	exports.presets = presets;
	exports.defaultOptions = Object.assign(Object.assign({}, presets.chrome), { strict: true });
}));
var require_escaping = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.regexEscape = regexEscape;
	exports.exact = exact;
	exports.regexLength = regexLength;
	var _regex$4 = require_regex();
	var asciis = Array.from({ length: 128 }, (_, i$1) => String.fromCodePoint(i$1));
	var getChars = (flags) => {
		const flagSet = new Set(flags);
		flagSet.delete("i");
		flags = [...flagSet].join("");
		return asciis.map((ch) => {
			const escaped = `\\x${ch.codePointAt(0).toString(16).padStart(2, "0")}`;
			let inClass = escaped;
			let outsideClass = escaped;
			let agnostic = escaped;
			try {
				const inClassRe = new RegExp(`[${ch}]`, flags);
				new RegExp(`[${ch}${ch}]`, flags);
				new RegExp(`[${ch}${ch}\0]`, flags);
				if (inClassRe.test(ch) && !asciis.filter((x) => x !== ch).some((x) => inClassRe.test(x))) inClass = ch;
				else {
					new RegExp(`[\\${ch}]`, flags);
					inClass = `\\${ch}`;
				}
			} catch (_a$1) {
				try {
					new RegExp(`[\\${ch}]`, flags);
					inClass = `\\${ch}`;
				} catch (_b) {}
			}
			try {
				const outsideClassRe = new RegExp(`^${ch}$`, flags);
				if (outsideClassRe.test(ch) && !asciis.filter((x) => x !== ch).some((x) => outsideClassRe.test(x))) outsideClass = ch;
				else {
					new RegExp(`\\${ch}`, flags);
					outsideClass = `\\${ch}`;
				}
			} catch (_c) {
				try {
					new RegExp(`\\${ch}`, flags);
					outsideClass = `\\${ch}`;
				} catch (_d) {}
			}
			if (inClass !== outsideClass) try {
				new RegExp(`\\${ch}`, flags);
				new RegExp(`\\${ch}`, flags);
				agnostic = `\\${ch}`;
			} catch (_e) {}
			else agnostic = [inClass, outsideClass].sort((a, b) => b.length - a.length)[0];
			return {
				ch,
				agnostic,
				inClass,
				outsideClass
			};
		}).filter((x) => x.inClass !== x.ch || x.outsideClass !== x.ch);
	};
	var cache = /* @__PURE__ */ new Map();
	var getContextAgnosticMap = (flags) => {
		const cached = cache.get(flags);
		if (cached) return cached;
		const obj = Object.fromEntries(getChars(flags).map((x) => [x.ch, x.agnostic]));
		cache.set(flags, obj);
		return obj;
	};
	exports.getContextAgnosticMap = getContextAgnosticMap;
	function regexEscape(input, flags = "u") {
		const contextAgnosticMap = getContextAgnosticMap(flags);
		const chars = Object.values(contextAgnosticMap);
		const replacer = (str) => str.replace(new RegExp(`[${chars.join("")}]`, [...new Set([...flags, ..."g"])].join("")), (m) => contextAgnosticMap[m]);
		return new _regex$4.RegexFragment(replacer(input));
	}
	function exact(input, flags) {
		return (0, _regex$4.regex)(flags)`${input}`;
	}
	function regexLength(input) {
		return input.replace(/\\(?:\w\{[^}]+\}|u[0-9a-f]{4}|x[0-9a-f]{2}|[0-8]{3}|c[A-Z]|.)/gi, ".").length;
	}
}));
var require_regex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.regex = regex;
	var _escaping$1 = require_escaping();
	var RegexFragment = class extends String {};
	exports.RegexFragment = RegexFragment;
	var LazyAlternation = class extends Array {
		constructor(...args) {
			super(...Array.isArray(args[0]) ? args[0] : args);
		}
	};
	exports.LazyAlternation = LazyAlternation;
	var flagMap = {
		global: "g",
		ignoreCase: "i",
		multiline: "m",
		dotAll: "s",
		sticky: "y",
		unicode: "u"
	};
	var commentRegex = /(\\*)#(.*)/g;
	var isContentful = (x) => x !== false && x != null;
	var commentReplacer = (_m, slashes, after) => {
		if (slashes.length % 2) return slashes.slice(1) + "#" + after.replace(commentRegex, commentReplacer);
		return slashes;
	};
	var processSub = (flags) => (sub) => {
		if (sub instanceof RegExp) if (sub.flags === flags) return sub.source;
		else {
			const mapIn = (0, _escaping$1.getContextAgnosticMap)(sub.flags);
			const mapOut = (0, _escaping$1.getContextAgnosticMap)(flags);
			const diff = [];
			for (const ch of Object.keys(mapIn)) if (mapIn[ch] !== mapOut[ch]) diff.push(mapIn[ch]);
			for (const ch of Object.keys(mapOut)) if (mapIn[ch] !== mapOut[ch]) diff.push(ch);
			const re = new RegExp(`(?:${diff.map((x) => (0, _escaping$1.regexEscape)(x, "i")).join("|")})`, "gi");
			return !diff.length ? sub.source : sub.source.replace(re, (m) => {
				var _a$1;
				return (_a$1 = mapOut[m.startsWith("\\") ? m.slice(1) : m]) !== null && _a$1 !== void 0 ? _a$1 : m;
			});
		}
		else if (typeof sub === "string") return (0, _escaping$1.regexEscape)(sub, flags);
		else return String(isContentful(sub) ? sub : "");
	};
	var _regex$3 = (options$1 = {}) => (template, ...substitutions) => {
		let source = "";
		let flagArr = [];
		if (typeof options$1 === "string") flagArr = [...options$1];
		else Object.entries(flagMap).forEach(([k, v]) => {
			if (options$1[k]) flagArr.push(v);
		});
		const flags = flagArr.sort((a, b) => a.localeCompare(b)).join("");
		template.raw.forEach((segment, idx) => {
			source += segment.replace(commentRegex, commentReplacer).replace(/\\`/g, "`").replace(/(\\*)(\s+)/g, (_m, slashes, space) => {
				if (space[0] === " " && slashes.length % 2) return slashes.slice(1) + space[0];
				return slashes;
			});
			const sub = substitutions[idx];
			if (Array.isArray(sub)) {
				const mult = sub instanceof LazyAlternation ? -1 : 1;
				source += `(?:${[...new Set([...sub.filter(isContentful).map((x) => String(processSub(flags)(x)))])].sort((a, b) => mult * ((0, _escaping$1.regexLength)(b) - (0, _escaping$1.regexLength)(a))).join("|")})`;
			} else source += processSub(flags)(sub);
		});
		return new RegExp(source, flags);
	};
	function regex(...args) {
		if (Array.isArray(args[0])) {
			const [template, ...substitutions] = args;
			return _regex$3("")(template, ...substitutions);
		} else {
			const [flags] = args;
			return _regex$3(flags);
		}
	}
}));
var require_unwrap = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.unwrap = unwrap;
	var _regex$2 = require_regex();
	function unwrap(re, flags) {
		const fragment = re.source.replace(/^\^?([\s\S]*?)\$?$/, "$1");
		return (0, _regex$2.regex)(flags !== null && flags !== void 0 ? flags : re.flags)`${new _regex$2.RegexFragment(fragment)}`;
	}
}));
var require_proxy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var _regex$1 = require_regex();
	exports.proxy = new Proxy(_regex$1.regex, {
		get(target, flags) {
			return target(flags === "_" ? "" : flags);
		},
		apply(target, _thisArg, args) {
			return target(...args);
		}
	});
}));
var require_dist$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "regex", {
		enumerable: true,
		get: function() {
			return _regex.regex;
		}
	});
	Object.defineProperty(exports, "RegexFragment", {
		enumerable: true,
		get: function() {
			return _regex.RegexFragment;
		}
	});
	Object.defineProperty(exports, "LazyAlternation", {
		enumerable: true,
		get: function() {
			return _regex.LazyAlternation;
		}
	});
	Object.defineProperty(exports, "exact", {
		enumerable: true,
		get: function() {
			return _escaping.exact;
		}
	});
	Object.defineProperty(exports, "regexEscape", {
		enumerable: true,
		get: function() {
			return _escaping.regexEscape;
		}
	});
	Object.defineProperty(exports, "unwrap", {
		enumerable: true,
		get: function() {
			return _unwrap.unwrap;
		}
	});
	Object.defineProperty(exports, "proxy", {
		enumerable: true,
		get: function() {
			return _proxy.proxy;
		}
	});
	var _regex = require_regex();
	var _escaping = require_escaping();
	var _unwrap = require_unwrap();
	var _proxy = require_proxy();
}));
var require_getDummyUrl = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getDummyUrl = getDummyUrl;
	var _fancyRegex$3 = require_dist$2();
	var DELIMS = /^|$|[/?=&\-]/;
	function getDummyUrl(patternSegments, replacements = {}) {
		const { rawHost, rawPathAndQuery } = patternSegments;
		const { defaultScheme = "https", subdomain = "", pathAndQueryReplacer = "", rootDomain = "example.com", strict = true } = replacements;
		let host;
		const scheme = patternSegments.scheme === "*" ? defaultScheme : patternSegments.scheme;
		if (scheme === "file") host = "";
		else if (rawHost === "*") host = [subdomain, rootDomain].filter(Boolean).join(".");
		else host = rawHost.replace(/^\*./, subdomain ? `${subdomain}.` : "");
		const pathAndQuery = (strict ? rawPathAndQuery : "/*").replace(/\*/g, `-${pathAndQueryReplacer}-`).replace((0, _fancyRegex$3.regex)("g")`-+(${DELIMS})`, "$1").replace((0, _fancyRegex$3.regex)("g")`(${DELIMS})-+`, "$1").replace(/\/+/g, "/");
		try {
			return new URL(`${scheme}://${host}${pathAndQuery}`);
		} catch (_e) {
			return null;
		}
	}
}));
var require_constants = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ALL_URLS = "<all_urls>";
}));
var require_getPatternSegments = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getPatternSegments = getPatternSegments;
	var _fancyRegex$2 = require_dist$2();
	var _constants$1 = require_constants();
	var patternRegex = (0, _fancyRegex$2.regex)()`
	^
		(\*|\w+)      # scheme
		://
		(
			\*     |  # Any host
			[^/\#]*     # Only the given host (optional only if scheme is file)
		)
		(/[^\r\n\#]*) # path
	$
`;
	function getPatternSegments(pattern) {
		if (pattern === _constants$1.ALL_URLS) return {
			pattern,
			scheme: "*",
			rawHost: "*",
			rawPathAndQuery: "/*"
		};
		const m = pattern.match(patternRegex);
		if (!m) return null;
		const [, scheme, rawHost, rawPathAndQuery] = m;
		return {
			pattern,
			scheme,
			rawHost,
			rawPathAndQuery
		};
	}
}));
var require_getExampleUrls = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getExampleUrls = getExampleUrls;
	var _getDummyUrl$1 = require_getDummyUrl();
	var _getPatternSegments$1 = require_getPatternSegments();
	function getExampleUrls(pattern, options$1) {
		const patternSegments = (0, _getPatternSegments$1.getPatternSegments)(pattern);
		const { supportedSchemes, strict } = options$1;
		const subdomains = [
			"",
			"www",
			"foo.bar"
		];
		const rootDomains = ["example.com"];
		const pathAndQueryReplacers = [
			"",
			"foo",
			"/bar/baz/"
		];
		const all = supportedSchemes.flatMap((defaultScheme) => subdomains.flatMap((subdomain) => rootDomains.flatMap((rootDomain) => pathAndQueryReplacers.flatMap((pathAndQueryReplacer) => (0, _getDummyUrl$1.getDummyUrl)(patternSegments, {
			defaultScheme,
			subdomain,
			rootDomain,
			pathAndQueryReplacer,
			strict
		})))));
		return [...new Set(all.filter(Boolean).map((url$1) => url$1.href))];
	}
}));
var require_getHostRegex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getHostRegex = getHostRegex;
	var _fancyRegex$1 = require_dist$2();
	var _getDummyUrl = require_getDummyUrl();
	function getHostRegex(patternSegments) {
		const { pattern, scheme, rawHost } = patternSegments;
		if (!rawHost && scheme !== "file") return /* @__PURE__ */ new TypeError("Host is optional only if the scheme is \"file\".");
		const isStarHost = rawHost.includes("*");
		if (isStarHost) {
			const segments = rawHost.split("*.");
			if (rawHost.length > 1 && (segments.length !== 2 || segments[0] || !segments[1])) return /* @__PURE__ */ new TypeError("Host can contain only one wildcard at the start, in the form \"*.<host segments>\"");
		}
		const dummyUrl = (0, _getDummyUrl.getDummyUrl)(patternSegments, { subdomain: "" });
		if (!dummyUrl) return /* @__PURE__ */ new TypeError(`Pattern "${pattern}" cannot be used to construct a valid URL.`);
		const dummyHost = dummyUrl.host;
		if (/:\d+$/.test(dummyHost)) return /* @__PURE__ */ new TypeError(`Host "${rawHost}" cannot include a port number. All ports are matched by default.`);
		if (/[^.a-z0-9\-]/.test(dummyHost)) return /* @__PURE__ */ new TypeError(`Host "${rawHost}" contains invalid characters.`);
		const host = isStarHost ? "*." + dummyHost : dummyHost;
		if (rawHost === "*") return /.+/;
		else if (host.startsWith("*.")) return (0, _fancyRegex$1.regex)()`
			^
				(?:[^.]+\.)*     # any number of dot-terminated segments
				${host.slice(2)}   # rest after leading *.
			$
		`;
		else return (0, _fancyRegex$1.regex)()`^${host}$`;
	}
}));
var require_utils$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createMatchFn = createMatchFn;
	var normalizeUrlFragment = (urlFragent) => {
		try {
			return encodeURI(decodeURI(urlFragent));
		} catch (e) {
			return e;
		}
	};
	exports.normalizeUrlFragment = normalizeUrlFragment;
	function createMatchFn(fn) {
		return (url$1) => {
			let normalizedUrl;
			try {
				const urlStr = url$1 instanceof URL ? url$1.href : url$1;
				normalizedUrl = new URL(urlStr);
				const normalizedPathname = normalizeUrlFragment(normalizedUrl.pathname);
				const normalizedSearch = normalizeUrlFragment(normalizedUrl.search);
				if (normalizedPathname instanceof Error || normalizedSearch instanceof Error) return false;
				normalizedUrl.pathname = normalizedPathname;
				if (!normalizedUrl.href.endsWith("?")) normalizedUrl.search = normalizedSearch;
			} catch (_e) {
				return false;
			}
			return fn(normalizedUrl);
		};
	}
}));
var require_toMatcherOrError = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.toMatchFnOrError = toMatchFnOrError;
	var _fancyRegex = require_dist$2();
	var _constants = require_constants();
	var _getHostRegex = require_getHostRegex();
	var _getPatternSegments = require_getPatternSegments();
	var _utils = require_utils$2();
	function toMatchFnOrError(pattern, options$1) {
		var _a$1;
		const { supportedSchemes, schemeStarMatchesWs, strict } = options$1;
		if (pattern === _constants.ALL_URLS) return (0, _utils.createMatchFn)((url$1) => {
			return (0, _fancyRegex.regex)()`
				^
					(?:${supportedSchemes})
					:
				$
			`.test(url$1.protocol);
		});
		const unsupportedScheme = (_a$1 = pattern.match(/^(urn|data):/)) === null || _a$1 === void 0 ? void 0 : _a$1[1];
		if (unsupportedScheme) return /* @__PURE__ */ new TypeError(`browser-extension-url-match does not currently support scheme "${unsupportedScheme}"`);
		const patternSegments = (0, _getPatternSegments.getPatternSegments)(pattern);
		if (!patternSegments) {
			try {
				const url$1 = new URL(pattern);
				if (url$1.hash || url$1.href.endsWith("#")) return /* @__PURE__ */ new TypeError(`Pattern cannot contain a hash: "${pattern}" contains hash "${url$1.hash || "#"}"`);
				if (!pattern.slice(url$1.origin.length).startsWith("/")) return /* @__PURE__ */ new TypeError(`Pattern "${pattern}" does not contain a path. Use "${pattern}/*" to match any paths with that origin or "${pattern}/" to match that URL alone`);
			} catch (_b) {}
			return /* @__PURE__ */ new TypeError(`Pattern "${pattern}" is invalid`);
		}
		const { scheme, rawPathAndQuery } = patternSegments;
		if (scheme !== "*" && !supportedSchemes.includes(scheme)) return /* @__PURE__ */ new TypeError(`Scheme "${scheme}" is not supported`);
		const schemeRegex = (0, _fancyRegex.regex)()`${scheme === "*" ? new _fancyRegex.RegexFragment(["https?", schemeStarMatchesWs && "wss?"].filter(Boolean).join("|")) : scheme}:`;
		const hostRegex = (0, _getHostRegex.getHostRegex)(patternSegments);
		if (hostRegex instanceof Error) return hostRegex;
		const pathAndQuery = strict ? (0, _utils.normalizeUrlFragment)(rawPathAndQuery) : "/*";
		if (pathAndQuery instanceof Error) return pathAndQuery;
		const pathAndQueryRegex = (0, _fancyRegex.regex)()`^${new _fancyRegex.RegexFragment(pathAndQuery.split("*").map((x) => (0, _fancyRegex.regexEscape)(x)).join(".*"))}$`;
		return (0, _utils.createMatchFn)((url$1) => {
			const pathAndQuery$1 = url$1.pathname + (url$1.href.endsWith("?") ? "?" : url$1.search);
			return schemeRegex.test(url$1.protocol) && hostRegex.test(url$1.hostname) && pathAndQueryRegex.test(pathAndQuery$1);
		});
	}
}));
var require_matchPattern = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.matchPattern = matchPattern;
	var _config$1 = require_config();
	var _getExampleUrls = require_getExampleUrls();
	var _toMatcherOrError = require_toMatcherOrError();
	function assertValid() {
		if (!this.valid) throw new TypeError(this.error.message);
		return this;
	}
	function _matchPattern$1(options$1) {
		return (pattern) => {
			const combinedOptions = Object.assign(Object.assign({}, _config$1.defaultOptions), options$1);
			const val = (0, _toMatcherOrError.toMatchFnOrError)(pattern, combinedOptions);
			return val instanceof Error ? {
				valid: false,
				error: val,
				assertValid
			} : {
				valid: true,
				match: val,
				get examples() {
					return (0, _getExampleUrls.getExampleUrls)(pattern, combinedOptions).filter((url$1) => val(url$1)).slice(0, 100);
				},
				patterns: [pattern],
				config: combinedOptions,
				assertValid
			};
		};
	}
	function allValid(matchers) {
		return matchers.every((m) => m.valid);
	}
	function matchPattern(pattern, options$1 = {}) {
		const patterns = typeof pattern === "string" ? [pattern] : [...new Set(pattern)];
		if (patterns.length === 1) return _matchPattern$1(options$1)(patterns[0]);
		const matchers = patterns.map(_matchPattern$1(options$1));
		if (allValid(matchers)) return {
			valid: true,
			get examples() {
				return [...new Set(matchers.flatMap((m) => m.examples))];
			},
			match: (url$1) => matchers.some((m) => m.match(url$1)),
			patterns,
			config: options$1,
			assertValid
		};
		else return {
			valid: false,
			error: matchers.find((m) => !m.valid).error,
			assertValid
		};
	}
}));
var require_dist$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "matchPattern", {
		enumerable: true,
		get: function() {
			return _matchPattern.matchPattern;
		}
	});
	Object.defineProperty(exports, "presets", {
		enumerable: true,
		get: function() {
			return _config.presets;
		}
	});
	var _matchPattern = require_matchPattern();
	var _config = require_config();
}));
function rng() {
	if (poolPtr > rnds8Pool.length - 16) {
		crypto.randomFillSync(rnds8Pool);
		poolPtr = 0;
	}
	return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var rnds8Pool, poolPtr;
var init_rng = __esmMin((() => {
	rnds8Pool = new Uint8Array(256);
	poolPtr = rnds8Pool.length;
}));
var regex_default;
var init_regex = __esmMin((() => {
	regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}));
function validate(uuid) {
	return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esmMin((() => {
	init_regex();
	validate_default = validate;
}));
function unsafeStringify(arr, offset = 0) {
	return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
function stringify$6(arr, offset = 0) {
	const uuid = unsafeStringify(arr, offset);
	if (!validate_default(uuid)) throw TypeError("Stringified UUID is invalid");
	return uuid;
}
var byteToHex, i$1, stringify_default;
var init_stringify$1 = __esmMin((() => {
	init_validate();
	byteToHex = [];
	for (i$1 = 0; i$1 < 256; ++i$1) byteToHex.push((i$1 + 256).toString(16).slice(1));
	stringify_default = stringify$6;
}));
function v1(options$1, buf, offset) {
	let i$1 = buf && offset || 0;
	const b = buf || new Array(16);
	options$1 = options$1 || {};
	let node = options$1.node || _nodeId;
	let clockseq = options$1.clockseq !== void 0 ? options$1.clockseq : _clockseq;
	if (node == null || clockseq == null) {
		const seedBytes = options$1.random || (options$1.rng || rng)();
		if (node == null) node = _nodeId = [
			seedBytes[0] | 1,
			seedBytes[1],
			seedBytes[2],
			seedBytes[3],
			seedBytes[4],
			seedBytes[5]
		];
		if (clockseq == null) clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
	}
	let msecs = options$1.msecs !== void 0 ? options$1.msecs : Date.now();
	let nsecs = options$1.nsecs !== void 0 ? options$1.nsecs : _lastNSecs + 1;
	const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
	if (dt < 0 && options$1.clockseq === void 0) clockseq = clockseq + 1 & 16383;
	if ((dt < 0 || msecs > _lastMSecs) && options$1.nsecs === void 0) nsecs = 0;
	if (nsecs >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
	_lastMSecs = msecs;
	_lastNSecs = nsecs;
	_clockseq = clockseq;
	msecs += 0xb1d069b5400;
	const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
	b[i$1++] = tl >>> 24 & 255;
	b[i$1++] = tl >>> 16 & 255;
	b[i$1++] = tl >>> 8 & 255;
	b[i$1++] = tl & 255;
	const tmh = msecs / 4294967296 * 1e4 & 268435455;
	b[i$1++] = tmh >>> 8 & 255;
	b[i$1++] = tmh & 255;
	b[i$1++] = tmh >>> 24 & 15 | 16;
	b[i$1++] = tmh >>> 16 & 255;
	b[i$1++] = clockseq >>> 8 | 128;
	b[i$1++] = clockseq & 255;
	for (let n = 0; n < 6; ++n) b[i$1 + n] = node[n];
	return buf || unsafeStringify(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esmMin((() => {
	init_rng();
	init_stringify$1();
	_lastMSecs = 0;
	_lastNSecs = 0;
	v1_default = v1;
}));
function parse$5(uuid) {
	if (!validate_default(uuid)) throw TypeError("Invalid UUID");
	let v;
	const arr = new Uint8Array(16);
	arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
	arr[1] = v >>> 16 & 255;
	arr[2] = v >>> 8 & 255;
	arr[3] = v & 255;
	arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
	arr[5] = v & 255;
	arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
	arr[7] = v & 255;
	arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
	arr[9] = v & 255;
	arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
	arr[11] = v / 4294967296 & 255;
	arr[12] = v >>> 24 & 255;
	arr[13] = v >>> 16 & 255;
	arr[14] = v >>> 8 & 255;
	arr[15] = v & 255;
	return arr;
}
var parse_default;
var init_parse$1 = __esmMin((() => {
	init_validate();
	parse_default = parse$5;
}));
function stringToBytes(str) {
	str = unescape(encodeURIComponent(str));
	const bytes = [];
	for (let i$1 = 0; i$1 < str.length; ++i$1) bytes.push(str.charCodeAt(i$1));
	return bytes;
}
function v35(name$1, version$2, hashfunc) {
	function generateUUID(value, namespace, buf, offset) {
		var _namespace;
		if (typeof value === "string") value = stringToBytes(value);
		if (typeof namespace === "string") namespace = parse_default(namespace);
		if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
		let bytes = new Uint8Array(16 + value.length);
		bytes.set(namespace);
		bytes.set(value, namespace.length);
		bytes = hashfunc(bytes);
		bytes[6] = bytes[6] & 15 | version$2;
		bytes[8] = bytes[8] & 63 | 128;
		if (buf) {
			offset = offset || 0;
			for (let i$1 = 0; i$1 < 16; ++i$1) buf[offset + i$1] = bytes[i$1];
			return buf;
		}
		return unsafeStringify(bytes);
	}
	try {
		generateUUID.name = name$1;
	} catch (err) {}
	generateUUID.DNS = DNS;
	generateUUID.URL = URL$1;
	return generateUUID;
}
var DNS, URL$1;
var init_v35 = __esmMin((() => {
	init_stringify$1();
	init_parse$1();
	DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
	URL$1 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
}));
function md5(bytes) {
	if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
	else if (typeof bytes === "string") bytes = Buffer.from(bytes, "utf8");
	return crypto.createHash("md5").update(bytes).digest();
}
var md5_default;
var init_md5 = __esmMin((() => {
	md5_default = md5;
}));
var v3, v3_default;
var init_v3 = __esmMin((() => {
	init_v35();
	init_md5();
	v3 = v35("v3", 48, md5_default);
	v3_default = v3;
}));
var native_default;
var init_native = __esmMin((() => {
	native_default = { randomUUID: crypto.randomUUID };
}));
function v4(options$1, buf, offset) {
	if (native_default.randomUUID && !buf && !options$1) return native_default.randomUUID();
	options$1 = options$1 || {};
	const rnds = options$1.random || (options$1.rng || rng)();
	rnds[6] = rnds[6] & 15 | 64;
	rnds[8] = rnds[8] & 63 | 128;
	if (buf) {
		offset = offset || 0;
		for (let i$1 = 0; i$1 < 16; ++i$1) buf[offset + i$1] = rnds[i$1];
		return buf;
	}
	return unsafeStringify(rnds);
}
var v4_default;
var init_v4 = __esmMin((() => {
	init_native();
	init_rng();
	init_stringify$1();
	v4_default = v4;
}));
function sha1(bytes) {
	if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
	else if (typeof bytes === "string") bytes = Buffer.from(bytes, "utf8");
	return crypto.createHash("sha1").update(bytes).digest();
}
var sha1_default;
var init_sha1 = __esmMin((() => {
	sha1_default = sha1;
}));
var v5, v5_default;
var init_v5 = __esmMin((() => {
	init_v35();
	init_sha1();
	v5 = v35("v5", 80, sha1_default);
	v5_default = v5;
}));
var nil_default;
var init_nil = __esmMin((() => {
	nil_default = "00000000-0000-0000-0000-000000000000";
}));
function version$1(uuid) {
	if (!validate_default(uuid)) throw TypeError("Invalid UUID");
	return parseInt(uuid.slice(14, 15), 16);
}
var version_default;
var init_version = __esmMin((() => {
	init_validate();
	version_default = version$1;
}));
var esm_node_exports = {};
__export(esm_node_exports, {
	NIL: () => nil_default,
	parse: () => parse_default,
	stringify: () => stringify_default,
	v1: () => v1_default,
	v3: () => v3_default,
	v4: () => v4_default,
	v5: () => v5_default,
	validate: () => validate_default,
	version: () => version_default
});
var init_esm_node = __esmMin((() => {
	init_v1();
	init_v3();
	init_v4();
	init_v5();
	init_nil();
	init_version();
	init_validate();
	init_stringify$1();
	init_parse$1();
}));
var require_electron_better_web_request = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var browser_extension_url_match_1 = require_dist$1();
	var uuid_1$1 = (init_esm_node(), __toCommonJS(esm_node_exports));
	var defaultResolver = ((listeners) => {
		return listeners.sort((a, b) => b.context.order - a.context.order)[0].apply();
	});
	var methodsWithCallback = [
		"onBeforeRequest",
		"onBeforeSendHeaders",
		"onHeadersReceived"
	];
	var aliasMethods = [
		"onBeforeRequest",
		"onBeforeSendHeaders",
		"onHeadersReceived",
		"onSendHeaders",
		"onResponseStarted",
		"onBeforeRedirect",
		"onCompleted",
		"onErrorOccurred"
	];
	var BetterWebRequest = class {
		webRequest;
		orderIndex;
		listeners;
		filters;
		resolvers;
		constructor(webRequest) {
			this.orderIndex = 0;
			this.webRequest = webRequest;
			this.listeners = /* @__PURE__ */ new Map();
			this.filters = /* @__PURE__ */ new Map();
			this.resolvers = /* @__PURE__ */ new Map();
		}
		get nextIndex() {
			return this.orderIndex += 1;
		}
		getListeners() {
			return this.listeners;
		}
		getListenersFor(method) {
			return this.listeners.get(method);
		}
		getFilters() {
			return this.filters;
		}
		getFiltersFor(method) {
			return this.filters.get(method);
		}
		hasCallback(method) {
			return methodsWithCallback.includes(method);
		}
		alias = (method, parameters = []) => {
			const args = this.parseArguments(parameters);
			return this.identifyAction(method, args);
		};
		addListener(method, filter$1, action, outerContext = {}) {
			const { urls } = filter$1;
			const id = (0, uuid_1$1.v4)();
			const innerContext = { order: this.nextIndex };
			const context = {
				...outerContext,
				...innerContext
			};
			const listener = {
				id,
				urls,
				action,
				context
			};
			if (!this.listeners.has(method)) this.listeners.set(method, /* @__PURE__ */ new Map());
			this.listeners.get(method).set(id, listener);
			if (!this.filters.has(method)) this.filters.set(method, /* @__PURE__ */ new Set());
			const currentFilters = this.filters.get(method);
			for (const url$1 of urls) currentFilters.add(url$1);
			this.webRequest[method]({ urls: [...currentFilters] }, this.listenerFactory(method));
			return listener;
		}
		removeListener(method, id) {
			const listeners = this.listeners.get(method);
			if (!listeners || !listeners.has(id)) return;
			if (listeners.size === 1) this.clearListeners(method);
			else {
				listeners.delete(id);
				const newFilters = this.mergeFilters(listeners);
				this.filters.set(method, newFilters);
				this.webRequest[method]([...newFilters], this.listenerFactory(method));
			}
		}
		clearListeners(method) {
			const listeners = this.listeners.get(method);
			const filters = this.filters.get(method);
			if (listeners) listeners.clear();
			if (filters) filters.clear();
			this.webRequest[method](null);
		}
		setResolver(method, resolver) {
			if (!this.hasCallback(method)) {
				console.warn(`Event method "${method}" has no callback and does not use a resolver`);
				return;
			}
			if (this.resolvers.has(method)) console.warn(`Overriding resolver on "${method}" method event`);
			this.resolvers.set(method, resolver);
		}
		matchListeners(url$1, listeners) {
			return Array.from(listeners.values()).filter((element) => element.urls.some((value) => (0, browser_extension_url_match_1.matchPattern)(value).assertValid().match(url$1)));
		}
		listenerFactory(method) {
			return async (details, callback) => {
				if (!this.listeners.has(method)) {
					this.webRequest[method](null);
					return;
				}
				const listeners = this.listeners.get(method);
				if (!listeners) {
					callback?.({ cancel: false });
					return;
				}
				const matchedListeners = this.matchListeners(details.url, listeners);
				if (matchedListeners.length === 0) {
					callback?.({ cancel: false });
					return;
				}
				const resolve = this.resolvers.get(method) ?? defaultResolver;
				const requestsProcesses = this.processRequests(details, matchedListeners);
				if (this.hasCallback(method) && callback) {
					const modified = await resolve(requestsProcesses);
					if (modified) callback(modified);
				} else requestsProcesses.map((listener) => listener.apply());
			};
		}
		processRequests(details, requestListeners) {
			const appliers = [];
			for (const listener of requestListeners) {
				const apply = this.makeApplier(details, listener.action);
				appliers.push({
					apply,
					context: listener.context
				});
			}
			return appliers;
		}
		makeApplier(details, listener) {
			return () => new Promise((resolve, reject) => {
				try {
					listener(details, resolve);
				} catch (err) {
					reject(err);
				}
			});
		}
		mergeFilters(listeners) {
			return Array.from(listeners.values()).reduce((accumulator, value) => {
				for (const url$1 of value.urls) accumulator.add(url$1);
				return accumulator;
			}, /* @__PURE__ */ new Set());
		}
		parseArguments = (parameters = []) => {
			const args = {
				unbind: false,
				filter: { urls: ["<all_urls>"] },
				action: null,
				context: {}
			};
			switch (parameters.length) {
				case 0:
					args.unbind = true;
					break;
				case 1:
					if (typeof parameters[0] === "function") {
						args.action = parameters[0];
						break;
					}
					throw new Error("Wrong function signature : No function listener given");
				case 2:
					if (typeof parameters[0] === "object" && typeof parameters[1] === "function") {
						args.filter = parameters[0];
						args.action = parameters[1];
						break;
					}
					if (typeof parameters[0] === "function" && typeof parameters[1] === "object") {
						args.action = parameters[0];
						args.context = parameters[1];
						break;
					}
					throw new Error("Wrong function signature : argument 1 should be an object filters or the function listener");
				case 3:
					if (typeof parameters[0] === "object" && typeof parameters[1] === "function") {
						args.filter = parameters[0];
						args.action = parameters[1];
						args.context = parameters[2];
						break;
					}
					throw new Error("Wrong function signature : should be arg 1 -> filter object, arg 2 -> function listener, arg 3 -> context");
				default: throw new Error("Wrong function signature : Too many arguments");
			}
			return args;
		};
		identifyAction(method, args) {
			const { unbind, filter: filter$1, action, context } = args;
			if (unbind) return this.clearListeners(method);
			if (!action) throw new Error(`Cannot bind with ${method} : a listener is missing.`);
			return this.addListener(method, filter$1, action, context);
		}
	};
	exports.BetterWebRequest = BetterWebRequest;
	var aliasHandler = { get(target, property) {
		if (typeof property === "string") {
			if (aliasMethods.includes(property)) return (...parameters) => {
				target.alias(property, parameters);
			};
		}
		return target[property];
	} };
	exports.default = (session$1) => {
		return new Proxy(new BetterWebRequest(session$1.webRequest), aliasHandler);
	};
}));
var require_store = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$14 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var electron_better_web_request_1 = __importDefault$14(require_electron_better_web_request());
	var store = /* @__PURE__ */ new Set();
	var enhanceWebRequest$1 = (session$1) => {
		if (store.has(session$1)) return session$1;
		Object.defineProperty(session$1, "webRequest", {
			value: (0, electron_better_web_request_1.default)(session$1),
			writable: false
		});
		store.add(session$1);
		return session$1;
	};
	exports.default = enhanceWebRequest$1;
}));
var import_is$1 = /* @__PURE__ */ __toESM(require_is());
var import_store = /* @__PURE__ */ __toESM(require_store());
function escapeStringRegexp(string) {
	if (typeof string !== "string") throw new TypeError("Expected a string");
	return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var getHomeDirectory = () => os.homedir().replace(/\\/g, "/");
var home_directory_default = getHomeDirectory;
var extractPathRegex = /\s+at.*[(\s](.*)\)?/;
var pathRegex = /^(?:(?:(?:node|node:[\w/]+|(?:(?:node:)?internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)(?:\.js)?:\d+:\d+)|native)/;
function cleanStack(stack, { pretty = false, basePath, pathFilter } = {}) {
	const basePathRegex = basePath && new RegExp(`(file://)?${escapeStringRegexp(basePath.replace(/\\/g, "/"))}/?`, "g");
	const homeDirectory = pretty ? home_directory_default() : "";
	if (typeof stack !== "string") return;
	return stack.replace(/\\/g, "/").split("\n").filter((line) => {
		const pathMatches = line.match(extractPathRegex);
		if (pathMatches === null || !pathMatches[1]) return true;
		const match = pathMatches[1];
		if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar") || match.includes("node_modules/electron/dist/resources/electron.asar") || match.includes("node_modules/electron/dist/resources/default_app.asar")) return false;
		return pathFilter ? !pathRegex.test(match) && pathFilter(match) : !pathRegex.test(match);
	}).filter((line) => line.trim() !== "").map((line) => {
		if (basePathRegex) line = line.replace(basePathRegex, "");
		if (pretty) line = line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDirectory, "~")));
		return line;
	}).join("\n");
}
var NonError = class NonError extends Error {
	constructor(message) {
		super(inspect(message));
		Object.defineProperty(this, "name", {
			value: "NonError",
			configurable: true,
			writable: true
		});
		Error.captureStackTrace(this, NonError);
	}
};
function ensureError(input) {
	if (!(input instanceof Error)) return new NonError(input);
	const error = input;
	if (!error.name) Object.defineProperty(error, "name", {
		value: error.constructor && error.constructor.name || "Error",
		configurable: true,
		writable: true
	});
	if (!error.message) Object.defineProperty(error, "message", {
		value: "<No error message>",
		configurable: true,
		writable: true
	});
	if (!error.stack) Object.defineProperty(error, "stack", {
		value: new Error(error.message).stack.replace(/\n {4}at /, "\n<Original stack missing>$&"),
		configurable: true,
		writable: true
	});
	return error;
}
var import_lodash = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var FUNC_ERROR_TEXT = "Expected a function";
	var NAN = NaN;
	var reTrim = /^\s+|\s+$/g;
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	var reIsBinary = /^0b[01]+$/i;
	var reIsOctal = /^0o[0-7]+$/i;
	var freeParseInt = parseInt;
	var freeGlobal$2 = typeof global == "object" && global && global.Object === Object && global;
	var freeSelf$2 = typeof self == "object" && self && self.Object === Object && self;
	var root$2 = freeGlobal$2 || freeSelf$2 || Function("return this")();
	var objectToString$2 = Object.prototype.toString;
	var nativeMax = Math.max, nativeMin = Math.min;
	var now = function() {
		return root$2.Date.now();
	};
	function debounce$1(func, wait, options$1) {
		var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
		if (typeof func != "function") throw new TypeError(FUNC_ERROR_TEXT);
		wait = toNumber(wait) || 0;
		if (isObject$2(options$1)) {
			leading = !!options$1.leading;
			maxing = "maxWait" in options$1;
			maxWait = maxing ? nativeMax(toNumber(options$1.maxWait) || 0, wait) : maxWait;
			trailing = "trailing" in options$1 ? !!options$1.trailing : trailing;
		}
		function invokeFunc(time) {
			var args = lastArgs, thisArg = lastThis;
			lastArgs = lastThis = void 0;
			lastInvokeTime = time;
			result = func.apply(thisArg, args);
			return result;
		}
		function leadingEdge(time) {
			lastInvokeTime = time;
			timerId = setTimeout(timerExpired, wait);
			return leading ? invokeFunc(time) : result;
		}
		function remainingWait(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result$1 = wait - timeSinceLastCall;
			return maxing ? nativeMin(result$1, maxWait - timeSinceLastInvoke) : result$1;
		}
		function shouldInvoke(time) {
			var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
			return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
		}
		function timerExpired() {
			var time = now();
			if (shouldInvoke(time)) return trailingEdge(time);
			timerId = setTimeout(timerExpired, remainingWait(time));
		}
		function trailingEdge(time) {
			timerId = void 0;
			if (trailing && lastArgs) return invokeFunc(time);
			lastArgs = lastThis = void 0;
			return result;
		}
		function cancel() {
			if (timerId !== void 0) clearTimeout(timerId);
			lastInvokeTime = 0;
			lastArgs = lastCallTime = lastThis = timerId = void 0;
		}
		function flush() {
			return timerId === void 0 ? result : trailingEdge(now());
		}
		function debounced() {
			var time = now(), isInvoking = shouldInvoke(time);
			lastArgs = arguments;
			lastThis = this;
			lastCallTime = time;
			if (isInvoking) {
				if (timerId === void 0) return leadingEdge(lastCallTime);
				if (maxing) {
					timerId = setTimeout(timerExpired, wait);
					return invokeFunc(lastCallTime);
				}
			}
			if (timerId === void 0) timerId = setTimeout(timerExpired, wait);
			return result;
		}
		debounced.cancel = cancel;
		debounced.flush = flush;
		return debounced;
	}
	function isObject$2(value) {
		var type$1 = typeof value;
		return !!value && (type$1 == "object" || type$1 == "function");
	}
	function isObjectLike$2(value) {
		return !!value && typeof value == "object";
	}
	function isSymbol$1(value) {
		return typeof value == "symbol" || isObjectLike$2(value) && objectToString$2.call(value) == "[object Symbol]";
	}
	function toNumber(value) {
		if (typeof value == "number") return value;
		if (isSymbol$1(value)) return NAN;
		if (isObject$2(value)) {
			var other = typeof value.valueOf == "function" ? value.valueOf() : value;
			value = isObject$2(other) ? other + "" : other;
		}
		if (typeof value != "string") return value === 0 ? value : +value;
		value = value.replace(reTrim, "");
		var isBinary$1 = reIsBinary.test(value);
		return isBinary$1 || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary$1 ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}
	module.exports = debounce$1;
})))());
var list = [
	EvalError,
	RangeError,
	ReferenceError,
	SyntaxError,
	TypeError,
	URIError,
	globalThis.DOMException,
	globalThis.AssertionError,
	globalThis.SystemError
].filter(Boolean).map((constructor) => [constructor.name, constructor]);
var error_constructors_default = new Map(list);
var commonProperties = [
	{
		property: "name",
		enumerable: false
	},
	{
		property: "message",
		enumerable: false
	},
	{
		property: "stack",
		enumerable: false
	},
	{
		property: "code",
		enumerable: true
	},
	{
		property: "cause",
		enumerable: false
	}
];
var toJsonWasCalled = /* @__PURE__ */ new WeakSet();
var toJSON = (from) => {
	toJsonWasCalled.add(from);
	const json = from.toJSON();
	toJsonWasCalled.delete(from);
	return json;
};
var getErrorConstructor = (name$1) => error_constructors_default.get(name$1) ?? Error;
var destroyCircular = ({ from, seen, to, forceEnumerable, maxDepth, depth, useToJSON, serialize }) => {
	if (!to) if (Array.isArray(from)) to = [];
	else if (!serialize && isErrorLike(from)) to = new (getErrorConstructor(from.name))();
	else to = {};
	seen.push(from);
	if (depth >= maxDepth) return to;
	if (useToJSON && typeof from.toJSON === "function" && !toJsonWasCalled.has(from)) return toJSON(from);
	const continueDestroyCircular = (value) => destroyCircular({
		from: value,
		seen: [...seen],
		forceEnumerable,
		maxDepth,
		depth,
		useToJSON,
		serialize
	});
	for (const [key, value] of Object.entries(from)) {
		if (value && value instanceof Uint8Array && value.constructor.name === "Buffer") {
			to[key] = "[object Buffer]";
			continue;
		}
		if (value !== null && typeof value === "object" && typeof value.pipe === "function") {
			to[key] = "[object Stream]";
			continue;
		}
		if (typeof value === "function") continue;
		if (!value || typeof value !== "object") {
			try {
				to[key] = value;
			} catch {}
			continue;
		}
		if (!seen.includes(from[key])) {
			depth++;
			to[key] = continueDestroyCircular(from[key]);
			continue;
		}
		to[key] = "[Circular]";
	}
	for (const { property, enumerable } of commonProperties) if (typeof from[property] !== "undefined" && from[property] !== null) Object.defineProperty(to, property, {
		value: isErrorLike(from[property]) ? continueDestroyCircular(from[property]) : from[property],
		enumerable: forceEnumerable ? true : enumerable,
		configurable: true,
		writable: true
	});
	return to;
};
function serializeError(value, options$1 = {}) {
	const { maxDepth = Number.POSITIVE_INFINITY, useToJSON = true } = options$1;
	if (typeof value === "object" && value !== null) return destroyCircular({
		from: value,
		seen: [],
		forceEnumerable: true,
		maxDepth,
		depth: 0,
		useToJSON,
		serialize: true
	});
	if (typeof value === "function") return `[Function: ${value.name || "anonymous"}]`;
	return value;
}
function isErrorLike(value) {
	return Boolean(value) && typeof value === "object" && "name" in value && "message" in value && "stack" in value;
}
var appName;
var invokeErrorHandler;
var ERROR_HANDLER_CHANNEL = "electron-unhandled.ERROR";
if (process$1.type === "renderer") invokeErrorHandler = async (title = "App encountered an error", error) => {
	const { ipcRenderer } = await import("electron");
	try {
		await ipcRenderer.invoke(ERROR_HANDLER_CHANNEL, title, error);
	} catch (invokeError) {
		if (invokeError.message === "An object could not be cloned.") {
			error = ensureError(error);
			const serialized = serializeError(error);
			ipcRenderer.invoke(ERROR_HANDLER_CHANNEL, title, serialized);
		}
	}
};
else {
	appName = "name" in app ? app.name : app.getName();
	const { ipcMain: ipcMain$1 } = await import("electron");
	ipcMain$1.handle(ERROR_HANDLER_CHANNEL, async (event_, title, error) => {
		handleError$1(title, error);
	});
}
var isInstalled = false;
var options = {
	logger: console.error,
	showDialog: process$1.type !== "renderer" && (async () => {
		const { default: isDevelopment } = await import("./electron-is-dev-Bdp-qJ2N.js");
		return isDevelopment;
	})()
};
var handleError$1 = (title = `${appName} encountered an error`, error) => {
	error = ensureError(error);
	try {
		options.logger(error);
	} catch (loggerError) {
		dialog.showErrorBox("The `logger` option function in electron-unhandled threw an error", ensureError(loggerError).stack);
		return;
	}
	if (options.showDialog) {
		const stack = cleanStack(error.stack);
		if (app.isReady()) {
			const buttons = ["OK", process$1.platform === "darwin" ? "Copy Error" : "Copy error"];
			if (options.reportButton) buttons.push("Report…");
			const buttonIndex = dialog.showMessageBoxSync({
				type: "error",
				buttons,
				defaultId: 0,
				noLink: true,
				message: title,
				detail: cleanStack(error.stack, { pretty: true })
			});
			if (buttonIndex === 1) clipboard.writeText(`${title}\n${stack}`);
			if (buttonIndex === 2) options.reportButton(error);
		} else dialog.showErrorBox(title, stack);
	}
};
function unhandled(inputOptions) {
	if (isInstalled) return;
	isInstalled = true;
	options = {
		...options,
		...inputOptions
	};
	if (process$1.type === "renderer") {
		const errorHandler = (0, import_lodash.default)((error) => {
			invokeErrorHandler("Unhandled Error", error);
		}, 200);
		window.addEventListener("error", (event) => {
			event.preventDefault();
			errorHandler(event.error || event);
		});
		const rejectionHandler = (0, import_lodash.default)((reason) => {
			invokeErrorHandler("Unhandled Promise Rejection", reason);
		}, 200);
		window.addEventListener("unhandledrejection", (event) => {
			event.preventDefault();
			rejectionHandler(event.reason);
		});
	} else {
		process$1.on("uncaughtException", (error) => {
			handleError$1("Unhandled Error", error);
		});
		process$1.on("unhandledRejection", (error) => {
			handleError$1("Unhandled Promise Rejection", error);
		});
	}
}
var require_universalify = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.fromCallback = function(fn) {
		return Object.defineProperty(function(...args) {
			if (typeof args[args.length - 1] === "function") fn.apply(this, args);
			else return new Promise((resolve, reject) => {
				args.push((err, res) => err != null ? reject(err) : resolve(res));
				fn.apply(this, args);
			});
		}, "name", { value: fn.name });
	};
	exports.fromPromise = function(fn) {
		return Object.defineProperty(function(...args) {
			const cb = args[args.length - 1];
			if (typeof cb !== "function") return fn.apply(this, args);
			else {
				args.pop();
				fn.apply(this, args).then((r) => cb(null, r), cb);
			}
		}, "name", { value: fn.name });
	};
}));
var require_polyfills = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants = __require("constants");
	var origCwd = process.cwd;
	var cwd = null;
	var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
	process.cwd = function() {
		if (!cwd) cwd = origCwd.call(process);
		return cwd;
	};
	try {
		process.cwd();
	} catch (er) {}
	if (typeof process.chdir === "function") {
		var chdir = process.chdir;
		process.chdir = function(d) {
			cwd = null;
			chdir.call(process, d);
		};
		if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
	}
	module.exports = patch$1;
	function patch$1(fs$20) {
		if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) patchLchmod(fs$20);
		if (!fs$20.lutimes) patchLutimes(fs$20);
		fs$20.chown = chownFix(fs$20.chown);
		fs$20.fchown = chownFix(fs$20.fchown);
		fs$20.lchown = chownFix(fs$20.lchown);
		fs$20.chmod = chmodFix(fs$20.chmod);
		fs$20.fchmod = chmodFix(fs$20.fchmod);
		fs$20.lchmod = chmodFix(fs$20.lchmod);
		fs$20.chownSync = chownFixSync(fs$20.chownSync);
		fs$20.fchownSync = chownFixSync(fs$20.fchownSync);
		fs$20.lchownSync = chownFixSync(fs$20.lchownSync);
		fs$20.chmodSync = chmodFixSync(fs$20.chmodSync);
		fs$20.fchmodSync = chmodFixSync(fs$20.fchmodSync);
		fs$20.lchmodSync = chmodFixSync(fs$20.lchmodSync);
		fs$20.stat = statFix(fs$20.stat);
		fs$20.fstat = statFix(fs$20.fstat);
		fs$20.lstat = statFix(fs$20.lstat);
		fs$20.statSync = statFixSync(fs$20.statSync);
		fs$20.fstatSync = statFixSync(fs$20.fstatSync);
		fs$20.lstatSync = statFixSync(fs$20.lstatSync);
		if (fs$20.chmod && !fs$20.lchmod) {
			fs$20.lchmod = function(path$25, mode, cb) {
				if (cb) process.nextTick(cb);
			};
			fs$20.lchmodSync = function() {};
		}
		if (fs$20.chown && !fs$20.lchown) {
			fs$20.lchown = function(path$25, uid, gid, cb) {
				if (cb) process.nextTick(cb);
			};
			fs$20.lchownSync = function() {};
		}
		if (platform === "win32") fs$20.rename = typeof fs$20.rename !== "function" ? fs$20.rename : (function(fs$rename) {
			function rename$2(from, to, cb) {
				var start = Date.now();
				var backoff = 0;
				fs$rename(from, to, function CB(er) {
					if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
						setTimeout(function() {
							fs$20.stat(to, function(stater, st) {
								if (stater && stater.code === "ENOENT") fs$rename(from, to, CB);
								else cb(er);
							});
						}, backoff);
						if (backoff < 100) backoff += 10;
						return;
					}
					if (cb) cb(er);
				});
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(rename$2, fs$rename);
			return rename$2;
		})(fs$20.rename);
		fs$20.read = typeof fs$20.read !== "function" ? fs$20.read : (function(fs$read) {
			function read(fd, buffer, offset, length, position, callback_) {
				var callback;
				if (callback_ && typeof callback_ === "function") {
					var eagCounter = 0;
					callback = function(er, _, __) {
						if (er && er.code === "EAGAIN" && eagCounter < 10) {
							eagCounter++;
							return fs$read.call(fs$20, fd, buffer, offset, length, position, callback);
						}
						callback_.apply(this, arguments);
					};
				}
				return fs$read.call(fs$20, fd, buffer, offset, length, position, callback);
			}
			if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
			return read;
		})(fs$20.read);
		fs$20.readSync = typeof fs$20.readSync !== "function" ? fs$20.readSync : (function(fs$readSync) {
			return function(fd, buffer, offset, length, position) {
				var eagCounter = 0;
				while (true) try {
					return fs$readSync.call(fs$20, fd, buffer, offset, length, position);
				} catch (er) {
					if (er.code === "EAGAIN" && eagCounter < 10) {
						eagCounter++;
						continue;
					}
					throw er;
				}
			};
		})(fs$20.readSync);
		function patchLchmod(fs$21) {
			fs$21.lchmod = function(path$25, mode, callback) {
				fs$21.open(path$25, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
					if (err) {
						if (callback) callback(err);
						return;
					}
					fs$21.fchmod(fd, mode, function(err$1) {
						fs$21.close(fd, function(err2) {
							if (callback) callback(err$1 || err2);
						});
					});
				});
			};
			fs$21.lchmodSync = function(path$25, mode) {
				var fd = fs$21.openSync(path$25, constants.O_WRONLY | constants.O_SYMLINK, mode);
				var threw = true;
				var ret;
				try {
					ret = fs$21.fchmodSync(fd, mode);
					threw = false;
				} finally {
					if (threw) try {
						fs$21.closeSync(fd);
					} catch (er) {}
					else fs$21.closeSync(fd);
				}
				return ret;
			};
		}
		function patchLutimes(fs$21) {
			if (constants.hasOwnProperty("O_SYMLINK") && fs$21.futimes) {
				fs$21.lutimes = function(path$25, at, mt, cb) {
					fs$21.open(path$25, constants.O_SYMLINK, function(er, fd) {
						if (er) {
							if (cb) cb(er);
							return;
						}
						fs$21.futimes(fd, at, mt, function(er$1) {
							fs$21.close(fd, function(er2) {
								if (cb) cb(er$1 || er2);
							});
						});
					});
				};
				fs$21.lutimesSync = function(path$25, at, mt) {
					var fd = fs$21.openSync(path$25, constants.O_SYMLINK);
					var ret;
					var threw = true;
					try {
						ret = fs$21.futimesSync(fd, at, mt);
						threw = false;
					} finally {
						if (threw) try {
							fs$21.closeSync(fd);
						} catch (er) {}
						else fs$21.closeSync(fd);
					}
					return ret;
				};
			} else if (fs$21.futimes) {
				fs$21.lutimes = function(_a$1, _b, _c, cb) {
					if (cb) process.nextTick(cb);
				};
				fs$21.lutimesSync = function() {};
			}
		}
		function chmodFix(orig) {
			if (!orig) return orig;
			return function(target, mode, cb) {
				return orig.call(fs$20, target, mode, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chmodFixSync(orig) {
			if (!orig) return orig;
			return function(target, mode) {
				try {
					return orig.call(fs$20, target, mode);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function chownFix(orig) {
			if (!orig) return orig;
			return function(target, uid, gid, cb) {
				return orig.call(fs$20, target, uid, gid, function(er) {
					if (chownErOk(er)) er = null;
					if (cb) cb.apply(this, arguments);
				});
			};
		}
		function chownFixSync(orig) {
			if (!orig) return orig;
			return function(target, uid, gid) {
				try {
					return orig.call(fs$20, target, uid, gid);
				} catch (er) {
					if (!chownErOk(er)) throw er;
				}
			};
		}
		function statFix(orig) {
			if (!orig) return orig;
			return function(target, options$1, cb) {
				if (typeof options$1 === "function") {
					cb = options$1;
					options$1 = null;
				}
				function callback(er, stats) {
					if (stats) {
						if (stats.uid < 0) stats.uid += 4294967296;
						if (stats.gid < 0) stats.gid += 4294967296;
					}
					if (cb) cb.apply(this, arguments);
				}
				return options$1 ? orig.call(fs$20, target, options$1, callback) : orig.call(fs$20, target, callback);
			};
		}
		function statFixSync(orig) {
			if (!orig) return orig;
			return function(target, options$1) {
				var stats = options$1 ? orig.call(fs$20, target, options$1) : orig.call(fs$20, target);
				if (stats) {
					if (stats.uid < 0) stats.uid += 4294967296;
					if (stats.gid < 0) stats.gid += 4294967296;
				}
				return stats;
			};
		}
		function chownErOk(er) {
			if (!er) return true;
			if (er.code === "ENOSYS") return true;
			if (!process.getuid || process.getuid() !== 0) {
				if (er.code === "EINVAL" || er.code === "EPERM") return true;
			}
			return false;
		}
	}
}));
var require_legacy_streams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream = __require("stream").Stream;
	module.exports = legacy$1;
	function legacy$1(fs$20) {
		return {
			ReadStream,
			WriteStream
		};
		function ReadStream(path$25, options$1) {
			if (!(this instanceof ReadStream)) return new ReadStream(path$25, options$1);
			Stream.call(this);
			var self$1 = this;
			this.path = path$25;
			this.fd = null;
			this.readable = true;
			this.paused = false;
			this.flags = "r";
			this.mode = 438;
			this.bufferSize = 64 * 1024;
			options$1 = options$1 || {};
			var keys$2 = Object.keys(options$1);
			for (var index = 0, length = keys$2.length; index < length; index++) {
				var key = keys$2[index];
				this[key] = options$1[key];
			}
			if (this.encoding) this.setEncoding(this.encoding);
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.end === void 0) this.end = Infinity;
				else if ("number" !== typeof this.end) throw TypeError("end must be a Number");
				if (this.start > this.end) throw new Error("start must be <= end");
				this.pos = this.start;
			}
			if (this.fd !== null) {
				process.nextTick(function() {
					self$1._read();
				});
				return;
			}
			fs$20.open(this.path, this.flags, this.mode, function(err, fd) {
				if (err) {
					self$1.emit("error", err);
					self$1.readable = false;
					return;
				}
				self$1.fd = fd;
				self$1.emit("open", fd);
				self$1._read();
			});
		}
		function WriteStream(path$25, options$1) {
			if (!(this instanceof WriteStream)) return new WriteStream(path$25, options$1);
			Stream.call(this);
			this.path = path$25;
			this.fd = null;
			this.writable = true;
			this.flags = "w";
			this.encoding = "binary";
			this.mode = 438;
			this.bytesWritten = 0;
			options$1 = options$1 || {};
			var keys$2 = Object.keys(options$1);
			for (var index = 0, length = keys$2.length; index < length; index++) {
				var key = keys$2[index];
				this[key] = options$1[key];
			}
			if (this.start !== void 0) {
				if ("number" !== typeof this.start) throw TypeError("start must be a Number");
				if (this.start < 0) throw new Error("start must be >= zero");
				this.pos = this.start;
			}
			this.busy = false;
			this._queue = [];
			if (this.fd === null) {
				this._open = fs$20.open;
				this._queue.push([
					this._open,
					this.path,
					this.flags,
					this.mode,
					void 0
				]);
				this.flush();
			}
		}
	}
}));
var require_clone = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = clone$1;
	var getPrototypeOf = Object.getPrototypeOf || function(obj) {
		return obj.__proto__;
	};
	function clone$1(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Object) var copy$2 = { __proto__: getPrototypeOf(obj) };
		else var copy$2 = Object.create(null);
		Object.getOwnPropertyNames(obj).forEach(function(key) {
			Object.defineProperty(copy$2, key, Object.getOwnPropertyDescriptor(obj, key));
		});
		return copy$2;
	}
}));
var require_graceful_fs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$19 = __require("fs");
	var polyfills = require_polyfills();
	var legacy = require_legacy_streams();
	var clone = require_clone();
	var util$1 = __require("util");
	/* istanbul ignore next - node 0.x polyfill */
	var gracefulQueue;
	var previousSymbol;
	/* istanbul ignore else - node 0.x polyfill */
	if (typeof Symbol === "function" && typeof Symbol.for === "function") {
		gracefulQueue = Symbol.for("graceful-fs.queue");
		previousSymbol = Symbol.for("graceful-fs.previous");
	} else {
		gracefulQueue = "___graceful-fs.queue";
		previousSymbol = "___graceful-fs.previous";
	}
	function noop() {}
	function publishQueue(context, queue$1) {
		Object.defineProperty(context, gracefulQueue, { get: function() {
			return queue$1;
		} });
	}
	var debug$2 = noop;
	if (util$1.debuglog) debug$2 = util$1.debuglog("gfs4");
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) debug$2 = function() {
		var m = util$1.format.apply(util$1, arguments);
		m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
		console.error(m);
	};
	if (!fs$19[gracefulQueue]) {
		var queue = global[gracefulQueue] || [];
		publishQueue(fs$19, queue);
		fs$19.close = (function(fs$close) {
			function close(fd, cb) {
				return fs$close.call(fs$19, fd, function(err) {
					if (!err) resetQueue();
					if (typeof cb === "function") cb.apply(this, arguments);
				});
			}
			Object.defineProperty(close, previousSymbol, { value: fs$close });
			return close;
		})(fs$19.close);
		fs$19.closeSync = (function(fs$closeSync) {
			function closeSync(fd) {
				fs$closeSync.apply(fs$19, arguments);
				resetQueue();
			}
			Object.defineProperty(closeSync, previousSymbol, { value: fs$closeSync });
			return closeSync;
		})(fs$19.closeSync);
		if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
			debug$2(fs$19[gracefulQueue]);
			__require("assert").equal(fs$19[gracefulQueue].length, 0);
		});
	}
	if (!global[gracefulQueue]) publishQueue(global, fs$19[gracefulQueue]);
	module.exports = patch(clone(fs$19));
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$19.__patched) {
		module.exports = patch(fs$19);
		fs$19.__patched = true;
	}
	function patch(fs$20) {
		polyfills(fs$20);
		fs$20.gracefulify = patch;
		fs$20.createReadStream = createReadStream$1;
		fs$20.createWriteStream = createWriteStream;
		var fs$readFile = fs$20.readFile;
		fs$20.readFile = readFile$1;
		function readFile$1(path$25, options$1, cb) {
			if (typeof options$1 === "function") cb = options$1, options$1 = null;
			return go$readFile(path$25, options$1, cb);
			function go$readFile(path$26, options$2, cb$1, startTime) {
				return fs$readFile(path$26, options$2, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readFile,
						[
							path$26,
							options$2,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$writeFile = fs$20.writeFile;
		fs$20.writeFile = writeFile$1;
		function writeFile$1(path$25, data, options$1, cb) {
			if (typeof options$1 === "function") cb = options$1, options$1 = null;
			return go$writeFile(path$25, data, options$1, cb);
			function go$writeFile(path$26, data$1, options$2, cb$1, startTime) {
				return fs$writeFile(path$26, data$1, options$2, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$writeFile,
						[
							path$26,
							data$1,
							options$2,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$appendFile = fs$20.appendFile;
		if (fs$appendFile) fs$20.appendFile = appendFile;
		function appendFile(path$25, data, options$1, cb) {
			if (typeof options$1 === "function") cb = options$1, options$1 = null;
			return go$appendFile(path$25, data, options$1, cb);
			function go$appendFile(path$26, data$1, options$2, cb$1, startTime) {
				return fs$appendFile(path$26, data$1, options$2, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$appendFile,
						[
							path$26,
							data$1,
							options$2,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$copyFile = fs$20.copyFile;
		if (fs$copyFile) fs$20.copyFile = copyFile$2;
		function copyFile$2(src, dest, flags, cb) {
			if (typeof flags === "function") {
				cb = flags;
				flags = 0;
			}
			return go$copyFile(src, dest, flags, cb);
			function go$copyFile(src$1, dest$1, flags$1, cb$1, startTime) {
				return fs$copyFile(src$1, dest$1, flags$1, function(err) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$copyFile,
						[
							src$1,
							dest$1,
							flags$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		var fs$readdir = fs$20.readdir;
		fs$20.readdir = readdir;
		var noReaddirOptionVersions = /^v[0-5]\./;
		function readdir(path$25, options$1, cb) {
			if (typeof options$1 === "function") cb = options$1, options$1 = null;
			var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir$1(path$26, options$2, cb$1, startTime) {
				return fs$readdir(path$26, fs$readdirCallback(path$26, options$2, cb$1, startTime));
			} : function go$readdir$1(path$26, options$2, cb$1, startTime) {
				return fs$readdir(path$26, options$2, fs$readdirCallback(path$26, options$2, cb$1, startTime));
			};
			return go$readdir(path$25, options$1, cb);
			function fs$readdirCallback(path$26, options$2, cb$1, startTime) {
				return function(err, files) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$readdir,
						[
							path$26,
							options$2,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else {
						if (files && files.sort) files.sort();
						if (typeof cb$1 === "function") cb$1.call(this, err, files);
					}
				};
			}
		}
		if (process.version.substr(0, 4) === "v0.8") {
			var legStreams = legacy(fs$20);
			ReadStream = legStreams.ReadStream;
			WriteStream = legStreams.WriteStream;
		}
		var fs$ReadStream = fs$20.ReadStream;
		if (fs$ReadStream) {
			ReadStream.prototype = Object.create(fs$ReadStream.prototype);
			ReadStream.prototype.open = ReadStream$open;
		}
		var fs$WriteStream = fs$20.WriteStream;
		if (fs$WriteStream) {
			WriteStream.prototype = Object.create(fs$WriteStream.prototype);
			WriteStream.prototype.open = WriteStream$open;
		}
		Object.defineProperty(fs$20, "ReadStream", {
			get: function() {
				return ReadStream;
			},
			set: function(val) {
				ReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(fs$20, "WriteStream", {
			get: function() {
				return WriteStream;
			},
			set: function(val) {
				WriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileReadStream = ReadStream;
		Object.defineProperty(fs$20, "FileReadStream", {
			get: function() {
				return FileReadStream;
			},
			set: function(val) {
				FileReadStream = val;
			},
			enumerable: true,
			configurable: true
		});
		var FileWriteStream = WriteStream;
		Object.defineProperty(fs$20, "FileWriteStream", {
			get: function() {
				return FileWriteStream;
			},
			set: function(val) {
				FileWriteStream = val;
			},
			enumerable: true,
			configurable: true
		});
		function ReadStream(path$25, options$1) {
			if (this instanceof ReadStream) return fs$ReadStream.apply(this, arguments), this;
			else return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
		}
		function ReadStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					if (that.autoClose) that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
					that.read();
				}
			});
		}
		function WriteStream(path$25, options$1) {
			if (this instanceof WriteStream) return fs$WriteStream.apply(this, arguments), this;
			else return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
		}
		function WriteStream$open() {
			var that = this;
			open(that.path, that.flags, that.mode, function(err, fd) {
				if (err) {
					that.destroy();
					that.emit("error", err);
				} else {
					that.fd = fd;
					that.emit("open", fd);
				}
			});
		}
		function createReadStream$1(path$25, options$1) {
			return new fs$20.ReadStream(path$25, options$1);
		}
		function createWriteStream(path$25, options$1) {
			return new fs$20.WriteStream(path$25, options$1);
		}
		var fs$open = fs$20.open;
		fs$20.open = open;
		function open(path$25, flags, mode, cb) {
			if (typeof mode === "function") cb = mode, mode = null;
			return go$open(path$25, flags, mode, cb);
			function go$open(path$26, flags$1, mode$1, cb$1, startTime) {
				return fs$open(path$26, flags$1, mode$1, function(err, fd) {
					if (err && (err.code === "EMFILE" || err.code === "ENFILE")) enqueue([
						go$open,
						[
							path$26,
							flags$1,
							mode$1,
							cb$1
						],
						err,
						startTime || Date.now(),
						Date.now()
					]);
					else if (typeof cb$1 === "function") cb$1.apply(this, arguments);
				});
			}
		}
		return fs$20;
	}
	function enqueue(elem) {
		debug$2("ENQUEUE", elem[0].name, elem[1]);
		fs$19[gracefulQueue].push(elem);
		retry$1();
	}
	var retryTimer;
	function resetQueue() {
		var now$1 = Date.now();
		for (var i$1 = 0; i$1 < fs$19[gracefulQueue].length; ++i$1) if (fs$19[gracefulQueue][i$1].length > 2) {
			fs$19[gracefulQueue][i$1][3] = now$1;
			fs$19[gracefulQueue][i$1][4] = now$1;
		}
		retry$1();
	}
	function retry$1() {
		clearTimeout(retryTimer);
		retryTimer = void 0;
		if (fs$19[gracefulQueue].length === 0) return;
		var elem = fs$19[gracefulQueue].shift();
		var fn = elem[0];
		var args = elem[1];
		var err = elem[2];
		var startTime = elem[3];
		var lastTime = elem[4];
		if (startTime === void 0) {
			debug$2("RETRY", fn.name, args);
			fn.apply(null, args);
		} else if (Date.now() - startTime >= 6e4) {
			debug$2("TIMEOUT", fn.name, args);
			var cb = args.pop();
			if (typeof cb === "function") cb.call(null, err);
		} else {
			var sinceAttempt = Date.now() - lastTime;
			var sinceStart = Math.max(lastTime - startTime, 1);
			var desiredDelay = Math.min(sinceStart * 1.2, 100);
			if (sinceAttempt >= desiredDelay) {
				debug$2("RETRY", fn.name, args);
				fn.apply(null, args.concat([startTime]));
			} else fs$19[gracefulQueue].push(elem);
		}
		if (retryTimer === void 0) retryTimer = setTimeout(retry$1, 0);
	}
}));
var require_fs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var u$11 = require_universalify().fromCallback;
	var fs$18 = require_graceful_fs();
	var api = [
		"access",
		"appendFile",
		"chmod",
		"chown",
		"close",
		"copyFile",
		"fchmod",
		"fchown",
		"fdatasync",
		"fstat",
		"fsync",
		"ftruncate",
		"futimes",
		"lchmod",
		"lchown",
		"link",
		"lstat",
		"mkdir",
		"mkdtemp",
		"open",
		"opendir",
		"readdir",
		"readFile",
		"readlink",
		"realpath",
		"rename",
		"rm",
		"rmdir",
		"stat",
		"symlink",
		"truncate",
		"unlink",
		"utimes",
		"writeFile"
	].filter((key) => {
		return typeof fs$18[key] === "function";
	});
	Object.assign(exports, fs$18);
	api.forEach((method) => {
		exports[method] = u$11(fs$18[method]);
	});
	exports.exists = function(filename, callback) {
		if (typeof callback === "function") return fs$18.exists(filename, callback);
		return new Promise((resolve) => {
			return fs$18.exists(filename, resolve);
		});
	};
	exports.read = function(fd, buffer, offset, length, position, callback) {
		if (typeof callback === "function") return fs$18.read(fd, buffer, offset, length, position, callback);
		return new Promise((resolve, reject) => {
			fs$18.read(fd, buffer, offset, length, position, (err, bytesRead, buffer$1) => {
				if (err) return reject(err);
				resolve({
					bytesRead,
					buffer: buffer$1
				});
			});
		});
	};
	exports.write = function(fd, buffer, ...args) {
		if (typeof args[args.length - 1] === "function") return fs$18.write(fd, buffer, ...args);
		return new Promise((resolve, reject) => {
			fs$18.write(fd, buffer, ...args, (err, bytesWritten, buffer$1) => {
				if (err) return reject(err);
				resolve({
					bytesWritten,
					buffer: buffer$1
				});
			});
		});
	};
	if (typeof fs$18.writev === "function") exports.writev = function(fd, buffers, ...args) {
		if (typeof args[args.length - 1] === "function") return fs$18.writev(fd, buffers, ...args);
		return new Promise((resolve, reject) => {
			fs$18.writev(fd, buffers, ...args, (err, bytesWritten, buffers$1) => {
				if (err) return reject(err);
				resolve({
					bytesWritten,
					buffers: buffers$1
				});
			});
		});
	};
	if (typeof fs$18.realpath.native === "function") exports.realpath.native = u$11(fs$18.realpath.native);
	else process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
}));
var require_utils$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$24 = __require("path");
	module.exports.checkPath = function checkPath$1(pth) {
		if (process.platform === "win32") {
			if (/[<>:"|?*]/.test(pth.replace(path$24.parse(pth).root, ""))) {
				const error = /* @__PURE__ */ new Error(`Path contains invalid characters: ${pth}`);
				error.code = "EINVAL";
				throw error;
			}
		}
	};
}));
var require_make_dir = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$17 = require_fs();
	var { checkPath } = require_utils$1();
	var getMode = (options$1) => {
		const defaults$1 = { mode: 511 };
		if (typeof options$1 === "number") return options$1;
		return {
			...defaults$1,
			...options$1
		}.mode;
	};
	module.exports.makeDir = async (dir, options$1) => {
		checkPath(dir);
		return fs$17.mkdir(dir, {
			mode: getMode(options$1),
			recursive: true
		});
	};
	module.exports.makeDirSync = (dir, options$1) => {
		checkPath(dir);
		return fs$17.mkdirSync(dir, {
			mode: getMode(options$1),
			recursive: true
		});
	};
}));
var require_mkdirs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$10 = require_universalify().fromPromise;
	var { makeDir: _makeDir, makeDirSync } = require_make_dir();
	var makeDir = u$10(_makeDir);
	module.exports = {
		mkdirs: makeDir,
		mkdirsSync: makeDirSync,
		mkdirp: makeDir,
		mkdirpSync: makeDirSync,
		ensureDir: makeDir,
		ensureDirSync: makeDirSync
	};
}));
var require_path_exists = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$9 = require_universalify().fromPromise;
	var fs$16 = require_fs();
	function pathExists$6(path$25) {
		return fs$16.access(path$25).then(() => true).catch(() => false);
	}
	module.exports = {
		pathExists: u$9(pathExists$6),
		pathExistsSync: fs$16.existsSync
	};
}));
var require_utimes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$15 = require_graceful_fs();
	function utimesMillis$1(path$25, atime, mtime, callback) {
		fs$15.open(path$25, "r+", (err, fd) => {
			if (err) return callback(err);
			fs$15.futimes(fd, atime, mtime, (futimesErr) => {
				fs$15.close(fd, (closeErr) => {
					if (callback) callback(futimesErr || closeErr);
				});
			});
		});
	}
	function utimesMillisSync$1(path$25, atime, mtime) {
		const fd = fs$15.openSync(path$25, "r+");
		fs$15.futimesSync(fd, atime, mtime);
		return fs$15.closeSync(fd);
	}
	module.exports = {
		utimesMillis: utimesMillis$1,
		utimesMillisSync: utimesMillisSync$1
	};
}));
var require_stat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$14 = require_fs();
	var path$23 = __require("path");
	var util = __require("util");
	function getStats$2(src, dest, opts) {
		const statFunc = opts.dereference ? (file) => fs$14.stat(file, { bigint: true }) : (file) => fs$14.lstat(file, { bigint: true });
		return Promise.all([statFunc(src), statFunc(dest).catch((err) => {
			if (err.code === "ENOENT") return null;
			throw err;
		})]).then(([srcStat, destStat]) => ({
			srcStat,
			destStat
		}));
	}
	function getStatsSync(src, dest, opts) {
		let destStat;
		const statFunc = opts.dereference ? (file) => fs$14.statSync(file, { bigint: true }) : (file) => fs$14.lstatSync(file, { bigint: true });
		const srcStat = statFunc(src);
		try {
			destStat = statFunc(dest);
		} catch (err) {
			if (err.code === "ENOENT") return {
				srcStat,
				destStat: null
			};
			throw err;
		}
		return {
			srcStat,
			destStat
		};
	}
	function checkPaths(src, dest, funcName, opts, cb) {
		util.callbackify(getStats$2)(src, dest, opts, (err, stats) => {
			if (err) return cb(err);
			const { srcStat, destStat } = stats;
			if (destStat) {
				if (areIdentical$2(srcStat, destStat)) {
					const srcBaseName = path$23.basename(src);
					const destBaseName = path$23.basename(dest);
					if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) return cb(null, {
						srcStat,
						destStat,
						isChangingCase: true
					});
					return cb(/* @__PURE__ */ new Error("Source and destination must not be the same."));
				}
				if (srcStat.isDirectory() && !destStat.isDirectory()) return cb(/* @__PURE__ */ new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
				if (!srcStat.isDirectory() && destStat.isDirectory()) return cb(/* @__PURE__ */ new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
			}
			if (srcStat.isDirectory() && isSrcSubdir(src, dest)) return cb(new Error(errMsg(src, dest, funcName)));
			return cb(null, {
				srcStat,
				destStat
			});
		});
	}
	function checkPathsSync(src, dest, funcName, opts) {
		const { srcStat, destStat } = getStatsSync(src, dest, opts);
		if (destStat) {
			if (areIdentical$2(srcStat, destStat)) {
				const srcBaseName = path$23.basename(src);
				const destBaseName = path$23.basename(dest);
				if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) return {
					srcStat,
					destStat,
					isChangingCase: true
				};
				throw new Error("Source and destination must not be the same.");
			}
			if (srcStat.isDirectory() && !destStat.isDirectory()) throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
			if (!srcStat.isDirectory() && destStat.isDirectory()) throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
		}
		if (srcStat.isDirectory() && isSrcSubdir(src, dest)) throw new Error(errMsg(src, dest, funcName));
		return {
			srcStat,
			destStat
		};
	}
	function checkParentPaths(src, srcStat, dest, funcName, cb) {
		const srcParent = path$23.resolve(path$23.dirname(src));
		const destParent = path$23.resolve(path$23.dirname(dest));
		if (destParent === srcParent || destParent === path$23.parse(destParent).root) return cb();
		fs$14.stat(destParent, { bigint: true }, (err, destStat) => {
			if (err) {
				if (err.code === "ENOENT") return cb();
				return cb(err);
			}
			if (areIdentical$2(srcStat, destStat)) return cb(new Error(errMsg(src, dest, funcName)));
			return checkParentPaths(src, srcStat, destParent, funcName, cb);
		});
	}
	function checkParentPathsSync(src, srcStat, dest, funcName) {
		const srcParent = path$23.resolve(path$23.dirname(src));
		const destParent = path$23.resolve(path$23.dirname(dest));
		if (destParent === srcParent || destParent === path$23.parse(destParent).root) return;
		let destStat;
		try {
			destStat = fs$14.statSync(destParent, { bigint: true });
		} catch (err) {
			if (err.code === "ENOENT") return;
			throw err;
		}
		if (areIdentical$2(srcStat, destStat)) throw new Error(errMsg(src, dest, funcName));
		return checkParentPathsSync(src, srcStat, destParent, funcName);
	}
	function areIdentical$2(srcStat, destStat) {
		return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
	}
	function isSrcSubdir(src, dest) {
		const srcArr = path$23.resolve(src).split(path$23.sep).filter((i$1) => i$1);
		const destArr = path$23.resolve(dest).split(path$23.sep).filter((i$1) => i$1);
		return srcArr.reduce((acc, cur, i$1) => acc && destArr[i$1] === cur, true);
	}
	function errMsg(src, dest, funcName) {
		return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
	}
	module.exports = {
		checkPaths,
		checkPathsSync,
		checkParentPaths,
		checkParentPathsSync,
		isSrcSubdir,
		areIdentical: areIdentical$2
	};
}));
var require_copy$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$13 = require_graceful_fs();
	var path$22 = __require("path");
	var mkdirs$1 = require_mkdirs().mkdirs;
	var pathExists$5 = require_path_exists().pathExists;
	var utimesMillis = require_utimes().utimesMillis;
	var stat$3 = require_stat();
	function copy$1(src, dest, opts, cb) {
		if (typeof opts === "function" && !cb) {
			cb = opts;
			opts = {};
		} else if (typeof opts === "function") opts = { filter: opts };
		cb = cb || function() {};
		opts = opts || {};
		opts.clobber = "clobber" in opts ? !!opts.clobber : true;
		opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
		if (opts.preserveTimestamps && process.arch === "ia32") process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0001");
		stat$3.checkPaths(src, dest, "copy", opts, (err, stats) => {
			if (err) return cb(err);
			const { srcStat, destStat } = stats;
			stat$3.checkParentPaths(src, srcStat, dest, "copy", (err$1) => {
				if (err$1) return cb(err$1);
				if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
				return checkParentDir(destStat, src, dest, opts, cb);
			});
		});
	}
	function checkParentDir(destStat, src, dest, opts, cb) {
		const destParent = path$22.dirname(dest);
		pathExists$5(destParent, (err, dirExists) => {
			if (err) return cb(err);
			if (dirExists) return getStats$1(destStat, src, dest, opts, cb);
			mkdirs$1(destParent, (err$1) => {
				if (err$1) return cb(err$1);
				return getStats$1(destStat, src, dest, opts, cb);
			});
		});
	}
	function handleFilter(onInclude, destStat, src, dest, opts, cb) {
		Promise.resolve(opts.filter(src, dest)).then((include) => {
			if (include) return onInclude(destStat, src, dest, opts, cb);
			return cb();
		}, (error) => cb(error));
	}
	function startCopy$1(destStat, src, dest, opts, cb) {
		if (opts.filter) return handleFilter(getStats$1, destStat, src, dest, opts, cb);
		return getStats$1(destStat, src, dest, opts, cb);
	}
	function getStats$1(destStat, src, dest, opts, cb) {
		(opts.dereference ? fs$13.stat : fs$13.lstat)(src, (err, srcStat) => {
			if (err) return cb(err);
			if (srcStat.isDirectory()) return onDir$1(srcStat, destStat, src, dest, opts, cb);
			else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile$1(srcStat, destStat, src, dest, opts, cb);
			else if (srcStat.isSymbolicLink()) return onLink$1(destStat, src, dest, opts, cb);
			else if (srcStat.isSocket()) return cb(/* @__PURE__ */ new Error(`Cannot copy a socket file: ${src}`));
			else if (srcStat.isFIFO()) return cb(/* @__PURE__ */ new Error(`Cannot copy a FIFO pipe: ${src}`));
			return cb(/* @__PURE__ */ new Error(`Unknown file: ${src}`));
		});
	}
	function onFile$1(srcStat, destStat, src, dest, opts, cb) {
		if (!destStat) return copyFile$1(srcStat, src, dest, opts, cb);
		return mayCopyFile$1(srcStat, src, dest, opts, cb);
	}
	function mayCopyFile$1(srcStat, src, dest, opts, cb) {
		if (opts.overwrite) fs$13.unlink(dest, (err) => {
			if (err) return cb(err);
			return copyFile$1(srcStat, src, dest, opts, cb);
		});
		else if (opts.errorOnExist) return cb(/* @__PURE__ */ new Error(`'${dest}' already exists`));
		else return cb();
	}
	function copyFile$1(srcStat, src, dest, opts, cb) {
		fs$13.copyFile(src, dest, (err) => {
			if (err) return cb(err);
			if (opts.preserveTimestamps) return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
			return setDestMode$1(dest, srcStat.mode, cb);
		});
	}
	function handleTimestampsAndMode(srcMode, src, dest, cb) {
		if (fileIsNotWritable$1(srcMode)) return makeFileWritable$1(dest, srcMode, (err) => {
			if (err) return cb(err);
			return setDestTimestampsAndMode(srcMode, src, dest, cb);
		});
		return setDestTimestampsAndMode(srcMode, src, dest, cb);
	}
	function fileIsNotWritable$1(srcMode) {
		return (srcMode & 128) === 0;
	}
	function makeFileWritable$1(dest, srcMode, cb) {
		return setDestMode$1(dest, srcMode | 128, cb);
	}
	function setDestTimestampsAndMode(srcMode, src, dest, cb) {
		setDestTimestamps$1(src, dest, (err) => {
			if (err) return cb(err);
			return setDestMode$1(dest, srcMode, cb);
		});
	}
	function setDestMode$1(dest, srcMode, cb) {
		return fs$13.chmod(dest, srcMode, cb);
	}
	function setDestTimestamps$1(src, dest, cb) {
		fs$13.stat(src, (err, updatedSrcStat) => {
			if (err) return cb(err);
			return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
		});
	}
	function onDir$1(srcStat, destStat, src, dest, opts, cb) {
		if (!destStat) return mkDirAndCopy$1(srcStat.mode, src, dest, opts, cb);
		return copyDir$1(src, dest, opts, cb);
	}
	function mkDirAndCopy$1(srcMode, src, dest, opts, cb) {
		fs$13.mkdir(dest, (err) => {
			if (err) return cb(err);
			copyDir$1(src, dest, opts, (err$1) => {
				if (err$1) return cb(err$1);
				return setDestMode$1(dest, srcMode, cb);
			});
		});
	}
	function copyDir$1(src, dest, opts, cb) {
		fs$13.readdir(src, (err, items) => {
			if (err) return cb(err);
			return copyDirItems(items, src, dest, opts, cb);
		});
	}
	function copyDirItems(items, src, dest, opts, cb) {
		const item = items.pop();
		if (!item) return cb();
		return copyDirItem$1(items, item, src, dest, opts, cb);
	}
	function copyDirItem$1(items, item, src, dest, opts, cb) {
		const srcItem = path$22.join(src, item);
		const destItem = path$22.join(dest, item);
		stat$3.checkPaths(srcItem, destItem, "copy", opts, (err, stats) => {
			if (err) return cb(err);
			const { destStat } = stats;
			startCopy$1(destStat, srcItem, destItem, opts, (err$1) => {
				if (err$1) return cb(err$1);
				return copyDirItems(items, src, dest, opts, cb);
			});
		});
	}
	function onLink$1(destStat, src, dest, opts, cb) {
		fs$13.readlink(src, (err, resolvedSrc) => {
			if (err) return cb(err);
			if (opts.dereference) resolvedSrc = path$22.resolve(process.cwd(), resolvedSrc);
			if (!destStat) return fs$13.symlink(resolvedSrc, dest, cb);
			else fs$13.readlink(dest, (err$1, resolvedDest) => {
				if (err$1) {
					if (err$1.code === "EINVAL" || err$1.code === "UNKNOWN") return fs$13.symlink(resolvedSrc, dest, cb);
					return cb(err$1);
				}
				if (opts.dereference) resolvedDest = path$22.resolve(process.cwd(), resolvedDest);
				if (stat$3.isSrcSubdir(resolvedSrc, resolvedDest)) return cb(/* @__PURE__ */ new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
				if (destStat.isDirectory() && stat$3.isSrcSubdir(resolvedDest, resolvedSrc)) return cb(/* @__PURE__ */ new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
				return copyLink$1(resolvedSrc, dest, cb);
			});
		});
	}
	function copyLink$1(resolvedSrc, dest, cb) {
		fs$13.unlink(dest, (err) => {
			if (err) return cb(err);
			return fs$13.symlink(resolvedSrc, dest, cb);
		});
	}
	module.exports = copy$1;
}));
var require_copy_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$12 = require_graceful_fs();
	var path$21 = __require("path");
	var mkdirsSync$1 = require_mkdirs().mkdirsSync;
	var utimesMillisSync = require_utimes().utimesMillisSync;
	var stat$2 = require_stat();
	function copySync$1(src, dest, opts) {
		if (typeof opts === "function") opts = { filter: opts };
		opts = opts || {};
		opts.clobber = "clobber" in opts ? !!opts.clobber : true;
		opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
		if (opts.preserveTimestamps && process.arch === "ia32") process.emitWarning("Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269", "Warning", "fs-extra-WARN0002");
		const { srcStat, destStat } = stat$2.checkPathsSync(src, dest, "copy", opts);
		stat$2.checkParentPathsSync(src, srcStat, dest, "copy");
		return handleFilterAndCopy(destStat, src, dest, opts);
	}
	function handleFilterAndCopy(destStat, src, dest, opts) {
		if (opts.filter && !opts.filter(src, dest)) return;
		const destParent = path$21.dirname(dest);
		if (!fs$12.existsSync(destParent)) mkdirsSync$1(destParent);
		return getStats(destStat, src, dest, opts);
	}
	function startCopy(destStat, src, dest, opts) {
		if (opts.filter && !opts.filter(src, dest)) return;
		return getStats(destStat, src, dest, opts);
	}
	function getStats(destStat, src, dest, opts) {
		const srcStat = (opts.dereference ? fs$12.statSync : fs$12.lstatSync)(src);
		if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
		else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
		else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
		else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
		else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
		throw new Error(`Unknown file: ${src}`);
	}
	function onFile(srcStat, destStat, src, dest, opts) {
		if (!destStat) return copyFile(srcStat, src, dest, opts);
		return mayCopyFile(srcStat, src, dest, opts);
	}
	function mayCopyFile(srcStat, src, dest, opts) {
		if (opts.overwrite) {
			fs$12.unlinkSync(dest);
			return copyFile(srcStat, src, dest, opts);
		} else if (opts.errorOnExist) throw new Error(`'${dest}' already exists`);
	}
	function copyFile(srcStat, src, dest, opts) {
		fs$12.copyFileSync(src, dest);
		if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
		return setDestMode(dest, srcStat.mode);
	}
	function handleTimestamps(srcMode, src, dest) {
		if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
		return setDestTimestamps(src, dest);
	}
	function fileIsNotWritable(srcMode) {
		return (srcMode & 128) === 0;
	}
	function makeFileWritable(dest, srcMode) {
		return setDestMode(dest, srcMode | 128);
	}
	function setDestMode(dest, srcMode) {
		return fs$12.chmodSync(dest, srcMode);
	}
	function setDestTimestamps(src, dest) {
		const updatedSrcStat = fs$12.statSync(src);
		return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
	}
	function onDir(srcStat, destStat, src, dest, opts) {
		if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
		return copyDir(src, dest, opts);
	}
	function mkDirAndCopy(srcMode, src, dest, opts) {
		fs$12.mkdirSync(dest);
		copyDir(src, dest, opts);
		return setDestMode(dest, srcMode);
	}
	function copyDir(src, dest, opts) {
		fs$12.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
	}
	function copyDirItem(item, src, dest, opts) {
		const srcItem = path$21.join(src, item);
		const destItem = path$21.join(dest, item);
		const { destStat } = stat$2.checkPathsSync(srcItem, destItem, "copy", opts);
		return startCopy(destStat, srcItem, destItem, opts);
	}
	function onLink(destStat, src, dest, opts) {
		let resolvedSrc = fs$12.readlinkSync(src);
		if (opts.dereference) resolvedSrc = path$21.resolve(process.cwd(), resolvedSrc);
		if (!destStat) return fs$12.symlinkSync(resolvedSrc, dest);
		else {
			let resolvedDest;
			try {
				resolvedDest = fs$12.readlinkSync(dest);
			} catch (err) {
				if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs$12.symlinkSync(resolvedSrc, dest);
				throw err;
			}
			if (opts.dereference) resolvedDest = path$21.resolve(process.cwd(), resolvedDest);
			if (stat$2.isSrcSubdir(resolvedSrc, resolvedDest)) throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
			if (fs$12.statSync(dest).isDirectory() && stat$2.isSrcSubdir(resolvedDest, resolvedSrc)) throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
			return copyLink(resolvedSrc, dest);
		}
	}
	function copyLink(resolvedSrc, dest) {
		fs$12.unlinkSync(dest);
		return fs$12.symlinkSync(resolvedSrc, dest);
	}
	module.exports = copySync$1;
}));
var require_copy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$8 = require_universalify().fromCallback;
	module.exports = {
		copy: u$8(require_copy$1()),
		copySync: require_copy_sync()
	};
}));
var require_rimraf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$11 = require_graceful_fs();
	var path$20 = __require("path");
	var assert = __require("assert");
	var isWindows = process.platform === "win32";
	function defaults(options$1) {
		[
			"unlink",
			"chmod",
			"stat",
			"lstat",
			"rmdir",
			"readdir"
		].forEach((m) => {
			options$1[m] = options$1[m] || fs$11[m];
			m = m + "Sync";
			options$1[m] = options$1[m] || fs$11[m];
		});
		options$1.maxBusyTries = options$1.maxBusyTries || 3;
	}
	function rimraf$1(p, options$1, cb) {
		let busyTries = 0;
		if (typeof options$1 === "function") {
			cb = options$1;
			options$1 = {};
		}
		assert(p, "rimraf: missing path");
		assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
		assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
		assert(options$1, "rimraf: invalid options argument provided");
		assert.strictEqual(typeof options$1, "object", "rimraf: options should be object");
		defaults(options$1);
		rimraf_(p, options$1, function CB(er) {
			if (er) {
				if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options$1.maxBusyTries) {
					busyTries++;
					const time = busyTries * 100;
					return setTimeout(() => rimraf_(p, options$1, CB), time);
				}
				if (er.code === "ENOENT") er = null;
			}
			cb(er);
		});
	}
	function rimraf_(p, options$1, cb) {
		assert(p);
		assert(options$1);
		assert(typeof cb === "function");
		options$1.lstat(p, (er, st) => {
			if (er && er.code === "ENOENT") return cb(null);
			if (er && er.code === "EPERM" && isWindows) return fixWinEPERM(p, options$1, er, cb);
			if (st && st.isDirectory()) return rmdir(p, options$1, er, cb);
			options$1.unlink(p, (er$1) => {
				if (er$1) {
					if (er$1.code === "ENOENT") return cb(null);
					if (er$1.code === "EPERM") return isWindows ? fixWinEPERM(p, options$1, er$1, cb) : rmdir(p, options$1, er$1, cb);
					if (er$1.code === "EISDIR") return rmdir(p, options$1, er$1, cb);
				}
				return cb(er$1);
			});
		});
	}
	function fixWinEPERM(p, options$1, er, cb) {
		assert(p);
		assert(options$1);
		assert(typeof cb === "function");
		options$1.chmod(p, 438, (er2) => {
			if (er2) cb(er2.code === "ENOENT" ? null : er);
			else options$1.stat(p, (er3, stats) => {
				if (er3) cb(er3.code === "ENOENT" ? null : er);
				else if (stats.isDirectory()) rmdir(p, options$1, er, cb);
				else options$1.unlink(p, cb);
			});
		});
	}
	function fixWinEPERMSync(p, options$1, er) {
		let stats;
		assert(p);
		assert(options$1);
		try {
			options$1.chmodSync(p, 438);
		} catch (er2) {
			if (er2.code === "ENOENT") return;
			else throw er;
		}
		try {
			stats = options$1.statSync(p);
		} catch (er3) {
			if (er3.code === "ENOENT") return;
			else throw er;
		}
		if (stats.isDirectory()) rmdirSync(p, options$1, er);
		else options$1.unlinkSync(p);
	}
	function rmdir(p, options$1, originalEr, cb) {
		assert(p);
		assert(options$1);
		assert(typeof cb === "function");
		options$1.rmdir(p, (er) => {
			if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) rmkids(p, options$1, cb);
			else if (er && er.code === "ENOTDIR") cb(originalEr);
			else cb(er);
		});
	}
	function rmkids(p, options$1, cb) {
		assert(p);
		assert(options$1);
		assert(typeof cb === "function");
		options$1.readdir(p, (er, files) => {
			if (er) return cb(er);
			let n = files.length;
			let errState;
			if (n === 0) return options$1.rmdir(p, cb);
			files.forEach((f) => {
				rimraf$1(path$20.join(p, f), options$1, (er$1) => {
					if (errState) return;
					if (er$1) return cb(errState = er$1);
					if (--n === 0) options$1.rmdir(p, cb);
				});
			});
		});
	}
	function rimrafSync(p, options$1) {
		let st;
		options$1 = options$1 || {};
		defaults(options$1);
		assert(p, "rimraf: missing path");
		assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
		assert(options$1, "rimraf: missing options");
		assert.strictEqual(typeof options$1, "object", "rimraf: options should be object");
		try {
			st = options$1.lstatSync(p);
		} catch (er) {
			if (er.code === "ENOENT") return;
			if (er.code === "EPERM" && isWindows) fixWinEPERMSync(p, options$1, er);
		}
		try {
			if (st && st.isDirectory()) rmdirSync(p, options$1, null);
			else options$1.unlinkSync(p);
		} catch (er) {
			if (er.code === "ENOENT") return;
			else if (er.code === "EPERM") return isWindows ? fixWinEPERMSync(p, options$1, er) : rmdirSync(p, options$1, er);
			else if (er.code !== "EISDIR") throw er;
			rmdirSync(p, options$1, er);
		}
	}
	function rmdirSync(p, options$1, originalEr) {
		assert(p);
		assert(options$1);
		try {
			options$1.rmdirSync(p);
		} catch (er) {
			if (er.code === "ENOTDIR") throw originalEr;
			else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") rmkidsSync(p, options$1);
			else if (er.code !== "ENOENT") throw er;
		}
	}
	function rmkidsSync(p, options$1) {
		assert(p);
		assert(options$1);
		options$1.readdirSync(p).forEach((f) => rimrafSync(path$20.join(p, f), options$1));
		if (isWindows) {
			const startTime = Date.now();
			do
				try {
					return options$1.rmdirSync(p, options$1);
				} catch {}
			while (Date.now() - startTime < 500);
		} else return options$1.rmdirSync(p, options$1);
	}
	module.exports = rimraf$1;
	rimraf$1.sync = rimrafSync;
}));
var require_remove = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$10 = require_graceful_fs();
	var u$7 = require_universalify().fromCallback;
	var rimraf = require_rimraf();
	function remove$2(path$25, callback) {
		if (fs$10.rm) return fs$10.rm(path$25, {
			recursive: true,
			force: true
		}, callback);
		rimraf(path$25, callback);
	}
	function removeSync$1(path$25) {
		if (fs$10.rmSync) return fs$10.rmSync(path$25, {
			recursive: true,
			force: true
		});
		rimraf.sync(path$25);
	}
	module.exports = {
		remove: u$7(remove$2),
		removeSync: removeSync$1
	};
}));
var require_empty = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$6 = require_universalify().fromPromise;
	var fs$9 = require_fs();
	var path$19 = __require("path");
	var mkdir$3 = require_mkdirs();
	var remove$1 = require_remove();
	var emptyDir = u$6(async function emptyDir$1(dir) {
		let items;
		try {
			items = await fs$9.readdir(dir);
		} catch {
			return mkdir$3.mkdirs(dir);
		}
		return Promise.all(items.map((item) => remove$1.remove(path$19.join(dir, item))));
	});
	function emptyDirSync(dir) {
		let items;
		try {
			items = fs$9.readdirSync(dir);
		} catch {
			return mkdir$3.mkdirsSync(dir);
		}
		items.forEach((item) => {
			item = path$19.join(dir, item);
			remove$1.removeSync(item);
		});
	}
	module.exports = {
		emptyDirSync,
		emptydirSync: emptyDirSync,
		emptyDir,
		emptydir: emptyDir
	};
}));
var require_file = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$5 = require_universalify().fromCallback;
	var path$18 = __require("path");
	var fs$8 = require_graceful_fs();
	var mkdir$2 = require_mkdirs();
	function createFile$1(file, callback) {
		function makeFile() {
			fs$8.writeFile(file, "", (err) => {
				if (err) return callback(err);
				callback();
			});
		}
		fs$8.stat(file, (err, stats) => {
			if (!err && stats.isFile()) return callback();
			const dir = path$18.dirname(file);
			fs$8.stat(dir, (err$1, stats$1) => {
				if (err$1) {
					if (err$1.code === "ENOENT") return mkdir$2.mkdirs(dir, (err$2) => {
						if (err$2) return callback(err$2);
						makeFile();
					});
					return callback(err$1);
				}
				if (stats$1.isDirectory()) makeFile();
				else fs$8.readdir(dir, (err$2) => {
					if (err$2) return callback(err$2);
				});
			});
		});
	}
	function createFileSync$1(file) {
		let stats;
		try {
			stats = fs$8.statSync(file);
		} catch {}
		if (stats && stats.isFile()) return;
		const dir = path$18.dirname(file);
		try {
			if (!fs$8.statSync(dir).isDirectory()) fs$8.readdirSync(dir);
		} catch (err) {
			if (err && err.code === "ENOENT") mkdir$2.mkdirsSync(dir);
			else throw err;
		}
		fs$8.writeFileSync(file, "");
	}
	module.exports = {
		createFile: u$5(createFile$1),
		createFileSync: createFileSync$1
	};
}));
var require_link = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$4 = require_universalify().fromCallback;
	var path$17 = __require("path");
	var fs$7 = require_graceful_fs();
	var mkdir$1 = require_mkdirs();
	var pathExists$4 = require_path_exists().pathExists;
	var { areIdentical: areIdentical$1 } = require_stat();
	function createLink$1(srcpath, dstpath, callback) {
		function makeLink(srcpath$1, dstpath$1) {
			fs$7.link(srcpath$1, dstpath$1, (err) => {
				if (err) return callback(err);
				callback(null);
			});
		}
		fs$7.lstat(dstpath, (_, dstStat) => {
			fs$7.lstat(srcpath, (err, srcStat) => {
				if (err) {
					err.message = err.message.replace("lstat", "ensureLink");
					return callback(err);
				}
				if (dstStat && areIdentical$1(srcStat, dstStat)) return callback(null);
				const dir = path$17.dirname(dstpath);
				pathExists$4(dir, (err$1, dirExists) => {
					if (err$1) return callback(err$1);
					if (dirExists) return makeLink(srcpath, dstpath);
					mkdir$1.mkdirs(dir, (err$2) => {
						if (err$2) return callback(err$2);
						makeLink(srcpath, dstpath);
					});
				});
			});
		});
	}
	function createLinkSync$1(srcpath, dstpath) {
		let dstStat;
		try {
			dstStat = fs$7.lstatSync(dstpath);
		} catch {}
		try {
			const srcStat = fs$7.lstatSync(srcpath);
			if (dstStat && areIdentical$1(srcStat, dstStat)) return;
		} catch (err) {
			err.message = err.message.replace("lstat", "ensureLink");
			throw err;
		}
		const dir = path$17.dirname(dstpath);
		if (fs$7.existsSync(dir)) return fs$7.linkSync(srcpath, dstpath);
		mkdir$1.mkdirsSync(dir);
		return fs$7.linkSync(srcpath, dstpath);
	}
	module.exports = {
		createLink: u$4(createLink$1),
		createLinkSync: createLinkSync$1
	};
}));
var require_symlink_paths = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var path$16 = __require("path");
	var fs$6 = require_graceful_fs();
	var pathExists$3 = require_path_exists().pathExists;
	function symlinkPaths$1(srcpath, dstpath, callback) {
		if (path$16.isAbsolute(srcpath)) return fs$6.lstat(srcpath, (err) => {
			if (err) {
				err.message = err.message.replace("lstat", "ensureSymlink");
				return callback(err);
			}
			return callback(null, {
				toCwd: srcpath,
				toDst: srcpath
			});
		});
		else {
			const dstdir = path$16.dirname(dstpath);
			const relativeToDst = path$16.join(dstdir, srcpath);
			return pathExists$3(relativeToDst, (err, exists) => {
				if (err) return callback(err);
				if (exists) return callback(null, {
					toCwd: relativeToDst,
					toDst: srcpath
				});
				else return fs$6.lstat(srcpath, (err$1) => {
					if (err$1) {
						err$1.message = err$1.message.replace("lstat", "ensureSymlink");
						return callback(err$1);
					}
					return callback(null, {
						toCwd: srcpath,
						toDst: path$16.relative(dstdir, srcpath)
					});
				});
			});
		}
	}
	function symlinkPathsSync$1(srcpath, dstpath) {
		let exists;
		if (path$16.isAbsolute(srcpath)) {
			exists = fs$6.existsSync(srcpath);
			if (!exists) throw new Error("absolute srcpath does not exist");
			return {
				toCwd: srcpath,
				toDst: srcpath
			};
		} else {
			const dstdir = path$16.dirname(dstpath);
			const relativeToDst = path$16.join(dstdir, srcpath);
			exists = fs$6.existsSync(relativeToDst);
			if (exists) return {
				toCwd: relativeToDst,
				toDst: srcpath
			};
			else {
				exists = fs$6.existsSync(srcpath);
				if (!exists) throw new Error("relative srcpath does not exist");
				return {
					toCwd: srcpath,
					toDst: path$16.relative(dstdir, srcpath)
				};
			}
		}
	}
	module.exports = {
		symlinkPaths: symlinkPaths$1,
		symlinkPathsSync: symlinkPathsSync$1
	};
}));
var require_symlink_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$5 = require_graceful_fs();
	function symlinkType$1(srcpath, type$1, callback) {
		callback = typeof type$1 === "function" ? type$1 : callback;
		type$1 = typeof type$1 === "function" ? false : type$1;
		if (type$1) return callback(null, type$1);
		fs$5.lstat(srcpath, (err, stats) => {
			if (err) return callback(null, "file");
			type$1 = stats && stats.isDirectory() ? "dir" : "file";
			callback(null, type$1);
		});
	}
	function symlinkTypeSync$1(srcpath, type$1) {
		let stats;
		if (type$1) return type$1;
		try {
			stats = fs$5.lstatSync(srcpath);
		} catch {
			return "file";
		}
		return stats && stats.isDirectory() ? "dir" : "file";
	}
	module.exports = {
		symlinkType: symlinkType$1,
		symlinkTypeSync: symlinkTypeSync$1
	};
}));
var require_symlink = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$3 = require_universalify().fromCallback;
	var path$15 = __require("path");
	var fs$4 = require_fs();
	var _mkdirs = require_mkdirs();
	var mkdirs = _mkdirs.mkdirs;
	var mkdirsSync = _mkdirs.mkdirsSync;
	var _symlinkPaths = require_symlink_paths();
	var symlinkPaths = _symlinkPaths.symlinkPaths;
	var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
	var _symlinkType = require_symlink_type();
	var symlinkType = _symlinkType.symlinkType;
	var symlinkTypeSync = _symlinkType.symlinkTypeSync;
	var pathExists$2 = require_path_exists().pathExists;
	var { areIdentical } = require_stat();
	function createSymlink$1(srcpath, dstpath, type$1, callback) {
		callback = typeof type$1 === "function" ? type$1 : callback;
		type$1 = typeof type$1 === "function" ? false : type$1;
		fs$4.lstat(dstpath, (err, stats) => {
			if (!err && stats.isSymbolicLink()) Promise.all([fs$4.stat(srcpath), fs$4.stat(dstpath)]).then(([srcStat, dstStat]) => {
				if (areIdentical(srcStat, dstStat)) return callback(null);
				_createSymlink(srcpath, dstpath, type$1, callback);
			});
			else _createSymlink(srcpath, dstpath, type$1, callback);
		});
	}
	function _createSymlink(srcpath, dstpath, type$1, callback) {
		symlinkPaths(srcpath, dstpath, (err, relative) => {
			if (err) return callback(err);
			srcpath = relative.toDst;
			symlinkType(relative.toCwd, type$1, (err$1, type$2) => {
				if (err$1) return callback(err$1);
				const dir = path$15.dirname(dstpath);
				pathExists$2(dir, (err$2, dirExists) => {
					if (err$2) return callback(err$2);
					if (dirExists) return fs$4.symlink(srcpath, dstpath, type$2, callback);
					mkdirs(dir, (err$3) => {
						if (err$3) return callback(err$3);
						fs$4.symlink(srcpath, dstpath, type$2, callback);
					});
				});
			});
		});
	}
	function createSymlinkSync$1(srcpath, dstpath, type$1) {
		let stats;
		try {
			stats = fs$4.lstatSync(dstpath);
		} catch {}
		if (stats && stats.isSymbolicLink()) {
			const srcStat = fs$4.statSync(srcpath);
			const dstStat = fs$4.statSync(dstpath);
			if (areIdentical(srcStat, dstStat)) return;
		}
		const relative = symlinkPathsSync(srcpath, dstpath);
		srcpath = relative.toDst;
		type$1 = symlinkTypeSync(relative.toCwd, type$1);
		const dir = path$15.dirname(dstpath);
		if (fs$4.existsSync(dir)) return fs$4.symlinkSync(srcpath, dstpath, type$1);
		mkdirsSync(dir);
		return fs$4.symlinkSync(srcpath, dstpath, type$1);
	}
	module.exports = {
		createSymlink: u$3(createSymlink$1),
		createSymlinkSync: createSymlinkSync$1
	};
}));
var require_ensure = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { createFile, createFileSync } = require_file();
	var { createLink, createLinkSync } = require_link();
	var { createSymlink, createSymlinkSync } = require_symlink();
	module.exports = {
		createFile,
		createFileSync,
		ensureFile: createFile,
		ensureFileSync: createFileSync,
		createLink,
		createLinkSync,
		ensureLink: createLink,
		ensureLinkSync: createLinkSync,
		createSymlink,
		createSymlinkSync,
		ensureSymlink: createSymlink,
		ensureSymlinkSync: createSymlinkSync
	};
}));
var require_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function stringify$5(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
		const EOF = finalEOL ? EOL : "";
		return JSON.stringify(obj, replacer, spaces).replace(/\n/g, EOL) + EOF;
	}
	function stripBom$1(content) {
		if (Buffer.isBuffer(content)) content = content.toString("utf8");
		return content.replace(/^\uFEFF/, "");
	}
	module.exports = {
		stringify: stringify$5,
		stripBom: stripBom$1
	};
}));
var require_jsonfile$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _fs;
	try {
		_fs = require_graceful_fs();
	} catch (_) {
		_fs = __require("fs");
	}
	var universalify = require_universalify();
	var { stringify: stringify$4, stripBom } = require_utils();
	async function _readFile(file, options$1 = {}) {
		if (typeof options$1 === "string") options$1 = { encoding: options$1 };
		const fs$20 = options$1.fs || _fs;
		const shouldThrow = "throws" in options$1 ? options$1.throws : true;
		let data = await universalify.fromCallback(fs$20.readFile)(file, options$1);
		data = stripBom(data);
		let obj;
		try {
			obj = JSON.parse(data, options$1 ? options$1.reviver : null);
		} catch (err) {
			if (shouldThrow) {
				err.message = `${file}: ${err.message}`;
				throw err;
			} else return null;
		}
		return obj;
	}
	var readFile = universalify.fromPromise(_readFile);
	function readFileSync(file, options$1 = {}) {
		if (typeof options$1 === "string") options$1 = { encoding: options$1 };
		const fs$20 = options$1.fs || _fs;
		const shouldThrow = "throws" in options$1 ? options$1.throws : true;
		try {
			let content = fs$20.readFileSync(file, options$1);
			content = stripBom(content);
			return JSON.parse(content, options$1.reviver);
		} catch (err) {
			if (shouldThrow) {
				err.message = `${file}: ${err.message}`;
				throw err;
			} else return null;
		}
	}
	async function _writeFile(file, obj, options$1 = {}) {
		const fs$20 = options$1.fs || _fs;
		const str = stringify$4(obj, options$1);
		await universalify.fromCallback(fs$20.writeFile)(file, str, options$1);
	}
	var writeFile = universalify.fromPromise(_writeFile);
	function writeFileSync$1(file, obj, options$1 = {}) {
		const fs$20 = options$1.fs || _fs;
		const str = stringify$4(obj, options$1);
		return fs$20.writeFileSync(file, str, options$1);
	}
	module.exports = {
		readFile,
		readFileSync,
		writeFile,
		writeFileSync: writeFileSync$1
	};
}));
var require_jsonfile = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var jsonFile$1 = require_jsonfile$1();
	module.exports = {
		readJson: jsonFile$1.readFile,
		readJsonSync: jsonFile$1.readFileSync,
		writeJson: jsonFile$1.writeFile,
		writeJsonSync: jsonFile$1.writeFileSync
	};
}));
var require_output_file = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$2 = require_universalify().fromCallback;
	var fs$3 = require_graceful_fs();
	var path$14 = __require("path");
	var mkdir = require_mkdirs();
	var pathExists$1 = require_path_exists().pathExists;
	function outputFile$1(file, data, encoding, callback) {
		if (typeof encoding === "function") {
			callback = encoding;
			encoding = "utf8";
		}
		const dir = path$14.dirname(file);
		pathExists$1(dir, (err, itDoes) => {
			if (err) return callback(err);
			if (itDoes) return fs$3.writeFile(file, data, encoding, callback);
			mkdir.mkdirs(dir, (err$1) => {
				if (err$1) return callback(err$1);
				fs$3.writeFile(file, data, encoding, callback);
			});
		});
	}
	function outputFileSync$1(file, ...args) {
		const dir = path$14.dirname(file);
		if (fs$3.existsSync(dir)) return fs$3.writeFileSync(file, ...args);
		mkdir.mkdirsSync(dir);
		fs$3.writeFileSync(file, ...args);
	}
	module.exports = {
		outputFile: u$2(outputFile$1),
		outputFileSync: outputFileSync$1
	};
}));
var require_output_json = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { stringify: stringify$3 } = require_utils();
	var { outputFile } = require_output_file();
	async function outputJson(file, data, options$1 = {}) {
		const str = stringify$3(data, options$1);
		await outputFile(file, str, options$1);
	}
	module.exports = outputJson;
}));
var require_output_json_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { stringify: stringify$2 } = require_utils();
	var { outputFileSync } = require_output_file();
	function outputJsonSync(file, data, options$1) {
		const str = stringify$2(data, options$1);
		outputFileSync(file, str, options$1);
	}
	module.exports = outputJsonSync;
}));
var require_json$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u$1 = require_universalify().fromPromise;
	var jsonFile = require_jsonfile();
	jsonFile.outputJson = u$1(require_output_json());
	jsonFile.outputJsonSync = require_output_json_sync();
	jsonFile.outputJSON = jsonFile.outputJson;
	jsonFile.outputJSONSync = jsonFile.outputJsonSync;
	jsonFile.writeJSON = jsonFile.writeJson;
	jsonFile.writeJSONSync = jsonFile.writeJsonSync;
	jsonFile.readJSON = jsonFile.readJson;
	jsonFile.readJSONSync = jsonFile.readJsonSync;
	module.exports = jsonFile;
}));
var require_move$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$2 = require_graceful_fs();
	var path$13 = __require("path");
	var copy = require_copy().copy;
	var remove = require_remove().remove;
	var mkdirp = require_mkdirs().mkdirp;
	var pathExists = require_path_exists().pathExists;
	var stat$1 = require_stat();
	function move(src, dest, opts, cb) {
		if (typeof opts === "function") {
			cb = opts;
			opts = {};
		}
		opts = opts || {};
		const overwrite = opts.overwrite || opts.clobber || false;
		stat$1.checkPaths(src, dest, "move", opts, (err, stats) => {
			if (err) return cb(err);
			const { srcStat, isChangingCase = false } = stats;
			stat$1.checkParentPaths(src, srcStat, dest, "move", (err$1) => {
				if (err$1) return cb(err$1);
				if (isParentRoot$1(dest)) return doRename$1(src, dest, overwrite, isChangingCase, cb);
				mkdirp(path$13.dirname(dest), (err$2) => {
					if (err$2) return cb(err$2);
					return doRename$1(src, dest, overwrite, isChangingCase, cb);
				});
			});
		});
	}
	function isParentRoot$1(dest) {
		const parent = path$13.dirname(dest);
		return path$13.parse(parent).root === parent;
	}
	function doRename$1(src, dest, overwrite, isChangingCase, cb) {
		if (isChangingCase) return rename$1(src, dest, overwrite, cb);
		if (overwrite) return remove(dest, (err) => {
			if (err) return cb(err);
			return rename$1(src, dest, overwrite, cb);
		});
		pathExists(dest, (err, destExists) => {
			if (err) return cb(err);
			if (destExists) return cb(/* @__PURE__ */ new Error("dest already exists."));
			return rename$1(src, dest, overwrite, cb);
		});
	}
	function rename$1(src, dest, overwrite, cb) {
		fs$2.rename(src, dest, (err) => {
			if (!err) return cb();
			if (err.code !== "EXDEV") return cb(err);
			return moveAcrossDevice$1(src, dest, overwrite, cb);
		});
	}
	function moveAcrossDevice$1(src, dest, overwrite, cb) {
		copy(src, dest, {
			overwrite,
			errorOnExist: true
		}, (err) => {
			if (err) return cb(err);
			return remove(src, cb);
		});
	}
	module.exports = move;
}));
var require_move_sync = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$1 = require_graceful_fs();
	var path$12 = __require("path");
	var copySync = require_copy().copySync;
	var removeSync = require_remove().removeSync;
	var mkdirpSync = require_mkdirs().mkdirpSync;
	var stat = require_stat();
	function moveSync(src, dest, opts) {
		opts = opts || {};
		const overwrite = opts.overwrite || opts.clobber || false;
		const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
		stat.checkParentPathsSync(src, srcStat, dest, "move");
		if (!isParentRoot(dest)) mkdirpSync(path$12.dirname(dest));
		return doRename(src, dest, overwrite, isChangingCase);
	}
	function isParentRoot(dest) {
		const parent = path$12.dirname(dest);
		return path$12.parse(parent).root === parent;
	}
	function doRename(src, dest, overwrite, isChangingCase) {
		if (isChangingCase) return rename(src, dest, overwrite);
		if (overwrite) {
			removeSync(dest);
			return rename(src, dest, overwrite);
		}
		if (fs$1.existsSync(dest)) throw new Error("dest already exists.");
		return rename(src, dest, overwrite);
	}
	function rename(src, dest, overwrite) {
		try {
			fs$1.renameSync(src, dest);
		} catch (err) {
			if (err.code !== "EXDEV") throw err;
			return moveAcrossDevice(src, dest, overwrite);
		}
	}
	function moveAcrossDevice(src, dest, overwrite) {
		copySync(src, dest, {
			overwrite,
			errorOnExist: true
		});
		return removeSync(src);
	}
	module.exports = moveSync;
}));
var require_move = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var u = require_universalify().fromCallback;
	module.exports = {
		move: u(require_move$1()),
		moveSync: require_move_sync()
	};
}));
var require_lib$7 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		...require_fs(),
		...require_copy(),
		...require_empty(),
		...require_ensure(),
		...require_json$1(),
		...require_mkdirs(),
		...require_move(),
		...require_output_file(),
		...require_path_exists(),
		...require_remove()
	};
}));
var require_CancellationToken = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var events_1$1 = __require("events");
	var CancellationToken = class extends events_1$1.EventEmitter {
		get cancelled() {
			return this._cancelled || this._parent != null && this._parent.cancelled;
		}
		set parent(value) {
			this.removeParentCancelHandler();
			this._parent = value;
			this.parentCancelHandler = () => this.cancel();
			this._parent.onCancel(this.parentCancelHandler);
		}
		constructor(parent) {
			super();
			this.parentCancelHandler = null;
			this._parent = null;
			this._cancelled = false;
			if (parent != null) this.parent = parent;
		}
		cancel() {
			this._cancelled = true;
			this.emit("cancel");
		}
		onCancel(handler) {
			if (this.cancelled) handler();
			else this.once("cancel", handler);
		}
		createPromise(callback) {
			if (this.cancelled) return Promise.reject(new CancellationError());
			const finallyHandler = () => {
				if (cancelHandler != null) try {
					this.removeListener("cancel", cancelHandler);
					cancelHandler = null;
				} catch (_ignore) {}
			};
			let cancelHandler = null;
			return new Promise((resolve, reject) => {
				let addedCancelHandler = null;
				cancelHandler = () => {
					try {
						if (addedCancelHandler != null) {
							addedCancelHandler();
							addedCancelHandler = null;
						}
					} finally {
						reject(new CancellationError());
					}
				};
				if (this.cancelled) {
					cancelHandler();
					return;
				}
				this.onCancel(cancelHandler);
				callback(resolve, reject, (callback$1) => {
					addedCancelHandler = callback$1;
				});
			}).then((it) => {
				finallyHandler();
				return it;
			}).catch((e) => {
				finallyHandler();
				throw e;
			});
		}
		removeParentCancelHandler() {
			const parent = this._parent;
			if (parent != null && this.parentCancelHandler != null) {
				parent.removeListener("cancel", this.parentCancelHandler);
				this.parentCancelHandler = null;
			}
		}
		dispose() {
			try {
				this.removeParentCancelHandler();
			} finally {
				this.removeAllListeners();
				this._parent = null;
			}
		}
	};
	exports.CancellationToken = CancellationToken;
	var CancellationError = class extends Error {
		constructor() {
			super("cancelled");
		}
	};
	exports.CancellationError = CancellationError;
}));
var require_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.newError = newError;
	function newError(message, code) {
		const error = new Error(message);
		error.code = code;
		return error;
	}
}));
var require_ProgressCallbackTransform = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var stream_1$3 = __require("stream");
	var ProgressCallbackTransform = class extends stream_1$3.Transform {
		constructor(total, cancellationToken, onProgress) {
			super();
			this.total = total;
			this.cancellationToken = cancellationToken;
			this.onProgress = onProgress;
			this.start = Date.now();
			this.transferred = 0;
			this.delta = 0;
			this.nextUpdate = this.start + 1e3;
		}
		_transform(chunk, encoding, callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"), null);
				return;
			}
			this.transferred += chunk.length;
			this.delta += chunk.length;
			const now$1 = Date.now();
			if (now$1 >= this.nextUpdate && this.transferred !== this.total) {
				this.nextUpdate = now$1 + 1e3;
				this.onProgress({
					total: this.total,
					delta: this.delta,
					transferred: this.transferred,
					percent: this.transferred / this.total * 100,
					bytesPerSecond: Math.round(this.transferred / ((now$1 - this.start) / 1e3))
				});
				this.delta = 0;
			}
			callback(null, chunk);
		}
		_flush(callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"));
				return;
			}
			this.onProgress({
				total: this.total,
				delta: this.delta,
				transferred: this.total,
				percent: 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			});
			this.delta = 0;
			callback(null);
		}
	};
	exports.ProgressCallbackTransform = ProgressCallbackTransform;
}));
var require_httpExecutor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createHttpError = createHttpError;
	exports.parseJson = parseJson;
	exports.configureRequestOptionsFromUrl = configureRequestOptionsFromUrl;
	exports.configureRequestUrl = configureRequestUrl;
	exports.safeGetHeader = safeGetHeader;
	exports.configureRequestOptions = configureRequestOptions;
	exports.safeStringifyJson = safeStringifyJson;
	var crypto_1$4 = __require("crypto");
	var debug_1 = require_src();
	var fs_1$5 = __require("fs");
	var stream_1$2 = __require("stream");
	var url_1$5 = __require("url");
	var CancellationToken_1$2 = require_CancellationToken();
	var error_1$3 = require_error();
	var ProgressCallbackTransform_1$1 = require_ProgressCallbackTransform();
	var debug$1 = (0, debug_1.default)("electron-builder");
	function createHttpError(response, description$1 = null) {
		return new HttpError(response.statusCode || -1, `${response.statusCode} ${response.statusMessage}` + (description$1 == null ? "" : "\n" + JSON.stringify(description$1, null, "  ")) + "\nHeaders: " + safeStringifyJson(response.headers), description$1);
	}
	var HTTP_STATUS_CODES = new Map([
		[429, "Too many requests"],
		[400, "Bad request"],
		[403, "Forbidden"],
		[404, "Not found"],
		[405, "Method not allowed"],
		[406, "Not acceptable"],
		[408, "Request timeout"],
		[413, "Request entity too large"],
		[500, "Internal server error"],
		[502, "Bad gateway"],
		[503, "Service unavailable"],
		[504, "Gateway timeout"],
		[505, "HTTP version not supported"]
	]);
	var HttpError = class extends Error {
		constructor(statusCode, message = `HTTP error: ${HTTP_STATUS_CODES.get(statusCode) || statusCode}`, description$1 = null) {
			super(message);
			this.statusCode = statusCode;
			this.description = description$1;
			this.name = "HttpError";
			this.code = `HTTP_ERROR_${statusCode}`;
		}
		isServerError() {
			return this.statusCode >= 500 && this.statusCode <= 599;
		}
	};
	exports.HttpError = HttpError;
	function parseJson(result) {
		return result.then((it) => it == null || it.length === 0 ? null : JSON.parse(it));
	}
	exports.HttpExecutor = class HttpExecutor {
		constructor() {
			this.maxRedirects = 10;
		}
		request(options$1, cancellationToken = new CancellationToken_1$2.CancellationToken(), data) {
			configureRequestOptions(options$1);
			const json = data == null ? void 0 : JSON.stringify(data);
			const encodedData = json ? Buffer.from(json) : void 0;
			if (encodedData != null) {
				debug$1(json);
				const { headers,...opts } = options$1;
				options$1 = {
					method: "post",
					headers: {
						"Content-Type": "application/json",
						"Content-Length": encodedData.length,
						...headers
					},
					...opts
				};
			}
			return this.doApiRequest(options$1, cancellationToken, (it) => it.end(encodedData));
		}
		doApiRequest(options$1, cancellationToken, requestProcessor, redirectCount = 0) {
			if (debug$1.enabled) debug$1(`Request: ${safeStringifyJson(options$1)}`);
			return cancellationToken.createPromise((resolve, reject, onCancel) => {
				const request = this.createRequest(options$1, (response) => {
					try {
						this.handleResponse(response, options$1, cancellationToken, resolve, reject, redirectCount, requestProcessor);
					} catch (e) {
						reject(e);
					}
				});
				this.addErrorAndTimeoutHandlers(request, reject, options$1.timeout);
				this.addRedirectHandlers(request, options$1, reject, redirectCount, (options$2) => {
					this.doApiRequest(options$2, cancellationToken, requestProcessor, redirectCount).then(resolve).catch(reject);
				});
				requestProcessor(request, reject);
				onCancel(() => request.abort());
			});
		}
		addRedirectHandlers(request, options$1, reject, redirectCount, handler) {}
		addErrorAndTimeoutHandlers(request, reject, timeout = 60 * 1e3) {
			this.addTimeOutHandler(request, reject, timeout);
			request.on("error", reject);
			request.on("aborted", () => {
				reject(/* @__PURE__ */ new Error("Request has been aborted by the server"));
			});
		}
		handleResponse(response, options$1, cancellationToken, resolve, reject, redirectCount, requestProcessor) {
			var _a$1;
			if (debug$1.enabled) debug$1(`Response: ${response.statusCode} ${response.statusMessage}, request options: ${safeStringifyJson(options$1)}`);
			if (response.statusCode === 404) {
				reject(createHttpError(response, `method: ${options$1.method || "GET"} url: ${options$1.protocol || "https:"}//${options$1.hostname}${options$1.port ? `:${options$1.port}` : ""}${options$1.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
				return;
			} else if (response.statusCode === 204) {
				resolve();
				return;
			}
			const code = (_a$1 = response.statusCode) !== null && _a$1 !== void 0 ? _a$1 : 0;
			const shouldRedirect = code >= 300 && code < 400;
			const redirectUrl = safeGetHeader(response, "location");
			if (shouldRedirect && redirectUrl != null) {
				if (redirectCount > this.maxRedirects) {
					reject(this.createMaxRedirectError());
					return;
				}
				this.doApiRequest(HttpExecutor.prepareRedirectUrlOptions(redirectUrl, options$1), cancellationToken, requestProcessor, redirectCount).then(resolve).catch(reject);
				return;
			}
			response.setEncoding("utf8");
			let data = "";
			response.on("error", reject);
			response.on("data", (chunk) => data += chunk);
			response.on("end", () => {
				try {
					if (response.statusCode != null && response.statusCode >= 400) {
						const contentType = safeGetHeader(response, "content-type");
						const isJson = contentType != null && (Array.isArray(contentType) ? contentType.find((it) => it.includes("json")) != null : contentType.includes("json"));
						reject(createHttpError(response, `method: ${options$1.method || "GET"} url: ${options$1.protocol || "https:"}//${options$1.hostname}${options$1.port ? `:${options$1.port}` : ""}${options$1.path}

          Data:
          ${isJson ? JSON.stringify(JSON.parse(data)) : data}
          `));
					} else resolve(data.length === 0 ? null : data);
				} catch (e) {
					reject(e);
				}
			});
		}
		async downloadToBuffer(url$1, options$1) {
			return await options$1.cancellationToken.createPromise((resolve, reject, onCancel) => {
				const responseChunks = [];
				const requestOptions = {
					headers: options$1.headers || void 0,
					redirect: "manual"
				};
				configureRequestUrl(url$1, requestOptions);
				configureRequestOptions(requestOptions);
				this.doDownload(requestOptions, {
					destination: null,
					options: options$1,
					onCancel,
					callback: (error) => {
						if (error == null) resolve(Buffer.concat(responseChunks));
						else reject(error);
					},
					responseHandler: (response, callback) => {
						let receivedLength = 0;
						response.on("data", (chunk) => {
							receivedLength += chunk.length;
							if (receivedLength > 524288e3) {
								callback(/* @__PURE__ */ new Error("Maximum allowed size is 500 MB"));
								return;
							}
							responseChunks.push(chunk);
						});
						response.on("end", () => {
							callback(null);
						});
					}
				}, 0);
			});
		}
		doDownload(requestOptions, options$1, redirectCount) {
			const request = this.createRequest(requestOptions, (response) => {
				if (response.statusCode >= 400) {
					options$1.callback(/* @__PURE__ */ new Error(`Cannot download "${requestOptions.protocol || "https:"}//${requestOptions.hostname}${requestOptions.path}", status ${response.statusCode}: ${response.statusMessage}`));
					return;
				}
				response.on("error", options$1.callback);
				const redirectUrl = safeGetHeader(response, "location");
				if (redirectUrl != null) {
					if (redirectCount < this.maxRedirects) this.doDownload(HttpExecutor.prepareRedirectUrlOptions(redirectUrl, requestOptions), options$1, redirectCount++);
					else options$1.callback(this.createMaxRedirectError());
					return;
				}
				if (options$1.responseHandler == null) configurePipes(options$1, response);
				else options$1.responseHandler(response, options$1.callback);
			});
			this.addErrorAndTimeoutHandlers(request, options$1.callback, requestOptions.timeout);
			this.addRedirectHandlers(request, requestOptions, options$1.callback, redirectCount, (requestOptions$1) => {
				this.doDownload(requestOptions$1, options$1, redirectCount++);
			});
			request.end();
		}
		createMaxRedirectError() {
			return /* @__PURE__ */ new Error(`Too many redirects (> ${this.maxRedirects})`);
		}
		addTimeOutHandler(request, callback, timeout) {
			request.on("socket", (socket) => {
				socket.setTimeout(timeout, () => {
					request.abort();
					callback(/* @__PURE__ */ new Error("Request timed out"));
				});
			});
		}
		static prepareRedirectUrlOptions(redirectUrl, options$1) {
			const newOptions = configureRequestOptionsFromUrl(redirectUrl, { ...options$1 });
			const headers = newOptions.headers;
			if (headers === null || headers === void 0 ? void 0 : headers.authorization) {
				const parsedNewUrl = new url_1$5.URL(redirectUrl);
				if (parsedNewUrl.hostname.endsWith(".amazonaws.com") || parsedNewUrl.searchParams.has("X-Amz-Credential")) delete headers.authorization;
			}
			return newOptions;
		}
		static retryOnServerError(task, maxRetries = 3) {
			for (let attemptNumber = 0;; attemptNumber++) try {
				return task();
			} catch (e) {
				if (attemptNumber < maxRetries && (e instanceof HttpError && e.isServerError() || e.code === "EPIPE")) continue;
				throw e;
			}
		}
	};
	function configureRequestOptionsFromUrl(url$1, options$1) {
		const result = configureRequestOptions(options$1);
		configureRequestUrl(new url_1$5.URL(url$1), result);
		return result;
	}
	function configureRequestUrl(url$1, options$1) {
		options$1.protocol = url$1.protocol;
		options$1.hostname = url$1.hostname;
		if (url$1.port) options$1.port = url$1.port;
		else if (options$1.port) delete options$1.port;
		options$1.path = url$1.pathname + url$1.search;
	}
	var DigestTransform = class extends stream_1$2.Transform {
		get actual() {
			return this._actual;
		}
		constructor(expected, algorithm = "sha512", encoding = "base64") {
			super();
			this.expected = expected;
			this.algorithm = algorithm;
			this.encoding = encoding;
			this._actual = null;
			this.isValidateOnEnd = true;
			this.digester = (0, crypto_1$4.createHash)(algorithm);
		}
		_transform(chunk, encoding, callback) {
			this.digester.update(chunk);
			callback(null, chunk);
		}
		_flush(callback) {
			this._actual = this.digester.digest(this.encoding);
			if (this.isValidateOnEnd) try {
				this.validate();
			} catch (e) {
				callback(e);
				return;
			}
			callback(null);
		}
		validate() {
			if (this._actual == null) throw (0, error_1$3.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
			if (this._actual !== this.expected) throw (0, error_1$3.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
			return null;
		}
	};
	exports.DigestTransform = DigestTransform;
	function checkSha2(sha2Header, sha2, callback) {
		if (sha2Header != null && sha2 != null && sha2Header !== sha2) {
			callback(/* @__PURE__ */ new Error(`checksum mismatch: expected ${sha2} but got ${sha2Header} (X-Checksum-Sha2 header)`));
			return false;
		}
		return true;
	}
	function safeGetHeader(response, headerKey) {
		const value = response.headers[headerKey];
		if (value == null) return null;
		else if (Array.isArray(value)) return value.length === 0 ? null : value[value.length - 1];
		else return value;
	}
	function configurePipes(options$1, response) {
		if (!checkSha2(safeGetHeader(response, "X-Checksum-Sha2"), options$1.options.sha2, options$1.callback)) return;
		const streams = [];
		if (options$1.options.onProgress != null) {
			const contentLength = safeGetHeader(response, "content-length");
			if (contentLength != null) streams.push(new ProgressCallbackTransform_1$1.ProgressCallbackTransform(parseInt(contentLength, 10), options$1.options.cancellationToken, options$1.options.onProgress));
		}
		const sha512 = options$1.options.sha512;
		if (sha512 != null) streams.push(new DigestTransform(sha512, "sha512", sha512.length === 128 && !sha512.includes("+") && !sha512.includes("Z") && !sha512.includes("=") ? "hex" : "base64"));
		else if (options$1.options.sha2 != null) streams.push(new DigestTransform(options$1.options.sha2, "sha256", "hex"));
		const fileOut = (0, fs_1$5.createWriteStream)(options$1.destination);
		streams.push(fileOut);
		let lastStream = response;
		for (const stream of streams) {
			stream.on("error", (error) => {
				fileOut.close();
				if (!options$1.options.cancellationToken.cancelled) options$1.callback(error);
			});
			lastStream = lastStream.pipe(stream);
		}
		fileOut.on("finish", () => {
			fileOut.close(options$1.callback);
		});
	}
	function configureRequestOptions(options$1, token, method) {
		if (method != null) options$1.method = method;
		options$1.headers = { ...options$1.headers };
		const headers = options$1.headers;
		if (token != null) headers.authorization = token.startsWith("Basic") || token.startsWith("Bearer") ? token : `token ${token}`;
		if (headers["User-Agent"] == null) headers["User-Agent"] = "electron-builder";
		if (method == null || method === "GET" || headers["Cache-Control"] == null) headers["Cache-Control"] = "no-cache";
		if (options$1.protocol == null && process.versions.electron != null) options$1.protocol = "https:";
		return options$1;
	}
	function safeStringifyJson(data, skippedNames) {
		return JSON.stringify(data, (name$1, value) => {
			if (name$1.endsWith("Authorization") || name$1.endsWith("authorization") || name$1.endsWith("Password") || name$1.endsWith("PASSWORD") || name$1.endsWith("Token") || name$1.includes("password") || name$1.includes("token") || skippedNames != null && skippedNames.has(name$1)) return "<stripped sensitive data>";
			return value;
		}, 2);
	}
}));
var require_MemoLazy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var MemoLazy = class {
		constructor(selector, creator) {
			this.selector = selector;
			this.creator = creator;
			this.selected = void 0;
			this._value = void 0;
		}
		get hasValue() {
			return this._value !== void 0;
		}
		get value() {
			const selected = this.selector();
			if (this._value !== void 0 && equals(this.selected, selected)) return this._value;
			this.selected = selected;
			const result = this.creator(selected);
			this.value = result;
			return result;
		}
		set value(value) {
			this._value = value;
		}
	};
	exports.MemoLazy = MemoLazy;
	function equals(firstValue, secondValue) {
		if (typeof firstValue === "object" && firstValue !== null && typeof secondValue === "object" && secondValue !== null) {
			const keys1 = Object.keys(firstValue);
			const keys2 = Object.keys(secondValue);
			return keys1.length === keys2.length && keys1.every((key) => equals(firstValue[key], secondValue[key]));
		}
		return firstValue === secondValue;
	}
}));
var require_publishOptions = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.githubUrl = githubUrl;
	exports.getS3LikeProviderBaseUrl = getS3LikeProviderBaseUrl;
	function githubUrl(options$1, defaultHost = "github.com") {
		return `${options$1.protocol || "https"}://${options$1.host || defaultHost}`;
	}
	function getS3LikeProviderBaseUrl(configuration) {
		const provider = configuration.provider;
		if (provider === "s3") return s3Url(configuration);
		if (provider === "spaces") return spacesUrl(configuration);
		throw new Error(`Not supported provider: ${provider}`);
	}
	function s3Url(options$1) {
		let url$1;
		if (options$1.accelerate == true) url$1 = `https://${options$1.bucket}.s3-accelerate.amazonaws.com`;
		else if (options$1.endpoint != null) url$1 = `${options$1.endpoint}/${options$1.bucket}`;
		else if (options$1.bucket.includes(".")) {
			if (options$1.region == null) throw new Error(`Bucket name "${options$1.bucket}" includes a dot, but S3 region is missing`);
			if (options$1.region === "us-east-1") url$1 = `https://s3.amazonaws.com/${options$1.bucket}`;
			else url$1 = `https://s3-${options$1.region}.amazonaws.com/${options$1.bucket}`;
		} else if (options$1.region === "cn-north-1") url$1 = `https://${options$1.bucket}.s3.${options$1.region}.amazonaws.com.cn`;
		else url$1 = `https://${options$1.bucket}.s3.amazonaws.com`;
		return appendPath(url$1, options$1.path);
	}
	function appendPath(url$1, p) {
		if (p != null && p.length > 0) {
			if (!p.startsWith("/")) url$1 += "/";
			url$1 += p;
		}
		return url$1;
	}
	function spacesUrl(options$1) {
		if (options$1.name == null) throw new Error(`name is missing`);
		if (options$1.region == null) throw new Error(`region is missing`);
		return appendPath(`https://${options$1.name}.${options$1.region}.digitaloceanspaces.com`, options$1.path);
	}
}));
var require_retry = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.retry = retry;
	var CancellationToken_1$1 = require_CancellationToken();
	async function retry(task, retryCount, interval, backoff = 0, attempt = 0, shouldRetry) {
		var _a$1;
		const cancellationToken = new CancellationToken_1$1.CancellationToken();
		try {
			return await task();
		} catch (error) {
			if (((_a$1 = shouldRetry === null || shouldRetry === void 0 ? void 0 : shouldRetry(error)) !== null && _a$1 !== void 0 ? _a$1 : true) && retryCount > 0 && !cancellationToken.cancelled) {
				await new Promise((resolve) => setTimeout(resolve, interval + backoff * attempt));
				return await retry(task, retryCount - 1, interval, backoff, attempt + 1, shouldRetry);
			} else throw error;
		}
	}
}));
var require_rfc2253Parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseDn = parseDn;
	function parseDn(seq) {
		let quoted = false;
		let key = null;
		let token = "";
		let nextNonSpace = 0;
		seq = seq.trim();
		const result = /* @__PURE__ */ new Map();
		for (let i$1 = 0; i$1 <= seq.length; i$1++) {
			if (i$1 === seq.length) {
				if (key !== null) result.set(key, token);
				break;
			}
			const ch = seq[i$1];
			if (quoted) {
				if (ch === "\"") {
					quoted = false;
					continue;
				}
			} else {
				if (ch === "\"") {
					quoted = true;
					continue;
				}
				if (ch === "\\") {
					i$1++;
					const ord = parseInt(seq.slice(i$1, i$1 + 2), 16);
					if (Number.isNaN(ord)) token += seq[i$1];
					else {
						i$1++;
						token += String.fromCharCode(ord);
					}
					continue;
				}
				if (key === null && ch === "=") {
					key = token;
					token = "";
					continue;
				}
				if (ch === "," || ch === ";" || ch === "+") {
					if (key !== null) result.set(key, token);
					key = null;
					token = "";
					continue;
				}
			}
			if (ch === " " && !quoted) {
				if (token.length === 0) continue;
				if (i$1 > nextNonSpace) {
					let j = i$1;
					while (seq[j] === " ") j++;
					nextNonSpace = j;
				}
				if (nextNonSpace >= seq.length || seq[nextNonSpace] === "," || seq[nextNonSpace] === ";" || key === null && seq[nextNonSpace] === "=" || key !== null && seq[nextNonSpace] === "+") {
					i$1 = nextNonSpace - 1;
					continue;
				}
			}
			token += ch;
		}
		return result;
	}
}));
var require_uuid = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var crypto_1$3 = __require("crypto");
	var error_1$2 = require_error();
	var invalidName = "options.name must be either a string or a Buffer";
	var randomHost = (0, crypto_1$3.randomBytes)(16);
	randomHost[0] = randomHost[0] | 1;
	var hex2byte = {};
	var byte2hex = [];
	for (let i$1 = 0; i$1 < 256; i$1++) {
		const hex = (i$1 + 256).toString(16).substr(1);
		hex2byte[hex] = i$1;
		byte2hex[i$1] = hex;
	}
	var UUID = class UUID {
		constructor(uuid) {
			this.ascii = null;
			this.binary = null;
			const check = UUID.check(uuid);
			if (!check) throw new Error("not a UUID");
			this.version = check.version;
			if (check.format === "ascii") this.ascii = uuid;
			else this.binary = uuid;
		}
		static v5(name$1, namespace) {
			return uuidNamed(name$1, "sha1", 80, namespace);
		}
		toString() {
			if (this.ascii == null) this.ascii = stringify$1(this.binary);
			return this.ascii;
		}
		inspect() {
			return `UUID v${this.version} ${this.toString()}`;
		}
		static check(uuid, offset = 0) {
			if (typeof uuid === "string") {
				uuid = uuid.toLowerCase();
				if (!/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(uuid)) return false;
				if (uuid === "00000000-0000-0000-0000-000000000000") return {
					version: void 0,
					variant: "nil",
					format: "ascii"
				};
				return {
					version: (hex2byte[uuid[14] + uuid[15]] & 240) >> 4,
					variant: getVariant((hex2byte[uuid[19] + uuid[20]] & 224) >> 5),
					format: "ascii"
				};
			}
			if (Buffer.isBuffer(uuid)) {
				if (uuid.length < offset + 16) return false;
				let i$1 = 0;
				for (; i$1 < 16; i$1++) if (uuid[offset + i$1] !== 0) break;
				if (i$1 === 16) return {
					version: void 0,
					variant: "nil",
					format: "binary"
				};
				return {
					version: (uuid[offset + 6] & 240) >> 4,
					variant: getVariant((uuid[offset + 8] & 224) >> 5),
					format: "binary"
				};
			}
			throw (0, error_1$2.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
		}
		static parse(input) {
			const buffer = Buffer.allocUnsafe(16);
			let j = 0;
			for (let i$1 = 0; i$1 < 16; i$1++) {
				buffer[i$1] = hex2byte[input[j++] + input[j++]];
				if (i$1 === 3 || i$1 === 5 || i$1 === 7 || i$1 === 9) j += 1;
			}
			return buffer;
		}
	};
	exports.UUID = UUID;
	UUID.OID = UUID.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
	function getVariant(bits) {
		switch (bits) {
			case 0:
			case 1:
			case 3: return "ncs";
			case 4:
			case 5: return "rfc4122";
			case 6: return "microsoft";
			default: return "future";
		}
	}
	var UuidEncoding;
	(function(UuidEncoding$1) {
		UuidEncoding$1[UuidEncoding$1["ASCII"] = 0] = "ASCII";
		UuidEncoding$1[UuidEncoding$1["BINARY"] = 1] = "BINARY";
		UuidEncoding$1[UuidEncoding$1["OBJECT"] = 2] = "OBJECT";
	})(UuidEncoding || (UuidEncoding = {}));
	function uuidNamed(name$1, hashMethod, version$2, namespace, encoding = UuidEncoding.ASCII) {
		const hash = (0, crypto_1$3.createHash)(hashMethod);
		if (typeof name$1 !== "string" && !Buffer.isBuffer(name$1)) throw (0, error_1$2.newError)(invalidName, "ERR_INVALID_UUID_NAME");
		hash.update(namespace);
		hash.update(name$1);
		const buffer = hash.digest();
		let result;
		switch (encoding) {
			case UuidEncoding.BINARY:
				buffer[6] = buffer[6] & 15 | version$2;
				buffer[8] = buffer[8] & 63 | 128;
				result = buffer;
				break;
			case UuidEncoding.OBJECT:
				buffer[6] = buffer[6] & 15 | version$2;
				buffer[8] = buffer[8] & 63 | 128;
				result = new UUID(buffer);
				break;
			default:
				result = byte2hex[buffer[0]] + byte2hex[buffer[1]] + byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" + byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" + byte2hex[buffer[6] & 15 | version$2] + byte2hex[buffer[7]] + "-" + byte2hex[buffer[8] & 63 | 128] + byte2hex[buffer[9]] + "-" + byte2hex[buffer[10]] + byte2hex[buffer[11]] + byte2hex[buffer[12]] + byte2hex[buffer[13]] + byte2hex[buffer[14]] + byte2hex[buffer[15]];
				break;
		}
		return result;
	}
	function stringify$1(buffer) {
		return byte2hex[buffer[0]] + byte2hex[buffer[1]] + byte2hex[buffer[2]] + byte2hex[buffer[3]] + "-" + byte2hex[buffer[4]] + byte2hex[buffer[5]] + "-" + byte2hex[buffer[6]] + byte2hex[buffer[7]] + "-" + byte2hex[buffer[8]] + byte2hex[buffer[9]] + "-" + byte2hex[buffer[10]] + byte2hex[buffer[11]] + byte2hex[buffer[12]] + byte2hex[buffer[13]] + byte2hex[buffer[14]] + byte2hex[buffer[15]];
	}
	exports.nil = new UUID("00000000-0000-0000-0000-000000000000");
}));
var require_xml = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parseXml = parseXml;
	var sax = require_sax();
	var error_1$1 = require_error();
	var XElement = class {
		constructor(name$1) {
			this.name = name$1;
			this.value = "";
			this.attributes = null;
			this.isCData = false;
			this.elements = null;
			if (!name$1) throw (0, error_1$1.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
			if (!isValidName(name$1)) throw (0, error_1$1.newError)(`Invalid element name: ${name$1}`, "ERR_XML_ELEMENT_INVALID_NAME");
		}
		attribute(name$1) {
			const result = this.attributes === null ? null : this.attributes[name$1];
			if (result == null) throw (0, error_1$1.newError)(`No attribute "${name$1}"`, "ERR_XML_MISSED_ATTRIBUTE");
			return result;
		}
		removeAttribute(name$1) {
			if (this.attributes !== null) delete this.attributes[name$1];
		}
		element(name$1, ignoreCase = false, errorIfMissed = null) {
			const result = this.elementOrNull(name$1, ignoreCase);
			if (result === null) throw (0, error_1$1.newError)(errorIfMissed || `No element "${name$1}"`, "ERR_XML_MISSED_ELEMENT");
			return result;
		}
		elementOrNull(name$1, ignoreCase = false) {
			if (this.elements === null) return null;
			for (const element of this.elements) if (isNameEquals(element, name$1, ignoreCase)) return element;
			return null;
		}
		getElements(name$1, ignoreCase = false) {
			if (this.elements === null) return [];
			return this.elements.filter((it) => isNameEquals(it, name$1, ignoreCase));
		}
		elementValueOrEmpty(name$1, ignoreCase = false) {
			const element = this.elementOrNull(name$1, ignoreCase);
			return element === null ? "" : element.value;
		}
	};
	exports.XElement = XElement;
	var NAME_REG_EXP = /* @__PURE__ */ new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
	function isValidName(name$1) {
		return NAME_REG_EXP.test(name$1);
	}
	function isNameEquals(element, name$1, ignoreCase) {
		const elementName = element.name;
		return elementName === name$1 || ignoreCase === true && elementName.length === name$1.length && elementName.toLowerCase() === name$1.toLowerCase();
	}
	function parseXml(data) {
		let rootElement = null;
		const parser = sax.parser(true, {});
		const elements = [];
		parser.onopentag = (saxElement) => {
			const element = new XElement(saxElement.name);
			element.attributes = saxElement.attributes;
			if (rootElement === null) rootElement = element;
			else {
				const parent = elements[elements.length - 1];
				if (parent.elements == null) parent.elements = [];
				parent.elements.push(element);
			}
			elements.push(element);
		};
		parser.onclosetag = () => {
			elements.pop();
		};
		parser.ontext = (text) => {
			if (elements.length > 0) elements[elements.length - 1].value = text;
		};
		parser.oncdata = (cdata) => {
			const element = elements[elements.length - 1];
			element.value = cdata;
			element.isCData = true;
		};
		parser.onerror = (err) => {
			throw err;
		};
		parser.write(data);
		return rootElement;
	}
}));
var require_out = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CURRENT_APP_PACKAGE_FILE_NAME = exports.CURRENT_APP_INSTALLER_FILE_NAME = exports.XElement = exports.parseXml = exports.UUID = exports.parseDn = exports.retry = exports.githubUrl = exports.getS3LikeProviderBaseUrl = exports.ProgressCallbackTransform = exports.MemoLazy = exports.safeStringifyJson = exports.safeGetHeader = exports.parseJson = exports.HttpExecutor = exports.HttpError = exports.DigestTransform = exports.createHttpError = exports.configureRequestUrl = exports.configureRequestOptionsFromUrl = exports.configureRequestOptions = exports.newError = exports.CancellationToken = exports.CancellationError = void 0;
	exports.asArray = asArray;
	var CancellationToken_1 = require_CancellationToken();
	Object.defineProperty(exports, "CancellationError", {
		enumerable: true,
		get: function() {
			return CancellationToken_1.CancellationError;
		}
	});
	Object.defineProperty(exports, "CancellationToken", {
		enumerable: true,
		get: function() {
			return CancellationToken_1.CancellationToken;
		}
	});
	var error_1 = require_error();
	Object.defineProperty(exports, "newError", {
		enumerable: true,
		get: function() {
			return error_1.newError;
		}
	});
	var httpExecutor_1 = require_httpExecutor();
	Object.defineProperty(exports, "configureRequestOptions", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.configureRequestOptions;
		}
	});
	Object.defineProperty(exports, "configureRequestOptionsFromUrl", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.configureRequestOptionsFromUrl;
		}
	});
	Object.defineProperty(exports, "configureRequestUrl", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.configureRequestUrl;
		}
	});
	Object.defineProperty(exports, "createHttpError", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.createHttpError;
		}
	});
	Object.defineProperty(exports, "DigestTransform", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.DigestTransform;
		}
	});
	Object.defineProperty(exports, "HttpError", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.HttpError;
		}
	});
	Object.defineProperty(exports, "HttpExecutor", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.HttpExecutor;
		}
	});
	Object.defineProperty(exports, "parseJson", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.parseJson;
		}
	});
	Object.defineProperty(exports, "safeGetHeader", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.safeGetHeader;
		}
	});
	Object.defineProperty(exports, "safeStringifyJson", {
		enumerable: true,
		get: function() {
			return httpExecutor_1.safeStringifyJson;
		}
	});
	var MemoLazy_1 = require_MemoLazy();
	Object.defineProperty(exports, "MemoLazy", {
		enumerable: true,
		get: function() {
			return MemoLazy_1.MemoLazy;
		}
	});
	var ProgressCallbackTransform_1 = require_ProgressCallbackTransform();
	Object.defineProperty(exports, "ProgressCallbackTransform", {
		enumerable: true,
		get: function() {
			return ProgressCallbackTransform_1.ProgressCallbackTransform;
		}
	});
	var publishOptions_1 = require_publishOptions();
	Object.defineProperty(exports, "getS3LikeProviderBaseUrl", {
		enumerable: true,
		get: function() {
			return publishOptions_1.getS3LikeProviderBaseUrl;
		}
	});
	Object.defineProperty(exports, "githubUrl", {
		enumerable: true,
		get: function() {
			return publishOptions_1.githubUrl;
		}
	});
	var retry_1 = require_retry();
	Object.defineProperty(exports, "retry", {
		enumerable: true,
		get: function() {
			return retry_1.retry;
		}
	});
	var rfc2253Parser_1 = require_rfc2253Parser();
	Object.defineProperty(exports, "parseDn", {
		enumerable: true,
		get: function() {
			return rfc2253Parser_1.parseDn;
		}
	});
	var uuid_1 = require_uuid();
	Object.defineProperty(exports, "UUID", {
		enumerable: true,
		get: function() {
			return uuid_1.UUID;
		}
	});
	var xml_1 = require_xml();
	Object.defineProperty(exports, "parseXml", {
		enumerable: true,
		get: function() {
			return xml_1.parseXml;
		}
	});
	Object.defineProperty(exports, "XElement", {
		enumerable: true,
		get: function() {
			return xml_1.XElement;
		}
	});
	exports.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe";
	exports.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
	function asArray(v) {
		if (v == null) return [];
		else if (Array.isArray(v)) return v;
		else return [v];
	}
}));
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function isNothing(subject) {
		return typeof subject === "undefined" || subject === null;
	}
	function isObject$1(subject) {
		return typeof subject === "object" && subject !== null;
	}
	function toArray(sequence$1) {
		if (Array.isArray(sequence$1)) return sequence$1;
		else if (isNothing(sequence$1)) return [];
		return [sequence$1];
	}
	function extend(target, source) {
		var index, length, key, sourceKeys;
		if (source) {
			sourceKeys = Object.keys(source);
			for (index = 0, length = sourceKeys.length; index < length; index += 1) {
				key = sourceKeys[index];
				target[key] = source[key];
			}
		}
		return target;
	}
	function repeat(string, count) {
		var result = "", cycle;
		for (cycle = 0; cycle < count; cycle += 1) result += string;
		return result;
	}
	function isNegativeZero(number) {
		return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
	}
	module.exports.isNothing = isNothing;
	module.exports.isObject = isObject$1;
	module.exports.toArray = toArray;
	module.exports.repeat = repeat;
	module.exports.isNegativeZero = isNegativeZero;
	module.exports.extend = extend;
}));
var require_exception = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function formatError(exception, compact) {
		var where = "", message = exception.reason || "(unknown reason)";
		if (!exception.mark) return message;
		if (exception.mark.name) where += "in \"" + exception.mark.name + "\" ";
		where += "(" + (exception.mark.line + 1) + ":" + (exception.mark.column + 1) + ")";
		if (!compact && exception.mark.snippet) where += "\n\n" + exception.mark.snippet;
		return message + " " + where;
	}
	function YAMLException$4(reason, mark) {
		Error.call(this);
		this.name = "YAMLException";
		this.reason = reason;
		this.mark = mark;
		this.message = formatError(this, false);
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
		else this.stack = (/* @__PURE__ */ new Error()).stack || "";
	}
	YAMLException$4.prototype = Object.create(Error.prototype);
	YAMLException$4.prototype.constructor = YAMLException$4;
	YAMLException$4.prototype.toString = function toString$1(compact) {
		return this.name + ": " + formatError(this, compact);
	};
	module.exports = YAMLException$4;
}));
var require_snippet = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common$4 = require_common();
	function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
		var head = "";
		var tail = "";
		var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
		if (position - lineStart > maxHalfLength) {
			head = " ... ";
			lineStart = position - maxHalfLength + head.length;
		}
		if (lineEnd - position > maxHalfLength) {
			tail = " ...";
			lineEnd = position + maxHalfLength - tail.length;
		}
		return {
			str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
			pos: position - lineStart + head.length
		};
	}
	function padStart(string, max) {
		return common$4.repeat(" ", max - string.length) + string;
	}
	function makeSnippet$1(mark, options$1) {
		options$1 = Object.create(options$1 || null);
		if (!mark.buffer) return null;
		if (!options$1.maxLength) options$1.maxLength = 79;
		if (typeof options$1.indent !== "number") options$1.indent = 1;
		if (typeof options$1.linesBefore !== "number") options$1.linesBefore = 3;
		if (typeof options$1.linesAfter !== "number") options$1.linesAfter = 2;
		var re = /\r?\n|\r|\0/g;
		var lineStarts = [0];
		var lineEnds = [];
		var match;
		var foundLineNo = -1;
		while (match = re.exec(mark.buffer)) {
			lineEnds.push(match.index);
			lineStarts.push(match.index + match[0].length);
			if (mark.position <= match.index && foundLineNo < 0) foundLineNo = lineStarts.length - 2;
		}
		if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
		var result = "", i$1, line;
		var lineNoLength = Math.min(mark.line + options$1.linesAfter, lineEnds.length).toString().length;
		var maxLineLength = options$1.maxLength - (options$1.indent + lineNoLength + 3);
		for (i$1 = 1; i$1 <= options$1.linesBefore; i$1++) {
			if (foundLineNo - i$1 < 0) break;
			line = getLine(mark.buffer, lineStarts[foundLineNo - i$1], lineEnds[foundLineNo - i$1], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i$1]), maxLineLength);
			result = common$4.repeat(" ", options$1.indent) + padStart((mark.line - i$1 + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
		}
		line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
		result += common$4.repeat(" ", options$1.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
		result += common$4.repeat("-", options$1.indent + lineNoLength + 3 + line.pos) + "^\n";
		for (i$1 = 1; i$1 <= options$1.linesAfter; i$1++) {
			if (foundLineNo + i$1 >= lineEnds.length) break;
			line = getLine(mark.buffer, lineStarts[foundLineNo + i$1], lineEnds[foundLineNo + i$1], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i$1]), maxLineLength);
			result += common$4.repeat(" ", options$1.indent) + padStart((mark.line + i$1 + 1).toString(), lineNoLength) + " | " + line.str + "\n";
		}
		return result.replace(/\n$/, "");
	}
	module.exports = makeSnippet$1;
}));
var require_type$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var YAMLException$3 = require_exception();
	var TYPE_CONSTRUCTOR_OPTIONS = [
		"kind",
		"multi",
		"resolve",
		"construct",
		"instanceOf",
		"predicate",
		"represent",
		"representName",
		"defaultStyle",
		"styleAliases"
	];
	var YAML_NODE_KINDS = [
		"scalar",
		"sequence",
		"mapping"
	];
	function compileStyleAliases(map) {
		var result = {};
		if (map !== null) Object.keys(map).forEach(function(style) {
			map[style].forEach(function(alias) {
				result[String(alias)] = style;
			});
		});
		return result;
	}
	function Type$14(tag, options$1) {
		options$1 = options$1 || {};
		Object.keys(options$1).forEach(function(name$1) {
			if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name$1) === -1) throw new YAMLException$3("Unknown option \"" + name$1 + "\" is met in definition of \"" + tag + "\" YAML type.");
		});
		this.options = options$1;
		this.tag = tag;
		this.kind = options$1["kind"] || null;
		this.resolve = options$1["resolve"] || function() {
			return true;
		};
		this.construct = options$1["construct"] || function(data) {
			return data;
		};
		this.instanceOf = options$1["instanceOf"] || null;
		this.predicate = options$1["predicate"] || null;
		this.represent = options$1["represent"] || null;
		this.representName = options$1["representName"] || null;
		this.defaultStyle = options$1["defaultStyle"] || null;
		this.multi = options$1["multi"] || false;
		this.styleAliases = compileStyleAliases(options$1["styleAliases"] || null);
		if (YAML_NODE_KINDS.indexOf(this.kind) === -1) throw new YAMLException$3("Unknown kind \"" + this.kind + "\" is specified for \"" + tag + "\" YAML type.");
	}
	module.exports = Type$14;
}));
var require_schema = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var YAMLException$2 = require_exception();
	var Type$13 = require_type$1();
	function compileList(schema, name$1) {
		var result = [];
		schema[name$1].forEach(function(currentType) {
			var newIndex = result.length;
			result.forEach(function(previousType, previousIndex) {
				if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) newIndex = previousIndex;
			});
			result[newIndex] = currentType;
		});
		return result;
	}
	function compileMap() {
		var result = {
			scalar: {},
			sequence: {},
			mapping: {},
			fallback: {},
			multi: {
				scalar: [],
				sequence: [],
				mapping: [],
				fallback: []
			}
		}, index, length;
		function collectType(type$1) {
			if (type$1.multi) {
				result.multi[type$1.kind].push(type$1);
				result.multi["fallback"].push(type$1);
			} else result[type$1.kind][type$1.tag] = result["fallback"][type$1.tag] = type$1;
		}
		for (index = 0, length = arguments.length; index < length; index += 1) arguments[index].forEach(collectType);
		return result;
	}
	function Schema$1(definition) {
		return this.extend(definition);
	}
	Schema$1.prototype.extend = function extend$1(definition) {
		var implicit = [];
		var explicit = [];
		if (definition instanceof Type$13) explicit.push(definition);
		else if (Array.isArray(definition)) explicit = explicit.concat(definition);
		else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
			if (definition.implicit) implicit = implicit.concat(definition.implicit);
			if (definition.explicit) explicit = explicit.concat(definition.explicit);
		} else throw new YAMLException$2("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
		implicit.forEach(function(type$1) {
			if (!(type$1 instanceof Type$13)) throw new YAMLException$2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
			if (type$1.loadKind && type$1.loadKind !== "scalar") throw new YAMLException$2("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
			if (type$1.multi) throw new YAMLException$2("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
		});
		explicit.forEach(function(type$1) {
			if (!(type$1 instanceof Type$13)) throw new YAMLException$2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
		});
		var result = Object.create(Schema$1.prototype);
		result.implicit = (this.implicit || []).concat(implicit);
		result.explicit = (this.explicit || []).concat(explicit);
		result.compiledImplicit = compileList(result, "implicit");
		result.compiledExplicit = compileList(result, "explicit");
		result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
		return result;
	};
	module.exports = Schema$1;
}));
var require_str = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_type$1())("tag:yaml.org,2002:str", {
		kind: "scalar",
		construct: function(data) {
			return data !== null ? data : "";
		}
	});
}));
var require_seq = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_type$1())("tag:yaml.org,2002:seq", {
		kind: "sequence",
		construct: function(data) {
			return data !== null ? data : [];
		}
	});
}));
var require_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_type$1())("tag:yaml.org,2002:map", {
		kind: "mapping",
		construct: function(data) {
			return data !== null ? data : {};
		}
	});
}));
var require_failsafe = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = new (require_schema())({ explicit: [
		require_str(),
		require_seq(),
		require_map()
	] });
}));
var require_null = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type$9 = require_type$1();
	function resolveYamlNull(data) {
		if (data === null) return true;
		var max = data.length;
		return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
	}
	function constructYamlNull() {
		return null;
	}
	function isNull(object) {
		return object === null;
	}
	module.exports = new Type$9("tag:yaml.org,2002:null", {
		kind: "scalar",
		resolve: resolveYamlNull,
		construct: constructYamlNull,
		predicate: isNull,
		represent: {
			canonical: function() {
				return "~";
			},
			lowercase: function() {
				return "null";
			},
			uppercase: function() {
				return "NULL";
			},
			camelcase: function() {
				return "Null";
			},
			empty: function() {
				return "";
			}
		},
		defaultStyle: "lowercase"
	});
}));
var require_bool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type$8 = require_type$1();
	function resolveYamlBoolean(data) {
		if (data === null) return false;
		var max = data.length;
		return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
	}
	function constructYamlBoolean(data) {
		return data === "true" || data === "True" || data === "TRUE";
	}
	function isBoolean(object) {
		return Object.prototype.toString.call(object) === "[object Boolean]";
	}
	module.exports = new Type$8("tag:yaml.org,2002:bool", {
		kind: "scalar",
		resolve: resolveYamlBoolean,
		construct: constructYamlBoolean,
		predicate: isBoolean,
		represent: {
			lowercase: function(object) {
				return object ? "true" : "false";
			},
			uppercase: function(object) {
				return object ? "TRUE" : "FALSE";
			},
			camelcase: function(object) {
				return object ? "True" : "False";
			}
		},
		defaultStyle: "lowercase"
	});
}));
var require_int = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common$3 = require_common();
	var Type$7 = require_type$1();
	function isHexCode(c) {
		return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
	}
	function isOctCode(c) {
		return 48 <= c && c <= 55;
	}
	function isDecCode(c) {
		return 48 <= c && c <= 57;
	}
	function resolveYamlInteger(data) {
		if (data === null) return false;
		var max = data.length, index = 0, hasDigits = false, ch;
		if (!max) return false;
		ch = data[index];
		if (ch === "-" || ch === "+") ch = data[++index];
		if (ch === "0") {
			if (index + 1 === max) return true;
			ch = data[++index];
			if (ch === "b") {
				index++;
				for (; index < max; index++) {
					ch = data[index];
					if (ch === "_") continue;
					if (ch !== "0" && ch !== "1") return false;
					hasDigits = true;
				}
				return hasDigits && ch !== "_";
			}
			if (ch === "x") {
				index++;
				for (; index < max; index++) {
					ch = data[index];
					if (ch === "_") continue;
					if (!isHexCode(data.charCodeAt(index))) return false;
					hasDigits = true;
				}
				return hasDigits && ch !== "_";
			}
			if (ch === "o") {
				index++;
				for (; index < max; index++) {
					ch = data[index];
					if (ch === "_") continue;
					if (!isOctCode(data.charCodeAt(index))) return false;
					hasDigits = true;
				}
				return hasDigits && ch !== "_";
			}
		}
		if (ch === "_") return false;
		for (; index < max; index++) {
			ch = data[index];
			if (ch === "_") continue;
			if (!isDecCode(data.charCodeAt(index))) return false;
			hasDigits = true;
		}
		if (!hasDigits || ch === "_") return false;
		return true;
	}
	function constructYamlInteger(data) {
		var value = data, sign = 1, ch;
		if (value.indexOf("_") !== -1) value = value.replace(/_/g, "");
		ch = value[0];
		if (ch === "-" || ch === "+") {
			if (ch === "-") sign = -1;
			value = value.slice(1);
			ch = value[0];
		}
		if (value === "0") return 0;
		if (ch === "0") {
			if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
			if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
			if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
		}
		return sign * parseInt(value, 10);
	}
	function isInteger(object) {
		return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !common$3.isNegativeZero(object);
	}
	module.exports = new Type$7("tag:yaml.org,2002:int", {
		kind: "scalar",
		resolve: resolveYamlInteger,
		construct: constructYamlInteger,
		predicate: isInteger,
		represent: {
			binary: function(obj) {
				return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
			},
			octal: function(obj) {
				return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
			},
			decimal: function(obj) {
				return obj.toString(10);
			},
			hexadecimal: function(obj) {
				return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
			}
		},
		defaultStyle: "decimal",
		styleAliases: {
			binary: [2, "bin"],
			octal: [8, "oct"],
			decimal: [10, "dec"],
			hexadecimal: [16, "hex"]
		}
	});
}));
var require_float = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common$2 = require_common();
	var Type$6 = require_type$1();
	var YAML_FLOAT_PATTERN = /* @__PURE__ */ new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
	function resolveYamlFloat(data) {
		if (data === null) return false;
		if (!YAML_FLOAT_PATTERN.test(data) || data[data.length - 1] === "_") return false;
		return true;
	}
	function constructYamlFloat(data) {
		var value = data.replace(/_/g, "").toLowerCase(), sign = value[0] === "-" ? -1 : 1;
		if ("+-".indexOf(value[0]) >= 0) value = value.slice(1);
		if (value === ".inf") return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
		else if (value === ".nan") return NaN;
		return sign * parseFloat(value, 10);
	}
	var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
	function representYamlFloat(object, style) {
		var res;
		if (isNaN(object)) switch (style) {
			case "lowercase": return ".nan";
			case "uppercase": return ".NAN";
			case "camelcase": return ".NaN";
		}
		else if (Number.POSITIVE_INFINITY === object) switch (style) {
			case "lowercase": return ".inf";
			case "uppercase": return ".INF";
			case "camelcase": return ".Inf";
		}
		else if (Number.NEGATIVE_INFINITY === object) switch (style) {
			case "lowercase": return "-.inf";
			case "uppercase": return "-.INF";
			case "camelcase": return "-.Inf";
		}
		else if (common$2.isNegativeZero(object)) return "-0.0";
		res = object.toString(10);
		return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
	}
	function isFloat(object) {
		return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common$2.isNegativeZero(object));
	}
	module.exports = new Type$6("tag:yaml.org,2002:float", {
		kind: "scalar",
		resolve: resolveYamlFloat,
		construct: constructYamlFloat,
		predicate: isFloat,
		represent: representYamlFloat,
		defaultStyle: "lowercase"
	});
}));
var require_json = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_failsafe().extend({ implicit: [
		require_null(),
		require_bool(),
		require_int(),
		require_float()
	] });
}));
var require_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_json();
}));
var require_timestamp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type$5 = require_type$1();
	var YAML_DATE_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
	var YAML_TIMESTAMP_REGEXP = /* @__PURE__ */ new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
	function resolveYamlTimestamp(data) {
		if (data === null) return false;
		if (YAML_DATE_REGEXP.exec(data) !== null) return true;
		if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
		return false;
	}
	function constructYamlTimestamp(data) {
		var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
		match = YAML_DATE_REGEXP.exec(data);
		if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
		if (match === null) throw new Error("Date resolve error");
		year = +match[1];
		month = +match[2] - 1;
		day = +match[3];
		if (!match[4]) return new Date(Date.UTC(year, month, day));
		hour = +match[4];
		minute = +match[5];
		second = +match[6];
		if (match[7]) {
			fraction = match[7].slice(0, 3);
			while (fraction.length < 3) fraction += "0";
			fraction = +fraction;
		}
		if (match[9]) {
			tz_hour = +match[10];
			tz_minute = +(match[11] || 0);
			delta = (tz_hour * 60 + tz_minute) * 6e4;
			if (match[9] === "-") delta = -delta;
		}
		date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
		if (delta) date.setTime(date.getTime() - delta);
		return date;
	}
	function representYamlTimestamp(object) {
		return object.toISOString();
	}
	module.exports = new Type$5("tag:yaml.org,2002:timestamp", {
		kind: "scalar",
		resolve: resolveYamlTimestamp,
		construct: constructYamlTimestamp,
		instanceOf: Date,
		represent: representYamlTimestamp
	});
}));
var require_merge = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type$4 = require_type$1();
	function resolveYamlMerge(data) {
		return data === "<<" || data === null;
	}
	module.exports = new Type$4("tag:yaml.org,2002:merge", {
		kind: "scalar",
		resolve: resolveYamlMerge
	});
}));
var require_binary = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type$3 = require_type$1();
	var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
	function resolveYamlBinary(data) {
		if (data === null) return false;
		var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
		for (idx = 0; idx < max; idx++) {
			code = map.indexOf(data.charAt(idx));
			if (code > 64) continue;
			if (code < 0) return false;
			bitlen += 6;
		}
		return bitlen % 8 === 0;
	}
	function constructYamlBinary(data) {
		var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
		for (idx = 0; idx < max; idx++) {
			if (idx % 4 === 0 && idx) {
				result.push(bits >> 16 & 255);
				result.push(bits >> 8 & 255);
				result.push(bits & 255);
			}
			bits = bits << 6 | map.indexOf(input.charAt(idx));
		}
		tailbits = max % 4 * 6;
		if (tailbits === 0) {
			result.push(bits >> 16 & 255);
			result.push(bits >> 8 & 255);
			result.push(bits & 255);
		} else if (tailbits === 18) {
			result.push(bits >> 10 & 255);
			result.push(bits >> 2 & 255);
		} else if (tailbits === 12) result.push(bits >> 4 & 255);
		return new Uint8Array(result);
	}
	function representYamlBinary(object) {
		var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
		for (idx = 0; idx < max; idx++) {
			if (idx % 3 === 0 && idx) {
				result += map[bits >> 18 & 63];
				result += map[bits >> 12 & 63];
				result += map[bits >> 6 & 63];
				result += map[bits & 63];
			}
			bits = (bits << 8) + object[idx];
		}
		tail = max % 3;
		if (tail === 0) {
			result += map[bits >> 18 & 63];
			result += map[bits >> 12 & 63];
			result += map[bits >> 6 & 63];
			result += map[bits & 63];
		} else if (tail === 2) {
			result += map[bits >> 10 & 63];
			result += map[bits >> 4 & 63];
			result += map[bits << 2 & 63];
			result += map[64];
		} else if (tail === 1) {
			result += map[bits >> 2 & 63];
			result += map[bits << 4 & 63];
			result += map[64];
			result += map[64];
		}
		return result;
	}
	function isBinary(obj) {
		return Object.prototype.toString.call(obj) === "[object Uint8Array]";
	}
	module.exports = new Type$3("tag:yaml.org,2002:binary", {
		kind: "scalar",
		resolve: resolveYamlBinary,
		construct: constructYamlBinary,
		predicate: isBinary,
		represent: representYamlBinary
	});
}));
var require_omap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type$2 = require_type$1();
	var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
	var _toString$2 = Object.prototype.toString;
	function resolveYamlOmap(data) {
		if (data === null) return true;
		var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
		for (index = 0, length = object.length; index < length; index += 1) {
			pair = object[index];
			pairHasKey = false;
			if (_toString$2.call(pair) !== "[object Object]") return false;
			for (pairKey in pair) if (_hasOwnProperty$3.call(pair, pairKey)) if (!pairHasKey) pairHasKey = true;
			else return false;
			if (!pairHasKey) return false;
			if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
			else return false;
		}
		return true;
	}
	function constructYamlOmap(data) {
		return data !== null ? data : [];
	}
	module.exports = new Type$2("tag:yaml.org,2002:omap", {
		kind: "sequence",
		resolve: resolveYamlOmap,
		construct: constructYamlOmap
	});
}));
var require_pairs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type$1 = require_type$1();
	var _toString$1 = Object.prototype.toString;
	function resolveYamlPairs(data) {
		if (data === null) return true;
		var index, length, pair, keys$2, result, object = data;
		result = new Array(object.length);
		for (index = 0, length = object.length; index < length; index += 1) {
			pair = object[index];
			if (_toString$1.call(pair) !== "[object Object]") return false;
			keys$2 = Object.keys(pair);
			if (keys$2.length !== 1) return false;
			result[index] = [keys$2[0], pair[keys$2[0]]];
		}
		return true;
	}
	function constructYamlPairs(data) {
		if (data === null) return [];
		var index, length, pair, keys$2, result, object = data;
		result = new Array(object.length);
		for (index = 0, length = object.length; index < length; index += 1) {
			pair = object[index];
			keys$2 = Object.keys(pair);
			result[index] = [keys$2[0], pair[keys$2[0]]];
		}
		return result;
	}
	module.exports = new Type$1("tag:yaml.org,2002:pairs", {
		kind: "sequence",
		resolve: resolveYamlPairs,
		construct: constructYamlPairs
	});
}));
var require_set = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Type = require_type$1();
	var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
	function resolveYamlSet(data) {
		if (data === null) return true;
		var key, object = data;
		for (key in object) if (_hasOwnProperty$2.call(object, key)) {
			if (object[key] !== null) return false;
		}
		return true;
	}
	function constructYamlSet(data) {
		return data !== null ? data : {};
	}
	module.exports = new Type("tag:yaml.org,2002:set", {
		kind: "mapping",
		resolve: resolveYamlSet,
		construct: constructYamlSet
	});
}));
var require_default = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_core().extend({
		implicit: [require_timestamp(), require_merge()],
		explicit: [
			require_binary(),
			require_omap(),
			require_pairs(),
			require_set()
		]
	});
}));
var require_loader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common$1 = require_common();
	var YAMLException$1 = require_exception();
	var makeSnippet = require_snippet();
	var DEFAULT_SCHEMA$1 = require_default();
	var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	var CONTEXT_FLOW_IN = 1;
	var CONTEXT_BLOCK_IN = 3;
	var CONTEXT_BLOCK_OUT = 4;
	var CHOMPING_CLIP = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP = 3;
	var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
	var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
	var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
	var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
	function _class(obj) {
		return Object.prototype.toString.call(obj);
	}
	function is_EOL(c) {
		return c === 10 || c === 13;
	}
	function is_WHITE_SPACE(c) {
		return c === 9 || c === 32;
	}
	function is_WS_OR_EOL(c) {
		return c === 9 || c === 32 || c === 10 || c === 13;
	}
	function is_FLOW_INDICATOR(c) {
		return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
	}
	function fromHexCode(c) {
		var lc;
		if (48 <= c && c <= 57) return c - 48;
		lc = c | 32;
		if (97 <= lc && lc <= 102) return lc - 97 + 10;
		return -1;
	}
	function escapedHexLen(c) {
		if (c === 120) return 2;
		if (c === 117) return 4;
		if (c === 85) return 8;
		return 0;
	}
	function fromDecimalCode(c) {
		if (48 <= c && c <= 57) return c - 48;
		return -1;
	}
	function simpleEscapeSequence(c) {
		return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? "\"" : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
	}
	function charFromCodepoint(c) {
		if (c <= 65535) return String.fromCharCode(c);
		return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
	}
	var simpleEscapeCheck = new Array(256);
	var simpleEscapeMap = new Array(256);
	for (var i = 0; i < 256; i++) {
		simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
		simpleEscapeMap[i] = simpleEscapeSequence(i);
	}
	function State$1(input, options$1) {
		this.input = input;
		this.filename = options$1["filename"] || null;
		this.schema = options$1["schema"] || DEFAULT_SCHEMA$1;
		this.onWarning = options$1["onWarning"] || null;
		this.legacy = options$1["legacy"] || false;
		this.json = options$1["json"] || false;
		this.listener = options$1["listener"] || null;
		this.implicitTypes = this.schema.compiledImplicit;
		this.typeMap = this.schema.compiledTypeMap;
		this.length = input.length;
		this.position = 0;
		this.line = 0;
		this.lineStart = 0;
		this.lineIndent = 0;
		this.firstTabInLine = -1;
		this.documents = [];
	}
	function generateError(state, message) {
		var mark = {
			name: state.filename,
			buffer: state.input.slice(0, -1),
			position: state.position,
			line: state.line,
			column: state.position - state.lineStart
		};
		mark.snippet = makeSnippet(mark);
		return new YAMLException$1(message, mark);
	}
	function throwError(state, message) {
		throw generateError(state, message);
	}
	function throwWarning(state, message) {
		if (state.onWarning) state.onWarning.call(null, generateError(state, message));
	}
	var directiveHandlers = {
		YAML: function handleYamlDirective(state, name$1, args) {
			var match, major, minor;
			if (state.version !== null) throwError(state, "duplication of %YAML directive");
			if (args.length !== 1) throwError(state, "YAML directive accepts exactly one argument");
			match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
			if (match === null) throwError(state, "ill-formed argument of the YAML directive");
			major = parseInt(match[1], 10);
			minor = parseInt(match[2], 10);
			if (major !== 1) throwError(state, "unacceptable YAML version of the document");
			state.version = args[0];
			state.checkLineBreaks = minor < 2;
			if (minor !== 1 && minor !== 2) throwWarning(state, "unsupported YAML version of the document");
		},
		TAG: function handleTagDirective(state, name$1, args) {
			var handle, prefix;
			if (args.length !== 2) throwError(state, "TAG directive accepts exactly two arguments");
			handle = args[0];
			prefix = args[1];
			if (!PATTERN_TAG_HANDLE.test(handle)) throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
			if (_hasOwnProperty$1.call(state.tagMap, handle)) throwError(state, "there is a previously declared suffix for \"" + handle + "\" tag handle");
			if (!PATTERN_TAG_URI.test(prefix)) throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
			try {
				prefix = decodeURIComponent(prefix);
			} catch (err) {
				throwError(state, "tag prefix is malformed: " + prefix);
			}
			state.tagMap[handle] = prefix;
		}
	};
	function captureSegment(state, start, end, checkJson) {
		var _position, _length, _character, _result;
		if (start < end) {
			_result = state.input.slice(start, end);
			if (checkJson) for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
				_character = _result.charCodeAt(_position);
				if (!(_character === 9 || 32 <= _character && _character <= 1114111)) throwError(state, "expected valid JSON character");
			}
			else if (PATTERN_NON_PRINTABLE.test(_result)) throwError(state, "the stream contains non-printable characters");
			state.result += _result;
		}
	}
	function mergeMappings(state, destination, source, overridableKeys) {
		var sourceKeys, key, index, quantity;
		if (!common$1.isObject(source)) throwError(state, "cannot merge mappings; the provided source object is unacceptable");
		sourceKeys = Object.keys(source);
		for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
			key = sourceKeys[index];
			if (!_hasOwnProperty$1.call(destination, key)) {
				destination[key] = source[key];
				overridableKeys[key] = true;
			}
		}
	}
	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
		var index, quantity;
		if (Array.isArray(keyNode)) {
			keyNode = Array.prototype.slice.call(keyNode);
			for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
				if (Array.isArray(keyNode[index])) throwError(state, "nested arrays are not supported inside keys");
				if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") keyNode[index] = "[object Object]";
			}
		}
		if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") keyNode = "[object Object]";
		keyNode = String(keyNode);
		if (_result === null) _result = {};
		if (keyTag === "tag:yaml.org,2002:merge") if (Array.isArray(valueNode)) for (index = 0, quantity = valueNode.length; index < quantity; index += 1) mergeMappings(state, _result, valueNode[index], overridableKeys);
		else mergeMappings(state, _result, valueNode, overridableKeys);
		else {
			if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
				state.line = startLine || state.line;
				state.lineStart = startLineStart || state.lineStart;
				state.position = startPos || state.position;
				throwError(state, "duplicated mapping key");
			}
			if (keyNode === "__proto__") Object.defineProperty(_result, keyNode, {
				configurable: true,
				enumerable: true,
				writable: true,
				value: valueNode
			});
			else _result[keyNode] = valueNode;
			delete overridableKeys[keyNode];
		}
		return _result;
	}
	function readLineBreak(state) {
		var ch = state.input.charCodeAt(state.position);
		if (ch === 10) state.position++;
		else if (ch === 13) {
			state.position++;
			if (state.input.charCodeAt(state.position) === 10) state.position++;
		} else throwError(state, "a line break is expected");
		state.line += 1;
		state.lineStart = state.position;
		state.firstTabInLine = -1;
	}
	function skipSeparationSpace(state, allowComments, checkIndent) {
		var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
		while (ch !== 0) {
			while (is_WHITE_SPACE(ch)) {
				if (ch === 9 && state.firstTabInLine === -1) state.firstTabInLine = state.position;
				ch = state.input.charCodeAt(++state.position);
			}
			if (allowComments && ch === 35) do
				ch = state.input.charCodeAt(++state.position);
			while (ch !== 10 && ch !== 13 && ch !== 0);
			if (is_EOL(ch)) {
				readLineBreak(state);
				ch = state.input.charCodeAt(state.position);
				lineBreaks++;
				state.lineIndent = 0;
				while (ch === 32) {
					state.lineIndent++;
					ch = state.input.charCodeAt(++state.position);
				}
			} else break;
		}
		if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) throwWarning(state, "deficient indentation");
		return lineBreaks;
	}
	function testDocumentSeparator(state) {
		var _position = state.position, ch = state.input.charCodeAt(_position);
		if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
			_position += 3;
			ch = state.input.charCodeAt(_position);
			if (ch === 0 || is_WS_OR_EOL(ch)) return true;
		}
		return false;
	}
	function writeFoldedLines(state, count) {
		if (count === 1) state.result += " ";
		else if (count > 1) state.result += common$1.repeat("\n", count - 1);
	}
	function readPlainScalar(state, nodeIndent, withinFlowCollection) {
		var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch = state.input.charCodeAt(state.position);
		if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) return false;
		if (ch === 63 || ch === 45) {
			following = state.input.charCodeAt(state.position + 1);
			if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) return false;
		}
		state.kind = "scalar";
		state.result = "";
		captureStart = captureEnd = state.position;
		hasPendingContent = false;
		while (ch !== 0) {
			if (ch === 58) {
				following = state.input.charCodeAt(state.position + 1);
				if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) break;
			} else if (ch === 35) {
				preceding = state.input.charCodeAt(state.position - 1);
				if (is_WS_OR_EOL(preceding)) break;
			} else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) break;
			else if (is_EOL(ch)) {
				_line = state.line;
				_lineStart = state.lineStart;
				_lineIndent = state.lineIndent;
				skipSeparationSpace(state, false, -1);
				if (state.lineIndent >= nodeIndent) {
					hasPendingContent = true;
					ch = state.input.charCodeAt(state.position);
					continue;
				} else {
					state.position = captureEnd;
					state.line = _line;
					state.lineStart = _lineStart;
					state.lineIndent = _lineIndent;
					break;
				}
			}
			if (hasPendingContent) {
				captureSegment(state, captureStart, captureEnd, false);
				writeFoldedLines(state, state.line - _line);
				captureStart = captureEnd = state.position;
				hasPendingContent = false;
			}
			if (!is_WHITE_SPACE(ch)) captureEnd = state.position + 1;
			ch = state.input.charCodeAt(++state.position);
		}
		captureSegment(state, captureStart, captureEnd, false);
		if (state.result) return true;
		state.kind = _kind;
		state.result = _result;
		return false;
	}
	function readSingleQuotedScalar(state, nodeIndent) {
		var ch = state.input.charCodeAt(state.position), captureStart, captureEnd;
		if (ch !== 39) return false;
		state.kind = "scalar";
		state.result = "";
		state.position++;
		captureStart = captureEnd = state.position;
		while ((ch = state.input.charCodeAt(state.position)) !== 0) if (ch === 39) {
			captureSegment(state, captureStart, state.position, true);
			ch = state.input.charCodeAt(++state.position);
			if (ch === 39) {
				captureStart = state.position;
				state.position++;
				captureEnd = state.position;
			} else return true;
		} else if (is_EOL(ch)) {
			captureSegment(state, captureStart, captureEnd, true);
			writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
			captureStart = captureEnd = state.position;
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a single quoted scalar");
		else {
			state.position++;
			captureEnd = state.position;
		}
		throwError(state, "unexpected end of the stream within a single quoted scalar");
	}
	function readDoubleQuotedScalar(state, nodeIndent) {
		var captureStart, captureEnd, hexLength, hexResult, tmp, ch = state.input.charCodeAt(state.position);
		if (ch !== 34) return false;
		state.kind = "scalar";
		state.result = "";
		state.position++;
		captureStart = captureEnd = state.position;
		while ((ch = state.input.charCodeAt(state.position)) !== 0) if (ch === 34) {
			captureSegment(state, captureStart, state.position, true);
			state.position++;
			return true;
		} else if (ch === 92) {
			captureSegment(state, captureStart, state.position, true);
			ch = state.input.charCodeAt(++state.position);
			if (is_EOL(ch)) skipSeparationSpace(state, false, nodeIndent);
			else if (ch < 256 && simpleEscapeCheck[ch]) {
				state.result += simpleEscapeMap[ch];
				state.position++;
			} else if ((tmp = escapedHexLen(ch)) > 0) {
				hexLength = tmp;
				hexResult = 0;
				for (; hexLength > 0; hexLength--) {
					ch = state.input.charCodeAt(++state.position);
					if ((tmp = fromHexCode(ch)) >= 0) hexResult = (hexResult << 4) + tmp;
					else throwError(state, "expected hexadecimal character");
				}
				state.result += charFromCodepoint(hexResult);
				state.position++;
			} else throwError(state, "unknown escape sequence");
			captureStart = captureEnd = state.position;
		} else if (is_EOL(ch)) {
			captureSegment(state, captureStart, captureEnd, true);
			writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
			captureStart = captureEnd = state.position;
		} else if (state.position === state.lineStart && testDocumentSeparator(state)) throwError(state, "unexpected end of the document within a double quoted scalar");
		else {
			state.position++;
			captureEnd = state.position;
		}
		throwError(state, "unexpected end of the stream within a double quoted scalar");
	}
	function readFlowCollection(state, nodeIndent) {
		var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = Object.create(null), keyNode, keyTag, valueNode, ch = state.input.charCodeAt(state.position);
		if (ch === 91) {
			terminator = 93;
			isMapping = false;
			_result = [];
		} else if (ch === 123) {
			terminator = 125;
			isMapping = true;
			_result = {};
		} else return false;
		if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
		ch = state.input.charCodeAt(++state.position);
		while (ch !== 0) {
			skipSeparationSpace(state, true, nodeIndent);
			ch = state.input.charCodeAt(state.position);
			if (ch === terminator) {
				state.position++;
				state.tag = _tag;
				state.anchor = _anchor;
				state.kind = isMapping ? "mapping" : "sequence";
				state.result = _result;
				return true;
			} else if (!readNext) throwError(state, "missed comma between flow collection entries");
			else if (ch === 44) throwError(state, "expected the node content, but found ','");
			keyTag = keyNode = valueNode = null;
			isPair = isExplicitPair = false;
			if (ch === 63) {
				following = state.input.charCodeAt(state.position + 1);
				if (is_WS_OR_EOL(following)) {
					isPair = isExplicitPair = true;
					state.position++;
					skipSeparationSpace(state, true, nodeIndent);
				}
			}
			_line = state.line;
			_lineStart = state.lineStart;
			_pos = state.position;
			composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
			keyTag = state.tag;
			keyNode = state.result;
			skipSeparationSpace(state, true, nodeIndent);
			ch = state.input.charCodeAt(state.position);
			if ((isExplicitPair || state.line === _line) && ch === 58) {
				isPair = true;
				ch = state.input.charCodeAt(++state.position);
				skipSeparationSpace(state, true, nodeIndent);
				composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
				valueNode = state.result;
			}
			if (isMapping) storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
			else if (isPair) _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
			else _result.push(keyNode);
			skipSeparationSpace(state, true, nodeIndent);
			ch = state.input.charCodeAt(state.position);
			if (ch === 44) {
				readNext = true;
				ch = state.input.charCodeAt(++state.position);
			} else readNext = false;
		}
		throwError(state, "unexpected end of the stream within a flow collection");
	}
	function readBlockScalar(state, nodeIndent) {
		var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch = state.input.charCodeAt(state.position);
		if (ch === 124) folding = false;
		else if (ch === 62) folding = true;
		else return false;
		state.kind = "scalar";
		state.result = "";
		while (ch !== 0) {
			ch = state.input.charCodeAt(++state.position);
			if (ch === 43 || ch === 45) if (1 === chomping) chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
			else throwError(state, "repeat of a chomping mode identifier");
			else if ((tmp = fromDecimalCode(ch)) >= 0) if (tmp === 0) throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
			else if (!detectedIndent) {
				textIndent = nodeIndent + tmp - 1;
				detectedIndent = true;
			} else throwError(state, "repeat of an indentation width identifier");
			else break;
		}
		if (is_WHITE_SPACE(ch)) {
			do
				ch = state.input.charCodeAt(++state.position);
			while (is_WHITE_SPACE(ch));
			if (ch === 35) do
				ch = state.input.charCodeAt(++state.position);
			while (!is_EOL(ch) && ch !== 0);
		}
		while (ch !== 0) {
			readLineBreak(state);
			state.lineIndent = 0;
			ch = state.input.charCodeAt(state.position);
			while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
				state.lineIndent++;
				ch = state.input.charCodeAt(++state.position);
			}
			if (!detectedIndent && state.lineIndent > textIndent) textIndent = state.lineIndent;
			if (is_EOL(ch)) {
				emptyLines++;
				continue;
			}
			if (state.lineIndent < textIndent) {
				if (chomping === 3) state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
				else if (chomping === 1) {
					if (didReadContent) state.result += "\n";
				}
				break;
			}
			if (folding) if (is_WHITE_SPACE(ch)) {
				atMoreIndented = true;
				state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
			} else if (atMoreIndented) {
				atMoreIndented = false;
				state.result += common$1.repeat("\n", emptyLines + 1);
			} else if (emptyLines === 0) {
				if (didReadContent) state.result += " ";
			} else state.result += common$1.repeat("\n", emptyLines);
			else state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
			didReadContent = true;
			detectedIndent = true;
			emptyLines = 0;
			captureStart = state.position;
			while (!is_EOL(ch) && ch !== 0) ch = state.input.charCodeAt(++state.position);
			captureSegment(state, captureStart, state.position, false);
		}
		return true;
	}
	function readBlockSequence(state, nodeIndent) {
		var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
		if (state.firstTabInLine !== -1) return false;
		if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
		ch = state.input.charCodeAt(state.position);
		while (ch !== 0) {
			if (state.firstTabInLine !== -1) {
				state.position = state.firstTabInLine;
				throwError(state, "tab characters must not be used in indentation");
			}
			if (ch !== 45) break;
			following = state.input.charCodeAt(state.position + 1);
			if (!is_WS_OR_EOL(following)) break;
			detected = true;
			state.position++;
			if (skipSeparationSpace(state, true, -1)) {
				if (state.lineIndent <= nodeIndent) {
					_result.push(null);
					ch = state.input.charCodeAt(state.position);
					continue;
				}
			}
			_line = state.line;
			composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
			_result.push(state.result);
			skipSeparationSpace(state, true, -1);
			ch = state.input.charCodeAt(state.position);
			if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a sequence entry");
			else if (state.lineIndent < nodeIndent) break;
		}
		if (detected) {
			state.tag = _tag;
			state.anchor = _anchor;
			state.kind = "sequence";
			state.result = _result;
			return true;
		}
		return false;
	}
	function readBlockMapping(state, nodeIndent, flowIndent) {
		var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
		if (state.firstTabInLine !== -1) return false;
		if (state.anchor !== null) state.anchorMap[state.anchor] = _result;
		ch = state.input.charCodeAt(state.position);
		while (ch !== 0) {
			if (!atExplicitKey && state.firstTabInLine !== -1) {
				state.position = state.firstTabInLine;
				throwError(state, "tab characters must not be used in indentation");
			}
			following = state.input.charCodeAt(state.position + 1);
			_line = state.line;
			if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
				if (ch === 63) {
					if (atExplicitKey) {
						storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
						keyTag = keyNode = valueNode = null;
					}
					detected = true;
					atExplicitKey = true;
					allowCompact = true;
				} else if (atExplicitKey) {
					atExplicitKey = false;
					allowCompact = true;
				} else throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
				state.position += 1;
				ch = following;
			} else {
				_keyLine = state.line;
				_keyLineStart = state.lineStart;
				_keyPos = state.position;
				if (!composeNode(state, flowIndent, 2, false, true)) break;
				if (state.line === _line) {
					ch = state.input.charCodeAt(state.position);
					while (is_WHITE_SPACE(ch)) ch = state.input.charCodeAt(++state.position);
					if (ch === 58) {
						ch = state.input.charCodeAt(++state.position);
						if (!is_WS_OR_EOL(ch)) throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
						if (atExplicitKey) {
							storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
							keyTag = keyNode = valueNode = null;
						}
						detected = true;
						atExplicitKey = false;
						allowCompact = false;
						keyTag = state.tag;
						keyNode = state.result;
					} else if (detected) throwError(state, "can not read an implicit mapping pair; a colon is missed");
					else {
						state.tag = _tag;
						state.anchor = _anchor;
						return true;
					}
				} else if (detected) throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
				else {
					state.tag = _tag;
					state.anchor = _anchor;
					return true;
				}
			}
			if (state.line === _line || state.lineIndent > nodeIndent) {
				if (atExplicitKey) {
					_keyLine = state.line;
					_keyLineStart = state.lineStart;
					_keyPos = state.position;
				}
				if (composeNode(state, nodeIndent, 4, true, allowCompact)) if (atExplicitKey) keyNode = state.result;
				else valueNode = state.result;
				if (!atExplicitKey) {
					storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
					keyTag = keyNode = valueNode = null;
				}
				skipSeparationSpace(state, true, -1);
				ch = state.input.charCodeAt(state.position);
			}
			if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) throwError(state, "bad indentation of a mapping entry");
			else if (state.lineIndent < nodeIndent) break;
		}
		if (atExplicitKey) storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
		if (detected) {
			state.tag = _tag;
			state.anchor = _anchor;
			state.kind = "mapping";
			state.result = _result;
		}
		return detected;
	}
	function readTagProperty(state) {
		var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch = state.input.charCodeAt(state.position);
		if (ch !== 33) return false;
		if (state.tag !== null) throwError(state, "duplication of a tag property");
		ch = state.input.charCodeAt(++state.position);
		if (ch === 60) {
			isVerbatim = true;
			ch = state.input.charCodeAt(++state.position);
		} else if (ch === 33) {
			isNamed = true;
			tagHandle = "!!";
			ch = state.input.charCodeAt(++state.position);
		} else tagHandle = "!";
		_position = state.position;
		if (isVerbatim) {
			do
				ch = state.input.charCodeAt(++state.position);
			while (ch !== 0 && ch !== 62);
			if (state.position < state.length) {
				tagName = state.input.slice(_position, state.position);
				ch = state.input.charCodeAt(++state.position);
			} else throwError(state, "unexpected end of the stream within a verbatim tag");
		} else {
			while (ch !== 0 && !is_WS_OR_EOL(ch)) {
				if (ch === 33) if (!isNamed) {
					tagHandle = state.input.slice(_position - 1, state.position + 1);
					if (!PATTERN_TAG_HANDLE.test(tagHandle)) throwError(state, "named tag handle cannot contain such characters");
					isNamed = true;
					_position = state.position + 1;
				} else throwError(state, "tag suffix cannot contain exclamation marks");
				ch = state.input.charCodeAt(++state.position);
			}
			tagName = state.input.slice(_position, state.position);
			if (PATTERN_FLOW_INDICATORS.test(tagName)) throwError(state, "tag suffix cannot contain flow indicator characters");
		}
		if (tagName && !PATTERN_TAG_URI.test(tagName)) throwError(state, "tag name cannot contain such characters: " + tagName);
		try {
			tagName = decodeURIComponent(tagName);
		} catch (err) {
			throwError(state, "tag name is malformed: " + tagName);
		}
		if (isVerbatim) state.tag = tagName;
		else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) state.tag = state.tagMap[tagHandle] + tagName;
		else if (tagHandle === "!") state.tag = "!" + tagName;
		else if (tagHandle === "!!") state.tag = "tag:yaml.org,2002:" + tagName;
		else throwError(state, "undeclared tag handle \"" + tagHandle + "\"");
		return true;
	}
	function readAnchorProperty(state) {
		var _position, ch = state.input.charCodeAt(state.position);
		if (ch !== 38) return false;
		if (state.anchor !== null) throwError(state, "duplication of an anchor property");
		ch = state.input.charCodeAt(++state.position);
		_position = state.position;
		while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) ch = state.input.charCodeAt(++state.position);
		if (state.position === _position) throwError(state, "name of an anchor node must contain at least one character");
		state.anchor = state.input.slice(_position, state.position);
		return true;
	}
	function readAlias(state) {
		var _position, alias, ch = state.input.charCodeAt(state.position);
		if (ch !== 42) return false;
		ch = state.input.charCodeAt(++state.position);
		_position = state.position;
		while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) ch = state.input.charCodeAt(++state.position);
		if (state.position === _position) throwError(state, "name of an alias node must contain at least one character");
		alias = state.input.slice(_position, state.position);
		if (!_hasOwnProperty$1.call(state.anchorMap, alias)) throwError(state, "unidentified alias \"" + alias + "\"");
		state.result = state.anchorMap[alias];
		skipSeparationSpace(state, true, -1);
		return true;
	}
	function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
		var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type$1, flowIndent, blockIndent;
		if (state.listener !== null) state.listener("open", state);
		state.tag = null;
		state.anchor = null;
		state.kind = null;
		state.result = null;
		allowBlockStyles = allowBlockScalars = allowBlockCollections = 4 === nodeContext || 3 === nodeContext;
		if (allowToSeek) {
			if (skipSeparationSpace(state, true, -1)) {
				atNewLine = true;
				if (state.lineIndent > parentIndent) indentStatus = 1;
				else if (state.lineIndent === parentIndent) indentStatus = 0;
				else if (state.lineIndent < parentIndent) indentStatus = -1;
			}
		}
		if (indentStatus === 1) while (readTagProperty(state) || readAnchorProperty(state)) if (skipSeparationSpace(state, true, -1)) {
			atNewLine = true;
			allowBlockCollections = allowBlockStyles;
			if (state.lineIndent > parentIndent) indentStatus = 1;
			else if (state.lineIndent === parentIndent) indentStatus = 0;
			else if (state.lineIndent < parentIndent) indentStatus = -1;
		} else allowBlockCollections = false;
		if (allowBlockCollections) allowBlockCollections = atNewLine || allowCompact;
		if (indentStatus === 1 || 4 === nodeContext) {
			if (1 === nodeContext || 2 === nodeContext) flowIndent = parentIndent;
			else flowIndent = parentIndent + 1;
			blockIndent = state.position - state.lineStart;
			if (indentStatus === 1) if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) hasContent = true;
			else {
				if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) hasContent = true;
				else if (readAlias(state)) {
					hasContent = true;
					if (state.tag !== null || state.anchor !== null) throwError(state, "alias node should not have any properties");
				} else if (readPlainScalar(state, flowIndent, 1 === nodeContext)) {
					hasContent = true;
					if (state.tag === null) state.tag = "?";
				}
				if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
			}
			else if (indentStatus === 0) hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
		}
		if (state.tag === null) {
			if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
		} else if (state.tag === "?") {
			if (state.result !== null && state.kind !== "scalar") throwError(state, "unacceptable node kind for !<?> tag; it should be \"scalar\", not \"" + state.kind + "\"");
			for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
				type$1 = state.implicitTypes[typeIndex];
				if (type$1.resolve(state.result)) {
					state.result = type$1.construct(state.result);
					state.tag = type$1.tag;
					if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
					break;
				}
			}
		} else if (state.tag !== "!") {
			if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) type$1 = state.typeMap[state.kind || "fallback"][state.tag];
			else {
				type$1 = null;
				typeList = state.typeMap.multi[state.kind || "fallback"];
				for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
					type$1 = typeList[typeIndex];
					break;
				}
			}
			if (!type$1) throwError(state, "unknown tag !<" + state.tag + ">");
			if (state.result !== null && type$1.kind !== state.kind) throwError(state, "unacceptable node kind for !<" + state.tag + "> tag; it should be \"" + type$1.kind + "\", not \"" + state.kind + "\"");
			if (!type$1.resolve(state.result, state.tag)) throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
			else {
				state.result = type$1.construct(state.result, state.tag);
				if (state.anchor !== null) state.anchorMap[state.anchor] = state.result;
			}
		}
		if (state.listener !== null) state.listener("close", state);
		return state.tag !== null || state.anchor !== null || hasContent;
	}
	function readDocument(state) {
		var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
		state.version = null;
		state.checkLineBreaks = state.legacy;
		state.tagMap = Object.create(null);
		state.anchorMap = Object.create(null);
		while ((ch = state.input.charCodeAt(state.position)) !== 0) {
			skipSeparationSpace(state, true, -1);
			ch = state.input.charCodeAt(state.position);
			if (state.lineIndent > 0 || ch !== 37) break;
			hasDirectives = true;
			ch = state.input.charCodeAt(++state.position);
			_position = state.position;
			while (ch !== 0 && !is_WS_OR_EOL(ch)) ch = state.input.charCodeAt(++state.position);
			directiveName = state.input.slice(_position, state.position);
			directiveArgs = [];
			if (directiveName.length < 1) throwError(state, "directive name must not be less than one character in length");
			while (ch !== 0) {
				while (is_WHITE_SPACE(ch)) ch = state.input.charCodeAt(++state.position);
				if (ch === 35) {
					do
						ch = state.input.charCodeAt(++state.position);
					while (ch !== 0 && !is_EOL(ch));
					break;
				}
				if (is_EOL(ch)) break;
				_position = state.position;
				while (ch !== 0 && !is_WS_OR_EOL(ch)) ch = state.input.charCodeAt(++state.position);
				directiveArgs.push(state.input.slice(_position, state.position));
			}
			if (ch !== 0) readLineBreak(state);
			if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) directiveHandlers[directiveName](state, directiveName, directiveArgs);
			else throwWarning(state, "unknown document directive \"" + directiveName + "\"");
		}
		skipSeparationSpace(state, true, -1);
		if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
			state.position += 3;
			skipSeparationSpace(state, true, -1);
		} else if (hasDirectives) throwError(state, "directives end mark is expected");
		composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
		skipSeparationSpace(state, true, -1);
		if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) throwWarning(state, "non-ASCII line breaks are interpreted as content");
		state.documents.push(state.result);
		if (state.position === state.lineStart && testDocumentSeparator(state)) {
			if (state.input.charCodeAt(state.position) === 46) {
				state.position += 3;
				skipSeparationSpace(state, true, -1);
			}
			return;
		}
		if (state.position < state.length - 1) throwError(state, "end of the stream or a document separator is expected");
		else return;
	}
	function loadDocuments(input, options$1) {
		input = String(input);
		options$1 = options$1 || {};
		if (input.length !== 0) {
			if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) input += "\n";
			if (input.charCodeAt(0) === 65279) input = input.slice(1);
		}
		var state = new State$1(input, options$1);
		var nullpos = input.indexOf("\0");
		if (nullpos !== -1) {
			state.position = nullpos;
			throwError(state, "null byte is not allowed in input");
		}
		state.input += "\0";
		while (state.input.charCodeAt(state.position) === 32) {
			state.lineIndent += 1;
			state.position += 1;
		}
		while (state.position < state.length - 1) readDocument(state);
		return state.documents;
	}
	function loadAll(input, iterator, options$1) {
		if (iterator !== null && typeof iterator === "object" && typeof options$1 === "undefined") {
			options$1 = iterator;
			iterator = null;
		}
		var documents = loadDocuments(input, options$1);
		if (typeof iterator !== "function") return documents;
		for (var index = 0, length = documents.length; index < length; index += 1) iterator(documents[index]);
	}
	function load(input, options$1) {
		var documents = loadDocuments(input, options$1);
		if (documents.length === 0) return;
		else if (documents.length === 1) return documents[0];
		throw new YAMLException$1("expected a single document in the stream, but found more");
	}
	module.exports.loadAll = loadAll;
	module.exports.load = load;
}));
var require_dumper = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var common = require_common();
	var YAMLException = require_exception();
	var DEFAULT_SCHEMA = require_default();
	var _toString = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var ESCAPE_SEQUENCES = {};
	ESCAPE_SEQUENCES[0] = "\\0";
	ESCAPE_SEQUENCES[7] = "\\a";
	ESCAPE_SEQUENCES[8] = "\\b";
	ESCAPE_SEQUENCES[9] = "\\t";
	ESCAPE_SEQUENCES[10] = "\\n";
	ESCAPE_SEQUENCES[11] = "\\v";
	ESCAPE_SEQUENCES[12] = "\\f";
	ESCAPE_SEQUENCES[13] = "\\r";
	ESCAPE_SEQUENCES[27] = "\\e";
	ESCAPE_SEQUENCES[34] = "\\\"";
	ESCAPE_SEQUENCES[92] = "\\\\";
	ESCAPE_SEQUENCES[133] = "\\N";
	ESCAPE_SEQUENCES[160] = "\\_";
	ESCAPE_SEQUENCES[8232] = "\\L";
	ESCAPE_SEQUENCES[8233] = "\\P";
	var DEPRECATED_BOOLEANS_SYNTAX = [
		"y",
		"Y",
		"yes",
		"Yes",
		"YES",
		"on",
		"On",
		"ON",
		"n",
		"N",
		"no",
		"No",
		"NO",
		"off",
		"Off",
		"OFF"
	];
	var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
	function compileStyleMap(schema, map) {
		var result, keys$2, index, length, tag, style, type$1;
		if (map === null) return {};
		result = {};
		keys$2 = Object.keys(map);
		for (index = 0, length = keys$2.length; index < length; index += 1) {
			tag = keys$2[index];
			style = String(map[tag]);
			if (tag.slice(0, 2) === "!!") tag = "tag:yaml.org,2002:" + tag.slice(2);
			type$1 = schema.compiledTypeMap["fallback"][tag];
			if (type$1 && _hasOwnProperty.call(type$1.styleAliases, style)) style = type$1.styleAliases[style];
			result[tag] = style;
		}
		return result;
	}
	function encodeHex(character) {
		var string = character.toString(16).toUpperCase(), handle, length;
		if (character <= 255) {
			handle = "x";
			length = 2;
		} else if (character <= 65535) {
			handle = "u";
			length = 4;
		} else if (character <= 4294967295) {
			handle = "U";
			length = 8;
		} else throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
		return "\\" + handle + common.repeat("0", length - string.length) + string;
	}
	var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
	function State(options$1) {
		this.schema = options$1["schema"] || DEFAULT_SCHEMA;
		this.indent = Math.max(1, options$1["indent"] || 2);
		this.noArrayIndent = options$1["noArrayIndent"] || false;
		this.skipInvalid = options$1["skipInvalid"] || false;
		this.flowLevel = common.isNothing(options$1["flowLevel"]) ? -1 : options$1["flowLevel"];
		this.styleMap = compileStyleMap(this.schema, options$1["styles"] || null);
		this.sortKeys = options$1["sortKeys"] || false;
		this.lineWidth = options$1["lineWidth"] || 80;
		this.noRefs = options$1["noRefs"] || false;
		this.noCompatMode = options$1["noCompatMode"] || false;
		this.condenseFlow = options$1["condenseFlow"] || false;
		this.quotingType = options$1["quotingType"] === "\"" ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
		this.forceQuotes = options$1["forceQuotes"] || false;
		this.replacer = typeof options$1["replacer"] === "function" ? options$1["replacer"] : null;
		this.implicitTypes = this.schema.compiledImplicit;
		this.explicitTypes = this.schema.compiledExplicit;
		this.tag = null;
		this.result = "";
		this.duplicates = [];
		this.usedDuplicates = null;
	}
	function indentString(string, spaces) {
		var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
		while (position < length) {
			next = string.indexOf("\n", position);
			if (next === -1) {
				line = string.slice(position);
				position = length;
			} else {
				line = string.slice(position, next + 1);
				position = next + 1;
			}
			if (line.length && line !== "\n") result += ind;
			result += line;
		}
		return result;
	}
	function generateNextLine(state, level) {
		return "\n" + common.repeat(" ", state.indent * level);
	}
	function testImplicitResolving(state, str) {
		var index, length, type$1;
		for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
			type$1 = state.implicitTypes[index];
			if (type$1.resolve(str)) return true;
		}
		return false;
	}
	function isWhitespace$1(c) {
		return c === 32 || c === 9;
	}
	function isPrintable(c) {
		return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
	}
	function isNsCharOrWhitespace(c) {
		return isPrintable(c) && c !== 65279 && c !== 13 && c !== 10;
	}
	function isPlainSafe(c, prev, inblock) {
		var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
		var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace$1(c);
		return (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== 44 && c !== 91 && c !== 93 && c !== 123 && c !== 125) && c !== 35 && !(prev === 58 && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace$1(prev) && c === 35 || prev === 58 && cIsNsChar;
	}
	function isPlainSafeFirst(c) {
		return isPrintable(c) && c !== 65279 && !isWhitespace$1(c) && c !== 45 && c !== 63 && c !== 58 && c !== 44 && c !== 91 && c !== 93 && c !== 123 && c !== 125 && c !== 35 && c !== 38 && c !== 42 && c !== 33 && c !== 124 && c !== 61 && c !== 62 && c !== 39 && c !== 34 && c !== 37 && c !== 64 && c !== 96;
	}
	function isPlainSafeLast(c) {
		return !isWhitespace$1(c) && c !== 58;
	}
	function codePointAt(string, pos) {
		var first = string.charCodeAt(pos), second;
		if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
			second = string.charCodeAt(pos + 1);
			if (second >= 56320 && second <= 57343) return (first - 55296) * 1024 + second - 56320 + 65536;
		}
		return first;
	}
	function needIndentIndicator(string) {
		return /^\n* /.test(string);
	}
	var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
		var i$1;
		var char = 0;
		var prevChar = null;
		var hasLineBreak = false;
		var hasFoldableLine = false;
		var shouldTrackWidth = lineWidth !== -1;
		var previousLineBreak = -1;
		var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
		if (singleLineOnly || forceQuotes) for (i$1 = 0; i$1 < string.length; char >= 65536 ? i$1 += 2 : i$1++) {
			char = codePointAt(string, i$1);
			if (!isPrintable(char)) return STYLE_DOUBLE;
			plain = plain && isPlainSafe(char, prevChar, inblock);
			prevChar = char;
		}
		else {
			for (i$1 = 0; i$1 < string.length; char >= 65536 ? i$1 += 2 : i$1++) {
				char = codePointAt(string, i$1);
				if (char === 10) {
					hasLineBreak = true;
					if (shouldTrackWidth) {
						hasFoldableLine = hasFoldableLine || i$1 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
						previousLineBreak = i$1;
					}
				} else if (!isPrintable(char)) return STYLE_DOUBLE;
				plain = plain && isPlainSafe(char, prevChar, inblock);
				prevChar = char;
			}
			hasFoldableLine = hasFoldableLine || shouldTrackWidth && i$1 - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
		}
		if (!hasLineBreak && !hasFoldableLine) {
			if (plain && !forceQuotes && !testAmbiguousType(string)) return STYLE_PLAIN;
			return quotingType === 2 ? STYLE_DOUBLE : STYLE_SINGLE;
		}
		if (indentPerLevel > 9 && needIndentIndicator(string)) return STYLE_DOUBLE;
		if (!forceQuotes) return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
		return quotingType === 2 ? STYLE_DOUBLE : STYLE_SINGLE;
	}
	function writeScalar(state, string, level, iskey, inblock) {
		state.dump = function() {
			if (string.length === 0) return state.quotingType === 2 ? "\"\"" : "''";
			if (!state.noCompatMode) {
				if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) return state.quotingType === 2 ? "\"" + string + "\"" : "'" + string + "'";
			}
			var indent = state.indent * Math.max(1, level);
			var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
			var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
			function testAmbiguity(string$1) {
				return testImplicitResolving(state, string$1);
			}
			switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {
				case STYLE_PLAIN: return string;
				case STYLE_SINGLE: return "'" + string.replace(/'/g, "''") + "'";
				case STYLE_LITERAL: return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
				case STYLE_FOLDED: return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
				case STYLE_DOUBLE: return "\"" + escapeString(string, lineWidth) + "\"";
				default: throw new YAMLException("impossible error: invalid scalar style");
			}
		}();
	}
	function blockHeader(string, indentPerLevel) {
		var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
		var clip = string[string.length - 1] === "\n";
		var chomp = clip && (string[string.length - 2] === "\n" || string === "\n") ? "+" : clip ? "" : "-";
		return indentIndicator + chomp + "\n";
	}
	function dropEndingNewline(string) {
		return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
	}
	function foldString(string, width) {
		var lineRe = /(\n+)([^\n]*)/g;
		var result = function() {
			var nextLF = string.indexOf("\n");
			nextLF = nextLF !== -1 ? nextLF : string.length;
			lineRe.lastIndex = nextLF;
			return foldLine(string.slice(0, nextLF), width);
		}();
		var prevMoreIndented = string[0] === "\n" || string[0] === " ";
		var moreIndented;
		var match;
		while (match = lineRe.exec(string)) {
			var prefix = match[1], line = match[2];
			moreIndented = line[0] === " ";
			result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
			prevMoreIndented = moreIndented;
		}
		return result;
	}
	function foldLine(line, width) {
		if (line === "" || line[0] === " ") return line;
		var breakRe = / [^ ]/g;
		var match;
		var start = 0, end, curr = 0, next = 0;
		var result = "";
		while (match = breakRe.exec(line)) {
			next = match.index;
			if (next - start > width) {
				end = curr > start ? curr : next;
				result += "\n" + line.slice(start, end);
				start = end + 1;
			}
			curr = next;
		}
		result += "\n";
		if (line.length - start > width && curr > start) result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
		else result += line.slice(start);
		return result.slice(1);
	}
	function escapeString(string) {
		var result = "";
		var char = 0;
		var escapeSeq;
		for (var i$1 = 0; i$1 < string.length; char >= 65536 ? i$1 += 2 : i$1++) {
			char = codePointAt(string, i$1);
			escapeSeq = ESCAPE_SEQUENCES[char];
			if (!escapeSeq && isPrintable(char)) {
				result += string[i$1];
				if (char >= 65536) result += string[i$1 + 1];
			} else result += escapeSeq || encodeHex(char);
		}
		return result;
	}
	function writeFlowSequence(state, level, object) {
		var _result = "", _tag = state.tag, index, length, value;
		for (index = 0, length = object.length; index < length; index += 1) {
			value = object[index];
			if (state.replacer) value = state.replacer.call(object, String(index), value);
			if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
				if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
				_result += state.dump;
			}
		}
		state.tag = _tag;
		state.dump = "[" + _result + "]";
	}
	function writeBlockSequence(state, level, object, compact) {
		var _result = "", _tag = state.tag, index, length, value;
		for (index = 0, length = object.length; index < length; index += 1) {
			value = object[index];
			if (state.replacer) value = state.replacer.call(object, String(index), value);
			if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
				if (!compact || _result !== "") _result += generateNextLine(state, level);
				if (state.dump && 10 === state.dump.charCodeAt(0)) _result += "-";
				else _result += "- ";
				_result += state.dump;
			}
		}
		state.tag = _tag;
		state.dump = _result || "[]";
	}
	function writeFlowMapping(state, level, object) {
		var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
		for (index = 0, length = objectKeyList.length; index < length; index += 1) {
			pairBuffer = "";
			if (_result !== "") pairBuffer += ", ";
			if (state.condenseFlow) pairBuffer += "\"";
			objectKey = objectKeyList[index];
			objectValue = object[objectKey];
			if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
			if (!writeNode(state, level, objectKey, false, false)) continue;
			if (state.dump.length > 1024) pairBuffer += "? ";
			pairBuffer += state.dump + (state.condenseFlow ? "\"" : "") + ":" + (state.condenseFlow ? "" : " ");
			if (!writeNode(state, level, objectValue, false, false)) continue;
			pairBuffer += state.dump;
			_result += pairBuffer;
		}
		state.tag = _tag;
		state.dump = "{" + _result + "}";
	}
	function writeBlockMapping(state, level, object, compact) {
		var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
		if (state.sortKeys === true) objectKeyList.sort();
		else if (typeof state.sortKeys === "function") objectKeyList.sort(state.sortKeys);
		else if (state.sortKeys) throw new YAMLException("sortKeys must be a boolean or a function");
		for (index = 0, length = objectKeyList.length; index < length; index += 1) {
			pairBuffer = "";
			if (!compact || _result !== "") pairBuffer += generateNextLine(state, level);
			objectKey = objectKeyList[index];
			objectValue = object[objectKey];
			if (state.replacer) objectValue = state.replacer.call(object, objectKey, objectValue);
			if (!writeNode(state, level + 1, objectKey, true, true, true)) continue;
			explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
			if (explicitPair) if (state.dump && 10 === state.dump.charCodeAt(0)) pairBuffer += "?";
			else pairBuffer += "? ";
			pairBuffer += state.dump;
			if (explicitPair) pairBuffer += generateNextLine(state, level);
			if (!writeNode(state, level + 1, objectValue, true, explicitPair)) continue;
			if (state.dump && 10 === state.dump.charCodeAt(0)) pairBuffer += ":";
			else pairBuffer += ": ";
			pairBuffer += state.dump;
			_result += pairBuffer;
		}
		state.tag = _tag;
		state.dump = _result || "{}";
	}
	function detectType(state, object, explicit) {
		var _result, typeList = explicit ? state.explicitTypes : state.implicitTypes, index, length, type$1, style;
		for (index = 0, length = typeList.length; index < length; index += 1) {
			type$1 = typeList[index];
			if ((type$1.instanceOf || type$1.predicate) && (!type$1.instanceOf || typeof object === "object" && object instanceof type$1.instanceOf) && (!type$1.predicate || type$1.predicate(object))) {
				if (explicit) if (type$1.multi && type$1.representName) state.tag = type$1.representName(object);
				else state.tag = type$1.tag;
				else state.tag = "?";
				if (type$1.represent) {
					style = state.styleMap[type$1.tag] || type$1.defaultStyle;
					if (_toString.call(type$1.represent) === "[object Function]") _result = type$1.represent(object, style);
					else if (_hasOwnProperty.call(type$1.represent, style)) _result = type$1.represent[style](object, style);
					else throw new YAMLException("!<" + type$1.tag + "> tag resolver accepts not \"" + style + "\" style");
					state.dump = _result;
				}
				return true;
			}
		}
		return false;
	}
	function writeNode(state, level, object, block, compact, iskey, isblockseq) {
		state.tag = null;
		state.dump = object;
		if (!detectType(state, object, false)) detectType(state, object, true);
		var type$1 = _toString.call(state.dump);
		var inblock = block;
		var tagStr;
		if (block) block = state.flowLevel < 0 || state.flowLevel > level;
		var objectOrArray = type$1 === "[object Object]" || type$1 === "[object Array]", duplicateIndex, duplicate;
		if (objectOrArray) {
			duplicateIndex = state.duplicates.indexOf(object);
			duplicate = duplicateIndex !== -1;
		}
		if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) compact = false;
		if (duplicate && state.usedDuplicates[duplicateIndex]) state.dump = "*ref_" + duplicateIndex;
		else {
			if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) state.usedDuplicates[duplicateIndex] = true;
			if (type$1 === "[object Object]") if (block && Object.keys(state.dump).length !== 0) {
				writeBlockMapping(state, level, state.dump, compact);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
			} else {
				writeFlowMapping(state, level, state.dump);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
			}
			else if (type$1 === "[object Array]") if (block && state.dump.length !== 0) {
				if (state.noArrayIndent && !isblockseq && level > 0) writeBlockSequence(state, level - 1, state.dump, compact);
				else writeBlockSequence(state, level, state.dump, compact);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + state.dump;
			} else {
				writeFlowSequence(state, level, state.dump);
				if (duplicate) state.dump = "&ref_" + duplicateIndex + " " + state.dump;
			}
			else if (type$1 === "[object String]") {
				if (state.tag !== "?") writeScalar(state, state.dump, level, iskey, inblock);
			} else if (type$1 === "[object Undefined]") return false;
			else {
				if (state.skipInvalid) return false;
				throw new YAMLException("unacceptable kind of an object to dump " + type$1);
			}
			if (state.tag !== null && state.tag !== "?") {
				tagStr = encodeURI(state.tag[0] === "!" ? state.tag.slice(1) : state.tag).replace(/!/g, "%21");
				if (state.tag[0] === "!") tagStr = "!" + tagStr;
				else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") tagStr = "!!" + tagStr.slice(18);
				else tagStr = "!<" + tagStr + ">";
				state.dump = tagStr + " " + state.dump;
			}
		}
		return true;
	}
	function getDuplicateReferences(object, state) {
		var objects = [], duplicatesIndexes = [], index, length;
		inspectNode(object, objects, duplicatesIndexes);
		for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) state.duplicates.push(objects[duplicatesIndexes[index]]);
		state.usedDuplicates = new Array(length);
	}
	function inspectNode(object, objects, duplicatesIndexes) {
		var objectKeyList, index, length;
		if (object !== null && typeof object === "object") {
			index = objects.indexOf(object);
			if (index !== -1) {
				if (duplicatesIndexes.indexOf(index) === -1) duplicatesIndexes.push(index);
			} else {
				objects.push(object);
				if (Array.isArray(object)) for (index = 0, length = object.length; index < length; index += 1) inspectNode(object[index], objects, duplicatesIndexes);
				else {
					objectKeyList = Object.keys(object);
					for (index = 0, length = objectKeyList.length; index < length; index += 1) inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
				}
			}
		}
	}
	function dump(input, options$1) {
		options$1 = options$1 || {};
		var state = new State(options$1);
		if (!state.noRefs) getDuplicateReferences(input, state);
		var value = input;
		if (state.replacer) value = state.replacer.call({ "": value }, "", value);
		if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
		return "";
	}
	module.exports.dump = dump;
}));
var require_js_yaml = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var loader = require_loader();
	var dumper = require_dumper();
	function renamed(from, to) {
		return function() {
			throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
		};
	}
	module.exports.Type = require_type$1();
	module.exports.Schema = require_schema();
	module.exports.FAILSAFE_SCHEMA = require_failsafe();
	module.exports.JSON_SCHEMA = require_json();
	module.exports.CORE_SCHEMA = require_core();
	module.exports.DEFAULT_SCHEMA = require_default();
	module.exports.load = loader.load;
	module.exports.loadAll = loader.loadAll;
	module.exports.dump = dumper.dump;
	module.exports.YAMLException = require_exception();
	module.exports.types = {
		binary: require_binary(),
		float: require_float(),
		map: require_map(),
		null: require_null(),
		pairs: require_pairs(),
		set: require_set(),
		timestamp: require_timestamp(),
		bool: require_bool(),
		int: require_int(),
		merge: require_merge(),
		omap: require_omap(),
		seq: require_seq(),
		str: require_str()
	};
	module.exports.safeLoad = renamed("safeLoad", "load");
	module.exports.safeLoadAll = renamed("safeLoadAll", "loadAll");
	module.exports.safeDump = renamed("safeDump", "dump");
}));
var require_main$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Lazy = class {
		constructor(creator) {
			this._value = null;
			this.creator = creator;
		}
		get hasValue() {
			return this.creator == null;
		}
		get value() {
			if (this.creator == null) return this._value;
			const result = this.creator();
			this.value = result;
			return result;
		}
		set value(value) {
			this._value = value;
			this.creator = null;
		}
	};
	exports.Lazy = Lazy;
}));
var require_lodash$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var HASH_UNDEFINED = "__lodash_hash_undefined__";
	var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
	var MAX_SAFE_INTEGER = 9007199254740991, argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag$1 = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
	var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
	var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	var freeGlobal$1 = typeof global == "object" && global && global.Object === Object && global;
	var freeSelf$1 = typeof self == "object" && self && self.Object === Object && self;
	var root$1 = freeGlobal$1 || freeSelf$1 || Function("return this")();
	var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
	var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
	var moduleExports = freeModule && freeModule.exports === freeExports;
	var freeProcess = moduleExports && freeGlobal$1.process;
	var nodeUtil = function() {
		try {
			return freeProcess && freeProcess.binding && freeProcess.binding("util");
		} catch (e) {}
	}();
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
	function arrayFilter(array, predicate) {
		var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
		while (++index < length) {
			var value = array[index];
			if (predicate(value, index, array)) result[resIndex++] = value;
		}
		return result;
	}
	function arrayPush(array, values) {
		var index = -1, length = values.length, offset = array.length;
		while (++index < length) array[offset + index] = values[index];
		return array;
	}
	function arraySome(array, predicate) {
		var index = -1, length = array == null ? 0 : array.length;
		while (++index < length) if (predicate(array[index], index, array)) return true;
		return false;
	}
	function baseTimes(n, iteratee) {
		var index = -1, result = Array(n);
		while (++index < n) result[index] = iteratee(index);
		return result;
	}
	function baseUnary(func) {
		return function(value) {
			return func(value);
		};
	}
	function cacheHas(cache$1, key) {
		return cache$1.has(key);
	}
	function getValue(object, key) {
		return object == null ? void 0 : object[key];
	}
	function mapToArray(map) {
		var index = -1, result = Array(map.size);
		map.forEach(function(value, key) {
			result[++index] = [key, value];
		});
		return result;
	}
	function overArg(func, transform) {
		return function(arg) {
			return func(transform(arg));
		};
	}
	function setToArray(set$1) {
		var index = -1, result = Array(set$1.size);
		set$1.forEach(function(value) {
			result[++index] = value;
		});
		return result;
	}
	var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
	var coreJsData = root$1["__core-js_shared__"];
	var funcToString = funcProto.toString;
	var hasOwnProperty$1 = objectProto.hasOwnProperty;
	var maskSrcKey = function() {
		var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
		return uid ? "Symbol(src)_1." + uid : "";
	}();
	var nativeObjectToString = objectProto.toString;
	var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$1).replace(reRegExpChar$1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	var Buffer$1 = moduleExports ? root$1.Buffer : void 0, Symbol$2 = root$1.Symbol, Uint8Array$1 = root$1.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
	var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
	var DataView = getNative(root$1, "DataView"), Map$1 = getNative(root$1, "Map"), Promise$1 = getNative(root$1, "Promise"), Set$1 = getNative(root$1, "Set"), WeakMap$1 = getNative(root$1, "WeakMap"), nativeCreate = getNative(Object, "create");
	var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
	var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
	function Hash(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	function hashClear() {
		this.__data__ = nativeCreate ? nativeCreate(null) : {};
		this.size = 0;
	}
	function hashDelete(key) {
		var result = this.has(key) && delete this.__data__[key];
		this.size -= result ? 1 : 0;
		return result;
	}
	function hashGet(key) {
		var data = this.__data__;
		if (nativeCreate) {
			var result = data[key];
			return result === "__lodash_hash_undefined__" ? void 0 : result;
		}
		return hasOwnProperty$1.call(data, key) ? data[key] : void 0;
	}
	function hashHas(key) {
		var data = this.__data__;
		return nativeCreate ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
	}
	function hashSet(key, value) {
		var data = this.__data__;
		this.size += this.has(key) ? 0 : 1;
		data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
		return this;
	}
	Hash.prototype.clear = hashClear;
	Hash.prototype["delete"] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	function ListCache(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	function listCacheClear() {
		this.__data__ = [];
		this.size = 0;
	}
	function listCacheDelete(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) return false;
		var lastIndex = data.length - 1;
		if (index == lastIndex) data.pop();
		else splice.call(data, index, 1);
		--this.size;
		return true;
	}
	function listCacheGet(key) {
		var data = this.__data__, index = assocIndexOf(data, key);
		return index < 0 ? void 0 : data[index][1];
	}
	function listCacheHas(key) {
		return assocIndexOf(this.__data__, key) > -1;
	}
	function listCacheSet(key, value) {
		var data = this.__data__, index = assocIndexOf(data, key);
		if (index < 0) {
			++this.size;
			data.push([key, value]);
		} else data[index][1] = value;
		return this;
	}
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype["delete"] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	function MapCache(entries) {
		var index = -1, length = entries == null ? 0 : entries.length;
		this.clear();
		while (++index < length) {
			var entry = entries[index];
			this.set(entry[0], entry[1]);
		}
	}
	function mapCacheClear() {
		this.size = 0;
		this.__data__ = {
			"hash": new Hash(),
			"map": new (Map$1 || ListCache)(),
			"string": new Hash()
		};
	}
	function mapCacheDelete(key) {
		var result = getMapData(this, key)["delete"](key);
		this.size -= result ? 1 : 0;
		return result;
	}
	function mapCacheGet(key) {
		return getMapData(this, key).get(key);
	}
	function mapCacheHas(key) {
		return getMapData(this, key).has(key);
	}
	function mapCacheSet(key, value) {
		var data = getMapData(this, key), size = data.size;
		data.set(key, value);
		this.size += data.size == size ? 0 : 1;
		return this;
	}
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype["delete"] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	function SetCache(values) {
		var index = -1, length = values == null ? 0 : values.length;
		this.__data__ = new MapCache();
		while (++index < length) this.add(values[index]);
	}
	function setCacheAdd(value) {
		this.__data__.set(value, HASH_UNDEFINED);
		return this;
	}
	function setCacheHas(value) {
		return this.__data__.has(value);
	}
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	function Stack(entries) {
		this.size = (this.__data__ = new ListCache(entries)).size;
	}
	function stackClear() {
		this.__data__ = new ListCache();
		this.size = 0;
	}
	function stackDelete(key) {
		var data = this.__data__, result = data["delete"](key);
		this.size = data.size;
		return result;
	}
	function stackGet(key) {
		return this.__data__.get(key);
	}
	function stackHas(key) {
		return this.__data__.has(key);
	}
	function stackSet(key, value) {
		var data = this.__data__;
		if (data instanceof ListCache) {
			var pairs = data.__data__;
			if (!Map$1 || pairs.length < 199) {
				pairs.push([key, value]);
				this.size = ++data.size;
				return this;
			}
			data = this.__data__ = new MapCache(pairs);
		}
		data.set(key, value);
		this.size = data.size;
		return this;
	}
	Stack.prototype.clear = stackClear;
	Stack.prototype["delete"] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	function arrayLikeKeys(value, inherited) {
		var isArr = isArray$1(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
		for (var key in value) if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
		return result;
	}
	function assocIndexOf(array, key) {
		var length = array.length;
		while (length--) if (eq(array[length][0], key)) return length;
		return -1;
	}
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		var result = keysFunc(object);
		return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
	}
	function baseGetTag(value) {
		if (value == null) return value === void 0 ? undefinedTag : nullTag;
		return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
	}
	function baseIsArguments(value) {
		return isObjectLike$1(value) && baseGetTag(value) == "[object Arguments]";
	}
	function baseIsEqual(value, other, bitmask, customizer, stack) {
		if (value === other) return true;
		if (value == null || other == null || !isObjectLike$1(value) && !isObjectLike$1(other)) return value !== value && other !== other;
		return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
		var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
		objTag = objTag == "[object Arguments]" ? objectTag : objTag;
		othTag = othTag == "[object Arguments]" ? objectTag : othTag;
		var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
		if (isSameTag && isBuffer(object)) {
			if (!isBuffer(other)) return false;
			objIsArr = true;
			objIsObj = false;
		}
		if (isSameTag && !objIsObj) {
			stack || (stack = new Stack());
			return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
		}
		if (!(bitmask & 1)) {
			var objIsWrapped = objIsObj && hasOwnProperty$1.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$1.call(other, "__wrapped__");
			if (objIsWrapped || othIsWrapped) {
				var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
				stack || (stack = new Stack());
				return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
			}
		}
		if (!isSameTag) return false;
		stack || (stack = new Stack());
		return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}
	function baseIsNative(value) {
		if (!isObject(value) || isMasked(value)) return false;
		return (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
	}
	function baseIsTypedArray(value) {
		return isObjectLike$1(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}
	function baseKeys(object) {
		if (!isPrototype(object)) return nativeKeys(object);
		var result = [];
		for (var key in Object(object)) if (hasOwnProperty$1.call(object, key) && key != "constructor") result.push(key);
		return result;
	}
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
		var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
		if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
		var stacked = stack.get(array);
		if (stacked && stack.get(other)) return stacked == other;
		var index = -1, result = true, seen = bitmask & 2 ? new SetCache() : void 0;
		stack.set(array, other);
		stack.set(other, array);
		while (++index < arrLength) {
			var arrValue = array[index], othValue = other[index];
			if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
			if (compared !== void 0) {
				if (compared) continue;
				result = false;
				break;
			}
			if (seen) {
				if (!arraySome(other, function(othValue$1, othIndex) {
					if (!cacheHas(seen, othIndex) && (arrValue === othValue$1 || equalFunc(arrValue, othValue$1, bitmask, customizer, stack))) return seen.push(othIndex);
				})) {
					result = false;
					break;
				}
			} else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
				result = false;
				break;
			}
		}
		stack["delete"](array);
		stack["delete"](other);
		return result;
	}
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
		switch (tag) {
			case dataViewTag:
				if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
				object = object.buffer;
				other = other.buffer;
			case arrayBufferTag:
				if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) return false;
				return true;
			case boolTag:
			case dateTag:
			case numberTag: return eq(+object, +other);
			case errorTag: return object.name == other.name && object.message == other.message;
			case regexpTag:
			case stringTag: return object == other + "";
			case mapTag: var convert = mapToArray;
			case setTag:
				var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
				convert || (convert = setToArray);
				if (object.size != other.size && !isPartial) return false;
				var stacked = stack.get(object);
				if (stacked) return stacked == other;
				bitmask |= COMPARE_UNORDERED_FLAG;
				stack.set(object, other);
				var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
				stack["delete"](object);
				return result;
			case symbolTag$1: if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
		}
		return false;
	}
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
		var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
		if (objLength != othLength && !isPartial) return false;
		var index = objLength;
		while (index--) {
			var key = objProps[index];
			if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) return false;
		}
		var stacked = stack.get(object);
		if (stacked && stack.get(other)) return stacked == other;
		var result = true;
		stack.set(object, other);
		stack.set(other, object);
		var skipCtor = isPartial;
		while (++index < objLength) {
			key = objProps[index];
			var objValue = object[key], othValue = other[key];
			if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
			if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
				result = false;
				break;
			}
			skipCtor || (skipCtor = key == "constructor");
		}
		if (result && !skipCtor) {
			var objCtor = object.constructor, othCtor = other.constructor;
			if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
		}
		stack["delete"](object);
		stack["delete"](other);
		return result;
	}
	function getAllKeys(object) {
		return baseGetAllKeys(object, keys$1, getSymbols);
	}
	function getMapData(map, key) {
		var data = map.__data__;
		return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
	}
	function getNative(object, key) {
		var value = getValue(object, key);
		return baseIsNative(value) ? value : void 0;
	}
	function getRawTag(value) {
		var isOwn = hasOwnProperty$1.call(value, symToStringTag), tag = value[symToStringTag];
		try {
			value[symToStringTag] = void 0;
			var unmasked = true;
		} catch (e) {}
		var result = nativeObjectToString.call(value);
		if (unmasked) if (isOwn) value[symToStringTag] = tag;
		else delete value[symToStringTag];
		return result;
	}
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
		if (object == null) return [];
		object = Object(object);
		return arrayFilter(nativeGetSymbols(object), function(symbol) {
			return propertyIsEnumerable.call(object, symbol);
		});
	};
	var getTag$1 = baseGetTag;
	if (DataView && getTag$1(new DataView(/* @__PURE__ */ new ArrayBuffer(1))) != "[object DataView]" || Map$1 && getTag$1(new Map$1()) != "[object Map]" || Promise$1 && getTag$1(Promise$1.resolve()) != "[object Promise]" || Set$1 && getTag$1(new Set$1()) != "[object Set]" || WeakMap$1 && getTag$1(new WeakMap$1()) != "[object WeakMap]") getTag$1 = function(value) {
		var result = baseGetTag(value), Ctor = result == "[object Object]" ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
		if (ctorString) switch (ctorString) {
			case dataViewCtorString: return dataViewTag;
			case mapCtorString: return mapTag;
			case promiseCtorString: return promiseTag;
			case setCtorString: return setTag;
			case weakMapCtorString: return weakMapTag;
		}
		return result;
	};
	function isIndex(value, length) {
		length = length == null ? MAX_SAFE_INTEGER : length;
		return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}
	function isKeyable(value) {
		var type$1 = typeof value;
		return type$1 == "string" || type$1 == "number" || type$1 == "symbol" || type$1 == "boolean" ? value !== "__proto__" : value === null;
	}
	function isMasked(func) {
		return !!maskSrcKey && maskSrcKey in func;
	}
	function isPrototype(value) {
		var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
		return value === proto;
	}
	function objectToString$1(value) {
		return nativeObjectToString.call(value);
	}
	function toSource(func) {
		if (func != null) {
			try {
				return funcToString.call(func);
			} catch (e) {}
			try {
				return func + "";
			} catch (e) {}
		}
		return "";
	}
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	var isArguments = baseIsArguments(function() {
		return arguments;
	}()) ? baseIsArguments : function(value) {
		return isObjectLike$1(value) && hasOwnProperty$1.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
	};
	var isArray$1 = Array.isArray;
	function isArrayLike(value) {
		return value != null && isLength(value.length) && !isFunction(value);
	}
	var isBuffer = nativeIsBuffer || stubFalse;
	function isEqual$1(value, other) {
		return baseIsEqual(value, other);
	}
	function isFunction(value) {
		if (!isObject(value)) return false;
		var tag = baseGetTag(value);
		return tag == "[object Function]" || tag == "[object GeneratorFunction]" || tag == "[object AsyncFunction]" || tag == "[object Proxy]";
	}
	function isLength(value) {
		return typeof value == "number" && value > -1 && value % 1 == 0 && value <= 9007199254740991;
	}
	function isObject(value) {
		var type$1 = typeof value;
		return value != null && (type$1 == "object" || type$1 == "function");
	}
	function isObjectLike$1(value) {
		return value != null && typeof value == "object";
	}
	var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
	function keys$1(object) {
		return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}
	function stubArray() {
		return [];
	}
	function stubFalse() {
		return false;
	}
	module.exports = isEqual$1;
}));
var require_DownloadedUpdateHelper = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createTempUpdateFile = createTempUpdateFile;
	var crypto_1$2 = __require("crypto");
	var fs_1$4 = __require("fs");
	var isEqual = require_lodash$1();
	var fs_extra_1$7 = require_lib$7();
	var path$11 = __require("path");
	var DownloadedUpdateHelper = class {
		constructor(cacheDir) {
			this.cacheDir = cacheDir;
			this._file = null;
			this._packageFile = null;
			this.versionInfo = null;
			this.fileInfo = null;
			this._downloadedFileInfo = null;
		}
		get downloadedFileInfo() {
			return this._downloadedFileInfo;
		}
		get file() {
			return this._file;
		}
		get packageFile() {
			return this._packageFile;
		}
		get cacheDirForPendingUpdate() {
			return path$11.join(this.cacheDir, "pending");
		}
		async validateDownloadedPath(updateFile, updateInfo, fileInfo, logger) {
			if (this.versionInfo != null && this.file === updateFile && this.fileInfo != null) if (isEqual(this.versionInfo, updateInfo) && isEqual(this.fileInfo.info, fileInfo.info) && await (0, fs_extra_1$7.pathExists)(updateFile)) return updateFile;
			else return null;
			const cachedUpdateFile = await this.getValidCachedUpdateFile(fileInfo, logger);
			if (cachedUpdateFile === null) return null;
			logger.info(`Update has already been downloaded to ${updateFile}).`);
			this._file = cachedUpdateFile;
			return cachedUpdateFile;
		}
		async setDownloadedFile(downloadedFile, packageFile, versionInfo, fileInfo, updateFileName, isSaveCache) {
			this._file = downloadedFile;
			this._packageFile = packageFile;
			this.versionInfo = versionInfo;
			this.fileInfo = fileInfo;
			this._downloadedFileInfo = {
				fileName: updateFileName,
				sha512: fileInfo.info.sha512,
				isAdminRightsRequired: fileInfo.info.isAdminRightsRequired === true
			};
			if (isSaveCache) await (0, fs_extra_1$7.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
		}
		async clear() {
			this._file = null;
			this._packageFile = null;
			this.versionInfo = null;
			this.fileInfo = null;
			await this.cleanCacheDirForPendingUpdate();
		}
		async cleanCacheDirForPendingUpdate() {
			try {
				await (0, fs_extra_1$7.emptyDir)(this.cacheDirForPendingUpdate);
			} catch (_ignore) {}
		}
		async getValidCachedUpdateFile(fileInfo, logger) {
			const updateInfoFilePath = this.getUpdateInfoFile();
			if (!await (0, fs_extra_1$7.pathExists)(updateInfoFilePath)) return null;
			let cachedInfo;
			try {
				cachedInfo = await (0, fs_extra_1$7.readJson)(updateInfoFilePath);
			} catch (error) {
				let message = `No cached update info available`;
				if (error.code !== "ENOENT") {
					await this.cleanCacheDirForPendingUpdate();
					message += ` (error on read: ${error.message})`;
				}
				logger.info(message);
				return null;
			}
			if (!((cachedInfo === null || cachedInfo === void 0 ? void 0 : cachedInfo.fileName) !== null)) {
				logger.warn(`Cached update info is corrupted: no fileName, directory for cached update will be cleaned`);
				await this.cleanCacheDirForPendingUpdate();
				return null;
			}
			if (fileInfo.info.sha512 !== cachedInfo.sha512) {
				logger.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${cachedInfo.sha512}, expected: ${fileInfo.info.sha512}. Directory for cached update will be cleaned`);
				await this.cleanCacheDirForPendingUpdate();
				return null;
			}
			const updateFile = path$11.join(this.cacheDirForPendingUpdate, cachedInfo.fileName);
			if (!await (0, fs_extra_1$7.pathExists)(updateFile)) {
				logger.info("Cached update file doesn't exist");
				return null;
			}
			const sha512 = await hashFile(updateFile);
			if (fileInfo.info.sha512 !== sha512) {
				logger.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${sha512}, expected: ${fileInfo.info.sha512}`);
				await this.cleanCacheDirForPendingUpdate();
				return null;
			}
			this._downloadedFileInfo = cachedInfo;
			return updateFile;
		}
		getUpdateInfoFile() {
			return path$11.join(this.cacheDirForPendingUpdate, "update-info.json");
		}
	};
	exports.DownloadedUpdateHelper = DownloadedUpdateHelper;
	function hashFile(file, algorithm = "sha512", encoding = "base64", options$1) {
		return new Promise((resolve, reject) => {
			const hash = (0, crypto_1$2.createHash)(algorithm);
			hash.on("error", reject).setEncoding(encoding);
			(0, fs_1$4.createReadStream)(file, {
				...options$1,
				highWaterMark: 1024 * 1024
			}).on("error", reject).on("end", () => {
				hash.end();
				resolve(hash.read());
			}).pipe(hash, { end: false });
		});
	}
	async function createTempUpdateFile(name$1, cacheDir, log) {
		let nameCounter = 0;
		let result = path$11.join(cacheDir, name$1);
		for (let i$1 = 0; i$1 < 3; i$1++) try {
			await (0, fs_extra_1$7.unlink)(result);
			return result;
		} catch (e) {
			if (e.code === "ENOENT") return result;
			log.warn(`Error on remove temp update file: ${e}`);
			result = path$11.join(cacheDir, `${nameCounter++}-${name$1}`);
		}
		return result;
	}
}));
var require_AppAdapter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getAppCacheDir = getAppCacheDir;
	var path$10 = __require("path");
	var os_1$1 = __require("os");
	function getAppCacheDir() {
		const homedir = (0, os_1$1.homedir)();
		let result;
		if (process.platform === "win32") result = process.env["LOCALAPPDATA"] || path$10.join(homedir, "AppData", "Local");
		else if (process.platform === "darwin") result = path$10.join(homedir, "Library", "Caches");
		else result = process.env["XDG_CACHE_HOME"] || path$10.join(homedir, ".cache");
		return result;
	}
}));
var require_ElectronAppAdapter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var path$9 = __require("path");
	var AppAdapter_1 = require_AppAdapter();
	var ElectronAppAdapter = class {
		constructor(app$1 = __require("electron").app) {
			this.app = app$1;
		}
		whenReady() {
			return this.app.whenReady();
		}
		get version() {
			return this.app.getVersion();
		}
		get name() {
			return this.app.getName();
		}
		get isPackaged() {
			return this.app.isPackaged === true;
		}
		get appUpdateConfigPath() {
			return this.isPackaged ? path$9.join(process.resourcesPath, "app-update.yml") : path$9.join(this.app.getAppPath(), "dev-app-update.yml");
		}
		get userDataPath() {
			return this.app.getPath("userData");
		}
		get baseCachePath() {
			return (0, AppAdapter_1.getAppCacheDir)();
		}
		quit() {
			this.app.quit();
		}
		relaunch() {
			this.app.relaunch();
		}
		onQuit(handler) {
			this.app.once("quit", (_, exitCode) => handler(exitCode));
		}
	};
	exports.ElectronAppAdapter = ElectronAppAdapter;
}));
var require_electronHttpExecutor = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getNetSession = getNetSession;
	var builder_util_runtime_1$16 = require_out();
	exports.NET_SESSION_NAME = "electron-updater";
	function getNetSession() {
		return __require("electron").session.fromPartition(exports.NET_SESSION_NAME, { cache: false });
	}
	var ElectronHttpExecutor = class extends builder_util_runtime_1$16.HttpExecutor {
		constructor(proxyLoginCallback) {
			super();
			this.proxyLoginCallback = proxyLoginCallback;
			this.cachedSession = null;
		}
		async download(url$1, destination, options$1) {
			return await options$1.cancellationToken.createPromise((resolve, reject, onCancel) => {
				const requestOptions = {
					headers: options$1.headers || void 0,
					redirect: "manual"
				};
				(0, builder_util_runtime_1$16.configureRequestUrl)(url$1, requestOptions);
				(0, builder_util_runtime_1$16.configureRequestOptions)(requestOptions);
				this.doDownload(requestOptions, {
					destination,
					options: options$1,
					onCancel,
					callback: (error) => {
						if (error == null) resolve(destination);
						else reject(error);
					},
					responseHandler: null
				}, 0);
			});
		}
		createRequest(options$1, callback) {
			if (options$1.headers && options$1.headers.Host) {
				options$1.host = options$1.headers.Host;
				delete options$1.headers.Host;
			}
			if (this.cachedSession == null) this.cachedSession = getNetSession();
			const request = __require("electron").net.request({
				...options$1,
				session: this.cachedSession
			});
			request.on("response", callback);
			if (this.proxyLoginCallback != null) request.on("login", this.proxyLoginCallback);
			return request;
		}
		addRedirectHandlers(request, options$1, reject, redirectCount, handler) {
			request.on("redirect", (statusCode, method, redirectUrl) => {
				request.abort();
				if (redirectCount > this.maxRedirects) reject(this.createMaxRedirectError());
				else handler(builder_util_runtime_1$16.HttpExecutor.prepareRedirectUrlOptions(redirectUrl, options$1));
			});
		}
	};
	exports.ElectronHttpExecutor = ElectronHttpExecutor;
}));
var require_lodash = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
	var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
	var freeSelf = typeof self == "object" && self && self.Object === Object && self;
	var root = freeGlobal || freeSelf || Function("return this")();
	var objectToString = Object.prototype.toString;
	var Symbol$1 = root.Symbol;
	var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
	function baseToString(value) {
		if (typeof value == "string") return value;
		if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
		var result = value + "";
		return result == "0" && 1 / value == -Infinity ? "-0" : result;
	}
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	function isSymbol(value) {
		return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == "[object Symbol]";
	}
	function toString(value) {
		return value == null ? "" : baseToString(value);
	}
	function escapeRegExp$1(string) {
		string = toString(string);
		return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
	}
	module.exports = escapeRegExp$1;
}));
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.newBaseUrl = newBaseUrl;
	exports.newUrlFromBase = newUrlFromBase;
	exports.getChannelFilename = getChannelFilename;
	exports.blockmapFiles = blockmapFiles;
	var url_1$4 = __require("url");
	var escapeRegExp = require_lodash();
	function newBaseUrl(url$1) {
		const result = new url_1$4.URL(url$1);
		if (!result.pathname.endsWith("/")) result.pathname += "/";
		return result;
	}
	function newUrlFromBase(pathname, baseUrl, addRandomQueryToAvoidCaching = false) {
		const result = new url_1$4.URL(pathname, baseUrl);
		const search = baseUrl.search;
		if (search != null && search.length !== 0) result.search = search;
		else if (addRandomQueryToAvoidCaching) result.search = `noCache=${Date.now().toString(32)}`;
		return result;
	}
	function getChannelFilename(channel) {
		return `${channel}.yml`;
	}
	function blockmapFiles(baseUrl, oldVersion, newVersion) {
		const newBlockMapUrl = newUrlFromBase(`${baseUrl.pathname}.blockmap`, baseUrl);
		return [newUrlFromBase(`${baseUrl.pathname.replace(new RegExp(escapeRegExp(newVersion), "g"), oldVersion)}.blockmap`, baseUrl), newBlockMapUrl];
	}
}));
var require_Provider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.findFile = findFile;
	exports.parseUpdateInfo = parseUpdateInfo;
	exports.getFileList = getFileList;
	exports.resolveFiles = resolveFiles;
	var builder_util_runtime_1$15 = require_out();
	var js_yaml_1$2 = require_js_yaml();
	var util_1$6 = require_util();
	var Provider = class {
		constructor(runtimeOptions) {
			this.runtimeOptions = runtimeOptions;
			this.requestHeaders = null;
			this.executor = runtimeOptions.executor;
		}
		get isUseMultipleRangeRequest() {
			return this.runtimeOptions.isUseMultipleRangeRequest !== false;
		}
		getChannelFilePrefix() {
			if (this.runtimeOptions.platform === "linux") {
				const arch = process.env["TEST_UPDATER_ARCH"] || process.arch;
				return "-linux" + (arch === "x64" ? "" : `-${arch}`);
			} else return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
		}
		getDefaultChannelName() {
			return this.getCustomChannelName("latest");
		}
		getCustomChannelName(channel) {
			return `${channel}${this.getChannelFilePrefix()}`;
		}
		get fileExtraDownloadHeaders() {
			return null;
		}
		setRequestHeaders(value) {
			this.requestHeaders = value;
		}
		httpRequest(url$1, headers, cancellationToken) {
			return this.executor.request(this.createRequestOptions(url$1, headers), cancellationToken);
		}
		createRequestOptions(url$1, headers) {
			const result = {};
			if (this.requestHeaders == null) {
				if (headers != null) result.headers = headers;
			} else result.headers = headers == null ? this.requestHeaders : {
				...this.requestHeaders,
				...headers
			};
			(0, builder_util_runtime_1$15.configureRequestUrl)(url$1, result);
			return result;
		}
	};
	exports.Provider = Provider;
	function findFile(files, extension, not) {
		if (files.length === 0) throw (0, builder_util_runtime_1$15.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
		const result = files.find((it) => it.url.pathname.toLowerCase().endsWith(`.${extension}`));
		if (result != null) return result;
		else if (not == null) return files[0];
		else return files.find((fileInfo) => !not.some((ext) => fileInfo.url.pathname.toLowerCase().endsWith(`.${ext}`)));
	}
	function parseUpdateInfo(rawData, channelFile, channelFileUrl) {
		if (rawData == null) throw (0, builder_util_runtime_1$15.newError)(`Cannot parse update info from ${channelFile} in the latest release artifacts (${channelFileUrl}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
		let result;
		try {
			result = (0, js_yaml_1$2.load)(rawData);
		} catch (e) {
			throw (0, builder_util_runtime_1$15.newError)(`Cannot parse update info from ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}, rawData: ${rawData}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
		}
		return result;
	}
	function getFileList(updateInfo) {
		const files = updateInfo.files;
		if (files != null && files.length > 0) return files;
		if (updateInfo.path != null) return [{
			url: updateInfo.path,
			sha2: updateInfo.sha2,
			sha512: updateInfo.sha512
		}];
		else throw (0, builder_util_runtime_1$15.newError)(`No files provided: ${(0, builder_util_runtime_1$15.safeStringifyJson)(updateInfo)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
	}
	function resolveFiles(updateInfo, baseUrl, pathTransformer = (p) => p) {
		const result = getFileList(updateInfo).map((fileInfo) => {
			if (fileInfo.sha2 == null && fileInfo.sha512 == null) throw (0, builder_util_runtime_1$15.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, builder_util_runtime_1$15.safeStringifyJson)(fileInfo)}`, "ERR_UPDATER_NO_CHECKSUM");
			return {
				url: (0, util_1$6.newUrlFromBase)(pathTransformer(fileInfo.url), baseUrl),
				info: fileInfo
			};
		});
		const packages = updateInfo.packages;
		const packageInfo = packages == null ? null : packages[process.arch] || packages.ia32;
		if (packageInfo != null) result[0].packageInfo = {
			...packageInfo,
			path: (0, util_1$6.newUrlFromBase)(pathTransformer(packageInfo.path), baseUrl).href
		};
		return result;
	}
}));
var require_GenericProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$14 = require_out();
	var util_1$5 = require_util();
	var Provider_1$11 = require_Provider();
	var GenericProvider = class extends Provider_1$11.Provider {
		constructor(configuration, updater, runtimeOptions) {
			super(runtimeOptions);
			this.configuration = configuration;
			this.updater = updater;
			this.baseUrl = (0, util_1$5.newBaseUrl)(this.configuration.url);
		}
		get channel() {
			const result = this.updater.channel || this.configuration.channel;
			return result == null ? this.getDefaultChannelName() : this.getCustomChannelName(result);
		}
		async getLatestVersion() {
			const channelFile = (0, util_1$5.getChannelFilename)(this.channel);
			const channelUrl = (0, util_1$5.newUrlFromBase)(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
			for (let attemptNumber = 0;; attemptNumber++) try {
				return (0, Provider_1$11.parseUpdateInfo)(await this.httpRequest(channelUrl), channelFile, channelUrl);
			} catch (e) {
				if (e instanceof builder_util_runtime_1$14.HttpError && e.statusCode === 404) throw (0, builder_util_runtime_1$14.newError)(`Cannot find channel "${channelFile}" update info: ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
				else if (e.code === "ECONNREFUSED") {
					if (attemptNumber < 3) {
						await new Promise((resolve, reject) => {
							try {
								setTimeout(resolve, 1e3 * attemptNumber);
							} catch (e$1) {
								reject(e$1);
							}
						});
						continue;
					}
				}
				throw e;
			}
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1$11.resolveFiles)(updateInfo, this.baseUrl);
		}
	};
	exports.GenericProvider = GenericProvider;
}));
var require_BitbucketProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$13 = require_out();
	var util_1$4 = require_util();
	var Provider_1$10 = require_Provider();
	var BitbucketProvider = class extends Provider_1$10.Provider {
		constructor(configuration, updater, runtimeOptions) {
			super({
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			this.configuration = configuration;
			this.updater = updater;
			const { owner, slug } = configuration;
			this.baseUrl = (0, util_1$4.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${owner}/${slug}/downloads`);
		}
		get channel() {
			return this.updater.channel || this.configuration.channel || "latest";
		}
		async getLatestVersion() {
			const cancellationToken = new builder_util_runtime_1$13.CancellationToken();
			const channelFile = (0, util_1$4.getChannelFilename)(this.getCustomChannelName(this.channel));
			const channelUrl = (0, util_1$4.newUrlFromBase)(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
			try {
				const updateInfo = await this.httpRequest(channelUrl, void 0, cancellationToken);
				return (0, Provider_1$10.parseUpdateInfo)(updateInfo, channelFile, channelUrl);
			} catch (e) {
				throw (0, builder_util_runtime_1$13.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1$10.resolveFiles)(updateInfo, this.baseUrl);
		}
		toString() {
			const { owner, slug } = this.configuration;
			return `Bitbucket (owner: ${owner}, slug: ${slug}, channel: ${this.channel})`;
		}
	};
	exports.BitbucketProvider = BitbucketProvider;
}));
var require_GitHubProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.computeReleaseNotes = computeReleaseNotes;
	var builder_util_runtime_1$12 = require_out();
	var semver = require_semver();
	var url_1$3 = __require("url");
	var util_1$3 = require_util();
	var Provider_1$9 = require_Provider();
	var hrefRegExp = /\/tag\/([^/]+)$/;
	var BaseGitHubProvider = class extends Provider_1$9.Provider {
		constructor(options$1, defaultHost, runtimeOptions) {
			super({
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			this.options = options$1;
			this.baseUrl = (0, util_1$3.newBaseUrl)((0, builder_util_runtime_1$12.githubUrl)(options$1, defaultHost));
			const apiHost = defaultHost === "github.com" ? "api.github.com" : defaultHost;
			this.baseApiUrl = (0, util_1$3.newBaseUrl)((0, builder_util_runtime_1$12.githubUrl)(options$1, apiHost));
		}
		computeGithubBasePath(result) {
			const host = this.options.host;
			return host && !["github.com", "api.github.com"].includes(host) ? `/api/v3${result}` : result;
		}
	};
	exports.BaseGitHubProvider = BaseGitHubProvider;
	var GitHubProvider = class extends BaseGitHubProvider {
		constructor(options$1, updater, runtimeOptions) {
			super(options$1, "github.com", runtimeOptions);
			this.options = options$1;
			this.updater = updater;
		}
		get channel() {
			const result = this.updater.channel || this.options.channel;
			return result == null ? this.getDefaultChannelName() : this.getCustomChannelName(result);
		}
		async getLatestVersion() {
			var _a$1, _b, _c, _d, _e;
			const cancellationToken = new builder_util_runtime_1$12.CancellationToken();
			const feedXml = await this.httpRequest((0, util_1$3.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), { accept: "application/xml, application/atom+xml, text/xml, */*" }, cancellationToken);
			const feed = (0, builder_util_runtime_1$12.parseXml)(feedXml);
			let latestRelease = feed.element("entry", false, `No published versions on GitHub`);
			let tag = null;
			try {
				if (this.updater.allowPrerelease) {
					const currentChannel = ((_a$1 = this.updater) === null || _a$1 === void 0 ? void 0 : _a$1.channel) || ((_b = semver.prerelease(this.updater.currentVersion)) === null || _b === void 0 ? void 0 : _b[0]) || null;
					if (currentChannel === null) tag = hrefRegExp.exec(latestRelease.element("link").attribute("href"))[1];
					else for (const element of feed.getElements("entry")) {
						const hrefElement = hrefRegExp.exec(element.element("link").attribute("href"));
						if (hrefElement === null) continue;
						const hrefTag = hrefElement[1];
						const hrefChannel = ((_c = semver.prerelease(hrefTag)) === null || _c === void 0 ? void 0 : _c[0]) || null;
						const shouldFetchVersion = !currentChannel || ["alpha", "beta"].includes(currentChannel);
						const isCustomChannel = hrefChannel !== null && !["alpha", "beta"].includes(String(hrefChannel));
						if (shouldFetchVersion && !isCustomChannel && !(currentChannel === "beta" && hrefChannel === "alpha")) {
							tag = hrefTag;
							break;
						}
						if (hrefChannel && hrefChannel === currentChannel) {
							tag = hrefTag;
							break;
						}
					}
				} else {
					tag = await this.getLatestTagName(cancellationToken);
					for (const element of feed.getElements("entry")) if (hrefRegExp.exec(element.element("link").attribute("href"))[1] === tag) {
						latestRelease = element;
						break;
					}
				}
			} catch (e) {
				throw (0, builder_util_runtime_1$12.newError)(`Cannot parse releases feed: ${e.stack || e.message},\nXML:\n${feedXml}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
			}
			if (tag == null) throw (0, builder_util_runtime_1$12.newError)(`No published versions on GitHub`, "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
			let rawData;
			let channelFile = "";
			let channelFileUrl = "";
			const fetchData = async (channelName) => {
				channelFile = (0, util_1$3.getChannelFilename)(channelName);
				channelFileUrl = (0, util_1$3.newUrlFromBase)(this.getBaseDownloadPath(String(tag), channelFile), this.baseUrl);
				const requestOptions = this.createRequestOptions(channelFileUrl);
				try {
					return await this.executor.request(requestOptions, cancellationToken);
				} catch (e) {
					if (e instanceof builder_util_runtime_1$12.HttpError && e.statusCode === 404) throw (0, builder_util_runtime_1$12.newError)(`Cannot find ${channelFile} in the latest release artifacts (${channelFileUrl}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
					throw e;
				}
			};
			try {
				let channel = this.channel;
				if (this.updater.allowPrerelease && ((_d = semver.prerelease(tag)) === null || _d === void 0 ? void 0 : _d[0])) channel = this.getCustomChannelName(String((_e = semver.prerelease(tag)) === null || _e === void 0 ? void 0 : _e[0]));
				rawData = await fetchData(channel);
			} catch (e) {
				if (this.updater.allowPrerelease) rawData = await fetchData(this.getDefaultChannelName());
				else throw e;
			}
			const result = (0, Provider_1$9.parseUpdateInfo)(rawData, channelFile, channelFileUrl);
			if (result.releaseName == null) result.releaseName = latestRelease.elementValueOrEmpty("title");
			if (result.releaseNotes == null) result.releaseNotes = computeReleaseNotes(this.updater.currentVersion, this.updater.fullChangelog, feed, latestRelease);
			return {
				tag,
				...result
			};
		}
		async getLatestTagName(cancellationToken) {
			const options$1 = this.options;
			const url$1 = options$1.host == null || options$1.host === "github.com" ? (0, util_1$3.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new url_1$3.URL(`${this.computeGithubBasePath(`/repos/${options$1.owner}/${options$1.repo}/releases`)}/latest`, this.baseApiUrl);
			try {
				const rawData = await this.httpRequest(url$1, { Accept: "application/json" }, cancellationToken);
				if (rawData == null) return null;
				return JSON.parse(rawData).tag_name;
			} catch (e) {
				throw (0, builder_util_runtime_1$12.newError)(`Unable to find latest version on GitHub (${url$1}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		get basePath() {
			return `/${this.options.owner}/${this.options.repo}/releases`;
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1$9.resolveFiles)(updateInfo, this.baseUrl, (p) => this.getBaseDownloadPath(updateInfo.tag, p.replace(/ /g, "-")));
		}
		getBaseDownloadPath(tag, fileName) {
			return `${this.basePath}/download/${tag}/${fileName}`;
		}
	};
	exports.GitHubProvider = GitHubProvider;
	function getNoteValue(parent) {
		const result = parent.elementValueOrEmpty("content");
		return result === "No content." ? "" : result;
	}
	function computeReleaseNotes(currentVersion, isFullChangelog, feed, latestRelease) {
		if (!isFullChangelog) return getNoteValue(latestRelease);
		const releaseNotes = [];
		for (const release of feed.getElements("entry")) {
			const versionRelease = /\/tag\/v?([^/]+)$/.exec(release.element("link").attribute("href"))[1];
			if (semver.lt(currentVersion, versionRelease)) releaseNotes.push({
				version: versionRelease,
				note: getNoteValue(release)
			});
		}
		return releaseNotes.sort((a, b) => semver.rcompare(a.version, b.version));
	}
}));
var require_KeygenProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$11 = require_out();
	var util_1$2 = require_util();
	var Provider_1$8 = require_Provider();
	var KeygenProvider = class extends Provider_1$8.Provider {
		constructor(configuration, updater, runtimeOptions) {
			super({
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			this.configuration = configuration;
			this.updater = updater;
			this.defaultHostname = "api.keygen.sh";
			const host = this.configuration.host || this.defaultHostname;
			this.baseUrl = (0, util_1$2.newBaseUrl)(`https://${host}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
		}
		get channel() {
			return this.updater.channel || this.configuration.channel || "stable";
		}
		async getLatestVersion() {
			const cancellationToken = new builder_util_runtime_1$11.CancellationToken();
			const channelFile = (0, util_1$2.getChannelFilename)(this.getCustomChannelName(this.channel));
			const channelUrl = (0, util_1$2.newUrlFromBase)(channelFile, this.baseUrl, this.updater.isAddNoCacheQuery);
			try {
				const updateInfo = await this.httpRequest(channelUrl, {
					Accept: "application/vnd.api+json",
					"Keygen-Version": "1.1"
				}, cancellationToken);
				return (0, Provider_1$8.parseUpdateInfo)(updateInfo, channelFile, channelUrl);
			} catch (e) {
				throw (0, builder_util_runtime_1$11.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1$8.resolveFiles)(updateInfo, this.baseUrl);
		}
		toString() {
			const { account, product, platform: platform$1 } = this.configuration;
			return `Keygen (account: ${account}, product: ${product}, platform: ${platform$1}, channel: ${this.channel})`;
		}
	};
	exports.KeygenProvider = KeygenProvider;
}));
var require_PrivateGitHubProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$10 = require_out();
	var js_yaml_1$1 = require_js_yaml();
	var path$8 = __require("path");
	var url_1$2 = __require("url");
	var util_1$1 = require_util();
	var GitHubProvider_1$1 = require_GitHubProvider();
	var Provider_1$7 = require_Provider();
	var PrivateGitHubProvider = class extends GitHubProvider_1$1.BaseGitHubProvider {
		constructor(options$1, updater, token, runtimeOptions) {
			super(options$1, "api.github.com", runtimeOptions);
			this.updater = updater;
			this.token = token;
		}
		createRequestOptions(url$1, headers) {
			const result = super.createRequestOptions(url$1, headers);
			result.redirect = "manual";
			return result;
		}
		async getLatestVersion() {
			const cancellationToken = new builder_util_runtime_1$10.CancellationToken();
			const channelFile = (0, util_1$1.getChannelFilename)(this.getDefaultChannelName());
			const releaseInfo = await this.getLatestVersionInfo(cancellationToken);
			const asset = releaseInfo.assets.find((it) => it.name === channelFile);
			if (asset == null) throw (0, builder_util_runtime_1$10.newError)(`Cannot find ${channelFile} in the release ${releaseInfo.html_url || releaseInfo.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
			const url$1 = new url_1$2.URL(asset.url);
			let result;
			try {
				result = (0, js_yaml_1$1.load)(await this.httpRequest(url$1, this.configureHeaders("application/octet-stream"), cancellationToken));
			} catch (e) {
				if (e instanceof builder_util_runtime_1$10.HttpError && e.statusCode === 404) throw (0, builder_util_runtime_1$10.newError)(`Cannot find ${channelFile} in the latest release artifacts (${url$1}): ${e.stack || e.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
				throw e;
			}
			result.assets = releaseInfo.assets;
			return result;
		}
		get fileExtraDownloadHeaders() {
			return this.configureHeaders("application/octet-stream");
		}
		configureHeaders(accept) {
			return {
				accept,
				authorization: `token ${this.token}`
			};
		}
		async getLatestVersionInfo(cancellationToken) {
			const allowPrerelease = this.updater.allowPrerelease;
			let basePath = this.basePath;
			if (!allowPrerelease) basePath = `${basePath}/latest`;
			const url$1 = (0, util_1$1.newUrlFromBase)(basePath, this.baseUrl);
			try {
				const version$2 = JSON.parse(await this.httpRequest(url$1, this.configureHeaders("application/vnd.github.v3+json"), cancellationToken));
				if (allowPrerelease) return version$2.find((it) => it.prerelease) || version$2[0];
				else return version$2;
			} catch (e) {
				throw (0, builder_util_runtime_1$10.newError)(`Unable to find latest version on GitHub (${url$1}), please ensure a production release exists: ${e.stack || e.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
			}
		}
		get basePath() {
			return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
		}
		resolveFiles(updateInfo) {
			return (0, Provider_1$7.getFileList)(updateInfo).map((it) => {
				const name$1 = path$8.posix.basename(it.url).replace(/ /g, "-");
				const asset = updateInfo.assets.find((it$1) => it$1 != null && it$1.name === name$1);
				if (asset == null) throw (0, builder_util_runtime_1$10.newError)(`Cannot find asset "${name$1}" in: ${JSON.stringify(updateInfo.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
				return {
					url: new url_1$2.URL(asset.url),
					info: it
				};
			});
		}
	};
	exports.PrivateGitHubProvider = PrivateGitHubProvider;
}));
var require_providerFactory = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isUrlProbablySupportMultiRangeRequests = isUrlProbablySupportMultiRangeRequests;
	exports.createClient = createClient;
	var builder_util_runtime_1$9 = require_out();
	var BitbucketProvider_1 = require_BitbucketProvider();
	var GenericProvider_1$1 = require_GenericProvider();
	var GitHubProvider_1 = require_GitHubProvider();
	var KeygenProvider_1 = require_KeygenProvider();
	var PrivateGitHubProvider_1 = require_PrivateGitHubProvider();
	function isUrlProbablySupportMultiRangeRequests(url$1) {
		return !url$1.includes("s3.amazonaws.com");
	}
	function createClient(data, updater, runtimeOptions) {
		if (typeof data === "string") throw (0, builder_util_runtime_1$9.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
		const provider = data.provider;
		switch (provider) {
			case "github": {
				const githubOptions = data;
				const token = (githubOptions.private ? process.env["GH_TOKEN"] || process.env["GITHUB_TOKEN"] : null) || githubOptions.token;
				if (token == null) return new GitHubProvider_1.GitHubProvider(githubOptions, updater, runtimeOptions);
				else return new PrivateGitHubProvider_1.PrivateGitHubProvider(githubOptions, updater, token, runtimeOptions);
			}
			case "bitbucket": return new BitbucketProvider_1.BitbucketProvider(data, updater, runtimeOptions);
			case "keygen": return new KeygenProvider_1.KeygenProvider(data, updater, runtimeOptions);
			case "s3":
			case "spaces": return new GenericProvider_1$1.GenericProvider({
				provider: "generic",
				url: (0, builder_util_runtime_1$9.getS3LikeProviderBaseUrl)(data),
				channel: data.channel || null
			}, updater, {
				...runtimeOptions,
				isUseMultipleRangeRequest: false
			});
			case "generic": {
				const options$1 = data;
				return new GenericProvider_1$1.GenericProvider(options$1, updater, {
					...runtimeOptions,
					isUseMultipleRangeRequest: options$1.useMultipleRangeRequest !== false && isUrlProbablySupportMultiRangeRequests(options$1.url)
				});
			}
			case "custom": {
				const options$1 = data;
				const constructor = options$1.updateProvider;
				if (!constructor) throw (0, builder_util_runtime_1$9.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
				return new constructor(options$1, updater, runtimeOptions);
			}
			default: throw (0, builder_util_runtime_1$9.newError)(`Unsupported provider: ${provider}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
		}
	}
}));
var require_downloadPlanBuilder = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.computeOperations = computeOperations;
	var OperationKind$1;
	(function(OperationKind$2) {
		OperationKind$2[OperationKind$2["COPY"] = 0] = "COPY";
		OperationKind$2[OperationKind$2["DOWNLOAD"] = 1] = "DOWNLOAD";
	})(OperationKind$1 || (exports.OperationKind = OperationKind$1 = {}));
	function computeOperations(oldBlockMap, newBlockMap, logger) {
		const nameToOldBlocks = buildBlockFileMap(oldBlockMap.files);
		const nameToNewBlocks = buildBlockFileMap(newBlockMap.files);
		let lastOperation = null;
		const blockMapFile = newBlockMap.files[0];
		const operations = [];
		const name$1 = blockMapFile.name;
		const oldEntry = nameToOldBlocks.get(name$1);
		if (oldEntry == null) throw new Error(`no file ${name$1} in old blockmap`);
		const newFile = nameToNewBlocks.get(name$1);
		let changedBlockCount = 0;
		const { checksumToOffset: checksumToOldOffset, checksumToOldSize } = buildChecksumMap(nameToOldBlocks.get(name$1), oldEntry.offset, logger);
		let newOffset = blockMapFile.offset;
		for (let i$1 = 0; i$1 < newFile.checksums.length; newOffset += newFile.sizes[i$1], i$1++) {
			const blockSize = newFile.sizes[i$1];
			const checksum = newFile.checksums[i$1];
			let oldOffset = checksumToOldOffset.get(checksum);
			if (oldOffset != null && checksumToOldSize.get(checksum) !== blockSize) {
				logger.warn(`Checksum ("${checksum}") matches, but size differs (old: ${checksumToOldSize.get(checksum)}, new: ${blockSize})`);
				oldOffset = void 0;
			}
			if (oldOffset === void 0) {
				changedBlockCount++;
				if (lastOperation != null && lastOperation.kind === OperationKind$1.DOWNLOAD && lastOperation.end === newOffset) lastOperation.end += blockSize;
				else {
					lastOperation = {
						kind: OperationKind$1.DOWNLOAD,
						start: newOffset,
						end: newOffset + blockSize
					};
					validateAndAdd(lastOperation, operations, checksum, i$1);
				}
			} else if (lastOperation != null && lastOperation.kind === OperationKind$1.COPY && lastOperation.end === oldOffset) lastOperation.end += blockSize;
			else {
				lastOperation = {
					kind: OperationKind$1.COPY,
					start: oldOffset,
					end: oldOffset + blockSize
				};
				validateAndAdd(lastOperation, operations, checksum, i$1);
			}
		}
		if (changedBlockCount > 0) logger.info(`File${blockMapFile.name === "file" ? "" : " " + blockMapFile.name} has ${changedBlockCount} changed blocks`);
		return operations;
	}
	var isValidateOperationRange = process.env["DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES"] === "true";
	function validateAndAdd(operation, operations, checksum, index) {
		if (isValidateOperationRange && operations.length !== 0) {
			const lastOperation = operations[operations.length - 1];
			if (lastOperation.kind === operation.kind && operation.start < lastOperation.end && operation.start > lastOperation.start) {
				const min = [
					lastOperation.start,
					lastOperation.end,
					operation.start,
					operation.end
				].reduce((p, v) => p < v ? p : v);
				throw new Error(`operation (block index: ${index}, checksum: ${checksum}, kind: ${OperationKind$1[operation.kind]}) overlaps previous operation (checksum: ${checksum}):\nabs: ${lastOperation.start} until ${lastOperation.end} and ${operation.start} until ${operation.end}\nrel: ${lastOperation.start - min} until ${lastOperation.end - min} and ${operation.start - min} until ${operation.end - min}`);
			}
		}
		operations.push(operation);
	}
	function buildChecksumMap(file, fileOffset, logger) {
		const checksumToOffset = /* @__PURE__ */ new Map();
		const checksumToSize = /* @__PURE__ */ new Map();
		let offset = fileOffset;
		for (let i$1 = 0; i$1 < file.checksums.length; i$1++) {
			const checksum = file.checksums[i$1];
			const size = file.sizes[i$1];
			const existing = checksumToSize.get(checksum);
			if (existing === void 0) {
				checksumToOffset.set(checksum, offset);
				checksumToSize.set(checksum, size);
			} else if (logger.debug != null) {
				const sizeExplanation = existing === size ? "(same size)" : `(size: ${existing}, this size: ${size})`;
				logger.debug(`${checksum} duplicated in blockmap ${sizeExplanation}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
			}
			offset += size;
		}
		return {
			checksumToOffset,
			checksumToOldSize: checksumToSize
		};
	}
	function buildBlockFileMap(list$1) {
		const result = /* @__PURE__ */ new Map();
		for (const item of list$1) result.set(item.name, item);
		return result;
	}
}));
var require_DataSplitter = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.copyData = copyData;
	var builder_util_runtime_1$8 = require_out();
	var fs_1$3 = __require("fs");
	var stream_1$1 = __require("stream");
	var downloadPlanBuilder_1$2 = require_downloadPlanBuilder();
	var DOUBLE_CRLF = Buffer.from("\r\n\r\n");
	var ReadState;
	(function(ReadState$1) {
		ReadState$1[ReadState$1["INIT"] = 0] = "INIT";
		ReadState$1[ReadState$1["HEADER"] = 1] = "HEADER";
		ReadState$1[ReadState$1["BODY"] = 2] = "BODY";
	})(ReadState || (ReadState = {}));
	function copyData(task, out, oldFileFd, reject, resolve) {
		const readStream = (0, fs_1$3.createReadStream)("", {
			fd: oldFileFd,
			autoClose: false,
			start: task.start,
			end: task.end - 1
		});
		readStream.on("error", reject);
		readStream.once("end", resolve);
		readStream.pipe(out, { end: false });
	}
	var DataSplitter = class extends stream_1$1.Writable {
		constructor(out, options$1, partIndexToTaskIndex, boundary, partIndexToLength, finishHandler) {
			super();
			this.out = out;
			this.options = options$1;
			this.partIndexToTaskIndex = partIndexToTaskIndex;
			this.partIndexToLength = partIndexToLength;
			this.finishHandler = finishHandler;
			this.partIndex = -1;
			this.headerListBuffer = null;
			this.readState = ReadState.INIT;
			this.ignoreByteCount = 0;
			this.remainingPartDataCount = 0;
			this.actualPartLength = 0;
			this.boundaryLength = boundary.length + 4;
			this.ignoreByteCount = this.boundaryLength - 2;
		}
		get isFinished() {
			return this.partIndex === this.partIndexToLength.length;
		}
		_write(data, encoding, callback) {
			if (this.isFinished) {
				console.error(`Trailing ignored data: ${data.length} bytes`);
				return;
			}
			this.handleData(data).then(callback).catch(callback);
		}
		async handleData(chunk) {
			let start = 0;
			if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0) throw (0, builder_util_runtime_1$8.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
			if (this.ignoreByteCount > 0) {
				const toIgnore = Math.min(this.ignoreByteCount, chunk.length);
				this.ignoreByteCount -= toIgnore;
				start = toIgnore;
			} else if (this.remainingPartDataCount > 0) {
				const toRead = Math.min(this.remainingPartDataCount, chunk.length);
				this.remainingPartDataCount -= toRead;
				await this.processPartData(chunk, 0, toRead);
				start = toRead;
			}
			if (start === chunk.length) return;
			if (this.readState === ReadState.HEADER) {
				const headerListEnd = this.searchHeaderListEnd(chunk, start);
				if (headerListEnd === -1) return;
				start = headerListEnd;
				this.readState = ReadState.BODY;
				this.headerListBuffer = null;
			}
			while (true) {
				if (this.readState === ReadState.BODY) this.readState = ReadState.INIT;
				else {
					this.partIndex++;
					let taskIndex = this.partIndexToTaskIndex.get(this.partIndex);
					if (taskIndex == null) if (this.isFinished) taskIndex = this.options.end;
					else throw (0, builder_util_runtime_1$8.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
					const prevTaskIndex = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
					if (prevTaskIndex < taskIndex) await this.copyExistingData(prevTaskIndex, taskIndex);
					else if (prevTaskIndex > taskIndex) throw (0, builder_util_runtime_1$8.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
					if (this.isFinished) {
						this.onPartEnd();
						this.finishHandler();
						return;
					}
					start = this.searchHeaderListEnd(chunk, start);
					if (start === -1) {
						this.readState = ReadState.HEADER;
						return;
					}
				}
				const partLength = this.partIndexToLength[this.partIndex];
				const end = start + partLength;
				const effectiveEnd = Math.min(end, chunk.length);
				await this.processPartStarted(chunk, start, effectiveEnd);
				this.remainingPartDataCount = partLength - (effectiveEnd - start);
				if (this.remainingPartDataCount > 0) return;
				start = end + this.boundaryLength;
				if (start >= chunk.length) {
					this.ignoreByteCount = this.boundaryLength - (chunk.length - end);
					return;
				}
			}
		}
		copyExistingData(index, end) {
			return new Promise((resolve, reject) => {
				const w = () => {
					if (index === end) {
						resolve();
						return;
					}
					const task = this.options.tasks[index];
					if (task.kind !== downloadPlanBuilder_1$2.OperationKind.COPY) {
						reject(/* @__PURE__ */ new Error("Task kind must be COPY"));
						return;
					}
					copyData(task, this.out, this.options.oldFileFd, reject, () => {
						index++;
						w();
					});
				};
				w();
			});
		}
		searchHeaderListEnd(chunk, readOffset) {
			const headerListEnd = chunk.indexOf(DOUBLE_CRLF, readOffset);
			if (headerListEnd !== -1) return headerListEnd + DOUBLE_CRLF.length;
			const partialChunk = readOffset === 0 ? chunk : chunk.slice(readOffset);
			if (this.headerListBuffer == null) this.headerListBuffer = partialChunk;
			else this.headerListBuffer = Buffer.concat([this.headerListBuffer, partialChunk]);
			return -1;
		}
		onPartEnd() {
			const expectedLength = this.partIndexToLength[this.partIndex - 1];
			if (this.actualPartLength !== expectedLength) throw (0, builder_util_runtime_1$8.newError)(`Expected length: ${expectedLength} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
			this.actualPartLength = 0;
		}
		processPartStarted(data, start, end) {
			if (this.partIndex !== 0) this.onPartEnd();
			return this.processPartData(data, start, end);
		}
		processPartData(data, start, end) {
			this.actualPartLength += end - start;
			const out = this.out;
			if (out.write(start === 0 && data.length === end ? data : data.slice(start, end))) return Promise.resolve();
			else return new Promise((resolve, reject) => {
				out.on("error", reject);
				out.once("drain", () => {
					out.removeListener("error", reject);
					resolve();
				});
			});
		}
	};
	exports.DataSplitter = DataSplitter;
}));
var require_multipleRangeDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.executeTasksUsingMultipleRangeRequests = executeTasksUsingMultipleRangeRequests;
	exports.checkIsRangesSupported = checkIsRangesSupported;
	var builder_util_runtime_1$7 = require_out();
	var DataSplitter_1$1 = require_DataSplitter();
	var downloadPlanBuilder_1$1 = require_downloadPlanBuilder();
	function executeTasksUsingMultipleRangeRequests(differentialDownloader, tasks, out, oldFileFd, reject) {
		const w = (taskOffset) => {
			if (taskOffset >= tasks.length) {
				if (differentialDownloader.fileMetadataBuffer != null) out.write(differentialDownloader.fileMetadataBuffer);
				out.end();
				return;
			}
			const nextOffset = taskOffset + 1e3;
			doExecuteTasks(differentialDownloader, {
				tasks,
				start: taskOffset,
				end: Math.min(tasks.length, nextOffset),
				oldFileFd
			}, out, () => w(nextOffset), reject);
		};
		return w;
	}
	function doExecuteTasks(differentialDownloader, options$1, out, resolve, reject) {
		let ranges = "bytes=";
		let partCount = 0;
		const partIndexToTaskIndex = /* @__PURE__ */ new Map();
		const partIndexToLength = [];
		for (let i$1 = options$1.start; i$1 < options$1.end; i$1++) {
			const task = options$1.tasks[i$1];
			if (task.kind === downloadPlanBuilder_1$1.OperationKind.DOWNLOAD) {
				ranges += `${task.start}-${task.end - 1}, `;
				partIndexToTaskIndex.set(partCount, i$1);
				partCount++;
				partIndexToLength.push(task.end - task.start);
			}
		}
		if (partCount <= 1) {
			const w = (index) => {
				if (index >= options$1.end) {
					resolve();
					return;
				}
				const task = options$1.tasks[index++];
				if (task.kind === downloadPlanBuilder_1$1.OperationKind.COPY) (0, DataSplitter_1$1.copyData)(task, out, options$1.oldFileFd, reject, () => w(index));
				else {
					const requestOptions$1 = differentialDownloader.createRequestOptions();
					requestOptions$1.headers.Range = `bytes=${task.start}-${task.end - 1}`;
					const request$1 = differentialDownloader.httpExecutor.createRequest(requestOptions$1, (response) => {
						if (!checkIsRangesSupported(response, reject)) return;
						response.pipe(out, { end: false });
						response.once("end", () => w(index));
					});
					differentialDownloader.httpExecutor.addErrorAndTimeoutHandlers(request$1, reject);
					request$1.end();
				}
			};
			w(options$1.start);
			return;
		}
		const requestOptions = differentialDownloader.createRequestOptions();
		requestOptions.headers.Range = ranges.substring(0, ranges.length - 2);
		const request = differentialDownloader.httpExecutor.createRequest(requestOptions, (response) => {
			if (!checkIsRangesSupported(response, reject)) return;
			const contentType = (0, builder_util_runtime_1$7.safeGetHeader)(response, "content-type");
			const m = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(contentType);
			if (m == null) {
				reject(/* @__PURE__ */ new Error(`Content-Type "multipart/byteranges" is expected, but got "${contentType}"`));
				return;
			}
			const dicer = new DataSplitter_1$1.DataSplitter(out, options$1, partIndexToTaskIndex, m[1] || m[2], partIndexToLength, resolve);
			dicer.on("error", reject);
			response.pipe(dicer);
			response.on("end", () => {
				setTimeout(() => {
					request.abort();
					reject(/* @__PURE__ */ new Error("Response ends without calling any handlers"));
				}, 1e4);
			});
		});
		differentialDownloader.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
		request.end();
	}
	function checkIsRangesSupported(response, reject) {
		if (response.statusCode >= 400) {
			reject((0, builder_util_runtime_1$7.createHttpError)(response));
			return false;
		}
		if (response.statusCode !== 206) {
			const acceptRanges = (0, builder_util_runtime_1$7.safeGetHeader)(response, "accept-ranges");
			if (acceptRanges == null || acceptRanges === "none") {
				reject(/* @__PURE__ */ new Error(`Server doesn't support Accept-Ranges (response code ${response.statusCode})`));
				return false;
			}
		}
		return true;
	}
}));
var require_ProgressDifferentialDownloadCallbackTransform = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var stream_1 = __require("stream");
	var OperationKind;
	(function(OperationKind$2) {
		OperationKind$2[OperationKind$2["COPY"] = 0] = "COPY";
		OperationKind$2[OperationKind$2["DOWNLOAD"] = 1] = "DOWNLOAD";
	})(OperationKind || (OperationKind = {}));
	var ProgressDifferentialDownloadCallbackTransform = class extends stream_1.Transform {
		constructor(progressDifferentialDownloadInfo, cancellationToken, onProgress) {
			super();
			this.progressDifferentialDownloadInfo = progressDifferentialDownloadInfo;
			this.cancellationToken = cancellationToken;
			this.onProgress = onProgress;
			this.start = Date.now();
			this.transferred = 0;
			this.delta = 0;
			this.expectedBytes = 0;
			this.index = 0;
			this.operationType = OperationKind.COPY;
			this.nextUpdate = this.start + 1e3;
		}
		_transform(chunk, encoding, callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"), null);
				return;
			}
			if (this.operationType == OperationKind.COPY) {
				callback(null, chunk);
				return;
			}
			this.transferred += chunk.length;
			this.delta += chunk.length;
			const now$1 = Date.now();
			if (now$1 >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal) {
				this.nextUpdate = now$1 + 1e3;
				this.onProgress({
					total: this.progressDifferentialDownloadInfo.grandTotal,
					delta: this.delta,
					transferred: this.transferred,
					percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
					bytesPerSecond: Math.round(this.transferred / ((now$1 - this.start) / 1e3))
				});
				this.delta = 0;
			}
			callback(null, chunk);
		}
		beginFileCopy() {
			this.operationType = OperationKind.COPY;
		}
		beginRangeDownload() {
			this.operationType = OperationKind.DOWNLOAD;
			this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
		}
		endRangeDownload() {
			if (this.transferred !== this.progressDifferentialDownloadInfo.grandTotal) this.onProgress({
				total: this.progressDifferentialDownloadInfo.grandTotal,
				delta: this.delta,
				transferred: this.transferred,
				percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			});
		}
		_flush(callback) {
			if (this.cancellationToken.cancelled) {
				callback(/* @__PURE__ */ new Error("cancelled"));
				return;
			}
			this.onProgress({
				total: this.progressDifferentialDownloadInfo.grandTotal,
				delta: this.delta,
				transferred: this.transferred,
				percent: 100,
				bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
			});
			this.delta = 0;
			this.transferred = 0;
			callback(null);
		}
	};
	exports.ProgressDifferentialDownloadCallbackTransform = ProgressDifferentialDownloadCallbackTransform;
}));
var require_DifferentialDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$6 = require_out();
	var fs_extra_1$6 = require_lib$7();
	var fs_1$2 = __require("fs");
	var DataSplitter_1 = require_DataSplitter();
	var url_1$1 = __require("url");
	var downloadPlanBuilder_1 = require_downloadPlanBuilder();
	var multipleRangeDownloader_1 = require_multipleRangeDownloader();
	var ProgressDifferentialDownloadCallbackTransform_1 = require_ProgressDifferentialDownloadCallbackTransform();
	var DifferentialDownloader = class {
		constructor(blockAwareFileInfo, httpExecutor, options$1) {
			this.blockAwareFileInfo = blockAwareFileInfo;
			this.httpExecutor = httpExecutor;
			this.options = options$1;
			this.fileMetadataBuffer = null;
			this.logger = options$1.logger;
		}
		createRequestOptions() {
			const result = { headers: {
				...this.options.requestHeaders,
				accept: "*/*"
			} };
			(0, builder_util_runtime_1$6.configureRequestUrl)(this.options.newUrl, result);
			(0, builder_util_runtime_1$6.configureRequestOptions)(result);
			return result;
		}
		doDownload(oldBlockMap, newBlockMap) {
			if (oldBlockMap.version !== newBlockMap.version) throw new Error(`version is different (${oldBlockMap.version} - ${newBlockMap.version}), full download is required`);
			const logger = this.logger;
			const operations = (0, downloadPlanBuilder_1.computeOperations)(oldBlockMap, newBlockMap, logger);
			if (logger.debug != null) logger.debug(JSON.stringify(operations, null, 2));
			let downloadSize = 0;
			let copySize = 0;
			for (const operation of operations) {
				const length = operation.end - operation.start;
				if (operation.kind === downloadPlanBuilder_1.OperationKind.DOWNLOAD) downloadSize += length;
				else copySize += length;
			}
			const newSize = this.blockAwareFileInfo.size;
			if (downloadSize + copySize + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== newSize) throw new Error(`Internal error, size mismatch: downloadSize: ${downloadSize}, copySize: ${copySize}, newSize: ${newSize}`);
			logger.info(`Full: ${formatBytes(newSize)}, To download: ${formatBytes(downloadSize)} (${Math.round(downloadSize / (newSize / 100))}%)`);
			return this.downloadFile(operations);
		}
		downloadFile(tasks) {
			const fdList = [];
			const closeFiles = () => {
				return Promise.all(fdList.map((openedFile) => {
					return (0, fs_extra_1$6.close)(openedFile.descriptor).catch((e) => {
						this.logger.error(`cannot close file "${openedFile.path}": ${e}`);
					});
				}));
			};
			return this.doDownloadFile(tasks, fdList).then(closeFiles).catch((e) => {
				return closeFiles().catch((closeFilesError) => {
					try {
						this.logger.error(`cannot close files: ${closeFilesError}`);
					} catch (errorOnLog) {
						try {
							console.error(errorOnLog);
						} catch (_ignored) {}
					}
					throw e;
				}).then(() => {
					throw e;
				});
			});
		}
		async doDownloadFile(tasks, fdList) {
			const oldFileFd = await (0, fs_extra_1$6.open)(this.options.oldFile, "r");
			fdList.push({
				descriptor: oldFileFd,
				path: this.options.oldFile
			});
			const newFileFd = await (0, fs_extra_1$6.open)(this.options.newFile, "w");
			fdList.push({
				descriptor: newFileFd,
				path: this.options.newFile
			});
			const fileOut = (0, fs_1$2.createWriteStream)(this.options.newFile, { fd: newFileFd });
			await new Promise((resolve, reject) => {
				const streams = [];
				let downloadInfoTransform = void 0;
				if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
					const expectedByteCounts = [];
					let grandTotalBytes = 0;
					for (const task of tasks) if (task.kind === downloadPlanBuilder_1.OperationKind.DOWNLOAD) {
						expectedByteCounts.push(task.end - task.start);
						grandTotalBytes += task.end - task.start;
					}
					const progressDifferentialDownloadInfo = {
						expectedByteCounts,
						grandTotal: grandTotalBytes
					};
					downloadInfoTransform = new ProgressDifferentialDownloadCallbackTransform_1.ProgressDifferentialDownloadCallbackTransform(progressDifferentialDownloadInfo, this.options.cancellationToken, this.options.onProgress);
					streams.push(downloadInfoTransform);
				}
				const digestTransform = new builder_util_runtime_1$6.DigestTransform(this.blockAwareFileInfo.sha512);
				digestTransform.isValidateOnEnd = false;
				streams.push(digestTransform);
				fileOut.on("finish", () => {
					fileOut.close(() => {
						fdList.splice(1, 1);
						try {
							digestTransform.validate();
						} catch (e) {
							reject(e);
							return;
						}
						resolve(void 0);
					});
				});
				streams.push(fileOut);
				let lastStream = null;
				for (const stream of streams) {
					stream.on("error", reject);
					if (lastStream == null) lastStream = stream;
					else lastStream = lastStream.pipe(stream);
				}
				const firstStream = streams[0];
				let w;
				if (this.options.isUseMultipleRangeRequest) {
					w = (0, multipleRangeDownloader_1.executeTasksUsingMultipleRangeRequests)(this, tasks, firstStream, oldFileFd, reject);
					w(0);
					return;
				}
				let downloadOperationCount = 0;
				let actualUrl = null;
				this.logger.info(`Differential download: ${this.options.newUrl}`);
				const requestOptions = this.createRequestOptions();
				requestOptions.redirect = "manual";
				w = (index) => {
					var _a$1, _b;
					if (index >= tasks.length) {
						if (this.fileMetadataBuffer != null) firstStream.write(this.fileMetadataBuffer);
						firstStream.end();
						return;
					}
					const operation = tasks[index++];
					if (operation.kind === downloadPlanBuilder_1.OperationKind.COPY) {
						if (downloadInfoTransform) downloadInfoTransform.beginFileCopy();
						(0, DataSplitter_1.copyData)(operation, firstStream, oldFileFd, reject, () => w(index));
						return;
					}
					const range = `bytes=${operation.start}-${operation.end - 1}`;
					requestOptions.headers.range = range;
					(_b = (_a$1 = this.logger) === null || _a$1 === void 0 ? void 0 : _a$1.debug) === null || _b === void 0 || _b.call(_a$1, `download range: ${range}`);
					if (downloadInfoTransform) downloadInfoTransform.beginRangeDownload();
					const request = this.httpExecutor.createRequest(requestOptions, (response) => {
						response.on("error", reject);
						response.on("aborted", () => {
							reject(/* @__PURE__ */ new Error("response has been aborted by the server"));
						});
						if (response.statusCode >= 400) reject((0, builder_util_runtime_1$6.createHttpError)(response));
						response.pipe(firstStream, { end: false });
						response.once("end", () => {
							if (downloadInfoTransform) downloadInfoTransform.endRangeDownload();
							if (++downloadOperationCount === 100) {
								downloadOperationCount = 0;
								setTimeout(() => w(index), 1e3);
							} else w(index);
						});
					});
					request.on("redirect", (statusCode, method, redirectUrl) => {
						this.logger.info(`Redirect to ${removeQuery(redirectUrl)}`);
						actualUrl = redirectUrl;
						(0, builder_util_runtime_1$6.configureRequestUrl)(new url_1$1.URL(actualUrl), requestOptions);
						request.followRedirect();
					});
					this.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
					request.end();
				};
				w(0);
			});
		}
		async readRemoteBytes(start, endInclusive) {
			const buffer = Buffer.allocUnsafe(endInclusive + 1 - start);
			const requestOptions = this.createRequestOptions();
			requestOptions.headers.range = `bytes=${start}-${endInclusive}`;
			let position = 0;
			await this.request(requestOptions, (chunk) => {
				chunk.copy(buffer, position);
				position += chunk.length;
			});
			if (position !== buffer.length) throw new Error(`Received data length ${position} is not equal to expected ${buffer.length}`);
			return buffer;
		}
		request(requestOptions, dataHandler) {
			return new Promise((resolve, reject) => {
				const request = this.httpExecutor.createRequest(requestOptions, (response) => {
					if (!(0, multipleRangeDownloader_1.checkIsRangesSupported)(response, reject)) return;
					response.on("error", reject);
					response.on("aborted", () => {
						reject(/* @__PURE__ */ new Error("response has been aborted by the server"));
					});
					response.on("data", dataHandler);
					response.on("end", () => resolve());
				});
				this.httpExecutor.addErrorAndTimeoutHandlers(request, reject);
				request.end();
			});
		}
	};
	exports.DifferentialDownloader = DifferentialDownloader;
	function formatBytes(value, symbol = " KB") {
		return new Intl.NumberFormat("en").format((value / 1024).toFixed(2)) + symbol;
	}
	function removeQuery(url$1) {
		const index = url$1.indexOf("?");
		return index < 0 ? url$1 : url$1.substring(0, index);
	}
}));
var require_GenericDifferentialDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var DifferentialDownloader_1$1 = require_DifferentialDownloader();
	var GenericDifferentialDownloader = class extends DifferentialDownloader_1$1.DifferentialDownloader {
		download(oldBlockMap, newBlockMap) {
			return this.doDownload(oldBlockMap, newBlockMap);
		}
	};
	exports.GenericDifferentialDownloader = GenericDifferentialDownloader;
}));
var require_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UpdaterSignal = exports.UPDATE_DOWNLOADED = exports.DOWNLOAD_PROGRESS = exports.CancellationToken = void 0;
	exports.addHandler = addHandler;
	var builder_util_runtime_1$5 = require_out();
	Object.defineProperty(exports, "CancellationToken", {
		enumerable: true,
		get: function() {
			return builder_util_runtime_1$5.CancellationToken;
		}
	});
	exports.DOWNLOAD_PROGRESS = "download-progress";
	exports.UPDATE_DOWNLOADED = "update-downloaded";
	var UpdaterSignal = class {
		constructor(emitter) {
			this.emitter = emitter;
		}
		login(handler) {
			addHandler(this.emitter, "login", handler);
		}
		progress(handler) {
			addHandler(this.emitter, exports.DOWNLOAD_PROGRESS, handler);
		}
		updateDownloaded(handler) {
			addHandler(this.emitter, exports.UPDATE_DOWNLOADED, handler);
		}
		updateCancelled(handler) {
			addHandler(this.emitter, "update-cancelled", handler);
		}
	};
	exports.UpdaterSignal = UpdaterSignal;
	function addHandler(emitter, event, handler) {
		emitter.on(event, handler);
	}
}));
var require_AppUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$4 = require_out();
	var crypto_1$1 = __require("crypto");
	var os_1 = __require("os");
	var events_1 = __require("events");
	var fs_extra_1$5 = require_lib$7();
	var js_yaml_1 = require_js_yaml();
	var lazy_val_1 = require_main$1();
	var path$7 = __require("path");
	var semver_1 = require_semver();
	var DownloadedUpdateHelper_1 = require_DownloadedUpdateHelper();
	var ElectronAppAdapter_1 = require_ElectronAppAdapter();
	var electronHttpExecutor_1 = require_electronHttpExecutor();
	var GenericProvider_1 = require_GenericProvider();
	var providerFactory_1 = require_providerFactory();
	var zlib_1$1 = __require("zlib");
	var util_1 = require_util();
	var GenericDifferentialDownloader_1 = require_GenericDifferentialDownloader();
	var types_1$5 = require_types();
	exports.AppUpdater = class AppUpdater extends events_1.EventEmitter {
		get channel() {
			return this._channel;
		}
		set channel(value) {
			if (this._channel != null) {
				if (typeof value !== "string") throw (0, builder_util_runtime_1$4.newError)(`Channel must be a string, but got: ${value}`, "ERR_UPDATER_INVALID_CHANNEL");
				else if (value.length === 0) throw (0, builder_util_runtime_1$4.newError)(`Channel must be not an empty string`, "ERR_UPDATER_INVALID_CHANNEL");
			}
			this._channel = value;
			this.allowDowngrade = true;
		}
		addAuthHeader(token) {
			this.requestHeaders = Object.assign({}, this.requestHeaders, { authorization: token });
		}
		get netSession() {
			return (0, electronHttpExecutor_1.getNetSession)();
		}
		get logger() {
			return this._logger;
		}
		set logger(value) {
			this._logger = value == null ? new NoOpLogger() : value;
		}
		set updateConfigPath(value) {
			this.clientPromise = null;
			this._appUpdateConfigPath = value;
			this.configOnDisk = new lazy_val_1.Lazy(() => this.loadUpdateConfig());
		}
		get isUpdateSupported() {
			return this._isUpdateSupported;
		}
		set isUpdateSupported(value) {
			if (value) this._isUpdateSupported = value;
		}
		constructor(options$1, app$1) {
			super();
			this.autoDownload = true;
			this.autoInstallOnAppQuit = true;
			this.autoRunAppAfterInstall = true;
			this.allowPrerelease = false;
			this.fullChangelog = false;
			this.allowDowngrade = false;
			this.disableWebInstaller = false;
			this.disableDifferentialDownload = false;
			this.forceDevUpdateConfig = false;
			this._channel = null;
			this.downloadedUpdateHelper = null;
			this.requestHeaders = null;
			this._logger = console;
			this.signals = new types_1$5.UpdaterSignal(this);
			this._appUpdateConfigPath = null;
			this._isUpdateSupported = (updateInfo) => this.checkIfUpdateSupported(updateInfo);
			this.clientPromise = null;
			this.stagingUserIdPromise = new lazy_val_1.Lazy(() => this.getOrCreateStagingUserId());
			this.configOnDisk = new lazy_val_1.Lazy(() => this.loadUpdateConfig());
			this.checkForUpdatesPromise = null;
			this.downloadPromise = null;
			this.updateInfoAndProvider = null;
			this._testOnlyOptions = null;
			this.on("error", (error) => {
				this._logger.error(`Error: ${error.stack || error.message}`);
			});
			if (app$1 == null) {
				this.app = new ElectronAppAdapter_1.ElectronAppAdapter();
				this.httpExecutor = new electronHttpExecutor_1.ElectronHttpExecutor((authInfo, callback) => this.emit("login", authInfo, callback));
			} else {
				this.app = app$1;
				this.httpExecutor = null;
			}
			const currentVersionString = this.app.version;
			const currentVersion = (0, semver_1.parse)(currentVersionString);
			if (currentVersion == null) throw (0, builder_util_runtime_1$4.newError)(`App version is not a valid semver version: "${currentVersionString}"`, "ERR_UPDATER_INVALID_VERSION");
			this.currentVersion = currentVersion;
			this.allowPrerelease = hasPrereleaseComponents(currentVersion);
			if (options$1 != null) {
				this.setFeedURL(options$1);
				if (typeof options$1 !== "string" && options$1.requestHeaders) this.requestHeaders = options$1.requestHeaders;
			}
		}
		getFeedURL() {
			return "Deprecated. Do not use it.";
		}
		setFeedURL(options$1) {
			const runtimeOptions = this.createProviderRuntimeOptions();
			let provider;
			if (typeof options$1 === "string") provider = new GenericProvider_1.GenericProvider({
				provider: "generic",
				url: options$1
			}, this, {
				...runtimeOptions,
				isUseMultipleRangeRequest: (0, providerFactory_1.isUrlProbablySupportMultiRangeRequests)(options$1)
			});
			else provider = (0, providerFactory_1.createClient)(options$1, this, runtimeOptions);
			this.clientPromise = Promise.resolve(provider);
		}
		checkForUpdates() {
			if (!this.isUpdaterActive()) return Promise.resolve(null);
			let checkForUpdatesPromise = this.checkForUpdatesPromise;
			if (checkForUpdatesPromise != null) {
				this._logger.info("Checking for update (already in progress)");
				return checkForUpdatesPromise;
			}
			const nullizePromise = () => this.checkForUpdatesPromise = null;
			this._logger.info("Checking for update");
			checkForUpdatesPromise = this.doCheckForUpdates().then((it) => {
				nullizePromise();
				return it;
			}).catch((e) => {
				nullizePromise();
				this.emit("error", e, `Cannot check for updates: ${(e.stack || e).toString()}`);
				throw e;
			});
			this.checkForUpdatesPromise = checkForUpdatesPromise;
			return checkForUpdatesPromise;
		}
		isUpdaterActive() {
			if (!(this.app.isPackaged || this.forceDevUpdateConfig)) {
				this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced");
				return false;
			}
			return true;
		}
		checkForUpdatesAndNotify(downloadNotification) {
			return this.checkForUpdates().then((it) => {
				if (!(it === null || it === void 0 ? void 0 : it.downloadPromise)) {
					if (this._logger.debug != null) this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null");
					return it;
				}
				it.downloadPromise.then(() => {
					const notificationContent = AppUpdater.formatDownloadNotification(it.updateInfo.version, this.app.name, downloadNotification);
					new (__require("electron")).Notification(notificationContent).show();
				});
				return it;
			});
		}
		static formatDownloadNotification(version$2, appName$1, downloadNotification) {
			if (downloadNotification == null) downloadNotification = {
				title: "A new update is ready to install",
				body: `{appName} version {version} has been downloaded and will be automatically installed on exit`
			};
			downloadNotification = {
				title: downloadNotification.title.replace("{appName}", appName$1).replace("{version}", version$2),
				body: downloadNotification.body.replace("{appName}", appName$1).replace("{version}", version$2)
			};
			return downloadNotification;
		}
		async isStagingMatch(updateInfo) {
			const rawStagingPercentage = updateInfo.stagingPercentage;
			let stagingPercentage = rawStagingPercentage;
			if (stagingPercentage == null) return true;
			stagingPercentage = parseInt(stagingPercentage, 10);
			if (isNaN(stagingPercentage)) {
				this._logger.warn(`Staging percentage is NaN: ${rawStagingPercentage}`);
				return true;
			}
			stagingPercentage = stagingPercentage / 100;
			const stagingUserId = await this.stagingUserIdPromise.value;
			const percentage = builder_util_runtime_1$4.UUID.parse(stagingUserId).readUInt32BE(12) / 4294967295;
			this._logger.info(`Staging percentage: ${stagingPercentage}, percentage: ${percentage}, user id: ${stagingUserId}`);
			return percentage < stagingPercentage;
		}
		computeFinalHeaders(headers) {
			if (this.requestHeaders != null) Object.assign(headers, this.requestHeaders);
			return headers;
		}
		async isUpdateAvailable(updateInfo) {
			const latestVersion = (0, semver_1.parse)(updateInfo.version);
			if (latestVersion == null) throw (0, builder_util_runtime_1$4.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${updateInfo.version}"`, "ERR_UPDATER_INVALID_VERSION");
			const currentVersion = this.currentVersion;
			if ((0, semver_1.eq)(latestVersion, currentVersion)) return false;
			if (!await Promise.resolve(this.isUpdateSupported(updateInfo))) return false;
			if (!await this.isStagingMatch(updateInfo)) return false;
			const isLatestVersionNewer = (0, semver_1.gt)(latestVersion, currentVersion);
			const isLatestVersionOlder = (0, semver_1.lt)(latestVersion, currentVersion);
			if (isLatestVersionNewer) return true;
			return this.allowDowngrade && isLatestVersionOlder;
		}
		checkIfUpdateSupported(updateInfo) {
			const minimumSystemVersion = updateInfo === null || updateInfo === void 0 ? void 0 : updateInfo.minimumSystemVersion;
			const currentOSVersion = (0, os_1.release)();
			if (minimumSystemVersion) try {
				if ((0, semver_1.lt)(currentOSVersion, minimumSystemVersion)) {
					this._logger.info(`Current OS version ${currentOSVersion} is less than the minimum OS version required ${minimumSystemVersion} for version ${currentOSVersion}`);
					return false;
				}
			} catch (e) {
				this._logger.warn(`Failed to compare current OS version(${currentOSVersion}) with minimum OS version(${minimumSystemVersion}): ${(e.message || e).toString()}`);
			}
			return true;
		}
		async getUpdateInfoAndProvider() {
			await this.app.whenReady();
			if (this.clientPromise == null) this.clientPromise = this.configOnDisk.value.then((it) => (0, providerFactory_1.createClient)(it, this, this.createProviderRuntimeOptions()));
			const client = await this.clientPromise;
			const stagingUserId = await this.stagingUserIdPromise.value;
			client.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": stagingUserId }));
			return {
				info: await client.getLatestVersion(),
				provider: client
			};
		}
		createProviderRuntimeOptions() {
			return {
				isUseMultipleRangeRequest: true,
				platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
				executor: this.httpExecutor
			};
		}
		async doCheckForUpdates() {
			this.emit("checking-for-update");
			const result = await this.getUpdateInfoAndProvider();
			const updateInfo = result.info;
			if (!await this.isUpdateAvailable(updateInfo)) {
				this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${updateInfo.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`);
				this.emit("update-not-available", updateInfo);
				return {
					isUpdateAvailable: false,
					versionInfo: updateInfo,
					updateInfo
				};
			}
			this.updateInfoAndProvider = result;
			this.onUpdateAvailable(updateInfo);
			const cancellationToken = new builder_util_runtime_1$4.CancellationToken();
			return {
				isUpdateAvailable: true,
				versionInfo: updateInfo,
				updateInfo,
				cancellationToken,
				downloadPromise: this.autoDownload ? this.downloadUpdate(cancellationToken) : null
			};
		}
		onUpdateAvailable(updateInfo) {
			this._logger.info(`Found version ${updateInfo.version} (url: ${(0, builder_util_runtime_1$4.asArray)(updateInfo.files).map((it) => it.url).join(", ")})`);
			this.emit("update-available", updateInfo);
		}
		downloadUpdate(cancellationToken = new builder_util_runtime_1$4.CancellationToken()) {
			const updateInfoAndProvider = this.updateInfoAndProvider;
			if (updateInfoAndProvider == null) {
				const error = /* @__PURE__ */ new Error("Please check update first");
				this.dispatchError(error);
				return Promise.reject(error);
			}
			if (this.downloadPromise != null) {
				this._logger.info("Downloading update (already in progress)");
				return this.downloadPromise;
			}
			this._logger.info(`Downloading update from ${(0, builder_util_runtime_1$4.asArray)(updateInfoAndProvider.info.files).map((it) => it.url).join(", ")}`);
			const errorHandler = (e) => {
				if (!(e instanceof builder_util_runtime_1$4.CancellationError)) try {
					this.dispatchError(e);
				} catch (nestedError) {
					this._logger.warn(`Cannot dispatch error event: ${nestedError.stack || nestedError}`);
				}
				return e;
			};
			this.downloadPromise = this.doDownloadUpdate({
				updateInfoAndProvider,
				requestHeaders: this.computeRequestHeaders(updateInfoAndProvider.provider),
				cancellationToken,
				disableWebInstaller: this.disableWebInstaller,
				disableDifferentialDownload: this.disableDifferentialDownload
			}).catch((e) => {
				throw errorHandler(e);
			}).finally(() => {
				this.downloadPromise = null;
			});
			return this.downloadPromise;
		}
		dispatchError(e) {
			this.emit("error", e, (e.stack || e).toString());
		}
		dispatchUpdateDownloaded(event) {
			this.emit(types_1$5.UPDATE_DOWNLOADED, event);
		}
		async loadUpdateConfig() {
			if (this._appUpdateConfigPath == null) this._appUpdateConfigPath = this.app.appUpdateConfigPath;
			return (0, js_yaml_1.load)(await (0, fs_extra_1$5.readFile)(this._appUpdateConfigPath, "utf-8"));
		}
		computeRequestHeaders(provider) {
			const fileExtraDownloadHeaders = provider.fileExtraDownloadHeaders;
			if (fileExtraDownloadHeaders != null) {
				const requestHeaders = this.requestHeaders;
				return requestHeaders == null ? fileExtraDownloadHeaders : {
					...fileExtraDownloadHeaders,
					...requestHeaders
				};
			}
			return this.computeFinalHeaders({ accept: "*/*" });
		}
		async getOrCreateStagingUserId() {
			const file = path$7.join(this.app.userDataPath, ".updaterId");
			try {
				const id$1 = await (0, fs_extra_1$5.readFile)(file, "utf-8");
				if (builder_util_runtime_1$4.UUID.check(id$1)) return id$1;
				else this._logger.warn(`Staging user id file exists, but content was invalid: ${id$1}`);
			} catch (e) {
				if (e.code !== "ENOENT") this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${e}`);
			}
			const id = builder_util_runtime_1$4.UUID.v5((0, crypto_1$1.randomBytes)(4096), builder_util_runtime_1$4.UUID.OID);
			this._logger.info(`Generated new staging user ID: ${id}`);
			try {
				await (0, fs_extra_1$5.outputFile)(file, id);
			} catch (e) {
				this._logger.warn(`Couldn't write out staging user ID: ${e}`);
			}
			return id;
		}
		get isAddNoCacheQuery() {
			const headers = this.requestHeaders;
			if (headers == null) return true;
			for (const headerName of Object.keys(headers)) {
				const s = headerName.toLowerCase();
				if (s === "authorization" || s === "private-token") return false;
			}
			return true;
		}
		async getOrCreateDownloadHelper() {
			let result = this.downloadedUpdateHelper;
			if (result == null) {
				const dirName = (await this.configOnDisk.value).updaterCacheDirName;
				const logger = this._logger;
				if (dirName == null) logger.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
				const cacheDir = path$7.join(this.app.baseCachePath, dirName || this.app.name);
				if (logger.debug != null) logger.debug(`updater cache dir: ${cacheDir}`);
				result = new DownloadedUpdateHelper_1.DownloadedUpdateHelper(cacheDir);
				this.downloadedUpdateHelper = result;
			}
			return result;
		}
		async executeDownload(taskOptions) {
			const fileInfo = taskOptions.fileInfo;
			const downloadOptions = {
				headers: taskOptions.downloadUpdateOptions.requestHeaders,
				cancellationToken: taskOptions.downloadUpdateOptions.cancellationToken,
				sha2: fileInfo.info.sha2,
				sha512: fileInfo.info.sha512
			};
			if (this.listenerCount(types_1$5.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1$5.DOWNLOAD_PROGRESS, it);
			const updateInfo = taskOptions.downloadUpdateOptions.updateInfoAndProvider.info;
			const version$2 = updateInfo.version;
			const packageInfo = fileInfo.packageInfo;
			function getCacheUpdateFileName() {
				const urlPath = decodeURIComponent(taskOptions.fileInfo.url.pathname);
				if (urlPath.endsWith(`.${taskOptions.fileExtension}`)) return path$7.basename(urlPath);
				else return taskOptions.fileInfo.info.url;
			}
			const downloadedUpdateHelper = await this.getOrCreateDownloadHelper();
			const cacheDir = downloadedUpdateHelper.cacheDirForPendingUpdate;
			await (0, fs_extra_1$5.mkdir)(cacheDir, { recursive: true });
			const updateFileName = getCacheUpdateFileName();
			let updateFile = path$7.join(cacheDir, updateFileName);
			const packageFile = packageInfo == null ? null : path$7.join(cacheDir, `package-${version$2}${path$7.extname(packageInfo.path) || ".7z"}`);
			const done = async (isSaveCache) => {
				await downloadedUpdateHelper.setDownloadedFile(updateFile, packageFile, updateInfo, fileInfo, updateFileName, isSaveCache);
				await taskOptions.done({
					...updateInfo,
					downloadedFile: updateFile
				});
				return packageFile == null ? [updateFile] : [updateFile, packageFile];
			};
			const log = this._logger;
			const cachedUpdateFile = await downloadedUpdateHelper.validateDownloadedPath(updateFile, updateInfo, fileInfo, log);
			if (cachedUpdateFile != null) {
				updateFile = cachedUpdateFile;
				return await done(false);
			}
			const removeFileIfAny = async () => {
				await downloadedUpdateHelper.clear().catch(() => {});
				return await (0, fs_extra_1$5.unlink)(updateFile).catch(() => {});
			};
			const tempUpdateFile = await (0, DownloadedUpdateHelper_1.createTempUpdateFile)(`temp-${updateFileName}`, cacheDir, log);
			try {
				await taskOptions.task(tempUpdateFile, downloadOptions, packageFile, removeFileIfAny);
				await (0, builder_util_runtime_1$4.retry)(() => (0, fs_extra_1$5.rename)(tempUpdateFile, updateFile), 60, 500, 0, 0, (error) => error instanceof Error && /^EBUSY:/.test(error.message));
			} catch (e) {
				await removeFileIfAny();
				if (e instanceof builder_util_runtime_1$4.CancellationError) {
					log.info("cancelled");
					this.emit("update-cancelled", updateInfo);
				}
				throw e;
			}
			log.info(`New version ${version$2} has been downloaded to ${updateFile}`);
			return await done(true);
		}
		async differentialDownloadInstaller(fileInfo, downloadUpdateOptions, installerPath, provider, oldInstallerFileName) {
			try {
				if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload) return true;
				const blockmapFileUrls = (0, util_1.blockmapFiles)(fileInfo.url, this.app.version, downloadUpdateOptions.updateInfoAndProvider.info.version);
				this._logger.info(`Download block maps (old: "${blockmapFileUrls[0]}", new: ${blockmapFileUrls[1]})`);
				const downloadBlockMap = async (url$1) => {
					const data = await this.httpExecutor.downloadToBuffer(url$1, {
						headers: downloadUpdateOptions.requestHeaders,
						cancellationToken: downloadUpdateOptions.cancellationToken
					});
					if (data == null || data.length === 0) throw new Error(`Blockmap "${url$1.href}" is empty`);
					try {
						return JSON.parse((0, zlib_1$1.gunzipSync)(data).toString());
					} catch (e) {
						throw new Error(`Cannot parse blockmap "${url$1.href}", error: ${e}`);
					}
				};
				const downloadOptions = {
					newUrl: fileInfo.url,
					oldFile: path$7.join(this.downloadedUpdateHelper.cacheDir, oldInstallerFileName),
					logger: this._logger,
					newFile: installerPath,
					isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
					requestHeaders: downloadUpdateOptions.requestHeaders,
					cancellationToken: downloadUpdateOptions.cancellationToken
				};
				if (this.listenerCount(types_1$5.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1$5.DOWNLOAD_PROGRESS, it);
				const blockMapDataList = await Promise.all(blockmapFileUrls.map((u$12) => downloadBlockMap(u$12)));
				await new GenericDifferentialDownloader_1.GenericDifferentialDownloader(fileInfo.info, this.httpExecutor, downloadOptions).download(blockMapDataList[0], blockMapDataList[1]);
				return false;
			} catch (e) {
				this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
				if (this._testOnlyOptions != null) throw e;
				return true;
			}
		}
	};
	function hasPrereleaseComponents(version$2) {
		const versionPrereleaseComponent = (0, semver_1.prerelease)(version$2);
		return versionPrereleaseComponent != null && versionPrereleaseComponent.length > 0;
	}
	var NoOpLogger = class {
		info(message) {}
		warn(message) {}
		error(message) {}
	};
	exports.NoOpLogger = NoOpLogger;
}));
var require_BaseUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var child_process_1$3 = __require("child_process");
	var AppUpdater_1$2 = require_AppUpdater();
	var BaseUpdater = class extends AppUpdater_1$2.AppUpdater {
		constructor(options$1, app$1) {
			super(options$1, app$1);
			this.quitAndInstallCalled = false;
			this.quitHandlerAdded = false;
		}
		quitAndInstall(isSilent = false, isForceRunAfter = false) {
			this._logger.info(`Install on explicit quitAndInstall`);
			if (this.install(isSilent, isSilent ? isForceRunAfter : this.autoRunAppAfterInstall)) setImmediate(() => {
				__require("electron").autoUpdater.emit("before-quit-for-update");
				this.app.quit();
			});
			else this.quitAndInstallCalled = false;
		}
		executeDownload(taskOptions) {
			return super.executeDownload({
				...taskOptions,
				done: (event) => {
					this.dispatchUpdateDownloaded(event);
					this.addQuitHandler();
					return Promise.resolve();
				}
			});
		}
		get installerPath() {
			return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
		}
		install(isSilent = false, isForceRunAfter = false) {
			if (this.quitAndInstallCalled) {
				this._logger.warn("install call ignored: quitAndInstallCalled is set to true");
				return false;
			}
			const downloadedUpdateHelper = this.downloadedUpdateHelper;
			const installerPath = this.installerPath;
			const downloadedFileInfo = downloadedUpdateHelper == null ? null : downloadedUpdateHelper.downloadedFileInfo;
			if (installerPath == null || downloadedFileInfo == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No valid update available, can't quit and install"));
				return false;
			}
			this.quitAndInstallCalled = true;
			try {
				this._logger.info(`Install: isSilent: ${isSilent}, isForceRunAfter: ${isForceRunAfter}`);
				return this.doInstall({
					isSilent,
					isForceRunAfter,
					isAdminRightsRequired: downloadedFileInfo.isAdminRightsRequired
				});
			} catch (e) {
				this.dispatchError(e);
				return false;
			}
		}
		addQuitHandler() {
			if (this.quitHandlerAdded || !this.autoInstallOnAppQuit) return;
			this.quitHandlerAdded = true;
			this.app.onQuit((exitCode) => {
				if (this.quitAndInstallCalled) {
					this._logger.info("Update installer has already been triggered. Quitting application.");
					return;
				}
				if (!this.autoInstallOnAppQuit) {
					this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
					return;
				}
				if (exitCode !== 0) {
					this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${exitCode}`);
					return;
				}
				this._logger.info("Auto install update on quit");
				this.install(true, false);
			});
		}
		wrapSudo() {
			const { name: name$1 } = this.app;
			const installComment = `"${name$1} would like to update"`;
			const sudo = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu");
			const command = [sudo];
			if (/kdesudo/i.test(sudo)) {
				command.push("--comment", installComment);
				command.push("-c");
			} else if (/gksudo/i.test(sudo)) command.push("--message", installComment);
			else if (/pkexec/i.test(sudo)) command.push("--disable-internal-agent");
			return command.join(" ");
		}
		spawnSyncLog(cmd, args = [], env = {}) {
			this._logger.info(`Executing: ${cmd} with args: ${args}`);
			const { error, status, stdout, stderr } = (0, child_process_1$3.spawnSync)(cmd, args, {
				env: {
					...process.env,
					...env
				},
				encoding: "utf-8",
				shell: true
			});
			if (error != null) {
				this._logger.error(stderr);
				throw error;
			} else if (status != null && status !== 0) {
				this._logger.error(stderr);
				throw new Error(`Command ${cmd} exited with code ${status}`);
			}
			return stdout.trim();
		}
		async spawnLog(cmd, args = [], env = void 0, stdio = "ignore") {
			this._logger.info(`Executing: ${cmd} with args: ${args}`);
			return new Promise((resolve, reject) => {
				try {
					const params = {
						stdio,
						env,
						detached: true
					};
					const p = (0, child_process_1$3.spawn)(cmd, args, params);
					p.on("error", (error) => {
						reject(error);
					});
					p.unref();
					if (p.pid !== void 0) resolve(true);
				} catch (error) {
					reject(error);
				}
			});
		}
	};
	exports.BaseUpdater = BaseUpdater;
}));
var require_FileWithEmbeddedBlockMapDifferentialDownloader = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var fs_extra_1$4 = require_lib$7();
	var DifferentialDownloader_1 = require_DifferentialDownloader();
	var zlib_1 = __require("zlib");
	var FileWithEmbeddedBlockMapDifferentialDownloader = class extends DifferentialDownloader_1.DifferentialDownloader {
		async download() {
			const packageInfo = this.blockAwareFileInfo;
			const fileSize = packageInfo.size;
			const offset = fileSize - (packageInfo.blockMapSize + 4);
			this.fileMetadataBuffer = await this.readRemoteBytes(offset, fileSize - 1);
			const newBlockMap = readBlockMap(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
			await this.doDownload(await readEmbeddedBlockMapData(this.options.oldFile), newBlockMap);
		}
	};
	exports.FileWithEmbeddedBlockMapDifferentialDownloader = FileWithEmbeddedBlockMapDifferentialDownloader;
	function readBlockMap(data) {
		return JSON.parse((0, zlib_1.inflateRawSync)(data).toString());
	}
	async function readEmbeddedBlockMapData(file) {
		const fd = await (0, fs_extra_1$4.open)(file, "r");
		try {
			const fileSize = (await (0, fs_extra_1$4.fstat)(fd)).size;
			const sizeBuffer = Buffer.allocUnsafe(4);
			await (0, fs_extra_1$4.read)(fd, sizeBuffer, 0, sizeBuffer.length, fileSize - sizeBuffer.length);
			const dataBuffer = Buffer.allocUnsafe(sizeBuffer.readUInt32BE(0));
			await (0, fs_extra_1$4.read)(fd, dataBuffer, 0, dataBuffer.length, fileSize - sizeBuffer.length - dataBuffer.length);
			await (0, fs_extra_1$4.close)(fd);
			return readBlockMap(dataBuffer);
		} catch (e) {
			await (0, fs_extra_1$4.close)(fd);
			throw e;
		}
	}
}));
var require_AppImageUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$3 = require_out();
	var child_process_1$2 = __require("child_process");
	var fs_extra_1$3 = require_lib$7();
	var fs_1$1 = __require("fs");
	var path$6 = __require("path");
	var BaseUpdater_1$5 = require_BaseUpdater();
	var FileWithEmbeddedBlockMapDifferentialDownloader_1$1 = require_FileWithEmbeddedBlockMapDifferentialDownloader();
	var Provider_1$6 = require_Provider();
	var types_1$4 = require_types();
	var AppImageUpdater = class extends BaseUpdater_1$5.BaseUpdater {
		constructor(options$1, app$1) {
			super(options$1, app$1);
		}
		isUpdaterActive() {
			if (process.env["APPIMAGE"] == null) {
				if (process.env["SNAP"] == null) this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage");
				else this._logger.info("SNAP env is defined, updater is disabled");
				return false;
			}
			return super.isUpdaterActive();
		}
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1$6.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "AppImage", [
				"rpm",
				"deb",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "AppImage",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					const oldFile = process.env["APPIMAGE"];
					if (oldFile == null) throw (0, builder_util_runtime_1$3.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
					if (downloadUpdateOptions.disableDifferentialDownload || await this.downloadDifferential(fileInfo, oldFile, updateFile, provider, downloadUpdateOptions)) await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
					await (0, fs_extra_1$3.chmod)(updateFile, 493);
				}
			});
		}
		async downloadDifferential(fileInfo, oldFile, updateFile, provider, downloadUpdateOptions) {
			try {
				const downloadOptions = {
					newUrl: fileInfo.url,
					oldFile,
					logger: this._logger,
					newFile: updateFile,
					isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
					requestHeaders: downloadUpdateOptions.requestHeaders,
					cancellationToken: downloadUpdateOptions.cancellationToken
				};
				if (this.listenerCount(types_1$4.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1$4.DOWNLOAD_PROGRESS, it);
				await new FileWithEmbeddedBlockMapDifferentialDownloader_1$1.FileWithEmbeddedBlockMapDifferentialDownloader(fileInfo.info, this.httpExecutor, downloadOptions).download();
				return false;
			} catch (e) {
				this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
				return process.platform === "linux";
			}
		}
		doInstall(options$1) {
			const appImageFile = process.env["APPIMAGE"];
			if (appImageFile == null) throw (0, builder_util_runtime_1$3.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
			(0, fs_1$1.unlinkSync)(appImageFile);
			let destination;
			const existingBaseName = path$6.basename(appImageFile);
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No valid update available, can't quit and install"));
				return false;
			}
			if (path$6.basename(installerPath) === existingBaseName || !/\d+\.\d+\.\d+/.test(existingBaseName)) destination = appImageFile;
			else destination = path$6.join(path$6.dirname(appImageFile), path$6.basename(installerPath));
			(0, child_process_1$2.execFileSync)("mv", [
				"-f",
				installerPath,
				destination
			]);
			if (destination !== appImageFile) this.emit("appimage-filename-updated", destination);
			const env = {
				...process.env,
				APPIMAGE_SILENT_INSTALL: "true"
			};
			if (options$1.isForceRunAfter) this.spawnLog(destination, [], env);
			else {
				env.APPIMAGE_EXIT_AFTER_INSTALL = "true";
				(0, child_process_1$2.execFileSync)(destination, [], { env });
			}
			return true;
		}
	};
	exports.AppImageUpdater = AppImageUpdater;
}));
var require_DebUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var BaseUpdater_1$4 = require_BaseUpdater();
	var Provider_1$5 = require_Provider();
	var types_1$3 = require_types();
	var DebUpdater = class extends BaseUpdater_1$4.BaseUpdater {
		constructor(options$1, app$1) {
			super(options$1, app$1);
		}
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1$5.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "deb", [
				"AppImage",
				"rpm",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "deb",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					if (this.listenerCount(types_1$3.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1$3.DOWNLOAD_PROGRESS, it);
					await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
				}
			});
		}
		get installerPath() {
			var _a$1, _b;
			return (_b = (_a$1 = super.installerPath) === null || _a$1 === void 0 ? void 0 : _a$1.replace(/ /g, "\\ ")) !== null && _b !== void 0 ? _b : null;
		}
		doInstall(options$1) {
			const sudo = this.wrapSudo();
			const wrapper = /pkexec/i.test(sudo) ? "" : `"`;
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No valid update available, can't quit and install"));
				return false;
			}
			const cmd = [
				"dpkg",
				"-i",
				installerPath,
				"||",
				"apt-get",
				"install",
				"-f",
				"-y"
			];
			this.spawnSyncLog(sudo, [
				`${wrapper}/bin/bash`,
				"-c",
				`'${cmd.join(" ")}'${wrapper}`
			]);
			if (options$1.isForceRunAfter) this.app.relaunch();
			return true;
		}
	};
	exports.DebUpdater = DebUpdater;
}));
var require_PacmanUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var BaseUpdater_1$3 = require_BaseUpdater();
	var types_1$2 = require_types();
	var Provider_1$4 = require_Provider();
	var PacmanUpdater = class extends BaseUpdater_1$3.BaseUpdater {
		constructor(options$1, app$1) {
			super(options$1, app$1);
		}
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1$4.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "pacman", [
				"AppImage",
				"deb",
				"rpm"
			]);
			return this.executeDownload({
				fileExtension: "pacman",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					if (this.listenerCount(types_1$2.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1$2.DOWNLOAD_PROGRESS, it);
					await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
				}
			});
		}
		get installerPath() {
			var _a$1, _b;
			return (_b = (_a$1 = super.installerPath) === null || _a$1 === void 0 ? void 0 : _a$1.replace(/ /g, "\\ ")) !== null && _b !== void 0 ? _b : null;
		}
		doInstall(options$1) {
			const sudo = this.wrapSudo();
			const wrapper = /pkexec/i.test(sudo) ? "" : `"`;
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No valid update available, can't quit and install"));
				return false;
			}
			const cmd = [
				"pacman",
				"-U",
				"--noconfirm",
				installerPath
			];
			this.spawnSyncLog(sudo, [
				`${wrapper}/bin/bash`,
				"-c",
				`'${cmd.join(" ")}'${wrapper}`
			]);
			if (options$1.isForceRunAfter) this.app.relaunch();
			return true;
		}
	};
	exports.PacmanUpdater = PacmanUpdater;
}));
var require_RpmUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var BaseUpdater_1$2 = require_BaseUpdater();
	var types_1$1 = require_types();
	var Provider_1$3 = require_Provider();
	var RpmUpdater = class extends BaseUpdater_1$2.BaseUpdater {
		constructor(options$1, app$1) {
			super(options$1, app$1);
		}
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1$3.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "rpm", [
				"AppImage",
				"deb",
				"pacman"
			]);
			return this.executeDownload({
				fileExtension: "rpm",
				fileInfo,
				downloadUpdateOptions,
				task: async (updateFile, downloadOptions) => {
					if (this.listenerCount(types_1$1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1$1.DOWNLOAD_PROGRESS, it);
					await this.httpExecutor.download(fileInfo.url, updateFile, downloadOptions);
				}
			});
		}
		get installerPath() {
			var _a$1, _b;
			return (_b = (_a$1 = super.installerPath) === null || _a$1 === void 0 ? void 0 : _a$1.replace(/ /g, "\\ ")) !== null && _b !== void 0 ? _b : null;
		}
		doInstall(options$1) {
			const sudo = this.wrapSudo();
			const wrapper = /pkexec/i.test(sudo) ? "" : `"`;
			const packageManager = this.spawnSyncLog("which zypper");
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No valid update available, can't quit and install"));
				return false;
			}
			let cmd;
			if (!packageManager) cmd = [
				this.spawnSyncLog("which dnf || which yum"),
				"-y",
				"install",
				installerPath
			];
			else cmd = [
				packageManager,
				"--no-refresh",
				"install",
				"--allow-unsigned-rpm",
				"-y",
				"-f",
				installerPath
			];
			this.spawnSyncLog(sudo, [
				`${wrapper}/bin/bash`,
				"-c",
				`'${cmd.join(" ")}'${wrapper}`
			]);
			if (options$1.isForceRunAfter) this.app.relaunch();
			return true;
		}
	};
	exports.RpmUpdater = RpmUpdater;
}));
var require_MacUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1$2 = require_out();
	var fs_extra_1$2 = require_lib$7();
	var fs_1 = __require("fs");
	var path$5 = __require("path");
	var http_1 = __require("http");
	var AppUpdater_1$1 = require_AppUpdater();
	var Provider_1$2 = require_Provider();
	var child_process_1$1 = __require("child_process");
	var crypto_1 = __require("crypto");
	var MacUpdater = class extends AppUpdater_1$1.AppUpdater {
		constructor(options$1, app$1) {
			super(options$1, app$1);
			this.nativeUpdater = __require("electron").autoUpdater;
			this.squirrelDownloadedUpdate = false;
			this.nativeUpdater.on("error", (it) => {
				this._logger.warn(it);
				this.emit("error", it);
			});
			this.nativeUpdater.on("update-downloaded", () => {
				this.squirrelDownloadedUpdate = true;
				this.debug("nativeUpdater.update-downloaded");
			});
		}
		debug(message) {
			if (this._logger.debug != null) this._logger.debug(message);
		}
		closeServerIfExists() {
			if (this.server) {
				this.debug("Closing proxy server");
				this.server.close((err) => {
					if (err) this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
				});
			}
		}
		async doDownloadUpdate(downloadUpdateOptions) {
			let files = downloadUpdateOptions.updateInfoAndProvider.provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info);
			const log = this._logger;
			const sysctlRosettaInfoKey = "sysctl.proc_translated";
			let isRosetta = false;
			try {
				this.debug("Checking for macOS Rosetta environment");
				isRosetta = (0, child_process_1$1.execFileSync)("sysctl", [sysctlRosettaInfoKey], { encoding: "utf8" }).includes(`${sysctlRosettaInfoKey}: 1`);
				log.info(`Checked for macOS Rosetta environment (isRosetta=${isRosetta})`);
			} catch (e) {
				log.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${e}`);
			}
			let isArm64Mac = false;
			try {
				this.debug("Checking for arm64 in uname");
				const isArm = (0, child_process_1$1.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
				log.info(`Checked 'uname -a': arm64=${isArm}`);
				isArm64Mac = isArm64Mac || isArm;
			} catch (e) {
				log.warn(`uname shell command to check for arm64 failed: ${e}`);
			}
			isArm64Mac = isArm64Mac || process.arch === "arm64" || isRosetta;
			const isArm64 = (file) => {
				var _a$1;
				return file.url.pathname.includes("arm64") || ((_a$1 = file.info.url) === null || _a$1 === void 0 ? void 0 : _a$1.includes("arm64"));
			};
			if (isArm64Mac && files.some(isArm64)) files = files.filter((file) => isArm64Mac === isArm64(file));
			else files = files.filter((file) => !isArm64(file));
			const zipFileInfo = (0, Provider_1$2.findFile)(files, "zip", ["pkg", "dmg"]);
			if (zipFileInfo == null) throw (0, builder_util_runtime_1$2.newError)(`ZIP file not provided: ${(0, builder_util_runtime_1$2.safeStringifyJson)(files)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const CURRENT_MAC_APP_ZIP_FILE_NAME = "update.zip";
			return this.executeDownload({
				fileExtension: "zip",
				fileInfo: zipFileInfo,
				downloadUpdateOptions,
				task: async (destinationFile, downloadOptions) => {
					const cachedUpdateFilePath = path$5.join(this.downloadedUpdateHelper.cacheDir, CURRENT_MAC_APP_ZIP_FILE_NAME);
					const canDifferentialDownload = () => {
						if (!(0, fs_extra_1$2.pathExistsSync)(cachedUpdateFilePath)) {
							log.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download");
							return false;
						}
						return !downloadUpdateOptions.disableDifferentialDownload;
					};
					let differentialDownloadFailed = true;
					if (canDifferentialDownload()) differentialDownloadFailed = await this.differentialDownloadInstaller(zipFileInfo, downloadUpdateOptions, destinationFile, provider, CURRENT_MAC_APP_ZIP_FILE_NAME);
					if (differentialDownloadFailed) await this.httpExecutor.download(zipFileInfo.url, destinationFile, downloadOptions);
				},
				done: async (event) => {
					if (!downloadUpdateOptions.disableDifferentialDownload) try {
						const cachedUpdateFilePath = path$5.join(this.downloadedUpdateHelper.cacheDir, CURRENT_MAC_APP_ZIP_FILE_NAME);
						await (0, fs_extra_1$2.copyFile)(event.downloadedFile, cachedUpdateFilePath);
					} catch (error) {
						this._logger.warn(`Unable to copy file for caching for future differential downloads: ${error.message}`);
					}
					return this.updateDownloaded(zipFileInfo, event);
				}
			});
		}
		async updateDownloaded(zipFileInfo, event) {
			var _a$1;
			const downloadedFile = event.downloadedFile;
			const updateFileSize = (_a$1 = zipFileInfo.info.size) !== null && _a$1 !== void 0 ? _a$1 : (await (0, fs_extra_1$2.stat)(downloadedFile)).size;
			const log = this._logger;
			const logContext = `fileToProxy=${zipFileInfo.url.href}`;
			this.closeServerIfExists();
			this.debug(`Creating proxy server for native Squirrel.Mac (${logContext})`);
			this.server = (0, http_1.createServer)();
			this.debug(`Proxy server for native Squirrel.Mac is created (${logContext})`);
			this.server.on("close", () => {
				log.info(`Proxy server for native Squirrel.Mac is closed (${logContext})`);
			});
			const getServerUrl = (s) => {
				const address = s.address();
				if (typeof address === "string") return address;
				return `http://127.0.0.1:${address === null || address === void 0 ? void 0 : address.port}`;
			};
			return await new Promise((resolve, reject) => {
				const pass = (0, crypto_1.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-");
				const authInfo = Buffer.from(`autoupdater:${pass}`, "ascii");
				const fileUrl = `/${(0, crypto_1.randomBytes)(64).toString("hex")}.zip`;
				this.server.on("request", (request, response) => {
					const requestUrl = request.url;
					log.info(`${requestUrl} requested`);
					if (requestUrl === "/") {
						if (!request.headers.authorization || request.headers.authorization.indexOf("Basic ") === -1) {
							response.statusCode = 401;
							response.statusMessage = "Invalid Authentication Credentials";
							response.end();
							log.warn("No authenthication info");
							return;
						}
						const base64Credentials = request.headers.authorization.split(" ")[1];
						const [username, password] = Buffer.from(base64Credentials, "base64").toString("ascii").split(":");
						if (username !== "autoupdater" || password !== pass) {
							response.statusCode = 401;
							response.statusMessage = "Invalid Authentication Credentials";
							response.end();
							log.warn("Invalid authenthication credentials");
							return;
						}
						const data = Buffer.from(`{ "url": "${getServerUrl(this.server)}${fileUrl}" }`);
						response.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": data.length
						});
						response.end(data);
						return;
					}
					if (!requestUrl.startsWith(fileUrl)) {
						log.warn(`${requestUrl} requested, but not supported`);
						response.writeHead(404);
						response.end();
						return;
					}
					log.info(`${fileUrl} requested by Squirrel.Mac, pipe ${downloadedFile}`);
					let errorOccurred = false;
					response.on("finish", () => {
						if (!errorOccurred) {
							this.nativeUpdater.removeListener("error", reject);
							resolve([]);
						}
					});
					const readStream = (0, fs_1.createReadStream)(downloadedFile);
					readStream.on("error", (error) => {
						try {
							response.end();
						} catch (e) {
							log.warn(`cannot end response: ${e}`);
						}
						errorOccurred = true;
						this.nativeUpdater.removeListener("error", reject);
						reject(/* @__PURE__ */ new Error(`Cannot pipe "${downloadedFile}": ${error}`));
					});
					response.writeHead(200, {
						"Content-Type": "application/zip",
						"Content-Length": updateFileSize
					});
					readStream.pipe(response);
				});
				this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${logContext})`);
				this.server.listen(0, "127.0.0.1", () => {
					this.debug(`Proxy server for native Squirrel.Mac is listening (address=${getServerUrl(this.server)}, ${logContext})`);
					this.nativeUpdater.setFeedURL({
						url: getServerUrl(this.server),
						headers: {
							"Cache-Control": "no-cache",
							Authorization: `Basic ${authInfo.toString("base64")}`
						}
					});
					this.dispatchUpdateDownloaded(event);
					if (this.autoInstallOnAppQuit) {
						this.nativeUpdater.once("error", reject);
						this.nativeUpdater.checkForUpdates();
					} else resolve([]);
				});
			});
		}
		handleUpdateDownloaded() {
			if (this.autoRunAppAfterInstall) this.nativeUpdater.quitAndInstall();
			else this.app.quit();
			this.closeServerIfExists();
		}
		quitAndInstall() {
			if (this.squirrelDownloadedUpdate) this.handleUpdateDownloaded();
			else {
				this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded());
				if (!this.autoInstallOnAppQuit) this.nativeUpdater.checkForUpdates();
			}
		}
	};
	exports.MacUpdater = MacUpdater;
}));
var require_windowsExecutableCodeSignatureVerifier = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.verifySignature = verifySignature;
	var builder_util_runtime_1$1 = require_out();
	var child_process_1 = __require("child_process");
	var os$1 = __require("os");
	var path$4 = __require("path");
	function verifySignature(publisherNames, unescapedTempUpdateFile, logger) {
		return new Promise((resolve, reject) => {
			const tempUpdateFile = unescapedTempUpdateFile.replace(/'/g, "''");
			logger.info(`Verifying signature ${tempUpdateFile}`);
			(0, child_process_1.execFile)(`set "PSModulePath=" & chcp 65001 >NUL & powershell.exe`, [
				"-NoProfile",
				"-NonInteractive",
				"-InputFormat",
				"None",
				"-Command",
				`"Get-AuthenticodeSignature -LiteralPath '${tempUpdateFile}' | ConvertTo-Json -Compress"`
			], {
				shell: true,
				timeout: 20 * 1e3
			}, (error, stdout, stderr) => {
				var _a$1;
				try {
					if (error != null || stderr) {
						handleError(logger, error, stderr, reject);
						resolve(null);
						return;
					}
					const data = parseOut(stdout);
					if (data.Status === 0) {
						try {
							const normlaizedUpdateFilePath = path$4.normalize(data.Path);
							const normalizedTempUpdateFile = path$4.normalize(unescapedTempUpdateFile);
							logger.info(`LiteralPath: ${normlaizedUpdateFilePath}. Update Path: ${normalizedTempUpdateFile}`);
							if (normlaizedUpdateFilePath !== normalizedTempUpdateFile) {
								handleError(logger, /* @__PURE__ */ new Error(`LiteralPath of ${normlaizedUpdateFilePath} is different than ${normalizedTempUpdateFile}`), stderr, reject);
								resolve(null);
								return;
							}
						} catch (error$1) {
							logger.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(_a$1 = error$1.message) !== null && _a$1 !== void 0 ? _a$1 : error$1.stack}`);
						}
						const subject = (0, builder_util_runtime_1$1.parseDn)(data.SignerCertificate.Subject);
						let match = false;
						for (const name$1 of publisherNames) {
							const dn = (0, builder_util_runtime_1$1.parseDn)(name$1);
							if (dn.size) match = Array.from(dn.keys()).every((key) => {
								return dn.get(key) === subject.get(key);
							});
							else if (name$1 === subject.get("CN")) {
								logger.warn(`Signature validated using only CN ${name$1}. Please add your full Distinguished Name (DN) to publisherNames configuration`);
								match = true;
							}
							if (match) {
								resolve(null);
								return;
							}
						}
					}
					const result = `publisherNames: ${publisherNames.join(" | ")}, raw info: ` + JSON.stringify(data, (name$1, value) => name$1 === "RawData" ? void 0 : value, 2);
					logger.warn(`Sign verification failed, installer signed with incorrect certificate: ${result}`);
					resolve(result);
				} catch (e) {
					handleError(logger, e, null, reject);
					resolve(null);
					return;
				}
			});
		});
	}
	function parseOut(out) {
		const data = JSON.parse(out);
		delete data.PrivateKey;
		delete data.IsOSBinary;
		delete data.SignatureType;
		const signerCertificate = data.SignerCertificate;
		if (signerCertificate != null) {
			delete signerCertificate.Archived;
			delete signerCertificate.Extensions;
			delete signerCertificate.Handle;
			delete signerCertificate.HasPrivateKey;
			delete signerCertificate.SubjectName;
		}
		return data;
	}
	function handleError(logger, error, stderr, reject) {
		if (isOldWin6()) {
			logger.warn(`Cannot execute Get-AuthenticodeSignature: ${error || stderr}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
			return;
		}
		try {
			(0, child_process_1.execFileSync)("powershell.exe", [
				"-NoProfile",
				"-NonInteractive",
				"-Command",
				"ConvertTo-Json test"
			], { timeout: 10 * 1e3 });
		} catch (testError) {
			logger.warn(`Cannot execute ConvertTo-Json: ${testError.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
			return;
		}
		if (error != null) reject(error);
		if (stderr) reject(/* @__PURE__ */ new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${stderr}. Failing signature validation due to unknown stderr.`));
	}
	function isOldWin6() {
		const winVersion = os$1.release();
		return winVersion.startsWith("6.") && !winVersion.startsWith("6.3");
	}
}));
var require_NsisUpdater = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var builder_util_runtime_1 = require_out();
	var path$3 = __require("path");
	var BaseUpdater_1$1 = require_BaseUpdater();
	var FileWithEmbeddedBlockMapDifferentialDownloader_1 = require_FileWithEmbeddedBlockMapDifferentialDownloader();
	var types_1 = require_types();
	var Provider_1$1 = require_Provider();
	var fs_extra_1$1 = require_lib$7();
	var windowsExecutableCodeSignatureVerifier_1 = require_windowsExecutableCodeSignatureVerifier();
	var url_1 = __require("url");
	var NsisUpdater = class extends BaseUpdater_1$1.BaseUpdater {
		constructor(options$1, app$1) {
			super(options$1, app$1);
			this._verifyUpdateCodeSignature = (publisherNames, unescapedTempUpdateFile) => (0, windowsExecutableCodeSignatureVerifier_1.verifySignature)(publisherNames, unescapedTempUpdateFile, this._logger);
		}
		get verifyUpdateCodeSignature() {
			return this._verifyUpdateCodeSignature;
		}
		set verifyUpdateCodeSignature(value) {
			if (value) this._verifyUpdateCodeSignature = value;
		}
		doDownloadUpdate(downloadUpdateOptions) {
			const provider = downloadUpdateOptions.updateInfoAndProvider.provider;
			const fileInfo = (0, Provider_1$1.findFile)(provider.resolveFiles(downloadUpdateOptions.updateInfoAndProvider.info), "exe");
			return this.executeDownload({
				fileExtension: "exe",
				downloadUpdateOptions,
				fileInfo,
				task: async (destinationFile, downloadOptions, packageFile, removeTempDirIfAny) => {
					const packageInfo = fileInfo.packageInfo;
					const isWebInstaller = packageInfo != null && packageFile != null;
					if (isWebInstaller && downloadUpdateOptions.disableWebInstaller) throw (0, builder_util_runtime_1.newError)(`Unable to download new version ${downloadUpdateOptions.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
					if (!isWebInstaller && !downloadUpdateOptions.disableWebInstaller) this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version.");
					if (isWebInstaller || downloadUpdateOptions.disableDifferentialDownload || await this.differentialDownloadInstaller(fileInfo, downloadUpdateOptions, destinationFile, provider, builder_util_runtime_1.CURRENT_APP_INSTALLER_FILE_NAME)) await this.httpExecutor.download(fileInfo.url, destinationFile, downloadOptions);
					const signatureVerificationStatus = await this.verifySignature(destinationFile);
					if (signatureVerificationStatus != null) {
						await removeTempDirIfAny();
						throw (0, builder_util_runtime_1.newError)(`New version ${downloadUpdateOptions.updateInfoAndProvider.info.version} is not signed by the application owner: ${signatureVerificationStatus}`, "ERR_UPDATER_INVALID_SIGNATURE");
					}
					if (isWebInstaller) {
						if (await this.differentialDownloadWebPackage(downloadUpdateOptions, packageInfo, packageFile, provider)) try {
							await this.httpExecutor.download(new url_1.URL(packageInfo.path), packageFile, {
								headers: downloadUpdateOptions.requestHeaders,
								cancellationToken: downloadUpdateOptions.cancellationToken,
								sha512: packageInfo.sha512
							});
						} catch (e) {
							try {
								await (0, fs_extra_1$1.unlink)(packageFile);
							} catch (_ignored) {}
							throw e;
						}
					}
				}
			});
		}
		async verifySignature(tempUpdateFile) {
			let publisherName;
			try {
				publisherName = (await this.configOnDisk.value).publisherName;
				if (publisherName == null) return null;
			} catch (e) {
				if (e.code === "ENOENT") return null;
				throw e;
			}
			return await this._verifyUpdateCodeSignature(Array.isArray(publisherName) ? publisherName : [publisherName], tempUpdateFile);
		}
		doInstall(options$1) {
			const installerPath = this.installerPath;
			if (installerPath == null) {
				this.dispatchError(/* @__PURE__ */ new Error("No valid update available, can't quit and install"));
				return false;
			}
			const args = ["--updated"];
			if (options$1.isSilent) args.push("/S");
			if (options$1.isForceRunAfter) args.push("--force-run");
			if (this.installDirectory) args.push(`/D=${this.installDirectory}`);
			const packagePath = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
			if (packagePath != null) args.push(`--package-file=${packagePath}`);
			const callUsingElevation = () => {
				this.spawnLog(path$3.join(process.resourcesPath, "elevate.exe"), [installerPath].concat(args)).catch((e) => this.dispatchError(e));
			};
			if (options$1.isAdminRightsRequired) {
				this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe");
				callUsingElevation();
				return true;
			}
			this.spawnLog(installerPath, args).catch((e) => {
				const errorCode = e.code;
				this._logger.info(`Cannot run installer: error code: ${errorCode}, error message: "${e.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`);
				if (errorCode === "UNKNOWN" || errorCode === "EACCES") callUsingElevation();
				else if (errorCode === "ENOENT") __require("electron").shell.openPath(installerPath).catch((err) => this.dispatchError(err));
				else this.dispatchError(e);
			});
			return true;
		}
		async differentialDownloadWebPackage(downloadUpdateOptions, packageInfo, packagePath, provider) {
			if (packageInfo.blockMapSize == null) return true;
			try {
				const downloadOptions = {
					newUrl: new url_1.URL(packageInfo.path),
					oldFile: path$3.join(this.downloadedUpdateHelper.cacheDir, builder_util_runtime_1.CURRENT_APP_PACKAGE_FILE_NAME),
					logger: this._logger,
					newFile: packagePath,
					requestHeaders: this.requestHeaders,
					isUseMultipleRangeRequest: provider.isUseMultipleRangeRequest,
					cancellationToken: downloadUpdateOptions.cancellationToken
				};
				if (this.listenerCount(types_1.DOWNLOAD_PROGRESS) > 0) downloadOptions.onProgress = (it) => this.emit(types_1.DOWNLOAD_PROGRESS, it);
				await new FileWithEmbeddedBlockMapDifferentialDownloader_1.FileWithEmbeddedBlockMapDifferentialDownloader(packageInfo, this.httpExecutor, downloadOptions).download();
			} catch (e) {
				this._logger.error(`Cannot download differentially, fallback to full download: ${e.stack || e}`);
				return process.platform === "win32";
			}
			return false;
		}
	};
	exports.NsisUpdater = NsisUpdater;
}));
var import_main = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$6 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar$2 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$6(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NsisUpdater = exports.MacUpdater = exports.RpmUpdater = exports.PacmanUpdater = exports.DebUpdater = exports.AppImageUpdater = exports.Provider = exports.NoOpLogger = exports.AppUpdater = exports.BaseUpdater = void 0;
	var fs_extra_1 = require_lib$7();
	var path$2 = __require("path");
	var BaseUpdater_1 = require_BaseUpdater();
	Object.defineProperty(exports, "BaseUpdater", {
		enumerable: true,
		get: function() {
			return BaseUpdater_1.BaseUpdater;
		}
	});
	var AppUpdater_1 = require_AppUpdater();
	Object.defineProperty(exports, "AppUpdater", {
		enumerable: true,
		get: function() {
			return AppUpdater_1.AppUpdater;
		}
	});
	Object.defineProperty(exports, "NoOpLogger", {
		enumerable: true,
		get: function() {
			return AppUpdater_1.NoOpLogger;
		}
	});
	var Provider_1 = require_Provider();
	Object.defineProperty(exports, "Provider", {
		enumerable: true,
		get: function() {
			return Provider_1.Provider;
		}
	});
	var AppImageUpdater_1 = require_AppImageUpdater();
	Object.defineProperty(exports, "AppImageUpdater", {
		enumerable: true,
		get: function() {
			return AppImageUpdater_1.AppImageUpdater;
		}
	});
	var DebUpdater_1 = require_DebUpdater();
	Object.defineProperty(exports, "DebUpdater", {
		enumerable: true,
		get: function() {
			return DebUpdater_1.DebUpdater;
		}
	});
	var PacmanUpdater_1 = require_PacmanUpdater();
	Object.defineProperty(exports, "PacmanUpdater", {
		enumerable: true,
		get: function() {
			return PacmanUpdater_1.PacmanUpdater;
		}
	});
	var RpmUpdater_1 = require_RpmUpdater();
	Object.defineProperty(exports, "RpmUpdater", {
		enumerable: true,
		get: function() {
			return RpmUpdater_1.RpmUpdater;
		}
	});
	var MacUpdater_1 = require_MacUpdater();
	Object.defineProperty(exports, "MacUpdater", {
		enumerable: true,
		get: function() {
			return MacUpdater_1.MacUpdater;
		}
	});
	var NsisUpdater_1 = require_NsisUpdater();
	Object.defineProperty(exports, "NsisUpdater", {
		enumerable: true,
		get: function() {
			return NsisUpdater_1.NsisUpdater;
		}
	});
	__exportStar$2(require_types(), exports);
	var _autoUpdater;
	function doLoadAutoUpdater() {
		if (process.platform === "win32") _autoUpdater = new (require_NsisUpdater()).NsisUpdater();
		else if (process.platform === "darwin") _autoUpdater = new (require_MacUpdater()).MacUpdater();
		else {
			_autoUpdater = new (require_AppImageUpdater()).AppImageUpdater();
			try {
				const identity = path$2.join(process.resourcesPath, "package-type");
				if (!(0, fs_extra_1.existsSync)(identity)) return _autoUpdater;
				console.info("Checking for beta autoupdate feature for deb/rpm distributions");
				const fileType = (0, fs_extra_1.readFileSync)(identity).toString().trim();
				console.info("Found package-type:", fileType);
				switch (fileType) {
					case "deb":
						_autoUpdater = new (require_DebUpdater()).DebUpdater();
						break;
					case "rpm":
						_autoUpdater = new (require_RpmUpdater()).RpmUpdater();
						break;
					case "pacman":
						_autoUpdater = new (require_PacmanUpdater()).PacmanUpdater();
						break;
					default: break;
				}
			} catch (error) {
				console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", error.message);
			}
		}
		return _autoUpdater;
	}
	Object.defineProperty(exports, "autoUpdater", {
		enumerable: true,
		get: () => {
			return _autoUpdater || doLoadAutoUpdater();
		}
	});
})))());
var import_electron_localshortcut = /* @__PURE__ */ __toESM(require_electron_localshortcut());
var isMacOS = process$1.platform === "darwin";
var developmentToolsOptions = /* @__PURE__ */ new Map();
function toggleDevelopmentTools(win = BrowserWindow.getFocusedWindow()) {
	if (win) {
		const { webContents } = win;
		if (webContents.isDevToolsOpened()) webContents.closeDevTools();
		else webContents.openDevTools(developmentToolsOptions.get(win));
	}
}
function shouldRun(options$1) {
	return options$1 && (options$1.isEnabled === true || options$1.isEnabled === null && electron_is_dev_default);
}
function getOptionsForWindow(win, options$1) {
	if (!options$1.windowSelector) return options$1;
	const newOptions = options$1.windowSelector(win);
	return newOptions === true ? options$1 : newOptions === false ? { isEnabled: false } : {
		...options$1,
		...newOptions
	};
}
async function registerAccelerators(win = BrowserWindow.getFocusedWindow()) {
	await app.whenReady();
	if (win) {
		import_electron_localshortcut.default.register(win, "CommandOrControl+Shift+C", inspectElements);
		import_electron_localshortcut.default.register(win, isMacOS ? "Command+Alt+I" : "Control+Shift+I", devTools);
		import_electron_localshortcut.default.register(win, "F12", devTools);
		import_electron_localshortcut.default.register(win, "CommandOrControl+R", refresh);
		import_electron_localshortcut.default.register(win, "F5", refresh);
	} else {
		import_electron_localshortcut.default.register("CommandOrControl+Shift+C", inspectElements);
		import_electron_localshortcut.default.register(isMacOS ? "Command+Alt+I" : "Control+Shift+I", devTools);
		import_electron_localshortcut.default.register("F12", devTools);
		import_electron_localshortcut.default.register("CommandOrControl+R", refresh);
		import_electron_localshortcut.default.register("F5", refresh);
	}
}
function devTools(win = BrowserWindow.getFocusedWindow()) {
	if (win) toggleDevelopmentTools(win);
}
function openDevTools(win = BrowserWindow.getFocusedWindow()) {
	if (win) win.webContents.openDevTools(developmentToolsOptions.get(win));
}
function refresh(win = BrowserWindow.getFocusedWindow()) {
	if (win) win.webContents.reloadIgnoringCache();
}
function inspectElements() {
	const win = BrowserWindow.getFocusedWindow();
	const inspect$1 = () => {
		win.devToolsWebContents.executeJavaScript("DevToolsAPI.enterInspectElementMode()");
	};
	if (win) if (win.webContents.isDevToolsOpened()) inspect$1();
	else {
		win.webContents.once("devtools-opened", inspect$1);
		win.openDevTools();
	}
}
function debug(options$1) {
	options$1 = {
		isEnabled: null,
		showDevTools: true,
		devToolsMode: "previous",
		...options$1
	};
	if (!options$1.windowSelector) {
		if (!shouldRun(options$1)) return;
		registerAccelerators();
	}
	app.on("browser-window-created", (event, win) => {
		win.webContents.once("dom-ready", () => {
			const winOptions = getOptionsForWindow(win, options$1);
			if (winOptions.devToolsMode !== "previous") developmentToolsOptions.set(win, {
				...developmentToolsOptions.get(win),
				mode: winOptions.devToolsMode
			});
			if (!shouldRun(winOptions)) return;
			if (winOptions.windowSelector) registerAccelerators(win);
			if (winOptions.showDevTools) openDevTools(win);
		});
	});
}
var require_he = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root$3) {
		var freeExports$1 = typeof exports == "object" && exports;
		var freeModule$1 = typeof module == "object" && module && module.exports == freeExports$1 && module;
		var freeGlobal$3 = typeof global == "object" && global;
		if (freeGlobal$3.global === freeGlobal$3 || freeGlobal$3.window === freeGlobal$3) root$3 = freeGlobal$3;
		var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
		var regexAsciiWhitelist = /[\x01-\x7F]/g;
		var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
		var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
		var encodeMap = {
			"­": "shy",
			"‌": "zwnj",
			"‍": "zwj",
			"‎": "lrm",
			"⁣": "ic",
			"⁢": "it",
			"⁡": "af",
			"‏": "rlm",
			"​": "ZeroWidthSpace",
			"⁠": "NoBreak",
			"̑": "DownBreve",
			"⃛": "tdot",
			"⃜": "DotDot",
			"	": "Tab",
			"\n": "NewLine",
			" ": "puncsp",
			" ": "MediumSpace",
			" ": "thinsp",
			" ": "hairsp",
			" ": "emsp13",
			" ": "ensp",
			" ": "emsp14",
			" ": "emsp",
			" ": "numsp",
			"\xA0": "nbsp",
			"  ": "ThickSpace",
			"‾": "oline",
			"_": "lowbar",
			"‐": "dash",
			"–": "ndash",
			"—": "mdash",
			"―": "horbar",
			",": "comma",
			";": "semi",
			"⁏": "bsemi",
			":": "colon",
			"⩴": "Colone",
			"!": "excl",
			"¡": "iexcl",
			"?": "quest",
			"¿": "iquest",
			".": "period",
			"‥": "nldr",
			"…": "mldr",
			"·": "middot",
			"'": "apos",
			"‘": "lsquo",
			"’": "rsquo",
			"‚": "sbquo",
			"‹": "lsaquo",
			"›": "rsaquo",
			"\"": "quot",
			"“": "ldquo",
			"”": "rdquo",
			"„": "bdquo",
			"«": "laquo",
			"»": "raquo",
			"(": "lpar",
			")": "rpar",
			"[": "lsqb",
			"]": "rsqb",
			"{": "lcub",
			"}": "rcub",
			"⌈": "lceil",
			"⌉": "rceil",
			"⌊": "lfloor",
			"⌋": "rfloor",
			"⦅": "lopar",
			"⦆": "ropar",
			"⦋": "lbrke",
			"⦌": "rbrke",
			"⦍": "lbrkslu",
			"⦎": "rbrksld",
			"⦏": "lbrksld",
			"⦐": "rbrkslu",
			"⦑": "langd",
			"⦒": "rangd",
			"⦓": "lparlt",
			"⦔": "rpargt",
			"⦕": "gtlPar",
			"⦖": "ltrPar",
			"⟦": "lobrk",
			"⟧": "robrk",
			"⟨": "lang",
			"⟩": "rang",
			"⟪": "Lang",
			"⟫": "Rang",
			"⟬": "loang",
			"⟭": "roang",
			"❲": "lbbrk",
			"❳": "rbbrk",
			"‖": "Vert",
			"§": "sect",
			"¶": "para",
			"@": "commat",
			"*": "ast",
			"/": "sol",
			"undefined": null,
			"&": "amp",
			"#": "num",
			"%": "percnt",
			"‰": "permil",
			"‱": "pertenk",
			"†": "dagger",
			"‡": "Dagger",
			"•": "bull",
			"⁃": "hybull",
			"′": "prime",
			"″": "Prime",
			"‴": "tprime",
			"⁗": "qprime",
			"‵": "bprime",
			"⁁": "caret",
			"`": "grave",
			"´": "acute",
			"˜": "tilde",
			"^": "Hat",
			"¯": "macr",
			"˘": "breve",
			"˙": "dot",
			"¨": "die",
			"˚": "ring",
			"˝": "dblac",
			"¸": "cedil",
			"˛": "ogon",
			"ˆ": "circ",
			"ˇ": "caron",
			"°": "deg",
			"©": "copy",
			"®": "reg",
			"℗": "copysr",
			"℘": "wp",
			"℞": "rx",
			"℧": "mho",
			"℩": "iiota",
			"←": "larr",
			"↚": "nlarr",
			"→": "rarr",
			"↛": "nrarr",
			"↑": "uarr",
			"↓": "darr",
			"↔": "harr",
			"↮": "nharr",
			"↕": "varr",
			"↖": "nwarr",
			"↗": "nearr",
			"↘": "searr",
			"↙": "swarr",
			"↝": "rarrw",
			"↝̸": "nrarrw",
			"↞": "Larr",
			"↟": "Uarr",
			"↠": "Rarr",
			"↡": "Darr",
			"↢": "larrtl",
			"↣": "rarrtl",
			"↤": "mapstoleft",
			"↥": "mapstoup",
			"↦": "map",
			"↧": "mapstodown",
			"↩": "larrhk",
			"↪": "rarrhk",
			"↫": "larrlp",
			"↬": "rarrlp",
			"↭": "harrw",
			"↰": "lsh",
			"↱": "rsh",
			"↲": "ldsh",
			"↳": "rdsh",
			"↵": "crarr",
			"↶": "cularr",
			"↷": "curarr",
			"↺": "olarr",
			"↻": "orarr",
			"↼": "lharu",
			"↽": "lhard",
			"↾": "uharr",
			"↿": "uharl",
			"⇀": "rharu",
			"⇁": "rhard",
			"⇂": "dharr",
			"⇃": "dharl",
			"⇄": "rlarr",
			"⇅": "udarr",
			"⇆": "lrarr",
			"⇇": "llarr",
			"⇈": "uuarr",
			"⇉": "rrarr",
			"⇊": "ddarr",
			"⇋": "lrhar",
			"⇌": "rlhar",
			"⇐": "lArr",
			"⇍": "nlArr",
			"⇑": "uArr",
			"⇒": "rArr",
			"⇏": "nrArr",
			"⇓": "dArr",
			"⇔": "iff",
			"⇎": "nhArr",
			"⇕": "vArr",
			"⇖": "nwArr",
			"⇗": "neArr",
			"⇘": "seArr",
			"⇙": "swArr",
			"⇚": "lAarr",
			"⇛": "rAarr",
			"⇝": "zigrarr",
			"⇤": "larrb",
			"⇥": "rarrb",
			"⇵": "duarr",
			"⇽": "loarr",
			"⇾": "roarr",
			"⇿": "hoarr",
			"∀": "forall",
			"∁": "comp",
			"∂": "part",
			"∂̸": "npart",
			"∃": "exist",
			"∄": "nexist",
			"∅": "empty",
			"∇": "Del",
			"∈": "in",
			"∉": "notin",
			"∋": "ni",
			"∌": "notni",
			"϶": "bepsi",
			"∏": "prod",
			"∐": "coprod",
			"∑": "sum",
			"+": "plus",
			"±": "pm",
			"÷": "div",
			"×": "times",
			"<": "lt",
			"≮": "nlt",
			"<⃒": "nvlt",
			"=": "equals",
			"≠": "ne",
			"=⃥": "bne",
			"⩵": "Equal",
			">": "gt",
			"≯": "ngt",
			">⃒": "nvgt",
			"¬": "not",
			"|": "vert",
			"¦": "brvbar",
			"−": "minus",
			"∓": "mp",
			"∔": "plusdo",
			"⁄": "frasl",
			"∖": "setmn",
			"∗": "lowast",
			"∘": "compfn",
			"√": "Sqrt",
			"∝": "prop",
			"∞": "infin",
			"∟": "angrt",
			"∠": "ang",
			"∠⃒": "nang",
			"∡": "angmsd",
			"∢": "angsph",
			"∣": "mid",
			"∤": "nmid",
			"∥": "par",
			"∦": "npar",
			"∧": "and",
			"∨": "or",
			"∩": "cap",
			"∩︀": "caps",
			"∪": "cup",
			"∪︀": "cups",
			"∫": "int",
			"∬": "Int",
			"∭": "tint",
			"⨌": "qint",
			"∮": "oint",
			"∯": "Conint",
			"∰": "Cconint",
			"∱": "cwint",
			"∲": "cwconint",
			"∳": "awconint",
			"∴": "there4",
			"∵": "becaus",
			"∶": "ratio",
			"∷": "Colon",
			"∸": "minusd",
			"∺": "mDDot",
			"∻": "homtht",
			"∼": "sim",
			"≁": "nsim",
			"∼⃒": "nvsim",
			"∽": "bsim",
			"∽̱": "race",
			"∾": "ac",
			"∾̳": "acE",
			"∿": "acd",
			"≀": "wr",
			"≂": "esim",
			"≂̸": "nesim",
			"≃": "sime",
			"≄": "nsime",
			"≅": "cong",
			"≇": "ncong",
			"≆": "simne",
			"≈": "ap",
			"≉": "nap",
			"≊": "ape",
			"≋": "apid",
			"≋̸": "napid",
			"≌": "bcong",
			"≍": "CupCap",
			"≭": "NotCupCap",
			"≍⃒": "nvap",
			"≎": "bump",
			"≎̸": "nbump",
			"≏": "bumpe",
			"≏̸": "nbumpe",
			"≐": "doteq",
			"≐̸": "nedot",
			"≑": "eDot",
			"≒": "efDot",
			"≓": "erDot",
			"≔": "colone",
			"≕": "ecolon",
			"≖": "ecir",
			"≗": "cire",
			"≙": "wedgeq",
			"≚": "veeeq",
			"≜": "trie",
			"≟": "equest",
			"≡": "equiv",
			"≢": "nequiv",
			"≡⃥": "bnequiv",
			"≤": "le",
			"≰": "nle",
			"≤⃒": "nvle",
			"≥": "ge",
			"≱": "nge",
			"≥⃒": "nvge",
			"≦": "lE",
			"≦̸": "nlE",
			"≧": "gE",
			"≧̸": "ngE",
			"≨︀": "lvnE",
			"≨": "lnE",
			"≩": "gnE",
			"≩︀": "gvnE",
			"≪": "ll",
			"≪̸": "nLtv",
			"≪⃒": "nLt",
			"≫": "gg",
			"≫̸": "nGtv",
			"≫⃒": "nGt",
			"≬": "twixt",
			"≲": "lsim",
			"≴": "nlsim",
			"≳": "gsim",
			"≵": "ngsim",
			"≶": "lg",
			"≸": "ntlg",
			"≷": "gl",
			"≹": "ntgl",
			"≺": "pr",
			"⊀": "npr",
			"≻": "sc",
			"⊁": "nsc",
			"≼": "prcue",
			"⋠": "nprcue",
			"≽": "sccue",
			"⋡": "nsccue",
			"≾": "prsim",
			"≿": "scsim",
			"≿̸": "NotSucceedsTilde",
			"⊂": "sub",
			"⊄": "nsub",
			"⊂⃒": "vnsub",
			"⊃": "sup",
			"⊅": "nsup",
			"⊃⃒": "vnsup",
			"⊆": "sube",
			"⊈": "nsube",
			"⊇": "supe",
			"⊉": "nsupe",
			"⊊︀": "vsubne",
			"⊊": "subne",
			"⊋︀": "vsupne",
			"⊋": "supne",
			"⊍": "cupdot",
			"⊎": "uplus",
			"⊏": "sqsub",
			"⊏̸": "NotSquareSubset",
			"⊐": "sqsup",
			"⊐̸": "NotSquareSuperset",
			"⊑": "sqsube",
			"⋢": "nsqsube",
			"⊒": "sqsupe",
			"⋣": "nsqsupe",
			"⊓": "sqcap",
			"⊓︀": "sqcaps",
			"⊔": "sqcup",
			"⊔︀": "sqcups",
			"⊕": "oplus",
			"⊖": "ominus",
			"⊗": "otimes",
			"⊘": "osol",
			"⊙": "odot",
			"⊚": "ocir",
			"⊛": "oast",
			"⊝": "odash",
			"⊞": "plusb",
			"⊟": "minusb",
			"⊠": "timesb",
			"⊡": "sdotb",
			"⊢": "vdash",
			"⊬": "nvdash",
			"⊣": "dashv",
			"⊤": "top",
			"⊥": "bot",
			"⊧": "models",
			"⊨": "vDash",
			"⊭": "nvDash",
			"⊩": "Vdash",
			"⊮": "nVdash",
			"⊪": "Vvdash",
			"⊫": "VDash",
			"⊯": "nVDash",
			"⊰": "prurel",
			"⊲": "vltri",
			"⋪": "nltri",
			"⊳": "vrtri",
			"⋫": "nrtri",
			"⊴": "ltrie",
			"⋬": "nltrie",
			"⊴⃒": "nvltrie",
			"⊵": "rtrie",
			"⋭": "nrtrie",
			"⊵⃒": "nvrtrie",
			"⊶": "origof",
			"⊷": "imof",
			"⊸": "mumap",
			"⊹": "hercon",
			"⊺": "intcal",
			"⊻": "veebar",
			"⊽": "barvee",
			"⊾": "angrtvb",
			"⊿": "lrtri",
			"⋀": "Wedge",
			"⋁": "Vee",
			"⋂": "xcap",
			"⋃": "xcup",
			"⋄": "diam",
			"⋅": "sdot",
			"⋆": "Star",
			"⋇": "divonx",
			"⋈": "bowtie",
			"⋉": "ltimes",
			"⋊": "rtimes",
			"⋋": "lthree",
			"⋌": "rthree",
			"⋍": "bsime",
			"⋎": "cuvee",
			"⋏": "cuwed",
			"⋐": "Sub",
			"⋑": "Sup",
			"⋒": "Cap",
			"⋓": "Cup",
			"⋔": "fork",
			"⋕": "epar",
			"⋖": "ltdot",
			"⋗": "gtdot",
			"⋘": "Ll",
			"⋘̸": "nLl",
			"⋙": "Gg",
			"⋙̸": "nGg",
			"⋚︀": "lesg",
			"⋚": "leg",
			"⋛": "gel",
			"⋛︀": "gesl",
			"⋞": "cuepr",
			"⋟": "cuesc",
			"⋦": "lnsim",
			"⋧": "gnsim",
			"⋨": "prnsim",
			"⋩": "scnsim",
			"⋮": "vellip",
			"⋯": "ctdot",
			"⋰": "utdot",
			"⋱": "dtdot",
			"⋲": "disin",
			"⋳": "isinsv",
			"⋴": "isins",
			"⋵": "isindot",
			"⋵̸": "notindot",
			"⋶": "notinvc",
			"⋷": "notinvb",
			"⋹": "isinE",
			"⋹̸": "notinE",
			"⋺": "nisd",
			"⋻": "xnis",
			"⋼": "nis",
			"⋽": "notnivc",
			"⋾": "notnivb",
			"⌅": "barwed",
			"⌆": "Barwed",
			"⌌": "drcrop",
			"⌍": "dlcrop",
			"⌎": "urcrop",
			"⌏": "ulcrop",
			"⌐": "bnot",
			"⌒": "profline",
			"⌓": "profsurf",
			"⌕": "telrec",
			"⌖": "target",
			"⌜": "ulcorn",
			"⌝": "urcorn",
			"⌞": "dlcorn",
			"⌟": "drcorn",
			"⌢": "frown",
			"⌣": "smile",
			"⌭": "cylcty",
			"⌮": "profalar",
			"⌶": "topbot",
			"⌽": "ovbar",
			"⌿": "solbar",
			"⍼": "angzarr",
			"⎰": "lmoust",
			"⎱": "rmoust",
			"⎴": "tbrk",
			"⎵": "bbrk",
			"⎶": "bbrktbrk",
			"⏜": "OverParenthesis",
			"⏝": "UnderParenthesis",
			"⏞": "OverBrace",
			"⏟": "UnderBrace",
			"⏢": "trpezium",
			"⏧": "elinters",
			"␣": "blank",
			"─": "boxh",
			"│": "boxv",
			"┌": "boxdr",
			"┐": "boxdl",
			"└": "boxur",
			"┘": "boxul",
			"├": "boxvr",
			"┤": "boxvl",
			"┬": "boxhd",
			"┴": "boxhu",
			"┼": "boxvh",
			"═": "boxH",
			"║": "boxV",
			"╒": "boxdR",
			"╓": "boxDr",
			"╔": "boxDR",
			"╕": "boxdL",
			"╖": "boxDl",
			"╗": "boxDL",
			"╘": "boxuR",
			"╙": "boxUr",
			"╚": "boxUR",
			"╛": "boxuL",
			"╜": "boxUl",
			"╝": "boxUL",
			"╞": "boxvR",
			"╟": "boxVr",
			"╠": "boxVR",
			"╡": "boxvL",
			"╢": "boxVl",
			"╣": "boxVL",
			"╤": "boxHd",
			"╥": "boxhD",
			"╦": "boxHD",
			"╧": "boxHu",
			"╨": "boxhU",
			"╩": "boxHU",
			"╪": "boxvH",
			"╫": "boxVh",
			"╬": "boxVH",
			"▀": "uhblk",
			"▄": "lhblk",
			"█": "block",
			"░": "blk14",
			"▒": "blk12",
			"▓": "blk34",
			"□": "squ",
			"▪": "squf",
			"▫": "EmptyVerySmallSquare",
			"▭": "rect",
			"▮": "marker",
			"▱": "fltns",
			"△": "xutri",
			"▴": "utrif",
			"▵": "utri",
			"▸": "rtrif",
			"▹": "rtri",
			"▽": "xdtri",
			"▾": "dtrif",
			"▿": "dtri",
			"◂": "ltrif",
			"◃": "ltri",
			"◊": "loz",
			"○": "cir",
			"◬": "tridot",
			"◯": "xcirc",
			"◸": "ultri",
			"◹": "urtri",
			"◺": "lltri",
			"◻": "EmptySmallSquare",
			"◼": "FilledSmallSquare",
			"★": "starf",
			"☆": "star",
			"☎": "phone",
			"♀": "female",
			"♂": "male",
			"♠": "spades",
			"♣": "clubs",
			"♥": "hearts",
			"♦": "diams",
			"♪": "sung",
			"✓": "check",
			"✗": "cross",
			"✠": "malt",
			"✶": "sext",
			"❘": "VerticalSeparator",
			"⟈": "bsolhsub",
			"⟉": "suphsol",
			"⟵": "xlarr",
			"⟶": "xrarr",
			"⟷": "xharr",
			"⟸": "xlArr",
			"⟹": "xrArr",
			"⟺": "xhArr",
			"⟼": "xmap",
			"⟿": "dzigrarr",
			"⤂": "nvlArr",
			"⤃": "nvrArr",
			"⤄": "nvHarr",
			"⤅": "Map",
			"⤌": "lbarr",
			"⤍": "rbarr",
			"⤎": "lBarr",
			"⤏": "rBarr",
			"⤐": "RBarr",
			"⤑": "DDotrahd",
			"⤒": "UpArrowBar",
			"⤓": "DownArrowBar",
			"⤖": "Rarrtl",
			"⤙": "latail",
			"⤚": "ratail",
			"⤛": "lAtail",
			"⤜": "rAtail",
			"⤝": "larrfs",
			"⤞": "rarrfs",
			"⤟": "larrbfs",
			"⤠": "rarrbfs",
			"⤣": "nwarhk",
			"⤤": "nearhk",
			"⤥": "searhk",
			"⤦": "swarhk",
			"⤧": "nwnear",
			"⤨": "toea",
			"⤩": "tosa",
			"⤪": "swnwar",
			"⤳": "rarrc",
			"⤳̸": "nrarrc",
			"⤵": "cudarrr",
			"⤶": "ldca",
			"⤷": "rdca",
			"⤸": "cudarrl",
			"⤹": "larrpl",
			"⤼": "curarrm",
			"⤽": "cularrp",
			"⥅": "rarrpl",
			"⥈": "harrcir",
			"⥉": "Uarrocir",
			"⥊": "lurdshar",
			"⥋": "ldrushar",
			"⥎": "LeftRightVector",
			"⥏": "RightUpDownVector",
			"⥐": "DownLeftRightVector",
			"⥑": "LeftUpDownVector",
			"⥒": "LeftVectorBar",
			"⥓": "RightVectorBar",
			"⥔": "RightUpVectorBar",
			"⥕": "RightDownVectorBar",
			"⥖": "DownLeftVectorBar",
			"⥗": "DownRightVectorBar",
			"⥘": "LeftUpVectorBar",
			"⥙": "LeftDownVectorBar",
			"⥚": "LeftTeeVector",
			"⥛": "RightTeeVector",
			"⥜": "RightUpTeeVector",
			"⥝": "RightDownTeeVector",
			"⥞": "DownLeftTeeVector",
			"⥟": "DownRightTeeVector",
			"⥠": "LeftUpTeeVector",
			"⥡": "LeftDownTeeVector",
			"⥢": "lHar",
			"⥣": "uHar",
			"⥤": "rHar",
			"⥥": "dHar",
			"⥦": "luruhar",
			"⥧": "ldrdhar",
			"⥨": "ruluhar",
			"⥩": "rdldhar",
			"⥪": "lharul",
			"⥫": "llhard",
			"⥬": "rharul",
			"⥭": "lrhard",
			"⥮": "udhar",
			"⥯": "duhar",
			"⥰": "RoundImplies",
			"⥱": "erarr",
			"⥲": "simrarr",
			"⥳": "larrsim",
			"⥴": "rarrsim",
			"⥵": "rarrap",
			"⥶": "ltlarr",
			"⥸": "gtrarr",
			"⥹": "subrarr",
			"⥻": "suplarr",
			"⥼": "lfisht",
			"⥽": "rfisht",
			"⥾": "ufisht",
			"⥿": "dfisht",
			"⦚": "vzigzag",
			"⦜": "vangrt",
			"⦝": "angrtvbd",
			"⦤": "ange",
			"⦥": "range",
			"⦦": "dwangle",
			"⦧": "uwangle",
			"⦨": "angmsdaa",
			"⦩": "angmsdab",
			"⦪": "angmsdac",
			"⦫": "angmsdad",
			"⦬": "angmsdae",
			"⦭": "angmsdaf",
			"⦮": "angmsdag",
			"⦯": "angmsdah",
			"⦰": "bemptyv",
			"⦱": "demptyv",
			"⦲": "cemptyv",
			"⦳": "raemptyv",
			"⦴": "laemptyv",
			"⦵": "ohbar",
			"⦶": "omid",
			"⦷": "opar",
			"⦹": "operp",
			"⦻": "olcross",
			"⦼": "odsold",
			"⦾": "olcir",
			"⦿": "ofcir",
			"⧀": "olt",
			"⧁": "ogt",
			"⧂": "cirscir",
			"⧃": "cirE",
			"⧄": "solb",
			"⧅": "bsolb",
			"⧉": "boxbox",
			"⧍": "trisb",
			"⧎": "rtriltri",
			"⧏": "LeftTriangleBar",
			"⧏̸": "NotLeftTriangleBar",
			"⧐": "RightTriangleBar",
			"⧐̸": "NotRightTriangleBar",
			"⧜": "iinfin",
			"⧝": "infintie",
			"⧞": "nvinfin",
			"⧣": "eparsl",
			"⧤": "smeparsl",
			"⧥": "eqvparsl",
			"⧫": "lozf",
			"⧴": "RuleDelayed",
			"⧶": "dsol",
			"⨀": "xodot",
			"⨁": "xoplus",
			"⨂": "xotime",
			"⨄": "xuplus",
			"⨆": "xsqcup",
			"⨍": "fpartint",
			"⨐": "cirfnint",
			"⨑": "awint",
			"⨒": "rppolint",
			"⨓": "scpolint",
			"⨔": "npolint",
			"⨕": "pointint",
			"⨖": "quatint",
			"⨗": "intlarhk",
			"⨢": "pluscir",
			"⨣": "plusacir",
			"⨤": "simplus",
			"⨥": "plusdu",
			"⨦": "plussim",
			"⨧": "plustwo",
			"⨩": "mcomma",
			"⨪": "minusdu",
			"⨭": "loplus",
			"⨮": "roplus",
			"⨯": "Cross",
			"⨰": "timesd",
			"⨱": "timesbar",
			"⨳": "smashp",
			"⨴": "lotimes",
			"⨵": "rotimes",
			"⨶": "otimesas",
			"⨷": "Otimes",
			"⨸": "odiv",
			"⨹": "triplus",
			"⨺": "triminus",
			"⨻": "tritime",
			"⨼": "iprod",
			"⨿": "amalg",
			"⩀": "capdot",
			"⩂": "ncup",
			"⩃": "ncap",
			"⩄": "capand",
			"⩅": "cupor",
			"⩆": "cupcap",
			"⩇": "capcup",
			"⩈": "cupbrcap",
			"⩉": "capbrcup",
			"⩊": "cupcup",
			"⩋": "capcap",
			"⩌": "ccups",
			"⩍": "ccaps",
			"⩐": "ccupssm",
			"⩓": "And",
			"⩔": "Or",
			"⩕": "andand",
			"⩖": "oror",
			"⩗": "orslope",
			"⩘": "andslope",
			"⩚": "andv",
			"⩛": "orv",
			"⩜": "andd",
			"⩝": "ord",
			"⩟": "wedbar",
			"⩦": "sdote",
			"⩪": "simdot",
			"⩭": "congdot",
			"⩭̸": "ncongdot",
			"⩮": "easter",
			"⩯": "apacir",
			"⩰": "apE",
			"⩰̸": "napE",
			"⩱": "eplus",
			"⩲": "pluse",
			"⩳": "Esim",
			"⩷": "eDDot",
			"⩸": "equivDD",
			"⩹": "ltcir",
			"⩺": "gtcir",
			"⩻": "ltquest",
			"⩼": "gtquest",
			"⩽": "les",
			"⩽̸": "nles",
			"⩾": "ges",
			"⩾̸": "nges",
			"⩿": "lesdot",
			"⪀": "gesdot",
			"⪁": "lesdoto",
			"⪂": "gesdoto",
			"⪃": "lesdotor",
			"⪄": "gesdotol",
			"⪅": "lap",
			"⪆": "gap",
			"⪇": "lne",
			"⪈": "gne",
			"⪉": "lnap",
			"⪊": "gnap",
			"⪋": "lEg",
			"⪌": "gEl",
			"⪍": "lsime",
			"⪎": "gsime",
			"⪏": "lsimg",
			"⪐": "gsiml",
			"⪑": "lgE",
			"⪒": "glE",
			"⪓": "lesges",
			"⪔": "gesles",
			"⪕": "els",
			"⪖": "egs",
			"⪗": "elsdot",
			"⪘": "egsdot",
			"⪙": "el",
			"⪚": "eg",
			"⪝": "siml",
			"⪞": "simg",
			"⪟": "simlE",
			"⪠": "simgE",
			"⪡": "LessLess",
			"⪡̸": "NotNestedLessLess",
			"⪢": "GreaterGreater",
			"⪢̸": "NotNestedGreaterGreater",
			"⪤": "glj",
			"⪥": "gla",
			"⪦": "ltcc",
			"⪧": "gtcc",
			"⪨": "lescc",
			"⪩": "gescc",
			"⪪": "smt",
			"⪫": "lat",
			"⪬": "smte",
			"⪬︀": "smtes",
			"⪭": "late",
			"⪭︀": "lates",
			"⪮": "bumpE",
			"⪯": "pre",
			"⪯̸": "npre",
			"⪰": "sce",
			"⪰̸": "nsce",
			"⪳": "prE",
			"⪴": "scE",
			"⪵": "prnE",
			"⪶": "scnE",
			"⪷": "prap",
			"⪸": "scap",
			"⪹": "prnap",
			"⪺": "scnap",
			"⪻": "Pr",
			"⪼": "Sc",
			"⪽": "subdot",
			"⪾": "supdot",
			"⪿": "subplus",
			"⫀": "supplus",
			"⫁": "submult",
			"⫂": "supmult",
			"⫃": "subedot",
			"⫄": "supedot",
			"⫅": "subE",
			"⫅̸": "nsubE",
			"⫆": "supE",
			"⫆̸": "nsupE",
			"⫇": "subsim",
			"⫈": "supsim",
			"⫋︀": "vsubnE",
			"⫋": "subnE",
			"⫌︀": "vsupnE",
			"⫌": "supnE",
			"⫏": "csub",
			"⫐": "csup",
			"⫑": "csube",
			"⫒": "csupe",
			"⫓": "subsup",
			"⫔": "supsub",
			"⫕": "subsub",
			"⫖": "supsup",
			"⫗": "suphsub",
			"⫘": "supdsub",
			"⫙": "forkv",
			"⫚": "topfork",
			"⫛": "mlcp",
			"⫤": "Dashv",
			"⫦": "Vdashl",
			"⫧": "Barv",
			"⫨": "vBar",
			"⫩": "vBarv",
			"⫫": "Vbar",
			"⫬": "Not",
			"⫭": "bNot",
			"⫮": "rnmid",
			"⫯": "cirmid",
			"⫰": "midcir",
			"⫱": "topcir",
			"⫲": "nhpar",
			"⫳": "parsim",
			"⫽": "parsl",
			"⫽⃥": "nparsl",
			"♭": "flat",
			"♮": "natur",
			"♯": "sharp",
			"¤": "curren",
			"¢": "cent",
			"$": "dollar",
			"£": "pound",
			"¥": "yen",
			"€": "euro",
			"¹": "sup1",
			"½": "half",
			"⅓": "frac13",
			"¼": "frac14",
			"⅕": "frac15",
			"⅙": "frac16",
			"⅛": "frac18",
			"²": "sup2",
			"⅔": "frac23",
			"⅖": "frac25",
			"³": "sup3",
			"¾": "frac34",
			"⅗": "frac35",
			"⅜": "frac38",
			"⅘": "frac45",
			"⅚": "frac56",
			"⅝": "frac58",
			"⅞": "frac78",
			"𝒶": "ascr",
			"𝕒": "aopf",
			"𝔞": "afr",
			"𝔸": "Aopf",
			"𝔄": "Afr",
			"𝒜": "Ascr",
			"ª": "ordf",
			"á": "aacute",
			"Á": "Aacute",
			"à": "agrave",
			"À": "Agrave",
			"ă": "abreve",
			"Ă": "Abreve",
			"â": "acirc",
			"Â": "Acirc",
			"å": "aring",
			"Å": "angst",
			"ä": "auml",
			"Ä": "Auml",
			"ã": "atilde",
			"Ã": "Atilde",
			"ą": "aogon",
			"Ą": "Aogon",
			"ā": "amacr",
			"Ā": "Amacr",
			"æ": "aelig",
			"Æ": "AElig",
			"𝒷": "bscr",
			"𝕓": "bopf",
			"𝔟": "bfr",
			"𝔹": "Bopf",
			"ℬ": "Bscr",
			"𝔅": "Bfr",
			"𝔠": "cfr",
			"𝒸": "cscr",
			"𝕔": "copf",
			"ℭ": "Cfr",
			"𝒞": "Cscr",
			"ℂ": "Copf",
			"ć": "cacute",
			"Ć": "Cacute",
			"ĉ": "ccirc",
			"Ĉ": "Ccirc",
			"č": "ccaron",
			"Č": "Ccaron",
			"ċ": "cdot",
			"Ċ": "Cdot",
			"ç": "ccedil",
			"Ç": "Ccedil",
			"℅": "incare",
			"𝔡": "dfr",
			"ⅆ": "dd",
			"𝕕": "dopf",
			"𝒹": "dscr",
			"𝒟": "Dscr",
			"𝔇": "Dfr",
			"ⅅ": "DD",
			"𝔻": "Dopf",
			"ď": "dcaron",
			"Ď": "Dcaron",
			"đ": "dstrok",
			"Đ": "Dstrok",
			"ð": "eth",
			"Ð": "ETH",
			"ⅇ": "ee",
			"ℯ": "escr",
			"𝔢": "efr",
			"𝕖": "eopf",
			"ℰ": "Escr",
			"𝔈": "Efr",
			"𝔼": "Eopf",
			"é": "eacute",
			"É": "Eacute",
			"è": "egrave",
			"È": "Egrave",
			"ê": "ecirc",
			"Ê": "Ecirc",
			"ě": "ecaron",
			"Ě": "Ecaron",
			"ë": "euml",
			"Ë": "Euml",
			"ė": "edot",
			"Ė": "Edot",
			"ę": "eogon",
			"Ę": "Eogon",
			"ē": "emacr",
			"Ē": "Emacr",
			"𝔣": "ffr",
			"𝕗": "fopf",
			"𝒻": "fscr",
			"𝔉": "Ffr",
			"𝔽": "Fopf",
			"ℱ": "Fscr",
			"ﬀ": "fflig",
			"ﬃ": "ffilig",
			"ﬄ": "ffllig",
			"ﬁ": "filig",
			"fj": "fjlig",
			"ﬂ": "fllig",
			"ƒ": "fnof",
			"ℊ": "gscr",
			"𝕘": "gopf",
			"𝔤": "gfr",
			"𝒢": "Gscr",
			"𝔾": "Gopf",
			"𝔊": "Gfr",
			"ǵ": "gacute",
			"ğ": "gbreve",
			"Ğ": "Gbreve",
			"ĝ": "gcirc",
			"Ĝ": "Gcirc",
			"ġ": "gdot",
			"Ġ": "Gdot",
			"Ģ": "Gcedil",
			"𝔥": "hfr",
			"ℎ": "planckh",
			"𝒽": "hscr",
			"𝕙": "hopf",
			"ℋ": "Hscr",
			"ℌ": "Hfr",
			"ℍ": "Hopf",
			"ĥ": "hcirc",
			"Ĥ": "Hcirc",
			"ℏ": "hbar",
			"ħ": "hstrok",
			"Ħ": "Hstrok",
			"𝕚": "iopf",
			"𝔦": "ifr",
			"𝒾": "iscr",
			"ⅈ": "ii",
			"𝕀": "Iopf",
			"ℐ": "Iscr",
			"ℑ": "Im",
			"í": "iacute",
			"Í": "Iacute",
			"ì": "igrave",
			"Ì": "Igrave",
			"î": "icirc",
			"Î": "Icirc",
			"ï": "iuml",
			"Ï": "Iuml",
			"ĩ": "itilde",
			"Ĩ": "Itilde",
			"İ": "Idot",
			"į": "iogon",
			"Į": "Iogon",
			"ī": "imacr",
			"Ī": "Imacr",
			"ĳ": "ijlig",
			"Ĳ": "IJlig",
			"ı": "imath",
			"𝒿": "jscr",
			"𝕛": "jopf",
			"𝔧": "jfr",
			"𝒥": "Jscr",
			"𝔍": "Jfr",
			"𝕁": "Jopf",
			"ĵ": "jcirc",
			"Ĵ": "Jcirc",
			"ȷ": "jmath",
			"𝕜": "kopf",
			"𝓀": "kscr",
			"𝔨": "kfr",
			"𝒦": "Kscr",
			"𝕂": "Kopf",
			"𝔎": "Kfr",
			"ķ": "kcedil",
			"Ķ": "Kcedil",
			"𝔩": "lfr",
			"𝓁": "lscr",
			"ℓ": "ell",
			"𝕝": "lopf",
			"ℒ": "Lscr",
			"𝔏": "Lfr",
			"𝕃": "Lopf",
			"ĺ": "lacute",
			"Ĺ": "Lacute",
			"ľ": "lcaron",
			"Ľ": "Lcaron",
			"ļ": "lcedil",
			"Ļ": "Lcedil",
			"ł": "lstrok",
			"Ł": "Lstrok",
			"ŀ": "lmidot",
			"Ŀ": "Lmidot",
			"𝔪": "mfr",
			"𝕞": "mopf",
			"𝓂": "mscr",
			"𝔐": "Mfr",
			"𝕄": "Mopf",
			"ℳ": "Mscr",
			"𝔫": "nfr",
			"𝕟": "nopf",
			"𝓃": "nscr",
			"ℕ": "Nopf",
			"𝒩": "Nscr",
			"𝔑": "Nfr",
			"ń": "nacute",
			"Ń": "Nacute",
			"ň": "ncaron",
			"Ň": "Ncaron",
			"ñ": "ntilde",
			"Ñ": "Ntilde",
			"ņ": "ncedil",
			"Ņ": "Ncedil",
			"№": "numero",
			"ŋ": "eng",
			"Ŋ": "ENG",
			"𝕠": "oopf",
			"𝔬": "ofr",
			"ℴ": "oscr",
			"𝒪": "Oscr",
			"𝔒": "Ofr",
			"𝕆": "Oopf",
			"º": "ordm",
			"ó": "oacute",
			"Ó": "Oacute",
			"ò": "ograve",
			"Ò": "Ograve",
			"ô": "ocirc",
			"Ô": "Ocirc",
			"ö": "ouml",
			"Ö": "Ouml",
			"ő": "odblac",
			"Ő": "Odblac",
			"õ": "otilde",
			"Õ": "Otilde",
			"ø": "oslash",
			"Ø": "Oslash",
			"ō": "omacr",
			"Ō": "Omacr",
			"œ": "oelig",
			"Œ": "OElig",
			"𝔭": "pfr",
			"𝓅": "pscr",
			"𝕡": "popf",
			"ℙ": "Popf",
			"𝔓": "Pfr",
			"𝒫": "Pscr",
			"𝕢": "qopf",
			"𝔮": "qfr",
			"𝓆": "qscr",
			"𝒬": "Qscr",
			"𝔔": "Qfr",
			"ℚ": "Qopf",
			"ĸ": "kgreen",
			"𝔯": "rfr",
			"𝕣": "ropf",
			"𝓇": "rscr",
			"ℛ": "Rscr",
			"ℜ": "Re",
			"ℝ": "Ropf",
			"ŕ": "racute",
			"Ŕ": "Racute",
			"ř": "rcaron",
			"Ř": "Rcaron",
			"ŗ": "rcedil",
			"Ŗ": "Rcedil",
			"𝕤": "sopf",
			"𝓈": "sscr",
			"𝔰": "sfr",
			"𝕊": "Sopf",
			"𝔖": "Sfr",
			"𝒮": "Sscr",
			"Ⓢ": "oS",
			"ś": "sacute",
			"Ś": "Sacute",
			"ŝ": "scirc",
			"Ŝ": "Scirc",
			"š": "scaron",
			"Š": "Scaron",
			"ş": "scedil",
			"Ş": "Scedil",
			"ß": "szlig",
			"𝔱": "tfr",
			"𝓉": "tscr",
			"𝕥": "topf",
			"𝒯": "Tscr",
			"𝔗": "Tfr",
			"𝕋": "Topf",
			"ť": "tcaron",
			"Ť": "Tcaron",
			"ţ": "tcedil",
			"Ţ": "Tcedil",
			"™": "trade",
			"ŧ": "tstrok",
			"Ŧ": "Tstrok",
			"𝓊": "uscr",
			"𝕦": "uopf",
			"𝔲": "ufr",
			"𝕌": "Uopf",
			"𝔘": "Ufr",
			"𝒰": "Uscr",
			"ú": "uacute",
			"Ú": "Uacute",
			"ù": "ugrave",
			"Ù": "Ugrave",
			"ŭ": "ubreve",
			"Ŭ": "Ubreve",
			"û": "ucirc",
			"Û": "Ucirc",
			"ů": "uring",
			"Ů": "Uring",
			"ü": "uuml",
			"Ü": "Uuml",
			"ű": "udblac",
			"Ű": "Udblac",
			"ũ": "utilde",
			"Ũ": "Utilde",
			"ų": "uogon",
			"Ų": "Uogon",
			"ū": "umacr",
			"Ū": "Umacr",
			"𝔳": "vfr",
			"𝕧": "vopf",
			"𝓋": "vscr",
			"𝔙": "Vfr",
			"𝕍": "Vopf",
			"𝒱": "Vscr",
			"𝕨": "wopf",
			"𝓌": "wscr",
			"𝔴": "wfr",
			"𝒲": "Wscr",
			"𝕎": "Wopf",
			"𝔚": "Wfr",
			"ŵ": "wcirc",
			"Ŵ": "Wcirc",
			"𝔵": "xfr",
			"𝓍": "xscr",
			"𝕩": "xopf",
			"𝕏": "Xopf",
			"𝔛": "Xfr",
			"𝒳": "Xscr",
			"𝔶": "yfr",
			"𝓎": "yscr",
			"𝕪": "yopf",
			"𝒴": "Yscr",
			"𝔜": "Yfr",
			"𝕐": "Yopf",
			"ý": "yacute",
			"Ý": "Yacute",
			"ŷ": "ycirc",
			"Ŷ": "Ycirc",
			"ÿ": "yuml",
			"Ÿ": "Yuml",
			"𝓏": "zscr",
			"𝔷": "zfr",
			"𝕫": "zopf",
			"ℨ": "Zfr",
			"ℤ": "Zopf",
			"𝒵": "Zscr",
			"ź": "zacute",
			"Ź": "Zacute",
			"ž": "zcaron",
			"Ž": "Zcaron",
			"ż": "zdot",
			"Ż": "Zdot",
			"Ƶ": "imped",
			"þ": "thorn",
			"Þ": "THORN",
			"ŉ": "napos",
			"α": "alpha",
			"Α": "Alpha",
			"β": "beta",
			"Β": "Beta",
			"γ": "gamma",
			"Γ": "Gamma",
			"δ": "delta",
			"Δ": "Delta",
			"ε": "epsi",
			"ϵ": "epsiv",
			"Ε": "Epsilon",
			"ϝ": "gammad",
			"Ϝ": "Gammad",
			"ζ": "zeta",
			"Ζ": "Zeta",
			"η": "eta",
			"Η": "Eta",
			"θ": "theta",
			"ϑ": "thetav",
			"Θ": "Theta",
			"ι": "iota",
			"Ι": "Iota",
			"κ": "kappa",
			"ϰ": "kappav",
			"Κ": "Kappa",
			"λ": "lambda",
			"Λ": "Lambda",
			"μ": "mu",
			"µ": "micro",
			"Μ": "Mu",
			"ν": "nu",
			"Ν": "Nu",
			"ξ": "xi",
			"Ξ": "Xi",
			"ο": "omicron",
			"Ο": "Omicron",
			"π": "pi",
			"ϖ": "piv",
			"Π": "Pi",
			"ρ": "rho",
			"ϱ": "rhov",
			"Ρ": "Rho",
			"σ": "sigma",
			"Σ": "Sigma",
			"ς": "sigmaf",
			"τ": "tau",
			"Τ": "Tau",
			"υ": "upsi",
			"Υ": "Upsilon",
			"ϒ": "Upsi",
			"φ": "phi",
			"ϕ": "phiv",
			"Φ": "Phi",
			"χ": "chi",
			"Χ": "Chi",
			"ψ": "psi",
			"Ψ": "Psi",
			"ω": "omega",
			"Ω": "ohm",
			"а": "acy",
			"А": "Acy",
			"б": "bcy",
			"Б": "Bcy",
			"в": "vcy",
			"В": "Vcy",
			"г": "gcy",
			"Г": "Gcy",
			"ѓ": "gjcy",
			"Ѓ": "GJcy",
			"д": "dcy",
			"Д": "Dcy",
			"ђ": "djcy",
			"Ђ": "DJcy",
			"е": "iecy",
			"Е": "IEcy",
			"ё": "iocy",
			"Ё": "IOcy",
			"є": "jukcy",
			"Є": "Jukcy",
			"ж": "zhcy",
			"Ж": "ZHcy",
			"з": "zcy",
			"З": "Zcy",
			"ѕ": "dscy",
			"Ѕ": "DScy",
			"и": "icy",
			"И": "Icy",
			"і": "iukcy",
			"І": "Iukcy",
			"ї": "yicy",
			"Ї": "YIcy",
			"й": "jcy",
			"Й": "Jcy",
			"ј": "jsercy",
			"Ј": "Jsercy",
			"к": "kcy",
			"К": "Kcy",
			"ќ": "kjcy",
			"Ќ": "KJcy",
			"л": "lcy",
			"Л": "Lcy",
			"љ": "ljcy",
			"Љ": "LJcy",
			"м": "mcy",
			"М": "Mcy",
			"н": "ncy",
			"Н": "Ncy",
			"њ": "njcy",
			"Њ": "NJcy",
			"о": "ocy",
			"О": "Ocy",
			"п": "pcy",
			"П": "Pcy",
			"р": "rcy",
			"Р": "Rcy",
			"с": "scy",
			"С": "Scy",
			"т": "tcy",
			"Т": "Tcy",
			"ћ": "tshcy",
			"Ћ": "TSHcy",
			"у": "ucy",
			"У": "Ucy",
			"ў": "ubrcy",
			"Ў": "Ubrcy",
			"ф": "fcy",
			"Ф": "Fcy",
			"х": "khcy",
			"Х": "KHcy",
			"ц": "tscy",
			"Ц": "TScy",
			"ч": "chcy",
			"Ч": "CHcy",
			"џ": "dzcy",
			"Џ": "DZcy",
			"ш": "shcy",
			"Ш": "SHcy",
			"щ": "shchcy",
			"Щ": "SHCHcy",
			"ъ": "hardcy",
			"Ъ": "HARDcy",
			"ы": "ycy",
			"Ы": "Ycy",
			"ь": "softcy",
			"Ь": "SOFTcy",
			"э": "ecy",
			"Э": "Ecy",
			"ю": "yucy",
			"Ю": "YUcy",
			"я": "yacy",
			"Я": "YAcy",
			"ℵ": "aleph",
			"ℶ": "beth",
			"ℷ": "gimel",
			"ℸ": "daleth"
		};
		var regexEscape$1 = /["&'<>`]/g;
		var escapeMap = {
			"\"": "&quot;",
			"&": "&amp;",
			"'": "&#x27;",
			"<": "&lt;",
			">": "&gt;",
			"`": "&#x60;"
		};
		var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
		var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
		var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
		var decodeMap$1 = {
			"aacute": "á",
			"Aacute": "Á",
			"abreve": "ă",
			"Abreve": "Ă",
			"ac": "∾",
			"acd": "∿",
			"acE": "∾̳",
			"acirc": "â",
			"Acirc": "Â",
			"acute": "´",
			"acy": "а",
			"Acy": "А",
			"aelig": "æ",
			"AElig": "Æ",
			"af": "⁡",
			"afr": "𝔞",
			"Afr": "𝔄",
			"agrave": "à",
			"Agrave": "À",
			"alefsym": "ℵ",
			"aleph": "ℵ",
			"alpha": "α",
			"Alpha": "Α",
			"amacr": "ā",
			"Amacr": "Ā",
			"amalg": "⨿",
			"amp": "&",
			"AMP": "&",
			"and": "∧",
			"And": "⩓",
			"andand": "⩕",
			"andd": "⩜",
			"andslope": "⩘",
			"andv": "⩚",
			"ang": "∠",
			"ange": "⦤",
			"angle": "∠",
			"angmsd": "∡",
			"angmsdaa": "⦨",
			"angmsdab": "⦩",
			"angmsdac": "⦪",
			"angmsdad": "⦫",
			"angmsdae": "⦬",
			"angmsdaf": "⦭",
			"angmsdag": "⦮",
			"angmsdah": "⦯",
			"angrt": "∟",
			"angrtvb": "⊾",
			"angrtvbd": "⦝",
			"angsph": "∢",
			"angst": "Å",
			"angzarr": "⍼",
			"aogon": "ą",
			"Aogon": "Ą",
			"aopf": "𝕒",
			"Aopf": "𝔸",
			"ap": "≈",
			"apacir": "⩯",
			"ape": "≊",
			"apE": "⩰",
			"apid": "≋",
			"apos": "'",
			"ApplyFunction": "⁡",
			"approx": "≈",
			"approxeq": "≊",
			"aring": "å",
			"Aring": "Å",
			"ascr": "𝒶",
			"Ascr": "𝒜",
			"Assign": "≔",
			"ast": "*",
			"asymp": "≈",
			"asympeq": "≍",
			"atilde": "ã",
			"Atilde": "Ã",
			"auml": "ä",
			"Auml": "Ä",
			"awconint": "∳",
			"awint": "⨑",
			"backcong": "≌",
			"backepsilon": "϶",
			"backprime": "‵",
			"backsim": "∽",
			"backsimeq": "⋍",
			"Backslash": "∖",
			"Barv": "⫧",
			"barvee": "⊽",
			"barwed": "⌅",
			"Barwed": "⌆",
			"barwedge": "⌅",
			"bbrk": "⎵",
			"bbrktbrk": "⎶",
			"bcong": "≌",
			"bcy": "б",
			"Bcy": "Б",
			"bdquo": "„",
			"becaus": "∵",
			"because": "∵",
			"Because": "∵",
			"bemptyv": "⦰",
			"bepsi": "϶",
			"bernou": "ℬ",
			"Bernoullis": "ℬ",
			"beta": "β",
			"Beta": "Β",
			"beth": "ℶ",
			"between": "≬",
			"bfr": "𝔟",
			"Bfr": "𝔅",
			"bigcap": "⋂",
			"bigcirc": "◯",
			"bigcup": "⋃",
			"bigodot": "⨀",
			"bigoplus": "⨁",
			"bigotimes": "⨂",
			"bigsqcup": "⨆",
			"bigstar": "★",
			"bigtriangledown": "▽",
			"bigtriangleup": "△",
			"biguplus": "⨄",
			"bigvee": "⋁",
			"bigwedge": "⋀",
			"bkarow": "⤍",
			"blacklozenge": "⧫",
			"blacksquare": "▪",
			"blacktriangle": "▴",
			"blacktriangledown": "▾",
			"blacktriangleleft": "◂",
			"blacktriangleright": "▸",
			"blank": "␣",
			"blk12": "▒",
			"blk14": "░",
			"blk34": "▓",
			"block": "█",
			"bne": "=⃥",
			"bnequiv": "≡⃥",
			"bnot": "⌐",
			"bNot": "⫭",
			"bopf": "𝕓",
			"Bopf": "𝔹",
			"bot": "⊥",
			"bottom": "⊥",
			"bowtie": "⋈",
			"boxbox": "⧉",
			"boxdl": "┐",
			"boxdL": "╕",
			"boxDl": "╖",
			"boxDL": "╗",
			"boxdr": "┌",
			"boxdR": "╒",
			"boxDr": "╓",
			"boxDR": "╔",
			"boxh": "─",
			"boxH": "═",
			"boxhd": "┬",
			"boxhD": "╥",
			"boxHd": "╤",
			"boxHD": "╦",
			"boxhu": "┴",
			"boxhU": "╨",
			"boxHu": "╧",
			"boxHU": "╩",
			"boxminus": "⊟",
			"boxplus": "⊞",
			"boxtimes": "⊠",
			"boxul": "┘",
			"boxuL": "╛",
			"boxUl": "╜",
			"boxUL": "╝",
			"boxur": "└",
			"boxuR": "╘",
			"boxUr": "╙",
			"boxUR": "╚",
			"boxv": "│",
			"boxV": "║",
			"boxvh": "┼",
			"boxvH": "╪",
			"boxVh": "╫",
			"boxVH": "╬",
			"boxvl": "┤",
			"boxvL": "╡",
			"boxVl": "╢",
			"boxVL": "╣",
			"boxvr": "├",
			"boxvR": "╞",
			"boxVr": "╟",
			"boxVR": "╠",
			"bprime": "‵",
			"breve": "˘",
			"Breve": "˘",
			"brvbar": "¦",
			"bscr": "𝒷",
			"Bscr": "ℬ",
			"bsemi": "⁏",
			"bsim": "∽",
			"bsime": "⋍",
			"bsol": "\\",
			"bsolb": "⧅",
			"bsolhsub": "⟈",
			"bull": "•",
			"bullet": "•",
			"bump": "≎",
			"bumpe": "≏",
			"bumpE": "⪮",
			"bumpeq": "≏",
			"Bumpeq": "≎",
			"cacute": "ć",
			"Cacute": "Ć",
			"cap": "∩",
			"Cap": "⋒",
			"capand": "⩄",
			"capbrcup": "⩉",
			"capcap": "⩋",
			"capcup": "⩇",
			"capdot": "⩀",
			"CapitalDifferentialD": "ⅅ",
			"caps": "∩︀",
			"caret": "⁁",
			"caron": "ˇ",
			"Cayleys": "ℭ",
			"ccaps": "⩍",
			"ccaron": "č",
			"Ccaron": "Č",
			"ccedil": "ç",
			"Ccedil": "Ç",
			"ccirc": "ĉ",
			"Ccirc": "Ĉ",
			"Cconint": "∰",
			"ccups": "⩌",
			"ccupssm": "⩐",
			"cdot": "ċ",
			"Cdot": "Ċ",
			"cedil": "¸",
			"Cedilla": "¸",
			"cemptyv": "⦲",
			"cent": "¢",
			"centerdot": "·",
			"CenterDot": "·",
			"cfr": "𝔠",
			"Cfr": "ℭ",
			"chcy": "ч",
			"CHcy": "Ч",
			"check": "✓",
			"checkmark": "✓",
			"chi": "χ",
			"Chi": "Χ",
			"cir": "○",
			"circ": "ˆ",
			"circeq": "≗",
			"circlearrowleft": "↺",
			"circlearrowright": "↻",
			"circledast": "⊛",
			"circledcirc": "⊚",
			"circleddash": "⊝",
			"CircleDot": "⊙",
			"circledR": "®",
			"circledS": "Ⓢ",
			"CircleMinus": "⊖",
			"CirclePlus": "⊕",
			"CircleTimes": "⊗",
			"cire": "≗",
			"cirE": "⧃",
			"cirfnint": "⨐",
			"cirmid": "⫯",
			"cirscir": "⧂",
			"ClockwiseContourIntegral": "∲",
			"CloseCurlyDoubleQuote": "”",
			"CloseCurlyQuote": "’",
			"clubs": "♣",
			"clubsuit": "♣",
			"colon": ":",
			"Colon": "∷",
			"colone": "≔",
			"Colone": "⩴",
			"coloneq": "≔",
			"comma": ",",
			"commat": "@",
			"comp": "∁",
			"compfn": "∘",
			"complement": "∁",
			"complexes": "ℂ",
			"cong": "≅",
			"congdot": "⩭",
			"Congruent": "≡",
			"conint": "∮",
			"Conint": "∯",
			"ContourIntegral": "∮",
			"copf": "𝕔",
			"Copf": "ℂ",
			"coprod": "∐",
			"Coproduct": "∐",
			"copy": "©",
			"COPY": "©",
			"copysr": "℗",
			"CounterClockwiseContourIntegral": "∳",
			"crarr": "↵",
			"cross": "✗",
			"Cross": "⨯",
			"cscr": "𝒸",
			"Cscr": "𝒞",
			"csub": "⫏",
			"csube": "⫑",
			"csup": "⫐",
			"csupe": "⫒",
			"ctdot": "⋯",
			"cudarrl": "⤸",
			"cudarrr": "⤵",
			"cuepr": "⋞",
			"cuesc": "⋟",
			"cularr": "↶",
			"cularrp": "⤽",
			"cup": "∪",
			"Cup": "⋓",
			"cupbrcap": "⩈",
			"cupcap": "⩆",
			"CupCap": "≍",
			"cupcup": "⩊",
			"cupdot": "⊍",
			"cupor": "⩅",
			"cups": "∪︀",
			"curarr": "↷",
			"curarrm": "⤼",
			"curlyeqprec": "⋞",
			"curlyeqsucc": "⋟",
			"curlyvee": "⋎",
			"curlywedge": "⋏",
			"curren": "¤",
			"curvearrowleft": "↶",
			"curvearrowright": "↷",
			"cuvee": "⋎",
			"cuwed": "⋏",
			"cwconint": "∲",
			"cwint": "∱",
			"cylcty": "⌭",
			"dagger": "†",
			"Dagger": "‡",
			"daleth": "ℸ",
			"darr": "↓",
			"dArr": "⇓",
			"Darr": "↡",
			"dash": "‐",
			"dashv": "⊣",
			"Dashv": "⫤",
			"dbkarow": "⤏",
			"dblac": "˝",
			"dcaron": "ď",
			"Dcaron": "Ď",
			"dcy": "д",
			"Dcy": "Д",
			"dd": "ⅆ",
			"DD": "ⅅ",
			"ddagger": "‡",
			"ddarr": "⇊",
			"DDotrahd": "⤑",
			"ddotseq": "⩷",
			"deg": "°",
			"Del": "∇",
			"delta": "δ",
			"Delta": "Δ",
			"demptyv": "⦱",
			"dfisht": "⥿",
			"dfr": "𝔡",
			"Dfr": "𝔇",
			"dHar": "⥥",
			"dharl": "⇃",
			"dharr": "⇂",
			"DiacriticalAcute": "´",
			"DiacriticalDot": "˙",
			"DiacriticalDoubleAcute": "˝",
			"DiacriticalGrave": "`",
			"DiacriticalTilde": "˜",
			"diam": "⋄",
			"diamond": "⋄",
			"Diamond": "⋄",
			"diamondsuit": "♦",
			"diams": "♦",
			"die": "¨",
			"DifferentialD": "ⅆ",
			"digamma": "ϝ",
			"disin": "⋲",
			"div": "÷",
			"divide": "÷",
			"divideontimes": "⋇",
			"divonx": "⋇",
			"djcy": "ђ",
			"DJcy": "Ђ",
			"dlcorn": "⌞",
			"dlcrop": "⌍",
			"dollar": "$",
			"dopf": "𝕕",
			"Dopf": "𝔻",
			"dot": "˙",
			"Dot": "¨",
			"DotDot": "⃜",
			"doteq": "≐",
			"doteqdot": "≑",
			"DotEqual": "≐",
			"dotminus": "∸",
			"dotplus": "∔",
			"dotsquare": "⊡",
			"doublebarwedge": "⌆",
			"DoubleContourIntegral": "∯",
			"DoubleDot": "¨",
			"DoubleDownArrow": "⇓",
			"DoubleLeftArrow": "⇐",
			"DoubleLeftRightArrow": "⇔",
			"DoubleLeftTee": "⫤",
			"DoubleLongLeftArrow": "⟸",
			"DoubleLongLeftRightArrow": "⟺",
			"DoubleLongRightArrow": "⟹",
			"DoubleRightArrow": "⇒",
			"DoubleRightTee": "⊨",
			"DoubleUpArrow": "⇑",
			"DoubleUpDownArrow": "⇕",
			"DoubleVerticalBar": "∥",
			"downarrow": "↓",
			"Downarrow": "⇓",
			"DownArrow": "↓",
			"DownArrowBar": "⤓",
			"DownArrowUpArrow": "⇵",
			"DownBreve": "̑",
			"downdownarrows": "⇊",
			"downharpoonleft": "⇃",
			"downharpoonright": "⇂",
			"DownLeftRightVector": "⥐",
			"DownLeftTeeVector": "⥞",
			"DownLeftVector": "↽",
			"DownLeftVectorBar": "⥖",
			"DownRightTeeVector": "⥟",
			"DownRightVector": "⇁",
			"DownRightVectorBar": "⥗",
			"DownTee": "⊤",
			"DownTeeArrow": "↧",
			"drbkarow": "⤐",
			"drcorn": "⌟",
			"drcrop": "⌌",
			"dscr": "𝒹",
			"Dscr": "𝒟",
			"dscy": "ѕ",
			"DScy": "Ѕ",
			"dsol": "⧶",
			"dstrok": "đ",
			"Dstrok": "Đ",
			"dtdot": "⋱",
			"dtri": "▿",
			"dtrif": "▾",
			"duarr": "⇵",
			"duhar": "⥯",
			"dwangle": "⦦",
			"dzcy": "џ",
			"DZcy": "Џ",
			"dzigrarr": "⟿",
			"eacute": "é",
			"Eacute": "É",
			"easter": "⩮",
			"ecaron": "ě",
			"Ecaron": "Ě",
			"ecir": "≖",
			"ecirc": "ê",
			"Ecirc": "Ê",
			"ecolon": "≕",
			"ecy": "э",
			"Ecy": "Э",
			"eDDot": "⩷",
			"edot": "ė",
			"eDot": "≑",
			"Edot": "Ė",
			"ee": "ⅇ",
			"efDot": "≒",
			"efr": "𝔢",
			"Efr": "𝔈",
			"eg": "⪚",
			"egrave": "è",
			"Egrave": "È",
			"egs": "⪖",
			"egsdot": "⪘",
			"el": "⪙",
			"Element": "∈",
			"elinters": "⏧",
			"ell": "ℓ",
			"els": "⪕",
			"elsdot": "⪗",
			"emacr": "ē",
			"Emacr": "Ē",
			"empty": "∅",
			"emptyset": "∅",
			"EmptySmallSquare": "◻",
			"emptyv": "∅",
			"EmptyVerySmallSquare": "▫",
			"emsp": " ",
			"emsp13": " ",
			"emsp14": " ",
			"eng": "ŋ",
			"ENG": "Ŋ",
			"ensp": " ",
			"eogon": "ę",
			"Eogon": "Ę",
			"eopf": "𝕖",
			"Eopf": "𝔼",
			"epar": "⋕",
			"eparsl": "⧣",
			"eplus": "⩱",
			"epsi": "ε",
			"epsilon": "ε",
			"Epsilon": "Ε",
			"epsiv": "ϵ",
			"eqcirc": "≖",
			"eqcolon": "≕",
			"eqsim": "≂",
			"eqslantgtr": "⪖",
			"eqslantless": "⪕",
			"Equal": "⩵",
			"equals": "=",
			"EqualTilde": "≂",
			"equest": "≟",
			"Equilibrium": "⇌",
			"equiv": "≡",
			"equivDD": "⩸",
			"eqvparsl": "⧥",
			"erarr": "⥱",
			"erDot": "≓",
			"escr": "ℯ",
			"Escr": "ℰ",
			"esdot": "≐",
			"esim": "≂",
			"Esim": "⩳",
			"eta": "η",
			"Eta": "Η",
			"eth": "ð",
			"ETH": "Ð",
			"euml": "ë",
			"Euml": "Ë",
			"euro": "€",
			"excl": "!",
			"exist": "∃",
			"Exists": "∃",
			"expectation": "ℰ",
			"exponentiale": "ⅇ",
			"ExponentialE": "ⅇ",
			"fallingdotseq": "≒",
			"fcy": "ф",
			"Fcy": "Ф",
			"female": "♀",
			"ffilig": "ﬃ",
			"fflig": "ﬀ",
			"ffllig": "ﬄ",
			"ffr": "𝔣",
			"Ffr": "𝔉",
			"filig": "ﬁ",
			"FilledSmallSquare": "◼",
			"FilledVerySmallSquare": "▪",
			"fjlig": "fj",
			"flat": "♭",
			"fllig": "ﬂ",
			"fltns": "▱",
			"fnof": "ƒ",
			"fopf": "𝕗",
			"Fopf": "𝔽",
			"forall": "∀",
			"ForAll": "∀",
			"fork": "⋔",
			"forkv": "⫙",
			"Fouriertrf": "ℱ",
			"fpartint": "⨍",
			"frac12": "½",
			"frac13": "⅓",
			"frac14": "¼",
			"frac15": "⅕",
			"frac16": "⅙",
			"frac18": "⅛",
			"frac23": "⅔",
			"frac25": "⅖",
			"frac34": "¾",
			"frac35": "⅗",
			"frac38": "⅜",
			"frac45": "⅘",
			"frac56": "⅚",
			"frac58": "⅝",
			"frac78": "⅞",
			"frasl": "⁄",
			"frown": "⌢",
			"fscr": "𝒻",
			"Fscr": "ℱ",
			"gacute": "ǵ",
			"gamma": "γ",
			"Gamma": "Γ",
			"gammad": "ϝ",
			"Gammad": "Ϝ",
			"gap": "⪆",
			"gbreve": "ğ",
			"Gbreve": "Ğ",
			"Gcedil": "Ģ",
			"gcirc": "ĝ",
			"Gcirc": "Ĝ",
			"gcy": "г",
			"Gcy": "Г",
			"gdot": "ġ",
			"Gdot": "Ġ",
			"ge": "≥",
			"gE": "≧",
			"gel": "⋛",
			"gEl": "⪌",
			"geq": "≥",
			"geqq": "≧",
			"geqslant": "⩾",
			"ges": "⩾",
			"gescc": "⪩",
			"gesdot": "⪀",
			"gesdoto": "⪂",
			"gesdotol": "⪄",
			"gesl": "⋛︀",
			"gesles": "⪔",
			"gfr": "𝔤",
			"Gfr": "𝔊",
			"gg": "≫",
			"Gg": "⋙",
			"ggg": "⋙",
			"gimel": "ℷ",
			"gjcy": "ѓ",
			"GJcy": "Ѓ",
			"gl": "≷",
			"gla": "⪥",
			"glE": "⪒",
			"glj": "⪤",
			"gnap": "⪊",
			"gnapprox": "⪊",
			"gne": "⪈",
			"gnE": "≩",
			"gneq": "⪈",
			"gneqq": "≩",
			"gnsim": "⋧",
			"gopf": "𝕘",
			"Gopf": "𝔾",
			"grave": "`",
			"GreaterEqual": "≥",
			"GreaterEqualLess": "⋛",
			"GreaterFullEqual": "≧",
			"GreaterGreater": "⪢",
			"GreaterLess": "≷",
			"GreaterSlantEqual": "⩾",
			"GreaterTilde": "≳",
			"gscr": "ℊ",
			"Gscr": "𝒢",
			"gsim": "≳",
			"gsime": "⪎",
			"gsiml": "⪐",
			"gt": ">",
			"Gt": "≫",
			"GT": ">",
			"gtcc": "⪧",
			"gtcir": "⩺",
			"gtdot": "⋗",
			"gtlPar": "⦕",
			"gtquest": "⩼",
			"gtrapprox": "⪆",
			"gtrarr": "⥸",
			"gtrdot": "⋗",
			"gtreqless": "⋛",
			"gtreqqless": "⪌",
			"gtrless": "≷",
			"gtrsim": "≳",
			"gvertneqq": "≩︀",
			"gvnE": "≩︀",
			"Hacek": "ˇ",
			"hairsp": " ",
			"half": "½",
			"hamilt": "ℋ",
			"hardcy": "ъ",
			"HARDcy": "Ъ",
			"harr": "↔",
			"hArr": "⇔",
			"harrcir": "⥈",
			"harrw": "↭",
			"Hat": "^",
			"hbar": "ℏ",
			"hcirc": "ĥ",
			"Hcirc": "Ĥ",
			"hearts": "♥",
			"heartsuit": "♥",
			"hellip": "…",
			"hercon": "⊹",
			"hfr": "𝔥",
			"Hfr": "ℌ",
			"HilbertSpace": "ℋ",
			"hksearow": "⤥",
			"hkswarow": "⤦",
			"hoarr": "⇿",
			"homtht": "∻",
			"hookleftarrow": "↩",
			"hookrightarrow": "↪",
			"hopf": "𝕙",
			"Hopf": "ℍ",
			"horbar": "―",
			"HorizontalLine": "─",
			"hscr": "𝒽",
			"Hscr": "ℋ",
			"hslash": "ℏ",
			"hstrok": "ħ",
			"Hstrok": "Ħ",
			"HumpDownHump": "≎",
			"HumpEqual": "≏",
			"hybull": "⁃",
			"hyphen": "‐",
			"iacute": "í",
			"Iacute": "Í",
			"ic": "⁣",
			"icirc": "î",
			"Icirc": "Î",
			"icy": "и",
			"Icy": "И",
			"Idot": "İ",
			"iecy": "е",
			"IEcy": "Е",
			"iexcl": "¡",
			"iff": "⇔",
			"ifr": "𝔦",
			"Ifr": "ℑ",
			"igrave": "ì",
			"Igrave": "Ì",
			"ii": "ⅈ",
			"iiiint": "⨌",
			"iiint": "∭",
			"iinfin": "⧜",
			"iiota": "℩",
			"ijlig": "ĳ",
			"IJlig": "Ĳ",
			"Im": "ℑ",
			"imacr": "ī",
			"Imacr": "Ī",
			"image": "ℑ",
			"ImaginaryI": "ⅈ",
			"imagline": "ℐ",
			"imagpart": "ℑ",
			"imath": "ı",
			"imof": "⊷",
			"imped": "Ƶ",
			"Implies": "⇒",
			"in": "∈",
			"incare": "℅",
			"infin": "∞",
			"infintie": "⧝",
			"inodot": "ı",
			"int": "∫",
			"Int": "∬",
			"intcal": "⊺",
			"integers": "ℤ",
			"Integral": "∫",
			"intercal": "⊺",
			"Intersection": "⋂",
			"intlarhk": "⨗",
			"intprod": "⨼",
			"InvisibleComma": "⁣",
			"InvisibleTimes": "⁢",
			"iocy": "ё",
			"IOcy": "Ё",
			"iogon": "į",
			"Iogon": "Į",
			"iopf": "𝕚",
			"Iopf": "𝕀",
			"iota": "ι",
			"Iota": "Ι",
			"iprod": "⨼",
			"iquest": "¿",
			"iscr": "𝒾",
			"Iscr": "ℐ",
			"isin": "∈",
			"isindot": "⋵",
			"isinE": "⋹",
			"isins": "⋴",
			"isinsv": "⋳",
			"isinv": "∈",
			"it": "⁢",
			"itilde": "ĩ",
			"Itilde": "Ĩ",
			"iukcy": "і",
			"Iukcy": "І",
			"iuml": "ï",
			"Iuml": "Ï",
			"jcirc": "ĵ",
			"Jcirc": "Ĵ",
			"jcy": "й",
			"Jcy": "Й",
			"jfr": "𝔧",
			"Jfr": "𝔍",
			"jmath": "ȷ",
			"jopf": "𝕛",
			"Jopf": "𝕁",
			"jscr": "𝒿",
			"Jscr": "𝒥",
			"jsercy": "ј",
			"Jsercy": "Ј",
			"jukcy": "є",
			"Jukcy": "Є",
			"kappa": "κ",
			"Kappa": "Κ",
			"kappav": "ϰ",
			"kcedil": "ķ",
			"Kcedil": "Ķ",
			"kcy": "к",
			"Kcy": "К",
			"kfr": "𝔨",
			"Kfr": "𝔎",
			"kgreen": "ĸ",
			"khcy": "х",
			"KHcy": "Х",
			"kjcy": "ќ",
			"KJcy": "Ќ",
			"kopf": "𝕜",
			"Kopf": "𝕂",
			"kscr": "𝓀",
			"Kscr": "𝒦",
			"lAarr": "⇚",
			"lacute": "ĺ",
			"Lacute": "Ĺ",
			"laemptyv": "⦴",
			"lagran": "ℒ",
			"lambda": "λ",
			"Lambda": "Λ",
			"lang": "⟨",
			"Lang": "⟪",
			"langd": "⦑",
			"langle": "⟨",
			"lap": "⪅",
			"Laplacetrf": "ℒ",
			"laquo": "«",
			"larr": "←",
			"lArr": "⇐",
			"Larr": "↞",
			"larrb": "⇤",
			"larrbfs": "⤟",
			"larrfs": "⤝",
			"larrhk": "↩",
			"larrlp": "↫",
			"larrpl": "⤹",
			"larrsim": "⥳",
			"larrtl": "↢",
			"lat": "⪫",
			"latail": "⤙",
			"lAtail": "⤛",
			"late": "⪭",
			"lates": "⪭︀",
			"lbarr": "⤌",
			"lBarr": "⤎",
			"lbbrk": "❲",
			"lbrace": "{",
			"lbrack": "[",
			"lbrke": "⦋",
			"lbrksld": "⦏",
			"lbrkslu": "⦍",
			"lcaron": "ľ",
			"Lcaron": "Ľ",
			"lcedil": "ļ",
			"Lcedil": "Ļ",
			"lceil": "⌈",
			"lcub": "{",
			"lcy": "л",
			"Lcy": "Л",
			"ldca": "⤶",
			"ldquo": "“",
			"ldquor": "„",
			"ldrdhar": "⥧",
			"ldrushar": "⥋",
			"ldsh": "↲",
			"le": "≤",
			"lE": "≦",
			"LeftAngleBracket": "⟨",
			"leftarrow": "←",
			"Leftarrow": "⇐",
			"LeftArrow": "←",
			"LeftArrowBar": "⇤",
			"LeftArrowRightArrow": "⇆",
			"leftarrowtail": "↢",
			"LeftCeiling": "⌈",
			"LeftDoubleBracket": "⟦",
			"LeftDownTeeVector": "⥡",
			"LeftDownVector": "⇃",
			"LeftDownVectorBar": "⥙",
			"LeftFloor": "⌊",
			"leftharpoondown": "↽",
			"leftharpoonup": "↼",
			"leftleftarrows": "⇇",
			"leftrightarrow": "↔",
			"Leftrightarrow": "⇔",
			"LeftRightArrow": "↔",
			"leftrightarrows": "⇆",
			"leftrightharpoons": "⇋",
			"leftrightsquigarrow": "↭",
			"LeftRightVector": "⥎",
			"LeftTee": "⊣",
			"LeftTeeArrow": "↤",
			"LeftTeeVector": "⥚",
			"leftthreetimes": "⋋",
			"LeftTriangle": "⊲",
			"LeftTriangleBar": "⧏",
			"LeftTriangleEqual": "⊴",
			"LeftUpDownVector": "⥑",
			"LeftUpTeeVector": "⥠",
			"LeftUpVector": "↿",
			"LeftUpVectorBar": "⥘",
			"LeftVector": "↼",
			"LeftVectorBar": "⥒",
			"leg": "⋚",
			"lEg": "⪋",
			"leq": "≤",
			"leqq": "≦",
			"leqslant": "⩽",
			"les": "⩽",
			"lescc": "⪨",
			"lesdot": "⩿",
			"lesdoto": "⪁",
			"lesdotor": "⪃",
			"lesg": "⋚︀",
			"lesges": "⪓",
			"lessapprox": "⪅",
			"lessdot": "⋖",
			"lesseqgtr": "⋚",
			"lesseqqgtr": "⪋",
			"LessEqualGreater": "⋚",
			"LessFullEqual": "≦",
			"LessGreater": "≶",
			"lessgtr": "≶",
			"LessLess": "⪡",
			"lesssim": "≲",
			"LessSlantEqual": "⩽",
			"LessTilde": "≲",
			"lfisht": "⥼",
			"lfloor": "⌊",
			"lfr": "𝔩",
			"Lfr": "𝔏",
			"lg": "≶",
			"lgE": "⪑",
			"lHar": "⥢",
			"lhard": "↽",
			"lharu": "↼",
			"lharul": "⥪",
			"lhblk": "▄",
			"ljcy": "љ",
			"LJcy": "Љ",
			"ll": "≪",
			"Ll": "⋘",
			"llarr": "⇇",
			"llcorner": "⌞",
			"Lleftarrow": "⇚",
			"llhard": "⥫",
			"lltri": "◺",
			"lmidot": "ŀ",
			"Lmidot": "Ŀ",
			"lmoust": "⎰",
			"lmoustache": "⎰",
			"lnap": "⪉",
			"lnapprox": "⪉",
			"lne": "⪇",
			"lnE": "≨",
			"lneq": "⪇",
			"lneqq": "≨",
			"lnsim": "⋦",
			"loang": "⟬",
			"loarr": "⇽",
			"lobrk": "⟦",
			"longleftarrow": "⟵",
			"Longleftarrow": "⟸",
			"LongLeftArrow": "⟵",
			"longleftrightarrow": "⟷",
			"Longleftrightarrow": "⟺",
			"LongLeftRightArrow": "⟷",
			"longmapsto": "⟼",
			"longrightarrow": "⟶",
			"Longrightarrow": "⟹",
			"LongRightArrow": "⟶",
			"looparrowleft": "↫",
			"looparrowright": "↬",
			"lopar": "⦅",
			"lopf": "𝕝",
			"Lopf": "𝕃",
			"loplus": "⨭",
			"lotimes": "⨴",
			"lowast": "∗",
			"lowbar": "_",
			"LowerLeftArrow": "↙",
			"LowerRightArrow": "↘",
			"loz": "◊",
			"lozenge": "◊",
			"lozf": "⧫",
			"lpar": "(",
			"lparlt": "⦓",
			"lrarr": "⇆",
			"lrcorner": "⌟",
			"lrhar": "⇋",
			"lrhard": "⥭",
			"lrm": "‎",
			"lrtri": "⊿",
			"lsaquo": "‹",
			"lscr": "𝓁",
			"Lscr": "ℒ",
			"lsh": "↰",
			"Lsh": "↰",
			"lsim": "≲",
			"lsime": "⪍",
			"lsimg": "⪏",
			"lsqb": "[",
			"lsquo": "‘",
			"lsquor": "‚",
			"lstrok": "ł",
			"Lstrok": "Ł",
			"lt": "<",
			"Lt": "≪",
			"LT": "<",
			"ltcc": "⪦",
			"ltcir": "⩹",
			"ltdot": "⋖",
			"lthree": "⋋",
			"ltimes": "⋉",
			"ltlarr": "⥶",
			"ltquest": "⩻",
			"ltri": "◃",
			"ltrie": "⊴",
			"ltrif": "◂",
			"ltrPar": "⦖",
			"lurdshar": "⥊",
			"luruhar": "⥦",
			"lvertneqq": "≨︀",
			"lvnE": "≨︀",
			"macr": "¯",
			"male": "♂",
			"malt": "✠",
			"maltese": "✠",
			"map": "↦",
			"Map": "⤅",
			"mapsto": "↦",
			"mapstodown": "↧",
			"mapstoleft": "↤",
			"mapstoup": "↥",
			"marker": "▮",
			"mcomma": "⨩",
			"mcy": "м",
			"Mcy": "М",
			"mdash": "—",
			"mDDot": "∺",
			"measuredangle": "∡",
			"MediumSpace": " ",
			"Mellintrf": "ℳ",
			"mfr": "𝔪",
			"Mfr": "𝔐",
			"mho": "℧",
			"micro": "µ",
			"mid": "∣",
			"midast": "*",
			"midcir": "⫰",
			"middot": "·",
			"minus": "−",
			"minusb": "⊟",
			"minusd": "∸",
			"minusdu": "⨪",
			"MinusPlus": "∓",
			"mlcp": "⫛",
			"mldr": "…",
			"mnplus": "∓",
			"models": "⊧",
			"mopf": "𝕞",
			"Mopf": "𝕄",
			"mp": "∓",
			"mscr": "𝓂",
			"Mscr": "ℳ",
			"mstpos": "∾",
			"mu": "μ",
			"Mu": "Μ",
			"multimap": "⊸",
			"mumap": "⊸",
			"nabla": "∇",
			"nacute": "ń",
			"Nacute": "Ń",
			"nang": "∠⃒",
			"nap": "≉",
			"napE": "⩰̸",
			"napid": "≋̸",
			"napos": "ŉ",
			"napprox": "≉",
			"natur": "♮",
			"natural": "♮",
			"naturals": "ℕ",
			"nbsp": "\xA0",
			"nbump": "≎̸",
			"nbumpe": "≏̸",
			"ncap": "⩃",
			"ncaron": "ň",
			"Ncaron": "Ň",
			"ncedil": "ņ",
			"Ncedil": "Ņ",
			"ncong": "≇",
			"ncongdot": "⩭̸",
			"ncup": "⩂",
			"ncy": "н",
			"Ncy": "Н",
			"ndash": "–",
			"ne": "≠",
			"nearhk": "⤤",
			"nearr": "↗",
			"neArr": "⇗",
			"nearrow": "↗",
			"nedot": "≐̸",
			"NegativeMediumSpace": "​",
			"NegativeThickSpace": "​",
			"NegativeThinSpace": "​",
			"NegativeVeryThinSpace": "​",
			"nequiv": "≢",
			"nesear": "⤨",
			"nesim": "≂̸",
			"NestedGreaterGreater": "≫",
			"NestedLessLess": "≪",
			"NewLine": "\n",
			"nexist": "∄",
			"nexists": "∄",
			"nfr": "𝔫",
			"Nfr": "𝔑",
			"nge": "≱",
			"ngE": "≧̸",
			"ngeq": "≱",
			"ngeqq": "≧̸",
			"ngeqslant": "⩾̸",
			"nges": "⩾̸",
			"nGg": "⋙̸",
			"ngsim": "≵",
			"ngt": "≯",
			"nGt": "≫⃒",
			"ngtr": "≯",
			"nGtv": "≫̸",
			"nharr": "↮",
			"nhArr": "⇎",
			"nhpar": "⫲",
			"ni": "∋",
			"nis": "⋼",
			"nisd": "⋺",
			"niv": "∋",
			"njcy": "њ",
			"NJcy": "Њ",
			"nlarr": "↚",
			"nlArr": "⇍",
			"nldr": "‥",
			"nle": "≰",
			"nlE": "≦̸",
			"nleftarrow": "↚",
			"nLeftarrow": "⇍",
			"nleftrightarrow": "↮",
			"nLeftrightarrow": "⇎",
			"nleq": "≰",
			"nleqq": "≦̸",
			"nleqslant": "⩽̸",
			"nles": "⩽̸",
			"nless": "≮",
			"nLl": "⋘̸",
			"nlsim": "≴",
			"nlt": "≮",
			"nLt": "≪⃒",
			"nltri": "⋪",
			"nltrie": "⋬",
			"nLtv": "≪̸",
			"nmid": "∤",
			"NoBreak": "⁠",
			"NonBreakingSpace": "\xA0",
			"nopf": "𝕟",
			"Nopf": "ℕ",
			"not": "¬",
			"Not": "⫬",
			"NotCongruent": "≢",
			"NotCupCap": "≭",
			"NotDoubleVerticalBar": "∦",
			"NotElement": "∉",
			"NotEqual": "≠",
			"NotEqualTilde": "≂̸",
			"NotExists": "∄",
			"NotGreater": "≯",
			"NotGreaterEqual": "≱",
			"NotGreaterFullEqual": "≧̸",
			"NotGreaterGreater": "≫̸",
			"NotGreaterLess": "≹",
			"NotGreaterSlantEqual": "⩾̸",
			"NotGreaterTilde": "≵",
			"NotHumpDownHump": "≎̸",
			"NotHumpEqual": "≏̸",
			"notin": "∉",
			"notindot": "⋵̸",
			"notinE": "⋹̸",
			"notinva": "∉",
			"notinvb": "⋷",
			"notinvc": "⋶",
			"NotLeftTriangle": "⋪",
			"NotLeftTriangleBar": "⧏̸",
			"NotLeftTriangleEqual": "⋬",
			"NotLess": "≮",
			"NotLessEqual": "≰",
			"NotLessGreater": "≸",
			"NotLessLess": "≪̸",
			"NotLessSlantEqual": "⩽̸",
			"NotLessTilde": "≴",
			"NotNestedGreaterGreater": "⪢̸",
			"NotNestedLessLess": "⪡̸",
			"notni": "∌",
			"notniva": "∌",
			"notnivb": "⋾",
			"notnivc": "⋽",
			"NotPrecedes": "⊀",
			"NotPrecedesEqual": "⪯̸",
			"NotPrecedesSlantEqual": "⋠",
			"NotReverseElement": "∌",
			"NotRightTriangle": "⋫",
			"NotRightTriangleBar": "⧐̸",
			"NotRightTriangleEqual": "⋭",
			"NotSquareSubset": "⊏̸",
			"NotSquareSubsetEqual": "⋢",
			"NotSquareSuperset": "⊐̸",
			"NotSquareSupersetEqual": "⋣",
			"NotSubset": "⊂⃒",
			"NotSubsetEqual": "⊈",
			"NotSucceeds": "⊁",
			"NotSucceedsEqual": "⪰̸",
			"NotSucceedsSlantEqual": "⋡",
			"NotSucceedsTilde": "≿̸",
			"NotSuperset": "⊃⃒",
			"NotSupersetEqual": "⊉",
			"NotTilde": "≁",
			"NotTildeEqual": "≄",
			"NotTildeFullEqual": "≇",
			"NotTildeTilde": "≉",
			"NotVerticalBar": "∤",
			"npar": "∦",
			"nparallel": "∦",
			"nparsl": "⫽⃥",
			"npart": "∂̸",
			"npolint": "⨔",
			"npr": "⊀",
			"nprcue": "⋠",
			"npre": "⪯̸",
			"nprec": "⊀",
			"npreceq": "⪯̸",
			"nrarr": "↛",
			"nrArr": "⇏",
			"nrarrc": "⤳̸",
			"nrarrw": "↝̸",
			"nrightarrow": "↛",
			"nRightarrow": "⇏",
			"nrtri": "⋫",
			"nrtrie": "⋭",
			"nsc": "⊁",
			"nsccue": "⋡",
			"nsce": "⪰̸",
			"nscr": "𝓃",
			"Nscr": "𝒩",
			"nshortmid": "∤",
			"nshortparallel": "∦",
			"nsim": "≁",
			"nsime": "≄",
			"nsimeq": "≄",
			"nsmid": "∤",
			"nspar": "∦",
			"nsqsube": "⋢",
			"nsqsupe": "⋣",
			"nsub": "⊄",
			"nsube": "⊈",
			"nsubE": "⫅̸",
			"nsubset": "⊂⃒",
			"nsubseteq": "⊈",
			"nsubseteqq": "⫅̸",
			"nsucc": "⊁",
			"nsucceq": "⪰̸",
			"nsup": "⊅",
			"nsupe": "⊉",
			"nsupE": "⫆̸",
			"nsupset": "⊃⃒",
			"nsupseteq": "⊉",
			"nsupseteqq": "⫆̸",
			"ntgl": "≹",
			"ntilde": "ñ",
			"Ntilde": "Ñ",
			"ntlg": "≸",
			"ntriangleleft": "⋪",
			"ntrianglelefteq": "⋬",
			"ntriangleright": "⋫",
			"ntrianglerighteq": "⋭",
			"nu": "ν",
			"Nu": "Ν",
			"num": "#",
			"numero": "№",
			"numsp": " ",
			"nvap": "≍⃒",
			"nvdash": "⊬",
			"nvDash": "⊭",
			"nVdash": "⊮",
			"nVDash": "⊯",
			"nvge": "≥⃒",
			"nvgt": ">⃒",
			"nvHarr": "⤄",
			"nvinfin": "⧞",
			"nvlArr": "⤂",
			"nvle": "≤⃒",
			"nvlt": "<⃒",
			"nvltrie": "⊴⃒",
			"nvrArr": "⤃",
			"nvrtrie": "⊵⃒",
			"nvsim": "∼⃒",
			"nwarhk": "⤣",
			"nwarr": "↖",
			"nwArr": "⇖",
			"nwarrow": "↖",
			"nwnear": "⤧",
			"oacute": "ó",
			"Oacute": "Ó",
			"oast": "⊛",
			"ocir": "⊚",
			"ocirc": "ô",
			"Ocirc": "Ô",
			"ocy": "о",
			"Ocy": "О",
			"odash": "⊝",
			"odblac": "ő",
			"Odblac": "Ő",
			"odiv": "⨸",
			"odot": "⊙",
			"odsold": "⦼",
			"oelig": "œ",
			"OElig": "Œ",
			"ofcir": "⦿",
			"ofr": "𝔬",
			"Ofr": "𝔒",
			"ogon": "˛",
			"ograve": "ò",
			"Ograve": "Ò",
			"ogt": "⧁",
			"ohbar": "⦵",
			"ohm": "Ω",
			"oint": "∮",
			"olarr": "↺",
			"olcir": "⦾",
			"olcross": "⦻",
			"oline": "‾",
			"olt": "⧀",
			"omacr": "ō",
			"Omacr": "Ō",
			"omega": "ω",
			"Omega": "Ω",
			"omicron": "ο",
			"Omicron": "Ο",
			"omid": "⦶",
			"ominus": "⊖",
			"oopf": "𝕠",
			"Oopf": "𝕆",
			"opar": "⦷",
			"OpenCurlyDoubleQuote": "“",
			"OpenCurlyQuote": "‘",
			"operp": "⦹",
			"oplus": "⊕",
			"or": "∨",
			"Or": "⩔",
			"orarr": "↻",
			"ord": "⩝",
			"order": "ℴ",
			"orderof": "ℴ",
			"ordf": "ª",
			"ordm": "º",
			"origof": "⊶",
			"oror": "⩖",
			"orslope": "⩗",
			"orv": "⩛",
			"oS": "Ⓢ",
			"oscr": "ℴ",
			"Oscr": "𝒪",
			"oslash": "ø",
			"Oslash": "Ø",
			"osol": "⊘",
			"otilde": "õ",
			"Otilde": "Õ",
			"otimes": "⊗",
			"Otimes": "⨷",
			"otimesas": "⨶",
			"ouml": "ö",
			"Ouml": "Ö",
			"ovbar": "⌽",
			"OverBar": "‾",
			"OverBrace": "⏞",
			"OverBracket": "⎴",
			"OverParenthesis": "⏜",
			"par": "∥",
			"para": "¶",
			"parallel": "∥",
			"parsim": "⫳",
			"parsl": "⫽",
			"part": "∂",
			"PartialD": "∂",
			"pcy": "п",
			"Pcy": "П",
			"percnt": "%",
			"period": ".",
			"permil": "‰",
			"perp": "⊥",
			"pertenk": "‱",
			"pfr": "𝔭",
			"Pfr": "𝔓",
			"phi": "φ",
			"Phi": "Φ",
			"phiv": "ϕ",
			"phmmat": "ℳ",
			"phone": "☎",
			"pi": "π",
			"Pi": "Π",
			"pitchfork": "⋔",
			"piv": "ϖ",
			"planck": "ℏ",
			"planckh": "ℎ",
			"plankv": "ℏ",
			"plus": "+",
			"plusacir": "⨣",
			"plusb": "⊞",
			"pluscir": "⨢",
			"plusdo": "∔",
			"plusdu": "⨥",
			"pluse": "⩲",
			"PlusMinus": "±",
			"plusmn": "±",
			"plussim": "⨦",
			"plustwo": "⨧",
			"pm": "±",
			"Poincareplane": "ℌ",
			"pointint": "⨕",
			"popf": "𝕡",
			"Popf": "ℙ",
			"pound": "£",
			"pr": "≺",
			"Pr": "⪻",
			"prap": "⪷",
			"prcue": "≼",
			"pre": "⪯",
			"prE": "⪳",
			"prec": "≺",
			"precapprox": "⪷",
			"preccurlyeq": "≼",
			"Precedes": "≺",
			"PrecedesEqual": "⪯",
			"PrecedesSlantEqual": "≼",
			"PrecedesTilde": "≾",
			"preceq": "⪯",
			"precnapprox": "⪹",
			"precneqq": "⪵",
			"precnsim": "⋨",
			"precsim": "≾",
			"prime": "′",
			"Prime": "″",
			"primes": "ℙ",
			"prnap": "⪹",
			"prnE": "⪵",
			"prnsim": "⋨",
			"prod": "∏",
			"Product": "∏",
			"profalar": "⌮",
			"profline": "⌒",
			"profsurf": "⌓",
			"prop": "∝",
			"Proportion": "∷",
			"Proportional": "∝",
			"propto": "∝",
			"prsim": "≾",
			"prurel": "⊰",
			"pscr": "𝓅",
			"Pscr": "𝒫",
			"psi": "ψ",
			"Psi": "Ψ",
			"puncsp": " ",
			"qfr": "𝔮",
			"Qfr": "𝔔",
			"qint": "⨌",
			"qopf": "𝕢",
			"Qopf": "ℚ",
			"qprime": "⁗",
			"qscr": "𝓆",
			"Qscr": "𝒬",
			"quaternions": "ℍ",
			"quatint": "⨖",
			"quest": "?",
			"questeq": "≟",
			"quot": "\"",
			"QUOT": "\"",
			"rAarr": "⇛",
			"race": "∽̱",
			"racute": "ŕ",
			"Racute": "Ŕ",
			"radic": "√",
			"raemptyv": "⦳",
			"rang": "⟩",
			"Rang": "⟫",
			"rangd": "⦒",
			"range": "⦥",
			"rangle": "⟩",
			"raquo": "»",
			"rarr": "→",
			"rArr": "⇒",
			"Rarr": "↠",
			"rarrap": "⥵",
			"rarrb": "⇥",
			"rarrbfs": "⤠",
			"rarrc": "⤳",
			"rarrfs": "⤞",
			"rarrhk": "↪",
			"rarrlp": "↬",
			"rarrpl": "⥅",
			"rarrsim": "⥴",
			"rarrtl": "↣",
			"Rarrtl": "⤖",
			"rarrw": "↝",
			"ratail": "⤚",
			"rAtail": "⤜",
			"ratio": "∶",
			"rationals": "ℚ",
			"rbarr": "⤍",
			"rBarr": "⤏",
			"RBarr": "⤐",
			"rbbrk": "❳",
			"rbrace": "}",
			"rbrack": "]",
			"rbrke": "⦌",
			"rbrksld": "⦎",
			"rbrkslu": "⦐",
			"rcaron": "ř",
			"Rcaron": "Ř",
			"rcedil": "ŗ",
			"Rcedil": "Ŗ",
			"rceil": "⌉",
			"rcub": "}",
			"rcy": "р",
			"Rcy": "Р",
			"rdca": "⤷",
			"rdldhar": "⥩",
			"rdquo": "”",
			"rdquor": "”",
			"rdsh": "↳",
			"Re": "ℜ",
			"real": "ℜ",
			"realine": "ℛ",
			"realpart": "ℜ",
			"reals": "ℝ",
			"rect": "▭",
			"reg": "®",
			"REG": "®",
			"ReverseElement": "∋",
			"ReverseEquilibrium": "⇋",
			"ReverseUpEquilibrium": "⥯",
			"rfisht": "⥽",
			"rfloor": "⌋",
			"rfr": "𝔯",
			"Rfr": "ℜ",
			"rHar": "⥤",
			"rhard": "⇁",
			"rharu": "⇀",
			"rharul": "⥬",
			"rho": "ρ",
			"Rho": "Ρ",
			"rhov": "ϱ",
			"RightAngleBracket": "⟩",
			"rightarrow": "→",
			"Rightarrow": "⇒",
			"RightArrow": "→",
			"RightArrowBar": "⇥",
			"RightArrowLeftArrow": "⇄",
			"rightarrowtail": "↣",
			"RightCeiling": "⌉",
			"RightDoubleBracket": "⟧",
			"RightDownTeeVector": "⥝",
			"RightDownVector": "⇂",
			"RightDownVectorBar": "⥕",
			"RightFloor": "⌋",
			"rightharpoondown": "⇁",
			"rightharpoonup": "⇀",
			"rightleftarrows": "⇄",
			"rightleftharpoons": "⇌",
			"rightrightarrows": "⇉",
			"rightsquigarrow": "↝",
			"RightTee": "⊢",
			"RightTeeArrow": "↦",
			"RightTeeVector": "⥛",
			"rightthreetimes": "⋌",
			"RightTriangle": "⊳",
			"RightTriangleBar": "⧐",
			"RightTriangleEqual": "⊵",
			"RightUpDownVector": "⥏",
			"RightUpTeeVector": "⥜",
			"RightUpVector": "↾",
			"RightUpVectorBar": "⥔",
			"RightVector": "⇀",
			"RightVectorBar": "⥓",
			"ring": "˚",
			"risingdotseq": "≓",
			"rlarr": "⇄",
			"rlhar": "⇌",
			"rlm": "‏",
			"rmoust": "⎱",
			"rmoustache": "⎱",
			"rnmid": "⫮",
			"roang": "⟭",
			"roarr": "⇾",
			"robrk": "⟧",
			"ropar": "⦆",
			"ropf": "𝕣",
			"Ropf": "ℝ",
			"roplus": "⨮",
			"rotimes": "⨵",
			"RoundImplies": "⥰",
			"rpar": ")",
			"rpargt": "⦔",
			"rppolint": "⨒",
			"rrarr": "⇉",
			"Rrightarrow": "⇛",
			"rsaquo": "›",
			"rscr": "𝓇",
			"Rscr": "ℛ",
			"rsh": "↱",
			"Rsh": "↱",
			"rsqb": "]",
			"rsquo": "’",
			"rsquor": "’",
			"rthree": "⋌",
			"rtimes": "⋊",
			"rtri": "▹",
			"rtrie": "⊵",
			"rtrif": "▸",
			"rtriltri": "⧎",
			"RuleDelayed": "⧴",
			"ruluhar": "⥨",
			"rx": "℞",
			"sacute": "ś",
			"Sacute": "Ś",
			"sbquo": "‚",
			"sc": "≻",
			"Sc": "⪼",
			"scap": "⪸",
			"scaron": "š",
			"Scaron": "Š",
			"sccue": "≽",
			"sce": "⪰",
			"scE": "⪴",
			"scedil": "ş",
			"Scedil": "Ş",
			"scirc": "ŝ",
			"Scirc": "Ŝ",
			"scnap": "⪺",
			"scnE": "⪶",
			"scnsim": "⋩",
			"scpolint": "⨓",
			"scsim": "≿",
			"scy": "с",
			"Scy": "С",
			"sdot": "⋅",
			"sdotb": "⊡",
			"sdote": "⩦",
			"searhk": "⤥",
			"searr": "↘",
			"seArr": "⇘",
			"searrow": "↘",
			"sect": "§",
			"semi": ";",
			"seswar": "⤩",
			"setminus": "∖",
			"setmn": "∖",
			"sext": "✶",
			"sfr": "𝔰",
			"Sfr": "𝔖",
			"sfrown": "⌢",
			"sharp": "♯",
			"shchcy": "щ",
			"SHCHcy": "Щ",
			"shcy": "ш",
			"SHcy": "Ш",
			"ShortDownArrow": "↓",
			"ShortLeftArrow": "←",
			"shortmid": "∣",
			"shortparallel": "∥",
			"ShortRightArrow": "→",
			"ShortUpArrow": "↑",
			"shy": "­",
			"sigma": "σ",
			"Sigma": "Σ",
			"sigmaf": "ς",
			"sigmav": "ς",
			"sim": "∼",
			"simdot": "⩪",
			"sime": "≃",
			"simeq": "≃",
			"simg": "⪞",
			"simgE": "⪠",
			"siml": "⪝",
			"simlE": "⪟",
			"simne": "≆",
			"simplus": "⨤",
			"simrarr": "⥲",
			"slarr": "←",
			"SmallCircle": "∘",
			"smallsetminus": "∖",
			"smashp": "⨳",
			"smeparsl": "⧤",
			"smid": "∣",
			"smile": "⌣",
			"smt": "⪪",
			"smte": "⪬",
			"smtes": "⪬︀",
			"softcy": "ь",
			"SOFTcy": "Ь",
			"sol": "/",
			"solb": "⧄",
			"solbar": "⌿",
			"sopf": "𝕤",
			"Sopf": "𝕊",
			"spades": "♠",
			"spadesuit": "♠",
			"spar": "∥",
			"sqcap": "⊓",
			"sqcaps": "⊓︀",
			"sqcup": "⊔",
			"sqcups": "⊔︀",
			"Sqrt": "√",
			"sqsub": "⊏",
			"sqsube": "⊑",
			"sqsubset": "⊏",
			"sqsubseteq": "⊑",
			"sqsup": "⊐",
			"sqsupe": "⊒",
			"sqsupset": "⊐",
			"sqsupseteq": "⊒",
			"squ": "□",
			"square": "□",
			"Square": "□",
			"SquareIntersection": "⊓",
			"SquareSubset": "⊏",
			"SquareSubsetEqual": "⊑",
			"SquareSuperset": "⊐",
			"SquareSupersetEqual": "⊒",
			"SquareUnion": "⊔",
			"squarf": "▪",
			"squf": "▪",
			"srarr": "→",
			"sscr": "𝓈",
			"Sscr": "𝒮",
			"ssetmn": "∖",
			"ssmile": "⌣",
			"sstarf": "⋆",
			"star": "☆",
			"Star": "⋆",
			"starf": "★",
			"straightepsilon": "ϵ",
			"straightphi": "ϕ",
			"strns": "¯",
			"sub": "⊂",
			"Sub": "⋐",
			"subdot": "⪽",
			"sube": "⊆",
			"subE": "⫅",
			"subedot": "⫃",
			"submult": "⫁",
			"subne": "⊊",
			"subnE": "⫋",
			"subplus": "⪿",
			"subrarr": "⥹",
			"subset": "⊂",
			"Subset": "⋐",
			"subseteq": "⊆",
			"subseteqq": "⫅",
			"SubsetEqual": "⊆",
			"subsetneq": "⊊",
			"subsetneqq": "⫋",
			"subsim": "⫇",
			"subsub": "⫕",
			"subsup": "⫓",
			"succ": "≻",
			"succapprox": "⪸",
			"succcurlyeq": "≽",
			"Succeeds": "≻",
			"SucceedsEqual": "⪰",
			"SucceedsSlantEqual": "≽",
			"SucceedsTilde": "≿",
			"succeq": "⪰",
			"succnapprox": "⪺",
			"succneqq": "⪶",
			"succnsim": "⋩",
			"succsim": "≿",
			"SuchThat": "∋",
			"sum": "∑",
			"Sum": "∑",
			"sung": "♪",
			"sup": "⊃",
			"Sup": "⋑",
			"sup1": "¹",
			"sup2": "²",
			"sup3": "³",
			"supdot": "⪾",
			"supdsub": "⫘",
			"supe": "⊇",
			"supE": "⫆",
			"supedot": "⫄",
			"Superset": "⊃",
			"SupersetEqual": "⊇",
			"suphsol": "⟉",
			"suphsub": "⫗",
			"suplarr": "⥻",
			"supmult": "⫂",
			"supne": "⊋",
			"supnE": "⫌",
			"supplus": "⫀",
			"supset": "⊃",
			"Supset": "⋑",
			"supseteq": "⊇",
			"supseteqq": "⫆",
			"supsetneq": "⊋",
			"supsetneqq": "⫌",
			"supsim": "⫈",
			"supsub": "⫔",
			"supsup": "⫖",
			"swarhk": "⤦",
			"swarr": "↙",
			"swArr": "⇙",
			"swarrow": "↙",
			"swnwar": "⤪",
			"szlig": "ß",
			"Tab": "	",
			"target": "⌖",
			"tau": "τ",
			"Tau": "Τ",
			"tbrk": "⎴",
			"tcaron": "ť",
			"Tcaron": "Ť",
			"tcedil": "ţ",
			"Tcedil": "Ţ",
			"tcy": "т",
			"Tcy": "Т",
			"tdot": "⃛",
			"telrec": "⌕",
			"tfr": "𝔱",
			"Tfr": "𝔗",
			"there4": "∴",
			"therefore": "∴",
			"Therefore": "∴",
			"theta": "θ",
			"Theta": "Θ",
			"thetasym": "ϑ",
			"thetav": "ϑ",
			"thickapprox": "≈",
			"thicksim": "∼",
			"ThickSpace": "  ",
			"thinsp": " ",
			"ThinSpace": " ",
			"thkap": "≈",
			"thksim": "∼",
			"thorn": "þ",
			"THORN": "Þ",
			"tilde": "˜",
			"Tilde": "∼",
			"TildeEqual": "≃",
			"TildeFullEqual": "≅",
			"TildeTilde": "≈",
			"times": "×",
			"timesb": "⊠",
			"timesbar": "⨱",
			"timesd": "⨰",
			"tint": "∭",
			"toea": "⤨",
			"top": "⊤",
			"topbot": "⌶",
			"topcir": "⫱",
			"topf": "𝕥",
			"Topf": "𝕋",
			"topfork": "⫚",
			"tosa": "⤩",
			"tprime": "‴",
			"trade": "™",
			"TRADE": "™",
			"triangle": "▵",
			"triangledown": "▿",
			"triangleleft": "◃",
			"trianglelefteq": "⊴",
			"triangleq": "≜",
			"triangleright": "▹",
			"trianglerighteq": "⊵",
			"tridot": "◬",
			"trie": "≜",
			"triminus": "⨺",
			"TripleDot": "⃛",
			"triplus": "⨹",
			"trisb": "⧍",
			"tritime": "⨻",
			"trpezium": "⏢",
			"tscr": "𝓉",
			"Tscr": "𝒯",
			"tscy": "ц",
			"TScy": "Ц",
			"tshcy": "ћ",
			"TSHcy": "Ћ",
			"tstrok": "ŧ",
			"Tstrok": "Ŧ",
			"twixt": "≬",
			"twoheadleftarrow": "↞",
			"twoheadrightarrow": "↠",
			"uacute": "ú",
			"Uacute": "Ú",
			"uarr": "↑",
			"uArr": "⇑",
			"Uarr": "↟",
			"Uarrocir": "⥉",
			"ubrcy": "ў",
			"Ubrcy": "Ў",
			"ubreve": "ŭ",
			"Ubreve": "Ŭ",
			"ucirc": "û",
			"Ucirc": "Û",
			"ucy": "у",
			"Ucy": "У",
			"udarr": "⇅",
			"udblac": "ű",
			"Udblac": "Ű",
			"udhar": "⥮",
			"ufisht": "⥾",
			"ufr": "𝔲",
			"Ufr": "𝔘",
			"ugrave": "ù",
			"Ugrave": "Ù",
			"uHar": "⥣",
			"uharl": "↿",
			"uharr": "↾",
			"uhblk": "▀",
			"ulcorn": "⌜",
			"ulcorner": "⌜",
			"ulcrop": "⌏",
			"ultri": "◸",
			"umacr": "ū",
			"Umacr": "Ū",
			"uml": "¨",
			"UnderBar": "_",
			"UnderBrace": "⏟",
			"UnderBracket": "⎵",
			"UnderParenthesis": "⏝",
			"Union": "⋃",
			"UnionPlus": "⊎",
			"uogon": "ų",
			"Uogon": "Ų",
			"uopf": "𝕦",
			"Uopf": "𝕌",
			"uparrow": "↑",
			"Uparrow": "⇑",
			"UpArrow": "↑",
			"UpArrowBar": "⤒",
			"UpArrowDownArrow": "⇅",
			"updownarrow": "↕",
			"Updownarrow": "⇕",
			"UpDownArrow": "↕",
			"UpEquilibrium": "⥮",
			"upharpoonleft": "↿",
			"upharpoonright": "↾",
			"uplus": "⊎",
			"UpperLeftArrow": "↖",
			"UpperRightArrow": "↗",
			"upsi": "υ",
			"Upsi": "ϒ",
			"upsih": "ϒ",
			"upsilon": "υ",
			"Upsilon": "Υ",
			"UpTee": "⊥",
			"UpTeeArrow": "↥",
			"upuparrows": "⇈",
			"urcorn": "⌝",
			"urcorner": "⌝",
			"urcrop": "⌎",
			"uring": "ů",
			"Uring": "Ů",
			"urtri": "◹",
			"uscr": "𝓊",
			"Uscr": "𝒰",
			"utdot": "⋰",
			"utilde": "ũ",
			"Utilde": "Ũ",
			"utri": "▵",
			"utrif": "▴",
			"uuarr": "⇈",
			"uuml": "ü",
			"Uuml": "Ü",
			"uwangle": "⦧",
			"vangrt": "⦜",
			"varepsilon": "ϵ",
			"varkappa": "ϰ",
			"varnothing": "∅",
			"varphi": "ϕ",
			"varpi": "ϖ",
			"varpropto": "∝",
			"varr": "↕",
			"vArr": "⇕",
			"varrho": "ϱ",
			"varsigma": "ς",
			"varsubsetneq": "⊊︀",
			"varsubsetneqq": "⫋︀",
			"varsupsetneq": "⊋︀",
			"varsupsetneqq": "⫌︀",
			"vartheta": "ϑ",
			"vartriangleleft": "⊲",
			"vartriangleright": "⊳",
			"vBar": "⫨",
			"Vbar": "⫫",
			"vBarv": "⫩",
			"vcy": "в",
			"Vcy": "В",
			"vdash": "⊢",
			"vDash": "⊨",
			"Vdash": "⊩",
			"VDash": "⊫",
			"Vdashl": "⫦",
			"vee": "∨",
			"Vee": "⋁",
			"veebar": "⊻",
			"veeeq": "≚",
			"vellip": "⋮",
			"verbar": "|",
			"Verbar": "‖",
			"vert": "|",
			"Vert": "‖",
			"VerticalBar": "∣",
			"VerticalLine": "|",
			"VerticalSeparator": "❘",
			"VerticalTilde": "≀",
			"VeryThinSpace": " ",
			"vfr": "𝔳",
			"Vfr": "𝔙",
			"vltri": "⊲",
			"vnsub": "⊂⃒",
			"vnsup": "⊃⃒",
			"vopf": "𝕧",
			"Vopf": "𝕍",
			"vprop": "∝",
			"vrtri": "⊳",
			"vscr": "𝓋",
			"Vscr": "𝒱",
			"vsubne": "⊊︀",
			"vsubnE": "⫋︀",
			"vsupne": "⊋︀",
			"vsupnE": "⫌︀",
			"Vvdash": "⊪",
			"vzigzag": "⦚",
			"wcirc": "ŵ",
			"Wcirc": "Ŵ",
			"wedbar": "⩟",
			"wedge": "∧",
			"Wedge": "⋀",
			"wedgeq": "≙",
			"weierp": "℘",
			"wfr": "𝔴",
			"Wfr": "𝔚",
			"wopf": "𝕨",
			"Wopf": "𝕎",
			"wp": "℘",
			"wr": "≀",
			"wreath": "≀",
			"wscr": "𝓌",
			"Wscr": "𝒲",
			"xcap": "⋂",
			"xcirc": "◯",
			"xcup": "⋃",
			"xdtri": "▽",
			"xfr": "𝔵",
			"Xfr": "𝔛",
			"xharr": "⟷",
			"xhArr": "⟺",
			"xi": "ξ",
			"Xi": "Ξ",
			"xlarr": "⟵",
			"xlArr": "⟸",
			"xmap": "⟼",
			"xnis": "⋻",
			"xodot": "⨀",
			"xopf": "𝕩",
			"Xopf": "𝕏",
			"xoplus": "⨁",
			"xotime": "⨂",
			"xrarr": "⟶",
			"xrArr": "⟹",
			"xscr": "𝓍",
			"Xscr": "𝒳",
			"xsqcup": "⨆",
			"xuplus": "⨄",
			"xutri": "△",
			"xvee": "⋁",
			"xwedge": "⋀",
			"yacute": "ý",
			"Yacute": "Ý",
			"yacy": "я",
			"YAcy": "Я",
			"ycirc": "ŷ",
			"Ycirc": "Ŷ",
			"ycy": "ы",
			"Ycy": "Ы",
			"yen": "¥",
			"yfr": "𝔶",
			"Yfr": "𝔜",
			"yicy": "ї",
			"YIcy": "Ї",
			"yopf": "𝕪",
			"Yopf": "𝕐",
			"yscr": "𝓎",
			"Yscr": "𝒴",
			"yucy": "ю",
			"YUcy": "Ю",
			"yuml": "ÿ",
			"Yuml": "Ÿ",
			"zacute": "ź",
			"Zacute": "Ź",
			"zcaron": "ž",
			"Zcaron": "Ž",
			"zcy": "з",
			"Zcy": "З",
			"zdot": "ż",
			"Zdot": "Ż",
			"zeetrf": "ℨ",
			"ZeroWidthSpace": "​",
			"zeta": "ζ",
			"Zeta": "Ζ",
			"zfr": "𝔷",
			"Zfr": "ℨ",
			"zhcy": "ж",
			"ZHcy": "Ж",
			"zigrarr": "⇝",
			"zopf": "𝕫",
			"Zopf": "ℤ",
			"zscr": "𝓏",
			"Zscr": "𝒵",
			"zwj": "‍",
			"zwnj": "‌"
		};
		var decodeMapLegacy = {
			"aacute": "á",
			"Aacute": "Á",
			"acirc": "â",
			"Acirc": "Â",
			"acute": "´",
			"aelig": "æ",
			"AElig": "Æ",
			"agrave": "à",
			"Agrave": "À",
			"amp": "&",
			"AMP": "&",
			"aring": "å",
			"Aring": "Å",
			"atilde": "ã",
			"Atilde": "Ã",
			"auml": "ä",
			"Auml": "Ä",
			"brvbar": "¦",
			"ccedil": "ç",
			"Ccedil": "Ç",
			"cedil": "¸",
			"cent": "¢",
			"copy": "©",
			"COPY": "©",
			"curren": "¤",
			"deg": "°",
			"divide": "÷",
			"eacute": "é",
			"Eacute": "É",
			"ecirc": "ê",
			"Ecirc": "Ê",
			"egrave": "è",
			"Egrave": "È",
			"eth": "ð",
			"ETH": "Ð",
			"euml": "ë",
			"Euml": "Ë",
			"frac12": "½",
			"frac14": "¼",
			"frac34": "¾",
			"gt": ">",
			"GT": ">",
			"iacute": "í",
			"Iacute": "Í",
			"icirc": "î",
			"Icirc": "Î",
			"iexcl": "¡",
			"igrave": "ì",
			"Igrave": "Ì",
			"iquest": "¿",
			"iuml": "ï",
			"Iuml": "Ï",
			"laquo": "«",
			"lt": "<",
			"LT": "<",
			"macr": "¯",
			"micro": "µ",
			"middot": "·",
			"nbsp": "\xA0",
			"not": "¬",
			"ntilde": "ñ",
			"Ntilde": "Ñ",
			"oacute": "ó",
			"Oacute": "Ó",
			"ocirc": "ô",
			"Ocirc": "Ô",
			"ograve": "ò",
			"Ograve": "Ò",
			"ordf": "ª",
			"ordm": "º",
			"oslash": "ø",
			"Oslash": "Ø",
			"otilde": "õ",
			"Otilde": "Õ",
			"ouml": "ö",
			"Ouml": "Ö",
			"para": "¶",
			"plusmn": "±",
			"pound": "£",
			"quot": "\"",
			"QUOT": "\"",
			"raquo": "»",
			"reg": "®",
			"REG": "®",
			"sect": "§",
			"shy": "­",
			"sup1": "¹",
			"sup2": "²",
			"sup3": "³",
			"szlig": "ß",
			"thorn": "þ",
			"THORN": "Þ",
			"times": "×",
			"uacute": "ú",
			"Uacute": "Ú",
			"ucirc": "û",
			"Ucirc": "Û",
			"ugrave": "ù",
			"Ugrave": "Ù",
			"uml": "¨",
			"uuml": "ü",
			"Uuml": "Ü",
			"yacute": "ý",
			"Yacute": "Ý",
			"yen": "¥",
			"yuml": "ÿ"
		};
		var decodeMapNumeric = {
			"0": "�",
			"128": "€",
			"130": "‚",
			"131": "ƒ",
			"132": "„",
			"133": "…",
			"134": "†",
			"135": "‡",
			"136": "ˆ",
			"137": "‰",
			"138": "Š",
			"139": "‹",
			"140": "Œ",
			"142": "Ž",
			"145": "‘",
			"146": "’",
			"147": "“",
			"148": "”",
			"149": "•",
			"150": "–",
			"151": "—",
			"152": "˜",
			"153": "™",
			"154": "š",
			"155": "›",
			"156": "œ",
			"158": "ž",
			"159": "Ÿ"
		};
		var invalidReferenceCodePoints = [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			11,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			20,
			21,
			22,
			23,
			24,
			25,
			26,
			27,
			28,
			29,
			30,
			31,
			127,
			128,
			129,
			130,
			131,
			132,
			133,
			134,
			135,
			136,
			137,
			138,
			139,
			140,
			141,
			142,
			143,
			144,
			145,
			146,
			147,
			148,
			149,
			150,
			151,
			152,
			153,
			154,
			155,
			156,
			157,
			158,
			159,
			64976,
			64977,
			64978,
			64979,
			64980,
			64981,
			64982,
			64983,
			64984,
			64985,
			64986,
			64987,
			64988,
			64989,
			64990,
			64991,
			64992,
			64993,
			64994,
			64995,
			64996,
			64997,
			64998,
			64999,
			65e3,
			65001,
			65002,
			65003,
			65004,
			65005,
			65006,
			65007,
			65534,
			65535,
			131070,
			131071,
			196606,
			196607,
			262142,
			262143,
			327678,
			327679,
			393214,
			393215,
			458750,
			458751,
			524286,
			524287,
			589822,
			589823,
			655358,
			655359,
			720894,
			720895,
			786430,
			786431,
			851966,
			851967,
			917502,
			917503,
			983038,
			983039,
			1048574,
			1048575,
			1114110,
			1114111
		];
		var stringFromCharCode = String.fromCharCode;
		var hasOwnProperty$2 = {}.hasOwnProperty;
		var has = function(object, propertyName) {
			return hasOwnProperty$2.call(object, propertyName);
		};
		var contains = function(array, value) {
			var index = -1;
			var length = array.length;
			while (++index < length) if (array[index] == value) return true;
			return false;
		};
		var merge = function(options$1, defaults$1) {
			if (!options$1) return defaults$1;
			var result = {};
			var key$1;
			for (key$1 in defaults$1) result[key$1] = has(options$1, key$1) ? options$1[key$1] : defaults$1[key$1];
			return result;
		};
		var codePointToSymbol = function(codePoint, strict) {
			var output = "";
			if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
				if (strict) parseError("character reference outside the permissible Unicode range");
				return "�";
			}
			if (has(decodeMapNumeric, codePoint)) {
				if (strict) parseError("disallowed character reference");
				return decodeMapNumeric[codePoint];
			}
			if (strict && contains(invalidReferenceCodePoints, codePoint)) parseError("disallowed character reference");
			if (codePoint > 65535) {
				codePoint -= 65536;
				output += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
				codePoint = 56320 | codePoint & 1023;
			}
			output += stringFromCharCode(codePoint);
			return output;
		};
		var hexEscape = function(codePoint) {
			return "&#x" + codePoint.toString(16).toUpperCase() + ";";
		};
		var decEscape = function(codePoint) {
			return "&#" + codePoint + ";";
		};
		var parseError = function(message) {
			throw Error("Parse error: " + message);
		};
		var encode$1 = function(string, options$1) {
			options$1 = merge(options$1, encode$1.options);
			if (options$1.strict && regexInvalidRawCodePoint.test(string)) parseError("forbidden code point");
			var encodeEverything = options$1.encodeEverything;
			var useNamedReferences = options$1.useNamedReferences;
			var allowUnsafeSymbols = options$1.allowUnsafeSymbols;
			var escapeCodePoint = options$1.decimal ? decEscape : hexEscape;
			var escapeBmpSymbol = function(symbol) {
				return escapeCodePoint(symbol.charCodeAt(0));
			};
			if (encodeEverything) {
				string = string.replace(regexAsciiWhitelist, function(symbol) {
					if (useNamedReferences && has(encodeMap, symbol)) return "&" + encodeMap[symbol] + ";";
					return escapeBmpSymbol(symbol);
				});
				if (useNamedReferences) string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
				if (useNamedReferences) string = string.replace(regexEncodeNonAscii, function(string$1) {
					return "&" + encodeMap[string$1] + ";";
				});
			} else if (useNamedReferences) {
				if (!allowUnsafeSymbols) string = string.replace(regexEscape$1, function(string$1) {
					return "&" + encodeMap[string$1] + ";";
				});
				string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
				string = string.replace(regexEncodeNonAscii, function(string$1) {
					return "&" + encodeMap[string$1] + ";";
				});
			} else if (!allowUnsafeSymbols) string = string.replace(regexEscape$1, escapeBmpSymbol);
			return string.replace(regexAstralSymbols, function($0) {
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
				return escapeCodePoint(codePoint);
			}).replace(regexBmpWhitelist, escapeBmpSymbol);
		};
		encode$1.options = {
			"allowUnsafeSymbols": false,
			"encodeEverything": false,
			"strict": false,
			"useNamedReferences": false,
			"decimal": false
		};
		var decode$2 = function(html, options$1) {
			options$1 = merge(options$1, decode$2.options);
			var strict = options$1.strict;
			if (strict && regexInvalidEntity.test(html)) parseError("malformed character reference");
			return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
				var codePoint;
				var semicolon;
				var decDigits;
				var hexDigits;
				var reference;
				var next;
				if ($1) {
					reference = $1;
					return decodeMap$1[reference];
				}
				if ($2) {
					reference = $2;
					next = $3;
					if (next && options$1.isAttributeValue) {
						if (strict && next == "=") parseError("`&` did not start a character reference");
						return $0;
					} else {
						if (strict) parseError("named character reference was not terminated by a semicolon");
						return decodeMapLegacy[reference] + (next || "");
					}
				}
				if ($4) {
					decDigits = $4;
					semicolon = $5;
					if (strict && !semicolon) parseError("character reference was not terminated by a semicolon");
					codePoint = parseInt(decDigits, 10);
					return codePointToSymbol(codePoint, strict);
				}
				if ($6) {
					hexDigits = $6;
					semicolon = $7;
					if (strict && !semicolon) parseError("character reference was not terminated by a semicolon");
					codePoint = parseInt(hexDigits, 16);
					return codePointToSymbol(codePoint, strict);
				}
				if (strict) parseError("named character reference was not terminated by a semicolon");
				return $0;
			});
		};
		decode$2.options = {
			"isAttributeValue": false,
			"strict": false
		};
		var escape = function(string) {
			return string.replace(regexEscape$1, function($0) {
				return escapeMap[$0];
			});
		};
		var he = {
			"version": "1.2.0",
			"encode": encode$1,
			"decode": decode$2,
			"escape": escape,
			"unescape": decode$2
		};
		if (typeof define == "function" && typeof define.amd == "object" && define.amd) define(function() {
			return he;
		});
		else if (freeExports$1 && !freeExports$1.nodeType) if (freeModule$1) freeModule$1.exports = he;
		else for (var key in he) has(he, key) && (freeExports$1[key] = he[key]);
		else root$3.he = he;
	})(exports);
}));
var require_node$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var he_1$2 = require_he();
	var Node$1 = class {
		constructor(parentNode = null, range) {
			this.parentNode = parentNode;
			this.childNodes = [];
			Object.defineProperty(this, "range", {
				enumerable: false,
				writable: true,
				configurable: true,
				value: range !== null && range !== void 0 ? range : [-1, -1]
			});
		}
		remove() {
			if (this.parentNode) {
				const children = this.parentNode.childNodes;
				this.parentNode.childNodes = children.filter((child) => {
					return this !== child;
				});
				this.parentNode = null;
			}
			return this;
		}
		get innerText() {
			return this.rawText;
		}
		get textContent() {
			return (0, he_1$2.decode)(this.rawText);
		}
		set textContent(val) {
			this.rawText = (0, he_1$2.encode)(val);
		}
	};
	exports.default = Node$1;
}));
var require_type = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var NodeType;
	(function(NodeType$1) {
		NodeType$1[NodeType$1["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
		NodeType$1[NodeType$1["TEXT_NODE"] = 3] = "TEXT_NODE";
		NodeType$1[NodeType$1["COMMENT_NODE"] = 8] = "COMMENT_NODE";
	})(NodeType || (NodeType = {}));
	exports.default = NodeType;
}));
var require_comment = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$13 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var node_1$3 = __importDefault$13(require_node$1());
	var type_1$4 = __importDefault$13(require_type());
	exports.default = class CommentNode extends node_1$3.default {
		clone() {
			return new CommentNode(this.rawText, null, void 0, this.rawTagName);
		}
		constructor(rawText, parentNode = null, range, rawTagName = "!--") {
			super(parentNode, range);
			this.rawText = rawText;
			this.rawTagName = rawTagName;
			this.nodeType = type_1$4.default.COMMENT_NODE;
		}
		get text() {
			return this.rawText;
		}
		toString() {
			return `<!--${this.rawText}-->`;
		}
	};
}));
var require_lib$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ElementType$1;
	(function(ElementType$2) {
		ElementType$2["Root"] = "root";
		ElementType$2["Text"] = "text";
		ElementType$2["Directive"] = "directive";
		ElementType$2["Comment"] = "comment";
		ElementType$2["Script"] = "script";
		ElementType$2["Style"] = "style";
		ElementType$2["Tag"] = "tag";
		ElementType$2["CDATA"] = "cdata";
		ElementType$2["Doctype"] = "doctype";
	})(ElementType$1 = exports.ElementType || (exports.ElementType = {}));
	function isTag$2(elem) {
		return elem.type === ElementType$1.Tag || elem.type === ElementType$1.Script || elem.type === ElementType$1.Style;
	}
	exports.isTag = isTag$2;
	exports.Root = ElementType$1.Root;
	exports.Text = ElementType$1.Text;
	exports.Directive = ElementType$1.Directive;
	exports.Comment = ElementType$1.Comment;
	exports.Script = ElementType$1.Script;
	exports.Style = ElementType$1.Style;
	exports.Tag = ElementType$1.Tag;
	exports.CDATA = ElementType$1.CDATA;
	exports.Doctype = ElementType$1.Doctype;
}));
var require_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __extends = exports && exports.__extends || (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d$1, b$1) {
				d$1.__proto__ = b$1;
			} || function(d$1, b$1) {
				for (var p in b$1) if (Object.prototype.hasOwnProperty.call(b$1, p)) d$1[p] = b$1[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	var __assign$1 = exports && exports.__assign || function() {
		__assign$1 = Object.assign || function(t$1) {
			for (var s, i$1 = 1, n = arguments.length; i$1 < n; i$1++) {
				s = arguments[i$1];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t$1[p] = s[p];
			}
			return t$1;
		};
		return __assign$1.apply(this, arguments);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var domelementtype_1$2 = require_lib$6();
	var Node = function() {
		function Node$2() {
			this.parent = null;
			this.prev = null;
			this.next = null;
			this.startIndex = null;
			this.endIndex = null;
		}
		Object.defineProperty(Node$2.prototype, "parentNode", {
			get: function() {
				return this.parent;
			},
			set: function(parent) {
				this.parent = parent;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(Node$2.prototype, "previousSibling", {
			get: function() {
				return this.prev;
			},
			set: function(prev) {
				this.prev = prev;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(Node$2.prototype, "nextSibling", {
			get: function() {
				return this.next;
			},
			set: function(next) {
				this.next = next;
			},
			enumerable: false,
			configurable: true
		});
		Node$2.prototype.cloneNode = function(recursive) {
			if (recursive === void 0) recursive = false;
			return cloneNode(this, recursive);
		};
		return Node$2;
	}();
	exports.Node = Node;
	var DataNode = function(_super) {
		__extends(DataNode$1, _super);
		function DataNode$1(data) {
			var _this = _super.call(this) || this;
			_this.data = data;
			return _this;
		}
		Object.defineProperty(DataNode$1.prototype, "nodeValue", {
			get: function() {
				return this.data;
			},
			set: function(data) {
				this.data = data;
			},
			enumerable: false,
			configurable: true
		});
		return DataNode$1;
	}(Node);
	exports.DataNode = DataNode;
	var Text = function(_super) {
		__extends(Text$1, _super);
		function Text$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.type = domelementtype_1$2.ElementType.Text;
			return _this;
		}
		Object.defineProperty(Text$1.prototype, "nodeType", {
			get: function() {
				return 3;
			},
			enumerable: false,
			configurable: true
		});
		return Text$1;
	}(DataNode);
	exports.Text = Text;
	var Comment = function(_super) {
		__extends(Comment$1, _super);
		function Comment$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.type = domelementtype_1$2.ElementType.Comment;
			return _this;
		}
		Object.defineProperty(Comment$1.prototype, "nodeType", {
			get: function() {
				return 8;
			},
			enumerable: false,
			configurable: true
		});
		return Comment$1;
	}(DataNode);
	exports.Comment = Comment;
	var ProcessingInstruction = function(_super) {
		__extends(ProcessingInstruction$1, _super);
		function ProcessingInstruction$1(name$1, data) {
			var _this = _super.call(this, data) || this;
			_this.name = name$1;
			_this.type = domelementtype_1$2.ElementType.Directive;
			return _this;
		}
		Object.defineProperty(ProcessingInstruction$1.prototype, "nodeType", {
			get: function() {
				return 1;
			},
			enumerable: false,
			configurable: true
		});
		return ProcessingInstruction$1;
	}(DataNode);
	exports.ProcessingInstruction = ProcessingInstruction;
	var NodeWithChildren = function(_super) {
		__extends(NodeWithChildren$1, _super);
		function NodeWithChildren$1(children) {
			var _this = _super.call(this) || this;
			_this.children = children;
			return _this;
		}
		Object.defineProperty(NodeWithChildren$1.prototype, "firstChild", {
			get: function() {
				var _a$1;
				return (_a$1 = this.children[0]) !== null && _a$1 !== void 0 ? _a$1 : null;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(NodeWithChildren$1.prototype, "lastChild", {
			get: function() {
				return this.children.length > 0 ? this.children[this.children.length - 1] : null;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(NodeWithChildren$1.prototype, "childNodes", {
			get: function() {
				return this.children;
			},
			set: function(children) {
				this.children = children;
			},
			enumerable: false,
			configurable: true
		});
		return NodeWithChildren$1;
	}(Node);
	exports.NodeWithChildren = NodeWithChildren;
	var CDATA = function(_super) {
		__extends(CDATA$1, _super);
		function CDATA$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.type = domelementtype_1$2.ElementType.CDATA;
			return _this;
		}
		Object.defineProperty(CDATA$1.prototype, "nodeType", {
			get: function() {
				return 4;
			},
			enumerable: false,
			configurable: true
		});
		return CDATA$1;
	}(NodeWithChildren);
	exports.CDATA = CDATA;
	var Document = function(_super) {
		__extends(Document$1, _super);
		function Document$1() {
			var _this = _super !== null && _super.apply(this, arguments) || this;
			_this.type = domelementtype_1$2.ElementType.Root;
			return _this;
		}
		Object.defineProperty(Document$1.prototype, "nodeType", {
			get: function() {
				return 9;
			},
			enumerable: false,
			configurable: true
		});
		return Document$1;
	}(NodeWithChildren);
	exports.Document = Document;
	var Element = function(_super) {
		__extends(Element$1, _super);
		function Element$1(name$1, attribs, children, type$1) {
			if (children === void 0) children = [];
			if (type$1 === void 0) type$1 = name$1 === "script" ? domelementtype_1$2.ElementType.Script : name$1 === "style" ? domelementtype_1$2.ElementType.Style : domelementtype_1$2.ElementType.Tag;
			var _this = _super.call(this, children) || this;
			_this.name = name$1;
			_this.attribs = attribs;
			_this.type = type$1;
			return _this;
		}
		Object.defineProperty(Element$1.prototype, "nodeType", {
			get: function() {
				return 1;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(Element$1.prototype, "tagName", {
			get: function() {
				return this.name;
			},
			set: function(name$1) {
				this.name = name$1;
			},
			enumerable: false,
			configurable: true
		});
		Object.defineProperty(Element$1.prototype, "attributes", {
			get: function() {
				var _this = this;
				return Object.keys(this.attribs).map(function(name$1) {
					var _a$1, _b;
					return {
						name: name$1,
						value: _this.attribs[name$1],
						namespace: (_a$1 = _this["x-attribsNamespace"]) === null || _a$1 === void 0 ? void 0 : _a$1[name$1],
						prefix: (_b = _this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name$1]
					};
				});
			},
			enumerable: false,
			configurable: true
		});
		return Element$1;
	}(NodeWithChildren);
	exports.Element = Element;
	function isTag$1(node) {
		return (0, domelementtype_1$2.isTag)(node);
	}
	exports.isTag = isTag$1;
	function isCDATA(node) {
		return node.type === domelementtype_1$2.ElementType.CDATA;
	}
	exports.isCDATA = isCDATA;
	function isText(node) {
		return node.type === domelementtype_1$2.ElementType.Text;
	}
	exports.isText = isText;
	function isComment(node) {
		return node.type === domelementtype_1$2.ElementType.Comment;
	}
	exports.isComment = isComment;
	function isDirective(node) {
		return node.type === domelementtype_1$2.ElementType.Directive;
	}
	exports.isDirective = isDirective;
	function isDocument(node) {
		return node.type === domelementtype_1$2.ElementType.Root;
	}
	exports.isDocument = isDocument;
	function hasChildren(node) {
		return Object.prototype.hasOwnProperty.call(node, "children");
	}
	exports.hasChildren = hasChildren;
	function cloneNode(node, recursive) {
		if (recursive === void 0) recursive = false;
		var result;
		if (isText(node)) result = new Text(node.data);
		else if (isComment(node)) result = new Comment(node.data);
		else if (isTag$1(node)) {
			var children = recursive ? cloneChildren(node.children) : [];
			var clone_1 = new Element(node.name, __assign$1({}, node.attribs), children);
			children.forEach(function(child) {
				return child.parent = clone_1;
			});
			if (node.namespace != null) clone_1.namespace = node.namespace;
			if (node["x-attribsNamespace"]) clone_1["x-attribsNamespace"] = __assign$1({}, node["x-attribsNamespace"]);
			if (node["x-attribsPrefix"]) clone_1["x-attribsPrefix"] = __assign$1({}, node["x-attribsPrefix"]);
			result = clone_1;
		} else if (isCDATA(node)) {
			var children = recursive ? cloneChildren(node.children) : [];
			var clone_2 = new CDATA(children);
			children.forEach(function(child) {
				return child.parent = clone_2;
			});
			result = clone_2;
		} else if (isDocument(node)) {
			var children = recursive ? cloneChildren(node.children) : [];
			var clone_3 = new Document(children);
			children.forEach(function(child) {
				return child.parent = clone_3;
			});
			if (node["x-mode"]) clone_3["x-mode"] = node["x-mode"];
			result = clone_3;
		} else if (isDirective(node)) {
			var instruction = new ProcessingInstruction(node.name, node.data);
			if (node["x-name"] != null) {
				instruction["x-name"] = node["x-name"];
				instruction["x-publicId"] = node["x-publicId"];
				instruction["x-systemId"] = node["x-systemId"];
			}
			result = instruction;
		} else throw new Error("Not implemented yet: ".concat(node.type));
		result.startIndex = node.startIndex;
		result.endIndex = node.endIndex;
		if (node.sourceCodeLocation != null) result.sourceCodeLocation = node.sourceCodeLocation;
		return result;
	}
	exports.cloneNode = cloneNode;
	function cloneChildren(childs) {
		var children = childs.map(function(child) {
			return cloneNode(child, true);
		});
		for (var i$1 = 1; i$1 < children.length; i$1++) {
			children[i$1].prev = children[i$1 - 1];
			children[i$1 - 1].next = children[i$1];
		}
		return children;
	}
}));
var require_lib$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$5 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar$1 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$5(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DomHandler = void 0;
	var domelementtype_1$1 = require_lib$6();
	var node_js_1 = require_node();
	__exportStar$1(require_node(), exports);
	var defaultOpts = {
		withStartIndices: false,
		withEndIndices: false,
		xmlMode: false
	};
	var DomHandler = function() {
		function DomHandler$1(callback, options$1, elementCB) {
			this.dom = [];
			this.root = new node_js_1.Document(this.dom);
			this.done = false;
			this.tagStack = [this.root];
			this.lastNode = null;
			this.parser = null;
			if (typeof options$1 === "function") {
				elementCB = options$1;
				options$1 = defaultOpts;
			}
			if (typeof callback === "object") {
				options$1 = callback;
				callback = void 0;
			}
			this.callback = callback !== null && callback !== void 0 ? callback : null;
			this.options = options$1 !== null && options$1 !== void 0 ? options$1 : defaultOpts;
			this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
		}
		DomHandler$1.prototype.onparserinit = function(parser) {
			this.parser = parser;
		};
		DomHandler$1.prototype.onreset = function() {
			this.dom = [];
			this.root = new node_js_1.Document(this.dom);
			this.done = false;
			this.tagStack = [this.root];
			this.lastNode = null;
			this.parser = null;
		};
		DomHandler$1.prototype.onend = function() {
			if (this.done) return;
			this.done = true;
			this.parser = null;
			this.handleCallback(null);
		};
		DomHandler$1.prototype.onerror = function(error) {
			this.handleCallback(error);
		};
		DomHandler$1.prototype.onclosetag = function() {
			this.lastNode = null;
			var elem = this.tagStack.pop();
			if (this.options.withEndIndices) elem.endIndex = this.parser.endIndex;
			if (this.elementCB) this.elementCB(elem);
		};
		DomHandler$1.prototype.onopentag = function(name$1, attribs) {
			var type$1 = this.options.xmlMode ? domelementtype_1$1.ElementType.Tag : void 0;
			var element = new node_js_1.Element(name$1, attribs, void 0, type$1);
			this.addNode(element);
			this.tagStack.push(element);
		};
		DomHandler$1.prototype.ontext = function(data) {
			var lastNode = this.lastNode;
			if (lastNode && lastNode.type === domelementtype_1$1.ElementType.Text) {
				lastNode.data += data;
				if (this.options.withEndIndices) lastNode.endIndex = this.parser.endIndex;
			} else {
				var node = new node_js_1.Text(data);
				this.addNode(node);
				this.lastNode = node;
			}
		};
		DomHandler$1.prototype.oncomment = function(data) {
			if (this.lastNode && this.lastNode.type === domelementtype_1$1.ElementType.Comment) {
				this.lastNode.data += data;
				return;
			}
			var node = new node_js_1.Comment(data);
			this.addNode(node);
			this.lastNode = node;
		};
		DomHandler$1.prototype.oncommentend = function() {
			this.lastNode = null;
		};
		DomHandler$1.prototype.oncdatastart = function() {
			var text = new node_js_1.Text("");
			var node = new node_js_1.CDATA([text]);
			this.addNode(node);
			text.parent = node;
			this.lastNode = text;
		};
		DomHandler$1.prototype.oncdataend = function() {
			this.lastNode = null;
		};
		DomHandler$1.prototype.onprocessinginstruction = function(name$1, data) {
			var node = new node_js_1.ProcessingInstruction(name$1, data);
			this.addNode(node);
		};
		DomHandler$1.prototype.handleCallback = function(error) {
			if (typeof this.callback === "function") this.callback(error, this.dom);
			else if (error) throw error;
		};
		DomHandler$1.prototype.addNode = function(node) {
			var parent = this.tagStack[this.tagStack.length - 1];
			var previousSibling = parent.children[parent.children.length - 1];
			if (this.options.withStartIndices) node.startIndex = this.parser.startIndex;
			if (this.options.withEndIndices) node.endIndex = this.parser.endIndex;
			parent.children.push(node);
			if (previousSibling) {
				node.prev = previousSibling;
				previousSibling.next = node;
			}
			node.parent = parent;
			this.lastNode = null;
		};
		return DomHandler$1;
	}();
	exports.DomHandler = DomHandler;
	exports.default = DomHandler;
}));
var require_decode_data_html = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new Uint16Array("ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻\"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xA0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌".split("").map(function(c) {
		return c.charCodeAt(0);
	}));
}));
var require_decode_data_xml = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(function(c) {
		return c.charCodeAt(0);
	}));
}));
var require_decode_codepoint = /* @__PURE__ */ __commonJSMin(((exports) => {
	var _a;
	Object.defineProperty(exports, "__esModule", { value: true });
	var decodeMap = new Map([
		[0, 65533],
		[128, 8364],
		[130, 8218],
		[131, 402],
		[132, 8222],
		[133, 8230],
		[134, 8224],
		[135, 8225],
		[136, 710],
		[137, 8240],
		[138, 352],
		[139, 8249],
		[140, 338],
		[142, 381],
		[145, 8216],
		[146, 8217],
		[147, 8220],
		[148, 8221],
		[149, 8226],
		[150, 8211],
		[151, 8212],
		[152, 732],
		[153, 8482],
		[154, 353],
		[155, 8250],
		[156, 339],
		[158, 382],
		[159, 376]
	]);
	exports.fromCodePoint = (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
		var output = "";
		if (codePoint > 65535) {
			codePoint -= 65536;
			output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
			codePoint = 56320 | codePoint & 1023;
		}
		output += String.fromCharCode(codePoint);
		return output;
	};
	function replaceCodePoint(codePoint) {
		var _a$1;
		if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) return 65533;
		return (_a$1 = decodeMap.get(codePoint)) !== null && _a$1 !== void 0 ? _a$1 : codePoint;
	}
	exports.replaceCodePoint = replaceCodePoint;
	function decodeCodePoint(codePoint) {
		return (0, exports.fromCodePoint)(replaceCodePoint(codePoint));
	}
	exports.default = decodeCodePoint;
}));
var require_decode = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$4 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$3 = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar$3 = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$4(result, mod, k);
		}
		__setModuleDefault$3(result, mod);
		return result;
	};
	var __importDefault$12 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeXML = exports.decodeHTMLStrict = exports.decodeHTMLAttribute = exports.decodeHTML = exports.determineBranch = exports.EntityDecoder = exports.DecodingMode = exports.BinTrieFlags = exports.fromCodePoint = exports.replaceCodePoint = exports.decodeCodePoint = exports.xmlDecodeTree = exports.htmlDecodeTree = void 0;
	var decode_data_html_js_1 = __importDefault$12(require_decode_data_html());
	exports.htmlDecodeTree = decode_data_html_js_1.default;
	var decode_data_xml_js_1 = __importDefault$12(require_decode_data_xml());
	exports.xmlDecodeTree = decode_data_xml_js_1.default;
	var decode_codepoint_js_1 = __importStar$3(require_decode_codepoint());
	exports.decodeCodePoint = decode_codepoint_js_1.default;
	var decode_codepoint_js_2 = require_decode_codepoint();
	Object.defineProperty(exports, "replaceCodePoint", {
		enumerable: true,
		get: function() {
			return decode_codepoint_js_2.replaceCodePoint;
		}
	});
	Object.defineProperty(exports, "fromCodePoint", {
		enumerable: true,
		get: function() {
			return decode_codepoint_js_2.fromCodePoint;
		}
	});
	var CharCodes;
	(function(CharCodes$1) {
		CharCodes$1[CharCodes$1["NUM"] = 35] = "NUM";
		CharCodes$1[CharCodes$1["SEMI"] = 59] = "SEMI";
		CharCodes$1[CharCodes$1["EQUALS"] = 61] = "EQUALS";
		CharCodes$1[CharCodes$1["ZERO"] = 48] = "ZERO";
		CharCodes$1[CharCodes$1["NINE"] = 57] = "NINE";
		CharCodes$1[CharCodes$1["LOWER_A"] = 97] = "LOWER_A";
		CharCodes$1[CharCodes$1["LOWER_F"] = 102] = "LOWER_F";
		CharCodes$1[CharCodes$1["LOWER_X"] = 120] = "LOWER_X";
		CharCodes$1[CharCodes$1["LOWER_Z"] = 122] = "LOWER_Z";
		CharCodes$1[CharCodes$1["UPPER_A"] = 65] = "UPPER_A";
		CharCodes$1[CharCodes$1["UPPER_F"] = 70] = "UPPER_F";
		CharCodes$1[CharCodes$1["UPPER_Z"] = 90] = "UPPER_Z";
	})(CharCodes || (CharCodes = {}));
	var BinTrieFlags;
	(function(BinTrieFlags$1) {
		BinTrieFlags$1[BinTrieFlags$1["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
		BinTrieFlags$1[BinTrieFlags$1["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
		BinTrieFlags$1[BinTrieFlags$1["JUMP_TABLE"] = 127] = "JUMP_TABLE";
	})(BinTrieFlags = exports.BinTrieFlags || (exports.BinTrieFlags = {}));
	function isNumber(code) {
		return code >= CharCodes.ZERO && code <= CharCodes.NINE;
	}
	function isHexadecimalCharacter(code) {
		return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
	}
	function isAsciiAlphaNumeric(code) {
		return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
	}
	function isEntityInAttributeInvalidEnd(code) {
		return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
	}
	var EntityDecoderState;
	(function(EntityDecoderState$1) {
		EntityDecoderState$1[EntityDecoderState$1["EntityStart"] = 0] = "EntityStart";
		EntityDecoderState$1[EntityDecoderState$1["NumericStart"] = 1] = "NumericStart";
		EntityDecoderState$1[EntityDecoderState$1["NumericDecimal"] = 2] = "NumericDecimal";
		EntityDecoderState$1[EntityDecoderState$1["NumericHex"] = 3] = "NumericHex";
		EntityDecoderState$1[EntityDecoderState$1["NamedEntity"] = 4] = "NamedEntity";
	})(EntityDecoderState || (EntityDecoderState = {}));
	var DecodingMode;
	(function(DecodingMode$1) {
		DecodingMode$1[DecodingMode$1["Legacy"] = 0] = "Legacy";
		DecodingMode$1[DecodingMode$1["Strict"] = 1] = "Strict";
		DecodingMode$1[DecodingMode$1["Attribute"] = 2] = "Attribute";
	})(DecodingMode = exports.DecodingMode || (exports.DecodingMode = {}));
	var EntityDecoder = function() {
		function EntityDecoder$1(decodeTree, emitCodePoint, errors) {
			this.decodeTree = decodeTree;
			this.emitCodePoint = emitCodePoint;
			this.errors = errors;
			this.state = EntityDecoderState.EntityStart;
			this.consumed = 1;
			this.result = 0;
			this.treeIndex = 0;
			this.excess = 1;
			this.decodeMode = DecodingMode.Strict;
		}
		EntityDecoder$1.prototype.startEntity = function(decodeMode) {
			this.decodeMode = decodeMode;
			this.state = EntityDecoderState.EntityStart;
			this.result = 0;
			this.treeIndex = 0;
			this.excess = 1;
			this.consumed = 1;
		};
		EntityDecoder$1.prototype.write = function(str, offset) {
			switch (this.state) {
				case EntityDecoderState.EntityStart:
					if (str.charCodeAt(offset) === CharCodes.NUM) {
						this.state = EntityDecoderState.NumericStart;
						this.consumed += 1;
						return this.stateNumericStart(str, offset + 1);
					}
					this.state = EntityDecoderState.NamedEntity;
					return this.stateNamedEntity(str, offset);
				case EntityDecoderState.NumericStart: return this.stateNumericStart(str, offset);
				case EntityDecoderState.NumericDecimal: return this.stateNumericDecimal(str, offset);
				case EntityDecoderState.NumericHex: return this.stateNumericHex(str, offset);
				case EntityDecoderState.NamedEntity: return this.stateNamedEntity(str, offset);
			}
		};
		EntityDecoder$1.prototype.stateNumericStart = function(str, offset) {
			if (offset >= str.length) return -1;
			if ((str.charCodeAt(offset) | 32) === CharCodes.LOWER_X) {
				this.state = EntityDecoderState.NumericHex;
				this.consumed += 1;
				return this.stateNumericHex(str, offset + 1);
			}
			this.state = EntityDecoderState.NumericDecimal;
			return this.stateNumericDecimal(str, offset);
		};
		EntityDecoder$1.prototype.addToNumericResult = function(str, start, end, base) {
			if (start !== end) {
				var digitCount = end - start;
				this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
				this.consumed += digitCount;
			}
		};
		EntityDecoder$1.prototype.stateNumericHex = function(str, offset) {
			var startIdx = offset;
			while (offset < str.length) {
				var char = str.charCodeAt(offset);
				if (isNumber(char) || isHexadecimalCharacter(char)) offset += 1;
				else {
					this.addToNumericResult(str, startIdx, offset, 16);
					return this.emitNumericEntity(char, 3);
				}
			}
			this.addToNumericResult(str, startIdx, offset, 16);
			return -1;
		};
		EntityDecoder$1.prototype.stateNumericDecimal = function(str, offset) {
			var startIdx = offset;
			while (offset < str.length) {
				var char = str.charCodeAt(offset);
				if (isNumber(char)) offset += 1;
				else {
					this.addToNumericResult(str, startIdx, offset, 10);
					return this.emitNumericEntity(char, 2);
				}
			}
			this.addToNumericResult(str, startIdx, offset, 10);
			return -1;
		};
		EntityDecoder$1.prototype.emitNumericEntity = function(lastCp, expectedLength) {
			var _a$1;
			if (this.consumed <= expectedLength) {
				(_a$1 = this.errors) === null || _a$1 === void 0 || _a$1.absenceOfDigitsInNumericCharacterReference(this.consumed);
				return 0;
			}
			if (lastCp === CharCodes.SEMI) this.consumed += 1;
			else if (this.decodeMode === DecodingMode.Strict) return 0;
			this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
			if (this.errors) {
				if (lastCp !== CharCodes.SEMI) this.errors.missingSemicolonAfterCharacterReference();
				this.errors.validateNumericCharacterReference(this.result);
			}
			return this.consumed;
		};
		EntityDecoder$1.prototype.stateNamedEntity = function(str, offset) {
			var decodeTree = this.decodeTree;
			var current = decodeTree[this.treeIndex];
			var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
			for (; offset < str.length; offset++, this.excess++) {
				var char = str.charCodeAt(offset);
				this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
				if (this.treeIndex < 0) return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
				current = decodeTree[this.treeIndex];
				valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
				if (valueLength !== 0) {
					if (char === CharCodes.SEMI) return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
					if (this.decodeMode !== DecodingMode.Strict) {
						this.result = this.treeIndex;
						this.consumed += this.excess;
						this.excess = 0;
					}
				}
			}
			return -1;
		};
		EntityDecoder$1.prototype.emitNotTerminatedNamedEntity = function() {
			var _a$1;
			var _b = this, result = _b.result;
			var valueLength = (_b.decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
			this.emitNamedEntityData(result, valueLength, this.consumed);
			(_a$1 = this.errors) === null || _a$1 === void 0 || _a$1.missingSemicolonAfterCharacterReference();
			return this.consumed;
		};
		EntityDecoder$1.prototype.emitNamedEntityData = function(result, valueLength, consumed) {
			var decodeTree = this.decodeTree;
			this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
			if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
			return consumed;
		};
		EntityDecoder$1.prototype.end = function() {
			var _a$1;
			switch (this.state) {
				case EntityDecoderState.NamedEntity: return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
				case EntityDecoderState.NumericDecimal: return this.emitNumericEntity(0, 2);
				case EntityDecoderState.NumericHex: return this.emitNumericEntity(0, 3);
				case EntityDecoderState.NumericStart:
					(_a$1 = this.errors) === null || _a$1 === void 0 || _a$1.absenceOfDigitsInNumericCharacterReference(this.consumed);
					return 0;
				case EntityDecoderState.EntityStart: return 0;
			}
		};
		return EntityDecoder$1;
	}();
	exports.EntityDecoder = EntityDecoder;
	function getDecoder(decodeTree) {
		var ret = "";
		var decoder = new EntityDecoder(decodeTree, function(str) {
			return ret += (0, decode_codepoint_js_1.fromCodePoint)(str);
		});
		return function decodeWithTrie(str, decodeMode) {
			var lastIndex = 0;
			var offset = 0;
			while ((offset = str.indexOf("&", offset)) >= 0) {
				ret += str.slice(lastIndex, offset);
				decoder.startEntity(decodeMode);
				var len = decoder.write(str, offset + 1);
				if (len < 0) {
					lastIndex = offset + decoder.end();
					break;
				}
				lastIndex = offset + len;
				offset = len === 0 ? lastIndex + 1 : lastIndex;
			}
			var result = ret + str.slice(lastIndex);
			ret = "";
			return result;
		};
	}
	function determineBranch(decodeTree, current, nodeIdx, char) {
		var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
		var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
		if (branchCount === 0) return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
		if (jumpOffset) {
			var value = char - jumpOffset;
			return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
		}
		var lo = nodeIdx;
		var hi = lo + branchCount - 1;
		while (lo <= hi) {
			var mid = lo + hi >>> 1;
			var midVal = decodeTree[mid];
			if (midVal < char) lo = mid + 1;
			else if (midVal > char) hi = mid - 1;
			else return decodeTree[mid + branchCount];
		}
		return -1;
	}
	exports.determineBranch = determineBranch;
	var htmlDecoder = getDecoder(decode_data_html_js_1.default);
	var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
	function decodeHTML(str, mode) {
		if (mode === void 0) mode = DecodingMode.Legacy;
		return htmlDecoder(str, mode);
	}
	exports.decodeHTML = decodeHTML;
	function decodeHTMLAttribute(str) {
		return htmlDecoder(str, DecodingMode.Attribute);
	}
	exports.decodeHTMLAttribute = decodeHTMLAttribute;
	function decodeHTMLStrict(str) {
		return htmlDecoder(str, DecodingMode.Strict);
	}
	exports.decodeHTMLStrict = decodeHTMLStrict;
	function decodeXML(str) {
		return xmlDecoder(str, DecodingMode.Strict);
	}
	exports.decodeXML = decodeXML;
}));
var require_encode_html = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function restoreDiff(arr) {
		for (var i$1 = 1; i$1 < arr.length; i$1++) arr[i$1][0] += arr[i$1 - 1][0] + 1;
		return arr;
	}
	exports.default = new Map(/* @__PURE__ */ restoreDiff([
		[9, "&Tab;"],
		[0, "&NewLine;"],
		[22, "&excl;"],
		[0, "&quot;"],
		[0, "&num;"],
		[0, "&dollar;"],
		[0, "&percnt;"],
		[0, "&amp;"],
		[0, "&apos;"],
		[0, "&lpar;"],
		[0, "&rpar;"],
		[0, "&ast;"],
		[0, "&plus;"],
		[0, "&comma;"],
		[1, "&period;"],
		[0, "&sol;"],
		[10, "&colon;"],
		[0, "&semi;"],
		[0, {
			v: "&lt;",
			n: 8402,
			o: "&nvlt;"
		}],
		[0, {
			v: "&equals;",
			n: 8421,
			o: "&bne;"
		}],
		[0, {
			v: "&gt;",
			n: 8402,
			o: "&nvgt;"
		}],
		[0, "&quest;"],
		[0, "&commat;"],
		[26, "&lbrack;"],
		[0, "&bsol;"],
		[0, "&rbrack;"],
		[0, "&Hat;"],
		[0, "&lowbar;"],
		[0, "&DiacriticalGrave;"],
		[5, {
			n: 106,
			o: "&fjlig;"
		}],
		[20, "&lbrace;"],
		[0, "&verbar;"],
		[0, "&rbrace;"],
		[34, "&nbsp;"],
		[0, "&iexcl;"],
		[0, "&cent;"],
		[0, "&pound;"],
		[0, "&curren;"],
		[0, "&yen;"],
		[0, "&brvbar;"],
		[0, "&sect;"],
		[0, "&die;"],
		[0, "&copy;"],
		[0, "&ordf;"],
		[0, "&laquo;"],
		[0, "&not;"],
		[0, "&shy;"],
		[0, "&circledR;"],
		[0, "&macr;"],
		[0, "&deg;"],
		[0, "&PlusMinus;"],
		[0, "&sup2;"],
		[0, "&sup3;"],
		[0, "&acute;"],
		[0, "&micro;"],
		[0, "&para;"],
		[0, "&centerdot;"],
		[0, "&cedil;"],
		[0, "&sup1;"],
		[0, "&ordm;"],
		[0, "&raquo;"],
		[0, "&frac14;"],
		[0, "&frac12;"],
		[0, "&frac34;"],
		[0, "&iquest;"],
		[0, "&Agrave;"],
		[0, "&Aacute;"],
		[0, "&Acirc;"],
		[0, "&Atilde;"],
		[0, "&Auml;"],
		[0, "&angst;"],
		[0, "&AElig;"],
		[0, "&Ccedil;"],
		[0, "&Egrave;"],
		[0, "&Eacute;"],
		[0, "&Ecirc;"],
		[0, "&Euml;"],
		[0, "&Igrave;"],
		[0, "&Iacute;"],
		[0, "&Icirc;"],
		[0, "&Iuml;"],
		[0, "&ETH;"],
		[0, "&Ntilde;"],
		[0, "&Ograve;"],
		[0, "&Oacute;"],
		[0, "&Ocirc;"],
		[0, "&Otilde;"],
		[0, "&Ouml;"],
		[0, "&times;"],
		[0, "&Oslash;"],
		[0, "&Ugrave;"],
		[0, "&Uacute;"],
		[0, "&Ucirc;"],
		[0, "&Uuml;"],
		[0, "&Yacute;"],
		[0, "&THORN;"],
		[0, "&szlig;"],
		[0, "&agrave;"],
		[0, "&aacute;"],
		[0, "&acirc;"],
		[0, "&atilde;"],
		[0, "&auml;"],
		[0, "&aring;"],
		[0, "&aelig;"],
		[0, "&ccedil;"],
		[0, "&egrave;"],
		[0, "&eacute;"],
		[0, "&ecirc;"],
		[0, "&euml;"],
		[0, "&igrave;"],
		[0, "&iacute;"],
		[0, "&icirc;"],
		[0, "&iuml;"],
		[0, "&eth;"],
		[0, "&ntilde;"],
		[0, "&ograve;"],
		[0, "&oacute;"],
		[0, "&ocirc;"],
		[0, "&otilde;"],
		[0, "&ouml;"],
		[0, "&div;"],
		[0, "&oslash;"],
		[0, "&ugrave;"],
		[0, "&uacute;"],
		[0, "&ucirc;"],
		[0, "&uuml;"],
		[0, "&yacute;"],
		[0, "&thorn;"],
		[0, "&yuml;"],
		[0, "&Amacr;"],
		[0, "&amacr;"],
		[0, "&Abreve;"],
		[0, "&abreve;"],
		[0, "&Aogon;"],
		[0, "&aogon;"],
		[0, "&Cacute;"],
		[0, "&cacute;"],
		[0, "&Ccirc;"],
		[0, "&ccirc;"],
		[0, "&Cdot;"],
		[0, "&cdot;"],
		[0, "&Ccaron;"],
		[0, "&ccaron;"],
		[0, "&Dcaron;"],
		[0, "&dcaron;"],
		[0, "&Dstrok;"],
		[0, "&dstrok;"],
		[0, "&Emacr;"],
		[0, "&emacr;"],
		[2, "&Edot;"],
		[0, "&edot;"],
		[0, "&Eogon;"],
		[0, "&eogon;"],
		[0, "&Ecaron;"],
		[0, "&ecaron;"],
		[0, "&Gcirc;"],
		[0, "&gcirc;"],
		[0, "&Gbreve;"],
		[0, "&gbreve;"],
		[0, "&Gdot;"],
		[0, "&gdot;"],
		[0, "&Gcedil;"],
		[1, "&Hcirc;"],
		[0, "&hcirc;"],
		[0, "&Hstrok;"],
		[0, "&hstrok;"],
		[0, "&Itilde;"],
		[0, "&itilde;"],
		[0, "&Imacr;"],
		[0, "&imacr;"],
		[2, "&Iogon;"],
		[0, "&iogon;"],
		[0, "&Idot;"],
		[0, "&imath;"],
		[0, "&IJlig;"],
		[0, "&ijlig;"],
		[0, "&Jcirc;"],
		[0, "&jcirc;"],
		[0, "&Kcedil;"],
		[0, "&kcedil;"],
		[0, "&kgreen;"],
		[0, "&Lacute;"],
		[0, "&lacute;"],
		[0, "&Lcedil;"],
		[0, "&lcedil;"],
		[0, "&Lcaron;"],
		[0, "&lcaron;"],
		[0, "&Lmidot;"],
		[0, "&lmidot;"],
		[0, "&Lstrok;"],
		[0, "&lstrok;"],
		[0, "&Nacute;"],
		[0, "&nacute;"],
		[0, "&Ncedil;"],
		[0, "&ncedil;"],
		[0, "&Ncaron;"],
		[0, "&ncaron;"],
		[0, "&napos;"],
		[0, "&ENG;"],
		[0, "&eng;"],
		[0, "&Omacr;"],
		[0, "&omacr;"],
		[2, "&Odblac;"],
		[0, "&odblac;"],
		[0, "&OElig;"],
		[0, "&oelig;"],
		[0, "&Racute;"],
		[0, "&racute;"],
		[0, "&Rcedil;"],
		[0, "&rcedil;"],
		[0, "&Rcaron;"],
		[0, "&rcaron;"],
		[0, "&Sacute;"],
		[0, "&sacute;"],
		[0, "&Scirc;"],
		[0, "&scirc;"],
		[0, "&Scedil;"],
		[0, "&scedil;"],
		[0, "&Scaron;"],
		[0, "&scaron;"],
		[0, "&Tcedil;"],
		[0, "&tcedil;"],
		[0, "&Tcaron;"],
		[0, "&tcaron;"],
		[0, "&Tstrok;"],
		[0, "&tstrok;"],
		[0, "&Utilde;"],
		[0, "&utilde;"],
		[0, "&Umacr;"],
		[0, "&umacr;"],
		[0, "&Ubreve;"],
		[0, "&ubreve;"],
		[0, "&Uring;"],
		[0, "&uring;"],
		[0, "&Udblac;"],
		[0, "&udblac;"],
		[0, "&Uogon;"],
		[0, "&uogon;"],
		[0, "&Wcirc;"],
		[0, "&wcirc;"],
		[0, "&Ycirc;"],
		[0, "&ycirc;"],
		[0, "&Yuml;"],
		[0, "&Zacute;"],
		[0, "&zacute;"],
		[0, "&Zdot;"],
		[0, "&zdot;"],
		[0, "&Zcaron;"],
		[0, "&zcaron;"],
		[19, "&fnof;"],
		[34, "&imped;"],
		[63, "&gacute;"],
		[65, "&jmath;"],
		[142, "&circ;"],
		[0, "&caron;"],
		[16, "&breve;"],
		[0, "&DiacriticalDot;"],
		[0, "&ring;"],
		[0, "&ogon;"],
		[0, "&DiacriticalTilde;"],
		[0, "&dblac;"],
		[51, "&DownBreve;"],
		[127, "&Alpha;"],
		[0, "&Beta;"],
		[0, "&Gamma;"],
		[0, "&Delta;"],
		[0, "&Epsilon;"],
		[0, "&Zeta;"],
		[0, "&Eta;"],
		[0, "&Theta;"],
		[0, "&Iota;"],
		[0, "&Kappa;"],
		[0, "&Lambda;"],
		[0, "&Mu;"],
		[0, "&Nu;"],
		[0, "&Xi;"],
		[0, "&Omicron;"],
		[0, "&Pi;"],
		[0, "&Rho;"],
		[1, "&Sigma;"],
		[0, "&Tau;"],
		[0, "&Upsilon;"],
		[0, "&Phi;"],
		[0, "&Chi;"],
		[0, "&Psi;"],
		[0, "&ohm;"],
		[7, "&alpha;"],
		[0, "&beta;"],
		[0, "&gamma;"],
		[0, "&delta;"],
		[0, "&epsi;"],
		[0, "&zeta;"],
		[0, "&eta;"],
		[0, "&theta;"],
		[0, "&iota;"],
		[0, "&kappa;"],
		[0, "&lambda;"],
		[0, "&mu;"],
		[0, "&nu;"],
		[0, "&xi;"],
		[0, "&omicron;"],
		[0, "&pi;"],
		[0, "&rho;"],
		[0, "&sigmaf;"],
		[0, "&sigma;"],
		[0, "&tau;"],
		[0, "&upsi;"],
		[0, "&phi;"],
		[0, "&chi;"],
		[0, "&psi;"],
		[0, "&omega;"],
		[7, "&thetasym;"],
		[0, "&Upsi;"],
		[2, "&phiv;"],
		[0, "&piv;"],
		[5, "&Gammad;"],
		[0, "&digamma;"],
		[18, "&kappav;"],
		[0, "&rhov;"],
		[3, "&epsiv;"],
		[0, "&backepsilon;"],
		[10, "&IOcy;"],
		[0, "&DJcy;"],
		[0, "&GJcy;"],
		[0, "&Jukcy;"],
		[0, "&DScy;"],
		[0, "&Iukcy;"],
		[0, "&YIcy;"],
		[0, "&Jsercy;"],
		[0, "&LJcy;"],
		[0, "&NJcy;"],
		[0, "&TSHcy;"],
		[0, "&KJcy;"],
		[1, "&Ubrcy;"],
		[0, "&DZcy;"],
		[0, "&Acy;"],
		[0, "&Bcy;"],
		[0, "&Vcy;"],
		[0, "&Gcy;"],
		[0, "&Dcy;"],
		[0, "&IEcy;"],
		[0, "&ZHcy;"],
		[0, "&Zcy;"],
		[0, "&Icy;"],
		[0, "&Jcy;"],
		[0, "&Kcy;"],
		[0, "&Lcy;"],
		[0, "&Mcy;"],
		[0, "&Ncy;"],
		[0, "&Ocy;"],
		[0, "&Pcy;"],
		[0, "&Rcy;"],
		[0, "&Scy;"],
		[0, "&Tcy;"],
		[0, "&Ucy;"],
		[0, "&Fcy;"],
		[0, "&KHcy;"],
		[0, "&TScy;"],
		[0, "&CHcy;"],
		[0, "&SHcy;"],
		[0, "&SHCHcy;"],
		[0, "&HARDcy;"],
		[0, "&Ycy;"],
		[0, "&SOFTcy;"],
		[0, "&Ecy;"],
		[0, "&YUcy;"],
		[0, "&YAcy;"],
		[0, "&acy;"],
		[0, "&bcy;"],
		[0, "&vcy;"],
		[0, "&gcy;"],
		[0, "&dcy;"],
		[0, "&iecy;"],
		[0, "&zhcy;"],
		[0, "&zcy;"],
		[0, "&icy;"],
		[0, "&jcy;"],
		[0, "&kcy;"],
		[0, "&lcy;"],
		[0, "&mcy;"],
		[0, "&ncy;"],
		[0, "&ocy;"],
		[0, "&pcy;"],
		[0, "&rcy;"],
		[0, "&scy;"],
		[0, "&tcy;"],
		[0, "&ucy;"],
		[0, "&fcy;"],
		[0, "&khcy;"],
		[0, "&tscy;"],
		[0, "&chcy;"],
		[0, "&shcy;"],
		[0, "&shchcy;"],
		[0, "&hardcy;"],
		[0, "&ycy;"],
		[0, "&softcy;"],
		[0, "&ecy;"],
		[0, "&yucy;"],
		[0, "&yacy;"],
		[1, "&iocy;"],
		[0, "&djcy;"],
		[0, "&gjcy;"],
		[0, "&jukcy;"],
		[0, "&dscy;"],
		[0, "&iukcy;"],
		[0, "&yicy;"],
		[0, "&jsercy;"],
		[0, "&ljcy;"],
		[0, "&njcy;"],
		[0, "&tshcy;"],
		[0, "&kjcy;"],
		[1, "&ubrcy;"],
		[0, "&dzcy;"],
		[7074, "&ensp;"],
		[0, "&emsp;"],
		[0, "&emsp13;"],
		[0, "&emsp14;"],
		[1, "&numsp;"],
		[0, "&puncsp;"],
		[0, "&ThinSpace;"],
		[0, "&hairsp;"],
		[0, "&NegativeMediumSpace;"],
		[0, "&zwnj;"],
		[0, "&zwj;"],
		[0, "&lrm;"],
		[0, "&rlm;"],
		[0, "&dash;"],
		[2, "&ndash;"],
		[0, "&mdash;"],
		[0, "&horbar;"],
		[0, "&Verbar;"],
		[1, "&lsquo;"],
		[0, "&CloseCurlyQuote;"],
		[0, "&lsquor;"],
		[1, "&ldquo;"],
		[0, "&CloseCurlyDoubleQuote;"],
		[0, "&bdquo;"],
		[1, "&dagger;"],
		[0, "&Dagger;"],
		[0, "&bull;"],
		[2, "&nldr;"],
		[0, "&hellip;"],
		[9, "&permil;"],
		[0, "&pertenk;"],
		[0, "&prime;"],
		[0, "&Prime;"],
		[0, "&tprime;"],
		[0, "&backprime;"],
		[3, "&lsaquo;"],
		[0, "&rsaquo;"],
		[3, "&oline;"],
		[2, "&caret;"],
		[1, "&hybull;"],
		[0, "&frasl;"],
		[10, "&bsemi;"],
		[7, "&qprime;"],
		[7, {
			v: "&MediumSpace;",
			n: 8202,
			o: "&ThickSpace;"
		}],
		[0, "&NoBreak;"],
		[0, "&af;"],
		[0, "&InvisibleTimes;"],
		[0, "&ic;"],
		[72, "&euro;"],
		[46, "&tdot;"],
		[0, "&DotDot;"],
		[37, "&complexes;"],
		[2, "&incare;"],
		[4, "&gscr;"],
		[0, "&hamilt;"],
		[0, "&Hfr;"],
		[0, "&Hopf;"],
		[0, "&planckh;"],
		[0, "&hbar;"],
		[0, "&imagline;"],
		[0, "&Ifr;"],
		[0, "&lagran;"],
		[0, "&ell;"],
		[1, "&naturals;"],
		[0, "&numero;"],
		[0, "&copysr;"],
		[0, "&weierp;"],
		[0, "&Popf;"],
		[0, "&Qopf;"],
		[0, "&realine;"],
		[0, "&real;"],
		[0, "&reals;"],
		[0, "&rx;"],
		[3, "&trade;"],
		[1, "&integers;"],
		[2, "&mho;"],
		[0, "&zeetrf;"],
		[0, "&iiota;"],
		[2, "&bernou;"],
		[0, "&Cayleys;"],
		[1, "&escr;"],
		[0, "&Escr;"],
		[0, "&Fouriertrf;"],
		[1, "&Mellintrf;"],
		[0, "&order;"],
		[0, "&alefsym;"],
		[0, "&beth;"],
		[0, "&gimel;"],
		[0, "&daleth;"],
		[12, "&CapitalDifferentialD;"],
		[0, "&dd;"],
		[0, "&ee;"],
		[0, "&ii;"],
		[10, "&frac13;"],
		[0, "&frac23;"],
		[0, "&frac15;"],
		[0, "&frac25;"],
		[0, "&frac35;"],
		[0, "&frac45;"],
		[0, "&frac16;"],
		[0, "&frac56;"],
		[0, "&frac18;"],
		[0, "&frac38;"],
		[0, "&frac58;"],
		[0, "&frac78;"],
		[49, "&larr;"],
		[0, "&ShortUpArrow;"],
		[0, "&rarr;"],
		[0, "&darr;"],
		[0, "&harr;"],
		[0, "&updownarrow;"],
		[0, "&nwarr;"],
		[0, "&nearr;"],
		[0, "&LowerRightArrow;"],
		[0, "&LowerLeftArrow;"],
		[0, "&nlarr;"],
		[0, "&nrarr;"],
		[1, {
			v: "&rarrw;",
			n: 824,
			o: "&nrarrw;"
		}],
		[0, "&Larr;"],
		[0, "&Uarr;"],
		[0, "&Rarr;"],
		[0, "&Darr;"],
		[0, "&larrtl;"],
		[0, "&rarrtl;"],
		[0, "&LeftTeeArrow;"],
		[0, "&mapstoup;"],
		[0, "&map;"],
		[0, "&DownTeeArrow;"],
		[1, "&hookleftarrow;"],
		[0, "&hookrightarrow;"],
		[0, "&larrlp;"],
		[0, "&looparrowright;"],
		[0, "&harrw;"],
		[0, "&nharr;"],
		[1, "&lsh;"],
		[0, "&rsh;"],
		[0, "&ldsh;"],
		[0, "&rdsh;"],
		[1, "&crarr;"],
		[0, "&cularr;"],
		[0, "&curarr;"],
		[2, "&circlearrowleft;"],
		[0, "&circlearrowright;"],
		[0, "&leftharpoonup;"],
		[0, "&DownLeftVector;"],
		[0, "&RightUpVector;"],
		[0, "&LeftUpVector;"],
		[0, "&rharu;"],
		[0, "&DownRightVector;"],
		[0, "&dharr;"],
		[0, "&dharl;"],
		[0, "&RightArrowLeftArrow;"],
		[0, "&udarr;"],
		[0, "&LeftArrowRightArrow;"],
		[0, "&leftleftarrows;"],
		[0, "&upuparrows;"],
		[0, "&rightrightarrows;"],
		[0, "&ddarr;"],
		[0, "&leftrightharpoons;"],
		[0, "&Equilibrium;"],
		[0, "&nlArr;"],
		[0, "&nhArr;"],
		[0, "&nrArr;"],
		[0, "&DoubleLeftArrow;"],
		[0, "&DoubleUpArrow;"],
		[0, "&DoubleRightArrow;"],
		[0, "&dArr;"],
		[0, "&DoubleLeftRightArrow;"],
		[0, "&DoubleUpDownArrow;"],
		[0, "&nwArr;"],
		[0, "&neArr;"],
		[0, "&seArr;"],
		[0, "&swArr;"],
		[0, "&lAarr;"],
		[0, "&rAarr;"],
		[1, "&zigrarr;"],
		[6, "&larrb;"],
		[0, "&rarrb;"],
		[15, "&DownArrowUpArrow;"],
		[7, "&loarr;"],
		[0, "&roarr;"],
		[0, "&hoarr;"],
		[0, "&forall;"],
		[0, "&comp;"],
		[0, {
			v: "&part;",
			n: 824,
			o: "&npart;"
		}],
		[0, "&exist;"],
		[0, "&nexist;"],
		[0, "&empty;"],
		[1, "&Del;"],
		[0, "&Element;"],
		[0, "&NotElement;"],
		[1, "&ni;"],
		[0, "&notni;"],
		[2, "&prod;"],
		[0, "&coprod;"],
		[0, "&sum;"],
		[0, "&minus;"],
		[0, "&MinusPlus;"],
		[0, "&dotplus;"],
		[1, "&Backslash;"],
		[0, "&lowast;"],
		[0, "&compfn;"],
		[1, "&radic;"],
		[2, "&prop;"],
		[0, "&infin;"],
		[0, "&angrt;"],
		[0, {
			v: "&ang;",
			n: 8402,
			o: "&nang;"
		}],
		[0, "&angmsd;"],
		[0, "&angsph;"],
		[0, "&mid;"],
		[0, "&nmid;"],
		[0, "&DoubleVerticalBar;"],
		[0, "&NotDoubleVerticalBar;"],
		[0, "&and;"],
		[0, "&or;"],
		[0, {
			v: "&cap;",
			n: 65024,
			o: "&caps;"
		}],
		[0, {
			v: "&cup;",
			n: 65024,
			o: "&cups;"
		}],
		[0, "&int;"],
		[0, "&Int;"],
		[0, "&iiint;"],
		[0, "&conint;"],
		[0, "&Conint;"],
		[0, "&Cconint;"],
		[0, "&cwint;"],
		[0, "&ClockwiseContourIntegral;"],
		[0, "&awconint;"],
		[0, "&there4;"],
		[0, "&becaus;"],
		[0, "&ratio;"],
		[0, "&Colon;"],
		[0, "&dotminus;"],
		[1, "&mDDot;"],
		[0, "&homtht;"],
		[0, {
			v: "&sim;",
			n: 8402,
			o: "&nvsim;"
		}],
		[0, {
			v: "&backsim;",
			n: 817,
			o: "&race;"
		}],
		[0, {
			v: "&ac;",
			n: 819,
			o: "&acE;"
		}],
		[0, "&acd;"],
		[0, "&VerticalTilde;"],
		[0, "&NotTilde;"],
		[0, {
			v: "&eqsim;",
			n: 824,
			o: "&nesim;"
		}],
		[0, "&sime;"],
		[0, "&NotTildeEqual;"],
		[0, "&cong;"],
		[0, "&simne;"],
		[0, "&ncong;"],
		[0, "&ap;"],
		[0, "&nap;"],
		[0, "&ape;"],
		[0, {
			v: "&apid;",
			n: 824,
			o: "&napid;"
		}],
		[0, "&backcong;"],
		[0, {
			v: "&asympeq;",
			n: 8402,
			o: "&nvap;"
		}],
		[0, {
			v: "&bump;",
			n: 824,
			o: "&nbump;"
		}],
		[0, {
			v: "&bumpe;",
			n: 824,
			o: "&nbumpe;"
		}],
		[0, {
			v: "&doteq;",
			n: 824,
			o: "&nedot;"
		}],
		[0, "&doteqdot;"],
		[0, "&efDot;"],
		[0, "&erDot;"],
		[0, "&Assign;"],
		[0, "&ecolon;"],
		[0, "&ecir;"],
		[0, "&circeq;"],
		[1, "&wedgeq;"],
		[0, "&veeeq;"],
		[1, "&triangleq;"],
		[2, "&equest;"],
		[0, "&ne;"],
		[0, {
			v: "&Congruent;",
			n: 8421,
			o: "&bnequiv;"
		}],
		[0, "&nequiv;"],
		[1, {
			v: "&le;",
			n: 8402,
			o: "&nvle;"
		}],
		[0, {
			v: "&ge;",
			n: 8402,
			o: "&nvge;"
		}],
		[0, {
			v: "&lE;",
			n: 824,
			o: "&nlE;"
		}],
		[0, {
			v: "&gE;",
			n: 824,
			o: "&ngE;"
		}],
		[0, {
			v: "&lnE;",
			n: 65024,
			o: "&lvertneqq;"
		}],
		[0, {
			v: "&gnE;",
			n: 65024,
			o: "&gvertneqq;"
		}],
		[0, {
			v: "&ll;",
			n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]]))
		}],
		[0, {
			v: "&gg;",
			n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]]))
		}],
		[0, "&between;"],
		[0, "&NotCupCap;"],
		[0, "&nless;"],
		[0, "&ngt;"],
		[0, "&nle;"],
		[0, "&nge;"],
		[0, "&lesssim;"],
		[0, "&GreaterTilde;"],
		[0, "&nlsim;"],
		[0, "&ngsim;"],
		[0, "&LessGreater;"],
		[0, "&gl;"],
		[0, "&NotLessGreater;"],
		[0, "&NotGreaterLess;"],
		[0, "&pr;"],
		[0, "&sc;"],
		[0, "&prcue;"],
		[0, "&sccue;"],
		[0, "&PrecedesTilde;"],
		[0, {
			v: "&scsim;",
			n: 824,
			o: "&NotSucceedsTilde;"
		}],
		[0, "&NotPrecedes;"],
		[0, "&NotSucceeds;"],
		[0, {
			v: "&sub;",
			n: 8402,
			o: "&NotSubset;"
		}],
		[0, {
			v: "&sup;",
			n: 8402,
			o: "&NotSuperset;"
		}],
		[0, "&nsub;"],
		[0, "&nsup;"],
		[0, "&sube;"],
		[0, "&supe;"],
		[0, "&NotSubsetEqual;"],
		[0, "&NotSupersetEqual;"],
		[0, {
			v: "&subne;",
			n: 65024,
			o: "&varsubsetneq;"
		}],
		[0, {
			v: "&supne;",
			n: 65024,
			o: "&varsupsetneq;"
		}],
		[1, "&cupdot;"],
		[0, "&UnionPlus;"],
		[0, {
			v: "&sqsub;",
			n: 824,
			o: "&NotSquareSubset;"
		}],
		[0, {
			v: "&sqsup;",
			n: 824,
			o: "&NotSquareSuperset;"
		}],
		[0, "&sqsube;"],
		[0, "&sqsupe;"],
		[0, {
			v: "&sqcap;",
			n: 65024,
			o: "&sqcaps;"
		}],
		[0, {
			v: "&sqcup;",
			n: 65024,
			o: "&sqcups;"
		}],
		[0, "&CirclePlus;"],
		[0, "&CircleMinus;"],
		[0, "&CircleTimes;"],
		[0, "&osol;"],
		[0, "&CircleDot;"],
		[0, "&circledcirc;"],
		[0, "&circledast;"],
		[1, "&circleddash;"],
		[0, "&boxplus;"],
		[0, "&boxminus;"],
		[0, "&boxtimes;"],
		[0, "&dotsquare;"],
		[0, "&RightTee;"],
		[0, "&dashv;"],
		[0, "&DownTee;"],
		[0, "&bot;"],
		[1, "&models;"],
		[0, "&DoubleRightTee;"],
		[0, "&Vdash;"],
		[0, "&Vvdash;"],
		[0, "&VDash;"],
		[0, "&nvdash;"],
		[0, "&nvDash;"],
		[0, "&nVdash;"],
		[0, "&nVDash;"],
		[0, "&prurel;"],
		[1, "&LeftTriangle;"],
		[0, "&RightTriangle;"],
		[0, {
			v: "&LeftTriangleEqual;",
			n: 8402,
			o: "&nvltrie;"
		}],
		[0, {
			v: "&RightTriangleEqual;",
			n: 8402,
			o: "&nvrtrie;"
		}],
		[0, "&origof;"],
		[0, "&imof;"],
		[0, "&multimap;"],
		[0, "&hercon;"],
		[0, "&intcal;"],
		[0, "&veebar;"],
		[1, "&barvee;"],
		[0, "&angrtvb;"],
		[0, "&lrtri;"],
		[0, "&bigwedge;"],
		[0, "&bigvee;"],
		[0, "&bigcap;"],
		[0, "&bigcup;"],
		[0, "&diam;"],
		[0, "&sdot;"],
		[0, "&sstarf;"],
		[0, "&divideontimes;"],
		[0, "&bowtie;"],
		[0, "&ltimes;"],
		[0, "&rtimes;"],
		[0, "&leftthreetimes;"],
		[0, "&rightthreetimes;"],
		[0, "&backsimeq;"],
		[0, "&curlyvee;"],
		[0, "&curlywedge;"],
		[0, "&Sub;"],
		[0, "&Sup;"],
		[0, "&Cap;"],
		[0, "&Cup;"],
		[0, "&fork;"],
		[0, "&epar;"],
		[0, "&lessdot;"],
		[0, "&gtdot;"],
		[0, {
			v: "&Ll;",
			n: 824,
			o: "&nLl;"
		}],
		[0, {
			v: "&Gg;",
			n: 824,
			o: "&nGg;"
		}],
		[0, {
			v: "&leg;",
			n: 65024,
			o: "&lesg;"
		}],
		[0, {
			v: "&gel;",
			n: 65024,
			o: "&gesl;"
		}],
		[2, "&cuepr;"],
		[0, "&cuesc;"],
		[0, "&NotPrecedesSlantEqual;"],
		[0, "&NotSucceedsSlantEqual;"],
		[0, "&NotSquareSubsetEqual;"],
		[0, "&NotSquareSupersetEqual;"],
		[2, "&lnsim;"],
		[0, "&gnsim;"],
		[0, "&precnsim;"],
		[0, "&scnsim;"],
		[0, "&nltri;"],
		[0, "&NotRightTriangle;"],
		[0, "&nltrie;"],
		[0, "&NotRightTriangleEqual;"],
		[0, "&vellip;"],
		[0, "&ctdot;"],
		[0, "&utdot;"],
		[0, "&dtdot;"],
		[0, "&disin;"],
		[0, "&isinsv;"],
		[0, "&isins;"],
		[0, {
			v: "&isindot;",
			n: 824,
			o: "&notindot;"
		}],
		[0, "&notinvc;"],
		[0, "&notinvb;"],
		[1, {
			v: "&isinE;",
			n: 824,
			o: "&notinE;"
		}],
		[0, "&nisd;"],
		[0, "&xnis;"],
		[0, "&nis;"],
		[0, "&notnivc;"],
		[0, "&notnivb;"],
		[6, "&barwed;"],
		[0, "&Barwed;"],
		[1, "&lceil;"],
		[0, "&rceil;"],
		[0, "&LeftFloor;"],
		[0, "&rfloor;"],
		[0, "&drcrop;"],
		[0, "&dlcrop;"],
		[0, "&urcrop;"],
		[0, "&ulcrop;"],
		[0, "&bnot;"],
		[1, "&profline;"],
		[0, "&profsurf;"],
		[1, "&telrec;"],
		[0, "&target;"],
		[5, "&ulcorn;"],
		[0, "&urcorn;"],
		[0, "&dlcorn;"],
		[0, "&drcorn;"],
		[2, "&frown;"],
		[0, "&smile;"],
		[9, "&cylcty;"],
		[0, "&profalar;"],
		[7, "&topbot;"],
		[6, "&ovbar;"],
		[1, "&solbar;"],
		[60, "&angzarr;"],
		[51, "&lmoustache;"],
		[0, "&rmoustache;"],
		[2, "&OverBracket;"],
		[0, "&bbrk;"],
		[0, "&bbrktbrk;"],
		[37, "&OverParenthesis;"],
		[0, "&UnderParenthesis;"],
		[0, "&OverBrace;"],
		[0, "&UnderBrace;"],
		[2, "&trpezium;"],
		[4, "&elinters;"],
		[59, "&blank;"],
		[164, "&circledS;"],
		[55, "&boxh;"],
		[1, "&boxv;"],
		[9, "&boxdr;"],
		[3, "&boxdl;"],
		[3, "&boxur;"],
		[3, "&boxul;"],
		[3, "&boxvr;"],
		[7, "&boxvl;"],
		[7, "&boxhd;"],
		[7, "&boxhu;"],
		[7, "&boxvh;"],
		[19, "&boxH;"],
		[0, "&boxV;"],
		[0, "&boxdR;"],
		[0, "&boxDr;"],
		[0, "&boxDR;"],
		[0, "&boxdL;"],
		[0, "&boxDl;"],
		[0, "&boxDL;"],
		[0, "&boxuR;"],
		[0, "&boxUr;"],
		[0, "&boxUR;"],
		[0, "&boxuL;"],
		[0, "&boxUl;"],
		[0, "&boxUL;"],
		[0, "&boxvR;"],
		[0, "&boxVr;"],
		[0, "&boxVR;"],
		[0, "&boxvL;"],
		[0, "&boxVl;"],
		[0, "&boxVL;"],
		[0, "&boxHd;"],
		[0, "&boxhD;"],
		[0, "&boxHD;"],
		[0, "&boxHu;"],
		[0, "&boxhU;"],
		[0, "&boxHU;"],
		[0, "&boxvH;"],
		[0, "&boxVh;"],
		[0, "&boxVH;"],
		[19, "&uhblk;"],
		[3, "&lhblk;"],
		[3, "&block;"],
		[8, "&blk14;"],
		[0, "&blk12;"],
		[0, "&blk34;"],
		[13, "&square;"],
		[8, "&blacksquare;"],
		[0, "&EmptyVerySmallSquare;"],
		[1, "&rect;"],
		[0, "&marker;"],
		[2, "&fltns;"],
		[1, "&bigtriangleup;"],
		[0, "&blacktriangle;"],
		[0, "&triangle;"],
		[2, "&blacktriangleright;"],
		[0, "&rtri;"],
		[3, "&bigtriangledown;"],
		[0, "&blacktriangledown;"],
		[0, "&dtri;"],
		[2, "&blacktriangleleft;"],
		[0, "&ltri;"],
		[6, "&loz;"],
		[0, "&cir;"],
		[32, "&tridot;"],
		[2, "&bigcirc;"],
		[8, "&ultri;"],
		[0, "&urtri;"],
		[0, "&lltri;"],
		[0, "&EmptySmallSquare;"],
		[0, "&FilledSmallSquare;"],
		[8, "&bigstar;"],
		[0, "&star;"],
		[7, "&phone;"],
		[49, "&female;"],
		[1, "&male;"],
		[29, "&spades;"],
		[2, "&clubs;"],
		[1, "&hearts;"],
		[0, "&diamondsuit;"],
		[3, "&sung;"],
		[2, "&flat;"],
		[0, "&natural;"],
		[0, "&sharp;"],
		[163, "&check;"],
		[3, "&cross;"],
		[8, "&malt;"],
		[21, "&sext;"],
		[33, "&VerticalSeparator;"],
		[25, "&lbbrk;"],
		[0, "&rbbrk;"],
		[84, "&bsolhsub;"],
		[0, "&suphsol;"],
		[28, "&LeftDoubleBracket;"],
		[0, "&RightDoubleBracket;"],
		[0, "&lang;"],
		[0, "&rang;"],
		[0, "&Lang;"],
		[0, "&Rang;"],
		[0, "&loang;"],
		[0, "&roang;"],
		[7, "&longleftarrow;"],
		[0, "&longrightarrow;"],
		[0, "&longleftrightarrow;"],
		[0, "&DoubleLongLeftArrow;"],
		[0, "&DoubleLongRightArrow;"],
		[0, "&DoubleLongLeftRightArrow;"],
		[1, "&longmapsto;"],
		[2, "&dzigrarr;"],
		[258, "&nvlArr;"],
		[0, "&nvrArr;"],
		[0, "&nvHarr;"],
		[0, "&Map;"],
		[6, "&lbarr;"],
		[0, "&bkarow;"],
		[0, "&lBarr;"],
		[0, "&dbkarow;"],
		[0, "&drbkarow;"],
		[0, "&DDotrahd;"],
		[0, "&UpArrowBar;"],
		[0, "&DownArrowBar;"],
		[2, "&Rarrtl;"],
		[2, "&latail;"],
		[0, "&ratail;"],
		[0, "&lAtail;"],
		[0, "&rAtail;"],
		[0, "&larrfs;"],
		[0, "&rarrfs;"],
		[0, "&larrbfs;"],
		[0, "&rarrbfs;"],
		[2, "&nwarhk;"],
		[0, "&nearhk;"],
		[0, "&hksearow;"],
		[0, "&hkswarow;"],
		[0, "&nwnear;"],
		[0, "&nesear;"],
		[0, "&seswar;"],
		[0, "&swnwar;"],
		[8, {
			v: "&rarrc;",
			n: 824,
			o: "&nrarrc;"
		}],
		[1, "&cudarrr;"],
		[0, "&ldca;"],
		[0, "&rdca;"],
		[0, "&cudarrl;"],
		[0, "&larrpl;"],
		[2, "&curarrm;"],
		[0, "&cularrp;"],
		[7, "&rarrpl;"],
		[2, "&harrcir;"],
		[0, "&Uarrocir;"],
		[0, "&lurdshar;"],
		[0, "&ldrushar;"],
		[2, "&LeftRightVector;"],
		[0, "&RightUpDownVector;"],
		[0, "&DownLeftRightVector;"],
		[0, "&LeftUpDownVector;"],
		[0, "&LeftVectorBar;"],
		[0, "&RightVectorBar;"],
		[0, "&RightUpVectorBar;"],
		[0, "&RightDownVectorBar;"],
		[0, "&DownLeftVectorBar;"],
		[0, "&DownRightVectorBar;"],
		[0, "&LeftUpVectorBar;"],
		[0, "&LeftDownVectorBar;"],
		[0, "&LeftTeeVector;"],
		[0, "&RightTeeVector;"],
		[0, "&RightUpTeeVector;"],
		[0, "&RightDownTeeVector;"],
		[0, "&DownLeftTeeVector;"],
		[0, "&DownRightTeeVector;"],
		[0, "&LeftUpTeeVector;"],
		[0, "&LeftDownTeeVector;"],
		[0, "&lHar;"],
		[0, "&uHar;"],
		[0, "&rHar;"],
		[0, "&dHar;"],
		[0, "&luruhar;"],
		[0, "&ldrdhar;"],
		[0, "&ruluhar;"],
		[0, "&rdldhar;"],
		[0, "&lharul;"],
		[0, "&llhard;"],
		[0, "&rharul;"],
		[0, "&lrhard;"],
		[0, "&udhar;"],
		[0, "&duhar;"],
		[0, "&RoundImplies;"],
		[0, "&erarr;"],
		[0, "&simrarr;"],
		[0, "&larrsim;"],
		[0, "&rarrsim;"],
		[0, "&rarrap;"],
		[0, "&ltlarr;"],
		[1, "&gtrarr;"],
		[0, "&subrarr;"],
		[1, "&suplarr;"],
		[0, "&lfisht;"],
		[0, "&rfisht;"],
		[0, "&ufisht;"],
		[0, "&dfisht;"],
		[5, "&lopar;"],
		[0, "&ropar;"],
		[4, "&lbrke;"],
		[0, "&rbrke;"],
		[0, "&lbrkslu;"],
		[0, "&rbrksld;"],
		[0, "&lbrksld;"],
		[0, "&rbrkslu;"],
		[0, "&langd;"],
		[0, "&rangd;"],
		[0, "&lparlt;"],
		[0, "&rpargt;"],
		[0, "&gtlPar;"],
		[0, "&ltrPar;"],
		[3, "&vzigzag;"],
		[1, "&vangrt;"],
		[0, "&angrtvbd;"],
		[6, "&ange;"],
		[0, "&range;"],
		[0, "&dwangle;"],
		[0, "&uwangle;"],
		[0, "&angmsdaa;"],
		[0, "&angmsdab;"],
		[0, "&angmsdac;"],
		[0, "&angmsdad;"],
		[0, "&angmsdae;"],
		[0, "&angmsdaf;"],
		[0, "&angmsdag;"],
		[0, "&angmsdah;"],
		[0, "&bemptyv;"],
		[0, "&demptyv;"],
		[0, "&cemptyv;"],
		[0, "&raemptyv;"],
		[0, "&laemptyv;"],
		[0, "&ohbar;"],
		[0, "&omid;"],
		[0, "&opar;"],
		[1, "&operp;"],
		[1, "&olcross;"],
		[0, "&odsold;"],
		[1, "&olcir;"],
		[0, "&ofcir;"],
		[0, "&olt;"],
		[0, "&ogt;"],
		[0, "&cirscir;"],
		[0, "&cirE;"],
		[0, "&solb;"],
		[0, "&bsolb;"],
		[3, "&boxbox;"],
		[3, "&trisb;"],
		[0, "&rtriltri;"],
		[0, {
			v: "&LeftTriangleBar;",
			n: 824,
			o: "&NotLeftTriangleBar;"
		}],
		[0, {
			v: "&RightTriangleBar;",
			n: 824,
			o: "&NotRightTriangleBar;"
		}],
		[11, "&iinfin;"],
		[0, "&infintie;"],
		[0, "&nvinfin;"],
		[4, "&eparsl;"],
		[0, "&smeparsl;"],
		[0, "&eqvparsl;"],
		[5, "&blacklozenge;"],
		[8, "&RuleDelayed;"],
		[1, "&dsol;"],
		[9, "&bigodot;"],
		[0, "&bigoplus;"],
		[0, "&bigotimes;"],
		[1, "&biguplus;"],
		[1, "&bigsqcup;"],
		[5, "&iiiint;"],
		[0, "&fpartint;"],
		[2, "&cirfnint;"],
		[0, "&awint;"],
		[0, "&rppolint;"],
		[0, "&scpolint;"],
		[0, "&npolint;"],
		[0, "&pointint;"],
		[0, "&quatint;"],
		[0, "&intlarhk;"],
		[10, "&pluscir;"],
		[0, "&plusacir;"],
		[0, "&simplus;"],
		[0, "&plusdu;"],
		[0, "&plussim;"],
		[0, "&plustwo;"],
		[1, "&mcomma;"],
		[0, "&minusdu;"],
		[2, "&loplus;"],
		[0, "&roplus;"],
		[0, "&Cross;"],
		[0, "&timesd;"],
		[0, "&timesbar;"],
		[1, "&smashp;"],
		[0, "&lotimes;"],
		[0, "&rotimes;"],
		[0, "&otimesas;"],
		[0, "&Otimes;"],
		[0, "&odiv;"],
		[0, "&triplus;"],
		[0, "&triminus;"],
		[0, "&tritime;"],
		[0, "&intprod;"],
		[2, "&amalg;"],
		[0, "&capdot;"],
		[1, "&ncup;"],
		[0, "&ncap;"],
		[0, "&capand;"],
		[0, "&cupor;"],
		[0, "&cupcap;"],
		[0, "&capcup;"],
		[0, "&cupbrcap;"],
		[0, "&capbrcup;"],
		[0, "&cupcup;"],
		[0, "&capcap;"],
		[0, "&ccups;"],
		[0, "&ccaps;"],
		[2, "&ccupssm;"],
		[2, "&And;"],
		[0, "&Or;"],
		[0, "&andand;"],
		[0, "&oror;"],
		[0, "&orslope;"],
		[0, "&andslope;"],
		[1, "&andv;"],
		[0, "&orv;"],
		[0, "&andd;"],
		[0, "&ord;"],
		[1, "&wedbar;"],
		[6, "&sdote;"],
		[3, "&simdot;"],
		[2, {
			v: "&congdot;",
			n: 824,
			o: "&ncongdot;"
		}],
		[0, "&easter;"],
		[0, "&apacir;"],
		[0, {
			v: "&apE;",
			n: 824,
			o: "&napE;"
		}],
		[0, "&eplus;"],
		[0, "&pluse;"],
		[0, "&Esim;"],
		[0, "&Colone;"],
		[0, "&Equal;"],
		[1, "&ddotseq;"],
		[0, "&equivDD;"],
		[0, "&ltcir;"],
		[0, "&gtcir;"],
		[0, "&ltquest;"],
		[0, "&gtquest;"],
		[0, {
			v: "&leqslant;",
			n: 824,
			o: "&nleqslant;"
		}],
		[0, {
			v: "&geqslant;",
			n: 824,
			o: "&ngeqslant;"
		}],
		[0, "&lesdot;"],
		[0, "&gesdot;"],
		[0, "&lesdoto;"],
		[0, "&gesdoto;"],
		[0, "&lesdotor;"],
		[0, "&gesdotol;"],
		[0, "&lap;"],
		[0, "&gap;"],
		[0, "&lne;"],
		[0, "&gne;"],
		[0, "&lnap;"],
		[0, "&gnap;"],
		[0, "&lEg;"],
		[0, "&gEl;"],
		[0, "&lsime;"],
		[0, "&gsime;"],
		[0, "&lsimg;"],
		[0, "&gsiml;"],
		[0, "&lgE;"],
		[0, "&glE;"],
		[0, "&lesges;"],
		[0, "&gesles;"],
		[0, "&els;"],
		[0, "&egs;"],
		[0, "&elsdot;"],
		[0, "&egsdot;"],
		[0, "&el;"],
		[0, "&eg;"],
		[2, "&siml;"],
		[0, "&simg;"],
		[0, "&simlE;"],
		[0, "&simgE;"],
		[0, {
			v: "&LessLess;",
			n: 824,
			o: "&NotNestedLessLess;"
		}],
		[0, {
			v: "&GreaterGreater;",
			n: 824,
			o: "&NotNestedGreaterGreater;"
		}],
		[1, "&glj;"],
		[0, "&gla;"],
		[0, "&ltcc;"],
		[0, "&gtcc;"],
		[0, "&lescc;"],
		[0, "&gescc;"],
		[0, "&smt;"],
		[0, "&lat;"],
		[0, {
			v: "&smte;",
			n: 65024,
			o: "&smtes;"
		}],
		[0, {
			v: "&late;",
			n: 65024,
			o: "&lates;"
		}],
		[0, "&bumpE;"],
		[0, {
			v: "&PrecedesEqual;",
			n: 824,
			o: "&NotPrecedesEqual;"
		}],
		[0, {
			v: "&sce;",
			n: 824,
			o: "&NotSucceedsEqual;"
		}],
		[2, "&prE;"],
		[0, "&scE;"],
		[0, "&precneqq;"],
		[0, "&scnE;"],
		[0, "&prap;"],
		[0, "&scap;"],
		[0, "&precnapprox;"],
		[0, "&scnap;"],
		[0, "&Pr;"],
		[0, "&Sc;"],
		[0, "&subdot;"],
		[0, "&supdot;"],
		[0, "&subplus;"],
		[0, "&supplus;"],
		[0, "&submult;"],
		[0, "&supmult;"],
		[0, "&subedot;"],
		[0, "&supedot;"],
		[0, {
			v: "&subE;",
			n: 824,
			o: "&nsubE;"
		}],
		[0, {
			v: "&supE;",
			n: 824,
			o: "&nsupE;"
		}],
		[0, "&subsim;"],
		[0, "&supsim;"],
		[2, {
			v: "&subnE;",
			n: 65024,
			o: "&varsubsetneqq;"
		}],
		[0, {
			v: "&supnE;",
			n: 65024,
			o: "&varsupsetneqq;"
		}],
		[2, "&csub;"],
		[0, "&csup;"],
		[0, "&csube;"],
		[0, "&csupe;"],
		[0, "&subsup;"],
		[0, "&supsub;"],
		[0, "&subsub;"],
		[0, "&supsup;"],
		[0, "&suphsub;"],
		[0, "&supdsub;"],
		[0, "&forkv;"],
		[0, "&topfork;"],
		[0, "&mlcp;"],
		[8, "&Dashv;"],
		[1, "&Vdashl;"],
		[0, "&Barv;"],
		[0, "&vBar;"],
		[0, "&vBarv;"],
		[1, "&Vbar;"],
		[0, "&Not;"],
		[0, "&bNot;"],
		[0, "&rnmid;"],
		[0, "&cirmid;"],
		[0, "&midcir;"],
		[0, "&topcir;"],
		[0, "&nhpar;"],
		[0, "&parsim;"],
		[9, {
			v: "&parsl;",
			n: 8421,
			o: "&nparsl;"
		}],
		[44343, { n: new Map(/* @__PURE__ */ restoreDiff([
			[56476, "&Ascr;"],
			[1, "&Cscr;"],
			[0, "&Dscr;"],
			[2, "&Gscr;"],
			[2, "&Jscr;"],
			[0, "&Kscr;"],
			[2, "&Nscr;"],
			[0, "&Oscr;"],
			[0, "&Pscr;"],
			[0, "&Qscr;"],
			[1, "&Sscr;"],
			[0, "&Tscr;"],
			[0, "&Uscr;"],
			[0, "&Vscr;"],
			[0, "&Wscr;"],
			[0, "&Xscr;"],
			[0, "&Yscr;"],
			[0, "&Zscr;"],
			[0, "&ascr;"],
			[0, "&bscr;"],
			[0, "&cscr;"],
			[0, "&dscr;"],
			[1, "&fscr;"],
			[1, "&hscr;"],
			[0, "&iscr;"],
			[0, "&jscr;"],
			[0, "&kscr;"],
			[0, "&lscr;"],
			[0, "&mscr;"],
			[0, "&nscr;"],
			[1, "&pscr;"],
			[0, "&qscr;"],
			[0, "&rscr;"],
			[0, "&sscr;"],
			[0, "&tscr;"],
			[0, "&uscr;"],
			[0, "&vscr;"],
			[0, "&wscr;"],
			[0, "&xscr;"],
			[0, "&yscr;"],
			[0, "&zscr;"],
			[52, "&Afr;"],
			[0, "&Bfr;"],
			[1, "&Dfr;"],
			[0, "&Efr;"],
			[0, "&Ffr;"],
			[0, "&Gfr;"],
			[2, "&Jfr;"],
			[0, "&Kfr;"],
			[0, "&Lfr;"],
			[0, "&Mfr;"],
			[0, "&Nfr;"],
			[0, "&Ofr;"],
			[0, "&Pfr;"],
			[0, "&Qfr;"],
			[1, "&Sfr;"],
			[0, "&Tfr;"],
			[0, "&Ufr;"],
			[0, "&Vfr;"],
			[0, "&Wfr;"],
			[0, "&Xfr;"],
			[0, "&Yfr;"],
			[1, "&afr;"],
			[0, "&bfr;"],
			[0, "&cfr;"],
			[0, "&dfr;"],
			[0, "&efr;"],
			[0, "&ffr;"],
			[0, "&gfr;"],
			[0, "&hfr;"],
			[0, "&ifr;"],
			[0, "&jfr;"],
			[0, "&kfr;"],
			[0, "&lfr;"],
			[0, "&mfr;"],
			[0, "&nfr;"],
			[0, "&ofr;"],
			[0, "&pfr;"],
			[0, "&qfr;"],
			[0, "&rfr;"],
			[0, "&sfr;"],
			[0, "&tfr;"],
			[0, "&ufr;"],
			[0, "&vfr;"],
			[0, "&wfr;"],
			[0, "&xfr;"],
			[0, "&yfr;"],
			[0, "&zfr;"],
			[0, "&Aopf;"],
			[0, "&Bopf;"],
			[1, "&Dopf;"],
			[0, "&Eopf;"],
			[0, "&Fopf;"],
			[0, "&Gopf;"],
			[1, "&Iopf;"],
			[0, "&Jopf;"],
			[0, "&Kopf;"],
			[0, "&Lopf;"],
			[0, "&Mopf;"],
			[1, "&Oopf;"],
			[3, "&Sopf;"],
			[0, "&Topf;"],
			[0, "&Uopf;"],
			[0, "&Vopf;"],
			[0, "&Wopf;"],
			[0, "&Xopf;"],
			[0, "&Yopf;"],
			[1, "&aopf;"],
			[0, "&bopf;"],
			[0, "&copf;"],
			[0, "&dopf;"],
			[0, "&eopf;"],
			[0, "&fopf;"],
			[0, "&gopf;"],
			[0, "&hopf;"],
			[0, "&iopf;"],
			[0, "&jopf;"],
			[0, "&kopf;"],
			[0, "&lopf;"],
			[0, "&mopf;"],
			[0, "&nopf;"],
			[0, "&oopf;"],
			[0, "&popf;"],
			[0, "&qopf;"],
			[0, "&ropf;"],
			[0, "&sopf;"],
			[0, "&topf;"],
			[0, "&uopf;"],
			[0, "&vopf;"],
			[0, "&wopf;"],
			[0, "&xopf;"],
			[0, "&yopf;"],
			[0, "&zopf;"]
		])) }],
		[8906, "&fflig;"],
		[0, "&filig;"],
		[0, "&fllig;"],
		[0, "&ffilig;"],
		[0, "&ffllig;"]
	]));
}));
var require_escape = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
	var xmlCodeMap = new Map([
		[34, "&quot;"],
		[38, "&amp;"],
		[39, "&apos;"],
		[60, "&lt;"],
		[62, "&gt;"]
	]);
	exports.getCodePoint = String.prototype.codePointAt != null ? function(str, index) {
		return str.codePointAt(index);
	} : function(c, index) {
		return (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index);
	};
	function encodeXML(str) {
		var ret = "";
		var lastIdx = 0;
		var match;
		while ((match = exports.xmlReplacer.exec(str)) !== null) {
			var i$1 = match.index;
			var char = str.charCodeAt(i$1);
			var next = xmlCodeMap.get(char);
			if (next !== void 0) {
				ret += str.substring(lastIdx, i$1) + next;
				lastIdx = i$1 + 1;
			} else {
				ret += "".concat(str.substring(lastIdx, i$1), "&#x").concat((0, exports.getCodePoint)(str, i$1).toString(16), ";");
				lastIdx = exports.xmlReplacer.lastIndex += Number((char & 64512) === 55296);
			}
		}
		return ret + str.substr(lastIdx);
	}
	exports.encodeXML = encodeXML;
	exports.escape = encodeXML;
	function getEscaper(regex$1, map) {
		return function escape(data) {
			var match;
			var lastIdx = 0;
			var result = "";
			while (match = regex$1.exec(data)) {
				if (lastIdx !== match.index) result += data.substring(lastIdx, match.index);
				result += map.get(match[0].charCodeAt(0));
				lastIdx = match.index + 1;
			}
			return result + data.substring(lastIdx);
		};
	}
	exports.escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
	exports.escapeAttribute = getEscaper(/["&\u00A0]/g, new Map([
		[34, "&quot;"],
		[38, "&amp;"],
		[160, "&nbsp;"]
	]));
	exports.escapeText = getEscaper(/[&<>\u00A0]/g, new Map([
		[38, "&amp;"],
		[60, "&lt;"],
		[62, "&gt;"],
		[160, "&nbsp;"]
	]));
}));
var require_encode = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$11 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var encode_html_js_1 = __importDefault$11(require_encode_html());
	var escape_js_1$1 = require_escape();
	var htmlReplacer = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
	function encodeHTML(data) {
		return encodeHTMLTrieRe(htmlReplacer, data);
	}
	exports.encodeHTML = encodeHTML;
	function encodeNonAsciiHTML(data) {
		return encodeHTMLTrieRe(escape_js_1$1.xmlReplacer, data);
	}
	exports.encodeNonAsciiHTML = encodeNonAsciiHTML;
	function encodeHTMLTrieRe(regExp, str) {
		var ret = "";
		var lastIdx = 0;
		var match;
		while ((match = regExp.exec(str)) !== null) {
			var i$1 = match.index;
			ret += str.substring(lastIdx, i$1);
			var char = str.charCodeAt(i$1);
			var next = encode_html_js_1.default.get(char);
			if (typeof next === "object") {
				if (i$1 + 1 < str.length) {
					var nextChar = str.charCodeAt(i$1 + 1);
					var value = typeof next.n === "number" ? next.n === nextChar ? next.o : void 0 : next.n.get(nextChar);
					if (value !== void 0) {
						ret += value;
						lastIdx = regExp.lastIndex += 1;
						continue;
					}
				}
				next = next.v;
			}
			if (next !== void 0) {
				ret += next;
				lastIdx = i$1 + 1;
			} else {
				var cp = (0, escape_js_1$1.getCodePoint)(str, i$1);
				ret += "&#x".concat(cp.toString(16), ";");
				lastIdx = regExp.lastIndex += Number(cp !== char);
			}
		}
		return ret + str.substr(lastIdx);
	}
}));
var require_lib$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.decodeXMLStrict = exports.decodeHTML5Strict = exports.decodeHTML4Strict = exports.decodeHTML5 = exports.decodeHTML4 = exports.decodeHTMLAttribute = exports.decodeHTMLStrict = exports.decodeHTML = exports.decodeXML = exports.DecodingMode = exports.EntityDecoder = exports.encodeHTML5 = exports.encodeHTML4 = exports.encodeNonAsciiHTML = exports.encodeHTML = exports.escapeText = exports.escapeAttribute = exports.escapeUTF8 = exports.escape = exports.encodeXML = exports.encode = exports.decodeStrict = exports.decode = exports.EncodingMode = exports.EntityLevel = void 0;
	var decode_js_1 = require_decode();
	var encode_js_1 = require_encode();
	var escape_js_1 = require_escape();
	var EntityLevel;
	(function(EntityLevel$1) {
		EntityLevel$1[EntityLevel$1["XML"] = 0] = "XML";
		EntityLevel$1[EntityLevel$1["HTML"] = 1] = "HTML";
	})(EntityLevel = exports.EntityLevel || (exports.EntityLevel = {}));
	var EncodingMode;
	(function(EncodingMode$1) {
		EncodingMode$1[EncodingMode$1["UTF8"] = 0] = "UTF8";
		EncodingMode$1[EncodingMode$1["ASCII"] = 1] = "ASCII";
		EncodingMode$1[EncodingMode$1["Extensive"] = 2] = "Extensive";
		EncodingMode$1[EncodingMode$1["Attribute"] = 3] = "Attribute";
		EncodingMode$1[EncodingMode$1["Text"] = 4] = "Text";
	})(EncodingMode = exports.EncodingMode || (exports.EncodingMode = {}));
	function decode$1(data, options$1) {
		if (options$1 === void 0) options$1 = EntityLevel.XML;
		if ((typeof options$1 === "number" ? options$1 : options$1.level) === EntityLevel.HTML) {
			var mode = typeof options$1 === "object" ? options$1.mode : void 0;
			return (0, decode_js_1.decodeHTML)(data, mode);
		}
		return (0, decode_js_1.decodeXML)(data);
	}
	exports.decode = decode$1;
	function decodeStrict(data, options$1) {
		var _a$1;
		if (options$1 === void 0) options$1 = EntityLevel.XML;
		var opts = typeof options$1 === "number" ? { level: options$1 } : options$1;
		(_a$1 = opts.mode) !== null && _a$1 !== void 0 || (opts.mode = decode_js_1.DecodingMode.Strict);
		return decode$1(data, opts);
	}
	exports.decodeStrict = decodeStrict;
	function encode(data, options$1) {
		if (options$1 === void 0) options$1 = EntityLevel.XML;
		var opts = typeof options$1 === "number" ? { level: options$1 } : options$1;
		if (opts.mode === EncodingMode.UTF8) return (0, escape_js_1.escapeUTF8)(data);
		if (opts.mode === EncodingMode.Attribute) return (0, escape_js_1.escapeAttribute)(data);
		if (opts.mode === EncodingMode.Text) return (0, escape_js_1.escapeText)(data);
		if (opts.level === EntityLevel.HTML) {
			if (opts.mode === EncodingMode.ASCII) return (0, encode_js_1.encodeNonAsciiHTML)(data);
			return (0, encode_js_1.encodeHTML)(data);
		}
		return (0, escape_js_1.encodeXML)(data);
	}
	exports.encode = encode;
	var escape_js_2 = require_escape();
	Object.defineProperty(exports, "encodeXML", {
		enumerable: true,
		get: function() {
			return escape_js_2.encodeXML;
		}
	});
	Object.defineProperty(exports, "escape", {
		enumerable: true,
		get: function() {
			return escape_js_2.escape;
		}
	});
	Object.defineProperty(exports, "escapeUTF8", {
		enumerable: true,
		get: function() {
			return escape_js_2.escapeUTF8;
		}
	});
	Object.defineProperty(exports, "escapeAttribute", {
		enumerable: true,
		get: function() {
			return escape_js_2.escapeAttribute;
		}
	});
	Object.defineProperty(exports, "escapeText", {
		enumerable: true,
		get: function() {
			return escape_js_2.escapeText;
		}
	});
	var encode_js_2 = require_encode();
	Object.defineProperty(exports, "encodeHTML", {
		enumerable: true,
		get: function() {
			return encode_js_2.encodeHTML;
		}
	});
	Object.defineProperty(exports, "encodeNonAsciiHTML", {
		enumerable: true,
		get: function() {
			return encode_js_2.encodeNonAsciiHTML;
		}
	});
	Object.defineProperty(exports, "encodeHTML4", {
		enumerable: true,
		get: function() {
			return encode_js_2.encodeHTML;
		}
	});
	Object.defineProperty(exports, "encodeHTML5", {
		enumerable: true,
		get: function() {
			return encode_js_2.encodeHTML;
		}
	});
	var decode_js_2 = require_decode();
	Object.defineProperty(exports, "EntityDecoder", {
		enumerable: true,
		get: function() {
			return decode_js_2.EntityDecoder;
		}
	});
	Object.defineProperty(exports, "DecodingMode", {
		enumerable: true,
		get: function() {
			return decode_js_2.DecodingMode;
		}
	});
	Object.defineProperty(exports, "decodeXML", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeXML;
		}
	});
	Object.defineProperty(exports, "decodeHTML", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeHTML;
		}
	});
	Object.defineProperty(exports, "decodeHTMLStrict", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeHTMLStrict;
		}
	});
	Object.defineProperty(exports, "decodeHTMLAttribute", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeHTMLAttribute;
		}
	});
	Object.defineProperty(exports, "decodeHTML4", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeHTML;
		}
	});
	Object.defineProperty(exports, "decodeHTML5", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeHTML;
		}
	});
	Object.defineProperty(exports, "decodeHTML4Strict", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeHTMLStrict;
		}
	});
	Object.defineProperty(exports, "decodeHTML5Strict", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeHTMLStrict;
		}
	});
	Object.defineProperty(exports, "decodeXMLStrict", {
		enumerable: true,
		get: function() {
			return decode_js_2.decodeXML;
		}
	});
}));
var require_foreignNames = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.elementNames = new Map([
		"altGlyph",
		"altGlyphDef",
		"altGlyphItem",
		"animateColor",
		"animateMotion",
		"animateTransform",
		"clipPath",
		"feBlend",
		"feColorMatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feDropShadow",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence",
		"foreignObject",
		"glyphRef",
		"linearGradient",
		"radialGradient",
		"textPath"
	].map(function(val) {
		return [val.toLowerCase(), val];
	}));
	exports.attributeNames = new Map([
		"definitionURL",
		"attributeName",
		"attributeType",
		"baseFrequency",
		"baseProfile",
		"calcMode",
		"clipPathUnits",
		"diffuseConstant",
		"edgeMode",
		"filterUnits",
		"glyphRef",
		"gradientTransform",
		"gradientUnits",
		"kernelMatrix",
		"kernelUnitLength",
		"keyPoints",
		"keySplines",
		"keyTimes",
		"lengthAdjust",
		"limitingConeAngle",
		"markerHeight",
		"markerUnits",
		"markerWidth",
		"maskContentUnits",
		"maskUnits",
		"numOctaves",
		"pathLength",
		"patternContentUnits",
		"patternTransform",
		"patternUnits",
		"pointsAtX",
		"pointsAtY",
		"pointsAtZ",
		"preserveAlpha",
		"preserveAspectRatio",
		"primitiveUnits",
		"refX",
		"refY",
		"repeatCount",
		"repeatDur",
		"requiredExtensions",
		"requiredFeatures",
		"specularConstant",
		"specularExponent",
		"spreadMethod",
		"startOffset",
		"stdDeviation",
		"stitchTiles",
		"surfaceScale",
		"systemLanguage",
		"tableValues",
		"targetX",
		"targetY",
		"textLength",
		"viewBox",
		"viewTarget",
		"xChannelSelector",
		"yChannelSelector",
		"zoomAndPan"
	].map(function(val) {
		return [val.toLowerCase(), val];
	}));
}));
var require_lib$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __assign = exports && exports.__assign || function() {
		__assign = Object.assign || function(t$1) {
			for (var s, i$1 = 1, n = arguments.length; i$1 < n; i$1++) {
				s = arguments[i$1];
				for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t$1[p] = s[p];
			}
			return t$1;
		};
		return __assign.apply(this, arguments);
	};
	var __createBinding$3 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$2 = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar$2 = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$3(result, mod, k);
		}
		__setModuleDefault$2(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var ElementType = __importStar$2(require_lib$6());
	var entities_1 = require_lib$4();
	var foreignNames_js_1 = require_foreignNames();
	var unencodedElements = new Set([
		"style",
		"script",
		"xmp",
		"iframe",
		"noembed",
		"noframes",
		"plaintext",
		"noscript"
	]);
	function replaceQuotes(value) {
		return value.replace(/"/g, "&quot;");
	}
	function formatAttributes(attributes$1, opts) {
		var _a$1;
		if (!attributes$1) return;
		var encode$1 = ((_a$1 = opts.encodeEntities) !== null && _a$1 !== void 0 ? _a$1 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? entities_1.encodeXML : entities_1.escapeAttribute;
		return Object.keys(attributes$1).map(function(key) {
			var _a$2, _b;
			var value = (_a$2 = attributes$1[key]) !== null && _a$2 !== void 0 ? _a$2 : "";
			if (opts.xmlMode === "foreign") key = (_b = foreignNames_js_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
			if (!opts.emptyAttrs && !opts.xmlMode && value === "") return key;
			return "".concat(key, "=\"").concat(encode$1(value), "\"");
		}).join(" ");
	}
	var singleTag = new Set([
		"area",
		"base",
		"basefont",
		"br",
		"col",
		"command",
		"embed",
		"frame",
		"hr",
		"img",
		"input",
		"isindex",
		"keygen",
		"link",
		"meta",
		"param",
		"source",
		"track",
		"wbr"
	]);
	function render(node, options$1) {
		if (options$1 === void 0) options$1 = {};
		var nodes = "length" in node ? node : [node];
		var output = "";
		for (var i$1 = 0; i$1 < nodes.length; i$1++) output += renderNode(nodes[i$1], options$1);
		return output;
	}
	exports.render = render;
	exports.default = render;
	function renderNode(node, options$1) {
		switch (node.type) {
			case ElementType.Root: return render(node.children, options$1);
			case ElementType.Doctype:
			case ElementType.Directive: return renderDirective(node);
			case ElementType.Comment: return renderComment(node);
			case ElementType.CDATA: return renderCdata(node);
			case ElementType.Script:
			case ElementType.Style:
			case ElementType.Tag: return renderTag(node, options$1);
			case ElementType.Text: return renderText(node, options$1);
		}
	}
	var foreignModeIntegrationPoints = new Set([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext",
		"annotation-xml",
		"foreignObject",
		"desc",
		"title"
	]);
	var foreignElements = new Set(["svg", "math"]);
	function renderTag(elem, opts) {
		var _a$1;
		if (opts.xmlMode === "foreign") {
			elem.name = (_a$1 = foreignNames_js_1.elementNames.get(elem.name)) !== null && _a$1 !== void 0 ? _a$1 : elem.name;
			if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) opts = __assign(__assign({}, opts), { xmlMode: false });
		}
		if (!opts.xmlMode && foreignElements.has(elem.name)) opts = __assign(__assign({}, opts), { xmlMode: "foreign" });
		var tag = "<".concat(elem.name);
		var attribs = formatAttributes(elem.attribs, opts);
		if (attribs) tag += " ".concat(attribs);
		if (elem.children.length === 0 && (opts.xmlMode ? opts.selfClosingTags !== false : opts.selfClosingTags && singleTag.has(elem.name))) {
			if (!opts.xmlMode) tag += " ";
			tag += "/>";
		} else {
			tag += ">";
			if (elem.children.length > 0) tag += render(elem.children, opts);
			if (opts.xmlMode || !singleTag.has(elem.name)) tag += "</".concat(elem.name, ">");
		}
		return tag;
	}
	function renderDirective(elem) {
		return "<".concat(elem.data, ">");
	}
	function renderText(elem, opts) {
		var _a$1;
		var data = elem.data || "";
		if (((_a$1 = opts.encodeEntities) !== null && _a$1 !== void 0 ? _a$1 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) data = opts.xmlMode || opts.encodeEntities !== "utf8" ? (0, entities_1.encodeXML)(data) : (0, entities_1.escapeText)(data);
		return data;
	}
	function renderCdata(elem) {
		return "<![CDATA[".concat(elem.children[0].data, "]]>");
	}
	function renderComment(elem) {
		return "<!--".concat(elem.data, "-->");
	}
}));
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$10 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getOuterHTML = getOuterHTML;
	exports.getInnerHTML = getInnerHTML;
	exports.getText = getText$1;
	exports.textContent = textContent;
	exports.innerText = innerText;
	var domhandler_1$5 = require_lib$5();
	var dom_serializer_1 = __importDefault$10(require_lib$3());
	var domelementtype_1 = require_lib$6();
	function getOuterHTML(node, options$1) {
		return (0, dom_serializer_1.default)(node, options$1);
	}
	function getInnerHTML(node, options$1) {
		return (0, domhandler_1$5.hasChildren)(node) ? node.children.map(function(node$1) {
			return getOuterHTML(node$1, options$1);
		}).join("") : "";
	}
	function getText$1(node) {
		if (Array.isArray(node)) return node.map(getText$1).join("");
		if ((0, domhandler_1$5.isTag)(node)) return node.name === "br" ? "\n" : getText$1(node.children);
		if ((0, domhandler_1$5.isCDATA)(node)) return getText$1(node.children);
		if ((0, domhandler_1$5.isText)(node)) return node.data;
		return "";
	}
	function textContent(node) {
		if (Array.isArray(node)) return node.map(textContent).join("");
		if ((0, domhandler_1$5.hasChildren)(node) && !(0, domhandler_1$5.isComment)(node)) return textContent(node.children);
		if ((0, domhandler_1$5.isText)(node)) return node.data;
		return "";
	}
	function innerText(node) {
		if (Array.isArray(node)) return node.map(innerText).join("");
		if ((0, domhandler_1$5.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1$5.isCDATA)(node))) return innerText(node.children);
		if ((0, domhandler_1$5.isText)(node)) return node.data;
		return "";
	}
}));
var require_traversal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getChildren = getChildren$1;
	exports.getParent = getParent$1;
	exports.getSiblings = getSiblings$1;
	exports.getAttributeValue = getAttributeValue$1;
	exports.hasAttrib = hasAttrib$1;
	exports.getName = getName$1;
	exports.nextElementSibling = nextElementSibling;
	exports.prevElementSibling = prevElementSibling;
	var domhandler_1$4 = require_lib$5();
	function getChildren$1(elem) {
		return (0, domhandler_1$4.hasChildren)(elem) ? elem.children : [];
	}
	function getParent$1(elem) {
		return elem.parent || null;
	}
	function getSiblings$1(elem) {
		var _a$1, _b;
		var parent = getParent$1(elem);
		if (parent != null) return getChildren$1(parent);
		var siblings = [elem];
		var prev = elem.prev, next = elem.next;
		while (prev != null) {
			siblings.unshift(prev);
			_a$1 = prev, prev = _a$1.prev;
		}
		while (next != null) {
			siblings.push(next);
			_b = next, next = _b.next;
		}
		return siblings;
	}
	function getAttributeValue$1(elem, name$1) {
		var _a$1;
		return (_a$1 = elem.attribs) === null || _a$1 === void 0 ? void 0 : _a$1[name$1];
	}
	function hasAttrib$1(elem, name$1) {
		return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name$1) && elem.attribs[name$1] != null;
	}
	function getName$1(elem) {
		return elem.name;
	}
	function nextElementSibling(elem) {
		var _a$1;
		var next = elem.next;
		while (next !== null && !(0, domhandler_1$4.isTag)(next)) _a$1 = next, next = _a$1.next;
		return next;
	}
	function prevElementSibling(elem) {
		var _a$1;
		var prev = elem.prev;
		while (prev !== null && !(0, domhandler_1$4.isTag)(prev)) _a$1 = prev, prev = _a$1.prev;
		return prev;
	}
}));
var require_manipulation = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.removeElement = removeElement;
	exports.replaceElement = replaceElement;
	exports.appendChild = appendChild;
	exports.append = append;
	exports.prependChild = prependChild;
	exports.prepend = prepend;
	function removeElement(elem) {
		if (elem.prev) elem.prev.next = elem.next;
		if (elem.next) elem.next.prev = elem.prev;
		if (elem.parent) {
			var childs = elem.parent.children;
			var childsIndex = childs.lastIndexOf(elem);
			if (childsIndex >= 0) childs.splice(childsIndex, 1);
		}
		elem.next = null;
		elem.prev = null;
		elem.parent = null;
	}
	function replaceElement(elem, replacement) {
		var prev = replacement.prev = elem.prev;
		if (prev) prev.next = replacement;
		var next = replacement.next = elem.next;
		if (next) next.prev = replacement;
		var parent = replacement.parent = elem.parent;
		if (parent) {
			var childs = parent.children;
			childs[childs.lastIndexOf(elem)] = replacement;
			elem.parent = null;
		}
	}
	function appendChild(parent, child) {
		removeElement(child);
		child.next = null;
		child.parent = parent;
		if (parent.children.push(child) > 1) {
			var sibling = parent.children[parent.children.length - 2];
			sibling.next = child;
			child.prev = sibling;
		} else child.prev = null;
	}
	function append(elem, next) {
		removeElement(next);
		var parent = elem.parent;
		var currNext = elem.next;
		next.next = currNext;
		next.prev = elem;
		elem.next = next;
		next.parent = parent;
		if (currNext) {
			currNext.prev = next;
			if (parent) {
				var childs = parent.children;
				childs.splice(childs.lastIndexOf(currNext), 0, next);
			}
		} else if (parent) parent.children.push(next);
	}
	function prependChild(parent, child) {
		removeElement(child);
		child.parent = parent;
		child.prev = null;
		if (parent.children.unshift(child) !== 1) {
			var sibling = parent.children[1];
			sibling.prev = child;
			child.next = sibling;
		} else child.next = null;
	}
	function prepend(elem, prev) {
		removeElement(prev);
		var parent = elem.parent;
		if (parent) {
			var childs = parent.children;
			childs.splice(childs.indexOf(elem), 0, prev);
		}
		if (elem.prev) elem.prev.next = prev;
		prev.parent = parent;
		prev.prev = elem.prev;
		prev.next = elem;
		elem.prev = prev;
	}
}));
var require_querying = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.filter = filter;
	exports.find = find;
	exports.findOneChild = findOneChild;
	exports.findOne = findOne$1;
	exports.existsOne = existsOne$1;
	exports.findAll = findAll$1;
	var domhandler_1$3 = require_lib$5();
	function filter(test, node, recurse, limit) {
		if (recurse === void 0) recurse = true;
		if (limit === void 0) limit = Infinity;
		return find(test, Array.isArray(node) ? node : [node], recurse, limit);
	}
	function find(test, nodes, recurse, limit) {
		var result = [];
		var nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
		var indexStack = [0];
		for (;;) {
			if (indexStack[0] >= nodeStack[0].length) {
				if (indexStack.length === 1) return result;
				nodeStack.shift();
				indexStack.shift();
				continue;
			}
			var elem = nodeStack[0][indexStack[0]++];
			if (test(elem)) {
				result.push(elem);
				if (--limit <= 0) return result;
			}
			if (recurse && (0, domhandler_1$3.hasChildren)(elem) && elem.children.length > 0) {
				indexStack.unshift(0);
				nodeStack.unshift(elem.children);
			}
		}
	}
	function findOneChild(test, nodes) {
		return nodes.find(test);
	}
	function findOne$1(test, nodes, recurse) {
		if (recurse === void 0) recurse = true;
		var searchedNodes = Array.isArray(nodes) ? nodes : [nodes];
		for (var i$1 = 0; i$1 < searchedNodes.length; i$1++) {
			var node = searchedNodes[i$1];
			if ((0, domhandler_1$3.isTag)(node) && test(node)) return node;
			if (recurse && (0, domhandler_1$3.hasChildren)(node) && node.children.length > 0) {
				var found = findOne$1(test, node.children, true);
				if (found) return found;
			}
		}
		return null;
	}
	function existsOne$1(test, nodes) {
		return (Array.isArray(nodes) ? nodes : [nodes]).some(function(node) {
			return (0, domhandler_1$3.isTag)(node) && test(node) || (0, domhandler_1$3.hasChildren)(node) && existsOne$1(test, node.children);
		});
	}
	function findAll$1(test, nodes) {
		var result = [];
		var nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
		var indexStack = [0];
		for (;;) {
			if (indexStack[0] >= nodeStack[0].length) {
				if (nodeStack.length === 1) return result;
				nodeStack.shift();
				indexStack.shift();
				continue;
			}
			var elem = nodeStack[0][indexStack[0]++];
			if ((0, domhandler_1$3.isTag)(elem) && test(elem)) result.push(elem);
			if ((0, domhandler_1$3.hasChildren)(elem) && elem.children.length > 0) {
				indexStack.unshift(0);
				nodeStack.unshift(elem.children);
			}
		}
	}
}));
var require_legacy = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.testElement = testElement;
	exports.getElements = getElements;
	exports.getElementById = getElementById;
	exports.getElementsByTagName = getElementsByTagName;
	exports.getElementsByClassName = getElementsByClassName;
	exports.getElementsByTagType = getElementsByTagType;
	var domhandler_1$2 = require_lib$5();
	var querying_js_1 = require_querying();
	var Checks = {
		tag_name: function(name$1) {
			if (typeof name$1 === "function") return function(elem) {
				return (0, domhandler_1$2.isTag)(elem) && name$1(elem.name);
			};
			else if (name$1 === "*") return domhandler_1$2.isTag;
			return function(elem) {
				return (0, domhandler_1$2.isTag)(elem) && elem.name === name$1;
			};
		},
		tag_type: function(type$1) {
			if (typeof type$1 === "function") return function(elem) {
				return type$1(elem.type);
			};
			return function(elem) {
				return elem.type === type$1;
			};
		},
		tag_contains: function(data) {
			if (typeof data === "function") return function(elem) {
				return (0, domhandler_1$2.isText)(elem) && data(elem.data);
			};
			return function(elem) {
				return (0, domhandler_1$2.isText)(elem) && elem.data === data;
			};
		}
	};
	function getAttribCheck(attrib, value) {
		if (typeof value === "function") return function(elem) {
			return (0, domhandler_1$2.isTag)(elem) && value(elem.attribs[attrib]);
		};
		return function(elem) {
			return (0, domhandler_1$2.isTag)(elem) && elem.attribs[attrib] === value;
		};
	}
	function combineFuncs(a, b) {
		return function(elem) {
			return a(elem) || b(elem);
		};
	}
	function compileTest(options$1) {
		var funcs = Object.keys(options$1).map(function(key) {
			var value = options$1[key];
			return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
		});
		return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
	}
	function testElement(options$1, node) {
		var test = compileTest(options$1);
		return test ? test(node) : true;
	}
	function getElements(options$1, nodes, recurse, limit) {
		if (limit === void 0) limit = Infinity;
		var test = compileTest(options$1);
		return test ? (0, querying_js_1.filter)(test, nodes, recurse, limit) : [];
	}
	function getElementById(id, nodes, recurse) {
		if (recurse === void 0) recurse = true;
		if (!Array.isArray(nodes)) nodes = [nodes];
		return (0, querying_js_1.findOne)(getAttribCheck("id", id), nodes, recurse);
	}
	function getElementsByTagName(tagName, nodes, recurse, limit) {
		if (recurse === void 0) recurse = true;
		if (limit === void 0) limit = Infinity;
		return (0, querying_js_1.filter)(Checks["tag_name"](tagName), nodes, recurse, limit);
	}
	function getElementsByClassName(className, nodes, recurse, limit) {
		if (recurse === void 0) recurse = true;
		if (limit === void 0) limit = Infinity;
		return (0, querying_js_1.filter)(getAttribCheck("class", className), nodes, recurse, limit);
	}
	function getElementsByTagType(type$1, nodes, recurse, limit) {
		if (recurse === void 0) recurse = true;
		if (limit === void 0) limit = Infinity;
		return (0, querying_js_1.filter)(Checks["tag_type"](type$1), nodes, recurse, limit);
	}
}));
var require_helpers = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.removeSubsets = removeSubsets$1;
	exports.compareDocumentPosition = compareDocumentPosition;
	exports.uniqueSort = uniqueSort;
	var domhandler_1$1 = require_lib$5();
	function removeSubsets$1(nodes) {
		var idx = nodes.length;
		while (--idx >= 0) {
			var node = nodes[idx];
			if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
				nodes.splice(idx, 1);
				continue;
			}
			for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) if (nodes.includes(ancestor)) {
				nodes.splice(idx, 1);
				break;
			}
		}
		return nodes;
	}
	var DocumentPosition;
	(function(DocumentPosition$1) {
		DocumentPosition$1[DocumentPosition$1["DISCONNECTED"] = 1] = "DISCONNECTED";
		DocumentPosition$1[DocumentPosition$1["PRECEDING"] = 2] = "PRECEDING";
		DocumentPosition$1[DocumentPosition$1["FOLLOWING"] = 4] = "FOLLOWING";
		DocumentPosition$1[DocumentPosition$1["CONTAINS"] = 8] = "CONTAINS";
		DocumentPosition$1[DocumentPosition$1["CONTAINED_BY"] = 16] = "CONTAINED_BY";
	})(DocumentPosition || (exports.DocumentPosition = DocumentPosition = {}));
	function compareDocumentPosition(nodeA, nodeB) {
		var aParents = [];
		var bParents = [];
		if (nodeA === nodeB) return 0;
		var current = (0, domhandler_1$1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
		while (current) {
			aParents.unshift(current);
			current = current.parent;
		}
		current = (0, domhandler_1$1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
		while (current) {
			bParents.unshift(current);
			current = current.parent;
		}
		var maxIdx = Math.min(aParents.length, bParents.length);
		var idx = 0;
		while (idx < maxIdx && aParents[idx] === bParents[idx]) idx++;
		if (idx === 0) return DocumentPosition.DISCONNECTED;
		var sharedParent = aParents[idx - 1];
		var siblings = sharedParent.children;
		var aSibling = aParents[idx];
		var bSibling = bParents[idx];
		if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
			if (sharedParent === nodeB) return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
			return DocumentPosition.FOLLOWING;
		}
		if (sharedParent === nodeA) return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
		return DocumentPosition.PRECEDING;
	}
	function uniqueSort(nodes) {
		nodes = nodes.filter(function(node, i$1, arr) {
			return !arr.includes(node, i$1 + 1);
		});
		nodes.sort(function(a, b) {
			var relative = compareDocumentPosition(a, b);
			if (relative & DocumentPosition.PRECEDING) return -1;
			else if (relative & DocumentPosition.FOLLOWING) return 1;
			return 0;
		});
		return nodes;
	}
}));
var require_feeds = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getFeed = getFeed;
	var stringify_js_1 = require_stringify();
	var legacy_js_1 = require_legacy();
	function getFeed(doc) {
		var feedRoot = getOneElement(isValidFeed, doc);
		return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
	}
	function getAtomFeed(feedRoot) {
		var _a$1;
		var childs = feedRoot.children;
		var feed = {
			type: "atom",
			items: (0, legacy_js_1.getElementsByTagName)("entry", childs).map(function(item) {
				var _a$2;
				var children = item.children;
				var entry = { media: getMediaElements(children) };
				addConditionally(entry, "id", "id", children);
				addConditionally(entry, "title", "title", children);
				var href$1 = (_a$2 = getOneElement("link", children)) === null || _a$2 === void 0 ? void 0 : _a$2.attribs["href"];
				if (href$1) entry.link = href$1;
				var description$1 = fetch("summary", children) || fetch("content", children);
				if (description$1) entry.description = description$1;
				var pubDate = fetch("updated", children);
				if (pubDate) entry.pubDate = new Date(pubDate);
				return entry;
			})
		};
		addConditionally(feed, "id", "id", childs);
		addConditionally(feed, "title", "title", childs);
		var href = (_a$1 = getOneElement("link", childs)) === null || _a$1 === void 0 ? void 0 : _a$1.attribs["href"];
		if (href) feed.link = href;
		addConditionally(feed, "description", "subtitle", childs);
		var updated = fetch("updated", childs);
		if (updated) feed.updated = new Date(updated);
		addConditionally(feed, "author", "email", childs, true);
		return feed;
	}
	function getRssFeed(feedRoot) {
		var _a$1, _b;
		var childs = (_b = (_a$1 = getOneElement("channel", feedRoot.children)) === null || _a$1 === void 0 ? void 0 : _a$1.children) !== null && _b !== void 0 ? _b : [];
		var feed = {
			type: feedRoot.name.substr(0, 3),
			id: "",
			items: (0, legacy_js_1.getElementsByTagName)("item", feedRoot.children).map(function(item) {
				var children = item.children;
				var entry = { media: getMediaElements(children) };
				addConditionally(entry, "id", "guid", children);
				addConditionally(entry, "title", "title", children);
				addConditionally(entry, "link", "link", children);
				addConditionally(entry, "description", "description", children);
				var pubDate = fetch("pubDate", children) || fetch("dc:date", children);
				if (pubDate) entry.pubDate = new Date(pubDate);
				return entry;
			})
		};
		addConditionally(feed, "title", "title", childs);
		addConditionally(feed, "link", "link", childs);
		addConditionally(feed, "description", "description", childs);
		var updated = fetch("lastBuildDate", childs);
		if (updated) feed.updated = new Date(updated);
		addConditionally(feed, "author", "managingEditor", childs, true);
		return feed;
	}
	var MEDIA_KEYS_STRING = [
		"url",
		"type",
		"lang"
	];
	var MEDIA_KEYS_INT = [
		"fileSize",
		"bitrate",
		"framerate",
		"samplingrate",
		"channels",
		"duration",
		"height",
		"width"
	];
	function getMediaElements(where) {
		return (0, legacy_js_1.getElementsByTagName)("media:content", where).map(function(elem) {
			var attribs = elem.attribs;
			var media = {
				medium: attribs["medium"],
				isDefault: !!attribs["isDefault"]
			};
			for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING; _i < MEDIA_KEYS_STRING_1.length; _i++) {
				var attrib = MEDIA_KEYS_STRING_1[_i];
				if (attribs[attrib]) media[attrib] = attribs[attrib];
			}
			for (var _a$1 = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT; _a$1 < MEDIA_KEYS_INT_1.length; _a$1++) {
				var attrib = MEDIA_KEYS_INT_1[_a$1];
				if (attribs[attrib]) media[attrib] = parseInt(attribs[attrib], 10);
			}
			if (attribs["expression"]) media.expression = attribs["expression"];
			return media;
		});
	}
	function getOneElement(tagName, node) {
		return (0, legacy_js_1.getElementsByTagName)(tagName, node, true, 1)[0];
	}
	function fetch(tagName, where, recurse) {
		if (recurse === void 0) recurse = false;
		return (0, stringify_js_1.textContent)((0, legacy_js_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
	}
	function addConditionally(obj, prop, tagName, where, recurse) {
		if (recurse === void 0) recurse = false;
		var val = fetch(tagName, where, recurse);
		if (val) obj[prop] = val;
	}
	function isValidFeed(value) {
		return value === "rss" || value === "feed" || value === "rdf:RDF";
	}
}));
var require_lib$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$2 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$2(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.hasChildren = exports.isDocument = exports.isComment = exports.isText = exports.isCDATA = exports.isTag = void 0;
	__exportStar(require_stringify(), exports);
	__exportStar(require_traversal(), exports);
	__exportStar(require_manipulation(), exports);
	__exportStar(require_querying(), exports);
	__exportStar(require_legacy(), exports);
	__exportStar(require_helpers(), exports);
	__exportStar(require_feeds(), exports);
	var domhandler_1 = require_lib$5();
	Object.defineProperty(exports, "isTag", {
		enumerable: true,
		get: function() {
			return domhandler_1.isTag;
		}
	});
	Object.defineProperty(exports, "isCDATA", {
		enumerable: true,
		get: function() {
			return domhandler_1.isCDATA;
		}
	});
	Object.defineProperty(exports, "isText", {
		enumerable: true,
		get: function() {
			return domhandler_1.isText;
		}
	});
	Object.defineProperty(exports, "isComment", {
		enumerable: true,
		get: function() {
			return domhandler_1.isComment;
		}
	});
	Object.defineProperty(exports, "isDocument", {
		enumerable: true,
		get: function() {
			return domhandler_1.isDocument;
		}
	});
	Object.defineProperty(exports, "hasChildren", {
		enumerable: true,
		get: function() {
			return domhandler_1.hasChildren;
		}
	});
}));
var require_boolbase = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		trueFunc: function trueFunc() {
			return true;
		},
		falseFunc: function falseFunc() {
			return false;
		}
	};
}));
var SelectorType, IgnoreCaseMode, AttributeAction;
var init_types = __esmMin((() => {
	(function(SelectorType$1) {
		SelectorType$1["Attribute"] = "attribute";
		SelectorType$1["Pseudo"] = "pseudo";
		SelectorType$1["PseudoElement"] = "pseudo-element";
		SelectorType$1["Tag"] = "tag";
		SelectorType$1["Universal"] = "universal";
		SelectorType$1["Adjacent"] = "adjacent";
		SelectorType$1["Child"] = "child";
		SelectorType$1["Descendant"] = "descendant";
		SelectorType$1["Parent"] = "parent";
		SelectorType$1["Sibling"] = "sibling";
		SelectorType$1["ColumnCombinator"] = "column-combinator";
	})(SelectorType || (SelectorType = {}));
	IgnoreCaseMode = {
		Unknown: null,
		QuirksMode: "quirks",
		IgnoreCase: true,
		CaseSensitive: false
	};
	(function(AttributeAction$1) {
		AttributeAction$1["Any"] = "any";
		AttributeAction$1["Element"] = "element";
		AttributeAction$1["End"] = "end";
		AttributeAction$1["Equals"] = "equals";
		AttributeAction$1["Exists"] = "exists";
		AttributeAction$1["Hyphen"] = "hyphen";
		AttributeAction$1["Not"] = "not";
		AttributeAction$1["Start"] = "start";
	})(AttributeAction || (AttributeAction = {}));
}));
function isTraversal$1(selector) {
	switch (selector.type) {
		case SelectorType.Adjacent:
		case SelectorType.Child:
		case SelectorType.Descendant:
		case SelectorType.Parent:
		case SelectorType.Sibling:
		case SelectorType.ColumnCombinator: return true;
		default: return false;
	}
}
function funescape(_, escaped, escapedWhitespace) {
	const high = parseInt(escaped, 16) - 65536;
	return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
}
function unescapeCSS(str) {
	return str.replace(reEscape, funescape);
}
function isQuote(c) {
	return c === 39 || c === 34;
}
function isWhitespace(c) {
	return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
}
function parse$4(selector) {
	const subselects = [];
	const endIndex = parseSelector(subselects, `${selector}`, 0);
	if (endIndex < selector.length) throw new Error(`Unmatched selector: ${selector.slice(endIndex)}`);
	return subselects;
}
function parseSelector(subselects, selector, selectorIndex) {
	let tokens = [];
	function getName$2(offset) {
		const match = selector.slice(selectorIndex + offset).match(reName);
		if (!match) throw new Error(`Expected name, found ${selector.slice(selectorIndex)}`);
		const [name$1] = match;
		selectorIndex += offset + name$1.length;
		return unescapeCSS(name$1);
	}
	function stripWhitespace(offset) {
		selectorIndex += offset;
		while (selectorIndex < selector.length && isWhitespace(selector.charCodeAt(selectorIndex))) selectorIndex++;
	}
	function readValueWithParenthesis() {
		selectorIndex += 1;
		const start = selectorIndex;
		let counter = 1;
		for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) counter++;
		else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) counter--;
		if (counter) throw new Error("Parenthesis not matched");
		return unescapeCSS(selector.slice(start, selectorIndex - 1));
	}
	function isEscaped(pos) {
		let slashCount = 0;
		while (selector.charCodeAt(--pos) === 92) slashCount++;
		return (slashCount & 1) === 1;
	}
	function ensureNotTraversal() {
		if (tokens.length > 0 && isTraversal$1(tokens[tokens.length - 1])) throw new Error("Did not expect successive traversals.");
	}
	function addTraversal(type$1) {
		if (tokens.length > 0 && tokens[tokens.length - 1].type === SelectorType.Descendant) {
			tokens[tokens.length - 1].type = type$1;
			return;
		}
		ensureNotTraversal();
		tokens.push({ type: type$1 });
	}
	function addSpecialAttribute(name$1, action) {
		tokens.push({
			type: SelectorType.Attribute,
			name: name$1,
			action,
			value: getName$2(1),
			namespace: null,
			ignoreCase: "quirks"
		});
	}
	function finalizeSubselector() {
		if (tokens.length && tokens[tokens.length - 1].type === SelectorType.Descendant) tokens.pop();
		if (tokens.length === 0) throw new Error("Empty sub-selector");
		subselects.push(tokens);
	}
	stripWhitespace(0);
	if (selector.length === selectorIndex) return selectorIndex;
	loop: while (selectorIndex < selector.length) {
		const firstChar = selector.charCodeAt(selectorIndex);
		switch (firstChar) {
			case 32:
			case 9:
			case 10:
			case 12:
			case 13:
				if (tokens.length === 0 || tokens[0].type !== SelectorType.Descendant) {
					ensureNotTraversal();
					tokens.push({ type: SelectorType.Descendant });
				}
				stripWhitespace(1);
				break;
			case 62:
				addTraversal(SelectorType.Child);
				stripWhitespace(1);
				break;
			case 60:
				addTraversal(SelectorType.Parent);
				stripWhitespace(1);
				break;
			case 126:
				addTraversal(SelectorType.Sibling);
				stripWhitespace(1);
				break;
			case 43:
				addTraversal(SelectorType.Adjacent);
				stripWhitespace(1);
				break;
			case 46:
				addSpecialAttribute("class", AttributeAction.Element);
				break;
			case 35:
				addSpecialAttribute("id", AttributeAction.Equals);
				break;
			case 91: {
				stripWhitespace(1);
				let name$1;
				let namespace = null;
				if (selector.charCodeAt(selectorIndex) === 124) name$1 = getName$2(1);
				else if (selector.startsWith("*|", selectorIndex)) {
					namespace = "*";
					name$1 = getName$2(2);
				} else {
					name$1 = getName$2(0);
					if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
						namespace = name$1;
						name$1 = getName$2(1);
					}
				}
				stripWhitespace(0);
				let action = AttributeAction.Exists;
				const possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
				if (possibleAction) {
					action = possibleAction;
					if (selector.charCodeAt(selectorIndex + 1) !== 61) throw new Error("Expected `=`");
					stripWhitespace(2);
				} else if (selector.charCodeAt(selectorIndex) === 61) {
					action = AttributeAction.Equals;
					stripWhitespace(1);
				}
				let value = "";
				let ignoreCase = null;
				if (action !== "exists") {
					if (isQuote(selector.charCodeAt(selectorIndex))) {
						const quote = selector.charCodeAt(selectorIndex);
						let sectionEnd = selectorIndex + 1;
						while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) sectionEnd += 1;
						if (selector.charCodeAt(sectionEnd) !== quote) throw new Error("Attribute value didn't end");
						value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
						selectorIndex = sectionEnd + 1;
					} else {
						const valueStart = selectorIndex;
						while (selectorIndex < selector.length && (!isWhitespace(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) selectorIndex += 1;
						value = unescapeCSS(selector.slice(valueStart, selectorIndex));
					}
					stripWhitespace(0);
					const forceIgnore = selector.charCodeAt(selectorIndex) | 32;
					if (forceIgnore === 115) {
						ignoreCase = false;
						stripWhitespace(1);
					} else if (forceIgnore === 105) {
						ignoreCase = true;
						stripWhitespace(1);
					}
				}
				if (selector.charCodeAt(selectorIndex) !== 93) throw new Error("Attribute selector didn't terminate");
				selectorIndex += 1;
				const attributeSelector = {
					type: SelectorType.Attribute,
					name: name$1,
					action,
					value,
					namespace,
					ignoreCase
				};
				tokens.push(attributeSelector);
				break;
			}
			case 58: {
				if (selector.charCodeAt(selectorIndex + 1) === 58) {
					tokens.push({
						type: SelectorType.PseudoElement,
						name: getName$2(2).toLowerCase(),
						data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
					});
					continue;
				}
				const name$1 = getName$2(1).toLowerCase();
				let data = null;
				if (selector.charCodeAt(selectorIndex) === 40) if (unpackPseudos.has(name$1)) {
					if (isQuote(selector.charCodeAt(selectorIndex + 1))) throw new Error(`Pseudo-selector ${name$1} cannot be quoted`);
					data = [];
					selectorIndex = parseSelector(data, selector, selectorIndex + 1);
					if (selector.charCodeAt(selectorIndex) !== 41) throw new Error(`Missing closing parenthesis in :${name$1} (${selector})`);
					selectorIndex += 1;
				} else {
					data = readValueWithParenthesis();
					if (stripQuotesFromPseudos.has(name$1)) {
						const quot = data.charCodeAt(0);
						if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) data = data.slice(1, -1);
					}
					data = unescapeCSS(data);
				}
				tokens.push({
					type: SelectorType.Pseudo,
					name: name$1,
					data
				});
				break;
			}
			case 44:
				finalizeSubselector();
				tokens = [];
				stripWhitespace(1);
				break;
			default: {
				if (selector.startsWith("/*", selectorIndex)) {
					const endIndex = selector.indexOf("*/", selectorIndex + 2);
					if (endIndex < 0) throw new Error("Comment was not terminated");
					selectorIndex = endIndex + 2;
					if (tokens.length === 0) stripWhitespace(0);
					break;
				}
				let namespace = null;
				let name$1;
				if (firstChar === 42) {
					selectorIndex += 1;
					name$1 = "*";
				} else if (firstChar === 124) {
					name$1 = "";
					if (selector.charCodeAt(selectorIndex + 1) === 124) {
						addTraversal(SelectorType.ColumnCombinator);
						stripWhitespace(2);
						break;
					}
				} else if (reName.test(selector.slice(selectorIndex))) name$1 = getName$2(0);
				else break loop;
				if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
					namespace = name$1;
					if (selector.charCodeAt(selectorIndex + 1) === 42) {
						name$1 = "*";
						selectorIndex += 2;
					} else name$1 = getName$2(1);
				}
				tokens.push(name$1 === "*" ? {
					type: SelectorType.Universal,
					namespace
				} : {
					type: SelectorType.Tag,
					name: name$1,
					namespace
				});
			}
		}
	}
	finalizeSubselector();
	return selectorIndex;
}
var reName, reEscape, actionTypes, unpackPseudos, stripQuotesFromPseudos;
var init_parse = __esmMin((() => {
	init_types();
	reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
	reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
	actionTypes = new Map([
		[126, AttributeAction.Element],
		[94, AttributeAction.Start],
		[36, AttributeAction.End],
		[42, AttributeAction.Any],
		[33, AttributeAction.Not],
		[124, AttributeAction.Hyphen]
	]);
	unpackPseudos = new Set([
		"has",
		"not",
		"matches",
		"is",
		"where",
		"host",
		"host-context"
	]);
	stripQuotesFromPseudos = new Set(["contains", "icontains"]);
}));
function stringify(selector) {
	return selector.map((token) => token.map(stringifyToken).join("")).join(", ");
}
function stringifyToken(token, index, arr) {
	switch (token.type) {
		case SelectorType.Child: return index === 0 ? "> " : " > ";
		case SelectorType.Parent: return index === 0 ? "< " : " < ";
		case SelectorType.Sibling: return index === 0 ? "~ " : " ~ ";
		case SelectorType.Adjacent: return index === 0 ? "+ " : " + ";
		case SelectorType.Descendant: return " ";
		case SelectorType.ColumnCombinator: return index === 0 ? "|| " : " || ";
		case SelectorType.Universal: return token.namespace === "*" && index + 1 < arr.length && "name" in arr[index + 1] ? "" : `${getNamespace(token.namespace)}*`;
		case SelectorType.Tag: return getNamespacedName(token);
		case SelectorType.PseudoElement: return `::${escapeName(token.name, charsToEscapeInName)}${token.data === null ? "" : `(${escapeName(token.data, charsToEscapeInPseudoValue)})`}`;
		case SelectorType.Pseudo: return `:${escapeName(token.name, charsToEscapeInName)}${token.data === null ? "" : `(${typeof token.data === "string" ? escapeName(token.data, charsToEscapeInPseudoValue) : stringify(token.data)})`}`;
		case SelectorType.Attribute: {
			if (token.name === "id" && token.action === AttributeAction.Equals && token.ignoreCase === "quirks" && !token.namespace) return `#${escapeName(token.value, charsToEscapeInName)}`;
			if (token.name === "class" && token.action === AttributeAction.Element && token.ignoreCase === "quirks" && !token.namespace) return `.${escapeName(token.value, charsToEscapeInName)}`;
			const name$1 = getNamespacedName(token);
			if (token.action === AttributeAction.Exists) return `[${name$1}]`;
			return `[${name$1}${getActionValue(token.action)}="${escapeName(token.value, charsToEscapeInAttributeValue)}"${token.ignoreCase === null ? "" : token.ignoreCase ? " i" : " s"}]`;
		}
	}
}
function getActionValue(action) {
	switch (action) {
		case AttributeAction.Equals: return "";
		case AttributeAction.Element: return "~";
		case AttributeAction.Start: return "^";
		case AttributeAction.End: return "$";
		case AttributeAction.Any: return "*";
		case AttributeAction.Not: return "!";
		case AttributeAction.Hyphen: return "|";
		case AttributeAction.Exists: throw new Error("Shouldn't be here");
	}
}
function getNamespacedName(token) {
	return `${getNamespace(token.namespace)}${escapeName(token.name, charsToEscapeInName)}`;
}
function getNamespace(namespace) {
	return namespace !== null ? `${namespace === "*" ? "*" : escapeName(namespace, charsToEscapeInName)}|` : "";
}
function escapeName(str, charsToEscape) {
	let lastIdx = 0;
	let ret = "";
	for (let i$1 = 0; i$1 < str.length; i$1++) if (charsToEscape.has(str.charCodeAt(i$1))) {
		ret += `${str.slice(lastIdx, i$1)}\\${str.charAt(i$1)}`;
		lastIdx = i$1 + 1;
	}
	return ret.length > 0 ? ret + str.slice(lastIdx) : str;
}
var attribValChars, pseudoValChars, charsToEscapeInAttributeValue, charsToEscapeInPseudoValue, charsToEscapeInName;
var init_stringify = __esmMin((() => {
	init_types();
	attribValChars = ["\\", "\""];
	pseudoValChars = [
		...attribValChars,
		"(",
		")"
	];
	charsToEscapeInAttributeValue = new Set(attribValChars.map((c) => c.charCodeAt(0)));
	charsToEscapeInPseudoValue = new Set(pseudoValChars.map((c) => c.charCodeAt(0)));
	charsToEscapeInName = new Set([
		...pseudoValChars,
		"~",
		"^",
		"$",
		"*",
		"+",
		"!",
		"|",
		":",
		"[",
		"]",
		" ",
		"."
	].map((c) => c.charCodeAt(0)));
}));
var es_exports = {};
__export(es_exports, {
	AttributeAction: () => AttributeAction,
	IgnoreCaseMode: () => IgnoreCaseMode,
	SelectorType: () => SelectorType,
	isTraversal: () => isTraversal$1,
	parse: () => parse$4,
	stringify: () => stringify
});
var init_es = __esmMin((() => {
	init_types();
	init_parse();
	init_stringify();
}));
var require_sort = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var css_what_1$3 = (init_es(), __toCommonJS(es_exports));
	var procedure = new Map([
		[css_what_1$3.SelectorType.Universal, 50],
		[css_what_1$3.SelectorType.Tag, 30],
		[css_what_1$3.SelectorType.Attribute, 1],
		[css_what_1$3.SelectorType.Pseudo, 0]
	]);
	function isTraversal(token) {
		return !procedure.has(token.type);
	}
	exports.isTraversal = isTraversal;
	var attributes = new Map([
		[css_what_1$3.AttributeAction.Exists, 10],
		[css_what_1$3.AttributeAction.Equals, 8],
		[css_what_1$3.AttributeAction.Not, 7],
		[css_what_1$3.AttributeAction.Start, 6],
		[css_what_1$3.AttributeAction.End, 6],
		[css_what_1$3.AttributeAction.Any, 5]
	]);
	function sortByProcedure(arr) {
		var procs = arr.map(getProcedure);
		for (var i$1 = 1; i$1 < arr.length; i$1++) {
			var procNew = procs[i$1];
			if (procNew < 0) continue;
			for (var j = i$1 - 1; j >= 0 && procNew < procs[j]; j--) {
				var token = arr[j + 1];
				arr[j + 1] = arr[j];
				arr[j] = token;
				procs[j + 1] = procs[j];
				procs[j] = procNew;
			}
		}
	}
	exports.default = sortByProcedure;
	function getProcedure(token) {
		var _a$1, _b;
		var proc = (_a$1 = procedure.get(token.type)) !== null && _a$1 !== void 0 ? _a$1 : -1;
		if (token.type === css_what_1$3.SelectorType.Attribute) {
			proc = (_b = attributes.get(token.action)) !== null && _b !== void 0 ? _b : 4;
			if (token.action === css_what_1$3.AttributeAction.Equals && token.name === "id") proc = 9;
			if (token.ignoreCase) proc >>= 1;
		} else if (token.type === css_what_1$3.SelectorType.Pseudo) if (!token.data) proc = 3;
		else if (token.name === "has" || token.name === "contains") proc = 0;
		else if (Array.isArray(token.data)) {
			proc = Math.min.apply(Math, token.data.map(function(d) {
				return Math.min.apply(Math, d.map(getProcedure));
			}));
			if (proc < 0) proc = 0;
		} else proc = 2;
		return proc;
	}
}));
var require_attributes = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$9 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var boolbase_1$5 = __importDefault$9(require_boolbase());
	var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
	function escapeRegex(value) {
		return value.replace(reChars, "\\$&");
	}
	var caseInsensitiveAttributes = new Set([
		"accept",
		"accept-charset",
		"align",
		"alink",
		"axis",
		"bgcolor",
		"charset",
		"checked",
		"clear",
		"codetype",
		"color",
		"compact",
		"declare",
		"defer",
		"dir",
		"direction",
		"disabled",
		"enctype",
		"face",
		"frame",
		"hreflang",
		"http-equiv",
		"lang",
		"language",
		"link",
		"media",
		"method",
		"multiple",
		"nohref",
		"noresize",
		"noshade",
		"nowrap",
		"readonly",
		"rel",
		"rev",
		"rules",
		"scope",
		"scrolling",
		"selected",
		"shape",
		"target",
		"text",
		"type",
		"valign",
		"valuetype",
		"vlink"
	]);
	function shouldIgnoreCase(selector, options$1) {
		return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options$1.quirksMode : !options$1.xmlMode && caseInsensitiveAttributes.has(selector.name);
	}
	exports.attributeRules = {
		equals: function(next, data, options$1) {
			var adapter = options$1.adapter;
			var name$1 = data.name;
			var value = data.value;
			if (shouldIgnoreCase(data, options$1)) {
				value = value.toLowerCase();
				return function(elem) {
					var attr = adapter.getAttributeValue(elem, name$1);
					return attr != null && attr.length === value.length && attr.toLowerCase() === value && next(elem);
				};
			}
			return function(elem) {
				return adapter.getAttributeValue(elem, name$1) === value && next(elem);
			};
		},
		hyphen: function(next, data, options$1) {
			var adapter = options$1.adapter;
			var name$1 = data.name;
			var value = data.value;
			var len = value.length;
			if (shouldIgnoreCase(data, options$1)) {
				value = value.toLowerCase();
				return function hyphenIC(elem) {
					var attr = adapter.getAttributeValue(elem, name$1);
					return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len).toLowerCase() === value && next(elem);
				};
			}
			return function hyphen(elem) {
				var attr = adapter.getAttributeValue(elem, name$1);
				return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len) === value && next(elem);
			};
		},
		element: function(next, data, options$1) {
			var adapter = options$1.adapter;
			var name$1 = data.name, value = data.value;
			if (/\s/.test(value)) return boolbase_1$5.default.falseFunc;
			var regex$1 = new RegExp("(?:^|\\s)".concat(escapeRegex(value), "(?:$|\\s)"), shouldIgnoreCase(data, options$1) ? "i" : "");
			return function element(elem) {
				var attr = adapter.getAttributeValue(elem, name$1);
				return attr != null && attr.length >= value.length && regex$1.test(attr) && next(elem);
			};
		},
		exists: function(next, _a$1, _b) {
			var name$1 = _a$1.name;
			var adapter = _b.adapter;
			return function(elem) {
				return adapter.hasAttrib(elem, name$1) && next(elem);
			};
		},
		start: function(next, data, options$1) {
			var adapter = options$1.adapter;
			var name$1 = data.name;
			var value = data.value;
			var len = value.length;
			if (len === 0) return boolbase_1$5.default.falseFunc;
			if (shouldIgnoreCase(data, options$1)) {
				value = value.toLowerCase();
				return function(elem) {
					var attr = adapter.getAttributeValue(elem, name$1);
					return attr != null && attr.length >= len && attr.substr(0, len).toLowerCase() === value && next(elem);
				};
			}
			return function(elem) {
				var _a$1;
				return !!((_a$1 = adapter.getAttributeValue(elem, name$1)) === null || _a$1 === void 0 ? void 0 : _a$1.startsWith(value)) && next(elem);
			};
		},
		end: function(next, data, options$1) {
			var adapter = options$1.adapter;
			var name$1 = data.name;
			var value = data.value;
			var len = -value.length;
			if (len === 0) return boolbase_1$5.default.falseFunc;
			if (shouldIgnoreCase(data, options$1)) {
				value = value.toLowerCase();
				return function(elem) {
					var _a$1;
					return ((_a$1 = adapter.getAttributeValue(elem, name$1)) === null || _a$1 === void 0 ? void 0 : _a$1.substr(len).toLowerCase()) === value && next(elem);
				};
			}
			return function(elem) {
				var _a$1;
				return !!((_a$1 = adapter.getAttributeValue(elem, name$1)) === null || _a$1 === void 0 ? void 0 : _a$1.endsWith(value)) && next(elem);
			};
		},
		any: function(next, data, options$1) {
			var adapter = options$1.adapter;
			var name$1 = data.name, value = data.value;
			if (value === "") return boolbase_1$5.default.falseFunc;
			if (shouldIgnoreCase(data, options$1)) {
				var regex_1 = new RegExp(escapeRegex(value), "i");
				return function anyIC(elem) {
					var attr = adapter.getAttributeValue(elem, name$1);
					return attr != null && attr.length >= value.length && regex_1.test(attr) && next(elem);
				};
			}
			return function(elem) {
				var _a$1;
				return !!((_a$1 = adapter.getAttributeValue(elem, name$1)) === null || _a$1 === void 0 ? void 0 : _a$1.includes(value)) && next(elem);
			};
		},
		not: function(next, data, options$1) {
			var adapter = options$1.adapter;
			var name$1 = data.name;
			var value = data.value;
			if (value === "") return function(elem) {
				return !!adapter.getAttributeValue(elem, name$1) && next(elem);
			};
			else if (shouldIgnoreCase(data, options$1)) {
				value = value.toLowerCase();
				return function(elem) {
					var attr = adapter.getAttributeValue(elem, name$1);
					return (attr == null || attr.length !== value.length || attr.toLowerCase() !== value) && next(elem);
				};
			}
			return function(elem) {
				return adapter.getAttributeValue(elem, name$1) !== value && next(elem);
			};
		}
	};
}));
var require_parse$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var whitespace = new Set([
		9,
		10,
		12,
		13,
		32
	]);
	var ZERO = "0".charCodeAt(0);
	"9".charCodeAt(0);
	function parse$3(formula) {
		formula = formula.trim().toLowerCase();
		if (formula === "even") return [2, 0];
		else if (formula === "odd") return [2, 1];
		var idx = 0;
		var a = 0;
		var sign = readSign();
		var number = readNumber();
		if (idx < formula.length && formula.charAt(idx) === "n") {
			idx++;
			a = sign * (number !== null && number !== void 0 ? number : 1);
			skipWhitespace();
			if (idx < formula.length) {
				sign = readSign();
				skipWhitespace();
				number = readNumber();
			} else sign = number = 0;
		}
		if (number === null || idx < formula.length) throw new Error("n-th rule couldn't be parsed ('".concat(formula, "')"));
		return [a, sign * number];
		function readSign() {
			if (formula.charAt(idx) === "-") {
				idx++;
				return -1;
			}
			if (formula.charAt(idx) === "+") idx++;
			return 1;
		}
		function readNumber() {
			var start = idx;
			var value = 0;
			while (idx < formula.length && formula.charCodeAt(idx) >= 48 && formula.charCodeAt(idx) <= 57) {
				value = value * 10 + (formula.charCodeAt(idx) - ZERO);
				idx++;
			}
			return idx === start ? null : value;
		}
		function skipWhitespace() {
			while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) idx++;
		}
	}
	exports.parse = parse$3;
}));
var require_compile$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$8 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var boolbase_1$4 = __importDefault$8(require_boolbase());
	function compile$1(parsed) {
		var a = parsed[0];
		var b = parsed[1] - 1;
		if (b < 0 && a <= 0) return boolbase_1$4.default.falseFunc;
		if (a === -1) return function(index) {
			return index <= b;
		};
		if (a === 0) return function(index) {
			return index === b;
		};
		if (a === 1) return b < 0 ? boolbase_1$4.default.trueFunc : function(index) {
			return index >= b;
		};
		var absA = Math.abs(a);
		var bMod = (b % absA + absA) % absA;
		return a > 1 ? function(index) {
			return index >= b && index % absA === bMod;
		} : function(index) {
			return index <= b && index % absA === bMod;
		};
	}
	exports.compile = compile$1;
	function generate(parsed) {
		var a = parsed[0];
		var b = parsed[1] - 1;
		var n = 0;
		if (a < 0) {
			var aPos_1 = -a;
			var minValue_1 = (b % aPos_1 + aPos_1) % aPos_1;
			return function() {
				var val = minValue_1 + aPos_1 * n++;
				return val > b ? null : val;
			};
		}
		if (a === 0) return b < 0 ? function() {
			return null;
		} : function() {
			return n++ === 0 ? b : null;
		};
		if (b < 0) b += a * Math.ceil(-b / a);
		return function() {
			return a * n++ + b;
		};
	}
	exports.generate = generate;
}));
var require_lib$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sequence = exports.generate = exports.compile = exports.parse = void 0;
	var parse_js_1 = require_parse$1();
	Object.defineProperty(exports, "parse", {
		enumerable: true,
		get: function() {
			return parse_js_1.parse;
		}
	});
	var compile_js_1$1 = require_compile$1();
	Object.defineProperty(exports, "compile", {
		enumerable: true,
		get: function() {
			return compile_js_1$1.compile;
		}
	});
	Object.defineProperty(exports, "generate", {
		enumerable: true,
		get: function() {
			return compile_js_1$1.generate;
		}
	});
	function nthCheck(formula) {
		return (0, compile_js_1$1.compile)((0, parse_js_1.parse)(formula));
	}
	exports.default = nthCheck;
	function sequence(formula) {
		return (0, compile_js_1$1.generate)((0, parse_js_1.parse)(formula));
	}
	exports.sequence = sequence;
}));
var require_filters = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$7 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var nth_check_1 = __importDefault$7(require_lib$1());
	var boolbase_1$3 = __importDefault$7(require_boolbase());
	function getChildFunc(next, adapter) {
		return function(elem) {
			var parent = adapter.getParent(elem);
			return parent != null && adapter.isTag(parent) && next(elem);
		};
	}
	exports.filters = {
		contains: function(next, text, _a$1) {
			var adapter = _a$1.adapter;
			return function contains(elem) {
				return next(elem) && adapter.getText(elem).includes(text);
			};
		},
		icontains: function(next, text, _a$1) {
			var adapter = _a$1.adapter;
			var itext = text.toLowerCase();
			return function icontains(elem) {
				return next(elem) && adapter.getText(elem).toLowerCase().includes(itext);
			};
		},
		"nth-child": function(next, rule, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var func = (0, nth_check_1.default)(rule);
			if (func === boolbase_1$3.default.falseFunc) return boolbase_1$3.default.falseFunc;
			if (func === boolbase_1$3.default.trueFunc) return getChildFunc(next, adapter);
			return function nthChild(elem) {
				var siblings = adapter.getSiblings(elem);
				var pos = 0;
				for (var i$1 = 0; i$1 < siblings.length; i$1++) {
					if (equals$1(elem, siblings[i$1])) break;
					if (adapter.isTag(siblings[i$1])) pos++;
				}
				return func(pos) && next(elem);
			};
		},
		"nth-last-child": function(next, rule, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var func = (0, nth_check_1.default)(rule);
			if (func === boolbase_1$3.default.falseFunc) return boolbase_1$3.default.falseFunc;
			if (func === boolbase_1$3.default.trueFunc) return getChildFunc(next, adapter);
			return function nthLastChild(elem) {
				var siblings = adapter.getSiblings(elem);
				var pos = 0;
				for (var i$1 = siblings.length - 1; i$1 >= 0; i$1--) {
					if (equals$1(elem, siblings[i$1])) break;
					if (adapter.isTag(siblings[i$1])) pos++;
				}
				return func(pos) && next(elem);
			};
		},
		"nth-of-type": function(next, rule, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var func = (0, nth_check_1.default)(rule);
			if (func === boolbase_1$3.default.falseFunc) return boolbase_1$3.default.falseFunc;
			if (func === boolbase_1$3.default.trueFunc) return getChildFunc(next, adapter);
			return function nthOfType(elem) {
				var siblings = adapter.getSiblings(elem);
				var pos = 0;
				for (var i$1 = 0; i$1 < siblings.length; i$1++) {
					var currentSibling = siblings[i$1];
					if (equals$1(elem, currentSibling)) break;
					if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) pos++;
				}
				return func(pos) && next(elem);
			};
		},
		"nth-last-of-type": function(next, rule, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var func = (0, nth_check_1.default)(rule);
			if (func === boolbase_1$3.default.falseFunc) return boolbase_1$3.default.falseFunc;
			if (func === boolbase_1$3.default.trueFunc) return getChildFunc(next, adapter);
			return function nthLastOfType(elem) {
				var siblings = adapter.getSiblings(elem);
				var pos = 0;
				for (var i$1 = siblings.length - 1; i$1 >= 0; i$1--) {
					var currentSibling = siblings[i$1];
					if (equals$1(elem, currentSibling)) break;
					if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) pos++;
				}
				return func(pos) && next(elem);
			};
		},
		root: function(next, _rule, _a$1) {
			var adapter = _a$1.adapter;
			return function(elem) {
				var parent = adapter.getParent(elem);
				return (parent == null || !adapter.isTag(parent)) && next(elem);
			};
		},
		scope: function(next, rule, options$1, context) {
			var equals$1 = options$1.equals;
			if (!context || context.length === 0) return exports.filters["root"](next, rule, options$1);
			if (context.length === 1) return function(elem) {
				return equals$1(context[0], elem) && next(elem);
			};
			return function(elem) {
				return context.includes(elem) && next(elem);
			};
		},
		hover: dynamicStatePseudo("isHovered"),
		visited: dynamicStatePseudo("isVisited"),
		active: dynamicStatePseudo("isActive")
	};
	function dynamicStatePseudo(name$1) {
		return function dynamicPseudo(next, _rule, _a$1) {
			var func = _a$1.adapter[name$1];
			if (typeof func !== "function") return boolbase_1$3.default.falseFunc;
			return function active(elem) {
				return func(elem) && next(elem);
			};
		};
	}
}));
var require_pseudos = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.pseudos = {
		empty: function(elem, _a$1) {
			var adapter = _a$1.adapter;
			return !adapter.getChildren(elem).some(function(elem$1) {
				return adapter.isTag(elem$1) || adapter.getText(elem$1) !== "";
			});
		},
		"first-child": function(elem, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			if (adapter.prevElementSibling) return adapter.prevElementSibling(elem) == null;
			var firstChild = adapter.getSiblings(elem).find(function(elem$1) {
				return adapter.isTag(elem$1);
			});
			return firstChild != null && equals$1(elem, firstChild);
		},
		"last-child": function(elem, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var siblings = adapter.getSiblings(elem);
			for (var i$1 = siblings.length - 1; i$1 >= 0; i$1--) {
				if (equals$1(elem, siblings[i$1])) return true;
				if (adapter.isTag(siblings[i$1])) break;
			}
			return false;
		},
		"first-of-type": function(elem, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var siblings = adapter.getSiblings(elem);
			var elemName = adapter.getName(elem);
			for (var i$1 = 0; i$1 < siblings.length; i$1++) {
				var currentSibling = siblings[i$1];
				if (equals$1(elem, currentSibling)) return true;
				if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) break;
			}
			return false;
		},
		"last-of-type": function(elem, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var siblings = adapter.getSiblings(elem);
			var elemName = adapter.getName(elem);
			for (var i$1 = siblings.length - 1; i$1 >= 0; i$1--) {
				var currentSibling = siblings[i$1];
				if (equals$1(elem, currentSibling)) return true;
				if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) break;
			}
			return false;
		},
		"only-of-type": function(elem, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			var elemName = adapter.getName(elem);
			return adapter.getSiblings(elem).every(function(sibling) {
				return equals$1(elem, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elemName;
			});
		},
		"only-child": function(elem, _a$1) {
			var adapter = _a$1.adapter, equals$1 = _a$1.equals;
			return adapter.getSiblings(elem).every(function(sibling) {
				return equals$1(elem, sibling) || !adapter.isTag(sibling);
			});
		}
	};
	function verifyPseudoArgs(func, name$1, subselect, argIndex) {
		if (subselect === null) {
			if (func.length > argIndex) throw new Error("Pseudo-class :".concat(name$1, " requires an argument"));
		} else if (func.length === argIndex) throw new Error("Pseudo-class :".concat(name$1, " doesn't have any arguments"));
	}
	exports.verifyPseudoArgs = verifyPseudoArgs;
}));
var require_aliases = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.aliases = {
		"any-link": ":is(a, area, link)[href]",
		link: ":any-link:not(:visited)",
		disabled: ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
		enabled: ":not(:disabled)",
		checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
		required: ":is(input, select, textarea)[required]",
		optional: ":is(input, select, textarea):not([required])",
		selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
		checkbox: "[type=checkbox]",
		file: "[type=file]",
		password: "[type=password]",
		radio: "[type=radio]",
		reset: "[type=reset]",
		image: "[type=image]",
		submit: "[type=submit]",
		parent: ":not(:empty)",
		header: ":is(h1, h2, h3, h4, h5, h6)",
		button: ":is(button, input[type=button])",
		input: ":is(input, textarea, select, button)",
		text: "input:is(:not([type!='']), [type=text])"
	};
}));
var require_subselects = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
		if (pack || arguments.length === 2) {
			for (var i$1 = 0, l = from.length, ar; i$1 < l; i$1++) if (ar || !(i$1 in from)) {
				if (!ar) ar = Array.prototype.slice.call(from, 0, i$1);
				ar[i$1] = from[i$1];
			}
		}
		return to.concat(ar || Array.prototype.slice.call(from));
	};
	var __importDefault$6 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var boolbase_1$2 = __importDefault$6(require_boolbase());
	var sort_js_1$1 = require_sort();
	exports.PLACEHOLDER_ELEMENT = {};
	function ensureIsTag(next, adapter) {
		if (next === boolbase_1$2.default.falseFunc) return boolbase_1$2.default.falseFunc;
		return function(elem) {
			return adapter.isTag(elem) && next(elem);
		};
	}
	exports.ensureIsTag = ensureIsTag;
	function getNextSiblings(elem, adapter) {
		var siblings = adapter.getSiblings(elem);
		if (siblings.length <= 1) return [];
		var elemIndex = siblings.indexOf(elem);
		if (elemIndex < 0 || elemIndex === siblings.length - 1) return [];
		return siblings.slice(elemIndex + 1).filter(adapter.isTag);
	}
	exports.getNextSiblings = getNextSiblings;
	function copyOptions(options$1) {
		return {
			xmlMode: !!options$1.xmlMode,
			lowerCaseAttributeNames: !!options$1.lowerCaseAttributeNames,
			lowerCaseTags: !!options$1.lowerCaseTags,
			quirksMode: !!options$1.quirksMode,
			cacheResults: !!options$1.cacheResults,
			pseudos: options$1.pseudos,
			adapter: options$1.adapter,
			equals: options$1.equals
		};
	}
	var is$3 = function(next, token, options$1, context, compileToken$1) {
		var func = compileToken$1(token, copyOptions(options$1), context);
		return func === boolbase_1$2.default.trueFunc ? next : func === boolbase_1$2.default.falseFunc ? boolbase_1$2.default.falseFunc : function(elem) {
			return func(elem) && next(elem);
		};
	};
	exports.subselects = {
		is: is$3,
		matches: is$3,
		where: is$3,
		not: function(next, token, options$1, context, compileToken$1) {
			var func = compileToken$1(token, copyOptions(options$1), context);
			return func === boolbase_1$2.default.falseFunc ? next : func === boolbase_1$2.default.trueFunc ? boolbase_1$2.default.falseFunc : function(elem) {
				return !func(elem) && next(elem);
			};
		},
		has: function(next, subselect, options$1, _context, compileToken$1) {
			var adapter = options$1.adapter;
			var opts = copyOptions(options$1);
			opts.relativeSelector = true;
			var context = subselect.some(function(s) {
				return s.some(sort_js_1$1.isTraversal);
			}) ? [exports.PLACEHOLDER_ELEMENT] : void 0;
			var compiled = compileToken$1(subselect, opts, context);
			if (compiled === boolbase_1$2.default.falseFunc) return boolbase_1$2.default.falseFunc;
			var hasElement = ensureIsTag(compiled, adapter);
			if (context && compiled !== boolbase_1$2.default.trueFunc) {
				var _a$1 = compiled.shouldTestNextSiblings, shouldTestNextSiblings_1 = _a$1 === void 0 ? false : _a$1;
				return function(elem) {
					if (!next(elem)) return false;
					context[0] = elem;
					var childs = adapter.getChildren(elem);
					var nextElements = shouldTestNextSiblings_1 ? __spreadArray(__spreadArray([], childs, true), getNextSiblings(elem, adapter), true) : childs;
					return adapter.existsOne(hasElement, nextElements);
				};
			}
			return function(elem) {
				return next(elem) && adapter.existsOne(hasElement, adapter.getChildren(elem));
			};
		}
	};
}));
var require_pseudo_selectors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.compilePseudoSelector = exports.aliases = exports.pseudos = exports.filters = void 0;
	var css_what_1$2 = (init_es(), __toCommonJS(es_exports));
	var filters_js_1 = require_filters();
	Object.defineProperty(exports, "filters", {
		enumerable: true,
		get: function() {
			return filters_js_1.filters;
		}
	});
	var pseudos_js_1 = require_pseudos();
	Object.defineProperty(exports, "pseudos", {
		enumerable: true,
		get: function() {
			return pseudos_js_1.pseudos;
		}
	});
	var aliases_js_1 = require_aliases();
	Object.defineProperty(exports, "aliases", {
		enumerable: true,
		get: function() {
			return aliases_js_1.aliases;
		}
	});
	var subselects_js_1$2 = require_subselects();
	function compilePseudoSelector(next, selector, options$1, context, compileToken$1) {
		var _a$1;
		var name$1 = selector.name, data = selector.data;
		if (Array.isArray(data)) {
			if (!(name$1 in subselects_js_1$2.subselects)) throw new Error("Unknown pseudo-class :".concat(name$1, "(").concat(data, ")"));
			return subselects_js_1$2.subselects[name$1](next, data, options$1, context, compileToken$1);
		}
		var userPseudo = (_a$1 = options$1.pseudos) === null || _a$1 === void 0 ? void 0 : _a$1[name$1];
		var stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases_js_1.aliases[name$1];
		if (typeof stringPseudo === "string") {
			if (data != null) throw new Error("Pseudo ".concat(name$1, " doesn't have any arguments"));
			var alias = (0, css_what_1$2.parse)(stringPseudo);
			return subselects_js_1$2.subselects["is"](next, alias, options$1, context, compileToken$1);
		}
		if (typeof userPseudo === "function") {
			(0, pseudos_js_1.verifyPseudoArgs)(userPseudo, name$1, data, 1);
			return function(elem) {
				return userPseudo(elem, data) && next(elem);
			};
		}
		if (name$1 in filters_js_1.filters) return filters_js_1.filters[name$1](next, data, options$1, context);
		if (name$1 in pseudos_js_1.pseudos) {
			var pseudo_1 = pseudos_js_1.pseudos[name$1];
			(0, pseudos_js_1.verifyPseudoArgs)(pseudo_1, name$1, data, 2);
			return function(elem) {
				return pseudo_1(elem, options$1, data) && next(elem);
			};
		}
		throw new Error("Unknown pseudo-class :".concat(name$1));
	}
	exports.compilePseudoSelector = compilePseudoSelector;
}));
var require_general = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var attributes_js_1 = require_attributes();
	var index_js_1$1 = require_pseudo_selectors();
	var css_what_1$1 = (init_es(), __toCommonJS(es_exports));
	function getElementParent(node, adapter) {
		var parent = adapter.getParent(node);
		if (parent && adapter.isTag(parent)) return parent;
		return null;
	}
	function compileGeneralSelector(next, selector, options$1, context, compileToken$1) {
		var adapter = options$1.adapter, equals$1 = options$1.equals;
		switch (selector.type) {
			case css_what_1$1.SelectorType.PseudoElement: throw new Error("Pseudo-elements are not supported by css-select");
			case css_what_1$1.SelectorType.ColumnCombinator: throw new Error("Column combinators are not yet supported by css-select");
			case css_what_1$1.SelectorType.Attribute:
				if (selector.namespace != null) throw new Error("Namespaced attributes are not yet supported by css-select");
				if (!options$1.xmlMode || options$1.lowerCaseAttributeNames) selector.name = selector.name.toLowerCase();
				return attributes_js_1.attributeRules[selector.action](next, selector, options$1);
			case css_what_1$1.SelectorType.Pseudo: return (0, index_js_1$1.compilePseudoSelector)(next, selector, options$1, context, compileToken$1);
			case css_what_1$1.SelectorType.Tag:
				if (selector.namespace != null) throw new Error("Namespaced tag names are not yet supported by css-select");
				var name_1 = selector.name;
				if (!options$1.xmlMode || options$1.lowerCaseTags) name_1 = name_1.toLowerCase();
				return function tag(elem) {
					return adapter.getName(elem) === name_1 && next(elem);
				};
			case css_what_1$1.SelectorType.Descendant:
				if (options$1.cacheResults === false || typeof WeakSet === "undefined") return function descendant(elem) {
					var current = elem;
					while (current = getElementParent(current, adapter)) if (next(current)) return true;
					return false;
				};
				var isFalseCache_1 = /* @__PURE__ */ new WeakSet();
				return function cachedDescendant(elem) {
					var current = elem;
					while (current = getElementParent(current, adapter)) if (!isFalseCache_1.has(current)) {
						if (adapter.isTag(current) && next(current)) return true;
						isFalseCache_1.add(current);
					}
					return false;
				};
			case "_flexibleDescendant": return function flexibleDescendant(elem) {
				var current = elem;
				do
					if (next(current)) return true;
				while (current = getElementParent(current, adapter));
				return false;
			};
			case css_what_1$1.SelectorType.Parent: return function parent(elem) {
				return adapter.getChildren(elem).some(function(elem$1) {
					return adapter.isTag(elem$1) && next(elem$1);
				});
			};
			case css_what_1$1.SelectorType.Child: return function child(elem) {
				var parent = adapter.getParent(elem);
				return parent != null && adapter.isTag(parent) && next(parent);
			};
			case css_what_1$1.SelectorType.Sibling: return function sibling(elem) {
				var siblings = adapter.getSiblings(elem);
				for (var i$1 = 0; i$1 < siblings.length; i$1++) {
					var currentSibling = siblings[i$1];
					if (equals$1(elem, currentSibling)) break;
					if (adapter.isTag(currentSibling) && next(currentSibling)) return true;
				}
				return false;
			};
			case css_what_1$1.SelectorType.Adjacent:
				if (adapter.prevElementSibling) return function adjacent(elem) {
					var previous = adapter.prevElementSibling(elem);
					return previous != null && next(previous);
				};
				return function adjacent(elem) {
					var siblings = adapter.getSiblings(elem);
					var lastElement;
					for (var i$1 = 0; i$1 < siblings.length; i$1++) {
						var currentSibling = siblings[i$1];
						if (equals$1(elem, currentSibling)) break;
						if (adapter.isTag(currentSibling)) lastElement = currentSibling;
					}
					return !!lastElement && next(lastElement);
				};
			case css_what_1$1.SelectorType.Universal:
				if (selector.namespace != null && selector.namespace !== "*") throw new Error("Namespaced universal selectors are not yet supported by css-select");
				return next;
		}
	}
	exports.compileGeneralSelector = compileGeneralSelector;
}));
var require_compile = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$1 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault$1 = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar$1 = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
		}
		__setModuleDefault$1(result, mod);
		return result;
	};
	var __importDefault$5 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var css_what_1 = (init_es(), __toCommonJS(es_exports));
	var boolbase_1$1 = __importDefault$5(require_boolbase());
	var sort_js_1 = __importStar$1(require_sort());
	var general_js_1 = require_general();
	var subselects_js_1$1 = require_subselects();
	function compile(selector, options$1, context) {
		var next = compileUnsafe(selector, options$1, context);
		return (0, subselects_js_1$1.ensureIsTag)(next, options$1.adapter);
	}
	exports.compile = compile;
	function compileUnsafe(selector, options$1, context) {
		var token = typeof selector === "string" ? (0, css_what_1.parse)(selector) : selector;
		return compileToken(token, options$1, context);
	}
	exports.compileUnsafe = compileUnsafe;
	function includesScopePseudo(t$1) {
		return t$1.type === css_what_1.SelectorType.Pseudo && (t$1.name === "scope" || Array.isArray(t$1.data) && t$1.data.some(function(data) {
			return data.some(includesScopePseudo);
		}));
	}
	var DESCENDANT_TOKEN = { type: css_what_1.SelectorType.Descendant };
	var FLEXIBLE_DESCENDANT_TOKEN = { type: "_flexibleDescendant" };
	var SCOPE_TOKEN = {
		type: css_what_1.SelectorType.Pseudo,
		name: "scope",
		data: null
	};
	function absolutize(token, _a$1, context) {
		var adapter = _a$1.adapter;
		var hasContext = !!(context === null || context === void 0 ? void 0 : context.every(function(e) {
			var parent = adapter.isTag(e) && adapter.getParent(e);
			return e === subselects_js_1$1.PLACEHOLDER_ELEMENT || parent && adapter.isTag(parent);
		}));
		for (var _i = 0, token_1 = token; _i < token_1.length; _i++) {
			var t$1 = token_1[_i];
			if (t$1.length > 0 && (0, sort_js_1.isTraversal)(t$1[0]) && t$1[0].type !== css_what_1.SelectorType.Descendant) {} else if (hasContext && !t$1.some(includesScopePseudo)) t$1.unshift(DESCENDANT_TOKEN);
			else continue;
			t$1.unshift(SCOPE_TOKEN);
		}
	}
	function compileToken(token, options$1, context) {
		var _a$1;
		token.forEach(sort_js_1.default);
		context = (_a$1 = options$1.context) !== null && _a$1 !== void 0 ? _a$1 : context;
		var isArrayContext = Array.isArray(context);
		var finalContext = context && (Array.isArray(context) ? context : [context]);
		if (options$1.relativeSelector !== false) absolutize(token, options$1, finalContext);
		else if (token.some(function(t$1) {
			return t$1.length > 0 && (0, sort_js_1.isTraversal)(t$1[0]);
		})) throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
		var shouldTestNextSiblings = false;
		var query = token.map(function(rules) {
			if (rules.length >= 2) {
				var first = rules[0], second = rules[1];
				if (first.type !== css_what_1.SelectorType.Pseudo || first.name !== "scope") {} else if (isArrayContext && second.type === css_what_1.SelectorType.Descendant) rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
				else if (second.type === css_what_1.SelectorType.Adjacent || second.type === css_what_1.SelectorType.Sibling) shouldTestNextSiblings = true;
			}
			return compileRules(rules, options$1, finalContext);
		}).reduce(reduceRules, boolbase_1$1.default.falseFunc);
		query.shouldTestNextSiblings = shouldTestNextSiblings;
		return query;
	}
	exports.compileToken = compileToken;
	function compileRules(rules, options$1, context) {
		var _a$1;
		return rules.reduce(function(previous, rule) {
			return previous === boolbase_1$1.default.falseFunc ? boolbase_1$1.default.falseFunc : (0, general_js_1.compileGeneralSelector)(previous, rule, options$1, context, compileToken);
		}, (_a$1 = options$1.rootFunc) !== null && _a$1 !== void 0 ? _a$1 : boolbase_1$1.default.trueFunc);
	}
	function reduceRules(a, b) {
		if (b === boolbase_1$1.default.falseFunc || a === boolbase_1$1.default.trueFunc) return a;
		if (a === boolbase_1$1.default.falseFunc || b === boolbase_1$1.default.trueFunc) return b;
		return function combine(elem) {
			return a(elem) || b(elem);
		};
	}
}));
var require_lib = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __importStar = exports && exports.__importStar || function(mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null) {
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	var __importDefault$4 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.aliases = exports.pseudos = exports.filters = exports.is = exports.selectOne = exports.selectAll = exports.prepareContext = exports._compileToken = exports._compileUnsafe = exports.compile = void 0;
	var DomUtils = __importStar(require_lib$2());
	var boolbase_1 = __importDefault$4(require_boolbase());
	var compile_js_1 = require_compile();
	var subselects_js_1 = require_subselects();
	var defaultEquals = function(a, b) {
		return a === b;
	};
	var defaultOptions = {
		adapter: DomUtils,
		equals: defaultEquals
	};
	function convertOptionFormats(options$1) {
		var _a$1, _b, _c, _d;
		var opts = options$1 !== null && options$1 !== void 0 ? options$1 : defaultOptions;
		(_a$1 = opts.adapter) !== null && _a$1 !== void 0 || (opts.adapter = DomUtils);
		(_b = opts.equals) !== null && _b !== void 0 || (opts.equals = (_d = (_c = opts.adapter) === null || _c === void 0 ? void 0 : _c.equals) !== null && _d !== void 0 ? _d : defaultEquals);
		return opts;
	}
	function wrapCompile(func) {
		return function addAdapter(selector, options$1, context) {
			var opts = convertOptionFormats(options$1);
			return func(selector, opts, context);
		};
	}
	exports.compile = wrapCompile(compile_js_1.compile);
	exports._compileUnsafe = wrapCompile(compile_js_1.compileUnsafe);
	exports._compileToken = wrapCompile(compile_js_1.compileToken);
	function getSelectorFunc(searchFunc) {
		return function select(query, elements, options$1) {
			var opts = convertOptionFormats(options$1);
			if (typeof query !== "function") query = (0, compile_js_1.compileUnsafe)(query, opts, elements);
			var filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
			return searchFunc(query, filteredElements, opts);
		};
	}
	function prepareContext(elems, adapter, shouldTestNextSiblings) {
		if (shouldTestNextSiblings === void 0) shouldTestNextSiblings = false;
		if (shouldTestNextSiblings) elems = appendNextSiblings(elems, adapter);
		return Array.isArray(elems) ? adapter.removeSubsets(elems) : adapter.getChildren(elems);
	}
	exports.prepareContext = prepareContext;
	function appendNextSiblings(elem, adapter) {
		var elems = Array.isArray(elem) ? elem.slice(0) : [elem];
		var elemsLength = elems.length;
		for (var i$1 = 0; i$1 < elemsLength; i$1++) {
			var nextSiblings = (0, subselects_js_1.getNextSiblings)(elems[i$1], adapter);
			elems.push.apply(elems, nextSiblings);
		}
		return elems;
	}
	exports.selectAll = getSelectorFunc(function(query, elems, options$1) {
		return query === boolbase_1.default.falseFunc || !elems || elems.length === 0 ? [] : options$1.adapter.findAll(query, elems);
	});
	exports.selectOne = getSelectorFunc(function(query, elems, options$1) {
		return query === boolbase_1.default.falseFunc || !elems || elems.length === 0 ? null : options$1.adapter.findOne(query, elems);
	});
	function is$2(elem, query, options$1) {
		var opts = convertOptionFormats(options$1);
		return (typeof query === "function" ? query : (0, compile_js_1.compile)(query, opts))(elem);
	}
	exports.is = is$2;
	exports.default = exports.selectAll;
	var index_js_1 = require_pseudo_selectors();
	Object.defineProperty(exports, "filters", {
		enumerable: true,
		get: function() {
			return index_js_1.filters;
		}
	});
	Object.defineProperty(exports, "pseudos", {
		enumerable: true,
		get: function() {
			return index_js_1.pseudos;
		}
	});
	Object.defineProperty(exports, "aliases", {
		enumerable: true,
		get: function() {
			return index_js_1.aliases;
		}
	});
}));
var require_back = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function arr_back(arr) {
		return arr[arr.length - 1];
	}
	exports.default = arr_back;
}));
var require_matcher = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$3 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var type_1$3 = __importDefault$3(require_type());
	function isTag(node) {
		return node && node.nodeType === type_1$3.default.ELEMENT_NODE;
	}
	function getAttributeValue(elem, name$1) {
		return isTag(elem) ? elem.getAttribute(name$1) : void 0;
	}
	function getName(elem) {
		return (elem && elem.rawTagName || "").toLowerCase();
	}
	function getChildren(node) {
		return node && node.childNodes;
	}
	function getParent(node) {
		return node ? node.parentNode : null;
	}
	function getText(node) {
		return node.text;
	}
	function removeSubsets(nodes) {
		let idx = nodes.length;
		let node;
		let ancestor;
		let replace;
		while (--idx > -1) {
			node = ancestor = nodes[idx];
			nodes[idx] = null;
			replace = true;
			while (ancestor) {
				if (nodes.indexOf(ancestor) > -1) {
					replace = false;
					nodes.splice(idx, 1);
					break;
				}
				ancestor = getParent(ancestor);
			}
			if (replace) nodes[idx] = node;
		}
		return nodes;
	}
	function existsOne(test, elems) {
		return elems.some((elem) => {
			return isTag(elem) ? test(elem) || existsOne(test, getChildren(elem)) : false;
		});
	}
	function getSiblings(node) {
		const parent = getParent(node);
		return parent ? getChildren(parent) : [];
	}
	function hasAttrib(elem, name$1) {
		return getAttributeValue(elem, name$1) !== void 0;
	}
	function findOne(test, elems) {
		let elem = null;
		for (let i$1 = 0, l = elems === null || elems === void 0 ? void 0 : elems.length; i$1 < l && !elem; i$1++) {
			const el = elems[i$1];
			if (test(el)) elem = el;
			else {
				const childs = getChildren(el);
				if (childs && childs.length > 0) elem = findOne(test, childs);
			}
		}
		return elem;
	}
	function findAll(test, nodes) {
		let result = [];
		for (let i$1 = 0, j = nodes.length; i$1 < j; i$1++) {
			if (!isTag(nodes[i$1])) continue;
			if (test(nodes[i$1])) result.push(nodes[i$1]);
			const childs = getChildren(nodes[i$1]);
			if (childs) result = result.concat(findAll(test, childs));
		}
		return result;
	}
	exports.default = {
		isTag,
		getAttributeValue,
		getName,
		getChildren,
		getParent,
		getText,
		removeSubsets,
		existsOne,
		getSiblings,
		hasAttrib,
		findOne,
		findAll
	};
}));
var require_void_tag = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var VoidTag = class {
		constructor(addClosingSlash = false, tags) {
			this.addClosingSlash = addClosingSlash;
			if (Array.isArray(tags)) this.voidTags = tags.reduce((set$1, tag) => {
				return set$1.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
			}, /* @__PURE__ */ new Set());
			else this.voidTags = [
				"area",
				"base",
				"br",
				"col",
				"embed",
				"hr",
				"img",
				"input",
				"link",
				"meta",
				"param",
				"source",
				"track",
				"wbr"
			].reduce((set$1, tag) => {
				return set$1.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
			}, /* @__PURE__ */ new Set());
		}
		formatNode(tag, attrs, innerHTML) {
			const addClosingSlash = this.addClosingSlash;
			const closingSpace = addClosingSlash && attrs && !attrs.endsWith(" ") ? " " : "";
			const closingSlash = addClosingSlash ? `${closingSpace}/` : "";
			return this.isVoidElement(tag.toLowerCase()) ? `<${tag}${attrs}${closingSlash}>` : `<${tag}${attrs}>${innerHTML}</${tag}>`;
		}
		isVoidElement(tag) {
			return this.voidTags.has(tag);
		}
	};
	exports.default = VoidTag;
}));
var require_text = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$2 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var he_1$1 = require_he();
	var node_1$2 = __importDefault$2(require_node$1());
	var type_1$2 = __importDefault$2(require_type());
	exports.default = class TextNode extends node_1$2.default {
		clone() {
			return new TextNode(this._rawText, null);
		}
		constructor(rawText, parentNode = null, range) {
			super(parentNode, range);
			this.nodeType = type_1$2.default.TEXT_NODE;
			this.rawTagName = "";
			this._rawText = rawText;
		}
		get rawText() {
			return this._rawText;
		}
		set rawText(text) {
			this._rawText = text;
			this._trimmedRawText = void 0;
			this._trimmedText = void 0;
		}
		get trimmedRawText() {
			if (this._trimmedRawText !== void 0) return this._trimmedRawText;
			this._trimmedRawText = trimText(this.rawText);
			return this._trimmedRawText;
		}
		get trimmedText() {
			if (this._trimmedText !== void 0) return this._trimmedText;
			this._trimmedText = trimText(this.text);
			return this._trimmedText;
		}
		get text() {
			return (0, he_1$1.decode)(this.rawText);
		}
		get isWhitespace() {
			return /^(\s|&nbsp;)*$/.test(this.rawText);
		}
		toString() {
			return this.rawText;
		}
	};
	function trimText(text) {
		let i$1 = 0;
		let startPos;
		let endPos;
		while (i$1 >= 0 && i$1 < text.length) {
			if (/\S/.test(text[i$1])) if (startPos === void 0) {
				startPos = i$1;
				i$1 = text.length;
			} else {
				endPos = i$1;
				i$1 = void 0;
			}
			if (startPos === void 0) i$1++;
			else i$1--;
		}
		if (startPos === void 0) startPos = 0;
		if (endPos === void 0) endPos = text.length - 1;
		const hasLeadingSpace = startPos > 0 && /[^\S\r\n]/.test(text[startPos - 1]);
		const hasTrailingSpace = endPos < text.length - 1 && /[^\S\r\n]/.test(text[endPos + 1]);
		return (hasLeadingSpace ? " " : "") + text.slice(startPos, endPos + 1) + (hasTrailingSpace ? " " : "");
	}
}));
var require_html = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$1 = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var css_select_1 = require_lib();
	var he_1 = __importDefault$1(require_he());
	var back_1 = __importDefault$1(require_back());
	var matcher_1 = __importDefault$1(require_matcher());
	var void_tag_1 = __importDefault$1(require_void_tag());
	var comment_1$1 = __importDefault$1(require_comment());
	var node_1$1 = __importDefault$1(require_node$1());
	var text_1$1 = __importDefault$1(require_text());
	var type_1$1 = __importDefault$1(require_type());
	function decode(val) {
		return JSON.parse(JSON.stringify(he_1.default.decode(val)));
	}
	var Htags = [
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"header",
		"hgroup"
	];
	var Dtags = [
		"details",
		"dialog",
		"dd",
		"div",
		"dt"
	];
	var Ftags = [
		"fieldset",
		"figcaption",
		"figure",
		"footer",
		"form"
	];
	var tableTags = [
		"table",
		"td",
		"tr"
	];
	var htmlTags = [
		"address",
		"article",
		"aside",
		"blockquote",
		"br",
		"hr",
		"li",
		"main",
		"nav",
		"ol",
		"p",
		"pre",
		"section",
		"ul"
	];
	var kBlockElements = /* @__PURE__ */ new Set();
	function addToKBlockElement(...args) {
		const addToSet = (array) => {
			for (let index = 0; index < array.length; index++) {
				const element = array[index];
				kBlockElements.add(element);
				kBlockElements.add(element.toUpperCase());
			}
		};
		for (const arg of args) addToSet(arg);
	}
	addToKBlockElement(Htags, Dtags, Ftags, tableTags, htmlTags);
	var DOMTokenList = class {
		_validate(c) {
			if (/\s/.test(c)) throw new Error(`DOMException in DOMTokenList.add: The token '${c}' contains HTML space characters, which are not valid in tokens.`);
		}
		constructor(valuesInit = [], afterUpdate = () => null) {
			this._set = new Set(valuesInit);
			this._afterUpdate = afterUpdate;
		}
		add(c) {
			this._validate(c);
			this._set.add(c);
			this._afterUpdate(this);
		}
		replace(c1, c2) {
			this._validate(c2);
			this._set.delete(c1);
			this._set.add(c2);
			this._afterUpdate(this);
		}
		remove(c) {
			this._set.delete(c) && this._afterUpdate(this);
		}
		toggle(c) {
			this._validate(c);
			if (this._set.has(c)) this._set.delete(c);
			else this._set.add(c);
			this._afterUpdate(this);
		}
		contains(c) {
			return this._set.has(c);
		}
		get length() {
			return this._set.size;
		}
		values() {
			return this._set.values();
		}
		get value() {
			return Array.from(this._set.values());
		}
		toString() {
			return Array.from(this._set.values()).join(" ");
		}
	};
	var HTMLElement = class HTMLElement extends node_1$1.default {
		quoteAttribute(attr) {
			if (attr == null) return "null";
			return JSON.stringify(attr.replace(/"/g, "&quot;")).replace(/\\t/g, "	").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\/g, "");
		}
		constructor(tagName, keyAttrs, rawAttrs = "", parentNode = null, range, voidTag = new void_tag_1.default(), _parseOptions = {}) {
			super(parentNode, range);
			this.rawAttrs = rawAttrs;
			this.voidTag = voidTag;
			this.nodeType = type_1$1.default.ELEMENT_NODE;
			this.rawTagName = tagName;
			this.rawAttrs = rawAttrs || "";
			this.id = keyAttrs.id || "";
			this.childNodes = [];
			this._parseOptions = _parseOptions;
			this.classList = new DOMTokenList(keyAttrs.class ? keyAttrs.class.split(/\s+/) : [], (classList) => this.setAttribute("class", classList.toString()));
			if (keyAttrs.id) {
				if (!rawAttrs) this.rawAttrs = `id="${keyAttrs.id}"`;
			}
			if (keyAttrs.class) {
				if (!rawAttrs) {
					const cls = `class="${this.classList.toString()}"`;
					if (this.rawAttrs) this.rawAttrs += ` ${cls}`;
					else this.rawAttrs = cls;
				}
			}
		}
		removeChild(node) {
			this.childNodes = this.childNodes.filter((child) => {
				return child !== node;
			});
			return this;
		}
		exchangeChild(oldNode, newNode) {
			this.childNodes = this.childNodes.map((child) => {
				if (child === oldNode) return newNode;
				return child;
			});
			return this;
		}
		get tagName() {
			return this.rawTagName ? this.rawTagName.toUpperCase() : this.rawTagName;
		}
		set tagName(newname) {
			this.rawTagName = newname.toLowerCase();
		}
		get localName() {
			return this.rawTagName.toLowerCase();
		}
		get isVoidElement() {
			return this.voidTag.isVoidElement(this.localName);
		}
		get rawText() {
			if (/^br$/i.test(this.rawTagName)) return "\n";
			return this.childNodes.reduce((pre, cur) => {
				return pre += cur.rawText;
			}, "");
		}
		get textContent() {
			return decode(this.rawText);
		}
		set textContent(val) {
			this.childNodes = [new text_1$1.default(val, this)];
		}
		get text() {
			return decode(this.rawText);
		}
		get structuredText() {
			let currentBlock = [];
			const blocks = [currentBlock];
			function dfs(node) {
				if (node.nodeType === type_1$1.default.ELEMENT_NODE) if (kBlockElements.has(node.rawTagName)) {
					if (currentBlock.length > 0) blocks.push(currentBlock = []);
					node.childNodes.forEach(dfs);
					if (currentBlock.length > 0) blocks.push(currentBlock = []);
				} else node.childNodes.forEach(dfs);
				else if (node.nodeType === type_1$1.default.TEXT_NODE) if (node.isWhitespace) currentBlock.prependWhitespace = true;
				else {
					let text = node.trimmedText;
					if (currentBlock.prependWhitespace) {
						text = ` ${text}`;
						currentBlock.prependWhitespace = false;
					}
					currentBlock.push(text);
				}
			}
			dfs(this);
			return blocks.map((block) => {
				return block.join("").replace(/\s{2,}/g, " ");
			}).join("\n").replace(/\s+$/, "");
		}
		toString() {
			const tag = this.rawTagName;
			if (tag) {
				const attrs = this.rawAttrs ? ` ${this.rawAttrs}` : "";
				return this.voidTag.formatNode(tag, attrs, this.innerHTML);
			}
			return this.innerHTML;
		}
		get innerHTML() {
			return this.childNodes.map((child) => {
				return child.toString();
			}).join("");
		}
		set innerHTML(content) {
			const r = parse$2(content, this._parseOptions);
			const nodes = r.childNodes.length ? r.childNodes : [new text_1$1.default(content, this)];
			resetParent(nodes, this);
			resetParent(this.childNodes, null);
			this.childNodes = nodes;
		}
		set_content(content, options$1 = {}) {
			if (content instanceof node_1$1.default) content = [content];
			else if (typeof content == "string") {
				options$1 = Object.assign(Object.assign({}, this._parseOptions), options$1);
				const r = parse$2(content, options$1);
				content = r.childNodes.length ? r.childNodes : [new text_1$1.default(r.innerHTML, this)];
			}
			resetParent(this.childNodes, null);
			resetParent(content, this);
			this.childNodes = content;
			return this;
		}
		replaceWith(...nodes) {
			const parent = this.parentNode;
			const content = nodes.map((node) => {
				if (node instanceof node_1$1.default) return [node];
				else if (typeof node == "string") {
					const r = parse$2(node, this._parseOptions);
					return r.childNodes.length ? r.childNodes : [new text_1$1.default(node, this)];
				}
				return [];
			}).flat();
			const idx = parent.childNodes.findIndex((child) => {
				return child === this;
			});
			resetParent([this], null);
			parent.childNodes = [
				...parent.childNodes.slice(0, idx),
				...resetParent(content, parent),
				...parent.childNodes.slice(idx + 1)
			];
			return this;
		}
		get outerHTML() {
			return this.toString();
		}
		trimRight(pattern) {
			for (let i$1 = 0; i$1 < this.childNodes.length; i$1++) {
				const childNode = this.childNodes[i$1];
				if (childNode.nodeType === type_1$1.default.ELEMENT_NODE) childNode.trimRight(pattern);
				else {
					const index = childNode.rawText.search(pattern);
					if (index > -1) {
						childNode.rawText = childNode.rawText.substr(0, index);
						this.childNodes.length = i$1 + 1;
					}
				}
			}
			return this;
		}
		get structure() {
			const res = [];
			let indention = 0;
			function write(str) {
				res.push("  ".repeat(indention) + str);
			}
			function dfs(node) {
				const idStr = node.id ? `#${node.id}` : "";
				const classStr = node.classList.length ? `.${node.classList.value.join(".")}` : "";
				write(`${node.rawTagName}${idStr}${classStr}`);
				indention++;
				node.childNodes.forEach((childNode) => {
					if (childNode.nodeType === type_1$1.default.ELEMENT_NODE) dfs(childNode);
					else if (childNode.nodeType === type_1$1.default.TEXT_NODE) {
						if (!childNode.isWhitespace) write("#text");
					}
				});
				indention--;
			}
			dfs(this);
			return res.join("\n");
		}
		removeWhitespace() {
			let o = 0;
			this.childNodes.forEach((node) => {
				if (node.nodeType === type_1$1.default.TEXT_NODE) {
					if (node.isWhitespace) return;
					node.rawText = node.trimmedRawText;
				} else if (node.nodeType === type_1$1.default.ELEMENT_NODE) node.removeWhitespace();
				this.childNodes[o++] = node;
			});
			this.childNodes.length = o;
			this.rawAttrs = Object.keys(this.rawAttributes).map((key) => {
				const val = this.rawAttributes[key];
				return `${key}=${JSON.stringify(val)}`;
			}).join(" ");
			delete this._rawAttrs;
			return this;
		}
		querySelectorAll(selector) {
			return (0, css_select_1.selectAll)(selector, this, {
				xmlMode: true,
				adapter: matcher_1.default
			});
		}
		querySelector(selector) {
			return (0, css_select_1.selectOne)(selector, this, {
				xmlMode: true,
				adapter: matcher_1.default
			});
		}
		getElementsByTagName(tagName) {
			const upperCasedTagName = tagName.toUpperCase();
			const re = [];
			const stack = [];
			let currentNodeReference = this;
			let index = 0;
			while (index !== void 0) {
				let child;
				do
					child = currentNodeReference.childNodes[index++];
				while (index < currentNodeReference.childNodes.length && child === void 0);
				if (child === void 0) {
					currentNodeReference = currentNodeReference.parentNode;
					index = stack.pop();
					continue;
				}
				if (child.nodeType === type_1$1.default.ELEMENT_NODE) {
					if (tagName === "*" || child.tagName === upperCasedTagName) re.push(child);
					if (child.childNodes.length > 0) {
						stack.push(index);
						currentNodeReference = child;
						index = 0;
					}
				}
			}
			return re;
		}
		getElementById(id) {
			const stack = [];
			let currentNodeReference = this;
			let index = 0;
			while (index !== void 0) {
				let child;
				do
					child = currentNodeReference.childNodes[index++];
				while (index < currentNodeReference.childNodes.length && child === void 0);
				if (child === void 0) {
					currentNodeReference = currentNodeReference.parentNode;
					index = stack.pop();
					continue;
				}
				if (child.nodeType === type_1$1.default.ELEMENT_NODE) {
					if (child.id === id) return child;
					if (child.childNodes.length > 0) {
						stack.push(index);
						currentNodeReference = child;
						index = 0;
					}
				}
			}
			return null;
		}
		closest(selector) {
			const mapChild = /* @__PURE__ */ new Map();
			let el = this;
			let old = null;
			function findOne$2(test, elems) {
				let elem = null;
				for (let i$1 = 0, l = elems.length; i$1 < l && !elem; i$1++) {
					const el$1 = elems[i$1];
					if (test(el$1)) elem = el$1;
					else {
						const child = mapChild.get(el$1);
						if (child) elem = findOne$2(test, [child]);
					}
				}
				return elem;
			}
			while (el) {
				mapChild.set(el, old);
				old = el;
				el = el.parentNode;
			}
			el = this;
			while (el) {
				const e = (0, css_select_1.selectOne)(selector, el, {
					xmlMode: true,
					adapter: Object.assign(Object.assign({}, matcher_1.default), {
						getChildren(node) {
							const child = mapChild.get(node);
							return child && [child];
						},
						getSiblings(node) {
							return [node];
						},
						findOne: findOne$2,
						findAll() {
							return [];
						}
					})
				});
				if (e) return e;
				el = el.parentNode;
			}
			return null;
		}
		appendChild(node) {
			this.append(node);
			return node;
		}
		get attrs() {
			if (this._attrs) return this._attrs;
			this._attrs = {};
			const attrs = this.rawAttributes;
			for (const key in attrs) {
				const val = attrs[key] || "";
				this._attrs[key.toLowerCase()] = decode(val);
			}
			return this._attrs;
		}
		get attributes() {
			const ret_attrs = {};
			const attrs = this.rawAttributes;
			for (const key in attrs) {
				const val = attrs[key] || "";
				ret_attrs[key] = decode(val);
			}
			return ret_attrs;
		}
		get rawAttributes() {
			if (this._rawAttrs) return this._rawAttrs;
			const attrs = {};
			if (this.rawAttrs) {
				const re = /([a-zA-Z()[\]#@$.?:][a-zA-Z0-9-._:()[\]#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g;
				let match;
				while (match = re.exec(this.rawAttrs)) {
					const key = match[1];
					let val = match[2] || null;
					if (val && (val[0] === `'` || val[0] === `"`)) val = val.slice(1, val.length - 1);
					attrs[key] = attrs[key] || val;
				}
			}
			this._rawAttrs = attrs;
			return attrs;
		}
		removeAttribute(key) {
			const attrs = this.rawAttributes;
			delete attrs[key];
			if (this._attrs) delete this._attrs[key];
			this.rawAttrs = Object.keys(attrs).map((name$1) => {
				const val = this.quoteAttribute(attrs[name$1]);
				if (val === "null" || val === "\"\"") return name$1;
				return `${name$1}=${val}`;
			}).join(" ");
			if (key === "id") this.id = "";
			return this;
		}
		hasAttribute(key) {
			return key.toLowerCase() in this.attrs;
		}
		getAttribute(key) {
			return this.attrs[key.toLowerCase()];
		}
		setAttribute(key, value) {
			if (arguments.length < 2) throw new Error("Failed to execute 'setAttribute' on 'Element'");
			const k2 = key.toLowerCase();
			const attrs = this.rawAttributes;
			for (const k in attrs) if (k.toLowerCase() === k2) {
				key = k;
				break;
			}
			attrs[key] = String(value);
			if (this._attrs) this._attrs[k2] = decode(attrs[key]);
			this.rawAttrs = Object.keys(attrs).map((name$1) => {
				const val = this.quoteAttribute(attrs[name$1]);
				if (val === "null" || val === "\"\"") return name$1;
				return `${name$1}=${val}`;
			}).join(" ");
			if (key === "id") this.id = value;
			return this;
		}
		setAttributes(attributes$1) {
			if (this._attrs) delete this._attrs;
			if (this._rawAttrs) delete this._rawAttrs;
			this.rawAttrs = Object.keys(attributes$1).map((name$1) => {
				const val = attributes$1[name$1];
				if (val === "null" || val === "\"\"") return name$1;
				return `${name$1}=${this.quoteAttribute(String(val))}`;
			}).join(" ");
			return this;
		}
		insertAdjacentHTML(where, html) {
			if (arguments.length < 2) throw new Error("2 arguments required");
			const p = parse$2(html, this._parseOptions);
			if (where === "afterend") this.after(...p.childNodes);
			else if (where === "afterbegin") this.prepend(...p.childNodes);
			else if (where === "beforeend") this.append(...p.childNodes);
			else if (where === "beforebegin") this.before(...p.childNodes);
			else throw new Error(`The value provided ('${where}') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'`);
			return this;
		}
		prepend(...insertable) {
			const nodes = resolveInsertable(insertable);
			resetParent(nodes, this);
			this.childNodes.unshift(...nodes);
		}
		append(...insertable) {
			const nodes = resolveInsertable(insertable);
			resetParent(nodes, this);
			this.childNodes.push(...nodes);
		}
		before(...insertable) {
			const nodes = resolveInsertable(insertable);
			const siblings = this.parentNode.childNodes;
			resetParent(nodes, this.parentNode);
			siblings.splice(siblings.indexOf(this), 0, ...nodes);
		}
		after(...insertable) {
			const nodes = resolveInsertable(insertable);
			const siblings = this.parentNode.childNodes;
			resetParent(nodes, this.parentNode);
			siblings.splice(siblings.indexOf(this) + 1, 0, ...nodes);
		}
		get nextSibling() {
			if (this.parentNode) {
				const children = this.parentNode.childNodes;
				let i$1 = 0;
				while (i$1 < children.length) {
					const child = children[i$1++];
					if (this === child) return children[i$1] || null;
				}
				return null;
			}
		}
		get nextElementSibling() {
			if (this.parentNode) {
				const children = this.parentNode.childNodes;
				let i$1 = 0;
				let find$1 = false;
				while (i$1 < children.length) {
					const child = children[i$1++];
					if (find$1) {
						if (child instanceof HTMLElement) return child || null;
					} else if (this === child) find$1 = true;
				}
				return null;
			}
		}
		get previousSibling() {
			if (this.parentNode) {
				const children = this.parentNode.childNodes;
				let i$1 = children.length;
				while (i$1 > 0) {
					const child = children[--i$1];
					if (this === child) return children[i$1 - 1] || null;
				}
				return null;
			}
		}
		get previousElementSibling() {
			if (this.parentNode) {
				const children = this.parentNode.childNodes;
				let i$1 = children.length;
				let find$1 = false;
				while (i$1 > 0) {
					const child = children[--i$1];
					if (find$1) {
						if (child instanceof HTMLElement) return child || null;
					} else if (this === child) find$1 = true;
				}
				return null;
			}
		}
		get children() {
			const children = [];
			for (const childNode of this.childNodes) if (childNode instanceof HTMLElement) children.push(childNode);
			return children;
		}
		get firstChild() {
			return this.childNodes[0];
		}
		get firstElementChild() {
			return this.children[0];
		}
		get lastChild() {
			return (0, back_1.default)(this.childNodes);
		}
		get lastElementChild() {
			return this.children[this.children.length - 1];
		}
		get childElementCount() {
			return this.children.length;
		}
		get classNames() {
			return this.classList.toString();
		}
		clone() {
			return parse$2(this.toString(), this._parseOptions).firstChild;
		}
	};
	exports.default = HTMLElement;
	var kMarkupPattern = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z@\xB7\xC0-\xD6\xD8-\xF6\u00F8-\u03A1\u03A3-\u03D9\u03DB-\u03EF\u03F7-\u03FF\u0400-\u04FF\u0500-\u052F\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E00-\u1E9B\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64-\uAB65\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\x37F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/gu;
	var kAttributePattern = /(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi;
	var kElementsClosedByOpening = {
		li: {
			li: true,
			LI: true
		},
		LI: {
			li: true,
			LI: true
		},
		p: {
			p: true,
			div: true,
			P: true,
			DIV: true
		},
		P: {
			p: true,
			div: true,
			P: true,
			DIV: true
		},
		b: {
			div: true,
			DIV: true
		},
		B: {
			div: true,
			DIV: true
		},
		td: {
			td: true,
			th: true,
			TD: true,
			TH: true
		},
		TD: {
			td: true,
			th: true,
			TD: true,
			TH: true
		},
		th: {
			td: true,
			th: true,
			TD: true,
			TH: true
		},
		TH: {
			td: true,
			th: true,
			TD: true,
			TH: true
		},
		h1: {
			h1: true,
			H1: true
		},
		H1: {
			h1: true,
			H1: true
		},
		h2: {
			h2: true,
			H2: true
		},
		H2: {
			h2: true,
			H2: true
		},
		h3: {
			h3: true,
			H3: true
		},
		H3: {
			h3: true,
			H3: true
		},
		h4: {
			h4: true,
			H4: true
		},
		H4: {
			h4: true,
			H4: true
		},
		h5: {
			h5: true,
			H5: true
		},
		H5: {
			h5: true,
			H5: true
		},
		h6: {
			h6: true,
			H6: true
		},
		H6: {
			h6: true,
			H6: true
		}
	};
	var kElementsClosedByClosing = {
		li: {
			ul: true,
			ol: true,
			UL: true,
			OL: true
		},
		LI: {
			ul: true,
			ol: true,
			UL: true,
			OL: true
		},
		a: {
			div: true,
			DIV: true
		},
		A: {
			div: true,
			DIV: true
		},
		b: {
			div: true,
			DIV: true
		},
		B: {
			div: true,
			DIV: true
		},
		i: {
			div: true,
			DIV: true
		},
		I: {
			div: true,
			DIV: true
		},
		p: {
			div: true,
			DIV: true
		},
		P: {
			div: true,
			DIV: true
		},
		td: {
			tr: true,
			table: true,
			TR: true,
			TABLE: true
		},
		TD: {
			tr: true,
			table: true,
			TR: true,
			TABLE: true
		},
		th: {
			tr: true,
			table: true,
			TR: true,
			TABLE: true
		},
		TH: {
			tr: true,
			table: true,
			TR: true,
			TABLE: true
		}
	};
	var frameflag = "documentfragmentcontainer";
	function base_parse(data, options$1 = {}) {
		var _a$1, _b;
		const voidTag = new void_tag_1.default((_a$1 = options$1 === null || options$1 === void 0 ? void 0 : options$1.voidTag) === null || _a$1 === void 0 ? void 0 : _a$1.closingSlash, (_b = options$1 === null || options$1 === void 0 ? void 0 : options$1.voidTag) === null || _b === void 0 ? void 0 : _b.tags);
		const elements = options$1.blockTextElements || {
			script: true,
			noscript: true,
			style: true,
			pre: true
		};
		const element_names = Object.keys(elements);
		const kBlockTextElements = element_names.map((it) => new RegExp(`^${it}$`, "i"));
		const kIgnoreElements = element_names.filter((it) => Boolean(elements[it])).map((it) => new RegExp(`^${it}$`, "i"));
		function element_should_be_ignore(tag) {
			return kIgnoreElements.some((it) => it.test(tag));
		}
		function is_block_text_element(tag) {
			return kBlockTextElements.some((it) => it.test(tag));
		}
		const createRange = (startPos, endPos) => [startPos - frameFlagOffset, endPos - frameFlagOffset];
		const root$3 = new HTMLElement(null, {}, "", null, [0, data.length], voidTag, options$1);
		let currentParent = root$3;
		const stack = [root$3];
		let lastTextPos = -1;
		let noNestedTagIndex = void 0;
		let match;
		data = `<${frameflag}>${data}</${frameflag}>`;
		const { lowerCaseTagName, fixNestedATags } = options$1;
		const dataEndPos = data.length - 27;
		const frameFlagOffset = 27;
		while (match = kMarkupPattern.exec(data)) {
			let { 0: matchText, 1: leadingSlash, 2: tagName, 3: attributes$1, 4: closingSlash } = match;
			const matchLength = matchText.length;
			const tagStartPos = kMarkupPattern.lastIndex - matchLength;
			const tagEndPos = kMarkupPattern.lastIndex;
			if (lastTextPos > -1) {
				if (lastTextPos + matchLength < tagEndPos) {
					const text = data.substring(lastTextPos, tagStartPos);
					currentParent.appendChild(new text_1$1.default(text, currentParent, createRange(lastTextPos, tagStartPos)));
				}
			}
			lastTextPos = kMarkupPattern.lastIndex;
			if (tagName === "documentfragmentcontainer") continue;
			if (matchText[1] === "!") {
				if (options$1.comment) {
					const text = data.substring(tagStartPos + 4, tagEndPos - 3);
					currentParent.appendChild(new comment_1$1.default(text, currentParent, createRange(tagStartPos, tagEndPos)));
				}
				continue;
			}
			if (lowerCaseTagName) tagName = tagName.toLowerCase();
			if (!leadingSlash) {
				const attrs = {};
				for (let attMatch; attMatch = kAttributePattern.exec(attributes$1);) {
					const { 1: key, 2: val } = attMatch;
					const isQuoted = val[0] === `'` || val[0] === `"`;
					attrs[key.toLowerCase()] = isQuoted ? val.slice(1, val.length - 1) : val;
				}
				const parentTagName = currentParent.rawTagName;
				if (!closingSlash && kElementsClosedByOpening[parentTagName]) {
					if (kElementsClosedByOpening[parentTagName][tagName]) {
						stack.pop();
						currentParent = (0, back_1.default)(stack);
					}
				}
				if (fixNestedATags && (tagName === "a" || tagName === "A")) {
					if (noNestedTagIndex !== void 0) {
						stack.splice(noNestedTagIndex);
						currentParent = (0, back_1.default)(stack);
					}
					noNestedTagIndex = stack.length;
				}
				const tagEndPos$1 = kMarkupPattern.lastIndex;
				const tagStartPos$1 = tagEndPos$1 - matchLength;
				currentParent = currentParent.appendChild(new HTMLElement(tagName, attrs, attributes$1.slice(1), null, createRange(tagStartPos$1, tagEndPos$1), voidTag, options$1));
				stack.push(currentParent);
				if (is_block_text_element(tagName)) {
					const closeMarkup = `</${tagName}>`;
					const closeIndex = lowerCaseTagName ? data.toLocaleLowerCase().indexOf(closeMarkup, kMarkupPattern.lastIndex) : data.indexOf(closeMarkup, kMarkupPattern.lastIndex);
					const textEndPos = closeIndex === -1 ? dataEndPos : closeIndex;
					if (element_should_be_ignore(tagName)) {
						const text = data.substring(tagEndPos$1, textEndPos);
						if (text.length > 0 && /\S/.test(text)) currentParent.appendChild(new text_1$1.default(text, currentParent, createRange(tagEndPos$1, textEndPos)));
					}
					if (closeIndex === -1) lastTextPos = kMarkupPattern.lastIndex = data.length + 1;
					else {
						lastTextPos = kMarkupPattern.lastIndex = closeIndex + closeMarkup.length;
						leadingSlash = "/";
					}
				}
			}
			if (leadingSlash || closingSlash || voidTag.isVoidElement(tagName)) while (true) {
				if (noNestedTagIndex != null && (tagName === "a" || tagName === "A")) noNestedTagIndex = void 0;
				if (currentParent.rawTagName === tagName) {
					currentParent.range[1] = createRange(-1, Math.max(lastTextPos, tagEndPos))[1];
					stack.pop();
					currentParent = (0, back_1.default)(stack);
					break;
				} else {
					const parentTagName = currentParent.tagName;
					if (kElementsClosedByClosing[parentTagName]) {
						if (kElementsClosedByClosing[parentTagName][tagName]) {
							stack.pop();
							currentParent = (0, back_1.default)(stack);
							continue;
						}
					}
					break;
				}
			}
		}
		return stack;
	}
	exports.base_parse = base_parse;
	function parse$2(data, options$1 = {}) {
		const stack = base_parse(data, options$1);
		const [root$3] = stack;
		while (stack.length > 1) {
			const last = stack.pop();
			const oneBefore = (0, back_1.default)(stack);
			if (last.parentNode && last.parentNode.parentNode) {
				if (last.parentNode === oneBefore && last.tagName === oneBefore.tagName) {
					if (options$1.parseNoneClosedTags !== true) {
						oneBefore.removeChild(last);
						last.childNodes.forEach((child) => {
							oneBefore.parentNode.appendChild(child);
						});
						stack.pop();
					}
				} else if (options$1.parseNoneClosedTags !== true) {
					oneBefore.removeChild(last);
					last.childNodes.forEach((child) => {
						oneBefore.appendChild(child);
					});
				}
			}
		}
		return root$3;
	}
	exports.parse = parse$2;
	function resolveInsertable(insertable) {
		return insertable.map((val) => {
			if (typeof val === "string") return new text_1$1.default(val);
			val.remove();
			return val;
		});
	}
	function resetParent(nodes, parent) {
		return nodes.map((node) => {
			node.parentNode = parent;
			return node;
		});
	}
}));
var require_parse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var html_1$2 = require_html();
	Object.defineProperty(exports, "default", {
		enumerable: true,
		get: function() {
			return html_1$2.parse;
		}
	});
}));
var require_valid = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var html_1$1 = require_html();
	function valid(data, options$1 = {}) {
		const stack = (0, html_1$1.base_parse)(data, options$1);
		return Boolean(stack.length === 1);
	}
	exports.default = valid;
}));
var import_dist = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var comment_1 = __importDefault(require_comment());
	exports.CommentNode = comment_1.default;
	var html_1 = __importDefault(require_html());
	exports.HTMLElement = html_1.default;
	var node_1 = __importDefault(require_node$1());
	exports.Node = node_1.default;
	var text_1 = __importDefault(require_text());
	exports.TextNode = text_1.default;
	var type_1 = __importDefault(require_type());
	exports.NodeType = type_1.default;
	var parse_1 = __importDefault(require_parse());
	var valid_1 = __importDefault(require_valid());
	exports.valid = valid_1.default;
	function parse$1(data, options$1 = {}) {
		return (0, parse_1.default)(data, options$1);
	}
	exports.parse = parse$1;
	parse$1.parse = parse_1.default;
	parse$1.HTMLElement = html_1.default;
	parse$1.CommentNode = comment_1.default;
	parse$1.valid = valid_1.default;
	parse$1.Node = node_1.default;
	parse$1.TextNode = text_1.default;
	parse$1.NodeType = type_1.default;
})))());
var getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function combineComparators(comparatorA, comparatorB) {
	return function isEqual$2(a, b, state) {
		return comparatorA(a, b, state) && comparatorB(a, b, state);
	};
}
function createIsCircular(areItemsEqual) {
	return function isCircular(a, b, state) {
		if (!a || !b || typeof a !== "object" || typeof b !== "object") return areItemsEqual(a, b, state);
		var cache$1 = state.cache;
		var cachedA = cache$1.get(a);
		var cachedB = cache$1.get(b);
		if (cachedA && cachedB) return cachedA === b && cachedB === a;
		cache$1.set(a, b);
		cache$1.set(b, a);
		var result = areItemsEqual(a, b, state);
		cache$1.delete(a);
		cache$1.delete(b);
		return result;
	};
}
function getStrictProperties(object) {
	return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
var hasOwn = Object.hasOwn || (function(object, property) {
	return hasOwnProperty.call(object, property);
});
function sameValueZeroEqual(a, b) {
	return a === b || !a && !b && a !== a && b !== b;
}
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, keys = Object.keys;
function areArraysEqual(a, b, state) {
	var index = a.length;
	if (b.length !== index) return false;
	while (index-- > 0) if (!state.equals(a[index], b[index], index, index, a, b, state)) return false;
	return true;
}
function areDatesEqual(a, b) {
	return sameValueZeroEqual(a.getTime(), b.getTime());
}
function areErrorsEqual(a, b) {
	return a.name === b.name && a.message === b.message && a.cause === b.cause && a.stack === b.stack;
}
function areFunctionsEqual(a, b) {
	return a === b;
}
function areMapsEqual(a, b, state) {
	var size = a.size;
	if (size !== b.size) return false;
	if (!size) return true;
	var matchedIndices = new Array(size);
	var aIterable = a.entries();
	var aResult;
	var bResult;
	var index = 0;
	while (aResult = aIterable.next()) {
		if (aResult.done) break;
		var bIterable = b.entries();
		var hasMatch = false;
		var matchIndex = 0;
		while (bResult = bIterable.next()) {
			if (bResult.done) break;
			if (matchedIndices[matchIndex]) {
				matchIndex++;
				continue;
			}
			var aEntry = aResult.value;
			var bEntry = bResult.value;
			if (state.equals(aEntry[0], bEntry[0], index, matchIndex, a, b, state) && state.equals(aEntry[1], bEntry[1], aEntry[0], bEntry[0], a, b, state)) {
				hasMatch = matchedIndices[matchIndex] = true;
				break;
			}
			matchIndex++;
		}
		if (!hasMatch) return false;
		index++;
	}
	return true;
}
var areNumbersEqual = sameValueZeroEqual;
function areObjectsEqual(a, b, state) {
	var properties = keys(a);
	var index = properties.length;
	if (keys(b).length !== index) return false;
	while (index-- > 0) if (!isPropertyEqual(a, b, state, properties[index])) return false;
	return true;
}
function areObjectsEqualStrict(a, b, state) {
	var properties = getStrictProperties(a);
	var index = properties.length;
	if (getStrictProperties(b).length !== index) return false;
	var property;
	var descriptorA;
	var descriptorB;
	while (index-- > 0) {
		property = properties[index];
		if (!isPropertyEqual(a, b, state, property)) return false;
		descriptorA = getOwnPropertyDescriptor(a, property);
		descriptorB = getOwnPropertyDescriptor(b, property);
		if ((descriptorA || descriptorB) && (!descriptorA || !descriptorB || descriptorA.configurable !== descriptorB.configurable || descriptorA.enumerable !== descriptorB.enumerable || descriptorA.writable !== descriptorB.writable)) return false;
	}
	return true;
}
function arePrimitiveWrappersEqual(a, b) {
	return sameValueZeroEqual(a.valueOf(), b.valueOf());
}
function areRegExpsEqual(a, b) {
	return a.source === b.source && a.flags === b.flags;
}
function areSetsEqual(a, b, state) {
	var size = a.size;
	if (size !== b.size) return false;
	if (!size) return true;
	var matchedIndices = new Array(size);
	var aIterable = a.values();
	var aResult;
	var bResult;
	while (aResult = aIterable.next()) {
		if (aResult.done) break;
		var bIterable = b.values();
		var hasMatch = false;
		var matchIndex = 0;
		while (bResult = bIterable.next()) {
			if (bResult.done) break;
			if (!matchedIndices[matchIndex] && state.equals(aResult.value, bResult.value, aResult.value, bResult.value, a, b, state)) {
				hasMatch = matchedIndices[matchIndex] = true;
				break;
			}
			matchIndex++;
		}
		if (!hasMatch) return false;
	}
	return true;
}
function areTypedArraysEqual(a, b) {
	var index = a.length;
	if (b.length !== index) return false;
	while (index-- > 0) if (a[index] !== b[index]) return false;
	return true;
}
function areUrlsEqual(a, b) {
	return a.hostname === b.hostname && a.pathname === b.pathname && a.protocol === b.protocol && a.port === b.port && a.hash === b.hash && a.username === b.username && a.password === b.password;
}
function isPropertyEqual(a, b, state, property) {
	if ((property === "_owner" || property === "__o" || property === "__v") && (a.$$typeof || b.$$typeof)) return true;
	return hasOwn(b, property) && state.equals(a[property], b[property], property, property, a, b, state);
}
var isArray = Array.isArray;
var isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView ? ArrayBuffer.isView : null;
var assign = Object.assign;
var getTag = Object.prototype.toString.call.bind(Object.prototype.toString);
function createEqualityComparator(_a$1) {
	var areArraysEqual$1 = _a$1.areArraysEqual, areDatesEqual$1 = _a$1.areDatesEqual, areErrorsEqual$1 = _a$1.areErrorsEqual, areFunctionsEqual$1 = _a$1.areFunctionsEqual, areMapsEqual$1 = _a$1.areMapsEqual, areNumbersEqual$1 = _a$1.areNumbersEqual, areObjectsEqual$1 = _a$1.areObjectsEqual, arePrimitiveWrappersEqual$1 = _a$1.arePrimitiveWrappersEqual, areRegExpsEqual$1 = _a$1.areRegExpsEqual, areSetsEqual$1 = _a$1.areSetsEqual, areTypedArraysEqual$1 = _a$1.areTypedArraysEqual, areUrlsEqual$1 = _a$1.areUrlsEqual;
	return function comparator(a, b, state) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		var type$1 = typeof a;
		if (type$1 !== typeof b) return false;
		if (type$1 !== "object") {
			if (type$1 === "number") return areNumbersEqual$1(a, b, state);
			if (type$1 === "function") return areFunctionsEqual$1(a, b, state);
			return false;
		}
		var constructor = a.constructor;
		if (constructor !== b.constructor) return false;
		if (constructor === Object) return areObjectsEqual$1(a, b, state);
		if (isArray(a)) return areArraysEqual$1(a, b, state);
		if (isTypedArray != null && isTypedArray(a)) return areTypedArraysEqual$1(a, b, state);
		if (constructor === Date) return areDatesEqual$1(a, b, state);
		if (constructor === RegExp) return areRegExpsEqual$1(a, b, state);
		if (constructor === Map) return areMapsEqual$1(a, b, state);
		if (constructor === Set) return areSetsEqual$1(a, b, state);
		var tag = getTag(a);
		if (tag === "[object Date]") return areDatesEqual$1(a, b, state);
		if (tag === "[object RegExp]") return areRegExpsEqual$1(a, b, state);
		if (tag === "[object Map]") return areMapsEqual$1(a, b, state);
		if (tag === "[object Set]") return areSetsEqual$1(a, b, state);
		if (tag === "[object Object]") return typeof a.then !== "function" && typeof b.then !== "function" && areObjectsEqual$1(a, b, state);
		if (tag === "[object URL]") return areUrlsEqual$1(a, b, state);
		if (tag === "[object Error]") return areErrorsEqual$1(a, b, state);
		if (tag === "[object Arguments]") return areObjectsEqual$1(a, b, state);
		if (tag === "[object Boolean]" || tag === "[object Number]" || tag === "[object String]") return arePrimitiveWrappersEqual$1(a, b, state);
		return false;
	};
}
function createEqualityComparatorConfig(_a$1) {
	var circular = _a$1.circular, createCustomConfig = _a$1.createCustomConfig, strict = _a$1.strict;
	var config = {
		areArraysEqual: strict ? areObjectsEqualStrict : areArraysEqual,
		areDatesEqual,
		areErrorsEqual,
		areFunctionsEqual,
		areMapsEqual: strict ? combineComparators(areMapsEqual, areObjectsEqualStrict) : areMapsEqual,
		areNumbersEqual,
		areObjectsEqual: strict ? areObjectsEqualStrict : areObjectsEqual,
		arePrimitiveWrappersEqual,
		areRegExpsEqual,
		areSetsEqual: strict ? combineComparators(areSetsEqual, areObjectsEqualStrict) : areSetsEqual,
		areTypedArraysEqual: strict ? areObjectsEqualStrict : areTypedArraysEqual,
		areUrlsEqual
	};
	if (createCustomConfig) config = assign({}, config, createCustomConfig(config));
	if (circular) {
		var areArraysEqual$1 = createIsCircular(config.areArraysEqual);
		var areMapsEqual$1 = createIsCircular(config.areMapsEqual);
		var areObjectsEqual$1 = createIsCircular(config.areObjectsEqual);
		var areSetsEqual$1 = createIsCircular(config.areSetsEqual);
		config = assign({}, config, {
			areArraysEqual: areArraysEqual$1,
			areMapsEqual: areMapsEqual$1,
			areObjectsEqual: areObjectsEqual$1,
			areSetsEqual: areSetsEqual$1
		});
	}
	return config;
}
function createInternalEqualityComparator(compare) {
	return function(a, b, _indexOrKeyA, _indexOrKeyB, _parentA, _parentB, state) {
		return compare(a, b, state);
	};
}
function createIsEqual(_a$1) {
	var circular = _a$1.circular, comparator = _a$1.comparator, createState = _a$1.createState, equals$1 = _a$1.equals, strict = _a$1.strict;
	if (createState) return function isEqual$2(a, b) {
		var _a$2 = createState(), _b = _a$2.cache, cache$1 = _b === void 0 ? circular ? /* @__PURE__ */ new WeakMap() : void 0 : _b, meta = _a$2.meta;
		return comparator(a, b, {
			cache: cache$1,
			equals: equals$1,
			meta,
			strict
		});
	};
	if (circular) return function isEqual$2(a, b) {
		return comparator(a, b, {
			cache: /* @__PURE__ */ new WeakMap(),
			equals: equals$1,
			meta: void 0,
			strict
		});
	};
	var state = {
		cache: void 0,
		equals: equals$1,
		meta: void 0,
		strict
	};
	return function isEqual$2(a, b) {
		return comparator(a, b, state);
	};
}
var deepEqual = createCustomEqual();
createCustomEqual({ strict: true });
createCustomEqual({ circular: true });
createCustomEqual({
	circular: true,
	strict: true
});
createCustomEqual({ createInternalComparator: function() {
	return sameValueZeroEqual;
} });
createCustomEqual({
	strict: true,
	createInternalComparator: function() {
		return sameValueZeroEqual;
	}
});
createCustomEqual({
	circular: true,
	createInternalComparator: function() {
		return sameValueZeroEqual;
	}
});
createCustomEqual({
	circular: true,
	createInternalComparator: function() {
		return sameValueZeroEqual;
	},
	strict: true
});
function createCustomEqual(options$1) {
	if (options$1 === void 0) options$1 = {};
	var _a$1 = options$1.circular, circular = _a$1 === void 0 ? false : _a$1, createCustomInternalComparator = options$1.createInternalComparator, createState = options$1.createState, _b = options$1.strict, strict = _b === void 0 ? false : _b;
	var config = createEqualityComparatorConfig(options$1);
	var comparator = createEqualityComparator(config);
	var equals$1 = createCustomInternalComparator ? createCustomInternalComparator(comparator) : createInternalEqualityComparator(comparator);
	return createIsEqual({
		circular,
		comparator,
		createState,
		equals: equals$1,
		strict
	});
}
var import_semver = /* @__PURE__ */ __toESM(require_semver());
const startingPages = {
	"Default": "",
	"Home": "FEmusic_home",
	"Explore": "FEmusic_explore",
	"New Releases": "FEmusic_new_releases",
	"Charts": "FEmusic_charts",
	"Moods & Genres": "FEmusic_moods_and_genres",
	"Library": "FEmusic_library_landing",
	"Playlists": "FEmusic_liked_playlists",
	"Songs": "FEmusic_liked_videos",
	"Albums": "FEmusic_liked_albums",
	"Artists": "FEmusic_library_corpus_track_artists",
	"Subscribed Artists": "FEmusic_library_corpus_artists",
	"Uploads": "FEmusic_library_privately_owned_landing",
	"Uploaded Playlists": "FEmusic_liked_playlists",
	"Uploaded Songs": "FEmusic_library_privately_owned_tracks",
	"Uploaded Albums": "FEmusic_library_privately_owned_releases",
	"Uploaded Artists": "FEmusic_library_privately_owned_artists"
};
var menuTemplateMap = {};
var createContext$1 = (id, win) => ({
	getConfig: async () => deepmerge((await allPlugins())[id].config ?? { enabled: false }, get(`plugins.${id}`) ?? {}),
	setConfig: async (newConfig) => {
		setPartial(`plugins.${id}`, newConfig, (await allPlugins())[id].config);
	},
	window: win,
	refresh: async () => {
		await setApplicationMenu(win);
		if (await isEnabled("in-app-menu")) win.webContents.send("refresh-in-app-menu");
	}
});
const forceLoadMenuPlugin = async (id, win) => {
	try {
		const plugin = (await allPlugins())[id];
		if (!plugin) return;
		const menu = plugin.menu?.(createContext$1(id, win));
		if (menu) {
			const result = await menu;
			if (result.length > 0) menuTemplateMap[id] = result;
			else return;
		} else return;
		console.log(LoggerPrefix, t("common.console.plugins.loaded", { pluginName: `${id}::menu` }));
	} catch (err) {
		console.error(LoggerPrefix, t("common.console.plugins.initialize-failed", { pluginName: `${id}::menu` }));
		console.trace(err);
	}
};
const loadAllMenuPlugins = async (win) => {
	const pluginConfigs = getPlugins();
	for (const [pluginId, pluginDef] of Object.entries(await allPlugins())) if (deepmerge(pluginDef.config ?? { enabled: false }, pluginConfigs[pluginId] ?? {}).enabled) await forceLoadMenuPlugin(pluginId, win);
};
const getAllMenuTemplate = () => {
	return menuTemplateMap;
};
var package_default = {
	name: "arvoxify",
	desktopName: "com.arvoxify.desktop",
	productName: "Arvoxify",
	version: "3.11.0",
	description: "Arvoxify App - beta testi",
	main: "./dist/main/index.js",
	type: "module",
	license: "MIT",
	repository: "chiatr/arvoxify",
	author: {
		"name": "chiatr",
		"email": "chiatr@users.noreply.github.com",
		"url": "https://github.com/chiatr/arvoxify"
	},
	scripts: {
		"test": "pnpm playwright test",
		"test:debug": "pnpm cross-env DEBUG=pw:*,-pw:test:protocol playwright test",
		"build": "pnpm electron-vite build",
		"vite:inspect": "pnpm clean && electron-vite build --mode development && pnpm exec serve .vite-inspect",
		"start": "pnpm electron-vite preview",
		"start:debug": "pnpm cross-env ELECTRON_ENABLE_LOGGING=1 pnpm start",
		"dev": "pnpm cross-env NODE_ENV=development NODE_OPTIONS=--enable-source-maps electron-vite dev --watch",
		"dev:renderer": "pnpm cross-env NODE_ENV=development NODE_OPTIONS=--enable-source-maps electron-vite dev",
		"dev:debug": "pnpm cross-env ELECTRON_ENABLE_LOGGING=1 pnpm dev",
		"clean": "pnpm del-cli dist && pnpm del-cli pack && pnpm del-cli .vite-inspect",
		"dist": "pnpm clean && pnpm build && pnpm electron-builder --win --mac --linux -p never",
		"dist:linux": "pnpm clean && pnpm build && pnpm electron-builder --linux -p never",
		"dist:linux:deb-arm64": "pnpm clean && pnpm build && pnpm electron-builder --linux deb:arm64 -p never",
		"dist:linux:rpm-arm64": "pnpm clean && pnpm build && pnpm electron-builder --linux rpm:arm64 -p never",
		"dist:mac": "pnpm clean && pnpm build && pnpm electron-builder --mac dmg:x64 -p never",
		"dist:mac:arm64": "pnpm clean && pnpm build && pnpm electron-builder --mac dmg:arm64 -p never",
		"dist:win": "pnpm clean && pnpm build && pnpm electron-builder --win -p never",
		"dist:win:x64": "pnpm clean && pnpm build && pnpm electron-builder --win nsis-web:x64 -p never",
		"generate-icons": "node scripts/generate-icons.js",
		"generate-ico": "node scripts/generate-ico.js",
		"dist:win:with-icons": "node scripts/build-with-icons.js",
		"build:web": "pnpm electron-vite build",
		"dist:android": "pnpm build:web && pnpm cap sync android",
		"dist:android:open": "pnpm dist:android && pnpm cap open android",
		"lint": "pnpm eslint ./src",
		"changelog": "pnpm dlx auto-changelog",
		"release:linux": "pnpm clean && pnpm build && pnpm electron-builder --linux -p always -c.snap.publish=github",
		"release:mac": "pnpm clean && pnpm build && pnpm electron-builder --mac -p always",
		"release:win": "pnpm clean && pnpm build && pnpm electron-builder --win -p always",
		"typecheck": "pnpm tsc -p tsconfig.json --noEmit"
	},
	engines: {
		"node": ">=22",
		"pnpm": ">=10"
	},
	pnpm: {
		"overrides": {
			"vite": "npm:rolldown-vite@7.1.8",
			"node-gyp": "11.4.2",
			"xml2js": "0.6.2",
			"node-fetch": "3.3.2",
			"@electron/universal": "3.0.1",
			"@babel/runtime": "7.28.4"
		},
		"patchedDependencies": {
			"vudio@2.1.1": "patches/vudio@2.1.1.patch",
			"@malept/flatpak-bundler@0.4.0": "patches/@malept__flatpak-bundler@0.4.0.patch",
			"kuromoji@0.1.2": "patches/kuromoji@0.1.2.patch",
			"file-type@16.5.4": "patches/file-type@16.5.4.patch",
			"electron-is@3.0.0": "patches/electron-is@3.0.0.patch",
			"mdui@2.1.4": "patches/mdui@2.1.4.patch"
		},
		"neverBuiltDependencies": []
	},
	dependencies: {
		"@dehoist/romanize-thai": "1.0.0",
		"@electron-toolkit/tsconfig": "1.0.1",
		"@electron/remote": "2.1.3",
		"@ffmpeg.wasm/core-mt": "0.12.0",
		"@ffmpeg.wasm/main": "0.12.0",
		"@floating-ui/dom": "1.7.4",
		"@foobar404/wave": "2.0.5",
		"@ghostery/adblocker-electron": "2.11.6",
		"@ghostery/adblocker-electron-preload": "2.11.6",
		"@hono/node-server": "1.19.1",
		"@hono/node-ws": "1.2.0",
		"@hono/swagger-ui": "0.5.2",
		"@hono/zod-openapi": "1.1.0",
		"@hono/zod-validator": "0.7.2",
		"@jellybrick/dbus-next": "0.10.3",
		"@jellybrick/electron-better-web-request": "1.0.4",
		"@jellybrick/mpris-service": "2.1.5",
		"@jimp/plugin-color": "1.6.0",
		"@mdui/icons": "^1.0.3",
		"@skyra/jaro-winkler": "1.1.1",
		"@xhayper/discord-rpc": "1.3.0",
		"async-mutex": "0.5.0",
		"bgutils-js": "3.2.0",
		"butterchurn": "3.0.0-beta.5",
		"butterchurn-presets": "3.0.0-beta.4",
		"color": "5.0.0",
		"conf": "14.0.0",
		"custom-electron-prompt": "1.5.8",
		"deepmerge-ts": "7.1.5",
		"delay": "6.0.0",
		"electron-debug": "4.1.0",
		"electron-is": "3.0.0",
		"electron-localshortcut": "3.2.1",
		"electron-store": "10.1.0",
		"electron-unhandled": "5.0.0",
		"electron-updater": "6.6.2",
		"es-hangul": "2.3.5",
		"fast-average-color": "9.5.0",
		"fast-equals": "5.2.2",
		"fflate": "0.8.2",
		"filenamify": "6.0.0",
		"hanja": "1.1.5",
		"happy-dom": "18.0.1",
		"hono": "4.9.6",
		"howler": "2.2.4",
		"html-to-text": "9.0.5",
		"i18next": "25.5.2",
		"jimp": "1.6.0",
		"keyboardevent-from-electron-accelerator": "2.0.0",
		"keyboardevents-areequal": "0.2.2",
		"kuromoji": "0.1.2",
		"kuroshiro": "1.2.0",
		"kuroshiro-analyzer-kuromoji": "1.1.0",
		"lazy-var": "2.2.2",
		"mdui": "2.1.4",
		"node-html-parser": "7.0.1",
		"node-id3": "0.2.9",
		"peerjs": "1.5.5",
		"semver": "7.7.2",
		"serve": "14.2.5",
		"socks": "2.8.7",
		"solid-element": "1.9.1",
		"solid-floating-ui": "0.3.1",
		"solid-js": "1.9.9",
		"solid-styled-components": "0.28.5",
		"solid-transition-group": "0.3.0",
		"tiny-pinyin": "1.3.2",
		"tinyld": "1.3.4",
		"virtua": "0.42.3",
		"vudio": "2.1.1",
		"x11": "2.3.0",
		"youtubei.js": "^16.0.1",
		"zod": "4.1.5"
	},
	devDependencies: {
		"@capacitor/android": "^7.4.4",
		"@capacitor/cli": "^7.4.4",
		"@capacitor/core": "^7.4.4",
		"@electron-toolkit/tsconfig": "1.0.1",
		"@eslint/js": "9.35.0",
		"@malept/flatpak-bundler": "0.4.0",
		"@playwright/test": "1.55.0",
		"@stylistic/eslint-plugin": "5.3.1",
		"@total-typescript/ts-reset": "0.6.1",
		"@types/electron-localshortcut": "3.1.3",
		"@types/howler": "2.2.12",
		"@types/html-to-text": "9.0.4",
		"@types/semver": "7.7.1",
		"@types/trusted-types": "2.0.7",
		"bufferutil": "4.0.9",
		"builtin-modules": "5.0.0",
		"cross-env": "10.0.0",
		"del-cli": "6.0.0",
		"discord-api-types": "0.38.23",
		"electron": "38.2.0",
		"electron-builder": "26.0.12",
		"electron-builder-squirrel-windows": "26.0.12",
		"electron-devtools-installer": "4.0.0",
		"electron-vite": "4.0.0",
		"eslint": "9.35.0",
		"eslint-config-prettier": "10.1.8",
		"eslint-import-resolver-exports": "1.0.0-beta.5",
		"eslint-import-resolver-typescript": "4.4.4",
		"eslint-plugin-import": "2.32.0",
		"eslint-plugin-prettier": "5.5.4",
		"eslint-plugin-solid": "0.14.5",
		"glob": "11.0.3",
		"node-gyp": "11.4.2",
		"playwright": "1.55.0",
		"ts-morph": "27.0.0",
		"typescript": "5.9.2",
		"typescript-eslint": "8.43.0",
		"utf-8-validate": "6.0.5",
		"vite": "npm:rolldown-vite@7.1.8",
		"vite-plugin-inspect": "11.3.3",
		"vite-plugin-resolve": "2.5.2",
		"vite-plugin-solid": "2.11.8",
		"ws": "8.18.3"
	},
	"auto-changelog": {
		"hideCredit": true,
		"package": true,
		"unreleased": true,
		"output": "changelog.md"
	}
};
var inAppMenuActive = await isEnabled("in-app-menu");
var pluginEnabledMenu = async (plugin, label = "", description$1 = void 0, isNew = false, hasSubmenu = false, refreshMenu$1 = void 0) => ({
	label: label || plugin,
	sublabel: isNew ? t("main.menu.plugins.new") : void 0,
	toolTip: description$1,
	type: "checkbox",
	checked: await isEnabled(plugin),
	click(item) {
		if (item.checked) enable(plugin);
		else disable(plugin);
		if (hasSubmenu) refreshMenu$1?.();
	}
});
const refreshMenu = async (win) => {
	await setApplicationMenu(win);
	if (inAppMenuActive) win.webContents.send("refresh-in-app-menu");
};
const mainMenuTemplate = async (win) => {
	const innerRefreshMenu = () => refreshMenu(win);
	const { navigationHistory } = win.webContents;
	await loadAllMenuPlugins(win);
	const allPluginsStubs = await allPlugins();
	const menuResult = await Promise.all(Object.entries(getAllMenuTemplate()).map(async ([id, template]) => {
		const plugin = allPluginsStubs[id];
		const pluginLabel = plugin?.name?.() ?? id;
		const pluginDescription = plugin?.description?.() ?? void 0;
		const isNew = plugin?.addedVersion ? (0, import_semver.satisfies)(package_default.version, plugin.addedVersion) : false;
		if (!await isEnabled(id)) return [id, await pluginEnabledMenu(id, pluginLabel, pluginDescription, isNew, true, innerRefreshMenu)];
		return [id, {
			label: pluginLabel,
			sublabel: isNew ? t("main.menu.plugins.new") : void 0,
			toolTip: pluginDescription,
			submenu: [
				await pluginEnabledMenu(id, t("main.menu.plugins.enabled"), void 0, false, true, innerRefreshMenu),
				{ type: "separator" },
				...template
			]
		}];
	}));
	const availablePlugins = Object.keys(await allPlugins());
	const pluginMenus = await Promise.all(availablePlugins.sort((a, b) => {
		const aPluginLabel = allPluginsStubs[a]?.name?.() ?? a;
		const bPluginLabel = allPluginsStubs[b]?.name?.() ?? b;
		return aPluginLabel.localeCompare(bPluginLabel);
	}).map((id) => {
		const predefinedTemplate = menuResult.find((it) => it[0] === id);
		if (predefinedTemplate) return predefinedTemplate[1];
		const plugin = allPluginsStubs[id];
		const pluginLabel = plugin?.name?.() ?? id;
		const pluginDescription = plugin?.description?.() ?? void 0;
		const isNew = plugin?.addedVersion ? (0, import_semver.satisfies)(package_default.version, plugin.addedVersion) : false;
		return pluginEnabledMenu(id, pluginLabel, pluginDescription, isNew, true, innerRefreshMenu);
	}));
	const langResources = await languageResources();
	const availableLanguages = Object.keys(langResources);
	return [
		{
			label: t("main.menu.plugins.label"),
			submenu: pluginMenus
		},
		{
			label: t("main.menu.options.label"),
			submenu: [
				{
					label: t("main.menu.options.submenu.auto-update"),
					type: "checkbox",
					checked: get("options.autoUpdates"),
					click(item) {
						setMenuOption("options.autoUpdates", item.checked);
					}
				},
				{
					label: t("main.menu.options.submenu.resume-on-start"),
					type: "checkbox",
					checked: get("options.resumeOnStart"),
					click(item) {
						setMenuOption("options.resumeOnStart", item.checked);
					}
				},
				{
					label: t("main.menu.options.submenu.starting-page.label"),
					submenu: (() => {
						const subMenuArray = Object.keys(startingPages).map((name$1) => ({
							label: name$1,
							type: "radio",
							checked: get("options.startingPage") === name$1,
							click() {
								set("options.startingPage", name$1);
							}
						}));
						subMenuArray.unshift({
							label: t("main.menu.options.submenu.starting-page.unset"),
							type: "radio",
							checked: get("options.startingPage") === "",
							click() {
								set("options.startingPage", "");
							}
						});
						return subMenuArray;
					})()
				},
				{
					label: t("main.menu.options.submenu.visual-tweaks.label"),
					submenu: [
						{
							label: t("main.menu.options.submenu.visual-tweaks.submenu.remove-upgrade-button"),
							type: "checkbox",
							checked: get("options.removeUpgradeButton"),
							click(item) {
								setMenuOption("options.removeUpgradeButton", item.checked);
							}
						},
						{
							label: t("main.menu.options.submenu.visual-tweaks.submenu.custom-window-title.label"),
							async click() {
								const output = await prompt({
									title: t("main.menu.options.submenu.visual-tweaks.submenu.custom-window-title.label"),
									label: t("main.menu.options.submenu.visual-tweaks.submenu.custom-window-title.prompt.label"),
									value: get("options.customWindowTitle") || "",
									type: "input",
									inputAttrs: {
										type: "text",
										placeholder: t("main.menu.options.submenu.visual-tweaks.submenu.custom-window-title.prompt.placeholder")
									},
									width: 500,
									...prompt_options_default()
								}, win);
								if (typeof output === "string") setMenuOption("options.customWindowTitle", output);
							}
						},
						{
							label: t("main.menu.options.submenu.visual-tweaks.submenu.like-buttons.label"),
							submenu: [
								{
									label: t("main.menu.options.submenu.visual-tweaks.submenu.like-buttons.default"),
									type: "radio",
									checked: !get("options.likeButtons"),
									click() {
										set("options.likeButtons", "");
									}
								},
								{
									label: t("main.menu.options.submenu.visual-tweaks.submenu.like-buttons.force-show"),
									type: "radio",
									checked: get("options.likeButtons") === "force",
									click() {
										set("options.likeButtons", "force");
									}
								},
								{
									label: t("main.menu.options.submenu.visual-tweaks.submenu.like-buttons.hide"),
									type: "radio",
									checked: get("options.likeButtons") === "hide",
									click() {
										set("options.likeButtons", "hide");
									}
								}
							]
						},
						{
							label: t("main.menu.options.submenu.visual-tweaks.submenu.theme.label"),
							submenu: [
								...(get("options.themes")?.length ?? 0) === 0 ? [{ label: t("main.menu.options.submenu.visual-tweaks.submenu.theme.submenu.no-theme") }] : [],
								...get("options.themes")?.map((theme) => ({
									type: "normal",
									label: theme,
									async click() {
										const { response } = await dialog.showMessageBox(win, {
											type: "question",
											defaultId: 1,
											title: t("main.menu.options.submenu.visual-tweaks.submenu.theme.dialog.remove-theme"),
											message: t("main.menu.options.submenu.visual-tweaks.submenu.theme.dialog.remove-theme-message", { theme }),
											buttons: [t("main.menu.options.submenu.visual-tweaks.submenu.theme.dialog.button.cancel"), t("main.menu.options.submenu.visual-tweaks.submenu.theme.dialog.button.remove")]
										});
										if (response === 1) {
											set("options.themes", get("options.themes")?.filter((t$1) => t$1 !== theme) ?? []);
											innerRefreshMenu();
										}
									}
								})) ?? [],
								{ type: "separator" },
								{
									label: t("main.menu.options.submenu.visual-tweaks.submenu.theme.submenu.import-css-file"),
									type: "normal",
									async click() {
										const { filePaths } = await dialog.showOpenDialog({
											filters: [{
												name: "CSS Files",
												extensions: ["css"]
											}],
											properties: ["openFile", "multiSelections"]
										});
										if (filePaths) {
											set("options.themes", filePaths);
											innerRefreshMenu();
										}
									}
								}
							]
						}
					]
				},
				{
					label: t("main.menu.options.submenu.single-instance-lock"),
					type: "checkbox",
					checked: true,
					click(item) {
						if (!item.checked && app.hasSingleInstanceLock()) app.releaseSingleInstanceLock();
						else if (item.checked && !app.hasSingleInstanceLock()) app.requestSingleInstanceLock();
					}
				},
				{
					label: t("main.menu.options.submenu.always-on-top"),
					type: "checkbox",
					checked: get("options.alwaysOnTop"),
					click(item) {
						setMenuOption("options.alwaysOnTop", item.checked);
						win.setAlwaysOnTop(item.checked);
					}
				},
				...import_is$1.default.windows() || import_is$1.default.linux() ? [{
					label: t("main.menu.options.submenu.hide-menu.label"),
					type: "checkbox",
					checked: get("options.hideMenu"),
					click(item) {
						setMenuOption("options.hideMenu", item.checked);
						if (item.checked && !get("options.hideMenuWarned")) dialog.showMessageBox(win, {
							type: "info",
							title: t("main.menu.options.submenu.hide-menu.dialog.title"),
							message: t("main.menu.options.submenu.hide-menu.dialog.message")
						});
					}
				}] : [],
				...import_is$1.default.windows() || import_is$1.default.macOS() ? [{
					label: t("main.menu.options.submenu.start-at-login"),
					type: "checkbox",
					checked: get("options.startAtLogin"),
					click(item) {
						setMenuOption("options.startAtLogin", item.checked);
					}
				}] : [],
				{
					label: t("main.menu.options.submenu.tray.label"),
					submenu: [
						{
							label: t("main.menu.options.submenu.tray.submenu.disabled"),
							type: "radio",
							checked: !get("options.tray"),
							click() {
								setMenuOption("options.tray", false);
								setMenuOption("options.appVisible", true);
							}
						},
						{
							label: t("main.menu.options.submenu.tray.submenu.enabled-and-show-app"),
							type: "radio",
							checked: get("options.tray") && get("options.appVisible"),
							click() {
								setMenuOption("options.tray", true);
								setMenuOption("options.appVisible", true);
							}
						},
						{
							label: t("main.menu.options.submenu.tray.submenu.enabled-and-hide-app"),
							type: "radio",
							checked: get("options.tray") && !get("options.appVisible"),
							click() {
								setMenuOption("options.tray", true);
								setMenuOption("options.appVisible", false);
							}
						},
						{ type: "separator" },
						{
							label: t("main.menu.options.submenu.tray.submenu.play-pause-on-click"),
							type: "checkbox",
							checked: get("options.trayClickPlayPause"),
							click(item) {
								setMenuOption("options.trayClickPlayPause", item.checked);
							}
						}
					]
				},
				{
					label: t("main.menu.options.submenu.language.label") + " (Language)",
					submenu: [{
						label: t("main.menu.options.submenu.language.submenu.to-help-translate"),
						type: "normal",
						click() {
							shell.openExternal("https://bit.ly/48n5YF7");
						}
					}].concat(availableLanguages.map((lang) => ({
						label: `${langResources[lang].translation.language?.name ?? "Unknown"} (${langResources[lang].translation.language?.["local-name"] ?? "Unknown"})`,
						type: "checkbox",
						checked: (get("options.language") ?? "en") === lang,
						click() {
							setMenuOption("options.language", lang);
							refreshMenu(win);
							setLanguage(lang);
							dialog.showMessageBox(win, {
								title: t("main.menu.options.submenu.language.dialog.title"),
								message: t("main.menu.options.submenu.language.dialog.message")
							});
						}
					})).sort((a, b) => a.label.localeCompare(b.label)))
				},
				{ type: "separator" },
				{
					label: t("main.menu.options.submenu.advanced-options.label"),
					submenu: [
						{
							label: t("main.menu.options.submenu.advanced-options.submenu.set-proxy.label"),
							type: "normal",
							async click(item) {
								await setProxy(item, win);
							}
						},
						{
							label: t("main.menu.options.submenu.advanced-options.submenu.override-user-agent"),
							type: "checkbox",
							checked: get("options.overrideUserAgent"),
							click(item) {
								setMenuOption("options.overrideUserAgent", item.checked);
							}
						},
						{
							label: t("main.menu.options.submenu.advanced-options.submenu.disable-hardware-acceleration"),
							type: "checkbox",
							checked: get("options.disableHardwareAcceleration"),
							click(item) {
								setMenuOption("options.disableHardwareAcceleration", item.checked);
							}
						},
						{
							label: t("main.menu.options.submenu.advanced-options.submenu.restart-on-config-changes"),
							type: "checkbox",
							checked: get("options.restartOnConfigChanges"),
							click(item) {
								setMenuOption("options.restartOnConfigChanges", item.checked);
							}
						},
						{
							label: t("main.menu.options.submenu.advanced-options.submenu.auto-reset-app-cache"),
							type: "checkbox",
							checked: get("options.autoResetAppCache"),
							click(item) {
								setMenuOption("options.autoResetAppCache", item.checked);
							}
						},
						{ type: "separator" },
						import_is$1.default.macOS() ? {
							label: t("main.menu.options.submenu.advanced-options.submenu.toggle-dev-tools"),
							click() {
								const { webContents } = win;
								if (webContents.isDevToolsOpened()) webContents.closeDevTools();
								else webContents.openDevTools();
							}
						} : {
							label: t("main.menu.options.submenu.advanced-options.submenu.toggle-dev-tools"),
							role: "toggleDevTools"
						},
						{
							label: t("main.menu.options.submenu.advanced-options.submenu.edit-config-json"),
							click() {
								edit();
							}
						}
					]
				}
			]
		},
		{
			label: t("main.menu.view.label"),
			submenu: [
				{
					label: t("main.menu.view.submenu.reload"),
					role: "reload"
				},
				{
					label: t("main.menu.view.submenu.force-reload"),
					role: "forceReload"
				},
				{ type: "separator" },
				{
					label: t("main.menu.view.submenu.zoom-in"),
					role: "zoomIn",
					accelerator: "CmdOrCtrl+=",
					visible: false
				},
				{
					label: t("main.menu.view.submenu.zoom-in"),
					role: "zoomIn",
					accelerator: "CmdOrCtrl+Plus"
				},
				{
					label: t("main.menu.view.submenu.zoom-out"),
					role: "zoomOut",
					accelerator: "CmdOrCtrl+-"
				},
				{
					label: t("main.menu.view.submenu.zoom-out"),
					role: "zoomOut",
					accelerator: "CmdOrCtrl+Shift+-",
					visible: false
				},
				{
					label: t("main.menu.view.submenu.reset-zoom"),
					role: "resetZoom"
				},
				{ type: "separator" },
				{
					label: t("main.menu.view.submenu.toggle-fullscreen"),
					role: "togglefullscreen"
				}
			]
		},
		{
			label: t("main.menu.navigation.label"),
			submenu: [
				{
					label: t("main.menu.navigation.submenu.go-back"),
					click() {
						if (navigationHistory.canGoBack()) navigationHistory.goBack();
					}
				},
				{
					label: t("main.menu.navigation.submenu.go-forward"),
					click() {
						if (navigationHistory.canGoForward()) navigationHistory.goForward();
					}
				},
				{
					label: t("main.menu.navigation.submenu.copy-current-url"),
					click() {
						const currentURL = win.webContents.getURL();
						clipboard.writeText(currentURL);
					}
				},
				{
					label: t("main.menu.navigation.submenu.restart"),
					click: restart
				},
				{
					label: t("main.menu.navigation.submenu.quit"),
					role: "quit"
				}
			]
		},
		{
			label: t("main.menu.about"),
			submenu: [
				{
					label: "Arvoxify Hakkında",
					click() { win.webContents.send("arvoxify:show-about-dialog"); }
				}
			]
		}
	];
};
const setApplicationMenu = async (win) => {
	const menuTemplate = [...await mainMenuTemplate(win)];
	if (process.platform === "darwin") {
		const { name: name$1 } = app;
		menuTemplate.unshift({
			label: name$1,
			submenu: [
				{
					label: "Arvoxify Hakkında",
					click() { win.webContents.send("arvoxify:show-about-dialog"); }
				},
				{ type: "separator" },
				{ role: "hide" },
				{ role: "hideOthers" },
				{ role: "unhide" },
				{ type: "separator" },
				{ role: "selectAll" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" },
				{ type: "separator" },
				{ role: "minimize" },
				{ role: "close" },
				{ role: "quit" }
			]
		});
	}
	const menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);
};
async function setProxy(item, win) {
	const output = await prompt({
		title: t("main.menu.options.submenu.advanced-options.submenu.set-proxy.prompt.title"),
		label: t("main.menu.options.submenu.advanced-options.submenu.set-proxy.prompt.label"),
		value: get("options.proxy"),
		type: "input",
		inputAttrs: {
			type: "url",
			placeholder: t("main.menu.options.submenu.advanced-options.submenu.set-proxy.prompt.placeholder")
		},
		width: 450,
		...prompt_options_default()
	}, win);
	if (typeof output === "string") {
		setMenuOption("options.proxy", output);
		item.checked = output !== "";
	} else item.checked = !item.checked;
}
const isTesting = () => process.env.NODE_ENV === "test";
var music_player_default = "ytmusic-nav-bar{position:relative}ytmusic-nav-bar:before{content:\"\";-webkit-user-select:none;-webkit-app-region:drag;position:absolute;inset:0}ytmusic-nav-bar>.left-content>*,ytmusic-nav-bar>.center-content>*,ytmusic-nav-bar>.right-content>*,iron-icon,ytmusic-pivot-bar-item-renderer,.tab-title,a{-webkit-app-region:no-drag}ytmusic-app-layout{--ytmusic-nav-bar-height:90px}img{user-select:none}ytmusic-cast-button,.ytp-chrome-top-buttons{display:none!important}ytmusic-nav-bar>div.left-content>a,ytmusic-nav-bar>div.left-content>a>picture>img{-webkit-user-drag:none}tp-yt-paper-item.ytmusic-guide-entry-renderer:before{border-radius:8px!important}#av-id{padding-bottom:0}#av-id~#player.ytmusic-player-page:not([player-ui-state=FULLSCREEN]){margin-left:var(--ytmusic-player-page-vertical-padding);margin-right:var(--ytmusic-player-page-vertical-padding);max-height:calc(100% - (var(--ytmusic-player-page-vertical-padding)*2));max-width:calc(100% - var(--ytmusic-player-page-vertical-padding)*2);margin-top:auto!important;margin-bottom:auto!important}:where([data-os*=Macintosh]) ytmusic-app-layout#layout ytmusic-nav-bar{padding-top:var(--ytmusic-nav-bar-offset,0)}:where([data-os*=Macintosh]) ytmusic-app-layout#layout{--ytmusic-nav-bar-offset:24px;--ytmusic-nav-bar-height:calc(90px + var(--ytmusic-nav-bar-offset,0))}tp-yt-iron-dropdown,tp-yt-paper-dialog{app-region:no-drag}";
var loadedPluginMap = {};
var createContext = (id, win) => ({
	getConfig: async () => deepmerge((await allPlugins())[id].config ?? { enabled: false }, get(`plugins.${id}`) ?? {}),
	setConfig: async (newConfig) => {
		setPartial(`plugins.${id}`, newConfig, (await allPlugins())[id].config);
	},
	ipc: {
		send: (event, ...args) => {
			win.webContents.send(event, ...args);
		},
		handle: (event, listener) => {
			ipcMain.handle(event, (_, ...args) => listener(...args));
		},
		on: (event, listener) => {
			ipcMain.on(event, (_, ...args) => {
				listener(...args);
			});
		},
		removeHandler: (event) => {
			ipcMain.removeHandler(event);
		}
	},
	window: win
});
const forceUnloadMainPlugin = async (id, win) => {
	const plugin = loadedPluginMap[id];
	if (!plugin) return;
	try {
		const hasStopped = await stopPlugin(id, plugin, {
			ctx: "backend",
			context: createContext(id, win)
		});
		if (hasStopped || hasStopped === null && typeof plugin.backend !== "function" && plugin.backend) {
			delete loadedPluginMap[id];
			console.log(LoggerPrefix, t("common.console.plugins.unloaded", { pluginName: id }));
			return;
		} else {
			const message = t("common.console.plugins.unload-failed", { pluginName: id });
			console.log(LoggerPrefix, message);
			return Promise.reject(new Error(message));
		}
	} catch (err) {
		console.error(LoggerPrefix, t("common.console.plugins.unload-failed", { pluginName: id }));
		console.trace(err);
		return Promise.reject(err);
	}
};
const forceLoadMainPlugin = async (id, win) => {
	const plugin = (await mainPlugins())[id];
	if (!plugin) return;
	try {
		const hasStarted = await startPlugin(id, plugin, {
			ctx: "backend",
			context: createContext(id, win)
		});
		if (hasStarted || hasStarted === null && typeof plugin.backend !== "function" && plugin.backend) loadedPluginMap[id] = plugin;
		else {
			const message = t("common.console.plugins.load-failed", { pluginName: id });
			console.log(LoggerPrefix, message);
			return Promise.reject(new Error(message));
		}
	} catch (err) {
		console.error(LoggerPrefix, t("common.console.plugins.initialize-failed", { pluginName: id }));
		console.trace(err);
		return Promise.reject(err);
	}
};
const loadAllMainPlugins = async (win) => {
	console.log(LoggerPrefix, t("common.console.plugins.load-all"));
	const pluginConfigs = getPlugins();
	const queue$1 = [];
	for (const [plugin, pluginDef] of Object.entries(await mainPlugins())) if (deepmerge(pluginDef.config, pluginConfigs[plugin] ?? {}).enabled) queue$1.push(forceLoadMainPlugin(plugin, win));
	else if (loadedPluginMap[plugin]) queue$1.push(forceUnloadMainPlugin(plugin, win));
	await Promise.allSettled(queue$1);
};
const getAllLoadedMainPlugins = () => {
	return loadedPluginMap;
};
var error_default = join$1(import.meta.dirname, "../../assets/error.html");
const defaultAuthProxyConfig = {
	enabled: false,
	hostname: "127.0.0.1",
	port: 4545
};
var import_is = /* @__PURE__ */ __toESM(require_is());
unhandled({
	logger: console.error,
	showDialog: false
});
var mainWindow;
/* Auto-update disabled for Arvoxify */ // import_main.autoUpdater.autoDownload = false;
if (!app.requestSingleInstanceLock()) app.exit();
protocol.registerSchemesAsPrivileged([
	{
		scheme: "http",
		privileges: {
			standard: true,
			bypassCSP: true,
			allowServiceWorkers: true,
			supportFetchAPI: true,
			corsEnabled: true,
			stream: true,
			codeCache: true
		}
	},
	{
		scheme: "https",
		privileges: {
			standard: true,
			bypassCSP: true,
			allowServiceWorkers: true,
			supportFetchAPI: true,
			corsEnabled: true,
			stream: true,
			codeCache: true
		}
	},
	{
		scheme: "mailto",
		privileges: { standard: true }
	}
]);
if (import_is.default.linux()) app.commandLine.appendSwitch("gtk-version", "3");
app.commandLine.appendSwitch("ozone-platform-hint", "auto");
app.commandLine.appendSwitch("enable-features", "OverlayScrollbar,SharedArrayBuffer,UseOzonePlatform,WaylandWindowDecorations");
app.commandLine.appendSwitch("disable-features", "FluentScrollbar");
if (get("options.disableHardwareAcceleration")) {
	if (import_is.default.dev()) console.log("Disabling hardware acceleration");
	app.disableHardwareAcceleration();
}
if (import_is.default.linux()) {
	app.setName("com.github.th_ch.pear_music");
	if (await isEnabled("shortcuts")) app.commandLine.appendSwitch("disable-features", "MediaSessionService");
}
if (get("options.proxy")) {
	const authProxyEnabled = await isEnabled("auth-proxy-adapter");
	let proxyToUse = "";
	if (authProxyEnabled) {
		const { hostname, port } = deepmerge(defaultAuthProxyConfig, get("plugins.auth-proxy-adapter") ?? {});
		proxyToUse = `socks5://${hostname}:${port}`;
	} else if (get("options.proxy")) proxyToUse = get("options.proxy");
	console.log(LoggerPrefix, `Using proxy: ${proxyToUse}`);
	app.commandLine.appendSwitch("proxy-server", proxyToUse);
}
debug({ showDevTools: false });
var icon = path.join(import.meta.dirname, "..", "assets", "logo.png");
if (process.platform === "win32") icon = path.join(import.meta.dirname, "..", "assets", "logo.ico");
else if (process.platform === "darwin") icon = path.join(import.meta.dirname, "..", "assets", "generated", "icon.icns");
function onClosed() {
	mainWindow = null;
}
ipcMain.handle("peard:get-main-plugin-names", async () => Object.keys(await mainPlugins()));
var initHook = async (win) => {
	const allPluginStubs = await allPlugins();
	ipcMain.handle("peard:get-config", (_, id) => deepmerge(allPluginStubs[id].config ?? { enabled: false }, get(`plugins.${id}`) ?? {}));
	ipcMain.handle("peard:set-config", (_, name$1, obj) => setPartial(`plugins.${name$1}`, obj, allPluginStubs[name$1].config));
	watch((newValue, oldValue) => {
		const newPluginConfigList = newValue?.plugins ?? {};
		const oldPluginConfigList = oldValue?.plugins ?? {};
		Object.entries(newPluginConfigList).forEach(([id, newPluginConfig]) => {
			if (!deepEqual(oldPluginConfigList[id], newPluginConfig)) {
				const oldConfig = oldPluginConfigList[id];
				const config = deepmerge(allPluginStubs[id].config ?? { enabled: false }, newPluginConfig ?? {});
				if (config.enabled !== oldConfig?.enabled) {
					if (config.enabled) {
						win.webContents.send("plugin:enable", id);
						ipcMain.emit("plugin:enable", id);
						forceLoadMainPlugin(id, win);
					} else {
						win.webContents.send("plugin:unload", id);
						ipcMain.emit("plugin:unload", id);
						forceUnloadMainPlugin(id, win);
					}
					if (allPluginStubs[id]?.restartNeeded) showNeedToRestartDialog(id);
				}
				const mainPlugin = getAllLoadedMainPlugins()[id];
				if (mainPlugin) {
					if (config.enabled && typeof mainPlugin.backend !== "function") mainPlugin.backend?.onConfigChange?.call(mainPlugin.backend, config);
				}
				win.webContents.send("config-changed", id, config);
			}
		});
	});
};
var showNeedToRestartDialog = async (id) => {
	const plugin = (await allPlugins())[id];
	const dialogOptions = {
		type: "info",
		buttons: [t("main.dialog.need-to-restart.buttons.restart-now"), t("main.dialog.need-to-restart.buttons.later")],
		title: t("main.dialog.need-to-restart.title"),
		message: t("main.dialog.need-to-restart.message", { pluginName: plugin?.name?.() ?? id }),
		detail: t("main.dialog.need-to-restart.detail", { pluginName: plugin?.name?.() ?? id }),
		defaultId: 0,
		cancelId: 1
	};
	let dialogPromise;
	if (mainWindow) dialogPromise = dialog.showMessageBox(mainWindow, dialogOptions);
	else dialogPromise = dialog.showMessageBox(dialogOptions);
	dialogPromise.then((dialogOutput) => {
		switch (dialogOutput.response) {
			case 0:
				restart();
				break;
			default: break;
		}
	});
};
function initTheme(win) {
	injectCSS(win.webContents, music_player_default);
	const themes = get("options.themes");
	if (Array.isArray(themes)) for (const cssFile of themes) fileExists(cssFile, () => {
		injectCSSAsFile(win.webContents, cssFile);
	}, () => {
		console.warn(LoggerPrefix, t("main.console.theme.css-file-not-found", { cssFile }));
	});
	win.webContents.once("did-finish-load", () => {
		if (import_is.default.dev()) {
			console.debug(LoggerPrefix, t("main.console.did-finish-load.dev-tools"));
			win.webContents.openDevTools();
		}
	});
}
async function createMainWindow() {
	const windowSize = get("window-size");
	const windowMaximized = get("window-maximized");
	const windowPosition = get("window-position");
	const useInlineMenu = await isEnabled("in-app-menu");
	const defaultTitleBarOverlayOptions = {
		color: "#00000000",
		symbolColor: "#ffffff",
		height: 32
	};
	const decorations = {
		frame: !import_is.default.macOS() && !useInlineMenu,
		titleBarOverlay: defaultTitleBarOverlayOptions,
		titleBarStyle: useInlineMenu ? "hidden" : import_is.default.macOS() ? "hiddenInset" : "default",
		autoHideMenuBar: get("options.hideMenu")
	};
	if (import_is.default.linux() && useInlineMenu) {
		delete decorations.titleBarOverlay;
		delete decorations.titleBarStyle;
	}
	const electronWindowSettings = {
		icon,
		width: windowSize.width,
		height: windowSize.height,
		minWidth: 325,
		minHeight: 425,
		backgroundColor: "#000",
		show: false,
		webPreferences: {
			contextIsolation: true,
			preload: path.join(import.meta.dirname, "..", "preload", "preload.cjs"),
			...isTesting() ? void 0 : { sandbox: false }
		},
		...decorations
	};
	const win = new BrowserWindow(electronWindowSettings);
	await initHook(win);
	initTheme(win);
	await loadAllMainPlugins(win);
	if (windowPosition) {
		const { x: windowX, y: windowY } = windowPosition;
		const winSize = win.getSize();
		const display = screen.getDisplayNearestPoint(windowPosition);
		const primaryDisplay = screen.getPrimaryDisplay();
		const scaleFactor = import_is.default.windows() ? primaryDisplay.scaleFactor / display.scaleFactor : 1;
		const scaledWidth = Math.floor(windowSize.width * scaleFactor);
		const scaledHeight = Math.floor(windowSize.height * scaleFactor);
		const scaledX = windowX;
		const scaledY = windowY;
		if (scaledX + scaledWidth / 2 < display.bounds.x - 8 || scaledX + scaledWidth / 2 > display.bounds.x + display.bounds.width || scaledY < display.bounds.y - 8 || scaledY + scaledHeight / 2 > display.bounds.y + display.bounds.height) {
			if (import_is.default.dev()) console.warn(LoggerPrefix, t("main.console.window.tried-to-render-offscreen", {
				windowSize: String(winSize),
				displaySize: JSON.stringify(display.bounds),
				position: JSON.stringify(windowPosition)
			}));
		} else {
			win.setSize(scaledWidth, scaledHeight);
			win.setPosition(scaledX, scaledY);
		}
	}
	if (windowMaximized) win.maximize();
	if (get("options.alwaysOnTop")) win.setAlwaysOnTop(true);
	const urlToLoad = get("options.resumeOnStart") ? get("url") : defaultConfig.url;
	win.on("closed", onClosed);
	win.on("move", () => {
		if (win.isMaximized()) return;
		const [x, y] = win.getPosition();
		lateSave("window-position", {
			x,
			y
		});
	});
	let winWasMaximized;
	win.on("resize", () => {
		const [width, height] = win.getSize();
		const isMaximized = win.isMaximized();
		if (winWasMaximized !== isMaximized) {
			winWasMaximized = isMaximized;
			set("window-maximized", isMaximized);
		}
		if (isMaximized) return;
		lateSave("window-size", {
			width,
			height
		});
	});
	const savedTimeouts = {};
	function lateSave(key, value, fn = set) {
		if (savedTimeouts[key]) clearTimeout(savedTimeouts[key]);
		savedTimeouts[key] = setTimeout(() => {
			fn(key, value);
			savedTimeouts[key] = void 0;
		}, 600);
	}
	app.on("render-process-gone", (_event, _webContents, details) => {
		showUnresponsiveDialog(win, details);
	});
	win.once("ready-to-show", () => {
		if (get("options.appVisible")) win.show();
	});
	removeContentSecurityPolicy();
	win.webContents.on("dom-ready", () => {
		if (useInlineMenu && import_is.default.windows()) win.setTitleBarOverlay({
			...defaultTitleBarOverlayOptions,
			height: Math.floor(defaultTitleBarOverlayOptions.height * win.webContents.getZoomFactor())
		});
	});
	win.webContents.on("will-redirect", (event) => {
		const url$1 = new URL(event.url);
		if (url$1.hostname.endsWith("youtube.com") && url$1.pathname === "/premium") {
			event.preventDefault();
			win.webContents.loadURL("https://accounts.google.com/ServiceLogin?ltmpl=music&service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26next%3Dhttps%253A%252F%252Fmusic.youtube.com%252F");
		}
	});
	win.webContents.loadURL(urlToLoad);
	return win;
}
app.once("browser-window-created", (_event, win) => {
	if (get("options.overrideUserAgent")) {
		const originalUserAgent = win.webContents.userAgent;
		const userAgents = {
			mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.152 Safari/537.36",
			windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.152 Safari/537.36",
			linux: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.152 Safari/537.36"
		};
		const updatedUserAgent = import_is.default.macOS() ? userAgents.mac : import_is.default.windows() ? userAgents.windows : userAgents.linux;
		win.webContents.userAgent = updatedUserAgent;
		app.userAgentFallback = updatedUserAgent;
		win.webContents.session.webRequest.onBeforeSendHeaders((details, cb) => {
			if (win.webContents.getURL().startsWith("https://accounts.google.com") && details.url.startsWith("https://accounts.google.com")) details.requestHeaders["User-Agent"] = originalUserAgent;
			cb({ requestHeaders: details.requestHeaders });
		});
	}
	setupSongInfo(win);
	setupAppControls();
	win.webContents.on("did-fail-load", (_event$1, errorCode, errorDescription, validatedURL, isMainFrame, frameProcessId, frameRoutingId) => {
		const log = JSON.stringify({
			error: "did-fail-load",
			errorCode,
			errorDescription,
			validatedURL,
			isMainFrame,
			frameProcessId,
			frameRoutingId
		}, null, "	");
		if (import_is.default.dev()) console.log(log);
		if (errorCode !== -3 && !new URL(validatedURL).hostname.includes("doubleclick.net")) {
			win.webContents.send("log", log);
			win.webContents.loadFile(error_default);
		}
	});
	win.webContents.on("will-prevent-unload", (event) => {
		event.preventDefault();
	});
	const customWindowTitle = get("options.customWindowTitle");
	if (customWindowTitle) win.on("page-title-updated", (event) => {
		event.preventDefault();
		win.setTitle(customWindowTitle);
	});
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
	globalShortcut.unregisterAll();
});
app.on("activate", async () => {
	if (mainWindow === null) mainWindow = await createMainWindow();
	else if (!mainWindow.isVisible()) mainWindow.show();
});
var getDefaultLocale = async (locale) => Object.keys(await languageResources()).includes(locale) ? locale : null;
app.whenReady().then(async () => {
	if (!get("options.language")) {
		const locale = await getDefaultLocale(app.getLocale());
		if (locale) set("options.language", locale);
	}
	await loadI18n().then(async () => {
		await setLanguage(get("options.language") ?? "en");
		console.log(LoggerPrefix, t("main.console.i18n.loaded"));
	});
	app.setAboutPanelOptions({ applicationName: "Arvoxify Hakkında", copyright: "chiatr tarafından, vox studios için!" });
	if (get("options.autoResetAppCache")) {
		const clearCacheTimeout = setTimeout(() => {
			if (import_is.default.dev()) console.log(LoggerPrefix, t("main.console.when-ready.clearing-cache-after-20s"));
			session.defaultSession.clearCache();
			clearTimeout(clearCacheTimeout);
		}, 2e4);
	}
	if (import_is.default.windows()) {
		const appID = "com.arvoxify.desktop";
		app.setAppUserModelId(appID);
		const appLocation = process.execPath;
		const appData = app.getPath("appData");
		if (!import_is.default.dev() && !appLocation.startsWith(path.join(appData, "..", "Local", "Temp"))) {
			const shortcutPath = path.join(appData, "Microsoft", "Windows", "Start Menu", "Programs", "Arvoxify.lnk");
			try {
				const shortcutDetails = shell.readShortcutLink(shortcutPath);
				if (shortcutDetails.target !== appLocation || shortcutDetails.appUserModelId !== appID) throw "needUpdate";
			} catch (error) {
				shell.writeShortcutLink(shortcutPath, error === "needUpdate" ? "update" : "create", {
					target: appLocation,
					cwd: path.dirname(appLocation),
					description: "Arvoxify App - beta testi",
					appUserModelId: appID
				});
			}
		}
	}
	ipcMain.on("get-renderer-script", (event) => {
		if (import_is.default.dev() && process.env.ELECTRON_RENDERER_URL) event.returnValue = [null, `
        console.log('${LoggerPrefix}', 'Loading vite from dev server');
        (async () => {
          await new Promise((resolve) => {
            if (document.readyState === 'loading') {
              console.log('${LoggerPrefix}', 'Waiting for DOM to load');
              document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
            } else {
              resolve();
            }
          });
          const viteScript = document.createElement('script');
          viteScript.type = 'module';
          viteScript.src = '${process.env.ELECTRON_RENDERER_URL}/@vite/client';
          const rendererScript = document.createElement('script');
          rendererScript.type = 'module';
          rendererScript.src = '${process.env.ELECTRON_RENDERER_URL}/renderer.ts';
          document.body.appendChild(viteScript);
          document.body.appendChild(rendererScript);
        })();
        0
      `];
		else {
			const rendererPath = path.join(import.meta.dirname, "..", "renderer");
			const scriptSrc = (0, import_dist.parse)(fs.readFileSync(path.join(rendererPath, "index.html"), "utf-8")).querySelector("script");
			const scriptPath = path.join(rendererPath, scriptSrc.getAttribute("src"));
			const scriptString = fs.readFileSync(scriptPath, "utf-8");
			event.returnValue = [url.pathToFileURL(scriptPath).toString(), scriptString + ";" + "\nif (typeof window !== \"undefined\" && window.ipcRenderer) {\n  window.ipcRenderer.on(\"arvoxify:show-about-dialog\", () => {\n    let modal = document.getElementById(\"arvoxify-custom-about-modal\");\n    if (!modal) {\n      modal = document.createElement(\"div\");\n      modal.id = \"arvoxify-custom-about-modal\";\n      modal.style.cssText = \"position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 999999; display: flex; align-items: center; justify-content: center; font-family: Roboto, 'Segoe UI', system-ui, sans-serif; animation: arvoxifyFadeIn 0.2s cubic-bezier(0,0,0.2,1);\";\n\n      if (!document.getElementById(\"arvoxify-modal-styles\")) {\n        const style = document.createElement(\"style\");\n        style.id = \"arvoxify-modal-styles\";\n        style.textContent = \"@keyframes arvoxifyFadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } } #arvoxify-about-close-btn:hover { background: rgba(255,255,255,0.1) !important; color: #ffffff !important; } #arvoxify-about-ok-btn:hover { background: #e0e0e0 !important; transform: scale(1.02); } #arvoxify-about-ok-btn:active { transform: scale(0.98); }\";\n        document.head.appendChild(style);\n      }\n\n      modal.innerHTML = `<div style=\"background: #181818; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05); width: 380px; max-width: 90vw; padding: 28px 24px; text-align: center; color: #ffffff; position: relative; display: flex; flex-direction: column; align-items: center;\">\n        <button id=\"arvoxify-about-close-btn\" style=\"position: absolute; top: 14px; right: 14px; background: transparent; border: none; color: #aaaaaa; font-size: 16px; cursor: pointer; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s;\">✕</button>\n        <img src=\"data:image/png;base64,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\" style=\"width: 72px; height: 72px; margin-bottom: 16px; border-radius: 14px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));\" />\n        <h2 style=\"margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #ffffff;\">Arvoxify Hakkında</h2>\n        <p style=\"margin: 8px 0 24px 0; font-size: 14px; color: #cccccc; line-height: 1.5; word-break: break-word;\">chiatr tarafından, vox studios için!</p>\n        <button id=\"arvoxify-about-ok-btn\" style=\"background: #ffffff; color: #000000; border: none; padding: 10px 36px; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background-color 0.15s, transform 0.15s;\">Tamam</button>\n      </div>`;\n\n      document.body.appendChild(modal);\n\n      const closeHandler = () => { modal.style.display = \"none\"; };\n      modal.querySelector(\"#arvoxify-about-close-btn\").onclick = closeHandler;\n      modal.querySelector(\"#arvoxify-about-ok-btn\").onclick = closeHandler;\n      modal.onclick = (e) => { if (e.target === modal) closeHandler(); };\n    } else {\n      modal.style.display = \"flex\";\n    }\n  });\n}\n" + ";0"];
		}
	});
	mainWindow = await createMainWindow();
	await setApplicationMenu(mainWindow);
	await refreshMenu(mainWindow);
	setUpTray(app, mainWindow);
	setupProtocolHandler(mainWindow);
	app.on("second-instance", (_, commandLine) => {
		const uri = `${APP_PROTOCOL}://`;
		const protocolArgv = commandLine.find((arg) => arg.startsWith(uri));
		if (protocolArgv) {
			const lastIndex = protocolArgv.endsWith("/") ? -1 : void 0;
			const command = protocolArgv.slice(uri.length, lastIndex);
			if (import_is.default.dev()) console.debug(LoggerPrefix, t("main.console.second-instance.receive-command", { command }));
			const commandParts = decodeURIComponent(command).split("?");
			const cmd = commandParts[0];
			const queryString = commandParts[1];
			if (queryString) {
				const url$1 = new URLSearchParams(queryString).get("url");
				if (url$1) handleProtocol(cmd, url$1);
				else handleProtocol(cmd);
			} else {
				const splited = cmd.split(" ");
				handleProtocol(splited.shift(), ...splited);
			}
			return;
		}
		if (!mainWindow) return;
		if (mainWindow.isMinimized()) mainWindow.restore();
		if (!mainWindow.isVisible()) mainWindow.show();
		mainWindow.focus();
	});
	app.setLoginItemSettings({ openAtLogin: get("options.startAtLogin") });
	/* Auto-update disabled for Arvoxify */
	if (get("options.hideMenu") && !get("options.hideMenuWarned")) {
		dialog.showMessageBox(mainWindow, {
			type: "info",
			title: t("main.dialog.hide-menu-enabled.title"),
			message: t("main.dialog.hide-menu-enabled.message")
		});
		set("options.hideMenuWarned", true);
	}
	if (import_is.default.macOS() && !get("options.appVisible")) app.dock?.hide();
	let forceQuit = false;
	app.on("before-quit", () => {
		forceQuit = true;
	});
	if (import_is.default.macOS() || get("options.tray")) mainWindow.on("close", (event) => {
		if (!forceQuit) {
			event.preventDefault();
			mainWindow.hide();
		}
	});
});
function showUnresponsiveDialog(win, details) {
	if (details) console.error(LoggerPrefix, t("main.console.unresponsive.details", { error: JSON.stringify(details, null, "	") }));
	dialog.showMessageBox(win, {
		type: "error",
		title: t("main.dialog.unresponsive.title"),
		message: t("main.dialog.unresponsive.message"),
		detail: t("main.dialog.unresponsive.detail"),
		buttons: [
			t("main.dialog.unresponsive.buttons.wait"),
			t("main.dialog.unresponsive.buttons.relaunch"),
			t("main.dialog.unresponsive.buttons.quit")
		],
		cancelId: 0
	}).then((result) => {
		switch (result.response) {
			case 1:
				restart();
				break;
			case 2:
				app.quit();
				break;
		}
	});
}
function removeContentSecurityPolicy(betterSession = session.defaultSession) {
	(0, import_store.default)(betterSession);
	betterSession.webRequest.onHeadersReceived((details, callback) => {
		details.responseHeaders ??= {};
		if (new URL(details.url).protocol === "https:") {
			delete details.responseHeaders["content-security-policy-report-only"];
			delete details.responseHeaders["Content-Security-Policy-Report-Only"];
			delete details.responseHeaders["content-security-policy"];
			delete details.responseHeaders["Content-Security-Policy"];
			if (!details.responseHeaders["access-control-allow-origin"] && !details.responseHeaders["Access-Control-Allow-Origin"]) details.responseHeaders["access-control-allow-origin"] = ["https://music.youtube.com"];
		}
		callback({
			cancel: false,
			responseHeaders: details.responseHeaders
		});
	});
	betterSession.webRequest.setResolver("onHeadersReceived", async (listeners) => {
		return listeners.reduce(async (accumulator, listener) => {
			const acc = await accumulator;
			if (acc.cancel) return acc;
			const result = await listener.apply();
			return {
				...accumulator,
				...result
			};
		}, Promise.resolve({ cancel: false }));
	});
}
export {};
