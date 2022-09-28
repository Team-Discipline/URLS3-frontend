import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { S3URL } from './S3URL';
import { backUrl } from '../variable/url';
import axios from 'axios';
import { AccessToken } from '../variable/token';

const SideBarWrap = styled.div`
  z-index: 5; 
  
  background-color: #e7e4e1; 
  height: 100%;  width:20%;  
  left: 0;  top: 57px;  
  position: fixed;  
  transition: 0.5s ease;  &.open {    right: 0;    transition: 0.5s ease;  }`;
const Links = styled.div`

  font-size: 12px;

  align-items: center;
  cursor: pointer;
  
  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
  
`;
interface S3{
  url: string
  issuer: number

  s3_url: string

  target_url: string

  created_at: string

  updated_at: string

}
const AnalyticsSidebar = () => {
  const [S3List, setS3List] = useState<S3[]>([]);
  const getS3List = async () => {
    await axios.get(`${backUrl}/s3/`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`
      }
    }

    ).then(r => {
      setS3List(r.data);
    }).catch(e => console.log(e));
  };

  useEffect(() => {
    void getS3List();
  }, []);
  return (
      <SideBarWrap>
              <Links>
                  <S3URL url="url" s3="s3"/>
                  {
                      S3List.map(s3 => {
                        return (
                        // eslint-disable-next-line react/jsx-key
                              <S3URL url={s3.target_url} s3={s3.url}/>
                        );
                      })

                  }

              </Links>
  </SideBarWrap>
  );
};
export default AnalyticsSidebar;
