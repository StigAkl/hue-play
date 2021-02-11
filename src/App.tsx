import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from './apiUris';
import { ILight } from './interfaces/ILight';
import { pollHueData } from './utils/utils';
const dotenv = require('dotenv').config().parsed;

const auth_token = process.env.REACT_APP_AUTH_TOKEN; 
const host = process.env.REACT_APP_HOST ?? '';  


const Header = styled.h1`
  text-align: center; 
  margin: 20px; 
  font-size: 40px; 
`;

const Container = styled.div`
  padding: 10px; 
  display: flex; 
  flext-direction: row; 
  justify-content: center; 
  align-items: center; 
`

const Item = styled.div<any>`
  padding: 30px; 
  margin: 20px; 
  color: ${(props: any) => props.on ? 'green' : 'darkgrey'};
  display: flex;
  font-size: 25px; 
  border-radius: 50%;
  text-align: center; 
  height: 120px; 
  width: 120px; 
  align-items: center; 
  font-weight: bold;
  border: 7px solid ${(props: any) => props.color};
  &:hover {
    cursor: pointer;
  }
`;


function App() {

  const [lights, setLights] = useState<ILight[]>([]);

  useEffect(() => {
    pollHueData(setLights); 
    setInterval(() => pollHueData(setLights), 1000); 
  }, []);

    var renderLights = lights.map((x: ILight) => {
        return (<Item key={x.name} color={x.hex} on={x.on ? 1 : 0}>{x.name}</Item>)
    }); 

  return (
    <React.Fragment>
      <Header>Philips Hue Lights</Header>
      <Container>
        {renderLights.length && renderLights}
      </Container>
    </React.Fragment>
  );
}

export default App;
