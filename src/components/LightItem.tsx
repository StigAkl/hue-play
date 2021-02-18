import React, { useState } from 'react'; 
import styled from 'styled-components';
import { ILight } from '../interfaces/ILight';
import { Button, FormControl, FormLabel, makeStyles, Switch, TextField } from '@material-ui/core'; 
import { createAlarm, toggleLight, DefaultDate } from '../utils/utils';


interface IProps {
    light: ILight
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


const FlexItem = styled.div`
margin-top: 10px; 
`
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
    },
    textField: {
      width: 200,

    },
  }));


const Item = ( { light }: IProps) => {
    
    const [checked, setChecked] = useState<boolean>(light.on); 
    const [wakeUpTime, setWakeUpTime] = useState<string>(DefaultDate); 

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        toggleLight(parseInt(light.id), !checked).then((data) => {
            if(data.data[0].success !== undefined) {
                setChecked(!checked); 
            } else {
                throw Error("Something went wrong"); 
            }
        })
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWakeUpTime(e.target.value); 
    }

    const handleCreateAlarm = (e: React.MouseEvent<HTMLButtonElement>) => {
        createAlarm(light.id, wakeUpTime); 
    }

    const classes = useStyles();

    return (
        <LightItem>
            <FlexContainer>
            <FormControl>
                <FormLabel component="legend">{light.name}</FormLabel>
                <Switch  size="medium" checked={light.on} inputProps={{ 'aria-label': 'primary checkbox' }} color="primary" onChange={handleToggle} />
            </FormControl>

            <FlexItem>
                <TextField
                    id="datetime-local"
                    label="Set alarm"
                    type="datetime-local"
                    defaultValue={wakeUpTime}
                    className={classes.textField}
                    onChange={handleDateChange}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </FlexItem>
            <Button color="primary" onClick={handleCreateAlarm}>Create Alarm</Button>
        </FlexContainer>
        </LightItem>
    )
}

export default Item; 