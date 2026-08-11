import { i as __require, t as __commonJSMin } from "./chunk-0rTXi_Jc.js";
import __cjs_mod__ from "node:module";
import.meta.filename;
import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
var require_ms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var s = 1e3;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	module.exports = function(val, options) {
		options = options || {};
		var type = typeof val;
		if (type === "string" && val.length > 0) return parse(val);
		else if (type === "number" && isFinite(val)) return options.long ? fmtLong(val) : fmtShort(val);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
	};
	function parse(str) {
		str = String(str);
		if (str.length > 100) return;
		var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
		if (!match) return;
		var n = parseFloat(match[1]);
		switch ((match[2] || "ms").toLowerCase()) {
			case "years":
			case "year":
			case "yrs":
			case "yr":
			case "y": return n * y;
			case "weeks":
			case "week":
			case "w": return n * w;
			case "days":
			case "day":
			case "d": return n * d;
			case "hours":
			case "hour":
			case "hrs":
			case "hr":
			case "h": return n * h;
			case "minutes":
			case "minute":
			case "mins":
			case "min":
			case "m": return n * m;
			case "seconds":
			case "second":
			case "secs":
			case "sec":
			case "s": return n * s;
			case "milliseconds":
			case "millisecond":
			case "msecs":
			case "msec":
			case "ms": return n;
			default: return;
		}
	}
	function fmtShort(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= 864e5) return Math.round(ms / d) + "d";
		if (msAbs >= 36e5) return Math.round(ms / h) + "h";
		if (msAbs >= 6e4) return Math.round(ms / m) + "m";
		if (msAbs >= 1e3) return Math.round(ms / s) + "s";
		return ms + "ms";
	}
	function fmtLong(ms) {
		var msAbs = Math.abs(ms);
		if (msAbs >= 864e5) return plural(ms, msAbs, d, "day");
		if (msAbs >= 36e5) return plural(ms, msAbs, h, "hour");
		if (msAbs >= 6e4) return plural(ms, msAbs, m, "minute");
		if (msAbs >= 1e3) return plural(ms, msAbs, s, "second");
		return ms + " ms";
	}
	function plural(ms, msAbs, n, name) {
		var isPlural = msAbs >= n * 1.5;
		return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
	}
}));
var require_common = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function setup(env$1) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = require_ms();
		createDebug.destroy = destroy;
		Object.keys(env$1).forEach((key) => {
			createDebug[key] = env$1[key];
		});
		createDebug.names = [];
		createDebug.skips = [];
		createDebug.formatters = {};
		function selectColor(namespace) {
			let hash = 0;
			for (let i = 0; i < namespace.length; i++) {
				hash = (hash << 5) - hash + namespace.charCodeAt(i);
				hash |= 0;
			}
			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;
			function debug$1(...args) {
				if (!debug$1.enabled) return;
				const self = debug$1;
				const curr = Number(/* @__PURE__ */ new Date());
				self.diff = curr - (prevTime || curr);
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;
				args[0] = createDebug.coerce(args[0]);
				if (typeof args[0] !== "string") args.unshift("%O");
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					if (match === "%%") return "%";
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === "function") {
						const val = args[index];
						match = formatter.call(self, val);
						args.splice(index, 1);
						index--;
					}
					return match;
				});
				createDebug.formatArgs.call(self, args);
				(self.log || createDebug.log).apply(self, args);
			}
			debug$1.namespace = namespace;
			debug$1.useColors = createDebug.useColors();
			debug$1.color = createDebug.selectColor(namespace);
			debug$1.extend = extend;
			debug$1.destroy = createDebug.destroy;
			Object.defineProperty(debug$1, "enabled", {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) return enableOverride;
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}
					return enabledCache;
				},
				set: (v) => {
					enableOverride = v;
				}
			});
			if (typeof createDebug.init === "function") createDebug.init(debug$1);
			return debug$1;
		}
		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;
			createDebug.names = [];
			createDebug.skips = [];
			const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
			for (const ns of split) if (ns[0] === "-") createDebug.skips.push(ns.slice(1));
			else createDebug.names.push(ns);
		}
		function matchesTemplate(search, template) {
			let searchIndex = 0;
			let templateIndex = 0;
			let starIndex = -1;
			let matchIndex = 0;
			while (searchIndex < search.length) if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) if (template[templateIndex] === "*") {
				starIndex = templateIndex;
				matchIndex = searchIndex;
				templateIndex++;
			} else {
				searchIndex++;
				templateIndex++;
			}
			else if (starIndex !== -1) {
				templateIndex = starIndex + 1;
				matchIndex++;
				searchIndex = matchIndex;
			} else return false;
			while (templateIndex < template.length && template[templateIndex] === "*") templateIndex++;
			return templateIndex === template.length;
		}
		function disable() {
			const namespaces = [...createDebug.names, ...createDebug.skips.map((namespace) => "-" + namespace)].join(",");
			createDebug.enable("");
			return namespaces;
		}
		function enabled(name) {
			for (const skip of createDebug.skips) if (matchesTemplate(name, skip)) return false;
			for (const ns of createDebug.names) if (matchesTemplate(name, ns)) return true;
			return false;
		}
		function coerce(val) {
			if (val instanceof Error) return val.stack || val.message;
			return val;
		}
		function destroy() {
			console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
		}
		createDebug.enable(createDebug.load());
		return createDebug;
	}
	module.exports = setup;
}));
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	exports.formatArgs = formatArgs$1;
	exports.save = save$1;
	exports.load = load$1;
	exports.useColors = useColors$1;
	exports.storage = localstorage();
	exports.destroy = (() => {
		let warned = false;
		return () => {
			if (!warned) {
				warned = true;
				console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
			}
		};
	})();
	exports.colors = [
		"#0000CC",
		"#0000FF",
		"#0033CC",
		"#0033FF",
		"#0066CC",
		"#0066FF",
		"#0099CC",
		"#0099FF",
		"#00CC00",
		"#00CC33",
		"#00CC66",
		"#00CC99",
		"#00CCCC",
		"#00CCFF",
		"#3300CC",
		"#3300FF",
		"#3333CC",
		"#3333FF",
		"#3366CC",
		"#3366FF",
		"#3399CC",
		"#3399FF",
		"#33CC00",
		"#33CC33",
		"#33CC66",
		"#33CC99",
		"#33CCCC",
		"#33CCFF",
		"#6600CC",
		"#6600FF",
		"#6633CC",
		"#6633FF",
		"#66CC00",
		"#66CC33",
		"#9900CC",
		"#9900FF",
		"#9933CC",
		"#9933FF",
		"#99CC00",
		"#99CC33",
		"#CC0000",
		"#CC0033",
		"#CC0066",
		"#CC0099",
		"#CC00CC",
		"#CC00FF",
		"#CC3300",
		"#CC3333",
		"#CC3366",
		"#CC3399",
		"#CC33CC",
		"#CC33FF",
		"#CC6600",
		"#CC6633",
		"#CC9900",
		"#CC9933",
		"#CCCC00",
		"#CCCC33",
		"#FF0000",
		"#FF0033",
		"#FF0066",
		"#FF0099",
		"#FF00CC",
		"#FF00FF",
		"#FF3300",
		"#FF3333",
		"#FF3366",
		"#FF3399",
		"#FF33CC",
		"#FF33FF",
		"#FF6600",
		"#FF6633",
		"#FF9900",
		"#FF9933",
		"#FFCC00",
		"#FFCC33"
	];
	function useColors$1() {
		if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return true;
		if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
		let m$1;
		return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m$1 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m$1[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}
	function formatArgs$1(args) {
		args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
		if (!this.useColors) return;
		const c = "color: " + this.color;
		args.splice(1, 0, c, "color: inherit");
		let index = 0;
		let lastC = 0;
		args[0].replace(/%[a-zA-Z%]/g, (match) => {
			if (match === "%%") return;
			index++;
			if (match === "%c") lastC = index;
		});
		args.splice(lastC, 0, c);
	}
	exports.log = console.debug || console.log || (() => {});
	function save$1(namespaces) {
		try {
			if (namespaces) exports.storage.setItem("debug", namespaces);
			else exports.storage.removeItem("debug");
		} catch (error) {}
	}
	function load$1() {
		let r;
		try {
			r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
		} catch (error) {}
		if (!r && typeof process !== "undefined" && "env" in process) r = process.env.DEBUG;
		return r;
	}
	function localstorage() {
		try {
			return localStorage;
		} catch (error) {}
	}
	module.exports = require_common()(exports);
	var { formatters: formatters$1 } = module.exports;
	formatters$1.j = function(v) {
		try {
			return JSON.stringify(v);
		} catch (error) {
			return "[UnexpectedJSONParseError]: " + error.message;
		}
	};
}));
var require_has_flag = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (flag, argv = process.argv) => {
		const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf("--");
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
}));
var require_supports_color = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var os = __require("os");
	var tty$1 = __require("tty");
	var hasFlag = require_has_flag();
	var { env } = process;
	var forceColor;
	if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) forceColor = 0;
	else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) forceColor = 1;
	if ("FORCE_COLOR" in env) if (env.FORCE_COLOR === "true") forceColor = 1;
	else if (env.FORCE_COLOR === "false") forceColor = 0;
	else forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	function translateLevel(level) {
		if (level === 0) return false;
		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}
	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) return 0;
		if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
		if (hasFlag("color=256")) return 2;
		if (haveStream && !streamIsTTY && forceColor === void 0) return 0;
		const min = forceColor || 0;
		if (env.TERM === "dumb") return min;
		if (process.platform === "win32") {
			const osRelease = os.release().split(".");
			if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
			return 1;
		}
		if ("CI" in env) {
			if ([
				"TRAVIS",
				"CIRCLECI",
				"APPVEYOR",
				"GITLAB_CI",
				"GITHUB_ACTIONS",
				"BUILDKITE"
			].some((sign) => sign in env) || env.CI_NAME === "codeship") return 1;
			return min;
		}
		if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		if (env.COLORTERM === "truecolor") return 3;
		if ("TERM_PROGRAM" in env) {
			const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
			switch (env.TERM_PROGRAM) {
				case "iTerm.app": return version >= 3 ? 3 : 2;
				case "Apple_Terminal": return 2;
			}
		}
		if (/-256(color)?$/i.test(env.TERM)) return 2;
		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
		if ("COLORTERM" in env) return 1;
		return min;
	}
	function getSupportLevel(stream) {
		const level = supportsColor(stream, stream && stream.isTTY);
		return translateLevel(level);
	}
	module.exports = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(true, tty$1.isatty(1))),
		stderr: translateLevel(supportsColor(true, tty$1.isatty(2)))
	};
}));
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var tty = __require("tty");
	var util = __require("util");
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.destroy = util.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
	exports.colors = [
		6,
		2,
		3,
		4,
		5,
		1
	];
	try {
		const supportsColor$1 = require_supports_color();
		if (supportsColor$1 && (supportsColor$1.stderr || supportsColor$1).level >= 2) exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	} catch (error) {}
	exports.inspectOpts = Object.keys(process.env).filter((key) => {
		return /^debug_/i.test(key);
	}).reduce((obj, key) => {
		const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});
		let val = process.env[key];
		if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
		else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
		else if (val === "null") val = null;
		else val = Number(val);
		obj[prop] = val;
		return obj;
	}, {});
	function useColors() {
		return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
	}
	function formatArgs(args) {
		const { namespace: name, useColors: useColors$2 } = this;
		if (useColors$2) {
			const c = this.color;
			const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
			const prefix = `  ${colorCode};1m${name} \u001B[0m`;
			args[0] = prefix + args[0].split("\n").join("\n" + prefix);
			args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
		} else args[0] = getDate() + name + " " + args[0];
	}
	function getDate() {
		if (exports.inspectOpts.hideDate) return "";
		return (/* @__PURE__ */ new Date()).toISOString() + " ";
	}
	function log(...args) {
		return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
	}
	function save(namespaces) {
		if (namespaces) process.env.DEBUG = namespaces;
		else delete process.env.DEBUG;
	}
	function load() {
		return process.env.DEBUG;
	}
	function init(debug$1) {
		debug$1.inspectOpts = {};
		const keys = Object.keys(exports.inspectOpts);
		for (let i = 0; i < keys.length; i++) debug$1.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
	module.exports = require_common()(exports);
	var { formatters } = module.exports;
	formatters.o = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
	};
	formatters.O = function(v) {
		this.inspectOpts.colors = this.useColors;
		return util.inspect(v, this.inspectOpts);
	};
}));
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) module.exports = require_browser();
	else module.exports = require_node();
}));
var require_electron_is_accelerator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var modifiers$1 = /^(Command|Cmd|Control|Ctrl|CommandOrControl|CmdOrCtrl|Alt|Option|AltGr|Shift|Super)$/;
	var keyCodes$1 = /^([0-9A-Z)!@#$%^&*(:+<_>?~{|}";=,\-./`[\\\]']|F1*[1-9]|F10|F2[0-4]|Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen)$/;
	module.exports = function(str) {
		let parts = str.split("+");
		let keyFound = false;
		return parts.every((val, index) => {
			const isKey = keyCodes$1.test(val);
			const isModifier = modifiers$1.test(val);
			if (isKey) {
				if (keyFound) return false;
				keyFound = true;
			}
			if (index === parts.length - 1 && !keyFound) return false;
			return isKey || isModifier;
		});
	};
}));
var require_keyboardevents_areequal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _lower(key) {
		if (typeof key !== "string") return key;
		return key.toLowerCase();
	}
	function areEqual(ev1, ev2) {
		if (ev1 === ev2) return true;
		for (const prop of [
			"altKey",
			"ctrlKey",
			"shiftKey",
			"metaKey"
		]) {
			const [value1, value2] = [ev1[prop], ev2[prop]];
			if (Boolean(value1) !== Boolean(value2)) return false;
		}
		if (_lower(ev1.key) === _lower(ev2.key) && ev1.key !== void 0 || ev1.code === ev2.code && ev1.code !== void 0) return true;
		return false;
	}
	module.exports = areEqual;
}));
var require_keyboardevent_from_electron_accelerator = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var modifiers = /^(CommandOrControl|CmdOrCtrl|Command|Cmd|Control|Ctrl|AltGr|Option|Alt|Shift|Super)/i;
	var keyCodes = /^(Plus|Space|Tab|Backspace|Delete|Insert|Return|Enter|Up|Down|Left|Right|Home|End|PageUp|PageDown|Escape|Esc|VolumeUp|VolumeDown|VolumeMute|MediaNextTrack|MediaPreviousTrack|MediaStop|MediaPlayPause|PrintScreen|F24|F23|F22|F21|F20|F19|F18|F17|F16|F15|F14|F13|F12|F11|F10|F9|F8|F7|F6|F5|F4|F3|F2|F1|[0-9A-Z)!@#$%^&*(:+<_>?~{|}";=,\-./`[\\\]'])/i;
	var UNSUPPORTED = {};
	function _command(accelerator, event, modifier) {
		if (process.platform !== "darwin") return UNSUPPORTED;
		if (event.metaKey) throw new Error("Double `Command` modifier specified.");
		return {
			event: Object.assign({}, event, { metaKey: true }),
			accelerator: accelerator.slice(modifier.length)
		};
	}
	function _super(accelerator, event, modifier) {
		if (event.metaKey) throw new Error("Double `Super` modifier specified.");
		return {
			event: Object.assign({}, event, { metaKey: true }),
			accelerator: accelerator.slice(modifier.length)
		};
	}
	function _commandorcontrol(accelerator, event, modifier) {
		if (process.platform === "darwin") {
			if (event.metaKey) throw new Error("Double `Command` modifier specified.");
			return {
				event: Object.assign({}, event, { metaKey: true }),
				accelerator: accelerator.slice(modifier.length)
			};
		}
		if (event.ctrlKey) throw new Error("Double `Control` modifier specified.");
		return {
			event: Object.assign({}, event, { ctrlKey: true }),
			accelerator: accelerator.slice(modifier.length)
		};
	}
	function _alt(accelerator, event, modifier) {
		if (modifier === "option" && process.platform !== "darwin") return UNSUPPORTED;
		if (event.altKey) throw new Error("Double `Alt` modifier specified.");
		return {
			event: Object.assign({}, event, { altKey: true }),
			accelerator: accelerator.slice(modifier.length)
		};
	}
	function _shift(accelerator, event, modifier) {
		if (event.shiftKey) throw new Error("Double `Shift` modifier specified.");
		return {
			event: Object.assign({}, event, { shiftKey: true }),
			accelerator: accelerator.slice(modifier.length)
		};
	}
	function _control(accelerator, event, modifier) {
		if (event.ctrlKey) throw new Error("Double `Control` modifier specified.");
		return {
			event: Object.assign({}, event, { ctrlKey: true }),
			accelerator: accelerator.slice(modifier.length)
		};
	}
	function reduceModifier({ accelerator, event }, modifier) {
		switch (modifier) {
			case "command":
			case "cmd": return _command(accelerator, event, modifier);
			case "super": return _super(accelerator, event, modifier);
			case "control":
			case "ctrl": return _control(accelerator, event, modifier);
			case "commandorcontrol":
			case "cmdorctrl": return _commandorcontrol(accelerator, event, modifier);
			case "option":
			case "altgr":
			case "alt": return _alt(accelerator, event, modifier);
			case "shift": return _shift(accelerator, event, modifier);
			default: console.error(modifier);
		}
	}
	function reducePlus({ accelerator, event }) {
		return {
			event,
			accelerator: accelerator.trim().slice(1)
		};
	}
	var virtualKeyCodes = {
		0: "Digit0",
		1: "Digit1",
		2: "Digit2",
		3: "Digit3",
		4: "Digit4",
		5: "Digit5",
		6: "Digit6",
		7: "Digit7",
		8: "Digit8",
		9: "Digit9",
		"-": "Minus",
		"=": "Equal",
		Q: "KeyQ",
		W: "KeyW",
		E: "KeyE",
		R: "KeyR",
		T: "KeyT",
		Y: "KeyY",
		U: "KeyU",
		I: "KeyI",
		O: "KeyO",
		P: "KeyP",
		"[": "BracketLeft",
		"]": "BracketRight",
		A: "KeyA",
		S: "KeyS",
		D: "KeyD",
		F: "KeyF",
		G: "KeyG",
		H: "KeyH",
		J: "KeyJ",
		K: "KeyK",
		L: "KeyL",
		";": "Semicolon",
		"'": "Quote",
		"`": "Backquote",
		"/": "Backslash",
		Z: "KeyZ",
		X: "KeyX",
		C: "KeyC",
		V: "KeyV",
		B: "KeyB",
		N: "KeyN",
		M: "KeyM",
		",": "Comma",
		".": "Period",
		"\\": "Slash",
		" ": "Space"
	};
	function reduceKey({ accelerator, event }, key) {
		if (key.length > 1 || event.key) throw new Error(`Unvalid keycode \`${key}\`.`);
		const code = key.toUpperCase() in virtualKeyCodes ? virtualKeyCodes[key.toUpperCase()] : null;
		return {
			event: Object.assign({}, event, { key }, code ? { code } : null),
			accelerator: accelerator.trim().slice(key.length)
		};
	}
	var domKeys = Object.assign(Object.create(null), {
		plus: "Add",
		space: "Space",
		tab: "Tab",
		backspace: "Backspace",
		delete: "Delete",
		insert: "Insert",
		return: "Return",
		enter: "Return",
		up: "ArrowUp",
		down: "ArrowDown",
		left: "ArrowLeft",
		right: "ArrowRight",
		home: "Home",
		end: "End",
		pageup: "PageUp",
		pagedown: "PageDown",
		escape: "Escape",
		esc: "Escape",
		volumeup: "AudioVolumeUp",
		volumedown: "AudioVolumeDown",
		volumemute: "AudioVolumeMute",
		medianexttrack: "MediaTrackNext",
		mediaprevioustrack: "MediaTrackPrevious",
		mediastop: "MediaStop",
		mediaplaypause: "MediaPlayPause",
		printscreen: "PrintScreen"
	});
	for (let i = 1; i <= 24; i++) domKeys[`f${i}`] = `F${i}`;
	function reduceCode({ accelerator, event }, { code, key }) {
		if (event.code) throw new Error(`Duplicated keycode \`${key}\`.`);
		return {
			event: Object.assign({}, event, { key }, code ? { code } : null),
			accelerator: accelerator.trim().slice(key && key.length || 0)
		};
	}
	function toKeyEvent$1(accelerator) {
		let state = {
			accelerator,
			event: {}
		};
		while (state.accelerator !== "") {
			const modifierMatch = state.accelerator.match(modifiers);
			if (modifierMatch) {
				const modifier = modifierMatch[0].toLowerCase();
				state = reduceModifier(state, modifier);
				if (state === UNSUPPORTED) return { unsupportedKeyForPlatform: true };
			} else if (state.accelerator.trim()[0] === "+") state = reducePlus(state);
			else {
				const codeMatch = state.accelerator.match(keyCodes);
				if (codeMatch) {
					const code = codeMatch[0].toLowerCase();
					if (code in domKeys) state = reduceCode(state, {
						code: domKeys[code],
						key: code
					});
					else state = reduceKey(state, code);
				} else throw new Error(`Unvalid accelerator: "${state.accelerator}"`);
			}
		}
		return state.event;
	}
	module.exports = {
		UNSUPPORTED,
		reduceModifier,
		reducePlus,
		reduceKey,
		reduceCode,
		toKeyEvent: toKeyEvent$1
	};
}));
var require_electron_localshortcut = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { app, BrowserWindow } = __require("electron");
	var isAccelerator = require_electron_is_accelerator();
	var equals = require_keyboardevents_areequal();
	var { toKeyEvent } = require_keyboardevent_from_electron_accelerator();
	var debug = require_src()("electron-localshortcut");
	var ANY_WINDOW = {};
	var windowsWithShortcuts = /* @__PURE__ */ new WeakMap();
	var title = (win) => {
		if (win) try {
			return win.getTitle();
		} catch (error) {
			return "A destroyed window";
		}
		return "An falsy value";
	};
	function _checkAccelerator(accelerator) {
		if (!isAccelerator(accelerator)) {
			const w$1 = {};
			Error.captureStackTrace(w$1);
			const stack = w$1.stack ? w$1.stack.split("\n").slice(4).join("\n") : w$1.message;
			const msg = `
WARNING: ${accelerator} is not a valid accelerator.

${stack}
`;
			console.error(msg);
		}
	}
	function disableAll(win) {
		debug(`Disabling all shortcuts on window ${title(win)}`);
		const wc = win.webContents;
		const shortcutsOfWindow = windowsWithShortcuts.get(wc);
		for (const shortcut of shortcutsOfWindow) shortcut.enabled = false;
	}
	function enableAll(win) {
		debug(`Enabling all shortcuts on window ${title(win)}`);
		const wc = win.webContents;
		const shortcutsOfWindow = windowsWithShortcuts.get(wc);
		for (const shortcut of shortcutsOfWindow) shortcut.enabled = true;
	}
	function unregisterAll(win) {
		debug(`Unregistering all shortcuts on window ${title(win)}`);
		const wc = win.webContents;
		const shortcutsOfWindow = windowsWithShortcuts.get(wc);
		if (shortcutsOfWindow && shortcutsOfWindow.removeListener) {
			shortcutsOfWindow.removeListener();
			windowsWithShortcuts.delete(wc);
		}
	}
	function _normalizeEvent(input) {
		const normalizedEvent = {
			code: input.code,
			key: input.key
		};
		[
			"alt",
			"shift",
			"meta"
		].forEach((prop) => {
			if (typeof input[prop] !== "undefined") normalizedEvent[`${prop}Key`] = input[prop];
		});
		if (typeof input.control !== "undefined") normalizedEvent.ctrlKey = input.control;
		return normalizedEvent;
	}
	function _findShortcut(event, shortcutsOfWindow) {
		let i = 0;
		for (const shortcut of shortcutsOfWindow) {
			if (equals(shortcut.eventStamp, event)) return i;
			i++;
		}
		return -1;
	}
	var _onBeforeInput = (shortcutsOfWindow) => (e, input) => {
		if (input.type === "keyUp") return;
		const event = _normalizeEvent(input);
		debug(`before-input-event: ${input} is translated to: ${event}`);
		for (const { eventStamp, callback } of shortcutsOfWindow) {
			if (equals(eventStamp, event)) {
				debug(`eventStamp: ${eventStamp} match`);
				callback();
				return;
			}
			debug(`eventStamp: ${eventStamp} no match`);
		}
	};
	function register(win, accelerator, callback) {
		let wc;
		if (typeof callback === "undefined") {
			wc = ANY_WINDOW;
			callback = accelerator;
			accelerator = win;
		} else wc = win.webContents;
		if (Array.isArray(accelerator) === true) {
			accelerator.forEach((accelerator$1) => {
				if (typeof accelerator$1 === "string") register(win, accelerator$1, callback);
			});
			return;
		}
		debug(`Registering callback for ${accelerator} on window ${title(win)}`);
		_checkAccelerator(accelerator);
		debug(`${accelerator} seems a valid shortcut sequence.`);
		let shortcutsOfWindow;
		if (windowsWithShortcuts.has(wc)) {
			debug("Window has others shortcuts registered.");
			shortcutsOfWindow = windowsWithShortcuts.get(wc);
		} else {
			debug("This is the first shortcut of the window.");
			shortcutsOfWindow = [];
			windowsWithShortcuts.set(wc, shortcutsOfWindow);
			if (wc === ANY_WINDOW) {
				const keyHandler = _onBeforeInput(shortcutsOfWindow);
				const enableAppShortcuts = (e, win$1) => {
					const wc$1 = win$1.webContents;
					wc$1.on("before-input-event", keyHandler);
					wc$1.once("closed", () => wc$1.removeListener("before-input-event", keyHandler));
				};
				BrowserWindow.getAllWindows().forEach((win$1) => enableAppShortcuts(null, win$1));
				app.on("browser-window-created", enableAppShortcuts);
				shortcutsOfWindow.removeListener = () => {
					BrowserWindow.getAllWindows().forEach((win$1) => win$1.webContents.removeListener("before-input-event", keyHandler));
					app.removeListener("browser-window-created", enableAppShortcuts);
				};
			} else {
				const keyHandler = _onBeforeInput(shortcutsOfWindow);
				wc.on("before-input-event", keyHandler);
				shortcutsOfWindow.removeListener = () => wc.removeListener("before-input-event", keyHandler);
				wc.once("closed", shortcutsOfWindow.removeListener);
			}
		}
		debug("Adding shortcut to window set.");
		const eventStamp = toKeyEvent(accelerator);
		shortcutsOfWindow.push({
			eventStamp,
			callback,
			enabled: true
		});
		debug("Shortcut registered.");
	}
	function unregister(win, accelerator) {
		let wc;
		if (typeof accelerator === "undefined") {
			wc = ANY_WINDOW;
			accelerator = win;
		} else {
			if (win.isDestroyed()) {
				debug("Early return because window is destroyed.");
				return;
			}
			wc = win.webContents;
		}
		if (Array.isArray(accelerator) === true) {
			accelerator.forEach((accelerator$1) => {
				if (typeof accelerator$1 === "string") unregister(win, accelerator$1);
			});
			return;
		}
		debug(`Unregistering callback for ${accelerator} on window ${title(win)}`);
		_checkAccelerator(accelerator);
		debug(`${accelerator} seems a valid shortcut sequence.`);
		if (!windowsWithShortcuts.has(wc)) {
			debug("Early return because window has never had shortcuts registered.");
			return;
		}
		const shortcutsOfWindow = windowsWithShortcuts.get(wc);
		const eventStamp = toKeyEvent(accelerator);
		const shortcutIdx = _findShortcut(eventStamp, shortcutsOfWindow);
		if (shortcutIdx === -1) return;
		shortcutsOfWindow.splice(shortcutIdx, 1);
		if (shortcutsOfWindow.length === 0) {
			shortcutsOfWindow.removeListener();
			windowsWithShortcuts.delete(wc);
		}
	}
	function isRegistered(win, accelerator) {
		_checkAccelerator(accelerator);
		const wc = win.webContents;
		const shortcutsOfWindow = windowsWithShortcuts.get(wc);
		const eventStamp = toKeyEvent(accelerator);
		return _findShortcut(eventStamp, shortcutsOfWindow) !== -1;
	}
	module.exports = {
		register,
		unregister,
		isRegistered,
		unregisterAll,
		enableAll,
		disableAll
	};
}));
export { require_src as n, require_electron_localshortcut as t };
