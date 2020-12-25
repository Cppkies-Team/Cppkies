type EventListenerFunction<
	T extends Record<string, [unknown, unknown]>,
	N extends keyof T
> = (src: T[N][0]) => T[N][1]

type EventList<T extends Record<string, [unknown, unknown]>> = {
	[P in keyof T]: EventListenerFunction<T, P>[]
}

/**
 * A small implementation of node's EventEmitter with return value support
 */

export class ReturnableEventEmitter<
	T extends Record<string, [unknown, unknown]>
> {
	_events = {} as EventList<T>

	/**
	 * Registers an event listener which is called each time the event is emitted
	 * @param name Name of the hook
	 * @param func The event listener function
	 */
	on<N extends keyof T>(name: N, func: EventListenerFunction<T, N>): void {
		if (!this._events[name]) {
			this._events[name] = [func]
		} else this._events[name].push(func)
	}
	/**
	 * Registers an event listener which is called for the first time the event is emitted
	 * @param name Name of the hook
	 * @param func The event listener function
	 */
	once<N extends keyof T>(name: N, func: EventListenerFunction<T, N>): void {
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
	off<N extends keyof T>(name: N, func: EventListenerFunction<T, N>): void {
		this._events[name].splice(this._events[name].indexOf(func), 1)
	}

	// Sorry for the minor type mess, I blame typescript
	/**
	 * Emits the event, triggering all registered event listeners under the event name and modifying the given value
	 * @param name The name of the event
	 * @param startingValue The starting value for the listeners
	 */
	emit<N extends keyof T>(
		name: N,
		...startingValue: T[N][0] extends void ? [undefined?] : [T[N][0]]
	): T[N][1] {
		let retVal: T[N][0] | T[N][1] = startingValue[0]
		if (!this._events[name]) this._events[name] = []
		for (const func of this._events[name]) retVal = func(retVal)
		return retVal
	}
	/**
	 * Emits the event, triggering all registered event listeners under the event name and *not* modifying the given value
	 * @param name The name of the event
	 * @param startingValue The starting value for the listeners
	 */
	constEmit<N extends keyof T>(
		name: N,
		...startingValue: T[N][0] extends void ? [undefined?] : [T[N][0]]
	): void {
		if (!this._events[name]) this._events[name] = []
		for (const func of this._events[name]) func(startingValue[0])
	}
}
