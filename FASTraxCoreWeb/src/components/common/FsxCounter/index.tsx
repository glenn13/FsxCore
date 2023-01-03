import React, {useEffect, useState} from 'react';
import clx from 'classnames';
import {SvgIcon} from '..';
import {useAppStore} from '@app/providers/app.store';
import Theme from '@app/theme/constant';

export interface FsxCounterProps {
  title: string;
  value: string;
  duration?: string;
  currency?: boolean;
  percent?: boolean;
  icon?: string;
}

export const FsxCounter: React.FC<FsxCounterProps> = props => {
  const {theme} = useAppStore();
  const {title, value, duration, percent} = props;

  const [count, setCount] = useState('0');

  useEffect(() => {
    let start = 0;
    const end = parseInt(props.value.substring(0, 3));
    if (start === end) return;

    if (props.duration) {
      let totalMilSecDur = parseInt(props.duration);
      let incrementTime = (totalMilSecDur / end) * 1000;

      let timer = setInterval(() => {
        start += 1;
        setCount(String(start) + props.value.substring(3));
        if (start === end) clearInterval(timer);
      }, incrementTime);
    }
  }, [value, duration]);

  function valueFormatter(num: any) {
    if (num > 999 && num < 1000000) {
      return 'K'; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return 'M'; // convert to M for number from > 1 million
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-5 card-box">
      <div
        className={`${
          props.icon ? `grid sm:grod-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 items-center` : ``
        }`}>
        {props.icon ? (
          <div className="flex flex-col items-center">
            <SvgIcon
              svgPath={true}
              svgId={props.icon}
              size={40}
              color={theme === Theme.LIGHT ? '#5a5151' : '#ffffff'}
              className="sidebar-icon"
            />
          </div>
        ) : null}
        <div className="flex flex-col items-center">
          <h2 className="title">{title}</h2>
          <span className={clx('text-4xl', {percent})}>
            {props.currency ? <span className="text-4xl"> USD </span> : null}
            {props.duration ? count : value}
            {/* {props.value ? <span className="text-4xl"> {valueFormatter(props.value)} </span> : null} */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FsxCounter);
