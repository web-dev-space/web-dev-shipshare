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
            <Box sx={{mt: 3, mb: 5}}>
              <Typography variant="h4">Group Detail</Typography>
            </Box>

            <Box sx={{mb: 5}}>
              <Card>

                <Box sx={{p: 3}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <Avatar sx={{width: 56, height: 56, mr: 2}} src="/static/images/avatars/1.jpg"/>
                      <Box>
                        <Typography variant="h5">Group Name</Typography>
                        <Typography variant="subtitle2" color="text.secondary">Group Description</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button variant="contained" color="primary">Edit</Button>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{p: 3}}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <Box sx={{display: 'flex', alignItems: 'center', mr: 3}}>
                        <Iconify icon="bx:bxs-user-detail" color="primary.main" fontSize="large"/>
                        <Box sx={{ml: 1}}>
                          <Typography variant="h5">10</Typography>
                          <Typography variant="subtitle2" color="text.secondary">Members</Typography>
                        </Box>
                      </Box>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Iconify icon="bx:bxs-user-detail" color="primary.main" fontSize="large"/>
                        <Box sx={{ml: 1}}>
                          <Typography variant="h5">10</Typography>
                          <Typography variant="subtitle2" color="text.secondary">Members</Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Button variant="contained" color="primary">Edit</Button>
                    </Box>
                  </Box>
                </Box>

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