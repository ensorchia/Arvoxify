import { r as __export, s as __toESM } from "./chunk-0rTXi_Jc.js";
import "./is-DL8kkJAd.js";
import "./config-n3n9Pwqt.js";
import { c as t, n as createBackend, r as createPlugin } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { a as registerCallback, n as SongInfoEvent, t as MediaType } from "./song-info-BTWNuwrN.js";
import { n as LikeType, t as getSongControls } from "./song-controls-DP9OiftJ.js";
import { a as raw, c as decodeURIComponent_, i as escapeToBuffer, l as mergePath, n as cors, o as resolveCallbackSync, r as Hono, s as stringBufferToString, t as serve, u as tryDecode } from "./dist-D2dATDYX.js";
import { $ as ZodSymbol, A as ZodKSUID, B as ZodNumber, C as ZodFile, D as ZodIPv6, E as ZodIPv4, F as ZodNanoID, G as ZodPrefault, H as ZodObject, I as ZodNever, J as ZodRecord, K as ZodPromise, L as ZodNonOptional, M as ZodLiteral, N as ZodMap, O as ZodIntersection, P as ZodNaN, Q as ZodSuccess, R as ZodNull, S as ZodEnum, T as ZodGUID, U as ZodOptional, V as ZodNumberFormat, W as ZodPipe, X as ZodString, Y as ZodSet, Z as ZodStringFormat, _ as ZodDefault, a as ZodBigInt, b as ZodEmail, c as ZodCIDRv4, d as ZodCUID2, f as ZodCatch, g as ZodDate, h as ZodCustomStringFormat, i as ZodBase64URL, ia as clone, ic as NEVER, ie as regexes_exports, ii as treeifyError, il as config, in as formatError, io as util_exports, ir as prettifyError, is as $brand, it as flattenError, j as ZodLazy, k as ZodJWT, l as ZodCIDRv6, m as ZodCustom, n as ZodArray, n$ as safeDecode, nA as success, nB as unknown, nC as record, nD as string$1, nE as strictObject, nF as tuple, nG as uuidv7, nH as uuid, nI as uint32, nJ as decodeAsync, nK as xid, nL as uint64, nM as symbol, nN as templateLiteral, nO as stringFormat, nP as transform, nQ as parseAsync, nR as ulid, nS as readonly, nT as set, nU as uuidv4, nV as url, nW as uuidv6, nX as encodeAsync, nY as encode, nZ as parse$1, n_ as partialRecord, na as looseObject, nb as preprocess, nc as nanoid, nd as nonoptional, ne as jwt$1, nf as nullable, ng as optional, nh as object, ni as literal, nj as superRefine, nk as stringbool, nl as nativeEnum, nm as number$1, nn as ksuid, no as map, np as nullish, nq as decode$2, nr as lazy, ns as nan, nt as keyof, nu as never, nv as pipe, nw as refine, nx as promise, ny as prefault, nz as union, o as ZodBigIntFormat, p as ZodCodec, q as ZodReadonly, r as ZodBase64, r$ as en_default, rA as _mime, rB as _property, rC as _includes, rD as _lte, rE as _lt, rF as _nonnegative, rG as _toUpperCase, rH as _size, rI as _nonpositive, rJ as $input, rK as _trim, rL as _normalize, rM as _minSize, rN as _multipleOf, rO as _maxLength, rP as _negative, rQ as locales_exports, rR as _overwrite, rS as _gte, rT as _lowercase, rU as _startsWith, rV as _regex, rW as _toLowerCase, rX as globalRegistry, rY as $output, rZ as registry, r_ as _coercedDate, ra as ZodError, rb as _endsWith, rc as ZodISODateTime, rd as iso_exports, re as safeDecodeAsync, rf as core_exports, rg as _coercedBoolean, rh as _coercedBigint, ri as safeParseAsync, rj as _minLength, rk as _maxSize, rl as ZodISODuration, rm as TimePrecision, rn as safeEncodeAsync, ro as ZodRealError, rp as toJSONSchema, rq as _uppercase, rr as safeParse, rs as ZodISODate, rt as safeEncode, ru as ZodISOTime, rv as _coercedNumber, rw as _length, rx as _gt, ry as _coercedString, rz as _positive, s as ZodBoolean, t as ZodAny, t$ as json, tA as codec, tB as float32, tC as base64, tD as check, tE as boolean$1, tF as discriminatedUnion, tG as hostname, tH as guid, tI as e164, tJ as int32, tK as httpUrl, tL as email, tM as cuid2, tN as custom, tO as cidrv4, tP as date$1, tQ as ipv6, tR as emoji, tS as array, tT as bigint$1, tU as hash, tV as float64, tW as hex, tX as intersection, tY as int64, tZ as ipv4, t_ as _instanceof, ta as ZodURL, tb as _void, tc as ZodUnion, td as ZodXID, te as ZodTemplateLiteral, tf as _ZodString, tg as _function, th as _enum, ti as ZodULID, tj as cuid, tk as cidrv6, tl as ZodUnknown, tm as _default, tn as ZodTuple, to as ZodUUID, tp as _catch, tq as int, tr as ZodType, ts as ZodUndefined, tt as ZodTransform, tu as ZodVoid, tv as _null, tw as base64url, tx as any, ty as _undefined, tz as file, u as ZodCUID, v as ZodDiscriminatedUnion, w as ZodFunction, x as ZodEmoji, y as ZodE164, z as ZodNullable } from "./schemas-BI4xZiF3.js";
import { a as require_receiver, i as require_sender, n as require_stream, r as require_websocket, t as require_websocket_server } from "./websocket-server-1m364-Tj.js";
import { dialog, ipcMain } from "electron";
import prompt from "custom-electron-prompt";
let AuthStrategy = /* @__PURE__ */ function(AuthStrategy$1) {
	AuthStrategy$1["AUTH_AT_FIRST"] = "AUTH_AT_FIRST";
	AuthStrategy$1["NONE"] = "NONE";
	return AuthStrategy$1;
}({});
const defaultAPIServerConfig = {
	enabled: false,
	hostname: "0.0.0.0",
	port: 26538,
	authStrategy: AuthStrategy.AUTH_AT_FIRST,
	secret: Date.now().toString(36),
	authorizedClients: []
};
const onMenu = async ({ getConfig, setConfig, window }) => {
	const config$1 = await getConfig();
	return [
		{
			label: t("plugins.api-server.menu.hostname.label"),
			type: "normal",
			async click() {
				const config$2 = await getConfig();
				const newHostname = await prompt({
					title: t("plugins.api-server.prompt.hostname.title"),
					label: t("plugins.api-server.prompt.hostname.label"),
					value: config$2.hostname,
					type: "input",
					width: 380,
					...prompt_options_default()
				}, window) ?? config$2.hostname ?? defaultAPIServerConfig.hostname;
				setConfig({
					...config$2,
					hostname: newHostname
				});
			}
		},
		{
			label: t("plugins.api-server.menu.port.label"),
			type: "normal",
			async click() {
				const config$2 = await getConfig();
				const newPort = await prompt({
					title: t("plugins.api-server.prompt.port.title"),
					label: t("plugins.api-server.prompt.port.label"),
					value: config$2.port,
					type: "counter",
					counterOptions: {
						minimum: 0,
						maximum: 65565
					},
					width: 380,
					...prompt_options_default()
				}, window) ?? config$2.port ?? defaultAPIServerConfig.port;
				setConfig({
					...config$2,
					port: newPort
				});
			}
		},
		{
			label: t("plugins.api-server.menu.auth-strategy.label"),
			type: "submenu",
			submenu: [{
				label: t("plugins.api-server.menu.auth-strategy.submenu.auth-at-first.label"),
				type: "radio",
				checked: config$1.authStrategy === AuthStrategy.AUTH_AT_FIRST,
				click() {
					setConfig({
						...config$1,
						authStrategy: AuthStrategy.AUTH_AT_FIRST
					});
				}
			}, {
				label: t("plugins.api-server.menu.auth-strategy.submenu.none.label"),
				type: "radio",
				checked: config$1.authStrategy === AuthStrategy.NONE,
				click() {
					setConfig({
						...config$1,
						authStrategy: AuthStrategy.NONE
					});
				}
			}]
		}
	];
};
var algorithm = {
	name: "HMAC",
	hash: "SHA-256"
};
var getCryptoKey = async (secret) => {
	const secretBuf = typeof secret === "string" ? new TextEncoder().encode(secret) : secret;
	return await crypto.subtle.importKey("raw", secretBuf, algorithm, false, ["sign", "verify"]);
};
var verifySignature = async (base64Signature, value, secret) => {
	try {
		const signatureBinStr = atob(base64Signature);
		const signature = new Uint8Array(signatureBinStr.length);
		for (let i = 0, len = signatureBinStr.length; i < len; i++) signature[i] = signatureBinStr.charCodeAt(i);
		return await crypto.subtle.verify(algorithm, secret, signature, new TextEncoder().encode(value));
	} catch {
		return false;
	}
};
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var parse = (cookie, name) => {
	if (name && cookie.indexOf(name) === -1) return {};
	const pairs = cookie.trim().split(";");
	const parsedCookie = {};
	for (let pairStr of pairs) {
		pairStr = pairStr.trim();
		const valueStartPos = pairStr.indexOf("=");
		if (valueStartPos === -1) continue;
		const cookieName = pairStr.substring(0, valueStartPos).trim();
		if (name && name !== cookieName || !validCookieNameRegEx.test(cookieName)) continue;
		let cookieValue = pairStr.substring(valueStartPos + 1).trim();
		if (cookieValue.startsWith("\"") && cookieValue.endsWith("\"")) cookieValue = cookieValue.slice(1, -1);
		if (validCookieValueRegEx.test(cookieValue)) {
			parsedCookie[cookieName] = cookieValue.indexOf("%") !== -1 ? tryDecode(cookieValue, decodeURIComponent_) : cookieValue;
			if (name) break;
		}
	}
	return parsedCookie;
};
var parseSigned = async (cookie, secret, name) => {
	const parsedCookie = {};
	const secretKey = await getCryptoKey(secret);
	for (const [key, value] of Object.entries(parse(cookie, name))) {
		const signatureStartPos = value.lastIndexOf(".");
		if (signatureStartPos < 1) continue;
		const signedValue = value.substring(0, signatureStartPos);
		const signature = value.substring(signatureStartPos + 1);
		if (signature.length !== 44 || !signature.endsWith("=")) continue;
		parsedCookie[key] = await verifySignature(signature, signedValue, secretKey) ? signedValue : false;
	}
	return parsedCookie;
};
var getCookie = (c, key, prefix) => {
	const cookie = c.req.raw.headers.get("Cookie");
	if (typeof key === "string") {
		if (!cookie) return;
		let finalKey = key;
		if (prefix === "secure") finalKey = "__Secure-" + key;
		else if (prefix === "host") finalKey = "__Host-" + key;
		return parse(cookie, finalKey)[finalKey];
	}
	if (!cookie) return {};
	return parse(cookie);
};
var getSignedCookie = async (c, secret, key, prefix) => {
	const cookie = c.req.raw.headers.get("Cookie");
	if (typeof key === "string") {
		if (!cookie) return;
		let finalKey = key;
		if (prefix === "secure") finalKey = "__Secure-" + key;
		else if (prefix === "host") finalKey = "__Host-" + key;
		return (await parseSigned(cookie, secret, finalKey))[finalKey];
	}
	if (!cookie) return {};
	return await parseSigned(cookie, secret);
};
var HTTPException = class extends Error {
	res;
	status;
	constructor(status = 500, options) {
		super(options?.message, { cause: options?.cause });
		this.res = options?.res;
		this.status = status;
	}
	getResponse() {
		if (this.res) return new Response(this.res.body, {
			status: this.status,
			headers: this.res.headers
		});
		return new Response(this.message, { status: this.status });
	}
};
var decodeBase64Url = (str) => {
	return decodeBase64(str.replace(/_|-/g, (m) => ({
		_: "/",
		"-": "+"
	})[m] ?? m));
};
var encodeBase64Url = (buf) => encodeBase64(buf).replace(/\/|\+/g, (m) => ({
	"/": "_",
	"+": "-"
})[m] ?? m);
var encodeBase64 = (buf) => {
	let binary = "";
	const bytes = new Uint8Array(buf);
	for (let i = 0, len = bytes.length; i < len; i++) binary += String.fromCharCode(bytes[i]);
	return btoa(binary);
};
var decodeBase64 = (str) => {
	const binary = atob(str);
	const bytes = new Uint8Array(new ArrayBuffer(binary.length));
	const half = binary.length / 2;
	for (let i = 0, j = binary.length - 1; i <= half; i++, j--) {
		bytes[i] = binary.charCodeAt(i);
		bytes[j] = binary.charCodeAt(j);
	}
	return bytes;
};
var AlgorithmTypes = /* @__PURE__ */ ((AlgorithmTypes2) => {
	AlgorithmTypes2["HS256"] = "HS256";
	AlgorithmTypes2["HS384"] = "HS384";
	AlgorithmTypes2["HS512"] = "HS512";
	AlgorithmTypes2["RS256"] = "RS256";
	AlgorithmTypes2["RS384"] = "RS384";
	AlgorithmTypes2["RS512"] = "RS512";
	AlgorithmTypes2["PS256"] = "PS256";
	AlgorithmTypes2["PS384"] = "PS384";
	AlgorithmTypes2["PS512"] = "PS512";
	AlgorithmTypes2["ES256"] = "ES256";
	AlgorithmTypes2["ES384"] = "ES384";
	AlgorithmTypes2["ES512"] = "ES512";
	AlgorithmTypes2["EdDSA"] = "EdDSA";
	return AlgorithmTypes2;
})(AlgorithmTypes || {});
var knownUserAgents = {
	deno: "Deno",
	bun: "Bun",
	workerd: "Cloudflare-Workers",
	node: "Node.js"
};
var getRuntimeKey = () => {
	const global = globalThis;
	if (typeof navigator !== "undefined" && typeof navigator.userAgent === "string") {
		for (const [runtimeKey, userAgent] of Object.entries(knownUserAgents)) if (checkUserAgentEquals(userAgent)) return runtimeKey;
	}
	if (typeof global?.EdgeRuntime === "string") return "edge-light";
	if (global?.fastly !== void 0) return "fastly";
	if (global?.process?.release?.name === "node") return "node";
	return "other";
};
var checkUserAgentEquals = (platform) => {
	return navigator.userAgent.startsWith(platform);
};
var JwtAlgorithmNotImplemented = class extends Error {
	constructor(alg) {
		super(`${alg} is not an implemented algorithm`);
		this.name = "JwtAlgorithmNotImplemented";
	}
};
var JwtTokenInvalid = class extends Error {
	constructor(token) {
		super(`invalid JWT token: ${token}`);
		this.name = "JwtTokenInvalid";
	}
};
var JwtTokenNotBefore = class extends Error {
	constructor(token) {
		super(`token (${token}) is being used before it's valid`);
		this.name = "JwtTokenNotBefore";
	}
};
var JwtTokenExpired = class extends Error {
	constructor(token) {
		super(`token (${token}) expired`);
		this.name = "JwtTokenExpired";
	}
};
var JwtTokenIssuedAt = class extends Error {
	constructor(currentTimestamp, iat) {
		super(`Invalid "iat" claim, must be a valid number lower than "${currentTimestamp}" (iat: "${iat}")`);
		this.name = "JwtTokenIssuedAt";
	}
};
var JwtTokenIssuer = class extends Error {
	constructor(expected, iss) {
		super(`expected issuer "${expected}", got ${iss ? `"${iss}"` : "none"} `);
		this.name = "JwtTokenIssuer";
	}
};
var JwtHeaderInvalid = class extends Error {
	constructor(header) {
		super(`jwt header is invalid: ${JSON.stringify(header)}`);
		this.name = "JwtHeaderInvalid";
	}
};
var JwtHeaderRequiresKid = class extends Error {
	constructor(header) {
		super(`required "kid" in jwt header: ${JSON.stringify(header)}`);
		this.name = "JwtHeaderRequiresKid";
	}
};
var JwtTokenSignatureMismatched = class extends Error {
	constructor(token) {
		super(`token(${token}) signature mismatched`);
		this.name = "JwtTokenSignatureMismatched";
	}
};
var CryptoKeyUsage = /* @__PURE__ */ ((CryptoKeyUsage2) => {
	CryptoKeyUsage2["Encrypt"] = "encrypt";
	CryptoKeyUsage2["Decrypt"] = "decrypt";
	CryptoKeyUsage2["Sign"] = "sign";
	CryptoKeyUsage2["Verify"] = "verify";
	CryptoKeyUsage2["DeriveKey"] = "deriveKey";
	CryptoKeyUsage2["DeriveBits"] = "deriveBits";
	CryptoKeyUsage2["WrapKey"] = "wrapKey";
	CryptoKeyUsage2["UnwrapKey"] = "unwrapKey";
	return CryptoKeyUsage2;
})(CryptoKeyUsage || {});
var utf8Encoder = new TextEncoder();
var utf8Decoder = new TextDecoder();
async function signing(privateKey, alg, data) {
	const algorithm$1 = getKeyAlgorithm(alg);
	const cryptoKey = await importPrivateKey(privateKey, algorithm$1);
	return await crypto.subtle.sign(algorithm$1, cryptoKey, data);
}
async function verifying(publicKey, alg, signature, data) {
	const algorithm$1 = getKeyAlgorithm(alg);
	const cryptoKey = await importPublicKey(publicKey, algorithm$1);
	return await crypto.subtle.verify(algorithm$1, cryptoKey, signature, data);
}
function pemToBinary(pem) {
	return decodeBase64(pem.replace(/-+(BEGIN|END).*/g, "").replace(/\s/g, ""));
}
async function importPrivateKey(key, alg) {
	if (!crypto.subtle || !crypto.subtle.importKey) throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
	if (isCryptoKey(key)) {
		if (key.type !== "private" && key.type !== "secret") throw new Error(`unexpected key type: CryptoKey.type is ${key.type}, expected private or secret`);
		return key;
	}
	const usages = [CryptoKeyUsage.Sign];
	if (typeof key === "object") return await crypto.subtle.importKey("jwk", key, alg, false, usages);
	if (key.includes("PRIVATE")) return await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, false, usages);
	return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
