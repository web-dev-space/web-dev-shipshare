import { Helmet } from 'react-helmet';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Box, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../../@mui-library/components/settings';
// sections
import UserNewEditForm from './UserEditNewForm';
import Header from "../../../@mui-library/layouts/dashboard/header";
import NavVertical from "../../../@mui-library/layouts/dashboard/nav/NavVertical";
import {useEffect, useState} from "react";
import Main from "../../../@mui-library/layouts/dashboard/Main"
import {useDispatch, useSelector} from "react-redux";
import {findUserById} from "../../../redux/users/users-service";


// ----------------------------------------------------------------------

export default function UserEditPage() {
	const { themeStretch } = useSettingsContext();

	const { name } = useParams();

	// const currentUser = _userList?.find((user) => paramCase(user.name) === name);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const currentUser = useSelector((state) => state.auth.currentUser);


	return (
		<>
			<Helmet>
				<title>Account info | ShipShare</title>
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
							Edit Account Info
						</Typography>
						<UserNewEditForm isEdit currentUser={currentUser} />
					</Container>
				</Main>
			{/*</Container>*/}
			</Box>
		</>
	);
}
