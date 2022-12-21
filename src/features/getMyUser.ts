
import axios from 'axios';
import { backUrl } from '../variable/url';
import { AccessToken } from '../variable/token';
import { storeUser } from '../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { storeImage } from '../redux/slices/ImageSlice';

export const getMyUser = async () => {
  const dispatch = useDispatch();
  await axios.get(`${backUrl}/token/user/`, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${AccessToken}`
    }
  })
    .then(r => {
      dispatch(storeUser(r.data));
    })
    .catch((err) => { console.log(err); });
  await axios.get(`${backUrl}/profile/image/`, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${AccessToken}`
    }
  })
    .then(r => { dispatch(storeImage(r.data.image)); })
    .catch(err => console.log(err));
};
