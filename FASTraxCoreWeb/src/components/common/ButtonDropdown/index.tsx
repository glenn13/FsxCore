import React, {useState, useEffect, HTMLAttributes} from 'react';
import styled from 'styled-components';
import DropdownContainer from './DropdownContainer';
import ButtonDropdownItem from './ButtonDropdownItem';
import Button, { IButtonProps } from '@app/components/common/Button';
import _ from 'lodash';

const StyledDiv = styled.div`
  position: relative;
  z-index: 2;
`;

interface ButtonDropdownProps {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  dropPosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  label?: string;
  buttonClassName?: string;
}

export interface ButtonDropdownPropsRef {
  close: () => void;
}

const ButtonDropdown = React.forwardRef<
  HTMLDivElement | null,
  React.HtmlHTMLAttributes<HTMLDivElement> &ButtonDropdownProps & IButtonProps>(({
  children,
  label,
  icon,
  iconPosition = 'left',
  dropPosition = 'bottom-left',
  ...rest
}, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const refDiv = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<any>();

  const handleClickOutside = (event: Event) => {
    if ((refDiv.current && !refDiv.current.contains(event.target as Node) && refDiv.current?.parentElement?.classList[0] !== (event.target as HTMLElement).parentElement?.classList[0]) || isOpen) {
      setIsOpen(false);
    } else {
      const ifAnchorHasClick = refDiv.current && refDiv.current.childNodes && refDiv.current.childNodes[0].nodeName === 'A';

      if (ifAnchorHasClick) setIsOpen(false);
    }
  };

  const buttonProps: IButtonProps = rest;
    
  React.useEffect(() => {
    if (ref && typeof ref === 'function') {
    } else if (ref) {
      ref.current = _.extend(ref.current, {
        close: () => setIsOpen(false),
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <StyledDiv {...rest} ref={ref}>
      <Button type="button" {...buttonProps} className={rest.buttonClassName} onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>
        {label ? <span className={`${rest.reverse ? 'ml-2' : 'mr-2'}`}>{icon}</span> : icon}
        {label}
      </Button>
      <DropdownContainer ref={refDiv} isOpen={isOpen} position={dropPosition} parentRef={buttonRef}>
        {children}
      </DropdownContainer>
    </StyledDiv>
  );
});

export {ButtonDropdown as default, ButtonDropdownItem};
