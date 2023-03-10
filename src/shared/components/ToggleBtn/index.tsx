import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import { color, font } from '@/shared/styles/styles'

interface Props {
  labels: string[],
  callback?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ToggleBtn = forwardRef(({ labels, callback }: Props, ref) => {
  const [selected, setSelected] = useState('')

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value)
    callback!(e)
  }

  return (
    <ToggleWrapper>
      {labels.map((label: string, index: number) => {
        return (
          <RadioWrapper key={label}>
            <Btn
              id={'option' + index}
              type='radio'
              value={label}
              name='toggle'
              defaultChecked={index === 0 && true}
              selected={label === selected}
              onChange={handleSelect}
            />
            <label htmlFor={'option' + index}>{label}</label>
          </RadioWrapper>
        )
      })}
    </ToggleWrapper>
  )
})

const ToggleWrapper = styled.div`
  height: 40px;
  border-radius: 8px;
  background-color: ${color.backgroundLight};
  display: flex;
  align-items: center;
  overflow: hidden;
`

const RadioWrapper = styled.div`
  height: 100%;
`

const Btn = styled.input<{
  selected?: boolean,
}>`
  width: fit-content;
  border: 1px solid black;
  background-color: ${props => props.selected ? '' : ''};
  color: ${props => props.selected ? '' : ''};
  display: none;
  + label {
    padding: 0 8px;
    ${font.size(16)}
    ${font.bold}
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }
  &:checked + label {
    transition: .2s;
    background-color: black;
    color: white;
  }
`

const Label = styled.label`
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
`
export default ToggleBtn