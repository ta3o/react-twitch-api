import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from '../../components/Section';
import Title from '../../components/Title';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const defaultProps = {};

const MediaWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 100%;

  @media (max-width: 680px) {
    flex-wrap: wrap;
  }
`;

const Col = styled.div`
  flex: ${(props) => (props.auto ? '0 0 auto' : '1 0 auto')};
  padding: 0 16px;

  & > iframe, & > div > iframe {
    height: calc(100vh - 120px);
    width: 100%;
  }

  @media (max-width: 680px) {
    padding: 0;
    max-width: 100%;
    width: 100%;

    & > iframe {
      max-width: 100%;
    }

    & > div > iframe {
      max-width: 100%;
      height: 50vh;
    }
  }
`;

function Channel({ match }) {
  const { params } = match;
  const { id } = params;

  React.useEffect(() => {
    const options = {
      width: 854,
      height: 480,
      channel: id,
    };
    // eslint-disable-next-line no-undef
    const player = new Twitch.Player('twitch-player', options);
    player.setVolume(0.5);
  }, [id]);

  const chatUrl = `https://www.twitch.tv/embed/${id}/chat`;

  return (
    <Section>
      <Title>{id}</Title>
      <MediaWrapper>
        <Col>
          <div id="twitch-player" />
        </Col>
        <Col auto>
          <iframe
            title="twitch-chat"
            frameBorder="0"
            scrolling="no"
            id={id}
            src={chatUrl}
            height="500"
            width="350"
          />
        </Col>
      </MediaWrapper>

    </Section>
  );
}

Channel.propTypes = propTypes;

Channel.defaultProps = defaultProps;

export default Channel;
