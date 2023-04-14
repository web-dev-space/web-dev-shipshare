import {useMemo, useState} from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box, Card, Stack } from '@mui/material';
// clipboard
import {useSnackbar} from "notistack";
import useDoubleClick from '../../../third-party/hooks/useDoubleClick';
import useCopyToClipboard from "../../../third-party/hooks/useCopyToClipboard";
import {useSelector} from "react-redux";


const Warehouse = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const currentUser = useSelector((state) => state.auth.currentUser);
	console.log("current userId is " + currentUser._id);
	console.log("current address is "+ currentUser.warehouseAddress);


	// handle copy to clipboard
	const { enqueueSnackbar } = useSnackbar();

	const { copy } = useCopyToClipboard();

	// handle text
	// let currentAddress = {
	// 	receiver: "John",
	// 	street: "1234 Main St",
	// 	city: "Guangzhou",
	// 	province: "Guangdong",
	// 	phoneNumber: "13800001234",
	// };
	//
	// const fullAddress = `${currentAddress.street}, ${currentAddress.city}, ${currentAddress.province}`;
	// const textOnClick =
	// 	`Receiver: ${currentAddress.receiver}` + "\n" +
	// 	`Phone Number: ${currentAddress.phoneNumber}` + "\n" +
	// 	`Address: ${fullAddress}`;

	const onCopy = (text) => {
		if (text) {
			enqueueSnackbar('Copied!');
			copy(text);
		}
	};

	const handleClick = useDoubleClick({
		doubleClick: () => onCopy(textOnClick),
	});



	const textOnClick =
		`Receiver: ${currentUser.warehouseReceiver}` + "\n" +
		`Phone Number: ${currentUser.warehousePhone}` + "\n" +
		`Address: ${currentUser.warehouseAddress}`;

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
					<Container maxWidth='md'>
						<Typography variant="h3" component="h1" paragraph>
							Warehouse Address
						</Typography>

						<Card onClick={handleClick} sx={{ p: 3 }}>
							<Stack direction="row" spacing={1}>
								<Typography paragraph style={{fontSize: 18, fontWeight: 'bold'}}>Receiver: </Typography>
								<Typography paragraph style={{fontSize: 18}}>{currentUser.warehouseReceiver}</Typography>
							</Stack>
							<Stack direction="row" spacing={1}>
								<Typography paragraph style={{fontSize: 18, fontWeight: 'bold'}}>Phone Number: </Typography>
								<Typography paragraph style={{fontSize: 18}}>{currentUser.warehousePhone}</Typography>
							</Stack>
							<Stack direction="row" spacing={1}>
								<Typography paragraph style={{fontSize: 18, fontWeight: 'bold'}}>Address: </Typography>
								<Typography paragraph style={{fontSize: 18}}>{currentUser.warehouseAddress}</Typography>
							</Stack>
						</Card>

						<Typography paragraph style={{color: 'grey', marginTop: 20}}>
							Double click on the card above to copy it to your clipboard.
						</Typography>

						<Typography paragraph style={{color: 'grey'}}>
							Then you can paste the address into the "Shipping Address" field of your online shopping order.
						</Typography>

					</Container>
				</Main>
				{/*------------------------------------*/}
			</Box>
		</>
	);
};
export default Warehouse;