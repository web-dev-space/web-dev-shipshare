import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Box, Container, Typography } from '@mui/material';
import { useState } from "react";
import { Helmet } from "react-helmet";
import RouteTableItem from "./RouteTableItem";



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