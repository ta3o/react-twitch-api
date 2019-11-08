import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from '../Link';

const propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  variant: PropTypes.oneOf(['game', 'stream']),
};

const defaultProps = {
  href: null,
  title: 'thumbnail',
  thumbnail: 'https://static-cdn.jtvnw.net/ttv-static/404_preview.jpg',
  variant: 'stream',
};

const ImageWrapper = styled.figure`
  margin: 0;
  padding-bottom: 133.25%;
  position: relative;
`;

const GameImageWrapper = styled(ImageWrapper)`
  padding-bottom: 133.25%;
`;

const StreamImageWrapper = styled(ImageWrapper)`
  padding-bottom: 56.25%;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
  transition: all .3s ease;

  &:hover, &:focus {
    box-shadow: 0px 0px 8px 8px #38e5fa;
  }
`;

function CardThumbnail(props) {
  const {
    href, title, thumbnail, variant,
  } = props;
  const componentVariant = {
    game: GameImageWrapper,
    stream: StreamImageWrapper,
  };

  const ImageWrapperRoot = componentVariant[variant];

  const Root = ({ children }) => {
    const Component = href
      ? <Link href={href}>{children}</Link>
      : <>{children}</>;
    return Component;
  };

  return (
    <Root>
      <ImageWrapperRoot>
        <Image src={thumbnail} alt={title} />
      </ImageWrapperRoot>
    </Root>
  );
}

CardThumbnail.propTypes = propTypes;

CardThumbnail.defaultProps = defaultProps;

export default CardThumbnail;
