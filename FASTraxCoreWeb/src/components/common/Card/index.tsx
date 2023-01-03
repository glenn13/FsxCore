import React, {forwardRef} from 'react';

import styles from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
}

/**
 * Card component.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(({className, isSelected, ...props}, ref) => {
  return (
    <div
      className={`w-full flex flex-col p-3 bg-white rounded shadow ${
        isSelected ? styles.selected : ''
      } ${className ? className : ''} ${styles.card}`}
      ref={ref}
      {...props}
    />
  );
});

export default Card;
