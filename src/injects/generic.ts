export const HOOKS_VERSION = 1 as const

export class Injection {
	constructor(
		public value: string,
		public hookVersion: number,
		public func?: () => void
	) {}
	runHook(): void {
		if (
			!window.__INTERNAL_CPPKIES_HOOKS__ ||
			this.hookVersion > window.__INTERNAL_CPPKIES_HOOKS__.hooksVersion
		)
			this.func?.()
	}
}
