import React from 'react';
import styled from 'styled-components';

interface IProps {}

const IconStyled = styled.i<IProps>``;

export const Index: React.FC<IProps> = (props) => {
     return <IconStyled {...props}>{props.children}</IconStyled>;
};

export default Index;
