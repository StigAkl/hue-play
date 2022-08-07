import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Switch, Paper, ListSubheader, createStyles, makeStyles, Collapse } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import styled from "styled-components";
import { IGroup } from "../../Interfaces/IGroup";
import { initializeLights } from '../../utils';
import { Lights, Groups } from '../../Api/agent';

interface IProps {
    items: IGroup[];
}



const StyledPaper = styled(Paper)`
    margin-top: 40px; 
`;

const StyledSwitch = styled(Switch)`
    margin-right: 50px; 
`;

const StyledNestedListContainer = styled.div`
    margin: 0 auto; 
    padding: 10px;
    padding-left: 0;  
    border-radius: 10px; 
    margin: 0 auto; 
`;

const useStyles = makeStyles(() =>
    createStyles({
        root: {
        },
        nested: {
            paddingLeft: '40px',
            fontSize: '0.8em',
            paddingTop: '0px',
            marginTop: '0px',
        }
    })
);

const GroupList: React.FC<IProps> = ({ items }) => {

    const [checkedGroups, setCheckedGroups] = useState<string[]>([]);
    const [checkedLights, setCheckedLights] = useState<string[]>([]);
    const [open, setOpen] = useState<string[]>([]);

    const classes = useStyles();

    useEffect(() => {
        setCheckedLights(initializeLights(items));
        setCheckedGroups(items.filter(x => x.checked).map(x => x.id.toString()))
    }, [items]);

    const handleToggleGroups = (value: string) => () => {
        const stateChangeOn = toggle(value, checkedGroups, setCheckedGroups);
        const newCheckedLights = [...checkedLights];

        Groups.toggleGroup(parseInt(value), stateChangeOn).then((data: any) => {
            if (data.data[0].success) {
                items.find(x => x.id.toString() === value)?.lights?.forEach(l => {
                    const currentIndex = newCheckedLights.indexOf(l.id.toString());
                    if (stateChangeOn) {
                        if (currentIndex === -1) {
                            newCheckedLights.push(l.id.toString());
                        }
                    } else {
                        if (currentIndex !== -1) {
                            newCheckedLights.splice(currentIndex, 1);
                        }
                    }
                });
                setCheckedLights(newCheckedLights);
            }
        })
    }

    const handleToggleLight = (value: string) => () => {
        const state = toggle(value, checkedLights, setCheckedLights);
        Lights.toggleLight(parseInt(value), state);
    }

    const handleCollapse = (value: string) => () => {
        toggle(value, open, setOpen);
    };

    const toggle = (value: string, state: string[], callback: (newState: string[]) => any): boolean => {
        const currentIndex = state.indexOf(value);
        const newChecked = [...state];

        //true = light on, false = light off
        let stateChangeOn = true;

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
            stateChangeOn = false;
        }
        callback(newChecked);

        return stateChangeOn;
    }

    return (
        <StyledPaper elevation={4}>
            <List subheader={
                <ListSubheader>
                    Rooms
                </ListSubheader>
            }>

                {items.map(g => {

                    const groupIsChecked = checkedGroups.indexOf(g.id.toString()) !== -1;
                    const isOpen = open.indexOf(g.id.toString()) !== -1;

                    return (
                        <React.Fragment key={"fragment" + g.id}>
                            <ListItem role={undefined} divider button onClick={handleCollapse(g.id.toString())}>
                                <ListItemIcon key={"ListItemIcon" + g.id}>
                                    <EmojiObjectsIcon color={groupIsChecked ? "secondary" : "disabled"} />
                                </ListItemIcon>
                                <ListItemText id={g.id.toString()} primary={g.name} />
                                <ListItemSecondaryAction>
                                    <Switch
                                        edge="end"
                                        onChange={handleToggleGroups(g.id.toString())}
                                        checked={groupIsChecked}
                                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                <StyledNestedListContainer>
                                    {g.lights.map(l => {
                                        const lightIsChecked = checkedLights.indexOf(l.id.toString()) !== -1;
                                        return (
                                            <List key={l.id} disablePadding>
                                                <ListItem className={classes.nested}>
                                                    <ListItemIcon>
                                                        <EmojiObjectsIcon color={lightIsChecked ? "primary" : "disabled"} />
                                                    </ListItemIcon>
                                                    <ListItemText id={l.id.toString()} primary={g.name + "-" + l.name} />
                                                    <ListItemSecondaryAction>
                                                        <StyledSwitch
                                                            edge="end"
                                                            onChange={handleToggleLight(l.id.toString())}
                                                            checked={lightIsChecked}
                                                            color={"primary"}
                                                        />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </List>
                                        )
                                    })}
                                </StyledNestedListContainer>
                            </Collapse>
                        </React.Fragment>
                    )
                })}
            </List>
        </StyledPaper>
    );
};

export default GroupList;