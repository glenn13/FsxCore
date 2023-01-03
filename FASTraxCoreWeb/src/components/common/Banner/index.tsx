import React from 'react';
import styled from 'styled-components';
import {BannerHeader} from '..';
import BannerControls from '../BannerControls';
import useRoute from '@app/hooks/useRoute';
import {useAppStore} from '@app/providers/app.store';

interface IProps {
  title: string;
  subTitle?: string;
}

const BannerStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 0;
  min-height: 40px;
`;

export const Index: React.FC<IProps> = ({title, subTitle}) => {
  const {currentPage} = useRoute();
  const {hasProjectSelected} = useAppStore();

  return (
    <BannerStyled id="banner_area">
      <BannerHeader title={title} subTitle={subTitle} />
      {currentPage?.meta?.layoutPart?.bannerControl && hasProjectSelected  && <BannerControls />}
    </BannerStyled>
  );
};

export default Index;
