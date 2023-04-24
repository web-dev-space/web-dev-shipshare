import AnalyticsNewsUpdate from "@mui-library/analytics/AnalyticsNewsUpdate";
import AppTopAuthors from "@mui-library/app/AppTopAuthors";
import AppWelcomeVisitor from "@mui-library/app/AppWelcomeVisitor";
import BookingCustomerReviews from "@mui-library/app/BookingCustomerReviews";
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import {
  Box, Button,
  Container,
  Grid
} from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findAllParcelsThunk } from "redux/parcels/parcels-thunks";
import { findAllPostsThunk } from "redux/posts/posts-thunks";
import { findAllShipGroupsThunk } from "redux/shipGroups/shipGroups-thunks";
import { findAllUsersThunk, updateCurrentUserThunk } from "redux/users/users-thunks";
import { getRandomAvatar } from "utils/getRandomAvatar";

const getFollowers = (users, currentUser) => {
    return users?.filter(item => currentUser && (item.following || [])
        .find((id) => id === currentUser._id));
};

const Home = () => {

    function getShortAddress(address) {
        const addressParts = address.split(', ');
        const cityState = addressParts.slice(-3, -1);
        const state = cityState[1].substring(0, 2);
        return `${cityState[0]}, ${state}`;
    }

    // ---------nav bar---------
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleFollow = (id) => {
        dispatch(updateCurrentUserThunk({
            ...currentUser,
            following: [
                ...currentUser.following,
                id,
            ],
        })).then(() =>
            dispatch(findAllUsersThunk()));
    };
    const handleUnfollow = (id) => {
        dispatch(updateCurrentUserThunk({
            ...currentUser,
            following: currentUser.following.filter((item) => item !== id),
        })).then(() =>
            dispatch(findAllUsersThunk()));
    };

    // ---------current user---------
    const currentUser = useSelector(state => state.auth.currentUser || { role: "visitor" });
    const shipGroupsRedux = useSelector((state) => state.shipGroup.shipGroups);
    const users = useSelector((state) => state.users.users);
    const allPosts = useSelector(state => state.posts.posts);

    const shipGroups = shipGroupsRedux?.map((shipGroup) => {
        return {
            ...shipGroup,
            key: Math.random(),
        };
    })?.filter((shipGroup) => shipGroup?.members?.some((member) => member === currentUser?.email));

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [isDiscoverSmallScreen, setIsDiscoverSmallScreen] = useState(false);
    const [isDiscoverPhoneScreen, setIsDiscoverPhoneScreen] = useState(false);
    const [fontSize, setFontSize] = useState(24);
    const [fontSize2, setFontSize2] = useState(14);
    const [isWorkLargeScreen, setIsWorkLargeScreen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [posts, setPosts] = useState([]);
    const [whoToFollow, setWhoToFollow] = useState([]);
    const [recentComments, setRecentComments] = useState([]);

    useEffect(() => {
        if (shipGroupsRedux && users) {
            setGroups(
                shipGroupsRedux.slice(0, 3).map((shipGroup) => {
                    const user = users.find((user) => user.email === shipGroup.user);
                    return {
                        avatarUrl: user?.avatar || getRandomAvatar(user?.name),
                        name: shipGroup.name,
                        route: shipGroup.shipRoute,
                        date: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(shipGroup.shipEndDate)),
                        pickupAddress: getShortAddress(shipGroup.pickupLocation.address),
                    };
                })
            );
        }
    }, [shipGroupsRedux, users])

    useEffect(() => {
        if (allPosts && users) {
            setPosts(
                allPosts.filter((post) => post.userId === currentUser._id)
                    .sort((p1, p2) => new Date(p2.created) - new Date(p1.created)).slice(0, 5).map((post) => {
                    return {
                        image: currentUser?.avatar || getRandomAvatar(currentUser?.name),
                        description: post.post,
                        postedAt: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.created)),
                        title: post.title,
                        id: post._id,
                    };
                })
            );
        }
    }, [allPosts, users]);

    useEffect(() => {
        if (currentUser && users && allPosts) {
            const userPosts = allPosts.filter((post) => post.userId === currentUser._id);
            const allComments = userPosts.map((post) => post.comments.map(comment => ({...comment, postId: post._id}))).flat().sort((c1, c2) => c2.created - c1.created);
            setRecentComments(allComments.slice(0, 5).map((comment) => {
                const user = users.find((user) => user._id === comment.user);
                return {
                    avatar: user?.avatar || getRandomAvatar(user?.name),
                    name: user?.name,
                    postedAt: new Date(comment.date),
                    description: comment.content,
                    postId: comment.postId,
                    id: comment._id,
                };
            }));
        }
    }, [allPosts, users, currentUser]);

    useEffect(() => {
        if (currentUser && users) {
          if (whoToFollow.length === 0) {
                const unfollowedBuyers = users.filter((user) =>
                    user._id !== currentUser._id
                    && user.role === 'buyer'
                    && currentUser?.following?.indexOf(user._id) === -1).slice(0, 3).map((user) => {
                    return {
                        avatar: user?.avatar || getRandomAvatar(user?.name),
                        name: user.name,
                        favourite: getFollowers(users, user).length,
                        id: user._id,
                        ...user,
                    };
                });
                setWhoToFollow(unfollowedBuyers);
            } else {
                const updatedWhoToFollow = whoToFollow.map((user) => {
                    return {
                        ...user,
                        favourite: getFollowers(users, user).length,
                    };
                });
                setWhoToFollow(updatedWhoToFollow);
            }
        }
    }, [currentUser, users]);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 900);
        setIsLargeScreen(window.innerWidth > 1300);
        setIsDiscoverSmallScreen(window.innerWidth < 1450);
        setIsDiscoverPhoneScreen(window.innerWidth < 900);
        setIsWorkLargeScreen(window.innerWidth > 880)
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth <= 800) {
          setFontSize(12);
          setFontSize2(6);
        } else {
          setFontSize(24);
          setFontSize2(14);
        }
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const style = document.createElement('style');
    style.textContent = `
      img.hide-image {
        display: none;
      }
    `;
    document.head.appendChild(style);


      const navigate = useNavigate();

      const carouselRef = useRef(null);
      const handlePrev = () => {
        carouselRef.current?.slickPrev();
      };

      const handleNext = () => {
        carouselRef.current?.slickNext();
      };
