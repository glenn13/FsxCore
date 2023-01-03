import React from 'react';
import styled from 'styled-components';
import clx from 'classnames';
import {useAppStore} from '@app/providers/app.store';

interface IProps {
  position?: 'right' | 'left';
  width?: Number;
  className?: string;
  flat?: boolean;
}

const AsideLayout = styled.aside<IProps>`
  position: relative;
  z-index: 1;
  display: flex;
  background: ${props => props.theme.sidebar.bgColor};
  ${props => (props.flat ? `display: flex; flex: 1;` : `height: 100vh;`)}
  width: ${props => (props.width ? props.width + 'px' : '15em')};
  max-width: 300px;
  order: ${props => (props.position === 'right' ? 1 : 0)};
  flex-direction: column;
  box-shadow: ${props => (props.flat ? `0` : `3px 0 13px -3px ${props.theme.shadow.color}`)};
  flex-shrink: 0;
`;

export const Index: React.FC<IProps> = ({className, children, ...props}) => {
  const {mobile, tablet, sidebarOpen, toggleSidebar} = useAppStore();
  return (
    <>
      <div
        className={clx('sidebarOverlay', {
          'sidebar-mobile-overlay-show': (mobile || tablet) && sidebarOpen,
        })}
        onClick={() => toggleSidebar()}
      />
      <AsideLayout {...props} className={className}>
        {children}
      </AsideLayout>
    </>
  );
};

export default Index;
