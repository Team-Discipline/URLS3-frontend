import axios from "axios";
import backUrl from "../variable/url";
import { rmToken } from "../variable/token";

export const LogOut = async () => {
    await axios.post(`${backUrl}/token/logout/`)
    .then(() => {
        rmToken();
        location.replace("/login");
    }).catch((err) => {
        console.log(err);
    });
};
