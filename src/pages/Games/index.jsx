import React from 'react';
import Section from '../../components/Section';
import Title from '../../components/Title';
import GamesList from './GamesList';

function Games() {
  return (
    <Section>
      <Title>Games</Title>
      <GamesList />
    </Section>
  );
}

export default Games;
