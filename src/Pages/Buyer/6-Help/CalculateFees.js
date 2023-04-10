import { useState } from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import {Container, Typography, Box} from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import RouteTableItem from "./RouteTableItem";



const CalculateFees = () => {
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
			price : '$15',
		},
		{
			type : 'Air Sensitive',
			time : '2 week',
			price : '$20',
		},
		{
			type : 'Sea Standard',
			time : '4 week',
			price : '$5',
		},
		{
			type : 'Sea Sensitive',
			time : '6 week',
			price : '$10',
		}];

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
					<Container maxWidth="md">
						<Typography variant="h3" component="h1" paragraph>
							Calculate Fee
						</Typography>

						<Typography variant="h6" component="h1" paragraph marginTop={5}>
							Weight
						</Typography>
						<Stack spacing={3}>
							<TextField fullWidth={true} variant="filled" id="length" placeholder="0"
								 InputProps={{
									 startAdornment: (
										 <InputAdornment position="start" >
											 <svg width={24} height={24} viewBox="0 0 20 20" fill="none">
												 <path
													 d="M11.1742 2.09421C10.4212 1.78891 9.57886 1.78891 8.82585 2.09421L7.00085 2.83421L14.9942 5.94254L17.8059 4.85671C17.6906 4.76106 17.5613 4.68376 17.4225 4.62754L11.1742 2.09421Z"
													 fill="#9E9E9E"/>
												 <path
													 d="M18.3333 5.99243L10.625 8.97077V18.0733C10.8117 18.0358 10.995 17.9799 11.1742 17.9074L17.4225 15.3741C17.6916 15.2651 17.9221 15.0782 18.0844 14.8374C18.2466 14.5966 18.3333 14.3128 18.3333 14.0224V5.99326V5.99243Z"
													 fill="#9E9E9E"/>
												 <path
													 d="M9.37496 18.0733V8.97076L1.66663 5.99243V14.0233C1.66679 14.3135 1.75355 14.5971 1.91582 14.8377C2.07808 15.0784 2.30845 15.2651 2.57746 15.3741L8.82579 17.9074C9.00496 17.9799 9.18829 18.0349 9.37496 18.0741V18.0733Z"
													 fill="#9E9E9E"/>
												 <path
													 d="M2.19421 4.85679L10 7.87262L13.2642 6.61095L5.31171 3.51929L2.57755 4.62762C2.43588 4.68512 2.30755 4.76262 2.19421 4.85679Z"
													 fill="#9E9E9E"/>
											 </svg>
										 </InputAdornment>
									 ),
									 endAdornment: (
										 <InputAdornment position="end">
											 kg
										 </InputAdornment>
									 ),
							 }}
							/>
						</Stack>
						<Typography variant="h6" component="h1" paragraph marginTop={5}>
							Dimensions
						</Typography>
						<Stack direction="row" spacing={6} sx={{marginBottom: 10}}>
							<TextField fullWidth={true} variant="filled" label="Length" id="length"
												 InputProps={{
													 inputProps: {
														 pattern: "[0-9]*",
														 inputMode: "numeric",
														 style: { textAlign: "right" },
													 },
												 endAdornment:<InputAdornment position="end">cm</InputAdornment>}} />
							<TextField fullWidth={true} variant="filled" label="Width" id="width"
												 InputProps={{
													 inputProps: {
														 pattern: "[0-9]*",
														 inputMode: "numeric",
														 style: { textAlign: "right" },
													 },
													 endAdornment:<InputAdornment position="end">cm</InputAdornment>}} />
							<TextField fullWidth={true} variant="filled" label="Height" id="height"
												 InputProps={{
													 inputProps: {
														 pattern: "[0-9]*",
														 inputMode: "numeric",
														 style: { textAlign: "right" },
													 },
													 endAdornment:<InputAdornment position="end">cm</InputAdornment>}} />
						</Stack>
						<Button variant="contained" size="large" fullWidth={true} >Calculate</Button>

						<div style={{marginTop: 100}}>
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
export default CalculateFees;