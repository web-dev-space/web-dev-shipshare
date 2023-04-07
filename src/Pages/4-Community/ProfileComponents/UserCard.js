import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {Box, Card, Avatar, Divider, Typography, Stack, IconButton, Button} from '@mui/material';
// utils
import { fShortenNumber } from '../../../third-party/utils/formatNumber';
// _mock
import { _socials } from '../../../third-party/_mock/arrays';
// components
import Image from '../../../third-party/components/image';
import Iconify from '../../../third-party/components/iconify';
import SvgColor from '../../../third-party/components/svg-color';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {useState} from "react";

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
	top: 0,
	left: 0,
	zIndex: 8,
	width: '100%',
	height: '100%',
	position: 'absolute',
	backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

UserCard.propTypes = {
	user: PropTypes.object,
};

export default function UserCard({ user }) {
	const { name, cover, follower, totalPosts, avatarUrl, following } = user;
	const [follow, setFollow] = useState(false);
	const handleFollow = () => {
		setFollow(!follow);
	};

	return (
		<Card sx={{ textAlign: 'center' }}>
			<Box sx={{ position: 'relative' }}>
				<SvgColor
					src="/assets/shape_avatar.svg"
					sx={{
						width: 144,
						height: 62,
						zIndex: 10,
						left: 0,
						right: 0,
						bottom: -26,
						mx: 'auto',
						position: 'absolute',
						color: 'background.paper',
					}}
				/>

				<Avatar
					alt={name}
					src={avatarUrl}
					sx={{
						width: 64,
						height: 64,
						zIndex: 11,
						left: 0,
						right: 0,
						bottom: -32,
						mx: 'auto',
						position: 'absolute',
					}}
				/>

				<StyledOverlay />

				<Image src={cover} alt={cover} ratio="16/9" />
			</Box>

			<Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
				{name}
			</Typography>

			{/*<Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, width: 120 , marginBottom:30, marginTop:10}}>*/}
			{/*	Follow*/}
			{/*</Button>*/}
			{!follow && (
				<Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
					Follow
				</Button> )}
			{follow && (
				<Button variant="outlined" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
					Unfollow
				</Button>)}

			<Divider sx={{ borderStyle: 'dashed' }} />

			<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
				<div>
					<Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
						Follower
					</Typography>
					<Typography variant="subtitle1">{fShortenNumber(follower)}</Typography>
				</div>

				<div>
					<Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
						Following
					</Typography>

					<Typography variant="subtitle1">{fShortenNumber(following)}</Typography>
				</div>

				<div>
					<Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
						Total Post
					</Typography>
					<Typography variant="subtitle1">{fShortenNumber(totalPosts)}</Typography>
				</div>
			</Box>
		</Card>
	);
}
