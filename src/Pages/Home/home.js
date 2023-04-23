import {useEffect, useRef, useState} from "react";
import Header from "../../@mui-library/layouts/dashboard/header"
import NavVertical from "../../@mui-library/layouts/dashboard/nav/NavVertical"
import Main from "../../@mui-library/layouts/dashboard/Main"
import {
  Container,
  Typography,
  Box, Button, Card, CardContent, Link, Grid,
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useNavigate} from "react-router-dom";
import CardWithAvatar from "./CardWithAvatar";
import PostCard from "./PostCard";
import AppWelcome from "../../@mui-library/app/AppWelcome";
import CarouselRoute from "./CarouselRoute";
import PostCardSmallLayout from "./PostCardSmallLayout";
import {findAllParcelsThunk} from "../../redux/parcels/parcels-thunks";
import {findAllShipGroupsThunk} from "../../redux/shipGroups/shipGroups-thunks";
import {findAllUsersThunk} from "../../redux/users/users-thunks";
import {getRandomAvatar} from "../../utils/getRandomAvatar";
import {findAllPostsThunk} from "../../redux/posts/posts-thunks";
import {_appAuthors} from "../../@mui-library/_mock/arrays";
import AppTopAuthors from "../../@mui-library/app/AppTopAuthors";


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
    }).filter((shipGroup) => shipGroup?.members?.some((member) => member === currentUser?.email));

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [isDiscoverSmallScreen, setIsDiscoverSmallScreen] = useState(false);
    const [isDiscoverPhoneScreen, setIsDiscoverPhoneScreen] = useState(false);
    const [fontSize, setFontSize] = useState(24);
    const [fontSize2, setFontSize2] = useState(14);
    const [isWorkLargeScreen, setIsWorkLargeScreen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [posts, setPosts] = useState([]);

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
                allPosts.slice(0, 6).map((post) => {
                    const user = users.find((user) => user._id === post.userId);
                    return {
                        avatarUrl: user?.avatar || getRandomAvatar(user?.name),
                        title: post.title,
                        id: post._id,
                    };
                })
            );
        }
    }, [allPosts, users]);

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

    // ------ part 2 card info ------
    const cards = [
      {
        icon: require("./ship-1.png"),
        photo: require("./ship-2.png"),
        title: 'Ship',
        line1: 'Order any desired overseas',
        line2: 'products and have them shipped',
        line3: 'to our designated warehouse.',
        line4: '',
      },
      {
        icon: require("./share-1.png"),
        photo: require("./share-2.png"),
        title: 'Share',
        line1: 'Join a group with a convenient',
        line2: 'pickup location, and share the',
        line3: 'international shipping costs with',
        line4: 'other members.',
      },
      {
        icon: require("./collect-1.png"),
        photo: require("./collect-2.png"),
        title: 'Collect',
        line1: 'After the package arrives, simply',
        line2: 'go to the pickup location and',
        line3: 'save on shipping costs while',
        line4: 'enjoying your products!',
      },
    ];

    const routes = [
      {
        route: 'Air - Sensitive',
        price: '$20',
        text1: 'Enjoy the fastest delivery!',
        text2: "You can also ship sensitive products.",
        trait1: 'Faster Delivery (2 weeks)',
        trait2: 'Accepts sensitive items',
        trait3: '',
      },
      {
        route: 'Air - Standard',
        price: '$15',
        text1: 'Enjoy the fast delivery!',
        text2: "Best choice for a ShipShare starter.",
        trait1: 'Fastest Delivery (1 weeks)',
        trait2: 'Suitable for normal items',
        trait3: '',
      },
      {
        route: 'Sea - Standard',
        price: '$5',
        text1: 'Not in hurry?',
        text2: "Enjoy the best price with this plan!",
        trait1: 'Lowest cost',
        trait2: 'Normally 4 weeks',
        trait3: 'Suitable for normal items',
      },
      {
        route: 'Sea - Sensitive',
        price: '$15',
        text1: 'Ship sensitive products with the ',
        text2: "best price!",
        trait1: 'Lower cost',
        trait2: 'Normally 6 weeks',
        trait3: 'Accepts sensitive items',
      },
    ];

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
                    <Container maxWidth={true}>

                      {/*====== part 1 ======*/}
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          {currentUser.role === "buyer" &&
                            <AppWelcome
                            title={currentUser.name? `Hello, ${currentUser.name}`:"Ship globally &"}
                            title2={currentUser.name? '':"Save big"}
                            description={currentUser.name? `You have ${tableData.length} parcels and ${shipGroups.length} shipments. Thank you for choosing ShipShare!`:"ShipShare -- The ultimate solution for affordable and convenient international shipping!"}
                            img={<img src={require('../../images/HomeGroup.png')} alt="HomeGroup" style={{
                              p: 3,
                              width: isSmallScreen? '80%':'50%',
                              margin: { xs: 'auto', md: 'inherit' },
                              alignSelf: 'center',
                              marginBottom: 120,
                              marginTop: 120,
                              marginRight: isSmallScreen? 0: 30,
                            }}/>}
                            action={<Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120, mb:isSmallScreen?-10:3}}>Get Started</Button> }
                          />}
                        <Grid item xs={12} md={4}>
                          <AppTopAuthors title="Top Authors" list={_appAuthors} />
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