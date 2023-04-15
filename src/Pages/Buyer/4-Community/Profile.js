import {useEffect, useState} from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import {
    Container,
    Typography,
    Box,
    Button,
    Card,
    TableContainer,
    Tooltip,
    IconButton, TableBody, TableRow, TableCell, Avatar, TableHead, Table, Stack, Chip, Paper, CardContent
} from '@mui/material';
import Image from 'mui-image'
import backgroundImg from '../3-Groups/background.jpg';
import {styled} from "@mui/material/styles";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Activity from "./ProfileComponents/Activity";
import UserCardsPage from "./ProfileComponents/UserCardsPage";
import GreenChipGroup from "../../../components/GreenChipGroup";
import GroupCardsPage from "./ProfileComponents/GroupCardsPage";
import PostCard from "./Discover/post-components/PostCard";
import {Pagination} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {findAllUsersThunk} from "../../../redux/users/users-thunks";
import {findAllPostsThunk} from "../../../redux/posts/posts-thunks";
import {getRandomAvatar} from "../../../utils/getRandomAvatar";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const MAX_POSTS_PER_PAGE = 5;

const Profile = (viewUser = '') => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    // chip controller
    const [selected, setSelected] = useState(null);
    const handleChipClick = (value) => {
      setSelected(value);
    };

    // control profile page
    const user = ['myself', 'other'];

    let chipLabelsArray = ['Activity', 'Posts', 'Formed Group', 'Joined Group','Following', 'Followers'];
    if(user==='myself'){
      chipLabelsArray = ['Posts', 'Formed Group','Following', 'Followers'];
    }

    const [filter, setFilter] = useState('Posts');
    const [focusChip, setFocusChip] = useState('Posts');

    const currentUser = useSelector((state) => state.auth.currentUser);

    const [follow, setFollow] = useState(false);
    const handleFollow = () => {
      setFollow(!follow);
    };


    const {users} = useSelector((state) => state.users);
    const {posts} = useSelector((state) => state.posts);
    useEffect(() => {
      dispatch(findAllUsersThunk());
      dispatch(findAllPostsThunk());
    }, []);

    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
      setUserPosts(posts.filter(item => item.userId === currentUser._id));
    }, [posts, currentUser]);

    // count followers
    const countFollowed = users.map(item => item.following).flat().filter(item => item === currentUser._id).length;

    const [page, setPage] = useState(1);
    const handlePaginationChange = (event, page) => {
        setPage(page);
    };

    return (
      <>
          <Header onOpenNav={handleOpen}/>
          {/*-------Box is the layout of the whole page-----*/}
          <Box
            sx={{
                display: {lg: 'flex'},
                minHeight: {lg: 1},
            }}
          >
              {/*--------------Navigation bar------------------*/}
              <NavVertical openNav={open} onCloseNav={handleClose}/>

              {/*--------------Main Content----------------------*/}
              <Main>
                  <Container maxWidth="xl">

                    {/*head part*/}
                      {/*backgroundImg*/}
                      <Box
                        sx={{height: 250, position: 'relative'}}
                      >
                          <Image
                            src={backgroundImg}
                            sx={{
                                width: '100%',
                                zIndex: 1,
                                left: 0,
                                right: 0,
                                position: 'absolute',
                            }}
                          />
                      </Box>

                      {/*avatar & group name & follow button*/}
                      <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'column',
                            position: 'relative',

                        }}
                      >
                          <Box sx={{
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'column'
                          }}>
                              <Avatar
                                alt="Remy Sharp"
                                src={getRandomAvatar(currentUser.name)}
                                sx={{
                                    mx: 'auto',
                                    borderWidth: 2,
                                    borderStyle: 'solid',
                                    borderColor: 'common.white',
                                    top: -64,
                                    zIndex: 2,
                                    width: {xs: 80, md: 128},
                                    height: {xs: 80, md: 128},
                                }}
                              />

                              <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    top: -50,
                                }}>
                                  <Typography variant="h3" align="center">
                                    {currentUser.name}
                                  </Typography>
                                  <Typography align="center" style={{marginTop:8, marginBottom:4}}>
                                      <strong>{countFollowed}</strong>{' '}
                                      <span style={{ color: 'grey', marginRight:10}}>followers</span>{' '}
                                      <strong>{currentUser.following.length}</strong>{' '}
                                      <span style={{ color: 'grey' }}>following</span>{' '}
                                  </Typography>


                                {!viewUser && !follow && (
                                  <Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
                                      <IconButton edge="start" color="inherit" aria-label="menu">
                                          <PersonAddIcon />
                                      </IconButton>
                                      Follow
                                  </Button> )}
                                {!viewUser && follow && (
                                  <Button variant="outlined" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
                                      <IconButton edge="start" color="inherit" aria-label="menu">
                                          <PersonAddIcon />
                                      </IconButton>
                                      Unfollow
                                  </Button>)}


                              </Box>
                          </Box>
                      </Box>


                      {/*bottom part*/}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <GreenChipGroup chipLabelsArray={chipLabelsArray}
                                        focusChip={focusChip}
                                        setFilter={setFilter}
                                        setFocusChip={setFocusChip}/>
                      </div>

                      {/*content*/}
                      <div style={{marginTop:10}}>
                        <CardContent>
                          {focusChip === 'Activity' && (
                            <Activity />
                          )}
                          {focusChip === 'Following' && (
                            <UserCardsPage />
                          )}
                          {focusChip === 'Followers' && (
                            <UserCardsPage />
                          )}
                          {focusChip === 'Formed Group' && (
                            <GroupCardsPage />
                          )}
                          {focusChip === 'Joined Group' && (
                            <GroupCardsPage />
                          )}
                          {focusChip === 'Posts' && (
                            <div style={{
                            display: 'flex',
                            flexDirection:'column',
                            gap: 16 }}>
                          {userPosts.slice(
                              (page - 1) * MAX_POSTS_PER_PAGE,
                              (page - 1) * MAX_POSTS_PER_PAGE + MAX_POSTS_PER_PAGE
                          ).map((post) => (
                            <PostCard
                            title={post.title}
                            post={post.post}
                            author={currentUser.name}
                            date={post.created}
                            image={post.image}
                            comments={post.comments}
                            viewsNumber={post.viewsAmount}
                            repostsNumber={post.repostsNumber} />
                            ))}
                            </div>
                          )}
                        </CardContent>
                      </div>


                    {/*---Pagination---*/}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 100,
                    }}>
                      <Pagination count={Math.ceil((userPosts || []).length / MAX_POSTS_PER_PAGE)}
                                  onChange={handlePaginationChange}
                      />
                    </div>
                  </Container>


              </Main>
              {/*------------------------------------*/}
          </Box>
      </>
    );
};
export default Profile;