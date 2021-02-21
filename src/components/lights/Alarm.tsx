import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react'; 
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ILight } from '../../interfaces/ILight';
import { ISchedule } from '../../interfaces/ISchedule';
import { createAlarm, DefaultDate, FormatDate, deleteAlarm } from '../../utils/utils';

interface IProps {
    schedule: ISchedule | undefined,
    light: ILight
}

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
    },
    textField: {
      width: 200,

    },
  }));

  const StyledAlarmInfo = styled.div`
  font-family: Verdana;  
  margin: 0 auto 15px;
  text-align: center;
  padding: 5px;
  padding-left: 10px; 
  padding-right: 10px; 
  margin-top: 5px; 
  border-radius: 10px;
  border: 1px solid; 
  background-color: #BDE5F8;
  border-color: #00529B;
  color: #00529B;
  `

  const StyledAlarmHeader = styled.div`
    margin-top: 10px; 
    opacity: 0.5;
    font-weight: bold; 
  `

export const Alarm: React.FC<IProps> = ({ 
    schedule, light
}) => {

    const [wakeUpTime, setWakeUpTime] = useState<string>(DefaultDate); 
    const [hasActiveAlarm, setHasActiveAlarm] = useState<boolean>(false); 
    const [alarmTime, setAlarmTime] = useState<string>(schedule === undefined ? "" : schedule?.localtime); 
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWakeUpTime(e.target.value); 
    }
    
    const handleCreateAlarm = (e: React.MouseEvent<HTMLButtonElement>) => {
        createAlarm(light.id, wakeUpTime); 
        setAlarmTime(FormatDate(wakeUpTime));
        setHasActiveAlarm(true); 
    }

    const handleDeleteAlarm = (e: React.MouseEvent<HTMLButtonElement>) => {
        deleteAlarm(schedule?.id).then((response) => {
            setHasActiveAlarm(false); 
        })
    }

    useEffect(() => {
       if(schedule !== undefined) {
           setHasActiveAlarm(true); 
           setAlarmTime(FormatDate);
       } 
    },[]);

    const classes = useStyles();

    return (
        <>
            {!hasActiveAlarm && <>
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
                    
                    <Button color="primary" onClick={handleCreateAlarm}>Create Alarm</Button>   
                </>}

              {hasActiveAlarm && 
              <>
                    <StyledAlarmHeader>Active alarm:</StyledAlarmHeader>

                    <StyledAlarmInfo>
                        {alarmTime}
                    </StyledAlarmInfo>

                    <Button onClick={handleDeleteAlarm} color="primary">
                            Delete Alarm
                    </Button>
                </>}
            </>
    )
}