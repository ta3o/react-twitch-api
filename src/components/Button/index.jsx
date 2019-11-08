// import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {};

const defaultProps = {};

const Button = styled.button`
  background-color: ${(props) => props.theme.button.main.background};
  border: 0;
  border-radius: 4px;
  color: ${(props) => props.theme.button.main.color};
  cursor: pointer;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;

  &:hover, &:focus {
    background-color: ${(props) => props.theme.button.hover.background};
  }
`;

// function Button() {
//   return (
//     <>Button</>
//   );
// }

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
