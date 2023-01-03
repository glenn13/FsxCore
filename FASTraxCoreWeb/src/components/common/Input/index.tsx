import {Input, InputProps, InputState} from '@progress/kendo-react-inputs';

import {InputChangeEvent} from '@progress/kendo-react-inputs/dist/npm/input/interfaces/InputChangeEvent';
import React from 'react';
import clx from 'classnames';
import styled from 'styled-components';

export interface IInputProps {
  rounded?: boolean;
  oval?: boolean;
  shadow?: boolean;
  icon?: boolean;
  iconName?: string;
  iconColor?: string;
  errors?: string[] | string;
  outlined?: boolean;
  className?: string;
}

const InputStyled = styled(Input)<IInputProps>`
  //  border: 1px solid rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.08);
  outline: none;
  /* 12px 16px 7px ${props => (props.icon ? '33' : '16')}px !important; */
  padding: ${props => (props.icon ? `22px 16px 22px 33px` : `22px 16px 22px 16px`)}!important;
  line-height: 1.5;
  font-size: 10pt;
  width: 100%;
  font-weight: 300;
  border-color: ${props => (!!props.outlined ? 'rgba(0, 0, 0, 0.15)' : 'none')};
  //   box-shadow: 0 10px 17px -14px #999ea08a !important;

  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 10px 17px -14px #999ea08a !important;
  }
`;

const InputWrapperStyled = styled.div`
  position: relative;
  display: flex;
  margin-top: 16px;
`;

const LabelStyled = styled.label`
  position: absolute;
  left: 7px;
  top: -7px;
  background: #fff;
  padding: 0 4px;
  font-size: 9pt;
  // font-family: 'Poppins'; // Cannot find Poppins in the resources
  font-family: Roboto;
  font-weight: 300;
  color: #888787;
  z-index: 10;
`;

const IconStyled = styled.i<IInputProps>`
  position: absolute;
  left: 12px;
  top: 10px;
  font-weight: 100;
  font-size: 19px;
  color: ${props => (props.iconColor ? props.iconColor : '#cacaca')};
`;

const ShowPassIconStyled = styled.i<IInputProps>`
  position: absolute;
  cursor: pointer;
  right: 12px;
  top: 10px;
  font-weight: 100;
  font-size: 19px;
  &:hover {
    color: #8e8e8e;
  }
  color: ${props => (props.iconColor ? props.iconColor : '#cacaca')};
`;

type FsxInputState = InputState & {
  changed: boolean;
  startLongPress: boolean;
  showPasswordToggle: boolean;
};

class Index extends React.Component<IInputProps & InputProps, FsxInputState> {
  state = {changed: false, startLongPress: false, showPasswordToggle: false};
  inputRef = React.createRef<Input>();
  iconRef = React.createRef<HTMLElement>();

  componentDidMount() {
    const animated = document.querySelector('.animated__icon');
    animated?.addEventListener('animationend', () => {
      this.iconRef.current?.classList.remove('pulsate');
    });
  }

  /**
   * !!! NOTHING CALLS THIS FUNCTION
   */
  // handleShowPassword = () => {
  //   const _type = this.inputRef.current?.getAttribute('type');
  //   const isPass = _type === 'password';
  //   this.inputRef.current?.setAttribute('type', isPass ? 'text' : 'password');
  //   this.iconRef.current?.classList.add('pulse');
  // };

  handleChange = (e: InputChangeEvent) => {
    if (!this.state.changed) this.setState(state => ({...state, changed: true}));

    this.props.onChange && this.props.onChange(e);
  };

  handleMouseDown = () => {
    if (!this.state.startLongPress) {
      // this.inputRef.current?.setAttribute('type', 'text');
      this.setState(state => ({...state, startLongPress: true, showPasswordToggle: true}));
    }
  };

  handleMouseUp = () => {
    setTimeout(() => {
      this.setState(state => ({...state, startLongPress: false, showPasswordToggle: false}));
      // this.inputRef.current?.setAttribute('type', 'password');
    }, 300);
  };

  componentDidUpdate(prevProps: IInputProps) {
    if (prevProps.errors?.length !== this.props.errors?.length && this.props.errors)
      this.setState(state => ({...state, changed: false}));
  }

  render() {
    const {
      placeholder,
      label,
      errors,
      iconName,
      oval = false,
      rounded = true,
      shadow,
      type,
      className,

      icon,
      iconColor,
      outlined,
      ...rest
    } = this.props;

    return (
      <InputWrapperStyled className={className}>
        <LabelStyled>{label || placeholder}</LabelStyled>
        {icon && <IconStyled className={iconName} iconColor={iconColor} />}
        <div className="flex flex-col flex-1">
          <InputStyled
            type={type === 'password' && !this.state.showPasswordToggle ? 'password' : 'text'}
            ref={this.inputRef}
            className={clx({
              'btn-oval': oval,
              'btn-rounded': rounded,
              'btn-shadow': shadow,
            })}
            {...rest}
            onChange={this.handleChange}
          />
          {!this.state.changed && errors && (
            <span className="text-xs text-red-400 pt-1">{errors || errors[0]}</span>
          )}
        </div>
        {type === 'password' && (
          <ShowPassIconStyled
            className={
              this.state.startLongPress
                ? 'animated__icon ams-visibility-hidden'
                : 'animated__icon ams-visibility-visible'
            }
            onMouseDown={this.handleMouseDown.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}
          />
        )}
      </InputWrapperStyled>
    );
  }
}

export default React.memo(Index);
