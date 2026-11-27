import { useEffect } from 'react'

/**
 * Calls `onTrigger` when the user presses ⌘K on macOS or Ctrl K elsewhere, to open the command palette.
 *
 * @param onTrigger - Called on the shortcut. The default browser action is cancelled.
 * @param enabled - Turns the shortcut off, for example while another dialog is open. Default true.
 */
export function useCommandShortcut (onTrigger: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return
    function onKeyDown (event: KeyboardEvent): void {
      if (!(event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey))) {
        return
      }

      event.preventDefault()
      onTrigger()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onTrigger, enabled])
}
