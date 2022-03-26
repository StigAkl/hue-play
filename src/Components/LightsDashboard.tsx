import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { IGroup } from '../Interfaces/IGroup';
import { ILightItem } from '../Interfaces/ILightItem';
import GroupList from './GroupList';

type Props = {
    lightGroups: IGroup[]
};

const LightsDashboard = ({ lightGroups }: Props) => {
    return (
        <React.Fragment>
            <Grid container spacing={10}>
                <Grid item xs={12} md={12}>
                    <GroupList items={lightGroups} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper>
                        {/* Alerts? */}
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