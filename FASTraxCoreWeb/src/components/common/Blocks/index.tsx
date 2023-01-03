import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface IProps {
  grow?: boolean;
  column?: boolean;
  flex?: boolean;
  wrapFlex?: boolean;
  middle?: boolean;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  top?: boolean;
  bottom?: boolean;
  padding?: boolean;
  inlineFlex?: boolean;
}

const BlockStyled = styled.div`
  flex-shrink: 0;

  &.flex {
    display: flex;
  }

  &.flex-wrap {
    flex-wrap: wrap;
  }

  &.flex-unwrap {
    flex-wrap: nowrap;
  }

  &.inline-flex {
    display: inline-flex;
  }

  &.flex-row {
    flex-direction: row;
  }

  &.flex-col {
    flex-direction: column;
  }

  &.flex-grow {
    flex-grow: 1;
    flex-basis: 0;
  }

  &.flex-middle {
    align-items: center;
  }

  &.flex-top {
    align-items: flex-start;
  }

  &.flex-bottom {
    align-items: flex-end;
  }

  &.flex-center {
    justify-content: center;
  }

  &.flex-left {
    justify-content: flex-start;
  }

  &.flex-right {
    justify-content: flex-end;
  }

  &.flex-padding > * {
    padding: 10px 10px;
  }
`;

export const Index: React.FC<IProps & React.HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <BlockStyled
      {...props}
      className={classNames(props.className, {
        flex: props.flex,
        'inline-flex': !props.flex && props.inlineFlex,
        'flex-col': props.column,
        'flex-grow': props.grow,
        'flex-wrap': props.wrapFlex,
        'flex-unwrap': props.flex && !props.wrapFlex,
        'flex-center': props.center,
        'flex-middle': props.middle,
        'flex-right': props.right,
        'flex-left': props.left,
        'flex-top': props.top,
        'flex-bottom': props.bottom,
        'flex-padding': props.padding,
      })}>
      {props.children}
    </BlockStyled>
  );
};

export default Index;
