import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Form, Line, Button, InputDiv, IconInput, Icon } from '../SignStyled';
import { InputBox } from '../../atoms/InputBox';

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
                    <InputBox id="Username" type="text" value={data.Username} onChange={data.onChangeUsername} placeholder="Username" autoFocus={true} />
                </IconInput>
                <div id="nameError" className="error"></div>
            </InputDiv>

            <InputDiv className="password">
                <IconInput>
                    <Icon>
                        <FontAwesomeIcon icon={faKey} />
                    </Icon>
                    <InputBox id="password" type="password" value={data.password} onChange={data.onChangePassword} placeholder="Password"/>
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
