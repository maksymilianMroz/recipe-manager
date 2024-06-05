import React from "react";
import styled from "styled-components";

const Navbar = styled.nav`
  background: #ff6347;
  padding: 1rem;
`;

const Header = () => (
  <Navbar>
    <h1>Recipe Manager</h1>
  </Navbar>
);

export default Header;
