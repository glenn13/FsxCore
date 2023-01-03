import {MotionProps, motion} from 'framer-motion';
import React, {HTMLAttributes} from 'react';

import classNames from 'classnames';
import defaultTheme from '@app/theme/presets/base';
import invert from 'invert-color';
import styled from 'styled-components';

const color = require('color');

type ColorsType = typeof defaultTheme.color;

export interface IToastAlertProps {
  title?: string;
  type?: keyof ColorsType;
  message: string;
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'bottom-center';
  onClose?: () => void;
}

const ToastStyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  display: flex;

  padding: 15px;
  height: 100%;
  width: 100%;

  &.top-center {
    justify-content: center;
    align-items: flex-start;
  }

  &.top-left {
    justify-content: flex-start;
    align-items: flex-start;
  }

  &.top-right {
    justify-content: flex-end;
    align-items: flex-start;
  }

  &.bottom-left {
    justify-content: flex-start;
    align-items: flex-end;
  }

  &.bottom-right {
    justify-content: flex-end;
    align-items: flex-end;
  }

  &.bottom-center {
    justify-content: center;
    align-items: flex-end;
  }
`;

const ToastStyled = motion.custom(styled.div<IToastAlertProps>`
  //   position: fixed;
  position: relative;
  z-index: 1000;
  display: flex;
  align-items: center;
  min-width: 300px;
  border-radius: 4px;
  padding: 15px 20px;
  box-shadow: 0 13px 13px -8px rgba(162, 162, 162, 0.09), 0 3px 18px 0px rgba(0, 0, 0, 0.1);
  background: ${props => invert(props.theme.color.primary)};
  border-left: ${props => props.type && '5px solid' + props.theme.color[props.type]};
  min-height: 60px;

  span.toast-close {
    font-size: 8pt;
    color: #c5c5c5;
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
  }
`);

const ToastTitleStyled = styled.div`
  font-size: 12pt;
  font-weight: 500;
  margin-bottom: 5px;
`;

const ToastMessageStyled = styled.div`
  font-size: 9pt;
  font-weight: 300;
  color: #3e3e3e;
  padding-right: 23px;
  width: 220px;
  word-break: break-word;
`;

const ToastIconStyled = styled.i<{type?: keyof ColorsType}>`
  margin-right: 20px;
  font-size: 15px;
  position: relative;
  color: white;
  &:after {
    position: absolute;
    content: '';
    height: 30px;
    width: 30px;
    background: ${props => props.type && color(props.theme.color[props.type]).lighten(0.1)};
    box-shadow: ${props => props.type && '0px 5px 10px -5px ' + props.theme.color[props.type]};
    border-radius: 30px;
    top: -7px;
    left: -8px;
    z-index: -1;
  }
`;

// !!! This interface is not inuse
interface ComponentWithStaticMethod<IToastAlertProps> extends React.FC<IToastAlertProps> {}

class Toast extends React.Component<
  IToastAlertProps & HTMLAttributes<HTMLDivElement> & MotionProps
> {
  private toastRef = React.createRef<HTMLDivElement>();

  state: Readonly<IToastAlertProps & {visible: boolean}> = {
    visible: true,
    message: '',
  };

  handleClose = () => {
    this.setState({visible: false});
    this.props.onClose && this.props.onClose();
  };
  variants = {
    hidden: {opacity: 0, y: -50},
    visible: {opacity: 1, y: 0},
  };

  showAlert = () => this.setState({visible: true});

  render() {
    return (
      this.state.visible && (
        <ToastStyledWrapper
          {...this.props}
          className={classNames({
            'top-left': this.props.position === 'top-left',
            'top-right': this.props.position === 'top-right' || !this.props.position,
            'bottom-left': this.props.position === 'bottom-left',
            'bottom-right': this.props.position === 'bottom-right',
            'top-center': this.props.position === 'top-center',
            'bottom-center': this.props.position === 'bottom-center',
          })}>
          <ToastStyled
            ref={this.toastRef}
            initial="hidden"
            animate="visible"
            variants={this.variants}
            transition={{delay: 0.5}}
            {...this.props}>
            {this.props.type && (
              <ToastIconStyled type={this.props.type} className="ams-check"></ToastIconStyled>
            )}
            <span className="toast-close ams-cross" onClick={this.handleClose}></span>
            <div className="toast__body__wrapper">
              {this.props.title && <ToastTitleStyled>{this.props.title}</ToastTitleStyled>}
              <ToastMessageStyled>{this.props.message}</ToastMessageStyled>
            </div>
          </ToastStyled>
        </ToastStyledWrapper>
      )
    );
  }
}

// export const Index: ComponentWithStaticMethod<
//      IToastAlertProps & HTMLAttributes<HTMLDivElement> & MotionProps
// > = (props) => {
//      const toastRef = useRef<HTMLDivElement>(null);
//      const handleClose = () => {
//           toastRef.current?.remove();
//           props.onClose && props.onClose();
//      };

//      const variants = {
//           hidden: { opacity: 0, y: -50 },
//           visible: { opacity: 1, y: 0 },
//      };

//      return (
//           <ToastStyled
//                ref={toastRef}
//                initial="hidden"
//                animate="visible"
//                variants={variants}
//                transition={{ delay: 0.5 }}
//                {...props}
//                className={classNames({
//                     'top-left': props.position === 'top-left',
//                     'top-right':
//                          props.position === 'top-right' || !props.position,
//                     'bottom-left': props.position === 'bottom-left',
//                     'bottom-right': props.position === 'bottom-right',
//                })}
//           >
//                {props.type && (
//                     <ToastIconStyled
//                          {...props}
//                          className="ams-check"
//                     ></ToastIconStyled>
//                )}
//                <span
//                     className="toast-close ams-cross"
//                     onClick={handleClose}
//                ></span>
//                <div className="toast__body__wrapper">
//                     {props.title && (
//                          <ToastTitleStyled>{props.title}</ToastTitleStyled>
//                     )}
//                     <ToastMessageStyled>{props.message}</ToastMessageStyled>
//                </div>
//           </ToastStyled>
//      );
// };

// Index.showAlert = (value: string): void => {
//      ReactDOM.render()
//      // ReactDOM.render(
//      //      <Index
//      //           position="top-left"
//      //           isVisible={true}
//      //           title="System Message"
//      //           message="You have successfully saved."
//      //           type="danger"
//      //      />,
//      //      document.querySelector('body'),
//      // );
// };

export default Toast;
