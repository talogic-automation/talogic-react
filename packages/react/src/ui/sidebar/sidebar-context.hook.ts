import { createContext, useContext } from 'react'

/**
 * The two sidebars of the family. `panel` is the desktop app's tool panel (loomgic's plugins): foldable groups of
 * items with a colour bar and a meta line, collapsing to a rail with its name written down the side. `nav` is the
 * web platform's navigation (pargic's portal): sections of icon links, collapsing to its icons by narrowing, with
 * the labels fading in place so the icons never move.
 */
export type SidebarVariant = 'panel' | 'nav'

/** What a {@link Sidebar} tells the parts inside it. */
export interface SidebarState {
  /** True when the sidebar shows only its icons. */
  collapsed:    boolean
  /** Expands or collapses the sidebar. */
  setCollapsed: (collapsed: boolean) => void
  /** The sidebar's name, such as "Plugins" or "Portal". */
  label:        string
  /** The edge the sidebar sits on. */
  side:         'start' | 'end'
  /** The kind of sidebar. */
  variant:      SidebarVariant
}

/** The context a {@link Sidebar} provides. Null outside a sidebar. */
export const SidebarContext = createContext<SidebarState | null>(null)

/**
 * Reads the state of the sidebar around a part.
 *
 * @returns The sidebar state.
 * @throws Error when the part is not inside a Sidebar.
 */
export function useSidebar (): SidebarState {
  const state = useContext(SidebarContext)
  if (!state) throw new Error('A sidebar part must be inside a Sidebar.')

  return state
}
