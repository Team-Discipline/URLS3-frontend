import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { backUrl } from '../../variable/url';

const Main = () => {
  const [url, setUrl] = useState('');

  const urlHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${backUrl}/s3`, {
      url
    }).catch(() => window.alert('url에러'));
  };
  return (
        <MainContainer>
          <MainDiv>
            <form onSubmit={onSubmit}>
              <Input name="url" onChange={urlHandler} placeholder="Shorten your link" />
              <Button id="postUrl" type="submit">S3</Button>
            </form>
          </MainDiv>
            <ServeDiv>
                <FirstDiv>
                    <Link className="slink">copy link</Link>
                </FirstDiv>
                <Button>copy</Button>
                <SecondDiv>
                    <SDiv>
                        QR
                    </SDiv>
                    <SDiv>
                        SNS
                    </SDiv>
                </SecondDiv>
            </ServeDiv>
        </MainContainer>
  );
};
const MainContainer = styled.div`
  text-align: center;
  //background-color:#dcdcdc;
`;
const MainDiv = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
  background-color: black;
`;
const ServeDiv = styled.div`
  display: inline-block;
  font-weight: 400;
  outline: none;
  position: center;
  background-color: white;
  width:90%;
  height:500px;
  margin-top: 25px;
  margin-bottom: 25px;
  
`;
const Input = styled.input`
  display: inline-block;
  font-weight: 400;
  width: 50%;
  font-size: 20px;
  background-color: #1d1d1f;
  border-radius: 8px;
  border: 0;
  color: white;
  outline: none;
`;
const Button = styled.button`
  display: inline-block;
  box-sizing: content-box;
  font-size: 20px;
  background-color: inherit;
  color: #2997ff;
  border: 0;
`;
const FirstDiv = styled.div`
  display: inline-block;
  font-weight: 400;
  outline: none;
  position: center;
  width:40%;
  height:50px;
  font-size:20px;
  margin-top: 25px;
  margin-bottom: 25px;
`;
const Link = styled.div`
  font-weight: 400;
  border-radius: 8px;
  border-color: #1d1d1f;
  border:0.1rem solid;
  outline: none;
  background-color: #fafafa;
  width:95%;
  margin:10px;
`;
const SecondDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:60%;
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 10px;
`;
const SDiv = styled.div`
  font-weight: 400;
  font-size:20px;
  float:left;
  margin-left:50px;
  //background-color:#fafafa;
  width:40%;
  height:150px;
`;
export default Main;
