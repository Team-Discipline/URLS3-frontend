import { Props } from "./Props";
import { css } from "styled-components";

export const blockStyle = css<Props>`
  ${({ fullWidth }) => {
    if (fullWidth) {
        return css`
        width: 100%;
      `;
    }
    return css``;
}}
`;