import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Card from '../../components/Card';
import StreamItem from './StreamItem';

const propTypes = {
  items: PropTypes.number,
};

const defaultProps = {
  items: 24,
};

const GET_STREAMS = gql`
  query GetStreams($first: Int = 12 $after: String = "") {
    streams(first: $first after: $after) {
      streams {
        id
        title
        viewerCount
        language
        thumbnailUrl
        user {
          id
          username
          name
          profileImageUrl
        }
      }
      cursor
      hasMore
    }
  }
`;

const ContainerFooter = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
`;

const Col = styled.div`
  flex: ${(props) => (props.auto ? '0 0 auto' : '1 0 auto')};
  padding: 0 16px;
`;

const Separator = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.separator.color};
  top: 50%;
  position: relative;
`;

// const ShowMoreButton = styled.button`

// `,

const Loader = () => (
  <Card>
    <ContentLoader
      ariaLabel="Loading"
      height={261}
      width={361}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <circle cx="20" cy="239" r="20" />
      <rect x="48" y="219" rx="4" ry="4" width="312" height="18" />
      <rect x="48" y="243" rx="4" ry="4" width="141" height="16" />
      <rect x="0" y="0" rx="5" ry="5" width="361" height="203" />
    </ContentLoader>
  </Card>
);

function StreamsList({ items }) {
  const {
    data, loading, error, fetchMore,
  } = useQuery(GET_STREAMS, { variables: { first: items } });

  if (loading) return <Container><Loader /></Container>;
  if (error) return <p>ERROR</p>;

  function handleFetchMore() {
    return fetchMore({
      variables: {
        first: items,
        after: data.streams.cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          streams: {
            ...fetchMoreResult.streams,
            streams: [
              ...prev.streams.streams,
              ...fetchMoreResult.streams.streams,
            ],
          },
        };
      },
    });
  }

  return (
    <Container>
      {data.streams && data.streams.streams && data.streams.streams.map((item) => (
        <StreamItem
          key={item.id}
          title={item.title}
          thumbnail={item.thumbnailUrl.replace('-{width}x{height}', '')}
          userName={item.user.username}
          userThumbnail={item.user.profileImageUrl}
          viewerCount={item.viewerCount}
          language={item.language}
        />
      ))}

      {data.streams
      && data.streams.hasMore && (
        <ContainerFooter>
          <Col><Separator /></Col>
          <Col auto>
            <Button type="button" onClick={handleFetchMore}>
              Load More
            </Button>
          </Col>
          <Col><Separator /></Col>
        </ContainerFooter>
      )}
    </Container>
  );
}

StreamsList.propTypes = propTypes;

StreamsList.defaultProps = defaultProps;

export default StreamsList;
