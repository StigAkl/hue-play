import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch, Paper, ListSubheader } from "@material-ui/core"
import React, { useState } from "react"
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import styled from "styled-components";
import { ILightItem } from "../Interfaces/ILightItem";

interface IProps {
    items: ILightItem[];
}

const LightList: React.FC<IProps> = ( { items } ) => {

    const [checked, setChecked] = useState<string[]>(items.filter(x => x.checked).map(x => x.id.toString()));

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked]; 
        
        if(currentIndex === -1) {
          newChecked.push(value); 
        } else {
          newChecked.splice(currentIndex, 1); 
        }
        setChecked(newChecked); 
    }

    const StyledPaper = styled(Paper)`
        margin-top: 20px;
    `;
        
    return (
        <StyledPaper elevation={4}>
            <List subheader={
                <ListSubheader component="div" id="lights-title">
                    Lights
                </ListSubheader>
            }>

            {items.map(l => {

                const isChecked = checked.indexOf(l.id.toString()) !== -1;
                return (
                    <ListItem key={l.id} role={undefined} button onClick={handleToggle(l.id.toString())}>
                        <ListItemIcon>
                            <EmojiObjectsIcon color={isChecked ? "secondary" : "disabled"} />
                        </ListItemIcon>
                        <ListItemText id={l.id.toString()} primary={l.name} />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                onChange={handleToggle(l.id.toString())}
                                checked={isChecked}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                )})}
        </List>
      </StyledPaper>
    );
};

export default LightList;