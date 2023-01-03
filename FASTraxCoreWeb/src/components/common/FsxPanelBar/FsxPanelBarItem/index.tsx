import React from 'react';
import styled from 'styled-components';
import {MotionProps, motion} from 'framer-motion';

const StyledPanelBarItem = styled.div``;

const StyledPanelBarItemTitle = styled.div`
  color: #4f5761;
  background-color: #ffffff;
  padding: 15px 20px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

const StyledPanelBarItemContent = motion.custom(styled.div<{expanded: boolean}>`
  background-color: #ffffff;
  display: ${props => (props.expanded ? 'flex' : 'none')};
`);

export interface FsxPanelBarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  expanded?: boolean;
}

const FsxPanelBar: React.FC<FsxPanelBarProps> = ({
  children,
  className,
  title,
  expanded = false,
  ...props
}) => {
  const [itemCollapsed, setItemCollapsed] = React.useState<boolean>(!expanded);
  const variants = {
    hidden: {opacity: 0, y: -2},
    visible: {opacity: 1, y: 0},
  };

  return (
    <StyledPanelBarItem {...props} className={`fsxpanelbar-item ${className}`}>
      <StyledPanelBarItemTitle onClick={() => setItemCollapsed(!itemCollapsed)}>
        <div className="flex flex-row">
          <div className="flex-grow">{title}</div>
          <div className="flex-shrink">
            <span className={`k-icon k-i-arrow-60-${itemCollapsed ? 'down' : 'up'}`}></span>
          </div>
        </div>
      </StyledPanelBarItemTitle>
      <StyledPanelBarItemContent
        expanded={!itemCollapsed}
        initial={itemCollapsed ? 'hidden' : 'visible'}
        animate={itemCollapsed ? 'hidden' : 'visible'}
        transition={{duration: 1.2}}
        variants={variants}>
        {children}
      </StyledPanelBarItemContent>
    </StyledPanelBarItem>
  );
};

export default FsxPanelBar;
