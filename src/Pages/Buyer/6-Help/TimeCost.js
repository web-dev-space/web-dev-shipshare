import { useState } from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import {Container, Typography, Box, FilledInput} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InventoryIcon from '@mui/icons-material/Inventory';
import RouteTableItem from "./RouteTableItem";
import {Helmet} from "react-helmet";



const TimeCost = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const items = [
		{
			type : 'Air Standard',
			time : '1 week',
			price : '15',
		},
		{
			type : 'Air Sensitive',
			time : '2 week',
			price : '20',
		},
		{
			type : 'Sea Standard',
			time : '4 week',
			price : '5',
		},
		{
			type : 'Sea Sensitive',
			time : '6 week',
			price : '10',
		}];

	return (
		<>
			<Helmet>
				<title>Time & Cost | ShipShare</title>
			</Helmet>
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
					<Container maxWidth="md">
						<Typography variant="h4" component="h1" paragraph>
							Time & Cost
						</Typography>


						<div>
							{items.map((item, index) => (
								<RouteTableItem
									index={index}
									altText={item.type}
									type={item.type}
									time={item.time}
									price={item.price}
								/>
							))}
						</div>

					</Container>
				</Main>
				{/*------------------------------------*/}
			</Box>
		</>
	);
};
export default TimeCost;