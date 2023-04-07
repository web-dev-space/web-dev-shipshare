import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ParcelListCard from "./ParcelListCard";


const parcels = [  {    name: 'Parcel 1',    image: 'https://picsum.photos/200/300',    logisticsNumber: 'LOG001',    weight: '10 kg',  },  {    name: 'Parcel 2',    image: 'https://picsum.photos/200/300',    logisticsNumber: 'LOG002',    weight: '5 kg',  },];

const shipment = {
	shipmentType: 'Air Standard',
	deliveryDate: 'Mar 10, 2023',
	deliveryAddress: 'Apt 505, 425 El Camino Real Santa Clara, CA 95056',
};

const totalExpense = {
	shipping: 50,
	tax: 5,
	total: 55,
};

export default function CheckoutStepTwo() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={5}>
				<Grid item xs={6}>
					<ParcelListCard index={false}/>
				</Grid>

				<Grid item xs={6}>
					<Card sx={{ minWidth: 275, borderRadius: 3, marginBottom:8}}>
						<CardContent>
							<Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
								Shipment Information
							</Typography>
							<Typography variant="body1" component="div">
								<div>Air Standard</div>
								<div>March 10, 2023</div>
								<div>Apt 505, 425 El Camino Real, Santa Clara, CA 95056</div>
							</Typography>
						</CardContent>
					</Card>

					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
								Route Rate
								<Typography sx={{ textAlign: 'right' }}>15/kg</Typography>
							</Typography>
							<Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
								Weight
								<Typography sx={{ textAlign: 'right' }}>5.5kg</Typography>
							</Typography>
							<Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '20px' }}>
								Total
								<Typography sx={{ textAlign: 'right' }}>60</Typography>
							</Typography>
						</CardContent>
					</Card>

					{/*<Button variant="contained" style={{borderRadius:15, marginTop: 30, marginBottom:30, marginRight:20, maxWidth:400}} fullWidth="true" >*/}
					{/*	Place Order*/}
					{/*</Button>*/}
					<Grid  sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button variant="contained" style={{ borderRadius: 25, marginTop: 30, marginBottom: 30, maxWidth: 400, height:50}} fullWidth="true">
							Place Order
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
