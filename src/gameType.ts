/*eslint @typescript-eslint/no-explicit-any:0*/

import { injectCode } from "./helpers"
import { Building } from "./buildings"
import {
	Upgrade,
	HeavenlyUpgrade,
	TieredUpgrade,
	GrandmaSynergy,
} from "./upgrade"
import { SaveType } from "./saves"
import Tier from "./tiers"
import { Hooks } from "./injects/basegame"
/**
 * The Game object, generated automatically
 */
export default interface Game {
	Launch: Function
	version: number
	beta: number
	https: boolean
	mobile: number
	touchEvents: number
	baseSeason: string
	updateLog: string
	ready: number
	Load: Function
	ErrorFrame: Function
	timedout: boolean
	Timeout: Function
	Resume: Function
	Init: Function
	Logic: Function
	Draw: Function
	Loop: Function
	Loader: {
		loadingN: number
		assetsN: number
		assets: Array<any>
		assetsLoading: Array<any>
		assetsLoaded: Array<any>
		domain: string
		loaded: Function
		doneLoading: number
		blank: object
		Load: Function
		Replace: Function
		onLoadReplace: Function
		onLoad: Function
		getProgress: Function
	}
	T: number
	drawT: number
	loopT: number
	fps: number
	season: string
	l: object
	bounds: object
	clickStr: string
	SaveTo: string
	lastActivity: number
	time: number
	accumulatedDelay: number
	delayTimeouts: number
	catchupLogic: number
	fpsStartTime: number
	frameNumber: number
	currentFps: number
	previousFps: number
	getFps: Function
	cookiesEarned: number
	cookies: number
	cookiesd: number
	cookiesPs: number
	cookiesReset: number
	cookieClicks: number
	goldenClicks: number
	goldenClicksLocal: number
	missedGoldenClicks: number
	handmadeCookies: number
	milkProgress: number
	milkH: number
	milkHd: number
	milkType: number
	bgType: number
	chimeType: number
	prestige: number
	heavenlyChips: number
	heavenlyChipsDisplayed: number
	heavenlyChipsSpent: number
	heavenlyCookies: number
	permanentUpgrades: Array<any>
	ascensionMode: number
	resets: number
	lumps: number
	lumpsTotal: number
	lumpT: number
	lumpRefill: number
	makeSeed: Function
	seed: string
	volume: number
	elderWrath: number
	elderWrathOld: number
	elderWrathD: number
	pledges: number
	pledgeT: number
	researchT: number
	nextResearch: number
	cookiesSucked: number
	cpsSucked: number
	wrinklersPopped: number
	santaLevel: number
	reindeerClicked: number
	seasonT: number
	seasonUses: number
	dragonLevel: number
	dragonAura: number
	dragonAura2: number
	fortuneGC: number
	fortuneCPS: number
	blendModesOn: boolean
	bg: string
	bgFade: string
	bgR: number
	bgRd: number
	windowW: number
	windowH: number
	startDate: number
	fullDate: number
	lastDate: number
	prefs: Array<any>
	DefaultPrefs: Function
	Mobile: Function
	showBackupWarning: Function
	customChecks: Array<any>
	customInit: Array<any>
	customLogic: Array<any>
	customDraw: Array<any>
	customSave: Array<any>
	customLoad: Array<any>
	customReset: Array<any>
	customTickers: Array<any>
	customCps: Array<any>
	customCpsMult: Array<any>
	customMouseCps: Array<any>
	customMouseCpsMult: Array<any>
	customCookieClicks: Array<any>
	customCreate: Array<any>
	LoadMod: Function
	RandomBakeryName: Function
	GetBakeryName: Function
	bakeryName: string
	bakeryNameL: object
	bakeryNameSet: Function
	bakeryNameRefresh: Function
	bakeryNamePrompt: Function
	bakeryNamePromptRandom: Function
	tooltip: {
		text: Function
		x: number
		y: number
		origin: string
		on: number
		tt: object
		tta: object
		shouldHide: number
		dynamic: number
		from: object
		draw: Function
		update: Function
		hide: Function
		wobble: Function
	}
	getTooltip: Function
	getDynamicTooltip: Function
	attachTooltip: Function
	CheckUpdates: Function
	CheckUpdatesResponse: Function
	externalDataLoaded: boolean
	grandmaNames: Array<any>
	customGrandmaNames: Array<any>
	heralds: number
	GrabData: Function
	GrabDataResponse: Function
	useLocalStorage: number
	localStorageGet: Function
	localStorageSet: Function
	ExportSave: Function
	ImportSave: Function
	ImportSaveCode: Function
	FileSave: Function
	FileLoad: Function
	toSave: boolean
	WriteSave: Function
	salvageSave: Function
	LoadSave: Function
	Reset: Function
	HardReset: Function
	onCrate: number
	setOnCrate: Function
	crate: Function
	crateTooltip: Function
	costDetails: Function
	HCfactor: number
	HowMuchPrestige: Function
	HowManyCookiesReset: Function
	gainedPrestige: number
	EarnHeavenlyChips: Function
	GetHeavenlyMultiplier: Function
	ascensionModes: object
	ascendMeterPercent: number
	ascendMeterPercentT: number
	ascendMeterLevel: number
	nextAscensionMode: number
	UpdateAscensionModePrompt: Function
	PickAscensionMode: Function
	UpdateLegacyPrompt: Function
	ascendl: object
	ascendContentl: object
	ascendZoomablel: object
	ascendUpgradesl: object
	OnAscend: number
	AscendTimer: number
	AscendDuration: number
	AscendBreakpoint: number
	UpdateAscendIntro: Function
	ReincarnateTimer: number
	ReincarnateDuration: number
	UpdateReincarnateIntro: Function
	Reincarnate: Function
	GiveUpAscend: Function
	Ascend: Function
	DebuggingPrestige: number
	AscendDragX: number
	AscendDragY: number
	AscendOffX: number
	AscendOffY: number
	AscendZoom: number
	AscendOffXT: number
	AscendOffYT: number
	AscendZoomT: number
	AscendDragging: number
	AscendGridSnap: number
	heavenlyBounds: object
	UpdateAscend: Function
	AscendRefocus: Function
	SelectedHeavenlyUpgrade: number
	PurchaseHeavenlyUpgrade: Function
	BuildAscendTree: Function
	lumpMatureAge: number
	lumpRipeAge: number
	lumpOverripeAge: number
	lumpCurrentType: number
	lumpTooltip: Function
	computeLumpTimes: Function
	loadLumps: Function
	gainLumps: Function
	clickLump: Function
	harvestLumps: Function
	computeLumpType: Function
	canLumps: Function
	getLumpRefillMax: Function
	getLumpRefillRemaining: Function
	canRefillLump: Function
	refillLump: Function
	spendLump: Function
	doLumps: Function
	Earn: Function
	Spend: Function
	Dissolve: Function
	mouseCps: Function
	computedMouseCps: number
	globalCpsMult: number
	unbuffedCps: number
	lastClick: number
	CanClick: number
	autoclickerDetected: number
	BigCookieState: number
	BigCookieSize: number
	BigCookieSizeD: number
	BigCookieSizeT: number
	cookieClickSound: number
	playCookieClickSound: Function
	ClickCookie: Function
	mouseX: number
	mouseY: number
	mouseX2: number
	mouseY2: number
	mouseMoved: number
	GetMouseCoords: Function
	Click: number
	lastClickedEl: object
	clickFrom: number
	Scroll: number
	mouseDown: number
	handleScroll: Function
	keys: Array<any>
	heavenlyPower: number
	recalculateGains: number
	cookiesPsByType: object
	cookiesMultByType: object
	effs: object
	eff: Function
	CalculateGains: Function
	dropRateMult: Function
	shimmersL: object
	shimmers: Array<any>
	shimmersN: number
	shimmer: Function
	updateShimmers: Function
	killShimmers: Function
	shimmerTypes: object
	goldenCookieChoices: Array<any>
	goldenCookieBuildingBuffs: object
	particles: Array<any>
	particlesUpdate: Function
	particleAdd: Function
	particlesDraw: Function
	textParticles: Array<any>
	textParticlesY: number
	textParticlesUpdate: Function
	textParticlesAdd: Function
	popups: number
	Popup: Function
	sparkles: object
	sparklesT: number
	sparklesFrames: number
	SparkleAt: Function
	SparkleOn: Function
	Notes: Array<any>
	NotesById: Array<any>
	noteId: number
	noteL: object
	Note: Function
	CloseNote: Function
	CloseNotes: Function
	UpdateNotes: Function
	NotesLogic: Function
	NotesDraw: Function
	Notify: Function
	darkenL: object
	promptL: object
	promptAnchorL: object
	promptWrapL: object
	promptConfirm: string
	promptOn: number
	promptUpdateFunc: number
	UpdatePrompt: Function
	Prompt: Function
	ClosePrompt: Function
	ConfirmPrompt: Function
	cssClasses: Array<any>
	addClass: Function
	removeClass: Function
	updateClasses: Function
	WriteButton: Function
	Toggle: Function
	ToggleFancy: Function
	ToggleFilters: Function
	ToggleExtraButtons: Function
	WriteSlider: Function
	onPanel: string
	ShowPanel: Function
	onMenu: string
	ShowMenu: Function
	sayTime: Function
	tinyCookie: Function
	ClickTinyCookie: Function
	setVolume: Function
	UpdateMenu: Function
	ascendMeter: object
	ascendNumber: object
	lastPanel: string
	Ticker: string
	TickerAge: number
	TickerEffect: number
	TickerN: number
	TickerClicks: number
	UpdateTicker: Function
	getNewTicker: Function
	tickerL: object
	tickerBelowL: object
	tickerCompactL: object
	TickerDraw: Function
	Log: Array<any>
	AddToLog: Function
	vanilla: number
	last: object
	storeToRefresh: number
	priceIncrease: number
	buyBulk: number
	buyMode: number
	buyBulkOld: number
	buyBulkShortcut: number
	Objects: Record<string, any>
	ObjectsById: Array<any>
	ObjectsN: number
	BuildingsOwned: number
	Object: any
	DrawBuildings: Function
	sortSprites: Function
	sortSpritesById: Function
	modifyBuildingPrice: Function
	storeBulkButton: Function
	BuildStore: Function
	RefreshStore: Function
	ComputeCps: Function
	isMinigameReady: Function
	scriptBindings: Array<any>
	LoadMinigames: Function
	scriptLoaded: Function
	magicCpS: Function
	SpecialGrandmaUnlock: number
	foolObjects: FoolBuilding[]
	ClickProduct: Function
	mutedBuildingTooltip: Function
	upgradesToRebuild: number
	Upgrades: Array<any>
	UpgradesById: Array<any>
	UpgradesN: number
	UpgradesInStore: Array<any>
	UpgradesOwned: number
	Upgrade: any
	storeBuyAll: Function
	vault: Array<any>
	CountsAsUpgradeOwned: Function
	RequiresConfirmation: Function
	Unlock: Function
	Lock: Function
	Has: Function
	HasUnlocked: Function
	RebuildUpgrades: Function
	UnlockAt: Array<any>
	NewUpgradeCookie: Function
	Tiers: object
	GetIcon: Function
	SetTier: Function
	MakeTiered: Function
	TieredUpgrade: Function
	SynergyUpgrade: Function
	GetTieredCpsMult: Function
	UnlockTiered: Function
	GrandmaSynergies: Array<any>
	GrandmaSynergy: Function
	baseResearchTime: number
	SetResearch: Function
	getPledgeDuration: Function
	halloweenDrops: Array<any>
	GetHowManyHalloweenDrops: Function
	heartDrops: Array<any>
	GetHowManyHeartDrops: Function
	seasonTriggerBasePrice: number
	easterEggs: Array<any>
	eggDrops: Array<any>
	rareEggDrops: Array<any>
	GetHowManyEggs: Function
	DropEgg: Function
	PermanentSlotIcon: Function
	AssignPermanentSlot: Function
	SelectingPermanentUpgrade: number
	PutUpgradeInPermanentSlot: Function
	MilksByChoice: object
	BGsByChoice: object
	loseShimmeringVeil: Function
	seasons: object
	listTinyOwnedUpgrades: Function
	santaDrops: Array<any>
	GetHowManySantaDrops: Function
	reindeerDrops: Array<any>
	GetHowManyReindeerDrops: Function
	seasonDrops: Array<any>
	saySeasonSwitchUses: Function
	computeSeasonPrices: Function
	computeSeasons: Function
	getSeasonDuration: Function
	UpgradesByPool: Array<any>
	PrestigeUpgrades: Array<any>
	goldenCookieUpgrades: Array<any>
	cookieUpgrades: Array<any>
	UpgradePositions: object
	Achievements: Array<any>
	AchievementsById: Array<any>
	AchievementsN: number
	AchievementsOwned: number
	Achievement: Function
	Win: Function
	RemoveAchiev: Function
	CountsAsAchievementOwned: Function
	HasAchiev: Function
	TieredAchievement: Function
	ProductionAchievement: Function
	thresholdIcons: Array<any>
	BankAchievements: Array<any>
	BankAchievement: Function
	CpsAchievements: Array<any>
	CpsAchievement: Function
	buffs: Array<any>
	buffsN: number
	buffsL: object
	gainBuff: Function
	hasBuff: Function
	updateBuffs: Function
	killBuff: Function
	killBuffs: Function
	buffTypes: Array<any>
	buffTypesByName: Array<any>
	buffTypesN: number
	buffType: Function
	UpdateGrandmapocalypse: Function
	wrinklerHP: number
	wrinklers: Array<any>
	getWrinklersMax: Function
	ResetWrinklers: Function
	CollectWrinklers: Function
	wrinklerSquishSound: number
	playWrinklerSquishSound: Function
	SpawnWrinkler: Function
	PopRandomWrinkler: Function
	UpdateWrinklers: Function
	DrawWrinklers: Function
	SaveWrinklers: Function
	LoadWrinklers: Function
	specialTab: string
	specialTabHovered: string
	specialTabs: Array<any>
	UpdateSpecial: Function
	santaLevels: Array<any>
	UpgradeSanta: Function
	dragonLevels: Array<any>
	dragonAuras: object
	hasAura: Function
	auraMult: Function
	SelectDragonAura: Function
	SelectingDragonAura: number
	SetDragonAura: Function
	DescribeDragonAura: Function
	UpgradeDragon: Function
	ToggleSpecialMenu: Function
	DrawSpecial: Function
	Milks: Array<any>
	Milk: object
	mousePointer: number
	cookieOriginX: number
	cookieOriginY: number
	DrawBackground: Function
	RuinTheFun: Function
	SetAllUpgrades: Function
	SetAllAchievs: Function
	GetAllDebugs: Function
	MaxSpecials: Function
	SesameReset: Function
	debugTimersOn: number
	sesame: number
	OpenSesame: Function
	EditAscend: Function
	debuggedUpgradeCpS: Array<any>
	debuggedUpgradeCpClick: Array<any>
	debugColors: Array<any>
	DebugUpgradeCpS: Function
	Background: object
	LeftBackground: object
	defaultBg: string
	choiceSelectorOn: number
}
/**
 * The icon type used in Cookie Clicker
 */
