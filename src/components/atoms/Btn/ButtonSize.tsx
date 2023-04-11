import {css} from "styled-components";
import { Props } from "./Props";

export const sizeStyle = css<Props>`
  ${({ size = 'md' }) => {
    if (size === 'sm') {
        return css`
        padding: 8px 10px;
        font-size: 15px;
      `;
    }

    if (size === 'lg') {
        return css`
        padding: 14px 18px;
        font-size: 25px;
      `;
    }

    if (size === 'xl') {
        return css`
        padding: 14px 18px;
        font-size: 30px;
      `;
    }

    // default styles
    return css`
      padding: 10px 12px;
      font-size: 20px;
    `;
}}
`;