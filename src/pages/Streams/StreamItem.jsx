import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../../components/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardThumbnail from '../../components/Card/CardThumbnail';
import alpha2 from '../../languages/alpha2';

const propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userThumbnail: PropTypes.string.isRequired,
  viewerCount: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
};

const defaultProps = {};

const DescriptionList = styled.dl`
  margin: 0;
  pointer-events: none;
`;

const Name = styled.dt`
  display: none;
`;

const Description = styled.dd`
  position: absolute;
  top: 24px;
  ${(props) => ((props.right) ? 'left' : 'right')}: 24px;
  background: ${(props) => ((props.right) ? '#772ce8' : 'rgba(0, 0, 0, 0.6)')};
  padding: 4px;
  border-radius: 4px;
  margin: 0;
  font-size: 12px;
  font-weight: 500;
`;

function StreamItem(props) {
  const {
    thumbnail, title, userName, userThumbnail, viewerCount, language,
  } = props;
  const viewers = `${viewerCount} viewers`;
  const channelUrl = `/channel/${userName}`;

  return (
    <Card component="article">
      <CardThumbnail
        href={channelUrl}
        title={title}
        thumbnail={thumbnail}
      />
      <CardHeader title={title} subTitle={userName} thumbnail={userThumbnail} />
      <DescriptionList>
        <Name>Viewers</Name>
        <Description>{viewers}</Description>
        <Name>Language</Name>
        <Description right>{alpha2[language]}</Description>
      </DescriptionList>
    </Card>
  );
}

StreamItem.propTypes = propTypes;

StreamItem.defaultProps = defaultProps;

export default StreamItem;
