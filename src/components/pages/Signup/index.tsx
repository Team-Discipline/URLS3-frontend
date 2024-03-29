import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {AccessToken} from "../../../variable/token";
import {SignTitle} from "../../atoms/SignTitle";
import {SignUpForm} from "./SignUpForm";
import {HyperLink} from "../../atoms/HyperLink";
import {backUrl} from "../../../variable/url";
import axios from "axios";

const SignUp = () => {
    const {t} = useTranslation();
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
        // NetworkManager.post(AccessToken, "/registration/", {
        //     username: Username,
        //     email,
        //     password1: password,
        //     password2: passwordCheck,
        // }, ((res) => {
        //     console.log(`res: ${JSON.stringify(res)}`);
        //     console.log(AccessToken);
        //     location.replace("/login");
        // }), (error) => {
        //     // setSignUpErr("이미 있는 이름이거나 비밀번호가 너무 단순합니다");
        //     setSignUpErr(`${JSON.stringify(error)}`);
        // });
        axios.post(`${backUrl}/registration/`, {
            username: Username,
            email: email,
            password1: password,
            password2: passwordCheck,
        })
            .then((res) => {
                // console.log(`res: ${JSON.stringify(res)}`);
                location.replace("/login");
            })
            .catch((err) => {
                // console.error(err);
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
                <SignTitle title="Sign up" translation={t}/>
                <SignUpForm SignUpErr={SignUpErr}
                            Username={Username}
                            email={email}
                            mismatchError={mismatchError}
                            mismatchErrorText={mismatchErrorText}
                            onChangeEmail={onChangeEmail}
                            onChangePassword={onChangePassword}
                            onChangePasswordCheck={onChangePasswordCheck}
                            onChangeUsername={onChangeUsername}
                            onSubmit={onSubmit}
                            password={password}
                            passwordCheck={passwordCheck}
                            translation={t}
                />
                <HyperLink address="/login" text="Sign in" translation={t}/>
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
  text-align: center;
  border-radius: 5px;
`;

export default SignUp;
