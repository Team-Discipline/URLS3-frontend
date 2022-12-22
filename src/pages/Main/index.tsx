
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { backUrl } from '../../variable/url';
import QR from 'qrcode.react';
import Button from '@mui/material/Button';
// 버튼 쓸때 여기 참고 https://mui.com/material-ui/react-button/#outlined-buttons

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from 'react-share';
import { AccessToken } from '../../variable/token';

const Main = () => {
  const [url, setUrl] = useState('');
  const [copyUrl, setCopyUrl] = useState('Make your URL short!');
  const [copied, setCopied] = useState(false);
  const [qrVision, setQR] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(copyUrl);
    setCopied(true);
    setQR(true);
    setTimeout(() => {
      setCopied(false);
      setQR(false);
    }, 3000);
  };
  const urlHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);
  const [toggle, setToggle] = useState(true);
  const toggleState = () => setToggle(!toggle);
  const nounPatchSubmit = (res: AxiosResponse<any, any>) => {
    const hashedValue = res.data.s3_url.split('/');
    const params: string = hashedValue[hashedValue.length - 1];
    axios.patch(`${backUrl}/${params}`, {
      target_url: res.data.target_url,
      short_by_words: toggle
    }).then().catch(() => window.alert('에러'));
  };

  const nounSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${backUrl}/s3/`, {
      target_url: url,
      short_by_words: !toggle
    }, {
      withCredentials: true,
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    })
      //  call patch!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      .then(res => nounPatchSubmit(res))
      .catch(() => window.alert('에러'));
  };
  const hashSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${backUrl}/s3/`, {
      target_url: url,
      short_by_words: toggle
    }, {
      withCredentials: true,
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    })
    //  data.s3_url!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      .then(json => {
        setCopyUrl(json.data.s3_url);
        if (toggle) {
          nounSubmit(e);
        }
      })
      .catch(() => window.alert('에러'));
  };
  return (
        <MainContainer>
          <MainDiv>
            <form onSubmit={hashSubmit}>
              <Input name="url" onChange={urlHandler} placeholder="paste here to make your URL short" />&nbsp;
              <Button id="postUrl" type="submit" variant={'outlined'} >Make URL</Button>&nbsp;
              <Button onClick={toggleState} variant={'outlined'} >{toggle ? 'random_encoding' : 'noun-adj_combination'}</Button>
            </form>
          </MainDiv>
          <FirstDiv>
            <Link className="slink">{copyUrl}</Link>
          </FirstDiv>
          {copied ? <Button variant={'contained'} color={'success'}>copied!</Button> : <Button onClick={copy} variant={'outlined'} >copy</Button>}
          <Br/>
          <br/>
          {qrVision ? <QR id="qr-gen" size={100} value={url} includeMargin={false} fgColor={'black'} style={{ margin: '1px' }}/> : <QRDiv></QRDiv>}
          <SecondDiv>
            <SDiv style={{ marginLeft: '10%', marginRight: '5%' }}>
              <QR
                id="qr-gen"
                size={150}
                value={url}
                includeMargin={false}
                fgColor={'black'}
                style={{ margin: '15%' }}
              />
            </SDiv>
            <SDiv>
              <FacebookShareButton style={{ margin: '15%' }} url={url}>
                <FacebookIcon size={150} round={true} borderRadius={24}></FacebookIcon>
              </FacebookShareButton>
            </SDiv>
            <SDiv>
              <FacebookMessengerShareButton style={{ margin: '15%' }} url={url} appId={''}>
                <FacebookMessengerIcon size={150} round={true} borderRadius={24}></FacebookMessengerIcon>
              </FacebookMessengerShareButton>
            </SDiv>
            <SDiv>
              <TwitterShareButton style={{ margin: '15%' }} url={url}>
                <TwitterIcon size={150} round={true} borderRadius={24}></TwitterIcon>
              </TwitterShareButton>
            </SDiv>
            <SDiv>
              <LineShareButton style={{ margin: '15%' }} url={url}>
                <LineIcon size={150} round={true} borderRadius={24}></LineIcon>
              </LineShareButton>
            </SDiv>
          </SecondDiv>
          <ThirdDiv>
            <TDiv style={{ marginLeft: '10%' }}>
              QR
            </TDiv>
            <TDiv style={{ marginLeft: '30%' }}>
              SNS
            </TDiv>
          </ThirdDiv>
          <Br/>
          <FourthDiv>
            Technology
          </FourthDiv>
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
// const ServeDiv = styled.div`
//   display: inline-block;
//   font-weight: 400;
//   outline: none;
//   position: center;
//   background-color: white;
//   width:90%;
//   height:500px;
//   margin-top: 25px;
//   margin-bottom: 25px;
// `;

/* const Button = styled.button`
  display: inline-block;
  box-sizing: content-box;
  font-size: 20px;
  background-color: inherit;
  color: #2997ff;
  border: 2px solid #2997ff;
  border-radius: 10px;
`; */

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

//  const Button = styled.button`
//  display: inline-block;
//  box-sizing: content-box;
//  font-size: 20px;
//  background-color: inherit;
//  color: #2997ff;
//  border: 2px solid #2997ff;
// border-radius: 10px;
// `;


const Bts = styled.button`
  display: inline-block;
  box-sizing: content-box;
  font-size: 20px;
  background-color: green;
  color: whitesmoke;
  border: 2px solid #2997ff;
  border-radius: 10px;

`;
const FirstDiv = styled.div`
  display: inline-flex;
  font-weight: 400;
  outline: none;
  //width:40%;
  height:50px;
  font-size:20px;
  margin-top: 4%;
  margin-bottom: 4%;
`;
const Link = styled.div`
  font-weight: 400;
  border:#1d1d1f 0.1rem solid;
  border-radius: 8px;
  outline: none;
  //width: auto;
  min-width: 500px;
  height: auto;
  margin:10px;
`;
const SecondDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:100%;
  margin-top: 3%;
  margin-bottom:2%;
`;
const SDiv = styled.div`
  font-weight: 400;
  font-size:20px;
  float:left;
  width:15%;
`;
const Br = styled.div`
  background-color: grey;
  opacity: 0.5;
  height: 0.1rem;
  width: 90%;
  margin-left:5%;
  margin-right:5%;
`;
const ThirdDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:100%;
  padding-bottom:4%;
`;
const FourthDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:100%;
  padding-top:5%;
  padding-bottom:5%;
`;
const TDiv = styled.div`
  font-weight: 400;
  text-align:center;
  font-size:20px;
  float:left;
  width:15%;
  color:grey;
  background-color: #fafafa;
`;
// const Line = styled.div`
//   border-left:thin solid grey;
//   height: 200px;
//   width:1px;
//   float:left;
//   margin-left:20px;
//   margin-right:20px;
// `;
const QRDiv = styled.div`
  height: 100px;
  width: 100px;
  display: inline-block;

`;
export default Main;
