import React, { forwardRef, useState } from 'react'
import { StyledInput, Label, InputGroup, ErrorMsg, IconWrapper } from './style'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useDebounce from '@/shared/util/useDebounce';

interface VisibilityToggle {
    visible: boolean,
    onVisibleChange: () => void
}

// interface Debounce {
//     delay?: number,
//     value?: string | number
// }

interface Props {
    placeholder?: string,
    value?: any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean,
    className?: string,
    label?: string,
    type?: 'text' | 'number' | 'password' | 'email',
    visibilityToggle?: VisibilityToggle,
    id?: string,
    errorMsg?: string,
    showErr?: boolean,
    // debounce?: Debounce
}

const Input: React.FC<Props> = forwardRef<HTMLInputElement, Props>(({
    placeholder = 'Enter here',
    value,
    onChange,
    disabled = false,
    className,
    label,
    type = 'text',
    id,
    visibilityToggle,
    errorMsg,
    showErr = false,
    // debounce = {
    //     delay: 0,
    //     value: ''
    // },
    ...inputProps
}, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled && onChange) {
            onChange(e)
        }
    }
    return (
        <InputGroup>
            {label && <Label htmlFor={id}>{label}</Label>}
            <StyledInput
                ref={ref}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                className={className}
                type={type === 'password' ?
                    (passwordVisible ? 'text' : 'password') : type}
                {...inputProps}
            ></StyledInput>
            {
                type === 'password' &&
                (passwordVisible ?
                    <IconWrapper onClick={() => setPasswordVisible(false)}>
                        <VisibilityOffIcon />
                    </IconWrapper> :
                    <IconWrapper onClick={() => setPasswordVisible(true)}>
                        <RemoveRedEyeIcon />
                    </IconWrapper>)
            }
            {<ErrorMsg showErr={showErr}>{errorMsg}</ErrorMsg>}
        </InputGroup>
    )
})

export default Input