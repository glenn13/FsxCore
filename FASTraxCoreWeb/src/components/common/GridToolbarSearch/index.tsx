import React, {forwardRef} from 'react';

import {SvgIcon} from '..';
import styles from './grid-toolbar-search.module.scss';

export type GridToolbarSearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const GridToolbarSearch = forwardRef<HTMLInputElement, GridToolbarSearchProps>(
  ({className, ...props}, ref) => {
    return (
      <div className={`relative ${styles['input-container']}`}>
        <input
          type="text"
          className={`w-full  rounded-lg pl-4 pr-12 py-2 ${styles.input} ${className || ''}`}
          placeholder="Start Search"
          ref={ref}
          {...props}
        />
        <div className="absolute" style={{top: '9px', right: '11px'}}>
          <SvgIcon svgId="search1" size={22} color="#6b7377" />
        </div>
      </div>
    );
  },
);

export default GridToolbarSearch;
