import React from "react";
import { Props } from "./Props";
import styled from "styled-components";
import {sizeStyle} from "./ButtonSize";
import {buttonRoleStyle} from "./ButtonRoleStyled";
import {blockStyle} from "./ButtonBlockStyle";

export const ButtonComponent = ({ ...props }: Props) => {
  return (
      <ButtonBase {...props}/>
  )
};

const ButtonBase = styled.button`
  display: inline-flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  position: relative;
  min-width: 64px;
  border: none;
  border-radius: 6px;
  padding: 10px 12px;
  cursor: pointer;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  user-select: none;
  transition: background-color 0.1s ease;
  ${buttonRoleStyle};
  ${sizeStyle};
  ${blockStyle};
`;

export default ButtonComponent;