import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import styled from 'styled-components';
import { AccessToken } from '../../../variable/token';
import { backUrl } from '../../../variable/url';
import { UrlShortForm } from './blocks/UrlShortForm';
import { ShortUrl } from './blocks/ShortUrl';
import { Footer } from './blocks/Footer';
// 버튼 쓸때 여기 참고 https://mui.com/material-ui/react-button/#outlined-buttons

interface S3 {
  id: string
  url: string
  issuer: number
  s3_url: string
  target_url: string
  created_at: string
  updated_at: string
  short_by_words: boolean
}

interface Url {
  [index: string]: string
}

const Main = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('https://api.urls3.kreimben.com/');
  const [copyUrl, setCopyUrl] = useState('Make your URL short!');
  const [copied, setCopied] = useState(false);
  const [qrVision, setQR] = useState(false);
  const [urlList, setUrlList] = useState<S3[]>([]);
  const [urlTrueArr, setUrlTrueArr] = useState<Url>({});
  const [urlFalseArr, setUrlFalseArr] = useState<Url>({});
  const getUrlList = async () => {
    await axios.get(`${backUrl}/s3/`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`
      }
    }).then(r => setUrlList(r.data)).catch(e => console.log(e));
  };
  const check = () => {
    void getUrlList();
    for (let i = 0; i < urlList.length; i++) {
      const checkTargetUrl = `${urlList[i].target_url}`;
      const checkUrl = `${urlList[i].s3_url}`;
      if (urlList[i].short_by_words) {
        if (!(checkTargetUrl in urlTrueArr)) {
          urlTrueArr[checkTargetUrl] = checkUrl;
          setUrlTrueArr({ ...urlTrueArr, checkTargetURl: checkUrl });
        }
      } else {
        if (!(checkTargetUrl in urlFalseArr)) {
          urlFalseArr[checkTargetUrl] = checkUrl;
          setUrlFalseArr({ ...urlFalseArr, checkTargetURl: checkUrl });
        }
      }
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    check();
    if (toggle) {
      if (url in urlTrueArr) {
        setCopyUrl(urlTrueArr[url]);
      } else {
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
        }).then(json => setCopyUrl(json.data.s3_url)).catch(() => window.alert('에러'));
      }
    } else {
      if (url in urlFalseArr) {
        setCopyUrl(urlFalseArr[url]);
      } else {
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
        }).then(json => setCopyUrl(json.data.s3_url)).catch(() => window.alert('에러'));
      }
    }
  };
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
  useEffect(() => {
    void getUrlList();
  }, []);
  return (
        <MainContainer>
            <UrlShortForm onSubmit={onSubmit} urlHandler={urlHandler} toggle={toggle} toggleState={toggleState}/>
            <ShortUrl copyUrl={copyUrl} copied={copied} copy={copy} translation={t} qrVision={qrVision} url={url}/>
            <br/><br/>
            <ThirdDiv>
                Something Here - advertisement
            </ThirdDiv>
            <Br/>
            <FourthDiv>
                Technology - advertisement
            </FourthDiv>
            <Footer url={url} />
        </MainContainer>
  );
};
const MainContainer = styled.div`
  text-align: center;
  background-color: white;
`;
const Br = styled.div`
  background-color: grey;
  opacity: 0.5;
  height: 0.1rem;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
`;
const ThirdDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width: 100%;
  padding-bottom: 4%;
`;
const FourthDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width: 100%;
  padding-top: 5%;
  padding-bottom: 5%;
`;

export default Main;
