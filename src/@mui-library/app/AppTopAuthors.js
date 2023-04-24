import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha } from '@mui/material/styles';
import {Box, Stack, Card, Avatar, CardHeader, Typography, Button} from '@mui/material';
// utils
import { fShortenNumber } from '../utils/formatNumber';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

// ----------------------------------------------------------------------

AppTopAuthors.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AppTopAuthors({ title, subheader, list, handleFollow, handleUnfollow,...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['favourite'], ['desc']).map((author, index) => (
          <AuthorItem key={author.id} author={author} index={index} handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    favourite: PropTypes.number,
  }),
  index: PropTypes.number,
};

function AuthorItem({ author, index, handleFollow, handleUnfollow }) {
    const currentUser = useSelector(state => state.auth.currentUser || { role: "visitor" });
    const navigate = useNavigate();
  return (
    <Stack direction="row"
           style={{cursor: "pointer"}}
           alignItems="center" spacing={2} onClick={() => navigate((`/profile/${author.id}`))}>
      <Avatar alt={author.name} src={author.avatar} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.name}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          {fShortenNumber(author.favourite)} Followers
        </Typography>
      </Box>
        {
            (currentUser?.following || []).indexOf(author.id) === -1 ?
                <Button variant="contained" onClick={(event) => {
                    event.stopPropagation();
                    handleFollow(author.id);
                }}>Follow</Button>
                :
                <Button variant="outlined" onClick={(event) => {
                    event.stopPropagation();
                    handleUnfollow(author.id);
                }}>Unfollow</Button>
        }
    </Stack>
  );
}
