import FsxModal, {FsxModalProps} from '../FsxModal';
import Lottie, {Options} from 'react-lottie';
import React, {ReactNode} from 'react';

import Danger from './danger.json';
import Info from './info.json';
import Success from './success.json';
import Warning from './warning.json';
import styles from './confirm-dialog.module.scss';

export interface ConfirmDialogProps extends FsxModalProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
}

const ConfirmDialog = ({title, ...props}: ConfirmDialogProps) => {
  const lottieDefaults: Omit<Options, 'animationData'> = {
    loop: false,
  };

  return (
    <FsxModal size="lg" {...props} className={styles.dialog}>
      {props.type === 'info' && (
        <Lottie height="60px" options={{animationData: Info}} isClickToPauseDisabled />
      )}
      {props.type === 'success' && (
        <Lottie
          height="60px"
          options={{animationData: Success, ...lottieDefaults}}
          isClickToPauseDisabled
        />
      )}
      {props.type === 'warning' && (
        <Lottie
          height="60px"
          options={{animationData: Warning, ...lottieDefaults}}
          isClickToPauseDisabled
        />
      )}
      {props.type === 'danger' && (
        <Lottie
          height="60px"
          options={{animationData: Danger, ...lottieDefaults}}
          isClickToPauseDisabled
        />
      )}
      {title && <h1 className={styles.title}>{title}</h1>}
      {props.children}
    </FsxModal>
  );
};

export default ConfirmDialog;

export interface ConfirmDialogBodyProps {
  children?: ReactNode;
  className?: string;
}

export const ConfirmDialogBody = (props: ConfirmDialogBodyProps) => {
  return <div {...props} />;
};

export interface ConfirmDialogFooterProps {
  children?: ReactNode;
  className?: string;
}

export const ConfirmDialogFooter = (props: ConfirmDialogFooterProps) => {
  return <div className={`${styles.footer} ${props.className ?? ''}`} {...props} />;
};
