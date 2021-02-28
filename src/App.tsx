import { Container, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './globalstyle';
import LightsDashboard from './Components/LightsDashboard';

const StyledHeader = styled.div`
  padding: 20px; 
  color: white; 
  background-image: linear-gradient(
    135deg,
    rgb(24, 42, 115) 0%,
    rgb(33, 138, 174) 69%,
    rgb(32, 167, 172) 89%
  ) !important;
`

function App() {

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledHeader>
        <Container maxWidth="md">Philips Hue Lights</Container></StyledHeader>

    <Container maxWidth="md">

        <LightsDashboard />

    </Container>
    </React.Fragment>
  );
}

export default App;
