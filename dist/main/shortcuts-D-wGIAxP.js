import { a as __toCommonJS, i as __require, n as __esmMin, r as __export, s as __toESM, t as __commonJSMin } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import { t as require_electron_localshortcut } from "./electron-localshortcut-C08GypUP.js";
import { t as require_sax } from "./sax-CsO4YRek.js";
import { u as isEnabled } from "./config-n3n9Pwqt.js";
import { c as t, r as createPlugin, t as LoggerPrefix } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { a as registerCallback, n as SongInfoEvent } from "./song-info-BTWNuwrN.js";
import { t as getSongControls } from "./song-controls-DP9OiftJ.js";
import { globalShortcut, ipcMain } from "electron";
import prompt from "custom-electron-prompt";
import __cjs_mod__ from "node:module";
import.meta.filename;
import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match$1 = aUrl.match(urlRegexp);
		if (!match$1) return null;
		return {
			scheme: match$1[1],
			auth: match$1[2],
			host: match$1[3],
			port: match$1[4],
			path: match$1[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	function normalize(aPath) {
		var path$3 = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path$3 = url.path;
		}
		var isAbsolute = exports.isAbsolute(path$3);
		var parts = path$3.split(/\/+/);
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) if (part === "") {
				parts.splice(i + 1, up);
				up = 0;
			} else {
				parts.splice(i, 2);
				up--;
			}
		}
		path$3 = parts.join("/");
		if (path$3 === "") path$3 = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path$3;
			return urlGenerate(url);
		}
		return path$3;
	}
	exports.normalize = normalize;
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util$7 = require_util();
	var has$2 = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	function ArraySet$2() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	ArraySet$2.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet$2();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	ArraySet$2.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	ArraySet$2.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util$7.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has$2.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) if (hasNativeMap) this._set.set(aStr, idx);
		else this._set[sStr] = idx;
	};
	ArraySet$2.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util$7.toSetString(aStr);
			return has$2.call(this._set, sStr);
		}
	};
	ArraySet$2.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util$7.toSetString(aStr);
			if (has$2.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	ArraySet$2.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	ArraySet$2.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet$2;
}));
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util$6 = require_util();
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util$6.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	function MappingList$1() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	MappingList$1.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	MappingList$1.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	MappingList$1.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util$6.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList$1;
}));
var require_source_map_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ$1 = require_base64_vlq();
	var util$5 = require_util();
	var ArraySet$1 = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	function SourceMapGenerator$1(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util$5.getArg(aArgs, "file", null);
		this._sourceRoot = util$5.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util$5.getArg(aArgs, "skipValidation", false);
		this._sources = new ArraySet$1();
		this._names = new ArraySet$1();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator$1.prototype._version = 3;
	SourceMapGenerator$1.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator$1({
			file: aSourceMapConsumer.file,
			sourceRoot
		});
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util$5.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util$5.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	SourceMapGenerator$1.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util$5.getArg(aArgs, "generated");
		var original = util$5.getArg(aArgs, "original", null);
		var source = util$5.getArg(aArgs, "source", null);
		var name = util$5.getArg(aArgs, "name", null);
		if (!this._skipValidation) this._validateMapping(generated, original, source, name);
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	SourceMapGenerator$1.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util$5.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util$5.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util$5.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	SourceMapGenerator$1.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util$5.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet$1();
		var newNames = new ArraySet$1();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util$5.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util$5.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile$1) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile$1);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile$1 = util$5.join(aSourceMapPath, sourceFile$1);
				if (sourceRoot != null) sourceFile$1 = util$5.relative(sourceRoot, sourceFile$1);
				this.setSourceContent(sourceFile$1, content);
			}
		}, this);
	};
	SourceMapGenerator$1.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else throw new Error("Invalid mapping: " + JSON.stringify({
			generated: aGenerated,
			source: aSource,
			original: aOriginal,
			name: aName
		}));
	};
	SourceMapGenerator$1.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				while (mapping.generatedLine !== previousGeneratedLine) {
					next += ";";
					previousGeneratedLine++;
				}
			} else if (i > 0) {
				if (!util$5.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ$1.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ$1.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ$1.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ$1.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ$1.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator$1.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util$5.relative(aSourceRoot, source);
			var key$1 = util$5.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key$1) ? this._sourcesContents[key$1] : null;
		}, this);
	};
	SourceMapGenerator$1.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map$1 = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map$1.file = this._file;
		if (this._sourceRoot != null) map$1.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map$1.sourcesContent = this._generateSourcesContent(map$1.sources, map$1.sourceRoot);
		return map$1;
	};
	SourceMapGenerator$1.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator$1;
}));
var require_binary_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) return mid;
		else if (cmp > 0) {
			if (aHigh - mid > 1) return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return aHigh < aHaystack.length ? aHigh : -1;
			else return mid;
		} else {
			if (mid - aLow > 1) return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
			if (aBias == exports.LEAST_UPPER_BOUND) return mid;
			else return aLow < 0 ? -1 : aLow;
		}
	}
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) return -1;
		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) return -1;
		while (index - 1 >= 0) {
			if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) break;
			--index;
		}
		return index;
	};
}));
var require_quick_sort = /* @__PURE__ */ __commonJSMin(((exports) => {
	function swap(ary, x, y) {
		var temp = ary[x];
		ary[x] = ary[y];
		ary[y] = temp;
	}
	function randomIntInRange(low, high) {
		return Math.round(low + Math.random() * (high - low));
	}
	function doQuickSort(ary, comparator, p, r) {
		if (p < r) {
			var pivotIndex = randomIntInRange(p, r);
			var i = p - 1;
			swap(ary, pivotIndex, r);
			var pivot = ary[r];
			for (var j = p; j < r; j++) if (comparator(ary[j], pivot) <= 0) {
				i += 1;
				swap(ary, i, j);
			}
			swap(ary, i + 1, j);
			var q = i + 1;
			doQuickSort(ary, comparator, p, q - 1);
			doQuickSort(ary, comparator, q + 1, r);
		}
	}
	exports.quickSort = function(ary, comparator) {
		doQuickSort(ary, comparator, 0, ary.length - 1);
	};
}));
var require_source_map_consumer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util$4 = require_util();
	var binarySearch = require_binary_search();
	var ArraySet = require_array_set().ArraySet;
	var base64VLQ = require_base64_vlq();
	var quickSort = require_quick_sort().quickSort;
	function SourceMapConsumer$1(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util$4.parseSourceMapInput(aSourceMap);
		return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
	}
	SourceMapConsumer$1.fromSourceMap = function(aSourceMap, aSourceMapURL) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
	};
	SourceMapConsumer$1.prototype._version = 3;
	SourceMapConsumer$1.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer$1.prototype, "_generatedMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__generatedMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__generatedMappings;
		}
	});
	SourceMapConsumer$1.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer$1.prototype, "_originalMappings", {
		configurable: true,
		enumerable: true,
		get: function() {
			if (!this.__originalMappings) this._parseMappings(this._mappings, this.sourceRoot);
			return this.__originalMappings;
		}
	});
	SourceMapConsumer$1.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
	};
	SourceMapConsumer$1.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
	};
	SourceMapConsumer$1.GENERATED_ORDER = 1;
	SourceMapConsumer$1.ORIGINAL_ORDER = 2;
	SourceMapConsumer$1.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer$1.LEAST_UPPER_BOUND = 2;
	SourceMapConsumer$1.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;
		var mappings;
		switch (order) {
			case SourceMapConsumer$1.GENERATED_ORDER:
				mappings = this._generatedMappings;
				break;
			case SourceMapConsumer$1.ORIGINAL_ORDER:
				mappings = this._originalMappings;
				break;
			default: throw new Error("Unknown order of iteration.");
		}
		var sourceRoot = this.sourceRoot;
		mappings.map(function(mapping) {
			var source = mapping.source === null ? null : this._sources.at(mapping.source);
			source = util$4.computeSourceURL(sourceRoot, source, this._sourceMapURL);
			return {
				source,
				generatedLine: mapping.generatedLine,
				generatedColumn: mapping.generatedColumn,
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: mapping.name === null ? null : this._names.at(mapping.name)
			};
		}, this).forEach(aCallback, context);
	};
	SourceMapConsumer$1.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util$4.getArg(aArgs, "line");
		var needle = {
			source: util$4.getArg(aArgs, "source"),
			originalLine: line,
			originalColumn: util$4.getArg(aArgs, "column", 0)
		};
		needle.source = this._findSourceIndex(needle.source);
		if (needle.source < 0) return [];
		var mappings = [];
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util$4.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (aArgs.column === void 0) {
				var originalLine = mapping.originalLine;
				while (mapping && mapping.originalLine === originalLine) {
					mappings.push({
						line: util$4.getArg(mapping, "generatedLine", null),
						column: util$4.getArg(mapping, "generatedColumn", null),
						lastColumn: util$4.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			} else {
				var originalColumn = mapping.originalColumn;
				while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
					mappings.push({
						line: util$4.getArg(mapping, "generatedLine", null),
						column: util$4.getArg(mapping, "generatedColumn", null),
						lastColumn: util$4.getArg(mapping, "lastGeneratedColumn", null)
					});
					mapping = this._originalMappings[++index];
				}
			}
		}
		return mappings;
	};
	exports.SourceMapConsumer = SourceMapConsumer$1;
	function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util$4.parseSourceMapInput(aSourceMap);
		var version = util$4.getArg(sourceMap, "version");
		var sources = util$4.getArg(sourceMap, "sources");
		var names$1 = util$4.getArg(sourceMap, "names", []);
		var sourceRoot = util$4.getArg(sourceMap, "sourceRoot", null);
		var sourcesContent = util$4.getArg(sourceMap, "sourcesContent", null);
		var mappings = util$4.getArg(sourceMap, "mappings");
		var file = util$4.getArg(sourceMap, "file", null);
		if (version != this._version) throw new Error("Unsupported version: " + version);
		if (sourceRoot) sourceRoot = util$4.normalize(sourceRoot);
		sources = sources.map(String).map(util$4.normalize).map(function(source) {
			return sourceRoot && util$4.isAbsolute(sourceRoot) && util$4.isAbsolute(source) ? util$4.relative(sourceRoot, source) : source;
		});
		this._names = ArraySet.fromArray(names$1.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);
		this._absoluteSources = this._sources.toArray().map(function(s) {
			return util$4.computeSourceURL(sourceRoot, s, aSourceMapURL);
		});
		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this._sourceMapURL = aSourceMapURL;
		this.file = file;
	}
	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$1;
	BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util$4.relative(this.sourceRoot, relativeSource);
		if (this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
		var i;
		for (i = 0; i < this._absoluteSources.length; ++i) if (this._absoluteSources[i] == aSource) return i;
		return -1;
	};
	BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);
		var names$1 = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
		smc.file = aSourceMap._file;
		smc._sourceMapURL = aSourceMapURL;
		smc._absoluteSources = smc._sources.toArray().map(function(s) {
			return util$4.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
		});
		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];
		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping();
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;
			if (srcMapping.source) {
				destMapping.source = sources.indexOf(srcMapping.source);
				destMapping.originalLine = srcMapping.originalLine;
				destMapping.originalColumn = srcMapping.originalColumn;
				if (srcMapping.name) destMapping.name = names$1.indexOf(srcMapping.name);
				destOriginalMappings.push(destMapping);
			}
			destGeneratedMappings.push(destMapping);
		}
		quickSort(smc.__originalMappings, util$4.compareByOriginalPositions);
		return smc;
	};
	BasicSourceMapConsumer.prototype._version = 3;
	Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", { get: function() {
		return this._absoluteSources.slice();
	} });
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}
	BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var cachedSegments = {};
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [];
		var mapping, str, segment, end, value;
		while (index < length) if (aStr.charAt(index) === ";") {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
		} else if (aStr.charAt(index) === ",") index++;
		else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;
			for (end = index; end < length; end++) if (this._charIsMappingSeparator(aStr, end)) break;
			str = aStr.slice(index, end);
			segment = cachedSegments[str];
			if (segment) index += str.length;
			else {
				segment = [];
				while (index < end) {
					base64VLQ.decode(aStr, index, temp);
					value = temp.value;
					index = temp.rest;
					segment.push(value);
				}
				if (segment.length === 2) throw new Error("Found a source, but no line and column");
				if (segment.length === 3) throw new Error("Found a source and line, but no column");
				cachedSegments[str] = segment;
			}
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;
			if (segment.length > 1) {
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				mapping.originalLine += 1;
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;
				if (segment.length > 4) {
					mapping.name = previousName + segment[4];
					previousName += segment[4];
				}
			}
			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === "number") originalMappings.push(mapping);
		}
		quickSort(generatedMappings, util$4.compareByGeneratedPositionsDeflated);
		this.__generatedMappings = generatedMappings;
		quickSort(originalMappings, util$4.compareByOriginalPositions);
		this.__originalMappings = originalMappings;
	};
	BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
		if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
		if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	};
	BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];
			if (index + 1 < this._generatedMappings.length) {
				var nextMapping = this._generatedMappings[index + 1];
				if (mapping.generatedLine === nextMapping.generatedLine) {
					mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
					continue;
				}
			}
			mapping.lastGeneratedColumn = Infinity;
		}
	};
	BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util$4.getArg(aArgs, "line"),
			generatedColumn: util$4.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util$4.compareByGeneratedPositionsDeflated, util$4.getArg(aArgs, "bias", SourceMapConsumer$1.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._generatedMappings[index];
			if (mapping.generatedLine === needle.generatedLine) {
				var source = util$4.getArg(mapping, "source", null);
				if (source !== null) {
					source = this._sources.at(source);
					source = util$4.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
				}
				var name = util$4.getArg(mapping, "name", null);
				if (name !== null) name = this._names.at(name);
				return {
					source,
					line: util$4.getArg(mapping, "originalLine", null),
					column: util$4.getArg(mapping, "originalColumn", null),
					name
				};
			}
		}
		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
	};
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) return false;
		return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
			return sc == null;
		});
	};
	BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) return null;
		var index = this._findSourceIndex(aSource);
		if (index >= 0) return this.sourcesContent[index];
		var relativeSource = aSource;
		if (this.sourceRoot != null) relativeSource = util$4.relative(this.sourceRoot, relativeSource);
		var url;
		if (this.sourceRoot != null && (url = util$4.urlParse(this.sourceRoot))) {
			var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
			if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
			if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + relativeSource + "\" is not in the SourceMap.");
	};
	BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util$4.getArg(aArgs, "source");
		source = this._findSourceIndex(source);
		if (source < 0) return {
			line: null,
			column: null,
			lastColumn: null
		};
		var needle = {
			source,
			originalLine: util$4.getArg(aArgs, "line"),
			originalColumn: util$4.getArg(aArgs, "column")
		};
		var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util$4.compareByOriginalPositions, util$4.getArg(aArgs, "bias", SourceMapConsumer$1.GREATEST_LOWER_BOUND));
		if (index >= 0) {
			var mapping = this._originalMappings[index];
			if (mapping.source === needle.source) return {
				line: util$4.getArg(mapping, "generatedLine", null),
				column: util$4.getArg(mapping, "generatedColumn", null),
				lastColumn: util$4.getArg(mapping, "lastGeneratedColumn", null)
			};
		}
		return {
			line: null,
			column: null,
			lastColumn: null
		};
	};
	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === "string") sourceMap = util$4.parseSourceMapInput(aSourceMap);
		var version = util$4.getArg(sourceMap, "version");
		var sections = util$4.getArg(sourceMap, "sections");
		if (version != this._version) throw new Error("Unsupported version: " + version);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		var lastOffset = {
			line: -1,
			column: 0
		};
		this._sections = sections.map(function(s) {
			if (s.url) throw new Error("Support for url field in sections not implemented.");
			var offset = util$4.getArg(s, "offset");
			var offsetLine = util$4.getArg(offset, "line");
			var offsetColumn = util$4.getArg(offset, "column");
			if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
			lastOffset = offset;
			return {
				generatedOffset: {
					generatedLine: offsetLine + 1,
					generatedColumn: offsetColumn + 1
				},
				consumer: new SourceMapConsumer$1(util$4.getArg(s, "map"), aSourceMapURL)
			};
		});
	}
	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer$1;
	IndexedSourceMapConsumer.prototype._version = 3;
	Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", { get: function() {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) for (var j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
		return sources;
	} });
	IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util$4.getArg(aArgs, "line"),
			generatedColumn: util$4.getArg(aArgs, "column")
		};
		var sectionIndex = binarySearch.search(needle, this._sections, function(needle$1, section$1) {
			var cmp = needle$1.generatedLine - section$1.generatedOffset.generatedLine;
			if (cmp) return cmp;
			return needle$1.generatedColumn - section$1.generatedOffset.generatedColumn;
		});
		var section = this._sections[sectionIndex];
		if (!section) return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		return section.consumer.originalPositionFor({
			line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
			bias: aArgs.bias
		});
	};
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function(s) {
			return s.consumer.hasContentsOfAllSources();
		});
	};
	IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var content = this._sections[i].consumer.sourceContentFor(aSource, true);
			if (content) return content;
		}
		if (nullOnMissing) return null;
		else throw new Error("\"" + aSource + "\" is not in the SourceMap.");
	};
	IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			if (section.consumer._findSourceIndex(util$4.getArg(aArgs, "source")) === -1) continue;
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) return {
				line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
			};
		}
		return {
			line: null,
			column: null
		};
	};
	IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
				var mapping = sectionMappings[j];
				var source = section.consumer._sources.at(mapping.source);
				source = util$4.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
				this._sources.add(source);
				source = this._sources.indexOf(source);
				var name = null;
				if (mapping.name) {
					name = section.consumer._names.at(mapping.name);
					this._names.add(name);
					name = this._names.indexOf(name);
				}
				var adjustedMapping = {
					source,
					generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
					generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
					originalLine: mapping.originalLine,
					originalColumn: mapping.originalColumn,
					name
				};
				this.__generatedMappings.push(adjustedMapping);
				if (typeof adjustedMapping.originalLine === "number") this.__originalMappings.push(adjustedMapping);
			}
		}
		quickSort(this.__generatedMappings, util$4.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util$4.compareByOriginalPositions);
	};
	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}));
var require_source_node = /* @__PURE__ */ __commonJSMin(((exports) => {
	var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	var util$3 = require_util();
	var REGEX_NEWLINE = /(\r?\n)/;
	var isSourceNode = "$$$isSourceNode$$$";
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}
	SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		var node = new SourceNode();
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var remainingLinesIndex = 0;
		var shiftNextLine = function() {
			var lineContents = getNextLine();
			var newLine = getNextLine() || "";
			return lineContents + newLine;
			function getNextLine() {
				return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
			}
		};
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;
		var lastMapping = null;
		aSourceMapConsumer.eachMapping(function(mapping) {
			if (lastMapping !== null) if (lastGeneratedLine < mapping.generatedLine) {
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
			} else {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				lastMapping = mapping;
				return;
			}
			while (lastGeneratedLine < mapping.generatedLine) {
				node.add(shiftNextLine());
				lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
				var nextLine = remainingLines[remainingLinesIndex] || "";
				node.add(nextLine.substr(0, mapping.generatedColumn));
				remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		if (remainingLinesIndex < remainingLines.length) {
			if (lastMapping) addMappingWithCode(lastMapping, shiftNextLine());
			node.add(remainingLines.splice(remainingLinesIndex).join(""));
		}
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aRelativePath != null) sourceFile = util$3.join(aRelativePath, sourceFile);
				node.setSourceContent(sourceFile, content);
			}
		});
		return node;
		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === void 0) node.add(code);
			else {
				var source = aRelativePath ? util$3.join(aRelativePath, mapping.source) : mapping.source;
				node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
			}
		}
	};
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
			this.add(chunk);
		}, this);
		else if (aChunk["$$$isSourceNode$$$"] || typeof aChunk === "string") {
			if (aChunk) this.children.push(aChunk);
		} else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]);
		else if (aChunk["$$$isSourceNode$$$"] || typeof aChunk === "string") this.children.unshift(aChunk);
		else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
		return this;
	};
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
			chunk = this.children[i];
			if (chunk["$$$isSourceNode$$$"]) chunk.walk(aFn);
			else if (chunk !== "") aFn(chunk, {
				source: this.source,
				line: this.line,
				column: this.column,
				name: this.name
			});
		}
	};
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
			newChildren = [];
			for (i = 0; i < len - 1; i++) {
				newChildren.push(this.children[i]);
				newChildren.push(aSep);
			}
			newChildren.push(this.children[i]);
			this.children = newChildren;
		}
		return this;
	};
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild["$$$isSourceNode$$$"]) lastChild.replaceRight(aPattern, aReplacement);
		else if (typeof lastChild === "string") this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		else this.children.push("".replace(aPattern, aReplacement));
		return this;
	};
	SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util$3.toSetString(aSourceFile)] = aSourceContent;
	};
	SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) if (this.children[i]["$$$isSourceNode$$$"]) this.children[i].walkSourceContents(aFn);
		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) aFn(util$3.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	};
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function(chunk) {
			str += chunk;
		});
		return str;
	};
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
			code: "",
			line: 1,
			column: 0
		};
		var map$1 = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function(chunk, original) {
			generated.code += chunk;
			if (original.source !== null && original.line !== null && original.column !== null) {
				if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) map$1.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
				lastOriginalSource = original.source;
				lastOriginalLine = original.line;
				lastOriginalColumn = original.column;
				lastOriginalName = original.name;
				sourceMappingActive = true;
			} else if (sourceMappingActive) {
				map$1.addMapping({ generated: {
					line: generated.line,
					column: generated.column
				} });
				lastOriginalSource = null;
				sourceMappingActive = false;
			}
			for (var idx = 0, length = chunk.length; idx < length; idx++) if (chunk.charCodeAt(idx) === 10) {
				generated.line++;
				generated.column = 0;
				if (idx + 1 === length) {
					lastOriginalSource = null;
					sourceMappingActive = false;
				} else if (sourceMappingActive) map$1.addMapping({
					source: original.source,
					original: {
						line: original.line,
						column: original.column
					},
					generated: {
						line: generated.line,
						column: generated.column
					},
					name: original.name
				});
			} else generated.column++;
		});
		this.walkSourceContents(function(sourceFile, sourceContent) {
			map$1.setSourceContent(sourceFile, sourceContent);
		});
		return {
			code: generated.code,
			map: map$1
		};
	};
	exports.SourceNode = SourceNode;
}));
var require_source_map = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
	exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
	exports.SourceNode = require_source_node().SourceNode;
}));
var require_buffer_from = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString$1 = Object.prototype.toString;
	var isModern = typeof Buffer !== "undefined" && typeof Buffer.alloc === "function" && typeof Buffer.allocUnsafe === "function" && typeof Buffer.from === "function";
	function isArrayBuffer$2(input) {
		return toString$1.call(input).slice(8, -1) === "ArrayBuffer";
	}
	function fromArrayBuffer(obj, byteOffset, length) {
		byteOffset >>>= 0;
		var maxLength = obj.byteLength - byteOffset;
		if (maxLength < 0) throw new RangeError("'offset' is out of bounds");
		if (length === void 0) length = maxLength;
		else {
			length >>>= 0;
			if (length > maxLength) throw new RangeError("'length' is out of bounds");
		}
		return isModern ? Buffer.from(obj.slice(byteOffset, byteOffset + length)) : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)));
	}
	function fromString$1(string, encoding) {
		if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
		if (!Buffer.isEncoding(encoding)) throw new TypeError("\"encoding\" must be a valid string encoding");
		return isModern ? Buffer.from(string, encoding) : new Buffer(string, encoding);
	}
	function bufferFrom$1(value, encodingOrOffset, length) {
		if (typeof value === "number") throw new TypeError("\"value\" argument must not be a number");
		if (isArrayBuffer$2(value)) return fromArrayBuffer(value, encodingOrOffset, length);
		if (typeof value === "string") return fromString$1(value, encodingOrOffset);
		return isModern ? Buffer.from(value) : new Buffer(value);
	}
	module.exports = bufferFrom$1;
}));
var require_source_map_support = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var SourceMapConsumer = require_source_map().SourceMapConsumer;
	var path$2 = __require("path");
	var fs$4;
	try {
		fs$4 = __require("fs");
		if (!fs$4.existsSync || !fs$4.readFileSync) fs$4 = null;
	} catch (err) {}
	var bufferFrom = require_buffer_from();
	function dynamicRequire(mod, request) {
		return mod.require(request);
	}
	var errorFormatterInstalled = false;
	var uncaughtShimInstalled = false;
	var emptyCacheBetweenOperations = false;
	var environment = "auto";
	var fileContentsCache = {};
	var sourceMapCache = {};
	var reSourceMap = /^data:application\/json[^,]+base64,/;
	var retrieveFileHandlers = [];
	var retrieveMapHandlers = [];
	function isInBrowser() {
		if (environment === "browser") return true;
		if (environment === "node") return false;
		return typeof window !== "undefined" && typeof XMLHttpRequest === "function" && !(window.require && window.module && window.process && window.process.type === "renderer");
	}
	function hasGlobalProcessEventEmitter() {
		return typeof process === "object" && process !== null && typeof process.on === "function";
	}
	function globalProcessVersion() {
		if (typeof process === "object" && process !== null) return process.version;
		else return "";
	}
	function globalProcessStderr() {
		if (typeof process === "object" && process !== null) return process.stderr;
	}
	function globalProcessExit(code) {
		if (typeof process === "object" && process !== null && typeof process.exit === "function") return process.exit(code);
	}
	function handlerExec(list) {
		return function(arg) {
			for (var i = 0; i < list.length; i++) {
				var ret = list[i](arg);
				if (ret) return ret;
			}
			return null;
		};
	}
	var retrieveFile = handlerExec(retrieveFileHandlers);
	retrieveFileHandlers.push(function(path$3) {
		path$3 = path$3.trim();
		if (/^file:/.test(path$3)) path$3 = path$3.replace(/file:\/\/\/(\w:)?/, function(protocol$1, drive) {
			return drive ? "" : "/";
		});
		if (path$3 in fileContentsCache) return fileContentsCache[path$3];
		var contents = "";
		try {
			if (!fs$4) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", path$3, false);
				xhr.send(null);
				if (xhr.readyState === 4 && xhr.status === 200) contents = xhr.responseText;
			} else if (fs$4.existsSync(path$3)) contents = fs$4.readFileSync(path$3, "utf8");
		} catch (er) {}
		return fileContentsCache[path$3] = contents;
	});
	function supportRelativeURL(file, url) {
		if (!file) return url;
		var dir = path$2.dirname(file);
		var match$1 = /^\w+:\/\/[^\/]*/.exec(dir);
		var protocol$1 = match$1 ? match$1[0] : "";
		var startPath = dir.slice(protocol$1.length);
		if (protocol$1 && /^\/\w\:/.test(startPath)) {
			protocol$1 += "/";
			return protocol$1 + path$2.resolve(dir.slice(protocol$1.length), url).replace(/\\/g, "/");
		}
		return protocol$1 + path$2.resolve(dir.slice(protocol$1.length), url);
	}
	function retrieveSourceMapURL(source) {
		var fileData;
		if (isInBrowser()) try {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", source, false);
			xhr.send(null);
			fileData = xhr.readyState === 4 ? xhr.responseText : null;
			var sourceMapHeader = xhr.getResponseHeader("SourceMap") || xhr.getResponseHeader("X-SourceMap");
			if (sourceMapHeader) return sourceMapHeader;
		} catch (e) {}
		fileData = retrieveFile(source);
		var re = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/gm;
		var lastMatch, match$1;
		while (match$1 = re.exec(fileData)) lastMatch = match$1;
		if (!lastMatch) return null;
		return lastMatch[1];
	}
	var retrieveSourceMap = handlerExec(retrieveMapHandlers);
	retrieveMapHandlers.push(function(source) {
		var sourceMappingURL = retrieveSourceMapURL(source);
		if (!sourceMappingURL) return null;
		var sourceMapData;
		if (reSourceMap.test(sourceMappingURL)) {
			var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(",") + 1);
			sourceMapData = bufferFrom(rawData, "base64").toString();
			sourceMappingURL = source;
		} else {
			sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
			sourceMapData = retrieveFile(sourceMappingURL);
		}
		if (!sourceMapData) return null;
		return {
			url: sourceMappingURL,
			map: sourceMapData
		};
	});
	function mapSourcePosition(position) {
		var sourceMap = sourceMapCache[position.source];
		if (!sourceMap) {
			var urlAndMap = retrieveSourceMap(position.source);
			if (urlAndMap) {
				sourceMap = sourceMapCache[position.source] = {
					url: urlAndMap.url,
					map: new SourceMapConsumer(urlAndMap.map)
				};
				if (sourceMap.map.sourcesContent) sourceMap.map.sources.forEach(function(source, i) {
					var contents = sourceMap.map.sourcesContent[i];
					if (contents) {
						var url = supportRelativeURL(sourceMap.url, source);
						fileContentsCache[url] = contents;
					}
				});
			} else sourceMap = sourceMapCache[position.source] = {
				url: null,
				map: null
			};
		}
		if (sourceMap && sourceMap.map && typeof sourceMap.map.originalPositionFor === "function") {
			var originalPosition = sourceMap.map.originalPositionFor(position);
			if (originalPosition.source !== null) {
				originalPosition.source = supportRelativeURL(sourceMap.url, originalPosition.source);
				return originalPosition;
			}
		}
		return position;
	}
	function mapEvalOrigin(origin) {
		var match$1 = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
		if (match$1) {
			var position = mapSourcePosition({
				source: match$1[2],
				line: +match$1[3],
				column: match$1[4] - 1
			});
			return "eval at " + match$1[1] + " (" + position.source + ":" + position.line + ":" + (position.column + 1) + ")";
		}
		match$1 = /^eval at ([^(]+) \((.+)\)$/.exec(origin);
		if (match$1) return "eval at " + match$1[1] + " (" + mapEvalOrigin(match$1[2]) + ")";
		return origin;
	}
	function CallSiteToString() {
		var fileName;
		var fileLocation = "";
		if (this.isNative()) fileLocation = "native";
		else {
			fileName = this.getScriptNameOrSourceURL();
			if (!fileName && this.isEval()) {
				fileLocation = this.getEvalOrigin();
				fileLocation += ", ";
			}
			if (fileName) fileLocation += fileName;
			else fileLocation += "<anonymous>";
			var lineNumber = this.getLineNumber();
			if (lineNumber != null) {
				fileLocation += ":" + lineNumber;
				var columnNumber = this.getColumnNumber();
				if (columnNumber) fileLocation += ":" + columnNumber;
			}
		}
		var line = "";
		var functionName = this.getFunctionName();
		var addSuffix = true;
		var isConstructor = this.isConstructor();
		if (!(this.isToplevel() || isConstructor)) {
			var typeName = this.getTypeName();
			if (typeName === "[object Object]") typeName = "null";
			var methodName = this.getMethodName();
			if (functionName) {
				if (typeName && functionName.indexOf(typeName) != 0) line += typeName + ".";
				line += functionName;
				if (methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1) line += " [as " + methodName + "]";
			} else line += typeName + "." + (methodName || "<anonymous>");
		} else if (isConstructor) line += "new " + (functionName || "<anonymous>");
		else if (functionName) line += functionName;
		else {
			line += fileLocation;
			addSuffix = false;
		}
		if (addSuffix) line += " (" + fileLocation + ")";
		return line;
	}
	function cloneCallSite(frame) {
		var object = {};
		Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach(function(name) {
			object[name] = /^(?:is|get)/.test(name) ? function() {
				return frame[name].call(frame);
			} : frame[name];
		});
		object.toString = CallSiteToString;
		return object;
	}
	function wrapCallSite(frame, state) {
		if (state === void 0) state = {
			nextPosition: null,
			curPosition: null
		};
		if (frame.isNative()) {
			state.curPosition = null;
			return frame;
		}
		var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
		if (source) {
			var line = frame.getLineNumber();
			var column = frame.getColumnNumber() - 1;
			var headerLength = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/.test(globalProcessVersion()) ? 0 : 62;
			if (line === 1 && column > headerLength && !isInBrowser() && !frame.isEval()) column -= headerLength;
			var position = mapSourcePosition({
				source,
				line,
				column
			});
			state.curPosition = position;
			frame = cloneCallSite(frame);
			var originalFunctionName = frame.getFunctionName;
			frame.getFunctionName = function() {
				if (state.nextPosition == null) return originalFunctionName();
				return state.nextPosition.name || originalFunctionName();
			};
			frame.getFileName = function() {
				return position.source;
			};
			frame.getLineNumber = function() {
				return position.line;
			};
			frame.getColumnNumber = function() {
				return position.column + 1;
			};
			frame.getScriptNameOrSourceURL = function() {
				return position.source;
			};
			return frame;
		}
		var origin = frame.isEval() && frame.getEvalOrigin();
		if (origin) {
			origin = mapEvalOrigin(origin);
			frame = cloneCallSite(frame);
			frame.getEvalOrigin = function() {
				return origin;
			};
			return frame;
		}
		return frame;
	}
	function prepareStackTrace(error, stack) {
		if (emptyCacheBetweenOperations) {
			fileContentsCache = {};
			sourceMapCache = {};
		}
		var name = error.name || "Error";
		var message$2 = error.message || "";
		var errorString = name + ": " + message$2;
		var state = {
			nextPosition: null,
			curPosition: null
		};
		var processedStack = [];
		for (var i = stack.length - 1; i >= 0; i--) {
			processedStack.push("\n    at " + wrapCallSite(stack[i], state));
			state.nextPosition = state.curPosition;
		}
		state.curPosition = state.nextPosition = null;
		return errorString + processedStack.reverse().join("");
	}
	function getErrorSource(error) {
		var match$1 = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
		if (match$1) {
			var source = match$1[1];
			var line = +match$1[2];
			var column = +match$1[3];
			var contents = fileContentsCache[source];
			if (!contents && fs$4 && fs$4.existsSync(source)) try {
				contents = fs$4.readFileSync(source, "utf8");
			} catch (er) {
				contents = "";
			}
			if (contents) {
				var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
				if (code) return source + ":" + line + "\n" + code + "\n" + new Array(column).join(" ") + "^";
			}
		}
		return null;
	}
	function printErrorAndExit(error) {
		var source = getErrorSource(error);
		var stderr = globalProcessStderr();
		if (stderr && stderr._handle && stderr._handle.setBlocking) stderr._handle.setBlocking(true);
		if (source) {
			console.error();
			console.error(source);
		}
		console.error(error.stack);
		globalProcessExit(1);
	}
	function shimEmitUncaughtException() {
		var origEmit = process.emit;
		process.emit = function(type) {
			if (type === "uncaughtException") {
				var hasStack = arguments[1] && arguments[1].stack;
				var hasListeners = this.listeners(type).length > 0;
				if (hasStack && !hasListeners) return printErrorAndExit(arguments[1]);
			}
			return origEmit.apply(this, arguments);
		};
	}
	var originalRetrieveFileHandlers = retrieveFileHandlers.slice(0);
	var originalRetrieveMapHandlers = retrieveMapHandlers.slice(0);
	exports.wrapCallSite = wrapCallSite;
	exports.getErrorSource = getErrorSource;
	exports.mapSourcePosition = mapSourcePosition;
	exports.retrieveSourceMap = retrieveSourceMap;
	exports.install = function(options) {
		options = options || {};
		if (options.environment) {
			environment = options.environment;
			if ([
				"node",
				"browser",
				"auto"
			].indexOf(environment) === -1) throw new Error("environment " + environment + " was unknown. Available options are {auto, browser, node}");
		}
		if (options.retrieveFile) {
			if (options.overrideRetrieveFile) retrieveFileHandlers.length = 0;
			retrieveFileHandlers.unshift(options.retrieveFile);
		}
		if (options.retrieveSourceMap) {
			if (options.overrideRetrieveSourceMap) retrieveMapHandlers.length = 0;
			retrieveMapHandlers.unshift(options.retrieveSourceMap);
		}
		if (options.hookRequire && !isInBrowser()) {
			var Module = dynamicRequire(module, "module");
			var $compile = Module.prototype._compile;
			if (!$compile.__sourceMapSupport) {
				Module.prototype._compile = function(content, filename) {
					fileContentsCache[filename] = content;
					sourceMapCache[filename] = void 0;
					return $compile.call(this, content, filename);
				};
				Module.prototype._compile.__sourceMapSupport = true;
			}
		}
		if (!emptyCacheBetweenOperations) emptyCacheBetweenOperations = "emptyCacheBetweenOperations" in options ? options.emptyCacheBetweenOperations : false;
		if (!errorFormatterInstalled) {
			errorFormatterInstalled = true;
			Error.prepareStackTrace = prepareStackTrace;
		}
		if (!uncaughtShimInstalled) {
			var installHandler = "handleUncaughtExceptions" in options ? options.handleUncaughtExceptions : true;
			try {
				if (dynamicRequire(module, "worker_threads").isMainThread === false) installHandler = false;
			} catch (e) {}
			if (installHandler && hasGlobalProcessEventEmitter()) {
				uncaughtShimInstalled = true;
				shimEmitUncaughtException();
			}
		}
	};
	exports.resetRetrieveHandlers = function() {
		retrieveFileHandlers.length = 0;
		retrieveMapHandlers.length = 0;
		retrieveFileHandlers = originalRetrieveFileHandlers.slice(0);
		retrieveMapHandlers = originalRetrieveMapHandlers.slice(0);
		retrieveSourceMap = handlerExec(retrieveMapHandlers);
		retrieveFile = handlerExec(retrieveFileHandlers);
	};
}));
var jsbi_exports = {};
__export(jsbi_exports, { default: () => jsbi_default });
var JSBI$2, jsbi_default;
var init_jsbi = __esmMin((() => {
	JSBI$2 = class JSBI$2 extends Array {
		constructor(i, _) {
			if (super(i), this.sign = _, Object.setPrototypeOf(this, JSBI$2.prototype), i > JSBI$2.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded");
		}
		static BigInt(i) {
			var _ = Math.floor, t$1 = Number.isFinite;
			if ("number" == typeof i) {
				if (0 === i) return JSBI$2.__zero();
				if (JSBI$2.__isOneDigitInt(i)) return 0 > i ? JSBI$2.__oneDigit(-i, !0) : JSBI$2.__oneDigit(i, !1);
				if (!t$1(i) || _(i) !== i) throw new RangeError("The number " + i + " cannot be converted to BigInt because it is not an integer");
				return JSBI$2.__fromDouble(i);
			}
			if ("string" == typeof i) {
				const _$1 = JSBI$2.__fromString(i);
				if (null === _$1) throw new SyntaxError("Cannot convert " + i + " to a BigInt");
				return _$1;
			}
			if ("boolean" == typeof i) return !0 === i ? JSBI$2.__oneDigit(1, !1) : JSBI$2.__zero();
			if ("object" == typeof i) {
				if (i.constructor === JSBI$2) return i;
				const _$1 = JSBI$2.__toPrimitive(i);
				return JSBI$2.BigInt(_$1);
			}
			throw new TypeError("Cannot convert " + i + " to a BigInt");
		}
		toDebugString() {
			const i = ["BigInt["];
			for (const _ of this) i.push((_ ? (_ >>> 0).toString(16) : _) + ", ");
			return i.push("]"), i.join("");
		}
		toString(i = 10) {
			if (2 > i || 36 < i) throw new RangeError("toString() radix argument must be between 2 and 36");
			return 0 === this.length ? "0" : 0 == (i & i - 1) ? JSBI$2.__toStringBasePowerOfTwo(this, i) : JSBI$2.__toStringGeneric(this, i, !1);
		}
		valueOf() {
			throw new Error("Convert JSBI instances to native numbers using `toNumber`.");
		}
		static toNumber(i) {
			const _ = i.length;
			if (0 === _) return 0;
			if (1 === _) {
				const _$1 = i.__unsignedDigit(0);
				return i.sign ? -_$1 : _$1;
			}
			const t$1 = i.__digit(_ - 1), e = JSBI$2.__clz30(t$1), n = 30 * _ - e;
			if (1024 < n) return i.sign ? -Infinity : Infinity;
			let g$2 = n - 1, o = t$1, s = _ - 1;
			const l = e + 3;
			let r = 32 === l ? 0 : o << l;
			r >>>= 12;
			const a = l - 12;
			let u = 12 <= l ? 0 : o << 20 + l, d = 20 + l;
			for (0 < a && 0 < s && (s--, o = i.__digit(s), r |= o >>> 30 - a, u = o << a + 2, d = a + 2); 0 < d && 0 < s;) s--, o = i.__digit(s), u |= 30 <= d ? o << d - 30 : o >>> 30 - d, d -= 30;
			const h = JSBI$2.__decideRounding(i, d, s, o);
			if ((1 === h || 0 === h && 1 == (1 & u)) && (u = u + 1 >>> 0, 0 === u && (r++, 0 != r >>> 20 && (r = 0, g$2++, 1023 < g$2)))) return i.sign ? -Infinity : Infinity;
			const m$1 = i.sign ? -2147483648 : 0;
			return g$2 = g$2 + 1023 << 20, JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntHigh] = m$1 | g$2 | r, JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntLow] = u, JSBI$2.__kBitConversionDouble[0];
		}
		static unaryMinus(i) {
			if (0 === i.length) return i;
			const _ = i.__copy();
			return _.sign = !i.sign, _;
		}
		static bitwiseNot(i) {
			return i.sign ? JSBI$2.__absoluteSubOne(i).__trim() : JSBI$2.__absoluteAddOne(i, !0);
		}
		static exponentiate(i, _) {
			if (_.sign) throw new RangeError("Exponent must be positive");
			if (0 === _.length) return JSBI$2.__oneDigit(1, !1);
			if (0 === i.length) return i;
			if (1 === i.length && 1 === i.__digit(0)) return i.sign && 0 == (1 & _.__digit(0)) ? JSBI$2.unaryMinus(i) : i;
			if (1 < _.length) throw new RangeError("BigInt too big");
			let t$1 = _.__unsignedDigit(0);
			if (1 === t$1) return i;
			if (t$1 >= JSBI$2.__kMaxLengthBits) throw new RangeError("BigInt too big");
			if (1 === i.length && 2 === i.__digit(0)) {
				const _$1 = 1 + (0 | t$1 / 30), e$1 = i.sign && 0 != (1 & t$1), n$1 = new JSBI$2(_$1, e$1);
				n$1.__initializeDigits();
				const g$2 = 1 << t$1 % 30;
				return n$1.__setDigit(_$1 - 1, g$2), n$1;
			}
			let e = null, n = i;
			for (0 != (1 & t$1) && (e = i), t$1 >>= 1; 0 !== t$1; t$1 >>= 1) n = JSBI$2.multiply(n, n), 0 != (1 & t$1) && (null === e ? e = n : e = JSBI$2.multiply(e, n));
			return e;
		}
		static multiply(_, t$1) {
			if (0 === _.length) return _;
			if (0 === t$1.length) return t$1;
			let i = _.length + t$1.length;
			30 <= _.__clzmsd() + t$1.__clzmsd() && i--;
			const e = new JSBI$2(i, _.sign !== t$1.sign);
			e.__initializeDigits();
			for (let n = 0; n < _.length; n++) JSBI$2.__multiplyAccumulate(t$1, _.__digit(n), e, n);
			return e.__trim();
		}
		static divide(i, _) {
			if (0 === _.length) throw new RangeError("Division by zero");
			if (0 > JSBI$2.__absoluteCompare(i, _)) return JSBI$2.__zero();
			const t$1 = i.sign !== _.sign, e = _.__unsignedDigit(0);
			let n;
			if (1 === _.length && 32767 >= e) {
				if (1 === e) return t$1 === i.sign ? i : JSBI$2.unaryMinus(i);
				n = JSBI$2.__absoluteDivSmall(i, e, null);
			} else n = JSBI$2.__absoluteDivLarge(i, _, !0, !1);
			return n.sign = t$1, n.__trim();
		}
		static remainder(i, _) {
			if (0 === _.length) throw new RangeError("Division by zero");
			if (0 > JSBI$2.__absoluteCompare(i, _)) return i;
			const t$1 = _.__unsignedDigit(0);
			if (1 === _.length && 32767 >= t$1) {
				if (1 === t$1) return JSBI$2.__zero();
				const _$1 = JSBI$2.__absoluteModSmall(i, t$1);
				return 0 === _$1 ? JSBI$2.__zero() : JSBI$2.__oneDigit(_$1, i.sign);
			}
			const e = JSBI$2.__absoluteDivLarge(i, _, !1, !0);
			return e.sign = i.sign, e.__trim();
		}
		static add(i, _) {
			const t$1 = i.sign;
			return t$1 === _.sign ? JSBI$2.__absoluteAdd(i, _, t$1) : 0 <= JSBI$2.__absoluteCompare(i, _) ? JSBI$2.__absoluteSub(i, _, t$1) : JSBI$2.__absoluteSub(_, i, !t$1);
		}
		static subtract(i, _) {
			const t$1 = i.sign;
			return t$1 === _.sign ? 0 <= JSBI$2.__absoluteCompare(i, _) ? JSBI$2.__absoluteSub(i, _, t$1) : JSBI$2.__absoluteSub(_, i, !t$1) : JSBI$2.__absoluteAdd(i, _, t$1);
		}
		static leftShift(i, _) {
			return 0 === _.length || 0 === i.length ? i : _.sign ? JSBI$2.__rightShiftByAbsolute(i, _) : JSBI$2.__leftShiftByAbsolute(i, _);
		}
		static signedRightShift(i, _) {
			return 0 === _.length || 0 === i.length ? i : _.sign ? JSBI$2.__leftShiftByAbsolute(i, _) : JSBI$2.__rightShiftByAbsolute(i, _);
		}
		static unsignedRightShift() {
			throw new TypeError("BigInts have no unsigned right shift; use >> instead");
		}
		static lessThan(i, _) {
			return 0 > JSBI$2.__compareToBigInt(i, _);
		}
		static lessThanOrEqual(i, _) {
			return 0 >= JSBI$2.__compareToBigInt(i, _);
		}
		static greaterThan(i, _) {
			return 0 < JSBI$2.__compareToBigInt(i, _);
		}
		static greaterThanOrEqual(i, _) {
			return 0 <= JSBI$2.__compareToBigInt(i, _);
		}
		static equal(_, t$1) {
			if (_.sign !== t$1.sign) return !1;
			if (_.length !== t$1.length) return !1;
			for (let e = 0; e < _.length; e++) if (_.__digit(e) !== t$1.__digit(e)) return !1;
			return !0;
		}
		static notEqual(i, _) {
			return !JSBI$2.equal(i, _);
		}
		static bitwiseAnd(i, _) {
			var t$1 = Math.max;
			if (!i.sign && !_.sign) return JSBI$2.__absoluteAnd(i, _).__trim();
			if (i.sign && _.sign) {
				const e = t$1(i.length, _.length) + 1;
				let n = JSBI$2.__absoluteSubOne(i, e);
				const g$2 = JSBI$2.__absoluteSubOne(_);
				return n = JSBI$2.__absoluteOr(n, g$2, n), JSBI$2.__absoluteAddOne(n, !0, n).__trim();
			}
			return i.sign && ([i, _] = [_, i]), JSBI$2.__absoluteAndNot(i, JSBI$2.__absoluteSubOne(_)).__trim();
		}
		static bitwiseXor(i, _) {
			var t$1 = Math.max;
			if (!i.sign && !_.sign) return JSBI$2.__absoluteXor(i, _).__trim();
			if (i.sign && _.sign) {
				const e$1 = t$1(i.length, _.length), n$1 = JSBI$2.__absoluteSubOne(i, e$1), g$2 = JSBI$2.__absoluteSubOne(_);
				return JSBI$2.__absoluteXor(n$1, g$2, n$1).__trim();
			}
			const e = t$1(i.length, _.length) + 1;
			i.sign && ([i, _] = [_, i]);
			let n = JSBI$2.__absoluteSubOne(_, e);
			return n = JSBI$2.__absoluteXor(n, i, n), JSBI$2.__absoluteAddOne(n, !0, n).__trim();
		}
		static bitwiseOr(i, _) {
			var t$1 = Math.max;
			const e = t$1(i.length, _.length);
			if (!i.sign && !_.sign) return JSBI$2.__absoluteOr(i, _).__trim();
			if (i.sign && _.sign) {
				let t$2 = JSBI$2.__absoluteSubOne(i, e);
				const n$1 = JSBI$2.__absoluteSubOne(_);
				return t$2 = JSBI$2.__absoluteAnd(t$2, n$1, t$2), JSBI$2.__absoluteAddOne(t$2, !0, t$2).__trim();
			}
			i.sign && ([i, _] = [_, i]);
			let n = JSBI$2.__absoluteSubOne(_, e);
			return n = JSBI$2.__absoluteAndNot(n, i, n), JSBI$2.__absoluteAddOne(n, !0, n).__trim();
		}
		static asIntN(_, t$1) {
			var i = Math.floor;
			if (0 === t$1.length) return t$1;
			if (_ = i(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer");
			if (0 === _) return JSBI$2.__zero();
			if (_ >= JSBI$2.__kMaxLengthBits) return t$1;
			const e = 0 | (_ + 29) / 30;
			if (t$1.length < e) return t$1;
			const g$2 = t$1.__unsignedDigit(e - 1), o = 1 << (_ - 1) % 30;
			if (t$1.length === e && g$2 < o) return t$1;
			if (!((g$2 & o) === o)) return JSBI$2.__truncateToNBits(_, t$1);
			if (!t$1.sign) return JSBI$2.__truncateAndSubFromPowerOfTwo(_, t$1, !0);
			if (0 == (g$2 & o - 1)) {
				for (let n = e - 2; 0 <= n; n--) if (0 !== t$1.__digit(n)) return JSBI$2.__truncateAndSubFromPowerOfTwo(_, t$1, !1);
				return t$1.length === e && g$2 === o ? t$1 : JSBI$2.__truncateToNBits(_, t$1);
			}
			return JSBI$2.__truncateAndSubFromPowerOfTwo(_, t$1, !1);
		}
		static asUintN(i, _) {
			var t$1 = Math.floor;
			if (0 === _.length) return _;
			if (i = t$1(i), 0 > i) throw new RangeError("Invalid value: not (convertible to) a safe integer");
			if (0 === i) return JSBI$2.__zero();
			if (_.sign) {
				if (i > JSBI$2.__kMaxLengthBits) throw new RangeError("BigInt too big");
				return JSBI$2.__truncateAndSubFromPowerOfTwo(i, _, !1);
			}
			if (i >= JSBI$2.__kMaxLengthBits) return _;
			const e = 0 | (i + 29) / 30;
			if (_.length < e) return _;
			const g$2 = i % 30;
			if (_.length == e) {
				if (0 === g$2) return _;
				if (0 == _.__digit(e - 1) >>> g$2) return _;
			}
			return JSBI$2.__truncateToNBits(i, _);
		}
		static ADD(i, _) {
			if (i = JSBI$2.__toPrimitive(i), _ = JSBI$2.__toPrimitive(_), "string" == typeof i) return "string" != typeof _ && (_ = _.toString()), i + _;
			if ("string" == typeof _) return i.toString() + _;
			if (i = JSBI$2.__toNumeric(i), _ = JSBI$2.__toNumeric(_), JSBI$2.__isBigInt(i) && JSBI$2.__isBigInt(_)) return JSBI$2.add(i, _);
			if ("number" == typeof i && "number" == typeof _) return i + _;
			throw new TypeError("Cannot mix BigInt and other types, use explicit conversions");
		}
		static LT(i, _) {
			return JSBI$2.__compare(i, _, 0);
		}
		static LE(i, _) {
			return JSBI$2.__compare(i, _, 1);
		}
		static GT(i, _) {
			return JSBI$2.__compare(i, _, 2);
		}
		static GE(i, _) {
			return JSBI$2.__compare(i, _, 3);
		}
		static EQ(i, _) {
			for (;;) {
				if (JSBI$2.__isBigInt(i)) return JSBI$2.__isBigInt(_) ? JSBI$2.equal(i, _) : JSBI$2.EQ(_, i);
				if ("number" == typeof i) {
					if (JSBI$2.__isBigInt(_)) return JSBI$2.__equalToNumber(_, i);
					if ("object" != typeof _) return i == _;
					_ = JSBI$2.__toPrimitive(_);
				} else if ("string" == typeof i) {
					if (JSBI$2.__isBigInt(_)) return i = JSBI$2.__fromString(i), null !== i && JSBI$2.equal(i, _);
					if ("object" != typeof _) return i == _;
					_ = JSBI$2.__toPrimitive(_);
				} else if ("boolean" == typeof i) {
					if (JSBI$2.__isBigInt(_)) return JSBI$2.__equalToNumber(_, +i);
					if ("object" != typeof _) return i == _;
					_ = JSBI$2.__toPrimitive(_);
				} else if ("symbol" == typeof i) {
					if (JSBI$2.__isBigInt(_)) return !1;
					if ("object" != typeof _) return i == _;
					_ = JSBI$2.__toPrimitive(_);
				} else if ("object" == typeof i) {
					if ("object" == typeof _ && _.constructor !== JSBI$2) return i == _;
					i = JSBI$2.__toPrimitive(i);
				} else return i == _;
			}
		}
		static NE(i, _) {
			return !JSBI$2.EQ(i, _);
		}
		static DataViewGetBigInt64(i, _, t$1 = !1) {
			return JSBI$2.asIntN(64, JSBI$2.DataViewGetBigUint64(i, _, t$1));
		}
		static DataViewGetBigUint64(i, _, t$1 = !1) {
			const [e, n] = t$1 ? [4, 0] : [0, 4], g$2 = i.getUint32(_ + e, t$1), o = i.getUint32(_ + n, t$1), s = new JSBI$2(3, !1);
			return s.__setDigit(0, 1073741823 & o), s.__setDigit(1, (268435455 & g$2) << 2 | o >>> 30), s.__setDigit(2, g$2 >>> 28), s.__trim();
		}
		static DataViewSetBigInt64(i, _, t$1, e = !1) {
			JSBI$2.DataViewSetBigUint64(i, _, t$1, e);
		}
		static DataViewSetBigUint64(i, _, t$1, e = !1) {
			t$1 = JSBI$2.asUintN(64, t$1);
			let n = 0, g$2 = 0;
			if (0 < t$1.length && (g$2 = t$1.__digit(0), 1 < t$1.length)) {
				const i$1 = t$1.__digit(1);
				g$2 |= i$1 << 30, n = i$1 >>> 2, 2 < t$1.length && (n |= t$1.__digit(2) << 28);
			}
			const [o, s] = e ? [4, 0] : [0, 4];
			i.setUint32(_ + o, n, e), i.setUint32(_ + s, g$2, e);
		}
		static __zero() {
			return new JSBI$2(0, !1);
		}
		static __oneDigit(i, _) {
			const t$1 = new JSBI$2(1, _);
			return t$1.__setDigit(0, i), t$1;
		}
		__copy() {
			const _ = new JSBI$2(this.length, this.sign);
			for (let t$1 = 0; t$1 < this.length; t$1++) _[t$1] = this[t$1];
			return _;
		}
		__trim() {
			let i = this.length, _ = this[i - 1];
			for (; 0 === _;) i--, _ = this[i - 1], this.pop();
			return 0 === i && (this.sign = !1), this;
		}
		__initializeDigits() {
			for (let _ = 0; _ < this.length; _++) this[_] = 0;
		}
		static __decideRounding(i, _, t$1, e) {
			if (0 < _) return -1;
			let n;
			if (0 > _) n = -_ - 1;
			else {
				if (0 === t$1) return -1;
				t$1--, e = i.__digit(t$1), n = 29;
			}
			let g$2 = 1 << n;
			if (0 == (e & g$2)) return -1;
			if (g$2 -= 1, 0 != (e & g$2)) return 1;
			for (; 0 < t$1;) if (t$1--, 0 !== i.__digit(t$1)) return 1;
			return 0;
		}
		static __fromDouble(i) {
			JSBI$2.__kBitConversionDouble[0] = i;
			const _ = 2047 & JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntHigh] >>> 20, t$1 = _ - 1023, e = (0 | t$1 / 30) + 1, n = new JSBI$2(e, 0 > i);
			let g$2 = 1048575 & JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntHigh] | 1048576, o = JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntLow];
			const s = 20, l = t$1 % 30;
			let r, a = 0;
			if (l < 20) {
				const i$1 = s - l;
				a = i$1 + 32, r = g$2 >>> i$1, g$2 = g$2 << 32 - i$1 | o >>> i$1, o <<= 32 - i$1;
			} else if (l === 20) a = 32, r = g$2, g$2 = o, o = 0;
			else {
				const i$1 = l - s;
				a = 32 - i$1, r = g$2 << i$1 | o >>> 32 - i$1, g$2 = o << i$1, o = 0;
			}
			n.__setDigit(e - 1, r);
			for (let _$1 = e - 2; 0 <= _$1; _$1--) 0 < a ? (a -= 30, r = g$2 >>> 2, g$2 = g$2 << 30 | o >>> 2, o <<= 30) : r = 0, n.__setDigit(_$1, r);
			return n.__trim();
		}
		static __isWhitespace(i) {
			return !!(13 >= i && 9 <= i) || (159 >= i ? 32 == i : 131071 >= i ? 160 == i || 5760 == i : 196607 >= i ? (i &= 131071, 10 >= i || 40 == i || 41 == i || 47 == i || 95 == i || 4096 == i) : 65279 == i);
		}
		static __fromString(i, _ = 0) {
			let t$1 = 0;
			const e = i.length;
			let n = 0;
			if (n === e) return JSBI$2.__zero();
			let g$2 = i.charCodeAt(n);
			for (; JSBI$2.__isWhitespace(g$2);) {
				if (++n === e) return JSBI$2.__zero();
				g$2 = i.charCodeAt(n);
			}
			if (43 === g$2) {
				if (++n === e) return null;
				g$2 = i.charCodeAt(n), t$1 = 1;
			} else if (45 === g$2) {
				if (++n === e) return null;
				g$2 = i.charCodeAt(n), t$1 = -1;
			}
			if (0 === _) {
				if (_ = 10, 48 === g$2) {
					if (++n === e) return JSBI$2.__zero();
					if (g$2 = i.charCodeAt(n), 88 === g$2 || 120 === g$2) {
						if (_ = 16, ++n === e) return null;
						g$2 = i.charCodeAt(n);
					} else if (79 === g$2 || 111 === g$2) {
						if (_ = 8, ++n === e) return null;
						g$2 = i.charCodeAt(n);
					} else if (66 === g$2 || 98 === g$2) {
						if (_ = 2, ++n === e) return null;
						g$2 = i.charCodeAt(n);
					}
				}
			} else if (16 === _ && 48 === g$2) {
				if (++n === e) return JSBI$2.__zero();
				if (g$2 = i.charCodeAt(n), 88 === g$2 || 120 === g$2) {
					if (++n === e) return null;
					g$2 = i.charCodeAt(n);
				}
			}
			if (0 != t$1 && 10 !== _) return null;
			for (; 48 === g$2;) {
				if (++n === e) return JSBI$2.__zero();
				g$2 = i.charCodeAt(n);
			}
			const o = e - n;
			let s = JSBI$2.__kMaxBitsPerChar[_], l = JSBI$2.__kBitsPerCharTableMultiplier - 1;
			if (o > 1073741824 / s) return null;
			const r = s * o + l >>> JSBI$2.__kBitsPerCharTableShift, a = new JSBI$2(0 | (r + 29) / 30, !1), u = 10 > _ ? _ : 10, h = 10 < _ ? _ - 10 : 0;
			if (0 == (_ & _ - 1)) {
				s >>= JSBI$2.__kBitsPerCharTableShift;
				const _$1 = [], t$2 = [];
				let o$1 = !1;
				do {
					let l$1 = 0, r$1 = 0;
					for (;;) {
						let _$2;
						if (g$2 - 48 >>> 0 < u) _$2 = g$2 - 48;
						else if ((32 | g$2) - 97 >>> 0 < h) _$2 = (32 | g$2) - 87;
						else {
							o$1 = !0;
							break;
						}
						if (r$1 += s, l$1 = l$1 << s | _$2, ++n === e) {
							o$1 = !0;
							break;
						}
						if (g$2 = i.charCodeAt(n), 30 < r$1 + s) break;
					}
					_$1.push(l$1), t$2.push(r$1);
				} while (!o$1);
				JSBI$2.__fillFromParts(a, _$1, t$2);
			} else {
				a.__initializeDigits();
				let t$2 = !1, o$1 = 0;
				do {
					let r$1 = 0, b = 1;
					for (;;) {
						let s$1;
						if (g$2 - 48 >>> 0 < u) s$1 = g$2 - 48;
						else if ((32 | g$2) - 97 >>> 0 < h) s$1 = (32 | g$2) - 87;
						else {
							t$2 = !0;
							break;
						}
						const l$1 = b * _;
						if (1073741823 < l$1) break;
						if (b = l$1, r$1 = r$1 * _ + s$1, o$1++, ++n === e) {
							t$2 = !0;
							break;
						}
						g$2 = i.charCodeAt(n);
					}
					l = 30 * JSBI$2.__kBitsPerCharTableMultiplier - 1;
					const D = 0 | (s * o$1 + l >>> JSBI$2.__kBitsPerCharTableShift) / 30;
					a.__inplaceMultiplyAdd(b, r$1, D);
				} while (!t$2);
			}
			if (n !== e) {
				if (!JSBI$2.__isWhitespace(g$2)) return null;
				for (n++; n < e; n++) if (g$2 = i.charCodeAt(n), !JSBI$2.__isWhitespace(g$2)) return null;
			}
			return a.sign = -1 == t$1, a.__trim();
		}
		static __fillFromParts(_, t$1, e) {
			let n = 0, g$2 = 0, o = 0;
			for (let s = t$1.length - 1; 0 <= s; s--) {
				const i = t$1[s], l = e[s];
				g$2 |= i << o, o += l, 30 === o ? (_.__setDigit(n++, g$2), o = 0, g$2 = 0) : 30 < o && (_.__setDigit(n++, 1073741823 & g$2), o -= 30, g$2 = i >>> l - o);
			}
			if (0 !== g$2) {
				if (n >= _.length) throw new Error("implementation bug");
				_.__setDigit(n++, g$2);
			}
			for (; n < _.length; n++) _.__setDigit(n, 0);
		}
		static __toStringBasePowerOfTwo(_, i) {
			const t$1 = _.length;
			let e = i - 1;
			e = (85 & e >>> 1) + (85 & e), e = (51 & e >>> 2) + (51 & e), e = (15 & e >>> 4) + (15 & e);
			const n = e, g$2 = i - 1, o = _.__digit(t$1 - 1), s = JSBI$2.__clz30(o);
			let l = 0 | (30 * t$1 - s + n - 1) / n;
			if (_.sign && l++, 268435456 < l) throw new Error("string too long");
			const r = Array(l);
			let a = l - 1, u = 0, d = 0;
			for (let e$1 = 0; e$1 < t$1 - 1; e$1++) {
				const i$1 = _.__digit(e$1), t$2 = (u | i$1 << d) & g$2;
				r[a--] = JSBI$2.__kConversionChars[t$2];
				const o$1 = n - d;
				for (u = i$1 >>> o$1, d = 30 - o$1; d >= n;) r[a--] = JSBI$2.__kConversionChars[u & g$2], u >>>= n, d -= n;
			}
			const h = (u | o << d) & g$2;
			for (r[a--] = JSBI$2.__kConversionChars[h], u = o >>> n - d; 0 !== u;) r[a--] = JSBI$2.__kConversionChars[u & g$2], u >>>= n;
			if (_.sign && (r[a--] = "-"), -1 != a) throw new Error("implementation bug");
			return r.join("");
		}
		static __toStringGeneric(_, i, t$1) {
			const e = _.length;
			if (0 === e) return "";
			if (1 === e) {
				let e$1 = _.__unsignedDigit(0).toString(i);
				return !1 === t$1 && _.sign && (e$1 = "-" + e$1), e$1;
			}
			const n = 30 * e - JSBI$2.__clz30(_.__digit(e - 1)), g$2 = JSBI$2.__kMaxBitsPerChar[i], o = g$2 - 1;
			let s = n * JSBI$2.__kBitsPerCharTableMultiplier;
			s += o - 1, s = 0 | s / o;
			const l = s + 1 >> 1, r = JSBI$2.exponentiate(JSBI$2.__oneDigit(i, !1), JSBI$2.__oneDigit(l, !1));
			let a, u;
			const d = r.__unsignedDigit(0);
			if (1 === r.length && 32767 >= d) {
				a = new JSBI$2(_.length, !1), a.__initializeDigits();
				let t$2 = 0;
				for (let e$1 = 2 * _.length - 1; 0 <= e$1; e$1--) {
					const i$1 = t$2 << 15 | _.__halfDigit(e$1);
					a.__setHalfDigit(e$1, 0 | i$1 / d), t$2 = 0 | i$1 % d;
				}
				u = t$2.toString(i);
			} else {
				const t$2 = JSBI$2.__absoluteDivLarge(_, r, !0, !0);
				a = t$2.quotient;
				const e$1 = t$2.remainder.__trim();
				u = JSBI$2.__toStringGeneric(e$1, i, !0);
			}
			a.__trim();
			let h = JSBI$2.__toStringGeneric(a, i, !0);
			for (; u.length < l;) u = "0" + u;
			return !1 === t$1 && _.sign && (h = "-" + h), h + u;
		}
		static __unequalSign(i) {
			return i ? -1 : 1;
		}
		static __absoluteGreater(i) {
			return i ? -1 : 1;
		}
		static __absoluteLess(i) {
			return i ? 1 : -1;
		}
		static __compareToBigInt(i, _) {
			const t$1 = i.sign;
			if (t$1 !== _.sign) return JSBI$2.__unequalSign(t$1);
			const e = JSBI$2.__absoluteCompare(i, _);
			return 0 < e ? JSBI$2.__absoluteGreater(t$1) : 0 > e ? JSBI$2.__absoluteLess(t$1) : 0;
		}
		static __compareToNumber(i, _) {
			if (JSBI$2.__isOneDigitInt(_)) {
				const t$1 = i.sign, e = 0 > _;
				if (t$1 !== e) return JSBI$2.__unequalSign(t$1);
				if (0 === i.length) {
					if (e) throw new Error("implementation bug");
					return 0 === _ ? 0 : -1;
				}
				if (1 < i.length) return JSBI$2.__absoluteGreater(t$1);
				const n = Math.abs(_), g$2 = i.__unsignedDigit(0);
				return g$2 > n ? JSBI$2.__absoluteGreater(t$1) : g$2 < n ? JSBI$2.__absoluteLess(t$1) : 0;
			}
			return JSBI$2.__compareToDouble(i, _);
		}
		static __compareToDouble(i, _) {
			if (_ !== _) return _;
			if (_ === Infinity) return -1;
			if (_ === -Infinity) return 1;
			const t$1 = i.sign;
			if (t$1 !== 0 > _) return JSBI$2.__unequalSign(t$1);
			if (0 === _) throw new Error("implementation bug: should be handled elsewhere");
			if (0 === i.length) return -1;
			JSBI$2.__kBitConversionDouble[0] = _;
			const e = 2047 & JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntHigh] >>> 20;
			if (2047 == e) throw new Error("implementation bug: handled elsewhere");
			const n = e - 1023;
			if (0 > n) return JSBI$2.__absoluteGreater(t$1);
			const g$2 = i.length;
			let o = i.__digit(g$2 - 1);
			const s = JSBI$2.__clz30(o), l = 30 * g$2 - s, r = n + 1;
			if (l < r) return JSBI$2.__absoluteLess(t$1);
			if (l > r) return JSBI$2.__absoluteGreater(t$1);
			let a = 1048576 | 1048575 & JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntHigh], u = JSBI$2.__kBitConversionInts[JSBI$2.__kBitConversionIntLow];
			const d = 20, h = 29 - s;
			if (h !== (0 | (l - 1) % 30)) throw new Error("implementation bug");
			let m$1, b = 0;
			if (20 > h) {
				const i$1 = d - h;
				b = i$1 + 32, m$1 = a >>> i$1, a = a << 32 - i$1 | u >>> i$1, u <<= 32 - i$1;
			} else if (20 === h) b = 32, m$1 = a, a = u, u = 0;
			else {
				const i$1 = h - d;
				b = 32 - i$1, m$1 = a << i$1 | u >>> 32 - i$1, a = u << i$1, u = 0;
			}
			if (o >>>= 0, m$1 >>>= 0, o > m$1) return JSBI$2.__absoluteGreater(t$1);
			if (o < m$1) return JSBI$2.__absoluteLess(t$1);
			for (let e$1 = g$2 - 2; 0 <= e$1; e$1--) {
				0 < b ? (b -= 30, m$1 = a >>> 2, a = a << 30 | u >>> 2, u <<= 30) : m$1 = 0;
				const _$1 = i.__unsignedDigit(e$1);
				if (_$1 > m$1) return JSBI$2.__absoluteGreater(t$1);
				if (_$1 < m$1) return JSBI$2.__absoluteLess(t$1);
			}
			if (0 !== a || 0 !== u) {
				if (0 === b) throw new Error("implementation bug");
				return JSBI$2.__absoluteLess(t$1);
			}
			return 0;
		}
		static __equalToNumber(i, _) {
			var t$1 = Math.abs;
			return JSBI$2.__isOneDigitInt(_) ? 0 === _ ? 0 === i.length : 1 === i.length && i.sign === 0 > _ && i.__unsignedDigit(0) === t$1(_) : 0 === JSBI$2.__compareToDouble(i, _);
		}
		static __comparisonResultToBool(i, _) {
			return 0 === _ ? 0 > i : 1 === _ ? 0 >= i : 2 === _ ? 0 < i : 3 === _ ? 0 <= i : void 0;
		}
		static __compare(i, _, t$1) {
			if (i = JSBI$2.__toPrimitive(i), _ = JSBI$2.__toPrimitive(_), "string" == typeof i && "string" == typeof _) switch (t$1) {
				case 0: return i < _;
				case 1: return i <= _;
				case 2: return i > _;
				case 3: return i >= _;
			}
			if (JSBI$2.__isBigInt(i) && "string" == typeof _) return _ = JSBI$2.__fromString(_), null !== _ && JSBI$2.__comparisonResultToBool(JSBI$2.__compareToBigInt(i, _), t$1);
			if ("string" == typeof i && JSBI$2.__isBigInt(_)) return i = JSBI$2.__fromString(i), null !== i && JSBI$2.__comparisonResultToBool(JSBI$2.__compareToBigInt(i, _), t$1);
			if (i = JSBI$2.__toNumeric(i), _ = JSBI$2.__toNumeric(_), JSBI$2.__isBigInt(i)) {
				if (JSBI$2.__isBigInt(_)) return JSBI$2.__comparisonResultToBool(JSBI$2.__compareToBigInt(i, _), t$1);
				if ("number" != typeof _) throw new Error("implementation bug");
				return JSBI$2.__comparisonResultToBool(JSBI$2.__compareToNumber(i, _), t$1);
			}
			if ("number" != typeof i) throw new Error("implementation bug");
			if (JSBI$2.__isBigInt(_)) return JSBI$2.__comparisonResultToBool(JSBI$2.__compareToNumber(_, i), 2 ^ t$1);
			if ("number" != typeof _) throw new Error("implementation bug");
			return 0 === t$1 ? i < _ : 1 === t$1 ? i <= _ : 2 === t$1 ? i > _ : 3 === t$1 ? i >= _ : void 0;
		}
		__clzmsd() {
			return JSBI$2.__clz30(this.__digit(this.length - 1));
		}
		static __absoluteAdd(_, t$1, e) {
			if (_.length < t$1.length) return JSBI$2.__absoluteAdd(t$1, _, e);
			if (0 === _.length) return _;
			if (0 === t$1.length) return _.sign === e ? _ : JSBI$2.unaryMinus(_);
			let n = _.length;
			(0 === _.__clzmsd() || t$1.length === _.length && 0 === t$1.__clzmsd()) && n++;
			const g$2 = new JSBI$2(n, e);
			let o = 0, s = 0;
			for (; s < t$1.length; s++) {
				const i = _.__digit(s) + t$1.__digit(s) + o;
				o = i >>> 30, g$2.__setDigit(s, 1073741823 & i);
			}
			for (; s < _.length; s++) {
				const i = _.__digit(s) + o;
				o = i >>> 30, g$2.__setDigit(s, 1073741823 & i);
			}
			return s < g$2.length && g$2.__setDigit(s, o), g$2.__trim();
		}
		static __absoluteSub(_, t$1, e) {
			if (0 === _.length) return _;
			if (0 === t$1.length) return _.sign === e ? _ : JSBI$2.unaryMinus(_);
			const n = new JSBI$2(_.length, e);
			let g$2 = 0, o = 0;
			for (; o < t$1.length; o++) {
				const i = _.__digit(o) - t$1.__digit(o) - g$2;
				g$2 = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i);
			}
			for (; o < _.length; o++) {
				const i = _.__digit(o) - g$2;
				g$2 = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i);
			}
			return n.__trim();
		}
		static __absoluteAddOne(_, i, t$1 = null) {
			const e = _.length;
			null === t$1 ? t$1 = new JSBI$2(e, i) : t$1.sign = i;
			let n = 1;
			for (let g$2 = 0; g$2 < e; g$2++) {
				const i$1 = _.__digit(g$2) + n;
				n = i$1 >>> 30, t$1.__setDigit(g$2, 1073741823 & i$1);
			}
			return 0 != n && t$1.__setDigitGrow(e, 1), t$1;
		}
		static __absoluteSubOne(_, t$1) {
			const e = _.length;
			t$1 = t$1 || e;
			const n = new JSBI$2(t$1, !1);
			let g$2 = 1;
			for (let o = 0; o < e; o++) {
				const i = _.__digit(o) - g$2;
				g$2 = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i);
			}
			if (0 != g$2) throw new Error("implementation bug");
			for (let g$3 = e; g$3 < t$1; g$3++) n.__setDigit(g$3, 0);
			return n;
		}
		static __absoluteAnd(_, t$1, e = null) {
			let n = _.length, g$2 = t$1.length, o = g$2;
			if (n < g$2) {
				o = n;
				const i = _, e$1 = n;
				_ = t$1, n = g$2, t$1 = i, g$2 = e$1;
			}
			let s = o;
			null === e ? e = new JSBI$2(s, !1) : s = e.length;
			let l = 0;
			for (; l < o; l++) e.__setDigit(l, _.__digit(l) & t$1.__digit(l));
			for (; l < s; l++) e.__setDigit(l, 0);
			return e;
		}
		static __absoluteAndNot(_, t$1, e = null) {
			const n = _.length, g$2 = t$1.length;
			let o = g$2;
			n < g$2 && (o = n);
			let s = n;
			null === e ? e = new JSBI$2(s, !1) : s = e.length;
			let l = 0;
			for (; l < o; l++) e.__setDigit(l, _.__digit(l) & ~t$1.__digit(l));
			for (; l < n; l++) e.__setDigit(l, _.__digit(l));
			for (; l < s; l++) e.__setDigit(l, 0);
			return e;
		}
		static __absoluteOr(_, t$1, e = null) {
			let n = _.length, g$2 = t$1.length, o = g$2;
			if (n < g$2) {
				o = n;
				const i = _, e$1 = n;
				_ = t$1, n = g$2, t$1 = i, g$2 = e$1;
			}
			let s = n;
			null === e ? e = new JSBI$2(s, !1) : s = e.length;
			let l = 0;
			for (; l < o; l++) e.__setDigit(l, _.__digit(l) | t$1.__digit(l));
			for (; l < n; l++) e.__setDigit(l, _.__digit(l));
			for (; l < s; l++) e.__setDigit(l, 0);
			return e;
		}
		static __absoluteXor(_, t$1, e = null) {
			let n = _.length, g$2 = t$1.length, o = g$2;
			if (n < g$2) {
				o = n;
				const i = _, e$1 = n;
				_ = t$1, n = g$2, t$1 = i, g$2 = e$1;
			}
			let s = n;
			null === e ? e = new JSBI$2(s, !1) : s = e.length;
			let l = 0;
			for (; l < o; l++) e.__setDigit(l, _.__digit(l) ^ t$1.__digit(l));
			for (; l < n; l++) e.__setDigit(l, _.__digit(l));
			for (; l < s; l++) e.__setDigit(l, 0);
			return e;
		}
		static __absoluteCompare(_, t$1) {
			const e = _.length - t$1.length;
			if (0 != e) return e;
			let n = _.length - 1;
			for (; 0 <= n && _.__digit(n) === t$1.__digit(n);) n--;
			return 0 > n ? 0 : _.__unsignedDigit(n) > t$1.__unsignedDigit(n) ? 1 : -1;
		}
		static __multiplyAccumulate(_, t$1, e, n) {
			if (0 === t$1) return;
			const g$2 = 32767 & t$1, o = t$1 >>> 15;
			let s = 0, l = 0;
			for (let r, a = 0; a < _.length; a++, n++) {
				r = e.__digit(n);
				const i = _.__digit(a), t$2 = 32767 & i, u = i >>> 15, d = JSBI$2.__imul(t$2, g$2), h = JSBI$2.__imul(t$2, o), m$1 = JSBI$2.__imul(u, g$2), b = JSBI$2.__imul(u, o);
				r += l + d + s, s = r >>> 30, r &= 1073741823, r += ((32767 & h) << 15) + ((32767 & m$1) << 15), s += r >>> 30, l = b + (h >>> 15) + (m$1 >>> 15), e.__setDigit(n, 1073741823 & r);
			}
			for (; 0 != s || 0 !== l; n++) {
				let i = e.__digit(n);
				i += s + l, l = 0, s = i >>> 30, e.__setDigit(n, 1073741823 & i);
			}
		}
		static __internalMultiplyAdd(_, t$1, e, g$2, o) {
			let s = e, l = 0;
			for (let n = 0; n < g$2; n++) {
				const i = _.__digit(n), e$1 = JSBI$2.__imul(32767 & i, t$1), g$3 = JSBI$2.__imul(i >>> 15, t$1), a = e$1 + ((32767 & g$3) << 15) + l + s;
				s = a >>> 30, l = g$3 >>> 15, o.__setDigit(n, 1073741823 & a);
			}
			if (o.length > g$2) for (o.__setDigit(g$2++, s + l); g$2 < o.length;) o.__setDigit(g$2++, 0);
			else if (0 !== s + l) throw new Error("implementation bug");
		}
		__inplaceMultiplyAdd(i, _, t$1) {
			t$1 > this.length && (t$1 = this.length);
			const e = 32767 & i, n = i >>> 15;
			let g$2 = 0, o = _;
			for (let s = 0; s < t$1; s++) {
				const i$1 = this.__digit(s), _$1 = 32767 & i$1, t$2 = i$1 >>> 15, l = JSBI$2.__imul(_$1, e), r = JSBI$2.__imul(_$1, n), a = JSBI$2.__imul(t$2, e), u = JSBI$2.__imul(t$2, n);
				let d = o + l + g$2;
				g$2 = d >>> 30, d &= 1073741823, d += ((32767 & r) << 15) + ((32767 & a) << 15), g$2 += d >>> 30, o = u + (r >>> 15) + (a >>> 15), this.__setDigit(s, 1073741823 & d);
			}
			if (0 != g$2 || 0 !== o) throw new Error("implementation bug");
		}
		static __absoluteDivSmall(_, t$1, e = null) {
			null === e && (e = new JSBI$2(_.length, !1));
			let n = 0;
			for (let g$2, o = 2 * _.length - 1; 0 <= o; o -= 2) {
				g$2 = (n << 15 | _.__halfDigit(o)) >>> 0;
				const i = 0 | g$2 / t$1;
				n = 0 | g$2 % t$1, g$2 = (n << 15 | _.__halfDigit(o - 1)) >>> 0;
				const s = 0 | g$2 / t$1;
				n = 0 | g$2 % t$1, e.__setDigit(o >>> 1, i << 15 | s);
			}
			return e;
		}
		static __absoluteModSmall(_, t$1) {
			let e = 0;
			for (let n = 2 * _.length - 1; 0 <= n; n--) e = 0 | ((e << 15 | _.__halfDigit(n)) >>> 0) % t$1;
			return e;
		}
		static __absoluteDivLarge(i, _, t$1, e) {
			const g$2 = _.__halfDigitLength(), n = _.length, o = i.__halfDigitLength() - g$2;
			let s = null;
			t$1 && (s = new JSBI$2(o + 2 >>> 1, !1), s.__initializeDigits());
			const l = new JSBI$2(g$2 + 2 >>> 1, !1);
			l.__initializeDigits();
			const r = JSBI$2.__clz15(_.__halfDigit(g$2 - 1));
			0 < r && (_ = JSBI$2.__specialLeftShift(_, r, 0));
			const a = JSBI$2.__specialLeftShift(i, r, 1), u = _.__halfDigit(g$2 - 1);
			let d = 0;
			for (let r$1, h = o; 0 <= h; h--) {
				r$1 = 32767;
				const i$1 = a.__halfDigit(h + g$2);
				if (i$1 !== u) {
					const t$2 = (i$1 << 15 | a.__halfDigit(h + g$2 - 1)) >>> 0;
					r$1 = 0 | t$2 / u;
					let e$2 = 0 | t$2 % u;
					const n$1 = _.__halfDigit(g$2 - 2), o$1 = a.__halfDigit(h + g$2 - 2);
					for (; JSBI$2.__imul(r$1, n$1) >>> 0 > (e$2 << 16 | o$1) >>> 0 && (r$1--, e$2 += u, !(32767 < e$2)););
				}
				JSBI$2.__internalMultiplyAdd(_, r$1, 0, n, l);
				let e$1 = a.__inplaceSub(l, h, g$2 + 1);
				0 !== e$1 && (e$1 = a.__inplaceAdd(_, h, g$2), a.__setHalfDigit(h + g$2, 32767 & a.__halfDigit(h + g$2) + e$1), r$1--), t$1 && (1 & h ? d = r$1 << 15 : s.__setDigit(h >>> 1, d | r$1));
			}
			if (e) return a.__inplaceRightShift(r), t$1 ? {
				quotient: s,
				remainder: a
			} : a;
			if (t$1) return s;
			throw new Error("unreachable");
		}
		static __clz15(i) {
			return JSBI$2.__clz30(i) - 15;
		}
		__inplaceAdd(_, t$1, e) {
			let n = 0;
			for (let g$2 = 0; g$2 < e; g$2++) {
				const i = this.__halfDigit(t$1 + g$2) + _.__halfDigit(g$2) + n;
				n = i >>> 15, this.__setHalfDigit(t$1 + g$2, 32767 & i);
			}
			return n;
		}
		__inplaceSub(_, t$1, e) {
			let n = 0;
			if (1 & t$1) {
				t$1 >>= 1;
				let g$2 = this.__digit(t$1), o = 32767 & g$2, s = 0;
				for (; s < e - 1 >>> 1; s++) {
					const i$1 = _.__digit(s), e$1 = (g$2 >>> 15) - (32767 & i$1) - n;
					n = 1 & e$1 >>> 15, this.__setDigit(t$1 + s, (32767 & e$1) << 15 | 32767 & o), g$2 = this.__digit(t$1 + s + 1), o = (32767 & g$2) - (i$1 >>> 15) - n, n = 1 & o >>> 15;
				}
				const i = _.__digit(s), l = (g$2 >>> 15) - (32767 & i) - n;
				n = 1 & l >>> 15, this.__setDigit(t$1 + s, (32767 & l) << 15 | 32767 & o);
				if (t$1 + s + 1 >= this.length) throw new RangeError("out of bounds");
				0 == (1 & e) && (g$2 = this.__digit(t$1 + s + 1), o = (32767 & g$2) - (i >>> 15) - n, n = 1 & o >>> 15, this.__setDigit(t$1 + _.length, 1073709056 & g$2 | 32767 & o));
			} else {
				t$1 >>= 1;
				let g$2 = 0;
				for (; g$2 < _.length - 1; g$2++) {
					const i$1 = this.__digit(t$1 + g$2), e$1 = _.__digit(g$2), o$1 = (32767 & i$1) - (32767 & e$1) - n;
					n = 1 & o$1 >>> 15;
					const s$1 = (i$1 >>> 15) - (e$1 >>> 15) - n;
					n = 1 & s$1 >>> 15, this.__setDigit(t$1 + g$2, (32767 & s$1) << 15 | 32767 & o$1);
				}
				const i = this.__digit(t$1 + g$2), o = _.__digit(g$2), s = (32767 & i) - (32767 & o) - n;
				n = 1 & s >>> 15;
				let l = 0;
				0 == (1 & e) && (l = (i >>> 15) - (o >>> 15) - n, n = 1 & l >>> 15), this.__setDigit(t$1 + g$2, (32767 & l) << 15 | 32767 & s);
			}
			return n;
		}
		__inplaceRightShift(_) {
			if (0 === _) return;
			let t$1 = this.__digit(0) >>> _;
			const e = this.length - 1;
			for (let n = 0; n < e; n++) {
				const i = this.__digit(n + 1);
				this.__setDigit(n, 1073741823 & i << 30 - _ | t$1), t$1 = i >>> _;
			}
			this.__setDigit(e, t$1);
		}
		static __specialLeftShift(_, t$1, e) {
			const g$2 = _.length, n = new JSBI$2(g$2 + e, !1);
			if (0 === t$1) {
				for (let t$2 = 0; t$2 < g$2; t$2++) n.__setDigit(t$2, _.__digit(t$2));
				return 0 < e && n.__setDigit(g$2, 0), n;
			}
			let o = 0;
			for (let s = 0; s < g$2; s++) {
				const i = _.__digit(s);
				n.__setDigit(s, 1073741823 & i << t$1 | o), o = i >>> 30 - t$1;
			}
			return 0 < e && n.__setDigit(g$2, o), n;
		}
		static __leftShiftByAbsolute(_, i) {
			const t$1 = JSBI$2.__toShiftAmount(i);
			if (0 > t$1) throw new RangeError("BigInt too big");
			const e = 0 | t$1 / 30, n = t$1 % 30, g$2 = _.length, o = 0 !== n && 0 != _.__digit(g$2 - 1) >>> 30 - n, s = g$2 + e + (o ? 1 : 0), l = new JSBI$2(s, _.sign);
			if (0 === n) {
				let t$2 = 0;
				for (; t$2 < e; t$2++) l.__setDigit(t$2, 0);
				for (; t$2 < s; t$2++) l.__setDigit(t$2, _.__digit(t$2 - e));
			} else {
				let t$2 = 0;
				for (let _$1 = 0; _$1 < e; _$1++) l.__setDigit(_$1, 0);
				for (let o$1 = 0; o$1 < g$2; o$1++) {
					const i$1 = _.__digit(o$1);
					l.__setDigit(o$1 + e, 1073741823 & i$1 << n | t$2), t$2 = i$1 >>> 30 - n;
				}
				if (o) l.__setDigit(g$2 + e, t$2);
				else if (0 !== t$2) throw new Error("implementation bug");
			}
			return l.__trim();
		}
		static __rightShiftByAbsolute(_, i) {
			const t$1 = _.length, e = _.sign, n = JSBI$2.__toShiftAmount(i);
			if (0 > n) return JSBI$2.__rightShiftByMaximum(e);
			const g$2 = 0 | n / 30, o = n % 30;
			let s = t$1 - g$2;
			if (0 >= s) return JSBI$2.__rightShiftByMaximum(e);
			let l = !1;
			if (e) {
				if (0 != (_.__digit(g$2) & (1 << o) - 1)) l = !0;
				else for (let t$2 = 0; t$2 < g$2; t$2++) if (0 !== _.__digit(t$2)) {
					l = !0;
					break;
				}
			}
			if (l && 0 === o) 0 == ~_.__digit(t$1 - 1) && s++;
			let r = new JSBI$2(s, e);
			if (0 === o) {
				r.__setDigit(s - 1, 0);
				for (let e$1 = g$2; e$1 < t$1; e$1++) r.__setDigit(e$1 - g$2, _.__digit(e$1));
			} else {
				let e$1 = _.__digit(g$2) >>> o;
				const n$1 = t$1 - g$2 - 1;
				for (let t$2 = 0; t$2 < n$1; t$2++) {
					const i$1 = _.__digit(t$2 + g$2 + 1);
					r.__setDigit(t$2, 1073741823 & i$1 << 30 - o | e$1), e$1 = i$1 >>> o;
				}
				r.__setDigit(n$1, e$1);
			}
			return l && (r = JSBI$2.__absoluteAddOne(r, !0, r)), r.__trim();
		}
		static __rightShiftByMaximum(i) {
			return i ? JSBI$2.__oneDigit(1, !0) : JSBI$2.__zero();
		}
		static __toShiftAmount(i) {
			if (1 < i.length) return -1;
			const _ = i.__unsignedDigit(0);
			return _ > JSBI$2.__kMaxLengthBits ? -1 : _;
		}
		static __toPrimitive(i, _ = "default") {
			if ("object" != typeof i) return i;
			if (i.constructor === JSBI$2) return i;
			if ("undefined" != typeof Symbol && "symbol" == typeof Symbol.toPrimitive && i[Symbol.toPrimitive]) {
				const t$2 = i[Symbol.toPrimitive](_);
				if ("object" != typeof t$2) return t$2;
				throw new TypeError("Cannot convert object to primitive value");
			}
			const t$1 = i.valueOf;
			if (t$1) {
				const _$1 = t$1.call(i);
				if ("object" != typeof _$1) return _$1;
			}
			const e = i.toString;
			if (e) {
				const _$1 = e.call(i);
				if ("object" != typeof _$1) return _$1;
			}
			throw new TypeError("Cannot convert object to primitive value");
		}
		static __toNumeric(i) {
			return JSBI$2.__isBigInt(i) ? i : +i;
		}
		static __isBigInt(i) {
			return "object" == typeof i && null !== i && i.constructor === JSBI$2;
		}
		static __truncateToNBits(i, _) {
			const t$1 = 0 | (i + 29) / 30, e = new JSBI$2(t$1, _.sign), n = t$1 - 1;
			for (let t$2 = 0; t$2 < n; t$2++) e.__setDigit(t$2, _.__digit(t$2));
			let g$2 = _.__digit(n);
			if (0 != i % 30) {
				const _$1 = 32 - i % 30;
				g$2 = g$2 << _$1 >>> _$1;
			}
			return e.__setDigit(n, g$2), e.__trim();
		}
		static __truncateAndSubFromPowerOfTwo(_, t$1, e) {
			var n = Math.min;
			const g$2 = 0 | (_ + 29) / 30, o = new JSBI$2(g$2, e);
			let s = 0;
			const l = g$2 - 1;
			let a = 0;
			for (const i = n(l, t$1.length); s < i; s++) {
				const i$1 = 0 - t$1.__digit(s) - a;
				a = 1 & i$1 >>> 30, o.__setDigit(s, 1073741823 & i$1);
			}
			for (; s < l; s++) o.__setDigit(s, 0 | 1073741823 & -a);
			let u = l < t$1.length ? t$1.__digit(l) : 0;
			const d = _ % 30;
			let h;
			if (0 == d) h = 0 - u - a, h &= 1073741823;
			else {
				const i = 32 - d;
				u = u << i >>> i;
				const _$1 = 1 << 32 - i;
				h = _$1 - u - a, h &= _$1 - 1;
			}
			return o.__setDigit(l, h), o.__trim();
		}
		__digit(_) {
			return this[_];
		}
		__unsignedDigit(_) {
			return this[_] >>> 0;
		}
		__setDigit(_, i) {
			this[_] = 0 | i;
		}
		__setDigitGrow(_, i) {
			this[_] = 0 | i;
		}
		__halfDigitLength() {
			const i = this.length;
			return 32767 >= this.__unsignedDigit(i - 1) ? 2 * i - 1 : 2 * i;
		}
		__halfDigit(_) {
			return 32767 & this[_ >>> 1] >>> 15 * (1 & _);
		}
		__setHalfDigit(_, i) {
			const t$1 = _ >>> 1, e = this.__digit(t$1), n = 1 & _ ? 32767 & e | i << 15 : 1073709056 & e | 32767 & i;
			this.__setDigit(t$1, n);
		}
		static __digitPow(i, _) {
			let t$1 = 1;
			for (; 0 < _;) 1 & _ && (t$1 *= i), _ >>>= 1, i *= i;
			return t$1;
		}
		static __detectBigEndian() {
			return JSBI$2.__kBitConversionDouble[0] = -0, 0 !== JSBI$2.__kBitConversionInts[0];
		}
		static __isOneDigitInt(i) {
			return (1073741823 & i) === i;
		}
	};
	JSBI$2.__kMaxLength = 33554432, JSBI$2.__kMaxLengthBits = JSBI$2.__kMaxLength << 5, JSBI$2.__kMaxBitsPerChar = [
		0,
		0,
		32,
		51,
		64,
		75,
		83,
		90,
		96,
		102,
		107,
		111,
		115,
		119,
		122,
		126,
		128,
		131,
		134,
		136,
		139,
		141,
		143,
		145,
		147,
		149,
		151,
		153,
		154,
		156,
		158,
		159,
		160,
		162,
		163,
		165,
		166
	], JSBI$2.__kBitsPerCharTableShift = 5, JSBI$2.__kBitsPerCharTableMultiplier = 1 << JSBI$2.__kBitsPerCharTableShift, JSBI$2.__kConversionChars = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z"
	], JSBI$2.__kBitConversionBuffer = /* @__PURE__ */ new ArrayBuffer(8), JSBI$2.__kBitConversionDouble = new Float64Array(JSBI$2.__kBitConversionBuffer), JSBI$2.__kBitConversionInts = new Int32Array(JSBI$2.__kBitConversionBuffer), JSBI$2.__kBitConversionIntHigh = JSBI$2.__detectBigEndian() ? 0 : 1, JSBI$2.__kBitConversionIntLow = JSBI$2.__detectBigEndian() ? 1 : 0, JSBI$2.__clz30 = Math.clz32 ? function(i) {
		return Math.clz32(i) - 2;
	} : function(i) {
		return 0 === i ? 30 : 0 | 29 - (0 | Math.log(i >>> 0) / Math.LN2);
	}, JSBI$2.__imul = Math.imul || function(i, _) {
		return 0 | i * _;
	};
	jsbi_default = JSBI$2;
}));
var require_constants$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var NameFlag = class {};
	NameFlag.ALLOW_REPLACEMENT = 1;
	NameFlag.REPLACE_EXISTING = 2;
	NameFlag.DO_NOT_QUEUE = 4;
	var RequestNameReply = class {};
	RequestNameReply.PRIMARY_OWNER = 1;
	RequestNameReply.IN_QUEUE = 2;
	RequestNameReply.EXISTS = 3;
	RequestNameReply.ALREADY_OWNER = 4;
	var ReleaseNameReply = class {};
	ReleaseNameReply.RELEASED = 1;
	ReleaseNameReply.NON_EXISTENT = 2;
	ReleaseNameReply.NOT_OWNER = 3;
	var MessageType = class {};
	MessageType.METHOD_CALL = 1;
	MessageType.METHOD_RETURN = 2;
	MessageType.ERROR = 3;
	MessageType.SIGNAL = 4;
	var MessageFlag = class {};
	MessageFlag.NO_REPLY_EXPECTED = 1;
	MessageFlag.NO_AUTO_START = 2;
	var MAX_INT64_STR = "9223372036854775807";
	var MIN_INT64_STR = "-9223372036854775807";
	var MAX_UINT64_STR = "18446744073709551615";
	var MIN_UINT64_STR = "0";
	var _JSBIConstants = {};
	function _getJSBIConstants$1() {
		if (Object.keys(_JSBIConstants).length !== 0) return _JSBIConstants;
		const JSBI$3 = (init_jsbi(), __toCommonJS(jsbi_exports));
		_JSBIConstants.MAX_INT64 = JSBI$3.BigInt(MAX_INT64_STR);
		_JSBIConstants.MIN_INT64 = JSBI$3.BigInt(MIN_INT64_STR);
		_JSBIConstants.MAX_UINT64 = JSBI$3.BigInt(MAX_UINT64_STR);
		_JSBIConstants.MIN_UINT64 = JSBI$3.BigInt(MIN_UINT64_STR);
		return _JSBIConstants;
	}
	var _BigIntConstants = {};
	function _getBigIntConstants$1() {
		if (Object.keys(_BigIntConstants).length !== 0) return _BigIntConstants;
		_BigIntConstants.MAX_INT64 = BigInt(MAX_INT64_STR);
		_BigIntConstants.MIN_INT64 = BigInt(MIN_INT64_STR);
		_BigIntConstants.MAX_UINT64 = BigInt(MAX_UINT64_STR);
		_BigIntConstants.MIN_UINT64 = BigInt(MIN_UINT64_STR);
		return _BigIntConstants;
	}
	module.exports = {
		MAX_INT64_STR,
		MIN_INT64_STR,
		MAX_UINT64_STR,
		MIN_UINT64_STR,
		NameFlag,
		RequestNameReply,
		ReleaseNameReply,
		MessageType,
		MessageFlag,
		headerTypeName: [
			null,
			"path",
			"interface",
			"member",
			"errorName",
			"replySerial",
			"destination",
			"sender",
			"signature",
			"unixFd"
		],
		fieldSignature: {
			path: "o",
			interface: "s",
			member: "s",
			errorName: "s",
			replySerial: "u",
			destination: "s",
			sender: "s",
			signature: "g",
			unixFd: "u"
		},
		headerTypeId: {
			path: 1,
			interface: 2,
			member: 3,
			errorName: 4,
			replySerial: 5,
			destination: 6,
			sender: 7,
			signature: 8,
			unixFd: 9
		},
		protocolVersion: 1,
		endianness: {
			le: 108,
			be: 66
		},
		messageSignature: "yyyyuua(yv)",
		defaultAuthMethods: [
			"EXTERNAL",
			"DBUS_COOKIE_SHA1",
			"ANONYMOUS"
		],
		_getJSBIConstants: _getJSBIConstants$1,
		_getBigIntConstants: _getBigIntConstants$1
	};
}));
var require_variant = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Variant$5 = class {
		constructor(signature, value) {
			this.signature = signature;
			this.value = value;
		}
	};
	module.exports = { Variant: Variant$5 };
}));
var require_validators = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var busNameRe = /^[A-Za-z_-][A-Za-z0-9_-]*$/;
	function isBusNameValid(name) {
		if (typeof name !== "string") return false;
		if (name.startsWith(":")) return true;
		return !!(name.length > 0 && name.length <= 255 && name[0] !== "." && name.indexOf(".") !== -1 && name.split(".").every((n) => n && busNameRe.test(n)));
	}
	function assertBusNameValid$3(name) {
		if (!isBusNameValid(name)) throw new Error(`Invalid bus name: ${name}`);
	}
	var pathRe = /^[A-Za-z0-9_]+$/;
	function isObjectPathValid$2(path$3) {
		return !!(typeof path$3 === "string" && path$3 && path$3[0] === "/" && (path$3.length === 1 || path$3[path$3.length - 1] !== "/" && path$3.split("/").slice(1).every((p) => p && pathRe.test(p))));
	}
	function assertObjectPathValid$4(path$3) {
		if (!isObjectPathValid$2(path$3)) throw new Error(`Invalid object path: ${path$3}`);
	}
	var elementRe = /^[A-Za-z_][A-Za-z0-9_]*$/;
	function isInterfaceNameValid$2(name) {
		return !!(typeof name === "string" && name && name.length > 0 && name.length <= 255 && name[0] !== "." && name.indexOf(".") !== -1 && name.split(".").every((n) => n && elementRe.test(n)));
	}
	function assertInterfaceNameValid$3(name) {
		if (!isInterfaceNameValid$2(name)) throw new Error(`Invalid interface name: ${name}`);
	}
	function isMemberNameValid$2(name) {
		return !!(typeof name === "string" && name && name.length > 0 && name.length <= 255 && elementRe.test(name));
	}
	function assertMemberNameValid$2(name) {
		if (!assertMemberNameValid$2) throw new Error(`Invalid member name: ${name}`);
	}
	module.exports = {
		isBusNameValid,
		assertBusNameValid: assertBusNameValid$3,
		isObjectPathValid: isObjectPathValid$2,
		assertObjectPathValid: assertObjectPathValid$4,
		isInterfaceNameValid: isInterfaceNameValid$2,
		assertInterfaceNameValid: assertInterfaceNameValid$3,
		isMemberNameValid: isMemberNameValid$2,
		assertMemberNameValid: assertMemberNameValid$2
	};
}));
var require_message_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { assertBusNameValid: assertBusNameValid$2, assertInterfaceNameValid: assertInterfaceNameValid$2, assertObjectPathValid: assertObjectPathValid$3, assertMemberNameValid: assertMemberNameValid$1 } = require_validators();
	var { METHOD_CALL: METHOD_CALL$1, METHOD_RETURN: METHOD_RETURN$2, ERROR: ERROR$1, SIGNAL: SIGNAL$1 } = require_constants$1().MessageType;
	module.exports = { Message: class Message$6 {
		constructor(msg) {
			this.type = msg.type ? msg.type : METHOD_CALL$1;
			this._sent = false;
			this._serial = isNaN(msg.serial) ? null : msg.serial;
			this.path = msg.path;
			this.interface = msg.interface;
			this.member = msg.member;
			this.errorName = msg.errorName;
			this.replySerial = msg.replySerial;
			this.destination = msg.destination;
			this.sender = msg.sender;
			this.signature = msg.signature || "";
			this.body = msg.body || [];
			this.flags = msg.flags || 0;
			if (this.destination) assertBusNameValid$2(this.destination);
			if (this.interface) assertInterfaceNameValid$2(this.interface);
			if (this.path) assertObjectPathValid$3(this.path);
			if (this.member) assertMemberNameValid$1(this.member);
			if (this.errorName) assertInterfaceNameValid$2(this.errorName);
			const requireFields = (...fields) => {
				for (const field of fields) if (this[field] === void 0) throw new Error(`Message is missing a required field: ${field}`);
			};
			switch (this.type) {
				case METHOD_CALL$1:
					requireFields("path", "member");
					break;
				case SIGNAL$1:
					requireFields("path", "member", "interface");
					break;
				case ERROR$1:
					requireFields("errorName", "replySerial");
					break;
				case METHOD_RETURN$2:
					requireFields("replySerial");
					break;
				default: throw new Error(`Got unknown message type: ${this.type}`);
			}
		}
		get serial() {
			return this._serial;
		}
		set serial(value) {
			this._sent = false;
			this._serial = value;
		}
		static newError(msg, errorName, errorText = "An error occurred.") {
			assertInterfaceNameValid$2(errorName);
			return new Message$6({
				type: ERROR$1,
				replySerial: msg.serial,
				destination: msg.sender,
				errorName,
				signature: "s",
				body: [errorText]
			});
		}
		static newMethodReturn(msg, signature = "", body = []) {
			return new Message$6({
				type: METHOD_RETURN$2,
				replySerial: msg.serial,
				destination: msg.sender,
				signature,
				body
			});
		}
		static newSignal(path$3, iface$1, name, signature = "", body = []) {
			return new Message$6({
				type: SIGNAL$1,
				interface: iface$1,
				path: path$3,
				member: name,
				signature,
				body
			});
		}
	} };
}));
var require_signature = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var match = {
		"{": "}",
		"(": ")"
	};
	var knownTypes = {};
	"(){}ybnqiuxtdsogarvehm*?@&^".split("").forEach(function(c) {
		knownTypes[c] = true;
	});
	function parseSignature$6(signature) {
		let index = 0;
		function next() {
			if (index < signature.length) {
				const c$1 = signature[index];
				++index;
				return c$1;
			}
			return null;
		}
		function parseOne(c$1) {
			function checkNotEnd(c$2) {
				if (!c$2) throw new Error("Bad signature: unexpected end");
				return c$2;
			}
			if (!knownTypes[c$1]) throw new Error(`Unknown type: "${c$1}" in signature "${signature}"`);
			let ele;
			const res = {
				type: c$1,
				child: []
			};
			switch (c$1) {
				case "a":
					ele = next();
					checkNotEnd(ele);
					res.child.push(parseOne(ele));
					return res;
				case "{":
				case "(":
					while ((ele = next()) !== null && ele !== match[c$1]) res.child.push(parseOne(ele));
					checkNotEnd(ele);
					return res;
			}
			return res;
		}
		const ret = [];
		let c;
		while ((c = next()) !== null) ret.push(parseOne(c));
		return ret;
	}
	function collapseSignature$2(value) {
		if (value.child.length === 0) return value.type;
		let type = value.type;
		for (let i = 0; i < value.child.length; ++i) type += collapseSignature$2(value.child[i]);
		if (type[0] === "{") type += "}";
		else if (type[0] === "(") type += ")";
		return type;
	}
	module.exports = {
		parseSignature: parseSignature$6,
		collapseSignature: collapseSignature$2
	};
}));
var require_interface = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { parseSignature: parseSignature$5, collapseSignature: collapseSignature$1 } = require_signature();
	var Variant$4 = require_variant().Variant;
	var ACCESS_READ$5 = "read";
	var ACCESS_WRITE$1 = "write";
	var ACCESS_READWRITE$1 = "readwrite";
	var EventEmitter$7 = __require("events");
	var { assertInterfaceNameValid: assertInterfaceNameValid$1, assertMemberNameValid } = require_validators();
	function property$4(options) {
		options.access = options.access || "readwrite";
		if (!options.signature) throw new Error("missing signature for property");
		options.signatureTree = parseSignature$5(options.signature);
		return function(descriptor) {
			options.name = options.name || descriptor.key;
			assertMemberNameValid(options.name);
			descriptor.finisher = function(klass) {
				klass.prototype.$properties = klass.prototype.$properties || [];
				klass.prototype.$properties[descriptor.key] = options;
			};
			return descriptor;
		};
	}
	function method$4(options) {
		options.disabled = !!options.disabled;
		options.inSignature = options.inSignature || "";
		options.outSignature = options.outSignature || "";
		options.inSignatureTree = parseSignature$5(options.inSignature);
		options.outSignatureTree = parseSignature$5(options.outSignature);
		return function(descriptor) {
			options.name = options.name || descriptor.key;
			assertMemberNameValid(options.name);
			options.fn = descriptor.descriptor.value;
			descriptor.finisher = function(klass) {
				klass.prototype.$methods = klass.prototype.$methods || [];
				klass.prototype.$methods[descriptor.key] = options;
			};
			return descriptor;
		};
	}
	function signal$3(options) {
		options.signature = options.signature || "";
		options.signatureTree = parseSignature$5(options.signature);
		return function(descriptor) {
			options.name = options.name || descriptor.key;
			assertMemberNameValid(options.name);
			options.fn = descriptor.descriptor.value;
			descriptor.descriptor.value = function() {
				if (options.disabled) throw new Error("tried to call a disabled signal");
				const result = options.fn.apply(this, arguments);
				this.$emitter.emit("signal", options, result);
			};
			descriptor.finisher = function(klass) {
				klass.prototype.$signals = klass.prototype.$signals || [];
				klass.prototype.$signals[descriptor.key] = options;
			};
			return descriptor;
		};
	}
	var Interface$2 = class {
		constructor(name) {
			assertInterfaceNameValid$1(name);
			this.$name = name;
			this.$emitter = new EventEmitter$7();
		}
		static configureMembers(members) {
			const properties = members.properties || {};
			const methods = members.methods || {};
			const signals = members.signals || {};
			this.prototype.$properties = {};
			this.prototype.$methods = {};
			this.prototype.$signals = {};
			for (const k of Object.keys(properties)) {
				const options = properties[k];
				options.name = options.name || k;
				options.access = options.access || "readwrite";
				if (!options.signature) throw new Error("missing signature for property");
				options.signatureTree = parseSignature$5(options.signature);
				assertMemberNameValid(options.name);
				this.prototype.$properties[options.name] = options;
			}
			for (const k of Object.keys(methods)) {
				const options = methods[k];
				options.name = options.name || k;
				assertMemberNameValid(options.name);
				options.disabled = !!options.disabled;
				options.inSignature = options.inSignature || "";
				options.outSignature = options.outSignature || "";
				options.inSignatureTree = parseSignature$5(options.inSignature);
				options.outSignatureTree = parseSignature$5(options.outSignature);
				options.fn = this.prototype[k];
				this.prototype.$methods[options.name] = options;
			}
			for (const k of Object.keys(signals)) {
				const options = signals[k];
				options.name = options.name || k;
				assertMemberNameValid(options.name);
				options.fn = this.prototype[k];
				options.signature = options.signature || "";
				options.signatureTree = parseSignature$5(options.signature);
				this.prototype[k] = function() {
					if (options.disabled) throw new Error("tried to call a disabled signal");
					const result = options.fn.apply(this, arguments);
					this.$emitter.emit("signal", options, result);
				};
				this.prototype.$signals[options.name] = options;
			}
		}
		static emitPropertiesChanged(iface$1, changedProperties, invalidatedProperties = []) {
			if (!Array.isArray(invalidatedProperties) || !invalidatedProperties.every((p) => typeof p === "string")) throw new Error("invalidated properties must be an array of strings");
			const properties = iface$1.$properties || {};
			const changedPropertiesVariants = {};
			for (const p of Object.keys(changedProperties)) {
				if (properties[p] === void 0) throw new Error(`got properties changed with unknown property: ${p}`);
				changedPropertiesVariants[p] = new Variant$4(properties[p].signature, changedProperties[p]);
			}
			iface$1.$emitter.emit("properties-changed", changedPropertiesVariants, invalidatedProperties);
		}
		$introspect() {
			const xml = { $: { name: this.$name } };
			const properties = this.$properties || {};
			for (const p of Object.keys(properties) || []) {
				const property$5 = properties[p];
				if (property$5.disabled) continue;
				xml.property = xml.property || [];
				xml.property.push({ $: {
					name: property$5.name,
					type: property$5.signature,
					access: property$5.access
				} });
			}
			const methods = this.$methods || {};
			for (const m$1 of Object.keys(methods) || []) {
				const method$5 = methods[m$1];
				if (method$5.disabled) continue;
				xml.method = xml.method || [];
				const methodXml = {
					$: { name: method$5.name },
					arg: [],
					annotation: []
				};
				for (const signature of method$5.inSignatureTree) methodXml.arg.push({ $: {
					direction: "in",
					type: collapseSignature$1(signature)
				} });
				for (const signature of method$5.outSignatureTree) methodXml.arg.push({ $: {
					direction: "out",
					type: collapseSignature$1(signature)
				} });
				if (method$5.noReply) methodXml.annotation.push({ $: {
					name: "org.freedesktop.DBus.Method.NoReply",
					value: "true"
				} });
				xml.method.push(methodXml);
			}
			const signals = this.$signals || {};
			for (const s of Object.keys(signals) || []) {
				const signal$4 = signals[s];
				if (signal$4.disabled) continue;
				xml.signal = xml.signal || [];
				const signalXml = {
					$: { name: signal$4.name },
					arg: []
				};
				for (const signature of signal$4.signatureTree) signalXml.arg.push({ $: { type: collapseSignature$1(signature) } });
				xml.signal.push(signalXml);
			}
			return xml;
		}
	};
	module.exports = {
		ACCESS_READ: ACCESS_READ$5,
		ACCESS_WRITE: ACCESS_WRITE$1,
		ACCESS_READWRITE: ACCESS_READWRITE$1,
		property: property$4,
		method: method$4,
		signal: signal$3,
		Interface: Interface$2
	};
}));
var require_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { assertInterfaceNameValid } = require_validators();
	var DBusError$3 = class extends Error {
		constructor(type, text, reply = null) {
			assertInterfaceNameValid(type);
			text = text || "";
			super(text);
			this.name = "DBusError";
			this.type = type;
			this.text = text;
			this.reply = reply;
		}
	};
	module.exports = { DBusError: DBusError$3 };
}));
var require_handlers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$3 = __require("fs");
	var Variant$3 = require_variant().Variant;
	var { Message: Message$5 } = require_message_type();
	var { isObjectPathValid: isObjectPathValid$1, isInterfaceNameValid: isInterfaceNameValid$1, isMemberNameValid: isMemberNameValid$1 } = require_validators();
	var { ACCESS_READ: ACCESS_READ$4, ACCESS_WRITE, ACCESS_READWRITE } = require_interface();
	var { METHOD_RETURN: METHOD_RETURN$1 } = require_constants$1().MessageType;
	var { DBusError: DBusError$2 } = require_errors();
	var INVALID_ARGS = "org.freedesktop.DBus.Error.InvalidArgs";
	function sendServiceError(bus, msg, errorMessage) {
		bus.send(Message$5.newError(msg, "com.github.dbus_next.ServiceError", `Service error: ${errorMessage}`));
		return true;
	}
	function handleIntrospect(bus, msg, path$3) {
		bus.send(Message$5.newMethodReturn(msg, "s", [bus._introspect(path$3)]));
	}
	function handleGetProperty(bus, msg, path$3) {
		const [ifaceName, prop] = msg.body;
		if (!bus._serviceObjects[path$3]) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Path not exported on bus: '${path$3}'`));
			return;
		}
		const iface$1 = bus._getServiceObject(path$3).interfaces[ifaceName];
		if (!iface$1) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `No such interface: '${ifaceName}'`));
			return;
		}
		const properties = iface$1.$properties || {};
		let options = null;
		let propertyKey = null;
		for (const k of Object.keys(properties)) if (properties[k].name === prop && !properties[k].disabled) {
			options = properties[k];
			propertyKey = k;
			break;
		}
		if (options === null) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `No such property: '${prop}'`));
			return;
		}
		let propertyValue = null;
		try {
			propertyValue = iface$1[propertyKey];
		} catch (e) {
			if (e.name === "DBusError") bus.send(Message$5.newError(msg, e.type, e.text));
			else sendServiceError(bus, msg, `The service threw an error.\n${e.stack}`);
			return true;
		}
		if (propertyValue instanceof DBusError$2) {
			bus.send(Message$5.newError(msg, propertyValue.type, propertyValue.text));
			return true;
		} else if (propertyValue === void 0) return sendServiceError(bus, msg, "tried to get a property that is not set: " + prop);
		if (!(options.access === ACCESS_READWRITE || options.access === ACCESS_READ$4)) bus.send(Message$5.newError(msg, INVALID_ARGS, `Property does not have read access: '${prop}'`));
		const body = new Variant$3(options.signature, propertyValue);
		bus.send(Message$5.newMethodReturn(msg, "v", [body]));
	}
	function handleGetAllProperties(bus, msg, path$3) {
		const ifaceName = msg.body[0];
		if (!bus._serviceObjects[path$3]) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Path not exported on bus: '${path$3}'`));
			return;
		}
		const iface$1 = bus._getServiceObject(path$3).interfaces[ifaceName];
		const result = {};
		if (iface$1) {
			const properties = iface$1.$properties || {};
			for (const k of Object.keys(properties)) {
				const p = properties[k];
				if (!(p.access === ACCESS_READ$4 || p.access === ACCESS_READWRITE) || p.disabled) continue;
				let value;
				try {
					value = iface$1[k];
				} catch (e) {
					if (e.name === "DBusError") bus.send(Message$5.newError(msg, e.type, e.text));
					else sendServiceError(bus, msg, `The service threw an error.\n${e.stack}`);
					return true;
				}
				if (value instanceof DBusError$2) {
					bus.send(Message$5.newError(msg, value.type, value.text));
					return true;
				} else if (value === void 0) return sendServiceError(bus, msg, "tried to get a property that is not set: " + p);
				result[p.name] = new Variant$3(p.signature, value);
			}
		}
		bus.send(Message$5.newMethodReturn(msg, "a{sv}", [result]));
	}
	function handleSetProperty(bus, msg, path$3) {
		const [ifaceName, prop, value] = msg.body;
		if (!bus._serviceObjects[path$3]) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Path not exported on bus: '${path$3}'`));
			return;
		}
		const iface$1 = bus._getServiceObject(path$3).interfaces[ifaceName];
		if (!iface$1) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Interface not found: '${ifaceName}'`));
			return;
		}
		const properties = iface$1.$properties || {};
		let options = null;
		let propertyKey = null;
		for (const k of Object.keys(properties)) if (properties[k].name === prop && !properties[k].disabled) {
			options = properties[k];
			propertyKey = k;
			break;
		}
		if (options === null) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `No such property: '${prop}'`));
			return;
		}
		if (!(options.access === ACCESS_WRITE || options.access === ACCESS_READWRITE)) bus.send(Message$5.newError(msg, INVALID_ARGS, `Property does not have write access: '${prop}'`));
		if (value.signature !== options.signature) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Cannot set property '${prop}' with signature '${value.signature}' (expected '${options.signature}')`));
			return;
		}
		try {
			iface$1[propertyKey] = value.value;
		} catch (e) {
			if (e.name === "DBusError") bus.send(Message$5.newError(msg, e.type, e.text));
			else sendServiceError(bus, msg, `The service threw an error.\n${e.stack}`);
			return true;
		}
		bus.send(Message$5.newMethodReturn(msg, "", []));
	}
	function handleStdIfaces(bus, msg) {
		const { member, path: path$3, signature } = msg;
		const ifaceName = msg.interface;
		if (!isInterfaceNameValid$1(ifaceName)) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Invalid interface name: '${ifaceName}'`));
			return true;
		}
		if (!isMemberNameValid$1(member)) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Invalid member name: '${member}'`));
			return true;
		}
		if (!isObjectPathValid$1(path$3)) {
			bus.send(Message$5.newError(msg, INVALID_ARGS, `Invalid path name: '${path$3}'`));
			return true;
		}
		if (ifaceName === "org.freedesktop.DBus.Introspectable" && member === "Introspect" && !signature) {
			handleIntrospect(bus, msg, path$3);
			return true;
		} else if (ifaceName === "org.freedesktop.DBus.Properties") {
			if (member === "Get" && signature === "ss") {
				handleGetProperty(bus, msg, path$3);
				return true;
			} else if (member === "Set" && signature === "ssv") {
				handleSetProperty(bus, msg, path$3);
				return true;
			} else if (member === "GetAll") {
				handleGetAllProperties(bus, msg, path$3);
				return true;
			}
		} else if (ifaceName === "org.freedesktop.DBus.Peer") {
			if (member === "Ping" && !signature) {
				bus._connection.message({
					type: METHOD_RETURN$1,
					serial: bus._serial++,
					replySerial: msg.serial,
					destination: msg.sender
				});
				return true;
			} else if (member === "GetMachineId" && !signature) {
				const machineId = fs$3.readFileSync("/var/lib/dbus/machine-id").toString().trim();
				bus._connection.message({
					type: METHOD_RETURN$1,
					serial: bus._serial++,
					replySerial: msg.serial,
					destination: msg.sender,
					signature: "s",
					body: [machineId]
				});
				return true;
			}
		}
		return false;
	}
	function handleMessage(msg, bus) {
		let { path: path$3, member, signature } = msg;
		const ifaceName = msg.interface;
		signature = signature || "";
		if (handleStdIfaces(bus, msg)) return true;
		if (!bus._serviceObjects[path$3]) return false;
		const iface$1 = bus._getServiceObject(path$3).interfaces[ifaceName];
		if (!iface$1) return false;
		const methods = iface$1.$methods || {};
		for (const m$1 of Object.keys(methods)) {
			const method$5 = methods[m$1];
			let result = null;
			const handleError = (e) => {
				if (e.name === "DBusError") bus.send(Message$5.newError(msg, e.type, e.text));
				else sendServiceError(bus, msg, `The service threw an error.\n${e.stack}`);
			};
			if (method$5.name === member && method$5.inSignature === signature) {
				try {
					result = method$5.fn.apply(iface$1, msg.body);
				} catch (e) {
					handleError(e);
					return true;
				}
				const sendReply = (body) => {
					if (method$5.noReply) return;
					if (body === void 0) body = [];
					else if (method$5.outSignatureTree.length === 1) body = [body];
					else if (method$5.outSignatureTree.length === 0) return sendServiceError(bus, msg, `method ${iface$1.$name}.${method$5.name} was not expected to return a body.`);
					else if (!Array.isArray(body)) return sendServiceError(bus, msg, `method ${iface$1.$name}.${method$5.name} expected to return multiple arguments in an array (signature: '${method$5.outSignature}')`);
					if (method$5.outSignatureTree.length !== body.length) return sendServiceError(bus, msg, `method ${iface$1.$name}.${m$1} returned the wrong number of arguments (got ${body.length} expected ${method$5.outSignatureTree.length}) for signature '${method$5.outSignature}'`);
					bus.send(Message$5.newMethodReturn(msg, method$5.outSignature, body));
				};
				if (result && result.constructor === Promise) result.then(sendReply).catch(handleError);
				else sendReply(result);
				return true;
			}
		}
		return false;
	}
	module.exports = handleMessage;
}));
var require_object$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Message: Message$4 } = require_message_type();
	var Interface$1 = require_interface().Interface;
	var assertObjectPathValid$2 = require_validators().assertObjectPathValid;
	module.exports = class ServiceObject$1 {
		constructor(path$3, bus) {
			assertObjectPathValid$2(path$3);
			this.path = path$3;
			this.bus = bus;
			this.interfaces = {};
			this._handlers = {};
		}
		addInterface(iface$1) {
			if (!(iface$1 instanceof Interface$1)) throw new Error(`object.addInterface takes an Interface as the first argument (got ${iface$1})`);
			if (this.interfaces[iface$1.$name]) throw new Error(`an interface with name '${iface$1.$name}' is already exported on this object`);
			this.interfaces[iface$1.$name] = iface$1;
			const that = this;
			const propertiesChangedHandler = function(changedProperties, invalidatedProperties) {
				const body = [
					iface$1.$name,
					changedProperties,
					invalidatedProperties
				];
				that.bus.send(Message$4.newSignal(that.path, "org.freedesktop.DBus.Properties", "PropertiesChanged", "sa{sv}as", body));
			};
			const signalHandler = function(options, result) {
				const { signature, signatureTree, name } = options;
				if (result === void 0) result = [];
				else if (signatureTree.length === 1) result = [result];
				else if (!Array.isArray(result)) throw new Error(`signal ${iface$1.$name}.${name} expected to return multiple arguments in an array (signature: '${signature}')`);
				if (signatureTree.length !== result.length) throw new Error(`signal ${iface$1.$name}.${name} returned the wrong number of arguments (got ${result.length} expected ${signatureTree.length}) for signature '${signature}'`);
				that.bus.send(Message$4.newSignal(that.path, iface$1.$name, name, signature, result));
			};
			this._handlers[iface$1.$name] = {
				propertiesChanged: propertiesChangedHandler,
				signal: signalHandler
			};
			iface$1.$emitter.on("signal", signalHandler);
			iface$1.$emitter.on("properties-changed", propertiesChangedHandler);
		}
		removeInterface(iface$1) {
			if (!(iface$1 instanceof Interface$1)) throw new Error(`object.removeInterface takes an Interface as the first argument (got ${iface$1})`);
			if (!this.interfaces[iface$1.$name]) throw new Error(`Interface ${iface$1.$name} not exported on this object`);
			const handlers = this._handlers[iface$1.$name];
			iface$1.$emitter.removeListener("signal", handlers.signal);
			iface$1.$emitter.removeListener("properties-changed", handlers.propertiesChanged);
			delete this._handlers[iface$1.$name];
			delete this.interfaces[iface$1.$name];
		}
		introspect() {
			const interfaces = ServiceObject$1.defaultInterfaces();
			for (const i of Object.keys(this.interfaces)) {
				const iface$1 = this.interfaces[i];
				interfaces.push(iface$1.$introspect());
			}
			return interfaces;
		}
		static defaultInterfaces() {
			return [
				{
					$: { name: "org.freedesktop.DBus.Introspectable" },
					method: [{
						$: { name: "Introspect" },
						arg: [{ $: {
							name: "data",
							direction: "out",
							type: "s"
						} }]
					}]
				},
				{
					$: { name: "org.freedesktop.DBus.Peer" },
					method: [{
						$: { name: "GetMachineId" },
						arg: [{ $: {
							direction: "out",
							name: "machine_uuid",
							type: "s"
						} }]
					}, { $: { name: "Ping" } }]
				},
				{
					$: { name: "org.freedesktop.DBus.Properties" },
					method: [
						{
							$: { name: "Get" },
							arg: [
								{ $: {
									direction: "in",
									type: "s"
								} },
								{ $: {
									direction: "in",
									type: "s"
								} },
								{ $: {
									direction: "out",
									type: "v"
								} }
							]
						},
						{
							$: { name: "Set" },
							arg: [
								{ $: {
									direction: "in",
									type: "s"
								} },
								{ $: {
									direction: "in",
									type: "s"
								} },
								{ $: {
									direction: "in",
									type: "v"
								} }
							]
						},
						{
							$: { name: "GetAll" },
							arg: [{ $: {
								direction: "in",
								type: "s"
							} }, { $: {
								direction: "out",
								type: "a{sv}"
							} }]
						}
					],
					signal: [{
						$: { name: "PropertiesChanged" },
						arg: [
							{ $: { type: "s" } },
							{ $: { type: "a{sv}" } },
							{ $: { type: "as" } }
						]
					}]
				}
			];
		}
	};
}));
var require_defaults = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		exports.defaults = {
			"0.1": {
				explicitCharkey: false,
				trim: true,
				normalize: true,
				normalizeTags: false,
				attrkey: "@",
				charkey: "#",
				explicitArray: false,
				ignoreAttrs: false,
				mergeAttrs: false,
				explicitRoot: false,
				validator: null,
				xmlns: false,
				explicitChildren: false,
				childkey: "@@",
				charsAsChildren: false,
				includeWhiteChars: false,
				async: false,
				strict: true,
				attrNameProcessors: null,
				attrValueProcessors: null,
				tagNameProcessors: null,
				valueProcessors: null,
				emptyTag: ""
			},
			"0.2": {
				explicitCharkey: false,
				trim: false,
				normalize: false,
				normalizeTags: false,
				attrkey: "$",
				charkey: "_",
				explicitArray: true,
				ignoreAttrs: false,
				mergeAttrs: false,
				explicitRoot: true,
				validator: null,
				xmlns: false,
				explicitChildren: false,
				preserveChildrenOrder: false,
				childkey: "$$",
				charsAsChildren: false,
				includeWhiteChars: false,
				async: false,
				strict: true,
				attrNameProcessors: null,
				attrValueProcessors: null,
				tagNameProcessors: null,
				valueProcessors: null,
				rootName: "root",
				xmldec: {
					"version": "1.0",
					"encoding": "UTF-8",
					"standalone": true
				},
				doctype: null,
				renderOpts: {
					"pretty": true,
					"indent": "  ",
					"newline": "\n"
				},
				headless: false,
				chunkSize: 1e4,
				emptyTag: "",
				cdata: false
			}
		};
	}).call(exports);
}));
var require_Utility = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var assign$1, getValue, isArray$3, isEmpty, isFunction$1, isObject, isPlainObject, slice$2 = [].slice, hasProp = {}.hasOwnProperty;
		assign$1 = function() {
			var i, key$1, len, source, sources, target = arguments[0];
			sources = 2 <= arguments.length ? slice$2.call(arguments, 1) : [];
			if (isFunction$1(Object.assign)) Object.assign.apply(null, arguments);
			else for (i = 0, len = sources.length; i < len; i++) {
				source = sources[i];
				if (source != null) for (key$1 in source) {
					if (!hasProp.call(source, key$1)) continue;
					target[key$1] = source[key$1];
				}
			}
			return target;
		};
		isFunction$1 = function(val) {
			return !!val && Object.prototype.toString.call(val) === "[object Function]";
		};
		isObject = function(val) {
			var ref;
			return !!val && ((ref = typeof val) === "function" || ref === "object");
		};
		isArray$3 = function(val) {
			if (isFunction$1(Array.isArray)) return Array.isArray(val);
			else return Object.prototype.toString.call(val) === "[object Array]";
		};
		isEmpty = function(val) {
			var key$1;
			if (isArray$3(val)) return !val.length;
			else {
				for (key$1 in val) {
					if (!hasProp.call(val, key$1)) continue;
					return false;
				}
				return true;
			}
		};
		isPlainObject = function(val) {
			var ctor, proto;
			return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === "function" && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
		};
		getValue = function(obj) {
			if (isFunction$1(obj.valueOf)) return obj.valueOf();
			else return obj;
		};
		module.exports.assign = assign$1;
		module.exports.isFunction = isFunction$1;
		module.exports.isObject = isObject;
		module.exports.isArray = isArray$3;
		module.exports.isEmpty = isEmpty;
		module.exports.isPlainObject = isPlainObject;
		module.exports.getValue = getValue;
	}).call(exports);
}));
var require_XMLDOMImplementation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			function XMLDOMImplementation() {}
			XMLDOMImplementation.prototype.hasFeature = function(feature, version) {
				return true;
			};
			XMLDOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
				throw new Error("This DOM method is not implemented.");
			};
			XMLDOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
				throw new Error("This DOM method is not implemented.");
			};
			XMLDOMImplementation.prototype.createHTMLDocument = function(title) {
				throw new Error("This DOM method is not implemented.");
			};
			XMLDOMImplementation.prototype.getFeature = function(feature, version) {
				throw new Error("This DOM method is not implemented.");
			};
			return XMLDOMImplementation;
		})();
	}).call(exports);
}));
var require_XMLDOMErrorHandler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			function XMLDOMErrorHandler() {}
			XMLDOMErrorHandler.prototype.handleError = function(error) {
				throw new Error(error);
			};
			return XMLDOMErrorHandler;
		})();
	}).call(exports);
}));
var require_XMLDOMStringList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			function XMLDOMStringList(arr) {
				this.arr = arr || [];
			}
			Object.defineProperty(XMLDOMStringList.prototype, "length", { get: function() {
				return this.arr.length;
			} });
			XMLDOMStringList.prototype.item = function(index) {
				return this.arr[index] || null;
			};
			XMLDOMStringList.prototype.contains = function(str) {
				return this.arr.indexOf(str) !== -1;
			};
			return XMLDOMStringList;
		})();
	}).call(exports);
}));
var require_XMLDOMConfiguration = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var XMLDOMErrorHandler = require_XMLDOMErrorHandler(), XMLDOMStringList = require_XMLDOMStringList();
		module.exports = (function() {
			function XMLDOMConfiguration() {
				this.defaultParams = {
					"canonical-form": false,
					"cdata-sections": false,
					"comments": false,
					"datatype-normalization": false,
					"element-content-whitespace": true,
					"entities": true,
					"error-handler": new XMLDOMErrorHandler(),
					"infoset": true,
					"validate-if-schema": false,
					"namespaces": true,
					"namespace-declarations": true,
					"normalize-characters": false,
					"schema-location": "",
					"schema-type": "",
					"split-cdata-sections": true,
					"validate": false,
					"well-formed": true
				};
				this.params = Object.create(this.defaultParams);
			}
			Object.defineProperty(XMLDOMConfiguration.prototype, "parameterNames", { get: function() {
				return new XMLDOMStringList(Object.keys(this.defaultParams));
			} });
			XMLDOMConfiguration.prototype.getParameter = function(name) {
				if (this.params.hasOwnProperty(name)) return this.params[name];
				else return null;
			};
			XMLDOMConfiguration.prototype.canSetParameter = function(name, value) {
				return true;
			};
			XMLDOMConfiguration.prototype.setParameter = function(name, value) {
				if (value != null) return this.params[name] = value;
				else return delete this.params[name];
			};
			return XMLDOMConfiguration;
		})();
	}).call(exports);
}));
var require_NodeType = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = {
			Element: 1,
			Attribute: 2,
			Text: 3,
			CData: 4,
			EntityReference: 5,
			EntityDeclaration: 6,
			ProcessingInstruction: 7,
			Comment: 8,
			Document: 9,
			DocType: 10,
			DocumentFragment: 11,
			NotationDeclaration: 12,
			Declaration: 201,
			Raw: 202,
			AttributeDeclaration: 203,
			ElementDeclaration: 204,
			Dummy: 205
		};
	}).call(exports);
}));
var require_XMLAttribute = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType = require_NodeType();
		require_XMLNode();
		module.exports = (function() {
			function XMLAttribute(parent, name, value) {
				this.parent = parent;
				if (this.parent) {
					this.options = this.parent.options;
					this.stringify = this.parent.stringify;
				}
				if (name == null) throw new Error("Missing attribute name. " + this.debugInfo(name));
				this.name = this.stringify.name(name);
				this.value = this.stringify.attValue(value);
				this.type = NodeType.Attribute;
				this.isId = false;
				this.schemaTypeInfo = null;
			}
			Object.defineProperty(XMLAttribute.prototype, "nodeType", { get: function() {
				return this.type;
			} });
			Object.defineProperty(XMLAttribute.prototype, "ownerElement", { get: function() {
				return this.parent;
			} });
			Object.defineProperty(XMLAttribute.prototype, "textContent", {
				get: function() {
					return this.value;
				},
				set: function(value) {
					return this.value = value || "";
				}
			});
			Object.defineProperty(XMLAttribute.prototype, "namespaceURI", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLAttribute.prototype, "prefix", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLAttribute.prototype, "localName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLAttribute.prototype, "specified", { get: function() {
				return true;
			} });
			XMLAttribute.prototype.clone = function() {
				return Object.create(this);
			};
			XMLAttribute.prototype.toString = function(options) {
				return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
			};
			XMLAttribute.prototype.debugInfo = function(name) {
				name = name || this.name;
				if (name == null) return "parent: <" + this.parent.name + ">";
				else return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
			};
			XMLAttribute.prototype.isEqualNode = function(node) {
				if (node.namespaceURI !== this.namespaceURI) return false;
				if (node.prefix !== this.prefix) return false;
				if (node.localName !== this.localName) return false;
				if (node.value !== this.value) return false;
				return true;
			};
			return XMLAttribute;
		})();
	}).call(exports);
}));
var require_XMLNamedNodeMap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			function XMLNamedNodeMap(nodes) {
				this.nodes = nodes;
			}
			Object.defineProperty(XMLNamedNodeMap.prototype, "length", { get: function() {
				return Object.keys(this.nodes).length || 0;
			} });
			XMLNamedNodeMap.prototype.clone = function() {
				return this.nodes = null;
			};
			XMLNamedNodeMap.prototype.getNamedItem = function(name) {
				return this.nodes[name];
			};
			XMLNamedNodeMap.prototype.setNamedItem = function(node) {
				var oldNode = this.nodes[node.nodeName];
				this.nodes[node.nodeName] = node;
				return oldNode || null;
			};
			XMLNamedNodeMap.prototype.removeNamedItem = function(name) {
				var oldNode = this.nodes[name];
				delete this.nodes[name];
				return oldNode || null;
			};
			XMLNamedNodeMap.prototype.item = function(index) {
				return this.nodes[Object.keys(this.nodes)[index]] || null;
			};
			XMLNamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented.");
			};
			XMLNamedNodeMap.prototype.setNamedItemNS = function(node) {
				throw new Error("This DOM method is not implemented.");
			};
			XMLNamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented.");
			};
			return XMLNamedNodeMap;
		})();
	}).call(exports);
}));
var require_XMLElement = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLAttribute, XMLNamedNodeMap, XMLNode, getValue, isFunction$1, isObject, ref, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		ref = require_Utility(), isObject = ref.isObject, isFunction$1 = ref.isFunction, getValue = ref.getValue;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		XMLAttribute = require_XMLAttribute();
		XMLNamedNodeMap = require_XMLNamedNodeMap();
		module.exports = (function(superClass) {
			extend(XMLElement, superClass);
			function XMLElement(parent, name, attributes) {
				var child, j, len, ref1;
				XMLElement.__super__.constructor.call(this, parent);
				if (name == null) throw new Error("Missing element name. " + this.debugInfo());
				this.name = this.stringify.name(name);
				this.type = NodeType.Element;
				this.attribs = {};
				this.schemaTypeInfo = null;
				if (attributes != null) this.attribute(attributes);
				if (parent.type === NodeType.Document) {
					this.isRoot = true;
					this.documentObject = parent;
					parent.rootObject = this;
					if (parent.children) {
						ref1 = parent.children;
						for (j = 0, len = ref1.length; j < len; j++) {
							child = ref1[j];
							if (child.type === NodeType.DocType) {
								child.name = this.name;
								break;
							}
						}
					}
				}
			}
			Object.defineProperty(XMLElement.prototype, "tagName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLElement.prototype, "namespaceURI", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLElement.prototype, "prefix", { get: function() {
				return "";
			} });
			Object.defineProperty(XMLElement.prototype, "localName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLElement.prototype, "id", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLElement.prototype, "className", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLElement.prototype, "classList", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLElement.prototype, "attributes", { get: function() {
				if (!this.attributeMap || !this.attributeMap.nodes) this.attributeMap = new XMLNamedNodeMap(this.attribs);
				return this.attributeMap;
			} });
			XMLElement.prototype.clone = function() {
				var att, attName, clonedSelf = Object.create(this), ref1;
				if (clonedSelf.isRoot) clonedSelf.documentObject = null;
				clonedSelf.attribs = {};
				ref1 = this.attribs;
				for (attName in ref1) {
					if (!hasProp.call(ref1, attName)) continue;
					att = ref1[attName];
					clonedSelf.attribs[attName] = att.clone();
				}
				clonedSelf.children = [];
				this.children.forEach(function(child) {
					var clonedChild = child.clone();
					clonedChild.parent = clonedSelf;
					return clonedSelf.children.push(clonedChild);
				});
				return clonedSelf;
			};
			XMLElement.prototype.attribute = function(name, value) {
				var attName, attValue;
				if (name != null) name = getValue(name);
				if (isObject(name)) for (attName in name) {
					if (!hasProp.call(name, attName)) continue;
					attValue = name[attName];
					this.attribute(attName, attValue);
				}
				else {
					if (isFunction$1(value)) value = value.apply();
					if (this.options.keepNullAttributes && value == null) this.attribs[name] = new XMLAttribute(this, name, "");
					else if (value != null) this.attribs[name] = new XMLAttribute(this, name, value);
				}
				return this;
			};
			XMLElement.prototype.removeAttribute = function(name) {
				var attName, j, len;
				if (name == null) throw new Error("Missing attribute name. " + this.debugInfo());
				name = getValue(name);
				if (Array.isArray(name)) for (j = 0, len = name.length; j < len; j++) {
					attName = name[j];
					delete this.attribs[attName];
				}
				else delete this.attribs[name];
				return this;
			};
			XMLElement.prototype.toString = function(options) {
				return this.options.writer.element(this, this.options.writer.filterOptions(options));
			};
			XMLElement.prototype.att = function(name, value) {
				return this.attribute(name, value);
			};
			XMLElement.prototype.a = function(name, value) {
				return this.attribute(name, value);
			};
			XMLElement.prototype.getAttribute = function(name) {
				if (this.attribs.hasOwnProperty(name)) return this.attribs[name].value;
				else return null;
			};
			XMLElement.prototype.setAttribute = function(name, value) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getAttributeNode = function(name) {
				if (this.attribs.hasOwnProperty(name)) return this.attribs[name];
				else return null;
			};
			XMLElement.prototype.setAttributeNode = function(newAttr) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.removeAttributeNode = function(oldAttr) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getElementsByTagName = function(name) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getAttributeNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.removeAttributeNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.setAttributeNodeNS = function(newAttr) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.hasAttribute = function(name) {
				return this.attribs.hasOwnProperty(name);
			};
			XMLElement.prototype.hasAttributeNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.setIdAttribute = function(name, isId) {
				if (this.attribs.hasOwnProperty(name)) return this.attribs[name].isId;
				else return isId;
			};
			XMLElement.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.setIdAttributeNode = function(idAttr, isId) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getElementsByTagName = function(tagname) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.getElementsByClassName = function(classNames) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLElement.prototype.isEqualNode = function(node) {
				var i, j, ref1;
				if (!XMLElement.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) return false;
				if (node.namespaceURI !== this.namespaceURI) return false;
				if (node.prefix !== this.prefix) return false;
				if (node.localName !== this.localName) return false;
				if (node.attribs.length !== this.attribs.length) return false;
				for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) if (!this.attribs[i].isEqualNode(node.attribs[i])) return false;
				return true;
			};
			return XMLElement;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLCharacterData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var XMLNode, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		XMLNode = require_XMLNode();
		module.exports = (function(superClass) {
			extend(XMLCharacterData, superClass);
			function XMLCharacterData(parent) {
				XMLCharacterData.__super__.constructor.call(this, parent);
				this.value = "";
			}
			Object.defineProperty(XMLCharacterData.prototype, "data", {
				get: function() {
					return this.value;
				},
				set: function(value) {
					return this.value = value || "";
				}
			});
			Object.defineProperty(XMLCharacterData.prototype, "length", { get: function() {
				return this.value.length;
			} });
			Object.defineProperty(XMLCharacterData.prototype, "textContent", {
				get: function() {
					return this.value;
				},
				set: function(value) {
					return this.value = value || "";
				}
			});
			XMLCharacterData.prototype.clone = function() {
				return Object.create(this);
			};
			XMLCharacterData.prototype.substringData = function(offset, count) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLCharacterData.prototype.appendData = function(arg) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLCharacterData.prototype.insertData = function(offset, arg) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLCharacterData.prototype.deleteData = function(offset, count) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLCharacterData.prototype.replaceData = function(offset, count, arg) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLCharacterData.prototype.isEqualNode = function(node) {
				if (!XMLCharacterData.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) return false;
				if (node.data !== this.data) return false;
				return true;
			};
			return XMLCharacterData;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLCData = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLCharacterData, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		NodeType = require_NodeType();
		XMLCharacterData = require_XMLCharacterData();
		module.exports = (function(superClass) {
			extend(XMLCData, superClass);
			function XMLCData(parent, text) {
				XMLCData.__super__.constructor.call(this, parent);
				if (text == null) throw new Error("Missing CDATA text. " + this.debugInfo());
				this.name = "#cdata-section";
				this.type = NodeType.CData;
				this.value = this.stringify.cdata(text);
			}
			XMLCData.prototype.clone = function() {
				return Object.create(this);
			};
			XMLCData.prototype.toString = function(options) {
				return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
			};
			return XMLCData;
		})(XMLCharacterData);
	}).call(exports);
}));
var require_XMLComment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLCharacterData, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		NodeType = require_NodeType();
		XMLCharacterData = require_XMLCharacterData();
		module.exports = (function(superClass) {
			extend(XMLComment, superClass);
			function XMLComment(parent, text) {
				XMLComment.__super__.constructor.call(this, parent);
				if (text == null) throw new Error("Missing comment text. " + this.debugInfo());
				this.name = "#comment";
				this.type = NodeType.Comment;
				this.value = this.stringify.comment(text);
			}
			XMLComment.prototype.clone = function() {
				return Object.create(this);
			};
			XMLComment.prototype.toString = function(options) {
				return this.options.writer.comment(this, this.options.writer.filterOptions(options));
			};
			return XMLComment;
		})(XMLCharacterData);
	}).call(exports);
}));
var require_XMLDeclaration = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, isObject, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		isObject = require_Utility().isObject;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function(superClass) {
			extend(XMLDeclaration, superClass);
			function XMLDeclaration(parent, version, encoding, standalone) {
				var ref;
				XMLDeclaration.__super__.constructor.call(this, parent);
				if (isObject(version)) ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
				if (!version) version = "1.0";
				this.type = NodeType.Declaration;
				this.version = this.stringify.xmlVersion(version);
				if (encoding != null) this.encoding = this.stringify.xmlEncoding(encoding);
				if (standalone != null) this.standalone = this.stringify.xmlStandalone(standalone);
			}
			XMLDeclaration.prototype.toString = function(options) {
				return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
			};
			return XMLDeclaration;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLDTDAttList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function(superClass) {
			extend(XMLDTDAttList, superClass);
			function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
				XMLDTDAttList.__super__.constructor.call(this, parent);
				if (elementName == null) throw new Error("Missing DTD element name. " + this.debugInfo());
				if (attributeName == null) throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
				if (!attributeType) throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
				if (!defaultValueType) throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
				if (defaultValueType.indexOf("#") !== 0) defaultValueType = "#" + defaultValueType;
				if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
				if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
				this.elementName = this.stringify.name(elementName);
				this.type = NodeType.AttributeDeclaration;
				this.attributeName = this.stringify.name(attributeName);
				this.attributeType = this.stringify.dtdAttType(attributeType);
				if (defaultValue) this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
				this.defaultValueType = defaultValueType;
			}
			XMLDTDAttList.prototype.toString = function(options) {
				return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
			};
			return XMLDTDAttList;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLDTDEntity = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, isObject, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		isObject = require_Utility().isObject;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function(superClass) {
			extend(XMLDTDEntity, superClass);
			function XMLDTDEntity(parent, pe, name, value) {
				XMLDTDEntity.__super__.constructor.call(this, parent);
				if (name == null) throw new Error("Missing DTD entity name. " + this.debugInfo(name));
				if (value == null) throw new Error("Missing DTD entity value. " + this.debugInfo(name));
				this.pe = !!pe;
				this.name = this.stringify.name(name);
				this.type = NodeType.EntityDeclaration;
				if (!isObject(value)) {
					this.value = this.stringify.dtdEntityValue(value);
					this.internal = true;
				} else {
					if (!value.pubID && !value.sysID) throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
					if (value.pubID && !value.sysID) throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
					this.internal = false;
					if (value.pubID != null) this.pubID = this.stringify.dtdPubID(value.pubID);
					if (value.sysID != null) this.sysID = this.stringify.dtdSysID(value.sysID);
					if (value.nData != null) this.nData = this.stringify.dtdNData(value.nData);
					if (this.pe && this.nData) throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
				}
			}
			Object.defineProperty(XMLDTDEntity.prototype, "publicId", { get: function() {
				return this.pubID;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "systemId", { get: function() {
				return this.sysID;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "notationName", { get: function() {
				return this.nData || null;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "inputEncoding", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "xmlEncoding", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDTDEntity.prototype, "xmlVersion", { get: function() {
				return null;
			} });
			XMLDTDEntity.prototype.toString = function(options) {
				return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
			};
			return XMLDTDEntity;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLDTDElement = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function(superClass) {
			extend(XMLDTDElement, superClass);
			function XMLDTDElement(parent, name, value) {
				XMLDTDElement.__super__.constructor.call(this, parent);
				if (name == null) throw new Error("Missing DTD element name. " + this.debugInfo());
				if (!value) value = "(#PCDATA)";
				if (Array.isArray(value)) value = "(" + value.join(",") + ")";
				this.name = this.stringify.name(name);
				this.type = NodeType.ElementDeclaration;
				this.value = this.stringify.dtdElementValue(value);
			}
			XMLDTDElement.prototype.toString = function(options) {
				return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
			};
			return XMLDTDElement;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLDTDNotation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function(superClass) {
			extend(XMLDTDNotation, superClass);
			function XMLDTDNotation(parent, name, value) {
				XMLDTDNotation.__super__.constructor.call(this, parent);
				if (name == null) throw new Error("Missing DTD notation name. " + this.debugInfo(name));
				if (!value.pubID && !value.sysID) throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
				this.name = this.stringify.name(name);
				this.type = NodeType.NotationDeclaration;
				if (value.pubID != null) this.pubID = this.stringify.dtdPubID(value.pubID);
				if (value.sysID != null) this.sysID = this.stringify.dtdSysID(value.sysID);
			}
			Object.defineProperty(XMLDTDNotation.prototype, "publicId", { get: function() {
				return this.pubID;
			} });
			Object.defineProperty(XMLDTDNotation.prototype, "systemId", { get: function() {
				return this.sysID;
			} });
			XMLDTDNotation.prototype.toString = function(options) {
				return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
			};
			return XMLDTDNotation;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLDocType = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLNamedNodeMap, XMLNode, isObject, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		isObject = require_Utility().isObject;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		XMLDTDAttList = require_XMLDTDAttList();
		XMLDTDEntity = require_XMLDTDEntity();
		XMLDTDElement = require_XMLDTDElement();
		XMLDTDNotation = require_XMLDTDNotation();
		XMLNamedNodeMap = require_XMLNamedNodeMap();
		module.exports = (function(superClass) {
			extend(XMLDocType, superClass);
			function XMLDocType(parent, pubID, sysID) {
				var child, i, len, ref, ref1, ref2;
				XMLDocType.__super__.constructor.call(this, parent);
				this.type = NodeType.DocType;
				if (parent.children) {
					ref = parent.children;
					for (i = 0, len = ref.length; i < len; i++) {
						child = ref[i];
						if (child.type === NodeType.Element) {
							this.name = child.name;
							break;
						}
					}
				}
				this.documentObject = parent;
				if (isObject(pubID)) ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
				if (sysID == null) ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
				if (pubID != null) this.pubID = this.stringify.dtdPubID(pubID);
				if (sysID != null) this.sysID = this.stringify.dtdSysID(sysID);
			}
			Object.defineProperty(XMLDocType.prototype, "entities", { get: function() {
				var child, i, len, nodes = {}, ref = this.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					if (child.type === NodeType.EntityDeclaration && !child.pe) nodes[child.name] = child;
				}
				return new XMLNamedNodeMap(nodes);
			} });
			Object.defineProperty(XMLDocType.prototype, "notations", { get: function() {
				var child, i, len, nodes = {}, ref = this.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					if (child.type === NodeType.NotationDeclaration) nodes[child.name] = child;
				}
				return new XMLNamedNodeMap(nodes);
			} });
			Object.defineProperty(XMLDocType.prototype, "publicId", { get: function() {
				return this.pubID;
			} });
			Object.defineProperty(XMLDocType.prototype, "systemId", { get: function() {
				return this.sysID;
			} });
			Object.defineProperty(XMLDocType.prototype, "internalSubset", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			XMLDocType.prototype.element = function(name, value) {
				var child = new XMLDTDElement(this, name, value);
				this.children.push(child);
				return this;
			};
			XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
				var child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
				this.children.push(child);
				return this;
			};
			XMLDocType.prototype.entity = function(name, value) {
				var child = new XMLDTDEntity(this, false, name, value);
				this.children.push(child);
				return this;
			};
			XMLDocType.prototype.pEntity = function(name, value) {
				var child = new XMLDTDEntity(this, true, name, value);
				this.children.push(child);
				return this;
			};
			XMLDocType.prototype.notation = function(name, value) {
				var child = new XMLDTDNotation(this, name, value);
				this.children.push(child);
				return this;
			};
			XMLDocType.prototype.toString = function(options) {
				return this.options.writer.docType(this, this.options.writer.filterOptions(options));
			};
			XMLDocType.prototype.ele = function(name, value) {
				return this.element(name, value);
			};
			XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
				return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
			};
			XMLDocType.prototype.ent = function(name, value) {
				return this.entity(name, value);
			};
			XMLDocType.prototype.pent = function(name, value) {
				return this.pEntity(name, value);
			};
			XMLDocType.prototype.not = function(name, value) {
				return this.notation(name, value);
			};
			XMLDocType.prototype.up = function() {
				return this.root() || this.documentObject;
			};
			XMLDocType.prototype.isEqualNode = function(node) {
				if (!XMLDocType.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) return false;
				if (node.name !== this.name) return false;
				if (node.publicId !== this.publicId) return false;
				if (node.systemId !== this.systemId) return false;
				return true;
			};
			return XMLDocType;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLRaw = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		NodeType = require_NodeType();
		XMLNode = require_XMLNode();
		module.exports = (function(superClass) {
			extend(XMLRaw, superClass);
			function XMLRaw(parent, text) {
				XMLRaw.__super__.constructor.call(this, parent);
				if (text == null) throw new Error("Missing raw text. " + this.debugInfo());
				this.type = NodeType.Raw;
				this.value = this.stringify.raw(text);
			}
			XMLRaw.prototype.clone = function() {
				return Object.create(this);
			};
			XMLRaw.prototype.toString = function(options) {
				return this.options.writer.raw(this, this.options.writer.filterOptions(options));
			};
			return XMLRaw;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLText = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLCharacterData, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		NodeType = require_NodeType();
		XMLCharacterData = require_XMLCharacterData();
		module.exports = (function(superClass) {
			extend(XMLText, superClass);
			function XMLText(parent, text) {
				XMLText.__super__.constructor.call(this, parent);
				if (text == null) throw new Error("Missing element text. " + this.debugInfo());
				this.name = "#text";
				this.type = NodeType.Text;
				this.value = this.stringify.text(text);
			}
			Object.defineProperty(XMLText.prototype, "isElementContentWhitespace", { get: function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			} });
			Object.defineProperty(XMLText.prototype, "wholeText", { get: function() {
				var next, prev, str = "";
				prev = this.previousSibling;
				while (prev) {
					str = prev.data + str;
					prev = prev.previousSibling;
				}
				str += this.data;
				next = this.nextSibling;
				while (next) {
					str = str + next.data;
					next = next.nextSibling;
				}
				return str;
			} });
			XMLText.prototype.clone = function() {
				return Object.create(this);
			};
			XMLText.prototype.toString = function(options) {
				return this.options.writer.text(this, this.options.writer.filterOptions(options));
			};
			XMLText.prototype.splitText = function(offset) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLText.prototype.replaceWholeText = function(content) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			return XMLText;
		})(XMLCharacterData);
	}).call(exports);
}));
var require_XMLProcessingInstruction = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLCharacterData, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		NodeType = require_NodeType();
		XMLCharacterData = require_XMLCharacterData();
		module.exports = (function(superClass) {
			extend(XMLProcessingInstruction, superClass);
			function XMLProcessingInstruction(parent, target, value) {
				XMLProcessingInstruction.__super__.constructor.call(this, parent);
				if (target == null) throw new Error("Missing instruction target. " + this.debugInfo());
				this.type = NodeType.ProcessingInstruction;
				this.target = this.stringify.insTarget(target);
				this.name = this.target;
				if (value) this.value = this.stringify.insValue(value);
			}
			XMLProcessingInstruction.prototype.clone = function() {
				return Object.create(this);
			};
			XMLProcessingInstruction.prototype.toString = function(options) {
				return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
			};
			XMLProcessingInstruction.prototype.isEqualNode = function(node) {
				if (!XMLProcessingInstruction.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) return false;
				if (node.target !== this.target) return false;
				return true;
			};
			return XMLProcessingInstruction;
		})(XMLCharacterData);
	}).call(exports);
}));
var require_XMLDummy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLNode, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		module.exports = (function(superClass) {
			extend(XMLDummy, superClass);
			function XMLDummy(parent) {
				XMLDummy.__super__.constructor.call(this, parent);
				this.type = NodeType.Dummy;
			}
			XMLDummy.prototype.clone = function() {
				return Object.create(this);
			};
			XMLDummy.prototype.toString = function(options) {
				return "";
			};
			return XMLDummy;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLNodeList = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = (function() {
			function XMLNodeList(nodes) {
				this.nodes = nodes;
			}
			Object.defineProperty(XMLNodeList.prototype, "length", { get: function() {
				return this.nodes.length || 0;
			} });
			XMLNodeList.prototype.clone = function() {
				return this.nodes = null;
			};
			XMLNodeList.prototype.item = function(index) {
				return this.nodes[index] || null;
			};
			return XMLNodeList;
		})();
	}).call(exports);
}));
var require_DocumentPosition = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = {
			Disconnected: 1,
			Preceding: 2,
			Following: 4,
			Contains: 8,
			ContainedBy: 16,
			ImplementationSpecific: 32
		};
	}).call(exports);
}));
var require_XMLNode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var DocumentPosition, NodeType, XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNodeList, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction$1, isObject, ref1, hasProp = {}.hasOwnProperty;
		ref1 = require_Utility(), isObject = ref1.isObject, isFunction$1 = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;
		XMLElement = null;
		XMLCData = null;
		XMLComment = null;
		XMLDeclaration = null;
		XMLDocType = null;
		XMLRaw = null;
		XMLText = null;
		XMLProcessingInstruction = null;
		XMLDummy = null;
		NodeType = null;
		XMLNodeList = null;
		DocumentPosition = null;
		module.exports = (function() {
			function XMLNode(parent1) {
				this.parent = parent1;
				if (this.parent) {
					this.options = this.parent.options;
					this.stringify = this.parent.stringify;
				}
				this.value = null;
				this.children = [];
				this.baseURI = null;
				if (!XMLElement) {
					XMLElement = require_XMLElement();
					XMLCData = require_XMLCData();
					XMLComment = require_XMLComment();
					XMLDeclaration = require_XMLDeclaration();
					XMLDocType = require_XMLDocType();
					XMLRaw = require_XMLRaw();
					XMLText = require_XMLText();
					XMLProcessingInstruction = require_XMLProcessingInstruction();
					XMLDummy = require_XMLDummy();
					NodeType = require_NodeType();
					XMLNodeList = require_XMLNodeList();
					require_XMLNamedNodeMap();
					DocumentPosition = require_DocumentPosition();
				}
			}
			Object.defineProperty(XMLNode.prototype, "nodeName", { get: function() {
				return this.name;
			} });
			Object.defineProperty(XMLNode.prototype, "nodeType", { get: function() {
				return this.type;
			} });
			Object.defineProperty(XMLNode.prototype, "nodeValue", { get: function() {
				return this.value;
			} });
			Object.defineProperty(XMLNode.prototype, "parentNode", { get: function() {
				return this.parent;
			} });
			Object.defineProperty(XMLNode.prototype, "childNodes", { get: function() {
				if (!this.childNodeList || !this.childNodeList.nodes) this.childNodeList = new XMLNodeList(this.children);
				return this.childNodeList;
			} });
			Object.defineProperty(XMLNode.prototype, "firstChild", { get: function() {
				return this.children[0] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "lastChild", { get: function() {
				return this.children[this.children.length - 1] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "previousSibling", { get: function() {
				var i = this.parent.children.indexOf(this);
				return this.parent.children[i - 1] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "nextSibling", { get: function() {
				var i = this.parent.children.indexOf(this);
				return this.parent.children[i + 1] || null;
			} });
			Object.defineProperty(XMLNode.prototype, "ownerDocument", { get: function() {
				return this.document() || null;
			} });
			Object.defineProperty(XMLNode.prototype, "textContent", {
				get: function() {
					var child, j, len, ref2, str;
					if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
						str = "";
						ref2 = this.children;
						for (j = 0, len = ref2.length; j < len; j++) {
							child = ref2[j];
							if (child.textContent) str += child.textContent;
						}
						return str;
					} else return null;
				},
				set: function(value) {
					throw new Error("This DOM method is not implemented." + this.debugInfo());
				}
			});
			XMLNode.prototype.setParent = function(parent) {
				var child, j, len, ref2, results;
				this.parent = parent;
				if (parent) {
					this.options = parent.options;
					this.stringify = parent.stringify;
				}
				ref2 = this.children;
				results = [];
				for (j = 0, len = ref2.length; j < len; j++) {
					child = ref2[j];
					results.push(child.setParent(this));
				}
				return results;
			};
			XMLNode.prototype.element = function(name, attributes, text) {
				var childNode, item, j, k, key$1, lastChild = null, len, len1, ref2, ref3, val;
				if (attributes === null && text == null) ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
				if (attributes == null) attributes = {};
				attributes = getValue(attributes);
				if (!isObject(attributes)) ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
				if (name != null) name = getValue(name);
				if (Array.isArray(name)) for (j = 0, len = name.length; j < len; j++) {
					item = name[j];
					lastChild = this.element(item);
				}
				else if (isFunction$1(name)) lastChild = this.element(name.apply());
				else if (isObject(name)) for (key$1 in name) {
					if (!hasProp.call(name, key$1)) continue;
					val = name[key$1];
					if (isFunction$1(val)) val = val.apply();
					if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key$1.indexOf(this.stringify.convertAttKey) === 0) lastChild = this.attribute(key$1.substr(this.stringify.convertAttKey.length), val);
					else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) lastChild = this.dummy();
					else if (isObject(val) && isEmpty(val)) lastChild = this.element(key$1);
					else if (!this.options.keepNullNodes && val == null) lastChild = this.dummy();
					else if (!this.options.separateArrayItems && Array.isArray(val)) for (k = 0, len1 = val.length; k < len1; k++) {
						item = val[k];
						childNode = {};
						childNode[key$1] = item;
						lastChild = this.element(childNode);
					}
					else if (isObject(val)) if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key$1.indexOf(this.stringify.convertTextKey) === 0) lastChild = this.element(val);
					else {
						lastChild = this.element(key$1);
						lastChild.element(val);
					}
					else lastChild = this.element(key$1, val);
				}
				else if (!this.options.keepNullNodes && text === null) lastChild = this.dummy();
				else if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) lastChild = this.text(text);
				else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) lastChild = this.cdata(text);
				else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) lastChild = this.comment(text);
				else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) lastChild = this.raw(text);
				else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
				else lastChild = this.node(name, attributes, text);
				if (lastChild == null) throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
				return lastChild;
			};
			XMLNode.prototype.insertBefore = function(name, attributes, text) {
				var child, i, newChild, refChild, removed;
				if (name != null ? name.type : void 0) {
					newChild = name;
					refChild = attributes;
					newChild.setParent(this);
					if (refChild) {
						i = children.indexOf(refChild);
						removed = children.splice(i);
						children.push(newChild);
						Array.prototype.push.apply(children, removed);
					} else children.push(newChild);
					return newChild;
				} else {
					if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
					i = this.parent.children.indexOf(this);
					removed = this.parent.children.splice(i);
					child = this.parent.element(name, attributes, text);
					Array.prototype.push.apply(this.parent.children, removed);
					return child;
				}
			};
			XMLNode.prototype.insertAfter = function(name, attributes, text) {
				var child, i, removed;
				if (this.isRoot) throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
				i = this.parent.children.indexOf(this);
				removed = this.parent.children.splice(i + 1);
				child = this.parent.element(name, attributes, text);
				Array.prototype.push.apply(this.parent.children, removed);
				return child;
			};
			XMLNode.prototype.remove = function() {
				var i;
				if (this.isRoot) throw new Error("Cannot remove the root element. " + this.debugInfo());
				i = this.parent.children.indexOf(this);
				[].splice.apply(this.parent.children, [i, i - i + 1].concat([]));
				return this.parent;
			};
			XMLNode.prototype.node = function(name, attributes, text) {
				var child, ref2;
				if (name != null) name = getValue(name);
				attributes || (attributes = {});
				attributes = getValue(attributes);
				if (!isObject(attributes)) ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
				child = new XMLElement(this, name, attributes);
				if (text != null) child.text(text);
				this.children.push(child);
				return child;
			};
			XMLNode.prototype.text = function(value) {
				var child;
				if (isObject(value)) this.element(value);
				child = new XMLText(this, value);
				this.children.push(child);
				return this;
			};
			XMLNode.prototype.cdata = function(value) {
				var child = new XMLCData(this, value);
				this.children.push(child);
				return this;
			};
			XMLNode.prototype.comment = function(value) {
				var child = new XMLComment(this, value);
				this.children.push(child);
				return this;
			};
			XMLNode.prototype.commentBefore = function(value) {
				var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i);
				this.parent.comment(value);
				Array.prototype.push.apply(this.parent.children, removed);
				return this;
			};
			XMLNode.prototype.commentAfter = function(value) {
				var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i + 1);
				this.parent.comment(value);
				Array.prototype.push.apply(this.parent.children, removed);
				return this;
			};
			XMLNode.prototype.raw = function(value) {
				var child = new XMLRaw(this, value);
				this.children.push(child);
				return this;
			};
			XMLNode.prototype.dummy = function() {
				return new XMLDummy(this);
			};
			XMLNode.prototype.instruction = function(target, value) {
				var insTarget, insValue, instruction, j, len;
				if (target != null) target = getValue(target);
				if (value != null) value = getValue(value);
				if (Array.isArray(target)) for (j = 0, len = target.length; j < len; j++) {
					insTarget = target[j];
					this.instruction(insTarget);
				}
				else if (isObject(target)) for (insTarget in target) {
					if (!hasProp.call(target, insTarget)) continue;
					insValue = target[insTarget];
					this.instruction(insTarget, insValue);
				}
				else {
					if (isFunction$1(value)) value = value.apply();
					instruction = new XMLProcessingInstruction(this, target, value);
					this.children.push(instruction);
				}
				return this;
			};
			XMLNode.prototype.instructionBefore = function(target, value) {
				var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i);
				this.parent.instruction(target, value);
				Array.prototype.push.apply(this.parent.children, removed);
				return this;
			};
			XMLNode.prototype.instructionAfter = function(target, value) {
				var i = this.parent.children.indexOf(this), removed = this.parent.children.splice(i + 1);
				this.parent.instruction(target, value);
				Array.prototype.push.apply(this.parent.children, removed);
				return this;
			};
			XMLNode.prototype.declaration = function(version, encoding, standalone) {
				var doc = this.document(), xmldec = new XMLDeclaration(doc, version, encoding, standalone);
				if (doc.children.length === 0) doc.children.unshift(xmldec);
				else if (doc.children[0].type === NodeType.Declaration) doc.children[0] = xmldec;
				else doc.children.unshift(xmldec);
				return doc.root() || doc;
			};
			XMLNode.prototype.dtd = function(pubID, sysID) {
				var child, doc = this.document(), doctype = new XMLDocType(doc, pubID, sysID), i, j, k, len, len1, ref2 = doc.children, ref3;
				for (i = j = 0, len = ref2.length; j < len; i = ++j) {
					child = ref2[i];
					if (child.type === NodeType.DocType) {
						doc.children[i] = doctype;
						return doctype;
					}
				}
				ref3 = doc.children;
				for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
					child = ref3[i];
					if (child.isRoot) {
						doc.children.splice(i, 0, doctype);
						return doctype;
					}
				}
				doc.children.push(doctype);
				return doctype;
			};
			XMLNode.prototype.up = function() {
				if (this.isRoot) throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
				return this.parent;
			};
			XMLNode.prototype.root = function() {
				var node = this;
				while (node) if (node.type === NodeType.Document) return node.rootObject;
				else if (node.isRoot) return node;
				else node = node.parent;
			};
			XMLNode.prototype.document = function() {
				var node = this;
				while (node) if (node.type === NodeType.Document) return node;
				else node = node.parent;
			};
			XMLNode.prototype.end = function(options) {
				return this.document().end(options);
			};
			XMLNode.prototype.prev = function() {
				var i = this.parent.children.indexOf(this);
				if (i < 1) throw new Error("Already at the first node. " + this.debugInfo());
				return this.parent.children[i - 1];
			};
			XMLNode.prototype.next = function() {
				var i = this.parent.children.indexOf(this);
				if (i === -1 || i === this.parent.children.length - 1) throw new Error("Already at the last node. " + this.debugInfo());
				return this.parent.children[i + 1];
			};
			XMLNode.prototype.importDocument = function(doc) {
				var clonedRoot = doc.root().clone();
				clonedRoot.parent = this;
				clonedRoot.isRoot = false;
				this.children.push(clonedRoot);
				return this;
			};
			XMLNode.prototype.debugInfo = function(name) {
				var ref2, ref3;
				name = name || this.name;
				if (name == null && !((ref2 = this.parent) != null ? ref2.name : void 0)) return "";
				else if (name == null) return "parent: <" + this.parent.name + ">";
				else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) return "node: <" + name + ">";
				else return "node: <" + name + ">, parent: <" + this.parent.name + ">";
			};
			XMLNode.prototype.ele = function(name, attributes, text) {
				return this.element(name, attributes, text);
			};
			XMLNode.prototype.nod = function(name, attributes, text) {
				return this.node(name, attributes, text);
			};
			XMLNode.prototype.txt = function(value) {
				return this.text(value);
			};
			XMLNode.prototype.dat = function(value) {
				return this.cdata(value);
			};
			XMLNode.prototype.com = function(value) {
				return this.comment(value);
			};
			XMLNode.prototype.ins = function(target, value) {
				return this.instruction(target, value);
			};
			XMLNode.prototype.doc = function() {
				return this.document();
			};
			XMLNode.prototype.dec = function(version, encoding, standalone) {
				return this.declaration(version, encoding, standalone);
			};
			XMLNode.prototype.e = function(name, attributes, text) {
				return this.element(name, attributes, text);
			};
			XMLNode.prototype.n = function(name, attributes, text) {
				return this.node(name, attributes, text);
			};
			XMLNode.prototype.t = function(value) {
				return this.text(value);
			};
			XMLNode.prototype.d = function(value) {
				return this.cdata(value);
			};
			XMLNode.prototype.c = function(value) {
				return this.comment(value);
			};
			XMLNode.prototype.r = function(value) {
				return this.raw(value);
			};
			XMLNode.prototype.i = function(target, value) {
				return this.instruction(target, value);
			};
			XMLNode.prototype.u = function() {
				return this.up();
			};
			XMLNode.prototype.importXMLBuilder = function(doc) {
				return this.importDocument(doc);
			};
			XMLNode.prototype.replaceChild = function(newChild, oldChild) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.removeChild = function(oldChild) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.appendChild = function(newChild) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.hasChildNodes = function() {
				return this.children.length !== 0;
			};
			XMLNode.prototype.cloneNode = function(deep) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.normalize = function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.isSupported = function(feature, version) {
				return true;
			};
			XMLNode.prototype.hasAttributes = function() {
				return this.attribs.length !== 0;
			};
			XMLNode.prototype.compareDocumentPosition = function(other) {
				var ref = this, res;
				if (ref === other) return 0;
				else if (this.document() !== other.document()) {
					res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;
					if (Math.random() < .5) res |= DocumentPosition.Preceding;
					else res |= DocumentPosition.Following;
					return res;
				} else if (ref.isAncestor(other)) return DocumentPosition.Contains | DocumentPosition.Preceding;
				else if (ref.isDescendant(other)) return DocumentPosition.Contains | DocumentPosition.Following;
				else if (ref.isPreceding(other)) return DocumentPosition.Preceding;
				else return DocumentPosition.Following;
			};
			XMLNode.prototype.isSameNode = function(other) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.lookupPrefix = function(namespaceURI) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.isDefaultNamespace = function(namespaceURI) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.lookupNamespaceURI = function(prefix$1) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.isEqualNode = function(node) {
				var i, j, ref2;
				if (node.nodeType !== this.nodeType) return false;
				if (node.children.length !== this.children.length) return false;
				for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) if (!this.children[i].isEqualNode(node.children[i])) return false;
				return true;
			};
			XMLNode.prototype.getFeature = function(feature, version) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.setUserData = function(key$1, data, handler) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.getUserData = function(key$1) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLNode.prototype.contains = function(other) {
				if (!other) return false;
				return other === this || this.isDescendant(other);
			};
			XMLNode.prototype.isDescendant = function(node) {
				var child, isDescendantChild, j, len, ref2 = this.children;
				for (j = 0, len = ref2.length; j < len; j++) {
					child = ref2[j];
					if (node === child) return true;
					isDescendantChild = child.isDescendant(node);
					if (isDescendantChild) return true;
				}
				return false;
			};
			XMLNode.prototype.isAncestor = function(node) {
				return node.isDescendant(this);
			};
			XMLNode.prototype.isPreceding = function(node) {
				var nodePos = this.treePosition(node), thisPos = this.treePosition(this);
				if (nodePos === -1 || thisPos === -1) return false;
				else return nodePos < thisPos;
			};
			XMLNode.prototype.isFollowing = function(node) {
				var nodePos = this.treePosition(node), thisPos = this.treePosition(this);
				if (nodePos === -1 || thisPos === -1) return false;
				else return nodePos > thisPos;
			};
			XMLNode.prototype.treePosition = function(node) {
				var found, pos = 0;
				found = false;
				this.foreachTreeNode(this.document(), function(childNode) {
					pos++;
					if (!found && childNode === node) return found = true;
				});
				if (found) return pos;
				else return -1;
			};
			XMLNode.prototype.foreachTreeNode = function(node, func) {
				var child, j, len, ref2, res;
				node || (node = this.document());
				ref2 = node.children;
				for (j = 0, len = ref2.length; j < len; j++) {
					child = ref2[j];
					if (res = func(child)) return res;
					else {
						res = this.foreachTreeNode(child, func);
						if (res) return res;
					}
				}
			};
			return XMLNode;
		})();
	}).call(exports);
}));
var require_XMLStringifier = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var bind$5 = function(fn$1, me) {
			return function() {
				return fn$1.apply(me, arguments);
			};
		}, hasProp = {}.hasOwnProperty;
		module.exports = (function() {
			function XMLStringifier(options) {
				this.assertLegalName = bind$5(this.assertLegalName, this);
				this.assertLegalChar = bind$5(this.assertLegalChar, this);
				var key$1, ref, value;
				options || (options = {});
				this.options = options;
				if (!this.options.version) this.options.version = "1.0";
				ref = options.stringify || {};
				for (key$1 in ref) {
					if (!hasProp.call(ref, key$1)) continue;
					value = ref[key$1];
					this[key$1] = value;
				}
			}
			XMLStringifier.prototype.name = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalName("" + val || "");
			};
			XMLStringifier.prototype.text = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar(this.textEscape("" + val || ""));
			};
			XMLStringifier.prototype.cdata = function(val) {
				if (this.options.noValidation) return val;
				val = "" + val || "";
				val = val.replace("]]>", "]]]]><![CDATA[>");
				return this.assertLegalChar(val);
			};
			XMLStringifier.prototype.comment = function(val) {
				if (this.options.noValidation) return val;
				val = "" + val || "";
				if (val.match(/--/)) throw new Error("Comment text cannot contain double-hypen: " + val);
				return this.assertLegalChar(val);
			};
			XMLStringifier.prototype.raw = function(val) {
				if (this.options.noValidation) return val;
				return "" + val || "";
			};
			XMLStringifier.prototype.attValue = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar(this.attEscape(val = "" + val || ""));
			};
			XMLStringifier.prototype.insTarget = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.insValue = function(val) {
				if (this.options.noValidation) return val;
				val = "" + val || "";
				if (val.match(/\?>/)) throw new Error("Invalid processing instruction value: " + val);
				return this.assertLegalChar(val);
			};
			XMLStringifier.prototype.xmlVersion = function(val) {
				if (this.options.noValidation) return val;
				val = "" + val || "";
				if (!val.match(/1\.[0-9]+/)) throw new Error("Invalid version number: " + val);
				return val;
			};
			XMLStringifier.prototype.xmlEncoding = function(val) {
				if (this.options.noValidation) return val;
				val = "" + val || "";
				if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) throw new Error("Invalid encoding: " + val);
				return this.assertLegalChar(val);
			};
			XMLStringifier.prototype.xmlStandalone = function(val) {
				if (this.options.noValidation) return val;
				if (val) return "yes";
				else return "no";
			};
			XMLStringifier.prototype.dtdPubID = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.dtdSysID = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.dtdElementValue = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.dtdAttType = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.dtdAttDefault = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.dtdEntityValue = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.dtdNData = function(val) {
				if (this.options.noValidation) return val;
				return this.assertLegalChar("" + val || "");
			};
			XMLStringifier.prototype.convertAttKey = "@";
			XMLStringifier.prototype.convertPIKey = "?";
			XMLStringifier.prototype.convertTextKey = "#text";
			XMLStringifier.prototype.convertCDataKey = "#cdata";
			XMLStringifier.prototype.convertCommentKey = "#comment";
			XMLStringifier.prototype.convertRawKey = "#raw";
			XMLStringifier.prototype.assertLegalChar = function(str) {
				var regex$1, res;
				if (this.options.noValidation) return str;
				regex$1 = "";
				if (this.options.version === "1.0") {
					regex$1 = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
					if (res = str.match(regex$1)) throw new Error("Invalid character in string: " + str + " at index " + res.index);
				} else if (this.options.version === "1.1") {
					regex$1 = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
					if (res = str.match(regex$1)) throw new Error("Invalid character in string: " + str + " at index " + res.index);
				}
				return str;
			};
			XMLStringifier.prototype.assertLegalName = function(str) {
				var regex$1;
				if (this.options.noValidation) return str;
				this.assertLegalChar(str);
				regex$1 = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
				if (!str.match(regex$1)) throw new Error("Invalid character in name");
				return str;
			};
			XMLStringifier.prototype.textEscape = function(str) {
				var ampregex;
				if (this.options.noValidation) return str;
				ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
				return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "&#xD;");
			};
			XMLStringifier.prototype.attEscape = function(str) {
				var ampregex;
				if (this.options.noValidation) return str;
				ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
				return str.replace(ampregex, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/\t/g, "&#x9;").replace(/\n/g, "&#xA;").replace(/\r/g, "&#xD;");
			};
			return XMLStringifier;
		})();
	}).call(exports);
}));
var require_WriterState = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		module.exports = {
			None: 0,
			OpenTag: 1,
			InsideTag: 2,
			CloseTag: 3
		};
	}).call(exports);
}));
var require_XMLWriterBase = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, assign$1, hasProp = {}.hasOwnProperty;
		assign$1 = require_Utility().assign;
		NodeType = require_NodeType();
		require_XMLDeclaration();
		require_XMLDocType();
		require_XMLCData();
		require_XMLComment();
		require_XMLElement();
		require_XMLRaw();
		require_XMLText();
		require_XMLProcessingInstruction();
		require_XMLDummy();
		require_XMLDTDAttList();
		require_XMLDTDElement();
		require_XMLDTDEntity();
		require_XMLDTDNotation();
		WriterState = require_WriterState();
		module.exports = (function() {
			function XMLWriterBase(options) {
				var key$1, ref, value;
				options || (options = {});
				this.options = options;
				ref = options.writer || {};
				for (key$1 in ref) {
					if (!hasProp.call(ref, key$1)) continue;
					value = ref[key$1];
					this["_" + key$1] = this[key$1];
					this[key$1] = value;
				}
			}
			XMLWriterBase.prototype.filterOptions = function(options) {
				var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
				options || (options = {});
				options = assign$1({}, this.options, options);
				filteredOptions = { writer: this };
				filteredOptions.pretty = options.pretty || false;
				filteredOptions.allowEmpty = options.allowEmpty || false;
				filteredOptions.indent = (ref = options.indent) != null ? ref : "  ";
				filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : "\n";
				filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
				filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
				filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : "";
				if (filteredOptions.spaceBeforeSlash === true) filteredOptions.spaceBeforeSlash = " ";
				filteredOptions.suppressPrettyCount = 0;
				filteredOptions.user = {};
				filteredOptions.state = WriterState.None;
				return filteredOptions;
			};
			XMLWriterBase.prototype.indent = function(node, options, level) {
				var indentLevel;
				if (!options.pretty || options.suppressPrettyCount) return "";
				else if (options.pretty) {
					indentLevel = (level || 0) + options.offset + 1;
					if (indentLevel > 0) return new Array(indentLevel).join(options.indent);
				}
				return "";
			};
			XMLWriterBase.prototype.endline = function(node, options, level) {
				if (!options.pretty || options.suppressPrettyCount) return "";
				else return options.newline;
			};
			XMLWriterBase.prototype.attribute = function(att, options, level) {
				var r;
				this.openAttribute(att, options, level);
				r = " " + att.name + "=\"" + att.value + "\"";
				this.closeAttribute(att, options, level);
				return r;
			};
			XMLWriterBase.prototype.cdata = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<![CDATA[";
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += "]]>" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.comment = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!-- ";
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += " -->" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.declaration = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<?xml";
				options.state = WriterState.InsideTag;
				r += " version=\"" + node.version + "\"";
				if (node.encoding != null) r += " encoding=\"" + node.encoding + "\"";
				if (node.standalone != null) r += " standalone=\"" + node.standalone + "\"";
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + "?>";
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.docType = function(node, options, level) {
				var child, i, len, r, ref;
				level || (level = 0);
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level);
				r += "<!DOCTYPE " + node.root().name;
				if (node.pubID && node.sysID) r += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
				else if (node.sysID) r += " SYSTEM \"" + node.sysID + "\"";
				if (node.children.length > 0) {
					r += " [";
					r += this.endline(node, options, level);
					options.state = WriterState.InsideTag;
					ref = node.children;
					for (i = 0, len = ref.length; i < len; i++) {
						child = ref[i];
						r += this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					r += "]";
				}
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">";
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.element = function(node, options, level) {
				var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
				level || (level = 0);
				prettySuppressed = false;
				r = "";
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r += this.indent(node, options, level) + "<" + node.name;
				ref = node.attribs;
				for (name in ref) {
					if (!hasProp.call(ref, name)) continue;
					att = ref[name];
					r += this.attribute(att, options, level);
				}
				childNodeCount = node.children.length;
				firstChildNode = childNodeCount === 0 ? null : node.children[0];
				if (childNodeCount === 0 || node.children.every(function(e) {
					return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === "";
				})) if (options.allowEmpty) {
					r += ">";
					options.state = WriterState.CloseTag;
					r += "</" + node.name + ">" + this.endline(node, options, level);
				} else {
					options.state = WriterState.CloseTag;
					r += options.spaceBeforeSlash + "/>" + this.endline(node, options, level);
				}
				else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
					r += ">";
					options.state = WriterState.InsideTag;
					options.suppressPrettyCount++;
					prettySuppressed = true;
					r += this.writeChildNode(firstChildNode, options, level + 1);
					options.suppressPrettyCount--;
					prettySuppressed = false;
					options.state = WriterState.CloseTag;
					r += "</" + node.name + ">" + this.endline(node, options, level);
				} else {
					if (options.dontPrettyTextNodes) {
						ref1 = node.children;
						for (i = 0, len = ref1.length; i < len; i++) {
							child = ref1[i];
							if ((child.type === NodeType.Text || child.type === NodeType.Raw) && child.value != null) {
								options.suppressPrettyCount++;
								prettySuppressed = true;
								break;
							}
						}
					}
					r += ">" + this.endline(node, options, level);
					options.state = WriterState.InsideTag;
					ref2 = node.children;
					for (j = 0, len1 = ref2.length; j < len1; j++) {
						child = ref2[j];
						r += this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					r += this.indent(node, options, level) + "</" + node.name + ">";
					if (prettySuppressed) options.suppressPrettyCount--;
					r += this.endline(node, options, level);
					options.state = WriterState.None;
				}
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.writeChildNode = function(node, options, level) {
				switch (node.type) {
					case NodeType.CData: return this.cdata(node, options, level);
					case NodeType.Comment: return this.comment(node, options, level);
					case NodeType.Element: return this.element(node, options, level);
					case NodeType.Raw: return this.raw(node, options, level);
					case NodeType.Text: return this.text(node, options, level);
					case NodeType.ProcessingInstruction: return this.processingInstruction(node, options, level);
					case NodeType.Dummy: return "";
					case NodeType.Declaration: return this.declaration(node, options, level);
					case NodeType.DocType: return this.docType(node, options, level);
					case NodeType.AttributeDeclaration: return this.dtdAttList(node, options, level);
					case NodeType.ElementDeclaration: return this.dtdElement(node, options, level);
					case NodeType.EntityDeclaration: return this.dtdEntity(node, options, level);
					case NodeType.NotationDeclaration: return this.dtdNotation(node, options, level);
					default: throw new Error("Unknown XML node type: " + node.constructor.name);
				}
			};
			XMLWriterBase.prototype.processingInstruction = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<?";
				options.state = WriterState.InsideTag;
				r += node.target;
				if (node.value) r += " " + node.value;
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + "?>";
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.raw = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level);
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.text = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level);
				options.state = WriterState.InsideTag;
				r += node.value;
				options.state = WriterState.CloseTag;
				r += this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.dtdAttList = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!ATTLIST";
				options.state = WriterState.InsideTag;
				r += " " + node.elementName + " " + node.attributeName + " " + node.attributeType;
				if (node.defaultValueType !== "#DEFAULT") r += " " + node.defaultValueType;
				if (node.defaultValue) r += " \"" + node.defaultValue + "\"";
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.dtdElement = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!ELEMENT";
				options.state = WriterState.InsideTag;
				r += " " + node.name + " " + node.value;
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.dtdEntity = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!ENTITY";
				options.state = WriterState.InsideTag;
				if (node.pe) r += " %";
				r += " " + node.name;
				if (node.value) r += " \"" + node.value + "\"";
				else {
					if (node.pubID && node.sysID) r += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
					else if (node.sysID) r += " SYSTEM \"" + node.sysID + "\"";
					if (node.nData) r += " NDATA " + node.nData;
				}
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.dtdNotation = function(node, options, level) {
				var r;
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				r = this.indent(node, options, level) + "<!NOTATION";
				options.state = WriterState.InsideTag;
				r += " " + node.name;
				if (node.pubID && node.sysID) r += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
				else if (node.pubID) r += " PUBLIC \"" + node.pubID + "\"";
				else if (node.sysID) r += " SYSTEM \"" + node.sysID + "\"";
				options.state = WriterState.CloseTag;
				r += options.spaceBeforeSlash + ">" + this.endline(node, options, level);
				options.state = WriterState.None;
				this.closeNode(node, options, level);
				return r;
			};
			XMLWriterBase.prototype.openNode = function(node, options, level) {};
			XMLWriterBase.prototype.closeNode = function(node, options, level) {};
			XMLWriterBase.prototype.openAttribute = function(att, options, level) {};
			XMLWriterBase.prototype.closeAttribute = function(att, options, level) {};
			return XMLWriterBase;
		})();
	}).call(exports);
}));
var require_XMLStringWriter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var XMLWriterBase, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		XMLWriterBase = require_XMLWriterBase();
		module.exports = (function(superClass) {
			extend(XMLStringWriter, superClass);
			function XMLStringWriter(options) {
				XMLStringWriter.__super__.constructor.call(this, options);
			}
			XMLStringWriter.prototype.document = function(doc, options) {
				var child, i, len, r, ref;
				options = this.filterOptions(options);
				r = "";
				ref = doc.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					r += this.writeChildNode(child, options, 0);
				}
				if (options.pretty && r.slice(-options.newline.length) === options.newline) r = r.slice(0, -options.newline.length);
				return r;
			};
			return XMLStringWriter;
		})(XMLWriterBase);
	}).call(exports);
}));
var require_XMLDocument = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, XMLDOMConfiguration, XMLDOMImplementation, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		isPlainObject = require_Utility().isPlainObject;
		XMLDOMImplementation = require_XMLDOMImplementation();
		XMLDOMConfiguration = require_XMLDOMConfiguration();
		XMLNode = require_XMLNode();
		NodeType = require_NodeType();
		XMLStringifier = require_XMLStringifier();
		XMLStringWriter = require_XMLStringWriter();
		module.exports = (function(superClass) {
			extend(XMLDocument, superClass);
			function XMLDocument(options) {
				XMLDocument.__super__.constructor.call(this, null);
				this.name = "#document";
				this.type = NodeType.Document;
				this.documentURI = null;
				this.domConfig = new XMLDOMConfiguration();
				options || (options = {});
				if (!options.writer) options.writer = new XMLStringWriter();
				this.options = options;
				this.stringify = new XMLStringifier(options);
			}
			Object.defineProperty(XMLDocument.prototype, "implementation", { value: new XMLDOMImplementation() });
			Object.defineProperty(XMLDocument.prototype, "doctype", { get: function() {
				var child, i, len, ref = this.children;
				for (i = 0, len = ref.length; i < len; i++) {
					child = ref[i];
					if (child.type === NodeType.DocType) return child;
				}
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "documentElement", { get: function() {
				return this.rootObject || null;
			} });
			Object.defineProperty(XMLDocument.prototype, "inputEncoding", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "strictErrorChecking", { get: function() {
				return false;
			} });
			Object.defineProperty(XMLDocument.prototype, "xmlEncoding", { get: function() {
				if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) return this.children[0].encoding;
				else return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "xmlStandalone", { get: function() {
				if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) return this.children[0].standalone === "yes";
				else return false;
			} });
			Object.defineProperty(XMLDocument.prototype, "xmlVersion", { get: function() {
				if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) return this.children[0].version;
				else return "1.0";
			} });
			Object.defineProperty(XMLDocument.prototype, "URL", { get: function() {
				return this.documentURI;
			} });
			Object.defineProperty(XMLDocument.prototype, "origin", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "compatMode", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "characterSet", { get: function() {
				return null;
			} });
			Object.defineProperty(XMLDocument.prototype, "contentType", { get: function() {
				return null;
			} });
			XMLDocument.prototype.end = function(writer) {
				var writerOptions = {};
				if (!writer) writer = this.options.writer;
				else if (isPlainObject(writer)) {
					writerOptions = writer;
					writer = this.options.writer;
				}
				return writer.document(this, writer.filterOptions(writerOptions));
			};
			XMLDocument.prototype.toString = function(options) {
				return this.options.writer.document(this, this.options.writer.filterOptions(options));
			};
			XMLDocument.prototype.createElement = function(tagName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createDocumentFragment = function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createTextNode = function(data) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createComment = function(data) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createCDATASection = function(data) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createProcessingInstruction = function(target, data) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createAttribute = function(name) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createEntityReference = function(name) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.getElementsByTagName = function(tagname) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.importNode = function(importedNode, deep) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createElementNS = function(namespaceURI, qualifiedName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.getElementById = function(elementId) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.adoptNode = function(source) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.normalizeDocument = function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.getElementsByClassName = function(classNames) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createEvent = function(eventInterface) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createRange = function() {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createNodeIterator = function(root, whatToShow, filter) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			XMLDocument.prototype.createTreeWalker = function(root, whatToShow, filter) {
				throw new Error("This DOM method is not implemented." + this.debugInfo());
			};
			return XMLDocument;
		})(XMLNode);
	}).call(exports);
}));
var require_XMLDocumentCB = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocument, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction$1, isObject, isPlainObject, ref, hasProp = {}.hasOwnProperty;
		ref = require_Utility(), isObject = ref.isObject, isFunction$1 = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
		NodeType = require_NodeType();
		XMLDocument = require_XMLDocument();
		XMLElement = require_XMLElement();
		XMLCData = require_XMLCData();
		XMLComment = require_XMLComment();
		XMLRaw = require_XMLRaw();
		XMLText = require_XMLText();
		XMLProcessingInstruction = require_XMLProcessingInstruction();
		XMLDeclaration = require_XMLDeclaration();
		XMLDocType = require_XMLDocType();
		XMLDTDAttList = require_XMLDTDAttList();
		XMLDTDEntity = require_XMLDTDEntity();
		XMLDTDElement = require_XMLDTDElement();
		XMLDTDNotation = require_XMLDTDNotation();
		XMLAttribute = require_XMLAttribute();
		XMLStringifier = require_XMLStringifier();
		XMLStringWriter = require_XMLStringWriter();
		WriterState = require_WriterState();
		module.exports = (function() {
			function XMLDocumentCB(options, onData, onEnd) {
				var writerOptions;
				this.name = "?xml";
				this.type = NodeType.Document;
				options || (options = {});
				writerOptions = {};
				if (!options.writer) options.writer = new XMLStringWriter();
				else if (isPlainObject(options.writer)) {
					writerOptions = options.writer;
					options.writer = new XMLStringWriter();
				}
				this.options = options;
				this.writer = options.writer;
				this.writerOptions = this.writer.filterOptions(writerOptions);
				this.stringify = new XMLStringifier(options);
				this.onDataCallback = onData || function() {};
				this.onEndCallback = onEnd || function() {};
				this.currentNode = null;
				this.currentLevel = -1;
				this.openTags = {};
				this.documentStarted = false;
				this.documentCompleted = false;
				this.root = null;
			}
			XMLDocumentCB.prototype.createChildNode = function(node) {
				var att, attName, attributes, child, i, len, ref1, ref2;
				switch (node.type) {
					case NodeType.CData:
						this.cdata(node.value);
						break;
					case NodeType.Comment:
						this.comment(node.value);
						break;
					case NodeType.Element:
						attributes = {};
						ref1 = node.attribs;
						for (attName in ref1) {
							if (!hasProp.call(ref1, attName)) continue;
							att = ref1[attName];
							attributes[attName] = att.value;
						}
						this.node(node.name, attributes);
						break;
					case NodeType.Dummy:
						this.dummy();
						break;
					case NodeType.Raw:
						this.raw(node.value);
						break;
					case NodeType.Text:
						this.text(node.value);
						break;
					case NodeType.ProcessingInstruction:
						this.instruction(node.target, node.value);
						break;
					default: throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
				}
				ref2 = node.children;
				for (i = 0, len = ref2.length; i < len; i++) {
					child = ref2[i];
					this.createChildNode(child);
					if (child.type === NodeType.Element) this.up();
				}
				return this;
			};
			XMLDocumentCB.prototype.dummy = function() {
				return this;
			};
			XMLDocumentCB.prototype.node = function(name, attributes, text) {
				var ref1;
				if (name == null) throw new Error("Missing node name.");
				if (this.root && this.currentLevel === -1) throw new Error("Document can only have one root node. " + this.debugInfo(name));
				this.openCurrent();
				name = getValue(name);
				if (attributes == null) attributes = {};
				attributes = getValue(attributes);
				if (!isObject(attributes)) ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
				this.currentNode = new XMLElement(this, name, attributes);
				this.currentNode.children = false;
				this.currentLevel++;
				this.openTags[this.currentLevel] = this.currentNode;
				if (text != null) this.text(text);
				return this;
			};
			XMLDocumentCB.prototype.element = function(name, attributes, text) {
				var child, i, len, oldValidationFlag, ref1, root;
				if (this.currentNode && this.currentNode.type === NodeType.DocType) this.dtdElement.apply(this, arguments);
				else if (Array.isArray(name) || isObject(name) || isFunction$1(name)) {
					oldValidationFlag = this.options.noValidation;
					this.options.noValidation = true;
					root = new XMLDocument(this.options).element("TEMP_ROOT");
					root.element(name);
					this.options.noValidation = oldValidationFlag;
					ref1 = root.children;
					for (i = 0, len = ref1.length; i < len; i++) {
						child = ref1[i];
						this.createChildNode(child);
						if (child.type === NodeType.Element) this.up();
					}
				} else this.node(name, attributes, text);
				return this;
			};
			XMLDocumentCB.prototype.attribute = function(name, value) {
				var attName, attValue;
				if (!this.currentNode || this.currentNode.children) throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
				if (name != null) name = getValue(name);
				if (isObject(name)) for (attName in name) {
					if (!hasProp.call(name, attName)) continue;
					attValue = name[attName];
					this.attribute(attName, attValue);
				}
				else {
					if (isFunction$1(value)) value = value.apply();
					if (this.options.keepNullAttributes && value == null) this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
					else if (value != null) this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
				}
				return this;
			};
			XMLDocumentCB.prototype.text = function(value) {
				var node;
				this.openCurrent();
				node = new XMLText(this, value);
				this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.cdata = function(value) {
				var node;
				this.openCurrent();
				node = new XMLCData(this, value);
				this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.comment = function(value) {
				var node;
				this.openCurrent();
				node = new XMLComment(this, value);
				this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.raw = function(value) {
				var node;
				this.openCurrent();
				node = new XMLRaw(this, value);
				this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.instruction = function(target, value) {
				var i, insTarget, insValue, len, node;
				this.openCurrent();
				if (target != null) target = getValue(target);
				if (value != null) value = getValue(value);
				if (Array.isArray(target)) for (i = 0, len = target.length; i < len; i++) {
					insTarget = target[i];
					this.instruction(insTarget);
				}
				else if (isObject(target)) for (insTarget in target) {
					if (!hasProp.call(target, insTarget)) continue;
					insValue = target[insTarget];
					this.instruction(insTarget, insValue);
				}
				else {
					if (isFunction$1(value)) value = value.apply();
					node = new XMLProcessingInstruction(this, target, value);
					this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				}
				return this;
			};
			XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
				var node;
				this.openCurrent();
				if (this.documentStarted) throw new Error("declaration() must be the first node.");
				node = new XMLDeclaration(this, version, encoding, standalone);
				this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
				this.openCurrent();
				if (root == null) throw new Error("Missing root node name.");
				if (this.root) throw new Error("dtd() must come before the root node.");
				this.currentNode = new XMLDocType(this, pubID, sysID);
				this.currentNode.rootNodeName = root;
				this.currentNode.children = false;
				this.currentLevel++;
				this.openTags[this.currentLevel] = this.currentNode;
				return this;
			};
			XMLDocumentCB.prototype.dtdElement = function(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDElement(this, name, value);
				this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
				var node;
				this.openCurrent();
				node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
				this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.entity = function(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDEntity(this, false, name, value);
				this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.pEntity = function(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDEntity(this, true, name, value);
				this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.notation = function(name, value) {
				var node;
				this.openCurrent();
				node = new XMLDTDNotation(this, name, value);
				this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
				return this;
			};
			XMLDocumentCB.prototype.up = function() {
				if (this.currentLevel < 0) throw new Error("The document node has no parent.");
				if (this.currentNode) {
					if (this.currentNode.children) this.closeNode(this.currentNode);
					else this.openNode(this.currentNode);
					this.currentNode = null;
				} else this.closeNode(this.openTags[this.currentLevel]);
				delete this.openTags[this.currentLevel];
				this.currentLevel--;
				return this;
			};
			XMLDocumentCB.prototype.end = function() {
				while (this.currentLevel >= 0) this.up();
				return this.onEnd();
			};
			XMLDocumentCB.prototype.openCurrent = function() {
				if (this.currentNode) {
					this.currentNode.children = true;
					return this.openNode(this.currentNode);
				}
			};
			XMLDocumentCB.prototype.openNode = function(node) {
				var att, chunk, name, ref1;
				if (!node.isOpen) {
					if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) this.root = node;
					chunk = "";
					if (node.type === NodeType.Element) {
						this.writerOptions.state = WriterState.OpenTag;
						chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<" + node.name;
						ref1 = node.attribs;
						for (name in ref1) {
							if (!hasProp.call(ref1, name)) continue;
							att = ref1[name];
							chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
						}
						chunk += (node.children ? ">" : "/>") + this.writer.endline(node, this.writerOptions, this.currentLevel);
						this.writerOptions.state = WriterState.InsideTag;
					} else {
						this.writerOptions.state = WriterState.OpenTag;
						chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "<!DOCTYPE " + node.rootNodeName;
						if (node.pubID && node.sysID) chunk += " PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"";
						else if (node.sysID) chunk += " SYSTEM \"" + node.sysID + "\"";
						if (node.children) {
							chunk += " [";
							this.writerOptions.state = WriterState.InsideTag;
						} else {
							this.writerOptions.state = WriterState.CloseTag;
							chunk += ">";
						}
						chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
					}
					this.onData(chunk, this.currentLevel);
					return node.isOpen = true;
				}
			};
			XMLDocumentCB.prototype.closeNode = function(node) {
				var chunk;
				if (!node.isClosed) {
					chunk = "";
					this.writerOptions.state = WriterState.CloseTag;
					if (node.type === NodeType.Element) chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "</" + node.name + ">" + this.writer.endline(node, this.writerOptions, this.currentLevel);
					else chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + "]>" + this.writer.endline(node, this.writerOptions, this.currentLevel);
					this.writerOptions.state = WriterState.None;
					this.onData(chunk, this.currentLevel);
					return node.isClosed = true;
				}
			};
			XMLDocumentCB.prototype.onData = function(chunk, level) {
				this.documentStarted = true;
				return this.onDataCallback(chunk, level + 1);
			};
			XMLDocumentCB.prototype.onEnd = function() {
				this.documentCompleted = true;
				return this.onEndCallback();
			};
			XMLDocumentCB.prototype.debugInfo = function(name) {
				if (name == null) return "";
				else return "node: <" + name + ">";
			};
			XMLDocumentCB.prototype.ele = function() {
				return this.element.apply(this, arguments);
			};
			XMLDocumentCB.prototype.nod = function(name, attributes, text) {
				return this.node(name, attributes, text);
			};
			XMLDocumentCB.prototype.txt = function(value) {
				return this.text(value);
			};
			XMLDocumentCB.prototype.dat = function(value) {
				return this.cdata(value);
			};
			XMLDocumentCB.prototype.com = function(value) {
				return this.comment(value);
			};
			XMLDocumentCB.prototype.ins = function(target, value) {
				return this.instruction(target, value);
			};
			XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
				return this.declaration(version, encoding, standalone);
			};
			XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
				return this.doctype(root, pubID, sysID);
			};
			XMLDocumentCB.prototype.e = function(name, attributes, text) {
				return this.element(name, attributes, text);
			};
			XMLDocumentCB.prototype.n = function(name, attributes, text) {
				return this.node(name, attributes, text);
			};
			XMLDocumentCB.prototype.t = function(value) {
				return this.text(value);
			};
			XMLDocumentCB.prototype.d = function(value) {
				return this.cdata(value);
			};
			XMLDocumentCB.prototype.c = function(value) {
				return this.comment(value);
			};
			XMLDocumentCB.prototype.r = function(value) {
				return this.raw(value);
			};
			XMLDocumentCB.prototype.i = function(target, value) {
				return this.instruction(target, value);
			};
			XMLDocumentCB.prototype.att = function() {
				if (this.currentNode && this.currentNode.type === NodeType.DocType) return this.attList.apply(this, arguments);
				else return this.attribute.apply(this, arguments);
			};
			XMLDocumentCB.prototype.a = function() {
				if (this.currentNode && this.currentNode.type === NodeType.DocType) return this.attList.apply(this, arguments);
				else return this.attribute.apply(this, arguments);
			};
			XMLDocumentCB.prototype.ent = function(name, value) {
				return this.entity(name, value);
			};
			XMLDocumentCB.prototype.pent = function(name, value) {
				return this.pEntity(name, value);
			};
			XMLDocumentCB.prototype.not = function(name, value) {
				return this.notation(name, value);
			};
			return XMLDocumentCB;
		})();
	}).call(exports);
}));
var require_XMLStreamWriter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, XMLWriterBase, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		NodeType = require_NodeType();
		XMLWriterBase = require_XMLWriterBase();
		WriterState = require_WriterState();
		module.exports = (function(superClass) {
			extend(XMLStreamWriter, superClass);
			function XMLStreamWriter(stream, options) {
				this.stream = stream;
				XMLStreamWriter.__super__.constructor.call(this, options);
			}
			XMLStreamWriter.prototype.endline = function(node, options, level) {
				if (node.isLastRootNode && options.state === WriterState.CloseTag) return "";
				else return XMLStreamWriter.__super__.endline.call(this, node, options, level);
			};
			XMLStreamWriter.prototype.document = function(doc, options) {
				var child, i, j, k, len, len1, ref = doc.children, ref1, results;
				for (i = j = 0, len = ref.length; j < len; i = ++j) {
					child = ref[i];
					child.isLastRootNode = i === doc.children.length - 1;
				}
				options = this.filterOptions(options);
				ref1 = doc.children;
				results = [];
				for (k = 0, len1 = ref1.length; k < len1; k++) {
					child = ref1[k];
					results.push(this.writeChildNode(child, options, 0));
				}
				return results;
			};
			XMLStreamWriter.prototype.attribute = function(att, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.attribute.call(this, att, options, level));
			};
			XMLStreamWriter.prototype.cdata = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.cdata.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.comment = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.comment.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.declaration = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.declaration.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.docType = function(node, options, level) {
				var child, j, len, ref;
				level || (level = 0);
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				this.stream.write(this.indent(node, options, level));
				this.stream.write("<!DOCTYPE " + node.root().name);
				if (node.pubID && node.sysID) this.stream.write(" PUBLIC \"" + node.pubID + "\" \"" + node.sysID + "\"");
				else if (node.sysID) this.stream.write(" SYSTEM \"" + node.sysID + "\"");
				if (node.children.length > 0) {
					this.stream.write(" [");
					this.stream.write(this.endline(node, options, level));
					options.state = WriterState.InsideTag;
					ref = node.children;
					for (j = 0, len = ref.length; j < len; j++) {
						child = ref[j];
						this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					this.stream.write("]");
				}
				options.state = WriterState.CloseTag;
				this.stream.write(options.spaceBeforeSlash + ">");
				this.stream.write(this.endline(node, options, level));
				options.state = WriterState.None;
				return this.closeNode(node, options, level);
			};
			XMLStreamWriter.prototype.element = function(node, options, level) {
				var att, child, childNodeCount, firstChildNode, j, len, name, ref, ref1;
				level || (level = 0);
				this.openNode(node, options, level);
				options.state = WriterState.OpenTag;
				this.stream.write(this.indent(node, options, level) + "<" + node.name);
				ref = node.attribs;
				for (name in ref) {
					if (!hasProp.call(ref, name)) continue;
					att = ref[name];
					this.attribute(att, options, level);
				}
				childNodeCount = node.children.length;
				firstChildNode = childNodeCount === 0 ? null : node.children[0];
				if (childNodeCount === 0 || node.children.every(function(e) {
					return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === "";
				})) if (options.allowEmpty) {
					this.stream.write(">");
					options.state = WriterState.CloseTag;
					this.stream.write("</" + node.name + ">");
				} else {
					options.state = WriterState.CloseTag;
					this.stream.write(options.spaceBeforeSlash + "/>");
				}
				else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
					this.stream.write(">");
					options.state = WriterState.InsideTag;
					options.suppressPrettyCount++;
					this.writeChildNode(firstChildNode, options, level + 1);
					options.suppressPrettyCount--;
					options.state = WriterState.CloseTag;
					this.stream.write("</" + node.name + ">");
				} else {
					this.stream.write(">" + this.endline(node, options, level));
					options.state = WriterState.InsideTag;
					ref1 = node.children;
					for (j = 0, len = ref1.length; j < len; j++) {
						child = ref1[j];
						this.writeChildNode(child, options, level + 1);
					}
					options.state = WriterState.CloseTag;
					this.stream.write(this.indent(node, options, level) + "</" + node.name + ">");
				}
				this.stream.write(this.endline(node, options, level));
				options.state = WriterState.None;
				return this.closeNode(node, options, level);
			};
			XMLStreamWriter.prototype.processingInstruction = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.processingInstruction.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.raw = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.raw.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.text = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.text.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.dtdAttList = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.dtdAttList.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.dtdElement = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.dtdElement.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.dtdEntity = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.dtdEntity.call(this, node, options, level));
			};
			XMLStreamWriter.prototype.dtdNotation = function(node, options, level) {
				return this.stream.write(XMLStreamWriter.__super__.dtdNotation.call(this, node, options, level));
			};
			return XMLStreamWriter;
		})(XMLWriterBase);
	}).call(exports);
}));
var require_lib$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function() {
		var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign$1, isFunction$1, ref = require_Utility();
		assign$1 = ref.assign, isFunction$1 = ref.isFunction;
		XMLDOMImplementation = require_XMLDOMImplementation();
		XMLDocument = require_XMLDocument();
		XMLDocumentCB = require_XMLDocumentCB();
		XMLStringWriter = require_XMLStringWriter();
		XMLStreamWriter = require_XMLStreamWriter();
		NodeType = require_NodeType();
		WriterState = require_WriterState();
		module.exports.create = function(name, xmldec, doctype, options) {
			var doc, root;
			if (name == null) throw new Error("Root element needs a name.");
			options = assign$1({}, xmldec, doctype, options);
			doc = new XMLDocument(options);
			root = doc.element(name);
			if (!options.headless) {
				doc.declaration(options);
				if (options.pubID != null || options.sysID != null) doc.dtd(options);
			}
			return root;
		};
		module.exports.begin = function(options, onData, onEnd) {
			var ref1;
			if (isFunction$1(options)) {
				ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
				options = {};
			}
			if (onData) return new XMLDocumentCB(options, onData, onEnd);
			else return new XMLDocument(options);
		};
		module.exports.stringWriter = function(options) {
			return new XMLStringWriter(options);
		};
		module.exports.streamWriter = function(stream, options) {
			return new XMLStreamWriter(stream, options);
		};
		module.exports.implementation = new XMLDOMImplementation();
		module.exports.nodeType = NodeType;
		module.exports.writerState = WriterState;
	}).call(exports);
}));
var require_builder = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA, hasProp = {}.hasOwnProperty;
		builder = require_lib$1();
		defaults = require_defaults().defaults;
		requiresCDATA = function(entry) {
			return typeof entry === "string" && (entry.indexOf("&") >= 0 || entry.indexOf(">") >= 0 || entry.indexOf("<") >= 0);
		};
		wrapCDATA = function(entry) {
			return "<![CDATA[" + escapeCDATA(entry) + "]]>";
		};
		escapeCDATA = function(entry) {
			return entry.replace("]]>", "]]]]><![CDATA[>");
		};
		exports.Builder = (function() {
			function Builder(opts) {
				var key$1, ref, value;
				this.options = {};
				ref = defaults["0.2"];
				for (key$1 in ref) {
					if (!hasProp.call(ref, key$1)) continue;
					value = ref[key$1];
					this.options[key$1] = value;
				}
				for (key$1 in opts) {
					if (!hasProp.call(opts, key$1)) continue;
					value = opts[key$1];
					this.options[key$1] = value;
				}
			}
			Builder.prototype.buildObject = function(rootObj) {
				var attrkey = this.options.attrkey, charkey = this.options.charkey, render, rootElement, rootName;
				if (Object.keys(rootObj).length === 1 && this.options.rootName === defaults["0.2"].rootName) {
					rootName = Object.keys(rootObj)[0];
					rootObj = rootObj[rootName];
				} else rootName = this.options.rootName;
				render = (function(_this) {
					return function(element, obj) {
						var attr, child, entry, index, key$1, value;
						if (typeof obj !== "object") if (_this.options.cdata && requiresCDATA(obj)) element.raw(wrapCDATA(obj));
						else element.txt(obj);
						else if (Array.isArray(obj)) for (index in obj) {
							if (!hasProp.call(obj, index)) continue;
							child = obj[index];
							for (key$1 in child) {
								entry = child[key$1];
								element = render(element.ele(key$1), entry).up();
							}
						}
						else for (key$1 in obj) {
							if (!hasProp.call(obj, key$1)) continue;
							child = obj[key$1];
							if (key$1 === attrkey) {
								if (typeof child === "object") for (attr in child) {
									value = child[attr];
									element = element.att(attr, value);
								}
							} else if (key$1 === charkey) if (_this.options.cdata && requiresCDATA(child)) element = element.raw(wrapCDATA(child));
							else element = element.txt(child);
							else if (Array.isArray(child)) for (index in child) {
								if (!hasProp.call(child, index)) continue;
								entry = child[index];
								if (typeof entry === "string") if (_this.options.cdata && requiresCDATA(entry)) element = element.ele(key$1).raw(wrapCDATA(entry)).up();
								else element = element.ele(key$1, entry).up();
								else element = render(element.ele(key$1), entry).up();
							}
							else if (typeof child === "object") element = render(element.ele(key$1), child).up();
							else if (typeof child === "string" && _this.options.cdata && requiresCDATA(child)) element = element.ele(key$1).raw(wrapCDATA(child)).up();
							else {
								if (child == null) child = "";
								element = element.ele(key$1, child.toString()).up();
							}
						}
						return element;
					};
				})(this);
				rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
					headless: this.options.headless,
					allowSurrogateChars: this.options.allowSurrogateChars
				});
				return render(rootElement, rootObj).end(this.options.renderOpts);
			};
			return Builder;
		})();
	}).call(exports);
}));
var require_bom = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		exports.stripBOM = function(str) {
			if (str[0] === "﻿") return str.substring(1);
			else return str;
		};
	}).call(exports);
}));
var require_processors = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		var prefixMatch = /* @__PURE__ */ new RegExp(/(?!xmlns)^.*:/);
		exports.normalize = function(str) {
			return str.toLowerCase();
		};
		exports.firstCharLowerCase = function(str) {
			return str.charAt(0).toLowerCase() + str.slice(1);
		};
		exports.stripPrefix = function(str) {
			return str.replace(prefixMatch, "");
		};
		exports.parseNumbers = function(str) {
			if (!isNaN(str)) str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
			return str;
		};
		exports.parseBooleans = function(str) {
			if (/^(?:true|false)$/i.test(str)) str = str.toLowerCase() === "true";
			return str;
		};
	}).call(exports);
}));
var require_parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		var bom, defaults, defineProperty$2, events, isEmpty, processItem, processors, sax, setImmediate$1, bind$5 = function(fn$1, me) {
			return function() {
				return fn$1.apply(me, arguments);
			};
		}, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		sax = require_sax();
		events = __require("events");
		bom = require_bom();
		processors = require_processors();
		setImmediate$1 = __require("timers").setImmediate;
		defaults = require_defaults().defaults;
		isEmpty = function(thing) {
			return typeof thing === "object" && thing != null && Object.keys(thing).length === 0;
		};
		processItem = function(processors$1, item, key$1) {
			var i, len, process$1;
			for (i = 0, len = processors$1.length; i < len; i++) {
				process$1 = processors$1[i];
				item = process$1(item, key$1);
			}
			return item;
		};
		defineProperty$2 = function(obj, key$1, value) {
			var descriptor = Object.create(null);
			descriptor.value = value;
			descriptor.writable = true;
			descriptor.enumerable = true;
			descriptor.configurable = true;
			return Object.defineProperty(obj, key$1, descriptor);
		};
		exports.Parser = (function(superClass) {
			extend(Parser, superClass);
			function Parser(opts) {
				this.parseStringPromise = bind$5(this.parseStringPromise, this);
				this.parseString = bind$5(this.parseString, this);
				this.reset = bind$5(this.reset, this);
				this.assignOrPush = bind$5(this.assignOrPush, this);
				this.processAsync = bind$5(this.processAsync, this);
				var key$1, ref, value;
				if (!(this instanceof exports.Parser)) return new exports.Parser(opts);
				this.options = {};
				ref = defaults["0.2"];
				for (key$1 in ref) {
					if (!hasProp.call(ref, key$1)) continue;
					value = ref[key$1];
					this.options[key$1] = value;
				}
				for (key$1 in opts) {
					if (!hasProp.call(opts, key$1)) continue;
					value = opts[key$1];
					this.options[key$1] = value;
				}
				if (this.options.xmlns) this.options.xmlnskey = this.options.attrkey + "ns";
				if (this.options.normalizeTags) {
					if (!this.options.tagNameProcessors) this.options.tagNameProcessors = [];
					this.options.tagNameProcessors.unshift(processors.normalize);
				}
				this.reset();
			}
			Parser.prototype.processAsync = function() {
				var chunk, err;
				try {
					if (this.remaining.length <= this.options.chunkSize) {
						chunk = this.remaining;
						this.remaining = "";
						this.saxParser = this.saxParser.write(chunk);
						return this.saxParser.close();
					} else {
						chunk = this.remaining.substr(0, this.options.chunkSize);
						this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
						this.saxParser = this.saxParser.write(chunk);
						return setImmediate$1(this.processAsync);
					}
				} catch (error1) {
					err = error1;
					if (!this.saxParser.errThrown) {
						this.saxParser.errThrown = true;
						return this.emit(err);
					}
				}
			};
			Parser.prototype.assignOrPush = function(obj, key$1, newValue) {
				if (!(key$1 in obj)) if (!this.options.explicitArray) return defineProperty$2(obj, key$1, newValue);
				else return defineProperty$2(obj, key$1, [newValue]);
				else {
					if (!(obj[key$1] instanceof Array)) defineProperty$2(obj, key$1, [obj[key$1]]);
					return obj[key$1].push(newValue);
				}
			};
			Parser.prototype.reset = function() {
				var attrkey, charkey, ontext, stack;
				this.removeAllListeners();
				this.saxParser = sax.parser(this.options.strict, {
					trim: false,
					normalize: false,
					xmlns: this.options.xmlns
				});
				this.saxParser.errThrown = false;
				this.saxParser.onerror = (function(_this) {
					return function(error) {
						_this.saxParser.resume();
						if (!_this.saxParser.errThrown) {
							_this.saxParser.errThrown = true;
							return _this.emit("error", error);
						}
					};
				})(this);
				this.saxParser.onend = (function(_this) {
					return function() {
						if (!_this.saxParser.ended) {
							_this.saxParser.ended = true;
							return _this.emit("end", _this.resultObject);
						}
					};
				})(this);
				this.saxParser.ended = false;
				this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
				this.resultObject = null;
				stack = [];
				attrkey = this.options.attrkey;
				charkey = this.options.charkey;
				this.saxParser.onopentag = (function(_this) {
					return function(node) {
						var key$1, newValue, obj = {}, processedKey, ref;
						obj[charkey] = "";
						if (!_this.options.ignoreAttrs) {
							ref = node.attributes;
							for (key$1 in ref) {
								if (!hasProp.call(ref, key$1)) continue;
								if (!(attrkey in obj) && !_this.options.mergeAttrs) obj[attrkey] = {};
								newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key$1], key$1) : node.attributes[key$1];
								processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key$1) : key$1;
								if (_this.options.mergeAttrs) _this.assignOrPush(obj, processedKey, newValue);
								else defineProperty$2(obj[attrkey], processedKey, newValue);
							}
						}
						obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
						if (_this.options.xmlns) obj[_this.options.xmlnskey] = {
							uri: node.uri,
							local: node.local
						};
						return stack.push(obj);
					};
				})(this);
				this.saxParser.onclosetag = (function(_this) {
					return function() {
						var cdata, emptyStr, key$1, node, nodeName, obj = stack.pop(), objClone, old, s, xpath;
						nodeName = obj["#name"];
						if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) delete obj["#name"];
						if (obj.cdata === true) {
							cdata = obj.cdata;
							delete obj.cdata;
						}
						s = stack[stack.length - 1];
						if (obj[charkey].match(/^\s*$/) && !cdata) {
							emptyStr = obj[charkey];
							delete obj[charkey];
						} else {
							if (_this.options.trim) obj[charkey] = obj[charkey].trim();
							if (_this.options.normalize) obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
							obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
							if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) obj = obj[charkey];
						}
						if (isEmpty(obj)) if (typeof _this.options.emptyTag === "function") obj = _this.options.emptyTag();
						else obj = _this.options.emptyTag !== "" ? _this.options.emptyTag : emptyStr;
						if (_this.options.validator != null) {
							xpath = "/" + (function() {
								var i, len, results = [];
								for (i = 0, len = stack.length; i < len; i++) {
									node = stack[i];
									results.push(node["#name"]);
								}
								return results;
							})().concat(nodeName).join("/");
							(function() {
								var err;
								try {
									return obj = _this.options.validator(xpath, s && s[nodeName], obj);
								} catch (error1) {
									err = error1;
									return _this.emit("error", err);
								}
							})();
						}
						if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === "object") {
							if (!_this.options.preserveChildrenOrder) {
								node = {};
								if (_this.options.attrkey in obj) {
									node[_this.options.attrkey] = obj[_this.options.attrkey];
									delete obj[_this.options.attrkey];
								}
								if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
									node[_this.options.charkey] = obj[_this.options.charkey];
									delete obj[_this.options.charkey];
								}
								if (Object.getOwnPropertyNames(obj).length > 0) node[_this.options.childkey] = obj;
								obj = node;
							} else if (s) {
								s[_this.options.childkey] = s[_this.options.childkey] || [];
								objClone = {};
								for (key$1 in obj) {
									if (!hasProp.call(obj, key$1)) continue;
									defineProperty$2(objClone, key$1, obj[key$1]);
								}
								s[_this.options.childkey].push(objClone);
								delete obj["#name"];
								if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) obj = obj[charkey];
							}
						}
						if (stack.length > 0) return _this.assignOrPush(s, nodeName, obj);
						else {
							if (_this.options.explicitRoot) {
								old = obj;
								obj = {};
								defineProperty$2(obj, nodeName, old);
							}
							_this.resultObject = obj;
							_this.saxParser.ended = true;
							return _this.emit("end", _this.resultObject);
						}
					};
				})(this);
				ontext = (function(_this) {
					return function(text) {
						var charChild, s = stack[stack.length - 1];
						if (s) {
							s[charkey] += text;
							if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, "").trim() !== "")) {
								s[_this.options.childkey] = s[_this.options.childkey] || [];
								charChild = { "#name": "__text__" };
								charChild[charkey] = text;
								if (_this.options.normalize) charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
								s[_this.options.childkey].push(charChild);
							}
							return s;
						}
					};
				})(this);
				this.saxParser.ontext = ontext;
				return this.saxParser.oncdata = (function(_this) {
					return function(text) {
						var s = ontext(text);
						if (s) return s.cdata = true;
					};
				})(this);
			};
			Parser.prototype.parseString = function(str, cb) {
				var err;
				if (cb != null && typeof cb === "function") {
					this.on("end", function(result) {
						this.reset();
						return cb(null, result);
					});
					this.on("error", function(err$1) {
						this.reset();
						return cb(err$1);
					});
				}
				try {
					str = str.toString();
					if (str.trim() === "") {
						this.emit("end", null);
						return true;
					}
					str = bom.stripBOM(str);
					if (this.options.async) {
						this.remaining = str;
						setImmediate$1(this.processAsync);
						return this.saxParser;
					}
					return this.saxParser.write(str).close();
				} catch (error1) {
					err = error1;
					if (!(this.saxParser.errThrown || this.saxParser.ended)) {
						this.emit("error", err);
						return this.saxParser.errThrown = true;
					} else if (this.saxParser.ended) throw err;
				}
			};
			Parser.prototype.parseStringPromise = function(str) {
				return new Promise((function(_this) {
					return function(resolve, reject) {
						return _this.parseString(str, function(err, value) {
							if (err) return reject(err);
							else return resolve(value);
						});
					};
				})(this));
			};
			return Parser;
		})(events);
		exports.parseString = function(str, a, b) {
			var cb, options, parser;
			if (b != null) {
				if (typeof b === "function") cb = b;
				if (typeof a === "object") options = a;
			} else {
				if (typeof a === "function") cb = a;
				options = {};
			}
			parser = new exports.Parser(options);
			return parser.parseString(str, cb);
		};
		exports.parseStringPromise = function(str, a) {
			var options, parser;
			if (typeof a === "object") options = a;
			parser = new exports.Parser(options);
			return parser.parseStringPromise(str);
		};
	}).call(exports);
}));
var require_xml2js = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		var builder, defaults, parser, processors, extend = function(child, parent) {
			for (var key$1 in parent) if (hasProp.call(parent, key$1)) child[key$1] = parent[key$1];
			function ctor() {
				this.constructor = child;
			}
			ctor.prototype = parent.prototype;
			child.prototype = new ctor();
			child.__super__ = parent.prototype;
			return child;
		}, hasProp = {}.hasOwnProperty;
		defaults = require_defaults();
		builder = require_builder();
		parser = require_parser();
		processors = require_processors();
		exports.defaults = defaults.defaults;
		exports.processors = processors;
		exports.ValidationError = (function(superClass) {
			extend(ValidationError, superClass);
			function ValidationError(message$2) {
				this.message = message$2;
			}
			return ValidationError;
		})(Error);
		exports.Builder = builder.Builder;
		exports.Parser = parser.Parser;
		exports.parseString = parser.parseString;
		exports.parseStringPromise = parser.parseStringPromise;
	}).call(exports);
}));
var require_proxy_interface = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EventEmitter$6 = __require("events");
	var { isInterfaceNameValid, isMemberNameValid } = require_validators();
	var ProxyListener = class {
		constructor(signal$4, iface$1) {
			this.refcount = 0;
			this.fn = (msg) => {
				const { body, signature, sender } = msg;
				if (iface$1.$object.bus._nameOwners[iface$1.$object.name] !== sender) return;
				if (signature !== signal$4.signature) {
					console.error(`warning: got signature ${signature} for signal ${msg.interface}.${signal$4.name} (expected ${signal$4.signature})`);
					return;
				}
				iface$1.emit.apply(iface$1, [signal$4.name].concat(body));
			};
		}
	};
	module.exports = class ProxyInterface$1 extends EventEmitter$6 {
		constructor(name, object) {
			super();
			this.$name = name;
			this.$object = object;
			this.$properties = [];
			this.$methods = [];
			this.$signals = [];
			this.$listeners = {};
			const getEventDetails = (eventName) => {
				const signal$4 = this.$signals.find((s) => s.name === eventName);
				if (!signal$4) return [null, null];
				const detailedEvent = JSON.stringify({
					path: this.$object.path,
					interface: this.$name,
					member: eventName
				});
				return [signal$4, detailedEvent];
			};
			this.on("removeListener", (eventName, listener) => {
				const [signal$4, detailedEvent] = getEventDetails(eventName);
				if (!signal$4) return;
				const proxyListener = this._getEventListener(signal$4);
				if (proxyListener.refcount <= 0) return;
				proxyListener.refcount -= 1;
				if (proxyListener.refcount > 0) return;
				this.$object.bus._removeMatch(this._signalMatchRuleString(eventName)).catch((error) => {
					this.$object.bus.emit("error", error);
				});
				this.$object.bus._signals.removeListener(detailedEvent, proxyListener.fn);
			});
			this.on("newListener", (eventName, listener) => {
				const [signal$4, detailedEvent] = getEventDetails(eventName);
				if (!signal$4) return;
				const proxyListener = this._getEventListener(signal$4);
				if (proxyListener.refcount > 0) {
					proxyListener.refcount += 1;
					return;
				}
				proxyListener.refcount = 1;
				this.$object.bus._addMatch(this._signalMatchRuleString(eventName)).catch((error) => {
					this.$object.bus.emit("error", error);
				});
				this.$object.bus._signals.on(detailedEvent, proxyListener.fn);
			});
		}
		_signalMatchRuleString(eventName) {
			return `type='signal',sender='${this.$object.name}',interface='${this.$name}',path='${this.$object.path}',member='${eventName}'`;
		}
		_getEventListener(signal$4) {
			if (this.$listeners[signal$4.name]) return this.$listeners[signal$4.name];
			this.$listeners[signal$4.name] = new ProxyListener(signal$4, this);
			return this.$listeners[signal$4.name];
		}
		static _fromXml(object, xml) {
			if (!("$" in xml) || !isInterfaceNameValid(xml.$.name)) return null;
			const name = xml.$.name;
			const iface$1 = new ProxyInterface$1(name, object);
			if (Array.isArray(xml.property)) {
				for (const p of xml.property) if ("$" in p) iface$1.$properties.push(p.$);
			}
			if (Array.isArray(xml.signal)) for (const s of xml.signal) {
				if (!("$" in s) || !isMemberNameValid(s.$.name)) continue;
				const signal$4 = {
					name: s.$.name,
					signature: ""
				};
				if (Array.isArray(s.arg)) {
					for (const a of s.arg) if ("$" in a && "type" in a.$) signal$4.signature += a.$.type;
				}
				iface$1.$signals.push(signal$4);
			}
			if (Array.isArray(xml.method)) for (const m$1 of xml.method) {
				if (!("$" in m$1) || !isMemberNameValid(m$1.$.name)) continue;
				const method$5 = {
					name: m$1.$.name,
					inSignature: "",
					outSignature: ""
				};
				if (Array.isArray(m$1.arg)) for (const a of m$1.arg) {
					if (!("$" in a) || typeof a.$.type !== "string") continue;
					const arg = a.$;
					if (arg.direction === "in") method$5.inSignature += arg.type;
					else if (arg.direction === "out") method$5.outSignature += arg.type;
				}
				iface$1.$methods.push(method$5);
				iface$1[method$5.name] = function(...args) {
					const objArgs = [
						name,
						method$5.name,
						method$5.inSignature,
						method$5.outSignature
					].concat(args);
					return object._callMethod.apply(object, objArgs);
				};
			}
			return iface$1;
		}
	};
}));
var require_proxy_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var xml2js$1 = require_xml2js();
	var { parseSignature: parseSignature$4 } = require_signature();
	var ProxyInterface = require_proxy_interface();
	var { Message: Message$3 } = require_message_type();
	var { assertBusNameValid: assertBusNameValid$1, assertObjectPathValid: assertObjectPathValid$1, isObjectPathValid } = require_validators();
	var ProxyObject$1 = class {
		constructor(bus, name, path$3) {
			assertBusNameValid$1(name);
			assertObjectPathValid$1(path$3);
			this.bus = bus;
			this.name = name;
			this.path = path$3;
			this.nodes = [];
			this.interfaces = {};
			this._parser = new xml2js$1.Parser();
		}
		getInterface(name) {
			if (!Object.keys(this.interfaces).includes(name)) throw new Error(`interface not found in proxy object: ${name}`);
			return this.interfaces[name];
		}
		_initXml(xml) {
			const root = xml.node;
			if (Array.isArray(root.node)) for (const n of root.node) {
				if (!("$" in n)) continue;
				const name = n.$.name;
				const path$3 = `${this.path}/${name}`;
				if (isObjectPathValid(path$3)) this.nodes.push(path$3);
			}
			if (Array.isArray(root.interface)) for (const i of root.interface) {
				const iface$1 = ProxyInterface._fromXml(this, i);
				if (iface$1 !== null) this.interfaces[iface$1.$name] = iface$1;
			}
		}
		_init(xml) {
			return new Promise((resolve, reject) => {
				if (xml) this._parser.parseString(xml, (err, data) => {
					if (err) return reject(err);
					this._initXml(data);
					const nameOwnerMessage = new Message$3({
						destination: "org.freedesktop.DBus",
						path: "/org/freedesktop/DBus",
						interface: "org.freedesktop.DBus",
						member: "GetNameOwner",
						signature: "s",
						body: [this.name]
					});
					this.bus.call(nameOwnerMessage).then((msg) => {
						this.bus._nameOwners[this.name] = msg.body[0];
						resolve(this);
					}).catch((err$1) => {
						if (err$1.type === "org.freedesktop.DBus.Error.NameHasNoOwner") return resolve(this);
						return reject(err$1);
					});
				});
				else {
					const introspectMessage = new Message$3({
						destination: this.name,
						path: this.path,
						interface: "org.freedesktop.DBus.Introspectable",
						member: "Introspect",
						signature: "",
						body: []
					});
					this.bus.call(introspectMessage).then((msg) => {
						const xml$1 = msg.body[0];
						this._parser.parseString(xml$1, (err, data) => {
							if (err) return reject(err);
							this._initXml(data);
							resolve(this);
						});
					}).catch((err) => {
						return reject(err);
					});
				}
			});
		}
		_callMethod(iface$1, member, inSignature, outSignature, ...args) {
			return new Promise((resolve, reject) => {
				args = args || [];
				const methodCallMessage = new Message$3({
					destination: this.name,
					interface: iface$1,
					path: this.path,
					member,
					signature: inSignature,
					body: args
				});
				this.bus.call(methodCallMessage).then((msg) => {
					const outSignatureTree = parseSignature$4(outSignature);
					if (outSignatureTree.length === 0) {
						resolve(null);
						return;
					}
					if (outSignatureTree.length === 1) resolve(msg.body[0]);
					else resolve(msg.body);
				}).catch((err) => {
					return reject(err);
				});
			});
		}
	};
	module.exports = ProxyObject$1;
}));
var require_bus = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EventEmitter$5 = __require("events").EventEmitter;
	var constants$7 = require_constants$1();
	var handleMethod = require_handlers();
	var { DBusError: DBusError$1 } = require_errors();
	var { Message: Message$2 } = require_message_type();
	var ServiceObject = require_object$1();
	var xml2js = require_xml2js();
	var { METHOD_CALL, METHOD_RETURN, ERROR, SIGNAL } = constants$7.MessageType;
	var { NO_REPLY_EXPECTED } = constants$7.MessageFlag;
	var { assertBusNameValid, assertObjectPathValid } = require_validators();
	var ProxyObject = require_proxy_object();
	var xmlHeader = "<!DOCTYPE node PUBLIC \"-//freedesktop//DTD D-BUS Object Introspection 1.0//EN\" \"http://www.freedesktop.org/standards/dbus/1.0/introspect.dtd\">\n";
	var nameOwnerMatchRule = "type='signal',sender='org.freedesktop.DBus',interface='org.freedesktop.DBus',path='/org/freedesktop/DBus',member='NameOwnerChanged'";
	var MessageBus$1 = class extends EventEmitter$5 {
		constructor(conn) {
			super();
			this._builder = new xml2js.Builder({ headless: true });
			this._connection = conn;
			this._serial = 1;
			this._methodReturnHandlers = {};
			this._signals = new EventEmitter$5();
			this._nameOwners = {};
			this._methodHandlers = [];
			this._serviceObjects = {};
			this._isHighLevelClientInitialized = false;
			this._matchRules = {};
			this.name = null;
			const handleMessage$1 = (msg) => {
				if (this.name && msg.destination) {
					if (msg.destination[0] === ":" && msg.destination !== this.name) return;
					if (this._nameOwners[msg.destination] && this._nameOwners[msg.destination] !== this.name) return;
				}
				if (msg.type === METHOD_RETURN || msg.type === ERROR) {
					const handler = this._methodReturnHandlers[msg.replySerial];
					if (handler) {
						delete this._methodReturnHandlers[msg.replySerial];
						handler(msg);
					}
				} else if (msg.type === SIGNAL) {
					const { sender, path: path$3, interface: iface$1, member } = msg;
					if (sender === "org.freedesktop.DBus" && path$3 === "/org/freedesktop/DBus" && iface$1 === "org.freedesktop.DBus" && member === "NameOwnerChanged") {
						const name = msg.body[0];
						const newOwner = msg.body[2];
						if (!name.startsWith(":")) this._nameOwners[name] = newOwner;
					}
					const mangled = JSON.stringify({
						path: msg.path,
						interface: msg.interface,
						member: msg.member
					});
					this._signals.emit(mangled, msg);
				} else {
					let handled = false;
					for (const handler of this._methodHandlers) {
						handled = handler(msg);
						if (handled) break;
					}
					if (!handled) handled = handleMethod(msg, this);
					if (!handled) this.send(Message$2.newError(msg, "org.freedesktop.DBus.Error.UnknownMethod", `Method '${msg.member}' on interface '${msg.interface || "(none)"}' does not exist`));
				}
			};
			conn.on("message", (msg) => {
				try {
					this.emit("message", msg);
					handleMessage$1(msg);
				} catch (e) {
					this.send(Message$2.newError(msg, "com.github.dbus_next.Error", `The DBus library encountered an error.\n${e.stack}`));
				}
			});
			conn.on("error", (err) => {
				this.emit("error", err);
			});
			const helloMessage = new Message$2({
				path: "/org/freedesktop/DBus",
				destination: "org.freedesktop.DBus",
				interface: "org.freedesktop.DBus",
				member: "Hello"
			});
			this.call(helloMessage).then((msg) => {
				this.name = msg.body[0];
				this.emit("connect");
			}).catch((err) => {
				this.emit("error", err);
			});
		}
		async getProxyObject(name, path$3, xml) {
			const objInitPromise = new ProxyObject(this, name, path$3)._init(xml);
			await this._initHighLevelClient();
			return objInitPromise;
		}
		requestName(name, flags$1) {
			flags$1 = flags$1 || 0;
			return new Promise((resolve, reject) => {
				assertBusNameValid(name);
				const requestNameMessage = new Message$2({
					path: "/org/freedesktop/DBus",
					destination: "org.freedesktop.DBus",
					interface: "org.freedesktop.DBus",
					member: "RequestName",
					signature: "su",
					body: [name, flags$1]
				});
				this.call(requestNameMessage).then((msg) => {
					return resolve(msg.body[0]);
				}).catch((err) => {
					return reject(err);
				});
			});
		}
		releaseName(name) {
			return new Promise((resolve, reject) => {
				const msg = new Message$2({
					path: "/org/freedesktop/DBus",
					destination: "org.freedesktop.DBus",
					interface: "org.freedesktop.DBus",
					member: "ReleaseName",
					signature: "s",
					body: [name]
				});
				this.call(msg).then((reply) => {
					return resolve(reply.body[0]);
				}).catch((err) => {
					return reject(err);
				});
			});
		}
		disconnect() {
			this._connection.stream.end();
			this._signals.removeAllListeners();
		}
		newSerial() {
			return this._serial++;
		}
		addMethodHandler(fn$1) {
			this._methodHandlers.push(fn$1);
		}
		removeMethodHandler(fn$1) {
			for (let i = 0; i < this._methodHandlers.length; ++i) if (this._methodHandlers[i] === fn$1) this._methodHandlers.splice(i, 1);
		}
		call(msg) {
			return new Promise((resolve, reject) => {
				if (!(msg instanceof Message$2)) throw new Error("The call() method takes a Message class as the first argument.");
				if (msg.type !== METHOD_CALL) throw new Error("Only messages of type METHOD_CALL can expect a call reply.");
				if (msg.serial === null || msg._sent) msg.serial = this.newSerial();
				msg._sent = true;
				if (msg.flags & NO_REPLY_EXPECTED) resolve(null);
				else this._methodReturnHandlers[msg.serial] = (reply) => {
					this._nameOwners[msg.destination] = reply.sender;
					if (reply.type === ERROR) return reject(new DBusError$1(reply.errorName, reply.body[0], reply));
					else return resolve(reply);
				};
				this._connection.message(msg);
			});
		}
		send(msg) {
			if (!(msg instanceof Message$2)) throw new Error("The send() method takes a Message class as the first argument.");
			if (msg.serial === null || msg._sent) msg.serial = this.newSerial();
			this._connection.message(msg);
		}
		export(path$3, iface$1) {
			this._getServiceObject(path$3).addInterface(iface$1);
		}
		unexport(path$3, iface$1) {
			iface$1 = iface$1 || null;
			if (iface$1 === null) this._removeServiceObject(path$3);
			else {
				const obj = this._getServiceObject(path$3);
				obj.removeInterface(iface$1);
				if (!obj.interfaces.length) this._removeServiceObject(path$3);
			}
		}
		async _initHighLevelClient() {
			if (this._isHighLevelClientInitialized) return;
			try {
				await this._addMatch(nameOwnerMatchRule);
			} catch (error) {
				this.emit("error", error);
				return;
			}
			this._isHighLevelClientInitialized = true;
		}
		_introspect(path$3) {
			assertObjectPathValid(path$3);
			const xml = { node: { node: [] } };
			if (this._serviceObjects[path$3]) xml.node.interface = this._serviceObjects[path$3].introspect();
			const pathSplit = path$3.split("/").filter((n) => n);
			const children$1 = /* @__PURE__ */ new Set();
			for (const key$1 of Object.keys(this._serviceObjects)) {
				const keySplit = key$1.split("/").filter((n) => n);
				if (keySplit.length <= pathSplit.length) continue;
				if (pathSplit.every((v, i) => v === keySplit[i])) children$1.add(keySplit[pathSplit.length]);
			}
			for (const child of children$1) xml.node.node.push({ $: { name: child } });
			return xmlHeader + this._builder.buildObject(xml);
		}
		_getServiceObject(path$3) {
			assertObjectPathValid(path$3);
			if (!this._serviceObjects[path$3]) this._serviceObjects[path$3] = new ServiceObject(path$3, this);
			return this._serviceObjects[path$3];
		}
		_removeServiceObject(path$3) {
			assertObjectPathValid(path$3);
			if (this._serviceObjects[path$3]) {
				const obj = this._serviceObjects[path$3];
				for (const i of Object.keys(obj.interfaces)) obj.removeInterface(obj.interfaces[i]);
				delete this._serviceObjects[path$3];
			}
		}
		_addMatch(match$1) {
			if (Object.prototype.hasOwnProperty.call(this._matchRules, match$1)) {
				this._matchRules[match$1] += 1;
				return Promise.resolve();
			}
			this._matchRules[match$1] = 1;
			const msg = new Message$2({
				path: "/org/freedesktop/DBus",
				destination: "org.freedesktop.DBus",
				interface: "org.freedesktop.DBus",
				member: "AddMatch",
				signature: "s",
				body: [match$1]
			});
			return this.call(msg);
		}
		_removeMatch(match$1) {
			if (!this._connection.stream.writable) return Promise.resolve();
			if (Object.prototype.hasOwnProperty.call(this._matchRules, match$1)) {
				this._matchRules[match$1] -= 1;
				if (this._matchRules[match$1] > 0) return Promise.resolve();
			} else return Promise.resolve();
			delete this._matchRules[match$1];
			const msg = new Message$2({
				path: "/org/freedesktop/DBus",
				destination: "org.freedesktop.DBus",
				interface: "org.freedesktop.DBus",
				member: "RemoveMatch",
				signature: "s",
				body: [match$1]
			});
			return this.call(msg);
		}
	};
	module.exports = MessageBus$1;
}));
var require_safe_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	var buffer = __require("buffer");
	var Buffer$9 = buffer.Buffer;
	function copyProps(src, dst) {
		for (var key$1 in src) dst[key$1] = src[key$1];
	}
	if (Buffer$9.from && Buffer$9.alloc && Buffer$9.allocUnsafe && Buffer$9.allocUnsafeSlow) module.exports = buffer;
	else {
		copyProps(buffer, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer$9(arg, encodingOrOffset, length);
	}
	SafeBuffer.prototype = Object.create(Buffer$9.prototype);
	copyProps(Buffer$9, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer$9(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer$9(size);
		if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
		else buf.fill(fill);
		else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer$9(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer.SlowBuffer(size);
	};
}));
var require_put = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Put;
	function Put() {
		if (!(this instanceof Put)) return new Put();
		var words = [];
		var len = 0;
		this.put = function(buf) {
			words.push({ buffer: buf });
			len += buf.length;
			return this;
		};
		this.word8 = function(x) {
			words.push({
				bytes: 1,
				value: x
			});
			len += 1;
			return this;
		};
		this.floatle = function(x) {
			words.push({
				bytes: "float",
				endian: "little",
				value: x
			});
			len += 4;
			return this;
		};
		[
			8,
			16,
			24,
			32,
			64
		].forEach((function(bits) {
			this["word" + bits + "be"] = function(x) {
				words.push({
					endian: "big",
					bytes: bits / 8,
					value: x
				});
				len += bits / 8;
				return this;
			};
			this["word" + bits + "le"] = function(x) {
				words.push({
					endian: "little",
					bytes: bits / 8,
					value: x
				});
				len += bits / 8;
				return this;
			};
		}).bind(this));
		this.pad = function(bytes) {
			words.push({
				endian: "big",
				bytes,
				value: 0
			});
			len += bytes;
			return this;
		};
		this.length = function() {
			return len;
		};
		this.buffer = function() {
			var buf = Buffer.alloc(len);
			var offset = 0;
			words.forEach(function(word) {
				if (word.buffer) {
					word.buffer.copy(buf, offset, 0);
					offset += word.buffer.length;
				} else if (word.bytes == "float") {
					var v = Math.abs(word.value);
					var s = (word.value >= 0) * 1;
					var e = Math.ceil(Math.log(v) / Math.LN2);
					var f = v / (1 << e);
					console.dir([
						s,
						e,
						f
					]);
					console.log(word.value);
					buf[offset++] = s << 7 & ~~(e / 2);
					buf[offset++] = (e & 1) << 7 & ~~(f / 65536);
					buf[offset++] = 0;
					buf[offset++] = 0;
					offset += 4;
				} else {
					var big = word.endian === "big";
					var ix = big ? [(word.bytes - 1) * 8, -8] : [0, 8];
					for (var i = ix[0]; big ? i >= 0 : i < word.bytes * 8; i += ix[1]) if (i >= 32) buf[offset++] = Math.floor(word.value / Math.pow(2, i)) & 255;
					else buf[offset++] = word.value >> i & 255;
				}
			});
			return buf;
		};
		this.write = function(stream) {
			stream.write(this.buffer());
		};
	}
}));
var require_align = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Buffer$8 = require_safe_buffer().Buffer;
	function align$2(ps, n) {
		const pad = n - ps._offset % n;
		if (pad === 0 || pad === n) return;
		const padBuff = Buffer$8.alloc(pad);
		ps.put(Buffer$8.from(padBuff));
		ps._offset += pad;
	}
	exports.align = align$2;
}));
var require_long = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Long$2;
	var wasm = null;
	try {
		wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
			0,
			97,
			115,
			109,
			1,
			0,
			0,
			0,
			1,
			13,
			2,
			96,
			0,
			1,
			127,
			96,
			4,
			127,
			127,
			127,
			127,
			1,
			127,
			3,
			7,
			6,
			0,
			1,
			1,
			1,
			1,
			1,
			6,
			6,
			1,
			127,
			1,
			65,
			0,
			11,
			7,
			50,
			6,
			3,
			109,
			117,
			108,
			0,
			1,
			5,
			100,
			105,
			118,
			95,
			115,
			0,
			2,
			5,
			100,
			105,
			118,
			95,
			117,
			0,
			3,
			5,
			114,
			101,
			109,
			95,
			115,
			0,
			4,
			5,
			114,
			101,
			109,
			95,
			117,
			0,
			5,
			8,
			103,
			101,
			116,
			95,
			104,
			105,
			103,
			104,
			0,
			0,
			10,
			191,
			1,
			6,
			4,
			0,
			35,
			0,
			11,
			36,
			1,
			1,
			126,
			32,
			0,
			173,
			32,
			1,
			173,
			66,
			32,
			134,
			132,
			32,
			2,
			173,
			32,
			3,
			173,
			66,
			32,
			134,
			132,
			126,
			34,
			4,
			66,
			32,
			135,
			167,
			36,
			0,
			32,
			4,
			167,
			11,
			36,
			1,
			1,
			126,
			32,
			0,
			173,
			32,
			1,
			173,
			66,
			32,
			134,
			132,
			32,
			2,
			173,
			32,
			3,
			173,
			66,
			32,
			134,
			132,
			127,
			34,
			4,
			66,
			32,
			135,
			167,
			36,
			0,
			32,
			4,
			167,
			11,
			36,
			1,
			1,
			126,
			32,
			0,
			173,
			32,
			1,
			173,
			66,
			32,
			134,
			132,
			32,
			2,
			173,
			32,
			3,
			173,
			66,
			32,
			134,
			132,
			128,
			34,
			4,
			66,
			32,
			135,
			167,
			36,
			0,
			32,
			4,
			167,
			11,
			36,
			1,
			1,
			126,
			32,
			0,
			173,
			32,
			1,
			173,
			66,
			32,
			134,
			132,
			32,
			2,
			173,
			32,
			3,
			173,
			66,
			32,
			134,
			132,
			129,
			34,
			4,
			66,
			32,
			135,
			167,
			36,
			0,
			32,
			4,
			167,
			11,
			36,
			1,
			1,
			126,
			32,
			0,
			173,
			32,
			1,
			173,
			66,
			32,
			134,
			132,
			32,
			2,
			173,
			32,
			3,
			173,
			66,
			32,
			134,
			132,
			130,
			34,
			4,
			66,
			32,
			135,
			167,
			36,
			0,
			32,
			4,
			167,
			11
		])), {}).exports;
	} catch (e) {}
	function Long$2(low, high, unsigned) {
		this.low = low | 0;
		this.high = high | 0;
		this.unsigned = !!unsigned;
	}
	Long$2.prototype.__isLong__;
	Object.defineProperty(Long$2.prototype, "__isLong__", { value: true });
	function isLong(obj) {
		return (obj && obj["__isLong__"]) === true;
	}
	Long$2.isLong = isLong;
	var INT_CACHE = {};
	var UINT_CACHE = {};
	function fromInt(value, unsigned) {
		var obj, cachedObj, cache$1;
		if (unsigned) {
			value >>>= 0;
			if (cache$1 = 0 <= value && value < 256) {
				cachedObj = UINT_CACHE[value];
				if (cachedObj) return cachedObj;
			}
			obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
			if (cache$1) UINT_CACHE[value] = obj;
			return obj;
		} else {
			value |= 0;
			if (cache$1 = -128 <= value && value < 128) {
				cachedObj = INT_CACHE[value];
				if (cachedObj) return cachedObj;
			}
			obj = fromBits(value, value < 0 ? -1 : 0, false);
			if (cache$1) INT_CACHE[value] = obj;
			return obj;
		}
	}
	Long$2.fromInt = fromInt;
	function fromNumber(value, unsigned) {
		if (isNaN(value)) return unsigned ? UZERO : ZERO;
		if (unsigned) {
			if (value < 0) return UZERO;
			if (value >= 0x10000000000000000) return MAX_UNSIGNED_VALUE;
		} else {
			if (value <= -0x8000000000000000) return MIN_VALUE;
			if (value + 1 >= 0x8000000000000000) return MAX_VALUE;
		}
		if (value < 0) return fromNumber(-value, unsigned).neg();
		return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
	}
	Long$2.fromNumber = fromNumber;
	function fromBits(lowBits, highBits, unsigned) {
		return new Long$2(lowBits, highBits, unsigned);
	}
	Long$2.fromBits = fromBits;
	var pow_dbl = Math.pow;
	function fromString(str, unsigned, radix) {
		if (str.length === 0) throw Error("empty string");
		if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return ZERO;
		if (typeof unsigned === "number") radix = unsigned, unsigned = false;
		else unsigned = !!unsigned;
		radix = radix || 10;
		if (radix < 2 || 36 < radix) throw RangeError("radix");
		var p;
		if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
		else if (p === 0) return fromString(str.substring(1), unsigned, radix).neg();
		var radixToPower = fromNumber(pow_dbl(radix, 8));
		var result = ZERO;
		for (var i = 0; i < str.length; i += 8) {
			var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
			if (size < 8) {
				var power = fromNumber(pow_dbl(radix, size));
				result = result.mul(power).add(fromNumber(value));
			} else {
				result = result.mul(radixToPower);
				result = result.add(fromNumber(value));
			}
		}
		result.unsigned = unsigned;
		return result;
	}
	Long$2.fromString = fromString;
	function fromValue(val, unsigned) {
		if (typeof val === "number") return fromNumber(val, unsigned);
		if (typeof val === "string") return fromString(val, unsigned);
		return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
	}
	Long$2.fromValue = fromValue;
	var TWO_PWR_16_DBL = 65536;
	var TWO_PWR_24_DBL = 1 << 24;
	var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
	TWO_PWR_32_DBL * TWO_PWR_32_DBL / 2;
	var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
	var ZERO = fromInt(0);
	Long$2.ZERO = ZERO;
	var UZERO = fromInt(0, true);
	Long$2.UZERO = UZERO;
	var ONE = fromInt(1);
	Long$2.ONE = ONE;
	var UONE = fromInt(1, true);
	Long$2.UONE = UONE;
	var NEG_ONE = fromInt(-1);
	Long$2.NEG_ONE = NEG_ONE;
	var MAX_VALUE = fromBits(-1, 2147483647, false);
	Long$2.MAX_VALUE = MAX_VALUE;
	var MAX_UNSIGNED_VALUE = fromBits(-1, -1, true);
	Long$2.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
	var MIN_VALUE = fromBits(0, -2147483648, false);
	Long$2.MIN_VALUE = MIN_VALUE;
	var LongPrototype = Long$2.prototype;
	LongPrototype.toInt = function toInt() {
		return this.unsigned ? this.low >>> 0 : this.low;
	};
	LongPrototype.toNumber = function toNumber() {
		if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
		return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
	};
	LongPrototype.toString = function toString$2(radix) {
		radix = radix || 10;
		if (radix < 2 || 36 < radix) throw RangeError("radix");
		if (this.isZero()) return "0";
		if (this.isNegative()) if (this.eq(MIN_VALUE)) {
			var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
			return div.toString(radix) + rem1.toInt().toString(radix);
		} else return "-" + this.neg().toString(radix);
		var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
		var result = "";
		while (true) {
			var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
			rem = remDiv;
			if (rem.isZero()) return digits + result;
			else {
				while (digits.length < 6) digits = "0" + digits;
				result = "" + digits + result;
			}
		}
	};
	LongPrototype.getHighBits = function getHighBits() {
		return this.high;
	};
	LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
		return this.high >>> 0;
	};
	LongPrototype.getLowBits = function getLowBits() {
		return this.low;
	};
	LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
		return this.low >>> 0;
	};
	LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
		if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
		var val = this.high != 0 ? this.high : this.low;
		for (var bit = 31; bit > 0; bit--) if ((val & 1 << bit) != 0) break;
		return this.high != 0 ? bit + 33 : bit + 1;
	};
	LongPrototype.isZero = function isZero() {
		return this.high === 0 && this.low === 0;
	};
	LongPrototype.eqz = LongPrototype.isZero;
	LongPrototype.isNegative = function isNegative() {
		return !this.unsigned && this.high < 0;
	};
	LongPrototype.isPositive = function isPositive() {
		return this.unsigned || this.high >= 0;
	};
	LongPrototype.isOdd = function isOdd() {
		return (this.low & 1) === 1;
	};
	LongPrototype.isEven = function isEven() {
		return (this.low & 1) === 0;
	};
	LongPrototype.equals = function equals(other) {
		if (!isLong(other)) other = fromValue(other);
		if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
		return this.high === other.high && this.low === other.low;
	};
	LongPrototype.eq = LongPrototype.equals;
	LongPrototype.notEquals = function notEquals(other) {
		return !this.eq(other);
	};
	LongPrototype.neq = LongPrototype.notEquals;
	LongPrototype.ne = LongPrototype.notEquals;
	LongPrototype.lessThan = function lessThan(other) {
		return this.comp(other) < 0;
	};
	LongPrototype.lt = LongPrototype.lessThan;
	LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
		return this.comp(other) <= 0;
	};
	LongPrototype.lte = LongPrototype.lessThanOrEqual;
	LongPrototype.le = LongPrototype.lessThanOrEqual;
	LongPrototype.greaterThan = function greaterThan(other) {
		return this.comp(other) > 0;
	};
	LongPrototype.gt = LongPrototype.greaterThan;
	LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
		return this.comp(other) >= 0;
	};
	LongPrototype.gte = LongPrototype.greaterThanOrEqual;
	LongPrototype.ge = LongPrototype.greaterThanOrEqual;
	LongPrototype.compare = function compare(other) {
		if (!isLong(other)) other = fromValue(other);
		if (this.eq(other)) return 0;
		var thisNeg = this.isNegative(), otherNeg = other.isNegative();
		if (thisNeg && !otherNeg) return -1;
		if (!thisNeg && otherNeg) return 1;
		if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
		return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
	};
	LongPrototype.comp = LongPrototype.compare;
	LongPrototype.negate = function negate() {
		if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
		return this.not().add(ONE);
	};
	LongPrototype.neg = LongPrototype.negate;
	LongPrototype.add = function add(addend) {
		if (!isLong(addend)) addend = fromValue(addend);
		var a48 = this.high >>> 16;
		var a32 = this.high & 65535;
		var a16 = this.low >>> 16;
		var a00 = this.low & 65535;
		var b48 = addend.high >>> 16;
		var b32 = addend.high & 65535;
		var b16 = addend.low >>> 16;
		var b00 = addend.low & 65535;
		var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
		c00 += a00 + b00;
		c16 += c00 >>> 16;
		c00 &= 65535;
		c16 += a16 + b16;
		c32 += c16 >>> 16;
		c16 &= 65535;
		c32 += a32 + b32;
		c48 += c32 >>> 16;
		c32 &= 65535;
		c48 += a48 + b48;
		c48 &= 65535;
		return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
	};
	LongPrototype.subtract = function subtract(subtrahend) {
		if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
		return this.add(subtrahend.neg());
	};
	LongPrototype.sub = LongPrototype.subtract;
	LongPrototype.multiply = function multiply(multiplier) {
		if (this.isZero()) return ZERO;
		if (!isLong(multiplier)) multiplier = fromValue(multiplier);
		if (wasm) {
			var low = wasm.mul(this.low, this.high, multiplier.low, multiplier.high);
			return fromBits(low, wasm.get_high(), this.unsigned);
		}
		if (multiplier.isZero()) return ZERO;
		if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
		if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
		if (this.isNegative()) if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());
		else return this.neg().mul(multiplier).neg();
		else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
		if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
		var a48 = this.high >>> 16;
		var a32 = this.high & 65535;
		var a16 = this.low >>> 16;
		var a00 = this.low & 65535;
		var b48 = multiplier.high >>> 16;
		var b32 = multiplier.high & 65535;
		var b16 = multiplier.low >>> 16;
		var b00 = multiplier.low & 65535;
		var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
		c00 += a00 * b00;
		c16 += c00 >>> 16;
		c00 &= 65535;
		c16 += a16 * b00;
		c32 += c16 >>> 16;
		c16 &= 65535;
		c16 += a00 * b16;
		c32 += c16 >>> 16;
		c16 &= 65535;
		c32 += a32 * b00;
		c48 += c32 >>> 16;
		c32 &= 65535;
		c32 += a16 * b16;
		c48 += c32 >>> 16;
		c32 &= 65535;
		c32 += a00 * b32;
		c48 += c32 >>> 16;
		c32 &= 65535;
		c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
		c48 &= 65535;
		return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
	};
	LongPrototype.mul = LongPrototype.multiply;
	LongPrototype.divide = function divide(divisor) {
		if (!isLong(divisor)) divisor = fromValue(divisor);
		if (divisor.isZero()) throw Error("division by zero");
		if (wasm) {
			if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) return this;
			var low = (this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high);
			return fromBits(low, wasm.get_high(), this.unsigned);
		}
		if (this.isZero()) return this.unsigned ? UZERO : ZERO;
		var approx, rem, res;
		if (!this.unsigned) {
			if (this.eq(MIN_VALUE)) if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE;
			else if (divisor.eq(MIN_VALUE)) return ONE;
			else {
				approx = this.shr(1).div(divisor).shl(1);
				if (approx.eq(ZERO)) return divisor.isNegative() ? ONE : NEG_ONE;
				else {
					rem = this.sub(divisor.mul(approx));
					res = approx.add(rem.div(divisor));
					return res;
				}
			}
			else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
			if (this.isNegative()) {
				if (divisor.isNegative()) return this.neg().div(divisor.neg());
				return this.neg().div(divisor).neg();
			} else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
			res = ZERO;
		} else {
			if (!divisor.unsigned) divisor = divisor.toUnsigned();
			if (divisor.gt(this)) return UZERO;
			if (divisor.gt(this.shru(1))) return UONE;
			res = UZERO;
		}
		rem = this;
		while (rem.gte(divisor)) {
			approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
			var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
			while (approxRem.isNegative() || approxRem.gt(rem)) {
				approx -= delta;
				approxRes = fromNumber(approx, this.unsigned);
				approxRem = approxRes.mul(divisor);
			}
			if (approxRes.isZero()) approxRes = ONE;
			res = res.add(approxRes);
			rem = rem.sub(approxRem);
		}
		return res;
	};
	LongPrototype.div = LongPrototype.divide;
	LongPrototype.modulo = function modulo(divisor) {
		if (!isLong(divisor)) divisor = fromValue(divisor);
		if (wasm) {
			var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high);
			return fromBits(low, wasm.get_high(), this.unsigned);
		}
		return this.sub(this.div(divisor).mul(divisor));
	};
	LongPrototype.mod = LongPrototype.modulo;
	LongPrototype.rem = LongPrototype.modulo;
	LongPrototype.not = function not() {
		return fromBits(~this.low, ~this.high, this.unsigned);
	};
	LongPrototype.and = function and(other) {
		if (!isLong(other)) other = fromValue(other);
		return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
	};
	LongPrototype.or = function or(other) {
		if (!isLong(other)) other = fromValue(other);
		return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
	};
	LongPrototype.xor = function xor(other) {
		if (!isLong(other)) other = fromValue(other);
		return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
	};
	LongPrototype.shiftLeft = function shiftLeft(numBits) {
		if (isLong(numBits)) numBits = numBits.toInt();
		if ((numBits &= 63) === 0) return this;
		else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
		else return fromBits(0, this.low << numBits - 32, this.unsigned);
	};
	LongPrototype.shl = LongPrototype.shiftLeft;
	LongPrototype.shiftRight = function shiftRight(numBits) {
		if (isLong(numBits)) numBits = numBits.toInt();
		if ((numBits &= 63) === 0) return this;
		else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
		else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
	};
	LongPrototype.shr = LongPrototype.shiftRight;
	LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
		if (isLong(numBits)) numBits = numBits.toInt();
		numBits &= 63;
		if (numBits === 0) return this;
		else {
			var high = this.high;
			if (numBits < 32) {
				var low = this.low;
				return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
			} else if (numBits === 32) return fromBits(high, 0, this.unsigned);
			else return fromBits(high >>> numBits - 32, 0, this.unsigned);
		}
	};
	LongPrototype.shru = LongPrototype.shiftRightUnsigned;
	LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
	LongPrototype.toSigned = function toSigned() {
		if (!this.unsigned) return this;
		return fromBits(this.low, this.high, false);
	};
	LongPrototype.toUnsigned = function toUnsigned() {
		if (this.unsigned) return this;
		return fromBits(this.low, this.high, true);
	};
	LongPrototype.toBytes = function toBytes(le) {
		return le ? this.toBytesLE() : this.toBytesBE();
	};
	LongPrototype.toBytesLE = function toBytesLE() {
		var hi = this.high, lo = this.low;
		return [
			lo & 255,
			lo >>> 8 & 255,
			lo >>> 16 & 255,
			lo >>> 24,
			hi & 255,
			hi >>> 8 & 255,
			hi >>> 16 & 255,
			hi >>> 24
		];
	};
	LongPrototype.toBytesBE = function toBytesBE() {
		var hi = this.high, lo = this.low;
		return [
			hi >>> 24,
			hi >>> 16 & 255,
			hi >>> 8 & 255,
			hi & 255,
			lo >>> 24,
			lo >>> 16 & 255,
			lo >>> 8 & 255,
			lo & 255
		];
	};
	Long$2.fromBytes = function fromBytes(bytes, unsigned, le) {
		return le ? Long$2.fromBytesLE(bytes, unsigned) : Long$2.fromBytesBE(bytes, unsigned);
	};
	Long$2.fromBytesLE = function fromBytesLE(bytes, unsigned) {
		return new Long$2(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
	};
	Long$2.fromBytesBE = function fromBytesBE(bytes, unsigned) {
		return new Long$2(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
	};
}));
var require_library_options = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var libraryOptions = { bigIntCompat: false };
	module.exports.getBigIntCompat = function() {
		return libraryOptions.bigIntCompat;
	};
	module.exports.setBigIntCompat = function(val) {
		if (typeof val !== "boolean") throw new Error("dbus.setBigIntCompat() must be called with a boolean parameter");
		libraryOptions.bigIntCompat = val;
	};
}));
var require_marshallers = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Buffer$7 = require_safe_buffer().Buffer;
	var align$1 = require_align().align;
	var { parseSignature: parseSignature$3 } = require_signature();
	var Long$1 = require_long();
	var { getBigIntCompat: getBigIntCompat$1 } = require_library_options();
	var JSBI$1 = (init_jsbi(), __toCommonJS(jsbi_exports));
	var { _getJSBIConstants, _getBigIntConstants } = require_constants$1();
	var MakeSimpleMarshaller = function(signature) {
		const marshaller = {};
		function checkValidString(data) {
			if (typeof data !== "string") throw new Error(`Data: ${data} was not of type string`);
			else if (data.indexOf("\0") !== -1) throw new Error("String contains null byte");
		}
		function checkValidSignature(data) {
			if (data.length > 255) throw new Error(`Data: ${data} is too long for signature type (${data.length} > 255)`);
			let parenCount = 0;
			for (let ii = 0; ii < data.length; ++ii) {
				if (parenCount > 32) throw new Error(`Maximum container type nesting exceeded in signature type:${data}`);
				switch (data[ii]) {
					case "(":
						++parenCount;
						break;
					case ")":
						--parenCount;
						break;
					default: break;
				}
			}
			parseSignature$3(data);
		}
		switch (signature) {
			case "o":
			case "s":
				marshaller.check = function(data) {
					checkValidString(data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					align$1(ps, 4);
					const buff = Buffer$7.from(data, "utf8");
					ps.word32le(buff.length).put(buff).word8(0);
					ps._offset += 5 + buff.length;
				};
				break;
			case "g":
				marshaller.check = function(data) {
					checkValidString(data);
					checkValidSignature(data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					const buff = Buffer$7.from(data, "ascii");
					ps.word8(data.length).put(buff).word8(0);
					ps._offset += 2 + buff.length;
				};
				break;
			case "y":
				marshaller.check = function(data) {
					checkInteger(data);
					checkRange(0, 255, data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					ps.word8(data);
					ps._offset++;
				};
				break;
			case "b":
				marshaller.check = function(data) {
					checkBoolean(data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					data = data ? 1 : 0;
					align$1(ps, 4);
					ps.word32le(data);
					ps._offset += 4;
				};
				break;
			case "n":
				marshaller.check = function(data) {
					checkInteger(data);
					checkRange(-32768, 32767, data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					align$1(ps, 2);
					const buff = Buffer$7.alloc(2);
					buff.writeInt16LE(parseInt(data), 0);
					ps.put(buff);
					ps._offset += 2;
				};
				break;
			case "q":
				marshaller.check = function(data) {
					checkInteger(data);
					checkRange(0, 65535, data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					align$1(ps, 2);
					ps.word16le(data);
					ps._offset += 2;
				};
				break;
			case "h":
			case "i":
				marshaller.check = function(data) {
					checkInteger(data);
					checkRange(-2147483648, 2147483647, data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					align$1(ps, 4);
					const buff = Buffer$7.alloc(4);
					buff.writeInt32LE(parseInt(data), 0);
					ps.put(buff);
					ps._offset += 4;
				};
				break;
			case "u":
				marshaller.check = function(data) {
					checkInteger(data);
					checkRange(0, 4294967295, data);
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					align$1(ps, 4);
					ps.word32le(data);
					ps._offset += 4;
				};
				break;
			case "t":
				marshaller.check = function(data) {
					return checkLong(data, false);
				};
				marshaller.marshall = function(ps, data) {
					data = this.check(data);
					align$1(ps, 8);
					ps.word32le(data.low);
					ps.word32le(data.high);
					ps._offset += 8;
				};
				break;
			case "x":
				marshaller.check = function(data) {
					return checkLong(data, true);
				};
				marshaller.marshall = function(ps, data) {
					data = this.check(data);
					align$1(ps, 8);
					ps.word32le(data.low);
					ps.word32le(data.high);
					ps._offset += 8;
				};
				break;
			case "d":
				marshaller.check = function(data) {
					if (typeof data !== "number") throw new Error(`Data: ${data} was not of type number`);
					else if (Number.isNaN(data)) throw new Error(`Data: ${data} was not a number`);
					else if (!Number.isFinite(data)) throw new Error("Number outside range");
				};
				marshaller.marshall = function(ps, data) {
					this.check(data);
					align$1(ps, 8);
					const buff = Buffer$7.alloc(8);
					buff.writeDoubleLE(parseFloat(data), 0);
					ps.put(buff);
					ps._offset += 8;
				};
				break;
			default: throw new Error(`Unknown data type format: ${signature}`);
		}
		return marshaller;
	};
	exports.MakeSimpleMarshaller = MakeSimpleMarshaller;
	var checkRange = function(minValue, maxValue, data) {
		if (data > maxValue || data < minValue) throw new Error("Number outside range");
	};
	var checkInteger = function(data) {
		if (typeof data !== "number") throw new Error(`Data: ${data} was not of type number`);
		if (Math.floor(data) !== data) throw new Error(`Data: ${data} was not an integer`);
	};
	var checkBoolean = function(data) {
		if (!(typeof data === "boolean" || data === 0 || data === 1)) throw new Error(`Data: ${data} was not of type boolean`);
	};
	var checkJSBILong = function(data, signed) {
		const { MAX_INT64, MIN_INT64, MAX_UINT64, MIN_UINT64 } = _getJSBIConstants();
		data = JSBI$1.BigInt(data.toString());
		if (signed) {
			if (JSBI$1.greaterThan(data, MAX_INT64)) throw new Error("data was out of range (greater than max int64)");
			else if (JSBI$1.lessThan(data, MIN_INT64)) throw new Error("data was out of range (less than min int64)");
		} else if (JSBI$1.greaterThan(data, MAX_UINT64)) throw new Error("data was out of range (greater than max uint64)");
		else if (JSBI$1.lessThan(data, MIN_UINT64)) throw new Error("data was out of range (less than min uint64)");
		return Long$1.fromString(data.toString(), true);
	};
	var checkBigIntLong = function(data, signed) {
		const { MAX_INT64, MIN_INT64, MAX_UINT64, MIN_UINT64 } = _getBigIntConstants();
		if (typeof data !== "bigint") data = BigInt(data.toString());
		if (signed) {
			if (data > MAX_INT64) throw new Error("data was out of range (greater than max int64)");
			else if (data < MIN_INT64) throw new Error("data was out of range (less than min int64)");
		} else if (data > MAX_UINT64) throw new Error("data was out of range (greater than max uint64)");
		else if (data < MIN_UINT64) throw new Error("data was out of range (less than min uint64)");
		return Long$1.fromString(data.toString(), true);
	};
	var checkLong = function(data, signed) {
		if (getBigIntCompat$1()) return checkJSBILong(data, signed);
		else return checkBigIntLong(data, signed);
	};
}));
var require_marshall = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert = __require("assert");
	var { parseSignature: parseSignature$2 } = require_signature();
	var put = require_put();
	var Marshallers = require_marshallers();
	var align = require_align().align;
	module.exports = function marshall$1(signature, data, offset, fds) {
		if (typeof offset === "undefined") offset = 0;
		const tree = parseSignature$2(signature);
		if (!Array.isArray(data) || data.length !== tree.length) throw new Error(`message body does not match message signature. Body:${JSON.stringify(data)}, signature:${signature}`);
		const putstream = put();
		putstream._offset = offset;
		return writeStruct(putstream, tree, data, fds).buffer();
	};
	function writeStruct(ps, tree, data, fds) {
		if (tree.length !== data.length) throw new Error("Invalid struct data");
		for (let i = 0; i < tree.length; ++i) write(ps, tree[i], data[i], fds);
		return ps;
	}
	function write(ps, ele, data, fds) {
		switch (ele.type) {
			case "(":
			case "{":
				align(ps, 8);
				writeStruct(ps, ele.child, data, fds);
				break;
			case "a": {
				const arrPut = put();
				arrPut._offset = ps._offset;
				const _offset = arrPut._offset;
				writeSimple(arrPut, "u", 0);
				const lengthOffset = arrPut._offset - 4 - _offset;
				if ([
					"x",
					"t",
					"d",
					"{",
					"("
				].indexOf(ele.child[0].type) !== -1) align(arrPut, 8);
				const startOffset = arrPut._offset;
				for (let i = 0; i < data.length; ++i) write(arrPut, ele.child[0], data[i], fds);
				const arrBuff = arrPut.buffer();
				const length = arrPut._offset - startOffset;
				arrBuff.writeUInt32LE(length, lengthOffset);
				ps.put(arrBuff);
				ps._offset += arrBuff.length;
				break;
			}
			case "v": {
				assert.strictEqual(data.length, 2, "variant data should be [signature, data]");
				write(ps, {
					type: "g",
					child: []
				}, data[0], fds);
				const tree = parseSignature$2(data[0]);
				assert(tree.length === 1);
				write(ps, tree[0], data[1], fds);
				break;
			}
			case "h": if (fds) {
				const idx = fds.push(data);
				return writeSimple(ps, ele.type, idx - 1);
			}
			default: return writeSimple(ps, ele.type, data);
		}
	}
	var stringTypes = [
		"g",
		"o",
		"s"
	];
	function writeSimple(ps, type, data) {
		if (typeof data === "undefined") throw new Error("Serialisation of JS 'undefined' type is not supported by d-bus");
		if (data === null) throw new Error("Serialisation of null value is not supported by d-bus");
		if (Buffer.isBuffer(data)) data = data.toString();
		if (stringTypes.indexOf(type) !== -1 && typeof data !== "string") throw new Error(`Expected string or buffer argument, got ${JSON.stringify(data)} of type '${type}'`);
		Marshallers.MakeSimpleMarshaller(type).marshall(ps, data);
		return ps;
	}
}));
var require_dbus_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { parseSignature: parseSignature$1 } = require_signature();
	var { getBigIntCompat } = require_library_options();
	var JSBI = (init_jsbi(), __toCommonJS(jsbi_exports));
	var Long = require_long();
	var LE = require_constants$1().endianness.le;
	function DBusBuffer$1(buffer$1, startPos, endian, fds, options) {
		if (typeof options !== "object") options = { ayBuffer: true };
		else if (options.ayBuffer === void 0) options.ayBuffer = true;
		this.options = options;
		this.buffer = buffer$1;
		this.endian = endian;
		this.fds = fds;
		this.startPos = startPos || 0;
		this.pos = 0;
	}
	DBusBuffer$1.prototype.align = function(power) {
		const allbits = (1 << power) - 1;
		this.pos = (this.pos + this.startPos + allbits >> power << power) - this.startPos;
	};
	DBusBuffer$1.prototype.readInt8 = function() {
		this.pos++;
		return this.buffer[this.pos - 1];
	};
	DBusBuffer$1.prototype.readSInt16 = function() {
		this.align(1);
		const res = this.endian === LE ? this.buffer.readInt16LE(this.pos) : this.buffer.readInt16BE(this.pos);
		this.pos += 2;
		return res;
	};
	DBusBuffer$1.prototype.readInt16 = function() {
		this.align(1);
		const res = this.endian === LE ? this.buffer.readUInt16LE(this.pos) : this.buffer.readUInt16BE(this.pos);
		this.pos += 2;
		return res;
	};
	DBusBuffer$1.prototype.readSInt32 = function() {
		this.align(2);
		const res = this.endian === LE ? this.buffer.readInt32LE(this.pos) : this.buffer.readInt32BE(this.pos);
		this.pos += 4;
		return res;
	};
	DBusBuffer$1.prototype.readInt32 = function() {
		this.align(2);
		const res = this.endian === LE ? this.buffer.readUInt32LE(this.pos) : this.buffer.readUInt32BE(this.pos);
		this.pos += 4;
		return res;
	};
	DBusBuffer$1.prototype.readDouble = function() {
		this.align(3);
		const res = this.endian === LE ? this.buffer.readDoubleLE(this.pos) : this.buffer.readDoubleBE(this.pos);
		this.pos += 8;
		return res;
	};
	DBusBuffer$1.prototype.readString = function(len) {
		if (len === 0) {
			this.pos++;
			return "";
		}
		const res = this.buffer.toString("utf8", this.pos, this.pos + len);
		this.pos += len + 1;
		return res;
	};
	DBusBuffer$1.prototype.readTree = function readTree(tree) {
		switch (tree.type) {
			case "(":
			case "{":
			case "r":
				this.align(3);
				return this.readStruct(tree.child);
			case "a":
				if (!tree.child || tree.child.length !== 1) throw new Error("Incorrect array element signature");
				return this.readArray(tree.child[0], this.readInt32());
			case "v": return this.readVariant();
			default: return this.readSimpleType(tree.type);
		}
	};
	DBusBuffer$1.prototype.read = function read(signature) {
		const tree = parseSignature$1(signature);
		return this.readStruct(tree);
	};
	DBusBuffer$1.prototype.readVariant = function readVariant() {
		const signature = this.readSimpleType("g");
		const tree = parseSignature$1(signature);
		return [tree, this.readStruct(tree)];
	};
	DBusBuffer$1.prototype.readStruct = function readStruct(struct) {
		const result = [];
		for (let i = 0; i < struct.length; ++i) result.push(this.readTree(struct[i]));
		return result;
	};
	DBusBuffer$1.prototype.readArray = function readArray(eleType, arrayBlobSize) {
		const result = [];
		const start = this.pos;
		if (eleType.type === "y" && this.options.ayBuffer) {
			this.pos += arrayBlobSize;
			return this.buffer.slice(start, this.pos);
		}
		if ([
			"x",
			"t",
			"d",
			"{",
			"(",
			"r"
		].indexOf(eleType.type) !== -1) this.align(3);
		const end = this.pos + arrayBlobSize;
		while (this.pos < end) result.push(this.readTree(eleType));
		return result;
	};
	DBusBuffer$1.prototype.readSimpleType = function readSimpleType(t$1) {
		let len, word0, word1;
		switch (t$1) {
			case "y": return this.readInt8();
			case "b": return !!this.readInt32();
			case "n": return this.readSInt16();
			case "q": return this.readInt16();
			case "h": {
				const idx = this.readInt32();
				if (!this.fds || this.fds.length <= idx) throw new Error("No FDs available");
				return this.fds[idx];
			}
			case "u": return this.readInt32();
			case "i": return this.readSInt32();
			case "g":
				len = this.readInt8();
				return this.readString(len);
			case "s":
			case "o":
				len = this.readInt32();
				return this.readString(len);
			case "x": {
				this.align(3);
				word0 = this.readInt32();
				word1 = this.readInt32();
				const signedLong = new Long(word0, word1, false);
				if (getBigIntCompat()) return JSBI.BigInt(signedLong.toString());
				else if (typeof BigInt !== "function") throw new Error("BigInt is not supported in this Node version. Use dbus.setBigIntCompat(true) to use a polyfill");
				else return BigInt(signedLong.toString());
			}
			case "t": {
				this.align(3);
				word0 = this.readInt32();
				word1 = this.readInt32();
				const unsignedLong = new Long(word0, word1, true);
				if (getBigIntCompat()) return JSBI.BigInt(unsignedLong.toString());
				else if (typeof BigInt !== "function") throw new Error("BigInt is not supported in this Node version. Use dbus.setBigIntCompat(true) to use a polyfill");
				else return BigInt(unsignedLong.toString());
			}
			case "d": return this.readDouble();
			default: throw new Error(`Unsupported type: ${t$1}`);
		}
	};
	module.exports = DBusBuffer$1;
}));
var header_signature_exports = {};
__export(header_signature_exports, { default: () => header_signature_default });
var header_signature_default;
var init_header_signature = __esmMin((() => {
	header_signature_default = [{
		"type": "a",
		"child": [{
			"type": "(",
			"child": [{
				"type": "y",
				"child": []
			}, {
				"type": "v",
				"child": []
			}]
		}]
	}];
}));
var require_message = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer$6 = require_safe_buffer().Buffer;
	var marshall = require_marshall();
	var constants$6 = require_constants$1();
	var DBusBuffer = require_dbus_buffer();
	var headerSignature = (init_header_signature(), __toCommonJS(header_signature_exports).default);
	module.exports.unmarshalMessages = function messageParser(stream, onMessage, opts) {
		let state = 0;
		let header, fieldsAndBody;
		let fieldsLength, fieldsLengthPadded;
		let fieldsAndBodyLength = 0;
		let bodyLength = 0;
		let endian = 0;
		const LE$1 = constants$6.endianness.le;
		stream.on("readable", function() {
			while (1) if (state === 0) {
				header = stream.read(16);
				if (!header) break;
				state = 1;
				endian = header.readUInt8(0);
				fieldsLength = endian === LE$1 ? header.readUInt32LE(12) : header.readUInt32BE(12);
				fieldsLengthPadded = fieldsLength + 7 >> 3 << 3;
				bodyLength = endian === LE$1 ? header.readUInt32LE(4) : header.readUInt32BE(4);
				fieldsAndBodyLength = fieldsLengthPadded + bodyLength;
			} else {
				const readBuf = stream.read(fieldsAndBodyLength, null);
				fieldsAndBody = readBuf ? readBuf.data || readBuf : readBuf;
				if (!fieldsAndBody) break;
				state = 0;
				const messageBuffer = new DBusBuffer(fieldsAndBody, 0, endian, readBuf.fds, opts);
				const unmarshalledHeader = messageBuffer.readArray(headerSignature[0].child[0], fieldsLength);
				messageBuffer.align(3);
				let headerName;
				const message$2 = {};
				message$2.serial = endian === LE$1 ? header.readUInt32LE(8) : header.readUInt32BE(8);
				for (let i = 0; i < unmarshalledHeader.length; ++i) {
					headerName = constants$6.headerTypeName[unmarshalledHeader[i][0]];
					message$2[headerName] = unmarshalledHeader[i][1][1][0];
				}
				message$2.type = header[1];
				message$2.flags = header[2];
				if (bodyLength > 0 && message$2.signature) message$2.body = messageBuffer.read(message$2.signature);
				onMessage(message$2);
			}
		});
	};
	module.exports.unmarshall = function unmarshall(buff, opts) {
		const endian = buff.readUInt8();
		const msgBuf = new DBusBuffer(buff, 0, endian, null, opts);
		const headers = msgBuf.read("yyyyuua(yv)");
		const message$2 = {};
		for (let i = 0; i < headers[6].length; ++i) {
			const headerName = constants$6.headerTypeName[headers[6][i][0]];
			message$2[headerName] = headers[6][i][1][1][0];
		}
		message$2.type = headers[1];
		message$2.flags = headers[2];
		message$2.serial = headers[5];
		msgBuf.align(3);
		message$2.body = msgBuf.read(message$2.signature);
		return message$2;
	};
	module.exports.marshall = function marshallMessage$2(message$2) {
		if (!message$2.serial) throw new Error("Missing or invalid serial");
		const flags$1 = message$2.flags || 0;
		const type = message$2.type || constants$6.messageType.METHOD_CALL;
		let bodyLength = 0;
		let bodyBuff;
		const fds = [];
		if (message$2.signature && message$2.body) {
			bodyBuff = marshall(message$2.signature, message$2.body, 0, fds);
			bodyLength = bodyBuff.length;
			message$2.unixFd = fds.length;
		}
		const header = [
			constants$6.endianness.le,
			type,
			flags$1,
			constants$6.protocolVersion,
			bodyLength,
			message$2.serial
		];
		const headerBuff = marshall("yyyyuu", header);
		const fields = [];
		constants$6.headerTypeName.forEach(function(fieldName) {
			const fieldVal = message$2[fieldName];
			if (fieldVal) fields.push([constants$6.headerTypeId[fieldName], [constants$6.fieldSignature[fieldName], fieldVal]]);
		});
		const fieldsBuff = marshall("a(yv)", [fields], 12);
		const headerLenAligned = headerBuff.length + fieldsBuff.length + 7 >> 3 << 3;
		const messageLen = headerLenAligned + bodyLength;
		const messageBuff = Buffer$6.alloc(messageLen);
		headerBuff.copy(messageBuff);
		fieldsBuff.copy(messageBuff, headerBuff.length);
		if (bodyLength > 0) bodyBuff.copy(messageBuff, headerLenAligned);
		return [messageBuff, fds];
	};
}));
var require_readline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer$5 = require_safe_buffer().Buffer;
	module.exports = function readOneLine(stream, cb) {
		const bytes = [];
		function readable() {
			while (1) {
				const buf = stream.read(1);
				if (!buf) return;
				const b = buf[0];
				if (b === 10) {
					try {
						cb(Buffer$5.from(bytes));
					} catch (error) {
						stream.emit("error", error);
					}
					stream.removeListener("readable", readable);
					return;
				}
				bytes.push(b);
			}
		}
		stream.on("readable", readable);
	};
}));
var require_handshake$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer$4 = require_safe_buffer().Buffer;
	var crypto = __require("crypto");
	var fs$2 = __require("fs");
	var path$1 = __require("path");
	var constants$5 = require_constants$1();
	var readLine = require_readline();
	function sha1(input) {
		const shasum = crypto.createHash("sha1");
		shasum.update(input);
		return shasum.digest("hex");
	}
	function getUserHome() {
		return process.env[process.platform.match(/$win/) ? "USERPROFILE" : "HOME"];
	}
	function getCookie(context, id, cb) {
		const dirname = path$1.join(getUserHome(), ".dbus-keyrings");
		if (context.length === 0) context = "org_freedesktop_general";
		const filename = path$1.join(dirname, context);
		fs$2.stat(dirname, function(err, stat) {
			if (err) return cb(err);
			if (stat.mode & 18) return cb(/* @__PURE__ */ new Error("User keyrings directory is writeable by other users. Aborting authentication"));
			if ("getuid" in process && stat.uid !== process.getuid()) return cb(/* @__PURE__ */ new Error("Keyrings directory is not owned by the current user. Aborting authentication!"));
			fs$2.readFile(filename, "ascii", function(err$1, keyrings) {
				if (err$1) return cb(err$1);
				const lines = keyrings.split("\n");
				for (let l = 0; l < lines.length; ++l) {
					const data = lines[l].split(" ");
					if (id === data[0]) return cb(null, data[2]);
				}
				return cb(/* @__PURE__ */ new Error("cookie not found"));
			});
		});
	}
	function hexlify(input) {
		return Buffer$4.from(input.toString(), "ascii").toString("hex");
	}
	module.exports = function auth(stream, opts, cb) {
		let authMethods;
		if (opts.authMethods) authMethods = opts.authMethods;
		else authMethods = constants$5.defaultAuthMethods;
		stream.write("\0");
		tryAuth(stream, authMethods.slice(), cb);
	};
	function tryAuth(stream, methods, cb) {
		if (methods.length === 0) return cb(/* @__PURE__ */ new Error("No authentication methods left to try"));
		const authMethod = methods.shift();
		const uid = "getuid" in process ? process.getuid() : 0;
		const id = hexlify(uid);
		let guid = "";
		function beginOrNextAuth() {
			readLine(stream, function(line) {
				const ok = line.toString("ascii").match(/^([A-Za-z]+) (.*)/);
				if (ok && ok[1] === "OK") {
					guid = ok[2];
					if (stream.supportsUnixFd) negotiateUnixFd();
					else {
						stream.write("BEGIN\r\n");
						return cb(null, guid);
					}
				} else if (!methods.empty) tryAuth(stream, methods, cb);
				else return cb(line);
			});
		}
		function negotiateUnixFd() {
			stream.write("NEGOTIATE_UNIX_FD\r\n");
			readLine(stream, function(line) {
				const res = line.toString("ascii").trim();
				if (res === "AGREE_UNIX_FD") {} else if (res === "ERROR") stream.supportsUnixFd = false;
				else return cb(line);
				stream.write("BEGIN\r\n");
				return cb(null, guid);
			});
		}
		switch (authMethod) {
			case "EXTERNAL":
				stream.write(`AUTH ${authMethod} ${id}\r\n`);
				beginOrNextAuth();
				break;
			case "DBUS_COOKIE_SHA1":
				stream.write(`AUTH ${authMethod} ${id}\r\n`);
				readLine(stream, function(line) {
					const data = Buffer$4.from(line.toString().split(" ")[1].trim(), "hex").toString().split(" ");
					const cookieContext = data[0];
					const cookieId = data[1];
					const serverChallenge = data[2];
					const clientChallenge = crypto.randomBytes(16).toString("hex");
					getCookie(cookieContext, cookieId, function(err, cookie) {
						if (err) return cb(err);
						const response = sha1([
							serverChallenge,
							clientChallenge,
							cookie
						].join(":"));
						const reply = hexlify(clientChallenge + response);
						stream.write(`DATA ${reply}\r\n`);
						beginOrNextAuth();
					});
				});
				break;
			case "ANONYMOUS":
				stream.write("AUTH ANONYMOUS \r\n");
				beginOrNextAuth();
				break;
			default:
				console.error(`Unsupported auth method: ${authMethod}`);
				beginOrNextAuth();
				break;
		}
	}
}));
var require_unpackbuffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var argument_length$1 = {};
	argument_length$1.C = 1;
	argument_length$1.S = 2;
	argument_length$1.s = 2;
	argument_length$1.L = 4;
	argument_length$1.x = 1;
	module.exports.addUnpack = function(Buffer$10) {
		Buffer$10.prototype.unpack = function(format, offset) {
			if (!offset) offset = 0;
			var data = [];
			var current_arg = 0;
			while (current_arg < format.length) {
				switch (format[current_arg]) {
					case "C":
						data.push(this.readUInt8(offset++));
						break;
					case "c":
						data.push(this.readInt8(offset++));
						break;
					case "S":
						data.push(this.readUInt16LE(offset));
						offset += 2;
						break;
					case "s":
						data.push(this.readInt16LE(offset));
						offset += 2;
						break;
					case "n":
						data.push(this.readUInt16BE(offset));
						offset += 2;
						break;
					case "L":
						data.push(this.readUInt32LE(offset));
						offset += 4;
						break;
					case "l":
						data.push(this.readInt32LE(offset));
						offset += 4;
						break;
					case "x":
						offset++;
						break;
				}
				current_arg++;
			}
			return data;
		};
		Buffer$10.prototype.unpackString = function(n, offset) {
			var res = "";
			var end = offset + n;
			while (offset < end) res += String.fromCharCode(this[offset++]);
			return res;
		};
	};
}));
var require_os_homedir = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var os$2 = __require("os");
	function homedir$1() {
		var env = process.env;
		var home = env.HOME;
		var user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
		if (process.platform === "win32") return env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null;
		if (process.platform === "darwin") return home || (user ? "/Users/" + user : null);
		if (process.platform === "linux") return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
		return home || null;
	}
	module.exports = typeof os$2.homedir === "function" ? os$2.homedir : homedir$1;
}));
var require_auth = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$1 = __require("fs");
	var Buffer$3 = __require("buffer").Buffer;
	require_unpackbuffer().addUnpack(Buffer$3);
	var typeToName = {
		256: "Local",
		65535: "Wild",
		254: "Netname",
		253: "Krb5Principal",
		252: "LocalHost",
		0: "Internet",
		1: "DECnet",
		2: "Chaos",
		5: "ServerInterpreted",
		6: "Internet6"
	};
	function parseXauth(buf) {
		var offset = 0;
		var auth = [];
		var cookieProperties = [
			"address",
			"display",
			"authName",
			"authData"
		];
		while (offset < buf.length) {
			var cookie = {};
			cookie.type = buf.readUInt16BE(offset);
			if (!typeToName[cookie.type]) console.warn("Unknown address type");
			offset += 2;
			cookieProperties.forEach(function(property$5) {
				var length = buf.unpack("n", offset)[0];
				offset += 2;
				if (cookie.type === 0 && property$5 == "address") cookie.address = [
					buf[offset],
					buf[offset + 1],
					buf[offset + 2],
					buf[offset + 3]
				].map(function(octet) {
					return octet.toString(10);
				}).join(".");
				else cookie[property$5] = buf.unpackString(length, offset);
				offset += length;
			});
			auth.push(cookie);
		}
		return auth;
	}
	var homedir = require_os_homedir();
	var path = __require("path");
	function readXauthority(cb) {
		var filename = process.env.XAUTHORITY || path.join(homedir(), ".Xauthority");
		fs$1.readFile(filename, function(err, data) {
			if (!err) return cb(null, data);
			if (err.code == "ENOENT") {
				filename = process.env.XAUTHORITY || path.join(homedir(), "Xauthority");
				fs$1.readFile(filename, function(err$1, data$1) {
					if (err$1.code == "ENOENT") cb(null, null);
					else cb(err$1);
				});
			} else cb(err);
		});
	}
	module.exports = function(display, host, socketFamily, cb) {
		var family;
		if (socketFamily === "IPv4") family = 0;
		else if (socketFamily === "IPv6") family = 6;
		else family = 256;
		readXauthority(function(err, data) {
			if (err) return cb(err);
			if (!data) return cb(null, {
				authName: "",
				authData: ""
			});
			var auth = parseXauth(data);
			for (var cookieNum in auth) {
				var cookie = auth[cookieNum];
				if ((typeToName[cookie.family] === "Wild" || cookie.type === family && cookie.address === host) && (cookie.display.length === 0 || cookie.display === display)) return cb(null, cookie);
			}
			cb(null, {
				authName: "",
				authData: ""
			});
		});
	};
}));
var require_xutil = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function padded_length(len) {
		return len + 3 >> 2 << 2;
	}
	function padded_string(str) {
		if (str.length == 0) return "";
		var pad = padded_length(str.length) - str.length;
		var res = str;
		for (var i = 0; i < pad; ++i) res += String.fromCharCode(0);
		return res;
	}
	module.exports.padded_length = padded_length;
	module.exports.padded_string = padded_string;
}));
var require_handshake = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getAuthString = require_auth();
	var xutil$2 = require_xutil();
	function readVisuals(bl, visuals, n_visuals, cb) {
		if (n_visuals == 0) {
			cb();
			return;
		}
		var visual = {};
		bl.unpackTo(visual, [
			"L vid",
			"C class",
			"C bits_per_rgb",
			"S map_ent",
			"L red_mask",
			"L green_mask",
			"L blue_mask",
			"xxxx"
		], function() {
			visual.vid;
			visuals[visual.vid] = visual;
			if (Object.keys(visuals).length == n_visuals) cb();
			else readVisuals(bl, visuals, n_visuals, cb);
		});
	}
	function readScreens(bl, display, cbDisplayReady) {
		var numParsedDepths = 0;
		var readDepths = function(bl$1, display$1, depths, n_depths, cb) {
			if (n_depths == 0) {
				cb();
				return;
			}
			bl$1.unpack("CxSxxxx", function(res) {
				var dep = res[0];
				var n_visuals = res[1];
				var visuals = {};
				readVisuals(bl$1, visuals, n_visuals, function() {
					if (dep in depths) for (var visual in visuals) depths[dep][visual] = visuals[visual];
					else depths[dep] = visuals;
					numParsedDepths++;
					if (numParsedDepths == n_depths) cb();
					else readDepths(bl$1, display$1, depths, n_depths, cb);
				});
			});
		};
		var scr = {};
		bl.unpackTo(scr, [
			"L root",
			"L default_colormap",
			"L white_pixel",
			"L black_pixel",
			"L input_masks",
			"S pixel_width",
			"S pixel_height",
			"S mm_width",
			"S mm_height",
			"S min_installed_maps",
			"S max_installed_maps",
			"L root_visual",
			"C root_depth",
			"C backing_stores",
			"C root_depth",
			"C num_depths"
		], function() {
			var depths = {};
			readDepths(bl, display, depths, scr.num_depths, function() {
				scr.depths = depths;
				delete scr.num_depths;
				display.screen.push(scr);
				if (display.screen.length == display.screen_num) {
					delete display.screen_num;
					cbDisplayReady(null, display);
					return;
				} else readScreens(bl, display, cbDisplayReady);
			});
		});
	}
	function readServerHello(bl, cb) {
		bl.unpack("C", function(res) {
			if (res[0] == 0) {
				bl.unpack("Cxxxxxx", function(rlen) {
					bl.get(rlen[0], function(reason) {
						var err = /* @__PURE__ */ new Error();
						err.message = "X server connection failed: " + reason.toString();
						cb(err);
					});
				});
				return;
			}
			var display = {};
			bl.unpackTo(display, [
				"x",
				"S major",
				"S minor",
				"S xlen",
				"L release",
				"L resource_base",
				"L resource_mask",
				"L motion_buffer_size",
				"S vlen",
				"S max_request_length",
				"C screen_num",
				"C format_num",
				"C image_byte_order",
				"C bitmap_bit_order",
				"C bitmap_scanline_unit",
				"C bitmap_scanline_pad",
				"C min_keycode",
				"C max_keycode",
				"xxxx"
			], function() {
				var pvlen = xutil$2.padded_length(display.vlen);
				var mask = display.resource_mask;
				display.rsrc_shift = 0;
				while (!(mask >> display.rsrc_shift & 1)) display.rsrc_shift++;
				display.rsrc_id = 0;
				bl.get(pvlen, function(vendor) {
					display.vendor = vendor.toString().substr(0, display.vlen);
					display.format = {};
					for (var i = 0; i < display.format_num; ++i) bl.unpack("CCCxxxxx", function(fmt) {
						var depth = fmt[0];
						display.format[depth] = {};
						display.format[depth].bits_per_pixel = fmt[1];
						display.format[depth].scanline_pad = fmt[2];
						if (Object.keys(display.format).length == display.format_num) {
							delete display.format_num;
							display.screen = [];
							readScreens(bl, display, cb);
						}
					});
				});
			});
		});
	}
	function getByteOrder() {
		if (new Uint32Array(new Uint8Array([
			1,
			2,
			3,
			4
		]).buffer)[0] === 67305985) return "l".charCodeAt(0);
		else return "B".charCodeAt(0);
	}
	function writeClientHello(stream, displayNum, authHost, authFamily) {
		getAuthString(displayNum, authHost, authFamily, function(err, cookie) {
			if (err) throw err;
			var byte_order = getByteOrder();
			stream.pack("CxSSSSxxpp", [
				byte_order,
				11,
				0,
				cookie.authName.length,
				cookie.authData.length,
				cookie.authName,
				cookie.authData
			]);
			stream.flush();
		});
	}
	module.exports.readServerHello = readServerHello;
	module.exports.writeClientHello = writeClientHello;
}));
var require_unpackstream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Buffer$2 = __require("buffer").Buffer;
	var EventEmitter$4 = __require("events").EventEmitter;
	var util$2 = __require("util");
	var xutil$1 = require_xutil();
	var argument_length = {};
	argument_length.C = 1;
	argument_length.S = 2;
	argument_length.s = 2;
	argument_length.L = 4;
	argument_length.l = 4;
	argument_length.x = 1;
	function ReadFormatRequest(format, callback) {
		this.format = format;
		this.current_arg = 0;
		this.data = [];
		this.callback = callback;
	}
	function ReadFixedRequest(length, callback) {
		this.length = length;
		this.callback = callback;
		this.data = new Buffer$2(length);
		this.received_bytes = 0;
	}
	ReadFixedRequest.prototype.execute = function(bufferlist, aa, bb, cc, dd) {
		var to_receive = this.length - this.received_bytes;
		for (var i = 0; i < to_receive; ++i) {
			if (bufferlist.length == 0) return false;
			this.data[this.received_bytes++] = bufferlist.getbyte();
		}
		this.callback(this.data);
		return true;
	};
	ReadFormatRequest.prototype.execute = function(bufferlist, tag1, tag2) {
		while (this.current_arg < this.format.length) {
			var arg = this.format[this.current_arg];
			if (bufferlist.length < argument_length[arg]) return false;
			switch (arg) {
				case "C":
					this.data.push(bufferlist.getbyte());
					break;
				case "S":
				case "s":
					var b1 = bufferlist.getbyte();
					var b2 = bufferlist.getbyte();
					this.data.push(b2 * 256 + b1);
					break;
				case "l":
				case "L":
					var b1 = bufferlist.getbyte();
					var b2 = bufferlist.getbyte();
					var b3 = bufferlist.getbyte();
					var b4 = bufferlist.getbyte();
					this.data.push(((b4 * 256 + b3) * 256 + b2) * 256 + b1);
					break;
				case "x":
					bufferlist.getbyte();
					break;
			}
			this.current_arg++;
		}
		this.callback(this.data);
		return true;
	};
	function UnpackStream() {
		EventEmitter$4.call(this);
		this.readlist = [];
		this.length = 0;
		this.offset = 0;
		this.read_queue = [];
		this.write_queue = [];
		this.write_length = 0;
	}
	util$2.inherits(UnpackStream, EventEmitter$4);
	UnpackStream.prototype.write = function(buf) {
		this.readlist.push(buf);
		this.length += buf.length;
		this.resume();
	};
	UnpackStream.prototype.pipe = function(stream) {
		this.on("data", function(data) {
			stream.write(data);
		});
	};
	UnpackStream.prototype.unpack = function(format, callback) {
		this.read_queue.push(new ReadFormatRequest(format, callback));
		this.resume();
	};
	UnpackStream.prototype.unpackTo = function(destination, names_formats, callback) {
		var names$1 = [];
		var format = "";
		for (var i = 0; i < names_formats.length; ++i) {
			var off = 0;
			while (off < names_formats[i].length && names_formats[i][off] == "x") {
				format += "x";
				off++;
			}
			if (off < names_formats[i].length) {
				format += names_formats[i][off];
				var name = names_formats[i].substr(off + 2);
				names$1.push(name);
			}
		}
		this.unpack(format, function(data) {
			if (data.length != names$1.length) throw "Number of arguments mismatch, " + names$1.length + " fields and " + data.length + " arguments";
			for (var fld = 0; fld < data.length; ++fld) destination[names$1[fld]] = data[fld];
			callback(destination);
		});
	};
	UnpackStream.prototype.get = function(length, callback) {
		this.read_queue.push(new ReadFixedRequest(length, callback));
		this.resume();
	};
	UnpackStream.prototype.resume = function() {
		if (this.resumed) return;
		this.resumed = true;
		while (this.read_queue[0].execute(this)) {
			this.read_queue.shift();
			if (this.read_queue.length == 0) return;
		}
		this.resumed = false;
	};
	UnpackStream.prototype.getbyte = function() {
		var res = 0;
		var b = this.readlist[0];
		if (this.offset + 1 < b.length) {
			res = b[this.offset];
			this.offset++;
			this.length--;
		} else {
			res = b[this.offset];
			this.readlist.shift();
			this.length--;
			this.offset = 0;
		}
		return res;
	};
	UnpackStream.prototype.pack = function(format, args) {
		var packetlength = 0;
		var arg = 0;
		for (var i = 0; i < format.length; ++i) {
			var f = format[i];
			if (f == "x") packetlength++;
			else if (f == "p") packetlength += xutil$1.padded_length(args[arg++].length);
			else if (f == "a") {
				packetlength += args[arg].length;
				arg++;
			} else {
				packetlength += argument_length[f];
				arg++;
			}
		}
		var buf = new Buffer$2(packetlength);
		var offset = 0;
		var arg = 0;
		for (var i = 0; i < format.length; ++i) switch (format[i]) {
			case "x":
				buf[offset++] = 0;
				break;
			case "C":
				var n = args[arg++];
				buf[offset++] = n;
				break;
			case "s":
				var n = args[arg++];
				buf.writeInt16LE(n, offset);
				offset += 2;
				break;
			case "S":
				var n = args[arg++];
				buf[offset++] = n & 255;
				buf[offset++] = n >> 8 & 255;
				break;
			case "l":
				var n = args[arg++];
				buf.writeInt32LE(n, offset);
				offset += 4;
				break;
			case "L":
				var n = args[arg++];
				buf[offset++] = n & 255;
				buf[offset++] = n >> 8 & 255;
				buf[offset++] = n >> 16 & 255;
				buf[offset++] = n >> 24 & 255;
				break;
			case "a":
				var str = args[arg++];
				if (Buffer$2.isBuffer(str)) {
					str.copy(buf, offset);
					offset += str.length;
				} else for (var c = 0; c < str.length; ++c) buf[offset++] = str.charCodeAt(c);
				break;
			case "p":
				var str = args[arg++];
				var len = xutil$1.padded_length(str.length);
				var c = 0;
				for (; c < str.length; ++c) buf[offset++] = str.charCodeAt(c);
				for (; c < len; ++c) buf[offset++] = 0;
				break;
		}
		this.write_queue.push(buf);
		this.write_length += buf.length;
		return this;
	};
	UnpackStream.prototype.flush = function(stream) {
		for (var i = 0; i < this.write_queue.length; ++i) this.emit("data", this.write_queue[i]);
		this.write_queue = [];
		this.write_length = 0;
	};
	module.exports = UnpackStream;
}));
var require_hexy = /* @__PURE__ */ __commonJSMin(((exports) => {
	var hexy = function(buffer$1, config) {
		config = config || {};
		return new Hexy(buffer$1, config).toString();
	};
	var Hexy = function(buffer$1, config) {
		var self = this;
		self.buffer = buffer$1;
		self.width = config.width || 16;
		self.numbering = config.numbering == "none" ? "none" : "hex_bytes";
		self.groupSpacing = config.groupSpacing || 0;
		switch (config.format) {
			case "none":
			case "twos":
				self.format = config.format;
				break;
			default: self.format = "fours";
		}
		self.caps = config.caps == "upper" ? "upper" : "lower";
		self.annotate = config.annotate == "none" ? "none" : "ascii";
		self.prefix = config.prefix || "";
		self.indent = config.indent || 0;
		for (var i = 0; i != self.indent; ++i) self.prefix = " " + prefix;
		this.toString = function() {
			var str = "";
			var line_arr = lines();
			for (var i$1 = 0; i$1 != line_arr.length; ++i$1) {
				var hex_raw = line_arr[i$1], hex = hex_raw[0], raw = hex_raw[1];
				var howMany = hex.length;
				if (self.format === "fours") howMany = 4;
				else if (self.format === "twos") howMany = 2;
				var hex_formatted = "";
				var middle = Math.floor(self.width / 2) - 1;
				var groupSpaces = new Array(self.groupSpacing + 1).join(" ");
				for (var j = 0; j < hex.length; j += howMany) {
					var s = hex.substr(j, howMany);
					hex_formatted += s + (j / 2 === middle && self.groupSpacing > 0 ? groupSpaces : " ");
				}
				str += self.prefix;
				if (self.numbering === "hex_bytes") {
					str += pad(i$1 * self.width, 8);
					str += ": ";
				}
				var padlen = 0;
				switch (self.format) {
					case "fours":
						padlen = self.width * 2 + self.width / 2;
						break;
					case "twos":
						padlen = self.width * 3 + 2;
						break;
					default: padlen = self * 2;
				}
				str += rpad(hex_formatted, padlen);
				if (self.annotate === "ascii") {
					str += " ";
					str += raw.replace(/[\000-\040\177-\377]/g, ".");
				}
				str += "\n";
			}
			return str;
		};
		var lines = function() {
			var hex_raw = [];
			for (var i$1 = 0; i$1 < self.buffer.length; i$1 += self.width) {
				var begin = i$1, end = i$1 + self.width >= buffer$1.length ? buffer$1.length : i$1 + self.width, slice$2 = buffer$1.slice(begin, end), hex = self.caps === "upper" ? hexu(slice$2) : hexl(slice$2), raw = slice$2.toString("ascii");
				hex_raw.push([hex, raw]);
			}
			return hex_raw;
		};
		var hexl = function(buffer$2) {
			var str = "";
			for (var i$1 = 0; i$1 != buffer$2.length; ++i$1) str += pad(buffer$2[i$1], 2);
			return str;
		};
		var hexu = function(buffer$2) {
			return hexl(buffer$2).toUpperCase();
		};
		var pad = function(b, len) {
			var s = b.toString(16);
			while (s.length < len) s = "0" + s;
			return s;
		};
		var rpad = function(s, len) {
			while (s.length < len) s += " ";
			return s;
		};
	};
	exports.hexy = hexy;
}));
var require_xerrors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.errorText = {
		1: "Bad request",
		2: "Bad param value",
		3: "Bad window",
		4: "Bad pixmap",
		5: "Bad atom",
		6: "Bad cursor",
		7: "Bad font",
		8: "Bad match",
		9: "Bad drawable",
		10: "Bad access",
		11: "Bad alloc",
		12: "Bad colormap",
		13: "Bad GContext",
		14: "Bad ID choice",
		15: "Bad name",
		16: "Bad length",
		17: "Bad implementation"
	};
}));
var require_corereqs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var xutil = require_xutil();
	require_hexy().hexy;
	var valueMask = {
		CreateWindow: {
			backgroundPixmap: {
				mask: 1,
				format: "L"
			},
			backgroundPixel: {
				mask: 2,
				format: "L"
			},
			borderPixmap: {
				mask: 4,
				format: "L"
			},
			borderPixel: {
				mask: 8,
				format: "L"
			},
			bitGravity: {
				mask: 16,
				format: "Cxxx"
			},
			winGravity: {
				mask: 32,
				format: "Cxxx"
			},
			backingStore: {
				mask: 64,
				format: "Cxxx"
			},
			backingPlanes: {
				mask: 128,
				format: "L"
			},
			backingPixel: {
				mask: 256,
				format: "L"
			},
			overrideRedirect: {
				mask: 512,
				format: "Cxxx"
			},
			saveUnder: {
				mask: 1024,
				format: "Cxxx"
			},
			eventMask: {
				mask: 2048,
				format: "L"
			},
			doNotPropagateMask: {
				mask: 4096,
				format: "L"
			},
			colormap: {
				mask: 8192,
				format: "L"
			},
			cursor: {
				mask: 16384,
				format: "L"
			}
		},
		CreateGC: {
			"function": {
				mask: 1,
				format: "Cxxx"
			},
			planeMask: {
				mask: 2,
				format: "L"
			},
			foreground: {
				mask: 4,
				format: "L"
			},
			background: {
				mask: 8,
				format: "L"
			},
			lineWidth: {
				mask: 16,
				format: "Sxx"
			},
			lineStyle: {
				mask: 32,
				format: "Cxxx"
			},
			capStyle: {
				mask: 64,
				format: "Cxxx"
			},
			joinStyle: {
				mask: 128,
				format: "Cxxx"
			},
			fillStyle: {
				mask: 256,
				format: "Cxxx"
			},
			fillRule: {
				mask: 512,
				format: "Cxxx"
			},
			tile: {
				mask: 1024,
				format: "L"
			},
			stipple: {
				mask: 2048,
				format: "L"
			},
			tileStippleXOrigin: {
				mask: 4096,
				format: "sxx"
			},
			tileStippleYOrigin: {
				mask: 8192,
				format: "sxx"
			},
			font: {
				mask: 16384,
				format: "L"
			},
			subwindowMode: {
				mask: 32768,
				format: "Cxxx"
			},
			graphicsExposures: {
				mask: 65536,
				format: "Cxxx"
			},
			clipXOrigin: {
				mask: 131072,
				format: "Sxx"
			},
			clipYOrigin: {
				mask: 262144,
				format: "Sxx"
			},
			clipMask: {
				mask: 524288,
				format: "L"
			},
			dashOffset: {
				mask: 1048576,
				format: "Sxx"
			},
			dashes: {
				mask: 2097152,
				format: "Cxxx"
			},
			arcMode: {
				mask: 4194304,
				format: "Cxxx"
			}
		},
		ConfigureWindow: {
			x: {
				mask: 1,
				format: "sxx"
			},
			y: {
				mask: 2,
				format: "sxx"
			},
			width: {
				mask: 4,
				format: "Sxx"
			},
			height: {
				mask: 8,
				format: "Sxx"
			},
			borderWidth: {
				mask: 16,
				format: "Sxx"
			},
			sibling: {
				mask: 32,
				format: "L"
			},
			stackMode: {
				mask: 64,
				format: "Cxxx"
			}
		}
	};
	var valueMaskName = {};
	for (var req in valueMask) {
		var masks = valueMask[req];
		var names = valueMaskName[req] = {};
		for (var m in masks) names[masks[m].mask] = m;
	}
	function packValueMask(reqname, values) {
		var bitmask = 0;
		var masksList = [];
		var format = "";
		var reqValueMask = valueMask[reqname];
		var reqValueMaskName = valueMaskName[reqname];
		if (!reqValueMask) throw new Error(reqname + ": no value mask description");
		for (var value in values) {
			var v = reqValueMask[value];
			if (v) {
				var valueBit = v.mask;
				if (!valueBit) throw new Error(reqname + ": incorrect value param " + value);
				masksList.push(valueBit);
				bitmask |= valueBit;
			}
		}
		masksList.sort(function(a, b) {
			return a - b;
		});
		var args = [];
		for (m in masksList) {
			var valueName = reqValueMaskName[masksList[m]];
			format += reqValueMask[valueName].format;
			args.push(values[valueName]);
		}
		return [
			format,
			bitmask,
			args
		];
	}
	var templates = {
		CreateWindow: [function(id, parentId, x, y, width, height, borderWidth, depth, _class, visual, values) {
			if (borderWidth === void 0) borderWidth = 0;
			if (depth === void 0) depth = 0;
			if (_class === void 0) _class = 0;
			if (visual === void 0) visual = 0;
			if (values === void 0) values = {};
			var format = "CCSLLssSSSSLL";
			var vals = packValueMask("CreateWindow", values);
			var packetLength = 8 + (values ? vals[2].length : 0);
			var args = [
				1,
				depth,
				packetLength,
				id,
				parentId,
				x,
				y,
				width,
				height,
				borderWidth,
				_class,
				visual
			];
			format += vals[0];
			args.push(vals[1]);
			args = args.concat(vals[2]);
			return [format, args];
		}],
		ChangeWindowAttributes: [function(wid, values) {
			var format = "CxSLSxx";
			var vals = packValueMask("CreateWindow", values);
			var args = [
				2,
				3 + (values ? vals[2].length : 0),
				wid,
				vals[1]
			];
			var valArr = vals[2];
			format += vals[0];
			args = args.concat(valArr);
			return [format, args];
		}],
		GetWindowAttributes: [["CxSL", [3, 2]], function(buf, backingStore) {
			var res = buf.unpack("LSCCLLCCCCLLLS");
			var ret = { backingStore };
			"visual klass bitGravity winGravity backingPlanes backingPixel saveUnder mapIsInstalled mapState overrideRedirect colormap allEventMasks myEventMasks doNotPropogateMask".split(" ").forEach(function(field, index) {
				ret[field] = res[index];
			});
			return ret;
		}],
		DestroyWindow: [["CxSL", [4, 2]]],
		ChangeSaveSet: [function(isInsert, wid) {
			return ["CCSL", [
				6,
				isInsert ? 0 : 1,
				2,
				wid
			]];
		}],
		ReparentWindow: [["CxSLLss", [7, 4]]],
		MapWindow: [["CxSL", [8, 2]]],
		UnmapWindow: [["CxSL", [10, 2]]],
		ConfigureWindow: [function(win, options) {
			var vals = packValueMask("ConfigureWindow", options);
			var format = "CxSLSxx" + vals[0];
			var args = [
				12,
				vals[2].length + 3,
				win,
				vals[1]
			];
			args = args.concat(vals[2]);
			return [format, args];
		}],
		ResizeWindow: [function(win, width, height) {
			return module.exports.ConfigureWindow[0](win, {
				width,
				height
			});
		}],
		MoveWindow: [function(win, x, y) {
			return module.exports.ConfigureWindow[0](win, {
				x,
				y
			});
		}],
		MoveResizeWindow: [function(win, x, y, width, height) {
			return module.exports.ConfigureWindow[0](win, {
				x,
				y,
				width,
				height
			});
		}],
		RaiseWindow: [function(win) {
			return module.exports.ConfigureWindow[0](win, { stackMode: 0 });
		}],
		LowerWindow: [function(win) {
			return module.exports.ConfigureWindow[0](win, { stackMode: 1 });
		}],
		QueryTree: [["CxSL", [15, 2]], function(buf) {
			var tree = {};
			var res = buf.unpack("LLS");
			tree.root = res[0];
			tree.parent = res[1];
			tree.children = [];
			for (var i = 0; i < res[2]; ++i) tree.children.push(buf.unpack("L", 24 + i * 4)[0]);
			return tree;
		}],
		InternAtom: [function(returnOnlyIfExist, value) {
			var padded = xutil.padded_string(value);
			return ["CCSSxxa", [
				16,
				returnOnlyIfExist ? 1 : 0,
				2 + padded.length / 4,
				value.length,
				padded
			]];
		}, function(buf, seq_num) {
			var res = buf.unpack("L")[0];
			var pending_atom = this.pending_atoms[seq_num];
			if (!this.atoms[pending_atom]) {
				this.atoms[pending_atom] = res;
				this.atom_names[res] = pending_atom;
			}
			delete this.pending_atoms[seq_num];
			return res;
		}],
		GetAtomName: [["CxSL", [17, 2]], function(buf, seq_num) {
			var nameLen = buf.unpack("S")[0];
			var name = buf.unpackString(nameLen, 24);
			var pending_atom = this.pending_atoms[seq_num];
			if (!this.atoms[pending_atom]) {
				this.atom_names[pending_atom] = name;
				this.atoms[name] = pending_atom;
			}
			delete this.pending_atoms[seq_num];
			return name;
		}],
		ChangeProperty: [function(mode, wid, name, type, units, data) {
			var padded4 = data.length + 3 >> 2;
			var pad = new Buffer((padded4 << 2) - data.length);
			var format = "CCSLLLCxxxLaa";
			var requestLength = 6 + padded4;
			var dataLenInFormatUnits = data.length / (units >> 3);
			return [format, [
				18,
				mode,
				requestLength,
				wid,
				name,
				type,
				units,
				dataLenInFormatUnits,
				data,
				pad
			]];
		}],
		DeleteProperty: [function(wid, prop) {
			return ["CxSLL", [
				19,
				3,
				wid,
				prop
			]];
		}],
		GetProperty: [function(del, wid, name, type, longOffset, longLength) {
			return ["CCSLLLLL", [
				20,
				del,
				6,
				wid,
				name,
				type,
				longOffset,
				longLength
			]];
		}, function(buf, format) {
			var res = buf.unpack("LLL");
			var prop = {};
			prop.type = res[0];
			prop.bytesAfter = res[1];
			var len = res[2] * (format >> 3);
			prop.data = buf.slice(24, 24 + len);
			return prop;
		}],
		ListProperties: [function(wid) {
			return ["CxSL", [
				21,
				2,
				wid
			]];
		}, function(buf) {
			var n = buf.unpack("S")[0];
			var i;
			var atoms = [];
			for (i = 0; i < n; ++i) atoms.push(buf.unpack("L", 24 + 4 * i)[0]);
			return atoms;
		}],
		SetSelectionOwner: [function(owner, selection, time) {
			if (!time) time = 0;
			return ["CxSLLL", [
				22,
				4,
				owner,
				selection,
				time
			]];
		}],
		GetSelectionOwner: [function(selection) {
			return ["CxSL", [
				23,
				2,
				selection
			]];
		}, function(buf) {
			return buf.unpack("L")[0];
		}],
		ConvertSelection: [function(requestor, selection, target, property$5, time) {
			if (!time) time = 0;
			return ["CxSLLLLL", [
				24,
				6,
				requestor,
				selection,
				target,
				property$5,
				time
			]];
		}],
		SendEvent: [function(destination, propagate, eventMask, eventRawData) {
			return ["CCSLLa", [
				25,
				propagate,
				11,
				destination,
				eventMask,
				eventRawData
			]];
		}],
		GrabPointer: [function(wid, ownerEvents, mask, pointerMode, keybMode, confineTo, cursor, time) {
			return ["CCSLSCCLLL", [
				26,
				ownerEvents,
				6,
				wid,
				mask,
				pointerMode,
				keybMode,
				confineTo,
				cursor,
				time
			]];
		}, function(buf, status) {
			return status;
		}],
		UngrabPointer: [function(time) {
			return ["CxSL", [
				27,
				2,
				time
			]];
		}],
		GrabButton: [function(wid, ownerEvents, mask, pointerMode, keybMode, confineTo, cursor, button, modifiers) {
			return ["CCSLSCCLLCxS", [
				28,
				ownerEvents,
				6,
				wid,
				mask,
				pointerMode,
				keybMode,
				confineTo,
				cursor,
				button,
				modifiers
			]];
		}],
		UngrabButton: [function(wid, button, modifiers) {
			return ["CCSLSxx", [
				29,
				button,
				3,
				wid,
				modifiers
			]];
		}],
		ChangeActivePointerGrab: [function(cursor, time, mask) {
			return ["CxSLLSxx", [
				30,
				4,
				cursor,
				time,
				mask
			]];
		}],
		GrabKeyboard: [function(wid, ownerEvents, time, pointerMode, keybMode) {
			return ["CCSLLCCxx", [
				31,
				ownerEvents,
				4,
				wid,
				time,
				pointerMode,
				keybMode
			]];
		}, function(buf, status) {
			return status;
		}],
		UngrabKeyboard: [function(time) {
			return ["CxSL", [
				32,
				2,
				time
			]];
		}],
		GrabKey: [function(wid, ownerEvents, modifiers, key$1, pointerMode, keybMode) {
			return ["CCSLSCCCxxx", [
				33,
				ownerEvents,
				4,
				wid,
				modifiers,
				key$1,
				pointerMode,
				keybMode
			]];
		}],
		UngrabKey: [function(wid, key$1, modifiers) {
			return ["CCSLSxx", [
				34,
				key$1,
				3,
				wid,
				modifiers
			]];
		}],
		AllowEvents: [function(mode, ts) {
			return ["CCSL", [
				35,
				mode,
				2,
				ts
			]];
		}],
		GrabServer: [["CxS", [36, 1]]],
		UngrabServer: [["CxS", [37, 1]]],
		QueryPointer: [["CxSL", [38, 2]], function(buf, sameScreen) {
			var res = buf.unpack("LLssssS");
			return {
				root: res[0],
				child: res[1],
				rootX: res[2],
				rootY: res[3],
				childX: res[4],
				childY: res[5],
				keyMask: res[6],
				sameScreen
			};
		}],
		TranslateCoordinates: [function(srcWid, dstWid, srcX, srcY) {
			return ["CxSLLSS", [
				40,
				4,
				srcWid,
				dstWid,
				srcX,
				srcY
			]];
		}, function(buf, sameScreen) {
			var res = buf.unpack("Lss");
			var ext = {};
			ext.child = res[0];
			ext.destX = res[1];
			ext.destY = res[2];
			ext.sameScreen = sameScreen;
			return ext;
		}],
		SetInputFocus: [function(wid, revertTo) {
			return ["CCSLL", [
				42,
				revertTo,
				3,
				wid,
				0
			]];
		}],
		GetInputFocus: [function() {
			return ["CxS", [43, 1]];
		}, function(buf, revertTo) {
			return {
				focus: buf.unpack("L")[0],
				revertTo
			};
		}],
		WarpPointer: [function(srcWin, dstWin, srcX, srcY, srcWidth, srcHeight, dstX, dstY) {
			return ["CxSLLssSSss", [
				41,
				6,
				srcWin,
				dstWin,
				srcX,
				srcY,
				srcWidth,
				srcHeight,
				dstX,
				dstY
			]];
		}],
		ListFonts: [function(pattern, max$2) {
			return ["CxSSSp", [
				49,
				2 + xutil.padded_length(pattern.length) / 4,
				max$2,
				pattern.length,
				pattern
			]];
		}, function(buf) {
			console.log(buf);
			var res = [];
			var off = 24;
			while (off < buf.length) {
				var len = buf[off++];
				if (len == 0) break;
				if (off + len > buf.length) {
					len = buf.length - off;
					if (len <= 0) break;
				}
				res.push(buf.unpackString(len, off));
				off += len;
			}
			return res;
		}],
		CreatePixmap: [function(pid, drawable, depth, width, height) {
			return ["CCSLLSS", [
				53,
				depth,
				4,
				pid,
				drawable,
				width,
				height
			]];
		}],
		FreePixmap: [function(pixmap) {
			return ["CxSL", [
				54,
				2,
				pixmap
			]];
		}],
		CreateCursor: [function(cid, source, mask, foreRGB, backRGB, x, y) {
			foreR = foreRGB.R;
			foreG = foreRGB.G;
			foreB = foreRGB.B;
			backR = backRGB.R;
			backG = backRGB.G;
			backB = backRGB.B;
			return ["CxSLLLSSSSSSSS", [
				93,
				8,
				cid,
				source,
				mask,
				foreR,
				foreG,
				foreB,
				backR,
				backG,
				backB,
				x,
				y
			]];
		}],
		CreateGC: [function(cid, drawable, values) {
			var format = "CxSLLL";
			var vals = packValueMask("CreateGC", values);
			var args = [
				55,
				4 + (values ? vals[2].length : 0),
				cid,
				drawable
			];
			format += vals[0];
			args.push(vals[1]);
			args = args.concat(vals[2]);
			return [format, args];
		}],
		ChangeGC: [function(cid, values) {
			var format = "CxSLL";
			var vals = packValueMask("CreateGC", values);
			var args = [
				56,
				3 + (values ? vals[2].length : 0),
				cid
			];
			format += vals[0];
			args.push(vals[1]);
			args = args.concat(vals[2]);
			return [format, args];
		}],
		ClearArea: [function(wid, x, y, width, height, exposures) {
			return ["CCSLssSS", [
				61,
				exposures,
				4,
				wid,
				x,
				y,
				width,
				height
			]];
		}],
		CopyArea: [function(srcDrawable, dstDrawable, gc, srcX, srcY, dstX, dstY, width, height) {
			return ["CxSLLLssssSS", [
				62,
				7,
				srcDrawable,
				dstDrawable,
				gc,
				srcX,
				srcY,
				dstX,
				dstY,
				width,
				height
			]];
		}],
		PolyPoint: [function(coordMode, drawable, gc, points) {
			var format = "CCSLL";
			var args = [
				64,
				coordMode,
				3 + points.length / 2,
				drawable,
				gc
			];
			for (var i = 0; i < points.length; ++i) {
				format += "S";
				args.push(points[i]);
			}
			return [format, args];
		}],
		PolyLine: [function(coordMode, drawable, gc, points) {
			var format = "CCSLL";
			var args = [
				65,
				coordMode,
				3 + points.length / 2,
				drawable,
				gc
			];
			for (var i = 0; i < points.length; ++i) {
				format += "S";
				args.push(points[i]);
			}
			return [format, args];
		}],
		PolyFillRectangle: [function(drawable, gc, coords) {
			var format = "CxSLL";
			var args = [
				70,
				3 + coords.length / 2,
				drawable,
				gc
			];
			for (var i = 0; i < coords.length; ++i) {
				format += "S";
				args.push(coords[i]);
			}
			return [format, args];
		}],
		PolyFillArc: [function(drawable, gc, coords) {
			var format = "CxSLL";
			var args = [
				71,
				3 + coords.length / 2,
				drawable,
				gc
			];
			for (var i = 0; i < coords.length; ++i) {
				format += "S";
				args.push(coords[i]);
			}
			return [format, args];
		}],
		PutImage: [function(format, drawable, gc, width, height, dstX, dstY, leftPad, depth, data) {
			var padded = xutil.padded_length(data.length);
			var reqLen = 6 + padded / 4;
			var padLength = padded - data.length;
			var pad = new Buffer(padLength);
			return ["CCSLLLSSssCCxxaa", [
				72,
				format,
				0,
				1 + reqLen,
				drawable,
				gc,
				width,
				height,
				dstX,
				dstY,
				leftPad,
				depth,
				data,
				pad
			]];
		}],
		GetImage: [function(format, drawable, x, y, width, height, planeMask) {
			return ["CCSLssSSL", [
				73,
				format,
				5,
				drawable,
				x,
				y,
				width,
				height,
				planeMask
			]];
		}, function(buf, depth) {
			var visualId = buf.unpack("L")[0];
			return {
				depth,
				visualId,
				data: buf.slice(24)
			};
		}],
		PolyText8: [function(drawable, gc, x, y, items) {
			var format = "CxSLLss";
			var numItems = items.length;
			var reqLen = 16;
			var args = [
				74,
				0,
				drawable,
				gc,
				x,
				y
			];
			for (var i = 0; i < numItems; ++i) {
				var it = items[i];
				if (typeof it == "string") {
					if (it.length > 254) throw "not supported yet";
					format += "CCa";
					args.push(it.length);
					args.push(0);
					args.push(it);
					reqLen += 2 + it.length;
				} else throw "not supported yet";
			}
			var len4 = xutil.padded_length(reqLen) / 4;
			var padLen = len4 * 4 - reqLen;
			args[1] = len4;
			var pad = "";
			for (var i = 0; i < padLen; ++i) pad += String.fromCharCode(0);
			format += "a";
			args.push(pad);
			return [format, args];
		}],
		CreateColormap: [function(cmid, wid, vid, alloc) {
			return ["CCSLLL", [
				78,
				alloc,
				4,
				cmid,
				wid,
				vid
			]];
		}],
		AllocColor: [["CxSLSSSxx", [84, 4]], function(buf) {
			var res = buf.unpack("SSSxL");
			var color = {};
			color.red = res[0];
			color.blue = res[1];
			color.green = res[2];
			color.pixel = res[3] >> 8;
			return color;
		}],
		QueryExtension: [function(name) {
			var padded = xutil.padded_string(name);
			return ["CxSSxxa", [
				98,
				2 + padded.length / 4,
				name.length,
				padded
			]];
		}, function(buf) {
			var res = buf.unpack("CCCC");
			var ext = {};
			ext.present = res[0];
			ext.majorOpcode = res[1];
			ext.firstEvent = res[2];
			ext.firstError = res[3];
			return ext;
		}],
		ListExtensions: [["CxS", [99, 1]], function(buf) {
			var res = [];
			var off = 24;
			while (off < buf.length) {
				var len = buf[off++];
				if (len == 0) break;
				if (off + len > buf.length) {
					len = buf.length - off;
					if (len <= 0) break;
				}
				res.push(buf.unpackString(len, off));
				off += len;
			}
			return res;
		}],
		GetKeyboardMapping: [function(startCode, num) {
			return ["CxSCCxx", [
				101,
				2,
				startCode,
				num
			]];
		}, function(buff, listLength) {
			var res = [];
			var format = "";
			for (var i = 0; i < listLength; ++i) format += "L";
			for (var offset = 24; offset < buff.length - 4 * listLength; offset += 4 * listLength) res.push(buff.unpack(format, offset));
			return res;
		}],
		GetGeometry: [function(drawable) {
			return ["CxSL", [
				14,
				2,
				drawable
			]];
		}, function(buff, depth) {
			var res = buff.unpack("LssSSSx");
			var ext = {};
			ext.windowid = res[0];
			ext.xPos = res[1];
			ext.yPos = res[2];
			ext.width = res[3];
			ext.height = res[4];
			ext.borderWidth = res[5];
			ext.depth = depth;
			return ext;
		}],
		KillClient: [function(resource) {
			return ["CxSL", [
				113,
				2,
				resource
			]];
		}],
		SetScreenSaver: [function(timeout, interval, preferBlanking, allowExposures) {
			return ["CxSssCCxx", [
				107,
				3,
				timeout,
				interval,
				preferBlanking,
				allowExposures
			]];
		}],
		ForceScreenSaver: [function(activate) {
			return ["CCS", [
				115,
				activate ? 1 : 0,
				1
			]];
		}]
	};
	templates.KillKlient = templates.KillClient;
	module.exports = templates;
}));
var require_stdatoms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		PRIMARY: 1,
		SECONDARY: 2,
		ARC: 3,
		ATOM: 4,
		BITMAP: 5,
		CARDINAL: 6,
		COLORMAP: 7,
		CURSOR: 8,
		CUT_BUFFER0: 9,
		CUT_BUFFER1: 10,
		CUT_BUFFER2: 11,
		CUT_BUFFER3: 12,
		CUT_BUFFER4: 13,
		CUT_BUFFER5: 14,
		CUT_BUFFER6: 15,
		CUT_BUFFER7: 16,
		DRAWABLE: 17,
		FONT: 18,
		INTEGER: 19,
		PIXMAP: 20,
		POINT: 21,
		RECTANGLE: 22,
		RESOURCE_MANAGER: 23,
		RGB_COLOR_MAP: 24,
		RGB_BEST_MAP: 25,
		RGB_BLUE_MAP: 26,
		RGB_DEFAULT_MAP: 27,
		RGB_GRAY_MAP: 28,
		RGB_GREEN_MAP: 29,
		RGB_RED_MAP: 30,
		STRING: 31,
		VISUALID: 32,
		WINDOW: 33,
		WM_COMMAND: 34,
		WM_HINTS: 35,
		WM_CLIENT_MACHINE: 36,
		WM_ICON_NAME: 37,
		WM_ICON_SIZE: 38,
		WM_NAME: 39,
		WM_NORMAL_HINTS: 40,
		WM_SIZE_HINTS: 41,
		WM_ZOOM_HINTS: 42,
		MIN_SPACE: 43,
		NORM_SPACE: 44,
		MAX_SPACE: 45,
		END_SPACE: 46,
		SUPERSCRIPT_X: 47,
		SUPERSCRIPT_Y: 48,
		SUBSCRIPT_X: 49,
		SUBSCRIPT_Y: 50,
		UNDERLINE_POSITION: 51,
		UNDERLINE_THICKNESS: 52,
		STRIKEOUT_ASCENT: 53,
		STRIKEOUT_DESCENT: 54,
		ITALIC_ANGLE: 55,
		X_HEIGHT: 56,
		QUAD_WIDTH: 57,
		WEIGHT: 58,
		POINT_SIZE: 59,
		RESOLUTION: 60,
		COPYRIGHT: 61,
		NOTICE: 62,
		FONT_NAME: 63,
		FAMILY_NAME: 64,
		FULL_NAME: 65,
		CAP_HEIGHT: 66,
		WM_CLASS: 67,
		WM_TRANSIENT_FOR: 68
	};
}));
var require_eventmask = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.eventMask = {
		KeyPress: 1,
		KeyRelease: 2,
		ButtonPress: 4,
		ButtonRelease: 8,
		EnterWindow: 16,
		LeaveWindow: 32,
		PointerMotion: 64,
		PointerMotionHint: 128,
		Button1Motion: 256,
		Button2Motion: 512,
		Button3Motion: 1024,
		Button4Motion: 2048,
		Button5Motion: 4096,
		ButtonMotion: 8192,
		KeymapState: 16384,
		Exposure: 32768,
		VisibilityChange: 65536,
		StructureNotify: 131072,
		ResizeRedirect: 262144,
		SubstructureNotify: 524288,
		SubstructureRedirect: 1048576,
		FocusChange: 2097152,
		PropertyChange: 4194304,
		ColormapChange: 8388608,
		OwnerGrabButton: 16777216
	};
}));
var require_xcore = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util$1 = __require("util");
	var net$3 = __require("net");
	var handshake = require_handshake();
	var EventEmitter$3 = __require("events").EventEmitter;
	var PackStream$1 = require_unpackstream();
	require_hexy().hexy;
	var Buffer$1 = __require("buffer").Buffer;
	require_unpackbuffer().addUnpack(Buffer$1);
	var os$1 = __require("os");
	var xerrors = require_xerrors();
	var coreRequests = require_corereqs();
	var stdatoms = require_stdatoms();
	var em$1 = require_eventmask().eventMask;
	function XClient(displayNum, screenNum, options) {
		EventEmitter$3.call(this);
		this.options = options ? options : {};
		this.core_requests = {};
		this.ext_requests = {};
		this.displayNum = displayNum;
		this.screenNum = screenNum;
	}
	util$1.inherits(XClient, EventEmitter$3);
	XClient.prototype.init = function(stream) {
		this.stream = stream;
		this.authHost = stream.remoteAddress;
		this.authFamily = stream._getpeername ? stream._getpeername().family : stream.remoteFamily;
		if (!this.authHost || this.authHost === "127.0.0.1" || this.authHost === "::1") {
			this.authHost = os$1.hostname();
			this.authFamily = null;
		}
		var pack_stream = new PackStream$1();
		var client = this;
		pack_stream.on("data", function(data) {
			stream.write(data);
		});
		stream.on("data", function(data) {
			pack_stream.write(data);
		});
		stream.on("end", function() {
			client.emit("end");
		});
		this.pack_stream = pack_stream;
		this.rsrc_id = 0;
		var cli = this;
		if (cli.options.debug) {
			this.seq_num_ = 0;
			this.seq2stack = {};
			Object.defineProperty(cli, "seq_num", {
				set: function(v) {
					cli.seq_num_ = v;
					var err = /* @__PURE__ */ new Error();
					Error.captureStackTrace(err, arguments.callee);
					err.timestamp = Date.now();
					cli.seq2stack[client.seq_num] = err;
				},
				get: function() {
					return cli.seq_num_;
				}
			});
		} else this.seq_num = 0;
		this.replies = {};
		this.atoms = stdatoms;
		this.atom_names = (function() {
			var names$1 = {};
			Object.keys(stdatoms).forEach(function(key$1) {
				names$1[stdatoms[key$1]] = key$1;
			});
			return names$1;
		})();
		this.eventMask = em$1;
		this.event_consumers = {};
		this.eventParsers = {};
		this.errorParsers = {};
		this._extensions = {};
		this.importRequestsFromTemplates(this, coreRequests);
		this.startHandshake();
		this._closing = false;
		this._unusedIds = [];
	};
	XClient.prototype.terminate = function() {
		this.stream.end();
	};
	XClient.prototype.ping = function(cb) {
		var start = Date.now();
		this.GetAtomName(3, function(err, str) {
			if (err) return cb(err);
			return cb(null, Date.now() - start);
		});
	};
	XClient.prototype.close = function(cb) {
		var cli = this;
		cli.ping(function(err) {
			if (err) return cb(err);
			cli.terminate();
			if (cb) cb();
		});
		cli._closing = true;
	};
	XClient.prototype.importRequestsFromTemplates = function(target, reqs) {
		var client = this;
		this.pending_atoms = {};
		for (var r in reqs) target[r] = (function(reqName) {
			return function req_proxy() {
				if (client._closing) throw new Error("client is in closing state");
				if (client.seq_num == 65535) client.seq_num = 0;
				else client.seq_num++;
				var args = Array.prototype.slice.call(req_proxy.arguments);
				var callback = args.length > 0 ? args[args.length - 1] : null;
				if (callback && callback.constructor.name != "Function") callback = null;
				var reqReplTemplate = reqs[reqName];
				var reqTemplate = reqReplTemplate[0];
				var templateType = typeof reqTemplate;
				if (templateType == "object") templateType = reqTemplate.constructor.name;
				if (templateType == "function") {
					if (reqName === "InternAtom") {
						var value = req_proxy.arguments[1];
						if (client.atoms[value]) {
							--client.seq_num;
							return setImmediate(function() {
								callback(void 0, client.atoms[value]);
							});
						} else client.pending_atoms[client.seq_num] = value;
					}
					var reqPack = reqTemplate.apply(this, req_proxy.arguments);
					var format = reqPack[0];
					var requestArguments = reqPack[1];
					if (callback) this.replies[this.seq_num] = [reqReplTemplate[1], callback];
					client.pack_stream.pack(format, requestArguments);
					client.pack_stream.write_queue[0];
					client.pack_stream.flush();
				} else if (templateType == "Array") {
					if (reqName === "GetAtomName") {
						var atom = req_proxy.arguments[0];
						if (client.atom_names[atom]) {
							--client.seq_num;
							return setImmediate(function() {
								callback(void 0, client.atom_names[atom]);
							});
						} else client.pending_atoms[client.seq_num] = atom;
					}
					var format = reqTemplate[0];
					var requestArguments = [];
					for (var a = 0; a < reqTemplate[1].length; ++a) requestArguments.push(reqTemplate[1][a]);
					for (var a in args) requestArguments.push(args[a]);
					if (callback) this.replies[this.seq_num] = [reqReplTemplate[1], callback];
					client.pack_stream.pack(format, requestArguments);
					client.pack_stream.flush();
				} else throw "unknown request format - " + templateType;
			};
		})(r);
	};
	XClient.prototype.AllocID = function() {
		if (this._unusedIds.length > 0) return this._unusedIds.pop();
		this.display.rsrc_id++;
		return (this.display.rsrc_id << this.display.rsrc_shift) + this.display.resource_base;
	};
	XClient.prototype.ReleaseID = function(id) {
		this._unusedIds.push(id);
	};
	XClient.prototype.unpackEvent = function(type, seq, extra, code, raw, headerBuf) {
		var event = {};
		type = type & 127;
		event.type = type;
		event.seq = seq;
		var extUnpacker = this.eventParsers[type];
		if (extUnpacker) return extUnpacker(type, seq, extra, code, raw);
		if (type == 2 || type == 3 || type == 4 || type == 5 || type == 6) {
			var values = raw.unpack("LLLssssSC");
			event.name = [
				,
				,
				"KeyPress",
				"KeyRelease",
				"ButtonPress",
				"ButtonRelease",
				"MotionNotify"
			][type];
			event.time = extra;
			event.keycode = code;
			event.root = values[0];
			event.wid = values[1];
			event.child = values[2];
			event.rootx = values[3];
			event.rooty = values[4];
			event.x = values[5];
			event.y = values[6];
			event.buttons = values[7];
			event.sameScreen = values[8];
		} else if (type == 7 || type == 8) {
			event.name = type === 7 ? "EnterNotify" : "LeaveNotify";
			var values = raw.unpack("LLLssssSC");
			event.root = values[0];
			event.wid = values[1];
			event.child = values[2];
			event.rootx = values[3];
			event.rooty = values[4];
			event.x = values[5];
			event.y = values[6];
			event.values = values;
		} else if (type == 12) {
			var values = raw.unpack("SSSSS");
			event.name = "Expose";
			event.wid = extra;
			event.x = values[0];
			event.y = values[1];
			event.width = values[2];
			event.height = values[3];
			event.count = values[4];
		} else if (type == 16) {
			var values = raw.unpack("LssSSSc");
			event.name = "CreateNotify";
			event.parent = extra;
			event.wid = values[0];
			event.x = values[1];
			event.y = values[2];
			event.width = values[3];
			event.height = values[4];
			event.borderWidth = values[5];
			event.overrideRedirect = values[6] ? true : false;
		} else if (type == 17) {
			var values = raw.unpack("L");
			event.name = "DestroyNotify";
			event.event = extra;
			event.wid = values[0];
		} else if (type == 18) {
			var values = raw.unpack("LC");
			event.name = "UnmapNotify";
			event.event = extra;
			event.wid = values[0];
			event.fromConfigure = values[1] ? true : false;
		} else if (type == 19) {
			var values = raw.unpack("LC");
			event.name = "MapNotify";
			event.event = extra;
			event.wid = values[0];
			event.overrideRedirect = values[1] ? true : false;
		} else if (type == 20) {
			var values = raw.unpack("L");
			event.name = "MapRequest";
			event.parent = extra;
			event.wid = values[0];
		} else if (type == 22) {
			var values = raw.unpack("LLssSSSC");
			event.name = "ConfigureNotify";
			event.wid = extra;
			event.wid1 = values[0];
			event.aboveSibling = values[1];
			event.x = values[2];
			event.y = values[3];
			event.width = values[4];
			event.height = values[5];
			event.borderWidth = values[6];
			event.overrideRedirect = values[7];
		} else if (type == 23) {
			var values = raw.unpack("LLssSSSS");
			event.name = "ConfigureRequest";
			event.stackMode = code;
			event.parent = extra;
			event.wid = values[0];
			event.sibling = values[1];
			event.x = values[2];
			event.y = values[3];
			event.width = values[4];
			event.height = values[5];
			event.borderWidth = values[6];
			event.mask = values[6];
		} else if (type == 28) {
			event.name = "PropertyNotify";
			var values = raw.unpack("LLC");
			event.wid = extra;
			event.atom = values[0];
			event.time = values[1];
			event.state = values[2];
		} else if (type == 29) {
			event.name = "SelectionClear";
			event.time = extra;
			var values = raw.unpack("LL");
			event.owner = values[0];
			event.selection = values[1];
		} else if (type == 30) {
			event.name = "SelectionRequest";
			event.time = extra;
			var values = raw.unpack("LLLLL");
			event.owner = values[0];
			event.requestor = values[1];
			event.selection = values[2];
			event.target = values[3];
			event.property = values[4];
		} else if (type == 31) {
			event.name = "SelectionNotify";
			event.time = extra;
			var values = raw.unpack("LLLL");
			event.requestor = values[0];
			event.selection = values[1];
			event.target = values[2];
			event.property = values[3];
		} else if (type == 33) {
			event.name = "ClientMessage";
			event.format = code;
			event.wid = extra;
			event.message_type = raw.unpack("L")[0];
			var format = code === 32 ? "LLLLL" : code === 16 ? "SSSSSSSSSS" : "CCCCCCCCCCCCCCCCCCCC";
			event.data = raw.unpack(format, 4);
		} else if (type == 34) {
			event.name = "MappingNotify";
			event.request = headerBuf[4];
			event.firstKeyCode = headerBuf[5];
			event.count = headerBuf[6];
		}
		return event;
	};
	XClient.prototype.expectReplyHeader = function() {
		var client = this;
		client.pack_stream.get(8, function(headerBuf) {
			var res = headerBuf.unpack("CCSL");
			var type = res[0];
			var seq_num = res[2];
			var bad_value = res[3];
			if (type == 0) {
				var error_code = res[1];
				var error = /* @__PURE__ */ new Error();
				error.error = error_code;
				error.seq = seq_num;
				if (client.options.debug) {
					error.longstack = client.seq2stack[error.seq];
					console.log(client.seq2stack[error.seq].stack);
				}
				client.pack_stream.get(24, function(buf) {
					var res$1 = buf.unpack("SC");
					error.message = xerrors.errorText[error_code];
					error.badParam = bad_value;
					error.minorOpcode = res$1[0];
					error.majorOpcode = res$1[1];
					var extUnpacker = client.errorParsers[error_code];
					if (extUnpacker) extUnpacker(error, error_code, seq_num, bad_value, buf);
					var handler = client.replies[seq_num];
					if (handler) {
						var callback = handler[1];
						if (!callback(error)) client.emit("error", error);
						if (client.options.debug) delete client.seq2stack[seq_num];
						delete client.replies[seq_num];
					} else client.emit("error", error);
					client.expectReplyHeader();
				});
				return;
			} else if (type > 1) {
				client.pack_stream.get(24, function(buf) {
					var extra = res[3];
					var code = res[1];
					var ev = client.unpackEvent(type, seq_num, extra, code, buf, headerBuf);
					ev.rawData = new Buffer$1(32);
					headerBuf.copy(ev.rawData);
					buf.copy(ev.rawData, 8);
					client.emit("event", ev);
					var ee = client.event_consumers[ev.wid];
					if (ee) ee.emit("event", ev);
					if (ev.parent) {
						ee = client.event_consumers[ev.parent];
						if (ee) ee.emit("child-event", ev);
					}
					client.expectReplyHeader();
				});
				return;
			}
			var opt_data = res[1];
			var bodylength = 24 + res[3] * 4;
			client.pack_stream.get(bodylength, function(data) {
				var handler = client.replies[seq_num];
				if (handler) {
					var unpack = handler[0];
					if (client.pending_atoms[seq_num]) opt_data = seq_num;
					var result = unpack.call(client, data, opt_data);
					var callback = handler[1];
					callback(null, result);
					delete client.replies[seq_num];
				}
				client.expectReplyHeader();
			});
		});
	};
	XClient.prototype.startHandshake = function() {
		var client = this;
		handshake.writeClientHello(this.pack_stream, this.displayNum, this.authHost, this.authFamily);
		handshake.readServerHello(this.pack_stream, function(err, display) {
			if (err) {
				client.emit("error", err);
				return;
			}
			client.expectReplyHeader();
			client.display = display;
			display.client = client;
			client.emit("connect", display);
		});
	};
	XClient.prototype.require = function(extName, callback) {
		var self = this;
		var ext = this._extensions[extName];
		if (ext) return process.nextTick(function() {
			callback(null, ext);
		});
		ext = __require("./ext/" + extName);
		ext.requireExt(this.display, function(err, _ext) {
			if (err) return callback(err);
			self._extensions[extName] = _ext;
			callback(null, _ext);
		});
	};
	module.exports.createClient = function(options, initCb) {
		if (typeof options === "function") {
			initCb = options;
			options = {};
		}
		if (!options) options = {};
		var display = options.display;
		if (!display) display = process.env.DISPLAY ? process.env.DISPLAY : ":0";
		var displayMatch = display.match(/^(?:[^:]*?\/)?(.*):(\d+)(?:.(\d+))?$/);
		if (!displayMatch) throw new Error("Cannot parse display");
		var host = displayMatch[1];
		var displayNum = displayMatch[2];
		if (!displayNum) displayNum = 0;
		var screenNum = displayMatch[3];
		if (!screenNum) screenNum = 0;
		var stream;
		var connected = false;
		var cbCalled = false;
		var socketPath;
		if ([
			"cygwin",
			"win32",
			"win64"
		].indexOf(process.platform) < 0) {
			if (process.platform == "darwin" || process.platform == "mac") {
				if (display[0] == "/") socketPath = display;
			} else if (!host) socketPath = "/tmp/.X11-unix/X" + displayNum;
		}
		var client = new XClient(displayNum, screenNum, options);
		var connectStream = function() {
			if (socketPath) stream = net$3.createConnection(socketPath);
			else stream = net$3.createConnection(6e3 + parseInt(displayNum), host);
			stream.on("connect", function() {
				connected = true;
				client.init(stream);
			});
			stream.on("error", function(err) {
				if (!connected && socketPath && err.code === "ENOENT") {
					socketPath = null;
					host = "localhost";
					connectStream();
				} else if (initCb && !cbCalled) {
					cbCalled = true;
					initCb(err);
				} else client.emit("error", err);
			});
		};
		connectStream();
		if (initCb) client.on("connect", function(display$1) {
			if (!options.disableBigRequests) client.require("big-requests", function(err, BigReq) {
				if (err) return initCb(err);
				BigReq.Enable(function(err$1, maxLen) {
					display$1.max_request_length = maxLen;
					cbCalled = true;
					initCb(void 0, display$1);
				});
			});
			else {
				cbCalled = true;
				initCb(void 0, display$1);
			}
		});
		return client;
	};
}));
var require_xserver = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util = __require("util");
	var net$2 = __require("net");
	var PackStream = require_unpackstream();
	var EventEmitter$2 = __require("events").EventEmitter;
	function XServer(servsock, params) {
		var server$1 = this;
		EventEmitter$2.call(this);
		servsock.on("connection", function(stream) {
			var cli = new XServerClientConnection(stream, params);
			server$1.emit("connection", cli);
		});
	}
	util.inherits(XServer, EventEmitter$2);
	function XServerClientConnection(stream, params) {
		EventEmitter$2.call(this);
		this.params = params;
		var serv = this;
		serv.stream = stream;
		serv.pack_stream = new PackStream();
		serv.pack_stream.on("data", function(data) {
			serv.stream.write(data);
		});
		stream.on("data", function(data) {
			serv.pack_stream.write(data);
		});
		serv.sequence = 0;
		serv.readClientHandshake();
	}
	util.inherits(XServerClientConnection, EventEmitter$2);
	XServerClientConnection.prototype.readClientHandshake = function() {
		var serv = this;
		var hello = {};
		serv.pack_stream.unpackTo(hello, [
			"C byteOrder",
			"x",
			"S protocolMajor",
			"S protocolMinor",
			"S authTypeLength",
			"S authDataLength",
			"x",
			"x"
		], function() {
			console.log(hello);
			serv.pack_stream.get(hello.authTypeLength, function(authType) {
				serv.pack_stream.get(hello.authDataLength, function(authData) {
					serv.byteOrder = hello.byteOrder;
					serv.protocolMajor = hello.protocolMajor;
					serv.protocolMinor = hello.protocolMinor;
					serv.checkAuth(authType.toString("ascii"), authData);
				});
			});
		});
	};
	XServerClientConnection.prototype.checkAuth = function(authType, authData) {
		var serv = this;
		console.log("check auth");
		console.log([authType, authData.toString()]);
		var stream = serv.pack_stream;
		var hello = __require("fs").readFileSync("hello1.bin");
		stream.pack("CxSSSa", [
			1,
			11,
			0,
			hello.length / 4,
			hello
		]);
		stream.flush();
		serv.expectMessage();
	};
	XServerClientConnection.prototype.expectMessage = function() {
		var serv = this;
		console.log("expecting messages");
		serv.pack_stream.unpack("CCS", function(header) {
			serv.sequence++;
			console.log("Request:", header[0]);
			console.log("Extra:", header[1]);
			console.log("length:", header[2]);
			serv.pack_stream.get((header[2] - 1) * 4, function(reqBody) {
				console.log("BODY:", reqBody, reqBody.toString());
				if (header[0] == 98) {
					serv.pack_stream.pack("CCSLCCCCLLLLL", [
						1,
						0,
						serv.sequence,
						0,
						1,
						134,
						0,
						0,
						0,
						0,
						0,
						0,
						0,
						0
					]);
					serv.pack_stream.flush();
				} else if (header[0] == 134) {
					console.log("ENABLE BIG REQ");
					serv.pack_stream.pack("CCSLLLLLLLL", [
						1,
						0,
						serv.sequence,
						0,
						1e7,
						0,
						0,
						0,
						0,
						0,
						0
					]);
					serv.pack_stream.flush();
				}
				serv.expectMessage();
			});
		});
	};
	module.exports.createServer = function(options, onconnect) {
		if (typeof options === "function") {
			onconnect = options;
			options = {};
		}
		var s = net$2.createServer();
		new XServer(s, options).on("connect", onconnect);
		return s;
	};
}));
var require_keysyms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		XK_VoidSymbol: {
			code: 16777215,
			description: "Void symbol"
		},
		XK_BackSpace: {
			code: 65288,
			description: "Back space, back char"
		},
		XK_Tab: {
			code: 65289,
			description: null
		},
		XK_Linefeed: {
			code: 65290,
			description: "Linefeed, LF"
		},
		XK_Clear: {
			code: 65291,
			description: null
		},
		XK_Return: {
			code: 65293,
			description: "Return, enter"
		},
		XK_Pause: {
			code: 65299,
			description: "Pause, hold"
		},
		XK_Scroll_Lock: {
			code: 65300,
			description: null
		},
		XK_Sys_Req: {
			code: 65301,
			description: null
		},
		XK_Escape: {
			code: 65307,
			description: null
		},
		XK_Delete: {
			code: 65535,
			description: "Delete, rubout"
		},
		XK_Multi_key: {
			code: 65312,
			description: "Multi-key character compose"
		},
		XK_Codeinput: {
			code: 65335,
			description: null
		},
		XK_SingleCandidate: {
			code: 65340,
			description: null
		},
		XK_MultipleCandidate: {
			code: 65341,
			description: null
		},
		XK_PreviousCandidate: {
			code: 65342,
			description: null
		},
		XK_Kanji: {
			code: 65313,
			description: "Kanji, Kanji convert"
		},
		XK_Muhenkan: {
			code: 65314,
			description: "Cancel Conversion"
		},
		XK_Henkan_Mode: {
			code: 65315,
			description: "Start/Stop Conversion"
		},
		XK_Henkan: {
			code: 65315,
			description: "Alias for Henkan_Mode"
		},
		XK_Romaji: {
			code: 65316,
			description: "to Romaji"
		},
		XK_Hiragana: {
			code: 65317,
			description: "to Hiragana"
		},
		XK_Katakana: {
			code: 65318,
			description: "to Katakana"
		},
		XK_Hiragana_Katakana: {
			code: 65319,
			description: "Hiragana/Katakana toggle"
		},
		XK_Zenkaku: {
			code: 65320,
			description: "to Zenkaku"
		},
		XK_Hankaku: {
			code: 65321,
			description: "to Hankaku"
		},
		XK_Zenkaku_Hankaku: {
			code: 65322,
			description: "Zenkaku/Hankaku toggle"
		},
		XK_Touroku: {
			code: 65323,
			description: "Add to Dictionary"
		},
		XK_Massyo: {
			code: 65324,
			description: "Delete from Dictionary"
		},
		XK_Kana_Lock: {
			code: 65325,
			description: "Kana Lock"
		},
		XK_Kana_Shift: {
			code: 65326,
			description: "Kana Shift"
		},
		XK_Eisu_Shift: {
			code: 65327,
			description: "Alphanumeric Shift"
		},
		XK_Eisu_toggle: {
			code: 65328,
			description: "Alphanumeric toggle"
		},
		XK_Kanji_Bangou: {
			code: 65335,
			description: "Codeinput"
		},
		XK_Zen_Koho: {
			code: 65341,
			description: "Multiple/All Candidate(s)"
		},
		XK_Mae_Koho: {
			code: 65342,
			description: "Previous Candidate"
		},
		XK_Home: {
			code: 65360,
			description: null
		},
		XK_Left: {
			code: 65361,
			description: "Move left, left arrow"
		},
		XK_Up: {
			code: 65362,
			description: "Move up, up arrow"
		},
		XK_Right: {
			code: 65363,
			description: "Move right, right arrow"
		},
		XK_Down: {
			code: 65364,
			description: "Move down, down arrow"
		},
		XK_Prior: {
			code: 65365,
			description: "Prior, previous"
		},
		XK_Page_Up: {
			code: 65365,
			description: null
		},
		XK_Next: {
			code: 65366,
			description: "Next"
		},
		XK_Page_Down: {
			code: 65366,
			description: null
		},
		XK_End: {
			code: 65367,
			description: "EOL"
		},
		XK_Begin: {
			code: 65368,
			description: "BOL"
		},
		XK_Select: {
			code: 65376,
			description: "Select, mark"
		},
		XK_Print: {
			code: 65377,
			description: null
		},
		XK_Execute: {
			code: 65378,
			description: "Execute, run, do"
		},
		XK_Insert: {
			code: 65379,
			description: "Insert, insert here"
		},
		XK_Undo: {
			code: 65381,
			description: null
		},
		XK_Redo: {
			code: 65382,
			description: "Redo, again"
		},
		XK_Menu: {
			code: 65383,
			description: null
		},
		XK_Find: {
			code: 65384,
			description: "Find, search"
		},
		XK_Cancel: {
			code: 65385,
			description: "Cancel, stop, abort, exit"
		},
		XK_Help: {
			code: 65386,
			description: "Help"
		},
		XK_Break: {
			code: 65387,
			description: null
		},
		XK_Mode_switch: {
			code: 65406,
			description: "Character set switch"
		},
		XK_script_switch: {
			code: 65406,
			description: "Alias for mode_switch"
		},
		XK_Num_Lock: {
			code: 65407,
			description: null
		},
		XK_KP_Space: {
			code: 65408,
			description: "Space"
		},
		XK_KP_Tab: {
			code: 65417,
			description: null
		},
		XK_KP_Enter: {
			code: 65421,
			description: "Enter"
		},
		XK_KP_F1: {
			code: 65425,
			description: "PF1, KP_A, ..."
		},
		XK_KP_F2: {
			code: 65426,
			description: null
		},
		XK_KP_F3: {
			code: 65427,
			description: null
		},
		XK_KP_F4: {
			code: 65428,
			description: null
		},
		XK_KP_Home: {
			code: 65429,
			description: null
		},
		XK_KP_Left: {
			code: 65430,
			description: null
		},
		XK_KP_Up: {
			code: 65431,
			description: null
		},
		XK_KP_Right: {
			code: 65432,
			description: null
		},
		XK_KP_Down: {
			code: 65433,
			description: null
		},
		XK_KP_Prior: {
			code: 65434,
			description: null
		},
		XK_KP_Page_Up: {
			code: 65434,
			description: null
		},
		XK_KP_Next: {
			code: 65435,
			description: null
		},
		XK_KP_Page_Down: {
			code: 65435,
			description: null
		},
		XK_KP_End: {
			code: 65436,
			description: null
		},
		XK_KP_Begin: {
			code: 65437,
			description: null
		},
		XK_KP_Insert: {
			code: 65438,
			description: null
		},
		XK_KP_Delete: {
			code: 65439,
			description: null
		},
		XK_KP_Equal: {
			code: 65469,
			description: "Equals"
		},
		XK_KP_Multiply: {
			code: 65450,
			description: null
		},
		XK_KP_Add: {
			code: 65451,
			description: null
		},
		XK_KP_Separator: {
			code: 65452,
			description: "Separator, often comma"
		},
		XK_KP_Subtract: {
			code: 65453,
			description: null
		},
		XK_KP_Decimal: {
			code: 65454,
			description: null
		},
		XK_KP_Divide: {
			code: 65455,
			description: null
		},
		XK_KP_0: {
			code: 65456,
			description: null
		},
		XK_KP_1: {
			code: 65457,
			description: null
		},
		XK_KP_2: {
			code: 65458,
			description: null
		},
		XK_KP_3: {
			code: 65459,
			description: null
		},
		XK_KP_4: {
			code: 65460,
			description: null
		},
		XK_KP_5: {
			code: 65461,
			description: null
		},
		XK_KP_6: {
			code: 65462,
			description: null
		},
		XK_KP_7: {
			code: 65463,
			description: null
		},
		XK_KP_8: {
			code: 65464,
			description: null
		},
		XK_KP_9: {
			code: 65465,
			description: null
		},
		XK_F1: {
			code: 65470,
			description: null
		},
		XK_F2: {
			code: 65471,
			description: null
		},
		XK_F3: {
			code: 65472,
			description: null
		},
		XK_F4: {
			code: 65473,
			description: null
		},
		XK_F5: {
			code: 65474,
			description: null
		},
		XK_F6: {
			code: 65475,
			description: null
		},
		XK_F7: {
			code: 65476,
			description: null
		},
		XK_F8: {
			code: 65477,
			description: null
		},
		XK_F9: {
			code: 65478,
			description: null
		},
		XK_F10: {
			code: 65479,
			description: null
		},
		XK_F11: {
			code: 65480,
			description: null
		},
		XK_L1: {
			code: 65480,
			description: null
		},
		XK_F12: {
			code: 65481,
			description: null
		},
		XK_L2: {
			code: 65481,
			description: null
		},
		XK_F13: {
			code: 65482,
			description: null
		},
		XK_L3: {
			code: 65482,
			description: null
		},
		XK_F14: {
			code: 65483,
			description: null
		},
		XK_L4: {
			code: 65483,
			description: null
		},
		XK_F15: {
			code: 65484,
			description: null
		},
		XK_L5: {
			code: 65484,
			description: null
		},
		XK_F16: {
			code: 65485,
			description: null
		},
		XK_L6: {
			code: 65485,
			description: null
		},
		XK_F17: {
			code: 65486,
			description: null
		},
		XK_L7: {
			code: 65486,
			description: null
		},
		XK_F18: {
			code: 65487,
			description: null
		},
		XK_L8: {
			code: 65487,
			description: null
		},
		XK_F19: {
			code: 65488,
			description: null
		},
		XK_L9: {
			code: 65488,
			description: null
		},
		XK_F20: {
			code: 65489,
			description: null
		},
		XK_L10: {
			code: 65489,
			description: null
		},
		XK_F21: {
			code: 65490,
			description: null
		},
		XK_R1: {
			code: 65490,
			description: null
		},
		XK_F22: {
			code: 65491,
			description: null
		},
		XK_R2: {
			code: 65491,
			description: null
		},
		XK_F23: {
			code: 65492,
			description: null
		},
		XK_R3: {
			code: 65492,
			description: null
		},
		XK_F24: {
			code: 65493,
			description: null
		},
		XK_R4: {
			code: 65493,
			description: null
		},
		XK_F25: {
			code: 65494,
			description: null
		},
		XK_R5: {
			code: 65494,
			description: null
		},
		XK_F26: {
			code: 65495,
			description: null
		},
		XK_R6: {
			code: 65495,
			description: null
		},
		XK_F27: {
			code: 65496,
			description: null
		},
		XK_R7: {
			code: 65496,
			description: null
		},
		XK_F28: {
			code: 65497,
			description: null
		},
		XK_R8: {
			code: 65497,
			description: null
		},
		XK_F29: {
			code: 65498,
			description: null
		},
		XK_R9: {
			code: 65498,
			description: null
		},
		XK_F30: {
			code: 65499,
			description: null
		},
		XK_R10: {
			code: 65499,
			description: null
		},
		XK_F31: {
			code: 65500,
			description: null
		},
		XK_R11: {
			code: 65500,
			description: null
		},
		XK_F32: {
			code: 65501,
			description: null
		},
		XK_R12: {
			code: 65501,
			description: null
		},
		XK_F33: {
			code: 65502,
			description: null
		},
		XK_R13: {
			code: 65502,
			description: null
		},
		XK_F34: {
			code: 65503,
			description: null
		},
		XK_R14: {
			code: 65503,
			description: null
		},
		XK_F35: {
			code: 65504,
			description: null
		},
		XK_R15: {
			code: 65504,
			description: null
		},
		XK_Shift_L: {
			code: 65505,
			description: "Left shift"
		},
		XK_Shift_R: {
			code: 65506,
			description: "Right shift"
		},
		XK_Control_L: {
			code: 65507,
			description: "Left control"
		},
		XK_Control_R: {
			code: 65508,
			description: "Right control"
		},
		XK_Caps_Lock: {
			code: 65509,
			description: "Caps lock"
		},
		XK_Shift_Lock: {
			code: 65510,
			description: "Shift lock"
		},
		XK_Meta_L: {
			code: 65511,
			description: "Left meta"
		},
		XK_Meta_R: {
			code: 65512,
			description: "Right meta"
		},
		XK_Alt_L: {
			code: 65513,
			description: "Left alt"
		},
		XK_Alt_R: {
			code: 65514,
			description: "Right alt"
		},
		XK_Super_L: {
			code: 65515,
			description: "Left super"
		},
		XK_Super_R: {
			code: 65516,
			description: "Right super"
		},
		XK_Hyper_L: {
			code: 65517,
			description: "Left hyper"
		},
		XK_Hyper_R: {
			code: 65518,
			description: "Right hyper"
		},
		XK_ISO_Lock: {
			code: 65025,
			description: null
		},
		XK_ISO_Level2_Latch: {
			code: 65026,
			description: null
		},
		XK_ISO_Level3_Shift: {
			code: 65027,
			description: null
		},
		XK_ISO_Level3_Latch: {
			code: 65028,
			description: null
		},
		XK_ISO_Level3_Lock: {
			code: 65029,
			description: null
		},
		XK_ISO_Level5_Shift: {
			code: 65041,
			description: null
		},
		XK_ISO_Level5_Latch: {
			code: 65042,
			description: null
		},
		XK_ISO_Level5_Lock: {
			code: 65043,
			description: null
		},
		XK_ISO_Group_Shift: {
			code: 65406,
			description: "Alias for mode_switch"
		},
		XK_ISO_Group_Latch: {
			code: 65030,
			description: null
		},
		XK_ISO_Group_Lock: {
			code: 65031,
			description: null
		},
		XK_ISO_Next_Group: {
			code: 65032,
			description: null
		},
		XK_ISO_Next_Group_Lock: {
			code: 65033,
			description: null
		},
		XK_ISO_Prev_Group: {
			code: 65034,
			description: null
		},
		XK_ISO_Prev_Group_Lock: {
			code: 65035,
			description: null
		},
		XK_ISO_First_Group: {
			code: 65036,
			description: null
		},
		XK_ISO_First_Group_Lock: {
			code: 65037,
			description: null
		},
		XK_ISO_Last_Group: {
			code: 65038,
			description: null
		},
		XK_ISO_Last_Group_Lock: {
			code: 65039,
			description: null
		},
		XK_ISO_Left_Tab: {
			code: 65056,
			description: null
		},
		XK_ISO_Move_Line_Up: {
			code: 65057,
			description: null
		},
		XK_ISO_Move_Line_Down: {
			code: 65058,
			description: null
		},
		XK_ISO_Partial_Line_Up: {
			code: 65059,
			description: null
		},
		XK_ISO_Partial_Line_Down: {
			code: 65060,
			description: null
		},
		XK_ISO_Partial_Space_Left: {
			code: 65061,
			description: null
		},
		XK_ISO_Partial_Space_Right: {
			code: 65062,
			description: null
		},
		XK_ISO_Set_Margin_Left: {
			code: 65063,
			description: null
		},
		XK_ISO_Set_Margin_Right: {
			code: 65064,
			description: null
		},
		XK_ISO_Release_Margin_Left: {
			code: 65065,
			description: null
		},
		XK_ISO_Release_Margin_Right: {
			code: 65066,
			description: null
		},
		XK_ISO_Release_Both_Margins: {
			code: 65067,
			description: null
		},
		XK_ISO_Fast_Cursor_Left: {
			code: 65068,
			description: null
		},
		XK_ISO_Fast_Cursor_Right: {
			code: 65069,
			description: null
		},
		XK_ISO_Fast_Cursor_Up: {
			code: 65070,
			description: null
		},
		XK_ISO_Fast_Cursor_Down: {
			code: 65071,
			description: null
		},
		XK_ISO_Continuous_Underline: {
			code: 65072,
			description: null
		},
		XK_ISO_Discontinuous_Underline: {
			code: 65073,
			description: null
		},
		XK_ISO_Emphasize: {
			code: 65074,
			description: null
		},
		XK_ISO_Center_Object: {
			code: 65075,
			description: null
		},
		XK_ISO_Enter: {
			code: 65076,
			description: null
		},
		XK_dead_grave: {
			code: 65104,
			description: null
		},
		XK_dead_acute: {
			code: 65105,
			description: null
		},
		XK_dead_circumflex: {
			code: 65106,
			description: null
		},
		XK_dead_tilde: {
			code: 65107,
			description: null
		},
		XK_dead_perispomeni: {
			code: 65107,
			description: "alias for dead_tilde"
		},
		XK_dead_macron: {
			code: 65108,
			description: null
		},
		XK_dead_breve: {
			code: 65109,
			description: null
		},
		XK_dead_abovedot: {
			code: 65110,
			description: null
		},
		XK_dead_diaeresis: {
			code: 65111,
			description: null
		},
		XK_dead_abovering: {
			code: 65112,
			description: null
		},
		XK_dead_doubleacute: {
			code: 65113,
			description: null
		},
		XK_dead_caron: {
			code: 65114,
			description: null
		},
		XK_dead_cedilla: {
			code: 65115,
			description: null
		},
		XK_dead_ogonek: {
			code: 65116,
			description: null
		},
		XK_dead_iota: {
			code: 65117,
			description: null
		},
		XK_dead_voiced_sound: {
			code: 65118,
			description: null
		},
		XK_dead_semivoiced_sound: {
			code: 65119,
			description: null
		},
		XK_dead_belowdot: {
			code: 65120,
			description: null
		},
		XK_dead_hook: {
			code: 65121,
			description: null
		},
		XK_dead_horn: {
			code: 65122,
			description: null
		},
		XK_dead_stroke: {
			code: 65123,
			description: null
		},
		XK_dead_abovecomma: {
			code: 65124,
			description: null
		},
		XK_dead_psili: {
			code: 65124,
			description: "alias for dead_abovecomma"
		},
		XK_dead_abovereversedcomma: {
			code: 65125,
			description: null
		},
		XK_dead_dasia: {
			code: 65125,
			description: "alias for dead_abovereversedcomma"
		},
		XK_dead_doublegrave: {
			code: 65126,
			description: null
		},
		XK_dead_belowring: {
			code: 65127,
			description: null
		},
		XK_dead_belowmacron: {
			code: 65128,
			description: null
		},
		XK_dead_belowcircumflex: {
			code: 65129,
			description: null
		},
		XK_dead_belowtilde: {
			code: 65130,
			description: null
		},
		XK_dead_belowbreve: {
			code: 65131,
			description: null
		},
		XK_dead_belowdiaeresis: {
			code: 65132,
			description: null
		},
		XK_dead_invertedbreve: {
			code: 65133,
			description: null
		},
		XK_dead_belowcomma: {
			code: 65134,
			description: null
		},
		XK_dead_currency: {
			code: 65135,
			description: null
		},
		XK_dead_lowline: {
			code: 65168,
			description: null
		},
		XK_dead_aboveverticalline: {
			code: 65169,
			description: null
		},
		XK_dead_belowverticalline: {
			code: 65170,
			description: null
		},
		XK_dead_longsolidusoverlay: {
			code: 65171,
			description: null
		},
		XK_dead_a: {
			code: 65152,
			description: null
		},
		XK_dead_A: {
			code: 65153,
			description: null
		},
		XK_dead_e: {
			code: 65154,
			description: null
		},
		XK_dead_E: {
			code: 65155,
			description: null
		},
		XK_dead_i: {
			code: 65156,
			description: null
		},
		XK_dead_I: {
			code: 65157,
			description: null
		},
		XK_dead_o: {
			code: 65158,
			description: null
		},
		XK_dead_O: {
			code: 65159,
			description: null
		},
		XK_dead_u: {
			code: 65160,
			description: null
		},
		XK_dead_U: {
			code: 65161,
			description: null
		},
		XK_dead_small_schwa: {
			code: 65162,
			description: null
		},
		XK_dead_capital_schwa: {
			code: 65163,
			description: null
		},
		XK_dead_greek: {
			code: 65164,
			description: null
		},
		XK_First_Virtual_Screen: {
			code: 65232,
			description: null
		},
		XK_Prev_Virtual_Screen: {
			code: 65233,
			description: null
		},
		XK_Next_Virtual_Screen: {
			code: 65234,
			description: null
		},
		XK_Last_Virtual_Screen: {
			code: 65236,
			description: null
		},
		XK_Terminate_Server: {
			code: 65237,
			description: null
		},
		XK_AccessX_Enable: {
			code: 65136,
			description: null
		},
		XK_AccessX_Feedback_Enable: {
			code: 65137,
			description: null
		},
		XK_RepeatKeys_Enable: {
			code: 65138,
			description: null
		},
		XK_SlowKeys_Enable: {
			code: 65139,
			description: null
		},
		XK_BounceKeys_Enable: {
			code: 65140,
			description: null
		},
		XK_StickyKeys_Enable: {
			code: 65141,
			description: null
		},
		XK_MouseKeys_Enable: {
			code: 65142,
			description: null
		},
		XK_MouseKeys_Accel_Enable: {
			code: 65143,
			description: null
		},
		XK_Overlay1_Enable: {
			code: 65144,
			description: null
		},
		XK_Overlay2_Enable: {
			code: 65145,
			description: null
		},
		XK_AudibleBell_Enable: {
			code: 65146,
			description: null
		},
		XK_Pointer_Left: {
			code: 65248,
			description: null
		},
		XK_Pointer_Right: {
			code: 65249,
			description: null
		},
		XK_Pointer_Up: {
			code: 65250,
			description: null
		},
		XK_Pointer_Down: {
			code: 65251,
			description: null
		},
		XK_Pointer_UpLeft: {
			code: 65252,
			description: null
		},
		XK_Pointer_UpRight: {
			code: 65253,
			description: null
		},
		XK_Pointer_DownLeft: {
			code: 65254,
			description: null
		},
		XK_Pointer_DownRight: {
			code: 65255,
			description: null
		},
		XK_Pointer_Button_Dflt: {
			code: 65256,
			description: null
		},
		XK_Pointer_Button1: {
			code: 65257,
			description: null
		},
		XK_Pointer_Button2: {
			code: 65258,
			description: null
		},
		XK_Pointer_Button3: {
			code: 65259,
			description: null
		},
		XK_Pointer_Button4: {
			code: 65260,
			description: null
		},
		XK_Pointer_Button5: {
			code: 65261,
			description: null
		},
		XK_Pointer_DblClick_Dflt: {
			code: 65262,
			description: null
		},
		XK_Pointer_DblClick1: {
			code: 65263,
			description: null
		},
		XK_Pointer_DblClick2: {
			code: 65264,
			description: null
		},
		XK_Pointer_DblClick3: {
			code: 65265,
			description: null
		},
		XK_Pointer_DblClick4: {
			code: 65266,
			description: null
		},
		XK_Pointer_DblClick5: {
			code: 65267,
			description: null
		},
		XK_Pointer_Drag_Dflt: {
			code: 65268,
			description: null
		},
		XK_Pointer_Drag1: {
			code: 65269,
			description: null
		},
		XK_Pointer_Drag2: {
			code: 65270,
			description: null
		},
		XK_Pointer_Drag3: {
			code: 65271,
			description: null
		},
		XK_Pointer_Drag4: {
			code: 65272,
			description: null
		},
		XK_Pointer_Drag5: {
			code: 65277,
			description: null
		},
		XK_Pointer_EnableKeys: {
			code: 65273,
			description: null
		},
		XK_Pointer_Accelerate: {
			code: 65274,
			description: null
		},
		XK_Pointer_DfltBtnNext: {
			code: 65275,
			description: null
		},
		XK_Pointer_DfltBtnPrev: {
			code: 65276,
			description: null
		},
		XK_ch: {
			code: 65184,
			description: null
		},
		XK_Ch: {
			code: 65185,
			description: null
		},
		XK_CH: {
			code: 65186,
			description: null
		},
		XK_c_h: {
			code: 65187,
			description: null
		},
		XK_C_h: {
			code: 65188,
			description: null
		},
		XK_C_H: {
			code: 65189,
			description: null
		},
		XK_3270_Duplicate: {
			code: 64769,
			description: null
		},
		XK_3270_FieldMark: {
			code: 64770,
			description: null
		},
		XK_3270_Right2: {
			code: 64771,
			description: null
		},
		XK_3270_Left2: {
			code: 64772,
			description: null
		},
		XK_3270_BackTab: {
			code: 64773,
			description: null
		},
		XK_3270_EraseEOF: {
			code: 64774,
			description: null
		},
		XK_3270_EraseInput: {
			code: 64775,
			description: null
		},
		XK_3270_Reset: {
			code: 64776,
			description: null
		},
		XK_3270_Quit: {
			code: 64777,
			description: null
		},
		XK_3270_PA1: {
			code: 64778,
			description: null
		},
		XK_3270_PA2: {
			code: 64779,
			description: null
		},
		XK_3270_PA3: {
			code: 64780,
			description: null
		},
		XK_3270_Test: {
			code: 64781,
			description: null
		},
		XK_3270_Attn: {
			code: 64782,
			description: null
		},
		XK_3270_CursorBlink: {
			code: 64783,
			description: null
		},
		XK_3270_AltCursor: {
			code: 64784,
			description: null
		},
		XK_3270_KeyClick: {
			code: 64785,
			description: null
		},
		XK_3270_Jump: {
			code: 64786,
			description: null
		},
		XK_3270_Ident: {
			code: 64787,
			description: null
		},
		XK_3270_Rule: {
			code: 64788,
			description: null
		},
		XK_3270_Copy: {
			code: 64789,
			description: null
		},
		XK_3270_Play: {
			code: 64790,
			description: null
		},
		XK_3270_Setup: {
			code: 64791,
			description: null
		},
		XK_3270_Record: {
			code: 64792,
			description: null
		},
		XK_3270_ChangeScreen: {
			code: 64793,
			description: null
		},
		XK_3270_DeleteWord: {
			code: 64794,
			description: null
		},
		XK_3270_ExSelect: {
			code: 64795,
			description: null
		},
		XK_3270_CursorSelect: {
			code: 64796,
			description: null
		},
		XK_3270_PrintScreen: {
			code: 64797,
			description: null
		},
		XK_3270_Enter: {
			code: 64798,
			description: null
		},
		XK_space: {
			code: 32,
			description: "( ) SPACE"
		},
		XK_exclam: {
			code: 33,
			description: "(!) EXCLAMATION MARK"
		},
		XK_quotedbl: {
			code: 34,
			description: "(\") QUOTATION MARK"
		},
		XK_numbersign: {
			code: 35,
			description: "(#) NUMBER SIGN"
		},
		XK_dollar: {
			code: 36,
			description: "($) DOLLAR SIGN"
		},
		XK_percent: {
			code: 37,
			description: "(%) PERCENT SIGN"
		},
		XK_ampersand: {
			code: 38,
			description: "(&) AMPERSAND"
		},
		XK_apostrophe: {
			code: 39,
			description: "(') APOSTROPHE"
		},
		XK_quoteright: {
			code: 39,
			description: "deprecated"
		},
		XK_parenleft: {
			code: 40,
			description: "(() LEFT PARENTHESIS"
		},
		XK_parenright: {
			code: 41,
			description: "()) RIGHT PARENTHESIS"
		},
		XK_asterisk: {
			code: 42,
			description: "(*) ASTERISK"
		},
		XK_plus: {
			code: 43,
			description: "(+) PLUS SIGN"
		},
		XK_comma: {
			code: 44,
			description: "(,) COMMA"
		},
		XK_minus: {
			code: 45,
			description: "(-) HYPHEN-MINUS"
		},
		XK_period: {
			code: 46,
			description: "(.) FULL STOP"
		},
		XK_slash: {
			code: 47,
			description: "(/) SOLIDUS"
		},
		XK_0: {
			code: 48,
			description: "(0) DIGIT ZERO"
		},
		XK_1: {
			code: 49,
			description: "(1) DIGIT ONE"
		},
		XK_2: {
			code: 50,
			description: "(2) DIGIT TWO"
		},
		XK_3: {
			code: 51,
			description: "(3) DIGIT THREE"
		},
		XK_4: {
			code: 52,
			description: "(4) DIGIT FOUR"
		},
		XK_5: {
			code: 53,
			description: "(5) DIGIT FIVE"
		},
		XK_6: {
			code: 54,
			description: "(6) DIGIT SIX"
		},
		XK_7: {
			code: 55,
			description: "(7) DIGIT SEVEN"
		},
		XK_8: {
			code: 56,
			description: "(8) DIGIT EIGHT"
		},
		XK_9: {
			code: 57,
			description: "(9) DIGIT NINE"
		},
		XK_colon: {
			code: 58,
			description: "(:) COLON"
		},
		XK_semicolon: {
			code: 59,
			description: "(;) SEMICOLON"
		},
		XK_less: {
			code: 60,
			description: "(<) LESS-THAN SIGN"
		},
		XK_equal: {
			code: 61,
			description: "(=) EQUALS SIGN"
		},
		XK_greater: {
			code: 62,
			description: "(>) GREATER-THAN SIGN"
		},
		XK_question: {
			code: 63,
			description: "(?) QUESTION MARK"
		},
		XK_at: {
			code: 64,
			description: "(@) COMMERCIAL AT"
		},
		XK_A: {
			code: 65,
			description: "(A) LATIN CAPITAL LETTER A"
		},
		XK_B: {
			code: 66,
			description: "(B) LATIN CAPITAL LETTER B"
		},
		XK_C: {
			code: 67,
			description: "(C) LATIN CAPITAL LETTER C"
		},
		XK_D: {
			code: 68,
			description: "(D) LATIN CAPITAL LETTER D"
		},
		XK_E: {
			code: 69,
			description: "(E) LATIN CAPITAL LETTER E"
		},
		XK_F: {
			code: 70,
			description: "(F) LATIN CAPITAL LETTER F"
		},
		XK_G: {
			code: 71,
			description: "(G) LATIN CAPITAL LETTER G"
		},
		XK_H: {
			code: 72,
			description: "(H) LATIN CAPITAL LETTER H"
		},
		XK_I: {
			code: 73,
			description: "(I) LATIN CAPITAL LETTER I"
		},
		XK_J: {
			code: 74,
			description: "(J) LATIN CAPITAL LETTER J"
		},
		XK_K: {
			code: 75,
			description: "(K) LATIN CAPITAL LETTER K"
		},
		XK_L: {
			code: 76,
			description: "(L) LATIN CAPITAL LETTER L"
		},
		XK_M: {
			code: 77,
			description: "(M) LATIN CAPITAL LETTER M"
		},
		XK_N: {
			code: 78,
			description: "(N) LATIN CAPITAL LETTER N"
		},
		XK_O: {
			code: 79,
			description: "(O) LATIN CAPITAL LETTER O"
		},
		XK_P: {
			code: 80,
			description: "(P) LATIN CAPITAL LETTER P"
		},
		XK_Q: {
			code: 81,
			description: "(Q) LATIN CAPITAL LETTER Q"
		},
		XK_R: {
			code: 82,
			description: "(R) LATIN CAPITAL LETTER R"
		},
		XK_S: {
			code: 83,
			description: "(S) LATIN CAPITAL LETTER S"
		},
		XK_T: {
			code: 84,
			description: "(T) LATIN CAPITAL LETTER T"
		},
		XK_U: {
			code: 85,
			description: "(U) LATIN CAPITAL LETTER U"
		},
		XK_V: {
			code: 86,
			description: "(V) LATIN CAPITAL LETTER V"
		},
		XK_W: {
			code: 87,
			description: "(W) LATIN CAPITAL LETTER W"
		},
		XK_X: {
			code: 88,
			description: "(X) LATIN CAPITAL LETTER X"
		},
		XK_Y: {
			code: 89,
			description: "(Y) LATIN CAPITAL LETTER Y"
		},
		XK_Z: {
			code: 90,
			description: "(Z) LATIN CAPITAL LETTER Z"
		},
		XK_bracketleft: {
			code: 91,
			description: "([) LEFT SQUARE BRACKET"
		},
		XK_backslash: {
			code: 92,
			description: "(\\) REVERSE SOLIDUS"
		},
		XK_bracketright: {
			code: 93,
			description: "(]) RIGHT SQUARE BRACKET"
		},
		XK_asciicircum: {
			code: 94,
			description: "(^) CIRCUMFLEX ACCENT"
		},
		XK_underscore: {
			code: 95,
			description: "(_) LOW LINE"
		},
		XK_grave: {
			code: 96,
			description: "(`) GRAVE ACCENT"
		},
		XK_quoteleft: {
			code: 96,
			description: "deprecated"
		},
		XK_a: {
			code: 97,
			description: "(a) LATIN SMALL LETTER A"
		},
		XK_b: {
			code: 98,
			description: "(b) LATIN SMALL LETTER B"
		},
		XK_c: {
			code: 99,
			description: "(c) LATIN SMALL LETTER C"
		},
		XK_d: {
			code: 100,
			description: "(d) LATIN SMALL LETTER D"
		},
		XK_e: {
			code: 101,
			description: "(e) LATIN SMALL LETTER E"
		},
		XK_f: {
			code: 102,
			description: "(f) LATIN SMALL LETTER F"
		},
		XK_g: {
			code: 103,
			description: "(g) LATIN SMALL LETTER G"
		},
		XK_h: {
			code: 104,
			description: "(h) LATIN SMALL LETTER H"
		},
		XK_i: {
			code: 105,
			description: "(i) LATIN SMALL LETTER I"
		},
		XK_j: {
			code: 106,
			description: "(j) LATIN SMALL LETTER J"
		},
		XK_k: {
			code: 107,
			description: "(k) LATIN SMALL LETTER K"
		},
		XK_l: {
			code: 108,
			description: "(l) LATIN SMALL LETTER L"
		},
		XK_m: {
			code: 109,
			description: "(m) LATIN SMALL LETTER M"
		},
		XK_n: {
			code: 110,
			description: "(n) LATIN SMALL LETTER N"
		},
		XK_o: {
			code: 111,
			description: "(o) LATIN SMALL LETTER O"
		},
		XK_p: {
			code: 112,
			description: "(p) LATIN SMALL LETTER P"
		},
		XK_q: {
			code: 113,
			description: "(q) LATIN SMALL LETTER Q"
		},
		XK_r: {
			code: 114,
			description: "(r) LATIN SMALL LETTER R"
		},
		XK_s: {
			code: 115,
			description: "(s) LATIN SMALL LETTER S"
		},
		XK_t: {
			code: 116,
			description: "(t) LATIN SMALL LETTER T"
		},
		XK_u: {
			code: 117,
			description: "(u) LATIN SMALL LETTER U"
		},
		XK_v: {
			code: 118,
			description: "(v) LATIN SMALL LETTER V"
		},
		XK_w: {
			code: 119,
			description: "(w) LATIN SMALL LETTER W"
		},
		XK_x: {
			code: 120,
			description: "(x) LATIN SMALL LETTER X"
		},
		XK_y: {
			code: 121,
			description: "(y) LATIN SMALL LETTER Y"
		},
		XK_z: {
			code: 122,
			description: "(z) LATIN SMALL LETTER Z"
		},
		XK_braceleft: {
			code: 123,
			description: "({) LEFT CURLY BRACKET"
		},
		XK_bar: {
			code: 124,
			description: "(|) VERTICAL LINE"
		},
		XK_braceright: {
			code: 125,
			description: "(}) RIGHT CURLY BRACKET"
		},
		XK_asciitilde: {
			code: 126,
			description: "(~) TILDE"
		},
		XK_nobreakspace: {
			code: 160,
			description: "(\xA0) NO-BREAK SPACE"
		},
		XK_exclamdown: {
			code: 161,
			description: "(¡) INVERTED EXCLAMATION MARK"
		},
		XK_cent: {
			code: 162,
			description: "(¢) CENT SIGN"
		},
		XK_sterling: {
			code: 163,
			description: "(£) POUND SIGN"
		},
		XK_currency: {
			code: 164,
			description: "(¤) CURRENCY SIGN"
		},
		XK_yen: {
			code: 165,
			description: "(¥) YEN SIGN"
		},
		XK_brokenbar: {
			code: 166,
			description: "(¦) BROKEN BAR"
		},
		XK_section: {
			code: 167,
			description: "(§) SECTION SIGN"
		},
		XK_diaeresis: {
			code: 168,
			description: "(¨) DIAERESIS"
		},
		XK_copyright: {
			code: 169,
			description: "(©) COPYRIGHT SIGN"
		},
		XK_ordfeminine: {
			code: 170,
			description: "(ª) FEMININE ORDINAL INDICATOR"
		},
		XK_guillemotleft: {
			code: 171,
			description: "(«) LEFT-POINTING DOUBLE ANGLE QUOTATION MARK"
		},
		XK_notsign: {
			code: 172,
			description: "(¬) NOT SIGN"
		},
		XK_hyphen: {
			code: 173,
			description: "(­) SOFT HYPHEN"
		},
		XK_registered: {
			code: 174,
			description: "(®) REGISTERED SIGN"
		},
		XK_macron: {
			code: 175,
			description: "(¯) MACRON"
		},
		XK_degree: {
			code: 176,
			description: "(°) DEGREE SIGN"
		},
		XK_plusminus: {
			code: 177,
			description: "(±) PLUS-MINUS SIGN"
		},
		XK_twosuperior: {
			code: 178,
			description: "(²) SUPERSCRIPT TWO"
		},
		XK_threesuperior: {
			code: 179,
			description: "(³) SUPERSCRIPT THREE"
		},
		XK_acute: {
			code: 180,
			description: "(´) ACUTE ACCENT"
		},
		XK_mu: {
			code: 181,
			description: "(µ) MICRO SIGN"
		},
		XK_paragraph: {
			code: 182,
			description: "(¶) PILCROW SIGN"
		},
		XK_periodcentered: {
			code: 183,
			description: "(·) MIDDLE DOT"
		},
		XK_cedilla: {
			code: 184,
			description: "(¸) CEDILLA"
		},
		XK_onesuperior: {
			code: 185,
			description: "(¹) SUPERSCRIPT ONE"
		},
		XK_masculine: {
			code: 186,
			description: "(º) MASCULINE ORDINAL INDICATOR"
		},
		XK_guillemotright: {
			code: 187,
			description: "(») RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK"
		},
		XK_onequarter: {
			code: 188,
			description: "(¼) VULGAR FRACTION ONE QUARTER"
		},
		XK_onehalf: {
			code: 189,
			description: "(½) VULGAR FRACTION ONE HALF"
		},
		XK_threequarters: {
			code: 190,
			description: "(¾) VULGAR FRACTION THREE QUARTERS"
		},
		XK_questiondown: {
			code: 191,
			description: "(¿) INVERTED QUESTION MARK"
		},
		XK_Agrave: {
			code: 192,
			description: "(À) LATIN CAPITAL LETTER A WITH GRAVE"
		},
		XK_Aacute: {
			code: 193,
			description: "(Á) LATIN CAPITAL LETTER A WITH ACUTE"
		},
		XK_Acircumflex: {
			code: 194,
			description: "(Â) LATIN CAPITAL LETTER A WITH CIRCUMFLEX"
		},
		XK_Atilde: {
			code: 195,
			description: "(Ã) LATIN CAPITAL LETTER A WITH TILDE"
		},
		XK_Adiaeresis: {
			code: 196,
			description: "(Ä) LATIN CAPITAL LETTER A WITH DIAERESIS"
		},
		XK_Aring: {
			code: 197,
			description: "(Å) LATIN CAPITAL LETTER A WITH RING ABOVE"
		},
		XK_AE: {
			code: 198,
			description: "(Æ) LATIN CAPITAL LETTER AE"
		},
		XK_Ccedilla: {
			code: 199,
			description: "(Ç) LATIN CAPITAL LETTER C WITH CEDILLA"
		},
		XK_Egrave: {
			code: 200,
			description: "(È) LATIN CAPITAL LETTER E WITH GRAVE"
		},
		XK_Eacute: {
			code: 201,
			description: "(É) LATIN CAPITAL LETTER E WITH ACUTE"
		},
		XK_Ecircumflex: {
			code: 202,
			description: "(Ê) LATIN CAPITAL LETTER E WITH CIRCUMFLEX"
		},
		XK_Ediaeresis: {
			code: 203,
			description: "(Ë) LATIN CAPITAL LETTER E WITH DIAERESIS"
		},
		XK_Igrave: {
			code: 204,
			description: "(Ì) LATIN CAPITAL LETTER I WITH GRAVE"
		},
		XK_Iacute: {
			code: 205,
			description: "(Í) LATIN CAPITAL LETTER I WITH ACUTE"
		},
		XK_Icircumflex: {
			code: 206,
			description: "(Î) LATIN CAPITAL LETTER I WITH CIRCUMFLEX"
		},
		XK_Idiaeresis: {
			code: 207,
			description: "(Ï) LATIN CAPITAL LETTER I WITH DIAERESIS"
		},
		XK_ETH: {
			code: 208,
			description: "(Ð) LATIN CAPITAL LETTER ETH"
		},
		XK_Eth: {
			code: 208,
			description: "deprecated"
		},
		XK_Ntilde: {
			code: 209,
			description: "(Ñ) LATIN CAPITAL LETTER N WITH TILDE"
		},
		XK_Ograve: {
			code: 210,
			description: "(Ò) LATIN CAPITAL LETTER O WITH GRAVE"
		},
		XK_Oacute: {
			code: 211,
			description: "(Ó) LATIN CAPITAL LETTER O WITH ACUTE"
		},
		XK_Ocircumflex: {
			code: 212,
			description: "(Ô) LATIN CAPITAL LETTER O WITH CIRCUMFLEX"
		},
		XK_Otilde: {
			code: 213,
			description: "(Õ) LATIN CAPITAL LETTER O WITH TILDE"
		},
		XK_Odiaeresis: {
			code: 214,
			description: "(Ö) LATIN CAPITAL LETTER O WITH DIAERESIS"
		},
		XK_multiply: {
			code: 215,
			description: "(×) MULTIPLICATION SIGN"
		},
		XK_Oslash: {
			code: 216,
			description: "(Ø) LATIN CAPITAL LETTER O WITH STROKE"
		},
		XK_Ooblique: {
			code: 216,
			description: "(Ø) LATIN CAPITAL LETTER O WITH STROKE"
		},
		XK_Ugrave: {
			code: 217,
			description: "(Ù) LATIN CAPITAL LETTER U WITH GRAVE"
		},
		XK_Uacute: {
			code: 218,
			description: "(Ú) LATIN CAPITAL LETTER U WITH ACUTE"
		},
		XK_Ucircumflex: {
			code: 219,
			description: "(Û) LATIN CAPITAL LETTER U WITH CIRCUMFLEX"
		},
		XK_Udiaeresis: {
			code: 220,
			description: "(Ü) LATIN CAPITAL LETTER U WITH DIAERESIS"
		},
		XK_Yacute: {
			code: 221,
			description: "(Ý) LATIN CAPITAL LETTER Y WITH ACUTE"
		},
		XK_THORN: {
			code: 222,
			description: "(Þ) LATIN CAPITAL LETTER THORN"
		},
		XK_Thorn: {
			code: 222,
			description: "deprecated"
		},
		XK_ssharp: {
			code: 223,
			description: "(ß) LATIN SMALL LETTER SHARP S"
		},
		XK_agrave: {
			code: 224,
			description: "(à) LATIN SMALL LETTER A WITH GRAVE"
		},
		XK_aacute: {
			code: 225,
			description: "(á) LATIN SMALL LETTER A WITH ACUTE"
		},
		XK_acircumflex: {
			code: 226,
			description: "(â) LATIN SMALL LETTER A WITH CIRCUMFLEX"
		},
		XK_atilde: {
			code: 227,
			description: "(ã) LATIN SMALL LETTER A WITH TILDE"
		},
		XK_adiaeresis: {
			code: 228,
			description: "(ä) LATIN SMALL LETTER A WITH DIAERESIS"
		},
		XK_aring: {
			code: 229,
			description: "(å) LATIN SMALL LETTER A WITH RING ABOVE"
		},
		XK_ae: {
			code: 230,
			description: "(æ) LATIN SMALL LETTER AE"
		},
		XK_ccedilla: {
			code: 231,
			description: "(ç) LATIN SMALL LETTER C WITH CEDILLA"
		},
		XK_egrave: {
			code: 232,
			description: "(è) LATIN SMALL LETTER E WITH GRAVE"
		},
		XK_eacute: {
			code: 233,
			description: "(é) LATIN SMALL LETTER E WITH ACUTE"
		},
		XK_ecircumflex: {
			code: 234,
			description: "(ê) LATIN SMALL LETTER E WITH CIRCUMFLEX"
		},
		XK_ediaeresis: {
			code: 235,
			description: "(ë) LATIN SMALL LETTER E WITH DIAERESIS"
		},
		XK_igrave: {
			code: 236,
			description: "(ì) LATIN SMALL LETTER I WITH GRAVE"
		},
		XK_iacute: {
			code: 237,
			description: "(í) LATIN SMALL LETTER I WITH ACUTE"
		},
		XK_icircumflex: {
			code: 238,
			description: "(î) LATIN SMALL LETTER I WITH CIRCUMFLEX"
		},
		XK_idiaeresis: {
			code: 239,
			description: "(ï) LATIN SMALL LETTER I WITH DIAERESIS"
		},
		XK_eth: {
			code: 240,
			description: "(ð) LATIN SMALL LETTER ETH"
		},
		XK_ntilde: {
			code: 241,
			description: "(ñ) LATIN SMALL LETTER N WITH TILDE"
		},
		XK_ograve: {
			code: 242,
			description: "(ò) LATIN SMALL LETTER O WITH GRAVE"
		},
		XK_oacute: {
			code: 243,
			description: "(ó) LATIN SMALL LETTER O WITH ACUTE"
		},
		XK_ocircumflex: {
			code: 244,
			description: "(ô) LATIN SMALL LETTER O WITH CIRCUMFLEX"
		},
		XK_otilde: {
			code: 245,
			description: "(õ) LATIN SMALL LETTER O WITH TILDE"
		},
		XK_odiaeresis: {
			code: 246,
			description: "(ö) LATIN SMALL LETTER O WITH DIAERESIS"
		},
		XK_division: {
			code: 247,
			description: "(÷) DIVISION SIGN"
		},
		XK_oslash: {
			code: 248,
			description: "(ø) LATIN SMALL LETTER O WITH STROKE"
		},
		XK_ooblique: {
			code: 248,
			description: "(ø) LATIN SMALL LETTER O WITH STROKE"
		},
		XK_ugrave: {
			code: 249,
			description: "(ù) LATIN SMALL LETTER U WITH GRAVE"
		},
		XK_uacute: {
			code: 250,
			description: "(ú) LATIN SMALL LETTER U WITH ACUTE"
		},
		XK_ucircumflex: {
			code: 251,
			description: "(û) LATIN SMALL LETTER U WITH CIRCUMFLEX"
		},
		XK_udiaeresis: {
			code: 252,
			description: "(ü) LATIN SMALL LETTER U WITH DIAERESIS"
		},
		XK_yacute: {
			code: 253,
			description: "(ý) LATIN SMALL LETTER Y WITH ACUTE"
		},
		XK_thorn: {
			code: 254,
			description: "(þ) LATIN SMALL LETTER THORN"
		},
		XK_ydiaeresis: {
			code: 255,
			description: "(ÿ) LATIN SMALL LETTER Y WITH DIAERESIS"
		},
		XK_Aogonek: {
			code: 417,
			description: "(Ą) LATIN CAPITAL LETTER A WITH OGONEK"
		},
		XK_breve: {
			code: 418,
			description: "(˘) BREVE"
		},
		XK_Lstroke: {
			code: 419,
			description: "(Ł) LATIN CAPITAL LETTER L WITH STROKE"
		},
		XK_Lcaron: {
			code: 421,
			description: "(Ľ) LATIN CAPITAL LETTER L WITH CARON"
		},
		XK_Sacute: {
			code: 422,
			description: "(Ś) LATIN CAPITAL LETTER S WITH ACUTE"
		},
		XK_Scaron: {
			code: 425,
			description: "(Š) LATIN CAPITAL LETTER S WITH CARON"
		},
		XK_Scedilla: {
			code: 426,
			description: "(Ş) LATIN CAPITAL LETTER S WITH CEDILLA"
		},
		XK_Tcaron: {
			code: 427,
			description: "(Ť) LATIN CAPITAL LETTER T WITH CARON"
		},
		XK_Zacute: {
			code: 428,
			description: "(Ź) LATIN CAPITAL LETTER Z WITH ACUTE"
		},
		XK_Zcaron: {
			code: 430,
			description: "(Ž) LATIN CAPITAL LETTER Z WITH CARON"
		},
		XK_Zabovedot: {
			code: 431,
			description: "(Ż) LATIN CAPITAL LETTER Z WITH DOT ABOVE"
		},
		XK_aogonek: {
			code: 433,
			description: "(ą) LATIN SMALL LETTER A WITH OGONEK"
		},
		XK_ogonek: {
			code: 434,
			description: "(˛) OGONEK"
		},
		XK_lstroke: {
			code: 435,
			description: "(ł) LATIN SMALL LETTER L WITH STROKE"
		},
		XK_lcaron: {
			code: 437,
			description: "(ľ) LATIN SMALL LETTER L WITH CARON"
		},
		XK_sacute: {
			code: 438,
			description: "(ś) LATIN SMALL LETTER S WITH ACUTE"
		},
		XK_caron: {
			code: 439,
			description: "(ˇ) CARON"
		},
		XK_scaron: {
			code: 441,
			description: "(š) LATIN SMALL LETTER S WITH CARON"
		},
		XK_scedilla: {
			code: 442,
			description: "(ş) LATIN SMALL LETTER S WITH CEDILLA"
		},
		XK_tcaron: {
			code: 443,
			description: "(ť) LATIN SMALL LETTER T WITH CARON"
		},
		XK_zacute: {
			code: 444,
			description: "(ź) LATIN SMALL LETTER Z WITH ACUTE"
		},
		XK_doubleacute: {
			code: 445,
			description: "(˝) DOUBLE ACUTE ACCENT"
		},
		XK_zcaron: {
			code: 446,
			description: "(ž) LATIN SMALL LETTER Z WITH CARON"
		},
		XK_zabovedot: {
			code: 447,
			description: "(ż) LATIN SMALL LETTER Z WITH DOT ABOVE"
		},
		XK_Racute: {
			code: 448,
			description: "(Ŕ) LATIN CAPITAL LETTER R WITH ACUTE"
		},
		XK_Abreve: {
			code: 451,
			description: "(Ă) LATIN CAPITAL LETTER A WITH BREVE"
		},
		XK_Lacute: {
			code: 453,
			description: "(Ĺ) LATIN CAPITAL LETTER L WITH ACUTE"
		},
		XK_Cacute: {
			code: 454,
			description: "(Ć) LATIN CAPITAL LETTER C WITH ACUTE"
		},
		XK_Ccaron: {
			code: 456,
			description: "(Č) LATIN CAPITAL LETTER C WITH CARON"
		},
		XK_Eogonek: {
			code: 458,
			description: "(Ę) LATIN CAPITAL LETTER E WITH OGONEK"
		},
		XK_Ecaron: {
			code: 460,
			description: "(Ě) LATIN CAPITAL LETTER E WITH CARON"
		},
		XK_Dcaron: {
			code: 463,
			description: "(Ď) LATIN CAPITAL LETTER D WITH CARON"
		},
		XK_Dstroke: {
			code: 464,
			description: "(Đ) LATIN CAPITAL LETTER D WITH STROKE"
		},
		XK_Nacute: {
			code: 465,
			description: "(Ń) LATIN CAPITAL LETTER N WITH ACUTE"
		},
		XK_Ncaron: {
			code: 466,
			description: "(Ň) LATIN CAPITAL LETTER N WITH CARON"
		},
		XK_Odoubleacute: {
			code: 469,
			description: "(Ő) LATIN CAPITAL LETTER O WITH DOUBLE ACUTE"
		},
		XK_Rcaron: {
			code: 472,
			description: "(Ř) LATIN CAPITAL LETTER R WITH CARON"
		},
		XK_Uring: {
			code: 473,
			description: "(Ů) LATIN CAPITAL LETTER U WITH RING ABOVE"
		},
		XK_Udoubleacute: {
			code: 475,
			description: "(Ű) LATIN CAPITAL LETTER U WITH DOUBLE ACUTE"
		},
		XK_Tcedilla: {
			code: 478,
			description: "(Ţ) LATIN CAPITAL LETTER T WITH CEDILLA"
		},
		XK_racute: {
			code: 480,
			description: "(ŕ) LATIN SMALL LETTER R WITH ACUTE"
		},
		XK_abreve: {
			code: 483,
			description: "(ă) LATIN SMALL LETTER A WITH BREVE"
		},
		XK_lacute: {
			code: 485,
			description: "(ĺ) LATIN SMALL LETTER L WITH ACUTE"
		},
		XK_cacute: {
			code: 486,
			description: "(ć) LATIN SMALL LETTER C WITH ACUTE"
		},
		XK_ccaron: {
			code: 488,
			description: "(č) LATIN SMALL LETTER C WITH CARON"
		},
		XK_eogonek: {
			code: 490,
			description: "(ę) LATIN SMALL LETTER E WITH OGONEK"
		},
		XK_ecaron: {
			code: 492,
			description: "(ě) LATIN SMALL LETTER E WITH CARON"
		},
		XK_dcaron: {
			code: 495,
			description: "(ď) LATIN SMALL LETTER D WITH CARON"
		},
		XK_dstroke: {
			code: 496,
			description: "(đ) LATIN SMALL LETTER D WITH STROKE"
		},
		XK_nacute: {
			code: 497,
			description: "(ń) LATIN SMALL LETTER N WITH ACUTE"
		},
		XK_ncaron: {
			code: 498,
			description: "(ň) LATIN SMALL LETTER N WITH CARON"
		},
		XK_odoubleacute: {
			code: 501,
			description: "(ő) LATIN SMALL LETTER O WITH DOUBLE ACUTE"
		},
		XK_rcaron: {
			code: 504,
			description: "(ř) LATIN SMALL LETTER R WITH CARON"
		},
		XK_uring: {
			code: 505,
			description: "(ů) LATIN SMALL LETTER U WITH RING ABOVE"
		},
		XK_udoubleacute: {
			code: 507,
			description: "(ű) LATIN SMALL LETTER U WITH DOUBLE ACUTE"
		},
		XK_tcedilla: {
			code: 510,
			description: "(ţ) LATIN SMALL LETTER T WITH CEDILLA"
		},
		XK_abovedot: {
			code: 511,
			description: "(˙) DOT ABOVE"
		},
		XK_Hstroke: {
			code: 673,
			description: "(Ħ) LATIN CAPITAL LETTER H WITH STROKE"
		},
		XK_Hcircumflex: {
			code: 678,
			description: "(Ĥ) LATIN CAPITAL LETTER H WITH CIRCUMFLEX"
		},
		XK_Iabovedot: {
			code: 681,
			description: "(İ) LATIN CAPITAL LETTER I WITH DOT ABOVE"
		},
		XK_Gbreve: {
			code: 683,
			description: "(Ğ) LATIN CAPITAL LETTER G WITH BREVE"
		},
		XK_Jcircumflex: {
			code: 684,
			description: "(Ĵ) LATIN CAPITAL LETTER J WITH CIRCUMFLEX"
		},
		XK_hstroke: {
			code: 689,
			description: "(ħ) LATIN SMALL LETTER H WITH STROKE"
		},
		XK_hcircumflex: {
			code: 694,
			description: "(ĥ) LATIN SMALL LETTER H WITH CIRCUMFLEX"
		},
		XK_idotless: {
			code: 697,
			description: "(ı) LATIN SMALL LETTER DOTLESS I"
		},
		XK_gbreve: {
			code: 699,
			description: "(ğ) LATIN SMALL LETTER G WITH BREVE"
		},
		XK_jcircumflex: {
			code: 700,
			description: "(ĵ) LATIN SMALL LETTER J WITH CIRCUMFLEX"
		},
		XK_Cabovedot: {
			code: 709,
			description: "(Ċ) LATIN CAPITAL LETTER C WITH DOT ABOVE"
		},
		XK_Ccircumflex: {
			code: 710,
			description: "(Ĉ) LATIN CAPITAL LETTER C WITH CIRCUMFLEX"
		},
		XK_Gabovedot: {
			code: 725,
			description: "(Ġ) LATIN CAPITAL LETTER G WITH DOT ABOVE"
		},
		XK_Gcircumflex: {
			code: 728,
			description: "(Ĝ) LATIN CAPITAL LETTER G WITH CIRCUMFLEX"
		},
		XK_Ubreve: {
			code: 733,
			description: "(Ŭ) LATIN CAPITAL LETTER U WITH BREVE"
		},
		XK_Scircumflex: {
			code: 734,
			description: "(Ŝ) LATIN CAPITAL LETTER S WITH CIRCUMFLEX"
		},
		XK_cabovedot: {
			code: 741,
			description: "(ċ) LATIN SMALL LETTER C WITH DOT ABOVE"
		},
		XK_ccircumflex: {
			code: 742,
			description: "(ĉ) LATIN SMALL LETTER C WITH CIRCUMFLEX"
		},
		XK_gabovedot: {
			code: 757,
			description: "(ġ) LATIN SMALL LETTER G WITH DOT ABOVE"
		},
		XK_gcircumflex: {
			code: 760,
			description: "(ĝ) LATIN SMALL LETTER G WITH CIRCUMFLEX"
		},
		XK_ubreve: {
			code: 765,
			description: "(ŭ) LATIN SMALL LETTER U WITH BREVE"
		},
		XK_scircumflex: {
			code: 766,
			description: "(ŝ) LATIN SMALL LETTER S WITH CIRCUMFLEX"
		},
		XK_kra: {
			code: 930,
			description: "(ĸ) LATIN SMALL LETTER KRA"
		},
		XK_kappa: {
			code: 930,
			description: "deprecated"
		},
		XK_Rcedilla: {
			code: 931,
			description: "(Ŗ) LATIN CAPITAL LETTER R WITH CEDILLA"
		},
		XK_Itilde: {
			code: 933,
			description: "(Ĩ) LATIN CAPITAL LETTER I WITH TILDE"
		},
		XK_Lcedilla: {
			code: 934,
			description: "(Ļ) LATIN CAPITAL LETTER L WITH CEDILLA"
		},
		XK_Emacron: {
			code: 938,
			description: "(Ē) LATIN CAPITAL LETTER E WITH MACRON"
		},
		XK_Gcedilla: {
			code: 939,
			description: "(Ģ) LATIN CAPITAL LETTER G WITH CEDILLA"
		},
		XK_Tslash: {
			code: 940,
			description: "(Ŧ) LATIN CAPITAL LETTER T WITH STROKE"
		},
		XK_rcedilla: {
			code: 947,
			description: "(ŗ) LATIN SMALL LETTER R WITH CEDILLA"
		},
		XK_itilde: {
			code: 949,
			description: "(ĩ) LATIN SMALL LETTER I WITH TILDE"
		},
		XK_lcedilla: {
			code: 950,
			description: "(ļ) LATIN SMALL LETTER L WITH CEDILLA"
		},
		XK_emacron: {
			code: 954,
			description: "(ē) LATIN SMALL LETTER E WITH MACRON"
		},
		XK_gcedilla: {
			code: 955,
			description: "(ģ) LATIN SMALL LETTER G WITH CEDILLA"
		},
		XK_tslash: {
			code: 956,
			description: "(ŧ) LATIN SMALL LETTER T WITH STROKE"
		},
		XK_ENG: {
			code: 957,
			description: "(Ŋ) LATIN CAPITAL LETTER ENG"
		},
		XK_eng: {
			code: 959,
			description: "(ŋ) LATIN SMALL LETTER ENG"
		},
		XK_Amacron: {
			code: 960,
			description: "(Ā) LATIN CAPITAL LETTER A WITH MACRON"
		},
		XK_Iogonek: {
			code: 967,
			description: "(Į) LATIN CAPITAL LETTER I WITH OGONEK"
		},
		XK_Eabovedot: {
			code: 972,
			description: "(Ė) LATIN CAPITAL LETTER E WITH DOT ABOVE"
		},
		XK_Imacron: {
			code: 975,
			description: "(Ī) LATIN CAPITAL LETTER I WITH MACRON"
		},
		XK_Ncedilla: {
			code: 977,
			description: "(Ņ) LATIN CAPITAL LETTER N WITH CEDILLA"
		},
		XK_Omacron: {
			code: 978,
			description: "(Ō) LATIN CAPITAL LETTER O WITH MACRON"
		},
		XK_Kcedilla: {
			code: 979,
			description: "(Ķ) LATIN CAPITAL LETTER K WITH CEDILLA"
		},
		XK_Uogonek: {
			code: 985,
			description: "(Ų) LATIN CAPITAL LETTER U WITH OGONEK"
		},
		XK_Utilde: {
			code: 989,
			description: "(Ũ) LATIN CAPITAL LETTER U WITH TILDE"
		},
		XK_Umacron: {
			code: 990,
			description: "(Ū) LATIN CAPITAL LETTER U WITH MACRON"
		},
		XK_amacron: {
			code: 992,
			description: "(ā) LATIN SMALL LETTER A WITH MACRON"
		},
		XK_iogonek: {
			code: 999,
			description: "(į) LATIN SMALL LETTER I WITH OGONEK"
		},
		XK_eabovedot: {
			code: 1004,
			description: "(ė) LATIN SMALL LETTER E WITH DOT ABOVE"
		},
		XK_imacron: {
			code: 1007,
			description: "(ī) LATIN SMALL LETTER I WITH MACRON"
		},
		XK_ncedilla: {
			code: 1009,
			description: "(ņ) LATIN SMALL LETTER N WITH CEDILLA"
		},
		XK_omacron: {
			code: 1010,
			description: "(ō) LATIN SMALL LETTER O WITH MACRON"
		},
		XK_kcedilla: {
			code: 1011,
			description: "(ķ) LATIN SMALL LETTER K WITH CEDILLA"
		},
		XK_uogonek: {
			code: 1017,
			description: "(ų) LATIN SMALL LETTER U WITH OGONEK"
		},
		XK_utilde: {
			code: 1021,
			description: "(ũ) LATIN SMALL LETTER U WITH TILDE"
		},
		XK_umacron: {
			code: 1022,
			description: "(ū) LATIN SMALL LETTER U WITH MACRON"
		},
		XK_Wcircumflex: {
			code: 16777588,
			description: "(Ŵ) LATIN CAPITAL LETTER W WITH CIRCUMFLEX"
		},
		XK_wcircumflex: {
			code: 16777589,
			description: "(ŵ) LATIN SMALL LETTER W WITH CIRCUMFLEX"
		},
		XK_Ycircumflex: {
			code: 16777590,
			description: "(Ŷ) LATIN CAPITAL LETTER Y WITH CIRCUMFLEX"
		},
		XK_ycircumflex: {
			code: 16777591,
			description: "(ŷ) LATIN SMALL LETTER Y WITH CIRCUMFLEX"
		},
		XK_Babovedot: {
			code: 16784898,
			description: "(Ḃ) LATIN CAPITAL LETTER B WITH DOT ABOVE"
		},
		XK_babovedot: {
			code: 16784899,
			description: "(ḃ) LATIN SMALL LETTER B WITH DOT ABOVE"
		},
		XK_Dabovedot: {
			code: 16784906,
			description: "(Ḋ) LATIN CAPITAL LETTER D WITH DOT ABOVE"
		},
		XK_dabovedot: {
			code: 16784907,
			description: "(ḋ) LATIN SMALL LETTER D WITH DOT ABOVE"
		},
		XK_Fabovedot: {
			code: 16784926,
			description: "(Ḟ) LATIN CAPITAL LETTER F WITH DOT ABOVE"
		},
		XK_fabovedot: {
			code: 16784927,
			description: "(ḟ) LATIN SMALL LETTER F WITH DOT ABOVE"
		},
		XK_Mabovedot: {
			code: 16784960,
			description: "(Ṁ) LATIN CAPITAL LETTER M WITH DOT ABOVE"
		},
		XK_mabovedot: {
			code: 16784961,
			description: "(ṁ) LATIN SMALL LETTER M WITH DOT ABOVE"
		},
		XK_Pabovedot: {
			code: 16784982,
			description: "(Ṗ) LATIN CAPITAL LETTER P WITH DOT ABOVE"
		},
		XK_pabovedot: {
			code: 16784983,
			description: "(ṗ) LATIN SMALL LETTER P WITH DOT ABOVE"
		},
		XK_Sabovedot: {
			code: 16784992,
			description: "(Ṡ) LATIN CAPITAL LETTER S WITH DOT ABOVE"
		},
		XK_sabovedot: {
			code: 16784993,
			description: "(ṡ) LATIN SMALL LETTER S WITH DOT ABOVE"
		},
		XK_Tabovedot: {
			code: 16785002,
			description: "(Ṫ) LATIN CAPITAL LETTER T WITH DOT ABOVE"
		},
		XK_tabovedot: {
			code: 16785003,
			description: "(ṫ) LATIN SMALL LETTER T WITH DOT ABOVE"
		},
		XK_Wgrave: {
			code: 16785024,
			description: "(Ẁ) LATIN CAPITAL LETTER W WITH GRAVE"
		},
		XK_wgrave: {
			code: 16785025,
			description: "(ẁ) LATIN SMALL LETTER W WITH GRAVE"
		},
		XK_Wacute: {
			code: 16785026,
			description: "(Ẃ) LATIN CAPITAL LETTER W WITH ACUTE"
		},
		XK_wacute: {
			code: 16785027,
			description: "(ẃ) LATIN SMALL LETTER W WITH ACUTE"
		},
		XK_Wdiaeresis: {
			code: 16785028,
			description: "(Ẅ) LATIN CAPITAL LETTER W WITH DIAERESIS"
		},
		XK_wdiaeresis: {
			code: 16785029,
			description: "(ẅ) LATIN SMALL LETTER W WITH DIAERESIS"
		},
		XK_Ygrave: {
			code: 16785138,
			description: "(Ỳ) LATIN CAPITAL LETTER Y WITH GRAVE"
		},
		XK_ygrave: {
			code: 16785139,
			description: "(ỳ) LATIN SMALL LETTER Y WITH GRAVE"
		},
		XK_OE: {
			code: 5052,
			description: "(Œ) LATIN CAPITAL LIGATURE OE"
		},
		XK_oe: {
			code: 5053,
			description: "(œ) LATIN SMALL LIGATURE OE"
		},
		XK_Ydiaeresis: {
			code: 5054,
			description: "(Ÿ) LATIN CAPITAL LETTER Y WITH DIAERESIS"
		},
		XK_overline: {
			code: 1150,
			description: "(‾) OVERLINE"
		},
		XK_kana_fullstop: {
			code: 1185,
			description: "(。) IDEOGRAPHIC FULL STOP"
		},
		XK_kana_openingbracket: {
			code: 1186,
			description: "(「) LEFT CORNER BRACKET"
		},
		XK_kana_closingbracket: {
			code: 1187,
			description: "(」) RIGHT CORNER BRACKET"
		},
		XK_kana_comma: {
			code: 1188,
			description: "(、) IDEOGRAPHIC COMMA"
		},
		XK_kana_conjunctive: {
			code: 1189,
			description: "(・) KATAKANA MIDDLE DOT"
		},
		XK_kana_middledot: {
			code: 1189,
			description: "deprecated"
		},
		XK_kana_WO: {
			code: 1190,
			description: "(ヲ) KATAKANA LETTER WO"
		},
		XK_kana_a: {
			code: 1191,
			description: "(ァ) KATAKANA LETTER SMALL A"
		},
		XK_kana_i: {
			code: 1192,
			description: "(ィ) KATAKANA LETTER SMALL I"
		},
		XK_kana_u: {
			code: 1193,
			description: "(ゥ) KATAKANA LETTER SMALL U"
		},
		XK_kana_e: {
			code: 1194,
			description: "(ェ) KATAKANA LETTER SMALL E"
		},
		XK_kana_o: {
			code: 1195,
			description: "(ォ) KATAKANA LETTER SMALL O"
		},
		XK_kana_ya: {
			code: 1196,
			description: "(ャ) KATAKANA LETTER SMALL YA"
		},
		XK_kana_yu: {
			code: 1197,
			description: "(ュ) KATAKANA LETTER SMALL YU"
		},
		XK_kana_yo: {
			code: 1198,
			description: "(ョ) KATAKANA LETTER SMALL YO"
		},
		XK_kana_tsu: {
			code: 1199,
			description: "(ッ) KATAKANA LETTER SMALL TU"
		},
		XK_kana_tu: {
			code: 1199,
			description: "deprecated"
		},
		XK_prolongedsound: {
			code: 1200,
			description: "(ー) KATAKANA-HIRAGANA PROLONGED SOUND MARK"
		},
		XK_kana_A: {
			code: 1201,
			description: "(ア) KATAKANA LETTER A"
		},
		XK_kana_I: {
			code: 1202,
			description: "(イ) KATAKANA LETTER I"
		},
		XK_kana_U: {
			code: 1203,
			description: "(ウ) KATAKANA LETTER U"
		},
		XK_kana_E: {
			code: 1204,
			description: "(エ) KATAKANA LETTER E"
		},
		XK_kana_O: {
			code: 1205,
			description: "(オ) KATAKANA LETTER O"
		},
		XK_kana_KA: {
			code: 1206,
			description: "(カ) KATAKANA LETTER KA"
		},
		XK_kana_KI: {
			code: 1207,
			description: "(キ) KATAKANA LETTER KI"
		},
		XK_kana_KU: {
			code: 1208,
			description: "(ク) KATAKANA LETTER KU"
		},
		XK_kana_KE: {
			code: 1209,
			description: "(ケ) KATAKANA LETTER KE"
		},
		XK_kana_KO: {
			code: 1210,
			description: "(コ) KATAKANA LETTER KO"
		},
		XK_kana_SA: {
			code: 1211,
			description: "(サ) KATAKANA LETTER SA"
		},
		XK_kana_SHI: {
			code: 1212,
			description: "(シ) KATAKANA LETTER SI"
		},
		XK_kana_SU: {
			code: 1213,
			description: "(ス) KATAKANA LETTER SU"
		},
		XK_kana_SE: {
			code: 1214,
			description: "(セ) KATAKANA LETTER SE"
		},
		XK_kana_SO: {
			code: 1215,
			description: "(ソ) KATAKANA LETTER SO"
		},
		XK_kana_TA: {
			code: 1216,
			description: "(タ) KATAKANA LETTER TA"
		},
		XK_kana_CHI: {
			code: 1217,
			description: "(チ) KATAKANA LETTER TI"
		},
		XK_kana_TI: {
			code: 1217,
			description: "deprecated"
		},
		XK_kana_TSU: {
			code: 1218,
			description: "(ツ) KATAKANA LETTER TU"
		},
		XK_kana_TU: {
			code: 1218,
			description: "deprecated"
		},
		XK_kana_TE: {
			code: 1219,
			description: "(テ) KATAKANA LETTER TE"
		},
		XK_kana_TO: {
			code: 1220,
			description: "(ト) KATAKANA LETTER TO"
		},
		XK_kana_NA: {
			code: 1221,
			description: "(ナ) KATAKANA LETTER NA"
		},
		XK_kana_NI: {
			code: 1222,
			description: "(ニ) KATAKANA LETTER NI"
		},
		XK_kana_NU: {
			code: 1223,
			description: "(ヌ) KATAKANA LETTER NU"
		},
		XK_kana_NE: {
			code: 1224,
			description: "(ネ) KATAKANA LETTER NE"
		},
		XK_kana_NO: {
			code: 1225,
			description: "(ノ) KATAKANA LETTER NO"
		},
		XK_kana_HA: {
			code: 1226,
			description: "(ハ) KATAKANA LETTER HA"
		},
		XK_kana_HI: {
			code: 1227,
			description: "(ヒ) KATAKANA LETTER HI"
		},
		XK_kana_FU: {
			code: 1228,
			description: "(フ) KATAKANA LETTER HU"
		},
		XK_kana_HU: {
			code: 1228,
			description: "deprecated"
		},
		XK_kana_HE: {
			code: 1229,
			description: "(ヘ) KATAKANA LETTER HE"
		},
		XK_kana_HO: {
			code: 1230,
			description: "(ホ) KATAKANA LETTER HO"
		},
		XK_kana_MA: {
			code: 1231,
			description: "(マ) KATAKANA LETTER MA"
		},
		XK_kana_MI: {
			code: 1232,
			description: "(ミ) KATAKANA LETTER MI"
		},
		XK_kana_MU: {
			code: 1233,
			description: "(ム) KATAKANA LETTER MU"
		},
		XK_kana_ME: {
			code: 1234,
			description: "(メ) KATAKANA LETTER ME"
		},
		XK_kana_MO: {
			code: 1235,
			description: "(モ) KATAKANA LETTER MO"
		},
		XK_kana_YA: {
			code: 1236,
			description: "(ヤ) KATAKANA LETTER YA"
		},
		XK_kana_YU: {
			code: 1237,
			description: "(ユ) KATAKANA LETTER YU"
		},
		XK_kana_YO: {
			code: 1238,
			description: "(ヨ) KATAKANA LETTER YO"
		},
		XK_kana_RA: {
			code: 1239,
			description: "(ラ) KATAKANA LETTER RA"
		},
		XK_kana_RI: {
			code: 1240,
			description: "(リ) KATAKANA LETTER RI"
		},
		XK_kana_RU: {
			code: 1241,
			description: "(ル) KATAKANA LETTER RU"
		},
		XK_kana_RE: {
			code: 1242,
			description: "(レ) KATAKANA LETTER RE"
		},
		XK_kana_RO: {
			code: 1243,
			description: "(ロ) KATAKANA LETTER RO"
		},
		XK_kana_WA: {
			code: 1244,
			description: "(ワ) KATAKANA LETTER WA"
		},
		XK_kana_N: {
			code: 1245,
			description: "(ン) KATAKANA LETTER N"
		},
		XK_voicedsound: {
			code: 1246,
			description: "(゛) KATAKANA-HIRAGANA VOICED SOUND MARK"
		},
		XK_semivoicedsound: {
			code: 1247,
			description: "(゜) KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK"
		},
		XK_kana_switch: {
			code: 65406,
			description: "Alias for mode_switch"
		},
		XK_Farsi_0: {
			code: 16778992,
			description: "(۰) EXTENDED ARABIC-INDIC DIGIT ZERO"
		},
		XK_Farsi_1: {
			code: 16778993,
			description: "(۱) EXTENDED ARABIC-INDIC DIGIT ONE"
		},
		XK_Farsi_2: {
			code: 16778994,
			description: "(۲) EXTENDED ARABIC-INDIC DIGIT TWO"
		},
		XK_Farsi_3: {
			code: 16778995,
			description: "(۳) EXTENDED ARABIC-INDIC DIGIT THREE"
		},
		XK_Farsi_4: {
			code: 16778996,
			description: "(۴) EXTENDED ARABIC-INDIC DIGIT FOUR"
		},
		XK_Farsi_5: {
			code: 16778997,
			description: "(۵) EXTENDED ARABIC-INDIC DIGIT FIVE"
		},
		XK_Farsi_6: {
			code: 16778998,
			description: "(۶) EXTENDED ARABIC-INDIC DIGIT SIX"
		},
		XK_Farsi_7: {
			code: 16778999,
			description: "(۷) EXTENDED ARABIC-INDIC DIGIT SEVEN"
		},
		XK_Farsi_8: {
			code: 16779e3,
			description: "(۸) EXTENDED ARABIC-INDIC DIGIT EIGHT"
		},
		XK_Farsi_9: {
			code: 16779001,
			description: "(۹) EXTENDED ARABIC-INDIC DIGIT NINE"
		},
		XK_Arabic_percent: {
			code: 16778858,
			description: "(٪) ARABIC PERCENT SIGN"
		},
		XK_Arabic_superscript_alef: {
			code: 16778864,
			description: "(ٰ) ARABIC LETTER SUPERSCRIPT ALEF"
		},
		XK_Arabic_tteh: {
			code: 16778873,
			description: "(ٹ) ARABIC LETTER TTEH"
		},
		XK_Arabic_peh: {
			code: 16778878,
			description: "(پ) ARABIC LETTER PEH"
		},
		XK_Arabic_tcheh: {
			code: 16778886,
			description: "(چ) ARABIC LETTER TCHEH"
		},
		XK_Arabic_ddal: {
			code: 16778888,
			description: "(ڈ) ARABIC LETTER DDAL"
		},
		XK_Arabic_rreh: {
			code: 16778897,
			description: "(ڑ) ARABIC LETTER RREH"
		},
		XK_Arabic_comma: {
			code: 1452,
			description: "(،) ARABIC COMMA"
		},
		XK_Arabic_fullstop: {
			code: 16778964,
			description: "(۔) ARABIC FULL STOP"
		},
		XK_Arabic_0: {
			code: 16778848,
			description: "(٠) ARABIC-INDIC DIGIT ZERO"
		},
		XK_Arabic_1: {
			code: 16778849,
			description: "(١) ARABIC-INDIC DIGIT ONE"
		},
		XK_Arabic_2: {
			code: 16778850,
			description: "(٢) ARABIC-INDIC DIGIT TWO"
		},
		XK_Arabic_3: {
			code: 16778851,
			description: "(٣) ARABIC-INDIC DIGIT THREE"
		},
		XK_Arabic_4: {
			code: 16778852,
			description: "(٤) ARABIC-INDIC DIGIT FOUR"
		},
		XK_Arabic_5: {
			code: 16778853,
			description: "(٥) ARABIC-INDIC DIGIT FIVE"
		},
		XK_Arabic_6: {
			code: 16778854,
			description: "(٦) ARABIC-INDIC DIGIT SIX"
		},
		XK_Arabic_7: {
			code: 16778855,
			description: "(٧) ARABIC-INDIC DIGIT SEVEN"
		},
		XK_Arabic_8: {
			code: 16778856,
			description: "(٨) ARABIC-INDIC DIGIT EIGHT"
		},
		XK_Arabic_9: {
			code: 16778857,
			description: "(٩) ARABIC-INDIC DIGIT NINE"
		},
		XK_Arabic_semicolon: {
			code: 1467,
			description: "(؛) ARABIC SEMICOLON"
		},
		XK_Arabic_question_mark: {
			code: 1471,
			description: "(؟) ARABIC QUESTION MARK"
		},
		XK_Arabic_hamza: {
			code: 1473,
			description: "(ء) ARABIC LETTER HAMZA"
		},
		XK_Arabic_maddaonalef: {
			code: 1474,
			description: "(آ) ARABIC LETTER ALEF WITH MADDA ABOVE"
		},
		XK_Arabic_hamzaonalef: {
			code: 1475,
			description: "(أ) ARABIC LETTER ALEF WITH HAMZA ABOVE"
		},
		XK_Arabic_hamzaonwaw: {
			code: 1476,
			description: "(ؤ) ARABIC LETTER WAW WITH HAMZA ABOVE"
		},
		XK_Arabic_hamzaunderalef: {
			code: 1477,
			description: "(إ) ARABIC LETTER ALEF WITH HAMZA BELOW"
		},
		XK_Arabic_hamzaonyeh: {
			code: 1478,
			description: "(ئ) ARABIC LETTER YEH WITH HAMZA ABOVE"
		},
		XK_Arabic_alef: {
			code: 1479,
			description: "(ا) ARABIC LETTER ALEF"
		},
		XK_Arabic_beh: {
			code: 1480,
			description: "(ب) ARABIC LETTER BEH"
		},
		XK_Arabic_tehmarbuta: {
			code: 1481,
			description: "(ة) ARABIC LETTER TEH MARBUTA"
		},
		XK_Arabic_teh: {
			code: 1482,
			description: "(ت) ARABIC LETTER TEH"
		},
		XK_Arabic_theh: {
			code: 1483,
			description: "(ث) ARABIC LETTER THEH"
		},
		XK_Arabic_jeem: {
			code: 1484,
			description: "(ج) ARABIC LETTER JEEM"
		},
		XK_Arabic_hah: {
			code: 1485,
			description: "(ح) ARABIC LETTER HAH"
		},
		XK_Arabic_khah: {
			code: 1486,
			description: "(خ) ARABIC LETTER KHAH"
		},
		XK_Arabic_dal: {
			code: 1487,
			description: "(د) ARABIC LETTER DAL"
		},
		XK_Arabic_thal: {
			code: 1488,
			description: "(ذ) ARABIC LETTER THAL"
		},
		XK_Arabic_ra: {
			code: 1489,
			description: "(ر) ARABIC LETTER REH"
		},
		XK_Arabic_zain: {
			code: 1490,
			description: "(ز) ARABIC LETTER ZAIN"
		},
		XK_Arabic_seen: {
			code: 1491,
			description: "(س) ARABIC LETTER SEEN"
		},
		XK_Arabic_sheen: {
			code: 1492,
			description: "(ش) ARABIC LETTER SHEEN"
		},
		XK_Arabic_sad: {
			code: 1493,
			description: "(ص) ARABIC LETTER SAD"
		},
		XK_Arabic_dad: {
			code: 1494,
			description: "(ض) ARABIC LETTER DAD"
		},
		XK_Arabic_tah: {
			code: 1495,
			description: "(ط) ARABIC LETTER TAH"
		},
		XK_Arabic_zah: {
			code: 1496,
			description: "(ظ) ARABIC LETTER ZAH"
		},
		XK_Arabic_ain: {
			code: 1497,
			description: "(ع) ARABIC LETTER AIN"
		},
		XK_Arabic_ghain: {
			code: 1498,
			description: "(غ) ARABIC LETTER GHAIN"
		},
		XK_Arabic_tatweel: {
			code: 1504,
			description: "(ـ) ARABIC TATWEEL"
		},
		XK_Arabic_feh: {
			code: 1505,
			description: "(ف) ARABIC LETTER FEH"
		},
		XK_Arabic_qaf: {
			code: 1506,
			description: "(ق) ARABIC LETTER QAF"
		},
		XK_Arabic_kaf: {
			code: 1507,
			description: "(ك) ARABIC LETTER KAF"
		},
		XK_Arabic_lam: {
			code: 1508,
			description: "(ل) ARABIC LETTER LAM"
		},
		XK_Arabic_meem: {
			code: 1509,
			description: "(م) ARABIC LETTER MEEM"
		},
		XK_Arabic_noon: {
			code: 1510,
			description: "(ن) ARABIC LETTER NOON"
		},
		XK_Arabic_ha: {
			code: 1511,
			description: "(ه) ARABIC LETTER HEH"
		},
		XK_Arabic_heh: {
			code: 1511,
			description: "deprecated"
		},
		XK_Arabic_waw: {
			code: 1512,
			description: "(و) ARABIC LETTER WAW"
		},
		XK_Arabic_alefmaksura: {
			code: 1513,
			description: "(ى) ARABIC LETTER ALEF MAKSURA"
		},
		XK_Arabic_yeh: {
			code: 1514,
			description: "(ي) ARABIC LETTER YEH"
		},
		XK_Arabic_fathatan: {
			code: 1515,
			description: "(ً) ARABIC FATHATAN"
		},
		XK_Arabic_dammatan: {
			code: 1516,
			description: "(ٌ) ARABIC DAMMATAN"
		},
		XK_Arabic_kasratan: {
			code: 1517,
			description: "(ٍ) ARABIC KASRATAN"
		},
		XK_Arabic_fatha: {
			code: 1518,
			description: "(َ) ARABIC FATHA"
		},
		XK_Arabic_damma: {
			code: 1519,
			description: "(ُ) ARABIC DAMMA"
		},
		XK_Arabic_kasra: {
			code: 1520,
			description: "(ِ) ARABIC KASRA"
		},
		XK_Arabic_shadda: {
			code: 1521,
			description: "(ّ) ARABIC SHADDA"
		},
		XK_Arabic_sukun: {
			code: 1522,
			description: "(ْ) ARABIC SUKUN"
		},
		XK_Arabic_madda_above: {
			code: 16778835,
			description: "(ٓ) ARABIC MADDAH ABOVE"
		},
		XK_Arabic_hamza_above: {
			code: 16778836,
			description: "(ٔ) ARABIC HAMZA ABOVE"
		},
		XK_Arabic_hamza_below: {
			code: 16778837,
			description: "(ٕ) ARABIC HAMZA BELOW"
		},
		XK_Arabic_jeh: {
			code: 16778904,
			description: "(ژ) ARABIC LETTER JEH"
		},
		XK_Arabic_veh: {
			code: 16778916,
			description: "(ڤ) ARABIC LETTER VEH"
		},
		XK_Arabic_keheh: {
			code: 16778921,
			description: "(ک) ARABIC LETTER KEHEH"
		},
		XK_Arabic_gaf: {
			code: 16778927,
			description: "(گ) ARABIC LETTER GAF"
		},
		XK_Arabic_noon_ghunna: {
			code: 16778938,
			description: "(ں) ARABIC LETTER NOON GHUNNA"
		},
		XK_Arabic_heh_doachashmee: {
			code: 16778942,
			description: "(ھ) ARABIC LETTER HEH DOACHASHMEE"
		},
		XK_Farsi_yeh: {
			code: 16778956,
			description: "(ی) ARABIC LETTER FARSI YEH"
		},
		XK_Arabic_farsi_yeh: {
			code: 16778956,
			description: "(ی) ARABIC LETTER FARSI YEH"
		},
		XK_Arabic_yeh_baree: {
			code: 16778962,
			description: "(ے) ARABIC LETTER YEH BARREE"
		},
		XK_Arabic_heh_goal: {
			code: 16778945,
			description: "(ہ) ARABIC LETTER HEH GOAL"
		},
		XK_Arabic_switch: {
			code: 65406,
			description: "Alias for mode_switch"
		},
		XK_Cyrillic_GHE_bar: {
			code: 16778386,
			description: "(Ғ) CYRILLIC CAPITAL LETTER GHE WITH STROKE"
		},
		XK_Cyrillic_ghe_bar: {
			code: 16778387,
			description: "(ғ) CYRILLIC SMALL LETTER GHE WITH STROKE"
		},
		XK_Cyrillic_ZHE_descender: {
			code: 16778390,
			description: "(Җ) CYRILLIC CAPITAL LETTER ZHE WITH DESCENDER"
		},
		XK_Cyrillic_zhe_descender: {
			code: 16778391,
			description: "(җ) CYRILLIC SMALL LETTER ZHE WITH DESCENDER"
		},
		XK_Cyrillic_KA_descender: {
			code: 16778394,
			description: "(Қ) CYRILLIC CAPITAL LETTER KA WITH DESCENDER"
		},
		XK_Cyrillic_ka_descender: {
			code: 16778395,
			description: "(қ) CYRILLIC SMALL LETTER KA WITH DESCENDER"
		},
		XK_Cyrillic_KA_vertstroke: {
			code: 16778396,
			description: "(Ҝ) CYRILLIC CAPITAL LETTER KA WITH VERTICAL STROKE"
		},
		XK_Cyrillic_ka_vertstroke: {
			code: 16778397,
			description: "(ҝ) CYRILLIC SMALL LETTER KA WITH VERTICAL STROKE"
		},
		XK_Cyrillic_EN_descender: {
			code: 16778402,
			description: "(Ң) CYRILLIC CAPITAL LETTER EN WITH DESCENDER"
		},
		XK_Cyrillic_en_descender: {
			code: 16778403,
			description: "(ң) CYRILLIC SMALL LETTER EN WITH DESCENDER"
		},
		XK_Cyrillic_U_straight: {
			code: 16778414,
			description: "(Ү) CYRILLIC CAPITAL LETTER STRAIGHT U"
		},
		XK_Cyrillic_u_straight: {
			code: 16778415,
			description: "(ү) CYRILLIC SMALL LETTER STRAIGHT U"
		},
		XK_Cyrillic_U_straight_bar: {
			code: 16778416,
			description: "(Ұ) CYRILLIC CAPITAL LETTER STRAIGHT U WITH STROKE"
		},
		XK_Cyrillic_u_straight_bar: {
			code: 16778417,
			description: "(ұ) CYRILLIC SMALL LETTER STRAIGHT U WITH STROKE"
		},
		XK_Cyrillic_HA_descender: {
			code: 16778418,
			description: "(Ҳ) CYRILLIC CAPITAL LETTER HA WITH DESCENDER"
		},
		XK_Cyrillic_ha_descender: {
			code: 16778419,
			description: "(ҳ) CYRILLIC SMALL LETTER HA WITH DESCENDER"
		},
		XK_Cyrillic_CHE_descender: {
			code: 16778422,
			description: "(Ҷ) CYRILLIC CAPITAL LETTER CHE WITH DESCENDER"
		},
		XK_Cyrillic_che_descender: {
			code: 16778423,
			description: "(ҷ) CYRILLIC SMALL LETTER CHE WITH DESCENDER"
		},
		XK_Cyrillic_CHE_vertstroke: {
			code: 16778424,
			description: "(Ҹ) CYRILLIC CAPITAL LETTER CHE WITH VERTICAL STROKE"
		},
		XK_Cyrillic_che_vertstroke: {
			code: 16778425,
			description: "(ҹ) CYRILLIC SMALL LETTER CHE WITH VERTICAL STROKE"
		},
		XK_Cyrillic_SHHA: {
			code: 16778426,
			description: "(Һ) CYRILLIC CAPITAL LETTER SHHA"
		},
		XK_Cyrillic_shha: {
			code: 16778427,
			description: "(һ) CYRILLIC SMALL LETTER SHHA"
		},
		XK_Cyrillic_SCHWA: {
			code: 16778456,
			description: "(Ә) CYRILLIC CAPITAL LETTER SCHWA"
		},
		XK_Cyrillic_schwa: {
			code: 16778457,
			description: "(ә) CYRILLIC SMALL LETTER SCHWA"
		},
		XK_Cyrillic_I_macron: {
			code: 16778466,
			description: "(Ӣ) CYRILLIC CAPITAL LETTER I WITH MACRON"
		},
		XK_Cyrillic_i_macron: {
			code: 16778467,
			description: "(ӣ) CYRILLIC SMALL LETTER I WITH MACRON"
		},
		XK_Cyrillic_O_bar: {
			code: 16778472,
			description: "(Ө) CYRILLIC CAPITAL LETTER BARRED O"
		},
		XK_Cyrillic_o_bar: {
			code: 16778473,
			description: "(ө) CYRILLIC SMALL LETTER BARRED O"
		},
		XK_Cyrillic_U_macron: {
			code: 16778478,
			description: "(Ӯ) CYRILLIC CAPITAL LETTER U WITH MACRON"
		},
		XK_Cyrillic_u_macron: {
			code: 16778479,
			description: "(ӯ) CYRILLIC SMALL LETTER U WITH MACRON"
		},
		XK_Serbian_dje: {
			code: 1697,
			description: "(ђ) CYRILLIC SMALL LETTER DJE"
		},
		XK_Macedonia_gje: {
			code: 1698,
			description: "(ѓ) CYRILLIC SMALL LETTER GJE"
		},
		XK_Cyrillic_io: {
			code: 1699,
			description: "(ё) CYRILLIC SMALL LETTER IO"
		},
		XK_Ukrainian_ie: {
			code: 1700,
			description: "(є) CYRILLIC SMALL LETTER UKRAINIAN IE"
		},
		XK_Ukranian_je: {
			code: 1700,
			description: "deprecated"
		},
		XK_Macedonia_dse: {
			code: 1701,
			description: "(ѕ) CYRILLIC SMALL LETTER DZE"
		},
		XK_Ukrainian_i: {
			code: 1702,
			description: "(і) CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I"
		},
		XK_Ukranian_i: {
			code: 1702,
			description: "deprecated"
		},
		XK_Ukrainian_yi: {
			code: 1703,
			description: "(ї) CYRILLIC SMALL LETTER YI"
		},
		XK_Ukranian_yi: {
			code: 1703,
			description: "deprecated"
		},
		XK_Cyrillic_je: {
			code: 1704,
			description: "(ј) CYRILLIC SMALL LETTER JE"
		},
		XK_Serbian_je: {
			code: 1704,
			description: "deprecated"
		},
		XK_Cyrillic_lje: {
			code: 1705,
			description: "(љ) CYRILLIC SMALL LETTER LJE"
		},
		XK_Serbian_lje: {
			code: 1705,
			description: "deprecated"
		},
		XK_Cyrillic_nje: {
			code: 1706,
			description: "(њ) CYRILLIC SMALL LETTER NJE"
		},
		XK_Serbian_nje: {
			code: 1706,
			description: "deprecated"
		},
		XK_Serbian_tshe: {
			code: 1707,
			description: "(ћ) CYRILLIC SMALL LETTER TSHE"
		},
		XK_Macedonia_kje: {
			code: 1708,
			description: "(ќ) CYRILLIC SMALL LETTER KJE"
		},
		XK_Ukrainian_ghe_with_upturn: {
			code: 1709,
			description: "(ґ) CYRILLIC SMALL LETTER GHE WITH UPTURN"
		},
		XK_Byelorussian_shortu: {
			code: 1710,
			description: "(ў) CYRILLIC SMALL LETTER SHORT U"
		},
		XK_Cyrillic_dzhe: {
			code: 1711,
			description: "(џ) CYRILLIC SMALL LETTER DZHE"
		},
		XK_Serbian_dze: {
			code: 1711,
			description: "deprecated"
		},
		XK_numerosign: {
			code: 1712,
			description: "(№) NUMERO SIGN"
		},
		XK_Serbian_DJE: {
			code: 1713,
			description: "(Ђ) CYRILLIC CAPITAL LETTER DJE"
		},
		XK_Macedonia_GJE: {
			code: 1714,
			description: "(Ѓ) CYRILLIC CAPITAL LETTER GJE"
		},
		XK_Cyrillic_IO: {
			code: 1715,
			description: "(Ё) CYRILLIC CAPITAL LETTER IO"
		},
		XK_Ukrainian_IE: {
			code: 1716,
			description: "(Є) CYRILLIC CAPITAL LETTER UKRAINIAN IE"
		},
		XK_Ukranian_JE: {
			code: 1716,
			description: "deprecated"
		},
		XK_Macedonia_DSE: {
			code: 1717,
			description: "(Ѕ) CYRILLIC CAPITAL LETTER DZE"
		},
		XK_Ukrainian_I: {
			code: 1718,
			description: "(І) CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I"
		},
		XK_Ukranian_I: {
			code: 1718,
			description: "deprecated"
		},
		XK_Ukrainian_YI: {
			code: 1719,
			description: "(Ї) CYRILLIC CAPITAL LETTER YI"
		},
		XK_Ukranian_YI: {
			code: 1719,
			description: "deprecated"
		},
		XK_Cyrillic_JE: {
			code: 1720,
			description: "(Ј) CYRILLIC CAPITAL LETTER JE"
		},
		XK_Serbian_JE: {
			code: 1720,
			description: "deprecated"
		},
		XK_Cyrillic_LJE: {
			code: 1721,
			description: "(Љ) CYRILLIC CAPITAL LETTER LJE"
		},
		XK_Serbian_LJE: {
			code: 1721,
			description: "deprecated"
		},
		XK_Cyrillic_NJE: {
			code: 1722,
			description: "(Њ) CYRILLIC CAPITAL LETTER NJE"
		},
		XK_Serbian_NJE: {
			code: 1722,
			description: "deprecated"
		},
		XK_Serbian_TSHE: {
			code: 1723,
			description: "(Ћ) CYRILLIC CAPITAL LETTER TSHE"
		},
		XK_Macedonia_KJE: {
			code: 1724,
			description: "(Ќ) CYRILLIC CAPITAL LETTER KJE"
		},
		XK_Ukrainian_GHE_WITH_UPTURN: {
			code: 1725,
			description: "(Ґ) CYRILLIC CAPITAL LETTER GHE WITH UPTURN"
		},
		XK_Byelorussian_SHORTU: {
			code: 1726,
			description: "(Ў) CYRILLIC CAPITAL LETTER SHORT U"
		},
		XK_Cyrillic_DZHE: {
			code: 1727,
			description: "(Џ) CYRILLIC CAPITAL LETTER DZHE"
		},
		XK_Serbian_DZE: {
			code: 1727,
			description: "deprecated"
		},
		XK_Cyrillic_yu: {
			code: 1728,
			description: "(ю) CYRILLIC SMALL LETTER YU"
		},
		XK_Cyrillic_a: {
			code: 1729,
			description: "(а) CYRILLIC SMALL LETTER A"
		},
		XK_Cyrillic_be: {
			code: 1730,
			description: "(б) CYRILLIC SMALL LETTER BE"
		},
		XK_Cyrillic_tse: {
			code: 1731,
			description: "(ц) CYRILLIC SMALL LETTER TSE"
		},
		XK_Cyrillic_de: {
			code: 1732,
			description: "(д) CYRILLIC SMALL LETTER DE"
		},
		XK_Cyrillic_ie: {
			code: 1733,
			description: "(е) CYRILLIC SMALL LETTER IE"
		},
		XK_Cyrillic_ef: {
			code: 1734,
			description: "(ф) CYRILLIC SMALL LETTER EF"
		},
		XK_Cyrillic_ghe: {
			code: 1735,
			description: "(г) CYRILLIC SMALL LETTER GHE"
		},
		XK_Cyrillic_ha: {
			code: 1736,
			description: "(х) CYRILLIC SMALL LETTER HA"
		},
		XK_Cyrillic_i: {
			code: 1737,
			description: "(и) CYRILLIC SMALL LETTER I"
		},
		XK_Cyrillic_shorti: {
			code: 1738,
			description: "(й) CYRILLIC SMALL LETTER SHORT I"
		},
		XK_Cyrillic_ka: {
			code: 1739,
			description: "(к) CYRILLIC SMALL LETTER KA"
		},
		XK_Cyrillic_el: {
			code: 1740,
			description: "(л) CYRILLIC SMALL LETTER EL"
		},
		XK_Cyrillic_em: {
			code: 1741,
			description: "(м) CYRILLIC SMALL LETTER EM"
		},
		XK_Cyrillic_en: {
			code: 1742,
			description: "(н) CYRILLIC SMALL LETTER EN"
		},
		XK_Cyrillic_o: {
			code: 1743,
			description: "(о) CYRILLIC SMALL LETTER O"
		},
		XK_Cyrillic_pe: {
			code: 1744,
			description: "(п) CYRILLIC SMALL LETTER PE"
		},
		XK_Cyrillic_ya: {
			code: 1745,
			description: "(я) CYRILLIC SMALL LETTER YA"
		},
		XK_Cyrillic_er: {
			code: 1746,
			description: "(р) CYRILLIC SMALL LETTER ER"
		},
		XK_Cyrillic_es: {
			code: 1747,
			description: "(с) CYRILLIC SMALL LETTER ES"
		},
		XK_Cyrillic_te: {
			code: 1748,
			description: "(т) CYRILLIC SMALL LETTER TE"
		},
		XK_Cyrillic_u: {
			code: 1749,
			description: "(у) CYRILLIC SMALL LETTER U"
		},
		XK_Cyrillic_zhe: {
			code: 1750,
			description: "(ж) CYRILLIC SMALL LETTER ZHE"
		},
		XK_Cyrillic_ve: {
			code: 1751,
			description: "(в) CYRILLIC SMALL LETTER VE"
		},
		XK_Cyrillic_softsign: {
			code: 1752,
			description: "(ь) CYRILLIC SMALL LETTER SOFT SIGN"
		},
		XK_Cyrillic_yeru: {
			code: 1753,
			description: "(ы) CYRILLIC SMALL LETTER YERU"
		},
		XK_Cyrillic_ze: {
			code: 1754,
			description: "(з) CYRILLIC SMALL LETTER ZE"
		},
		XK_Cyrillic_sha: {
			code: 1755,
			description: "(ш) CYRILLIC SMALL LETTER SHA"
		},
		XK_Cyrillic_e: {
			code: 1756,
			description: "(э) CYRILLIC SMALL LETTER E"
		},
		XK_Cyrillic_shcha: {
			code: 1757,
			description: "(щ) CYRILLIC SMALL LETTER SHCHA"
		},
		XK_Cyrillic_che: {
			code: 1758,
			description: "(ч) CYRILLIC SMALL LETTER CHE"
		},
		XK_Cyrillic_hardsign: {
			code: 1759,
			description: "(ъ) CYRILLIC SMALL LETTER HARD SIGN"
		},
		XK_Cyrillic_YU: {
			code: 1760,
			description: "(Ю) CYRILLIC CAPITAL LETTER YU"
		},
		XK_Cyrillic_A: {
			code: 1761,
			description: "(А) CYRILLIC CAPITAL LETTER A"
		},
		XK_Cyrillic_BE: {
			code: 1762,
			description: "(Б) CYRILLIC CAPITAL LETTER BE"
		},
		XK_Cyrillic_TSE: {
			code: 1763,
			description: "(Ц) CYRILLIC CAPITAL LETTER TSE"
		},
		XK_Cyrillic_DE: {
			code: 1764,
			description: "(Д) CYRILLIC CAPITAL LETTER DE"
		},
		XK_Cyrillic_IE: {
			code: 1765,
			description: "(Е) CYRILLIC CAPITAL LETTER IE"
		},
		XK_Cyrillic_EF: {
			code: 1766,
			description: "(Ф) CYRILLIC CAPITAL LETTER EF"
		},
		XK_Cyrillic_GHE: {
			code: 1767,
			description: "(Г) CYRILLIC CAPITAL LETTER GHE"
		},
		XK_Cyrillic_HA: {
			code: 1768,
			description: "(Х) CYRILLIC CAPITAL LETTER HA"
		},
		XK_Cyrillic_I: {
			code: 1769,
			description: "(И) CYRILLIC CAPITAL LETTER I"
		},
		XK_Cyrillic_SHORTI: {
			code: 1770,
			description: "(Й) CYRILLIC CAPITAL LETTER SHORT I"
		},
		XK_Cyrillic_KA: {
			code: 1771,
			description: "(К) CYRILLIC CAPITAL LETTER KA"
		},
		XK_Cyrillic_EL: {
			code: 1772,
			description: "(Л) CYRILLIC CAPITAL LETTER EL"
		},
		XK_Cyrillic_EM: {
			code: 1773,
			description: "(М) CYRILLIC CAPITAL LETTER EM"
		},
		XK_Cyrillic_EN: {
			code: 1774,
			description: "(Н) CYRILLIC CAPITAL LETTER EN"
		},
		XK_Cyrillic_O: {
			code: 1775,
			description: "(О) CYRILLIC CAPITAL LETTER O"
		},
		XK_Cyrillic_PE: {
			code: 1776,
			description: "(П) CYRILLIC CAPITAL LETTER PE"
		},
		XK_Cyrillic_YA: {
			code: 1777,
			description: "(Я) CYRILLIC CAPITAL LETTER YA"
		},
		XK_Cyrillic_ER: {
			code: 1778,
			description: "(Р) CYRILLIC CAPITAL LETTER ER"
		},
		XK_Cyrillic_ES: {
			code: 1779,
			description: "(С) CYRILLIC CAPITAL LETTER ES"
		},
		XK_Cyrillic_TE: {
			code: 1780,
			description: "(Т) CYRILLIC CAPITAL LETTER TE"
		},
		XK_Cyrillic_U: {
			code: 1781,
			description: "(У) CYRILLIC CAPITAL LETTER U"
		},
		XK_Cyrillic_ZHE: {
			code: 1782,
			description: "(Ж) CYRILLIC CAPITAL LETTER ZHE"
		},
		XK_Cyrillic_VE: {
			code: 1783,
			description: "(В) CYRILLIC CAPITAL LETTER VE"
		},
		XK_Cyrillic_SOFTSIGN: {
			code: 1784,
			description: "(Ь) CYRILLIC CAPITAL LETTER SOFT SIGN"
		},
		XK_Cyrillic_YERU: {
			code: 1785,
			description: "(Ы) CYRILLIC CAPITAL LETTER YERU"
		},
		XK_Cyrillic_ZE: {
			code: 1786,
			description: "(З) CYRILLIC CAPITAL LETTER ZE"
		},
		XK_Cyrillic_SHA: {
			code: 1787,
			description: "(Ш) CYRILLIC CAPITAL LETTER SHA"
		},
		XK_Cyrillic_E: {
			code: 1788,
			description: "(Э) CYRILLIC CAPITAL LETTER E"
		},
		XK_Cyrillic_SHCHA: {
			code: 1789,
			description: "(Щ) CYRILLIC CAPITAL LETTER SHCHA"
		},
		XK_Cyrillic_CHE: {
			code: 1790,
			description: "(Ч) CYRILLIC CAPITAL LETTER CHE"
		},
		XK_Cyrillic_HARDSIGN: {
			code: 1791,
			description: "(Ъ) CYRILLIC CAPITAL LETTER HARD SIGN"
		},
		XK_Greek_ALPHAaccent: {
			code: 1953,
			description: "(Ά) GREEK CAPITAL LETTER ALPHA WITH TONOS"
		},
		XK_Greek_EPSILONaccent: {
			code: 1954,
			description: "(Έ) GREEK CAPITAL LETTER EPSILON WITH TONOS"
		},
		XK_Greek_ETAaccent: {
			code: 1955,
			description: "(Ή) GREEK CAPITAL LETTER ETA WITH TONOS"
		},
		XK_Greek_IOTAaccent: {
			code: 1956,
			description: "(Ί) GREEK CAPITAL LETTER IOTA WITH TONOS"
		},
		XK_Greek_IOTAdieresis: {
			code: 1957,
			description: "(Ϊ) GREEK CAPITAL LETTER IOTA WITH DIALYTIKA"
		},
		XK_Greek_IOTAdiaeresis: {
			code: 1957,
			description: "old typo"
		},
		XK_Greek_OMICRONaccent: {
			code: 1959,
			description: "(Ό) GREEK CAPITAL LETTER OMICRON WITH TONOS"
		},
		XK_Greek_UPSILONaccent: {
			code: 1960,
			description: "(Ύ) GREEK CAPITAL LETTER UPSILON WITH TONOS"
		},
		XK_Greek_UPSILONdieresis: {
			code: 1961,
			description: "(Ϋ) GREEK CAPITAL LETTER UPSILON WITH DIALYTIKA"
		},
		XK_Greek_OMEGAaccent: {
			code: 1963,
			description: "(Ώ) GREEK CAPITAL LETTER OMEGA WITH TONOS"
		},
		XK_Greek_accentdieresis: {
			code: 1966,
			description: "(΅) GREEK DIALYTIKA TONOS"
		},
		XK_Greek_horizbar: {
			code: 1967,
			description: "(―) HORIZONTAL BAR"
		},
		XK_Greek_alphaaccent: {
			code: 1969,
			description: "(ά) GREEK SMALL LETTER ALPHA WITH TONOS"
		},
		XK_Greek_epsilonaccent: {
			code: 1970,
			description: "(έ) GREEK SMALL LETTER EPSILON WITH TONOS"
		},
		XK_Greek_etaaccent: {
			code: 1971,
			description: "(ή) GREEK SMALL LETTER ETA WITH TONOS"
		},
		XK_Greek_iotaaccent: {
			code: 1972,
			description: "(ί) GREEK SMALL LETTER IOTA WITH TONOS"
		},
		XK_Greek_iotadieresis: {
			code: 1973,
			description: "(ϊ) GREEK SMALL LETTER IOTA WITH DIALYTIKA"
		},
		XK_Greek_iotaaccentdieresis: {
			code: 1974,
			description: "(ΐ) GREEK SMALL LETTER IOTA WITH DIALYTIKA AND TONOS"
		},
		XK_Greek_omicronaccent: {
			code: 1975,
			description: "(ό) GREEK SMALL LETTER OMICRON WITH TONOS"
		},
		XK_Greek_upsilonaccent: {
			code: 1976,
			description: "(ύ) GREEK SMALL LETTER UPSILON WITH TONOS"
		},
		XK_Greek_upsilondieresis: {
			code: 1977,
			description: "(ϋ) GREEK SMALL LETTER UPSILON WITH DIALYTIKA"
		},
		XK_Greek_upsilonaccentdieresis: {
			code: 1978,
			description: "(ΰ) GREEK SMALL LETTER UPSILON WITH DIALYTIKA AND TONOS"
		},
		XK_Greek_omegaaccent: {
			code: 1979,
			description: "(ώ) GREEK SMALL LETTER OMEGA WITH TONOS"
		},
		XK_Greek_ALPHA: {
			code: 1985,
			description: "(Α) GREEK CAPITAL LETTER ALPHA"
		},
		XK_Greek_BETA: {
			code: 1986,
			description: "(Β) GREEK CAPITAL LETTER BETA"
		},
		XK_Greek_GAMMA: {
			code: 1987,
			description: "(Γ) GREEK CAPITAL LETTER GAMMA"
		},
		XK_Greek_DELTA: {
			code: 1988,
			description: "(Δ) GREEK CAPITAL LETTER DELTA"
		},
		XK_Greek_EPSILON: {
			code: 1989,
			description: "(Ε) GREEK CAPITAL LETTER EPSILON"
		},
		XK_Greek_ZETA: {
			code: 1990,
			description: "(Ζ) GREEK CAPITAL LETTER ZETA"
		},
		XK_Greek_ETA: {
			code: 1991,
			description: "(Η) GREEK CAPITAL LETTER ETA"
		},
		XK_Greek_THETA: {
			code: 1992,
			description: "(Θ) GREEK CAPITAL LETTER THETA"
		},
		XK_Greek_IOTA: {
			code: 1993,
			description: "(Ι) GREEK CAPITAL LETTER IOTA"
		},
		XK_Greek_KAPPA: {
			code: 1994,
			description: "(Κ) GREEK CAPITAL LETTER KAPPA"
		},
		XK_Greek_LAMDA: {
			code: 1995,
			description: "(Λ) GREEK CAPITAL LETTER LAMDA"
		},
		XK_Greek_LAMBDA: {
			code: 1995,
			description: "(Λ) GREEK CAPITAL LETTER LAMDA"
		},
		XK_Greek_MU: {
			code: 1996,
			description: "(Μ) GREEK CAPITAL LETTER MU"
		},
		XK_Greek_NU: {
			code: 1997,
			description: "(Ν) GREEK CAPITAL LETTER NU"
		},
		XK_Greek_XI: {
			code: 1998,
			description: "(Ξ) GREEK CAPITAL LETTER XI"
		},
		XK_Greek_OMICRON: {
			code: 1999,
			description: "(Ο) GREEK CAPITAL LETTER OMICRON"
		},
		XK_Greek_PI: {
			code: 2e3,
			description: "(Π) GREEK CAPITAL LETTER PI"
		},
		XK_Greek_RHO: {
			code: 2001,
			description: "(Ρ) GREEK CAPITAL LETTER RHO"
		},
		XK_Greek_SIGMA: {
			code: 2002,
			description: "(Σ) GREEK CAPITAL LETTER SIGMA"
		},
		XK_Greek_TAU: {
			code: 2004,
			description: "(Τ) GREEK CAPITAL LETTER TAU"
		},
		XK_Greek_UPSILON: {
			code: 2005,
			description: "(Υ) GREEK CAPITAL LETTER UPSILON"
		},
		XK_Greek_PHI: {
			code: 2006,
			description: "(Φ) GREEK CAPITAL LETTER PHI"
		},
		XK_Greek_CHI: {
			code: 2007,
			description: "(Χ) GREEK CAPITAL LETTER CHI"
		},
		XK_Greek_PSI: {
			code: 2008,
			description: "(Ψ) GREEK CAPITAL LETTER PSI"
		},
		XK_Greek_OMEGA: {
			code: 2009,
			description: "(Ω) GREEK CAPITAL LETTER OMEGA"
		},
		XK_Greek_alpha: {
			code: 2017,
			description: "(α) GREEK SMALL LETTER ALPHA"
		},
		XK_Greek_beta: {
			code: 2018,
			description: "(β) GREEK SMALL LETTER BETA"
		},
		XK_Greek_gamma: {
			code: 2019,
			description: "(γ) GREEK SMALL LETTER GAMMA"
		},
		XK_Greek_delta: {
			code: 2020,
			description: "(δ) GREEK SMALL LETTER DELTA"
		},
		XK_Greek_epsilon: {
			code: 2021,
			description: "(ε) GREEK SMALL LETTER EPSILON"
		},
		XK_Greek_zeta: {
			code: 2022,
			description: "(ζ) GREEK SMALL LETTER ZETA"
		},
		XK_Greek_eta: {
			code: 2023,
			description: "(η) GREEK SMALL LETTER ETA"
		},
		XK_Greek_theta: {
			code: 2024,
			description: "(θ) GREEK SMALL LETTER THETA"
		},
		XK_Greek_iota: {
			code: 2025,
			description: "(ι) GREEK SMALL LETTER IOTA"
		},
		XK_Greek_kappa: {
			code: 2026,
			description: "(κ) GREEK SMALL LETTER KAPPA"
		},
		XK_Greek_lamda: {
			code: 2027,
			description: "(λ) GREEK SMALL LETTER LAMDA"
		},
		XK_Greek_lambda: {
			code: 2027,
			description: "(λ) GREEK SMALL LETTER LAMDA"
		},
		XK_Greek_mu: {
			code: 2028,
			description: "(μ) GREEK SMALL LETTER MU"
		},
		XK_Greek_nu: {
			code: 2029,
			description: "(ν) GREEK SMALL LETTER NU"
		},
		XK_Greek_xi: {
			code: 2030,
			description: "(ξ) GREEK SMALL LETTER XI"
		},
		XK_Greek_omicron: {
			code: 2031,
			description: "(ο) GREEK SMALL LETTER OMICRON"
		},
		XK_Greek_pi: {
			code: 2032,
			description: "(π) GREEK SMALL LETTER PI"
		},
		XK_Greek_rho: {
			code: 2033,
			description: "(ρ) GREEK SMALL LETTER RHO"
		},
		XK_Greek_sigma: {
			code: 2034,
			description: "(σ) GREEK SMALL LETTER SIGMA"
		},
		XK_Greek_finalsmallsigma: {
			code: 2035,
			description: "(ς) GREEK SMALL LETTER FINAL SIGMA"
		},
		XK_Greek_tau: {
			code: 2036,
			description: "(τ) GREEK SMALL LETTER TAU"
		},
		XK_Greek_upsilon: {
			code: 2037,
			description: "(υ) GREEK SMALL LETTER UPSILON"
		},
		XK_Greek_phi: {
			code: 2038,
			description: "(φ) GREEK SMALL LETTER PHI"
		},
		XK_Greek_chi: {
			code: 2039,
			description: "(χ) GREEK SMALL LETTER CHI"
		},
		XK_Greek_psi: {
			code: 2040,
			description: "(ψ) GREEK SMALL LETTER PSI"
		},
		XK_Greek_omega: {
			code: 2041,
			description: "(ω) GREEK SMALL LETTER OMEGA"
		},
		XK_Greek_switch: {
			code: 65406,
			description: "Alias for mode_switch"
		},
		XK_leftradical: {
			code: 2209,
			description: "(⎷) RADICAL SYMBOL BOTTOM"
		},
		XK_topleftradical: {
			code: 2210,
			description: "((┌) BOX DRAWINGS LIGHT DOWN AND RIGHT)"
		},
		XK_horizconnector: {
			code: 2211,
			description: "((─) BOX DRAWINGS LIGHT HORIZONTAL)"
		},
		XK_topintegral: {
			code: 2212,
			description: "(⌠) TOP HALF INTEGRAL"
		},
		XK_botintegral: {
			code: 2213,
			description: "(⌡) BOTTOM HALF INTEGRAL"
		},
		XK_vertconnector: {
			code: 2214,
			description: "((│) BOX DRAWINGS LIGHT VERTICAL)"
		},
		XK_topleftsqbracket: {
			code: 2215,
			description: "(⎡) LEFT SQUARE BRACKET UPPER CORNER"
		},
		XK_botleftsqbracket: {
			code: 2216,
			description: "(⎣) LEFT SQUARE BRACKET LOWER CORNER"
		},
		XK_toprightsqbracket: {
			code: 2217,
			description: "(⎤) RIGHT SQUARE BRACKET UPPER CORNER"
		},
		XK_botrightsqbracket: {
			code: 2218,
			description: "(⎦) RIGHT SQUARE BRACKET LOWER CORNER"
		},
		XK_topleftparens: {
			code: 2219,
			description: "(⎛) LEFT PARENTHESIS UPPER HOOK"
		},
		XK_botleftparens: {
			code: 2220,
			description: "(⎝) LEFT PARENTHESIS LOWER HOOK"
		},
		XK_toprightparens: {
			code: 2221,
			description: "(⎞) RIGHT PARENTHESIS UPPER HOOK"
		},
		XK_botrightparens: {
			code: 2222,
			description: "(⎠) RIGHT PARENTHESIS LOWER HOOK"
		},
		XK_leftmiddlecurlybrace: {
			code: 2223,
			description: "(⎨) LEFT CURLY BRACKET MIDDLE PIECE"
		},
		XK_rightmiddlecurlybrace: {
			code: 2224,
			description: "(⎬) RIGHT CURLY BRACKET MIDDLE PIECE"
		},
		XK_topleftsummation: {
			code: 2225,
			description: null
		},
		XK_botleftsummation: {
			code: 2226,
			description: null
		},
		XK_topvertsummationconnector: {
			code: 2227,
			description: null
		},
		XK_botvertsummationconnector: {
			code: 2228,
			description: null
		},
		XK_toprightsummation: {
			code: 2229,
			description: null
		},
		XK_botrightsummation: {
			code: 2230,
			description: null
		},
		XK_rightmiddlesummation: {
			code: 2231,
			description: null
		},
		XK_lessthanequal: {
			code: 2236,
			description: "(≤) LESS-THAN OR EQUAL TO"
		},
		XK_notequal: {
			code: 2237,
			description: "(≠) NOT EQUAL TO"
		},
		XK_greaterthanequal: {
			code: 2238,
			description: "(≥) GREATER-THAN OR EQUAL TO"
		},
		XK_integral: {
			code: 2239,
			description: "(∫) INTEGRAL"
		},
		XK_therefore: {
			code: 2240,
			description: "(∴) THEREFORE"
		},
		XK_variation: {
			code: 2241,
			description: "(∝) PROPORTIONAL TO"
		},
		XK_infinity: {
			code: 2242,
			description: "(∞) INFINITY"
		},
		XK_nabla: {
			code: 2245,
			description: "(∇) NABLA"
		},
		XK_approximate: {
			code: 2248,
			description: "(∼) TILDE OPERATOR"
		},
		XK_similarequal: {
			code: 2249,
			description: "(≃) ASYMPTOTICALLY EQUAL TO"
		},
		XK_ifonlyif: {
			code: 2253,
			description: "(⇔) LEFT RIGHT DOUBLE ARROW"
		},
		XK_implies: {
			code: 2254,
			description: "(⇒) RIGHTWARDS DOUBLE ARROW"
		},
		XK_identical: {
			code: 2255,
			description: "(≡) IDENTICAL TO"
		},
		XK_radical: {
			code: 2262,
			description: "(√) SQUARE ROOT"
		},
		XK_includedin: {
			code: 2266,
			description: "(⊂) SUBSET OF"
		},
		XK_includes: {
			code: 2267,
			description: "(⊃) SUPERSET OF"
		},
		XK_intersection: {
			code: 2268,
			description: "(∩) INTERSECTION"
		},
		XK_union: {
			code: 2269,
			description: "(∪) UNION"
		},
		XK_logicaland: {
			code: 2270,
			description: "(∧) LOGICAL AND"
		},
		XK_logicalor: {
			code: 2271,
			description: "(∨) LOGICAL OR"
		},
		XK_partialderivative: {
			code: 2287,
			description: "(∂) PARTIAL DIFFERENTIAL"
		},
		XK_function: {
			code: 2294,
			description: "(ƒ) LATIN SMALL LETTER F WITH HOOK"
		},
		XK_leftarrow: {
			code: 2299,
			description: "(←) LEFTWARDS ARROW"
		},
		XK_uparrow: {
			code: 2300,
			description: "(↑) UPWARDS ARROW"
		},
		XK_rightarrow: {
			code: 2301,
			description: "(→) RIGHTWARDS ARROW"
		},
		XK_downarrow: {
			code: 2302,
			description: "(↓) DOWNWARDS ARROW"
		},
		XK_blank: {
			code: 2527,
			description: null
		},
		XK_soliddiamond: {
			code: 2528,
			description: "(◆) BLACK DIAMOND"
		},
		XK_checkerboard: {
			code: 2529,
			description: "(▒) MEDIUM SHADE"
		},
		XK_ht: {
			code: 2530,
			description: "(␉) SYMBOL FOR HORIZONTAL TABULATION"
		},
		XK_ff: {
			code: 2531,
			description: "(␌) SYMBOL FOR FORM FEED"
		},
		XK_cr: {
			code: 2532,
			description: "(␍) SYMBOL FOR CARRIAGE RETURN"
		},
		XK_lf: {
			code: 2533,
			description: "(␊) SYMBOL FOR LINE FEED"
		},
		XK_nl: {
			code: 2536,
			description: "(␤) SYMBOL FOR NEWLINE"
		},
		XK_vt: {
			code: 2537,
			description: "(␋) SYMBOL FOR VERTICAL TABULATION"
		},
		XK_lowrightcorner: {
			code: 2538,
			description: "(┘) BOX DRAWINGS LIGHT UP AND LEFT"
		},
		XK_uprightcorner: {
			code: 2539,
			description: "(┐) BOX DRAWINGS LIGHT DOWN AND LEFT"
		},
		XK_upleftcorner: {
			code: 2540,
			description: "(┌) BOX DRAWINGS LIGHT DOWN AND RIGHT"
		},
		XK_lowleftcorner: {
			code: 2541,
			description: "(└) BOX DRAWINGS LIGHT UP AND RIGHT"
		},
		XK_crossinglines: {
			code: 2542,
			description: "(┼) BOX DRAWINGS LIGHT VERTICAL AND HORIZONTAL"
		},
		XK_horizlinescan1: {
			code: 2543,
			description: "(⎺) HORIZONTAL SCAN LINE-1"
		},
		XK_horizlinescan3: {
			code: 2544,
			description: "(⎻) HORIZONTAL SCAN LINE-3"
		},
		XK_horizlinescan5: {
			code: 2545,
			description: "(─) BOX DRAWINGS LIGHT HORIZONTAL"
		},
		XK_horizlinescan7: {
			code: 2546,
			description: "(⎼) HORIZONTAL SCAN LINE-7"
		},
		XK_horizlinescan9: {
			code: 2547,
			description: "(⎽) HORIZONTAL SCAN LINE-9"
		},
		XK_leftt: {
			code: 2548,
			description: "(├) BOX DRAWINGS LIGHT VERTICAL AND RIGHT"
		},
		XK_rightt: {
			code: 2549,
			description: "(┤) BOX DRAWINGS LIGHT VERTICAL AND LEFT"
		},
		XK_bott: {
			code: 2550,
			description: "(┴) BOX DRAWINGS LIGHT UP AND HORIZONTAL"
		},
		XK_topt: {
			code: 2551,
			description: "(┬) BOX DRAWINGS LIGHT DOWN AND HORIZONTAL"
		},
		XK_vertbar: {
			code: 2552,
			description: "(│) BOX DRAWINGS LIGHT VERTICAL"
		},
		XK_emspace: {
			code: 2721,
			description: "( ) EM SPACE"
		},
		XK_enspace: {
			code: 2722,
			description: "( ) EN SPACE"
		},
		XK_em3space: {
			code: 2723,
			description: "( ) THREE-PER-EM SPACE"
		},
		XK_em4space: {
			code: 2724,
			description: "( ) FOUR-PER-EM SPACE"
		},
		XK_digitspace: {
			code: 2725,
			description: "( ) FIGURE SPACE"
		},
		XK_punctspace: {
			code: 2726,
			description: "( ) PUNCTUATION SPACE"
		},
		XK_thinspace: {
			code: 2727,
			description: "( ) THIN SPACE"
		},
		XK_hairspace: {
			code: 2728,
			description: "( ) HAIR SPACE"
		},
		XK_emdash: {
			code: 2729,
			description: "(—) EM DASH"
		},
		XK_endash: {
			code: 2730,
			description: "(–) EN DASH"
		},
		XK_signifblank: {
			code: 2732,
			description: "((␣) OPEN BOX)"
		},
		XK_ellipsis: {
			code: 2734,
			description: "(…) HORIZONTAL ELLIPSIS"
		},
		XK_doubbaselinedot: {
			code: 2735,
			description: "(‥) TWO DOT LEADER"
		},
		XK_onethird: {
			code: 2736,
			description: "(⅓) VULGAR FRACTION ONE THIRD"
		},
		XK_twothirds: {
			code: 2737,
			description: "(⅔) VULGAR FRACTION TWO THIRDS"
		},
		XK_onefifth: {
			code: 2738,
			description: "(⅕) VULGAR FRACTION ONE FIFTH"
		},
		XK_twofifths: {
			code: 2739,
			description: "(⅖) VULGAR FRACTION TWO FIFTHS"
		},
		XK_threefifths: {
			code: 2740,
			description: "(⅗) VULGAR FRACTION THREE FIFTHS"
		},
		XK_fourfifths: {
			code: 2741,
			description: "(⅘) VULGAR FRACTION FOUR FIFTHS"
		},
		XK_onesixth: {
			code: 2742,
			description: "(⅙) VULGAR FRACTION ONE SIXTH"
		},
		XK_fivesixths: {
			code: 2743,
			description: "(⅚) VULGAR FRACTION FIVE SIXTHS"
		},
		XK_careof: {
			code: 2744,
			description: "(℅) CARE OF"
		},
		XK_figdash: {
			code: 2747,
			description: "(‒) FIGURE DASH"
		},
		XK_leftanglebracket: {
			code: 2748,
			description: "((⟨) MATHEMATICAL LEFT ANGLE BRACKET)"
		},
		XK_decimalpoint: {
			code: 2749,
			description: "((.) FULL STOP)"
		},
		XK_rightanglebracket: {
			code: 2750,
			description: "((⟩) MATHEMATICAL RIGHT ANGLE BRACKET)"
		},
		XK_marker: {
			code: 2751,
			description: null
		},
		XK_oneeighth: {
			code: 2755,
			description: "(⅛) VULGAR FRACTION ONE EIGHTH"
		},
		XK_threeeighths: {
			code: 2756,
			description: "(⅜) VULGAR FRACTION THREE EIGHTHS"
		},
		XK_fiveeighths: {
			code: 2757,
			description: "(⅝) VULGAR FRACTION FIVE EIGHTHS"
		},
		XK_seveneighths: {
			code: 2758,
			description: "(⅞) VULGAR FRACTION SEVEN EIGHTHS"
		},
		XK_trademark: {
			code: 2761,
			description: "(™) TRADE MARK SIGN"
		},
		XK_signaturemark: {
			code: 2762,
			description: "((☓) SALTIRE)"
		},
		XK_trademarkincircle: {
			code: 2763,
			description: null
		},
		XK_leftopentriangle: {
			code: 2764,
			description: "((◁) WHITE LEFT-POINTING TRIANGLE)"
		},
		XK_rightopentriangle: {
			code: 2765,
			description: "((▷) WHITE RIGHT-POINTING TRIANGLE)"
		},
		XK_emopencircle: {
			code: 2766,
			description: "((○) WHITE CIRCLE)"
		},
		XK_emopenrectangle: {
			code: 2767,
			description: "((▯) WHITE VERTICAL RECTANGLE)"
		},
		XK_leftsinglequotemark: {
			code: 2768,
			description: "(‘) LEFT SINGLE QUOTATION MARK"
		},
		XK_rightsinglequotemark: {
			code: 2769,
			description: "(’) RIGHT SINGLE QUOTATION MARK"
		},
		XK_leftdoublequotemark: {
			code: 2770,
			description: "(“) LEFT DOUBLE QUOTATION MARK"
		},
		XK_rightdoublequotemark: {
			code: 2771,
			description: "(”) RIGHT DOUBLE QUOTATION MARK"
		},
		XK_prescription: {
			code: 2772,
			description: "(℞) PRESCRIPTION TAKE"
		},
		XK_permille: {
			code: 2773,
			description: "(‰) PER MILLE SIGN"
		},
		XK_minutes: {
			code: 2774,
			description: "(′) PRIME"
		},
		XK_seconds: {
			code: 2775,
			description: "(″) DOUBLE PRIME"
		},
		XK_latincross: {
			code: 2777,
			description: "(✝) LATIN CROSS"
		},
		XK_hexagram: {
			code: 2778,
			description: null
		},
		XK_filledrectbullet: {
			code: 2779,
			description: "((▬) BLACK RECTANGLE)"
		},
		XK_filledlefttribullet: {
			code: 2780,
			description: "((◀) BLACK LEFT-POINTING TRIANGLE)"
		},
		XK_filledrighttribullet: {
			code: 2781,
			description: "((▶) BLACK RIGHT-POINTING TRIANGLE)"
		},
		XK_emfilledcircle: {
			code: 2782,
			description: "((●) BLACK CIRCLE)"
		},
		XK_emfilledrect: {
			code: 2783,
			description: "((▮) BLACK VERTICAL RECTANGLE)"
		},
		XK_enopencircbullet: {
			code: 2784,
			description: "((◦) WHITE BULLET)"
		},
		XK_enopensquarebullet: {
			code: 2785,
			description: "((▫) WHITE SMALL SQUARE)"
		},
		XK_openrectbullet: {
			code: 2786,
			description: "((▭) WHITE RECTANGLE)"
		},
		XK_opentribulletup: {
			code: 2787,
			description: "((△) WHITE UP-POINTING TRIANGLE)"
		},
		XK_opentribulletdown: {
			code: 2788,
			description: "((▽) WHITE DOWN-POINTING TRIANGLE)"
		},
		XK_openstar: {
			code: 2789,
			description: "((☆) WHITE STAR)"
		},
		XK_enfilledcircbullet: {
			code: 2790,
			description: "((•) BULLET)"
		},
		XK_enfilledsqbullet: {
			code: 2791,
			description: "((▪) BLACK SMALL SQUARE)"
		},
		XK_filledtribulletup: {
			code: 2792,
			description: "((▲) BLACK UP-POINTING TRIANGLE)"
		},
		XK_filledtribulletdown: {
			code: 2793,
			description: "((▼) BLACK DOWN-POINTING TRIANGLE)"
		},
		XK_leftpointer: {
			code: 2794,
			description: "((☜) WHITE LEFT POINTING INDEX)"
		},
		XK_rightpointer: {
			code: 2795,
			description: "((☞) WHITE RIGHT POINTING INDEX)"
		},
		XK_club: {
			code: 2796,
			description: "(♣) BLACK CLUB SUIT"
		},
		XK_diamond: {
			code: 2797,
			description: "(♦) BLACK DIAMOND SUIT"
		},
		XK_heart: {
			code: 2798,
			description: "(♥) BLACK HEART SUIT"
		},
		XK_maltesecross: {
			code: 2800,
			description: "(✠) MALTESE CROSS"
		},
		XK_dagger: {
			code: 2801,
			description: "(†) DAGGER"
		},
		XK_doubledagger: {
			code: 2802,
			description: "(‡) DOUBLE DAGGER"
		},
		XK_checkmark: {
			code: 2803,
			description: "(✓) CHECK MARK"
		},
		XK_ballotcross: {
			code: 2804,
			description: "(✗) BALLOT X"
		},
		XK_musicalsharp: {
			code: 2805,
			description: "(♯) MUSIC SHARP SIGN"
		},
		XK_musicalflat: {
			code: 2806,
			description: "(♭) MUSIC FLAT SIGN"
		},
		XK_malesymbol: {
			code: 2807,
			description: "(♂) MALE SIGN"
		},
		XK_femalesymbol: {
			code: 2808,
			description: "(♀) FEMALE SIGN"
		},
		XK_telephone: {
			code: 2809,
			description: "(☎) BLACK TELEPHONE"
		},
		XK_telephonerecorder: {
			code: 2810,
			description: "(⌕) TELEPHONE RECORDER"
		},
		XK_phonographcopyright: {
			code: 2811,
			description: "(℗) SOUND RECORDING COPYRIGHT"
		},
		XK_caret: {
			code: 2812,
			description: "(‸) CARET"
		},
		XK_singlelowquotemark: {
			code: 2813,
			description: "(‚) SINGLE LOW-9 QUOTATION MARK"
		},
		XK_doublelowquotemark: {
			code: 2814,
			description: "(„) DOUBLE LOW-9 QUOTATION MARK"
		},
		XK_cursor: {
			code: 2815,
			description: null
		},
		XK_leftcaret: {
			code: 2979,
			description: "((<) LESS-THAN SIGN)"
		},
		XK_rightcaret: {
			code: 2982,
			description: "((>) GREATER-THAN SIGN)"
		},
		XK_downcaret: {
			code: 2984,
			description: "((∨) LOGICAL OR)"
		},
		XK_upcaret: {
			code: 2985,
			description: "((∧) LOGICAL AND)"
		},
		XK_overbar: {
			code: 3008,
			description: "((¯) MACRON)"
		},
		XK_downtack: {
			code: 3010,
			description: "(⊤) DOWN TACK"
		},
		XK_upshoe: {
			code: 3011,
			description: "((∩) INTERSECTION)"
		},
		XK_downstile: {
			code: 3012,
			description: "(⌊) LEFT FLOOR"
		},
		XK_underbar: {
			code: 3014,
			description: "((_) LOW LINE)"
		},
		XK_jot: {
			code: 3018,
			description: "(∘) RING OPERATOR"
		},
		XK_quad: {
			code: 3020,
			description: "(⎕) APL FUNCTIONAL SYMBOL QUAD"
		},
		XK_uptack: {
			code: 3022,
			description: "(⊥) UP TACK"
		},
		XK_circle: {
			code: 3023,
			description: "(○) WHITE CIRCLE"
		},
		XK_upstile: {
			code: 3027,
			description: "(⌈) LEFT CEILING"
		},
		XK_downshoe: {
			code: 3030,
			description: "((∪) UNION)"
		},
		XK_rightshoe: {
			code: 3032,
			description: "((⊃) SUPERSET OF)"
		},
		XK_leftshoe: {
			code: 3034,
			description: "((⊂) SUBSET OF)"
		},
		XK_lefttack: {
			code: 3036,
			description: "(⊣) LEFT TACK"
		},
		XK_righttack: {
			code: 3068,
			description: "(⊢) RIGHT TACK"
		},
		XK_hebrew_doublelowline: {
			code: 3295,
			description: "(‗) DOUBLE LOW LINE"
		},
		XK_hebrew_aleph: {
			code: 3296,
			description: "(א) HEBREW LETTER ALEF"
		},
		XK_hebrew_bet: {
			code: 3297,
			description: "(ב) HEBREW LETTER BET"
		},
		XK_hebrew_beth: {
			code: 3297,
			description: "deprecated"
		},
		XK_hebrew_gimel: {
			code: 3298,
			description: "(ג) HEBREW LETTER GIMEL"
		},
		XK_hebrew_gimmel: {
			code: 3298,
			description: "deprecated"
		},
		XK_hebrew_dalet: {
			code: 3299,
			description: "(ד) HEBREW LETTER DALET"
		},
		XK_hebrew_daleth: {
			code: 3299,
			description: "deprecated"
		},
		XK_hebrew_he: {
			code: 3300,
			description: "(ה) HEBREW LETTER HE"
		},
		XK_hebrew_waw: {
			code: 3301,
			description: "(ו) HEBREW LETTER VAV"
		},
		XK_hebrew_zain: {
			code: 3302,
			description: "(ז) HEBREW LETTER ZAYIN"
		},
		XK_hebrew_zayin: {
			code: 3302,
			description: "deprecated"
		},
		XK_hebrew_chet: {
			code: 3303,
			description: "(ח) HEBREW LETTER HET"
		},
		XK_hebrew_het: {
			code: 3303,
			description: "deprecated"
		},
		XK_hebrew_tet: {
			code: 3304,
			description: "(ט) HEBREW LETTER TET"
		},
		XK_hebrew_teth: {
			code: 3304,
			description: "deprecated"
		},
		XK_hebrew_yod: {
			code: 3305,
			description: "(י) HEBREW LETTER YOD"
		},
		XK_hebrew_finalkaph: {
			code: 3306,
			description: "(ך) HEBREW LETTER FINAL KAF"
		},
		XK_hebrew_kaph: {
			code: 3307,
			description: "(כ) HEBREW LETTER KAF"
		},
		XK_hebrew_lamed: {
			code: 3308,
			description: "(ל) HEBREW LETTER LAMED"
		},
		XK_hebrew_finalmem: {
			code: 3309,
			description: "(ם) HEBREW LETTER FINAL MEM"
		},
		XK_hebrew_mem: {
			code: 3310,
			description: "(מ) HEBREW LETTER MEM"
		},
		XK_hebrew_finalnun: {
			code: 3311,
			description: "(ן) HEBREW LETTER FINAL NUN"
		},
		XK_hebrew_nun: {
			code: 3312,
			description: "(נ) HEBREW LETTER NUN"
		},
		XK_hebrew_samech: {
			code: 3313,
			description: "(ס) HEBREW LETTER SAMEKH"
		},
		XK_hebrew_samekh: {
			code: 3313,
			description: "deprecated"
		},
		XK_hebrew_ayin: {
			code: 3314,
			description: "(ע) HEBREW LETTER AYIN"
		},
		XK_hebrew_finalpe: {
			code: 3315,
			description: "(ף) HEBREW LETTER FINAL PE"
		},
		XK_hebrew_pe: {
			code: 3316,
			description: "(פ) HEBREW LETTER PE"
		},
		XK_hebrew_finalzade: {
			code: 3317,
			description: "(ץ) HEBREW LETTER FINAL TSADI"
		},
		XK_hebrew_finalzadi: {
			code: 3317,
			description: "deprecated"
		},
		XK_hebrew_zade: {
			code: 3318,
			description: "(צ) HEBREW LETTER TSADI"
		},
		XK_hebrew_zadi: {
			code: 3318,
			description: "deprecated"
		},
		XK_hebrew_qoph: {
			code: 3319,
			description: "(ק) HEBREW LETTER QOF"
		},
		XK_hebrew_kuf: {
			code: 3319,
			description: "deprecated"
		},
		XK_hebrew_resh: {
			code: 3320,
			description: "(ר) HEBREW LETTER RESH"
		},
		XK_hebrew_shin: {
			code: 3321,
			description: "(ש) HEBREW LETTER SHIN"
		},
		XK_hebrew_taw: {
			code: 3322,
			description: "(ת) HEBREW LETTER TAV"
		},
		XK_hebrew_taf: {
			code: 3322,
			description: "deprecated"
		},
		XK_Hebrew_switch: {
			code: 65406,
			description: "Alias for mode_switch"
		},
		XK_Thai_kokai: {
			code: 3489,
			description: "(ก) THAI CHARACTER KO KAI"
		},
		XK_Thai_khokhai: {
			code: 3490,
			description: "(ข) THAI CHARACTER KHO KHAI"
		},
		XK_Thai_khokhuat: {
			code: 3491,
			description: "(ฃ) THAI CHARACTER KHO KHUAT"
		},
		XK_Thai_khokhwai: {
			code: 3492,
			description: "(ค) THAI CHARACTER KHO KHWAI"
		},
		XK_Thai_khokhon: {
			code: 3493,
			description: "(ฅ) THAI CHARACTER KHO KHON"
		},
		XK_Thai_khorakhang: {
			code: 3494,
			description: "(ฆ) THAI CHARACTER KHO RAKHANG"
		},
		XK_Thai_ngongu: {
			code: 3495,
			description: "(ง) THAI CHARACTER NGO NGU"
		},
		XK_Thai_chochan: {
			code: 3496,
			description: "(จ) THAI CHARACTER CHO CHAN"
		},
		XK_Thai_choching: {
			code: 3497,
			description: "(ฉ) THAI CHARACTER CHO CHING"
		},
		XK_Thai_chochang: {
			code: 3498,
			description: "(ช) THAI CHARACTER CHO CHANG"
		},
		XK_Thai_soso: {
			code: 3499,
			description: "(ซ) THAI CHARACTER SO SO"
		},
		XK_Thai_chochoe: {
			code: 3500,
			description: "(ฌ) THAI CHARACTER CHO CHOE"
		},
		XK_Thai_yoying: {
			code: 3501,
			description: "(ญ) THAI CHARACTER YO YING"
		},
		XK_Thai_dochada: {
			code: 3502,
			description: "(ฎ) THAI CHARACTER DO CHADA"
		},
		XK_Thai_topatak: {
			code: 3503,
			description: "(ฏ) THAI CHARACTER TO PATAK"
		},
		XK_Thai_thothan: {
			code: 3504,
			description: "(ฐ) THAI CHARACTER THO THAN"
		},
		XK_Thai_thonangmontho: {
			code: 3505,
			description: "(ฑ) THAI CHARACTER THO NANGMONTHO"
		},
		XK_Thai_thophuthao: {
			code: 3506,
			description: "(ฒ) THAI CHARACTER THO PHUTHAO"
		},
		XK_Thai_nonen: {
			code: 3507,
			description: "(ณ) THAI CHARACTER NO NEN"
		},
		XK_Thai_dodek: {
			code: 3508,
			description: "(ด) THAI CHARACTER DO DEK"
		},
		XK_Thai_totao: {
			code: 3509,
			description: "(ต) THAI CHARACTER TO TAO"
		},
		XK_Thai_thothung: {
			code: 3510,
			description: "(ถ) THAI CHARACTER THO THUNG"
		},
		XK_Thai_thothahan: {
			code: 3511,
			description: "(ท) THAI CHARACTER THO THAHAN"
		},
		XK_Thai_thothong: {
			code: 3512,
			description: "(ธ) THAI CHARACTER THO THONG"
		},
		XK_Thai_nonu: {
			code: 3513,
			description: "(น) THAI CHARACTER NO NU"
		},
		XK_Thai_bobaimai: {
			code: 3514,
			description: "(บ) THAI CHARACTER BO BAIMAI"
		},
		XK_Thai_popla: {
			code: 3515,
			description: "(ป) THAI CHARACTER PO PLA"
		},
		XK_Thai_phophung: {
			code: 3516,
			description: "(ผ) THAI CHARACTER PHO PHUNG"
		},
		XK_Thai_fofa: {
			code: 3517,
			description: "(ฝ) THAI CHARACTER FO FA"
		},
		XK_Thai_phophan: {
			code: 3518,
			description: "(พ) THAI CHARACTER PHO PHAN"
		},
		XK_Thai_fofan: {
			code: 3519,
			description: "(ฟ) THAI CHARACTER FO FAN"
		},
		XK_Thai_phosamphao: {
			code: 3520,
			description: "(ภ) THAI CHARACTER PHO SAMPHAO"
		},
		XK_Thai_moma: {
			code: 3521,
			description: "(ม) THAI CHARACTER MO MA"
		},
		XK_Thai_yoyak: {
			code: 3522,
			description: "(ย) THAI CHARACTER YO YAK"
		},
		XK_Thai_rorua: {
			code: 3523,
			description: "(ร) THAI CHARACTER RO RUA"
		},
		XK_Thai_ru: {
			code: 3524,
			description: "(ฤ) THAI CHARACTER RU"
		},
		XK_Thai_loling: {
			code: 3525,
			description: "(ล) THAI CHARACTER LO LING"
		},
		XK_Thai_lu: {
			code: 3526,
			description: "(ฦ) THAI CHARACTER LU"
		},
		XK_Thai_wowaen: {
			code: 3527,
			description: "(ว) THAI CHARACTER WO WAEN"
		},
		XK_Thai_sosala: {
			code: 3528,
			description: "(ศ) THAI CHARACTER SO SALA"
		},
		XK_Thai_sorusi: {
			code: 3529,
			description: "(ษ) THAI CHARACTER SO RUSI"
		},
		XK_Thai_sosua: {
			code: 3530,
			description: "(ส) THAI CHARACTER SO SUA"
		},
		XK_Thai_hohip: {
			code: 3531,
			description: "(ห) THAI CHARACTER HO HIP"
		},
		XK_Thai_lochula: {
			code: 3532,
			description: "(ฬ) THAI CHARACTER LO CHULA"
		},
		XK_Thai_oang: {
			code: 3533,
			description: "(อ) THAI CHARACTER O ANG"
		},
		XK_Thai_honokhuk: {
			code: 3534,
			description: "(ฮ) THAI CHARACTER HO NOKHUK"
		},
		XK_Thai_paiyannoi: {
			code: 3535,
			description: "(ฯ) THAI CHARACTER PAIYANNOI"
		},
		XK_Thai_saraa: {
			code: 3536,
			description: "(ะ) THAI CHARACTER SARA A"
		},
		XK_Thai_maihanakat: {
			code: 3537,
			description: "(ั) THAI CHARACTER MAI HAN-AKAT"
		},
		XK_Thai_saraaa: {
			code: 3538,
			description: "(า) THAI CHARACTER SARA AA"
		},
		XK_Thai_saraam: {
			code: 3539,
			description: "(ำ) THAI CHARACTER SARA AM"
		},
		XK_Thai_sarai: {
			code: 3540,
			description: "(ิ) THAI CHARACTER SARA I"
		},
		XK_Thai_saraii: {
			code: 3541,
			description: "(ี) THAI CHARACTER SARA II"
		},
		XK_Thai_saraue: {
			code: 3542,
			description: "(ึ) THAI CHARACTER SARA UE"
		},
		XK_Thai_sarauee: {
			code: 3543,
			description: "(ื) THAI CHARACTER SARA UEE"
		},
		XK_Thai_sarau: {
			code: 3544,
			description: "(ุ) THAI CHARACTER SARA U"
		},
		XK_Thai_sarauu: {
			code: 3545,
			description: "(ู) THAI CHARACTER SARA UU"
		},
		XK_Thai_phinthu: {
			code: 3546,
			description: "(ฺ) THAI CHARACTER PHINTHU"
		},
		XK_Thai_maihanakat_maitho: {
			code: 3550,
			description: null
		},
		XK_Thai_baht: {
			code: 3551,
			description: "(฿) THAI CURRENCY SYMBOL BAHT"
		},
		XK_Thai_sarae: {
			code: 3552,
			description: "(เ) THAI CHARACTER SARA E"
		},
		XK_Thai_saraae: {
			code: 3553,
			description: "(แ) THAI CHARACTER SARA AE"
		},
		XK_Thai_sarao: {
			code: 3554,
			description: "(โ) THAI CHARACTER SARA O"
		},
		XK_Thai_saraaimaimuan: {
			code: 3555,
			description: "(ใ) THAI CHARACTER SARA AI MAIMUAN"
		},
		XK_Thai_saraaimaimalai: {
			code: 3556,
			description: "(ไ) THAI CHARACTER SARA AI MAIMALAI"
		},
		XK_Thai_lakkhangyao: {
			code: 3557,
			description: "(ๅ) THAI CHARACTER LAKKHANGYAO"
		},
		XK_Thai_maiyamok: {
			code: 3558,
			description: "(ๆ) THAI CHARACTER MAIYAMOK"
		},
		XK_Thai_maitaikhu: {
			code: 3559,
			description: "(็) THAI CHARACTER MAITAIKHU"
		},
		XK_Thai_maiek: {
			code: 3560,
			description: "(่) THAI CHARACTER MAI EK"
		},
		XK_Thai_maitho: {
			code: 3561,
			description: "(้) THAI CHARACTER MAI THO"
		},
		XK_Thai_maitri: {
			code: 3562,
			description: "(๊) THAI CHARACTER MAI TRI"
		},
		XK_Thai_maichattawa: {
			code: 3563,
			description: "(๋) THAI CHARACTER MAI CHATTAWA"
		},
		XK_Thai_thanthakhat: {
			code: 3564,
			description: "(์) THAI CHARACTER THANTHAKHAT"
		},
		XK_Thai_nikhahit: {
			code: 3565,
			description: "(ํ) THAI CHARACTER NIKHAHIT"
		},
		XK_Thai_leksun: {
			code: 3568,
			description: "(๐) THAI DIGIT ZERO"
		},
		XK_Thai_leknung: {
			code: 3569,
			description: "(๑) THAI DIGIT ONE"
		},
		XK_Thai_leksong: {
			code: 3570,
			description: "(๒) THAI DIGIT TWO"
		},
		XK_Thai_leksam: {
			code: 3571,
			description: "(๓) THAI DIGIT THREE"
		},
		XK_Thai_leksi: {
			code: 3572,
			description: "(๔) THAI DIGIT FOUR"
		},
		XK_Thai_lekha: {
			code: 3573,
			description: "(๕) THAI DIGIT FIVE"
		},
		XK_Thai_lekhok: {
			code: 3574,
			description: "(๖) THAI DIGIT SIX"
		},
		XK_Thai_lekchet: {
			code: 3575,
			description: "(๗) THAI DIGIT SEVEN"
		},
		XK_Thai_lekpaet: {
			code: 3576,
			description: "(๘) THAI DIGIT EIGHT"
		},
		XK_Thai_lekkao: {
			code: 3577,
			description: "(๙) THAI DIGIT NINE"
		},
		XK_Hangul: {
			code: 65329,
			description: "Hangul start/stop(toggle)"
		},
		XK_Hangul_Start: {
			code: 65330,
			description: "Hangul start"
		},
		XK_Hangul_End: {
			code: 65331,
			description: "Hangul end, English start"
		},
		XK_Hangul_Hanja: {
			code: 65332,
			description: "Start Hangul->Hanja Conversion"
		},
		XK_Hangul_Jamo: {
			code: 65333,
			description: "Hangul Jamo mode"
		},
		XK_Hangul_Romaja: {
			code: 65334,
			description: "Hangul Romaja mode"
		},
		XK_Hangul_Codeinput: {
			code: 65335,
			description: "Hangul code input mode"
		},
		XK_Hangul_Jeonja: {
			code: 65336,
			description: "Jeonja mode"
		},
		XK_Hangul_Banja: {
			code: 65337,
			description: "Banja mode"
		},
		XK_Hangul_PreHanja: {
			code: 65338,
			description: "Pre Hanja conversion"
		},
		XK_Hangul_PostHanja: {
			code: 65339,
			description: "Post Hanja conversion"
		},
		XK_Hangul_SingleCandidate: {
			code: 65340,
			description: "Single candidate"
		},
		XK_Hangul_MultipleCandidate: {
			code: 65341,
			description: "Multiple candidate"
		},
		XK_Hangul_PreviousCandidate: {
			code: 65342,
			description: "Previous candidate"
		},
		XK_Hangul_Special: {
			code: 65343,
			description: "Special symbols"
		},
		XK_Hangul_switch: {
			code: 65406,
			description: "Alias for mode_switch"
		},
		XK_Hangul_Kiyeog: {
			code: 3745,
			description: null
		},
		XK_Hangul_SsangKiyeog: {
			code: 3746,
			description: null
		},
		XK_Hangul_KiyeogSios: {
			code: 3747,
			description: null
		},
		XK_Hangul_Nieun: {
			code: 3748,
			description: null
		},
		XK_Hangul_NieunJieuj: {
			code: 3749,
			description: null
		},
		XK_Hangul_NieunHieuh: {
			code: 3750,
			description: null
		},
		XK_Hangul_Dikeud: {
			code: 3751,
			description: null
		},
		XK_Hangul_SsangDikeud: {
			code: 3752,
			description: null
		},
		XK_Hangul_Rieul: {
			code: 3753,
			description: null
		},
		XK_Hangul_RieulKiyeog: {
			code: 3754,
			description: null
		},
		XK_Hangul_RieulMieum: {
			code: 3755,
			description: null
		},
		XK_Hangul_RieulPieub: {
			code: 3756,
			description: null
		},
		XK_Hangul_RieulSios: {
			code: 3757,
			description: null
		},
		XK_Hangul_RieulTieut: {
			code: 3758,
			description: null
		},
		XK_Hangul_RieulPhieuf: {
			code: 3759,
			description: null
		},
		XK_Hangul_RieulHieuh: {
			code: 3760,
			description: null
		},
		XK_Hangul_Mieum: {
			code: 3761,
			description: null
		},
		XK_Hangul_Pieub: {
			code: 3762,
			description: null
		},
		XK_Hangul_SsangPieub: {
			code: 3763,
			description: null
		},
		XK_Hangul_PieubSios: {
			code: 3764,
			description: null
		},
		XK_Hangul_Sios: {
			code: 3765,
			description: null
		},
		XK_Hangul_SsangSios: {
			code: 3766,
			description: null
		},
		XK_Hangul_Ieung: {
			code: 3767,
			description: null
		},
		XK_Hangul_Jieuj: {
			code: 3768,
			description: null
		},
		XK_Hangul_SsangJieuj: {
			code: 3769,
			description: null
		},
		XK_Hangul_Cieuc: {
			code: 3770,
			description: null
		},
		XK_Hangul_Khieuq: {
			code: 3771,
			description: null
		},
		XK_Hangul_Tieut: {
			code: 3772,
			description: null
		},
		XK_Hangul_Phieuf: {
			code: 3773,
			description: null
		},
		XK_Hangul_Hieuh: {
			code: 3774,
			description: null
		},
		XK_Hangul_A: {
			code: 3775,
			description: null
		},
		XK_Hangul_AE: {
			code: 3776,
			description: null
		},
		XK_Hangul_YA: {
			code: 3777,
			description: null
		},
		XK_Hangul_YAE: {
			code: 3778,
			description: null
		},
		XK_Hangul_EO: {
			code: 3779,
			description: null
		},
		XK_Hangul_E: {
			code: 3780,
			description: null
		},
		XK_Hangul_YEO: {
			code: 3781,
			description: null
		},
		XK_Hangul_YE: {
			code: 3782,
			description: null
		},
		XK_Hangul_O: {
			code: 3783,
			description: null
		},
		XK_Hangul_WA: {
			code: 3784,
			description: null
		},
		XK_Hangul_WAE: {
			code: 3785,
			description: null
		},
		XK_Hangul_OE: {
			code: 3786,
			description: null
		},
		XK_Hangul_YO: {
			code: 3787,
			description: null
		},
		XK_Hangul_U: {
			code: 3788,
			description: null
		},
		XK_Hangul_WEO: {
			code: 3789,
			description: null
		},
		XK_Hangul_WE: {
			code: 3790,
			description: null
		},
		XK_Hangul_WI: {
			code: 3791,
			description: null
		},
		XK_Hangul_YU: {
			code: 3792,
			description: null
		},
		XK_Hangul_EU: {
			code: 3793,
			description: null
		},
		XK_Hangul_YI: {
			code: 3794,
			description: null
		},
		XK_Hangul_I: {
			code: 3795,
			description: null
		},
		XK_Hangul_J_Kiyeog: {
			code: 3796,
			description: null
		},
		XK_Hangul_J_SsangKiyeog: {
			code: 3797,
			description: null
		},
		XK_Hangul_J_KiyeogSios: {
			code: 3798,
			description: null
		},
		XK_Hangul_J_Nieun: {
			code: 3799,
			description: null
		},
		XK_Hangul_J_NieunJieuj: {
			code: 3800,
			description: null
		},
		XK_Hangul_J_NieunHieuh: {
			code: 3801,
			description: null
		},
		XK_Hangul_J_Dikeud: {
			code: 3802,
			description: null
		},
		XK_Hangul_J_Rieul: {
			code: 3803,
			description: null
		},
		XK_Hangul_J_RieulKiyeog: {
			code: 3804,
			description: null
		},
		XK_Hangul_J_RieulMieum: {
			code: 3805,
			description: null
		},
		XK_Hangul_J_RieulPieub: {
			code: 3806,
			description: null
		},
		XK_Hangul_J_RieulSios: {
			code: 3807,
			description: null
		},
		XK_Hangul_J_RieulTieut: {
			code: 3808,
			description: null
		},
		XK_Hangul_J_RieulPhieuf: {
			code: 3809,
			description: null
		},
		XK_Hangul_J_RieulHieuh: {
			code: 3810,
			description: null
		},
		XK_Hangul_J_Mieum: {
			code: 3811,
			description: null
		},
		XK_Hangul_J_Pieub: {
			code: 3812,
			description: null
		},
		XK_Hangul_J_PieubSios: {
			code: 3813,
			description: null
		},
		XK_Hangul_J_Sios: {
			code: 3814,
			description: null
		},
		XK_Hangul_J_SsangSios: {
			code: 3815,
			description: null
		},
		XK_Hangul_J_Ieung: {
			code: 3816,
			description: null
		},
		XK_Hangul_J_Jieuj: {
			code: 3817,
			description: null
		},
		XK_Hangul_J_Cieuc: {
			code: 3818,
			description: null
		},
		XK_Hangul_J_Khieuq: {
			code: 3819,
			description: null
		},
		XK_Hangul_J_Tieut: {
			code: 3820,
			description: null
		},
		XK_Hangul_J_Phieuf: {
			code: 3821,
			description: null
		},
		XK_Hangul_J_Hieuh: {
			code: 3822,
			description: null
		},
		XK_Hangul_RieulYeorinHieuh: {
			code: 3823,
			description: null
		},
		XK_Hangul_SunkyeongeumMieum: {
			code: 3824,
			description: null
		},
		XK_Hangul_SunkyeongeumPieub: {
			code: 3825,
			description: null
		},
		XK_Hangul_PanSios: {
			code: 3826,
			description: null
		},
		XK_Hangul_KkogjiDalrinIeung: {
			code: 3827,
			description: null
		},
		XK_Hangul_SunkyeongeumPhieuf: {
			code: 3828,
			description: null
		},
		XK_Hangul_YeorinHieuh: {
			code: 3829,
			description: null
		},
		XK_Hangul_AraeA: {
			code: 3830,
			description: null
		},
		XK_Hangul_AraeAE: {
			code: 3831,
			description: null
		},
		XK_Hangul_J_PanSios: {
			code: 3832,
			description: null
		},
		XK_Hangul_J_KkogjiDalrinIeung: {
			code: 3833,
			description: null
		},
		XK_Hangul_J_YeorinHieuh: {
			code: 3834,
			description: null
		},
		XK_Korean_Won: {
			code: 3839,
			description: "((₩) WON SIGN)"
		},
		XK_Armenian_ligature_ew: {
			code: 16778631,
			description: "(և) ARMENIAN SMALL LIGATURE ECH YIWN"
		},
		XK_Armenian_full_stop: {
			code: 16778633,
			description: "(։) ARMENIAN FULL STOP"
		},
		XK_Armenian_verjaket: {
			code: 16778633,
			description: "(։) ARMENIAN FULL STOP"
		},
		XK_Armenian_separation_mark: {
			code: 16778589,
			description: "(՝) ARMENIAN COMMA"
		},
		XK_Armenian_but: {
			code: 16778589,
			description: "(՝) ARMENIAN COMMA"
		},
		XK_Armenian_hyphen: {
			code: 16778634,
			description: "(֊) ARMENIAN HYPHEN"
		},
		XK_Armenian_yentamna: {
			code: 16778634,
			description: "(֊) ARMENIAN HYPHEN"
		},
		XK_Armenian_exclam: {
			code: 16778588,
			description: "(՜) ARMENIAN EXCLAMATION MARK"
		},
		XK_Armenian_amanak: {
			code: 16778588,
			description: "(՜) ARMENIAN EXCLAMATION MARK"
		},
		XK_Armenian_accent: {
			code: 16778587,
			description: "(՛) ARMENIAN EMPHASIS MARK"
		},
		XK_Armenian_shesht: {
			code: 16778587,
			description: "(՛) ARMENIAN EMPHASIS MARK"
		},
		XK_Armenian_question: {
			code: 16778590,
			description: "(՞) ARMENIAN QUESTION MARK"
		},
		XK_Armenian_paruyk: {
			code: 16778590,
			description: "(՞) ARMENIAN QUESTION MARK"
		},
		XK_Armenian_AYB: {
			code: 16778545,
			description: "(Ա) ARMENIAN CAPITAL LETTER AYB"
		},
		XK_Armenian_ayb: {
			code: 16778593,
			description: "(ա) ARMENIAN SMALL LETTER AYB"
		},
		XK_Armenian_BEN: {
			code: 16778546,
			description: "(Բ) ARMENIAN CAPITAL LETTER BEN"
		},
		XK_Armenian_ben: {
			code: 16778594,
			description: "(բ) ARMENIAN SMALL LETTER BEN"
		},
		XK_Armenian_GIM: {
			code: 16778547,
			description: "(Գ) ARMENIAN CAPITAL LETTER GIM"
		},
		XK_Armenian_gim: {
			code: 16778595,
			description: "(գ) ARMENIAN SMALL LETTER GIM"
		},
		XK_Armenian_DA: {
			code: 16778548,
			description: "(Դ) ARMENIAN CAPITAL LETTER DA"
		},
		XK_Armenian_da: {
			code: 16778596,
			description: "(դ) ARMENIAN SMALL LETTER DA"
		},
		XK_Armenian_YECH: {
			code: 16778549,
			description: "(Ե) ARMENIAN CAPITAL LETTER ECH"
		},
		XK_Armenian_yech: {
			code: 16778597,
			description: "(ե) ARMENIAN SMALL LETTER ECH"
		},
		XK_Armenian_ZA: {
			code: 16778550,
			description: "(Զ) ARMENIAN CAPITAL LETTER ZA"
		},
		XK_Armenian_za: {
			code: 16778598,
			description: "(զ) ARMENIAN SMALL LETTER ZA"
		},
		XK_Armenian_E: {
			code: 16778551,
			description: "(Է) ARMENIAN CAPITAL LETTER EH"
		},
		XK_Armenian_e: {
			code: 16778599,
			description: "(է) ARMENIAN SMALL LETTER EH"
		},
		XK_Armenian_AT: {
			code: 16778552,
			description: "(Ը) ARMENIAN CAPITAL LETTER ET"
		},
		XK_Armenian_at: {
			code: 16778600,
			description: "(ը) ARMENIAN SMALL LETTER ET"
		},
		XK_Armenian_TO: {
			code: 16778553,
			description: "(Թ) ARMENIAN CAPITAL LETTER TO"
		},
		XK_Armenian_to: {
			code: 16778601,
			description: "(թ) ARMENIAN SMALL LETTER TO"
		},
		XK_Armenian_ZHE: {
			code: 16778554,
			description: "(Ժ) ARMENIAN CAPITAL LETTER ZHE"
		},
		XK_Armenian_zhe: {
			code: 16778602,
			description: "(ժ) ARMENIAN SMALL LETTER ZHE"
		},
		XK_Armenian_INI: {
			code: 16778555,
			description: "(Ի) ARMENIAN CAPITAL LETTER INI"
		},
		XK_Armenian_ini: {
			code: 16778603,
			description: "(ի) ARMENIAN SMALL LETTER INI"
		},
		XK_Armenian_LYUN: {
			code: 16778556,
			description: "(Լ) ARMENIAN CAPITAL LETTER LIWN"
		},
		XK_Armenian_lyun: {
			code: 16778604,
			description: "(լ) ARMENIAN SMALL LETTER LIWN"
		},
		XK_Armenian_KHE: {
			code: 16778557,
			description: "(Խ) ARMENIAN CAPITAL LETTER XEH"
		},
		XK_Armenian_khe: {
			code: 16778605,
			description: "(խ) ARMENIAN SMALL LETTER XEH"
		},
		XK_Armenian_TSA: {
			code: 16778558,
			description: "(Ծ) ARMENIAN CAPITAL LETTER CA"
		},
		XK_Armenian_tsa: {
			code: 16778606,
			description: "(ծ) ARMENIAN SMALL LETTER CA"
		},
		XK_Armenian_KEN: {
			code: 16778559,
			description: "(Կ) ARMENIAN CAPITAL LETTER KEN"
		},
		XK_Armenian_ken: {
			code: 16778607,
			description: "(կ) ARMENIAN SMALL LETTER KEN"
		},
		XK_Armenian_HO: {
			code: 16778560,
			description: "(Հ) ARMENIAN CAPITAL LETTER HO"
		},
		XK_Armenian_ho: {
			code: 16778608,
			description: "(հ) ARMENIAN SMALL LETTER HO"
		},
		XK_Armenian_DZA: {
			code: 16778561,
			description: "(Ձ) ARMENIAN CAPITAL LETTER JA"
		},
		XK_Armenian_dza: {
			code: 16778609,
			description: "(ձ) ARMENIAN SMALL LETTER JA"
		},
		XK_Armenian_GHAT: {
			code: 16778562,
			description: "(Ղ) ARMENIAN CAPITAL LETTER GHAD"
		},
		XK_Armenian_ghat: {
			code: 16778610,
			description: "(ղ) ARMENIAN SMALL LETTER GHAD"
		},
		XK_Armenian_TCHE: {
			code: 16778563,
			description: "(Ճ) ARMENIAN CAPITAL LETTER CHEH"
		},
		XK_Armenian_tche: {
			code: 16778611,
			description: "(ճ) ARMENIAN SMALL LETTER CHEH"
		},
		XK_Armenian_MEN: {
			code: 16778564,
			description: "(Մ) ARMENIAN CAPITAL LETTER MEN"
		},
		XK_Armenian_men: {
			code: 16778612,
			description: "(մ) ARMENIAN SMALL LETTER MEN"
		},
		XK_Armenian_HI: {
			code: 16778565,
			description: "(Յ) ARMENIAN CAPITAL LETTER YI"
		},
		XK_Armenian_hi: {
			code: 16778613,
			description: "(յ) ARMENIAN SMALL LETTER YI"
		},
		XK_Armenian_NU: {
			code: 16778566,
			description: "(Ն) ARMENIAN CAPITAL LETTER NOW"
		},
		XK_Armenian_nu: {
			code: 16778614,
			description: "(ն) ARMENIAN SMALL LETTER NOW"
		},
		XK_Armenian_SHA: {
			code: 16778567,
			description: "(Շ) ARMENIAN CAPITAL LETTER SHA"
		},
		XK_Armenian_sha: {
			code: 16778615,
			description: "(շ) ARMENIAN SMALL LETTER SHA"
		},
		XK_Armenian_VO: {
			code: 16778568,
			description: "(Ո) ARMENIAN CAPITAL LETTER VO"
		},
		XK_Armenian_vo: {
			code: 16778616,
			description: "(ո) ARMENIAN SMALL LETTER VO"
		},
		XK_Armenian_CHA: {
			code: 16778569,
			description: "(Չ) ARMENIAN CAPITAL LETTER CHA"
		},
		XK_Armenian_cha: {
			code: 16778617,
			description: "(չ) ARMENIAN SMALL LETTER CHA"
		},
		XK_Armenian_PE: {
			code: 16778570,
			description: "(Պ) ARMENIAN CAPITAL LETTER PEH"
		},
		XK_Armenian_pe: {
			code: 16778618,
			description: "(պ) ARMENIAN SMALL LETTER PEH"
		},
		XK_Armenian_JE: {
			code: 16778571,
			description: "(Ջ) ARMENIAN CAPITAL LETTER JHEH"
		},
		XK_Armenian_je: {
			code: 16778619,
			description: "(ջ) ARMENIAN SMALL LETTER JHEH"
		},
		XK_Armenian_RA: {
			code: 16778572,
			description: "(Ռ) ARMENIAN CAPITAL LETTER RA"
		},
		XK_Armenian_ra: {
			code: 16778620,
			description: "(ռ) ARMENIAN SMALL LETTER RA"
		},
		XK_Armenian_SE: {
			code: 16778573,
			description: "(Ս) ARMENIAN CAPITAL LETTER SEH"
		},
		XK_Armenian_se: {
			code: 16778621,
			description: "(ս) ARMENIAN SMALL LETTER SEH"
		},
		XK_Armenian_VEV: {
			code: 16778574,
			description: "(Վ) ARMENIAN CAPITAL LETTER VEW"
		},
		XK_Armenian_vev: {
			code: 16778622,
			description: "(վ) ARMENIAN SMALL LETTER VEW"
		},
		XK_Armenian_TYUN: {
			code: 16778575,
			description: "(Տ) ARMENIAN CAPITAL LETTER TIWN"
		},
		XK_Armenian_tyun: {
			code: 16778623,
			description: "(տ) ARMENIAN SMALL LETTER TIWN"
		},
		XK_Armenian_RE: {
			code: 16778576,
			description: "(Ր) ARMENIAN CAPITAL LETTER REH"
		},
		XK_Armenian_re: {
			code: 16778624,
			description: "(ր) ARMENIAN SMALL LETTER REH"
		},
		XK_Armenian_TSO: {
			code: 16778577,
			description: "(Ց) ARMENIAN CAPITAL LETTER CO"
		},
		XK_Armenian_tso: {
			code: 16778625,
			description: "(ց) ARMENIAN SMALL LETTER CO"
		},
		XK_Armenian_VYUN: {
			code: 16778578,
			description: "(Ւ) ARMENIAN CAPITAL LETTER YIWN"
		},
		XK_Armenian_vyun: {
			code: 16778626,
			description: "(ւ) ARMENIAN SMALL LETTER YIWN"
		},
		XK_Armenian_PYUR: {
			code: 16778579,
			description: "(Փ) ARMENIAN CAPITAL LETTER PIWR"
		},
		XK_Armenian_pyur: {
			code: 16778627,
			description: "(փ) ARMENIAN SMALL LETTER PIWR"
		},
		XK_Armenian_KE: {
			code: 16778580,
			description: "(Ք) ARMENIAN CAPITAL LETTER KEH"
		},
		XK_Armenian_ke: {
			code: 16778628,
			description: "(ք) ARMENIAN SMALL LETTER KEH"
		},
		XK_Armenian_O: {
			code: 16778581,
			description: "(Օ) ARMENIAN CAPITAL LETTER OH"
		},
		XK_Armenian_o: {
			code: 16778629,
			description: "(օ) ARMENIAN SMALL LETTER OH"
		},
		XK_Armenian_FE: {
			code: 16778582,
			description: "(Ֆ) ARMENIAN CAPITAL LETTER FEH"
		},
		XK_Armenian_fe: {
			code: 16778630,
			description: "(ֆ) ARMENIAN SMALL LETTER FEH"
		},
		XK_Armenian_apostrophe: {
			code: 16778586,
			description: "(՚) ARMENIAN APOSTROPHE"
		},
		XK_Georgian_an: {
			code: 16781520,
			description: "(ა) GEORGIAN LETTER AN"
		},
		XK_Georgian_ban: {
			code: 16781521,
			description: "(ბ) GEORGIAN LETTER BAN"
		},
		XK_Georgian_gan: {
			code: 16781522,
			description: "(გ) GEORGIAN LETTER GAN"
		},
		XK_Georgian_don: {
			code: 16781523,
			description: "(დ) GEORGIAN LETTER DON"
		},
		XK_Georgian_en: {
			code: 16781524,
			description: "(ე) GEORGIAN LETTER EN"
		},
		XK_Georgian_vin: {
			code: 16781525,
			description: "(ვ) GEORGIAN LETTER VIN"
		},
		XK_Georgian_zen: {
			code: 16781526,
			description: "(ზ) GEORGIAN LETTER ZEN"
		},
		XK_Georgian_tan: {
			code: 16781527,
			description: "(თ) GEORGIAN LETTER TAN"
		},
		XK_Georgian_in: {
			code: 16781528,
			description: "(ი) GEORGIAN LETTER IN"
		},
		XK_Georgian_kan: {
			code: 16781529,
			description: "(კ) GEORGIAN LETTER KAN"
		},
		XK_Georgian_las: {
			code: 16781530,
			description: "(ლ) GEORGIAN LETTER LAS"
		},
		XK_Georgian_man: {
			code: 16781531,
			description: "(მ) GEORGIAN LETTER MAN"
		},
		XK_Georgian_nar: {
			code: 16781532,
			description: "(ნ) GEORGIAN LETTER NAR"
		},
		XK_Georgian_on: {
			code: 16781533,
			description: "(ო) GEORGIAN LETTER ON"
		},
		XK_Georgian_par: {
			code: 16781534,
			description: "(პ) GEORGIAN LETTER PAR"
		},
		XK_Georgian_zhar: {
			code: 16781535,
			description: "(ჟ) GEORGIAN LETTER ZHAR"
		},
		XK_Georgian_rae: {
			code: 16781536,
			description: "(რ) GEORGIAN LETTER RAE"
		},
		XK_Georgian_san: {
			code: 16781537,
			description: "(ს) GEORGIAN LETTER SAN"
		},
		XK_Georgian_tar: {
			code: 16781538,
			description: "(ტ) GEORGIAN LETTER TAR"
		},
		XK_Georgian_un: {
			code: 16781539,
			description: "(უ) GEORGIAN LETTER UN"
		},
		XK_Georgian_phar: {
			code: 16781540,
			description: "(ფ) GEORGIAN LETTER PHAR"
		},
		XK_Georgian_khar: {
			code: 16781541,
			description: "(ქ) GEORGIAN LETTER KHAR"
		},
		XK_Georgian_ghan: {
			code: 16781542,
			description: "(ღ) GEORGIAN LETTER GHAN"
		},
		XK_Georgian_qar: {
			code: 16781543,
			description: "(ყ) GEORGIAN LETTER QAR"
		},
		XK_Georgian_shin: {
			code: 16781544,
			description: "(შ) GEORGIAN LETTER SHIN"
		},
		XK_Georgian_chin: {
			code: 16781545,
			description: "(ჩ) GEORGIAN LETTER CHIN"
		},
		XK_Georgian_can: {
			code: 16781546,
			description: "(ც) GEORGIAN LETTER CAN"
		},
		XK_Georgian_jil: {
			code: 16781547,
			description: "(ძ) GEORGIAN LETTER JIL"
		},
		XK_Georgian_cil: {
			code: 16781548,
			description: "(წ) GEORGIAN LETTER CIL"
		},
		XK_Georgian_char: {
			code: 16781549,
			description: "(ჭ) GEORGIAN LETTER CHAR"
		},
		XK_Georgian_xan: {
			code: 16781550,
			description: "(ხ) GEORGIAN LETTER XAN"
		},
		XK_Georgian_jhan: {
			code: 16781551,
			description: "(ჯ) GEORGIAN LETTER JHAN"
		},
		XK_Georgian_hae: {
			code: 16781552,
			description: "(ჰ) GEORGIAN LETTER HAE"
		},
		XK_Georgian_he: {
			code: 16781553,
			description: "(ჱ) GEORGIAN LETTER HE"
		},
		XK_Georgian_hie: {
			code: 16781554,
			description: "(ჲ) GEORGIAN LETTER HIE"
		},
		XK_Georgian_we: {
			code: 16781555,
			description: "(ჳ) GEORGIAN LETTER WE"
		},
		XK_Georgian_har: {
			code: 16781556,
			description: "(ჴ) GEORGIAN LETTER HAR"
		},
		XK_Georgian_hoe: {
			code: 16781557,
			description: "(ჵ) GEORGIAN LETTER HOE"
		},
		XK_Georgian_fi: {
			code: 16781558,
			description: "(ჶ) GEORGIAN LETTER FI"
		},
		XK_Xabovedot: {
			code: 16785034,
			description: "(Ẋ) LATIN CAPITAL LETTER X WITH DOT ABOVE"
		},
		XK_Ibreve: {
			code: 16777516,
			description: "(Ĭ) LATIN CAPITAL LETTER I WITH BREVE"
		},
		XK_Zstroke: {
			code: 16777653,
			description: "(Ƶ) LATIN CAPITAL LETTER Z WITH STROKE"
		},
		XK_Gcaron: {
			code: 16777702,
			description: "(Ǧ) LATIN CAPITAL LETTER G WITH CARON"
		},
		XK_Ocaron: {
			code: 16777681,
			description: "(ǒ) LATIN CAPITAL LETTER O WITH CARON"
		},
		XK_Obarred: {
			code: 16777631,
			description: "(Ɵ) LATIN CAPITAL LETTER O WITH MIDDLE TILDE"
		},
		XK_xabovedot: {
			code: 16785035,
			description: "(ẋ) LATIN SMALL LETTER X WITH DOT ABOVE"
		},
		XK_ibreve: {
			code: 16777517,
			description: "(ĭ) LATIN SMALL LETTER I WITH BREVE"
		},
		XK_zstroke: {
			code: 16777654,
			description: "(ƶ) LATIN SMALL LETTER Z WITH STROKE"
		},
		XK_gcaron: {
			code: 16777703,
			description: "(ǧ) LATIN SMALL LETTER G WITH CARON"
		},
		XK_ocaron: {
			code: 16777682,
			description: "(ǒ) LATIN SMALL LETTER O WITH CARON"
		},
		XK_obarred: {
			code: 16777845,
			description: "(ɵ) LATIN SMALL LETTER BARRED O"
		},
		XK_SCHWA: {
			code: 16777615,
			description: "(Ə) LATIN CAPITAL LETTER SCHWA"
		},
		XK_schwa: {
			code: 16777817,
			description: "(ə) LATIN SMALL LETTER SCHWA"
		},
		XK_EZH: {
			code: 16777655,
			description: "(Ʒ) LATIN CAPITAL LETTER EZH"
		},
		XK_ezh: {
			code: 16777874,
			description: "(ʒ) LATIN SMALL LETTER EZH"
		},
		XK_Lbelowdot: {
			code: 16784950,
			description: "(Ḷ) LATIN CAPITAL LETTER L WITH DOT BELOW"
		},
		XK_lbelowdot: {
			code: 16784951,
			description: "(ḷ) LATIN SMALL LETTER L WITH DOT BELOW"
		},
		XK_Abelowdot: {
			code: 16785056,
			description: "(Ạ) LATIN CAPITAL LETTER A WITH DOT BELOW"
		},
		XK_abelowdot: {
			code: 16785057,
			description: "(ạ) LATIN SMALL LETTER A WITH DOT BELOW"
		},
		XK_Ahook: {
			code: 16785058,
			description: "(Ả) LATIN CAPITAL LETTER A WITH HOOK ABOVE"
		},
		XK_ahook: {
			code: 16785059,
			description: "(ả) LATIN SMALL LETTER A WITH HOOK ABOVE"
		},
		XK_Acircumflexacute: {
			code: 16785060,
			description: "(Ấ) LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND ACUTE"
		},
		XK_acircumflexacute: {
			code: 16785061,
			description: "(ấ) LATIN SMALL LETTER A WITH CIRCUMFLEX AND ACUTE"
		},
		XK_Acircumflexgrave: {
			code: 16785062,
			description: "(Ầ) LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND GRAVE"
		},
		XK_acircumflexgrave: {
			code: 16785063,
			description: "(ầ) LATIN SMALL LETTER A WITH CIRCUMFLEX AND GRAVE"
		},
		XK_Acircumflexhook: {
			code: 16785064,
			description: "(Ẩ) LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND HOOK ABOVE"
		},
		XK_acircumflexhook: {
			code: 16785065,
			description: "(ẩ) LATIN SMALL LETTER A WITH CIRCUMFLEX AND HOOK ABOVE"
		},
		XK_Acircumflextilde: {
			code: 16785066,
			description: "(Ẫ) LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND TILDE"
		},
		XK_acircumflextilde: {
			code: 16785067,
			description: "(ẫ) LATIN SMALL LETTER A WITH CIRCUMFLEX AND TILDE"
		},
		XK_Acircumflexbelowdot: {
			code: 16785068,
			description: "(Ậ) LATIN CAPITAL LETTER A WITH CIRCUMFLEX AND DOT BELOW"
		},
		XK_acircumflexbelowdot: {
			code: 16785069,
			description: "(ậ) LATIN SMALL LETTER A WITH CIRCUMFLEX AND DOT BELOW"
		},
		XK_Abreveacute: {
			code: 16785070,
			description: "(Ắ) LATIN CAPITAL LETTER A WITH BREVE AND ACUTE"
		},
		XK_abreveacute: {
			code: 16785071,
			description: "(ắ) LATIN SMALL LETTER A WITH BREVE AND ACUTE"
		},
		XK_Abrevegrave: {
			code: 16785072,
			description: "(Ằ) LATIN CAPITAL LETTER A WITH BREVE AND GRAVE"
		},
		XK_abrevegrave: {
			code: 16785073,
			description: "(ằ) LATIN SMALL LETTER A WITH BREVE AND GRAVE"
		},
		XK_Abrevehook: {
			code: 16785074,
			description: "(Ẳ) LATIN CAPITAL LETTER A WITH BREVE AND HOOK ABOVE"
		},
		XK_abrevehook: {
			code: 16785075,
			description: "(ẳ) LATIN SMALL LETTER A WITH BREVE AND HOOK ABOVE"
		},
		XK_Abrevetilde: {
			code: 16785076,
			description: "(Ẵ) LATIN CAPITAL LETTER A WITH BREVE AND TILDE"
		},
		XK_abrevetilde: {
			code: 16785077,
			description: "(ẵ) LATIN SMALL LETTER A WITH BREVE AND TILDE"
		},
		XK_Abrevebelowdot: {
			code: 16785078,
			description: "(Ặ) LATIN CAPITAL LETTER A WITH BREVE AND DOT BELOW"
		},
		XK_abrevebelowdot: {
			code: 16785079,
			description: "(ặ) LATIN SMALL LETTER A WITH BREVE AND DOT BELOW"
		},
		XK_Ebelowdot: {
			code: 16785080,
			description: "(Ẹ) LATIN CAPITAL LETTER E WITH DOT BELOW"
		},
		XK_ebelowdot: {
			code: 16785081,
			description: "(ẹ) LATIN SMALL LETTER E WITH DOT BELOW"
		},
		XK_Ehook: {
			code: 16785082,
			description: "(Ẻ) LATIN CAPITAL LETTER E WITH HOOK ABOVE"
		},
		XK_ehook: {
			code: 16785083,
			description: "(ẻ) LATIN SMALL LETTER E WITH HOOK ABOVE"
		},
		XK_Etilde: {
			code: 16785084,
			description: "(Ẽ) LATIN CAPITAL LETTER E WITH TILDE"
		},
		XK_etilde: {
			code: 16785085,
			description: "(ẽ) LATIN SMALL LETTER E WITH TILDE"
		},
		XK_Ecircumflexacute: {
			code: 16785086,
			description: "(Ế) LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND ACUTE"
		},
		XK_ecircumflexacute: {
			code: 16785087,
			description: "(ế) LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE"
		},
		XK_Ecircumflexgrave: {
			code: 16785088,
			description: "(Ề) LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND GRAVE"
		},
		XK_ecircumflexgrave: {
			code: 16785089,
			description: "(ề) LATIN SMALL LETTER E WITH CIRCUMFLEX AND GRAVE"
		},
		XK_Ecircumflexhook: {
			code: 16785090,
			description: "(Ể) LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND HOOK ABOVE"
		},
		XK_ecircumflexhook: {
			code: 16785091,
			description: "(ể) LATIN SMALL LETTER E WITH CIRCUMFLEX AND HOOK ABOVE"
		},
		XK_Ecircumflextilde: {
			code: 16785092,
			description: "(Ễ) LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND TILDE"
		},
		XK_ecircumflextilde: {
			code: 16785093,
			description: "(ễ) LATIN SMALL LETTER E WITH CIRCUMFLEX AND TILDE"
		},
		XK_Ecircumflexbelowdot: {
			code: 16785094,
			description: "(Ệ) LATIN CAPITAL LETTER E WITH CIRCUMFLEX AND DOT BELOW"
		},
		XK_ecircumflexbelowdot: {
			code: 16785095,
			description: "(ệ) LATIN SMALL LETTER E WITH CIRCUMFLEX AND DOT BELOW"
		},
		XK_Ihook: {
			code: 16785096,
			description: "(Ỉ) LATIN CAPITAL LETTER I WITH HOOK ABOVE"
		},
		XK_ihook: {
			code: 16785097,
			description: "(ỉ) LATIN SMALL LETTER I WITH HOOK ABOVE"
		},
		XK_Ibelowdot: {
			code: 16785098,
			description: "(Ị) LATIN CAPITAL LETTER I WITH DOT BELOW"
		},
		XK_ibelowdot: {
			code: 16785099,
			description: "(ị) LATIN SMALL LETTER I WITH DOT BELOW"
		},
		XK_Obelowdot: {
			code: 16785100,
			description: "(Ọ) LATIN CAPITAL LETTER O WITH DOT BELOW"
		},
		XK_obelowdot: {
			code: 16785101,
			description: "(ọ) LATIN SMALL LETTER O WITH DOT BELOW"
		},
		XK_Ohook: {
			code: 16785102,
			description: "(Ỏ) LATIN CAPITAL LETTER O WITH HOOK ABOVE"
		},
		XK_ohook: {
			code: 16785103,
			description: "(ỏ) LATIN SMALL LETTER O WITH HOOK ABOVE"
		},
		XK_Ocircumflexacute: {
			code: 16785104,
			description: "(Ố) LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND ACUTE"
		},
		XK_ocircumflexacute: {
			code: 16785105,
			description: "(ố) LATIN SMALL LETTER O WITH CIRCUMFLEX AND ACUTE"
		},
		XK_Ocircumflexgrave: {
			code: 16785106,
			description: "(Ồ) LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND GRAVE"
		},
		XK_ocircumflexgrave: {
			code: 16785107,
			description: "(ồ) LATIN SMALL LETTER O WITH CIRCUMFLEX AND GRAVE"
		},
		XK_Ocircumflexhook: {
			code: 16785108,
			description: "(Ổ) LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND HOOK ABOVE"
		},
		XK_ocircumflexhook: {
			code: 16785109,
			description: "(ổ) LATIN SMALL LETTER O WITH CIRCUMFLEX AND HOOK ABOVE"
		},
		XK_Ocircumflextilde: {
			code: 16785110,
			description: "(Ỗ) LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND TILDE"
		},
		XK_ocircumflextilde: {
			code: 16785111,
			description: "(ỗ) LATIN SMALL LETTER O WITH CIRCUMFLEX AND TILDE"
		},
		XK_Ocircumflexbelowdot: {
			code: 16785112,
			description: "(Ộ) LATIN CAPITAL LETTER O WITH CIRCUMFLEX AND DOT BELOW"
		},
		XK_ocircumflexbelowdot: {
			code: 16785113,
			description: "(ộ) LATIN SMALL LETTER O WITH CIRCUMFLEX AND DOT BELOW"
		},
		XK_Ohornacute: {
			code: 16785114,
			description: "(Ớ) LATIN CAPITAL LETTER O WITH HORN AND ACUTE"
		},
		XK_ohornacute: {
			code: 16785115,
			description: "(ớ) LATIN SMALL LETTER O WITH HORN AND ACUTE"
		},
		XK_Ohorngrave: {
			code: 16785116,
			description: "(Ờ) LATIN CAPITAL LETTER O WITH HORN AND GRAVE"
		},
		XK_ohorngrave: {
			code: 16785117,
			description: "(ờ) LATIN SMALL LETTER O WITH HORN AND GRAVE"
		},
		XK_Ohornhook: {
			code: 16785118,
			description: "(Ở) LATIN CAPITAL LETTER O WITH HORN AND HOOK ABOVE"
		},
		XK_ohornhook: {
			code: 16785119,
			description: "(ở) LATIN SMALL LETTER O WITH HORN AND HOOK ABOVE"
		},
		XK_Ohorntilde: {
			code: 16785120,
			description: "(Ỡ) LATIN CAPITAL LETTER O WITH HORN AND TILDE"
		},
		XK_ohorntilde: {
			code: 16785121,
			description: "(ỡ) LATIN SMALL LETTER O WITH HORN AND TILDE"
		},
		XK_Ohornbelowdot: {
			code: 16785122,
			description: "(Ợ) LATIN CAPITAL LETTER O WITH HORN AND DOT BELOW"
		},
		XK_ohornbelowdot: {
			code: 16785123,
			description: "(ợ) LATIN SMALL LETTER O WITH HORN AND DOT BELOW"
		},
		XK_Ubelowdot: {
			code: 16785124,
			description: "(Ụ) LATIN CAPITAL LETTER U WITH DOT BELOW"
		},
		XK_ubelowdot: {
			code: 16785125,
			description: "(ụ) LATIN SMALL LETTER U WITH DOT BELOW"
		},
		XK_Uhook: {
			code: 16785126,
			description: "(Ủ) LATIN CAPITAL LETTER U WITH HOOK ABOVE"
		},
		XK_uhook: {
			code: 16785127,
			description: "(ủ) LATIN SMALL LETTER U WITH HOOK ABOVE"
		},
		XK_Uhornacute: {
			code: 16785128,
			description: "(Ứ) LATIN CAPITAL LETTER U WITH HORN AND ACUTE"
		},
		XK_uhornacute: {
			code: 16785129,
			description: "(ứ) LATIN SMALL LETTER U WITH HORN AND ACUTE"
		},
		XK_Uhorngrave: {
			code: 16785130,
			description: "(Ừ) LATIN CAPITAL LETTER U WITH HORN AND GRAVE"
		},
		XK_uhorngrave: {
			code: 16785131,
			description: "(ừ) LATIN SMALL LETTER U WITH HORN AND GRAVE"
		},
		XK_Uhornhook: {
			code: 16785132,
			description: "(Ử) LATIN CAPITAL LETTER U WITH HORN AND HOOK ABOVE"
		},
		XK_uhornhook: {
			code: 16785133,
			description: "(ử) LATIN SMALL LETTER U WITH HORN AND HOOK ABOVE"
		},
		XK_Uhorntilde: {
			code: 16785134,
			description: "(Ữ) LATIN CAPITAL LETTER U WITH HORN AND TILDE"
		},
		XK_uhorntilde: {
			code: 16785135,
			description: "(ữ) LATIN SMALL LETTER U WITH HORN AND TILDE"
		},
		XK_Uhornbelowdot: {
			code: 16785136,
			description: "(Ự) LATIN CAPITAL LETTER U WITH HORN AND DOT BELOW"
		},
		XK_uhornbelowdot: {
			code: 16785137,
			description: "(ự) LATIN SMALL LETTER U WITH HORN AND DOT BELOW"
		},
		XK_Ybelowdot: {
			code: 16785140,
			description: "(Ỵ) LATIN CAPITAL LETTER Y WITH DOT BELOW"
		},
		XK_ybelowdot: {
			code: 16785141,
			description: "(ỵ) LATIN SMALL LETTER Y WITH DOT BELOW"
		},
		XK_Yhook: {
			code: 16785142,
			description: "(Ỷ) LATIN CAPITAL LETTER Y WITH HOOK ABOVE"
		},
		XK_yhook: {
			code: 16785143,
			description: "(ỷ) LATIN SMALL LETTER Y WITH HOOK ABOVE"
		},
		XK_Ytilde: {
			code: 16785144,
			description: "(Ỹ) LATIN CAPITAL LETTER Y WITH TILDE"
		},
		XK_ytilde: {
			code: 16785145,
			description: "(ỹ) LATIN SMALL LETTER Y WITH TILDE"
		},
		XK_Ohorn: {
			code: 16777632,
			description: "(Ơ) LATIN CAPITAL LETTER O WITH HORN"
		},
		XK_ohorn: {
			code: 16777633,
			description: "(ơ) LATIN SMALL LETTER O WITH HORN"
		},
		XK_Uhorn: {
			code: 16777647,
			description: "(Ư) LATIN CAPITAL LETTER U WITH HORN"
		},
		XK_uhorn: {
			code: 16777648,
			description: "(ư) LATIN SMALL LETTER U WITH HORN"
		},
		XK_EcuSign: {
			code: 16785568,
			description: "(₠) EURO-CURRENCY SIGN"
		},
		XK_ColonSign: {
			code: 16785569,
			description: "(₡) COLON SIGN"
		},
		XK_CruzeiroSign: {
			code: 16785570,
			description: "(₢) CRUZEIRO SIGN"
		},
		XK_FFrancSign: {
			code: 16785571,
			description: "(₣) FRENCH FRANC SIGN"
		},
		XK_LiraSign: {
			code: 16785572,
			description: "(₤) LIRA SIGN"
		},
		XK_MillSign: {
			code: 16785573,
			description: "(₥) MILL SIGN"
		},
		XK_NairaSign: {
			code: 16785574,
			description: "(₦) NAIRA SIGN"
		},
		XK_PesetaSign: {
			code: 16785575,
			description: "(₧) PESETA SIGN"
		},
		XK_RupeeSign: {
			code: 16785576,
			description: "(₨) RUPEE SIGN"
		},
		XK_WonSign: {
			code: 16785577,
			description: "(₩) WON SIGN"
		},
		XK_NewSheqelSign: {
			code: 16785578,
			description: "(₪) NEW SHEQEL SIGN"
		},
		XK_DongSign: {
			code: 16785579,
			description: "(₫) DONG SIGN"
		},
		XK_EuroSign: {
			code: 8364,
			description: "(€) EURO SIGN"
		},
		XK_zerosuperior: {
			code: 16785520,
			description: "(⁰) SUPERSCRIPT ZERO"
		},
		XK_foursuperior: {
			code: 16785524,
			description: "(⁴) SUPERSCRIPT FOUR"
		},
		XK_fivesuperior: {
			code: 16785525,
			description: "(⁵) SUPERSCRIPT FIVE"
		},
		XK_sixsuperior: {
			code: 16785526,
			description: "(⁶) SUPERSCRIPT SIX"
		},
		XK_sevensuperior: {
			code: 16785527,
			description: "(⁷) SUPERSCRIPT SEVEN"
		},
		XK_eightsuperior: {
			code: 16785528,
			description: "(⁸) SUPERSCRIPT EIGHT"
		},
		XK_ninesuperior: {
			code: 16785529,
			description: "(⁹) SUPERSCRIPT NINE"
		},
		XK_zerosubscript: {
			code: 16785536,
			description: "(₀) SUBSCRIPT ZERO"
		},
		XK_onesubscript: {
			code: 16785537,
			description: "(₁) SUBSCRIPT ONE"
		},
		XK_twosubscript: {
			code: 16785538,
			description: "(₂) SUBSCRIPT TWO"
		},
		XK_threesubscript: {
			code: 16785539,
			description: "(₃) SUBSCRIPT THREE"
		},
		XK_foursubscript: {
			code: 16785540,
			description: "(₄) SUBSCRIPT FOUR"
		},
		XK_fivesubscript: {
			code: 16785541,
			description: "(₅) SUBSCRIPT FIVE"
		},
		XK_sixsubscript: {
			code: 16785542,
			description: "(₆) SUBSCRIPT SIX"
		},
		XK_sevensubscript: {
			code: 16785543,
			description: "(₇) SUBSCRIPT SEVEN"
		},
		XK_eightsubscript: {
			code: 16785544,
			description: "(₈) SUBSCRIPT EIGHT"
		},
		XK_ninesubscript: {
			code: 16785545,
			description: "(₉) SUBSCRIPT NINE"
		},
		XK_partdifferential: {
			code: 16785922,
			description: "(∂) PARTIAL DIFFERENTIAL"
		},
		XK_emptyset: {
			code: 16785925,
			description: "(∅) NULL SET"
		},
		XK_elementof: {
			code: 16785928,
			description: "(∈) ELEMENT OF"
		},
		XK_notelementof: {
			code: 16785929,
			description: "(∉) NOT AN ELEMENT OF"
		},
		XK_containsas: {
			code: 16785931,
			description: "(∋) CONTAINS AS MEMBER"
		},
		XK_squareroot: {
			code: 16785946,
			description: "(√) SQUARE ROOT"
		},
		XK_cuberoot: {
			code: 16785947,
			description: "(∛) CUBE ROOT"
		},
		XK_fourthroot: {
			code: 16785948,
			description: "(∜) FOURTH ROOT"
		},
		XK_dintegral: {
			code: 16785964,
			description: "(∬) DOUBLE INTEGRAL"
		},
		XK_tintegral: {
			code: 16785965,
			description: "(∭) TRIPLE INTEGRAL"
		},
		XK_because: {
			code: 16785973,
			description: "(∵) BECAUSE"
		},
		XK_approxeq: {
			code: 16785992,
			description: "(≅) ALMOST EQUAL TO"
		},
		XK_notapproxeq: {
			code: 16785991,
			description: "(≇) NOT ALMOST EQUAL TO"
		},
		XK_notidentical: {
			code: 16786018,
			description: "(≢) NOT IDENTICAL TO"
		},
		XK_stricteq: {
			code: 16786019,
			description: "(≣) STRICTLY EQUIVALENT TO"
		},
		XK_braille_dot_1: {
			code: 65521,
			description: null
		},
		XK_braille_dot_2: {
			code: 65522,
			description: null
		},
		XK_braille_dot_3: {
			code: 65523,
			description: null
		},
		XK_braille_dot_4: {
			code: 65524,
			description: null
		},
		XK_braille_dot_5: {
			code: 65525,
			description: null
		},
		XK_braille_dot_6: {
			code: 65526,
			description: null
		},
		XK_braille_dot_7: {
			code: 65527,
			description: null
		},
		XK_braille_dot_8: {
			code: 65528,
			description: null
		},
		XK_braille_dot_9: {
			code: 65529,
			description: null
		},
		XK_braille_dot_10: {
			code: 65530,
			description: null
		},
		XK_braille_blank: {
			code: 16787456,
			description: "(⠀) BRAILLE PATTERN BLANK"
		},
		XK_braille_dots_1: {
			code: 16787457,
			description: "(⠁) BRAILLE PATTERN DOTS-1"
		},
		XK_braille_dots_2: {
			code: 16787458,
			description: "(⠂) BRAILLE PATTERN DOTS-2"
		},
		XK_braille_dots_12: {
			code: 16787459,
			description: "(⠃) BRAILLE PATTERN DOTS-12"
		},
		XK_braille_dots_3: {
			code: 16787460,
			description: "(⠄) BRAILLE PATTERN DOTS-3"
		},
		XK_braille_dots_13: {
			code: 16787461,
			description: "(⠅) BRAILLE PATTERN DOTS-13"
		},
		XK_braille_dots_23: {
			code: 16787462,
			description: "(⠆) BRAILLE PATTERN DOTS-23"
		},
		XK_braille_dots_123: {
			code: 16787463,
			description: "(⠇) BRAILLE PATTERN DOTS-123"
		},
		XK_braille_dots_4: {
			code: 16787464,
			description: "(⠈) BRAILLE PATTERN DOTS-4"
		},
		XK_braille_dots_14: {
			code: 16787465,
			description: "(⠉) BRAILLE PATTERN DOTS-14"
		},
		XK_braille_dots_24: {
			code: 16787466,
			description: "(⠊) BRAILLE PATTERN DOTS-24"
		},
		XK_braille_dots_124: {
			code: 16787467,
			description: "(⠋) BRAILLE PATTERN DOTS-124"
		},
		XK_braille_dots_34: {
			code: 16787468,
			description: "(⠌) BRAILLE PATTERN DOTS-34"
		},
		XK_braille_dots_134: {
			code: 16787469,
			description: "(⠍) BRAILLE PATTERN DOTS-134"
		},
		XK_braille_dots_234: {
			code: 16787470,
			description: "(⠎) BRAILLE PATTERN DOTS-234"
		},
		XK_braille_dots_1234: {
			code: 16787471,
			description: "(⠏) BRAILLE PATTERN DOTS-1234"
		},
		XK_braille_dots_5: {
			code: 16787472,
			description: "(⠐) BRAILLE PATTERN DOTS-5"
		},
		XK_braille_dots_15: {
			code: 16787473,
			description: "(⠑) BRAILLE PATTERN DOTS-15"
		},
		XK_braille_dots_25: {
			code: 16787474,
			description: "(⠒) BRAILLE PATTERN DOTS-25"
		},
		XK_braille_dots_125: {
			code: 16787475,
			description: "(⠓) BRAILLE PATTERN DOTS-125"
		},
		XK_braille_dots_35: {
			code: 16787476,
			description: "(⠔) BRAILLE PATTERN DOTS-35"
		},
		XK_braille_dots_135: {
			code: 16787477,
			description: "(⠕) BRAILLE PATTERN DOTS-135"
		},
		XK_braille_dots_235: {
			code: 16787478,
			description: "(⠖) BRAILLE PATTERN DOTS-235"
		},
		XK_braille_dots_1235: {
			code: 16787479,
			description: "(⠗) BRAILLE PATTERN DOTS-1235"
		},
		XK_braille_dots_45: {
			code: 16787480,
			description: "(⠘) BRAILLE PATTERN DOTS-45"
		},
		XK_braille_dots_145: {
			code: 16787481,
			description: "(⠙) BRAILLE PATTERN DOTS-145"
		},
		XK_braille_dots_245: {
			code: 16787482,
			description: "(⠚) BRAILLE PATTERN DOTS-245"
		},
		XK_braille_dots_1245: {
			code: 16787483,
			description: "(⠛) BRAILLE PATTERN DOTS-1245"
		},
		XK_braille_dots_345: {
			code: 16787484,
			description: "(⠜) BRAILLE PATTERN DOTS-345"
		},
		XK_braille_dots_1345: {
			code: 16787485,
			description: "(⠝) BRAILLE PATTERN DOTS-1345"
		},
		XK_braille_dots_2345: {
			code: 16787486,
			description: "(⠞) BRAILLE PATTERN DOTS-2345"
		},
		XK_braille_dots_12345: {
			code: 16787487,
			description: "(⠟) BRAILLE PATTERN DOTS-12345"
		},
		XK_braille_dots_6: {
			code: 16787488,
			description: "(⠠) BRAILLE PATTERN DOTS-6"
		},
		XK_braille_dots_16: {
			code: 16787489,
			description: "(⠡) BRAILLE PATTERN DOTS-16"
		},
		XK_braille_dots_26: {
			code: 16787490,
			description: "(⠢) BRAILLE PATTERN DOTS-26"
		},
		XK_braille_dots_126: {
			code: 16787491,
			description: "(⠣) BRAILLE PATTERN DOTS-126"
		},
		XK_braille_dots_36: {
			code: 16787492,
			description: "(⠤) BRAILLE PATTERN DOTS-36"
		},
		XK_braille_dots_136: {
			code: 16787493,
			description: "(⠥) BRAILLE PATTERN DOTS-136"
		},
		XK_braille_dots_236: {
			code: 16787494,
			description: "(⠦) BRAILLE PATTERN DOTS-236"
		},
		XK_braille_dots_1236: {
			code: 16787495,
			description: "(⠧) BRAILLE PATTERN DOTS-1236"
		},
		XK_braille_dots_46: {
			code: 16787496,
			description: "(⠨) BRAILLE PATTERN DOTS-46"
		},
		XK_braille_dots_146: {
			code: 16787497,
			description: "(⠩) BRAILLE PATTERN DOTS-146"
		},
		XK_braille_dots_246: {
			code: 16787498,
			description: "(⠪) BRAILLE PATTERN DOTS-246"
		},
		XK_braille_dots_1246: {
			code: 16787499,
			description: "(⠫) BRAILLE PATTERN DOTS-1246"
		},
		XK_braille_dots_346: {
			code: 16787500,
			description: "(⠬) BRAILLE PATTERN DOTS-346"
		},
		XK_braille_dots_1346: {
			code: 16787501,
			description: "(⠭) BRAILLE PATTERN DOTS-1346"
		},
		XK_braille_dots_2346: {
			code: 16787502,
			description: "(⠮) BRAILLE PATTERN DOTS-2346"
		},
		XK_braille_dots_12346: {
			code: 16787503,
			description: "(⠯) BRAILLE PATTERN DOTS-12346"
		},
		XK_braille_dots_56: {
			code: 16787504,
			description: "(⠰) BRAILLE PATTERN DOTS-56"
		},
		XK_braille_dots_156: {
			code: 16787505,
			description: "(⠱) BRAILLE PATTERN DOTS-156"
		},
		XK_braille_dots_256: {
			code: 16787506,
			description: "(⠲) BRAILLE PATTERN DOTS-256"
		},
		XK_braille_dots_1256: {
			code: 16787507,
			description: "(⠳) BRAILLE PATTERN DOTS-1256"
		},
		XK_braille_dots_356: {
			code: 16787508,
			description: "(⠴) BRAILLE PATTERN DOTS-356"
		},
		XK_braille_dots_1356: {
			code: 16787509,
			description: "(⠵) BRAILLE PATTERN DOTS-1356"
		},
		XK_braille_dots_2356: {
			code: 16787510,
			description: "(⠶) BRAILLE PATTERN DOTS-2356"
		},
		XK_braille_dots_12356: {
			code: 16787511,
			description: "(⠷) BRAILLE PATTERN DOTS-12356"
		},
		XK_braille_dots_456: {
			code: 16787512,
			description: "(⠸) BRAILLE PATTERN DOTS-456"
		},
		XK_braille_dots_1456: {
			code: 16787513,
			description: "(⠹) BRAILLE PATTERN DOTS-1456"
		},
		XK_braille_dots_2456: {
			code: 16787514,
			description: "(⠺) BRAILLE PATTERN DOTS-2456"
		},
		XK_braille_dots_12456: {
			code: 16787515,
			description: "(⠻) BRAILLE PATTERN DOTS-12456"
		},
		XK_braille_dots_3456: {
			code: 16787516,
			description: "(⠼) BRAILLE PATTERN DOTS-3456"
		},
		XK_braille_dots_13456: {
			code: 16787517,
			description: "(⠽) BRAILLE PATTERN DOTS-13456"
		},
		XK_braille_dots_23456: {
			code: 16787518,
			description: "(⠾) BRAILLE PATTERN DOTS-23456"
		},
		XK_braille_dots_123456: {
			code: 16787519,
			description: "(⠿) BRAILLE PATTERN DOTS-123456"
		},
		XK_braille_dots_7: {
			code: 16787520,
			description: "(⡀) BRAILLE PATTERN DOTS-7"
		},
		XK_braille_dots_17: {
			code: 16787521,
			description: "(⡁) BRAILLE PATTERN DOTS-17"
		},
		XK_braille_dots_27: {
			code: 16787522,
			description: "(⡂) BRAILLE PATTERN DOTS-27"
		},
		XK_braille_dots_127: {
			code: 16787523,
			description: "(⡃) BRAILLE PATTERN DOTS-127"
		},
		XK_braille_dots_37: {
			code: 16787524,
			description: "(⡄) BRAILLE PATTERN DOTS-37"
		},
		XK_braille_dots_137: {
			code: 16787525,
			description: "(⡅) BRAILLE PATTERN DOTS-137"
		},
		XK_braille_dots_237: {
			code: 16787526,
			description: "(⡆) BRAILLE PATTERN DOTS-237"
		},
		XK_braille_dots_1237: {
			code: 16787527,
			description: "(⡇) BRAILLE PATTERN DOTS-1237"
		},
		XK_braille_dots_47: {
			code: 16787528,
			description: "(⡈) BRAILLE PATTERN DOTS-47"
		},
		XK_braille_dots_147: {
			code: 16787529,
			description: "(⡉) BRAILLE PATTERN DOTS-147"
		},
		XK_braille_dots_247: {
			code: 16787530,
			description: "(⡊) BRAILLE PATTERN DOTS-247"
		},
		XK_braille_dots_1247: {
			code: 16787531,
			description: "(⡋) BRAILLE PATTERN DOTS-1247"
		},
		XK_braille_dots_347: {
			code: 16787532,
			description: "(⡌) BRAILLE PATTERN DOTS-347"
		},
		XK_braille_dots_1347: {
			code: 16787533,
			description: "(⡍) BRAILLE PATTERN DOTS-1347"
		},
		XK_braille_dots_2347: {
			code: 16787534,
			description: "(⡎) BRAILLE PATTERN DOTS-2347"
		},
		XK_braille_dots_12347: {
			code: 16787535,
			description: "(⡏) BRAILLE PATTERN DOTS-12347"
		},
		XK_braille_dots_57: {
			code: 16787536,
			description: "(⡐) BRAILLE PATTERN DOTS-57"
		},
		XK_braille_dots_157: {
			code: 16787537,
			description: "(⡑) BRAILLE PATTERN DOTS-157"
		},
		XK_braille_dots_257: {
			code: 16787538,
			description: "(⡒) BRAILLE PATTERN DOTS-257"
		},
		XK_braille_dots_1257: {
			code: 16787539,
			description: "(⡓) BRAILLE PATTERN DOTS-1257"
		},
		XK_braille_dots_357: {
			code: 16787540,
			description: "(⡔) BRAILLE PATTERN DOTS-357"
		},
		XK_braille_dots_1357: {
			code: 16787541,
			description: "(⡕) BRAILLE PATTERN DOTS-1357"
		},
		XK_braille_dots_2357: {
			code: 16787542,
			description: "(⡖) BRAILLE PATTERN DOTS-2357"
		},
		XK_braille_dots_12357: {
			code: 16787543,
			description: "(⡗) BRAILLE PATTERN DOTS-12357"
		},
		XK_braille_dots_457: {
			code: 16787544,
			description: "(⡘) BRAILLE PATTERN DOTS-457"
		},
		XK_braille_dots_1457: {
			code: 16787545,
			description: "(⡙) BRAILLE PATTERN DOTS-1457"
		},
		XK_braille_dots_2457: {
			code: 16787546,
			description: "(⡚) BRAILLE PATTERN DOTS-2457"
		},
		XK_braille_dots_12457: {
			code: 16787547,
			description: "(⡛) BRAILLE PATTERN DOTS-12457"
		},
		XK_braille_dots_3457: {
			code: 16787548,
			description: "(⡜) BRAILLE PATTERN DOTS-3457"
		},
		XK_braille_dots_13457: {
			code: 16787549,
			description: "(⡝) BRAILLE PATTERN DOTS-13457"
		},
		XK_braille_dots_23457: {
			code: 16787550,
			description: "(⡞) BRAILLE PATTERN DOTS-23457"
		},
		XK_braille_dots_123457: {
			code: 16787551,
			description: "(⡟) BRAILLE PATTERN DOTS-123457"
		},
		XK_braille_dots_67: {
			code: 16787552,
			description: "(⡠) BRAILLE PATTERN DOTS-67"
		},
		XK_braille_dots_167: {
			code: 16787553,
			description: "(⡡) BRAILLE PATTERN DOTS-167"
		},
		XK_braille_dots_267: {
			code: 16787554,
			description: "(⡢) BRAILLE PATTERN DOTS-267"
		},
		XK_braille_dots_1267: {
			code: 16787555,
			description: "(⡣) BRAILLE PATTERN DOTS-1267"
		},
		XK_braille_dots_367: {
			code: 16787556,
			description: "(⡤) BRAILLE PATTERN DOTS-367"
		},
		XK_braille_dots_1367: {
			code: 16787557,
			description: "(⡥) BRAILLE PATTERN DOTS-1367"
		},
		XK_braille_dots_2367: {
			code: 16787558,
			description: "(⡦) BRAILLE PATTERN DOTS-2367"
		},
		XK_braille_dots_12367: {
			code: 16787559,
			description: "(⡧) BRAILLE PATTERN DOTS-12367"
		},
		XK_braille_dots_467: {
			code: 16787560,
			description: "(⡨) BRAILLE PATTERN DOTS-467"
		},
		XK_braille_dots_1467: {
			code: 16787561,
			description: "(⡩) BRAILLE PATTERN DOTS-1467"
		},
		XK_braille_dots_2467: {
			code: 16787562,
			description: "(⡪) BRAILLE PATTERN DOTS-2467"
		},
		XK_braille_dots_12467: {
			code: 16787563,
			description: "(⡫) BRAILLE PATTERN DOTS-12467"
		},
		XK_braille_dots_3467: {
			code: 16787564,
			description: "(⡬) BRAILLE PATTERN DOTS-3467"
		},
		XK_braille_dots_13467: {
			code: 16787565,
			description: "(⡭) BRAILLE PATTERN DOTS-13467"
		},
		XK_braille_dots_23467: {
			code: 16787566,
			description: "(⡮) BRAILLE PATTERN DOTS-23467"
		},
		XK_braille_dots_123467: {
			code: 16787567,
			description: "(⡯) BRAILLE PATTERN DOTS-123467"
		},
		XK_braille_dots_567: {
			code: 16787568,
			description: "(⡰) BRAILLE PATTERN DOTS-567"
		},
		XK_braille_dots_1567: {
			code: 16787569,
			description: "(⡱) BRAILLE PATTERN DOTS-1567"
		},
		XK_braille_dots_2567: {
			code: 16787570,
			description: "(⡲) BRAILLE PATTERN DOTS-2567"
		},
		XK_braille_dots_12567: {
			code: 16787571,
			description: "(⡳) BRAILLE PATTERN DOTS-12567"
		},
		XK_braille_dots_3567: {
			code: 16787572,
			description: "(⡴) BRAILLE PATTERN DOTS-3567"
		},
		XK_braille_dots_13567: {
			code: 16787573,
			description: "(⡵) BRAILLE PATTERN DOTS-13567"
		},
		XK_braille_dots_23567: {
			code: 16787574,
			description: "(⡶) BRAILLE PATTERN DOTS-23567"
		},
		XK_braille_dots_123567: {
			code: 16787575,
			description: "(⡷) BRAILLE PATTERN DOTS-123567"
		},
		XK_braille_dots_4567: {
			code: 16787576,
			description: "(⡸) BRAILLE PATTERN DOTS-4567"
		},
		XK_braille_dots_14567: {
			code: 16787577,
			description: "(⡹) BRAILLE PATTERN DOTS-14567"
		},
		XK_braille_dots_24567: {
			code: 16787578,
			description: "(⡺) BRAILLE PATTERN DOTS-24567"
		},
		XK_braille_dots_124567: {
			code: 16787579,
			description: "(⡻) BRAILLE PATTERN DOTS-124567"
		},
		XK_braille_dots_34567: {
			code: 16787580,
			description: "(⡼) BRAILLE PATTERN DOTS-34567"
		},
		XK_braille_dots_134567: {
			code: 16787581,
			description: "(⡽) BRAILLE PATTERN DOTS-134567"
		},
		XK_braille_dots_234567: {
			code: 16787582,
			description: "(⡾) BRAILLE PATTERN DOTS-234567"
		},
		XK_braille_dots_1234567: {
			code: 16787583,
			description: "(⡿) BRAILLE PATTERN DOTS-1234567"
		},
		XK_braille_dots_8: {
			code: 16787584,
			description: "(⢀) BRAILLE PATTERN DOTS-8"
		},
		XK_braille_dots_18: {
			code: 16787585,
			description: "(⢁) BRAILLE PATTERN DOTS-18"
		},
		XK_braille_dots_28: {
			code: 16787586,
			description: "(⢂) BRAILLE PATTERN DOTS-28"
		},
		XK_braille_dots_128: {
			code: 16787587,
			description: "(⢃) BRAILLE PATTERN DOTS-128"
		},
		XK_braille_dots_38: {
			code: 16787588,
			description: "(⢄) BRAILLE PATTERN DOTS-38"
		},
		XK_braille_dots_138: {
			code: 16787589,
			description: "(⢅) BRAILLE PATTERN DOTS-138"
		},
		XK_braille_dots_238: {
			code: 16787590,
			description: "(⢆) BRAILLE PATTERN DOTS-238"
		},
		XK_braille_dots_1238: {
			code: 16787591,
			description: "(⢇) BRAILLE PATTERN DOTS-1238"
		},
		XK_braille_dots_48: {
			code: 16787592,
			description: "(⢈) BRAILLE PATTERN DOTS-48"
		},
		XK_braille_dots_148: {
			code: 16787593,
			description: "(⢉) BRAILLE PATTERN DOTS-148"
		},
		XK_braille_dots_248: {
			code: 16787594,
			description: "(⢊) BRAILLE PATTERN DOTS-248"
		},
		XK_braille_dots_1248: {
			code: 16787595,
			description: "(⢋) BRAILLE PATTERN DOTS-1248"
		},
		XK_braille_dots_348: {
			code: 16787596,
			description: "(⢌) BRAILLE PATTERN DOTS-348"
		},
		XK_braille_dots_1348: {
			code: 16787597,
			description: "(⢍) BRAILLE PATTERN DOTS-1348"
		},
		XK_braille_dots_2348: {
			code: 16787598,
			description: "(⢎) BRAILLE PATTERN DOTS-2348"
		},
		XK_braille_dots_12348: {
			code: 16787599,
			description: "(⢏) BRAILLE PATTERN DOTS-12348"
		},
		XK_braille_dots_58: {
			code: 16787600,
			description: "(⢐) BRAILLE PATTERN DOTS-58"
		},
		XK_braille_dots_158: {
			code: 16787601,
			description: "(⢑) BRAILLE PATTERN DOTS-158"
		},
		XK_braille_dots_258: {
			code: 16787602,
			description: "(⢒) BRAILLE PATTERN DOTS-258"
		},
		XK_braille_dots_1258: {
			code: 16787603,
			description: "(⢓) BRAILLE PATTERN DOTS-1258"
		},
		XK_braille_dots_358: {
			code: 16787604,
			description: "(⢔) BRAILLE PATTERN DOTS-358"
		},
		XK_braille_dots_1358: {
			code: 16787605,
			description: "(⢕) BRAILLE PATTERN DOTS-1358"
		},
		XK_braille_dots_2358: {
			code: 16787606,
			description: "(⢖) BRAILLE PATTERN DOTS-2358"
		},
		XK_braille_dots_12358: {
			code: 16787607,
			description: "(⢗) BRAILLE PATTERN DOTS-12358"
		},
		XK_braille_dots_458: {
			code: 16787608,
			description: "(⢘) BRAILLE PATTERN DOTS-458"
		},
		XK_braille_dots_1458: {
			code: 16787609,
			description: "(⢙) BRAILLE PATTERN DOTS-1458"
		},
		XK_braille_dots_2458: {
			code: 16787610,
			description: "(⢚) BRAILLE PATTERN DOTS-2458"
		},
		XK_braille_dots_12458: {
			code: 16787611,
			description: "(⢛) BRAILLE PATTERN DOTS-12458"
		},
		XK_braille_dots_3458: {
			code: 16787612,
			description: "(⢜) BRAILLE PATTERN DOTS-3458"
		},
		XK_braille_dots_13458: {
			code: 16787613,
			description: "(⢝) BRAILLE PATTERN DOTS-13458"
		},
		XK_braille_dots_23458: {
			code: 16787614,
			description: "(⢞) BRAILLE PATTERN DOTS-23458"
		},
		XK_braille_dots_123458: {
			code: 16787615,
			description: "(⢟) BRAILLE PATTERN DOTS-123458"
		},
		XK_braille_dots_68: {
			code: 16787616,
			description: "(⢠) BRAILLE PATTERN DOTS-68"
		},
		XK_braille_dots_168: {
			code: 16787617,
			description: "(⢡) BRAILLE PATTERN DOTS-168"
		},
		XK_braille_dots_268: {
			code: 16787618,
			description: "(⢢) BRAILLE PATTERN DOTS-268"
		},
		XK_braille_dots_1268: {
			code: 16787619,
			description: "(⢣) BRAILLE PATTERN DOTS-1268"
		},
		XK_braille_dots_368: {
			code: 16787620,
			description: "(⢤) BRAILLE PATTERN DOTS-368"
		},
		XK_braille_dots_1368: {
			code: 16787621,
			description: "(⢥) BRAILLE PATTERN DOTS-1368"
		},
		XK_braille_dots_2368: {
			code: 16787622,
			description: "(⢦) BRAILLE PATTERN DOTS-2368"
		},
		XK_braille_dots_12368: {
			code: 16787623,
			description: "(⢧) BRAILLE PATTERN DOTS-12368"
		},
		XK_braille_dots_468: {
			code: 16787624,
			description: "(⢨) BRAILLE PATTERN DOTS-468"
		},
		XK_braille_dots_1468: {
			code: 16787625,
			description: "(⢩) BRAILLE PATTERN DOTS-1468"
		},
		XK_braille_dots_2468: {
			code: 16787626,
			description: "(⢪) BRAILLE PATTERN DOTS-2468"
		},
		XK_braille_dots_12468: {
			code: 16787627,
			description: "(⢫) BRAILLE PATTERN DOTS-12468"
		},
		XK_braille_dots_3468: {
			code: 16787628,
			description: "(⢬) BRAILLE PATTERN DOTS-3468"
		},
		XK_braille_dots_13468: {
			code: 16787629,
			description: "(⢭) BRAILLE PATTERN DOTS-13468"
		},
		XK_braille_dots_23468: {
			code: 16787630,
			description: "(⢮) BRAILLE PATTERN DOTS-23468"
		},
		XK_braille_dots_123468: {
			code: 16787631,
			description: "(⢯) BRAILLE PATTERN DOTS-123468"
		},
		XK_braille_dots_568: {
			code: 16787632,
			description: "(⢰) BRAILLE PATTERN DOTS-568"
		},
		XK_braille_dots_1568: {
			code: 16787633,
			description: "(⢱) BRAILLE PATTERN DOTS-1568"
		},
		XK_braille_dots_2568: {
			code: 16787634,
			description: "(⢲) BRAILLE PATTERN DOTS-2568"
		},
		XK_braille_dots_12568: {
			code: 16787635,
			description: "(⢳) BRAILLE PATTERN DOTS-12568"
		},
		XK_braille_dots_3568: {
			code: 16787636,
			description: "(⢴) BRAILLE PATTERN DOTS-3568"
		},
		XK_braille_dots_13568: {
			code: 16787637,
			description: "(⢵) BRAILLE PATTERN DOTS-13568"
		},
		XK_braille_dots_23568: {
			code: 16787638,
			description: "(⢶) BRAILLE PATTERN DOTS-23568"
		},
		XK_braille_dots_123568: {
			code: 16787639,
			description: "(⢷) BRAILLE PATTERN DOTS-123568"
		},
		XK_braille_dots_4568: {
			code: 16787640,
			description: "(⢸) BRAILLE PATTERN DOTS-4568"
		},
		XK_braille_dots_14568: {
			code: 16787641,
			description: "(⢹) BRAILLE PATTERN DOTS-14568"
		},
		XK_braille_dots_24568: {
			code: 16787642,
			description: "(⢺) BRAILLE PATTERN DOTS-24568"
		},
		XK_braille_dots_124568: {
			code: 16787643,
			description: "(⢻) BRAILLE PATTERN DOTS-124568"
		},
		XK_braille_dots_34568: {
			code: 16787644,
			description: "(⢼) BRAILLE PATTERN DOTS-34568"
		},
		XK_braille_dots_134568: {
			code: 16787645,
			description: "(⢽) BRAILLE PATTERN DOTS-134568"
		},
		XK_braille_dots_234568: {
			code: 16787646,
			description: "(⢾) BRAILLE PATTERN DOTS-234568"
		},
		XK_braille_dots_1234568: {
			code: 16787647,
			description: "(⢿) BRAILLE PATTERN DOTS-1234568"
		},
		XK_braille_dots_78: {
			code: 16787648,
			description: "(⣀) BRAILLE PATTERN DOTS-78"
		},
		XK_braille_dots_178: {
			code: 16787649,
			description: "(⣁) BRAILLE PATTERN DOTS-178"
		},
		XK_braille_dots_278: {
			code: 16787650,
			description: "(⣂) BRAILLE PATTERN DOTS-278"
		},
		XK_braille_dots_1278: {
			code: 16787651,
			description: "(⣃) BRAILLE PATTERN DOTS-1278"
		},
		XK_braille_dots_378: {
			code: 16787652,
			description: "(⣄) BRAILLE PATTERN DOTS-378"
		},
		XK_braille_dots_1378: {
			code: 16787653,
			description: "(⣅) BRAILLE PATTERN DOTS-1378"
		},
		XK_braille_dots_2378: {
			code: 16787654,
			description: "(⣆) BRAILLE PATTERN DOTS-2378"
		},
		XK_braille_dots_12378: {
			code: 16787655,
			description: "(⣇) BRAILLE PATTERN DOTS-12378"
		},
		XK_braille_dots_478: {
			code: 16787656,
			description: "(⣈) BRAILLE PATTERN DOTS-478"
		},
		XK_braille_dots_1478: {
			code: 16787657,
			description: "(⣉) BRAILLE PATTERN DOTS-1478"
		},
		XK_braille_dots_2478: {
			code: 16787658,
			description: "(⣊) BRAILLE PATTERN DOTS-2478"
		},
		XK_braille_dots_12478: {
			code: 16787659,
			description: "(⣋) BRAILLE PATTERN DOTS-12478"
		},
		XK_braille_dots_3478: {
			code: 16787660,
			description: "(⣌) BRAILLE PATTERN DOTS-3478"
		},
		XK_braille_dots_13478: {
			code: 16787661,
			description: "(⣍) BRAILLE PATTERN DOTS-13478"
		},
		XK_braille_dots_23478: {
			code: 16787662,
			description: "(⣎) BRAILLE PATTERN DOTS-23478"
		},
		XK_braille_dots_123478: {
			code: 16787663,
			description: "(⣏) BRAILLE PATTERN DOTS-123478"
		},
		XK_braille_dots_578: {
			code: 16787664,
			description: "(⣐) BRAILLE PATTERN DOTS-578"
		},
		XK_braille_dots_1578: {
			code: 16787665,
			description: "(⣑) BRAILLE PATTERN DOTS-1578"
		},
		XK_braille_dots_2578: {
			code: 16787666,
			description: "(⣒) BRAILLE PATTERN DOTS-2578"
		},
		XK_braille_dots_12578: {
			code: 16787667,
			description: "(⣓) BRAILLE PATTERN DOTS-12578"
		},
		XK_braille_dots_3578: {
			code: 16787668,
			description: "(⣔) BRAILLE PATTERN DOTS-3578"
		},
		XK_braille_dots_13578: {
			code: 16787669,
			description: "(⣕) BRAILLE PATTERN DOTS-13578"
		},
		XK_braille_dots_23578: {
			code: 16787670,
			description: "(⣖) BRAILLE PATTERN DOTS-23578"
		},
		XK_braille_dots_123578: {
			code: 16787671,
			description: "(⣗) BRAILLE PATTERN DOTS-123578"
		},
		XK_braille_dots_4578: {
			code: 16787672,
			description: "(⣘) BRAILLE PATTERN DOTS-4578"
		},
		XK_braille_dots_14578: {
			code: 16787673,
			description: "(⣙) BRAILLE PATTERN DOTS-14578"
		},
		XK_braille_dots_24578: {
			code: 16787674,
			description: "(⣚) BRAILLE PATTERN DOTS-24578"
		},
		XK_braille_dots_124578: {
			code: 16787675,
			description: "(⣛) BRAILLE PATTERN DOTS-124578"
		},
		XK_braille_dots_34578: {
			code: 16787676,
			description: "(⣜) BRAILLE PATTERN DOTS-34578"
		},
		XK_braille_dots_134578: {
			code: 16787677,
			description: "(⣝) BRAILLE PATTERN DOTS-134578"
		},
		XK_braille_dots_234578: {
			code: 16787678,
			description: "(⣞) BRAILLE PATTERN DOTS-234578"
		},
		XK_braille_dots_1234578: {
			code: 16787679,
			description: "(⣟) BRAILLE PATTERN DOTS-1234578"
		},
		XK_braille_dots_678: {
			code: 16787680,
			description: "(⣠) BRAILLE PATTERN DOTS-678"
		},
		XK_braille_dots_1678: {
			code: 16787681,
			description: "(⣡) BRAILLE PATTERN DOTS-1678"
		},
		XK_braille_dots_2678: {
			code: 16787682,
			description: "(⣢) BRAILLE PATTERN DOTS-2678"
		},
		XK_braille_dots_12678: {
			code: 16787683,
			description: "(⣣) BRAILLE PATTERN DOTS-12678"
		},
		XK_braille_dots_3678: {
			code: 16787684,
			description: "(⣤) BRAILLE PATTERN DOTS-3678"
		},
		XK_braille_dots_13678: {
			code: 16787685,
			description: "(⣥) BRAILLE PATTERN DOTS-13678"
		},
		XK_braille_dots_23678: {
			code: 16787686,
			description: "(⣦) BRAILLE PATTERN DOTS-23678"
		},
		XK_braille_dots_123678: {
			code: 16787687,
			description: "(⣧) BRAILLE PATTERN DOTS-123678"
		},
		XK_braille_dots_4678: {
			code: 16787688,
			description: "(⣨) BRAILLE PATTERN DOTS-4678"
		},
		XK_braille_dots_14678: {
			code: 16787689,
			description: "(⣩) BRAILLE PATTERN DOTS-14678"
		},
		XK_braille_dots_24678: {
			code: 16787690,
			description: "(⣪) BRAILLE PATTERN DOTS-24678"
		},
		XK_braille_dots_124678: {
			code: 16787691,
			description: "(⣫) BRAILLE PATTERN DOTS-124678"
		},
		XK_braille_dots_34678: {
			code: 16787692,
			description: "(⣬) BRAILLE PATTERN DOTS-34678"
		},
		XK_braille_dots_134678: {
			code: 16787693,
			description: "(⣭) BRAILLE PATTERN DOTS-134678"
		},
		XK_braille_dots_234678: {
			code: 16787694,
			description: "(⣮) BRAILLE PATTERN DOTS-234678"
		},
		XK_braille_dots_1234678: {
			code: 16787695,
			description: "(⣯) BRAILLE PATTERN DOTS-1234678"
		},
		XK_braille_dots_5678: {
			code: 16787696,
			description: "(⣰) BRAILLE PATTERN DOTS-5678"
		},
		XK_braille_dots_15678: {
			code: 16787697,
			description: "(⣱) BRAILLE PATTERN DOTS-15678"
		},
		XK_braille_dots_25678: {
			code: 16787698,
			description: "(⣲) BRAILLE PATTERN DOTS-25678"
		},
		XK_braille_dots_125678: {
			code: 16787699,
			description: "(⣳) BRAILLE PATTERN DOTS-125678"
		},
		XK_braille_dots_35678: {
			code: 16787700,
			description: "(⣴) BRAILLE PATTERN DOTS-35678"
		},
		XK_braille_dots_135678: {
			code: 16787701,
			description: "(⣵) BRAILLE PATTERN DOTS-135678"
		},
		XK_braille_dots_235678: {
			code: 16787702,
			description: "(⣶) BRAILLE PATTERN DOTS-235678"
		},
		XK_braille_dots_1235678: {
			code: 16787703,
			description: "(⣷) BRAILLE PATTERN DOTS-1235678"
		},
		XK_braille_dots_45678: {
			code: 16787704,
			description: "(⣸) BRAILLE PATTERN DOTS-45678"
		},
		XK_braille_dots_145678: {
			code: 16787705,
			description: "(⣹) BRAILLE PATTERN DOTS-145678"
		},
		XK_braille_dots_245678: {
			code: 16787706,
			description: "(⣺) BRAILLE PATTERN DOTS-245678"
		},
		XK_braille_dots_1245678: {
			code: 16787707,
			description: "(⣻) BRAILLE PATTERN DOTS-1245678"
		},
		XK_braille_dots_345678: {
			code: 16787708,
			description: "(⣼) BRAILLE PATTERN DOTS-345678"
		},
		XK_braille_dots_1345678: {
			code: 16787709,
			description: "(⣽) BRAILLE PATTERN DOTS-1345678"
		},
		XK_braille_dots_2345678: {
			code: 16787710,
			description: "(⣾) BRAILLE PATTERN DOTS-2345678"
		},
		XK_braille_dots_12345678: {
			code: 16787711,
			description: "(⣿) BRAILLE PATTERN DOTS-12345678"
		},
		XK_Sinh_ng: {
			code: 16780674,
			description: "(ං) SINHALA ANUSVARAYA"
		},
		XK_Sinh_h2: {
			code: 16780675,
			description: "(ඃ) SINHALA VISARGAYA"
		},
		XK_Sinh_a: {
			code: 16780677,
			description: "(අ) SINHALA AYANNA"
		},
		XK_Sinh_aa: {
			code: 16780678,
			description: "(ආ) SINHALA AAYANNA"
		},
		XK_Sinh_ae: {
			code: 16780679,
			description: "(ඇ) SINHALA AEYANNA"
		},
		XK_Sinh_aee: {
			code: 16780680,
			description: "(ඈ) SINHALA AEEYANNA"
		},
		XK_Sinh_i: {
			code: 16780681,
			description: "(ඉ) SINHALA IYANNA"
		},
		XK_Sinh_ii: {
			code: 16780682,
			description: "(ඊ) SINHALA IIYANNA"
		},
		XK_Sinh_u: {
			code: 16780683,
			description: "(උ) SINHALA UYANNA"
		},
		XK_Sinh_uu: {
			code: 16780684,
			description: "(ඌ) SINHALA UUYANNA"
		},
		XK_Sinh_ri: {
			code: 16780685,
			description: "(ඍ) SINHALA IRUYANNA"
		},
		XK_Sinh_rii: {
			code: 16780686,
			description: "(ඎ) SINHALA IRUUYANNA"
		},
		XK_Sinh_lu: {
			code: 16780687,
			description: "(ඏ) SINHALA ILUYANNA"
		},
		XK_Sinh_luu: {
			code: 16780688,
			description: "(ඐ) SINHALA ILUUYANNA"
		},
		XK_Sinh_e: {
			code: 16780689,
			description: "(එ) SINHALA EYANNA"
		},
		XK_Sinh_ee: {
			code: 16780690,
			description: "(ඒ) SINHALA EEYANNA"
		},
		XK_Sinh_ai: {
			code: 16780691,
			description: "(ඓ) SINHALA AIYANNA"
		},
		XK_Sinh_o: {
			code: 16780692,
			description: "(ඔ) SINHALA OYANNA"
		},
		XK_Sinh_oo: {
			code: 16780693,
			description: "(ඕ) SINHALA OOYANNA"
		},
		XK_Sinh_au: {
			code: 16780694,
			description: "(ඖ) SINHALA AUYANNA"
		},
		XK_Sinh_ka: {
			code: 16780698,
			description: "(ක) SINHALA KAYANNA"
		},
		XK_Sinh_kha: {
			code: 16780699,
			description: "(ඛ) SINHALA MAHA. KAYANNA"
		},
		XK_Sinh_ga: {
			code: 16780700,
			description: "(ග) SINHALA GAYANNA"
		},
		XK_Sinh_gha: {
			code: 16780701,
			description: "(ඝ) SINHALA MAHA. GAYANNA"
		},
		XK_Sinh_ng2: {
			code: 16780702,
			description: "(ඞ) SINHALA KANTAJA NAASIKYAYA"
		},
		XK_Sinh_nga: {
			code: 16780703,
			description: "(ඟ) SINHALA SANYAKA GAYANNA"
		},
		XK_Sinh_ca: {
			code: 16780704,
			description: "(ච) SINHALA CAYANNA"
		},
		XK_Sinh_cha: {
			code: 16780705,
			description: "(ඡ) SINHALA MAHA. CAYANNA"
		},
		XK_Sinh_ja: {
			code: 16780706,
			description: "(ජ) SINHALA JAYANNA"
		},
		XK_Sinh_jha: {
			code: 16780707,
			description: "(ඣ) SINHALA MAHA. JAYANNA"
		},
		XK_Sinh_nya: {
			code: 16780708,
			description: "(ඤ) SINHALA TAALUJA NAASIKYAYA"
		},
		XK_Sinh_jnya: {
			code: 16780709,
			description: "(ඥ) SINHALA TAALUJA SANYOOGA NAASIKYAYA"
		},
		XK_Sinh_nja: {
			code: 16780710,
			description: "(ඦ) SINHALA SANYAKA JAYANNA"
		},
		XK_Sinh_tta: {
			code: 16780711,
			description: "(ට) SINHALA TTAYANNA"
		},
		XK_Sinh_ttha: {
			code: 16780712,
			description: "(ඨ) SINHALA MAHA. TTAYANNA"
		},
		XK_Sinh_dda: {
			code: 16780713,
			description: "(ඩ) SINHALA DDAYANNA"
		},
		XK_Sinh_ddha: {
			code: 16780714,
			description: "(ඪ) SINHALA MAHA. DDAYANNA"
		},
		XK_Sinh_nna: {
			code: 16780715,
			description: "(ණ) SINHALA MUURDHAJA NAYANNA"
		},
		XK_Sinh_ndda: {
			code: 16780716,
			description: "(ඬ) SINHALA SANYAKA DDAYANNA"
		},
		XK_Sinh_tha: {
			code: 16780717,
			description: "(ත) SINHALA TAYANNA"
		},
		XK_Sinh_thha: {
			code: 16780718,
			description: "(ථ) SINHALA MAHA. TAYANNA"
		},
		XK_Sinh_dha: {
			code: 16780719,
			description: "(ද) SINHALA DAYANNA"
		},
		XK_Sinh_dhha: {
			code: 16780720,
			description: "(ධ) SINHALA MAHA. DAYANNA"
		},
		XK_Sinh_na: {
			code: 16780721,
			description: "(න) SINHALA DANTAJA NAYANNA"
		},
		XK_Sinh_ndha: {
			code: 16780723,
			description: "(ඳ) SINHALA SANYAKA DAYANNA"
		},
		XK_Sinh_pa: {
			code: 16780724,
			description: "(ප) SINHALA PAYANNA"
		},
		XK_Sinh_pha: {
			code: 16780725,
			description: "(ඵ) SINHALA MAHA. PAYANNA"
		},
		XK_Sinh_ba: {
			code: 16780726,
			description: "(බ) SINHALA BAYANNA"
		},
		XK_Sinh_bha: {
			code: 16780727,
			description: "(භ) SINHALA MAHA. BAYANNA"
		},
		XK_Sinh_ma: {
			code: 16780728,
			description: "(ම) SINHALA MAYANNA"
		},
		XK_Sinh_mba: {
			code: 16780729,
			description: "(ඹ) SINHALA AMBA BAYANNA"
		},
		XK_Sinh_ya: {
			code: 16780730,
			description: "(ය) SINHALA YAYANNA"
		},
		XK_Sinh_ra: {
			code: 16780731,
			description: "(ර) SINHALA RAYANNA"
		},
		XK_Sinh_la: {
			code: 16780733,
			description: "(ල) SINHALA DANTAJA LAYANNA"
		},
		XK_Sinh_va: {
			code: 16780736,
			description: "(ව) SINHALA VAYANNA"
		},
		XK_Sinh_sha: {
			code: 16780737,
			description: "(ශ) SINHALA TAALUJA SAYANNA"
		},
		XK_Sinh_ssha: {
			code: 16780738,
			description: "(ෂ) SINHALA MUURDHAJA SAYANNA"
		},
		XK_Sinh_sa: {
			code: 16780739,
			description: "(ස) SINHALA DANTAJA SAYANNA"
		},
		XK_Sinh_ha: {
			code: 16780740,
			description: "(හ) SINHALA HAYANNA"
		},
		XK_Sinh_lla: {
			code: 16780741,
			description: "(ළ) SINHALA MUURDHAJA LAYANNA"
		},
		XK_Sinh_fa: {
			code: 16780742,
			description: "(ෆ) SINHALA FAYANNA"
		},
		XK_Sinh_al: {
			code: 16780746,
			description: "(්) SINHALA AL-LAKUNA"
		},
		XK_Sinh_aa2: {
			code: 16780751,
			description: "(ා) SINHALA AELA-PILLA"
		},
		XK_Sinh_ae2: {
			code: 16780752,
			description: "(ැ) SINHALA AEDA-PILLA"
		},
		XK_Sinh_aee2: {
			code: 16780753,
			description: "(ෑ) SINHALA DIGA AEDA-PILLA"
		},
		XK_Sinh_i2: {
			code: 16780754,
			description: "(ි) SINHALA IS-PILLA"
		},
		XK_Sinh_ii2: {
			code: 16780755,
			description: "(ී) SINHALA DIGA IS-PILLA"
		},
		XK_Sinh_u2: {
			code: 16780756,
			description: "(ු) SINHALA PAA-PILLA"
		},
		XK_Sinh_uu2: {
			code: 16780758,
			description: "(ූ) SINHALA DIGA PAA-PILLA"
		},
		XK_Sinh_ru2: {
			code: 16780760,
			description: "(ෘ) SINHALA GAETTA-PILLA"
		},
		XK_Sinh_e2: {
			code: 16780761,
			description: "(ෙ) SINHALA KOMBUVA"
		},
		XK_Sinh_ee2: {
			code: 16780762,
			description: "(ේ) SINHALA DIGA KOMBUVA"
		},
		XK_Sinh_ai2: {
			code: 16780763,
			description: "(ෛ) SINHALA KOMBU DEKA"
		},
		XK_Sinh_o2: {
			code: 16780764,
			description: "(ො) SINHALA KOMBUVA HAA AELA-PILLA"
		},
		XK_Sinh_oo2: {
			code: 16780765,
			description: "(ෝ) SINHALA KOMBUVA HAA DIGA AELA-PILLA"
		},
		XK_Sinh_au2: {
			code: 16780766,
			description: "(ෞ) SINHALA KOMBUVA HAA GAYANUKITTA"
		},
		XK_Sinh_lu2: {
			code: 16780767,
			description: "(ෟ) SINHALA GAYANUKITTA"
		},
		XK_Sinh_ruu2: {
			code: 16780786,
			description: "(ෲ) SINHALA DIGA GAETTA-PILLA"
		},
		XK_Sinh_luu2: {
			code: 16780787,
			description: "(ෳ) SINHALA DIGA GAYANUKITTA"
		},
		XK_Sinh_kunddaliya: {
			code: 16780788,
			description: "(෴) SINHALA KUNDDALIYA"
		},
		NoSymbol: 0
	};
}));
var require_gcfunction = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		GXclear: 0,
		GXand: 1,
		GXandReverse: 2,
		GXcopy: 3,
		GXandInverted: 4,
		GXnoop: 5,
		GXxor: 6,
		GXor: 7,
		GXnor: 8,
		GXequiv: 9,
		GXinvert: 10,
		GXorReverse: 11,
		GXcopyInverted: 12,
		GXorInverted: 13,
		GXnand: 14,
		GXset: 15
	};
}));
var require_lib = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var core = require_xcore();
	var em = require_eventmask().eventMask;
	var server = require_xserver();
	module.exports.createClient = core.createClient;
	module.exports.createServer = server.createServer;
	module.exports.eventMask = em;
	Object.defineProperty(module.exports, "keySyms", {
		enumerable: true,
		get: function() {
			return require_keysyms();
		}
	});
	Object.defineProperty(module.exports, "gcFunction", {
		enumerable: true,
		get: function() {
			return require_gcfunction();
		}
	});
	module.exports.CopyFromParent = 0;
	module.exports.InputOutput = 1;
	module.exports.InputOnly = 2;
	module.exports.PointerWindow = 0;
	module.exports.InputFocus = 1;
	module.exports.bitGravity = {};
	module.exports.winGravity = {};
}));
var require_address_x11 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs = __require("fs");
	var os = __require("os");
	function getDbusAddressFromWindowSelection(callback) {
		const x11 = require_lib();
		if (x11 === null) throw new Error("cannot get session bus address from window selection: dbus-next was installed without x11 support");
		fs.readFile("/var/lib/dbus/machine-id", "ascii", function(err, uuid) {
			if (err) return callback(err);
			const hostname = os.hostname().split("-")[0];
			x11.createClient(function(err$1, display) {
				if (err$1) return callback(err$1);
				const X = display.client;
				const selectionName = `_DBUS_SESSION_BUS_SELECTION_${hostname}_${uuid.trim()}`;
				X.InternAtom(false, selectionName, function(err$2, id) {
					if (err$2) return callback(err$2);
					X.GetSelectionOwner(id, function(err$3, win) {
						if (err$3) return callback(err$3);
						X.InternAtom(false, "_DBUS_SESSION_BUS_ADDRESS", function(err$4, propId) {
							if (err$4) return callback(err$4);
							win = display.screen[0].root;
							X.GetProperty(0, win, propId, 0, 0, 1e7, function(err$5, val) {
								if (err$5) return callback(err$5);
								callback(null, val.data.toString());
							});
						});
					});
				});
			});
		});
	}
	function getDbusAddressFromFs$1() {
		const home = process.env.HOME;
		const display = process.env.DISPLAY;
		if (!display) throw new Error("could not get DISPLAY environment variable to get dbus address");
		const match$1 = display.match(/.*:([0-9]+)\.?.*/);
		if (!match$1 || !match$1[1]) throw new Error("could not parse DISPLAY environment variable to get dbus address");
		const displayNum = match$1[1];
		const machineId = fs.readFileSync("/var/lib/dbus/machine-id").toString().trim();
		const dbusInfo = fs.readFileSync(`${home}/.dbus/session-bus/${machineId}-${displayNum}`).toString().trim();
		for (let line of dbusInfo.split("\n")) {
			line = line.trim();
			if (line.startsWith("DBUS_SESSION_BUS_ADDRESS=")) {
				let address = line.split("DBUS_SESSION_BUS_ADDRESS=")[1];
				if (!address) throw new Error("DBUS_SESSION_BUS_ADDRESS variable is set incorrectly in dbus info file");
				address = address.match(/^['"]?(.*?)['"]?$/)[1];
				return address;
			}
		}
		throw new Error("DBUS_SESSION_BUS_ADDRESS was not set in dbus info file");
	}
	module.exports = {
		getDbusAddressFromFs: getDbusAddressFromFs$1,
		getDbusAddressFromWindowSelection
	};
}));
var require_marshall_compat = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { parseSignature, collapseSignature } = require_signature();
	var { Variant: Variant$2 } = require_variant();
	var message$1 = require_message();
	function valueIsMarshallVariant(value) {
		return Array.isArray(value) && value.length === 2 && Array.isArray(value[0]) && value[0].length > 0 && value[0][0].type;
	}
	function marshallVariantToJs(variant) {
		const type = variant[0][0];
		const value = variant[1][0];
		if (!type.child.length) if (valueIsMarshallVariant(value)) return new Variant$2(collapseSignature(value[0][0]), marshallVariantToJs(value));
		else return value;
		if (type.type === "a") if (type.child[0].type === "y") return value;
		else if (type.child[0].type === "{") {
			const result = {};
			for (let i = 0; i < value.length; ++i) result[value[i][0]] = marshallVariantToJs([[type.child[0].child[1]], [value[i][1]]]);
			return result;
		} else {
			const result = [];
			for (let i = 0; i < value.length; ++i) result[i] = marshallVariantToJs([[type.child[0]], [value[i]]]);
			return result;
		}
		else if (type.type === "(") {
			const result = [];
			for (let i = 0; i < value.length; ++i) result[i] = marshallVariantToJs([[type.child[i]], [value[i]]]);
			return result;
		}
	}
	function messageToJsFmt$1(message$2) {
		const { signature = "", body = [] } = message$2;
		const bodyJs = [];
		const signatureTree = parseSignature(signature);
		for (let i = 0; i < signatureTree.length; ++i) {
			const tree = signatureTree[i];
			bodyJs.push(marshallVariantToJs([[tree], [body[i]]]));
		}
		message$2.body = bodyJs;
		message$2.signature = signature;
		return message$2;
	}
	function jsToMarshalFmt(signature, value) {
		if (value === void 0) throw new Error(`expected value for signature: ${signature}`);
		if (signature === void 0) throw new Error(`expected signature for value: ${value}`);
		let signatureStr = null;
		if (typeof signature === "string") {
			signatureStr = signature;
			signature = parseSignature(signature)[0];
		} else signatureStr = collapseSignature(signature);
		if (signature.child.length === 0) if (signature.type === "v") {
			if (value.constructor !== Variant$2) throw new Error(`expected a Variant for value (got ${typeof value})`);
			return [signature.type, jsToMarshalFmt(value.signature, value.value)];
		} else return [signature.type, value];
		if (signature.type === "a" && signature.child[0].type === "y" && value.constructor === Buffer) return [signatureStr, value];
		else if (signature.type === "a") {
			let result = [];
			if (signature.child[0].type === "y") result = value;
			else if (signature.child[0].type === "{") {
				if (value.constructor !== Object) throw new Error(`expecting an object for signature '${signatureStr}' (got ${typeof value})`);
				for (let k of Object.keys(value)) {
					const v = value[k];
					if (signature.child[0].child[0]) {
						const keyType = signature.child[0].child[0].type;
						if ([
							"y",
							"n",
							"q",
							"i",
							"x",
							"t"
						].includes(keyType)) try {
							k = parseInt(k);
						} catch (e) {
							throw new Error(`error parsing dict key for signature '${signatureStr}' (key: ${key})`);
						}
						else if (["b"].includes(keyType)) {
							if (!(k === "true" || k === "false")) throw new Error(`error parsing dict key for signature '${signatureStr}' (key: ${key})`);
							k = k === "true";
						}
					}
					if (v.constructor === Variant$2) result.push([k, jsToMarshalFmt(v.signature, v.value)]);
					else result.push([k, jsToMarshalFmt(signature.child[0].child[1], v)[1]]);
				}
			} else {
				if (!Array.isArray(value)) throw new Error(`expecting an array for signature '${signatureStr}' (got ${typeof value})`);
				for (const v of value) if (v.constructor === Variant$2) result.push(jsToMarshalFmt(v.signature, v.value));
				else result.push(jsToMarshalFmt(signature.child[0], v)[1]);
			}
			return [signatureStr, result];
		} else if (signature.type === "(") {
			if (!Array.isArray(value)) throw new Error(`expecting an array for signature '${signatureStr}' (got ${typeof value})`);
			if (value.length !== signature.child.length) throw new Error(`expecting struct to have ${signature.child.length} members (got ${value.length} members)`);
			const result = [];
			for (let i = 0; i < value.length; ++i) {
				const v = value[i];
				if (signature.child[i] === "v") {
					if (v.constructor !== Variant$2) throw new Error(`expected a Variant for struct member ${i + 1} (got ${v})`);
					result.push(jsToMarshalFmt(v.signature, v.value));
				} else result.push(jsToMarshalFmt(signature.child[i], v)[1]);
			}
			return [signatureStr, result];
		} else throw new Error(`got unknown complex type: ${signature.type}`);
	}
	function marshallMessage$1(msg) {
		const { signature = "", body = [] } = msg;
		const signatureTree = parseSignature(signature);
		if (signatureTree.length !== body.length) throw new Error(`Expected ${signatureTree.length} body elements for signature '${signature}' (got ${body.length})`);
		const marshallerBody = [];
		for (let i = 0; i < body.length; ++i) if (signatureTree[i].type === "v") {
			if (body[i].constructor !== Variant$2) throw new Error(`Expected a Variant() argument for position ${i + 1} (value='${body[i]}')`);
			marshallerBody.push(jsToMarshalFmt(body[i].signature, body[i].value));
		} else marshallerBody.push(jsToMarshalFmt(signatureTree[i], body[i])[1]);
		msg.signature = signature;
		msg.body = marshallerBody;
		return message$1.marshall(msg);
	}
	module.exports = {
		messageToJsFmt: messageToJsFmt$1,
		marshallMessage: marshallMessage$1
	};
}));
var require_through = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$4 = __require("stream");
	exports = module.exports = through$3;
	through$3.through = through$3;
	function through$3(write$1, end, opts) {
		write$1 = write$1 || function(data) {
			this.queue(data);
		};
		end = end || function() {
			this.queue(null);
		};
		var ended = false, destroyed = false, buffer$1 = [], _ended = false;
		var stream = new Stream$4();
		stream.readable = stream.writable = true;
		stream.paused = false;
		stream.autoDestroy = !(opts && opts.autoDestroy === false);
		stream.write = function(data) {
			write$1.call(this, data);
			return !stream.paused;
		};
		function drain() {
			while (buffer$1.length && !stream.paused) {
				var data = buffer$1.shift();
				if (null === data) return stream.emit("end");
				else stream.emit("data", data);
			}
		}
		stream.queue = stream.push = function(data) {
			if (_ended) return stream;
			if (data === null) _ended = true;
			buffer$1.push(data);
			drain();
			return stream;
		};
		stream.on("end", function() {
			stream.readable = false;
			if (!stream.writable && stream.autoDestroy) process.nextTick(function() {
				stream.destroy();
			});
		});
		function _end() {
			stream.writable = false;
			end.call(stream);
			if (!stream.readable && stream.autoDestroy) stream.destroy();
		}
		stream.end = function(data) {
			if (ended) return;
			ended = true;
			if (arguments.length) stream.write(data);
			_end();
			return stream;
		};
		stream.destroy = function() {
			if (destroyed) return;
			destroyed = true;
			ended = true;
			buffer$1.length = 0;
			stream.writable = stream.readable = false;
			stream.emit("close");
			return stream;
		};
		stream.pause = function() {
			if (stream.paused) return;
			stream.paused = true;
			return stream;
		};
		stream.resume = function() {
			if (stream.paused) {
				stream.paused = false;
				stream.emit("resume");
			}
			drain();
			if (!stream.paused) stream.emit("drain");
			return stream;
		};
		return stream;
	}
}));
var require_from = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$3 = __require("stream");
	module.exports = function from$1(source) {
		if (Array.isArray(source)) {
			var source_index = 0, source_len = source.length;
			return from$1(function(i$1) {
				if (source_index < source_len) this.emit("data", source[source_index++]);
				else this.emit("end");
				return true;
			});
		}
		var s = new Stream$3(), i = 0;
		s.ended = false;
		s.started = false;
		s.readable = true;
		s.writable = false;
		s.paused = false;
		s.ended = false;
		s.pause = function() {
			s.started = true;
			s.paused = true;
		};
		function next() {
			s.started = true;
			if (s.ended) return;
			while (!s.ended && !s.paused && source.call(s, i++, function() {
				if (!s.ended && !s.paused) process.nextTick(next);
			}));
		}
		s.resume = function() {
			s.started = true;
			s.paused = false;
			next();
		};
		s.on("end", function() {
			s.ended = true;
			s.readable = false;
			process.nextTick(s.destroy);
		});
		s.destroy = function() {
			s.ended = true;
			s.emit("close");
		};
		process.nextTick(function() {
			if (!s.started) s.resume();
		});
		return s;
	};
}));
var require_duplexer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$2 = __require("stream");
	var writeMethods = [
		"write",
		"end",
		"destroy"
	];
	var readMethods = ["resume", "pause"];
	var readEvents = ["data", "close"];
	var slice$1 = Array.prototype.slice;
	module.exports = duplex$1;
	function forEach$1(arr, fn$1) {
		if (arr.forEach) return arr.forEach(fn$1);
		for (var i = 0; i < arr.length; i++) fn$1(arr[i], i);
	}
	function duplex$1(writer, reader) {
		var stream = new Stream$2();
		var ended = false;
		forEach$1(writeMethods, proxyWriter);
		forEach$1(readMethods, proxyReader);
		forEach$1(readEvents, proxyStream);
		reader.on("end", handleEnd);
		writer.on("drain", function() {
			stream.emit("drain");
		});
		writer.on("error", reemit);
		reader.on("error", reemit);
		stream.writable = writer.writable;
		stream.readable = reader.readable;
		return stream;
		function proxyWriter(methodName) {
			stream[methodName] = method$5;
			function method$5() {
				return writer[methodName].apply(writer, arguments);
			}
		}
		function proxyReader(methodName) {
			stream[methodName] = method$5;
			function method$5() {
				stream.emit(methodName);
				var func = reader[methodName];
				if (func) return func.apply(reader, arguments);
				reader.emit(methodName);
			}
		}
		function proxyStream(methodName) {
			reader.on(methodName, reemit$1);
			function reemit$1() {
				var args = slice$1.call(arguments);
				args.unshift(methodName);
				stream.emit.apply(stream, args);
			}
		}
		function handleEnd() {
			if (ended) return;
			ended = true;
			var args = slice$1.call(arguments);
			args.unshift("end");
			stream.emit.apply(stream, args);
		}
		function reemit(err) {
			stream.emit("error", err);
		}
	}
}));
var require_map_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Stream$1 = __require("stream").Stream;
	module.exports = function(mapper, opts) {
		var stream = new Stream$1(), inputs = 0, outputs = 0, ended = false, paused = false, destroyed = false, lastWritten = 0, inNext = false;
		opts = opts || {};
		var errorEventName = opts.failures ? "failure" : "error";
		var writeQueue = {};
		stream.writable = true;
		stream.readable = true;
		function queueData(data, number) {
			var nextToWrite = lastWritten + 1;
			if (number === nextToWrite) {
				if (data !== void 0) stream.emit.apply(stream, ["data", data]);
				lastWritten++;
				nextToWrite++;
			} else writeQueue[number] = data;
			if (writeQueue.hasOwnProperty(nextToWrite)) {
				var dataToWrite = writeQueue[nextToWrite];
				delete writeQueue[nextToWrite];
				return queueData(dataToWrite, nextToWrite);
			}
			outputs++;
			if (inputs === outputs) {
				if (paused) paused = false, stream.emit("drain");
				if (ended) end();
			}
		}
		function next(err, data, number) {
			if (destroyed) return;
			inNext = true;
			if (!err || opts.failures) queueData(data, number);
			if (err) stream.emit.apply(stream, [errorEventName, err]);
			inNext = false;
		}
		function wrappedMapper(input, number, callback) {
			return mapper.call(null, input, function(err, data) {
				callback(err, data, number);
			});
		}
		stream.write = function(data) {
			if (ended) throw new Error("map stream is not writable");
			inNext = false;
			inputs++;
			try {
				paused = wrappedMapper(data, inputs, next) === false;
				return !paused;
			} catch (err) {
				if (inNext) throw err;
				next(err);
				return !paused;
			}
		};
		function end(data) {
			ended = true;
			stream.writable = false;
			if (data !== void 0) return queueData(data, inputs);
			else if (inputs == outputs) stream.readable = false, stream.emit("end"), stream.destroy();
		}
		stream.end = function(data) {
			if (ended) return;
			end(data);
		};
		stream.destroy = function() {
			ended = destroyed = true;
			stream.writable = stream.readable = paused = false;
			process.nextTick(function() {
				stream.emit("close");
			});
		};
		stream.pause = function() {
			paused = true;
		};
		stream.resume = function() {
			paused = false;
		};
		return stream;
	};
}));
var require_pause_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_through();
}));
var require_split = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var through$2 = require_through();
	var Decoder = __require("string_decoder").StringDecoder;
	module.exports = split$1;
	function split$1(matcher, mapper, options) {
		var decoder = new Decoder();
		var soFar = "";
		var maxLength = options && options.maxLength;
		var trailing = options && options.trailing === false ? false : true;
		if ("function" === typeof matcher) mapper = matcher, matcher = null;
		if (!matcher) matcher = /\r?\n/;
		function emit(stream, piece) {
			if (mapper) {
				try {
					piece = mapper(piece);
				} catch (err) {
					return stream.emit("error", err);
				}
				if ("undefined" !== typeof piece) stream.queue(piece);
			} else stream.queue(piece);
		}
		function next(stream, buffer$1) {
			var pieces = ((soFar != null ? soFar : "") + buffer$1).split(matcher);
			soFar = pieces.pop();
			if (maxLength && soFar.length > maxLength) return stream.emit("error", /* @__PURE__ */ new Error("maximum buffer reached"));
			for (var i = 0; i < pieces.length; i++) {
				var piece = pieces[i];
				emit(stream, piece);
			}
		}
		return through$2(function(b) {
			next(this, decoder.write(b));
		}, function() {
			if (decoder.end) next(this, decoder.end());
			if (trailing && soFar != null) emit(this, soFar);
			this.queue(null);
		});
	}
}));
var require_stream_combiner = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var duplexer = require_duplexer();
	var through$1 = require_through();
	module.exports = function() {
		var streams;
		if (arguments.length == 1 && Array.isArray(arguments[0])) streams = arguments[0];
		else streams = [].slice.call(arguments);
		if (streams.length == 0) return through$1();
		else if (streams.length == 1) return streams[0];
		var first = streams[0], last = streams[streams.length - 1], thepipe = duplexer(first, last);
		function recurse(streams$1) {
			if (streams$1.length < 2) return;
			streams$1[0].pipe(streams$1[1]);
			recurse(streams$1.slice(1));
		}
		recurse(streams);
		function onerror() {
			var args = [].slice.call(arguments);
			args.unshift("error");
			thepipe.emit.apply(thepipe, args);
		}
		for (var i = 1; i < streams.length - 1; i++) streams[i].on("error", onerror);
		return thepipe;
	};
}));
var require_event_stream = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Stream = __require("stream").Stream, es = exports, through = require_through(), from = require_from(), duplex = require_duplexer(), map = require_map_stream(), pause = require_pause_stream(), split = require_split(), pipeline = require_stream_combiner(), immediately = global.setImmediate || process.nextTick;
	es.Stream = Stream;
	es.through = through;
	es.from = from;
	es.duplex = duplex;
	es.map = map;
	es.pause = pause;
	es.split = split;
	es.pipeline = es.connect = es.pipe = pipeline;
	es.concat = es.merge = function() {
		var toMerge = [].slice.call(arguments);
		if (toMerge.length === 1 && toMerge[0] instanceof Array) toMerge = toMerge[0];
		var stream = new Stream();
		stream.setMaxListeners(0);
		var endCount = 0;
		stream.writable = stream.readable = true;
		if (toMerge.length) toMerge.forEach(function(e) {
			e.pipe(stream, { end: false });
			var ended = false;
			e.on("end", function() {
				if (ended) return;
				ended = true;
				endCount++;
				if (endCount == toMerge.length) stream.emit("end");
			});
		});
		else process.nextTick(function() {
			stream.emit("end");
		});
		stream.write = function(data) {
			this.emit("data", data);
		};
		stream.destroy = function() {
			toMerge.forEach(function(e) {
				if (e.destroy) e.destroy();
			});
		};
		return stream;
	};
	es.collect = es.writeArray = function(done) {
		if ("function" !== typeof done) throw new Error("function writeArray (done): done must be function");
		var a = new Stream(), array = [], isDone = false;
		a.write = function(l) {
			array.push(l);
		};
		a.end = function() {
			isDone = true;
			done(null, array);
		};
		a.writable = true;
		a.readable = false;
		a.destroy = function() {
			a.writable = a.readable = false;
			if (isDone) return;
			done(/* @__PURE__ */ new Error("destroyed before end"), array);
		};
		return a;
	};
	es.readArray = function(array) {
		var stream = new Stream(), i = 0, paused = false, ended = false;
		stream.readable = true;
		stream.writable = false;
		if (!Array.isArray(array)) throw new Error("event-stream.read expects an array");
		stream.resume = function() {
			if (ended) return;
			paused = false;
			var l = array.length;
			while (i < l && !paused && !ended) stream.emit("data", array[i++]);
			if (i == l && !ended) ended = true, stream.readable = false, stream.emit("end");
		};
		process.nextTick(stream.resume);
		stream.pause = function() {
			paused = true;
		};
		stream.destroy = function() {
			ended = true;
			stream.emit("close");
		};
		return stream;
	};
	es.readable = function(func, continueOnError) {
		var stream = new Stream(), i = 0, paused = false, ended = false, reading = false;
		stream.readable = true;
		stream.writable = false;
		if ("function" !== typeof func) throw new Error("event-stream.readable expects async function");
		stream.on("end", function() {
			ended = true;
		});
		function get(err, data) {
			if (err) {
				stream.emit("error", err);
				if (!continueOnError) stream.emit("end");
			} else if (arguments.length > 1) stream.emit("data", data);
			immediately(function() {
				if (ended || paused || reading) return;
				try {
					reading = true;
					func.call(stream, i++, function() {
						reading = false;
						get.apply(null, arguments);
					});
				} catch (err$1) {
					stream.emit("error", err$1);
				}
			});
		}
		stream.resume = function() {
			paused = false;
			get();
		};
		process.nextTick(get);
		stream.pause = function() {
			paused = true;
		};
		stream.destroy = function() {
			stream.emit("end");
			stream.emit("close");
			ended = true;
		};
		return stream;
	};
	es.mapSync = function(sync) {
		return es.through(function write$1(data) {
			var mappedData;
			try {
				mappedData = sync(data);
			} catch (err) {
				return this.emit("error", err);
			}
			if (mappedData !== void 0) this.emit("data", mappedData);
		});
	};
	es.filterSync = function(test) {
		return es.through(function(data) {
			var s = this;
			if (test(data)) s.queue(data);
		});
	};
	es.flatmapSync = function(mapper) {
		return es.through(function(data) {
			var s = this;
			data.forEach(function(e) {
				s.queue(mapper(e));
			});
		});
	};
	es.log = function(name) {
		return es.through(function(data) {
			[].slice.call(arguments);
			if (name) console.error(name, data);
			else console.error(data);
			this.emit("data", data);
		});
	};
	es.child = function(child) {
		return es.duplex(child.stdin, child.stdout);
	};
	es.parse = function(options) {
		var emitError = !!(options ? options.error : false);
		return es.through(function(data) {
			var obj;
			try {
				if (data) obj = JSON.parse(data.toString());
			} catch (err) {
				if (emitError) return this.emit("error", err);
				return console.error(err, "attempting to parse:", data);
			}
			if (obj !== void 0) this.emit("data", obj);
		});
	};
	es.stringify = function() {
		var Buffer$10 = __require("buffer").Buffer;
		return es.mapSync(function(e) {
			return JSON.stringify(Buffer$10.isBuffer(e) ? e.toString() : e) + "\n";
		});
	};
	es.replace = function(from$1, to) {
		return es.pipeline(es.split(from$1), es.join(to));
	};
	es.join = function(str) {
		if ("function" === typeof str) return es.wait(str);
		var first = true;
		return es.through(function(data) {
			if (!first) this.emit("data", str);
			first = false;
			this.emit("data", data);
			return true;
		});
	};
	es.wait = function(callback) {
		var arr = [];
		return es.through(function(data) {
			arr.push(data);
		}, function() {
			var body = Buffer.isBuffer(arr[0]) ? Buffer.concat(arr) : arr.join("");
			this.emit("data", body);
			this.emit("end");
			if (callback) callback(null, body);
		});
	};
	es.pipeable = function() {
		throw new Error("[EVENT-STREAM] es.pipeable is deprecated");
	};
}));
var require_connection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EventEmitter$1 = __require("events").EventEmitter;
	var net$1 = __require("net");
	var message = require_message();
	var clientHandshake = require_handshake$1();
	var { getDbusAddressFromFs } = require_address_x11();
	var { Message: Message$1 } = require_message_type();
	var { messageToJsFmt, marshallMessage } = require_marshall_compat();
	function createStream(opts) {
		let { busAddress, negotiateUnixFd } = opts;
		if (negotiateUnixFd === void 0) negotiateUnixFd = false;
		if (!busAddress) busAddress = process.env.DBUS_SESSION_BUS_ADDRESS;
		if (!busAddress) busAddress = getDbusAddressFromFs();
		const addresses = busAddress.split(";");
		for (let i = 0; i < addresses.length; ++i) {
			const familyParams = addresses[i].split(":");
			const family = familyParams[0];
			const params = {};
			familyParams[1].split(",").forEach(function(p) {
				const keyVal = p.split("=");
				params[keyVal[0]] = keyVal[1];
			});
			try {
				switch (family.toLowerCase()) {
					case "tcp": {
						const host = params.host || "localhost";
						const port = params.port;
						return net$1.createConnection(port, host);
					}
					case "unix":
						if (params.socket) return net$1.createConnection(params.socket);
						if (params.abstract) return net$1.createConnection("\0" + params.abstract);
						if (params.path) return net$1.createConnection(params.path);
						throw new Error("not enough parameters for 'unix' connection - you need to specify 'socket' or 'abstract' or 'path' parameter");
					case "unixexec": {
						const eventStream = require_event_stream();
						const spawn = __require("child_process").spawn;
						const args = [];
						for (let n = 1; params["arg" + n]; n++) args.push(params["arg" + n]);
						const child = spawn(params.path, args);
						setTimeout(() => eventStream.emit("connected"), 0);
						return eventStream.duplex(child.stdin, child.stdout);
					}
					default: throw new Error("unknown address type:" + family);
				}
			} catch (e) {
				if (i < addresses.length - 1) {
					console.warn(e.message);
					continue;
				} else throw e;
			}
		}
	}
	function createConnection$1(opts) {
		const self = new EventEmitter$1();
		opts = opts || {};
		const stream = self.stream = createStream(opts);
		stream.setNoDelay && stream.setNoDelay();
		stream.on("error", function(err) {
			self.emit("error", err);
		});
		stream.on("end", function() {
			self.emit("end");
			self.message = function() {
				self.emit("error", /* @__PURE__ */ new Error("Tried to write a message to a closed stream"));
			};
		});
		self.end = function() {
			stream.end();
			return self;
		};
		function afterHandshake(error, guid) {
			if (error) return self.emit("error", error);
			self.guid = guid;
			self.emit("connect");
			message.unmarshalMessages(stream, function(message$2) {
				try {
					message$2 = new Message$1(messageToJsFmt(message$2));
				} catch (err) {
					self.emit("error", err, `There was an error receiving a message (this is probably a bug in dbus-next): ${message$2}`);
					return;
				}
				self.emit("message", message$2);
			}, opts);
		}
		stream.once("connect", () => clientHandshake(stream, opts, afterHandshake));
		stream.once("connected", () => clientHandshake(stream, opts, afterHandshake));
		self._messages = [];
		self.message = function(msg) {
			self._messages.push(msg);
		};
		self.once("connect", function() {
			self.state = "connected";
			for (let i = 0; i < self._messages.length; ++i) {
				const [data, fds] = marshallMessage(self._messages[i]);
				if (stream.supportsUnixFd) stream.write({
					data,
					fds
				});
				else stream.write(data);
			}
			self._messages.length = 0;
			self.message = function(msg) {
				if (!stream.writable) throw new Error("Cannot send message, stream is closed");
				const [data, fds] = marshallMessage(msg);
				if (stream.supportsUnixFd) stream.write({
					data,
					fds
				});
				else {
					if (fds.length > 0) console.warn("Sending file descriptors is not supported in current bus connection");
					stream.write(data);
				}
			};
		});
		return self;
	}
	module.exports = createConnection$1;
}));
var require_dbus_next = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants$4 = require_constants$1();
	var MessageBus = require_bus();
	var errors = require_errors();
	var { Variant: Variant$1 } = require_variant();
	var { Message } = require_message_type();
	var iface = require_interface();
	var createConnection = require_connection();
	var createClient = function(params) {
		let connection = createConnection(params || {});
		return new MessageBus(connection);
	};
	module.exports.systemBus = function(opts) {
		if (!opts) opts = {};
		return createClient({
			...opts,
			negotiateUnixFd: opts.negotiateUnixFd,
			busAddress: process.env.DBUS_SYSTEM_BUS_ADDRESS || "unix:path=/var/run/dbus/system_bus_socket"
		});
	};
	module.exports.sessionBus = function(opts) {
		return createClient(opts);
	};
	module.exports.setBigIntCompat = require_library_options().setBigIntCompat;
	module.exports.NameFlag = constants$4.NameFlag;
	module.exports.RequestNameReply = constants$4.RequestNameReply;
	module.exports.ReleaseNameReply = constants$4.ReleaseNameReply;
	module.exports.MessageType = constants$4.MessageType;
	module.exports.MessageFlag = constants$4.MessageFlag;
	module.exports.interface = iface;
	module.exports.Variant = Variant$1;
	module.exports.Message = Message;
	module.exports.validators = require_validators();
	module.exports.DBusError = errors.DBusError;
	module.exports.MessageBus = MessageBus;
}));
var require_logging = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var loggingEnabled = process.env.MPRIS_SERVICE_DEBUG !== void 0 && process.env.MPRIS_SERVICE_DEBUG !== "0";
	module.exports.debug = function(message$2) {
		if (loggingEnabled) console.log(message$2);
	};
	module.exports.warn = function(message$2) {
		if (loggingEnabled) console.warn(message$2);
	};
}));
var require_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Variant = require_dbus_next().Variant;
	var logging$1 = require_logging();
	function guessMetadataSignature(key$1, value) {
		if (key$1 === "mpris:trackid") return "o";
		else if (key$1 === "mpris:length") return "x";
		else if (typeof value === "string") return "s";
		else if (typeof value === "boolean") return "b";
		else if (typeof value === "number") return "d";
		else if (Array.isArray(value) && value.every((v) => typeof v === "string")) return "as";
		else {
			logging$1.warn(`could not determine metadata type for ${key$1}: ${value}`);
			return null;
		}
	}
	function metadataToPlain(metadataVariant) {
		let metadataPlain = {};
		for (let k of Object.keys(metadataVariant)) {
			let value = metadataVariant[k];
			if (value === void 0 || value === null) {
				logging$1.warn(`ignoring a null metadata value for key ${k}`);
				continue;
			}
			if (value.constructor === Variant) metadataPlain[k] = value.value;
			else metadataPlain[k] = value;
		}
		return metadataPlain;
	}
	function metadataToDbus(metadataPlain) {
		let metadataVariant = {};
		for (let k of Object.keys(metadataPlain)) {
			let value = metadataPlain[k];
			let signature = guessMetadataSignature(k, value);
			if (signature) metadataVariant[k] = new Variant(signature, value);
		}
		return metadataVariant;
	}
	var emptyPlaylist = [
		"/",
		"",
		""
	];
	function playlistToDbus(playlist) {
		if (!playlist) return emptyPlaylist;
		let { Id, Name, Icon } = playlist;
		return [
			Id,
			Name,
			Icon
		];
	}
	function playlistToPlain(wire) {
		let [Id, Name, Icon] = wire;
		return {
			Id,
			Name,
			Icon
		};
	}
	module.exports = {
		metadataToPlain,
		metadataToDbus,
		playlistToPlain,
		playlistToDbus,
		emptyPlaylist
	};
}));
var require_isArguments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toStr$7 = Object.prototype.toString;
	module.exports = function isArguments$1(value) {
		var str = toStr$7.call(value);
		var isArgs$2 = str === "[object Arguments]";
		if (!isArgs$2) isArgs$2 = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr$7.call(value.callee) === "[object Function]";
		return isArgs$2;
	};
}));
var require_implementation$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var keysShim$1;
	if (!Object.keys) {
		var has$1 = Object.prototype.hasOwnProperty;
		var toStr$6 = Object.prototype.toString;
		var isArgs$1 = require_isArguments();
		var isEnumerable$1 = Object.prototype.propertyIsEnumerable;
		var hasDontEnumBug = !isEnumerable$1.call({ toString: null }, "toString");
		var hasProtoEnumBug = isEnumerable$1.call(function() {}, "prototype");
		var dontEnums = [
			"toString",
			"toLocaleString",
			"valueOf",
			"hasOwnProperty",
			"isPrototypeOf",
			"propertyIsEnumerable",
			"constructor"
		];
		var equalsConstructorPrototype = function(o) {
			var ctor = o.constructor;
			return ctor && ctor.prototype === o;
		};
		var excludedKeys = {
			$applicationCache: true,
			$console: true,
			$external: true,
			$frame: true,
			$frameElement: true,
			$frames: true,
			$innerHeight: true,
			$innerWidth: true,
			$onmozfullscreenchange: true,
			$onmozfullscreenerror: true,
			$outerHeight: true,
			$outerWidth: true,
			$pageXOffset: true,
			$pageYOffset: true,
			$parent: true,
			$scrollLeft: true,
			$scrollTop: true,
			$scrollX: true,
			$scrollY: true,
			$self: true,
			$webkitIndexedDB: true,
			$webkitStorageInfo: true,
			$window: true
		};
		var hasAutomationEqualityBug = function() {
			if (typeof window === "undefined") return false;
			for (var k in window) try {
				if (!excludedKeys["$" + k] && has$1.call(window, k) && window[k] !== null && typeof window[k] === "object") try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			} catch (e) {
				return true;
			}
			return false;
		}();
		var equalsConstructorPrototypeIfNotBuggy = function(o) {
			if (typeof window === "undefined" || !hasAutomationEqualityBug) return equalsConstructorPrototype(o);
			try {
				return equalsConstructorPrototype(o);
			} catch (e) {
				return false;
			}
		};
		keysShim$1 = function keys$1(object) {
			var isObject = object !== null && typeof object === "object";
			var isFunction$1 = toStr$6.call(object) === "[object Function]";
			var isArguments$1 = isArgs$1(object);
			var isString$2 = isObject && toStr$6.call(object) === "[object String]";
			var theKeys = [];
			if (!isObject && !isFunction$1 && !isArguments$1) throw new TypeError("Object.keys called on a non-object");
			var skipProto = hasProtoEnumBug && isFunction$1;
			if (isString$2 && object.length > 0 && !has$1.call(object, 0)) for (var i = 0; i < object.length; ++i) theKeys.push(String(i));
			if (isArguments$1 && object.length > 0) for (var j = 0; j < object.length; ++j) theKeys.push(String(j));
			else for (var name in object) if (!(skipProto && name === "prototype") && has$1.call(object, name)) theKeys.push(String(name));
			if (hasDontEnumBug) {
				var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
				for (var k = 0; k < dontEnums.length; ++k) if (!(skipConstructor && dontEnums[k] === "constructor") && has$1.call(object, dontEnums[k])) theKeys.push(dontEnums[k]);
			}
			return theKeys;
		};
	}
	module.exports = keysShim$1;
}));
var require_object_keys = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var slice = Array.prototype.slice;
	var isArgs = require_isArguments();
	var origKeys = Object.keys;
	var keysShim = origKeys ? function keys$1(o) {
		return origKeys(o);
	} : require_implementation$4();
	var originalKeys = Object.keys;
	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			if (!function() {
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			}(1, 2)) Object.keys = function keys$1(object) {
				if (isArgs(object)) return originalKeys(slice.call(object));
				return originalKeys(object);
			};
		} else Object.keys = keysShim;
		return Object.keys || keysShim;
	};
	module.exports = keysShim;
}));
var require_es_define_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty$4 = Object.defineProperty || false;
	if ($defineProperty$4) try {
		$defineProperty$4({}, "a", { value: 1 });
	} catch (e) {
		$defineProperty$4 = false;
	}
	module.exports = $defineProperty$4;
}));
var require_syntax = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = SyntaxError;
}));
var require_type = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = TypeError;
}));
var require_gOPD = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Object.getOwnPropertyDescriptor;
}));
var require_gopd = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $gOPD$2 = require_gOPD();
	if ($gOPD$2) try {
		$gOPD$2([], "length");
	} catch (e) {
		$gOPD$2 = null;
	}
	module.exports = $gOPD$2;
}));
var require_define_data_property = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty$3 = require_es_define_property();
	var $SyntaxError$1 = require_syntax();
	var $TypeError$11 = require_type();
	var gopd = require_gopd();
	module.exports = function defineDataProperty$1(obj, property$5, value) {
		if (!obj || typeof obj !== "object" && typeof obj !== "function") throw new $TypeError$11("`obj` must be an object or a function`");
		if (typeof property$5 !== "string" && typeof property$5 !== "symbol") throw new $TypeError$11("`property` must be a string or a symbol`");
		if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) throw new $TypeError$11("`nonEnumerable`, if provided, must be a boolean or null");
		if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) throw new $TypeError$11("`nonWritable`, if provided, must be a boolean or null");
		if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) throw new $TypeError$11("`nonConfigurable`, if provided, must be a boolean or null");
		if (arguments.length > 6 && typeof arguments[6] !== "boolean") throw new $TypeError$11("`loose`, if provided, must be a boolean");
		var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
		var nonWritable = arguments.length > 4 ? arguments[4] : null;
		var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
		var loose = arguments.length > 6 ? arguments[6] : false;
		var desc$1 = !!gopd && gopd(obj, property$5);
		if ($defineProperty$3) $defineProperty$3(obj, property$5, {
			configurable: nonConfigurable === null && desc$1 ? desc$1.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc$1 ? desc$1.enumerable : !nonEnumerable,
			value,
			writable: nonWritable === null && desc$1 ? desc$1.writable : !nonWritable
		});
		else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) obj[property$5] = value;
		else throw new $SyntaxError$1("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
	};
}));
var require_has_property_descriptors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $defineProperty$2 = require_es_define_property();
	var hasPropertyDescriptors = function hasPropertyDescriptors$1() {
		return !!$defineProperty$2;
	};
	hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
		if (!$defineProperty$2) return null;
		try {
			return $defineProperty$2([], "length", { value: 1 }).length !== 1;
		} catch (e) {
			return true;
		}
	};
	module.exports = hasPropertyDescriptors;
}));
var require_define_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var keys = require_object_keys();
	var hasSymbols$4 = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
	var toStr$5 = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var defineDataProperty = require_define_data_property();
	var isFunction = function(fn$1) {
		return typeof fn$1 === "function" && toStr$5.call(fn$1) === "[object Function]";
	};
	var supportsDescriptors$2 = require_has_property_descriptors()();
	var defineProperty$1 = function(object, name, value, predicate) {
		if (name in object) {
			if (predicate === true) {
				if (object[name] === value) return;
			} else if (!isFunction(predicate) || !predicate()) return;
		}
		if (supportsDescriptors$2) defineDataProperty(object, name, value, true);
		else defineDataProperty(object, name, value);
	};
	var defineProperties$1 = function(object, map$1) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map$1);
		if (hasSymbols$4) props = concat.call(props, Object.getOwnPropertySymbols(map$1));
		for (var i = 0; i < props.length; i += 1) defineProperty$1(object, props[i], map$1[props[i]], predicates[props[i]]);
	};
	defineProperties$1.supportsDescriptors = !!supportsDescriptors$2;
	module.exports = defineProperties$1;
}));
var require_es_object_atoms = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Object;
}));
var require_es_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Error;
}));
var require_eval = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = EvalError;
}));
var require_range = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = RangeError;
}));
var require_ref = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = ReferenceError;
}));
var require_uri = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = URIError;
}));
var require_abs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Math.abs;
}));
var require_floor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Math.floor;
}));
var require_max = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Math.max;
}));
var require_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Math.min;
}));
var require_pow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Math.pow;
}));
var require_round = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Math.round;
}));
var require_isNaN = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Number.isNaN || function isNaN$1(a) {
		return a !== a;
	};
}));
var require_sign = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $isNaN = require_isNaN();
	module.exports = function sign$1(number) {
		if ($isNaN(number) || number === 0) return number;
		return number < 0 ? -1 : 1;
	};
}));
var require_shams$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function hasSymbols$5() {
		if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return false;
		if (typeof Symbol.iterator === "symbol") return true;
		var obj = {};
		var sym = Symbol("test");
		var symObj = Object(sym);
		if (typeof sym === "string") return false;
		if (Object.prototype.toString.call(sym) !== "[object Symbol]") return false;
		if (Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
		var symVal = 42;
		obj[sym] = symVal;
		for (var _ in obj) return false;
		if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) return false;
		if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) return false;
		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
		if (typeof Object.getOwnPropertyDescriptor === "function") {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
		}
		return true;
	};
}));
var require_has_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var origSymbol = typeof Symbol !== "undefined" && Symbol;
	var hasSymbolSham = require_shams$1();
	module.exports = function hasNativeSymbols() {
		if (typeof origSymbol !== "function") return false;
		if (typeof Symbol !== "function") return false;
		if (typeof origSymbol("foo") !== "symbol") return false;
		if (typeof Symbol("bar") !== "symbol") return false;
		return hasSymbolSham();
	};
}));
var require_Reflect_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
}));
var require_Object_getPrototypeOf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_es_object_atoms().getPrototypeOf || null;
}));
var require_implementation$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
	var toStr$4 = Object.prototype.toString;
	var max$1 = Math.max;
	var concatty = function concatty$1(a, b) {
		var arr = [];
		for (var i = 0; i < a.length; i += 1) arr[i] = a[i];
		for (var j = 0; j < b.length; j += 1) arr[j + a.length] = b[j];
		return arr;
	};
	var slicy = function slicy$1(arrLike, offset) {
		var arr = [];
		for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) arr[j] = arrLike[i];
		return arr;
	};
	var joiny = function(arr, joiner) {
		var str = "";
		for (var i = 0; i < arr.length; i += 1) {
			str += arr[i];
			if (i + 1 < arr.length) str += joiner;
		}
		return str;
	};
	module.exports = function bind$5(that) {
		var target = this;
		if (typeof target !== "function" || toStr$4.apply(target) !== "[object Function]") throw new TypeError(ERROR_MESSAGE + target);
		var args = slicy(arguments, 1);
		var bound$1;
		var binder = function() {
			if (this instanceof bound$1) {
				var result = target.apply(this, concatty(args, arguments));
				if (Object(result) === result) return result;
				return this;
			}
			return target.apply(that, concatty(args, arguments));
		};
		var boundLength = max$1(0, target.length - args.length);
		var boundArgs = [];
		for (var i = 0; i < boundLength; i++) boundArgs[i] = "$" + i;
		bound$1 = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
		if (target.prototype) {
			var Empty = function Empty$1() {};
			Empty.prototype = target.prototype;
			bound$1.prototype = new Empty();
			Empty.prototype = null;
		}
		return bound$1;
	};
}));
var require_function_bind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var implementation$6 = require_implementation$3();
	module.exports = Function.prototype.bind || implementation$6;
}));
var require_functionCall = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Function.prototype.call;
}));
var require_functionApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = Function.prototype.apply;
}));
var require_reflectApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
}));
var require_actualApply = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind$4 = require_function_bind();
	var $apply$2 = require_functionApply();
	var $call$2 = require_functionCall();
	module.exports = require_reflectApply() || bind$4.call($call$2, $apply$2);
}));
var require_call_bind_apply_helpers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind$3 = require_function_bind();
	var $TypeError$10 = require_type();
	var $call$1 = require_functionCall();
	var $actualApply = require_actualApply();
	module.exports = function callBindBasic$2(args) {
		if (args.length < 1 || typeof args[0] !== "function") throw new $TypeError$10("a function is required");
		return $actualApply(bind$3, $call$1, args);
	};
}));
var require_get = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBind$6 = require_call_bind_apply_helpers();
	var gOPD$5 = require_gopd();
	var hasProtoAccessor;
	try {
		hasProtoAccessor = [].__proto__ === Array.prototype;
	} catch (e) {
		if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
	}
	var desc = !!hasProtoAccessor && gOPD$5 && gOPD$5(Object.prototype, "__proto__");
	var $Object$3 = Object;
	var $getPrototypeOf = $Object$3.getPrototypeOf;
	module.exports = desc && typeof desc.get === "function" ? callBind$6([desc.get]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
		return $getPrototypeOf(value == null ? value : $Object$3(value));
	} : false;
}));
var require_get_proto = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reflectGetProto = require_Reflect_getPrototypeOf();
	var originalGetProto = require_Object_getPrototypeOf();
	var getDunderProto = require_get();
	module.exports = reflectGetProto ? function getProto$3(O) {
		return reflectGetProto(O);
	} : originalGetProto ? function getProto$3(O) {
		if (!O || typeof O !== "object" && typeof O !== "function") throw new TypeError("getProto: not an object");
		return originalGetProto(O);
	} : getDunderProto ? function getProto$3(O) {
		return getDunderProto(O);
	} : null;
}));
var require_hasown = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var call = Function.prototype.call;
	var $hasOwn = Object.prototype.hasOwnProperty;
	module.exports = require_function_bind().call(call, $hasOwn);
}));
var require_get_intrinsic = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var undefined$1;
	var $Object$2 = require_es_object_atoms();
	var $Error = require_es_errors();
	var $EvalError = require_eval();
	var $RangeError = require_range();
	var $ReferenceError = require_ref();
	var $SyntaxError = require_syntax();
	var $TypeError$9 = require_type();
	var $URIError = require_uri();
	var abs = require_abs();
	var floor = require_floor();
	var max = require_max();
	var min = require_min();
	var pow = require_pow();
	var round = require_round();
	var sign = require_sign();
	var $Function = Function;
	var getEvalledConstructor = function(expressionSyntax) {
		try {
			return $Function("\"use strict\"; return (" + expressionSyntax + ").constructor;")();
		} catch (e) {}
	};
	var $gOPD$1 = require_gopd();
	var $defineProperty$1 = require_es_define_property();
	var throwTypeError = function() {
		throw new $TypeError$9();
	};
	var ThrowTypeError = $gOPD$1 ? function() {
		try {
			arguments.callee;
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				return $gOPD$1(arguments, "callee").get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}() : throwTypeError;
	var hasSymbols$3 = require_has_symbols()();
	var getProto$2 = require_get_proto();
	var $ObjectGPO = require_Object_getPrototypeOf();
	var $ReflectGPO = require_Reflect_getPrototypeOf();
	var $apply$1 = require_functionApply();
	var $call = require_functionCall();
	var needsEval = {};
	var TypedArray = typeof Uint8Array === "undefined" || !getProto$2 ? undefined$1 : getProto$2(Uint8Array);
	var INTRINSICS = {
		__proto__: null,
		"%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
		"%Array%": Array,
		"%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
		"%ArrayIteratorPrototype%": hasSymbols$3 && getProto$2 ? getProto$2([][Symbol.iterator]()) : undefined$1,
		"%AsyncFromSyncIteratorPrototype%": undefined$1,
		"%AsyncFunction%": needsEval,
		"%AsyncGenerator%": needsEval,
		"%AsyncGeneratorFunction%": needsEval,
		"%AsyncIteratorPrototype%": needsEval,
		"%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
		"%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
		"%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
		"%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
		"%Boolean%": Boolean,
		"%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
		"%Date%": Date,
		"%decodeURI%": decodeURI,
		"%decodeURIComponent%": decodeURIComponent,
		"%encodeURI%": encodeURI,
		"%encodeURIComponent%": encodeURIComponent,
		"%Error%": $Error,
		"%eval%": eval,
		"%EvalError%": $EvalError,
		"%Float16Array%": typeof Float16Array === "undefined" ? undefined$1 : Float16Array,
		"%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
		"%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
		"%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
		"%Function%": $Function,
		"%GeneratorFunction%": needsEval,
		"%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
		"%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
		"%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
		"%isFinite%": isFinite,
		"%isNaN%": isNaN,
		"%IteratorPrototype%": hasSymbols$3 && getProto$2 ? getProto$2(getProto$2([][Symbol.iterator]())) : undefined$1,
		"%JSON%": typeof JSON === "object" ? JSON : undefined$1,
		"%Map%": typeof Map === "undefined" ? undefined$1 : Map,
		"%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols$3 || !getProto$2 ? undefined$1 : getProto$2((/* @__PURE__ */ new Map())[Symbol.iterator]()),
		"%Math%": Math,
		"%Number%": Number,
		"%Object%": $Object$2,
		"%Object.getOwnPropertyDescriptor%": $gOPD$1,
		"%parseFloat%": parseFloat,
		"%parseInt%": parseInt,
		"%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
		"%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
		"%RangeError%": $RangeError,
		"%ReferenceError%": $ReferenceError,
		"%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
		"%RegExp%": RegExp,
		"%Set%": typeof Set === "undefined" ? undefined$1 : Set,
		"%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols$3 || !getProto$2 ? undefined$1 : getProto$2((/* @__PURE__ */ new Set())[Symbol.iterator]()),
		"%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
		"%String%": String,
		"%StringIteratorPrototype%": hasSymbols$3 && getProto$2 ? getProto$2(""[Symbol.iterator]()) : undefined$1,
		"%Symbol%": hasSymbols$3 ? Symbol : undefined$1,
		"%SyntaxError%": $SyntaxError,
		"%ThrowTypeError%": ThrowTypeError,
		"%TypedArray%": TypedArray,
		"%TypeError%": $TypeError$9,
		"%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
		"%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
		"%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
		"%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
		"%URIError%": $URIError,
		"%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
		"%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
		"%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet,
		"%Function.prototype.call%": $call,
		"%Function.prototype.apply%": $apply$1,
		"%Object.defineProperty%": $defineProperty$1,
		"%Object.getPrototypeOf%": $ObjectGPO,
		"%Math.abs%": abs,
		"%Math.floor%": floor,
		"%Math.max%": max,
		"%Math.min%": min,
		"%Math.pow%": pow,
		"%Math.round%": round,
		"%Math.sign%": sign,
		"%Reflect.getPrototypeOf%": $ReflectGPO
	};
	if (getProto$2) try {
		null.error;
	} catch (e) {
		INTRINSICS["%Error.prototype%"] = getProto$2(getProto$2(e));
	}
	var doEval = function doEval$1(name) {
		var value;
		if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}");
		else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}");
		else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}");
		else if (name === "%AsyncGenerator%") {
			var fn$1 = doEval$1("%AsyncGeneratorFunction%");
			if (fn$1) value = fn$1.prototype;
		} else if (name === "%AsyncIteratorPrototype%") {
			var gen = doEval$1("%AsyncGenerator%");
			if (gen && getProto$2) value = getProto$2(gen.prototype);
		}
		INTRINSICS[name] = value;
		return value;
	};
	var LEGACY_ALIASES = {
		__proto__: null,
		"%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
		"%ArrayPrototype%": ["Array", "prototype"],
		"%ArrayProto_entries%": [
			"Array",
			"prototype",
			"entries"
		],
		"%ArrayProto_forEach%": [
			"Array",
			"prototype",
			"forEach"
		],
		"%ArrayProto_keys%": [
			"Array",
			"prototype",
			"keys"
		],
		"%ArrayProto_values%": [
			"Array",
			"prototype",
			"values"
		],
		"%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
		"%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
		"%AsyncGeneratorPrototype%": [
			"AsyncGeneratorFunction",
			"prototype",
			"prototype"
		],
		"%BooleanPrototype%": ["Boolean", "prototype"],
		"%DataViewPrototype%": ["DataView", "prototype"],
		"%DatePrototype%": ["Date", "prototype"],
		"%ErrorPrototype%": ["Error", "prototype"],
		"%EvalErrorPrototype%": ["EvalError", "prototype"],
		"%Float32ArrayPrototype%": ["Float32Array", "prototype"],
		"%Float64ArrayPrototype%": ["Float64Array", "prototype"],
		"%FunctionPrototype%": ["Function", "prototype"],
		"%Generator%": ["GeneratorFunction", "prototype"],
		"%GeneratorPrototype%": [
			"GeneratorFunction",
			"prototype",
			"prototype"
		],
		"%Int8ArrayPrototype%": ["Int8Array", "prototype"],
		"%Int16ArrayPrototype%": ["Int16Array", "prototype"],
		"%Int32ArrayPrototype%": ["Int32Array", "prototype"],
		"%JSONParse%": ["JSON", "parse"],
		"%JSONStringify%": ["JSON", "stringify"],
		"%MapPrototype%": ["Map", "prototype"],
		"%NumberPrototype%": ["Number", "prototype"],
		"%ObjectPrototype%": ["Object", "prototype"],
		"%ObjProto_toString%": [
			"Object",
			"prototype",
			"toString"
		],
		"%ObjProto_valueOf%": [
			"Object",
			"prototype",
			"valueOf"
		],
		"%PromisePrototype%": ["Promise", "prototype"],
		"%PromiseProto_then%": [
			"Promise",
			"prototype",
			"then"
		],
		"%Promise_all%": ["Promise", "all"],
		"%Promise_reject%": ["Promise", "reject"],
		"%Promise_resolve%": ["Promise", "resolve"],
		"%RangeErrorPrototype%": ["RangeError", "prototype"],
		"%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
		"%RegExpPrototype%": ["RegExp", "prototype"],
		"%SetPrototype%": ["Set", "prototype"],
		"%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
		"%StringPrototype%": ["String", "prototype"],
		"%SymbolPrototype%": ["Symbol", "prototype"],
		"%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
		"%TypedArrayPrototype%": ["TypedArray", "prototype"],
		"%TypeErrorPrototype%": ["TypeError", "prototype"],
		"%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
		"%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
		"%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
		"%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
		"%URIErrorPrototype%": ["URIError", "prototype"],
		"%WeakMapPrototype%": ["WeakMap", "prototype"],
		"%WeakSetPrototype%": ["WeakSet", "prototype"]
	};
	var bind$1 = require_function_bind();
	var hasOwn$2 = require_hasown();
	var $concat$1 = bind$1.call($call, Array.prototype.concat);
	var $spliceApply = bind$1.call($apply$1, Array.prototype.splice);
	var $replace$1 = bind$1.call($call, String.prototype.replace);
	var $strSlice = bind$1.call($call, String.prototype.slice);
	var $exec$2 = bind$1.call($call, RegExp.prototype.exec);
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g;
	var stringToPath = function stringToPath$1(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
		else if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
		var result = [];
		$replace$1(string, rePropName, function(match$1, number, quote$1, subString) {
			result[result.length] = quote$1 ? $replace$1(subString, reEscapeChar, "$1") : number || match$1;
		});
		return result;
	};
	var getBaseIntrinsic = function getBaseIntrinsic$1(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn$2(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = "%" + alias[0] + "%";
		}
		if (hasOwn$2(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) value = doEval(intrinsicName);
			if (typeof value === "undefined" && !allowMissing) throw new $TypeError$9("intrinsic " + name + " exists, but is not available. Please file an issue!");
			return {
				alias,
				name: intrinsicName,
				value
			};
		}
		throw new $SyntaxError("intrinsic " + name + " does not exist!");
	};
	module.exports = function GetIntrinsic$7(name, allowMissing) {
		if (typeof name !== "string" || name.length === 0) throw new $TypeError$9("intrinsic name must be a non-empty string");
		if (arguments.length > 1 && typeof allowMissing !== "boolean") throw new $TypeError$9("\"allowMissing\" argument must be a boolean");
		if ($exec$2(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
		var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;
		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat$1([0, 1], alias));
		}
		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if ((first === "\"" || first === "'" || first === "`" || last === "\"" || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
			if (part === "constructor" || !isOwn) skipFurtherCaching = true;
			intrinsicBaseName += "." + part;
			intrinsicRealName = "%" + intrinsicBaseName + "%";
			if (hasOwn$2(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
			else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) throw new $TypeError$9("base intrinsic for " + name + " exists, but the property is not available.");
					return;
				}
				if ($gOPD$1 && i + 1 >= parts.length) {
					var desc$1 = $gOPD$1(value, part);
					isOwn = !!desc$1;
					if (isOwn && "get" in desc$1 && !("originalValue" in desc$1.get)) value = desc$1.get;
					else value = value[part];
				} else {
					isOwn = hasOwn$2(value, part);
					value = value[part];
				}
				if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
			}
		}
		return value;
	};
}));
var require_set_function_length = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic$6 = require_get_intrinsic();
	var define$5 = require_define_data_property();
	var hasDescriptors$1 = require_has_property_descriptors()();
	var gOPD$4 = require_gopd();
	var $TypeError$8 = require_type();
	var $floor$1 = GetIntrinsic$6("%Math.floor%");
	module.exports = function setFunctionLength$1(fn$1, length) {
		if (typeof fn$1 !== "function") throw new $TypeError$8("`fn` is not a function");
		if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor$1(length) !== length) throw new $TypeError$8("`length` must be a positive 32-bit integer");
		var loose = arguments.length > 2 && !!arguments[2];
		var functionLengthIsConfigurable = true;
		var functionLengthIsWritable = true;
		if ("length" in fn$1 && gOPD$4) {
			var desc$1 = gOPD$4(fn$1, "length");
			if (desc$1 && !desc$1.configurable) functionLengthIsConfigurable = false;
			if (desc$1 && !desc$1.writable) functionLengthIsWritable = false;
		}
		if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) if (hasDescriptors$1) define$5(fn$1, "length", length, true, true);
		else define$5(fn$1, "length", length);
		return fn$1;
	};
}));
var require_applyBind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var bind = require_function_bind();
	var $apply = require_functionApply();
	var actualApply = require_actualApply();
	module.exports = function applyBind$1() {
		return actualApply(bind, $apply, arguments);
	};
}));
var require_call_bind = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var setFunctionLength = require_set_function_length();
	var $defineProperty = require_es_define_property();
	var callBindBasic$1 = require_call_bind_apply_helpers();
	var applyBind = require_applyBind();
	module.exports = function callBind$7(originalFunction) {
		var func = callBindBasic$1(arguments);
		var adjustedLength = originalFunction.length - (arguments.length - 1);
		return setFunctionLength(func, 1 + (adjustedLength > 0 ? adjustedLength : 0), true);
	};
	if ($defineProperty) $defineProperty(module.exports, "apply", { value: applyBind });
	else module.exports.apply = applyBind;
}));
var require_call_bound = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic$5 = require_get_intrinsic();
	var callBindBasic = require_call_bind_apply_helpers();
	var $indexOf$2 = callBindBasic([GetIntrinsic$5("%String.prototype.indexOf%")]);
	module.exports = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic$5(name, !!allowMissing);
		if (typeof intrinsic === "function" && $indexOf$2(name, ".prototype.") > -1) return callBindBasic([intrinsic]);
		return intrinsic;
	};
}));
var require_implementation$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var objectKeys$1 = require_object_keys();
	var hasSymbols$2 = require_shams$1()();
	var callBound$13 = require_call_bound();
	var $Object$1 = require_es_object_atoms();
	var $push = callBound$13("Array.prototype.push");
	var $propIsEnumerable = callBound$13("Object.prototype.propertyIsEnumerable");
	var originalGetSymbols = hasSymbols$2 ? $Object$1.getOwnPropertySymbols : null;
	module.exports = function assign$1(target, source1) {
		if (target == null) throw new TypeError("target must be an object");
		var to = $Object$1(target);
		if (arguments.length === 1) return to;
		for (var s = 1; s < arguments.length; ++s) {
			var from$1 = $Object$1(arguments[s]);
			var keys$1 = objectKeys$1(from$1);
			var getSymbols = hasSymbols$2 && ($Object$1.getOwnPropertySymbols || originalGetSymbols);
			if (getSymbols) {
				var syms = getSymbols(from$1);
				for (var j = 0; j < syms.length; ++j) {
					var key$1 = syms[j];
					if ($propIsEnumerable(from$1, key$1)) $push(keys$1, key$1);
				}
			}
			for (var i = 0; i < keys$1.length; ++i) {
				var nextKey = keys$1[i];
				if ($propIsEnumerable(from$1, nextKey)) to[nextKey] = from$1[nextKey];
			}
		}
		return to;
	};
}));
var require_polyfill$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var implementation$5 = require_implementation$2();
	var lacksProperEnumerationOrder = function() {
		if (!Object.assign) return false;
		var str = "abcdefghijklmnopqrst";
		var letters = str.split("");
		var map$1 = {};
		for (var i = 0; i < letters.length; ++i) map$1[letters[i]] = letters[i];
		var obj = Object.assign({}, map$1);
		var actual = "";
		for (var k in obj) actual += k;
		return str !== actual;
	};
	var assignHasPendingExceptions = function() {
		if (!Object.assign || !Object.preventExtensions) return false;
		var thrower = Object.preventExtensions({ 1: 2 });
		try {
			Object.assign(thrower, "xy");
		} catch (e) {
			return thrower[1] === "y";
		}
		return false;
	};
	module.exports = function getPolyfill$6() {
		if (!Object.assign) return implementation$5;
		if (lacksProperEnumerationOrder()) return implementation$5;
		if (assignHasPendingExceptions()) return implementation$5;
		return Object.assign;
	};
}));
var require_shim$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var define$4 = require_define_properties();
	var getPolyfill$5 = require_polyfill$2();
	module.exports = function shimAssign() {
		var polyfill$2 = getPolyfill$5();
		define$4(Object, { assign: polyfill$2 }, { assign: function() {
			return Object.assign !== polyfill$2;
		} });
		return polyfill$2;
	};
}));
var require_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var defineProperties = require_define_properties();
	var callBind$5 = require_call_bind();
	var implementation$4 = require_implementation$2();
	var getPolyfill$4 = require_polyfill$2();
	var shim$2 = require_shim$2();
	var polyfill$1 = callBind$5.apply(getPolyfill$4());
	var bound = function assign$1(target, source1) {
		return polyfill$1(Object, arguments);
	};
	defineProperties(bound, {
		getPolyfill: getPolyfill$4,
		implementation: implementation$4,
		shim: shim$2
	});
	module.exports = bound;
}));
var require_callBound = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic$4 = require_get_intrinsic();
	var callBind$4 = require_call_bind();
	var $indexOf$1 = callBind$4(GetIntrinsic$4("String.prototype.indexOf"));
	module.exports = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic$4(name, !!allowMissing);
		if (typeof intrinsic === "function" && $indexOf$1(name, ".prototype.") > -1) return callBind$4(intrinsic);
		return intrinsic;
	};
}));
var require_functions_have_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var functionsHaveNames = function functionsHaveNames$1() {
		return typeof function f() {}.name === "string";
	};
	var gOPD$3 = Object.getOwnPropertyDescriptor;
	if (gOPD$3) try {
		gOPD$3([], "length");
	} catch (e) {
		gOPD$3 = null;
	}
	functionsHaveNames.functionsHaveConfigurableNames = function functionsHaveConfigurableNames$1() {
		if (!functionsHaveNames() || !gOPD$3) return false;
		var desc$1 = gOPD$3(function() {}, "name");
		return !!desc$1 && !!desc$1.configurable;
	};
	var $bind = Function.prototype.bind;
	functionsHaveNames.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
		return functionsHaveNames() && typeof $bind === "function" && function f() {}.bind().name !== "";
	};
	module.exports = functionsHaveNames;
}));
var require_set_function_name = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var define$3 = require_define_data_property();
	var hasDescriptors = require_has_property_descriptors()();
	var functionsHaveConfigurableNames = require_functions_have_names().functionsHaveConfigurableNames();
	var $TypeError$7 = require_type();
	module.exports = function setFunctionName$1(fn$1, name) {
		if (typeof fn$1 !== "function") throw new $TypeError$7("`fn` is not a function");
		if (!(arguments.length > 2 && !!arguments[2]) || functionsHaveConfigurableNames) if (hasDescriptors) define$3(fn$1, "name", name, true, true);
		else define$3(fn$1, "name", name);
		return fn$1;
	};
}));
var require_implementation$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var setFunctionName = require_set_function_name();
	var $TypeError$6 = require_type();
	var $Object = Object;
	module.exports = setFunctionName(function flags$1() {
		if (this == null || this !== $Object(this)) throw new $TypeError$6("RegExp.prototype.flags getter called on non-object");
		var result = "";
		if (this.hasIndices) result += "d";
		if (this.global) result += "g";
		if (this.ignoreCase) result += "i";
		if (this.multiline) result += "m";
		if (this.dotAll) result += "s";
		if (this.unicode) result += "u";
		if (this.unicodeSets) result += "v";
		if (this.sticky) result += "y";
		return result;
	}, "get flags", true);
}));
var require_polyfill$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var implementation$3 = require_implementation$1();
	var supportsDescriptors$1 = require_define_properties().supportsDescriptors;
	var $gOPD = Object.getOwnPropertyDescriptor;
	module.exports = function getPolyfill$6() {
		if (supportsDescriptors$1 && /a/gim.flags === "gim") {
			var descriptor = $gOPD(RegExp.prototype, "flags");
			if (descriptor && typeof descriptor.get === "function" && "dotAll" in RegExp.prototype && "hasIndices" in RegExp.prototype) {
				var calls = "";
				var o = {};
				Object.defineProperty(o, "hasIndices", { get: function() {
					calls += "d";
				} });
				Object.defineProperty(o, "sticky", { get: function() {
					calls += "y";
				} });
				descriptor.get.call(o);
				if (calls === "dy") return descriptor.get;
			}
		}
		return implementation$3;
	};
}));
var require_shim$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var supportsDescriptors = require_define_properties().supportsDescriptors;
	var getPolyfill$3 = require_polyfill$1();
	var gOPD$2 = require_gopd();
	var defineProperty = Object.defineProperty;
	var $TypeError$5 = require_es_errors();
	var getProto$1 = require_get_proto();
	var regex = /a/;
	module.exports = function shimFlags() {
		if (!supportsDescriptors || !getProto$1) throw new $TypeError$5("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
		var polyfill$2 = getPolyfill$3();
		var proto = getProto$1(regex);
		var descriptor = gOPD$2(proto, "flags");
		if (!descriptor || descriptor.get !== polyfill$2) defineProperty(proto, "flags", {
			configurable: true,
			enumerable: false,
			get: polyfill$2
		});
		return polyfill$2;
	};
}));
var require_regexp_prototype = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var define$2 = require_define_properties();
	var callBind$3 = require_call_bind();
	var implementation$2 = require_implementation$1();
	var getPolyfill$2 = require_polyfill$1();
	var shim$1 = require_shim$1();
	var flagsBound = callBind$3(getPolyfill$2());
	define$2(flagsBound, {
		getPolyfill: getPolyfill$2,
		implementation: implementation$2,
		shim: shim$1
	});
	module.exports = flagsBound;
}));
var require_node = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $iterator = Symbol.iterator;
	module.exports = function getIterator$1(iterable) {
		if (iterable != null && typeof iterable[$iterator] !== "undefined") return iterable[$iterator]();
	};
}));
var require_util_inspect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = __require("util").inspect;
}));
var require_object_inspect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasMap = typeof Map === "function" && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === "function" && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var weakMapHas = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap.prototype.has : null;
	var weakSetHas = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet.prototype.has : null;
	var weakRefDeref = typeof WeakRef === "function" && WeakRef.prototype ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var $match = String.prototype.match;
	var $slice$1 = String.prototype.slice;
	var $replace = String.prototype.replace;
	var $toUpperCase = String.prototype.toUpperCase;
	var $toLowerCase = String.prototype.toLowerCase;
	var $test = RegExp.prototype.test;
	var $concat = Array.prototype.concat;
	var $join = Array.prototype.join;
	var $arrSlice = Array.prototype.slice;
	var $floor = Math.floor;
	var bigIntValueOf$1 = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
	var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var gPO$1 = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
		return O.__proto__;
	} : null);
	function addNumericSeparator(num, str) {
		if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) return str;
		var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
		if (typeof num === "number") {
			var int = num < 0 ? -$floor(-num) : $floor(num);
			if (int !== num) {
				var intStr = String(int);
				var dec = $slice$1.call(str, intStr.length + 1);
				return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
			}
		}
		return $replace.call(str, sepRegex, "$&_");
	}
	var utilInspect = require_util_inspect();
	var inspectCustom = utilInspect.custom;
	var inspectSymbol = isSymbol$1(inspectCustom) ? inspectCustom : null;
	var quotes = {
		__proto__: null,
		"double": "\"",
		single: "'"
	};
	var quoteREs = {
		__proto__: null,
		"double": /(["\\])/g,
		single: /(['\\])/g
	};
	module.exports = function inspect_(obj, options, depth, seen) {
		var opts = options || {};
		if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) throw new TypeError("option \"quoteStyle\" must be \"single\" or \"double\"");
		if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) throw new TypeError("option \"maxStringLength\", if provided, must be a positive integer, Infinity, or `null`");
		var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
		if (typeof customInspect !== "boolean" && customInspect !== "symbol") throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
		if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) throw new TypeError("option \"indent\" must be \"\\t\", an integer > 0, or `null`");
		if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") throw new TypeError("option \"numericSeparator\", if provided, must be `true` or `false`");
		var numericSeparator = opts.numericSeparator;
		if (typeof obj === "undefined") return "undefined";
		if (obj === null) return "null";
		if (typeof obj === "boolean") return obj ? "true" : "false";
		if (typeof obj === "string") return inspectString(obj, opts);
		if (typeof obj === "number") {
			if (obj === 0) return Infinity / obj > 0 ? "0" : "-0";
			var str = String(obj);
			return numericSeparator ? addNumericSeparator(obj, str) : str;
		}
		if (typeof obj === "bigint") {
			var bigIntStr = String(obj) + "n";
			return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
		}
		var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
		if (typeof depth === "undefined") depth = 0;
		if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") return isArray$2(obj) ? "[Array]" : "[Object]";
		var indent = getIndent(opts, depth);
		if (typeof seen === "undefined") seen = [];
		else if (indexOf(seen, obj) >= 0) return "[Circular]";
		function inspect$4(value, from$1, noIndent) {
			if (from$1) {
				seen = $arrSlice.call(seen);
				seen.push(from$1);
			}
			if (noIndent) {
				var newOpts = { depth: opts.depth };
				if (has(opts, "quoteStyle")) newOpts.quoteStyle = opts.quoteStyle;
				return inspect_(value, newOpts, depth + 1, seen);
			}
			return inspect_(value, opts, depth + 1, seen);
		}
		if (typeof obj === "function" && !isRegExp(obj)) {
			var name = nameOf(obj);
			var keys$1 = arrObjKeys(obj, inspect$4);
			return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys$1.length > 0 ? " { " + $join.call(keys$1, ", ") + " }" : "");
		}
		if (isSymbol$1(obj)) {
			var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
			return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
		}
		if (isElement(obj)) {
			var s = "<" + $toLowerCase.call(String(obj.nodeName));
			var attrs = obj.attributes || [];
			for (var i = 0; i < attrs.length; i++) s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
			s += ">";
			if (obj.childNodes && obj.childNodes.length) s += "...";
			s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
			return s;
		}
		if (isArray$2(obj)) {
			if (obj.length === 0) return "[]";
			var xs = arrObjKeys(obj, inspect$4);
			if (indent && !singleLineValues(xs)) return "[" + indentedJoin(xs, indent) + "]";
			return "[ " + $join.call(xs, ", ") + " ]";
		}
		if (isError(obj)) {
			var parts = arrObjKeys(obj, inspect$4);
			if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect$4(obj.cause), parts), ", ") + " }";
			if (parts.length === 0) return "[" + String(obj) + "]";
			return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
		}
		if (typeof obj === "object" && customInspect) {
			if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) return utilInspect(obj, { depth: maxDepth - depth });
			else if (customInspect !== "symbol" && typeof obj.inspect === "function") return obj.inspect();
		}
		if (isMap$1(obj)) {
			var mapParts = [];
			if (mapForEach) mapForEach.call(obj, function(value, key$1) {
				mapParts.push(inspect$4(key$1, obj, true) + " => " + inspect$4(value, obj));
			});
			return collectionOf("Map", mapSize.call(obj), mapParts, indent);
		}
		if (isSet$1(obj)) {
			var setParts = [];
			if (setForEach) setForEach.call(obj, function(value) {
				setParts.push(inspect$4(value, obj));
			});
			return collectionOf("Set", setSize.call(obj), setParts, indent);
		}
		if (isWeakMap$1(obj)) return weakCollectionOf("WeakMap");
		if (isWeakSet$1(obj)) return weakCollectionOf("WeakSet");
		if (isWeakRef(obj)) return weakCollectionOf("WeakRef");
		if (isNumber$1(obj)) return markBoxed(inspect$4(Number(obj)));
		if (isBigInt$1(obj)) return markBoxed(inspect$4(bigIntValueOf$1.call(obj)));
		if (isBoolean$1(obj)) return markBoxed(booleanValueOf.call(obj));
		if (isString$1(obj)) return markBoxed(inspect$4(String(obj)));
		if (typeof window !== "undefined" && obj === window) return "{ [object Window] }";
		if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) return "{ [object globalThis] }";
		if (!isDate$1(obj) && !isRegExp(obj)) {
			var ys = arrObjKeys(obj, inspect$4);
			var isPlainObject = gPO$1 ? gPO$1(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
			var protoTag = obj instanceof Object ? "" : "null prototype";
			var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice$1.call(toStr$3(obj), 8, -1) : protoTag ? "Object" : "";
			var tag = (isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "") + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
			if (ys.length === 0) return tag + "{}";
			if (indent) return tag + "{" + indentedJoin(ys, indent) + "}";
			return tag + "{ " + $join.call(ys, ", ") + " }";
		}
		return String(obj);
	};
	function wrapQuotes(s, defaultStyle, opts) {
		var style = opts.quoteStyle || defaultStyle;
		var quoteChar = quotes[style];
		return quoteChar + s + quoteChar;
	}
	function quote(s) {
		return $replace.call(String(s), /"/g, "&quot;");
	}
	function canTrustToString(obj) {
		return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
	}
	function isArray$2(obj) {
		return toStr$3(obj) === "[object Array]" && canTrustToString(obj);
	}
	function isDate$1(obj) {
		return toStr$3(obj) === "[object Date]" && canTrustToString(obj);
	}
	function isRegExp(obj) {
		return toStr$3(obj) === "[object RegExp]" && canTrustToString(obj);
	}
	function isError(obj) {
		return toStr$3(obj) === "[object Error]" && canTrustToString(obj);
	}
	function isString$1(obj) {
		return toStr$3(obj) === "[object String]" && canTrustToString(obj);
	}
	function isNumber$1(obj) {
		return toStr$3(obj) === "[object Number]" && canTrustToString(obj);
	}
	function isBoolean$1(obj) {
		return toStr$3(obj) === "[object Boolean]" && canTrustToString(obj);
	}
	function isSymbol$1(obj) {
		if (hasShammedSymbols) return obj && typeof obj === "object" && obj instanceof Symbol;
		if (typeof obj === "symbol") return true;
		if (!obj || typeof obj !== "object" || !symToString) return false;
		try {
			symToString.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	function isBigInt$1(obj) {
		if (!obj || typeof obj !== "object" || !bigIntValueOf$1) return false;
		try {
			bigIntValueOf$1.call(obj);
			return true;
		} catch (e) {}
		return false;
	}
	var hasOwn$1 = Object.prototype.hasOwnProperty || function(key$1) {
		return key$1 in this;
	};
	function has(obj, key$1) {
		return hasOwn$1.call(obj, key$1);
	}
	function toStr$3(obj) {
		return objectToString.call(obj);
	}
	function nameOf(f) {
		if (f.name) return f.name;
		var m$1 = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
		if (m$1) return m$1[1];
		return null;
	}
	function indexOf(xs, x) {
		if (xs.indexOf) return xs.indexOf(x);
		for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
		return -1;
	}
	function isMap$1(x) {
		if (!mapSize || !x || typeof x !== "object") return false;
		try {
			mapSize.call(x);
			try {
				setSize.call(x);
			} catch (s) {
				return true;
			}
			return x instanceof Map;
		} catch (e) {}
		return false;
	}
	function isWeakMap$1(x) {
		if (!weakMapHas || !x || typeof x !== "object") return false;
		try {
			weakMapHas.call(x, weakMapHas);
			try {
				weakSetHas.call(x, weakSetHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakMap;
		} catch (e) {}
		return false;
	}
	function isWeakRef(x) {
		if (!weakRefDeref || !x || typeof x !== "object") return false;
		try {
			weakRefDeref.call(x);
			return true;
		} catch (e) {}
		return false;
	}
	function isSet$1(x) {
		if (!setSize || !x || typeof x !== "object") return false;
		try {
			setSize.call(x);
			try {
				mapSize.call(x);
			} catch (m$1) {
				return true;
			}
			return x instanceof Set;
		} catch (e) {}
		return false;
	}
	function isWeakSet$1(x) {
		if (!weakSetHas || !x || typeof x !== "object") return false;
		try {
			weakSetHas.call(x, weakSetHas);
			try {
				weakMapHas.call(x, weakMapHas);
			} catch (s) {
				return true;
			}
			return x instanceof WeakSet;
		} catch (e) {}
		return false;
	}
	function isElement(x) {
		if (!x || typeof x !== "object") return false;
		if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) return true;
		return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
	}
	function inspectString(str, opts) {
		if (str.length > opts.maxStringLength) {
			var remaining = str.length - opts.maxStringLength;
			var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
			return inspectString($slice$1.call(str, 0, opts.maxStringLength), opts) + trailer;
		}
		var quoteRE = quoteREs[opts.quoteStyle || "single"];
		quoteRE.lastIndex = 0;
		var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
		return wrapQuotes(s, "single", opts);
	}
	function lowbyte(c) {
		var n = c.charCodeAt(0);
		var x = {
			8: "b",
			9: "t",
			10: "n",
			12: "f",
			13: "r"
		}[n];
		if (x) return "\\" + x;
		return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
	}
	function markBoxed(str) {
		return "Object(" + str + ")";
	}
	function weakCollectionOf(type) {
		return type + " { ? }";
	}
	function collectionOf(type, size, entries, indent) {
		var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
		return type + " (" + size + ") {" + joinedEntries + "}";
	}
	function singleLineValues(xs) {
		for (var i = 0; i < xs.length; i++) if (indexOf(xs[i], "\n") >= 0) return false;
		return true;
	}
	function getIndent(opts, depth) {
		var baseIndent;
		if (opts.indent === "	") baseIndent = "	";
		else if (typeof opts.indent === "number" && opts.indent > 0) baseIndent = $join.call(Array(opts.indent + 1), " ");
		else return null;
		return {
			base: baseIndent,
			prev: $join.call(Array(depth + 1), baseIndent)
		};
	}
	function indentedJoin(xs, indent) {
		if (xs.length === 0) return "";
		var lineJoiner = "\n" + indent.prev + indent.base;
		return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
	}
	function arrObjKeys(obj, inspect$4) {
		var isArr = isArray$2(obj);
		var xs = [];
		if (isArr) {
			xs.length = obj.length;
			for (var i = 0; i < obj.length; i++) xs[i] = has(obj, i) ? inspect$4(obj[i], obj) : "";
		}
		var syms = typeof gOPS === "function" ? gOPS(obj) : [];
		var symMap;
		if (hasShammedSymbols) {
			symMap = {};
			for (var k = 0; k < syms.length; k++) symMap["$" + syms[k]] = syms[k];
		}
		for (var key$1 in obj) {
			if (!has(obj, key$1)) continue;
			if (isArr && String(Number(key$1)) === key$1 && key$1 < obj.length) continue;
			if (hasShammedSymbols && symMap["$" + key$1] instanceof Symbol) continue;
			else if ($test.call(/[^\w$]/, key$1)) xs.push(inspect$4(key$1, obj) + ": " + inspect$4(obj[key$1], obj));
			else xs.push(key$1 + ": " + inspect$4(obj[key$1], obj));
		}
		if (typeof gOPS === "function") {
			for (var j = 0; j < syms.length; j++) if (isEnumerable.call(obj, syms[j])) xs.push("[" + inspect$4(syms[j]) + "]: " + inspect$4(obj[syms[j]], obj));
		}
		return xs;
	}
}));
var require_side_channel_list = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var inspect$3 = require_object_inspect();
	var $TypeError$4 = require_type();
	var listGetNode = function(list, key$1, isDelete) {
		var prev = list;
		var curr;
		for (; (curr = prev.next) != null; prev = curr) if (curr.key === key$1) {
			prev.next = curr.next;
			if (!isDelete) {
				curr.next = list.next;
				list.next = curr;
			}
			return curr;
		}
	};
	var listGet = function(objects, key$1) {
		if (!objects) return;
		var node = listGetNode(objects, key$1);
		return node && node.value;
	};
	var listSet = function(objects, key$1, value) {
		var node = listGetNode(objects, key$1);
		if (node) node.value = value;
		else objects.next = {
			key: key$1,
			next: objects.next,
			value
		};
	};
	var listHas = function(objects, key$1) {
		if (!objects) return false;
		return !!listGetNode(objects, key$1);
	};
	var listDelete = function(objects, key$1) {
		if (objects) return listGetNode(objects, key$1, true);
	};
	module.exports = function getSideChannelList$1() {
		var $o;
		var channel = {
			assert: function(key$1) {
				if (!channel.has(key$1)) throw new $TypeError$4("Side channel does not contain " + inspect$3(key$1));
			},
			"delete": function(key$1) {
				var root = $o && $o.next;
				var deletedNode = listDelete($o, key$1);
				if (deletedNode && root && root === deletedNode) $o = void 0;
				return !!deletedNode;
			},
			get: function(key$1) {
				return listGet($o, key$1);
			},
			has: function(key$1) {
				return listHas($o, key$1);
			},
			set: function(key$1, value) {
				if (!$o) $o = { next: void 0 };
				listSet($o, key$1, value);
			}
		};
		return channel;
	};
}));
var require_side_channel_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic$3 = require_get_intrinsic();
	var callBound$12 = require_call_bound();
	var inspect$2 = require_object_inspect();
	var $TypeError$3 = require_type();
	var $Map$2 = GetIntrinsic$3("%Map%", true);
	var $mapGet$1 = callBound$12("Map.prototype.get", true);
	var $mapSet = callBound$12("Map.prototype.set", true);
	var $mapHas$5 = callBound$12("Map.prototype.has", true);
	var $mapDelete = callBound$12("Map.prototype.delete", true);
	var $mapSize$1 = callBound$12("Map.prototype.size", true);
	module.exports = !!$Map$2 && function getSideChannelMap$2() {
		var $m;
		var channel = {
			assert: function(key$1) {
				if (!channel.has(key$1)) throw new $TypeError$3("Side channel does not contain " + inspect$2(key$1));
			},
			"delete": function(key$1) {
				if ($m) {
					var result = $mapDelete($m, key$1);
					if ($mapSize$1($m) === 0) $m = void 0;
					return result;
				}
				return false;
			},
			get: function(key$1) {
				if ($m) return $mapGet$1($m, key$1);
			},
			has: function(key$1) {
				if ($m) return $mapHas$5($m, key$1);
				return false;
			},
			set: function(key$1, value) {
				if (!$m) $m = new $Map$2();
				$mapSet($m, key$1, value);
			}
		};
		return channel;
	};
}));
var require_side_channel_weakmap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic$2 = require_get_intrinsic();
	var callBound$11 = require_call_bound();
	var inspect$1 = require_object_inspect();
	var getSideChannelMap$1 = require_side_channel_map();
	var $TypeError$2 = require_type();
	var $WeakMap$1 = GetIntrinsic$2("%WeakMap%", true);
	var $weakMapGet = callBound$11("WeakMap.prototype.get", true);
	var $weakMapSet = callBound$11("WeakMap.prototype.set", true);
	var $weakMapHas = callBound$11("WeakMap.prototype.has", true);
	var $weakMapDelete = callBound$11("WeakMap.prototype.delete", true);
	module.exports = $WeakMap$1 ? function getSideChannelWeakMap() {
		var $wm;
		var $m;
		var channel = {
			assert: function(key$1) {
				if (!channel.has(key$1)) throw new $TypeError$2("Side channel does not contain " + inspect$1(key$1));
			},
			"delete": function(key$1) {
				if ($WeakMap$1 && key$1 && (typeof key$1 === "object" || typeof key$1 === "function")) {
					if ($wm) return $weakMapDelete($wm, key$1);
				} else if (getSideChannelMap$1) {
					if ($m) return $m["delete"](key$1);
				}
				return false;
			},
			get: function(key$1) {
				if ($WeakMap$1 && key$1 && (typeof key$1 === "object" || typeof key$1 === "function")) {
					if ($wm) return $weakMapGet($wm, key$1);
				}
				return $m && $m.get(key$1);
			},
			has: function(key$1) {
				if ($WeakMap$1 && key$1 && (typeof key$1 === "object" || typeof key$1 === "function")) {
					if ($wm) return $weakMapHas($wm, key$1);
				}
				return !!$m && $m.has(key$1);
			},
			set: function(key$1, value) {
				if ($WeakMap$1 && key$1 && (typeof key$1 === "object" || typeof key$1 === "function")) {
					if (!$wm) $wm = new $WeakMap$1();
					$weakMapSet($wm, key$1, value);
				} else if (getSideChannelMap$1) {
					if (!$m) $m = getSideChannelMap$1();
					$m.set(key$1, value);
				}
			}
		};
		return channel;
	} : getSideChannelMap$1;
}));
var require_side_channel = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $TypeError$1 = require_type();
	var inspect = require_object_inspect();
	var getSideChannelList = require_side_channel_list();
	var getSideChannelMap = require_side_channel_map();
	var makeChannel = require_side_channel_weakmap() || getSideChannelMap || getSideChannelList;
	module.exports = function getSideChannel$1() {
		var $channelData;
		var channel = {
			assert: function(key$1) {
				if (!channel.has(key$1)) throw new $TypeError$1("Side channel does not contain " + inspect(key$1));
			},
			"delete": function(key$1) {
				return !!$channelData && $channelData["delete"](key$1);
			},
			get: function(key$1) {
				return $channelData && $channelData.get(key$1);
			},
			has: function(key$1) {
				return !!$channelData && $channelData.has(key$1);
			},
			set: function(key$1, value) {
				if (!$channelData) $channelData = makeChannel();
				$channelData.set(key$1, value);
			}
		};
		return channel;
	};
}));
var require_implementation = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var numberIsNaN = function(value) {
		return value !== value;
	};
	module.exports = function is$2(a, b) {
		if (a === 0 && b === 0) return 1 / a === 1 / b;
		if (a === b) return true;
		if (numberIsNaN(a) && numberIsNaN(b)) return true;
		return false;
	};
}));
var require_polyfill = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var implementation$1 = require_implementation();
	module.exports = function getPolyfill$6() {
		return typeof Object.is === "function" ? Object.is : implementation$1;
	};
}));
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var getPolyfill$1 = require_polyfill();
	var define$1 = require_define_properties();
	module.exports = function shimObjectIs() {
		var polyfill$2 = getPolyfill$1();
		define$1(Object, { is: polyfill$2 }, { is: function testObjectIs() {
			return Object.is !== polyfill$2;
		} });
		return polyfill$2;
	};
}));
var require_object_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var define = require_define_properties();
	var callBind$2 = require_call_bind();
	var implementation = require_implementation();
	var getPolyfill = require_polyfill();
	var shim = require_shim();
	var polyfill = callBind$2(getPolyfill(), Object);
	define(polyfill, {
		getPolyfill,
		implementation,
		shim
	});
	module.exports = polyfill;
}));
var require_shams = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasSymbols$1 = require_shams$1();
	module.exports = function hasToStringTagShams() {
		return hasSymbols$1() && !!Symbol.toStringTag;
	};
}));
var require_is_arguments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasToStringTag$7 = require_shams()();
	var $toString$7 = require_call_bound()("Object.prototype.toString");
	var isStandardArguments = function isArguments$1(value) {
		if (hasToStringTag$7 && value && typeof value === "object" && Symbol.toStringTag in value) return false;
		return $toString$7(value) === "[object Arguments]";
	};
	var isLegacyArguments = function isArguments$1(value) {
		if (isStandardArguments(value)) return true;
		return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString$7(value) !== "[object Array]" && "callee" in value && $toString$7(value.callee) === "[object Function]";
	};
	var supportsStandardArguments = function() {
		return isStandardArguments(arguments);
	}();
	isStandardArguments.isLegacyArguments = isLegacyArguments;
	module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
}));
var require_isarray = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toString = {}.toString;
	module.exports = Array.isArray || function(arr) {
		return toString.call(arr) == "[object Array]";
	};
}));
var require_is_array_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBind$1 = require_call_bind();
	var callBound$10 = require_call_bound();
	var $ArrayBuffer = require_get_intrinsic()("%ArrayBuffer%", true);
	var $byteLength$2 = callBound$10("ArrayBuffer.prototype.byteLength", true);
	var $toString$6 = callBound$10("Object.prototype.toString");
	var abSlice = !!$ArrayBuffer && !$byteLength$2 && new $ArrayBuffer(0).slice;
	var $abSlice = !!abSlice && callBind$1(abSlice);
	module.exports = $byteLength$2 || $abSlice ? function isArrayBuffer$3(obj) {
		if (!obj || typeof obj !== "object") return false;
		try {
			if ($byteLength$2) $byteLength$2(obj);
			else $abSlice(obj, 0);
			return true;
		} catch (e) {
			return false;
		}
	} : $ArrayBuffer ? function isArrayBuffer$3(obj) {
		return $toString$6(obj) === "[object ArrayBuffer]";
	} : function isArrayBuffer$3(obj) {
		return false;
	};
}));
var require_is_date_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound$9 = require_call_bound();
	var getDay = callBound$9("Date.prototype.getDay");
	var tryDateObject = function tryDateGetDayCall(value) {
		try {
			getDay(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr$2 = callBound$9("Object.prototype.toString");
	var dateClass = "[object Date]";
	var hasToStringTag$6 = require_shams()();
	module.exports = function isDateObject(value) {
		if (typeof value !== "object" || value === null) return false;
		return hasToStringTag$6 ? tryDateObject(value) : toStr$2(value) === dateClass;
	};
}));
var require_is_regex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound$8 = require_call_bound();
	var hasToStringTag$5 = require_shams()();
	var hasOwn = require_hasown();
	var gOPD$1 = require_gopd();
	var fn;
	if (hasToStringTag$5) {
		var $exec$1 = callBound$8("RegExp.prototype.exec");
		var isRegexMarker = {};
		var throwRegexMarker = function() {
			throw isRegexMarker;
		};
		var badStringifier = {
			toString: throwRegexMarker,
			valueOf: throwRegexMarker
		};
		if (typeof Symbol.toPrimitive === "symbol") badStringifier[Symbol.toPrimitive] = throwRegexMarker;
		fn = function isRegex$2(value) {
			if (!value || typeof value !== "object") return false;
			var descriptor = gOPD$1(value, "lastIndex");
			if (!(descriptor && hasOwn(descriptor, "value"))) return false;
			try {
				$exec$1(value, badStringifier);
			} catch (e) {
				return e === isRegexMarker;
			}
		};
	} else {
		var $toString$5 = callBound$8("Object.prototype.toString");
		var regexClass = "[object RegExp]";
		fn = function isRegex$2(value) {
			if (!value || typeof value !== "object" && typeof value !== "function") return false;
			return $toString$5(value) === regexClass;
		};
	}
	module.exports = fn;
}));
var require_is_shared_array_buffer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $byteLength$1 = require_call_bound()("SharedArrayBuffer.prototype.byteLength", true);
	module.exports = $byteLength$1 ? function isSharedArrayBuffer$1(obj) {
		if (!obj || typeof obj !== "object") return false;
		try {
			$byteLength$1(obj);
			return true;
		} catch (e) {
			return false;
		}
	} : function isSharedArrayBuffer$1(_obj) {
		return false;
	};
}));
var require_is_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound$7 = require_call_bound();
	var $strValueOf = callBound$7("String.prototype.valueOf");
	var tryStringObject = function tryStringObject$1(value) {
		try {
			$strValueOf(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var $toString$4 = callBound$7("Object.prototype.toString");
	var strClass = "[object String]";
	var hasToStringTag$4 = require_shams()();
	module.exports = function isString$2(value) {
		if (typeof value === "string") return true;
		if (!value || typeof value !== "object") return false;
		return hasToStringTag$4 ? tryStringObject(value) : $toString$4(value) === strClass;
	};
}));
var require_is_number_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound$6 = require_call_bound();
	var $numToStr = callBound$6("Number.prototype.toString");
	var tryNumberObject = function tryNumberObject$1(value) {
		try {
			$numToStr(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var $toString$3 = callBound$6("Object.prototype.toString");
	var numClass = "[object Number]";
	var hasToStringTag$3 = require_shams()();
	module.exports = function isNumberObject(value) {
		if (typeof value === "number") return true;
		if (!value || typeof value !== "object") return false;
		return hasToStringTag$3 ? tryNumberObject(value) : $toString$3(value) === numClass;
	};
}));
var require_is_boolean_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound$5 = require_call_bound();
	var $boolToStr = callBound$5("Boolean.prototype.toString");
	var $toString$2 = callBound$5("Object.prototype.toString");
	var tryBooleanObject = function booleanBrandCheck(value) {
		try {
			$boolToStr(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var boolClass = "[object Boolean]";
	var hasToStringTag$2 = require_shams()();
	module.exports = function isBoolean$2(value) {
		if (typeof value === "boolean") return true;
		if (value === null || typeof value !== "object") return false;
		return hasToStringTag$2 ? tryBooleanObject(value) : $toString$2(value) === boolClass;
	};
}));
var require_safe_regex_test = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound$4 = require_call_bound();
	var isRegex$1 = require_is_regex();
	var $exec = callBound$4("RegExp.prototype.exec");
	var $TypeError = require_type();
	module.exports = function regexTester(regex$1) {
		if (!isRegex$1(regex$1)) throw new $TypeError("`regex` must be a RegExp");
		return function test(s) {
			return $exec(regex$1, s) !== null;
		};
	};
}));
var require_is_symbol = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var callBound$3 = require_call_bound();
	var $toString$1 = callBound$3("Object.prototype.toString");
	var hasSymbols = require_has_symbols()();
	var safeRegexTest = require_safe_regex_test();
	if (hasSymbols) {
		var $symToStr = callBound$3("Symbol.prototype.toString");
		var isSymString = safeRegexTest(/^Symbol\(.*\)$/);
		var isSymbolObject = function isRealSymbolObject(value) {
			if (typeof value.valueOf() !== "symbol") return false;
			return isSymString($symToStr(value));
		};
		module.exports = function isSymbol$2(value) {
			if (typeof value === "symbol") return true;
			if (!value || typeof value !== "object" || $toString$1(value) !== "[object Symbol]") return false;
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else module.exports = function isSymbol$2(value) {
		return false;
	};
}));
var require_has_bigints = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $BigInt = typeof BigInt !== "undefined" && BigInt;
	module.exports = function hasNativeBigInts() {
		return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
	};
}));
var require_is_bigint = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (require_has_bigints()()) {
		var bigIntValueOf = BigInt.prototype.valueOf;
		var tryBigInt = function tryBigIntObject(value) {
			try {
				bigIntValueOf.call(value);
				return true;
			} catch (e) {}
			return false;
		};
		module.exports = function isBigInt$2(value) {
			if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") return false;
			if (typeof value === "bigint") return true;
			return tryBigInt(value);
		};
	} else module.exports = function isBigInt$2(value) {
		return false;
	};
}));
var require_which_boxed_primitive = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isString = require_is_string();
	var isNumber = require_is_number_object();
	var isBoolean = require_is_boolean_object();
	var isSymbol = require_is_symbol();
	var isBigInt = require_is_bigint();
	module.exports = function whichBoxedPrimitive$1(value) {
		if (value == null || typeof value !== "object" && typeof value !== "function") return null;
		if (isString(value)) return "String";
		if (isNumber(value)) return "Number";
		if (isBoolean(value)) return "Boolean";
		if (isSymbol(value)) return "Symbol";
		if (isBigInt(value)) return "BigInt";
	};
}));
var require_is_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $Map$1 = typeof Map === "function" && Map.prototype ? Map : null;
	var $Set$2 = typeof Set === "function" && Set.prototype ? Set : null;
	var exported$2;
	if (!$Map$1) exported$2 = function isMap$2(x) {
		return false;
	};
	var $mapHas$4 = $Map$1 ? Map.prototype.has : null;
	var $setHas$4 = $Set$2 ? Set.prototype.has : null;
	if (!exported$2 && !$mapHas$4) exported$2 = function isMap$2(x) {
		return false;
	};
	module.exports = exported$2 || function isMap$2(x) {
		if (!x || typeof x !== "object") return false;
		try {
			$mapHas$4.call(x);
			if ($setHas$4) try {
				$setHas$4.call(x);
			} catch (e) {
				return true;
			}
			return x instanceof $Map$1;
		} catch (e) {}
		return false;
	};
}));
var require_is_set = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $Map = typeof Map === "function" && Map.prototype ? Map : null;
	var $Set$1 = typeof Set === "function" && Set.prototype ? Set : null;
	var exported$1;
	if (!$Set$1) exported$1 = function isSet$2(x) {
		return false;
	};
	var $mapHas$3 = $Map ? Map.prototype.has : null;
	var $setHas$3 = $Set$1 ? Set.prototype.has : null;
	if (!exported$1 && !$setHas$3) exported$1 = function isSet$2(x) {
		return false;
	};
	module.exports = exported$1 || function isSet$2(x) {
		if (!x || typeof x !== "object") return false;
		try {
			$setHas$3.call(x);
			if ($mapHas$3) try {
				$mapHas$3.call(x);
			} catch (e) {
				return true;
			}
			return x instanceof $Set$1;
		} catch (e) {}
		return false;
	};
}));
var require_is_weakmap = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
	var $WeakSet$1 = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
	var exported;
	if (!$WeakMap) exported = function isWeakMap$2(x) {
		return false;
	};
	var $mapHas$2 = $WeakMap ? $WeakMap.prototype.has : null;
	var $setHas$2 = $WeakSet$1 ? $WeakSet$1.prototype.has : null;
	if (!exported && !$mapHas$2) exported = function isWeakMap$2(x) {
		return false;
	};
	module.exports = exported || function isWeakMap$2(x) {
		if (!x || typeof x !== "object") return false;
		try {
			$mapHas$2.call(x, $mapHas$2);
			if ($setHas$2) try {
				$setHas$2.call(x, $setHas$2);
			} catch (e) {
				return true;
			}
			return x instanceof $WeakMap;
		} catch (e) {}
		return false;
	};
}));
var require_is_weakset = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var GetIntrinsic$1 = require_get_intrinsic();
	var callBound$2 = require_call_bound();
	var $WeakSet = GetIntrinsic$1("%WeakSet%", true);
	var $setHas$1 = callBound$2("WeakSet.prototype.has", true);
	if ($setHas$1) {
		var $mapHas$1 = callBound$2("WeakMap.prototype.has", true);
		module.exports = function isWeakSet$2(x) {
			if (!x || typeof x !== "object") return false;
			try {
				$setHas$1(x, $setHas$1);
				if ($mapHas$1) try {
					$mapHas$1(x, $mapHas$1);
				} catch (e) {
					return true;
				}
				return x instanceof $WeakSet;
			} catch (e) {}
			return false;
		};
	} else module.exports = function isWeakSet$2(x) {
		return false;
	};
}));
var require_which_collection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isMap = require_is_map();
	var isSet = require_is_set();
	var isWeakMap = require_is_weakmap();
	var isWeakSet = require_is_weakset();
	module.exports = function whichCollection$1(value) {
		if (value && typeof value === "object") {
			if (isMap(value)) return "Map";
			if (isSet(value)) return "Set";
			if (isWeakMap(value)) return "WeakMap";
			if (isWeakSet(value)) return "WeakSet";
		}
		return false;
	};
}));
var require_is_callable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") try {
		badArrayLike = Object.defineProperty({}, "length", { get: function() {
			throw isCallableMarker;
		} });
		isCallableMarker = {};
		reflectApply(function() {
			throw 42;
		}, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) reflectApply = null;
	}
	else reflectApply = null;
	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false;
		}
	};
	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) return false;
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr$1 = Object.prototype.toString;
	var hasToStringTag$1 = typeof Symbol === "function" && !!Symbol.toStringTag;
	var isIE68 = !(0 in [,]);
	var isDDA = function isDocumentDotAll() {
		return false;
	};
	if (typeof document === "object") {
		var all = document.all;
		if (toStr$1.call(all) === toStr$1.call(document.all)) isDDA = function isDocumentDotAll(value) {
			if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) try {
				var str = toStr$1.call(value);
				return (str === "[object HTMLAllCollection]" || str === "[object HTML document.all class]" || str === "[object HTMLCollection]" || str === "[object Object]") && value("") == null;
			} catch (e) {}
			return false;
		};
	}
	module.exports = reflectApply ? function isCallable$1(value) {
		if (isDDA(value)) return true;
		if (!value) return false;
		if (typeof value !== "function" && typeof value !== "object") return false;
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) return false;
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	} : function isCallable$1(value) {
		if (isDDA(value)) return true;
		if (!value) return false;
		if (typeof value !== "function" && typeof value !== "object") return false;
		if (hasToStringTag$1) return tryFunctionObject(value);
		if (isES6ClassFn(value)) return false;
		var strClass$1 = toStr$1.call(value);
		if (strClass$1 !== "[object Function]" && strClass$1 !== "[object GeneratorFunction]" && !/^\[object HTML/.test(strClass$1)) return false;
		return tryFunctionObject(value);
	};
}));
var require_for_each = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isCallable = require_is_callable();
	var toStr = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var forEachArray = function forEachArray$1(array, iterator, receiver) {
		for (var i = 0, len = array.length; i < len; i++) if (hasOwnProperty.call(array, i)) if (receiver == null) iterator(array[i], i, array);
		else iterator.call(receiver, array[i], i, array);
	};
	var forEachString = function forEachString$1(string, iterator, receiver) {
		for (var i = 0, len = string.length; i < len; i++) if (receiver == null) iterator(string.charAt(i), i, string);
		else iterator.call(receiver, string.charAt(i), i, string);
	};
	var forEachObject = function forEachObject$1(object, iterator, receiver) {
		for (var k in object) if (hasOwnProperty.call(object, k)) if (receiver == null) iterator(object[k], k, object);
		else iterator.call(receiver, object[k], k, object);
	};
	function isArray$1(x) {
		return toStr.call(x) === "[object Array]";
	}
	module.exports = function forEach$2(list, iterator, thisArg) {
		if (!isCallable(iterator)) throw new TypeError("iterator must be a function");
		var receiver;
		if (arguments.length >= 3) receiver = thisArg;
		if (isArray$1(list)) forEachArray(list, iterator, receiver);
		else if (typeof list === "string") forEachString(list, iterator, receiver);
		else forEachObject(list, iterator, receiver);
	};
}));
var require_possible_typed_array_names = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = [
		"Float16Array",
		"Float32Array",
		"Float64Array",
		"Int8Array",
		"Int16Array",
		"Int32Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Uint16Array",
		"Uint32Array",
		"BigInt64Array",
		"BigUint64Array"
	];
}));
var require_available_typed_arrays = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var possibleNames = require_possible_typed_array_names();
	var g$1 = typeof globalThis === "undefined" ? global : globalThis;
	module.exports = function availableTypedArrays$1() {
		var out = [];
		for (var i = 0; i < possibleNames.length; i++) if (typeof g$1[possibleNames[i]] === "function") out[out.length] = possibleNames[i];
		return out;
	};
}));
var require_which_typed_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var forEach = require_for_each();
	var availableTypedArrays = require_available_typed_arrays();
	var callBind = require_call_bind();
	var callBound$1 = require_call_bound();
	var gOPD = require_gopd();
	var getProto = require_get_proto();
	var $toString = callBound$1("Object.prototype.toString");
	var hasToStringTag = require_shams()();
	var g = typeof globalThis === "undefined" ? global : globalThis;
	var typedArrays = availableTypedArrays();
	var $slice = callBound$1("String.prototype.slice");
	var $indexOf = callBound$1("Array.prototype.indexOf", true) || function indexOf$1(array, value) {
		for (var i = 0; i < array.length; i += 1) if (array[i] === value) return i;
		return -1;
	};
	var cache = { __proto__: null };
	if (hasToStringTag && gOPD && getProto) forEach(typedArrays, function(typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr && getProto) {
			var proto = getProto(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor && proto) {
				var superProto = getProto(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			cache["$" + typedArray] = callBind(descriptor.get);
		}
	});
	else forEach(typedArrays, function(typedArray) {
		var arr = new g[typedArray]();
		var fn$1 = arr.slice || arr.set;
		if (fn$1) cache["$" + typedArray] = callBind(fn$1);
	});
	var tryTypedArrays = function tryAllTypedArrays(value) {
		var found = false;
		forEach(cache, function(getter, typedArray) {
			if (!found) try {
				if ("$" + getter(value) === typedArray) found = $slice(typedArray, 1);
			} catch (e) {}
		});
		return found;
	};
	var trySlices = function tryAllSlices(value) {
		var found = false;
		forEach(cache, function(getter, name) {
			if (!found) try {
				getter(value);
				found = $slice(name, 1);
			} catch (e) {}
		});
		return found;
	};
	module.exports = function whichTypedArray$1(value) {
		if (!value || typeof value !== "object") return false;
		if (!hasToStringTag) {
			var tag = $slice($toString(value), 8, -1);
			if ($indexOf(typedArrays, tag) > -1) return tag;
			if (tag !== "Object") return false;
			return trySlices(value);
		}
		if (!gOPD) return null;
		return tryTypedArrays(value);
	};
}));
var require_array_buffer_byte_length = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $byteLength = require_call_bound()("ArrayBuffer.prototype.byteLength", true);
	var isArrayBuffer$1 = require_is_array_buffer();
	module.exports = function byteLength$1(ab) {
		if (!isArrayBuffer$1(ab)) return NaN;
		return $byteLength ? $byteLength(ab) : ab.byteLength;
	};
}));
var require_deep_equal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assign = require_object();
	var callBound = require_callBound();
	var flags = require_regexp_prototype();
	var GetIntrinsic = require_get_intrinsic();
	var getIterator = require_node();
	var getSideChannel = require_side_channel();
	var is$1 = require_object_is();
	var isArguments = require_is_arguments();
	var isArray = require_isarray();
	var isArrayBuffer = require_is_array_buffer();
	var isDate = require_is_date_object();
	var isRegex = require_is_regex();
	var isSharedArrayBuffer = require_is_shared_array_buffer();
	var objectKeys = require_object_keys();
	var whichBoxedPrimitive = require_which_boxed_primitive();
	var whichCollection = require_which_collection();
	var whichTypedArray = require_which_typed_array();
	var byteLength = require_array_buffer_byte_length();
	var sabByteLength = callBound("SharedArrayBuffer.prototype.byteLength", true);
	var $getTime = callBound("Date.prototype.getTime");
	var gPO = Object.getPrototypeOf;
	var $objToString = callBound("Object.prototype.toString");
	var $Set = GetIntrinsic("%Set%", true);
	var $mapHas = callBound("Map.prototype.has", true);
	var $mapGet = callBound("Map.prototype.get", true);
	var $mapSize = callBound("Map.prototype.size", true);
	var $setAdd = callBound("Set.prototype.add", true);
	var $setDelete = callBound("Set.prototype.delete", true);
	var $setHas = callBound("Set.prototype.has", true);
	var $setSize = callBound("Set.prototype.size", true);
	function setHasEqualElement(set, val1, opts, channel) {
		var i = getIterator(set);
		var result;
		while ((result = i.next()) && !result.done) if (internalDeepEqual(val1, result.value, opts, channel)) {
			$setDelete(set, result.value);
			return true;
		}
		return false;
	}
	function findLooseMatchingPrimitives(prim) {
		if (typeof prim === "undefined") return null;
		if (typeof prim === "object") return;
		if (typeof prim === "symbol") return false;
		if (typeof prim === "string" || typeof prim === "number") return +prim === +prim;
		return true;
	}
	function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
		var altValue = findLooseMatchingPrimitives(prim);
		if (altValue != null) return altValue;
		var curB = $mapGet(b, altValue);
		var looseOpts = assign({}, opts, { strict: false });
		if (typeof curB === "undefined" && !$mapHas(b, altValue) || !internalDeepEqual(item, curB, looseOpts, channel)) return false;
		return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
	}
	function setMightHaveLoosePrim(a, b, prim) {
		var altValue = findLooseMatchingPrimitives(prim);
		if (altValue != null) return altValue;
		return $setHas(b, altValue) && !$setHas(a, altValue);
	}
	function mapHasEqualEntry(set, map$1, key1, item1, opts, channel) {
		var i = getIterator(set);
		var result;
		var key2;
		while ((result = i.next()) && !result.done) {
			key2 = result.value;
			if (internalDeepEqual(key1, key2, opts, channel) && internalDeepEqual(item1, $mapGet(map$1, key2), opts, channel)) {
				$setDelete(set, key2);
				return true;
			}
		}
		return false;
	}
	function internalDeepEqual(actual, expected, options, channel) {
		var opts = options || {};
		if (opts.strict ? is$1(actual, expected) : actual === expected) return true;
		var actualBoxed = whichBoxedPrimitive(actual);
		var expectedBoxed = whichBoxedPrimitive(expected);
		if (actualBoxed !== expectedBoxed) return false;
		if (!actual || !expected || typeof actual !== "object" && typeof expected !== "object") return opts.strict ? is$1(actual, expected) : actual == expected;
		var hasActual = channel.has(actual);
		var hasExpected = channel.has(expected);
		var sentinel;
		if (hasActual && hasExpected) {
			if (channel.get(actual) === channel.get(expected)) return true;
		} else sentinel = {};
		if (!hasActual) channel.set(actual, sentinel);
		if (!hasExpected) channel.set(expected, sentinel);
		return objEquiv(actual, expected, opts, channel);
	}
	function isBuffer(x) {
		if (!x || typeof x !== "object" || typeof x.length !== "number") return false;
		if (typeof x.copy !== "function" || typeof x.slice !== "function") return false;
		if (x.length > 0 && typeof x[0] !== "number") return false;
		return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
	}
	function setEquiv(a, b, opts, channel) {
		if ($setSize(a) !== $setSize(b)) return false;
		var iA = getIterator(a);
		var iB = getIterator(b);
		var resultA;
		var resultB;
		var set;
		while ((resultA = iA.next()) && !resultA.done) if (resultA.value && typeof resultA.value === "object") {
			if (!set) set = new $Set();
			$setAdd(set, resultA.value);
		} else if (!$setHas(b, resultA.value)) {
			if (opts.strict) return false;
			if (!setMightHaveLoosePrim(a, b, resultA.value)) return false;
			if (!set) set = new $Set();
			$setAdd(set, resultA.value);
		}
		if (set) {
			while ((resultB = iB.next()) && !resultB.done) if (resultB.value && typeof resultB.value === "object") {
				if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) return false;
			} else if (!opts.strict && !$setHas(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel)) return false;
			return $setSize(set) === 0;
		}
		return true;
	}
	function mapEquiv(a, b, opts, channel) {
		if ($mapSize(a) !== $mapSize(b)) return false;
		var iA = getIterator(a);
		var iB = getIterator(b);
		var resultA;
		var resultB;
		var set;
		var key$1;
		var item1;
		var item2;
		while ((resultA = iA.next()) && !resultA.done) {
			key$1 = resultA.value[0];
			item1 = resultA.value[1];
			if (key$1 && typeof key$1 === "object") {
				if (!set) set = new $Set();
				$setAdd(set, key$1);
			} else {
				item2 = $mapGet(b, key$1);
				if (typeof item2 === "undefined" && !$mapHas(b, key$1) || !internalDeepEqual(item1, item2, opts, channel)) {
					if (opts.strict) return false;
					if (!mapMightHaveLoosePrim(a, b, key$1, item1, opts, channel)) return false;
					if (!set) set = new $Set();
					$setAdd(set, key$1);
				}
			}
		}
		if (set) {
			while ((resultB = iB.next()) && !resultB.done) {
				key$1 = resultB.value[0];
				item2 = resultB.value[1];
				if (key$1 && typeof key$1 === "object") {
					if (!mapHasEqualEntry(set, a, key$1, item2, opts, channel)) return false;
				} else if (!opts.strict && (!a.has(key$1) || !internalDeepEqual($mapGet(a, key$1), item2, opts, channel)) && !mapHasEqualEntry(set, a, key$1, item2, assign({}, opts, { strict: false }), channel)) return false;
			}
			return $setSize(set) === 0;
		}
		return true;
	}
	function objEquiv(a, b, opts, channel) {
		var i, key$1;
		if (typeof a !== typeof b) return false;
		if (a == null || b == null) return false;
		if ($objToString(a) !== $objToString(b)) return false;
		if (isArguments(a) !== isArguments(b)) return false;
		var aIsArray = isArray(a);
		var bIsArray = isArray(b);
		if (aIsArray !== bIsArray) return false;
		var aIsError = a instanceof Error;
		var bIsError = b instanceof Error;
		if (aIsError !== bIsError) return false;
		if (aIsError || bIsError) {
			if (a.name !== b.name || a.message !== b.message) return false;
		}
		var aIsRegex = isRegex(a);
		var bIsRegex = isRegex(b);
		if (aIsRegex !== bIsRegex) return false;
		if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) return false;
		var aIsDate = isDate(a);
		var bIsDate = isDate(b);
		if (aIsDate !== bIsDate) return false;
		if (aIsDate || bIsDate) {
			if ($getTime(a) !== $getTime(b)) return false;
		}
		if (opts.strict && gPO && gPO(a) !== gPO(b)) return false;
		var aWhich = whichTypedArray(a);
		var bWhich = whichTypedArray(b);
		if (aWhich !== bWhich) return false;
		if (aWhich || bWhich) {
			if (a.length !== b.length) return false;
			for (i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
			return true;
		}
		var aIsBuffer = isBuffer(a);
		var bIsBuffer = isBuffer(b);
		if (aIsBuffer !== bIsBuffer) return false;
		if (aIsBuffer || bIsBuffer) {
			if (a.length !== b.length) return false;
			for (i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
			return true;
		}
		var aIsArrayBuffer = isArrayBuffer(a);
		var bIsArrayBuffer = isArrayBuffer(b);
		if (aIsArrayBuffer !== bIsArrayBuffer) return false;
		if (aIsArrayBuffer || bIsArrayBuffer) {
			if (byteLength(a) !== byteLength(b)) return false;
			return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
		}
		var aIsSAB = isSharedArrayBuffer(a);
		var bIsSAB = isSharedArrayBuffer(b);
		if (aIsSAB !== bIsSAB) return false;
		if (aIsSAB || bIsSAB) {
			if (sabByteLength(a) !== sabByteLength(b)) return false;
			return typeof Uint8Array === "function" && internalDeepEqual(new Uint8Array(a), new Uint8Array(b), opts, channel);
		}
		if (typeof a !== typeof b) return false;
		var ka = objectKeys(a);
		var kb = objectKeys(b);
		if (ka.length !== kb.length) return false;
		ka.sort();
		kb.sort();
		for (i = ka.length - 1; i >= 0; i--) if (ka[i] != kb[i]) return false;
		for (i = ka.length - 1; i >= 0; i--) {
			key$1 = ka[i];
			if (!internalDeepEqual(a[key$1], b[key$1], opts, channel)) return false;
		}
		var aCollection = whichCollection(a);
		var bCollection = whichCollection(b);
		if (aCollection !== bCollection) return false;
		if (aCollection === "Set" || bCollection === "Set") return setEquiv(a, b, opts, channel);
		if (aCollection === "Map") return mapEquiv(a, b, opts, channel);
		return true;
	}
	module.exports = function deepEqual$1(a, b, opts) {
		return internalDeepEqual(a, b, opts, getSideChannel());
	};
}));
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var constants$3 = {
		PLAYBACK_STATUS_PLAYING: "Playing",
		PLAYBACK_STATUS_PAUSED: "Paused",
		PLAYBACK_STATUS_STOPPED: "Stopped",
		LOOP_STATUS_NONE: "None",
		LOOP_STATUS_TRACK: "Track",
		LOOP_STATUS_PLAYLIST: "Playlist"
	};
	var playbackStatuses = [
		constants$3.PLAYBACK_STATUS_PLAYING,
		constants$3.PLAYBACK_STATUS_PAUSED,
		constants$3.PLAYBACK_STATUS_STOPPED
	];
	var loopStatuses = [
		constants$3.LOOP_STATUS_NONE,
		constants$3.LOOP_STATUS_PLAYLIST,
		constants$3.LOOP_STATUS_TRACK
	];
	constants$3.isLoopStatusValid = function(value) {
		return loopStatuses.includes(value);
	};
	constants$3.isPlaybackStatusValid = function(value) {
		return playbackStatuses.includes(value);
	};
	module.exports = constants$3;
}));
var require_mpris_interface = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var dbus$4 = require_dbus_next();
	var types$3 = require_types();
	var deepEqual = require_deep_equal();
	var constants$2 = require_constants();
	var logging = require_logging();
	var { Interface } = dbus$4.interface;
	var MprisInterface$4 = class extends Interface {
		constructor(name, player) {
			super(name);
			this.player = player;
		}
		_setPropertyInternal(property$5, valueDbus) {
			this.player.emit(property$5[0].toLowerCase() + property$5.substring(1), valueDbus);
		}
		setProperty(property$5, valuePlain) {
			let valueDbus = valuePlain;
			if (property$5 === "Metadata") valueDbus = types$3.metadataToDbus(valuePlain);
			else if (property$5 === "ActivePlaylist") if (valuePlain) valueDbus = [true, types$3.playlistToDbus(valuePlain)];
			else valueDbus = [false, types$3.emptyPlaylist];
			else if (property$5 === "Tracks") valueDbus = valuePlain.filter((t$1) => t$1["mpris:trackid"]).map((t$1) => t$1["mpris:trackid"]);
			if (!deepEqual(this[`_${property$5}`], valueDbus)) {
				this[`_${property$5}`] = valueDbus;
				if (property$5 === "LoopStatus" && !constants$2.isLoopStatusValid(valuePlain)) logging.warn(`setting player loop status to an invalid value: ${valuePlain}`);
				else if (property$5 === "PlaybackStatus" && !constants$2.isPlaybackStatusValid(valuePlain)) logging.warn(`setting player playback status to an invalid value: ${valuePlain}`);
				else {
					let changedProperties = {};
					changedProperties[property$5] = valueDbus;
					Interface.emitPropertiesChanged(this, changedProperties);
				}
			}
		}
	};
	module.exports = MprisInterface$4;
}));
var require_player = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _decorate$3(e, r, t$1, i) {
		var o = _getDecoratorsApi$3();
		if (i) for (var n = 0; n < i.length; n++) o = i[n](o);
		var s = r(function(e$1) {
			o.initializeInstanceElements(e$1, a.elements);
		}, t$1), a = o.decorateClass(_coalesceClassElements$3(s.d.map(_createElementDescriptor$3)), e);
		return o.initializeClassElements(s.F, a.elements), o.runClassFinishers(s.F, a.finishers);
	}
	function _getDecoratorsApi$3() {
		_getDecoratorsApi$3 = function() {
			return e;
		};
		var e = {
			elementsDefinitionOrder: [["method"], ["field"]],
			initializeInstanceElements: function(e$1, r) {
				["method", "field"].forEach(function(t$1) {
					r.forEach(function(r$1) {
						r$1.kind === t$1 && "own" === r$1.placement && this.defineClassElement(e$1, r$1);
					}, this);
				}, this);
			},
			initializeClassElements: function(e$1, r) {
				var t$1 = e$1.prototype;
				["method", "field"].forEach(function(i) {
					r.forEach(function(r$1) {
						var o = r$1.placement;
						if (r$1.kind === i && ("static" === o || "prototype" === o)) {
							var n = "static" === o ? e$1 : t$1;
							this.defineClassElement(n, r$1);
						}
					}, this);
				}, this);
			},
			defineClassElement: function(e$1, r) {
				var t$1 = r.descriptor;
				if ("field" === r.kind) {
					var i = r.initializer;
					t$1 = {
						enumerable: t$1.enumerable,
						writable: t$1.writable,
						configurable: t$1.configurable,
						value: void 0 === i ? void 0 : i.call(e$1)
					};
				}
				Object.defineProperty(e$1, r.key, t$1);
			},
			decorateClass: function(e$1, r) {
				var t$1 = [], i = [], o = {
					static: [],
					prototype: [],
					own: []
				};
				if (e$1.forEach(function(e$2) {
					this.addElementPlacement(e$2, o);
				}, this), e$1.forEach(function(e$2) {
					if (!_hasDecorators$3(e$2)) return t$1.push(e$2);
					var r$1 = this.decorateElement(e$2, o);
					t$1.push(r$1.element), t$1.push.apply(t$1, r$1.extras), i.push.apply(i, r$1.finishers);
				}, this), !r) return {
					elements: t$1,
					finishers: i
				};
				var n = this.decorateConstructor(t$1, r);
				return i.push.apply(i, n.finishers), n.finishers = i, n;
			},
			addElementPlacement: function(e$1, r, t$1) {
				var i = r[e$1.placement];
				if (!t$1 && -1 !== i.indexOf(e$1.key)) throw new TypeError("Duplicated element (" + e$1.key + ")");
				i.push(e$1.key);
			},
			decorateElement: function(e$1, r) {
				for (var t$1 = [], i = [], o = e$1.decorators, n = o.length - 1; n >= 0; n--) {
					var s = r[e$1.placement];
					s.splice(s.indexOf(e$1.key), 1);
					var a = this.fromElementDescriptor(e$1), l = this.toElementFinisherExtras((0, o[n])(a) || a);
					e$1 = l.element, this.addElementPlacement(e$1, r), l.finisher && i.push(l.finisher);
					var c = l.extras;
					if (c) {
						for (var p = 0; p < c.length; p++) this.addElementPlacement(c[p], r);
						t$1.push.apply(t$1, c);
					}
				}
				return {
					element: e$1,
					finishers: i,
					extras: t$1
				};
			},
			decorateConstructor: function(e$1, r) {
				for (var t$1 = [], i = r.length - 1; i >= 0; i--) {
					var o = this.fromClassDescriptor(e$1), n = this.toClassDescriptor((0, r[i])(o) || o);
					if (void 0 !== n.finisher && t$1.push(n.finisher), void 0 !== n.elements) {
						e$1 = n.elements;
						for (var s = 0; s < e$1.length - 1; s++) for (var a = s + 1; a < e$1.length; a++) if (e$1[s].key === e$1[a].key && e$1[s].placement === e$1[a].placement) throw new TypeError("Duplicated element (" + e$1[s].key + ")");
					}
				}
				return {
					elements: e$1,
					finishers: t$1
				};
			},
			fromElementDescriptor: function(e$1) {
				var r = {
					kind: e$1.kind,
					key: e$1.key,
					placement: e$1.placement,
					descriptor: e$1.descriptor
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), "field" === e$1.kind && (r.initializer = e$1.initializer), r;
			},
			toElementDescriptors: function(e$1) {
				if (void 0 !== e$1) return _toArray$3(e$1).map(function(e$2) {
					var r = this.toElementDescriptor(e$2);
					return this.disallowProperty(e$2, "finisher", "An element descriptor"), this.disallowProperty(e$2, "extras", "An element descriptor"), r;
				}, this);
			},
			toElementDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("method" !== r && "field" !== r) throw new TypeError("An element descriptor's .kind property must be either \"method\" or \"field\", but a decorator created an element descriptor with .kind \"" + r + "\"");
				var t$1 = _toPropertyKey$4(e$1.key), i = e$1.placement + "";
				if ("static" !== i && "prototype" !== i && "own" !== i) throw new TypeError("An element descriptor's .placement property must be one of \"static\", \"prototype\" or \"own\", but a decorator created an element descriptor with .placement \"" + i + "\"");
				var o = e$1.descriptor;
				this.disallowProperty(e$1, "elements", "An element descriptor");
				var n = {
					kind: r,
					key: t$1,
					placement: i,
					descriptor: Object.assign({}, o)
				};
				return "field" !== r ? this.disallowProperty(e$1, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), n.initializer = e$1.initializer), n;
			},
			toElementFinisherExtras: function(e$1) {
				return {
					element: this.toElementDescriptor(e$1),
					finisher: _optionalCallableProperty$3(e$1, "finisher"),
					extras: this.toElementDescriptors(e$1.extras)
				};
			},
			fromClassDescriptor: function(e$1) {
				var r = {
					kind: "class",
					elements: e$1.map(this.fromElementDescriptor, this)
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), r;
			},
			toClassDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("class" !== r) throw new TypeError("A class descriptor's .kind property must be \"class\", but a decorator created a class descriptor with .kind \"" + r + "\"");
				this.disallowProperty(e$1, "key", "A class descriptor"), this.disallowProperty(e$1, "placement", "A class descriptor"), this.disallowProperty(e$1, "descriptor", "A class descriptor"), this.disallowProperty(e$1, "initializer", "A class descriptor"), this.disallowProperty(e$1, "extras", "A class descriptor");
				var t$1 = _optionalCallableProperty$3(e$1, "finisher");
				return {
					elements: this.toElementDescriptors(e$1.elements),
					finisher: t$1
				};
			},
			runClassFinishers: function(e$1, r) {
				for (var t$1 = 0; t$1 < r.length; t$1++) {
					var i = (0, r[t$1])(e$1);
					if (void 0 !== i) {
						if ("function" != typeof i) throw new TypeError("Finishers must return a constructor.");
						e$1 = i;
					}
				}
				return e$1;
			},
			disallowProperty: function(e$1, r, t$1) {
				if (void 0 !== e$1[r]) throw new TypeError(t$1 + " can't have a ." + r + " property.");
			}
		};
		return e;
	}
	function _createElementDescriptor$3(e) {
		var r, t$1 = _toPropertyKey$4(e.key);
		"method" === e.kind ? r = {
			value: e.value,
			writable: !0,
			configurable: !0,
			enumerable: !1
		} : "get" === e.kind ? r = {
			get: e.value,
			configurable: !0,
			enumerable: !1
		} : "set" === e.kind ? r = {
			set: e.value,
			configurable: !0,
			enumerable: !1
		} : "field" === e.kind && (r = {
			configurable: !0,
			writable: !0,
			enumerable: !0
		});
		var i = {
			kind: "field" === e.kind ? "field" : "method",
			key: t$1,
			placement: e.static ? "static" : "field" === e.kind ? "own" : "prototype",
			descriptor: r
		};
		return e.decorators && (i.decorators = e.decorators), "field" === e.kind && (i.initializer = e.value), i;
	}
	function _coalesceGetterSetter$3(e, r) {
		void 0 !== e.descriptor.get ? r.descriptor.get = e.descriptor.get : r.descriptor.set = e.descriptor.set;
	}
	function _coalesceClassElements$3(e) {
		for (var r = [], isSameElement = function(e$1) {
			return "method" === e$1.kind && e$1.key === o.key && e$1.placement === o.placement;
		}, t$1 = 0; t$1 < e.length; t$1++) {
			var i, o = e[t$1];
			if ("method" === o.kind && (i = r.find(isSameElement))) if (_isDataDescriptor$3(o.descriptor) || _isDataDescriptor$3(i.descriptor)) {
				if (_hasDecorators$3(o) || _hasDecorators$3(i)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated.");
				i.descriptor = o.descriptor;
			} else {
				if (_hasDecorators$3(o)) {
					if (_hasDecorators$3(i)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ").");
					i.decorators = o.decorators;
				}
				_coalesceGetterSetter$3(o, i);
			}
			else r.push(o);
		}
		return r;
	}
	function _hasDecorators$3(e) {
		return e.decorators && e.decorators.length;
	}
	function _isDataDescriptor$3(e) {
		return void 0 !== e && !(void 0 === e.value && void 0 === e.writable);
	}
	function _optionalCallableProperty$3(e, r) {
		var t$1 = e[r];
		if (void 0 !== t$1 && "function" != typeof t$1) throw new TypeError("Expected '" + r + "' to be a function");
		return t$1;
	}
	function _toPropertyKey$4(t$1) {
		var i = _toPrimitive$4(t$1, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive$4(t$1, r) {
		if ("object" != typeof t$1 || !t$1) return t$1;
		var e = t$1[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t$1, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t$1);
	}
	function _toArray$3(r) {
		return _arrayWithHoles$3(r) || _iterableToArray$3(r) || _unsupportedIterableToArray$3(r) || _nonIterableRest$3();
	}
	function _nonIterableRest$3() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray$3(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
			var t$1 = {}.toString.call(r).slice(8, -1);
			return "Object" === t$1 && r.constructor && (t$1 = r.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray$3(r, a) : void 0;
		}
	}
	function _arrayLikeToArray$3(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	function _iterableToArray$3(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	function _arrayWithHoles$3(r) {
		if (Array.isArray(r)) return r;
	}
	var dbus$3 = require_dbus_next();
	var MprisInterface$3 = require_mpris_interface();
	var constants$1 = require_constants();
	var { property: property$3, method: method$3, signal: signal$2, ACCESS_READ: ACCESS_READ$3 } = dbus$3.interface;
	var DBusError = dbus$3.DBusError;
	module.exports = _decorate$3(null, function(_initialize, _MprisInterface) {
		class PlayerInterface$2 extends _MprisInterface {
			constructor(player) {
				super("org.mpris.MediaPlayer2.Player", player);
				_initialize(this);
			}
		}
		return {
			F: PlayerInterface$2,
			d: [
				{
					kind: "field",
					key: "_CanControl",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_CanPause",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_CanPlay",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_CanSeek",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_CanGoNext",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_CanGoPrevious",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_Metadata",
					value() {
						return {};
					}
				},
				{
					kind: "field",
					key: "_MaximumRate",
					value() {
						return 1;
					}
				},
				{
					kind: "field",
					key: "_MinimumRate",
					value() {
						return 1;
					}
				},
				{
					kind: "field",
					key: "_Rate",
					value() {
						return 1;
					}
				},
				{
					kind: "field",
					key: "_Shuffle",
					value() {
						return false;
					}
				},
				{
					kind: "field",
					key: "_Volume",
					value() {
						return 0;
					}
				},
				{
					kind: "field",
					key: "_LoopStatus",
					value() {
						return constants$1.LOOP_STATUS_NONE;
					}
				},
				{
					kind: "field",
					key: "_PlaybackStatus",
					value() {
						return constants$1.PLAYBACK_STATUS_STOPPED;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "b",
						access: ACCESS_READ$3
					})],
					key: "CanControl",
					value: function() {
						return this._CanControl;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "b",
						access: ACCESS_READ$3
					})],
					key: "CanPause",
					value: function() {
						return this._CanPause;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "b",
						access: ACCESS_READ$3
					})],
					key: "CanPlay",
					value: function() {
						return this._CanPlay;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "b",
						access: ACCESS_READ$3
					})],
					key: "CanSeek",
					value: function() {
						return this._CanSeek;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "b",
						access: ACCESS_READ$3
					})],
					key: "CanGoNext",
					value: function() {
						return this._CanGoNext;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "b",
						access: ACCESS_READ$3
					})],
					key: "CanGoPrevious",
					value: function() {
						return this._CanGoPrevious;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "a{sv}",
						access: ACCESS_READ$3
					})],
					key: "Metadata",
					value: function() {
						return this._Metadata;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "d",
						access: ACCESS_READ$3
					})],
					key: "MaximumRate",
					value: function() {
						return this._MaximumRate;
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "d",
						access: ACCESS_READ$3
					})],
					key: "MinimumRate",
					value: function() {
						return this._MinimumRate;
					}
				},
				{
					kind: "get",
					decorators: [property$3({ signature: "d" })],
					key: "Rate",
					value: function() {
						return this._Rate;
					}
				},
				{
					kind: "set",
					key: "Rate",
					value: function(value) {
						this._setPropertyInternal("Rate", value);
					}
				},
				{
					kind: "get",
					decorators: [property$3({ signature: "b" })],
					key: "Shuffle",
					value: function() {
						return this._Shuffle;
					}
				},
				{
					kind: "set",
					key: "Shuffle",
					value: function(value) {
						this._setPropertyInternal("Shuffle", value);
					}
				},
				{
					kind: "get",
					decorators: [property$3({ signature: "d" })],
					key: "Volume",
					value: function() {
						return this._Volume;
					}
				},
				{
					kind: "set",
					key: "Volume",
					value: function(value) {
						this._setPropertyInternal("Volume", value);
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "x",
						access: ACCESS_READ$3
					})],
					key: "Position",
					value: function() {
						let playerPosition = this.player.getPosition();
						let position = Math.floor(playerPosition || 0);
						if (isNaN(position)) {
							const err = "github.mpris_service.InvalidPositionError";
							const message$2 = `The player has set an invalid position: ${playerPosition}`;
							throw new DBusError(err, message$2);
						}
						return position;
					}
				},
				{
					kind: "get",
					decorators: [property$3({ signature: "s" })],
					key: "LoopStatus",
					value: function() {
						if (!constants$1.isLoopStatusValid(this._LoopStatus)) {
							const err = "github.mpris_service.InvalidLoopStatusError";
							const message$2 = `The player has set an invalid loop status: ${this._LoopStatus}`;
							throw new DBusError(err, message$2);
						}
						return this._LoopStatus;
					}
				},
				{
					kind: "set",
					key: "LoopStatus",
					value: function(value) {
						if (!constants$1.isLoopStatusValid(value)) {
							const err = "github.mpris_service.InvalidLoopStatusError";
							const message$2 = `Tried to set loop status to an invalid value: ${value}`;
							throw new DBusError(err, message$2);
						}
						this._setPropertyInternal("LoopStatus", value);
					}
				},
				{
					kind: "get",
					decorators: [property$3({
						signature: "s",
						access: ACCESS_READ$3
					})],
					key: "PlaybackStatus",
					value: function() {
						if (!constants$1.isPlaybackStatusValid(this._PlaybackStatus)) {
							const err = "github.mpris_service.InvalidPlaybackStatusError";
							const message$2 = `The player has set an invalid playback status: ${this._PlaybackStatus}`;
							throw new DBusError(err, message$2);
						}
						return this._PlaybackStatus;
					}
				},
				{
					kind: "method",
					decorators: [method$3({})],
					key: "Next",
					value: function Next() {
						this.player.emit("next");
					}
				},
				{
					kind: "method",
					decorators: [method$3({})],
					key: "Previous",
					value: function Previous() {
						this.player.emit("previous");
					}
				},
				{
					kind: "method",
					decorators: [method$3({})],
					key: "Pause",
					value: function Pause() {
						this.player.emit("pause");
					}
				},
				{
					kind: "method",
					decorators: [method$3({})],
					key: "PlayPause",
					value: function PlayPause() {
						this.player.emit("playpause");
					}
				},
				{
					kind: "method",
					decorators: [method$3({})],
					key: "Stop",
					value: function Stop() {
						this.player.emit("stop");
					}
				},
				{
					kind: "method",
					decorators: [method$3({})],
					key: "Play",
					value: function Play() {
						this.player.emit("play");
					}
				},
				{
					kind: "method",
					decorators: [method$3({ inSignature: "x" })],
					key: "Seek",
					value: function Seek(offset) {
						offset = Number(offset);
						this.player.emit("seek", offset);
					}
				},
				{
					kind: "method",
					decorators: [method$3({ inSignature: "ox" })],
					key: "SetPosition",
					value: function SetPosition(trackId, position) {
						let e = {
							trackId,
							position: Number(position)
						};
						this.player.emit("position", e);
					}
				},
				{
					kind: "method",
					decorators: [method$3({ inSignature: "s" })],
					key: "OpenUri",
					value: function OpenUri(uri) {
						let e = { uri };
						this.player.emit("open", e);
					}
				},
				{
					kind: "method",
					decorators: [signal$2({ signature: "x" })],
					key: "Seeked",
					value: function Seeked(position) {
						return position;
					}
				}
			]
		};
	}, MprisInterface$3);
}));
var require_root = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _decorate$2(e, r, t$1, i) {
		var o = _getDecoratorsApi$2();
		if (i) for (var n = 0; n < i.length; n++) o = i[n](o);
		var s = r(function(e$1) {
			o.initializeInstanceElements(e$1, a.elements);
		}, t$1), a = o.decorateClass(_coalesceClassElements$2(s.d.map(_createElementDescriptor$2)), e);
		return o.initializeClassElements(s.F, a.elements), o.runClassFinishers(s.F, a.finishers);
	}
	function _getDecoratorsApi$2() {
		_getDecoratorsApi$2 = function() {
			return e;
		};
		var e = {
			elementsDefinitionOrder: [["method"], ["field"]],
			initializeInstanceElements: function(e$1, r) {
				["method", "field"].forEach(function(t$1) {
					r.forEach(function(r$1) {
						r$1.kind === t$1 && "own" === r$1.placement && this.defineClassElement(e$1, r$1);
					}, this);
				}, this);
			},
			initializeClassElements: function(e$1, r) {
				var t$1 = e$1.prototype;
				["method", "field"].forEach(function(i) {
					r.forEach(function(r$1) {
						var o = r$1.placement;
						if (r$1.kind === i && ("static" === o || "prototype" === o)) {
							var n = "static" === o ? e$1 : t$1;
							this.defineClassElement(n, r$1);
						}
					}, this);
				}, this);
			},
			defineClassElement: function(e$1, r) {
				var t$1 = r.descriptor;
				if ("field" === r.kind) {
					var i = r.initializer;
					t$1 = {
						enumerable: t$1.enumerable,
						writable: t$1.writable,
						configurable: t$1.configurable,
						value: void 0 === i ? void 0 : i.call(e$1)
					};
				}
				Object.defineProperty(e$1, r.key, t$1);
			},
			decorateClass: function(e$1, r) {
				var t$1 = [], i = [], o = {
					static: [],
					prototype: [],
					own: []
				};
				if (e$1.forEach(function(e$2) {
					this.addElementPlacement(e$2, o);
				}, this), e$1.forEach(function(e$2) {
					if (!_hasDecorators$2(e$2)) return t$1.push(e$2);
					var r$1 = this.decorateElement(e$2, o);
					t$1.push(r$1.element), t$1.push.apply(t$1, r$1.extras), i.push.apply(i, r$1.finishers);
				}, this), !r) return {
					elements: t$1,
					finishers: i
				};
				var n = this.decorateConstructor(t$1, r);
				return i.push.apply(i, n.finishers), n.finishers = i, n;
			},
			addElementPlacement: function(e$1, r, t$1) {
				var i = r[e$1.placement];
				if (!t$1 && -1 !== i.indexOf(e$1.key)) throw new TypeError("Duplicated element (" + e$1.key + ")");
				i.push(e$1.key);
			},
			decorateElement: function(e$1, r) {
				for (var t$1 = [], i = [], o = e$1.decorators, n = o.length - 1; n >= 0; n--) {
					var s = r[e$1.placement];
					s.splice(s.indexOf(e$1.key), 1);
					var a = this.fromElementDescriptor(e$1), l = this.toElementFinisherExtras((0, o[n])(a) || a);
					e$1 = l.element, this.addElementPlacement(e$1, r), l.finisher && i.push(l.finisher);
					var c = l.extras;
					if (c) {
						for (var p = 0; p < c.length; p++) this.addElementPlacement(c[p], r);
						t$1.push.apply(t$1, c);
					}
				}
				return {
					element: e$1,
					finishers: i,
					extras: t$1
				};
			},
			decorateConstructor: function(e$1, r) {
				for (var t$1 = [], i = r.length - 1; i >= 0; i--) {
					var o = this.fromClassDescriptor(e$1), n = this.toClassDescriptor((0, r[i])(o) || o);
					if (void 0 !== n.finisher && t$1.push(n.finisher), void 0 !== n.elements) {
						e$1 = n.elements;
						for (var s = 0; s < e$1.length - 1; s++) for (var a = s + 1; a < e$1.length; a++) if (e$1[s].key === e$1[a].key && e$1[s].placement === e$1[a].placement) throw new TypeError("Duplicated element (" + e$1[s].key + ")");
					}
				}
				return {
					elements: e$1,
					finishers: t$1
				};
			},
			fromElementDescriptor: function(e$1) {
				var r = {
					kind: e$1.kind,
					key: e$1.key,
					placement: e$1.placement,
					descriptor: e$1.descriptor
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), "field" === e$1.kind && (r.initializer = e$1.initializer), r;
			},
			toElementDescriptors: function(e$1) {
				if (void 0 !== e$1) return _toArray$2(e$1).map(function(e$2) {
					var r = this.toElementDescriptor(e$2);
					return this.disallowProperty(e$2, "finisher", "An element descriptor"), this.disallowProperty(e$2, "extras", "An element descriptor"), r;
				}, this);
			},
			toElementDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("method" !== r && "field" !== r) throw new TypeError("An element descriptor's .kind property must be either \"method\" or \"field\", but a decorator created an element descriptor with .kind \"" + r + "\"");
				var t$1 = _toPropertyKey$3(e$1.key), i = e$1.placement + "";
				if ("static" !== i && "prototype" !== i && "own" !== i) throw new TypeError("An element descriptor's .placement property must be one of \"static\", \"prototype\" or \"own\", but a decorator created an element descriptor with .placement \"" + i + "\"");
				var o = e$1.descriptor;
				this.disallowProperty(e$1, "elements", "An element descriptor");
				var n = {
					kind: r,
					key: t$1,
					placement: i,
					descriptor: Object.assign({}, o)
				};
				return "field" !== r ? this.disallowProperty(e$1, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), n.initializer = e$1.initializer), n;
			},
			toElementFinisherExtras: function(e$1) {
				return {
					element: this.toElementDescriptor(e$1),
					finisher: _optionalCallableProperty$2(e$1, "finisher"),
					extras: this.toElementDescriptors(e$1.extras)
				};
			},
			fromClassDescriptor: function(e$1) {
				var r = {
					kind: "class",
					elements: e$1.map(this.fromElementDescriptor, this)
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), r;
			},
			toClassDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("class" !== r) throw new TypeError("A class descriptor's .kind property must be \"class\", but a decorator created a class descriptor with .kind \"" + r + "\"");
				this.disallowProperty(e$1, "key", "A class descriptor"), this.disallowProperty(e$1, "placement", "A class descriptor"), this.disallowProperty(e$1, "descriptor", "A class descriptor"), this.disallowProperty(e$1, "initializer", "A class descriptor"), this.disallowProperty(e$1, "extras", "A class descriptor");
				var t$1 = _optionalCallableProperty$2(e$1, "finisher");
				return {
					elements: this.toElementDescriptors(e$1.elements),
					finisher: t$1
				};
			},
			runClassFinishers: function(e$1, r) {
				for (var t$1 = 0; t$1 < r.length; t$1++) {
					var i = (0, r[t$1])(e$1);
					if (void 0 !== i) {
						if ("function" != typeof i) throw new TypeError("Finishers must return a constructor.");
						e$1 = i;
					}
				}
				return e$1;
			},
			disallowProperty: function(e$1, r, t$1) {
				if (void 0 !== e$1[r]) throw new TypeError(t$1 + " can't have a ." + r + " property.");
			}
		};
		return e;
	}
	function _createElementDescriptor$2(e) {
		var r, t$1 = _toPropertyKey$3(e.key);
		"method" === e.kind ? r = {
			value: e.value,
			writable: !0,
			configurable: !0,
			enumerable: !1
		} : "get" === e.kind ? r = {
			get: e.value,
			configurable: !0,
			enumerable: !1
		} : "set" === e.kind ? r = {
			set: e.value,
			configurable: !0,
			enumerable: !1
		} : "field" === e.kind && (r = {
			configurable: !0,
			writable: !0,
			enumerable: !0
		});
		var i = {
			kind: "field" === e.kind ? "field" : "method",
			key: t$1,
			placement: e.static ? "static" : "field" === e.kind ? "own" : "prototype",
			descriptor: r
		};
		return e.decorators && (i.decorators = e.decorators), "field" === e.kind && (i.initializer = e.value), i;
	}
	function _coalesceGetterSetter$2(e, r) {
		void 0 !== e.descriptor.get ? r.descriptor.get = e.descriptor.get : r.descriptor.set = e.descriptor.set;
	}
	function _coalesceClassElements$2(e) {
		for (var r = [], isSameElement = function(e$1) {
			return "method" === e$1.kind && e$1.key === o.key && e$1.placement === o.placement;
		}, t$1 = 0; t$1 < e.length; t$1++) {
			var i, o = e[t$1];
			if ("method" === o.kind && (i = r.find(isSameElement))) if (_isDataDescriptor$2(o.descriptor) || _isDataDescriptor$2(i.descriptor)) {
				if (_hasDecorators$2(o) || _hasDecorators$2(i)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated.");
				i.descriptor = o.descriptor;
			} else {
				if (_hasDecorators$2(o)) {
					if (_hasDecorators$2(i)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ").");
					i.decorators = o.decorators;
				}
				_coalesceGetterSetter$2(o, i);
			}
			else r.push(o);
		}
		return r;
	}
	function _hasDecorators$2(e) {
		return e.decorators && e.decorators.length;
	}
	function _isDataDescriptor$2(e) {
		return void 0 !== e && !(void 0 === e.value && void 0 === e.writable);
	}
	function _optionalCallableProperty$2(e, r) {
		var t$1 = e[r];
		if (void 0 !== t$1 && "function" != typeof t$1) throw new TypeError("Expected '" + r + "' to be a function");
		return t$1;
	}
	function _toPropertyKey$3(t$1) {
		var i = _toPrimitive$3(t$1, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive$3(t$1, r) {
		if ("object" != typeof t$1 || !t$1) return t$1;
		var e = t$1[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t$1, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t$1);
	}
	function _toArray$2(r) {
		return _arrayWithHoles$2(r) || _iterableToArray$2(r) || _unsupportedIterableToArray$2(r) || _nonIterableRest$2();
	}
	function _nonIterableRest$2() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray$2(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
			var t$1 = {}.toString.call(r).slice(8, -1);
			return "Object" === t$1 && r.constructor && (t$1 = r.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray$2(r, a) : void 0;
		}
	}
	function _arrayLikeToArray$2(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	function _iterableToArray$2(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	function _arrayWithHoles$2(r) {
		if (Array.isArray(r)) return r;
	}
	var MprisInterface$2 = require_mpris_interface();
	var { property: property$2, method: method$2, ACCESS_READ: ACCESS_READ$2 } = require_dbus_next().interface;
	module.exports = _decorate$2(null, function(_initialize, _MprisInterface) {
		class RootInterface$2 extends _MprisInterface {
			constructor(player, opts = {}) {
				super("org.mpris.MediaPlayer2", player);
				_initialize(this);
				if (opts.hasOwnProperty("identity")) this._Identity = opts.identity;
				if (opts.hasOwnProperty("supportedUriSchemes")) this._SupportedUriSchemes = opts.supportedUriSchemes;
				if (opts.hasOwnProperty("supportedMimeTypes")) this._SupportedMimeTypes = opts.supportedMimeTypes;
				if (opts.hasOwnProperty("desktopEntry")) this._DesktopEntry = opts.desktopEntry;
			}
		}
		return {
			F: RootInterface$2,
			d: [
				{
					kind: "field",
					key: "_CanQuit",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_Fullscreen",
					value() {
						return false;
					}
				},
				{
					kind: "field",
					key: "_CanSetFullscreen",
					value() {
						return false;
					}
				},
				{
					kind: "field",
					key: "_CanRaise",
					value() {
						return true;
					}
				},
				{
					kind: "field",
					key: "_HasTrackList",
					value() {
						return false;
					}
				},
				{
					kind: "field",
					key: "_Identity",
					value() {
						return "";
					}
				},
				{
					kind: "field",
					key: "_DesktopEntry",
					value() {
						return "";
					}
				},
				{
					kind: "field",
					key: "_SupportedUriSchemes",
					value() {
						return [];
					}
				},
				{
					kind: "field",
					key: "_SupportedMimeTypes",
					value() {
						return [];
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "b",
						access: ACCESS_READ$2
					})],
					key: "CanQuit",
					value: function() {
						return this._CanQuit;
					}
				},
				{
					kind: "get",
					decorators: [property$2({ signature: "b" })],
					key: "Fullscreen",
					value: function() {
						return this._Fullscreen;
					}
				},
				{
					kind: "set",
					key: "Fullscreen",
					value: function(value) {
						this._setPropertyInternal("Fullscreen", value);
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "b",
						access: ACCESS_READ$2
					})],
					key: "CanSetFullscreen",
					value: function() {
						return this._CanSetFullscreen;
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "b",
						access: ACCESS_READ$2
					})],
					key: "CanRaise",
					value: function() {
						return this._CanRaise;
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "b",
						access: ACCESS_READ$2
					})],
					key: "HasTrackList",
					value: function() {
						return this._HasTrackList;
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "s",
						access: ACCESS_READ$2
					})],
					key: "Identity",
					value: function() {
						return this._Identity;
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "s",
						access: ACCESS_READ$2
					})],
					key: "DesktopEntry",
					value: function() {
						return this._DesktopEntry;
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "as",
						access: ACCESS_READ$2
					})],
					key: "SupportedUriSchemes",
					value: function() {
						return this._SupportedUriSchemes;
					}
				},
				{
					kind: "get",
					decorators: [property$2({
						signature: "as",
						access: ACCESS_READ$2
					})],
					key: "SupportedMimeTypes",
					value: function() {
						return this._SupportedMimeTypes;
					}
				},
				{
					kind: "method",
					decorators: [method$2({})],
					key: "Raise",
					value: function Raise() {
						this.player.emit("raise");
					}
				},
				{
					kind: "method",
					decorators: [method$2({})],
					key: "Quit",
					value: function Quit() {
						this.player.emit("quit");
					}
				}
			]
		};
	}, MprisInterface$2);
}));
var require_playlists = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _decorate$1(e, r, t$1, i) {
		var o = _getDecoratorsApi$1();
		if (i) for (var n = 0; n < i.length; n++) o = i[n](o);
		var s = r(function(e$1) {
			o.initializeInstanceElements(e$1, a.elements);
		}, t$1), a = o.decorateClass(_coalesceClassElements$1(s.d.map(_createElementDescriptor$1)), e);
		return o.initializeClassElements(s.F, a.elements), o.runClassFinishers(s.F, a.finishers);
	}
	function _getDecoratorsApi$1() {
		_getDecoratorsApi$1 = function() {
			return e;
		};
		var e = {
			elementsDefinitionOrder: [["method"], ["field"]],
			initializeInstanceElements: function(e$1, r) {
				["method", "field"].forEach(function(t$1) {
					r.forEach(function(r$1) {
						r$1.kind === t$1 && "own" === r$1.placement && this.defineClassElement(e$1, r$1);
					}, this);
				}, this);
			},
			initializeClassElements: function(e$1, r) {
				var t$1 = e$1.prototype;
				["method", "field"].forEach(function(i) {
					r.forEach(function(r$1) {
						var o = r$1.placement;
						if (r$1.kind === i && ("static" === o || "prototype" === o)) {
							var n = "static" === o ? e$1 : t$1;
							this.defineClassElement(n, r$1);
						}
					}, this);
				}, this);
			},
			defineClassElement: function(e$1, r) {
				var t$1 = r.descriptor;
				if ("field" === r.kind) {
					var i = r.initializer;
					t$1 = {
						enumerable: t$1.enumerable,
						writable: t$1.writable,
						configurable: t$1.configurable,
						value: void 0 === i ? void 0 : i.call(e$1)
					};
				}
				Object.defineProperty(e$1, r.key, t$1);
			},
			decorateClass: function(e$1, r) {
				var t$1 = [], i = [], o = {
					static: [],
					prototype: [],
					own: []
				};
				if (e$1.forEach(function(e$2) {
					this.addElementPlacement(e$2, o);
				}, this), e$1.forEach(function(e$2) {
					if (!_hasDecorators$1(e$2)) return t$1.push(e$2);
					var r$1 = this.decorateElement(e$2, o);
					t$1.push(r$1.element), t$1.push.apply(t$1, r$1.extras), i.push.apply(i, r$1.finishers);
				}, this), !r) return {
					elements: t$1,
					finishers: i
				};
				var n = this.decorateConstructor(t$1, r);
				return i.push.apply(i, n.finishers), n.finishers = i, n;
			},
			addElementPlacement: function(e$1, r, t$1) {
				var i = r[e$1.placement];
				if (!t$1 && -1 !== i.indexOf(e$1.key)) throw new TypeError("Duplicated element (" + e$1.key + ")");
				i.push(e$1.key);
			},
			decorateElement: function(e$1, r) {
				for (var t$1 = [], i = [], o = e$1.decorators, n = o.length - 1; n >= 0; n--) {
					var s = r[e$1.placement];
					s.splice(s.indexOf(e$1.key), 1);
					var a = this.fromElementDescriptor(e$1), l = this.toElementFinisherExtras((0, o[n])(a) || a);
					e$1 = l.element, this.addElementPlacement(e$1, r), l.finisher && i.push(l.finisher);
					var c = l.extras;
					if (c) {
						for (var p = 0; p < c.length; p++) this.addElementPlacement(c[p], r);
						t$1.push.apply(t$1, c);
					}
				}
				return {
					element: e$1,
					finishers: i,
					extras: t$1
				};
			},
			decorateConstructor: function(e$1, r) {
				for (var t$1 = [], i = r.length - 1; i >= 0; i--) {
					var o = this.fromClassDescriptor(e$1), n = this.toClassDescriptor((0, r[i])(o) || o);
					if (void 0 !== n.finisher && t$1.push(n.finisher), void 0 !== n.elements) {
						e$1 = n.elements;
						for (var s = 0; s < e$1.length - 1; s++) for (var a = s + 1; a < e$1.length; a++) if (e$1[s].key === e$1[a].key && e$1[s].placement === e$1[a].placement) throw new TypeError("Duplicated element (" + e$1[s].key + ")");
					}
				}
				return {
					elements: e$1,
					finishers: t$1
				};
			},
			fromElementDescriptor: function(e$1) {
				var r = {
					kind: e$1.kind,
					key: e$1.key,
					placement: e$1.placement,
					descriptor: e$1.descriptor
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), "field" === e$1.kind && (r.initializer = e$1.initializer), r;
			},
			toElementDescriptors: function(e$1) {
				if (void 0 !== e$1) return _toArray$1(e$1).map(function(e$2) {
					var r = this.toElementDescriptor(e$2);
					return this.disallowProperty(e$2, "finisher", "An element descriptor"), this.disallowProperty(e$2, "extras", "An element descriptor"), r;
				}, this);
			},
			toElementDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("method" !== r && "field" !== r) throw new TypeError("An element descriptor's .kind property must be either \"method\" or \"field\", but a decorator created an element descriptor with .kind \"" + r + "\"");
				var t$1 = _toPropertyKey$2(e$1.key), i = e$1.placement + "";
				if ("static" !== i && "prototype" !== i && "own" !== i) throw new TypeError("An element descriptor's .placement property must be one of \"static\", \"prototype\" or \"own\", but a decorator created an element descriptor with .placement \"" + i + "\"");
				var o = e$1.descriptor;
				this.disallowProperty(e$1, "elements", "An element descriptor");
				var n = {
					kind: r,
					key: t$1,
					placement: i,
					descriptor: Object.assign({}, o)
				};
				return "field" !== r ? this.disallowProperty(e$1, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), n.initializer = e$1.initializer), n;
			},
			toElementFinisherExtras: function(e$1) {
				return {
					element: this.toElementDescriptor(e$1),
					finisher: _optionalCallableProperty$1(e$1, "finisher"),
					extras: this.toElementDescriptors(e$1.extras)
				};
			},
			fromClassDescriptor: function(e$1) {
				var r = {
					kind: "class",
					elements: e$1.map(this.fromElementDescriptor, this)
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), r;
			},
			toClassDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("class" !== r) throw new TypeError("A class descriptor's .kind property must be \"class\", but a decorator created a class descriptor with .kind \"" + r + "\"");
				this.disallowProperty(e$1, "key", "A class descriptor"), this.disallowProperty(e$1, "placement", "A class descriptor"), this.disallowProperty(e$1, "descriptor", "A class descriptor"), this.disallowProperty(e$1, "initializer", "A class descriptor"), this.disallowProperty(e$1, "extras", "A class descriptor");
				var t$1 = _optionalCallableProperty$1(e$1, "finisher");
				return {
					elements: this.toElementDescriptors(e$1.elements),
					finisher: t$1
				};
			},
			runClassFinishers: function(e$1, r) {
				for (var t$1 = 0; t$1 < r.length; t$1++) {
					var i = (0, r[t$1])(e$1);
					if (void 0 !== i) {
						if ("function" != typeof i) throw new TypeError("Finishers must return a constructor.");
						e$1 = i;
					}
				}
				return e$1;
			},
			disallowProperty: function(e$1, r, t$1) {
				if (void 0 !== e$1[r]) throw new TypeError(t$1 + " can't have a ." + r + " property.");
			}
		};
		return e;
	}
	function _createElementDescriptor$1(e) {
		var r, t$1 = _toPropertyKey$2(e.key);
		"method" === e.kind ? r = {
			value: e.value,
			writable: !0,
			configurable: !0,
			enumerable: !1
		} : "get" === e.kind ? r = {
			get: e.value,
			configurable: !0,
			enumerable: !1
		} : "set" === e.kind ? r = {
			set: e.value,
			configurable: !0,
			enumerable: !1
		} : "field" === e.kind && (r = {
			configurable: !0,
			writable: !0,
			enumerable: !0
		});
		var i = {
			kind: "field" === e.kind ? "field" : "method",
			key: t$1,
			placement: e.static ? "static" : "field" === e.kind ? "own" : "prototype",
			descriptor: r
		};
		return e.decorators && (i.decorators = e.decorators), "field" === e.kind && (i.initializer = e.value), i;
	}
	function _coalesceGetterSetter$1(e, r) {
		void 0 !== e.descriptor.get ? r.descriptor.get = e.descriptor.get : r.descriptor.set = e.descriptor.set;
	}
	function _coalesceClassElements$1(e) {
		for (var r = [], isSameElement = function(e$1) {
			return "method" === e$1.kind && e$1.key === o.key && e$1.placement === o.placement;
		}, t$1 = 0; t$1 < e.length; t$1++) {
			var i, o = e[t$1];
			if ("method" === o.kind && (i = r.find(isSameElement))) if (_isDataDescriptor$1(o.descriptor) || _isDataDescriptor$1(i.descriptor)) {
				if (_hasDecorators$1(o) || _hasDecorators$1(i)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated.");
				i.descriptor = o.descriptor;
			} else {
				if (_hasDecorators$1(o)) {
					if (_hasDecorators$1(i)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ").");
					i.decorators = o.decorators;
				}
				_coalesceGetterSetter$1(o, i);
			}
			else r.push(o);
		}
		return r;
	}
	function _hasDecorators$1(e) {
		return e.decorators && e.decorators.length;
	}
	function _isDataDescriptor$1(e) {
		return void 0 !== e && !(void 0 === e.value && void 0 === e.writable);
	}
	function _optionalCallableProperty$1(e, r) {
		var t$1 = e[r];
		if (void 0 !== t$1 && "function" != typeof t$1) throw new TypeError("Expected '" + r + "' to be a function");
		return t$1;
	}
	function _toPropertyKey$2(t$1) {
		var i = _toPrimitive$2(t$1, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive$2(t$1, r) {
		if ("object" != typeof t$1 || !t$1) return t$1;
		var e = t$1[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t$1, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t$1);
	}
	function _toArray$1(r) {
		return _arrayWithHoles$1(r) || _iterableToArray$1(r) || _unsupportedIterableToArray$1(r) || _nonIterableRest$1();
	}
	function _nonIterableRest$1() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray$1(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
			var t$1 = {}.toString.call(r).slice(8, -1);
			return "Object" === t$1 && r.constructor && (t$1 = r.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray$1(r, a) : void 0;
		}
	}
	function _arrayLikeToArray$1(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	function _iterableToArray$1(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	function _arrayWithHoles$1(r) {
		if (Array.isArray(r)) return r;
	}
	var MprisInterface$1 = require_mpris_interface();
	var dbus$2 = require_dbus_next();
	var types$2 = require_types();
	var { property: property$1, method: method$1, signal: signal$1, ACCESS_READ: ACCESS_READ$1 } = dbus$2.interface;
	module.exports = _decorate$1(null, function(_initialize, _MprisInterface) {
		class PlaylistsInterface$2 extends _MprisInterface {
			constructor(player) {
				super("org.mpris.MediaPlayer2.Playlists", player);
				_initialize(this);
			}
		}
		return {
			F: PlaylistsInterface$2,
			d: [
				{
					kind: "field",
					key: "_ActivePlaylist",
					value() {
						return [false, types$2.emptyPlaylist];
					}
				},
				{
					kind: "field",
					key: "_PlaylistCount",
					value() {
						return 0;
					}
				},
				{
					kind: "get",
					decorators: [property$1({
						signature: "u",
						access: ACCESS_READ$1
					})],
					key: "PlaylistCount",
					value: function() {
						return this._PlaylistCount;
					}
				},
				{
					kind: "get",
					decorators: [property$1({
						signature: "as",
						access: ACCESS_READ$1
					})],
					key: "Orderings",
					value: function() {
						return ["Alphabetical", "UserDefined"];
					}
				},
				{
					kind: "get",
					decorators: [property$1({
						signature: "(b(oss))",
						access: ACCESS_READ$1
					})],
					key: "ActivePlaylist",
					value: function() {
						return this._ActivePlaylist;
					}
				},
				{
					kind: "method",
					key: "setActivePlaylistId",
					value: function setActivePlaylistId(playlistId) {
						let i = this.player.getPlaylistIndex(playlistId);
						this.setProperty("ActivePlaylist", this.player.playlists[i] || null);
					}
				},
				{
					kind: "method",
					decorators: [method$1({ inSignature: "o" })],
					key: "ActivatePlaylist",
					value: function ActivatePlaylist(playlistId) {
						this.player.emit("activatePlaylist", playlistId);
					}
				},
				{
					kind: "method",
					decorators: [method$1({
						inSignature: "uusb",
						outSignature: "a(oss)"
					})],
					key: "GetPlaylists",
					value: function GetPlaylists(index, maxCount, order, reverseOrder) {
						if (!this.player.playlists) return [];
						let result = this.player.playlists.sort(function(a, b) {
							let ret = 1;
							switch (order) {
								case "Alphabetical":
									ret = a.Name > b.Name ? 1 : -1;
									break;
								case "UserDefined": break;
							}
							return ret;
						}).slice(index, maxCount + index).map(types$2.playlistToDbus);
						if (reverseOrder) result.reverse();
						return result;
					}
				},
				{
					kind: "method",
					decorators: [signal$1({ signature: "(oss)" })],
					key: "PlaylistChanged",
					value: function PlaylistChanged(playlist) {
						return types$2.playlistToDbus(playlist);
					}
				}
			]
		};
	}, MprisInterface$1);
}));
var require_tracklist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _decorate(e, r, t$1, i) {
		var o = _getDecoratorsApi();
		if (i) for (var n = 0; n < i.length; n++) o = i[n](o);
		var s = r(function(e$1) {
			o.initializeInstanceElements(e$1, a.elements);
		}, t$1), a = o.decorateClass(_coalesceClassElements(s.d.map(_createElementDescriptor)), e);
		return o.initializeClassElements(s.F, a.elements), o.runClassFinishers(s.F, a.finishers);
	}
	function _getDecoratorsApi() {
		_getDecoratorsApi = function() {
			return e;
		};
		var e = {
			elementsDefinitionOrder: [["method"], ["field"]],
			initializeInstanceElements: function(e$1, r) {
				["method", "field"].forEach(function(t$1) {
					r.forEach(function(r$1) {
						r$1.kind === t$1 && "own" === r$1.placement && this.defineClassElement(e$1, r$1);
					}, this);
				}, this);
			},
			initializeClassElements: function(e$1, r) {
				var t$1 = e$1.prototype;
				["method", "field"].forEach(function(i) {
					r.forEach(function(r$1) {
						var o = r$1.placement;
						if (r$1.kind === i && ("static" === o || "prototype" === o)) {
							var n = "static" === o ? e$1 : t$1;
							this.defineClassElement(n, r$1);
						}
					}, this);
				}, this);
			},
			defineClassElement: function(e$1, r) {
				var t$1 = r.descriptor;
				if ("field" === r.kind) {
					var i = r.initializer;
					t$1 = {
						enumerable: t$1.enumerable,
						writable: t$1.writable,
						configurable: t$1.configurable,
						value: void 0 === i ? void 0 : i.call(e$1)
					};
				}
				Object.defineProperty(e$1, r.key, t$1);
			},
			decorateClass: function(e$1, r) {
				var t$1 = [], i = [], o = {
					static: [],
					prototype: [],
					own: []
				};
				if (e$1.forEach(function(e$2) {
					this.addElementPlacement(e$2, o);
				}, this), e$1.forEach(function(e$2) {
					if (!_hasDecorators(e$2)) return t$1.push(e$2);
					var r$1 = this.decorateElement(e$2, o);
					t$1.push(r$1.element), t$1.push.apply(t$1, r$1.extras), i.push.apply(i, r$1.finishers);
				}, this), !r) return {
					elements: t$1,
					finishers: i
				};
				var n = this.decorateConstructor(t$1, r);
				return i.push.apply(i, n.finishers), n.finishers = i, n;
			},
			addElementPlacement: function(e$1, r, t$1) {
				var i = r[e$1.placement];
				if (!t$1 && -1 !== i.indexOf(e$1.key)) throw new TypeError("Duplicated element (" + e$1.key + ")");
				i.push(e$1.key);
			},
			decorateElement: function(e$1, r) {
				for (var t$1 = [], i = [], o = e$1.decorators, n = o.length - 1; n >= 0; n--) {
					var s = r[e$1.placement];
					s.splice(s.indexOf(e$1.key), 1);
					var a = this.fromElementDescriptor(e$1), l = this.toElementFinisherExtras((0, o[n])(a) || a);
					e$1 = l.element, this.addElementPlacement(e$1, r), l.finisher && i.push(l.finisher);
					var c = l.extras;
					if (c) {
						for (var p = 0; p < c.length; p++) this.addElementPlacement(c[p], r);
						t$1.push.apply(t$1, c);
					}
				}
				return {
					element: e$1,
					finishers: i,
					extras: t$1
				};
			},
			decorateConstructor: function(e$1, r) {
				for (var t$1 = [], i = r.length - 1; i >= 0; i--) {
					var o = this.fromClassDescriptor(e$1), n = this.toClassDescriptor((0, r[i])(o) || o);
					if (void 0 !== n.finisher && t$1.push(n.finisher), void 0 !== n.elements) {
						e$1 = n.elements;
						for (var s = 0; s < e$1.length - 1; s++) for (var a = s + 1; a < e$1.length; a++) if (e$1[s].key === e$1[a].key && e$1[s].placement === e$1[a].placement) throw new TypeError("Duplicated element (" + e$1[s].key + ")");
					}
				}
				return {
					elements: e$1,
					finishers: t$1
				};
			},
			fromElementDescriptor: function(e$1) {
				var r = {
					kind: e$1.kind,
					key: e$1.key,
					placement: e$1.placement,
					descriptor: e$1.descriptor
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), "field" === e$1.kind && (r.initializer = e$1.initializer), r;
			},
			toElementDescriptors: function(e$1) {
				if (void 0 !== e$1) return _toArray(e$1).map(function(e$2) {
					var r = this.toElementDescriptor(e$2);
					return this.disallowProperty(e$2, "finisher", "An element descriptor"), this.disallowProperty(e$2, "extras", "An element descriptor"), r;
				}, this);
			},
			toElementDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("method" !== r && "field" !== r) throw new TypeError("An element descriptor's .kind property must be either \"method\" or \"field\", but a decorator created an element descriptor with .kind \"" + r + "\"");
				var t$1 = _toPropertyKey$1(e$1.key), i = e$1.placement + "";
				if ("static" !== i && "prototype" !== i && "own" !== i) throw new TypeError("An element descriptor's .placement property must be one of \"static\", \"prototype\" or \"own\", but a decorator created an element descriptor with .placement \"" + i + "\"");
				var o = e$1.descriptor;
				this.disallowProperty(e$1, "elements", "An element descriptor");
				var n = {
					kind: r,
					key: t$1,
					placement: i,
					descriptor: Object.assign({}, o)
				};
				return "field" !== r ? this.disallowProperty(e$1, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), n.initializer = e$1.initializer), n;
			},
			toElementFinisherExtras: function(e$1) {
				return {
					element: this.toElementDescriptor(e$1),
					finisher: _optionalCallableProperty(e$1, "finisher"),
					extras: this.toElementDescriptors(e$1.extras)
				};
			},
			fromClassDescriptor: function(e$1) {
				var r = {
					kind: "class",
					elements: e$1.map(this.fromElementDescriptor, this)
				};
				return Object.defineProperty(r, Symbol.toStringTag, {
					value: "Descriptor",
					configurable: !0
				}), r;
			},
			toClassDescriptor: function(e$1) {
				var r = e$1.kind + "";
				if ("class" !== r) throw new TypeError("A class descriptor's .kind property must be \"class\", but a decorator created a class descriptor with .kind \"" + r + "\"");
				this.disallowProperty(e$1, "key", "A class descriptor"), this.disallowProperty(e$1, "placement", "A class descriptor"), this.disallowProperty(e$1, "descriptor", "A class descriptor"), this.disallowProperty(e$1, "initializer", "A class descriptor"), this.disallowProperty(e$1, "extras", "A class descriptor");
				var t$1 = _optionalCallableProperty(e$1, "finisher");
				return {
					elements: this.toElementDescriptors(e$1.elements),
					finisher: t$1
				};
			},
			runClassFinishers: function(e$1, r) {
				for (var t$1 = 0; t$1 < r.length; t$1++) {
					var i = (0, r[t$1])(e$1);
					if (void 0 !== i) {
						if ("function" != typeof i) throw new TypeError("Finishers must return a constructor.");
						e$1 = i;
					}
				}
				return e$1;
			},
			disallowProperty: function(e$1, r, t$1) {
				if (void 0 !== e$1[r]) throw new TypeError(t$1 + " can't have a ." + r + " property.");
			}
		};
		return e;
	}
	function _createElementDescriptor(e) {
		var r, t$1 = _toPropertyKey$1(e.key);
		"method" === e.kind ? r = {
			value: e.value,
			writable: !0,
			configurable: !0,
			enumerable: !1
		} : "get" === e.kind ? r = {
			get: e.value,
			configurable: !0,
			enumerable: !1
		} : "set" === e.kind ? r = {
			set: e.value,
			configurable: !0,
			enumerable: !1
		} : "field" === e.kind && (r = {
			configurable: !0,
			writable: !0,
			enumerable: !0
		});
		var i = {
			kind: "field" === e.kind ? "field" : "method",
			key: t$1,
			placement: e.static ? "static" : "field" === e.kind ? "own" : "prototype",
			descriptor: r
		};
		return e.decorators && (i.decorators = e.decorators), "field" === e.kind && (i.initializer = e.value), i;
	}
	function _coalesceGetterSetter(e, r) {
		void 0 !== e.descriptor.get ? r.descriptor.get = e.descriptor.get : r.descriptor.set = e.descriptor.set;
	}
	function _coalesceClassElements(e) {
		for (var r = [], isSameElement = function(e$1) {
			return "method" === e$1.kind && e$1.key === o.key && e$1.placement === o.placement;
		}, t$1 = 0; t$1 < e.length; t$1++) {
			var i, o = e[t$1];
			if ("method" === o.kind && (i = r.find(isSameElement))) if (_isDataDescriptor(o.descriptor) || _isDataDescriptor(i.descriptor)) {
				if (_hasDecorators(o) || _hasDecorators(i)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated.");
				i.descriptor = o.descriptor;
			} else {
				if (_hasDecorators(o)) {
					if (_hasDecorators(i)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ").");
					i.decorators = o.decorators;
				}
				_coalesceGetterSetter(o, i);
			}
			else r.push(o);
		}
		return r;
	}
	function _hasDecorators(e) {
		return e.decorators && e.decorators.length;
	}
	function _isDataDescriptor(e) {
		return void 0 !== e && !(void 0 === e.value && void 0 === e.writable);
	}
	function _optionalCallableProperty(e, r) {
		var t$1 = e[r];
		if (void 0 !== t$1 && "function" != typeof t$1) throw new TypeError("Expected '" + r + "' to be a function");
		return t$1;
	}
	function _toPropertyKey$1(t$1) {
		var i = _toPrimitive$1(t$1, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive$1(t$1, r) {
		if ("object" != typeof t$1 || !t$1) return t$1;
		var e = t$1[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t$1, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t$1);
	}
	function _toArray(r) {
		return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest();
	}
	function _nonIterableRest() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray(r, a);
			var t$1 = {}.toString.call(r).slice(8, -1);
			return "Object" === t$1 && r.constructor && (t$1 = r.constructor.name), "Map" === t$1 || "Set" === t$1 ? Array.from(r) : "Arguments" === t$1 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t$1) ? _arrayLikeToArray(r, a) : void 0;
		}
	}
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	function _iterableToArray(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	function _arrayWithHoles(r) {
		if (Array.isArray(r)) return r;
	}
	var MprisInterface = require_mpris_interface();
	var dbus$1 = require_dbus_next();
	var types$1 = require_types();
	var { property, method, signal, ACCESS_READ } = dbus$1.interface;
	module.exports = _decorate(null, function(_initialize, _MprisInterface) {
		class TracklistInterface$2 extends _MprisInterface {
			constructor(player) {
				super("org.mpris.MediaPlayer2.TrackList", player);
				_initialize(this);
			}
		}
		return {
			F: TracklistInterface$2,
			d: [
				{
					kind: "field",
					key: "_Tracks",
					value() {
						return [];
					}
				},
				{
					kind: "field",
					key: "_CanEditTracks",
					value() {
						return false;
					}
				},
				{
					kind: "method",
					key: "setTracks",
					value: function setTracks(tracksPlain) {
						this.setProperty("Tracks", tracksPlain);
					}
				},
				{
					kind: "get",
					decorators: [property({
						signature: "ao",
						access: ACCESS_READ
					})],
					key: "Tracks",
					value: function() {
						return this._Tracks;
					}
				},
				{
					kind: "get",
					decorators: [property({
						signature: "b",
						access: ACCESS_READ
					})],
					key: "CanEditTracks",
					value: function() {
						return this._CanEditTracks;
					}
				},
				{
					kind: "method",
					decorators: [method({
						inSignature: "ao",
						outSignature: "aa{sv}"
					})],
					key: "GetTracksMetadata",
					value: function GetTracksMetadata(trackIds) {
						return this.player.tracks.filter((t$1) => {
							return trackIds.some((id) => id === t$1["mpris:trackid"]);
						}).map(types$1.metadataToDbus);
					}
				},
				{
					kind: "method",
					decorators: [method({ inSignature: "sob" })],
					key: "AddTrack",
					value: function AddTrack(uri, afterTrack, setAsCurrent) {
						this.player.emit("addTrack", {
							uri,
							afterTrack,
							setAsCurrent
						});
					}
				},
				{
					kind: "method",
					decorators: [method({ inSignature: "o" })],
					key: "RemoveTrack",
					value: function RemoveTrack(trackId) {
						this.player.emit("removeTrack", trackId);
					}
				},
				{
					kind: "method",
					decorators: [method({ inSignature: "o" })],
					key: "GoTo",
					value: function GoTo(trackId) {
						this.player.emit("goTo", trackId);
					}
				},
				{
					kind: "method",
					decorators: [signal({ signature: "aoo" })],
					key: "TrackListReplaced",
					value: function TrackListReplaced(replacedPlain) {
						this.setTracks(replacedPlain);
						return [this._Tracks, "/org/mpris/MediaPlayer2/TrackList/NoTrack"];
					}
				},
				{
					kind: "method",
					decorators: [signal({ signature: "a{sv}" })],
					key: "TrackAdded",
					value: function TrackAdded(metadata) {
						return types$1.metadataToDbus(metadata);
					}
				},
				{
					kind: "method",
					decorators: [signal({ signature: "o" })],
					key: "TrackRemoved",
					value: function TrackRemoved(path$3) {
						return path$3;
					}
				},
				{
					kind: "method",
					decorators: [signal({ signature: "oa{sv}" })],
					key: "TrackMetadataChanged",
					value: function TrackMetadataChanged(path$3, metadata) {
						return [path$3, types$1.metadataToDbus(metadata)];
					}
				}
			]
		};
	}, MprisInterface);
}));
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _defineProperty(e, r, t$1) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t$1,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t$1, e;
	}
	function _toPropertyKey(t$1) {
		var i = _toPrimitive(t$1, "string");
		return "symbol" == typeof i ? i : i + "";
	}
	function _toPrimitive(t$1, r) {
		if ("object" != typeof t$1 || !t$1) return t$1;
		var e = t$1[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t$1, r || "default");
			if ("object" != typeof i) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t$1);
	}
	function _classPrivateMethodInitSpec(e, a) {
		_checkPrivateRedeclaration(e, a), a.add(e);
	}
	function _checkPrivateRedeclaration(e, t$1) {
		if (t$1.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
	}
	function _assertClassBrand(e, t$1, n) {
		if ("function" == typeof e ? e === t$1 : e.has(t$1)) return arguments.length < 3 ? t$1 : n;
		throw new TypeError("Private element is not present on this object");
	}
	require_source_map_support().install();
	var { EventEmitter } = __require("events");
	var dbus = require_dbus_next();
	var PlayerInterface = require_player();
	var RootInterface = require_root();
	var PlaylistsInterface = require_playlists();
	var TracklistInterface = require_tracklist();
	var types = require_types();
	var constants = require_constants();
	var MPRIS_PATH = "/org/mpris/MediaPlayer2";
	function lcfirst(str) {
		return str[0].toLowerCase() + str.substring(1);
	}
	var _Player_brand = /* @__PURE__ */ new WeakSet();
	var Player = class extends EventEmitter {
		constructor(options) {
			super();
			_classPrivateMethodInitSpec(this, _Player_brand);
			this.name = options.name;
			this.supportedInterfaces = options.supportedInterfaces || ["player"];
			this._tracks = [];
			this.init(options);
		}
		init(opts) {
			this.serviceName = `org.mpris.MediaPlayer2.${this.name}`;
			dbus.validators.assertBusNameValid(this.serviceName);
			this._bus = dbus.sessionBus();
			this._bus.on("error", (err) => {
				this.emit("error", err);
			});
			this.interfaces = {};
			_assertClassBrand(_Player_brand, this, _addRootInterface).call(this, this._bus, opts);
			if (this.supportedInterfaces.indexOf("player") >= 0) _assertClassBrand(_Player_brand, this, _addPlayerInterface).call(this, this._bus);
			if (this.supportedInterfaces.indexOf("trackList") >= 0) _assertClassBrand(_Player_brand, this, _addTracklistInterface).call(this, this._bus);
			if (this.supportedInterfaces.indexOf("playlists") >= 0) _assertClassBrand(_Player_brand, this, _addPlaylistsInterface).call(this, this._bus);
			for (let k of Object.keys(this.interfaces)) {
				let iface$1 = this.interfaces[k];
				this._bus.export(MPRIS_PATH, iface$1);
			}
			this._bus.requestName(this.serviceName, dbus.NameFlag.DO_NOT_QUEUE).then((reply) => {
				if (reply === dbus.RequestNameReply.EXISTS) {
					this.serviceName = `${this.serviceName}.instance${process.pid}`;
					return this._bus.requestName(this.serviceName);
				}
			}).catch((err) => {
				this.emit("error", err);
			});
		}
		objectPath(subpath) {
			let path$3 = `/org/node/mediaplayer/${this.name}`;
			if (subpath) path$3 += `/${subpath}`;
			return path$3;
		}
		getPosition() {
			return 0;
		}
		seeked(position) {
			let seekTo = Math.floor(position || 0);
			if (isNaN(seekTo)) throw new Error(`seeked expected a number (got ${position})`);
			this.interfaces.player.Seeked(seekTo);
		}
		getTrackIndex(trackId) {
			for (let i = 0; i < this.tracks.length; i++) if (this.tracks[i]["mpris:trackid"] === trackId) return i;
			return -1;
		}
		getTrack(trackId) {
			return this.tracks[this.getTrackIndex(trackId)];
		}
		addTrack(track) {
			this.tracks.push(track);
			this.interfaces.tracklist.setTracks(this.tracks);
			let afterTrack = "/org/mpris/MediaPlayer2/TrackList/NoTrack";
			if (this.tracks.length > 2) afterTrack = this.tracks[this.tracks.length - 2]["mpris:trackid"];
			this.interfaces.tracklist.TrackAdded(afterTrack);
		}
		removeTrack(trackId) {
			let i = this.getTrackIndex(trackId);
			this.tracks.splice(i, 1);
			this.interfaces.tracklist.setTracks(this.tracks);
			this.interfaces.tracklist.TrackRemoved(trackId);
		}
		getPlaylistIndex(playlistId) {
			for (let i = 0; i < this.playlists.length; i++) if (this.playlists[i].Id === playlistId) return i;
			return -1;
		}
		setPlaylists(playlists) {
			this.playlists = playlists;
			this.playlistCount = playlists.length;
			this.playlists.forEach((playlist) => {
				if (playlist) this.interfaces.playlists.PlaylistChanged(playlist);
			});
		}
		setActivePlaylist(playlistId) {
			this.interfaces.playlists.setActivePlaylistId(playlistId);
		}
	};
	function _addRootInterface(bus, opts) {
		this.interfaces.root = new RootInterface(this, opts);
		_assertClassBrand(_Player_brand, this, _addEventedPropertiesList).call(this, this.interfaces.root, [
			"Identity",
			"Fullscreen",
			"SupportedUriSchemes",
			"SupportedMimeTypes",
			"CanQuit",
			"CanRaise",
			"CanSetFullscreen",
			"HasTrackList",
			"DesktopEntry"
		]);
	}
	function _addPlayerInterface(bus) {
		this.interfaces.player = new PlayerInterface(this);
		_assertClassBrand(_Player_brand, this, _addEventedPropertiesList).call(this, this.interfaces.player, [
			"PlaybackStatus",
			"LoopStatus",
			"Rate",
			"Shuffle",
			"Metadata",
			"Volume",
			"CanControl",
			"CanPause",
			"CanPlay",
			"CanSeek",
			"CanGoNext",
			"CanGoPrevious",
			"MinimumRate",
			"MaximumRate"
		]);
	}
	function _addTracklistInterface(bus) {
		this.interfaces.tracklist = new TracklistInterface(this);
		_assertClassBrand(_Player_brand, this, _addEventedPropertiesList).call(this, this.interfaces.tracklist, ["CanEditTracks"]);
		Object.defineProperty(this, "tracks", {
			get: function() {
				return this._tracks;
			},
			set: function(value) {
				this._tracks = value;
				this.interfaces.tracklist.TrackListReplaced(value);
			},
			enumerable: true,
			configurable: true
		});
	}
	function _addPlaylistsInterface(bus) {
		this.interfaces.playlists = new PlaylistsInterface(this);
		_assertClassBrand(_Player_brand, this, _addEventedPropertiesList).call(this, this.interfaces.playlists, ["PlaylistCount", "ActivePlaylist"]);
	}
	function _addEventedProperty(iface$1, name) {
		let localName = lcfirst(name);
		Object.defineProperty(this, localName, {
			get: function() {
				let value = iface$1[name];
				if (name === "ActivePlaylist") return types.playlistToPlain(value);
				else if (name === "Metadata") return types.metadataToPlain(value);
				return value;
			},
			set: function(value) {
				iface$1.setProperty(name, value);
			},
			enumerable: true,
			configurable: true
		});
	}
	function _addEventedPropertiesList(iface$1, props) {
		for (let i = 0; i < props.length; i++) _assertClassBrand(_Player_brand, this, _addEventedProperty).call(this, iface$1, props[i]);
	}
	_defineProperty(Player, "PLAYBACK_STATUS_PLAYING", constants.PLAYBACK_STATUS_PLAYING);
	_defineProperty(Player, "PLAYBACK_STATUS_PAUSED", constants.PLAYBACK_STATUS_PAUSED);
	_defineProperty(Player, "PLAYBACK_STATUS_STOPPED", constants.PLAYBACK_STATUS_STOPPED);
	_defineProperty(Player, "LOOP_STATUS_NONE", constants.LOOP_STATUS_NONE);
	_defineProperty(Player, "LOOP_STATUS_TRACK", constants.LOOP_STATUS_TRACK);
	_defineProperty(Player, "LOOP_STATUS_PLAYLIST", constants.LOOP_STATUS_PLAYLIST);
	module.exports = Player;
}));
var import_electron_localshortcut = /* @__PURE__ */ __toESM(require_electron_localshortcut());
var import_is = /* @__PURE__ */ __toESM(require_is());
var import_dist = /* @__PURE__ */ __toESM(require_dist());
var YTPlayer = class extends import_dist.default {
	currentPosition;
	constructor(opts) {
		super(opts);
		this.currentPosition = 0;
	}
	setPosition(t$1) {
		this.currentPosition = t$1;
	}
	getPosition() {
		return this.currentPosition;
	}
	setLoopStatus(status) {
		this.loopStatus = status;
	}
	isPlaying() {
		return this.playbackStatus === import_dist.PLAYBACK_STATUS_PLAYING;
	}
	isPaused() {
		return this.playbackStatus === import_dist.PLAYBACK_STATUS_PAUSED;
	}
	isStopped() {
		return this.playbackStatus === import_dist.PLAYBACK_STATUS_STOPPED;
	}
	setPlaybackStatus(status) {
		this.playbackStatus = status;
	}
};
function setupMPRIS() {
	const instance = new YTPlayer({
		name: "PearDesktop",
		identity: "Arvoxify",
		supportedMimeTypes: ["audio/mpeg"],
		supportedInterfaces: ["player"]
	});
	instance.canRaise = true;
	instance.canQuit = false;
	instance.canUsePlayerControls = true;
	instance.supportedUriSchemes = ["http", "https"];
	instance.desktopEntry = "arvoxify";
	return instance;
}
function registerMPRIS(win) {
	const { playPause, next, previous, setVolume, shuffle, switchRepeat, setFullscreen, requestShuffleInformation, requestFullscreenInformation, requestQueueInformation } = getSongControls(win);
	try {
		let currentSongInfo = null;
		const secToMicro = (n) => Math.round(Number(n) * 1e6);
		const microToSec = (n) => Math.round(Number(n) / 1e6);
		const correctId = (videoId) => {
			return videoId.replace(/-/g, "_MINUS_");
		};
		const player = setupMPRIS();
		const seekTo = (event) => {
			if (currentSongInfo?.videoId && event.trackId.endsWith(correctId(currentSongInfo.videoId))) {
				win.webContents.send("peard:seek-to", microToSec(event.position ?? 0));
				player.setPosition(event.position ?? 0);
			}
		};
		const seekBy = (offset) => {
			win.webContents.send("peard:seek-by", microToSec(offset));
			player.setPosition(player.getPosition() + offset);
		};
		ipcMain.on("peard:player-api-loaded", () => {
			win.webContents.send("peard:setup-seeked-listener", "mpris");
			win.webContents.send("peard:setup-time-changed-listener", "mpris");
			win.webContents.send("peard:setup-repeat-changed-listener", "mpris");
			win.webContents.send("peard:setup-volume-changed-listener", "mpris");
			win.webContents.send("peard:setup-shuffle-changed-listener", "mpris");
			win.webContents.send("peard:setup-fullscreen-changed-listener", "mpris");
			win.webContents.send("peard:setup-autoplay-changed-listener", "mpris");
			requestShuffleInformation();
			requestFullscreenInformation();
			requestQueueInformation();
		});
		ipcMain.on("peard:seeked", (_, t$1) => {
			player.setPosition(secToMicro(t$1));
			player.seeked(secToMicro(t$1));
		});
		ipcMain.on("peard:repeat-changed", (_, mode) => {
			switch (mode) {
				case "NONE":
					player.setLoopStatus(import_dist.LOOP_STATUS_NONE);
					break;
				case "ONE":
					player.setLoopStatus(import_dist.LOOP_STATUS_TRACK);
					break;
				case "ALL":
					player.setLoopStatus(import_dist.LOOP_STATUS_PLAYLIST);
					break;
			}
			requestQueueInformation();
		});
		ipcMain.on("peard:shuffle-changed", (_, shuffleEnabled) => {
			if (player.shuffle === void 0 || !player.canUsePlayerControls) return;
			player.shuffle = shuffleEnabled ?? !player.shuffle;
		});
		ipcMain.on("peard:fullscreen-changed", (_, changedTo) => {
			if (player.fullscreen === void 0 || !player.canUsePlayerControls) return;
			player.fullscreen = changedTo !== void 0 ? changedTo : !player.fullscreen;
		});
		ipcMain.on("peard:set-fullscreen", (_, isFullscreen) => {
			if (!player.canUsePlayerControls || isFullscreen === void 0) return;
			player.fullscreen = isFullscreen;
		});
		ipcMain.on("peard:fullscreen-changed-supported", (_, isFullscreenSupported) => {
			player.canUsePlayerControls = isFullscreenSupported;
		});
		ipcMain.on("peard:autoplay-changed", (_) => {
			requestQueueInformation();
		});
		ipcMain.on("peard:get-queue-response", (_, queue) => {
			if (!queue) return;
			const currentPosition = queue.items?.findIndex((it) => it?.playlistPanelVideoRenderer?.selected || it?.playlistPanelVideoWrapperRenderer?.primaryRenderer?.playlistPanelVideoRenderer?.selected) ?? 0;
			player.canGoPrevious = currentPosition !== 0;
			let hasNext;
			if (queue.autoPlaying) hasNext = true;
			else if (player.loopStatus === import_dist.LOOP_STATUS_PLAYLIST) hasNext = true;
			else hasNext = !!(currentPosition - (queue?.items?.length ?? -1));
			player.canGoNext = hasNext;
		});
		player.on("loopStatus", (status) => {
			const switches = [
				import_dist.LOOP_STATUS_NONE,
				import_dist.LOOP_STATUS_PLAYLIST,
				import_dist.LOOP_STATUS_TRACK
			];
			const currentIndex = switches.indexOf(player.loopStatus);
			const delta = (switches.indexOf(status) - currentIndex + 3) % 3;
			switchRepeat(delta);
		});
		player.on("raise", () => {
			if (!player.canRaise) return;
			win.setSkipTaskbar(false);
			win.show();
		});
		player.on("fullscreen", (fullscreenEnabled) => {
			setFullscreen(fullscreenEnabled);
		});
		player.on("play", () => {
			if (!player.isPlaying()) {
				player.setPlaybackStatus(import_dist.PLAYBACK_STATUS_PLAYING);
				playPause();
			}
		});
		player.on("pause", () => {
			if (!player.isPaused()) {
				player.setPlaybackStatus(import_dist.PLAYBACK_STATUS_PAUSED);
				playPause();
			}
		});
		player.on("playpause", () => {
			player.setPlaybackStatus(player.isPlaying() ? import_dist.PLAYBACK_STATUS_PAUSED : import_dist.PLAYBACK_STATUS_PLAYING);
			playPause();
		});
		player.on("next", () => {
			next();
		});
		player.on("previous", () => {
			previous();
		});
		player.on("seek", seekBy);
		player.on("position", seekTo);
		player.on("shuffle", (enableShuffle) => {
			if (!player.canUsePlayerControls || enableShuffle === void 0) return;
			player.shuffle = enableShuffle;
			if (enableShuffle) {
				shuffle();
				requestQueueInformation();
			}
		});
		player.on("open", (args) => {
			win.loadURL(args.uri).then(() => {
				requestQueueInformation();
			});
		});
		player.on("error", (error) => {
			console.error(LoggerPrefix, "Error in MPRIS");
			console.trace(error);
		});
		ipcMain.on("peard:volume-changed", (_, newVolumeState) => {
			player.volume = newVolumeState.isMuted ? 0 : Number.parseFloat((newVolumeState.state / 100).toFixed(2));
		});
		player.on("volume", async (newVolume) => {
			if (await isEnabled("precise-volume")) win.webContents.send("setVolume", ~~(newVolume * 100));
			else setVolume(newVolume * 100);
		});
		registerCallback((songInfo, event) => {
			if (event === SongInfoEvent.TimeChanged) {
				player.setPosition(secToMicro(songInfo.elapsedSeconds ?? 0));
				return;
			}
			if (player) {
				const data = {
					"mpris:length": secToMicro(songInfo.songDuration),
					...songInfo.imageSrc ? { "mpris:artUrl": songInfo.imageSrc } : void 0,
					"xesam:title": songInfo.title,
					"xesam:url": songInfo.url,
					"xesam:artist": [songInfo.artist],
					"mpris:trackid": player.objectPath(`Track/${correctId(songInfo.videoId)}`)
				};
				if (songInfo.album) data["xesam:album"] = songInfo.album;
				currentSongInfo = songInfo;
				player.metadata = data;
				const currentElapsedMicroSeconds = secToMicro(songInfo.elapsedSeconds ?? 0);
				player.setPosition(currentElapsedMicroSeconds);
				player.seeked(currentElapsedMicroSeconds);
				player.setPlaybackStatus(songInfo.isPaused ? import_dist.PLAYBACK_STATUS_PAUSED : import_dist.PLAYBACK_STATUS_PLAYING);
			}
			requestQueueInformation();
		});
	} catch (error) {
		console.error(LoggerPrefix, "Error in MPRIS");
		console.trace(error);
	}
}
function _registerGlobalShortcut(webContents, shortcut, action) {
	globalShortcut.register(shortcut, () => {
		action(webContents);
	});
}
function _registerLocalShortcut(win, shortcut, action) {
	(0, import_electron_localshortcut.register)(win, shortcut, () => {
		action(win.webContents);
	});
}
const onMainLoad = async ({ getConfig, window: window$1 }) => {
	const config = await getConfig();
	const songControls = getSongControls(window$1);
	const { playPause, next, previous } = songControls;
	if (config.overrideMediaKeys) {
		_registerGlobalShortcut(window$1.webContents, "MediaPlayPause", playPause);
		_registerGlobalShortcut(window$1.webContents, "MediaNextTrack", next);
		_registerGlobalShortcut(window$1.webContents, "MediaPreviousTrack", previous);
	}
	if (import_is.default.linux()) registerMPRIS(window$1);
	const { global: global$1, local } = config;
	const shortcutOptions = {
		global: global$1,
		local
	};
	for (const optionType in shortcutOptions) registerAllShortcuts(shortcutOptions[optionType], optionType);
	function registerAllShortcuts(container, type) {
		for (const _action in container) {
			const action = _action;
			if (!container[action]) continue;
			console.debug(`Registering ${type} shortcut`, container[action], ":", action);
			const actionCallback = songControls[action];
			if (typeof actionCallback !== "function") {
				console.warn("Invalid action", action);
				continue;
			}
			if (type === "global") _registerGlobalShortcut(window$1.webContents, container[action], actionCallback);
			else _registerLocalShortcut(window$1, local[action], actionCallback);
		}
	}
};
const onMenu = async ({ window: window$1, getConfig, setConfig }) => {
	const config = await getConfig();
	const kb = (label_, value_, default_) => ({
		value: value_,
		label: label_,
		default: default_
	});
	async function promptKeybind(config$1, win) {
		const output = await prompt({
			title: t("plugins.shortcuts.prompt.keybind.title"),
			label: t("plugins.shortcuts.prompt.keybind.label"),
			type: "keybind",
			keybindOptions: [
				kb(t("plugins.shortcuts.prompt.keybind.keybind-options.previous"), "previous", config$1.global?.previous),
				kb(t("plugins.shortcuts.prompt.keybind.keybind-options.play-pause"), "playPause", config$1.global?.playPause),
				kb(t("plugins.shortcuts.prompt.keybind.keybind-options.next"), "next", config$1.global?.next)
			],
			height: 270,
			...prompt_options_default()
		}, win);
		if (output) {
			const newConfig = { ...config$1 };
			for (const { value, accelerator } of output) newConfig.global[value] = accelerator;
			setConfig(config$1);
		}
	}
	return [{
		label: t("plugins.shortcuts.menu.set-keybinds"),
		click: () => promptKeybind(config, window$1)
	}, {
		label: t("plugins.shortcuts.menu.override-media-keys"),
		type: "checkbox",
		checked: config.overrideMediaKeys,
		click: (item) => setConfig({ overrideMediaKeys: item.checked })
	}];
};
var shortcuts_default = createPlugin({
	name: () => t("plugins.shortcuts.name"),
	description: () => t("plugins.shortcuts.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		overrideMediaKeys: false,
		global: {
			previous: "",
			playPause: "",
			next: ""
		},
		local: {
			previous: "",
			playPause: "",
			next: ""
		}
	},
	menu: onMenu,
	backend: onMainLoad
});
const pluginStub = {
	name: () => t("plugins.shortcuts.name"),
	description: () => t("plugins.shortcuts.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		overrideMediaKeys: false,
		global: {
			previous: "",
			playPause: "",
			next: ""
		},
		local: {
			previous: "",
			playPause: "",
			next: ""
		}
	},
	menu: onMenu
};
export { shortcuts_default as default, pluginStub };
