import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton, LineIcon, LineShareButton, TwitterIcon,
  TwitterShareButton
} from 'react-share';
import React from 'react';
import styled from 'styled-components';

interface dataType {
  url: string
}

export const Footer = ({ url }: dataType) => {
  return (
      <Container>
        <FacebookShareButton style={{ bottom: '0.5em', position: 'fixed', right: '5em' }} url={url}>
            <FacebookIcon size={30} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        <FacebookMessengerShareButton style={{ bottom: '0.5em', position: 'fixed', right: '7em' }} url={url}
                                      appId={''}>
            <FacebookMessengerIcon size={30} round={true} borderRadius={24}></FacebookMessengerIcon>
        </FacebookMessengerShareButton>
        <TwitterShareButton style={{ bottom: '0.5em', position: 'fixed', right: '9em' }} url={url}>
            <TwitterIcon size={30} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        <LineShareButton style={{ bottom: '0.5em', position: 'fixed', right: '11em' }} url={url}>
            <LineIcon size={30} round={true} borderRadius={24}></LineIcon>
        </LineShareButton>
        <p style={{
          color: 'white',
          bottom: '0.05em',
          position: 'fixed',
          left: '2em',
          fontFamily: 'Arial',
          fontSize: '13px'
        }}>© 2022. Team-Discipline All rights reserved.</p>
    </Container>
  );
};

const Container = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
`;
