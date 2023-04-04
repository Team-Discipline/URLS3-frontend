import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {AccessToken} from "../../../variable/token";
import {UrlShortForm} from "./UrlShortForm";
import {ShortUrl} from "./ShortUrl";
import {Footer} from "./Footer";
import {NetworkManager} from "../../../Models/NetworkManager";

// 버튼 쓸때 여기 참고 https://mui.com/material-ui/react-button/#outlined-buttons
interface S3 {
    id: string;
    url: string;
    issuer: number;
    s3_url: string;
    target_url: string;
    created_at: string;
    updated_at: string;
    short_by_words: boolean;
}

interface Url {
    [index: string]: string;
}

const Main = () => {
    const {t} = useTranslation();
    const [url, setUrl] = useState("https://api.urls3.kreimben.com/");
    const [copyUrl, setCopyUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [qrVision, setQR] = useState(false);
    const [urlList, setUrlList] = useState<S3[]>([]);
    const [urlTwoWordArr, setUrlTwoWordArr] = useState<Url>({});
    const [urlFalseArr, setUrlFalseArr] = useState<Url>({});
    const [toggle, setToggle] = useState(true);

    const check = () => {
        NetworkManager.get(AccessToken, "/s3/", (res: any) => setUrlList(res.data));

        for (let i = 0; i < urlList.length; i++) {
            const checkTargetUrl = `${urlList[i].target_url}`;
            const checkUrl = `${urlList[i].s3_url}`;
            if (urlList[i].short_by_words) {
                if (!(checkTargetUrl in urlTwoWordArr)) {
                    urlTwoWordArr[checkTargetUrl] = checkUrl;
                    setUrlTwoWordArr({...urlTwoWordArr, checkTargetURl: checkUrl});
                }
            } else {
                if (!(checkTargetUrl in urlFalseArr)) {
                    urlFalseArr[checkTargetUrl] = checkUrl;
                    setUrlFalseArr({...urlFalseArr, checkTargetURl: checkUrl});
                }
            }
        }
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        check();
        if (url === "https://api.urls3.kreimben.com/") {
            return
        }
        if (toggle) {
            if (url in urlTwoWordArr) {
                setCopyUrl(urlTwoWordArr[url]);
            } else {
                NetworkManager.post(AccessToken, "/s3/", {
                    target_url: url,
                    short_by_words: toggle,
                }, (res => setCopyUrl(res.data.s3_url)));
            }
        } else {
            if (url in urlFalseArr) {
                setCopyUrl(urlFalseArr[url]);
            } else {
                NetworkManager.post(AccessToken, "/s3/", {
                    target_url: url,
                    short_by_words: toggle,
                }, (res => setCopyUrl(res.data.s3_url)));
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
    const toggleState = () => setToggle(!toggle);
    useEffect(() => {
        NetworkManager.get(AccessToken, "/s3/", (res: any) => setUrlList(res.data));
    }, []);
    return (
        <MainContainer>
            <UrlShortForm onSubmit={onSubmit} urlHandler={urlHandler} translation={t} toggle={toggle}
                          toggleState={toggleState}/>
            <ShortUrl copyUrl={Boolean(copyUrl === "") ? t('Make your URL short!') : copyUrl} copied={copied}
                      copy={copy}
                      translation={t}
                      qrVision={qrVision} url={url}/>
            <br/><br/>
            <Advertisement>
                Something Here - advertisement
            </Advertisement>
            <Br/>
            <Advertisement>
                Technology - advertisement
            </Advertisement>
            <Footer url={url}/>
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
const Advertisement = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width: 100%;
  padding-bottom: 4%;
`;


export default Main;
