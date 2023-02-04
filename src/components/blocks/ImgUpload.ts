
import axios from 'axios';
import { backUrl } from '../../variable/url';
import { AccessToken } from '../../variable/token';

export const formData = new FormData();
export const ImgUpload = async () => {
  await axios.post(`${backUrl}/profile/image/`, {
    image: formData.get('file')
  }, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  }).then(() => { console.log('ImgUpload'); }).catch((err) => { console.log(err); });
};

export const onChange = (e: any) => {
  formData.delete('file');
  const img = e.target.files[0];

  formData.append('file', img);
  console.log(img);
};
