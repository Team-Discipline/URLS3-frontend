import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { S3URL } from './S3URL';
import { backUrl } from '../variable/url';
import axios from 'axios';
import { AccessToken } from '../variable/token';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { countryRefine } from '../redux/slices/CountrySlice';


const SideBarWrap = styled.div`
  z-index: 1; 
  
  background-color: #e7e4e1; 
  height: 100%;  width:20%;  
  left: 0;  top: 57px;  
  position: absolute;  
  transition: 0.5s ease;  &.open {    right: 0;    transition: 0.5s ease;  }`;
const Links = styled.div`
  align-items: center;
  cursor: pointer;
  
  > h3 {
    font-weight: 500;
    word-break: break-all;
  }
  > h3 > span {
    padding: 15px;
  }
  
`;
interface S3{
  id: string
  url: string
  issuer: number
  s3_url: string
  target_url: string
  created_at: string
  updated_at: string

}
interface id{
  id: number
  ip_address: string
  s3: object
  js_request_time_UTC: string
  page_loaded_time: string
  page_leave_time: string
  referer_url: string
  created_at: string
  country: string
  city: string
  latitude: number
  longitude: number
}

const AnalyticsSidebar = () => {
  const [S3List, setS3List] = useState<S3[]>([]);
  const [idList, setIdList] = useState<id[]>([]);
  const user = useSelector((state: RootState) => state.User);

  const dispatch = useDispatch();

  const refine = () => {
    const arr = idList;
    const countryArr: {[index: string]: number} = {};
    for (let i = 0; i < arr.length; i++) {
      const a: string = `${arr[i].city}`;
      if (!(a in countryArr)) {
        countryArr[a] = 1;
      } else {
        countryArr[a] += 1;
      }
    }
    const sortable = Object.fromEntries(Object.entries(countryArr).sort(([, a], [, b]) => b - a));
    dispatch(countryRefine(sortable));
  };

  const getS3List = async () => {
    await axios.get(`${backUrl}/s3/`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`
      }
    }

    ).then(r => {
      setS3List(r.data);
      console.log(r);
    }).catch(e => console.log(e));
  };

  const s3Id = async (id: string) => {
    await axios.get(`${backUrl}/analytics/${id}/`, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`
      }
    }
    ).then(r => {
      setIdList(r.data);
    }).then(() => {
      refine();
    }).catch(e => console.log(e));
  };

  useEffect(() => {
    void getS3List();
  }, []);
  return (
      <SideBarWrap>
              <Links>
                  {
                      S3List.filter(s3 => s3.issuer === user.pk).map(s3 => {
                        return (
                        // eslint-disable-next-line react/jsx-key
                            <Button key={s3.id} onClick={async () => (await s3Id(s3.id))} size={'large'} variant={'contained'} color={'secondary'}><S3URL url={s3.target_url} s3={s3.s3_url}/></Button>
                        );
                      })

                  }

              </Links>
  </SideBarWrap>
  );
};
export default AnalyticsSidebar;
