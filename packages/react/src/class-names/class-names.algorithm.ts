import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Joins class names and resolves Tailwind conflicts, so a caller's class wins over a recipe default.
 *
 * @param inputs - Class names, arrays or condition maps, as `clsx` accepts them.
 * @returns One class string in which the last conflicting Tailwind utility wins.
 */
export function cn (...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
