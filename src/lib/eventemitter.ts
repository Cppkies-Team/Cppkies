/**
 * A small implementation of node's EventEmitter with return value support
 */
type EventList<T> = { [P in keyof T]: ((src: T[P]) => T[P])[] }

function isVoid(val: unknown): val is void {
	return val === undefined
}

export class ReturnableEventEmitter<T extends { [key: string]: unknown }> {
	_events = {} as EventList<T>

	/**
	 * Registers an event listener which is called each time the event is emitted
	 * @param name Name of the hook
	 * @param func The event listener function
	 */
	on<N extends keyof T>(name: N, func: (src: T[N]) => T[N]): void {
		if (!this._events[name]) {
			this._events[name] = [func]
		} else this._events[name].push(func)
	}
	/**
	 * Registers an event listener which is called for the first time the event is emitted
	 * @param name Name of the hook
	 * @param func The event listener function
	 */
	once<N extends keyof T>(name: N, func: (src: T[N]) => T[N]): void {
		this.on(name, arg => {
			this.off(name, func)
			return func(arg)
		})
	}
	/**
	 * Removes an event listener which was registered before
	 * @param name Name of the hook
	 * @param func The event listener function
	 */
	off<N extends keyof T>(name: N, func: (src: T[N]) => T[N]): void {
		this._events[name].splice(this._events[name].indexOf(func), 1)
	}

	// Sorry for the type mess, I blame typescript
	/**
	 * Emits the event, triggering all registered event listeners under the event name
	 * @param name The name of the event
	 * @param startingValue The starting value for the listeners
	 */
	emit<N extends keyof T>(
		name: N,
		...startingValue: T[N] extends void ? [undefined?] : [T[N]]
	): T[N] {
		let retVal = startingValue[0]
		for (const func of this._events[name]) retVal = func(retVal as T[N])
		return retVal
	}
}
