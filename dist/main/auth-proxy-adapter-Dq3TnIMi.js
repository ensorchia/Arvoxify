import { i as __require, s as __toESM, t as __commonJSMin } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import { n as get } from "./config-n3n9Pwqt.js";
import { c as t, n as createBackend, r as createPlugin, t as LoggerPrefix } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import prompt from "custom-electron-prompt";
import * as net from "node:net";
import __cjs_mod__ from "node:module";
import.meta.filename;
import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
const defaultAuthProxyConfig = {
	enabled: false,
	hostname: "127.0.0.1",
	port: 4545
};
const onMenu = async ({ getConfig, setConfig, window }) => {
	await getConfig();
	return [{
		label: t("plugins.auth-proxy-adapter.menu.hostname.label"),
		type: "normal",
		async click() {
			const config = await getConfig();
			const newHostname = await prompt({
				title: t("plugins.auth-proxy-adapter.prompt.hostname.title"),
				label: t("plugins.auth-proxy-adapter.prompt.hostname.label"),
				value: config.hostname,
				type: "input",
				width: 380,
				...prompt_options_default()
			}, window) ?? config.hostname ?? defaultAuthProxyConfig.hostname;
			setConfig({
				...config,
				hostname: newHostname
			});
		}
	}, {
		label: t("plugins.auth-proxy-adapter.menu.port.label"),
		type: "normal",
		async click() {
			const config = await getConfig();
			const newPort = await prompt({
				title: t("plugins.auth-proxy-adapter.prompt.port.title"),
				label: t("plugins.auth-proxy-adapter.prompt.port.label"),
				value: config.port,
				type: "counter",
				counterOptions: {
					minimum: 0,
					maximum: 65535
				},
				width: 380,
				...prompt_options_default()
			}, window) ?? config.port ?? defaultAuthProxyConfig.port;
			setConfig({
				...config,
				port: newPort
			});
		}
	}];
};
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var buffer_1 = __require("buffer");
	var ERRORS$1 = {
		INVALID_ENCODING: "Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.",
		INVALID_SMARTBUFFER_SIZE: "Invalid size provided. Size must be a valid integer greater than zero.",
		INVALID_SMARTBUFFER_BUFFER: "Invalid Buffer provided in SmartBufferOptions.",
		INVALID_SMARTBUFFER_OBJECT: "Invalid SmartBufferOptions object supplied to SmartBuffer constructor or factory methods.",
		INVALID_OFFSET: "An invalid offset value was provided.",
		INVALID_OFFSET_NON_NUMBER: "An invalid offset value was provided. A numeric value is required.",
		INVALID_LENGTH: "An invalid length value was provided.",
		INVALID_LENGTH_NON_NUMBER: "An invalid length value was provived. A numeric value is required.",
		INVALID_TARGET_OFFSET: "Target offset is beyond the bounds of the internal SmartBuffer data.",
		INVALID_TARGET_LENGTH: "Specified length value moves cursor beyong the bounds of the internal SmartBuffer data.",
		INVALID_READ_BEYOND_BOUNDS: "Attempted to read beyond the bounds of the managed data.",
		INVALID_WRITE_BEYOND_BOUNDS: "Attempted to write beyond the bounds of the managed data."
	};
	exports.ERRORS = ERRORS$1;
	function checkEncoding(encoding) {
		if (!buffer_1.Buffer.isEncoding(encoding)) throw new Error(ERRORS$1.INVALID_ENCODING);
	}
	exports.checkEncoding = checkEncoding;
	function isFiniteInteger(value) {
		return typeof value === "number" && isFinite(value) && isInteger(value);
	}
	exports.isFiniteInteger = isFiniteInteger;
	function checkOffsetOrLengthValue(value, offset) {
		if (typeof value === "number") {
			if (!isFiniteInteger(value) || value < 0) throw new Error(offset ? ERRORS$1.INVALID_OFFSET : ERRORS$1.INVALID_LENGTH);
		} else throw new Error(offset ? ERRORS$1.INVALID_OFFSET_NON_NUMBER : ERRORS$1.INVALID_LENGTH_NON_NUMBER);
	}
	function checkLengthValue(length) {
		checkOffsetOrLengthValue(length, false);
	}
	exports.checkLengthValue = checkLengthValue;
	function checkOffsetValue(offset) {
		checkOffsetOrLengthValue(offset, true);
	}
	exports.checkOffsetValue = checkOffsetValue;
	function checkTargetOffset(offset, buff) {
		if (offset < 0 || offset > buff.length) throw new Error(ERRORS$1.INVALID_TARGET_OFFSET);
	}
	exports.checkTargetOffset = checkTargetOffset;
	function isInteger(value) {
		return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	}
	function bigIntAndBufferInt64Check(bufferMethod) {
		if (typeof BigInt === "undefined") throw new Error("Platform does not support JS BigInt type.");
		if (typeof buffer_1.Buffer.prototype[bufferMethod] === "undefined") throw new Error(`Platform does not support Buffer.prototype.${bufferMethod}.`);
	}
	exports.bigIntAndBufferInt64Check = bigIntAndBufferInt64Check;
}));
var require_smartbuffer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = require_utils();
	var DEFAULT_SMARTBUFFER_SIZE = 4096;
	var DEFAULT_SMARTBUFFER_ENCODING = "utf8";
	exports.SmartBuffer = class SmartBuffer {
		constructor(options) {
			this.length = 0;
			this._encoding = DEFAULT_SMARTBUFFER_ENCODING;
			this._writeOffset = 0;
			this._readOffset = 0;
			if (SmartBuffer.isSmartBufferOptions(options)) {
				if (options.encoding) {
					utils_1.checkEncoding(options.encoding);
					this._encoding = options.encoding;
				}
				if (options.size) if (utils_1.isFiniteInteger(options.size) && options.size > 0) this._buff = Buffer.allocUnsafe(options.size);
				else throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_SIZE);
				else if (options.buff) if (Buffer.isBuffer(options.buff)) {
					this._buff = options.buff;
					this.length = options.buff.length;
				} else throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_BUFFER);
				else this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
			} else {
				if (typeof options !== "undefined") throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_OBJECT);
				this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
			}
		}
		static fromSize(size, encoding) {
			return new this({
				size,
				encoding
			});
		}
		static fromBuffer(buff, encoding) {
			return new this({
				buff,
				encoding
			});
		}
		static fromOptions(options) {
			return new this(options);
		}
		static isSmartBufferOptions(options) {
			const castOptions = options;
			return castOptions && (castOptions.encoding !== void 0 || castOptions.size !== void 0 || castOptions.buff !== void 0);
		}
		readInt8(offset) {
			return this._readNumberValue(Buffer.prototype.readInt8, 1, offset);
		}
		readInt16BE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt16BE, 2, offset);
		}
		readInt16LE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt16LE, 2, offset);
		}
		readInt32BE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt32BE, 4, offset);
		}
		readInt32LE(offset) {
			return this._readNumberValue(Buffer.prototype.readInt32LE, 4, offset);
		}
		readBigInt64BE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigInt64BE");
			return this._readNumberValue(Buffer.prototype.readBigInt64BE, 8, offset);
		}
		readBigInt64LE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigInt64LE");
			return this._readNumberValue(Buffer.prototype.readBigInt64LE, 8, offset);
		}
		writeInt8(value, offset) {
			this._writeNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
			return this;
		}
		insertInt8(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
		}
		writeInt16BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
		}
		insertInt16BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
		}
		writeInt16LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
		}
		insertInt16LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
		}
		writeInt32BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
		}
		insertInt32BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
		}
		writeInt32LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
		}
		insertInt32LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
		}
		writeBigInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64BE");
			return this._writeNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
		}
		insertBigInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64BE");
			return this._insertNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
		}
		writeBigInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64LE");
			return this._writeNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
		}
		insertBigInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigInt64LE");
			return this._insertNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
		}
		readUInt8(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt8, 1, offset);
		}
		readUInt16BE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, offset);
		}
		readUInt16LE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, offset);
		}
		readUInt32BE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, offset);
		}
		readUInt32LE(offset) {
			return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, offset);
		}
		readBigUInt64BE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigUInt64BE");
			return this._readNumberValue(Buffer.prototype.readBigUInt64BE, 8, offset);
		}
		readBigUInt64LE(offset) {
			utils_1.bigIntAndBufferInt64Check("readBigUInt64LE");
			return this._readNumberValue(Buffer.prototype.readBigUInt64LE, 8, offset);
		}
		writeUInt8(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
		}
		insertUInt8(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
		}
		writeUInt16BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
		}
		insertUInt16BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
		}
		writeUInt16LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
		}
		insertUInt16LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
		}
		writeUInt32BE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
		}
		insertUInt32BE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
		}
		writeUInt32LE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
		}
		insertUInt32LE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
		}
		writeBigUInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64BE");
			return this._writeNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
		}
		insertBigUInt64BE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64BE");
			return this._insertNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
		}
		writeBigUInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64LE");
			return this._writeNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
		}
		insertBigUInt64LE(value, offset) {
			utils_1.bigIntAndBufferInt64Check("writeBigUInt64LE");
			return this._insertNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
		}
		readFloatBE(offset) {
			return this._readNumberValue(Buffer.prototype.readFloatBE, 4, offset);
		}
		readFloatLE(offset) {
			return this._readNumberValue(Buffer.prototype.readFloatLE, 4, offset);
		}
		writeFloatBE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
		}
		insertFloatBE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
		}
		writeFloatLE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
		}
		insertFloatLE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
		}
		readDoubleBE(offset) {
			return this._readNumberValue(Buffer.prototype.readDoubleBE, 8, offset);
		}
		readDoubleLE(offset) {
			return this._readNumberValue(Buffer.prototype.readDoubleLE, 8, offset);
		}
		writeDoubleBE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
		}
		insertDoubleBE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
		}
		writeDoubleLE(value, offset) {
			return this._writeNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
		}
		insertDoubleLE(value, offset) {
			return this._insertNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
		}
		readString(arg1, encoding) {
			let lengthVal;
			if (typeof arg1 === "number") {
				utils_1.checkLengthValue(arg1);
				lengthVal = Math.min(arg1, this.length - this._readOffset);
			} else {
				encoding = arg1;
				lengthVal = this.length - this._readOffset;
			}
			if (typeof encoding !== "undefined") utils_1.checkEncoding(encoding);
			const value = this._buff.slice(this._readOffset, this._readOffset + lengthVal).toString(encoding || this._encoding);
			this._readOffset += lengthVal;
			return value;
		}
		insertString(value, offset, encoding) {
			utils_1.checkOffsetValue(offset);
			return this._handleString(value, true, offset, encoding);
		}
		writeString(value, arg2, encoding) {
			return this._handleString(value, false, arg2, encoding);
		}
		readStringNT(encoding) {
			if (typeof encoding !== "undefined") utils_1.checkEncoding(encoding);
			let nullPos = this.length;
			for (let i = this._readOffset; i < this.length; i++) if (this._buff[i] === 0) {
				nullPos = i;
				break;
			}
			const value = this._buff.slice(this._readOffset, nullPos);
			this._readOffset = nullPos + 1;
			return value.toString(encoding || this._encoding);
		}
		insertStringNT(value, offset, encoding) {
			utils_1.checkOffsetValue(offset);
			this.insertString(value, offset, encoding);
			this.insertUInt8(0, offset + value.length);
			return this;
		}
		writeStringNT(value, arg2, encoding) {
			this.writeString(value, arg2, encoding);
			this.writeUInt8(0, typeof arg2 === "number" ? arg2 + value.length : this.writeOffset);
			return this;
		}
		readBuffer(length) {
			if (typeof length !== "undefined") utils_1.checkLengthValue(length);
			const lengthVal = typeof length === "number" ? length : this.length;
			const endPoint = Math.min(this.length, this._readOffset + lengthVal);
			const value = this._buff.slice(this._readOffset, endPoint);
			this._readOffset = endPoint;
			return value;
		}
		insertBuffer(value, offset) {
			utils_1.checkOffsetValue(offset);
			return this._handleBuffer(value, true, offset);
		}
		writeBuffer(value, offset) {
			return this._handleBuffer(value, false, offset);
		}
		readBufferNT() {
			let nullPos = this.length;
			for (let i = this._readOffset; i < this.length; i++) if (this._buff[i] === 0) {
				nullPos = i;
				break;
			}
			const value = this._buff.slice(this._readOffset, nullPos);
			this._readOffset = nullPos + 1;
			return value;
		}
		insertBufferNT(value, offset) {
			utils_1.checkOffsetValue(offset);
			this.insertBuffer(value, offset);
			this.insertUInt8(0, offset + value.length);
			return this;
		}
		writeBufferNT(value, offset) {
			if (typeof offset !== "undefined") utils_1.checkOffsetValue(offset);
			this.writeBuffer(value, offset);
			this.writeUInt8(0, typeof offset === "number" ? offset + value.length : this._writeOffset);
			return this;
		}
		clear() {
			this._writeOffset = 0;
			this._readOffset = 0;
			this.length = 0;
			return this;
		}
		remaining() {
			return this.length - this._readOffset;
		}
		get readOffset() {
			return this._readOffset;
		}
		set readOffset(offset) {
			utils_1.checkOffsetValue(offset);
			utils_1.checkTargetOffset(offset, this);
			this._readOffset = offset;
		}
		get writeOffset() {
			return this._writeOffset;
		}
		set writeOffset(offset) {
			utils_1.checkOffsetValue(offset);
			utils_1.checkTargetOffset(offset, this);
			this._writeOffset = offset;
		}
		get encoding() {
			return this._encoding;
		}
		set encoding(encoding) {
			utils_1.checkEncoding(encoding);
			this._encoding = encoding;
		}
		get internalBuffer() {
			return this._buff;
		}
		toBuffer() {
			return this._buff.slice(0, this.length);
		}
		toString(encoding) {
			const encodingVal = typeof encoding === "string" ? encoding : this._encoding;
			utils_1.checkEncoding(encodingVal);
			return this._buff.toString(encodingVal, 0, this.length);
		}
		destroy() {
			this.clear();
			return this;
		}
		_handleString(value, isInsert, arg3, encoding) {
			let offsetVal = this._writeOffset;
			let encodingVal = this._encoding;
			if (typeof arg3 === "number") offsetVal = arg3;
			else if (typeof arg3 === "string") {
				utils_1.checkEncoding(arg3);
				encodingVal = arg3;
			}
			if (typeof encoding === "string") {
				utils_1.checkEncoding(encoding);
				encodingVal = encoding;
			}
			const byteLength = Buffer.byteLength(value, encodingVal);
			if (isInsert) this.ensureInsertable(byteLength, offsetVal);
			else this._ensureWriteable(byteLength, offsetVal);
			this._buff.write(value, offsetVal, byteLength, encodingVal);
			if (isInsert) this._writeOffset += byteLength;
			else if (typeof arg3 === "number") this._writeOffset = Math.max(this._writeOffset, offsetVal + byteLength);
			else this._writeOffset += byteLength;
			return this;
		}
		_handleBuffer(value, isInsert, offset) {
			const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
			if (isInsert) this.ensureInsertable(value.length, offsetVal);
			else this._ensureWriteable(value.length, offsetVal);
			value.copy(this._buff, offsetVal);
			if (isInsert) this._writeOffset += value.length;
			else if (typeof offset === "number") this._writeOffset = Math.max(this._writeOffset, offsetVal + value.length);
			else this._writeOffset += value.length;
			return this;
		}
		ensureReadable(length, offset) {
			let offsetVal = this._readOffset;
			if (typeof offset !== "undefined") {
				utils_1.checkOffsetValue(offset);
				offsetVal = offset;
			}
			if (offsetVal < 0 || offsetVal + length > this.length) throw new Error(utils_1.ERRORS.INVALID_READ_BEYOND_BOUNDS);
		}
		ensureInsertable(dataLength, offset) {
			utils_1.checkOffsetValue(offset);
			this._ensureCapacity(this.length + dataLength);
			if (offset < this.length) this._buff.copy(this._buff, offset + dataLength, offset, this._buff.length);
			if (offset + dataLength > this.length) this.length = offset + dataLength;
			else this.length += dataLength;
		}
		_ensureWriteable(dataLength, offset) {
			const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
			this._ensureCapacity(offsetVal + dataLength);
			if (offsetVal + dataLength > this.length) this.length = offsetVal + dataLength;
		}
		_ensureCapacity(minLength) {
			const oldLength = this._buff.length;
			if (minLength > oldLength) {
				let data = this._buff;
				let newLength = oldLength * 3 / 2 + 1;
				if (newLength < minLength) newLength = minLength;
				this._buff = Buffer.allocUnsafe(newLength);
				data.copy(this._buff, 0, 0, oldLength);
			}
		}
		_readNumberValue(func, byteSize, offset) {
			this.ensureReadable(byteSize, offset);
			const value = func.call(this._buff, typeof offset === "number" ? offset : this._readOffset);
			if (typeof offset === "undefined") this._readOffset += byteSize;
			return value;
		}
		_insertNumberValue(func, byteSize, value, offset) {
			utils_1.checkOffsetValue(offset);
			this.ensureInsertable(byteSize, offset);
			func.call(this._buff, value, offset);
			this._writeOffset += byteSize;
			return this;
		}
		_writeNumberValue(func, byteSize, value, offset) {
			if (typeof offset === "number") {
				if (offset < 0) throw new Error(utils_1.ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
				utils_1.checkOffsetValue(offset);
			}
			const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
			this._ensureWriteable(byteSize, offsetVal);
			func.call(this._buff, value, offsetVal);
			if (typeof offset === "number") this._writeOffset = Math.max(this._writeOffset, offsetVal + byteSize);
			else this._writeOffset += byteSize;
			return this;
		}
	};
}));
var require_constants$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DEFAULT_TIMEOUT = 3e4;
	exports.ERRORS = {
		InvalidSocksCommand: "An invalid SOCKS command was provided. Valid options are connect, bind, and associate.",
		InvalidSocksCommandForOperation: "An invalid SOCKS command was provided. Only a subset of commands are supported for this operation.",
		InvalidSocksCommandChain: "An invalid SOCKS command was provided. Chaining currently only supports the connect command.",
		InvalidSocksClientOptionsDestination: "An invalid destination host was provided.",
		InvalidSocksClientOptionsExistingSocket: "An invalid existing socket was provided. This should be an instance of stream.Duplex.",
		InvalidSocksClientOptionsProxy: "Invalid SOCKS proxy details were provided.",
		InvalidSocksClientOptionsTimeout: "An invalid timeout value was provided. Please enter a value above 0 (in ms).",
		InvalidSocksClientOptionsProxiesLength: "At least two socks proxies must be provided for chaining.",
		InvalidSocksClientOptionsCustomAuthRange: "Custom auth must be a value between 0x80 and 0xFE.",
		InvalidSocksClientOptionsCustomAuthOptions: "When a custom_auth_method is provided, custom_auth_request_handler, custom_auth_response_size, and custom_auth_response_handler must also be provided and valid.",
		NegotiationError: "Negotiation error",
		SocketClosed: "Socket closed",
		ProxyConnectionTimedOut: "Proxy connection timed out",
		InternalError: "SocksClient internal error (this should not happen)",
		InvalidSocks4HandshakeResponse: "Received invalid Socks4 handshake response",
		Socks4ProxyRejectedConnection: "Socks4 Proxy rejected connection",
		InvalidSocks4IncomingConnectionResponse: "Socks4 invalid incoming connection response",
		Socks4ProxyRejectedIncomingBoundConnection: "Socks4 Proxy rejected incoming bound connection",
		InvalidSocks5InitialHandshakeResponse: "Received invalid Socks5 initial handshake response",
		InvalidSocks5IntiailHandshakeSocksVersion: "Received invalid Socks5 initial handshake (invalid socks version)",
		InvalidSocks5InitialHandshakeNoAcceptedAuthType: "Received invalid Socks5 initial handshake (no accepted authentication type)",
		InvalidSocks5InitialHandshakeUnknownAuthType: "Received invalid Socks5 initial handshake (unknown authentication type)",
		Socks5AuthenticationFailed: "Socks5 Authentication failed",
		InvalidSocks5FinalHandshake: "Received invalid Socks5 final handshake response",
		InvalidSocks5FinalHandshakeRejected: "Socks5 proxy rejected connection",
		InvalidSocks5IncomingConnectionResponse: "Received invalid Socks5 incoming connection response",
		Socks5ProxyRejectedIncomingBoundConnection: "Socks5 Proxy rejected incoming bound connection"
	};
	exports.SOCKS_INCOMING_PACKET_SIZES = {
		Socks5InitialHandshakeResponse: 2,
		Socks5UserPassAuthenticationResponse: 2,
		Socks5ResponseHeader: 5,
		Socks5ResponseIPv4: 10,
		Socks5ResponseIPv6: 22,
		Socks5ResponseHostname: (hostNameLength) => hostNameLength + 7,
		Socks4Response: 8
	};
	var SocksCommand;
	(function(SocksCommand$1) {
		SocksCommand$1[SocksCommand$1["connect"] = 1] = "connect";
		SocksCommand$1[SocksCommand$1["bind"] = 2] = "bind";
		SocksCommand$1[SocksCommand$1["associate"] = 3] = "associate";
	})(SocksCommand || (exports.SocksCommand = SocksCommand = {}));
	var Socks4Response;
	(function(Socks4Response$1) {
		Socks4Response$1[Socks4Response$1["Granted"] = 90] = "Granted";
		Socks4Response$1[Socks4Response$1["Failed"] = 91] = "Failed";
		Socks4Response$1[Socks4Response$1["Rejected"] = 92] = "Rejected";
		Socks4Response$1[Socks4Response$1["RejectedIdent"] = 93] = "RejectedIdent";
	})(Socks4Response || (exports.Socks4Response = Socks4Response = {}));
	var Socks5Auth;
	(function(Socks5Auth$1) {
		Socks5Auth$1[Socks5Auth$1["NoAuth"] = 0] = "NoAuth";
		Socks5Auth$1[Socks5Auth$1["GSSApi"] = 1] = "GSSApi";
		Socks5Auth$1[Socks5Auth$1["UserPass"] = 2] = "UserPass";
	})(Socks5Auth || (exports.Socks5Auth = Socks5Auth = {}));
	exports.SOCKS5_CUSTOM_AUTH_START = 128;
	exports.SOCKS5_CUSTOM_AUTH_END = 254;
	exports.SOCKS5_NO_ACCEPTABLE_AUTH = 255;
	var Socks5Response;
	(function(Socks5Response$1) {
		Socks5Response$1[Socks5Response$1["Granted"] = 0] = "Granted";
		Socks5Response$1[Socks5Response$1["Failure"] = 1] = "Failure";
		Socks5Response$1[Socks5Response$1["NotAllowed"] = 2] = "NotAllowed";
		Socks5Response$1[Socks5Response$1["NetworkUnreachable"] = 3] = "NetworkUnreachable";
		Socks5Response$1[Socks5Response$1["HostUnreachable"] = 4] = "HostUnreachable";
		Socks5Response$1[Socks5Response$1["ConnectionRefused"] = 5] = "ConnectionRefused";
		Socks5Response$1[Socks5Response$1["TTLExpired"] = 6] = "TTLExpired";
		Socks5Response$1[Socks5Response$1["CommandNotSupported"] = 7] = "CommandNotSupported";
		Socks5Response$1[Socks5Response$1["AddressNotSupported"] = 8] = "AddressNotSupported";
	})(Socks5Response || (exports.Socks5Response = Socks5Response = {}));
	var Socks5HostType;
	(function(Socks5HostType$1) {
		Socks5HostType$1[Socks5HostType$1["IPv4"] = 1] = "IPv4";
		Socks5HostType$1[Socks5HostType$1["Hostname"] = 3] = "Hostname";
		Socks5HostType$1[Socks5HostType$1["IPv6"] = 4] = "IPv6";
	})(Socks5HostType || (exports.Socks5HostType = Socks5HostType = {}));
	var SocksClientState;
	(function(SocksClientState$1) {
		SocksClientState$1[SocksClientState$1["Created"] = 0] = "Created";
		SocksClientState$1[SocksClientState$1["Connecting"] = 1] = "Connecting";
		SocksClientState$1[SocksClientState$1["Connected"] = 2] = "Connected";
		SocksClientState$1[SocksClientState$1["SentInitialHandshake"] = 3] = "SentInitialHandshake";
		SocksClientState$1[SocksClientState$1["ReceivedInitialHandshakeResponse"] = 4] = "ReceivedInitialHandshakeResponse";
		SocksClientState$1[SocksClientState$1["SentAuthentication"] = 5] = "SentAuthentication";
		SocksClientState$1[SocksClientState$1["ReceivedAuthenticationResponse"] = 6] = "ReceivedAuthenticationResponse";
		SocksClientState$1[SocksClientState$1["SentFinalHandshake"] = 7] = "SentFinalHandshake";
		SocksClientState$1[SocksClientState$1["ReceivedFinalResponse"] = 8] = "ReceivedFinalResponse";
		SocksClientState$1[SocksClientState$1["BoundWaitingForConnection"] = 9] = "BoundWaitingForConnection";
		SocksClientState$1[SocksClientState$1["Established"] = 10] = "Established";
		SocksClientState$1[SocksClientState$1["Disconnected"] = 11] = "Disconnected";
		SocksClientState$1[SocksClientState$1["Error"] = 99] = "Error";
	})(SocksClientState || (exports.SocksClientState = SocksClientState = {}));
}));
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var SocksClientError = class extends Error {
		constructor(message, options) {
			super(message);
			this.options = options;
		}
	};
	exports.SocksClientError = SocksClientError;
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
	exports.shuffleArray = shuffleArray;
}));
var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isInSubnet = isInSubnet;
	exports.isCorrect = isCorrect;
	exports.numberToPaddedHex = numberToPaddedHex;
	exports.stringToPaddedHex = stringToPaddedHex;
	exports.testBit = testBit;
	function isInSubnet(address) {
		if (this.subnetMask < address.subnetMask) return false;
		if (this.mask(address.subnetMask) === address.mask()) return true;
		return false;
	}
	function isCorrect(defaultBits) {
		return function() {
			if (this.addressMinusSuffix !== this.correctForm()) return false;
			if (this.subnetMask === defaultBits && !this.parsedSubnet) return true;
			return this.parsedSubnet === String(this.subnetMask);
		};
	}
	function numberToPaddedHex(number) {
		return number.toString(16).padStart(2, "0");
	}
	function stringToPaddedHex(numberString) {
		return numberToPaddedHex(parseInt(numberString, 10));
	}
	function testBit(binaryValue, position) {
		const { length } = binaryValue;
		if (position > length) return false;
		const positionInString = length - position;
		return binaryValue.substring(positionInString, positionInString + 1) === "1";
	}
}));
var require_constants$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BITS = 32;
	exports.GROUPS = 4;
	exports.RE_ADDRESS = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
	exports.RE_SUBNET_STRING = /\/\d{1,2}$/;
}));
var require_address_error = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var AddressError = class extends Error {
		constructor(message, parseMessage) {
			super(message);
			this.name = "AddressError";
			this.parseMessage = parseMessage;
		}
	};
	exports.AddressError = AddressError;
}));
var require_ipv4 = /* @__PURE__ */ __commonJSMin(((exports) => {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	var common$1 = __importStar$3(require_common());
	var constants = __importStar$3(require_constants$1());
	var address_error_1$2 = require_address_error();
	exports.Address4 = class Address4 {
		constructor(address) {
			this.groups = constants.GROUPS;
			this.parsedAddress = [];
			this.parsedSubnet = "";
			this.subnet = "/32";
			this.subnetMask = 32;
			this.v4 = true;
			this.isCorrect = common$1.isCorrect(constants.BITS);
			this.isInSubnet = common$1.isInSubnet;
			this.address = address;
			const subnet = constants.RE_SUBNET_STRING.exec(address);
			if (subnet) {
				this.parsedSubnet = subnet[0].replace("/", "");
				this.subnetMask = parseInt(this.parsedSubnet, 10);
				this.subnet = `/${this.subnetMask}`;
				if (this.subnetMask < 0 || this.subnetMask > constants.BITS) throw new address_error_1$2.AddressError("Invalid subnet mask.");
				address = address.replace(constants.RE_SUBNET_STRING, "");
			}
			this.addressMinusSuffix = address;
			this.parsedAddress = this.parse(address);
		}
		static isValid(address) {
			try {
				new Address4(address);
				return true;
			} catch (e) {
				return false;
			}
		}
		parse(address) {
			const groups = address.split(".");
			if (!address.match(constants.RE_ADDRESS)) throw new address_error_1$2.AddressError("Invalid IPv4 address.");
			return groups;
		}
		correctForm() {
			return this.parsedAddress.map((part) => parseInt(part, 10)).join(".");
		}
		static fromHex(hex) {
			const padded = hex.replace(/:/g, "").padStart(8, "0");
			const groups = [];
			let i;
			for (i = 0; i < 8; i += 2) {
				const h = padded.slice(i, i + 2);
				groups.push(parseInt(h, 16));
			}
			return new Address4(groups.join("."));
		}
		static fromInteger(integer) {
			return Address4.fromHex(integer.toString(16));
		}
		static fromArpa(arpaFormAddress) {
			const address = arpaFormAddress.replace(/(\.in-addr\.arpa)?\.$/, "").split(".").reverse().join(".");
			return new Address4(address);
		}
		toHex() {
			return this.parsedAddress.map((part) => common$1.stringToPaddedHex(part)).join(":");
		}
		toArray() {
			return this.parsedAddress.map((part) => parseInt(part, 10));
		}
		toGroup6() {
			const output = [];
			let i;
			for (i = 0; i < constants.GROUPS; i += 2) output.push(`${common$1.stringToPaddedHex(this.parsedAddress[i])}${common$1.stringToPaddedHex(this.parsedAddress[i + 1])}`);
			return output.join(":");
		}
		bigInt() {
			return BigInt(`0x${this.parsedAddress.map((n) => common$1.stringToPaddedHex(n)).join("")}`);
		}
		_startAddress() {
			return BigInt(`0b${this.mask() + "0".repeat(constants.BITS - this.subnetMask)}`);
		}
		startAddress() {
			return Address4.fromBigInt(this._startAddress());
		}
		startAddressExclusive() {
			const adjust = BigInt("1");
			return Address4.fromBigInt(this._startAddress() + adjust);
		}
		_endAddress() {
			return BigInt(`0b${this.mask() + "1".repeat(constants.BITS - this.subnetMask)}`);
		}
		endAddress() {
			return Address4.fromBigInt(this._endAddress());
		}
		endAddressExclusive() {
			const adjust = BigInt("1");
			return Address4.fromBigInt(this._endAddress() - adjust);
		}
		static fromBigInt(bigInt) {
			return Address4.fromHex(bigInt.toString(16));
		}
		mask(mask) {
			if (mask === void 0) mask = this.subnetMask;
			return this.getBitsBase2(0, mask);
		}
		getBitsBase2(start, end) {
			return this.binaryZeroPad().slice(start, end);
		}
		reverseForm(options) {
			if (!options) options = {};
			const reversed = this.correctForm().split(".").reverse().join(".");
			if (options.omitSuffix) return reversed;
			return `${reversed}.in-addr.arpa.`;
		}
		isMulticast() {
			return this.isInSubnet(new Address4("224.0.0.0/4"));
		}
		binaryZeroPad() {
			return this.bigInt().toString(2).padStart(constants.BITS, "0");
		}
		groupForV6() {
			const segments = this.parsedAddress;
			return this.address.replace(constants.RE_ADDRESS, `<span class="hover-group group-v4 group-6">${segments.slice(0, 2).join(".")}</span>.<span class="hover-group group-v4 group-7">${segments.slice(2, 4).join(".")}</span>`);
		}
	};
}));
var require_constants = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.BITS = 128;
	exports.GROUPS = 8;
	exports.SCOPES = {
		0: "Reserved",
		1: "Interface local",
		2: "Link local",
		4: "Admin local",
		5: "Site local",
		8: "Organization local",
		14: "Global",
		15: "Reserved"
	};
	exports.TYPES = {
		"ff01::1/128": "Multicast (All nodes on this interface)",
		"ff01::2/128": "Multicast (All routers on this interface)",
		"ff02::1/128": "Multicast (All nodes on this link)",
		"ff02::2/128": "Multicast (All routers on this link)",
		"ff05::2/128": "Multicast (All routers in this site)",
		"ff02::5/128": "Multicast (OSPFv3 AllSPF routers)",
		"ff02::6/128": "Multicast (OSPFv3 AllDR routers)",
		"ff02::9/128": "Multicast (RIP routers)",
		"ff02::a/128": "Multicast (EIGRP routers)",
		"ff02::d/128": "Multicast (PIM routers)",
		"ff02::16/128": "Multicast (MLDv2 reports)",
		"ff01::fb/128": "Multicast (mDNSv6)",
		"ff02::fb/128": "Multicast (mDNSv6)",
		"ff05::fb/128": "Multicast (mDNSv6)",
		"ff02::1:2/128": "Multicast (All DHCP servers and relay agents on this link)",
		"ff05::1:2/128": "Multicast (All DHCP servers and relay agents in this site)",
		"ff02::1:3/128": "Multicast (All DHCP servers on this link)",
		"ff05::1:3/128": "Multicast (All DHCP servers in this site)",
		"::/128": "Unspecified",
		"::1/128": "Loopback",
		"ff00::/8": "Multicast",
		"fe80::/10": "Link-local unicast"
	};
	exports.RE_BAD_CHARACTERS = /([^0-9a-f:/%])/gi;
	exports.RE_BAD_ADDRESS = /([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/gi;
	exports.RE_SUBNET_STRING = /\/\d{1,3}(?=%|$)/;
	exports.RE_ZONE_STRING = /%.*$/;
	exports.RE_URL = /^\[{0,1}([0-9a-f:]+)\]{0,1}/;
	exports.RE_URL_WITH_PORT = /\[([0-9a-f:]+)\]:([0-9]{1,5})/;
}));
var require_helpers$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.spanAllZeroes = spanAllZeroes;
	exports.spanAll = spanAll;
	exports.spanLeadingZeroes = spanLeadingZeroes;
	exports.simpleGroup = simpleGroup;
	function spanAllZeroes(s) {
		return s.replace(/(0+)/g, "<span class=\"zero\">$1</span>");
	}
	function spanAll(s, offset = 0) {
		return s.split("").map((n, i) => `<span class="digit value-${n} position-${i + offset}">${spanAllZeroes(n)}</span>`).join("");
	}
	function spanLeadingZeroesSimple(group) {
		return group.replace(/^(0+)/, "<span class=\"zero\">$1</span>");
	}
	function spanLeadingZeroes(address) {
		return address.split(":").map((g) => spanLeadingZeroesSimple(g)).join(":");
	}
	function simpleGroup(addressString, offset = 0) {
		return addressString.split(":").map((g, i) => {
			if (/group-v4/.test(g)) return g;
			return `<span class="hover-group group-${i + offset}">${spanLeadingZeroesSimple(g)}</span>`;
		});
	}
}));
var require_regular_expressions = /* @__PURE__ */ __commonJSMin(((exports) => {
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
	exports.groupPossibilities = groupPossibilities;
	exports.padGroup = padGroup;
	exports.simpleRegularExpression = simpleRegularExpression;
	exports.possibleElisions = possibleElisions;
	var v6 = __importStar$2(require_constants());
	function groupPossibilities(possibilities) {
		return `(${possibilities.join("|")})`;
	}
	function padGroup(group) {
		if (group.length < 4) return `0{0,${4 - group.length}}${group}`;
		return group;
	}
	exports.ADDRESS_BOUNDARY = "[^A-Fa-f0-9:]";
	function simpleRegularExpression(groups) {
		const zeroIndexes = [];
		groups.forEach((group, i) => {
			if (parseInt(group, 16) === 0) zeroIndexes.push(i);
		});
		const possibilities = zeroIndexes.map((zeroIndex) => groups.map((group, i) => {
			if (i === zeroIndex) {
				const elision = i === 0 || i === v6.GROUPS - 1 ? ":" : "";
				return groupPossibilities([padGroup(group), elision]);
			}
			return padGroup(group);
		}).join(":"));
		possibilities.push(groups.map(padGroup).join(":"));
		return groupPossibilities(possibilities);
	}
	function possibleElisions(elidedGroups, moreLeft, moreRight) {
		const left = moreLeft ? "" : ":";
		const right = moreRight ? "" : ":";
		const possibilities = [];
		if (!moreLeft && !moreRight) possibilities.push("::");
		if (moreLeft && moreRight) possibilities.push("");
		if (moreRight && !moreLeft || !moreRight && moreLeft) possibilities.push(":");
		possibilities.push(`${left}(:0{1,4}){1,${elidedGroups - 1}}`);
		possibilities.push(`(0{1,4}:){1,${elidedGroups - 1}}${right}`);
		possibilities.push(`(0{1,4}:){${elidedGroups - 1}}0{1,4}`);
		for (let groups = 1; groups < elidedGroups - 1; groups++) for (let position = 1; position < elidedGroups - groups; position++) possibilities.push(`(0{1,4}:){${position}}:(0{1,4}:){${elidedGroups - position - groups - 1}}0{1,4}`);
		return groupPossibilities(possibilities);
	}
}));
var require_ipv6 = /* @__PURE__ */ __commonJSMin(((exports) => {
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
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$2(result, mod, k);
		}
		__setModuleDefault$1(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var common = __importStar$1(require_common());
	var constants4 = __importStar$1(require_constants$1());
	var constants6 = __importStar$1(require_constants());
	var helpers$1 = __importStar$1(require_helpers$1());
	var ipv4_1$1 = require_ipv4();
	var regular_expressions_1 = require_regular_expressions();
	var address_error_1$1 = require_address_error();
	var common_1 = require_common();
	function assert(condition) {
		if (!condition) throw new Error("Assertion failed.");
	}
	function addCommas(number) {
		const r = /(\d+)(\d{3})/;
		while (r.test(number)) number = number.replace(r, "$1,$2");
		return number;
	}
	function spanLeadingZeroes4(n) {
		n = n.replace(/^(0{1,})([1-9]+)$/, "<span class=\"parse-error\">$1</span>$2");
		n = n.replace(/^(0{1,})(0)$/, "<span class=\"parse-error\">$1</span>$2");
		return n;
	}
	function compact(address, slice) {
		const s1 = [];
		const s2 = [];
		let i;
		for (i = 0; i < address.length; i++) if (i < slice[0]) s1.push(address[i]);
		else if (i > slice[1]) s2.push(address[i]);
		return s1.concat(["compact"]).concat(s2);
	}
	function paddedHex(octet) {
		return parseInt(octet, 16).toString(16).padStart(4, "0");
	}
	function unsignByte(b) {
		return b & 255;
	}
	exports.Address6 = class Address6 {
		constructor(address, optionalGroups) {
			this.addressMinusSuffix = "";
			this.parsedSubnet = "";
			this.subnet = "/128";
			this.subnetMask = 128;
			this.v4 = false;
			this.zone = "";
			this.isInSubnet = common.isInSubnet;
			this.isCorrect = common.isCorrect(constants6.BITS);
			if (optionalGroups === void 0) this.groups = constants6.GROUPS;
			else this.groups = optionalGroups;
			this.address = address;
			const subnet = constants6.RE_SUBNET_STRING.exec(address);
			if (subnet) {
				this.parsedSubnet = subnet[0].replace("/", "");
				this.subnetMask = parseInt(this.parsedSubnet, 10);
				this.subnet = `/${this.subnetMask}`;
				if (Number.isNaN(this.subnetMask) || this.subnetMask < 0 || this.subnetMask > constants6.BITS) throw new address_error_1$1.AddressError("Invalid subnet mask.");
				address = address.replace(constants6.RE_SUBNET_STRING, "");
			} else if (/\//.test(address)) throw new address_error_1$1.AddressError("Invalid subnet mask.");
			const zone = constants6.RE_ZONE_STRING.exec(address);
			if (zone) {
				this.zone = zone[0];
				address = address.replace(constants6.RE_ZONE_STRING, "");
			}
			this.addressMinusSuffix = address;
			this.parsedAddress = this.parse(this.addressMinusSuffix);
		}
		static isValid(address) {
			try {
				new Address6(address);
				return true;
			} catch (e) {
				return false;
			}
		}
		static fromBigInt(bigInt) {
			const hex = bigInt.toString(16).padStart(32, "0");
			const groups = [];
			let i;
			for (i = 0; i < constants6.GROUPS; i++) groups.push(hex.slice(i * 4, (i + 1) * 4));
			return new Address6(groups.join(":"));
		}
		static fromURL(url) {
			let host;
			let port = null;
			let result;
			if (url.indexOf("[") !== -1 && url.indexOf("]:") !== -1) {
				result = constants6.RE_URL_WITH_PORT.exec(url);
				if (result === null) return {
					error: "failed to parse address with port",
					address: null,
					port: null
				};
				host = result[1];
				port = result[2];
			} else if (url.indexOf("/") !== -1) {
				url = url.replace(/^[a-z0-9]+:\/\//, "");
				result = constants6.RE_URL.exec(url);
				if (result === null) return {
					error: "failed to parse address from URL",
					address: null,
					port: null
				};
				host = result[1];
			} else host = url;
			if (port) {
				port = parseInt(port, 10);
				if (port < 0 || port > 65536) port = null;
			} else port = null;
			return {
				address: new Address6(host),
				port
			};
		}
		static fromAddress4(address) {
			const address4 = new ipv4_1$1.Address4(address);
			const mask6 = constants6.BITS - (constants4.BITS - address4.subnetMask);
			return new Address6(`::ffff:${address4.correctForm()}/${mask6}`);
		}
		static fromArpa(arpaFormAddress) {
			let address = arpaFormAddress.replace(/(\.ip6\.arpa)?\.$/, "");
			const semicolonAmount = 7;
			if (address.length !== 63) throw new address_error_1$1.AddressError("Invalid 'ip6.arpa' form.");
			const parts = address.split(".").reverse();
			for (let i = semicolonAmount; i > 0; i--) {
				const insertIndex = i * 4;
				parts.splice(insertIndex, 0, ":");
			}
			address = parts.join("");
			return new Address6(address);
		}
		microsoftTranscription() {
			return `${this.correctForm().replace(/:/g, "-")}.ipv6-literal.net`;
		}
		mask(mask = this.subnetMask) {
			return this.getBitsBase2(0, mask);
		}
		possibleSubnets(subnetSize = 128) {
			const availableBits = constants6.BITS - this.subnetMask;
			const subnetBits = Math.abs(subnetSize - constants6.BITS);
			const subnetPowers = availableBits - subnetBits;
			if (subnetPowers < 0) return "0";
			return addCommas((BigInt("2") ** BigInt(subnetPowers)).toString(10));
		}
		_startAddress() {
			return BigInt(`0b${this.mask() + "0".repeat(constants6.BITS - this.subnetMask)}`);
		}
		startAddress() {
			return Address6.fromBigInt(this._startAddress());
		}
		startAddressExclusive() {
			const adjust = BigInt("1");
			return Address6.fromBigInt(this._startAddress() + adjust);
		}
		_endAddress() {
			return BigInt(`0b${this.mask() + "1".repeat(constants6.BITS - this.subnetMask)}`);
		}
		endAddress() {
			return Address6.fromBigInt(this._endAddress());
		}
		endAddressExclusive() {
			const adjust = BigInt("1");
			return Address6.fromBigInt(this._endAddress() - adjust);
		}
		getScope() {
			let scope = constants6.SCOPES[parseInt(this.getBits(12, 16).toString(10), 10)];
			if (this.getType() === "Global unicast" && scope !== "Link local") scope = "Global";
			return scope || "Unknown";
		}
		getType() {
			for (const subnet of Object.keys(constants6.TYPES)) if (this.isInSubnet(new Address6(subnet))) return constants6.TYPES[subnet];
			return "Global unicast";
		}
		getBits(start, end) {
			return BigInt(`0b${this.getBitsBase2(start, end)}`);
		}
		getBitsBase2(start, end) {
			return this.binaryZeroPad().slice(start, end);
		}
		getBitsBase16(start, end) {
			const length = end - start;
			if (length % 4 !== 0) throw new Error("Length of bits to retrieve must be divisible by four");
			return this.getBits(start, end).toString(16).padStart(length / 4, "0");
		}
		getBitsPastSubnet() {
			return this.getBitsBase2(this.subnetMask, constants6.BITS);
		}
		reverseForm(options) {
			if (!options) options = {};
			const characters = Math.floor(this.subnetMask / 4);
			const reversed = this.canonicalForm().replace(/:/g, "").split("").slice(0, characters).reverse().join(".");
			if (characters > 0) {
				if (options.omitSuffix) return reversed;
				return `${reversed}.ip6.arpa.`;
			}
			if (options.omitSuffix) return "";
			return "ip6.arpa.";
		}
		correctForm() {
			let i;
			let groups = [];
			let zeroCounter = 0;
			const zeroes = [];
			for (i = 0; i < this.parsedAddress.length; i++) {
				const value = parseInt(this.parsedAddress[i], 16);
				if (value === 0) zeroCounter++;
				if (value !== 0 && zeroCounter > 0) {
					if (zeroCounter > 1) zeroes.push([i - zeroCounter, i - 1]);
					zeroCounter = 0;
				}
			}
			if (zeroCounter > 1) zeroes.push([this.parsedAddress.length - zeroCounter, this.parsedAddress.length - 1]);
			const zeroLengths = zeroes.map((n) => n[1] - n[0] + 1);
			if (zeroes.length > 0) {
				const index = zeroLengths.indexOf(Math.max(...zeroLengths));
				groups = compact(this.parsedAddress, zeroes[index]);
			} else groups = this.parsedAddress;
			for (i = 0; i < groups.length; i++) if (groups[i] !== "compact") groups[i] = parseInt(groups[i], 16).toString(16);
			let correct = groups.join(":");
			correct = correct.replace(/^compact$/, "::");
			correct = correct.replace(/(^compact)|(compact$)/, ":");
			correct = correct.replace(/compact/, "");
			return correct;
		}
		binaryZeroPad() {
			return this.bigInt().toString(2).padStart(constants6.BITS, "0");
		}
		parse4in6(address) {
			const groups = address.split(":");
			const address4 = groups.slice(-1)[0].match(constants4.RE_ADDRESS);
			if (address4) {
				this.parsedAddress4 = address4[0];
				this.address4 = new ipv4_1$1.Address4(this.parsedAddress4);
				for (let i = 0; i < this.address4.groups; i++) if (/^0[0-9]+/.test(this.address4.parsedAddress[i])) throw new address_error_1$1.AddressError("IPv4 addresses can't have leading zeroes.", address.replace(constants4.RE_ADDRESS, this.address4.parsedAddress.map(spanLeadingZeroes4).join(".")));
				this.v4 = true;
				groups[groups.length - 1] = this.address4.toGroup6();
				address = groups.join(":");
			}
			return address;
		}
		parse(address) {
			address = this.parse4in6(address);
			const badCharacters = address.match(constants6.RE_BAD_CHARACTERS);
			if (badCharacters) throw new address_error_1$1.AddressError(`Bad character${badCharacters.length > 1 ? "s" : ""} detected in address: ${badCharacters.join("")}`, address.replace(constants6.RE_BAD_CHARACTERS, "<span class=\"parse-error\">$1</span>"));
			const badAddress = address.match(constants6.RE_BAD_ADDRESS);
			if (badAddress) throw new address_error_1$1.AddressError(`Address failed regex: ${badAddress.join("")}`, address.replace(constants6.RE_BAD_ADDRESS, "<span class=\"parse-error\">$1</span>"));
			let groups = [];
			const halves = address.split("::");
			if (halves.length === 2) {
				let first = halves[0].split(":");
				let last = halves[1].split(":");
				if (first.length === 1 && first[0] === "") first = [];
				if (last.length === 1 && last[0] === "") last = [];
				const remaining = this.groups - (first.length + last.length);
				if (!remaining) throw new address_error_1$1.AddressError("Error parsing groups");
				this.elidedGroups = remaining;
				this.elisionBegin = first.length;
				this.elisionEnd = first.length + this.elidedGroups;
				groups = groups.concat(first);
				for (let i = 0; i < remaining; i++) groups.push("0");
				groups = groups.concat(last);
			} else if (halves.length === 1) {
				groups = address.split(":");
				this.elidedGroups = 0;
			} else throw new address_error_1$1.AddressError("Too many :: groups found");
			groups = groups.map((group) => parseInt(group, 16).toString(16));
			if (groups.length !== this.groups) throw new address_error_1$1.AddressError("Incorrect number of groups found");
			return groups;
		}
		canonicalForm() {
			return this.parsedAddress.map(paddedHex).join(":");
		}
		decimal() {
			return this.parsedAddress.map((n) => parseInt(n, 16).toString(10).padStart(5, "0")).join(":");
		}
		bigInt() {
			return BigInt(`0x${this.parsedAddress.map(paddedHex).join("")}`);
		}
		to4() {
			const binary = this.binaryZeroPad().split("");
			return ipv4_1$1.Address4.fromHex(BigInt(`0b${binary.slice(96, 128).join("")}`).toString(16));
		}
		to4in6() {
			const address4 = this.to4();
			const correct = new Address6(this.parsedAddress.slice(0, 6).join(":"), 6).correctForm();
			let infix = "";
			if (!/:$/.test(correct)) infix = ":";
			return correct + infix + address4.address;
		}
		inspectTeredo() {
			const prefix = this.getBitsBase16(0, 32);
			const udpPort = (this.getBits(80, 96) ^ BigInt("0xffff")).toString();
			const server4 = ipv4_1$1.Address4.fromHex(this.getBitsBase16(32, 64));
			const bitsForClient4 = this.getBits(96, 128);
			const client4 = ipv4_1$1.Address4.fromHex((bitsForClient4 ^ BigInt("0xffffffff")).toString(16));
			const flagsBase2 = this.getBitsBase2(64, 80);
			const coneNat = (0, common_1.testBit)(flagsBase2, 15);
			const reserved = (0, common_1.testBit)(flagsBase2, 14);
			const groupIndividual = (0, common_1.testBit)(flagsBase2, 8);
			const universalLocal = (0, common_1.testBit)(flagsBase2, 9);
			const nonce = BigInt(`0b${flagsBase2.slice(2, 6) + flagsBase2.slice(8, 16)}`).toString(10);
			return {
				prefix: `${prefix.slice(0, 4)}:${prefix.slice(4, 8)}`,
				server4: server4.address,
				client4: client4.address,
				flags: flagsBase2,
				coneNat,
				microsoft: {
					reserved,
					universalLocal,
					groupIndividual,
					nonce
				},
				udpPort
			};
		}
		inspect6to4() {
			const prefix = this.getBitsBase16(0, 16);
			const gateway = ipv4_1$1.Address4.fromHex(this.getBitsBase16(16, 48));
			return {
				prefix: prefix.slice(0, 4),
				gateway: gateway.address
			};
		}
		to6to4() {
			if (!this.is4()) return null;
			const addr6to4 = [
				"2002",
				this.getBitsBase16(96, 112),
				this.getBitsBase16(112, 128),
				"",
				"/16"
			].join(":");
			return new Address6(addr6to4);
		}
		toByteArray() {
			const valueWithoutPadding = this.bigInt().toString(16);
			const value = `${"0".repeat(valueWithoutPadding.length % 2)}${valueWithoutPadding}`;
			const bytes = [];
			for (let i = 0, length = value.length; i < length; i += 2) bytes.push(parseInt(value.substring(i, i + 2), 16));
			return bytes;
		}
		toUnsignedByteArray() {
			return this.toByteArray().map(unsignByte);
		}
		static fromByteArray(bytes) {
			return this.fromUnsignedByteArray(bytes.map(unsignByte));
		}
		static fromUnsignedByteArray(bytes) {
			const BYTE_MAX = BigInt("256");
			let result = BigInt("0");
			let multiplier = BigInt("1");
			for (let i = bytes.length - 1; i >= 0; i--) {
				result += multiplier * BigInt(bytes[i].toString(10));
				multiplier *= BYTE_MAX;
			}
			return Address6.fromBigInt(result);
		}
		isCanonical() {
			return this.addressMinusSuffix === this.canonicalForm();
		}
		isLinkLocal() {
			if (this.getBitsBase2(0, 64) === "1111111010000000000000000000000000000000000000000000000000000000") return true;
			return false;
		}
		isMulticast() {
			return this.getType() === "Multicast";
		}
		is4() {
			return this.v4;
		}
		isTeredo() {
			return this.isInSubnet(new Address6("2001::/32"));
		}
		is6to4() {
			return this.isInSubnet(new Address6("2002::/16"));
		}
		isLoopback() {
			return this.getType() === "Loopback";
		}
		href(optionalPort) {
			if (optionalPort === void 0) optionalPort = "";
			else optionalPort = `:${optionalPort}`;
			return `http://[${this.correctForm()}]${optionalPort}/`;
		}
		link(options) {
			if (!options) options = {};
			if (options.className === void 0) options.className = "";
			if (options.prefix === void 0) options.prefix = "/#address=";
			if (options.v4 === void 0) options.v4 = false;
			let formFunction = this.correctForm;
			if (options.v4) formFunction = this.to4in6;
			const form = formFunction.call(this);
			if (options.className) return `<a href="${options.prefix}${form}" class="${options.className}">${form}</a>`;
			return `<a href="${options.prefix}${form}">${form}</a>`;
		}
		group() {
			if (this.elidedGroups === 0) return helpers$1.simpleGroup(this.address).join(":");
			assert(typeof this.elidedGroups === "number");
			assert(typeof this.elisionBegin === "number");
			const output = [];
			const [left, right] = this.address.split("::");
			if (left.length) output.push(...helpers$1.simpleGroup(left));
			else output.push("");
			const classes = ["hover-group"];
			for (let i = this.elisionBegin; i < this.elisionBegin + this.elidedGroups; i++) classes.push(`group-${i}`);
			output.push(`<span class="${classes.join(" ")}"></span>`);
			if (right.length) output.push(...helpers$1.simpleGroup(right, this.elisionEnd));
			else output.push("");
			if (this.is4()) {
				assert(this.address4 instanceof ipv4_1$1.Address4);
				output.pop();
				output.push(this.address4.groupForV6());
			}
			return output.join(":");
		}
		regularExpressionString(substringSearch = false) {
			let output = [];
			const address6 = new Address6(this.correctForm());
			if (address6.elidedGroups === 0) output.push((0, regular_expressions_1.simpleRegularExpression)(address6.parsedAddress));
			else if (address6.elidedGroups === constants6.GROUPS) output.push((0, regular_expressions_1.possibleElisions)(constants6.GROUPS));
			else {
				const halves = address6.address.split("::");
				if (halves[0].length) output.push((0, regular_expressions_1.simpleRegularExpression)(halves[0].split(":")));
				assert(typeof address6.elidedGroups === "number");
				output.push((0, regular_expressions_1.possibleElisions)(address6.elidedGroups, halves[0].length !== 0, halves[1].length !== 0));
				if (halves[1].length) output.push((0, regular_expressions_1.simpleRegularExpression)(halves[1].split(":")));
				output = [output.join(":")];
			}
			if (!substringSearch) output = [
				"(?=^|",
				regular_expressions_1.ADDRESS_BOUNDARY,
				"|[^\\w\\:])(",
				...output,
				")(?=[^\\w\\:]|",
				regular_expressions_1.ADDRESS_BOUNDARY,
				"|$)"
			];
			return output.join("");
		}
		regularExpression(substringSearch = false) {
			return new RegExp(this.regularExpressionString(substringSearch), "i");
		}
	};
}));
var require_ip_address = /* @__PURE__ */ __commonJSMin(((exports) => {
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
			for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
		}
		__setModuleDefault(result, mod);
		return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.v6 = exports.AddressError = exports.Address6 = exports.Address4 = void 0;
	var ipv4_1 = require_ipv4();
	Object.defineProperty(exports, "Address4", {
		enumerable: true,
		get: function() {
			return ipv4_1.Address4;
		}
	});
	var ipv6_1 = require_ipv6();
	Object.defineProperty(exports, "Address6", {
		enumerable: true,
		get: function() {
			return ipv6_1.Address6;
		}
	});
	var address_error_1 = require_address_error();
	Object.defineProperty(exports, "AddressError", {
		enumerable: true,
		get: function() {
			return address_error_1.AddressError;
		}
	});
	exports.v6 = { helpers: __importStar(require_helpers$1()) };
}));
var require_helpers = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var util_1$1 = require_util();
	var constants_1$1 = require_constants$2();
	var stream = __require("stream");
	var ip_address_1$1 = require_ip_address();
	var net$2 = __require("net");
	function validateSocksClientOptions(options, acceptedCommands = [
		"connect",
		"bind",
		"associate"
	]) {
		if (!constants_1$1.SocksCommand[options.command]) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksCommand, options);
		if (acceptedCommands.indexOf(options.command) === -1) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksCommandForOperation, options);
		if (!isValidSocksRemoteHost(options.destination)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsDestination, options);
		if (!isValidSocksProxy(options.proxy)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsProxy, options);
		validateCustomProxyAuth(options.proxy, options);
		if (options.timeout && !isValidTimeoutValue(options.timeout)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsTimeout, options);
		if (options.existing_socket && !(options.existing_socket instanceof stream.Duplex)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsExistingSocket, options);
	}
	exports.validateSocksClientOptions = validateSocksClientOptions;
	function validateSocksClientChainOptions(options) {
		if (options.command !== "connect") throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksCommandChain, options);
		if (!isValidSocksRemoteHost(options.destination)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsDestination, options);
		if (!(options.proxies && Array.isArray(options.proxies) && options.proxies.length >= 2)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsProxiesLength, options);
		options.proxies.forEach((proxy) => {
			if (!isValidSocksProxy(proxy)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsProxy, options);
			validateCustomProxyAuth(proxy, options);
		});
		if (options.timeout && !isValidTimeoutValue(options.timeout)) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsTimeout, options);
	}
	exports.validateSocksClientChainOptions = validateSocksClientChainOptions;
	function validateCustomProxyAuth(proxy, options) {
		if (proxy.custom_auth_method !== void 0) {
			if (proxy.custom_auth_method < constants_1$1.SOCKS5_CUSTOM_AUTH_START || proxy.custom_auth_method > constants_1$1.SOCKS5_CUSTOM_AUTH_END) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsCustomAuthRange, options);
			if (proxy.custom_auth_request_handler === void 0 || typeof proxy.custom_auth_request_handler !== "function") throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
			if (proxy.custom_auth_response_size === void 0) throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
			if (proxy.custom_auth_response_handler === void 0 || typeof proxy.custom_auth_response_handler !== "function") throw new util_1$1.SocksClientError(constants_1$1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
		}
	}
	function isValidSocksRemoteHost(remoteHost) {
		return remoteHost && typeof remoteHost.host === "string" && Buffer.byteLength(remoteHost.host) < 256 && typeof remoteHost.port === "number" && remoteHost.port >= 0 && remoteHost.port <= 65535;
	}
	function isValidSocksProxy(proxy) {
		return proxy && (typeof proxy.host === "string" || typeof proxy.ipaddress === "string") && typeof proxy.port === "number" && proxy.port >= 0 && proxy.port <= 65535 && (proxy.type === 4 || proxy.type === 5);
	}
	function isValidTimeoutValue(value) {
		return typeof value === "number" && value > 0;
	}
	function ipv4ToInt32(ip) {
		return new ip_address_1$1.Address4(ip).toArray().reduce((acc, part) => (acc << 8) + part, 0) >>> 0;
	}
	exports.ipv4ToInt32 = ipv4ToInt32;
	function int32ToIpv4(int32) {
		const octet1 = int32 >>> 24 & 255;
		const octet2 = int32 >>> 16 & 255;
		const octet3 = int32 >>> 8 & 255;
		const octet4 = int32 & 255;
		return [
			octet1,
			octet2,
			octet3,
			octet4
		].join(".");
	}
	exports.int32ToIpv4 = int32ToIpv4;
	function ipToBuffer(ip) {
		if (net$2.isIPv4(ip)) {
			const address = new ip_address_1$1.Address4(ip);
			return Buffer.from(address.toArray());
		} else if (net$2.isIPv6(ip)) {
			const address = new ip_address_1$1.Address6(ip);
			return Buffer.from(address.canonicalForm().split(":").map((segment) => segment.padStart(4, "0")).join(""), "hex");
		} else throw new Error("Invalid IP address format");
	}
	exports.ipToBuffer = ipToBuffer;
}));
var require_receivebuffer = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ReceiveBuffer = class {
		constructor(size = 4096) {
			this.buffer = Buffer.allocUnsafe(size);
			this.offset = 0;
			this.originalSize = size;
		}
		get length() {
			return this.offset;
		}
		append(data) {
			if (!Buffer.isBuffer(data)) throw new Error("Attempted to append a non-buffer instance to ReceiveBuffer.");
			if (this.offset + data.length >= this.buffer.length) {
				const tmp = this.buffer;
				this.buffer = Buffer.allocUnsafe(Math.max(this.buffer.length + this.originalSize, this.buffer.length + data.length));
				tmp.copy(this.buffer);
			}
			data.copy(this.buffer, this.offset);
			return this.offset += data.length;
		}
		peek(length) {
			if (length > this.offset) throw new Error("Attempted to read beyond the bounds of the managed internal data.");
			return this.buffer.slice(0, length);
		}
		get(length) {
			if (length > this.offset) throw new Error("Attempted to read beyond the bounds of the managed internal data.");
			const value = Buffer.allocUnsafe(length);
			this.buffer.slice(0, length).copy(value);
			this.buffer.copyWithin(0, length, length + this.offset - length);
			this.offset -= length;
			return value;
		}
	};
	exports.ReceiveBuffer = ReceiveBuffer;
}));
var require_socksclient = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P ? value : new P(function(resolve) {
				resolve(value);
			});
		}
		return new (P || (P = Promise))(function(resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SocksClientError = exports.SocksClient = void 0;
	var events_1 = __require("events");
	var net$1 = __require("net");
	var smart_buffer_1 = require_smartbuffer();
	var constants_1 = require_constants$2();
	var helpers_1 = require_helpers();
	var receivebuffer_1 = require_receivebuffer();
	var util_1 = require_util();
	Object.defineProperty(exports, "SocksClientError", {
		enumerable: true,
		get: function() {
			return util_1.SocksClientError;
		}
	});
	var ip_address_1 = require_ip_address();
	exports.SocksClient = class SocksClient$1 extends events_1.EventEmitter {
		constructor(options) {
			super();
			this.options = Object.assign({}, options);
			(0, helpers_1.validateSocksClientOptions)(options);
			this.setState(constants_1.SocksClientState.Created);
		}
		static createConnection(options, callback) {
			return new Promise((resolve, reject) => {
				try {
					(0, helpers_1.validateSocksClientOptions)(options, ["connect"]);
				} catch (err) {
					if (typeof callback === "function") {
						callback(err);
						return resolve(err);
					} else return reject(err);
				}
				const client = new SocksClient$1(options);
				client.connect(options.existing_socket);
				client.once("established", (info) => {
					client.removeAllListeners();
					if (typeof callback === "function") {
						callback(null, info);
						resolve(info);
					} else resolve(info);
				});
				client.once("error", (err) => {
					client.removeAllListeners();
					if (typeof callback === "function") {
						callback(err);
						resolve(err);
					} else reject(err);
				});
			});
		}
		static createConnectionChain(options, callback) {
			return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
				try {
					(0, helpers_1.validateSocksClientChainOptions)(options);
				} catch (err) {
					if (typeof callback === "function") {
						callback(err);
						return resolve(err);
					} else return reject(err);
				}
				if (options.randomizeChain) (0, util_1.shuffleArray)(options.proxies);
				try {
					let sock;
					for (let i = 0; i < options.proxies.length; i++) {
						const nextProxy = options.proxies[i];
						const nextDestination = i === options.proxies.length - 1 ? options.destination : {
							host: options.proxies[i + 1].host || options.proxies[i + 1].ipaddress,
							port: options.proxies[i + 1].port
						};
						const result = yield SocksClient$1.createConnection({
							command: "connect",
							proxy: nextProxy,
							destination: nextDestination,
							existing_socket: sock
						});
						sock = sock || result.socket;
					}
					if (typeof callback === "function") {
						callback(null, { socket: sock });
						resolve({ socket: sock });
					} else resolve({ socket: sock });
				} catch (err) {
					if (typeof callback === "function") {
						callback(err);
						resolve(err);
					} else reject(err);
				}
			}));
		}
		static createUDPFrame(options) {
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt16BE(0);
			buff.writeUInt8(options.frameNumber || 0);
			if (net$1.isIPv4(options.remoteHost.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv4);
				buff.writeUInt32BE((0, helpers_1.ipv4ToInt32)(options.remoteHost.host));
			} else if (net$1.isIPv6(options.remoteHost.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv6);
				buff.writeBuffer((0, helpers_1.ipToBuffer)(options.remoteHost.host));
			} else {
				buff.writeUInt8(constants_1.Socks5HostType.Hostname);
				buff.writeUInt8(Buffer.byteLength(options.remoteHost.host));
				buff.writeString(options.remoteHost.host);
			}
			buff.writeUInt16BE(options.remoteHost.port);
			buff.writeBuffer(options.data);
			return buff.toBuffer();
		}
		static parseUDPFrame(data) {
			const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
			buff.readOffset = 2;
			const frameNumber = buff.readUInt8();
			const hostType = buff.readUInt8();
			let remoteHost;
			if (hostType === constants_1.Socks5HostType.IPv4) remoteHost = (0, helpers_1.int32ToIpv4)(buff.readUInt32BE());
			else if (hostType === constants_1.Socks5HostType.IPv6) remoteHost = ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm();
			else remoteHost = buff.readString(buff.readUInt8());
			const remotePort = buff.readUInt16BE();
			return {
				frameNumber,
				remoteHost: {
					host: remoteHost,
					port: remotePort
				},
				data: buff.readBuffer()
			};
		}
		setState(newState) {
			if (this.state !== constants_1.SocksClientState.Error) this.state = newState;
		}
		connect(existingSocket) {
			this.onDataReceived = (data) => this.onDataReceivedHandler(data);
			this.onClose = () => this.onCloseHandler();
			this.onError = (err) => this.onErrorHandler(err);
			this.onConnect = () => this.onConnectHandler();
			const timer = setTimeout(() => this.onEstablishedTimeout(), this.options.timeout || constants_1.DEFAULT_TIMEOUT);
			if (timer.unref && typeof timer.unref === "function") timer.unref();
			if (existingSocket) this.socket = existingSocket;
			else this.socket = new net$1.Socket();
			this.socket.once("close", this.onClose);
			this.socket.once("error", this.onError);
			this.socket.once("connect", this.onConnect);
			this.socket.on("data", this.onDataReceived);
			this.setState(constants_1.SocksClientState.Connecting);
			this.receiveBuffer = new receivebuffer_1.ReceiveBuffer();
			if (existingSocket) this.socket.emit("connect");
			else {
				this.socket.connect(this.getSocketOptions());
				if (this.options.set_tcp_nodelay !== void 0 && this.options.set_tcp_nodelay !== null) this.socket.setNoDelay(!!this.options.set_tcp_nodelay);
			}
			this.prependOnceListener("established", (info) => {
				setImmediate(() => {
					if (this.receiveBuffer.length > 0) {
						const excessData = this.receiveBuffer.get(this.receiveBuffer.length);
						info.socket.emit("data", excessData);
					}
					info.socket.resume();
				});
			});
		}
		getSocketOptions() {
			return Object.assign(Object.assign({}, this.options.socket_options), {
				host: this.options.proxy.host || this.options.proxy.ipaddress,
				port: this.options.proxy.port
			});
		}
		onEstablishedTimeout() {
			if (this.state !== constants_1.SocksClientState.Established && this.state !== constants_1.SocksClientState.BoundWaitingForConnection) this.closeSocket(constants_1.ERRORS.ProxyConnectionTimedOut);
		}
		onConnectHandler() {
			this.setState(constants_1.SocksClientState.Connected);
			if (this.options.proxy.type === 4) this.sendSocks4InitialHandshake();
			else this.sendSocks5InitialHandshake();
			this.setState(constants_1.SocksClientState.SentInitialHandshake);
		}
		onDataReceivedHandler(data) {
			this.receiveBuffer.append(data);
			this.processData();
		}
		processData() {
			while (this.state !== constants_1.SocksClientState.Established && this.state !== constants_1.SocksClientState.Error && this.receiveBuffer.length >= this.nextRequiredPacketBufferSize) if (this.state === constants_1.SocksClientState.SentInitialHandshake) if (this.options.proxy.type === 4) this.handleSocks4FinalHandshakeResponse();
			else this.handleInitialSocks5HandshakeResponse();
			else if (this.state === constants_1.SocksClientState.SentAuthentication) this.handleInitialSocks5AuthenticationHandshakeResponse();
			else if (this.state === constants_1.SocksClientState.SentFinalHandshake) this.handleSocks5FinalHandshakeResponse();
			else if (this.state === constants_1.SocksClientState.BoundWaitingForConnection) if (this.options.proxy.type === 4) this.handleSocks4IncomingConnectionResponse();
			else this.handleSocks5IncomingConnectionResponse();
			else {
				this.closeSocket(constants_1.ERRORS.InternalError);
				break;
			}
		}
		onCloseHandler() {
			this.closeSocket(constants_1.ERRORS.SocketClosed);
		}
		onErrorHandler(err) {
			this.closeSocket(err.message);
		}
		removeInternalSocketHandlers() {
			this.socket.pause();
			this.socket.removeListener("data", this.onDataReceived);
			this.socket.removeListener("close", this.onClose);
			this.socket.removeListener("error", this.onError);
			this.socket.removeListener("connect", this.onConnect);
		}
		closeSocket(err) {
			if (this.state !== constants_1.SocksClientState.Error) {
				this.setState(constants_1.SocksClientState.Error);
				this.socket.destroy();
				this.removeInternalSocketHandlers();
				this.emit("error", new util_1.SocksClientError(err, this.options));
			}
		}
		sendSocks4InitialHandshake() {
			const userId = this.options.proxy.userId || "";
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt8(4);
			buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
			buff.writeUInt16BE(this.options.destination.port);
			if (net$1.isIPv4(this.options.destination.host)) {
				buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
				buff.writeStringNT(userId);
			} else {
				buff.writeUInt8(0);
				buff.writeUInt8(0);
				buff.writeUInt8(0);
				buff.writeUInt8(1);
				buff.writeStringNT(userId);
				buff.writeStringNT(this.options.destination.host);
			}
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks4Response;
			this.socket.write(buff.toBuffer());
		}
		handleSocks4FinalHandshakeResponse() {
			const data = this.receiveBuffer.get(8);
			if (data[1] !== constants_1.Socks4Response.Granted) this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedConnection} - (${constants_1.Socks4Response[data[1]]})`);
			else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
				const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
				buff.readOffset = 2;
				const remoteHost = {
					port: buff.readUInt16BE(),
					host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE())
				};
				if (remoteHost.host === "0.0.0.0") remoteHost.host = this.options.proxy.ipaddress;
				this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
				this.emit("bound", {
					remoteHost,
					socket: this.socket
				});
			} else {
				this.setState(constants_1.SocksClientState.Established);
				this.removeInternalSocketHandlers();
				this.emit("established", { socket: this.socket });
			}
		}
		handleSocks4IncomingConnectionResponse() {
			const data = this.receiveBuffer.get(8);
			if (data[1] !== constants_1.Socks4Response.Granted) this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedIncomingBoundConnection} - (${constants_1.Socks4Response[data[1]]})`);
			else {
				const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
				buff.readOffset = 2;
				const remoteHost = {
					port: buff.readUInt16BE(),
					host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE())
				};
				this.setState(constants_1.SocksClientState.Established);
				this.removeInternalSocketHandlers();
				this.emit("established", {
					remoteHost,
					socket: this.socket
				});
			}
		}
		sendSocks5InitialHandshake() {
			const buff = new smart_buffer_1.SmartBuffer();
			const supportedAuthMethods = [constants_1.Socks5Auth.NoAuth];
			if (this.options.proxy.userId || this.options.proxy.password) supportedAuthMethods.push(constants_1.Socks5Auth.UserPass);
			if (this.options.proxy.custom_auth_method !== void 0) supportedAuthMethods.push(this.options.proxy.custom_auth_method);
			buff.writeUInt8(5);
			buff.writeUInt8(supportedAuthMethods.length);
			for (const authMethod of supportedAuthMethods) buff.writeUInt8(authMethod);
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5InitialHandshakeResponse;
			this.socket.write(buff.toBuffer());
			this.setState(constants_1.SocksClientState.SentInitialHandshake);
		}
		handleInitialSocks5HandshakeResponse() {
			const data = this.receiveBuffer.get(2);
			if (data[0] !== 5) this.closeSocket(constants_1.ERRORS.InvalidSocks5IntiailHandshakeSocksVersion);
			else if (data[1] === constants_1.SOCKS5_NO_ACCEPTABLE_AUTH) this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeNoAcceptedAuthType);
			else if (data[1] === constants_1.Socks5Auth.NoAuth) {
				this.socks5ChosenAuthType = constants_1.Socks5Auth.NoAuth;
				this.sendSocks5CommandRequest();
			} else if (data[1] === constants_1.Socks5Auth.UserPass) {
				this.socks5ChosenAuthType = constants_1.Socks5Auth.UserPass;
				this.sendSocks5UserPassAuthentication();
			} else if (data[1] === this.options.proxy.custom_auth_method) {
				this.socks5ChosenAuthType = this.options.proxy.custom_auth_method;
				this.sendSocks5CustomAuthentication();
			} else this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeUnknownAuthType);
		}
		sendSocks5UserPassAuthentication() {
			const userId = this.options.proxy.userId || "";
			const password = this.options.proxy.password || "";
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt8(1);
			buff.writeUInt8(Buffer.byteLength(userId));
			buff.writeString(userId);
			buff.writeUInt8(Buffer.byteLength(password));
			buff.writeString(password);
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5UserPassAuthenticationResponse;
			this.socket.write(buff.toBuffer());
			this.setState(constants_1.SocksClientState.SentAuthentication);
		}
		sendSocks5CustomAuthentication() {
			return __awaiter(this, void 0, void 0, function* () {
				this.nextRequiredPacketBufferSize = this.options.proxy.custom_auth_response_size;
				this.socket.write(yield this.options.proxy.custom_auth_request_handler());
				this.setState(constants_1.SocksClientState.SentAuthentication);
			});
		}
		handleSocks5CustomAuthHandshakeResponse(data) {
			return __awaiter(this, void 0, void 0, function* () {
				return yield this.options.proxy.custom_auth_response_handler(data);
			});
		}
		handleSocks5AuthenticationNoAuthHandshakeResponse(data) {
			return __awaiter(this, void 0, void 0, function* () {
				return data[1] === 0;
			});
		}
		handleSocks5AuthenticationUserPassHandshakeResponse(data) {
			return __awaiter(this, void 0, void 0, function* () {
				return data[1] === 0;
			});
		}
		handleInitialSocks5AuthenticationHandshakeResponse() {
			return __awaiter(this, void 0, void 0, function* () {
				this.setState(constants_1.SocksClientState.ReceivedAuthenticationResponse);
				let authResult = false;
				if (this.socks5ChosenAuthType === constants_1.Socks5Auth.NoAuth) authResult = yield this.handleSocks5AuthenticationNoAuthHandshakeResponse(this.receiveBuffer.get(2));
				else if (this.socks5ChosenAuthType === constants_1.Socks5Auth.UserPass) authResult = yield this.handleSocks5AuthenticationUserPassHandshakeResponse(this.receiveBuffer.get(2));
				else if (this.socks5ChosenAuthType === this.options.proxy.custom_auth_method) authResult = yield this.handleSocks5CustomAuthHandshakeResponse(this.receiveBuffer.get(this.options.proxy.custom_auth_response_size));
				if (!authResult) this.closeSocket(constants_1.ERRORS.Socks5AuthenticationFailed);
				else this.sendSocks5CommandRequest();
			});
		}
		sendSocks5CommandRequest() {
			const buff = new smart_buffer_1.SmartBuffer();
			buff.writeUInt8(5);
			buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
			buff.writeUInt8(0);
			if (net$1.isIPv4(this.options.destination.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv4);
				buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
			} else if (net$1.isIPv6(this.options.destination.host)) {
				buff.writeUInt8(constants_1.Socks5HostType.IPv6);
				buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
			} else {
				buff.writeUInt8(constants_1.Socks5HostType.Hostname);
				buff.writeUInt8(this.options.destination.host.length);
				buff.writeString(this.options.destination.host);
			}
			buff.writeUInt16BE(this.options.destination.port);
			this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
			this.socket.write(buff.toBuffer());
			this.setState(constants_1.SocksClientState.SentFinalHandshake);
		}
		handleSocks5FinalHandshakeResponse() {
			const header = this.receiveBuffer.peek(5);
			if (header[0] !== 5 || header[1] !== constants_1.Socks5Response.Granted) this.closeSocket(`${constants_1.ERRORS.InvalidSocks5FinalHandshakeRejected} - ${constants_1.Socks5Response[header[1]]}`);
			else {
				const addressType = header[3];
				let remoteHost;
				let buff;
				if (addressType === constants_1.Socks5HostType.IPv4) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
						port: buff.readUInt16BE()
					};
					if (remoteHost.host === "0.0.0.0") remoteHost.host = this.options.proxy.ipaddress;
				} else if (addressType === constants_1.Socks5HostType.Hostname) {
					const hostLength = header[4];
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength);
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
					remoteHost = {
						host: buff.readString(hostLength),
						port: buff.readUInt16BE()
					};
				} else if (addressType === constants_1.Socks5HostType.IPv6) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
						port: buff.readUInt16BE()
					};
				}
				this.setState(constants_1.SocksClientState.ReceivedFinalResponse);
				if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.connect) {
					this.setState(constants_1.SocksClientState.Established);
					this.removeInternalSocketHandlers();
					this.emit("established", {
						remoteHost,
						socket: this.socket
					});
				} else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
					this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
					this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
					this.emit("bound", {
						remoteHost,
						socket: this.socket
					});
				} else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.associate) {
					this.setState(constants_1.SocksClientState.Established);
					this.removeInternalSocketHandlers();
					this.emit("established", {
						remoteHost,
						socket: this.socket
					});
				}
			}
		}
		handleSocks5IncomingConnectionResponse() {
			const header = this.receiveBuffer.peek(5);
			if (header[0] !== 5 || header[1] !== constants_1.Socks5Response.Granted) this.closeSocket(`${constants_1.ERRORS.Socks5ProxyRejectedIncomingBoundConnection} - ${constants_1.Socks5Response[header[1]]}`);
			else {
				const addressType = header[3];
				let remoteHost;
				let buff;
				if (addressType === constants_1.Socks5HostType.IPv4) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
						port: buff.readUInt16BE()
					};
					if (remoteHost.host === "0.0.0.0") remoteHost.host = this.options.proxy.ipaddress;
				} else if (addressType === constants_1.Socks5HostType.Hostname) {
					const hostLength = header[4];
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength);
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
					remoteHost = {
						host: buff.readString(hostLength),
						port: buff.readUInt16BE()
					};
				} else if (addressType === constants_1.Socks5HostType.IPv6) {
					const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
					if (this.receiveBuffer.length < dataNeeded) {
						this.nextRequiredPacketBufferSize = dataNeeded;
						return;
					}
					buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
					remoteHost = {
						host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
						port: buff.readUInt16BE()
					};
				}
				this.setState(constants_1.SocksClientState.Established);
				this.removeInternalSocketHandlers();
				this.emit("established", {
					remoteHost,
					socket: this.socket
				});
			}
		}
		get socksClientOptions() {
			return Object.assign({}, this.options);
		}
	};
}));
var import_build = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
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
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(require_socksclient(), exports);
})))());
var import_is = /* @__PURE__ */ __toESM(require_is());
var parseSocksUrl = (socksUrl) => {
	const url = new URL(socksUrl);
	return {
		host: url.hostname,
		port: parseInt(url.port, 10),
		type: url.protocol === "socks5:" ? 5 : 4,
		username: url.username,
		password: url.password
	};
};
const backend = createBackend({
	async start(ctx) {
		const pluginConfig = await ctx.getConfig();
		this.startServer(pluginConfig);
	},
	stop() {
		this.stopServer();
	},
	onConfigChange(config) {
		if (this.oldConfig?.hostname === config.hostname && this.oldConfig?.port === config.port) {
			this.oldConfig = config;
			return;
		}
		this.stopServer();
		this.startServer(config);
		this.oldConfig = config;
	},
	startServer(serverConfig) {
		if (this.server) this.stopServer();
		const { port, hostname } = serverConfig;
		const upstreamProxyUrl = get("options.proxy");
		const socksServer = net.createServer((socket) => {
			socket.once("data", (chunk) => {
				if (chunk[0] === 5) this.handleSocks5(socket, chunk, upstreamProxyUrl);
				else socket.end();
			});
			socket.on("error", (err) => {
				console.error(LoggerPrefix, "[SOCKS] Socket error:", err.message);
			});
		});
		socksServer.on("error", (err) => {
			console.error(LoggerPrefix, "[SOCKS Server Error]", err.message);
		});
		socksServer.listen(port, hostname, () => {
			console.log(LoggerPrefix, "===========================================");
			console.log(LoggerPrefix, `[Auth-Proxy-Adapter] Enable SOCKS proxy at socks5://${hostname}:${port}`);
			console.log(LoggerPrefix, `[Auth-Proxy-Adapter] Using upstream proxy: ${upstreamProxyUrl}`);
			console.log(LoggerPrefix, "===========================================");
		});
		this.server = socksServer;
	},
	handleSocks5(clientSocket, chunk, upstreamProxyUrl) {
		const numMethods = chunk[1];
		if (chunk.subarray(2, 2 + numMethods).includes(0)) {
			clientSocket.write(Buffer.from([5, 0]));
			clientSocket.once("data", (data) => {
				this.processSocks5Request(clientSocket, data, upstreamProxyUrl);
			});
		} else {
			clientSocket.write(Buffer.from([5, 255]));
			clientSocket.end();
		}
	},
	processSocks5Request(clientSocket, data, upstreamProxyUrl) {
		let targetHost, targetPort;
		const cmd = data[1];
		const atyp = data[3];
		if (cmd !== 1) {
			clientSocket.write(Buffer.from([
				5,
				7,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0
			]));
			clientSocket.end();
			return;
		}
		if (atyp === 1) {
			targetHost = `${data[4]}.${data[5]}.${data[6]}.${data[7]}`;
			targetPort = data.readUInt16BE(8);
		} else if (atyp === 3) {
			const hostLen = data[4];
			targetHost = data.subarray(5, 5 + hostLen).toString();
			targetPort = data.readUInt16BE(5 + hostLen);
		} else if (atyp === 4) {
			const ipv6Buffer = data.subarray(4, 20);
			targetHost = Array.from(new Array(8), (_, i) => ipv6Buffer.readUInt16BE(i * 2).toString(16)).join(":");
			targetPort = data.readUInt16BE(20);
		}
		if (import_is.default.dev()) console.debug(LoggerPrefix, `[SOCKS5] Request to connect to ${targetHost}:${targetPort}`);
		const socksProxy = parseSocksUrl(upstreamProxyUrl);
		if (!socksProxy) {
			clientSocket.write(Buffer.from([
				5,
				1,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0
			]));
			clientSocket.end();
			return;
		}
		const options = {
			proxy: {
				host: socksProxy.host,
				port: socksProxy.port,
				type: socksProxy.type,
				userId: socksProxy.username,
				password: socksProxy.password
			},
			command: "connect",
			destination: {
				host: targetHost || defaultAuthProxyConfig.hostname,
				port: targetPort || defaultAuthProxyConfig.port
			}
		};
		import_build.SocksClient.createConnection(options).then((info) => {
			const { socket: proxySocket } = info;
			const responseBuffer = Buffer.from([
				5,
				0,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0
			]);
			clientSocket.write(responseBuffer);
			proxySocket.pipe(clientSocket);
			clientSocket.pipe(proxySocket);
			proxySocket.on("error", (error) => {
				console.error(LoggerPrefix, "[SOCKS5] Proxy socket error:", error);
				if (clientSocket.writable) clientSocket.end();
			});
			clientSocket.on("error", (error) => {
				console.error(LoggerPrefix, "[SOCKS5] Client socket error:", error);
				if (proxySocket.writable) proxySocket.end();
			});
		}).catch((error) => {
			console.error(LoggerPrefix, "[SOCKS5] Connection error:", error);
			clientSocket.write(Buffer.from([
				5,
				5,
				0,
				1,
				0,
				0,
				0,
				0,
				0,
				0
			]));
			clientSocket.end();
		});
	},
	stopServer() {
		if (this.server) {
			this.server.close();
			this.server = void 0;
		}
	}
});
var auth_proxy_adapter_default = createPlugin({
	name: () => t("plugins.auth-proxy-adapter.name"),
	description: () => t("plugins.auth-proxy-adapter.description"),
	restartNeeded: true,
	config: defaultAuthProxyConfig,
	addedVersion: "3.10.X",
	menu: onMenu,
	backend
});
const pluginStub = {
	name: () => t("plugins.auth-proxy-adapter.name"),
	description: () => t("plugins.auth-proxy-adapter.description"),
	restartNeeded: true,
	config: defaultAuthProxyConfig,
	addedVersion: "3.10.X",
	menu: onMenu
};
export { auth_proxy_adapter_default as default, pluginStub };
