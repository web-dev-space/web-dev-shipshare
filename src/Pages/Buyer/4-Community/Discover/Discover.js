import { useState, useEffect } from "react";
import Header from "../../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box } from '@mui/material';
import InputCard from "../../../../components/InputCard"
import Button from "@mui/material/Button";
import {Add as AddIcon} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import SearchBar from "../../../../components/searchBar";
import GreenChipGroup from "../../../../components/GreenChipGroup";
import PostCard from "./post-components/PostCard";
import backgroundImg from "../../3-Groups/background.jpg";
import Image from "mui-image";
import {Pagination} from "@mui/lab";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {findAllPostsThunk} from "../../../../redux/posts/posts-thunks";
import {Helmet} from "react-helmet";
import {findAllUsersThunk} from "../../../../redux/users/users-thunks";

const chipLabelsArray = ["Latest", "Popular"];

const Discover = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.posts);
    const {users} = useSelector(state => state.users);
    useEffect(() => {
        dispatch(findAllPostsThunk());
        dispatch(findAllUsersThunk());
    }, []);

    const MAX_SIZE_PER_PAGE = 10;
    const [open, setOpen] = useState(false);

    const [focusChip, setFocusChip] = useState('Latest');
    const [filter, setFilter] = useState('All');

    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(1);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePaginationChange = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        // const userPosts = posts.filter(post => post.userId === users.id);

        const userPostsAndNames = posts.map(post => ({
            ...post,
            name: users.find(user => user._id === post.userId)?.name || '',
        }));
        setAllPosts(userPostsAndNames);
    }, [ posts, users]);


    const [filteredPosts, setFilteredPosts] = useState([]);
    useEffect(()=>{
        setFilteredPosts(allPosts);
    }, [allPosts]);
    console.log('filtered posts' ,filteredPosts);


    const [visiblePosts, setVisiblePosts] = useState([]);
    useEffect(() => {
        const changePage = () => {
            const newPage = page - 1;
            const updatedVisiblePosts = filteredPosts.slice(
                newPage * MAX_SIZE_PER_PAGE,
                newPage * MAX_SIZE_PER_PAGE + MAX_SIZE_PER_PAGE
            );

            setVisiblePosts(updatedVisiblePosts);
        };
        changePage();
    }, [page, filteredPosts]);

    // search bar
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        setFilteredPosts(
            posts.filter((val) => {
                if (searchTerm === "") {
                    return val;
                } else if (val.title.match(searchTerm)) {
                    return val;
                }
            }));
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    function onPostCardClick  (id) {
        navigate(`./post/${id}`);
    }

    const navigate = useNavigate();

    // -----small screen controller-----
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 665);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Discover | ShipShare</title>
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
                    <Container maxWidth='xl'>

                        <Image
                            src={backgroundImg}
                            style={{borderRadius: 20,
                                    height: 250,
                            }}
                            sx={{
                                width: '100%',
                                zIndex: 1,
                                left: 0,
                                right: 0,
                                // mr: 5,
                                position: 'absolute',
                            }}
                        />
                        <div style={{height:28}}/>

                        {/*--------------Title----------------------*/}
                        <Stack
                            width='100%'
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="h4" component="h1" paragraph>
                                Discover
                            </Typography>
                            <Button variant="contained"
                                    color="primary"
                                    size={isSmallScreen?"small":"large"}
                                    startIcon={<AddIcon />}
                                    style={{height:isSmallScreen?36:44}}
                                    onClick={() => {navigate('./posts/create-new-post')}}
                                    >
                                New Post
                            </Button>
                        </Stack>


                        {/*--------------Search Bar Row----------------------*/}
                        <Stack
                            width='100%'
                            direction={isSmallScreen? "column":"row"}
                            justifyContent="space-between"
                            flexWrap="wrap"
                        >
                            {/*---Search Bar---*/}
                            <SearchBar
                                searchText="Search by Post Title"
                                width={360}
                                height={48}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                handleSearch={handleSearch}
                                handleInputChange={handleInputChange}
                                handleKeyPress={handleKeyPress}
                            />
                            {/*---NewPost---*/}
                            <GreenChipGroup chipLabelsArray={chipLabelsArray}
                                            focusChip={focusChip}
                                            setFilter={setFilter}
                                            setFocusChip={setFocusChip}
                                            isSmallScreen={isSmallScreen}
                            />
                        </Stack>

                        <div style={{height:30}}/>

                        {/*---Post Cards---*/}
                        <div style={{
                            display: 'flex',
                            flexDirection:'column',
                            gap: 16 }}>
                            {visiblePosts.sort((a, b) => {
                                if (focusChip === 'Latest') {
                                    return new Date(b.created) - new Date(a.created);
                                } else if (focusChip === 'Popular') {
                                    return b.viewsAmount - a.viewsAmount;
                                }
                                return 0;
                            }).map((post, index) => (
                                <PostCard
                                    index={index}
                                    id={post._id}
                                    title={post.title}
                                    post={post.post}
                                    author={post.name}
                                    date={post.created}
                                    image={post.image}
                                    comments={post.comments}
                                    commentsNumber={post.comments.length}
                                    viewsNumber={post.viewsAmount}
                                    onPostCardClick={()=>onPostCardClick(post._id)}/>
                            ))}

                        </div>

                        {/*---Pagination---*/}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 100,
                        }}>
                            <Pagination count={Math.ceil(filteredPosts.length / MAX_SIZE_PER_PAGE)}
                                onChange={handlePaginationChange}
                            />
                        </div>
                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};
export default Discover;