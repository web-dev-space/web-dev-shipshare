import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box } from '@mui/material';
// components
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import GroupCard from './GroupCard';

// ----------------------------------------------------------------------

export default function GroupCardsPage({groups}) {
	const { themeStretch } = useSettingsContext();

	return (
		<>
			<Container maxWidth={themeStretch ? false : 'lg'}>

				<div>
					{groups.map((group) => (
						<GroupCard key={group._id} group={group} />
					))}
				</div>
			</Container>
		</>
	);
}
