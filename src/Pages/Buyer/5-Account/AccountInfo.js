import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Box, Typography } from '@mui/material';
// _mock_
import { _userList } from '../../../third-party/_mock/arrays';
// components
import { useSettingsContext } from '../../../third-party/components/settings';
import CustomBreadcrumbs from '../../../third-party/components/custom-breadcrumbs';
// sections
import UserNewEditForm from './UserEditNewForm';
import Header from "../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical";
import {useState} from "react";
import Main from "../../../third-party/layouts/dashboard/Main"

// ----------------------------------------------------------------------

export default function UserEditPage() {
	const { themeStretch } = useSettingsContext();

	const { name } = useParams();

	const currentUser = _userList?.find((user) => paramCase(user.name) === name);

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
						<Typography variant="h4" paragraph>
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
