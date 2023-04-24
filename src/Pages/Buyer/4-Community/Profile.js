import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Pagination } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Container,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import { styled } from "@mui/material/styles";
import ReviewPage from "Pages/Buyer/4-Community/ProfileComponents/ReviewPage";
import Image from 'mui-image';
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findReviewsByUserIdThunk } from "redux/reviews/reviews-thunks";
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import GreenChipGroup from "components/GreenChipGroup";
import { findAllPostsThunk } from "redux/posts/posts-thunks";
import { findAllShipGroupsThunk } from "redux/shipGroups/shipGroups-thunks";
import {
  findAllUsersThunk,
  updateCurrentUserThunk,
} from "redux/users/users-thunks";
import { getRandomAvatar } from "utils/getRandomAvatar";
import { getRandomBanner } from "utils/getRandomBanner";
import backgroundImg from '../3-Groups/background.jpg';
import PostCard from "./Discover/post-components/PostCard";
import GroupCardsPage from "./ProfileComponents/GroupCardsPage";
import UserCardsPage from "./ProfileComponents/UserCardsPage";

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
    const navigate = useNavigate();
    const {users} = useSelector((state) => state.users);
    const {posts} = useSelector((state) => state.posts);
    const {shipGroups} = useSelector((state) => state.shipGroup);

    const currentUser = useSelector((state) => state.auth.currentUser);
    const isCurrentUserProfile = !userId || (userId && userId === currentUser?._id);

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

    const chipLabelsArray = isCurrentUserProfile ? ['Posts', 'Formed Group', 'Joined Group','Following', 'Followers','Reviews']
        : ['Posts', 'Formed Group','Following', 'Followers','Reviews'];

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

    function onPostCardClick  (id) {
      navigate(`/community/discover/post/${id}`);
    }

    function onReviewCardClick  (productId) {
      if (productId){
        navigate(`/details/${productId}`);
      }
    }

    // -----small screen controller-----
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 665);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const reviewsData = [{
      title: "goods name here",
      post: "review here",
      created: new Date(),
    }]

    const reviewsByUserId = useSelector((state) => state.reviews.reviewsByUserId);
    const reviewsByProfileUser = useMemo(() => {
      return visibleProfile && visibleProfile._id !== undefined ? reviewsByUserId[visibleProfile._id] : undefined;
    }, [reviewsByUserId, visibleProfile]);

    useEffect(() => {
      if (visibleProfile && visibleProfile._id !== undefined) {
        dispatch(findReviewsByUserIdThunk(visibleProfile._id));
      }
    }, [visibleProfile]);

    const visibleReviews = useMemo(() => {
      if (!reviewsByProfileUser) {
        return [];
      }
       
      return reviewsByProfileUser.map((review) => ({
          ...review,
          title: review?.productName,
          post: review?.content,
          created: review?.date,
          image: review?.productImage,
          link: review?.productLink,
          asin: review?.asin,
        })).sort((a, b) => b.created - a.created);
      
    }, [reviewsByProfileUser]);

    return (
      <>
          <Helmet>
              <title>Profile | ShipShare</title>
          </Helmet>
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

                          {
                              visibleProfile && currentUser && currentUser._id === visibleProfile._id &&
                              <Button style={{
                                  background: 'rgba(0,0,0,0.5)',
                                  position: 'absolute',
                                  top: 20,
                                  right: 20,
                                  zIndex: 999,
                                  display: 'flex',
                                  alignItems: 'center',
                              }}
                              onClick={() => navigate("/account/account-info")}>
                                  <EditIcon style={{fontSize:"medium", color: "white", marginLeft: isSmallScreen? 4:8}}/>
                                  <Typography variant={isSmallScreen? 'body2':"subtitle1"} style={{
                                      color: "white",
                                      marginLeft: isSmallScreen? 5:10,
                                      marginRight: isSmallScreen? 4:8,
                                  }}>Edit</Typography>
                              </Button>
                          }
                      </Box>

                      {
                          !isCurrentUserProfile && <IconButton
                              style={{
                                  zIndex: 2,
                                  position: 'absolute',
                                  top: 110,}}
                              sx={{
                                  marginLeft: 1,
                              }}
                              onClick={() => navigate(-1)}>
                              <ArrowBackIcon style={{ color: 'white'}}/>
                          </IconButton>
                      }

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
                                    top: {xs: -38, md:-64},
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
                                    top: {xs:-30, md:-50},
                                }}>
                                  <Typography variant={isSmallScreen?'h5':"h3"} align="center">
                                    {visibleProfile?.name}
                                  </Typography>
                                  {
                                      visibleProfile?.role === 'buyer' && (
                                          <Typography align="center" variant={isSmallScreen? 'subtitle2':"subtitle1"} style={{marginTop:8, marginBottom:4}}>
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
                                        setFocusChip={setFocusChip}
                                        isSmallScreen={isSmallScreen}/>
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
                            <>
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

                              {/*---Pagination---*/}
                              {userPosts && userPosts?.length > 0 && <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 100,
                                }}>
                                    <Pagination
                                      count={Math.ceil((userPosts || []).length / MAX_POSTS_PER_PAGE)}
                                      onChange={handlePaginationChange}
                                    />
                              </div>}
                            </>
                          )}
                          {focusChip === 'Reviews' && 
                            <ReviewPage
                              reviews={visibleReviews}
                              visibleProfile={visibleProfile}
                              onReviewCardClick={onReviewCardClick}/>}
                        </CardContent>
                      </div>
                  </Container>


              </Main>
              {/*------------------------------------*/}
          </Box>
      </>
    );
};
export default Profile;