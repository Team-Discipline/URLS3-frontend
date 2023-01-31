import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import backUrl from "../../variable/url";
import axios from "axios";
import { Link } from "react-router-dom";
import { AccessToken } from "../../variable/token";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const SignUp = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [mismatchError, setMismatchError] = useState(false);
    const [mismatchErrorText] = useState("비밀번호가 일치하지 않습니다.");
    const [SignUpErr, setSignUpErr] = useState("");
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
            password2: passwordCheck,

        })
        .then((res) => {
            location.replace("/login");
        })
        .catch(() => {
            setSignUpErr("이미 있는 이름이거나 비밀번호가 너무 단순합니다");
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordCheck !== password) {
            setMismatchError(true);
        } else {
            setMismatchError(false);
            registration().then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    };
    useEffect(() => {
        if (AccessToken !== undefined) location.replace("/");
        console.log(AccessToken);
    }, []);
    return (
        <Container>
            <Wrap className="wrapper">
                <Title className="title">
                    <h1>{t("signup")}</h1>
                </Title>
                <Form onSubmit={onSubmit}>
                    <InputDiv className="email">
                        <IconInput>
                            <Input id="email" type="email" value={email} onChange={onChangeEmail}
                                   placeholder="E-mail" />
                            <div id="emailError" className="error"></div>
                        </IconInput>
                    </InputDiv>
                    <InputDiv className="Username">
                        <IconInput>
                            <Input id="Username" type="text" value={Username} onChange={onChangeUsername}
                                   placeholder="Name" />
                            <div id="nameError" className="error"></div>
                        </IconInput>
                    </InputDiv>
                    <InputDiv className="password">
                        <IconInput>
                            <Input id="password" type="password" value={password} onChange={onChangePassword}
                                   placeholder="Password" />
                            <Icon>

                                <FontAwesomeIcon icon={faLock} />
                            </Icon>
                            <div id="passwordError" className="error"></div>
                        </IconInput>
                    </InputDiv>
                    <InputDiv className="passwordCheck">
                        <IconInput>
                            <Input id="passwordCheck" type="password" value={passwordCheck}
                                   onChange={onChangePasswordCheck} placeholder="Check Password" />
                            <Icon>
                                <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                            <div id="passwordCheckError" className="error"></div>
                        </IconInput>
                    </InputDiv>

                    <Line className="line">
                        <hr />
                        <h5>{SignUpErr}</h5>
                    </Line>
                    {mismatchError &&
                        <h1>{mismatchErrorText}</h1>
                    }

                    <Button id="signUpButton" type="submit">{t("signup")}</Button>

                </Form>
                <StyledLink to="/login">{t("signin")}</StyledLink>
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
  text-align: center;
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
  font-size: 15px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

export default SignUp;
