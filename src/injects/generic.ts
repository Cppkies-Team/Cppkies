export class Injection {
	constructor(public hookName: string, public func?: () => void) {}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	runHook(..._bonusArgs: unknown[]): void {
		if (shouldRunVersioned(this.hookName)) {
			this.func?.()
		}
	}
}

export function shouldRunVersioned(hookName: string): boolean {
	if (!__INTERNAL_CPPKIES__?.injectedHooks.has(hookName)) {
		__INTERNAL_CPPKIES__.injectedHooks.add(hookName)
		return true
	}
	return false
}

export class BuildingInjection extends Injection {
	constructor(public hookName: string, public func?: () => void) {
		super(hookName, func)
	}
	runHook(building: Game.Object): void {
		if (!__INTERNAL_CPPKIES__.injectedBuildingHooks[building.name])
			__INTERNAL_CPPKIES__.injectedBuildingHooks[building.name] = new Set()
		if (shouldRunVersionedBuilding(building.name, this.hookName)) {
			this.func?.()
		}
	}
}

export function shouldRunVersionedBuilding(
	buildingName: string,
	hookName: string
): boolean {
	if (
		!__INTERNAL_CPPKIES__?.injectedBuildingHooks[buildingName]?.has(hookName)
	) {
		__INTERNAL_CPPKIES__.injectedBuildingHooks[buildingName].add(hookName)
		return true
	}
	return false
}
