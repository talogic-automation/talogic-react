import { Badge, type BadgeProps } from '../ui'
import type { RunStatus } from './run-status.contract'
import { runStatusDisplay } from './run-status.mapper'

/** Props of {@link StatusBadge}. */
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant' | 'dot' | 'children'> {
  /** The status to show. */
  status: RunStatus
}

/**
 * A badge for a run status, with the same word and colour in every product.
 *
 * @param props - The status and any badge props.
 * @returns The badge.
 */
export function StatusBadge ({ status, ...props }: StatusBadgeProps) {
  const { label, variant, live } = runStatusDisplay(status)

  return <Badge variant={variant} dot={live} data-status={status} {...props}>{label}</Badge>
}
