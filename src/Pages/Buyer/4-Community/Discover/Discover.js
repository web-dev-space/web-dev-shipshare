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

const chipLabelsArray = ["Latest", "Popular"];

const examplePosts = [{
    title: "ShipShare is the Best Shipping Platform!",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
    author: "Joe Doe",
    date: new Date("2022-08-01"),
    image: "https://source.unsplash.com/random",
    commentsNumber: 1910,
    viewsNumber: 4820,
    repostsNumber: 7460,
},
    {
        title: "ShipShare is the Best Shipping Platform!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2023-08-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 8821,
        repostsNumber: 7460,
    },
    {
        title: "ShipShare is the Best Shipping Platform!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2021-02-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 85820,
        repostsNumber: 7460,
    },
    {
        title: "ShipShare is the Best Shipping Platform!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2021-03-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 28820,
        repostsNumber: 7460,
    },
    {
        title: "ShipShare is the Best Shipping Platform!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2021-08-05"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 8810,
        repostsNumber: 7460,
    },
    {
        title: "Welcome to Shipshare!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2020-08-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 8820,
        repostsNumber: 7460,
    },
    {
        title: "Welcome to Shipshare!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2018-08-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 2820,
        repostsNumber: 7460,
    },
    {
        title: "Welcome to Shipshare!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2020-08-22"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 3820,
        repostsNumber: 7460,
    },
    {
        title: "Welcome to Shipshare!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2021-03-22"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 4820,
        repostsNumber: 7460,
    },
    {
        title: "Welcome to Shipshare!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2023-01-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 2320,
        repostsNumber: 7460,
    },
    {
        title: "Welcome to Shipshare!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2021-07-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 4420,
        repostsNumber: 7460,
    },
    {
        title: "Welcome to Shipshare!",
        post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        author: "Joe Doe",
        date: new Date("2020-08-01"),
        image: "https://source.unsplash.com/random",
        commentsNumber: 1910,
        viewsNumber: 8820,
        repostsNumber: 7460,
    },
];

const Discover = () => {
    const MAX_SIZE_PER_PAGE = 10;
    const [open, setOpen] = useState(false);

    const [focusChip, setFocusChip] = useState('Latest');
    const [filter, setFilter] = useState('All');
    const [posts, setPosts] = useState(examplePosts);
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [visiblePosts, setVisiblePosts] = useState([]);
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

    const onPostCardClick = () => {
        navigate('./post');
    }

    const navigate = useNavigate();

    return (
        <>
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
                    <Container maxWidth={false}>

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
                            <Typography variant="h3" component="h1" paragraph>
                                Discover
                            </Typography>
                            <Button variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    style={{height:44}}
                                    onClick={() => {navigate('./create-new-post')}}
                                    >
                                New Post
                            </Button>
                        </Stack>


                        {/*--------------Search Bar Row----------------------*/}
                        <Stack
                            width='100%'
                            direction="row"
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
                                            setFocusChip={setFocusChip}/>
                        </Stack>

                        <div style={{height:30}}/>

                        {/*---Post Cards---*/}
                        <div style={{
                            display: 'flex',
                            flexDirection:'column',
                            gap: 16 }}>
                            {visiblePosts.sort((a, b) => {
                                if (focusChip === 'Latest') {
                                    return b.date - a.date;
                                } else if (focusChip === 'Popular') {
                                    return b.viewsNumber - a.viewsNumber;
                                }
                                return 0;
                            }).map((post) => (
                                <PostCard
                                    title={post.title}
                                    post={post.post}
                                    author={post.author}
                                    date={post.date}
                                    image={post.image}
                                    commentsNumber={post.commentsNumber}
                                    viewsNumber={post.viewsNumber}
                                    repostsNumber={post.repostsNumber}
                                    onPostCardClick={onPostCardClick}/>
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