import React, { useState } from 'react'; 
import styled from 'styled-components';
import { ILight } from '../interfaces/ILight';
import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, Switch, TextField } from '@material-ui/core'; 
import { createAlarm, toggleLight } from '../utils/utils';


interface IProps {
    light: ILight
};


const LightItem = styled.div`
  padding: 30px; 
  margin: 20px; 
  display: flex;
  border: 1px solid grey;
  justify-content: center; 
  border-radius: 10px; 
`;


const Item = ( { light }: IProps) => {

    const today = new Date(); 
    const defaultDate = `${today.getFullYear()}-${pad2(today.getMonth()+1)}-${pad2(today.getDate())}T${pad2(today.getHours())}:${pad2(today.getMinutes())}`
    
    const [checked, setChecked] = useState<boolean>(light.on); 
    const [wakeUpTime, setWakeUpTime] = useState<string>(defaultDate); 

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

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
        },
        textField: {
          width: 200,

        },
      }));

      function pad2(n: number) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
        }

      const FlexContainer = styled.div`
        display: flex; 
        justify-content: center; 
        flex-direction: column; 
        align-items: center; 
      `

      const FlexItem = styled.div`
        display: flex; 
        margin-top: 10px; 
      `

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
                    defaultValue={wakeUpTime}//"2017-05-24T10:30"
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