import '@testing-library/jest-dom'

/** jsdom has no layout APIs; Radix primitives call them on open, so give them inert stand-ins. */
class InertResizeObserver {
  observe (): void {}
  unobserve (): void {}
  disconnect (): void {}
}

globalThis.ResizeObserver ??= InertResizeObserver
Element.prototype.scrollIntoView ??= () => {}
Element.prototype.hasPointerCapture ??= () => false
Element.prototype.releasePointerCapture ??= () => {}
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
