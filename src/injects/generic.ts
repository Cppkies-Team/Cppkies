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
