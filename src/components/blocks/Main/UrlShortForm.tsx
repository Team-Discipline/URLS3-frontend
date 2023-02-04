import Button from '@mui/material/Button';
import React from 'react';
import styled from 'styled-components';

interface dataProp {
  toggleState: () => void
  toggle: boolean
  urlHandler: any
  onSubmit: any
}

export const UrlShortForm = ({ onSubmit, urlHandler, toggleState, toggle }: dataProp) => {
  return (
        <UrlForm>
            <form onSubmit={onSubmit}>
                <Input name="url" onChange={urlHandler} placeholder="paste here to make your URL short"
                       style={{ height: '40px', backgroundColor: '#c5c5c5' }}/>&nbsp;
                <Button id="postUrl" type="submit" variant={'contained'} color={'primary'}>Make URL</Button>&nbsp;
                <Button onClick={toggleState} variant={'contained'}
                        color={'secondary'}>{toggle ? 'random_encoding' : 'noun-adj_combination'}</Button>
            </form>
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
