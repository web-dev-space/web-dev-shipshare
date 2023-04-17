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
import RouteCard from "./RouteCard";
import PostCard from "./PostCard";
import AppWelcome from "../../third-party/app/AppWelcome";


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
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [fontSize, setFontSize] = useState(24);
    const [fontSize2, setFontSize2] = useState(14);

    useEffect(() => {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 900);
        setIsLargeScreen(window.innerWidth > 1300);
      };
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

    const posts = [
      {
        avatarUrl: require('../../images/randomAvatars/avatar_3.jpg'),
        title: "ShipShare is the Best Shipping Platform!",
      },
      {
        avatarUrl: require('../../images/randomAvatars/avatar_1.jpg'),
        title: "ShipShare is the Best Shipping Platform!",
      },
      {
        avatarUrl: '',
        title: '',
      },
      {
        avatarUrl: require('../../images/randomAvatars/avatar_2.jpg'),
        title: "ShipShare is the Best Shipping Platform!",
      },
      {
        avatarUrl: require('../../images/randomAvatars/avatar_4.jpg'),
        title: "ShipShare is the Best Shipping Platform!",
      },
      {
        avatarUrl: require('../../images/randomAvatars/avatar_5.jpg'),
        title: "ShipShare is the Best Shipping Platform!",
      }
      ]

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
                      {/*<div style={{display: isLargeScreen? 'flex':'', flexDirection: isLargeScreen? 'row': 'column', justifyContent: 'center', alignItem:"center", height: '90vh', backgroundColor: "rgba(251, 254, 243, 0.6)"}}>*/}
                      {/*  <Box*/}
                      {/*    sx={{*/}
                      {/*      width: isLargeScreen? '40%':'100%',*/}
                      {/*      height: isLargeScreen? '100%':400,*/}
                      {/*      display: 'flex',*/}
                      {/*      flexDirection: 'column',*/}
                      {/*      justifyContent: 'center',*/}
                      {/*      position: 'relative',*/}
                      {/*      // flex: isLargeScreen ? '0 0 auto' : '1 1 auto',*/}
                      {/*      textAlign: isLargeScreen? 'left': 'center',*/}
                      {/*      alignItems: isLargeScreen? 'flex-start': 'center',*/}
                      {/*      padding: 2,*/}
                      {/*      maxWidth: 500,*/}
                      {/*      minWidth: isLargeScreen? 400:100,*/}
                      {/*      paddingY: isSmallScreen? '3rem': 0,*/}
                      {/*    }}*/}
                      {/*  >*/}
                      {/*    <Typography variant="h2" component="text" paragraph>*/}
                      {/*      Ship globally &*/}
                      {/*    </Typography>*/}
                      {/*    <Typography variant="h2" component="text" paragraph>*/}
                      {/*      Save big*/}
                      {/*    </Typography>*/}
                      {/*    <Typography variant="body1" component="text" paragraph sx={{color:'gray'}}>*/}
                      {/*      ShipShare -- The ultimate solution for affordable and convenient international shipping!*/}
                      {/*    </Typography>*/}
                      {/*    <Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120}}>Get Started</Button>*/}
                      {/*  </Box>*/}
                      {/*  /!*--- right side image ---*!/*/}
                      {/*  <Box*/}
                      {/*    sx={{*/}
                      {/*      width: isLargeScreen? '60%':'100%',*/}
                      {/*      height: '100%',*/}
                      {/*      alignItems: 'center',*/}
                      {/*      display: isLargeScreen? 'flex':'',*/}
                      {/*      justifyContent: 'center',*/}
                      {/*      overflow: 'hidden',*/}
                      {/*      flex: isLargeScreen ? '1 1 auto':'0 0 auto',*/}
                      {/*      padding: 2,*/}
                      {/*      maxWidth: 800,*/}
                      {/*    }}*/}
                      {/*  >*/}
                      {/*    <img src={require('../../images/HomeGroup.png')} alt="HomeGroup" style={{objectFit: 'cover', borderRadius: '1rem', width: '100%'}}/>*/}
                      {/*  </Box>*/}
                      {/*</div>*/}
                      <AppWelcome
                        title={"Ship globally &"}
                        title2={"Save big"}
                        description="ShipShare -- The ultimate solution for affordable and convenient international shipping!"
                        img={<img src={require('../../images/HomeGroup.png')} alt="HomeGroup" style={{
                          p: 3,
                          width: isSmallScreen? '80%':'50%',
                          margin: { xs: 'auto', md: 'inherit' },
                          alignSelf: 'center',
                          marginBottom: 180,
                          marginTop: 180,
                          marginRight: isSmallScreen? 0: 30,
                        }}/>}
                        action={<Button variant="contained" style={{borderRadius: '1rem', marginBottom: -130}} onClick={()=>navigate('/login')}>Get Started</Button> }
                      />


                      {/*====== part 2 - How it works ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '80vh', marginTop: isLargeScreen? 0:210}}>
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
                          <Typography variant={isSmallScreen? "h3": "h2"}  component="text" paragraph sx={{mb:9}}>
                            How it works
                          </Typography>
                          <div style={{display: 'flex', justifyContent: 'space-between',  flexDirection: isLargeScreen? 'row':'column', alignItems: 'center'}}>
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



                      {/*====== part 3 - groups ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '80vh', backgroundColor: "rgba(254, 249, 243, 0.6)"}}>
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
                          <img src={require('./Shapes1.png')} alt="background-shape" style={{top:0, left: 0, zIndex:-1, width: 300, position: 'absolute'}}/>
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
                            padding: 8,
                            maxWidth: 900,
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


                      {/*====== part 4 - Choose the plan ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '80vh'}}>
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
                          <Typography variant="h3" component="text" paragraph sx={{mb:9, mt:-20}}>
                            Choose the plan
                          </Typography>
                          <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: isSmallScreen ? 'column' : (isLargeScreen ? 'row' : ''), alignItems: 'center'}}>
                            {routes.map((route, index) =>
                              (<RouteCard
                                index={index}
                                route={route.route}
                                price={route.price}
                                text1={route.text1}
                                text2={route.text2}
                                trait1={route.trait1}
                                trait2={route.trait2}
                                trait3={route.trait3}
                              />))
                            }
                          </div>
                        </Box>
                      </div>



                      {/*====== part 5 - Discover the community ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '80vh'}}>
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
                          <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: isSmallScreen ? 'column' : (isLargeScreen ? 'row' : ''), alignItems: 'center'}}>
                            {posts.map((post, index) =>
                              (<PostCard
                                key={index}
                                index={index}
                                avatarUrl={post.avatarUrl}
                                title={post.title}
                              />))
                            }
                          </div>
                          <img src={require('./Comma.png')} alt="background-shape" style={{top:190, left: 570, zIndex:1, width: 80, position: 'absolute'}}/>
                          <img src={require('./OrangeCircle.png')} alt="background-shape" style={{top:130, right: 12, zIndex:-1, width: 110, position: 'absolute'}}/>

                          <div style={{display:"flex", flexDirection: 'column', maxWidth: 600, position: 'absolute', right: -180, top: 330}}>
                            <Typography variant="h3" component="text" paragraph sx={{mb:9, mt:-20}}>
                              Discover the community
                            </Typography>
                            <Typography variant="text" component="text" paragraph sx={{color:'gray'}}>
                              Connect with a community of  members and discover tips and tricks for international purchases.
                            </Typography>
                            <Typography variant="text" component="text" paragraph sx={{color:'gray', mt:2}}>
                              Whether you're a seasoned shopper or new to the game, our forum offers a space for you to learn, grow, and connect with others who share your interests.
                            </Typography>
                            <Button variant="contained" onClick={()=>navigate('/community/discover')} sx={{marginTop: '1rem', borderRadius: 15, padding: 1, width: 120}}>Discover</Button>
                          </div>
                        </Box>
                      </div>



                      {/*====== part 6 - end ======*/}
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem:"center", height: '80vh'}}>
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

                          <div style={{zIndex: 1, position: 'absolute', marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h3" component="text" paragraph style={{fontSize: fontSize}}>
                              Ready to use ShipShare?
                            </Typography>
                            <Typography variant="text" component="text" paragraph sx={{color:'gray'}} style={{fontSize: fontSize2}}>
                              Join thousand buyers and groups in the community
                            </Typography>
                            <Button variant="contained" onClick={()=>navigate('/login')} sx={{marginTop: '1rem', borderRadius: 15, padding: '1%', width: '35%'}}>Get Started</Button>
                          </div>

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