import React, { ReactNode, RefObject } from 'react'
import { StyledButton } from './style'

interface BProps {
  children?: ReactNode,
  className?: string,
  variant?: 'default' | 'danger' | 'warning' | 'secondary' | 'empty',
  disabled?: boolean,
  onClick?: () => void,
  isLoading?: boolean,
  block?: boolean,
}

const defaultProps = {
  children: undefined,
  className: undefined,
  variant: 'default',
  disabled: false,
  onClick: undefined,
  isLoading: false,
  block: false
}

const Button: React.FC<BProps> = ({
  children,
  className,
  variant,
  disabled,
  onClick,
  isLoading,
  block
}, ref) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  return (
    <StyledButton
      ref={ref}
      className={className}
      // variant={variant}
      disabled
      onClick={onClick}
    // isLoading={isLoading}
    // block={block}
    >
      {children}
    </StyledButton>
  )
}

export default Button