// console.log(currentUser);

      const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findAllShipGroupsThunk());
        dispatch(findAllUsersThunk());
        dispatch(findAllPostsThunk());
    }, []);

    // Link to DB
      const { parcels, loading } = useSelector((state) => {
        return state.parcels
      });

      const [tableData, setTableData] = useState([]);
      useEffect(() => {
        if (currentUser && currentUser.role !== "visitor") {
          dispatch(findAllParcelsThunk());
        }
      }, [currentUser]);

      useEffect(() => {
        if (parcels) {
          setTableData(
            parcels
              .filter((val) => currentUser.role !== 'buyer' || val.user === currentUser.email)
          )
        }
      }, [parcels, currentUser])

      //new users number
      const stats = useSelector(state => state.dashboard.stats);
      const getNumberWithDefault = (number, defaultValue = 0) => {
        return number === undefined ? defaultValue : number;
      };

   // console.log("parcel num is ",tableData.length);
   // console.log("shipGroup num is ",shipGroups.length);

    return (
        <>
            <Helmet>
                <title>Welcome to ShipShare</title>
            </Helmet>
            <Header onOpenNav={handleOpen} />
            {/*-------Box is the layout of the whole page-----*/}
            <Box
                sx={{
                    display: { lg: 'flex' },
                    minHeight: { lg: 1 },
                }}
            >
                {/*--------------Navigation bar------------------*/}
                <NavVertical openNav={open} onCloseNav={handleClose} />

                {/*--------------Main Content----------------------*/}
                <Main>
                    <Container maxWidth='xl'>


                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <AppWelcomeVisitor
                              title={`Welcome back, ${currentUser.name}!`}
                              description={`You have ${tableData.length} parcels and ${shipGroups.length} shipments. \n Thank you for choosing ShipShare!`}
                              img={
                                <img src={require('../../images/HomeGroup.png')} alt="HomeGroup" style={{padding: 30, width:360, margin:'auto'}}/>
                              }
                              action={<Button variant="contained" onClick={() => navigate('/parcels')}>Check Now</Button>}
                              />
                        </Grid>


                        <Grid item xs={12} md={4}>
                          <AppTopAuthors title="Who To Follow" list={whoToFollow} handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>
                        </Grid>

                          <Grid container spacing={3} xs={12} sx={{ mt: 1, ml: 0.1}}>
                              <Grid item xs={12} md={8} style={{
                                  height: '100%',}}>
                                  <AnalyticsNewsUpdate title="My Latest Posts" list={posts} />
                              </Grid>


                              <Grid item xs={12} md={4} style={{
                                  height: '100%',}}>
                                  <BookingCustomerReviews
                                      style={{height: '100%',}}
                                      title="Recent Comments"
                                      subheader={`${recentComments.length} Comments`}
                                      list={recentComments}
                                  />
                              </Grid>
                          </Grid>
                      </Grid>
                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

export default Home;