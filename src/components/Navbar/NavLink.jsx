import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

const propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  href: '/',
};

const Wrapper = styled(Link)`
  color: ${(props) => (props.isActive
    ? props.theme.link.hover
    : props.theme.link.main
  )};
  text-decoration: none;
  font-size: 16px;
  padding: 8px 0;

  &:hover {
    color: ${(props) => props.theme.link.hover};
  }
`;

function NavLink({ href, children }) {
  const themeContext = React.useContext(ThemeContext);
  const activeStyle = {
    color: themeContext.link.hover,
    borderBottom: '2px solid',
  };

  return (
    <Wrapper exact to={href} activeStyle={activeStyle}>
      {children}
    </Wrapper>
  );
}

NavLink.propTypes = propTypes;

NavLink.defaultProps = defaultProps;

export default NavLink;
