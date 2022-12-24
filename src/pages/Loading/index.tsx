
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUtcTime, makeClean } from './GetCaptureData';
import axios from 'axios';
import { backUrl } from '../../variable/url';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoadedTime, setInitalLoadedTime] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>();
  const [pageLoadedTime, setPageLoadedTime] = useState<string>('');
  const [hashedValue, setHashedValue] = useState<string>('');

  let pageLeaveTime: string;
  const WaitLoading = () => {
    setTimeout(() => { console.log('Loading Button'); setLoading(true); setPageLoadedTime(getUtcTime()); }, 3000);
  };
  useEffect(() => {
    const referrer = document.referrer;
    setInitalLoadedTime(getUtcTime());
    WaitLoading();
  }, []);
  window.onload = () => {
    checkHyphen();
    console.log(hashedValue);
  };
  function checkHyphen () {
    const url = window.location.href;
    // const url = 'https://urls3.kreimben.com/charismatic -lie';
    const hashedValue = url.split('/');
    const preProcessed: string = hashedValue[hashedValue.length - 1];
    const params: string[] = preProcessed.split('-');
    // console.log(params[0], params[1]);
    // console.log(params.length);
    if (params.length >= 2) {
      // console.log(JSON.stringify(getFindValue(params)));
      getFindValue(params);
    } else {
      getS3Value(preProcessed);
    }
  };

  function getS3Value(preProcessed: string) {
    setHashedValue(preProcessed);
  };
  function getFindValue (params: string[]): any {
    axios.post(`${backUrl}/s3/find/`, {
      first_word: params[0],
      second_word: params[1],
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    }).then((res) => {
      setHashedValue(JSON.stringify(res.data));
      return JSON.stringify(res.data);
    })
      .catch((err) => console.log(err));
  };
  window.onbeforeunload = () => {
    pageLeaveTime = getUtcTime();
    console.log('initialLoadedTime: ' + initialLoadedTime + '\n pageLoadedTime: ' + pageLoadedTime + '\n pageLeaveTime: ' + pageLeaveTime);
    setTargetUrl(makeClean(initialLoadedTime, pageLoadedTime, pageLeaveTime, document.referrer));

    // FIXME below message.

    return 'you are going to out of this page!';
  };
  useEffect(() => {
  }, [targetUrl]);
  return (
      <Body >

      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">Loading...</h3>
          </div>
        </header>

        <main className="px-3">

          {!loading &&
            <h1>Please wait a moment.....</h1>
          }
          {loading &&

              <h1>Success Load!!</h1>
          }

          <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit
            the text, and add your own fullscreen background photo to make it your own.</p>

          {loading &&
              <p className="lead">
                <a href={targetUrl} className="btn btn-lg btn-secondary fw-bold border-white bg-gray">Turn the page</a>
              </p>

          }

        </main>

        <footer className="mt-auto text-white-50">
          <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a
              href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
        </footer>
      </div>

      </Body>

  );
};

const Body = styled.div`
  
  
  height: 100vh;
  flex-grow: initial;
  background-color: #232323;
  text-align: center;
  color: antiquewhite;
`;
export default Loading;
