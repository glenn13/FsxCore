import React from 'react';
import styled from 'styled-components';

export interface IBreadcrumProps {}

const BreadcrumbItemStyled = styled.li<IBreadcrumProps>``;

const BreadcrumbItem: React.FC<IBreadcrumProps> = props => {
  return <BreadcrumbItemStyled className="breadcrumb-item">{props.children}</BreadcrumbItemStyled>;
};

export default BreadcrumbItem;
