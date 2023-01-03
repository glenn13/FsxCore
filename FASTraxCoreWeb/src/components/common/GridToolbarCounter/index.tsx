import React from 'react';
import style from './grid-toolbar-counter.module.scss';
import styled from 'styled-components';

export const counterColors = {
  pictonBlue: '#40B1E3',
  portage: '#88A1E5',
  glacier: '#85B2C6',
  chardonnay: '#FFC480',
};

const SpanStyled = styled.span`
  font-size: 9pt;
  font-weight: 300;
  letter-spacing: 0.045em;
`;

const Container = styled.div<{color?: string}>`
  height: 80px;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-bottom: solid 1px ${props => props.color};
  position: relative;
  &::before {
    content: '';
    position: absolute;
    height: 5px;
    width: 40%;
    background-color: ${props => props.color};
    bottom: 0;
    left: 0;
  }
`;

interface StatsCounterProps {
  className?: string;
  title: string;
  value?: number;
  color?: string;
}

const GridToolbarCounter: React.VFC<StatsCounterProps> = ({value = 0, title, ...props}) => {
  return (
    <Container {...props}>
      <SpanStyled className="mb-2">{title.toUpperCase()}</SpanStyled>
      <h1 className={`${style['counter']}`}>{value}</h1>
    </Container>
  );
};

export default GridToolbarCounter;
