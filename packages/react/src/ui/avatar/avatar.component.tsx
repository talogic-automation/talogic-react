import { Avatar as AvatarPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { cn } from '../../class-names'

/**
 * The shadcn/ui Avatar root: a 32 px circle. Photos crop to the circle.
 *
 * @param props - Radix Avatar root props.
 * @returns The avatar.
 */
export function Avatar ({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Root>) {
  return <AvatarPrimitive.Root data-slot='avatar' className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)} {...props} />
}

/**
 * The photo of an {@link Avatar}. It shows only once it has loaded.
 *
 * @param props - Radix Avatar image props.
 * @returns The image.
 */
export function AvatarImage ({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot='avatar-image' className={cn('aspect-square size-full object-cover', className)} {...props} />
}

/**
 * The fallback of an {@link Avatar}: initials on the brand-soft colour.
 *
 * @param props - Radix Avatar fallback props.
 * @returns The fallback.
 */
export function AvatarFallback ({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn('flex size-full items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand-text', className)}
      {...props}
    />
  )
}
