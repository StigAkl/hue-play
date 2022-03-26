import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './globalstyle';
import LightsDashboard from './Components/LightsDashboard';
import { ILightItem } from './Interfaces/ILightItem';
import { Lights, Groups } from './Api/agent';
import { mapToGroupItem, mapToLightItem } from './utils';
import { IGroup } from './Interfaces/IGroup';

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
  const [lightGroups, setLightGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    Lights.getLights().then(data => {
      setLights(mapToLightItem(data));
    })
  }, []);

  useEffect(() => {
    if (lights) {
      Groups.getGroups().then(data => {
        setLightGroups(mapToGroupItem(data, lights));
      })
    }
  }, [lights])

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledHeader>
        <Container maxWidth="md">RGB DashBoard</Container></StyledHeader>
      <Container maxWidth="md">
        <LightsDashboard lightGroups={lightGroups} />
      </Container>
    </React.Fragment>
  );
}

export default App;
