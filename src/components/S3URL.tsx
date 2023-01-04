import styled from 'styled-components';
import React from 'react';

interface propsType{
  url: string
  s3: string
}
export const S3URL = (props: propsType) => {
  return (
       <S3url>{props.url}:{props.s3}</S3url>
  );
};

const S3url = styled.h3`
  padding: 10px 0;
  font-weight: 300;
  font-size: 20%;
  :hover {
    opacity: 0.9;
    background-color: #FFF5DD;
  }
`;
