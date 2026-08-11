import { a as __toCommonJS, i as __require, n as __esmMin, r as __export, t as __commonJSMin } from "./chunk-0rTXi_Jc.js";
import { a as init_from, c as init_esm_min, d as init_fetch_blob, i as fileFromSync, l as file_default, n as blobFromSync, o as FormData, r as fileFrom, s as formDataToBlob, t as blobFrom, u as fetch_blob_default } from "./from-BXT7MEZQ.js";
import { format } from "node:url";
import { deprecate, promisify, types } from "node:util";
import http from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import Stream, { PassThrough, pipeline } from "node:stream";
import { Buffer as Buffer$1 } from "node:buffer";
import { isIP } from "node:net";
import __cjs_mod__ from "node:module";
import.meta.filename;
import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
var require_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var runtime = function(exports) {
		var Op = Object.prototype;
		var hasOwn = Op.hasOwnProperty;
		var defineProperty = Object.defineProperty || function(obj, key, desc) {
			obj[key] = desc.value;
		};
		var undefined$1;
		var $Symbol = typeof Symbol === "function" ? Symbol : {};
		var iteratorSymbol = $Symbol.iterator || "@@iterator";
		var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
		var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
		function define(obj, key, value) {
			Object.defineProperty(obj, key, {
				value,
				enumerable: true,
				configurable: true,
				writable: true
			});
			return obj[key];
		}
		try {
			define({}, "");
		} catch (err) {
			define = function(obj, key, value) {
				return obj[key] = value;
			};
		}
		function wrap(innerFn, outerFn, self, tryLocsList) {
			var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
			var generator = Object.create(protoGenerator.prototype);
			var context = new Context(tryLocsList || []);
			defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });
			return generator;
		}
		exports.wrap = wrap;
		function tryCatch(fn, obj, arg) {
			try {
				return {
					type: "normal",
					arg: fn.call(obj, arg)
				};
			} catch (err) {
				return {
					type: "throw",
					arg: err
				};
			}
		}
		var GenStateSuspendedStart = "suspendedStart";
		var GenStateSuspendedYield = "suspendedYield";
		var GenStateExecuting = "executing";
		var GenStateCompleted = "completed";
		var ContinueSentinel = {};
		function Generator() {}
		function GeneratorFunction() {}
		function GeneratorFunctionPrototype() {}
		var IteratorPrototype = {};
		define(IteratorPrototype, iteratorSymbol, function() {
			return this;
		});
		var getProto = Object.getPrototypeOf;
		var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
		if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) IteratorPrototype = NativeIteratorPrototype;
		var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
		GeneratorFunction.prototype = GeneratorFunctionPrototype;
		defineProperty(Gp, "constructor", {
			value: GeneratorFunctionPrototype,
			configurable: true
		});
		defineProperty(GeneratorFunctionPrototype, "constructor", {
			value: GeneratorFunction,
			configurable: true
		});
		GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
		function defineIteratorMethods(prototype) {
			[
				"next",
				"throw",
				"return"
			].forEach(function(method) {
				define(prototype, method, function(arg) {
					return this._invoke(method, arg);
				});
			});
		}
		exports.isGeneratorFunction = function(genFun) {
			var ctor = typeof genFun === "function" && genFun.constructor;
			return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
		};
		exports.mark = function(genFun) {
			if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
			else {
				genFun.__proto__ = GeneratorFunctionPrototype;
				define(genFun, toStringTagSymbol, "GeneratorFunction");
			}
			genFun.prototype = Object.create(Gp);
			return genFun;
		};
		exports.awrap = function(arg) {
			return { __await: arg };
		};
		function AsyncIterator(generator, PromiseImpl) {
			function invoke(method, arg, resolve, reject) {
				var record = tryCatch(generator[method], generator, arg);
				if (record.type === "throw") reject(record.arg);
				else {
					var result = record.arg;
					var value = result.value;
					if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value$1) {
						invoke("next", value$1, resolve, reject);
					}, function(err) {
						invoke("throw", err, resolve, reject);
					});
					return PromiseImpl.resolve(value).then(function(unwrapped) {
						result.value = unwrapped;
						resolve(result);
					}, function(error) {
						return invoke("throw", error, resolve, reject);
					});
				}
			}
			var previousPromise;
			function enqueue(method, arg) {
				function callInvokeWithMethodAndArg() {
					return new PromiseImpl(function(resolve, reject) {
						invoke(method, arg, resolve, reject);
					});
				}
				return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
			}
			defineProperty(this, "_invoke", { value: enqueue });
		}
		defineIteratorMethods(AsyncIterator.prototype);
		define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
			return this;
		});
		exports.AsyncIterator = AsyncIterator;
		exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
			if (PromiseImpl === void 0) PromiseImpl = Promise;
			var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
			return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
				return result.done ? result.value : iter.next();
			});
		};
		function makeInvokeMethod(innerFn, self, context) {
			var state = GenStateSuspendedStart;
			return function invoke(method, arg) {
				if (state === GenStateExecuting) throw new Error("Generator is already running");
				if (state === GenStateCompleted) {
					if (method === "throw") throw arg;
					return doneResult();
				}
				context.method = method;
				context.arg = arg;
				while (true) {
					var delegate = context.delegate;
					if (delegate) {
						var delegateResult = maybeInvokeDelegate(delegate, context);
						if (delegateResult) {
							if (delegateResult === ContinueSentinel) continue;
							return delegateResult;
						}
					}
					if (context.method === "next") context.sent = context._sent = context.arg;
					else if (context.method === "throw") {
						if (state === GenStateSuspendedStart) {
							state = GenStateCompleted;
							throw context.arg;
						}
						context.dispatchException(context.arg);
					} else if (context.method === "return") context.abrupt("return", context.arg);
					state = GenStateExecuting;
					var record = tryCatch(innerFn, self, context);
					if (record.type === "normal") {
						state = context.done ? GenStateCompleted : GenStateSuspendedYield;
						if (record.arg === ContinueSentinel) continue;
						return {
							value: record.arg,
							done: context.done
						};
					} else if (record.type === "throw") {
						state = GenStateCompleted;
						context.method = "throw";
						context.arg = record.arg;
					}
				}
			};
		}
		function maybeInvokeDelegate(delegate, context) {
			var methodName = context.method;
			var method = delegate.iterator[methodName];
			if (method === undefined$1) {
				context.delegate = null;
				if (methodName === "throw" && delegate.iterator["return"]) {
					context.method = "return";
					context.arg = undefined$1;
					maybeInvokeDelegate(delegate, context);
					if (context.method === "throw") return ContinueSentinel;
				}
				if (methodName !== "return") {
					context.method = "throw";
					context.arg = /* @__PURE__ */ new TypeError("The iterator does not provide a '" + methodName + "' method");
				}
				return ContinueSentinel;
			}
			var record = tryCatch(method, delegate.iterator, context.arg);
			if (record.type === "throw") {
				context.method = "throw";
				context.arg = record.arg;
				context.delegate = null;
				return ContinueSentinel;
			}
			var info = record.arg;
			if (!info) {
				context.method = "throw";
				context.arg = /* @__PURE__ */ new TypeError("iterator result is not an object");
				context.delegate = null;
				return ContinueSentinel;
			}
			if (info.done) {
				context[delegate.resultName] = info.value;
				context.next = delegate.nextLoc;
				if (context.method !== "return") {
					context.method = "next";
					context.arg = undefined$1;
				}
			} else return info;
			context.delegate = null;
			return ContinueSentinel;
		}
		defineIteratorMethods(Gp);
		define(Gp, toStringTagSymbol, "Generator");
		define(Gp, iteratorSymbol, function() {
			return this;
		});
		define(Gp, "toString", function() {
			return "[object Generator]";
		});
		function pushTryEntry(locs) {
			var entry = { tryLoc: locs[0] };
			if (1 in locs) entry.catchLoc = locs[1];
			if (2 in locs) {
				entry.finallyLoc = locs[2];
				entry.afterLoc = locs[3];
			}
			this.tryEntries.push(entry);
		}
		function resetTryEntry(entry) {
			var record = entry.completion || {};
			record.type = "normal";
			delete record.arg;
			entry.completion = record;
		}
		function Context(tryLocsList) {
			this.tryEntries = [{ tryLoc: "root" }];
			tryLocsList.forEach(pushTryEntry, this);
			this.reset(true);
		}
		exports.keys = function(val) {
			var object = Object(val);
			var keys = [];
			for (var key in object) keys.push(key);
			keys.reverse();
			return function next() {
				while (keys.length) {
					var key$1 = keys.pop();
					if (key$1 in object) {
						next.value = key$1;
						next.done = false;
						return next;
					}
				}
				next.done = true;
				return next;
			};
		};
		function values(iterable) {
			if (iterable) {
				var iteratorMethod = iterable[iteratorSymbol];
				if (iteratorMethod) return iteratorMethod.call(iterable);
				if (typeof iterable.next === "function") return iterable;
				if (!isNaN(iterable.length)) {
					var i = -1, next = function next$1() {
						while (++i < iterable.length) if (hasOwn.call(iterable, i)) {
							next$1.value = iterable[i];
							next$1.done = false;
							return next$1;
						}
						next$1.value = undefined$1;
						next$1.done = true;
						return next$1;
					};
					return next.next = next;
				}
			}
			return { next: doneResult };
		}
		exports.values = values;
		function doneResult() {
			return {
				value: undefined$1,
				done: true
			};
		}
		Context.prototype = {
			constructor: Context,
			reset: function(skipTempReset) {
				this.prev = 0;
				this.next = 0;
				this.sent = this._sent = undefined$1;
				this.done = false;
				this.delegate = null;
				this.method = "next";
				this.arg = undefined$1;
				this.tryEntries.forEach(resetTryEntry);
				if (!skipTempReset) {
					for (var name$1 in this) if (name$1.charAt(0) === "t" && hasOwn.call(this, name$1) && !isNaN(+name$1.slice(1))) this[name$1] = undefined$1;
				}
			},
			stop: function() {
				this.done = true;
				var rootRecord = this.tryEntries[0].completion;
				if (rootRecord.type === "throw") throw rootRecord.arg;
				return this.rval;
			},
			dispatchException: function(exception) {
				if (this.done) throw exception;
				var context = this;
				function handle(loc, caught) {
					record.type = "throw";
					record.arg = exception;
					context.next = loc;
					if (caught) {
						context.method = "next";
						context.arg = undefined$1;
					}
					return !!caught;
				}
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					var record = entry.completion;
					if (entry.tryLoc === "root") return handle("end");
					if (entry.tryLoc <= this.prev) {
						var hasCatch = hasOwn.call(entry, "catchLoc");
						var hasFinally = hasOwn.call(entry, "finallyLoc");
						if (hasCatch && hasFinally) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
							else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
						} else if (hasCatch) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
						} else if (hasFinally) {
							if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
						} else throw new Error("try statement without catch or finally");
					}
				}
			},
			abrupt: function(type, arg) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
						var finallyEntry = entry;
						break;
					}
				}
				if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) finallyEntry = null;
				var record = finallyEntry ? finallyEntry.completion : {};
				record.type = type;
				record.arg = arg;
				if (finallyEntry) {
					this.method = "next";
					this.next = finallyEntry.finallyLoc;
					return ContinueSentinel;
				}
				return this.complete(record);
			},
			complete: function(record, afterLoc) {
				if (record.type === "throw") throw record.arg;
				if (record.type === "break" || record.type === "continue") this.next = record.arg;
				else if (record.type === "return") {
					this.rval = this.arg = record.arg;
					this.method = "return";
					this.next = "end";
				} else if (record.type === "normal" && afterLoc) this.next = afterLoc;
				return ContinueSentinel;
			},
			finish: function(finallyLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.finallyLoc === finallyLoc) {
						this.complete(entry.completion, entry.afterLoc);
						resetTryEntry(entry);
						return ContinueSentinel;
					}
				}
			},
			"catch": function(tryLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc === tryLoc) {
						var record = entry.completion;
						if (record.type === "throw") {
							var thrown = record.arg;
							resetTryEntry(entry);
						}
						return thrown;
					}
				}
				throw new Error("illegal catch attempt");
			},
			delegateYield: function(iterable, resultName, nextLoc) {
				this.delegate = {
					iterator: values(iterable),
					resultName,
					nextLoc
				};
				if (this.method === "next") this.arg = undefined$1;
				return ContinueSentinel;
			}
		};
		return exports;
	}(typeof module === "object" ? module.exports : {});
	try {
		regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
		if (typeof globalThis === "object") globalThis.regeneratorRuntime = runtime;
		else Function("r", "regeneratorRuntime = r")(runtime);
	}
}));
var require_config = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		defaultArgs: [
			"./ffmpeg",
			"-nostdin",
			"-y"
		],
		baseOptions: {
			log: false,
			logger: () => {},
			progress: () => {},
			corePath: ""
		}
	};
}));
var require_parseArgs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = (Core, args) => {
		const argsPtr = Core._malloc(args.length * Uint32Array.BYTES_PER_ELEMENT);
		args.forEach((s, idx) => {
			const sz = Core.lengthBytesUTF8(s) + 1;
			const buf = Core._malloc(sz);
			Core.stringToUTF8(s, buf, sz);
			Core.setValue(argsPtr + Uint32Array.BYTES_PER_ELEMENT * idx, buf, "i32");
		});
		return [args.length, argsPtr];
	};
}));
var require_defaultOptions = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = { corePath: "@ffmpeg.wasm/core-mt" };
}));
var require_log = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var logging = false;
	var customLogger = () => {};
	var setLogging = (_logging) => {
		logging = _logging;
	};
	var setCustomLogger = (logger) => {
		customLogger = logger;
	};
	var log$1 = (type, message) => {
		customLogger({
			type,
			message
		});
		if (logging) console.log(`[${type}] ${message}`);
	};
	module.exports = {
		logging,
		setLogging,
		setCustomLogger,
		log: log$1
	};
}));
var require_getCreateFFmpegCore = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { log } = require_log();
	module.exports = ({ corePath }) => new Promise((resolve) => {
		log("info", `fetch ffmpeg.wasm-core script from ${corePath}`);
		resolve({ createFFmpegCore: __require(corePath) });
	});
}));
function dataUriToBuffer(uri) {
	if (!/^data:/i.test(uri)) throw new TypeError("`uri` does not appear to be a Data URI (must begin with \"data:\")");
	uri = uri.replace(/\r?\n/g, "");
	const firstComma = uri.indexOf(",");
	if (firstComma === -1 || firstComma <= 4) throw new TypeError("malformed data: URI");
	const meta = uri.substring(5, firstComma).split(";");
	let charset = "";
	let base64 = false;
	const type = meta[0] || "text/plain";
	let typeFull = type;
	for (let i = 1; i < meta.length; i++) if (meta[i] === "base64") base64 = true;
	else if (meta[i]) {
		typeFull += `;${meta[i]}`;
		if (meta[i].indexOf("charset=") === 0) charset = meta[i].substring(8);
	}
	if (!meta[0] && !charset.length) {
		typeFull += ";charset=US-ASCII";
		charset = "US-ASCII";
	}
	const encoding = base64 ? "base64" : "ascii";
	const data = unescape(uri.substring(firstComma + 1));
	const buffer = Buffer.from(data, encoding);
	buffer.type = type;
	buffer.typeFull = typeFull;
	buffer.charset = charset;
	return buffer;
}
var dist_default;
var init_dist = __esmMin((() => {
	dist_default = dataUriToBuffer;
}));
var FetchBaseError;
var init_base = __esmMin((() => {
	FetchBaseError = class extends Error {
		constructor(message, type) {
			super(message);
			Error.captureStackTrace(this, this.constructor);
			this.type = type;
		}
		get name() {
			return this.constructor.name;
		}
		get [Symbol.toStringTag]() {
			return this.constructor.name;
		}
	};
}));
var FetchError;
var init_fetch_error = __esmMin((() => {
	init_base();
	FetchError = class extends FetchBaseError {
		constructor(message, type, systemError) {
			super(message, type);
			if (systemError) {
				this.code = this.errno = systemError.code;
				this.erroredSysCall = systemError.syscall;
			}
		}
	};
}));
var NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain, isSameProtocol;
var init_is = __esmMin((() => {
	NAME = Symbol.toStringTag;
	isURLSearchParameters = (object) => {
		return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
	};
	isBlob = (object) => {
		return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
	};
	isAbortSignal = (object) => {
		return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
	};
	isDomainOrSubdomain = (destination, original) => {
		const orig = new URL(original).hostname;
		const dest = new URL(destination).hostname;
		return orig === dest || orig.endsWith(`.${dest}`);
	};
	isSameProtocol = (destination, original) => {
		const orig = new URL(original).protocol;
		const dest = new URL(destination).protocol;
		return orig === dest;
	};
}));
async function consumeBody(data) {
	if (data[INTERNALS$2].disturbed) throw new TypeError(`body used already for: ${data.url}`);
	data[INTERNALS$2].disturbed = true;
	if (data[INTERNALS$2].error) throw data[INTERNALS$2].error;
	const { body } = data;
	if (body === null) return Buffer$1.alloc(0);
	/* c8 ignore next 3 */
	if (!(body instanceof Stream)) return Buffer$1.alloc(0);
	const accum = [];
	let accumBytes = 0;
	try {
		for await (const chunk of body) {
			if (data.size > 0 && accumBytes + chunk.length > data.size) {
				const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
				body.destroy(error);
				throw error;
			}
			accumBytes += chunk.length;
			accum.push(chunk);
		}
	} catch (error) {
		throw error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
	}
	if (body.readableEnded === true || body._readableState.ended === true) try {
		if (accum.every((c) => typeof c === "string")) return Buffer$1.from(accum.join(""));
		return Buffer$1.concat(accum, accumBytes);
	} catch (error) {
		throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
	}
	else throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
}
var pipeline$1, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream;
var init_body = __esmMin((() => {
	init_fetch_blob();
	init_esm_min();
	init_fetch_error();
	init_base();
	init_is();
	pipeline$1 = promisify(Stream.pipeline);
	INTERNALS$2 = Symbol("Body internals");
	Body = class {
		constructor(body, { size = 0 } = {}) {
			let boundary = null;
			if (body === null) body = null;
			else if (isURLSearchParameters(body)) body = Buffer$1.from(body.toString());
			else if (isBlob(body)) {} else if (Buffer$1.isBuffer(body)) {} else if (types.isAnyArrayBuffer(body)) body = Buffer$1.from(body);
			else if (ArrayBuffer.isView(body)) body = Buffer$1.from(body.buffer, body.byteOffset, body.byteLength);
			else if (body instanceof Stream) {} else if (body instanceof FormData) {
				body = formDataToBlob(body);
				boundary = body.type.split("=")[1];
			} else body = Buffer$1.from(String(body));
			let stream = body;
			if (Buffer$1.isBuffer(body)) stream = Stream.Readable.from(body);
			else if (isBlob(body)) stream = Stream.Readable.from(body.stream());
			this[INTERNALS$2] = {
				body,
				stream,
				boundary,
				disturbed: false,
				error: null
			};
			this.size = size;
			if (body instanceof Stream) body.on("error", (error_) => {
				const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
				this[INTERNALS$2].error = error;
			});
		}
		get body() {
			return this[INTERNALS$2].stream;
		}
		get bodyUsed() {
			return this[INTERNALS$2].disturbed;
		}
		async arrayBuffer() {
			const { buffer, byteOffset, byteLength } = await consumeBody(this);
			return buffer.slice(byteOffset, byteOffset + byteLength);
		}
		async formData() {
			const ct = this.headers.get("content-type");
			if (ct.startsWith("application/x-www-form-urlencoded")) {
				const formData = new FormData();
				const parameters = new URLSearchParams(await this.text());
				for (const [name$1, value] of parameters) formData.append(name$1, value);
				return formData;
			}
			const { toFormData } = await import("./multipart-parser-D4KFJmFQ.js");
			return toFormData(this.body, ct);
		}
		async blob() {
			const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
			const buf = await this.arrayBuffer();
			return new fetch_blob_default([buf], { type: ct });
		}
		async json() {
			const text = await this.text();
			return JSON.parse(text);
		}
		async text() {
			const buffer = await consumeBody(this);
			return new TextDecoder().decode(buffer);
		}
		buffer() {
			return consumeBody(this);
		}
	};
	Body.prototype.buffer = deprecate(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
	Object.defineProperties(Body.prototype, {
		body: { enumerable: true },
		bodyUsed: { enumerable: true },
		arrayBuffer: { enumerable: true },
		blob: { enumerable: true },
		json: { enumerable: true },
		text: { enumerable: true },
		data: { get: deprecate(() => {}, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
	});
	clone = (instance, highWaterMark) => {
		let p1;
		let p2;
		let { body } = instance[INTERNALS$2];
		if (instance.bodyUsed) throw new Error("cannot clone body after it is used");
		if (body instanceof Stream && typeof body.getBoundary !== "function") {
			p1 = new PassThrough({ highWaterMark });
			p2 = new PassThrough({ highWaterMark });
			body.pipe(p1);
			body.pipe(p2);
			instance[INTERNALS$2].stream = p1;
			body = p2;
		}
		return body;
	};
	getNonSpecFormDataBoundary = deprecate((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
	extractContentType = (body, request) => {
		if (body === null) return null;
		if (typeof body === "string") return "text/plain;charset=UTF-8";
		if (isURLSearchParameters(body)) return "application/x-www-form-urlencoded;charset=UTF-8";
		if (isBlob(body)) return body.type || null;
		if (Buffer$1.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) return null;
		if (body instanceof FormData) return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
		if (body && typeof body.getBoundary === "function") return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
		if (body instanceof Stream) return null;
		return "text/plain;charset=UTF-8";
	};
	getTotalBytes = (request) => {
		const { body } = request[INTERNALS$2];
		if (body === null) return 0;
		if (isBlob(body)) return body.size;
		if (Buffer$1.isBuffer(body)) return body.length;
		if (body && typeof body.getLengthSync === "function") return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
		return null;
	};
	writeToStream = async (dest, { body }) => {
		if (body === null) dest.end();
		else await pipeline$1(body, dest);
	};
}));
function fromRawHeaders(headers = []) {
	return new Headers(headers.reduce((result, value, index, array) => {
		if (index % 2 === 0) result.push(array.slice(index, index + 2));
		return result;
	}, []).filter(([name$1, value]) => {
		try {
			validateHeaderName(name$1);
			validateHeaderValue(name$1, String(value));
			return true;
		} catch {
			return false;
		}
	}));
}
var validateHeaderName, validateHeaderValue, Headers;
var init_headers = __esmMin((() => {
	validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name$1) => {
		if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name$1)) {
			const error = /* @__PURE__ */ new TypeError(`Header name must be a valid HTTP token [${name$1}]`);
			Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
			throw error;
		}
	};
	validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name$1, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const error = /* @__PURE__ */ new TypeError(`Invalid character in header content ["${name$1}"]`);
			Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
			throw error;
		}
	};
	Headers = class Headers extends URLSearchParams {
		constructor(init) {
			let result = [];
			if (init instanceof Headers) {
				const raw = init.raw();
				for (const [name$1, values] of Object.entries(raw)) result.push(...values.map((value) => [name$1, value]));
			} else if (init == null) {} else if (typeof init === "object" && !types.isBoxedPrimitive(init)) {
				const method = init[Symbol.iterator];
				if (method == null) result.push(...Object.entries(init));
				else {
					if (typeof method !== "function") throw new TypeError("Header pairs must be iterable");
					result = [...init].map((pair) => {
						if (typeof pair !== "object" || types.isBoxedPrimitive(pair)) throw new TypeError("Each header pair must be an iterable object");
						return [...pair];
					}).map((pair) => {
						if (pair.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
						return [...pair];
					});
				}
			} else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
			result = result.length > 0 ? result.map(([name$1, value]) => {
				validateHeaderName(name$1);
				validateHeaderValue(name$1, String(value));
				return [String(name$1).toLowerCase(), String(value)];
			}) : void 0;
			super(result);
			return new Proxy(this, { get(target, p, receiver) {
				switch (p) {
					case "append":
					case "set": return (name$1, value) => {
						validateHeaderName(name$1);
						validateHeaderValue(name$1, String(value));
						return URLSearchParams.prototype[p].call(target, String(name$1).toLowerCase(), String(value));
					};
					case "delete":
					case "has":
					case "getAll": return (name$1) => {
						validateHeaderName(name$1);
						return URLSearchParams.prototype[p].call(target, String(name$1).toLowerCase());
					};
					case "keys": return () => {
						target.sort();
						return new Set(URLSearchParams.prototype.keys.call(target)).keys();
					};
					default: return Reflect.get(target, p, receiver);
				}
			} });
			/* c8 ignore next */
		}
		get [Symbol.toStringTag]() {
			return this.constructor.name;
		}
		toString() {
			return Object.prototype.toString.call(this);
		}
		get(name$1) {
			const values = this.getAll(name$1);
			if (values.length === 0) return null;
			let value = values.join(", ");
			if (/^content-encoding$/i.test(name$1)) value = value.toLowerCase();
			return value;
		}
		forEach(callback, thisArg = void 0) {
			for (const name$1 of this.keys()) Reflect.apply(callback, thisArg, [
				this.get(name$1),
				name$1,
				this
			]);
		}
		*values() {
			for (const name$1 of this.keys()) yield this.get(name$1);
		}
		*entries() {
			for (const name$1 of this.keys()) yield [name$1, this.get(name$1)];
		}
		[Symbol.iterator]() {
			return this.entries();
		}
		raw() {
			return [...this.keys()].reduce((result, key) => {
				result[key] = this.getAll(key);
				return result;
			}, {});
		}
		[Symbol.for("nodejs.util.inspect.custom")]() {
			return [...this.keys()].reduce((result, key) => {
				const values = this.getAll(key);
				if (key === "host") result[key] = values[0];
				else result[key] = values.length > 1 ? values : values[0];
				return result;
			}, {});
		}
	};
	Object.defineProperties(Headers.prototype, [
		"get",
		"entries",
		"forEach",
		"values"
	].reduce((result, property) => {
		result[property] = { enumerable: true };
		return result;
	}, {}));
}));
var redirectStatus, isRedirect;
var init_is_redirect = __esmMin((() => {
	redirectStatus = new Set([
		301,
		302,
		303,
		307,
		308
	]);
	isRedirect = (code) => {
		return redirectStatus.has(code);
	};
}));
var INTERNALS$1, Response;
var init_response = __esmMin((() => {
	init_headers();
	init_body();
	init_is_redirect();
	INTERNALS$1 = Symbol("Response internals");
	Response = class Response extends Body {
		constructor(body = null, options = {}) {
			super(body, options);
			const status = options.status != null ? options.status : 200;
			const headers = new Headers(options.headers);
			if (body !== null && !headers.has("Content-Type")) {
				const contentType = extractContentType(body, this);
				if (contentType) headers.append("Content-Type", contentType);
			}
			this[INTERNALS$1] = {
				type: "default",
				url: options.url,
				status,
				statusText: options.statusText || "",
				headers,
				counter: options.counter,
				highWaterMark: options.highWaterMark
			};
		}
		get type() {
			return this[INTERNALS$1].type;
		}
		get url() {
			return this[INTERNALS$1].url || "";
		}
		get status() {
			return this[INTERNALS$1].status;
		}
		get ok() {
			return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
		}
		get redirected() {
			return this[INTERNALS$1].counter > 0;
		}
		get statusText() {
			return this[INTERNALS$1].statusText;
		}
		get headers() {
			return this[INTERNALS$1].headers;
		}
		get highWaterMark() {
			return this[INTERNALS$1].highWaterMark;
		}
		clone() {
			return new Response(clone(this, this.highWaterMark), {
				type: this.type,
				url: this.url,
				status: this.status,
				statusText: this.statusText,
				headers: this.headers,
				ok: this.ok,
				redirected: this.redirected,
				size: this.size,
				highWaterMark: this.highWaterMark
			});
		}
		static redirect(url$1, status = 302) {
			if (!isRedirect(status)) throw new RangeError("Failed to execute \"redirect\" on \"response\": Invalid status code");
			return new Response(null, {
				headers: { location: new URL(url$1).toString() },
				status
			});
		}
		static error() {
			const response = new Response(null, {
				status: 0,
				statusText: ""
			});
			response[INTERNALS$1].type = "error";
			return response;
		}
		static json(data = void 0, init = {}) {
			const body = JSON.stringify(data);
			if (body === void 0) throw new TypeError("data is not JSON serializable");
			const headers = new Headers(init && init.headers);
			if (!headers.has("content-type")) headers.set("content-type", "application/json");
			return new Response(body, {
				...init,
				headers
			});
		}
		get [Symbol.toStringTag]() {
			return "Response";
		}
	};
	Object.defineProperties(Response.prototype, {
		type: { enumerable: true },
		url: { enumerable: true },
		status: { enumerable: true },
		ok: { enumerable: true },
		redirected: { enumerable: true },
		statusText: { enumerable: true },
		headers: { enumerable: true },
		clone: { enumerable: true }
	});
}));
var getSearch;
var init_get_search = __esmMin((() => {
	getSearch = (parsedURL) => {
		if (parsedURL.search) return parsedURL.search;
		const lastOffset = parsedURL.href.length - 1;
		const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
		return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
	};
}));
function stripURLForUseAsAReferrer(url$1, originOnly = false) {
	if (url$1 == null) return "no-referrer";
	url$1 = new URL(url$1);
	if (/^(about|blob|data):$/.test(url$1.protocol)) return "no-referrer";
	url$1.username = "";
	url$1.password = "";
	url$1.hash = "";
	if (originOnly) {
		url$1.pathname = "";
		url$1.search = "";
	}
	return url$1;
}
function validateReferrerPolicy(referrerPolicy) {
	if (!ReferrerPolicy.has(referrerPolicy)) throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
	return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url$1) {
	if (/^(http|ws)s:$/.test(url$1.protocol)) return true;
	const hostIp = url$1.host.replace(/(^\[)|(]$)/g, "");
	const hostIPVersion = isIP(hostIp);
	if (hostIPVersion === 4 && /^127\./.test(hostIp)) return true;
	if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) return true;
	if (url$1.host === "localhost" || url$1.host.endsWith(".localhost")) return false;
	if (url$1.protocol === "file:") return true;
	return false;
}
function isUrlPotentiallyTrustworthy(url$1) {
	if (/^about:(blank|srcdoc)$/.test(url$1)) return true;
	if (url$1.protocol === "data:") return true;
	if (/^(blob|filesystem):$/.test(url$1.protocol)) return true;
	return isOriginPotentiallyTrustworthy(url$1);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
	if (request.referrer === "no-referrer" || request.referrerPolicy === "") return null;
	const policy = request.referrerPolicy;
	if (request.referrer === "about:client") return "no-referrer";
	const referrerSource = request.referrer;
	let referrerURL = stripURLForUseAsAReferrer(referrerSource);
	let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
	if (referrerURL.toString().length > 4096) referrerURL = referrerOrigin;
	if (referrerURLCallback) referrerURL = referrerURLCallback(referrerURL);
	if (referrerOriginCallback) referrerOrigin = referrerOriginCallback(referrerOrigin);
	const currentURL = new URL(request.url);
	switch (policy) {
		case "no-referrer": return "no-referrer";
		case "origin": return referrerOrigin;
		case "unsafe-url": return referrerURL;
		case "strict-origin":
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) return "no-referrer";
			return referrerOrigin.toString();
		case "strict-origin-when-cross-origin":
			if (referrerURL.origin === currentURL.origin) return referrerURL;
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) return "no-referrer";
			return referrerOrigin;
		case "same-origin":
			if (referrerURL.origin === currentURL.origin) return referrerURL;
			return "no-referrer";
		case "origin-when-cross-origin":
			if (referrerURL.origin === currentURL.origin) return referrerURL;
			return referrerOrigin;
		case "no-referrer-when-downgrade":
			if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) return "no-referrer";
			return referrerURL;
		default: throw new TypeError(`Invalid referrerPolicy: ${policy}`);
	}
}
function parseReferrerPolicyFromHeader(headers) {
	const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
	let policy = "";
	for (const token of policyTokens) if (token && ReferrerPolicy.has(token)) policy = token;
	return policy;
}
var ReferrerPolicy, DEFAULT_REFERRER_POLICY;
var init_referrer = __esmMin((() => {
	ReferrerPolicy = new Set([
		"",
		"no-referrer",
		"no-referrer-when-downgrade",
		"same-origin",
		"origin",
		"strict-origin",
		"origin-when-cross-origin",
		"strict-origin-when-cross-origin",
		"unsafe-url"
	]);
	DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
}));
var INTERNALS, isRequest, doBadDataWarn, Request, getNodeRequestOptions;
var init_request = __esmMin((() => {
	init_headers();
	init_body();
	init_is();
	init_get_search();
	init_referrer();
	INTERNALS = Symbol("Request internals");
	isRequest = (object) => {
		return typeof object === "object" && typeof object[INTERNALS] === "object";
	};
	doBadDataWarn = deprecate(() => {}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
	Request = class Request extends Body {
		constructor(input, init = {}) {
			let parsedURL;
			if (isRequest(input)) parsedURL = new URL(input.url);
			else {
				parsedURL = new URL(input);
				input = {};
			}
			if (parsedURL.username !== "" || parsedURL.password !== "") throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
			let method = init.method || input.method || "GET";
			if (/^(delete|get|head|options|post|put)$/i.test(method)) method = method.toUpperCase();
			if (!isRequest(init) && "data" in init) doBadDataWarn();
			if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body");
			const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
			super(inputBody, { size: init.size || input.size || 0 });
			const headers = new Headers(init.headers || input.headers || {});
			if (inputBody !== null && !headers.has("Content-Type")) {
				const contentType = extractContentType(inputBody, this);
				if (contentType) headers.set("Content-Type", contentType);
			}
			let signal = isRequest(input) ? input.signal : null;
			if ("signal" in init) signal = init.signal;
			if (signal != null && !isAbortSignal(signal)) throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
			let referrer = init.referrer == null ? input.referrer : init.referrer;
			if (referrer === "") referrer = "no-referrer";
			else if (referrer) {
				const parsedReferrer = new URL(referrer);
				referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
			} else referrer = void 0;
			this[INTERNALS] = {
				method,
				redirect: init.redirect || input.redirect || "follow",
				headers,
				parsedURL,
				signal,
				referrer
			};
			this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
			this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
			this.counter = init.counter || input.counter || 0;
			this.agent = init.agent || input.agent;
			this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
			this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
			this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
		}
		get method() {
			return this[INTERNALS].method;
		}
		get url() {
			return format(this[INTERNALS].parsedURL);
		}
		get headers() {
			return this[INTERNALS].headers;
		}
		get redirect() {
			return this[INTERNALS].redirect;
		}
		get signal() {
			return this[INTERNALS].signal;
		}
		get referrer() {
			if (this[INTERNALS].referrer === "no-referrer") return "";
			if (this[INTERNALS].referrer === "client") return "about:client";
			if (this[INTERNALS].referrer) return this[INTERNALS].referrer.toString();
		}
		get referrerPolicy() {
			return this[INTERNALS].referrerPolicy;
		}
		set referrerPolicy(referrerPolicy) {
			this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
		}
		clone() {
			return new Request(this);
		}
		get [Symbol.toStringTag]() {
			return "Request";
		}
	};
	Object.defineProperties(Request.prototype, {
		method: { enumerable: true },
		url: { enumerable: true },
		headers: { enumerable: true },
		redirect: { enumerable: true },
		clone: { enumerable: true },
		signal: { enumerable: true },
		referrer: { enumerable: true },
		referrerPolicy: { enumerable: true }
	});
	getNodeRequestOptions = (request) => {
		const { parsedURL } = request[INTERNALS];
		const headers = new Headers(request[INTERNALS].headers);
		if (!headers.has("Accept")) headers.set("Accept", "*/*");
		let contentLengthValue = null;
		if (request.body === null && /^(post|put)$/i.test(request.method)) contentLengthValue = "0";
		if (request.body !== null) {
			const totalBytes = getTotalBytes(request);
			if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) contentLengthValue = String(totalBytes);
		}
		if (contentLengthValue) headers.set("Content-Length", contentLengthValue);
		if (request.referrerPolicy === "") request.referrerPolicy = DEFAULT_REFERRER_POLICY;
		if (request.referrer && request.referrer !== "no-referrer") request[INTERNALS].referrer = determineRequestsReferrer(request);
		else request[INTERNALS].referrer = "no-referrer";
		if (request[INTERNALS].referrer instanceof URL) headers.set("Referer", request.referrer);
		if (!headers.has("User-Agent")) headers.set("User-Agent", "node-fetch");
		if (request.compress && !headers.has("Accept-Encoding")) headers.set("Accept-Encoding", "gzip, deflate, br");
		let { agent } = request;
		if (typeof agent === "function") agent = agent(parsedURL);
		const search = getSearch(parsedURL);
		const options = {
			path: parsedURL.pathname + search,
			method: request.method,
			headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
			insecureHTTPParser: request.insecureHTTPParser,
			agent
		};
		return {
			parsedURL,
			options
		};
	};
}));
var AbortError;
var init_abort_error = __esmMin((() => {
	init_base();
	AbortError = class extends FetchBaseError {
		constructor(message, type = "aborted") {
			super(message, type);
		}
	};
}));
var src_exports = {};
__export(src_exports, {
	AbortError: () => AbortError,
	Blob: () => fetch_blob_default,
	FetchError: () => FetchError,
	File: () => file_default,
	FormData: () => FormData,
	Headers: () => Headers,
	Request: () => Request,
	Response: () => Response,
	blobFrom: () => blobFrom,
	blobFromSync: () => blobFromSync,
	default: () => fetch$1,
	fileFrom: () => fileFrom,
	fileFromSync: () => fileFromSync,
	isRedirect: () => isRedirect
});
async function fetch$1(url$1, options_) {
	return new Promise((resolve, reject) => {
		const request = new Request(url$1, options_);
		const { parsedURL, options } = getNodeRequestOptions(request);
		if (!supportedSchemas.has(parsedURL.protocol)) throw new TypeError(`node-fetch cannot load ${url$1}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
		if (parsedURL.protocol === "data:") {
			const data = dist_default(request.url);
			const response$1 = new Response(data, { headers: { "Content-Type": data.typeFull } });
			resolve(response$1);
			return;
		}
		const send = (parsedURL.protocol === "https:" ? https : http).request;
		const { signal } = request;
		let response = null;
		const abort = () => {
			const error = new AbortError("The operation was aborted.");
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) request.body.destroy(error);
			if (!response || !response.body) return;
			response.body.emit("error", error);
		};
		if (signal && signal.aborted) {
			abort();
			return;
		}
		const abortAndFinalize = () => {
			abort();
			finalize();
		};
		const request_ = send(parsedURL.toString(), options);
		if (signal) signal.addEventListener("abort", abortAndFinalize);
		const finalize = () => {
			request_.abort();
			if (signal) signal.removeEventListener("abort", abortAndFinalize);
		};
		request_.on("error", (error) => {
			reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
			finalize();
		});
		fixResponseChunkedTransferBadEnding(request_, (error) => {
			if (response && response.body) response.body.destroy(error);
		});
		/* c8 ignore next 18 */
		if (process.version < "v14") request_.on("socket", (s) => {
			let endedWithEventsCount;
			s.prependListener("end", () => {
				endedWithEventsCount = s._eventsCount;
			});
			s.prependListener("close", (hadError) => {
				if (response && endedWithEventsCount < s._eventsCount && !hadError) {
					const error = /* @__PURE__ */ new Error("Premature close");
					error.code = "ERR_STREAM_PREMATURE_CLOSE";
					response.body.emit("error", error);
				}
			});
		});
		request_.on("response", (response_) => {
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);
			if (isRedirect(response_.statusCode)) {
				const location = headers.get("Location");
				let locationURL = null;
				try {
					locationURL = location === null ? null : new URL(location, request.url);
				} catch {
					if (request.redirect !== "manual") {
						reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
						finalize();
						return;
					}
				}
				switch (request.redirect) {
					case "error":
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
						finalize();
						return;
					case "manual": break;
					case "follow": {
						if (locationURL === null) break;
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
							finalize();
							return;
						}
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: clone(request),
							signal: request.signal,
							size: request.size,
							referrer: request.referrer,
							referrerPolicy: request.referrerPolicy
						};
						if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) for (const name$1 of [
							"authorization",
							"www-authenticate",
							"cookie",
							"cookie2"
						]) requestOptions.headers.delete(name$1);
						if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream.Readable) {
							reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
							finalize();
							return;
						}
						if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
							requestOptions.method = "GET";
							requestOptions.body = void 0;
							requestOptions.headers.delete("content-length");
						}
						const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
						if (responseReferrerPolicy) requestOptions.referrerPolicy = responseReferrerPolicy;
						resolve(fetch$1(new Request(locationURL, requestOptions)));
						finalize();
						return;
					}
					default: return reject(/* @__PURE__ */ new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
				}
			}
			if (signal) response_.once("end", () => {
				signal.removeEventListener("abort", abortAndFinalize);
			});
			let body = pipeline(response_, new PassThrough(), (error) => {
				if (error) reject(error);
			});
			/* c8 ignore next 3 */
			if (process.version < "v12.10") response_.on("aborted", abortAndFinalize);
			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};
			const codings = headers.get("Content-Encoding");
			if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};
			if (codings === "gzip" || codings === "x-gzip") {
				body = pipeline(body, zlib.createGunzip(zlibOptions), (error) => {
					if (error) reject(error);
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}
			if (codings === "deflate" || codings === "x-deflate") {
				const raw = pipeline(response_, new PassThrough(), (error) => {
					if (error) reject(error);
				});
				raw.once("data", (chunk) => {
					if ((chunk[0] & 15) === 8) body = pipeline(body, zlib.createInflate(), (error) => {
						if (error) reject(error);
					});
					else body = pipeline(body, zlib.createInflateRaw(), (error) => {
						if (error) reject(error);
					});
					response = new Response(body, responseOptions);
					resolve(response);
				});
				raw.once("end", () => {
					if (!response) {
						response = new Response(body, responseOptions);
						resolve(response);
					}
				});
				return;
			}
			if (codings === "br") {
				body = pipeline(body, zlib.createBrotliDecompress(), (error) => {
					if (error) reject(error);
				});
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}
			response = new Response(body, responseOptions);
			resolve(response);
		});
		writeToStream(request_, request).catch(reject);
	});
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
	const LAST_CHUNK = Buffer$1.from("0\r\n\r\n");
	let isChunkedTransfer = false;
	let properLastChunkReceived = false;
	let previousChunk;
	request.on("response", (response) => {
		const { headers } = response;
		isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
	});
	request.on("socket", (socket) => {
		const onSocketClose = () => {
			if (isChunkedTransfer && !properLastChunkReceived) {
				const error = /* @__PURE__ */ new Error("Premature close");
				error.code = "ERR_STREAM_PREMATURE_CLOSE";
				errorCallback(error);
			}
		};
		const onData = (buf) => {
			properLastChunkReceived = Buffer$1.compare(buf.slice(-5), LAST_CHUNK) === 0;
			if (!properLastChunkReceived && previousChunk) properLastChunkReceived = Buffer$1.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer$1.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
			previousChunk = buf;
		};
		socket.prependListener("close", onSocketClose);
		socket.on("data", onData);
		request.on("close", () => {
			socket.removeListener("close", onSocketClose);
			socket.removeListener("data", onData);
		});
	});
}
var supportedSchemas;
var init_src = __esmMin((() => {
	init_dist();
	init_body();
	init_response();
	init_headers();
	init_request();
	init_fetch_error();
	init_abort_error();
	init_is_redirect();
	init_esm_min();
	init_is();
	init_referrer();
	init_from();
	supportedSchemas = new Set([
		"data:",
		"http:",
		"https:"
	]);
}));
var require_is_url = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = isUrl;
	var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
	var localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
	var nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
	function isUrl(string) {
		if (typeof string !== "string") return false;
		var match = string.match(protocolAndDomainRE);
		if (!match) return false;
		var everythingAfterProtocol = match[1];
		if (!everythingAfterProtocol) return false;
		if (localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol)) return true;
		return false;
	}
}));
var require_fetchFile = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = __require("util");
	var fs = __require("fs");
	var fetch = (init_src(), __toCommonJS(src_exports));
	var isURL = require_is_url();
	module.exports = async (_data) => {
		let data = _data;
		if (typeof _data === "undefined") return new Uint8Array();
		if (typeof _data === "string") if (isURL(_data) || _data.startsWith("moz-extension://") || _data.startsWith("chrome-extension://") || _data.startsWith("file://")) data = await (await fetch(_data)).arrayBuffer();
		else if (/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(_data)) data = Buffer.from(_data.split(",")[1], "base64");
		else data = await util.promisify(fs.readFile)(_data);
		else if (Buffer.isBuffer(_data)) data = _data;
		return new Uint8Array(data);
	};
}));
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defaultOptions$1 = require_defaultOptions();
	var getCreateFFmpegCore$1 = require_getCreateFFmpegCore();
	var fetchFile$1 = require_fetchFile();
	module.exports = {
		defaultOptions: defaultOptions$1,
		getCreateFFmpegCore: getCreateFFmpegCore$1,
		fetchFile: fetchFile$1
	};
}));
var package_exports = {};
__export(package_exports, {
	author: () => author,
	browser: () => browser,
	bugs: () => bugs,
	default: () => package_default,
	dependencies: () => dependencies,
	description: () => description,
	devDependencies: () => devDependencies,
	directories: () => directories,
	engines: () => engines,
	homepage: () => homepage,
	keywords: () => keywords,
	license: () => license,
	main: () => main,
	name: () => name,
	publishConfig: () => publishConfig,
	repository: () => repository,
	scripts: () => scripts,
	types: () => types$1,
	version: () => version$1
});
var name, version$1, description, main, types$1, directories, scripts, browser, repository, keywords, author, license, bugs, engines, homepage, dependencies, devDependencies, publishConfig, package_default;
var init_package = __esmMin((() => {
	name = "@ffmpeg.wasm/main";
	version$1 = "0.12.0";
	description = "FFmpeg WebAssembly version";
	main = "src/index.js";
	types$1 = "src/index.d.ts";
	directories = { "example": "examples" };
	scripts = {
		"start": "node scripts/server.js",
		"start:worker": "node scripts/worker-server.js",
		"build": "rimraf dist && webpack --config scripts/webpack.config.prod.js",
		"build:worker": "rimraf dist && webpack --config scripts/webpack.config.worker.prod.js",
		"prepublishOnly": "npm run build",
		"lint": "eslint src",
		"wait": "rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js",
		"test": "npm-run-all -p -r start test:all",
		"test:all": "npm-run-all wait test:browser:ffmpeg test:node:all",
		"test:node": "node node_modules/mocha/bin/_mocha --exit --bail --require ./scripts/test-helper.js",
		"test:node:all": "npm run test:node -- ./tests/*.test.js",
		"test:browser": "mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000",
		"test:browser:ffmpeg": "npm run test:browser -- -f ./tests/ffmpeg.test.html"
	};
	browser = { "./src/node/index.js": "./src/browser/index.js" };
	repository = {
		"type": "git",
		"url": "git+https://github.com/DreamOfIce/ffmpeg.wasm.git"
	};
	keywords = [
		"ffmpeg",
		"WebAssembly",
		"video"
	];
	author = "Jerome Wu <jeromewus@gmail.com>";
	license = "MIT";
	bugs = { "url": "https://github.com/DreamOfIce/ffmpeg.wasm/issues" };
	engines = { "node": ">=12.16.1" };
	homepage = "https://github.com/DreamOfIce/ffmpeg.wasm#readme";
	dependencies = {
		"is-url": "^1.2.4",
		"node-fetch": "^2.6.9",
		"regenerator-runtime": "^0.13.11"
	};
	devDependencies = {
		"@babel/core": "^7.12.3",
		"@babel/preset-env": "^7.12.1",
		"@ffmpeg.wasm/core-mt": "^0.12.0",
		"@types/emscripten": "^1.39.4",
		"babel-eslint": "^10.1.0",
		"babel-loader": "^8.1.0",
		"chai": "^4.2.0",
		"cors": "^2.8.5",
		"eslint": "^8.37.0",
		"eslint-config-airbnb-base": "^15.0.0",
		"eslint-plugin-import": "^2.27.5",
		"express": "^4.17.1",
		"mocha": "^10.1.0",
		"mocha-headless-chrome": "^2.0.3",
		"npm-run-all2": "^6.0.4",
		"wait-on": "^5.3.0",
		"webpack": "^5.3.2",
		"webpack-cli": "^4.1.0",
		"webpack-dev-middleware": "^4.0.0"
	};
	publishConfig = { "access": "public" };
	package_default = {
		name,
		version: version$1,
		description,
		main,
		types: types$1,
		directories,
		scripts,
		browser,
		repository,
		keywords,
		author,
		license,
		bugs,
		engines,
		homepage,
		dependencies,
		devDependencies,
		publishConfig
	};
}));
var require_createFFmpeg = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { defaultArgs, baseOptions } = require_config();
	var parseArgs = require_parseArgs();
	var { defaultOptions, getCreateFFmpegCore } = require_node();
	var { version } = (init_package(), __toCommonJS(package_exports).default);
	var NO_LOAD = Error("ffmpeg.wasm is not ready, make sure you have completed load().");
	module.exports = (_options = {}) => {
		const { log: optLog, logger: optLogger, progress: optProgress,...options } = {
			...baseOptions,
			...defaultOptions,
			..._options
		};
		let Core = null;
		let ffmpeg = null;
		let runResolve = null;
		let runReject = null;
		let running = false;
		let customLogger$1 = optLogger;
		let logging$1 = optLog;
		let progress = optProgress;
		let duration = 0;
		let frames = 0;
		let readFrames = false;
		let ratio = 0;
		const detectCompletion = (message) => {
			if (message === "FFMPEG_END" && runResolve !== null) {
				runResolve();
				runResolve = null;
				runReject = null;
				running = false;
			}
		};
		const log$2 = (type, message) => {
			customLogger$1({
				type,
				message
			});
			if (logging$1) console.log(`[${type}] ${message}`);
		};
		const ts2sec = (ts) => {
			const [h, m, s] = ts.split(":");
			return parseFloat(h) * 60 * 60 + parseFloat(m) * 60 + parseFloat(s);
		};
		const parseProgress = (message, prog) => {
			if (typeof message === "string") {
				if (message.startsWith("  Duration")) {
					const ts = message.split(", ")[0].split(": ")[1];
					const d = ts2sec(ts);
					prog({
						duration: d,
						ratio
					});
					if (duration === 0 || duration > d) {
						duration = d;
						readFrames = true;
					}
				} else if (readFrames && message.startsWith("    Stream")) {
					const match = message.match(/([\d.]+) fps/);
					if (match) {
						const fps = parseFloat(match[1]);
						frames = duration * fps;
					} else frames = 0;
					readFrames = false;
				} else if (message.startsWith("frame") || message.startsWith("size")) {
					const ts = message.split("time=")[1].split(" ")[0];
					const t = ts2sec(ts);
					const match = message.match(/frame=\s*(\d+)/);
					if (frames && match) {
						const f = parseFloat(match[1]);
						ratio = Math.min(f / frames, 1);
					} else ratio = t / duration;
					prog({
						ratio,
						time: t
					});
				} else if (message.startsWith("video:")) {
					prog({ ratio: 1 });
					duration = 0;
				}
			}
		};
		const parseMessage = ({ type, message }) => {
			log$2(type, message);
			parseProgress(message, progress);
			detectCompletion(message);
		};
		const load = async () => {
			log$2("info", "load ffmpeg-core");
			if (Core === null) {
				log$2("info", "loading ffmpeg-core");
				const { createFFmpegCore, corePath, workerPath, wasmPath } = await getCreateFFmpegCore(options);
				Core = await createFFmpegCore({
					noExitRuntime: true,
					mainScriptUrlOrBlob: corePath,
					printErr: (message) => parseMessage({
						type: "fferr",
						message
					}),
					print: (message) => parseMessage({
						type: "ffout",
						message
					}),
					locateFile: (path, prefix) => {
						if (typeof window !== "undefined" || typeof WorkerGlobalScope !== "undefined") {
							if (typeof wasmPath !== "undefined" && path.endsWith("ffmpeg-core.wasm")) return wasmPath;
							if (typeof workerPath !== "undefined" && path.endsWith("ffmpeg-core.worker.js")) return workerPath;
						}
						return prefix + path;
					}
				});
				ffmpeg = Core.cwrap(options.mainName || "_emscripten_proxy_main", "number", ["number", "number"]);
				log$2("info", "ffmpeg-core loaded");
			} else throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.");
		};
		const isLoaded = () => Core !== null;
		const run = (..._args) => {
			log$2("info", `run ffmpeg command: ${_args.join(" ")}`);
			if (Core === null) throw NO_LOAD;
			else if (running) throw Error("ffmpeg.wasm can only run one command at a time");
			else {
				running = true;
				return new Promise((resolve, reject) => {
					const args = [...defaultArgs, ..._args].filter((s) => s.length !== 0);
					runResolve = resolve;
					runReject = reject;
					ffmpeg(...parseArgs(Core, args));
				});
			}
		};
		const FS = (method, ...args) => {
			log$2("info", `run FS.${method} ${args.map((arg) => typeof arg === "string" ? arg : `<${arg.length} bytes binary file>`).join(" ")}`);
			if (Core === null) throw NO_LOAD;
			else {
				let ret = null;
				try {
					ret = Core.FS[method](...args);
				} catch (e) {
					if (method === "readdir") throw Error(`ffmpeg.FS('readdir', '${args[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`);
					else if (method === "readFile") throw Error(`ffmpeg.FS('readFile', '${args[0]}') error. Check if the path exists`);
					else throw Error("Oops, something went wrong in FS operation.");
				}
				return ret;
			}
		};
		const exit = () => {
			if (Core === null) throw NO_LOAD;
			else {
				if (runReject) runReject("ffmpeg has exited");
				running = false;
				try {
					Core.exit(0);
				} catch (err) {
					log$2(err.message);
					if (runReject) runReject(err);
				} finally {
					Core = null;
					ffmpeg = null;
					runResolve = null;
					runReject = null;
				}
			}
		};
		const setProgress = (_progress) => {
			progress = _progress;
		};
		const setLogger = (_logger) => {
			customLogger$1 = _logger;
		};
		const setLogging$1 = (_logging) => {
			logging$1 = _logging;
		};
		log$2("info", `use ffmpeg.wasm v${version}`);
		return {
			setProgress,
			setLogger,
			setLogging: setLogging$1,
			load,
			isLoaded,
			run,
			exit,
			FS
		};
	};
}));
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	require_runtime();
	var createFFmpeg = require_createFFmpeg();
	var { fetchFile } = require_node();
	module.exports = {
		createFFmpeg,
		fetchFile
	};
}));
export default require_src();
export {};
