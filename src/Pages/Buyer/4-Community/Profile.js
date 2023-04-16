import {useEffect, useState} from "react";
import Header from "../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import {
    Container,
    Typography,
    Box,
    Button,
    IconButton, Avatar, Paper, CardContent
} from '@mui/material';
import Image from 'mui-image'
import backgroundImg from '../3-Groups/background.jpg';
import {styled} from "@mui/material/styles";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserCardsPage from "./ProfileComponents/UserCardsPage";
import GreenChipGroup from "../../../components/GreenChipGroup";
import GroupCardsPage from "./ProfileComponents/GroupCardsPage";
import PostCard from "./Discover/post-components/PostCard";
import {Pagination} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {
    findAllUsersThunk,
    updateCurrentUserThunk,
} from "../../../redux/users/users-thunks";
import {findAllPostsThunk} from "../../../redux/posts/posts-thunks";
import {getRandomAvatar} from "../../../utils/getRandomAvatar";
import {useNavigate, useParams} from "react-router-dom";
import {findAllShipGroupsThunk} from "../../../redux/shipGroups/shipGroups-thunks";
import {getRandomBanner} from "../../../utils/getRandomBanner";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const MAX_POSTS_PER_PAGE = 5;

const getFollowers = (users, currentUser) => {
    return users.filter(item => currentUser && (item.following || [])
        .find((id) => id === currentUser._id));
};

const Profile = () => {

    const dispatch = useDispatch();
    const { userId } = useParams();
    const {users} = useSelector((state) => state.users);
    const {posts} = useSelector((state) => state.posts);
    const {shipGroups} = useSelector((state) => state.shipGroup);

    const currentUser = useSelector((state) => state.auth.currentUser);

    const [open, setOpen] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [focusChip, setFocusChip] = useState('Posts');
    const [follow, setFollow] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [page, setPage] = useState(1);
    const [visibleProfile, setVisibleProfile] = useState(null);
    const [allowFollow, setAllowFollow] = useState(false);
    const [formedGroup, setFormedGroup] = useState([]);
    const [joinedGroup, setJoinedGroup] = useState([]);

    const chipLabelsArray = userId ? ['Posts', 'Formed Group','Following', 'Followers']
        : ['Posts', 'Formed Group', 'Joined Group','Following', 'Followers'];

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // control profile page
    const handleFollow = () => {
        if (follow) {
            dispatch(updateCurrentUserThunk({
                ...currentUser,
                following: currentUser.following.filter(item => item !== visibleProfile._id),
            })).then(() =>
                dispatch(findAllUsersThunk()));
        } else {
            dispatch(updateCurrentUserThunk({
                ...currentUser,
                following: [
                    ...currentUser.following,
                    visibleProfile._id,
                ],
            })).then(() =>
                dispatch(findAllUsersThunk()));
        }
    };

    const handlePaginationChange = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
      dispatch(findAllUsersThunk());
      dispatch(findAllPostsThunk());
      dispatch(findAllShipGroupsThunk());
    }, []);

    useEffect(() => {
        if (userId) {
            const user = users.find(item => item._id === userId);
            setVisibleProfile(user);
        } else {
            setVisibleProfile(currentUser);
        }
    }, [users, userId, currentUser]);

    useEffect(() => {
        if (visibleProfile) {
            setUserPosts(posts.filter(item => item.userId === visibleProfile._id));
        }
    }, [posts, visibleProfile]);

    useEffect(() => {
        if (visibleProfile && currentUser) {
            setAllowFollow(currentUser.role === 'buyer'
                && visibleProfile.role === 'buyer'
                && currentUser._id !== visibleProfile._id);
            setFollow(currentUser.following.includes(visibleProfile._id));
            setFollowers(getFollowers(users, visibleProfile).length);
        }
    }, [currentUser, visibleProfile, users]);

    useEffect(() => {
        if (visibleProfile) {
            console.log(shipGroups);
            setFormedGroup(shipGroups.filter(item => item.leader === visibleProfile.email));
            setJoinedGroup(shipGroups.filter(item => item.members.includes(visibleProfile.email)));
        }
    }, [visibleProfile, shipGroups]);

    const navigate = useNavigate();
    function onPostCardClick  (id) {
      navigate(`../discover/post/${id}`);
    }

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
                            src={visibleProfile? getRandomBanner(visibleProfile?.name || "1") : backgroundImg}
                            sx={{
                                width: '100%',
                                zIndex: 1,
                                left: 0,
                                right: 0,
                                position: 'absolute',
                            }}
                            style={{borderRadius: 20}}
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
                                src={visibleProfile? (visibleProfile?.avatar || getRandomAvatar(visibleProfile?.name)) : ""}
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
                                    {visibleProfile?.name}
                                  </Typography>
                                  {
                                      visibleProfile?.role === 'buyer' && (
                                          <Typography align="center" style={{marginTop:8, marginBottom:4}}>
                                              <strong>{followers}</strong>{' '}
                                              <span style={{ color: 'grey', marginRight:10}}>followers</span>{' '}
                                              <strong>{visibleProfile?.following?.length}</strong>{' '}
                                              <span style={{ color: 'grey' }}>following</span>{' '}
                                          </Typography>
                                      )
                                  }


                                {allowFollow && userId && !follow && (
                                  <Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
                                      <IconButton edge="start" color="inherit" aria-label="menu">
                                          <PersonAddIcon />
                                      </IconButton>
                                      Follow
                                  </Button> )}
                                {allowFollow && userId && follow && (
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
                                        setFilter={setFocusChip}
                                        setFocusChip={setFocusChip}/>
                      </div>

                      {/*content*/}
                      <div style={{marginTop:10}}>
                        <CardContent>
                          {focusChip === 'Following' && (
                            <UserCardsPage users={visibleProfile
                                .following.map(id => users.find(user => user._id === id))}
                            allUsers={users} allPosts={posts}
                                           dispatch={dispatch}/>
                          )}
                          {focusChip === 'Followers' && (
                            <UserCardsPage
                                users={getFollowers(users, visibleProfile)}
                                allUsers={users}
                                allPosts={posts}
                                dispatch={dispatch}
                            />
                          )}
                          {focusChip === 'Formed Group' && (
                            <GroupCardsPage groups={formedGroup}/>
                          )}
                          {focusChip === 'Joined Group' && (
                            <GroupCardsPage groups={joinedGroup}/>
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
                            author={visibleProfile?.name}
                            date={post.created}
                            image={post.image}
                            comments={post.comments}
                            viewsNumber={post.viewsAmount}
                            repostsNumber={post.repostsNumber}
                            onPostCardClick={()=>onPostCardClick(post._id)}/>
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