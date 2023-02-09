import styled from "styled-components";

import { mixin, color, font, sizes } from "@/shared/styles/styles";

export const StyledInput = styled.input`
    background-color: ${color.backgroundLight};
    width: 100%;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: ${sizes.inputBorderRadius};
    margin: 1rem 0;
    ${font.size(24)}
`

export const Label = styled.label`
    
`