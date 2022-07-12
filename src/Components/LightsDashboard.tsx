import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { IGroup } from '../Interfaces/IGroup';
import GroupList from './Common/GroupList';

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

                <Grid item xs={12} md={12}>
                    <Paper>
                        {<h1>Alerts?</h1>}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Paper>
                        {<h1>Schedules?</h1>}
                    </Paper>
                </Grid>
            </Grid>


        </React.Fragment>
    )
}

export default LightsDashboard;