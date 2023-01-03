import React from 'react';
import styled from 'styled-components';

interface IProps {
     isBannerVisible?: boolean;
}

const ContentSidebaTopStyled = styled.div<IProps>`
     background: ${(props) => props.theme.bgColor.secondary};
     min-height: 100%;
     ${(props) =>
          props.isBannerVisible ? 'border-top-left-radius: 25px' : ''};
     padding-top: 10px;
     padding-left: 15px;
     flex-shrink: 0;
`;

const ContentSidebarStyled = styled.div<IProps>`
     width: 250px;
     background: ${(props) => props.theme.bgColor.primary};
     flex-shrink: 0;
`;

export const Index: React.FC<IProps> = (props) => {
     return (
          <ContentSidebarStyled {...props}>
               <ContentSidebaTopStyled isBannerVisible={props.isBannerVisible}>
                    {props.children}
               </ContentSidebaTopStyled>
          </ContentSidebarStyled>
     );
};

export default Index;
