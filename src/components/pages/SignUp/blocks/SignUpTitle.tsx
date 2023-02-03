import React from 'react';
import styled from 'styled-components';

interface dataType{
  translation: any
}
export const SignUpTitle = ({ translation }: dataType) => {
  return (
        <Title className="title">
            <h1>{translation('signup')}</h1>
        </Title>
  );
};

const Title = styled.div`
  margin-bottom: 5vh;
`;