async function importPublicKey(key, alg) {
	if (!crypto.subtle || !crypto.subtle.importKey) throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
	if (isCryptoKey(key)) {
		if (key.type === "public" || key.type === "secret") return key;
		key = await exportPublicJwkFrom(key);
	}
	if (typeof key === "string" && key.includes("PRIVATE")) {
		const privateKey = await crypto.subtle.importKey("pkcs8", pemToBinary(key), alg, true, [CryptoKeyUsage.Sign]);
		key = await exportPublicJwkFrom(privateKey);
	}
	const usages = [CryptoKeyUsage.Verify];
	if (typeof key === "object") return await crypto.subtle.importKey("jwk", key, alg, false, usages);
	if (key.includes("PUBLIC")) return await crypto.subtle.importKey("spki", pemToBinary(key), alg, false, usages);
	return await crypto.subtle.importKey("raw", utf8Encoder.encode(key), alg, false, usages);
}
async function exportPublicJwkFrom(privateKey) {
	if (privateKey.type !== "private") throw new Error(`unexpected key type: ${privateKey.type}`);
	if (!privateKey.extractable) throw new Error("unexpected private key is unextractable");
	const jwk = await crypto.subtle.exportKey("jwk", privateKey);
	const { kty } = jwk;
	const { alg, e, n } = jwk;
	const { crv, x, y } = jwk;
	return {
		kty,
		alg,
		e,
		n,
		crv,
		x,
		y,
		key_ops: [CryptoKeyUsage.Verify]
	};
}
function getKeyAlgorithm(name) {
	switch (name) {
		case "HS256": return {
			name: "HMAC",
			hash: { name: "SHA-256" }
		};
		case "HS384": return {
			name: "HMAC",
			hash: { name: "SHA-384" }
		};
		case "HS512": return {
			name: "HMAC",
			hash: { name: "SHA-512" }
		};
		case "RS256": return {
			name: "RSASSA-PKCS1-v1_5",
			hash: { name: "SHA-256" }
		};
		case "RS384": return {
			name: "RSASSA-PKCS1-v1_5",
			hash: { name: "SHA-384" }
		};
		case "RS512": return {
			name: "RSASSA-PKCS1-v1_5",
			hash: { name: "SHA-512" }
		};
		case "PS256": return {
			name: "RSA-PSS",
			hash: { name: "SHA-256" },
			saltLength: 32
		};
		case "PS384": return {
			name: "RSA-PSS",
			hash: { name: "SHA-384" },
			saltLength: 48
		};
		case "PS512": return {
			name: "RSA-PSS",
			hash: { name: "SHA-512" },
			saltLength: 64
		};
		case "ES256": return {
			name: "ECDSA",
			hash: { name: "SHA-256" },
			namedCurve: "P-256"
		};
		case "ES384": return {
			name: "ECDSA",
			hash: { name: "SHA-384" },
			namedCurve: "P-384"
		};
		case "ES512": return {
			name: "ECDSA",
			hash: { name: "SHA-512" },
			namedCurve: "P-521"
		};
		case "EdDSA": return {
			name: "Ed25519",
			namedCurve: "Ed25519"
		};
		default: throw new JwtAlgorithmNotImplemented(name);
	}
}
function isCryptoKey(key) {
	if (getRuntimeKey() === "node" && !!crypto.webcrypto) return key instanceof crypto.webcrypto.CryptoKey;
	return key instanceof CryptoKey;
}
var encodeJwtPart = (part) => encodeBase64Url(utf8Encoder.encode(JSON.stringify(part)).buffer).replace(/=/g, "");
var encodeSignaturePart = (buf) => encodeBase64Url(buf).replace(/=/g, "");
var decodeJwtPart = (part) => JSON.parse(utf8Decoder.decode(decodeBase64Url(part)));
function isTokenHeader(obj) {
	if (typeof obj === "object" && obj !== null) {
		const objWithAlg = obj;
		return "alg" in objWithAlg && Object.values(AlgorithmTypes).includes(objWithAlg.alg) && (!("typ" in objWithAlg) || objWithAlg.typ === "JWT");
	}
	return false;
}
var sign$1 = async (payload, privateKey, alg = "HS256") => {
	const encodedPayload = encodeJwtPart(payload);
	let encodedHeader;
	if (typeof privateKey === "object" && "alg" in privateKey) {
		alg = privateKey.alg;
		encodedHeader = encodeJwtPart({
			alg,
			typ: "JWT",
			kid: privateKey.kid
		});
	} else encodedHeader = encodeJwtPart({
		alg,
		typ: "JWT"
	});
	const partialToken = `${encodedHeader}.${encodedPayload}`;
	const signaturePart = await signing(privateKey, alg, utf8Encoder.encode(partialToken));
	const signature = encodeSignaturePart(signaturePart);
	return `${partialToken}.${signature}`;
};
var verify$1 = async (token, publicKey, algOrOptions) => {
	const optsIn = typeof algOrOptions === "string" ? { alg: algOrOptions } : algOrOptions || {};
	const opts = {
		alg: optsIn.alg ?? "HS256",
		iss: optsIn.iss,
		nbf: optsIn.nbf ?? true,
		exp: optsIn.exp ?? true,
		iat: optsIn.iat ?? true
	};
	const tokenParts = token.split(".");
	if (tokenParts.length !== 3) throw new JwtTokenInvalid(token);
	const { header, payload } = decode$1(token);
	if (!isTokenHeader(header)) throw new JwtHeaderInvalid(header);
	const now = Date.now() / 1e3 | 0;
	if (opts.nbf && payload.nbf && payload.nbf > now) throw new JwtTokenNotBefore(token);
	if (opts.exp && payload.exp && payload.exp <= now) throw new JwtTokenExpired(token);
	if (opts.iat && payload.iat && now < payload.iat) throw new JwtTokenIssuedAt(now, payload.iat);
	if (opts.iss) {
		if (!payload.iss) throw new JwtTokenIssuer(opts.iss, null);
		if (typeof opts.iss === "string" && payload.iss !== opts.iss) throw new JwtTokenIssuer(opts.iss, payload.iss);
		if (opts.iss instanceof RegExp && !opts.iss.test(payload.iss)) throw new JwtTokenIssuer(opts.iss, payload.iss);
	}
	const headerPayload = token.substring(0, token.lastIndexOf("."));
	if (!await verifying(publicKey, opts.alg, decodeBase64Url(tokenParts[2]), utf8Encoder.encode(headerPayload))) throw new JwtTokenSignatureMismatched(token);
	return payload;
};
var verifyWithJwks$1 = async (token, options, init) => {
	const verifyOpts = options.verification || {};
	const header = decodeHeader(token);
	if (!isTokenHeader(header)) throw new JwtHeaderInvalid(header);
	if (!header.kid) throw new JwtHeaderRequiresKid(header);
	if (options.jwks_uri) {
		const response = await fetch(options.jwks_uri, init);
		if (!response.ok) throw new Error(`failed to fetch JWKS from ${options.jwks_uri}`);
		const data = await response.json();
		if (!data.keys) throw new Error("invalid JWKS response. \"keys\" field is missing");
		if (!Array.isArray(data.keys)) throw new Error("invalid JWKS response. \"keys\" field is not an array");
		if (options.keys) options.keys.push(...data.keys);
		else options.keys = data.keys;
	} else if (!options.keys) throw new Error("verifyWithJwks requires options for either \"keys\" or \"jwks_uri\" or both");
	const matchingKey = options.keys.find((key) => key.kid === header.kid);
	if (!matchingKey) throw new JwtTokenInvalid(token);
	return await verify$1(token, matchingKey, {
		alg: matchingKey.alg || header.alg,
		...verifyOpts
	});
};
var decode$1 = (token) => {
	try {
		const [h, p] = token.split(".");
		const header = decodeJwtPart(h);
		const payload = decodeJwtPart(p);
		return {
			header,
			payload
		};
	} catch {
		throw new JwtTokenInvalid(token);
	}
};
var decodeHeader = (token) => {
	try {
		const [h] = token.split(".");
		return decodeJwtPart(h);
	} catch {
		throw new JwtTokenInvalid(token);
	}
};
var Jwt = {
	sign: sign$1,
	verify: verify$1,
	decode: decode$1,
	verifyWithJwks: verifyWithJwks$1
};
var jwt = (options) => {
	const verifyOpts = options.verification || {};
	if (!options || !options.secret) throw new Error("JWT auth middleware requires options for \"secret\"");
	if (!crypto.subtle || !crypto.subtle.importKey) throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
	return async function jwt2(ctx, next) {
		const headerName = options.headerName || "Authorization";
		const credentials = ctx.req.raw.headers.get(headerName);
		let token;
		if (credentials) {
			const parts = credentials.split(/\s+/);
			if (parts.length !== 2) {
				const errDescription = "invalid credentials structure";
				throw new HTTPException(401, {
					message: errDescription,
					res: unauthorizedResponse({
						ctx,
						error: "invalid_request",
						errDescription
					})
				});
			} else token = parts[1];
		} else if (options.cookie) if (typeof options.cookie == "string") token = getCookie(ctx, options.cookie);
		else if (options.cookie.secret) if (options.cookie.prefixOptions) token = await getSignedCookie(ctx, options.cookie.secret, options.cookie.key, options.cookie.prefixOptions);
		else token = await getSignedCookie(ctx, options.cookie.secret, options.cookie.key);
		else if (options.cookie.prefixOptions) token = getCookie(ctx, options.cookie.key, options.cookie.prefixOptions);
		else token = getCookie(ctx, options.cookie.key);
		if (!token) {
			const errDescription = "no authorization included in request";
			throw new HTTPException(401, {
				message: errDescription,
				res: unauthorizedResponse({
					ctx,
					error: "invalid_request",
					errDescription
				})
			});
		}
		let payload;
		let cause;
		try {
			payload = await Jwt.verify(token, options.secret, {
				alg: options.alg,
				...verifyOpts
			});
		} catch (e) {
			cause = e;
		}
		if (!payload) throw new HTTPException(401, {
			message: "Unauthorized",
			res: unauthorizedResponse({
				ctx,
				error: "invalid_token",
				statusText: "Unauthorized",
				errDescription: "token verification failure"
			}),
			cause
		});
		ctx.set("jwtPayload", payload);
		await next();
	};
};
function unauthorizedResponse(opts) {
	return new Response("Unauthorized", {
		status: 401,
		statusText: opts.statusText,
		headers: { "WWW-Authenticate": `Bearer realm="${opts.ctx.req.url}",error="${opts.error}",error_description="${opts.errDescription}"` }
	});
}
Jwt.verifyWithJwks;
Jwt.verify;
Jwt.decode;
var sign = Jwt.sign;
function __rest(s, e) {
	var t$1 = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t$1[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t$1[p[i]] = s[p[i]];
	}
	return t$1;
}
var ZodTypeKeys = {
	ZodAny: "any",
	ZodArray: "array",
	ZodBigInt: "bigint",
	ZodBoolean: "boolean",
	ZodDefault: "default",
	ZodTransform: "transform",
	ZodEnum: "enum",
	ZodIntersection: "intersection",
	ZodLiteral: "literal",
	ZodNever: "never",
	ZodNull: "null",
	ZodNullable: "nullable",
	ZodNumber: "number",
	ZodNonOptional: "nonoptional",
	ZodObject: "object",
	ZodOptional: "optional",
	ZodPipe: "pipe",
	ZodReadonly: "readonly",
	ZodRecord: "record",
	ZodString: "string",
	ZodTuple: "tuple",
	ZodType: "type",
	ZodUnion: "union",
	ZodDiscriminatedUnion: "union",
	ZodUnknown: "unknown",
	ZodVoid: "void",
	ZodDate: "date"
};
function isZodType(schema, typeNames) {
	return (Array.isArray(typeNames) ? typeNames : [typeNames]).some((typeName) => {
		var _a;
		const typeNameMatch = ((_a = schema === null || schema === void 0 ? void 0 : schema.def) === null || _a === void 0 ? void 0 : _a.type) === ZodTypeKeys[typeName];
		if (typeName === "ZodDiscriminatedUnion") return typeNameMatch && "discriminator" in schema.def;
		return typeNameMatch;
	});
}
function isAnyZodType(schema) {
	return "def" in schema;
}
function isNullableSchema(schema) {
	return schema.safeParse(null).success;
}
function isOptionalSchema(schema) {
	return schema.safeParse(void 0).success;
}
var $ZodRegistry = class {
	constructor() {
		this._map = /* @__PURE__ */ new Map();
		this._idmap = /* @__PURE__ */ new Map();
	}
	add(schema, ..._meta) {
		const meta = _meta[0];
		this._map.set(schema, meta);
		if (meta && typeof meta === "object" && "id" in meta) {
			if (this._idmap.has(meta.id)) throw new Error(`ID ${meta.id} already exists in the registry`);
			this._idmap.set(meta.id, schema);
		}
		return this;
	}
	clear() {
		this._map = /* @__PURE__ */ new Map();
		this._idmap = /* @__PURE__ */ new Map();
		return this;
	}
	remove(schema) {
		const meta = this._map.get(schema);
		if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
		this._map.delete(schema);
		return this;
	}
	get(schema) {
		const p = schema._zod.parent;
		if (p) {
			const pm = { ...this.get(p) ?? {} };
			delete pm.id;
			return {
				...pm,
				...this._map.get(schema)
			};
		}
		return this._map.get(schema);
	}
	has(schema) {
		return this._map.has(schema);
	}
};
function registry$1() {
	return new $ZodRegistry();
}
function isEqual(x, y) {
	if (x === null || x === void 0 || y === null || y === void 0) return x === y;
	if (x === y || x.valueOf() === y.valueOf()) return true;
	if (Array.isArray(x)) {
		if (!Array.isArray(y)) return false;
		if (x.length !== y.length) return false;
	}
	if (!(x instanceof Object) || !(y instanceof Object)) return false;
	const keysX = Object.keys(x);
	return Object.keys(y).every((keyY) => keysX.indexOf(keyY) !== -1) && keysX.every((key) => isEqual(x[key], y[key]));
}
var ObjectSet = class {
	constructor() {
		this.buckets = /* @__PURE__ */ new Map();
	}
	put(value) {
		const hashCode = this.hashCodeOf(value);
		const itemsByCode = this.buckets.get(hashCode);
		if (!itemsByCode) {
			this.buckets.set(hashCode, [value]);
			return;
		}
		if (!itemsByCode.some((_) => isEqual(_, value))) itemsByCode.push(value);
	}
	contains(value) {
		const hashCode = this.hashCodeOf(value);
		const itemsByCode = this.buckets.get(hashCode);
		if (!itemsByCode) return false;
		return itemsByCode.some((_) => isEqual(_, value));
	}
	values() {
		return [...this.buckets.values()].flat();
	}
	stats() {
		let totalBuckets = 0;
		let totalValues = 0;
		let collisions = 0;
		for (const bucket of this.buckets.values()) {
			totalBuckets += 1;
			totalValues += bucket.length;
			if (bucket.length > 1) collisions += 1;
		}
		const hashEffectiveness = totalBuckets / totalValues;
		return {
			totalBuckets,
			collisions,
			totalValues,
			hashEffectiveness
		};
	}
	hashCodeOf(object$1) {
		let hashCode = 0;
		if (Array.isArray(object$1)) {
			for (let i = 0; i < object$1.length; i++) hashCode ^= this.hashCodeOf(object$1[i]) * i;
			return hashCode;
		}
		if (typeof object$1 === "string") {
			for (let i = 0; i < object$1.length; i++) hashCode ^= object$1.charCodeAt(i) * i;
			return hashCode;
		}
		if (typeof object$1 === "number") return object$1;
		if (typeof object$1 === "object") for (const [key, value] of Object.entries(object$1)) hashCode ^= this.hashCodeOf(key) + this.hashCodeOf(value !== null && value !== void 0 ? value : "");
		return hashCode;
	}
};
function isUndefined(value) {
	return value === void 0;
}
function mapValues(object$1, mapper) {
	const result = {};
	Object.entries(object$1).forEach(([key, value]) => {
		result[key] = mapper(value);
	});
	return result;
}
function omit(object$1, keys) {
	const result = {};
	Object.entries(object$1).forEach(([key, value]) => {
		if (!keys.some((keyToOmit) => keyToOmit === key)) result[key] = value;
	});
	return result;
}
function omitBy(object$1, predicate) {
	const result = {};
	Object.entries(object$1).forEach(([key, value]) => {
		if (!predicate(value, key)) result[key] = value;
	});
	return result;
}
function compact(arr) {
	return arr.filter((elem) => !isUndefined(elem));
}
var objectEquals = isEqual;
function uniq(values) {
	const set$1 = new ObjectSet();
	values.forEach((value) => set$1.put(value));
	return [...set$1.values()];
}
function isString(val) {
	return typeof val === "string";
}
function sortObjectByKeys(obj) {
	return Object.fromEntries(Object.entries(obj).sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey)));
}
var zodToOpenAPIRegistry = registry$1();
var Metadata = class {
	static collectMetadata(schema, metadata) {
		const currentMetadata = this.getMetadataFromRegistry(schema);
		const _internal = Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata._internal), metadata === null || metadata === void 0 ? void 0 : metadata._internal);
		const param = Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.param), metadata === null || metadata === void 0 ? void 0 : metadata.param);
		const totalMetadata = Object.assign(Object.assign(Object.assign(Object.assign({}, Object.keys(_internal).length > 0 ? { _internal } : {}), currentMetadata), metadata), Object.keys(param).length > 0 ? { param } : {});
		if (isZodType(schema, [
			"ZodOptional",
			"ZodNullable",
			"ZodDefault",
			"ZodReadonly",
			"ZodNonOptional"
		]) && isAnyZodType(schema._zod.def.innerType)) return this.collectMetadata(schema._zod.def.innerType, totalMetadata);
		if (isZodType(schema, "ZodPipe")) {
			const inSchema = schema._zod.def.in;
			const outSchema = schema._zod.def.out;
			if (isZodType(inSchema, "ZodTransform") && isAnyZodType(outSchema)) return this.collectMetadata(outSchema, totalMetadata);
			if (isAnyZodType(inSchema)) return this.collectMetadata(inSchema, totalMetadata);
		}
		return totalMetadata;
	}
	static getMetadata(zodSchema) {
		return this.collectMetadata(zodSchema);
	}
	static getOpenApiMetadata(zodSchema) {
		const metadata = this.collectMetadata(zodSchema);
		return __rest(metadata !== null && metadata !== void 0 ? metadata : {}, ["_internal"]);
	}
	static getInternalMetadata(zodSchema) {
		var _a;
		return (_a = this.collectMetadata(zodSchema)) === null || _a === void 0 ? void 0 : _a._internal;
	}
	static getParamMetadata(zodSchema) {
		const metadata = this.collectMetadata(zodSchema);
		return Object.assign(Object.assign({}, metadata), { param: Object.assign(Object.assign({}, (metadata === null || metadata === void 0 ? void 0 : metadata.description) ? { description: metadata.description } : {}), metadata === null || metadata === void 0 ? void 0 : metadata.param) });
	}
	static buildSchemaMetadata(metadata) {
		return omitBy(omit(metadata, ["param", "_internal"]), isUndefined);
	}
	static buildParameterMetadata(metadata) {
		return omitBy(metadata, isUndefined);
	}
	static applySchemaMetadata(initialData, metadata) {
		return omitBy(Object.assign(Object.assign({}, initialData), this.buildSchemaMetadata(metadata)), isUndefined);
	}
	static getRefId(zodSchema) {
		var _a;
		return (_a = this.getInternalMetadata(zodSchema)) === null || _a === void 0 ? void 0 : _a.refId;
	}
	static unwrapChained(schema) {
		return this.unwrapUntil(schema);
	}
	static getDefaultValue(zodSchema) {
		const unwrapped = this.unwrapUntil(zodSchema, "ZodDefault");
		return unwrapped === null || unwrapped === void 0 ? void 0 : unwrapped._zod.def.defaultValue;
	}
	static unwrapUntil(schema, typeName) {
		if (typeName && isZodType(schema, typeName)) return schema;
		if (isZodType(schema, [
			"ZodOptional",
			"ZodNullable",
			"ZodDefault",
			"ZodReadonly",
			"ZodNonOptional"
		]) && isAnyZodType(schema._zod.def.innerType)) return this.unwrapUntil(schema._zod.def.innerType, typeName);
		if (isZodType(schema, "ZodPipe")) {
			const inSchema = schema._zod.def.in;
			const outSchema = schema._zod.def.out;
			if (isZodType(inSchema, "ZodTransform") && isAnyZodType(outSchema)) return this.unwrapUntil(outSchema, typeName);
			if (isAnyZodType(inSchema)) return this.unwrapUntil(inSchema, typeName);
		}
		return typeName ? void 0 : schema;
	}
	static getMetadataFromInternalRegistry(zodSchema) {
		return zodToOpenAPIRegistry.get(zodSchema);
	}
	static getMetadataFromRegistry(zodSchema) {
		const internal = this.getMetadataFromInternalRegistry(zodSchema);
		const general = zodSchema.meta();
		if (!internal) return general;
		const { _internal } = internal, rest = __rest(internal, ["_internal"]);
		const _a = general !== null && general !== void 0 ? general : {}, { id, title } = _a, restGeneral = __rest(_a, ["id", "title"]);
		return Object.assign(Object.assign(Object.assign({ _internal: Object.assign(Object.assign({}, id ? { refId: id } : {}), _internal) }, rest), title ? { description: title } : {}), restGeneral);
	}
	static setMetadataInRegistry(zodSchema, metadata) {
		zodToOpenAPIRegistry.add(zodSchema, metadata);
	}
};
function preserveMetadataFromModifier(zodSchema, modifier) {
	const zodModifier = zodSchema[modifier];
	if (typeof zodModifier !== "function") return;
	zodSchema[modifier] = function(...args) {
		const result = zodModifier.apply(this, args);
		const meta = Metadata.getMetadataFromRegistry(this);
		if (meta) Metadata.setMetadataInRegistry(result, meta);
		return result;
	};
}
function extendZodWithOpenApi(zod) {
	if (typeof zod.ZodType.prototype.openapi !== "undefined") return;
	zod.ZodType.prototype.openapi = function(...args) {
		const { refId, metadata, options } = getOpenApiConfiguration(...args);
		const _a = metadata !== null && metadata !== void 0 ? metadata : {}, { param } = _a, restOfOpenApi = __rest(_a, ["param"]);
		const allMetadata = Metadata.getMetadataFromRegistry(this);
		const _b = allMetadata !== null && allMetadata !== void 0 ? allMetadata : {}, { _internal: internalMetadata } = _b, currentMetadata = __rest(_b, ["_internal"]);
		const _internal = Object.assign(Object.assign(Object.assign({}, internalMetadata), options), refId ? { refId } : void 0);
		const resultMetadata = Object.assign(Object.assign(Object.assign({}, currentMetadata), restOfOpenApi), (currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.param) || param ? { param: Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.param), param) } : void 0);
		const result = new this.constructor(this._def);
		Metadata.setMetadataInRegistry(result, Object.assign(Object.assign({}, Object.keys(_internal).length > 0 ? { _internal } : void 0), resultMetadata));
		if (isZodType(result, "ZodObject")) {
			const currentMetadata$1 = Metadata.getMetadataFromRegistry(result);
			const originalExtend = result.extend;
			result.extend = function(...args$1) {
				const extendedResult = originalExtend.apply(result, args$1);
				const _a$1 = currentMetadata$1 !== null && currentMetadata$1 !== void 0 ? currentMetadata$1 : {}, { _internal: _internal$1 } = _a$1, rest = __rest(_a$1, ["_internal"]);
				Metadata.setMetadataInRegistry(extendedResult, { _internal: { extendedFrom: (_internal$1 === null || _internal$1 === void 0 ? void 0 : _internal$1.refId) ? {
					refId: _internal$1.refId,
					schema: result
				} : _internal$1 === null || _internal$1 === void 0 ? void 0 : _internal$1.extendedFrom } });
				return extendedResult.openapi(rest);
			};
			preserveMetadataFromModifier(result, "catchall");
		}
		preserveMetadataFromModifier(result, "optional");
		preserveMetadataFromModifier(result, "nullable");
		preserveMetadataFromModifier(result, "default");
		preserveMetadataFromModifier(result, "transform");
		preserveMetadataFromModifier(result, "refine");
		preserveMetadataFromModifier(result, "length");
		preserveMetadataFromModifier(result, "min");
		preserveMetadataFromModifier(result, "max");
		const originalMeta = result.meta;
		result.meta = function(...args$1) {
			const result$1 = originalMeta.apply(this, args$1);
			if (args$1[0]) {
				const meta = Metadata.getMetadataFromInternalRegistry(this);
				if (meta) Metadata.setMetadataInRegistry(result$1, Object.assign(Object.assign({}, meta), args$1[0]));
			}
			return result$1;
		};
		return result;
	};
}
function getOpenApiConfiguration(refOrOpenapi, metadataOrOptions, options) {
	if (typeof refOrOpenapi === "string") return {
		refId: refOrOpenapi,
		metadata: metadataOrOptions,
		options
	};
	return {
		refId: void 0,
		metadata: refOrOpenapi,
		options: metadataOrOptions
	};
}
function getOpenApiMetadata(zodSchema) {
	var _a;
	return omitBy((_a = Metadata.getOpenApiMetadata(zodSchema)) !== null && _a !== void 0 ? _a : {}, isUndefined);
}
var OpenAPIRegistry = class {
	constructor(parents) {
		this.parents = parents;
		this._definitions = [];
	}
	get definitions() {
		var _a, _b;
		return [...(_b = (_a = this.parents) === null || _a === void 0 ? void 0 : _a.flatMap((par) => par._definitions)) !== null && _b !== void 0 ? _b : [], ...this._definitions];
	}
	register(refId, zodSchema) {
		const schemaWithRefId = this.schemaWithRefId(refId, zodSchema);
		this._definitions.push({
			type: "schema",
			schema: schemaWithRefId
		});
		return schemaWithRefId;
	}
	registerParameter(refId, zodSchema) {
		var _a, _b, _c;
		const schemaWithRefId = this.schemaWithRefId(refId, zodSchema);
		const currentMetadata = (_a = Metadata.getOpenApiMetadata(schemaWithRefId)) !== null && _a !== void 0 ? _a : {};
		const schemaWithMetadata = schemaWithRefId.openapi(Object.assign(Object.assign({}, currentMetadata), { param: Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.param), { name: (_c = (_b = currentMetadata === null || currentMetadata === void 0 ? void 0 : currentMetadata.param) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : refId }) }));
		this._definitions.push({
			type: "parameter",
			schema: schemaWithMetadata
		});
		return schemaWithMetadata;
	}
	registerPath(route) {
		this._definitions.push({
			type: "route",
			route
		});
	}
	registerWebhook(webhook) {
		this._definitions.push({
			type: "webhook",
			webhook
		});
	}
	registerComponent(type, name, component) {
		this._definitions.push({
			type: "component",
			componentType: type,
			name,
			component
		});
		return {
			name,
			ref: { $ref: `#/components/${type}/${name}` }
		};
	}
	schemaWithRefId(refId, zodSchema) {
		return zodSchema.openapi(refId);
	}
};
var ZodToOpenAPIError = class {
	constructor(message) {
		this.message = message;
	}
};
var ConflictError = class extends ZodToOpenAPIError {
	constructor(message, data) {
		super(message);
		this.data = data;
	}
};
var MissingParameterDataError = class extends ZodToOpenAPIError {
	constructor(data) {
		super(`Missing parameter data, please specify \`${data.missingField}\` and other OpenAPI parameter props using the \`param\` field of \`schema.openapi\``);
		this.data = data;
	}
};
function enhanceMissingParametersError(action, paramsToAdd) {
	try {
		return action();
	} catch (error) {
		if (error instanceof MissingParameterDataError) throw new MissingParameterDataError(Object.assign(Object.assign({}, error.data), paramsToAdd));
		throw error;
	}
}
var UnknownZodTypeError = class extends ZodToOpenAPIError {
	constructor(data) {
		super(`Unknown zod object type, please specify \`type\` and other OpenAPI props using \`schema.openapi\`.`);
		this.data = data;
	}
};
var ArrayTransformer = class {
	transform(zodSchema, mapNullableType, mapItems) {
		var _a, _b, _c, _d;
		const itemType = zodSchema.def.element;
		const minItems = (_b = (_a = zodSchema.def.checks) === null || _a === void 0 ? void 0 : _a.find((check$1) => check$1._zod.def.check === "min_length")) === null || _b === void 0 ? void 0 : _b._zod.def.minimum;
		const maxItems = (_d = (_c = zodSchema.def.checks) === null || _c === void 0 ? void 0 : _c.find((check$1) => check$1._zod.def.check === "max_length")) === null || _d === void 0 ? void 0 : _d._zod.def.maximum;
		return Object.assign(Object.assign({}, mapNullableType("array")), {
			items: isAnyZodType(itemType) ? mapItems(itemType) : {},
			minItems,
			maxItems
		});
	}
};
var BigIntTransformer = class {
	transform(mapNullableType) {
		return Object.assign(Object.assign({}, mapNullableType("string")), { pattern: `^\d+$` });
	}
};
var DiscriminatedUnionTransformer = class {
	transform(zodSchema, isNullable, mapNullableOfArray, mapItem, generateSchemaRef) {
		const options = [...zodSchema.def.options];
		const optionSchema = options.map(mapItem);
		if (isNullable) return { oneOf: mapNullableOfArray(optionSchema, isNullable) };
		const discriminator = zodSchema._zod.def.discriminator;
		if (!discriminator) {
			console.error("No discriminator found for discriminated union", zodSchema);
			return { oneOf: optionSchema };
		}
		return {
			oneOf: optionSchema,
			discriminator: this.mapDiscriminator(options, discriminator, generateSchemaRef)
		};
	}
	mapDiscriminator(zodObjects, discriminator, generateSchemaRef) {
		if (zodObjects.some((obj) => Metadata.getRefId(obj) === void 0)) return;
		const mapping = {};
		zodObjects.forEach((obj) => {
			var _a;
			const refId = Metadata.getRefId(obj);
			const value = (_a = obj.def.shape) === null || _a === void 0 ? void 0 : _a[discriminator];
			if (isZodType(value, "ZodEnum")) {
				Object.values(value._zod.def.entries).filter(isString).forEach((enumValue) => {
					mapping[enumValue] = generateSchemaRef(refId);
				});
				return;
			}
			const literalValue = value === null || value === void 0 ? void 0 : value.def.values[0];
			if (typeof literalValue !== "string") throw new Error(`Discriminator ${discriminator} could not be found in one of the values of a discriminated union`);
			mapping[literalValue] = generateSchemaRef(refId);
		});
		return {
			propertyName: discriminator,
			mapping
		};
	}
};
function enumInfo(enumObject) {
	const values = Object.keys(enumObject).filter((key) => typeof enumObject[enumObject[key]] !== "number").map((key) => enumObject[key]);
	const numericCount = values.filter((_) => typeof _ === "number").length;
	const type = numericCount === 0 ? "string" : numericCount === values.length ? "numeric" : "mixed";
	return {
		values,
		type
	};
}
var EnumTransformer = class {
	transform(zodSchema, mapNullableType) {
		const { type, values } = enumInfo(zodSchema._zod.def.entries);
		if (type === "mixed") throw new ZodToOpenAPIError("Enum has mixed string and number values, please specify the OpenAPI type manually");
		return Object.assign(Object.assign({}, mapNullableType(type === "numeric" ? "integer" : "string")), { enum: values });
	}
};
var IntersectionTransformer = class {
	transform(zodSchema, isNullable, mapNullableOfArray, mapItem) {
		const allOfSchema = { allOf: this.flattenIntersectionTypes(zodSchema).map(mapItem) };
		if (isNullable) return { anyOf: mapNullableOfArray([allOfSchema], isNullable) };
		return allOfSchema;
	}
	flattenIntersectionTypes(schema) {
		if (!isZodType(schema, "ZodIntersection")) return [schema];
		const leftSubTypes = isAnyZodType(schema._zod.def.left) ? this.flattenIntersectionTypes(schema._zod.def.left) : [];
		const rightSubTypes = isAnyZodType(schema._zod.def.right) ? this.flattenIntersectionTypes(schema._zod.def.right) : [];
		return [...leftSubTypes, ...rightSubTypes];
	}
};
var LiteralTransformer = class {
	constructor() {
		this.bigIntTransformer = new BigIntTransformer();
	}
	transform(zodSchema, mapNullableType) {
		const type = typeof zodSchema.def.values[0];
		if (type === "boolean" || type === "number" || type === "string" || type === "object") return Object.assign(Object.assign({}, mapNullableType(type)), { enum: [zodSchema.def.values[0]] });
		if (type === "bigint") return this.bigIntTransformer.transform(mapNullableType);
		return mapNullableType("null");
	}
};
var NumberTransformer = class {
	transform(zodSchema, mapNullableType, getNumberChecks) {
		var _a;
		return Object.assign(Object.assign(Object.assign({}, mapNullableType("number")), mapNullableType(zodSchema.format === "safeint" ? "integer" : "number")), getNumberChecks((_a = zodSchema.def.checks) !== null && _a !== void 0 ? _a : []));
	}
};
var ObjectTransformer = class {
	transform(zodSchema, defaultValue, mapNullableType, mapItem) {
		var _a;
		const extendedFrom = (_a = Metadata.getInternalMetadata(zodSchema)) === null || _a === void 0 ? void 0 : _a.extendedFrom;
		const required = this.requiredKeysOf(zodSchema);
		const properties = mapValues(zodSchema.def.shape, mapItem);
		if (!extendedFrom) return Object.assign(Object.assign(Object.assign(Object.assign({}, mapNullableType("object")), {
			properties,
			default: defaultValue
		}), required.length > 0 ? { required } : {}), this.generateAdditionalProperties(zodSchema, mapItem));
		const parent = extendedFrom.schema;
		mapItem(parent);
		const keysRequiredByParent = this.requiredKeysOf(parent);
		const propsOfParent = mapValues(parent === null || parent === void 0 ? void 0 : parent.def.shape, mapItem);
		const propertiesToAdd = Object.fromEntries(Object.entries(properties).filter(([key, type]) => {
			return !objectEquals(propsOfParent[key], type);
		}));
		const additionallyRequired = required.filter((prop) => !keysRequiredByParent.includes(prop));
		const objectData = Object.assign(Object.assign(Object.assign(Object.assign({}, mapNullableType("object")), {
			default: defaultValue,
			properties: propertiesToAdd
		}), additionallyRequired.length > 0 ? { required: additionallyRequired } : {}), this.generateAdditionalProperties(zodSchema, mapItem));
		return { allOf: [{ $ref: `#/components/schemas/${extendedFrom.refId}` }, objectData] };
	}
	generateAdditionalProperties(zodSchema, mapItem) {
		const catchallSchema = zodSchema.def.catchall;
		if (!catchallSchema) return {};
		if (isZodType(catchallSchema, "ZodNever")) return { additionalProperties: false };
		if (isAnyZodType(catchallSchema)) return { additionalProperties: mapItem(catchallSchema) };
		return {};
	}
	requiredKeysOf(objectSchema) {
		return Object.entries(objectSchema.def.shape).filter(([_key, type]) => !isOptionalSchema(type)).map(([key, _type]) => key);
	}
};
var RecordTransformer = class {
	transform(zodSchema, mapNullableType, mapItem) {
		const propertiesType = zodSchema.valueType;
		const keyType = zodSchema.keyType;
		const propertiesSchema = isAnyZodType(propertiesType) ? mapItem(propertiesType) : {};
		if (isZodType(keyType, "ZodEnum")) {
			const properties = Object.values(keyType._zod.def.entries).filter(isString).reduce((acc, curr) => Object.assign(Object.assign({}, acc), { [curr]: propertiesSchema }), {});
			return Object.assign(Object.assign({}, mapNullableType("object")), { properties });
		}
		return Object.assign(Object.assign({}, mapNullableType("object")), { additionalProperties: propertiesSchema });
	}
};
function isZodCheckLengthEquals(check$1) {
	return check$1._zod.def.check === "length_equals";
}
function isZodCheckRegex(check$1) {
	return check$1._zod.def.check === "string_format" && check$1._zod.def.format === "regex";
}
var StringTransformer = class {
	transform(zodSchema, mapNullableType) {
		var _a, _b, _c, _d;
		const regexCheck = (_a = zodSchema.def.checks) === null || _a === void 0 ? void 0 : _a.find(isZodCheckRegex);
		const pattern = regexCheck === null || regexCheck === void 0 ? void 0 : regexCheck._zod.def.pattern.toString().replace(/^\/|\/$/g, "");
		const check$1 = (_b = zodSchema.def.checks) === null || _b === void 0 ? void 0 : _b.find(isZodCheckLengthEquals);
		const length = check$1 === null || check$1 === void 0 ? void 0 : check$1._zod.def.length;
		const maxLength = Number.isFinite(zodSchema.minLength) ? (_c = zodSchema.minLength) !== null && _c !== void 0 ? _c : void 0 : void 0;
		const minLength = Number.isFinite(zodSchema.maxLength) ? (_d = zodSchema.maxLength) !== null && _d !== void 0 ? _d : void 0 : void 0;
		return Object.assign(Object.assign({}, mapNullableType("string")), {
			minLength: length !== null && length !== void 0 ? length : maxLength,
			maxLength: length !== null && length !== void 0 ? length : minLength,
			format: this.mapStringFormat(zodSchema),
			pattern
		});
	}
	mapStringFormat(zodString) {
		if (zodString.format === "uuid") return "uuid";
		if (zodString.format === "email") return "email";
		if (zodString.format === "url") return "uri";
		if (zodString.format === "date") return "date";
		if (zodString.format === "datetime") return "date-time";
		if (zodString.format === "cuid") return "cuid";
		if (zodString.format === "cuid2") return "cuid2";
		if (zodString.format === "ulid") return "ulid";
		if (zodString.format === "ipv4") return "ip";
		if (zodString.format === "ipv6") return "ip";
		if (zodString.format === "emoji") return "emoji";
	}
};
var TupleTransformer = class {
	constructor(versionSpecifics) {
		this.versionSpecifics = versionSpecifics;
	}
	transform(zodSchema, mapNullableType, mapItem) {
		const schemas = zodSchema._zod.def.items.map((item) => isAnyZodType(item) ? mapItem(item) : {});
		return Object.assign(Object.assign({}, mapNullableType("array")), this.versionSpecifics.mapTupleItems(schemas));
	}
};
var UnionTransformer = class {
	constructor(options) {
		this.options = options;
	}
	transform(zodSchema, mapNullableOfArray, mapItem) {
		var _a, _b, _c;
		const internalMetadata = Metadata.getInternalMetadata(zodSchema);
		const preferredType = (_c = (_a = internalMetadata === null || internalMetadata === void 0 ? void 0 : internalMetadata.unionPreferredType) !== null && _a !== void 0 ? _a : (_b = this.options) === null || _b === void 0 ? void 0 : _b.unionPreferredType) !== null && _c !== void 0 ? _c : "anyOf";
		const schemas = this.flattenUnionTypes(zodSchema).map((schema) => {
			const optionToGenerate = this.unwrapNullable(schema);
			return mapItem(optionToGenerate);
		});
		return { [preferredType]: mapNullableOfArray(schemas) };
	}
	flattenUnionTypes(schema) {
		if (!isZodType(schema, "ZodUnion")) return [schema];
		return schema.def.options.flatMap((option) => isAnyZodType(option) ? this.flattenUnionTypes(option) : []);
	}
	unwrapNullable(schema) {
		if (isZodType(schema, "ZodNullable")) {
			const unwrapped = schema.unwrap();
			if (isAnyZodType(unwrapped)) return this.unwrapNullable(unwrapped);
		}
		return schema;
	}
};
var DateTransformer = class {
	transform(mapNullableType) {
		return Object.assign(Object.assign({}, mapNullableType("string")), { format: "date" });
	}
};
var OpenApiTransformer = class {
	constructor(versionSpecifics, options) {
		this.versionSpecifics = versionSpecifics;
		this.objectTransformer = new ObjectTransformer();
		this.stringTransformer = new StringTransformer();
		this.numberTransformer = new NumberTransformer();
		this.bigIntTransformer = new BigIntTransformer();
		this.dateTransformer = new DateTransformer();
		this.literalTransformer = new LiteralTransformer();
		this.enumTransformer = new EnumTransformer();
		this.arrayTransformer = new ArrayTransformer();
		this.discriminatedUnionTransformer = new DiscriminatedUnionTransformer();
		this.intersectionTransformer = new IntersectionTransformer();
		this.recordTransformer = new RecordTransformer();
		this.tupleTransformer = new TupleTransformer(versionSpecifics);
		this.unionTransformer = new UnionTransformer(options);
	}
	transform(zodSchema, isNullable, mapItem, generateSchemaRef, defaultValue) {
		if (isZodType(zodSchema, "ZodNull")) return this.versionSpecifics.nullType;
		if (isZodType(zodSchema, "ZodUnknown") || isZodType(zodSchema, "ZodAny")) return this.versionSpecifics.mapNullableType(void 0, isNullable);
		if (isZodType(zodSchema, "ZodObject")) return this.objectTransformer.transform(zodSchema, defaultValue, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
		const schema = this.transformSchemaWithoutDefault(zodSchema, isNullable, mapItem, generateSchemaRef);
		return Object.assign(Object.assign({}, schema), { default: defaultValue });
	}
	transformSchemaWithoutDefault(zodSchema, isNullable, mapItem, generateSchemaRef) {
		if (isZodType(zodSchema, "ZodUnknown") || isZodType(zodSchema, "ZodAny")) return this.versionSpecifics.mapNullableType(void 0, isNullable);
		if (isZodType(zodSchema, "ZodString")) return this.stringTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
		if (isZodType(zodSchema, "ZodNumber")) return this.numberTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable), (_) => this.versionSpecifics.getNumberChecks(_));
		if (isZodType(zodSchema, "ZodBigInt")) return this.bigIntTransformer.transform((schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
		if (isZodType(zodSchema, "ZodBoolean")) return this.versionSpecifics.mapNullableType("boolean", isNullable);
		if (isZodType(zodSchema, "ZodLiteral")) return this.literalTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
		if (isZodType(zodSchema, "ZodEnum")) return this.enumTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
		if (isZodType(zodSchema, "ZodArray")) return this.arrayTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
		if (isZodType(zodSchema, "ZodTuple")) return this.tupleTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
		if (isZodType(zodSchema, "ZodDiscriminatedUnion")) return this.discriminatedUnionTransformer.transform(zodSchema, isNullable, (_) => this.versionSpecifics.mapNullableOfArray(_, isNullable), mapItem, generateSchemaRef);
		if (isZodType(zodSchema, "ZodUnion")) return this.unionTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableOfArray(_, isNullable), mapItem);
		if (isZodType(zodSchema, "ZodIntersection")) return this.intersectionTransformer.transform(zodSchema, isNullable, (_) => this.versionSpecifics.mapNullableOfArray(_, isNullable), mapItem);
		if (isZodType(zodSchema, "ZodRecord")) return this.recordTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
		if (isZodType(zodSchema, "ZodDate")) return this.dateTransformer.transform((_) => this.versionSpecifics.mapNullableType(_, isNullable));
		const refId = Metadata.getRefId(zodSchema);
		throw new UnknownZodTypeError({
			currentSchema: zodSchema.def,
			schemaName: refId
		});
	}
};
var OpenAPIGenerator = class {
	constructor(definitions, versionSpecifics, options) {
		this.definitions = definitions;
		this.versionSpecifics = versionSpecifics;
		this.options = options;
		this.schemaRefs = {};
		this.paramRefs = {};
		this.pathRefs = {};
		this.rawComponents = [];
		this.openApiTransformer = new OpenApiTransformer(versionSpecifics, options);
		this.sortDefinitions();
	}
	generateDocumentData() {
		this.definitions.forEach((definition) => this.generateSingle(definition));
		return {
			components: this.buildComponents(),
			paths: this.pathRefs
		};
	}
	generateComponents() {
		this.definitions.forEach((definition) => this.generateSingle(definition));
		return { components: this.buildComponents() };
	}
	buildComponents() {
		var _a, _b, _c, _d;
		const rawComponents = {};
		this.rawComponents.forEach(({ componentType, name, component }) => {
			var _a$1;
			(_a$1 = rawComponents[componentType]) !== null && _a$1 !== void 0 || (rawComponents[componentType] = {});
			rawComponents[componentType][name] = component;
		});
		const allSchemas = Object.assign(Object.assign({}, (_a = rawComponents.schemas) !== null && _a !== void 0 ? _a : {}), this.schemaRefs);
		const schemas = ((_b = this.options) === null || _b === void 0 ? void 0 : _b.sortComponents) === "alphabetically" ? sortObjectByKeys(allSchemas) : allSchemas;
		const allParameters = Object.assign(Object.assign({}, (_c = rawComponents.parameters) !== null && _c !== void 0 ? _c : {}), this.paramRefs);
		const parameters = ((_d = this.options) === null || _d === void 0 ? void 0 : _d.sortComponents) === "alphabetically" ? sortObjectByKeys(allParameters) : allParameters;
		return Object.assign(Object.assign({}, rawComponents), {
			schemas,
			parameters
		});
	}
	sortObjectKeys(object$1) {}
	sortDefinitions() {
		const generationOrder = [
			"schema",
			"parameter",
			"component",
			"route"
		];
		this.definitions.sort((left, right) => {
			if (!("type" in left)) {
				if (!("type" in right)) return 0;
				return -1;
			}
			if (!("type" in right)) return 1;
			const leftIndex = generationOrder.findIndex((type) => type === left.type);
			const rightIndex = generationOrder.findIndex((type) => type === right.type);
			return leftIndex - rightIndex;
		});
	}
	generateSingle(definition) {
		if (!("type" in definition)) {
			this.generateSchemaWithRef(definition);
			return;
		}
		switch (definition.type) {
			case "parameter":
				this.generateParameterDefinition(definition.schema);
				return;
			case "schema":
				this.generateSchemaWithRef(definition.schema);
				return;
			case "route":
				this.generateSingleRoute(definition.route);
				return;
			case "component":
				this.rawComponents.push(definition);
				return;
		}
	}
	generateParameterDefinition(zodSchema) {
		const refId = Metadata.getRefId(zodSchema);
		const result = this.generateParameter(zodSchema);
		if (refId) this.paramRefs[refId] = result;
		return result;
	}
	getParameterRef(schema, external) {
		const metadata = Metadata.getOpenApiMetadata(schema);
		const internalMetadata = Metadata.getInternalMetadata(schema);
		const parameterMetadata = metadata === null || metadata === void 0 ? void 0 : metadata.param;
		const existingRef = (internalMetadata === null || internalMetadata === void 0 ? void 0 : internalMetadata.refId) ? this.paramRefs[internalMetadata.refId] : void 0;
		if (!(internalMetadata === null || internalMetadata === void 0 ? void 0 : internalMetadata.refId) || !existingRef) return;
		if (parameterMetadata && existingRef.in !== parameterMetadata.in || (external === null || external === void 0 ? void 0 : external.in) && existingRef.in !== external.in) throw new ConflictError(`Conflicting location for parameter ${existingRef.name}`, {
			key: "in",
			values: compact([
				existingRef.in,
				external === null || external === void 0 ? void 0 : external.in,
				parameterMetadata === null || parameterMetadata === void 0 ? void 0 : parameterMetadata.in
			])
		});
		if (parameterMetadata && existingRef.name !== parameterMetadata.name || (external === null || external === void 0 ? void 0 : external.name) && existingRef.name !== (external === null || external === void 0 ? void 0 : external.name)) throw new ConflictError(`Conflicting names for parameter`, {
			key: "name",
			values: compact([
				existingRef.name,
				external === null || external === void 0 ? void 0 : external.name,
				parameterMetadata === null || parameterMetadata === void 0 ? void 0 : parameterMetadata.name
			])
		});
		return { $ref: `#/components/parameters/${internalMetadata.refId}` };
	}
	generateInlineParameters(zodSchema, location) {
		const metadata = Metadata.getOpenApiMetadata(zodSchema);
		const parameterMetadata = metadata === null || metadata === void 0 ? void 0 : metadata.param;
		const referencedSchema = this.getParameterRef(zodSchema, { in: location });
		if (referencedSchema) return [referencedSchema];
		if (isZodType(zodSchema, "ZodObject")) {
			const propTypes = zodSchema.def.shape;
			return Object.entries(propTypes).map(([key, schema]) => {
				var _a;
				const innerMetadata = Metadata.getOpenApiMetadata(schema);
				const referencedSchema$1 = this.getParameterRef(schema, {
					in: location,
					name: key
				});
				if (referencedSchema$1) return referencedSchema$1;
				const innerParameterMetadata = innerMetadata === null || innerMetadata === void 0 ? void 0 : innerMetadata.param;
				if ((innerParameterMetadata === null || innerParameterMetadata === void 0 ? void 0 : innerParameterMetadata.name) && innerParameterMetadata.name !== key) throw new ConflictError(`Conflicting names for parameter`, {
					key: "name",
					values: [key, innerParameterMetadata.name]
				});
				if ((innerParameterMetadata === null || innerParameterMetadata === void 0 ? void 0 : innerParameterMetadata.in) && innerParameterMetadata.in !== location) throw new ConflictError(`Conflicting location for parameter ${(_a = innerParameterMetadata.name) !== null && _a !== void 0 ? _a : key}`, {
					key: "in",
					values: [location, innerParameterMetadata.in]
				});
				return this.generateParameter(schema.openapi({ param: {
					name: key,
					in: location
				} }));
			});
		}
		if ((parameterMetadata === null || parameterMetadata === void 0 ? void 0 : parameterMetadata.in) && parameterMetadata.in !== location) throw new ConflictError(`Conflicting location for parameter ${parameterMetadata.name}`, {
			key: "in",
			values: [location, parameterMetadata.in]
		});
		return [this.generateParameter(zodSchema.openapi({ param: { in: location } }))];
	}
	generateSimpleParameter(zodSchema) {
		const metadata = Metadata.getParamMetadata(zodSchema);
		const paramMetadata = metadata === null || metadata === void 0 ? void 0 : metadata.param;
		const required = !isOptionalSchema(zodSchema) && !isNullableSchema(zodSchema);
		const schema = this.generateSchemaWithRef(zodSchema);
		return Object.assign({
			schema,
			required
		}, paramMetadata ? Metadata.buildParameterMetadata(paramMetadata) : {});
	}
	generateParameter(zodSchema) {
		const metadata = Metadata.getOpenApiMetadata(zodSchema);
		const paramMetadata = metadata === null || metadata === void 0 ? void 0 : metadata.param;
		const paramName = paramMetadata === null || paramMetadata === void 0 ? void 0 : paramMetadata.name;
		const paramLocation = paramMetadata === null || paramMetadata === void 0 ? void 0 : paramMetadata.in;
		if (!paramName) throw new MissingParameterDataError({ missingField: "name" });
		if (!paramLocation) throw new MissingParameterDataError({
			missingField: "in",
			paramName
		});
		const baseParameter = this.generateSimpleParameter(zodSchema);
		return Object.assign(Object.assign({}, baseParameter), {
			in: paramLocation,
			name: paramName
		});
	}
	generateSchemaWithMetadata(zodSchema) {
		const innerSchema = Metadata.unwrapChained(zodSchema);
		const metadata = Metadata.getOpenApiMetadata(zodSchema);
		const defaultValue = Metadata.getDefaultValue(zodSchema);
		const result = (metadata === null || metadata === void 0 ? void 0 : metadata.type) ? { type: metadata.type } : this.toOpenAPISchema(innerSchema, isNullableSchema(zodSchema), defaultValue);
		return metadata ? Metadata.applySchemaMetadata(result, metadata) : omitBy(result, isUndefined);
	}
	constructReferencedOpenAPISchema(zodSchema) {
		const metadata = Metadata.getOpenApiMetadata(zodSchema);
		const innerSchema = Metadata.unwrapChained(zodSchema);
		const defaultValue = Metadata.getDefaultValue(zodSchema);
		const isNullable = isNullableSchema(zodSchema);
		if (metadata === null || metadata === void 0 ? void 0 : metadata.type) return this.versionSpecifics.mapNullableType(metadata.type, isNullable);
		return this.toOpenAPISchema(innerSchema, isNullable, defaultValue);
	}
	generateSimpleSchema(zodSchema) {
		const metadata = Metadata.getOpenApiMetadata(zodSchema);
		const refId = Metadata.getRefId(zodSchema);
		if (!refId || !this.schemaRefs[refId]) return this.generateSchemaWithMetadata(zodSchema);
		const schemaRef = this.schemaRefs[refId];
		const referenceObject = { $ref: this.generateSchemaRef(refId) };
		const newMetadata = omitBy(Metadata.buildSchemaMetadata(metadata !== null && metadata !== void 0 ? metadata : {}), (value, key) => value === void 0 || objectEquals(value, schemaRef[key]));
		if (newMetadata.type) return { allOf: [referenceObject, newMetadata] };
		const newSchemaMetadata = omitBy(this.constructReferencedOpenAPISchema(zodSchema), (value, key) => value === void 0 || objectEquals(value, schemaRef[key]));
		const appliedMetadata = Metadata.applySchemaMetadata(newSchemaMetadata, newMetadata);
		if (Object.keys(appliedMetadata).length > 0) return { allOf: [referenceObject, appliedMetadata] };
		return referenceObject;
	}
	generateSchemaWithRef(zodSchema) {
		const refId = Metadata.getRefId(zodSchema);
		const result = this.generateSimpleSchema(zodSchema);
		if (refId && this.schemaRefs[refId] === void 0) {
			this.schemaRefs[refId] = result;
			return { $ref: this.generateSchemaRef(refId) };
		}
		return result;
	}
	generateSchemaRef(refId) {
		return `#/components/schemas/${refId}`;
	}
	getRequestBody(requestBody) {
		if (!requestBody) return;
		const { content } = requestBody, rest = __rest(requestBody, ["content"]);
		const requestBodyContent = this.getBodyContent(content);
		return Object.assign(Object.assign({}, rest), { content: requestBodyContent });
	}
	getParameters(request) {
		if (!request) return [];
		const { headers } = request;
		const query = this.cleanParameter(request.query);
		const params = this.cleanParameter(request.params);
		const cookies = this.cleanParameter(request.cookies);
		const queryParameters = enhanceMissingParametersError(() => query ? this.generateInlineParameters(query, "query") : [], { location: "query" });
		const pathParameters = enhanceMissingParametersError(() => params ? this.generateInlineParameters(params, "path") : [], { location: "path" });
		const cookieParameters = enhanceMissingParametersError(() => cookies ? this.generateInlineParameters(cookies, "cookie") : [], { location: "cookie" });
		const headerParameters = enhanceMissingParametersError(() => {
			if (Array.isArray(headers)) return headers.flatMap((header) => this.generateInlineParameters(header, "header"));
			const cleanHeaders = this.cleanParameter(headers);
			return cleanHeaders ? this.generateInlineParameters(cleanHeaders, "header") : [];
		}, { location: "header" });
		return [
			...pathParameters,
			...queryParameters,
			...headerParameters,
			...cookieParameters
		];
	}
	cleanParameter(schema) {
		if (!schema) return;
		if (isZodType(schema, "ZodPipe")) {
			const inSchema = schema._zod.def.in;
			const outSchema = schema._zod.def.out;
			if (isZodType(inSchema, "ZodObject")) return this.cleanParameter(inSchema);
			if (isZodType(outSchema, "ZodObject")) return this.cleanParameter(outSchema);
			return;
		}
		return schema;
	}
	generatePath(route) {
		const { method, path, request, responses } = route, pathItemConfig = __rest(route, [
			"method",
			"path",
			"request",
			"responses"
		]);
		const generatedResponses = mapValues(responses, (response) => {
			return this.getResponse(response);
		});
		const parameters = enhanceMissingParametersError(() => this.getParameters(request), { route: `${method} ${path}` });
		const requestBody = this.getRequestBody(request === null || request === void 0 ? void 0 : request.body);
		return { [method]: Object.assign(Object.assign(Object.assign(Object.assign({}, pathItemConfig), parameters.length > 0 ? { parameters: [...pathItemConfig.parameters || [], ...parameters] } : {}), requestBody ? { requestBody } : {}), { responses: generatedResponses }) };
	}
	generateSingleRoute(route) {
		const routeDoc = this.generatePath(route);
		this.pathRefs[route.path] = Object.assign(Object.assign({}, this.pathRefs[route.path]), routeDoc);
		return routeDoc;
	}
	getResponse(response) {
		if (this.isReferenceObject(response)) return response;
		const { content, headers } = response, rest = __rest(response, ["content", "headers"]);
		const responseContent = content ? { content: this.getBodyContent(content) } : {};
		if (!headers) return Object.assign(Object.assign({}, rest), responseContent);
		const responseHeaders = isZodType(headers, "ZodObject") ? this.getResponseHeaders(headers) : headers;
		return Object.assign(Object.assign(Object.assign({}, rest), { headers: responseHeaders }), responseContent);
	}
	isReferenceObject(schema) {
		return "$ref" in schema;
	}
	getResponseHeaders(headers) {
		const schemaShape = headers.def.shape;
		return mapValues(schemaShape, (_) => this.generateSimpleParameter(_));
	}
	getBodyContent(content) {
		return mapValues(content, (config$1) => {
			if (!config$1 || !isAnyZodType(config$1.schema)) return config$1;
			const { schema: configSchema } = config$1, rest = __rest(config$1, ["schema"]);
			const schema = this.generateSchemaWithRef(configSchema);
			return Object.assign({ schema }, rest);
		});
	}
	toOpenAPISchema(zodSchema, isNullable, defaultValue) {
		return this.openApiTransformer.transform(zodSchema, isNullable, (_) => this.generateSchemaWithRef(_), (_) => this.generateSchemaRef(_), defaultValue);
	}
};
var OpenApiGeneratorV30Specifics = class {
	get nullType() {
		return { nullable: true };
	}
	mapNullableOfArray(objects, isNullable) {
		if (isNullable) return [...objects, this.nullType];
		return objects;
	}
	mapNullableType(type, isNullable) {
		return Object.assign(Object.assign({}, type ? { type } : void 0), isNullable ? this.nullType : void 0);
	}
	mapTupleItems(schemas) {
		const uniqueSchemas = uniq(schemas);
		return {
			items: uniqueSchemas.length === 1 ? uniqueSchemas[0] : { anyOf: uniqueSchemas },
			minItems: schemas.length,
			maxItems: schemas.length
		};
	}
	getNumberChecks(checks) {
		return Object.assign({}, ...checks.map((check$1) => {
			switch (check$1._zod.def.check) {
				case "greater_than": {
					const greaterThanCheck = check$1;
					return greaterThanCheck._zod.def.inclusive ? { minimum: Number(greaterThanCheck._zod.def.value) } : {
						minimum: Number(greaterThanCheck._zod.def.value),
						exclusiveMinimum: true
					};
				}
				case "less_than": {
					const lessThanCheck = check$1;
					return lessThanCheck._zod.def.inclusive ? { maximum: Number(lessThanCheck._zod.def.value) } : {
						maximum: Number(lessThanCheck._zod.def.value),
						exclusiveMaximum: !lessThanCheck._zod.def.inclusive
					};
				}
				default: return {};
			}
		}));
	}
};
var OpenApiGeneratorV3 = class {
	constructor(definitions, options) {
		const specifics = new OpenApiGeneratorV30Specifics();
		this.generator = new OpenAPIGenerator(definitions, specifics, options);
	}
	generateDocument(config$1) {
		const baseData = this.generator.generateDocumentData();
		return Object.assign(Object.assign({}, config$1), baseData);
	}
	generateComponents() {
		return this.generator.generateComponents();
	}
};
var OpenApiGeneratorV31Specifics = class {
	get nullType() {
		return { type: "null" };
	}
	mapNullableOfArray(objects, isNullable) {
		if (isNullable) return [...objects, this.nullType];
		return objects;
	}
	mapNullableType(type, isNullable) {
		if (!type) return {};
		if (isNullable) return { type: Array.isArray(type) ? [...type, "null"] : [type, "null"] };
		return { type };
	}
	mapTupleItems(schemas) {
		return { prefixItems: schemas };
	}
	getNumberChecks(checks) {
		return Object.assign({}, ...checks.map((check$1) => {
			switch (check$1._zod.def.check) {
				case "greater_than": {
					const greaterThanCheck = check$1;
					return greaterThanCheck._zod.def.inclusive ? { minimum: Number(greaterThanCheck._zod.def.value) } : { exclusiveMinimum: Number(greaterThanCheck._zod.def.value) };
				}
				case "less_than": {
					const lessThanCheck = check$1;
					return lessThanCheck._zod.def.inclusive ? { maximum: Number(lessThanCheck._zod.def.value) } : { exclusiveMaximum: Number(lessThanCheck._zod.def.value) };
				}
				default: return {};
			}
		}));
	}
};
function isWebhookDefinition(definition) {
	return "type" in definition && definition.type === "webhook";
}
var OpenApiGeneratorV31 = class {
	constructor(definitions, options) {
		this.definitions = definitions;
		this.webhookRefs = {};
		const specifics = new OpenApiGeneratorV31Specifics();
		this.generator = new OpenAPIGenerator(this.definitions, specifics, options);
	}
	generateDocument(config$1) {
		const baseDocument = this.generator.generateDocumentData();
		this.definitions.filter(isWebhookDefinition).forEach((definition) => this.generateSingleWebhook(definition.webhook));
		return Object.assign(Object.assign(Object.assign({}, config$1), baseDocument), { webhooks: this.webhookRefs });
	}
	generateComponents() {
		return this.generator.generateComponents();
	}
	generateSingleWebhook(route) {
		const routeDoc = this.generator.generatePath(route);
		this.webhookRefs[route.path] = Object.assign(Object.assign({}, this.webhookRefs[route.path]), routeDoc);
		return routeDoc;
	}
};
var bufferToFormData = (arrayBuffer, contentType) => {
	return new Response(arrayBuffer, { headers: { "Content-Type": contentType } }).formData();
};
var jsonRegex = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var multipartRegex = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/;
var urlencodedRegex = /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var validator = (target, validationFunc) => {
	return async (c, next) => {
		let value = {};
		const contentType = c.req.header("Content-Type");
		switch (target) {
			case "json":
				if (!contentType || !jsonRegex.test(contentType)) break;
				try {
					value = await c.req.json();
				} catch {
					throw new HTTPException(400, { message: "Malformed JSON in request body" });
				}
				break;
			case "form": {
				if (!contentType || !(multipartRegex.test(contentType) || urlencodedRegex.test(contentType))) break;
				let formData;
				if (c.req.bodyCache.formData) formData = await c.req.bodyCache.formData;
				else try {
					const arrayBuffer = await c.req.arrayBuffer();
					formData = await bufferToFormData(arrayBuffer, contentType);
					c.req.bodyCache.formData = formData;
				} catch (e) {
					let message = "Malformed FormData request.";
					message += e instanceof Error ? ` ${e.message}` : ` ${String(e)}`;
					throw new HTTPException(400, { message });
				}
				const form = {};
				formData.forEach((value2, key) => {
					if (key.endsWith("[]")) (form[key] ??= []).push(value2);
					else if (Array.isArray(form[key])) form[key].push(value2);
					else if (key in form) form[key] = [form[key], value2];
					else form[key] = value2;
				});
				value = form;
				break;
			}
			case "query":
				value = Object.fromEntries(Object.entries(c.req.queries()).map(([k, v]) => {
					return v.length === 1 ? [k, v[0]] : [k, v];
				}));
				break;
			case "param":
				value = c.req.param();
				break;
			case "header":
				value = c.req.header();
				break;
			case "cookie":
				value = getCookie(c);
				break;
		}
		const res = await validationFunc(value, c);
		if (res instanceof Response) return res;
		c.req.addValidatedData(target, res);
		await next();
	};
};
var zValidator = (target, schema, hook, options) => validator(target, async (value, c) => {
	let validatorValue = value;
	if (target === "header" && "_def" in schema || target === "header" && "_zod" in schema) {
		const schemaKeys = Object.keys("in" in schema ? schema.in.shape : schema.shape);
		const caseInsensitiveKeymap = Object.fromEntries(schemaKeys.map((key) => [key.toLowerCase(), key]));
		validatorValue = Object.fromEntries(Object.entries(value).map(([key, value2]) => [caseInsensitiveKeymap[key] || key, value2]));
	}
	const result = options && options.validationFunction ? await options.validationFunction(schema, validatorValue) : await schema.safeParseAsync(validatorValue);
	if (hook) {
		const hookResult = await hook({
			data: validatorValue,
			...result,
			target
		}, c);
		if (hookResult) {
			if (hookResult instanceof Response) return hookResult;
			if ("response" in hookResult) return hookResult.response;
		}
	}
	if (!result.success) return c.json(result, 400);
	return result.data;
});
const ZodIssueCode = {
	invalid_type: "invalid_type",
	too_big: "too_big",
	too_small: "too_small",
	invalid_format: "invalid_format",
	not_multiple_of: "not_multiple_of",
	unrecognized_keys: "unrecognized_keys",
	invalid_union: "invalid_union",
	invalid_key: "invalid_key",
	invalid_element: "invalid_element",
	invalid_value: "invalid_value",
	custom: "custom"
};
function setErrorMap(map$1) {
	config({ customError: map$1 });
}
function getErrorMap() {
	return config().customError;
}
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind$1) {})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var coerce_exports = {};
__export(coerce_exports, {
	bigint: () => bigint,
	boolean: () => boolean,
	date: () => date,
	number: () => number,
	string: () => string
});
function string(params) {
	return _coercedString(ZodString, params);
}
function number(params) {
	return _coercedNumber(ZodNumber, params);
}
function boolean(params) {
	return _coercedBoolean(ZodBoolean, params);
}
function bigint(params) {
	return _coercedBigint(ZodBigInt, params);
}
function date(params) {
	return _coercedDate(ZodDate, params);
}
var external_exports = {};
__export(external_exports, {
	$brand: () => $brand,
	$input: () => $input,
	$output: () => $output,
	NEVER: () => NEVER,
	TimePrecision: () => TimePrecision,
	ZodAny: () => ZodAny,
	ZodArray: () => ZodArray,
	ZodBase64: () => ZodBase64,
	ZodBase64URL: () => ZodBase64URL,
	ZodBigInt: () => ZodBigInt,
	ZodBigIntFormat: () => ZodBigIntFormat,
	ZodBoolean: () => ZodBoolean,
	ZodCIDRv4: () => ZodCIDRv4,
	ZodCIDRv6: () => ZodCIDRv6,
	ZodCUID: () => ZodCUID,
	ZodCUID2: () => ZodCUID2,
	ZodCatch: () => ZodCatch,
	ZodCodec: () => ZodCodec,
	ZodCustom: () => ZodCustom,
	ZodCustomStringFormat: () => ZodCustomStringFormat,
	ZodDate: () => ZodDate,
	ZodDefault: () => ZodDefault,
	ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
	ZodE164: () => ZodE164,
	ZodEmail: () => ZodEmail,
	ZodEmoji: () => ZodEmoji,
	ZodEnum: () => ZodEnum,
	ZodError: () => ZodError,
	ZodFile: () => ZodFile,
	ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
	ZodFunction: () => ZodFunction,
	ZodGUID: () => ZodGUID,
	ZodIPv4: () => ZodIPv4,
	ZodIPv6: () => ZodIPv6,
	ZodISODate: () => ZodISODate,
	ZodISODateTime: () => ZodISODateTime,
	ZodISODuration: () => ZodISODuration,
	ZodISOTime: () => ZodISOTime,
	ZodIntersection: () => ZodIntersection,
	ZodIssueCode: () => ZodIssueCode,
	ZodJWT: () => ZodJWT,
	ZodKSUID: () => ZodKSUID,
	ZodLazy: () => ZodLazy,
	ZodLiteral: () => ZodLiteral,
	ZodMap: () => ZodMap,
	ZodNaN: () => ZodNaN,
	ZodNanoID: () => ZodNanoID,
	ZodNever: () => ZodNever,
	ZodNonOptional: () => ZodNonOptional,
	ZodNull: () => ZodNull,
	ZodNullable: () => ZodNullable,
	ZodNumber: () => ZodNumber,
	ZodNumberFormat: () => ZodNumberFormat,
	ZodObject: () => ZodObject,
	ZodOptional: () => ZodOptional,
	ZodPipe: () => ZodPipe,
	ZodPrefault: () => ZodPrefault,
	ZodPromise: () => ZodPromise,
	ZodReadonly: () => ZodReadonly,
	ZodRealError: () => ZodRealError,
	ZodRecord: () => ZodRecord,
	ZodSet: () => ZodSet,
	ZodString: () => ZodString,
	ZodStringFormat: () => ZodStringFormat,
	ZodSuccess: () => ZodSuccess,
	ZodSymbol: () => ZodSymbol,
	ZodTemplateLiteral: () => ZodTemplateLiteral,
	ZodTransform: () => ZodTransform,
	ZodTuple: () => ZodTuple,
	ZodType: () => ZodType,
	ZodULID: () => ZodULID,
	ZodURL: () => ZodURL,
	ZodUUID: () => ZodUUID,
	ZodUndefined: () => ZodUndefined,
	ZodUnion: () => ZodUnion,
	ZodUnknown: () => ZodUnknown,
	ZodVoid: () => ZodVoid,
	ZodXID: () => ZodXID,
	_ZodString: () => _ZodString,
	_default: () => _default,
	_function: () => _function,
	any: () => any,
	array: () => array,
	base64: () => base64,
	base64url: () => base64url,
	bigint: () => bigint$1,
	boolean: () => boolean$1,
	catch: () => _catch,
	check: () => check,
	cidrv4: () => cidrv4,
	cidrv6: () => cidrv6,
	clone: () => clone,
	codec: () => codec,
	coerce: () => coerce_exports,
	config: () => config,
	core: () => core_exports,
	cuid: () => cuid,
	cuid2: () => cuid2,
	custom: () => custom,
	date: () => date$1,
	decode: () => decode$2,
	decodeAsync: () => decodeAsync,
	discriminatedUnion: () => discriminatedUnion,
	e164: () => e164,
	email: () => email,
	emoji: () => emoji,
	encode: () => encode,
	encodeAsync: () => encodeAsync,
	endsWith: () => _endsWith,
	enum: () => _enum,
	file: () => file,
	flattenError: () => flattenError,
	float32: () => float32,
	float64: () => float64,
	formatError: () => formatError,
	function: () => _function,
	getErrorMap: () => getErrorMap,
	globalRegistry: () => globalRegistry,
	gt: () => _gt,
	gte: () => _gte,
	guid: () => guid,
	hash: () => hash,
	hex: () => hex,
	hostname: () => hostname,
	httpUrl: () => httpUrl,
	includes: () => _includes,
	instanceof: () => _instanceof,
	int: () => int,
	int32: () => int32,
	int64: () => int64,
	intersection: () => intersection,
	ipv4: () => ipv4,
	ipv6: () => ipv6,
	iso: () => iso_exports,
	json: () => json,
	jwt: () => jwt$1,
	keyof: () => keyof,
	ksuid: () => ksuid,
	lazy: () => lazy,
	length: () => _length,
	literal: () => literal,
	locales: () => locales_exports,
	looseObject: () => looseObject,
	lowercase: () => _lowercase,
	lt: () => _lt,
	lte: () => _lte,
	map: () => map,
	maxLength: () => _maxLength,
	maxSize: () => _maxSize,
	mime: () => _mime,
	minLength: () => _minLength,
	minSize: () => _minSize,
	multipleOf: () => _multipleOf,
	nan: () => nan,
	nanoid: () => nanoid,
	nativeEnum: () => nativeEnum,
	negative: () => _negative,
	never: () => never,
	nonnegative: () => _nonnegative,
	nonoptional: () => nonoptional,
	nonpositive: () => _nonpositive,
	normalize: () => _normalize,
	null: () => _null,
	nullable: () => nullable,
	nullish: () => nullish,
	number: () => number$1,
	object: () => object,
	optional: () => optional,
	overwrite: () => _overwrite,
	parse: () => parse$1,
	parseAsync: () => parseAsync,
	partialRecord: () => partialRecord,
	pipe: () => pipe,
	positive: () => _positive,
	prefault: () => prefault,
	preprocess: () => preprocess,
	prettifyError: () => prettifyError,
	promise: () => promise,
	property: () => _property,
	readonly: () => readonly,
	record: () => record,
	refine: () => refine,
	regex: () => _regex,
	regexes: () => regexes_exports,
	registry: () => registry,
	safeDecode: () => safeDecode,
	safeDecodeAsync: () => safeDecodeAsync,
	safeEncode: () => safeEncode,
	safeEncodeAsync: () => safeEncodeAsync,
	safeParse: () => safeParse,
	safeParseAsync: () => safeParseAsync,
	set: () => set,
	setErrorMap: () => setErrorMap,
	size: () => _size,
	startsWith: () => _startsWith,
	strictObject: () => strictObject,
	string: () => string$1,
	stringFormat: () => stringFormat,
	stringbool: () => stringbool,
	success: () => success,
	superRefine: () => superRefine,
	symbol: () => symbol,
	templateLiteral: () => templateLiteral,
	toJSONSchema: () => toJSONSchema,
	toLowerCase: () => _toLowerCase,
	toUpperCase: () => _toUpperCase,
	transform: () => transform,
	treeifyError: () => treeifyError,
	trim: () => _trim,
	tuple: () => tuple,
	uint32: () => uint32,
	uint64: () => uint64,
	ulid: () => ulid,
	undefined: () => _undefined,
	union: () => union,
	unknown: () => unknown,
	uppercase: () => _uppercase,
	url: () => url,
	util: () => util_exports,
	uuid: () => uuid,
	uuidv4: () => uuidv4,
	uuidv6: () => uuidv6,
	uuidv7: () => uuidv7,
	void: () => _void,
	xid: () => xid
});
config(en_default());
var OpenAPIHono = class _OpenAPIHono extends Hono {
	openAPIRegistry;
	defaultHook;
	constructor(init) {
		super(init);
		this.openAPIRegistry = new OpenAPIRegistry();
		this.defaultHook = init?.defaultHook;
	}
	openapi = ({ middleware: routeMiddleware, hide,...route }, handler, hook = this.defaultHook) => {
		if (!hide) this.openAPIRegistry.registerPath(route);
		const validators = [];
		if (route.request?.query) {
			const validator$1 = zValidator("query", route.request.query, hook);
			validators.push(validator$1);
		}
		if (route.request?.params) {
			const validator$1 = zValidator("param", route.request.params, hook);
			validators.push(validator$1);
		}
		if (route.request?.headers) {
			const validator$1 = zValidator("header", route.request.headers, hook);
			validators.push(validator$1);
		}
		if (route.request?.cookies) {
			const validator$1 = zValidator("cookie", route.request.cookies, hook);
			validators.push(validator$1);
		}
		const bodyContent = route.request?.body?.content;
		if (bodyContent) for (const mediaType of Object.keys(bodyContent)) {
			if (!bodyContent[mediaType]) continue;
			const schema = bodyContent[mediaType]["schema"];
			if (!(schema instanceof ZodType)) continue;
			if (isJSONContentType(mediaType)) {
				const validator$1 = zValidator("json", schema, hook);
				if (route.request?.body?.required) validators.push(validator$1);
				else {
					const mw = async (c, next) => {
						if (c.req.header("content-type")) {
							if (isJSONContentType(c.req.header("content-type"))) return await validator$1(c, next);
						}
						c.req.addValidatedData("json", {});
						await next();
					};
					validators.push(mw);
				}
			}
			if (isFormContentType(mediaType)) {
				const validator$1 = zValidator("form", schema, hook);
				if (route.request?.body?.required) validators.push(validator$1);
				else {
					const mw = async (c, next) => {
						if (c.req.header("content-type")) {
							if (isFormContentType(c.req.header("content-type"))) return await validator$1(c, next);
						}
						c.req.addValidatedData("form", {});
						await next();
					};
					validators.push(mw);
				}
			}
		}
		const middleware$1 = routeMiddleware ? Array.isArray(routeMiddleware) ? routeMiddleware : [routeMiddleware] : [];
		this.on([route.method], route.path.replaceAll(/\/{(.+?)}/g, "/:$1"), ...middleware$1, ...validators, handler);
		return this;
	};
	getOpenAPIDocument = (objectConfig, generatorConfig) => {
		const document = new OpenApiGeneratorV3(this.openAPIRegistry.definitions, generatorConfig).generateDocument(objectConfig);
		return this._basePath ? addBasePathToDocument(document, this._basePath) : document;
	};
	getOpenAPI31Document = (objectConfig, generatorConfig) => {
		const document = new OpenApiGeneratorV31(this.openAPIRegistry.definitions, generatorConfig).generateDocument(objectConfig);
		return this._basePath ? addBasePathToDocument(document, this._basePath) : document;
	};
	doc = (path, configureObject, configureGenerator) => {
		return this.get(path, (c) => {
			const objectConfig = typeof configureObject === "function" ? configureObject(c) : configureObject;
			const generatorConfig = typeof configureGenerator === "function" ? configureGenerator(c) : configureGenerator;
			try {
				const document = this.getOpenAPIDocument(objectConfig, generatorConfig);
				return c.json(document);
			} catch (e) {
				return c.json(e, 500);
			}
		});
	};
	doc31 = (path, configureObject, configureGenerator) => {
		return this.get(path, (c) => {
			const objectConfig = typeof configureObject === "function" ? configureObject(c) : configureObject;
			const generatorConfig = typeof configureGenerator === "function" ? configureGenerator(c) : configureGenerator;
			try {
				const document = this.getOpenAPI31Document(objectConfig, generatorConfig);
				return c.json(document);
			} catch (e) {
				return c.json(e, 500);
			}
		});
	};
	route(path, app$1) {
		const pathForOpenAPI = path.replaceAll(/:([^\/]+)/g, "{$1}");
		super.route(path, app$1);
		if (!(app$1 instanceof _OpenAPIHono)) return this;
		app$1.openAPIRegistry.definitions.forEach((def) => {
			switch (def.type) {
				case "component": return this.openAPIRegistry.registerComponent(def.componentType, def.name, def.component);
				case "route":
					this.openAPIRegistry.registerPath({
						...def.route,
						path: mergePath(pathForOpenAPI, app$1._basePath.replaceAll(/:([^\/]+)/g, "{$1}"), def.route.path)
					});
					return;
				case "webhook":
					this.openAPIRegistry.registerWebhook({
						...def.webhook,
						path: mergePath(pathForOpenAPI, app$1._basePath.replaceAll(/:([^\/]+)/g, "{$1}"), def.webhook.path)
					});
					return;
				case "schema": return this.openAPIRegistry.register(getOpenApiMetadata(def.schema)._internal?.refId, def.schema);
				case "parameter": return this.openAPIRegistry.registerParameter(getOpenApiMetadata(def.schema)._internal?.refId, def.schema);
				default: {
					const errorIfNotExhaustive = def;
					throw new Error(`Unknown registry type: ${errorIfNotExhaustive}`);
				}
			}
		});
		return this;
	}
	basePath(path) {
		return new _OpenAPIHono({
			...super.basePath(path),
			defaultHook: this.defaultHook
		});
	}
};
var createRoute = (routeConfig) => {
	const route = {
		...routeConfig,
		getRoutingPath() {
			return routeConfig.path.replaceAll(/\/{(.+?)}/g, "/:$1");
		}
	};
	return Object.defineProperty(route, "getRoutingPath", { enumerable: false });
};
extendZodWithOpenApi(external_exports);
function addBasePathToDocument(document, basePath) {
	const updatedPaths = {};
	Object.keys(document.paths).forEach((path) => {
		updatedPaths[mergePath(basePath.replaceAll(/:([^\/]+)/g, "{$1}"), path)] = document.paths[path];
	});
	return {
		...document,
		paths: updatedPaths
	};
}
function isJSONContentType(contentType) {
	return /^application\/([a-z-\.]+\+)?json/.test(contentType);
}
function isFormContentType(contentType) {
	return contentType.startsWith("multipart/form-data") || contentType.startsWith("application/x-www-form-urlencoded");
}
var html = (strings, ...values) => {
	const buffer = [""];
	for (let i = 0, len = strings.length - 1; i < len; i++) {
		buffer[0] += strings[i];
		const children = Array.isArray(values[i]) ? values[i].flat(Infinity) : [values[i]];
		for (let i2 = 0, len2 = children.length; i2 < len2; i2++) {
			const child = children[i2];
			if (typeof child === "string") escapeToBuffer(child, buffer);
			else if (typeof child === "number") buffer[0] += child;
			else if (typeof child === "boolean" || child === null || child === void 0) continue;
			else if (typeof child === "object" && child.isEscaped) if (child.callbacks) buffer.unshift("", child);
			else {
				const tmp = child.toString();
				if (tmp instanceof Promise) buffer.unshift("", tmp);
				else buffer[0] += tmp;
			}
			else if (child instanceof Promise) buffer.unshift("", child);
			else escapeToBuffer(child.toString(), buffer);
		}
	}
	buffer[0] += strings.at(-1);
	return buffer.length === 1 ? "callbacks" in buffer ? raw(resolveCallbackSync(raw(buffer[0], buffer.callbacks))) : raw(buffer[0]) : stringBufferToString(buffer, buffer.callbacks);
};
var RENDER_TYPE = {
	STRING_ARRAY: "string_array",
	STRING: "string",
	JSON_STRING: "json_string",
	RAW: "raw"
};
var RENDER_TYPE_MAP = {
	configUrl: RENDER_TYPE.STRING,
	deepLinking: RENDER_TYPE.RAW,
	presets: RENDER_TYPE.STRING_ARRAY,
	plugins: RENDER_TYPE.STRING_ARRAY,
	spec: RENDER_TYPE.JSON_STRING,
	url: RENDER_TYPE.STRING,
	urls: RENDER_TYPE.JSON_STRING,
	layout: RENDER_TYPE.STRING,
	docExpansion: RENDER_TYPE.STRING,
	maxDisplayedTags: RENDER_TYPE.RAW,
	operationsSorter: RENDER_TYPE.RAW,
	requestInterceptor: RENDER_TYPE.RAW,
	responseInterceptor: RENDER_TYPE.RAW,
	persistAuthorization: RENDER_TYPE.RAW,
	defaultModelsExpandDepth: RENDER_TYPE.RAW,
	defaultModelExpandDepth: RENDER_TYPE.RAW,
	defaultModelRendering: RENDER_TYPE.STRING,
	displayRequestDuration: RENDER_TYPE.RAW,
	filter: RENDER_TYPE.RAW,
	showExtensions: RENDER_TYPE.RAW,
	showCommonExtensions: RENDER_TYPE.RAW,
	queryConfigEnabled: RENDER_TYPE.RAW,
	displayOperationId: RENDER_TYPE.RAW,
	tagsSorter: RENDER_TYPE.RAW,
	onComplete: RENDER_TYPE.RAW,
	syntaxHighlight: RENDER_TYPE.JSON_STRING,
	tryItOutEnabled: RENDER_TYPE.RAW,
	requestSnippetsEnabled: RENDER_TYPE.RAW,
	requestSnippets: RENDER_TYPE.JSON_STRING,
	oauth2RedirectUrl: RENDER_TYPE.STRING,
	showMutabledRequest: RENDER_TYPE.RAW,
	request: RENDER_TYPE.JSON_STRING,
	supportedSubmitMethods: RENDER_TYPE.JSON_STRING,
	validatorUrl: RENDER_TYPE.STRING,
	withCredentials: RENDER_TYPE.RAW,
	modelPropertyMacro: RENDER_TYPE.RAW,
	parameterMacro: RENDER_TYPE.RAW
};
var renderSwaggerUIOptions = (options) => {
	return Object.entries(options).map(([k, v]) => {
		const key = k;
		if (!RENDER_TYPE_MAP[key] || v === void 0) return "";
		switch (RENDER_TYPE_MAP[key]) {
			case RENDER_TYPE.STRING: return `${key}: '${v}'`;
			case RENDER_TYPE.STRING_ARRAY:
				if (!Array.isArray(v)) return "";
				return `${key}: [${v.map((ve) => `${ve}`).join(",")}]`;
			case RENDER_TYPE.JSON_STRING: return `${key}: ${JSON.stringify(v)}`;
			case RENDER_TYPE.RAW: return `${key}: ${v}`;
			default: return "";
		}
	}).filter((item) => item !== "").join(",");
};
var remoteAssets = ({ version }) => {
	const url$1 = `https://cdn.jsdelivr.net/npm/swagger-ui-dist${version !== void 0 ? `@${version}` : ""}`;
	return {
		css: [`${url$1}/swagger-ui.css`],
		js: [`${url$1}/swagger-ui-bundle.js`]
	};
};
var SwaggerUI = (options) => {
	const asset = remoteAssets({ version: options?.version });
	delete options.version;
	if (options.manuallySwaggerUIHtml) return options.manuallySwaggerUIHtml(asset);
	const optionsStrings = renderSwaggerUIOptions(options);
	return `
    <div>
      <div id="swagger-ui"></div>
      ${asset.css.map((url$1) => html`<link rel="stylesheet" href="${url$1}" />`)}
      ${asset.js.map((url$1) => html`<script src="${url$1}" crossorigin="anonymous"><\/script>`)}
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',${optionsStrings},
          })
        }
      <\/script>
    </div>
  `;
};
var middleware = (options) => async (c) => {
	const title = options?.title ?? "SwaggerUI";
	return c.html(`
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="SwaggerUI" />
          <title>${title}</title>
        </head>
        <body>
          ${SwaggerUI(options)}
        </body>
      </html>
    `);
};
var defineWebSocketHelper = (handler) => {
	return (...args) => {
		if (typeof args[0] === "function") {
			const [createEvents, options] = args;
			return async function upgradeWebSocket(c, next) {
				const events = await createEvents(c);
				const result = await handler(c, events, options);
				if (result) return result;
				await next();
			};
		} else {
			const [c, events, options] = args;
			return (async () => {
				const upgraded = await handler(c, events, options);
				if (!upgraded) throw new Error("Failed to upgrade WebSocket");
				return upgraded;
			})();
		}
	};
};
require_stream();
require_receiver();
require_sender();
require_websocket();
var import_websocket_server = /* @__PURE__ */ __toESM(require_websocket_server(), 1);
var CloseEvent = globalThis.CloseEvent ?? class extends Event {
	#eventInitDict;
	constructor(type, eventInitDict = {}) {
		super(type, eventInitDict);
		this.#eventInitDict = eventInitDict;
	}
	get wasClean() {
		return this.#eventInitDict.wasClean ?? false;
	}
	get code() {
		return this.#eventInitDict.code ?? 0;
	}
	get reason() {
		return this.#eventInitDict.reason ?? "";
	}
};
var generateConnectionSymbol = () => Symbol("connection");
var CONNECTION_SYMBOL_KEY = Symbol("CONNECTION_SYMBOL_KEY");
var createNodeWebSocket = (init) => {
	const wss = new import_websocket_server.default({ noServer: true });
	const waiterMap = /* @__PURE__ */ new Map();
	wss.on("connection", (ws, request) => {
		const waiter = waiterMap.get(request);
		if (waiter) {
			waiter.resolve(ws);
			waiterMap.delete(request);
		}
	});
	const nodeUpgradeWebSocket = (request, connectionSymbol) => {
		return new Promise((resolve) => {
			waiterMap.set(request, {
				resolve,
				connectionSymbol
			});
		});
	};
	return {
		wss,
		injectWebSocket(server) {
			server.on("upgrade", async (request, socket, head) => {
				const url$1 = new URL(request.url ?? "/", init.baseUrl ?? "http://localhost");
				const headers = new Headers();
				for (const key in request.headers) {
					const value = request.headers[key];
					if (!value) continue;
					headers.append(key, Array.isArray(value) ? value[0] : value);
				}
				const env = {
					incoming: request,
					outgoing: void 0
				};
				await init.app.request(url$1, { headers }, env);
				const waiter = waiterMap.get(request);
				if (!waiter || waiter.connectionSymbol !== env[CONNECTION_SYMBOL_KEY]) {
					socket.end("HTTP/1.1 400 Bad Request\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");
					waiterMap.delete(request);
					return;
				}
				wss.handleUpgrade(request, socket, head, (ws) => {
					wss.emit("connection", ws, request);
				});
			});
		},
		upgradeWebSocket: defineWebSocketHelper(async (c, events, options) => {
			if (c.req.header("upgrade")?.toLowerCase() !== "websocket") return;
			const connectionSymbol = generateConnectionSymbol();
			c.env[CONNECTION_SYMBOL_KEY] = connectionSymbol;
			(async () => {
				const ws = await nodeUpgradeWebSocket(c.env.incoming, connectionSymbol);
				const messagesReceivedInStarting = [];
				const bufferMessage = (data, isBinary) => {
					messagesReceivedInStarting.push([data, isBinary]);
				};
				ws.on("message", bufferMessage);
				const ctx = {
					binaryType: "arraybuffer",
					close(code, reason) {
						ws.close(code, reason);
					},
					protocol: ws.protocol,
					raw: ws,
					get readyState() {
						return ws.readyState;
					},
					send(source, opts) {
						ws.send(source, { compress: opts?.compress });
					},
					url: new URL(c.req.url)
				};
				try {
					events?.onOpen?.(new Event("open"), ctx);
				} catch (e) {
					(options?.onError ?? console.error)(e);
				}
				const handleMessage = (data, isBinary) => {
					const datas = Array.isArray(data) ? data : [data];
					for (const data2 of datas) try {
						events?.onMessage?.(new MessageEvent("message", { data: isBinary ? data2 instanceof ArrayBuffer ? data2 : data2.buffer.slice(data2.byteOffset, data2.byteOffset + data2.byteLength) : data2.toString("utf-8") }), ctx);
					} catch (e) {
						(options?.onError ?? console.error)(e);
					}
				};
				ws.off("message", bufferMessage);
				for (const message of messagesReceivedInStarting) handleMessage(...message);
				ws.on("message", (data, isBinary) => {
					handleMessage(data, isBinary);
				});
				ws.on("close", (code, reason) => {
					try {
						events?.onClose?.(new CloseEvent("close", {
							code,
							reason: reason.toString()
						}), ctx);
					} catch (e) {
						(options?.onError ?? console.error)(e);
					}
				});
				ws.on("error", (error) => {
					try {
						events?.onError?.(new ErrorEvent("error", { error }), ctx);
					} catch (e) {
						(options?.onError ?? console.error)(e);
					}
				});
			})();
			return new Response();
		})
	};
};
const JWTPayloadSchema = object({
	id: string$1(),
	iat: number$1()
});
const SongInfoSchema = object({
	title: string$1(),
	artist: string$1(),
	views: number$1(),
	uploadDate: string$1().optional(),
	imageSrc: string$1().nullable().optional(),
	isPaused: boolean$1().optional(),
	songDuration: number$1(),
	elapsedSeconds: number$1().optional(),
	url: string$1().optional(),
	album: string$1().nullable().optional(),
	videoId: string$1(),
	playlistId: string$1().optional(),
	mediaType: _enum([
		MediaType.Audio,
		MediaType.OriginalMusicVideo,
		MediaType.UserGeneratedContent,
		MediaType.PodcastEpisode,
		MediaType.OtherVideo
	])
});
const SeekSchema = object({ seconds: number$1() });
const GoBackSchema = object({ seconds: number$1() });
const GoForwardScheme = object({ seconds: number$1() });
const SwitchRepeatSchema = object({ iteration: number$1() });
const SetVolumeSchema = object({ volume: number$1() });
const SetFullscreenSchema = object({ state: boolean$1() });
const QueueParamsSchema = object({ index: number().int().nonnegative() });
const AddSongToQueueSchema = object({
	videoId: string$1(),
	insertPosition: _enum(["INSERT_AT_END", "INSERT_AFTER_CURRENT_VIDEO"]).optional().default("INSERT_AT_END")
});
const MoveSongInQueueSchema = object({ toIndex: number$1() });
const SetQueueIndexSchema = object({ index: number$1().int().nonnegative() });
const SearchSchema = object({
	query: string$1(),
	params: string$1().optional(),
	continuation: string$1().optional()
});
const API_VERSION = "v1";
var routes$1 = {
	previous: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/previous`,
		summary: "play previous song",
		description: "Plays the previous song in the queue",
		responses: { 204: { description: "Success" } }
	}),
	next: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/next`,
		summary: "play next song",
		description: "Plays the next song in the queue",
		responses: { 204: { description: "Success" } }
	}),
	play: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/play`,
		summary: "Play",
		description: "Change the state of the player to play",
		responses: { 204: { description: "Success" } }
	}),
	pause: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/pause`,
		summary: "Pause",
		description: "Change the state of the player to pause",
		responses: { 204: { description: "Success" } }
	}),
	togglePlay: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/toggle-play`,
		summary: "Toggle play/pause",
		description: "Change the state of the player to play if paused, or pause if playing",
		responses: { 204: { description: "Success" } }
	}),
	getLikeState: createRoute({
		method: "get",
		path: `/api/${API_VERSION}/like-state`,
		summary: "get like state",
		description: "Get the current like state",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: object({ state: _enum(LikeType).nullable() }) } }
		} }
	}),
	like: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/like`,
		summary: "like song",
		description: "Set the current song as liked",
		responses: { 204: { description: "Success" } }
	}),
	dislike: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/dislike`,
		summary: "dislike song",
		description: "Set the current song as disliked",
		responses: { 204: { description: "Success" } }
	}),
	seekTo: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/seek-to`,
		summary: "seek",
		description: "Seek to a specific time in the current song",
		request: { body: {
			description: "seconds to seek to",
			content: { "application/json": { schema: SeekSchema } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	goBack: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/go-back`,
		summary: "go back",
		description: "Move the current song back by a number of seconds",
		request: { body: {
			description: "seconds to go back",
			content: { "application/json": { schema: GoBackSchema } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	goForward: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/go-forward`,
		summary: "go forward",
		description: "Move the current song forward by a number of seconds",
		request: { body: {
			description: "seconds to go forward",
			content: { "application/json": { schema: GoForwardScheme } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	getShuffleState: createRoute({
		method: "get",
		path: `/api/${API_VERSION}/shuffle`,
		summary: "get shuffle state",
		description: "Get the current shuffle state",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: object({ state: boolean$1().nullable() }) } }
		} }
	}),
	shuffle: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/shuffle`,
		summary: "shuffle",
		description: "Shuffle the queue",
		responses: { 204: { description: "Success" } }
	}),
	repeatMode: createRoute({
		method: "get",
		path: `/api/${API_VERSION}/repeat-mode`,
		summary: "get current repeat mode",
		description: "Get the current repeat mode (NONE, ALL, ONE)",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: object({ mode: _enum([
				"ONE",
				"NONE",
				"ALL"
			]).nullable() }) } }
		} }
	}),
	switchRepeat: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/switch-repeat`,
		summary: "switch repeat",
		description: "Switch the repeat mode",
		request: { body: {
			description: "number of times to click the repeat button",
			content: { "application/json": { schema: SwitchRepeatSchema } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	setVolume: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/volume`,
		summary: "set volume",
		description: "Set the volume of the player",
		request: { body: {
			description: "volume to set",
			content: { "application/json": { schema: SetVolumeSchema } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	getVolumeState: createRoute({
		method: "get",
		path: `/api/${API_VERSION}/volume`,
		summary: "get volume state",
		description: "Get the current volume state of the player",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: object({
				state: number$1(),
				isMuted: boolean$1()
			}) } }
		} }
	}),
	setFullscreen: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/fullscreen`,
		summary: "set fullscreen",
		description: "Set the fullscreen state of the player",
		request: { body: {
			description: "fullscreen state",
			content: { "application/json": { schema: SetFullscreenSchema } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	toggleMute: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/toggle-mute`,
		summary: "toggle mute",
		description: "Toggle the mute state of the player",
		responses: { 204: { description: "Success" } }
	}),
	getFullscreenState: createRoute({
		method: "get",
		path: `/api/${API_VERSION}/fullscreen`,
		summary: "get fullscreen state",
		description: "Get the current fullscreen state",
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: object({ state: boolean$1() }) } }
		} }
	}),
	oldQueueInfo: createRoute({
		deprecated: true,
		method: "get",
		path: `/api/${API_VERSION}/queue-info`,
		summary: "get current queue info",
		description: "Get the current queue info",
		responses: {
			200: {
				description: "Success",
				content: { "application/json": { schema: object({}) } }
			},
			204: { description: "No queue info" }
		}
	}),
	oldSongInfo: createRoute({
		deprecated: true,
		method: "get",
		path: `/api/${API_VERSION}/song-info`,
		summary: "get current song info",
		description: "Get the current song info",
		responses: {
			200: {
				description: "Success",
				content: { "application/json": { schema: SongInfoSchema } }
			},
			204: { description: "No song info" }
		}
	}),
	songInfo: createRoute({
		method: "get",
		path: `/api/${API_VERSION}/song`,
		summary: "get current song info",
		description: "Get the current song info",
		responses: {
			200: {
				description: "Success",
				content: { "application/json": { schema: SongInfoSchema } }
			},
			204: { description: "No song info" }
		}
	}),
	queueInfo: createRoute({
		method: "get",
		path: `/api/${API_VERSION}/queue`,
		summary: "get current queue info",
		description: "Get the current queue info",
		responses: {
			200: {
				description: "Success",
				content: { "application/json": { schema: object({}) } }
			},
			204: { description: "No queue info" }
		}
	}),
	addSongToQueue: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/queue`,
		summary: "add song to queue",
		description: "Add a song to the queue",
		request: { body: {
			description: "video id of the song to add",
			content: { "application/json": { schema: AddSongToQueueSchema } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	moveSongInQueue: createRoute({
		method: "patch",
		path: `/api/${API_VERSION}/queue/{index}`,
		summary: "move song in queue",
		description: "Move a song in the queue",
		request: {
			params: QueueParamsSchema,
			body: {
				description: "index to move the song to",
				content: { "application/json": { schema: MoveSongInQueueSchema } }
			}
		},
		responses: { 204: { description: "Success" } }
	}),
	removeSongFromQueue: createRoute({
		method: "delete",
		path: `/api/${API_VERSION}/queue/{index}`,
		summary: "remove song from queue",
		description: "Remove a song from the queue",
		request: { params: QueueParamsSchema },
		responses: { 204: { description: "Success" } }
	}),
	setQueueIndex: createRoute({
		method: "patch",
		path: `/api/${API_VERSION}/queue`,
		summary: "set queue index",
		description: "Set the current index of the queue",
		request: { body: {
			description: "index to move the song to",
			content: { "application/json": { schema: SetQueueIndexSchema } }
		} },
		responses: { 204: { description: "Success" } }
	}),
	clearQueue: createRoute({
		method: "delete",
		path: `/api/${API_VERSION}/queue`,
		summary: "clear queue",
		description: "Clear the queue",
		responses: { 204: { description: "Success" } }
	}),
	search: createRoute({
		method: "post",
		path: `/api/${API_VERSION}/search`,
		summary: "search for a song",
		description: "search for a song",
		request: { body: {
			description: "search query",
			content: { "application/json": { schema: SearchSchema } }
		} },
		responses: { 200: {
			description: "Success",
			content: { "application/json": { schema: object({}) } }
		} }
	})
};
const register$1 = (app$1, { window }, songInfoGetter, repeatModeGetter, likeTypeGetter, volumeStateGetter) => {
	const controller = getSongControls(window);
	app$1.openapi(routes$1.previous, (ctx) => {
		controller.previous();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.next, (ctx) => {
		controller.next();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.play, (ctx) => {
		controller.play();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.pause, (ctx) => {
		controller.pause();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.togglePlay, (ctx) => {
		controller.playPause();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.getLikeState, async (ctx) => {
		ctx.status(200);
		return ctx.json({ state: await likeTypeGetter() ?? null });
	});
	app$1.openapi(routes$1.like, (ctx) => {
		controller.like();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.dislike, (ctx) => {
		controller.dislike();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.seekTo, (ctx) => {
		const { seconds } = ctx.req.valid("json");
		controller.seekTo(seconds);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.goBack, (ctx) => {
		const { seconds } = ctx.req.valid("json");
		controller.goBack(seconds);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.goForward, (ctx) => {
		const { seconds } = ctx.req.valid("json");
		controller.goForward(seconds);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.getShuffleState, async (ctx) => {
		const isShuffled = await new Promise((resolve) => {
			ipcMain.once("peard:get-shuffle-response", (_, isShuffled$1) => {
				return resolve(!!isShuffled$1);
			});
			controller.requestShuffleInformation();
		});
		ctx.status(200);
		return ctx.json({ state: isShuffled });
	});
	app$1.openapi(routes$1.shuffle, (ctx) => {
		controller.shuffle();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.repeatMode, async (ctx) => {
		ctx.status(200);
		return ctx.json({ mode: await repeatModeGetter() ?? null });
	});
	app$1.openapi(routes$1.switchRepeat, (ctx) => {
		const { iteration } = ctx.req.valid("json");
		controller.switchRepeat(iteration);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.setVolume, (ctx) => {
		const { volume } = ctx.req.valid("json");
		controller.setVolume(volume);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.getVolumeState, async (ctx) => {
		ctx.status(200);
		return ctx.json(await volumeStateGetter() ?? {
			state: 0,
			isMuted: false
		});
	});
	app$1.openapi(routes$1.setFullscreen, (ctx) => {
		const { state } = ctx.req.valid("json");
		controller.setFullscreen(state);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.toggleMute, (ctx) => {
		controller.muteUnmute();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.getFullscreenState, async (ctx) => {
		const fullscreen = await new Promise((resolve) => {
			ipcMain.once("peard:set-fullscreen", (_, isFullscreen) => {
				return resolve(!!isFullscreen);
			});
			controller.requestFullscreenInformation();
		});
		ctx.status(200);
		return ctx.json({ state: fullscreen });
	});
	const songInfo = async (ctx) => {
		const info = await songInfoGetter();
		if (!info) {
			ctx.status(204);
			return ctx.body(null);
		}
		const body = { ...info };
		delete body.image;
		ctx.status(200);
		return ctx.json(body);
	};
	app$1.openapi(routes$1.oldSongInfo, songInfo);
	app$1.openapi(routes$1.songInfo, songInfo);
	const queueInfo = async (ctx) => {
		const info = await new Promise((resolve) => {
			ipcMain.once("peard:get-queue-response", (_, queue) => {
				return resolve(queue);
			});
			controller.requestQueueInformation();
		});
		if (!info) {
			ctx.status(204);
			return ctx.body(null);
		}
		ctx.status(200);
		return ctx.json(info);
	};
	app$1.openapi(routes$1.oldQueueInfo, queueInfo);
	app$1.openapi(routes$1.queueInfo, queueInfo);
	app$1.openapi(routes$1.addSongToQueue, (ctx) => {
		const { videoId, insertPosition } = ctx.req.valid("json");
		controller.addSongToQueue(videoId, insertPosition);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.moveSongInQueue, (ctx) => {
		const index = Number(ctx.req.param("index"));
		const { toIndex } = ctx.req.valid("json");
		controller.moveSongInQueue(index, toIndex);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.removeSongFromQueue, (ctx) => {
		const index = Number(ctx.req.param("index"));
		controller.removeSongFromQueue(index);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.setQueueIndex, (ctx) => {
		const { index } = ctx.req.valid("json");
		controller.setQueueIndex(index);
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.clearQueue, (ctx) => {
		controller.clearQueue();
		ctx.status(204);
		return ctx.body(null);
	});
	app$1.openapi(routes$1.search, async (ctx) => {
		const { query, params, continuation } = ctx.req.valid("json");
		const response = await controller.search(query, params, continuation);
		ctx.status(200);
		return ctx.json(response);
	});
};
var getConnInfo = (c) => {
	const bindings = c.env.server ? c.env.server : c.env;
	const address = bindings.incoming.socket.remoteAddress;
	const port = bindings.incoming.socket.remotePort;
	const family = bindings.incoming.socket.remoteFamily;
	return { remote: {
		address,
		port,
		addressType: family === "IPv4" ? "IPv4" : family === "IPv6" ? "IPv6" : void 0
	} };
};
var routes = { request: createRoute({
	method: "post",
	path: "/auth/{id}",
	summary: "",
	description: "",
	security: [],
	request: { params: object({ id: string$1() }) },
	responses: {
		200: {
			description: "Success",
			content: { "application/json": { schema: object({ accessToken: string$1() }) } }
		},
		403: { description: "Forbidden" }
	}
}) };
const register = (app$1, { getConfig, setConfig }) => {
	app$1.openapi(routes.request, async (ctx) => {
		const config$1 = await getConfig();
		const { id } = ctx.req.param();
		if (config$1.authorizedClients.includes(id)) {} else if (config$1.authStrategy === AuthStrategy.AUTH_AT_FIRST) {
			if ((await dialog.showMessageBox({
				title: t("plugins.api-server.dialog.request.title"),
				message: t("plugins.api-server.dialog.request.message", {
					origin: getConnInfo(ctx).remote.address,
					ID: id
				}),
				buttons: [t("plugins.api-server.dialog.request.buttons.allow"), t("plugins.api-server.dialog.request.buttons.deny")],
				defaultId: 1,
				cancelId: 1
			})).response === 1) {
				ctx.status(403);
				return ctx.body(null);
			}
		} else if (config$1.authStrategy === AuthStrategy.NONE) {}
		if (!config$1.authorizedClients.includes(id)) setConfig({ authorizedClients: [...config$1.authorizedClients, id] });
		const token = await sign({
			id,
			iat: ~~(Date.now() / 1e3)
		}, config$1.secret);
		ctx.status(200);
		return ctx.json({ accessToken: token });
	});
};
var DataTypes = /* @__PURE__ */ function(DataTypes$1) {
	DataTypes$1["PlayerInfo"] = "PLAYER_INFO";
	DataTypes$1["VideoChanged"] = "VIDEO_CHANGED";
	DataTypes$1["PlayerStateChanged"] = "PLAYER_STATE_CHANGED";
	DataTypes$1["PositionChanged"] = "POSITION_CHANGED";
	DataTypes$1["VolumeChanged"] = "VOLUME_CHANGED";
	DataTypes$1["RepeatChanged"] = "REPEAT_CHANGED";
	DataTypes$1["ShuffleChanged"] = "SHUFFLE_CHANGED";
	return DataTypes$1;
}(DataTypes || {});
const register$2 = (app$1, { ipc }, { upgradeWebSocket }) => {
	let volumeState = void 0;
	let repeat = "NONE";
	let shuffle = false;
	let lastSongInfo = void 0;
	const sockets = /* @__PURE__ */ new Set();
	const send = (type, state) => {
		sockets.forEach((socket) => socket.send(JSON.stringify({
			type,
			...state
		})));
	};
	const createPlayerState = ({ songInfo, volumeState: volumeState$1, repeat: repeat$1, shuffle: shuffle$1 }) => ({
		song: songInfo,
		isPlaying: songInfo ? !songInfo.isPaused : false,
		muted: volumeState$1?.isMuted ?? false,
		position: songInfo?.elapsedSeconds ?? 0,
		volume: volumeState$1?.state ?? 100,
		repeat: repeat$1,
		shuffle: shuffle$1
	});
	registerCallback((songInfo, event) => {
		if (event === SongInfoEvent.VideoSrcChanged) send(DataTypes.VideoChanged, {
			song: songInfo,
			position: 0
		});
		if (event === SongInfoEvent.PlayOrPaused) send(DataTypes.PlayerStateChanged, {
			isPlaying: !(songInfo?.isPaused ?? true),
			position: songInfo.elapsedSeconds
		});
		if (event === SongInfoEvent.TimeChanged) send(DataTypes.PositionChanged, { position: songInfo.elapsedSeconds });
		lastSongInfo = { ...songInfo };
	});
	ipc.on("peard:volume-changed", (newVolumeState) => {
		volumeState = newVolumeState;
		send(DataTypes.VolumeChanged, {
			volume: volumeState.state,
			muted: volumeState.isMuted
		});
	});
	ipc.on("peard:repeat-changed", (mode) => {
		repeat = mode;
		send(DataTypes.RepeatChanged, { repeat });
	});
	ipc.on("peard:seeked", (t$1) => {
		send(DataTypes.PositionChanged, { position: t$1 });
	});
	ipc.on("peard:shuffle-changed", (newShuffle) => {
		shuffle = newShuffle;
		send(DataTypes.ShuffleChanged, { shuffle });
	});
	app$1.openapi(createRoute({
		method: "get",
		path: `/api/${API_VERSION}/ws`,
		summary: "websocket endpoint",
		description: "WebSocket endpoint for real-time updates",
		responses: { 101: { description: "Switching Protocols" } }
	}), upgradeWebSocket(() => ({
		onOpen(_, ws) {
			sockets.add(ws);
			ws.send(JSON.stringify({
				type: DataTypes.PlayerInfo,
				...createPlayerState({
					songInfo: lastSongInfo,
					volumeState,
					repeat,
					shuffle
				})
			}));
		},
		onClose(_, ws) {
			sockets.delete(ws);
		}
	})));
};
const backend = createBackend({
	async start(ctx) {
		const config$1 = await ctx.getConfig();
		this.init(ctx);
		registerCallback((songInfo) => {
			this.songInfo = songInfo;
		});
		ctx.ipc.on("peard:player-api-loaded", () => {
			ctx.ipc.send("peard:setup-seeked-listener");
			ctx.ipc.send("peard:setup-time-changed-listener");
			ctx.ipc.send("peard:setup-repeat-changed-listener");
			ctx.ipc.send("peard:setup-like-changed-listener");
			ctx.ipc.send("peard:setup-volume-changed-listener");
			ctx.ipc.send("peard:setup-shuffle-changed-listener");
		});
		ctx.ipc.on("peard:repeat-changed", (mode) => this.currentRepeatMode = mode);
		ctx.ipc.on("peard:volume-changed", (newVolumeState) => this.volumeState = newVolumeState);
		this.run(config$1.hostname, config$1.port);
	},
	stop() {
		this.end();
	},
	onConfigChange(config$1) {
		if (this.oldConfig?.hostname === config$1.hostname && this.oldConfig?.port === config$1.port) {
			this.oldConfig = config$1;
			return;
		}
		this.end();
		this.run(config$1.hostname, config$1.port);
		this.oldConfig = config$1;
	},
	init(backendCtx) {
		this.app = new OpenAPIHono();
		const ws = createNodeWebSocket({ app: this.app });
		this.app.use("*", cors());
		this.app.use("*", async (ctx, next) => {
			ctx.header("Access-Control-Request-Private-Network", "true");
			await next();
		});
		this.app.use("/api/*", async (ctx, next) => {
			const config$1 = await backendCtx.getConfig();
			if (config$1.authStrategy !== AuthStrategy.NONE) return await jwt({ secret: config$1.secret })(ctx, next);
			await next();
		});
		this.app.use("/api/*", async (ctx, next) => {
			const result = await JWTPayloadSchema.spa(await ctx.get("jwtPayload"));
			const config$1 = await backendCtx.getConfig();
			if (!(config$1.authStrategy === AuthStrategy.NONE || result.success && config$1.authorizedClients.includes(result.data.id))) {
				ctx.status(401);
				return ctx.body("Unauthorized");
			}
			return await next();
		});
		register$1(this.app, backendCtx, () => this.songInfo, () => this.currentRepeatMode, () => backendCtx.window.webContents.executeJavaScript("document.querySelector(\"#like-button-renderer\")?.likeStatus"), () => this.volumeState);
		register(this.app, backendCtx);
		register$2(this.app, backendCtx, ws);
		this.app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT"
		});
		this.app.doc("/doc", {
			openapi: "3.1.0",
			info: {
				version: "1.0.0",
				title: "Arvoxify API Server",
				description: "Note: You need to get an access token using the `/auth/{id}` endpoint first to call any API endpoints under `/api`."
			},
			security: [{ bearerAuth: [] }]
		});
		this.app.get("/swagger", middleware({ url: "/doc" }));
		this.injectWebSocket = ws.injectWebSocket.bind(this);
	},
	run(hostname$1, port) {
		if (!this.app) return;
		try {
			this.server = serve({
				fetch: this.app.fetch.bind(this.app),
				port,
				hostname: hostname$1
			});
			if (this.injectWebSocket && this.server) this.injectWebSocket(this.server);
		} catch (err) {
			console.error(err);
		}
	},
	end() {
		this.server?.close();
		this.server = void 0;
	}
});
var api_server_default = createPlugin({
	name: () => t("plugins.api-server.name"),
	description: () => t("plugins.api-server.description"),
	restartNeeded: false,
	config: defaultAPIServerConfig,
	addedVersion: "3.6.X",
	menu: onMenu,
	backend
});
const pluginStub = {
	name: () => t("plugins.api-server.name"),
	description: () => t("plugins.api-server.description"),
	restartNeeded: false,
	config: defaultAPIServerConfig,
	addedVersion: "3.6.X",
	menu: onMenu
};
export { api_server_default as default, pluginStub };
