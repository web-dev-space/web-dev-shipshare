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


const GroupMainPage = () => {
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
          <Container maxWidth={false}>
            <Typography variant="h4">
              Ongoing Groups
            </Typography>
            <Stack
              mt={3}
              mb={3}
              direction="row"
              sx={{justifyContent: 'space-between', width: '100%'}}
            >
              <Stack direction="row" spacing={2}>
                <ChipGroup
                    chipLabelsArray={chipLabelsArray}
                    setFilter={setFilter}
                    focusChip={focusChip}
                    setFocusChip={setFocusChip}
                />
              </Stack>

              <Stack direction="row"
                     spacing={2}
                    >
                <Button
                  variant="contained"
                  size="large"
                  color='primary'
                  startIcon={<Iconify icon="eva:plus-fill"/>}
                  href="/groups/form-new-group"
                >
                  Form New
                </Button>
                <Button
                  // component={RouterLink}
                  // to={PATH_DASHBOARD.eCommerce.new}
                  variant="outlined"
                  size="large"
                  startIcon={<TuneIcon/>}
                >
                  Filters
                </Button>
              </Stack>
            </Stack>

            <Card>
              <TableContainer>
                <Table sx={{width: '100%'}}>
                  {/*<Scrollbar>*/}
                  {/*table head*/}
                  <TableHead
                    sx={{justifyContent: 'space-between', width: '100%'}}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Group Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Route
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          End Date
                        </Typography>

                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Pick Up At
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Distance
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'fontWeightMedium',
                            width: 'auto'
                          }}
                        >
                          Action
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  {/*table body*/}
                  {/*first line data*/}
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }
                          }
                        >
                          <Avatar
                            alt="Product 1"
                            src="/static/mock-images/products/product_1.png"
                            sx={{width: 80, height: 80, borderRadius: 2}}
                          />
                          <Box sx={{ml: 2}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                            >
                              Group 1
                            </Typography>
                            <Typography
                              variant="subtitle3"
                              noWrap
                              sx={{color: 'text.secondary'}}
                            >
                              9 members
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body"
                          sx={{
                            color: 'rgb(238, 189, 94)',
                          }}
                        >
                          Air Sensitive
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body"
                        >
                          Mar 13, 2023
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body"
                        >
                          San Jose
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body"
                        >
                          0.5 miles
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button variant="contained"
                                sx={{
                                  color: 'white',
                                  borderRadius: 5,
                                  backgroundColor: '80B213',

                                }}>
                          Join
                        </Button>
                      </TableCell>
                      <TableCell>
                        <MoreHorizIcon/>
                      </TableCell>
                    </TableRow>


                    {/*second line data*/}
                    <TableRow>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }
                          }
                        >
                          <Avatar
                            alt="Product 1"
                            src="/static/mock-images/products/product_1.png"
                            sx={{width: 80, height: 80, borderRadius: 2}}

                          />
                          <Box sx={{ml: 2}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                            >
                              Group 2
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>

                  {/*</Scrollbar>*/}
                </Table>

              </TableContainer>

            </Card>


          </Container>
          <Pagination
            count={5}
            variant="outlined"
            size='large'
            sx={{
              position: 'fixed',
              bottom: 40,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              width: '100%',

            }}
          />
        </Main>
        {/*------------------------------------*/}
      </Box>
    </>
  );
};
export default GroupMainPage;