import { commandShortcutLabel } from './command-shortcut.hook'

describe('commandShortcutLabel', () => {
  it('shows the command key on Apple systems', () => {
    expect(commandShortcutLabel('macOS')).toBe('⌘K')
    expect(commandShortcutLabel('MacIntel')).toBe('⌘K')
    expect(commandShortcutLabel('iPad')).toBe('⌘K')
  })

  it('shows Ctrl+K on Windows, Linux and unknown systems', () => {
    expect(commandShortcutLabel('Windows')).toBe('Ctrl+K')
    expect(commandShortcutLabel('Win32')).toBe('Ctrl+K')
    expect(commandShortcutLabel('Linux x86_64')).toBe('Ctrl+K')
    expect(commandShortcutLabel('')).toBe('Ctrl+K')
  })
})
