import AppWelcome from "@mui-library/app/AppWelcome";
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Box, Button, Card, CardContent,
  Container,
  Link,
  Typography,
} from '@mui/material';
import CardWithAvatar from "Pages/Home/CardWithAvatar";
import CarouselRoute from "Pages/Home/CarouselRoute";
import PostCard from "Pages/Home/PostCard";
import PostCardSmallLayout from "Pages/Home/PostCardSmallLayout";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findAllParcelsThunk } from "redux/parcels/parcels-thunks";
import { findAllPostsThunk } from "redux/posts/posts-thunks";
import { findAllShipGroupsThunk } from "redux/shipGroups/shipGroups-thunks";
import { findAllUsersThunk } from "redux/users/users-thunks";
import { getRandomAvatar } from "utils/getRandomAvatar";


const VisitorHome = () => {

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
        shipGroupsRedux.map((shipGroup) => {
          const user = users.find((user) => user.email === shipGroup.leader);
          return {
            avatarUrl: user?.avatar || getRandomAvatar(user?.name),
            name: shipGroup.name,
            route: shipGroup.shipRoute,
            created: shipGroup.created,
            date: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(shipGroup.shipEndDate)),
            pickupAddress: getShortAddress(shipGroup.pickupLocation.address),
          };
        }).sort((p1, p2) => new Date(p2.created) - new Date(p1.created)).slice(0, 3)
      );
    }
  }, [shipGroupsRedux, users])

  useEffect(() => {
    if (allPosts && users) {
      const recentPosts = allPosts.map((post) => {
        const user = users.find((user) => user._id === post.userId);
        return {
          avatarUrl: user?.avatar || getRandomAvatar(user?.name),
          title: post.title,
          id: post._id,
          created: post.created
        };
      }).sort((p1, p2) => new Date(p2.created) - new Date(p1.created)).slice(0, 6);
      setPosts(recentPosts);
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
                action={<Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120, mb:isSmallScreen?-10:3}}>Get Started</Button> }
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
                action={<Button variant="contained" style={{borderRadius: 15, marginBottom: -130}} onClick={()=>navigate('/login')}>Get Started</Button> }
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
                <Typography variant="h3" component="text"  paragraph sx={{mb:9}}>
                  How it works
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between',  flexDirection: isWorkLargeScreen? 'row':'column', alignItems: 'center'}}>
                  {cards.map((card, index) => (
                    <Card key={index} sx={{width: 270, mr:1, ml:1, mb:3}}>
                      <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{height: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                          <div style={{height: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
                            <img src={card.icon} alt="icon" style={{width: 150, objectFit: 'cover', borderRadius: '1rem', marginBottom: -50, alignSelf:'center', marginLeft: 35}}/>
                          </div>
                          <div style={{height: 110, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
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
                          </div>

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
                <Link onClick={()=>navigate('/help/tutorials')} sx={{ marginTop: '1rem', display:'flex'}}>
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


                <div style={{marginTop: isLargeScreen? 0: -700, }}>
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
                  alignItems: isLargeScreen? 'flex-start':'center',
                  textAlign: isLargeScreen? 'left':'center',
                  // overflow: 'hidden',
                  // flex: isSmallScreen ? '0 0 auto' : '1 1 auto',
                  flexDirection: 'column',
                  padding: 8,
                  // maxWidth: 900,
                  marginTop: isLargeScreen? 60: 70,
                }}
              >
                <Typography variant="h3" component="text" paragraph>
                  Join various groups
                </Typography>
                <Typography variant="h3" component="text" paragraph sx={{mt:-2, mb:5}}>
                  and share the costs
                </Typography>
                <Typography variant="text" component="text" paragraph sx={{color:'gray',  mr:5}}>
                  Do you ever see unique and exciting products from overseas, but don't know how to get them? Are you put off by high international shipping costs? Are you tired of waiting months for your packages to arrive?
                </Typography>
                <Typography variant="text" component="text" paragraph sx={{color:'gray', mt:2,  mr:5}}>
                  Look no further than ShipShare! Join a group that ships to your doorstep and share the shipping costs with fellow members to enjoy the lowest shipping prices. Plus, meet like-minded people in the group and make new friends!
                </Typography>
                <Button variant="contained" onClick={()=>navigate('/groups')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120, mb:3}}>Join Now</Button>
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
                       style={{top: 180, left: 510, zIndex: 1, width: 80, position: 'absolute'}}/>
                  <img src={require('./OrangeCircle.png')} alt="background-shape"
                       style={{top: 125, right: 100, zIndex: -1, width: 110, position: 'absolute'}}/>

                  <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    maxWidth: 480,
                    position: 'absolute',
                    right: 0,
                    top: 330
                  }}>
                    <Typography variant="h3" component="text" paragraph sx={{mb: 9, mt: -20,}}>
                      Discover the community
                    </Typography>
                    <Typography variant="text" component="text" paragraph sx={{color: 'gray', mt: -6}}>
                      Connect with a community of members and discover tips and tricks for international
                      purchases.
                    </Typography>
                    <Typography variant="text" component="text" paragraph sx={{color: 'gray',}}>
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


            {/*====== part 6 - review ======*/}
            <div style={{display:'flex', flexDirection:  isLargeScreen? "row":"column", backgroundColor: "rgba(251, 254, 243, 0.6)", marginTop: 80, flex:1}}>
              <div style={{display:'flex', flexDirection:'column', width: isLargeScreen? '50%': "85%", margin:60, textAlign:isLargeScreen? 'left':'center', alignItems:isLargeScreen? 'flex-start':'center'}}>
                <Typography variant="h3" component="text" paragraph sx={{mb:3}}>
                  Empower Your Experience with Product Reviews
                </Typography>
                <Typography variant="text" component="text" paragraph sx={{color: 'gray'}}>
                  Looking to buy products from overseas but uncertain about their quality or worthiness? Unsure about how others have rated these products? We've got you covered.
                </Typography>
                <Typography variant="text" component="text" paragraph sx={{color: 'gray'}}>
                  Our platform allows you to search for any product, read reviews from others, and even leave your own review to help others make informed decisions. With our platform, you can shop with confidence and learn more about the real-life experiences of other customers.
                </Typography>
                <Button variant="contained" onClick={() => navigate('/search')} sx={{
                  marginTop: '1rem',
                  borderRadius: 15,
                  padding: 1,
                  width: 120
                }}>Try Now</Button>
              </div>

              <div style={{ justifyContent:'center', alignItems:'center', display: 'flex', flex:1 }}>
                <div style={{ width: isSmallScreen || isLargeScreen? "100%" : '50%', }}>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="layer 1"
                  viewBox="0 0 4000 3000" id="customer-rating"><defs>
                  <clipPath id="a">
                    <path fill="none" d="M3462.60117,581.56957a89.65313,89.65313,0,0,0-89.60671-89.61748H1724.34506a89.65551,89.65551,0,0,0-89.61749,89.61748V2194.57975a89.65521,89.65521,0,0,0,89.61749,89.6121h1648.6494a89.65283,89.65283,0,0,0,89.60671-89.6121Z" clip-rule="evenodd"></path></clipPath><clipPath id="b"><rect width="1827.876" height="1792.236" x="1634.73" y="491.955" fill="none"></rect></clipPath><clipPath id="c"><path fill="none" d="M3328.36338,428.1164a89.6533,89.6533,0,0,0-89.61748-89.60671H1590.09649a89.651,89.651,0,0,0-89.60684,89.60671V2041.13092a89.653,89.653,0,0,0,89.60684,89.61209H3238.7459a89.65524,89.65524,0,0,0,89.61748-89.61209Z" clip-rule="evenodd"></path></clipPath><clipPath id="d"><path fill="none" d="M1874.41805,1674.892l237.2898,217.04116,281.79184-352.22626s-6.49125-34.44756,11.95987-91.09227c18.44009-56.64483,42.93015-168.30873,57.57047-54.93312,0,0,72.47964-113.25722,115.9483-83.137,0,0,42.55353-18.94626,39.11934,28.03161,0,0,41.06811-.25834,15.0172,52.04809,0,0,43.56536,1.84088-2.69122,79.757-46.24607,77.92686-46.43977,105.29106-105.948,143.74325l-294.49417,464.10226s-81.94226,153.41756-229.04414,47.30081c-147.11252-106.11682-319.50105-246.87811-319.50105-246.87811Z" clip-rule="evenodd"></path></clipPath><clipPath id="e"><path fill="none" d="M815.89069,1665.34357s94.10536-144.03392,301.0793-144.27071c206.98669-.2368,401.8307,4.47822,401.8307,4.47822s142.19317-18.03115,251.57493,61.72568,115.67918,98.111,115.67918,98.111l-175.56412,215.24338,42.29519,35.35191s22.21856,92.95456-70.47766,178.884l-38.37676,352.7624L993.30324,2471.592l-94.64255-516.23221L843.79214,2010.239,670.44776,1821.87548Z" clip-rule="evenodd"></path></clipPath><clipPath id="f"><path fill="none" d="M1156.03559,1146.7463s-2.41132-268.13116,236.74091-243.8135c191.78684,19.506,193.03547,139.15753,199.98966,201.38914,6.96483,62.23173,92.31947,72.017,27.93476,111.05036,0,0,28.77446,154.30351-86.96937,167.43672,0,0-1.17333,51.316,38.27992,80.62872,39.464,29.31283,64.43845,52.33876,73.77164,69.70249,0,0-345.40138,242.81231-662.53435,10.1621,0,0,61.77957-58.604,48.96935-113.52621-12.39023-53.11393-32.53138-113.99992,32.19775-153.61467C1153.635,1221.5621,1156.03559,1146.7463,1156.03559,1146.7463Z" clip-rule="evenodd"></path></clipPath><clipPath id="g"><path fill="none" d="M1552.02118,910.113s-9.93608,124.42037-107.60566,226.35279l3.7677,34.09237s-25.082-39.93761-68.32455-33.96319c-43.23173,5.97455-78.91728,104.41917,32.36988,131.19137,0,0,47.0855-.94731,64.47078,77.1626s42.17679,80.3705,94.171,115.916,124.065-44.82477,124.065-44.82477L1673.5887,998.90171Z" clip-rule="evenodd"></path></clipPath></defs><line x1="635.781" x2="633.916" y1="1037.914" y2="1066.817" fill="none" stroke="#f7e628" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><line x1="629.536" x2="627.67" y1="1132.816" y2="1161.709" fill="none" stroke="#f7e628" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><line x1="682.171" x2="658.604" y1="1135.917" y2="1119.081" fill="none" stroke="#f7e628" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><line x1="604.848" x2="581.281" y1="1080.542" y2="1063.706" fill="none" stroke="#f7e628" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><line x1="687.163" x2="661.295" y1="1071.974" y2="1084.999" fill="none" stroke="#f7e628" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><line x1="602.157" x2="576.287" y1="1114.624" y2="1127.649" fill="none" stroke="#f7e628" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><path fill="#f7bb28" fill-rule="evenodd" d="M651.68671,646.503a16.20117,16.20117,0,1,1-16.2,16.20117A16.20538,16.20538,0,0,1,651.68671,646.503Z"></path><path fill="none" stroke="#f7bc28" stroke-linecap="round" stroke-linejoin="round" stroke-width="9" d="M651.68671,646.503a16.20117,16.20117,0,1,1-16.2,16.20117A16.20538,16.20538,0,0,1,651.68671,646.503Z"></path><path fill="#faf8f0" fill-rule="evenodd" d="M3328.36338,428.1164a89.6533,89.6533,0,0,0-89.61748-89.60671H1590.09649a89.651,89.651,0,0,0-89.60684,89.60671V2041.13092a89.653,89.653,0,0,0,89.60684,89.61209H3238.7459a89.65524,89.65524,0,0,0,89.61748-89.61209Z"></path><g clip-path="url(#c)"><path fill="#43781e" fill-rule="evenodd" d="M3687.899,192.2366c0-9.47313-8.32122-17.16991-18.56939-17.16991H1441.74585c-10.24817,0-18.56939,7.69678-18.56939,17.16991V501.38186c0,9.47313,8.32122,17.17016,18.56939,17.17016H3669.32964c10.24817,0,18.56939-7.697,18.56939-17.17016Z"></path><circle cx="1619.119" cy="442.563" r="25.007" fill="#ff7f36"></circle><circle cx="1709.08" cy="442.563" r="25.007" fill="#f7bb28"></circle><circle cx="1799.699" cy="442.563" r="25.007" fill="#39b55d"></circle><path fill="#6eb282" fill-rule="evenodd" d="M1769.58981 655.47025a9.61081 9.61081 0 00-9.62386-9.61295h-89.72511a9.611 9.611 0 00-9.62385 9.61295V745.206a9.62989 9.62989 0 009.62385 9.61322H1759.966a9.62966 9.62966 0 009.62386-9.61322zM2303.80677 685.54722a11.98849 11.98849 0 00-11.98116-11.97039h-424.0172a11.97931 11.97931 0 00-11.97053 11.97039v29.571a11.98167 11.98167 0 0011.97053 11.98143h424.0172a11.99084 11.99084 0 0011.98116-11.98143z"></path><path fill="#ffdc63" fill-rule="evenodd" d="M1781.3665 855.86885a13.0338 13.0338 0 0123.55353 0c9.98982 21.03458 23.62882 49.76594 29.62492 62.41478a13.03629 13.03629 0 0010.09745 7.33081c13.8867 1.80855 45.41689 5.89912 68.51838 8.89178a13.02919 13.02919 0 017.27706 22.391c-16.92247 16.00735-40.0346 37.84917-50.20734 47.473a13.0214 13.0214 0 00-3.85391 11.8629c2.57282 13.76817 8.429 45.0186 12.71337 67.91548a13.03226 13.03226 0 01-19.04311 13.8436c-20.45324-11.15238-48.36646-26.38469-60.66-33.0804a13.029 13.029 0 00-12.47644 0c-12.29352 6.69571-40.20673 21.928-60.66 33.0804a13.03678 13.03678 0 01-19.05389-13.8436c4.2844-22.89688 10.14055-54.14731 12.72414-67.91548a13.05528 13.05528 0 00-3.86468-11.8629c-10.17274-9.62385-33.27409-31.46567-50.2072-47.473a13.0368 13.0368 0 017.27706-22.391c23.10135-2.99266 54.64232-7.08323 68.51824-8.89178a13.019 13.019 0 0010.09745-7.33081C1757.74846 905.63479 1771.38745 876.90343 1781.3665 855.86885zM2088.66037 855.86885a13.02518 13.02518 0 0123.54262 0c9.98982 21.03458 23.62882 49.76594 29.6357 62.41478a13.00222 13.00222 0 0010.09758 7.33081c13.87579 1.80855 45.41689 5.89912 68.51824 8.89178a13.03689 13.03689 0 017.27706 22.391c-16.93311 16.00735-40.03446 37.84917-50.2072 47.473a13.055 13.055 0 00-3.86468 11.8629c2.58346 13.76817 8.429 45.0186 12.72414 67.91548a13.0416 13.0416 0 01-19.054 13.8436c-20.45324-11.15238-48.36646-26.38469-60.65984-33.0804a13.02931 13.02931 0 00-12.47658 0c-12.29338 6.69571-40.20673 21.928-60.66 33.0804a13.04143 13.04143 0 01-19.05376-13.8436c4.29517-22.89688 10.1512-54.14731 12.724-67.91548a13.02132 13.02132 0 00-3.85377-11.8629c-10.17287-9.62385-33.285-31.46567-50.20734-47.473a13.02919 13.02919 0 017.27706-22.391c23.10136-2.99266 54.63168-7.08323 68.51838-8.89178a13.03629 13.03629 0 0010.09745-7.33081C2065.03155 905.63479 2078.67055 876.90343 2088.66037 855.86885zM2394.95305 855.86885a13.03369 13.03369 0 0123.55339 0c9.98983 21.03458 23.61805 49.76594 29.62493 62.41478a13.03629 13.03629 0 0010.09731 7.33081c13.88683 1.80855 45.41716 5.89912 68.51851 8.89178a13.02919 13.02919 0 017.27706 22.391c-16.92233 16.00735-40.03446 37.84917-50.20747 47.473a13.02124 13.02124 0 00-3.85364 11.8629c2.57269 13.76817 8.42871 45.0186 12.7131 67.91548a13.03209 13.03209 0 01-19.043 13.8436c-20.45324-11.15238-48.37723-26.38469-60.65984-33.0804a13.05044 13.05044 0 00-12.48735 0c-12.28261 6.69571-40.20687 21.928-60.64933 33.0804a13.03673 13.03673 0 01-19.05376-13.8436c4.2844-22.89688 10.14068-54.14731 12.71337-67.91548a13.0214 13.0214 0 00-3.8539-11.8629c-10.17275-9.62385-33.2741-31.46567-50.20721-47.473a13.02919 13.02919 0 017.27706-22.391c23.10135-2.99266 54.64245-7.08323 68.51825-8.89178a13.01922 13.01922 0 0010.09757-7.33081C2371.33474 905.63479 2384.96322 876.90343 2394.95305 855.86885z"></path><path fill="#e6edc7" fill-rule="evenodd" d="M2701.00867 855.86885a13.02538 13.02538 0 0123.54288 0c9.98982 21.03458 23.62882 49.76594 29.62492 62.41478a13.03629 13.03629 0 0010.09732 7.33081c13.88683 1.80855 45.41715 5.89912 68.51851 8.89178a13.02919 13.02919 0 017.27706 22.391c-16.92234 16.00735-40.03473 37.84917-50.20747 47.473a13.02121 13.02121 0 00-3.85364 11.8629c2.57268 13.76817 8.4287 45.0186 12.7131 67.91548a13.03221 13.03221 0 01-19.043 13.8436c-20.45324-11.15238-48.36646-26.38469-60.66011-33.0804a13.02878 13.02878 0 00-12.47631 0c-12.29365 6.69571-40.20686 21.928-60.6601 33.0804a13.04149 13.04149 0 01-19.05376-13.8436c4.2844-22.89688 10.14042-54.14731 12.72414-67.91548a13.05562 13.05562 0 00-3.86468-11.8629c-10.17274-9.62385-33.27409-31.46567-50.2072-47.473a13.03671 13.03671 0 017.27705-22.391c23.10136-2.99266 54.64246-7.08323 68.51825-8.89178a13.01842 13.01842 0 0010.09732-7.33081C2677.37985 905.63479 2691.01884 876.90343 2701.00867 855.86885zM3009.13132 855.86885a13.02538 13.02538 0 0123.54288 0c9.98982 21.03458 23.62882 49.76594 29.62492 62.41478a13.03631 13.03631 0 0010.09732 7.33081c13.88683 1.80855 45.41716 5.89912 68.51851 8.89178a13.02919 13.02919 0 017.27706 22.391c-16.92234 16.00735-40.03473 37.84917-50.20747 47.473a13.02124 13.02124 0 00-3.85364 11.8629c2.57268 13.76817 8.42871 45.0186 12.7131 67.91548a13.03221 13.03221 0 01-19.043 13.8436c-20.45324-11.15238-48.36646-26.38469-60.65984-33.0804a13.02931 13.02931 0 00-12.47658 0c-12.29338 6.69571-40.20686 21.928-60.6601 33.0804a13.03673 13.03673 0 01-19.05376-13.8436c4.2844-22.89688 10.14042-54.14731 12.72414-67.91548a13.05562 13.05562 0 00-3.86468-11.8629c-10.17274-9.62385-33.27409-31.46567-50.2072-47.473a13.03671 13.03671 0 017.27706-22.391c23.10135-2.99266 54.64245-7.08323 68.51824-8.89178a13.01922 13.01922 0 0010.09758-7.33081C2985.5025 905.63479 2999.14176 876.90343 3009.13132 855.86885z"></path><path fill="#fff" fill-rule="evenodd" d="M2216.23477,1248.86177a14.249,14.249,0,0,0-14.23112-14.24189H1674.859a14.2512,14.2512,0,0,0-14.242,14.24189v684.31151a14.24211,14.24211,0,0,0,14.242,14.23125h527.14464a14.23987,14.23987,0,0,0,14.23112-14.23125Z"></path><rect width="381.531" height="258.126" x="1748.221" y="1347.042" fill="#f0f5d8"></rect><path fill="#378d72" fill-rule="evenodd" d="M1748.22145,1412.25089s79.76774,5.7484,94.86,77.647c15.08158,71.88765,69.65951,73.20106,83.77223,75.51554s92.45943,18.33246,106.36755,39.044H1749.707Z"></path><path fill="#6eb282" fill-rule="evenodd" d="M1842.72622,1604.45744s.40907-33.68316,50.50879-46.8809c50.08894-13.187,52.52167-29.01138,69.48711-58.92684,16.96543-29.90483,44.14671-56.55864,76.53828-61.87642,32.40221-5.31791,75.0204-17.89132,90.31723-89.90815v258.34593Z"></path><path fill="#e8f3dd" fill-rule="evenodd" d="M3153.85434,1252.5434A17.90143,17.90143,0,0,0,3135.963,1234.663H2473.66559a17.8989,17.8989,0,0,0-17.88029,17.88042v677.0129a17.9012,17.9012,0,0,0,17.88029,17.8912H3135.963a17.90372,17.90372,0,0,0,17.89133-17.8912Z"></path><ellipse cx="2615.966" cy="1436.289" fill="#ed9c1e" rx="61.457" ry="61.693"></ellipse><path fill="#ffdc63" fill-rule="evenodd" d="M2469.7904,1244.32981a13.03928,13.03928,0,0,1,18.09553-15.08159c21.14234,9.77445,50.01351,23.11213,62.7161,28.98971a13.07364,13.07364,0,0,0,12.455-.82892c11.8198-7.50308,38.65653-24.55458,58.324-37.0418a13.02765,13.02765,0,0,1,19.92577,12.54109c-2.75587,23.13368-6.52357,54.707-8.18114,68.61523a13.05716,13.05716,0,0,0,4.63946,11.583c10.78641,8.924,35.298,29.18353,53.25374,44.02819a13.03644,13.03644,0,0,1-5.78059,22.83236c-22.843,4.52119-54.03956,10.70021-67.77554,13.413a13.03422,13.03422,0,0,0-9.58088,7.99835c-5.15615,13.01468-16.84691,42.58573-25.4157,64.24463a13.0403,13.0403,0,0,1-23.49978,1.561c-11.36776-20.33484-26.87983-48.08669-33.70485-60.31556a13.029,13.029,0,0,0-10.5709-6.642c-13.962-.88267-45.70757-2.8635-68.949-4.3275a13.02317,13.02317,0,0,1-8.752-21.85259c15.82456-17.09461,37.42945-40.43289,46.94568-50.70261a13.0046,13.0046,0,0,0,3.05732-12.0997C2483.50482,1297.69118,2475.59254,1266.89292,2469.7904,1244.32981Z"></path><ellipse cx="2615.966" cy="1674.3" fill="none" stroke="#ed9c1e" stroke-linecap="round" stroke-linejoin="round" stroke-width="8" rx="61.457" ry="61.693"></ellipse><path fill="#39b55d" fill-rule="evenodd" d="M3004.91158 1401.46448a14.46715 14.46715 0 00-14.45714-14.45727H2759.02066a14.46259 14.46259 0 100 28.92518h231.43378A14.46933 14.46933 0 003004.91158 1401.46448zM3004.91158 1477.46439a14.467 14.467 0 00-14.45714-14.45714H2759.02066a14.45721 14.45721 0 100 28.91441h231.43378A14.46715 14.46715 0 003004.91158 1477.46439zM3004.91158 1637.08581a14.46715 14.46715 0 00-14.45714-14.45727H2759.02066a14.46259 14.46259 0 100 28.92518h231.43378A14.46933 14.46933 0 003004.91158 1637.08581zM3004.91158 1714.496a14.46715 14.46715 0 00-14.45714-14.45727H2759.02066a14.45721 14.45721 0 100 28.91441h231.43378A14.46021 14.46021 0 003004.91158 1714.496zM3004.91158 1790.9265a14.46715 14.46715 0 00-14.45714-14.45727H2759.02066a14.45721 14.45721 0 100 28.91441h231.43378A14.46712 14.46712 0 003004.91158 1790.9265z"></path></g><path fill="#ffceaa" fill-rule="evenodd" d="M696.56977,1793.11167,485.59245,2018.77556s-105.2061,106.20072,22.15621,204.30848c127.36125,98.10881,504.54381,368.74176,504.54381,368.74176L976.4131,2332.37322,735.87012,2120.637,895.6788,1957.1682Z"></path><path fill="#43781e" fill-rule="evenodd" d="M1713.65549,2683.95578c-67.754,64.78619-235.815-83.46858-432.73672-6.77215-210.86214,82.12514-305.38833-3.01093-329.89994-31.80589L993.30324,2471.592l650.62821-3.96258Z"></path><polygon fill="#f0ae83" fill-rule="evenodd" points="814.108 1975.652 735.87 2120.637 843.792 2010.239 814.108 1975.652"></polygon><path fill="#ffceaa" fill-rule="evenodd" d="M1874.41805,1674.892l237.2898,217.04116,281.79184-352.22626s-6.49125-34.44756,11.95987-91.09227c18.44009-56.64483,42.93015-168.30873,57.57047-54.93312,0,0,72.47964-113.25722,115.9483-83.137,0,0,42.55353-18.94626,39.11934,28.03161,0,0,41.06811-.25834,15.0172,52.04809,0,0,43.56536,1.84088-2.69122,79.757-46.24607,77.92686-46.43977,105.29106-105.948,143.74325l-294.49417,464.10226s-81.94226,153.41756-229.04414,47.30081c-147.11252-106.11682-319.50105-246.87811-319.50105-246.87811Z"></path><g clip-path="url(#d)"><line x1="2113.463" x2="2145.251" y1="1888.036" y2="1917.726" fill="none" stroke="#f0ae83" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line></g><path fill="#f7bb28" fill-rule="evenodd" d="M815.89069,1665.34357s94.10536-144.03392,301.0793-144.27071c206.98669-.2368,401.8307,4.47822,401.8307,4.47822s142.19317-18.03115,251.57493,61.72568,115.67918,98.111,115.67918,98.111l-175.56412,215.24338,42.29519,35.35191s22.21856,92.95456-70.47766,178.884l-38.37676,352.7624L993.30324,2471.592l-94.64255-516.23221L843.79214,2010.239,670.44776,1821.87548Z"></path><g clip-path="url(#e)"><polygon fill="#e4892a" fill-rule="evenodd" points="898.661 1955.36 882.838 1850.295 733.282 2123.071 898.661 1955.36"></polygon><path fill="#e4892a" fill-rule="evenodd" d="M932.38485,1532.35441s304.81783,276.66776,703.21461,3.025l-564.91838-69.864Z"></path></g><line x1="1748.717" x2="1671.554" y1="1937.264" y2="1872.998" fill="none" stroke="#e4892a" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><path fill="#ef7256" fill-rule="evenodd" d="M2456.48491 1394.30582s-2.5083 3.35863-6.77114 9.22556c-1.91618 2.63734-4.21974 5.72685-6.70649 9.32228-1.22708 1.787-2.476 3.72473-3.77848 5.75917-2.66966 4.15536-5.47941 8.75184-8.63344 13.596a3.76147 3.76147 0 006.06076 4.45667c3.7246-4.51041 7.20163-8.70874 10.23739-12.69168 1.47465-1.94851 2.87414-3.82158 4.112-5.65156 2.48675-3.66008 4.4999-7.01871 6.1898-9.86065 3.77847-6.38362 5.70543-10.22662 5.70543-10.22662a3.7617 3.7617 0 00-6.41582-3.9292zM2630.04677 1389.494s-4.23051.366-15.10313 10.15119c-2.35744 2.11-5.03788 4.70424-8.01977 7.94447-1.744 1.88386-3.59556 3.98308-5.49019 6.3513-1.6255 2.03458-3.27229 4.28439-4.97323 6.728-4.0907 5.8777-8.40742 12.89628-13.34858 21.12066a2.87152 2.87152 0 104.70437 3.29411c4.62894-5.70543 8.90256-10.61414 12.69181-15.09236 3.11093-3.67086 5.94223-6.94329 8.43949-9.9575 2.57295-3.11106 4.769-5.94223 6.78191-8.40742 2.69122-3.30476 4.91962-6.0283 6.86812-8.2136 6.41582-7.18008 8.76249-8.332 8.76249-8.332a2.8696 2.8696 0 10-1.31329-5.5869zM2613.61958 1335.72339a314.99015 314.99015 0 00-23.0798 22.025c-4.4137 4.59662-9.26866 9.8391-14.22034 15.75977-4.2844 5.12409-8.62267 10.77564-12.99327 16.80394-5.94222 8.18127-11.81979 17.11616-17.60065 26.53541a3.22894 3.22894 0 005.37165 3.58465c8.6119-11.98129 17.61144-22.88611 25.92188-32.72521 2.21762-2.62656 4.38137-5.17783 6.45892-7.6538q5.1024-6.11988 9.6345-11.52912c14.608-17.36373 24.89926-28.07485 24.89926-28.07485a3.22584 3.22584 0 00-4.39215-4.72579zM2576.93285 1311.20113a313.46643 313.46643 0 00-26.406 21.04523c-5.16719 4.55352-10.77564 9.7207-16.3197 15.523-5.01633 5.25326-9.9575 11.034-14.75859 17.07306a249.99516 249.99516 0 00-19.24745 27.89179 2.68408 2.68408 0 004.47809 2.96034 288.03513 288.03513 0 0121.26061-25.29743c4.27362-4.61817 8.61189-9.06406 12.78853-13.38078 2.94956-3.04641 5.81318-6.0283 8.57956-8.90256 4.62895-4.80109 8.978-9.30073 12.95016-13.30536 11.76619-11.85212 20.02275-19.409 20.02275-19.409a2.68491 2.68491 0 00-3.348-4.19832z"></path><path fill="#693500" fill-rule="evenodd" d="M1156.03559,1146.7463s-2.41132-268.13116,236.74091-243.8135c191.78684,19.506,193.03547,139.15753,199.98966,201.38914,6.96483,62.23173,92.31947,72.017,27.93476,111.05036,0,0,28.77446,154.30351-86.96937,167.43672,0,0-1.17333,51.316,38.27992,80.62872,39.464,29.31283,64.43845,52.33876,73.77164,69.70249,0,0-345.40138,242.81231-662.53435,10.1621,0,0,61.77957-58.604,48.96935-113.52621-12.39023-53.11393-32.53138-113.99992,32.19775-153.61467C1153.635,1221.5621,1156.03559,1146.7463,1156.03559,1146.7463Z"></path><g clip-path="url(#f)"><path fill="#ffceaa" fill-rule="evenodd" d="M1552.02118,910.113s-9.93608,124.42037-107.60566,226.35279l3.7677,34.09237s-25.082-39.93761-68.32455-33.96319c-43.23173,5.97455-78.91728,104.41917,32.36988,131.19137,0,0,47.0855-.94731,64.47078,77.1626s42.17679,80.3705,94.171,115.916,124.065-44.82477,124.065-44.82477L1673.5887,998.90171Z"></path><g clip-path="url(#g)"><path fill="#f0ae83" fill-rule="evenodd" d="M1533.73155,1382.809s-22.9614-1.421-35.75006-12.63807c0,0,12.53031,19.05389,53.49067,46.21362,41.21857,27.332,71.33864-34.47989,71.33864-34.47989Z"></path></g><path fill="none" stroke="#f17453" stroke-linecap="round" stroke-linejoin="round" stroke-width="9" d="M1572.95878,1248.668s30.10929,14.78026,50.41181,7.99835"></path><path fill="none" stroke="#f0ae83" stroke-linecap="round" stroke-linejoin="round" stroke-width="9" d="M1361.77364,1180.591s43.49008-11.26,71.44639,30.76607"></path><path fill-rule="evenodd" d="M1566.00472,1092.84656c5.49006-.3552,10.571,9.21478,11.35686,21.35758.79658,12.15344-3.02486,22.294-8.50427,22.64918s-10.571-9.21465-11.35685-21.35745S1560.52531,1093.20188,1566.00472,1092.84656Z"></path><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="9" d="M1566.00472,1092.84656c5.49006-.3552,10.571,9.21478,11.35686,21.35758.79658,12.15344-3.02486,22.294-8.50427,22.64918s-10.571-9.21465-11.35685-21.35745S1560.52531,1093.20188,1566.00472,1092.84656Z"></path><path fill="#692700" fill-rule="evenodd" d="M1572.75418,1042.98377a17.82009,17.82009,0,0,0-5.80214-3.7677,16.76785,16.76785,0,0,0-6.66352-1.238c-3.5631.02155-7.7722,1.24876-12.28275,4.14445-6.42659,4.123-13.75739,12.132-20.91605,27.07365a3.2361,3.2361,0,0,0,5.71607,3.03577c5.71621-9.70993,11.17393-15.80288,16.03967-19.6351a22.05156,22.05156,0,0,1,11.92742-5.02724,19.56813,19.56813,0,0,1,4.855-.07543c1.93773.33378,3.14339.58135,3.14339.58135a3.23225,3.23225,0,1,0,3.98294-5.09176Z"></path><path fill="#240000" fill-rule="evenodd" d="M1359.96522,1306.583s-56.8815,94.36483,4.83341,159.20158c61.71492,64.84752,77.60386,71.56478,74.54668,154.16356l33.16647,4.715s23.34906-47.29-36.4067-118.06894C1376.36009,1435.8152,1326.4111,1438.00036,1359.96522,1306.583Z"></path><polygon fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="9" points="1410.571 1244.933 1425.825 1372.356 1372.248 1367.415 1410.571 1244.933"></polygon></g><path fill="#240000" fill-rule="evenodd" d="M1152.537,1329.02768s-20.02262,3.72473-32.83283,25.2329c-7.63226,12.82086-12.74557,32.047-9.22543,60.77838,5.15641,42.03684,16.40564,66.21468,9.3546,94.67691-5.10254,20.62552-19.96874,43.38245-53.53364,77.098a4.8415,4.8415,0,1,0,6.92186,6.77114c34.54441-35.96545,49.36765-60.32634,54.33023-82.039,6.71727-29.42045-4.86574-54.14731-10.94791-97.31439-2.98176-21.1422-.97951-36.902,3.391-48.62493,10.23739-27.41808,33.38185-32.316,33.38185-32.316a2.17244,2.17244,0,0,0-.83969-4.263Z"></path><path fill="none" stroke="#ffdc63" stroke-linecap="round" stroke-linejoin="round" stroke-width="9" d="M1109.67138,380.6217a17.13232,17.13232,0,1,1-17.12693,17.13784A17.14107,17.14107,0,0,1,1109.67138,380.6217Z"></path><line x1="865.915" x2="1040.582" y1="995.629" y2="1027.945" fill="none" stroke="#ffbe52" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line><line x1="1147.402" x2="1222.81" y1="631.217" y2="804.531" fill="none" stroke="#ffbe52" stroke-linecap="round" stroke-linejoin="round" stroke-width="9"></line></svg>
              </div>
              </div>
            </div>



            {/*====== part 7 - end ======*/}
            {!isDiscoverPhoneScreen &&
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '100%', marginTop: 80}}>
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

                    <Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120}}>Get Started</Button>
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

export default VisitorHome;