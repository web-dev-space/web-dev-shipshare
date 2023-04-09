import {useState} from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
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
import GreenChipGroup from "../../components/GreenChipGroup";
import GroupCardsPage from "./ProfileComponents/GroupCardsPage";
import PostCard from "./Discover/post-components/PostCard";
import {Pagination} from "@mui/lab";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Profile = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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


    const examplePosts = [{
      title: "ShipShare is the Best Shipping Platform!",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
      author: "Joe Doe",
      date: new Date("2021-08-01"),
      image: "https://source.unsplash.com/random",
      commentsNumber: 1910,
      viewsNumber: 8820,
      repostsNumber: 7460,
    },
    {
      title: "ShipShare is the Best Shipping Platform!",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
      author: "Joe Doe",
      date: new Date("2021-08-01"),
      image: "https://source.unsplash.com/random",
      commentsNumber: 1910,
      viewsNumber: 8820,
      repostsNumber: 7460,
    },
    {
      title: "ShipShare is the Best Shipping Platform!",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
      author: "Joe Doe",
      date: new Date("2021-08-01"),
      image: "https://source.unsplash.com/random",
      commentsNumber: 1910,
      viewsNumber: 8820,
      repostsNumber: 7460,
    },
    {
      title: "ShipShare is the Best Shipping Platform!",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
      author: "Joe Doe",
      date: new Date("2021-08-01"),
      image: "https://source.unsplash.com/random",
      commentsNumber: 1910,
      viewsNumber: 8820,
      repostsNumber: 7460,
    },
    {
      title: "ShipShare is the Best Shipping Platform!",
      post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
      author: "Joe Doe",
      date: new Date("2021-08-01"),
      image: "https://source.unsplash.com/random",
      commentsNumber: 1910,
      viewsNumber: 8820,
      repostsNumber: 7460,
    }];

    const [follow, setFollow] = useState(false);
    const handleFollow = () => {
      setFollow(!follow);
    };


    const handlePaginationChange = (event, page) => {
      console.log(page);
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
                                src="https://source.unsplash.com/random"
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
                                      Rae
                                  </Typography>
                                  <Typography align="center" style={{marginTop:8, marginBottom:4}}>
                                      <strong>976</strong>{' '}
                                      <span style={{ color: 'grey', marginRight:10}}>followers</span>{' '}
                                      <strong>4587</strong>{' '}
                                      <span style={{ color: 'grey' }}>following</span>{' '}
                                  </Typography>

                                {!follow && (
                                  <Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }} onClick={handleFollow}>
                                      <IconButton edge="start" color="inherit" aria-label="menu">
                                          <PersonAddIcon />
                                      </IconButton>
                                      Follow
                                  </Button> )}
                                {follow && (
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
                          {examplePosts.map((examplePost) => (
                            <PostCard
                            title={examplePost.title}
                            post={examplePost.post}
                            author={examplePost.author}
                            date={examplePost.date}
                            image={examplePost.image}
                            commentsNumber={examplePost.commentsNumber}
                            viewsNumber={examplePost.viewsNumber}
                            repostsNumber={examplePost.repostsNumber} />
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
                      <Pagination count={10}
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