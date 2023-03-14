import {backUrl} from "../../../variable/url";

export const getUtcTime = () => {
    let date = new Date();
    const nowUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
        date.getUTCDate(), date.getUTCHours(),
        date.getUTCMinutes(), date.getUTCSeconds());

    date = new Date(nowUtc);
    // console.log(`date: ${date.toISOString()}`);
    return date.toISOString();
};

export const makeClean = async (initialLoadedTime: string, pageLoadedTime: string, pageLeaveTime: string, refererUrl: string) => {
    let result: string = "";

    const bodyContent = {
        s3: "https://urls3.kreimben.com/reliable-direction",
        // (test) window.location로 수정해야함, 매번 collect되는 s3데이터가됨
        js_request_time_UTC: initialLoadedTime,
        page_loaded_time: pageLoadedTime,
        page_leave_time: pageLeaveTime,
        referer_url: refererUrl,
    };
    const fetch_init = {
        method: "post",
        // mode: 'no-cors',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
    };

    // console.log(`fetch_init: ${JSON.stringify(fetch_init)}`);
    await fetch(`${backUrl}/collect/`,
        fetch_init,
    )
        .then(async res => await res.json())
        .then(json => {
            // console.log(`result json: ${JSON.stringify(json)}`);
            result = json.id;
        })
        .catch(e => {
            console.log(e);
        });

    return result;
};

/// https://skalman.github.io/UglifyJS-online/
