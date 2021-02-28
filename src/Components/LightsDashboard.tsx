import { Grid } from '@material-ui/core';
import React from 'react'; 
import { IListItem } from '../Interfaces/IListItem';
import LightList from './LightList';

const LightsDashboard = (props: any) => {

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

    return (

        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <LightList items={lights} />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <LightList items={lights}/>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LightList items={lights}/>
                </Grid>
            </Grid>
        </React.Fragment>

            
        )

}

export default LightsDashboard;