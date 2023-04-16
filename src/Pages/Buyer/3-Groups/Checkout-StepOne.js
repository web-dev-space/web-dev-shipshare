import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ParcelListCard from '../1-Parcels/parcel-components/ParcelListCard';
import {useState} from "react";


export default function CheckoutStepOne({parcels, setSelectedParcels}) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={5}>
				<Grid item xs={6}>
					<ParcelListCard index={true} parcels={parcels} setSelectedParcels={setSelectedParcels}/>
				</Grid>

				<Grid item xs={6}>

					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography variant="h6" component="div" sx={{ display: 'flex'}}>
								Total
							</Typography>
							<Typography component="div" sx={{ display: 'flex', justifyContent: 'space-between', marginTop:3}}>
								Number of Items
								<Typography sx={{ textAlign: 'right' }}>{parcels.length} Parcels</Typography>
							</Typography>
							<Typography variant="h5" component="div"
													sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: 1 }}>
								Weight
								<Typography sx={{ textAlign: 'right', fontWeight: 'bold' }}>
									{parcels.reduce((acc, parcel) => acc + parcel.weight, 0)} kg
								</Typography>
							</Typography>
						</CardContent>
					</Card>

					{/*<Grid  sx={{ display: 'flex', justifyContent: 'center' }}>*/}
					{/*	<Button variant="contained" style={{ borderRadius: 25, marginTop: 30, marginBottom: 30, maxWidth: 400, height:50 }} fullWidth="true">*/}
					{/*		Checkout*/}
					{/*	</Button>*/}
					{/*</Grid>*/}
				</Grid>
			</Grid>
		</Box>
	);
}
