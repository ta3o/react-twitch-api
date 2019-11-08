import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const defaultProps = {};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Container({ children }) {
  return (
    <Wrapper>{children}</Wrapper>
  );
}

Container.propTypes = propTypes;

Container.defaultProps = defaultProps;

export default Container;
