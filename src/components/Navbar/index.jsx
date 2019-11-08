import React from 'react';
import styled from 'styled-components';
import NavLink from './NavLink';

const propTypes = {};

const defaultProps = {};

const Wrapper = styled.nav`
  align-items: center;
  background: ${(props) => props.theme.navbar.main};
  box-shadow: 0px 1px 2px rgba(0,0,0,0.5);
  display: flex;
  height: 64px;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 1;

  @media (min-width: 992px) {
    padding: 0 64px;
  }
`;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 16px;
  list-style: none;
`;

function Navbar() {
  return (
    <Wrapper>
      <List>
        <ListItem>
          <NavLink href="/">Home</NavLink>
        </ListItem>
        <ListItem>
          <NavLink href="/games">Games</NavLink>
        </ListItem>
        <ListItem>
          <NavLink href="/streams">Streams</NavLink>
        </ListItem>
      </List>
    </Wrapper>
  );
}

Navbar.propTypes = propTypes;

Navbar.defaultProps = defaultProps;

export default Navbar;
