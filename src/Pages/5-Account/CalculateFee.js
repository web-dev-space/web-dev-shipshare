import { useState } from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
import {Container, Typography, Box, FilledInput} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InventoryIcon from '@mui/icons-material/Inventory';



const CalculateFee = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Header onOpenNav={handleOpen} />
			{/*-------Box is the layout of the whole page-----*/}
			<Box
				sx={{
					display: { lg: 'flex' },
					minHeight: { lg: 1 },
				}}
			>
				{/*--------------Navigation bar------------------*/}
				<NavVertical openNav={open} onCloseNav={handleClose} />

				{/*--------------Main Content----------------------*/}
				<Main>
					<Container maxWidth={false}>
						<Typography variant="h3" component="h1" paragraph>
							Calculate Fee
						</Typography>

						<Typography variant="h6" component="h1" paragraph marginTop={5}>
							Weight
						</Typography>
						<Stack spacing={3} >
							{/*<FilledInput startAdornment={<InputAdornment position="start"><InventoryIcon /></InputAdornment>}*/}
							{/*						 endAdornment={<InputAdornment position="end">kg</InputAdornment>} />*/}
							<TextField fullWidth={true} variant="filled" id="length" label="weight" placeholder="0"
												 InputProps={{
													 startAdornment: (
														 <InputAdornment position="start">
															 <InventoryIcon />
														 </InputAdornment>
													 ),
													 endAdornment: (
														 <InputAdornment position="end">
															 kg
														 </InputAdornment>
													 )
												 }} />
						</Stack>
						<Typography variant="h6" component="h1" paragraph marginTop={5}>
							Dimensions
						</Typography>
						<Stack direction="row" spacing={6} sx={{marginBottom: 10}}>
							<TextField fullWidth={true} variant="filled" label="Length" id="length"
												 InputProps={{endAdornment:<InputAdornment position="end">cm</InputAdornment>}} />
							<TextField fullWidth={true} variant="filled" label="Width" id="width"
												 InputProps={{endAdornment:<InputAdornment position="end">cm</InputAdornment>}} />
							<TextField fullWidth={true} variant="filled" label="Height" id="height"
												 InputProps={{endAdornment:<InputAdornment position="end">cm</InputAdornment>}} />
						</Stack>
						<Button variant="contained" size="large" fullWidth={true}>Calculate</Button>
					</Container>
				</Main>
				{/*------------------------------------*/}
			</Box>
		</>
	);
};
export default CalculateFee;