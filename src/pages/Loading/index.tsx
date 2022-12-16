
import React, { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    if (
      document.querySelector(
        'script[src=\'./GetUserData.js\']'
      ) != null
    ) { return; }

    const script = document.createElement('script');
    script.src = './GetUserData.js';
    script.async = true;
    document.body.appendChild(script);
  });

  return (
      <body className="d-flex h-100 text-center text-bg-dark">

      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="mb-auto">
          <div>
            <h3 className="float-md-start mb-0">Loading...</h3>
          </div>
        </header>

        <main className="px-3">
          <h1>Cover your page.</h1>
          <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit
            the text, and add your own fullscreen background photo to make it your own.</p>
          <p className="lead">
            <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
          </p>
        </main>

        <footer className="mt-auto text-white-50">
          <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a
              href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
        </footer>
      </div>

      </body>

  );
};

export default Loading;
