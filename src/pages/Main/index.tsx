import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import QR from 'qrcode.react';
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
            <Br/>
                <SecondDiv>
                    <SDiv>
                        <QR
                            id="qr-gen"
                            size={120}
                            value={'https://github.com/Team-Discipline'}
                            includeMargin={false} // QR 테두리 여부
                            fgColor={'black'} // QR색
                            style={{ margin: '40px' }}
                         />
                    </SDiv>
                    <SDiv>
                        <Img src={ require('../../image/instagram.png') }/>
                    </SDiv>
                    <SDiv>
                        <Img src={ require('../../image/recent.png') }/>
                    </SDiv>
                    <SDiv>
                        <Img src={ require('../../image/analytics.png') }/>
                    </SDiv>
                    <SDiv>
                        <Img src={ require('../../image/technical-support.png') }/>
                    </SDiv>
                </SecondDiv>
                <ThirdDiv>
                    <TDiv>
                        QR
                    </TDiv>
                    <TDiv>
                        SNS
                    </TDiv>
                    <TDiv>
                        Recent
                    </TDiv>
                    <TDiv>
                        Analysis
                    </TDiv>
                    <TDiv>
                        Technology
                    </TDiv>
                </ThirdDiv>
            <Br/>
            <div style={{ width: '100%', height: '50px' }}></div>
        </MainContainer>
  );
};
const MainContainer = styled.div`
  text-align: center;
  background-color:white;
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
  margin-top: 50px;
  margin-bottom: 50px;
`;
const Link = styled.div`
  font-weight: 400;
  border:grey 0.1rem solid;
  opacity:0.7;
  outline: none;
`;
const Link = styled.div`
  font-weight: 400;
  border-radius: 8px;
  border-color: #1d1d1f;
  border:0.1rem solid;
  outline: none;
  background-color: #fafafa;
`;
const SecondDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:100%;
  margin-top: 25px;
  padding:20px;
  padding-bottom:1px;
`;
const SDiv = styled.div`
  font-weight: 400;
  font-size:20px;
  float:left;
  margin-left:38px;
  width:200px;
  height:200px;
  border:grey 0.15rem solid;
  border-radius:50%; 
`;
const Br = styled.div`
  background-color: grey;
  opacity: 0.5;
  height: 0.08rem;
  width: 90%;
  margin-left:5%;
  margin-right:5%;
`;
const ThirdDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:100%;
  padding-left:20px;
  padding-bottom:20px;
`;
const TDiv = styled.div`
  font-weight: 400;
  font-size:20px;
  text-align:center;
  float:left;
  margin-left:38px;
  width:200px;
  color:grey;
`;
const Img = styled.img`
  width:60%;
  margin:40px;
`;
// const Line = styled.div`
//   border-left:thin solid grey;
//   height: 200px;
//   width:1px;
//   float:left;
//   margin-left:20px;
//   margin-right:20px;
// `;
export default Main;
