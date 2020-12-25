import { ReturnableEventEmitter } from "../src/lib/eventemitter"

it("should be able to emit events", () => {
	const ee = new ReturnableEventEmitter<{
		eventName: [void, void]
	}>()
	let isTriggered = false
	ee.on("eventName", () => (isTriggered = true))
	ee.emit("eventName")
	expect(isTriggered).toBe(true)
})

it("should be able to get emit return value", () => {
	const ee = new ReturnableEventEmitter<{
		eventName: [number, number]
	}>()
	ee.on("eventName", src => src * 2)
	expect(ee.emit("eventName", 50)).toBe(100)
})

it("should be able to correctly handle `once` registers", () => {
	const ee = new ReturnableEventEmitter<{
		eventName: [void, void]
	}>()
	let triggeredAmount = 0
	ee.once("eventName", () => triggeredAmount++)
	ee.emit("eventName")
	ee.emit("eventName")
	expect(triggeredAmount).toBe(1)
})

it("should be able to correctly handle unregisters", () => {
	const ee = new ReturnableEventEmitter<{
		eventName: [void, void]
	}>()
	let isTriggered = false
	const listener = (): boolean => (isTriggered = true)
	ee.on("eventName", listener)
	ee.off("eventName", listener)
	ee.emit("eventName")
	expect(isTriggered).toBe(false)
})
