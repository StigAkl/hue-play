import React from 'react'; 
import styled from 'styled-components';
import { ILight } from '../../interfaces/ILight';
import { ISchedule } from '../../interfaces/ISchedule';
import LightItem from './LightItem';

const Container = styled.div`
  padding: 10px; 
  display: flex; 
  flext-direction: row; 
  justify-content: center; 
  align-items: center;
`

interface IProps {
  lights: ILight[]
  schedules: ISchedule[]
}

const ItemList = ( { lights, schedules }: IProps) => {

    const items = lights.map(i => {
      const schedule = schedules.find(s => s.lightId === i.id); 

      return <LightItem key={i.id} light={i} schedule={schedule} />
    }); 

    return (
      <Container>
        {items}
      </Container>
    )
}

export default ItemList; 