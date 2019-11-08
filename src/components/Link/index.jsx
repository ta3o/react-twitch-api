import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as DefaultLink } from 'react-router-dom';

const propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  href: '/',
};

const Wrapper = styled(DefaultLink)`
  color: ${(props) => props.theme.link.main};
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: ${(props) => props.theme.link.hover};
  }
`;

function Link({ href, children }) {
  return (
    <Wrapper to={href}>{children}</Wrapper>
  );
}

Link.propTypes = propTypes;

Link.defaultProps = defaultProps;

export default Link;
