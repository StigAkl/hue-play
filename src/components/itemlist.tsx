import React from 'react'; 
import styled from 'styled-components';
import { ILight } from '../interfaces/ILight';
import Item from './Item';

const Container = styled.div`
  padding: 10px; 
  display: flex; 
  flext-direction: row; 
  justify-content: center; 
  align-items: center;
`

interface IProps {
  lights: ILight[]
}

const ItemList = ( { lights }: IProps) => {

    const items = lights.map(i => {
      return <Item key={i.id} light={i} />
    }); 

    return (
      <Container>
        {items}
      </Container>
    )
}

export default ItemList; 