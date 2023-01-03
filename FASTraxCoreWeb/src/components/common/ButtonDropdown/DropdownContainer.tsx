import React, {useRef, useEffect, MutableRefObject} from 'react';
import styled from 'styled-components';
import clx from 'classnames';
import ReactDOM from 'react-dom';

interface IDropdownContainerProps {
  isOpen?: boolean;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  parentRef?: MutableRefObject<HTMLElement>;
}

const DropdownContainerStyled = styled.div<IDropdownContainerProps>`
  z-index: 100;
  position: fixed;
  cursor: default;
  background: #ffffff;
  min-width: 200px;
  border-radius: 9px;
  overflow-x: hidden;
  overflow-y: auto;
  display: none;
  //   box-shadow: 0px 3px 13px -5px var(--shadow-color), 0px 3px 13px -5px #b9b9b9;
  box-shadow: 0 3px 11px -8px #737373;
  border: thin solid #e6e6e6;

  &.open {
    display: flex;
    flex-direction: column;
    -webkit-animation: fadeInUp 250ms both cubic-bezier(0.4, 0, 0.2, 1) !important;
    animation: fadeInUp 250ms both cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
`;

const DropdownContainer = React.forwardRef<HTMLDivElement | null, IDropdownContainerProps & React.HTMLAttributes<HTMLDivElement>>(
  ({children, parentRef, isOpen, className, position, ...rest}, ref) => {
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const topY = parentRef?.current?.parentElement?.getBoundingClientRect().top || 0;
    const heightEl = parentRef?.current?.parentElement?.getBoundingClientRect().height || 0;
    const widthEl = parentRef?.current?.parentElement?.getBoundingClientRect().width || 0;
    const leftX = parentRef?.current?.parentElement?.getBoundingClientRect().left || 0;
    const offsetSpace = 10;

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
      if (ref && typeof ref === 'function') {
      } else if (ref) {
        ref.current = dropDownRef.current;
      }
    }, []);

    const parentRefOffset = {
      top: position && position.toString().includes('bottom') ? topY + heightEl + offsetSpace : 'auto',
      bottom: position && position.toString().includes('top') ? Math.abs(window.innerHeight - topY + offsetSpace) : 'auto',
      right: position && position.toString().includes('right') ? Math.abs(leftX + widthEl - window.innerWidth) : 'auto',
      left: position && position.toString().includes('left') ? leftX : 'auto',
    };

    return (
      <>
        {ReactDOM.createPortal(
          <DropdownContainerStyled
            {...rest}
            ref={dropDownRef}
            style={parentRefOffset}
            className={clx(className, {
              open: isOpen,
            })}>
            {children}
          </DropdownContainerStyled>,
          document.body,
        )}
      </>
    );
  },
);

export {DropdownContainer as default, IDropdownContainerProps};
