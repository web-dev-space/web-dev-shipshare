import { useState } from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


const Warehouse = () => {
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
							Warehouse Address
						</Typography>


							<Typography variant="h5" component="h1" paragraph>
								Address: 1234 Main Street, Anytown, CA 12345
							</Typography>
							<Typography paragraph>
							Please paste the above information into the "Shipping Address" field of your online shopping order.
						</Typography>

					</Container>
				</Main>
				{/*------------------------------------*/}
			</Box>
		</>
	);
};
export default Warehouse;