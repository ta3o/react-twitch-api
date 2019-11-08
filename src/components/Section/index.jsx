import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Wrapper = styled.section`
  padding: 8px 16px;

  @media (min-width: 992px) {
    padding: 8px 64px;
  }
`;

function Section({ children }) {
  return (
    <Wrapper>{children}</Wrapper>
  );
}

Section.propTypes = propTypes;

export default Section;
