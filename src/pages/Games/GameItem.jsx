import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardThumbnail from '../../components/Card/CardThumbnail';

const propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {};

function StreamItem(props) {
  const { thumbnail, title } = props;

  return (
    <Card component="article" variant="game">
      <CardThumbnail
        href="/"
        title={title}
        thumbnail={thumbnail}
        variant="game"
      />
      <CardHeader title={title} />
    </Card>
  );
}

StreamItem.propTypes = propTypes;

StreamItem.defaultProps = defaultProps;

export default StreamItem;
