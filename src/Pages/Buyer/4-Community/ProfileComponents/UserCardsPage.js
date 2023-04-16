import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box } from '@mui/material';
// components
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import UserCard from './UserCard';
import {useSelector} from "react-redux";

// ----------------------------------------------------------------------
const getFollowers = (users, currentUser) => {
	return users.map(item => item.following).flat().filter(item => currentUser && item === currentUser._id);
};

const getPosts = (posts, currentUser) => {
	return posts.filter(item => item.userId === currentUser._id);
};
export default function UserCardsPage({users, allUsers, allPosts, dispatch}) {
	const { themeStretch } = useSettingsContext();
	const currentUser = useSelector((state) => state.auth.currentUser);

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
					{users.map((user) => (
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
			</Container>
		</>
	);
}
