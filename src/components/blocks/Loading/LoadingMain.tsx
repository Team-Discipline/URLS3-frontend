import React from 'react';

interface dataType {
  loading: boolean
  targetUrl: string
}
export const LoadingMain = ({ loading, targetUrl }: dataType) => {
  return (
        <main className="px-3">
            {
                (() => {
                  if (loading && targetUrl !== '') {
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
  );
};
