import Game, {
	l as lType,
	AddEvent as AddEventType,
	PlaySound as PlaySoundType,
	Cppkies,
} from "./gameType"

declare global {
	interface Window {
		Game: Game
		Beautify: Function
		Cppkies: Cppkies
		l: lType
		AddEvent: AddEventType
		PlaySound: PlaySoundType
	}
}
