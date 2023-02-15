import React from 'react';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import ButtonComponent from "../../atoms/Btn/ButtonComponent";

interface dataProp {
  toggleState: () => void
  toggle: boolean
  urlHandler: any
  onSubmit: any
}

export const UrlShortForm = ({ onSubmit, urlHandler, toggleState, toggle }: dataProp) => {
  return (
        <UrlForm>
                <Input name="url" onChange={urlHandler} placeholder="paste here to make your URL short"
                       style={{ height: '40px', backgroundColor: '#c5c5c5' }}/>&nbsp;;
                <ButtonComponent onClick={onSubmit} type="submit" variant={'default'} size={'sm'}>Make URL</ButtonComponent>&nbsp;
                <ButtonComponent onClick={toggleState} variant={'default'} size={'sm'}>{toggle ? 'random_encoding' : 'noun-adj_combination'}</ButtonComponent>
        </UrlForm>
  );
};

const UrlForm = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
  background-color: #222529;
`;

const Input = styled.input`
  display: inline-block;
  font-weight: 400;
  width: 50%;
  font-size: 20px;
  background-color: #1d1d1f;
  border-radius: 8px;
  border: 0;
  color: white;
  outline: none;
  padding-bottom: 10px;
`;
