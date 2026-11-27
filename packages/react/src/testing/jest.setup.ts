import '@testing-library/jest-dom'

/** jsdom has no layout APIs; Radix primitives call them on open, so give them inert stand-ins. */
class InertResizeObserver {
  observe (): void {}
  unobserve (): void {}
  disconnect (): void {}
}

globalThis.ResizeObserver ??= InertResizeObserver
for (const name of ['scrollIntoView', 'hasPointerCapture', 'releasePointerCapture'] as const) {
  Object.defineProperty(Element.prototype, name, { value: () => false, configurable: true, writable: true })
}
globalThis.matchMedia ??= (query: string) => ({
  matches:             false,
  media:               query,
  onchange:            null,
  addListener:         () => {},
  removeListener:      () => {},
  addEventListener:    () => {},
  removeEventListener: () => {},
  dispatchEvent:       () => false,
})
