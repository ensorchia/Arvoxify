import { join } from "path";
var play_default = join(import.meta.dirname, "../../assets/media-icons-black/play.png").replace("app.asar", "app.asar.unpacked");
var pause_default = join(import.meta.dirname, "../../assets/media-icons-black/pause.png").replace("app.asar", "app.asar.unpacked");
var next_default = join(import.meta.dirname, "../../assets/media-icons-black/next.png").replace("app.asar", "app.asar.unpacked");
var previous_default = join(import.meta.dirname, "../../assets/media-icons-black/previous.png").replace("app.asar", "app.asar.unpacked");
export { play_default as i, next_default as n, pause_default as r, previous_default as t };
