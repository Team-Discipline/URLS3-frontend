import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { backUrl } from '../../../variable/url';
import {AccessToken, setCookie} from '../../../variable/token';
import { useTranslation } from 'react-i18next';
import { LogInForm } from '../../blocks/Login/LogInForm';
import { HyperLink } from '../../atoms/HyperLink';
import { SignTitle } from '../../atoms/SignTitle';
import {NetworkManager} from "../../../Models/NetworkManager";

const LogIn = () => {
  const { t } = useTranslation();
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);
  const login = async () => {
    // NetworkManager.post(AccessToken, "/token/login/", {
    //   username: Username,
    //   password
    // }, (res) => {
    //   setCookie('accessToken', res.data.access);
    //   setCookie('refreshToken', res.data.refresh);
    // }, true);

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
          <SignTitle title='Sign in' translation={t}/>
          <LogInForm onSubmit={onSubmit}
                     Username={Username}
                     onChangeUsername={onChangeUsername}
                     password={password}
                     onChangePassword={onChangePassword}
                     translation={t}
          />
          <HyperLink address="/signup" text="Sign up" translation={t}/>
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

const Wrap = styled.div`
  height: 80vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align : center;
  border-radius: 5px; 
`;

export default LogIn;
