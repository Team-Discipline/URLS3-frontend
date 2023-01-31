import axios from "axios";
import { useDispatch } from "react-redux";
import backUrl from "../variable/url";
import { AccessToken } from "../variable/token";
import { storeUser } from "../redux/slices/UserSlice";
import { storeImage } from "../redux/slices/ImageSlice";

export const getMyUser = async () => {
    const dispatch = useDispatch();
    await axios.get(`${backUrl}/token/user/`, {
        headers: {
            Authorization: `Bearer ${AccessToken}`,
        },
    })
    .then((r) => {
        dispatch(storeUser(r.data));
    })
    .catch((err) => {
        console.log(err);
    });
    await axios.get(`${backUrl}/profile/image/`, {
        headers: {
            Authorization: `Bearer ${AccessToken}`,
        },
    })
    .then((r) => {
        dispatch(storeImage(r.data.image));
    })
    .catch((err) => console.log(err));
};
