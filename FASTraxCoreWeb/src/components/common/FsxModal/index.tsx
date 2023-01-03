import * as ReactDom from 'react-dom';

import {AnimatePresence, motion} from 'framer-motion';
import React, {forwardRef, useEffect, useRef} from 'react';

import {SvgIcon} from '..';
import styles from './fsx-modal.module.scss';

export interface FsxModalProps {
  /**
   * Modal state.
   */
  isOpen?: boolean;
  /**
   * On close callback.
   */
  onClose?: () => void;
  /**
   * On open callback.
   */
  onOpen?: () => void;
  /**
   * Modal size. defaults 2xl
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  /**
   * Modal title.
   */
  title?: string;
  /**
   * React children.
   */
  children?: React.ReactNode;
  /**
   * Class names.
   */
  className?: string;
}

const FsxModal = (props: FsxModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    props.onClose && props.onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') props.onClose && props.onClose();
  };

  useEffect(() => {
    if (props.isOpen) modalRef.current?.focus();
  }, [props.isOpen]);

  return (
    <AnimatePresence>
      {props.isOpen && (
        <FsxModalBox
          ref={modalRef}
          className={props.className}
          onClick={onClose}
          size={props.size}
          onKeyDown={onKeyDown}
          title={props.title}>
          {props.children}
        </FsxModalBox>
      )}
    </AnimatePresence>
  );
};

interface FsxModalBoxProps {
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  title?: string;
  className?: string;
}

const FsxModalBox = forwardRef<HTMLDivElement, FsxModalBoxProps>(
  ({size = '2xl', title, className, ...props}, ref) => {
    const overlay = {
      visible: {opacity: 1},
      hidden: {opacity: 0},
    };

    const modal = {
      visible: {scale: 1},
      hidden: {scale: 0.3},
    };

    return ReactDom.createPortal(
      <motion.div
        key="container"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlay}
        className={`${styles.overlay} bg-gray-600 bg-opacity-50 flex items-center justify-center flex-col`}
        {...props}>
        <motion.div
          key="modal"
          ref={ref}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modal}
          className={`${styles.modal} w-full max-w-${size}  bg-white rounded-lg shadow-lg `}
          onClick={e => {
            e.stopPropagation();
          }}
          tabIndex={0}
          onKeyDown={props.onKeyDown}>
          {title && (
            <div className="border-b">
              <div className="flex p-4">
                <h1 className="text-3xl">{title}</h1>
                <button
                  className="ml-auto focus:ring"
                  tabIndex={1}
                  onClick={() => {
                    props.onClick && props.onClick();
                  }}>
                  <SvgIcon size={16} color="#4f5761" svgId="cross" />
                </button>
              </div>
            </div>
          )}
          <div className={`p-4 ${className ?? ''}`}>{props.children}</div>
        </motion.div>
      </motion.div>,
      document.body,
    );
  },
);

export default FsxModal;
