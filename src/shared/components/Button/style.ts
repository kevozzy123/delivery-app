import styled, { css, FlattenInterpolation, ThemedStyledProps } from "styled-components";
import { color, font, mixin, sizes } from "@/shared/styles/styles";
import Spinner from "../Spinner";

type variant = 'default' | 'danger' | 'warning' | 'secondary'

export const StyledButton = styled.button<{
  block: boolean,
  variant: variant,
  empty: boolean
}>`
    display: ${props => props.color};
    width: ${props => props.block ? '100%' : 'fit-content'};
    align-items: center;
    justify-content: center;
    padding: .75rem 1.5rem;
    ${props => buttonVariants[props.variant]}
    ${font.size(24)};
    transition: .2s;
    margin: 1rem 0;
    border-radius: ${sizes.buttonBorderRadius};
    cursor: pointer;
    &:disabled {
        opacity: 0.6;
        cursor: none;
    }
    vertical-align: middle;
`

interface ColoredProps {
  variant: string;
  isActive?: boolean;
}

const colored = css<ColoredProps>`
  color: #fff;
  background: ${(props) => color[props.variant]};
  font-weight: 500;
  &:not(:disabled) {
    &:hover {
      opacity: .8;
    }
    ${props =>
    props.isActive &&
    css`
        opacity: 1 !important;
      `}
  }
`;

const secondaryAndEmptyShared = css<ColoredProps>`
  color: ${(props) => color[props.variant]};
  border: 1px solid ${(props) => color[props.variant]};
  font-weight: 500;
  &:not(:disabled) {
    &:hover {
      background: ${color.backgroundLight};
    }
    &:active {
      color: ${color.primary};
      background: ${color.backgroundLightPrimary};
    }
    ${props =>
    props.isActive &&
    css`
        color: ${color.primary};
        background: ${color.backgroundLightPrimary} !important;
      `}
  }
`;

const buttonVariants = {
  default: colored,
  success: colored,
  danger: colored,
  warning: colored,
  secondary: css`
    background: ${color.secondary};
    ${secondaryAndEmptyShared};
  `,
  empty: css`
    background: #fff;
    ${secondaryAndEmptyShared};
  `,
};

export const StyledSpinner = styled(Spinner)`
  position: relative;
  top: 5px;
`;
