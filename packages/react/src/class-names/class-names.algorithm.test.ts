import { cn } from './class-names.algorithm'

describe('cn', () => {
  it('joins truthy class names and drops falsy ones', () => {
    expect(cn('a', false, undefined, { b: true, c: false })).toBe('a b')
  })

  it('lets the last conflicting Tailwind utility win', () => {
    expect(cn('px-2 text-sm', 'px-4')).toBe('text-sm px-4')
  })

  it('keeps custom type utilities apart from colour utilities', () => {
    expect(cn('text-muted-foreground', 'text-brand-text')).toBe('text-brand-text')
  })
})
