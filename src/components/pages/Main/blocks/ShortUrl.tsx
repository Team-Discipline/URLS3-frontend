import Button from '@mui/material/Button';
import React from 'react';
import styled from 'styled-components';
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
        <Url style={{ backgroundColor: 'white' }}>
        <Link className="slink" style={{ height: '40px', marginTop: '20%' }}>{copyUrl}</Link>
        {copied
          ? <Button variant={'contained'} color={'success'}>{translation('copied')}</Button>
          : <Button onClick={copy} variant={'outlined'}>{translation('copy')}</Button>}
          {qrVision
            ? <QR id="qr-gen" size={100} value={url} includeMargin={false} fgColor={'black'}
                    style={{ margin: '1px' }}/>
            : <QRDiv></QRDiv>}
    </Url>
  );
};

const Url = styled.div`
  display: inline-flex;
  font-weight: 400;
  outline: none;
  //width:40%;
  height: 40%;
  font-size: 20px;
  margin-top: 4%;
`;
const Link = styled.div`
  font-weight: 400;
  border: #1d1d1f 0.1rem solid;
  border-radius: 8px;
  outline: none;
  //width: auto;
  min-width: 500px;
  height: auto;
  margin: 10px;
`;
const QRDiv = styled.div`
  height: 100px;
  width: 100px;
  display: inline-block;

`;
