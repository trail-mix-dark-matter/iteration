import React from 'react';

const NavContainer = props => {
  return (
    <nav>
      <button onClick={() => props.logOut()}>Log Out</button>
    </nav>
  );
};

export default NavContainer;
