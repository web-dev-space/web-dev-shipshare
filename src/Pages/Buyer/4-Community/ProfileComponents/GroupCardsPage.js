import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box } from '@mui/material';
// components
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import GroupCard from './GroupCard';

// ----------------------------------------------------------------------

export default function GroupCardsPage() {
	const { themeStretch } = useSettingsContext();

	const groups = [
		{
			id: '5e887d1b7c2b1a7b5c6c7d8e',
			avatar: 'https://source.unsplash.com/random',
			groupName: 'Katarina Smith',
			date:'Mar 13, 2023',
		},
		{
			id: '5e287f1b7c2b1a7b4c6c7w7e',
			avatar: 'https://source.unsplash.com/random',
			groupName: 'Rae',
			date:'Mar 21, 2023',
		},
	]
	return (
		<>
			<Container maxWidth={themeStretch ? false : 'lg'}>

				<div>
					{groups.map((group) => (
						<GroupCard key={group.id} group={group} />
					))}
				</div>
			</Container>
		</>
	);
}
