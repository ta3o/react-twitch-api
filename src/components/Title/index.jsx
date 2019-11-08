import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Wrapper = styled.h2`
  margin: 8px 0 0;
  padding: 0 16px;
`;

function Title({ children }) {
  return (
    <Wrapper>{children}</Wrapper>
  );
}

Title.propTypes = propTypes;

export default Title;
