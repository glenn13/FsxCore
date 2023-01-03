import React from 'react';
import ReactTooltip from 'react-tooltip';
import cryptoRandomString from 'crypto-random-string';
import style from './fsx-input-wrapper.module.scss';
import styled from 'styled-components';

const SpanDotStyled = styled.span<{floatLabel: boolean}>`
  top: ${props => (props.floatLabel ? '6px' : '-3px;')};
`;

export interface FsxInputWrapperProps {
  label?: string;
  floatLabel?: boolean;
  error?: string;
  required?: boolean;
  withFormWrapper?: boolean;
}

const FsxInputWrapper: React.FC<FsxInputWrapperProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  error,
  label,
  required,
  withFormWrapper = true,
  floatLabel = true,
  ...props
}) => {
  const tooltipId = `tooltip_${cryptoRandomString({length: 10})}`;
  return withFormWrapper ? (
    <div
      {...props}
      className={`flex flex-col relative ${className !== undefined ? className : ''}`}>
      {/* {error || required ?  : null} */}
      {error || required ? (
        <>
          <ReactTooltip id={tooltipId} />
          <SpanDotStyled
            floatLabel={floatLabel}
            className={style.dot}
            data-for={tooltipId}
            data-tip={
              error || required
                ? error
                  ? error
                  : `${(label || 'This field')?.replace(':', '')} is required`
                : null
            }
            data-background-color="#fc8181"
          />
        </>
      ) : null}
      {label && floatLabel && <label className={style.label}>{label}</label>}
      {children}
    </div>
  ) : (
    <>{children}</>
  );
};

export default React.memo(FsxInputWrapper);
