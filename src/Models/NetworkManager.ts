import backUrl from "../variable/url";
import axios, { AxiosError } from "axios";


class NetworkManager {

    static get(
        accessToken: string,
        urlDetails: string,
        completion: (res: any) => void,
    ) {
        const defaultHeader = {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
        };
        const defaultUrl = `${backUrl}/${urlDetails}`;

        axios.get(defaultUrl, { headers: defaultHeader })
        .then(res => completion(res))
        .catch(error => NetworkManager.dealWithError(error));
    }

    static post(
        accessToken: string,
        urlDetails: string,
        body: object,
        completion: (res: any) => void,
    ) {
        const defaultHeader = {
            Authorization: `Bearer ${accessToken}`,
            accept: "application/json",
        };
        const defaultUrl = `${backUrl}/${urlDetails}`;

        axios.post(defaultUrl, body, { headers: defaultHeader })
        .then(res => completion(res))
        .catch(error => NetworkManager.dealWithError(error));
    }

    private static dealWithError(error: AxiosError) {
        // Status code
        // @ts-ignore
        if (400 <= error.response && error.response < 500) { // 4xx
            // @ts-ignore
            if (error.response == 401) { // Not Authorized.
                console.error(`status code: ${error.response}, Not Authorized.`);
                // TODO: 이 에러 뜨면 로그인(인증) 다시 하거나 하는 로직 세워서 구현하기
            } else {
                console.error(error);
            }
        }
        // @ts-ignore
        else if (error.status >= 500) { // 5xx
            console.error(error);
        }
    }
}

export { NetworkManager };