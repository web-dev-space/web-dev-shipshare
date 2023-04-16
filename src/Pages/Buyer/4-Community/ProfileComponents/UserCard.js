import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {Box, Card, Avatar, Divider, Typography, Stack, IconButton, Button} from '@mui/material';
// utils
import { fShortenNumber } from '../../../../third-party/utils/formatNumber';
// _mock
import { _socials } from '../../../../third-party/_mock/arrays';
// components
import Image from '../../../../third-party/components/image';
import Iconify from '../../../../third-party/components/iconify';
import SvgColor from '../../../../third-party/components/svg-color';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {useState} from "react";
import {getRandomAvatar} from "../../../../utils/getRandomAvatar";
import {useNavigate} from "react-router-dom";
import {findAllUsersThunk, updateCurrentUserThunk} from "../../../../redux/users/users-thunks";
import {useSelector} from "react-redux";

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

export default function UserCard({ user, disableFollowButton, dispatch }) {
	const navigate = useNavigate();
	const { name, cover, followers, posts, avatar, following } = user;

	const currentUser = useSelector((state) => state.auth.currentUser);
	const follow = currentUser.following.includes(user._id)

	// control profile page
	const handleFollow = () => {
		if (follow) {
			dispatch(updateCurrentUserThunk({
				...currentUser,
				following: currentUser.following.filter(item => item !== user._id),
			})).then(() =>
				dispatch(findAllUsersThunk()));
		} else {
			dispatch(updateCurrentUserThunk({
				...currentUser,
				following: [
					...currentUser.following,
					user._id,
				],
			})).then(() =>
				dispatch(findAllUsersThunk()));
		}
	};

	return (
		<Card sx={{ textAlign: 'center' }} onClick={() => navigate(`./${user._id}`)}>
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
					src={avatar || name ? getRandomAvatar(name) : ''}
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

				<Image src="https://source.unsplash.com/random" alt={name} ratio="16/9" />
			</Box>

			<Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
				{name}
			</Typography>

			{/*<Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, width: 120 , marginBottom:30, marginTop:10}}>*/}
			{/*	Follow*/}
			{/*</Button>*/}
			{!disableFollowButton && !follow && (
				<Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
					Follow
				</Button> )}
			{!disableFollowButton && follow && (
				<Button variant="outlined" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
					Unfollow
				</Button>)}

			<Divider sx={{ borderStyle: 'dashed' }} />

			<Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
				<div>
					<Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
						Follower
					</Typography>
					<Typography variant="subtitle1">{fShortenNumber(followers.length)}</Typography>
				</div>

				<div>
					<Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
						Following
					</Typography>

					<Typography variant="subtitle1">{fShortenNumber(following.length)}</Typography>
				</div>

				<div>
					<Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
						Total Post
					</Typography>
					<Typography variant="subtitle1">{fShortenNumber(posts.length)}</Typography>
				</div>
			</Box>
		</Card>
	);
}
