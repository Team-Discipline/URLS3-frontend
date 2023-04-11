import React from 'react';
import styled from 'styled-components';

interface dataType{
  translation: any
  title: string
}
export const SignTitle = ({ ...data }: dataType) => {
  return (
        <Title className="title">
            <h1>{data.translation(data.title)}</h1>
        </Title>
  );
};

const Title = styled.div`
  margin-bottom: 5vh;
`;
