/**
 * The localStotrage wrapper class
 */
export default class LocalStorageWrapper {
	store: Record<string | number, unknown>
	/**
	 * The wrapper class for localStorage
	 * @param name The name of the key
	 */
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
	/**
	 * Reads the values from the name
	 * @param name The key to read from
	 */
	updateValues(name: string): void {
		this.store = JSON.parse(localStorage.getItem(name))
	}
	/**
	 * Writes store to localstorage
	 */
	writeValues(): void {
		localStorage.setItem(this.name, JSON.stringify(this.store))
	}
}
