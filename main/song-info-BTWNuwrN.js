import { n as get, r as set } from "./config-n3n9Pwqt.js";
import { ipcMain, nativeImage, net } from "electron";
var E_CANCELED = /* @__PURE__ */ new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
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
var Semaphore = class {
	constructor(_value, _cancelError = E_CANCELED) {
		this._value = _value;
		this._cancelError = _cancelError;
		this._queue = [];
		this._weightedWaiters = [];
	}
	acquire(weight = 1, priority = 0) {
		if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
		return new Promise((resolve, reject) => {
			const task = {
				resolve,
				reject,
				weight,
				priority
			};
			const i = findIndexFromEnd(this._queue, (other) => priority <= other.priority);
			if (i === -1 && weight <= this._value) this._dispatchItem(task);
			else this._queue.splice(i + 1, 0, task);
		});
	}
	runExclusive(callback_1) {
		return __awaiter$2(this, arguments, void 0, function* (callback, weight = 1, priority = 0) {
			const [value, release] = yield this.acquire(weight, priority);
			try {
				return yield callback(value);
			} finally {
				release();
			}
		});
	}
	waitForUnlock(weight = 1, priority = 0) {
		if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
		if (this._couldLockImmediately(weight, priority)) return Promise.resolve();
		else return new Promise((resolve) => {
			if (!this._weightedWaiters[weight - 1]) this._weightedWaiters[weight - 1] = [];
			insertSorted(this._weightedWaiters[weight - 1], {
				resolve,
				priority
			});
		});
	}
	isLocked() {
		return this._value <= 0;
	}
	getValue() {
		return this._value;
	}
	setValue(value) {
		this._value = value;
		this._dispatchQueue();
	}
	release(weight = 1) {
		if (weight <= 0) throw new Error(`invalid weight ${weight}: must be positive`);
		this._value += weight;
		this._dispatchQueue();
	}
	cancel() {
		this._queue.forEach((entry) => entry.reject(this._cancelError));
		this._queue = [];
	}
	_dispatchQueue() {
		this._drainUnlockWaiters();
		while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
			this._dispatchItem(this._queue.shift());
			this._drainUnlockWaiters();
		}
	}
	_dispatchItem(item) {
		const previousValue = this._value;
		this._value -= item.weight;
		item.resolve([previousValue, this._newReleaser(item.weight)]);
	}
	_newReleaser(weight) {
		let called = false;
		return () => {
			if (called) return;
			called = true;
			this.release(weight);
		};
	}
	_drainUnlockWaiters() {
		if (this._queue.length === 0) for (let weight = this._value; weight > 0; weight--) {
			const waiters = this._weightedWaiters[weight - 1];
			if (!waiters) continue;
			waiters.forEach((waiter) => waiter.resolve());
			this._weightedWaiters[weight - 1] = [];
		}
		else {
			const queuedPriority = this._queue[0].priority;
			for (let weight = this._value; weight > 0; weight--) {
				const waiters = this._weightedWaiters[weight - 1];
				if (!waiters) continue;
				const i = waiters.findIndex((waiter) => waiter.priority <= queuedPriority);
				(i === -1 ? waiters : waiters.splice(0, i)).forEach(((waiter) => waiter.resolve()));
			}
		}
	}
	_couldLockImmediately(weight, priority) {
		return (this._queue.length === 0 || this._queue[0].priority < priority) && weight <= this._value;
	}
};
function insertSorted(a, v) {
	const i = findIndexFromEnd(a, (other) => v.priority <= other.priority);
	a.splice(i + 1, 0, v);
}
function findIndexFromEnd(a, predicate) {
	for (let i = a.length - 1; i >= 0; i--) if (predicate(a[i])) return i;
	return -1;
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
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
var Mutex = class {
	constructor(cancelError) {
		this._semaphore = new Semaphore(1, cancelError);
	}
	acquire() {
		return __awaiter$1(this, arguments, void 0, function* (priority = 0) {
			const [, releaser] = yield this._semaphore.acquire(1, priority);
			return releaser;
		});
	}
	runExclusive(callback, priority = 0) {
		return this._semaphore.runExclusive(() => callback(), 1, priority);
	}
	isLocked() {
		return this._semaphore.isLocked();
	}
	waitForUnlock(priority = 0) {
		return this._semaphore.waitForUnlock(1, priority);
	}
	release() {
		if (this._semaphore.isLocked()) this._semaphore.release();
	}
	cancel() {
		return this._semaphore.cancel();
	}
};
let MediaType = /* @__PURE__ */ function(MediaType$1) {
	MediaType$1["Audio"] = "AUDIO";
	MediaType$1["OriginalMusicVideo"] = "ORIGINAL_MUSIC_VIDEO";
	MediaType$1["UserGeneratedContent"] = "USER_GENERATED_CONTENT";
	MediaType$1["PodcastEpisode"] = "PODCAST_EPISODE";
	MediaType$1["OtherVideo"] = "OTHER_VIDEO";
	return MediaType$1;
}({});
const getImage = async (src) => {
	const result = await net.fetch(src);
	const output = nativeImage.createFromBuffer(Buffer.from(await result.arrayBuffer()));
	if (output.isEmpty() && !src.endsWith(".jpg") && src.includes(".jpg")) return getImage(src.slice(0, src.lastIndexOf(".jpg") + 4));
	return output;
};
var handleData = async (data, win) => {
	if (!data) return null;
	const songInfo = {
		title: "",
		alternativeTitle: "",
		artist: "",
		artistUrl: "",
		views: 0,
		uploadDate: "",
		imageSrc: "",
		image: null,
		isPaused: void 0,
		songDuration: 0,
		elapsedSeconds: 0,
		url: "",
		album: void 0,
		videoId: "",
		playlistId: "",
		mediaType: MediaType.Audio,
		tags: []
	};
	const microformat = data.microformat?.microformatDataRenderer;
	if (microformat) {
		songInfo.uploadDate = microformat.uploadDate;
		songInfo.url = microformat.urlCanonical?.split("&")[0];
		songInfo.playlistId = new URL(microformat.urlCanonical).searchParams.get("list") ?? "";
		if (microformat.pageOwnerDetails?.externalChannelId) songInfo.artistUrl = `https://music.\u0079\u006f\u0075\u0074\u0075\u0062\u0065.com/channel/${microformat.pageOwnerDetails.externalChannelId}`;
		set("url", microformat.urlCanonical);
		songInfo.alternativeTitle = microformat.linkAlternates.find((link) => link.title)?.title;
		songInfo.tags = Array.isArray(microformat.tags) ? microformat.tags : [];
	}
	const { videoDetails } = data;
	if (videoDetails) {
		songInfo.title = cleanupName(videoDetails.title);
		songInfo.artist = cleanupName(videoDetails.author);
		songInfo.views = Number(videoDetails.viewCount);
		songInfo.songDuration = Number(videoDetails.lengthSeconds);
		songInfo.elapsedSeconds = videoDetails.elapsedSeconds;
		songInfo.isPaused = videoDetails.isPaused;
		songInfo.videoId = videoDetails.videoId;
		songInfo.album = videoDetails.album;
		switch (videoDetails?.musicVideoType) {
			case "MUSIC_VIDEO_TYPE_ATV":
				songInfo.mediaType = MediaType.Audio;
				break;
			case "MUSIC_VIDEO_TYPE_OMV":
				songInfo.mediaType = MediaType.OriginalMusicVideo;
				break;
			case "MUSIC_VIDEO_TYPE_UGC":
				songInfo.mediaType = MediaType.UserGeneratedContent;
				break;
			case "MUSIC_VIDEO_TYPE_PODCAST_EPISODE":
				songInfo.mediaType = MediaType.PodcastEpisode;
				if (!get("options.usePodcastParticipantAsArtist")) songInfo.artist = cleanupName(data.microformat.microformatDataRenderer.pageOwnerDetails.name);
				break;
			default:
				songInfo.mediaType = MediaType.OtherVideo;
				if (!get("options.usePodcastParticipantAsArtist") && (data.responseContext.serviceTrackingParams?.at(0)?.params?.find((it) => it.key === "ipcc")?.value ?? "1") != "0") songInfo.artist = cleanupName(data.microformat.microformatDataRenderer.pageOwnerDetails.name);
				break;
		}
		const thumbnails = videoDetails.thumbnail?.thumbnails;
		songInfo.imageSrc = thumbnails?.at(-1)?.url?.split("?")?.at(0);
		if (songInfo.imageSrc && !(await net.fetch(songInfo.imageSrc, { method: "HEAD" })).ok) songInfo.imageSrc = thumbnails.at(-1)?.url;
		if (songInfo.imageSrc) songInfo.image = await getImage(songInfo.imageSrc);
		win.webContents.send("peard:update-song-info", songInfo);
	}
	return songInfo;
};
let SongInfoEvent = /* @__PURE__ */ function(SongInfoEvent$1) {
	SongInfoEvent$1["VideoSrcChanged"] = "peard:video-src-changed";
	SongInfoEvent$1["PlayOrPaused"] = "peard:play-or-paused";
	SongInfoEvent$1["TimeChanged"] = "peard:time-changed";
	return SongInfoEvent$1;
}({});
var callbacks = /* @__PURE__ */ new Set();
const registerCallback = (callback) => {
	callbacks.add(callback);
};
var registerProvider = (win) => {
	const dataMutex = new Mutex();
	let songInfo = null;
	ipcMain.on("peard:video-src-changed", async (_, data) => {
		const tempSongInfo = await dataMutex.runExclusive(async () => {
			songInfo = await handleData(data, win);
			return songInfo;
		});
		if (tempSongInfo) for (const c of callbacks) c(tempSongInfo, SongInfoEvent.VideoSrcChanged);
	});
	ipcMain.on("peard:play-or-paused", async (_, { isPaused, elapsedSeconds }) => {
		const tempSongInfo = await dataMutex.runExclusive(() => {
			if (!songInfo) return null;
			songInfo.isPaused = isPaused;
			songInfo.elapsedSeconds = elapsedSeconds;
			return songInfo;
		});
		if (tempSongInfo) for (const c of callbacks) c(tempSongInfo, SongInfoEvent.PlayOrPaused);
	});
	ipcMain.on("peard:time-changed", async (_, seconds) => {
		const tempSongInfo = await dataMutex.runExclusive(() => {
			if (!songInfo) return null;
			songInfo.elapsedSeconds = seconds;
			return songInfo;
		});
		if (tempSongInfo) for (const c of callbacks) c(tempSongInfo, SongInfoEvent.TimeChanged);
	});
};
var suffixesToRemove = [
	/\s*(- topic)$/i,
	/\s*vevo$/i,
	/\s*[(|[]official(.*?)[)|\]]/i,
	/\s*[(|[]((lyrics?|visualizer|audio)\s*(video)?)[)|\]]/i,
	/\s*[(|[](performance video)[)|\]]/i,
	/\s*[(|[](clip official)[)|\]]/i,
	/\s*[(|[](video version)[)|\]]/i,
	/\s*[(|[](HD|HQ)\s*?(?:audio)?[)|\]]$/i,
	/\s*[(|[](live)[)|\]]$/i,
	/\s*[(|[]4K\s*?(?:upgrade)?[)|\]]$/i
];
function cleanupName(name) {
	if (!name) return name;
	for (const suffix of suffixesToRemove) name = name.replace(suffix, "");
	return name;
}
const setupSongInfo = registerProvider;
export { registerCallback as a, getImage as i, SongInfoEvent as n, setupSongInfo as o, cleanupName as r, Mutex as s, MediaType as t };
