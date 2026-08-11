import { a as __toCommonJS$4, i as __require, n as __esmMin, r as __export$4, s as __toESM, t as __commonJSMin } from "./chunk-0rTXi_Jc.js";
import { t as require_is } from "./is-DL8kkJAd.js";
import { d as setMenuOptions } from "./config-n3n9Pwqt.js";
import { c as t, n as createBackend, r as createPlugin, t as LoggerPrefix } from "./utils-Dk3QnH3H.js";
import "./tray-DJ3mcCkw.js";
import { t as prompt_options_default } from "./prompt-options-DfUH3B_K.js";
import { a as registerCallback, n as SongInfoEvent } from "./song-info-BTWNuwrN.js";
import { a as require_receiver$1, i as require_sender$1, n as require_stream, r as require_websocket$1, t as require_websocket_server } from "./websocket-server-1m364-Tj.js";
import { app } from "electron";
import prompt from "custom-electron-prompt";
import __cjs_mod__ from "node:module";
import.meta.filename;
import.meta.dirname;
__cjs_mod__.createRequire(import.meta.url);
var require_v10$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GatewayVersion = "10";
	var GatewayOpcodes$2;
	(function(GatewayOpcodes$3) {
		GatewayOpcodes$3[GatewayOpcodes$3["Dispatch"] = 0] = "Dispatch";
		GatewayOpcodes$3[GatewayOpcodes$3["Heartbeat"] = 1] = "Heartbeat";
		GatewayOpcodes$3[GatewayOpcodes$3["Identify"] = 2] = "Identify";
		GatewayOpcodes$3[GatewayOpcodes$3["PresenceUpdate"] = 3] = "PresenceUpdate";
		GatewayOpcodes$3[GatewayOpcodes$3["VoiceStateUpdate"] = 4] = "VoiceStateUpdate";
		GatewayOpcodes$3[GatewayOpcodes$3["Resume"] = 6] = "Resume";
		GatewayOpcodes$3[GatewayOpcodes$3["Reconnect"] = 7] = "Reconnect";
		GatewayOpcodes$3[GatewayOpcodes$3["RequestGuildMembers"] = 8] = "RequestGuildMembers";
		GatewayOpcodes$3[GatewayOpcodes$3["InvalidSession"] = 9] = "InvalidSession";
		GatewayOpcodes$3[GatewayOpcodes$3["Hello"] = 10] = "Hello";
		GatewayOpcodes$3[GatewayOpcodes$3["HeartbeatAck"] = 11] = "HeartbeatAck";
		GatewayOpcodes$3[GatewayOpcodes$3["RequestSoundboardSounds"] = 31] = "RequestSoundboardSounds";
	})(GatewayOpcodes$2 || (exports.GatewayOpcodes = GatewayOpcodes$2 = {}));
	var GatewayCloseCodes$2;
	(function(GatewayCloseCodes$3) {
		GatewayCloseCodes$3[GatewayCloseCodes$3["UnknownError"] = 4e3] = "UnknownError";
		GatewayCloseCodes$3[GatewayCloseCodes$3["UnknownOpcode"] = 4001] = "UnknownOpcode";
		GatewayCloseCodes$3[GatewayCloseCodes$3["DecodeError"] = 4002] = "DecodeError";
		GatewayCloseCodes$3[GatewayCloseCodes$3["NotAuthenticated"] = 4003] = "NotAuthenticated";
		GatewayCloseCodes$3[GatewayCloseCodes$3["AuthenticationFailed"] = 4004] = "AuthenticationFailed";
		GatewayCloseCodes$3[GatewayCloseCodes$3["AlreadyAuthenticated"] = 4005] = "AlreadyAuthenticated";
		GatewayCloseCodes$3[GatewayCloseCodes$3["InvalidSeq"] = 4007] = "InvalidSeq";
		GatewayCloseCodes$3[GatewayCloseCodes$3["RateLimited"] = 4008] = "RateLimited";
		GatewayCloseCodes$3[GatewayCloseCodes$3["SessionTimedOut"] = 4009] = "SessionTimedOut";
		GatewayCloseCodes$3[GatewayCloseCodes$3["InvalidShard"] = 4010] = "InvalidShard";
		GatewayCloseCodes$3[GatewayCloseCodes$3["ShardingRequired"] = 4011] = "ShardingRequired";
		GatewayCloseCodes$3[GatewayCloseCodes$3["InvalidAPIVersion"] = 4012] = "InvalidAPIVersion";
		GatewayCloseCodes$3[GatewayCloseCodes$3["InvalidIntents"] = 4013] = "InvalidIntents";
		GatewayCloseCodes$3[GatewayCloseCodes$3["DisallowedIntents"] = 4014] = "DisallowedIntents";
	})(GatewayCloseCodes$2 || (exports.GatewayCloseCodes = GatewayCloseCodes$2 = {}));
	var GatewayIntentBits$2;
	(function(GatewayIntentBits$3) {
		GatewayIntentBits$3[GatewayIntentBits$3["Guilds"] = 1] = "Guilds";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildMembers"] = 2] = "GuildMembers";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildModeration"] = 4] = "GuildModeration";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildBans"] = 4] = "GuildBans";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildExpressions"] = 8] = "GuildExpressions";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildIntegrations"] = 16] = "GuildIntegrations";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildWebhooks"] = 32] = "GuildWebhooks";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildInvites"] = 64] = "GuildInvites";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildVoiceStates"] = 128] = "GuildVoiceStates";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildPresences"] = 256] = "GuildPresences";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildMessages"] = 512] = "GuildMessages";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
		GatewayIntentBits$3[GatewayIntentBits$3["DirectMessages"] = 4096] = "DirectMessages";
		GatewayIntentBits$3[GatewayIntentBits$3["DirectMessageReactions"] = 8192] = "DirectMessageReactions";
		GatewayIntentBits$3[GatewayIntentBits$3["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
		GatewayIntentBits$3[GatewayIntentBits$3["MessageContent"] = 32768] = "MessageContent";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
		GatewayIntentBits$3[GatewayIntentBits$3["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
		GatewayIntentBits$3[GatewayIntentBits$3["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
		GatewayIntentBits$3[GatewayIntentBits$3["GuildMessagePolls"] = 16777216] = "GuildMessagePolls";
		GatewayIntentBits$3[GatewayIntentBits$3["DirectMessagePolls"] = 33554432] = "DirectMessagePolls";
	})(GatewayIntentBits$2 || (exports.GatewayIntentBits = GatewayIntentBits$2 = {}));
	var GatewayDispatchEvents$2;
	(function(GatewayDispatchEvents$3) {
		GatewayDispatchEvents$3["ApplicationCommandPermissionsUpdate"] = "APPLICATION_COMMAND_PERMISSIONS_UPDATE";
		GatewayDispatchEvents$3["AutoModerationActionExecution"] = "AUTO_MODERATION_ACTION_EXECUTION";
		GatewayDispatchEvents$3["AutoModerationRuleCreate"] = "AUTO_MODERATION_RULE_CREATE";
		GatewayDispatchEvents$3["AutoModerationRuleDelete"] = "AUTO_MODERATION_RULE_DELETE";
		GatewayDispatchEvents$3["AutoModerationRuleUpdate"] = "AUTO_MODERATION_RULE_UPDATE";
		GatewayDispatchEvents$3["ChannelCreate"] = "CHANNEL_CREATE";
		GatewayDispatchEvents$3["ChannelDelete"] = "CHANNEL_DELETE";
		GatewayDispatchEvents$3["ChannelPinsUpdate"] = "CHANNEL_PINS_UPDATE";
		GatewayDispatchEvents$3["ChannelUpdate"] = "CHANNEL_UPDATE";
		GatewayDispatchEvents$3["EntitlementCreate"] = "ENTITLEMENT_CREATE";
		GatewayDispatchEvents$3["EntitlementDelete"] = "ENTITLEMENT_DELETE";
		GatewayDispatchEvents$3["EntitlementUpdate"] = "ENTITLEMENT_UPDATE";
		GatewayDispatchEvents$3["GuildAuditLogEntryCreate"] = "GUILD_AUDIT_LOG_ENTRY_CREATE";
		GatewayDispatchEvents$3["GuildBanAdd"] = "GUILD_BAN_ADD";
		GatewayDispatchEvents$3["GuildBanRemove"] = "GUILD_BAN_REMOVE";
		GatewayDispatchEvents$3["GuildCreate"] = "GUILD_CREATE";
		GatewayDispatchEvents$3["GuildDelete"] = "GUILD_DELETE";
		GatewayDispatchEvents$3["GuildEmojisUpdate"] = "GUILD_EMOJIS_UPDATE";
		GatewayDispatchEvents$3["GuildIntegrationsUpdate"] = "GUILD_INTEGRATIONS_UPDATE";
		GatewayDispatchEvents$3["GuildMemberAdd"] = "GUILD_MEMBER_ADD";
		GatewayDispatchEvents$3["GuildMemberRemove"] = "GUILD_MEMBER_REMOVE";
		GatewayDispatchEvents$3["GuildMembersChunk"] = "GUILD_MEMBERS_CHUNK";
		GatewayDispatchEvents$3["GuildMemberUpdate"] = "GUILD_MEMBER_UPDATE";
		GatewayDispatchEvents$3["GuildRoleCreate"] = "GUILD_ROLE_CREATE";
		GatewayDispatchEvents$3["GuildRoleDelete"] = "GUILD_ROLE_DELETE";
		GatewayDispatchEvents$3["GuildRoleUpdate"] = "GUILD_ROLE_UPDATE";
		GatewayDispatchEvents$3["GuildScheduledEventCreate"] = "GUILD_SCHEDULED_EVENT_CREATE";
		GatewayDispatchEvents$3["GuildScheduledEventDelete"] = "GUILD_SCHEDULED_EVENT_DELETE";
		GatewayDispatchEvents$3["GuildScheduledEventUpdate"] = "GUILD_SCHEDULED_EVENT_UPDATE";
		GatewayDispatchEvents$3["GuildScheduledEventUserAdd"] = "GUILD_SCHEDULED_EVENT_USER_ADD";
		GatewayDispatchEvents$3["GuildScheduledEventUserRemove"] = "GUILD_SCHEDULED_EVENT_USER_REMOVE";
		GatewayDispatchEvents$3["GuildSoundboardSoundCreate"] = "GUILD_SOUNDBOARD_SOUND_CREATE";
		GatewayDispatchEvents$3["GuildSoundboardSoundDelete"] = "GUILD_SOUNDBOARD_SOUND_DELETE";
		GatewayDispatchEvents$3["GuildSoundboardSoundsUpdate"] = "GUILD_SOUNDBOARD_SOUNDS_UPDATE";
		GatewayDispatchEvents$3["GuildSoundboardSoundUpdate"] = "GUILD_SOUNDBOARD_SOUND_UPDATE";
		GatewayDispatchEvents$3["SoundboardSounds"] = "SOUNDBOARD_SOUNDS";
		GatewayDispatchEvents$3["GuildStickersUpdate"] = "GUILD_STICKERS_UPDATE";
		GatewayDispatchEvents$3["GuildUpdate"] = "GUILD_UPDATE";
		GatewayDispatchEvents$3["IntegrationCreate"] = "INTEGRATION_CREATE";
		GatewayDispatchEvents$3["IntegrationDelete"] = "INTEGRATION_DELETE";
		GatewayDispatchEvents$3["IntegrationUpdate"] = "INTEGRATION_UPDATE";
		GatewayDispatchEvents$3["InteractionCreate"] = "INTERACTION_CREATE";
		GatewayDispatchEvents$3["InviteCreate"] = "INVITE_CREATE";
		GatewayDispatchEvents$3["InviteDelete"] = "INVITE_DELETE";
		GatewayDispatchEvents$3["MessageCreate"] = "MESSAGE_CREATE";
		GatewayDispatchEvents$3["MessageDelete"] = "MESSAGE_DELETE";
		GatewayDispatchEvents$3["MessageDeleteBulk"] = "MESSAGE_DELETE_BULK";
		GatewayDispatchEvents$3["MessagePollVoteAdd"] = "MESSAGE_POLL_VOTE_ADD";
		GatewayDispatchEvents$3["MessagePollVoteRemove"] = "MESSAGE_POLL_VOTE_REMOVE";
		GatewayDispatchEvents$3["MessageReactionAdd"] = "MESSAGE_REACTION_ADD";
		GatewayDispatchEvents$3["MessageReactionRemove"] = "MESSAGE_REACTION_REMOVE";
		GatewayDispatchEvents$3["MessageReactionRemoveAll"] = "MESSAGE_REACTION_REMOVE_ALL";
		GatewayDispatchEvents$3["MessageReactionRemoveEmoji"] = "MESSAGE_REACTION_REMOVE_EMOJI";
		GatewayDispatchEvents$3["MessageUpdate"] = "MESSAGE_UPDATE";
		GatewayDispatchEvents$3["PresenceUpdate"] = "PRESENCE_UPDATE";
		GatewayDispatchEvents$3["Ready"] = "READY";
		GatewayDispatchEvents$3["Resumed"] = "RESUMED";
		GatewayDispatchEvents$3["StageInstanceCreate"] = "STAGE_INSTANCE_CREATE";
		GatewayDispatchEvents$3["StageInstanceDelete"] = "STAGE_INSTANCE_DELETE";
		GatewayDispatchEvents$3["StageInstanceUpdate"] = "STAGE_INSTANCE_UPDATE";
		GatewayDispatchEvents$3["SubscriptionCreate"] = "SUBSCRIPTION_CREATE";
		GatewayDispatchEvents$3["SubscriptionDelete"] = "SUBSCRIPTION_DELETE";
		GatewayDispatchEvents$3["SubscriptionUpdate"] = "SUBSCRIPTION_UPDATE";
		GatewayDispatchEvents$3["ThreadCreate"] = "THREAD_CREATE";
		GatewayDispatchEvents$3["ThreadDelete"] = "THREAD_DELETE";
		GatewayDispatchEvents$3["ThreadListSync"] = "THREAD_LIST_SYNC";
		GatewayDispatchEvents$3["ThreadMembersUpdate"] = "THREAD_MEMBERS_UPDATE";
		GatewayDispatchEvents$3["ThreadMemberUpdate"] = "THREAD_MEMBER_UPDATE";
		GatewayDispatchEvents$3["ThreadUpdate"] = "THREAD_UPDATE";
		GatewayDispatchEvents$3["TypingStart"] = "TYPING_START";
		GatewayDispatchEvents$3["UserUpdate"] = "USER_UPDATE";
		GatewayDispatchEvents$3["VoiceChannelEffectSend"] = "VOICE_CHANNEL_EFFECT_SEND";
		GatewayDispatchEvents$3["VoiceServerUpdate"] = "VOICE_SERVER_UPDATE";
		GatewayDispatchEvents$3["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
		GatewayDispatchEvents$3["WebhooksUpdate"] = "WEBHOOKS_UPDATE";
	})(GatewayDispatchEvents$2 || (exports.GatewayDispatchEvents = GatewayDispatchEvents$2 = {}));
	var VoiceChannelEffectSendAnimationType$2;
	(function(VoiceChannelEffectSendAnimationType$3) {
		VoiceChannelEffectSendAnimationType$3[VoiceChannelEffectSendAnimationType$3["Premium"] = 0] = "Premium";
		VoiceChannelEffectSendAnimationType$3[VoiceChannelEffectSendAnimationType$3["Basic"] = 1] = "Basic";
	})(VoiceChannelEffectSendAnimationType$2 || (exports.VoiceChannelEffectSendAnimationType = VoiceChannelEffectSendAnimationType$2 = {}));
}));
var v10_exports$4 = {};
__export$4(v10_exports$4, {
	GatewayCloseCodes: () => GatewayCloseCodes$1,
	GatewayDispatchEvents: () => GatewayDispatchEvents$1,
	GatewayIntentBits: () => GatewayIntentBits$1,
	GatewayOpcodes: () => GatewayOpcodes$1,
	GatewayVersion: () => GatewayVersion$1,
	VoiceChannelEffectSendAnimationType: () => VoiceChannelEffectSendAnimationType$1,
	default: () => v10_default$4
});
var import_v10$6, v10_default$4, GatewayCloseCodes$1, GatewayDispatchEvents$1, GatewayIntentBits$1, GatewayOpcodes$1, GatewayVersion$1, VoiceChannelEffectSendAnimationType$1;
var init_v10$4 = __esmMin((() => {
	import_v10$6 = /* @__PURE__ */ __toESM(require_v10$5(), 1);
	v10_default$4 = import_v10$6.default;
	GatewayCloseCodes$1 = import_v10$6.GatewayCloseCodes;
	GatewayDispatchEvents$1 = import_v10$6.GatewayDispatchEvents;
	GatewayIntentBits$1 = import_v10$6.GatewayIntentBits;
	GatewayOpcodes$1 = import_v10$6.GatewayOpcodes;
	GatewayVersion$1 = "10";
	VoiceChannelEffectSendAnimationType$1 = import_v10$6.VoiceChannelEffectSendAnimationType;
}));
var require_globals = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.FormattingPatterns = {
		User: /<@(?<id>\d{17,20})>/,
		UserWithNickname: /<@!(?<id>\d{17,20})>/,
		UserWithOptionalNickname: /<@!?(?<id>\d{17,20})>/,
		Channel: /<#(?<id>\d{17,20})>/,
		Role: /<@&(?<id>\d{17,20})>/,
		SlashCommand: /<\/(?<fullName>(?<name>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32})(?: (?<subcommandOrGroup>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?(?: (?<subcommand>[-_\p{Letter}\p{Number}\p{sc=Deva}\p{sc=Thai}]{1,32}))?):(?<id>\d{17,20})>/u,
		Emoji: /<(?<animated>a)?:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
		AnimatedEmoji: /<(?<animated>a):(?<name>\w{2,32}):(?<id>\d{17,20})>/,
		StaticEmoji: /<:(?<name>\w{2,32}):(?<id>\d{17,20})>/,
		Timestamp: /<t:(?<timestamp>-?\d{1,13})(:(?<style>[DFRTdft]))?>/,
		DefaultStyledTimestamp: /<t:(?<timestamp>-?\d{1,13})>/,
		StyledTimestamp: /<t:(?<timestamp>-?\d{1,13}):(?<style>[DFRTdft])>/,
		GuildNavigation: /<id:(?<type>customize|browse|guide|linked-roles)>/,
		LinkedRole: /<id:linked-roles:(?<id>\d{17,20})>/
	};
	Object.freeze(exports.FormattingPatterns);
}));
var globals_exports = {};
__export$4(globals_exports, {
	FormattingPatterns: () => FormattingPatterns$1,
	default: () => globals_default
});
var import_globals, globals_default, FormattingPatterns$1;
var init_globals = __esmMin((() => {
	import_globals = /* @__PURE__ */ __toESM(require_globals(), 1);
	globals_default = import_globals.default;
	FormattingPatterns$1 = import_globals.FormattingPatterns;
}));
var require_common$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.PermissionFlagsBits = {
		CreateInstantInvite: 1n << 0n,
		KickMembers: 1n << 1n,
		BanMembers: 1n << 2n,
		Administrator: 1n << 3n,
		ManageChannels: 1n << 4n,
		ManageGuild: 1n << 5n,
		AddReactions: 1n << 6n,
		ViewAuditLog: 1n << 7n,
		PrioritySpeaker: 1n << 8n,
		Stream: 1n << 9n,
		ViewChannel: 1n << 10n,
		SendMessages: 1n << 11n,
		SendTTSMessages: 1n << 12n,
		ManageMessages: 1n << 13n,
		EmbedLinks: 1n << 14n,
		AttachFiles: 1n << 15n,
		ReadMessageHistory: 1n << 16n,
		MentionEveryone: 1n << 17n,
		UseExternalEmojis: 1n << 18n,
		ViewGuildInsights: 1n << 19n,
		Connect: 1n << 20n,
		Speak: 1n << 21n,
		MuteMembers: 1n << 22n,
		DeafenMembers: 1n << 23n,
		MoveMembers: 1n << 24n,
		UseVAD: 1n << 25n,
		ChangeNickname: 1n << 26n,
		ManageNicknames: 1n << 27n,
		ManageRoles: 1n << 28n,
		ManageWebhooks: 1n << 29n,
		ManageEmojisAndStickers: 1n << 30n,
		ManageGuildExpressions: 1n << 30n,
		UseApplicationCommands: 1n << 31n,
		RequestToSpeak: 1n << 32n,
		ManageEvents: 1n << 33n,
		ManageThreads: 1n << 34n,
		CreatePublicThreads: 1n << 35n,
		CreatePrivateThreads: 1n << 36n,
		UseExternalStickers: 1n << 37n,
		SendMessagesInThreads: 1n << 38n,
		UseEmbeddedActivities: 1n << 39n,
		ModerateMembers: 1n << 40n,
		ViewCreatorMonetizationAnalytics: 1n << 41n,
		UseSoundboard: 1n << 42n,
		CreateGuildExpressions: 1n << 43n,
		CreateEvents: 1n << 44n,
		UseExternalSounds: 1n << 45n,
		SendVoiceMessages: 1n << 46n,
		SendPolls: 1n << 49n,
		UseExternalApps: 1n << 50n,
		PinMessages: 1n << 51n
	};
	Object.freeze(exports.PermissionFlagsBits);
}));
var require_application = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ApplicationFlags$2;
	(function(ApplicationFlags$3) {
		ApplicationFlags$3[ApplicationFlags$3["EmbeddedReleased"] = 2] = "EmbeddedReleased";
		ApplicationFlags$3[ApplicationFlags$3["ManagedEmoji"] = 4] = "ManagedEmoji";
		ApplicationFlags$3[ApplicationFlags$3["EmbeddedIAP"] = 8] = "EmbeddedIAP";
		ApplicationFlags$3[ApplicationFlags$3["GroupDMCreate"] = 16] = "GroupDMCreate";
		ApplicationFlags$3[ApplicationFlags$3["ApplicationAutoModerationRuleCreateBadge"] = 64] = "ApplicationAutoModerationRuleCreateBadge";
		ApplicationFlags$3[ApplicationFlags$3["RPCHasConnected"] = 2048] = "RPCHasConnected";
		ApplicationFlags$3[ApplicationFlags$3["GatewayPresence"] = 4096] = "GatewayPresence";
		ApplicationFlags$3[ApplicationFlags$3["GatewayPresenceLimited"] = 8192] = "GatewayPresenceLimited";
		ApplicationFlags$3[ApplicationFlags$3["GatewayGuildMembers"] = 16384] = "GatewayGuildMembers";
		ApplicationFlags$3[ApplicationFlags$3["GatewayGuildMembersLimited"] = 32768] = "GatewayGuildMembersLimited";
		ApplicationFlags$3[ApplicationFlags$3["VerificationPendingGuildLimit"] = 65536] = "VerificationPendingGuildLimit";
		ApplicationFlags$3[ApplicationFlags$3["Embedded"] = 131072] = "Embedded";
		ApplicationFlags$3[ApplicationFlags$3["GatewayMessageContent"] = 262144] = "GatewayMessageContent";
		ApplicationFlags$3[ApplicationFlags$3["GatewayMessageContentLimited"] = 524288] = "GatewayMessageContentLimited";
		ApplicationFlags$3[ApplicationFlags$3["EmbeddedFirstParty"] = 1048576] = "EmbeddedFirstParty";
		ApplicationFlags$3[ApplicationFlags$3["ApplicationCommandBadge"] = 8388608] = "ApplicationCommandBadge";
	})(ApplicationFlags$2 || (exports.ApplicationFlags = ApplicationFlags$2 = {}));
	var ApplicationRoleConnectionMetadataType$2;
	(function(ApplicationRoleConnectionMetadataType$3) {
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["IntegerLessThanOrEqual"] = 1] = "IntegerLessThanOrEqual";
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["IntegerGreaterThanOrEqual"] = 2] = "IntegerGreaterThanOrEqual";
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["IntegerEqual"] = 3] = "IntegerEqual";
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["IntegerNotEqual"] = 4] = "IntegerNotEqual";
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["DatetimeLessThanOrEqual"] = 5] = "DatetimeLessThanOrEqual";
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["DatetimeGreaterThanOrEqual"] = 6] = "DatetimeGreaterThanOrEqual";
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["BooleanEqual"] = 7] = "BooleanEqual";
		ApplicationRoleConnectionMetadataType$3[ApplicationRoleConnectionMetadataType$3["BooleanNotEqual"] = 8] = "BooleanNotEqual";
	})(ApplicationRoleConnectionMetadataType$2 || (exports.ApplicationRoleConnectionMetadataType = ApplicationRoleConnectionMetadataType$2 = {}));
	var ApplicationWebhookEventStatus$2;
	(function(ApplicationWebhookEventStatus$3) {
		ApplicationWebhookEventStatus$3[ApplicationWebhookEventStatus$3["Disabled"] = 1] = "Disabled";
		ApplicationWebhookEventStatus$3[ApplicationWebhookEventStatus$3["Enabled"] = 2] = "Enabled";
		ApplicationWebhookEventStatus$3[ApplicationWebhookEventStatus$3["DisabledByDiscord"] = 3] = "DisabledByDiscord";
	})(ApplicationWebhookEventStatus$2 || (exports.ApplicationWebhookEventStatus = ApplicationWebhookEventStatus$2 = {}));
}));
var require_auditLog = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var AuditLogEvent$2;
	(function(AuditLogEvent$3) {
		AuditLogEvent$3[AuditLogEvent$3["GuildUpdate"] = 1] = "GuildUpdate";
		AuditLogEvent$3[AuditLogEvent$3["ChannelCreate"] = 10] = "ChannelCreate";
		AuditLogEvent$3[AuditLogEvent$3["ChannelUpdate"] = 11] = "ChannelUpdate";
		AuditLogEvent$3[AuditLogEvent$3["ChannelDelete"] = 12] = "ChannelDelete";
		AuditLogEvent$3[AuditLogEvent$3["ChannelOverwriteCreate"] = 13] = "ChannelOverwriteCreate";
		AuditLogEvent$3[AuditLogEvent$3["ChannelOverwriteUpdate"] = 14] = "ChannelOverwriteUpdate";
		AuditLogEvent$3[AuditLogEvent$3["ChannelOverwriteDelete"] = 15] = "ChannelOverwriteDelete";
		AuditLogEvent$3[AuditLogEvent$3["MemberKick"] = 20] = "MemberKick";
		AuditLogEvent$3[AuditLogEvent$3["MemberPrune"] = 21] = "MemberPrune";
		AuditLogEvent$3[AuditLogEvent$3["MemberBanAdd"] = 22] = "MemberBanAdd";
		AuditLogEvent$3[AuditLogEvent$3["MemberBanRemove"] = 23] = "MemberBanRemove";
		AuditLogEvent$3[AuditLogEvent$3["MemberUpdate"] = 24] = "MemberUpdate";
		AuditLogEvent$3[AuditLogEvent$3["MemberRoleUpdate"] = 25] = "MemberRoleUpdate";
		AuditLogEvent$3[AuditLogEvent$3["MemberMove"] = 26] = "MemberMove";
		AuditLogEvent$3[AuditLogEvent$3["MemberDisconnect"] = 27] = "MemberDisconnect";
		AuditLogEvent$3[AuditLogEvent$3["BotAdd"] = 28] = "BotAdd";
		AuditLogEvent$3[AuditLogEvent$3["RoleCreate"] = 30] = "RoleCreate";
		AuditLogEvent$3[AuditLogEvent$3["RoleUpdate"] = 31] = "RoleUpdate";
		AuditLogEvent$3[AuditLogEvent$3["RoleDelete"] = 32] = "RoleDelete";
		AuditLogEvent$3[AuditLogEvent$3["InviteCreate"] = 40] = "InviteCreate";
		AuditLogEvent$3[AuditLogEvent$3["InviteUpdate"] = 41] = "InviteUpdate";
		AuditLogEvent$3[AuditLogEvent$3["InviteDelete"] = 42] = "InviteDelete";
		AuditLogEvent$3[AuditLogEvent$3["WebhookCreate"] = 50] = "WebhookCreate";
		AuditLogEvent$3[AuditLogEvent$3["WebhookUpdate"] = 51] = "WebhookUpdate";
		AuditLogEvent$3[AuditLogEvent$3["WebhookDelete"] = 52] = "WebhookDelete";
		AuditLogEvent$3[AuditLogEvent$3["EmojiCreate"] = 60] = "EmojiCreate";
		AuditLogEvent$3[AuditLogEvent$3["EmojiUpdate"] = 61] = "EmojiUpdate";
		AuditLogEvent$3[AuditLogEvent$3["EmojiDelete"] = 62] = "EmojiDelete";
		AuditLogEvent$3[AuditLogEvent$3["MessageDelete"] = 72] = "MessageDelete";
		AuditLogEvent$3[AuditLogEvent$3["MessageBulkDelete"] = 73] = "MessageBulkDelete";
		AuditLogEvent$3[AuditLogEvent$3["MessagePin"] = 74] = "MessagePin";
		AuditLogEvent$3[AuditLogEvent$3["MessageUnpin"] = 75] = "MessageUnpin";
		AuditLogEvent$3[AuditLogEvent$3["IntegrationCreate"] = 80] = "IntegrationCreate";
		AuditLogEvent$3[AuditLogEvent$3["IntegrationUpdate"] = 81] = "IntegrationUpdate";
		AuditLogEvent$3[AuditLogEvent$3["IntegrationDelete"] = 82] = "IntegrationDelete";
		AuditLogEvent$3[AuditLogEvent$3["StageInstanceCreate"] = 83] = "StageInstanceCreate";
		AuditLogEvent$3[AuditLogEvent$3["StageInstanceUpdate"] = 84] = "StageInstanceUpdate";
		AuditLogEvent$3[AuditLogEvent$3["StageInstanceDelete"] = 85] = "StageInstanceDelete";
		AuditLogEvent$3[AuditLogEvent$3["StickerCreate"] = 90] = "StickerCreate";
		AuditLogEvent$3[AuditLogEvent$3["StickerUpdate"] = 91] = "StickerUpdate";
		AuditLogEvent$3[AuditLogEvent$3["StickerDelete"] = 92] = "StickerDelete";
		AuditLogEvent$3[AuditLogEvent$3["GuildScheduledEventCreate"] = 100] = "GuildScheduledEventCreate";
		AuditLogEvent$3[AuditLogEvent$3["GuildScheduledEventUpdate"] = 101] = "GuildScheduledEventUpdate";
		AuditLogEvent$3[AuditLogEvent$3["GuildScheduledEventDelete"] = 102] = "GuildScheduledEventDelete";
		AuditLogEvent$3[AuditLogEvent$3["ThreadCreate"] = 110] = "ThreadCreate";
		AuditLogEvent$3[AuditLogEvent$3["ThreadUpdate"] = 111] = "ThreadUpdate";
		AuditLogEvent$3[AuditLogEvent$3["ThreadDelete"] = 112] = "ThreadDelete";
		AuditLogEvent$3[AuditLogEvent$3["ApplicationCommandPermissionUpdate"] = 121] = "ApplicationCommandPermissionUpdate";
		AuditLogEvent$3[AuditLogEvent$3["SoundboardSoundCreate"] = 130] = "SoundboardSoundCreate";
		AuditLogEvent$3[AuditLogEvent$3["SoundboardSoundUpdate"] = 131] = "SoundboardSoundUpdate";
		AuditLogEvent$3[AuditLogEvent$3["SoundboardSoundDelete"] = 132] = "SoundboardSoundDelete";
		AuditLogEvent$3[AuditLogEvent$3["AutoModerationRuleCreate"] = 140] = "AutoModerationRuleCreate";
		AuditLogEvent$3[AuditLogEvent$3["AutoModerationRuleUpdate"] = 141] = "AutoModerationRuleUpdate";
		AuditLogEvent$3[AuditLogEvent$3["AutoModerationRuleDelete"] = 142] = "AutoModerationRuleDelete";
		AuditLogEvent$3[AuditLogEvent$3["AutoModerationBlockMessage"] = 143] = "AutoModerationBlockMessage";
		AuditLogEvent$3[AuditLogEvent$3["AutoModerationFlagToChannel"] = 144] = "AutoModerationFlagToChannel";
		AuditLogEvent$3[AuditLogEvent$3["AutoModerationUserCommunicationDisabled"] = 145] = "AutoModerationUserCommunicationDisabled";
		AuditLogEvent$3[AuditLogEvent$3["AutoModerationQuarantineUser"] = 146] = "AutoModerationQuarantineUser";
		AuditLogEvent$3[AuditLogEvent$3["CreatorMonetizationRequestCreated"] = 150] = "CreatorMonetizationRequestCreated";
		AuditLogEvent$3[AuditLogEvent$3["CreatorMonetizationTermsAccepted"] = 151] = "CreatorMonetizationTermsAccepted";
		AuditLogEvent$3[AuditLogEvent$3["OnboardingPromptCreate"] = 163] = "OnboardingPromptCreate";
		AuditLogEvent$3[AuditLogEvent$3["OnboardingPromptUpdate"] = 164] = "OnboardingPromptUpdate";
		AuditLogEvent$3[AuditLogEvent$3["OnboardingPromptDelete"] = 165] = "OnboardingPromptDelete";
		AuditLogEvent$3[AuditLogEvent$3["OnboardingCreate"] = 166] = "OnboardingCreate";
		AuditLogEvent$3[AuditLogEvent$3["OnboardingUpdate"] = 167] = "OnboardingUpdate";
		AuditLogEvent$3[AuditLogEvent$3["HomeSettingsCreate"] = 190] = "HomeSettingsCreate";
		AuditLogEvent$3[AuditLogEvent$3["HomeSettingsUpdate"] = 191] = "HomeSettingsUpdate";
	})(AuditLogEvent$2 || (exports.AuditLogEvent = AuditLogEvent$2 = {}));
	var AuditLogOptionsType$2;
	(function(AuditLogOptionsType$3) {
		AuditLogOptionsType$3["Role"] = "0";
		AuditLogOptionsType$3["Member"] = "1";
	})(AuditLogOptionsType$2 || (exports.AuditLogOptionsType = AuditLogOptionsType$2 = {}));
}));
var require_autoModeration = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var AutoModerationRuleTriggerType$2;
	(function(AutoModerationRuleTriggerType$3) {
		AutoModerationRuleTriggerType$3[AutoModerationRuleTriggerType$3["Keyword"] = 1] = "Keyword";
		AutoModerationRuleTriggerType$3[AutoModerationRuleTriggerType$3["Spam"] = 3] = "Spam";
		AutoModerationRuleTriggerType$3[AutoModerationRuleTriggerType$3["KeywordPreset"] = 4] = "KeywordPreset";
		AutoModerationRuleTriggerType$3[AutoModerationRuleTriggerType$3["MentionSpam"] = 5] = "MentionSpam";
		AutoModerationRuleTriggerType$3[AutoModerationRuleTriggerType$3["MemberProfile"] = 6] = "MemberProfile";
	})(AutoModerationRuleTriggerType$2 || (exports.AutoModerationRuleTriggerType = AutoModerationRuleTriggerType$2 = {}));
	var AutoModerationRuleKeywordPresetType$2;
	(function(AutoModerationRuleKeywordPresetType$3) {
		AutoModerationRuleKeywordPresetType$3[AutoModerationRuleKeywordPresetType$3["Profanity"] = 1] = "Profanity";
		AutoModerationRuleKeywordPresetType$3[AutoModerationRuleKeywordPresetType$3["SexualContent"] = 2] = "SexualContent";
		AutoModerationRuleKeywordPresetType$3[AutoModerationRuleKeywordPresetType$3["Slurs"] = 3] = "Slurs";
	})(AutoModerationRuleKeywordPresetType$2 || (exports.AutoModerationRuleKeywordPresetType = AutoModerationRuleKeywordPresetType$2 = {}));
	var AutoModerationRuleEventType$2;
	(function(AutoModerationRuleEventType$3) {
		AutoModerationRuleEventType$3[AutoModerationRuleEventType$3["MessageSend"] = 1] = "MessageSend";
		AutoModerationRuleEventType$3[AutoModerationRuleEventType$3["MemberUpdate"] = 2] = "MemberUpdate";
	})(AutoModerationRuleEventType$2 || (exports.AutoModerationRuleEventType = AutoModerationRuleEventType$2 = {}));
	var AutoModerationActionType$2;
	(function(AutoModerationActionType$3) {
		AutoModerationActionType$3[AutoModerationActionType$3["BlockMessage"] = 1] = "BlockMessage";
		AutoModerationActionType$3[AutoModerationActionType$3["SendAlertMessage"] = 2] = "SendAlertMessage";
		AutoModerationActionType$3[AutoModerationActionType$3["Timeout"] = 3] = "Timeout";
		AutoModerationActionType$3[AutoModerationActionType$3["BlockMemberInteraction"] = 4] = "BlockMemberInteraction";
	})(AutoModerationActionType$2 || (exports.AutoModerationActionType = AutoModerationActionType$2 = {}));
}));
var require_channel$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var SortOrderType$2;
	(function(SortOrderType$3) {
		SortOrderType$3[SortOrderType$3["LatestActivity"] = 0] = "LatestActivity";
		SortOrderType$3[SortOrderType$3["CreationDate"] = 1] = "CreationDate";
	})(SortOrderType$2 || (exports.SortOrderType = SortOrderType$2 = {}));
	var ForumLayoutType$2;
	(function(ForumLayoutType$3) {
		ForumLayoutType$3[ForumLayoutType$3["NotSet"] = 0] = "NotSet";
		ForumLayoutType$3[ForumLayoutType$3["ListView"] = 1] = "ListView";
		ForumLayoutType$3[ForumLayoutType$3["GalleryView"] = 2] = "GalleryView";
	})(ForumLayoutType$2 || (exports.ForumLayoutType = ForumLayoutType$2 = {}));
	var ChannelType$2;
	(function(ChannelType$3) {
		ChannelType$3[ChannelType$3["GuildText"] = 0] = "GuildText";
		ChannelType$3[ChannelType$3["DM"] = 1] = "DM";
		ChannelType$3[ChannelType$3["GuildVoice"] = 2] = "GuildVoice";
		ChannelType$3[ChannelType$3["GroupDM"] = 3] = "GroupDM";
		ChannelType$3[ChannelType$3["GuildCategory"] = 4] = "GuildCategory";
		ChannelType$3[ChannelType$3["GuildAnnouncement"] = 5] = "GuildAnnouncement";
		ChannelType$3[ChannelType$3["AnnouncementThread"] = 10] = "AnnouncementThread";
		ChannelType$3[ChannelType$3["PublicThread"] = 11] = "PublicThread";
		ChannelType$3[ChannelType$3["PrivateThread"] = 12] = "PrivateThread";
		ChannelType$3[ChannelType$3["GuildStageVoice"] = 13] = "GuildStageVoice";
		ChannelType$3[ChannelType$3["GuildDirectory"] = 14] = "GuildDirectory";
		ChannelType$3[ChannelType$3["GuildForum"] = 15] = "GuildForum";
		ChannelType$3[ChannelType$3["GuildMedia"] = 16] = "GuildMedia";
		ChannelType$3[ChannelType$3["GuildNews"] = 5] = "GuildNews";
		ChannelType$3[ChannelType$3["GuildNewsThread"] = 10] = "GuildNewsThread";
		ChannelType$3[ChannelType$3["GuildPublicThread"] = 11] = "GuildPublicThread";
		ChannelType$3[ChannelType$3["GuildPrivateThread"] = 12] = "GuildPrivateThread";
	})(ChannelType$2 || (exports.ChannelType = ChannelType$2 = {}));
	var VideoQualityMode$2;
	(function(VideoQualityMode$3) {
		VideoQualityMode$3[VideoQualityMode$3["Auto"] = 1] = "Auto";
		VideoQualityMode$3[VideoQualityMode$3["Full"] = 2] = "Full";
	})(VideoQualityMode$2 || (exports.VideoQualityMode = VideoQualityMode$2 = {}));
	var OverwriteType$2;
	(function(OverwriteType$3) {
		OverwriteType$3[OverwriteType$3["Role"] = 0] = "Role";
		OverwriteType$3[OverwriteType$3["Member"] = 1] = "Member";
	})(OverwriteType$2 || (exports.OverwriteType = OverwriteType$2 = {}));
	var ThreadAutoArchiveDuration$2;
	(function(ThreadAutoArchiveDuration$3) {
		ThreadAutoArchiveDuration$3[ThreadAutoArchiveDuration$3["OneHour"] = 60] = "OneHour";
		ThreadAutoArchiveDuration$3[ThreadAutoArchiveDuration$3["OneDay"] = 1440] = "OneDay";
		ThreadAutoArchiveDuration$3[ThreadAutoArchiveDuration$3["ThreeDays"] = 4320] = "ThreeDays";
		ThreadAutoArchiveDuration$3[ThreadAutoArchiveDuration$3["OneWeek"] = 10080] = "OneWeek";
	})(ThreadAutoArchiveDuration$2 || (exports.ThreadAutoArchiveDuration = ThreadAutoArchiveDuration$2 = {}));
	var ThreadMemberFlags$2;
	(function(ThreadMemberFlags$3) {
		ThreadMemberFlags$3[ThreadMemberFlags$3["HasInteracted"] = 1] = "HasInteracted";
		ThreadMemberFlags$3[ThreadMemberFlags$3["AllMessages"] = 2] = "AllMessages";
		ThreadMemberFlags$3[ThreadMemberFlags$3["OnlyMentions"] = 4] = "OnlyMentions";
		ThreadMemberFlags$3[ThreadMemberFlags$3["NoMessages"] = 8] = "NoMessages";
	})(ThreadMemberFlags$2 || (exports.ThreadMemberFlags = ThreadMemberFlags$2 = {}));
	var ChannelFlags$2;
	(function(ChannelFlags$3) {
		ChannelFlags$3[ChannelFlags$3["GuildFeedRemoved"] = 1] = "GuildFeedRemoved";
		ChannelFlags$3[ChannelFlags$3["Pinned"] = 2] = "Pinned";
		ChannelFlags$3[ChannelFlags$3["ActiveChannelsRemoved"] = 4] = "ActiveChannelsRemoved";
		ChannelFlags$3[ChannelFlags$3["RequireTag"] = 16] = "RequireTag";
		ChannelFlags$3[ChannelFlags$3["IsSpam"] = 32] = "IsSpam";
		ChannelFlags$3[ChannelFlags$3["IsGuildResourceChannel"] = 128] = "IsGuildResourceChannel";
		ChannelFlags$3[ChannelFlags$3["ClydeAI"] = 256] = "ClydeAI";
		ChannelFlags$3[ChannelFlags$3["IsScheduledForDeletion"] = 512] = "IsScheduledForDeletion";
		ChannelFlags$3[ChannelFlags$3["HideMediaDownloadOptions"] = 32768] = "HideMediaDownloadOptions";
	})(ChannelFlags$2 || (exports.ChannelFlags = ChannelFlags$2 = {}));
}));
var require_gateway = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var PresenceUpdateStatus$2;
	(function(PresenceUpdateStatus$3) {
		PresenceUpdateStatus$3["Online"] = "online";
		PresenceUpdateStatus$3["DoNotDisturb"] = "dnd";
		PresenceUpdateStatus$3["Idle"] = "idle";
		PresenceUpdateStatus$3["Invisible"] = "invisible";
		PresenceUpdateStatus$3["Offline"] = "offline";
	})(PresenceUpdateStatus$2 || (exports.PresenceUpdateStatus = PresenceUpdateStatus$2 = {}));
	var ActivityPlatform$2;
	(function(ActivityPlatform$3) {
		ActivityPlatform$3["Desktop"] = "desktop";
		ActivityPlatform$3["Xbox"] = "xbox";
		ActivityPlatform$3["Samsung"] = "samsung";
		ActivityPlatform$3["IOS"] = "ios";
		ActivityPlatform$3["Android"] = "android";
		ActivityPlatform$3["Embedded"] = "embedded";
		ActivityPlatform$3["PS4"] = "ps4";
		ActivityPlatform$3["PS5"] = "ps5";
	})(ActivityPlatform$2 || (exports.ActivityPlatform = ActivityPlatform$2 = {}));
	var ActivityType$2;
	(function(ActivityType$3) {
		ActivityType$3[ActivityType$3["Playing"] = 0] = "Playing";
		ActivityType$3[ActivityType$3["Streaming"] = 1] = "Streaming";
		ActivityType$3[ActivityType$3["Listening"] = 2] = "Listening";
		ActivityType$3[ActivityType$3["Watching"] = 3] = "Watching";
		ActivityType$3[ActivityType$3["Custom"] = 4] = "Custom";
		ActivityType$3[ActivityType$3["Competing"] = 5] = "Competing";
	})(ActivityType$2 || (exports.ActivityType = ActivityType$2 = {}));
	var StatusDisplayType$3;
	(function(StatusDisplayType$4) {
		StatusDisplayType$4[StatusDisplayType$4["Name"] = 0] = "Name";
		StatusDisplayType$4[StatusDisplayType$4["State"] = 1] = "State";
		StatusDisplayType$4[StatusDisplayType$4["Details"] = 2] = "Details";
	})(StatusDisplayType$3 || (exports.StatusDisplayType = StatusDisplayType$3 = {}));
	var ActivityFlags$2;
	(function(ActivityFlags$3) {
		ActivityFlags$3[ActivityFlags$3["Instance"] = 1] = "Instance";
		ActivityFlags$3[ActivityFlags$3["Join"] = 2] = "Join";
		ActivityFlags$3[ActivityFlags$3["Spectate"] = 4] = "Spectate";
		ActivityFlags$3[ActivityFlags$3["JoinRequest"] = 8] = "JoinRequest";
		ActivityFlags$3[ActivityFlags$3["Sync"] = 16] = "Sync";
		ActivityFlags$3[ActivityFlags$3["Play"] = 32] = "Play";
		ActivityFlags$3[ActivityFlags$3["PartyPrivacyFriends"] = 64] = "PartyPrivacyFriends";
		ActivityFlags$3[ActivityFlags$3["PartyPrivacyVoiceChannel"] = 128] = "PartyPrivacyVoiceChannel";
		ActivityFlags$3[ActivityFlags$3["Embedded"] = 256] = "Embedded";
	})(ActivityFlags$2 || (exports.ActivityFlags = ActivityFlags$2 = {}));
}));
var require_guild = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var GuildDefaultMessageNotifications$2;
	(function(GuildDefaultMessageNotifications$3) {
		GuildDefaultMessageNotifications$3[GuildDefaultMessageNotifications$3["AllMessages"] = 0] = "AllMessages";
		GuildDefaultMessageNotifications$3[GuildDefaultMessageNotifications$3["OnlyMentions"] = 1] = "OnlyMentions";
	})(GuildDefaultMessageNotifications$2 || (exports.GuildDefaultMessageNotifications = GuildDefaultMessageNotifications$2 = {}));
	var GuildExplicitContentFilter$2;
	(function(GuildExplicitContentFilter$3) {
		GuildExplicitContentFilter$3[GuildExplicitContentFilter$3["Disabled"] = 0] = "Disabled";
		GuildExplicitContentFilter$3[GuildExplicitContentFilter$3["MembersWithoutRoles"] = 1] = "MembersWithoutRoles";
		GuildExplicitContentFilter$3[GuildExplicitContentFilter$3["AllMembers"] = 2] = "AllMembers";
	})(GuildExplicitContentFilter$2 || (exports.GuildExplicitContentFilter = GuildExplicitContentFilter$2 = {}));
	var GuildMFALevel$2;
	(function(GuildMFALevel$3) {
		GuildMFALevel$3[GuildMFALevel$3["None"] = 0] = "None";
		GuildMFALevel$3[GuildMFALevel$3["Elevated"] = 1] = "Elevated";
	})(GuildMFALevel$2 || (exports.GuildMFALevel = GuildMFALevel$2 = {}));
	var GuildNSFWLevel$2;
	(function(GuildNSFWLevel$3) {
		GuildNSFWLevel$3[GuildNSFWLevel$3["Default"] = 0] = "Default";
		GuildNSFWLevel$3[GuildNSFWLevel$3["Explicit"] = 1] = "Explicit";
		GuildNSFWLevel$3[GuildNSFWLevel$3["Safe"] = 2] = "Safe";
		GuildNSFWLevel$3[GuildNSFWLevel$3["AgeRestricted"] = 3] = "AgeRestricted";
	})(GuildNSFWLevel$2 || (exports.GuildNSFWLevel = GuildNSFWLevel$2 = {}));
	var GuildVerificationLevel$2;
	(function(GuildVerificationLevel$3) {
		GuildVerificationLevel$3[GuildVerificationLevel$3["None"] = 0] = "None";
		GuildVerificationLevel$3[GuildVerificationLevel$3["Low"] = 1] = "Low";
		GuildVerificationLevel$3[GuildVerificationLevel$3["Medium"] = 2] = "Medium";
		GuildVerificationLevel$3[GuildVerificationLevel$3["High"] = 3] = "High";
		GuildVerificationLevel$3[GuildVerificationLevel$3["VeryHigh"] = 4] = "VeryHigh";
	})(GuildVerificationLevel$2 || (exports.GuildVerificationLevel = GuildVerificationLevel$2 = {}));
	var GuildPremiumTier$2;
	(function(GuildPremiumTier$3) {
		GuildPremiumTier$3[GuildPremiumTier$3["None"] = 0] = "None";
		GuildPremiumTier$3[GuildPremiumTier$3["Tier1"] = 1] = "Tier1";
		GuildPremiumTier$3[GuildPremiumTier$3["Tier2"] = 2] = "Tier2";
		GuildPremiumTier$3[GuildPremiumTier$3["Tier3"] = 3] = "Tier3";
	})(GuildPremiumTier$2 || (exports.GuildPremiumTier = GuildPremiumTier$2 = {}));
	var GuildHubType$2;
	(function(GuildHubType$3) {
		GuildHubType$3[GuildHubType$3["Default"] = 0] = "Default";
		GuildHubType$3[GuildHubType$3["HighSchool"] = 1] = "HighSchool";
		GuildHubType$3[GuildHubType$3["College"] = 2] = "College";
	})(GuildHubType$2 || (exports.GuildHubType = GuildHubType$2 = {}));
	var GuildSystemChannelFlags$2;
	(function(GuildSystemChannelFlags$3) {
		GuildSystemChannelFlags$3[GuildSystemChannelFlags$3["SuppressJoinNotifications"] = 1] = "SuppressJoinNotifications";
		GuildSystemChannelFlags$3[GuildSystemChannelFlags$3["SuppressPremiumSubscriptions"] = 2] = "SuppressPremiumSubscriptions";
		GuildSystemChannelFlags$3[GuildSystemChannelFlags$3["SuppressGuildReminderNotifications"] = 4] = "SuppressGuildReminderNotifications";
		GuildSystemChannelFlags$3[GuildSystemChannelFlags$3["SuppressJoinNotificationReplies"] = 8] = "SuppressJoinNotificationReplies";
		GuildSystemChannelFlags$3[GuildSystemChannelFlags$3["SuppressRoleSubscriptionPurchaseNotifications"] = 16] = "SuppressRoleSubscriptionPurchaseNotifications";
		GuildSystemChannelFlags$3[GuildSystemChannelFlags$3["SuppressRoleSubscriptionPurchaseNotificationReplies"] = 32] = "SuppressRoleSubscriptionPurchaseNotificationReplies";
	})(GuildSystemChannelFlags$2 || (exports.GuildSystemChannelFlags = GuildSystemChannelFlags$2 = {}));
	var GuildFeature$2;
	(function(GuildFeature$3) {
		GuildFeature$3["AnimatedBanner"] = "ANIMATED_BANNER";
		GuildFeature$3["AnimatedIcon"] = "ANIMATED_ICON";
		GuildFeature$3["ApplicationCommandPermissionsV2"] = "APPLICATION_COMMAND_PERMISSIONS_V2";
		GuildFeature$3["AutoModeration"] = "AUTO_MODERATION";
		GuildFeature$3["Banner"] = "BANNER";
		GuildFeature$3["Community"] = "COMMUNITY";
		GuildFeature$3["CreatorMonetizableProvisional"] = "CREATOR_MONETIZABLE_PROVISIONAL";
		GuildFeature$3["CreatorStorePage"] = "CREATOR_STORE_PAGE";
		GuildFeature$3["DeveloperSupportServer"] = "DEVELOPER_SUPPORT_SERVER";
		GuildFeature$3["Discoverable"] = "DISCOVERABLE";
		GuildFeature$3["Featurable"] = "FEATURABLE";
		GuildFeature$3["HasDirectoryEntry"] = "HAS_DIRECTORY_ENTRY";
		GuildFeature$3["Hub"] = "HUB";
		GuildFeature$3["InvitesDisabled"] = "INVITES_DISABLED";
		GuildFeature$3["InviteSplash"] = "INVITE_SPLASH";
		GuildFeature$3["LinkedToHub"] = "LINKED_TO_HUB";
		GuildFeature$3["MemberVerificationGateEnabled"] = "MEMBER_VERIFICATION_GATE_ENABLED";
		GuildFeature$3["MoreSoundboard"] = "MORE_SOUNDBOARD";
		GuildFeature$3["MonetizationEnabled"] = "MONETIZATION_ENABLED";
		GuildFeature$3["MoreStickers"] = "MORE_STICKERS";
		GuildFeature$3["News"] = "NEWS";
		GuildFeature$3["Partnered"] = "PARTNERED";
		GuildFeature$3["PreviewEnabled"] = "PREVIEW_ENABLED";
		GuildFeature$3["PrivateThreads"] = "PRIVATE_THREADS";
		GuildFeature$3["RaidAlertsDisabled"] = "RAID_ALERTS_DISABLED";
		GuildFeature$3["RelayEnabled"] = "RELAY_ENABLED";
		GuildFeature$3["RoleIcons"] = "ROLE_ICONS";
		GuildFeature$3["RoleSubscriptionsAvailableForPurchase"] = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE";
		GuildFeature$3["RoleSubscriptionsEnabled"] = "ROLE_SUBSCRIPTIONS_ENABLED";
		GuildFeature$3["Soundboard"] = "SOUNDBOARD";
		GuildFeature$3["TicketedEventsEnabled"] = "TICKETED_EVENTS_ENABLED";
		GuildFeature$3["VanityURL"] = "VANITY_URL";
		GuildFeature$3["Verified"] = "VERIFIED";
		GuildFeature$3["VIPRegions"] = "VIP_REGIONS";
		GuildFeature$3["WelcomeScreenEnabled"] = "WELCOME_SCREEN_ENABLED";
		GuildFeature$3["GuildTags"] = "GUILD_TAGS";
		GuildFeature$3["EnhancedRoleColors"] = "ENHANCED_ROLE_COLORS";
		GuildFeature$3["GuestsEnabled"] = "GUESTS_ENABLED";
	})(GuildFeature$2 || (exports.GuildFeature = GuildFeature$2 = {}));
	var GuildMemberFlags$2;
	(function(GuildMemberFlags$3) {
		GuildMemberFlags$3[GuildMemberFlags$3["DidRejoin"] = 1] = "DidRejoin";
		GuildMemberFlags$3[GuildMemberFlags$3["CompletedOnboarding"] = 2] = "CompletedOnboarding";
		GuildMemberFlags$3[GuildMemberFlags$3["BypassesVerification"] = 4] = "BypassesVerification";
		GuildMemberFlags$3[GuildMemberFlags$3["StartedOnboarding"] = 8] = "StartedOnboarding";
		GuildMemberFlags$3[GuildMemberFlags$3["IsGuest"] = 16] = "IsGuest";
		GuildMemberFlags$3[GuildMemberFlags$3["StartedHomeActions"] = 32] = "StartedHomeActions";
		GuildMemberFlags$3[GuildMemberFlags$3["CompletedHomeActions"] = 64] = "CompletedHomeActions";
		GuildMemberFlags$3[GuildMemberFlags$3["AutomodQuarantinedUsernameOrGuildNickname"] = 128] = "AutomodQuarantinedUsernameOrGuildNickname";
		GuildMemberFlags$3[GuildMemberFlags$3["AutomodQuarantinedBio"] = 256] = "AutomodQuarantinedBio";
		GuildMemberFlags$3[GuildMemberFlags$3["DmSettingsUpsellAcknowledged"] = 512] = "DmSettingsUpsellAcknowledged";
		GuildMemberFlags$3[GuildMemberFlags$3["AutoModQuarantinedGuildTag"] = 1024] = "AutoModQuarantinedGuildTag";
	})(GuildMemberFlags$2 || (exports.GuildMemberFlags = GuildMemberFlags$2 = {}));
	var IntegrationExpireBehavior$2;
	(function(IntegrationExpireBehavior$3) {
		IntegrationExpireBehavior$3[IntegrationExpireBehavior$3["RemoveRole"] = 0] = "RemoveRole";
		IntegrationExpireBehavior$3[IntegrationExpireBehavior$3["Kick"] = 1] = "Kick";
	})(IntegrationExpireBehavior$2 || (exports.IntegrationExpireBehavior = IntegrationExpireBehavior$2 = {}));
	var GuildWidgetStyle$2;
	(function(GuildWidgetStyle$3) {
		GuildWidgetStyle$3["Shield"] = "shield";
		GuildWidgetStyle$3["Banner1"] = "banner1";
		GuildWidgetStyle$3["Banner2"] = "banner2";
		GuildWidgetStyle$3["Banner3"] = "banner3";
		GuildWidgetStyle$3["Banner4"] = "banner4";
	})(GuildWidgetStyle$2 || (exports.GuildWidgetStyle = GuildWidgetStyle$2 = {}));
	var MembershipScreeningFieldType$2;
	(function(MembershipScreeningFieldType$3) {
		MembershipScreeningFieldType$3["Terms"] = "TERMS";
	})(MembershipScreeningFieldType$2 || (exports.MembershipScreeningFieldType = MembershipScreeningFieldType$2 = {}));
	var GuildOnboardingMode$2;
	(function(GuildOnboardingMode$3) {
		GuildOnboardingMode$3[GuildOnboardingMode$3["OnboardingDefault"] = 0] = "OnboardingDefault";
		GuildOnboardingMode$3[GuildOnboardingMode$3["OnboardingAdvanced"] = 1] = "OnboardingAdvanced";
	})(GuildOnboardingMode$2 || (exports.GuildOnboardingMode = GuildOnboardingMode$2 = {}));
	var GuildOnboardingPromptType$2;
	(function(GuildOnboardingPromptType$3) {
		GuildOnboardingPromptType$3[GuildOnboardingPromptType$3["MultipleChoice"] = 0] = "MultipleChoice";
		GuildOnboardingPromptType$3[GuildOnboardingPromptType$3["Dropdown"] = 1] = "Dropdown";
	})(GuildOnboardingPromptType$2 || (exports.GuildOnboardingPromptType = GuildOnboardingPromptType$2 = {}));
}));
var require_guildScheduledEvent = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var GuildScheduledEventRecurrenceRuleFrequency$2;
	(function(GuildScheduledEventRecurrenceRuleFrequency$3) {
		GuildScheduledEventRecurrenceRuleFrequency$3[GuildScheduledEventRecurrenceRuleFrequency$3["Yearly"] = 0] = "Yearly";
		GuildScheduledEventRecurrenceRuleFrequency$3[GuildScheduledEventRecurrenceRuleFrequency$3["Monthly"] = 1] = "Monthly";
		GuildScheduledEventRecurrenceRuleFrequency$3[GuildScheduledEventRecurrenceRuleFrequency$3["Weekly"] = 2] = "Weekly";
		GuildScheduledEventRecurrenceRuleFrequency$3[GuildScheduledEventRecurrenceRuleFrequency$3["Daily"] = 3] = "Daily";
	})(GuildScheduledEventRecurrenceRuleFrequency$2 || (exports.GuildScheduledEventRecurrenceRuleFrequency = GuildScheduledEventRecurrenceRuleFrequency$2 = {}));
	var GuildScheduledEventRecurrenceRuleWeekday$2;
	(function(GuildScheduledEventRecurrenceRuleWeekday$3) {
		GuildScheduledEventRecurrenceRuleWeekday$3[GuildScheduledEventRecurrenceRuleWeekday$3["Monday"] = 0] = "Monday";
		GuildScheduledEventRecurrenceRuleWeekday$3[GuildScheduledEventRecurrenceRuleWeekday$3["Tuesday"] = 1] = "Tuesday";
		GuildScheduledEventRecurrenceRuleWeekday$3[GuildScheduledEventRecurrenceRuleWeekday$3["Wednesday"] = 2] = "Wednesday";
		GuildScheduledEventRecurrenceRuleWeekday$3[GuildScheduledEventRecurrenceRuleWeekday$3["Thursday"] = 3] = "Thursday";
		GuildScheduledEventRecurrenceRuleWeekday$3[GuildScheduledEventRecurrenceRuleWeekday$3["Friday"] = 4] = "Friday";
		GuildScheduledEventRecurrenceRuleWeekday$3[GuildScheduledEventRecurrenceRuleWeekday$3["Saturday"] = 5] = "Saturday";
		GuildScheduledEventRecurrenceRuleWeekday$3[GuildScheduledEventRecurrenceRuleWeekday$3["Sunday"] = 6] = "Sunday";
	})(GuildScheduledEventRecurrenceRuleWeekday$2 || (exports.GuildScheduledEventRecurrenceRuleWeekday = GuildScheduledEventRecurrenceRuleWeekday$2 = {}));
	var GuildScheduledEventRecurrenceRuleMonth$2;
	(function(GuildScheduledEventRecurrenceRuleMonth$3) {
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["January"] = 1] = "January";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["February"] = 2] = "February";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["March"] = 3] = "March";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["April"] = 4] = "April";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["May"] = 5] = "May";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["June"] = 6] = "June";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["July"] = 7] = "July";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["August"] = 8] = "August";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["September"] = 9] = "September";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["October"] = 10] = "October";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["November"] = 11] = "November";
		GuildScheduledEventRecurrenceRuleMonth$3[GuildScheduledEventRecurrenceRuleMonth$3["December"] = 12] = "December";
	})(GuildScheduledEventRecurrenceRuleMonth$2 || (exports.GuildScheduledEventRecurrenceRuleMonth = GuildScheduledEventRecurrenceRuleMonth$2 = {}));
	var GuildScheduledEventEntityType$2;
	(function(GuildScheduledEventEntityType$3) {
		GuildScheduledEventEntityType$3[GuildScheduledEventEntityType$3["StageInstance"] = 1] = "StageInstance";
		GuildScheduledEventEntityType$3[GuildScheduledEventEntityType$3["Voice"] = 2] = "Voice";
		GuildScheduledEventEntityType$3[GuildScheduledEventEntityType$3["External"] = 3] = "External";
	})(GuildScheduledEventEntityType$2 || (exports.GuildScheduledEventEntityType = GuildScheduledEventEntityType$2 = {}));
	var GuildScheduledEventStatus$2;
	(function(GuildScheduledEventStatus$3) {
		GuildScheduledEventStatus$3[GuildScheduledEventStatus$3["Scheduled"] = 1] = "Scheduled";
		GuildScheduledEventStatus$3[GuildScheduledEventStatus$3["Active"] = 2] = "Active";
		GuildScheduledEventStatus$3[GuildScheduledEventStatus$3["Completed"] = 3] = "Completed";
		GuildScheduledEventStatus$3[GuildScheduledEventStatus$3["Canceled"] = 4] = "Canceled";
	})(GuildScheduledEventStatus$2 || (exports.GuildScheduledEventStatus = GuildScheduledEventStatus$2 = {}));
	var GuildScheduledEventPrivacyLevel$2;
	(function(GuildScheduledEventPrivacyLevel$3) {
		GuildScheduledEventPrivacyLevel$3[GuildScheduledEventPrivacyLevel$3["GuildOnly"] = 2] = "GuildOnly";
	})(GuildScheduledEventPrivacyLevel$2 || (exports.GuildScheduledEventPrivacyLevel = GuildScheduledEventPrivacyLevel$2 = {}));
}));
var require_shared = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ApplicationCommandOptionType$2;
	(function(ApplicationCommandOptionType$3) {
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Subcommand"] = 1] = "Subcommand";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["SubcommandGroup"] = 2] = "SubcommandGroup";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["String"] = 3] = "String";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Integer"] = 4] = "Integer";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Boolean"] = 5] = "Boolean";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["User"] = 6] = "User";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Channel"] = 7] = "Channel";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Role"] = 8] = "Role";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Mentionable"] = 9] = "Mentionable";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Number"] = 10] = "Number";
		ApplicationCommandOptionType$3[ApplicationCommandOptionType$3["Attachment"] = 11] = "Attachment";
	})(ApplicationCommandOptionType$2 || (exports.ApplicationCommandOptionType = ApplicationCommandOptionType$2 = {}));
}));
var require_chatInput = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$7 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
	var __exportStar$7 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$7(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar$7(require_shared(), exports);
}));
var require_permissions$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ApplicationCommandPermissionType$2;
	(function(ApplicationCommandPermissionType$3) {
		ApplicationCommandPermissionType$3[ApplicationCommandPermissionType$3["Role"] = 1] = "Role";
		ApplicationCommandPermissionType$3[ApplicationCommandPermissionType$3["User"] = 2] = "User";
		ApplicationCommandPermissionType$3[ApplicationCommandPermissionType$3["Channel"] = 3] = "Channel";
	})(ApplicationCommandPermissionType$2 || (exports.ApplicationCommandPermissionType = ApplicationCommandPermissionType$2 = {}));
	exports.APIApplicationCommandPermissionsConstant = {
		Everyone: (guildId) => String(guildId),
		AllChannels: (guildId) => String(BigInt(guildId) - 1n)
	};
}));
var require_applicationCommands = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$6 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
	var __exportStar$6 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$6(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.EntryPointCommandHandlerType = exports.InteractionContextType = exports.ApplicationIntegrationType = exports.ApplicationCommandType = void 0;
	__exportStar$6(require_chatInput(), exports);
	__exportStar$6(require_permissions$1(), exports);
	var ApplicationCommandType$2;
	(function(ApplicationCommandType$3) {
		ApplicationCommandType$3[ApplicationCommandType$3["ChatInput"] = 1] = "ChatInput";
		ApplicationCommandType$3[ApplicationCommandType$3["User"] = 2] = "User";
		ApplicationCommandType$3[ApplicationCommandType$3["Message"] = 3] = "Message";
		ApplicationCommandType$3[ApplicationCommandType$3["PrimaryEntryPoint"] = 4] = "PrimaryEntryPoint";
	})(ApplicationCommandType$2 || (exports.ApplicationCommandType = ApplicationCommandType$2 = {}));
	var ApplicationIntegrationType$2;
	(function(ApplicationIntegrationType$3) {
		ApplicationIntegrationType$3[ApplicationIntegrationType$3["GuildInstall"] = 0] = "GuildInstall";
		ApplicationIntegrationType$3[ApplicationIntegrationType$3["UserInstall"] = 1] = "UserInstall";
	})(ApplicationIntegrationType$2 || (exports.ApplicationIntegrationType = ApplicationIntegrationType$2 = {}));
	var InteractionContextType$2;
	(function(InteractionContextType$3) {
		InteractionContextType$3[InteractionContextType$3["Guild"] = 0] = "Guild";
		InteractionContextType$3[InteractionContextType$3["BotDM"] = 1] = "BotDM";
		InteractionContextType$3[InteractionContextType$3["PrivateChannel"] = 2] = "PrivateChannel";
	})(InteractionContextType$2 || (exports.InteractionContextType = InteractionContextType$2 = {}));
	var EntryPointCommandHandlerType$2;
	(function(EntryPointCommandHandlerType$3) {
		EntryPointCommandHandlerType$3[EntryPointCommandHandlerType$3["AppHandler"] = 1] = "AppHandler";
		EntryPointCommandHandlerType$3[EntryPointCommandHandlerType$3["DiscordLaunchActivity"] = 2] = "DiscordLaunchActivity";
	})(EntryPointCommandHandlerType$2 || (exports.EntryPointCommandHandlerType = EntryPointCommandHandlerType$2 = {}));
}));
var require_responses = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var InteractionType$2;
	(function(InteractionType$3) {
		InteractionType$3[InteractionType$3["Ping"] = 1] = "Ping";
		InteractionType$3[InteractionType$3["ApplicationCommand"] = 2] = "ApplicationCommand";
		InteractionType$3[InteractionType$3["MessageComponent"] = 3] = "MessageComponent";
		InteractionType$3[InteractionType$3["ApplicationCommandAutocomplete"] = 4] = "ApplicationCommandAutocomplete";
		InteractionType$3[InteractionType$3["ModalSubmit"] = 5] = "ModalSubmit";
	})(InteractionType$2 || (exports.InteractionType = InteractionType$2 = {}));
	var InteractionResponseType$2;
	(function(InteractionResponseType$3) {
		InteractionResponseType$3[InteractionResponseType$3["Pong"] = 1] = "Pong";
		InteractionResponseType$3[InteractionResponseType$3["ChannelMessageWithSource"] = 4] = "ChannelMessageWithSource";
		InteractionResponseType$3[InteractionResponseType$3["DeferredChannelMessageWithSource"] = 5] = "DeferredChannelMessageWithSource";
		InteractionResponseType$3[InteractionResponseType$3["DeferredMessageUpdate"] = 6] = "DeferredMessageUpdate";
		InteractionResponseType$3[InteractionResponseType$3["UpdateMessage"] = 7] = "UpdateMessage";
		InteractionResponseType$3[InteractionResponseType$3["ApplicationCommandAutocompleteResult"] = 8] = "ApplicationCommandAutocompleteResult";
		InteractionResponseType$3[InteractionResponseType$3["Modal"] = 9] = "Modal";
		InteractionResponseType$3[InteractionResponseType$3["PremiumRequired"] = 10] = "PremiumRequired";
		InteractionResponseType$3[InteractionResponseType$3["LaunchActivity"] = 12] = "LaunchActivity";
	})(InteractionResponseType$2 || (exports.InteractionResponseType = InteractionResponseType$2 = {}));
}));
var require_interactions = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding$5 = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
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
	var __exportStar$5 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$5(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar$5(require_applicationCommands(), exports);
	__exportStar$5(require_responses(), exports);
}));
var require_invite = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var InviteFlags$2;
	(function(InviteFlags$3) {
		InviteFlags$3[InviteFlags$3["IsGuestInvite"] = 1] = "IsGuestInvite";
	})(InviteFlags$2 || (exports.InviteFlags = InviteFlags$2 = {}));
	var InviteType$2;
	(function(InviteType$3) {
		InviteType$3[InviteType$3["Guild"] = 0] = "Guild";
		InviteType$3[InviteType$3["GroupDM"] = 1] = "GroupDM";
		InviteType$3[InviteType$3["Friend"] = 2] = "Friend";
	})(InviteType$2 || (exports.InviteType = InviteType$2 = {}));
	var InviteTargetType$2;
	(function(InviteTargetType$3) {
		InviteTargetType$3[InviteTargetType$3["Stream"] = 1] = "Stream";
		InviteTargetType$3[InviteTargetType$3["EmbeddedApplication"] = 2] = "EmbeddedApplication";
	})(InviteTargetType$2 || (exports.InviteTargetType = InviteTargetType$2 = {}));
}));
var require_message = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var MessageType$2;
	(function(MessageType$3) {
		MessageType$3[MessageType$3["Default"] = 0] = "Default";
		MessageType$3[MessageType$3["RecipientAdd"] = 1] = "RecipientAdd";
		MessageType$3[MessageType$3["RecipientRemove"] = 2] = "RecipientRemove";
		MessageType$3[MessageType$3["Call"] = 3] = "Call";
		MessageType$3[MessageType$3["ChannelNameChange"] = 4] = "ChannelNameChange";
		MessageType$3[MessageType$3["ChannelIconChange"] = 5] = "ChannelIconChange";
		MessageType$3[MessageType$3["ChannelPinnedMessage"] = 6] = "ChannelPinnedMessage";
		MessageType$3[MessageType$3["UserJoin"] = 7] = "UserJoin";
		MessageType$3[MessageType$3["GuildBoost"] = 8] = "GuildBoost";
		MessageType$3[MessageType$3["GuildBoostTier1"] = 9] = "GuildBoostTier1";
		MessageType$3[MessageType$3["GuildBoostTier2"] = 10] = "GuildBoostTier2";
		MessageType$3[MessageType$3["GuildBoostTier3"] = 11] = "GuildBoostTier3";
		MessageType$3[MessageType$3["ChannelFollowAdd"] = 12] = "ChannelFollowAdd";
		MessageType$3[MessageType$3["GuildDiscoveryDisqualified"] = 14] = "GuildDiscoveryDisqualified";
		MessageType$3[MessageType$3["GuildDiscoveryRequalified"] = 15] = "GuildDiscoveryRequalified";
		MessageType$3[MessageType$3["GuildDiscoveryGracePeriodInitialWarning"] = 16] = "GuildDiscoveryGracePeriodInitialWarning";
		MessageType$3[MessageType$3["GuildDiscoveryGracePeriodFinalWarning"] = 17] = "GuildDiscoveryGracePeriodFinalWarning";
		MessageType$3[MessageType$3["ThreadCreated"] = 18] = "ThreadCreated";
		MessageType$3[MessageType$3["Reply"] = 19] = "Reply";
		MessageType$3[MessageType$3["ChatInputCommand"] = 20] = "ChatInputCommand";
		MessageType$3[MessageType$3["ThreadStarterMessage"] = 21] = "ThreadStarterMessage";
		MessageType$3[MessageType$3["GuildInviteReminder"] = 22] = "GuildInviteReminder";
		MessageType$3[MessageType$3["ContextMenuCommand"] = 23] = "ContextMenuCommand";
		MessageType$3[MessageType$3["AutoModerationAction"] = 24] = "AutoModerationAction";
		MessageType$3[MessageType$3["RoleSubscriptionPurchase"] = 25] = "RoleSubscriptionPurchase";
		MessageType$3[MessageType$3["InteractionPremiumUpsell"] = 26] = "InteractionPremiumUpsell";
		MessageType$3[MessageType$3["StageStart"] = 27] = "StageStart";
		MessageType$3[MessageType$3["StageEnd"] = 28] = "StageEnd";
		MessageType$3[MessageType$3["StageSpeaker"] = 29] = "StageSpeaker";
		MessageType$3[MessageType$3["StageRaiseHand"] = 30] = "StageRaiseHand";
		MessageType$3[MessageType$3["StageTopic"] = 31] = "StageTopic";
		MessageType$3[MessageType$3["GuildApplicationPremiumSubscription"] = 32] = "GuildApplicationPremiumSubscription";
		MessageType$3[MessageType$3["GuildIncidentAlertModeEnabled"] = 36] = "GuildIncidentAlertModeEnabled";
		MessageType$3[MessageType$3["GuildIncidentAlertModeDisabled"] = 37] = "GuildIncidentAlertModeDisabled";
		MessageType$3[MessageType$3["GuildIncidentReportRaid"] = 38] = "GuildIncidentReportRaid";
		MessageType$3[MessageType$3["GuildIncidentReportFalseAlarm"] = 39] = "GuildIncidentReportFalseAlarm";
		MessageType$3[MessageType$3["PurchaseNotification"] = 44] = "PurchaseNotification";
		MessageType$3[MessageType$3["PollResult"] = 46] = "PollResult";
	})(MessageType$2 || (exports.MessageType = MessageType$2 = {}));
	var MessageActivityType$2;
	(function(MessageActivityType$3) {
		MessageActivityType$3[MessageActivityType$3["Join"] = 1] = "Join";
		MessageActivityType$3[MessageActivityType$3["Spectate"] = 2] = "Spectate";
		MessageActivityType$3[MessageActivityType$3["Listen"] = 3] = "Listen";
		MessageActivityType$3[MessageActivityType$3["JoinRequest"] = 5] = "JoinRequest";
	})(MessageActivityType$2 || (exports.MessageActivityType = MessageActivityType$2 = {}));
	var MessageReferenceType$2;
	(function(MessageReferenceType$3) {
		MessageReferenceType$3[MessageReferenceType$3["Default"] = 0] = "Default";
		MessageReferenceType$3[MessageReferenceType$3["Forward"] = 1] = "Forward";
	})(MessageReferenceType$2 || (exports.MessageReferenceType = MessageReferenceType$2 = {}));
	var MessageFlags$2;
	(function(MessageFlags$3) {
		MessageFlags$3[MessageFlags$3["Crossposted"] = 1] = "Crossposted";
		MessageFlags$3[MessageFlags$3["IsCrosspost"] = 2] = "IsCrosspost";
		MessageFlags$3[MessageFlags$3["SuppressEmbeds"] = 4] = "SuppressEmbeds";
		MessageFlags$3[MessageFlags$3["SourceMessageDeleted"] = 8] = "SourceMessageDeleted";
		MessageFlags$3[MessageFlags$3["Urgent"] = 16] = "Urgent";
		MessageFlags$3[MessageFlags$3["HasThread"] = 32] = "HasThread";
		MessageFlags$3[MessageFlags$3["Ephemeral"] = 64] = "Ephemeral";
		MessageFlags$3[MessageFlags$3["Loading"] = 128] = "Loading";
		MessageFlags$3[MessageFlags$3["FailedToMentionSomeRolesInThread"] = 256] = "FailedToMentionSomeRolesInThread";
		MessageFlags$3[MessageFlags$3["ShouldShowLinkNotDiscordWarning"] = 1024] = "ShouldShowLinkNotDiscordWarning";
		MessageFlags$3[MessageFlags$3["SuppressNotifications"] = 4096] = "SuppressNotifications";
		MessageFlags$3[MessageFlags$3["IsVoiceMessage"] = 8192] = "IsVoiceMessage";
		MessageFlags$3[MessageFlags$3["HasSnapshot"] = 16384] = "HasSnapshot";
		MessageFlags$3[MessageFlags$3["IsComponentsV2"] = 32768] = "IsComponentsV2";
	})(MessageFlags$2 || (exports.MessageFlags = MessageFlags$2 = {}));
	var EmbedType$2;
	(function(EmbedType$3) {
		EmbedType$3["Rich"] = "rich";
		EmbedType$3["Image"] = "image";
		EmbedType$3["Video"] = "video";
		EmbedType$3["GIFV"] = "gifv";
		EmbedType$3["Article"] = "article";
		EmbedType$3["Link"] = "link";
		EmbedType$3["AutoModerationMessage"] = "auto_moderation_message";
		EmbedType$3["PollResult"] = "poll_result";
	})(EmbedType$2 || (exports.EmbedType = EmbedType$2 = {}));
	var AttachmentFlags$2;
	(function(AttachmentFlags$3) {
		AttachmentFlags$3[AttachmentFlags$3["IsRemix"] = 4] = "IsRemix";
	})(AttachmentFlags$2 || (exports.AttachmentFlags = AttachmentFlags$2 = {}));
	var AllowedMentionsTypes$2;
	(function(AllowedMentionsTypes$3) {
		AllowedMentionsTypes$3["Everyone"] = "everyone";
		AllowedMentionsTypes$3["Role"] = "roles";
		AllowedMentionsTypes$3["User"] = "users";
	})(AllowedMentionsTypes$2 || (exports.AllowedMentionsTypes = AllowedMentionsTypes$2 = {}));
	var ComponentType$2;
	(function(ComponentType$3) {
		ComponentType$3[ComponentType$3["ActionRow"] = 1] = "ActionRow";
		ComponentType$3[ComponentType$3["Button"] = 2] = "Button";
		ComponentType$3[ComponentType$3["StringSelect"] = 3] = "StringSelect";
		ComponentType$3[ComponentType$3["TextInput"] = 4] = "TextInput";
		ComponentType$3[ComponentType$3["UserSelect"] = 5] = "UserSelect";
		ComponentType$3[ComponentType$3["RoleSelect"] = 6] = "RoleSelect";
		ComponentType$3[ComponentType$3["MentionableSelect"] = 7] = "MentionableSelect";
		ComponentType$3[ComponentType$3["ChannelSelect"] = 8] = "ChannelSelect";
		ComponentType$3[ComponentType$3["Section"] = 9] = "Section";
		ComponentType$3[ComponentType$3["TextDisplay"] = 10] = "TextDisplay";
		ComponentType$3[ComponentType$3["Thumbnail"] = 11] = "Thumbnail";
		ComponentType$3[ComponentType$3["MediaGallery"] = 12] = "MediaGallery";
		ComponentType$3[ComponentType$3["File"] = 13] = "File";
		ComponentType$3[ComponentType$3["Separator"] = 14] = "Separator";
		ComponentType$3[ComponentType$3["ContentInventoryEntry"] = 16] = "ContentInventoryEntry";
		ComponentType$3[ComponentType$3["Container"] = 17] = "Container";
		ComponentType$3[ComponentType$3["Label"] = 18] = "Label";
		ComponentType$3[ComponentType$3["SelectMenu"] = 3] = "SelectMenu";
	})(ComponentType$2 || (exports.ComponentType = ComponentType$2 = {}));
	var ButtonStyle$2;
	(function(ButtonStyle$3) {
		ButtonStyle$3[ButtonStyle$3["Primary"] = 1] = "Primary";
		ButtonStyle$3[ButtonStyle$3["Secondary"] = 2] = "Secondary";
		ButtonStyle$3[ButtonStyle$3["Success"] = 3] = "Success";
		ButtonStyle$3[ButtonStyle$3["Danger"] = 4] = "Danger";
		ButtonStyle$3[ButtonStyle$3["Link"] = 5] = "Link";
		ButtonStyle$3[ButtonStyle$3["Premium"] = 6] = "Premium";
	})(ButtonStyle$2 || (exports.ButtonStyle = ButtonStyle$2 = {}));
	var TextInputStyle$2;
	(function(TextInputStyle$3) {
		TextInputStyle$3[TextInputStyle$3["Short"] = 1] = "Short";
		TextInputStyle$3[TextInputStyle$3["Paragraph"] = 2] = "Paragraph";
	})(TextInputStyle$2 || (exports.TextInputStyle = TextInputStyle$2 = {}));
	var SelectMenuDefaultValueType$2;
	(function(SelectMenuDefaultValueType$3) {
		SelectMenuDefaultValueType$3["Channel"] = "channel";
		SelectMenuDefaultValueType$3["Role"] = "role";
		SelectMenuDefaultValueType$3["User"] = "user";
	})(SelectMenuDefaultValueType$2 || (exports.SelectMenuDefaultValueType = SelectMenuDefaultValueType$2 = {}));
	var UnfurledMediaItemLoadingState$2;
	(function(UnfurledMediaItemLoadingState$3) {
		UnfurledMediaItemLoadingState$3[UnfurledMediaItemLoadingState$3["Unknown"] = 0] = "Unknown";
		UnfurledMediaItemLoadingState$3[UnfurledMediaItemLoadingState$3["Loading"] = 1] = "Loading";
		UnfurledMediaItemLoadingState$3[UnfurledMediaItemLoadingState$3["LoadedSuccess"] = 2] = "LoadedSuccess";
		UnfurledMediaItemLoadingState$3[UnfurledMediaItemLoadingState$3["LoadedNotFound"] = 3] = "LoadedNotFound";
	})(UnfurledMediaItemLoadingState$2 || (exports.UnfurledMediaItemLoadingState = UnfurledMediaItemLoadingState$2 = {}));
	var SeparatorSpacingSize$2;
	(function(SeparatorSpacingSize$3) {
		SeparatorSpacingSize$3[SeparatorSpacingSize$3["Small"] = 1] = "Small";
		SeparatorSpacingSize$3[SeparatorSpacingSize$3["Large"] = 2] = "Large";
	})(SeparatorSpacingSize$2 || (exports.SeparatorSpacingSize = SeparatorSpacingSize$2 = {}));
}));
var require_monetization$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var EntitlementType$2;
	(function(EntitlementType$3) {
		EntitlementType$3[EntitlementType$3["Purchase"] = 1] = "Purchase";
		EntitlementType$3[EntitlementType$3["PremiumSubscription"] = 2] = "PremiumSubscription";
		EntitlementType$3[EntitlementType$3["DeveloperGift"] = 3] = "DeveloperGift";
		EntitlementType$3[EntitlementType$3["TestModePurchase"] = 4] = "TestModePurchase";
		EntitlementType$3[EntitlementType$3["FreePurchase"] = 5] = "FreePurchase";
		EntitlementType$3[EntitlementType$3["UserGift"] = 6] = "UserGift";
		EntitlementType$3[EntitlementType$3["PremiumPurchase"] = 7] = "PremiumPurchase";
		EntitlementType$3[EntitlementType$3["ApplicationSubscription"] = 8] = "ApplicationSubscription";
	})(EntitlementType$2 || (exports.EntitlementType = EntitlementType$2 = {}));
	var SKUFlags$2;
	(function(SKUFlags$3) {
		SKUFlags$3[SKUFlags$3["Available"] = 4] = "Available";
		SKUFlags$3[SKUFlags$3["GuildSubscription"] = 128] = "GuildSubscription";
		SKUFlags$3[SKUFlags$3["UserSubscription"] = 256] = "UserSubscription";
	})(SKUFlags$2 || (exports.SKUFlags = SKUFlags$2 = {}));
	var SKUType$2;
	(function(SKUType$3) {
		SKUType$3[SKUType$3["Durable"] = 2] = "Durable";
		SKUType$3[SKUType$3["Consumable"] = 3] = "Consumable";
		SKUType$3[SKUType$3["Subscription"] = 5] = "Subscription";
		SKUType$3[SKUType$3["SubscriptionGroup"] = 6] = "SubscriptionGroup";
	})(SKUType$2 || (exports.SKUType = SKUType$2 = {}));
	var SubscriptionStatus$2;
	(function(SubscriptionStatus$3) {
		SubscriptionStatus$3[SubscriptionStatus$3["Active"] = 0] = "Active";
		SubscriptionStatus$3[SubscriptionStatus$3["Ending"] = 1] = "Ending";
		SubscriptionStatus$3[SubscriptionStatus$3["Inactive"] = 2] = "Inactive";
	})(SubscriptionStatus$2 || (exports.SubscriptionStatus = SubscriptionStatus$2 = {}));
}));
var require_oauth2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var OAuth2Scopes$2;
	(function(OAuth2Scopes$3) {
		OAuth2Scopes$3["Bot"] = "bot";
		OAuth2Scopes$3["Connections"] = "connections";
		OAuth2Scopes$3["DMChannelsRead"] = "dm_channels.read";
		OAuth2Scopes$3["Email"] = "email";
		OAuth2Scopes$3["Identify"] = "identify";
		OAuth2Scopes$3["Guilds"] = "guilds";
		OAuth2Scopes$3["GuildsJoin"] = "guilds.join";
		OAuth2Scopes$3["GuildsMembersRead"] = "guilds.members.read";
		OAuth2Scopes$3["GroupDMJoins"] = "gdm.join";
		OAuth2Scopes$3["MessagesRead"] = "messages.read";
		OAuth2Scopes$3["RoleConnectionsWrite"] = "role_connections.write";
		OAuth2Scopes$3["RPC"] = "rpc";
		OAuth2Scopes$3["RPCActivitiesWrite"] = "rpc.activities.write";
		OAuth2Scopes$3["RPCVoiceRead"] = "rpc.voice.read";
		OAuth2Scopes$3["RPCVoiceWrite"] = "rpc.voice.write";
		OAuth2Scopes$3["RPCNotificationsRead"] = "rpc.notifications.read";
		OAuth2Scopes$3["WebhookIncoming"] = "webhook.incoming";
		OAuth2Scopes$3["Voice"] = "voice";
		OAuth2Scopes$3["ApplicationsBuildsUpload"] = "applications.builds.upload";
		OAuth2Scopes$3["ApplicationsBuildsRead"] = "applications.builds.read";
		OAuth2Scopes$3["ApplicationsStoreUpdate"] = "applications.store.update";
		OAuth2Scopes$3["ApplicationsEntitlements"] = "applications.entitlements";
		OAuth2Scopes$3["RelationshipsRead"] = "relationships.read";
		OAuth2Scopes$3["ActivitiesRead"] = "activities.read";
		OAuth2Scopes$3["ActivitiesWrite"] = "activities.write";
		OAuth2Scopes$3["ApplicationsCommands"] = "applications.commands";
		OAuth2Scopes$3["ApplicationsCommandsUpdate"] = "applications.commands.update";
		OAuth2Scopes$3["ApplicationCommandsPermissionsUpdate"] = "applications.commands.permissions.update";
	})(OAuth2Scopes$2 || (exports.OAuth2Scopes = OAuth2Scopes$2 = {}));
}));
var require_permissions = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var RoleFlags$2;
	(function(RoleFlags$3) {
		RoleFlags$3[RoleFlags$3["InPrompt"] = 1] = "InPrompt";
	})(RoleFlags$2 || (exports.RoleFlags = RoleFlags$2 = {}));
}));
var require_poll = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var PollLayoutType$2;
	(function(PollLayoutType$3) {
		PollLayoutType$3[PollLayoutType$3["Default"] = 1] = "Default";
	})(PollLayoutType$2 || (exports.PollLayoutType = PollLayoutType$2 = {}));
}));
var require_stageInstance = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var StageInstancePrivacyLevel$2;
	(function(StageInstancePrivacyLevel$3) {
		StageInstancePrivacyLevel$3[StageInstancePrivacyLevel$3["Public"] = 1] = "Public";
		StageInstancePrivacyLevel$3[StageInstancePrivacyLevel$3["GuildOnly"] = 2] = "GuildOnly";
	})(StageInstancePrivacyLevel$2 || (exports.StageInstancePrivacyLevel = StageInstancePrivacyLevel$2 = {}));
}));
var require_sticker = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var StickerType$2;
	(function(StickerType$3) {
		StickerType$3[StickerType$3["Standard"] = 1] = "Standard";
		StickerType$3[StickerType$3["Guild"] = 2] = "Guild";
	})(StickerType$2 || (exports.StickerType = StickerType$2 = {}));
	var StickerFormatType$2;
	(function(StickerFormatType$3) {
		StickerFormatType$3[StickerFormatType$3["PNG"] = 1] = "PNG";
		StickerFormatType$3[StickerFormatType$3["APNG"] = 2] = "APNG";
		StickerFormatType$3[StickerFormatType$3["Lottie"] = 3] = "Lottie";
		StickerFormatType$3[StickerFormatType$3["GIF"] = 4] = "GIF";
	})(StickerFormatType$2 || (exports.StickerFormatType = StickerFormatType$2 = {}));
}));
var require_teams = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var TeamMemberMembershipState$2;
	(function(TeamMemberMembershipState$3) {
		TeamMemberMembershipState$3[TeamMemberMembershipState$3["Invited"] = 1] = "Invited";
		TeamMemberMembershipState$3[TeamMemberMembershipState$3["Accepted"] = 2] = "Accepted";
	})(TeamMemberMembershipState$2 || (exports.TeamMemberMembershipState = TeamMemberMembershipState$2 = {}));
	var TeamMemberRole$2;
	(function(TeamMemberRole$3) {
		TeamMemberRole$3["Admin"] = "admin";
		TeamMemberRole$3["Developer"] = "developer";
		TeamMemberRole$3["ReadOnly"] = "read_only";
	})(TeamMemberRole$2 || (exports.TeamMemberRole = TeamMemberRole$2 = {}));
}));
var require_user = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var UserFlags$2;
	(function(UserFlags$3) {
		UserFlags$3[UserFlags$3["Staff"] = 1] = "Staff";
		UserFlags$3[UserFlags$3["Partner"] = 2] = "Partner";
		UserFlags$3[UserFlags$3["Hypesquad"] = 4] = "Hypesquad";
		UserFlags$3[UserFlags$3["BugHunterLevel1"] = 8] = "BugHunterLevel1";
		UserFlags$3[UserFlags$3["MFASMS"] = 16] = "MFASMS";
		UserFlags$3[UserFlags$3["PremiumPromoDismissed"] = 32] = "PremiumPromoDismissed";
		UserFlags$3[UserFlags$3["HypeSquadOnlineHouse1"] = 64] = "HypeSquadOnlineHouse1";
		UserFlags$3[UserFlags$3["HypeSquadOnlineHouse2"] = 128] = "HypeSquadOnlineHouse2";
		UserFlags$3[UserFlags$3["HypeSquadOnlineHouse3"] = 256] = "HypeSquadOnlineHouse3";
		UserFlags$3[UserFlags$3["PremiumEarlySupporter"] = 512] = "PremiumEarlySupporter";
		UserFlags$3[UserFlags$3["TeamPseudoUser"] = 1024] = "TeamPseudoUser";
		UserFlags$3[UserFlags$3["HasUnreadUrgentMessages"] = 8192] = "HasUnreadUrgentMessages";
		UserFlags$3[UserFlags$3["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
		UserFlags$3[UserFlags$3["VerifiedBot"] = 65536] = "VerifiedBot";
		UserFlags$3[UserFlags$3["VerifiedDeveloper"] = 131072] = "VerifiedDeveloper";
		UserFlags$3[UserFlags$3["CertifiedModerator"] = 262144] = "CertifiedModerator";
		UserFlags$3[UserFlags$3["BotHTTPInteractions"] = 524288] = "BotHTTPInteractions";
		UserFlags$3[UserFlags$3["Spammer"] = 1048576] = "Spammer";
		UserFlags$3[UserFlags$3["DisablePremium"] = 2097152] = "DisablePremium";
		UserFlags$3[UserFlags$3["ActiveDeveloper"] = 4194304] = "ActiveDeveloper";
		UserFlags$3[UserFlags$3["Quarantined"] = 17592186044416] = "Quarantined";
		UserFlags$3[UserFlags$3["Collaborator"] = 0x4000000000000] = "Collaborator";
		UserFlags$3[UserFlags$3["RestrictedCollaborator"] = 0x8000000000000] = "RestrictedCollaborator";
	})(UserFlags$2 || (exports.UserFlags = UserFlags$2 = {}));
	var UserPremiumType$2;
	(function(UserPremiumType$3) {
		UserPremiumType$3[UserPremiumType$3["None"] = 0] = "None";
		UserPremiumType$3[UserPremiumType$3["NitroClassic"] = 1] = "NitroClassic";
		UserPremiumType$3[UserPremiumType$3["Nitro"] = 2] = "Nitro";
		UserPremiumType$3[UserPremiumType$3["NitroBasic"] = 3] = "NitroBasic";
	})(UserPremiumType$2 || (exports.UserPremiumType = UserPremiumType$2 = {}));
	var ConnectionService$2;
	(function(ConnectionService$3) {
		ConnectionService$3["AmazonMusic"] = "amazon-music";
		ConnectionService$3["BattleNet"] = "battlenet";
		ConnectionService$3["Bluesky"] = "bluesky";
		ConnectionService$3["BungieNet"] = "bungie";
		ConnectionService$3["Crunchyroll"] = "crunchyroll";
		ConnectionService$3["Domain"] = "domain";
		ConnectionService$3["eBay"] = "ebay";
		ConnectionService$3["EpicGames"] = "epicgames";
		ConnectionService$3["Facebook"] = "facebook";
		ConnectionService$3["GitHub"] = "github";
		ConnectionService$3["Instagram"] = "instagram";
		ConnectionService$3["LeagueOfLegends"] = "leagueoflegends";
		ConnectionService$3["Mastodon"] = "mastodon";
		ConnectionService$3["PayPal"] = "paypal";
		ConnectionService$3["PlayStationNetwork"] = "playstation";
		ConnectionService$3["Reddit"] = "reddit";
		ConnectionService$3["RiotGames"] = "riotgames";
		ConnectionService$3["Roblox"] = "roblox";
		ConnectionService$3["Spotify"] = "spotify";
		ConnectionService$3["Skype"] = "skype";
		ConnectionService$3["Steam"] = "steam";
		ConnectionService$3["TikTok"] = "tiktok";
		ConnectionService$3["Twitch"] = "twitch";
		ConnectionService$3["X"] = "twitter";
		ConnectionService$3["Twitter"] = "twitter";
		ConnectionService$3["Xbox"] = "xbox";
		ConnectionService$3["YouTube"] = "youtube";
	})(ConnectionService$2 || (exports.ConnectionService = ConnectionService$2 = {}));
	var ConnectionVisibility$2;
	(function(ConnectionVisibility$3) {
		ConnectionVisibility$3[ConnectionVisibility$3["None"] = 0] = "None";
		ConnectionVisibility$3[ConnectionVisibility$3["Everyone"] = 1] = "Everyone";
	})(ConnectionVisibility$2 || (exports.ConnectionVisibility = ConnectionVisibility$2 = {}));
	var NameplatePalette$2;
	(function(NameplatePalette$3) {
		NameplatePalette$3["Berry"] = "berry";
		NameplatePalette$3["BubbleGum"] = "bubble_gum";
		NameplatePalette$3["Clover"] = "clover";
		NameplatePalette$3["Cobalt"] = "cobalt";
		NameplatePalette$3["Crimson"] = "crimson";
		NameplatePalette$3["Forest"] = "forest";
		NameplatePalette$3["Lemon"] = "lemon";
		NameplatePalette$3["Sky"] = "sky";
		NameplatePalette$3["Teal"] = "teal";
		NameplatePalette$3["Violet"] = "violet";
		NameplatePalette$3["White"] = "white";
	})(NameplatePalette$2 || (exports.NameplatePalette = NameplatePalette$2 = {}));
}));
var require_webhook = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ApplicationWebhookType$2;
	(function(ApplicationWebhookType$3) {
		ApplicationWebhookType$3[ApplicationWebhookType$3["Ping"] = 0] = "Ping";
		ApplicationWebhookType$3[ApplicationWebhookType$3["Event"] = 1] = "Event";
	})(ApplicationWebhookType$2 || (exports.ApplicationWebhookType = ApplicationWebhookType$2 = {}));
	var ApplicationWebhookEventType$2;
	(function(ApplicationWebhookEventType$3) {
		ApplicationWebhookEventType$3["ApplicationAuthorized"] = "APPLICATION_AUTHORIZED";
		ApplicationWebhookEventType$3["ApplicationDeauthorized"] = "APPLICATION_DEAUTHORIZED";
		ApplicationWebhookEventType$3["EntitlementCreate"] = "ENTITLEMENT_CREATE";
		ApplicationWebhookEventType$3["QuestUserEnrollment"] = "QUEST_USER_ENROLLMENT";
	})(ApplicationWebhookEventType$2 || (exports.ApplicationWebhookEventType = ApplicationWebhookEventType$2 = {}));
	var WebhookType$2;
	(function(WebhookType$3) {
		WebhookType$3[WebhookType$3["Incoming"] = 1] = "Incoming";
		WebhookType$3[WebhookType$3["ChannelFollower"] = 2] = "ChannelFollower";
		WebhookType$3[WebhookType$3["Application"] = 3] = "Application";
	})(WebhookType$2 || (exports.WebhookType = WebhookType$2 = {}));
}));
var require_v10$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
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
	var __exportStar$4 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$4(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar$4(require_common$2(), exports);
	__exportStar$4(require_application(), exports);
	__exportStar$4(require_auditLog(), exports);
	__exportStar$4(require_autoModeration(), exports);
	__exportStar$4(require_channel$1(), exports);
	__exportStar$4(require_gateway(), exports);
	__exportStar$4(require_guild(), exports);
	__exportStar$4(require_guildScheduledEvent(), exports);
	__exportStar$4(require_interactions(), exports);
	__exportStar$4(require_invite(), exports);
	__exportStar$4(require_message(), exports);
	__exportStar$4(require_monetization$1(), exports);
	__exportStar$4(require_oauth2(), exports);
	__exportStar$4(require_permissions(), exports);
	__exportStar$4(require_poll(), exports);
	__exportStar$4(require_stageInstance(), exports);
	__exportStar$4(require_sticker(), exports);
	__exportStar$4(require_teams(), exports);
	__exportStar$4(require_user(), exports);
	__exportStar$4(require_webhook(), exports);
}));
var v10_exports$3 = {};
__export$4(v10_exports$3, {
	APIApplicationCommandPermissionsConstant: () => APIApplicationCommandPermissionsConstant$1,
	ActivityFlags: () => ActivityFlags$1,
	ActivityPlatform: () => ActivityPlatform$1,
	ActivityType: () => ActivityType$1,
	AllowedMentionsTypes: () => AllowedMentionsTypes$1,
	ApplicationCommandOptionType: () => ApplicationCommandOptionType$1,
	ApplicationCommandPermissionType: () => ApplicationCommandPermissionType$1,
	ApplicationCommandType: () => ApplicationCommandType$1,
	ApplicationFlags: () => ApplicationFlags$1,
	ApplicationIntegrationType: () => ApplicationIntegrationType$1,
	ApplicationRoleConnectionMetadataType: () => ApplicationRoleConnectionMetadataType$1,
	ApplicationWebhookEventStatus: () => ApplicationWebhookEventStatus$1,
	ApplicationWebhookEventType: () => ApplicationWebhookEventType$1,
	ApplicationWebhookType: () => ApplicationWebhookType$1,
	AttachmentFlags: () => AttachmentFlags$1,
	AuditLogEvent: () => AuditLogEvent$1,
	AuditLogOptionsType: () => AuditLogOptionsType$1,
	AutoModerationActionType: () => AutoModerationActionType$1,
	AutoModerationRuleEventType: () => AutoModerationRuleEventType$1,
	AutoModerationRuleKeywordPresetType: () => AutoModerationRuleKeywordPresetType$1,
	AutoModerationRuleTriggerType: () => AutoModerationRuleTriggerType$1,
	ButtonStyle: () => ButtonStyle$1,
	ChannelFlags: () => ChannelFlags$1,
	ChannelType: () => ChannelType$1,
	ComponentType: () => ComponentType$1,
	ConnectionService: () => ConnectionService$1,
	ConnectionVisibility: () => ConnectionVisibility$1,
	EmbedType: () => EmbedType$1,
	EntitlementType: () => EntitlementType$1,
	EntryPointCommandHandlerType: () => EntryPointCommandHandlerType$1,
	ForumLayoutType: () => ForumLayoutType$1,
	GuildDefaultMessageNotifications: () => GuildDefaultMessageNotifications$1,
	GuildExplicitContentFilter: () => GuildExplicitContentFilter$1,
	GuildFeature: () => GuildFeature$1,
	GuildHubType: () => GuildHubType$1,
	GuildMFALevel: () => GuildMFALevel$1,
	GuildMemberFlags: () => GuildMemberFlags$1,
	GuildNSFWLevel: () => GuildNSFWLevel$1,
	GuildOnboardingMode: () => GuildOnboardingMode$1,
	GuildOnboardingPromptType: () => GuildOnboardingPromptType$1,
	GuildPremiumTier: () => GuildPremiumTier$1,
	GuildScheduledEventEntityType: () => GuildScheduledEventEntityType$1,
	GuildScheduledEventPrivacyLevel: () => GuildScheduledEventPrivacyLevel$1,
	GuildScheduledEventRecurrenceRuleFrequency: () => GuildScheduledEventRecurrenceRuleFrequency$1,
	GuildScheduledEventRecurrenceRuleMonth: () => GuildScheduledEventRecurrenceRuleMonth$1,
	GuildScheduledEventRecurrenceRuleWeekday: () => GuildScheduledEventRecurrenceRuleWeekday$1,
	GuildScheduledEventStatus: () => GuildScheduledEventStatus$1,
	GuildSystemChannelFlags: () => GuildSystemChannelFlags$1,
	GuildVerificationLevel: () => GuildVerificationLevel$1,
	GuildWidgetStyle: () => GuildWidgetStyle$1,
	IntegrationExpireBehavior: () => IntegrationExpireBehavior$1,
	InteractionContextType: () => InteractionContextType$1,
	InteractionResponseType: () => InteractionResponseType$1,
	InteractionType: () => InteractionType$1,
	InviteFlags: () => InviteFlags$1,
	InviteTargetType: () => InviteTargetType$1,
	InviteType: () => InviteType$1,
	MembershipScreeningFieldType: () => MembershipScreeningFieldType$1,
	MessageActivityType: () => MessageActivityType$1,
	MessageFlags: () => MessageFlags$1,
	MessageReferenceType: () => MessageReferenceType$1,
	MessageType: () => MessageType$1,
	NameplatePalette: () => NameplatePalette$1,
	OAuth2Scopes: () => OAuth2Scopes$1,
	OverwriteType: () => OverwriteType$1,
	PermissionFlagsBits: () => PermissionFlagsBits$1,
	PollLayoutType: () => PollLayoutType$1,
	PresenceUpdateStatus: () => PresenceUpdateStatus$1,
	RoleFlags: () => RoleFlags$1,
	SKUFlags: () => SKUFlags$1,
	SKUType: () => SKUType$1,
	SelectMenuDefaultValueType: () => SelectMenuDefaultValueType$1,
	SeparatorSpacingSize: () => SeparatorSpacingSize$1,
	SortOrderType: () => SortOrderType$1,
	StageInstancePrivacyLevel: () => StageInstancePrivacyLevel$1,
	StatusDisplayType: () => StatusDisplayType$2,
	StickerFormatType: () => StickerFormatType$1,
	StickerType: () => StickerType$1,
	SubscriptionStatus: () => SubscriptionStatus$1,
	TeamMemberMembershipState: () => TeamMemberMembershipState$1,
	TeamMemberRole: () => TeamMemberRole$1,
	TextInputStyle: () => TextInputStyle$1,
	ThreadAutoArchiveDuration: () => ThreadAutoArchiveDuration$1,
	ThreadMemberFlags: () => ThreadMemberFlags$1,
	UnfurledMediaItemLoadingState: () => UnfurledMediaItemLoadingState$1,
	UserFlags: () => UserFlags$1,
	UserPremiumType: () => UserPremiumType$1,
	VideoQualityMode: () => VideoQualityMode$1,
	WebhookType: () => WebhookType$1,
	default: () => v10_default$3
});
var import_v10$5, v10_default$3, APIApplicationCommandPermissionsConstant$1, ActivityFlags$1, ActivityPlatform$1, ActivityType$1, AllowedMentionsTypes$1, ApplicationCommandOptionType$1, ApplicationCommandPermissionType$1, ApplicationCommandType$1, ApplicationFlags$1, ApplicationIntegrationType$1, ApplicationRoleConnectionMetadataType$1, ApplicationWebhookEventStatus$1, ApplicationWebhookEventType$1, ApplicationWebhookType$1, AttachmentFlags$1, AuditLogEvent$1, AuditLogOptionsType$1, AutoModerationActionType$1, AutoModerationRuleEventType$1, AutoModerationRuleKeywordPresetType$1, AutoModerationRuleTriggerType$1, ButtonStyle$1, ChannelFlags$1, ChannelType$1, ComponentType$1, ConnectionService$1, ConnectionVisibility$1, EmbedType$1, EntitlementType$1, EntryPointCommandHandlerType$1, ForumLayoutType$1, GuildDefaultMessageNotifications$1, GuildExplicitContentFilter$1, GuildFeature$1, GuildHubType$1, GuildMFALevel$1, GuildMemberFlags$1, GuildNSFWLevel$1, GuildOnboardingMode$1, GuildOnboardingPromptType$1, GuildPremiumTier$1, GuildScheduledEventEntityType$1, GuildScheduledEventPrivacyLevel$1, GuildScheduledEventRecurrenceRuleFrequency$1, GuildScheduledEventRecurrenceRuleMonth$1, GuildScheduledEventRecurrenceRuleWeekday$1, GuildScheduledEventStatus$1, GuildSystemChannelFlags$1, GuildVerificationLevel$1, GuildWidgetStyle$1, IntegrationExpireBehavior$1, InteractionContextType$1, InteractionResponseType$1, InteractionType$1, InviteFlags$1, InviteTargetType$1, InviteType$1, MembershipScreeningFieldType$1, MessageActivityType$1, MessageFlags$1, MessageReferenceType$1, MessageType$1, NameplatePalette$1, OAuth2Scopes$1, OverwriteType$1, PermissionFlagsBits$1, PollLayoutType$1, PresenceUpdateStatus$1, RoleFlags$1, SKUFlags$1, SKUType$1, SelectMenuDefaultValueType$1, SeparatorSpacingSize$1, SortOrderType$1, StageInstancePrivacyLevel$1, StatusDisplayType$2, StickerFormatType$1, StickerType$1, SubscriptionStatus$1, TeamMemberMembershipState$1, TeamMemberRole$1, TextInputStyle$1, ThreadAutoArchiveDuration$1, ThreadMemberFlags$1, UnfurledMediaItemLoadingState$1, UserFlags$1, UserPremiumType$1, VideoQualityMode$1, WebhookType$1;
var init_v10$3 = __esmMin((() => {
	import_v10$5 = /* @__PURE__ */ __toESM(require_v10$4(), 1);
	v10_default$3 = import_v10$5.default;
	APIApplicationCommandPermissionsConstant$1 = import_v10$5.default.APIApplicationCommandPermissionsConstant;
	ActivityFlags$1 = import_v10$5.default.ActivityFlags;
	ActivityPlatform$1 = import_v10$5.default.ActivityPlatform;
	ActivityType$1 = import_v10$5.default.ActivityType;
	AllowedMentionsTypes$1 = import_v10$5.default.AllowedMentionsTypes;
	ApplicationCommandOptionType$1 = import_v10$5.default.ApplicationCommandOptionType;
	ApplicationCommandPermissionType$1 = import_v10$5.default.ApplicationCommandPermissionType;
	ApplicationCommandType$1 = import_v10$5.default.ApplicationCommandType;
	ApplicationFlags$1 = import_v10$5.default.ApplicationFlags;
	ApplicationIntegrationType$1 = import_v10$5.default.ApplicationIntegrationType;
	ApplicationRoleConnectionMetadataType$1 = import_v10$5.default.ApplicationRoleConnectionMetadataType;
	ApplicationWebhookEventStatus$1 = import_v10$5.default.ApplicationWebhookEventStatus;
	ApplicationWebhookEventType$1 = import_v10$5.default.ApplicationWebhookEventType;
	ApplicationWebhookType$1 = import_v10$5.default.ApplicationWebhookType;
	AttachmentFlags$1 = import_v10$5.default.AttachmentFlags;
	AuditLogEvent$1 = import_v10$5.default.AuditLogEvent;
	AuditLogOptionsType$1 = import_v10$5.default.AuditLogOptionsType;
	AutoModerationActionType$1 = import_v10$5.default.AutoModerationActionType;
	AutoModerationRuleEventType$1 = import_v10$5.default.AutoModerationRuleEventType;
	AutoModerationRuleKeywordPresetType$1 = import_v10$5.default.AutoModerationRuleKeywordPresetType;
	AutoModerationRuleTriggerType$1 = import_v10$5.default.AutoModerationRuleTriggerType;
	ButtonStyle$1 = import_v10$5.default.ButtonStyle;
	ChannelFlags$1 = import_v10$5.default.ChannelFlags;
	ChannelType$1 = import_v10$5.default.ChannelType;
	ComponentType$1 = import_v10$5.default.ComponentType;
	ConnectionService$1 = import_v10$5.default.ConnectionService;
	ConnectionVisibility$1 = import_v10$5.default.ConnectionVisibility;
	EmbedType$1 = import_v10$5.default.EmbedType;
	EntitlementType$1 = import_v10$5.default.EntitlementType;
	EntryPointCommandHandlerType$1 = import_v10$5.default.EntryPointCommandHandlerType;
	ForumLayoutType$1 = import_v10$5.default.ForumLayoutType;
	GuildDefaultMessageNotifications$1 = import_v10$5.default.GuildDefaultMessageNotifications;
	GuildExplicitContentFilter$1 = import_v10$5.default.GuildExplicitContentFilter;
	GuildFeature$1 = import_v10$5.default.GuildFeature;
	GuildHubType$1 = import_v10$5.default.GuildHubType;
	GuildMFALevel$1 = import_v10$5.default.GuildMFALevel;
	GuildMemberFlags$1 = import_v10$5.default.GuildMemberFlags;
	GuildNSFWLevel$1 = import_v10$5.default.GuildNSFWLevel;
	GuildOnboardingMode$1 = import_v10$5.default.GuildOnboardingMode;
	GuildOnboardingPromptType$1 = import_v10$5.default.GuildOnboardingPromptType;
	GuildPremiumTier$1 = import_v10$5.default.GuildPremiumTier;
	GuildScheduledEventEntityType$1 = import_v10$5.default.GuildScheduledEventEntityType;
	GuildScheduledEventPrivacyLevel$1 = import_v10$5.default.GuildScheduledEventPrivacyLevel;
	GuildScheduledEventRecurrenceRuleFrequency$1 = import_v10$5.default.GuildScheduledEventRecurrenceRuleFrequency;
	GuildScheduledEventRecurrenceRuleMonth$1 = import_v10$5.default.GuildScheduledEventRecurrenceRuleMonth;
	GuildScheduledEventRecurrenceRuleWeekday$1 = import_v10$5.default.GuildScheduledEventRecurrenceRuleWeekday;
	GuildScheduledEventStatus$1 = import_v10$5.default.GuildScheduledEventStatus;
	GuildSystemChannelFlags$1 = import_v10$5.default.GuildSystemChannelFlags;
	GuildVerificationLevel$1 = import_v10$5.default.GuildVerificationLevel;
	GuildWidgetStyle$1 = import_v10$5.default.GuildWidgetStyle;
	IntegrationExpireBehavior$1 = import_v10$5.default.IntegrationExpireBehavior;
	InteractionContextType$1 = import_v10$5.default.InteractionContextType;
	InteractionResponseType$1 = import_v10$5.default.InteractionResponseType;
	InteractionType$1 = import_v10$5.default.InteractionType;
	InviteFlags$1 = import_v10$5.default.InviteFlags;
	InviteTargetType$1 = import_v10$5.default.InviteTargetType;
	InviteType$1 = import_v10$5.default.InviteType;
	MembershipScreeningFieldType$1 = import_v10$5.default.MembershipScreeningFieldType;
	MessageActivityType$1 = import_v10$5.default.MessageActivityType;
	MessageFlags$1 = import_v10$5.default.MessageFlags;
	MessageReferenceType$1 = import_v10$5.default.MessageReferenceType;
	MessageType$1 = import_v10$5.default.MessageType;
	NameplatePalette$1 = import_v10$5.default.NameplatePalette;
	OAuth2Scopes$1 = import_v10$5.default.OAuth2Scopes;
	OverwriteType$1 = import_v10$5.default.OverwriteType;
	PermissionFlagsBits$1 = import_v10$5.default.PermissionFlagsBits;
	PollLayoutType$1 = import_v10$5.default.PollLayoutType;
	PresenceUpdateStatus$1 = import_v10$5.default.PresenceUpdateStatus;
	RoleFlags$1 = import_v10$5.default.RoleFlags;
	SKUFlags$1 = import_v10$5.default.SKUFlags;
	SKUType$1 = import_v10$5.default.SKUType;
	SelectMenuDefaultValueType$1 = import_v10$5.default.SelectMenuDefaultValueType;
	SeparatorSpacingSize$1 = import_v10$5.default.SeparatorSpacingSize;
	SortOrderType$1 = import_v10$5.default.SortOrderType;
	StageInstancePrivacyLevel$1 = import_v10$5.default.StageInstancePrivacyLevel;
	StatusDisplayType$2 = import_v10$5.default.StatusDisplayType;
	StickerFormatType$1 = import_v10$5.default.StickerFormatType;
	StickerType$1 = import_v10$5.default.StickerType;
	SubscriptionStatus$1 = import_v10$5.default.SubscriptionStatus;
	TeamMemberMembershipState$1 = import_v10$5.default.TeamMemberMembershipState;
	TeamMemberRole$1 = import_v10$5.default.TeamMemberRole;
	TextInputStyle$1 = import_v10$5.default.TextInputStyle;
	ThreadAutoArchiveDuration$1 = import_v10$5.default.ThreadAutoArchiveDuration;
	ThreadMemberFlags$1 = import_v10$5.default.ThreadMemberFlags;
	UnfurledMediaItemLoadingState$1 = import_v10$5.default.UnfurledMediaItemLoadingState;
	UserFlags$1 = import_v10$5.default.UserFlags;
	UserPremiumType$1 = import_v10$5.default.UserPremiumType;
	VideoQualityMode$1 = import_v10$5.default.VideoQualityMode;
	WebhookType$1 = import_v10$5.default.WebhookType;
}));
var require_internals = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var pattern = /^[\d%A-Za-z-_]+$/g;
	exports.urlSafeCharacters = { test(input) {
		const result = pattern.test(input);
		pattern.lastIndex = 0;
		return result;
	} };
}));
var require_common$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var RESTJSONErrorCodes$2;
	(function(RESTJSONErrorCodes$3) {
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["GeneralError"] = 0] = "GeneralError";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownAccount"] = 10001] = "UnknownAccount";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownApplication"] = 10002] = "UnknownApplication";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownChannel"] = 10003] = "UnknownChannel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownGuild"] = 10004] = "UnknownGuild";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownIntegration"] = 10005] = "UnknownIntegration";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownInvite"] = 10006] = "UnknownInvite";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownMember"] = 10007] = "UnknownMember";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownMessage"] = 10008] = "UnknownMessage";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownPermissionOverwrite"] = 10009] = "UnknownPermissionOverwrite";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownProvider"] = 10010] = "UnknownProvider";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownRole"] = 10011] = "UnknownRole";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownToken"] = 10012] = "UnknownToken";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownUser"] = 10013] = "UnknownUser";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownEmoji"] = 10014] = "UnknownEmoji";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownWebhook"] = 10015] = "UnknownWebhook";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownWebhookService"] = 10016] = "UnknownWebhookService";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownSession"] = 10020] = "UnknownSession";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownAsset"] = 10021] = "UnknownAsset";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownBan"] = 10026] = "UnknownBan";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownSKU"] = 10027] = "UnknownSKU";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownStoreListing"] = 10028] = "UnknownStoreListing";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownEntitlement"] = 10029] = "UnknownEntitlement";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownBuild"] = 10030] = "UnknownBuild";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownLobby"] = 10031] = "UnknownLobby";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownBranch"] = 10032] = "UnknownBranch";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownStoreDirectoryLayout"] = 10033] = "UnknownStoreDirectoryLayout";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownRedistributable"] = 10036] = "UnknownRedistributable";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownGiftCode"] = 10038] = "UnknownGiftCode";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownStream"] = 10049] = "UnknownStream";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownPremiumServerSubscribeCooldown"] = 10050] = "UnknownPremiumServerSubscribeCooldown";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownGuildTemplate"] = 10057] = "UnknownGuildTemplate";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownDiscoverableServerCategory"] = 10059] = "UnknownDiscoverableServerCategory";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownSticker"] = 10060] = "UnknownSticker";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownStickerPack"] = 10061] = "UnknownStickerPack";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownInteraction"] = 10062] = "UnknownInteraction";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownApplicationCommand"] = 10063] = "UnknownApplicationCommand";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownVoiceState"] = 10065] = "UnknownVoiceState";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownApplicationCommandPermissions"] = 10066] = "UnknownApplicationCommandPermissions";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownStageInstance"] = 10067] = "UnknownStageInstance";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownGuildMemberVerificationForm"] = 10068] = "UnknownGuildMemberVerificationForm";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownGuildWelcomeScreen"] = 10069] = "UnknownGuildWelcomeScreen";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownGuildScheduledEvent"] = 10070] = "UnknownGuildScheduledEvent";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownGuildScheduledEventUser"] = 10071] = "UnknownGuildScheduledEventUser";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownTag"] = 10087] = "UnknownTag";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnknownSound"] = 10097] = "UnknownSound";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["BotsCannotUseThisEndpoint"] = 20001] = "BotsCannotUseThisEndpoint";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OnlyBotsCanUseThisEndpoint"] = 20002] = "OnlyBotsCanUseThisEndpoint";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ExplicitContentCannotBeSentToTheDesiredRecipient"] = 20009] = "ExplicitContentCannotBeSentToTheDesiredRecipient";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["NotAuthorizedToPerformThisActionOnThisApplication"] = 20012] = "NotAuthorizedToPerformThisActionOnThisApplication";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ActionCannotBePerformedDueToSlowmodeRateLimit"] = 20016] = "ActionCannotBePerformedDueToSlowmodeRateLimit";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TheMazeIsntMeantForYou"] = 20017] = "TheMazeIsntMeantForYou";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OnlyTheOwnerOfThisAccountCanPerformThisAction"] = 20018] = "OnlyTheOwnerOfThisAccountCanPerformThisAction";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["AnnouncementEditLimitExceeded"] = 20022] = "AnnouncementEditLimitExceeded";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UnderMinimumAge"] = 20024] = "UnderMinimumAge";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ChannelSendRateLimit"] = 20028] = "ChannelSendRateLimit";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ServerSendRateLimit"] = 20029] = "ServerSendRateLimit";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords"] = 20031] = "StageTopicServerNameServerDescriptionOrChannelNamesContainDisallowedWords";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["GuildPremiumSubscriptionLevelTooLow"] = 20035] = "GuildPremiumSubscriptionLevelTooLow";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfGuildsReached"] = 30001] = "MaximumNumberOfGuildsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfFriendsReached"] = 30002] = "MaximumNumberOfFriendsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfPinsReachedForTheChannel"] = 30003] = "MaximumNumberOfPinsReachedForTheChannel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfRecipientsReached"] = 30004] = "MaximumNumberOfRecipientsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfGuildRolesReached"] = 30005] = "MaximumNumberOfGuildRolesReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfWebhooksReached"] = 30007] = "MaximumNumberOfWebhooksReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfEmojisReached"] = 30008] = "MaximumNumberOfEmojisReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfReactionsReached"] = 30010] = "MaximumNumberOfReactionsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfGroupDMsReached"] = 30011] = "MaximumNumberOfGroupDMsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfGuildChannelsReached"] = 30013] = "MaximumNumberOfGuildChannelsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfAttachmentsInAMessageReached"] = 30015] = "MaximumNumberOfAttachmentsInAMessageReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfInvitesReached"] = 30016] = "MaximumNumberOfInvitesReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfAnimatedEmojisReached"] = 30018] = "MaximumNumberOfAnimatedEmojisReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfServerMembersReached"] = 30019] = "MaximumNumberOfServerMembersReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfServerCategoriesReached"] = 30030] = "MaximumNumberOfServerCategoriesReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["GuildAlreadyHasTemplate"] = 30031] = "GuildAlreadyHasTemplate";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfApplicationCommandsReached"] = 30032] = "MaximumNumberOfApplicationCommandsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumThreadParticipantsReached"] = 30033] = "MaximumThreadParticipantsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumDailyApplicationCommandCreatesReached"] = 30034] = "MaximumDailyApplicationCommandCreatesReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfNonGuildMemberBansHasBeenExceeded"] = 30035] = "MaximumNumberOfNonGuildMemberBansHasBeenExceeded";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfBanFetchesHasBeenReached"] = 30037] = "MaximumNumberOfBanFetchesHasBeenReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfUncompletedGuildScheduledEventsReached"] = 30038] = "MaximumNumberOfUncompletedGuildScheduledEventsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfStickersReached"] = 30039] = "MaximumNumberOfStickersReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfPruneRequestsHasBeenReached"] = 30040] = "MaximumNumberOfPruneRequestsHasBeenReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached"] = 30042] = "MaximumNumberOfGuildWidgetSettingsUpdatesHasBeenReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfSoundboardSoundsReached"] = 30045] = "MaximumNumberOfSoundboardSoundsReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfEditsToMessagesOlderThanOneHourReached"] = 30046] = "MaximumNumberOfEditsToMessagesOlderThanOneHourReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfPinnedThreadsInForumHasBeenReached"] = 30047] = "MaximumNumberOfPinnedThreadsInForumHasBeenReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfTagsInForumHasBeenReached"] = 30048] = "MaximumNumberOfTagsInForumHasBeenReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["BitrateIsTooHighForChannelOfThisType"] = 30052] = "BitrateIsTooHighForChannelOfThisType";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfPremiumEmojisReached"] = 30056] = "MaximumNumberOfPremiumEmojisReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfWebhooksPerGuildReached"] = 30058] = "MaximumNumberOfWebhooksPerGuildReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumNumberOfChannelPermissionOverwritesReached"] = 30060] = "MaximumNumberOfChannelPermissionOverwritesReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TheChannelsForThisGuildAreTooLarge"] = 30061] = "TheChannelsForThisGuildAreTooLarge";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["Unauthorized"] = 40001] = "Unauthorized";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["VerifyYourAccount"] = 40002] = "VerifyYourAccount";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OpeningDirectMessagesTooFast"] = 40003] = "OpeningDirectMessagesTooFast";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["SendMessagesHasBeenTemporarilyDisabled"] = 40004] = "SendMessagesHasBeenTemporarilyDisabled";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["RequestEntityTooLarge"] = 40005] = "RequestEntityTooLarge";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["FeatureTemporarilyDisabledServerSide"] = 40006] = "FeatureTemporarilyDisabledServerSide";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UserBannedFromThisGuild"] = 40007] = "UserBannedFromThisGuild";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ConnectionHasBeenRevoked"] = 40012] = "ConnectionHasBeenRevoked";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OnlyConsumableSKUsCanBeConsumed"] = 40018] = "OnlyConsumableSKUsCanBeConsumed";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["YouCanOnlyDeleteSandboxEntitlements"] = 40019] = "YouCanOnlyDeleteSandboxEntitlements";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TargetUserIsNotConnectedToVoice"] = 40032] = "TargetUserIsNotConnectedToVoice";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ThisMessageWasAlreadyCrossposted"] = 40033] = "ThisMessageWasAlreadyCrossposted";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ApplicationCommandWithThatNameAlreadyExists"] = 40041] = "ApplicationCommandWithThatNameAlreadyExists";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ApplicationInteractionFailedToSend"] = 40043] = "ApplicationInteractionFailedToSend";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotSendAMessageInAForumChannel"] = 40058] = "CannotSendAMessageInAForumChannel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InteractionHasAlreadyBeenAcknowledged"] = 40060] = "InteractionHasAlreadyBeenAcknowledged";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TagNamesMustBeUnique"] = 40061] = "TagNamesMustBeUnique";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ServiceResourceIsBeingRateLimited"] = 40062] = "ServiceResourceIsBeingRateLimited";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ThereAreNoTagsAvailableThatCanBeSetByNonModerators"] = 40066] = "ThereAreNoTagsAvailableThatCanBeSetByNonModerators";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TagRequiredToCreateAForumPostInThisChannel"] = 40067] = "TagRequiredToCreateAForumPostInThisChannel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["AnEntitlementHasAlreadyBeenGrantedForThisResource"] = 40074] = "AnEntitlementHasAlreadyBeenGrantedForThisResource";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages"] = 40094] = "ThisInteractionHasHitTheMaximumNumberOfFollowUpMessages";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CloudflareIsBlockingYourRequest"] = 40333] = "CloudflareIsBlockingYourRequest";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MissingAccess"] = 50001] = "MissingAccess";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidAccountType"] = 50002] = "InvalidAccountType";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotExecuteActionOnDMChannel"] = 50003] = "CannotExecuteActionOnDMChannel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["GuildWidgetDisabled"] = 50004] = "GuildWidgetDisabled";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotEditMessageAuthoredByAnotherUser"] = 50005] = "CannotEditMessageAuthoredByAnotherUser";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotSendAnEmptyMessage"] = 50006] = "CannotSendAnEmptyMessage";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotSendMessagesToThisUser"] = 50007] = "CannotSendMessagesToThisUser";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotSendMessagesInNonTextChannel"] = 50008] = "CannotSendMessagesInNonTextChannel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ChannelVerificationLevelTooHighForYouToGainAccess"] = 50009] = "ChannelVerificationLevelTooHighForYouToGainAccess";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OAuth2ApplicationDoesNotHaveBot"] = 50010] = "OAuth2ApplicationDoesNotHaveBot";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OAuth2ApplicationLimitReached"] = 50011] = "OAuth2ApplicationLimitReached";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidOAuth2State"] = 50012] = "InvalidOAuth2State";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MissingPermissions"] = 50013] = "MissingPermissions";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidToken"] = 50014] = "InvalidToken";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["NoteWasTooLong"] = 50015] = "NoteWasTooLong";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ProvidedTooFewOrTooManyMessagesToDelete"] = 50016] = "ProvidedTooFewOrTooManyMessagesToDelete";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidMFALevel"] = 50017] = "InvalidMFALevel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MessageCanOnlyBePinnedInTheChannelItWasSentIn"] = 50019] = "MessageCanOnlyBePinnedInTheChannelItWasSentIn";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InviteCodeInvalidOrTaken"] = 50020] = "InviteCodeInvalidOrTaken";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotExecuteActionOnSystemMessage"] = 50021] = "CannotExecuteActionOnSystemMessage";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotExecuteActionOnThisChannelType"] = 50024] = "CannotExecuteActionOnThisChannelType";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidOAuth2AccessToken"] = 50025] = "InvalidOAuth2AccessToken";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MissingRequiredOAuth2Scope"] = 50026] = "MissingRequiredOAuth2Scope";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidWebhookToken"] = 50027] = "InvalidWebhookToken";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidRole"] = 50028] = "InvalidRole";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidRecipients"] = 50033] = "InvalidRecipients";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OneOfTheMessagesProvidedWasTooOldForBulkDelete"] = 50034] = "OneOfTheMessagesProvidedWasTooOldForBulkDelete";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidFormBodyOrContentType"] = 50035] = "InvalidFormBodyOrContentType";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InviteAcceptedToGuildWithoutTheBotBeingIn"] = 50036] = "InviteAcceptedToGuildWithoutTheBotBeingIn";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidActivityAction"] = 50039] = "InvalidActivityAction";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidAPIVersion"] = 50041] = "InvalidAPIVersion";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["FileUploadedExceedsMaximumSize"] = 50045] = "FileUploadedExceedsMaximumSize";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidFileUploaded"] = 50046] = "InvalidFileUploaded";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotSelfRedeemThisGift"] = 50054] = "CannotSelfRedeemThisGift";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidGuild"] = 50055] = "InvalidGuild";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidSKU"] = 50057] = "InvalidSKU";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidRequestOrigin"] = 50067] = "InvalidRequestOrigin";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidMessageType"] = 50068] = "InvalidMessageType";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["PaymentSourceRequiredToRedeemGift"] = 50070] = "PaymentSourceRequiredToRedeemGift";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotModifyASystemWebhook"] = 50073] = "CannotModifyASystemWebhook";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotDeleteChannelRequiredForCommunityGuilds"] = 50074] = "CannotDeleteChannelRequiredForCommunityGuilds";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotEditStickersWithinMessage"] = 50080] = "CannotEditStickersWithinMessage";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidStickerSent"] = 50081] = "InvalidStickerSent";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidActionOnArchivedThread"] = 50083] = "InvalidActionOnArchivedThread";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidThreadNotificationSettings"] = 50084] = "InvalidThreadNotificationSettings";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ParameterEarlierThanCreation"] = 50085] = "ParameterEarlierThanCreation";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CommunityServerChannelsMustBeTextChannels"] = 50086] = "CommunityServerChannelsMustBeTextChannels";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor"] = 50091] = "TheEntityTypeOfTheEventIsDifferentFromTheEntityYouAreTryingToStartTheEventFor";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ServerNotAvailableInYourLocation"] = 50095] = "ServerNotAvailableInYourLocation";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ServerNeedsMonetizationEnabledToPerformThisAction"] = 50097] = "ServerNeedsMonetizationEnabledToPerformThisAction";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ServerNeedsMoreBoostsToPerformThisAction"] = 50101] = "ServerNeedsMoreBoostsToPerformThisAction";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["RequestBodyContainsInvalidJSON"] = 50109] = "RequestBodyContainsInvalidJSON";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ProvidedFileIsInvalid"] = 50110] = "ProvidedFileIsInvalid";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ProvidedFileTypeIsInvalid"] = 50123] = "ProvidedFileTypeIsInvalid";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ProvidedFileDurationExceedsMaximumLength"] = 50124] = "ProvidedFileDurationExceedsMaximumLength";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OwnerCannotBePendingMember"] = 50131] = "OwnerCannotBePendingMember";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["OwnershipCannotBeMovedToABotUser"] = 50132] = "OwnershipCannotBeMovedToABotUser";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["FailedToResizeAssetBelowTheMinimumSize"] = 50138] = "FailedToResizeAssetBelowTheMinimumSize";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji"] = 50144] = "CannotMixSubscriptionAndNonSubscriptionRolesForAnEmoji";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotConvertBetweenPremiumEmojiAndNormalEmoji"] = 50145] = "CannotConvertBetweenPremiumEmojiAndNormalEmoji";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UploadedFileNotFound"] = 50146] = "UploadedFileNotFound";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["SpecifiedEmojiIsInvalid"] = 50151] = "SpecifiedEmojiIsInvalid";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["VoiceMessagesDoNotSupportAdditionalContent"] = 50159] = "VoiceMessagesDoNotSupportAdditionalContent";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["VoiceMessagesMustHaveASingleAudioAttachment"] = 50160] = "VoiceMessagesMustHaveASingleAudioAttachment";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["VoiceMessagesMustHaveSupportingMetadata"] = 50161] = "VoiceMessagesMustHaveSupportingMetadata";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["VoiceMessagesCannotBeEdited"] = 50162] = "VoiceMessagesCannotBeEdited";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotDeleteGuildSubscriptionIntegration"] = 50163] = "CannotDeleteGuildSubscriptionIntegration";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["YouCannotSendVoiceMessagesInThisChannel"] = 50173] = "YouCannotSendVoiceMessagesInThisChannel";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TheUserAccountMustFirstBeVerified"] = 50178] = "TheUserAccountMustFirstBeVerified";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ProvidedFileDoesNotHaveAValidDuration"] = 50192] = "ProvidedFileDoesNotHaveAValidDuration";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["YouDoNotHavePermissionToSendThisSticker"] = 50600] = "YouDoNotHavePermissionToSendThisSticker";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TwoFactorAuthenticationIsRequired"] = 60003] = "TwoFactorAuthenticationIsRequired";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["NoUsersWithDiscordTagExist"] = 80004] = "NoUsersWithDiscordTagExist";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ReactionWasBlocked"] = 90001] = "ReactionWasBlocked";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UserCannotUseBurstReactions"] = 90002] = "UserCannotUseBurstReactions";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ApplicationNotYetAvailable"] = 110001] = "ApplicationNotYetAvailable";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["APIResourceOverloaded"] = 13e4] = "APIResourceOverloaded";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TheStageIsAlreadyOpen"] = 150006] = "TheStageIsAlreadyOpen";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotReplyWithoutPermissionToReadMessageHistory"] = 160002] = "CannotReplyWithoutPermissionToReadMessageHistory";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ThreadAlreadyCreatedForMessage"] = 160004] = "ThreadAlreadyCreatedForMessage";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["ThreadLocked"] = 160005] = "ThreadLocked";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumActiveThreads"] = 160006] = "MaximumActiveThreads";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MaximumActiveAnnouncementThreads"] = 160007] = "MaximumActiveAnnouncementThreads";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidJSONForUploadedLottieFile"] = 170001] = "InvalidJSONForUploadedLottieFile";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["UploadedLottiesCannotContainRasterizedImages"] = 170002] = "UploadedLottiesCannotContainRasterizedImages";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["StickerMaximumFramerateExceeded"] = 170003] = "StickerMaximumFramerateExceeded";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["StickerFrameCountExceedsMaximumOf1000Frames"] = 170004] = "StickerFrameCountExceedsMaximumOf1000Frames";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["LottieAnimationMaximumDimensionsExceeded"] = 170005] = "LottieAnimationMaximumDimensionsExceeded";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["StickerFramerateIsTooSmallOrTooLarge"] = 170006] = "StickerFramerateIsTooSmallOrTooLarge";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["StickerAnimationDurationExceedsMaximumOf5Seconds"] = 170007] = "StickerAnimationDurationExceedsMaximumOf5Seconds";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotUpdateAFinishedEvent"] = 18e4] = "CannotUpdateAFinishedEvent";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["FailedToCreateStageNeededForStageEvent"] = 180002] = "FailedToCreateStageNeededForStageEvent";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MessageWasBlockedByAutomaticModeration"] = 2e5] = "MessageWasBlockedByAutomaticModeration";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["TitleWasBlockedByAutomaticModeration"] = 200001] = "TitleWasBlockedByAutomaticModeration";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId"] = 220001] = "WebhooksPostedToForumChannelsMustHaveAThreadNameOrThreadId";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId"] = 220002] = "WebhooksPostedToForumChannelsCannotHaveBothAThreadNameAndThreadId";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["WebhooksCanOnlyCreateThreadsInForumChannels"] = 220003] = "WebhooksCanOnlyCreateThreadsInForumChannels";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["WebhookServicesCannotBeUsedInForumChannels"] = 220004] = "WebhookServicesCannotBeUsedInForumChannels";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["MessageBlockedByHarmfulLinksFilter"] = 24e4] = "MessageBlockedByHarmfulLinksFilter";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotEnableOnboardingRequirementsAreNotMet"] = 35e4] = "CannotEnableOnboardingRequirementsAreNotMet";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotUpdateOnboardingWhileBelowRequirements"] = 350001] = "CannotUpdateOnboardingWhileBelowRequirements";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["AccessToFileUploadsHasBeenLimitedForThisGuild"] = 400001] = "AccessToFileUploadsHasBeenLimitedForThisGuild";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["FailedToBanUsers"] = 5e5] = "FailedToBanUsers";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["PollVotingBlocked"] = 52e4] = "PollVotingBlocked";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["PollExpired"] = 520001] = "PollExpired";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["InvalidChannelTypeForPollCreation"] = 520002] = "InvalidChannelTypeForPollCreation";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotEditAPollMessage"] = 520003] = "CannotEditAPollMessage";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotUseAnEmojiIncludedWithThePoll"] = 520004] = "CannotUseAnEmojiIncludedWithThePoll";
		RESTJSONErrorCodes$3[RESTJSONErrorCodes$3["CannotExpireANonPollMessage"] = 520006] = "CannotExpireANonPollMessage";
	})(RESTJSONErrorCodes$2 || (exports.RESTJSONErrorCodes = RESTJSONErrorCodes$2 = {}));
	var Locale$2;
	(function(Locale$3) {
		Locale$3["Indonesian"] = "id";
		Locale$3["EnglishUS"] = "en-US";
		Locale$3["EnglishGB"] = "en-GB";
		Locale$3["Bulgarian"] = "bg";
		Locale$3["ChineseCN"] = "zh-CN";
		Locale$3["ChineseTW"] = "zh-TW";
		Locale$3["Croatian"] = "hr";
		Locale$3["Czech"] = "cs";
		Locale$3["Danish"] = "da";
		Locale$3["Dutch"] = "nl";
		Locale$3["Finnish"] = "fi";
		Locale$3["French"] = "fr";
		Locale$3["German"] = "de";
		Locale$3["Greek"] = "el";
		Locale$3["Hindi"] = "hi";
		Locale$3["Hungarian"] = "hu";
		Locale$3["Italian"] = "it";
		Locale$3["Japanese"] = "ja";
		Locale$3["Korean"] = "ko";
		Locale$3["Lithuanian"] = "lt";
		Locale$3["Norwegian"] = "no";
		Locale$3["Polish"] = "pl";
		Locale$3["PortugueseBR"] = "pt-BR";
		Locale$3["Romanian"] = "ro";
		Locale$3["Russian"] = "ru";
		Locale$3["SpanishES"] = "es-ES";
		Locale$3["SpanishLATAM"] = "es-419";
		Locale$3["Swedish"] = "sv-SE";
		Locale$3["Thai"] = "th";
		Locale$3["Turkish"] = "tr";
		Locale$3["Ukrainian"] = "uk";
		Locale$3["Vietnamese"] = "vi";
	})(Locale$2 || (exports.Locale = Locale$2 = {}));
}));
var require_channel = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var ReactionType$2;
	(function(ReactionType$3) {
		ReactionType$3[ReactionType$3["Normal"] = 0] = "Normal";
		ReactionType$3[ReactionType$3["Super"] = 1] = "Super";
	})(ReactionType$2 || (exports.ReactionType = ReactionType$2 = {}));
}));
var require_monetization = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var EntitlementOwnerType$2;
	(function(EntitlementOwnerType$3) {
		EntitlementOwnerType$3[EntitlementOwnerType$3["Guild"] = 1] = "Guild";
		EntitlementOwnerType$3[EntitlementOwnerType$3["User"] = 2] = "User";
	})(EntitlementOwnerType$2 || (exports.EntitlementOwnerType = EntitlementOwnerType$2 = {}));
}));
var require_v10$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
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
	var __exportStar$3 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$3(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.OAuth2Routes = exports.RouteBases = exports.CDNRoutes = exports.ImageFormat = exports.StickerPackApplicationId = exports.Routes = exports.APIVersion = void 0;
	var internals_1 = require_internals();
	__exportStar$3(require_common$1(), exports);
	__exportStar$3(require_channel(), exports);
	__exportStar$3(require_monetization(), exports);
	exports.APIVersion = "10";
	exports.Routes = {
		applicationRoleConnectionMetadata(applicationId) {
			return `/applications/${applicationId}/role-connections/metadata`;
		},
		guildAutoModerationRules(guildId) {
			return `/guilds/${guildId}/auto-moderation/rules`;
		},
		guildAutoModerationRule(guildId, ruleId) {
			return `/guilds/${guildId}/auto-moderation/rules/${ruleId}`;
		},
		guildAuditLog(guildId) {
			return `/guilds/${guildId}/audit-logs`;
		},
		channel(channelId) {
			return `/channels/${channelId}`;
		},
		channelMessages(channelId) {
			return `/channels/${channelId}/messages`;
		},
		channelMessage(channelId, messageId) {
			return `/channels/${channelId}/messages/${messageId}`;
		},
		channelMessageCrosspost(channelId, messageId) {
			return `/channels/${channelId}/messages/${messageId}/crosspost`;
		},
		channelMessageOwnReaction(channelId, messageId, emoji) {
			return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`;
		},
		channelMessageUserReaction(channelId, messageId, emoji, userId) {
			return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}`;
		},
		channelMessageReaction(channelId, messageId, emoji) {
			return `/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;
		},
		channelMessageAllReactions(channelId, messageId) {
			return `/channels/${channelId}/messages/${messageId}/reactions`;
		},
		channelBulkDelete(channelId) {
			return `/channels/${channelId}/messages/bulk-delete`;
		},
		channelPermission(channelId, overwriteId) {
			return `/channels/${channelId}/permissions/${overwriteId}`;
		},
		channelInvites(channelId) {
			return `/channels/${channelId}/invites`;
		},
		channelFollowers(channelId) {
			return `/channels/${channelId}/followers`;
		},
		channelTyping(channelId) {
			return `/channels/${channelId}/typing`;
		},
		channelMessagesPins(channelId) {
			return `/channels/${channelId}/messages/pins`;
		},
		channelMessagesPin(channelId, messageId) {
			return `/channels/${channelId}/messages/pins/${messageId}`;
		},
		channelPins(channelId) {
			return `/channels/${channelId}/pins`;
		},
		channelPin(channelId, messageId) {
			return `/channels/${channelId}/pins/${messageId}`;
		},
		channelRecipient(channelId, userId) {
			return `/channels/${channelId}/recipients/${userId}`;
		},
		guildEmojis(guildId) {
			return `/guilds/${guildId}/emojis`;
		},
		guildEmoji(guildId, emojiId) {
			return `/guilds/${guildId}/emojis/${emojiId}`;
		},
		guilds() {
			return "/guilds";
		},
		guild(guildId) {
			return `/guilds/${guildId}`;
		},
		guildPreview(guildId) {
			return `/guilds/${guildId}/preview`;
		},
		guildChannels(guildId) {
			return `/guilds/${guildId}/channels`;
		},
		guildMember(guildId, userId = "@me") {
			return `/guilds/${guildId}/members/${userId}`;
		},
		guildMembers(guildId) {
			return `/guilds/${guildId}/members`;
		},
		guildMembersSearch(guildId) {
			return `/guilds/${guildId}/members/search`;
		},
		guildCurrentMemberNickname(guildId) {
			return `/guilds/${guildId}/members/@me/nick`;
		},
		guildMemberRole(guildId, memberId, roleId) {
			return `/guilds/${guildId}/members/${memberId}/roles/${roleId}`;
		},
		guildMFA(guildId) {
			return `/guilds/${guildId}/mfa`;
		},
		guildBans(guildId) {
			return `/guilds/${guildId}/bans`;
		},
		guildBan(guildId, userId) {
			return `/guilds/${guildId}/bans/${userId}`;
		},
		guildRoles(guildId) {
			return `/guilds/${guildId}/roles`;
		},
		guildRole(guildId, roleId) {
			return `/guilds/${guildId}/roles/${roleId}`;
		},
		guildPrune(guildId) {
			return `/guilds/${guildId}/prune`;
		},
		guildVoiceRegions(guildId) {
			return `/guilds/${guildId}/regions`;
		},
		guildInvites(guildId) {
			return `/guilds/${guildId}/invites`;
		},
		guildIntegrations(guildId) {
			return `/guilds/${guildId}/integrations`;
		},
		guildIntegration(guildId, integrationId) {
			return `/guilds/${guildId}/integrations/${integrationId}`;
		},
		guildWidgetSettings(guildId) {
			return `/guilds/${guildId}/widget`;
		},
		guildWidgetJSON(guildId) {
			return `/guilds/${guildId}/widget.json`;
		},
		guildVanityUrl(guildId) {
			return `/guilds/${guildId}/vanity-url`;
		},
		guildWidgetImage(guildId) {
			return `/guilds/${guildId}/widget.png`;
		},
		invite(code) {
			return `/invites/${code}`;
		},
		template(code) {
			return `/guilds/templates/${code}`;
		},
		guildTemplates(guildId) {
			return `/guilds/${guildId}/templates`;
		},
		guildTemplate(guildId, code) {
			return `/guilds/${guildId}/templates/${code}`;
		},
		pollAnswerVoters(channelId, messageId, answerId) {
			return `/channels/${channelId}/polls/${messageId}/answers/${answerId}`;
		},
		expirePoll(channelId, messageId) {
			return `/channels/${channelId}/polls/${messageId}/expire`;
		},
		threads(parentId, messageId) {
			const parts = [
				"",
				"channels",
				parentId
			];
			if (messageId) parts.push("messages", messageId);
			parts.push("threads");
			return parts.join("/");
		},
		guildActiveThreads(guildId) {
			return `/guilds/${guildId}/threads/active`;
		},
		channelThreads(channelId, archivedStatus) {
			return `/channels/${channelId}/threads/archived/${archivedStatus}`;
		},
		channelJoinedArchivedThreads(channelId) {
			return `/channels/${channelId}/users/@me/threads/archived/private`;
		},
		threadMembers(threadId, userId) {
			const parts = [
				"",
				"channels",
				threadId,
				"thread-members"
			];
			if (userId) parts.push(userId);
			return parts.join("/");
		},
		user(userId = "@me") {
			return `/users/${userId}`;
		},
		userApplicationRoleConnection(applicationId) {
			return `/users/@me/applications/${applicationId}/role-connection`;
		},
		userGuilds() {
			return `/users/@me/guilds`;
		},
		userGuildMember(guildId) {
			return `/users/@me/guilds/${guildId}/member`;
		},
		userGuild(guildId) {
			return `/users/@me/guilds/${guildId}`;
		},
		userChannels() {
			return `/users/@me/channels`;
		},
		userConnections() {
			return `/users/@me/connections`;
		},
		voiceRegions() {
			return `/voice/regions`;
		},
		channelWebhooks(channelId) {
			return `/channels/${channelId}/webhooks`;
		},
		guildWebhooks(guildId) {
			return `/guilds/${guildId}/webhooks`;
		},
		webhook(webhookId, webhookToken) {
			const parts = [
				"",
				"webhooks",
				webhookId
			];
			if (webhookToken) parts.push(webhookToken);
			return parts.join("/");
		},
		webhookMessage(webhookId, webhookToken, messageId = "@original") {
			return `/webhooks/${webhookId}/${webhookToken}/messages/${messageId}`;
		},
		webhookPlatform(webhookId, webhookToken, platform) {
			return `/webhooks/${webhookId}/${webhookToken}/${platform}`;
		},
		gateway() {
			return `/gateway`;
		},
		gatewayBot() {
			return `/gateway/bot`;
		},
		oauth2CurrentApplication() {
			return `/oauth2/applications/@me`;
		},
		oauth2CurrentAuthorization() {
			return `/oauth2/@me`;
		},
		oauth2Authorization() {
			return `/oauth2/authorize`;
		},
		oauth2TokenExchange() {
			return `/oauth2/token`;
		},
		oauth2TokenRevocation() {
			return `/oauth2/token/revoke`;
		},
		applicationCommands(applicationId) {
			return `/applications/${applicationId}/commands`;
		},
		applicationCommand(applicationId, commandId) {
			return `/applications/${applicationId}/commands/${commandId}`;
		},
		applicationGuildCommands(applicationId, guildId) {
			return `/applications/${applicationId}/guilds/${guildId}/commands`;
		},
		applicationGuildCommand(applicationId, guildId, commandId) {
			return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`;
		},
		interactionCallback(interactionId, interactionToken) {
			return `/interactions/${interactionId}/${interactionToken}/callback`;
		},
		guildMemberVerification(guildId) {
			return `/guilds/${guildId}/member-verification`;
		},
		guildVoiceState(guildId, userId = "@me") {
			return `/guilds/${guildId}/voice-states/${userId}`;
		},
		guildApplicationCommandsPermissions(applicationId, guildId) {
			return `/applications/${applicationId}/guilds/${guildId}/commands/permissions`;
		},
		applicationCommandPermissions(applicationId, guildId, commandId) {
			return `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions`;
		},
		guildWelcomeScreen(guildId) {
			return `/guilds/${guildId}/welcome-screen`;
		},
		stageInstances() {
			return `/stage-instances`;
		},
		stageInstance(channelId) {
			return `/stage-instances/${channelId}`;
		},
		sticker(stickerId) {
			return `/stickers/${stickerId}`;
		},
		stickerPacks() {
			return "/sticker-packs";
		},
		stickerPack(packId) {
			return `/sticker-packs/${packId}`;
		},
		nitroStickerPacks() {
			return "/sticker-packs";
		},
		guildStickers(guildId) {
			return `/guilds/${guildId}/stickers`;
		},
		guildSticker(guildId, stickerId) {
			return `/guilds/${guildId}/stickers/${stickerId}`;
		},
		guildScheduledEvents(guildId) {
			return `/guilds/${guildId}/scheduled-events`;
		},
		guildScheduledEvent(guildId, guildScheduledEventId) {
			return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}`;
		},
		guildScheduledEventUsers(guildId, guildScheduledEventId) {
			return `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users`;
		},
		guildOnboarding(guildId) {
			return `/guilds/${guildId}/onboarding`;
		},
		guildIncidentActions(guildId) {
			return `/guilds/${guildId}/incident-actions`;
		},
		currentApplication() {
			return "/applications/@me";
		},
		entitlements(applicationId) {
			return `/applications/${applicationId}/entitlements`;
		},
		entitlement(applicationId, entitlementId) {
			return `/applications/${applicationId}/entitlements/${entitlementId}`;
		},
		skus(applicationId) {
			return `/applications/${applicationId}/skus`;
		},
		guildBulkBan(guildId) {
			return `/guilds/${guildId}/bulk-ban`;
		},
		consumeEntitlement(applicationId, entitlementId) {
			return `/applications/${applicationId}/entitlements/${entitlementId}/consume`;
		},
		applicationEmojis(applicationId) {
			return `/applications/${applicationId}/emojis`;
		},
		applicationEmoji(applicationId, emojiId) {
			return `/applications/${applicationId}/emojis/${emojiId}`;
		},
		skuSubscriptions(skuId) {
			return `/skus/${skuId}/subscriptions`;
		},
		skuSubscription(skuId, subscriptionId) {
			return `/skus/${skuId}/subscriptions/${subscriptionId}`;
		},
		sendSoundboardSound(channelId) {
			return `/channels/${channelId}/send-soundboard-sound`;
		},
		soundboardDefaultSounds() {
			return "/soundboard-default-sounds";
		},
		guildSoundboardSounds(guildId) {
			return `/guilds/${guildId}/soundboard-sounds`;
		},
		guildSoundboardSound(guildId, soundId) {
			return `/guilds/${guildId}/soundboard-sounds/${soundId}`;
		}
	};
	for (const [key, fn] of Object.entries(exports.Routes)) exports.Routes[key] = (...args) => {
		const escaped = args.map((arg) => {
			if (arg) {
				if (internals_1.urlSafeCharacters.test(String(arg))) return arg;
				return encodeURIComponent(arg);
			}
			return arg;
		});
		return fn.call(null, ...escaped);
	};
	Object.freeze(exports.Routes);
	exports.StickerPackApplicationId = "710982414301790216";
	var ImageFormat$2;
	(function(ImageFormat$3) {
		ImageFormat$3["JPEG"] = "jpeg";
		ImageFormat$3["PNG"] = "png";
		ImageFormat$3["WebP"] = "webp";
		ImageFormat$3["GIF"] = "gif";
		ImageFormat$3["Lottie"] = "json";
	})(ImageFormat$2 || (exports.ImageFormat = ImageFormat$2 = {}));
	exports.CDNRoutes = {
		emoji(emojiId, format) {
			return `/emojis/${emojiId}.${format}`;
		},
		guildIcon(guildId, guildIcon, format) {
			return `/icons/${guildId}/${guildIcon}.${format}`;
		},
		guildSplash(guildId, guildSplash, format) {
			return `/splashes/${guildId}/${guildSplash}.${format}`;
		},
		guildDiscoverySplash(guildId, guildDiscoverySplash, format) {
			return `/discovery-splashes/${guildId}/${guildDiscoverySplash}.${format}`;
		},
		guildBanner(guildId, guildBanner, format) {
			return `/banners/${guildId}/${guildBanner}.${format}`;
		},
		userBanner(userId, userBanner, format) {
			return `/banners/${userId}/${userBanner}.${format}`;
		},
		defaultUserAvatar(index) {
			return `/embed/avatars/${index}.png`;
		},
		userAvatar(userId, userAvatar, format) {
			return `/avatars/${userId}/${userAvatar}.${format}`;
		},
		guildMemberAvatar(guildId, userId, memberAvatar, format) {
			return `/guilds/${guildId}/users/${userId}/avatars/${memberAvatar}.${format}`;
		},
		userAvatarDecoration(userId, userAvatarDecoration) {
			return `/avatar-decorations/${userId}/${userAvatarDecoration}.png`;
		},
		avatarDecoration(avatarDecorationDataAsset) {
			return `/avatar-decoration-presets/${avatarDecorationDataAsset}.png`;
		},
		applicationIcon(applicationId, applicationIcon, format) {
			return `/app-icons/${applicationId}/${applicationIcon}.${format}`;
		},
		applicationCover(applicationId, applicationCoverImage, format) {
			return `/app-icons/${applicationId}/${applicationCoverImage}.${format}`;
		},
		applicationAsset(applicationId, applicationAssetId, format) {
			return `/app-assets/${applicationId}/${applicationAssetId}.${format}`;
		},
		achievementIcon(applicationId, achievementId, achievementIconHash, format) {
			return `/app-assets/${applicationId}/achievements/${achievementId}/icons/${achievementIconHash}.${format}`;
		},
		stickerPackBanner(stickerPackBannerAssetId, format) {
			return `/app-assets/${exports.StickerPackApplicationId}/store/${stickerPackBannerAssetId}.${format}`;
		},
		storePageAsset(applicationId, assetId, format = ImageFormat$2.PNG) {
			return `/app-assets/${applicationId}/store/${assetId}.${format}`;
		},
		teamIcon(teamId, teamIcon, format) {
			return `/team-icons/${teamId}/${teamIcon}.${format}`;
		},
		sticker(stickerId, format) {
			return `/stickers/${stickerId}.${format}`;
		},
		roleIcon(roleId, roleIcon, format) {
			return `/role-icons/${roleId}/${roleIcon}.${format}`;
		},
		guildScheduledEventCover(guildScheduledEventId, guildScheduledEventCoverImage, format) {
			return `/guild-events/${guildScheduledEventId}/${guildScheduledEventCoverImage}.${format}`;
		},
		guildMemberBanner(guildId, userId, guildMemberBanner, format) {
			return `/guilds/${guildId}/users/${userId}/banners/${guildMemberBanner}.${format}`;
		},
		soundboardSound(soundId) {
			return `/soundboard-sounds/${soundId}`;
		},
		guildTagBadge(guildId, guildTagBadge, format) {
			return `/guild-tag-badges/${guildId}/${guildTagBadge}.${format}`;
		}
	};
	for (const [key, fn] of Object.entries(exports.CDNRoutes)) exports.CDNRoutes[key] = (...args) => {
		const escaped = args.map((arg) => {
			if (arg) {
				if (internals_1.urlSafeCharacters.test(String(arg))) return arg;
				return encodeURIComponent(arg);
			}
			return arg;
		});
		return fn.call(null, ...escaped);
	};
	Object.freeze(exports.CDNRoutes);
	exports.RouteBases = {
		api: `https://discord.com/api/v${exports.APIVersion}`,
		cdn: "https://cdn.discordapp.com",
		media: "https://media.discordapp.net",
		invite: "https://discord.gg",
		template: "https://discord.new",
		gift: "https://discord.gift",
		scheduledEvent: "https://discord.com/events"
	};
	Object.freeze(exports.RouteBases);
	exports.OAuth2Routes = {
		authorizationURL: `${exports.RouteBases.api}${exports.Routes.oauth2Authorization()}`,
		tokenURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenExchange()}`,
		tokenRevocationURL: `${exports.RouteBases.api}${exports.Routes.oauth2TokenRevocation()}`
	};
	Object.freeze(exports.OAuth2Routes);
}));
var v10_exports$2 = {};
__export$4(v10_exports$2, {
	APIVersion: () => APIVersion$1,
	CDNRoutes: () => CDNRoutes$1,
	EntitlementOwnerType: () => EntitlementOwnerType$1,
	ImageFormat: () => ImageFormat$1,
	Locale: () => Locale$1,
	OAuth2Routes: () => OAuth2Routes$1,
	RESTJSONErrorCodes: () => RESTJSONErrorCodes$1,
	ReactionType: () => ReactionType$1,
	RouteBases: () => RouteBases$1,
	Routes: () => Routes$1,
	StickerPackApplicationId: () => StickerPackApplicationId$1,
	default: () => v10_default$2
});
var import_v10$4, v10_default$2, APIVersion$1, CDNRoutes$1, EntitlementOwnerType$1, ImageFormat$1, Locale$1, OAuth2Routes$1, RESTJSONErrorCodes$1, ReactionType$1, RouteBases$1, Routes$1, StickerPackApplicationId$1;
var init_v10$2 = __esmMin((() => {
	import_v10$4 = /* @__PURE__ */ __toESM(require_v10$3(), 1);
	v10_default$2 = import_v10$4.default;
	APIVersion$1 = "10";
	CDNRoutes$1 = import_v10$4.CDNRoutes;
	EntitlementOwnerType$1 = import_v10$4.default.EntitlementOwnerType;
	ImageFormat$1 = import_v10$4.ImageFormat;
	Locale$1 = import_v10$4.default.Locale;
	OAuth2Routes$1 = import_v10$4.OAuth2Routes;
	RESTJSONErrorCodes$1 = import_v10$4.default.RESTJSONErrorCodes;
	ReactionType$1 = import_v10$4.default.ReactionType;
	RouteBases$1 = import_v10$4.RouteBases;
	Routes$1 = import_v10$4.Routes;
	StickerPackApplicationId$1 = "710982414301790216";
}));
var require_common = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var RPCDeviceType$2;
	(function(RPCDeviceType$3) {
		RPCDeviceType$3["AudioInput"] = "audioinput";
		RPCDeviceType$3["AudioOutput"] = "audiooutput";
		RPCDeviceType$3["VideoInput"] = "videoinput";
	})(RPCDeviceType$2 || (exports.RPCDeviceType = RPCDeviceType$2 = {}));
	var RPCVoiceSettingsModeType$2;
	(function(RPCVoiceSettingsModeType$3) {
		RPCVoiceSettingsModeType$3["PushToTalk"] = "PUSH_TO_TALK";
		RPCVoiceSettingsModeType$3["VoiceActivity"] = "VOICE_ACTIVITY";
	})(RPCVoiceSettingsModeType$2 || (exports.RPCVoiceSettingsModeType = RPCVoiceSettingsModeType$2 = {}));
	var RPCVoiceShortcutKeyComboKeyType$2;
	(function(RPCVoiceShortcutKeyComboKeyType$3) {
		RPCVoiceShortcutKeyComboKeyType$3[RPCVoiceShortcutKeyComboKeyType$3["KeyboardKey"] = 0] = "KeyboardKey";
		RPCVoiceShortcutKeyComboKeyType$3[RPCVoiceShortcutKeyComboKeyType$3["MouseButton"] = 1] = "MouseButton";
		RPCVoiceShortcutKeyComboKeyType$3[RPCVoiceShortcutKeyComboKeyType$3["KeyboardModifierKey"] = 2] = "KeyboardModifierKey";
		RPCVoiceShortcutKeyComboKeyType$3[RPCVoiceShortcutKeyComboKeyType$3["GamepadButton"] = 3] = "GamepadButton";
	})(RPCVoiceShortcutKeyComboKeyType$2 || (exports.RPCVoiceShortcutKeyComboKeyType = RPCVoiceShortcutKeyComboKeyType$2 = {}));
	var VoiceConnectionStates$2;
	(function(VoiceConnectionStates$3) {
		VoiceConnectionStates$3["Disconnected"] = "DISCONNECTED";
		VoiceConnectionStates$3["AwaitingEndpoint"] = "AWAITING_ENDPOINT";
		VoiceConnectionStates$3["Authenticating"] = "AUTHENTICATING";
		VoiceConnectionStates$3["Connecting"] = "CONNECTING";
		VoiceConnectionStates$3["Connected"] = "CONNECTED";
		VoiceConnectionStates$3["VoiceDisconnected"] = "VOICE_DISCONNECTED";
		VoiceConnectionStates$3["VoiceConnecting"] = "VOICE_CONNECTING";
		VoiceConnectionStates$3["VoiceConnected"] = "VOICE_CONNECTED";
		VoiceConnectionStates$3["NoRoute"] = "NO_ROUTE";
		VoiceConnectionStates$3["IceChecking"] = "ICE_CHECKING";
	})(VoiceConnectionStates$2 || (exports.VoiceConnectionStates = VoiceConnectionStates$2 = {}));
	var RelationshipType$2;
	(function(RelationshipType$3) {
		RelationshipType$3[RelationshipType$3["None"] = 0] = "None";
		RelationshipType$3[RelationshipType$3["Friend"] = 1] = "Friend";
		RelationshipType$3[RelationshipType$3["Blocked"] = 2] = "Blocked";
		RelationshipType$3[RelationshipType$3["PendingIncoming"] = 3] = "PendingIncoming";
		RelationshipType$3[RelationshipType$3["PendingOutgoing"] = 4] = "PendingOutgoing";
		RelationshipType$3[RelationshipType$3["Implicit"] = 5] = "Implicit";
	})(RelationshipType$2 || (exports.RelationshipType = RelationshipType$2 = {}));
	var RPCErrorCodes$2;
	(function(RPCErrorCodes$3) {
		RPCErrorCodes$3[RPCErrorCodes$3["UnknownError"] = 1e3] = "UnknownError";
		RPCErrorCodes$3[RPCErrorCodes$3["ServiceUnavailable"] = 1001] = "ServiceUnavailable";
		RPCErrorCodes$3[RPCErrorCodes$3["TransactionAborted"] = 1002] = "TransactionAborted";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidPayload"] = 4e3] = "InvalidPayload";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidCommand"] = 4002] = "InvalidCommand";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidGuild"] = 4003] = "InvalidGuild";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidEvent"] = 4004] = "InvalidEvent";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidChannel"] = 4005] = "InvalidChannel";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidPermissions"] = 4006] = "InvalidPermissions";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidClientId"] = 4007] = "InvalidClientId";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidOrigin"] = 4008] = "InvalidOrigin";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidToken"] = 4009] = "InvalidToken";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidUser"] = 4010] = "InvalidUser";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidInvite"] = 4011] = "InvalidInvite";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidActivityJoinRequest"] = 4012] = "InvalidActivityJoinRequest";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidEntitlement"] = 4013] = "InvalidEntitlement";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidGiftCode"] = 4014] = "InvalidGiftCode";
		RPCErrorCodes$3[RPCErrorCodes$3["OAuth2Error"] = 5e3] = "OAuth2Error";
		RPCErrorCodes$3[RPCErrorCodes$3["SelectChannelTimedOut"] = 5001] = "SelectChannelTimedOut";
		RPCErrorCodes$3[RPCErrorCodes$3["GetGuildTimedOut"] = 5002] = "GetGuildTimedOut";
		RPCErrorCodes$3[RPCErrorCodes$3["SelectVoiceForceRequired"] = 5003] = "SelectVoiceForceRequired";
		RPCErrorCodes$3[RPCErrorCodes$3["CaptureShortcutAlreadyListening"] = 5004] = "CaptureShortcutAlreadyListening";
		RPCErrorCodes$3[RPCErrorCodes$3["InvalidActivitySecret"] = 5005] = "InvalidActivitySecret";
		RPCErrorCodes$3[RPCErrorCodes$3["NoEligibleActivity"] = 5006] = "NoEligibleActivity";
		RPCErrorCodes$3[RPCErrorCodes$3["PurchaseCanceled"] = 5007] = "PurchaseCanceled";
		RPCErrorCodes$3[RPCErrorCodes$3["PurchaseError"] = 5008] = "PurchaseError";
		RPCErrorCodes$3[RPCErrorCodes$3["UnauthorizedForAchievement"] = 5009] = "UnauthorizedForAchievement";
		RPCErrorCodes$3[RPCErrorCodes$3["RateLimited"] = 5010] = "RateLimited";
	})(RPCErrorCodes$2 || (exports.RPCErrorCodes = RPCErrorCodes$2 = {}));
	var RPCCloseEventCodes$2;
	(function(RPCCloseEventCodes$3) {
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["CloseNormal"] = 1e3] = "CloseNormal";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["CloseUnsupported"] = 1003] = "CloseUnsupported";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["CloseAbnormal"] = 1006] = "CloseAbnormal";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["InvalidClientId"] = 4e3] = "InvalidClientId";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["InvalidOrigin"] = 4001] = "InvalidOrigin";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["RateLimited"] = 4002] = "RateLimited";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["TokenRevoked"] = 4003] = "TokenRevoked";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["InvalidVersion"] = 4004] = "InvalidVersion";
		RPCCloseEventCodes$3[RPCCloseEventCodes$3["InvalidEncoding"] = 4005] = "InvalidEncoding";
	})(RPCCloseEventCodes$2 || (exports.RPCCloseEventCodes = RPCCloseEventCodes$2 = {}));
}));
var require_v10$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
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
	var __exportStar$2 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$2(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.RPCEvents = exports.RPCCommands = exports.RPCVersion = void 0;
	__exportStar$2(require_common(), exports);
	exports.RPCVersion = "1";
	var RPCCommands$2;
	(function(RPCCommands$3) {
		RPCCommands$3["AcceptActivityInvite"] = "ACCEPT_ACTIVITY_INVITE";
		RPCCommands$3["ActivityInviteUser"] = "ACTIVITY_INVITE_USER";
		RPCCommands$3["Authenticate"] = "AUTHENTICATE";
		RPCCommands$3["Authorize"] = "AUTHORIZE";
		RPCCommands$3["BraintreePopupBridgeCallback"] = "BRAINTREE_POPUP_BRIDGE_CALLBACK";
		RPCCommands$3["BrowserHandoff"] = "BROWSER_HANDOFF";
		RPCCommands$3["CloseActivityJoinRequest"] = "CLOSE_ACTIVITY_JOIN_REQUEST";
		RPCCommands$3["ConnectionsCallback"] = "CONNECTIONS_CALLBACK";
		RPCCommands$3["CreateChannelInvite"] = "CREATE_CHANNEL_INVITE";
		RPCCommands$3["DeepLink"] = "DEEP_LINK";
		RPCCommands$3["Dispatch"] = "DISPATCH";
		RPCCommands$3["GetApplicationTicket"] = "GET_APPLICATION_TICKET";
		RPCCommands$3["GetChannel"] = "GET_CHANNEL";
		RPCCommands$3["GetChannels"] = "GET_CHANNELS";
		RPCCommands$3["GetEntitlementTicket"] = "GET_ENTITLEMENT_TICKET";
		RPCCommands$3["GetEntitlements"] = "GET_ENTITLEMENTS";
		RPCCommands$3["GetGuild"] = "GET_GUILD";
		RPCCommands$3["GetGuilds"] = "GET_GUILDS";
		RPCCommands$3["GetImage"] = "GET_IMAGE";
		RPCCommands$3["GetNetworkingConfig"] = "GET_NETWORKING_CONFIG";
		RPCCommands$3["GetRelationships"] = "GET_RELATIONSHIPS";
		RPCCommands$3["GetSelectedVoiceChannel"] = "GET_SELECTED_VOICE_CHANNEL";
		RPCCommands$3["GetSkus"] = "GET_SKUS";
		RPCCommands$3["GetUser"] = "GET_USER";
		RPCCommands$3["GetVoiceSettings"] = "GET_VOICE_SETTINGS";
		RPCCommands$3["GiftCodeBrowser"] = "GIFT_CODE_BROWSER";
		RPCCommands$3["GuildTemplateBrowser"] = "GUILD_TEMPLATE_BROWSER";
		RPCCommands$3["InviteBrowser"] = "INVITE_BROWSER";
		RPCCommands$3["NetworkingCreateToken"] = "NETWORKING_CREATE_TOKEN";
		RPCCommands$3["NetworkingPeerMetrics"] = "NETWORKING_PEER_METRICS";
		RPCCommands$3["NetworkingSystemMetrics"] = "NETWORKING_SYSTEM_METRICS";
		RPCCommands$3["OpenOverlayActivityInvite"] = "OPEN_OVERLAY_ACTIVITY_INVITE";
		RPCCommands$3["OpenOverlayGuildInvite"] = "OPEN_OVERLAY_GUILD_INVITE";
		RPCCommands$3["OpenOverlayVoiceSettings"] = "OPEN_OVERLAY_VOICE_SETTINGS";
		RPCCommands$3["Overlay"] = "OVERLAY";
		RPCCommands$3["SelectTextChannel"] = "SELECT_TEXT_CHANNEL";
		RPCCommands$3["SelectVoiceChannel"] = "SELECT_VOICE_CHANNEL";
		RPCCommands$3["SendActivityJoinInvite"] = "SEND_ACTIVITY_JOIN_INVITE";
		RPCCommands$3["SetActivity"] = "SET_ACTIVITY";
		RPCCommands$3["SetCertifiedDevices"] = "SET_CERTIFIED_DEVICES";
		RPCCommands$3["SetOverlayLocked"] = "SET_OVERLAY_LOCKED";
		RPCCommands$3["SetUserVoiceSettings"] = "SET_USER_VOICE_SETTINGS";
		RPCCommands$3["SetUserVoiceSettings2"] = "SET_USER_VOICE_SETTINGS_2";
		RPCCommands$3["SetVoiceSettings"] = "SET_VOICE_SETTINGS";
		RPCCommands$3["SetVoiceSettings2"] = "SET_VOICE_SETTINGS_2";
		RPCCommands$3["StartPurchase"] = "START_PURCHASE";
		RPCCommands$3["Subscribe"] = "SUBSCRIBE";
		RPCCommands$3["Unsubscribe"] = "UNSUBSCRIBE";
		RPCCommands$3["ValidateApplication"] = "VALIDATE_APPLICATION";
	})(RPCCommands$2 || (exports.RPCCommands = RPCCommands$2 = {}));
	var RPCEvents$2;
	(function(RPCEvents$3) {
		RPCEvents$3["ActivityInvite"] = "ACTIVITY_INVITE";
		RPCEvents$3["ActivityJoin"] = "ACTIVITY_JOIN";
		RPCEvents$3["ActivityJoinRequest"] = "ACTIVITY_JOIN_REQUEST";
		RPCEvents$3["ActivitySpectate"] = "ACTIVITY_SPECTATE";
		RPCEvents$3["ChannelCreate"] = "CHANNEL_CREATE";
		RPCEvents$3["CurrentUserUpdate"] = "CURRENT_USER_UPDATE";
		RPCEvents$3["EntitlementCreate"] = "ENTITLEMENT_CREATE";
		RPCEvents$3["EntitlementDelete"] = "ENTITLEMENT_DELETE";
		RPCEvents$3["Error"] = "ERROR";
		RPCEvents$3["GameJoin"] = "GAME_JOIN";
		RPCEvents$3["GameSpectate"] = "GAME_SPECTATE";
		RPCEvents$3["GuildCreate"] = "GUILD_CREATE";
		RPCEvents$3["GuildStatus"] = "GUILD_STATUS";
		RPCEvents$3["MessageCreate"] = "MESSAGE_CREATE";
		RPCEvents$3["MessageDelete"] = "MESSAGE_DELETE";
		RPCEvents$3["MessageUpdate"] = "MESSAGE_UPDATE";
		RPCEvents$3["NotificationCreate"] = "NOTIFICATION_CREATE";
		RPCEvents$3["Overlay"] = "OVERLAY";
		RPCEvents$3["OverlayUpdate"] = "OVERLAY_UPDATE";
		RPCEvents$3["Ready"] = "READY";
		RPCEvents$3["RelationshipUpdate"] = "RELATIONSHIP_UPDATE";
		RPCEvents$3["SpeakingStart"] = "SPEAKING_START";
		RPCEvents$3["SpeakingStop"] = "SPEAKING_STOP";
		RPCEvents$3["VoiceChannelSelect"] = "VOICE_CHANNEL_SELECT";
		RPCEvents$3["VoiceConnectionStatus"] = "VOICE_CONNECTION_STATUS";
		RPCEvents$3["VoiceSettingsUpdate"] = "VOICE_SETTINGS_UPDATE";
		RPCEvents$3["VoiceSettingsUpdate2"] = "VOICE_SETTINGS_UPDATE_2";
		RPCEvents$3["VoiceStateCreate"] = "VOICE_STATE_CREATE";
		RPCEvents$3["VoiceStateDelete"] = "VOICE_STATE_DELETE";
		RPCEvents$3["VoiceStateUpdate"] = "VOICE_STATE_UPDATE";
	})(RPCEvents$2 || (exports.RPCEvents = RPCEvents$2 = {}));
}));
var v10_exports$1 = {};
__export$4(v10_exports$1, {
	RPCCloseEventCodes: () => RPCCloseEventCodes$1,
	RPCCommands: () => RPCCommands$1,
	RPCDeviceType: () => RPCDeviceType$1,
	RPCErrorCodes: () => RPCErrorCodes$1,
	RPCEvents: () => RPCEvents$1,
	RPCVersion: () => RPCVersion$1,
	RPCVoiceSettingsModeType: () => RPCVoiceSettingsModeType$1,
	RPCVoiceShortcutKeyComboKeyType: () => RPCVoiceShortcutKeyComboKeyType$1,
	RelationshipType: () => RelationshipType$1,
	VoiceConnectionStates: () => VoiceConnectionStates$1,
	default: () => v10_default$1
});
var import_v10$3, v10_default$1, RPCCloseEventCodes$1, RPCCommands$1, RPCDeviceType$1, RPCErrorCodes$1, RPCEvents$1, RPCVersion$1, RPCVoiceSettingsModeType$1, RPCVoiceShortcutKeyComboKeyType$1, RelationshipType$1, VoiceConnectionStates$1;
var init_v10$1 = __esmMin((() => {
	import_v10$3 = /* @__PURE__ */ __toESM(require_v10$2(), 1);
	v10_default$1 = import_v10$3.default;
	RPCCloseEventCodes$1 = import_v10$3.default.RPCCloseEventCodes;
	RPCCommands$1 = import_v10$3.RPCCommands;
	RPCDeviceType$1 = import_v10$3.default.RPCDeviceType;
	RPCErrorCodes$1 = import_v10$3.default.RPCErrorCodes;
	RPCEvents$1 = import_v10$3.RPCEvents;
	RPCVersion$1 = "1";
	RPCVoiceSettingsModeType$1 = import_v10$3.default.RPCVoiceSettingsModeType;
	RPCVoiceShortcutKeyComboKeyType$1 = import_v10$3.default.RPCVoiceShortcutKeyComboKeyType;
	RelationshipType$1 = import_v10$3.default.RelationshipType;
	VoiceConnectionStates$1 = import_v10$3.default.VoiceConnectionStates;
}));
var require_v10$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isDMInteraction = isDMInteraction$1;
	exports.isGuildInteraction = isGuildInteraction$1;
	exports.isApplicationCommandDMInteraction = isApplicationCommandDMInteraction$1;
	exports.isApplicationCommandGuildInteraction = isApplicationCommandGuildInteraction$1;
	exports.isMessageComponentDMInteraction = isMessageComponentDMInteraction$1;
	exports.isMessageComponentGuildInteraction = isMessageComponentGuildInteraction$1;
	exports.isLinkButton = isLinkButton$1;
	exports.isInteractionButton = isInteractionButton$1;
	exports.isMessageComponentInteraction = isMessageComponentInteraction$1;
	exports.isMessageComponentButtonInteraction = isMessageComponentButtonInteraction$1;
	exports.isMessageComponentSelectMenuInteraction = isMessageComponentSelectMenuInteraction$1;
	exports.isChatInputApplicationCommandInteraction = isChatInputApplicationCommandInteraction$1;
	exports.isContextMenuApplicationCommandInteraction = isContextMenuApplicationCommandInteraction$1;
	var index_1 = (init_v10$3(), __toCommonJS$4(v10_exports$3));
	function isDMInteraction$1(interaction) {
		return Reflect.has(interaction, "user");
	}
	function isGuildInteraction$1(interaction) {
		return Reflect.has(interaction, "guild_id");
	}
	function isApplicationCommandDMInteraction$1(interaction) {
		return isDMInteraction$1(interaction);
	}
	function isApplicationCommandGuildInteraction$1(interaction) {
		return isGuildInteraction$1(interaction);
	}
	function isMessageComponentDMInteraction$1(interaction) {
		return isDMInteraction$1(interaction);
	}
	function isMessageComponentGuildInteraction$1(interaction) {
		return isGuildInteraction$1(interaction);
	}
	function isLinkButton$1(component) {
		return component.style === index_1.ButtonStyle.Link;
	}
	function isInteractionButton$1(component) {
		return ![index_1.ButtonStyle.Link, index_1.ButtonStyle.Premium].includes(component.style);
	}
	function isMessageComponentInteraction$1(interaction) {
		return interaction.type === index_1.InteractionType.MessageComponent;
	}
	function isMessageComponentButtonInteraction$1(interaction) {
		return interaction.data.component_type === index_1.ComponentType.Button;
	}
	function isMessageComponentSelectMenuInteraction$1(interaction) {
		return [
			index_1.ComponentType.StringSelect,
			index_1.ComponentType.UserSelect,
			index_1.ComponentType.RoleSelect,
			index_1.ComponentType.MentionableSelect,
			index_1.ComponentType.ChannelSelect
		].includes(interaction.data.component_type);
	}
	function isChatInputApplicationCommandInteraction$1(interaction) {
		return interaction.data.type === index_1.ApplicationCommandType.ChatInput;
	}
	function isContextMenuApplicationCommandInteraction$1(interaction) {
		return interaction.data.type === index_1.ApplicationCommandType.Message || interaction.data.type === index_1.ApplicationCommandType.User;
	}
}));
var v10_exports = {};
__export$4(v10_exports, {
	default: () => v10_default,
	isApplicationCommandDMInteraction: () => isApplicationCommandDMInteraction,
	isApplicationCommandGuildInteraction: () => isApplicationCommandGuildInteraction,
	isChatInputApplicationCommandInteraction: () => isChatInputApplicationCommandInteraction,
	isContextMenuApplicationCommandInteraction: () => isContextMenuApplicationCommandInteraction,
	isDMInteraction: () => isDMInteraction,
	isGuildInteraction: () => isGuildInteraction,
	isInteractionButton: () => isInteractionButton,
	isLinkButton: () => isLinkButton,
	isMessageComponentButtonInteraction: () => isMessageComponentButtonInteraction,
	isMessageComponentDMInteraction: () => isMessageComponentDMInteraction,
	isMessageComponentGuildInteraction: () => isMessageComponentGuildInteraction,
	isMessageComponentInteraction: () => isMessageComponentInteraction,
	isMessageComponentSelectMenuInteraction: () => isMessageComponentSelectMenuInteraction
});
var import_v10$2, v10_default, isApplicationCommandDMInteraction, isApplicationCommandGuildInteraction, isChatInputApplicationCommandInteraction, isContextMenuApplicationCommandInteraction, isDMInteraction, isGuildInteraction, isInteractionButton, isLinkButton, isMessageComponentButtonInteraction, isMessageComponentDMInteraction, isMessageComponentGuildInteraction, isMessageComponentInteraction, isMessageComponentSelectMenuInteraction;
var init_v10 = __esmMin((() => {
	import_v10$2 = /* @__PURE__ */ __toESM(require_v10$1(), 1);
	v10_default = import_v10$2.default;
	isApplicationCommandDMInteraction = import_v10$2.isApplicationCommandDMInteraction;
	isApplicationCommandGuildInteraction = import_v10$2.isApplicationCommandGuildInteraction;
	isChatInputApplicationCommandInteraction = import_v10$2.isChatInputApplicationCommandInteraction;
	isContextMenuApplicationCommandInteraction = import_v10$2.isContextMenuApplicationCommandInteraction;
	isDMInteraction = import_v10$2.isDMInteraction;
	isGuildInteraction = import_v10$2.isGuildInteraction;
	isInteractionButton = import_v10$2.isInteractionButton;
	isLinkButton = import_v10$2.isLinkButton;
	isMessageComponentButtonInteraction = import_v10$2.isMessageComponentButtonInteraction;
	isMessageComponentDMInteraction = import_v10$2.isMessageComponentDMInteraction;
	isMessageComponentGuildInteraction = import_v10$2.isMessageComponentGuildInteraction;
	isMessageComponentInteraction = import_v10$2.isMessageComponentInteraction;
	isMessageComponentSelectMenuInteraction = import_v10$2.isMessageComponentSelectMenuInteraction;
}));
var require_v10 = /* @__PURE__ */ __commonJSMin(((exports) => {
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
	var __exportStar$1 = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding$1(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Utils = void 0;
	__exportStar$1((init_v10$4(), __toCommonJS$4(v10_exports$4)), exports);
	__exportStar$1((init_globals(), __toCommonJS$4(globals_exports)), exports);
	__exportStar$1((init_v10$3(), __toCommonJS$4(v10_exports$3)), exports);
	__exportStar$1((init_v10$2(), __toCommonJS$4(v10_exports$2)), exports);
	__exportStar$1((init_v10$1(), __toCommonJS$4(v10_exports$1)), exports);
	__exportStar$1(require_internals(), exports);
	exports.Utils = (init_v10(), __toCommonJS$4(v10_exports));
}));
var import_v10$1 = /* @__PURE__ */ __toESM(require_v10(), 1);
import_v10$1.default.APIApplicationCommandPermissionsConstant;
import_v10$1.default.APIVersion;
import_v10$1.default.ActivityFlags;
import_v10$1.default.ActivityPlatform;
const ActivityType = import_v10$1.default.ActivityType;
import_v10$1.default.AllowedMentionsTypes;
import_v10$1.default.ApplicationCommandOptionType;
import_v10$1.default.ApplicationCommandPermissionType;
import_v10$1.default.ApplicationCommandType;
import_v10$1.default.ApplicationFlags;
import_v10$1.default.ApplicationIntegrationType;
import_v10$1.default.ApplicationRoleConnectionMetadataType;
import_v10$1.default.ApplicationWebhookEventStatus;
import_v10$1.default.ApplicationWebhookEventType;
import_v10$1.default.ApplicationWebhookType;
import_v10$1.default.AttachmentFlags;
import_v10$1.default.AuditLogEvent;
import_v10$1.default.AuditLogOptionsType;
import_v10$1.default.AutoModerationActionType;
import_v10$1.default.AutoModerationRuleEventType;
import_v10$1.default.AutoModerationRuleKeywordPresetType;
import_v10$1.default.AutoModerationRuleTriggerType;
import_v10$1.default.ButtonStyle;
import_v10$1.default.CDNRoutes;
import_v10$1.default.ChannelFlags;
import_v10$1.default.ChannelType;
import_v10$1.default.ComponentType;
import_v10$1.default.ConnectionService;
import_v10$1.default.ConnectionVisibility;
import_v10$1.default.EmbedType;
import_v10$1.default.EntitlementOwnerType;
import_v10$1.default.EntitlementType;
import_v10$1.default.EntryPointCommandHandlerType;
import_v10$1.default.FormattingPatterns;
import_v10$1.default.ForumLayoutType;
import_v10$1.default.GatewayCloseCodes;
import_v10$1.default.GatewayDispatchEvents;
import_v10$1.default.GatewayIntentBits;
import_v10$1.default.GatewayOpcodes;
import_v10$1.default.GatewayVersion;
import_v10$1.default.GuildDefaultMessageNotifications;
import_v10$1.default.GuildExplicitContentFilter;
import_v10$1.default.GuildFeature;
import_v10$1.default.GuildHubType;
import_v10$1.default.GuildMFALevel;
import_v10$1.default.GuildMemberFlags;
import_v10$1.default.GuildNSFWLevel;
import_v10$1.default.GuildOnboardingMode;
import_v10$1.default.GuildOnboardingPromptType;
import_v10$1.default.GuildPremiumTier;
import_v10$1.default.GuildScheduledEventEntityType;
import_v10$1.default.GuildScheduledEventPrivacyLevel;
import_v10$1.default.GuildScheduledEventRecurrenceRuleFrequency;
import_v10$1.default.GuildScheduledEventRecurrenceRuleMonth;
import_v10$1.default.GuildScheduledEventRecurrenceRuleWeekday;
import_v10$1.default.GuildScheduledEventStatus;
import_v10$1.default.GuildSystemChannelFlags;
import_v10$1.default.GuildVerificationLevel;
import_v10$1.default.GuildWidgetStyle;
import_v10$1.default.ImageFormat;
import_v10$1.default.IntegrationExpireBehavior;
import_v10$1.default.InteractionContextType;
import_v10$1.default.InteractionResponseType;
import_v10$1.default.InteractionType;
import_v10$1.default.InviteFlags;
import_v10$1.default.InviteTargetType;
import_v10$1.default.InviteType;
import_v10$1.default.Locale;
import_v10$1.default.MembershipScreeningFieldType;
import_v10$1.default.MessageActivityType;
import_v10$1.default.MessageFlags;
import_v10$1.default.MessageReferenceType;
import_v10$1.default.MessageType;
import_v10$1.default.NameplatePalette;
import_v10$1.default.OAuth2Routes;
import_v10$1.default.OAuth2Scopes;
import_v10$1.default.OverwriteType;
import_v10$1.default.PermissionFlagsBits;
import_v10$1.default.PollLayoutType;
import_v10$1.default.PresenceUpdateStatus;
import_v10$1.default.RESTJSONErrorCodes;
import_v10$1.default.RPCCloseEventCodes;
import_v10$1.default.RPCCommands;
import_v10$1.default.RPCDeviceType;
import_v10$1.default.RPCErrorCodes;
import_v10$1.default.RPCEvents;
import_v10$1.default.RPCVersion;
import_v10$1.default.RPCVoiceSettingsModeType;
import_v10$1.default.RPCVoiceShortcutKeyComboKeyType;
import_v10$1.default.ReactionType;
import_v10$1.default.RelationshipType;
import_v10$1.default.RoleFlags;
import_v10$1.default.RouteBases;
import_v10$1.default.Routes;
import_v10$1.default.SKUFlags;
import_v10$1.default.SKUType;
import_v10$1.default.SelectMenuDefaultValueType;
import_v10$1.default.SeparatorSpacingSize;
import_v10$1.default.SortOrderType;
import_v10$1.default.StageInstancePrivacyLevel;
const StatusDisplayType = import_v10$1.default.StatusDisplayType;
import_v10$1.default.StickerFormatType;
import_v10$1.default.StickerPackApplicationId;
import_v10$1.default.StickerType;
import_v10$1.default.SubscriptionStatus;
import_v10$1.default.TeamMemberMembershipState;
import_v10$1.default.TeamMemberRole;
import_v10$1.default.TextInputStyle;
import_v10$1.default.ThreadAutoArchiveDuration;
import_v10$1.default.ThreadMemberFlags;
import_v10$1.default.UnfurledMediaItemLoadingState;
import_v10$1.default.UserFlags;
import_v10$1.default.UserPremiumType;
import_v10$1.Utils;
import_v10$1.default.VideoQualityMode;
import_v10$1.default.VoiceChannelEffectSendAnimationType;
import_v10$1.default.VoiceConnectionStates;
import_v10$1.default.WebhookType;
import_v10$1.default.urlSafeCharacters;
var require_dist$5 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp$5 = Object.defineProperty;
	var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$3 = Object.getOwnPropertyNames;
	var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
	var __name$5 = (target, value) => __defProp$5(target, "name", {
		value,
		configurable: true
	});
	var __export$3 = (target, all) => {
		for (var name in all) __defProp$5(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$3 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$3(from)) if (!__hasOwnProp$3.call(to, key) && key !== except) __defProp$5(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$3(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$3 = (mod$7) => __copyProps$3(__defProp$5({}, "__esModule", { value: true }), mod$7);
	var src_exports$3 = {};
	__export$3(src_exports$3, {
		AbortError: () => AbortError$2,
		AsyncEventEmitter: () => AsyncEventEmitter
	});
	module.exports = __toCommonJS$3(src_exports$3);
	function validateListener(input) {
		if (typeof input !== "function") throw new TypeError(`The listener argument must be a function. Received ${typeof input}`);
	}
	__name$5(validateListener, "validateListener");
	function validateAbortSignal(input) {
		if (input && !(input instanceof AbortSignal)) throw new TypeError(`The signal option must be an AbortSignal. Received ${input}`);
	}
	__name$5(validateAbortSignal, "validateAbortSignal");
	function spliceOne(list, index) {
		for (; index + 1 < list.length; index++) list[index] = list[index + 1];
		list.pop();
	}
	__name$5(spliceOne, "spliceOne");
	function arrayClone(arr) {
		switch (arr.length) {
			case 2: return [arr[0], arr[1]];
			case 3: return [
				arr[0],
				arr[1],
				arr[2]
			];
			case 4: return [
				arr[0],
				arr[1],
				arr[2],
				arr[3]
			];
			case 5: return [
				arr[0],
				arr[1],
				arr[2],
				arr[3],
				arr[4]
			];
			case 6: return [
				arr[0],
				arr[1],
				arr[2],
				arr[3],
				arr[4],
				arr[5]
			];
		}
		return arr.slice();
	}
	__name$5(arrayClone, "arrayClone");
	function identicalSequenceRange(a, b) {
		for (let i = 0; i < a.length - 3; i++) {
			const pos = b.indexOf(a[i]);
			if (pos !== -1) {
				const rest = b.length - pos;
				if (rest > 3) {
					let len = 1;
					const maxLen = Math.min(a.length - i, rest);
					while (maxLen > len && a[i + len] === b[pos + len]) len++;
					if (len > 3) return [len, i];
				}
			}
		}
		return [0, 0];
	}
	__name$5(identicalSequenceRange, "identicalSequenceRange");
	function enhanceStackTrace(err, own) {
		let ctorInfo = "";
		try {
			const { name } = this.constructor;
			if (name !== "AsyncEventEmitter") ctorInfo = ` on ${name} instance`;
		} catch {}
		const sep = `
Emitted 'error' event${ctorInfo} at:
`;
		const errStack = err.stack.split("\n").slice(1);
		const ownStack = own.stack.split("\n").slice(1);
		const { 0: len, 1: off } = identicalSequenceRange(ownStack, errStack);
		if (len > 0) ownStack.splice(off + 1, len - 2, "    [... lines matching original stack trace ...]");
		return err.stack + sep + ownStack.join("\n");
	}
	__name$5(enhanceStackTrace, "enhanceStackTrace");
	var _AsyncEventEmitter = class _AsyncEventEmitter$1 {
		constructor() {
			this._events = { __proto__: null };
			this._eventCount = 0;
			this._maxListeners = 10;
			this._internalPromiseMap = /* @__PURE__ */ new Map();
			this._wrapperId = 0n;
		}
		addListener(eventName, listener) {
			validateListener(listener);
			const wrapped = this._wrapListener(eventName, listener, false);
			this._addListener(eventName, wrapped, false);
			return this;
		}
		on(eventName, listener) {
			return this.addListener(eventName, listener);
		}
		once(eventName, listener) {
			validateListener(listener);
			const wrapped = this._wrapListener(eventName, listener, true);
			this._addListener(eventName, wrapped, false);
			return this;
		}
		removeListener(eventName, listener) {
			validateListener(listener);
			const events = this._events;
			const eventList = events[eventName];
			if (eventList === void 0) return this;
			if (eventList === listener || eventList.listener === listener) if (--this._eventCount === 0) this._events = { __proto__: null };
			else {
				delete events[eventName];
				if (events.removeListener) this.emit("removeListener", eventName, eventList.listener ?? eventList);
			}
			else if (typeof eventList !== "function") {
				let position = -1;
				for (let i = eventList.length - 1; i >= 0; i--) if (eventList[i] === listener || eventList[i].listener === listener) {
					position = i;
					break;
				}
				if (position < 0) return this;
				if (position === 0) eventList.shift();
				else spliceOne(eventList, position);
				if (eventList.length === 0) {
					delete events[eventName];
					--this._eventCount;
				}
				if (events.removeListener !== void 0) this.emit("removeListener", eventName, listener);
			}
			return this;
		}
		off(eventName, listener) {
			return this.removeListener(eventName, listener);
		}
		removeAllListeners(event) {
			const events = this._events;
			if (events.removeListener === void 0) {
				if (!event) {
					this._events = { __proto__: null };
					this._eventCount = 0;
				} else if (events[event] !== void 0) if (--this._eventCount === 0) this._events = { __proto__: null };
				else delete events[event];
				return this;
			}
			if (!event) {
				for (const key of Reflect.ownKeys(events)) {
					if (key === "removeListener") continue;
					this.removeAllListeners(key);
				}
				this.removeAllListeners("removeListener");
				this._events = { __proto__: null };
				this._eventCount = 0;
				return this;
			}
			const listeners = events[event];
			if (typeof listeners === "function") this.removeListener(event, listeners);
			else if (listeners !== void 0) for (let i = listeners.length - 1; i >= 0; i--) this.removeListener(event, listeners[i]);
			return this;
		}
		setMaxListeners(n) {
			if (typeof n !== "number" || n < 0 || Number.isNaN(n)) throw new RangeError(`Expected to get a non-negative number for "setMaxListeners", got ${n} instead`);
			this._maxListeners = n;
			return this;
		}
		getMaxListeners() {
			return this._maxListeners;
		}
		listeners(eventName) {
			const eventList = this._events[eventName];
			if (eventList === void 0) return [];
			if (typeof eventList === "function") return [eventList.listener ?? eventList];
			const ret = arrayClone(eventList);
			for (let i = 0; i < ret.length; ++i) {
				const orig = ret[i].listener;
				if (typeof orig === "function") ret[i] = orig;
			}
			return ret;
		}
		rawListeners(eventName) {
			const eventList = this._events[eventName];
			if (eventList === void 0) return [];
			if (typeof eventList === "function") return [eventList];
			return arrayClone(eventList);
		}
		emit(eventName, ...args) {
			let doError = eventName === "error";
			const events = this._events;
			if (events !== void 0) doError = doError && events.error === void 0;
			else if (!doError) return false;
			if (doError) {
				let er;
				if (args.length > 0) er = args[0];
				if (er instanceof Error) {
					try {
						const capture = {};
						Error.captureStackTrace(capture, _AsyncEventEmitter$1.prototype.emit);
						Object.defineProperty(er, "stack", {
							value: enhanceStackTrace.call(this, er, capture),
							configurable: true
						});
					} catch {}
					throw er;
				}
				const stringifiedError = String(er);
				const err = /* @__PURE__ */ new Error(`Unhandled 'error' event emitted, received ${stringifiedError}`);
				err.context = er;
				throw err;
			}
			const handlers = events[eventName];
			if (handlers === void 0) return false;
			if (typeof handlers === "function") {
				const result = handlers.apply(this, args);
				if (result !== void 0 && result !== null) handleMaybeAsync(this, result);
			} else {
				const len = handlers.length;
				const listeners = arrayClone(handlers);
				for (let i = 0; i < len; ++i) {
					const result = listeners[i].apply(this, args);
					if (result !== void 0 && result !== null) handleMaybeAsync(this, result);
				}
			}
			return true;
		}
		listenerCount(eventName) {
			const events = this._events;
			if (events === void 0) return 0;
			const eventListeners = events[eventName];
			if (typeof eventListeners === "function") return 1;
			return eventListeners?.length ?? 0;
		}
		prependListener(eventName, listener) {
			validateListener(listener);
			const wrapped = this._wrapListener(eventName, listener, false);
			this._addListener(eventName, wrapped, true);
			return this;
		}
		prependOnceListener(eventName, listener) {
			validateListener(listener);
			const wrapped = this._wrapListener(eventName, listener, true);
			this._addListener(eventName, wrapped, true);
			return this;
		}
		eventNames() {
			return this._eventCount > 0 ? Reflect.ownKeys(this._events) : [];
		}
		async waitForAllListenersToComplete() {
			const promises = [...this._internalPromiseMap.values()];
			if (promises.length === 0) return false;
			await Promise.all(promises);
			return true;
		}
		_addListener(eventName, wrappedListener, prepend) {
			if (this._events.newListener !== void 0) this.emit("newListener", eventName, wrappedListener.listener ?? wrappedListener);
			let existing = this._events[eventName];
			if (existing === void 0) {
				existing = this._events[eventName] = wrappedListener;
				++this._eventCount;
			} else if (typeof existing === "function") existing = this._events[eventName] = prepend ? [wrappedListener, existing] : [existing, wrappedListener];
			else if (prepend) existing.unshift(wrappedListener);
			else existing.push(wrappedListener);
			const existingWarnedAboutMaxListeners = Reflect.get(existing, "_hasWarnedAboutMaxListeners");
			if (this._maxListeners > 0 && existing.length > this._maxListeners && !existingWarnedAboutMaxListeners) {
				Reflect.set(existing, "_hasWarnedAboutMaxListeners", true);
				const warningMessage = [`Possible AsyncEventEmitter memory leak detected. ${existing.length} ${String(eventName)} listeners added to ${this.constructor.name}.`, `Use emitter.setMaxListeners() to increase the limit.`].join(" ");
				console.warn(warningMessage);
			}
		}
		_wrapListener(eventName, listener, once) {
			if (!once) return listener;
			const state = {
				fired: false,
				wrapFn: void 0,
				eventEmitter: this,
				eventName,
				listener
			};
			const wrapped = onceWrapper.bind(state);
			wrapped.listener = listener;
			state.wrapFn = wrapped;
			return wrapped;
		}
		static listenerCount(emitter, eventName) {
			return emitter.listenerCount(eventName);
		}
		static async once(emitter, eventName, options = {}) {
			const signal = options?.signal;
			validateAbortSignal(signal);
			if (signal?.aborted) throw new AbortError$2(void 0, { cause: getReason(signal) });
			return new Promise((resolve, reject) => {
				const errorListener = /* @__PURE__ */ __name$5((err) => {
					emitter.removeListener(eventName, resolver);
					if (signal) eventTargetAgnosticRemoveListener(emitter, eventName, abortListener);
					reject(err);
				}, "errorListener");
				const resolver = /* @__PURE__ */ __name$5((...args) => {
					emitter.removeListener("error", errorListener);
					if (signal) eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
					resolve(args);
				}, "resolver");
				emitter.once(eventName, resolver);
				if (eventName !== "error") emitter.once("error", errorListener);
				const abortListener = /* @__PURE__ */ __name$5(() => {
					eventTargetAgnosticRemoveListener(emitter, eventName, resolver);
					eventTargetAgnosticRemoveListener(emitter, "error", errorListener);
					reject(new AbortError$2(void 0, { cause: getReason(signal) }));
				}, "abortListener");
				if (signal) eventTargetAgnosticAddListener(signal, "abort", abortListener, { once: true });
			});
		}
		static on(emitter, eventName, options = {}) {
			const signal = options?.signal;
			validateAbortSignal(signal);
			if (signal?.aborted) throw new AbortError$2(void 0, { cause: getReason(signal) });
			const unconsumedEvents = [];
			const unconsumedPromises = [];
			let error = null;
			let finished$2 = false;
			const abortListener = /* @__PURE__ */ __name$5(() => {
				errorHandler(new AbortError$2(void 0, { cause: getReason(signal) }));
			}, "abortListener");
			const eventHandler = /* @__PURE__ */ __name$5((...args) => {
				const promise = unconsumedPromises.shift();
				if (promise) promise.resolve(createIterResult(args, false));
				else unconsumedEvents.push(args);
			}, "eventHandler");
			const errorHandler = /* @__PURE__ */ __name$5((err) => {
				finished$2 = true;
				const toError = unconsumedPromises.shift();
				if (toError) toError.reject(err);
				else error = err;
				iterator.return();
			}, "errorHandler");
			const iterator = Object.setPrototypeOf({
				next() {
					const value = unconsumedEvents.shift();
					if (value) return Promise.resolve(createIterResult(value, false));
					if (error) {
						const p = Promise.reject(error);
						error = null;
						return p;
					}
					if (finished$2) return Promise.resolve(createIterResult(void 0, true));
					return new Promise((resolve, reject) => {
						unconsumedPromises.push({
							resolve,
							reject
						});
					});
				},
				return() {
					emitter.off(eventName, eventHandler);
					emitter.off("error", errorHandler);
					if (signal) eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
					finished$2 = true;
					const doneResult = createIterResult(void 0, true);
					for (const promise of unconsumedPromises) promise.resolve(doneResult);
					return Promise.resolve(doneResult);
				},
				throw(err) {
					if (!err || !(err instanceof Error)) throw new TypeError(`Expected Error instance to be thrown in AsyncEventEmitter.AsyncIterator. Got ${err}`);
					error = err;
					emitter.off(eventName, eventHandler);
					emitter.off("error", errorHandler);
				},
				[Symbol.asyncIterator]() {
					return this;
				}
			}, AsyncIteratorPrototype);
			emitter.on(eventName, eventHandler);
			if (eventName !== "error") emitter.on("error", errorHandler);
			if (signal) eventTargetAgnosticAddListener(signal, "abort", abortListener);
			return iterator;
		}
	};
	__name$5(_AsyncEventEmitter, "AsyncEventEmitter");
	var AsyncEventEmitter = _AsyncEventEmitter;
	function onceWrapper() {
		if (!this.fired) {
			this.eventEmitter.removeListener(this.eventName, this.wrapFn);
			this.fired = true;
			if (arguments.length === 0) return this.listener.call(this.eventEmitter);
			return this.listener.apply(this.eventEmitter, arguments);
		}
	}
	__name$5(onceWrapper, "onceWrapper");
	function getReason(signal) {
		return signal?.reason;
	}
	__name$5(getReason, "getReason");
	function eventTargetAgnosticRemoveListener(emitter, name, listener, flags) {
		if (typeof emitter.off === "function") emitter.off(name, listener);
		else if (typeof emitter.removeEventListener === "function") emitter.removeEventListener(name, listener, flags);
	}
	__name$5(eventTargetAgnosticRemoveListener, "eventTargetAgnosticRemoveListener");
	function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
		if (typeof emitter.on === "function") if (flags?.once) emitter.once(name, listener);
		else emitter.on(name, listener);
		else if (typeof emitter.addEventListener === "function") emitter.addEventListener(name, listener, flags);
	}
	__name$5(eventTargetAgnosticAddListener, "eventTargetAgnosticAddListener");
	var AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype);
	function createIterResult(value, done) {
		return {
			value,
			done
		};
	}
	__name$5(createIterResult, "createIterResult");
	var _AbortError = class _AbortError$1 extends Error {
		constructor(message = "The operation was aborted", options = void 0) {
			if (options !== void 0 && typeof options !== "object") throw new TypeError(`Failed to create AbortError: options is not an object or undefined`);
			super(message, options);
			this.code = "ABORT_ERR";
			this.name = "AbortError";
		}
	};
	__name$5(_AbortError, "AbortError");
	var AbortError$2 = _AbortError;
	function handleMaybeAsync(emitter, result) {
		try {
			const the = result.then;
			const fin = result.finally;
			if (typeof the === "function") the.call(result, void 0, (error) => {
				setTimeout(() => {
					emitter.emit("error", error);
				}, 0);
			});
			if (typeof fin === "function") {
				const promiseId = String(++emitter["_wrapperId"]);
				emitter["_internalPromiseMap"].set(promiseId, result);
				fin.call(result, /* @__PURE__ */ __name$5(function final() {
					emitter["_internalPromiseMap"].delete(promiseId);
				}, "final"));
			}
		} catch (err) {
			emitter.emit("error", err);
		}
	}
	__name$5(handleMaybeAsync, "handleMaybeAsync");
}));
var require_Transport = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var async_event_emitter_1$1 = require_dist$5();
	var RPC_CLOSE_CODE;
	(function(RPC_CLOSE_CODE$1) {
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["CLOSE_NORMAL"] = 1e3] = "CLOSE_NORMAL";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["CLOSE_UNSUPPORTED"] = 1003] = "CLOSE_UNSUPPORTED";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["CLOSE_ABNORMAL"] = 1006] = "CLOSE_ABNORMAL";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["INVALID_CLIENTID"] = 4e3] = "INVALID_CLIENTID";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["INVALID_ORIGIN"] = 4001] = "INVALID_ORIGIN";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["RATELIMITED"] = 4002] = "RATELIMITED";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["TOKEN_REVOKED"] = 4003] = "TOKEN_REVOKED";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["INVALID_VERSION"] = 4004] = "INVALID_VERSION";
		RPC_CLOSE_CODE$1[RPC_CLOSE_CODE$1["INVALID_ENCODING"] = 4005] = "INVALID_ENCODING";
	})(RPC_CLOSE_CODE || (exports.RPC_CLOSE_CODE = RPC_CLOSE_CODE = {}));
	var RPC_ERROR_CODE;
	(function(RPC_ERROR_CODE$1) {
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["UNKNOWN_ERROR"] = 1e3] = "UNKNOWN_ERROR";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["SERVICE_UNAVAILABLE"] = 1001] = "SERVICE_UNAVAILABLE";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["TRANSACTION_ABORTED"] = 1002] = "TRANSACTION_ABORTED";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_PAYLOAD"] = 4e3] = "INVALID_PAYLOAD";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_COMMAND"] = 4002] = "INVALID_COMMAND";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_GUILD"] = 4003] = "INVALID_GUILD";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_EVENT"] = 4004] = "INVALID_EVENT";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_CHANNEL"] = 4005] = "INVALID_CHANNEL";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_PERMISSIONS"] = 4006] = "INVALID_PERMISSIONS";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_CLIENTID"] = 4007] = "INVALID_CLIENTID";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_ORIGIN"] = 4008] = "INVALID_ORIGIN";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_TOKEN"] = 4009] = "INVALID_TOKEN";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_USER"] = 4010] = "INVALID_USER";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_INVITE"] = 4011] = "INVALID_INVITE";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_ACTIVITY_JOIN_REQUEST"] = 4012] = "INVALID_ACTIVITY_JOIN_REQUEST";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_ENTITLEMENT"] = 4015] = "INVALID_ENTITLEMENT";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_GIFT_CODE"] = 4016] = "INVALID_GIFT_CODE";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_GUILD_TEMPLATE"] = 4017] = "INVALID_GUILD_TEMPLATE";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_SOUND"] = 4018] = "INVALID_SOUND";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_PROVIDER"] = 4019] = "INVALID_PROVIDER";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["OAUTH2_ERROR"] = 5e3] = "OAUTH2_ERROR";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["SELECT_CHANNEL_TIMED_OUT"] = 5001] = "SELECT_CHANNEL_TIMED_OUT";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["GET_GUILD_TIMED_OUT"] = 5002] = "GET_GUILD_TIMED_OUT";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["SELECT_VOICE_FORCE_REQUIRED"] = 5003] = "SELECT_VOICE_FORCE_REQUIRED";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["INVALID_ACTIVITY_SECRET"] = 5005] = "INVALID_ACTIVITY_SECRET";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["NO_ELIGIBLE_ACTIVITY"] = 5006] = "NO_ELIGIBLE_ACTIVITY";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["PURCHASE_CANCELED"] = 5008] = "PURCHASE_CANCELED";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["PURCHASE_ERROR"] = 5009] = "PURCHASE_ERROR";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["UNAUTHORIZED_FOR_ACHIEVEMENT"] = 5010] = "UNAUTHORIZED_FOR_ACHIEVEMENT";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["RATE_LIMITED"] = 5011] = "RATE_LIMITED";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["UNAUTHORIZED_FOR_APPLICATION"] = 5012] = "UNAUTHORIZED_FOR_APPLICATION";
		RPC_ERROR_CODE$1[RPC_ERROR_CODE$1["NO_CONNECTION_FOUND"] = 5013] = "NO_CONNECTION_FOUND";
	})(RPC_ERROR_CODE || (exports.RPC_ERROR_CODE = RPC_ERROR_CODE = {}));
	var CUSTOM_RPC_ERROR_CODE;
	(function(CUSTOM_RPC_ERROR_CODE$1) {
		CUSTOM_RPC_ERROR_CODE$1[CUSTOM_RPC_ERROR_CODE$1["CONNECTION_ENDED"] = 0] = "CONNECTION_ENDED";
		CUSTOM_RPC_ERROR_CODE$1[CUSTOM_RPC_ERROR_CODE$1["CONNECTION_TIMEOUT"] = 1] = "CONNECTION_TIMEOUT";
		CUSTOM_RPC_ERROR_CODE$1[CUSTOM_RPC_ERROR_CODE$1["COULD_NOT_CONNECT"] = 2] = "COULD_NOT_CONNECT";
		CUSTOM_RPC_ERROR_CODE$1[CUSTOM_RPC_ERROR_CODE$1["COULD_NOT_FIND_CLIENT"] = 3] = "COULD_NOT_FIND_CLIENT";
	})(CUSTOM_RPC_ERROR_CODE || (exports.CUSTOM_RPC_ERROR_CODE = CUSTOM_RPC_ERROR_CODE = {}));
	var Transport = class extends async_event_emitter_1$1.AsyncEventEmitter {
		get isConnected() {
			return false;
		}
		constructor(options) {
			super();
			Object.defineProperty(this, "client", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			this.client = options.client;
		}
	};
	exports.Transport = Transport;
}));
var require_RPCError = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Transport_1$3 = require_Transport();
	var RPCError = class extends Error {
		get name() {
			return `${{
				...Transport_1$3.CUSTOM_RPC_ERROR_CODE,
				...Transport_1$3.RPC_ERROR_CODE
			}[this.code]}`;
		}
		constructor(errorCode, message, options) {
			super(message, options);
			Object.defineProperty(this, "code", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "message", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: ""
			});
			this.code = errorCode;
			this.message = message ?? this.message;
		}
	};
	exports.RPCError = RPCError;
}));
var require_IPC = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault$1 = exports && exports.__importDefault || function(mod$7) {
		return mod$7 && mod$7.__esModule ? mod$7 : { "default": mod$7 };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var Transport_1$2 = require_Transport();
	var RPCError_1$2 = require_RPCError();
	var node_crypto_1$1 = __importDefault$1(__require("node:crypto"));
	var node_path_1 = __importDefault$1(__require("node:path"));
	var node_net_1 = __importDefault$1(__require("node:net"));
	var node_fs_1 = __importDefault$1(__require("node:fs"));
	var IPC_OPCODE;
	(function(IPC_OPCODE$1) {
		IPC_OPCODE$1[IPC_OPCODE$1["HANDSHAKE"] = 0] = "HANDSHAKE";
		IPC_OPCODE$1[IPC_OPCODE$1["FRAME"] = 1] = "FRAME";
		IPC_OPCODE$1[IPC_OPCODE$1["CLOSE"] = 2] = "CLOSE";
		IPC_OPCODE$1[IPC_OPCODE$1["PING"] = 3] = "PING";
		IPC_OPCODE$1[IPC_OPCODE$1["PONG"] = 4] = "PONG";
	})(IPC_OPCODE || (exports.IPC_OPCODE = IPC_OPCODE = {}));
	var getTempDir = () => {
		const { XDG_RUNTIME_DIR, TMPDIR, TMP, TEMP } = process.env;
		return node_fs_1.default.realpathSync(XDG_RUNTIME_DIR ?? TMPDIR ?? TMP ?? TEMP ?? `${node_path_1.default.sep}tmp`);
	};
	var defaultPathList = [
		{
			platform: ["win32"],
			format: (id) => `\\\\?\\pipe\\discord-ipc-${id}`
		},
		{
			platform: ["darwin", "linux"],
			format: (id) => {
				return node_path_1.default.join(getTempDir(), `discord-ipc-${id}`);
			}
		},
		{
			platform: ["linux"],
			format: (id) => {
				return node_path_1.default.join(getTempDir(), "snap.discord", `discord-ipc-${id}`);
			}
		},
		{
			platform: ["linux"],
			format: (id) => {
				return node_path_1.default.join(getTempDir(), "app", "com.discordapp.Discord", `discord-ipc-${id}`);
			}
		}
	];
	var createSocket = async (path) => {
		return new Promise((resolve, reject) => {
			const onError$1 = () => {
				socket.removeListener("connect", onConnect);
				reject();
			};
			const onConnect = () => {
				socket.removeListener("error", onError$1);
				resolve(socket);
			};
			const socket = node_net_1.default.createConnection(path);
			socket.once("connect", onConnect);
			socket.once("error", onError$1);
		});
	};
	var IPCTransport = class extends Transport_1$2.Transport {
		get isConnected() {
			return this.socket !== void 0 && this.socket.readyState === "open";
		}
		constructor(options) {
			super(options);
			Object.defineProperty(this, "pathList", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "socket", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			this.pathList = options.pathList ?? defaultPathList;
		}
		async getSocket() {
			if (this.socket) return this.socket;
			const pathList = this.pathList ?? defaultPathList;
			const pipeId = this.client.pipeId;
			return new Promise(async (resolve, reject) => {
				const useablePath = [];
				for (const pat of pathList) {
					if (!pat.platform.includes(process.platform)) continue;
					let pipeIdList = [];
					if (pipeId) pipeIdList = [pipeId];
					else for (let i = 0; i < 10; i++) pipeIdList.push(i);
					for (const pipeId$1 of pipeIdList) {
						const socketPath = pat.format(pipeId$1);
						if (process.platform !== "win32" && !node_fs_1.default.existsSync(socketPath)) continue;
						useablePath.push(socketPath);
					}
				}
				this.client.emit("debug", `CLIENT | Found ${useablePath.length} Discord client path;\n${useablePath.join("\n")}`);
				if (useablePath.length < 0) return reject(new RPCError_1$2.RPCError(Transport_1$2.CUSTOM_RPC_ERROR_CODE.COULD_NOT_FIND_CLIENT, "Unable to find any Discord client"));
				for (const path of useablePath) {
					const socket = await createSocket(path).catch(() => void 0);
					if (socket) return resolve(socket);
				}
				return reject(new RPCError_1$2.RPCError(Transport_1$2.CUSTOM_RPC_ERROR_CODE.COULD_NOT_CONNECT, "Could not connect to Discord client"));
			});
		}
		async connect() {
			if (!this.socket) this.socket = await this.getSocket();
			this.emit("open");
			this.send({
				v: 1,
				client_id: this.client.clientId
			}, IPC_OPCODE.HANDSHAKE);
			this.socket.on("readable", () => {
				let data = Buffer.alloc(0);
				do {
					if (!this.isConnected) break;
					const chunk = this.socket?.read();
					if (!chunk) break;
					this.client.emit("debug", `SERVER => CLIENT | ${chunk.toString("hex").match(/.{1,2}/g)?.join(" ").toUpperCase()}`);
					data = Buffer.concat([data, chunk]);
				} while (true);
				if (data.length < 8) {
					if (data.length === 0) return;
					this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
					return;
				}
				const op = data.readUInt32LE(0);
				const length = data.readUInt32LE(4);
				if (data.length !== length + 8) {
					this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
					return;
				}
				let parsedData;
				try {
					parsedData = JSON.parse(data.subarray(8, length + 8).toString());
				} catch {
					this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
					return;
				}
				this.client.emit("debug", `SERVER => CLIENT | OPCODE.${IPC_OPCODE[op]} |`, parsedData);
				switch (op) {
					case IPC_OPCODE.FRAME:
						if (!data) break;
						this.emit("message", parsedData);
						break;
					case IPC_OPCODE.CLOSE:
						this.emit("close", parsedData);
						break;
					case IPC_OPCODE.PING:
						this.send(parsedData, IPC_OPCODE.PONG);
						this.emit("ping");
						break;
				}
			});
			this.socket.on("close", () => {
				this.socket = void 0;
				this.emit("close", "Closed by Discord");
			});
		}
		send(message, op = IPC_OPCODE.FRAME) {
			this.client.emit("debug", `CLIENT => SERVER | OPCODE.${IPC_OPCODE[op]} |`, message);
			const dataBuffer = message ? Buffer.from(JSON.stringify(message)) : Buffer.alloc(0);
			const packet = Buffer.alloc(8);
			packet.writeUInt32LE(op, 0);
			packet.writeUInt32LE(dataBuffer.length, 4);
			this.socket?.write(Buffer.concat([packet, dataBuffer]));
		}
		ping() {
			this.send(node_crypto_1$1.default.randomUUID(), IPC_OPCODE.PING);
		}
		close() {
			if (!this.socket) return Promise.resolve();
			return new Promise((resolve) => {
				this.socket.once("close", () => {
					this.emit("close", "Closed by client");
					this.socket = void 0;
					resolve();
				});
				this.socket.destroy();
			});
		}
	};
	exports.IPCTransport = IPCTransport;
}));
var require_ws = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var WebSocket$1 = require_websocket$1();
	WebSocket$1.createWebSocketStream = require_stream();
	WebSocket$1.Server = require_websocket_server();
	WebSocket$1.Receiver = require_receiver$1();
	WebSocket$1.Sender = require_sender$1();
	WebSocket$1.WebSocket = WebSocket$1;
	WebSocket$1.WebSocketServer = WebSocket$1.Server;
	module.exports = WebSocket$1;
}));
var require_WebSocket = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Transport_1$1 = require_Transport();
	var RPCError_1$1 = require_RPCError();
	var ws_1 = require_ws();
	var WebSocketTransport = class extends Transport_1$1.Transport {
		constructor() {
			super(...arguments);
			Object.defineProperty(this, "ws", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
		}
		get isConnected() {
			return this.ws !== void 0 && this.ws.readyState === 1;
		}
		connect() {
			return new Promise(async (resolve, reject) => {
				for (let i = 0; i < 10; i++) {
					const ws = await new Promise((resolve$1, reject$1) => {
						const socket = new ws_1.WebSocket(`ws://127.0.0.1:${6463 + i}/?v=1&client_id=${this.client.clientId}&encoding=json`);
						socket.onopen = () => {
							socket.onclose = null;
							socket.onopen = null;
							resolve$1(socket);
						};
						socket.onerror = () => {
							socket.onclose = null;
							socket.onopen = null;
							reject$1();
						};
					}).catch(() => void 0);
					if (ws) {
						this.ws = ws;
						resolve();
						break;
					}
				}
				if (!this.ws) return reject(new RPCError_1$1.RPCError(Transport_1$1.CUSTOM_RPC_ERROR_CODE.COULD_NOT_CONNECT, "Failed to connect to Discord's local RPC WebSocket"));
				this.ws.onmessage = (event) => {
					this.emit("message", JSON.parse(event.data.toString()));
				};
				this.ws.onclose = (event) => {
					if (!event.wasClean) return;
					this.ws = void 0;
					this.emit("close", event.reason);
				};
				this.ws.onerror = (event) => {
					try {
						this.ws?.close();
					} catch {}
					throw event.error;
				};
				this.emit("open");
			});
		}
		send(data) {
			this.ws?.send(JSON.stringify(data));
		}
		ping() {}
		close() {
			if (!this.ws) return new Promise((resolve) => void resolve());
			return new Promise((resolve) => {
				this.ws.once("close", () => {
					this.emit("close", "Closed by client");
					this.ws = void 0;
					resolve();
				});
				this.ws.close();
			});
		}
	};
	exports.WebSocketTransport = WebSocketTransport;
}));
var require_Base = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Base = class {
		constructor(client) {
			Object.defineProperty(this, "client", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			this.client = client;
		}
	};
	exports.Base = Base;
}));
var require_VoiceSettings = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Base_1$5 = require_Base();
	var KEY_TYPE;
	(function(KEY_TYPE$1) {
		KEY_TYPE$1[KEY_TYPE$1["KEYBOARD_KEY"] = 0] = "KEYBOARD_KEY";
		KEY_TYPE$1[KEY_TYPE$1["MOUSE_BUTTON"] = 1] = "MOUSE_BUTTON";
		KEY_TYPE$1[KEY_TYPE$1["KEYBOARD_MODIFIER_KEY"] = 2] = "KEYBOARD_MODIFIER_KEY";
		KEY_TYPE$1[KEY_TYPE$1["GAMEPAD_BUTTON"] = 3] = "GAMEPAD_BUTTON";
	})(KEY_TYPE || (exports.KEY_TYPE = KEY_TYPE = {}));
	var VoiceSettings = class extends Base_1$5.Base {
		constructor(client, props) {
			super(client);
			Object.defineProperty(this, "input", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "output", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "mode", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "automatic_gain_control", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "echo_cancellation", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "noise_suppression", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "qos", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "silence_warning", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "deaf", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "mute", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.assign(this, props);
			this.input = props.input;
			this.output = props.output;
			this.mode = props.mode;
			this.automatic_gain_control = props.automatic_gain_control;
			this.echo_cancellation = props.echo_cancellation;
			this.noise_suppression = props.noise_suppression;
			this.qos = props.qos;
			this.silence_warning = props.silence_warning;
			this.deaf = props.deaf;
			this.mute = props.mute;
		}
	};
	exports.VoiceSettings = VoiceSettings;
}));
var require_User = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Base_1$4 = require_Base();
	var User = class extends Base_1$4.Base {
		constructor(client, props) {
			super(client);
			Object.defineProperty(this, "id", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "username", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "discriminator", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "avatar", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "flags", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "premium_type", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "public_flags", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "presence", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "avatar_decoration", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.assign(this, props);
			this.id = props.id;
			this.username = props.username;
			this.discriminator = props.discriminator;
			this.avatar = props.avatar;
		}
		get avatarUrl() {
			return this.client.getCdn().avatar(this.id, this.avatar);
		}
		get defaultAvatarUrl() {
			return this.client.getCdn().defaultAvatar(parseInt(this.discriminator.substring(1)) % 5);
		}
		get tag() {
			return `${this.username}#${this.discriminator}`;
		}
	};
	exports.User = User;
}));
var require_Message = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Base_1$3 = require_Base();
	var User_1$1 = require_User();
	var Message = class extends Base_1$3.Base {
		constructor(client, props) {
			super(client);
			Object.defineProperty(this, "id", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "blocked", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "bot", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "content", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "content_parsed", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "nick", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "author_color", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "edited_timestamp", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "timestamp", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "tts", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "mentions", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "mention_everyone", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "mention_roles", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "embeds", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "attachments", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "author", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "pinned", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "type", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.assign(this, props);
			this.id = props.id;
			this.blocked = props.blocked;
			this.bot = props.bot;
			this.content = props.content;
			this.content_parsed = props.content_parsed;
			this.nick = props.nick;
			this.author_color = props.author_color;
			this.edited_timestamp = props.edited_timestamp;
			this.timestamp = props.timestamp;
			this.tts = props.tts;
			this.mentions = props.mentions.map((mentionData) => new User_1$1.User(client, mentionData));
			this.mention_everyone = props.mention_everyone;
			this.mention_roles = props.mention_roles;
			this.embeds = props.embeds;
			this.attachments = props.attachments;
			this.author = new User_1$1.User(client, props.author);
			this.pinned = props.pinned;
			this.type = props.type;
		}
	};
	exports.Message = Message;
}));
var require_Channel = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Message_1 = require_Message();
	var Base_1$2 = require_Base();
	var Channel = class extends Base_1$2.Base {
		constructor(client, props) {
			super(client);
			Object.defineProperty(this, "id", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "guild_id", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "name", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "type", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "topic", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "bitrate", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "user_limit", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "position", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "voice_states", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "messages", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.assign(this, props);
			this.id = props.id;
			this.guild_id = props.guild_id;
			this.name = props.name;
			this.type = props.type;
			this.topic = props.topic;
			this.bitrate = props.bitrate;
			this.user_limit = props.user_limit;
			this.position = props.position;
			this.voice_states = props.voice_states;
			this.messages = props.messages?.map((messgeData) => new Message_1.Message(client, messgeData));
		}
	};
	exports.Channel = Channel;
}));
var require_Guild = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Base_1$1 = require_Base();
	var Guild = class extends Base_1$1.Base {
		constructor(client, props) {
			super(client);
			Object.defineProperty(this, "id", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "name", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "icon_url", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "members", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: []
			});
			Object.defineProperty(this, "vanity_url_code", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.assign(this, props);
			this.id = props.id;
			this.name = props.name;
			this.icon_url = props.icon_url;
			this.vanity_url_code = props.vanity_url_code;
		}
	};
	exports.Guild = Guild;
}));
var require_ClientUser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var v10_1$1 = require_v10();
	var VoiceSettings_1 = require_VoiceSettings();
	var Channel_1 = require_Channel();
	var Guild_1 = require_Guild();
	var User_1 = require_User();
	var ActivitySupportedPlatform;
	(function(ActivitySupportedPlatform$1) {
		ActivitySupportedPlatform$1["IOS"] = "ios";
		ActivitySupportedPlatform$1["ANDROID"] = "android";
		ActivitySupportedPlatform$1["WEB"] = "web";
	})(ActivitySupportedPlatform || (exports.ActivitySupportedPlatform = ActivitySupportedPlatform = {}));
	var ActivityPartyPrivacy;
	(function(ActivityPartyPrivacy$1) {
		ActivityPartyPrivacy$1[ActivityPartyPrivacy$1["PRIVATE"] = 0] = "PRIVATE";
		ActivityPartyPrivacy$1[ActivityPartyPrivacy$1["PUBLIC"] = 1] = "PUBLIC";
	})(ActivityPartyPrivacy || (exports.ActivityPartyPrivacy = ActivityPartyPrivacy = {}));
	var StatusDisplayType$1;
	(function(StatusDisplayType$4) {
		StatusDisplayType$4[StatusDisplayType$4["NAME"] = 0] = "NAME";
		StatusDisplayType$4[StatusDisplayType$4["STATE"] = 1] = "STATE";
		StatusDisplayType$4[StatusDisplayType$4["DETAILS"] = 2] = "DETAILS";
	})(StatusDisplayType$1 || (exports.StatusDisplayType = StatusDisplayType$1 = {}));
	var ClientUser = class extends User_1.User {
		async fetchUser(userId) {
			return new User_1.User(this.client, (await this.client.request("GET_USER", { id: userId })).data);
		}
		async fetchGuild(guildId, timeout) {
			return new Guild_1.Guild(this.client, (await this.client.request("GET_GUILD", {
				guild_id: guildId,
				timeout
			})).data);
		}
		async fetchGuilds() {
			return (await this.client.request("GET_GUILDS")).data.guilds.map((guildData) => new Guild_1.Guild(this.client, guildData));
		}
		async fetchChannel(channelId) {
			return new Channel_1.Channel(this.client, (await this.client.request("GET_CHANNEL", { channel_id: channelId })).data);
		}
		async fetchChannels(guildId) {
			return (await this.client.request("GET_CHANNELS", { guild_id: guildId })).data.channels.map((channelData) => new Channel_1.Channel(this.client, channelData));
		}
		async getSelectedVoiceChannel() {
			const response = await this.client.request("GET_SELECTED_VOICE_CHANNEL");
			return response.data !== null ? new Channel_1.Channel(this.client, response.data) : null;
		}
		async selectVoiceChannel(channelId, timeout, force, navigate) {
			return new Channel_1.Channel(this.client, (await this.client.request("SELECT_VOICE_CHANNEL", {
				channel_id: channelId,
				timeout,
				force,
				navigate
			})).data);
		}
		async leaveVoiceChannel(timeout, force) {
			await this.client.request("SELECT_VOICE_CHANNEL", {
				channel_id: null,
				timeout,
				force
			});
		}
		async getVoiceSettings() {
			return new VoiceSettings_1.VoiceSettings(this.client, (await this.client.request("GET_VOICE_SETTINGS")).data);
		}
		async setCeritfiedDevices(devices) {
			await this.client.request("SET_CERTIFIED_DEVICES", { devices });
		}
		async sendJoinInvite(userId) {
			await this.client.request("SEND_ACTIVITY_JOIN_INVITE", { user_id: userId });
		}
		async closeJoinRequest(userId) {
			await this.client.request("CLOSE_ACTIVITY_JOIN_REQUEST", { user_id: userId });
		}
		async selectTextChannel(channelId, timeout) {
			return new Channel_1.Channel(this.client, (await this.client.request("SELECT_TEXT_CHANNEL", {
				channel_id: channelId,
				timeout
			})).data);
		}
		async leaveTextChannel(timeout) {
			await this.client.request("SELECT_TEXT_CHANNEL", {
				channel_id: null,
				timeout
			});
		}
		async getRelationships() {
			return (await this.client.request("GET_RELATIONSHIPS")).data.relationships.map((data) => {
				return new User_1.User(this.client, {
					...data.user,
					presence: data.presence
				});
			});
		}
		async setActivity(activity, pid) {
			const formattedActivity = {
				name: activity.name,
				type: activity.type ?? v10_1$1.ActivityType.Playing,
				created_at: Date.now(),
				instance: !!activity.instance
			};
			if (activity.type === v10_1$1.ActivityType.Streaming && activity.url) formattedActivity.url = activity.url;
			if (activity.details) formattedActivity.details = activity.details;
			if (activity.state) formattedActivity.state = activity.state;
			if (activity.detailsUrl) formattedActivity.details_url = activity.detailsUrl;
			if (activity.stateUrl) formattedActivity.state_url = activity.stateUrl;
			if (activity.startTimestamp || activity.endTimestamp) {
				formattedActivity.timestamps = {};
				if (activity.startTimestamp instanceof Date) formattedActivity.timestamps.start = activity.startTimestamp.getTime();
				else if (typeof activity.startTimestamp === "number") formattedActivity.timestamps.start = activity.startTimestamp;
				if (activity.endTimestamp instanceof Date) formattedActivity.timestamps.end = activity.endTimestamp.getTime();
				else if (typeof activity.endTimestamp === "number") formattedActivity.timestamps.end = activity.endTimestamp;
			}
			if (activity.largeImageKey || activity.smallImageKey || activity.largeImageText || activity.smallImageText || activity.largeImageUrl || activity.smallImageUrl) {
				formattedActivity.assets = {};
				if (activity.largeImageKey) formattedActivity.assets.large_image = activity.largeImageKey;
				if (activity.smallImageKey) formattedActivity.assets.small_image = activity.smallImageKey;
				if (activity.largeImageText) formattedActivity.assets.large_text = activity.largeImageText;
				if (activity.smallImageText) formattedActivity.assets.small_text = activity.smallImageText;
				if (activity.largeImageUrl) formattedActivity.assets.large_url = activity.largeImageUrl;
				if (activity.smallImageUrl) formattedActivity.assets.small_url = activity.smallImageUrl;
			}
			if (activity.statusDisplayType !== void 0) formattedActivity.status_display_type = activity.statusDisplayType;
			if (activity.partyId || activity.partySize || activity.partyMax) {
				formattedActivity.party = {};
				if (activity.partyId) formattedActivity.party.id = activity.partyId;
				if (activity.partySize !== void 0 && activity.partyMax !== void 0) formattedActivity.party.size = [activity.partySize, activity.partyMax];
			}
			if (activity.joinSecret || activity.spectateSecret || activity.matchSecret) {
				formattedActivity.secrets = {};
				if (activity.joinSecret) formattedActivity.secrets.join = activity.joinSecret;
				if (activity.spectateSecret) formattedActivity.secrets.spectate = activity.spectateSecret;
				if (activity.matchSecret) formattedActivity.secrets.match = activity.matchSecret;
			}
			if (activity.buttons?.length) formattedActivity.buttons = activity.buttons;
			if (activity.supportedPlatforms?.length) formattedActivity.supported_platforms = activity.supportedPlatforms;
			return (await this.client.request("SET_ACTIVITY", {
				pid: pid ?? process?.pid ?? 0,
				activity: formattedActivity
			})).data;
		}
		async clearActivity(pid) {
			await this.client.request("SET_ACTIVITY", { pid: pid ?? process ? process.pid ?? 0 : 0 });
		}
		async getImage(userId, format = "png", size = 1024) {
			return (await this.client.request("GET_IMAGE", {
				type: "user",
				id: userId,
				format,
				size
			})).data.data_url;
		}
		async getSoundboardSounds() {
			return (await this.client.request("GET_SOUNDBOARD_SOUNDS")).data;
		}
		async playSoundboardSound(guildId, soundId) {
			return (await this.client.request("PLAY_SOUNDBOARD_SOUND", {
				guild_id: guildId,
				sound_id: soundId
			})).data;
		}
		async toggleVideo() {
			return (await this.client.request("TOGGLE_VIDEO")).data;
		}
		async toggleScreenshare(pid) {
			return (await this.client.request("TOGGLE_SCREENSHARE", { pid })).data;
		}
		async setPushToTalk(active) {
			return (await this.client.request("PUSH_TO_TALK", { active })).data;
		}
		async setVoiceSettings(req) {
			return (await this.client.request("SET_VOICE_SETTINGS", req)).data;
		}
		async setVoiceSettings2(req) {
			return (await this.client.request("SET_VOICE_SETTINGS_2", req)).data;
		}
		async getChannelPermissions() {
			return (await this.client.request("GET_CHANNEL_PERMISSIONS")).data;
		}
		async getActivityInstanceConnectedParticipants() {
			return (await this.client.request("GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS")).data;
		}
		async navigateToConnections() {
			return (await this.client.request("NAVIGATE_TO_CONNECTIONS")).data;
		}
		async createChanenlInvite(channelId, args) {
			return (await this.client.request("CREATE_CHANNEL_INVITE", {
				channel_id: channelId,
				...args
			})).data;
		}
		async openExternalLink(url) {
			return (await this.client.request("OPEN_EXTERNAL_LINK", { url })).data;
		}
		async getPlatformBehaviors() {
			return (await this.client.request("GET_PLATFORM_BEHAVIORS")).data;
		}
		async getProviderAccessToken(provider, connectionRedirect) {
			return (await this.client.request("GET_PROVIDER_ACCESS_TOKEN", {
				provider,
				connectionRedirect
			})).data;
		}
		async maybeGetProviderAccessToken(provider) {
			return (await this.client.request("MAYBE_GET_PROVIDER_ACCESS_TOKEN", { provider })).data;
		}
		async getSKUS() {
			return (await this.client.request("GET_SKUS")).data;
		}
		async getEntitlements() {
			return (await this.client.request("GET_ENTITLEMENTS")).data;
		}
		async getSKUsEmbedded() {
			return (await this.client.request("GET_SKUS_EMBEDDED")).data;
		}
		async getEntitlementsEmbedded() {
			return (await this.client.request("GET_ENTITLEMENTS_EMBEDDED")).data;
		}
		async encourageHardwareAcceleration() {
			return (await this.client.request("ENCOURAGE_HW_ACCELERATION")).data;
		}
		async captureLog(level, message) {
			return (await this.client.request("CAPTURE_LOG", {
				level,
				message
			})).data;
		}
		async sendAnalyticsEvent(eventName, eventProperties) {
			return (await this.client.request("SEND_ANALYTICS_EVENT", {
				eventName,
				eventProperties
			})).data;
		}
		async getLocale() {
			return (await this.client.request("USER_SETTINGS_GET_LOCALE")).data.locale;
		}
		async getAchievements() {
			return (await this.client.request("GET_USER_ACHIEVEMENTS")).data;
		}
		async setAchievement(achievementId, percentComplete) {
			return (await this.client.request("SET_USER_ACHIEVEMENT", {
				achievement_id: achievementId,
				percent_complete: percentComplete
			})).data;
		}
		async createNetworkingToken() {
			return (await this.client.request("NETWORKING_CREATE_TOKEN")).data;
		}
		async networkingPeerMetrics() {
			return (await this.client.request("NETWORKING_PEER_METRICS")).data;
		}
		async networkingSystemMetrics() {
			return (await this.client.request("NETWORKING_SYSTEM_METRICS")).data;
		}
		async getNetworkingConfig() {
			return (await this.client.request("GET_NETWORKING_CONFIG")).data;
		}
		async startPurchase(skuId, pid) {
			return (await this.client.request("START_PURCHASE", {
				sku_id: skuId,
				pid
			})).data;
		}
		async startPremiumPurchase(pid) {
			return (await this.client.request("START_PREMIUM_PURCHASE", { pid })).data;
		}
		async getApplicationTicket() {
			return (await this.client.request("GET_APPLICATION_TICKET")).data;
		}
		async getEntitlementTicket() {
			return (await this.client.request("GET_ENTITLEMENT_TICKET")).data;
		}
		async validateApplication() {
			return (await this.client.request("VALIDATE_APPLICATION")).data;
		}
		async openOverlayVoiceSettings(pid) {
			return (await this.client.request("OPEN_OVERLAY_VOICE_SETTINGS", { pid })).data;
		}
		async openOverlayGuildInvite(code, pid) {
			return (await this.client.request("OPEN_OVERLAY_GUILD_INVITE", {
				code,
				pid
			})).data;
		}
		async openOverlayActivityInvite(type, pid) {
			return (await this.client.request("OPEN_OVERLAY_ACTIVITY_INVITE", {
				type: { JOIN: 0 }[type],
				pid
			})).data;
		}
		async setOverlayLocked(locked, pid) {
			return (await this.client.request("SET_OVERLAY_LOCKED", {
				locked,
				pid
			})).data;
		}
		async browserHandoff() {
			return (await this.client.request("BROWSER_HANDOFF")).data;
		}
		async openGuildTemplateBrowser(code) {
			return (await this.client.request("GUILD_TEMPLATE_BROWSER", { code })).data;
		}
		async openGiftCodeBrowser(code) {
			return (await this.client.request("GIFT_CODE_BROWSER", { code })).data;
		}
		async brainTreePopupBridgeCallback(state, path, query) {
			return (await this.client.request("BRAINTREE_POPUP_BRIDGE_CALLBACK", {
				state,
				path,
				query
			})).data;
		}
		async billingPopupBridgeCallback(state, path, query, paymentSourceType) {
			return (await this.client.request("BILLING_POPUP_BRIDGE_CALLBACK", {
				state,
				path,
				query,
				payment_source_type: paymentSourceType
			})).data;
		}
		async connectionsCallback(providerType, code, openIdParams, state) {
			return (await this.client.request("CONNECTIONS_CALLBACK", {
				providerType,
				code,
				open_id_params: openIdParams,
				state
			})).data;
		}
		async deepLink(type, params) {
			return (await this.client.request("DEEP_LINK", {
				type,
				params
			})).data;
		}
		async inviteBrowser(code) {
			return (await this.client.request("INVITE_BROWSER", { code })).data;
		}
		async initiateImageUpload() {
			return (await this.client.request("INITIATE_IMAGE_UPLOAD")).data;
		}
		async openShareMomentDialog(mediaUrl) {
			return (await this.client.request("OPEN_SHARE_MOMENT_DIALOG", { mediaUrl })).data;
		}
		async openInviteDialog() {
			return (await this.client.request("OPEN_INVITE_DIALOG")).data;
		}
		async acceptActivityInvite(type, userId, sessionId, channelId, messageId) {
			return (await this.client.request("ACCEPT_ACTIVITY_INVITE", {
				type: { JOIN: 0 }[type],
				user_id: userId,
				session_id: sessionId,
				channel_id: channelId,
				message_id: messageId
			})).data;
		}
		async activityInviteUser(userId, type, content, pid) {
			return (await this.client.request("ACTIVITY_INVITE_USER", {
				user_id: userId,
				type: { JOIN: 0 }[type],
				content,
				pid
			})).data;
		}
		async closeActivityJoinRequest(userId) {
			return (await this.client.request("CLOSE_ACTIVITY_JOIN_REQUEST", { user_id: userId })).data;
		}
		async sendActivityJoinInvite(userId, pid) {
			return (await this.client.request("SEND_ACTIVITY_JOIN_INVITE", {
				user_id: userId,
				pid
			})).data;
		}
		async setConfig(useInteractivePip) {
			return (await this.client.request("SET_CONFIG", { use_interactive_pip: useInteractivePip })).data;
		}
	};
	exports.ClientUser = ClientUser;
}));
var require_dist$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp$4 = Object.defineProperty;
	var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$2 = Object.getOwnPropertyNames;
	var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
	var __name$4 = (target, value) => __defProp$4(target, "name", {
		value,
		configurable: true
	});
	var __export$2 = (target, all) => {
		for (var name in all) __defProp$4(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$2 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$2(from)) if (!__hasOwnProp$2.call(to, key) && key !== except) __defProp$4(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$2(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$2 = (mod$7) => __copyProps$2(__defProp$4({}, "__esModule", { value: true }), mod$7);
	var src_exports$2 = {};
	__export$2(src_exports$2, {
		calculateShardId: () => calculateShardId,
		getUserAgentAppendix: () => getUserAgentAppendix,
		isEquatable: () => isEquatable,
		isJSONEncodable: () => isJSONEncodable,
		lazy: () => lazy,
		polyfillDispose: () => polyfillDispose,
		range: () => range,
		shouldUseGlobalFetchAndWebSocket: () => shouldUseGlobalFetchAndWebSocket,
		version: () => version$2
	});
	module.exports = __toCommonJS$2(src_exports$2);
	function lazy(cb) {
		let defaultValue;
		return () => defaultValue ??= cb();
	}
	__name$4(lazy, "lazy");
	function* range(range2) {
		let rangeEnd;
		let start = 0;
		let step = 1;
		if (typeof range2 === "number") rangeEnd = range2;
		else {
			start = range2.start;
			rangeEnd = range2.end;
			step = range2.step ?? 1;
		}
		for (let index = start; index < rangeEnd; index += step) yield index;
	}
	__name$4(range, "range");
	function calculateShardId(guildId, shardCount) {
		return Number(BigInt(guildId) >> 22n) % shardCount;
	}
	__name$4(calculateShardId, "calculateShardId");
	function shouldUseGlobalFetchAndWebSocket() {
		if (typeof globalThis.process === "undefined") return "fetch" in globalThis && "WebSocket" in globalThis;
		if ("versions" in globalThis.process) return "deno" in globalThis.process.versions || "bun" in globalThis.process.versions;
		return false;
	}
	__name$4(shouldUseGlobalFetchAndWebSocket, "shouldUseGlobalFetchAndWebSocket");
	function getUserAgentAppendix() {
		if (typeof globalThis.EdgeRuntime !== "undefined") return "Vercel-Edge-Functions";
		if (typeof globalThis.R2 !== "undefined" && typeof globalThis.WebSocketPair !== "undefined") return "Cloudflare-Workers";
		if (typeof globalThis.Netlify !== "undefined") return "Netlify-Edge-Functions";
		if (typeof globalThis.process !== "object") {
			if (typeof globalThis.navigator === "object") return globalThis.navigator.userAgent;
			return "UnknownEnvironment";
		}
		if ("versions" in globalThis.process) {
			if ("deno" in globalThis.process.versions) return `Deno/${globalThis.process.versions.deno}`;
			if ("bun" in globalThis.process.versions) return `Bun/${globalThis.process.versions.bun}`;
			if ("node" in globalThis.process.versions) return `Node.js/${globalThis.process.versions.node}`;
		}
		return "UnknownEnvironment";
	}
	__name$4(getUserAgentAppendix, "getUserAgentAppendix");
	function polyfillDispose() {
		Symbol.dispose ??= Symbol("Symbol.dispose");
		Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
	}
	__name$4(polyfillDispose, "polyfillDispose");
	function isJSONEncodable(maybeEncodable) {
		return maybeEncodable !== null && typeof maybeEncodable === "object" && "toJSON" in maybeEncodable;
	}
	__name$4(isJSONEncodable, "isJSONEncodable");
	function isEquatable(maybeEquatable) {
		return maybeEquatable !== null && typeof maybeEquatable === "object" && "equals" in maybeEquatable;
	}
	__name$4(isEquatable, "isEquatable");
	var version$2 = "1.1.1";
}));
var require_symbols$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		kClose: Symbol("close"),
		kDestroy: Symbol("destroy"),
		kDispatch: Symbol("dispatch"),
		kUrl: Symbol("url"),
		kWriting: Symbol("writing"),
		kResuming: Symbol("resuming"),
		kQueue: Symbol("queue"),
		kConnect: Symbol("connect"),
		kConnecting: Symbol("connecting"),
		kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
		kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
		kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
		kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
		kKeepAlive: Symbol("keep alive"),
		kHeadersTimeout: Symbol("headers timeout"),
		kBodyTimeout: Symbol("body timeout"),
		kServerName: Symbol("server name"),
		kLocalAddress: Symbol("local address"),
		kHost: Symbol("host"),
		kNoRef: Symbol("no ref"),
		kBodyUsed: Symbol("used"),
		kBody: Symbol("abstracted request body"),
		kRunning: Symbol("running"),
		kBlocking: Symbol("blocking"),
		kPending: Symbol("pending"),
		kSize: Symbol("size"),
		kBusy: Symbol("busy"),
		kQueued: Symbol("queued"),
		kFree: Symbol("free"),
		kConnected: Symbol("connected"),
		kClosed: Symbol("closed"),
		kNeedDrain: Symbol("need drain"),
		kReset: Symbol("reset"),
		kDestroyed: Symbol.for("nodejs.stream.destroyed"),
		kResume: Symbol("resume"),
		kOnError: Symbol("on error"),
		kMaxHeadersSize: Symbol("max headers size"),
		kRunningIdx: Symbol("running index"),
		kPendingIdx: Symbol("pending index"),
		kError: Symbol("error"),
		kClients: Symbol("clients"),
		kClient: Symbol("client"),
		kParser: Symbol("parser"),
		kOnDestroyed: Symbol("destroy callbacks"),
		kPipelining: Symbol("pipelining"),
		kSocket: Symbol("socket"),
		kHostHeader: Symbol("host header"),
		kConnector: Symbol("connector"),
		kStrictContentLength: Symbol("strict content length"),
		kMaxRedirections: Symbol("maxRedirections"),
		kMaxRequests: Symbol("maxRequestsPerClient"),
		kProxy: Symbol("proxy agent options"),
		kCounter: Symbol("socket request counter"),
		kInterceptors: Symbol("dispatch interceptors"),
		kMaxResponseSize: Symbol("max response size"),
		kHTTP2Session: Symbol("http2Session"),
		kHTTP2SessionState: Symbol("http2Session state"),
		kRetryHandlerDefaultRetry: Symbol("retry agent default retry"),
		kConstruct: Symbol("constructable"),
		kListeners: Symbol("listeners"),
		kHTTPContext: Symbol("http context"),
		kMaxConcurrentStreams: Symbol("max concurrent streams"),
		kNoProxyAgent: Symbol("no proxy agent"),
		kHttpProxyAgent: Symbol("http proxy agent"),
		kHttpsProxyAgent: Symbol("https proxy agent")
	};
}));
var require_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var UndiciError$2 = class extends Error {
		constructor(message) {
			super(message);
			this.name = "UndiciError";
			this.code = "UND_ERR";
		}
	};
	var ConnectTimeoutError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "ConnectTimeoutError";
			this.message = message || "Connect Timeout Error";
			this.code = "UND_ERR_CONNECT_TIMEOUT";
		}
	};
	var HeadersTimeoutError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "HeadersTimeoutError";
			this.message = message || "Headers Timeout Error";
			this.code = "UND_ERR_HEADERS_TIMEOUT";
		}
	};
	var HeadersOverflowError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "HeadersOverflowError";
			this.message = message || "Headers Overflow Error";
			this.code = "UND_ERR_HEADERS_OVERFLOW";
		}
	};
	var BodyTimeoutError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "BodyTimeoutError";
			this.message = message || "Body Timeout Error";
			this.code = "UND_ERR_BODY_TIMEOUT";
		}
	};
	var ResponseStatusCodeError$1 = class extends UndiciError$2 {
		constructor(message, statusCode, headers, body) {
			super(message);
			this.name = "ResponseStatusCodeError";
			this.message = message || "Response Status Code Error";
			this.code = "UND_ERR_RESPONSE_STATUS_CODE";
			this.body = body;
			this.status = statusCode;
			this.statusCode = statusCode;
			this.headers = headers;
		}
	};
	var InvalidArgumentError$24 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "InvalidArgumentError";
			this.message = message || "Invalid Argument Error";
			this.code = "UND_ERR_INVALID_ARG";
		}
	};
	var InvalidReturnValueError$2 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "InvalidReturnValueError";
			this.message = message || "Invalid Return Value Error";
			this.code = "UND_ERR_INVALID_RETURN_VALUE";
		}
	};
	var AbortError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "AbortError";
			this.message = message || "The operation was aborted";
		}
	};
	var RequestAbortedError$8 = class extends AbortError$1 {
		constructor(message) {
			super(message);
			this.name = "AbortError";
			this.message = message || "Request aborted";
			this.code = "UND_ERR_ABORTED";
		}
	};
	var InformationalError$4 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "InformationalError";
			this.message = message || "Request information";
			this.code = "UND_ERR_INFO";
		}
	};
	var RequestContentLengthMismatchError$2 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "RequestContentLengthMismatchError";
			this.message = message || "Request body length does not match content-length header";
			this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
		}
	};
	var ResponseContentLengthMismatchError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "ResponseContentLengthMismatchError";
			this.message = message || "Response body length does not match content-length header";
			this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
		}
	};
	var ClientDestroyedError$2 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "ClientDestroyedError";
			this.message = message || "The client is destroyed";
			this.code = "UND_ERR_DESTROYED";
		}
	};
	var ClientClosedError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "ClientClosedError";
			this.message = message || "The client is closed";
			this.code = "UND_ERR_CLOSED";
		}
	};
	var SocketError$4 = class extends UndiciError$2 {
		constructor(message, socket) {
			super(message);
			this.name = "SocketError";
			this.message = message || "Socket error";
			this.code = "UND_ERR_SOCKET";
			this.socket = socket;
		}
	};
	var NotSupportedError$2 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "NotSupportedError";
			this.message = message || "Not supported error";
			this.code = "UND_ERR_NOT_SUPPORTED";
		}
	};
	var BalancedPoolMissingUpstreamError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "MissingUpstreamError";
			this.message = message || "No upstream has been added to the BalancedPool";
			this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
		}
	};
	var HTTPParserError$1 = class extends Error {
		constructor(message, code, data) {
			super(message);
			this.name = "HTTPParserError";
			this.code = code ? `HPE_${code}` : void 0;
			this.data = data ? data.toString() : void 0;
		}
	};
	var ResponseExceededMaxSizeError$1 = class extends UndiciError$2 {
		constructor(message) {
			super(message);
			this.name = "ResponseExceededMaxSizeError";
			this.message = message || "Response content exceeded max size";
			this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE";
		}
	};
	var RequestRetryError$1 = class extends UndiciError$2 {
		constructor(message, code, { headers, data }) {
			super(message);
			this.name = "RequestRetryError";
			this.message = message || "Request retry error";
			this.code = "UND_ERR_REQ_RETRY";
			this.statusCode = code;
			this.data = data;
			this.headers = headers;
		}
	};
	var ResponseError = class extends UndiciError$2 {
		constructor(message, code, { headers, data }) {
			super(message);
			this.name = "ResponseError";
			this.message = message || "Response error";
			this.code = "UND_ERR_RESPONSE";
			this.statusCode = code;
			this.data = data;
			this.headers = headers;
		}
	};
	var SecureProxyConnectionError$1 = class extends UndiciError$2 {
		constructor(cause, message, options) {
			super(message, {
				cause,
				...options ?? {}
			});
			this.name = "SecureProxyConnectionError";
			this.message = message || "Secure Proxy Connection failed";
			this.code = "UND_ERR_PRX_TLS";
			this.cause = cause;
		}
	};
	module.exports = {
		AbortError: AbortError$1,
		HTTPParserError: HTTPParserError$1,
		UndiciError: UndiciError$2,
		HeadersTimeoutError: HeadersTimeoutError$1,
		HeadersOverflowError: HeadersOverflowError$1,
		BodyTimeoutError: BodyTimeoutError$1,
		RequestContentLengthMismatchError: RequestContentLengthMismatchError$2,
		ConnectTimeoutError: ConnectTimeoutError$1,
		ResponseStatusCodeError: ResponseStatusCodeError$1,
		InvalidArgumentError: InvalidArgumentError$24,
		InvalidReturnValueError: InvalidReturnValueError$2,
		RequestAbortedError: RequestAbortedError$8,
		ClientDestroyedError: ClientDestroyedError$2,
		ClientClosedError: ClientClosedError$1,
		InformationalError: InformationalError$4,
		SocketError: SocketError$4,
		NotSupportedError: NotSupportedError$2,
		ResponseContentLengthMismatchError: ResponseContentLengthMismatchError$1,
		BalancedPoolMissingUpstreamError: BalancedPoolMissingUpstreamError$1,
		ResponseExceededMaxSizeError: ResponseExceededMaxSizeError$1,
		RequestRetryError: RequestRetryError$1,
		ResponseError,
		SecureProxyConnectionError: SecureProxyConnectionError$1
	};
}));
var require_constants$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var headerNameLowerCasedRecord$3 = {};
	var wellknownHeaderNames$1 = [
		"Accept",
		"Accept-Encoding",
		"Accept-Language",
		"Accept-Ranges",
		"Access-Control-Allow-Credentials",
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Methods",
		"Access-Control-Allow-Origin",
		"Access-Control-Expose-Headers",
		"Access-Control-Max-Age",
		"Access-Control-Request-Headers",
		"Access-Control-Request-Method",
		"Age",
		"Allow",
		"Alt-Svc",
		"Alt-Used",
		"Authorization",
		"Cache-Control",
		"Clear-Site-Data",
		"Connection",
		"Content-Disposition",
		"Content-Encoding",
		"Content-Language",
		"Content-Length",
		"Content-Location",
		"Content-Range",
		"Content-Security-Policy",
		"Content-Security-Policy-Report-Only",
		"Content-Type",
		"Cookie",
		"Cross-Origin-Embedder-Policy",
		"Cross-Origin-Opener-Policy",
		"Cross-Origin-Resource-Policy",
		"Date",
		"Device-Memory",
		"Downlink",
		"ECT",
		"ETag",
		"Expect",
		"Expect-CT",
		"Expires",
		"Forwarded",
		"From",
		"Host",
		"If-Match",
		"If-Modified-Since",
		"If-None-Match",
		"If-Range",
		"If-Unmodified-Since",
		"Keep-Alive",
		"Last-Modified",
		"Link",
		"Location",
		"Max-Forwards",
		"Origin",
		"Permissions-Policy",
		"Pragma",
		"Proxy-Authenticate",
		"Proxy-Authorization",
		"RTT",
		"Range",
		"Referer",
		"Referrer-Policy",
		"Refresh",
		"Retry-After",
		"Sec-WebSocket-Accept",
		"Sec-WebSocket-Extensions",
		"Sec-WebSocket-Key",
		"Sec-WebSocket-Protocol",
		"Sec-WebSocket-Version",
		"Server",
		"Server-Timing",
		"Service-Worker-Allowed",
		"Service-Worker-Navigation-Preload",
		"Set-Cookie",
		"SourceMap",
		"Strict-Transport-Security",
		"Supports-Loading-Mode",
		"TE",
		"Timing-Allow-Origin",
		"Trailer",
		"Transfer-Encoding",
		"Upgrade",
		"Upgrade-Insecure-Requests",
		"User-Agent",
		"Vary",
		"Via",
		"WWW-Authenticate",
		"X-Content-Type-Options",
		"X-DNS-Prefetch-Control",
		"X-Frame-Options",
		"X-Permitted-Cross-Domain-Policies",
		"X-Powered-By",
		"X-Requested-With",
		"X-XSS-Protection"
	];
	for (let i = 0; i < wellknownHeaderNames$1.length; ++i) {
		const key = wellknownHeaderNames$1[i];
		const lowerCasedKey = key.toLowerCase();
		headerNameLowerCasedRecord$3[key] = headerNameLowerCasedRecord$3[lowerCasedKey] = lowerCasedKey;
	}
	Object.setPrototypeOf(headerNameLowerCasedRecord$3, null);
	module.exports = {
		wellknownHeaderNames: wellknownHeaderNames$1,
		headerNameLowerCasedRecord: headerNameLowerCasedRecord$3
	};
}));
var require_tree$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { wellknownHeaderNames, headerNameLowerCasedRecord: headerNameLowerCasedRecord$2 } = require_constants$4();
	var TstNode = class TstNode {
		value = null;
		left = null;
		middle = null;
		right = null;
		code;
		constructor(key, value, index) {
			if (index === void 0 || index >= key.length) throw new TypeError("Unreachable");
			if ((this.code = key.charCodeAt(index)) > 127) throw new TypeError("key must be ascii string");
			if (key.length !== ++index) this.middle = new TstNode(key, value, index);
			else this.value = value;
		}
		add(key, value) {
			const length = key.length;
			if (length === 0) throw new TypeError("Unreachable");
			let index = 0;
			let node = this;
			while (true) {
				const code = key.charCodeAt(index);
				if (code > 127) throw new TypeError("key must be ascii string");
				if (node.code === code) if (length === ++index) {
					node.value = value;
					break;
				} else if (node.middle !== null) node = node.middle;
				else {
					node.middle = new TstNode(key, value, index);
					break;
				}
				else if (node.code < code) if (node.left !== null) node = node.left;
				else {
					node.left = new TstNode(key, value, index);
					break;
				}
				else if (node.right !== null) node = node.right;
				else {
					node.right = new TstNode(key, value, index);
					break;
				}
			}
		}
		search(key) {
			const keylength = key.length;
			let index = 0;
			let node = this;
			while (node !== null && index < keylength) {
				let code = key[index];
				if (code <= 90 && code >= 65) code |= 32;
				while (node !== null) {
					if (code === node.code) {
						if (keylength === ++index) return node;
						node = node.middle;
						break;
					}
					node = node.code < code ? node.left : node.right;
				}
			}
			return null;
		}
	};
	var TernarySearchTree = class {
		node = null;
		insert(key, value) {
			if (this.node === null) this.node = new TstNode(key, value, 0);
			else this.node.add(key, value);
		}
		lookup(key) {
			return this.node?.search(key)?.value ?? null;
		}
	};
	var tree$2 = new TernarySearchTree();
	for (let i = 0; i < wellknownHeaderNames.length; ++i) {
		const key = headerNameLowerCasedRecord$2[wellknownHeaderNames[i]];
		tree$2.insert(key, key);
	}
	module.exports = {
		TernarySearchTree,
		tree: tree$2
	};
}));
var require_util$7 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$26 = __require("node:assert");
	var { kDestroyed: kDestroyed$2, kBodyUsed: kBodyUsed$1, kListeners, kBody: kBody$2 } = require_symbols$4();
	var { IncomingMessage } = __require("node:http");
	var stream$1 = __require("node:stream");
	var net$3 = __require("node:net");
	var { Blob: Blob$3 } = __require("node:buffer");
	var nodeUtil$3 = __require("node:util");
	var { stringify: stringify$2 } = __require("node:querystring");
	var { EventEmitter: EE$2 } = __require("node:events");
	var { InvalidArgumentError: InvalidArgumentError$23 } = require_errors();
	var { headerNameLowerCasedRecord: headerNameLowerCasedRecord$1 } = require_constants$4();
	var { tree: tree$1 } = require_tree$1();
	var [nodeMajor, nodeMinor] = process.versions.node.split(".").map((v) => Number(v));
	var BodyAsyncIterable$1 = class {
		constructor(body) {
			this[kBody$2] = body;
			this[kBodyUsed$1] = false;
		}
		async *[Symbol.asyncIterator]() {
			assert$26(!this[kBodyUsed$1], "disturbed");
			this[kBodyUsed$1] = true;
			yield* this[kBody$2];
		}
	};
	function wrapRequestBody$1(body) {
		if (isStream$1(body)) {
			if (bodyLength(body) === 0) body.on("data", function() {
				assert$26(false);
			});
			if (typeof body.readableDidRead !== "boolean") {
				body[kBodyUsed$1] = false;
				EE$2.prototype.on.call(body, "data", function() {
					this[kBodyUsed$1] = true;
				});
			}
			return body;
		} else if (body && typeof body.pipeTo === "function") return new BodyAsyncIterable$1(body);
		else if (body && typeof body !== "string" && !ArrayBuffer.isView(body) && isIterable$1(body)) return new BodyAsyncIterable$1(body);
		else return body;
	}
	function nop() {}
	function isStream$1(obj) {
		return obj && typeof obj === "object" && typeof obj.pipe === "function" && typeof obj.on === "function";
	}
	function isBlobLike$7(object) {
		if (object === null) return false;
		else if (object instanceof Blob$3) return true;
		else if (typeof object !== "object") return false;
		else {
			const sTag = object[Symbol.toStringTag];
			return (sTag === "Blob" || sTag === "File") && ("stream" in object && typeof object.stream === "function" || "arrayBuffer" in object && typeof object.arrayBuffer === "function");
		}
	}
	function buildURL$3(url, queryParams) {
		if (url.includes("?") || url.includes("#")) throw new Error("Query params cannot be passed when url already contains \"?\" or \"#\".");
		const stringified = stringify$2(queryParams);
		if (stringified) url += "?" + stringified;
		return url;
	}
	function isValidPort(port) {
		const value = parseInt(port, 10);
		return value === Number(port) && value >= 0 && value <= 65535;
	}
	function isHttpOrHttpsPrefixed(value) {
		return value != null && value[0] === "h" && value[1] === "t" && value[2] === "t" && value[3] === "p" && (value[4] === ":" || value[4] === "s" && value[5] === ":");
	}
	function parseURL(url) {
		if (typeof url === "string") {
			url = new URL(url);
			if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) throw new InvalidArgumentError$23("Invalid URL protocol: the URL must start with `http:` or `https:`.");
			return url;
		}
		if (!url || typeof url !== "object") throw new InvalidArgumentError$23("Invalid URL: The URL argument must be a non-null object.");
		if (!(url instanceof URL)) {
			if (url.port != null && url.port !== "" && isValidPort(url.port) === false) throw new InvalidArgumentError$23("Invalid URL: port must be a valid integer or a string representation of an integer.");
			if (url.path != null && typeof url.path !== "string") throw new InvalidArgumentError$23("Invalid URL path: the path must be a string or null/undefined.");
			if (url.pathname != null && typeof url.pathname !== "string") throw new InvalidArgumentError$23("Invalid URL pathname: the pathname must be a string or null/undefined.");
			if (url.hostname != null && typeof url.hostname !== "string") throw new InvalidArgumentError$23("Invalid URL hostname: the hostname must be a string or null/undefined.");
			if (url.origin != null && typeof url.origin !== "string") throw new InvalidArgumentError$23("Invalid URL origin: the origin must be a string or null/undefined.");
			if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) throw new InvalidArgumentError$23("Invalid URL protocol: the URL must start with `http:` or `https:`.");
			const port = url.port != null ? url.port : url.protocol === "https:" ? 443 : 80;
			let origin = url.origin != null ? url.origin : `${url.protocol || ""}//${url.hostname || ""}:${port}`;
			let path = url.path != null ? url.path : `${url.pathname || ""}${url.search || ""}`;
			if (origin[origin.length - 1] === "/") origin = origin.slice(0, origin.length - 1);
			if (path && path[0] !== "/") path = `/${path}`;
			return new URL(`${origin}${path}`);
		}
		if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) throw new InvalidArgumentError$23("Invalid URL protocol: the URL must start with `http:` or `https:`.");
		return url;
	}
	function parseOrigin$1(url) {
		url = parseURL(url);
		if (url.pathname !== "/" || url.search || url.hash) throw new InvalidArgumentError$23("invalid url");
		return url;
	}
	function getHostname(host) {
		if (host[0] === "[") {
			const idx$1 = host.indexOf("]");
			assert$26(idx$1 !== -1);
			return host.substring(1, idx$1);
		}
		const idx = host.indexOf(":");
		if (idx === -1) return host;
		return host.substring(0, idx);
	}
	function getServerName$1(host) {
		if (!host) return null;
		assert$26(typeof host === "string");
		const servername = getHostname(host);
		if (net$3.isIP(servername)) return "";
		return servername;
	}
	function deepClone(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
	function isAsyncIterable(obj) {
		return !!(obj != null && typeof obj[Symbol.asyncIterator] === "function");
	}
	function isIterable$1(obj) {
		return !!(obj != null && (typeof obj[Symbol.iterator] === "function" || typeof obj[Symbol.asyncIterator] === "function"));
	}
	function bodyLength(body) {
		if (body == null) return 0;
		else if (isStream$1(body)) {
			const state = body._readableState;
			return state && state.objectMode === false && state.ended === true && Number.isFinite(state.length) ? state.length : null;
		} else if (isBlobLike$7(body)) return body.size != null ? body.size : null;
		else if (isBuffer$1(body)) return body.byteLength;
		return null;
	}
	function isDestroyed(body) {
		return body && !!(body.destroyed || body[kDestroyed$2] || stream$1.isDestroyed?.(body));
	}
	function destroy$1(stream$2, err) {
		if (stream$2 == null || !isStream$1(stream$2) || isDestroyed(stream$2)) return;
		if (typeof stream$2.destroy === "function") {
			if (Object.getPrototypeOf(stream$2).constructor === IncomingMessage) stream$2.socket = null;
			stream$2.destroy(err);
		} else if (err) queueMicrotask(() => {
			stream$2.emit("error", err);
		});
		if (stream$2.destroyed !== true) stream$2[kDestroyed$2] = true;
	}
	var KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
	function parseKeepAliveTimeout(val) {
		const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
		return m ? parseInt(m[1], 10) * 1e3 : null;
	}
	function headerNameToString(value) {
		return typeof value === "string" ? headerNameLowerCasedRecord$1[value] ?? value.toLowerCase() : tree$1.lookup(value) ?? value.toString("latin1").toLowerCase();
	}
	function bufferToLowerCasedHeaderName$2(value) {
		return tree$1.lookup(value) ?? value.toString("latin1").toLowerCase();
	}
	function parseHeaders$1(headers, obj) {
		if (obj === void 0) obj = {};
		for (let i = 0; i < headers.length; i += 2) {
			const key = headerNameToString(headers[i]);
			let val = obj[key];
			if (val) {
				if (typeof val === "string") {
					val = [val];
					obj[key] = val;
				}
				val.push(headers[i + 1].toString("utf8"));
			} else {
				const headersValue = headers[i + 1];
				if (typeof headersValue === "string") obj[key] = headersValue;
				else obj[key] = Array.isArray(headersValue) ? headersValue.map((x) => x.toString("utf8")) : headersValue.toString("utf8");
			}
		}
		if ("content-length" in obj && "content-disposition" in obj) obj["content-disposition"] = Buffer.from(obj["content-disposition"]).toString("latin1");
		return obj;
	}
	function parseRawHeaders(headers) {
		const len = headers.length;
		const ret = new Array(len);
		let hasContentLength = false;
		let contentDispositionIdx = -1;
		let key;
		let val;
		let kLen = 0;
		for (let n = 0; n < headers.length; n += 2) {
			key = headers[n];
			val = headers[n + 1];
			typeof key !== "string" && (key = key.toString());
			typeof val !== "string" && (val = val.toString("utf8"));
			kLen = key.length;
			if (kLen === 14 && key[7] === "-" && (key === "content-length" || key.toLowerCase() === "content-length")) hasContentLength = true;
			else if (kLen === 19 && key[7] === "-" && (key === "content-disposition" || key.toLowerCase() === "content-disposition")) contentDispositionIdx = n + 1;
			ret[n] = key;
			ret[n + 1] = val;
		}
		if (hasContentLength && contentDispositionIdx !== -1) ret[contentDispositionIdx] = Buffer.from(ret[contentDispositionIdx]).toString("latin1");
		return ret;
	}
	function isBuffer$1(buffer$1) {
		return buffer$1 instanceof Uint8Array || Buffer.isBuffer(buffer$1);
	}
	function validateHandler$1(handler, method, upgrade$1) {
		if (!handler || typeof handler !== "object") throw new InvalidArgumentError$23("handler must be an object");
		if (typeof handler.onConnect !== "function") throw new InvalidArgumentError$23("invalid onConnect method");
		if (typeof handler.onError !== "function") throw new InvalidArgumentError$23("invalid onError method");
		if (typeof handler.onBodySent !== "function" && handler.onBodySent !== void 0) throw new InvalidArgumentError$23("invalid onBodySent method");
		if (upgrade$1 || method === "CONNECT") {
			if (typeof handler.onUpgrade !== "function") throw new InvalidArgumentError$23("invalid onUpgrade method");
		} else {
			if (typeof handler.onHeaders !== "function") throw new InvalidArgumentError$23("invalid onHeaders method");
			if (typeof handler.onData !== "function") throw new InvalidArgumentError$23("invalid onData method");
			if (typeof handler.onComplete !== "function") throw new InvalidArgumentError$23("invalid onComplete method");
		}
	}
	function isDisturbed$3(body) {
		return !!(body && (stream$1.isDisturbed(body) || body[kBodyUsed$1]));
	}
	function isErrored$2(body) {
		return !!(body && stream$1.isErrored(body));
	}
	function isReadable$1(body) {
		return !!(body && stream$1.isReadable(body));
	}
	function getSocketInfo(socket) {
		return {
			localAddress: socket.localAddress,
			localPort: socket.localPort,
			remoteAddress: socket.remoteAddress,
			remotePort: socket.remotePort,
			remoteFamily: socket.remoteFamily,
			timeout: socket.timeout,
			bytesWritten: socket.bytesWritten,
			bytesRead: socket.bytesRead
		};
	}
	function ReadableStreamFrom$3(iterable) {
		let iterator;
		return new ReadableStream({
			async start() {
				iterator = iterable[Symbol.asyncIterator]();
			},
			async pull(controller) {
				const { done, value } = await iterator.next();
				if (done) queueMicrotask(() => {
					controller.close();
					controller.byobRequest?.respond(0);
				});
				else {
					const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
					if (buf.byteLength) controller.enqueue(new Uint8Array(buf));
				}
				return controller.desiredSize > 0;
			},
			async cancel(reason) {
				await iterator.return();
			},
			type: "bytes"
		});
	}
	function isFormDataLike$1(object) {
		return object && typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && object[Symbol.toStringTag] === "FormData";
	}
	function addAbortListener$2(signal, listener) {
		if ("addEventListener" in signal) {
			signal.addEventListener("abort", listener, { once: true });
			return () => signal.removeEventListener("abort", listener);
		}
		signal.addListener("abort", listener);
		return () => signal.removeListener("abort", listener);
	}
	var hasToWellFormed = typeof String.prototype.toWellFormed === "function";
	var hasIsWellFormed = typeof String.prototype.isWellFormed === "function";
	function toUSVString$1(val) {
		return hasToWellFormed ? `${val}`.toWellFormed() : nodeUtil$3.toUSVString(val);
	}
	function isUSVString$1(val) {
		return hasIsWellFormed ? `${val}`.isWellFormed() : toUSVString$1(val) === `${val}`;
	}
	function isTokenCharCode(c) {
		switch (c) {
			case 34:
			case 40:
			case 41:
			case 44:
			case 47:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 91:
			case 92:
			case 93:
			case 123:
			case 125: return false;
			default: return c >= 33 && c <= 126;
		}
	}
	function isValidHTTPToken$3(characters) {
		if (characters.length === 0) return false;
		for (let i = 0; i < characters.length; ++i) if (!isTokenCharCode(characters.charCodeAt(i))) return false;
		return true;
	}
	var headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
	function isValidHeaderValue$3(characters) {
		return !headerCharRegex.test(characters);
	}
	function parseRangeHeader$1(range$1) {
		if (range$1 == null || range$1 === "") return {
			start: 0,
			end: null,
			size: null
		};
		const m = range$1 ? range$1.match(/^bytes (\d+)-(\d+)\/(\d+)?$/) : null;
		return m ? {
			start: parseInt(m[1]),
			end: m[2] ? parseInt(m[2]) : null,
			size: m[3] ? parseInt(m[3]) : null
		} : null;
	}
	function addListener$1(obj, name, listener) {
		(obj[kListeners] ??= []).push([name, listener]);
		obj.on(name, listener);
		return obj;
	}
	function removeAllListeners$1(obj) {
		for (const [name, listener] of obj[kListeners] ?? []) obj.removeListener(name, listener);
		obj[kListeners] = null;
	}
	function errorRequest(client, request$1, err) {
		try {
			request$1.onError(err);
			assert$26(request$1.aborted);
		} catch (err$1) {
			client.emit("error", err$1);
		}
	}
	var kEnumerableProperty$10 = Object.create(null);
	kEnumerableProperty$10.enumerable = true;
	var normalizedMethodRecordsBase$2 = {
		delete: "DELETE",
		DELETE: "DELETE",
		get: "GET",
		GET: "GET",
		head: "HEAD",
		HEAD: "HEAD",
		options: "OPTIONS",
		OPTIONS: "OPTIONS",
		post: "POST",
		POST: "POST",
		put: "PUT",
		PUT: "PUT"
	};
	var normalizedMethodRecords$2 = {
		...normalizedMethodRecordsBase$2,
		patch: "patch",
		PATCH: "PATCH"
	};
	Object.setPrototypeOf(normalizedMethodRecordsBase$2, null);
	Object.setPrototypeOf(normalizedMethodRecords$2, null);
	module.exports = {
		kEnumerableProperty: kEnumerableProperty$10,
		nop,
		isDisturbed: isDisturbed$3,
		isErrored: isErrored$2,
		isReadable: isReadable$1,
		toUSVString: toUSVString$1,
		isUSVString: isUSVString$1,
		isBlobLike: isBlobLike$7,
		parseOrigin: parseOrigin$1,
		parseURL,
		getServerName: getServerName$1,
		isStream: isStream$1,
		isIterable: isIterable$1,
		isAsyncIterable,
		isDestroyed,
		headerNameToString,
		bufferToLowerCasedHeaderName: bufferToLowerCasedHeaderName$2,
		addListener: addListener$1,
		removeAllListeners: removeAllListeners$1,
		errorRequest,
		parseRawHeaders,
		parseHeaders: parseHeaders$1,
		parseKeepAliveTimeout,
		destroy: destroy$1,
		bodyLength,
		deepClone,
		ReadableStreamFrom: ReadableStreamFrom$3,
		isBuffer: isBuffer$1,
		validateHandler: validateHandler$1,
		getSocketInfo,
		isFormDataLike: isFormDataLike$1,
		buildURL: buildURL$3,
		addAbortListener: addAbortListener$2,
		isValidHTTPToken: isValidHTTPToken$3,
		isValidHeaderValue: isValidHeaderValue$3,
		isTokenCharCode,
		parseRangeHeader: parseRangeHeader$1,
		normalizedMethodRecordsBase: normalizedMethodRecordsBase$2,
		normalizedMethodRecords: normalizedMethodRecords$2,
		isValidPort,
		isHttpOrHttpsPrefixed,
		nodeMajor,
		nodeMinor,
		safeHTTPMethods: [
			"GET",
			"HEAD",
			"OPTIONS",
			"TRACE"
		],
		wrapRequestBody: wrapRequestBody$1
	};
}));
var require_diagnostics = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var diagnosticsChannel = __require("node:diagnostics_channel");
	var util$19 = __require("node:util");
	var undiciDebugLog = util$19.debuglog("undici");
	var fetchDebuglog = util$19.debuglog("fetch");
	var websocketDebuglog = util$19.debuglog("websocket");
	var isClientSet = false;
	var channels$5 = {
		beforeConnect: diagnosticsChannel.channel("undici:client:beforeConnect"),
		connected: diagnosticsChannel.channel("undici:client:connected"),
		connectError: diagnosticsChannel.channel("undici:client:connectError"),
		sendHeaders: diagnosticsChannel.channel("undici:client:sendHeaders"),
		create: diagnosticsChannel.channel("undici:request:create"),
		bodySent: diagnosticsChannel.channel("undici:request:bodySent"),
		headers: diagnosticsChannel.channel("undici:request:headers"),
		trailers: diagnosticsChannel.channel("undici:request:trailers"),
		error: diagnosticsChannel.channel("undici:request:error"),
		open: diagnosticsChannel.channel("undici:websocket:open"),
		close: diagnosticsChannel.channel("undici:websocket:close"),
		socketError: diagnosticsChannel.channel("undici:websocket:socket_error"),
		ping: diagnosticsChannel.channel("undici:websocket:ping"),
		pong: diagnosticsChannel.channel("undici:websocket:pong")
	};
	if (undiciDebugLog.enabled || fetchDebuglog.enabled) {
		const debuglog = fetchDebuglog.enabled ? fetchDebuglog : undiciDebugLog;
		diagnosticsChannel.channel("undici:client:beforeConnect").subscribe((evt) => {
			const { connectParams: { version: version$3, protocol: protocol$1, port, host } } = evt;
			debuglog("connecting to %s using %s%s", `${host}${port ? `:${port}` : ""}`, protocol$1, version$3);
		});
		diagnosticsChannel.channel("undici:client:connected").subscribe((evt) => {
			const { connectParams: { version: version$3, protocol: protocol$1, port, host } } = evt;
			debuglog("connected to %s using %s%s", `${host}${port ? `:${port}` : ""}`, protocol$1, version$3);
		});
		diagnosticsChannel.channel("undici:client:connectError").subscribe((evt) => {
			const { connectParams: { version: version$3, protocol: protocol$1, port, host }, error } = evt;
			debuglog("connection to %s using %s%s errored - %s", `${host}${port ? `:${port}` : ""}`, protocol$1, version$3, error.message);
		});
		diagnosticsChannel.channel("undici:client:sendHeaders").subscribe((evt) => {
			const { request: { method, path, origin } } = evt;
			debuglog("sending request to %s %s/%s", method, origin, path);
		});
		diagnosticsChannel.channel("undici:request:headers").subscribe((evt) => {
			const { request: { method, path, origin }, response: { statusCode } } = evt;
			debuglog("received response to %s %s/%s - HTTP %d", method, origin, path, statusCode);
		});
		diagnosticsChannel.channel("undici:request:trailers").subscribe((evt) => {
			const { request: { method, path, origin } } = evt;
			debuglog("trailers received from %s %s/%s", method, origin, path);
		});
		diagnosticsChannel.channel("undici:request:error").subscribe((evt) => {
			const { request: { method, path, origin }, error } = evt;
			debuglog("request to %s %s/%s errored - %s", method, origin, path, error.message);
		});
		isClientSet = true;
	}
	if (websocketDebuglog.enabled) {
		if (!isClientSet) {
			const debuglog = undiciDebugLog.enabled ? undiciDebugLog : websocketDebuglog;
			diagnosticsChannel.channel("undici:client:beforeConnect").subscribe((evt) => {
				const { connectParams: { version: version$3, protocol: protocol$1, port, host } } = evt;
				debuglog("connecting to %s%s using %s%s", host, port ? `:${port}` : "", protocol$1, version$3);
			});
			diagnosticsChannel.channel("undici:client:connected").subscribe((evt) => {
				const { connectParams: { version: version$3, protocol: protocol$1, port, host } } = evt;
				debuglog("connected to %s%s using %s%s", host, port ? `:${port}` : "", protocol$1, version$3);
			});
			diagnosticsChannel.channel("undici:client:connectError").subscribe((evt) => {
				const { connectParams: { version: version$3, protocol: protocol$1, port, host }, error } = evt;
				debuglog("connection to %s%s using %s%s errored - %s", host, port ? `:${port}` : "", protocol$1, version$3, error.message);
			});
			diagnosticsChannel.channel("undici:client:sendHeaders").subscribe((evt) => {
				const { request: { method, path, origin } } = evt;
				debuglog("sending request to %s %s/%s", method, origin, path);
			});
		}
		diagnosticsChannel.channel("undici:websocket:open").subscribe((evt) => {
			const { address: { address, port } } = evt;
			websocketDebuglog("connection opened %s%s", address, port ? `:${port}` : "");
		});
		diagnosticsChannel.channel("undici:websocket:close").subscribe((evt) => {
			const { websocket, code, reason } = evt;
			websocketDebuglog("closed connection to %s - %s %s", websocket.url, code, reason);
		});
		diagnosticsChannel.channel("undici:websocket:socket_error").subscribe((err) => {
			websocketDebuglog("connection errored - %s", err.message);
		});
		diagnosticsChannel.channel("undici:websocket:ping").subscribe((evt) => {
			websocketDebuglog("ping received");
		});
		diagnosticsChannel.channel("undici:websocket:pong").subscribe((evt) => {
			websocketDebuglog("pong received");
		});
	}
	module.exports = { channels: channels$5 };
}));
var require_request$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { InvalidArgumentError: InvalidArgumentError$22, NotSupportedError: NotSupportedError$1 } = require_errors();
	var assert$25 = __require("node:assert");
	var { isValidHTTPToken: isValidHTTPToken$2, isValidHeaderValue: isValidHeaderValue$2, isStream, destroy, isBuffer, isFormDataLike, isIterable, isBlobLike: isBlobLike$6, buildURL: buildURL$2, validateHandler, getServerName, normalizedMethodRecords: normalizedMethodRecords$1 } = require_util$7();
	var { channels: channels$4 } = require_diagnostics();
	var { headerNameLowerCasedRecord } = require_constants$4();
	var invalidPathRegex = /[^\u0021-\u00ff]/;
	var kHandler = Symbol("handler");
	var Request$4 = class {
		constructor(origin, { path, method, body, headers, query, idempotent, blocking, upgrade: upgrade$1, headersTimeout, bodyTimeout, reset, throwOnError, expectContinue, servername }, handler) {
			if (typeof path !== "string") throw new InvalidArgumentError$22("path must be a string");
			else if (path[0] !== "/" && !(path.startsWith("http://") || path.startsWith("https://")) && method !== "CONNECT") throw new InvalidArgumentError$22("path must be an absolute URL or start with a slash");
			else if (invalidPathRegex.test(path)) throw new InvalidArgumentError$22("invalid request path");
			if (typeof method !== "string") throw new InvalidArgumentError$22("method must be a string");
			else if (normalizedMethodRecords$1[method] === void 0 && !isValidHTTPToken$2(method)) throw new InvalidArgumentError$22("invalid request method");
			if (upgrade$1 && typeof upgrade$1 !== "string") throw new InvalidArgumentError$22("upgrade must be a string");
			if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) throw new InvalidArgumentError$22("invalid headersTimeout");
			if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) throw new InvalidArgumentError$22("invalid bodyTimeout");
			if (reset != null && typeof reset !== "boolean") throw new InvalidArgumentError$22("invalid reset");
			if (expectContinue != null && typeof expectContinue !== "boolean") throw new InvalidArgumentError$22("invalid expectContinue");
			this.headersTimeout = headersTimeout;
			this.bodyTimeout = bodyTimeout;
			this.throwOnError = throwOnError === true;
			this.method = method;
			this.abort = null;
			if (body == null) this.body = null;
			else if (isStream(body)) {
				this.body = body;
				const rState = this.body._readableState;
				if (!rState || !rState.autoDestroy) {
					this.endHandler = function autoDestroy() {
						destroy(this);
					};
					this.body.on("end", this.endHandler);
				}
				this.errorHandler = (err) => {
					if (this.abort) this.abort(err);
					else this.error = err;
				};
				this.body.on("error", this.errorHandler);
			} else if (isBuffer(body)) this.body = body.byteLength ? body : null;
			else if (ArrayBuffer.isView(body)) this.body = body.buffer.byteLength ? Buffer.from(body.buffer, body.byteOffset, body.byteLength) : null;
			else if (body instanceof ArrayBuffer) this.body = body.byteLength ? Buffer.from(body) : null;
			else if (typeof body === "string") this.body = body.length ? Buffer.from(body) : null;
			else if (isFormDataLike(body) || isIterable(body) || isBlobLike$6(body)) this.body = body;
			else throw new InvalidArgumentError$22("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
			this.completed = false;
			this.aborted = false;
			this.upgrade = upgrade$1 || null;
			this.path = query ? buildURL$2(path, query) : path;
			this.origin = origin;
			this.idempotent = idempotent == null ? method === "HEAD" || method === "GET" : idempotent;
			this.blocking = blocking == null ? false : blocking;
			this.reset = reset == null ? null : reset;
			this.host = null;
			this.contentLength = null;
			this.contentType = null;
			this.headers = [];
			this.expectContinue = expectContinue != null ? expectContinue : false;
			if (Array.isArray(headers)) {
				if (headers.length % 2 !== 0) throw new InvalidArgumentError$22("headers array must be even");
				for (let i = 0; i < headers.length; i += 2) processHeader(this, headers[i], headers[i + 1]);
			} else if (headers && typeof headers === "object") if (headers[Symbol.iterator]) for (const header of headers) {
				if (!Array.isArray(header) || header.length !== 2) throw new InvalidArgumentError$22("headers must be in key-value pair format");
				processHeader(this, header[0], header[1]);
			}
			else {
				const keys = Object.keys(headers);
				for (let i = 0; i < keys.length; ++i) processHeader(this, keys[i], headers[keys[i]]);
			}
			else if (headers != null) throw new InvalidArgumentError$22("headers must be an object or an array");
			validateHandler(handler, method, upgrade$1);
			this.servername = servername || getServerName(this.host);
			this[kHandler] = handler;
			if (channels$4.create.hasSubscribers) channels$4.create.publish({ request: this });
		}
		onBodySent(chunk) {
			if (this[kHandler].onBodySent) try {
				return this[kHandler].onBodySent(chunk);
			} catch (err) {
				this.abort(err);
			}
		}
		onRequestSent() {
			if (channels$4.bodySent.hasSubscribers) channels$4.bodySent.publish({ request: this });
			if (this[kHandler].onRequestSent) try {
				return this[kHandler].onRequestSent();
			} catch (err) {
				this.abort(err);
			}
		}
		onConnect(abort$1) {
			assert$25(!this.aborted);
			assert$25(!this.completed);
			if (this.error) abort$1(this.error);
			else {
				this.abort = abort$1;
				return this[kHandler].onConnect(abort$1);
			}
		}
		onResponseStarted() {
			return this[kHandler].onResponseStarted?.();
		}
		onHeaders(statusCode, headers, resume$1, statusText) {
			assert$25(!this.aborted);
			assert$25(!this.completed);
			if (channels$4.headers.hasSubscribers) channels$4.headers.publish({
				request: this,
				response: {
					statusCode,
					headers,
					statusText
				}
			});
			try {
				return this[kHandler].onHeaders(statusCode, headers, resume$1, statusText);
			} catch (err) {
				this.abort(err);
			}
		}
		onData(chunk) {
			assert$25(!this.aborted);
			assert$25(!this.completed);
			try {
				return this[kHandler].onData(chunk);
			} catch (err) {
				this.abort(err);
				return false;
			}
		}
		onUpgrade(statusCode, headers, socket) {
			assert$25(!this.aborted);
			assert$25(!this.completed);
			return this[kHandler].onUpgrade(statusCode, headers, socket);
		}
		onComplete(trailers) {
			this.onFinally();
			assert$25(!this.aborted);
			this.completed = true;
			if (channels$4.trailers.hasSubscribers) channels$4.trailers.publish({
				request: this,
				trailers
			});
			try {
				return this[kHandler].onComplete(trailers);
			} catch (err) {
				this.onError(err);
			}
		}
		onError(error) {
			this.onFinally();
			if (channels$4.error.hasSubscribers) channels$4.error.publish({
				request: this,
				error
			});
			if (this.aborted) return;
			this.aborted = true;
			return this[kHandler].onError(error);
		}
		onFinally() {
			if (this.errorHandler) {
				this.body.off("error", this.errorHandler);
				this.errorHandler = null;
			}
			if (this.endHandler) {
				this.body.off("end", this.endHandler);
				this.endHandler = null;
			}
		}
		addHeader(key, value) {
			processHeader(this, key, value);
			return this;
		}
	};
	function processHeader(request$1, key, val) {
		if (val && typeof val === "object" && !Array.isArray(val)) throw new InvalidArgumentError$22(`invalid ${key} header`);
		else if (val === void 0) return;
		let headerName = headerNameLowerCasedRecord[key];
		if (headerName === void 0) {
			headerName = key.toLowerCase();
			if (headerNameLowerCasedRecord[headerName] === void 0 && !isValidHTTPToken$2(headerName)) throw new InvalidArgumentError$22("invalid header key");
		}
		if (Array.isArray(val)) {
			const arr = [];
			for (let i = 0; i < val.length; i++) if (typeof val[i] === "string") {
				if (!isValidHeaderValue$2(val[i])) throw new InvalidArgumentError$22(`invalid ${key} header`);
				arr.push(val[i]);
			} else if (val[i] === null) arr.push("");
			else if (typeof val[i] === "object") throw new InvalidArgumentError$22(`invalid ${key} header`);
			else arr.push(`${val[i]}`);
			val = arr;
		} else if (typeof val === "string") {
			if (!isValidHeaderValue$2(val)) throw new InvalidArgumentError$22(`invalid ${key} header`);
		} else if (val === null) val = "";
		else val = `${val}`;
		if (request$1.host === null && headerName === "host") {
			if (typeof val !== "string") throw new InvalidArgumentError$22("invalid host header");
			request$1.host = val;
		} else if (request$1.contentLength === null && headerName === "content-length") {
			request$1.contentLength = parseInt(val, 10);
			if (!Number.isFinite(request$1.contentLength)) throw new InvalidArgumentError$22("invalid content-length header");
		} else if (request$1.contentType === null && headerName === "content-type") {
			request$1.contentType = val;
			request$1.headers.push(key, val);
		} else if (headerName === "transfer-encoding" || headerName === "keep-alive" || headerName === "upgrade") throw new InvalidArgumentError$22(`invalid ${headerName} header`);
		else if (headerName === "connection") {
			const value = typeof val === "string" ? val.toLowerCase() : null;
			if (value !== "close" && value !== "keep-alive") throw new InvalidArgumentError$22("invalid connection header");
			if (value === "close") request$1.reset = true;
		} else if (headerName === "expect") throw new NotSupportedError$1("expect header not supported");
		else request$1.headers.push(key, val);
	}
	module.exports = Request$4;
}));
var require_dispatcher = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EventEmitter = __require("node:events");
	var Dispatcher$4 = class extends EventEmitter {
		dispatch() {
			throw new Error("not implemented");
		}
		close() {
			throw new Error("not implemented");
		}
		destroy() {
			throw new Error("not implemented");
		}
		compose(...args) {
			const interceptors = Array.isArray(args[0]) ? args[0] : args;
			let dispatch = this.dispatch.bind(this);
			for (const interceptor of interceptors) {
				if (interceptor == null) continue;
				if (typeof interceptor !== "function") throw new TypeError(`invalid interceptor, expected function received ${typeof interceptor}`);
				dispatch = interceptor(dispatch);
				if (dispatch == null || typeof dispatch !== "function" || dispatch.length !== 2) throw new TypeError("invalid interceptor");
			}
			return new ComposedDispatcher(this, dispatch);
		}
	};
	var ComposedDispatcher = class extends Dispatcher$4 {
		#dispatcher = null;
		#dispatch = null;
		constructor(dispatcher, dispatch) {
			super();
			this.#dispatcher = dispatcher;
			this.#dispatch = dispatch;
		}
		dispatch(...args) {
			this.#dispatch(...args);
		}
		close(...args) {
			return this.#dispatcher.close(...args);
		}
		destroy(...args) {
			return this.#dispatcher.destroy(...args);
		}
	};
	module.exports = Dispatcher$4;
}));
var require_dispatcher_base = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Dispatcher$3 = require_dispatcher();
	var { ClientDestroyedError: ClientDestroyedError$1, ClientClosedError, InvalidArgumentError: InvalidArgumentError$21 } = require_errors();
	var { kDestroy: kDestroy$5, kClose: kClose$7, kClosed: kClosed$1, kDestroyed: kDestroyed$1, kDispatch: kDispatch$4, kInterceptors: kInterceptors$5 } = require_symbols$4();
	var kOnDestroyed = Symbol("onDestroyed");
	var kOnClosed = Symbol("onClosed");
	var kInterceptedDispatch = Symbol("Intercepted Dispatch");
	var DispatcherBase$5 = class extends Dispatcher$3 {
		constructor() {
			super();
			this[kDestroyed$1] = false;
			this[kOnDestroyed] = null;
			this[kClosed$1] = false;
			this[kOnClosed] = [];
		}
		get destroyed() {
			return this[kDestroyed$1];
		}
		get closed() {
			return this[kClosed$1];
		}
		get interceptors() {
			return this[kInterceptors$5];
		}
		set interceptors(newInterceptors) {
			if (newInterceptors) {
				for (let i = newInterceptors.length - 1; i >= 0; i--) if (typeof this[kInterceptors$5][i] !== "function") throw new InvalidArgumentError$21("interceptor must be an function");
			}
			this[kInterceptors$5] = newInterceptors;
		}
		close(callback) {
			if (callback === void 0) return new Promise((resolve, reject) => {
				this.close((err, data) => {
					return err ? reject(err) : resolve(data);
				});
			});
			if (typeof callback !== "function") throw new InvalidArgumentError$21("invalid callback");
			if (this[kDestroyed$1]) {
				queueMicrotask(() => callback(new ClientDestroyedError$1(), null));
				return;
			}
			if (this[kClosed$1]) {
				if (this[kOnClosed]) this[kOnClosed].push(callback);
				else queueMicrotask(() => callback(null, null));
				return;
			}
			this[kClosed$1] = true;
			this[kOnClosed].push(callback);
			const onClosed = () => {
				const callbacks = this[kOnClosed];
				this[kOnClosed] = null;
				for (let i = 0; i < callbacks.length; i++) callbacks[i](null, null);
			};
			this[kClose$7]().then(() => this.destroy()).then(() => {
				queueMicrotask(onClosed);
			});
		}
		destroy(err, callback) {
			if (typeof err === "function") {
				callback = err;
				err = null;
			}
			if (callback === void 0) return new Promise((resolve, reject) => {
				this.destroy(err, (err$1, data) => {
					return err$1 ? reject(err$1) : resolve(data);
				});
			});
			if (typeof callback !== "function") throw new InvalidArgumentError$21("invalid callback");
			if (this[kDestroyed$1]) {
				if (this[kOnDestroyed]) this[kOnDestroyed].push(callback);
				else queueMicrotask(() => callback(null, null));
				return;
			}
			if (!err) err = new ClientDestroyedError$1();
			this[kDestroyed$1] = true;
			this[kOnDestroyed] = this[kOnDestroyed] || [];
			this[kOnDestroyed].push(callback);
			const onDestroyed = () => {
				const callbacks = this[kOnDestroyed];
				this[kOnDestroyed] = null;
				for (let i = 0; i < callbacks.length; i++) callbacks[i](null, null);
			};
			this[kDestroy$5](err).then(() => {
				queueMicrotask(onDestroyed);
			});
		}
		[kInterceptedDispatch](opts, handler) {
			if (!this[kInterceptors$5] || this[kInterceptors$5].length === 0) {
				this[kInterceptedDispatch] = this[kDispatch$4];
				return this[kDispatch$4](opts, handler);
			}
			let dispatch = this[kDispatch$4].bind(this);
			for (let i = this[kInterceptors$5].length - 1; i >= 0; i--) dispatch = this[kInterceptors$5][i](dispatch);
			this[kInterceptedDispatch] = dispatch;
			return dispatch(opts, handler);
		}
		dispatch(opts, handler) {
			if (!handler || typeof handler !== "object") throw new InvalidArgumentError$21("handler must be an object");
			try {
				if (!opts || typeof opts !== "object") throw new InvalidArgumentError$21("opts must be an object.");
				if (this[kDestroyed$1] || this[kOnDestroyed]) throw new ClientDestroyedError$1();
				if (this[kClosed$1]) throw new ClientClosedError();
				return this[kInterceptedDispatch](opts, handler);
			} catch (err) {
				if (typeof handler.onError !== "function") throw new InvalidArgumentError$21("invalid onError method");
				handler.onError(err);
				return false;
			}
		}
	};
	module.exports = DispatcherBase$5;
}));
var require_timers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fastNow = 0;
	var RESOLUTION_MS = 1e3;
	var TICK_MS = (RESOLUTION_MS >> 1) - 1;
	var fastNowTimeout;
	var kFastTimer = Symbol("kFastTimer");
	var fastTimers = [];
	var NOT_IN_LIST = -2;
	var TO_BE_CLEARED = -1;
	var PENDING = 0;
	var ACTIVE = 1;
	function onTick() {
		fastNow += TICK_MS;
		let idx = 0;
		let len = fastTimers.length;
		while (idx < len) {
			const timer = fastTimers[idx];
			if (timer._state === 0) {
				timer._idleStart = fastNow - TICK_MS;
				timer._state = ACTIVE;
			} else if (timer._state === 1 && fastNow >= timer._idleStart + timer._idleTimeout) {
				timer._state = TO_BE_CLEARED;
				timer._idleStart = -1;
				timer._onTimeout(timer._timerArg);
			}
			if (timer._state === -1) {
				timer._state = NOT_IN_LIST;
				if (--len !== 0) fastTimers[idx] = fastTimers[len];
			} else ++idx;
		}
		fastTimers.length = len;
		if (fastTimers.length !== 0) refreshTimeout();
	}
	function refreshTimeout() {
		if (fastNowTimeout) fastNowTimeout.refresh();
		else {
			clearTimeout(fastNowTimeout);
			fastNowTimeout = setTimeout(onTick, TICK_MS);
			if (fastNowTimeout.unref) fastNowTimeout.unref();
		}
	}
	var FastTimer = class {
		[kFastTimer] = true;
		_state = NOT_IN_LIST;
		_idleTimeout = -1;
		_idleStart = -1;
		_onTimeout;
		_timerArg;
		constructor(callback, delay$2, arg) {
			this._onTimeout = callback;
			this._idleTimeout = delay$2;
			this._timerArg = arg;
			this.refresh();
		}
		refresh() {
			if (this._state === -2) fastTimers.push(this);
			if (!fastNowTimeout || fastTimers.length === 1) refreshTimeout();
			this._state = PENDING;
		}
		clear() {
			this._state = TO_BE_CLEARED;
			this._idleStart = -1;
		}
	};
	module.exports = {
		setTimeout(callback, delay$2, arg) {
			return delay$2 <= 1e3 ? setTimeout(callback, delay$2, arg) : new FastTimer(callback, delay$2, arg);
		},
		clearTimeout(timeout) {
			if (timeout[kFastTimer]) timeout.clear();
			else clearTimeout(timeout);
		},
		setFastTimeout(callback, delay$2, arg) {
			return new FastTimer(callback, delay$2, arg);
		},
		clearFastTimeout(timeout) {
			timeout.clear();
		},
		now() {
			return fastNow;
		},
		tick(delay$2 = 0) {
			fastNow += delay$2 - RESOLUTION_MS + 1;
			onTick();
			onTick();
		},
		reset() {
			fastNow = 0;
			fastTimers.length = 0;
			clearTimeout(fastNowTimeout);
			fastNowTimeout = null;
		},
		kFastTimer
	};
}));
var require_connect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var net$2 = __require("node:net");
	var assert$24 = __require("node:assert");
	var util$18 = require_util$7();
	var { InvalidArgumentError: InvalidArgumentError$20, ConnectTimeoutError } = require_errors();
	var timers$1 = require_timers();
	function noop$4() {}
	var tls;
	var SessionCache;
	if (global.FinalizationRegistry && !(process.env.NODE_V8_COVERAGE || process.env.UNDICI_NO_FG)) SessionCache = class WeakSessionCache {
		constructor(maxCachedSessions) {
			this._maxCachedSessions = maxCachedSessions;
			this._sessionCache = /* @__PURE__ */ new Map();
			this._sessionRegistry = new global.FinalizationRegistry((key) => {
				if (this._sessionCache.size < this._maxCachedSessions) return;
				const ref = this._sessionCache.get(key);
				if (ref !== void 0 && ref.deref() === void 0) this._sessionCache.delete(key);
			});
		}
		get(sessionKey) {
			const ref = this._sessionCache.get(sessionKey);
			return ref ? ref.deref() : null;
		}
		set(sessionKey, session$1) {
			if (this._maxCachedSessions === 0) return;
			this._sessionCache.set(sessionKey, new WeakRef(session$1));
			this._sessionRegistry.register(session$1, sessionKey);
		}
	};
	else SessionCache = class SimpleSessionCache {
		constructor(maxCachedSessions) {
			this._maxCachedSessions = maxCachedSessions;
			this._sessionCache = /* @__PURE__ */ new Map();
		}
		get(sessionKey) {
			return this._sessionCache.get(sessionKey);
		}
		set(sessionKey, session$1) {
			if (this._maxCachedSessions === 0) return;
			if (this._sessionCache.size >= this._maxCachedSessions) {
				const { value: oldestKey } = this._sessionCache.keys().next();
				this._sessionCache.delete(oldestKey);
			}
			this._sessionCache.set(sessionKey, session$1);
		}
	};
	function buildConnector$4({ allowH2, maxCachedSessions, socketPath, timeout, session: customSession,...opts }) {
		if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) throw new InvalidArgumentError$20("maxCachedSessions must be a positive integer or zero");
		const options = {
			path: socketPath,
			...opts
		};
		const sessionCache = new SessionCache(maxCachedSessions == null ? 100 : maxCachedSessions);
		timeout = timeout == null ? 1e4 : timeout;
		allowH2 = allowH2 != null ? allowH2 : false;
		return function connect$2({ hostname, host, protocol: protocol$1, port, servername, localAddress, httpSocket }, callback) {
			let socket;
			if (protocol$1 === "https:") {
				if (!tls) tls = __require("node:tls");
				servername = servername || options.servername || util$18.getServerName(host) || null;
				const sessionKey = servername || hostname;
				assert$24(sessionKey);
				const session$1 = customSession || sessionCache.get(sessionKey) || null;
				port = port || 443;
				socket = tls.connect({
					highWaterMark: 16384,
					...options,
					servername,
					session: session$1,
					localAddress,
					ALPNProtocols: allowH2 ? ["http/1.1", "h2"] : ["http/1.1"],
					socket: httpSocket,
					port,
					host: hostname
				});
				socket.on("session", function(session$2) {
					sessionCache.set(sessionKey, session$2);
				});
			} else {
				assert$24(!httpSocket, "httpSocket can only be sent on TLS update");
				port = port || 80;
				socket = net$2.connect({
					highWaterMark: 64 * 1024,
					...options,
					localAddress,
					port,
					host: hostname
				});
			}
			if (options.keepAlive == null || options.keepAlive) {
				const keepAliveInitialDelay = options.keepAliveInitialDelay === void 0 ? 6e4 : options.keepAliveInitialDelay;
				socket.setKeepAlive(true, keepAliveInitialDelay);
			}
			const clearConnectTimeout = setupConnectTimeout(new WeakRef(socket), {
				timeout,
				hostname,
				port
			});
			socket.setNoDelay(true).once(protocol$1 === "https:" ? "secureConnect" : "connect", function() {
				queueMicrotask(clearConnectTimeout);
				if (callback) {
					const cb = callback;
					callback = null;
					cb(null, this);
				}
			}).on("error", function(err) {
				queueMicrotask(clearConnectTimeout);
				if (callback) {
					const cb = callback;
					callback = null;
					cb(err);
				}
			});
			return socket;
		};
	}
	var setupConnectTimeout = process.platform === "win32" ? (socketWeakRef, opts) => {
		if (!opts.timeout) return noop$4;
		let s1 = null;
		let s2 = null;
		const fastTimer = timers$1.setFastTimeout(() => {
			s1 = setImmediate(() => {
				s2 = setImmediate(() => onConnectTimeout(socketWeakRef.deref(), opts));
			});
		}, opts.timeout);
		return () => {
			timers$1.clearFastTimeout(fastTimer);
			clearImmediate(s1);
			clearImmediate(s2);
		};
	} : (socketWeakRef, opts) => {
		if (!opts.timeout) return noop$4;
		let s1 = null;
		const fastTimer = timers$1.setFastTimeout(() => {
			s1 = setImmediate(() => {
				onConnectTimeout(socketWeakRef.deref(), opts);
			});
		}, opts.timeout);
		return () => {
			timers$1.clearFastTimeout(fastTimer);
			clearImmediate(s1);
		};
	};
	function onConnectTimeout(socket, opts) {
		if (socket == null) return;
		let message = "Connect Timeout Error";
		if (Array.isArray(socket.autoSelectFamilyAttemptedAddresses)) message += ` (attempted addresses: ${socket.autoSelectFamilyAttemptedAddresses.join(", ")},`;
		else message += ` (attempted address: ${opts.hostname}:${opts.port},`;
		message += ` timeout: ${opts.timeout}ms)`;
		util$18.destroy(socket, new ConnectTimeoutError(message));
	}
	module.exports = buildConnector$4;
}));
var require_utils = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function enumToMap(obj) {
		const res = {};
		Object.keys(obj).forEach((key) => {
			const value = obj[key];
			if (typeof value === "number") res[key] = value;
		});
		return res;
	}
	exports.enumToMap = enumToMap;
}));
var require_constants$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = require_utils();
	(function(ERROR) {
		ERROR[ERROR["OK"] = 0] = "OK";
		ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
		ERROR[ERROR["STRICT"] = 2] = "STRICT";
		ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
		ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
		ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
		ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
		ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
		ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
		ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
		ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
		ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
		ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
		ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
		ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
		ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
		ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
		ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
		ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
		ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
		ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
		ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
		ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
		ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
		ERROR[ERROR["USER"] = 24] = "USER";
	})(exports.ERROR || (exports.ERROR = {}));
	(function(TYPE) {
		TYPE[TYPE["BOTH"] = 0] = "BOTH";
		TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
		TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
	})(exports.TYPE || (exports.TYPE = {}));
	(function(FLAGS) {
		FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
		FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
		FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
		FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
		FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
		FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
		FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
		FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
		FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
	})(exports.FLAGS || (exports.FLAGS = {}));
	(function(LENIENT_FLAGS) {
		LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
		LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
		LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
	})(exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
	var METHODS;
	(function(METHODS$1) {
		METHODS$1[METHODS$1["DELETE"] = 0] = "DELETE";
		METHODS$1[METHODS$1["GET"] = 1] = "GET";
		METHODS$1[METHODS$1["HEAD"] = 2] = "HEAD";
		METHODS$1[METHODS$1["POST"] = 3] = "POST";
		METHODS$1[METHODS$1["PUT"] = 4] = "PUT";
		METHODS$1[METHODS$1["CONNECT"] = 5] = "CONNECT";
		METHODS$1[METHODS$1["OPTIONS"] = 6] = "OPTIONS";
		METHODS$1[METHODS$1["TRACE"] = 7] = "TRACE";
		METHODS$1[METHODS$1["COPY"] = 8] = "COPY";
		METHODS$1[METHODS$1["LOCK"] = 9] = "LOCK";
		METHODS$1[METHODS$1["MKCOL"] = 10] = "MKCOL";
		METHODS$1[METHODS$1["MOVE"] = 11] = "MOVE";
		METHODS$1[METHODS$1["PROPFIND"] = 12] = "PROPFIND";
		METHODS$1[METHODS$1["PROPPATCH"] = 13] = "PROPPATCH";
		METHODS$1[METHODS$1["SEARCH"] = 14] = "SEARCH";
		METHODS$1[METHODS$1["UNLOCK"] = 15] = "UNLOCK";
		METHODS$1[METHODS$1["BIND"] = 16] = "BIND";
		METHODS$1[METHODS$1["REBIND"] = 17] = "REBIND";
		METHODS$1[METHODS$1["UNBIND"] = 18] = "UNBIND";
		METHODS$1[METHODS$1["ACL"] = 19] = "ACL";
		METHODS$1[METHODS$1["REPORT"] = 20] = "REPORT";
		METHODS$1[METHODS$1["MKACTIVITY"] = 21] = "MKACTIVITY";
		METHODS$1[METHODS$1["CHECKOUT"] = 22] = "CHECKOUT";
		METHODS$1[METHODS$1["MERGE"] = 23] = "MERGE";
		METHODS$1[METHODS$1["M-SEARCH"] = 24] = "M-SEARCH";
		METHODS$1[METHODS$1["NOTIFY"] = 25] = "NOTIFY";
		METHODS$1[METHODS$1["SUBSCRIBE"] = 26] = "SUBSCRIBE";
		METHODS$1[METHODS$1["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
		METHODS$1[METHODS$1["PATCH"] = 28] = "PATCH";
		METHODS$1[METHODS$1["PURGE"] = 29] = "PURGE";
		METHODS$1[METHODS$1["MKCALENDAR"] = 30] = "MKCALENDAR";
		METHODS$1[METHODS$1["LINK"] = 31] = "LINK";
		METHODS$1[METHODS$1["UNLINK"] = 32] = "UNLINK";
		METHODS$1[METHODS$1["SOURCE"] = 33] = "SOURCE";
		METHODS$1[METHODS$1["PRI"] = 34] = "PRI";
		METHODS$1[METHODS$1["DESCRIBE"] = 35] = "DESCRIBE";
		METHODS$1[METHODS$1["ANNOUNCE"] = 36] = "ANNOUNCE";
		METHODS$1[METHODS$1["SETUP"] = 37] = "SETUP";
		METHODS$1[METHODS$1["PLAY"] = 38] = "PLAY";
		METHODS$1[METHODS$1["PAUSE"] = 39] = "PAUSE";
		METHODS$1[METHODS$1["TEARDOWN"] = 40] = "TEARDOWN";
		METHODS$1[METHODS$1["GET_PARAMETER"] = 41] = "GET_PARAMETER";
		METHODS$1[METHODS$1["SET_PARAMETER"] = 42] = "SET_PARAMETER";
		METHODS$1[METHODS$1["REDIRECT"] = 43] = "REDIRECT";
		METHODS$1[METHODS$1["RECORD"] = 44] = "RECORD";
		METHODS$1[METHODS$1["FLUSH"] = 45] = "FLUSH";
	})(METHODS = exports.METHODS || (exports.METHODS = {}));
	exports.METHODS_HTTP = [
		METHODS.DELETE,
		METHODS.GET,
		METHODS.HEAD,
		METHODS.POST,
		METHODS.PUT,
		METHODS.CONNECT,
		METHODS.OPTIONS,
		METHODS.TRACE,
		METHODS.COPY,
		METHODS.LOCK,
		METHODS.MKCOL,
		METHODS.MOVE,
		METHODS.PROPFIND,
		METHODS.PROPPATCH,
		METHODS.SEARCH,
		METHODS.UNLOCK,
		METHODS.BIND,
		METHODS.REBIND,
		METHODS.UNBIND,
		METHODS.ACL,
		METHODS.REPORT,
		METHODS.MKACTIVITY,
		METHODS.CHECKOUT,
		METHODS.MERGE,
		METHODS["M-SEARCH"],
		METHODS.NOTIFY,
		METHODS.SUBSCRIBE,
		METHODS.UNSUBSCRIBE,
		METHODS.PATCH,
		METHODS.PURGE,
		METHODS.MKCALENDAR,
		METHODS.LINK,
		METHODS.UNLINK,
		METHODS.PRI,
		METHODS.SOURCE
	];
	exports.METHODS_ICE = [METHODS.SOURCE];
	exports.METHODS_RTSP = [
		METHODS.OPTIONS,
		METHODS.DESCRIBE,
		METHODS.ANNOUNCE,
		METHODS.SETUP,
		METHODS.PLAY,
		METHODS.PAUSE,
		METHODS.TEARDOWN,
		METHODS.GET_PARAMETER,
		METHODS.SET_PARAMETER,
		METHODS.REDIRECT,
		METHODS.RECORD,
		METHODS.FLUSH,
		METHODS.GET,
		METHODS.POST
	];
	exports.METHOD_MAP = utils_1.enumToMap(METHODS);
	exports.H_METHOD_MAP = {};
	Object.keys(exports.METHOD_MAP).forEach((key) => {
		if (/^H/.test(key)) exports.H_METHOD_MAP[key] = exports.METHOD_MAP[key];
	});
	(function(FINISH) {
		FINISH[FINISH["SAFE"] = 0] = "SAFE";
		FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
		FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
	})(exports.FINISH || (exports.FINISH = {}));
	exports.ALPHA = [];
	for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
		exports.ALPHA.push(String.fromCharCode(i));
		exports.ALPHA.push(String.fromCharCode(i + 32));
	}
	exports.NUM_MAP = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9
	};
	exports.HEX_MAP = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		A: 10,
		B: 11,
		C: 12,
		D: 13,
		E: 14,
		F: 15,
		a: 10,
		b: 11,
		c: 12,
		d: 13,
		e: 14,
		f: 15
	};
	exports.NUM = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9"
	];
	exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
	exports.MARK = [
		"-",
		"_",
		".",
		"!",
		"~",
		"*",
		"'",
		"(",
		")"
	];
	exports.USERINFO_CHARS = exports.ALPHANUM.concat(exports.MARK).concat([
		"%",
		";",
		":",
		"&",
		"=",
		"+",
		"$",
		","
	]);
	exports.STRICT_URL_CHAR = [
		"!",
		"\"",
		"$",
		"%",
		"&",
		"'",
		"(",
		")",
		"*",
		"+",
		",",
		"-",
		".",
		"/",
		":",
		";",
		"<",
		"=",
		">",
		"@",
		"[",
		"\\",
		"]",
		"^",
		"_",
		"`",
		"{",
		"|",
		"}",
		"~"
	].concat(exports.ALPHANUM);
	exports.URL_CHAR = exports.STRICT_URL_CHAR.concat(["	", "\f"]);
	for (let i = 128; i <= 255; i++) exports.URL_CHAR.push(i);
	exports.HEX = exports.NUM.concat([
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F"
	]);
	exports.STRICT_TOKEN = [
		"!",
		"#",
		"$",
		"%",
		"&",
		"'",
		"*",
		"+",
		"-",
		".",
		"^",
		"_",
		"`",
		"|",
		"~"
	].concat(exports.ALPHANUM);
	exports.TOKEN = exports.STRICT_TOKEN.concat([" "]);
	exports.HEADER_CHARS = ["	"];
	for (let i = 32; i <= 255; i++) if (i !== 127) exports.HEADER_CHARS.push(i);
	exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c) => c !== 44);
	exports.MAJOR = exports.NUM_MAP;
	exports.MINOR = exports.MAJOR;
	var HEADER_STATE;
	(function(HEADER_STATE$1) {
		HEADER_STATE$1[HEADER_STATE$1["GENERAL"] = 0] = "GENERAL";
		HEADER_STATE$1[HEADER_STATE$1["CONNECTION"] = 1] = "CONNECTION";
		HEADER_STATE$1[HEADER_STATE$1["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
		HEADER_STATE$1[HEADER_STATE$1["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
		HEADER_STATE$1[HEADER_STATE$1["UPGRADE"] = 4] = "UPGRADE";
		HEADER_STATE$1[HEADER_STATE$1["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
		HEADER_STATE$1[HEADER_STATE$1["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
		HEADER_STATE$1[HEADER_STATE$1["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
		HEADER_STATE$1[HEADER_STATE$1["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
	})(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
	exports.SPECIAL_HEADERS = {
		"connection": HEADER_STATE.CONNECTION,
		"content-length": HEADER_STATE.CONTENT_LENGTH,
		"proxy-connection": HEADER_STATE.CONNECTION,
		"transfer-encoding": HEADER_STATE.TRANSFER_ENCODING,
		"upgrade": HEADER_STATE.UPGRADE
	};
}));
var require_llhttp_wasm = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Buffer: Buffer$2 } = __require("node:buffer");
	module.exports = Buffer$2.from("AGFzbQEAAAABJwdgAX8Bf2ADf39/AX9gAX8AYAJ/fwBgBH9/f38Bf2AAAGADf39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQAEA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAy0sBQYAAAIAAAAAAAACAQIAAgICAAADAAAAAAMDAwMBAQEBAQEBAQEAAAIAAAAEBQFwARISBQMBAAIGCAF/AUGA1AQLB9EFIgZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAIGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAJGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQAvDGxsaHR0cF9hbGxvYwALBm1hbGxvYwAxC2xsaHR0cF9mcmVlAAwEZnJlZQAMD2xsaHR0cF9nZXRfdHlwZQANFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAOFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAPEWxsaHR0cF9nZXRfbWV0aG9kABAWbGxodHRwX2dldF9zdGF0dXNfY29kZQAREmxsaHR0cF9nZXRfdXBncmFkZQASDGxsaHR0cF9yZXNldAATDmxsaHR0cF9leGVjdXRlABQUbGxodHRwX3NldHRpbmdzX2luaXQAFQ1sbGh0dHBfZmluaXNoABYMbGxodHRwX3BhdXNlABcNbGxodHRwX3Jlc3VtZQAYG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAZEGxsaHR0cF9nZXRfZXJybm8AGhdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAbF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uABwUbGxodHRwX2dldF9lcnJvcl9wb3MAHRFsbGh0dHBfZXJybm9fbmFtZQAeEmxsaHR0cF9tZXRob2RfbmFtZQAfEmxsaHR0cF9zdGF0dXNfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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PgtBhwEMPQtBiAEMPAtBiQEMOwtBigEMOgtBiwEMOQtBjAEMOAtBjQEMNwtBjgEMNgtBjwEMNQtBkAEMNAtBkQEMMwtBkgEMMgtBkwEMMQtBlAEMMAtBlQEMLwtBlgEMLgtBlwEMLQtBmAEMLAtBmQEMKwtBmgEMKgtBmwEMKQtBnAEMKAtBnQEMJwtBngEMJgtBnwEMJQtBoAEMJAtBoQEMIwtBogEMIgtBowEMIQtBpAEMIAtBpQEMHwtBpgEMHgtBpwEMHQtBqAEMHAtBqQEMGwtBqgEMGgtBqwEMGQtBrAEMGAtBrQEMFwtBrgEMFgtBAQwVC0GvAQwUC0GwAQwTC0GxAQwSC0GzAQwRC0GyAQwQC0G0AQwPC0G1AQwOC0G2AQwNC0G3AQwMC0G4AQwLC0G5AQwKC0G6AQwJC0G7AQwIC0HGAQwHC0G8AQwGC0G9AQwFC0G+AQwEC0G/AQwDC0HAAQwCC0HCAQwBC0HBAQshAwNAAkACQAJAAkACQAJAAkACQAJAIAICfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAgJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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iQEhAwykAgtBASABLQAAQd8ARw1nGiABQQFqIQEMXgtBigEhAyABIARGDaICIAIoAgAiACAEIAFraiEFIAEgAGtBAWohBgNAIAEtAAAgAEGMzwBqLQAARw1kIABBAUYN+gEgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMogILQYsBIQMgASAERg2hAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGOzwBqLQAARw1kIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyiAgsgAkEANgIAIAZBAWohAUECDGULQYwBIQMgASAERg2gAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHwzwBqLQAARw1jIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyhAgsgAkEANgIAIAZBAWohAUEfDGQLQY0BIQMgASAERg2fAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHyzwBqLQAARw1iIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAygAgsgAkEANgIAIAZBAWohAUEJDGMLIAEgBEYEQEGOASEDDJ8CCwJAAkAgAS0AAEHJAGsOBwBiYmJiYgFiCyABQQFqIQFB+AAhAwyGAgsgAUEBaiEBQfkAIQMMhQILQY8BIQMgASAERg2dAiACKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEGRzwBqLQAARw1gIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyeAgsgAkEANgIAIAZBAWohAUEYDGELQZABIQMgASAERg2cAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGXzwBqLQAARw1fIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAydAgsgAkEANgIAIAZBAWohAUEXDGALQZEBIQMgASAERg2bAiACKAIAIgAgBCABa2ohBSABIABrQQZqIQYCQANAIAEtAAAgAEGazwBqLQAARw1eIABBBkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAycAgsgAkEANgIAIAZBAWohAUEV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JSIARQ0RIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMtAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0gIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMswELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0iIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMsgELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0OIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMsQELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0dIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMsAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0fIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMrwELIABBP0cNASABQQFqCyEBQQUhAwyUAQtBACEDIAJBADYCHCACIAE2AhQgAkH9EjYCECACQQc2AgwMrAELIAJBADYCHCACIAE2AhQgAkHcCDYCECACQQc2AgxBACEDDKsBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNByACQeUANgIcIAIgATYCFCACIAA2AgxBACEDDKoBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNFiACQdMANgIcIAIgATYCFCACIAA2AgxBACEDDKkBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNGCACQdIANgIcIAIgATYCFCACIAA2AgxBACEDDKgBCyACQQA2AhwgAiABNgIUIAJBxgo2AhAgAkEHNgIMQQAhAwynAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQMgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwymAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRIgAkHTADYCHCACIAE2AhQgAiAANgIMQQAhAwylAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRQgAkHSADYCHCACIAE2AhQgAiAANgIMQQAhAwykAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQAgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwyjAQtB1QAhAwyJAQsgAEEVRwRAIAJBADYCHCACIAE2AhQgAkG5DTYCECACQRo2AgxB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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB5ABrDvQDY2IAAWFhYWFhYQIDBAVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhBgcICQoLDA0OD2FhYWFhEGFhYWFhYWFhYWFhEWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYRITFBUWFxgZGhthYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2YTc4OTphYWFhYWFhYTthYWE8YWFhYT0+P2FhYWFhYWFhQGFhQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYUJDREVGR0hJSktMTU5PUFFSU2FhYWFhYWFhVFVWV1hZWlthXF1hYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFeYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhX2BhC0HhJw8LQaQhDwtByywPC0H+MQ8LQcAkDwtBqyQPC0GNKA8LQeImDwtBgDAPC0G5Lw8LQdckDwtB7x8PC0HhHw8LQfofDwtB8iAPC0GoLw8LQa4yDwtBiDAPC0HsJw8LQYIiDwtBjh0PC0HQLg8LQcojDwtBxTIPC0HfHA8LQdIcDwtBxCAPC0HXIA8LQaIfDwtB7S4PC0GrMA8LQdQlDwtBzC4PC0H6Lg8LQfwrDwtB0jAPC0HxHQ8LQbsgDwtB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CABB3AgLii1JbnZhbGlkIGNoYXIgaW4gdXJsIHF1ZXJ5AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fYm9keQBDb250ZW50LUxlbmd0aCBvdmVyZmxvdwBDaHVuayBzaXplIG92ZXJmbG93AFJlc3BvbnNlIG92ZXJmbG93AEludmFsaWQgbWV0aG9kIGZvciBIVFRQL3gueCByZXF1ZXN0AEludmFsaWQgbWV0aG9kIGZvciBSVFNQL3gueCByZXF1ZXN0AEV4cGVjdGVkIFNPVVJDRSBtZXRob2QgZm9yIElDRS94LnggcmVxdWVzdABJbnZhbGlkIGNoYXIgaW4gdXJsIGZyYWdtZW50IHN0YXJ0AEV4cGVjdGVkIGRvdABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3N0YXR1cwBJbnZhbGlkIHJlc3BvbnNlIHN0YXR1cwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zAFVzZXIgY2FsbGJhY2sgZXJyb3IAYG9uX3Jlc2V0YCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3N0YXR1c19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3ZlcnNpb25fY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl91cmxfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXRob2RfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfZmllbGRfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fbmFtZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdmVyc2lvbgBJbnZhbGlkIG1pbm9yIHZlcnNpb24ASW52YWxpZCBtYWpvciB2ZXJzaW9uAEV4cGVjdGVkIHNwYWNlIGFmdGVyIHZlcnNpb24ARXhwZWN0ZWQgQ1JMRiBhZnRlciB2ZXJzaW9uAEludmFsaWQgSFRUUCB2ZXJzaW9uAEludmFsaWQgaGVhZGVyIHRva2VuAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdXJsAEludmFsaWQgY2hhcmFjdGVycyBpbiB1cmwAVW5leHBlY3RlZCBzdGFydCBjaGFyIGluIHVybABEb3VibGUgQCBpbiB1cmwARW1wdHkgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyYWN0ZXIgaW4gQ29udGVudC1MZW5ndGgARHVwbGljYXRlIENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhciBpbiB1cmwgcGF0aABDb250ZW50LUxlbmd0aCBjYW4ndCBiZSBwcmVzZW50IHdpdGggVHJhbnNmZXItRW5jb2RpbmcASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgc2l6ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl92YWx1ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAEludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYCBoZWFkZXIgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZSB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlZCB2YWx1ZQBQYXVzZWQgYnkgb25faGVhZGVyc19jb21wbGV0ZQBJbnZhbGlkIEVPRiBzdGF0ZQBvbl9yZXNldCBwYXVzZQBvbl9jaHVua19oZWFkZXIgcGF1c2UAb25fbWVzc2FnZV9iZWdpbiBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fdmFsdWUgcGF1c2UAb25fc3RhdHVzX2NvbXBsZXRlIHBhdXNlAG9uX3ZlcnNpb25fY29tcGxldGUgcGF1c2UAb25fdXJsX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXNzYWdlX2NvbXBsZXRlIHBhdXNlAG9uX21ldGhvZF9jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfZmllbGRfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUgcGF1c2UAVW5leHBlY3RlZCBzcGFjZSBhZnRlciBzdGFydCBsaW5lAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBuYW1lAFBhdXNlIG9uIENPTk5FQ1QvVXBncmFkZQBQYXVzZSBvbiBQUkkvVXBncmFkZQBFeHBlY3RlZCBIVFRQLzIgQ29ubmVjdGlvbiBQcmVmYWNlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fbWV0aG9kAEV4cGVjdGVkIHNwYWNlIGFmdGVyIG1ldGhvZABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl9maWVsZABQYXVzZWQASW52YWxpZCB3b3JkIGVuY291bnRlcmVkAEludmFsaWQgbWV0aG9kIGVuY291bnRlcmVkAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2NoZW1hAFJlcXVlc3QgaGFzIGludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYABTV0lUQ0hfUFJPWFkAVVNFX1BST1hZAE1LQUNUSVZJVFkAVU5QUk9DRVNTQUJMRV9FTlRJVFkAQ09QWQBNT1ZFRF9QRVJNQU5FTlRMWQBUT09fRUFSTFkATk9USUZZAEZBSUxFRF9ERVBFTkRFTkNZAEJBRF9HQVRFV0FZAFBMQVkAUFVUAENIRUNLT1VUAEdBVEVXQVlfVElNRU9VVABSRVFVRVNUX1RJTUVPVVQATkVUV09SS19DT05ORUNUX1RJTUVPVVQAQ09OTkVDVElPTl9USU1FT1VUAExPR0lOX1RJTUVPVVQATkVUV09SS19SRUFEX1RJTUVPVVQAUE9TVABNSVNESVJFQ1RFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX0xPQURfQkFMQU5DRURfUkVRVUVTVABCQURfUkVRVUVTVABIVFRQX1JFUVVFU1RfU0VOVF9UT19IVFRQU19QT1JUAFJFUE9SVABJTV9BX1RFQVBPVABSRVNFVF9DT05URU5UAE5PX0NPTlRFTlQAUEFSVElBTF9DT05URU5UAEhQRV9JTlZBTElEX0NPTlNUQU5UAEhQRV9DQl9SRVNFVABHRVQASFBFX1NUUklDVABDT05GTElDVABURU1QT1JBUllfUkVESVJFQ1QAUEVSTUFORU5UX1JFRElSRUNUAENPTk5FQ1QATVVMVElfU1RBVFVTAEhQRV9JTlZBTElEX1NUQVRVUwBUT09fTUFOWV9SRVFVRVNUUwBFQVJMWV9ISU5UUwBVTkFWQUlMQUJMRV9GT1JfTEVHQUxfUkVBU09OUwBPUFRJT05TAFNXSVRDSElOR19QUk9UT0NPTFMAVkFSSUFOVF9BTFNPX05FR09USUFURVMATVVMVElQTEVfQ0hPSUNFUwBJTlRFUk5BTF9TRVJWRVJfRVJST1IAV0VCX1NFUlZFUl9VTktOT1dOX0VSUk9SAFJBSUxHVU5fRVJST1IASURFTlRJVFlfUFJPVklERVJfQVVUSEVOVElDQVRJT05fRVJST1IAU1NMX0NFUlRJRklDQVRFX0VSUk9SAElOVkFMSURfWF9GT1JXQVJERURfRk9SAFNFVF9QQVJBTUVURVIAR0VUX1BBUkFNRVRFUgBIUEVfVVNFUgBTRUVfT1RIRVIASFBFX0NCX0NIVU5LX0hFQURFUgBNS0NBTEVOREFSAFNFVFVQAFdFQl9TRVJWRVJfSVNfRE9XTgBURUFSRE9XTgBIUEVfQ0xPU0VEX0NPTk5FQ1RJT04ASEVVUklTVElDX0VYUElSQVRJT04ARElTQ09OTkVDVEVEX09QRVJBVElPTgBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTgBIUEVfSU5WQUxJRF9WRVJTSU9OAEhQRV9DQl9NRVNTQUdFX0JFR0lOAFNJVEVfSVNfRlJPWkVOAEhQRV9JTlZBTElEX0hFQURFUl9UT0tFTgBJTlZBTElEX1RPS0VOAEZPUkJJRERFTgBFTkhBTkNFX1lPVVJfQ0FMTQBIUEVfSU5WQUxJRF9VUkwAQkxPQ0tFRF9CWV9QQVJFTlRBTF9DT05UUk9MAE1LQ09MAEFDTABIUEVfSU5URVJOQUwAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRV9VTk9GRklDSUFMAEhQRV9PSwBVTkxJTksAVU5MT0NLAFBSSQBSRVRSWV9XSVRIAEhQRV9JTlZBTElEX0NPTlRFTlRfTEVOR1RIAEhQRV9VTkVYUEVDVEVEX0NPTlRFTlRfTEVOR1RIAEZMVVNIAFBST1BQQVRDSABNLVNFQVJDSABVUklfVE9PX0xPTkcAUFJPQ0VTU0lORwBNSVNDRUxMQU5FT1VTX1BFUlNJU1RFTlRfV0FSTklORwBNSVNDRUxMQU5FT1VTX1dBUk5JTkcASFBFX0lOVkFMSURfVFJBTlNGRVJfRU5DT0RJTkcARXhwZWN0ZWQgQ1JMRgBIUEVfSU5WQUxJRF9DSFVOS19TSVpFAE1PVkUAQ09OVElOVUUASFBFX0NCX1NUQVRVU19DT01QTEVURQBIUEVfQ0JfSEVBREVSU19DT01QTEVURQBIUEVfQ0JfVkVSU0lPTl9DT01QTEVURQBIUEVfQ0JfVVJMX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19DT01QTEVURQBIUEVfQ0JfSEVBREVSX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9OQU1FX0NPTVBMRVRFAEhQRV9DQl9NRVNTQUdFX0NPTVBMRVRFAEhQRV9DQl9NRVRIT0RfQ09NUExFVEUASFBFX0NCX0hFQURFUl9GSUVMRF9DT01QTEVURQBERUxFVEUASFBFX0lOVkFMSURfRU9GX1NUQVRFAElOVkFMSURfU1NMX0NFUlRJRklDQVRFAFBBVVNFAE5PX1JFU1BPTlNFAFVOU1VQUE9SVEVEX01FRElBX1RZUEUAR09ORQBOT1RfQUNDRVBUQUJMRQBTRVJWSUNFX1VOQVZBSUxBQkxFAFJBTkdFX05PVF9TQVRJU0ZJQUJMRQBPUklHSU5fSVNfVU5SRUFDSEFCTEUAUkVTUE9OU0VfSVNfU1RBTEUAUFVSR0UATUVSR0UAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRQBSRVFVRVNUX0hFQURFUl9UT09fTEFSR0UAUEFZTE9BRF9UT09fTEFSR0UASU5TVUZGSUNJRU5UX1NUT1JBR0UASFBFX1BBVVNFRF9VUEdSQURFAEhQRV9QQVVTRURfSDJfVVBHUkFERQBTT1VSQ0UAQU5OT1VOQ0UAVFJBQ0UASFBFX1VORVhQRUNURURfU1BBQ0UAREVTQ1JJQkUAVU5TVUJTQ1JJQkUAUkVDT1JEAEhQRV9JTlZBTElEX01FVEhPRABOT1RfRk9VTkQAUFJPUEZJTkQAVU5CSU5EAFJFQklORABVTkFVVEhPUklaRUQATUVUSE9EX05PVF9BTExPV0VEAEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEAEFMUkVBRFlfUkVQT1JURUQAQUNDRVBURUQATk9UX0lNUExFTUVOVEVEAExPT1BfREVURUNURUQASFBFX0NSX0VYUEVDVEVEAEhQRV9MRl9FWFBFQ1RFRABDUkVBVEVEAElNX1VTRUQASFBFX1BBVVNFRABUSU1FT1VUX09DQ1VSRUQAUEFZTUVOVF9SRVFVSVJFRABQUkVDT05ESVRJT05fUkVRVUlSRUQAUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRABMRU5HVEhfUkVRVUlSRUQAU1NMX0NFUlRJRklDQVRFX1JFUVVJUkVEAFVQR1JBREVfUkVRVUlSRUQAUEFHRV9FWFBJUkVEAFBSRUNPTkRJVElPTl9GQUlMRUQARVhQRUNUQVRJT05fRkFJTEVEAFJFVkFMSURBVElPTl9GQUlMRUQAU1NMX0hBTkRTSEFLRV9GQUlMRUQATE9DS0VEAFRSQU5TRk9STUFUSU9OX0FQUExJRUQATk9UX01PRElGSUVEAE5PVF9FWFRFTkRFRABCQU5EV0lEVEhfTElNSVRfRVhDRUVERUQAU0lURV9JU19PVkVSTE9BREVEAEhFQUQARXhwZWN0ZWQgSFRUUC8AAF4TAAAmEwAAMBAAAPAXAACdEwAAFRIAADkXAADwEgAAChAAAHUSAACtEgAAghMAAE8UAAB/EAAAoBUAACMUAACJEgAAixQAAE0VAADUEQAAzxQAABAYAADJFgAA3BYAAMERAADgFwAAuxQAAHQUAAB8FQAA5RQAAAgXAAAfEAAAZRUAAKMUAAAoFQAAAhUAAJkVAAAsEAAAixkAAE8PAADUDgAAahAAAM4QAAACFwAAiQ4AAG4TAAAcEwAAZhQAAFYXAADBEwAAzRMAAGwTAABoFwAAZhcAAF8XAAAiEwAAzg8AAGkOAADYDgAAYxYAAMsTAACqDgAAKBcAACYXAADFEwAAXRYAAOgRAABnEwAAZRMAAPIWAABzEwAAHRcAAPkWAADzEQAAzw4AAM4VAAAMEgAAsxEAAKURAABhEAAAMhcAALsTAEH5NQsBAQBBkDYL4AEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB/TcLAQEAQZE4C14CAwICAgICAAACAgACAgACAgICAgICAgICAAQAAAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAEH9OQsBAQBBkToLXgIAAgICAgIAAAICAAICAAICAgICAgICAgIAAwAEAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAQfA7Cw1sb3NlZWVwLWFsaXZlAEGJPAsBAQBBoDwL4AEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBBiT4LAQEAQaA+C+cBAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAEGwwAALXwEBAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAEGQwgALIWVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgBBwMIACy1yYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNCg0KU00NCg0KVFRQL0NFL1RTUC8AQfnCAAsFAQIAAQMAQZDDAAvgAQQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAEH5xAALBQECAAEDAEGQxQAL4AEEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB+cYACwQBAAABAEGRxwAL3wEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAEH6yAALBAEAAAIAQZDJAAtfAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAQfrKAAsEAQAAAQBBkMsACwEBAEGqywALQQIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAEH6zAALBAEAAAEAQZDNAAsBAQBBms0ACwYCAAAAAAIAQbHNAAs6AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBB8M4AC5YBTk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRU9SRElSRUNUT1JUUkNIUEFSQU1FVEVSVVJDRUJTQ1JJQkVBUkRPV05BQ0VJTkROS0NLVUJTQ1JJQkVIVFRQL0FEVFAv", "base64");
}));
var require_llhttp_simd_wasm = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Buffer: Buffer$1 } = __require("node:buffer");
	module.exports = Buffer$1.from("AGFzbQEAAAABJwdgAX8Bf2ADf39/AX9gAX8AYAJ/fwBgBH9/f38Bf2AAAGADf39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQAEA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAy0sBQYAAAIAAAAAAAACAQIAAgICAAADAAAAAAMDAwMBAQEBAQEBAQEAAAIAAAAEBQFwARISBQMBAAIGCAF/AUGA1AQLB9EFIgZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAIGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAJGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQAvDGxsaHR0cF9hbGxvYwALBm1hbGxvYwAxC2xsaHR0cF9mcmVlAAwEZnJlZQAMD2xsaHR0cF9nZXRfdHlwZQANFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAOFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAPEWxsaHR0cF9nZXRfbWV0aG9kABAWbGxodHRwX2dldF9zdGF0dXNfY29kZQAREmxsaHR0cF9nZXRfdXBncmFkZQASDGxsaHR0cF9yZXNldAATDmxsaHR0cF9leGVjdXRlABQUbGxodHRwX3NldHRpbmdzX2luaXQAFQ1sbGh0dHBfZmluaXNoABYMbGxodHRwX3BhdXNlABcNbGxodHRwX3Jlc3VtZQAYG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAZEGxsaHR0cF9nZXRfZXJybm8AGhdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAbF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uABwUbGxodHRwX2dldF9lcnJvcl9wb3MAHRFsbGh0dHBfZXJybm9fbmFtZQAeEmxsaHR0cF9tZXRob2RfbmFtZQAfEmxsaHR0cF9zdGF0dXNfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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PgtBhwEMPQtBiAEMPAtBiQEMOwtBigEMOgtBiwEMOQtBjAEMOAtBjQEMNwtBjgEMNgtBjwEMNQtBkAEMNAtBkQEMMwtBkgEMMgtBkwEMMQtBlAEMMAtBlQEMLwtBlgEMLgtBlwEMLQtBmAEMLAtBmQEMKwtBmgEMKgtBmwEMKQtBnAEMKAtBnQEMJwtBngEMJgtBnwEMJQtBoAEMJAtBoQEMIwtBogEMIgtBowEMIQtBpAEMIAtBpQEMHwtBpgEMHgtBpwEMHQtBqAEMHAtBqQEMGwtBqgEMGgtBqwEMGQtBrAEMGAtBrQEMFwtBrgEMFgtBAQwVC0GvAQwUC0GwAQwTC0GxAQwSC0GzAQwRC0GyAQwQC0G0AQwPC0G1AQwOC0G2AQwNC0G3AQwMC0G4AQwLC0G5AQwKC0G6AQwJC0G7AQwIC0HGAQwHC0G8AQwGC0G9AQwFC0G+AQwEC0G/AQwDC0HAAQwCC0HCAQwBC0HBAQshAwNAAkACQAJAAkACQAJAAkACQAJAIAICfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAgJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACQAJAAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCADDsYBAAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHyAhIyUmKCorLC8wMTIzNDU2Nzk6Ozw9lANAQkRFRklLTk9QUVJTVFVWWFpbXF1eX2BhYmNkZWZnaGpsb3Bxc3V2eHl6e3x/gAGBAYIBgwGEAYUBhgGHAYgBiQGKAYsBjAGNAY4BjwGQAZEBkgGTAZQBlQGWAZcBmAGZAZoBmwGcAZ0BngGfAaABoQGiAaMBpAGlAaYBpwGoAakBqgGrAawBrQGuAa8BsAGxAbIBswG0AbUBtgG3AbgBuQG6AbsBvAG9Ab4BvwHAAcEBwgHDAcQBxQHGAccByAHJAcsBzAHNAc4BzwGKA4kDiAOHA4QDgwOAA/sC+gL5AvgC9wL0AvMC8gLLAsECsALZAQsgASAERw3wAkHdASEDDLMDCyABIARHDcgBQcMBIQMMsgMLIAEgBEcNe0H3ACEDDLEDCyABIARHDXBB7wAhAwywAwsgASAERw1pQeoAIQMMrwMLIAEgBEcNZUHoACEDDK4DCyABIARHDWJB5gAhAwytAwsgASAERw0aQRghAwysAwsgASAERw0VQRIhAwyrAwsgASAERw1CQcUAIQMMqgMLIAEgBEcNNEE/IQMMqQMLIAEgBEcNMkE8IQMMqAMLIAEgBEcNK0ExIQMMpwMLIAItAC5BAUYNnwMMwQILQQAhAAJAAkACQCACLQAqRQ0AIAItACtFDQAgAi8BMCIDQQJxRQ0BDAILIAIvATAiA0EBcUUNAQtBASEAIAItAChBAUYNACACLwEyIgVB5ABrQeQASQ0AIAVBzAFGDQAgBUGwAkYNACADQcAAcQ0AQQAhACADQYgEcUGABEYNACADQShxQQBHIQALIAJBADsBMCACQQA6AC8gAEUN3wIgAkIANwMgDOACC0EAIQACQCACKAI4IgNFDQAgAygCLCIDRQ0AIAIgAxEAACEACyAARQ3MASAAQRVHDd0CIAJBBDYCHCACIAE2AhQgAkGwGDYCECACQRU2AgxBACEDDKQDCyABIARGBEBBBiEDDKQDCyABQQFqIQFBACEAAkAgAigCOCIDRQ0AIAMoAlQiA0UNACACIAMRAAAhAAsgAA3ZAgwcCyACQgA3AyBBEiEDDIkDCyABIARHDRZBHSEDDKEDCyABIARHBEAgAUEBaiEBQRAhAwyIAwtBByEDDKADCyACIAIpAyAiCiAEIAFrrSILfSIMQgAgCiAMWhs3AyAgCiALWA3UAkEIIQMMnwMLIAEgBEcEQCACQQk2AgggAiABNgIEQRQhAwyGAwtBCSEDDJ4DCyACKQMgQgBSDccBIAIgAi8BMEGAAXI7ATAMQgsgASAERw0/QdAAIQMMnAMLIAEgBEYEQEELIQMMnAMLIAFBAWohAUEAIQACQCACKAI4IgNFDQAgAygCUCIDRQ0AIAIgAxEAACEACyAADc8CDMYBC0EAIQACQCACKAI4IgNFDQAgAygCSCIDRQ0AIAIgAxEAACEACyAARQ3GASAAQRVHDc0CIAJBCzYCHCACIAE2AhQgAkGCGTYCECACQRU2AgxBACEDDJoDC0EAIQACQCACKAI4IgNFDQAgAygCSCIDRQ0AIAIgAxEAACEACyAARQ0MIABBFUcNygIgAkEaNgIcIAIgATYCFCACQYIZNgIQIAJBFTYCDEEAIQMMmQMLQQAhAAJAIAIoAjgiA0UNACADKAJMIgNFDQAgAiADEQAAIQALIABFDcQBIABBFUcNxwIgAkELNgIcIAIgATYCFCACQZEXNgIQIAJBFTYCDEEAIQMMmAMLIAEgBEYEQEEPIQMMmAMLIAEtAAAiAEE7Rg0HIABBDUcNxAIgAUEBaiEBDMMBC0EAIQACQCACKAI4IgNFDQAgAygCTCIDRQ0AIAIgAxEAACEACyAARQ3DASAAQRVHDcICIAJBDzYCHCACIAE2AhQgAkGRFzYCECACQRU2AgxBACEDDJYDCwNAIAEtAABB8DVqLQAAIgBBAUcEQCAAQQJHDcECIAIoAgQhAEEAIQMgAkEANgIEIAIgACABQQFqIgEQLSIADcICDMUBCyAEIAFBAWoiAUcNAAtBEiEDDJUDC0EAIQACQCACKAI4IgNFDQAgAygCTCIDRQ0AIAIgAxEAACEACyAARQ3FASAAQRVHDb0CIAJBGzYCHCACIAE2AhQgAkGRFzYCECACQRU2AgxBACEDDJQDCyABIARGBEBBFiEDDJQDCyACQQo2AgggAiABNgIEQQAhAAJAIAIoAjgiA0UNACADKAJIIgNFDQAgAiADEQAAIQALIABFDcIBIABBFUcNuQIgAkEVNgIcIAIgATYCFCACQYIZNgIQIAJBFTYCDEEAIQMMkwMLIAEgBEcEQANAIAEtAABB8DdqLQAAIgBBAkcEQAJAIABBAWsOBMQCvQIAvgK9AgsgAUEBaiEBQQghAwz8AgsgBCABQQFqIgFHDQALQRUhAwyTAwtBFSEDDJIDCwNAIAEtAABB8DlqLQAAIgBBAkcEQCAAQQFrDgTFArcCwwK4ArcCCyAEIAFBAWoiAUcNAAtBGCEDDJEDCyABIARHBEAgAkELNgIIIAIgATYCBEEHIQMM+AILQRkhAwyQAwsgAUEBaiEBDAILIAEgBEYEQEEaIQMMjwMLAkAgAS0AAEENaw4UtQG/Ab8BvwG/Ab8BvwG/Ab8BvwG/Ab8BvwG/Ab8BvwG/Ab8BvwEAvwELQQAhAyACQQA2AhwgAkGvCzYCECACQQI2AgwgAiABQQFqNgIUDI4DCyABIARGBEBBGyEDDI4DCyABLQAAIgBBO0cEQCAAQQ1HDbECIAFBAWohAQy6AQsgAUEBaiEBC0EiIQMM8wILIAEgBEYEQEEcIQMMjAMLQgAhCgJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAS0AAEEwaw43wQLAAgABAgMEBQYH0AHQAdAB0AHQAdAB0AEICQoLDA3QAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdABDg8QERIT0AELQgIhCgzAAgtCAyEKDL8CC0IEIQoMvgILQgUhCgy9AgtCBiEKDLwCC0IHIQoMuwILQgghCgy6AgtCCSEKDLkCC0IKIQoMuAILQgshCgy3AgtCDCEKDLYCC0INIQoMtQILQg4hCgy0AgtCDyEKDLMCC0IKIQoMsgILQgshCgyxAgtCDCEKDLACC0INIQoMrwILQg4hCgyuAgtCDyEKDK0CC0IAIQoCQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAEtAABBMGsON8ACvwIAAQIDBAUGB74CvgK+Ar4CvgK+Ar4CCAkKCwwNvgK+Ar4CvgK+Ar4CvgK+Ar4CvgK+Ar4CvgK+Ar4CvgK+Ar4CvgK+Ar4CvgK+Ar4CvgK+Ag4PEBESE74CC0ICIQoMvwILQgMhCgy+AgtCBCEKDL0CC0IFIQoMvAILQgYhCgy7AgtCByEKDLoCC0IIIQoMuQILQgkhCgy4AgtCCiEKDLcCC0ILIQoMtgILQgwhCgy1AgtCDSEKDLQCC0IOIQoMswILQg8hCgyyAgtCCiEKDLECC0ILIQoMsAILQgwhCgyvAgtCDSEKDK4CC0IOIQoMrQILQg8hCgysAgsgAiACKQMgIgogBCABa60iC30iDEIAIAogDFobNwMgIAogC1gNpwJBHyEDDIkDCyABIARHBEAgAkEJNgIIIAIgATYCBEElIQMM8AILQSAhAwyIAwtBASEFIAIvATAiA0EIcUUEQCACKQMgQgBSIQULAkAgAi0ALgRAQQEhACACLQApQQVGDQEgA0HAAHFFIAVxRQ0BC0EAIQAgA0HAAHENAEECIQAgA0EIcQ0AIANBgARxBEACQCACLQAoQQFHDQAgAi0ALUEKcQ0AQQUhAAwCC0EEIQAMAQsgA0EgcUUEQAJAIAItAChBAUYNACACLwEyIgBB5ABrQeQASQ0AIABBzAFGDQAgAEGwAkYNAEEEIQAgA0EocUUNAiADQYgEcUGABEYNAgtBACEADAELQQBBAyACKQMgUBshAAsgAEEBaw4FvgIAsAEBpAKhAgtBESEDDO0CCyACQQE6AC8MhAMLIAEgBEcNnQJBJCEDDIQDCyABIARHDRxBxgAhAwyDAwtBACEAAkAgAigCOCIDRQ0AIAMoAkQiA0UNACACIAMRAAAhAAsgAEUNJyAAQRVHDZgCIAJB0AA2AhwgAiABNgIUIAJBkRg2AhAgAkEVNgIMQQAhAwyCAwsgASAERgRAQSghAwyCAwtBACEDIAJBADYCBCACQQw2AgggAiABIAEQKiIARQ2UAiACQSc2AhwgAiABNgIUIAIgADYCDAyBAwsgASAERgRAQSkhAwyBAwsgAS0AACIAQSBGDRMgAEEJRw2VAiABQQFqIQEMFAsgASAERwRAIAFBAWohAQwWC0EqIQMM/wILIAEgBEYEQEErIQMM/wILIAEtAAAiAEEJRyAAQSBHcQ2QAiACLQAsQQhHDd0CIAJBADoALAzdAgsgASAERgRAQSwhAwz+AgsgAS0AAEEKRw2OAiABQQFqIQEMsAELIAEgBEcNigJBLyEDDPwCCwNAIAEtAAAiAEEgRwRAIABBCmsOBIQCiAKIAoQChgILIAQgAUEBaiIBRw0AC0ExIQMM+wILQTIhAyABIARGDfoCIAIoAgAiACAEIAFraiEHIAEgAGtBA2ohBgJAA0AgAEHwO2otAAAgAS0AACIFQSByIAUgBUHBAGtB/wFxQRpJG0H/AXFHDQEgAEEDRgRAQQYhAQziAgsgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAc2AgAM+wILIAJBADYCAAyGAgtBMyEDIAQgASIARg35AiAEIAFrIAIoAgAiAWohByAAIAFrQQhqIQYCQANAIAFB9DtqLQAAIAAtAAAiBUEgciAFIAVBwQBrQf8BcUEaSRtB/wFxRw0BIAFBCEYEQEEFIQEM4QILIAFBAWohASAEIABBAWoiAEcNAAsgAiAHNgIADPoCCyACQQA2AgAgACEBDIUCC0E0IQMgBCABIgBGDfgCIAQgAWsgAigCACIBaiEHIAAgAWtBBWohBgJAA0AgAUHQwgBqLQAAIAAtAAAiBUEgciAFIAVBwQBrQf8BcUEaSRtB/wFxRw0BIAFBBUYEQEEHIQEM4AILIAFBAWohASAEIABBAWoiAEcNAAsgAiAHNgIADPkCCyACQQA2AgAgACEBDIQCCyABIARHBEADQCABLQAAQYA+ai0AACIAQQFHBEAgAEECRg0JDIECCyAEIAFBAWoiAUcNAAtBMCEDDPgCC0EwIQMM9wILIAEgBEcEQANAIAEtAAAiAEEgRwRAIABBCmsOBP8B/gH+Af8B/gELIAQgAUEBaiIBRw0AC0E4IQMM9wILQTghAwz2AgsDQCABLQAAIgBBIEcgAEEJR3EN9gEgBCABQQFqIgFHDQALQTwhAwz1AgsDQCABLQAAIgBBIEcEQAJAIABBCmsOBPkBBAT5AQALIABBLEYN9QEMAwsgBCABQQFqIgFHDQALQT8hAwz0AgtBwAAhAyABIARGDfMCIAIoAgAiACAEIAFraiEFIAEgAGtBBmohBgJAA0AgAEGAQGstAAAgAS0AAEEgckcNASAAQQZGDdsCIABBAWohACAEIAFBAWoiAUcNAAsgAiAFNgIADPQCCyACQQA2AgALQTYhAwzZAgsgASAERgRAQcEAIQMM8gILIAJBDDYCCCACIAE2AgQgAi0ALEEBaw4E+wHuAewB6wHUAgsgAUEBaiEBDPoBCyABIARHBEADQAJAIAEtAAAiAEEgciAAIABBwQBrQf8BcUEaSRtB/wFxIgBBCUYNACAAQSBGDQACQAJAAkACQCAAQeMAaw4TAAMDAwMDAwMBAwMDAwMDAwMDAgMLIAFBAWohAUExIQMM3AILIAFBAWohAUEyIQMM2wILIAFBAWohAUEzIQMM2gILDP4BCyAEIAFBAWoiAUcNAAtBNSEDDPACC0E1IQMM7wILIAEgBEcEQANAIAEtAABBgDxqLQAAQQFHDfcBIAQgAUEBaiIBRw0AC0E9IQMM7wILQT0hAwzuAgtBACEAAkAgAigCOCIDRQ0AIAMoAkAiA0UNACACIAMRAAAhAAsgAEUNASAAQRVHDeYBIAJBwgA2AhwgAiABNgIUIAJB4xg2AhAgAkEVNgIMQQAhAwztAgsgAUEBaiEBC0E8IQMM0gILIAEgBEYEQEHCACEDDOsCCwJAA0ACQCABLQAAQQlrDhgAAswCzALRAswCzALMAswCzALMAswCzALMAswCzALMAswCzALMAswCzALMAgDMAgsgBCABQQFqIgFHDQALQcIAIQMM6wILIAFBAWohASACLQAtQQFxRQ3+AQtBLCEDDNACCyABIARHDd4BQcQAIQMM6AILA0AgAS0AAEGQwABqLQAAQQFHDZwBIAQgAUEBaiIBRw0AC0HFACEDDOcCCyABLQAAIgBBIEYN/gEgAEE6Rw3AAiACKAIEIQBBACEDIAJBADYCBCACIAAgARApIgAN3gEM3QELQccAIQMgBCABIgBGDeUCIAQgAWsgAigCACIBaiEHIAAgAWtBBWohBgNAIAFBkMIAai0AACAALQAAIgVBIHIgBSAFQcEAa0H/AXFBGkkbQf8BcUcNvwIgAUEFRg3CAiABQQFqIQEgBCAAQQFqIgBHDQALIAIgBzYCAAzlAgtByAAhAyAEIAEiAEYN5AIgBCABayACKAIAIgFqIQcgACABa0EJaiEGA0AgAUGWwgBqLQAAIAAtAAAiBUEgciAFIAVBwQBrQf8BcUEaSRtB/wFxRw2+AkECIAFBCUYNwgIaIAFBAWohASAEIABBAWoiAEcNAAsgAiAHNgIADOQCCyABIARGBEBByQAhAwzkAgsCQAJAIAEtAAAiAEEgciAAIABBwQBrQf8BcUEaSRtB/wFxQe4Aaw4HAL8CvwK/Ar8CvwIBvwILIAFBAWohAUE+IQMMywILIAFBAWohAUE/IQMMygILQcoAIQMgBCABIgBGDeICIAQgAWsgAigCACIBaiEGIAAgAWtBAWohBwNAIAFBoMIAai0AACAALQAAIgVBIHIgBSAFQcEAa0H/AXFBGkkbQf8BcUcNvAIgAUEBRg2+AiABQQFqIQEgBCAAQQFqIgBHDQALIAIgBjYCAAziAgtBywAhAyAEIAEiAEYN4QIgBCABayACKAIAIgFqIQcgACABa0EOaiEGA0AgAUGiwgBqLQAAIAAtAAAiBUEgciAFIAVBwQBrQf8BcUEaSRtB/wFxRw27AiABQQ5GDb4CIAFBAWohASAEIABBAWoiAEcNAAsgAiAHNgIADOECC0HMACEDIAQgASIARg3gAiAEIAFrIAIoAgAiAWohByAAIAFrQQ9qIQYDQCABQcDCAGotAAAgAC0AACIFQSByIAUgBUHBAGtB/wFxQRpJG0H/AXFHDboCQQMgAUEPRg2+AhogAUEBaiEBIAQgAEEBaiIARw0ACyACIAc2AgAM4AILQc0AIQMgBCABIgBGDd8CIAQgAWsgAigCACIBaiEHIAAgAWtBBWohBgNAIAFB0MIAai0AACAALQAAIgVBIHIgBSAFQcEAa0H/AXFBGkkbQf8BcUcNuQJBBCABQQVGDb0CGiABQQFqIQEgBCAAQQFqIgBHDQALIAIgBzYCAAzfAgsgASAERgRAQc4AIQMM3wILAkACQAJAAkAgAS0AACIAQSByIAAgAEHBAGtB/wFxQRpJG0H/AXFB4wBrDhMAvAK8ArwCvAK8ArwCvAK8ArwCvAK8ArwCAbwCvAK8AgIDvAILIAFBAWohAUHBACEDDMgCCyABQQFqIQFBwgAhAwzHAgsgAUEBaiEBQcMAIQMMxgILIAFBAWohAUHEACEDDMUCCyABIARHBEAgAkENNgIIIAIgATYCBEHFACEDDMUCC0HPACEDDN0CCwJAAkAgAS0AAEEKaw4EAZABkAEAkAELIAFBAWohAQtBKCEDDMMCCyABIARGBEBB0QAhAwzcAgsgAS0AAEEgRw0AIAFBAWohASACLQAtQQFxRQ3QAQtBFyEDDMECCyABIARHDcsBQdIAIQMM2QILQdMAIQMgASAERg3YAiACKAIAIgAgBCABa2ohBiABIABrQQFqIQUDQCABLQAAIABB1sIAai0AAEcNxwEgAEEBRg3KASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBjYCAAzYAgsgASAERgRAQdUAIQMM2AILIAEtAABBCkcNwgEgAUEBaiEBDMoBCyABIARGBEBB1gAhAwzXAgsCQAJAIAEtAABBCmsOBADDAcMBAcMBCyABQQFqIQEMygELIAFBAWohAUHKACEDDL0CC0EAIQACQCACKAI4IgNFDQAgAygCPCIDRQ0AIAIgAxEAACEACyAADb8BQc0AIQMMvAILIAItAClBIkYNzwIMiQELIAQgASIFRgRAQdsAIQMM1AILQQAhAEEBIQFBASEGQQAhAwJAAn8CQAJAAkACQAJAAkACQCAFLQAAQTBrDgrFAcQBAAECAwQFBgjDAQtBAgwGC0EDDAULQQQMBAtBBQwDC0EGDAILQQcMAQtBCAshA0EAIQFBACEGDL0BC0EJIQNBASEAQQAhAUEAIQYMvAELIAEgBEYEQEHdACEDDNMCCyABLQAAQS5HDbgBIAFBAWohAQyIAQsgASAERw22AUHfACEDDNECCyABIARHBEAgAkEONgIIIAIgATYCBEHQACEDDLgCC0HgACEDDNACC0HhACEDIAEgBEYNzwIgAigCACIAIAQgAWtqIQUgASAAa0EDaiEGA0AgAS0AACAAQeLCAGotAABHDbEBIABBA0YNswEgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMzwILQeIAIQMgASAERg3OAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYDQCABLQAAIABB5sIAai0AAEcNsAEgAEECRg2vASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAzOAgtB4wAhAyABIARGDc0CIAIoAgAiACAEIAFraiEFIAEgAGtBA2ohBgNAIAEtAAAgAEHpwgBqLQAARw2vASAAQQNGDa0BIABBAWohACAEIAFBAWoiAUcNAAsgAiAFNgIADM0CCyABIARGBEBB5QAhAwzNAgsgAUEBaiEBQQAhAAJAIAIoAjgiA0UNACADKAIwIgNFDQAgAiADEQAAIQALIAANqgFB1gAhAwyzAgsgASAERwRAA0AgAS0AACIAQSBHBEACQAJAAkAgAEHIAGsOCwABswGzAbMBswGzAbMBswGzAQKzAQsgAUEBaiEBQdIAIQMMtwILIAFBAWohAUHTACEDDLYCCyABQQFqIQFB1AAhAwy1AgsgBCABQQFqIgFHDQALQeQAIQMMzAILQeQAIQMMywILA0AgAS0AAEHwwgBqLQAAIgBBAUcEQCAAQQJrDgOnAaYBpQGkAQsgBCABQQFqIgFHDQALQeYAIQMMygILIAFBAWogASAERw0CGkHnACEDDMkCCwNAIAEtAABB8MQAai0AACIAQQFHBEACQCAAQQJrDgSiAaEBoAEAnwELQdcAIQMMsQILIAQgAUEBaiIBRw0AC0HoACEDDMgCCyABIARGBEBB6QAhAwzIAgsCQCABLQAAIgBBCmsOGrcBmwGbAbQBmwGbAZsBmwGbAZsBmwGbAZsBmwGbAZsBmwGbAZsBmwGbAZsBpAGbAZsBAJkBCyABQQFqCyEBQQYhAwytAgsDQCABLQAAQfDGAGotAABBAUcNfSAEIAFBAWoiAUcNAAtB6gAhAwzFAgsgAUEBaiABIARHDQIaQesAIQMMxAILIAEgBEYEQEHsACEDDMQCCyABQQFqDAELIAEgBEYEQEHtACEDDMMCCyABQQFqCyEBQQQhAwyoAgsgASAERgRAQe4AIQMMwQILAkACQAJAIAEtAABB8MgAai0AAEEBaw4HkAGPAY4BAHwBAo0BCyABQQFqIQEMCwsgAUEBagyTAQtBACEDIAJBADYCHCACQZsSNgIQIAJBBzYCDCACIAFBAWo2AhQMwAILAkADQCABLQAAQfDIAGotAAAiAEEERwRAAkACQCAAQQFrDgeUAZMBkgGNAQAEAY0BC0HaACEDDKoCCyABQQFqIQFB3AAhAwypAgsgBCABQQFqIgFHDQALQe8AIQMMwAILIAFBAWoMkQELIAQgASIARgRAQfAAIQMMvwILIAAtAABBL0cNASAAQQFqIQEMBwsgBCABIgBGBEBB8QAhAwy+AgsgAC0AACIBQS9GBEAgAEEBaiEBQd0AIQMMpQILIAFBCmsiA0EWSw0AIAAhAUEBIAN0QYmAgAJxDfkBC0EAIQMgAkEANgIcIAIgADYCFCACQYwcNgIQIAJBBzYCDAy8AgsgASAERwRAIAFBAWohAUHeACEDDKMCC0HyACEDDLsCCyABIARGBEBB9AAhAwy7AgsCQCABLQAAQfDMAGotAABBAWsOA/cBcwCCAQtB4QAhAwyhAgsgASAERwRAA0AgAS0AAEHwygBqLQAAIgBBA0cEQAJAIABBAWsOAvkBAIUBC0HfACEDDKMCCyAEIAFBAWoiAUcNAAtB8wAhAwy6AgtB8wAhAwy5AgsgASAERwRAIAJBDzYCCCACIAE2AgRB4AAhAwygAgtB9QAhAwy4AgsgASAERgRAQfYAIQMMuAILIAJBDzYCCCACIAE2AgQLQQMhAwydAgsDQCABLQAAQSBHDY4CIAQgAUEBaiIBRw0AC0H3ACEDDLUCCyABIARGBEBB+AAhAwy1AgsgAS0AAEEgRw16IAFBAWohAQxbC0EAIQACQCACKAI4IgNFDQAgAygCOCIDRQ0AIAIgAxEAACEACyAADXgMgAILIAEgBEYEQEH6ACEDDLMCCyABLQAAQcwARw10IAFBAWohAUETDHYLQfsAIQMgASAERg2xAiACKAIAIgAgBCABa2ohBSABIABrQQVqIQYDQCABLQAAIABB8M4Aai0AAEcNcyAAQQVGDXUgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMsQILIAEgBEYEQEH8ACEDDLECCwJAAkAgAS0AAEHDAGsODAB0dHR0dHR0dHR0AXQLIAFBAWohAUHmACEDDJgCCyABQQFqIQFB5wAhAwyXAgtB/QAhAyABIARGDa8CIAIoAgAiACAEIAFraiEFIAEgAGtBAmohBgJAA0AgAS0AACAAQe3PAGotAABHDXIgAEECRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAiAFNgIADLACCyACQQA2AgAgBkEBaiEBQRAMcwtB/gAhAyABIARGDa4CIAIoAgAiACAEIAFraiEFIAEgAGtBBWohBgJAA0AgAS0AACAAQfbOAGotAABHDXEgAEEFRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAiAFNgIADK8CCyACQQA2AgAgBkEBaiEBQRYMcgtB/wAhAyABIARGDa0CIAIoAgAiACAEIAFraiEFIAEgAGtBA2ohBgJAA0AgAS0AACAAQfzOAGotAABHDXAgAEEDRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAiAFNgIADK4CCyACQQA2AgAgBkEBaiEBQQUMcQsgASAERgRAQYABIQMMrQILIAEtAABB2QBHDW4gAUEBaiEBQQgMcAsgASAERgRAQYEBIQMMrAILAkACQCABLQAAQc4Aaw4DAG8BbwsgAUEBaiEBQesAIQMMkwILIAFBAWohAUHsACEDDJICCyABIARGBEBBggEhAwyrAgsCQAJAIAEtAABByABrDggAbm5ubm5uAW4LIAFBAWohAUHqACEDDJICCyABQQFqIQFB7QAhAwyRAgtBgwEhAyABIARGDakCIAIoAgAiACAEIAFraiEFIAEgAGtBAmohBgJAA0AgAS0AACAAQYDPAGotAABHDWwgAEECRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAiAFNgIADKoCCyACQQA2AgAgBkEBaiEBQQAMbQtBhAEhAyABIARGDagCIAIoAgAiACAEIAFraiEFIAEgAGtBBGohBgJAA0AgAS0AACAAQYPPAGotAABHDWsgAEEERg0BIABBAWohACAEIAFBAWoiAUcNAAsgAiAFNgIADKkCCyACQQA2AgAgBkEBaiEBQSMMbAsgASAERgRAQYUBIQMMqAILAkACQCABLQAAQcwAaw4IAGtra2trawFrCyABQQFqIQFB7wAhAwyPAgsgAUEBaiEBQfAAIQMMjgILIAEgBEYEQEGGASEDDKcCCyABLQAAQcUARw1oIAFBAWohAQxgC0GHASEDIAEgBEYNpQIgAigCACIAIAQgAWtqIQUgASAAa0EDaiEGAkADQCABLQAAIABBiM8Aai0AAEcNaCAAQQNGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMpgILIAJBADYCACAGQQFqIQFBLQxpC0GIASEDIAEgBEYNpAIgAigCACIAIAQgAWtqIQUgASAAa0EIaiEGAkADQCABLQAAIABB0M8Aai0AAEcNZyAAQQhGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMpQILIAJBADYCACAGQQFqIQFBKQxoCyABIARGBEBBiQEhAwykAgtBASABLQAAQd8ARw1nGiABQQFqIQEMXgtBigEhAyABIARGDaICIAIoAgAiACAEIAFraiEFIAEgAGtBAWohBgNAIAEtAAAgAEGMzwBqLQAARw1kIABBAUYN+gEgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMogILQYsBIQMgASAERg2hAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGOzwBqLQAARw1kIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyiAgsgAkEANgIAIAZBAWohAUECDGULQYwBIQMgASAERg2gAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHwzwBqLQAARw1jIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyhAgsgAkEANgIAIAZBAWohAUEfDGQLQY0BIQMgASAERg2fAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHyzwBqLQAARw1iIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAygAgsgAkEANgIAIAZBAWohAUEJDGMLIAEgBEYEQEGOASEDDJ8CCwJAAkAgAS0AAEHJAGsOBwBiYmJiYgFiCyABQQFqIQFB+AAhAwyGAgsgAUEBaiEBQfkAIQMMhQILQY8BIQMgASAERg2dAiACKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEGRzwBqLQAARw1gIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyeAgsgAkEANgIAIAZBAWohAUEYDGELQZABIQMgASAERg2cAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGXzwBqLQAARw1fIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAydAgsgAkEANgIAIAZBAWohAUEXDGALQZEBIQMgASAERg2bAiACKAIAIgAgBCABa2ohBSABIABrQQZqIQYCQANAIAEtAAAgAEGazwBqLQAARw1eIABBBkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAycAgsgAkEANgIAIAZBAWohAUEV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JSIARQ0RIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMtAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0gIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMswELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0iIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMsgELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0OIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMsQELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0dIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMsAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0fIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMrwELIABBP0cNASABQQFqCyEBQQUhAwyUAQtBACEDIAJBADYCHCACIAE2AhQgAkH9EjYCECACQQc2AgwMrAELIAJBADYCHCACIAE2AhQgAkHcCDYCECACQQc2AgxBACEDDKsBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNByACQeUANgIcIAIgATYCFCACIAA2AgxBACEDDKoBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNFiACQdMANgIcIAIgATYCFCACIAA2AgxBACEDDKkBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNGCACQdIANgIcIAIgATYCFCACIAA2AgxBACEDDKgBCyACQQA2AhwgAiABNgIUIAJBxgo2AhAgAkEHNgIMQQAhAwynAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQMgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwymAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRIgAkHTADYCHCACIAE2AhQgAiAANgIMQQAhAwylAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRQgAkHSADYCHCACIAE2AhQgAiAANgIMQQAhAwykAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQAgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwyjAQtB1QAhAwyJAQsgAEEVRwRAIAJBADYCHCACIAE2AhQgAkG5DTYCECACQRo2AgxB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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB5ABrDvQDY2IAAWFhYWFhYQIDBAVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhBgcICQoLDA0OD2FhYWFhEGFhYWFhYWFhYWFhEWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYRITFBUWFxgZGhthYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2YTc4OTphYWFhYWFhYTthYWE8YWFhYT0+P2FhYWFhYWFhQGFhQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYUJDREVGR0hJSktMTU5PUFFSU2FhYWFhYWFhVFVWV1hZWlthXF1hYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFeYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhX2BhC0HhJw8LQaQhDwtByywPC0H+MQ8LQcAkDwtBqyQPC0GNKA8LQeImDwtBgDAPC0G5Lw8LQdckDwtB7x8PC0HhHw8LQfofDwtB8iAPC0GoLw8LQa4yDwtBiDAPC0HsJw8LQYIiDwtBjh0PC0HQLg8LQcojDwtBxTIPC0HfHA8LQdIcDwtBxCAPC0HXIA8LQaIfDwtB7S4PC0GrMA8LQdQlDwtBzC4PC0H6Lg8LQfwrDwtB0jAPC0HxHQ8LQbsgDwtB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AAADAEGUCAsFBAAAAAUAQaQICwkGAAAABwAAAAgAQdwIC4otSW52YWxpZCBjaGFyIGluIHVybCBxdWVyeQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2JvZHkAQ29udGVudC1MZW5ndGggb3ZlcmZsb3cAQ2h1bmsgc2l6ZSBvdmVyZmxvdwBSZXNwb25zZSBvdmVyZmxvdwBJbnZhbGlkIG1ldGhvZCBmb3IgSFRUUC94LnggcmVxdWVzdABJbnZhbGlkIG1ldGhvZCBmb3IgUlRTUC94LnggcmVxdWVzdABFeHBlY3RlZCBTT1VSQ0UgbWV0aG9kIGZvciBJQ0UveC54IHJlcXVlc3QASW52YWxpZCBjaGFyIGluIHVybCBmcmFnbWVudCBzdGFydABFeHBlY3RlZCBkb3QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9zdGF0dXMASW52YWxpZCByZXNwb25zZSBzdGF0dXMASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucwBVc2VyIGNhbGxiYWNrIGVycm9yAGBvbl9yZXNldGAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2hlYWRlcmAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfYmVnaW5gIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fdmFsdWVgIGNhbGxiYWNrIGVycm9yAGBvbl9zdGF0dXNfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl92ZXJzaW9uX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdXJsX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWV0aG9kX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX25hbWVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3ZlcnNpb24ASW52YWxpZCBtaW5vciB2ZXJzaW9uAEludmFsaWQgbWFqb3IgdmVyc2lvbgBFeHBlY3RlZCBzcGFjZSBhZnRlciB2ZXJzaW9uAEV4cGVjdGVkIENSTEYgYWZ0ZXIgdmVyc2lvbgBJbnZhbGlkIEhUVFAgdmVyc2lvbgBJbnZhbGlkIGhlYWRlciB0b2tlbgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3VybABJbnZhbGlkIGNoYXJhY3RlcnMgaW4gdXJsAFVuZXhwZWN0ZWQgc3RhcnQgY2hhciBpbiB1cmwARG91YmxlIEAgaW4gdXJsAEVtcHR5IENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhcmFjdGVyIGluIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AgaGVhZGVyIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGUgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZWQgdmFsdWUAUGF1c2VkIGJ5IG9uX2hlYWRlcnNfY29tcGxldGUASW52YWxpZCBFT0Ygc3RhdGUAb25fcmVzZXQgcGF1c2UAb25fY2h1bmtfaGVhZGVyIHBhdXNlAG9uX21lc3NhZ2VfYmVnaW4gcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlIHBhdXNlAG9uX3N0YXR1c19jb21wbGV0ZSBwYXVzZQBvbl92ZXJzaW9uX2NvbXBsZXRlIHBhdXNlAG9uX3VybF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGUgcGF1c2UAb25fbWVzc2FnZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXRob2RfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lIHBhdXNlAFVuZXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgc3RhcnQgbGluZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgbmFtZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX21ldGhvZABFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AAU1dJVENIX1BST1hZAFVTRV9QUk9YWQBNS0FDVElWSVRZAFVOUFJPQ0VTU0FCTEVfRU5USVRZAENPUFkATU9WRURfUEVSTUFORU5UTFkAVE9PX0VBUkxZAE5PVElGWQBGQUlMRURfREVQRU5ERU5DWQBCQURfR0FURVdBWQBQTEFZAFBVVABDSEVDS09VVABHQVRFV0FZX1RJTUVPVVQAUkVRVUVTVF9USU1FT1VUAE5FVFdPUktfQ09OTkVDVF9USU1FT1VUAENPTk5FQ1RJT05fVElNRU9VVABMT0dJTl9USU1FT1VUAE5FVFdPUktfUkVBRF9USU1FT1VUAFBPU1QATUlTRElSRUNURURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9MT0FEX0JBTEFOQ0VEX1JFUVVFU1QAQkFEX1JFUVVFU1QASFRUUF9SRVFVRVNUX1NFTlRfVE9fSFRUUFNfUE9SVABSRVBPUlQASU1fQV9URUFQT1QAUkVTRVRfQ09OVEVOVABOT19DT05URU5UAFBBUlRJQUxfQ09OVEVOVABIUEVfSU5WQUxJRF9DT05TVEFOVABIUEVfQ0JfUkVTRVQAR0VUAEhQRV9TVFJJQ1QAQ09ORkxJQ1QAVEVNUE9SQVJZX1JFRElSRUNUAFBFUk1BTkVOVF9SRURJUkVDVABDT05ORUNUAE1VTFRJX1NUQVRVUwBIUEVfSU5WQUxJRF9TVEFUVVMAVE9PX01BTllfUkVRVUVTVFMARUFSTFlfSElOVFMAVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMAT1BUSU9OUwBTV0lUQ0hJTkdfUFJPVE9DT0xTAFZBUklBTlRfQUxTT19ORUdPVElBVEVTAE1VTFRJUExFX0NIT0lDRVMASU5URVJOQUxfU0VSVkVSX0VSUk9SAFdFQl9TRVJWRVJfVU5LTk9XTl9FUlJPUgBSQUlMR1VOX0VSUk9SAElERU5USVRZX1BST1ZJREVSX0FVVEhFTlRJQ0FUSU9OX0VSUk9SAFNTTF9DRVJUSUZJQ0FURV9FUlJPUgBJTlZBTElEX1hfRk9SV0FSREVEX0ZPUgBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIAU0VFX09USEVSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABXRUJfU0VSVkVSX0lTX0RPV04AVEVBUkRPV04ASFBFX0NMT1NFRF9DT05ORUNUSU9OAEhFVVJJU1RJQ19FWFBJUkFUSU9OAERJU0NPTk5FQ1RFRF9PUEVSQVRJT04ATk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBTSVRFX0lTX0ZST1pFTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASU5WQUxJRF9UT0tFTgBGT1JCSURERU4ARU5IQU5DRV9ZT1VSX0NBTE0ASFBFX0lOVkFMSURfVVJMAEJMT0NLRURfQllfUEFSRU5UQUxfQ09OVFJPTABNS0NPTABBQ0wASFBFX0lOVEVSTkFMAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VfVU5PRkZJQ0lBTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkAUkVUUllfV0lUSABIUEVfSU5WQUxJRF9DT05URU5UX0xFTkdUSABIUEVfVU5FWFBFQ1RFRF9DT05URU5UX0xFTkdUSABGTFVTSABQUk9QUEFUQ0gATS1TRUFSQ0gAVVJJX1RPT19MT05HAFBST0NFU1NJTkcATUlTQ0VMTEFORU9VU19QRVJTSVNURU5UX1dBUk5JTkcATUlTQ0VMTEFORU9VU19XQVJOSU5HAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAENPTlRJTlVFAEhQRV9DQl9TVEFUVVNfQ09NUExFVEUASFBFX0NCX0hFQURFUlNfQ09NUExFVEUASFBFX0NCX1ZFUlNJT05fQ09NUExFVEUASFBFX0NCX1VSTF9DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX0hFQURFUl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fTkFNRV9DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBIUEVfQ0JfTUVUSE9EX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfRklFTERfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBJTlZBTElEX1NTTF9DRVJUSUZJQ0FURQBQQVVTRQBOT19SRVNQT05TRQBVTlNVUFBPUlRFRF9NRURJQV9UWVBFAEdPTkUATk9UX0FDQ0VQVEFCTEUAU0VSVklDRV9VTkFWQUlMQUJMRQBSQU5HRV9OT1RfU0FUSVNGSUFCTEUAT1JJR0lOX0lTX1VOUkVBQ0hBQkxFAFJFU1BPTlNFX0lTX1NUQUxFAFBVUkdFAE1FUkdFAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UAUkVRVUVTVF9IRUFERVJfVE9PX0xBUkdFAFBBWUxPQURfVE9PX0xBUkdFAElOU1VGRklDSUVOVF9TVE9SQUdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAEhQRV9VTkVYUEVDVEVEX1NQQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QATk9UX0ZPVU5EAFBST1BGSU5EAFVOQklORABSRUJJTkQAVU5BVVRIT1JJWkVEAE1FVEhPRF9OT1RfQUxMT1dFRABIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRABBTFJFQURZX1JFUE9SVEVEAEFDQ0VQVEVEAE5PVF9JTVBMRU1FTlRFRABMT09QX0RFVEVDVEVEAEhQRV9DUl9FWFBFQ1RFRABIUEVfTEZfRVhQRUNURUQAQ1JFQVRFRABJTV9VU0VEAEhQRV9QQVVTRUQAVElNRU9VVF9PQ0NVUkVEAFBBWU1FTlRfUkVRVUlSRUQAUFJFQ09ORElUSU9OX1JFUVVJUkVEAFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATEVOR1RIX1JFUVVJUkVEAFNTTF9DRVJUSUZJQ0FURV9SRVFVSVJFRABVUEdSQURFX1JFUVVJUkVEAFBBR0VfRVhQSVJFRABQUkVDT05ESVRJT05fRkFJTEVEAEVYUEVDVEFUSU9OX0ZBSUxFRABSRVZBTElEQVRJT05fRkFJTEVEAFNTTF9IQU5EU0hBS0VfRkFJTEVEAExPQ0tFRABUUkFOU0ZPUk1BVElPTl9BUFBMSUVEAE5PVF9NT0RJRklFRABOT1RfRVhURU5ERUQAQkFORFdJRFRIX0xJTUlUX0VYQ0VFREVEAFNJVEVfSVNfT1ZFUkxPQURFRABIRUFEAEV4cGVjdGVkIEhUVFAvAABeEwAAJhMAADAQAADwFwAAnRMAABUSAAA5FwAA8BIAAAoQAAB1EgAArRIAAIITAABPFAAAfxAAAKAVAAAjFAAAiRIAAIsUAABNFQAA1BEAAM8UAAAQGAAAyRYAANwWAADBEQAA4BcAALsUAAB0FAAAfBUAAOUUAAAIFwAAHxAAAGUVAACjFAAAKBUAAAIVAACZFQAALBAAAIsZAABPDwAA1A4AAGoQAADOEAAAAhcAAIkOAABuEwAAHBMAAGYUAABWFwAAwRMAAM0TAABsEwAAaBcAAGYXAABfFwAAIhMAAM4PAABpDgAA2A4AAGMWAADLEwAAqg4AACgXAAAmFwAAxRMAAF0WAADoEQAAZxMAAGUTAADyFgAAcxMAAB0XAAD5FgAA8xEAAM8OAADOFQAADBIAALMRAAClEQAAYRAAADIXAAC7EwBB+TULAQEAQZA2C+ABAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQf03CwEBAEGROAteAgMCAgICAgAAAgIAAgIAAgICAgICAgICAgAEAAAAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAIAAgBB/TkLAQEAQZE6C14CAAICAgICAAACAgACAgACAgICAgICAgICAAMABAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAEHwOwsNbG9zZWVlcC1hbGl2ZQBBiTwLAQEAQaA8C+ABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQYk+CwEBAEGgPgvnAQEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZABBsMAAC18BAQABAQEBAQAAAQEAAQEAAQEBAQEBAQEBAQAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQBBkMIACyFlY3Rpb25lbnQtbGVuZ3Rob25yb3h5LWNvbm5lY3Rpb24AQcDCAAstcmFuc2Zlci1lbmNvZGluZ3BncmFkZQ0KDQoNClNNDQoNClRUUC9DRS9UU1AvAEH5wgALBQECAAEDAEGQwwAL4AEEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB+cQACwUBAgABAwBBkMUAC+ABBAEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQfnGAAsEAQAAAQBBkccAC98BAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB+sgACwQBAAACAEGQyQALXwMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAEH6ygALBAEAAAEAQZDLAAsBAQBBqssAC0ECAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBB+swACwQBAAABAEGQzQALAQEAQZrNAAsGAgAAAAACAEGxzQALOgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQfDOAAuWAU5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw==", "base64");
}));
var require_constants$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var corsSafeListedMethods = [
		"GET",
		"HEAD",
		"POST"
	];
	var corsSafeListedMethodsSet$1 = new Set(corsSafeListedMethods);
	var nullBodyStatus$2 = [
		101,
		204,
		205,
		304
	];
	var redirectStatus = [
		301,
		302,
		303,
		307,
		308
	];
	var redirectStatusSet$3 = new Set(redirectStatus);
	var badPorts = [
		"1",
		"7",
		"9",
		"11",
		"13",
		"15",
		"17",
		"19",
		"20",
		"21",
		"22",
		"23",
		"25",
		"37",
		"42",
		"43",
		"53",
		"69",
		"77",
		"79",
		"87",
		"95",
		"101",
		"102",
		"103",
		"104",
		"109",
		"110",
		"111",
		"113",
		"115",
		"117",
		"119",
		"123",
		"135",
		"137",
		"139",
		"143",
		"161",
		"179",
		"389",
		"427",
		"465",
		"512",
		"513",
		"514",
		"515",
		"526",
		"530",
		"531",
		"532",
		"540",
		"548",
		"554",
		"556",
		"563",
		"587",
		"601",
		"636",
		"989",
		"990",
		"993",
		"995",
		"1719",
		"1720",
		"1723",
		"2049",
		"3659",
		"4045",
		"4190",
		"5060",
		"5061",
		"6000",
		"6566",
		"6665",
		"6666",
		"6667",
		"6668",
		"6669",
		"6679",
		"6697",
		"10080"
	];
	var badPortsSet$1 = new Set(badPorts);
	var referrerPolicy$1 = [
		"",
		"no-referrer",
		"no-referrer-when-downgrade",
		"same-origin",
		"origin",
		"strict-origin",
		"origin-when-cross-origin",
		"strict-origin-when-cross-origin",
		"unsafe-url"
	];
	var referrerPolicySet = new Set(referrerPolicy$1);
	var requestRedirect$1 = [
		"follow",
		"manual",
		"error"
	];
	var safeMethods = [
		"GET",
		"HEAD",
		"OPTIONS",
		"TRACE"
	];
	var safeMethodsSet$1 = new Set(safeMethods);
	var requestMode$1 = [
		"navigate",
		"same-origin",
		"no-cors",
		"cors"
	];
	var requestCredentials$1 = [
		"omit",
		"same-origin",
		"include"
	];
	var requestCache$1 = [
		"default",
		"no-store",
		"reload",
		"no-cache",
		"force-cache",
		"only-if-cached"
	];
	var requestBodyHeader$1 = [
		"content-encoding",
		"content-language",
		"content-location",
		"content-type",
		"content-length"
	];
	var requestDuplex$1 = ["half"];
	var forbiddenMethods = [
		"CONNECT",
		"TRACE",
		"TRACK"
	];
	var forbiddenMethodsSet$1 = new Set(forbiddenMethods);
	var subresource = [
		"audio",
		"audioworklet",
		"font",
		"image",
		"manifest",
		"paintworklet",
		"script",
		"style",
		"track",
		"video",
		"xslt",
		""
	];
	module.exports = {
		subresource,
		forbiddenMethods,
		requestBodyHeader: requestBodyHeader$1,
		referrerPolicy: referrerPolicy$1,
		requestRedirect: requestRedirect$1,
		requestMode: requestMode$1,
		requestCredentials: requestCredentials$1,
		requestCache: requestCache$1,
		redirectStatus,
		corsSafeListedMethods,
		nullBodyStatus: nullBodyStatus$2,
		safeMethods,
		badPorts,
		requestDuplex: requestDuplex$1,
		subresourceSet: new Set(subresource),
		badPortsSet: badPortsSet$1,
		redirectStatusSet: redirectStatusSet$3,
		corsSafeListedMethodsSet: corsSafeListedMethodsSet$1,
		safeMethodsSet: safeMethodsSet$1,
		forbiddenMethodsSet: forbiddenMethodsSet$1,
		referrerPolicySet
	};
}));
var require_global$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalOrigin = Symbol.for("undici.globalOrigin.1");
	function getGlobalOrigin$2() {
		return globalThis[globalOrigin];
	}
	function setGlobalOrigin$1(newOrigin) {
		if (newOrigin === void 0) {
			Object.defineProperty(globalThis, globalOrigin, {
				value: void 0,
				writable: true,
				enumerable: false,
				configurable: false
			});
			return;
		}
		const parsedURL = new URL(newOrigin);
		if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") throw new TypeError(`Only http & https urls are allowed, received ${parsedURL.protocol}`);
		Object.defineProperty(globalThis, globalOrigin, {
			value: parsedURL,
			writable: true,
			enumerable: false,
			configurable: false
		});
	}
	module.exports = {
		getGlobalOrigin: getGlobalOrigin$2,
		setGlobalOrigin: setGlobalOrigin$1
	};
}));
var require_data_url = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$23 = __require("node:assert");
	var encoder = new TextEncoder();
	var HTTP_TOKEN_CODEPOINTS$1 = /^[!#$%&'*+\-.^_|~A-Za-z0-9]+$/;
	var HTTP_WHITESPACE_REGEX = /[\u000A\u000D\u0009\u0020]/;
	var ASCII_WHITESPACE_REPLACE_REGEX = /[\u0009\u000A\u000C\u000D\u0020]/g;
	var HTTP_QUOTED_STRING_TOKENS = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
	function dataURLProcessor$1(dataURL) {
		assert$23(dataURL.protocol === "data:");
		let input = URLSerializer$4(dataURL, true);
		input = input.slice(5);
		const position = { position: 0 };
		let mimeType = collectASequenceOfCodePointsFast$2(",", input, position);
		const mimeTypeLength = mimeType.length;
		mimeType = removeASCIIWhitespace(mimeType, true, true);
		if (position.position >= input.length) return "failure";
		position.position++;
		const encodedBody = input.slice(mimeTypeLength + 1);
		let body = stringPercentDecode(encodedBody);
		if (/;(\u0020){0,}base64$/i.test(mimeType)) {
			const stringBody = isomorphicDecode$1(body);
			body = forgivingBase64(stringBody);
			if (body === "failure") return "failure";
			mimeType = mimeType.slice(0, -6);
			mimeType = mimeType.replace(/(\u0020)+$/, "");
			mimeType = mimeType.slice(0, -1);
		}
		if (mimeType.startsWith(";")) mimeType = "text/plain" + mimeType;
		let mimeTypeRecord = parseMIMEType$4(mimeType);
		if (mimeTypeRecord === "failure") mimeTypeRecord = parseMIMEType$4("text/plain;charset=US-ASCII");
		return {
			mimeType: mimeTypeRecord,
			body
		};
	}
	function URLSerializer$4(url, excludeFragment = false) {
		if (!excludeFragment) return url.href;
		const href = url.href;
		const hashLength = url.hash.length;
		const serialized = hashLength === 0 ? href : href.substring(0, href.length - hashLength);
		if (!hashLength && href.endsWith("#")) return serialized.slice(0, -1);
		return serialized;
	}
	function collectASequenceOfCodePoints$1(condition, input, position) {
		let result = "";
		while (position.position < input.length && condition(input[position.position])) {
			result += input[position.position];
			position.position++;
		}
		return result;
	}
	function collectASequenceOfCodePointsFast$2(char, input, position) {
		const idx = input.indexOf(char, position.position);
		const start = position.position;
		if (idx === -1) {
			position.position = input.length;
			return input.slice(start);
		}
		position.position = idx;
		return input.slice(start, position.position);
	}
	function stringPercentDecode(input) {
		const bytes = encoder.encode(input);
		return percentDecode(bytes);
	}
	function isHexCharByte(byte) {
		return byte >= 48 && byte <= 57 || byte >= 65 && byte <= 70 || byte >= 97 && byte <= 102;
	}
	function hexByteToNumber(byte) {
		return byte >= 48 && byte <= 57 ? byte - 48 : (byte & 223) - 55;
	}
	function percentDecode(input) {
		const length = input.length;
		const output = new Uint8Array(length);
		let j = 0;
		for (let i = 0; i < length; ++i) {
			const byte = input[i];
			if (byte !== 37) output[j++] = byte;
			else if (byte === 37 && !(isHexCharByte(input[i + 1]) && isHexCharByte(input[i + 2]))) output[j++] = 37;
			else {
				output[j++] = hexByteToNumber(input[i + 1]) << 4 | hexByteToNumber(input[i + 2]);
				i += 2;
			}
		}
		return length === j ? output : output.subarray(0, j);
	}
	function parseMIMEType$4(input) {
		input = removeHTTPWhitespace$1(input, true, true);
		const position = { position: 0 };
		const type = collectASequenceOfCodePointsFast$2("/", input, position);
		if (type.length === 0 || !HTTP_TOKEN_CODEPOINTS$1.test(type)) return "failure";
		if (position.position > input.length) return "failure";
		position.position++;
		let subtype = collectASequenceOfCodePointsFast$2(";", input, position);
		subtype = removeHTTPWhitespace$1(subtype, false, true);
		if (subtype.length === 0 || !HTTP_TOKEN_CODEPOINTS$1.test(subtype)) return "failure";
		const typeLowercase = type.toLowerCase();
		const subtypeLowercase = subtype.toLowerCase();
		const mimeType = {
			type: typeLowercase,
			subtype: subtypeLowercase,
			parameters: /* @__PURE__ */ new Map(),
			essence: `${typeLowercase}/${subtypeLowercase}`
		};
		while (position.position < input.length) {
			position.position++;
			collectASequenceOfCodePoints$1((char) => HTTP_WHITESPACE_REGEX.test(char), input, position);
			let parameterName = collectASequenceOfCodePoints$1((char) => char !== ";" && char !== "=", input, position);
			parameterName = parameterName.toLowerCase();
			if (position.position < input.length) {
				if (input[position.position] === ";") continue;
				position.position++;
			}
			if (position.position > input.length) break;
			let parameterValue = null;
			if (input[position.position] === "\"") {
				parameterValue = collectAnHTTPQuotedString$1(input, position, true);
				collectASequenceOfCodePointsFast$2(";", input, position);
			} else {
				parameterValue = collectASequenceOfCodePointsFast$2(";", input, position);
				parameterValue = removeHTTPWhitespace$1(parameterValue, false, true);
				if (parameterValue.length === 0) continue;
			}
			if (parameterName.length !== 0 && HTTP_TOKEN_CODEPOINTS$1.test(parameterName) && (parameterValue.length === 0 || HTTP_QUOTED_STRING_TOKENS.test(parameterValue)) && !mimeType.parameters.has(parameterName)) mimeType.parameters.set(parameterName, parameterValue);
		}
		return mimeType;
	}
	function forgivingBase64(data) {
		data = data.replace(ASCII_WHITESPACE_REPLACE_REGEX, "");
		let dataLength = data.length;
		if (dataLength % 4 === 0) {
			if (data.charCodeAt(dataLength - 1) === 61) {
				--dataLength;
				if (data.charCodeAt(dataLength - 1) === 61) --dataLength;
			}
		}
		if (dataLength % 4 === 1) return "failure";
		if (/[^+/0-9A-Za-z]/.test(data.length === dataLength ? data : data.substring(0, dataLength))) return "failure";
		const buffer$1 = Buffer.from(data, "base64");
		return new Uint8Array(buffer$1.buffer, buffer$1.byteOffset, buffer$1.byteLength);
	}
	function collectAnHTTPQuotedString$1(input, position, extractValue) {
		const positionStart = position.position;
		let value = "";
		assert$23(input[position.position] === "\"");
		position.position++;
		while (true) {
			value += collectASequenceOfCodePoints$1((char) => char !== "\"" && char !== "\\", input, position);
			if (position.position >= input.length) break;
			const quoteOrBackslash = input[position.position];
			position.position++;
			if (quoteOrBackslash === "\\") {
				if (position.position >= input.length) {
					value += "\\";
					break;
				}
				value += input[position.position];
				position.position++;
			} else {
				assert$23(quoteOrBackslash === "\"");
				break;
			}
		}
		if (extractValue) return value;
		return input.slice(positionStart, position.position);
	}
	function serializeAMimeType$4(mimeType) {
		assert$23(mimeType !== "failure");
		const { parameters, essence } = mimeType;
		let serialization = essence;
		for (let [name, value] of parameters.entries()) {
			serialization += ";";
			serialization += name;
			serialization += "=";
			if (!HTTP_TOKEN_CODEPOINTS$1.test(value)) {
				value = value.replace(/(\\|")/g, "\\$1");
				value = "\"" + value;
				value += "\"";
			}
			serialization += value;
		}
		return serialization;
	}
	function isHTTPWhiteSpace(char) {
		return char === 13 || char === 10 || char === 9 || char === 32;
	}
	function removeHTTPWhitespace$1(str, leading = true, trailing = true) {
		return removeChars$2(str, leading, trailing, isHTTPWhiteSpace);
	}
	function isASCIIWhitespace(char) {
		return char === 13 || char === 10 || char === 9 || char === 12 || char === 32;
	}
	function removeASCIIWhitespace(str, leading = true, trailing = true) {
		return removeChars$2(str, leading, trailing, isASCIIWhitespace);
	}
	function removeChars$2(str, leading, trailing, predicate) {
		let lead = 0;
		let trail = str.length - 1;
		if (leading) while (lead < str.length && predicate(str.charCodeAt(lead))) lead++;
		if (trailing) while (trail > 0 && predicate(str.charCodeAt(trail))) trail--;
		return lead === 0 && trail === str.length - 1 ? str : str.slice(lead, trail + 1);
	}
	function isomorphicDecode$1(input) {
		const length = input.length;
		if (65535 > length) return String.fromCharCode.apply(null, input);
		let result = "";
		let i = 0;
		let addition = 65535;
		while (i < length) {
			if (i + addition > length) addition = length - i;
			result += String.fromCharCode.apply(null, input.subarray(i, i += addition));
		}
		return result;
	}
	function minimizeSupportedMimeType$1(mimeType) {
		switch (mimeType.essence) {
			case "application/ecmascript":
			case "application/javascript":
			case "application/x-ecmascript":
			case "application/x-javascript":
			case "text/ecmascript":
			case "text/javascript":
			case "text/javascript1.0":
			case "text/javascript1.1":
			case "text/javascript1.2":
			case "text/javascript1.3":
			case "text/javascript1.4":
			case "text/javascript1.5":
			case "text/jscript":
			case "text/livescript":
			case "text/x-ecmascript":
			case "text/x-javascript": return "text/javascript";
			case "application/json":
			case "text/json": return "application/json";
			case "image/svg+xml": return "image/svg+xml";
			case "text/xml":
			case "application/xml": return "application/xml";
		}
		if (mimeType.subtype.endsWith("+json")) return "application/json";
		if (mimeType.subtype.endsWith("+xml")) return "application/xml";
		return "";
	}
	module.exports = {
		dataURLProcessor: dataURLProcessor$1,
		URLSerializer: URLSerializer$4,
		collectASequenceOfCodePoints: collectASequenceOfCodePoints$1,
		collectASequenceOfCodePointsFast: collectASequenceOfCodePointsFast$2,
		stringPercentDecode,
		parseMIMEType: parseMIMEType$4,
		collectAnHTTPQuotedString: collectAnHTTPQuotedString$1,
		serializeAMimeType: serializeAMimeType$4,
		removeChars: removeChars$2,
		removeHTTPWhitespace: removeHTTPWhitespace$1,
		minimizeSupportedMimeType: minimizeSupportedMimeType$1,
		HTTP_TOKEN_CODEPOINTS: HTTP_TOKEN_CODEPOINTS$1,
		isomorphicDecode: isomorphicDecode$1
	};
}));
var require_webidl = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { types: types$3, inspect } = __require("node:util");
	var { markAsUncloneable } = __require("node:worker_threads");
	var { toUSVString } = require_util$7();
	var webidl$16 = {};
	webidl$16.converters = {};
	webidl$16.util = {};
	webidl$16.errors = {};
	webidl$16.errors.exception = function(message) {
		return /* @__PURE__ */ new TypeError(`${message.header}: ${message.message}`);
	};
	webidl$16.errors.conversionFailed = function(context) {
		const plural = context.types.length === 1 ? "" : " one of";
		const message = `${context.argument} could not be converted to${plural}: ${context.types.join(", ")}.`;
		return webidl$16.errors.exception({
			header: context.prefix,
			message
		});
	};
	webidl$16.errors.invalidArgument = function(context) {
		return webidl$16.errors.exception({
			header: context.prefix,
			message: `"${context.value}" is an invalid ${context.type}.`
		});
	};
	webidl$16.brandCheck = function(V, I, opts) {
		if (opts?.strict !== false) {
			if (!(V instanceof I)) {
				const err = /* @__PURE__ */ new TypeError("Illegal invocation");
				err.code = "ERR_INVALID_THIS";
				throw err;
			}
		} else if (V?.[Symbol.toStringTag] !== I.prototype[Symbol.toStringTag]) {
			const err = /* @__PURE__ */ new TypeError("Illegal invocation");
			err.code = "ERR_INVALID_THIS";
			throw err;
		}
	};
	webidl$16.argumentLengthCheck = function({ length }, min, ctx) {
		if (length < min) throw webidl$16.errors.exception({
			message: `${min} argument${min !== 1 ? "s" : ""} required, but${length ? " only" : ""} ${length} found.`,
			header: ctx
		});
	};
	webidl$16.illegalConstructor = function() {
		throw webidl$16.errors.exception({
			header: "TypeError",
			message: "Illegal constructor"
		});
	};
	webidl$16.util.Type = function(V) {
		switch (typeof V) {
			case "undefined": return "Undefined";
			case "boolean": return "Boolean";
			case "string": return "String";
			case "symbol": return "Symbol";
			case "number": return "Number";
			case "bigint": return "BigInt";
			case "function":
			case "object":
				if (V === null) return "Null";
				return "Object";
		}
	};
	webidl$16.util.markAsUncloneable = markAsUncloneable || (() => {});
	webidl$16.util.ConvertToInt = function(V, bitLength, signedness, opts) {
		let upperBound;
		let lowerBound;
		if (bitLength === 64) {
			upperBound = Math.pow(2, 53) - 1;
			if (signedness === "unsigned") lowerBound = 0;
			else lowerBound = Math.pow(-2, 53) + 1;
		} else if (signedness === "unsigned") {
			lowerBound = 0;
			upperBound = Math.pow(2, bitLength) - 1;
		} else {
			lowerBound = Math.pow(-2, bitLength) - 1;
			upperBound = Math.pow(2, bitLength - 1) - 1;
		}
		let x = Number(V);
		if (x === 0) x = 0;
		if (opts?.enforceRange === true) {
			if (Number.isNaN(x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) throw webidl$16.errors.exception({
				header: "Integer conversion",
				message: `Could not convert ${webidl$16.util.Stringify(V)} to an integer.`
			});
			x = webidl$16.util.IntegerPart(x);
			if (x < lowerBound || x > upperBound) throw webidl$16.errors.exception({
				header: "Integer conversion",
				message: `Value must be between ${lowerBound}-${upperBound}, got ${x}.`
			});
			return x;
		}
		if (!Number.isNaN(x) && opts?.clamp === true) {
			x = Math.min(Math.max(x, lowerBound), upperBound);
			if (Math.floor(x) % 2 === 0) x = Math.floor(x);
			else x = Math.ceil(x);
			return x;
		}
		if (Number.isNaN(x) || x === 0 && Object.is(0, x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) return 0;
		x = webidl$16.util.IntegerPart(x);
		x = x % Math.pow(2, bitLength);
		if (signedness === "signed" && x >= Math.pow(2, bitLength) - 1) return x - Math.pow(2, bitLength);
		return x;
	};
	webidl$16.util.IntegerPart = function(n) {
		const r = Math.floor(Math.abs(n));
		if (n < 0) return -1 * r;
		return r;
	};
	webidl$16.util.Stringify = function(V) {
		switch (webidl$16.util.Type(V)) {
			case "Symbol": return `Symbol(${V.description})`;
			case "Object": return inspect(V);
			case "String": return `"${V}"`;
			default: return `${V}`;
		}
	};
	webidl$16.sequenceConverter = function(converter) {
		return (V, prefix, argument, Iterable) => {
			if (webidl$16.util.Type(V) !== "Object") throw webidl$16.errors.exception({
				header: prefix,
				message: `${argument} (${webidl$16.util.Stringify(V)}) is not iterable.`
			});
			const method = typeof Iterable === "function" ? Iterable() : V?.[Symbol.iterator]?.();
			const seq = [];
			let index = 0;
			if (method === void 0 || typeof method.next !== "function") throw webidl$16.errors.exception({
				header: prefix,
				message: `${argument} is not iterable.`
			});
			while (true) {
				const { done, value } = method.next();
				if (done) break;
				seq.push(converter(value, prefix, `${argument}[${index++}]`));
			}
			return seq;
		};
	};
	webidl$16.recordConverter = function(keyConverter, valueConverter) {
		return (O, prefix, argument) => {
			if (webidl$16.util.Type(O) !== "Object") throw webidl$16.errors.exception({
				header: prefix,
				message: `${argument} ("${webidl$16.util.Type(O)}") is not an Object.`
			});
			const result = {};
			if (!types$3.isProxy(O)) {
				const keys$1 = [...Object.getOwnPropertyNames(O), ...Object.getOwnPropertySymbols(O)];
				for (const key of keys$1) {
					const typedKey = keyConverter(key, prefix, argument);
					result[typedKey] = valueConverter(O[key], prefix, argument);
				}
				return result;
			}
			const keys = Reflect.ownKeys(O);
			for (const key of keys) if (Reflect.getOwnPropertyDescriptor(O, key)?.enumerable) {
				const typedKey = keyConverter(key, prefix, argument);
				result[typedKey] = valueConverter(O[key], prefix, argument);
			}
			return result;
		};
	};
	webidl$16.interfaceConverter = function(i) {
		return (V, prefix, argument, opts) => {
			if (opts?.strict !== false && !(V instanceof i)) throw webidl$16.errors.exception({
				header: prefix,
				message: `Expected ${argument} ("${webidl$16.util.Stringify(V)}") to be an instance of ${i.name}.`
			});
			return V;
		};
	};
	webidl$16.dictionaryConverter = function(converters) {
		return (dictionary, prefix, argument) => {
			const type = webidl$16.util.Type(dictionary);
			const dict = {};
			if (type === "Null" || type === "Undefined") return dict;
			else if (type !== "Object") throw webidl$16.errors.exception({
				header: prefix,
				message: `Expected ${dictionary} to be one of: Null, Undefined, Object.`
			});
			for (const options of converters) {
				const { key, defaultValue, required, converter } = options;
				if (required === true) {
					if (!Object.hasOwn(dictionary, key)) throw webidl$16.errors.exception({
						header: prefix,
						message: `Missing required key "${key}".`
					});
				}
				let value = dictionary[key];
				const hasDefault = Object.hasOwn(options, "defaultValue");
				if (hasDefault && value !== null) value ??= defaultValue();
				if (required || hasDefault || value !== void 0) {
					value = converter(value, prefix, `${argument}.${key}`);
					if (options.allowedValues && !options.allowedValues.includes(value)) throw webidl$16.errors.exception({
						header: prefix,
						message: `${value} is not an accepted type. Expected one of ${options.allowedValues.join(", ")}.`
					});
					dict[key] = value;
				}
			}
			return dict;
		};
	};
	webidl$16.nullableConverter = function(converter) {
		return (V, prefix, argument) => {
			if (V === null) return V;
			return converter(V, prefix, argument);
		};
	};
	webidl$16.converters.DOMString = function(V, prefix, argument, opts) {
		if (V === null && opts?.legacyNullToEmptyString) return "";
		if (typeof V === "symbol") throw webidl$16.errors.exception({
			header: prefix,
			message: `${argument} is a symbol, which cannot be converted to a DOMString.`
		});
		return String(V);
	};
	webidl$16.converters.ByteString = function(V, prefix, argument) {
		const x = webidl$16.converters.DOMString(V, prefix, argument);
		for (let index = 0; index < x.length; index++) if (x.charCodeAt(index) > 255) throw new TypeError(`Cannot convert argument to a ByteString because the character at index ${index} has a value of ${x.charCodeAt(index)} which is greater than 255.`);
		return x;
	};
	webidl$16.converters.USVString = toUSVString;
	webidl$16.converters.boolean = function(V) {
		return Boolean(V);
	};
	webidl$16.converters.any = function(V) {
		return V;
	};
	webidl$16.converters["long long"] = function(V, prefix, argument) {
		return webidl$16.util.ConvertToInt(V, 64, "signed", void 0, prefix, argument);
	};
	webidl$16.converters["unsigned long long"] = function(V, prefix, argument) {
		return webidl$16.util.ConvertToInt(V, 64, "unsigned", void 0, prefix, argument);
	};
	webidl$16.converters["unsigned long"] = function(V, prefix, argument) {
		return webidl$16.util.ConvertToInt(V, 32, "unsigned", void 0, prefix, argument);
	};
	webidl$16.converters["unsigned short"] = function(V, prefix, argument, opts) {
		return webidl$16.util.ConvertToInt(V, 16, "unsigned", opts, prefix, argument);
	};
	webidl$16.converters.ArrayBuffer = function(V, prefix, argument, opts) {
		if (webidl$16.util.Type(V) !== "Object" || !types$3.isAnyArrayBuffer(V)) throw webidl$16.errors.conversionFailed({
			prefix,
			argument: `${argument} ("${webidl$16.util.Stringify(V)}")`,
			types: ["ArrayBuffer"]
		});
		if (opts?.allowShared === false && types$3.isSharedArrayBuffer(V)) throw webidl$16.errors.exception({
			header: "ArrayBuffer",
			message: "SharedArrayBuffer is not allowed."
		});
		if (V.resizable || V.growable) throw webidl$16.errors.exception({
			header: "ArrayBuffer",
			message: "Received a resizable ArrayBuffer."
		});
		return V;
	};
	webidl$16.converters.TypedArray = function(V, T, prefix, name, opts) {
		if (webidl$16.util.Type(V) !== "Object" || !types$3.isTypedArray(V) || V.constructor.name !== T.name) throw webidl$16.errors.conversionFailed({
			prefix,
			argument: `${name} ("${webidl$16.util.Stringify(V)}")`,
			types: [T.name]
		});
		if (opts?.allowShared === false && types$3.isSharedArrayBuffer(V.buffer)) throw webidl$16.errors.exception({
			header: "ArrayBuffer",
			message: "SharedArrayBuffer is not allowed."
		});
		if (V.buffer.resizable || V.buffer.growable) throw webidl$16.errors.exception({
			header: "ArrayBuffer",
			message: "Received a resizable ArrayBuffer."
		});
		return V;
	};
	webidl$16.converters.DataView = function(V, prefix, name, opts) {
		if (webidl$16.util.Type(V) !== "Object" || !types$3.isDataView(V)) throw webidl$16.errors.exception({
			header: prefix,
			message: `${name} is not a DataView.`
		});
		if (opts?.allowShared === false && types$3.isSharedArrayBuffer(V.buffer)) throw webidl$16.errors.exception({
			header: "ArrayBuffer",
			message: "SharedArrayBuffer is not allowed."
		});
		if (V.buffer.resizable || V.buffer.growable) throw webidl$16.errors.exception({
			header: "ArrayBuffer",
			message: "Received a resizable ArrayBuffer."
		});
		return V;
	};
	webidl$16.converters.BufferSource = function(V, prefix, name, opts) {
		if (types$3.isAnyArrayBuffer(V)) return webidl$16.converters.ArrayBuffer(V, prefix, name, {
			...opts,
			allowShared: false
		});
		if (types$3.isTypedArray(V)) return webidl$16.converters.TypedArray(V, V.constructor, prefix, name, {
			...opts,
			allowShared: false
		});
		if (types$3.isDataView(V)) return webidl$16.converters.DataView(V, prefix, name, {
			...opts,
			allowShared: false
		});
		throw webidl$16.errors.conversionFailed({
			prefix,
			argument: `${name} ("${webidl$16.util.Stringify(V)}")`,
			types: ["BufferSource"]
		});
	};
	webidl$16.converters["sequence<ByteString>"] = webidl$16.sequenceConverter(webidl$16.converters.ByteString);
	webidl$16.converters["sequence<sequence<ByteString>>"] = webidl$16.sequenceConverter(webidl$16.converters["sequence<ByteString>"]);
	webidl$16.converters["record<ByteString, ByteString>"] = webidl$16.recordConverter(webidl$16.converters.ByteString, webidl$16.converters.ByteString);
	module.exports = { webidl: webidl$16 };
}));
var require_util$6 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Transform: Transform$2 } = __require("node:stream");
	var zlib$1 = __require("node:zlib");
	var { redirectStatusSet: redirectStatusSet$2, referrerPolicySet: referrerPolicyTokens, badPortsSet } = require_constants$2();
	var { getGlobalOrigin: getGlobalOrigin$1 } = require_global$1();
	var { collectASequenceOfCodePoints, collectAnHTTPQuotedString, removeChars: removeChars$1, parseMIMEType: parseMIMEType$3 } = require_data_url();
	var { performance: performance$1 } = __require("node:perf_hooks");
	var { isBlobLike: isBlobLike$5, ReadableStreamFrom: ReadableStreamFrom$2, isValidHTTPToken: isValidHTTPToken$1, normalizedMethodRecordsBase: normalizedMethodRecordsBase$1 } = require_util$7();
	var assert$22 = __require("node:assert");
	var { isUint8Array } = __require("node:util/types");
	var { webidl: webidl$15 } = require_webidl();
	var supportedHashes = [];
	var crypto$2;
	try {
		crypto$2 = __require("node:crypto");
		const possibleRelevantHashes = [
			"sha256",
			"sha384",
			"sha512"
		];
		supportedHashes = crypto$2.getHashes().filter((hash) => possibleRelevantHashes.includes(hash));
	} catch {}
	function responseURL(response) {
		const urlList = response.urlList;
		const length = urlList.length;
		return length === 0 ? null : urlList[length - 1].toString();
	}
	function responseLocationURL$1(response, requestFragment) {
		if (!redirectStatusSet$2.has(response.status)) return null;
		let location = response.headersList.get("location", true);
		if (location !== null && isValidHeaderValue$1(location)) {
			if (!isValidEncodedURL(location)) location = normalizeBinaryStringToUtf8(location);
			location = new URL(location, responseURL(response));
		}
		if (location && !location.hash) location.hash = requestFragment;
		return location;
	}
	function isValidEncodedURL(url) {
		for (let i = 0; i < url.length; ++i) {
			const code = url.charCodeAt(i);
			if (code > 126 || code < 32) return false;
		}
		return true;
	}
	function normalizeBinaryStringToUtf8(value) {
		return Buffer.from(value, "binary").toString("utf8");
	}
	function requestCurrentURL$1(request$1) {
		return request$1.urlList[request$1.urlList.length - 1];
	}
	function requestBadPort$1(request$1) {
		const url = requestCurrentURL$1(request$1);
		if (urlIsHttpHttpsScheme$2(url) && badPortsSet.has(url.port)) return "blocked";
		return "allowed";
	}
	function isErrorLike$2(object) {
		return object instanceof Error || object?.constructor?.name === "Error" || object?.constructor?.name === "DOMException";
	}
	function isValidReasonPhrase$1(statusText) {
		for (let i = 0; i < statusText.length; ++i) {
			const c = statusText.charCodeAt(i);
			if (!(c === 9 || c >= 32 && c <= 126 || c >= 128 && c <= 255)) return false;
		}
		return true;
	}
	var isValidHeaderName$2 = isValidHTTPToken$1;
	function isValidHeaderValue$1(potentialValue) {
		return (potentialValue[0] === "	" || potentialValue[0] === " " || potentialValue[potentialValue.length - 1] === "	" || potentialValue[potentialValue.length - 1] === " " || potentialValue.includes("\n") || potentialValue.includes("\r") || potentialValue.includes("\0")) === false;
	}
	function setRequestReferrerPolicyOnRedirect$1(request$1, actualResponse) {
		const { headersList } = actualResponse;
		const policyHeader = (headersList.get("referrer-policy", true) ?? "").split(",");
		let policy = "";
		if (policyHeader.length > 0) for (let i = policyHeader.length; i !== 0; i--) {
			const token = policyHeader[i - 1].trim();
			if (referrerPolicyTokens.has(token)) {
				policy = token;
				break;
			}
		}
		if (policy !== "") request$1.referrerPolicy = policy;
	}
	function crossOriginResourcePolicyCheck$1() {
		return "allowed";
	}
	function corsCheck$1() {
		return "success";
	}
	function TAOCheck$1() {
		return "success";
	}
	function appendFetchMetadata$1(httpRequest) {
		let header = null;
		header = httpRequest.mode;
		httpRequest.headersList.set("sec-fetch-mode", header, true);
	}
	function appendRequestOriginHeader$1(request$1) {
		let serializedOrigin = request$1.origin;
		if (serializedOrigin === "client" || serializedOrigin === void 0) return;
		if (request$1.responseTainting === "cors" || request$1.mode === "websocket") request$1.headersList.append("origin", serializedOrigin, true);
		else if (request$1.method !== "GET" && request$1.method !== "HEAD") {
			switch (request$1.referrerPolicy) {
				case "no-referrer":
					serializedOrigin = null;
					break;
				case "no-referrer-when-downgrade":
				case "strict-origin":
				case "strict-origin-when-cross-origin":
					if (request$1.origin && urlHasHttpsScheme$1(request$1.origin) && !urlHasHttpsScheme$1(requestCurrentURL$1(request$1))) serializedOrigin = null;
					break;
				case "same-origin":
					if (!sameOrigin$2(request$1, requestCurrentURL$1(request$1))) serializedOrigin = null;
					break;
				default:
			}
			request$1.headersList.append("origin", serializedOrigin, true);
		}
	}
	function coarsenTime(timestamp, crossOriginIsolatedCapability) {
		return timestamp;
	}
	function clampAndCoarsenConnectionTimingInfo$1(connectionTimingInfo, defaultStartTime, crossOriginIsolatedCapability) {
		if (!connectionTimingInfo?.startTime || connectionTimingInfo.startTime < defaultStartTime) return {
			domainLookupStartTime: defaultStartTime,
			domainLookupEndTime: defaultStartTime,
			connectionStartTime: defaultStartTime,
			connectionEndTime: defaultStartTime,
			secureConnectionStartTime: defaultStartTime,
			ALPNNegotiatedProtocol: connectionTimingInfo?.ALPNNegotiatedProtocol
		};
		return {
			domainLookupStartTime: coarsenTime(connectionTimingInfo.domainLookupStartTime, crossOriginIsolatedCapability),
			domainLookupEndTime: coarsenTime(connectionTimingInfo.domainLookupEndTime, crossOriginIsolatedCapability),
			connectionStartTime: coarsenTime(connectionTimingInfo.connectionStartTime, crossOriginIsolatedCapability),
			connectionEndTime: coarsenTime(connectionTimingInfo.connectionEndTime, crossOriginIsolatedCapability),
			secureConnectionStartTime: coarsenTime(connectionTimingInfo.secureConnectionStartTime, crossOriginIsolatedCapability),
			ALPNNegotiatedProtocol: connectionTimingInfo.ALPNNegotiatedProtocol
		};
	}
	function coarsenedSharedCurrentTime$1(crossOriginIsolatedCapability) {
		return coarsenTime(performance$1.now(), crossOriginIsolatedCapability);
	}
	function createOpaqueTimingInfo$1(timingInfo) {
		return {
			startTime: timingInfo.startTime ?? 0,
			redirectStartTime: 0,
			redirectEndTime: 0,
			postRedirectStartTime: timingInfo.startTime ?? 0,
			finalServiceWorkerStartTime: 0,
			finalNetworkResponseStartTime: 0,
			finalNetworkRequestStartTime: 0,
			endTime: 0,
			encodedBodySize: 0,
			decodedBodySize: 0,
			finalConnectionTimingInfo: null
		};
	}
	function makePolicyContainer$1() {
		return { referrerPolicy: "strict-origin-when-cross-origin" };
	}
	function clonePolicyContainer$1(policyContainer) {
		return { referrerPolicy: policyContainer.referrerPolicy };
	}
	function determineRequestsReferrer$1(request$1) {
		const policy = request$1.referrerPolicy;
		assert$22(policy);
		let referrerSource = null;
		if (request$1.referrer === "client") {
			const globalOrigin$1 = getGlobalOrigin$1();
			if (!globalOrigin$1 || globalOrigin$1.origin === "null") return "no-referrer";
			referrerSource = new URL(globalOrigin$1);
		} else if (request$1.referrer instanceof URL) referrerSource = request$1.referrer;
		let referrerURL = stripURLForReferrer(referrerSource);
		const referrerOrigin = stripURLForReferrer(referrerSource, true);
		if (referrerURL.toString().length > 4096) referrerURL = referrerOrigin;
		const areSameOrigin = sameOrigin$2(request$1, referrerURL);
		const isNonPotentiallyTrustWorthy = isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(request$1.url);
		switch (policy) {
			case "origin": return referrerOrigin != null ? referrerOrigin : stripURLForReferrer(referrerSource, true);
			case "unsafe-url": return referrerURL;
			case "same-origin": return areSameOrigin ? referrerOrigin : "no-referrer";
			case "origin-when-cross-origin": return areSameOrigin ? referrerURL : referrerOrigin;
			case "strict-origin-when-cross-origin": {
				const currentURL = requestCurrentURL$1(request$1);
				if (sameOrigin$2(referrerURL, currentURL)) return referrerURL;
				if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) return "no-referrer";
				return referrerOrigin;
			}
			case "strict-origin":
			case "no-referrer-when-downgrade":
			default: return isNonPotentiallyTrustWorthy ? "no-referrer" : referrerOrigin;
		}
	}
	function stripURLForReferrer(url, originOnly) {
		assert$22(url instanceof URL);
		url = new URL(url);
		if (url.protocol === "file:" || url.protocol === "about:" || url.protocol === "blank:") return "no-referrer";
		url.username = "";
		url.password = "";
		url.hash = "";
		if (originOnly) {
			url.pathname = "";
			url.search = "";
		}
		return url;
	}
	function isURLPotentiallyTrustworthy(url) {
		if (!(url instanceof URL)) return false;
		if (url.href === "about:blank" || url.href === "about:srcdoc") return true;
		if (url.protocol === "data:") return true;
		if (url.protocol === "file:") return true;
		return isOriginPotentiallyTrustworthy(url.origin);
		function isOriginPotentiallyTrustworthy(origin) {
			if (origin == null || origin === "null") return false;
			const originAsURL = new URL(origin);
			if (originAsURL.protocol === "https:" || originAsURL.protocol === "wss:") return true;
			if (/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(originAsURL.hostname) || originAsURL.hostname === "localhost" || originAsURL.hostname.includes("localhost.") || originAsURL.hostname.endsWith(".localhost")) return true;
			return false;
		}
	}
	function bytesMatch$1(bytes, metadataList) {
		/* istanbul ignore if: only if node is built with --without-ssl */
		if (crypto$2 === void 0) return true;
		const parsedMetadata = parseMetadata(metadataList);
		if (parsedMetadata === "no metadata") return true;
		if (parsedMetadata.length === 0) return true;
		const strongest = getStrongestMetadata(parsedMetadata);
		const metadata = filterMetadataListByAlgorithm(parsedMetadata, strongest);
		for (const item of metadata) {
			const algorithm = item.algo;
			const expectedValue = item.hash;
			let actualValue = crypto$2.createHash(algorithm).update(bytes).digest("base64");
			if (actualValue[actualValue.length - 1] === "=") if (actualValue[actualValue.length - 2] === "=") actualValue = actualValue.slice(0, -2);
			else actualValue = actualValue.slice(0, -1);
			if (compareBase64Mixed(actualValue, expectedValue)) return true;
		}
		return false;
	}
	var parseHashWithOptions = /(?<algo>sha256|sha384|sha512)-((?<hash>[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}(?:\s|$)( +[!-~]*)?)?/i;
	function parseMetadata(metadata) {
		const result = [];
		let empty = true;
		for (const token of metadata.split(" ")) {
			empty = false;
			const parsedToken = parseHashWithOptions.exec(token);
			if (parsedToken === null || parsedToken.groups === void 0 || parsedToken.groups.algo === void 0) continue;
			const algorithm = parsedToken.groups.algo.toLowerCase();
			if (supportedHashes.includes(algorithm)) result.push(parsedToken.groups);
		}
		if (empty === true) return "no metadata";
		return result;
	}
	function getStrongestMetadata(metadataList) {
		let algorithm = metadataList[0].algo;
		if (algorithm[3] === "5") return algorithm;
		for (let i = 1; i < metadataList.length; ++i) {
			const metadata = metadataList[i];
			if (metadata.algo[3] === "5") {
				algorithm = "sha512";
				break;
			} else if (algorithm[3] === "3") continue;
			else if (metadata.algo[3] === "3") algorithm = "sha384";
		}
		return algorithm;
	}
	function filterMetadataListByAlgorithm(metadataList, algorithm) {
		if (metadataList.length === 1) return metadataList;
		let pos = 0;
		for (let i = 0; i < metadataList.length; ++i) if (metadataList[i].algo === algorithm) metadataList[pos++] = metadataList[i];
		metadataList.length = pos;
		return metadataList;
	}
	function compareBase64Mixed(actualValue, expectedValue) {
		if (actualValue.length !== expectedValue.length) return false;
		for (let i = 0; i < actualValue.length; ++i) if (actualValue[i] !== expectedValue[i]) {
			if (actualValue[i] === "+" && expectedValue[i] === "-" || actualValue[i] === "/" && expectedValue[i] === "_") continue;
			return false;
		}
		return true;
	}
	function tryUpgradeRequestToAPotentiallyTrustworthyURL$1(request$1) {}
	function sameOrigin$2(A, B) {
		if (A.origin === B.origin && A.origin === "null") return true;
		if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) return true;
		return false;
	}
	function createDeferredPromise$3() {
		let res;
		let rej;
		return {
			promise: new Promise((resolve, reject) => {
				res = resolve;
				rej = reject;
			}),
			resolve: res,
			reject: rej
		};
	}
	function isAborted$2(fetchParams) {
		return fetchParams.controller.state === "aborted";
	}
	function isCancelled$2(fetchParams) {
		return fetchParams.controller.state === "aborted" || fetchParams.controller.state === "terminated";
	}
	function normalizeMethod(method) {
		return normalizedMethodRecordsBase$1[method.toLowerCase()] ?? method;
	}
	function serializeJavascriptValueToJSONString$1(value) {
		const result = JSON.stringify(value);
		if (result === void 0) throw new TypeError("Value is not JSON serializable");
		assert$22(typeof result === "string");
		return result;
	}
	var esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
	function createIterator(name, kInternalIterator, keyIndex = 0, valueIndex = 1) {
		class FastIterableIterator {
			#target;
			#kind;
			#index;
			constructor(target, kind) {
				this.#target = target;
				this.#kind = kind;
				this.#index = 0;
			}
			next() {
				if (typeof this !== "object" || this === null || !(#target in this)) throw new TypeError(`'next' called on an object that does not implement interface ${name} Iterator.`);
				const index = this.#index;
				const values = this.#target[kInternalIterator];
				const len = values.length;
				if (index >= len) return {
					value: void 0,
					done: true
				};
				const { [keyIndex]: key, [valueIndex]: value } = values[index];
				this.#index = index + 1;
				let result;
				switch (this.#kind) {
					case "key":
						result = key;
						break;
					case "value":
						result = value;
						break;
					case "key+value":
						result = [key, value];
						break;
				}
				return {
					value: result,
					done: false
				};
			}
		}
		delete FastIterableIterator.prototype.constructor;
		Object.setPrototypeOf(FastIterableIterator.prototype, esIteratorPrototype);
		Object.defineProperties(FastIterableIterator.prototype, {
			[Symbol.toStringTag]: {
				writable: false,
				enumerable: false,
				configurable: true,
				value: `${name} Iterator`
			},
			next: {
				writable: true,
				enumerable: true,
				configurable: true
			}
		});
		return function(target, kind) {
			return new FastIterableIterator(target, kind);
		};
	}
	function iteratorMixin$2(name, object, kInternalIterator, keyIndex = 0, valueIndex = 1) {
		const makeIterator = createIterator(name, kInternalIterator, keyIndex, valueIndex);
		const properties = {
			keys: {
				writable: true,
				enumerable: true,
				configurable: true,
				value: function keys() {
					webidl$15.brandCheck(this, object);
					return makeIterator(this, "key");
				}
			},
			values: {
				writable: true,
				enumerable: true,
				configurable: true,
				value: function values() {
					webidl$15.brandCheck(this, object);
					return makeIterator(this, "value");
				}
			},
			entries: {
				writable: true,
				enumerable: true,
				configurable: true,
				value: function entries() {
					webidl$15.brandCheck(this, object);
					return makeIterator(this, "key+value");
				}
			},
			forEach: {
				writable: true,
				enumerable: true,
				configurable: true,
				value: function forEach(callbackfn, thisArg = globalThis) {
					webidl$15.brandCheck(this, object);
					webidl$15.argumentLengthCheck(arguments, 1, `${name}.forEach`);
					if (typeof callbackfn !== "function") throw new TypeError(`Failed to execute 'forEach' on '${name}': parameter 1 is not of type 'Function'.`);
					for (const { 0: key, 1: value } of makeIterator(this, "key+value")) callbackfn.call(thisArg, value, key, this);
				}
			}
		};
		return Object.defineProperties(object.prototype, {
			...properties,
			[Symbol.iterator]: {
				writable: true,
				enumerable: false,
				configurable: true,
				value: properties.entries.value
			}
		});
	}
	async function fullyReadBody$2(body, processBody, processBodyError) {
		const successSteps = processBody;
		const errorSteps = processBodyError;
		let reader;
		try {
			reader = body.stream.getReader();
		} catch (e) {
			errorSteps(e);
			return;
		}
		try {
			successSteps(await readAllBytes$1(reader));
		} catch (e) {
			errorSteps(e);
		}
	}
	function isReadableStreamLike$1(stream$2) {
		return stream$2 instanceof ReadableStream || stream$2[Symbol.toStringTag] === "ReadableStream" && typeof stream$2.tee === "function";
	}
	function readableStreamClose$2(controller) {
		try {
			controller.close();
			controller.byobRequest?.respond(0);
		} catch (err) {
			if (!err.message.includes("Controller is already closed") && !err.message.includes("ReadableStream is already closed")) throw err;
		}
	}
	var invalidIsomorphicEncodeValueRegex = /[^\x00-\xFF]/;
	function isomorphicEncode$2(input) {
		assert$22(!invalidIsomorphicEncodeValueRegex.test(input));
		return input;
	}
	async function readAllBytes$1(reader) {
		const bytes = [];
		let byteLength = 0;
		while (true) {
			const { done, value: chunk } = await reader.read();
			if (done) return Buffer.concat(bytes, byteLength);
			if (!isUint8Array(chunk)) throw new TypeError("Received non-Uint8Array chunk");
			bytes.push(chunk);
			byteLength += chunk.length;
		}
	}
	function urlIsLocal$1(url) {
		assert$22("protocol" in url);
		const protocol$1 = url.protocol;
		return protocol$1 === "about:" || protocol$1 === "blob:" || protocol$1 === "data:";
	}
	function urlHasHttpsScheme$1(url) {
		return typeof url === "string" && url[5] === ":" && url[0] === "h" && url[1] === "t" && url[2] === "t" && url[3] === "p" && url[4] === "s" || url.protocol === "https:";
	}
	function urlIsHttpHttpsScheme$2(url) {
		assert$22("protocol" in url);
		const protocol$1 = url.protocol;
		return protocol$1 === "http:" || protocol$1 === "https:";
	}
	function simpleRangeHeaderValue$1(value, allowWhitespace) {
		const data = value;
		if (!data.startsWith("bytes")) return "failure";
		const position = { position: 5 };
		if (allowWhitespace) collectASequenceOfCodePoints((char) => char === "	" || char === " ", data, position);
		if (data.charCodeAt(position.position) !== 61) return "failure";
		position.position++;
		if (allowWhitespace) collectASequenceOfCodePoints((char) => char === "	" || char === " ", data, position);
		const rangeStart = collectASequenceOfCodePoints((char) => {
			const code = char.charCodeAt(0);
			return code >= 48 && code <= 57;
		}, data, position);
		const rangeStartValue = rangeStart.length ? Number(rangeStart) : null;
		if (allowWhitespace) collectASequenceOfCodePoints((char) => char === "	" || char === " ", data, position);
		if (data.charCodeAt(position.position) !== 45) return "failure";
		position.position++;
		if (allowWhitespace) collectASequenceOfCodePoints((char) => char === "	" || char === " ", data, position);
		const rangeEnd = collectASequenceOfCodePoints((char) => {
			const code = char.charCodeAt(0);
			return code >= 48 && code <= 57;
		}, data, position);
		const rangeEndValue = rangeEnd.length ? Number(rangeEnd) : null;
		if (position.position < data.length) return "failure";
		if (rangeEndValue === null && rangeStartValue === null) return "failure";
		if (rangeStartValue > rangeEndValue) return "failure";
		return {
			rangeStartValue,
			rangeEndValue
		};
	}
	function buildContentRange$1(rangeStart, rangeEnd, fullLength) {
		let contentRange = "bytes ";
		contentRange += isomorphicEncode$2(`${rangeStart}`);
		contentRange += "-";
		contentRange += isomorphicEncode$2(`${rangeEnd}`);
		contentRange += "/";
		contentRange += isomorphicEncode$2(`${fullLength}`);
		return contentRange;
	}
	var InflateStream = class extends Transform$2 {
		#zlibOptions;
		constructor(zlibOptions) {
			super();
			this.#zlibOptions = zlibOptions;
		}
		_transform(chunk, encoding, callback) {
			if (!this._inflateStream) {
				if (chunk.length === 0) {
					callback();
					return;
				}
				this._inflateStream = (chunk[0] & 15) === 8 ? zlib$1.createInflate(this.#zlibOptions) : zlib$1.createInflateRaw(this.#zlibOptions);
				this._inflateStream.on("data", this.push.bind(this));
				this._inflateStream.on("end", () => this.push(null));
				this._inflateStream.on("error", (err) => this.destroy(err));
			}
			this._inflateStream.write(chunk, encoding, callback);
		}
		_final(callback) {
			if (this._inflateStream) {
				this._inflateStream.end();
				this._inflateStream = null;
			}
			callback();
		}
	};
	function createInflate$1(zlibOptions) {
		return new InflateStream(zlibOptions);
	}
	function extractMimeType$2(headers) {
		let charset = null;
		let essence = null;
		let mimeType = null;
		const values = getDecodeSplit$1("content-type", headers);
		if (values === null) return "failure";
		for (const value of values) {
			const temporaryMimeType = parseMIMEType$3(value);
			if (temporaryMimeType === "failure" || temporaryMimeType.essence === "*/*") continue;
			mimeType = temporaryMimeType;
			if (mimeType.essence !== essence) {
				charset = null;
				if (mimeType.parameters.has("charset")) charset = mimeType.parameters.get("charset");
				essence = mimeType.essence;
			} else if (!mimeType.parameters.has("charset") && charset !== null) mimeType.parameters.set("charset", charset);
		}
		if (mimeType == null) return "failure";
		return mimeType;
	}
	function gettingDecodingSplitting(value) {
		const input = value;
		const position = { position: 0 };
		const values = [];
		let temporaryValue = "";
		while (position.position < input.length) {
			temporaryValue += collectASequenceOfCodePoints((char) => char !== "\"" && char !== ",", input, position);
			if (position.position < input.length) if (input.charCodeAt(position.position) === 34) {
				temporaryValue += collectAnHTTPQuotedString(input, position);
				if (position.position < input.length) continue;
			} else {
				assert$22(input.charCodeAt(position.position) === 44);
				position.position++;
			}
			temporaryValue = removeChars$1(temporaryValue, true, true, (char) => char === 9 || char === 32);
			values.push(temporaryValue);
			temporaryValue = "";
		}
		return values;
	}
	function getDecodeSplit$1(name, list) {
		const value = list.get(name, true);
		if (value === null) return null;
		return gettingDecodingSplitting(value);
	}
	var textDecoder = new TextDecoder();
	function utf8DecodeBytes$2(buffer$1) {
		if (buffer$1.length === 0) return "";
		if (buffer$1[0] === 239 && buffer$1[1] === 187 && buffer$1[2] === 191) buffer$1 = buffer$1.subarray(3);
		return textDecoder.decode(buffer$1);
	}
	var EnvironmentSettingsObjectBase = class {
		get baseUrl() {
			return getGlobalOrigin$1();
		}
		get origin() {
			return this.baseUrl?.origin;
		}
		policyContainer = makePolicyContainer$1();
	};
	var EnvironmentSettingsObject = class {
		settingsObject = new EnvironmentSettingsObjectBase();
	};
	var environmentSettingsObject$3 = new EnvironmentSettingsObject();
	module.exports = {
		isAborted: isAborted$2,
		isCancelled: isCancelled$2,
		isValidEncodedURL,
		createDeferredPromise: createDeferredPromise$3,
		ReadableStreamFrom: ReadableStreamFrom$2,
		tryUpgradeRequestToAPotentiallyTrustworthyURL: tryUpgradeRequestToAPotentiallyTrustworthyURL$1,
		clampAndCoarsenConnectionTimingInfo: clampAndCoarsenConnectionTimingInfo$1,
		coarsenedSharedCurrentTime: coarsenedSharedCurrentTime$1,
		determineRequestsReferrer: determineRequestsReferrer$1,
		makePolicyContainer: makePolicyContainer$1,
		clonePolicyContainer: clonePolicyContainer$1,
		appendFetchMetadata: appendFetchMetadata$1,
		appendRequestOriginHeader: appendRequestOriginHeader$1,
		TAOCheck: TAOCheck$1,
		corsCheck: corsCheck$1,
		crossOriginResourcePolicyCheck: crossOriginResourcePolicyCheck$1,
		createOpaqueTimingInfo: createOpaqueTimingInfo$1,
		setRequestReferrerPolicyOnRedirect: setRequestReferrerPolicyOnRedirect$1,
		isValidHTTPToken: isValidHTTPToken$1,
		requestBadPort: requestBadPort$1,
		requestCurrentURL: requestCurrentURL$1,
		responseURL,
		responseLocationURL: responseLocationURL$1,
		isBlobLike: isBlobLike$5,
		isURLPotentiallyTrustworthy,
		isValidReasonPhrase: isValidReasonPhrase$1,
		sameOrigin: sameOrigin$2,
		normalizeMethod,
		serializeJavascriptValueToJSONString: serializeJavascriptValueToJSONString$1,
		iteratorMixin: iteratorMixin$2,
		createIterator,
		isValidHeaderName: isValidHeaderName$2,
		isValidHeaderValue: isValidHeaderValue$1,
		isErrorLike: isErrorLike$2,
		fullyReadBody: fullyReadBody$2,
		bytesMatch: bytesMatch$1,
		isReadableStreamLike: isReadableStreamLike$1,
		readableStreamClose: readableStreamClose$2,
		isomorphicEncode: isomorphicEncode$2,
		urlIsLocal: urlIsLocal$1,
		urlHasHttpsScheme: urlHasHttpsScheme$1,
		urlIsHttpHttpsScheme: urlIsHttpHttpsScheme$2,
		readAllBytes: readAllBytes$1,
		simpleRangeHeaderValue: simpleRangeHeaderValue$1,
		buildContentRange: buildContentRange$1,
		parseMetadata,
		createInflate: createInflate$1,
		extractMimeType: extractMimeType$2,
		getDecodeSplit: getDecodeSplit$1,
		utf8DecodeBytes: utf8DecodeBytes$2,
		environmentSettingsObject: environmentSettingsObject$3
	};
}));
var require_symbols$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		kUrl: Symbol("url"),
		kHeaders: Symbol("headers"),
		kSignal: Symbol("signal"),
		kState: Symbol("state"),
		kDispatcher: Symbol("dispatcher")
	};
}));
var require_file = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Blob: Blob$2, File: File$2 } = __require("node:buffer");
	var { kState: kState$9 } = require_symbols$3();
	var { webidl: webidl$14 } = require_webidl();
	var FileLike$1 = class FileLike$1 {
		constructor(blobLike, fileName, options = {}) {
			const n = fileName;
			const t$1 = options.type;
			const d = options.lastModified ?? Date.now();
			this[kState$9] = {
				blobLike,
				name: n,
				type: t$1,
				lastModified: d
			};
		}
		stream(...args) {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].blobLike.stream(...args);
		}
		arrayBuffer(...args) {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].blobLike.arrayBuffer(...args);
		}
		slice(...args) {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].blobLike.slice(...args);
		}
		text(...args) {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].blobLike.text(...args);
		}
		get size() {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].blobLike.size;
		}
		get type() {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].blobLike.type;
		}
		get name() {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].name;
		}
		get lastModified() {
			webidl$14.brandCheck(this, FileLike$1);
			return this[kState$9].lastModified;
		}
		get [Symbol.toStringTag]() {
			return "File";
		}
	};
	webidl$14.converters.Blob = webidl$14.interfaceConverter(Blob$2);
	function isFileLike$2(object) {
		return object instanceof File$2 || object && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && object[Symbol.toStringTag] === "File";
	}
	module.exports = {
		FileLike: FileLike$1,
		isFileLike: isFileLike$2
	};
}));
var require_formdata = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { isBlobLike: isBlobLike$4, iteratorMixin: iteratorMixin$1 } = require_util$6();
	var { kState: kState$8 } = require_symbols$3();
	var { kEnumerableProperty: kEnumerableProperty$9 } = require_util$7();
	var { FileLike, isFileLike: isFileLike$1 } = require_file();
	var { webidl: webidl$13 } = require_webidl();
	var { File: NativeFile } = __require("node:buffer");
	var nodeUtil$2 = __require("node:util");
	var File$1 = globalThis.File ?? NativeFile;
	var FormData$3 = class FormData$3 {
		constructor(form) {
			webidl$13.util.markAsUncloneable(this);
			if (form !== void 0) throw webidl$13.errors.conversionFailed({
				prefix: "FormData constructor",
				argument: "Argument 1",
				types: ["undefined"]
			});
			this[kState$8] = [];
		}
		append(name, value, filename = void 0) {
			webidl$13.brandCheck(this, FormData$3);
			const prefix = "FormData.append";
			webidl$13.argumentLengthCheck(arguments, 2, prefix);
			if (arguments.length === 3 && !isBlobLike$4(value)) throw new TypeError("Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'");
			name = webidl$13.converters.USVString(name, prefix, "name");
			value = isBlobLike$4(value) ? webidl$13.converters.Blob(value, prefix, "value", { strict: false }) : webidl$13.converters.USVString(value, prefix, "value");
			filename = arguments.length === 3 ? webidl$13.converters.USVString(filename, prefix, "filename") : void 0;
			const entry = makeEntry$1(name, value, filename);
			this[kState$8].push(entry);
		}
		delete(name) {
			webidl$13.brandCheck(this, FormData$3);
			const prefix = "FormData.delete";
			webidl$13.argumentLengthCheck(arguments, 1, prefix);
			name = webidl$13.converters.USVString(name, prefix, "name");
			this[kState$8] = this[kState$8].filter((entry) => entry.name !== name);
		}
		get(name) {
			webidl$13.brandCheck(this, FormData$3);
			const prefix = "FormData.get";
			webidl$13.argumentLengthCheck(arguments, 1, prefix);
			name = webidl$13.converters.USVString(name, prefix, "name");
			const idx = this[kState$8].findIndex((entry) => entry.name === name);
			if (idx === -1) return null;
			return this[kState$8][idx].value;
		}
		getAll(name) {
			webidl$13.brandCheck(this, FormData$3);
			const prefix = "FormData.getAll";
			webidl$13.argumentLengthCheck(arguments, 1, prefix);
			name = webidl$13.converters.USVString(name, prefix, "name");
			return this[kState$8].filter((entry) => entry.name === name).map((entry) => entry.value);
		}
		has(name) {
			webidl$13.brandCheck(this, FormData$3);
			const prefix = "FormData.has";
			webidl$13.argumentLengthCheck(arguments, 1, prefix);
			name = webidl$13.converters.USVString(name, prefix, "name");
			return this[kState$8].findIndex((entry) => entry.name === name) !== -1;
		}
		set(name, value, filename = void 0) {
			webidl$13.brandCheck(this, FormData$3);
			const prefix = "FormData.set";
			webidl$13.argumentLengthCheck(arguments, 2, prefix);
			if (arguments.length === 3 && !isBlobLike$4(value)) throw new TypeError("Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'");
			name = webidl$13.converters.USVString(name, prefix, "name");
			value = isBlobLike$4(value) ? webidl$13.converters.Blob(value, prefix, "name", { strict: false }) : webidl$13.converters.USVString(value, prefix, "name");
			filename = arguments.length === 3 ? webidl$13.converters.USVString(filename, prefix, "name") : void 0;
			const entry = makeEntry$1(name, value, filename);
			const idx = this[kState$8].findIndex((entry$1) => entry$1.name === name);
			if (idx !== -1) this[kState$8] = [
				...this[kState$8].slice(0, idx),
				entry,
				...this[kState$8].slice(idx + 1).filter((entry$1) => entry$1.name !== name)
			];
			else this[kState$8].push(entry);
		}
		[nodeUtil$2.inspect.custom](depth, options) {
			const state = this[kState$8].reduce((a, b) => {
				if (a[b.name]) if (Array.isArray(a[b.name])) a[b.name].push(b.value);
				else a[b.name] = [a[b.name], b.value];
				else a[b.name] = b.value;
				return a;
			}, { __proto__: null });
			options.depth ??= depth;
			options.colors ??= true;
			const output = nodeUtil$2.formatWithOptions(options, state);
			return `FormData ${output.slice(output.indexOf("]") + 2)}`;
		}
	};
	iteratorMixin$1("FormData", FormData$3, kState$8, "name", "value");
	Object.defineProperties(FormData$3.prototype, {
		append: kEnumerableProperty$9,
		delete: kEnumerableProperty$9,
		get: kEnumerableProperty$9,
		getAll: kEnumerableProperty$9,
		has: kEnumerableProperty$9,
		set: kEnumerableProperty$9,
		[Symbol.toStringTag]: {
			value: "FormData",
			configurable: true
		}
	});
	function makeEntry$1(name, value, filename) {
		if (typeof value === "string") {} else {
			if (!isFileLike$1(value)) value = value instanceof Blob ? new File$1([value], "blob", { type: value.type }) : new FileLike(value, "blob", { type: value.type });
			if (filename !== void 0) {
				const options = {
					type: value.type,
					lastModified: value.lastModified
				};
				value = value instanceof NativeFile ? new File$1([value], filename, options) : new FileLike(value, filename, options);
			}
		}
		return {
			name,
			value
		};
	}
	module.exports = {
		FormData: FormData$3,
		makeEntry: makeEntry$1
	};
}));
var require_formdata_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { isUSVString, bufferToLowerCasedHeaderName: bufferToLowerCasedHeaderName$1 } = require_util$7();
	var { utf8DecodeBytes: utf8DecodeBytes$1 } = require_util$6();
	var { HTTP_TOKEN_CODEPOINTS, isomorphicDecode } = require_data_url();
	var { isFileLike } = require_file();
	var { makeEntry } = require_formdata();
	var assert$21 = __require("node:assert");
	var { File: NodeFile } = __require("node:buffer");
	var File = globalThis.File ?? NodeFile;
	var formDataNameBuffer = Buffer.from("form-data; name=\"");
	var filenameBuffer = Buffer.from("; filename");
	var dd = Buffer.from("--");
	var ddcrlf = Buffer.from("--\r\n");
	function isAsciiString(chars) {
		for (let i = 0; i < chars.length; ++i) if ((chars.charCodeAt(i) & -128) !== 0) return false;
		return true;
	}
	function validateBoundary(boundary) {
		const length = boundary.length;
		if (length < 27 || length > 70) return false;
		for (let i = 0; i < length; ++i) {
			const cp = boundary.charCodeAt(i);
			if (!(cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 39 || cp === 45 || cp === 95)) return false;
		}
		return true;
	}
	function multipartFormDataParser$1(input, mimeType) {
		assert$21(mimeType !== "failure" && mimeType.essence === "multipart/form-data");
		const boundaryString = mimeType.parameters.get("boundary");
		if (boundaryString === void 0) return "failure";
		const boundary = Buffer.from(`--${boundaryString}`, "utf8");
		const entryList = [];
		const position = { position: 0 };
		while (input[position.position] === 13 && input[position.position + 1] === 10) position.position += 2;
		let trailing = input.length;
		while (input[trailing - 1] === 10 && input[trailing - 2] === 13) trailing -= 2;
		if (trailing !== input.length) input = input.subarray(0, trailing);
		while (true) {
			if (input.subarray(position.position, position.position + boundary.length).equals(boundary)) position.position += boundary.length;
			else return "failure";
			if (position.position === input.length - 2 && bufferStartsWith(input, dd, position) || position.position === input.length - 4 && bufferStartsWith(input, ddcrlf, position)) return entryList;
			if (input[position.position] !== 13 || input[position.position + 1] !== 10) return "failure";
			position.position += 2;
			const result = parseMultipartFormDataHeaders(input, position);
			if (result === "failure") return "failure";
			let { name, filename, contentType, encoding } = result;
			position.position += 2;
			let body;
			{
				const boundaryIndex = input.indexOf(boundary.subarray(2), position.position);
				if (boundaryIndex === -1) return "failure";
				body = input.subarray(position.position, boundaryIndex - 4);
				position.position += body.length;
				if (encoding === "base64") body = Buffer.from(body.toString(), "base64");
			}
			if (input[position.position] !== 13 || input[position.position + 1] !== 10) return "failure";
			else position.position += 2;
			let value;
			if (filename !== null) {
				contentType ??= "text/plain";
				if (!isAsciiString(contentType)) contentType = "";
				value = new File([body], filename, { type: contentType });
			} else value = utf8DecodeBytes$1(Buffer.from(body));
			assert$21(isUSVString(name));
			assert$21(typeof value === "string" && isUSVString(value) || isFileLike(value));
			entryList.push(makeEntry(name, value, filename));
		}
	}
	function parseMultipartFormDataHeaders(input, position) {
		let name = null;
		let filename = null;
		let contentType = null;
		let encoding = null;
		while (true) {
			if (input[position.position] === 13 && input[position.position + 1] === 10) {
				if (name === null) return "failure";
				return {
					name,
					filename,
					contentType,
					encoding
				};
			}
			let headerName = collectASequenceOfBytes((char) => char !== 10 && char !== 13 && char !== 58, input, position);
			headerName = removeChars(headerName, true, true, (char) => char === 9 || char === 32);
			if (!HTTP_TOKEN_CODEPOINTS.test(headerName.toString())) return "failure";
			if (input[position.position] !== 58) return "failure";
			position.position++;
			collectASequenceOfBytes((char) => char === 32 || char === 9, input, position);
			switch (bufferToLowerCasedHeaderName$1(headerName)) {
				case "content-disposition":
					name = filename = null;
					if (!bufferStartsWith(input, formDataNameBuffer, position)) return "failure";
					position.position += 17;
					name = parseMultipartFormDataName(input, position);
					if (name === null) return "failure";
					if (bufferStartsWith(input, filenameBuffer, position)) {
						let check = position.position + filenameBuffer.length;
						if (input[check] === 42) {
							position.position += 1;
							check += 1;
						}
						if (input[check] !== 61 || input[check + 1] !== 34) return "failure";
						position.position += 12;
						filename = parseMultipartFormDataName(input, position);
						if (filename === null) return "failure";
					}
					break;
				case "content-type": {
					let headerValue = collectASequenceOfBytes((char) => char !== 10 && char !== 13, input, position);
					headerValue = removeChars(headerValue, false, true, (char) => char === 9 || char === 32);
					contentType = isomorphicDecode(headerValue);
					break;
				}
				case "content-transfer-encoding": {
					let headerValue = collectASequenceOfBytes((char) => char !== 10 && char !== 13, input, position);
					headerValue = removeChars(headerValue, false, true, (char) => char === 9 || char === 32);
					encoding = isomorphicDecode(headerValue);
					break;
				}
				default: collectASequenceOfBytes((char) => char !== 10 && char !== 13, input, position);
			}
			if (input[position.position] !== 13 && input[position.position + 1] !== 10) return "failure";
			else position.position += 2;
		}
	}
	function parseMultipartFormDataName(input, position) {
		assert$21(input[position.position - 1] === 34);
		let name = collectASequenceOfBytes((char) => char !== 10 && char !== 13 && char !== 34, input, position);
		if (input[position.position] !== 34) return null;
		else position.position++;
		name = new TextDecoder().decode(name).replace(/%0A/gi, "\n").replace(/%0D/gi, "\r").replace(/%22/g, "\"");
		return name;
	}
	function collectASequenceOfBytes(condition, input, position) {
		let start = position.position;
		while (start < input.length && condition(input[start])) ++start;
		return input.subarray(position.position, position.position = start);
	}
	function removeChars(buf, leading, trailing, predicate) {
		let lead = 0;
		let trail = buf.length - 1;
		if (leading) while (lead < buf.length && predicate(buf[lead])) lead++;
		if (trailing) while (trail > 0 && predicate(buf[trail])) trail--;
		return lead === 0 && trail === buf.length - 1 ? buf : buf.subarray(lead, trail + 1);
	}
	function bufferStartsWith(buffer$1, start, position) {
		if (buffer$1.length < start.length) return false;
		for (let i = 0; i < start.length; i++) if (start[i] !== buffer$1[position.position + i]) return false;
		return true;
	}
	module.exports = {
		multipartFormDataParser: multipartFormDataParser$1,
		validateBoundary
	};
}));
var require_body = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util$17 = require_util$7();
	var { ReadableStreamFrom: ReadableStreamFrom$1, isBlobLike: isBlobLike$3, isReadableStreamLike, readableStreamClose: readableStreamClose$1, createDeferredPromise: createDeferredPromise$2, fullyReadBody: fullyReadBody$1, extractMimeType: extractMimeType$1, utf8DecodeBytes } = require_util$6();
	var { FormData: FormData$2 } = require_formdata();
	var { kState: kState$7 } = require_symbols$3();
	var { webidl: webidl$12 } = require_webidl();
	var { Blob: Blob$1 } = __require("node:buffer");
	var assert$20 = __require("node:assert");
	var { isErrored: isErrored$1, isDisturbed: isDisturbed$2 } = __require("node:stream");
	var { isArrayBuffer } = __require("node:util/types");
	var { serializeAMimeType: serializeAMimeType$3 } = require_data_url();
	var { multipartFormDataParser } = require_formdata_parser();
	var random;
	try {
		const crypto$3 = __require("node:crypto");
		random = (max) => crypto$3.randomInt(0, max);
	} catch {
		random = (max) => Math.floor(Math.random(max));
	}
	var textEncoder$1 = new TextEncoder();
	function noop$3() {}
	var hasFinalizationRegistry$1 = globalThis.FinalizationRegistry && process.version.indexOf("v18") !== 0;
	var streamRegistry$1;
	if (hasFinalizationRegistry$1) streamRegistry$1 = new FinalizationRegistry((weakRef) => {
		const stream$2 = weakRef.deref();
		if (stream$2 && !stream$2.locked && !isDisturbed$2(stream$2) && !isErrored$1(stream$2)) stream$2.cancel("Response object has been garbage collected").catch(noop$3);
	});
	function extractBody$5(object, keepalive = false) {
		let stream$2 = null;
		if (object instanceof ReadableStream) stream$2 = object;
		else if (isBlobLike$3(object)) stream$2 = object.stream();
		else stream$2 = new ReadableStream({
			async pull(controller) {
				const buffer$1 = typeof source === "string" ? textEncoder$1.encode(source) : source;
				if (buffer$1.byteLength) controller.enqueue(buffer$1);
				queueMicrotask(() => readableStreamClose$1(controller));
			},
			start() {},
			type: "bytes"
		});
		assert$20(isReadableStreamLike(stream$2));
		let action = null;
		let source = null;
		let length = null;
		let type = null;
		if (typeof object === "string") {
			source = object;
			type = "text/plain;charset=UTF-8";
		} else if (object instanceof URLSearchParams) {
			source = object.toString();
			type = "application/x-www-form-urlencoded;charset=UTF-8";
		} else if (isArrayBuffer(object)) source = new Uint8Array(object.slice());
		else if (ArrayBuffer.isView(object)) source = new Uint8Array(object.buffer.slice(object.byteOffset, object.byteOffset + object.byteLength));
		else if (util$17.isFormDataLike(object)) {
			const boundary = `----formdata-undici-0${`${random(1e11)}`.padStart(11, "0")}`;
			const prefix = `--${boundary}\r\nContent-Disposition: form-data`;
			/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
			const escape = (str) => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
			const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, "\r\n");
			const blobParts = [];
			const rn = new Uint8Array([13, 10]);
			length = 0;
			let hasUnknownSizeValue = false;
			for (const [name, value] of object) if (typeof value === "string") {
				const chunk$1 = textEncoder$1.encode(prefix + `; name="${escape(normalizeLinefeeds(name))}"\r\n\r\n${normalizeLinefeeds(value)}\r\n`);
				blobParts.push(chunk$1);
				length += chunk$1.byteLength;
			} else {
				const chunk$1 = textEncoder$1.encode(`${prefix}; name="${escape(normalizeLinefeeds(name))}"` + (value.name ? `; filename="${escape(value.name)}"` : "") + `\r
Content-Type: ${value.type || "application/octet-stream"}\r\n\r\n`);
				blobParts.push(chunk$1, value, rn);
				if (typeof value.size === "number") length += chunk$1.byteLength + value.size + rn.byteLength;
				else hasUnknownSizeValue = true;
			}
			const chunk = textEncoder$1.encode(`--${boundary}--\r\n`);
			blobParts.push(chunk);
			length += chunk.byteLength;
			if (hasUnknownSizeValue) length = null;
			source = object;
			action = async function* () {
				for (const part of blobParts) if (part.stream) yield* part.stream();
				else yield part;
			};
			type = `multipart/form-data; boundary=${boundary}`;
		} else if (isBlobLike$3(object)) {
			source = object;
			length = object.size;
			if (object.type) type = object.type;
		} else if (typeof object[Symbol.asyncIterator] === "function") {
			if (keepalive) throw new TypeError("keepalive");
			if (util$17.isDisturbed(object) || object.locked) throw new TypeError("Response body object should not be disturbed or locked");
			stream$2 = object instanceof ReadableStream ? object : ReadableStreamFrom$1(object);
		}
		if (typeof source === "string" || util$17.isBuffer(source)) length = Buffer.byteLength(source);
		if (action != null) {
			let iterator;
			stream$2 = new ReadableStream({
				async start() {
					iterator = action(object)[Symbol.asyncIterator]();
				},
				async pull(controller) {
					const { value, done } = await iterator.next();
					if (done) queueMicrotask(() => {
						controller.close();
						controller.byobRequest?.respond(0);
					});
					else if (!isErrored$1(stream$2)) {
						const buffer$1 = new Uint8Array(value);
						if (buffer$1.byteLength) controller.enqueue(buffer$1);
					}
					return controller.desiredSize > 0;
				},
				async cancel(reason) {
					await iterator.return();
				},
				type: "bytes"
			});
		}
		return [{
			stream: stream$2,
			source,
			length
		}, type];
	}
	function safelyExtractBody$1(object, keepalive = false) {
		if (object instanceof ReadableStream) {
			// istanbul ignore next
			assert$20(!util$17.isDisturbed(object), "The body has already been consumed.");
			// istanbul ignore next
			assert$20(!object.locked, "The stream is locked.");
		}
		return extractBody$5(object, keepalive);
	}
	function cloneBody$2(instance, body) {
		const [out1, out2] = body.stream.tee();
		if (hasFinalizationRegistry$1) streamRegistry$1.register(instance, new WeakRef(out1));
		body.stream = out1;
		return {
			stream: out2,
			length: body.length,
			source: body.source
		};
	}
	function throwIfAborted(state) {
		if (state.aborted) throw new DOMException("The operation was aborted.", "AbortError");
	}
	function bodyMixinMethods(instance) {
		return {
			blob() {
				return consumeBody(this, (bytes) => {
					let mimeType = bodyMimeType(this);
					if (mimeType === null) mimeType = "";
					else if (mimeType) mimeType = serializeAMimeType$3(mimeType);
					return new Blob$1([bytes], { type: mimeType });
				}, instance);
			},
			arrayBuffer() {
				return consumeBody(this, (bytes) => {
					return new Uint8Array(bytes).buffer;
				}, instance);
			},
			text() {
				return consumeBody(this, utf8DecodeBytes, instance);
			},
			json() {
				return consumeBody(this, parseJSONFromBytes, instance);
			},
			formData() {
				return consumeBody(this, (value) => {
					const mimeType = bodyMimeType(this);
					if (mimeType !== null) switch (mimeType.essence) {
						case "multipart/form-data": {
							const parsed = multipartFormDataParser(value, mimeType);
							if (parsed === "failure") throw new TypeError("Failed to parse body as FormData.");
							const fd = new FormData$2();
							fd[kState$7] = parsed;
							return fd;
						}
						case "application/x-www-form-urlencoded": {
							const entries = new URLSearchParams(value.toString());
							const fd = new FormData$2();
							for (const [name, value$1] of entries) fd.append(name, value$1);
							return fd;
						}
					}
					throw new TypeError("Content-Type was not one of \"multipart/form-data\" or \"application/x-www-form-urlencoded\".");
				}, instance);
			},
			bytes() {
				return consumeBody(this, (bytes) => {
					return new Uint8Array(bytes);
				}, instance);
			}
		};
	}
	function mixinBody$2(prototype) {
		Object.assign(prototype.prototype, bodyMixinMethods(prototype));
	}
	async function consumeBody(object, convertBytesToJSValue, instance) {
		webidl$12.brandCheck(object, instance);
		if (bodyUnusable$2(object)) throw new TypeError("Body is unusable: Body has already been read");
		throwIfAborted(object[kState$7]);
		const promise = createDeferredPromise$2();
		const errorSteps = (error) => promise.reject(error);
		const successSteps = (data) => {
			try {
				promise.resolve(convertBytesToJSValue(data));
			} catch (e) {
				errorSteps(e);
			}
		};
		if (object[kState$7].body == null) {
			successSteps(Buffer.allocUnsafe(0));
			return promise.promise;
		}
		await fullyReadBody$1(object[kState$7].body, successSteps, errorSteps);
		return promise.promise;
	}
	function bodyUnusable$2(object) {
		const body = object[kState$7].body;
		return body != null && (body.stream.locked || util$17.isDisturbed(body.stream));
	}
	function parseJSONFromBytes(bytes) {
		return JSON.parse(utf8DecodeBytes(bytes));
	}
	function bodyMimeType(requestOrResponse) {
		const headers = requestOrResponse[kState$7].headersList;
		const mimeType = extractMimeType$1(headers);
		if (mimeType === "failure") return null;
		return mimeType;
	}
	module.exports = {
		extractBody: extractBody$5,
		safelyExtractBody: safelyExtractBody$1,
		cloneBody: cloneBody$2,
		mixinBody: mixinBody$2,
		streamRegistry: streamRegistry$1,
		hasFinalizationRegistry: hasFinalizationRegistry$1,
		bodyUnusable: bodyUnusable$2
	};
}));
var require_client_h1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$19 = __require("node:assert");
	var util$16 = require_util$7();
	var { channels: channels$3 } = require_diagnostics();
	var timers = require_timers();
	var { RequestContentLengthMismatchError: RequestContentLengthMismatchError$1, ResponseContentLengthMismatchError, RequestAbortedError: RequestAbortedError$7, HeadersTimeoutError, HeadersOverflowError, SocketError: SocketError$3, InformationalError: InformationalError$3, BodyTimeoutError, HTTPParserError, ResponseExceededMaxSizeError } = require_errors();
	var { kUrl: kUrl$5, kReset: kReset$1, kClient: kClient$3, kParser, kBlocking, kRunning: kRunning$5, kPending: kPending$4, kSize: kSize$6, kWriting, kQueue: kQueue$3, kNoRef, kKeepAliveDefaultTimeout: kKeepAliveDefaultTimeout$1, kHostHeader: kHostHeader$1, kPendingIdx: kPendingIdx$2, kRunningIdx: kRunningIdx$2, kError: kError$4, kPipelining: kPipelining$1, kSocket: kSocket$1, kKeepAliveTimeoutValue: kKeepAliveTimeoutValue$1, kMaxHeadersSize: kMaxHeadersSize$1, kKeepAliveMaxTimeout: kKeepAliveMaxTimeout$1, kKeepAliveTimeoutThreshold: kKeepAliveTimeoutThreshold$1, kHeadersTimeout: kHeadersTimeout$1, kBodyTimeout: kBodyTimeout$1, kStrictContentLength: kStrictContentLength$2, kMaxRequests: kMaxRequests$1, kCounter: kCounter$1, kMaxResponseSize: kMaxResponseSize$1, kOnError: kOnError$2, kResume: kResume$3, kHTTPContext: kHTTPContext$2 } = require_symbols$4();
	var constants = require_constants$3();
	var EMPTY_BUF = Buffer.alloc(0);
	var FastBuffer$1 = Buffer[Symbol.species];
	var addListener = util$16.addListener;
	var removeAllListeners = util$16.removeAllListeners;
	var extractBody$4;
	async function lazyllhttp() {
		const llhttpWasmData = process.env.JEST_WORKER_ID ? require_llhttp_wasm() : void 0;
		let mod$7;
		try {
			mod$7 = await WebAssembly.compile(require_llhttp_simd_wasm());
		} catch (e) {
			/* istanbul ignore next */
			mod$7 = await WebAssembly.compile(llhttpWasmData || require_llhttp_wasm());
		}
		return await WebAssembly.instantiate(mod$7, { env: {
			wasm_on_url: (p, at, len) => {
				/* istanbul ignore next */
				return 0;
			},
			wasm_on_status: (p, at, len) => {
				assert$19(currentParser.ptr === p);
				const start = at - currentBufferPtr + currentBufferRef.byteOffset;
				return currentParser.onStatus(new FastBuffer$1(currentBufferRef.buffer, start, len)) || 0;
			},
			wasm_on_message_begin: (p) => {
				assert$19(currentParser.ptr === p);
				return currentParser.onMessageBegin() || 0;
			},
			wasm_on_header_field: (p, at, len) => {
				assert$19(currentParser.ptr === p);
				const start = at - currentBufferPtr + currentBufferRef.byteOffset;
				return currentParser.onHeaderField(new FastBuffer$1(currentBufferRef.buffer, start, len)) || 0;
			},
			wasm_on_header_value: (p, at, len) => {
				assert$19(currentParser.ptr === p);
				const start = at - currentBufferPtr + currentBufferRef.byteOffset;
				return currentParser.onHeaderValue(new FastBuffer$1(currentBufferRef.buffer, start, len)) || 0;
			},
			wasm_on_headers_complete: (p, statusCode, upgrade$1, shouldKeepAlive) => {
				assert$19(currentParser.ptr === p);
				return currentParser.onHeadersComplete(statusCode, Boolean(upgrade$1), Boolean(shouldKeepAlive)) || 0;
			},
			wasm_on_body: (p, at, len) => {
				assert$19(currentParser.ptr === p);
				const start = at - currentBufferPtr + currentBufferRef.byteOffset;
				return currentParser.onBody(new FastBuffer$1(currentBufferRef.buffer, start, len)) || 0;
			},
			wasm_on_message_complete: (p) => {
				assert$19(currentParser.ptr === p);
				return currentParser.onMessageComplete() || 0;
			}
		} });
	}
	var llhttpInstance = null;
	var llhttpPromise = lazyllhttp();
	llhttpPromise.catch();
	var currentParser = null;
	var currentBufferRef = null;
	var currentBufferSize = 0;
	var currentBufferPtr = null;
	var USE_NATIVE_TIMER = 0;
	var USE_FAST_TIMER = 1;
	var TIMEOUT_HEADERS = 2 | USE_FAST_TIMER;
	var TIMEOUT_BODY = 4 | USE_FAST_TIMER;
	var TIMEOUT_KEEP_ALIVE = 8 | USE_NATIVE_TIMER;
	var Parser = class {
		constructor(client, socket, { exports: exports$1 }) {
			assert$19(Number.isFinite(client[kMaxHeadersSize$1]) && client[kMaxHeadersSize$1] > 0);
			this.llhttp = exports$1;
			this.ptr = this.llhttp.llhttp_alloc(constants.TYPE.RESPONSE);
			this.client = client;
			this.socket = socket;
			this.timeout = null;
			this.timeoutValue = null;
			this.timeoutType = null;
			this.statusCode = null;
			this.statusText = "";
			this.upgrade = false;
			this.headers = [];
			this.headersSize = 0;
			this.headersMaxSize = client[kMaxHeadersSize$1];
			this.shouldKeepAlive = false;
			this.paused = false;
			this.resume = this.resume.bind(this);
			this.bytesRead = 0;
			this.keepAlive = "";
			this.contentLength = "";
			this.connection = "";
			this.maxResponseSize = client[kMaxResponseSize$1];
		}
		setTimeout(delay$2, type) {
			if (delay$2 !== this.timeoutValue || type & 1 ^ this.timeoutType & 1) {
				if (this.timeout) {
					timers.clearTimeout(this.timeout);
					this.timeout = null;
				}
				if (delay$2) if (type & 1) this.timeout = timers.setFastTimeout(onParserTimeout, delay$2, new WeakRef(this));
				else {
					this.timeout = setTimeout(onParserTimeout, delay$2, new WeakRef(this));
					this.timeout.unref();
				}
				this.timeoutValue = delay$2;
			} else if (this.timeout) {
				// istanbul ignore else: only for jest
				if (this.timeout.refresh) this.timeout.refresh();
			}
			this.timeoutType = type;
		}
		resume() {
			if (this.socket.destroyed || !this.paused) return;
			assert$19(this.ptr != null);
			assert$19(currentParser == null);
			this.llhttp.llhttp_resume(this.ptr);
			assert$19(this.timeoutType === TIMEOUT_BODY);
			if (this.timeout) {
				// istanbul ignore else: only for jest
				if (this.timeout.refresh) this.timeout.refresh();
			}
			this.paused = false;
			this.execute(this.socket.read() || EMPTY_BUF);
			this.readMore();
		}
		readMore() {
			while (!this.paused && this.ptr) {
				const chunk = this.socket.read();
				if (chunk === null) break;
				this.execute(chunk);
			}
		}
		execute(data) {
			assert$19(this.ptr != null);
			assert$19(currentParser == null);
			assert$19(!this.paused);
			const { socket, llhttp } = this;
			if (data.length > currentBufferSize) {
				if (currentBufferPtr) llhttp.free(currentBufferPtr);
				currentBufferSize = Math.ceil(data.length / 4096) * 4096;
				currentBufferPtr = llhttp.malloc(currentBufferSize);
			}
			new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);
			try {
				let ret;
				try {
					currentBufferRef = data;
					currentParser = this;
					ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
				} catch (err) {
					/* istanbul ignore next: difficult to make a test case for */
					throw err;
				} finally {
					currentParser = null;
					currentBufferRef = null;
				}
				const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;
				if (ret === constants.ERROR.PAUSED_UPGRADE) this.onUpgrade(data.slice(offset));
				else if (ret === constants.ERROR.PAUSED) {
					this.paused = true;
					socket.unshift(data.slice(offset));
				} else if (ret !== constants.ERROR.OK) {
					const ptr = llhttp.llhttp_get_error_reason(this.ptr);
					let message = "";
					/* istanbul ignore else: difficult to make a test case for */
					if (ptr) {
						const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
						message = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(llhttp.memory.buffer, ptr, len).toString() + ")";
					}
					throw new HTTPParserError(message, constants.ERROR[ret], data.slice(offset));
				}
			} catch (err) {
				util$16.destroy(socket, err);
			}
		}
		destroy() {
			assert$19(this.ptr != null);
			assert$19(currentParser == null);
			this.llhttp.llhttp_free(this.ptr);
			this.ptr = null;
			this.timeout && timers.clearTimeout(this.timeout);
			this.timeout = null;
			this.timeoutValue = null;
			this.timeoutType = null;
			this.paused = false;
		}
		onStatus(buf) {
			this.statusText = buf.toString();
		}
		onMessageBegin() {
			const { socket, client } = this;
			/* istanbul ignore next: difficult to make a test case for */
			if (socket.destroyed) return -1;
			const request$1 = client[kQueue$3][client[kRunningIdx$2]];
			if (!request$1) return -1;
			request$1.onResponseStarted();
		}
		onHeaderField(buf) {
			const len = this.headers.length;
			if ((len & 1) === 0) this.headers.push(buf);
			else this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
			this.trackHeader(buf.length);
		}
		onHeaderValue(buf) {
			let len = this.headers.length;
			if ((len & 1) === 1) {
				this.headers.push(buf);
				len += 1;
			} else this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
			const key = this.headers[len - 2];
			if (key.length === 10) {
				const headerName = util$16.bufferToLowerCasedHeaderName(key);
				if (headerName === "keep-alive") this.keepAlive += buf.toString();
				else if (headerName === "connection") this.connection += buf.toString();
			} else if (key.length === 14 && util$16.bufferToLowerCasedHeaderName(key) === "content-length") this.contentLength += buf.toString();
			this.trackHeader(buf.length);
		}
		trackHeader(len) {
			this.headersSize += len;
			if (this.headersSize >= this.headersMaxSize) util$16.destroy(this.socket, new HeadersOverflowError());
		}
		onUpgrade(head) {
			const { upgrade: upgrade$1, client, socket, headers, statusCode } = this;
			assert$19(upgrade$1);
			assert$19(client[kSocket$1] === socket);
			assert$19(!socket.destroyed);
			assert$19(!this.paused);
			assert$19((headers.length & 1) === 0);
			const request$1 = client[kQueue$3][client[kRunningIdx$2]];
			assert$19(request$1);
			assert$19(request$1.upgrade || request$1.method === "CONNECT");
			this.statusCode = null;
			this.statusText = "";
			this.shouldKeepAlive = null;
			this.headers = [];
			this.headersSize = 0;
			socket.unshift(head);
			socket[kParser].destroy();
			socket[kParser] = null;
			socket[kClient$3] = null;
			socket[kError$4] = null;
			removeAllListeners(socket);
			client[kSocket$1] = null;
			client[kHTTPContext$2] = null;
			client[kQueue$3][client[kRunningIdx$2]++] = null;
			client.emit("disconnect", client[kUrl$5], [client], new InformationalError$3("upgrade"));
			try {
				request$1.onUpgrade(statusCode, headers, socket);
			} catch (err) {
				util$16.destroy(socket, err);
			}
			client[kResume$3]();
		}
		onHeadersComplete(statusCode, upgrade$1, shouldKeepAlive) {
			const { client, socket, headers, statusText } = this;
			/* istanbul ignore next: difficult to make a test case for */
			if (socket.destroyed) return -1;
			const request$1 = client[kQueue$3][client[kRunningIdx$2]];
			/* istanbul ignore next: difficult to make a test case for */
			if (!request$1) return -1;
			assert$19(!this.upgrade);
			assert$19(this.statusCode < 200);
			if (statusCode === 100) {
				util$16.destroy(socket, new SocketError$3("bad response", util$16.getSocketInfo(socket)));
				return -1;
			}
			if (upgrade$1 && !request$1.upgrade) {
				util$16.destroy(socket, new SocketError$3("bad upgrade", util$16.getSocketInfo(socket)));
				return -1;
			}
			assert$19(this.timeoutType === TIMEOUT_HEADERS);
			this.statusCode = statusCode;
			this.shouldKeepAlive = shouldKeepAlive || request$1.method === "HEAD" && !socket[kReset$1] && this.connection.toLowerCase() === "keep-alive";
			if (this.statusCode >= 200) {
				const bodyTimeout = request$1.bodyTimeout != null ? request$1.bodyTimeout : client[kBodyTimeout$1];
				this.setTimeout(bodyTimeout, TIMEOUT_BODY);
			} else if (this.timeout) {
				// istanbul ignore else: only for jest
				if (this.timeout.refresh) this.timeout.refresh();
			}
			if (request$1.method === "CONNECT") {
				assert$19(client[kRunning$5] === 1);
				this.upgrade = true;
				return 2;
			}
			if (upgrade$1) {
				assert$19(client[kRunning$5] === 1);
				this.upgrade = true;
				return 2;
			}
			assert$19((this.headers.length & 1) === 0);
			this.headers = [];
			this.headersSize = 0;
			if (this.shouldKeepAlive && client[kPipelining$1]) {
				const keepAliveTimeout = this.keepAlive ? util$16.parseKeepAliveTimeout(this.keepAlive) : null;
				if (keepAliveTimeout != null) {
					const timeout = Math.min(keepAliveTimeout - client[kKeepAliveTimeoutThreshold$1], client[kKeepAliveMaxTimeout$1]);
					if (timeout <= 0) socket[kReset$1] = true;
					else client[kKeepAliveTimeoutValue$1] = timeout;
				} else client[kKeepAliveTimeoutValue$1] = client[kKeepAliveDefaultTimeout$1];
			} else socket[kReset$1] = true;
			const pause = request$1.onHeaders(statusCode, headers, this.resume, statusText) === false;
			if (request$1.aborted) return -1;
			if (request$1.method === "HEAD") return 1;
			if (statusCode < 200) return 1;
			if (socket[kBlocking]) {
				socket[kBlocking] = false;
				client[kResume$3]();
			}
			return pause ? constants.ERROR.PAUSED : 0;
		}
		onBody(buf) {
			const { client, socket, statusCode, maxResponseSize } = this;
			if (socket.destroyed) return -1;
			const request$1 = client[kQueue$3][client[kRunningIdx$2]];
			assert$19(request$1);
			assert$19(this.timeoutType === TIMEOUT_BODY);
			if (this.timeout) {
				// istanbul ignore else: only for jest
				if (this.timeout.refresh) this.timeout.refresh();
			}
			assert$19(statusCode >= 200);
			if (maxResponseSize > -1 && this.bytesRead + buf.length > maxResponseSize) {
				util$16.destroy(socket, new ResponseExceededMaxSizeError());
				return -1;
			}
			this.bytesRead += buf.length;
			if (request$1.onData(buf) === false) return constants.ERROR.PAUSED;
		}
		onMessageComplete() {
			const { client, socket, statusCode, upgrade: upgrade$1, headers, contentLength, bytesRead, shouldKeepAlive } = this;
			if (socket.destroyed && (!statusCode || shouldKeepAlive)) return -1;
			if (upgrade$1) return;
			assert$19(statusCode >= 100);
			assert$19((this.headers.length & 1) === 0);
			const request$1 = client[kQueue$3][client[kRunningIdx$2]];
			assert$19(request$1);
			this.statusCode = null;
			this.statusText = "";
			this.bytesRead = 0;
			this.contentLength = "";
			this.keepAlive = "";
			this.connection = "";
			this.headers = [];
			this.headersSize = 0;
			if (statusCode < 200) return;
			/* istanbul ignore next: should be handled by llhttp? */
			if (request$1.method !== "HEAD" && contentLength && bytesRead !== parseInt(contentLength, 10)) {
				util$16.destroy(socket, new ResponseContentLengthMismatchError());
				return -1;
			}
			request$1.onComplete(headers);
			client[kQueue$3][client[kRunningIdx$2]++] = null;
			if (socket[kWriting]) {
				assert$19(client[kRunning$5] === 0);
				util$16.destroy(socket, new InformationalError$3("reset"));
				return constants.ERROR.PAUSED;
			} else if (!shouldKeepAlive) {
				util$16.destroy(socket, new InformationalError$3("reset"));
				return constants.ERROR.PAUSED;
			} else if (socket[kReset$1] && client[kRunning$5] === 0) {
				util$16.destroy(socket, new InformationalError$3("reset"));
				return constants.ERROR.PAUSED;
			} else if (client[kPipelining$1] == null || client[kPipelining$1] === 1) setImmediate(() => client[kResume$3]());
			else client[kResume$3]();
		}
	};
	function onParserTimeout(parser) {
		const { socket, timeoutType, client, paused } = parser.deref();
		/* istanbul ignore else */
		if (timeoutType === 3) {
			if (!socket[kWriting] || socket.writableNeedDrain || client[kRunning$5] > 1) {
				assert$19(!paused, "cannot be paused while waiting for headers");
				util$16.destroy(socket, new HeadersTimeoutError());
			}
		} else if (timeoutType === 5) {
			if (!paused) util$16.destroy(socket, new BodyTimeoutError());
		} else if (timeoutType === 8) {
			assert$19(client[kRunning$5] === 0 && client[kKeepAliveTimeoutValue$1]);
			util$16.destroy(socket, new InformationalError$3("socket idle timeout"));
		}
	}
	async function connectH1$1(client, socket) {
		client[kSocket$1] = socket;
		if (!llhttpInstance) {
			llhttpInstance = await llhttpPromise;
			llhttpPromise = null;
		}
		socket[kNoRef] = false;
		socket[kWriting] = false;
		socket[kReset$1] = false;
		socket[kBlocking] = false;
		socket[kParser] = new Parser(client, socket, llhttpInstance);
		addListener(socket, "error", function(err) {
			assert$19(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
			const parser = this[kParser];
			if (err.code === "ECONNRESET" && parser.statusCode && !parser.shouldKeepAlive) {
				parser.onMessageComplete();
				return;
			}
			this[kError$4] = err;
			this[kClient$3][kOnError$2](err);
		});
		addListener(socket, "readable", function() {
			const parser = this[kParser];
			if (parser) parser.readMore();
		});
		addListener(socket, "end", function() {
			const parser = this[kParser];
			if (parser.statusCode && !parser.shouldKeepAlive) {
				parser.onMessageComplete();
				return;
			}
			util$16.destroy(this, new SocketError$3("other side closed", util$16.getSocketInfo(this)));
		});
		addListener(socket, "close", function() {
			const client$1 = this[kClient$3];
			const parser = this[kParser];
			if (parser) {
				if (!this[kError$4] && parser.statusCode && !parser.shouldKeepAlive) parser.onMessageComplete();
				this[kParser].destroy();
				this[kParser] = null;
			}
			const err = this[kError$4] || new SocketError$3("closed", util$16.getSocketInfo(this));
			client$1[kSocket$1] = null;
			client$1[kHTTPContext$2] = null;
			if (client$1.destroyed) {
				assert$19(client$1[kPending$4] === 0);
				const requests = client$1[kQueue$3].splice(client$1[kRunningIdx$2]);
				for (let i = 0; i < requests.length; i++) {
					const request$1 = requests[i];
					util$16.errorRequest(client$1, request$1, err);
				}
			} else if (client$1[kRunning$5] > 0 && err.code !== "UND_ERR_INFO") {
				const request$1 = client$1[kQueue$3][client$1[kRunningIdx$2]];
				client$1[kQueue$3][client$1[kRunningIdx$2]++] = null;
				util$16.errorRequest(client$1, request$1, err);
			}
			client$1[kPendingIdx$2] = client$1[kRunningIdx$2];
			assert$19(client$1[kRunning$5] === 0);
			client$1.emit("disconnect", client$1[kUrl$5], [client$1], err);
			client$1[kResume$3]();
		});
		let closed = false;
		socket.on("close", () => {
			closed = true;
		});
		return {
			version: "h1",
			defaultPipelining: 1,
			write(...args) {
				return writeH1(client, ...args);
			},
			resume() {
				resumeH1(client);
			},
			destroy(err, callback) {
				if (closed) queueMicrotask(callback);
				else socket.destroy(err).on("close", callback);
			},
			get destroyed() {
				return socket.destroyed;
			},
			busy(request$1) {
				if (socket[kWriting] || socket[kReset$1] || socket[kBlocking]) return true;
				if (request$1) {
					if (client[kRunning$5] > 0 && !request$1.idempotent) return true;
					if (client[kRunning$5] > 0 && (request$1.upgrade || request$1.method === "CONNECT")) return true;
					if (client[kRunning$5] > 0 && util$16.bodyLength(request$1.body) !== 0 && (util$16.isStream(request$1.body) || util$16.isAsyncIterable(request$1.body) || util$16.isFormDataLike(request$1.body))) return true;
				}
				return false;
			}
		};
	}
	function resumeH1(client) {
		const socket = client[kSocket$1];
		if (socket && !socket.destroyed) {
			if (client[kSize$6] === 0) {
				if (!socket[kNoRef] && socket.unref) {
					socket.unref();
					socket[kNoRef] = true;
				}
			} else if (socket[kNoRef] && socket.ref) {
				socket.ref();
				socket[kNoRef] = false;
			}
			if (client[kSize$6] === 0) {
				if (socket[kParser].timeoutType !== 8) socket[kParser].setTimeout(client[kKeepAliveTimeoutValue$1], TIMEOUT_KEEP_ALIVE);
			} else if (client[kRunning$5] > 0 && socket[kParser].statusCode < 200) {
				if (socket[kParser].timeoutType !== 3) {
					const request$1 = client[kQueue$3][client[kRunningIdx$2]];
					const headersTimeout = request$1.headersTimeout != null ? request$1.headersTimeout : client[kHeadersTimeout$1];
					socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
				}
			}
		}
	}
	function shouldSendContentLength$1(method) {
		return method !== "GET" && method !== "HEAD" && method !== "OPTIONS" && method !== "TRACE" && method !== "CONNECT";
	}
	function writeH1(client, request$1) {
		const { method, path, host, upgrade: upgrade$1, blocking, reset } = request$1;
		let { body, headers, contentLength } = request$1;
		const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH" || method === "QUERY" || method === "PROPFIND" || method === "PROPPATCH";
		if (util$16.isFormDataLike(body)) {
			if (!extractBody$4) extractBody$4 = require_body().extractBody;
			const [bodyStream, contentType] = extractBody$4(body);
			if (request$1.contentType == null) headers.push("content-type", contentType);
			body = bodyStream.stream;
			contentLength = bodyStream.length;
		} else if (util$16.isBlobLike(body) && request$1.contentType == null && body.type) headers.push("content-type", body.type);
		if (body && typeof body.read === "function") body.read(0);
		const bodyLength$1 = util$16.bodyLength(body);
		contentLength = bodyLength$1 ?? contentLength;
		if (contentLength === null) contentLength = request$1.contentLength;
		if (contentLength === 0 && !expectsPayload) contentLength = null;
		if (shouldSendContentLength$1(method) && contentLength > 0 && request$1.contentLength !== null && request$1.contentLength !== contentLength) {
			if (client[kStrictContentLength$2]) {
				util$16.errorRequest(client, request$1, new RequestContentLengthMismatchError$1());
				return false;
			}
			process.emitWarning(new RequestContentLengthMismatchError$1());
		}
		const socket = client[kSocket$1];
		const abort$1 = (err) => {
			if (request$1.aborted || request$1.completed) return;
			util$16.errorRequest(client, request$1, err || new RequestAbortedError$7());
			util$16.destroy(body);
			util$16.destroy(socket, new InformationalError$3("aborted"));
		};
		try {
			request$1.onConnect(abort$1);
		} catch (err) {
			util$16.errorRequest(client, request$1, err);
		}
		if (request$1.aborted) return false;
		if (method === "HEAD") socket[kReset$1] = true;
		if (upgrade$1 || method === "CONNECT") socket[kReset$1] = true;
		if (reset != null) socket[kReset$1] = reset;
		if (client[kMaxRequests$1] && socket[kCounter$1]++ >= client[kMaxRequests$1]) socket[kReset$1] = true;
		if (blocking) socket[kBlocking] = true;
		let header = `${method} ${path} HTTP/1.1\r\n`;
		if (typeof host === "string") header += `host: ${host}\r\n`;
		else header += client[kHostHeader$1];
		if (upgrade$1) header += `connection: upgrade\r\nupgrade: ${upgrade$1}\r\n`;
		else if (client[kPipelining$1] && !socket[kReset$1]) header += "connection: keep-alive\r\n";
		else header += "connection: close\r\n";
		if (Array.isArray(headers)) for (let n = 0; n < headers.length; n += 2) {
			const key = headers[n + 0];
			const val = headers[n + 1];
			if (Array.isArray(val)) for (let i = 0; i < val.length; i++) header += `${key}: ${val[i]}\r\n`;
			else header += `${key}: ${val}\r\n`;
		}
		if (channels$3.sendHeaders.hasSubscribers) channels$3.sendHeaders.publish({
			request: request$1,
			headers: header,
			socket
		});
		/* istanbul ignore else: assertion */
		if (!body || bodyLength$1 === 0) writeBuffer$1(abort$1, null, client, request$1, socket, contentLength, header, expectsPayload);
		else if (util$16.isBuffer(body)) writeBuffer$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload);
		else if (util$16.isBlobLike(body)) if (typeof body.stream === "function") writeIterable$1(abort$1, body.stream(), client, request$1, socket, contentLength, header, expectsPayload);
		else writeBlob$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload);
		else if (util$16.isStream(body)) writeStream$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload);
		else if (util$16.isIterable(body)) writeIterable$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload);
		else assert$19(false);
		return true;
	}
	function writeStream$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload) {
		assert$19(contentLength !== 0 || client[kRunning$5] === 0, "stream body cannot be pipelined");
		let finished$2 = false;
		const writer = new AsyncWriter({
			abort: abort$1,
			socket,
			request: request$1,
			contentLength,
			client,
			expectsPayload,
			header
		});
		const onData = function(chunk) {
			if (finished$2) return;
			try {
				if (!writer.write(chunk) && this.pause) this.pause();
			} catch (err) {
				util$16.destroy(this, err);
			}
		};
		const onDrain = function() {
			if (finished$2) return;
			if (body.resume) body.resume();
		};
		const onClose = function() {
			queueMicrotask(() => {
				body.removeListener("error", onFinished);
			});
			if (!finished$2) {
				const err = new RequestAbortedError$7();
				queueMicrotask(() => onFinished(err));
			}
		};
		const onFinished = function(err) {
			if (finished$2) return;
			finished$2 = true;
			assert$19(socket.destroyed || socket[kWriting] && client[kRunning$5] <= 1);
			socket.off("drain", onDrain).off("error", onFinished);
			body.removeListener("data", onData).removeListener("end", onFinished).removeListener("close", onClose);
			if (!err) try {
				writer.end();
			} catch (er) {
				err = er;
			}
			writer.destroy(err);
			if (err && (err.code !== "UND_ERR_INFO" || err.message !== "reset")) util$16.destroy(body, err);
			else util$16.destroy(body);
		};
		body.on("data", onData).on("end", onFinished).on("error", onFinished).on("close", onClose);
		if (body.resume) body.resume();
		socket.on("drain", onDrain).on("error", onFinished);
		if (body.errorEmitted ?? body.errored) setImmediate(() => onFinished(body.errored));
		else if (body.endEmitted ?? body.readableEnded) setImmediate(() => onFinished(null));
		if (body.closeEmitted ?? body.closed) setImmediate(onClose);
	}
	function writeBuffer$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload) {
		try {
			if (!body) if (contentLength === 0) socket.write(`${header}content-length: 0\r\n\r\n`, "latin1");
			else {
				assert$19(contentLength === null, "no body must not have content length");
				socket.write(`${header}\r\n`, "latin1");
			}
			else if (util$16.isBuffer(body)) {
				assert$19(contentLength === body.byteLength, "buffer body must have content length");
				socket.cork();
				socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, "latin1");
				socket.write(body);
				socket.uncork();
				request$1.onBodySent(body);
				if (!expectsPayload && request$1.reset !== false) socket[kReset$1] = true;
			}
			request$1.onRequestSent();
			client[kResume$3]();
		} catch (err) {
			abort$1(err);
		}
	}
	async function writeBlob$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload) {
		assert$19(contentLength === body.size, "blob body must have content length");
		try {
			if (contentLength != null && contentLength !== body.size) throw new RequestContentLengthMismatchError$1();
			const buffer$1 = Buffer.from(await body.arrayBuffer());
			socket.cork();
			socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, "latin1");
			socket.write(buffer$1);
			socket.uncork();
			request$1.onBodySent(buffer$1);
			request$1.onRequestSent();
			if (!expectsPayload && request$1.reset !== false) socket[kReset$1] = true;
			client[kResume$3]();
		} catch (err) {
			abort$1(err);
		}
	}
	async function writeIterable$1(abort$1, body, client, request$1, socket, contentLength, header, expectsPayload) {
		assert$19(contentLength !== 0 || client[kRunning$5] === 0, "iterator body cannot be pipelined");
		let callback = null;
		function onDrain() {
			if (callback) {
				const cb = callback;
				callback = null;
				cb();
			}
		}
		const waitForDrain = () => new Promise((resolve, reject) => {
			assert$19(callback === null);
			if (socket[kError$4]) reject(socket[kError$4]);
			else callback = resolve;
		});
		socket.on("close", onDrain).on("drain", onDrain);
		const writer = new AsyncWriter({
			abort: abort$1,
			socket,
			request: request$1,
			contentLength,
			client,
			expectsPayload,
			header
		});
		try {
			for await (const chunk of body) {
				if (socket[kError$4]) throw socket[kError$4];
				if (!writer.write(chunk)) await waitForDrain();
			}
			writer.end();
		} catch (err) {
			writer.destroy(err);
		} finally {
			socket.off("close", onDrain).off("drain", onDrain);
		}
	}
	var AsyncWriter = class {
		constructor({ abort: abort$1, socket, request: request$1, contentLength, client, expectsPayload, header }) {
			this.socket = socket;
			this.request = request$1;
			this.contentLength = contentLength;
			this.client = client;
			this.bytesWritten = 0;
			this.expectsPayload = expectsPayload;
			this.header = header;
			this.abort = abort$1;
			socket[kWriting] = true;
		}
		write(chunk) {
			const { socket, request: request$1, contentLength, client, bytesWritten, expectsPayload, header } = this;
			if (socket[kError$4]) throw socket[kError$4];
			if (socket.destroyed) return false;
			const len = Buffer.byteLength(chunk);
			if (!len) return true;
			if (contentLength !== null && bytesWritten + len > contentLength) {
				if (client[kStrictContentLength$2]) throw new RequestContentLengthMismatchError$1();
				process.emitWarning(new RequestContentLengthMismatchError$1());
			}
			socket.cork();
			if (bytesWritten === 0) {
				if (!expectsPayload && request$1.reset !== false) socket[kReset$1] = true;
				if (contentLength === null) socket.write(`${header}transfer-encoding: chunked\r\n`, "latin1");
				else socket.write(`${header}content-length: ${contentLength}\r\n\r\n`, "latin1");
			}
			if (contentLength === null) socket.write(`\r\n${len.toString(16)}\r\n`, "latin1");
			this.bytesWritten += len;
			const ret = socket.write(chunk);
			socket.uncork();
			request$1.onBodySent(chunk);
			if (!ret) {
				if (socket[kParser].timeout && socket[kParser].timeoutType === 3) {
					// istanbul ignore else: only for jest
					if (socket[kParser].timeout.refresh) socket[kParser].timeout.refresh();
				}
			}
			return ret;
		}
		end() {
			const { socket, contentLength, client, bytesWritten, expectsPayload, header, request: request$1 } = this;
			request$1.onRequestSent();
			socket[kWriting] = false;
			if (socket[kError$4]) throw socket[kError$4];
			if (socket.destroyed) return;
			if (bytesWritten === 0) if (expectsPayload) socket.write(`${header}content-length: 0\r\n\r\n`, "latin1");
			else socket.write(`${header}\r\n`, "latin1");
			else if (contentLength === null) socket.write("\r\n0\r\n\r\n", "latin1");
			if (contentLength !== null && bytesWritten !== contentLength) if (client[kStrictContentLength$2]) throw new RequestContentLengthMismatchError$1();
			else process.emitWarning(new RequestContentLengthMismatchError$1());
			if (socket[kParser].timeout && socket[kParser].timeoutType === 3) {
				// istanbul ignore else: only for jest
				if (socket[kParser].timeout.refresh) socket[kParser].timeout.refresh();
			}
			client[kResume$3]();
		}
		destroy(err) {
			const { socket, client, abort: abort$1 } = this;
			socket[kWriting] = false;
			if (err) {
				assert$19(client[kRunning$5] <= 1, "pipeline should only contain this request");
				abort$1(err);
			}
		}
	};
	module.exports = connectH1$1;
}));
var require_client_h2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$18 = __require("node:assert");
	var { pipeline: pipeline$3 } = __require("node:stream");
	var util$15 = require_util$7();
	var { RequestContentLengthMismatchError, RequestAbortedError: RequestAbortedError$6, SocketError: SocketError$2, InformationalError: InformationalError$2 } = require_errors();
	var { kUrl: kUrl$4, kReset, kClient: kClient$2, kRunning: kRunning$4, kPending: kPending$3, kQueue: kQueue$2, kPendingIdx: kPendingIdx$1, kRunningIdx: kRunningIdx$1, kError: kError$3, kSocket, kStrictContentLength: kStrictContentLength$1, kOnError: kOnError$1, kMaxConcurrentStreams: kMaxConcurrentStreams$1, kHTTP2Session, kResume: kResume$2, kSize: kSize$5, kHTTPContext: kHTTPContext$1 } = require_symbols$4();
	var kOpenStreams = Symbol("open streams");
	var extractBody$3;
	var h2ExperimentalWarned = false;
	var http2;
	try {
		http2 = __require("node:http2");
	} catch {
		http2 = { constants: {} };
	}
	var { constants: { HTTP2_HEADER_AUTHORITY, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_HEADER_SCHEME, HTTP2_HEADER_CONTENT_LENGTH, HTTP2_HEADER_EXPECT, HTTP2_HEADER_STATUS } } = http2;
	function parseH2Headers(headers) {
		const result = [];
		for (const [name, value] of Object.entries(headers)) if (Array.isArray(value)) for (const subvalue of value) result.push(Buffer.from(name), Buffer.from(subvalue));
		else result.push(Buffer.from(name), Buffer.from(value));
		return result;
	}
	async function connectH2$1(client, socket) {
		client[kSocket] = socket;
		if (!h2ExperimentalWarned) {
			h2ExperimentalWarned = true;
			process.emitWarning("H2 support is experimental, expect them to change at any time.", { code: "UNDICI-H2" });
		}
		const session$1 = http2.connect(client[kUrl$4], {
			createConnection: () => socket,
			peerMaxConcurrentStreams: client[kMaxConcurrentStreams$1]
		});
		session$1[kOpenStreams] = 0;
		session$1[kClient$2] = client;
		session$1[kSocket] = socket;
		util$15.addListener(session$1, "error", onHttp2SessionError);
		util$15.addListener(session$1, "frameError", onHttp2FrameError);
		util$15.addListener(session$1, "end", onHttp2SessionEnd);
		util$15.addListener(session$1, "goaway", onHTTP2GoAway);
		util$15.addListener(session$1, "close", function() {
			const { [kClient$2]: client$1 } = this;
			const { [kSocket]: socket$1 } = client$1;
			const err = this[kSocket][kError$3] || this[kError$3] || new SocketError$2("closed", util$15.getSocketInfo(socket$1));
			client$1[kHTTP2Session] = null;
			if (client$1.destroyed) {
				assert$18(client$1[kPending$3] === 0);
				const requests = client$1[kQueue$2].splice(client$1[kRunningIdx$1]);
				for (let i = 0; i < requests.length; i++) {
					const request$1 = requests[i];
					util$15.errorRequest(client$1, request$1, err);
				}
			}
		});
		session$1.unref();
		client[kHTTP2Session] = session$1;
		socket[kHTTP2Session] = session$1;
		util$15.addListener(socket, "error", function(err) {
			assert$18(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
			this[kError$3] = err;
			this[kClient$2][kOnError$1](err);
		});
		util$15.addListener(socket, "end", function() {
			util$15.destroy(this, new SocketError$2("other side closed", util$15.getSocketInfo(this)));
		});
		util$15.addListener(socket, "close", function() {
			const err = this[kError$3] || new SocketError$2("closed", util$15.getSocketInfo(this));
			client[kSocket] = null;
			if (this[kHTTP2Session] != null) this[kHTTP2Session].destroy(err);
			client[kPendingIdx$1] = client[kRunningIdx$1];
			assert$18(client[kRunning$4] === 0);
			client.emit("disconnect", client[kUrl$4], [client], err);
			client[kResume$2]();
		});
		let closed = false;
		socket.on("close", () => {
			closed = true;
		});
		return {
			version: "h2",
			defaultPipelining: Infinity,
			write(...args) {
				return writeH2(client, ...args);
			},
			resume() {
				resumeH2(client);
			},
			destroy(err, callback) {
				if (closed) queueMicrotask(callback);
				else socket.destroy(err).on("close", callback);
			},
			get destroyed() {
				return socket.destroyed;
			},
			busy() {
				return false;
			}
		};
	}
	function resumeH2(client) {
		const socket = client[kSocket];
		if (socket?.destroyed === false) if (client[kSize$5] === 0 && client[kMaxConcurrentStreams$1] === 0) {
			socket.unref();
			client[kHTTP2Session].unref();
		} else {
			socket.ref();
			client[kHTTP2Session].ref();
		}
	}
	function onHttp2SessionError(err) {
		assert$18(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
		this[kSocket][kError$3] = err;
		this[kClient$2][kOnError$1](err);
	}
	function onHttp2FrameError(type, code, id) {
		if (id === 0) {
			const err = new InformationalError$2(`HTTP/2: "frameError" received - type ${type}, code ${code}`);
			this[kSocket][kError$3] = err;
			this[kClient$2][kOnError$1](err);
		}
	}
	function onHttp2SessionEnd() {
		const err = new SocketError$2("other side closed", util$15.getSocketInfo(this[kSocket]));
		this.destroy(err);
		util$15.destroy(this[kSocket], err);
	}
	function onHTTP2GoAway(code) {
		const err = this[kError$3] || new SocketError$2(`HTTP/2: "GOAWAY" frame received with code ${code}`, util$15.getSocketInfo(this));
		const client = this[kClient$2];
		client[kSocket] = null;
		client[kHTTPContext$1] = null;
		if (this[kHTTP2Session] != null) {
			this[kHTTP2Session].destroy(err);
			this[kHTTP2Session] = null;
		}
		util$15.destroy(this[kSocket], err);
		if (client[kRunningIdx$1] < client[kQueue$2].length) {
			const request$1 = client[kQueue$2][client[kRunningIdx$1]];
			client[kQueue$2][client[kRunningIdx$1]++] = null;
			util$15.errorRequest(client, request$1, err);
			client[kPendingIdx$1] = client[kRunningIdx$1];
		}
		assert$18(client[kRunning$4] === 0);
		client.emit("disconnect", client[kUrl$4], [client], err);
		client[kResume$2]();
	}
	function shouldSendContentLength(method) {
		return method !== "GET" && method !== "HEAD" && method !== "OPTIONS" && method !== "TRACE" && method !== "CONNECT";
	}
	function writeH2(client, request$1) {
		const session$1 = client[kHTTP2Session];
		const { method, path, host, upgrade: upgrade$1, expectContinue, signal, headers: reqHeaders } = request$1;
		let { body } = request$1;
		if (upgrade$1) {
			util$15.errorRequest(client, request$1, /* @__PURE__ */ new Error("Upgrade not supported for H2"));
			return false;
		}
		const headers = {};
		for (let n = 0; n < reqHeaders.length; n += 2) {
			const key = reqHeaders[n + 0];
			const val = reqHeaders[n + 1];
			if (Array.isArray(val)) for (let i = 0; i < val.length; i++) if (headers[key]) headers[key] += `,${val[i]}`;
			else headers[key] = val[i];
			else headers[key] = val;
		}
		let stream$2;
		const { hostname, port } = client[kUrl$4];
		headers[HTTP2_HEADER_AUTHORITY] = host || `${hostname}${port ? `:${port}` : ""}`;
		headers[HTTP2_HEADER_METHOD] = method;
		const abort$1 = (err) => {
			if (request$1.aborted || request$1.completed) return;
			err = err || new RequestAbortedError$6();
			util$15.errorRequest(client, request$1, err);
			if (stream$2 != null) util$15.destroy(stream$2, err);
			util$15.destroy(body, err);
			client[kQueue$2][client[kRunningIdx$1]++] = null;
			client[kResume$2]();
		};
		try {
			request$1.onConnect(abort$1);
		} catch (err) {
			util$15.errorRequest(client, request$1, err);
		}
		if (request$1.aborted) return false;
		if (method === "CONNECT") {
			session$1.ref();
			stream$2 = session$1.request(headers, {
				endStream: false,
				signal
			});
			if (stream$2.id && !stream$2.pending) {
				request$1.onUpgrade(null, null, stream$2);
				++session$1[kOpenStreams];
				client[kQueue$2][client[kRunningIdx$1]++] = null;
			} else stream$2.once("ready", () => {
				request$1.onUpgrade(null, null, stream$2);
				++session$1[kOpenStreams];
				client[kQueue$2][client[kRunningIdx$1]++] = null;
			});
			stream$2.once("close", () => {
				session$1[kOpenStreams] -= 1;
				if (session$1[kOpenStreams] === 0) session$1.unref();
			});
			return true;
		}
		headers[HTTP2_HEADER_PATH] = path;
		headers[HTTP2_HEADER_SCHEME] = "https";
		const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
		if (body && typeof body.read === "function") body.read(0);
		let contentLength = util$15.bodyLength(body);
		if (util$15.isFormDataLike(body)) {
			extractBody$3 ??= require_body().extractBody;
			const [bodyStream, contentType] = extractBody$3(body);
			headers["content-type"] = contentType;
			body = bodyStream.stream;
			contentLength = bodyStream.length;
		}
		if (contentLength == null) contentLength = request$1.contentLength;
		if (contentLength === 0 || !expectsPayload) contentLength = null;
		if (shouldSendContentLength(method) && contentLength > 0 && request$1.contentLength != null && request$1.contentLength !== contentLength) {
			if (client[kStrictContentLength$1]) {
				util$15.errorRequest(client, request$1, new RequestContentLengthMismatchError());
				return false;
			}
			process.emitWarning(new RequestContentLengthMismatchError());
		}
		if (contentLength != null) {
			assert$18(body, "no body must not have content length");
			headers[HTTP2_HEADER_CONTENT_LENGTH] = `${contentLength}`;
		}
		session$1.ref();
		const shouldEndStream = method === "GET" || method === "HEAD" || body === null;
		if (expectContinue) {
			headers[HTTP2_HEADER_EXPECT] = "100-continue";
			stream$2 = session$1.request(headers, {
				endStream: shouldEndStream,
				signal
			});
			stream$2.once("continue", writeBodyH2);
		} else {
			stream$2 = session$1.request(headers, {
				endStream: shouldEndStream,
				signal
			});
			writeBodyH2();
		}
		++session$1[kOpenStreams];
		stream$2.once("response", (headers$1) => {
			const { [HTTP2_HEADER_STATUS]: statusCode,...realHeaders } = headers$1;
			request$1.onResponseStarted();
			if (request$1.aborted) {
				const err = new RequestAbortedError$6();
				util$15.errorRequest(client, request$1, err);
				util$15.destroy(stream$2, err);
				return;
			}
			if (request$1.onHeaders(Number(statusCode), parseH2Headers(realHeaders), stream$2.resume.bind(stream$2), "") === false) stream$2.pause();
			stream$2.on("data", (chunk) => {
				if (request$1.onData(chunk) === false) stream$2.pause();
			});
		});
		stream$2.once("end", () => {
			if (stream$2.state?.state == null || stream$2.state.state < 6) request$1.onComplete([]);
			if (session$1[kOpenStreams] === 0) session$1.unref();
			abort$1(new InformationalError$2("HTTP/2: stream half-closed (remote)"));
			client[kQueue$2][client[kRunningIdx$1]++] = null;
			client[kPendingIdx$1] = client[kRunningIdx$1];
			client[kResume$2]();
		});
		stream$2.once("close", () => {
			session$1[kOpenStreams] -= 1;
			if (session$1[kOpenStreams] === 0) session$1.unref();
		});
		stream$2.once("error", function(err) {
			abort$1(err);
		});
		stream$2.once("frameError", (type, code) => {
			abort$1(new InformationalError$2(`HTTP/2: "frameError" received - type ${type}, code ${code}`));
		});
		return true;
		function writeBodyH2() {
			/* istanbul ignore else: assertion */
			if (!body || contentLength === 0) writeBuffer(abort$1, stream$2, null, client, request$1, client[kSocket], contentLength, expectsPayload);
			else if (util$15.isBuffer(body)) writeBuffer(abort$1, stream$2, body, client, request$1, client[kSocket], contentLength, expectsPayload);
			else if (util$15.isBlobLike(body)) if (typeof body.stream === "function") writeIterable(abort$1, stream$2, body.stream(), client, request$1, client[kSocket], contentLength, expectsPayload);
			else writeBlob(abort$1, stream$2, body, client, request$1, client[kSocket], contentLength, expectsPayload);
			else if (util$15.isStream(body)) writeStream(abort$1, client[kSocket], expectsPayload, stream$2, body, client, request$1, contentLength);
			else if (util$15.isIterable(body)) writeIterable(abort$1, stream$2, body, client, request$1, client[kSocket], contentLength, expectsPayload);
			else assert$18(false);
		}
	}
	function writeBuffer(abort$1, h2stream, body, client, request$1, socket, contentLength, expectsPayload) {
		try {
			if (body != null && util$15.isBuffer(body)) {
				assert$18(contentLength === body.byteLength, "buffer body must have content length");
				h2stream.cork();
				h2stream.write(body);
				h2stream.uncork();
				h2stream.end();
				request$1.onBodySent(body);
			}
			if (!expectsPayload) socket[kReset] = true;
			request$1.onRequestSent();
			client[kResume$2]();
		} catch (error) {
			abort$1(error);
		}
	}
	function writeStream(abort$1, socket, expectsPayload, h2stream, body, client, request$1, contentLength) {
		assert$18(contentLength !== 0 || client[kRunning$4] === 0, "stream body cannot be pipelined");
		const pipe = pipeline$3(body, h2stream, (err) => {
			if (err) {
				util$15.destroy(pipe, err);
				abort$1(err);
			} else {
				util$15.removeAllListeners(pipe);
				request$1.onRequestSent();
				if (!expectsPayload) socket[kReset] = true;
				client[kResume$2]();
			}
		});
		util$15.addListener(pipe, "data", onPipeData);
		function onPipeData(chunk) {
			request$1.onBodySent(chunk);
		}
	}
	async function writeBlob(abort$1, h2stream, body, client, request$1, socket, contentLength, expectsPayload) {
		assert$18(contentLength === body.size, "blob body must have content length");
		try {
			if (contentLength != null && contentLength !== body.size) throw new RequestContentLengthMismatchError();
			const buffer$1 = Buffer.from(await body.arrayBuffer());
			h2stream.cork();
			h2stream.write(buffer$1);
			h2stream.uncork();
			h2stream.end();
			request$1.onBodySent(buffer$1);
			request$1.onRequestSent();
			if (!expectsPayload) socket[kReset] = true;
			client[kResume$2]();
		} catch (err) {
			abort$1(err);
		}
	}
	async function writeIterable(abort$1, h2stream, body, client, request$1, socket, contentLength, expectsPayload) {
		assert$18(contentLength !== 0 || client[kRunning$4] === 0, "iterator body cannot be pipelined");
		let callback = null;
		function onDrain() {
			if (callback) {
				const cb = callback;
				callback = null;
				cb();
			}
		}
		const waitForDrain = () => new Promise((resolve, reject) => {
			assert$18(callback === null);
			if (socket[kError$3]) reject(socket[kError$3]);
			else callback = resolve;
		});
		h2stream.on("close", onDrain).on("drain", onDrain);
		try {
			for await (const chunk of body) {
				if (socket[kError$3]) throw socket[kError$3];
				const res = h2stream.write(chunk);
				request$1.onBodySent(chunk);
				if (!res) await waitForDrain();
			}
			h2stream.end();
			request$1.onRequestSent();
			if (!expectsPayload) socket[kReset] = true;
			client[kResume$2]();
		} catch (err) {
			abort$1(err);
		} finally {
			h2stream.off("close", onDrain).off("drain", onDrain);
		}
	}
	module.exports = connectH2$1;
}));
var require_redirect_handler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util$14 = require_util$7();
	var { kBodyUsed } = require_symbols$4();
	var assert$17 = __require("node:assert");
	var { InvalidArgumentError: InvalidArgumentError$19 } = require_errors();
	var EE$1 = __require("node:events");
	var redirectableStatusCodes = [
		300,
		301,
		302,
		303,
		307,
		308
	];
	var kBody$1 = Symbol("body");
	var BodyAsyncIterable = class {
		constructor(body) {
			this[kBody$1] = body;
			this[kBodyUsed] = false;
		}
		async *[Symbol.asyncIterator]() {
			assert$17(!this[kBodyUsed], "disturbed");
			this[kBodyUsed] = true;
			yield* this[kBody$1];
		}
	};
	var RedirectHandler$3 = class {
		constructor(dispatch, maxRedirections, opts, handler) {
			if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) throw new InvalidArgumentError$19("maxRedirections must be a positive number");
			util$14.validateHandler(handler, opts.method, opts.upgrade);
			this.dispatch = dispatch;
			this.location = null;
			this.abort = null;
			this.opts = {
				...opts,
				maxRedirections: 0
			};
			this.maxRedirections = maxRedirections;
			this.handler = handler;
			this.history = [];
			this.redirectionLimitReached = false;
			if (util$14.isStream(this.opts.body)) {
				if (util$14.bodyLength(this.opts.body) === 0) this.opts.body.on("data", function() {
					assert$17(false);
				});
				if (typeof this.opts.body.readableDidRead !== "boolean") {
					this.opts.body[kBodyUsed] = false;
					EE$1.prototype.on.call(this.opts.body, "data", function() {
						this[kBodyUsed] = true;
					});
				}
			} else if (this.opts.body && typeof this.opts.body.pipeTo === "function") this.opts.body = new BodyAsyncIterable(this.opts.body);
			else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && util$14.isIterable(this.opts.body)) this.opts.body = new BodyAsyncIterable(this.opts.body);
		}
		onConnect(abort$1) {
			this.abort = abort$1;
			this.handler.onConnect(abort$1, { history: this.history });
		}
		onUpgrade(statusCode, headers, socket) {
			this.handler.onUpgrade(statusCode, headers, socket);
		}
		onError(error) {
			this.handler.onError(error);
		}
		onHeaders(statusCode, headers, resume$1, statusText) {
			this.location = this.history.length >= this.maxRedirections || util$14.isDisturbed(this.opts.body) ? null : parseLocation(statusCode, headers);
			if (this.opts.throwOnMaxRedirect && this.history.length >= this.maxRedirections) {
				if (this.request) this.request.abort(/* @__PURE__ */ new Error("max redirects"));
				this.redirectionLimitReached = true;
				this.abort(/* @__PURE__ */ new Error("max redirects"));
				return;
			}
			if (this.opts.origin) this.history.push(new URL(this.opts.path, this.opts.origin));
			if (!this.location) return this.handler.onHeaders(statusCode, headers, resume$1, statusText);
			const { origin, pathname, search } = util$14.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
			const path = search ? `${pathname}${search}` : pathname;
			this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
			this.opts.path = path;
			this.opts.origin = origin;
			this.opts.maxRedirections = 0;
			this.opts.query = null;
			if (statusCode === 303 && this.opts.method !== "HEAD") {
				this.opts.method = "GET";
				this.opts.body = null;
			}
		}
		onData(chunk) {
			if (this.location) {} else return this.handler.onData(chunk);
		}
		onComplete(trailers) {
			if (this.location) {
				this.location = null;
				this.abort = null;
				this.dispatch(this.opts, this);
			} else this.handler.onComplete(trailers);
		}
		onBodySent(chunk) {
			if (this.handler.onBodySent) this.handler.onBodySent(chunk);
		}
	};
	function parseLocation(statusCode, headers) {
		if (redirectableStatusCodes.indexOf(statusCode) === -1) return null;
		for (let i = 0; i < headers.length; i += 2) if (headers[i].length === 8 && util$14.headerNameToString(headers[i]) === "location") return headers[i + 1];
	}
	function shouldRemoveHeader(header, removeContent, unknownOrigin) {
		if (header.length === 4) return util$14.headerNameToString(header) === "host";
		if (removeContent && util$14.headerNameToString(header).startsWith("content-")) return true;
		if (unknownOrigin && (header.length === 13 || header.length === 6 || header.length === 19)) {
			const name = util$14.headerNameToString(header);
			return name === "authorization" || name === "cookie" || name === "proxy-authorization";
		}
		return false;
	}
	function cleanRequestHeaders(headers, removeContent, unknownOrigin) {
		const ret = [];
		if (Array.isArray(headers)) {
			for (let i = 0; i < headers.length; i += 2) if (!shouldRemoveHeader(headers[i], removeContent, unknownOrigin)) ret.push(headers[i], headers[i + 1]);
		} else if (headers && typeof headers === "object") {
			for (const key of Object.keys(headers)) if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) ret.push(key, headers[key]);
		} else assert$17(headers == null, "headers must be an object or an array");
		return ret;
	}
	module.exports = RedirectHandler$3;
}));
var require_redirect_interceptor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var RedirectHandler$2 = require_redirect_handler();
	function createRedirectInterceptor$3({ maxRedirections: defaultMaxRedirections }) {
		return (dispatch) => {
			return function Intercept(opts, handler) {
				const { maxRedirections = defaultMaxRedirections } = opts;
				if (!maxRedirections) return dispatch(opts, handler);
				const redirectHandler = new RedirectHandler$2(dispatch, maxRedirections, opts, handler);
				opts = {
					...opts,
					maxRedirections: 0
				};
				return dispatch(opts, redirectHandler);
			};
		};
	}
	module.exports = createRedirectInterceptor$3;
}));
var require_client = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$16 = __require("node:assert");
	var net$1 = __require("node:net");
	var http = __require("node:http");
	var util$13 = require_util$7();
	var { channels: channels$2 } = require_diagnostics();
	var Request$3 = require_request$1();
	var DispatcherBase$4 = require_dispatcher_base();
	var { InvalidArgumentError: InvalidArgumentError$18, InformationalError: InformationalError$1, ClientDestroyedError } = require_errors();
	var buildConnector$3 = require_connect();
	var { kUrl: kUrl$3, kServerName, kClient: kClient$1, kBusy: kBusy$1, kConnect, kResuming, kRunning: kRunning$3, kPending: kPending$2, kSize: kSize$4, kQueue: kQueue$1, kConnected: kConnected$5, kConnecting, kNeedDrain: kNeedDrain$3, kKeepAliveDefaultTimeout, kHostHeader, kPendingIdx, kRunningIdx, kError: kError$2, kPipelining, kKeepAliveTimeoutValue, kMaxHeadersSize, kKeepAliveMaxTimeout, kKeepAliveTimeoutThreshold, kHeadersTimeout, kBodyTimeout, kStrictContentLength, kConnector, kMaxRedirections: kMaxRedirections$1, kMaxRequests, kCounter, kClose: kClose$6, kDestroy: kDestroy$4, kDispatch: kDispatch$3, kInterceptors: kInterceptors$4, kLocalAddress, kMaxResponseSize, kOnError, kHTTPContext, kMaxConcurrentStreams, kResume: kResume$1 } = require_symbols$4();
	var connectH1 = require_client_h1();
	var connectH2 = require_client_h2();
	var deprecatedInterceptorWarned = false;
	var kClosedResolve$1 = Symbol("kClosedResolve");
	var noop$2 = () => {};
	function getPipelining(client) {
		return client[kPipelining] ?? client[kHTTPContext]?.defaultPipelining ?? 1;
	}
	var Client$5 = class extends DispatcherBase$4 {
		constructor(url, { interceptors, maxHeaderSize, headersTimeout, socketTimeout, requestTimeout, connectTimeout, bodyTimeout, idleTimeout, keepAlive, keepAliveTimeout, maxKeepAliveTimeout, keepAliveMaxTimeout, keepAliveTimeoutThreshold, socketPath, pipelining, tls: tls$1, strictContentLength, maxCachedSessions, maxRedirections, connect: connect$2, maxRequestsPerClient, localAddress, maxResponseSize, autoSelectFamily, autoSelectFamilyAttemptTimeout, maxConcurrentStreams, allowH2 } = {}) {
			super();
			if (keepAlive !== void 0) throw new InvalidArgumentError$18("unsupported keepAlive, use pipelining=0 instead");
			if (socketTimeout !== void 0) throw new InvalidArgumentError$18("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
			if (requestTimeout !== void 0) throw new InvalidArgumentError$18("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
			if (idleTimeout !== void 0) throw new InvalidArgumentError$18("unsupported idleTimeout, use keepAliveTimeout instead");
			if (maxKeepAliveTimeout !== void 0) throw new InvalidArgumentError$18("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
			if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) throw new InvalidArgumentError$18("invalid maxHeaderSize");
			if (socketPath != null && typeof socketPath !== "string") throw new InvalidArgumentError$18("invalid socketPath");
			if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) throw new InvalidArgumentError$18("invalid connectTimeout");
			if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) throw new InvalidArgumentError$18("invalid keepAliveTimeout");
			if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) throw new InvalidArgumentError$18("invalid keepAliveMaxTimeout");
			if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) throw new InvalidArgumentError$18("invalid keepAliveTimeoutThreshold");
			if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) throw new InvalidArgumentError$18("headersTimeout must be a positive integer or zero");
			if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) throw new InvalidArgumentError$18("bodyTimeout must be a positive integer or zero");
			if (connect$2 != null && typeof connect$2 !== "function" && typeof connect$2 !== "object") throw new InvalidArgumentError$18("connect must be a function or an object");
			if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) throw new InvalidArgumentError$18("maxRedirections must be a positive number");
			if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) throw new InvalidArgumentError$18("maxRequestsPerClient must be a positive number");
			if (localAddress != null && (typeof localAddress !== "string" || net$1.isIP(localAddress) === 0)) throw new InvalidArgumentError$18("localAddress must be valid string IP address");
			if (maxResponseSize != null && (!Number.isInteger(maxResponseSize) || maxResponseSize < -1)) throw new InvalidArgumentError$18("maxResponseSize must be a positive number");
			if (autoSelectFamilyAttemptTimeout != null && (!Number.isInteger(autoSelectFamilyAttemptTimeout) || autoSelectFamilyAttemptTimeout < -1)) throw new InvalidArgumentError$18("autoSelectFamilyAttemptTimeout must be a positive number");
			if (allowH2 != null && typeof allowH2 !== "boolean") throw new InvalidArgumentError$18("allowH2 must be a valid boolean value");
			if (maxConcurrentStreams != null && (typeof maxConcurrentStreams !== "number" || maxConcurrentStreams < 1)) throw new InvalidArgumentError$18("maxConcurrentStreams must be a positive integer, greater than 0");
			if (typeof connect$2 !== "function") connect$2 = buildConnector$3({
				...tls$1,
				maxCachedSessions,
				allowH2,
				socketPath,
				timeout: connectTimeout,
				...autoSelectFamily ? {
					autoSelectFamily,
					autoSelectFamilyAttemptTimeout
				} : void 0,
				...connect$2
			});
			if (interceptors?.Client && Array.isArray(interceptors.Client)) {
				this[kInterceptors$4] = interceptors.Client;
				if (!deprecatedInterceptorWarned) {
					deprecatedInterceptorWarned = true;
					process.emitWarning("Client.Options#interceptor is deprecated. Use Dispatcher#compose instead.", { code: "UNDICI-CLIENT-INTERCEPTOR-DEPRECATED" });
				}
			} else this[kInterceptors$4] = [createRedirectInterceptor$2({ maxRedirections })];
			this[kUrl$3] = util$13.parseOrigin(url);
			this[kConnector] = connect$2;
			this[kPipelining] = pipelining != null ? pipelining : 1;
			this[kMaxHeadersSize] = maxHeaderSize || http.maxHeaderSize;
			this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
			this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 6e5 : keepAliveMaxTimeout;
			this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 2e3 : keepAliveTimeoutThreshold;
			this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
			this[kServerName] = null;
			this[kLocalAddress] = localAddress != null ? localAddress : null;
			this[kResuming] = 0;
			this[kNeedDrain$3] = 0;
			this[kHostHeader] = `host: ${this[kUrl$3].hostname}${this[kUrl$3].port ? `:${this[kUrl$3].port}` : ""}\r\n`;
			this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 3e5;
			this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 3e5;
			this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
			this[kMaxRedirections$1] = maxRedirections;
			this[kMaxRequests] = maxRequestsPerClient;
			this[kClosedResolve$1] = null;
			this[kMaxResponseSize] = maxResponseSize > -1 ? maxResponseSize : -1;
			this[kMaxConcurrentStreams] = maxConcurrentStreams != null ? maxConcurrentStreams : 100;
			this[kHTTPContext] = null;
			this[kQueue$1] = [];
			this[kRunningIdx] = 0;
			this[kPendingIdx] = 0;
			this[kResume$1] = (sync) => resume(this, sync);
			this[kOnError] = (err) => onError(this, err);
		}
		get pipelining() {
			return this[kPipelining];
		}
		set pipelining(value) {
			this[kPipelining] = value;
			this[kResume$1](true);
		}
		get [kPending$2]() {
			return this[kQueue$1].length - this[kPendingIdx];
		}
		get [kRunning$3]() {
			return this[kPendingIdx] - this[kRunningIdx];
		}
		get [kSize$4]() {
			return this[kQueue$1].length - this[kRunningIdx];
		}
		get [kConnected$5]() {
			return !!this[kHTTPContext] && !this[kConnecting] && !this[kHTTPContext].destroyed;
		}
		get [kBusy$1]() {
			return Boolean(this[kHTTPContext]?.busy(null) || this[kSize$4] >= (getPipelining(this) || 1) || this[kPending$2] > 0);
		}
		/* istanbul ignore: only used for test */
		[kConnect](cb) {
			connect$1(this);
			this.once("connect", cb);
		}
		[kDispatch$3](opts, handler) {
			const origin = opts.origin || this[kUrl$3].origin;
			const request$1 = new Request$3(origin, opts, handler);
			this[kQueue$1].push(request$1);
			if (this[kResuming]) {} else if (util$13.bodyLength(request$1.body) == null && util$13.isIterable(request$1.body)) {
				this[kResuming] = 1;
				queueMicrotask(() => resume(this));
			} else this[kResume$1](true);
			if (this[kResuming] && this[kNeedDrain$3] !== 2 && this[kBusy$1]) this[kNeedDrain$3] = 2;
			return this[kNeedDrain$3] < 2;
		}
		async [kClose$6]() {
			return new Promise((resolve) => {
				if (this[kSize$4]) this[kClosedResolve$1] = resolve;
				else resolve(null);
			});
		}
		async [kDestroy$4](err) {
			return new Promise((resolve) => {
				const requests = this[kQueue$1].splice(this[kPendingIdx]);
				for (let i = 0; i < requests.length; i++) {
					const request$1 = requests[i];
					util$13.errorRequest(this, request$1, err);
				}
				const callback = () => {
					if (this[kClosedResolve$1]) {
						this[kClosedResolve$1]();
						this[kClosedResolve$1] = null;
					}
					resolve(null);
				};
				if (this[kHTTPContext]) {
					this[kHTTPContext].destroy(err, callback);
					this[kHTTPContext] = null;
				} else queueMicrotask(callback);
				this[kResume$1]();
			});
		}
	};
	var createRedirectInterceptor$2 = require_redirect_interceptor();
	function onError(client, err) {
		if (client[kRunning$3] === 0 && err.code !== "UND_ERR_INFO" && err.code !== "UND_ERR_SOCKET") {
			assert$16(client[kPendingIdx] === client[kRunningIdx]);
			const requests = client[kQueue$1].splice(client[kRunningIdx]);
			for (let i = 0; i < requests.length; i++) {
				const request$1 = requests[i];
				util$13.errorRequest(client, request$1, err);
			}
			assert$16(client[kSize$4] === 0);
		}
	}
	async function connect$1(client) {
		assert$16(!client[kConnecting]);
		assert$16(!client[kHTTPContext]);
		let { host, hostname, protocol: protocol$1, port } = client[kUrl$3];
		if (hostname[0] === "[") {
			const idx = hostname.indexOf("]");
			assert$16(idx !== -1);
			const ip = hostname.substring(1, idx);
			assert$16(net$1.isIP(ip));
			hostname = ip;
		}
		client[kConnecting] = true;
		if (channels$2.beforeConnect.hasSubscribers) channels$2.beforeConnect.publish({
			connectParams: {
				host,
				hostname,
				protocol: protocol$1,
				port,
				version: client[kHTTPContext]?.version,
				servername: client[kServerName],
				localAddress: client[kLocalAddress]
			},
			connector: client[kConnector]
		});
		try {
			const socket = await new Promise((resolve, reject) => {
				client[kConnector]({
					host,
					hostname,
					protocol: protocol$1,
					port,
					servername: client[kServerName],
					localAddress: client[kLocalAddress]
				}, (err, socket$1) => {
					if (err) reject(err);
					else resolve(socket$1);
				});
			});
			if (client.destroyed) {
				util$13.destroy(socket.on("error", noop$2), new ClientDestroyedError());
				return;
			}
			assert$16(socket);
			try {
				client[kHTTPContext] = socket.alpnProtocol === "h2" ? await connectH2(client, socket) : await connectH1(client, socket);
			} catch (err) {
				socket.destroy().on("error", noop$2);
				throw err;
			}
			client[kConnecting] = false;
			socket[kCounter] = 0;
			socket[kMaxRequests] = client[kMaxRequests];
			socket[kClient$1] = client;
			socket[kError$2] = null;
			if (channels$2.connected.hasSubscribers) channels$2.connected.publish({
				connectParams: {
					host,
					hostname,
					protocol: protocol$1,
					port,
					version: client[kHTTPContext]?.version,
					servername: client[kServerName],
					localAddress: client[kLocalAddress]
				},
				connector: client[kConnector],
				socket
			});
			client.emit("connect", client[kUrl$3], [client]);
		} catch (err) {
			if (client.destroyed) return;
			client[kConnecting] = false;
			if (channels$2.connectError.hasSubscribers) channels$2.connectError.publish({
				connectParams: {
					host,
					hostname,
					protocol: protocol$1,
					port,
					version: client[kHTTPContext]?.version,
					servername: client[kServerName],
					localAddress: client[kLocalAddress]
				},
				connector: client[kConnector],
				error: err
			});
			if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
				assert$16(client[kRunning$3] === 0);
				while (client[kPending$2] > 0 && client[kQueue$1][client[kPendingIdx]].servername === client[kServerName]) {
					const request$1 = client[kQueue$1][client[kPendingIdx]++];
					util$13.errorRequest(client, request$1, err);
				}
			} else onError(client, err);
			client.emit("connectionError", client[kUrl$3], [client], err);
		}
		client[kResume$1]();
	}
	function emitDrain(client) {
		client[kNeedDrain$3] = 0;
		client.emit("drain", client[kUrl$3], [client]);
	}
	function resume(client, sync) {
		if (client[kResuming] === 2) return;
		client[kResuming] = 2;
		_resume(client, sync);
		client[kResuming] = 0;
		if (client[kRunningIdx] > 256) {
			client[kQueue$1].splice(0, client[kRunningIdx]);
			client[kPendingIdx] -= client[kRunningIdx];
			client[kRunningIdx] = 0;
		}
	}
	function _resume(client, sync) {
		while (true) {
			if (client.destroyed) {
				assert$16(client[kPending$2] === 0);
				return;
			}
			if (client[kClosedResolve$1] && !client[kSize$4]) {
				client[kClosedResolve$1]();
				client[kClosedResolve$1] = null;
				return;
			}
			if (client[kHTTPContext]) client[kHTTPContext].resume();
			if (client[kBusy$1]) client[kNeedDrain$3] = 2;
			else if (client[kNeedDrain$3] === 2) {
				if (sync) {
					client[kNeedDrain$3] = 1;
					queueMicrotask(() => emitDrain(client));
				} else emitDrain(client);
				continue;
			}
			if (client[kPending$2] === 0) return;
			if (client[kRunning$3] >= (getPipelining(client) || 1)) return;
			const request$1 = client[kQueue$1][client[kPendingIdx]];
			if (client[kUrl$3].protocol === "https:" && client[kServerName] !== request$1.servername) {
				if (client[kRunning$3] > 0) return;
				client[kServerName] = request$1.servername;
				client[kHTTPContext]?.destroy(new InformationalError$1("servername changed"), () => {
					client[kHTTPContext] = null;
					resume(client);
				});
			}
			if (client[kConnecting]) return;
			if (!client[kHTTPContext]) {
				connect$1(client);
				return;
			}
			if (client[kHTTPContext].destroyed) return;
			if (client[kHTTPContext].busy(request$1)) return;
			if (!request$1.aborted && client[kHTTPContext].write(request$1)) client[kPendingIdx]++;
			else client[kQueue$1].splice(client[kPendingIdx], 1);
		}
	}
	module.exports = Client$5;
}));
var require_fixed_queue = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var kSize$3 = 2048;
	var kMask = kSize$3 - 1;
	var FixedCircularBuffer = class {
		constructor() {
			this.bottom = 0;
			this.top = 0;
			this.list = new Array(kSize$3);
			this.next = null;
		}
		isEmpty() {
			return this.top === this.bottom;
		}
		isFull() {
			return (this.top + 1 & kMask) === this.bottom;
		}
		push(data) {
			this.list[this.top] = data;
			this.top = this.top + 1 & kMask;
		}
		shift() {
			const nextItem = this.list[this.bottom];
			if (nextItem === void 0) return null;
			this.list[this.bottom] = void 0;
			this.bottom = this.bottom + 1 & kMask;
			return nextItem;
		}
	};
	module.exports = class FixedQueue$2 {
		constructor() {
			this.head = this.tail = new FixedCircularBuffer();
		}
		isEmpty() {
			return this.head.isEmpty();
		}
		push(data) {
			if (this.head.isFull()) this.head = this.head.next = new FixedCircularBuffer();
			this.head.push(data);
		}
		shift() {
			const tail$1 = this.tail;
			const next = tail$1.shift();
			if (tail$1.isEmpty() && tail$1.next !== null) this.tail = tail$1.next;
			return next;
		}
	};
}));
var require_pool_stats = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kFree: kFree$1, kConnected: kConnected$4, kPending: kPending$1, kQueued: kQueued$1, kRunning: kRunning$2, kSize: kSize$2 } = require_symbols$4();
	var kPool = Symbol("pool");
	var PoolStats$1 = class {
		constructor(pool) {
			this[kPool] = pool;
		}
		get connected() {
			return this[kPool][kConnected$4];
		}
		get free() {
			return this[kPool][kFree$1];
		}
		get pending() {
			return this[kPool][kPending$1];
		}
		get queued() {
			return this[kPool][kQueued$1];
		}
		get running() {
			return this[kPool][kRunning$2];
		}
		get size() {
			return this[kPool][kSize$2];
		}
	};
	module.exports = PoolStats$1;
}));
var require_pool_base = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DispatcherBase$3 = require_dispatcher_base();
	var FixedQueue$1 = require_fixed_queue();
	var { kConnected: kConnected$3, kSize: kSize$1, kRunning: kRunning$1, kPending, kQueued, kBusy, kFree, kUrl: kUrl$2, kClose: kClose$5, kDestroy: kDestroy$3, kDispatch: kDispatch$2 } = require_symbols$4();
	var PoolStats = require_pool_stats();
	var kClients$4 = Symbol("clients");
	var kNeedDrain$2 = Symbol("needDrain");
	var kQueue = Symbol("queue");
	var kClosedResolve = Symbol("closed resolve");
	var kOnDrain$1 = Symbol("onDrain");
	var kOnConnect$1 = Symbol("onConnect");
	var kOnDisconnect$1 = Symbol("onDisconnect");
	var kOnConnectionError$1 = Symbol("onConnectionError");
	var kGetDispatcher$2 = Symbol("get dispatcher");
	var kAddClient$2 = Symbol("add client");
	var kRemoveClient$1 = Symbol("remove client");
	var kStats = Symbol("stats");
	var PoolBase$2 = class extends DispatcherBase$3 {
		constructor() {
			super();
			this[kQueue] = new FixedQueue$1();
			this[kClients$4] = [];
			this[kQueued] = 0;
			const pool = this;
			this[kOnDrain$1] = function onDrain(origin, targets) {
				const queue = pool[kQueue];
				let needDrain = false;
				while (!needDrain) {
					const item = queue.shift();
					if (!item) break;
					pool[kQueued]--;
					needDrain = !this.dispatch(item.opts, item.handler);
				}
				this[kNeedDrain$2] = needDrain;
				if (!this[kNeedDrain$2] && pool[kNeedDrain$2]) {
					pool[kNeedDrain$2] = false;
					pool.emit("drain", origin, [pool, ...targets]);
				}
				if (pool[kClosedResolve] && queue.isEmpty()) Promise.all(pool[kClients$4].map((c) => c.close())).then(pool[kClosedResolve]);
			};
			this[kOnConnect$1] = (origin, targets) => {
				pool.emit("connect", origin, [pool, ...targets]);
			};
			this[kOnDisconnect$1] = (origin, targets, err) => {
				pool.emit("disconnect", origin, [pool, ...targets], err);
			};
			this[kOnConnectionError$1] = (origin, targets, err) => {
				pool.emit("connectionError", origin, [pool, ...targets], err);
			};
			this[kStats] = new PoolStats(this);
		}
		get [kBusy]() {
			return this[kNeedDrain$2];
		}
		get [kConnected$3]() {
			return this[kClients$4].filter((client) => client[kConnected$3]).length;
		}
		get [kFree]() {
			return this[kClients$4].filter((client) => client[kConnected$3] && !client[kNeedDrain$2]).length;
		}
		get [kPending]() {
			let ret = this[kQueued];
			for (const { [kPending]: pending } of this[kClients$4]) ret += pending;
			return ret;
		}
		get [kRunning$1]() {
			let ret = 0;
			for (const { [kRunning$1]: running } of this[kClients$4]) ret += running;
			return ret;
		}
		get [kSize$1]() {
			let ret = this[kQueued];
			for (const { [kSize$1]: size } of this[kClients$4]) ret += size;
			return ret;
		}
		get stats() {
			return this[kStats];
		}
		async [kClose$5]() {
			if (this[kQueue].isEmpty()) await Promise.all(this[kClients$4].map((c) => c.close()));
			else await new Promise((resolve) => {
				this[kClosedResolve] = resolve;
			});
		}
		async [kDestroy$3](err) {
			while (true) {
				const item = this[kQueue].shift();
				if (!item) break;
				item.handler.onError(err);
			}
			await Promise.all(this[kClients$4].map((c) => c.destroy(err)));
		}
		[kDispatch$2](opts, handler) {
			const dispatcher = this[kGetDispatcher$2]();
			if (!dispatcher) {
				this[kNeedDrain$2] = true;
				this[kQueue].push({
					opts,
					handler
				});
				this[kQueued]++;
			} else if (!dispatcher.dispatch(opts, handler)) {
				dispatcher[kNeedDrain$2] = true;
				this[kNeedDrain$2] = !this[kGetDispatcher$2]();
			}
			return !this[kNeedDrain$2];
		}
		[kAddClient$2](client) {
			client.on("drain", this[kOnDrain$1]).on("connect", this[kOnConnect$1]).on("disconnect", this[kOnDisconnect$1]).on("connectionError", this[kOnConnectionError$1]);
			this[kClients$4].push(client);
			if (this[kNeedDrain$2]) queueMicrotask(() => {
				if (this[kNeedDrain$2]) this[kOnDrain$1](client[kUrl$2], [this, client]);
			});
			return this;
		}
		[kRemoveClient$1](client) {
			client.close(() => {
				const idx = this[kClients$4].indexOf(client);
				if (idx !== -1) this[kClients$4].splice(idx, 1);
			});
			this[kNeedDrain$2] = this[kClients$4].some((dispatcher) => !dispatcher[kNeedDrain$2] && dispatcher.closed !== true && dispatcher.destroyed !== true);
		}
	};
	module.exports = {
		PoolBase: PoolBase$2,
		kClients: kClients$4,
		kNeedDrain: kNeedDrain$2,
		kAddClient: kAddClient$2,
		kRemoveClient: kRemoveClient$1,
		kGetDispatcher: kGetDispatcher$2
	};
}));
var require_pool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { PoolBase: PoolBase$1, kClients: kClients$3, kNeedDrain: kNeedDrain$1, kAddClient: kAddClient$1, kGetDispatcher: kGetDispatcher$1 } = require_pool_base();
	var Client$4 = require_client();
	var { InvalidArgumentError: InvalidArgumentError$17 } = require_errors();
	var util$12 = require_util$7();
	var { kUrl: kUrl$1, kInterceptors: kInterceptors$3 } = require_symbols$4();
	var buildConnector$2 = require_connect();
	var kOptions$3 = Symbol("options");
	var kConnections = Symbol("connections");
	var kFactory$3 = Symbol("factory");
	function defaultFactory$3(origin, opts) {
		return new Client$4(origin, opts);
	}
	var Pool$5 = class extends PoolBase$1 {
		constructor(origin, { connections, factory = defaultFactory$3, connect: connect$2, connectTimeout, tls: tls$1, maxCachedSessions, socketPath, autoSelectFamily, autoSelectFamilyAttemptTimeout, allowH2,...options } = {}) {
			super();
			if (connections != null && (!Number.isFinite(connections) || connections < 0)) throw new InvalidArgumentError$17("invalid connections");
			if (typeof factory !== "function") throw new InvalidArgumentError$17("factory must be a function.");
			if (connect$2 != null && typeof connect$2 !== "function" && typeof connect$2 !== "object") throw new InvalidArgumentError$17("connect must be a function or an object");
			if (typeof connect$2 !== "function") connect$2 = buildConnector$2({
				...tls$1,
				maxCachedSessions,
				allowH2,
				socketPath,
				timeout: connectTimeout,
				...autoSelectFamily ? {
					autoSelectFamily,
					autoSelectFamilyAttemptTimeout
				} : void 0,
				...connect$2
			});
			this[kInterceptors$3] = options.interceptors?.Pool && Array.isArray(options.interceptors.Pool) ? options.interceptors.Pool : [];
			this[kConnections] = connections || null;
			this[kUrl$1] = util$12.parseOrigin(origin);
			this[kOptions$3] = {
				...util$12.deepClone(options),
				connect: connect$2,
				allowH2
			};
			this[kOptions$3].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
			this[kFactory$3] = factory;
			this.on("connectionError", (origin$1, targets, error) => {
				for (const target of targets) {
					const idx = this[kClients$3].indexOf(target);
					if (idx !== -1) this[kClients$3].splice(idx, 1);
				}
			});
		}
		[kGetDispatcher$1]() {
			for (const client of this[kClients$3]) if (!client[kNeedDrain$1]) return client;
			if (!this[kConnections] || this[kClients$3].length < this[kConnections]) {
				const dispatcher = this[kFactory$3](this[kUrl$1], this[kOptions$3]);
				this[kAddClient$1](dispatcher);
				return dispatcher;
			}
		}
	};
	module.exports = Pool$5;
}));
var require_balanced_pool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { BalancedPoolMissingUpstreamError, InvalidArgumentError: InvalidArgumentError$16 } = require_errors();
	var { PoolBase, kClients: kClients$2, kNeedDrain, kAddClient, kRemoveClient, kGetDispatcher } = require_pool_base();
	var Pool$4 = require_pool();
	var { kUrl, kInterceptors: kInterceptors$2 } = require_symbols$4();
	var { parseOrigin } = require_util$7();
	var kFactory$2 = Symbol("factory");
	var kOptions$2 = Symbol("options");
	var kGreatestCommonDivisor = Symbol("kGreatestCommonDivisor");
	var kCurrentWeight = Symbol("kCurrentWeight");
	var kIndex = Symbol("kIndex");
	var kWeight = Symbol("kWeight");
	var kMaxWeightPerServer = Symbol("kMaxWeightPerServer");
	var kErrorPenalty = Symbol("kErrorPenalty");
	function getGreatestCommonDivisor(a, b) {
		if (a === 0) return b;
		while (b !== 0) {
			const t$1 = b;
			b = a % b;
			a = t$1;
		}
		return a;
	}
	function defaultFactory$2(origin, opts) {
		return new Pool$4(origin, opts);
	}
	var BalancedPool$1 = class extends PoolBase {
		constructor(upstreams = [], { factory = defaultFactory$2,...opts } = {}) {
			super();
			this[kOptions$2] = opts;
			this[kIndex] = -1;
			this[kCurrentWeight] = 0;
			this[kMaxWeightPerServer] = this[kOptions$2].maxWeightPerServer || 100;
			this[kErrorPenalty] = this[kOptions$2].errorPenalty || 15;
			if (!Array.isArray(upstreams)) upstreams = [upstreams];
			if (typeof factory !== "function") throw new InvalidArgumentError$16("factory must be a function.");
			this[kInterceptors$2] = opts.interceptors?.BalancedPool && Array.isArray(opts.interceptors.BalancedPool) ? opts.interceptors.BalancedPool : [];
			this[kFactory$2] = factory;
			for (const upstream of upstreams) this.addUpstream(upstream);
			this._updateBalancedPoolStats();
		}
		addUpstream(upstream) {
			const upstreamOrigin = parseOrigin(upstream).origin;
			if (this[kClients$2].find((pool$1) => pool$1[kUrl].origin === upstreamOrigin && pool$1.closed !== true && pool$1.destroyed !== true)) return this;
			const pool = this[kFactory$2](upstreamOrigin, Object.assign({}, this[kOptions$2]));
			this[kAddClient](pool);
			pool.on("connect", () => {
				pool[kWeight] = Math.min(this[kMaxWeightPerServer], pool[kWeight] + this[kErrorPenalty]);
			});
			pool.on("connectionError", () => {
				pool[kWeight] = Math.max(1, pool[kWeight] - this[kErrorPenalty]);
				this._updateBalancedPoolStats();
			});
			pool.on("disconnect", (...args) => {
				const err = args[2];
				if (err && err.code === "UND_ERR_SOCKET") {
					pool[kWeight] = Math.max(1, pool[kWeight] - this[kErrorPenalty]);
					this._updateBalancedPoolStats();
				}
			});
			for (const client of this[kClients$2]) client[kWeight] = this[kMaxWeightPerServer];
			this._updateBalancedPoolStats();
			return this;
		}
		_updateBalancedPoolStats() {
			let result = 0;
			for (let i = 0; i < this[kClients$2].length; i++) result = getGreatestCommonDivisor(this[kClients$2][i][kWeight], result);
			this[kGreatestCommonDivisor] = result;
		}
		removeUpstream(upstream) {
			const upstreamOrigin = parseOrigin(upstream).origin;
			const pool = this[kClients$2].find((pool$1) => pool$1[kUrl].origin === upstreamOrigin && pool$1.closed !== true && pool$1.destroyed !== true);
			if (pool) this[kRemoveClient](pool);
			return this;
		}
		get upstreams() {
			return this[kClients$2].filter((dispatcher) => dispatcher.closed !== true && dispatcher.destroyed !== true).map((p) => p[kUrl].origin);
		}
		[kGetDispatcher]() {
			if (this[kClients$2].length === 0) throw new BalancedPoolMissingUpstreamError();
			if (!this[kClients$2].find((dispatcher) => !dispatcher[kNeedDrain] && dispatcher.closed !== true && dispatcher.destroyed !== true)) return;
			if (this[kClients$2].map((pool) => pool[kNeedDrain]).reduce((a, b) => a && b, true)) return;
			let counter = 0;
			let maxWeightIndex = this[kClients$2].findIndex((pool) => !pool[kNeedDrain]);
			while (counter++ < this[kClients$2].length) {
				this[kIndex] = (this[kIndex] + 1) % this[kClients$2].length;
				const pool = this[kClients$2][this[kIndex]];
				if (pool[kWeight] > this[kClients$2][maxWeightIndex][kWeight] && !pool[kNeedDrain]) maxWeightIndex = this[kIndex];
				if (this[kIndex] === 0) {
					this[kCurrentWeight] = this[kCurrentWeight] - this[kGreatestCommonDivisor];
					if (this[kCurrentWeight] <= 0) this[kCurrentWeight] = this[kMaxWeightPerServer];
				}
				if (pool[kWeight] >= this[kCurrentWeight] && !pool[kNeedDrain]) return pool;
			}
			this[kCurrentWeight] = this[kClients$2][maxWeightIndex][kWeight];
			this[kIndex] = maxWeightIndex;
			return this[kClients$2][maxWeightIndex];
		}
	};
	module.exports = BalancedPool$1;
}));
var require_agent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { InvalidArgumentError: InvalidArgumentError$15 } = require_errors();
	var { kClients: kClients$1, kRunning, kClose: kClose$4, kDestroy: kDestroy$2, kDispatch: kDispatch$1, kInterceptors: kInterceptors$1 } = require_symbols$4();
	var DispatcherBase$2 = require_dispatcher_base();
	var Pool$3 = require_pool();
	var Client$3 = require_client();
	var util$11 = require_util$7();
	var createRedirectInterceptor$1 = require_redirect_interceptor();
	var kOnConnect = Symbol("onConnect");
	var kOnDisconnect = Symbol("onDisconnect");
	var kOnConnectionError = Symbol("onConnectionError");
	var kMaxRedirections = Symbol("maxRedirections");
	var kOnDrain = Symbol("onDrain");
	var kFactory$1 = Symbol("factory");
	var kOptions$1 = Symbol("options");
	function defaultFactory$1(origin, opts) {
		return opts && opts.connections === 1 ? new Client$3(origin, opts) : new Pool$3(origin, opts);
	}
	var Agent$5 = class extends DispatcherBase$2 {
		constructor({ factory = defaultFactory$1, maxRedirections = 0, connect: connect$2,...options } = {}) {
			super();
			if (typeof factory !== "function") throw new InvalidArgumentError$15("factory must be a function.");
			if (connect$2 != null && typeof connect$2 !== "function" && typeof connect$2 !== "object") throw new InvalidArgumentError$15("connect must be a function or an object");
			if (!Number.isInteger(maxRedirections) || maxRedirections < 0) throw new InvalidArgumentError$15("maxRedirections must be a positive number");
			if (connect$2 && typeof connect$2 !== "function") connect$2 = { ...connect$2 };
			this[kInterceptors$1] = options.interceptors?.Agent && Array.isArray(options.interceptors.Agent) ? options.interceptors.Agent : [createRedirectInterceptor$1({ maxRedirections })];
			this[kOptions$1] = {
				...util$11.deepClone(options),
				connect: connect$2
			};
			this[kOptions$1].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
			this[kMaxRedirections] = maxRedirections;
			this[kFactory$1] = factory;
			this[kClients$1] = /* @__PURE__ */ new Map();
			this[kOnDrain] = (origin, targets) => {
				this.emit("drain", origin, [this, ...targets]);
			};
			this[kOnConnect] = (origin, targets) => {
				this.emit("connect", origin, [this, ...targets]);
			};
			this[kOnDisconnect] = (origin, targets, err) => {
				this.emit("disconnect", origin, [this, ...targets], err);
			};
			this[kOnConnectionError] = (origin, targets, err) => {
				this.emit("connectionError", origin, [this, ...targets], err);
			};
		}
		get [kRunning]() {
			let ret = 0;
			for (const client of this[kClients$1].values()) ret += client[kRunning];
			return ret;
		}
		[kDispatch$1](opts, handler) {
			let key;
			if (opts.origin && (typeof opts.origin === "string" || opts.origin instanceof URL)) key = String(opts.origin);
			else throw new InvalidArgumentError$15("opts.origin must be a non-empty string or URL.");
			let dispatcher = this[kClients$1].get(key);
			if (!dispatcher) {
				dispatcher = this[kFactory$1](opts.origin, this[kOptions$1]).on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
				this[kClients$1].set(key, dispatcher);
			}
			return dispatcher.dispatch(opts, handler);
		}
		async [kClose$4]() {
			const closePromises = [];
			for (const client of this[kClients$1].values()) closePromises.push(client.close());
			this[kClients$1].clear();
			await Promise.all(closePromises);
		}
		async [kDestroy$2](err) {
			const destroyPromises = [];
			for (const client of this[kClients$1].values()) destroyPromises.push(client.destroy(err));
			this[kClients$1].clear();
			await Promise.all(destroyPromises);
		}
	};
	module.exports = Agent$5;
}));
var require_proxy_agent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kProxy, kClose: kClose$3, kDestroy: kDestroy$1, kInterceptors } = require_symbols$4();
	var { URL: URL$1 } = __require("node:url");
	var Agent$4 = require_agent();
	var Pool$2 = require_pool();
	var DispatcherBase$1 = require_dispatcher_base();
	var { InvalidArgumentError: InvalidArgumentError$14, RequestAbortedError: RequestAbortedError$5, SecureProxyConnectionError } = require_errors();
	var buildConnector$1 = require_connect();
	var kAgent$1 = Symbol("proxy agent");
	var kClient = Symbol("proxy client");
	var kProxyHeaders = Symbol("proxy headers");
	var kRequestTls = Symbol("request tls settings");
	var kProxyTls = Symbol("proxy tls settings");
	var kConnectEndpoint = Symbol("connect endpoint function");
	function defaultProtocolPort(protocol$1) {
		return protocol$1 === "https:" ? 443 : 80;
	}
	function defaultFactory(origin, opts) {
		return new Pool$2(origin, opts);
	}
	var noop$1 = () => {};
	var ProxyAgent$2 = class extends DispatcherBase$1 {
		constructor(opts) {
			super();
			if (!opts || typeof opts === "object" && !(opts instanceof URL$1) && !opts.uri) throw new InvalidArgumentError$14("Proxy uri is mandatory");
			const { clientFactory = defaultFactory } = opts;
			if (typeof clientFactory !== "function") throw new InvalidArgumentError$14("Proxy opts.clientFactory must be a function.");
			const url = this.#getUrl(opts);
			const { href, origin, port, protocol: protocol$1, username, password, hostname: proxyHostname } = url;
			this[kProxy] = {
				uri: href,
				protocol: protocol$1
			};
			this[kInterceptors] = opts.interceptors?.ProxyAgent && Array.isArray(opts.interceptors.ProxyAgent) ? opts.interceptors.ProxyAgent : [];
			this[kRequestTls] = opts.requestTls;
			this[kProxyTls] = opts.proxyTls;
			this[kProxyHeaders] = opts.headers || {};
			if (opts.auth && opts.token) throw new InvalidArgumentError$14("opts.auth cannot be used in combination with opts.token");
			else if (opts.auth) this[kProxyHeaders]["proxy-authorization"] = `Basic ${opts.auth}`;
			else if (opts.token) this[kProxyHeaders]["proxy-authorization"] = opts.token;
			else if (username && password) this[kProxyHeaders]["proxy-authorization"] = `Basic ${Buffer.from(`${decodeURIComponent(username)}:${decodeURIComponent(password)}`).toString("base64")}`;
			const connect$2 = buildConnector$1({ ...opts.proxyTls });
			this[kConnectEndpoint] = buildConnector$1({ ...opts.requestTls });
			this[kClient] = clientFactory(url, { connect: connect$2 });
			this[kAgent$1] = new Agent$4({
				...opts,
				connect: async (opts$1, callback) => {
					let requestedPath = opts$1.host;
					if (!opts$1.port) requestedPath += `:${defaultProtocolPort(opts$1.protocol)}`;
					try {
						const { socket, statusCode } = await this[kClient].connect({
							origin,
							port,
							path: requestedPath,
							signal: opts$1.signal,
							headers: {
								...this[kProxyHeaders],
								host: opts$1.host
							},
							servername: this[kProxyTls]?.servername || proxyHostname
						});
						if (statusCode !== 200) {
							socket.on("error", noop$1).destroy();
							callback(new RequestAbortedError$5(`Proxy response (${statusCode}) !== 200 when HTTP Tunneling`));
						}
						if (opts$1.protocol !== "https:") {
							callback(null, socket);
							return;
						}
						let servername;
						if (this[kRequestTls]) servername = this[kRequestTls].servername;
						else servername = opts$1.servername;
						this[kConnectEndpoint]({
							...opts$1,
							servername,
							httpSocket: socket
						}, callback);
					} catch (err) {
						if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") callback(new SecureProxyConnectionError(err));
						else callback(err);
					}
				}
			});
		}
		dispatch(opts, handler) {
			const headers = buildHeaders(opts.headers);
			throwIfProxyAuthIsSent(headers);
			if (headers && !("host" in headers) && !("Host" in headers)) {
				const { host } = new URL$1(opts.origin);
				headers.host = host;
			}
			return this[kAgent$1].dispatch({
				...opts,
				headers
			}, handler);
		}
		#getUrl(opts) {
			if (typeof opts === "string") return new URL$1(opts);
			else if (opts instanceof URL$1) return opts;
			else return new URL$1(opts.uri);
		}
		async [kClose$3]() {
			await this[kAgent$1].close();
			await this[kClient].close();
		}
		async [kDestroy$1]() {
			await this[kAgent$1].destroy();
			await this[kClient].destroy();
		}
	};
	function buildHeaders(headers) {
		if (Array.isArray(headers)) {
			const headersPair = {};
			for (let i = 0; i < headers.length; i += 2) headersPair[headers[i]] = headers[i + 1];
			return headersPair;
		}
		return headers;
	}
	function throwIfProxyAuthIsSent(headers) {
		if (headers && Object.keys(headers).find((key) => key.toLowerCase() === "proxy-authorization")) throw new InvalidArgumentError$14("Proxy-Authorization should be sent in ProxyAgent constructor");
	}
	module.exports = ProxyAgent$2;
}));
var require_env_http_proxy_agent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DispatcherBase = require_dispatcher_base();
	var { kClose: kClose$2, kDestroy, kClosed, kDestroyed, kDispatch, kNoProxyAgent, kHttpProxyAgent, kHttpsProxyAgent } = require_symbols$4();
	var ProxyAgent$1 = require_proxy_agent();
	var Agent$3 = require_agent();
	var DEFAULT_PORTS = {
		"http:": 80,
		"https:": 443
	};
	var experimentalWarned$1 = false;
	var EnvHttpProxyAgent$1 = class extends DispatcherBase {
		#noProxyValue = null;
		#noProxyEntries = null;
		#opts = null;
		constructor(opts = {}) {
			super();
			this.#opts = opts;
			if (!experimentalWarned$1) {
				experimentalWarned$1 = true;
				process.emitWarning("EnvHttpProxyAgent is experimental, expect them to change at any time.", { code: "UNDICI-EHPA" });
			}
			const { httpProxy, httpsProxy, noProxy,...agentOpts } = opts;
			this[kNoProxyAgent] = new Agent$3(agentOpts);
			const HTTP_PROXY = httpProxy ?? process.env.http_proxy ?? process.env.HTTP_PROXY;
			if (HTTP_PROXY) this[kHttpProxyAgent] = new ProxyAgent$1({
				...agentOpts,
				uri: HTTP_PROXY
			});
			else this[kHttpProxyAgent] = this[kNoProxyAgent];
			const HTTPS_PROXY = httpsProxy ?? process.env.https_proxy ?? process.env.HTTPS_PROXY;
			if (HTTPS_PROXY) this[kHttpsProxyAgent] = new ProxyAgent$1({
				...agentOpts,
				uri: HTTPS_PROXY
			});
			else this[kHttpsProxyAgent] = this[kHttpProxyAgent];
			this.#parseNoProxy();
		}
		[kDispatch](opts, handler) {
			const url = new URL(opts.origin);
			return this.#getProxyAgentForUrl(url).dispatch(opts, handler);
		}
		async [kClose$2]() {
			await this[kNoProxyAgent].close();
			if (!this[kHttpProxyAgent][kClosed]) await this[kHttpProxyAgent].close();
			if (!this[kHttpsProxyAgent][kClosed]) await this[kHttpsProxyAgent].close();
		}
		async [kDestroy](err) {
			await this[kNoProxyAgent].destroy(err);
			if (!this[kHttpProxyAgent][kDestroyed]) await this[kHttpProxyAgent].destroy(err);
			if (!this[kHttpsProxyAgent][kDestroyed]) await this[kHttpsProxyAgent].destroy(err);
		}
		#getProxyAgentForUrl(url) {
			let { protocol: protocol$1, host: hostname, port } = url;
			hostname = hostname.replace(/:\d*$/, "").toLowerCase();
			port = Number.parseInt(port, 10) || DEFAULT_PORTS[protocol$1] || 0;
			if (!this.#shouldProxy(hostname, port)) return this[kNoProxyAgent];
			if (protocol$1 === "https:") return this[kHttpsProxyAgent];
			return this[kHttpProxyAgent];
		}
		#shouldProxy(hostname, port) {
			if (this.#noProxyChanged) this.#parseNoProxy();
			if (this.#noProxyEntries.length === 0) return true;
			if (this.#noProxyValue === "*") return false;
			for (let i = 0; i < this.#noProxyEntries.length; i++) {
				const entry = this.#noProxyEntries[i];
				if (entry.port && entry.port !== port) continue;
				if (!/^[.*]/.test(entry.hostname)) {
					if (hostname === entry.hostname) return false;
				} else if (hostname.endsWith(entry.hostname.replace(/^\*/, ""))) return false;
			}
			return true;
		}
		#parseNoProxy() {
			const noProxyValue = this.#opts.noProxy ?? this.#noProxyEnv;
			const noProxySplit = noProxyValue.split(/[,\s]/);
			const noProxyEntries = [];
			for (let i = 0; i < noProxySplit.length; i++) {
				const entry = noProxySplit[i];
				if (!entry) continue;
				const parsed = entry.match(/^(.+):(\d+)$/);
				noProxyEntries.push({
					hostname: (parsed ? parsed[1] : entry).toLowerCase(),
					port: parsed ? Number.parseInt(parsed[2], 10) : 0
				});
			}
			this.#noProxyValue = noProxyValue;
			this.#noProxyEntries = noProxyEntries;
		}
		get #noProxyChanged() {
			if (this.#opts.noProxy !== void 0) return false;
			return this.#noProxyValue !== this.#noProxyEnv;
		}
		get #noProxyEnv() {
			return process.env.no_proxy ?? process.env.NO_PROXY ?? "";
		}
	};
	module.exports = EnvHttpProxyAgent$1;
}));
var require_retry_handler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$15 = __require("node:assert");
	var { kRetryHandlerDefaultRetry } = require_symbols$4();
	var { RequestRetryError } = require_errors();
	var { isDisturbed: isDisturbed$1, parseHeaders, parseRangeHeader, wrapRequestBody } = require_util$7();
	function calculateRetryAfterHeader(retryAfter) {
		const current = Date.now();
		return new Date(retryAfter).getTime() - current;
	}
	module.exports = class RetryHandler$3 {
		constructor(opts, handlers) {
			const { retryOptions,...dispatchOpts } = opts;
			const { retry: retryFn, maxRetries, maxTimeout, minTimeout, timeoutFactor, methods, errorCodes, retryAfter, statusCodes } = retryOptions ?? {};
			this.dispatch = handlers.dispatch;
			this.handler = handlers.handler;
			this.opts = {
				...dispatchOpts,
				body: wrapRequestBody(opts.body)
			};
			this.abort = null;
			this.aborted = false;
			this.retryOpts = {
				retry: retryFn ?? RetryHandler$3[kRetryHandlerDefaultRetry],
				retryAfter: retryAfter ?? true,
				maxTimeout: maxTimeout ?? 30 * 1e3,
				minTimeout: minTimeout ?? 500,
				timeoutFactor: timeoutFactor ?? 2,
				maxRetries: maxRetries ?? 5,
				methods: methods ?? [
					"GET",
					"HEAD",
					"OPTIONS",
					"PUT",
					"DELETE",
					"TRACE"
				],
				statusCodes: statusCodes ?? [
					500,
					502,
					503,
					504,
					429
				],
				errorCodes: errorCodes ?? [
					"ECONNRESET",
					"ECONNREFUSED",
					"ENOTFOUND",
					"ENETDOWN",
					"ENETUNREACH",
					"EHOSTDOWN",
					"EHOSTUNREACH",
					"EPIPE",
					"UND_ERR_SOCKET"
				]
			};
			this.retryCount = 0;
			this.retryCountCheckpoint = 0;
			this.start = 0;
			this.end = null;
			this.etag = null;
			this.resume = null;
			this.handler.onConnect((reason) => {
				this.aborted = true;
				if (this.abort) this.abort(reason);
				else this.reason = reason;
			});
		}
		onRequestSent() {
			if (this.handler.onRequestSent) this.handler.onRequestSent();
		}
		onUpgrade(statusCode, headers, socket) {
			if (this.handler.onUpgrade) this.handler.onUpgrade(statusCode, headers, socket);
		}
		onConnect(abort$1) {
			if (this.aborted) abort$1(this.reason);
			else this.abort = abort$1;
		}
		onBodySent(chunk) {
			if (this.handler.onBodySent) return this.handler.onBodySent(chunk);
		}
		static [kRetryHandlerDefaultRetry](err, { state, opts }, cb) {
			const { statusCode, code, headers } = err;
			const { method, retryOptions } = opts;
			const { maxRetries, minTimeout, maxTimeout, timeoutFactor, statusCodes, errorCodes, methods } = retryOptions;
			const { counter } = state;
			if (code && code !== "UND_ERR_REQ_RETRY" && !errorCodes.includes(code)) {
				cb(err);
				return;
			}
			if (Array.isArray(methods) && !methods.includes(method)) {
				cb(err);
				return;
			}
			if (statusCode != null && Array.isArray(statusCodes) && !statusCodes.includes(statusCode)) {
				cb(err);
				return;
			}
			if (counter > maxRetries) {
				cb(err);
				return;
			}
			let retryAfterHeader = headers?.["retry-after"];
			if (retryAfterHeader) {
				retryAfterHeader = Number(retryAfterHeader);
				retryAfterHeader = Number.isNaN(retryAfterHeader) ? calculateRetryAfterHeader(retryAfterHeader) : retryAfterHeader * 1e3;
			}
			const retryTimeout = retryAfterHeader > 0 ? Math.min(retryAfterHeader, maxTimeout) : Math.min(minTimeout * timeoutFactor ** (counter - 1), maxTimeout);
			setTimeout(() => cb(null), retryTimeout);
		}
		onHeaders(statusCode, rawHeaders, resume$1, statusMessage) {
			const headers = parseHeaders(rawHeaders);
			this.retryCount += 1;
			if (statusCode >= 300) if (this.retryOpts.statusCodes.includes(statusCode) === false) return this.handler.onHeaders(statusCode, rawHeaders, resume$1, statusMessage);
			else {
				this.abort(new RequestRetryError("Request failed", statusCode, {
					headers,
					data: { count: this.retryCount }
				}));
				return false;
			}
			if (this.resume != null) {
				this.resume = null;
				if (statusCode !== 206 && (this.start > 0 || statusCode !== 200)) {
					this.abort(new RequestRetryError("server does not support the range header and the payload was partially consumed", statusCode, {
						headers,
						data: { count: this.retryCount }
					}));
					return false;
				}
				const contentRange = parseRangeHeader(headers["content-range"]);
				if (!contentRange) {
					this.abort(new RequestRetryError("Content-Range mismatch", statusCode, {
						headers,
						data: { count: this.retryCount }
					}));
					return false;
				}
				if (this.etag != null && this.etag !== headers.etag) {
					this.abort(new RequestRetryError("ETag mismatch", statusCode, {
						headers,
						data: { count: this.retryCount }
					}));
					return false;
				}
				const { start, size, end = size - 1 } = contentRange;
				assert$15(this.start === start, "content-range mismatch");
				assert$15(this.end == null || this.end === end, "content-range mismatch");
				this.resume = resume$1;
				return true;
			}
			if (this.end == null) {
				if (statusCode === 206) {
					const range$1 = parseRangeHeader(headers["content-range"]);
					if (range$1 == null) return this.handler.onHeaders(statusCode, rawHeaders, resume$1, statusMessage);
					const { start, size, end = size - 1 } = range$1;
					assert$15(start != null && Number.isFinite(start), "content-range mismatch");
					assert$15(end != null && Number.isFinite(end), "invalid content-length");
					this.start = start;
					this.end = end;
				}
				if (this.end == null) {
					const contentLength = headers["content-length"];
					this.end = contentLength != null ? Number(contentLength) - 1 : null;
				}
				assert$15(Number.isFinite(this.start));
				assert$15(this.end == null || Number.isFinite(this.end), "invalid content-length");
				this.resume = resume$1;
				this.etag = headers.etag != null ? headers.etag : null;
				if (this.etag != null && this.etag.startsWith("W/")) this.etag = null;
				return this.handler.onHeaders(statusCode, rawHeaders, resume$1, statusMessage);
			}
			const err = new RequestRetryError("Request failed", statusCode, {
				headers,
				data: { count: this.retryCount }
			});
			this.abort(err);
			return false;
		}
		onData(chunk) {
			this.start += chunk.length;
			return this.handler.onData(chunk);
		}
		onComplete(rawTrailers) {
			this.retryCount = 0;
			return this.handler.onComplete(rawTrailers);
		}
		onError(err) {
			if (this.aborted || isDisturbed$1(this.opts.body)) return this.handler.onError(err);
			if (this.retryCount - this.retryCountCheckpoint > 0) this.retryCount = this.retryCountCheckpoint + (this.retryCount - this.retryCountCheckpoint);
			else this.retryCount += 1;
			this.retryOpts.retry(err, {
				state: { counter: this.retryCount },
				opts: {
					retryOptions: this.retryOpts,
					...this.opts
				}
			}, onRetry.bind(this));
			function onRetry(err$1) {
				if (err$1 != null || this.aborted || isDisturbed$1(this.opts.body)) return this.handler.onError(err$1);
				if (this.start !== 0) {
					const headers = { range: `bytes=${this.start}-${this.end ?? ""}` };
					if (this.etag != null) headers["if-match"] = this.etag;
					this.opts = {
						...this.opts,
						headers: {
							...this.opts.headers,
							...headers
						}
					};
				}
				try {
					this.retryCountCheckpoint = this.retryCount;
					this.dispatch(this.opts, this);
				} catch (err$2) {
					this.handler.onError(err$2);
				}
			}
		}
	};
}));
var require_retry_agent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Dispatcher$2 = require_dispatcher();
	var RetryHandler$2 = require_retry_handler();
	var RetryAgent$1 = class extends Dispatcher$2 {
		#agent = null;
		#options = null;
		constructor(agent, options = {}) {
			super(options);
			this.#agent = agent;
			this.#options = options;
		}
		dispatch(opts, handler) {
			const retry = new RetryHandler$2({
				...opts,
				retryOptions: this.#options
			}, {
				dispatch: this.#agent.dispatch.bind(this.#agent),
				handler
			});
			return this.#agent.dispatch(opts, retry);
		}
		close() {
			return this.#agent.close();
		}
		destroy() {
			return this.#agent.destroy();
		}
	};
	module.exports = RetryAgent$1;
}));
var require_readable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$14 = __require("node:assert");
	var { Readable: Readable$3 } = __require("node:stream");
	var { RequestAbortedError: RequestAbortedError$4, NotSupportedError, InvalidArgumentError: InvalidArgumentError$13, AbortError } = require_errors();
	var util$10 = require_util$7();
	var { ReadableStreamFrom } = require_util$7();
	var kConsume = Symbol("kConsume");
	var kReading = Symbol("kReading");
	var kBody = Symbol("kBody");
	var kAbort = Symbol("kAbort");
	var kContentType = Symbol("kContentType");
	var kContentLength$1 = Symbol("kContentLength");
	var noop = () => {};
	var BodyReadable = class extends Readable$3 {
		constructor({ resume: resume$1, abort: abort$1, contentType = "", contentLength, highWaterMark = 64 * 1024 }) {
			super({
				autoDestroy: true,
				read: resume$1,
				highWaterMark
			});
			this._readableState.dataEmitted = false;
			this[kAbort] = abort$1;
			this[kConsume] = null;
			this[kBody] = null;
			this[kContentType] = contentType;
			this[kContentLength$1] = contentLength;
			this[kReading] = false;
		}
		destroy(err) {
			if (!err && !this._readableState.endEmitted) err = new RequestAbortedError$4();
			if (err) this[kAbort]();
			return super.destroy(err);
		}
		_destroy(err, callback) {
			if (!this[kReading]) setImmediate(() => {
				callback(err);
			});
			else callback(err);
		}
		on(ev, ...args) {
			if (ev === "data" || ev === "readable") this[kReading] = true;
			return super.on(ev, ...args);
		}
		addListener(ev, ...args) {
			return this.on(ev, ...args);
		}
		off(ev, ...args) {
			const ret = super.off(ev, ...args);
			if (ev === "data" || ev === "readable") this[kReading] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
			return ret;
		}
		removeListener(ev, ...args) {
			return this.off(ev, ...args);
		}
		push(chunk) {
			if (this[kConsume] && chunk !== null) {
				consumePush(this[kConsume], chunk);
				return this[kReading] ? super.push(chunk) : true;
			}
			return super.push(chunk);
		}
		async text() {
			return consume(this, "text");
		}
		async json() {
			return consume(this, "json");
		}
		async blob() {
			return consume(this, "blob");
		}
		async bytes() {
			return consume(this, "bytes");
		}
		async arrayBuffer() {
			return consume(this, "arrayBuffer");
		}
		async formData() {
			throw new NotSupportedError();
		}
		get bodyUsed() {
			return util$10.isDisturbed(this);
		}
		get body() {
			if (!this[kBody]) {
				this[kBody] = ReadableStreamFrom(this);
				if (this[kConsume]) {
					this[kBody].getReader();
					assert$14(this[kBody].locked);
				}
			}
			return this[kBody];
		}
		async dump(opts) {
			let limit = Number.isFinite(opts?.limit) ? opts.limit : 128 * 1024;
			const signal = opts?.signal;
			if (signal != null && (typeof signal !== "object" || !("aborted" in signal))) throw new InvalidArgumentError$13("signal must be an AbortSignal");
			signal?.throwIfAborted();
			if (this._readableState.closeEmitted) return null;
			return await new Promise((resolve, reject) => {
				if (this[kContentLength$1] > limit) this.destroy(new AbortError());
				const onAbort = () => {
					this.destroy(signal.reason ?? new AbortError());
				};
				signal?.addEventListener("abort", onAbort);
				this.on("close", function() {
					signal?.removeEventListener("abort", onAbort);
					if (signal?.aborted) reject(signal.reason ?? new AbortError());
					else resolve(null);
				}).on("error", noop).on("data", function(chunk) {
					limit -= chunk.length;
					if (limit <= 0) this.destroy();
				}).resume();
			});
		}
	};
	function isLocked(self) {
		return self[kBody] && self[kBody].locked === true || self[kConsume];
	}
	function isUnusable(self) {
		return util$10.isDisturbed(self) || isLocked(self);
	}
	async function consume(stream$2, type) {
		assert$14(!stream$2[kConsume]);
		return new Promise((resolve, reject) => {
			if (isUnusable(stream$2)) {
				const rState = stream$2._readableState;
				if (rState.destroyed && rState.closeEmitted === false) stream$2.on("error", (err) => {
					reject(err);
				}).on("close", () => {
					reject(/* @__PURE__ */ new TypeError("unusable"));
				});
				else reject(rState.errored ?? /* @__PURE__ */ new TypeError("unusable"));
			} else queueMicrotask(() => {
				stream$2[kConsume] = {
					type,
					stream: stream$2,
					resolve,
					reject,
					length: 0,
					body: []
				};
				stream$2.on("error", function(err) {
					consumeFinish(this[kConsume], err);
				}).on("close", function() {
					if (this[kConsume].body !== null) consumeFinish(this[kConsume], new RequestAbortedError$4());
				});
				consumeStart(stream$2[kConsume]);
			});
		});
	}
	function consumeStart(consume$1) {
		if (consume$1.body === null) return;
		const { _readableState: state } = consume$1.stream;
		if (state.bufferIndex) {
			const start = state.bufferIndex;
			const end = state.buffer.length;
			for (let n = start; n < end; n++) consumePush(consume$1, state.buffer[n]);
		} else for (const chunk of state.buffer) consumePush(consume$1, chunk);
		if (state.endEmitted) consumeEnd(this[kConsume]);
		else consume$1.stream.on("end", function() {
			consumeEnd(this[kConsume]);
		});
		consume$1.stream.resume();
		while (consume$1.stream.read() != null);
	}
	function chunksDecode$1(chunks, length) {
		if (chunks.length === 0 || length === 0) return "";
		const buffer$1 = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks, length);
		const bufferLength = buffer$1.length;
		const start = bufferLength > 2 && buffer$1[0] === 239 && buffer$1[1] === 187 && buffer$1[2] === 191 ? 3 : 0;
		return buffer$1.utf8Slice(start, bufferLength);
	}
	function chunksConcat(chunks, length) {
		if (chunks.length === 0 || length === 0) return new Uint8Array(0);
		if (chunks.length === 1) return new Uint8Array(chunks[0]);
		const buffer$1 = new Uint8Array(Buffer.allocUnsafeSlow(length).buffer);
		let offset = 0;
		for (let i = 0; i < chunks.length; ++i) {
			const chunk = chunks[i];
			buffer$1.set(chunk, offset);
			offset += chunk.length;
		}
		return buffer$1;
	}
	function consumeEnd(consume$1) {
		const { type, body, resolve, stream: stream$2, length } = consume$1;
		try {
			if (type === "text") resolve(chunksDecode$1(body, length));
			else if (type === "json") resolve(JSON.parse(chunksDecode$1(body, length)));
			else if (type === "arrayBuffer") resolve(chunksConcat(body, length).buffer);
			else if (type === "blob") resolve(new Blob(body, { type: stream$2[kContentType] }));
			else if (type === "bytes") resolve(chunksConcat(body, length));
			consumeFinish(consume$1);
		} catch (err) {
			stream$2.destroy(err);
		}
	}
	function consumePush(consume$1, chunk) {
		consume$1.length += chunk.length;
		consume$1.body.push(chunk);
	}
	function consumeFinish(consume$1, err) {
		if (consume$1.body === null) return;
		if (err) consume$1.reject(err);
		else consume$1.resolve();
		consume$1.type = null;
		consume$1.stream = null;
		consume$1.resolve = null;
		consume$1.reject = null;
		consume$1.length = 0;
		consume$1.body = null;
	}
	module.exports = {
		Readable: BodyReadable,
		chunksDecode: chunksDecode$1
	};
}));
var require_util$5 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$13 = __require("node:assert");
	var { ResponseStatusCodeError } = require_errors();
	var { chunksDecode } = require_readable();
	async function getResolveErrorBodyCallback$2({ callback, body, contentType, statusCode, statusMessage, headers }) {
		assert$13(body);
		let chunks = [];
		let length = 0;
		try {
			for await (const chunk of body) {
				chunks.push(chunk);
				length += chunk.length;
				if (length > 131072) {
					chunks = [];
					length = 0;
					break;
				}
			}
		} catch {
			chunks = [];
			length = 0;
		}
		const message = `Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`;
		if (statusCode === 204 || !contentType || !length) {
			queueMicrotask(() => callback(new ResponseStatusCodeError(message, statusCode, headers)));
			return;
		}
		const stackTraceLimit = Error.stackTraceLimit;
		Error.stackTraceLimit = 0;
		let payload;
		try {
			if (isContentTypeApplicationJson(contentType)) payload = JSON.parse(chunksDecode(chunks, length));
			else if (isContentTypeText(contentType)) payload = chunksDecode(chunks, length);
		} catch {} finally {
			Error.stackTraceLimit = stackTraceLimit;
		}
		queueMicrotask(() => callback(new ResponseStatusCodeError(message, statusCode, headers, payload)));
	}
	var isContentTypeApplicationJson = (contentType) => {
		return contentType.length > 15 && contentType[11] === "/" && contentType[0] === "a" && contentType[1] === "p" && contentType[2] === "p" && contentType[3] === "l" && contentType[4] === "i" && contentType[5] === "c" && contentType[6] === "a" && contentType[7] === "t" && contentType[8] === "i" && contentType[9] === "o" && contentType[10] === "n" && contentType[12] === "j" && contentType[13] === "s" && contentType[14] === "o" && contentType[15] === "n";
	};
	var isContentTypeText = (contentType) => {
		return contentType.length > 4 && contentType[4] === "/" && contentType[0] === "t" && contentType[1] === "e" && contentType[2] === "x" && contentType[3] === "t";
	};
	module.exports = {
		getResolveErrorBodyCallback: getResolveErrorBodyCallback$2,
		isContentTypeApplicationJson,
		isContentTypeText
	};
}));
var require_api_request = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$12 = __require("node:assert");
	var { Readable: Readable$2 } = require_readable();
	var { InvalidArgumentError: InvalidArgumentError$12, RequestAbortedError: RequestAbortedError$3 } = require_errors();
	var util$9 = require_util$7();
	var { getResolveErrorBodyCallback: getResolveErrorBodyCallback$1 } = require_util$5();
	var { AsyncResource: AsyncResource$4 } = __require("node:async_hooks");
	var RequestHandler = class extends AsyncResource$4 {
		constructor(opts, callback) {
			if (!opts || typeof opts !== "object") throw new InvalidArgumentError$12("invalid opts");
			const { signal, method, opaque, body, onInfo, responseHeaders, throwOnError, highWaterMark } = opts;
			try {
				if (typeof callback !== "function") throw new InvalidArgumentError$12("invalid callback");
				if (highWaterMark && (typeof highWaterMark !== "number" || highWaterMark < 0)) throw new InvalidArgumentError$12("invalid highWaterMark");
				if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") throw new InvalidArgumentError$12("signal must be an EventEmitter or EventTarget");
				if (method === "CONNECT") throw new InvalidArgumentError$12("invalid method");
				if (onInfo && typeof onInfo !== "function") throw new InvalidArgumentError$12("invalid onInfo callback");
				super("UNDICI_REQUEST");
			} catch (err) {
				if (util$9.isStream(body)) util$9.destroy(body.on("error", util$9.nop), err);
				throw err;
			}
			this.method = method;
			this.responseHeaders = responseHeaders || null;
			this.opaque = opaque || null;
			this.callback = callback;
			this.res = null;
			this.abort = null;
			this.body = body;
			this.trailers = {};
			this.context = null;
			this.onInfo = onInfo || null;
			this.throwOnError = throwOnError;
			this.highWaterMark = highWaterMark;
			this.signal = signal;
			this.reason = null;
			this.removeAbortListener = null;
			if (util$9.isStream(body)) body.on("error", (err) => {
				this.onError(err);
			});
			if (this.signal) if (this.signal.aborted) this.reason = this.signal.reason ?? new RequestAbortedError$3();
			else this.removeAbortListener = util$9.addAbortListener(this.signal, () => {
				this.reason = this.signal.reason ?? new RequestAbortedError$3();
				if (this.res) util$9.destroy(this.res.on("error", util$9.nop), this.reason);
				else if (this.abort) this.abort(this.reason);
				if (this.removeAbortListener) {
					this.res?.off("close", this.removeAbortListener);
					this.removeAbortListener();
					this.removeAbortListener = null;
				}
			});
		}
		onConnect(abort$1, context) {
			if (this.reason) {
				abort$1(this.reason);
				return;
			}
			assert$12(this.callback);
			this.abort = abort$1;
			this.context = context;
		}
		onHeaders(statusCode, rawHeaders, resume$1, statusMessage) {
			const { callback, opaque, abort: abort$1, context, responseHeaders, highWaterMark } = this;
			const headers = responseHeaders === "raw" ? util$9.parseRawHeaders(rawHeaders) : util$9.parseHeaders(rawHeaders);
			if (statusCode < 200) {
				if (this.onInfo) this.onInfo({
					statusCode,
					headers
				});
				return;
			}
			const parsedHeaders = responseHeaders === "raw" ? util$9.parseHeaders(rawHeaders) : headers;
			const contentType = parsedHeaders["content-type"];
			const contentLength = parsedHeaders["content-length"];
			const res = new Readable$2({
				resume: resume$1,
				abort: abort$1,
				contentType,
				contentLength: this.method !== "HEAD" && contentLength ? Number(contentLength) : null,
				highWaterMark
			});
			if (this.removeAbortListener) res.on("close", this.removeAbortListener);
			this.callback = null;
			this.res = res;
			if (callback !== null) if (this.throwOnError && statusCode >= 400) this.runInAsyncScope(getResolveErrorBodyCallback$1, null, {
				callback,
				body: res,
				contentType,
				statusCode,
				statusMessage,
				headers
			});
			else this.runInAsyncScope(callback, null, null, {
				statusCode,
				headers,
				trailers: this.trailers,
				opaque,
				body: res,
				context
			});
		}
		onData(chunk) {
			return this.res.push(chunk);
		}
		onComplete(trailers) {
			util$9.parseHeaders(trailers, this.trailers);
			this.res.push(null);
		}
		onError(err) {
			const { res, callback, body, opaque } = this;
			if (callback) {
				this.callback = null;
				queueMicrotask(() => {
					this.runInAsyncScope(callback, null, err, { opaque });
				});
			}
			if (res) {
				this.res = null;
				queueMicrotask(() => {
					util$9.destroy(res, err);
				});
			}
			if (body) {
				this.body = null;
				util$9.destroy(body, err);
			}
			if (this.removeAbortListener) {
				res?.off("close", this.removeAbortListener);
				this.removeAbortListener();
				this.removeAbortListener = null;
			}
		}
	};
	function request(opts, callback) {
		if (callback === void 0) return new Promise((resolve, reject) => {
			request.call(this, opts, (err, data) => {
				return err ? reject(err) : resolve(data);
			});
		});
		try {
			this.dispatch(opts, new RequestHandler(opts, callback));
		} catch (err) {
			if (typeof callback !== "function") throw err;
			const opaque = opts?.opaque;
			queueMicrotask(() => callback(err, { opaque }));
		}
	}
	module.exports = request;
	module.exports.RequestHandler = RequestHandler;
}));
var require_abort_signal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { addAbortListener: addAbortListener$1 } = require_util$7();
	var { RequestAbortedError: RequestAbortedError$2 } = require_errors();
	var kListener = Symbol("kListener");
	var kSignal$1 = Symbol("kSignal");
	function abort(self) {
		if (self.abort) self.abort(self[kSignal$1]?.reason);
		else self.reason = self[kSignal$1]?.reason ?? new RequestAbortedError$2();
		removeSignal$4(self);
	}
	function addSignal$4(self, signal) {
		self.reason = null;
		self[kSignal$1] = null;
		self[kListener] = null;
		if (!signal) return;
		if (signal.aborted) {
			abort(self);
			return;
		}
		self[kSignal$1] = signal;
		self[kListener] = () => {
			abort(self);
		};
		addAbortListener$1(self[kSignal$1], self[kListener]);
	}
	function removeSignal$4(self) {
		if (!self[kSignal$1]) return;
		if ("removeEventListener" in self[kSignal$1]) self[kSignal$1].removeEventListener("abort", self[kListener]);
		else self[kSignal$1].removeListener("abort", self[kListener]);
		self[kSignal$1] = null;
		self[kListener] = null;
	}
	module.exports = {
		addSignal: addSignal$4,
		removeSignal: removeSignal$4
	};
}));
var require_api_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$11 = __require("node:assert");
	var { finished: finished$1, PassThrough: PassThrough$1 } = __require("node:stream");
	var { InvalidArgumentError: InvalidArgumentError$11, InvalidReturnValueError: InvalidReturnValueError$1 } = require_errors();
	var util$8 = require_util$7();
	var { getResolveErrorBodyCallback } = require_util$5();
	var { AsyncResource: AsyncResource$3 } = __require("node:async_hooks");
	var { addSignal: addSignal$3, removeSignal: removeSignal$3 } = require_abort_signal();
	var StreamHandler = class extends AsyncResource$3 {
		constructor(opts, factory, callback) {
			if (!opts || typeof opts !== "object") throw new InvalidArgumentError$11("invalid opts");
			const { signal, method, opaque, body, onInfo, responseHeaders, throwOnError } = opts;
			try {
				if (typeof callback !== "function") throw new InvalidArgumentError$11("invalid callback");
				if (typeof factory !== "function") throw new InvalidArgumentError$11("invalid factory");
				if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") throw new InvalidArgumentError$11("signal must be an EventEmitter or EventTarget");
				if (method === "CONNECT") throw new InvalidArgumentError$11("invalid method");
				if (onInfo && typeof onInfo !== "function") throw new InvalidArgumentError$11("invalid onInfo callback");
				super("UNDICI_STREAM");
			} catch (err) {
				if (util$8.isStream(body)) util$8.destroy(body.on("error", util$8.nop), err);
				throw err;
			}
			this.responseHeaders = responseHeaders || null;
			this.opaque = opaque || null;
			this.factory = factory;
			this.callback = callback;
			this.res = null;
			this.abort = null;
			this.context = null;
			this.trailers = null;
			this.body = body;
			this.onInfo = onInfo || null;
			this.throwOnError = throwOnError || false;
			if (util$8.isStream(body)) body.on("error", (err) => {
				this.onError(err);
			});
			addSignal$3(this, signal);
		}
		onConnect(abort$1, context) {
			if (this.reason) {
				abort$1(this.reason);
				return;
			}
			assert$11(this.callback);
			this.abort = abort$1;
			this.context = context;
		}
		onHeaders(statusCode, rawHeaders, resume$1, statusMessage) {
			const { factory, opaque, context, callback, responseHeaders } = this;
			const headers = responseHeaders === "raw" ? util$8.parseRawHeaders(rawHeaders) : util$8.parseHeaders(rawHeaders);
			if (statusCode < 200) {
				if (this.onInfo) this.onInfo({
					statusCode,
					headers
				});
				return;
			}
			this.factory = null;
			let res;
			if (this.throwOnError && statusCode >= 400) {
				const contentType = (responseHeaders === "raw" ? util$8.parseHeaders(rawHeaders) : headers)["content-type"];
				res = new PassThrough$1();
				this.callback = null;
				this.runInAsyncScope(getResolveErrorBodyCallback, null, {
					callback,
					body: res,
					contentType,
					statusCode,
					statusMessage,
					headers
				});
			} else {
				if (factory === null) return;
				res = this.runInAsyncScope(factory, null, {
					statusCode,
					headers,
					opaque,
					context
				});
				if (!res || typeof res.write !== "function" || typeof res.end !== "function" || typeof res.on !== "function") throw new InvalidReturnValueError$1("expected Writable");
				finished$1(res, { readable: false }, (err) => {
					const { callback: callback$1, res: res$1, opaque: opaque$1, trailers, abort: abort$1 } = this;
					this.res = null;
					if (err || !res$1.readable) util$8.destroy(res$1, err);
					this.callback = null;
					this.runInAsyncScope(callback$1, null, err || null, {
						opaque: opaque$1,
						trailers
					});
					if (err) abort$1();
				});
			}
			res.on("drain", resume$1);
			this.res = res;
			return (res.writableNeedDrain !== void 0 ? res.writableNeedDrain : res._writableState?.needDrain) !== true;
		}
		onData(chunk) {
			const { res } = this;
			return res ? res.write(chunk) : true;
		}
		onComplete(trailers) {
			const { res } = this;
			removeSignal$3(this);
			if (!res) return;
			this.trailers = util$8.parseHeaders(trailers);
			res.end();
		}
		onError(err) {
			const { res, callback, opaque, body } = this;
			removeSignal$3(this);
			this.factory = null;
			if (res) {
				this.res = null;
				util$8.destroy(res, err);
			} else if (callback) {
				this.callback = null;
				queueMicrotask(() => {
					this.runInAsyncScope(callback, null, err, { opaque });
				});
			}
			if (body) {
				this.body = null;
				util$8.destroy(body, err);
			}
		}
	};
	function stream(opts, factory, callback) {
		if (callback === void 0) return new Promise((resolve, reject) => {
			stream.call(this, opts, factory, (err, data) => {
				return err ? reject(err) : resolve(data);
			});
		});
		try {
			this.dispatch(opts, new StreamHandler(opts, factory, callback));
		} catch (err) {
			if (typeof callback !== "function") throw err;
			const opaque = opts?.opaque;
			queueMicrotask(() => callback(err, { opaque }));
		}
	}
	module.exports = stream;
}));
var require_api_pipeline = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Readable: Readable$1, Duplex, PassThrough } = __require("node:stream");
	var { InvalidArgumentError: InvalidArgumentError$10, InvalidReturnValueError, RequestAbortedError: RequestAbortedError$1 } = require_errors();
	var util$7 = require_util$7();
	var { AsyncResource: AsyncResource$2 } = __require("node:async_hooks");
	var { addSignal: addSignal$2, removeSignal: removeSignal$2 } = require_abort_signal();
	var assert$10 = __require("node:assert");
	var kResume = Symbol("resume");
	var PipelineRequest = class extends Readable$1 {
		constructor() {
			super({ autoDestroy: true });
			this[kResume] = null;
		}
		_read() {
			const { [kResume]: resume$1 } = this;
			if (resume$1) {
				this[kResume] = null;
				resume$1();
			}
		}
		_destroy(err, callback) {
			this._read();
			callback(err);
		}
	};
	var PipelineResponse = class extends Readable$1 {
		constructor(resume$1) {
			super({ autoDestroy: true });
			this[kResume] = resume$1;
		}
		_read() {
			this[kResume]();
		}
		_destroy(err, callback) {
			if (!err && !this._readableState.endEmitted) err = new RequestAbortedError$1();
			callback(err);
		}
	};
	var PipelineHandler = class extends AsyncResource$2 {
		constructor(opts, handler) {
			if (!opts || typeof opts !== "object") throw new InvalidArgumentError$10("invalid opts");
			if (typeof handler !== "function") throw new InvalidArgumentError$10("invalid handler");
			const { signal, method, opaque, onInfo, responseHeaders } = opts;
			if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") throw new InvalidArgumentError$10("signal must be an EventEmitter or EventTarget");
			if (method === "CONNECT") throw new InvalidArgumentError$10("invalid method");
			if (onInfo && typeof onInfo !== "function") throw new InvalidArgumentError$10("invalid onInfo callback");
			super("UNDICI_PIPELINE");
			this.opaque = opaque || null;
			this.responseHeaders = responseHeaders || null;
			this.handler = handler;
			this.abort = null;
			this.context = null;
			this.onInfo = onInfo || null;
			this.req = new PipelineRequest().on("error", util$7.nop);
			this.ret = new Duplex({
				readableObjectMode: opts.objectMode,
				autoDestroy: true,
				read: () => {
					const { body } = this;
					if (body?.resume) body.resume();
				},
				write: (chunk, encoding, callback) => {
					const { req } = this;
					if (req.push(chunk, encoding) || req._readableState.destroyed) callback();
					else req[kResume] = callback;
				},
				destroy: (err, callback) => {
					const { body, req, res, ret, abort: abort$1 } = this;
					if (!err && !ret._readableState.endEmitted) err = new RequestAbortedError$1();
					if (abort$1 && err) abort$1();
					util$7.destroy(body, err);
					util$7.destroy(req, err);
					util$7.destroy(res, err);
					removeSignal$2(this);
					callback(err);
				}
			}).on("prefinish", () => {
				const { req } = this;
				req.push(null);
			});
			this.res = null;
			addSignal$2(this, signal);
		}
		onConnect(abort$1, context) {
			const { ret, res } = this;
			if (this.reason) {
				abort$1(this.reason);
				return;
			}
			assert$10(!res, "pipeline cannot be retried");
			assert$10(!ret.destroyed);
			this.abort = abort$1;
			this.context = context;
		}
		onHeaders(statusCode, rawHeaders, resume$1) {
			const { opaque, handler, context } = this;
			if (statusCode < 200) {
				if (this.onInfo) {
					const headers = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
					this.onInfo({
						statusCode,
						headers
					});
				}
				return;
			}
			this.res = new PipelineResponse(resume$1);
			let body;
			try {
				this.handler = null;
				const headers = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
				body = this.runInAsyncScope(handler, null, {
					statusCode,
					headers,
					opaque,
					body: this.res,
					context
				});
			} catch (err) {
				this.res.on("error", util$7.nop);
				throw err;
			}
			if (!body || typeof body.on !== "function") throw new InvalidReturnValueError("expected Readable");
			body.on("data", (chunk) => {
				const { ret, body: body$1 } = this;
				if (!ret.push(chunk) && body$1.pause) body$1.pause();
			}).on("error", (err) => {
				const { ret } = this;
				util$7.destroy(ret, err);
			}).on("end", () => {
				const { ret } = this;
				ret.push(null);
			}).on("close", () => {
				const { ret } = this;
				if (!ret._readableState.ended) util$7.destroy(ret, new RequestAbortedError$1());
			});
			this.body = body;
		}
		onData(chunk) {
			const { res } = this;
			return res.push(chunk);
		}
		onComplete(trailers) {
			const { res } = this;
			res.push(null);
		}
		onError(err) {
			const { ret } = this;
			this.handler = null;
			util$7.destroy(ret, err);
		}
	};
	function pipeline$2(opts, handler) {
		try {
			const pipelineHandler = new PipelineHandler(opts, handler);
			this.dispatch({
				...opts,
				body: pipelineHandler.req
			}, pipelineHandler);
			return pipelineHandler.ret;
		} catch (err) {
			return new PassThrough().destroy(err);
		}
	}
	module.exports = pipeline$2;
}));
var require_api_upgrade = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { InvalidArgumentError: InvalidArgumentError$9, SocketError: SocketError$1 } = require_errors();
	var { AsyncResource: AsyncResource$1 } = __require("node:async_hooks");
	var util$6 = require_util$7();
	var { addSignal: addSignal$1, removeSignal: removeSignal$1 } = require_abort_signal();
	var assert$9 = __require("node:assert");
	var UpgradeHandler = class extends AsyncResource$1 {
		constructor(opts, callback) {
			if (!opts || typeof opts !== "object") throw new InvalidArgumentError$9("invalid opts");
			if (typeof callback !== "function") throw new InvalidArgumentError$9("invalid callback");
			const { signal, opaque, responseHeaders } = opts;
			if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") throw new InvalidArgumentError$9("signal must be an EventEmitter or EventTarget");
			super("UNDICI_UPGRADE");
			this.responseHeaders = responseHeaders || null;
			this.opaque = opaque || null;
			this.callback = callback;
			this.abort = null;
			this.context = null;
			addSignal$1(this, signal);
		}
		onConnect(abort$1, context) {
			if (this.reason) {
				abort$1(this.reason);
				return;
			}
			assert$9(this.callback);
			this.abort = abort$1;
			this.context = null;
		}
		onHeaders() {
			throw new SocketError$1("bad upgrade", null);
		}
		onUpgrade(statusCode, rawHeaders, socket) {
			assert$9(statusCode === 101);
			const { callback, opaque, context } = this;
			removeSignal$1(this);
			this.callback = null;
			const headers = this.responseHeaders === "raw" ? util$6.parseRawHeaders(rawHeaders) : util$6.parseHeaders(rawHeaders);
			this.runInAsyncScope(callback, null, null, {
				headers,
				socket,
				opaque,
				context
			});
		}
		onError(err) {
			const { callback, opaque } = this;
			removeSignal$1(this);
			if (callback) {
				this.callback = null;
				queueMicrotask(() => {
					this.runInAsyncScope(callback, null, err, { opaque });
				});
			}
		}
	};
	function upgrade(opts, callback) {
		if (callback === void 0) return new Promise((resolve, reject) => {
			upgrade.call(this, opts, (err, data) => {
				return err ? reject(err) : resolve(data);
			});
		});
		try {
			const upgradeHandler = new UpgradeHandler(opts, callback);
			this.dispatch({
				...opts,
				method: opts.method || "GET",
				upgrade: opts.protocol || "Websocket"
			}, upgradeHandler);
		} catch (err) {
			if (typeof callback !== "function") throw err;
			const opaque = opts?.opaque;
			queueMicrotask(() => callback(err, { opaque }));
		}
	}
	module.exports = upgrade;
}));
var require_api_connect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$8 = __require("node:assert");
	var { AsyncResource } = __require("node:async_hooks");
	var { InvalidArgumentError: InvalidArgumentError$8, SocketError } = require_errors();
	var util$5 = require_util$7();
	var { addSignal, removeSignal } = require_abort_signal();
	var ConnectHandler = class extends AsyncResource {
		constructor(opts, callback) {
			if (!opts || typeof opts !== "object") throw new InvalidArgumentError$8("invalid opts");
			if (typeof callback !== "function") throw new InvalidArgumentError$8("invalid callback");
			const { signal, opaque, responseHeaders } = opts;
			if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") throw new InvalidArgumentError$8("signal must be an EventEmitter or EventTarget");
			super("UNDICI_CONNECT");
			this.opaque = opaque || null;
			this.responseHeaders = responseHeaders || null;
			this.callback = callback;
			this.abort = null;
			addSignal(this, signal);
		}
		onConnect(abort$1, context) {
			if (this.reason) {
				abort$1(this.reason);
				return;
			}
			assert$8(this.callback);
			this.abort = abort$1;
			this.context = context;
		}
		onHeaders() {
			throw new SocketError("bad connect", null);
		}
		onUpgrade(statusCode, rawHeaders, socket) {
			const { callback, opaque, context } = this;
			removeSignal(this);
			this.callback = null;
			let headers = rawHeaders;
			if (headers != null) headers = this.responseHeaders === "raw" ? util$5.parseRawHeaders(rawHeaders) : util$5.parseHeaders(rawHeaders);
			this.runInAsyncScope(callback, null, null, {
				statusCode,
				headers,
				socket,
				opaque,
				context
			});
		}
		onError(err) {
			const { callback, opaque } = this;
			removeSignal(this);
			if (callback) {
				this.callback = null;
				queueMicrotask(() => {
					this.runInAsyncScope(callback, null, err, { opaque });
				});
			}
		}
	};
	function connect(opts, callback) {
		if (callback === void 0) return new Promise((resolve, reject) => {
			connect.call(this, opts, (err, data) => {
				return err ? reject(err) : resolve(data);
			});
		});
		try {
			const connectHandler = new ConnectHandler(opts, callback);
			this.dispatch({
				...opts,
				method: "CONNECT"
			}, connectHandler);
		} catch (err) {
			if (typeof callback !== "function") throw err;
			const opaque = opts?.opaque;
			queueMicrotask(() => callback(err, { opaque }));
		}
	}
	module.exports = connect;
}));
var require_api = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports.request = require_api_request();
	module.exports.stream = require_api_stream();
	module.exports.pipeline = require_api_pipeline();
	module.exports.upgrade = require_api_upgrade();
	module.exports.connect = require_api_connect();
}));
var require_mock_errors = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { UndiciError: UndiciError$1 } = require_errors();
	module.exports = { MockNotMatchedError: class MockNotMatchedError$1 extends UndiciError$1 {
		constructor(message) {
			super(message);
			Error.captureStackTrace(this, MockNotMatchedError$1);
			this.name = "MockNotMatchedError";
			this.message = message || "The request does not match any registered mock dispatches";
			this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED";
		}
	} };
}));
var require_mock_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		kAgent: Symbol("agent"),
		kOptions: Symbol("options"),
		kFactory: Symbol("factory"),
		kDispatches: Symbol("dispatches"),
		kDispatchKey: Symbol("dispatch key"),
		kDefaultHeaders: Symbol("default headers"),
		kDefaultTrailers: Symbol("default trailers"),
		kContentLength: Symbol("content length"),
		kMockAgent: Symbol("mock agent"),
		kMockAgentSet: Symbol("mock agent set"),
		kMockAgentGet: Symbol("mock agent get"),
		kMockDispatch: Symbol("mock dispatch"),
		kClose: Symbol("close"),
		kOriginalClose: Symbol("original agent close"),
		kOrigin: Symbol("origin"),
		kIsMockActive: Symbol("is mock active"),
		kNetConnect: Symbol("net connect"),
		kGetNetConnect: Symbol("get net connect"),
		kConnected: Symbol("connected")
	};
}));
var require_mock_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { MockNotMatchedError } = require_mock_errors();
	var { kDispatches: kDispatches$4, kMockAgent: kMockAgent$2, kOriginalDispatch: kOriginalDispatch$2, kOrigin: kOrigin$2, kGetNetConnect: kGetNetConnect$1 } = require_mock_symbols();
	var { buildURL: buildURL$1 } = require_util$7();
	var { STATUS_CODES: STATUS_CODES$1 } = __require("node:http");
	var { types: { isPromise } } = __require("node:util");
	function matchValue$1(match, value) {
		if (typeof match === "string") return match === value;
		if (match instanceof RegExp) return match.test(value);
		if (typeof match === "function") return match(value) === true;
		return false;
	}
	function lowerCaseEntries(headers) {
		return Object.fromEntries(Object.entries(headers).map(([headerName, headerValue]) => {
			return [headerName.toLocaleLowerCase(), headerValue];
		}));
	}
	function getHeaderByName(headers, key) {
		if (Array.isArray(headers)) {
			for (let i = 0; i < headers.length; i += 2) if (headers[i].toLocaleLowerCase() === key.toLocaleLowerCase()) return headers[i + 1];
			return;
		} else if (typeof headers.get === "function") return headers.get(key);
		else return lowerCaseEntries(headers)[key.toLocaleLowerCase()];
	}
	function buildHeadersFromArray(headers) {
		const clone = headers.slice();
		const entries = [];
		for (let index = 0; index < clone.length; index += 2) entries.push([clone[index], clone[index + 1]]);
		return Object.fromEntries(entries);
	}
	function matchHeaders(mockDispatch$1, headers) {
		if (typeof mockDispatch$1.headers === "function") {
			if (Array.isArray(headers)) headers = buildHeadersFromArray(headers);
			return mockDispatch$1.headers(headers ? lowerCaseEntries(headers) : {});
		}
		if (typeof mockDispatch$1.headers === "undefined") return true;
		if (typeof headers !== "object" || typeof mockDispatch$1.headers !== "object") return false;
		for (const [matchHeaderName, matchHeaderValue] of Object.entries(mockDispatch$1.headers)) {
			const headerValue = getHeaderByName(headers, matchHeaderName);
			if (!matchValue$1(matchHeaderValue, headerValue)) return false;
		}
		return true;
	}
	function safeUrl(path) {
		if (typeof path !== "string") return path;
		const pathSegments = path.split("?");
		if (pathSegments.length !== 2) return path;
		const qp = new URLSearchParams(pathSegments.pop());
		qp.sort();
		return [...pathSegments, qp.toString()].join("?");
	}
	function matchKey(mockDispatch$1, { path, method, body, headers }) {
		const pathMatch = matchValue$1(mockDispatch$1.path, path);
		const methodMatch = matchValue$1(mockDispatch$1.method, method);
		const bodyMatch = typeof mockDispatch$1.body !== "undefined" ? matchValue$1(mockDispatch$1.body, body) : true;
		const headersMatch = matchHeaders(mockDispatch$1, headers);
		return pathMatch && methodMatch && bodyMatch && headersMatch;
	}
	function getResponseData$1(data) {
		if (Buffer.isBuffer(data)) return data;
		else if (data instanceof Uint8Array) return data;
		else if (data instanceof ArrayBuffer) return data;
		else if (typeof data === "object") return JSON.stringify(data);
		else return data.toString();
	}
	function getMockDispatch(mockDispatches, key) {
		const basePath = key.query ? buildURL$1(key.path, key.query) : key.path;
		const resolvedPath = typeof basePath === "string" ? safeUrl(basePath) : basePath;
		let matchedMockDispatches = mockDispatches.filter(({ consumed }) => !consumed).filter(({ path }) => matchValue$1(safeUrl(path), resolvedPath));
		if (matchedMockDispatches.length === 0) throw new MockNotMatchedError(`Mock dispatch not matched for path '${resolvedPath}'`);
		matchedMockDispatches = matchedMockDispatches.filter(({ method }) => matchValue$1(method, key.method));
		if (matchedMockDispatches.length === 0) throw new MockNotMatchedError(`Mock dispatch not matched for method '${key.method}' on path '${resolvedPath}'`);
		matchedMockDispatches = matchedMockDispatches.filter(({ body }) => typeof body !== "undefined" ? matchValue$1(body, key.body) : true);
		if (matchedMockDispatches.length === 0) throw new MockNotMatchedError(`Mock dispatch not matched for body '${key.body}' on path '${resolvedPath}'`);
		matchedMockDispatches = matchedMockDispatches.filter((mockDispatch$1) => matchHeaders(mockDispatch$1, key.headers));
		if (matchedMockDispatches.length === 0) {
			const headers = typeof key.headers === "object" ? JSON.stringify(key.headers) : key.headers;
			throw new MockNotMatchedError(`Mock dispatch not matched for headers '${headers}' on path '${resolvedPath}'`);
		}
		return matchedMockDispatches[0];
	}
	function addMockDispatch$1(mockDispatches, key, data) {
		const baseData = {
			timesInvoked: 0,
			times: 1,
			persist: false,
			consumed: false
		};
		const replyData = typeof data === "function" ? { callback: data } : { ...data };
		const newMockDispatch = {
			...baseData,
			...key,
			pending: true,
			data: {
				error: null,
				...replyData
			}
		};
		mockDispatches.push(newMockDispatch);
		return newMockDispatch;
	}
	function deleteMockDispatch(mockDispatches, key) {
		const index = mockDispatches.findIndex((dispatch) => {
			if (!dispatch.consumed) return false;
			return matchKey(dispatch, key);
		});
		if (index !== -1) mockDispatches.splice(index, 1);
	}
	function buildKey$1(opts) {
		const { path, method, body, headers, query } = opts;
		return {
			path,
			method,
			body,
			headers,
			query
		};
	}
	function generateKeyValues(data) {
		const keys = Object.keys(data);
		const result = [];
		for (let i = 0; i < keys.length; ++i) {
			const key = keys[i];
			const value = data[key];
			const name = Buffer.from(`${key}`);
			if (Array.isArray(value)) for (let j = 0; j < value.length; ++j) result.push(name, Buffer.from(`${value[j]}`));
			else result.push(name, Buffer.from(`${value}`));
		}
		return result;
	}
	function getStatusText(statusCode) {
		return STATUS_CODES$1[statusCode] || "unknown";
	}
	async function getResponse(body) {
		const buffers = [];
		for await (const data of body) buffers.push(data);
		return Buffer.concat(buffers).toString("utf8");
	}
	function mockDispatch(opts, handler) {
		const key = buildKey$1(opts);
		const mockDispatch$1 = getMockDispatch(this[kDispatches$4], key);
		mockDispatch$1.timesInvoked++;
		if (mockDispatch$1.data.callback) mockDispatch$1.data = {
			...mockDispatch$1.data,
			...mockDispatch$1.data.callback(opts)
		};
		const { data: { statusCode, data, headers, trailers, error }, delay: delay$2, persist } = mockDispatch$1;
		const { timesInvoked, times } = mockDispatch$1;
		mockDispatch$1.consumed = !persist && timesInvoked >= times;
		mockDispatch$1.pending = timesInvoked < times;
		if (error !== null) {
			deleteMockDispatch(this[kDispatches$4], key);
			handler.onError(error);
			return true;
		}
		if (typeof delay$2 === "number" && delay$2 > 0) setTimeout(() => {
			handleReply(this[kDispatches$4]);
		}, delay$2);
		else handleReply(this[kDispatches$4]);
		function handleReply(mockDispatches, _data = data) {
			const optsHeaders = Array.isArray(opts.headers) ? buildHeadersFromArray(opts.headers) : opts.headers;
			const body = typeof _data === "function" ? _data({
				...opts,
				headers: optsHeaders
			}) : _data;
			if (isPromise(body)) {
				body.then((newData) => handleReply(mockDispatches, newData));
				return;
			}
			const responseData = getResponseData$1(body);
			const responseHeaders = generateKeyValues(headers);
			const responseTrailers = generateKeyValues(trailers);
			handler.onConnect?.((err) => handler.onError(err), null);
			handler.onHeaders?.(statusCode, responseHeaders, resume$1, getStatusText(statusCode));
			handler.onData?.(Buffer.from(responseData));
			handler.onComplete?.(responseTrailers);
			deleteMockDispatch(mockDispatches, key);
		}
		function resume$1() {}
		return true;
	}
	function buildMockDispatch$2() {
		const agent = this[kMockAgent$2];
		const origin = this[kOrigin$2];
		const originalDispatch = this[kOriginalDispatch$2];
		return function dispatch(opts, handler) {
			if (agent.isMockActive) try {
				mockDispatch.call(this, opts, handler);
			} catch (error) {
				if (error instanceof MockNotMatchedError) {
					const netConnect = agent[kGetNetConnect$1]();
					if (netConnect === false) throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect disabled)`);
					if (checkNetConnect(netConnect, origin)) originalDispatch.call(this, opts, handler);
					else throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect is not enabled for this origin)`);
				} else throw error;
			}
			else originalDispatch.call(this, opts, handler);
		};
	}
	function checkNetConnect(netConnect, origin) {
		const url = new URL(origin);
		if (netConnect === true) return true;
		else if (Array.isArray(netConnect) && netConnect.some((matcher) => matchValue$1(matcher, url.host))) return true;
		return false;
	}
	function buildMockOptions$1(opts) {
		if (opts) {
			const { agent,...mockOptions } = opts;
			return mockOptions;
		}
	}
	module.exports = {
		getResponseData: getResponseData$1,
		getMockDispatch,
		addMockDispatch: addMockDispatch$1,
		deleteMockDispatch,
		buildKey: buildKey$1,
		generateKeyValues,
		matchValue: matchValue$1,
		getResponse,
		getStatusText,
		mockDispatch,
		buildMockDispatch: buildMockDispatch$2,
		checkNetConnect,
		buildMockOptions: buildMockOptions$1,
		getHeaderByName,
		buildHeadersFromArray
	};
}));
var require_mock_interceptor = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { getResponseData, buildKey, addMockDispatch } = require_mock_utils();
	var { kDispatches: kDispatches$3, kDispatchKey, kDefaultHeaders, kDefaultTrailers, kContentLength, kMockDispatch } = require_mock_symbols();
	var { InvalidArgumentError: InvalidArgumentError$7 } = require_errors();
	var { buildURL } = require_util$7();
	var MockScope = class {
		constructor(mockDispatch$1) {
			this[kMockDispatch] = mockDispatch$1;
		}
		delay(waitInMs) {
			if (typeof waitInMs !== "number" || !Number.isInteger(waitInMs) || waitInMs <= 0) throw new InvalidArgumentError$7("waitInMs must be a valid integer > 0");
			this[kMockDispatch].delay = waitInMs;
			return this;
		}
		persist() {
			this[kMockDispatch].persist = true;
			return this;
		}
		times(repeatTimes) {
			if (typeof repeatTimes !== "number" || !Number.isInteger(repeatTimes) || repeatTimes <= 0) throw new InvalidArgumentError$7("repeatTimes must be a valid integer > 0");
			this[kMockDispatch].times = repeatTimes;
			return this;
		}
	};
	var MockInterceptor$2 = class {
		constructor(opts, mockDispatches) {
			if (typeof opts !== "object") throw new InvalidArgumentError$7("opts must be an object");
			if (typeof opts.path === "undefined") throw new InvalidArgumentError$7("opts.path must be defined");
			if (typeof opts.method === "undefined") opts.method = "GET";
			if (typeof opts.path === "string") if (opts.query) opts.path = buildURL(opts.path, opts.query);
			else {
				const parsedURL = new URL(opts.path, "data://");
				opts.path = parsedURL.pathname + parsedURL.search;
			}
			if (typeof opts.method === "string") opts.method = opts.method.toUpperCase();
			this[kDispatchKey] = buildKey(opts);
			this[kDispatches$3] = mockDispatches;
			this[kDefaultHeaders] = {};
			this[kDefaultTrailers] = {};
			this[kContentLength] = false;
		}
		createMockScopeDispatchData({ statusCode, data, responseOptions }) {
			const responseData = getResponseData(data);
			const contentLength = this[kContentLength] ? { "content-length": responseData.length } : {};
			const headers = {
				...this[kDefaultHeaders],
				...contentLength,
				...responseOptions.headers
			};
			const trailers = {
				...this[kDefaultTrailers],
				...responseOptions.trailers
			};
			return {
				statusCode,
				data,
				headers,
				trailers
			};
		}
		validateReplyParameters(replyParameters) {
			if (typeof replyParameters.statusCode === "undefined") throw new InvalidArgumentError$7("statusCode must be defined");
			if (typeof replyParameters.responseOptions !== "object" || replyParameters.responseOptions === null) throw new InvalidArgumentError$7("responseOptions must be an object");
		}
		reply(replyOptionsCallbackOrStatusCode) {
			if (typeof replyOptionsCallbackOrStatusCode === "function") {
				const wrappedDefaultsCallback = (opts) => {
					const resolvedData = replyOptionsCallbackOrStatusCode(opts);
					if (typeof resolvedData !== "object" || resolvedData === null) throw new InvalidArgumentError$7("reply options callback must return an object");
					const replyParameters$1 = {
						data: "",
						responseOptions: {},
						...resolvedData
					};
					this.validateReplyParameters(replyParameters$1);
					return { ...this.createMockScopeDispatchData(replyParameters$1) };
				};
				const newMockDispatch$1 = addMockDispatch(this[kDispatches$3], this[kDispatchKey], wrappedDefaultsCallback);
				return new MockScope(newMockDispatch$1);
			}
			const replyParameters = {
				statusCode: replyOptionsCallbackOrStatusCode,
				data: arguments[1] === void 0 ? "" : arguments[1],
				responseOptions: arguments[2] === void 0 ? {} : arguments[2]
			};
			this.validateReplyParameters(replyParameters);
			const dispatchData = this.createMockScopeDispatchData(replyParameters);
			const newMockDispatch = addMockDispatch(this[kDispatches$3], this[kDispatchKey], dispatchData);
			return new MockScope(newMockDispatch);
		}
		replyWithError(error) {
			if (typeof error === "undefined") throw new InvalidArgumentError$7("error must be defined");
			const newMockDispatch = addMockDispatch(this[kDispatches$3], this[kDispatchKey], { error });
			return new MockScope(newMockDispatch);
		}
		defaultReplyHeaders(headers) {
			if (typeof headers === "undefined") throw new InvalidArgumentError$7("headers must be defined");
			this[kDefaultHeaders] = headers;
			return this;
		}
		defaultReplyTrailers(trailers) {
			if (typeof trailers === "undefined") throw new InvalidArgumentError$7("trailers must be defined");
			this[kDefaultTrailers] = trailers;
			return this;
		}
		replyContentLength() {
			this[kContentLength] = true;
			return this;
		}
	};
	module.exports.MockInterceptor = MockInterceptor$2;
	module.exports.MockScope = MockScope;
}));
var require_mock_client = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { promisify: promisify$1 } = __require("node:util");
	var Client$2 = require_client();
	var { buildMockDispatch: buildMockDispatch$1 } = require_mock_utils();
	var { kDispatches: kDispatches$2, kMockAgent: kMockAgent$1, kClose: kClose$1, kOriginalClose: kOriginalClose$1, kOrigin: kOrigin$1, kOriginalDispatch: kOriginalDispatch$1, kConnected: kConnected$2 } = require_mock_symbols();
	var { MockInterceptor: MockInterceptor$1 } = require_mock_interceptor();
	var Symbols$1 = require_symbols$4();
	var { InvalidArgumentError: InvalidArgumentError$6 } = require_errors();
	var MockClient$2 = class extends Client$2 {
		constructor(origin, opts) {
			super(origin, opts);
			if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") throw new InvalidArgumentError$6("Argument opts.agent must implement Agent");
			this[kMockAgent$1] = opts.agent;
			this[kOrigin$1] = origin;
			this[kDispatches$2] = [];
			this[kConnected$2] = 1;
			this[kOriginalDispatch$1] = this.dispatch;
			this[kOriginalClose$1] = this.close.bind(this);
			this.dispatch = buildMockDispatch$1.call(this);
			this.close = this[kClose$1];
		}
		get [Symbols$1.kConnected]() {
			return this[kConnected$2];
		}
		intercept(opts) {
			return new MockInterceptor$1(opts, this[kDispatches$2]);
		}
		async [kClose$1]() {
			await promisify$1(this[kOriginalClose$1])();
			this[kConnected$2] = 0;
			this[kMockAgent$1][Symbols$1.kClients].delete(this[kOrigin$1]);
		}
	};
	module.exports = MockClient$2;
}));
var require_mock_pool = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { promisify } = __require("node:util");
	var Pool$1 = require_pool();
	var { buildMockDispatch } = require_mock_utils();
	var { kDispatches: kDispatches$1, kMockAgent, kClose, kOriginalClose, kOrigin, kOriginalDispatch, kConnected: kConnected$1 } = require_mock_symbols();
	var { MockInterceptor } = require_mock_interceptor();
	var Symbols = require_symbols$4();
	var { InvalidArgumentError: InvalidArgumentError$5 } = require_errors();
	var MockPool$2 = class extends Pool$1 {
		constructor(origin, opts) {
			super(origin, opts);
			if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") throw new InvalidArgumentError$5("Argument opts.agent must implement Agent");
			this[kMockAgent] = opts.agent;
			this[kOrigin] = origin;
			this[kDispatches$1] = [];
			this[kConnected$1] = 1;
			this[kOriginalDispatch] = this.dispatch;
			this[kOriginalClose] = this.close.bind(this);
			this.dispatch = buildMockDispatch.call(this);
			this.close = this[kClose];
		}
		get [Symbols.kConnected]() {
			return this[kConnected$1];
		}
		intercept(opts) {
			return new MockInterceptor(opts, this[kDispatches$1]);
		}
		async [kClose]() {
			await promisify(this[kOriginalClose])();
			this[kConnected$1] = 0;
			this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);
		}
	};
	module.exports = MockPool$2;
}));
var require_pluralizer = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var singulars = {
		pronoun: "it",
		is: "is",
		was: "was",
		this: "this"
	};
	var plurals = {
		pronoun: "they",
		is: "are",
		was: "were",
		this: "these"
	};
	module.exports = class Pluralizer$1 {
		constructor(singular, plural) {
			this.singular = singular;
			this.plural = plural;
		}
		pluralize(count) {
			const one = count === 1;
			const keys = one ? singulars : plurals;
			const noun = one ? this.singular : this.plural;
			return {
				...keys,
				count,
				noun
			};
		}
	};
}));
var require_pending_interceptors_formatter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Transform: Transform$1 } = __require("node:stream");
	var { Console } = __require("node:console");
	var PERSISTENT = process.versions.icu ? "✅" : "Y ";
	var NOT_PERSISTENT = process.versions.icu ? "❌" : "N ";
	module.exports = class PendingInterceptorsFormatter$1 {
		constructor({ disableColors } = {}) {
			this.transform = new Transform$1({ transform(chunk, _enc, cb) {
				cb(null, chunk);
			} });
			this.logger = new Console({
				stdout: this.transform,
				inspectOptions: { colors: !disableColors && !process.env.CI }
			});
		}
		format(pendingInterceptors) {
			const withPrettyHeaders = pendingInterceptors.map(({ method, path, data: { statusCode }, persist, times, timesInvoked, origin }) => ({
				Method: method,
				Origin: origin,
				Path: path,
				"Status code": statusCode,
				Persistent: persist ? PERSISTENT : NOT_PERSISTENT,
				Invocations: timesInvoked,
				Remaining: persist ? Infinity : times - timesInvoked
			}));
			this.logger.table(withPrettyHeaders);
			return this.transform.read().toString();
		}
	};
}));
var require_mock_agent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kClients } = require_symbols$4();
	var Agent$2 = require_agent();
	var { kAgent, kMockAgentSet, kMockAgentGet, kDispatches, kIsMockActive, kNetConnect, kGetNetConnect, kOptions, kFactory } = require_mock_symbols();
	var MockClient$1 = require_mock_client();
	var MockPool$1 = require_mock_pool();
	var { matchValue, buildMockOptions } = require_mock_utils();
	var { InvalidArgumentError: InvalidArgumentError$4, UndiciError } = require_errors();
	var Dispatcher$1 = require_dispatcher();
	var Pluralizer = require_pluralizer();
	var PendingInterceptorsFormatter = require_pending_interceptors_formatter();
	var MockAgent$1 = class extends Dispatcher$1 {
		constructor(opts) {
			super(opts);
			this[kNetConnect] = true;
			this[kIsMockActive] = true;
			if (opts?.agent && typeof opts.agent.dispatch !== "function") throw new InvalidArgumentError$4("Argument opts.agent must implement Agent");
			const agent = opts?.agent ? opts.agent : new Agent$2(opts);
			this[kAgent] = agent;
			this[kClients] = agent[kClients];
			this[kOptions] = buildMockOptions(opts);
		}
		get(origin) {
			let dispatcher = this[kMockAgentGet](origin);
			if (!dispatcher) {
				dispatcher = this[kFactory](origin);
				this[kMockAgentSet](origin, dispatcher);
			}
			return dispatcher;
		}
		dispatch(opts, handler) {
			this.get(opts.origin);
			return this[kAgent].dispatch(opts, handler);
		}
		async close() {
			await this[kAgent].close();
			this[kClients].clear();
		}
		deactivate() {
			this[kIsMockActive] = false;
		}
		activate() {
			this[kIsMockActive] = true;
		}
		enableNetConnect(matcher) {
			if (typeof matcher === "string" || typeof matcher === "function" || matcher instanceof RegExp) if (Array.isArray(this[kNetConnect])) this[kNetConnect].push(matcher);
			else this[kNetConnect] = [matcher];
			else if (typeof matcher === "undefined") this[kNetConnect] = true;
			else throw new InvalidArgumentError$4("Unsupported matcher. Must be one of String|Function|RegExp.");
		}
		disableNetConnect() {
			this[kNetConnect] = false;
		}
		get isMockActive() {
			return this[kIsMockActive];
		}
		[kMockAgentSet](origin, dispatcher) {
			this[kClients].set(origin, dispatcher);
		}
		[kFactory](origin) {
			const mockOptions = Object.assign({ agent: this }, this[kOptions]);
			return this[kOptions] && this[kOptions].connections === 1 ? new MockClient$1(origin, mockOptions) : new MockPool$1(origin, mockOptions);
		}
		[kMockAgentGet](origin) {
			const client = this[kClients].get(origin);
			if (client) return client;
			if (typeof origin !== "string") {
				const dispatcher = this[kFactory]("http://localhost:9999");
				this[kMockAgentSet](origin, dispatcher);
				return dispatcher;
			}
			for (const [keyMatcher, nonExplicitDispatcher] of Array.from(this[kClients])) if (nonExplicitDispatcher && typeof keyMatcher !== "string" && matchValue(keyMatcher, origin)) {
				const dispatcher = this[kFactory](origin);
				this[kMockAgentSet](origin, dispatcher);
				dispatcher[kDispatches] = nonExplicitDispatcher[kDispatches];
				return dispatcher;
			}
		}
		[kGetNetConnect]() {
			return this[kNetConnect];
		}
		pendingInterceptors() {
			const mockAgentClients = this[kClients];
			return Array.from(mockAgentClients.entries()).flatMap(([origin, scope]) => scope[kDispatches].map((dispatch) => ({
				...dispatch,
				origin
			}))).filter(({ pending }) => pending);
		}
		assertNoPendingInterceptors({ pendingInterceptorsFormatter = new PendingInterceptorsFormatter() } = {}) {
			const pending = this.pendingInterceptors();
			if (pending.length === 0) return;
			const pluralizer = new Pluralizer("interceptor", "interceptors").pluralize(pending.length);
			throw new UndiciError(`
${pluralizer.count} ${pluralizer.noun} ${pluralizer.is} pending:

${pendingInterceptorsFormatter.format(pending)}
`.trim());
		}
	};
	module.exports = MockAgent$1;
}));
var require_global = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var globalDispatcher = Symbol.for("undici.globalDispatcher.1");
	var { InvalidArgumentError: InvalidArgumentError$3 } = require_errors();
	var Agent$1 = require_agent();
	if (getGlobalDispatcher$3() === void 0) setGlobalDispatcher$1(new Agent$1());
	function setGlobalDispatcher$1(agent) {
		if (!agent || typeof agent.dispatch !== "function") throw new InvalidArgumentError$3("Argument agent must implement Agent");
		Object.defineProperty(globalThis, globalDispatcher, {
			value: agent,
			writable: true,
			enumerable: false,
			configurable: false
		});
	}
	function getGlobalDispatcher$3() {
		return globalThis[globalDispatcher];
	}
	module.exports = {
		setGlobalDispatcher: setGlobalDispatcher$1,
		getGlobalDispatcher: getGlobalDispatcher$3
	};
}));
var require_decorator_handler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = class DecoratorHandler$3 {
		#handler;
		constructor(handler) {
			if (typeof handler !== "object" || handler === null) throw new TypeError("handler must be an object");
			this.#handler = handler;
		}
		onConnect(...args) {
			return this.#handler.onConnect?.(...args);
		}
		onError(...args) {
			return this.#handler.onError?.(...args);
		}
		onUpgrade(...args) {
			return this.#handler.onUpgrade?.(...args);
		}
		onResponseStarted(...args) {
			return this.#handler.onResponseStarted?.(...args);
		}
		onHeaders(...args) {
			return this.#handler.onHeaders?.(...args);
		}
		onData(...args) {
			return this.#handler.onData?.(...args);
		}
		onComplete(...args) {
			return this.#handler.onComplete?.(...args);
		}
		onBodySent(...args) {
			return this.#handler.onBodySent?.(...args);
		}
	};
}));
var require_redirect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var RedirectHandler$1 = require_redirect_handler();
	module.exports = (opts) => {
		const globalMaxRedirections = opts?.maxRedirections;
		return (dispatch) => {
			return function redirectInterceptor(opts$1, handler) {
				const { maxRedirections = globalMaxRedirections,...baseOpts } = opts$1;
				if (!maxRedirections) return dispatch(opts$1, handler);
				const redirectHandler = new RedirectHandler$1(dispatch, maxRedirections, opts$1, handler);
				return dispatch(baseOpts, redirectHandler);
			};
		};
	};
}));
var require_retry = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var RetryHandler$1 = require_retry_handler();
	module.exports = (globalOpts) => {
		return (dispatch) => {
			return function retryInterceptor(opts, handler) {
				return dispatch(opts, new RetryHandler$1({
					...opts,
					retryOptions: {
						...globalOpts,
						...opts.retryOptions
					}
				}, {
					handler,
					dispatch
				}));
			};
		};
	};
}));
var require_dump = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var util$4 = require_util$7();
	var { InvalidArgumentError: InvalidArgumentError$2, RequestAbortedError } = require_errors();
	var DecoratorHandler$2 = require_decorator_handler();
	var DumpHandler = class extends DecoratorHandler$2 {
		#maxSize = 1024 * 1024;
		#abort = null;
		#dumped = false;
		#aborted = false;
		#size = 0;
		#reason = null;
		#handler = null;
		constructor({ maxSize }, handler) {
			super(handler);
			if (maxSize != null && (!Number.isFinite(maxSize) || maxSize < 1)) throw new InvalidArgumentError$2("maxSize must be a number greater than 0");
			this.#maxSize = maxSize ?? this.#maxSize;
			this.#handler = handler;
		}
		onConnect(abort$1) {
			this.#abort = abort$1;
			this.#handler.onConnect(this.#customAbort.bind(this));
		}
		#customAbort(reason) {
			this.#aborted = true;
			this.#reason = reason;
		}
		onHeaders(statusCode, rawHeaders, resume$1, statusMessage) {
			const contentLength = util$4.parseHeaders(rawHeaders)["content-length"];
			if (contentLength != null && contentLength > this.#maxSize) throw new RequestAbortedError(`Response size (${contentLength}) larger than maxSize (${this.#maxSize})`);
			if (this.#aborted) return true;
			return this.#handler.onHeaders(statusCode, rawHeaders, resume$1, statusMessage);
		}
		onError(err) {
			if (this.#dumped) return;
			err = this.#reason ?? err;
			this.#handler.onError(err);
		}
		onData(chunk) {
			this.#size = this.#size + chunk.length;
			if (this.#size >= this.#maxSize) {
				this.#dumped = true;
				if (this.#aborted) this.#handler.onError(this.#reason);
				else this.#handler.onComplete([]);
			}
			return true;
		}
		onComplete(trailers) {
			if (this.#dumped) return;
			if (this.#aborted) {
				this.#handler.onError(this.reason);
				return;
			}
			this.#handler.onComplete(trailers);
		}
	};
	function createDumpInterceptor({ maxSize: defaultMaxSize } = { maxSize: 1024 * 1024 }) {
		return (dispatch) => {
			return function Intercept(opts, handler) {
				const { dumpMaxSize = defaultMaxSize } = opts;
				const dumpHandler = new DumpHandler({ maxSize: dumpMaxSize }, handler);
				return dispatch(opts, dumpHandler);
			};
		};
	}
	module.exports = createDumpInterceptor;
}));
var require_dns = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { isIP } = __require("node:net");
	var { lookup } = __require("node:dns");
	var DecoratorHandler$1 = require_decorator_handler();
	var { InvalidArgumentError: InvalidArgumentError$1, InformationalError } = require_errors();
	var maxInt = Math.pow(2, 31) - 1;
	var DNSInstance = class {
		#maxTTL = 0;
		#maxItems = 0;
		#records = /* @__PURE__ */ new Map();
		dualStack = true;
		affinity = null;
		lookup = null;
		pick = null;
		constructor(opts) {
			this.#maxTTL = opts.maxTTL;
			this.#maxItems = opts.maxItems;
			this.dualStack = opts.dualStack;
			this.affinity = opts.affinity;
			this.lookup = opts.lookup ?? this.#defaultLookup;
			this.pick = opts.pick ?? this.#defaultPick;
		}
		get full() {
			return this.#records.size === this.#maxItems;
		}
		runLookup(origin, opts, cb) {
			const ips = this.#records.get(origin.hostname);
			if (ips == null && this.full) {
				cb(null, origin.origin);
				return;
			}
			const newOpts = {
				affinity: this.affinity,
				dualStack: this.dualStack,
				lookup: this.lookup,
				pick: this.pick,
				...opts.dns,
				maxTTL: this.#maxTTL,
				maxItems: this.#maxItems
			};
			if (ips == null) this.lookup(origin, newOpts, (err, addresses) => {
				if (err || addresses == null || addresses.length === 0) {
					cb(err ?? new InformationalError("No DNS entries found"));
					return;
				}
				this.setRecords(origin, addresses);
				const records = this.#records.get(origin.hostname);
				const ip = this.pick(origin, records, newOpts.affinity);
				let port;
				if (typeof ip.port === "number") port = `:${ip.port}`;
				else if (origin.port !== "") port = `:${origin.port}`;
				else port = "";
				cb(null, `${origin.protocol}//${ip.family === 6 ? `[${ip.address}]` : ip.address}${port}`);
			});
			else {
				const ip = this.pick(origin, ips, newOpts.affinity);
				if (ip == null) {
					this.#records.delete(origin.hostname);
					this.runLookup(origin, opts, cb);
					return;
				}
				let port;
				if (typeof ip.port === "number") port = `:${ip.port}`;
				else if (origin.port !== "") port = `:${origin.port}`;
				else port = "";
				cb(null, `${origin.protocol}//${ip.family === 6 ? `[${ip.address}]` : ip.address}${port}`);
			}
		}
		#defaultLookup(origin, opts, cb) {
			lookup(origin.hostname, {
				all: true,
				family: this.dualStack === false ? this.affinity : 0,
				order: "ipv4first"
			}, (err, addresses) => {
				if (err) return cb(err);
				const results = /* @__PURE__ */ new Map();
				for (const addr of addresses) results.set(`${addr.address}:${addr.family}`, addr);
				cb(null, results.values());
			});
		}
		#defaultPick(origin, hostnameRecords, affinity) {
			let ip = null;
			const { records, offset } = hostnameRecords;
			let family;
			if (this.dualStack) {
				if (affinity == null) if (offset == null || offset === maxInt) {
					hostnameRecords.offset = 0;
					affinity = 4;
				} else {
					hostnameRecords.offset++;
					affinity = (hostnameRecords.offset & 1) === 1 ? 6 : 4;
				}
				if (records[affinity] != null && records[affinity].ips.length > 0) family = records[affinity];
				else family = records[affinity === 4 ? 6 : 4];
			} else family = records[affinity];
			if (family == null || family.ips.length === 0) return ip;
			if (family.offset == null || family.offset === maxInt) family.offset = 0;
			else family.offset++;
			const position = family.offset % family.ips.length;
			ip = family.ips[position] ?? null;
			if (ip == null) return ip;
			if (Date.now() - ip.timestamp > ip.ttl) {
				family.ips.splice(position, 1);
				return this.pick(origin, hostnameRecords, affinity);
			}
			return ip;
		}
		setRecords(origin, addresses) {
			const timestamp = Date.now();
			const records = { records: {
				4: null,
				6: null
			} };
			for (const record of addresses) {
				record.timestamp = timestamp;
				if (typeof record.ttl === "number") record.ttl = Math.min(record.ttl, this.#maxTTL);
				else record.ttl = this.#maxTTL;
				const familyRecords = records.records[record.family] ?? { ips: [] };
				familyRecords.ips.push(record);
				records.records[record.family] = familyRecords;
			}
			this.#records.set(origin.hostname, records);
		}
		getHandler(meta, opts) {
			return new DNSDispatchHandler(this, meta, opts);
		}
	};
	var DNSDispatchHandler = class extends DecoratorHandler$1 {
		#state = null;
		#opts = null;
		#dispatch = null;
		#handler = null;
		#origin = null;
		constructor(state, { origin, handler, dispatch }, opts) {
			super(handler);
			this.#origin = origin;
			this.#handler = handler;
			this.#opts = { ...opts };
			this.#state = state;
			this.#dispatch = dispatch;
		}
		onError(err) {
			switch (err.code) {
				case "ETIMEDOUT":
				case "ECONNREFUSED":
					if (this.#state.dualStack) {
						this.#state.runLookup(this.#origin, this.#opts, (err$1, newOrigin) => {
							if (err$1) return this.#handler.onError(err$1);
							const dispatchOpts = {
								...this.#opts,
								origin: newOrigin
							};
							this.#dispatch(dispatchOpts, this);
						});
						return;
					}
					this.#handler.onError(err);
					return;
				case "ENOTFOUND": this.#state.deleteRecord(this.#origin);
				default:
					this.#handler.onError(err);
					break;
			}
		}
	};
	module.exports = (interceptorOpts) => {
		if (interceptorOpts?.maxTTL != null && (typeof interceptorOpts?.maxTTL !== "number" || interceptorOpts?.maxTTL < 0)) throw new InvalidArgumentError$1("Invalid maxTTL. Must be a positive number");
		if (interceptorOpts?.maxItems != null && (typeof interceptorOpts?.maxItems !== "number" || interceptorOpts?.maxItems < 1)) throw new InvalidArgumentError$1("Invalid maxItems. Must be a positive number and greater than zero");
		if (interceptorOpts?.affinity != null && interceptorOpts?.affinity !== 4 && interceptorOpts?.affinity !== 6) throw new InvalidArgumentError$1("Invalid affinity. Must be either 4 or 6");
		if (interceptorOpts?.dualStack != null && typeof interceptorOpts?.dualStack !== "boolean") throw new InvalidArgumentError$1("Invalid dualStack. Must be a boolean");
		if (interceptorOpts?.lookup != null && typeof interceptorOpts?.lookup !== "function") throw new InvalidArgumentError$1("Invalid lookup. Must be a function");
		if (interceptorOpts?.pick != null && typeof interceptorOpts?.pick !== "function") throw new InvalidArgumentError$1("Invalid pick. Must be a function");
		const dualStack = interceptorOpts?.dualStack ?? true;
		let affinity;
		if (dualStack) affinity = interceptorOpts?.affinity ?? null;
		else affinity = interceptorOpts?.affinity ?? 4;
		const opts = {
			maxTTL: interceptorOpts?.maxTTL ?? 1e4,
			lookup: interceptorOpts?.lookup ?? null,
			pick: interceptorOpts?.pick ?? null,
			dualStack,
			affinity,
			maxItems: interceptorOpts?.maxItems ?? Infinity
		};
		const instance = new DNSInstance(opts);
		return (dispatch) => {
			return function dnsInterceptor(origDispatchOpts, handler) {
				const origin = origDispatchOpts.origin.constructor === URL ? origDispatchOpts.origin : new URL(origDispatchOpts.origin);
				if (isIP(origin.hostname) !== 0) return dispatch(origDispatchOpts, handler);
				instance.runLookup(origin, origDispatchOpts, (err, newOrigin) => {
					if (err) return handler.onError(err);
					let dispatchOpts = null;
					dispatchOpts = {
						...origDispatchOpts,
						servername: origin.hostname,
						origin: newOrigin,
						headers: {
							host: origin.hostname,
							...origDispatchOpts.headers
						}
					};
					dispatch(dispatchOpts, instance.getHandler({
						origin,
						dispatch,
						handler
					}, origDispatchOpts));
				});
				return true;
			};
		};
	};
}));
var require_headers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kConstruct: kConstruct$6 } = require_symbols$4();
	var { kEnumerableProperty: kEnumerableProperty$8 } = require_util$7();
	var { iteratorMixin, isValidHeaderName: isValidHeaderName$1, isValidHeaderValue } = require_util$6();
	var { webidl: webidl$11 } = require_webidl();
	var assert$7 = __require("node:assert");
	var util$3 = __require("node:util");
	var kHeadersMap = Symbol("headers map");
	var kHeadersSortedMap = Symbol("headers map sorted");
	function isHTTPWhiteSpaceCharCode(code) {
		return code === 10 || code === 13 || code === 9 || code === 32;
	}
	function headerValueNormalize(potentialValue) {
		let i = 0;
		let j = potentialValue.length;
		while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(j - 1))) --j;
		while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(i))) ++i;
		return i === 0 && j === potentialValue.length ? potentialValue : potentialValue.substring(i, j);
	}
	function fill$1(headers, object) {
		if (Array.isArray(object)) for (let i = 0; i < object.length; ++i) {
			const header = object[i];
			if (header.length !== 2) throw webidl$11.errors.exception({
				header: "Headers constructor",
				message: `expected name/value pair to be length 2, found ${header.length}.`
			});
			appendHeader(headers, header[0], header[1]);
		}
		else if (typeof object === "object" && object !== null) {
			const keys = Object.keys(object);
			for (let i = 0; i < keys.length; ++i) appendHeader(headers, keys[i], object[keys[i]]);
		} else throw webidl$11.errors.conversionFailed({
			prefix: "Headers constructor",
			argument: "Argument 1",
			types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
		});
	}
	function appendHeader(headers, name, value) {
		value = headerValueNormalize(value);
		if (!isValidHeaderName$1(name)) throw webidl$11.errors.invalidArgument({
			prefix: "Headers.append",
			value: name,
			type: "header name"
		});
		else if (!isValidHeaderValue(value)) throw webidl$11.errors.invalidArgument({
			prefix: "Headers.append",
			value,
			type: "header value"
		});
		if (getHeadersGuard$2(headers) === "immutable") throw new TypeError("immutable");
		return getHeadersList$2(headers).append(name, value, false);
	}
	function compareHeaderName(a, b) {
		return a[0] < b[0] ? -1 : 1;
	}
	var HeadersList$3 = class HeadersList$3 {
		cookies = null;
		constructor(init) {
			if (init instanceof HeadersList$3) {
				this[kHeadersMap] = new Map(init[kHeadersMap]);
				this[kHeadersSortedMap] = init[kHeadersSortedMap];
				this.cookies = init.cookies === null ? null : [...init.cookies];
			} else {
				this[kHeadersMap] = new Map(init);
				this[kHeadersSortedMap] = null;
			}
		}
		contains(name, isLowerCase) {
			return this[kHeadersMap].has(isLowerCase ? name : name.toLowerCase());
		}
		clear() {
			this[kHeadersMap].clear();
			this[kHeadersSortedMap] = null;
			this.cookies = null;
		}
		append(name, value, isLowerCase) {
			this[kHeadersSortedMap] = null;
			const lowercaseName = isLowerCase ? name : name.toLowerCase();
			const exists = this[kHeadersMap].get(lowercaseName);
			if (exists) {
				const delimiter = lowercaseName === "cookie" ? "; " : ", ";
				this[kHeadersMap].set(lowercaseName, {
					name: exists.name,
					value: `${exists.value}${delimiter}${value}`
				});
			} else this[kHeadersMap].set(lowercaseName, {
				name,
				value
			});
			if (lowercaseName === "set-cookie") (this.cookies ??= []).push(value);
		}
		set(name, value, isLowerCase) {
			this[kHeadersSortedMap] = null;
			const lowercaseName = isLowerCase ? name : name.toLowerCase();
			if (lowercaseName === "set-cookie") this.cookies = [value];
			this[kHeadersMap].set(lowercaseName, {
				name,
				value
			});
		}
		delete(name, isLowerCase) {
			this[kHeadersSortedMap] = null;
			if (!isLowerCase) name = name.toLowerCase();
			if (name === "set-cookie") this.cookies = null;
			this[kHeadersMap].delete(name);
		}
		get(name, isLowerCase) {
			return this[kHeadersMap].get(isLowerCase ? name : name.toLowerCase())?.value ?? null;
		}
		*[Symbol.iterator]() {
			for (const { 0: name, 1: { value } } of this[kHeadersMap]) yield [name, value];
		}
		get entries() {
			const headers = {};
			if (this[kHeadersMap].size !== 0) for (const { name, value } of this[kHeadersMap].values()) headers[name] = value;
			return headers;
		}
		rawValues() {
			return this[kHeadersMap].values();
		}
		get entriesList() {
			const headers = [];
			if (this[kHeadersMap].size !== 0) for (const { 0: lowerName, 1: { name, value } } of this[kHeadersMap]) if (lowerName === "set-cookie") for (const cookie of this.cookies) headers.push([name, cookie]);
			else headers.push([name, value]);
			return headers;
		}
		toSortedArray() {
			const size = this[kHeadersMap].size;
			const array = new Array(size);
			if (size <= 32) {
				if (size === 0) return array;
				const iterator = this[kHeadersMap][Symbol.iterator]();
				const firstValue = iterator.next().value;
				array[0] = [firstValue[0], firstValue[1].value];
				assert$7(firstValue[1].value !== null);
				for (let i = 1, j = 0, right = 0, left = 0, pivot = 0, x, value; i < size; ++i) {
					value = iterator.next().value;
					x = array[i] = [value[0], value[1].value];
					assert$7(x[1] !== null);
					left = 0;
					right = i;
					while (left < right) {
						pivot = left + (right - left >> 1);
						if (array[pivot][0] <= x[0]) left = pivot + 1;
						else right = pivot;
					}
					if (i !== pivot) {
						j = i;
						while (j > left) array[j] = array[--j];
						array[left] = x;
					}
				}
				/* c8 ignore next 4 */
				if (!iterator.next().done) throw new TypeError("Unreachable");
				return array;
			} else {
				let i = 0;
				for (const { 0: name, 1: { value } } of this[kHeadersMap]) {
					array[i++] = [name, value];
					assert$7(value !== null);
				}
				return array.sort(compareHeaderName);
			}
		}
	};
	var Headers$4 = class Headers$4 {
		#guard;
		#headersList;
		constructor(init = void 0) {
			webidl$11.util.markAsUncloneable(this);
			if (init === kConstruct$6) return;
			this.#headersList = new HeadersList$3();
			this.#guard = "none";
			if (init !== void 0) {
				init = webidl$11.converters.HeadersInit(init, "Headers contructor", "init");
				fill$1(this, init);
			}
		}
		append(name, value) {
			webidl$11.brandCheck(this, Headers$4);
			webidl$11.argumentLengthCheck(arguments, 2, "Headers.append");
			const prefix = "Headers.append";
			name = webidl$11.converters.ByteString(name, prefix, "name");
			value = webidl$11.converters.ByteString(value, prefix, "value");
			return appendHeader(this, name, value);
		}
		delete(name) {
			webidl$11.brandCheck(this, Headers$4);
			webidl$11.argumentLengthCheck(arguments, 1, "Headers.delete");
			name = webidl$11.converters.ByteString(name, "Headers.delete", "name");
			if (!isValidHeaderName$1(name)) throw webidl$11.errors.invalidArgument({
				prefix: "Headers.delete",
				value: name,
				type: "header name"
			});
			if (this.#guard === "immutable") throw new TypeError("immutable");
			if (!this.#headersList.contains(name, false)) return;
			this.#headersList.delete(name, false);
		}
		get(name) {
			webidl$11.brandCheck(this, Headers$4);
			webidl$11.argumentLengthCheck(arguments, 1, "Headers.get");
			const prefix = "Headers.get";
			name = webidl$11.converters.ByteString(name, prefix, "name");
			if (!isValidHeaderName$1(name)) throw webidl$11.errors.invalidArgument({
				prefix,
				value: name,
				type: "header name"
			});
			return this.#headersList.get(name, false);
		}
		has(name) {
			webidl$11.brandCheck(this, Headers$4);
			webidl$11.argumentLengthCheck(arguments, 1, "Headers.has");
			const prefix = "Headers.has";
			name = webidl$11.converters.ByteString(name, prefix, "name");
			if (!isValidHeaderName$1(name)) throw webidl$11.errors.invalidArgument({
				prefix,
				value: name,
				type: "header name"
			});
			return this.#headersList.contains(name, false);
		}
		set(name, value) {
			webidl$11.brandCheck(this, Headers$4);
			webidl$11.argumentLengthCheck(arguments, 2, "Headers.set");
			const prefix = "Headers.set";
			name = webidl$11.converters.ByteString(name, prefix, "name");
			value = webidl$11.converters.ByteString(value, prefix, "value");
			value = headerValueNormalize(value);
			if (!isValidHeaderName$1(name)) throw webidl$11.errors.invalidArgument({
				prefix,
				value: name,
				type: "header name"
			});
			else if (!isValidHeaderValue(value)) throw webidl$11.errors.invalidArgument({
				prefix,
				value,
				type: "header value"
			});
			if (this.#guard === "immutable") throw new TypeError("immutable");
			this.#headersList.set(name, value, false);
		}
		getSetCookie() {
			webidl$11.brandCheck(this, Headers$4);
			const list = this.#headersList.cookies;
			if (list) return [...list];
			return [];
		}
		get [kHeadersSortedMap]() {
			if (this.#headersList[kHeadersSortedMap]) return this.#headersList[kHeadersSortedMap];
			const headers = [];
			const names = this.#headersList.toSortedArray();
			const cookies = this.#headersList.cookies;
			if (cookies === null || cookies.length === 1) return this.#headersList[kHeadersSortedMap] = names;
			for (let i = 0; i < names.length; ++i) {
				const { 0: name, 1: value } = names[i];
				if (name === "set-cookie") for (let j = 0; j < cookies.length; ++j) headers.push([name, cookies[j]]);
				else headers.push([name, value]);
			}
			return this.#headersList[kHeadersSortedMap] = headers;
		}
		[util$3.inspect.custom](depth, options) {
			options.depth ??= depth;
			return `Headers ${util$3.formatWithOptions(options, this.#headersList.entries)}`;
		}
		static getHeadersGuard(o) {
			return o.#guard;
		}
		static setHeadersGuard(o, guard) {
			o.#guard = guard;
		}
		static getHeadersList(o) {
			return o.#headersList;
		}
		static setHeadersList(o, list) {
			o.#headersList = list;
		}
	};
	var { getHeadersGuard: getHeadersGuard$2, setHeadersGuard: setHeadersGuard$2, getHeadersList: getHeadersList$2, setHeadersList: setHeadersList$2 } = Headers$4;
	Reflect.deleteProperty(Headers$4, "getHeadersGuard");
	Reflect.deleteProperty(Headers$4, "setHeadersGuard");
	Reflect.deleteProperty(Headers$4, "getHeadersList");
	Reflect.deleteProperty(Headers$4, "setHeadersList");
	iteratorMixin("Headers", Headers$4, kHeadersSortedMap, 0, 1);
	Object.defineProperties(Headers$4.prototype, {
		append: kEnumerableProperty$8,
		delete: kEnumerableProperty$8,
		get: kEnumerableProperty$8,
		has: kEnumerableProperty$8,
		set: kEnumerableProperty$8,
		getSetCookie: kEnumerableProperty$8,
		[Symbol.toStringTag]: {
			value: "Headers",
			configurable: true
		},
		[util$3.inspect.custom]: { enumerable: false }
	});
	webidl$11.converters.HeadersInit = function(V, prefix, argument) {
		if (webidl$11.util.Type(V) === "Object") {
			const iterator = Reflect.get(V, Symbol.iterator);
			if (!util$3.types.isProxy(V) && iterator === Headers$4.prototype.entries) try {
				return getHeadersList$2(V).entriesList;
			} catch {}
			if (typeof iterator === "function") return webidl$11.converters["sequence<sequence<ByteString>>"](V, prefix, argument, iterator.bind(V));
			return webidl$11.converters["record<ByteString, ByteString>"](V, prefix, argument);
		}
		throw webidl$11.errors.conversionFailed({
			prefix: "Headers constructor",
			argument: "Argument 1",
			types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
		});
	};
	module.exports = {
		fill: fill$1,
		compareHeaderName,
		Headers: Headers$4,
		HeadersList: HeadersList$3,
		getHeadersGuard: getHeadersGuard$2,
		setHeadersGuard: setHeadersGuard$2,
		setHeadersList: setHeadersList$2,
		getHeadersList: getHeadersList$2
	};
}));
var require_response = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Headers: Headers$3, HeadersList: HeadersList$2, fill, getHeadersGuard: getHeadersGuard$1, setHeadersGuard: setHeadersGuard$1, setHeadersList: setHeadersList$1 } = require_headers();
	var { extractBody: extractBody$2, cloneBody: cloneBody$1, mixinBody: mixinBody$1, hasFinalizationRegistry, streamRegistry, bodyUnusable: bodyUnusable$1 } = require_body();
	var util$2 = require_util$7();
	var nodeUtil$1 = __require("node:util");
	var { kEnumerableProperty: kEnumerableProperty$7 } = util$2;
	var { isValidReasonPhrase, isCancelled: isCancelled$1, isAborted: isAborted$1, isBlobLike: isBlobLike$2, serializeJavascriptValueToJSONString, isErrorLike: isErrorLike$1, isomorphicEncode: isomorphicEncode$1, environmentSettingsObject: relevantRealm } = require_util$6();
	var { redirectStatusSet: redirectStatusSet$1, nullBodyStatus: nullBodyStatus$1 } = require_constants$2();
	var { kState: kState$6, kHeaders: kHeaders$1 } = require_symbols$3();
	var { webidl: webidl$10 } = require_webidl();
	var { FormData: FormData$1 } = require_formdata();
	var { URLSerializer: URLSerializer$3 } = require_data_url();
	var { kConstruct: kConstruct$5 } = require_symbols$4();
	var assert$6 = __require("node:assert");
	var { types: types$2 } = __require("node:util");
	var textEncoder = new TextEncoder("utf-8");
	var Response$2 = class Response$2 {
		static error() {
			return fromInnerResponse$2(makeNetworkError$1(), "immutable");
		}
		static json(data, init = {}) {
			webidl$10.argumentLengthCheck(arguments, 1, "Response.json");
			if (init !== null) init = webidl$10.converters.ResponseInit(init);
			const bytes = textEncoder.encode(serializeJavascriptValueToJSONString(data));
			const body = extractBody$2(bytes);
			const responseObject = fromInnerResponse$2(makeResponse$1({}), "response");
			initializeResponse(responseObject, init, {
				body: body[0],
				type: "application/json"
			});
			return responseObject;
		}
		static redirect(url, status = 302) {
			webidl$10.argumentLengthCheck(arguments, 1, "Response.redirect");
			url = webidl$10.converters.USVString(url);
			status = webidl$10.converters["unsigned short"](status);
			let parsedURL;
			try {
				parsedURL = new URL(url, relevantRealm.settingsObject.baseUrl);
			} catch (err) {
				throw new TypeError(`Failed to parse URL from ${url}`, { cause: err });
			}
			if (!redirectStatusSet$1.has(status)) throw new RangeError(`Invalid status code ${status}`);
			const responseObject = fromInnerResponse$2(makeResponse$1({}), "immutable");
			responseObject[kState$6].status = status;
			const value = isomorphicEncode$1(URLSerializer$3(parsedURL));
			responseObject[kState$6].headersList.append("location", value, true);
			return responseObject;
		}
		constructor(body = null, init = {}) {
			webidl$10.util.markAsUncloneable(this);
			if (body === kConstruct$5) return;
			if (body !== null) body = webidl$10.converters.BodyInit(body);
			init = webidl$10.converters.ResponseInit(init);
			this[kState$6] = makeResponse$1({});
			this[kHeaders$1] = new Headers$3(kConstruct$5);
			setHeadersGuard$1(this[kHeaders$1], "response");
			setHeadersList$1(this[kHeaders$1], this[kState$6].headersList);
			let bodyWithType = null;
			if (body != null) {
				const [extractedBody, type] = extractBody$2(body);
				bodyWithType = {
					body: extractedBody,
					type
				};
			}
			initializeResponse(this, init, bodyWithType);
		}
		get type() {
			webidl$10.brandCheck(this, Response$2);
			return this[kState$6].type;
		}
		get url() {
			webidl$10.brandCheck(this, Response$2);
			const urlList = this[kState$6].urlList;
			const url = urlList[urlList.length - 1] ?? null;
			if (url === null) return "";
			return URLSerializer$3(url, true);
		}
		get redirected() {
			webidl$10.brandCheck(this, Response$2);
			return this[kState$6].urlList.length > 1;
		}
		get status() {
			webidl$10.brandCheck(this, Response$2);
			return this[kState$6].status;
		}
		get ok() {
			webidl$10.brandCheck(this, Response$2);
			return this[kState$6].status >= 200 && this[kState$6].status <= 299;
		}
		get statusText() {
			webidl$10.brandCheck(this, Response$2);
			return this[kState$6].statusText;
		}
		get headers() {
			webidl$10.brandCheck(this, Response$2);
			return this[kHeaders$1];
		}
		get body() {
			webidl$10.brandCheck(this, Response$2);
			return this[kState$6].body ? this[kState$6].body.stream : null;
		}
		get bodyUsed() {
			webidl$10.brandCheck(this, Response$2);
			return !!this[kState$6].body && util$2.isDisturbed(this[kState$6].body.stream);
		}
		clone() {
			webidl$10.brandCheck(this, Response$2);
			if (bodyUnusable$1(this)) throw webidl$10.errors.exception({
				header: "Response.clone",
				message: "Body has already been consumed."
			});
			const clonedResponse = cloneResponse$1(this[kState$6]);
			return fromInnerResponse$2(clonedResponse, getHeadersGuard$1(this[kHeaders$1]));
		}
		[nodeUtil$1.inspect.custom](depth, options) {
			if (options.depth === null) options.depth = 2;
			options.colors ??= true;
			const properties = {
				status: this.status,
				statusText: this.statusText,
				headers: this.headers,
				body: this.body,
				bodyUsed: this.bodyUsed,
				ok: this.ok,
				redirected: this.redirected,
				type: this.type,
				url: this.url
			};
			return `Response ${nodeUtil$1.formatWithOptions(options, properties)}`;
		}
	};
	mixinBody$1(Response$2);
	Object.defineProperties(Response$2.prototype, {
		type: kEnumerableProperty$7,
		url: kEnumerableProperty$7,
		status: kEnumerableProperty$7,
		ok: kEnumerableProperty$7,
		redirected: kEnumerableProperty$7,
		statusText: kEnumerableProperty$7,
		headers: kEnumerableProperty$7,
		clone: kEnumerableProperty$7,
		body: kEnumerableProperty$7,
		bodyUsed: kEnumerableProperty$7,
		[Symbol.toStringTag]: {
			value: "Response",
			configurable: true
		}
	});
	Object.defineProperties(Response$2, {
		json: kEnumerableProperty$7,
		redirect: kEnumerableProperty$7,
		error: kEnumerableProperty$7
	});
	function cloneResponse$1(response) {
		if (response.internalResponse) return filterResponse$1(cloneResponse$1(response.internalResponse), response.type);
		const newResponse = makeResponse$1({
			...response,
			body: null
		});
		if (response.body != null) newResponse.body = cloneBody$1(newResponse, response.body);
		return newResponse;
	}
	function makeResponse$1(init) {
		return {
			aborted: false,
			rangeRequested: false,
			timingAllowPassed: false,
			requestIncludesCredentials: false,
			type: "default",
			status: 200,
			timingInfo: null,
			cacheState: "",
			statusText: "",
			...init,
			headersList: init?.headersList ? new HeadersList$2(init?.headersList) : new HeadersList$2(),
			urlList: init?.urlList ? [...init.urlList] : []
		};
	}
	function makeNetworkError$1(reason) {
		const isError = isErrorLike$1(reason);
		return makeResponse$1({
			type: "error",
			status: 0,
			error: isError ? reason : new Error(reason ? String(reason) : reason),
			aborted: reason && reason.name === "AbortError"
		});
	}
	function isNetworkError$1(response) {
		return response.type === "error" && response.status === 0;
	}
	function makeFilteredResponse(response, state) {
		state = {
			internalResponse: response,
			...state
		};
		return new Proxy(response, {
			get(target, p) {
				return p in state ? state[p] : target[p];
			},
			set(target, p, value) {
				assert$6(!(p in state));
				target[p] = value;
				return true;
			}
		});
	}
	function filterResponse$1(response, type) {
		if (type === "basic") return makeFilteredResponse(response, {
			type: "basic",
			headersList: response.headersList
		});
		else if (type === "cors") return makeFilteredResponse(response, {
			type: "cors",
			headersList: response.headersList
		});
		else if (type === "opaque") return makeFilteredResponse(response, {
			type: "opaque",
			urlList: Object.freeze([]),
			status: 0,
			statusText: "",
			body: null
		});
		else if (type === "opaqueredirect") return makeFilteredResponse(response, {
			type: "opaqueredirect",
			status: 0,
			statusText: "",
			headersList: [],
			body: null
		});
		else assert$6(false);
	}
	function makeAppropriateNetworkError$1(fetchParams, err = null) {
		assert$6(isCancelled$1(fetchParams));
		return isAborted$1(fetchParams) ? makeNetworkError$1(Object.assign(new DOMException("The operation was aborted.", "AbortError"), { cause: err })) : makeNetworkError$1(Object.assign(new DOMException("Request was cancelled."), { cause: err }));
	}
	function initializeResponse(response, init, body) {
		if (init.status !== null && (init.status < 200 || init.status > 599)) throw new RangeError("init[\"status\"] must be in the range of 200 to 599, inclusive.");
		if ("statusText" in init && init.statusText != null) {
			if (!isValidReasonPhrase(String(init.statusText))) throw new TypeError("Invalid statusText");
		}
		if ("status" in init && init.status != null) response[kState$6].status = init.status;
		if ("statusText" in init && init.statusText != null) response[kState$6].statusText = init.statusText;
		if ("headers" in init && init.headers != null) fill(response[kHeaders$1], init.headers);
		if (body) {
			if (nullBodyStatus$1.includes(response.status)) throw webidl$10.errors.exception({
				header: "Response constructor",
				message: `Invalid response status code ${response.status}`
			});
			response[kState$6].body = body.body;
			if (body.type != null && !response[kState$6].headersList.contains("content-type", true)) response[kState$6].headersList.append("content-type", body.type, true);
		}
	}
	function fromInnerResponse$2(innerResponse, guard) {
		const response = new Response$2(kConstruct$5);
		response[kState$6] = innerResponse;
		response[kHeaders$1] = new Headers$3(kConstruct$5);
		setHeadersList$1(response[kHeaders$1], innerResponse.headersList);
		setHeadersGuard$1(response[kHeaders$1], guard);
		if (hasFinalizationRegistry && innerResponse.body?.stream) streamRegistry.register(response, new WeakRef(innerResponse.body.stream));
		return response;
	}
	webidl$10.converters.ReadableStream = webidl$10.interfaceConverter(ReadableStream);
	webidl$10.converters.FormData = webidl$10.interfaceConverter(FormData$1);
	webidl$10.converters.URLSearchParams = webidl$10.interfaceConverter(URLSearchParams);
	webidl$10.converters.XMLHttpRequestBodyInit = function(V, prefix, name) {
		if (typeof V === "string") return webidl$10.converters.USVString(V, prefix, name);
		if (isBlobLike$2(V)) return webidl$10.converters.Blob(V, prefix, name, { strict: false });
		if (ArrayBuffer.isView(V) || types$2.isArrayBuffer(V)) return webidl$10.converters.BufferSource(V, prefix, name);
		if (util$2.isFormDataLike(V)) return webidl$10.converters.FormData(V, prefix, name, { strict: false });
		if (V instanceof URLSearchParams) return webidl$10.converters.URLSearchParams(V, prefix, name);
		return webidl$10.converters.DOMString(V, prefix, name);
	};
	webidl$10.converters.BodyInit = function(V, prefix, argument) {
		if (V instanceof ReadableStream) return webidl$10.converters.ReadableStream(V, prefix, argument);
		if (V?.[Symbol.asyncIterator]) return V;
		return webidl$10.converters.XMLHttpRequestBodyInit(V, prefix, argument);
	};
	webidl$10.converters.ResponseInit = webidl$10.dictionaryConverter([
		{
			key: "status",
			converter: webidl$10.converters["unsigned short"],
			defaultValue: () => 200
		},
		{
			key: "statusText",
			converter: webidl$10.converters.ByteString,
			defaultValue: () => ""
		},
		{
			key: "headers",
			converter: webidl$10.converters.HeadersInit
		}
	]);
	module.exports = {
		isNetworkError: isNetworkError$1,
		makeNetworkError: makeNetworkError$1,
		makeResponse: makeResponse$1,
		makeAppropriateNetworkError: makeAppropriateNetworkError$1,
		filterResponse: filterResponse$1,
		Response: Response$2,
		cloneResponse: cloneResponse$1,
		fromInnerResponse: fromInnerResponse$2
	};
}));
var require_dispatcher_weakref = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kConnected, kSize } = require_symbols$4();
	var CompatWeakRef = class {
		constructor(value) {
			this.value = value;
		}
		deref() {
			return this.value[kConnected] === 0 && this.value[kSize] === 0 ? void 0 : this.value;
		}
	};
	var CompatFinalizer = class {
		constructor(finalizer) {
			this.finalizer = finalizer;
		}
		register(dispatcher, key) {
			if (dispatcher.on) dispatcher.on("disconnect", () => {
				if (dispatcher[kConnected] === 0 && dispatcher[kSize] === 0) this.finalizer(key);
			});
		}
		unregister(key) {}
	};
	module.exports = function() {
		if (process.env.NODE_V8_COVERAGE && process.version.startsWith("v18")) {
			process._rawDebug("Using compatibility WeakRef and FinalizationRegistry");
			return {
				WeakRef: CompatWeakRef,
				FinalizationRegistry: CompatFinalizer
			};
		}
		return {
			WeakRef,
			FinalizationRegistry
		};
	};
}));
var require_request = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { extractBody: extractBody$1, mixinBody, cloneBody, bodyUnusable } = require_body();
	var { Headers: Headers$2, fill: fillHeaders, HeadersList: HeadersList$1, setHeadersGuard, getHeadersGuard, setHeadersList, getHeadersList: getHeadersList$1 } = require_headers();
	var { FinalizationRegistry: FinalizationRegistry$1 } = require_dispatcher_weakref()();
	var util$1 = require_util$7();
	var nodeUtil = __require("node:util");
	var { isValidHTTPToken, sameOrigin: sameOrigin$1, environmentSettingsObject: environmentSettingsObject$2 } = require_util$6();
	var { forbiddenMethodsSet, corsSafeListedMethodsSet, referrerPolicy, requestRedirect, requestMode, requestCredentials, requestCache, requestDuplex } = require_constants$2();
	var { kEnumerableProperty: kEnumerableProperty$6, normalizedMethodRecordsBase, normalizedMethodRecords } = util$1;
	var { kHeaders, kSignal, kState: kState$5, kDispatcher: kDispatcher$1 } = require_symbols$3();
	var { webidl: webidl$9 } = require_webidl();
	var { URLSerializer: URLSerializer$2 } = require_data_url();
	var { kConstruct: kConstruct$4 } = require_symbols$4();
	var assert$5 = __require("node:assert");
	var { getMaxListeners, setMaxListeners, getEventListeners, defaultMaxListeners } = __require("node:events");
	var kAbortController = Symbol("abortController");
	var requestFinalizer = new FinalizationRegistry$1(({ signal, abort: abort$1 }) => {
		signal.removeEventListener("abort", abort$1);
	});
	var dependentControllerMap = /* @__PURE__ */ new WeakMap();
	function buildAbort(acRef) {
		return abort$1;
		function abort$1() {
			const ac = acRef.deref();
			if (ac !== void 0) {
				requestFinalizer.unregister(abort$1);
				this.removeEventListener("abort", abort$1);
				ac.abort(this.reason);
				const controllerList = dependentControllerMap.get(ac.signal);
				if (controllerList !== void 0) {
					if (controllerList.size !== 0) {
						for (const ref of controllerList) {
							const ctrl = ref.deref();
							if (ctrl !== void 0) ctrl.abort(this.reason);
						}
						controllerList.clear();
					}
					dependentControllerMap.delete(ac.signal);
				}
			}
		}
	}
	var patchMethodWarning = false;
	var Request$2 = class Request$2 {
		constructor(input, init = {}) {
			webidl$9.util.markAsUncloneable(this);
			if (input === kConstruct$4) return;
			const prefix = "Request constructor";
			webidl$9.argumentLengthCheck(arguments, 1, prefix);
			input = webidl$9.converters.RequestInfo(input, prefix, "input");
			init = webidl$9.converters.RequestInit(init, prefix, "init");
			let request$1 = null;
			let fallbackMode = null;
			const baseUrl = environmentSettingsObject$2.settingsObject.baseUrl;
			let signal = null;
			if (typeof input === "string") {
				this[kDispatcher$1] = init.dispatcher;
				let parsedURL;
				try {
					parsedURL = new URL(input, baseUrl);
				} catch (err) {
					throw new TypeError("Failed to parse URL from " + input, { cause: err });
				}
				if (parsedURL.username || parsedURL.password) throw new TypeError("Request cannot be constructed from a URL that includes credentials: " + input);
				request$1 = makeRequest$3({ urlList: [parsedURL] });
				fallbackMode = "cors";
			} else {
				this[kDispatcher$1] = init.dispatcher || input[kDispatcher$1];
				assert$5(input instanceof Request$2);
				request$1 = input[kState$5];
				signal = input[kSignal];
			}
			const origin = environmentSettingsObject$2.settingsObject.origin;
			let window = "client";
			if (request$1.window?.constructor?.name === "EnvironmentSettingsObject" && sameOrigin$1(request$1.window, origin)) window = request$1.window;
			if (init.window != null) throw new TypeError(`'window' option '${window}' must be null`);
			if ("window" in init) window = "no-window";
			request$1 = makeRequest$3({
				method: request$1.method,
				headersList: request$1.headersList,
				unsafeRequest: request$1.unsafeRequest,
				client: environmentSettingsObject$2.settingsObject,
				window,
				priority: request$1.priority,
				origin: request$1.origin,
				referrer: request$1.referrer,
				referrerPolicy: request$1.referrerPolicy,
				mode: request$1.mode,
				credentials: request$1.credentials,
				cache: request$1.cache,
				redirect: request$1.redirect,
				integrity: request$1.integrity,
				keepalive: request$1.keepalive,
				reloadNavigation: request$1.reloadNavigation,
				historyNavigation: request$1.historyNavigation,
				urlList: [...request$1.urlList]
			});
			const initHasKey = Object.keys(init).length !== 0;
			if (initHasKey) {
				if (request$1.mode === "navigate") request$1.mode = "same-origin";
				request$1.reloadNavigation = false;
				request$1.historyNavigation = false;
				request$1.origin = "client";
				request$1.referrer = "client";
				request$1.referrerPolicy = "";
				request$1.url = request$1.urlList[request$1.urlList.length - 1];
				request$1.urlList = [request$1.url];
			}
			if (init.referrer !== void 0) {
				const referrer = init.referrer;
				if (referrer === "") request$1.referrer = "no-referrer";
				else {
					let parsedReferrer;
					try {
						parsedReferrer = new URL(referrer, baseUrl);
					} catch (err) {
						throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err });
					}
					if (parsedReferrer.protocol === "about:" && parsedReferrer.hostname === "client" || origin && !sameOrigin$1(parsedReferrer, environmentSettingsObject$2.settingsObject.baseUrl)) request$1.referrer = "client";
					else request$1.referrer = parsedReferrer;
				}
			}
			if (init.referrerPolicy !== void 0) request$1.referrerPolicy = init.referrerPolicy;
			let mode;
			if (init.mode !== void 0) mode = init.mode;
			else mode = fallbackMode;
			if (mode === "navigate") throw webidl$9.errors.exception({
				header: "Request constructor",
				message: "invalid request mode navigate."
			});
			if (mode != null) request$1.mode = mode;
			if (init.credentials !== void 0) request$1.credentials = init.credentials;
			if (init.cache !== void 0) request$1.cache = init.cache;
			if (request$1.cache === "only-if-cached" && request$1.mode !== "same-origin") throw new TypeError("'only-if-cached' can be set only with 'same-origin' mode");
			if (init.redirect !== void 0) request$1.redirect = init.redirect;
			if (init.integrity != null) request$1.integrity = String(init.integrity);
			if (init.keepalive !== void 0) request$1.keepalive = Boolean(init.keepalive);
			if (init.method !== void 0) {
				let method = init.method;
				const mayBeNormalized = normalizedMethodRecords[method];
				if (mayBeNormalized !== void 0) request$1.method = mayBeNormalized;
				else {
					if (!isValidHTTPToken(method)) throw new TypeError(`'${method}' is not a valid HTTP method.`);
					const upperCase = method.toUpperCase();
					if (forbiddenMethodsSet.has(upperCase)) throw new TypeError(`'${method}' HTTP method is unsupported.`);
					method = normalizedMethodRecordsBase[upperCase] ?? method;
					request$1.method = method;
				}
				if (!patchMethodWarning && request$1.method === "patch") {
					process.emitWarning("Using `patch` is highly likely to result in a `405 Method Not Allowed`. `PATCH` is much more likely to succeed.", { code: "UNDICI-FETCH-patch" });
					patchMethodWarning = true;
				}
			}
			if (init.signal !== void 0) signal = init.signal;
			this[kState$5] = request$1;
			const ac = new AbortController();
			this[kSignal] = ac.signal;
			if (signal != null) {
				if (!signal || typeof signal.aborted !== "boolean" || typeof signal.addEventListener !== "function") throw new TypeError("Failed to construct 'Request': member signal is not of type AbortSignal.");
				if (signal.aborted) ac.abort(signal.reason);
				else {
					this[kAbortController] = ac;
					const acRef = new WeakRef(ac);
					const abort$1 = buildAbort(acRef);
					try {
						if (typeof getMaxListeners === "function" && getMaxListeners(signal) === defaultMaxListeners) setMaxListeners(1500, signal);
						else if (getEventListeners(signal, "abort").length >= defaultMaxListeners) setMaxListeners(1500, signal);
					} catch {}
					util$1.addAbortListener(signal, abort$1);
					requestFinalizer.register(ac, {
						signal,
						abort: abort$1
					}, abort$1);
				}
			}
			this[kHeaders] = new Headers$2(kConstruct$4);
			setHeadersList(this[kHeaders], request$1.headersList);
			setHeadersGuard(this[kHeaders], "request");
			if (mode === "no-cors") {
				if (!corsSafeListedMethodsSet.has(request$1.method)) throw new TypeError(`'${request$1.method} is unsupported in no-cors mode.`);
				setHeadersGuard(this[kHeaders], "request-no-cors");
			}
			if (initHasKey) {
				const headersList = getHeadersList$1(this[kHeaders]);
				const headers = init.headers !== void 0 ? init.headers : new HeadersList$1(headersList);
				headersList.clear();
				if (headers instanceof HeadersList$1) {
					for (const { name, value } of headers.rawValues()) headersList.append(name, value, false);
					headersList.cookies = headers.cookies;
				} else fillHeaders(this[kHeaders], headers);
			}
			const inputBody = input instanceof Request$2 ? input[kState$5].body : null;
			if ((init.body != null || inputBody != null) && (request$1.method === "GET" || request$1.method === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body.");
			let initBody = null;
			if (init.body != null) {
				const [extractedBody, contentType] = extractBody$1(init.body, request$1.keepalive);
				initBody = extractedBody;
				if (contentType && !getHeadersList$1(this[kHeaders]).contains("content-type", true)) this[kHeaders].append("content-type", contentType);
			}
			const inputOrInitBody = initBody ?? inputBody;
			if (inputOrInitBody != null && inputOrInitBody.source == null) {
				if (initBody != null && init.duplex == null) throw new TypeError("RequestInit: duplex option is required when sending a body.");
				if (request$1.mode !== "same-origin" && request$1.mode !== "cors") throw new TypeError("If request is made from ReadableStream, mode should be \"same-origin\" or \"cors\"");
				request$1.useCORSPreflightFlag = true;
			}
			let finalBody = inputOrInitBody;
			if (initBody == null && inputBody != null) {
				if (bodyUnusable(input)) throw new TypeError("Cannot construct a Request with a Request object that has already been used.");
				const identityTransform = new TransformStream();
				inputBody.stream.pipeThrough(identityTransform);
				finalBody = {
					source: inputBody.source,
					length: inputBody.length,
					stream: identityTransform.readable
				};
			}
			this[kState$5].body = finalBody;
		}
		get method() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].method;
		}
		get url() {
			webidl$9.brandCheck(this, Request$2);
			return URLSerializer$2(this[kState$5].url);
		}
		get headers() {
			webidl$9.brandCheck(this, Request$2);
			return this[kHeaders];
		}
		get destination() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].destination;
		}
		get referrer() {
			webidl$9.brandCheck(this, Request$2);
			if (this[kState$5].referrer === "no-referrer") return "";
			if (this[kState$5].referrer === "client") return "about:client";
			return this[kState$5].referrer.toString();
		}
		get referrerPolicy() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].referrerPolicy;
		}
		get mode() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].mode;
		}
		get credentials() {
			return this[kState$5].credentials;
		}
		get cache() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].cache;
		}
		get redirect() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].redirect;
		}
		get integrity() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].integrity;
		}
		get keepalive() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].keepalive;
		}
		get isReloadNavigation() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].reloadNavigation;
		}
		get isHistoryNavigation() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].historyNavigation;
		}
		get signal() {
			webidl$9.brandCheck(this, Request$2);
			return this[kSignal];
		}
		get body() {
			webidl$9.brandCheck(this, Request$2);
			return this[kState$5].body ? this[kState$5].body.stream : null;
		}
		get bodyUsed() {
			webidl$9.brandCheck(this, Request$2);
			return !!this[kState$5].body && util$1.isDisturbed(this[kState$5].body.stream);
		}
		get duplex() {
			webidl$9.brandCheck(this, Request$2);
			return "half";
		}
		clone() {
			webidl$9.brandCheck(this, Request$2);
			if (bodyUnusable(this)) throw new TypeError("unusable");
			const clonedRequest = cloneRequest$1(this[kState$5]);
			const ac = new AbortController();
			if (this.signal.aborted) ac.abort(this.signal.reason);
			else {
				let list = dependentControllerMap.get(this.signal);
				if (list === void 0) {
					list = /* @__PURE__ */ new Set();
					dependentControllerMap.set(this.signal, list);
				}
				const acRef = new WeakRef(ac);
				list.add(acRef);
				util$1.addAbortListener(ac.signal, buildAbort(acRef));
			}
			return fromInnerRequest$1(clonedRequest, ac.signal, getHeadersGuard(this[kHeaders]));
		}
		[nodeUtil.inspect.custom](depth, options) {
			if (options.depth === null) options.depth = 2;
			options.colors ??= true;
			const properties = {
				method: this.method,
				url: this.url,
				headers: this.headers,
				destination: this.destination,
				referrer: this.referrer,
				referrerPolicy: this.referrerPolicy,
				mode: this.mode,
				credentials: this.credentials,
				cache: this.cache,
				redirect: this.redirect,
				integrity: this.integrity,
				keepalive: this.keepalive,
				isReloadNavigation: this.isReloadNavigation,
				isHistoryNavigation: this.isHistoryNavigation,
				signal: this.signal
			};
			return `Request ${nodeUtil.formatWithOptions(options, properties)}`;
		}
	};
	mixinBody(Request$2);
	function makeRequest$3(init) {
		return {
			method: init.method ?? "GET",
			localURLsOnly: init.localURLsOnly ?? false,
			unsafeRequest: init.unsafeRequest ?? false,
			body: init.body ?? null,
			client: init.client ?? null,
			reservedClient: init.reservedClient ?? null,
			replacesClientId: init.replacesClientId ?? "",
			window: init.window ?? "client",
			keepalive: init.keepalive ?? false,
			serviceWorkers: init.serviceWorkers ?? "all",
			initiator: init.initiator ?? "",
			destination: init.destination ?? "",
			priority: init.priority ?? null,
			origin: init.origin ?? "client",
			policyContainer: init.policyContainer ?? "client",
			referrer: init.referrer ?? "client",
			referrerPolicy: init.referrerPolicy ?? "",
			mode: init.mode ?? "no-cors",
			useCORSPreflightFlag: init.useCORSPreflightFlag ?? false,
			credentials: init.credentials ?? "same-origin",
			useCredentials: init.useCredentials ?? false,
			cache: init.cache ?? "default",
			redirect: init.redirect ?? "follow",
			integrity: init.integrity ?? "",
			cryptoGraphicsNonceMetadata: init.cryptoGraphicsNonceMetadata ?? "",
			parserMetadata: init.parserMetadata ?? "",
			reloadNavigation: init.reloadNavigation ?? false,
			historyNavigation: init.historyNavigation ?? false,
			userActivation: init.userActivation ?? false,
			taintedOrigin: init.taintedOrigin ?? false,
			redirectCount: init.redirectCount ?? 0,
			responseTainting: init.responseTainting ?? "basic",
			preventNoCacheCacheControlHeaderModification: init.preventNoCacheCacheControlHeaderModification ?? false,
			done: init.done ?? false,
			timingAllowFailed: init.timingAllowFailed ?? false,
			urlList: init.urlList,
			url: init.urlList[0],
			headersList: init.headersList ? new HeadersList$1(init.headersList) : new HeadersList$1()
		};
	}
	function cloneRequest$1(request$1) {
		const newRequest = makeRequest$3({
			...request$1,
			body: null
		});
		if (request$1.body != null) newRequest.body = cloneBody(newRequest, request$1.body);
		return newRequest;
	}
	function fromInnerRequest$1(innerRequest, signal, guard) {
		const request$1 = new Request$2(kConstruct$4);
		request$1[kState$5] = innerRequest;
		request$1[kSignal] = signal;
		request$1[kHeaders] = new Headers$2(kConstruct$4);
		setHeadersList(request$1[kHeaders], innerRequest.headersList);
		setHeadersGuard(request$1[kHeaders], guard);
		return request$1;
	}
	Object.defineProperties(Request$2.prototype, {
		method: kEnumerableProperty$6,
		url: kEnumerableProperty$6,
		headers: kEnumerableProperty$6,
		redirect: kEnumerableProperty$6,
		clone: kEnumerableProperty$6,
		signal: kEnumerableProperty$6,
		duplex: kEnumerableProperty$6,
		destination: kEnumerableProperty$6,
		body: kEnumerableProperty$6,
		bodyUsed: kEnumerableProperty$6,
		isHistoryNavigation: kEnumerableProperty$6,
		isReloadNavigation: kEnumerableProperty$6,
		keepalive: kEnumerableProperty$6,
		integrity: kEnumerableProperty$6,
		cache: kEnumerableProperty$6,
		credentials: kEnumerableProperty$6,
		attribute: kEnumerableProperty$6,
		referrerPolicy: kEnumerableProperty$6,
		referrer: kEnumerableProperty$6,
		mode: kEnumerableProperty$6,
		[Symbol.toStringTag]: {
			value: "Request",
			configurable: true
		}
	});
	webidl$9.converters.Request = webidl$9.interfaceConverter(Request$2);
	webidl$9.converters.RequestInfo = function(V, prefix, argument) {
		if (typeof V === "string") return webidl$9.converters.USVString(V, prefix, argument);
		if (V instanceof Request$2) return webidl$9.converters.Request(V, prefix, argument);
		return webidl$9.converters.USVString(V, prefix, argument);
	};
	webidl$9.converters.AbortSignal = webidl$9.interfaceConverter(AbortSignal);
	webidl$9.converters.RequestInit = webidl$9.dictionaryConverter([
		{
			key: "method",
			converter: webidl$9.converters.ByteString
		},
		{
			key: "headers",
			converter: webidl$9.converters.HeadersInit
		},
		{
			key: "body",
			converter: webidl$9.nullableConverter(webidl$9.converters.BodyInit)
		},
		{
			key: "referrer",
			converter: webidl$9.converters.USVString
		},
		{
			key: "referrerPolicy",
			converter: webidl$9.converters.DOMString,
			allowedValues: referrerPolicy
		},
		{
			key: "mode",
			converter: webidl$9.converters.DOMString,
			allowedValues: requestMode
		},
		{
			key: "credentials",
			converter: webidl$9.converters.DOMString,
			allowedValues: requestCredentials
		},
		{
			key: "cache",
			converter: webidl$9.converters.DOMString,
			allowedValues: requestCache
		},
		{
			key: "redirect",
			converter: webidl$9.converters.DOMString,
			allowedValues: requestRedirect
		},
		{
			key: "integrity",
			converter: webidl$9.converters.DOMString
		},
		{
			key: "keepalive",
			converter: webidl$9.converters.boolean
		},
		{
			key: "signal",
			converter: webidl$9.nullableConverter((signal) => webidl$9.converters.AbortSignal(signal, "RequestInit", "signal", { strict: false }))
		},
		{
			key: "window",
			converter: webidl$9.converters.any
		},
		{
			key: "duplex",
			converter: webidl$9.converters.DOMString,
			allowedValues: requestDuplex
		},
		{
			key: "dispatcher",
			converter: webidl$9.converters.any
		}
	]);
	module.exports = {
		Request: Request$2,
		makeRequest: makeRequest$3,
		fromInnerRequest: fromInnerRequest$1,
		cloneRequest: cloneRequest$1
	};
}));
var require_fetch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { makeNetworkError, makeAppropriateNetworkError, filterResponse, makeResponse, fromInnerResponse: fromInnerResponse$1 } = require_response();
	var { HeadersList } = require_headers();
	var { Request: Request$1, cloneRequest } = require_request();
	var zlib = __require("node:zlib");
	var { bytesMatch, makePolicyContainer, clonePolicyContainer, requestBadPort, TAOCheck, appendRequestOriginHeader, responseLocationURL, requestCurrentURL, setRequestReferrerPolicyOnRedirect, tryUpgradeRequestToAPotentiallyTrustworthyURL, createOpaqueTimingInfo, appendFetchMetadata, corsCheck, crossOriginResourcePolicyCheck, determineRequestsReferrer, coarsenedSharedCurrentTime, createDeferredPromise: createDeferredPromise$1, isBlobLike: isBlobLike$1, sameOrigin, isCancelled, isAborted, isErrorLike, fullyReadBody, readableStreamClose, isomorphicEncode, urlIsLocal, urlIsHttpHttpsScheme: urlIsHttpHttpsScheme$1, urlHasHttpsScheme, clampAndCoarsenConnectionTimingInfo, simpleRangeHeaderValue, buildContentRange, createInflate, extractMimeType } = require_util$6();
	var { kState: kState$4, kDispatcher } = require_symbols$3();
	var assert$4 = __require("node:assert");
	var { safelyExtractBody, extractBody } = require_body();
	var { redirectStatusSet, nullBodyStatus, safeMethodsSet, requestBodyHeader, subresourceSet } = require_constants$2();
	var EE = __require("node:events");
	var { Readable, pipeline: pipeline$1, finished } = __require("node:stream");
	var { addAbortListener, isErrored, isReadable, bufferToLowerCasedHeaderName } = require_util$7();
	var { dataURLProcessor, serializeAMimeType: serializeAMimeType$2, minimizeSupportedMimeType } = require_data_url();
	var { getGlobalDispatcher: getGlobalDispatcher$2 } = require_global();
	var { webidl: webidl$8 } = require_webidl();
	var { STATUS_CODES } = __require("node:http");
	var GET_OR_HEAD = ["GET", "HEAD"];
	var defaultUserAgent = typeof __UNDICI_IS_NODE__ !== "undefined" || typeof esbuildDetection !== "undefined" ? "node" : "undici";
	var resolveObjectURL;
	var Fetch = class extends EE {
		constructor(dispatcher) {
			super();
			this.dispatcher = dispatcher;
			this.connection = null;
			this.dump = false;
			this.state = "ongoing";
		}
		terminate(reason) {
			if (this.state !== "ongoing") return;
			this.state = "terminated";
			this.connection?.destroy(reason);
			this.emit("terminated", reason);
		}
		abort(error) {
			if (this.state !== "ongoing") return;
			this.state = "aborted";
			if (!error) error = new DOMException("The operation was aborted.", "AbortError");
			this.serializedAbortReason = error;
			this.connection?.destroy(error);
			this.emit("terminated", error);
		}
	};
	function handleFetchDone(response) {
		finalizeAndReportTiming(response, "fetch");
	}
	function fetch$1(input, init = void 0) {
		webidl$8.argumentLengthCheck(arguments, 1, "globalThis.fetch");
		let p = createDeferredPromise$1();
		let requestObject;
		try {
			requestObject = new Request$1(input, init);
		} catch (e) {
			p.reject(e);
			return p.promise;
		}
		const request$1 = requestObject[kState$4];
		if (requestObject.signal.aborted) {
			abortFetch(p, request$1, null, requestObject.signal.reason);
			return p.promise;
		}
		if (request$1.client.globalObject?.constructor?.name === "ServiceWorkerGlobalScope") request$1.serviceWorkers = "none";
		let responseObject = null;
		let locallyAborted = false;
		let controller = null;
		addAbortListener(requestObject.signal, () => {
			locallyAborted = true;
			assert$4(controller != null);
			controller.abort(requestObject.signal.reason);
			const realResponse = responseObject?.deref();
			abortFetch(p, request$1, realResponse, requestObject.signal.reason);
		});
		const processResponse = (response) => {
			if (locallyAborted) return;
			if (response.aborted) {
				abortFetch(p, request$1, responseObject, controller.serializedAbortReason);
				return;
			}
			if (response.type === "error") {
				p.reject(new TypeError("fetch failed", { cause: response.error }));
				return;
			}
			responseObject = new WeakRef(fromInnerResponse$1(response, "immutable"));
			p.resolve(responseObject.deref());
			p = null;
		};
		controller = fetching$3({
			request: request$1,
			processResponseEndOfBody: handleFetchDone,
			processResponse,
			dispatcher: requestObject[kDispatcher]
		});
		return p.promise;
	}
	function finalizeAndReportTiming(response, initiatorType = "other") {
		if (response.type === "error" && response.aborted) return;
		if (!response.urlList?.length) return;
		const originalURL = response.urlList[0];
		let timingInfo = response.timingInfo;
		let cacheState = response.cacheState;
		if (!urlIsHttpHttpsScheme$1(originalURL)) return;
		if (timingInfo === null) return;
		if (!response.timingAllowPassed) {
			timingInfo = createOpaqueTimingInfo({ startTime: timingInfo.startTime });
			cacheState = "";
		}
		timingInfo.endTime = coarsenedSharedCurrentTime();
		response.timingInfo = timingInfo;
		markResourceTiming(timingInfo, originalURL.href, initiatorType, globalThis, cacheState);
	}
	var markResourceTiming = performance.markResourceTiming;
	function abortFetch(p, request$1, responseObject, error) {
		if (p) p.reject(error);
		if (request$1.body != null && isReadable(request$1.body?.stream)) request$1.body.stream.cancel(error).catch((err) => {
			if (err.code === "ERR_INVALID_STATE") return;
			throw err;
		});
		if (responseObject == null) return;
		const response = responseObject[kState$4];
		if (response.body != null && isReadable(response.body?.stream)) response.body.stream.cancel(error).catch((err) => {
			if (err.code === "ERR_INVALID_STATE") return;
			throw err;
		});
	}
	function fetching$3({ request: request$1, processRequestBodyChunkLength, processRequestEndOfBody, processResponse, processResponseEndOfBody, processResponseConsumeBody, useParallelQueue = false, dispatcher = getGlobalDispatcher$2() }) {
		assert$4(dispatcher);
		let taskDestination = null;
		let crossOriginIsolatedCapability = false;
		if (request$1.client != null) {
			taskDestination = request$1.client.globalObject;
			crossOriginIsolatedCapability = request$1.client.crossOriginIsolatedCapability;
		}
		const currentTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
		const timingInfo = createOpaqueTimingInfo({ startTime: currentTime });
		const fetchParams = {
			controller: new Fetch(dispatcher),
			request: request$1,
			timingInfo,
			processRequestBodyChunkLength,
			processRequestEndOfBody,
			processResponse,
			processResponseConsumeBody,
			processResponseEndOfBody,
			taskDestination,
			crossOriginIsolatedCapability
		};
		assert$4(!request$1.body || request$1.body.stream);
		if (request$1.window === "client") request$1.window = request$1.client?.globalObject?.constructor?.name === "Window" ? request$1.client : "no-window";
		if (request$1.origin === "client") request$1.origin = request$1.client.origin;
		if (request$1.policyContainer === "client") if (request$1.client != null) request$1.policyContainer = clonePolicyContainer(request$1.client.policyContainer);
		else request$1.policyContainer = makePolicyContainer();
		if (!request$1.headersList.contains("accept", true)) request$1.headersList.append("accept", "*/*", true);
		if (!request$1.headersList.contains("accept-language", true)) request$1.headersList.append("accept-language", "*", true);
		if (request$1.priority === null) {}
		if (subresourceSet.has(request$1.destination)) {}
		mainFetch(fetchParams).catch((err) => {
			fetchParams.controller.terminate(err);
		});
		return fetchParams.controller;
	}
	async function mainFetch(fetchParams, recursive = false) {
		const request$1 = fetchParams.request;
		let response = null;
		if (request$1.localURLsOnly && !urlIsLocal(requestCurrentURL(request$1))) response = makeNetworkError("local URLs only");
		tryUpgradeRequestToAPotentiallyTrustworthyURL(request$1);
		if (requestBadPort(request$1) === "blocked") response = makeNetworkError("bad port");
		if (request$1.referrerPolicy === "") request$1.referrerPolicy = request$1.policyContainer.referrerPolicy;
		if (request$1.referrer !== "no-referrer") request$1.referrer = determineRequestsReferrer(request$1);
		if (response === null) response = await (async () => {
			const currentURL = requestCurrentURL(request$1);
			if (sameOrigin(currentURL, request$1.url) && request$1.responseTainting === "basic" || currentURL.protocol === "data:" || request$1.mode === "navigate" || request$1.mode === "websocket") {
				request$1.responseTainting = "basic";
				return await schemeFetch(fetchParams);
			}
			if (request$1.mode === "same-origin") return makeNetworkError("request mode cannot be \"same-origin\"");
			if (request$1.mode === "no-cors") {
				if (request$1.redirect !== "follow") return makeNetworkError("redirect mode cannot be \"follow\" for \"no-cors\" request");
				request$1.responseTainting = "opaque";
				return await schemeFetch(fetchParams);
			}
			if (!urlIsHttpHttpsScheme$1(requestCurrentURL(request$1))) return makeNetworkError("URL scheme must be a HTTP(S) scheme");
			request$1.responseTainting = "cors";
			return await httpFetch(fetchParams);
		})();
		if (recursive) return response;
		if (response.status !== 0 && !response.internalResponse) {
			if (request$1.responseTainting === "cors") {}
			if (request$1.responseTainting === "basic") response = filterResponse(response, "basic");
			else if (request$1.responseTainting === "cors") response = filterResponse(response, "cors");
			else if (request$1.responseTainting === "opaque") response = filterResponse(response, "opaque");
			else assert$4(false);
		}
		let internalResponse = response.status === 0 ? response : response.internalResponse;
		if (internalResponse.urlList.length === 0) internalResponse.urlList.push(...request$1.urlList);
		if (!request$1.timingAllowFailed) response.timingAllowPassed = true;
		if (response.type === "opaque" && internalResponse.status === 206 && internalResponse.rangeRequested && !request$1.headers.contains("range", true)) response = internalResponse = makeNetworkError();
		if (response.status !== 0 && (request$1.method === "HEAD" || request$1.method === "CONNECT" || nullBodyStatus.includes(internalResponse.status))) {
			internalResponse.body = null;
			fetchParams.controller.dump = true;
		}
		if (request$1.integrity) {
			const processBodyError = (reason) => fetchFinale(fetchParams, makeNetworkError(reason));
			if (request$1.responseTainting === "opaque" || response.body == null) {
				processBodyError(response.error);
				return;
			}
			const processBody = (bytes) => {
				if (!bytesMatch(bytes, request$1.integrity)) {
					processBodyError("integrity mismatch");
					return;
				}
				response.body = safelyExtractBody(bytes)[0];
				fetchFinale(fetchParams, response);
			};
			await fullyReadBody(response.body, processBody, processBodyError);
		} else fetchFinale(fetchParams, response);
	}
	function schemeFetch(fetchParams) {
		if (isCancelled(fetchParams) && fetchParams.request.redirectCount === 0) return Promise.resolve(makeAppropriateNetworkError(fetchParams));
		const { request: request$1 } = fetchParams;
		const { protocol: scheme } = requestCurrentURL(request$1);
		switch (scheme) {
			case "about:": return Promise.resolve(makeNetworkError("about scheme is not supported"));
			case "blob:": {
				if (!resolveObjectURL) resolveObjectURL = __require("node:buffer").resolveObjectURL;
				const blobURLEntry = requestCurrentURL(request$1);
				if (blobURLEntry.search.length !== 0) return Promise.resolve(makeNetworkError("NetworkError when attempting to fetch resource."));
				const blob = resolveObjectURL(blobURLEntry.toString());
				if (request$1.method !== "GET" || !isBlobLike$1(blob)) return Promise.resolve(makeNetworkError("invalid method"));
				const response = makeResponse();
				const fullLength = blob.size;
				const serializedFullLength = isomorphicEncode(`${fullLength}`);
				const type = blob.type;
				if (!request$1.headersList.contains("range", true)) {
					const bodyWithType = extractBody(blob);
					response.statusText = "OK";
					response.body = bodyWithType[0];
					response.headersList.set("content-length", serializedFullLength, true);
					response.headersList.set("content-type", type, true);
				} else {
					response.rangeRequested = true;
					const rangeHeader = request$1.headersList.get("range", true);
					const rangeValue = simpleRangeHeaderValue(rangeHeader, true);
					if (rangeValue === "failure") return Promise.resolve(makeNetworkError("failed to fetch the data URL"));
					let { rangeStartValue: rangeStart, rangeEndValue: rangeEnd } = rangeValue;
					if (rangeStart === null) {
						rangeStart = fullLength - rangeEnd;
						rangeEnd = rangeStart + rangeEnd - 1;
					} else {
						if (rangeStart >= fullLength) return Promise.resolve(makeNetworkError("Range start is greater than the blob's size."));
						if (rangeEnd === null || rangeEnd >= fullLength) rangeEnd = fullLength - 1;
					}
					const slicedBlob = blob.slice(rangeStart, rangeEnd, type);
					response.body = extractBody(slicedBlob)[0];
					const serializedSlicedLength = isomorphicEncode(`${slicedBlob.size}`);
					const contentRange = buildContentRange(rangeStart, rangeEnd, fullLength);
					response.status = 206;
					response.statusText = "Partial Content";
					response.headersList.set("content-length", serializedSlicedLength, true);
					response.headersList.set("content-type", type, true);
					response.headersList.set("content-range", contentRange, true);
				}
				return Promise.resolve(response);
			}
			case "data:": {
				const currentURL = requestCurrentURL(request$1);
				const dataURLStruct = dataURLProcessor(currentURL);
				if (dataURLStruct === "failure") return Promise.resolve(makeNetworkError("failed to fetch the data URL"));
				const mimeType = serializeAMimeType$2(dataURLStruct.mimeType);
				return Promise.resolve(makeResponse({
					statusText: "OK",
					headersList: [["content-type", {
						name: "Content-Type",
						value: mimeType
					}]],
					body: safelyExtractBody(dataURLStruct.body)[0]
				}));
			}
			case "file:": return Promise.resolve(makeNetworkError("not implemented... yet..."));
			case "http:":
			case "https:": return httpFetch(fetchParams).catch((err) => makeNetworkError(err));
			default: return Promise.resolve(makeNetworkError("unknown scheme"));
		}
	}
	function finalizeResponse(fetchParams, response) {
		fetchParams.request.done = true;
		if (fetchParams.processResponseDone != null) queueMicrotask(() => fetchParams.processResponseDone(response));
	}
	function fetchFinale(fetchParams, response) {
		let timingInfo = fetchParams.timingInfo;
		const processResponseEndOfBody = () => {
			const unsafeEndTime = Date.now();
			if (fetchParams.request.destination === "document") fetchParams.controller.fullTimingInfo = timingInfo;
			fetchParams.controller.reportTimingSteps = () => {
				if (fetchParams.request.url.protocol !== "https:") return;
				timingInfo.endTime = unsafeEndTime;
				let cacheState = response.cacheState;
				const bodyInfo = response.bodyInfo;
				if (!response.timingAllowPassed) {
					timingInfo = createOpaqueTimingInfo(timingInfo);
					cacheState = "";
				}
				let responseStatus = 0;
				if (fetchParams.request.mode !== "navigator" || !response.hasCrossOriginRedirects) {
					responseStatus = response.status;
					const mimeType = extractMimeType(response.headersList);
					if (mimeType !== "failure") bodyInfo.contentType = minimizeSupportedMimeType(mimeType);
				}
				if (fetchParams.request.initiatorType != null) markResourceTiming(timingInfo, fetchParams.request.url.href, fetchParams.request.initiatorType, globalThis, cacheState, bodyInfo, responseStatus);
			};
			const processResponseEndOfBodyTask = () => {
				fetchParams.request.done = true;
				if (fetchParams.processResponseEndOfBody != null) queueMicrotask(() => fetchParams.processResponseEndOfBody(response));
				if (fetchParams.request.initiatorType != null) fetchParams.controller.reportTimingSteps();
			};
			queueMicrotask(() => processResponseEndOfBodyTask());
		};
		if (fetchParams.processResponse != null) queueMicrotask(() => {
			fetchParams.processResponse(response);
			fetchParams.processResponse = null;
		});
		const internalResponse = response.type === "error" ? response : response.internalResponse ?? response;
		if (internalResponse.body == null) processResponseEndOfBody();
		else finished(internalResponse.body.stream, () => {
			processResponseEndOfBody();
		});
	}
	async function httpFetch(fetchParams) {
		const request$1 = fetchParams.request;
		let response = null;
		let actualResponse = null;
		const timingInfo = fetchParams.timingInfo;
		if (request$1.serviceWorkers === "all") {}
		if (response === null) {
			if (request$1.redirect === "follow") request$1.serviceWorkers = "none";
			actualResponse = response = await httpNetworkOrCacheFetch(fetchParams);
			if (request$1.responseTainting === "cors" && corsCheck(request$1, response) === "failure") return makeNetworkError("cors failure");
			if (TAOCheck(request$1, response) === "failure") request$1.timingAllowFailed = true;
		}
		if ((request$1.responseTainting === "opaque" || response.type === "opaque") && crossOriginResourcePolicyCheck(request$1.origin, request$1.client, request$1.destination, actualResponse) === "blocked") return makeNetworkError("blocked");
		if (redirectStatusSet.has(actualResponse.status)) {
			if (request$1.redirect !== "manual") fetchParams.controller.connection.destroy(void 0, false);
			if (request$1.redirect === "error") response = makeNetworkError("unexpected redirect");
			else if (request$1.redirect === "manual") response = actualResponse;
			else if (request$1.redirect === "follow") response = await httpRedirectFetch(fetchParams, response);
			else assert$4(false);
		}
		response.timingInfo = timingInfo;
		return response;
	}
	function httpRedirectFetch(fetchParams, response) {
		const request$1 = fetchParams.request;
		const actualResponse = response.internalResponse ? response.internalResponse : response;
		let locationURL;
		try {
			locationURL = responseLocationURL(actualResponse, requestCurrentURL(request$1).hash);
			if (locationURL == null) return response;
		} catch (err) {
			return Promise.resolve(makeNetworkError(err));
		}
		if (!urlIsHttpHttpsScheme$1(locationURL)) return Promise.resolve(makeNetworkError("URL scheme must be a HTTP(S) scheme"));
		if (request$1.redirectCount === 20) return Promise.resolve(makeNetworkError("redirect count exceeded"));
		request$1.redirectCount += 1;
		if (request$1.mode === "cors" && (locationURL.username || locationURL.password) && !sameOrigin(request$1, locationURL)) return Promise.resolve(makeNetworkError("cross origin not allowed for request mode \"cors\""));
		if (request$1.responseTainting === "cors" && (locationURL.username || locationURL.password)) return Promise.resolve(makeNetworkError("URL cannot contain credentials for request mode \"cors\""));
		if (actualResponse.status !== 303 && request$1.body != null && request$1.body.source == null) return Promise.resolve(makeNetworkError());
		if ([301, 302].includes(actualResponse.status) && request$1.method === "POST" || actualResponse.status === 303 && !GET_OR_HEAD.includes(request$1.method)) {
			request$1.method = "GET";
			request$1.body = null;
			for (const headerName of requestBodyHeader) request$1.headersList.delete(headerName);
		}
		if (!sameOrigin(requestCurrentURL(request$1), locationURL)) {
			request$1.headersList.delete("authorization", true);
			request$1.headersList.delete("proxy-authorization", true);
			request$1.headersList.delete("cookie", true);
			request$1.headersList.delete("host", true);
		}
		if (request$1.body != null) {
			assert$4(request$1.body.source != null);
			request$1.body = safelyExtractBody(request$1.body.source)[0];
		}
		const timingInfo = fetchParams.timingInfo;
		timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
		if (timingInfo.redirectStartTime === 0) timingInfo.redirectStartTime = timingInfo.startTime;
		request$1.urlList.push(locationURL);
		setRequestReferrerPolicyOnRedirect(request$1, actualResponse);
		return mainFetch(fetchParams, true);
	}
	async function httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch = false, isNewConnectionFetch = false) {
		const request$1 = fetchParams.request;
		let httpFetchParams = null;
		let httpRequest = null;
		let response = null;
		const httpCache = null;
		if (request$1.window === "no-window" && request$1.redirect === "error") {
			httpFetchParams = fetchParams;
			httpRequest = request$1;
		} else {
			httpRequest = cloneRequest(request$1);
			httpFetchParams = { ...fetchParams };
			httpFetchParams.request = httpRequest;
		}
		const includeCredentials = request$1.credentials === "include" || request$1.credentials === "same-origin" && request$1.responseTainting === "basic";
		const contentLength = httpRequest.body ? httpRequest.body.length : null;
		let contentLengthHeaderValue = null;
		if (httpRequest.body == null && ["POST", "PUT"].includes(httpRequest.method)) contentLengthHeaderValue = "0";
		if (contentLength != null) contentLengthHeaderValue = isomorphicEncode(`${contentLength}`);
		if (contentLengthHeaderValue != null) httpRequest.headersList.append("content-length", contentLengthHeaderValue, true);
		if (contentLength != null && httpRequest.keepalive) {}
		if (httpRequest.referrer instanceof URL) httpRequest.headersList.append("referer", isomorphicEncode(httpRequest.referrer.href), true);
		appendRequestOriginHeader(httpRequest);
		appendFetchMetadata(httpRequest);
		if (!httpRequest.headersList.contains("user-agent", true)) httpRequest.headersList.append("user-agent", defaultUserAgent);
		if (httpRequest.cache === "default" && (httpRequest.headersList.contains("if-modified-since", true) || httpRequest.headersList.contains("if-none-match", true) || httpRequest.headersList.contains("if-unmodified-since", true) || httpRequest.headersList.contains("if-match", true) || httpRequest.headersList.contains("if-range", true))) httpRequest.cache = "no-store";
		if (httpRequest.cache === "no-cache" && !httpRequest.preventNoCacheCacheControlHeaderModification && !httpRequest.headersList.contains("cache-control", true)) httpRequest.headersList.append("cache-control", "max-age=0", true);
		if (httpRequest.cache === "no-store" || httpRequest.cache === "reload") {
			if (!httpRequest.headersList.contains("pragma", true)) httpRequest.headersList.append("pragma", "no-cache", true);
			if (!httpRequest.headersList.contains("cache-control", true)) httpRequest.headersList.append("cache-control", "no-cache", true);
		}
		if (httpRequest.headersList.contains("range", true)) httpRequest.headersList.append("accept-encoding", "identity", true);
		if (!httpRequest.headersList.contains("accept-encoding", true)) if (urlHasHttpsScheme(requestCurrentURL(httpRequest))) httpRequest.headersList.append("accept-encoding", "br, gzip, deflate", true);
		else httpRequest.headersList.append("accept-encoding", "gzip, deflate", true);
		httpRequest.headersList.delete("host", true);
		if (includeCredentials) {}
		if (httpCache == null) httpRequest.cache = "no-store";
		if (httpRequest.cache !== "no-store" && httpRequest.cache !== "reload") {}
		if (response == null) {
			if (httpRequest.cache === "only-if-cached") return makeNetworkError("only if cached");
			const forwardResponse = await httpNetworkFetch(httpFetchParams, includeCredentials, isNewConnectionFetch);
			if (!safeMethodsSet.has(httpRequest.method) && forwardResponse.status >= 200 && forwardResponse.status <= 399) {}
			if (response == null) response = forwardResponse;
		}
		response.urlList = [...httpRequest.urlList];
		if (httpRequest.headersList.contains("range", true)) response.rangeRequested = true;
		response.requestIncludesCredentials = includeCredentials;
		if (response.status === 407) {
			if (request$1.window === "no-window") return makeNetworkError();
			if (isCancelled(fetchParams)) return makeAppropriateNetworkError(fetchParams);
			return makeNetworkError("proxy authentication required");
		}
		if (response.status === 421 && !isNewConnectionFetch && (request$1.body == null || request$1.body.source != null)) {
			if (isCancelled(fetchParams)) return makeAppropriateNetworkError(fetchParams);
			fetchParams.controller.connection.destroy();
			response = await httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch, true);
		}
		if (isAuthenticationFetch) {}
		return response;
	}
	async function httpNetworkFetch(fetchParams, includeCredentials = false, forceNewConnection = false) {
		assert$4(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);
		fetchParams.controller.connection = {
			abort: null,
			destroyed: false,
			destroy(err, abort$1 = true) {
				if (!this.destroyed) {
					this.destroyed = true;
					if (abort$1) this.abort?.(err ?? new DOMException("The operation was aborted.", "AbortError"));
				}
			}
		};
		const request$1 = fetchParams.request;
		let response = null;
		const timingInfo = fetchParams.timingInfo;
		request$1.cache = "no-store";
		if (request$1.mode === "websocket") {}
		let requestBody = null;
		if (request$1.body == null && fetchParams.processRequestEndOfBody) queueMicrotask(() => fetchParams.processRequestEndOfBody());
		else if (request$1.body != null) {
			const processBodyChunk = async function* (bytes) {
				if (isCancelled(fetchParams)) return;
				yield bytes;
				fetchParams.processRequestBodyChunkLength?.(bytes.byteLength);
			};
			const processEndOfBody = () => {
				if (isCancelled(fetchParams)) return;
				if (fetchParams.processRequestEndOfBody) fetchParams.processRequestEndOfBody();
			};
			const processBodyError = (e) => {
				if (isCancelled(fetchParams)) return;
				if (e.name === "AbortError") fetchParams.controller.abort();
				else fetchParams.controller.terminate(e);
			};
			requestBody = (async function* () {
				try {
					for await (const bytes of request$1.body.stream) yield* processBodyChunk(bytes);
					processEndOfBody();
				} catch (err) {
					processBodyError(err);
				}
			})();
		}
		try {
			const { body, status, statusText, headersList, socket } = await dispatch({ body: requestBody });
			if (socket) response = makeResponse({
				status,
				statusText,
				headersList,
				socket
			});
			else {
				const iterator = body[Symbol.asyncIterator]();
				fetchParams.controller.next = () => iterator.next();
				response = makeResponse({
					status,
					statusText,
					headersList
				});
			}
		} catch (err) {
			if (err.name === "AbortError") {
				fetchParams.controller.connection.destroy();
				return makeAppropriateNetworkError(fetchParams, err);
			}
			return makeNetworkError(err);
		}
		const pullAlgorithm = async () => {
			await fetchParams.controller.resume();
		};
		const cancelAlgorithm = (reason) => {
			if (!isCancelled(fetchParams)) fetchParams.controller.abort(reason);
		};
		const stream$2 = new ReadableStream({
			async start(controller) {
				fetchParams.controller.controller = controller;
			},
			async pull(controller) {
				await pullAlgorithm(controller);
			},
			async cancel(reason) {
				await cancelAlgorithm(reason);
			},
			type: "bytes"
		});
		response.body = {
			stream: stream$2,
			source: null,
			length: null
		};
		fetchParams.controller.onAborted = onAborted;
		fetchParams.controller.on("terminated", onAborted);
		fetchParams.controller.resume = async () => {
			while (true) {
				let bytes;
				let isFailure;
				try {
					const { done, value } = await fetchParams.controller.next();
					if (isAborted(fetchParams)) break;
					bytes = done ? void 0 : value;
				} catch (err) {
					if (fetchParams.controller.ended && !timingInfo.encodedBodySize) bytes = void 0;
					else {
						bytes = err;
						isFailure = true;
					}
				}
				if (bytes === void 0) {
					readableStreamClose(fetchParams.controller.controller);
					finalizeResponse(fetchParams, response);
					return;
				}
				timingInfo.decodedBodySize += bytes?.byteLength ?? 0;
				if (isFailure) {
					fetchParams.controller.terminate(bytes);
					return;
				}
				const buffer$1 = new Uint8Array(bytes);
				if (buffer$1.byteLength) fetchParams.controller.controller.enqueue(buffer$1);
				if (isErrored(stream$2)) {
					fetchParams.controller.terminate();
					return;
				}
				if (fetchParams.controller.controller.desiredSize <= 0) return;
			}
		};
		function onAborted(reason) {
			if (isAborted(fetchParams)) {
				response.aborted = true;
				if (isReadable(stream$2)) fetchParams.controller.controller.error(fetchParams.controller.serializedAbortReason);
			} else if (isReadable(stream$2)) fetchParams.controller.controller.error(new TypeError("terminated", { cause: isErrorLike(reason) ? reason : void 0 }));
			fetchParams.controller.connection.destroy();
		}
		return response;
		function dispatch({ body }) {
			const url = requestCurrentURL(request$1);
			const agent = fetchParams.controller.dispatcher;
			return new Promise((resolve, reject) => agent.dispatch({
				path: url.pathname + url.search,
				origin: url.origin,
				method: request$1.method,
				body: agent.isMockActive ? request$1.body && (request$1.body.source || request$1.body.stream) : body,
				headers: request$1.headersList.entries,
				maxRedirections: 0,
				upgrade: request$1.mode === "websocket" ? "websocket" : void 0
			}, {
				body: null,
				abort: null,
				onConnect(abort$1) {
					const { connection } = fetchParams.controller;
					timingInfo.finalConnectionTimingInfo = clampAndCoarsenConnectionTimingInfo(void 0, timingInfo.postRedirectStartTime, fetchParams.crossOriginIsolatedCapability);
					if (connection.destroyed) abort$1(new DOMException("The operation was aborted.", "AbortError"));
					else {
						fetchParams.controller.on("terminated", abort$1);
						this.abort = connection.abort = abort$1;
					}
					timingInfo.finalNetworkRequestStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
				},
				onResponseStarted() {
					timingInfo.finalNetworkResponseStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
				},
				onHeaders(status, rawHeaders, resume$1, statusText) {
					if (status < 200) return;
					let codings = [];
					let location = "";
					const headersList = new HeadersList();
					for (let i = 0; i < rawHeaders.length; i += 2) headersList.append(bufferToLowerCasedHeaderName(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
					const contentEncoding = headersList.get("content-encoding", true);
					if (contentEncoding) codings = contentEncoding.toLowerCase().split(",").map((x) => x.trim());
					location = headersList.get("location", true);
					this.body = new Readable({ read: resume$1 });
					const decoders = [];
					const willFollow = location && request$1.redirect === "follow" && redirectStatusSet.has(status);
					if (codings.length !== 0 && request$1.method !== "HEAD" && request$1.method !== "CONNECT" && !nullBodyStatus.includes(status) && !willFollow) for (let i = codings.length - 1; i >= 0; --i) {
						const coding = codings[i];
						if (coding === "x-gzip" || coding === "gzip") decoders.push(zlib.createGunzip({
							flush: zlib.constants.Z_SYNC_FLUSH,
							finishFlush: zlib.constants.Z_SYNC_FLUSH
						}));
						else if (coding === "deflate") decoders.push(createInflate({
							flush: zlib.constants.Z_SYNC_FLUSH,
							finishFlush: zlib.constants.Z_SYNC_FLUSH
						}));
						else if (coding === "br") decoders.push(zlib.createBrotliDecompress({
							flush: zlib.constants.BROTLI_OPERATION_FLUSH,
							finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
						}));
						else {
							decoders.length = 0;
							break;
						}
					}
					const onError$1 = this.onError.bind(this);
					resolve({
						status,
						statusText,
						headersList,
						body: decoders.length ? pipeline$1(this.body, ...decoders, (err) => {
							if (err) this.onError(err);
						}).on("error", onError$1) : this.body.on("error", onError$1)
					});
					return true;
				},
				onData(chunk) {
					if (fetchParams.controller.dump) return;
					const bytes = chunk;
					timingInfo.encodedBodySize += bytes.byteLength;
					return this.body.push(bytes);
				},
				onComplete() {
					if (this.abort) fetchParams.controller.off("terminated", this.abort);
					if (fetchParams.controller.onAborted) fetchParams.controller.off("terminated", fetchParams.controller.onAborted);
					fetchParams.controller.ended = true;
					this.body.push(null);
				},
				onError(error) {
					if (this.abort) fetchParams.controller.off("terminated", this.abort);
					this.body?.destroy(error);
					fetchParams.controller.terminate(error);
					reject(error);
				},
				onUpgrade(status, rawHeaders, socket) {
					if (status !== 101) return;
					const headersList = new HeadersList();
					for (let i = 0; i < rawHeaders.length; i += 2) headersList.append(bufferToLowerCasedHeaderName(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
					resolve({
						status,
						statusText: STATUS_CODES[status],
						headersList,
						socket
					});
					return true;
				}
			}));
		}
	}
	module.exports = {
		fetch: fetch$1,
		Fetch,
		fetching: fetching$3,
		finalizeAndReportTiming
	};
}));
var require_symbols$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		kState: Symbol("FileReader state"),
		kResult: Symbol("FileReader result"),
		kError: Symbol("FileReader error"),
		kLastProgressEventFired: Symbol("FileReader last progress event fired timestamp"),
		kEvents: Symbol("FileReader events"),
		kAborted: Symbol("FileReader aborted")
	};
}));
var require_progressevent = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { webidl: webidl$7 } = require_webidl();
	var kState$3 = Symbol("ProgressEvent state");
	var ProgressEvent$1 = class ProgressEvent$1 extends Event {
		constructor(type, eventInitDict = {}) {
			type = webidl$7.converters.DOMString(type, "ProgressEvent constructor", "type");
			eventInitDict = webidl$7.converters.ProgressEventInit(eventInitDict ?? {});
			super(type, eventInitDict);
			this[kState$3] = {
				lengthComputable: eventInitDict.lengthComputable,
				loaded: eventInitDict.loaded,
				total: eventInitDict.total
			};
		}
		get lengthComputable() {
			webidl$7.brandCheck(this, ProgressEvent$1);
			return this[kState$3].lengthComputable;
		}
		get loaded() {
			webidl$7.brandCheck(this, ProgressEvent$1);
			return this[kState$3].loaded;
		}
		get total() {
			webidl$7.brandCheck(this, ProgressEvent$1);
			return this[kState$3].total;
		}
	};
	webidl$7.converters.ProgressEventInit = webidl$7.dictionaryConverter([
		{
			key: "lengthComputable",
			converter: webidl$7.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "loaded",
			converter: webidl$7.converters["unsigned long long"],
			defaultValue: () => 0
		},
		{
			key: "total",
			converter: webidl$7.converters["unsigned long long"],
			defaultValue: () => 0
		},
		{
			key: "bubbles",
			converter: webidl$7.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "cancelable",
			converter: webidl$7.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "composed",
			converter: webidl$7.converters.boolean,
			defaultValue: () => false
		}
	]);
	module.exports = { ProgressEvent: ProgressEvent$1 };
}));
var require_encoding = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function getEncoding$1(label) {
		if (!label) return "failure";
		switch (label.trim().toLowerCase()) {
			case "unicode-1-1-utf-8":
			case "unicode11utf8":
			case "unicode20utf8":
			case "utf-8":
			case "utf8":
			case "x-unicode20utf8": return "UTF-8";
			case "866":
			case "cp866":
			case "csibm866":
			case "ibm866": return "IBM866";
			case "csisolatin2":
			case "iso-8859-2":
			case "iso-ir-101":
			case "iso8859-2":
			case "iso88592":
			case "iso_8859-2":
			case "iso_8859-2:1987":
			case "l2":
			case "latin2": return "ISO-8859-2";
			case "csisolatin3":
			case "iso-8859-3":
			case "iso-ir-109":
			case "iso8859-3":
			case "iso88593":
			case "iso_8859-3":
			case "iso_8859-3:1988":
			case "l3":
			case "latin3": return "ISO-8859-3";
			case "csisolatin4":
			case "iso-8859-4":
			case "iso-ir-110":
			case "iso8859-4":
			case "iso88594":
			case "iso_8859-4":
			case "iso_8859-4:1988":
			case "l4":
			case "latin4": return "ISO-8859-4";
			case "csisolatincyrillic":
			case "cyrillic":
			case "iso-8859-5":
			case "iso-ir-144":
			case "iso8859-5":
			case "iso88595":
			case "iso_8859-5":
			case "iso_8859-5:1988": return "ISO-8859-5";
			case "arabic":
			case "asmo-708":
			case "csiso88596e":
			case "csiso88596i":
			case "csisolatinarabic":
			case "ecma-114":
			case "iso-8859-6":
			case "iso-8859-6-e":
			case "iso-8859-6-i":
			case "iso-ir-127":
			case "iso8859-6":
			case "iso88596":
			case "iso_8859-6":
			case "iso_8859-6:1987": return "ISO-8859-6";
			case "csisolatingreek":
			case "ecma-118":
			case "elot_928":
			case "greek":
			case "greek8":
			case "iso-8859-7":
			case "iso-ir-126":
			case "iso8859-7":
			case "iso88597":
			case "iso_8859-7":
			case "iso_8859-7:1987":
			case "sun_eu_greek": return "ISO-8859-7";
			case "csiso88598e":
			case "csisolatinhebrew":
			case "hebrew":
			case "iso-8859-8":
			case "iso-8859-8-e":
			case "iso-ir-138":
			case "iso8859-8":
			case "iso88598":
			case "iso_8859-8":
			case "iso_8859-8:1988":
			case "visual": return "ISO-8859-8";
			case "csiso88598i":
			case "iso-8859-8-i":
			case "logical": return "ISO-8859-8-I";
			case "csisolatin6":
			case "iso-8859-10":
			case "iso-ir-157":
			case "iso8859-10":
			case "iso885910":
			case "l6":
			case "latin6": return "ISO-8859-10";
			case "iso-8859-13":
			case "iso8859-13":
			case "iso885913": return "ISO-8859-13";
			case "iso-8859-14":
			case "iso8859-14":
			case "iso885914": return "ISO-8859-14";
			case "csisolatin9":
			case "iso-8859-15":
			case "iso8859-15":
			case "iso885915":
			case "iso_8859-15":
			case "l9": return "ISO-8859-15";
			case "iso-8859-16": return "ISO-8859-16";
			case "cskoi8r":
			case "koi":
			case "koi8":
			case "koi8-r":
			case "koi8_r": return "KOI8-R";
			case "koi8-ru":
			case "koi8-u": return "KOI8-U";
			case "csmacintosh":
			case "mac":
			case "macintosh":
			case "x-mac-roman": return "macintosh";
			case "iso-8859-11":
			case "iso8859-11":
			case "iso885911":
			case "tis-620":
			case "windows-874": return "windows-874";
			case "cp1250":
			case "windows-1250":
			case "x-cp1250": return "windows-1250";
			case "cp1251":
			case "windows-1251":
			case "x-cp1251": return "windows-1251";
			case "ansi_x3.4-1968":
			case "ascii":
			case "cp1252":
			case "cp819":
			case "csisolatin1":
			case "ibm819":
			case "iso-8859-1":
			case "iso-ir-100":
			case "iso8859-1":
			case "iso88591":
			case "iso_8859-1":
			case "iso_8859-1:1987":
			case "l1":
			case "latin1":
			case "us-ascii":
			case "windows-1252":
			case "x-cp1252": return "windows-1252";
			case "cp1253":
			case "windows-1253":
			case "x-cp1253": return "windows-1253";
			case "cp1254":
			case "csisolatin5":
			case "iso-8859-9":
			case "iso-ir-148":
			case "iso8859-9":
			case "iso88599":
			case "iso_8859-9":
			case "iso_8859-9:1989":
			case "l5":
			case "latin5":
			case "windows-1254":
			case "x-cp1254": return "windows-1254";
			case "cp1255":
			case "windows-1255":
			case "x-cp1255": return "windows-1255";
			case "cp1256":
			case "windows-1256":
			case "x-cp1256": return "windows-1256";
			case "cp1257":
			case "windows-1257":
			case "x-cp1257": return "windows-1257";
			case "cp1258":
			case "windows-1258":
			case "x-cp1258": return "windows-1258";
			case "x-mac-cyrillic":
			case "x-mac-ukrainian": return "x-mac-cyrillic";
			case "chinese":
			case "csgb2312":
			case "csiso58gb231280":
			case "gb2312":
			case "gb_2312":
			case "gb_2312-80":
			case "gbk":
			case "iso-ir-58":
			case "x-gbk": return "GBK";
			case "gb18030": return "gb18030";
			case "big5":
			case "big5-hkscs":
			case "cn-big5":
			case "csbig5":
			case "x-x-big5": return "Big5";
			case "cseucpkdfmtjapanese":
			case "euc-jp":
			case "x-euc-jp": return "EUC-JP";
			case "csiso2022jp":
			case "iso-2022-jp": return "ISO-2022-JP";
			case "csshiftjis":
			case "ms932":
			case "ms_kanji":
			case "shift-jis":
			case "shift_jis":
			case "sjis":
			case "windows-31j":
			case "x-sjis": return "Shift_JIS";
			case "cseuckr":
			case "csksc56011987":
			case "euc-kr":
			case "iso-ir-149":
			case "korean":
			case "ks_c_5601-1987":
			case "ks_c_5601-1989":
			case "ksc5601":
			case "ksc_5601":
			case "windows-949": return "EUC-KR";
			case "csiso2022kr":
			case "hz-gb-2312":
			case "iso-2022-cn":
			case "iso-2022-cn-ext":
			case "iso-2022-kr":
			case "replacement": return "replacement";
			case "unicodefffe":
			case "utf-16be": return "UTF-16BE";
			case "csunicode":
			case "iso-10646-ucs-2":
			case "ucs-2":
			case "unicode":
			case "unicodefeff":
			case "utf-16":
			case "utf-16le": return "UTF-16LE";
			case "x-user-defined": return "x-user-defined";
			default: return "failure";
		}
	}
	module.exports = { getEncoding: getEncoding$1 };
}));
var require_util$4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kState: kState$2, kError: kError$1, kResult: kResult$1, kAborted: kAborted$1, kLastProgressEventFired } = require_symbols$2();
	var { ProgressEvent } = require_progressevent();
	var { getEncoding } = require_encoding();
	var { serializeAMimeType: serializeAMimeType$1, parseMIMEType: parseMIMEType$2 } = require_data_url();
	var { types: types$1 } = __require("node:util");
	var { StringDecoder } = __require("string_decoder");
	var { btoa } = __require("node:buffer");
	var staticPropertyDescriptors$3 = {
		enumerable: true,
		writable: false,
		configurable: false
	};
	function readOperation$1(fr, blob, type, encodingName) {
		if (fr[kState$2] === "loading") throw new DOMException("Invalid state", "InvalidStateError");
		fr[kState$2] = "loading";
		fr[kResult$1] = null;
		fr[kError$1] = null;
		const reader = blob.stream().getReader();
		const bytes = [];
		let chunkPromise = reader.read();
		let isFirstChunk = true;
		(async () => {
			while (!fr[kAborted$1]) try {
				const { done, value } = await chunkPromise;
				if (isFirstChunk && !fr[kAborted$1]) queueMicrotask(() => {
					fireAProgressEvent$1("loadstart", fr);
				});
				isFirstChunk = false;
				if (!done && types$1.isUint8Array(value)) {
					bytes.push(value);
					if ((fr[kLastProgressEventFired] === void 0 || Date.now() - fr[kLastProgressEventFired] >= 50) && !fr[kAborted$1]) {
						fr[kLastProgressEventFired] = Date.now();
						queueMicrotask(() => {
							fireAProgressEvent$1("progress", fr);
						});
					}
					chunkPromise = reader.read();
				} else if (done) {
					queueMicrotask(() => {
						fr[kState$2] = "done";
						try {
							const result = packageData(bytes, type, blob.type, encodingName);
							if (fr[kAborted$1]) return;
							fr[kResult$1] = result;
							fireAProgressEvent$1("load", fr);
						} catch (error) {
							fr[kError$1] = error;
							fireAProgressEvent$1("error", fr);
						}
						if (fr[kState$2] !== "loading") fireAProgressEvent$1("loadend", fr);
					});
					break;
				}
			} catch (error) {
				if (fr[kAborted$1]) return;
				queueMicrotask(() => {
					fr[kState$2] = "done";
					fr[kError$1] = error;
					fireAProgressEvent$1("error", fr);
					if (fr[kState$2] !== "loading") fireAProgressEvent$1("loadend", fr);
				});
				break;
			}
		})();
	}
	function fireAProgressEvent$1(e, reader) {
		const event = new ProgressEvent(e, {
			bubbles: false,
			cancelable: false
		});
		reader.dispatchEvent(event);
	}
	function packageData(bytes, type, mimeType, encodingName) {
		switch (type) {
			case "DataURL": {
				let dataURL = "data:";
				const parsed = parseMIMEType$2(mimeType || "application/octet-stream");
				if (parsed !== "failure") dataURL += serializeAMimeType$1(parsed);
				dataURL += ";base64,";
				const decoder = new StringDecoder("latin1");
				for (const chunk of bytes) dataURL += btoa(decoder.write(chunk));
				dataURL += btoa(decoder.end());
				return dataURL;
			}
			case "Text": {
				let encoding = "failure";
				if (encodingName) encoding = getEncoding(encodingName);
				if (encoding === "failure" && mimeType) {
					const type$1 = parseMIMEType$2(mimeType);
					if (type$1 !== "failure") encoding = getEncoding(type$1.parameters.get("charset"));
				}
				if (encoding === "failure") encoding = "UTF-8";
				return decode(bytes, encoding);
			}
			case "ArrayBuffer": return combineByteSequences(bytes).buffer;
			case "BinaryString": {
				let binaryString = "";
				const decoder = new StringDecoder("latin1");
				for (const chunk of bytes) binaryString += decoder.write(chunk);
				binaryString += decoder.end();
				return binaryString;
			}
		}
	}
	function decode(ioQueue, encoding) {
		const bytes = combineByteSequences(ioQueue);
		const BOMEncoding = BOMSniffing(bytes);
		let slice = 0;
		if (BOMEncoding !== null) {
			encoding = BOMEncoding;
			slice = BOMEncoding === "UTF-8" ? 3 : 2;
		}
		const sliced = bytes.slice(slice);
		return new TextDecoder(encoding).decode(sliced);
	}
	function BOMSniffing(ioQueue) {
		const [a, b, c] = ioQueue;
		if (a === 239 && b === 187 && c === 191) return "UTF-8";
		else if (a === 254 && b === 255) return "UTF-16BE";
		else if (a === 255 && b === 254) return "UTF-16LE";
		return null;
	}
	function combineByteSequences(sequences) {
		const size = sequences.reduce((a, b) => {
			return a + b.byteLength;
		}, 0);
		let offset = 0;
		return sequences.reduce((a, b) => {
			a.set(b, offset);
			offset += b.byteLength;
			return a;
		}, new Uint8Array(size));
	}
	module.exports = {
		staticPropertyDescriptors: staticPropertyDescriptors$3,
		readOperation: readOperation$1,
		fireAProgressEvent: fireAProgressEvent$1
	};
}));
var require_filereader = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { staticPropertyDescriptors: staticPropertyDescriptors$2, readOperation, fireAProgressEvent } = require_util$4();
	var { kState: kState$1, kError, kResult, kEvents, kAborted } = require_symbols$2();
	var { webidl: webidl$6 } = require_webidl();
	var { kEnumerableProperty: kEnumerableProperty$5 } = require_util$7();
	var FileReader = class FileReader extends EventTarget {
		constructor() {
			super();
			this[kState$1] = "empty";
			this[kResult] = null;
			this[kError] = null;
			this[kEvents] = {
				loadend: null,
				error: null,
				abort: null,
				load: null,
				progress: null,
				loadstart: null
			};
		}
		readAsArrayBuffer(blob) {
			webidl$6.brandCheck(this, FileReader);
			webidl$6.argumentLengthCheck(arguments, 1, "FileReader.readAsArrayBuffer");
			blob = webidl$6.converters.Blob(blob, { strict: false });
			readOperation(this, blob, "ArrayBuffer");
		}
		readAsBinaryString(blob) {
			webidl$6.brandCheck(this, FileReader);
			webidl$6.argumentLengthCheck(arguments, 1, "FileReader.readAsBinaryString");
			blob = webidl$6.converters.Blob(blob, { strict: false });
			readOperation(this, blob, "BinaryString");
		}
		readAsText(blob, encoding = void 0) {
			webidl$6.brandCheck(this, FileReader);
			webidl$6.argumentLengthCheck(arguments, 1, "FileReader.readAsText");
			blob = webidl$6.converters.Blob(blob, { strict: false });
			if (encoding !== void 0) encoding = webidl$6.converters.DOMString(encoding, "FileReader.readAsText", "encoding");
			readOperation(this, blob, "Text", encoding);
		}
		readAsDataURL(blob) {
			webidl$6.brandCheck(this, FileReader);
			webidl$6.argumentLengthCheck(arguments, 1, "FileReader.readAsDataURL");
			blob = webidl$6.converters.Blob(blob, { strict: false });
			readOperation(this, blob, "DataURL");
		}
		abort() {
			if (this[kState$1] === "empty" || this[kState$1] === "done") {
				this[kResult] = null;
				return;
			}
			if (this[kState$1] === "loading") {
				this[kState$1] = "done";
				this[kResult] = null;
			}
			this[kAborted] = true;
			fireAProgressEvent("abort", this);
			if (this[kState$1] !== "loading") fireAProgressEvent("loadend", this);
		}
		get readyState() {
			webidl$6.brandCheck(this, FileReader);
			switch (this[kState$1]) {
				case "empty": return this.EMPTY;
				case "loading": return this.LOADING;
				case "done": return this.DONE;
			}
		}
		get result() {
			webidl$6.brandCheck(this, FileReader);
			return this[kResult];
		}
		get error() {
			webidl$6.brandCheck(this, FileReader);
			return this[kError];
		}
		get onloadend() {
			webidl$6.brandCheck(this, FileReader);
			return this[kEvents].loadend;
		}
		set onloadend(fn) {
			webidl$6.brandCheck(this, FileReader);
			if (this[kEvents].loadend) this.removeEventListener("loadend", this[kEvents].loadend);
			if (typeof fn === "function") {
				this[kEvents].loadend = fn;
				this.addEventListener("loadend", fn);
			} else this[kEvents].loadend = null;
		}
		get onerror() {
			webidl$6.brandCheck(this, FileReader);
			return this[kEvents].error;
		}
		set onerror(fn) {
			webidl$6.brandCheck(this, FileReader);
			if (this[kEvents].error) this.removeEventListener("error", this[kEvents].error);
			if (typeof fn === "function") {
				this[kEvents].error = fn;
				this.addEventListener("error", fn);
			} else this[kEvents].error = null;
		}
		get onloadstart() {
			webidl$6.brandCheck(this, FileReader);
			return this[kEvents].loadstart;
		}
		set onloadstart(fn) {
			webidl$6.brandCheck(this, FileReader);
			if (this[kEvents].loadstart) this.removeEventListener("loadstart", this[kEvents].loadstart);
			if (typeof fn === "function") {
				this[kEvents].loadstart = fn;
				this.addEventListener("loadstart", fn);
			} else this[kEvents].loadstart = null;
		}
		get onprogress() {
			webidl$6.brandCheck(this, FileReader);
			return this[kEvents].progress;
		}
		set onprogress(fn) {
			webidl$6.brandCheck(this, FileReader);
			if (this[kEvents].progress) this.removeEventListener("progress", this[kEvents].progress);
			if (typeof fn === "function") {
				this[kEvents].progress = fn;
				this.addEventListener("progress", fn);
			} else this[kEvents].progress = null;
		}
		get onload() {
			webidl$6.brandCheck(this, FileReader);
			return this[kEvents].load;
		}
		set onload(fn) {
			webidl$6.brandCheck(this, FileReader);
			if (this[kEvents].load) this.removeEventListener("load", this[kEvents].load);
			if (typeof fn === "function") {
				this[kEvents].load = fn;
				this.addEventListener("load", fn);
			} else this[kEvents].load = null;
		}
		get onabort() {
			webidl$6.brandCheck(this, FileReader);
			return this[kEvents].abort;
		}
		set onabort(fn) {
			webidl$6.brandCheck(this, FileReader);
			if (this[kEvents].abort) this.removeEventListener("abort", this[kEvents].abort);
			if (typeof fn === "function") {
				this[kEvents].abort = fn;
				this.addEventListener("abort", fn);
			} else this[kEvents].abort = null;
		}
	};
	FileReader.EMPTY = FileReader.prototype.EMPTY = 0;
	FileReader.LOADING = FileReader.prototype.LOADING = 1;
	FileReader.DONE = FileReader.prototype.DONE = 2;
	Object.defineProperties(FileReader.prototype, {
		EMPTY: staticPropertyDescriptors$2,
		LOADING: staticPropertyDescriptors$2,
		DONE: staticPropertyDescriptors$2,
		readAsArrayBuffer: kEnumerableProperty$5,
		readAsBinaryString: kEnumerableProperty$5,
		readAsText: kEnumerableProperty$5,
		readAsDataURL: kEnumerableProperty$5,
		abort: kEnumerableProperty$5,
		readyState: kEnumerableProperty$5,
		result: kEnumerableProperty$5,
		error: kEnumerableProperty$5,
		onloadstart: kEnumerableProperty$5,
		onprogress: kEnumerableProperty$5,
		onload: kEnumerableProperty$5,
		onabort: kEnumerableProperty$5,
		onerror: kEnumerableProperty$5,
		onloadend: kEnumerableProperty$5,
		[Symbol.toStringTag]: {
			value: "FileReader",
			writable: false,
			enumerable: false,
			configurable: true
		}
	});
	Object.defineProperties(FileReader, {
		EMPTY: staticPropertyDescriptors$2,
		LOADING: staticPropertyDescriptors$2,
		DONE: staticPropertyDescriptors$2
	});
	module.exports = { FileReader };
}));
var require_symbols$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = { kConstruct: require_symbols$4().kConstruct };
}));
var require_util$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var assert$3 = __require("node:assert");
	var { URLSerializer: URLSerializer$1 } = require_data_url();
	var { isValidHeaderName } = require_util$6();
	function urlEquals$1(A, B, excludeFragment = false) {
		const serializedA = URLSerializer$1(A, excludeFragment);
		const serializedB = URLSerializer$1(B, excludeFragment);
		return serializedA === serializedB;
	}
	function getFieldValues$1(header) {
		assert$3(header !== null);
		const values = [];
		for (let value of header.split(",")) {
			value = value.trim();
			if (isValidHeaderName(value)) values.push(value);
		}
		return values;
	}
	module.exports = {
		urlEquals: urlEquals$1,
		getFieldValues: getFieldValues$1
	};
}));
var require_cache = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kConstruct: kConstruct$3 } = require_symbols$1();
	var { urlEquals, getFieldValues } = require_util$3();
	var { kEnumerableProperty: kEnumerableProperty$4, isDisturbed } = require_util$7();
	var { webidl: webidl$5 } = require_webidl();
	var { Response: Response$1, cloneResponse, fromInnerResponse } = require_response();
	var { Request, fromInnerRequest } = require_request();
	var { kState } = require_symbols$3();
	var { fetching: fetching$2 } = require_fetch();
	var { urlIsHttpHttpsScheme, createDeferredPromise, readAllBytes } = require_util$6();
	var assert$2 = __require("node:assert");
	var Cache$1 = class Cache$1 {
		#relevantRequestResponseList;
		constructor() {
			if (arguments[0] !== kConstruct$3) webidl$5.illegalConstructor();
			webidl$5.util.markAsUncloneable(this);
			this.#relevantRequestResponseList = arguments[1];
		}
		async match(request$1, options = {}) {
			webidl$5.brandCheck(this, Cache$1);
			const prefix = "Cache.match";
			webidl$5.argumentLengthCheck(arguments, 1, prefix);
			request$1 = webidl$5.converters.RequestInfo(request$1, prefix, "request");
			options = webidl$5.converters.CacheQueryOptions(options, prefix, "options");
			const p = this.#internalMatchAll(request$1, options, 1);
			if (p.length === 0) return;
			return p[0];
		}
		async matchAll(request$1 = void 0, options = {}) {
			webidl$5.brandCheck(this, Cache$1);
			const prefix = "Cache.matchAll";
			if (request$1 !== void 0) request$1 = webidl$5.converters.RequestInfo(request$1, prefix, "request");
			options = webidl$5.converters.CacheQueryOptions(options, prefix, "options");
			return this.#internalMatchAll(request$1, options);
		}
		async add(request$1) {
			webidl$5.brandCheck(this, Cache$1);
			const prefix = "Cache.add";
			webidl$5.argumentLengthCheck(arguments, 1, prefix);
			request$1 = webidl$5.converters.RequestInfo(request$1, prefix, "request");
			const requests = [request$1];
			return await this.addAll(requests);
		}
		async addAll(requests) {
			webidl$5.brandCheck(this, Cache$1);
			const prefix = "Cache.addAll";
			webidl$5.argumentLengthCheck(arguments, 1, prefix);
			const responsePromises = [];
			const requestList = [];
			for (let request$1 of requests) {
				if (request$1 === void 0) throw webidl$5.errors.conversionFailed({
					prefix,
					argument: "Argument 1",
					types: ["undefined is not allowed"]
				});
				request$1 = webidl$5.converters.RequestInfo(request$1);
				if (typeof request$1 === "string") continue;
				const r = request$1[kState];
				if (!urlIsHttpHttpsScheme(r.url) || r.method !== "GET") throw webidl$5.errors.exception({
					header: prefix,
					message: "Expected http/s scheme when method is not GET."
				});
			}
			const fetchControllers = [];
			for (const request$1 of requests) {
				const r = new Request(request$1)[kState];
				if (!urlIsHttpHttpsScheme(r.url)) throw webidl$5.errors.exception({
					header: prefix,
					message: "Expected http/s scheme."
				});
				r.initiator = "fetch";
				r.destination = "subresource";
				requestList.push(r);
				const responsePromise = createDeferredPromise();
				fetchControllers.push(fetching$2({
					request: r,
					processResponse(response) {
						if (response.type === "error" || response.status === 206 || response.status < 200 || response.status > 299) responsePromise.reject(webidl$5.errors.exception({
							header: "Cache.addAll",
							message: "Received an invalid status code or the request failed."
						}));
						else if (response.headersList.contains("vary")) {
							const fieldValues = getFieldValues(response.headersList.get("vary"));
							for (const fieldValue of fieldValues) if (fieldValue === "*") {
								responsePromise.reject(webidl$5.errors.exception({
									header: "Cache.addAll",
									message: "invalid vary field value"
								}));
								for (const controller of fetchControllers) controller.abort();
								return;
							}
						}
					},
					processResponseEndOfBody(response) {
						if (response.aborted) {
							responsePromise.reject(new DOMException("aborted", "AbortError"));
							return;
						}
						responsePromise.resolve(response);
					}
				}));
				responsePromises.push(responsePromise.promise);
			}
			const responses = await Promise.all(responsePromises);
			const operations = [];
			let index = 0;
			for (const response of responses) {
				const operation = {
					type: "put",
					request: requestList[index],
					response
				};
				operations.push(operation);
				index++;
			}
			const cacheJobPromise = createDeferredPromise();
			let errorData = null;
			try {
				this.#batchCacheOperations(operations);
			} catch (e) {
				errorData = e;
			}
			queueMicrotask(() => {
				if (errorData === null) cacheJobPromise.resolve(void 0);
				else cacheJobPromise.reject(errorData);
			});
			return cacheJobPromise.promise;
		}
		async put(request$1, response) {
			webidl$5.brandCheck(this, Cache$1);
			const prefix = "Cache.put";
			webidl$5.argumentLengthCheck(arguments, 2, prefix);
			request$1 = webidl$5.converters.RequestInfo(request$1, prefix, "request");
			response = webidl$5.converters.Response(response, prefix, "response");
			let innerRequest = null;
			if (request$1 instanceof Request) innerRequest = request$1[kState];
			else innerRequest = new Request(request$1)[kState];
			if (!urlIsHttpHttpsScheme(innerRequest.url) || innerRequest.method !== "GET") throw webidl$5.errors.exception({
				header: prefix,
				message: "Expected an http/s scheme when method is not GET"
			});
			const innerResponse = response[kState];
			if (innerResponse.status === 206) throw webidl$5.errors.exception({
				header: prefix,
				message: "Got 206 status"
			});
			if (innerResponse.headersList.contains("vary")) {
				const fieldValues = getFieldValues(innerResponse.headersList.get("vary"));
				for (const fieldValue of fieldValues) if (fieldValue === "*") throw webidl$5.errors.exception({
					header: prefix,
					message: "Got * vary field value"
				});
			}
			if (innerResponse.body && (isDisturbed(innerResponse.body.stream) || innerResponse.body.stream.locked)) throw webidl$5.errors.exception({
				header: prefix,
				message: "Response body is locked or disturbed"
			});
			const clonedResponse = cloneResponse(innerResponse);
			const bodyReadPromise = createDeferredPromise();
			if (innerResponse.body != null) {
				const reader = innerResponse.body.stream.getReader();
				readAllBytes(reader).then(bodyReadPromise.resolve, bodyReadPromise.reject);
			} else bodyReadPromise.resolve(void 0);
			const operations = [];
			const operation = {
				type: "put",
				request: innerRequest,
				response: clonedResponse
			};
			operations.push(operation);
			const bytes = await bodyReadPromise.promise;
			if (clonedResponse.body != null) clonedResponse.body.source = bytes;
			const cacheJobPromise = createDeferredPromise();
			let errorData = null;
			try {
				this.#batchCacheOperations(operations);
			} catch (e) {
				errorData = e;
			}
			queueMicrotask(() => {
				if (errorData === null) cacheJobPromise.resolve();
				else cacheJobPromise.reject(errorData);
			});
			return cacheJobPromise.promise;
		}
		async delete(request$1, options = {}) {
			webidl$5.brandCheck(this, Cache$1);
			const prefix = "Cache.delete";
			webidl$5.argumentLengthCheck(arguments, 1, prefix);
			request$1 = webidl$5.converters.RequestInfo(request$1, prefix, "request");
			options = webidl$5.converters.CacheQueryOptions(options, prefix, "options");
			let r = null;
			if (request$1 instanceof Request) {
				r = request$1[kState];
				if (r.method !== "GET" && !options.ignoreMethod) return false;
			} else {
				assert$2(typeof request$1 === "string");
				r = new Request(request$1)[kState];
			}
			const operations = [];
			const operation = {
				type: "delete",
				request: r,
				options
			};
			operations.push(operation);
			const cacheJobPromise = createDeferredPromise();
			let errorData = null;
			let requestResponses;
			try {
				requestResponses = this.#batchCacheOperations(operations);
			} catch (e) {
				errorData = e;
			}
			queueMicrotask(() => {
				if (errorData === null) cacheJobPromise.resolve(!!requestResponses?.length);
				else cacheJobPromise.reject(errorData);
			});
			return cacheJobPromise.promise;
		}
		async keys(request$1 = void 0, options = {}) {
			webidl$5.brandCheck(this, Cache$1);
			const prefix = "Cache.keys";
			if (request$1 !== void 0) request$1 = webidl$5.converters.RequestInfo(request$1, prefix, "request");
			options = webidl$5.converters.CacheQueryOptions(options, prefix, "options");
			let r = null;
			if (request$1 !== void 0) {
				if (request$1 instanceof Request) {
					r = request$1[kState];
					if (r.method !== "GET" && !options.ignoreMethod) return [];
				} else if (typeof request$1 === "string") r = new Request(request$1)[kState];
			}
			const promise = createDeferredPromise();
			const requests = [];
			if (request$1 === void 0) for (const requestResponse of this.#relevantRequestResponseList) requests.push(requestResponse[0]);
			else {
				const requestResponses = this.#queryCache(r, options);
				for (const requestResponse of requestResponses) requests.push(requestResponse[0]);
			}
			queueMicrotask(() => {
				const requestList = [];
				for (const request$2 of requests) {
					const requestObject = fromInnerRequest(request$2, new AbortController().signal, "immutable");
					requestList.push(requestObject);
				}
				promise.resolve(Object.freeze(requestList));
			});
			return promise.promise;
		}
		#batchCacheOperations(operations) {
			const cache = this.#relevantRequestResponseList;
			const backupCache = [...cache];
			const addedItems = [];
			const resultList = [];
			try {
				for (const operation of operations) {
					if (operation.type !== "delete" && operation.type !== "put") throw webidl$5.errors.exception({
						header: "Cache.#batchCacheOperations",
						message: "operation type does not match \"delete\" or \"put\""
					});
					if (operation.type === "delete" && operation.response != null) throw webidl$5.errors.exception({
						header: "Cache.#batchCacheOperations",
						message: "delete operation should not have an associated response"
					});
					if (this.#queryCache(operation.request, operation.options, addedItems).length) throw new DOMException("???", "InvalidStateError");
					let requestResponses;
					if (operation.type === "delete") {
						requestResponses = this.#queryCache(operation.request, operation.options);
						if (requestResponses.length === 0) return [];
						for (const requestResponse of requestResponses) {
							const idx = cache.indexOf(requestResponse);
							assert$2(idx !== -1);
							cache.splice(idx, 1);
						}
					} else if (operation.type === "put") {
						if (operation.response == null) throw webidl$5.errors.exception({
							header: "Cache.#batchCacheOperations",
							message: "put operation should have an associated response"
						});
						const r = operation.request;
						if (!urlIsHttpHttpsScheme(r.url)) throw webidl$5.errors.exception({
							header: "Cache.#batchCacheOperations",
							message: "expected http or https scheme"
						});
						if (r.method !== "GET") throw webidl$5.errors.exception({
							header: "Cache.#batchCacheOperations",
							message: "not get method"
						});
						if (operation.options != null) throw webidl$5.errors.exception({
							header: "Cache.#batchCacheOperations",
							message: "options must not be defined"
						});
						requestResponses = this.#queryCache(operation.request);
						for (const requestResponse of requestResponses) {
							const idx = cache.indexOf(requestResponse);
							assert$2(idx !== -1);
							cache.splice(idx, 1);
						}
						cache.push([operation.request, operation.response]);
						addedItems.push([operation.request, operation.response]);
					}
					resultList.push([operation.request, operation.response]);
				}
				return resultList;
			} catch (e) {
				this.#relevantRequestResponseList.length = 0;
				this.#relevantRequestResponseList = backupCache;
				throw e;
			}
		}
		#queryCache(requestQuery, options, targetStorage) {
			const resultList = [];
			const storage = targetStorage ?? this.#relevantRequestResponseList;
			for (const requestResponse of storage) {
				const [cachedRequest, cachedResponse] = requestResponse;
				if (this.#requestMatchesCachedItem(requestQuery, cachedRequest, cachedResponse, options)) resultList.push(requestResponse);
			}
			return resultList;
		}
		#requestMatchesCachedItem(requestQuery, request$1, response = null, options) {
			const queryURL = new URL(requestQuery.url);
			const cachedURL = new URL(request$1.url);
			if (options?.ignoreSearch) {
				cachedURL.search = "";
				queryURL.search = "";
			}
			if (!urlEquals(queryURL, cachedURL, true)) return false;
			if (response == null || options?.ignoreVary || !response.headersList.contains("vary")) return true;
			const fieldValues = getFieldValues(response.headersList.get("vary"));
			for (const fieldValue of fieldValues) {
				if (fieldValue === "*") return false;
				const requestValue = request$1.headersList.get(fieldValue);
				const queryValue = requestQuery.headersList.get(fieldValue);
				if (requestValue !== queryValue) return false;
			}
			return true;
		}
		#internalMatchAll(request$1, options, maxResponses = Infinity) {
			let r = null;
			if (request$1 !== void 0) {
				if (request$1 instanceof Request) {
					r = request$1[kState];
					if (r.method !== "GET" && !options.ignoreMethod) return [];
				} else if (typeof request$1 === "string") r = new Request(request$1)[kState];
			}
			const responses = [];
			if (request$1 === void 0) for (const requestResponse of this.#relevantRequestResponseList) responses.push(requestResponse[1]);
			else {
				const requestResponses = this.#queryCache(r, options);
				for (const requestResponse of requestResponses) responses.push(requestResponse[1]);
			}
			const responseList = [];
			for (const response of responses) {
				const responseObject = fromInnerResponse(response, "immutable");
				responseList.push(responseObject.clone());
				if (responseList.length >= maxResponses) break;
			}
			return Object.freeze(responseList);
		}
	};
	Object.defineProperties(Cache$1.prototype, {
		[Symbol.toStringTag]: {
			value: "Cache",
			configurable: true
		},
		match: kEnumerableProperty$4,
		matchAll: kEnumerableProperty$4,
		add: kEnumerableProperty$4,
		addAll: kEnumerableProperty$4,
		put: kEnumerableProperty$4,
		delete: kEnumerableProperty$4,
		keys: kEnumerableProperty$4
	});
	var cacheQueryOptionConverters = [
		{
			key: "ignoreSearch",
			converter: webidl$5.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "ignoreMethod",
			converter: webidl$5.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "ignoreVary",
			converter: webidl$5.converters.boolean,
			defaultValue: () => false
		}
	];
	webidl$5.converters.CacheQueryOptions = webidl$5.dictionaryConverter(cacheQueryOptionConverters);
	webidl$5.converters.MultiCacheQueryOptions = webidl$5.dictionaryConverter([...cacheQueryOptionConverters, {
		key: "cacheName",
		converter: webidl$5.converters.DOMString
	}]);
	webidl$5.converters.Response = webidl$5.interfaceConverter(Response$1);
	webidl$5.converters["sequence<RequestInfo>"] = webidl$5.sequenceConverter(webidl$5.converters.RequestInfo);
	module.exports = { Cache: Cache$1 };
}));
var require_cachestorage = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kConstruct: kConstruct$2 } = require_symbols$1();
	var { Cache } = require_cache();
	var { webidl: webidl$4 } = require_webidl();
	var { kEnumerableProperty: kEnumerableProperty$3 } = require_util$7();
	var CacheStorage$1 = class CacheStorage$1 {
		#caches = /* @__PURE__ */ new Map();
		constructor() {
			if (arguments[0] !== kConstruct$2) webidl$4.illegalConstructor();
			webidl$4.util.markAsUncloneable(this);
		}
		async match(request$1, options = {}) {
			webidl$4.brandCheck(this, CacheStorage$1);
			webidl$4.argumentLengthCheck(arguments, 1, "CacheStorage.match");
			request$1 = webidl$4.converters.RequestInfo(request$1);
			options = webidl$4.converters.MultiCacheQueryOptions(options);
			if (options.cacheName != null) {
				if (this.#caches.has(options.cacheName)) {
					const cacheList = this.#caches.get(options.cacheName);
					return await new Cache(kConstruct$2, cacheList).match(request$1, options);
				}
			} else for (const cacheList of this.#caches.values()) {
				const response = await new Cache(kConstruct$2, cacheList).match(request$1, options);
				if (response !== void 0) return response;
			}
		}
		async has(cacheName) {
			webidl$4.brandCheck(this, CacheStorage$1);
			const prefix = "CacheStorage.has";
			webidl$4.argumentLengthCheck(arguments, 1, prefix);
			cacheName = webidl$4.converters.DOMString(cacheName, prefix, "cacheName");
			return this.#caches.has(cacheName);
		}
		async open(cacheName) {
			webidl$4.brandCheck(this, CacheStorage$1);
			const prefix = "CacheStorage.open";
			webidl$4.argumentLengthCheck(arguments, 1, prefix);
			cacheName = webidl$4.converters.DOMString(cacheName, prefix, "cacheName");
			if (this.#caches.has(cacheName)) {
				const cache$1 = this.#caches.get(cacheName);
				return new Cache(kConstruct$2, cache$1);
			}
			const cache = [];
			this.#caches.set(cacheName, cache);
			return new Cache(kConstruct$2, cache);
		}
		async delete(cacheName) {
			webidl$4.brandCheck(this, CacheStorage$1);
			const prefix = "CacheStorage.delete";
			webidl$4.argumentLengthCheck(arguments, 1, prefix);
			cacheName = webidl$4.converters.DOMString(cacheName, prefix, "cacheName");
			return this.#caches.delete(cacheName);
		}
		async keys() {
			webidl$4.brandCheck(this, CacheStorage$1);
			return [...this.#caches.keys()];
		}
	};
	Object.defineProperties(CacheStorage$1.prototype, {
		[Symbol.toStringTag]: {
			value: "CacheStorage",
			configurable: true
		},
		match: kEnumerableProperty$3,
		has: kEnumerableProperty$3,
		open: kEnumerableProperty$3,
		delete: kEnumerableProperty$3,
		keys: kEnumerableProperty$3
	});
	module.exports = { CacheStorage: CacheStorage$1 };
}));
var require_constants$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		maxAttributeValueSize: 1024,
		maxNameValuePairSize: 4096
	};
}));
var require_util$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function isCTLExcludingHtab$1(value) {
		for (let i = 0; i < value.length; ++i) {
			const code = value.charCodeAt(i);
			if (code >= 0 && code <= 8 || code >= 10 && code <= 31 || code === 127) return true;
		}
		return false;
	}
	function validateCookieName(name) {
		for (let i = 0; i < name.length; ++i) {
			const code = name.charCodeAt(i);
			if (code < 33 || code > 126 || code === 34 || code === 40 || code === 41 || code === 60 || code === 62 || code === 64 || code === 44 || code === 59 || code === 58 || code === 92 || code === 47 || code === 91 || code === 93 || code === 63 || code === 61 || code === 123 || code === 125) throw new Error("Invalid cookie name");
		}
	}
	function validateCookieValue(value) {
		let len = value.length;
		let i = 0;
		if (value[0] === "\"") {
			if (len === 1 || value[len - 1] !== "\"") throw new Error("Invalid cookie value");
			--len;
			++i;
		}
		while (i < len) {
			const code = value.charCodeAt(i++);
			if (code < 33 || code > 126 || code === 34 || code === 44 || code === 59 || code === 92) throw new Error("Invalid cookie value");
		}
	}
	function validateCookiePath(path) {
		for (let i = 0; i < path.length; ++i) {
			const code = path.charCodeAt(i);
			if (code < 32 || code === 127 || code === 59) throw new Error("Invalid cookie path");
		}
	}
	function validateCookieDomain(domain) {
		if (domain.startsWith("-") || domain.endsWith(".") || domain.endsWith("-")) throw new Error("Invalid cookie domain");
	}
	var IMFDays = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	];
	var IMFMonths = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	var IMFPaddedNumbers = Array(61).fill(0).map((_, i) => i.toString().padStart(2, "0"));
	function toIMFDate(date) {
		if (typeof date === "number") date = new Date(date);
		return `${IMFDays[date.getUTCDay()]}, ${IMFPaddedNumbers[date.getUTCDate()]} ${IMFMonths[date.getUTCMonth()]} ${date.getUTCFullYear()} ${IMFPaddedNumbers[date.getUTCHours()]}:${IMFPaddedNumbers[date.getUTCMinutes()]}:${IMFPaddedNumbers[date.getUTCSeconds()]} GMT`;
	}
	function validateCookieMaxAge(maxAge) {
		if (maxAge < 0) throw new Error("Invalid cookie max-age");
	}
	function stringify$1(cookie) {
		if (cookie.name.length === 0) return null;
		validateCookieName(cookie.name);
		validateCookieValue(cookie.value);
		const out = [`${cookie.name}=${cookie.value}`];
		if (cookie.name.startsWith("__Secure-")) cookie.secure = true;
		if (cookie.name.startsWith("__Host-")) {
			cookie.secure = true;
			cookie.domain = null;
			cookie.path = "/";
		}
		if (cookie.secure) out.push("Secure");
		if (cookie.httpOnly) out.push("HttpOnly");
		if (typeof cookie.maxAge === "number") {
			validateCookieMaxAge(cookie.maxAge);
			out.push(`Max-Age=${cookie.maxAge}`);
		}
		if (cookie.domain) {
			validateCookieDomain(cookie.domain);
			out.push(`Domain=${cookie.domain}`);
		}
		if (cookie.path) {
			validateCookiePath(cookie.path);
			out.push(`Path=${cookie.path}`);
		}
		if (cookie.expires && cookie.expires.toString() !== "Invalid Date") out.push(`Expires=${toIMFDate(cookie.expires)}`);
		if (cookie.sameSite) out.push(`SameSite=${cookie.sameSite}`);
		for (const part of cookie.unparsed) {
			if (!part.includes("=")) throw new Error("Invalid unparsed");
			const [key, ...value] = part.split("=");
			out.push(`${key.trim()}=${value.join("=")}`);
		}
		return out.join("; ");
	}
	module.exports = {
		isCTLExcludingHtab: isCTLExcludingHtab$1,
		validateCookieName,
		validateCookiePath,
		validateCookieValue,
		toIMFDate,
		stringify: stringify$1
	};
}));
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { maxNameValuePairSize, maxAttributeValueSize } = require_constants$1();
	var { isCTLExcludingHtab } = require_util$2();
	var { collectASequenceOfCodePointsFast: collectASequenceOfCodePointsFast$1 } = require_data_url();
	var assert$1 = __require("node:assert");
	function parseSetCookie$1(header) {
		if (isCTLExcludingHtab(header)) return null;
		let nameValuePair = "";
		let unparsedAttributes = "";
		let name = "";
		let value = "";
		if (header.includes(";")) {
			const position = { position: 0 };
			nameValuePair = collectASequenceOfCodePointsFast$1(";", header, position);
			unparsedAttributes = header.slice(position.position);
		} else nameValuePair = header;
		if (!nameValuePair.includes("=")) value = nameValuePair;
		else {
			const position = { position: 0 };
			name = collectASequenceOfCodePointsFast$1("=", nameValuePair, position);
			value = nameValuePair.slice(position.position + 1);
		}
		name = name.trim();
		value = value.trim();
		if (name.length + value.length > maxNameValuePairSize) return null;
		return {
			name,
			value,
			...parseUnparsedAttributes(unparsedAttributes)
		};
	}
	function parseUnparsedAttributes(unparsedAttributes, cookieAttributeList = {}) {
		if (unparsedAttributes.length === 0) return cookieAttributeList;
		assert$1(unparsedAttributes[0] === ";");
		unparsedAttributes = unparsedAttributes.slice(1);
		let cookieAv = "";
		if (unparsedAttributes.includes(";")) {
			cookieAv = collectASequenceOfCodePointsFast$1(";", unparsedAttributes, { position: 0 });
			unparsedAttributes = unparsedAttributes.slice(cookieAv.length);
		} else {
			cookieAv = unparsedAttributes;
			unparsedAttributes = "";
		}
		let attributeName = "";
		let attributeValue = "";
		if (cookieAv.includes("=")) {
			const position = { position: 0 };
			attributeName = collectASequenceOfCodePointsFast$1("=", cookieAv, position);
			attributeValue = cookieAv.slice(position.position + 1);
		} else attributeName = cookieAv;
		attributeName = attributeName.trim();
		attributeValue = attributeValue.trim();
		if (attributeValue.length > maxAttributeValueSize) return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
		const attributeNameLowercase = attributeName.toLowerCase();
		if (attributeNameLowercase === "expires") cookieAttributeList.expires = new Date(attributeValue);
		else if (attributeNameLowercase === "max-age") {
			const charCode = attributeValue.charCodeAt(0);
			if ((charCode < 48 || charCode > 57) && attributeValue[0] !== "-") return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
			if (!/^\d+$/.test(attributeValue)) return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
			cookieAttributeList.maxAge = Number(attributeValue);
		} else if (attributeNameLowercase === "domain") {
			let cookieDomain = attributeValue;
			if (cookieDomain[0] === ".") cookieDomain = cookieDomain.slice(1);
			cookieDomain = cookieDomain.toLowerCase();
			cookieAttributeList.domain = cookieDomain;
		} else if (attributeNameLowercase === "path") {
			let cookiePath = "";
			if (attributeValue.length === 0 || attributeValue[0] !== "/") cookiePath = "/";
			else cookiePath = attributeValue;
			cookieAttributeList.path = cookiePath;
		} else if (attributeNameLowercase === "secure") cookieAttributeList.secure = true;
		else if (attributeNameLowercase === "httponly") cookieAttributeList.httpOnly = true;
		else if (attributeNameLowercase === "samesite") {
			let enforcement = "Default";
			const attributeValueLowercase = attributeValue.toLowerCase();
			if (attributeValueLowercase.includes("none")) enforcement = "None";
			if (attributeValueLowercase.includes("strict")) enforcement = "Strict";
			if (attributeValueLowercase.includes("lax")) enforcement = "Lax";
			cookieAttributeList.sameSite = enforcement;
		} else {
			cookieAttributeList.unparsed ??= [];
			cookieAttributeList.unparsed.push(`${attributeName}=${attributeValue}`);
		}
		return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
	}
	module.exports = {
		parseSetCookie: parseSetCookie$1,
		parseUnparsedAttributes
	};
}));
var require_cookies = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { parseSetCookie } = require_parse();
	var { stringify } = require_util$2();
	var { webidl: webidl$3 } = require_webidl();
	var { Headers: Headers$1 } = require_headers();
	function getCookies$1(headers) {
		webidl$3.argumentLengthCheck(arguments, 1, "getCookies");
		webidl$3.brandCheck(headers, Headers$1, { strict: false });
		const cookie = headers.get("cookie");
		const out = {};
		if (!cookie) return out;
		for (const piece of cookie.split(";")) {
			const [name, ...value] = piece.split("=");
			out[name.trim()] = value.join("=");
		}
		return out;
	}
	function deleteCookie$1(headers, name, attributes) {
		webidl$3.brandCheck(headers, Headers$1, { strict: false });
		const prefix = "deleteCookie";
		webidl$3.argumentLengthCheck(arguments, 2, prefix);
		name = webidl$3.converters.DOMString(name, prefix, "name");
		attributes = webidl$3.converters.DeleteCookieAttributes(attributes);
		setCookie$1(headers, {
			name,
			value: "",
			expires: /* @__PURE__ */ new Date(0),
			...attributes
		});
	}
	function getSetCookies$1(headers) {
		webidl$3.argumentLengthCheck(arguments, 1, "getSetCookies");
		webidl$3.brandCheck(headers, Headers$1, { strict: false });
		const cookies = headers.getSetCookie();
		if (!cookies) return [];
		return cookies.map((pair) => parseSetCookie(pair));
	}
	function setCookie$1(headers, cookie) {
		webidl$3.argumentLengthCheck(arguments, 2, "setCookie");
		webidl$3.brandCheck(headers, Headers$1, { strict: false });
		cookie = webidl$3.converters.Cookie(cookie);
		const str = stringify(cookie);
		if (str) headers.append("Set-Cookie", str);
	}
	webidl$3.converters.DeleteCookieAttributes = webidl$3.dictionaryConverter([{
		converter: webidl$3.nullableConverter(webidl$3.converters.DOMString),
		key: "path",
		defaultValue: () => null
	}, {
		converter: webidl$3.nullableConverter(webidl$3.converters.DOMString),
		key: "domain",
		defaultValue: () => null
	}]);
	webidl$3.converters.Cookie = webidl$3.dictionaryConverter([
		{
			converter: webidl$3.converters.DOMString,
			key: "name"
		},
		{
			converter: webidl$3.converters.DOMString,
			key: "value"
		},
		{
			converter: webidl$3.nullableConverter((value) => {
				if (typeof value === "number") return webidl$3.converters["unsigned long long"](value);
				return new Date(value);
			}),
			key: "expires",
			defaultValue: () => null
		},
		{
			converter: webidl$3.nullableConverter(webidl$3.converters["long long"]),
			key: "maxAge",
			defaultValue: () => null
		},
		{
			converter: webidl$3.nullableConverter(webidl$3.converters.DOMString),
			key: "domain",
			defaultValue: () => null
		},
		{
			converter: webidl$3.nullableConverter(webidl$3.converters.DOMString),
			key: "path",
			defaultValue: () => null
		},
		{
			converter: webidl$3.nullableConverter(webidl$3.converters.boolean),
			key: "secure",
			defaultValue: () => null
		},
		{
			converter: webidl$3.nullableConverter(webidl$3.converters.boolean),
			key: "httpOnly",
			defaultValue: () => null
		},
		{
			converter: webidl$3.converters.USVString,
			key: "sameSite",
			allowedValues: [
				"Strict",
				"Lax",
				"None"
			]
		},
		{
			converter: webidl$3.sequenceConverter(webidl$3.converters.DOMString),
			key: "unparsed",
			defaultValue: () => new Array(0)
		}
	]);
	module.exports = {
		getCookies: getCookies$1,
		deleteCookie: deleteCookie$1,
		getSetCookies: getSetCookies$1,
		setCookie: setCookie$1
	};
}));
var require_events = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { webidl: webidl$2 } = require_webidl();
	var { kEnumerableProperty: kEnumerableProperty$2 } = require_util$7();
	var { kConstruct: kConstruct$1 } = require_symbols$4();
	var { MessagePort } = __require("node:worker_threads");
	var MessageEvent$1 = class MessageEvent$1 extends Event {
		#eventInit;
		constructor(type, eventInitDict = {}) {
			if (type === kConstruct$1) {
				super(arguments[1], arguments[2]);
				webidl$2.util.markAsUncloneable(this);
				return;
			}
			const prefix = "MessageEvent constructor";
			webidl$2.argumentLengthCheck(arguments, 1, prefix);
			type = webidl$2.converters.DOMString(type, prefix, "type");
			eventInitDict = webidl$2.converters.MessageEventInit(eventInitDict, prefix, "eventInitDict");
			super(type, eventInitDict);
			this.#eventInit = eventInitDict;
			webidl$2.util.markAsUncloneable(this);
		}
		get data() {
			webidl$2.brandCheck(this, MessageEvent$1);
			return this.#eventInit.data;
		}
		get origin() {
			webidl$2.brandCheck(this, MessageEvent$1);
			return this.#eventInit.origin;
		}
		get lastEventId() {
			webidl$2.brandCheck(this, MessageEvent$1);
			return this.#eventInit.lastEventId;
		}
		get source() {
			webidl$2.brandCheck(this, MessageEvent$1);
			return this.#eventInit.source;
		}
		get ports() {
			webidl$2.brandCheck(this, MessageEvent$1);
			if (!Object.isFrozen(this.#eventInit.ports)) Object.freeze(this.#eventInit.ports);
			return this.#eventInit.ports;
		}
		initMessageEvent(type, bubbles = false, cancelable = false, data = null, origin = "", lastEventId = "", source = null, ports = []) {
			webidl$2.brandCheck(this, MessageEvent$1);
			webidl$2.argumentLengthCheck(arguments, 1, "MessageEvent.initMessageEvent");
			return new MessageEvent$1(type, {
				bubbles,
				cancelable,
				data,
				origin,
				lastEventId,
				source,
				ports
			});
		}
		static createFastMessageEvent(type, init) {
			const messageEvent = new MessageEvent$1(kConstruct$1, type, init);
			messageEvent.#eventInit = init;
			messageEvent.#eventInit.data ??= null;
			messageEvent.#eventInit.origin ??= "";
			messageEvent.#eventInit.lastEventId ??= "";
			messageEvent.#eventInit.source ??= null;
			messageEvent.#eventInit.ports ??= [];
			return messageEvent;
		}
	};
	var { createFastMessageEvent: createFastMessageEvent$2 } = MessageEvent$1;
	delete MessageEvent$1.createFastMessageEvent;
	var CloseEvent$3 = class CloseEvent$3 extends Event {
		#eventInit;
		constructor(type, eventInitDict = {}) {
			const prefix = "CloseEvent constructor";
			webidl$2.argumentLengthCheck(arguments, 1, prefix);
			type = webidl$2.converters.DOMString(type, prefix, "type");
			eventInitDict = webidl$2.converters.CloseEventInit(eventInitDict);
			super(type, eventInitDict);
			this.#eventInit = eventInitDict;
			webidl$2.util.markAsUncloneable(this);
		}
		get wasClean() {
			webidl$2.brandCheck(this, CloseEvent$3);
			return this.#eventInit.wasClean;
		}
		get code() {
			webidl$2.brandCheck(this, CloseEvent$3);
			return this.#eventInit.code;
		}
		get reason() {
			webidl$2.brandCheck(this, CloseEvent$3);
			return this.#eventInit.reason;
		}
	};
	var ErrorEvent$3 = class ErrorEvent$3 extends Event {
		#eventInit;
		constructor(type, eventInitDict) {
			const prefix = "ErrorEvent constructor";
			webidl$2.argumentLengthCheck(arguments, 1, prefix);
			super(type, eventInitDict);
			webidl$2.util.markAsUncloneable(this);
			type = webidl$2.converters.DOMString(type, prefix, "type");
			eventInitDict = webidl$2.converters.ErrorEventInit(eventInitDict ?? {});
			this.#eventInit = eventInitDict;
		}
		get message() {
			webidl$2.brandCheck(this, ErrorEvent$3);
			return this.#eventInit.message;
		}
		get filename() {
			webidl$2.brandCheck(this, ErrorEvent$3);
			return this.#eventInit.filename;
		}
		get lineno() {
			webidl$2.brandCheck(this, ErrorEvent$3);
			return this.#eventInit.lineno;
		}
		get colno() {
			webidl$2.brandCheck(this, ErrorEvent$3);
			return this.#eventInit.colno;
		}
		get error() {
			webidl$2.brandCheck(this, ErrorEvent$3);
			return this.#eventInit.error;
		}
	};
	Object.defineProperties(MessageEvent$1.prototype, {
		[Symbol.toStringTag]: {
			value: "MessageEvent",
			configurable: true
		},
		data: kEnumerableProperty$2,
		origin: kEnumerableProperty$2,
		lastEventId: kEnumerableProperty$2,
		source: kEnumerableProperty$2,
		ports: kEnumerableProperty$2,
		initMessageEvent: kEnumerableProperty$2
	});
	Object.defineProperties(CloseEvent$3.prototype, {
		[Symbol.toStringTag]: {
			value: "CloseEvent",
			configurable: true
		},
		reason: kEnumerableProperty$2,
		code: kEnumerableProperty$2,
		wasClean: kEnumerableProperty$2
	});
	Object.defineProperties(ErrorEvent$3.prototype, {
		[Symbol.toStringTag]: {
			value: "ErrorEvent",
			configurable: true
		},
		message: kEnumerableProperty$2,
		filename: kEnumerableProperty$2,
		lineno: kEnumerableProperty$2,
		colno: kEnumerableProperty$2,
		error: kEnumerableProperty$2
	});
	webidl$2.converters.MessagePort = webidl$2.interfaceConverter(MessagePort);
	webidl$2.converters["sequence<MessagePort>"] = webidl$2.sequenceConverter(webidl$2.converters.MessagePort);
	var eventInit = [
		{
			key: "bubbles",
			converter: webidl$2.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "cancelable",
			converter: webidl$2.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "composed",
			converter: webidl$2.converters.boolean,
			defaultValue: () => false
		}
	];
	webidl$2.converters.MessageEventInit = webidl$2.dictionaryConverter([
		...eventInit,
		{
			key: "data",
			converter: webidl$2.converters.any,
			defaultValue: () => null
		},
		{
			key: "origin",
			converter: webidl$2.converters.USVString,
			defaultValue: () => ""
		},
		{
			key: "lastEventId",
			converter: webidl$2.converters.DOMString,
			defaultValue: () => ""
		},
		{
			key: "source",
			converter: webidl$2.nullableConverter(webidl$2.converters.MessagePort),
			defaultValue: () => null
		},
		{
			key: "ports",
			converter: webidl$2.converters["sequence<MessagePort>"],
			defaultValue: () => new Array(0)
		}
	]);
	webidl$2.converters.CloseEventInit = webidl$2.dictionaryConverter([
		...eventInit,
		{
			key: "wasClean",
			converter: webidl$2.converters.boolean,
			defaultValue: () => false
		},
		{
			key: "code",
			converter: webidl$2.converters["unsigned short"],
			defaultValue: () => 0
		},
		{
			key: "reason",
			converter: webidl$2.converters.USVString,
			defaultValue: () => ""
		}
	]);
	webidl$2.converters.ErrorEventInit = webidl$2.dictionaryConverter([
		...eventInit,
		{
			key: "message",
			converter: webidl$2.converters.DOMString,
			defaultValue: () => ""
		},
		{
			key: "filename",
			converter: webidl$2.converters.USVString,
			defaultValue: () => ""
		},
		{
			key: "lineno",
			converter: webidl$2.converters["unsigned long"],
			defaultValue: () => 0
		},
		{
			key: "colno",
			converter: webidl$2.converters["unsigned long"],
			defaultValue: () => 0
		},
		{
			key: "error",
			converter: webidl$2.converters.any
		}
	]);
	module.exports = {
		MessageEvent: MessageEvent$1,
		CloseEvent: CloseEvent$3,
		ErrorEvent: ErrorEvent$3,
		createFastMessageEvent: createFastMessageEvent$2
	};
}));
var require_constants = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var uid$1 = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
	var staticPropertyDescriptors$1 = {
		enumerable: true,
		writable: false,
		configurable: false
	};
	var states$4 = {
		CONNECTING: 0,
		OPEN: 1,
		CLOSING: 2,
		CLOSED: 3
	};
	var sentCloseFrameState$3 = {
		NOT_SENT: 0,
		PROCESSING: 1,
		SENT: 2
	};
	var opcodes$4 = {
		CONTINUATION: 0,
		TEXT: 1,
		BINARY: 2,
		CLOSE: 8,
		PING: 9,
		PONG: 10
	};
	var maxUnsigned16Bit$1 = 2 ** 16 - 1;
	var parserStates$1 = {
		INFO: 0,
		PAYLOADLENGTH_16: 2,
		PAYLOADLENGTH_64: 3,
		READ_DATA: 4
	};
	var emptyBuffer$2 = Buffer.allocUnsafe(0);
	module.exports = {
		uid: uid$1,
		sentCloseFrameState: sentCloseFrameState$3,
		staticPropertyDescriptors: staticPropertyDescriptors$1,
		states: states$4,
		opcodes: opcodes$4,
		maxUnsigned16Bit: maxUnsigned16Bit$1,
		parserStates: parserStates$1,
		emptyBuffer: emptyBuffer$2,
		sendHints: {
			string: 1,
			typedArray: 2,
			arrayBuffer: 3,
			blob: 4
		}
	};
}));
var require_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		kWebSocketURL: Symbol("url"),
		kReadyState: Symbol("ready state"),
		kController: Symbol("controller"),
		kResponse: Symbol("response"),
		kBinaryType: Symbol("binary type"),
		kSentClose: Symbol("sent close"),
		kReceivedClose: Symbol("received close"),
		kByteParser: Symbol("byte parser")
	};
}));
var require_util$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { kReadyState: kReadyState$3, kController: kController$1, kResponse: kResponse$3, kBinaryType: kBinaryType$1, kWebSocketURL: kWebSocketURL$1 } = require_symbols();
	var { states: states$3, opcodes: opcodes$3 } = require_constants();
	var { ErrorEvent: ErrorEvent$2, createFastMessageEvent: createFastMessageEvent$1 } = require_events();
	var { isUtf8 } = __require("node:buffer");
	var { collectASequenceOfCodePointsFast, removeHTTPWhitespace } = require_data_url();
	function isConnecting$1(ws) {
		return ws[kReadyState$3] === states$3.CONNECTING;
	}
	function isEstablished$2(ws) {
		return ws[kReadyState$3] === states$3.OPEN;
	}
	function isClosing$2(ws) {
		return ws[kReadyState$3] === states$3.CLOSING;
	}
	function isClosed$1(ws) {
		return ws[kReadyState$3] === states$3.CLOSED;
	}
	function fireEvent$2(e, target, eventFactory = (type, init) => new Event(type, init), eventInitDict = {}) {
		const event = eventFactory(e, eventInitDict);
		target.dispatchEvent(event);
	}
	function websocketMessageReceived$1(ws, type, data) {
		if (ws[kReadyState$3] !== states$3.OPEN) return;
		let dataForEvent;
		if (type === opcodes$3.TEXT) try {
			dataForEvent = utf8Decode$1(data);
		} catch {
			failWebsocketConnection$2(ws, "Received invalid UTF-8 in text frame.");
			return;
		}
		else if (type === opcodes$3.BINARY) if (ws[kBinaryType$1] === "blob") dataForEvent = new Blob([data]);
		else dataForEvent = toArrayBuffer(data);
		fireEvent$2("message", ws, createFastMessageEvent$1, {
			origin: ws[kWebSocketURL$1].origin,
			data: dataForEvent
		});
	}
	function toArrayBuffer(buffer$1) {
		if (buffer$1.byteLength === buffer$1.buffer.byteLength) return buffer$1.buffer;
		return buffer$1.buffer.slice(buffer$1.byteOffset, buffer$1.byteOffset + buffer$1.byteLength);
	}
	function isValidSubprotocol$1(protocol$1) {
		if (protocol$1.length === 0) return false;
		for (let i = 0; i < protocol$1.length; ++i) {
			const code = protocol$1.charCodeAt(i);
			if (code < 33 || code > 126 || code === 34 || code === 40 || code === 41 || code === 44 || code === 47 || code === 58 || code === 59 || code === 60 || code === 61 || code === 62 || code === 63 || code === 64 || code === 91 || code === 92 || code === 93 || code === 123 || code === 125) return false;
		}
		return true;
	}
	function isValidStatusCode$1(code) {
		if (code >= 1e3 && code < 1015) return code !== 1004 && code !== 1005 && code !== 1006;
		return code >= 3e3 && code <= 4999;
	}
	function failWebsocketConnection$2(ws, reason) {
		const { [kController$1]: controller, [kResponse$3]: response } = ws;
		controller.abort();
		if (response?.socket && !response.socket.destroyed) response.socket.destroy();
		if (reason) fireEvent$2("error", ws, (type, init) => new ErrorEvent$2(type, init), {
			error: new Error(reason),
			message: reason
		});
	}
	function isControlFrame$1(opcode) {
		return opcode === opcodes$3.CLOSE || opcode === opcodes$3.PING || opcode === opcodes$3.PONG;
	}
	function isContinuationFrame$1(opcode) {
		return opcode === opcodes$3.CONTINUATION;
	}
	function isTextBinaryFrame$1(opcode) {
		return opcode === opcodes$3.TEXT || opcode === opcodes$3.BINARY;
	}
	function isValidOpcode$1(opcode) {
		return isTextBinaryFrame$1(opcode) || isContinuationFrame$1(opcode) || isControlFrame$1(opcode);
	}
	function parseExtensions$1(extensions) {
		const position = { position: 0 };
		const extensionList = /* @__PURE__ */ new Map();
		while (position.position < extensions.length) {
			const [name, value = ""] = collectASequenceOfCodePointsFast(";", extensions, position).split("=");
			extensionList.set(removeHTTPWhitespace(name, true, false), removeHTTPWhitespace(value, false, true));
			position.position++;
		}
		return extensionList;
	}
	function isValidClientWindowBits$1(value) {
		for (let i = 0; i < value.length; i++) {
			const byte = value.charCodeAt(i);
			if (byte < 48 || byte > 57) return false;
		}
		return true;
	}
	var hasIntl = typeof process.versions.icu === "string";
	var fatalDecoder = hasIntl ? new TextDecoder("utf-8", { fatal: true }) : void 0;
	var utf8Decode$1 = hasIntl ? fatalDecoder.decode.bind(fatalDecoder) : function(buffer$1) {
		if (isUtf8(buffer$1)) return buffer$1.toString("utf-8");
		throw new TypeError("Invalid utf-8 received.");
	};
	module.exports = {
		isConnecting: isConnecting$1,
		isEstablished: isEstablished$2,
		isClosing: isClosing$2,
		isClosed: isClosed$1,
		fireEvent: fireEvent$2,
		isValidSubprotocol: isValidSubprotocol$1,
		isValidStatusCode: isValidStatusCode$1,
		failWebsocketConnection: failWebsocketConnection$2,
		websocketMessageReceived: websocketMessageReceived$1,
		utf8Decode: utf8Decode$1,
		isControlFrame: isControlFrame$1,
		isContinuationFrame: isContinuationFrame$1,
		isTextBinaryFrame: isTextBinaryFrame$1,
		isValidOpcode: isValidOpcode$1,
		parseExtensions: parseExtensions$1,
		isValidClientWindowBits: isValidClientWindowBits$1
	};
}));
var require_frame = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { maxUnsigned16Bit } = require_constants();
	var BUFFER_SIZE = 16386;
	var crypto$1;
	var buffer = null;
	var bufIdx = BUFFER_SIZE;
	try {
		crypto$1 = __require("node:crypto");
	} catch {
		crypto$1 = { randomFillSync: function randomFillSync(buffer$1, _offset, _size) {
			for (let i = 0; i < buffer$1.length; ++i) buffer$1[i] = Math.random() * 255 | 0;
			return buffer$1;
		} };
	}
	function generateMask() {
		if (bufIdx === 16386) {
			bufIdx = 0;
			crypto$1.randomFillSync(buffer ??= Buffer.allocUnsafe(BUFFER_SIZE), 0, BUFFER_SIZE);
		}
		return [
			buffer[bufIdx++],
			buffer[bufIdx++],
			buffer[bufIdx++],
			buffer[bufIdx++]
		];
	}
	var WebsocketFrameSend$3 = class {
		constructor(data) {
			this.frameData = data;
		}
		createFrame(opcode) {
			const frameData = this.frameData;
			const maskKey = generateMask();
			const bodyLength$1 = frameData?.byteLength ?? 0;
			let payloadLength = bodyLength$1;
			let offset = 6;
			if (bodyLength$1 > maxUnsigned16Bit) {
				offset += 8;
				payloadLength = 127;
			} else if (bodyLength$1 > 125) {
				offset += 2;
				payloadLength = 126;
			}
			const buffer$1 = Buffer.allocUnsafe(bodyLength$1 + offset);
			buffer$1[0] = buffer$1[1] = 0;
			buffer$1[0] |= 128;
			buffer$1[0] = (buffer$1[0] & 240) + opcode;
			/*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */
			buffer$1[offset - 4] = maskKey[0];
			buffer$1[offset - 3] = maskKey[1];
			buffer$1[offset - 2] = maskKey[2];
			buffer$1[offset - 1] = maskKey[3];
			buffer$1[1] = payloadLength;
			if (payloadLength === 126) buffer$1.writeUInt16BE(bodyLength$1, 2);
			else if (payloadLength === 127) {
				buffer$1[2] = buffer$1[3] = 0;
				buffer$1.writeUIntBE(bodyLength$1, 4, 6);
			}
			buffer$1[1] |= 128;
			for (let i = 0; i < bodyLength$1; ++i) buffer$1[offset + i] = frameData[i] ^ maskKey[i & 3];
			return buffer$1;
		}
	};
	module.exports = { WebsocketFrameSend: WebsocketFrameSend$3 };
}));
var require_connection = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { uid, states: states$2, sentCloseFrameState: sentCloseFrameState$2, emptyBuffer: emptyBuffer$1, opcodes: opcodes$2 } = require_constants();
	var { kReadyState: kReadyState$2, kSentClose: kSentClose$2, kByteParser: kByteParser$1, kReceivedClose: kReceivedClose$1, kResponse: kResponse$2 } = require_symbols();
	var { fireEvent: fireEvent$1, failWebsocketConnection: failWebsocketConnection$1, isClosing: isClosing$1, isClosed, isEstablished: isEstablished$1, parseExtensions } = require_util$1();
	var { channels: channels$1 } = require_diagnostics();
	var { CloseEvent: CloseEvent$2 } = require_events();
	var { makeRequest: makeRequest$2 } = require_request();
	var { fetching: fetching$1 } = require_fetch();
	var { Headers, getHeadersList } = require_headers();
	var { getDecodeSplit } = require_util$6();
	var { WebsocketFrameSend: WebsocketFrameSend$2 } = require_frame();
	var crypto;
	try {
		crypto = __require("node:crypto");
	} catch {}
	function establishWebSocketConnection$1(url, protocols, client, ws, onEstablish, options) {
		const requestURL = url;
		requestURL.protocol = url.protocol === "ws:" ? "http:" : "https:";
		const request$1 = makeRequest$2({
			urlList: [requestURL],
			client,
			serviceWorkers: "none",
			referrer: "no-referrer",
			mode: "websocket",
			credentials: "include",
			cache: "no-store",
			redirect: "error"
		});
		if (options.headers) request$1.headersList = getHeadersList(new Headers(options.headers));
		const keyValue = crypto.randomBytes(16).toString("base64");
		request$1.headersList.append("sec-websocket-key", keyValue);
		request$1.headersList.append("sec-websocket-version", "13");
		for (const protocol$1 of protocols) request$1.headersList.append("sec-websocket-protocol", protocol$1);
		request$1.headersList.append("sec-websocket-extensions", "permessage-deflate; client_max_window_bits");
		return fetching$1({
			request: request$1,
			useParallelQueue: true,
			dispatcher: options.dispatcher,
			processResponse(response) {
				if (response.type === "error" || response.status !== 101) {
					failWebsocketConnection$1(ws, "Received network error or non-101 status code.");
					return;
				}
				if (protocols.length !== 0 && !response.headersList.get("Sec-WebSocket-Protocol")) {
					failWebsocketConnection$1(ws, "Server did not respond with sent protocols.");
					return;
				}
				if (response.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
					failWebsocketConnection$1(ws, "Server did not set Upgrade header to \"websocket\".");
					return;
				}
				if (response.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
					failWebsocketConnection$1(ws, "Server did not set Connection header to \"upgrade\".");
					return;
				}
				const secWSAccept = response.headersList.get("Sec-WebSocket-Accept");
				const digest = crypto.createHash("sha1").update(keyValue + uid).digest("base64");
				if (secWSAccept !== digest) {
					failWebsocketConnection$1(ws, "Incorrect hash received in Sec-WebSocket-Accept header.");
					return;
				}
				const secExtension = response.headersList.get("Sec-WebSocket-Extensions");
				let extensions;
				if (secExtension !== null) {
					extensions = parseExtensions(secExtension);
					if (!extensions.has("permessage-deflate")) {
						failWebsocketConnection$1(ws, "Sec-WebSocket-Extensions header does not match.");
						return;
					}
				}
				const secProtocol = response.headersList.get("Sec-WebSocket-Protocol");
				if (secProtocol !== null) {
					if (!getDecodeSplit("sec-websocket-protocol", request$1.headersList).includes(secProtocol)) {
						failWebsocketConnection$1(ws, "Protocol was not set in the opening handshake.");
						return;
					}
				}
				response.socket.on("data", onSocketData);
				response.socket.on("close", onSocketClose);
				response.socket.on("error", onSocketError);
				if (channels$1.open.hasSubscribers) channels$1.open.publish({
					address: response.socket.address(),
					protocol: secProtocol,
					extensions: secExtension
				});
				onEstablish(response, extensions);
			}
		});
	}
	function closeWebSocketConnection$2(ws, code, reason, reasonByteLength) {
		if (isClosing$1(ws) || isClosed(ws)) {} else if (!isEstablished$1(ws)) {
			failWebsocketConnection$1(ws, "Connection was closed before it was established.");
			ws[kReadyState$2] = states$2.CLOSING;
		} else if (ws[kSentClose$2] === sentCloseFrameState$2.NOT_SENT) {
			ws[kSentClose$2] = sentCloseFrameState$2.PROCESSING;
			const frame = new WebsocketFrameSend$2();
			if (code !== void 0 && reason === void 0) {
				frame.frameData = Buffer.allocUnsafe(2);
				frame.frameData.writeUInt16BE(code, 0);
			} else if (code !== void 0 && reason !== void 0) {
				frame.frameData = Buffer.allocUnsafe(2 + reasonByteLength);
				frame.frameData.writeUInt16BE(code, 0);
				frame.frameData.write(reason, 2, "utf-8");
			} else frame.frameData = emptyBuffer$1;
			ws[kResponse$2].socket.write(frame.createFrame(opcodes$2.CLOSE));
			ws[kSentClose$2] = sentCloseFrameState$2.SENT;
			ws[kReadyState$2] = states$2.CLOSING;
		} else ws[kReadyState$2] = states$2.CLOSING;
	}
	function onSocketData(chunk) {
		if (!this.ws[kByteParser$1].write(chunk)) this.pause();
	}
	function onSocketClose() {
		const { ws } = this;
		const { [kResponse$2]: response } = ws;
		response.socket.off("data", onSocketData);
		response.socket.off("close", onSocketClose);
		response.socket.off("error", onSocketError);
		const wasClean = ws[kSentClose$2] === sentCloseFrameState$2.SENT && ws[kReceivedClose$1];
		let code = 1005;
		let reason = "";
		const result = ws[kByteParser$1].closingInfo;
		if (result && !result.error) {
			code = result.code ?? 1005;
			reason = result.reason;
		} else if (!ws[kReceivedClose$1]) code = 1006;
		ws[kReadyState$2] = states$2.CLOSED;
		fireEvent$1("close", ws, (type, init) => new CloseEvent$2(type, init), {
			wasClean,
			code,
			reason
		});
		if (channels$1.close.hasSubscribers) channels$1.close.publish({
			websocket: ws,
			code,
			reason
		});
	}
	function onSocketError(error) {
		const { ws } = this;
		ws[kReadyState$2] = states$2.CLOSING;
		if (channels$1.socketError.hasSubscribers) channels$1.socketError.publish(error);
		this.destroy();
	}
	module.exports = {
		establishWebSocketConnection: establishWebSocketConnection$1,
		closeWebSocketConnection: closeWebSocketConnection$2
	};
}));
var require_permessage_deflate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { createInflateRaw, Z_DEFAULT_WINDOWBITS } = __require("node:zlib");
	var { isValidClientWindowBits } = require_util$1();
	var tail = Buffer.from([
		0,
		0,
		255,
		255
	]);
	var kBuffer = Symbol("kBuffer");
	var kLength = Symbol("kLength");
	var PerMessageDeflate$1 = class {
		#inflate;
		#options = {};
		constructor(extensions) {
			this.#options.serverNoContextTakeover = extensions.has("server_no_context_takeover");
			this.#options.serverMaxWindowBits = extensions.get("server_max_window_bits");
		}
		decompress(chunk, fin, callback) {
			if (!this.#inflate) {
				let windowBits = Z_DEFAULT_WINDOWBITS;
				if (this.#options.serverMaxWindowBits) {
					if (!isValidClientWindowBits(this.#options.serverMaxWindowBits)) {
						callback(/* @__PURE__ */ new Error("Invalid server_max_window_bits"));
						return;
					}
					windowBits = Number.parseInt(this.#options.serverMaxWindowBits);
				}
				this.#inflate = createInflateRaw({ windowBits });
				this.#inflate[kBuffer] = [];
				this.#inflate[kLength] = 0;
				this.#inflate.on("data", (data) => {
					this.#inflate[kBuffer].push(data);
					this.#inflate[kLength] += data.length;
				});
				this.#inflate.on("error", (err) => {
					this.#inflate = null;
					callback(err);
				});
			}
			this.#inflate.write(chunk);
			if (fin) this.#inflate.write(tail);
			this.#inflate.flush(() => {
				const full = Buffer.concat(this.#inflate[kBuffer], this.#inflate[kLength]);
				this.#inflate[kBuffer].length = 0;
				this.#inflate[kLength] = 0;
				callback(null, full);
			});
		}
	};
	module.exports = { PerMessageDeflate: PerMessageDeflate$1 };
}));
var require_receiver = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Writable } = __require("node:stream");
	var assert = __require("node:assert");
	var { parserStates, opcodes: opcodes$1, states: states$1, emptyBuffer, sentCloseFrameState: sentCloseFrameState$1 } = require_constants();
	var { kReadyState: kReadyState$1, kSentClose: kSentClose$1, kResponse: kResponse$1, kReceivedClose } = require_symbols();
	var { channels } = require_diagnostics();
	var { isValidStatusCode, isValidOpcode, failWebsocketConnection, websocketMessageReceived, utf8Decode, isControlFrame, isTextBinaryFrame, isContinuationFrame } = require_util$1();
	var { WebsocketFrameSend: WebsocketFrameSend$1 } = require_frame();
	var { closeWebSocketConnection: closeWebSocketConnection$1 } = require_connection();
	var { PerMessageDeflate } = require_permessage_deflate();
	var ByteParser$1 = class extends Writable {
		#buffers = [];
		#byteOffset = 0;
		#loop = false;
		#state = parserStates.INFO;
		#info = {};
		#fragments = [];
		#extensions;
		constructor(ws, extensions) {
			super();
			this.ws = ws;
			this.#extensions = extensions == null ? /* @__PURE__ */ new Map() : extensions;
			if (this.#extensions.has("permessage-deflate")) this.#extensions.set("permessage-deflate", new PerMessageDeflate(extensions));
		}
		_write(chunk, _, callback) {
			this.#buffers.push(chunk);
			this.#byteOffset += chunk.length;
			this.#loop = true;
			this.run(callback);
		}
		run(callback) {
			while (this.#loop) if (this.#state === parserStates.INFO) {
				if (this.#byteOffset < 2) return callback();
				const buffer$1 = this.consume(2);
				const fin = (buffer$1[0] & 128) !== 0;
				const opcode = buffer$1[0] & 15;
				const masked = (buffer$1[1] & 128) === 128;
				const fragmented = !fin && opcode !== opcodes$1.CONTINUATION;
				const payloadLength = buffer$1[1] & 127;
				const rsv1 = buffer$1[0] & 64;
				const rsv2 = buffer$1[0] & 32;
				const rsv3 = buffer$1[0] & 16;
				if (!isValidOpcode(opcode)) {
					failWebsocketConnection(this.ws, "Invalid opcode received");
					return callback();
				}
				if (masked) {
					failWebsocketConnection(this.ws, "Frame cannot be masked");
					return callback();
				}
				if (rsv1 !== 0 && !this.#extensions.has("permessage-deflate")) {
					failWebsocketConnection(this.ws, "Expected RSV1 to be clear.");
					return;
				}
				if (rsv2 !== 0 || rsv3 !== 0) {
					failWebsocketConnection(this.ws, "RSV1, RSV2, RSV3 must be clear");
					return;
				}
				if (fragmented && !isTextBinaryFrame(opcode)) {
					failWebsocketConnection(this.ws, "Invalid frame type was fragmented.");
					return;
				}
				if (isTextBinaryFrame(opcode) && this.#fragments.length > 0) {
					failWebsocketConnection(this.ws, "Expected continuation frame");
					return;
				}
				if (this.#info.fragmented && fragmented) {
					failWebsocketConnection(this.ws, "Fragmented frame exceeded 125 bytes.");
					return;
				}
				if ((payloadLength > 125 || fragmented) && isControlFrame(opcode)) {
					failWebsocketConnection(this.ws, "Control frame either too large or fragmented");
					return;
				}
				if (isContinuationFrame(opcode) && this.#fragments.length === 0 && !this.#info.compressed) {
					failWebsocketConnection(this.ws, "Unexpected continuation frame");
					return;
				}
				if (payloadLength <= 125) {
					this.#info.payloadLength = payloadLength;
					this.#state = parserStates.READ_DATA;
				} else if (payloadLength === 126) this.#state = parserStates.PAYLOADLENGTH_16;
				else if (payloadLength === 127) this.#state = parserStates.PAYLOADLENGTH_64;
				if (isTextBinaryFrame(opcode)) {
					this.#info.binaryType = opcode;
					this.#info.compressed = rsv1 !== 0;
				}
				this.#info.opcode = opcode;
				this.#info.masked = masked;
				this.#info.fin = fin;
				this.#info.fragmented = fragmented;
			} else if (this.#state === parserStates.PAYLOADLENGTH_16) {
				if (this.#byteOffset < 2) return callback();
				const buffer$1 = this.consume(2);
				this.#info.payloadLength = buffer$1.readUInt16BE(0);
				this.#state = parserStates.READ_DATA;
			} else if (this.#state === parserStates.PAYLOADLENGTH_64) {
				if (this.#byteOffset < 8) return callback();
				const buffer$1 = this.consume(8);
				const upper = buffer$1.readUInt32BE(0);
				if (upper > 2 ** 31 - 1) {
					failWebsocketConnection(this.ws, "Received payload length > 2^31 bytes.");
					return;
				}
				const lower = buffer$1.readUInt32BE(4);
				this.#info.payloadLength = (upper << 8) + lower;
				this.#state = parserStates.READ_DATA;
			} else if (this.#state === parserStates.READ_DATA) {
				if (this.#byteOffset < this.#info.payloadLength) return callback();
				const body = this.consume(this.#info.payloadLength);
				if (isControlFrame(this.#info.opcode)) {
					this.#loop = this.parseControlFrame(body);
					this.#state = parserStates.INFO;
				} else if (!this.#info.compressed) {
					this.#fragments.push(body);
					if (!this.#info.fragmented && this.#info.fin) {
						const fullMessage = Buffer.concat(this.#fragments);
						websocketMessageReceived(this.ws, this.#info.binaryType, fullMessage);
						this.#fragments.length = 0;
					}
					this.#state = parserStates.INFO;
				} else {
					this.#extensions.get("permessage-deflate").decompress(body, this.#info.fin, (error, data) => {
						if (error) {
							closeWebSocketConnection$1(this.ws, 1007, error.message, error.message.length);
							return;
						}
						this.#fragments.push(data);
						if (!this.#info.fin) {
							this.#state = parserStates.INFO;
							this.#loop = true;
							this.run(callback);
							return;
						}
						websocketMessageReceived(this.ws, this.#info.binaryType, Buffer.concat(this.#fragments));
						this.#loop = true;
						this.#state = parserStates.INFO;
						this.#fragments.length = 0;
						this.run(callback);
					});
					this.#loop = false;
					break;
				}
			}
		}
		consume(n) {
			if (n > this.#byteOffset) throw new Error("Called consume() before buffers satiated.");
			else if (n === 0) return emptyBuffer;
			if (this.#buffers[0].length === n) {
				this.#byteOffset -= this.#buffers[0].length;
				return this.#buffers.shift();
			}
			const buffer$1 = Buffer.allocUnsafe(n);
			let offset = 0;
			while (offset !== n) {
				const next = this.#buffers[0];
				const { length } = next;
				if (length + offset === n) {
					buffer$1.set(this.#buffers.shift(), offset);
					break;
				} else if (length + offset > n) {
					buffer$1.set(next.subarray(0, n - offset), offset);
					this.#buffers[0] = next.subarray(n - offset);
					break;
				} else {
					buffer$1.set(this.#buffers.shift(), offset);
					offset += next.length;
				}
			}
			this.#byteOffset -= n;
			return buffer$1;
		}
		parseCloseBody(data) {
			assert(data.length !== 1);
			let code;
			if (data.length >= 2) code = data.readUInt16BE(0);
			if (code !== void 0 && !isValidStatusCode(code)) return {
				code: 1002,
				reason: "Invalid status code",
				error: true
			};
			let reason = data.subarray(2);
			if (reason[0] === 239 && reason[1] === 187 && reason[2] === 191) reason = reason.subarray(3);
			try {
				reason = utf8Decode(reason);
			} catch {
				return {
					code: 1007,
					reason: "Invalid UTF-8",
					error: true
				};
			}
			return {
				code,
				reason,
				error: false
			};
		}
		parseControlFrame(body) {
			const { opcode, payloadLength } = this.#info;
			if (opcode === opcodes$1.CLOSE) {
				if (payloadLength === 1) {
					failWebsocketConnection(this.ws, "Received close frame with a 1-byte body.");
					return false;
				}
				this.#info.closeInfo = this.parseCloseBody(body);
				if (this.#info.closeInfo.error) {
					const { code, reason } = this.#info.closeInfo;
					closeWebSocketConnection$1(this.ws, code, reason, reason.length);
					failWebsocketConnection(this.ws, reason);
					return false;
				}
				if (this.ws[kSentClose$1] !== sentCloseFrameState$1.SENT) {
					let body$1 = emptyBuffer;
					if (this.#info.closeInfo.code) {
						body$1 = Buffer.allocUnsafe(2);
						body$1.writeUInt16BE(this.#info.closeInfo.code, 0);
					}
					const closeFrame = new WebsocketFrameSend$1(body$1);
					this.ws[kResponse$1].socket.write(closeFrame.createFrame(opcodes$1.CLOSE), (err) => {
						if (!err) this.ws[kSentClose$1] = sentCloseFrameState$1.SENT;
					});
				}
				this.ws[kReadyState$1] = states$1.CLOSING;
				this.ws[kReceivedClose] = true;
				return false;
			} else if (opcode === opcodes$1.PING) {
				if (!this.ws[kReceivedClose]) {
					const frame = new WebsocketFrameSend$1(body);
					this.ws[kResponse$1].socket.write(frame.createFrame(opcodes$1.PONG));
					if (channels.ping.hasSubscribers) channels.ping.publish({ payload: body });
				}
			} else if (opcode === opcodes$1.PONG) {
				if (channels.pong.hasSubscribers) channels.pong.publish({ payload: body });
			}
			return true;
		}
		get closingInfo() {
			return this.#info.closeInfo;
		}
	};
	module.exports = { ByteParser: ByteParser$1 };
}));
var require_sender = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { WebsocketFrameSend } = require_frame();
	var { opcodes, sendHints: sendHints$1 } = require_constants();
	var FixedQueue = require_fixed_queue();
	var FastBuffer = Buffer[Symbol.species];
	var SendQueue$1 = class {
		#queue = new FixedQueue();
		#running = false;
		#socket;
		constructor(socket) {
			this.#socket = socket;
		}
		add(item, cb, hint) {
			if (hint !== sendHints$1.blob) {
				const frame = createFrame(item, hint);
				if (!this.#running) this.#socket.write(frame, cb);
				else {
					const node$1 = {
						promise: null,
						callback: cb,
						frame
					};
					this.#queue.push(node$1);
				}
				return;
			}
			const node = {
				promise: item.arrayBuffer().then((ab) => {
					node.promise = null;
					node.frame = createFrame(ab, hint);
				}),
				callback: cb,
				frame: null
			};
			this.#queue.push(node);
			if (!this.#running) this.#run();
		}
		async #run() {
			this.#running = true;
			const queue = this.#queue;
			while (!queue.isEmpty()) {
				const node = queue.shift();
				if (node.promise !== null) await node.promise;
				this.#socket.write(node.frame, node.callback);
				node.callback = node.frame = null;
			}
			this.#running = false;
		}
	};
	function createFrame(data, hint) {
		return new WebsocketFrameSend(toBuffer(data, hint)).createFrame(hint === sendHints$1.string ? opcodes.TEXT : opcodes.BINARY);
	}
	function toBuffer(data, hint) {
		switch (hint) {
			case sendHints$1.string: return Buffer.from(data);
			case sendHints$1.arrayBuffer:
			case sendHints$1.blob: return new FastBuffer(data);
			case sendHints$1.typedArray: return new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
		}
	}
	module.exports = { SendQueue: SendQueue$1 };
}));
var require_websocket = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { webidl: webidl$1 } = require_webidl();
	var { URLSerializer } = require_data_url();
	var { environmentSettingsObject: environmentSettingsObject$1 } = require_util$6();
	var { staticPropertyDescriptors, states, sentCloseFrameState, sendHints } = require_constants();
	var { kWebSocketURL, kReadyState, kController, kBinaryType, kResponse, kSentClose, kByteParser } = require_symbols();
	var { isConnecting, isEstablished, isClosing, isValidSubprotocol, fireEvent } = require_util$1();
	var { establishWebSocketConnection, closeWebSocketConnection } = require_connection();
	var { ByteParser } = require_receiver();
	var { kEnumerableProperty: kEnumerableProperty$1, isBlobLike } = require_util$7();
	var { getGlobalDispatcher: getGlobalDispatcher$1 } = require_global();
	var { types } = __require("node:util");
	var { ErrorEvent: ErrorEvent$1, CloseEvent: CloseEvent$1 } = require_events();
	var { SendQueue } = require_sender();
	var WebSocket = class WebSocket extends EventTarget {
		#events = {
			open: null,
			error: null,
			close: null,
			message: null
		};
		#bufferedAmount = 0;
		#protocol = "";
		#extensions = "";
		#sendQueue;
		constructor(url, protocols = []) {
			super();
			webidl$1.util.markAsUncloneable(this);
			const prefix = "WebSocket constructor";
			webidl$1.argumentLengthCheck(arguments, 1, prefix);
			const options = webidl$1.converters["DOMString or sequence<DOMString> or WebSocketInit"](protocols, prefix, "options");
			url = webidl$1.converters.USVString(url, prefix, "url");
			protocols = options.protocols;
			const baseURL = environmentSettingsObject$1.settingsObject.baseUrl;
			let urlRecord;
			try {
				urlRecord = new URL(url, baseURL);
			} catch (e) {
				throw new DOMException(e, "SyntaxError");
			}
			if (urlRecord.protocol === "http:") urlRecord.protocol = "ws:";
			else if (urlRecord.protocol === "https:") urlRecord.protocol = "wss:";
			if (urlRecord.protocol !== "ws:" && urlRecord.protocol !== "wss:") throw new DOMException(`Expected a ws: or wss: protocol, got ${urlRecord.protocol}`, "SyntaxError");
			if (urlRecord.hash || urlRecord.href.endsWith("#")) throw new DOMException("Got fragment", "SyntaxError");
			if (typeof protocols === "string") protocols = [protocols];
			if (protocols.length !== new Set(protocols.map((p) => p.toLowerCase())).size) throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
			if (protocols.length > 0 && !protocols.every((p) => isValidSubprotocol(p))) throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
			this[kWebSocketURL] = new URL(urlRecord.href);
			const client = environmentSettingsObject$1.settingsObject;
			this[kController] = establishWebSocketConnection(urlRecord, protocols, client, this, (response, extensions) => this.#onConnectionEstablished(response, extensions), options);
			this[kReadyState] = WebSocket.CONNECTING;
			this[kSentClose] = sentCloseFrameState.NOT_SENT;
			this[kBinaryType] = "blob";
		}
		close(code = void 0, reason = void 0) {
			webidl$1.brandCheck(this, WebSocket);
			const prefix = "WebSocket.close";
			if (code !== void 0) code = webidl$1.converters["unsigned short"](code, prefix, "code", { clamp: true });
			if (reason !== void 0) reason = webidl$1.converters.USVString(reason, prefix, "reason");
			if (code !== void 0) {
				if (code !== 1e3 && (code < 3e3 || code > 4999)) throw new DOMException("invalid code", "InvalidAccessError");
			}
			let reasonByteLength = 0;
			if (reason !== void 0) {
				reasonByteLength = Buffer.byteLength(reason);
				if (reasonByteLength > 123) throw new DOMException(`Reason must be less than 123 bytes; received ${reasonByteLength}`, "SyntaxError");
			}
			closeWebSocketConnection(this, code, reason, reasonByteLength);
		}
		send(data) {
			webidl$1.brandCheck(this, WebSocket);
			const prefix = "WebSocket.send";
			webidl$1.argumentLengthCheck(arguments, 1, prefix);
			data = webidl$1.converters.WebSocketSendData(data, prefix, "data");
			if (isConnecting(this)) throw new DOMException("Sent before connected.", "InvalidStateError");
			if (!isEstablished(this) || isClosing(this)) return;
			if (typeof data === "string") {
				const length = Buffer.byteLength(data);
				this.#bufferedAmount += length;
				this.#sendQueue.add(data, () => {
					this.#bufferedAmount -= length;
				}, sendHints.string);
			} else if (types.isArrayBuffer(data)) {
				this.#bufferedAmount += data.byteLength;
				this.#sendQueue.add(data, () => {
					this.#bufferedAmount -= data.byteLength;
				}, sendHints.arrayBuffer);
			} else if (ArrayBuffer.isView(data)) {
				this.#bufferedAmount += data.byteLength;
				this.#sendQueue.add(data, () => {
					this.#bufferedAmount -= data.byteLength;
				}, sendHints.typedArray);
			} else if (isBlobLike(data)) {
				this.#bufferedAmount += data.size;
				this.#sendQueue.add(data, () => {
					this.#bufferedAmount -= data.size;
				}, sendHints.blob);
			}
		}
		get readyState() {
			webidl$1.brandCheck(this, WebSocket);
			return this[kReadyState];
		}
		get bufferedAmount() {
			webidl$1.brandCheck(this, WebSocket);
			return this.#bufferedAmount;
		}
		get url() {
			webidl$1.brandCheck(this, WebSocket);
			return URLSerializer(this[kWebSocketURL]);
		}
		get extensions() {
			webidl$1.brandCheck(this, WebSocket);
			return this.#extensions;
		}
		get protocol() {
			webidl$1.brandCheck(this, WebSocket);
			return this.#protocol;
		}
		get onopen() {
			webidl$1.brandCheck(this, WebSocket);
			return this.#events.open;
		}
		set onopen(fn) {
			webidl$1.brandCheck(this, WebSocket);
			if (this.#events.open) this.removeEventListener("open", this.#events.open);
			if (typeof fn === "function") {
				this.#events.open = fn;
				this.addEventListener("open", fn);
			} else this.#events.open = null;
		}
		get onerror() {
			webidl$1.brandCheck(this, WebSocket);
			return this.#events.error;
		}
		set onerror(fn) {
			webidl$1.brandCheck(this, WebSocket);
			if (this.#events.error) this.removeEventListener("error", this.#events.error);
			if (typeof fn === "function") {
				this.#events.error = fn;
				this.addEventListener("error", fn);
			} else this.#events.error = null;
		}
		get onclose() {
			webidl$1.brandCheck(this, WebSocket);
			return this.#events.close;
		}
		set onclose(fn) {
			webidl$1.brandCheck(this, WebSocket);
			if (this.#events.close) this.removeEventListener("close", this.#events.close);
			if (typeof fn === "function") {
				this.#events.close = fn;
				this.addEventListener("close", fn);
			} else this.#events.close = null;
		}
		get onmessage() {
			webidl$1.brandCheck(this, WebSocket);
			return this.#events.message;
		}
		set onmessage(fn) {
			webidl$1.brandCheck(this, WebSocket);
			if (this.#events.message) this.removeEventListener("message", this.#events.message);
			if (typeof fn === "function") {
				this.#events.message = fn;
				this.addEventListener("message", fn);
			} else this.#events.message = null;
		}
		get binaryType() {
			webidl$1.brandCheck(this, WebSocket);
			return this[kBinaryType];
		}
		set binaryType(type) {
			webidl$1.brandCheck(this, WebSocket);
			if (type !== "blob" && type !== "arraybuffer") this[kBinaryType] = "blob";
			else this[kBinaryType] = type;
		}
		#onConnectionEstablished(response, parsedExtensions) {
			this[kResponse] = response;
			const parser = new ByteParser(this, parsedExtensions);
			parser.on("drain", onParserDrain);
			parser.on("error", onParserError.bind(this));
			response.socket.ws = this;
			this[kByteParser] = parser;
			this.#sendQueue = new SendQueue(response.socket);
			this[kReadyState] = states.OPEN;
			const extensions = response.headersList.get("sec-websocket-extensions");
			if (extensions !== null) this.#extensions = extensions;
			const protocol$1 = response.headersList.get("sec-websocket-protocol");
			if (protocol$1 !== null) this.#protocol = protocol$1;
			fireEvent("open", this);
		}
	};
	WebSocket.CONNECTING = WebSocket.prototype.CONNECTING = states.CONNECTING;
	WebSocket.OPEN = WebSocket.prototype.OPEN = states.OPEN;
	WebSocket.CLOSING = WebSocket.prototype.CLOSING = states.CLOSING;
	WebSocket.CLOSED = WebSocket.prototype.CLOSED = states.CLOSED;
	Object.defineProperties(WebSocket.prototype, {
		CONNECTING: staticPropertyDescriptors,
		OPEN: staticPropertyDescriptors,
		CLOSING: staticPropertyDescriptors,
		CLOSED: staticPropertyDescriptors,
		url: kEnumerableProperty$1,
		readyState: kEnumerableProperty$1,
		bufferedAmount: kEnumerableProperty$1,
		onopen: kEnumerableProperty$1,
		onerror: kEnumerableProperty$1,
		onclose: kEnumerableProperty$1,
		close: kEnumerableProperty$1,
		onmessage: kEnumerableProperty$1,
		binaryType: kEnumerableProperty$1,
		send: kEnumerableProperty$1,
		extensions: kEnumerableProperty$1,
		protocol: kEnumerableProperty$1,
		[Symbol.toStringTag]: {
			value: "WebSocket",
			writable: false,
			enumerable: false,
			configurable: true
		}
	});
	Object.defineProperties(WebSocket, {
		CONNECTING: staticPropertyDescriptors,
		OPEN: staticPropertyDescriptors,
		CLOSING: staticPropertyDescriptors,
		CLOSED: staticPropertyDescriptors
	});
	webidl$1.converters["sequence<DOMString>"] = webidl$1.sequenceConverter(webidl$1.converters.DOMString);
	webidl$1.converters["DOMString or sequence<DOMString>"] = function(V, prefix, argument) {
		if (webidl$1.util.Type(V) === "Object" && Symbol.iterator in V) return webidl$1.converters["sequence<DOMString>"](V);
		return webidl$1.converters.DOMString(V, prefix, argument);
	};
	webidl$1.converters.WebSocketInit = webidl$1.dictionaryConverter([
		{
			key: "protocols",
			converter: webidl$1.converters["DOMString or sequence<DOMString>"],
			defaultValue: () => new Array(0)
		},
		{
			key: "dispatcher",
			converter: webidl$1.converters.any,
			defaultValue: () => getGlobalDispatcher$1()
		},
		{
			key: "headers",
			converter: webidl$1.nullableConverter(webidl$1.converters.HeadersInit)
		}
	]);
	webidl$1.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(V) {
		if (webidl$1.util.Type(V) === "Object" && !(Symbol.iterator in V)) return webidl$1.converters.WebSocketInit(V);
		return { protocols: webidl$1.converters["DOMString or sequence<DOMString>"](V) };
	};
	webidl$1.converters.WebSocketSendData = function(V) {
		if (webidl$1.util.Type(V) === "Object") {
			if (isBlobLike(V)) return webidl$1.converters.Blob(V, { strict: false });
			if (ArrayBuffer.isView(V) || types.isArrayBuffer(V)) return webidl$1.converters.BufferSource(V);
		}
		return webidl$1.converters.USVString(V);
	};
	function onParserDrain() {
		this.ws[kResponse].socket.resume();
	}
	function onParserError(err) {
		let message;
		let code;
		if (err instanceof CloseEvent$1) {
			message = err.reason;
			code = err.code;
		} else message = err.message;
		fireEvent("error", this, () => new ErrorEvent$1("error", {
			error: err,
			message
		}));
		closeWebSocketConnection(this, code);
	}
	module.exports = { WebSocket };
}));
var require_util = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function isValidLastEventId$1(value) {
		return value.indexOf("\0") === -1;
	}
	function isASCIINumber$1(value) {
		if (value.length === 0) return false;
		for (let i = 0; i < value.length; i++) if (value.charCodeAt(i) < 48 || value.charCodeAt(i) > 57) return false;
		return true;
	}
	function delay$1(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms).unref();
		});
	}
	module.exports = {
		isValidLastEventId: isValidLastEventId$1,
		isASCIINumber: isASCIINumber$1,
		delay: delay$1
	};
}));
var require_eventsource_stream = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { Transform } = __require("node:stream");
	var { isASCIINumber, isValidLastEventId } = require_util();
	var BOM = [
		239,
		187,
		191
	];
	var COLON = 58;
	var EventSourceStream$1 = class extends Transform {
		state = null;
		checkBOM = true;
		crlfCheck = false;
		eventEndCheck = false;
		buffer = null;
		pos = 0;
		event = {
			data: void 0,
			event: void 0,
			id: void 0,
			retry: void 0
		};
		constructor(options = {}) {
			options.readableObjectMode = true;
			super(options);
			this.state = options.eventSourceSettings || {};
			if (options.push) this.push = options.push;
		}
		_transform(chunk, _encoding, callback) {
			if (chunk.length === 0) {
				callback();
				return;
			}
			if (this.buffer) this.buffer = Buffer.concat([this.buffer, chunk]);
			else this.buffer = chunk;
			if (this.checkBOM) switch (this.buffer.length) {
				case 1:
					if (this.buffer[0] === BOM[0]) {
						callback();
						return;
					}
					this.checkBOM = false;
					callback();
					return;
				case 2:
					if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1]) {
						callback();
						return;
					}
					this.checkBOM = false;
					break;
				case 3:
					if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1] && this.buffer[2] === BOM[2]) {
						this.buffer = Buffer.alloc(0);
						this.checkBOM = false;
						callback();
						return;
					}
					this.checkBOM = false;
					break;
				default:
					if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1] && this.buffer[2] === BOM[2]) this.buffer = this.buffer.subarray(3);
					this.checkBOM = false;
					break;
			}
			while (this.pos < this.buffer.length) {
				if (this.eventEndCheck) {
					if (this.crlfCheck) {
						if (this.buffer[this.pos] === 10) {
							this.buffer = this.buffer.subarray(this.pos + 1);
							this.pos = 0;
							this.crlfCheck = false;
							continue;
						}
						this.crlfCheck = false;
					}
					if (this.buffer[this.pos] === 10 || this.buffer[this.pos] === 13) {
						if (this.buffer[this.pos] === 13) this.crlfCheck = true;
						this.buffer = this.buffer.subarray(this.pos + 1);
						this.pos = 0;
						if (this.event.data !== void 0 || this.event.event || this.event.id || this.event.retry) this.processEvent(this.event);
						this.clearEvent();
						continue;
					}
					this.eventEndCheck = false;
					continue;
				}
				if (this.buffer[this.pos] === 10 || this.buffer[this.pos] === 13) {
					if (this.buffer[this.pos] === 13) this.crlfCheck = true;
					this.parseLine(this.buffer.subarray(0, this.pos), this.event);
					this.buffer = this.buffer.subarray(this.pos + 1);
					this.pos = 0;
					this.eventEndCheck = true;
					continue;
				}
				this.pos++;
			}
			callback();
		}
		parseLine(line, event) {
			if (line.length === 0) return;
			const colonPosition = line.indexOf(COLON);
			if (colonPosition === 0) return;
			let field = "";
			let value = "";
			if (colonPosition !== -1) {
				field = line.subarray(0, colonPosition).toString("utf8");
				let valueStart = colonPosition + 1;
				if (line[valueStart] === 32) ++valueStart;
				value = line.subarray(valueStart).toString("utf8");
			} else {
				field = line.toString("utf8");
				value = "";
			}
			switch (field) {
				case "data":
					if (event[field] === void 0) event[field] = value;
					else event[field] += `\n${value}`;
					break;
				case "retry":
					if (isASCIINumber(value)) event[field] = value;
					break;
				case "id":
					if (isValidLastEventId(value)) event[field] = value;
					break;
				case "event":
					if (value.length > 0) event[field] = value;
					break;
			}
		}
		processEvent(event) {
			if (event.retry && isASCIINumber(event.retry)) this.state.reconnectionTime = parseInt(event.retry, 10);
			if (event.id && isValidLastEventId(event.id)) this.state.lastEventId = event.id;
			if (event.data !== void 0) this.push({
				type: event.event || "message",
				options: {
					data: event.data,
					lastEventId: this.state.lastEventId,
					origin: this.state.origin
				}
			});
		}
		clearEvent() {
			this.event = {
				data: void 0,
				event: void 0,
				id: void 0,
				retry: void 0
			};
		}
	};
	module.exports = { EventSourceStream: EventSourceStream$1 };
}));
var require_eventsource = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { pipeline } = __require("node:stream");
	var { fetching } = require_fetch();
	var { makeRequest: makeRequest$1 } = require_request();
	var { webidl } = require_webidl();
	var { EventSourceStream } = require_eventsource_stream();
	var { parseMIMEType: parseMIMEType$1 } = require_data_url();
	var { createFastMessageEvent } = require_events();
	var { isNetworkError } = require_response();
	var { delay } = require_util();
	var { kEnumerableProperty } = require_util$7();
	var { environmentSettingsObject } = require_util$6();
	var experimentalWarned = false;
	var defaultReconnectionTime = 3e3;
	var CONNECTING = 0;
	var OPEN = 1;
	var CLOSED = 2;
	var ANONYMOUS = "anonymous";
	var USE_CREDENTIALS = "use-credentials";
	var EventSource$1 = class EventSource$1 extends EventTarget {
		#events = {
			open: null,
			error: null,
			message: null
		};
		#url = null;
		#withCredentials = false;
		#readyState = CONNECTING;
		#request = null;
		#controller = null;
		#dispatcher;
		#state;
		constructor(url, eventSourceInitDict = {}) {
			super();
			webidl.util.markAsUncloneable(this);
			const prefix = "EventSource constructor";
			webidl.argumentLengthCheck(arguments, 1, prefix);
			if (!experimentalWarned) {
				experimentalWarned = true;
				process.emitWarning("EventSource is experimental, expect them to change at any time.", { code: "UNDICI-ES" });
			}
			url = webidl.converters.USVString(url, prefix, "url");
			eventSourceInitDict = webidl.converters.EventSourceInitDict(eventSourceInitDict, prefix, "eventSourceInitDict");
			this.#dispatcher = eventSourceInitDict.dispatcher;
			this.#state = {
				lastEventId: "",
				reconnectionTime: defaultReconnectionTime
			};
			const settings = environmentSettingsObject;
			let urlRecord;
			try {
				urlRecord = new URL(url, settings.settingsObject.baseUrl);
				this.#state.origin = urlRecord.origin;
			} catch (e) {
				throw new DOMException(e, "SyntaxError");
			}
			this.#url = urlRecord.href;
			let corsAttributeState = ANONYMOUS;
			if (eventSourceInitDict.withCredentials) {
				corsAttributeState = USE_CREDENTIALS;
				this.#withCredentials = true;
			}
			const initRequest = {
				redirect: "follow",
				keepalive: true,
				mode: "cors",
				credentials: corsAttributeState === "anonymous" ? "same-origin" : "omit",
				referrer: "no-referrer"
			};
			initRequest.client = environmentSettingsObject.settingsObject;
			initRequest.headersList = [["accept", {
				name: "accept",
				value: "text/event-stream"
			}]];
			initRequest.cache = "no-store";
			initRequest.initiator = "other";
			initRequest.urlList = [new URL(this.#url)];
			this.#request = makeRequest$1(initRequest);
			this.#connect();
		}
		get readyState() {
			return this.#readyState;
		}
		get url() {
			return this.#url;
		}
		get withCredentials() {
			return this.#withCredentials;
		}
		#connect() {
			if (this.#readyState === 2) return;
			this.#readyState = CONNECTING;
			const fetchParams = {
				request: this.#request,
				dispatcher: this.#dispatcher
			};
			const processEventSourceEndOfBody = (response) => {
				if (isNetworkError(response)) {
					this.dispatchEvent(new Event("error"));
					this.close();
				}
				this.#reconnect();
			};
			fetchParams.processResponseEndOfBody = processEventSourceEndOfBody;
			fetchParams.processResponse = (response) => {
				if (isNetworkError(response)) if (response.aborted) {
					this.close();
					this.dispatchEvent(new Event("error"));
					return;
				} else {
					this.#reconnect();
					return;
				}
				const contentType = response.headersList.get("content-type", true);
				const mimeType = contentType !== null ? parseMIMEType$1(contentType) : "failure";
				const contentTypeValid = mimeType !== "failure" && mimeType.essence === "text/event-stream";
				if (response.status !== 200 || contentTypeValid === false) {
					this.close();
					this.dispatchEvent(new Event("error"));
					return;
				}
				this.#readyState = OPEN;
				this.dispatchEvent(new Event("open"));
				this.#state.origin = response.urlList[response.urlList.length - 1].origin;
				const eventSourceStream = new EventSourceStream({
					eventSourceSettings: this.#state,
					push: (event) => {
						this.dispatchEvent(createFastMessageEvent(event.type, event.options));
					}
				});
				pipeline(response.body.stream, eventSourceStream, (error) => {
					if (error?.aborted === false) {
						this.close();
						this.dispatchEvent(new Event("error"));
					}
				});
			};
			this.#controller = fetching(fetchParams);
		}
		async #reconnect() {
			if (this.#readyState === 2) return;
			this.#readyState = CONNECTING;
			this.dispatchEvent(new Event("error"));
			await delay(this.#state.reconnectionTime);
			if (this.#readyState !== 0) return;
			if (this.#state.lastEventId.length) this.#request.headersList.set("last-event-id", this.#state.lastEventId, true);
			this.#connect();
		}
		close() {
			webidl.brandCheck(this, EventSource$1);
			if (this.#readyState === 2) return;
			this.#readyState = CLOSED;
			this.#controller.abort();
			this.#request = null;
		}
		get onopen() {
			return this.#events.open;
		}
		set onopen(fn) {
			if (this.#events.open) this.removeEventListener("open", this.#events.open);
			if (typeof fn === "function") {
				this.#events.open = fn;
				this.addEventListener("open", fn);
			} else this.#events.open = null;
		}
		get onmessage() {
			return this.#events.message;
		}
		set onmessage(fn) {
			if (this.#events.message) this.removeEventListener("message", this.#events.message);
			if (typeof fn === "function") {
				this.#events.message = fn;
				this.addEventListener("message", fn);
			} else this.#events.message = null;
		}
		get onerror() {
			return this.#events.error;
		}
		set onerror(fn) {
			if (this.#events.error) this.removeEventListener("error", this.#events.error);
			if (typeof fn === "function") {
				this.#events.error = fn;
				this.addEventListener("error", fn);
			} else this.#events.error = null;
		}
	};
	var constantsPropertyDescriptors = {
		CONNECTING: {
			__proto__: null,
			configurable: false,
			enumerable: true,
			value: CONNECTING,
			writable: false
		},
		OPEN: {
			__proto__: null,
			configurable: false,
			enumerable: true,
			value: OPEN,
			writable: false
		},
		CLOSED: {
			__proto__: null,
			configurable: false,
			enumerable: true,
			value: CLOSED,
			writable: false
		}
	};
	Object.defineProperties(EventSource$1, constantsPropertyDescriptors);
	Object.defineProperties(EventSource$1.prototype, constantsPropertyDescriptors);
	Object.defineProperties(EventSource$1.prototype, {
		close: kEnumerableProperty,
		onerror: kEnumerableProperty,
		onmessage: kEnumerableProperty,
		onopen: kEnumerableProperty,
		readyState: kEnumerableProperty,
		url: kEnumerableProperty,
		withCredentials: kEnumerableProperty
	});
	webidl.converters.EventSourceInitDict = webidl.dictionaryConverter([{
		key: "withCredentials",
		converter: webidl.converters.boolean,
		defaultValue: () => false
	}, {
		key: "dispatcher",
		converter: webidl.converters.any
	}]);
	module.exports = {
		EventSource: EventSource$1,
		defaultReconnectionTime
	};
}));
var require_undici = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Client$1 = require_client();
	var Dispatcher = require_dispatcher();
	var Pool = require_pool();
	var BalancedPool = require_balanced_pool();
	var Agent = require_agent();
	var ProxyAgent = require_proxy_agent();
	var EnvHttpProxyAgent = require_env_http_proxy_agent();
	var RetryAgent = require_retry_agent();
	var errors = require_errors();
	var util = require_util$7();
	var { InvalidArgumentError } = errors;
	var api = require_api();
	var buildConnector = require_connect();
	var MockClient = require_mock_client();
	var MockAgent = require_mock_agent();
	var MockPool = require_mock_pool();
	var mockErrors = require_mock_errors();
	var RetryHandler = require_retry_handler();
	var { getGlobalDispatcher, setGlobalDispatcher } = require_global();
	var DecoratorHandler = require_decorator_handler();
	var RedirectHandler = require_redirect_handler();
	var createRedirectInterceptor = require_redirect_interceptor();
	Object.assign(Dispatcher.prototype, api);
	module.exports.Dispatcher = Dispatcher;
	module.exports.Client = Client$1;
	module.exports.Pool = Pool;
	module.exports.BalancedPool = BalancedPool;
	module.exports.Agent = Agent;
	module.exports.ProxyAgent = ProxyAgent;
	module.exports.EnvHttpProxyAgent = EnvHttpProxyAgent;
	module.exports.RetryAgent = RetryAgent;
	module.exports.RetryHandler = RetryHandler;
	module.exports.DecoratorHandler = DecoratorHandler;
	module.exports.RedirectHandler = RedirectHandler;
	module.exports.createRedirectInterceptor = createRedirectInterceptor;
	module.exports.interceptors = {
		redirect: require_redirect(),
		retry: require_retry(),
		dump: require_dump(),
		dns: require_dns()
	};
	module.exports.buildConnector = buildConnector;
	module.exports.errors = errors;
	module.exports.util = {
		parseHeaders: util.parseHeaders,
		headerNameToString: util.headerNameToString
	};
	function makeDispatcher(fn) {
		return (url, opts, handler) => {
			if (typeof opts === "function") {
				handler = opts;
				opts = null;
			}
			if (!url || typeof url !== "string" && typeof url !== "object" && !(url instanceof URL)) throw new InvalidArgumentError("invalid url");
			if (opts != null && typeof opts !== "object") throw new InvalidArgumentError("invalid opts");
			if (opts && opts.path != null) {
				if (typeof opts.path !== "string") throw new InvalidArgumentError("invalid opts.path");
				let path = opts.path;
				if (!opts.path.startsWith("/")) path = `/${path}`;
				url = new URL(util.parseOrigin(url).origin + path);
			} else {
				if (!opts) opts = typeof url === "object" ? url : {};
				url = util.parseURL(url);
			}
			const { agent, dispatcher = getGlobalDispatcher() } = opts;
			if (agent) throw new InvalidArgumentError("unsupported opts.agent. Did you mean opts.client?");
			return fn.call(dispatcher, {
				...opts,
				origin: url.origin,
				path: url.search ? `${url.pathname}${url.search}` : url.pathname,
				method: opts.method || (opts.body ? "PUT" : "GET")
			}, handler);
		};
	}
	module.exports.setGlobalDispatcher = setGlobalDispatcher;
	module.exports.getGlobalDispatcher = getGlobalDispatcher;
	var fetchImpl = require_fetch().fetch;
	module.exports.fetch = async function fetch$2(init, options = void 0) {
		try {
			return await fetchImpl(init, options);
		} catch (err) {
			if (err && typeof err === "object") Error.captureStackTrace(err);
			throw err;
		}
	};
	module.exports.Headers = require_headers().Headers;
	module.exports.Response = require_response().Response;
	module.exports.Request = require_request().Request;
	module.exports.FormData = require_formdata().FormData;
	module.exports.File = globalThis.File ?? __require("node:buffer").File;
	module.exports.FileReader = require_filereader().FileReader;
	var { setGlobalOrigin, getGlobalOrigin } = require_global$1();
	module.exports.setGlobalOrigin = setGlobalOrigin;
	module.exports.getGlobalOrigin = getGlobalOrigin;
	var { CacheStorage } = require_cachestorage();
	var { kConstruct } = require_symbols$1();
	module.exports.caches = new CacheStorage(kConstruct);
	var { deleteCookie, getCookies, getSetCookies, setCookie } = require_cookies();
	module.exports.deleteCookie = deleteCookie;
	module.exports.getCookies = getCookies;
	module.exports.getSetCookies = getSetCookies;
	module.exports.setCookie = setCookie;
	var { parseMIMEType, serializeAMimeType } = require_data_url();
	module.exports.parseMIMEType = parseMIMEType;
	module.exports.serializeAMimeType = serializeAMimeType;
	var { CloseEvent, ErrorEvent, MessageEvent } = require_events();
	module.exports.WebSocket = require_websocket().WebSocket;
	module.exports.CloseEvent = CloseEvent;
	module.exports.ErrorEvent = ErrorEvent;
	module.exports.MessageEvent = MessageEvent;
	module.exports.request = makeDispatcher(api.request);
	module.exports.stream = makeDispatcher(api.stream);
	module.exports.pipeline = makeDispatcher(api.pipeline);
	module.exports.connect = makeDispatcher(api.connect);
	module.exports.upgrade = makeDispatcher(api.upgrade);
	module.exports.MockClient = MockClient;
	module.exports.MockPool = MockPool;
	module.exports.MockAgent = MockAgent;
	module.exports.mockErrors = mockErrors;
	var { EventSource } = require_eventsource();
	module.exports.EventSource = EventSource;
}));
var require_dist$3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp$3 = Object.defineProperty;
	var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$1 = Object.getOwnPropertyNames;
	var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
	var __name$3 = (target, value) => __defProp$3(target, "name", {
		value,
		configurable: true
	});
	var __export$1 = (target, all) => {
		for (var name in all) __defProp$3(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps$1 = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$3(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS$1 = (mod$7) => __copyProps$1(__defProp$3({}, "__esModule", { value: true }), mod$7);
	var src_exports$1 = {};
	__export$1(src_exports$1, {
		Collection: () => Collection,
		version: () => version$1
	});
	module.exports = __toCommonJS$1(src_exports$1);
	var Collection = class _Collection extends Map {
		static {
			__name$3(this, "Collection");
		}
		ensure(key, defaultValueGenerator) {
			if (this.has(key)) return this.get(key);
			if (typeof defaultValueGenerator !== "function") throw new TypeError(`${defaultValueGenerator} is not a function`);
			const defaultValue = defaultValueGenerator(key, this);
			this.set(key, defaultValue);
			return defaultValue;
		}
		hasAll(...keys) {
			return keys.every((key) => super.has(key));
		}
		hasAny(...keys) {
			return keys.some((key) => super.has(key));
		}
		first(amount) {
			if (amount === void 0) return this.values().next().value;
			if (amount < 0) return this.last(amount * -1);
			amount = Math.min(this.size, amount);
			const iter = this.values();
			return Array.from({ length: amount }, () => iter.next().value);
		}
		firstKey(amount) {
			if (amount === void 0) return this.keys().next().value;
			if (amount < 0) return this.lastKey(amount * -1);
			amount = Math.min(this.size, amount);
			const iter = this.keys();
			return Array.from({ length: amount }, () => iter.next().value);
		}
		last(amount) {
			const arr = [...this.values()];
			if (amount === void 0) return arr[arr.length - 1];
			if (amount < 0) return this.first(amount * -1);
			if (!amount) return [];
			return arr.slice(-amount);
		}
		lastKey(amount) {
			const arr = [...this.keys()];
			if (amount === void 0) return arr[arr.length - 1];
			if (amount < 0) return this.firstKey(amount * -1);
			if (!amount) return [];
			return arr.slice(-amount);
		}
		at(index) {
			index = Math.floor(index);
			return [...this.values()].at(index);
		}
		keyAt(index) {
			index = Math.floor(index);
			return [...this.keys()].at(index);
		}
		random(amount) {
			const arr = [...this.values()];
			if (amount === void 0) return arr[Math.floor(Math.random() * arr.length)];
			if (!arr.length || !amount) return [];
			return Array.from({ length: Math.min(amount, arr.length) }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
		}
		randomKey(amount) {
			const arr = [...this.keys()];
			if (amount === void 0) return arr[Math.floor(Math.random() * arr.length)];
			if (!arr.length || !amount) return [];
			return Array.from({ length: Math.min(amount, arr.length) }, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
		}
		reverse() {
			const entries = [...this.entries()].reverse();
			this.clear();
			for (const [key, value] of entries) this.set(key, value);
			return this;
		}
		find(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			for (const [key, val] of this) if (fn(val, key, this)) return val;
		}
		findKey(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			for (const [key, val] of this) if (fn(val, key, this)) return key;
		}
		findLast(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			const entries = [...this.entries()];
			for (let index = entries.length - 1; index >= 0; index--) {
				const val = entries[index][1];
				const key = entries[index][0];
				if (fn(val, key, this)) return val;
			}
		}
		findLastKey(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			const entries = [...this.entries()];
			for (let index = entries.length - 1; index >= 0; index--) {
				const key = entries[index][0];
				const val = entries[index][1];
				if (fn(val, key, this)) return key;
			}
		}
		sweep(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			const previousSize = this.size;
			for (const [key, val] of this) if (fn(val, key, this)) this.delete(key);
			return previousSize - this.size;
		}
		filter(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			const results = new this.constructor[Symbol.species]();
			for (const [key, val] of this) if (fn(val, key, this)) results.set(key, val);
			return results;
		}
		partition(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			const results = [new this.constructor[Symbol.species](), new this.constructor[Symbol.species]()];
			for (const [key, val] of this) if (fn(val, key, this)) results[0].set(key, val);
			else results[1].set(key, val);
			return results;
		}
		flatMap(fn, thisArg) {
			const collections = this.map(fn, thisArg);
			return new this.constructor[Symbol.species]().concat(...collections);
		}
		map(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			const iter = this.entries();
			return Array.from({ length: this.size }, () => {
				const [key, value] = iter.next().value;
				return fn(value, key, this);
			});
		}
		mapValues(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			const coll = new this.constructor[Symbol.species]();
			for (const [key, val] of this) coll.set(key, fn(val, key, this));
			return coll;
		}
		some(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			for (const [key, val] of this) if (fn(val, key, this)) return true;
			return false;
		}
		every(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			for (const [key, val] of this) if (!fn(val, key, this)) return false;
			return true;
		}
		reduce(fn, initialValue) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			let accumulator;
			const iterator = this.entries();
			if (initialValue === void 0) {
				if (this.size === 0) throw new TypeError("Reduce of empty collection with no initial value");
				accumulator = iterator.next().value[1];
			} else accumulator = initialValue;
			for (const [key, value] of iterator) accumulator = fn(accumulator, value, key, this);
			return accumulator;
		}
		reduceRight(fn, initialValue) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			const entries = [...this.entries()];
			let accumulator;
			let index;
			if (initialValue === void 0) {
				if (entries.length === 0) throw new TypeError("Reduce of empty collection with no initial value");
				accumulator = entries[entries.length - 1][1];
				index = entries.length - 1;
			} else {
				accumulator = initialValue;
				index = entries.length;
			}
			while (--index >= 0) {
				const key = entries[index][0];
				const val = entries[index][1];
				accumulator = fn(accumulator, val, key, this);
			}
			return accumulator;
		}
		each(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			for (const [key, value] of this) fn(value, key, this);
			return this;
		}
		tap(fn, thisArg) {
			if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
			if (thisArg !== void 0) fn = fn.bind(thisArg);
			fn(this);
			return this;
		}
		clone() {
			return new this.constructor[Symbol.species](this);
		}
		concat(...collections) {
			const newColl = this.clone();
			for (const coll of collections) for (const [key, val] of coll) newColl.set(key, val);
			return newColl;
		}
		equals(collection) {
			if (!collection) return false;
			if (this === collection) return true;
			if (this.size !== collection.size) return false;
			for (const [key, value] of this) if (!collection.has(key) || value !== collection.get(key)) return false;
			return true;
		}
		sort(compareFunction = _Collection.defaultSort) {
			const entries = [...this.entries()];
			entries.sort((a, b) => compareFunction(a[1], b[1], a[0], b[0]));
			super.clear();
			for (const [key, value] of entries) super.set(key, value);
			return this;
		}
		intersection(other) {
			const coll = new this.constructor[Symbol.species]();
			for (const [key, value] of this) if (other.has(key)) coll.set(key, value);
			return coll;
		}
		union(other) {
			const coll = new this.constructor[Symbol.species](this);
			for (const [key, value] of other) if (!coll.has(key)) coll.set(key, value);
			return coll;
		}
		difference(other) {
			const coll = new this.constructor[Symbol.species]();
			for (const [key, value] of this) if (!other.has(key)) coll.set(key, value);
			return coll;
		}
		symmetricDifference(other) {
			const coll = new this.constructor[Symbol.species]();
			for (const [key, value] of this) if (!other.has(key)) coll.set(key, value);
			for (const [key, value] of other) if (!this.has(key)) coll.set(key, value);
			return coll;
		}
		merge(other, whenInSelf, whenInOther, whenInBoth) {
			const coll = new this.constructor[Symbol.species]();
			const keys = /* @__PURE__ */ new Set([...this.keys(), ...other.keys()]);
			for (const key of keys) {
				const hasInSelf = this.has(key);
				const hasInOther = other.has(key);
				if (hasInSelf && hasInOther) {
					const result = whenInBoth(this.get(key), other.get(key), key);
					if (result.keep) coll.set(key, result.value);
				} else if (hasInSelf) {
					const result = whenInSelf(this.get(key), key);
					if (result.keep) coll.set(key, result.value);
				} else if (hasInOther) {
					const result = whenInOther(other.get(key), key);
					if (result.keep) coll.set(key, result.value);
				}
			}
			return coll;
		}
		toReversed() {
			return new this.constructor[Symbol.species](this).reverse();
		}
		toSorted(compareFunction = _Collection.defaultSort) {
			return new this.constructor[Symbol.species](this).sort((av, bv, ak, bk) => compareFunction(av, bv, ak, bk));
		}
		toJSON() {
			return [...this.entries()];
		}
		static defaultSort(firstValue, secondValue) {
			return Number(firstValue > secondValue) || Number(firstValue === secondValue) - 1;
		}
		static combineEntries(entries, combine) {
			const coll = new _Collection();
			for (const [key, value] of entries) if (coll.has(key)) coll.set(key, combine(coll.get(key), value, key));
			else coll.set(key, value);
			return coll;
		}
	};
	var version$1 = "2.1.1";
}));
var require_cjs$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __defProp$2 = Object.defineProperty;
	var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {
		enumerable: true,
		configurable: true,
		writable: true,
		value
	}) : obj[key] = value;
	var __name$2 = (target, value) => __defProp$2(target, "name", {
		value,
		configurable: true
	});
	var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
	var IncrementSymbol = Symbol("@sapphire/snowflake.increment");
	var EpochSymbol = Symbol("@sapphire/snowflake.epoch");
	var EpochNumberSymbol = Symbol("@sapphire/snowflake.epoch.number");
	var ProcessIdSymbol = Symbol("@sapphire/snowflake.processId");
	var WorkerIdSymbol = Symbol("@sapphire/snowflake.workerId");
	var MaximumWorkerId = 31n;
	var MaximumProcessId = 31n;
	var MaximumIncrement = 4095n;
	var TimestampFieldDivisor = 2 ** 22;
	var _a, _b, _c, _d, _e = EpochSymbol;
	_d = EpochNumberSymbol, _c = IncrementSymbol, _b = ProcessIdSymbol, _a = WorkerIdSymbol;
	var _Snowflake = class _Snowflake$1 {
		constructor(epoch) {
			__publicField$1(this, "decode", this.deconstruct);
			__publicField$1(this, _e);
			__publicField$1(this, _d);
			__publicField$1(this, _c, 0n);
			__publicField$1(this, _b, 1n);
			__publicField$1(this, _a, 0n);
			this[EpochSymbol] = BigInt(epoch instanceof Date ? epoch.getTime() : epoch);
			this[EpochNumberSymbol] = Number(this[EpochSymbol]);
		}
		get epoch() {
			return this[EpochSymbol];
		}
		get epochNumber() {
			return this[EpochNumberSymbol];
		}
		get processId() {
			return this[ProcessIdSymbol];
		}
		set processId(value) {
			this[ProcessIdSymbol] = BigInt(value) & MaximumProcessId;
		}
		get workerId() {
			return this[WorkerIdSymbol];
		}
		set workerId(value) {
			this[WorkerIdSymbol] = BigInt(value) & MaximumWorkerId;
		}
		generate({ increment, timestamp = Date.now(), workerId = this[WorkerIdSymbol], processId = this[ProcessIdSymbol] } = {}) {
			if (timestamp instanceof Date) timestamp = BigInt(timestamp.getTime());
			else if (typeof timestamp === "number") timestamp = BigInt(timestamp);
			else if (typeof timestamp !== "bigint") throw new TypeError(`"timestamp" argument must be a number, bigint, or Date (received ${typeof timestamp})`);
			if (typeof increment !== "bigint") {
				increment = this[IncrementSymbol];
				this[IncrementSymbol] = increment + 1n & MaximumIncrement;
			}
			return timestamp - this[EpochSymbol] << 22n | (workerId & MaximumWorkerId) << 17n | (processId & MaximumProcessId) << 12n | increment & MaximumIncrement;
		}
		deconstruct(id) {
			const bigIntId = BigInt(id);
			const epoch = this[EpochSymbol];
			return {
				id: bigIntId,
				timestamp: (bigIntId >> 22n) + epoch,
				workerId: bigIntId >> 17n & MaximumWorkerId,
				processId: bigIntId >> 12n & MaximumProcessId,
				increment: bigIntId & MaximumIncrement,
				epoch
			};
		}
		timestampFrom(id) {
			return Math.floor(Number(id) / TimestampFieldDivisor) + this[EpochNumberSymbol];
		}
		static compare(a, b) {
			const typeA = typeof a;
			return typeA === typeof b ? typeA === "string" ? cmpString(a, b) : cmpBigInt(a, b) : cmpBigInt(BigInt(a), BigInt(b));
		}
	};
	__name$2(_Snowflake, "Snowflake");
	var Snowflake = _Snowflake;
	function cmpBigInt(a, b) {
		return a === b ? 0 : a < b ? -1 : 1;
	}
	__name$2(cmpBigInt, "cmpBigInt");
	function cmpString(a, b) {
		return a === b ? 0 : a.length < b.length ? -1 : a.length > b.length ? 1 : a < b ? -1 : 1;
	}
	__name$2(cmpString, "cmpString");
	var DiscordSnowflake = new Snowflake(1420070400000n);
	var TwitterSnowflake = new Snowflake(1288834974657n);
	exports.DiscordSnowflake = DiscordSnowflake;
	exports.MaximumIncrement = MaximumIncrement;
	exports.MaximumProcessId = MaximumProcessId;
	exports.MaximumWorkerId = MaximumWorkerId;
	exports.Snowflake = Snowflake;
	exports.TwitterSnowflake = TwitterSnowflake;
}));
var require_toHex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var hex = (num) => new Number(num).toString(16).toLowerCase();
	var toHex = (num) => `0x${hex(num).length === 1 ? "0" + hex(num) : hex(num)}`;
	exports.toHex = toHex;
	var fromHex = (hex$1) => new Number(hex$1);
	exports.fromHex = fromHex;
}));
var require_tree = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var createMatch = (leaf) => ({
		typename: leaf.typename,
		mime: leaf.info.mime,
		extension: leaf.info.extension
	});
	var isLeafNode = (tree$3, path) => tree$3 && path.length === 0;
	var merge = (node, tree$3) => {
		if (node.bytes.length === 0) return tree$3;
		const [currentByte, ...path] = node.bytes;
		const currentTree = tree$3.bytes[currentByte];
		if (isLeafNode(currentTree, path)) {
			const matchingNode = tree$3.bytes[currentByte];
			tree$3.bytes[currentByte] = {
				...matchingNode,
				matches: [...matchingNode.matches ?? [], createMatch(node)]
			};
			return tree$3;
		}
		if (tree$3.bytes[currentByte]) tree$3.bytes[currentByte] = exports.merge(exports.createNode(node.typename, path, node.info), tree$3.bytes[currentByte]);
		else tree$3.bytes[currentByte] = exports.createComplexNode(node.typename, path, node.info);
		return tree$3;
	};
	exports.merge = merge;
	var createNode = (typename, bytes, info) => {
		return {
			typename,
			bytes,
			info: info ? info : {}
		};
	};
	exports.createNode = createNode;
	var createComplexNode = (typename, bytes, info) => {
		let obj = {
			bytes: {},
			matches: void 0
		};
		const [currentKey, ...path] = bytes;
		if (bytes.length === 0) return {
			matches: [createMatch({
				typename,
				info: info ? {
					extension: info.extension,
					mime: info.mime
				} : {}
			})],
			bytes: {}
		};
		obj.bytes[currentKey] = exports.createComplexNode(typename, path, info);
		return obj;
	};
	exports.createComplexNode = createComplexNode;
}));
var require_pattern_tree = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var toHex_1$1 = require_toHex();
	var tree_1 = require_tree();
	var tree = {
		noOffset: null,
		offset: {}
	};
	var add = (typename, signature, additionalInfo, offset) => {
		if (offset) {
			const existing = tree.offset[toHex_1$1.toHex(offset)];
			if (!existing) tree.offset[toHex_1$1.toHex(offset)] = tree_1.createComplexNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo);
			else {
				const merged = tree_1.merge(tree_1.createNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo), { ...existing });
				tree.offset[toHex_1$1.toHex(offset)] = merged;
			}
		} else if (tree.noOffset === null) tree.noOffset = tree_1.createComplexNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo);
		else tree.noOffset = tree_1.merge(tree_1.createNode(typename, signature.map((e) => e.toLowerCase()), additionalInfo), tree.noOffset);
	};
	exports.add = add;
	exports.add("gif", [
		"0x47",
		"0x49",
		"0x46",
		"0x38",
		"0x37",
		"0x61"
	], {
		mime: "image/gif",
		extension: "gif"
	});
	exports.add("gif", [
		"0x47",
		"0x49",
		"0x46",
		"0x38",
		"0x39",
		"0x61"
	], {
		mime: "image/gif",
		extension: "gif"
	});
	exports.add("jpg", [
		"0xFF",
		"0xD8",
		"0xFF"
	], {
		mime: "image/jpeg",
		extension: "jpeg"
	});
	exports.add("webp", [
		"0x52",
		"0x49",
		"0x46",
		"0x46",
		"?",
		"?",
		"?",
		"?",
		"0x57",
		"0x45",
		"0x42",
		"0x50"
	], {
		mime: "image/webp",
		extension: "webp"
	});
	exports.add("heif", [
		"0x66",
		"0x74",
		"0x79",
		"0x70",
		"0x6D",
		"0x69",
		"0x66",
		"0x31"
	], {
		mime: "image/heif",
		extension: "heif"
	}, 4);
	exports.add("heif", [
		"0x66",
		"0x74",
		"0x79",
		"0x70",
		"0x68",
		"0x65",
		"0x69",
		"0x63"
	], {
		mime: "image/heif",
		extension: "heic"
	}, 4);
	exports.add("rpm", [
		"0xed",
		"0xab",
		"0xee",
		"0xdb"
	]);
	exports.add("bin", [
		"0x53",
		"0x50",
		"0x30",
		"0x31"
	], {
		mime: "application/octet-stream",
		extension: "bin"
	});
	exports.add("pic", ["0x00"]);
	exports.add("pif", ["0x00"]);
	exports.add("sea", ["0x00"]);
	exports.add("ytr", ["0x00"]);
	exports.add("mp4", [
		"0x66",
		"0x74",
		"0x79",
		"0x70"
	], {
		mime: "video/mp4",
		extension: "mp4"
	}, 4);
	exports.add("ttf", [
		"0x00",
		"0x01",
		"0x00",
		"0x00",
		"0x00"
	], {
		mime: "font/ttf",
		extension: "ttf"
	});
	exports.add("otf", [
		"0x4F",
		"0x54",
		"0x54",
		"0x4F"
	], {
		mime: "font/otf",
		extension: "otf"
	});
	exports.add("eot", ["0x50", "0x4C"], {
		mime: "application/vnd.ms-fontobject",
		extension: "eot"
	});
	exports.add("woff", [
		"0x77",
		"0x4F",
		"0x46",
		"0x46"
	], {
		mime: "font/woff",
		extension: "woff"
	});
	exports.add("woff2", [
		"0x77",
		"0x4F",
		"0x46",
		"0x32"
	], {
		mime: "font/woff2",
		extension: "woff2"
	});
	exports.add("pdb", [
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00"
	]);
	exports.add("dba", [
		"0xBE",
		"0xBA",
		"0xFE",
		"0xCA"
	]);
	exports.add("dba2", [
		"0x00",
		"0x01",
		"0x42",
		"0x44"
	]);
	exports.add("tda", [
		"0x00",
		"0x01",
		"0x44",
		"0x54"
	]);
	exports.add("tda2", [
		"0x00",
		"0x01",
		"0x00",
		"0x00"
	]);
	exports.add("ico", [
		"0x00",
		"0x00",
		"0x01",
		"0x00"
	], {
		mime: "image/x-icon",
		extension: "ico"
	});
	exports.add("3gp", [
		"0x66",
		"0x74",
		"0x79",
		"0x70",
		"0x33",
		"0x67"
	]);
	exports.add("z", ["0x1F", "0x9D"]);
	exports.add("tar.z", ["0x1F", "0xA0"]);
	exports.add("bac", [
		"0x42",
		"0x41",
		"0x43",
		"0x4B",
		"0x4D",
		"0x49",
		"0x4B",
		"0x45",
		"0x44",
		"0x49",
		"0x53",
		"0x4B"
	]);
	exports.add("bz2", [
		"0x42",
		"0x5A",
		"0x68"
	], {
		mime: "application/x-bzip2",
		extension: "bz2"
	});
	exports.add("tif", [
		"0x49",
		"0x49",
		"0x2A",
		"0x00"
	], {
		mime: "image/tiff",
		extension: "tif"
	});
	exports.add("tiff", [
		"0x4D",
		"0x4D",
		"0x00",
		"0x2A"
	], {
		mime: "image/tiff",
		extension: "tiff"
	});
	exports.add("cr2", [
		"0x49",
		"0x49",
		"0x2A",
		"0x00",
		"0x10",
		"0x00",
		"0x00",
		"0x00",
		"0x43",
		"0x52"
	]);
	exports.add("cin", [
		"0x80",
		"0x2A",
		"0x5F",
		"0xD7"
	]);
	exports.add("cin1", [
		"0x52",
		"0x4E",
		"0x43",
		"0x01"
	]);
	exports.add("cin2", [
		"0x52",
		"0x4E",
		"0x43",
		"0x02"
	]);
	exports.add("dpx", [
		"0x53",
		"0x44",
		"0x50",
		"0x58"
	]);
	exports.add("dpx2", [
		"0x58",
		"0x50",
		"0x44",
		"0x53"
	]);
	exports.add("exr", [
		"0x76",
		"0x2F",
		"0x31",
		"0x01"
	]);
	exports.add("bpg", [
		"0x42",
		"0x50",
		"0x47",
		"0xFB"
	]);
	exports.add("ilbm", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x49",
		"0x4C",
		"0x42",
		"0x4D"
	]);
	exports.add("8svx", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x38",
		"0x53",
		"0x56",
		"0x58"
	]);
	exports.add("acbm", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x41",
		"0x43",
		"0x42",
		"0x4D"
	]);
	exports.add("anbm", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x41",
		"0x4E",
		"0x42",
		"0x4D"
	]);
	exports.add("anim", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x41",
		"0x4E",
		"0x49",
		"0x4D"
	]);
	exports.add("faxx", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x46",
		"0x41",
		"0x58",
		"0x58"
	]);
	exports.add("ftxt", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x46",
		"0x54",
		"0x58",
		"0x54"
	]);
	exports.add("smus", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x53",
		"0x4D",
		"0x55",
		"0x53"
	]);
	exports.add("cmus", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x43",
		"0x4D",
		"0x55",
		"0x53"
	]);
	exports.add("yuvn", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x59",
		"0x55",
		"0x56",
		"0x4E"
	]);
	exports.add("iff", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x46",
		"0x41",
		"0x4E",
		"0x54"
	]);
	exports.add("aiff", [
		"0x46",
		"0x4F",
		"0x52",
		"0x4D",
		"?",
		"?",
		"?",
		"?",
		"0x41",
		"0x49",
		"0x46",
		"0x46"
	], {
		mime: "audio/x-aiff",
		extension: "aiff"
	});
	exports.add("idx", [
		"0x49",
		"0x4E",
		"0x44",
		"0x58"
	]);
	exports.add("lz", [
		"0x4C",
		"0x5A",
		"0x49",
		"0x50"
	]);
	exports.add("exe", ["0x4D", "0x5A"]);
	exports.add("zip", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/zip",
		extension: "zip"
	});
	exports.add("zip", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/zip",
		extension: "zip"
	});
	exports.add("zip", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/zip",
		extension: "zip"
	});
	exports.add("jar", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/java-archive",
		extension: "jar"
	});
	exports.add("jar", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/java-archive",
		extension: "jar"
	});
	exports.add("jar", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/java-archive",
		extension: "jar"
	});
	exports.add("odt", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.oasis.opendocument.text",
		extension: "odt"
	});
	exports.add("odt", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.oasis.opendocument.text",
		extension: "odt"
	});
	exports.add("odt", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.oasis.opendocument.text",
		extension: "odt"
	});
	exports.add("ods", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.oasis.opendocument.spreadsheet",
		extension: "ods"
	});
	exports.add("ods", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.oasis.opendocument.spreadsheet",
		extension: "ods"
	});
	exports.add("ods", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.oasis.opendocument.spreadsheet",
		extension: "ods"
	});
	exports.add("odp", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.oasis.opendocument.presentation",
		extension: "odp"
	});
	exports.add("odp", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.oasis.opendocument.presentation",
		extension: "odp"
	});
	exports.add("odp", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.oasis.opendocument.presentation",
		extension: "odp"
	});
	exports.add("docx", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		extension: "docx"
	});
	exports.add("docx", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		extension: "docx"
	});
	exports.add("docx", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		extension: "docx"
	});
	exports.add("xlsx", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		extension: "xlsx"
	});
	exports.add("xlsx", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		extension: "xlsx"
	});
	exports.add("xlsx", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		extension: "xlsx"
	});
	exports.add("pptx", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		extension: "pptx"
	});
	exports.add("pptx", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		extension: "pptx"
	});
	exports.add("pptx", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		extension: "pptx"
	});
	exports.add("vsdx", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.ms-visio.drawing",
		extension: "vsdx"
	});
	exports.add("vsdx", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.ms-visio.drawing",
		extension: "vsdx"
	});
	exports.add("vsdx", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.ms-visio.drawing",
		extension: "vsdx"
	});
	exports.add("apk", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.android.package-archive",
		extension: "apk"
	});
	exports.add("apk", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.android.package-archive",
		extension: "apk"
	});
	exports.add("apk", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.android.package-archive",
		extension: "apk"
	});
	exports.add("aar", [
		"0x50",
		"0x4B",
		"0x03",
		"0x04"
	], {
		mime: "application/vnd.android.package-archive",
		extension: "aar"
	});
	exports.add("aar", [
		"0x50",
		"0x4B",
		"0x05",
		"0x06"
	], {
		mime: "application/vnd.android.package-archive",
		extension: "aar"
	});
	exports.add("aar", [
		"0x50",
		"0x4B",
		"0x07",
		"0x08"
	], {
		mime: "application/vnd.android.package-archive",
		extension: "aar"
	});
	exports.add("rar", [
		"0x52",
		"0x61",
		"0x72",
		"0x21",
		"0x1A",
		"0x07",
		"0x00"
	], {
		mime: "application/vnd.rar",
		extension: "rar"
	});
	exports.add("rar", [
		"0x52",
		"0x61",
		"0x72",
		"0x21",
		"0x1A",
		"0x07",
		"0x01",
		"0x00"
	], {
		mime: "application/vnd.rar",
		extension: "rar"
	});
	exports.add("rar", [
		"0x7F",
		"0x45",
		"0x4C",
		"0x46"
	], {
		mime: "application/vnd.rar",
		extension: "rar"
	});
	exports.add("png", [
		"0x89",
		"0x50",
		"0x4E",
		"0x47",
		"0x0D",
		"0x0A",
		"0x1A",
		"0x0A"
	], {
		mime: "image/png",
		extension: "png"
	});
	exports.add("apng", [
		"0x89",
		"0x50",
		"0x4E",
		"0x47",
		"0x0D",
		"0x0A",
		"0x1A",
		"0x0A"
	], {
		mime: "image/apng",
		extension: "apng"
	});
	exports.add("class", [
		"0xCA",
		"0xFE",
		"0xBA",
		"0xBE"
	]);
	exports.add("class", [
		"0xEF",
		"0xBB",
		"0xBF"
	]);
	exports.add("class", [
		"0xFE",
		"0xed",
		"0xFA",
		"0xCE"
	], void 0, 4096);
	exports.add("class", [
		"0xFE",
		"0xed",
		"0xFA",
		"0xCF"
	], void 0, 4096);
	exports.add("class", [
		"0xCE",
		"0xFA",
		"0xed",
		"0xFE"
	]);
	exports.add("class", [
		"0xCF",
		"0xFA",
		"0xed",
		"0xFE"
	]);
	exports.add("class", ["0xFF", "0xFE"]);
	exports.add("class", ["0xFF", "0xFE"]);
	exports.add("class", [
		"0xFF",
		"0xFE",
		"0x00",
		"0x00"
	]);
	exports.add("ps", [
		"0x25",
		"0x21",
		"0x50",
		"0x53"
	], {
		mime: "application/postscript",
		extension: ".ps"
	});
	exports.add("pdf", [
		"0x25",
		"0x50",
		"0x44",
		"0x46"
	], {
		mime: "application/pdf",
		extension: "pdf"
	});
	exports.add("asf", [
		"0x30",
		"0x26",
		"0xB2",
		"0x75",
		"0x8E",
		"0x66",
		"0xCF",
		"0x11",
		"0xA6",
		"0xD9",
		"0x00",
		"0xAA",
		"0x00",
		"0x62",
		"0xCE",
		"0x6C"
	]);
	exports.add("wma", [
		"0x30",
		"0x26",
		"0xB2",
		"0x75",
		"0x8E",
		"0x66",
		"0xCF",
		"0x11",
		"0xA6",
		"0xD9",
		"0x00",
		"0xAA",
		"0x00",
		"0x62",
		"0xCE",
		"0x6C"
	]);
	exports.add("wmv", [
		"0x30",
		"0x26",
		"0xB2",
		"0x75",
		"0x8E",
		"0x66",
		"0xCF",
		"0x11",
		"0xA6",
		"0xD9",
		"0x00",
		"0xAA",
		"0x00",
		"0x62",
		"0xCE",
		"0x6C"
	]);
	exports.add("deploymentimage", [
		"0x24",
		"0x53",
		"0x44",
		"0x49",
		"0x30",
		"0x30",
		"0x30",
		"0x31"
	]);
	exports.add("ogv", [
		"0x4F",
		"0x67",
		"0x67",
		"0x53",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"0x80",
		"0x74",
		"0x68",
		"0x65",
		"0x6F",
		"0x72",
		"0x61"
	], {
		mime: "video/ogg",
		extension: "ogv"
	});
	exports.add("ogm", [
		"0x4F",
		"0x67",
		"0x67",
		"0x53",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"0x01",
		"0x76",
		"0x69",
		"0x64",
		"0x65",
		"0x6F",
		"0x00"
	], {
		mime: "video/ogg",
		extension: "ogm"
	});
	exports.add("oga", [
		"0x4F",
		"0x67",
		"0x67",
		"0x53",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"0x7F",
		"0x46",
		"0x4C",
		"0x41",
		"0x43"
	], {
		mime: "audio/ogg",
		extension: "oga"
	});
	exports.add("spx", [
		"0x4F",
		"0x67",
		"0x67",
		"0x53",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"0x53",
		"0x70",
		"0x65",
		"0x65",
		"0x78",
		"0x20",
		"0x20"
	], {
		mime: "audio/ogg",
		extension: "spx"
	});
	exports.add("ogg", [
		"0x4F",
		"0x67",
		"0x67",
		"0x53",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"?",
		"0x01",
		"0x76",
		"0x6F",
		"0x72",
		"0x62",
		"0x69",
		"0x73"
	], {
		mime: "audio/ogg",
		extension: "ogg"
	});
	exports.add("ogx", [
		"0x4F",
		"0x67",
		"0x67",
		"0x53"
	], {
		mime: "application/ogg",
		extension: "ogx"
	});
	exports.add("psd", [
		"0x38",
		"0x42",
		"0x50",
		"0x53"
	], {
		mime: "application/x-photoshop",
		extension: "psd"
	});
	exports.add("clip", [
		"0x43",
		"0x53",
		"0x46",
		"0x43",
		"0x48",
		"0x55",
		"0x4e",
		"0x4b"
	]);
	exports.add("wav", [
		"0x52",
		"0x49",
		"0x46",
		"0x46",
		"?",
		"?",
		"?",
		"?",
		"0x57",
		"0x41",
		"0x56",
		"0x45"
	], {
		mime: "audio/x-wav",
		extension: "wav"
	});
	exports.add("avi", [
		"0x52",
		"0x49",
		"0x46",
		"0x46",
		"?",
		"?",
		"?",
		"?",
		"0x41",
		"0x56",
		"0x49",
		"0x20"
	], {
		mime: "video/x-msvideo",
		extension: "avi"
	});
	exports.add("mp3", ["0xFF", "0xFB"], {
		mime: "audio/mpeg",
		extension: "mp3"
	});
	exports.add("mp3", ["0xFF", "0xF3"], {
		mime: "audio/mpeg",
		extension: "mp3"
	});
	exports.add("mp3", ["0xFF", "0xF2"], {
		mime: "audio/mpeg",
		extension: "mp3"
	});
	exports.add("mp3", [
		"0x49",
		"0x44",
		"0x33"
	], {
		mime: "audio/mpeg",
		extension: "mp3"
	});
	exports.add("bmp", ["0x42", "0x4D"], {
		mime: "image/bmp",
		extension: "bmp"
	});
	exports.add("iso", [
		"0x43",
		"0x44",
		"0x30",
		"0x30",
		"0x31"
	]);
	exports.add("flac", [
		"0x66",
		"0x4C",
		"0x61",
		"0x43"
	]);
	exports.add("mid", [
		"0x4D",
		"0x54",
		"0x68",
		"0x64"
	], {
		mime: "audio/midi",
		extension: "mid"
	});
	exports.add("midi", [
		"0x4D",
		"0x54",
		"0x68",
		"0x64"
	], {
		mime: "audio/midi",
		extension: "midi"
	});
	exports.add("doc", [
		"0xD0",
		"0xCF",
		"0x11",
		"0xE0",
		"0xA1",
		"0xB1",
		"0x1A",
		"0xE1"
	], {
		mime: "application/msword",
		extension: "doc"
	});
	exports.add("xls", [
		"0xD0",
		"0xCF",
		"0x11",
		"0xE0",
		"0xA1",
		"0xB1",
		"0x1A",
		"0xE1"
	], {
		mime: "application/vnd.ms-excel",
		extension: "xls"
	});
	exports.add("ppt", [
		"0xD0",
		"0xCF",
		"0x11",
		"0xE0",
		"0xA1",
		"0xB1",
		"0x1A",
		"0xE1"
	], {
		mime: "application/vnd.ms-powerpoint",
		extension: "ppt"
	});
	exports.add("msg", [
		"0xD0",
		"0xCF",
		"0x11",
		"0xE0",
		"0xA1",
		"0xB1",
		"0x1A",
		"0xE1"
	]);
	exports.add("dex", [
		"0x64",
		"0x65",
		"0x78",
		"0x0A",
		"0x30",
		"0x33",
		"0x35",
		"0x00"
	]);
	exports.add("vmdk", [
		"0x4B",
		"0x44",
		"0x4D"
	]);
	exports.add("crx", [
		"0x43",
		"0x72",
		"0x32",
		"0x34"
	]);
	exports.add("fh8", [
		"0x41",
		"0x47",
		"0x44",
		"0x33"
	]);
	exports.add("cwk", [
		"0x05",
		"0x07",
		"0x00",
		"0x00",
		"0x42",
		"0x4F",
		"0x42",
		"0x4F",
		"0x05",
		"0x07",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x01"
	]);
	exports.add("cwk", [
		"0x06",
		"0x07",
		"0xE1",
		"0x00",
		"0x42",
		"0x4F",
		"0x42",
		"0x4F",
		"0x06",
		"0x07",
		"0xE1",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x00",
		"0x01"
	]);
	exports.add("toast", [
		"0x45",
		"0x52",
		"0x02",
		"0x00",
		"0x00",
		"0x00"
	]);
	exports.add("toast", [
		"0x8B",
		"0x45",
		"0x52",
		"0x02",
		"0x00",
		"0x00",
		"0x00"
	]);
	exports.add("dmg", [
		"0x78",
		"0x01",
		"0x73",
		"0x0D",
		"0x62",
		"0x62",
		"0x60"
	]);
	exports.add("xar", [
		"0x78",
		"0x61",
		"0x72",
		"0x21"
	]);
	exports.add("dat", [
		"0x50",
		"0x4D",
		"0x4F",
		"0x43",
		"0x43",
		"0x4D",
		"0x4F",
		"0x43"
	]);
	exports.add("nes", [
		"0x4E",
		"0x45",
		"0x53",
		"0x1A"
	]);
	exports.add("tar", [
		"0x75",
		"0x73",
		"0x74",
		"0x61",
		"0x72",
		"0x00",
		"0x30",
		"0x30"
	], {
		mime: "application/x-tar",
		extension: "tar"
	}, 257);
	exports.add("tar", [
		"0x75",
		"0x73",
		"0x74",
		"0x61",
		"0x72",
		"0x20",
		"0x20",
		"0x00"
	], {
		mime: "application/x-tar",
		extension: "tar"
	}, 257);
	exports.add("tox", [
		"0x74",
		"0x6F",
		"0x78",
		"0x33"
	]);
	exports.add("mlv", [
		"0x4D",
		"0x4C",
		"0x56",
		"0x49"
	]);
	exports.add("windowsupdate", [
		"0x44",
		"0x43",
		"0x4D",
		"0x01",
		"0x50",
		"0x41",
		"0x33",
		"0x30"
	]);
	exports.add("7z", [
		"0x37",
		"0x7A",
		"0xBC",
		"0xAF",
		"0x27",
		"0x1C"
	], {
		mime: "application/x-7z-compressed",
		extension: "7z"
	});
	exports.add("gz", ["0x1F", "0x8B"], {
		mime: "application/gzip",
		extension: "gz"
	});
	exports.add("tar.gz", ["0x1F", "0x8B"], {
		mime: "application/gzip",
		extension: "tar.gz"
	});
	exports.add("xz", [
		"0xFD",
		"0x37",
		"0x7A",
		"0x58",
		"0x5A",
		"0x00",
		"0x00"
	], {
		mime: "application/gzip",
		extension: "xz"
	});
	exports.add("tar.xz", [
		"0xFD",
		"0x37",
		"0x7A",
		"0x58",
		"0x5A",
		"0x00",
		"0x00"
	], {
		mime: "application/gzip",
		extension: "tar.xz"
	});
	exports.add("lz2", [
		"0x04",
		"0x22",
		"0x4D",
		"0x18"
	]);
	exports.add("cab", [
		"0x4D",
		"0x53",
		"0x43",
		"0x46"
	]);
	exports.add("mkv", [
		"0x1A",
		"0x45",
		"0xDF",
		"0xA3"
	], {
		mime: "video/x-matroska",
		extension: "mkv"
	});
	exports.add("mka", [
		"0x1A",
		"0x45",
		"0xDF",
		"0xA3"
	], {
		mime: "audio/x-matroska",
		extension: "mka"
	});
	exports.add("mks", [
		"0x1A",
		"0x45",
		"0xDF",
		"0xA3"
	], {
		mime: "video/x-matroska",
		extension: "mks"
	});
	exports.add("mk3d", [
		"0x1A",
		"0x45",
		"0xDF",
		"0xA3"
	]);
	exports.add("webm", [
		"0x1A",
		"0x45",
		"0xDF",
		"0xA3"
	], {
		mime: "audio/webm",
		extension: "webm"
	});
	exports.add("dcm", [
		"0x44",
		"0x49",
		"0x43",
		"0x4D"
	], void 0, 128);
	exports.add("xml", [
		"0x3C",
		"0x3f",
		"0x78",
		"0x6d",
		"0x6C",
		"0x20"
	], {
		mime: "application/xml",
		extension: "xml"
	});
	exports.add("wasm", [
		"0x00",
		"0x61",
		"0x73",
		"0x6d"
	], {
		mime: "application/wasm",
		extension: "wasm"
	});
	exports.add("lep", [
		"0xCF",
		"0x84",
		"0x01"
	]);
	exports.add("swf", [
		"0x43",
		"0x57",
		"0x53"
	], {
		mime: "application/x-shockwave-flash",
		extension: "swf"
	});
	exports.add("swf", [
		"0x46",
		"0x57",
		"0x53"
	], {
		mime: "application/x-shockwave-flash",
		extension: "swf"
	});
	exports.add("deb", [
		"0x21",
		"0x3C",
		"0x61",
		"0x72",
		"0x63",
		"0x68",
		"0x3E"
	]);
	exports.add("rtf", [
		"0x7B",
		"0x5C",
		"0x72",
		"0x74",
		"0x66",
		"0x31"
	], {
		mime: "application/rtf",
		extension: "rtf"
	});
	exports.add("m2p", [
		"0x00",
		"0x00",
		"0x01",
		"0xBA"
	]);
	exports.add("vob", [
		"0x00",
		"0x00",
		"0x01",
		"0xBA"
	]);
	exports.add("mpg", [
		"0x00",
		"0x00",
		"0x01",
		"0xBA"
	], {
		mime: "video/mpeg",
		extension: "mpg"
	});
	exports.add("mpeg", [
		"0x00",
		"0x00",
		"0x01",
		"0xBA"
	], {
		mime: "video/mpeg",
		extension: "mpeg"
	});
	exports.add("mpeg", ["0x47"], {
		mime: "video/mpeg",
		extension: "mpeg"
	});
	exports.add("mpeg", [
		"0x00",
		"0x00",
		"0x01",
		"0xB3"
	], {
		mime: "video/mpeg",
		extension: "mpeg"
	});
	exports.add("mov", [
		"0x66",
		"0x72",
		"0x65",
		"0x65"
	], {
		mime: "video/quicktime",
		extension: "mov"
	}, 4);
	exports.add("mov", [
		"0x6D",
		"0x64",
		"0x61",
		"0x74"
	], {
		mime: "video/quicktime",
		extension: "mov"
	}, 4);
	exports.add("mov", [
		"0x6D",
		"0x6F",
		"0x6F",
		"0x76"
	], {
		mime: "video/quicktime",
		extension: "mov"
	}, 4);
	exports.add("mov", [
		"0x77",
		"0x69",
		"0x64",
		"0x65"
	], {
		mime: "video/quicktime",
		extension: "mov"
	}, 4);
	exports.add("mov", [
		"0x66",
		"0x74",
		"0x79",
		"0x70",
		"0x71",
		"0x74"
	], {
		mime: "video/quicktime",
		extension: "mov"
	}, 4);
	exports.add("hl2demo", [
		"0x48",
		"0x4C",
		"0x32",
		"0x44",
		"0x45",
		"0x4D",
		"0x4F"
	]);
	exports.add("txt", [
		"0xEF",
		"0xBB",
		"0xBF"
	], {
		mime: "text/plain; charset=UTF-8",
		extension: "txt"
	});
	exports.add("txt", ["0xFF", "0xFE"], {
		mime: "text/plain; charset=UTF-16LE",
		extension: "txt"
	});
	exports.add("txt", ["0xFE", "0xFF"], {
		mime: "text/plain; charset=UTF-16BE",
		extension: "txt"
	});
	exports.add("txt", [
		"0xFF",
		"0xFE",
		"0x00",
		"0x00"
	], {
		mime: "text/plain; charset=UTF-32LE",
		extension: "txt"
	});
	exports.add("txt", [
		"0x00",
		"0x00",
		"0xFE",
		"0xFF"
	], {
		mime: "text/plain; charset=UTF-32BE",
		extension: "txt"
	});
	exports.add("SubRip", [
		"0x31",
		"0x0D",
		"0x0A",
		"0x30",
		"0x30",
		"0x3A"
	], {
		mime: "application/x-subrip",
		extension: "srt"
	});
	exports.add("WebVTT", [
		"0xEF",
		"0xBB",
		"0xBF",
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x0A"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("WebVTT", [
		"0xEF",
		"0xBB",
		"0xBF",
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x0D"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("WebVTT", [
		"0xEF",
		"0xBB",
		"0xBF",
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x20"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("WebVTT", [
		"0xEF",
		"0xBB",
		"0xBF",
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x09"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("WebVTT", [
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x0A"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("WebVTT", [
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x0D"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("WebVTT", [
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x20"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("WebVTT", [
		"0x57",
		"0x45",
		"0x42",
		"0x56",
		"0x54",
		"0x54",
		"0x09"
	], {
		mime: "text/vtt",
		extension: "vtt"
	});
	exports.add("Json", ["0x7B"], {
		mime: "application/json",
		extension: ".json"
	});
	exports.add("Json", ["0x5B"], {
		mime: "application/json",
		extension: ".json"
	});
	exports.add("ELF", [
		"0x7F",
		"0x45",
		"0x4C",
		"0x46"
	], {
		mime: "application/x-executable",
		extension: ".elf"
	});
	exports.add("Mach-O", [
		"0xFE",
		"0xED",
		"0xFA",
		"0xC"
	], {
		mime: "application/x-mach-binary",
		extension: ".o"
	});
	exports.add("Mach-O", [
		"0xFE",
		"0xED",
		"0xFA",
		"0xCF"
	], {
		mime: "application/x-executable",
		extension: "elf"
	});
	exports.add("EML", [
		"0x52",
		"0x65",
		"0x63",
		"0x65",
		"0x69",
		"0x76",
		"0x65",
		"0x64",
		"0x3A"
	], {
		mime: "message/rfc822",
		extension: ".eml"
	});
	exports.add("SVG", [
		"0x3c",
		"0x73",
		"0x76",
		"0x67"
	], {
		mime: "image/svg+xml",
		extension: "svg"
	});
	exports.add("avif", [
		"0x66",
		"0x74",
		"0x79",
		"0x70",
		"0x61",
		"0x76",
		"0x69",
		"0x66"
	], {
		mime: "image/avif",
		extension: "avif"
	}, 4);
	var createTree = () => tree;
	exports.createTree = createTree;
	exports.default = () => tree;
}));
var require_dist$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var pattern_tree_1 = require_pattern_tree();
	var toHex_1 = require_toHex();
	var patternTree = pattern_tree_1.createTree();
	var filetypeinfo = (bytes) => {
		let tree$3 = patternTree;
		for (const k of Object.keys(tree$3.offset)) {
			const offset = toHex_1.fromHex(k);
			if (offset >= bytes.length) continue;
			const node = patternTree.offset[k];
			const guessed = walkTree(offset, bytes, node);
			if (guessed.length > 0) return guessed;
		}
		if (tree$3.noOffset === null) return [];
		return walkTree(0, bytes, tree$3.noOffset);
	};
	exports.filetypeinfo = filetypeinfo;
	var walkTree = (index, bytes, node) => {
		let step = node;
		let guessFile = [];
		while (true) {
			const currentByte = toHex_1.toHex(bytes[index]);
			if (step.bytes["?"] && !step.bytes[currentByte]) step = step.bytes["?"];
			else step = step.bytes[currentByte];
			if (!step) return guessFile;
			if (step && step.matches) guessFile = step.matches.slice(0);
			index += 1;
		}
	};
	exports.default = exports.filetypeinfo;
	var filetypename = (bytes) => exports.filetypeinfo(bytes).map((e) => e.typename);
	exports.filetypename = filetypename;
	var filetypemime = (bytes) => exports.filetypeinfo(bytes).map((e) => e.mime ? e.mime : null).filter((x) => x !== null);
	exports.filetypemime = filetypemime;
	var filetypeextension = (bytes) => exports.filetypeinfo(bytes).map((e) => e.extension ? e.extension : null).filter((x) => x !== null);
	exports.filetypeextension = filetypeextension;
	var register = (typename, signature, additionalInfo, offset) => {
		pattern_tree_1.add(typename, signature, additionalInfo, offset);
	};
	exports.register = register;
}));
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __defProp$1 = Object.defineProperty;
	var __defNormalProp = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
		enumerable: true,
		configurable: true,
		writable: true,
		value
	}) : obj[key] = value;
	var __name$1 = (target, value) => __defProp$1(target, "name", {
		value,
		configurable: true
	});
	var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
	var _AsyncQueueEntry = class _AsyncQueueEntry$1 {
		constructor(queue) {
			__publicField(this, "promise");
			__publicField(this, "resolve");
			__publicField(this, "reject");
			__publicField(this, "queue");
			__publicField(this, "signal", null);
			__publicField(this, "signalListener", null);
			this.queue = queue;
			this.promise = new Promise((resolve, reject) => {
				this.resolve = resolve;
				this.reject = reject;
			});
		}
		setSignal(signal) {
			if (signal.aborted) return this;
			this.signal = signal;
			this.signalListener = () => {
				const index = this.queue["promises"].indexOf(this);
				if (index !== -1) this.queue["promises"].splice(index, 1);
				this.reject(/* @__PURE__ */ new Error("Request aborted manually"));
			};
			this.signal.addEventListener("abort", this.signalListener);
			return this;
		}
		use() {
			this.dispose();
			this.resolve();
			return this;
		}
		abort() {
			this.dispose();
			this.reject(/* @__PURE__ */ new Error("Request aborted manually"));
			return this;
		}
		dispose() {
			if (this.signal) {
				this.signal.removeEventListener("abort", this.signalListener);
				this.signal = null;
				this.signalListener = null;
			}
		}
	};
	__name$1(_AsyncQueueEntry, "AsyncQueueEntry");
	var AsyncQueueEntry = _AsyncQueueEntry;
	var _AsyncQueue = class _AsyncQueue$1 {
		constructor() {
			__publicField(this, "promises", []);
		}
		get remaining() {
			return this.promises.length;
		}
		get queued() {
			return this.remaining === 0 ? 0 : this.remaining - 1;
		}
		wait(options) {
			const entry = new AsyncQueueEntry(this);
			if (this.promises.length === 0) {
				this.promises.push(entry);
				return Promise.resolve();
			}
			this.promises.push(entry);
			if (options?.signal) entry.setSignal(options.signal);
			return entry.promise;
		}
		shift() {
			if (this.promises.length === 0) return;
			if (this.promises.length === 1) {
				this.promises.shift();
				return;
			}
			this.promises.shift();
			this.promises[0].use();
		}
		abortAll() {
			if (this.queued === 0) return;
			for (let i = 1; i < this.promises.length; ++i) this.promises[i].abort();
			this.promises.length = 1;
		}
	};
	__name$1(_AsyncQueue, "AsyncQueue");
	exports.AsyncQueue = _AsyncQueue;
}));
var require_dist$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __name = (target, value) => __defProp(target, "name", {
		value,
		configurable: true
	});
	var __export = (target, all) => {
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") {
			for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: () => from[key],
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toCommonJS = (mod$7) => __copyProps(__defProp({}, "__esModule", { value: true }), mod$7);
	var src_exports = {};
	__export(src_exports, {
		ALLOWED_EXTENSIONS: () => ALLOWED_EXTENSIONS,
		ALLOWED_SIZES: () => ALLOWED_SIZES,
		ALLOWED_STICKER_EXTENSIONS: () => ALLOWED_STICKER_EXTENSIONS,
		BurstHandlerMajorIdKey: () => BurstHandlerMajorIdKey,
		CDN: () => CDN,
		DEPRECATION_WARNING_PREFIX: () => DEPRECATION_WARNING_PREFIX,
		DefaultRestOptions: () => DefaultRestOptions,
		DefaultUserAgent: () => DefaultUserAgent,
		DefaultUserAgentAppendix: () => DefaultUserAgentAppendix,
		DiscordAPIError: () => DiscordAPIError,
		HTTPError: () => HTTPError,
		OverwrittenMimeTypes: () => OverwrittenMimeTypes,
		REST: () => REST,
		RESTEvents: () => RESTEvents,
		RateLimitError: () => RateLimitError,
		RequestMethod: () => RequestMethod,
		calculateUserDefaultAvatarIndex: () => calculateUserDefaultAvatarIndex,
		makeURLSearchParams: () => makeURLSearchParams,
		parseResponse: () => parseResponse,
		version: () => version
	});
	module.exports = __toCommonJS(src_exports);
	var import_node_buffer = __require("buffer");
	var import_util2 = require_dist$4();
	var import_undici2 = require_undici();
	var defaultStrategy;
	function setDefaultStrategy(newStrategy) {
		defaultStrategy = newStrategy;
	}
	__name(setDefaultStrategy, "setDefaultStrategy");
	function getDefaultStrategy() {
		return defaultStrategy;
	}
	__name(getDefaultStrategy, "getDefaultStrategy");
	var import_node_http = __require("http");
	var import_node_url = __require("url");
	var import_node_util = __require("util");
	var import_undici = require_undici();
	async function makeRequest(url, init) {
		const options = {
			...init,
			body: await resolveBody(init.body)
		};
		const res = await (0, import_undici.request)(url, options);
		return {
			body: res.body,
			async arrayBuffer() {
				return res.body.arrayBuffer();
			},
			async json() {
				return res.body.json();
			},
			async text() {
				return res.body.text();
			},
			get bodyUsed() {
				return res.body.bodyUsed;
			},
			headers: new import_undici.Headers(res.headers),
			status: res.statusCode,
			statusText: import_node_http.STATUS_CODES[res.statusCode],
			ok: res.statusCode >= 200 && res.statusCode < 300
		};
	}
	__name(makeRequest, "makeRequest");
	async function resolveBody(body) {
		if (body == null) return null;
		else if (typeof body === "string") return body;
		else if (import_node_util.types.isUint8Array(body)) return body;
		else if (import_node_util.types.isArrayBuffer(body)) return new Uint8Array(body);
		else if (body instanceof import_node_url.URLSearchParams) return body.toString();
		else if (body instanceof DataView) return new Uint8Array(body.buffer);
		else if (body instanceof Blob) return new Uint8Array(await body.arrayBuffer());
		else if (body instanceof FormData) return body;
		else if (body[Symbol.iterator]) {
			const chunks = [...body];
			return Buffer.concat(chunks);
		} else if (body[Symbol.asyncIterator]) {
			const chunks = [];
			for await (const chunk of body) chunks.push(chunk);
			return Buffer.concat(chunks);
		}
		throw new TypeError(`Unable to resolve body.`);
	}
	__name(resolveBody, "resolveBody");
	var import_v102 = require_v10();
	var import_util = require_dist$4();
	var import_v10 = require_v10();
	var DefaultUserAgent = `DiscordBot (https://discord.js.org, 2.5.1)`;
	var DefaultUserAgentAppendix = (0, import_util.getUserAgentAppendix)();
	var DefaultRestOptions = {
		agent: null,
		api: "https://discord.com/api",
		authPrefix: "Bot",
		cdn: "https://cdn.discordapp.com",
		headers: {},
		invalidRequestWarningInterval: 0,
		globalRequestsPerSecond: 50,
		offset: 50,
		rejectOnRateLimit: null,
		retries: 3,
		timeout: 15e3,
		userAgentAppendix: DefaultUserAgentAppendix,
		version: import_v10.APIVersion,
		hashSweepInterval: 144e5,
		hashLifetime: 864e5,
		handlerSweepInterval: 36e5,
		async makeRequest(...args) {
			return getDefaultStrategy()(...args);
		},
		mediaProxy: "https://media.discordapp.net"
	};
	var RESTEvents = /* @__PURE__ */ ((RESTEvents2) => {
		RESTEvents2["Debug"] = "restDebug";
		RESTEvents2["HandlerSweep"] = "handlerSweep";
		RESTEvents2["HashSweep"] = "hashSweep";
		RESTEvents2["InvalidRequestWarning"] = "invalidRequestWarning";
		RESTEvents2["RateLimited"] = "rateLimited";
		RESTEvents2["Response"] = "response";
		return RESTEvents2;
	})(RESTEvents || {});
	var ALLOWED_EXTENSIONS = [
		"webp",
		"png",
		"jpg",
		"jpeg",
		"gif"
	];
	var ALLOWED_STICKER_EXTENSIONS = [
		"png",
		"json",
		"gif"
	];
	var ALLOWED_SIZES = [
		16,
		32,
		64,
		128,
		256,
		512,
		1024,
		2048,
		4096
	];
	var OverwrittenMimeTypes = { "image/apng": "image/png" };
	var BurstHandlerMajorIdKey = "burst";
	var DEPRECATION_WARNING_PREFIX = "DeprecationWarning";
	var RateLimitError = class _RateLimitError extends Error {
		static {
			__name(this, "RateLimitError");
		}
		timeToReset;
		limit;
		method;
		hash;
		url;
		route;
		majorParameter;
		global;
		retryAfter;
		sublimitTimeout;
		scope;
		constructor({ timeToReset, limit, method, hash, url, route, majorParameter, global: global$1, retryAfter, sublimitTimeout, scope }) {
			super();
			this.timeToReset = timeToReset;
			this.limit = limit;
			this.method = method;
			this.hash = hash;
			this.url = url;
			this.route = route;
			this.majorParameter = majorParameter;
			this.global = global$1;
			this.retryAfter = retryAfter;
			this.sublimitTimeout = sublimitTimeout;
			this.scope = scope;
		}
		get name() {
			return `${_RateLimitError.name}[${this.route}]`;
		}
	};
	var RequestMethod = /* @__PURE__ */ ((RequestMethod2) => {
		RequestMethod2["Delete"] = "DELETE";
		RequestMethod2["Get"] = "GET";
		RequestMethod2["Patch"] = "PATCH";
		RequestMethod2["Post"] = "POST";
		RequestMethod2["Put"] = "PUT";
		return RequestMethod2;
	})(RequestMethod || {});
	function serializeSearchParam(value) {
		switch (typeof value) {
			case "string": return value;
			case "number":
			case "bigint":
			case "boolean": return value.toString();
			case "object":
				if (value === null) return null;
				if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value.toISOString();
				if (typeof value.toString === "function" && value.toString !== Object.prototype.toString) return value.toString();
				return null;
			default: return null;
		}
	}
	__name(serializeSearchParam, "serializeSearchParam");
	function makeURLSearchParams(options) {
		const params = new URLSearchParams();
		if (!options) return params;
		for (const [key, value] of Object.entries(options)) {
			const serialized = serializeSearchParam(value);
			if (serialized !== null) params.append(key, serialized);
		}
		return params;
	}
	__name(makeURLSearchParams, "makeURLSearchParams");
	async function parseResponse(res) {
		if (res.headers.get("Content-Type")?.startsWith("application/json")) return res.json();
		return res.arrayBuffer();
	}
	__name(parseResponse, "parseResponse");
	function hasSublimit(bucketRoute, body, method) {
		if (bucketRoute === "/channels/:id") {
			if (typeof body !== "object" || body === null) return false;
			if (method !== "PATCH") return false;
			const castedBody = body;
			return ["name", "topic"].some((key) => Reflect.has(castedBody, key));
		}
		return true;
	}
	__name(hasSublimit, "hasSublimit");
	function shouldRetry(error) {
		if (error.name === "AbortError") return true;
		return "code" in error && error.code === "ECONNRESET" || error.message.includes("ECONNRESET");
	}
	__name(shouldRetry, "shouldRetry");
	async function onRateLimit(manager, rateLimitData) {
		const { options } = manager;
		if (!options.rejectOnRateLimit) return;
		if (typeof options.rejectOnRateLimit === "function" ? await options.rejectOnRateLimit(rateLimitData) : options.rejectOnRateLimit.some((route) => rateLimitData.route.startsWith(route.toLowerCase()))) throw new RateLimitError(rateLimitData);
	}
	__name(onRateLimit, "onRateLimit");
	function calculateUserDefaultAvatarIndex(userId) {
		return Number(BigInt(userId) >> 22n) % 6;
	}
	__name(calculateUserDefaultAvatarIndex, "calculateUserDefaultAvatarIndex");
	async function sleep(ms) {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), ms);
		});
	}
	__name(sleep, "sleep");
	function isBufferLike(value) {
		return value instanceof ArrayBuffer || value instanceof Uint8Array || value instanceof Uint8ClampedArray;
	}
	__name(isBufferLike, "isBufferLike");
	function deprecationWarning(message) {
		if (typeof globalThis.process === "undefined") console.warn(`${DEPRECATION_WARNING_PREFIX}: ${message}`);
		else process.emitWarning(message, DEPRECATION_WARNING_PREFIX);
	}
	__name(deprecationWarning, "deprecationWarning");
	function normalizeRateLimitOffset(offset, route) {
		if (typeof offset === "number") return Math.max(0, offset);
		const result = offset(route);
		return Math.max(0, result);
	}
	__name(normalizeRateLimitOffset, "normalizeRateLimitOffset");
	var deprecationEmittedForEmoji = false;
	var CDN = class {
		constructor(cdn = DefaultRestOptions.cdn, mediaProxy = DefaultRestOptions.mediaProxy) {
			this.cdn = cdn;
			this.mediaProxy = mediaProxy;
		}
		static {
			__name(this, "CDN");
		}
		appAsset(clientId$1, assetHash, options) {
			return this.makeURL(`/app-assets/${clientId$1}/${assetHash}`, options);
		}
		appIcon(clientId$1, iconHash, options) {
			return this.makeURL(`/app-icons/${clientId$1}/${iconHash}`, options);
		}
		avatar(id, avatarHash, options) {
			return this.dynamicMakeURL(`/avatars/${id}/${avatarHash}`, avatarHash, options);
		}
		avatarDecoration(userIdOrAsset, userAvatarDecoration, options) {
			if (userAvatarDecoration) return this.makeURL(`/avatar-decorations/${userIdOrAsset}/${userAvatarDecoration}`, options);
			return this.makeURL(`/avatar-decoration-presets/${userIdOrAsset}`, { extension: "png" });
		}
		banner(id, bannerHash, options) {
			return this.dynamicMakeURL(`/banners/${id}/${bannerHash}`, bannerHash, options);
		}
		channelIcon(channelId, iconHash, options) {
			return this.makeURL(`/channel-icons/${channelId}/${iconHash}`, options);
		}
		defaultAvatar(index) {
			return this.makeURL(`/embed/avatars/${index}`, { extension: "png" });
		}
		discoverySplash(guildId, splashHash, options) {
			return this.makeURL(`/discovery-splashes/${guildId}/${splashHash}`, options);
		}
		emoji(emojiId, options) {
			let resolvedOptions;
			if (typeof options === "string") {
				if (!deprecationEmittedForEmoji) {
					deprecationWarning("Passing a string for the second parameter of CDN#emoji() is deprecated. Use an object instead.");
					deprecationEmittedForEmoji = true;
				}
				resolvedOptions = { extension: options };
			} else resolvedOptions = options;
			return this.makeURL(`/emojis/${emojiId}`, resolvedOptions);
		}
		guildMemberAvatar(guildId, userId, avatarHash, options) {
			return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/avatars/${avatarHash}`, avatarHash, options);
		}
		guildMemberBanner(guildId, userId, bannerHash, options) {
			return this.dynamicMakeURL(`/guilds/${guildId}/users/${userId}/banners/${bannerHash}`, bannerHash, options);
		}
		icon(id, iconHash, options) {
			return this.dynamicMakeURL(`/icons/${id}/${iconHash}`, iconHash, options);
		}
		roleIcon(roleId, roleIconHash, options) {
			return this.makeURL(`/role-icons/${roleId}/${roleIconHash}`, options);
		}
		splash(guildId, splashHash, options) {
			return this.makeURL(`/splashes/${guildId}/${splashHash}`, options);
		}
		sticker(stickerId, extension = "png") {
			return this.makeURL(`/stickers/${stickerId}`, {
				allowedExtensions: ALLOWED_STICKER_EXTENSIONS,
				base: extension === "gif" ? this.mediaProxy : this.cdn,
				extension
			});
		}
		stickerPackBanner(bannerId, options) {
			return this.makeURL(`/app-assets/710982414301790216/store/${bannerId}`, options);
		}
		teamIcon(teamId, iconHash, options) {
			return this.makeURL(`/team-icons/${teamId}/${iconHash}`, options);
		}
		guildScheduledEventCover(scheduledEventId, coverHash, options) {
			return this.makeURL(`/guild-events/${scheduledEventId}/${coverHash}`, options);
		}
		soundboardSound(soundId) {
			return `${this.cdn}${import_v102.CDNRoutes.soundboardSound(soundId)}`;
		}
		dynamicMakeURL(route, hash, { forceStatic = false,...options } = {}) {
			return this.makeURL(route, !forceStatic && hash.startsWith("a_") ? {
				...options,
				extension: "gif"
			} : options);
		}
		makeURL(route, { allowedExtensions = ALLOWED_EXTENSIONS, base = this.cdn, extension = "webp", size } = {}) {
			extension = String(extension).toLowerCase();
			if (!allowedExtensions.includes(extension)) throw new RangeError(`Invalid extension provided: ${extension}
Must be one of: ${allowedExtensions.join(", ")}`);
			if (size && !ALLOWED_SIZES.includes(size)) throw new RangeError(`Invalid size provided: ${size}
Must be one of: ${ALLOWED_SIZES.join(", ")}`);
			const url = new URL(`${base}${route}.${extension}`);
			if (size) url.searchParams.set("size", String(size));
			return url.toString();
		}
	};
	function isErrorGroupWrapper(error) {
		return Reflect.has(error, "_errors");
	}
	__name(isErrorGroupWrapper, "isErrorGroupWrapper");
	function isErrorResponse(error) {
		return typeof Reflect.get(error, "message") === "string";
	}
	__name(isErrorResponse, "isErrorResponse");
	var DiscordAPIError = class _DiscordAPIError extends Error {
		constructor(rawError, code, status, method, url, bodyData) {
			super(_DiscordAPIError.getMessage(rawError));
			this.rawError = rawError;
			this.code = code;
			this.status = status;
			this.method = method;
			this.url = url;
			this.requestBody = {
				files: bodyData.files,
				json: bodyData.body
			};
		}
		static {
			__name(this, "DiscordAPIError");
		}
		requestBody;
		get name() {
			return `${_DiscordAPIError.name}[${this.code}]`;
		}
		static getMessage(error) {
			let flattened = "";
			if ("code" in error) {
				if (error.errors) flattened = [...this.flattenDiscordError(error.errors)].join("\n");
				return error.message && flattened ? `${error.message}
${flattened}` : error.message || flattened || "Unknown Error";
			}
			return error.error_description ?? "No Description";
		}
		static *flattenDiscordError(obj, key = "") {
			if (isErrorResponse(obj)) return yield `${key.length ? `${key}[${obj.code}]` : `${obj.code}`}: ${obj.message}`.trim();
			for (const [otherKey, val] of Object.entries(obj)) {
				const nextKey = otherKey.startsWith("_") ? key : key ? Number.isNaN(Number(otherKey)) ? `${key}.${otherKey}` : `${key}[${otherKey}]` : otherKey;
				if (typeof val === "string") yield val;
				else if (isErrorGroupWrapper(val)) for (const error of val._errors) yield* this.flattenDiscordError(error, nextKey);
				else yield* this.flattenDiscordError(val, nextKey);
			}
		}
	};
	var HTTPError = class _HTTPError extends Error {
		constructor(status, statusText, method, url, bodyData) {
			super(statusText);
			this.status = status;
			this.method = method;
			this.url = url;
			this.requestBody = {
				files: bodyData.files,
				json: bodyData.body
			};
		}
		static {
			__name(this, "HTTPError");
		}
		requestBody;
		name = _HTTPError.name;
	};
	var import_collection = require_dist$3();
	var import_snowflake = require_cjs$1();
	var import_async_event_emitter = require_dist$5();
	var import_magic_bytes = require_dist$2();
	var invalidCount = 0;
	var invalidCountResetTime = null;
	function incrementInvalidCount(manager) {
		if (!invalidCountResetTime || invalidCountResetTime < Date.now()) {
			invalidCountResetTime = Date.now() + 1e3 * 60 * 10;
			invalidCount = 0;
		}
		invalidCount++;
		if (manager.options.invalidRequestWarningInterval > 0 && invalidCount % manager.options.invalidRequestWarningInterval === 0) manager.emit("invalidRequestWarning", {
			count: invalidCount,
			remainingTime: invalidCountResetTime - Date.now()
		});
	}
	__name(incrementInvalidCount, "incrementInvalidCount");
	async function makeNetworkRequest(manager, routeId, url, options, requestData, retries) {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), manager.options.timeout);
		if (requestData.signal) if (requestData.signal.aborted) controller.abort();
		else requestData.signal.addEventListener("abort", () => controller.abort());
		let res;
		try {
			res = await manager.options.makeRequest(url, {
				...options,
				signal: controller.signal
			});
		} catch (error) {
			if (!(error instanceof Error)) throw error;
			if (shouldRetry(error) && retries !== manager.options.retries) return null;
			throw error;
		} finally {
			clearTimeout(timeout);
		}
		if (manager.listenerCount("response")) manager.emit("response", {
			method: options.method ?? "get",
			path: routeId.original,
			route: routeId.bucketRoute,
			options,
			data: requestData,
			retries
		}, res instanceof Response ? res.clone() : { ...res });
		return res;
	}
	__name(makeNetworkRequest, "makeNetworkRequest");
	async function handleErrors(manager, res, method, url, requestData, retries) {
		const status = res.status;
		if (status >= 500 && status < 600) {
			if (retries !== manager.options.retries) return null;
			throw new HTTPError(status, res.statusText, method, url, requestData);
		} else {
			if (status >= 400 && status < 500) {
				if (status === 401 && requestData.auth) manager.setToken(null);
				const data = await parseResponse(res);
				throw new DiscordAPIError(data, "code" in data ? data.code : data.error, status, method, url, requestData);
			}
			return res;
		}
	}
	__name(handleErrors, "handleErrors");
	var BurstHandler = class {
		constructor(manager, hash, majorParameter) {
			this.manager = manager;
			this.hash = hash;
			this.majorParameter = majorParameter;
			this.id = `${hash}:${majorParameter}`;
		}
		static {
			__name(this, "BurstHandler");
		}
		id;
		inactive = false;
		debug(message) {
			this.manager.emit("restDebug", `[REST ${this.id}] ${message}`);
		}
		async queueRequest(routeId, url, options, requestData) {
			return this.runRequest(routeId, url, options, requestData);
		}
		async runRequest(routeId, url, options, requestData, retries = 0) {
			const method = options.method ?? "get";
			const res = await makeNetworkRequest(this.manager, routeId, url, options, requestData, retries);
			if (res === null) return this.runRequest(routeId, url, options, requestData, ++retries);
			const status = res.status;
			let retryAfter = 0;
			const retry = res.headers.get("Retry-After");
			const offset = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
			if (retry) retryAfter = Number(retry) * 1e3 + offset;
			if (status === 401 || status === 403 || status === 429) incrementInvalidCount(this.manager);
			if (status >= 200 && status < 300) return res;
			else if (status === 429) {
				const isGlobal = res.headers.has("X-RateLimit-Global");
				const scope = res.headers.get("X-RateLimit-Scope") ?? "user";
				await onRateLimit(this.manager, {
					global: isGlobal,
					method,
					url,
					route: routeId.bucketRoute,
					majorParameter: this.majorParameter,
					hash: this.hash,
					limit: Number.POSITIVE_INFINITY,
					timeToReset: retryAfter,
					retryAfter,
					sublimitTimeout: 0,
					scope
				});
				this.debug([
					"Encountered unexpected 429 rate limit",
					`  Global         : ${isGlobal}`,
					`  Method         : ${method}`,
					`  URL            : ${url}`,
					`  Bucket         : ${routeId.bucketRoute}`,
					`  Major parameter: ${routeId.majorParameter}`,
					`  Hash           : ${this.hash}`,
					`  Limit          : ${Number.POSITIVE_INFINITY}`,
					`  Retry After    : ${retryAfter}ms`,
					`  Sublimit       : None`,
					`  Scope          : ${scope}`
				].join("\n"));
				await sleep(retryAfter);
				return this.runRequest(routeId, url, options, requestData, retries);
			} else {
				const handled = await handleErrors(this.manager, res, method, url, requestData, retries);
				if (handled === null) return this.runRequest(routeId, url, options, requestData, ++retries);
				return handled;
			}
		}
	};
	var import_async_queue = require_cjs();
	var SequentialHandler = class {
		constructor(manager, hash, majorParameter) {
			this.manager = manager;
			this.hash = hash;
			this.majorParameter = majorParameter;
			this.id = `${hash}:${majorParameter}`;
		}
		static {
			__name(this, "SequentialHandler");
		}
		id;
		reset = -1;
		remaining = 1;
		limit = Number.POSITIVE_INFINITY;
		#asyncQueue = new import_async_queue.AsyncQueue();
		#sublimitedQueue = null;
		#sublimitPromise = null;
		#shiftSublimit = false;
		get inactive() {
			return this.#asyncQueue.remaining === 0 && (this.#sublimitedQueue === null || this.#sublimitedQueue.remaining === 0) && !this.limited;
		}
		get globalLimited() {
			return this.manager.globalRemaining <= 0 && Date.now() < this.manager.globalReset;
		}
		get localLimited() {
			return this.remaining <= 0 && Date.now() < this.reset;
		}
		get limited() {
			return this.globalLimited || this.localLimited;
		}
		getTimeToReset(routeId) {
			const offset = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
			return this.reset + offset - Date.now();
		}
		debug(message) {
			this.manager.emit("restDebug", `[REST ${this.id}] ${message}`);
		}
		async globalDelayFor(time) {
			await sleep(time);
			this.manager.globalDelay = null;
		}
		async queueRequest(routeId, url, options, requestData) {
			let queue = this.#asyncQueue;
			let queueType = 0;
			if (this.#sublimitedQueue && hasSublimit(routeId.bucketRoute, requestData.body, options.method)) {
				queue = this.#sublimitedQueue;
				queueType = 1;
			}
			await queue.wait({ signal: requestData.signal });
			if (queueType === 0) {
				if (this.#sublimitedQueue && hasSublimit(routeId.bucketRoute, requestData.body, options.method)) {
					queue = this.#sublimitedQueue;
					const wait = queue.wait();
					this.#asyncQueue.shift();
					await wait;
				} else if (this.#sublimitPromise) await this.#sublimitPromise.promise;
			}
			try {
				return await this.runRequest(routeId, url, options, requestData);
			} finally {
				queue.shift();
				if (this.#shiftSublimit) {
					this.#shiftSublimit = false;
					this.#sublimitedQueue?.shift();
				}
				if (this.#sublimitedQueue?.remaining === 0) {
					this.#sublimitPromise?.resolve();
					this.#sublimitedQueue = null;
				}
			}
		}
		async runRequest(routeId, url, options, requestData, retries = 0) {
			while (this.limited) {
				const isGlobal = this.globalLimited;
				let limit2;
				let timeout;
				let delay$2;
				if (isGlobal) {
					const offset2 = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
					limit2 = this.manager.options.globalRequestsPerSecond;
					timeout = this.manager.globalReset + offset2 - Date.now();
					if (!this.manager.globalDelay) this.manager.globalDelay = this.globalDelayFor(timeout);
					delay$2 = this.manager.globalDelay;
				} else {
					limit2 = this.limit;
					timeout = this.getTimeToReset(routeId);
					delay$2 = sleep(timeout);
				}
				const rateLimitData = {
					global: isGlobal,
					method: options.method ?? "get",
					url,
					route: routeId.bucketRoute,
					majorParameter: this.majorParameter,
					hash: this.hash,
					limit: limit2,
					timeToReset: timeout,
					retryAfter: timeout,
					sublimitTimeout: 0,
					scope: "user"
				};
				this.manager.emit("rateLimited", rateLimitData);
				await onRateLimit(this.manager, rateLimitData);
				if (isGlobal) this.debug(`Global rate limit hit, blocking all requests for ${timeout}ms`);
				else this.debug(`Waiting ${timeout}ms for rate limit to pass`);
				await delay$2;
			}
			if (!this.manager.globalReset || this.manager.globalReset < Date.now()) {
				this.manager.globalReset = Date.now() + 1e3;
				this.manager.globalRemaining = this.manager.options.globalRequestsPerSecond;
			}
			this.manager.globalRemaining--;
			const method = options.method ?? "get";
			const res = await makeNetworkRequest(this.manager, routeId, url, options, requestData, retries);
			if (res === null) return this.runRequest(routeId, url, options, requestData, ++retries);
			const status = res.status;
			let retryAfter = 0;
			const limit = res.headers.get("X-RateLimit-Limit");
			const remaining = res.headers.get("X-RateLimit-Remaining");
			const reset = res.headers.get("X-RateLimit-Reset-After");
			const hash = res.headers.get("X-RateLimit-Bucket");
			const retry = res.headers.get("Retry-After");
			const scope = res.headers.get("X-RateLimit-Scope") ?? "user";
			const offset = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
			this.limit = limit ? Number(limit) : Number.POSITIVE_INFINITY;
			this.remaining = remaining ? Number(remaining) : 1;
			this.reset = reset ? Number(reset) * 1e3 + Date.now() + offset : Date.now();
			if (retry) retryAfter = Number(retry) * 1e3 + offset;
			if (hash && hash !== this.hash) {
				this.debug([
					"Received bucket hash update",
					`  Old Hash  : ${this.hash}`,
					`  New Hash  : ${hash}`
				].join("\n"));
				this.manager.hashes.set(`${method}:${routeId.bucketRoute}`, {
					value: hash,
					lastAccess: Date.now()
				});
			} else if (hash) {
				const hashData = this.manager.hashes.get(`${method}:${routeId.bucketRoute}`);
				if (hashData) hashData.lastAccess = Date.now();
			}
			let sublimitTimeout = null;
			if (retryAfter > 0) {
				if (res.headers.has("X-RateLimit-Global")) {
					this.manager.globalRemaining = 0;
					this.manager.globalReset = Date.now() + retryAfter;
				} else if (!this.localLimited) sublimitTimeout = retryAfter;
			}
			if (status === 401 || status === 403 || status === 429) incrementInvalidCount(this.manager);
			if (res.ok) return res;
			else if (status === 429) {
				const isGlobal = this.globalLimited;
				let limit2;
				let timeout;
				if (isGlobal) {
					const offset2 = normalizeRateLimitOffset(this.manager.options.offset, routeId.bucketRoute);
					limit2 = this.manager.options.globalRequestsPerSecond;
					timeout = this.manager.globalReset + offset2 - Date.now();
				} else {
					limit2 = this.limit;
					timeout = this.getTimeToReset(routeId);
				}
				await onRateLimit(this.manager, {
					global: isGlobal,
					method,
					url,
					route: routeId.bucketRoute,
					majorParameter: this.majorParameter,
					hash: this.hash,
					limit: limit2,
					timeToReset: timeout,
					retryAfter,
					sublimitTimeout: sublimitTimeout ?? 0,
					scope
				});
				this.debug([
					"Encountered unexpected 429 rate limit",
					`  Global         : ${isGlobal.toString()}`,
					`  Method         : ${method}`,
					`  URL            : ${url}`,
					`  Bucket         : ${routeId.bucketRoute}`,
					`  Major parameter: ${routeId.majorParameter}`,
					`  Hash           : ${this.hash}`,
					`  Limit          : ${limit2}`,
					`  Retry After    : ${retryAfter}ms`,
					`  Sublimit       : ${sublimitTimeout ? `${sublimitTimeout}ms` : "None"}`,
					`  Scope          : ${scope}`
				].join("\n"));
				if (sublimitTimeout) {
					const firstSublimit = !this.#sublimitedQueue;
					if (firstSublimit) {
						this.#sublimitedQueue = new import_async_queue.AsyncQueue();
						this.#sublimitedQueue.wait();
						this.#asyncQueue.shift();
					}
					this.#sublimitPromise?.resolve();
					this.#sublimitPromise = null;
					await sleep(sublimitTimeout);
					let resolve;
					this.#sublimitPromise = {
						promise: new Promise((res2) => resolve = res2),
						resolve
					};
					if (firstSublimit) {
						await this.#asyncQueue.wait();
						this.#shiftSublimit = true;
					}
				}
				return this.runRequest(routeId, url, options, requestData, retries);
			} else {
				const handled = await handleErrors(this.manager, res, method, url, requestData, retries);
				if (handled === null) return this.runRequest(routeId, url, options, requestData, ++retries);
				return handled;
			}
		}
	};
	var REST = class _REST extends import_async_event_emitter.AsyncEventEmitter {
		static {
			__name(this, "REST");
		}
		agent = null;
		cdn;
		globalRemaining;
		globalDelay = null;
		globalReset = -1;
		hashes = new import_collection.Collection();
		handlers = new import_collection.Collection();
		#token = null;
		hashTimer;
		handlerTimer;
		options;
		constructor(options = {}) {
			super();
			this.cdn = new CDN(options.cdn ?? DefaultRestOptions.cdn, options.mediaProxy ?? DefaultRestOptions.mediaProxy);
			this.options = {
				...DefaultRestOptions,
				...options
			};
			this.globalRemaining = Math.max(1, this.options.globalRequestsPerSecond);
			this.agent = options.agent ?? null;
			this.setupSweepers();
		}
		setupSweepers() {
			const validateMaxInterval = /* @__PURE__ */ __name((interval) => {
				if (interval > 144e5) throw new Error("Cannot set an interval greater than 4 hours");
			}, "validateMaxInterval");
			if (this.options.hashSweepInterval !== 0 && this.options.hashSweepInterval !== Number.POSITIVE_INFINITY) {
				validateMaxInterval(this.options.hashSweepInterval);
				this.hashTimer = setInterval(() => {
					const sweptHashes = new import_collection.Collection();
					const currentDate = Date.now();
					this.hashes.sweep((val, key) => {
						if (val.lastAccess === -1) return false;
						const shouldSweep = Math.floor(currentDate - val.lastAccess) > this.options.hashLifetime;
						if (shouldSweep) {
							sweptHashes.set(key, val);
							this.emit("restDebug", `Hash ${val.value} for ${key} swept due to lifetime being exceeded`);
						}
						return shouldSweep;
					});
					this.emit("hashSweep", sweptHashes);
				}, this.options.hashSweepInterval);
				this.hashTimer.unref?.();
			}
			if (this.options.handlerSweepInterval !== 0 && this.options.handlerSweepInterval !== Number.POSITIVE_INFINITY) {
				validateMaxInterval(this.options.handlerSweepInterval);
				this.handlerTimer = setInterval(() => {
					const sweptHandlers = new import_collection.Collection();
					this.handlers.sweep((val, key) => {
						const { inactive } = val;
						if (inactive) {
							sweptHandlers.set(key, val);
							this.emit("restDebug", `Handler ${val.id} for ${key} swept due to being inactive`);
						}
						return inactive;
					});
					this.emit("handlerSweep", sweptHandlers);
				}, this.options.handlerSweepInterval);
				this.handlerTimer.unref?.();
			}
		}
		async get(fullRoute, options = {}) {
			return this.request({
				...options,
				fullRoute,
				method: "GET"
			});
		}
		async delete(fullRoute, options = {}) {
			return this.request({
				...options,
				fullRoute,
				method: "DELETE"
			});
		}
		async post(fullRoute, options = {}) {
			return this.request({
				...options,
				fullRoute,
				method: "POST"
			});
		}
		async put(fullRoute, options = {}) {
			return this.request({
				...options,
				fullRoute,
				method: "PUT"
			});
		}
		async patch(fullRoute, options = {}) {
			return this.request({
				...options,
				fullRoute,
				method: "PATCH"
			});
		}
		async request(options) {
			const response = await this.queueRequest(options);
			return parseResponse(response);
		}
		setAgent(agent) {
			this.agent = agent;
			return this;
		}
		setToken(token) {
			this.#token = token;
			return this;
		}
		async queueRequest(request2) {
			const routeId = _REST.generateRouteData(request2.fullRoute, request2.method);
			const hash = this.hashes.get(`${request2.method}:${routeId.bucketRoute}`) ?? {
				value: `Global(${request2.method}:${routeId.bucketRoute})`,
				lastAccess: -1
			};
			const handler = this.handlers.get(`${hash.value}:${routeId.majorParameter}`) ?? this.createHandler(hash.value, routeId.majorParameter);
			const { url, fetchOptions } = await this.resolveRequest(request2);
			return handler.queueRequest(routeId, url, fetchOptions, {
				body: request2.body,
				files: request2.files,
				auth: request2.auth !== false,
				signal: request2.signal
			});
		}
		createHandler(hash, majorParameter) {
			const queue = majorParameter === "burst" ? new BurstHandler(this, hash, majorParameter) : new SequentialHandler(this, hash, majorParameter);
			this.handlers.set(queue.id, queue);
			return queue;
		}
		async resolveRequest(request2) {
			const { options } = this;
			let query = "";
			if (request2.query) {
				const resolvedQuery = request2.query.toString();
				if (resolvedQuery !== "") query = `?${resolvedQuery}`;
			}
			const headers = {
				...this.options.headers,
				"User-Agent": `${DefaultUserAgent} ${options.userAgentAppendix}`.trim()
			};
			if (request2.auth !== false) {
				if (!this.#token) throw new Error("Expected token to be set for this request, but none was present");
				headers.Authorization = `${request2.authPrefix ?? this.options.authPrefix} ${this.#token}`;
			}
			if (request2.reason?.length) headers["X-Audit-Log-Reason"] = encodeURIComponent(request2.reason);
			const url = `${options.api}${request2.versioned === false ? "" : `/v${options.version}`}${request2.fullRoute}${query}`;
			let finalBody;
			let additionalHeaders = {};
			if (request2.files?.length) {
				const formData = new FormData();
				for (const [index, file] of request2.files.entries()) {
					const fileKey = file.key ?? `files[${index}]`;
					if (isBufferLike(file.data)) {
						let contentType = file.contentType;
						if (!contentType) {
							const [parsedType] = (0, import_magic_bytes.filetypeinfo)(file.data);
							if (parsedType) contentType = OverwrittenMimeTypes[parsedType.mime] ?? parsedType.mime ?? "application/octet-stream";
						}
						formData.append(fileKey, new Blob([file.data], { type: contentType }), file.name);
					} else formData.append(fileKey, new Blob([`${file.data}`], { type: file.contentType }), file.name);
				}
				if (request2.body != null) if (request2.appendToFormData) for (const [key, value] of Object.entries(request2.body)) formData.append(key, value);
				else formData.append("payload_json", JSON.stringify(request2.body));
				finalBody = formData;
			} else if (request2.body != null) if (request2.passThroughBody) finalBody = request2.body;
			else {
				finalBody = JSON.stringify(request2.body);
				additionalHeaders = { "Content-Type": "application/json" };
			}
			const method = request2.method.toUpperCase();
			const fetchOptions = {
				body: ["GET", "HEAD"].includes(method) ? null : finalBody,
				headers: {
					...request2.headers,
					...additionalHeaders,
					...headers
				},
				method,
				dispatcher: request2.dispatcher ?? this.agent ?? void 0
			};
			return {
				url,
				fetchOptions
			};
		}
		clearHashSweeper() {
			clearInterval(this.hashTimer);
		}
		clearHandlerSweeper() {
			clearInterval(this.handlerTimer);
		}
		static generateRouteData(endpoint, method) {
			if (endpoint.startsWith("/interactions/") && endpoint.endsWith("/callback")) return {
				majorParameter: BurstHandlerMajorIdKey,
				bucketRoute: "/interactions/:id/:token/callback",
				original: endpoint
			};
			const majorIdMatch = /(?:^\/webhooks\/(\d{17,19}\/[^/?]+))|(?:^\/(?:channels|guilds|webhooks)\/(\d{17,19}))/.exec(endpoint);
			const majorId = majorIdMatch?.[2] ?? majorIdMatch?.[1] ?? "global";
			const baseRoute = endpoint.replaceAll(/\d{17,19}/g, ":id").replace(/\/reactions\/(.*)/, "/reactions/:reaction").replace(/\/webhooks\/:id\/[^/?]+/, "/webhooks/:id/:token");
			let exceptions = "";
			if (method === "DELETE" && baseRoute === "/channels/:id/messages/:id") {
				const id = /\d{17,19}$/.exec(endpoint)[0];
				const timestamp = import_snowflake.DiscordSnowflake.timestampFrom(id);
				if (Date.now() - timestamp > 1e3 * 60 * 60 * 24 * 14) exceptions += "/Delete Old Message";
			}
			return {
				majorParameter: majorId,
				bucketRoute: baseRoute + exceptions,
				original: endpoint
			};
		}
	};
	var version = "2.5.1";
	globalThis.FormData ??= import_undici2.FormData;
	globalThis.Blob ??= import_node_buffer.Blob;
	setDefaultStrategy((0, import_util2.shouldUseGlobalFetchAndWebSocket)() ? fetch : makeRequest);
}));
var require_Client = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __classPrivateFieldGet = exports && exports.__classPrivateFieldGet || function(receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
	var __classPrivateFieldSet = exports && exports.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
	};
	var __importDefault = exports && exports.__importDefault || function(mod$7) {
		return mod$7 && mod$7.__esModule ? mod$7 : { "default": mod$7 };
	};
	var _Client_user, _Client_application;
	Object.defineProperty(exports, "__esModule", { value: true });
	var v10_1 = require_v10();
	var async_event_emitter_1 = require_dist$5();
	var IPC_1 = require_IPC();
	var WebSocket_1 = require_WebSocket();
	var ClientUser_1 = require_ClientUser();
	var RPCError_1 = require_RPCError();
	var rest_1 = require_dist$1();
	var node_crypto_1 = __importDefault(__require("node:crypto"));
	var Transport_1 = require_Transport();
	var Client = class extends async_event_emitter_1.AsyncEventEmitter {
		get user() {
			return __classPrivateFieldGet(this, _Client_user, "f");
		}
		get application() {
			return __classPrivateFieldGet(this, _Client_application, "f");
		}
		get isConnected() {
			return this.transport.isConnected;
		}
		constructor(options) {
			super();
			Object.defineProperty(this, "clientId", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "clientSecret", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "pipeId", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "refreshToken", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "transport", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			_Client_user.set(this, void 0);
			_Client_application.set(this, void 0);
			Object.defineProperty(this, "rest", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "refreshTimeout", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "connectionPromise", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "nonceMap", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: /* @__PURE__ */ new Map()
			});
			this.clientId = options.clientId;
			this.clientSecret = options.clientSecret;
			this.pipeId = options.pipeId;
			this.rest = new rest_1.REST({ version: "10" }).setToken("this-is-a-dummy");
			this.transport = !options.transport?.type || options.transport.type === "ipc" ? new IPC_1.IPCTransport({
				client: this,
				pathList: options.transport?.pathList
			}) : new (options.transport.type === "websocket" ? WebSocket_1.WebSocketTransport : options.transport.type)({ client: this });
			this.transport.on("message", (message) => {
				if (message.cmd === "DISPATCH" && message.evt === "READY") {
					if (message.data.user) __classPrivateFieldSet(this, _Client_user, new ClientUser_1.ClientUser(this, message.data.user), "f");
					if (message.data.config && message.data.config.cdn_host) this.rest.options.cdn = message.data.config.cdn_host;
					this.emit("connected");
				} else {
					if (message.nonce && this.nonceMap.has(message.nonce)) {
						const nonceObj = this.nonceMap.get(message.nonce);
						if (message.evt === "ERROR") {
							nonceObj.error.code = message.data.code;
							nonceObj.error.message = message.data.message;
							nonceObj?.reject(nonceObj.error);
						} else nonceObj?.resolve(message);
						this.nonceMap.delete(message.nonce);
					}
					this.emit(message.evt, message.data);
				}
			});
		}
		async request(cmd, args, evt) {
			const error = new RPCError_1.RPCError(Transport_1.RPC_ERROR_CODE.UNKNOWN_ERROR);
			RPCError_1.RPCError.captureStackTrace(error, this.request);
			return new Promise((resolve, reject) => {
				const nonce = node_crypto_1.default.randomUUID();
				this.transport.send({
					cmd,
					args,
					evt,
					nonce
				});
				this.nonceMap.set(nonce, {
					resolve,
					reject,
					error
				});
			});
		}
		async authenticate(accessToken) {
			const { application, user } = (await this.request("AUTHENTICATE", { access_token: accessToken })).data;
			__classPrivateFieldSet(this, _Client_application, application, "f");
			__classPrivateFieldSet(this, _Client_user, new ClientUser_1.ClientUser(this, user), "f");
			this.emit("ready");
		}
		async refreshAccessToken() {
			this.emit("debug", "CLIENT | Refreshing access token!");
			const exchangeResponse = await this.rest.post(v10_1.Routes.oauth2TokenExchange(), {
				body: new URLSearchParams({
					client_id: this.clientId,
					client_secret: this.clientSecret ?? "",
					grant_type: "refresh_token",
					refresh_token: this.refreshToken ?? ""
				}),
				headers: { "content-type": "application/x-www-form-urlencoded" },
				passThroughBody: true
			});
			this.hanleAccessTokenResponse(exchangeResponse);
			this.emit("debug", "CLIENT | Access token refreshed!");
			return exchangeResponse.access_token;
		}
		hanleAccessTokenResponse(data) {
			if (!("access_token" in data) || !("refresh_token" in data) || !("expires_in" in data) || !("token_type" in data)) throw new TypeError(`Invalid access token response!\nData: ${JSON.stringify(data, null, 2)}`);
			this.rest.setToken(data.access_token);
			this.rest.options.authPrefix = data.token_type;
			this.refreshToken = data.refresh_token;
			this.refreshTimeout = setTimeout(() => void this.refreshAccessToken(), data.expires_in);
		}
		async authorize(options) {
			if (!this.clientSecret) throw new ReferenceError("Client secret is required for authorization!");
			let rpcToken;
			if (options.useRPCToken) rpcToken = (await this.rest.post("/oauth2/token/rpc", {
				body: new URLSearchParams({
					client_id: this.clientId,
					client_secret: this.clientSecret
				}),
				headers: { "content-type": "application/x-www-form-urlencoded" }
			})).rpc_token;
			const { code } = (await this.request("AUTHORIZE", {
				scopes: options.scopes,
				client_id: this.clientId,
				rpc_token: options.useRPCToken ? rpcToken : void 0,
				prompt: options.prompt ?? "consent"
			})).data;
			const exchangeResponse = await this.rest.post(v10_1.Routes.oauth2TokenExchange(), {
				body: new URLSearchParams({
					client_id: this.clientId,
					client_secret: this.clientSecret,
					grant_type: "authorization_code",
					code
				}),
				headers: { "content-type": "application/x-www-form-urlencoded" },
				passThroughBody: true
			});
			this.hanleAccessTokenResponse(exchangeResponse);
			return exchangeResponse.access_token;
		}
		async subscribe(event, args) {
			await this.request("SUBSCRIBE", args, event);
			return { unsubscribe: () => this.request("UNSUBSCRIBE", args, event) };
		}
		async connect() {
			if (this.connectionPromise) return this.connectionPromise;
			const error = new RPCError_1.RPCError(Transport_1.RPC_ERROR_CODE.UNKNOWN_ERROR);
			RPCError_1.RPCError.captureStackTrace(error, this.connect);
			this.connectionPromise = new Promise((resolve, reject) => {
				const timeout = setTimeout(() => {
					this.connectionPromise = void 0;
					error.code = Transport_1.CUSTOM_RPC_ERROR_CODE.CONNECTION_TIMEOUT;
					error.message = "Connection timed out";
					reject(error);
				}, 1e4);
				if (typeof timeout === "object" && "unref" in timeout) timeout.unref();
				this.once("connected", () => {
					this.connectionPromise = void 0;
					this.transport.once("close", (reason) => {
						this.nonceMap.forEach((promise) => {
							promise.error.code = typeof reason === "object" ? reason.code : Transport_1.CUSTOM_RPC_ERROR_CODE.CONNECTION_ENDED;
							promise.error.message = typeof reason === "object" ? reason.message : reason ?? "Connection ended";
							promise.reject(promise.error);
						});
						this.emit("disconnected");
					});
					clearTimeout(timeout);
					resolve();
				});
				this.transport.connect().catch(reject);
			});
			return this.connectionPromise;
		}
		async login(options) {
			await this.connect();
			if (!options || !options.scopes) {
				this.emit("ready");
				return;
			}
			if (options.accessToken) {
				await this.authenticate(options.accessToken);
				return;
			}
			let accessToken = "";
			if (options.refreshToken) {
				this.refreshToken = options.refreshToken;
				accessToken = await this.refreshAccessToken();
			} else {
				if (!this.clientSecret) throw new ReferenceError("Client secret is required for authorization!");
				accessToken = await this.authorize(options);
			}
			await this.authenticate(accessToken);
		}
		async destroy() {
			if (this.refreshTimeout) {
				clearTimeout(this.refreshTimeout);
				this.refreshTimeout = void 0;
				this.refreshToken = void 0;
			}
			await this.transport.close();
		}
		getCdn() {
			return this.rest.cdn;
		}
	};
	exports.Client = Client;
	_Client_user = /* @__PURE__ */ new WeakMap(), _Client_application = /* @__PURE__ */ new WeakMap();
}));
var require_CertifiedDevice = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Base_1 = require_Base();
	var DeviceType;
	(function(DeviceType$1) {
		DeviceType$1["AUDIO_INPUT"] = "audioinput";
		DeviceType$1["AUDIO_OUTPUT"] = "audiooutput";
		DeviceType$1["VIDEO_INPUT"] = "videoinput";
	})(DeviceType || (exports.DeviceType = DeviceType = {}));
	var CertifiedDevice = class extends Base_1.Base {
		constructor(client, props) {
			super(client);
			Object.defineProperty(this, "type", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "id", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "vendor", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "model", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "related", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "echo_cancellation", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "noise_suppression", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "automatic_gain_control", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.defineProperty(this, "hardware_mute", {
				enumerable: true,
				configurable: true,
				writable: true,
				value: void 0
			});
			Object.assign(this, props);
			this.type = props.type;
			this.id = props.id;
			this.vendor = props.vendor;
			this.model = props.model;
			this.related = props.related;
		}
	};
	exports.CertifiedDevice = CertifiedDevice;
}));
var import_dist = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
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
	var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", {
			enumerable: true,
			value: v
		});
	}) : function(o, v) {
		o["default"] = v;
	});
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	var __importStar = exports && exports.__importStar || (function() {
		var ownKeys = function(o) {
			ownKeys = Object.getOwnPropertyNames || function(o$1) {
				var ar = [];
				for (var k in o$1) if (Object.prototype.hasOwnProperty.call(o$1, k)) ar[ar.length] = k;
				return ar;
			};
			return ownKeys(o);
		};
		return function(mod$7) {
			if (mod$7 && mod$7.__esModule) return mod$7;
			var result = {};
			if (mod$7 != null) {
				for (var k = ownKeys(mod$7), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod$7, k[i]);
			}
			__setModuleDefault(result, mod$7);
			return result;
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.WebSocket = exports.IPC = void 0;
	__exportStar(require_Client(), exports);
	__exportStar(require_ClientUser(), exports);
	__exportStar(require_CertifiedDevice(), exports);
	__exportStar(require_Channel(), exports);
	__exportStar(require_Guild(), exports);
	__exportStar(require_User(), exports);
	__exportStar(require_VoiceSettings(), exports);
	__exportStar(require_Transport(), exports);
	__exportStar(require_Message(), exports);
	exports.IPC = __importStar(require_IPC());
	exports.WebSocket = __importStar(require_WebSocket());
})))());
var import_is = /* @__PURE__ */ __toESM(require_is());
const clientId = "1177081335727267940";
const discordAppName = "Arvoxify";
const PROGRESS_THROTTLE_MS = 15e3;
const HANGUL_FILLER = "ㅤ";
let TimerKey = /* @__PURE__ */ function(TimerKey$1) {
	TimerKey$1["ClearActivity"] = "clearActivity";
	TimerKey$1["UpdateTimeout"] = "updateTimeout";
	TimerKey$1["DiscordConnectRetry"] = "discordConnectRetry";
	return TimerKey$1;
}({});
var TimerManager = class {
	timers = /* @__PURE__ */ new Map();
	set(key, fn, delay$2) {
		this.clear(key);
		this.timers.set(key, setTimeout(fn, delay$2));
	}
	clear(key) {
		const timer = this.timers.get(key);
		if (timer) {
			clearTimeout(timer);
			this.timers.delete(key);
		}
	}
	clearAll() {
		for (const timer of this.timers.values()) clearTimeout(timer);
		this.timers.clear();
	}
};
const truncateString = (str, length) => {
	if (str.length > length) return `${str.substring(0, length - 3)}...`;
	return str;
};
const buildDiscordButtons = (config, songInfo) => {
	const buttons = [];
	if (config.playOnPearDesktop && songInfo.url) {
		const redirectUrl = `https://arvoxifyukle.vercel.app/?play=${encodeURIComponent(songInfo.url)}`;
		buttons.push({
			label: "Arvoxify ile dinle",
			url: redirectUrl
		});
	}
	if (!config.hideGitHubButton) buttons.push({
		label: "Discord sunucumuzu ziyaret et",
		url: "https://discord.gg/deep"
	});
	return buttons.length ? buttons : void 0;
};
const padHangulFields = (songInfo) => {
	[
		"title",
		"artist",
		"album"
	].forEach((key) => {
		const value = songInfo[key];
		if (typeof value === "string" && value.length > 0 && value.length < 2) songInfo[key] = value + HANGUL_FILLER.repeat(2 - value.length);
	});
};
const isSeek = (oldSeconds, newSeconds) => {
	return Math.abs(newSeconds - oldSeconds) > 2;
};
var DiscordService = class {
	rpc = new import_dist.Client({ clientId });
	ready = false;
	autoReconnect = true;
	lastSongInfo;
	lastProgressUpdate = 0;
	config;
	refreshCallbacks = [];
	timerManager = new TimerManager();
	mainWindow;
	constructor(mainWindow, config) {
		this.config = config;
		this.mainWindow = mainWindow;
		this.autoReconnect = config?.autoReconnect ?? true;
		this.rpc.on("connected", () => {
			if ((0, import_is.dev)()) console.log(LoggerPrefix, t("plugins.discord.backend.connected"));
			this.refreshCallbacks.forEach((cb) => cb());
		});
		this.rpc.on("ready", () => {
			this.ready = true;
			if (this.lastSongInfo && this.config) this.updateActivity(this.lastSongInfo);
		});
		this.rpc.on("disconnected", () => {
			this.resetInfo();
			if (this.autoReconnect) this.connectRecursive();
		});
	}
	buildActivityInfo(songInfo, config) {
		padHangulFields(songInfo);
		const activityInfo = {
			name: discordAppName,
			applicationId: clientId,
			type: ActivityType.Listening,
			statusDisplayType: config.statusDisplayType,
			details: truncateString(songInfo.alternativeTitle ?? songInfo.title, 128),
			detailsUrl: songInfo.url ?? void 0,
			state: truncateString(songInfo.tags?.at(0) ?? songInfo.artist, 128),
			stateUrl: songInfo.artistUrl,
			largeImageKey: songInfo.imageSrc ?? void 0,
			largeImageText: songInfo.album ? truncateString(songInfo.album, 128) : void 0,
			buttons: buildDiscordButtons(config, songInfo)
		};
		if (songInfo.isPaused) activityInfo.largeImageText = "⏸︎";
		else if (!config.hideDurationLeft && songInfo.songDuration > 0 && typeof songInfo.elapsedSeconds === "number") {
			const songStartTime = Date.now() - songInfo.elapsedSeconds * 1e3;
			activityInfo.startTimestamp = Math.floor(songStartTime / 1e3);
			activityInfo.endTimestamp = Math.floor((songStartTime + songInfo.songDuration * 1e3) / 1e3);
		}
		return activityInfo;
	}
	setActivityTimeout() {
		this.timerManager.clear(TimerKey.ClearActivity);
		if (this.lastSongInfo?.isPaused === true && this.config?.activityTimeoutEnabled && this.config?.activityTimeoutTime && this.config.activityTimeoutTime > 0) this.timerManager.set(TimerKey.ClearActivity, () => {
			this.clearActivity();
		}, this.config.activityTimeoutTime);
	}
	resetInfo() {
		this.ready = false;
		this.lastSongInfo = void 0;
		this.lastProgressUpdate = 0;
		this.timerManager.clearAll();
		if ((0, import_is.dev)()) console.log(LoggerPrefix, t("plugins.discord.backend.disconnected"));
	}
	connectWithRetry() {
		return new Promise((resolve, reject) => {
			this.timerManager.set(TimerKey.DiscordConnectRetry, () => {
				if (!this.autoReconnect || this.rpc.isConnected) {
					this.timerManager.clear(TimerKey.DiscordConnectRetry);
					if (this.rpc.isConnected) resolve();
					else reject(/* @__PURE__ */ new Error("Auto-reconnect disabled or already connected."));
					return;
				}
				this.rpc.login().then(() => {
					this.timerManager.clear(TimerKey.DiscordConnectRetry);
					resolve();
				}).catch(() => {
					this.connectRecursive();
				});
			}, 5e3);
		});
	}
	connectRecursive = () => {
		if (!this.autoReconnect || this.rpc.isConnected) {
			this.timerManager.clear(TimerKey.DiscordConnectRetry);
			return;
		}
		this.connectWithRetry();
	};
	connect(showErrorDialog = false) {
		if (this.rpc.isConnected) {
			if ((0, import_is.dev)()) console.log(LoggerPrefix, t("plugins.discord.backend.already-connected"));
			return;
		}
		if (!this.config) return;
		this.ready = false;
		this.timerManager.clear(TimerKey.DiscordConnectRetry);
		this.rpc.login().catch(() => {
			this.resetInfo();
			if (this.autoReconnect) this.connectRecursive();
			else if (showErrorDialog && this.mainWindow) {}
		});
	}
	disconnect() {
		this.autoReconnect = false;
		this.timerManager.clear(TimerKey.DiscordConnectRetry);
		this.timerManager.clear(TimerKey.ClearActivity);
		if (this.rpc.isConnected) try {
			this.rpc.destroy();
		} catch {}
		this.resetInfo();
	}
	updateActivity(songInfo) {
		if (!this.config) return;
		if (!songInfo.title && !songInfo.artist) {
			if (this.lastSongInfo?.videoId) {
				this.clearActivity();
				this.lastSongInfo = void 0;
			}
			return;
		}
		this.timerManager.clear(TimerKey.ClearActivity);
		if (!this.rpc || !this.ready) return;
		const now = Date.now();
		const elapsedSeconds = songInfo.elapsedSeconds ?? 0;
		const songChanged = songInfo.videoId !== this.lastSongInfo?.videoId;
		const pauseChanged = songInfo.isPaused !== this.lastSongInfo?.isPaused;
		const seeked = !songChanged && isSeek(this.lastSongInfo?.elapsedSeconds ?? 0, elapsedSeconds);
		if ((songChanged || pauseChanged || seeked) && this.lastSongInfo !== void 0) {
			this.timerManager.clear(TimerKey.UpdateTimeout);
			const activityInfo = this.buildActivityInfo(songInfo, this.config);
			this.rpc.user?.setActivity(activityInfo).catch((err) => console.error(LoggerPrefix, "Failed to set activity:", err));
			this.lastSongInfo.videoId = songInfo.videoId;
			this.lastSongInfo.isPaused = songInfo.isPaused ?? false;
			this.lastSongInfo.elapsedSeconds = elapsedSeconds;
			this.lastProgressUpdate = now;
			this.setActivityTimeout();
		} else if (now - this.lastProgressUpdate > 15e3) {
			this.timerManager.clear(TimerKey.UpdateTimeout);
			const activityInfo = this.buildActivityInfo(songInfo, this.config);
			this.rpc.user?.setActivity(activityInfo).catch((err) => console.error(LoggerPrefix, "Failed to set throttled activity:", err));
			this.lastProgressUpdate = now;
			this.setActivityTimeout();
		} else {
			const remainingThrottle = PROGRESS_THROTTLE_MS - (now - this.lastProgressUpdate);
			const songInfoSnapshot = { ...songInfo };
			this.timerManager.set(TimerKey.UpdateTimeout, () => {
				if (this.lastSongInfo?.videoId === songInfoSnapshot.videoId && this.lastSongInfo?.isPaused === songInfoSnapshot.isPaused && this.config) {
					const activityInfo = this.buildActivityInfo(songInfoSnapshot, this.config);
					this.rpc.user?.setActivity(activityInfo);
					this.lastProgressUpdate = Date.now();
					this.lastSongInfo.elapsedSeconds = songInfoSnapshot.elapsedSeconds ?? 0;
					this.setActivityTimeout();
				}
			}, remainingThrottle);
		}
		this.lastSongInfo = { ...songInfo };
	}
	clearActivity() {
		if (this.rpc.isConnected && this.ready) this.rpc.user?.clearActivity();
		this.lastProgressUpdate = 0;
		this.lastSongInfo = void 0;
		this.timerManager.clear(TimerKey.ClearActivity);
		this.timerManager.clear(TimerKey.UpdateTimeout);
	}
	onConfigChange(newConfig) {
		this.config = newConfig;
		this.autoReconnect = newConfig.autoReconnect ?? true;
		if (this.lastSongInfo && this.ready && this.rpc.isConnected) this.updateActivity(this.lastSongInfo);
		this.setActivityTimeout();
	}
	registerRefreshCallback(cb) {
		this.refreshCallbacks.push(cb);
	}
	isConnected() {
		return this.rpc.isConnected && this.ready;
	}
	cleanup() {
		this.disconnect();
		this.refreshCallbacks = [];
	}
};
let discordService = null;
const backend = createBackend({
	lastTimeUpdateSent: 0,
	async start(ctx) {
		const config = await ctx.getConfig();
		discordService = new DiscordService(ctx.window, config);
		if (config.enabled) ctx.window.once("ready-to-show", () => {
			discordService?.connect(!config.autoReconnect);
			registerCallback((songInfo, event) => {
				if (!discordService?.isConnected()) return;
				if (event !== SongInfoEvent.TimeChanged) {
					discordService?.updateActivity(songInfo);
					this.lastTimeUpdateSent = Date.now();
				} else {
					const now = Date.now();
					if (now - this.lastTimeUpdateSent > 5e3) {
						discordService?.updateActivity(songInfo);
						this.lastTimeUpdateSent = now;
					}
				}
			});
		});
		ctx.ipc.on("peard:player-api-loaded", () => {
			ctx.ipc.send("peard:setup-time-changed-listener");
		});
		app.on("before-quit", () => {
			discordService?.cleanup();
		});
	},
	stop() {
		discordService?.cleanup();
	},
	onConfigChange(newConfig) {
		discordService?.onConfigChange(newConfig);
		const currentlyConnected = discordService?.isConnected() ?? false;
		if (newConfig.enabled && !currentlyConnected) discordService?.connect(!newConfig.autoReconnect);
		else if (!newConfig.enabled && currentlyConnected) discordService?.disconnect();
	}
});
function singleton(fn) {
	let called = false;
	return ((...args) => {
		if (called) return;
		called = true;
		return fn(...args);
	});
}
var registerRefreshOnce = singleton((refreshMenu) => {
	discordService?.registerRefreshCallback(refreshMenu);
});
var DiscordStatusDisplayTypeLabels = {
	[StatusDisplayType.Name]: "plugins.discord.menu.set-status-display-type.submenu.arvoxify",
	[StatusDisplayType.State]: "plugins.discord.menu.set-status-display-type.submenu.artist",
	[StatusDisplayType.Details]: "plugins.discord.menu.set-status-display-type.submenu.title"
};
const onMenu = async ({ window, getConfig, setConfig, refresh }) => {
	const config = await getConfig();
	registerRefreshOnce(refresh);
	return [
		{
			label: discordService?.isConnected() ? t("plugins.discord.menu.connected") : t("plugins.discord.menu.disconnected"),
			enabled: !discordService?.isConnected(),
			click: () => discordService?.connect(true)
		},
		{
			label: t("plugins.discord.menu.auto-reconnect"),
			type: "checkbox",
			checked: config.autoReconnect,
			click(item) {
				setConfig({ autoReconnect: item.checked });
			}
		},
		{
			label: t("plugins.discord.menu.clear-activity"),
			click: () => discordService?.clearActivity()
		},
		{
			label: t("plugins.discord.menu.clear-activity-after-timeout"),
			type: "checkbox",
			checked: config.activityTimeoutEnabled,
			click(item) {
				setConfig({ activityTimeoutEnabled: item.checked });
			}
		},
		{
			label: t("plugins.discord.menu.play-on-arvoxify"),
			type: "checkbox",
			checked: config.playOnPearDesktop,
			click(item) {
				setConfig({ playOnPearDesktop: item.checked });
			}
		},
		{
			label: t("plugins.discord.menu.hide-github-button"),
			type: "checkbox",
			checked: config.hideGitHubButton,
			click(item) {
				setConfig({ hideGitHubButton: item.checked });
			}
		},
		{
			label: t("plugins.discord.menu.hide-duration-left"),
			type: "checkbox",
			checked: config.hideDurationLeft,
			click(item) {
				setConfig({ hideDurationLeft: item.checked });
			}
		},
		{
			label: t("plugins.discord.menu.set-inactivity-timeout"),
			click: () => setInactivityTimeout(window, config)
		},
		{
			label: t("plugins.discord.menu.set-status-display-type.label"),
			submenu: Object.values(StatusDisplayType).filter((v) => typeof StatusDisplayType[v] !== "number").map((statusDisplayType) => ({
				label: t(DiscordStatusDisplayTypeLabels[statusDisplayType]),
				type: "radio",
				checked: config.statusDisplayType === statusDisplayType,
				click() {
					setConfig({ statusDisplayType });
				}
			}))
		}
	];
};
async function setInactivityTimeout(win, options) {
	const output = await prompt({
		title: t("plugins.discord.prompt.set-inactivity-timeout.title"),
		label: t("plugins.discord.prompt.set-inactivity-timeout.label"),
		value: String(Math.round((options.activityTimeoutTime ?? 0) / 1e3)),
		type: "counter",
		counterOptions: {
			minimum: 0,
			multiFire: true
		},
		width: 450,
		...prompt_options_default()
	}, win);
	if (output) {
		options.activityTimeoutTime = Math.round(~~output * 1e3);
		setMenuOptions("discord", options);
	}
}
var discord_default = createPlugin({
	name: () => t("plugins.discord.name"),
	description: () => t("plugins.discord.description"),
	restartNeeded: false,
	config: {
		enabled: false,
		autoReconnect: true,
		activityTimeoutEnabled: true,
		activityTimeoutTime: 600 * 1e3,
		playOnPearDesktop: true,
		hideGitHubButton: false,
		hideDurationLeft: false,
		statusDisplayType: StatusDisplayType.Details
	},
	menu: onMenu,
	backend
});
const pluginStub = {
	name: () => t("plugins.discord.name"),
	description: () => t("plugins.discord.description"),
	restartNeeded: false,
	config: {
		enabled: false,
		autoReconnect: true,
		activityTimeoutEnabled: true,
		activityTimeoutTime: 600 * 1e3,
		playOnPearDesktop: true,
		hideGitHubButton: false,
		hideDurationLeft: false,
		statusDisplayType: StatusDisplayType.Details
	},
	menu: onMenu
};
export { discord_default as default, pluginStub };
