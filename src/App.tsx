import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from './apiUris';
import LightList from './Components/lights/LightList';
import { GlobalStyle } from './globalstyle';
import { IGroup } from './interfaces/IGroup';
import { ILight } from './interfaces/ILight';
import { ISchedule } from './interfaces/ISchedule';
import { getSchedules, getUrlWithAuthToken, pollHueData } from './utils/utils';

const StyledHeader = styled.div`
  background-color: #222;
  height: 50px;
  line-height: 50px;  
  padding: 20px; 
  color: white; 
  font-size: 1.5em;
  text-align: center; 
`

function App() {

  const [lights, setLights] = useState<ILight[]>([]);
  const [lightsGroup, setLightsGroup] = useState<IGroup[]>([]); 
  const [schedules, setSchedules] = useState<ISchedule[]>([]); 

  useEffect(() => {
    axios.get<any>(getUrlWithAuthToken(API.LIST_GROUP(process.env.REACT_APP_AUTH_TOKEN))).then((response) => {
      const data = response.data; 
      if(Object.keys(data).length !== 0) {
        setLightsGroup(data); 
      }
    });

    axios.get<any>(getUrlWithAuthToken(API.LIST_SCHEDULES(process.env.REACT_APP_AUTH_TOKEN))).then((response) => {
      setSchedules(getSchedules(response.data)); 
    }); 
  }, []);

  useEffect(() => {
    pollHueData(setLights, lights.slice()); 
    const interval = setInterval(() => pollHueData(setLights, lights.slice()), 1000);
    return () => clearInterval(interval)
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledHeader>Philips Hue Lights</StyledHeader>
        {lights.length && <LightList lights={lights} schedules={schedules} />}
    </React.Fragment>
  );
}

export default App;
