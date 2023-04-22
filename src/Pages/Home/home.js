import {useEffect, useRef, useState} from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
import {
  Container,
  Typography,
  Box, Button, Card, CardContent, Link,
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useNavigate} from "react-router-dom";
import CardWithAvatar from "./CardWithAvatar";
import PostCard from "./PostCard";
import AppWelcome from "../../third-party/app/AppWelcome";
import CarouselRoute from "./CarouselRoute";
import PostCardSmallLayout from "./PostCardSmallLayout";
import {findAllParcelsThunk} from "../../redux/parcels/parcels-thunks";
import {findAllShipGroupsThunk} from "../../redux/shipGroups/shipGroups-thunks";
import {findAllUsersThunk} from "../../redux/users/users-thunks";
import {getRandomAvatar} from "../../utils/getRandomAvatar";
import {findAllPostsThunk} from "../../redux/posts/posts-thunks";


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
        setIsDiscoverSmallScreen(window.innerWidth < 1600);
        setIsDiscoverPhoneScreen(window.innerWidth < 900);
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
                      {(currentUser.role === "visitor" || currentUser.role === "buyer") &&
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
                        action={<Button variant="contained" style={{borderRadius: '1rem', marginBottom: -130}} onClick={()=>navigate('/login')}>Get Started</Button> }
                      />}
                      {currentUser.role === "admin" &&
                        <AppWelcome
                          title={`Hello, ${currentUser.name}`}
                          title2={currentUser.name? '':"Save big"}
                          description={`We're excited to share that we've had ${getNumberWithDefault(stats?.newUserCounts)} new users join us this week. Thank you for being a part of our community!`}
                          img={<img src={require('../../images/HomeGroup.png')} alt="HomeGroup" style={{
                            p: 3,
                            width: isSmallScreen? '80%':'50%',
                            margin: { xs: 'auto', md: 'inherit' },
                            alignSelf: 'center',
                            marginBottom: 120,
                            marginTop: 120,
                            marginRight: isSmallScreen? 0: 30,
                          }}/>}
                          action={<Button variant="contained" style={{borderRadius: '1rem', marginBottom: -130}} onClick={()=>navigate('/login')}>Get Started</Button> }
                        />}
                      {currentUser.role === "merchant" &&
                        <AppWelcome
                          title={`Hello, ${currentUser.name}`}
                          title2={currentUser.name? '':"Save big"}
                          description={`This week, you have processed ${stats?.totalParcelsNumber === undefined ? 0 : stats?.totalParcelsNumber} new shipments and  ${stats?.totalShipGroupsNumber === undefined ? 0 : stats?.totalShipGroupsNumber} parcels. Thank you for choosing ShipShare!`}
                          img={<img src={require('../../images/HomeGroup.png')} alt="HomeGroup" style={{
                            p: 3,
                            width: isSmallScreen? '80%':'50%',
                            margin: { xs: 'auto', md: 'inherit' },
                            alignSelf: 'center',
                            marginBottom: 120,
                            marginTop: 120,
                            marginRight: isSmallScreen? 0: 30,
                          }}/>}
                          action={<Button variant="contained" style={{borderRadius: '1rem', marginBottom: -130}} onClick={()=>navigate('/login')}>Get Started</Button> }
                        />}


                      {/*====== part 2 - How it works ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '100%', marginTop: 100}}>
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            textAlign: 'left',
                          }}
                        >
                          <Typography variant={isSmallScreen? "h2": "h2"}  component="text" paragraph sx={{mb:9}}>
                            How it works
                          </Typography>
                          <div style={{display: 'flex', justifyContent: 'space-between',  flexDirection: isLargeScreen? 'row':'column', alignItems: 'center'}}>
                            {cards.map((card, index) => (
                              <Card key={index} sx={{width: 300, mr:1, ml:1, mb:3}}>
                                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                  <div style={{height: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                                    <img src={card.icon} alt="icon" style={{width: 150, objectFit: 'cover', borderRadius: '1rem', marginBottom: -50, alignSelf:'center', marginLeft: 35}}/>
                                    {/*{index === 0 &&*/}
                                    {/*  <svg width="206" height="206" viewBox="0 0 206 206" fill="none"*/}
                                    {/*       xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*    <g opacity="0.3" filter="url(#filter0_d_275_1280)">*/}
                                    {/*      <circle cx="79" cy="73" r="26" fill="#FFD2A6"/>*/}
                                    {/*    </g>*/}
                                    {/*    <path*/}
                                    {/*      d="M78.6627 80V69.17H76.0827V67.52C76.9093 67.52 77.576 67.4433 78.0827 67.29C78.596 67.13 78.9793 66.9033 79.2327 66.61C79.486 66.31 79.636 65.9533 79.6827 65.54H81.6227V80H78.6627Z"*/}
                                    {/*      fill="#2C090B"/>*/}
                                    {/*    <defs>*/}
                                    {/*      <filter id="filter0_d_275_1280" x="0" y="0" width="206" height="206"*/}
                                    {/*              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">*/}
                                    {/*        <feFlood flood-opacity="0" result="BackgroundImageFix"/>*/}
                                    {/*        <feColorMatrix in="SourceAlpha" type="matrix"*/}
                                    {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"*/}
                                    {/*                       result="hardAlpha"/>*/}
                                    {/*        <feOffset dx="24" dy="30"/>*/}
                                    {/*        <feGaussianBlur stdDeviation="38.5"/>*/}
                                    {/*        <feColorMatrix type="matrix"*/}
                                    {/*                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>*/}
                                    {/*        <feBlend mode="normal" in2="BackgroundImageFix"*/}
                                    {/*                 result="effect1_dropShadow_275_1280"/>*/}
                                    {/*        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_275_1280"*/}
                                    {/*                 result="shape"/>*/}
                                    {/*      </filter>*/}
                                    {/*    </defs>*/}
                                    {/*  </svg>*/}
                                    {/*}*/}
                                    {/*{index===1 && <svg width="206" height="206" viewBox="0 0 206 206" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*  <g opacity="0.3" filter="url(#filter0_d_275_1268)">*/}
                                    {/*    <circle cx="79" cy="73" r="26" fill="#FFB7B7"/>*/}
                                    {/*  </g>*/}
                                    {/*  <path d="M73.7823 80V78.56V77.82C73.7823 77.0867 73.919 76.4533 74.1923 75.92C74.4657 75.38 74.8257 74.9133 75.2723 74.52C75.7257 74.12 76.219 73.77 76.7523 73.47C77.2923 73.17 77.8323 72.8867 78.3723 72.62C78.9123 72.3533 79.4057 72.0867 79.8523 71.82C80.3057 71.5467 80.669 71.2433 80.9423 70.91C81.2157 70.5767 81.3523 70.1833 81.3523 69.73C81.3523 69.15 81.149 68.6767 80.7423 68.31C80.3423 67.9433 79.7923 67.76 79.0923 67.76C78.3657 67.76 77.749 67.97 77.2423 68.39C76.7357 68.81 76.4223 69.4433 76.3023 70.29H73.5123C73.5257 69.37 73.739 68.5367 74.1523 67.79C74.5723 67.0367 75.199 66.44 76.0323 66C76.8657 65.56 77.9123 65.34 79.1723 65.34C80.2523 65.34 81.1823 65.5233 81.9623 65.89C82.749 66.2567 83.3557 66.7667 83.7823 67.42C84.209 68.0733 84.4223 68.8367 84.4223 69.71C84.4223 70.4367 84.289 71.0633 84.0223 71.59C83.7557 72.1167 83.4023 72.5667 82.9623 72.94C82.5223 73.3133 82.039 73.64 81.5123 73.92C80.9857 74.2 80.459 74.46 79.9323 74.7C79.4123 74.94 78.9323 75.1867 78.4923 75.44C78.0523 75.6867 77.699 75.9667 77.4323 76.28C77.1657 76.5933 77.0323 76.97 77.0323 77.41V77.54H84.4023V80H73.7823Z" fill="#2C090B"/>*/}
                                    {/*  <defs>*/}
                                    {/*    <filter id="filter0_d_275_1268" x="0" y="0" width="206" height="206" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">*/}
                                    {/*      <feFlood flood-opacity="0" result="BackgroundImageFix"/>*/}
                                    {/*      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
                                    {/*      <feOffset dx="24" dy="30"/>*/}
                                    {/*      <feGaussianBlur stdDeviation="38.5"/>*/}
                                    {/*      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>*/}
                                    {/*      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_275_1268"/>*/}
                                    {/*      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_275_1268" result="shape"/>*/}
                                    {/*    </filter>*/}
                                    {/*  </defs>*/}
                                    {/*</svg>}*/}
                                    {/*{index===2 && <svg width="206" height="206" viewBox="0 0 206 206" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*  <g opacity="0.3" filter="url(#filter0_d_275_1261)">*/}
                                    {/*    <circle cx="79" cy="73" r="26" fill="#C3EEDF"/>*/}
                                    {/*  </g>*/}
                                    {/*  <path d="M73.3196 69.99C73.3196 68.95 73.5629 68.0867 74.0496 67.4C74.5429 66.7133 75.2063 66.2 76.0396 65.86C76.8729 65.5133 77.7996 65.34 78.8196 65.34C79.8996 65.34 80.8596 65.48 81.6996 65.76C82.5463 66.04 83.2129 66.4667 83.6996 67.04C84.1863 67.6133 84.4296 68.34 84.4296 69.22C84.4296 69.9333 84.2229 70.5633 83.8096 71.11C83.3963 71.65 82.7229 72.08 81.7896 72.4C82.3229 72.5467 82.8163 72.77 83.2696 73.07C83.7229 73.37 84.0863 73.7533 84.3596 74.22C84.6329 74.6867 84.7696 75.2467 84.7696 75.9C84.7696 76.6067 84.6129 77.23 84.2996 77.77C83.9863 78.31 83.5529 78.7633 82.9996 79.13C82.4463 79.4967 81.8063 79.77 81.0796 79.95C80.3529 80.13 79.5763 80.22 78.7496 80.22C77.5896 80.2133 76.5996 80.0233 75.7796 79.65C74.9663 79.27 74.3396 78.73 73.8996 78.03C73.4663 77.33 73.2429 76.4967 73.2296 75.53H76.0396C76.1796 76.35 76.4996 76.9433 76.9996 77.31C77.4996 77.6767 78.0929 77.86 78.7796 77.86C79.3796 77.86 79.8929 77.7733 80.3196 77.6C80.7529 77.4267 81.0829 77.1867 81.3096 76.88C81.5429 76.5667 81.6596 76.21 81.6596 75.81C81.6596 75.3967 81.5396 75.04 81.2996 74.74C81.0663 74.44 80.7396 74.2067 80.3196 74.04C79.8996 73.8667 79.4196 73.7733 78.8796 73.76L77.4996 73.71V71.39L78.7396 71.32C79.2596 71.3 79.7129 71.2033 80.0996 71.03C80.4863 70.8567 80.7863 70.6267 80.9996 70.34C81.2196 70.0467 81.3296 69.7167 81.3296 69.35C81.3296 68.9967 81.2196 68.69 80.9996 68.43C80.7796 68.17 80.4763 67.9667 80.0896 67.82C79.7029 67.6733 79.2596 67.6 78.7596 67.6C78.2996 67.6 77.8763 67.6767 77.4896 67.83C77.1029 67.9833 76.7863 68.2367 76.5396 68.59C76.2929 68.9367 76.1496 69.4033 76.1096 69.99H73.3196Z" fill="#2C090B"/>*/}
                                    {/*  <defs>*/}
                                    {/*    <filter id="filter0_d_275_1261" x="0" y="0" width="206" height="206" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">*/}
                                    {/*      <feFlood flood-opacity="0" result="BackgroundImageFix"/>*/}
                                    {/*      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>*/}
                                    {/*      <feOffset dx="24" dy="30"/>*/}
                                    {/*      <feGaussianBlur stdDeviation="38.5"/>*/}
                                    {/*      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>*/}
                                    {/*      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_275_1261"/>*/}
                                    {/*      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_275_1261" result="shape"/>*/}
                                    {/*    </filter>*/}
                                    {/*  </defs>*/}
                                    {/*</svg>}*/}


                                    {index ===0 &&
                                      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8848 51.75H11.25C7.524 51.75 4.5 48.7282 4.5 45C4.5 39.0128 4.5 28.4873 4.5 22.5C4.5 20.709 5.21101 18.9922 6.47776 17.7277C7.74451 16.461 9.46125 15.75 11.25 15.75C19.044 15.75 34.9583 15.75 42.75 15.75C44.541 15.75 46.2578 16.461 47.5245 17.7277C48.789 18.9922 49.5 20.709 49.5 22.5V24.75H52.2C55.089 24.75 57.8678 25.8615 59.9603 27.8527C61.7288 29.538 63.9968 31.698 65.4255 33.0593C66.7508 34.3215 67.5 36.072 67.5 37.9035C67.5 40.5225 67.5 45.2092 67.5 47.7495C67.5 49.959 65.709 51.75 63.4995 51.75H58.1153C57.1883 54.3713 54.6885 56.25 51.75 56.25C48.8138 56.25 46.314 54.3713 45.3848 51.75H26.6153C25.6883 54.3713 23.1885 56.25 20.25 56.25C17.3138 56.25 14.814 54.3713 13.8848 51.75ZM20.25 47.25C21.492 47.25 22.5 48.258 22.5 49.5C22.5 50.742 21.492 51.75 20.25 51.75C19.0103 51.75 18 50.742 18 49.5C18 48.258 19.0103 47.25 20.25 47.25ZM51.75 47.25C52.992 47.25 54 48.258 54 49.5C54 50.742 52.992 51.75 51.75 51.75C50.5103 51.75 49.5 50.742 49.5 49.5C49.5 48.258 50.5103 47.25 51.75 47.25ZM38.25 33.75H15.75C14.5103 33.75 13.5 34.758 13.5 36C13.5 37.242 14.5103 38.25 15.75 38.25H38.25C39.492 38.25 40.5 37.242 40.5 36C40.5 34.758 39.492 33.75 38.25 33.75ZM38.25 27H20.25C19.0103 27 18 28.008 18 29.25C18 30.492 19.0103 31.5 20.25 31.5H38.25C39.492 31.5 40.5 30.492 40.5 29.25C40.5 28.008 39.492 27 38.25 27Z" fill="#FFD2A6"/>
                                      </svg>
                                    }
                                    {index === 1 &&
                                      <svg width="72" height="43" viewBox="0 0 72 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.9694 21.0163C41.7729 21.0163 46.4775 16.3117 46.4775 10.5082C46.4775 4.70467 41.7729 0 35.9694 0C30.1659 0 25.4612 4.70467 25.4612 10.5082C25.4612 16.3117 30.1659 21.0163 35.9694 21.0163Z" fill="#FFB7B7"/>
                                        <path d="M52.1219 28.3119C47.1487 25.6344 41.6156 24.1638 35.9693 24.0186C30.3332 24.1684 24.811 25.639 19.8468 28.3119C18.3726 29.0686 17.1358 30.2173 16.2723 31.6317C15.4089 33.046 14.9524 34.6711 14.953 36.3281V37.7092C14.949 38.2755 15.0572 38.8371 15.2711 39.3614C15.4851 39.8858 15.8007 40.3626 16.1998 40.7645C16.5989 41.1663 17.0735 41.4853 17.5964 41.7029C18.1192 41.9205 18.68 42.0326 19.2463 42.0326H52.6923C53.2587 42.0326 53.8194 41.9205 54.3423 41.7029C54.8651 41.4853 55.3398 41.1663 55.7388 40.7645C56.1379 40.3626 56.4535 39.8858 56.6675 39.3614C56.8815 38.8371 56.9896 38.2755 56.9857 37.7092V36.3281C56.9891 34.6742 56.5371 33.0512 55.6791 31.6372C54.8212 30.2232 53.5905 29.0727 52.1219 28.3119Z" fill="#FFB7B7"/>
                                        <path d="M13.4519 15.0117C17.5972 15.0117 20.9577 11.6512 20.9577 7.50584C20.9577 3.36048 17.5972 0 13.4519 0C9.30652 0 5.94604 3.36048 5.94604 7.50584C5.94604 11.6512 9.30652 15.0117 13.4519 15.0117Z" fill="#FFB7B7"/>
                                        <path d="M58.4868 15.0117C62.6322 15.0117 65.9926 11.6512 65.9926 7.50584C65.9926 3.36048 62.6322 0 58.4868 0C54.3414 0 50.981 3.36048 50.981 7.50584C50.981 11.6512 54.3414 15.0117 58.4868 15.0117Z" fill="#FFB7B7"/>
                                        <path d="M68.7551 19.6059C65.6521 17.7285 62.1127 16.6936 58.4871 16.6035C54.8615 16.6936 51.3222 17.7285 48.2191 19.6059C47.7556 19.889 47.3316 20.2322 46.9581 20.6266C46.7825 20.8068 46.6549 21.0282 46.5872 21.2706C46.5194 21.5129 46.5137 21.7684 46.5705 22.0135C46.6273 22.2586 46.7448 22.4856 46.9122 22.6734C47.0796 22.8613 47.2916 23.004 47.5286 23.0886C49.5889 23.7938 51.5956 24.6467 53.5333 25.6405C55.234 26.5326 56.696 27.8196 57.7966 29.3935C57.9362 29.5895 58.1209 29.7492 58.3351 29.8589C58.5494 29.9686 58.7868 30.0252 59.0275 30.024H68.8452C69.7212 29.9697 70.5413 29.5751 71.1304 28.9244C71.7194 28.2736 72.0306 27.4184 71.9976 26.5412V25.5805C72.0183 24.3895 71.7306 23.2135 71.1625 22.1665C70.5943 21.1196 69.765 20.2375 68.7551 19.6059ZM18.466 25.6405C20.4032 24.6458 22.41 23.7929 24.4707 23.0886C24.7077 23.004 24.9196 22.8613 25.087 22.6734C25.2544 22.4856 25.3719 22.2586 25.4287 22.0135C25.4855 21.7684 25.4798 21.5129 25.4121 21.2706C25.3443 21.0282 25.2168 20.8068 25.0411 20.6266C24.6674 20.2325 24.2434 19.8893 23.7801 19.6059C20.6771 17.7285 17.1378 16.6936 13.5121 16.6035C9.88651 16.6936 6.34719 17.7285 3.24415 19.6059C2.22984 20.2401 1.39772 21.127 0.829298 22.1796C0.260881 23.2323 -0.0243251 24.4145 0.00162522 25.6105V26.5713C-0.023425 27.4433 0.291397 28.2909 0.879611 28.9351C1.46783 29.5794 2.28339 29.9698 3.15408 30.024H12.9717C13.2124 30.0252 13.4499 29.9686 13.6641 29.8589C13.8784 29.7492 14.0631 29.5895 14.2027 29.3935C15.3033 27.8196 16.7652 26.5326 18.466 25.6405Z" fill="#FFB7B7"/>
                                      </svg>}
                                    {index === 2 &&
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8.57143 48H1.71429C0.768 48 0 47.232 0 46.2857V29.1429C0 28.1966 0.768 27.4286 1.71429 27.4286H8.57143C9.51772 27.4286 10.2857 28.1966 10.2857 29.1429V46.2857C10.2857 47.232 9.51772 48 8.57143 48ZM45.7491 41.5423L33.5469 46.9663C32.0126 47.6469 30.3531 48 28.6749 48H18.8571C18.5914 48 18.3274 47.9383 18.0891 47.8183L13.7143 45.6309V30.8571L17.8286 27.7714C18.1251 27.5486 18.4869 27.4286 18.8571 27.4286H26.5714C28.9337 27.4286 30.8571 29.352 30.8571 31.7143C30.8571 33.8331 29.2783 35.6571 27.1851 35.9571C26.2474 36.0909 25.596 36.9583 25.7314 37.896C25.8651 38.8303 26.7291 39.4851 27.6703 39.3497C30.5537 38.9383 32.8834 36.9171 33.8246 34.2857H43.9989C45.7714 34.2857 47.4497 35.4051 47.88 37.1246C48.3463 38.9794 47.4017 40.8086 45.7491 41.5423ZM48 1.71429V22.2857C48 23.232 47.232 24 46.2857 24H15.4286C14.4823 24 13.7143 23.232 13.7143 22.2857V1.71429C13.7143 0.768 14.4823 0 15.4286 0H25.7143V11.1411C25.7143 11.868 26.5611 12.2657 27.12 11.7994L30.8571 8.57143L34.5943 11.7994C35.1531 12.2657 36 11.868 36 11.1411V0H46.2857C47.232 0 48 0.768 48 1.71429Z" fill="#C3EEDF"/>
                                    </svg>}

                                    {/*<img src={card.photo} alt="photo" style={{width: index===2? 50: 80, borderRadius: '1rem', marginBottom: '1rem', marginTop: index===0? -90:-70}}/>*/}
                                    <Typography variant="h5" component="h2" sx={{mt:1}}>
                                      {card.title}
                                    </Typography>
                                  </div>
                                  <div style={{height:100, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Typography variant="body2" color="text.secondary">
                                      {card.line1}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {card.line2}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {card.line3}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {card.line4}
                                    </Typography>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                            <Link onClick={()=>navigate('/tutorial')} sx={{ marginTop: '1rem', display:'flex'}}>
                              <Typography>Learn more</Typography>  <KeyboardArrowRightIcon />
                            </Link>
                          </Box>
                      </div>



                      {/*====== part 3 - groups ======*/}
                      <div style={{display: 'flex', flexDirection: isLargeScreen? 'row':'column-reverse', justifyContent: 'center', backgroundColor: "rgba(254, 249, 243, 0.6)", marginTop: 100}}>
                        <div
                          style={{
                            width: isLargeScreen? '50%':'100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            // flex: isSmallScreen ? '1 1 auto' : '0 0 auto',
                            textAlign: 'left',
                            padding: 15,
                            maxWidth: isLargeScreen? 600: true,
                            marginTop: isLargeScreen? 60: 680,
                            marginBottom: isLargeScreen? 30: 0,
                          }}
                        >
                          {isLargeScreen
                            && <img src={require('./Shapes1.png')} alt="background-shape"
                                    style={{top: -60, left: 0, zIndex: -1, width: 300, position: 'absolute'}}/>}
                          {isLargeScreen
                            && <img src={require('./Shapes2.png')} alt="background-shape"
                                    style={{bottom: -30, right: -100, zIndex: -1, width: 200, position: 'absolute'}}/>}

                          <div style={{marginTop: isLargeScreen? 0: -600, width:'100%'}}>
                            {groups.map((group) => (
                              <CardWithAvatar
                                avatarUrl={group.avatarUrl}
                                name={group.name}
                                route={group.route}
                                date={group.date}
                                pickupAddress={group.pickupAddress}
                                isLargeScreen={isLargeScreen}
                                isSmallScreen={isSmallScreen}
                                isDiscoverSmallScreen={isDiscoverSmallScreen}
                              />
                            ))}
                          </div>

                        </div>
                        {/*---- right side ----*/}
                        <div
                          style={{
                            width: isLargeScreen? '50%':'100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            // overflow: 'hidden',
                            // flex: isSmallScreen ? '0 0 auto' : '1 1 auto',
                            flexDirection: 'column',
                            padding: 8,
                            // maxWidth: 900,
                            marginTop: isLargeScreen? 60: 70,
                          }}
                        >
                          <Typography variant="h2" component="text" paragraph>
                            Join various groups
                          </Typography>
                          <Typography variant="h2" component="text" paragraph sx={{mt:-2, mb:5}}>
                            and share the costs
                          </Typography>
                          <Typography variant="text" component="text" paragraph sx={{color:'gray'}}>
                            Do you ever see unique and exciting products from overseas, but don't know how to get them? Are you put off by high international shipping costs? Are you tired of waiting months for your packages to arrive?
                          </Typography>
                          <Typography variant="text" component="text" paragraph sx={{color:'gray', mt:2}}>
                          Look no further than ShipShare! Join a group that ships to your doorstep and share the shipping costs with fellow members to enjoy the lowest shipping prices. Plus, meet like-minded people in the group and make new friends!
                          </Typography>
                          <Button variant="contained" onClick={()=>navigate('/groups')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120}}>Join Now</Button>
                        </div>
                      </div>


                      {/*====== part 4 - Choose the plan ======*/}
                      <div style={{justifyContent: 'center', alignItem:"center", height: '100%', marginTop:230}}>
                        <div
                          style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            textAlign: 'left',
                          }}
                        >
                          <Typography variant="h3" component="text" paragraph sx={{mb:9, mt:-20}}>
                            Choose the plan
                          </Typography>
                        </div>
                          <CarouselRoute data={routes}/>
                      </div>



                      {/*====== part 5 - Discover the community ======*/}
                      {!isDiscoverSmallScreen &&
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItem: "center",
                          height: '100%'
                        }}>
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              position: 'relative',
                              textAlign: 'left',
                              maxWidth: 1100,
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              flexDirection: isSmallScreen ? 'column' : (isLargeScreen ? 'row' : ''),
                              alignItems: 'center',
                              marginTop: 220
                            }}>
                              {posts.map((post, index) =>
                                (<PostCard
                                  key={index}
                                  index={index}
                                  avatarUrl={post.avatarUrl}
                                  id={post.id}
                                  title={post.title}
                                />))
                              }
                            </div>
                            <img src={require('./Comma.png')} alt="background-shape"
                                 style={{top: 190, left: 570, zIndex: 1, width: 80, position: 'absolute'}}/>
                            <img src={require('./OrangeCircle.png')} alt="background-shape"
                                 style={{top: 130, right: 12, zIndex: -1, width: 110, position: 'absolute'}}/>

                            <div style={{
                              display: "flex",
                              flexDirection: 'column',
                              maxWidth: 500,
                              position: 'absolute',
                              right: -80,
                              top: 330
                            }}>
                              <Typography variant="h3" component="text" paragraph sx={{mb: 9, mt: -20,}}>
                                Discover the community
                              </Typography>
                              <Typography variant="text" component="text" paragraph sx={{color: 'gray', mt: -6}}>
                                Connect with a community of members and discover tips and tricks for international
                                purchases.
                              </Typography>
                              <Typography variant="text" component="text" paragraph sx={{color: 'gray', mt: 2}}>
                                Whether you're a seasoned shopper or new to the game, our forum offers a space for you
                                to learn, grow, and connect with others who share your interests.
                              </Typography>
                              <Button variant="contained" onClick={() => navigate('/community/discover')} sx={{
                                marginTop: '1rem',
                                borderRadius: 15,
                                padding: 1,
                                width: 120
                              }}>Discover</Button>
                            </div>
                          </Box>
                        </div>
                      }
                      {/*----- version 2 - small screen ------*/}
                      {isDiscoverSmallScreen &&
                        <div style={{
                          display: 'flex',
                          flexDirection: isDiscoverPhoneScreen? 'row':'column',
                          justifyContent: 'center',
                          alignItems: "center",
                          height: '100%',
                        }}>
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column-reverse',
                              justifyContent: 'center',
                              alignItems: 'center',
                              // position: 'relative',
                              textAlign: 'left',
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              flexWrap: isDiscoverPhoneScreen? 'wrap':'wrap',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 100,
                              maxWidth: isDiscoverPhoneScreen? 400:800,
                            }}>
                              {posts.slice(0,4).map((post, index) =>
                                (<PostCardSmallLayout
                                  key={index}
                                  index={index}
                                  avatarUrl={post.avatarUrl}
                                  title={post.title}
                                  id={post.id}
                                  isDiscoverPhoneScreen={isDiscoverPhoneScreen}
                                />))
                              }
                            </div>

                            <div style={{
                              display: "flex",
                              flexDirection: 'column',
                              maxWidth: 600,
                              // position: 'absolute',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                              // right: -80,
                              // top: 330
                              marginTop: 220,
                            }}>
                              <Typography variant="h3" component="text" paragraph sx={{mb: 9, mt: -20,}}>
                                Discover the community
                              </Typography>
                              <Typography variant="text" component="text" paragraph sx={{color: 'gray', mt: -6}}>
                                Connect with a community of members and discover tips and tricks for international
                                purchases.
                              </Typography>
                              <Typography variant="text" component="text" paragraph sx={{color: 'gray', mt: 2}}>
                                Whether you're a seasoned shopper or new to the game, our forum offers a space for you
                                to learn, grow, and connect with others who share your interests.
                              </Typography>
                              <Button variant="contained" onClick={() => navigate('/community/discover')} sx={{
                                marginTop: '1rem',
                                borderRadius: 15,
                                padding: 1,
                                width: 120
                              }}>Discover</Button>
                            </div>
                          </Box>
                        </div>
                      }



                      {/*====== part 6 - end ======*/}
                      {!isDiscoverPhoneScreen &&
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '100%', marginTop: 60}}>
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            textAlign: 'left',
                            maxWidth: 1100,
                          }}
                        >
                          <img src={require('./End.png')} alt="background-shape" style={{top:130, right: 12, width: 1000,}}/>

                          <div style={{zIndex: 1, position: 'absolute', marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                            <Typography variant="h3" component="text" paragraph style={{fontSize: fontSize}}>
                              Ready to use ShipShare?
                            </Typography>
                            <Typography variant="text" component="text" paragraph sx={{color:'gray', flexWrap:'center'}}>
                              Join thousand buyers and groups in the community
                            </Typography>

                            <Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: '1%', width: '35%'}}>Get Started</Button>
                          </div>

                        </Box>
                      </div>}

                      {isDiscoverPhoneScreen &&
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '100%'}}>
                          <Box
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column-reverse',
                              justifyContent: 'center',
                              alignItems: 'center',
                              position: 'relative',
                              textAlign: 'left',
                              maxWidth: 1100,
                            }}
                          >
                            <img src={require('./EndForSmallScreen.png')} alt="background-shape" style={{top:130, right: 12, width: 1000,}}/>

                            <div style={{zIndex: 1, position: 'relative', marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom:50, justifyContent:'center'}}>
                              <Typography variant="h3" component="text" paragraph >
                                Ready to use ShipShare?
                              </Typography>
                              <Typography variant="text" component="text" paragraph sx={{color:'gray', textAlign:'center'}}>
                                Join thousand buyers and groups in the community
                              </Typography>
                              <Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120}}>Get Started</Button>
                            </div>

                          </Box>
                        </div>
                      }


                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

export default Home;