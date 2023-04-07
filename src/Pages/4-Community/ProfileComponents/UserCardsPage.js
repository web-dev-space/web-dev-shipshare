import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box } from '@mui/material';
// components
import { useSettingsContext } from '../../../third-party/components/settings';
// sections
import UserCard from './UserCard';

// ----------------------------------------------------------------------

export default function UserCardsPage() {
	const { themeStretch } = useSettingsContext();

	const users = [
		{
			id: '5e887d1b7c2b1a7b5c6c7d8e',
			avatar: '/static/mock-images/avatars/avatar_default.jpg',
			name: 'Katarina Smith',
			email: 'asfbvsafv@mail.com',
			role: 'admin',
			createdAt: '2020-12-20T15:24:16.000Z',
			cover:'https://source.unsplash.com/random',
			follower: '1341', totalPosts:"1524",
			avatarUrl: 'awgvqe',
			following: '4574',
		},
		]
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
						<UserCard key={user.id} user={user} />
					))}
				</Box>
			</Container>
		</>
	);
}
