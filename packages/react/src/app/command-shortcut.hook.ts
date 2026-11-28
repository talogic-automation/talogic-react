import { useEffect, useSyncExternalStore } from 'react'

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

/**
 * Names the command palette shortcut for a platform: ⌘K on Apple systems, Ctrl+K on Windows, Linux and the rest.
 *
 * @param platform - The platform name, such as `navigator.userAgentData.platform` or `navigator.platform`.
 * @returns The shortcut label.
 */
export function commandShortcutLabel (platform: string): string {
  return /mac|iphone|ipad|ipod/i.test(platform) ? '⌘K' : 'Ctrl+K'
}

function unsubscribe (): void {}

function subscribe (): () => void {
  return unsubscribe
}

function clientPlatform (): string {
  const agent = navigator as Navigator & { userAgentData?: { platform?: string } }

  return agent.userAgentData?.platform ?? navigator.platform
}

function serverPlatform (): string {
  return ''
}

/**
 * Gives the command palette shortcut label for the user's system: ⌘K on Apple systems, Ctrl+K elsewhere. Server
 * rendering shows Ctrl+K.
 *
 * @returns The shortcut label.
 */
export function useCommandShortcutLabel (): string {
  return commandShortcutLabel(useSyncExternalStore(subscribe, clientPlatform, serverPlatform))
}
