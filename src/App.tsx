import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from './apiUris';
import LightList from './components/LightList';
import { GlobalStyle } from './globalstyle';
import { IGroup } from './interfaces/IGroup';
import { ILight } from './interfaces/ILight';
import { getUrlWithAuthToken, pollHueData } from './utils/utils';

const StyledHeader = styled.div`
  background-color: #222;
  height: 50px;
  line-height: 50px;  
  padding: 20px; 
  color: white; 
  font-size: 1.5em;
  text-align: center; 
`

const StyledContainer = styled.div`
  width: 
`

function App() {

  const [lights, setLights] = useState<ILight[]>([]);
  const [lightsGroup, setLightsGroup] = useState<IGroup[]>([]); 

  useEffect(() => {
    pollHueData(setLights, lights.slice()); 
    const interval = setInterval(() => pollHueData(setLights, lights.slice()), 1000);
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    const apiUrl: string = getUrlWithAuthToken(API.LIST_GROUP(process.env.REACT_APP_AUTH_TOKEN)); 

    axios.get<any>(apiUrl).then((response) => {
      const data = response.data; 
      
      if(Object.keys(data).length !== 0) {
        setLightsGroup(data); 
      }
    })
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledHeader>Philips Hue Lights</StyledHeader>
        {lights.length && <LightList lights={lights} />}
    </React.Fragment>
  );
}

export default App;
