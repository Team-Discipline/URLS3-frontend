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
export function makeClean (initialLoadedTime: string, pageLoadedTime: string, pageLeaveTime: string, refererUrl: string): string {
  const bodyContent = {
    s3: 'https://urls3.kreimben.com/1965dd',
    js_request_time_UTC: initialLoadedTime,
    page_loaded_time: pageLoadedTime,
    page_leave_time: pageLeaveTime,
    referer_url: refererUrl
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
      // const ws = new WebSocket('ws://<backUrl>/ws/ad_page/<str:hashed_value>/');
      // ws.send(JSON.stringify({ captured_data: json.data.id }));
      // ws.onmessage = res => {
      //   console.log(res);
      //   return res.data.target_url;
      // };
      // ws.close();
    });
  return '0';
}

/// https://skalman.github.io/UglifyJS-online/
