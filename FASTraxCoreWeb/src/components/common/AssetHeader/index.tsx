import React, {HTMLAttributes, forwardRef} from 'react';

import styled from 'styled-components';

const StyledHeader = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border: 1px solid;
  border-radius: 0.4rem;
  line-height: 1.25rem;
  color: #608eb6;
`;

export interface AssetHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  label?: string;
}

const AssetHeader = forwardRef<HTMLHeadingElement, AssetHeaderProps>(({label, ...props}, ref) => {
  return (
    <StyledHeader ref={ref} {...props}>
      {label}: {props.children}
    </StyledHeader>
  );
});
export default AssetHeader;
