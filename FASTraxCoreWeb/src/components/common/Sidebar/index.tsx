import React from 'react';
import styled from 'styled-components';

interface IProps {}

const SidebarStyled = styled.div<IProps>`
  display: flex;
  flex: 1;

  ul {
    list-style: none;
    margin: 0;
    padding: 15px 0;
    overflow-x: hidden;
  }
  ul li a {
    display: block;
    padding: 10px 15px;
    text-align: center;
    position: relative;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  ul li.nav_title {
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
    font-weight: 500;
    color: #bfbfbf;
    margin-bottom: 15px;
    text-align: center;
  }

  ul li a.active {
    background-color: ${props => props.theme.sidebar.active};
  }

  ul li a.active:not(.has_child) {
    cursor: default;
  }

  .from__left li a.active,
  .from__right li a.active {
    transition: background-color 150ms ease-in 0.1s;
  }

  ul li a.active {
    position: relative;
  }

  ul li a.active:before {
    content: '';
    position: absolute;
    width: 5px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f9ad47;
  }

  ul li:not(.back_list) a.has_child:after {
    content: '';
    width: 0;
    height: 0;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
    border-left: 5px solid #dde1ec;
    position: absolute;
    right: 13px;
    top: 45%;
  }

  ul li a > i {
    color: ${props => props.theme.color.accent} !important;
    display: block;
    font-size: 1.8em;
  }

  ul li a > svg {
    margin: 0 auto;
  }

  ul li a > i,
  ul li a > span {
    display: inline-block;
    vertical-align: middle;
  }

  ul li a > span {
    // color: ${props => props.theme.color.primary} !important;
    font-size: 1em;
    font-weight: 300;
    padding-top: 6px;
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #9fa6ab;
  }

  ul li.back_list button {
    display: flex;
    padding: 8px 15px;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    outline: none;
  }
`;

export const Index: React.FC<IProps> = props => {
  return <SidebarStyled {...props}>{props.children}</SidebarStyled>;
};

export default Index;
