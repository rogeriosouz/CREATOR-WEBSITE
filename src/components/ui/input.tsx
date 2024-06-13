import * as React from 'react'

import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { Eye, EyeSlash, Info } from '@phosphor-icons/react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  messageError?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError = false, messageError = '', ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
      <>
        <div className="relative rounded-md">
          <input
            type={
              type === 'password' ? (isVisible ? 'text' : 'password') : type
            }
            className={clsx(
              cn(
                'flex h-9 w-full rounded-md border border-input  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                className,
              ),
              {
                'border-red-500 focus-within:outline-red-500': isError,
              },
            )}
            ref={ref}
            {...props}
          />

          {type === 'password' && (
            <button
              type="button"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3"
              onClick={() => setIsVisible((v) => !v)}
            >
              {isVisible ? (
                <Eye className="w-full h-full" weight="regular" />
              ) : (
                <EyeSlash className="w-full h-full" weight="regular" />
              )}
            </button>
          )}
        </div>

        {isError && (
          <div className="w-full flex items-center gap-2">
            <Info className="size-5 text-red-500" />
            <p className="text-red-500 font-normal text-sm">{messageError}</p>
          </div>
        )}
      </>
    )
  },
)
Input.displayName = 'Input'

export { Input }
