import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-ink text-cream hover:bg-pine active:bg-pine-dark disabled:bg-ink-soft',
  secondary:
    'bg-pine text-cream hover:bg-pine-dark active:bg-pine-dark disabled:bg-ink-soft',
  outline:
    'bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream disabled:opacity-40',
  ghost: 'bg-transparent text-ink hover:bg-stone disabled:opacity-40',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-4 py-2 min-h-[2.25rem]',
  md: 'text-sm px-5 py-3 min-h-[2.75rem] sm:px-6',
  lg: 'text-sm px-6 py-4 min-h-[3rem] sm:px-8',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className = '', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-medium tracking-wide transition-colors duration-200 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {isLoading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
