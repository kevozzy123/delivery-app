import React, { ReactNode, forwardRef, RefObject } from 'react'
import { StyledButton, StyledSpinner } from './style'
import Spinner from '../Spinner'
import styled from 'styled-components'
import { font } from '@/shared/styles/styles'

interface BProps {
  children?: ReactNode,
  className?: string,
  variant?: 'default' | 'danger' | 'warning' | 'secondary',
  empty?: boolean,
  disabled?: boolean,
  onClick?: () => void,
  isLoading?: boolean,
  block?: boolean
}

const Button: React.FC<BProps> = forwardRef<HTMLButtonElement, BProps>(({
  children,
  className,
  variant = "default",
  disabled = false,
  empty = false,
  onClick,
  isLoading = false,
  block = true
}, ref?) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  return (
    <StyledButton
      className={className}
      variant={variant}
      disabled={disabled}
      onClick={handleClick}
      block={block}
      empty={empty}
      ref={ref}
    >
      {isLoading ? <StyledSpinner color='white' /> : children}
    </StyledButton>
  )
})

export const RoundButton = styled.button`
      height: 30px;
    width: 30px;
    position: absolute;
    left: 1rem;
    background-color: white;
    border-radius: 50%;
    ${font.bold};
`
export default Button