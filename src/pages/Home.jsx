import React from 'react';
import Section from '../components/Section';
import Title from '../components/Title';
import StreamsList from './Streams/StreamsList';
import GamesList from './Games/GamesList';

function Home() {
  return (
    <>
      <Section>
        <Title>Live channels</Title>
        <StreamsList items={12} />
      </Section>
      <Section>
        <Title>Games</Title>
        <GamesList items={24} />
      </Section>
    </>
  );
}

export default Home;
