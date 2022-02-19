import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './globalstyle';
import LightsDashboard from './Components/LightsDashboard';
import { ILightItem } from './Interfaces/ILightItem';
import { Lights } from './Api/agent';
import { mapToLightItem } from './utils';

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

const App = () => {

  const [lights, setLights] = useState<ILightItem[]>([]);

  useEffect(() => {
    Lights.getLights().then(data => {
      setLights(mapToLightItem(data));
    });
  }, []);

  console.log("kake");

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledHeader>
        <Container maxWidth="md">RGB DashBoard</Container></StyledHeader>
      <Container maxWidth="md">
        <LightsDashboard lights={lights} />
      </Container>
    </React.Fragment>
  );
}

export default App;
