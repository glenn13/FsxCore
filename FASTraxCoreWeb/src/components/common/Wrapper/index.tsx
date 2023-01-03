import React from 'react';
import styled from 'styled-components';

interface IProps {}

const WrapperLayout = styled.div`
  height: 100vh;
  width: 100wh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  position: relative;
  background-color: ${props => props.theme.content.bgColor};

  --text-color: ${props => props.theme.text.color};
  --panel-bg-color: ${props => props.theme.panel.bgColor};
  --shadow-color: ${props => props.theme.shadow.color};
`;

export const Index: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return <WrapperLayout {...props}>{props.children}</WrapperLayout>;
};

export default Index;
