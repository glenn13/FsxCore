import React from 'react';
import styled from 'styled-components';
import BreadcrumbItem from './BreadcrumbItem';

export interface IBreadcrumbProps {}

const BreadcrumbStyled = styled.ol<IBreadcrumbProps>``;

const Breadcrumb: React.FC<IBreadcrumbProps> = ({children, ...props}) => {
  React.Children.forEach(children, (child: any) => {
    if (child?.type !== BreadcrumbItem)
      throw new Error('<Breadcrumb /> accepts only <BreadcrumbItem />');
  });

  return (
    <BreadcrumbStyled {...props} className="breadcrumb">
      {children}
    </BreadcrumbStyled>
  );
};

export default Breadcrumb;
