import React from 'react';
import styled from 'styled-components';
import {motion, HTMLMotionProps} from 'framer-motion';
import Waves, {ElementSelector} from 'node-waves';

export interface ReportTileItemProps {}

const ProjectItem = motion.custom(styled.div`
  position: relative;
  //   padding: 15px 20px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  box-shadow: 0px 3px 13px -5px var(--shadow-color);
  background: #45505a;

  position: relative;
  transition: background 0.3s ease-in, box-shadow 0.1s ease-in;
  user-select: none;

  &:hover {
    cursor: pointer;
    // box-shadow: 0px 14px 25px -2px var(--shadow-color);
    box-shadow: 0px 14px 25px -2px #a0a0a0;
  }

  &:before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    top: 60px;
    left: 0;
  }
`);

const ReportTileItem: React.FC<
  {} & React.HtmlHTMLAttributes<HTMLDivElement> & HTMLMotionProps<'div'>
> = ({children, ...props}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    Waves.attach(itemRef.current as ElementSelector, ['waves-light']);
    Waves.init();
  }, []);

  return (
    <ProjectItem ref={itemRef} {...props}>
      {children}
    </ProjectItem>
  );
};

export default React.memo(ReportTileItem);
