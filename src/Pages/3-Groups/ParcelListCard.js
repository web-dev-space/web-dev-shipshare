import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Sample parcel data
const parcels = [
	{
		id: 1,
		name: 'Parcel A',
		trackingNumber: 'ABC123',
		weight: 10,
		imageUrl: 'https://via.placeholder.com/150',
	},
	{
		id: 2,
		name: 'Parcel B',
		trackingNumber: 'XYZ789',
		weight: 5,
		imageUrl: 'https://via.placeholder.com/150',
	},
	// Add more parcels here
];

export default function ParcelListCard({index}) {
	const firstPage = index;
	const [selectedParcels, setSelectedParcels] = useState([]);

	const handleEditCartClick = () => {
		// Handle edit cart button click event here
	};

	return (
		<Card sx={{ borderRadius: 3, minWidth: 275, minHeight: 550}}>
			{firstPage? <CardHeader title="Parcels Arrived"/>:<CardHeader title="Parcels" />}
			<CardContent>
				{firstPage? <FormControlLabel control={<Checkbox defaultChecked />} style={{marginLeft:1}} label="Select All" />:null}
				{parcels.map((parcel) => (
					<Box
						key={parcel.id}
						sx={{ display: 'flex', alignItems: 'center', py: 2 }}
					>
						{firstPage? <Checkbox/>:null}
						<Box sx={{ flexShrink: 0 }}>
							<img src={parcel.imageUrl} alt={parcel.name} width={80} height={80} style={{borderRadius:15}}/>
						</Box>
						<Box sx={{ flexGrow: 1, pl: 2 }}>
							<Typography variant="subtitle1">{parcel.name}</Typography>
							<Typography variant="body2">
								Tracking Number: {parcel.trackingNumber}
							</Typography>
							<Typography variant="body2">
								Weight: {parcel.weight} lbs
							</Typography>
						</Box>
					</Box>
				))}
			</CardContent>

			{!firstPage &&
			<CardActions >
				<Button variant="outlined" style={{borderRadius:15, marginLeft: 20, marginBottom:30, marginRight:20, maxWidth: 400}} fullWidth="true">
					Edit Cart
				</Button>
			</CardActions>}
		</Card>
	);
}
