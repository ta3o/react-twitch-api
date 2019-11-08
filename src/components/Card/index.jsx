import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  variant: PropTypes.oneOf(['game', 'stream']),
};

const defaultProps = {
  component: 'div',
  variant: 'stream',
};

const Wrapper = styled.div`
  box-sizing: border-box;
  flex: 1 0 auto;
  padding: 16px;
  position: relative;
  width: 24.5rem;
  max-width: 100%;

  @media (min-width: 576px) {
    max-width: 50%;
  }
`;

const GameWrapper = styled(Wrapper)`
  width: 12.5rem;
  max-width: 50%;
`;

const StreamWrapper = styled(Wrapper)`
  width: 24.5rem;
`;

function Card({ children, component, variant }) {
  const componentVariant = {
    game: GameWrapper,
    stream: StreamWrapper,
  };

  const Root = componentVariant[variant];

  return (
    <Root as={component}>
      {children}
    </Root>
  );
}

Card.propTypes = propTypes;

Card.defaultProps = defaultProps;

export default Card;
