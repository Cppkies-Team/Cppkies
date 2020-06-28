import Game, {
	l as lType,
	AddEvent as AddEventType,
	PlaySound as PlaySoundType,
} from "./gameType"
import master from "./vars"

declare global {
	interface Window {
		Game: Game
		Beautify: Function
		Cppkies: typeof master | null
		l: lType
		AddEvent: AddEventType
		PlaySound: PlaySoundType
		CPPKIES_ONLOAD?: Function[]
	}
}
