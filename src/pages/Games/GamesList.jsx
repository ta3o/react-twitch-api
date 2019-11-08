import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
import useFetch from '../../hooks/useFetchData';
import Container from '../../components/Container';
import GameItem from './GameItem';

const propTypes = {
  items: PropTypes.number,
};

const defaultProps = {
  items: 24,
};

const Loader = () => (
  <ContentLoader
    height={248}
    width={234}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="57" y="198" rx="4" ry="4" width="120" height="18" />
    <rect x="57" y="32" rx="5" ry="5" width="120" height="160" />
  </ContentLoader>
);

function GamesList({ items }) {
  const fethConfig = {
    method: 'get',
    url: 'https://api.twitch.tv/helix/games/top',
    data: { data: [] },
    config: {
      headers: {
        'Client-ID': 'wj6248liq99xdl2u8n9hp9a8wejhbc',
      },
      params: {
        first: items,
      },
    },
  };
  const [{ data, isLoading }] = useFetch(fethConfig);

  return (
    <Container>
      {isLoading && <Loader />}
      {data.data.map((item) => (
        <GameItem
          key={item.id}
          thumbnail={item.box_art_url.replace('-{width}x{height}', '')}
          title={item.name}
        />
      ))}
    </Container>
  );
}

GamesList.propTypes = propTypes;

GamesList.defaultProps = defaultProps;

export default GamesList;
