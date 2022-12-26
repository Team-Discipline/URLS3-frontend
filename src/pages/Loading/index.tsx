
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUtcTime, makeClean } from './GetCaptureData';
import axios from 'axios';
import { backUrl } from '../../variable/url';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoadedTime, setInitalLoadedTime] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('');
  const [pageLoadedTime, setPageLoadedTime] = useState<string>('');
  const [pageLeaveTime, setPageLeaveTime] = useState<string>('');
  const [HashedValue, setHashedValue] = useState<string>('');

  const GetHashedValue = async () => {
    const Pathname: string = window.location.pathname.substring(1);
    console.log(Pathname);
    if (Pathname.includes('-')) {
      const Words = Pathname.split('-');
      await axios.post(`${backUrl}/s3/find/`, {
        first_word: Words[0],
        second_word: Words[1]
      })
        .then((res) => {
          setHashedValue(res.data.hashed_value);
        })
        .catch((e) => console.log(e));
    } else {
      setHashedValue(Pathname);
    }
  };

  const WaitLoading = () => {
    setTimeout(() => {
      console.log('Loading Button');
      setPageLoadedTime(getUtcTime());
      setPageLeaveTime(getUtcTime());
      setLoading(true);
    }, 7000);
  };

  useEffect(() => {
    void GetHashedValue();
    setInitalLoadedTime(getUtcTime());
  }, []);
  useEffect(() => {
    if (HashedValue !== '') {
      console.log('initialLoadedTime: ' + initialLoadedTime +
          '\n pageLoadedTime: ' + pageLoadedTime +
          '\n pageLeaveTime: ' + pageLeaveTime);

      void makeClean(getUtcTime(), getUtcTime(), getUtcTime(), document.referrer)
      // getUtcTime() 자리들은 차례대로 initialLoadedTime, pageLoadedTime, pageLeaveTime 가 오는 게 맞지만
        .then(value => {
          const ws = new WebSocket(`ws://api.urls3.kreimben.com/ws/ad_page/${HashedValue}/`);
          ws.onerror = function (event) {
            console.log(event);
          };
          ws.onopen = function (event) {
            console.log('captured :', value);
            ws.send(JSON.stringify({ captured_data: value }));
          };
          ws.onmessage = res => {
            const jsonData = JSON.parse(res.data);
            console.log('response msg:', res.data);
            if (jsonData.success === true) {
              console.log('target_url:', jsonData.target_url);
              setTargetUrl(jsonData.target_url);
              console.log(targetUrl);
              ws.close();
            }
          };
        });

      WaitLoading();
    }
  }, [HashedValue]);
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

          {
            (() => {
              if (targetUrl !== '') {
                if (targetUrl === '/') return (<h1>Failed to Load..</h1>);
                if (targetUrl !== '/') return (<h1>Success Load!!</h1>);
              } else { return (<h1>Please wait a moment.....</h1>); }
            })()
          }

          <h4><p className="lead">If you succeed in loading the page, you can go to the original page, <br></br> but if it fails, you can go to the main page.</p></h4>

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
