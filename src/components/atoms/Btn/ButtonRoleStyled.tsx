import {css} from "styled-components";
import {Props} from "./Props";

export const buttonRoleStyle = css<Props>`
  ${({ variant = 'default' }) => css`
    background-color: rgb(127,86,217);
    color: rgb(240,237,247);

    &:hover {
      background-color: rgb(214,187,251);
    }

    &:active {
      background-color: rgb(104,65,198);
    }

    &:disabled {
      background-color: rgb(214,187,251);
      pointer-events: none;
      cursor: default;
    }
  `}
`;