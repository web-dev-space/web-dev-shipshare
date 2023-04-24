// @mui
import { Container } from '@mui/material';
// components
import { useSettingsContext } from '@mui-library/components/settings';
// sections
import { Pagination } from "@mui/lab";
import React from "react";
import GroupCard from './GroupCard';

// ----------------------------------------------------------------------

const MAX_GROUPS_PER_PAGE = 5;
export default function GroupCardsPage({groups}) {
	const { themeStretch } = useSettingsContext();
	const [page, setPage] = React.useState(1);

	const handlePaginationChange = (event, page) => {
		setPage(page);
	};

	return (
		<>
			<Container maxWidth={themeStretch ? false : 'lg'}>

				<div>
					{groups.slice(
						(page - 1) * MAX_GROUPS_PER_PAGE,
						(page - 1) * MAX_GROUPS_PER_PAGE + MAX_GROUPS_PER_PAGE
					).map((group) => (
						<GroupCard key={group._id} group={group} />
					))}
				</div>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: 100,
				}}>
					<Pagination count={Math.ceil((groups || []).length / MAX_GROUPS_PER_PAGE)}
								onChange={handlePaginationChange}
					/>
				</div>
			</Container>
		</>
	);
}
