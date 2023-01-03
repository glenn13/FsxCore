import React from 'react';
import styled from 'styled-components';
import clx from 'classnames';

interface IProps {
  className?: string;
  styles?: React.CSSProperties;
  boxed?: boolean;
}

const ContentStyled = styled.div<IProps>`
  flex: 1;
`;

export const Index: React.FC<IProps> = ({children, className, styles, boxed, ...rest}) => {
  return (
    <ContentStyled
      className={`${clx(className, {
        'lg:container lg:mx-auto': boxed,
      })}`}
      style={styles}
      {...rest}>
      {children}
    </ContentStyled>
  );
};

export default Index;
