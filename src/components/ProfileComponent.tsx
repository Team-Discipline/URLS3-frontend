import React, { useCallback } from "react";
import styled from "styled-components";
import { ImgUpload, onChange } from "../features/ImgUpload";
import axios from "axios";
import backUrl from "../variable/url";
import { AccessToken } from "../variable/token";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    onClickToggleModal: (v: boolean) => void;
}

const ProfileComponent = ({ onClickToggleModal }: Props) => {
    const user = useSelector((state: RootState) => state.User);
    // 1. getMyUser()로 로그인한 내 정보들과 프로필 이미지 불러옴 (설정한 이미지가 없다면 안나옴)
    // 2. 이미지를 선택하고 업로드를 누르면 이미지가 서버에 저장(ImgUpload)되고 그 이미지는 내 프로필이미지로 설정됨(UpdateProfile)
    // 3. 프로필 창을 닫으면 새로 갱신된 이미지가 프로필 옆에 뜸

    const UpdateProfile = async () => {
        await ImgUpload();
        await axios.post(`${backUrl}/profile/`, {}, {
            headers: {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                Authorization: `Bearer ${AccessToken}`,
            },
        })
        .then(r => {
            console.log("Updated!!");
        }).catch(e => console.log(e));

        window.alert("프로필 이미지 수정완료");
    };

    useCallback(() => {
        void UpdateProfile();
    }, []);

    const closeModal = () => {
        onClickToggleModal(false);
    };
    return (
        <ModalContainer>
            <DialogBox>
                <Header>
                    <h1>Profile</h1>

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
                            <input type="file"
                                   accept="image/jpg,impge/png,image/jpeg,image/gif"
                                   name="profile_img"
                                   onChange={onChange}>
                            </input>
                        </div>
                        <div>
                            <input type="button" value="업로드" onClick={() => {
                                void UpdateProfile();
                            }} />

                        </div>

                    </ImageContainer>

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
