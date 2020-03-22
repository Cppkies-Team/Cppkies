/**
 * The localStotrage wrapper class
 */
export default class LocalStorageWrapper {
	store: Record<string | number, unknown>
	constructor(private name: string) {
		this.updateValues(name)
		this.store = new Proxy(this.store, {
			set: (target, key: string | number, value): boolean => {
				const retVal = Reflect.set(target, key, value)
				this.writeValues()
				return retVal
			},
			deleteProperty: (target, key): boolean => {
				const retVal = Reflect.deleteProperty(target, key)
				this.writeValues()
				return retVal
			},
		})
	}
	updateValues(name: string): void {
		this.store = JSON.parse(localStorage.getItem(name))
	}
	writeValues(): void {
		localStorage.setItem(this.name, JSON.stringify(this.store))
	}
}
