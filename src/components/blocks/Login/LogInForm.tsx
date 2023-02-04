import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';

interface dataType{
  onSubmit: any
  Username: string
  onChangeUsername: any
  password: string
  onChangePassword: any
  translation: any
}

export const LogInForm = ({ ...data }: dataType) => {
  return (
        <Form onSubmit={data.onSubmit}>
            <InputDiv className="Username">
                <IconInput>
                    <Icon>
                        <FontAwesomeIcon icon={faUser} />
                    </Icon>
                    <Input id="Username" type="text" value={data.Username} onChange={data.onChangeUsername} placeholder="Username" autoFocus />
                </IconInput>
                <div id="nameError" className="error"></div>
            </InputDiv>

            <InputDiv className="password">
                <IconInput>
                    <Icon>
                        <FontAwesomeIcon icon={faKey} />
                    </Icon>
                    <Input id="password" type="password" value={data.password} onChange={data.onChangePassword} placeholder="Password"/>
                </IconInput>
                <div id="passwordError" className="error"></div>
            </InputDiv>

            <Line className="line">
                <hr/>
            </Line>

            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button id="signUpButton" type="submit">{data.translation('Sign in')}</Button>
        </Form>
  );
};

const Form = styled.form`
  width: 100%;
  height: 100%;
`;

const Line = styled.div`
  padding: 0 10% 0 10%;
`;

const Button = styled.button`
  width: 80%;
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  background-color: white;
  font-size: 15px;
  height: auto;
`;
const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 10%;
`;

const IconInput = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.3);
  z-index: 1;
  opacity: 1;
`;
const Icon = styled.div`
  margin-left: 5%;
`;
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
