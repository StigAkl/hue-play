import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import ItemList from './components/itemlist';
import { GlobalStyle } from './globalstyle';
import { ILight } from './interfaces/ILight';
import { pollHueData } from './utils/utils';

const Item = styled.div<any>`
  padding: 30px; 
  margin: 20px; 
  color: ${(props: any) => props.on ? 'green' : 'darkgrey'};
  display: flex;
  border: 5px solid ${(props: any) => props.color};
`;

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

  useEffect(() => {
    pollHueData(setLights, lights.slice()); 
    const interval = setInterval(() => pollHueData(setLights, lights.slice()), 1000);
    
    return () => clearInterval(interval)
  }, [lights]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledHeader>Philips Hue Lights</StyledHeader>
        {lights.length && <ItemList lights={lights} />}
    </React.Fragment>
  );
}

export default App;
