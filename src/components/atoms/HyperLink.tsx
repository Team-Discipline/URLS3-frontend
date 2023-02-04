import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface dataType{
  translation: any
  text: string
  address: string
}
export const HyperLink = ({ address, translation, text }: dataType) => {
  return (
        <StyledLink to={address}>{translation(text)}</StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;
