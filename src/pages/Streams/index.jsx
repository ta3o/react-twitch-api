import React from 'react';
import Section from '../../components/Section';
import Title from '../../components/Title';
import StreamsList from './StreamsList';

function Streams() {
  return (
    <Section>
      <Title>Streams</Title>
      <StreamsList />
    </Section>
  );
}

export default Streams;
