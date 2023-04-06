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
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default GroupDetailPage;