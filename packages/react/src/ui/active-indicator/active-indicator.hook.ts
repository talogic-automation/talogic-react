import { useCallback, useEffect, useRef } from 'react'

/**
 * Follows the active item of a row (a tab, a segment) so one indicator can slide and resize under it. It writes
 * `--indicator-left`, `--indicator-top`, `--indicator-width` and `--indicator-height` (in px, relative to the
 * container) on the container whenever the active item changes or anything resizes, and sets `data-indicator` to
 * `ready` after the first measure, so the indicator does not slide in from the corner on load. With no active item
 * it sets `data-indicator` to `none`.
 *
 * @param selector - The CSS selector of the active item inside the container, such as `[data-state=active]`.
 * @returns A ref callback for the container, which must be positioned (`relative`).
 */
export function useActiveIndicator<Container extends HTMLElement> (selector: string): (node: Container | null) => void {
  const container = useRef<Container | null>(null)
  const cleanup = useRef<() => void>(undefined)

  const attach = useCallback((node: Container | null) => {
    cleanup.current?.()
    cleanup.current = undefined
    container.current = node
    if (!node) return

    function measure (): void {
      if (!node) return
      const active = node.querySelector<HTMLElement>(selector)
      if (!active) {
        node.dataset.indicator = 'none'

        return
      }
      node.style.setProperty('--indicator-left', `${active.offsetLeft}px`)
      node.style.setProperty('--indicator-top', `${active.offsetTop}px`)
      node.style.setProperty('--indicator-width', `${active.offsetWidth}px`)
      node.style.setProperty('--indicator-height', `${active.offsetHeight}px`)
      if (node.dataset.indicator === 'ready') return
      node.dataset.indicator = 'placed'
      requestAnimationFrame(() => {
        if (node.dataset.indicator === 'placed') node.dataset.indicator = 'ready'
      })
    }

    measure()
    const mutations = new MutationObserver(measure)
    mutations.observe(node, { subtree: true, attributes: true, attributeFilter: ['data-state'], childList: true })
    const resizes = new ResizeObserver(measure)
    resizes.observe(node)
    cleanup.current = () => {
      mutations.disconnect()
      resizes.disconnect()
    }
  }, [selector])

  useEffect(() => () => cleanup.current?.(), [])

  return attach
}