export type Icon = [number, number, string?]

/**
 * The Cppkies object interface
 */
export interface Cppkies {
	injectCode: typeof injectCode
	hooks: Hooks
	buildingHooks: Record<string, Record<string, Function[]>>
	buildingHooksById: Record<string, Function[]>[]
	iconLink: string
	buildingLink: string
	Building: typeof Building
	Upgrade: typeof Upgrade
	TieredUpgrade: typeof TieredUpgrade
	Tier: typeof Tier
	HeavenlyUpgrade: typeof HeavenlyUpgrade
	GrandmaSynergy: typeof GrandmaSynergy
	save: SaveType
	onLoad: Function[]
	DEFAULT_ONBUY: () => void
	DEFAULT_CPS: (me: Building) => number
	customBuildings: Building[]
	customUpgrades: Upgrade[]
	customTiers: Tier[]
	icons: {
		relinkColumn: (link: string, matrix: string[] | string[][]) => Promise<void>
		relinkRow: (link: string, matrix: string[] | string[][]) => Promise<void>
	}
}
export interface FoolBuilding {
	name: string
	desc: string
	icon: [number, number]
}
export type AddEvent = (
	htmlElement: HTMLElement,
	eventName: string,
	eventFunction: (e: Event | any) => void
) => void
export type l = (name: string) => HTMLElement
export type PlaySound = (url: string, volume?: number, pitch?: number) => void
