import electron from "electron";
if (typeof electron === "string") throw new TypeError("Not running in an Electron environment!");
var { env } = process;
var isEnvSet = "ELECTRON_IS_DEV" in env;
var getFromEnv = Number.parseInt(env.ELECTRON_IS_DEV, 10) === 1;
var electron_is_dev_default = isEnvSet ? getFromEnv : !electron.app.isPackaged;
export { electron_is_dev_default as t };
