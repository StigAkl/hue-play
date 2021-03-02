import { Grid, Paper } from '@material-ui/core';
import React from 'react'; 
import { IGroup } from '../Interfaces/IGroup';
import { IListItem } from '../Interfaces/IListItem';
import GroupList from './GroupList';

const LightsDashboard = () => {

    const lights: IListItem[] = [{
        checked: true,
        id: 1,
        name: "Light 1"
    },
    {
        checked: false,
        id: 2,
        name: "Light 2"
    }
];

const lights2: IListItem[] = [{
    checked: true,
    id: 3,
    name: "Light 3"
},
{
    checked: false,
    id: 4,
    name: "Light 4"
}
];

const groups: IGroup[] = [{
    checked: false,
    id: 1,
    name: "Bedroom",
    lights: lights
},
{
    checked: true,
    id: 2,
    name: "Living room",
    lights: lights2
}]; 

    return (

        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <GroupList items={groups} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper>
          
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper>
                   
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>

            
        )

}

export default LightsDashboard;