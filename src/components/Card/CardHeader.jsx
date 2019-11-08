import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  thumbnail: PropTypes.string,
};

const defaultProps = {
  title: null,
  subTitle: null,
  thumbnail: null,
};

const Header = styled.header`
  margin: 16px 0 0;
`;

const Title = styled.h3`
  margin: 8px 0 0;
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubTitle = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  font-weight: 400;
`;

const ImageWrapper = styled.div`
  display: block;
  float: left;
  margin-right: 8px;
`;

const Image = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  object-fit: contain;
  transition: all .3s ease;

  &:hover, &:focus {
    box-shadow: 0px 0px 4px 4px #38e5fa;
  }
`;


function CardHeader({ title, subTitle, thumbnail }) {
  return (
    <Header>
      {thumbnail && (
        <ImageWrapper>
          <Image src={thumbnail} alt={subTitle} />
        </ImageWrapper>
      )}
      {title && <Title>{title}</Title>}
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </Header>
  );
}

CardHeader.propTypes = propTypes;

CardHeader.defaultProps = defaultProps;

export default CardHeader;
