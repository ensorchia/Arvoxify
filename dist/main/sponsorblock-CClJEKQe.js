import { s as __toESM } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import { c as t, r as createPlugin } from "./utils-Dk3QnH3H.js";
var import_is = /* @__PURE__ */ __toESM(require_is());
const sortSegments = (segments) => {
	segments.sort((segment1, segment2) => segment1[0] === segment2[0] ? segment1[1] - segment2[1] : segment1[0] - segment2[0]);
	const compiledSegments = [];
	let currentSegment;
	for (const segment of segments) {
		if (!currentSegment) {
			currentSegment = segment;
			continue;
		}
		if (currentSegment[1] < segment[0]) {
			compiledSegments.push(currentSegment);
			currentSegment = segment;
			continue;
		}
		currentSegment[1] = Math.max(currentSegment[1], segment[1]);
	}
	if (currentSegment) compiledSegments.push(currentSegment);
	return compiledSegments;
};
var sponsorblock_default = createPlugin({
	name: () => t("plugins.sponsorblock.name"),
	description: () => t("plugins.sponsorblock.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		apiURL: "https://sponsor.ajay.app",
		categories: [
			"sponsor",
			"intro",
			"outro",
			"interaction",
			"selfpromo",
			"music_offtopic"
		]
	},
	async backend({ getConfig, ipc }) {
		const fetchSegments = async (apiURL$1, categories$1, videoId) => {
			const sponsorBlockURL = `${apiURL$1}/api/skipSegments?videoID=${videoId}&categories=${JSON.stringify(categories$1)}`;
			try {
				const resp = await fetch(sponsorBlockURL, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
					redirect: "follow"
				});
				if (resp.status !== 200) return [];
				const segments = await resp.json();
				return sortSegments(segments.map((submission) => submission.segment));
			} catch (error) {
				if (import_is.default.dev()) console.log("error on sponsorblock request:", error);
				return [];
			}
		};
		const { apiURL, categories } = await getConfig();
		ipc.on("peard:video-src-changed", async (data) => {
			const segments = await fetchSegments(apiURL, categories, data?.videoDetails?.videoId);
			ipc.send("sponsorblock-skip", segments);
		});
	}
});
const pluginStub = {
	name: () => t("plugins.sponsorblock.name"),
	description: () => t("plugins.sponsorblock.description"),
	restartNeeded: true,
	config: {
		enabled: false,
		apiURL: "https://sponsor.ajay.app",
		categories: [
			"sponsor",
			"intro",
			"outro",
			"interaction",
			"selfpromo",
			"music_offtopic"
		]
	}
};
export { sponsorblock_default as default, pluginStub };
