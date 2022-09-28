import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { backUrl } from '../../variable/url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AccessToken } from '../../variable/token';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [mismatchErrorText] = useState('비밀번호가 일치하지 않습니다.');
  const [SignUpErr, setSignUpErr] = useState('');
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const onChangeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const onChangePasswordCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  }, []);

  const registration = async () => {
    await axios.post(`${backUrl}/registration/`, {
      username: Username,
      email,
      password1: password,
      password2: passwordCheck

    })
      .then((res) => {
        location.replace('/login');
      })
      .catch(() => { setSignUpErr('이미 있는 이름이거나 비밀번호가 너무 단순합니다'); });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordCheck !== password) { setMismatchError(true); } else {
      setMismatchError(false);
      registration().then(res => { console.log(res); }).catch(err => { console.log(err); });
    }
  };
  useEffect(() => {
    if (AccessToken !== undefined)location.replace('/');
    console.log(AccessToken);
  }, []);
  return (
            <Container>
                <div className="wrapper">
                    <div className="title">
                        <h1>회원가입</h1>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="email">
                            <input id="email" type="email" value={email} onChange={onChangeEmail} placeholder="이메일을 입력해 주세요."/>
                            <div id="emailError" className="error"></div>
                        </div>
                        <div className="Username">
                            <input id="Username" type="text" value={Username} onChange={onChangeUsername} placeholder="이름을 입력해 주세요."/>
                            <div id="nameError" className="error"></div>
                        </div>
                        <div className="password">
                            <input id="password" type="password" value={password} onChange={onChangePassword} placeholder="비밀번호를 입력해 주세요."/>
                            <div id="passwordError" className="error"></div>
                        </div>
                        <div className="passwordCheck">
                            <input id="passwordCheck" type="password" value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호를 다시 입력해 주세요."/>
                            <div id="passwordCheckError" className="error"></div>
                        </div>

                        <div className="line">
                            <hr/>
                            <h5>{SignUpErr}</h5>
                        </div>
                        {mismatchError &&
                            <h1>{mismatchErrorText}</h1>
                        }

                        <button id="signUpButton" type="submit">가입하기</button>

                    </form>
                        <Link to="/login">로그인 하러 가기</Link>
                </div>

            </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default SignUp;
