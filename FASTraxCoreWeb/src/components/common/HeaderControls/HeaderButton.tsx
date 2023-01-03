import styled from 'styled-components';

interface HeaderButtonProps {
  active?: boolean;
}

const HeaderButton = styled.button<HeaderButtonProps>`
  border-radius: 25px;
  background-color: ${props => (props.active ? 'rgba(255,255,255, 0.2)' : 'transparent')};
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  transition: background-color 300ms ease-in-out;
`;

export default HeaderButton;
