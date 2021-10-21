export class Injection {
	constructor(public hookName: string, public func?: () => void) {}
	runHook(...bonusArgs: unknown[]): void {
		if (shouldRunVersioned(this.hookName)) {
			this.func?.()
			window.__INTERNAL_CPPKIES_HOOKS__.injectedHooks.add(this.hookName)
		}
	}
}

export function shouldRunVersioned(hookName: string): boolean {
	return !window.__INTERNAL_CPPKIES_HOOKS__?.injectedHooks.has(hookName)
}

export class BuildingInjection extends Injection {
	constructor(public hookName: string, public func?: () => void) {
		super(hookName, func)
	}
	runHook(building: Game.Object): void {
		if (!window.__INTERNAL_CPPKIES_HOOKS__.injectedBuildingHooks[building.name])
			window.__INTERNAL_CPPKIES_HOOKS__.injectedBuildingHooks[
				building.name
			] = new Set()
		if (shouldRunVersionedBuilding(building.name, this.hookName)) {
			this.func?.()
			window.__INTERNAL_CPPKIES_HOOKS__.injectedBuildingHooks[
				building.name
			].add(this.hookName)
		}
	}
}

export function shouldRunVersionedBuilding(
	buildingName: string,
	hookName: string
): boolean {
	return !window.__INTERNAL_CPPKIES_HOOKS__?.injectedBuildingHooks[
		buildingName
	]?.has(hookName)
}
