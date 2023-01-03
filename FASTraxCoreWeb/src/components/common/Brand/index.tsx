import React from 'react';
import styled from 'styled-components';

interface IProps {
  logo?: string;
  children: React.SVGProps<SVGSVGElement>;
}

const BrandStyle = styled.div<IProps>`
  flex-grow: 0;
  flex-shrink: 0;
  padding: 8px 10px;
  height: 77px;
`;

export const Index: React.FC<IProps> = props => {
  return <BrandStyle {...props}>{props.children}</BrandStyle>;
};

export default Index;
