import React from "react";

const NavContainer = props => {
	return (
		<nav id="navbar">
			<button onClick={() => props.logOut()}>Log Out</button>
		</nav>
	);
};

export default NavContainer;
