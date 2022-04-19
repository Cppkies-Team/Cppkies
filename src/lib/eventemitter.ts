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
	_events: Partial<EventList<T>> = {}
	forwardTo?: this
	/**
	 * Registers an event listener which is called each time the event is emitted
	 * @param name Name of the hook
	 * @param func The event listener function
	 */
	on<N extends keyof T>(name: N, func: EventListenerFunction<T, N>): void {
		if (this.forwardTo) return this.forwardTo.on(name, func)
		let arr = this._events[name]
		if (!arr) this._events[name] = arr = []
		arr.push(func)
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
		if (this.forwardTo) return this.forwardTo.off(name, func)
		if (this._events[name]) return
		let arr = this._events[name]
		if (!arr) this._events[name] = arr = []
		const index = arr.indexOf(func)
		arr.splice(index, 1)
	}
	// Sorry for the minor type mess, I blame typescript
	/**
	 * Emits the event, triggering all registered event listeners under the event name and modifying the given value
	 * @param name The name of the event
	 * @param startingValue The starting value for the listeners
	 * @param converter Converts the output value to the input value
	 */
	convertableEmit<N extends keyof T>(
		name: N,
		converter: (ret: T[N][1]) => T[N][0],
		startingValue: T[N][1]
	): T[N][1] {
		if (this.forwardTo)
			return this.forwardTo.convertableEmit(name, converter, startingValue)
		let arr = this._events[name]
		if (!arr) this._events[name] = arr = []
		let retVal: T[N][1] = startingValue
		for (const func of arr as EventListenerFunction<T, N>[]) {
			retVal = func(converter(retVal))
		}
		return retVal
	}
	/**
	 * Emits the event, triggering all registered event listeners under the event name and modifying the given value
	 * @param name The name of the event
	 * @param startingValue The starting value for the listeners
	 */
	emit<N extends keyof T>(
		name: N,
		...startingValue: T[N][0] extends void ? [undefined?] : [T[N][0]]
	): T[N][1] {
		return this.convertableEmit(name, ret => ret, startingValue[0])
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
		this.convertableEmit(name, () => startingValue[0], startingValue[0])
	}
	setForwardTarget(target: this): void {
		for (const key in this._events) {
			const thisArr = this._events[key]
			if (!thisArr) continue
			const newArr = target._events[key]
			//@ts-expect-error `thisArr` will always exist
			if (newArr) newArr.push(...thisArr)
			else target._events[key] = Array.from(thisArr)
		}
		this.forwardTo = target
	}
}
