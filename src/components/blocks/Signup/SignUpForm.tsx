import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Form, Line, Button, InputDiv, IconInput, Icon } from '../SignStyled';
import { SignInput } from '../../atoms/SignInput';

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
                    <SignInput id="email" type="email" value={data.email} onChange={data.onChangeEmail} placeholder="E-mail"/>
                    <div id="emailError" className="error"></div>
                </IconInput>
            </InputDiv>
            <InputDiv className="Username">
                <IconInput>
                    <SignInput id="Username" type="text" value={data.Username} onChange={data.onChangeUsername} placeholder="Name"/>
                    <div id="nameError" className="error"></div>
                </IconInput>
            </InputDiv>
            <InputDiv className="password">
                <IconInput>
                    <SignInput id="password" type="password" value={data.password} onChange={data.onChangePassword} placeholder="Password"/>
                    <Icon>
                        <FontAwesomeIcon icon={faLock} />
                    </Icon>
                    <div id="passwordError" className="error"></div>
                </IconInput>
            </InputDiv>
            <InputDiv className="passwordCheck">
                <IconInput>
                    <SignInput id="passwordCheck" type="password" value={data.passwordCheck} onChange={data.onChangePasswordCheck} placeholder="Check Password"/>
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
