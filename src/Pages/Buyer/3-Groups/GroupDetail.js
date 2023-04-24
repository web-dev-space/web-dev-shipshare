import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { styled } from "@mui/material/styles";
import Image from 'mui-image';
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { findAllParcelsThunk } from "redux/parcels/parcels-thunks";
import { findShipGroupByIdThunk } from "redux/shipGroups/shipGroups-thunks";
import { findAllUsersThunk } from "redux/users/users-thunks";
import { getRandomAvatar } from "utils/getRandomAvatar";
import { getRandomBanner } from "utils/getRandomBanner";
import backgroundImg from './background.jpg';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GroupDetailPage = (props) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findShipGroupByIdThunk(groupId));
    dispatch(findAllUsersThunk());
    dispatch(findAllParcelsThunk());
    console.log("done")
  }, [dispatch]);

  const {users, loading} = useSelector((state) => state.users);
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.currentUser);

  const currentGroup = useSelector((state) => {
    return state.shipGroup.currentGroup
  });

  const {parcels} = useSelector((state) => {
    return state.parcels
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupId = searchParams.get('groupId');

  if (!currentGroup) {
    return null;
  }

  const currentGroupParcels = parcels.filter((parcel) => {
    return parcel.shipGroup === currentGroup._id
  })

  function getShortAddress(address) {
    const addressParts = address.split(', ');
    const cityState = addressParts.slice(-3, -1);
    const state = cityState[1].substring(0, 2);
    return `${cityState[0]}, ${state}`;
  }

  function formatDate(dateString) {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formattedDate;
  }

  const handleClickJoinGroup = (group) => {
    if (currentUser === null) {
      alert("Please login first")
      return;
    }
    let groupId = group._id
    navigate('./checkout?groupId=' + groupId);
  }

  const getLeaderAvatar = (group) => {
    if (group === null) {
      return null;
    }
    const groupLead = users.find((user) => {
      return user.email === group.leader
    })
    if (groupLead !== undefined) {
      return groupLead.avatar || getRandomAvatar(groupLead.name)
    } else {
      return null
    }
  }

  const getAvatarByEmail = (email) => {
    const user = users.find((user) => {
      return user.email === email
    })
    if (user !== undefined) {
      return user.avatar|| getRandomAvatar(user.name)
    } else {
      return null
    }
  }

  const getBackgroundImg = (group) => {
      if (group === null) {
          return backgroundImg;
      }
    const user = users.find((user) => {
      return user.email === group.leader
    })
    if (user !== undefined) {
      return getRandomBanner(user.name || "1")
    } else {
      return backgroundImg;
    }
  }

  const getNameByEmail = (email) => {
    const user = users.find((user) => {
      return user.email === email
    })
    if (user !== undefined) {
      return user.name
    } else {
      return null
    }
  }

  const getUserByEmail = (email) => {
    const user = users.find((user) => {
      return user.email === email
    })
    if (user !== undefined) {
      return user
    } else {
      return null
    }
  }

  return currentGroup ? (

    <>
        <Helmet>
            <title>Group Details | ShipShare</title>
        </Helmet>
      <Header onOpenNav={handleOpen}/>
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

          <Container maxWidth="xl" style={{position: 'relative'}}>
            <IconButton aria-label="delete" size="small"
                        style={{position: 'absolute', zIndex: 99, top: '20px', left: '40px'}}
                        onClick={() => {
                          window.history.back()
                        }}
            >
              <ArrowBackIcon style={{color: 'white'}}/>
            </IconButton>

            {/*backgroundImg & join button*/}
            <Box
              sx={{height: 300, position: 'relative'}}
            >
              <Image
                src={getBackgroundImg(currentGroup)}
                style={{borderRadius: 20}}
                sx={{
                  width: '100%',
                  zIndex: 1,
                  left: 0,
                  right: 0,
                  // mr: 5,
                  position: 'absolute',
                }}
              />
              {currentUser&&
              <Button
                variant="contained"
                color="primary"
                sx={{
                  display: 'float',
                  float: 'right',
                  mt: 3,
                  zIndex: 99,
                }}
                onClick={() => handleClickJoinGroup(currentGroup)}
              >Join</Button>}

            </Box>

            {/*avatar & group name*/}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                // position: 'relative',
                // width: '100%',
                top: -600,
              }}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: {xs: 'column', md: 'row'},
              }}>

                <Box
                  sx={{
                    mt: -5,
                  }}>
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={getLeaderAvatar(currentGroup)}
                      sx={{
                        mx: 'auto',
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: 'common.white',
                        top: -20,
                        zIndex: 2,
                        width: {xs: 80, md: 128},
                        height: {xs: 80, md: 128},
                      }}
                    />
                  </Box>

                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h5" style={{flex: "1", textAlign: "center"}}>
                      {currentGroup ? currentGroup.name : "Loading.."}
                    </Typography>
                  </div>
                </Box>
              </Box>
            </Box>

            {/*group info box (left)*/}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                my: 5,
                ml: 5,
                mr: 5,
                flexWrap: 'wrap',
                '& > *': {
                  flexBasis: '47%',
                  mb: 3,
                },
                '@media (max-width: 880px)': {
                  '& > *': {
                    flexBasis: '100%',
                  },
                },
              }}
            >
              <Card
                sx={{
                  mb: 2,
                  width: '48%',
                  px: 3,
                  pb:4
                }}>
                <Box
                  sx={{
                    my: 2,
                  }}
                >
                  <Typography variant="h6">About</Typography>
                  <hr style={{borderTop: "1px solid #F6F7FB", marginTop: "0.5rem"}}/>
                </Box>
                {/*group details*/}
                <Stack spacing={2}>
                  <Item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Group Leader
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }
                      }
                    >
                      <div
                        style={
                          {
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }
                        }
                        onClick={() => navigate(`/profile/${getUserByEmail(currentGroup.leader)._id}`)}
                      >
                        <div>
                          <Avatar
                            alt="Remy Sharp"
                            src={getLeaderAvatar(currentGroup)} sx={{
                            mx: 'auto',
                            borderWidth: 2,
                            borderStyle: 'solid',
                            borderColor: 'common.white',
                            zIndex: 2,
                            mr: 1,
                            width: 50,
                            height: 50,
                          }}
                          />
                        </div>
                        <div>
                          <Typography variant="caption">
                            {currentGroup ? currentGroup.pickupLocation.name : "Loading.."}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </Item>

                  <Item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Group Route
                    </Typography>
                    <Typography variant="caption">
                      {currentGroup ? currentGroup.shipRoute : "Loading.."}
                    </Typography>
                  </Item>
                  <Item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Join Before
                    </Typography>
                    <Typography variant="caption">
                      {currentGroup ? formatDate(currentGroup.shipEndDate) : "Loading.."}
                    </Typography>
                  </Item>
                  <Item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Pickup at
                    </Typography>
                    <Typography variant="caption">
                      {currentGroup ? getShortAddress(currentGroup.pickupLocation.address) : "Loading.."}
                    </Typography>
                  </Item>
                  <Item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Current Weight
                    </Typography>
                    <Typography variant="caption">
                      {(currentGroupParcels.reduce((acc, parcel) => acc + parcel.weight, 0)).toFixed(1)} kg
                    </Typography>
                  </Item>
                  <Item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle2">
                      Members
                    </Typography>
                    <Typography variant="caption">
                      {currentGroup ? currentGroup.members.length : "Loading.."}
                    </Typography>
                  </Item>


                </Stack>
              </Card>

              {/*group activity box (right)*/}
              <Card
                sx={{
                  mb: 2,
                  width: '48%',
                  px: 3,
                }}>
                <Box
                  sx={{my: 2,}}
                >
                  <Typography variant="h6">Members</Typography>
                  <hr style={{borderTop: "1px solid #F6F7FB", marginTop: "0.5rem"}}/>
                </Box>
                {/*members detail*/}
                <Stack spacing={2}>
                  {
                    currentGroup ? currentGroup.members.map((member, index) => {
                      return (
                        <Item
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box
                            sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                            onClick={() => navigate(`/profile/${getUserByEmail(member)._id}`)}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src={getAvatarByEmail(member)}
                              sx={{
                                mx: 'auto',
                                borderWidth: 2,
                                borderStyle: 'solid',
                                borderColor: 'common.white',
                                zIndex: 2,
                                mr: 1,
                                width: 50,
                                height: 50,
                              }}
                            />
                            <Box textAlign="left">
                              <Typography variant="subtitle2">
                                {getNameByEmail(member)}
                              </Typography>
                            </Box>
                          </Box>
                        </Item>
                      )
                    }) : <div>loading...</div>
                  }
                </Stack>
              </Card>
            </Box>
          </Container>
        </Main>
      </Box>
    </>
  ) : (
    <div></div>
  );
};
export default GroupDetailPage;