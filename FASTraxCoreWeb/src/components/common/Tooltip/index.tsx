import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import defaultTheme from '@app/theme/presets/base';
const color = require('color');

type ColorsType = typeof defaultTheme.color;

const StyleTooltipWrapper = styled.div<ITooltipProps>`
--tooltip-color: ${props =>
  props.type ? color(props.theme.color[props.type]).lighten(0.1) : props.color};
padding: 7px 10px;
background-color: var(--tooltip-color);
color:  ${props => props.textColor}};
position: fixed;

    &:before {
        content: '';
        position: absolute;
        height: 0;
    }

    &.tooltip-top {animation: fadeInDown 150ms both cubic-bezier(0.4, 0, 0.2, 1) !important;}
    &.tooltip-top:before {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--tooltip-color);
        left: 40%;
        top: 100%;
    }

    &.tooltip-bottom {animation: fadeInUp 150ms both cubic-bezier(0.4, 0, 0.2, 1) !important;}
    &.tooltip-bottom:before {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid var(--tooltip-color);
        left: 40%;
        bottom: 100%;
    }

    &.tooltip-right {animation: fadeInLeft 150ms both cubic-bezier(0.4, 0, 0.2, 1) !important;}
    &.tooltip-right:before {
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-right: 5px solid var(--tooltip-color);
        top: 40%;
        right: 100%;
    }

    &.tooltip-left {animation: fadeInRight 150ms both cubic-bezier(0.4, 0, 0.2, 1) !important;}
    &.tooltip-left:before {
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 5px solid var(--tooltip-color);
        top: 40%;
        left: 100%;
    }
`;

interface ITooltipProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  type?: keyof ColorsType;
  color?: string;
  textColor?: string;
  offset?: number;
}

const ITooltip: React.FC<ITooltipProps & React.HtmlHTMLAttributes<HTMLDivElement>> = ({
  children,
  position = 'bottom',
  color = '#333',
  offset = 5,
  textColor = '#fff',
  ...props
}) => {
  const [tooltipMessage, setTooltipMessage] = useState<string>();
  const elementRef = React.useRef<any>();
  const [elementHover, setElementHover] = useState<any>();
  const [tooltipPosition, setTooltipPosition] = useState<any>();
  const CARET_SIZE = 5;
  const OFFSET_SIZE = offset;

  useEffect(() => {
    const tooltipRefId = document.querySelector(`[data-tooltip-for="${props.id}"`);
    const message = tooltipRefId?.getAttribute('data-tooltip-message');
    message && setTooltipMessage(message.toString());
    tooltipRefId?.addEventListener('mouseover', handleMouseOver, true);
    tooltipRefId?.addEventListener('mouseleave', handleMouseLeave, true);
    tooltipRefId?.addEventListener('click', handleClick, true);
    setElementHover(tooltipRefId);

    return () => {
      tooltipRefId?.removeEventListener('mouseover', handleMouseOver, true);
      tooltipRefId?.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [elementHover, elementRef]);

  const classReplace = (className: string) =>
    elementRef.current.className.replace('show', '').replace('hidden', '') + className;

  const handleClick = React.useCallback(
    () => (elementRef.current.className = classReplace('hidden')),
    [elementRef],
  );

  const handleMouseOver = React.useCallback(() => {
    if (!elementRef.current) return;

    elementRef.current.className = classReplace('show');
    const topY = elementHover?.getBoundingClientRect().top || 0;
    const heightEl = elementHover?.getBoundingClientRect().height || 0;
    const widthEl = elementHover?.getBoundingClientRect().width || 0;
    const leftX = elementHover?.getBoundingClientRect().left || 0;

    if (position === 'bottom')
      setTooltipPosition({top: topY + heightEl + OFFSET_SIZE, left: leftX - widthEl / 2});
    else if (position === 'top')
      setTooltipPosition({
        bottom: Math.abs(window.innerHeight - topY + OFFSET_SIZE),
        left: leftX - widthEl / 2,
      });
    else if (position === 'left')
      setTooltipPosition({
        top: topY + (heightEl / 2 - elementRef.current.clientHeight / 2),
        left: leftX - widthEl * 2 - CARET_SIZE - OFFSET_SIZE,
      });
    else if (position === 'right')
      setTooltipPosition({
        top: topY + (heightEl / 2 - elementRef.current.clientHeight / 2),
        left: leftX + widthEl + OFFSET_SIZE,
      });
  }, [elementHover, setElementHover]);

  const handleMouseLeave = () => {
    if (!elementRef.current) return;

    elementRef.current.className = classReplace('hidden');
  };

  return (
    <>
      {ReactDOM.createPortal(
        <StyleTooltipWrapper
          ref={elementRef}
          type={props.type}
          color={color}
          textColor={textColor}
          className={`tooltip-container tooltip-${position.toString()} show`}
          style={{
            borderRadius: 4,
            ...tooltipPosition,
          }}>
          {tooltipMessage}
        </StyleTooltipWrapper>,
        document.body,
      )}
    </>
  );
};

export default React.memo(ITooltip);
