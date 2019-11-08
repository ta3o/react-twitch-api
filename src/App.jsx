import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Channel from './pages/Channel';
import Games from './pages/Games';
import Streams from './pages/Streams';
import theme from './theme';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    color: #ffffff;
    background-color: #000000;
  }
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/channel/:id" component={Channel} />
      <Route exact path="/games" component={Games} />
      <Route exact path="/streams" component={Streams} />
      <Route exact path="/hola" component={Contact} />
    </Switch>
  </ThemeProvider>
);

export default App;
