
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { ImgUpload, onChange } from '../features/ImgUpload';
import axios from 'axios';
import { backUrl } from '../variable/url';
import { AccessToken } from '../variable/token';
import { storeThumbnail } from '../redux/slices/ThumbnailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { storeImage } from '../redux/slices/ImageSlice';

interface Props{
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onClickToggleModal: (v: boolean) => void
}

const ProfileComponent = ({ onClickToggleModal }: Props) => {
  const thumbnail = useSelector((state: RootState) => state.Thumbnail.url);
  const image = useSelector((state: RootState) => state.Image.id);
  const user = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();
  // 1. getMyUser로 로그인한 내 정보들 불러옴
  //   2. 위에서 불러온 pk로 ReadProfile() 실행, 썸네일 주소 리덕스에 저장
  //   3. 썸네일 주소로 image 주소(get) 저장
  //   4.UpdateProfile로 프로필 업데이트 후  위에서 불러온 image
  const GetImg = async () => {
    // const thumbnail = useAppSelector(state => state.ThumbnailReducer);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    await axios.get(`${thumbnail}`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`
      }
    })
      .then(r => { dispatch(storeImage(r.data.image)); })
      .catch(err => console.log(err));
  };
  const UpdateProfile = async () => {
    await axios.post(`${backUrl}/profile/`, {}, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`
      }
    })
      .then(r => {
        dispatch(storeThumbnail(' '));
        console.log('Updated!!');
      });
  };
  const ReadProfile = async () => {
    console.log(user.pk);
    if (user.pk !== -1) {
      await axios.get(`${backUrl}/profile/${user.pk}/`, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          Authorization: `Bearer ${AccessToken}`
        }
      })
        .then(r => { dispatch(storeThumbnail(r.data.thumbnail)); })
        .catch(err => console.log(err));
    }
  };
  useCallback(() => {
    void UpdateProfile();
  }, []);
  useEffect(() => {
    void ReadProfile();
    void GetImg();
    console.log(image);
  }, [thumbnail]);
  const closeModal = () => {
    onClickToggleModal(false);
  };

  return (
      <ModalContainer>
          <DialogBox>
              <Header>
                  <h1>Profile Update</h1>

                  <Close onClick={closeModal}>
                      X
                  </Close>
              </Header>
              <BodyContainer>
                  <h3>pk: {user.pk}</h3>
                  <h3>username: {user.username}</h3>
                  <h3>email: {user.email}</h3>
                  <h3>first_name: {user.first_name}</h3>
                  <h3>last_name: {user.last_name}</h3>
                  <ImageContainer>
                      <div>
                          <input type='file'
                                 accept='image/jpg,impge/png,image/jpeg,image/gif'
                                 name='profile_img'
                                 onChange={onChange}>
                          </input>
                      </div>
                      <div>
                          <input type='button' value ='업로드' onClick={() => { void ImgUpload(); }}/>
                      </div>
                  </ImageContainer>
                  <img src={image}/>
                  <input type='button' value ='확인' onClick={() => { void UpdateProfile(); }} />
              </BodyContainer>

          </DialogBox>
      </ModalContainer>
  );
};
const ModalContainer = styled.div`
  top: 50px;
  left: 250px;
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  position: fixed;
`;
const Header = styled.div`
    justify-content: space-between;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;`;
const BodyContainer = styled.div`
  
  justify-content: space-between;
`;
const Close = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  `;
const DialogBox = styled.dialog`
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;
export default ProfileComponent;
