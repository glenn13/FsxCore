import React from 'react';
import styled from 'styled-components';

export interface AvatarGroupProps {
  max?: number;
  data: Array<any>;
  hoverField: (item: any) => string;
}

const AvatarListStyled = styled.ul`
  display: flex;

  li img {
    border: 1px solid #ffffff;
  }

  li + li {
    position: relative;
    margin-left: -12px;
  }

  li img,
  li div {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  li div {
    background: #fff;
    color: #000;
    text-align: center;
    padding: 5px 3px;
    font-size: 0.9em;
    box-shadow: 0 1px 3px 0 #dedede;
  }
`;

const AvatarGroup: React.FC<AvatarGroupProps> = ({max = 4, data, hoverField, ...props}) => {
  const isCountLessThan = max >= data.length;

  return (
    <AvatarListStyled {...props}>
      {data.slice(0, max).map((item, indx) => (
        <li key={indx} style={{zIndex: indx}}>
          <a className="cursor-pointer" title={hoverField(item)}>
            <img alt="User" src={item.image} />
          </a>
        </li>
      ))}
      {data.length > 1 && !isCountLessThan && (
        <li style={{zIndex: max + 1}}>
          <div>+{data.length - max}</div>
        </li>
      )}
    </AvatarListStyled>
  );
};

export default AvatarGroup;
