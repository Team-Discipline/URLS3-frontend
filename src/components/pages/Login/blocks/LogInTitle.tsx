import React from 'react';
import styled from 'styled-components';

export const LogInTitle = ({ translation }: any) => {
  return (
        <Title className="title">
            <h1>{translation('Sign in')}</h1>
        </Title>
  );
};

const Title = styled.div`
  margin-bottom: 5vh;
`;
