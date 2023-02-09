import React, { forwardRef } from 'react'
import { StyledInput } from './style'

interface Props {
    placeholder?: string,
    value?: any,
    onChange: () => void,
    disabled: boolean
}

const Input: React.FC<Props> = forwardRef(({
    placeholder,
    value,
    onChange,
    disabled
}, ref) => {
    const handleChange = () => {
        if (!disabled && onChange) {
            onChange()
        }
    }
    return (
        <StyledInput
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
        ></StyledInput>
    )
})

export default Input