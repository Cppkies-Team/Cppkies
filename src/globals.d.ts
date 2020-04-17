import Game, {
	Cppkies as CppkiesType,
	l as lType,
	AddEvent as AddEventType,
	PlaySound as PlaySoundType,
} from "./gameType"

declare global {
	interface Window {
		Game: Game
		Beautify: Function
		Cppkies: CppkiesType
		l: lType
		AddEvent: AddEventType
		PlaySound: PlaySoundType
	}
}
