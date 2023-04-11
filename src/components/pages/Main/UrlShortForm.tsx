import React from 'react';
import styled from 'styled-components';
import ButtonComponent from "../../atoms/Btn/ButtonComponent";
import {ToggleButton} from "../../atoms/ToggleButton";

interface dataProp {
    toggleState: () => void
    toggle: boolean
    urlHandler: any
    onSubmit: any
    translation: any
}

export const UrlShortForm = ({onSubmit, urlHandler, toggleState, toggle, translation}: dataProp) => {
    return (
        <UrlForm>
            <Form>
                <Input name="url" onChange={urlHandler}
                       placeholder={toggle ? translation('Double Hash') : translation('Single Hash')}
                       style={{height: '40px', backgroundColor: '#c5c5c5'}}/>&nbsp;
                <ButtonComponent onClick={onSubmit} variant={'default'}
                                 size={'sm'}>{translation(`Short`)}</ButtonComponent>&nbsp;
                <ToggleButton toggleState={toggleState}/>
            </Form>
        </UrlForm>
    );
};

const UrlForm = styled.div`
  padding: 25px 0;
  text-align: center;
  background-color: #222529;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Form = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
`;
const Input = styled.input`
  display: inline-block;
  text-align: center;
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
