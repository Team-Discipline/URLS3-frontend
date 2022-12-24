
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUtcTime, makeClean } from './GetCaptureData';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoadedTime, setInitalLoadedTime] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('/analytics');
  const [pageLoadedTime, setPageLoadedTime] = useState<string>('');
  const [pageLeaveTime, setPageLeaveTime] = useState<string>('');

  const WaitLoading = () => {
    setTimeout(() => {
      console.log('Loading Button');
      setLoading(true); setPageLoadedTime(getUtcTime());
      setPageLeaveTime(getUtcTime());
    }, 3000);
  };
  useEffect(() => {
    setInitalLoadedTime(getUtcTime());
    WaitLoading();
  }, []);
  useEffect(() => {
    if (initialLoadedTime !== '' && pageLoadedTime !== '' && pageLeaveTime !== '') {
      console.log('initialLoadedTime: ' + initialLoadedTime + '\n pageLoadedTime: ' + pageLoadedTime + '\n pageLeaveTime: ' + pageLeaveTime);
      setTargetUrl(makeClean(initialLoadedTime, pageLoadedTime, pageLeaveTime, document.referrer));
    }
  }, [loading]);

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
          {loading && targetUrl !== '/' &&

              <h1>Success Load!!</h1>
          }
          {loading && targetUrl === '/' &&

              <h1>Failed to Load..</h1>

          }

          <p className="lead"><h4>If you succeed in loading the page, you can go to the original page, <br></br> but if it fails, you can go to the main page.</h4></p>

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
