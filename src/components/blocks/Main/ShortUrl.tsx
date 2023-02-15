import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import QR from 'qrcode.react';

interface dataType {
  copied: boolean
  copy: () => void
  translation: any
  copyUrl: string
  qrVision: boolean
  url: string
}

export const ShortUrl = ({ copied, copy, translation, copyUrl, qrVision, url }: dataType) => {
  return (
        <Url>
          <LinkBox>
            <Link className="slink" >{copyUrl}</Link>
            {copied
              ? <Button size={'medium'} variant={'contained'} color={'success'}>{translation('copied')}</Button>
              : <Button size={'medium'} onClick={copy} variant={'outlined'}>{translation('copy')}</Button>}
          </LinkBox>
            {qrVision
              ? <QR id="qr-gen" size={100} value={url} includeMargin={false} fgColor={'black'}
                      style={{ margin: '1px' }}/>
              : <QRDiv></QRDiv>}
        </Url>
  );
};

const Url = styled.div`
  flex: 1;
  border: black 1px solid;
  font-weight: 400;
  outline: none;
  font-size: 20px;
`;
const LinkBox = styled.div`
  display: flex;
  width:100%;
  align-items: center;
`;
const Link = styled.div`
  font-weight: 400;
  border: #1d1d1f 0.1rem solid;
  border-radius: 8px;
  outline: none;
  width: 80%;
  height: auto;
  margin-left: 10px;
`;
const QRDiv = styled.div`
  height: 100px;
  width: 100px;
  display: inline-block;

`;