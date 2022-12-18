import { backUrl } from '../../variable/url';

export const getUtcTime = () => {
  let date = new Date();
  const nowUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
    date.getUTCDate(), date.getUTCHours(),
    date.getUTCMinutes(), date.getUTCSeconds());

  date = new Date(nowUtc);
  console.log(`date: ${date.toISOString()}`);
  return date.toISOString();
};

export const makeClean = (initialLoadedTime: string, pageLoadedTime: string, pageLeaveTime: string) => {
  console.log('on make_clean function');
  const bodyContent = {
    s3: window.location,
    js_reqeust_time_UTC: initialLoadedTime,
    pageLoadedTime,
    pageLeaveTime,
    referer_url: document.referrer
  };
    // eslint-disable-next-line @typescript-eslint/naming-convention
  const fetch_init = {
    method: 'post',
    // mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyContent)
  };
  console.log(`fetch_init: ${JSON.stringify(fetch_init)}`);
  void fetch(`${backUrl}/collect/`,
    fetch_init
  )
    .then(async res => await res.json())
    .then(json => {
      console.log(`result json: ${JSON.stringify(json)}`);
    });
};

/// https://skalman.github.io/UglifyJS-online/
