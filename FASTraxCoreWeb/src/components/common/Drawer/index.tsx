import Button from '../Button';
import React from 'react';
import styled from 'styled-components';

export interface FsxDrawerProps {
  testId?: string;
  title?: string;
  isOpen?: boolean;
  className?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  onSubmitPromise?: () => void;
  pos?: 'left' | 'right';
  unMountChildren?: boolean;
  closeOnOutsideClick?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  isReadOnly?: boolean;
}

const StyledWrapper = styled.div`
  @media all and (min-width: 1280px) {
    width: 25vw;
  }

  @media all and (max-width: 1280px) and (min-width: 1024px) {
    width: 35vw;
  }

  @media all and (max-width: 1024px) and (min-width: 768px) {
    width: 40vw;
  }

  @media all and (max-width: 768px) and (min-width: 640px) {
    width: 50vw;
  }

  @media all and (max-width: 640px) and (min-width: 0px) {
    width: 100vw;
  }
`;

const DURATION = 300;
const FSX_DRAWER_WRAPPER_CLASS = 'fsxdrawer__wrapper';

const FsxDrawer: React.FC<FsxDrawerProps> = ({
  testId,
  title,
  isOpen,
  children,
  className,
  onSubmit,
  onSubmitPromise,
  pos = 'right',
  unMountChildren = false,
  closeOnOutsideClick = true,
  onClose,
  isReadOnly
}) => {
  const eventHandler = React.useCallback(
    ({target}: React.MouseEvent) => {
      if (!closeOnOutsideClick) return;

      if (!target) return;

      if (!onClose) return;

      const el = target as HTMLElement;

      if (el.classList.contains(FSX_DRAWER_WRAPPER_CLASS)) return onClose();
    },
    [closeOnOutsideClick, onClose],
  );

  const handleSubmit = React.useCallback(() => {
    if (onSubmit) return onSubmit();

    if (onSubmitPromise) return onSubmitPromise();
  }, [onSubmit, onSubmitPromise]);

  return (
    <div
      onDrop={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragOver={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={e => closeOnOutsideClick && eventHandler(e)}
      className={`
        ${FSX_DRAWER_WRAPPER_CLASS}
        fixed
        top-0
        left-0
        h-screen
        w-screen
        ${isOpen ? `visible` : `invisible`}
      `}
      style={{backgroundColor: `#00000080`, zIndex: isOpen ? 100 : 20}}>
      <div className={`fsx_drawer_container flex flex-row justify-right`}>
        <StyledWrapper
          className={`
          ${isOpen ? `translate-x-0` : `${pos === 'left' ? '-' : ''}translate-x-full`}
          top-0
          ${pos}-0
          fixed
          h-screen
          bg-white
          transform
          ease-in-out
          duration-${DURATION}
          delay-100
          transition-all
          ${className}
        `}
          style={{zIndex: 9999}}>
          <div className="flex flex-col flex-shrink w-full h-full">
            <div className="flex flex-row items-center justify-between px-8 py-4 header">
              <span className="text-2xl drawer__title">{title}</span>
              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center p-3 rounded-full hover:bg-gray-300">
                <i className="text-xl ams-cross" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-between flex-1 flex-grow overflow-auto">
              <div className={'flex w-full h-full '} data-testid={testId || 'FsxDrawer'}>
                {unMountChildren && !isOpen ? null : children}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between flex-shrink px-8 py-4">
              {(onSubmit || onSubmitPromise) && (
                <div className="w-full px-5 pb-5">
                  <Button type="button" block oval shadow ripple onClick={handleSubmit} disabled={isReadOnly}>
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </StyledWrapper>
      </div>
    </div>
  );
};

export default React.memo(FsxDrawer);
