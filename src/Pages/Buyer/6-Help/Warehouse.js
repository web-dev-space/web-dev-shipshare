import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from "react";
// clipboard
import useCopyToClipboard from "@mui-library/hooks/useCopyToClipboard";
import useDoubleClick from '@mui-library/hooks/useDoubleClick';
import { useSnackbar } from "notistack";
import { Helmet } from "react-helmet";
import { findWarehouseByCompany } from "redux/warehouse/warehouse-service";


const Warehouse = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [currentWarehouse, setCurrentWarehouse] = useState(null);
	useEffect(() => {
		const fetchWarehouse = async () => {
			try {
				const response = await findWarehouseByCompany("ShipShare Official");
				setCurrentWarehouse(response[0]);
				console.log(response)
			} catch (e) {
				console.log(e);
			}
		}
		fetchWarehouse().then(r => r);
	},[setCurrentWarehouse]);



	// handle copy to clipboard
	const { enqueueSnackbar } = useSnackbar();
	const { copy } = useCopyToClipboard();

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
		currentWarehouse?
		`Receiver: ${currentWarehouse.receiver}` + "\n" +
		`Phone Number: ${currentWarehouse.phoneNumber}` + "\n" +
		`Address: ${currentWarehouse.street}, ${currentWarehouse.city}, ${currentWarehouse.province}`
		: "";

	return (
		<>
			<Helmet>
				<title>Warehouse | ShipShare</title>
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
					<Container maxWidth='md'>
						<Typography variant="h4" component="h1" paragraph>
							Warehouse Address
						</Typography>

						<Card onClick={handleClick} sx={{ p: 3 }}>
							<Stack direction="row" spacing={1}>
								<Typography paragraph style={{fontSize: 18, fontWeight: 'bold'}}>Receiver: </Typography>
								{currentWarehouse && <Typography paragraph style={{fontSize: 18}}>{currentWarehouse.receiver}</Typography>}
							</Stack>
							<Stack direction="row" spacing={1}>
								<Typography paragraph style={{fontSize: 18, fontWeight: 'bold'}}>Phone Number: </Typography>
								{currentWarehouse && <Typography paragraph style={{fontSize: 18}}>{currentWarehouse.phoneNumber}</Typography>}
							</Stack>
							<Stack direction="row" spacing={1}>
								<Typography paragraph style={{fontSize: 18, fontWeight: 'bold'}}>Address: </Typography>
								{currentWarehouse && <Typography paragraph style={{fontSize: 18}}>{currentWarehouse.street}, {currentWarehouse.city}, {currentWarehouse.province}</Typography>}
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