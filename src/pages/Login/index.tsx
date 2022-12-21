import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { backUrl } from '../../variable/url';
import { setCookie } from '../../variable/token';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

const LogIn = () => {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);
  const login = async () => {
    await axios.post(`${backUrl}/token/login/`, {
      username: Username,
      password

    }, { withCredentials: true })
      .then((res) => {
        setCookie('accessToken', res.data.access);
        setCookie('refreshToken', res.data.refresh);
      }).catch(() => window.alert('로그인에러'));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login().then(res => { location.replace('/'); console.log(res); }).catch(err => { console.log(err); });
  };
  return (
      <Container>
        <Wrap className="wrapper">
          <Title className="title">
            <h1>Log in</h1>
          </Title>
          <Form onSubmit={onSubmit}>
            <InputDiv className="Username">
              <IconInput>
                <Icon>
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
                <Input id="Username" type="text" value={Username} onChange={onChangeUsername} placeholder="Username" autoFocus />
              </IconInput>
              <div id="nameError" className="error"></div>
            </InputDiv>
            <InputDiv className="password">
              <IconInput>
                <Icon>
                  <FontAwesomeIcon icon={faKey} />
                </Icon>
                <Input id="password" type="password" value={password} onChange={onChangePassword} placeholder="Password"/>
              </IconInput>
              <div id="passwordError" className="error"></div>
            </InputDiv>

            <Line className="line">
              <hr/>
            </Line>

            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button id="signUpButton" type="submit">Log in</Button>
          </Form>
          <StyledLink to='/signup'>Sign up</StyledLink>
        </Wrap>

      </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Title = styled.div`
  margin-bottom: 5vh;
`;

const Wrap = styled.div`
  height: 80vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align : center;
  border-radius: 5px; 
`;

const Form = styled.form`
  witdh: 100%;
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
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export default LogIn;
