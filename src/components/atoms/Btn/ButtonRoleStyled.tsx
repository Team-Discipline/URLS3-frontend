import {css} from "styled-components";
import {Props} from "./Props";

// 'default' | 'primary' | 'success' |;
export const buttonRoleStyle = css<Props>`
  ${({ variant = 'default' }) => {
    if (variant === 'default'){
      return css`
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
  `
    }
    if (variant === 'primary'){
        return css`
    background-color: red;
    color: blue;

    &:hover {
      background-color: pink;
    }

    &:active {
      background-color: darkred;
    }

    &:disabled {
      background-color: red;
      pointer-events: none;
      cursor: default;
    }
  `
    }
    if (variant === 'success'){
      return css`
    background-color: rgb(47,124,49);
    color: rgb(240,237,247);
  `
    }
  }
}
`;