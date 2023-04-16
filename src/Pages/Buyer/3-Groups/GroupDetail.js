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
  IconButton, TableBody, TableRow, TableCell, Avatar, TableHead, Table, Stack, Chip, Paper
} from '@mui/material';
import Image from 'mui-image'
import backgroundImg from './background.jpg';
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useLocation} from "react-router-dom";
import {findAllShipGroupsThunk, findShipGroupByIdThunk} from "../../../redux/shipGroups/shipGroups-thunks";
import {useDispatch, useSelector} from "react-redux";
import {findAllShipGroups} from "../../../redux/shipGroups/shipGroups-service";


const Item = styled(Paper)(({ theme }) => ({
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

  // Filter
  const [filter, setFilter] = useState('All');
  const [focusChip, setFocusChip] = useState('All');
  const chipLabelsArray = ["All", "Air Standard", "Air Sensitive", "Sea Standard", "Sea Sensitive"];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const groupId = searchParams.get('groupId');
  console.log("groupId", groupId)

  const dispatch = useDispatch();
  const currentGroup = useSelector((state) => {
    return state.shipGroup.currentGroup
  });

  useEffect(() => {
    dispatch(findShipGroupByIdThunk(groupId));
  }, []);

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

  return (
    <>
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

          <Container maxWidth="xl" style={{ position: 'relative' }}>
            <IconButton aria-label="delete" size="small"
              style={{ position: 'absolute', zIndex: 99, top: '20px', left: '40px', backgroundColor: 'white' }}
              onClick={() => {
                window.history.back();
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            {/*backgroundImg & join button*/}
            <Box
              sx={{ height: 300, position: 'relative' }}
            >
              <Image
                src={backgroundImg}
                style={{ borderRadius: 20 }}
                sx={{
                  width: '100%',
                  zIndex: 1,
                  left: 0,
                  right: 0,
                  // mr: 5,
                  position: 'absolute',
                }}
              />
              <Box
                sx={{
                  display: 'float',
                  float: 'right',
                  my: 3,
                  mr: 1,
                }}
              >
                <Button variant="contained" color="primary">
                  Join
                </Button>
              </Box>
            </Box>

            {/*avatar & group name*/}
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
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
                <Box>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                  sx={{
                    mx: 'auto',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: 'common.white',
                    top: -64,
                    zIndex: 2,
                    width: { xs: 80, md: 128 },
                    height: { xs: 80, md: 128 },
                  }}
                /></Box>
                <Box
                  sx={{mt: -5}}>
                  <Typography variant="h5" >
                    {currentGroup ? currentGroup.name : "Loading.."}
                  </Typography>
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
                }}>
                <Box
                  sx={{
                    my: 2,
                  }}
                >
                  <Typography variant="h6">About</Typography>
                  <hr style={{ borderTop: "1px solid #F6F7FB", marginTop: "0.5rem" }} />
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
                      <div>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://material-ui.com/static/images/avatar/1.jpg"
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
                        /></div>
                      <div>
                        <Typography variant="caption">
                          {currentGroup ? currentGroup.pickupLocation.name : "Loading.."}
                        </Typography>
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
                      {currentGroup ? formatDate(currentGroup.shipEndDate): "Loading.."}
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
                      {currentGroup ? getShortAddress(currentGroup.pickupLocation.address): "Loading.."}
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
                      N/A
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
                  <Typography variant="h6">Activity</Typography>
                  <hr style={{ borderTop: "1px solid #F6F7FB", marginTop: "0.5rem" }} />
                </Box>
                {/*activity details*/}
                <Stack spacing={2}>
                  {/*one activity cell*/}
                  <Item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="https://material-ui.com/static/images/avatar/1.jpg"
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
                          John Doe
                        </Typography>
                        <Typography variant="caption">
                          Joined in March 23, 2023
                        </Typography>
                      </Box>
                    </Box>
                  </Item>


                </Stack>

              </Card>
            </Box>
          </Container>


        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default GroupDetailPage;