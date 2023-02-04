import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';

interface dataType {
  SignUpErr: string
  Username: string
  email: string
  mismatchError: boolean
  mismatchErrorText: string
  onChangeEmail: any
  onChangePassword: any
  onChangePasswordCheck: any
  onChangeUsername: any
  onSubmit: any
  password: string
  passwordCheck: string
  translation: any
}

export const SignUpForm: React.FC<dataType> = ({ ...data }) => {
  return (
        <Form onSubmit={data.onSubmit}>
            <InputDiv className="email">
                <IconInput>
                    <Input id="email" type="email" value={data.email} onChange={data.onChangeEmail} placeholder="E-mail"/>
                    <div id="emailError" className="error"></div>
                </IconInput>
            </InputDiv>
            <InputDiv className="Username">
                <IconInput>
                    <Input id="Username" type="text" value={data.Username} onChange={data.onChangeUsername} placeholder="Name"/>
                    <div id="nameError" className="error"></div>
                </IconInput>
            </InputDiv>
            <InputDiv className="password">
                <IconInput>
                    <Input id="password" type="password" value={data.password} onChange={data.onChangePassword} placeholder="Password"/>
                    <Icon>

                        <FontAwesomeIcon icon={faLock} />
                    </Icon>
                    <div id="passwordError" className="error"></div>
                </IconInput>
            </InputDiv>
            <InputDiv className="passwordCheck">
                <IconInput>
                    <Input id="passwordCheck" type="password" value={data.passwordCheck} onChange={data.onChangePasswordCheck} placeholder="Check Password"/>
                    <Icon>
                        <FontAwesomeIcon icon={faCheck} />
                    </Icon>
                    <div id="passwordCheckError" className="error"></div>
                </IconInput>
            </InputDiv>

            <Line className="line">
                <hr/>
                <h5>{data.SignUpErr}</h5>
            </Line>
            {data.mismatchError &&
                <h1>{data.mismatchErrorText}</h1>
            }

            <Button id="signUpButton" type="submit">{data.translation('signup')}</Button>

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
