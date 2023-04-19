import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ParcelListCard from '../1-Parcels/parcel-components/ParcelListCard';
import {useEffect, useState} from "react";


export default function CheckoutStepOne({parcels, selectedParcels, setSelectedParcels}) {
  return (
    <Box
      sx={{
        // flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}

    >
      <Grid container
            spacing={5}
            sx={{
              justifyContent: 'center',
            }}>
        <Grid item xs={12} sm={12} md={6}>
          <ParcelListCard index={true} parcels={parcels} setSelectedParcels={setSelectedParcels}/>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>

          <Card sx={{minWidth: 350}}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{display: 'flex'}}>
                Total
              </Typography>
              <Typography component="div" sx={{display: 'flex', justifyContent: 'space-between', marginTop: 3}}>
                Number of Items
                <Typography sx={{textAlign: 'right'}}>{selectedParcels.length} Parcels</Typography>
              </Typography>
              <Typography variant="h5" component="div"
                          sx={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: 1}}>
                Weight
                <Typography sx={{textAlign: 'right', fontWeight: 'bold'}}>
                  {(selectedParcels.reduce((acc, parcel) => acc + parcel.weight, 0)).toFixed(1)} kg
                </Typography>
              </Typography>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Box>
  );
}
