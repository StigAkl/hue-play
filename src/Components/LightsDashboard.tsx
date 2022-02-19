import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { IGroup } from '../Interfaces/IGroup';
import { ILightItem } from '../Interfaces/ILightItem';
import GroupList from './GroupList';

type Props = {
    lights: ILightItem[]
};

const LightsDashboard = ({ lights }: Props) => {

    const dummyLights: ILightItem[] = [{
        checked: true,
        id: 3,
        name: "Dummy Light 3"
    },
    {
        checked: false,
        id: 4,
        name: "Dummy Light 4"
    }
    ];

    const groups: IGroup[] = [{
        checked: true,
        id: 1,
        name: "Dummy group",
        lights: dummyLights
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
                        {/* Alerts */}
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper>
                        {/* Schedules? */}
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default LightsDashboard;