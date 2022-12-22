
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUtcTime, makeClean } from './GetCaptureData';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const initialLoadedTime = getUtcTime();
  const [targetUrl, setTargetUrl] = useState<string>();
  let pageLoadedTime: string;
  let pageLeaveTime: string;
  const WaitLoading = () => {
    setTimeout(() => { console.log('Loading Button'); setLoading(true); }, 3000);
  };
  useEffect(() => {
    WaitLoading();
  }, []);
  window.addEventListener('load', function () {
    pageLoadedTime = getUtcTime();
  });

  window.onbeforeunload = () => {
    pageLeaveTime = getUtcTime();
    setTargetUrl(makeClean(initialLoadedTime, pageLoadedTime, pageLeaveTime));

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
          <h1>Please wait a moment.....</h1>
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
