import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../third-party/routes/paths';
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

	const currentUser = _userList.find((user) => paramCase(user.name) === name);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{/*<Helmet>*/}
			{/*	<title> User: Edit user | Minimal UI</title>*/}
			{/*</Helmet>*/}
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
			{/*<Container maxWidth={themeStretch ? false : 'lg'}>*/}
				{/*<CustomBreadcrumbs*/}
				{/*	heading="Edit user"*/}
				{/*	links={[*/}
				{/*		{*/}
				{/*			name: 'Dashboard',*/}
				{/*			href: PATH_DASHBOARD.root,*/}
				{/*		},*/}
				{/*		{*/}
				{/*			name: 'User',*/}
				{/*			href: PATH_DASHBOARD.user.list,*/}
				{/*		},*/}
				{/*		{ name: currentUser?.name },*/}
				{/*	]}*/}
				{/*/>*/}

				<UserNewEditForm isEdit currentUser={currentUser} />
			</Container>
				</Main>
			{/*</Container>*/}
			</Box>
		</>
	);
}
