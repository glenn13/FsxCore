import React from 'react';
import styled from 'styled-components';
import {ImageResources} from '../../../assets';

interface IProps {
  title?: String;
  subTitle?: String;
}

const BannerHeaderTitleStyled = styled.h1<IProps>`
  margin: 0;
  padding: 0;
  font-size: 14pt;
  color: #ffffff;
  flex-direction: row;
  display: flex;
`;

const BannerHeaderSubTitleStyled = styled.h5<IProps>`
  margin: 0;
  padding: 0;
  font-size: 10pt;
  font-weight: 300;
  margin-top: 4px;
  color: #ffffff;
`;

const BannerHeaderWrapperStyled = styled.div<IProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 39px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 10px 0px 10px 20px;
  justify-content: center;
  background: #4e4e4e;
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    width: 150px;
    height: 5px;
    background-color: #f9ad48;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
  }
`;

export const Index: React.FC<IProps> = props => {
  return (
    <BannerHeaderWrapperStyled>
      <BannerHeaderTitleStyled>
        <img
          alt="FsxSquares"
          src={ImageResources.FsxSquareThumb}
          style={{width: 16, height: 16, marginRight: 8, marginTop: 4}}
        />
        {props.title}
      </BannerHeaderTitleStyled>
      <BannerHeaderSubTitleStyled>{props.subTitle}</BannerHeaderSubTitleStyled>
    </BannerHeaderWrapperStyled>
  );
};

export default Index;
