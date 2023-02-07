import React from 'react';
import styled from 'styled-components';

interface propsType{
  id?: string
  type?: string
  value?: string
  onChange?: any
  placeholder?: string
  email?: string
  autoFocus?: boolean
}
export const SignInput = ({ ...props }: propsType) => {
  return (
        <Input id={props.id}
               type={props.type}
               value={props.value}
               onChange={props.onChange}
               placeholder={props.placeholder}
               autoFocus={props.autoFocus}
        />
  );
};

const Input = styled.input`
  width: 80%;
  height: 100%;
  border: none; 
  -webkit-appearance: none; 
  margin-left: 5%;
  overflow: auto; 
  z-index: -1;
  font-size: 15px;
`;
