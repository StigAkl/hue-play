import React, { useState } from 'react'; 
import styled from 'styled-components';
import { ILight } from '../../interfaces/ILight';
import { Button, FormControl, FormLabel, makeStyles, Switch, TextField } from '@material-ui/core'; 
import { createAlarm, toggleLight, DefaultDate } from '../../utils/utils';
import { Alarm } from './Alarm';
import { ISchedule } from '../../interfaces/ISchedule';


interface IProps {
    light: ILight
    schedule: ISchedule | undefined
};


const LightItem = styled.div`
  padding: 30px; 
  margin: 20px; 
  border: 1px solid grey;
  border-radius: 10px; 
`;

const FlexContainer = styled.div`
display: flex; 
justify-content: center; 
flex-direction: column; 
align-items: center; 
`


const Item = ( { light, schedule }: IProps) => {
    
    const [checked, setChecked] = useState<boolean>(light.on); 

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        toggleLight(parseInt(light.id), !checked).then((data) => {
            if(data.data[0].success !== undefined) {
                setChecked(!checked); 
            } else {
                throw Error("Something went wrong"); 
            }
        })
    }

    return (
        <LightItem>
            <FlexContainer>
            <FormControl>
                <FormLabel component="legend">{light.name}</FormLabel>
                <Switch  size="medium" checked={light.on} inputProps={{ 'aria-label': 'primary checkbox' }} color="primary" onChange={handleToggle} />
            </FormControl>

            <Alarm schedule={schedule} light={light} />
        </FlexContainer>
        </LightItem>
    )
}

export default Item; 