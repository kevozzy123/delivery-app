import styled from "styled-components";

import { mixin, color, font, sizes } from "@/shared/styles/styles";

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
`

export const StyledInput = styled.input`
    background-color: ${color.backgroundLight};
    width: 100%;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: ${sizes.inputBorderRadius};
    margin: .5rem 0 1.5rem;
    ${font.size(18)};
`

export const Label = styled.label`
    ${font.bold};
    text-align: start;
    ${font.size(18)}
`

export const ErrorMsg = styled.div<{ showErr: boolean }>`
    transition: .2s;
    position: absolute;
    bottom: ${props => props.showErr ? '0px' : '10px'};
    opacity: ${props => props.showErr ? '1' : '0'};
    color: ${color.danger};
    ${font.size(18)};
    
`

export const IconWrapper = styled.div`
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    right: 10px;
`