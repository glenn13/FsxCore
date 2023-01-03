import React, {useState, useLayoutEffect} from 'react';
import styled from 'styled-components';
import amsIcon from './ams-icons.svg';
import selectionJS from './selection.json';
import {iconList} from './IconExtractor';

export interface ISvgIconProps {
  svgId: string; // Id from Svg Sprite
  size: number;
  svgSprite?: string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  svgPath?: boolean;
  id?: string;
}

const SvgIconStyled = styled.svg<ISvgIconProps>``;

export const Index: React.FC<ISvgIconProps & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  children,
  ...props
}) => {
  const [iconPath, seticonPath] = useState<string[] | null>(null);
  const scaleXY = 'scale(' + props.size / 1024 + ',' + props.size / 1024 + ')';

  useLayoutEffect(() => {
    const allIcons = iconList(selectionJS);
    const currentIcon = allIcons.filter(c => c.name === props.svgId);
    seticonPath(currentIcon && currentIcon[0].path);
  }, [props.svgId]);

  return (
    <SvgIconStyled
      {...props}
      width={props.size}
      height={props.size}
      fill={props.color}
      className={props.className}
      id={props.id}>
      {!props.svgPath ? (
        <use xlinkHref={(props.svgSprite || amsIcon) + '#icon-' + props.svgId} />
      ) : (
        iconPath?.map((path, indx) => (
          <path key={indx} d={path} style={{transform: scaleXY}}></path>
        ))
      )}
    </SvgIconStyled>
  );
};

export default Index;
