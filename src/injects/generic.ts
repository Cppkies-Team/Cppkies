export const HOOKS_VERSION = 1 as const

export class Injection {
	constructor(
		public value: string,
		public hookVersion: number,
		public func?: () => void
	) {}
	runHook(): void {
		if (shouldRunVersioned(this.hookVersion)) this.func?.()
	}
}

export function shouldRunVersioned(hookVersion: number): boolean {
	return (
		!window.__INTERNAL_CPPKIES_HOOKS__ ||
		hookVersion > window.__INTERNAL_CPPKIES_HOOKS__.hooksVersion
	)
}

let currentMinigame: Game.Minigame | undefined

export function setMinigameInjection(mg?: Game.Minigame): void {
	currentMinigame = mg
}

export class MinigameInjection extends Injection {
	runHook(): void {
		if (
			currentMinigame &&
			shouldRunVersionedMinigame(currentMinigame, this.hookVersion)
		)
			this.func?.()
	}
}

export function shouldRunVersionedMinigame(
	mg: Game.Minigame,
	hookVersion: number
): boolean {
	return (
		!window.__INTERNAL_CPPKIES_HOOKS__.injectedMinigames.has(mg.name) ||
		hookVersion > window.__INTERNAL_CPPKIES_HOOKS__.hooksVersion
	)
}
