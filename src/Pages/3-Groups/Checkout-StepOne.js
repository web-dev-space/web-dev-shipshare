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

export default function CheckoutStepOne() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={5}>
				<Grid item xs={6}>
					<ParcelListCard index={true}/>
				</Grid>

				<Grid item xs={6}>

					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography variant="h6" component="div" sx={{ display: 'flex'}}>
								Total
							</Typography>
							<Typography component="div" sx={{ display: 'flex', justifyContent: 'space-between', marginTop:3}}>
								Number of Items
								<Typography sx={{ textAlign: 'right' }}>2 Parcels</Typography>
							</Typography>
							<Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: 1 }}>
								Total
								<Typography sx={{ textAlign: 'right', fontWeight: 'bold' }}>60kg</Typography>
							</Typography>
						</CardContent>
					</Card>

					<Button variant="contained" style={{borderRadius:25, height: 45, marginTop: 30, marginLeft: 20, marginBottom:30, marginRight:20}} fullWidth="true">
						Checkout
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
