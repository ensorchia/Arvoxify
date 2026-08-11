import { join } from "path";
var tray_default = join(import.meta.dirname, "../../assets/tray.png").replace("app.asar", "app.asar.unpacked");
export { tray_default as t };
