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
import Iconify from "../../third-party/components/iconify";
import Scrollbar from "../../third-party/components/scrollbar";
import {Icon} from "@iconify/react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Pagination} from "@mui/lab";
import TuneIcon from '@mui/icons-material/Tune';
import ChipGroup from "../../components/ChipGroup";
import Image from 'mui-image'
import backgroundImg from '../3-Groups/background.jpg';
import {styled} from "@mui/material/styles";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Activity from "./ProfileComponents/Activity";
import UserCardsPage from "./ProfileComponents/UserCardsPage";


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

    // Filter
    const [filter, setFilter] = useState('All');
    const [focusChip, setFocusChip] = useState('All');
    const chipLabelsArray = ["All", "Air Standard", "Air Sensitive", "Sea Standard", "Sea Sensitive"];

    // chip controller
    const [selected, setSelected] = useState(null);
    const handleChipClick = (value) => {
      setSelected(value);
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
                        sx={{height: 300, position: 'relative'}}
                      >
                          <Image
                            src={backgroundImg}
                            sx={{
                                width: '100%',
                                zIndex: 1,
                                left: 0,
                                right: 0,
                                // mr: 5,
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
                                src="https://material-ui.com/static/images/avatar/1.jpg"
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
                                    mt: -2,
                                }}>
                                  <Typography variant="h3" align="center">
                                      Rae
                                  </Typography>
                                  <Typography align="center">
                                      <strong>976</strong>{' '}
                                      <span style={{ color: 'grey', marginRight:10}}>followers</span>{' '}
                                      <strong>4587</strong>{' '}
                                      <span style={{ color: 'grey' }}>following</span>{' '}
                                  </Typography>
                                  <Button variant="contained" color="primary" style={{ borderRadius: 25, height:40, marginTop:10 }}>
                                      <IconButton edge="start" color="inherit" aria-label="menu">
                                          <PersonAddIcon />
                                      </IconButton>
                                      Follow
                                  </Button>
                              </Box>
                          </Box>
                      </Box>


                      {/*bottom part*/}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Chip
                          label="Option 1"
                          color={selected === 'option1' ? 'primary' : 'default'}
                          onClick={() => handleChipClick('option1')}
                        />
                        <Chip
                          label="Option 2"
                          color={selected === 'option2' ? 'primary' : 'default'}
                          onClick={() => handleChipClick('option2')}
                        />
                        <Chip
                          label="Option 3"
                          color={selected === 'option3' ? 'primary' : 'default'}
                          onClick={() => handleChipClick('option3')}
                        />
                      </div>
                      <Card style={{marginTop:10}}>
                        <CardContent>
                          {selected === 'option1' && (
                            <Activity />
                          )}
                          {selected === 'option2' && (
                            <UserCardsPage />
                          )}
                          {selected === 'option3' && (
                            <Typography variant="body1">Content for option 3</Typography>
                          )}
                        </CardContent>
                      </Card>

                  </Container>


              </Main>
              {/*------------------------------------*/}
          </Box>
      </>
    );
};
export default Profile;