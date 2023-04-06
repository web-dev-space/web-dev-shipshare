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
  IconButton, TableBody, TableRow, TableCell, Avatar, TableHead, Table, Stack, Chip
} from '@mui/material';
import Iconify from "../../third-party/components/iconify";
import Scrollbar from "../../third-party/components/scrollbar";
import {Icon} from "@iconify/react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Pagination} from "@mui/lab";
import TuneIcon from '@mui/icons-material/Tune';
import ChipGroup from "../../components/ChipGroup";
import Image from 'mui-image'
import backgroundImg from './background.jpg';

const GroupDetailPage = () => {
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

            {/*backgroundImg & join button*/}
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
                    ml: 4,
                    width: {xs: 80, md: 128},
                    height: {xs: 80, md: 128},
                  }}
                />
                <Box
                  sx={{
                    mt: -5,
                    ml: 4,
                  }}>
                  <Typography variant="h5">
                    My Group
                  </Typography>
                </Box>
              </Box>
            </Box>


            {/*group description*/}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                my: 5,
                ml: 10,
                mr: 10,
                flexWrap: 'wrap',
                '& > *': {
                  flexBasis: '47%',
                  mb: 3,
                },
                '@media (max-width: 1200px)': {
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
              }}>1</Card>
              <Card
                sx={{
                  mb: 2,
                  width: '48%',
                }}>2</Card>
            </Box>
          </Container>


        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default GroupDetailPage;