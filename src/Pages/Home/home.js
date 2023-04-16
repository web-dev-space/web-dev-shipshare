import {useEffect, useState} from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../third-party/layouts/dashboard/Main"
import {
  Container,
  Typography,
  Box, Button, Card, CardMedia, CardContent, Link,
} from '@mui/material';
import {useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {useNavigate} from "react-router-dom";
import CardWithAvatar from "./CardWithAvatar";
import routeTableItem from "../Buyer/6-Help/RouteTableItem";


const Home = () => {

    // ---------nav bar---------
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // ---------current user---------
    let currentUser = useSelector(state => state.auth.currentUser);
    if (currentUser === null) {
        currentUser = {
            role: "visitor"
        }
    }

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 800);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
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

    const groups = [
      {
        avatarUrl: require('../../images/randomAvatars/avatar_1.jpg'),
        name: 'Santa Clara Group',
        route:'Air Standard',
        date: 'Mar 13, 2023',
        pickupAddress: 'Santa Clara, CA',
      },
      {
        avatarUrl: require('../../images/randomAvatars/avatar_2.jpg'),
        name: 'San Jose Group',
        route:'Air Standard',
        date: 'Mar 13, 2023',
        pickupAddress: 'San Jose, CA',
      },
      {
        avatarUrl: require('../../images/randomAvatars/avatar_3.jpg'),
        name: 'Hayward Group',
        route:'Air Standard',
        date: 'Mar 13, 2023',
        pickupAddress: 'Santa Clara, CA',
      },
    ];

    const navigate = useNavigate();

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
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '90vh', backgroundColor: "rgba(251, 254, 243, 0.6)"}}>
                        <Box
                          sx={{
                            width: isSmallScreen? '100%':'40%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative',
                            flex: isSmallScreen ? '1 1 auto' : '0 0 auto',
                            textAlign: 'left',
                            padding: 2,
                            maxWidth: 500,
                          }}
                        >
                          <Typography variant="h2" component="text" paragraph>
                            Ship globally &
                          </Typography>
                          <Typography variant="h2" component="text" paragraph>
                            Save big
                          </Typography>
                          <Typography variant="text" component="text" paragraph sx={{color:'gray'}}>
                            ShipShare -- The ultimate solution for affordable and convenient international shipping!
                          </Typography>
                          <Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120}}>Get Started</Button>
                        </Box>
                        {/*--- right side image ---*/}
                        <Box
                          sx={{
                            width: isSmallScreen? '0%':'60%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flex: isSmallScreen ? '0 0 auto' : '1 1 auto',
                            padding: 2,
                            maxWidth: 800,
                          }}
                        >
                          <img src={require('../../images/HomeGroup.png')} alt="HomeGroup" className={isSmallScreen ? 'hide-image' : ''} style={{objectFit: 'cover', borderRadius: '1rem', width: '100%'}}/>
                        </Box>
                      </div>


                      {/*====== part 2 ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '80vh'}}>
                        <Box
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            flex: '0 0 auto',
                            textAlign: 'left',
                          }}
                        >
                          <Typography variant="h3" component="text" paragraph sx={{mb:9, mt:-20}}>
                            How it works
                          </Typography>
                          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: isSmallScreen? 'column':'', alignItems: 'center'}}>
                            {cards.map((card, index) => (
                              <Card key={index} sx={{width: 300, mr:3, mb:3}}>
                                <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                  <div style={{height: 230, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <img src={card.icon} alt="icon" style={{width: 150, objectFit: 'cover', borderRadius: '1rem', marginBottom: '1rem', alignSelf:'center', marginLeft: 35}}/>
                                    <img src={card.photo} alt="photo" style={{width: index===2? 50: 80, borderRadius: '1rem', marginBottom: '1rem', marginTop: index===0? -90:-70}}/>
                                    <Typography variant="h5" component="h2">
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



                      {/*====== part 3 ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '90vh', backgroundColor: "rgba(254, 249, 243, 0.6)"}}>
                        <Box
                          sx={{
                            width: isSmallScreen? '100%':'50%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative',
                            flex: isSmallScreen ? '1 1 auto' : '0 0 auto',
                            textAlign: 'left',
                            padding: 5,
                            maxWidth: 600,
                          }}
                        >
                          <img src={require('./Shapes1.png')} alt="background-shape" style={{top:0, left: 50, zIndex:-1, width: 300, position: 'absolute'}}/>
                          <img src={require('./Shapes2.png')} alt="background-shape" style={{bottom:0, right: 100, zIndex:-1, width: 200, position: 'absolute'}}/>
                          {groups.map((group) => (
                            <CardWithAvatar
                              avatarUrl={group.avatarUrl}
                              name={group.name}
                              route={group.route}
                              date={group.date}
                              pickupAddress={group.pickupAddress}
                            />
                          ))}


                        </Box>
                        {/*---- right side ----*/}
                        <Box
                          sx={{
                            width: isSmallScreen? '100%':'50%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flex: isSmallScreen ? '0 0 auto' : '1 1 auto',
                            flexDirection: 'column',
                            padding: 5,
                            maxWidth: 800,
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
                        </Box>
                      </div>



                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

export default Home;