// @mui
import { Box, Container } from '@mui/material';
// components
import { useSettingsContext } from '@mui-library/components/settings';
// sections
import { Pagination } from "@mui/lab";
import React from "react";
import { useSelector } from "react-redux";
import UserCard from './UserCard';

// ----------------------------------------------------------------------
const getFollowers = (users, currentUser) => {
	return users.map(item => item.following).flat().filter(item => currentUser && item === currentUser._id);
};

const getPosts = (posts, currentUser) => {
	return posts.filter(item => item.userId === currentUser._id);
};

const MAX_USERS_PER_PAGE = 6;
export default function UserCardsPage({users, allUsers, allPosts, dispatch}) {
	const { themeStretch } = useSettingsContext();
	const currentUser = useSelector((state) => state.auth.currentUser);

	const [page, setPage] = React.useState(1);

	const handlePaginationChange = (event, page) => {
		setPage(page);
	};

	return (
		<>
			<Container maxWidth={themeStretch ? false : 'lg'}>
				<Box
					gap={3}
					display="grid"
					gridTemplateColumns={{
						xs: 'repeat(1, 1fr)',
						sm: 'repeat(2, 1fr)',
						md: 'repeat(3, 1fr)',
					}}
				>
					{users.slice(
						(page - 1) * MAX_USERS_PER_PAGE,
						(page - 1) * MAX_USERS_PER_PAGE + MAX_USERS_PER_PAGE
					).map((user) => (
						<UserCard key={user?._id}
								  disableFollowButton={currentUser && (currentUser._id === user?._id)}
								  dispatch={dispatch}
								  user={{
									  ...user,
									  followers: getFollowers(allUsers, user),
									  posts: getPosts(allPosts, user),
								  }} />
					))}
				</Box>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: 100,
				}}>
					<Pagination count={Math.ceil((users || []).length / MAX_USERS_PER_PAGE)}
								onChange={handlePaginationChange}
					/>
				</div>
			</Container>
		</>
	);
}
