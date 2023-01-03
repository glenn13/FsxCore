import React from 'react';

const Nav: React.FC = ({children}) => {
  return (
    <ul className="hidden sm:flex" id="navbar_nav">
      {children}
    </ul>
  );
};

export default Nav;
