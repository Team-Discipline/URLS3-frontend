import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { backUrl } from '../../variable/url';
import { AccessToken } from '../../variable/token';

const Main = () => {
  const [url, setUrl] = useState('');

  const urlHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);
  // const s3Handler = async () => {
  //   await axios.get(`${backUrl}/s3`).then(res => console.log(res));
  // };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(`${backUrl}/s3`, {
      target_url: url
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    }, { withCredentials: true, headers: { Authorization: `Bearer ${AccessToken}` } }).then(res => window.alert(res)).catch(() => window.alert('에러'));
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
            <div style={{ width: '100%', height: '50px' }}></div>
            </ServeDiv>
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
  border-radius: 8px;
  border-color: #1d1d1f;
  border:0.1rem solid;
  outline: none;
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
export default Main;
