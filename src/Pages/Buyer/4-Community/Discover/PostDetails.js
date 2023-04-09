import { useState } from "react";
import Header from "../../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../../third-party/layouts/dashboard/Main"
import {Container, Box, Avatar, Typography, TextField, Button, Pagination} from '@mui/material';
import Image from "mui-image";

const post = {
    title: "ShipShare is the Best Shipping Platform!",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
    author: "Joe Doe",
    date: new Date("2021-08-01"),
    image: "https://source.unsplash.com/random",
    commentsNumber: 1910,
    viewsNumber: 8820,
    comments: [
        {
            user:{
                name: "Kelly Doe",
                avatar: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg",
            },
            date: new Date("2021-08-01"),
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        },
        {
            user:{
                name: "Jelly Cat",
                picture: "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg"
            },
            date: new Date("2021-08-01"),
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
        },
    ]
};


// Comment component
const Comment = ({name, date, content}) => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center',
            marginTop: 32, marginBottom: 32}}>
            <Avatar src="https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg" sx={{ width: 48, height: 48, mb: 'auto' }} />
            <div style={{ marginLeft: 16}}>
                <div style={{
                    fontSize: 16,
                    fontWeight: 600,
                }}>
                    {name}
                </div>
                <div style={{
                    fontSize: 13,
                    color: '#929191'
                }}>
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))}
                </div>
                <div style={{
                    fontSize: 14,
                    marginTop: 10
                }}>
                    {content}
                </div>
            </div>
        </div>
    );
};


// -----------------Post Details Page---------------------
const PostDetails = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        {/*-----------------Image---------------------*/}
                        <Image
                            src={post.image}
                            style={{borderRadius: 20,
                                height: 350,
                                filter: "brightness(0.3)"
                            }}
                            sx={{
                                width: '100%',
                                zIndex: -1,
                                left: 0,
                                right: 0,
                                // mr: 5,
                                position: 'absolute',
                            }}
                        />

                        {/*-----------------Title & Author---------------------*/}
                        <div style={{
                            zIndex: 2,
                            position: 'absolute',
                            top: 100,
                            height: 350,
                            padding: 60,
                        }}>
                            <Typography variant="h2" gutterBottom style={{ color: 'white'}}>
                                {post.title}
                            </Typography>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 80}}>
                                <Avatar src="https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_1.jpg" sx={{ width: 48, height: 48 }} />
                                <div style={{ marginLeft: 8}}>
                                    <div style={{
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: "white"
                                    }}>
                                        {post.author}
                                    </div>
                                    <div style={{
                                        fontSize: 13,
                                        color: '#929191'
                                    }}>
                                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.date))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*-----------------Post Content---------------------*/}
                        <div style={{ padding: 8, marginTop: 48, marginBottom: 48}}>
                            <Typography variant="body1" gutterBottom>
                                {post.post}
                            </Typography>
                        </div>

                        <hr style={{
                            borderWidth: 0,
                            borderColor: 'rgba(145, 158, 171, 0.24)',
                            borderBottomWidth: 'thin',
                        }}/>

                        {/*-----------------Post Comments---------------------*/}
                        <div>
                            <Typography variant="h4" gutterBottom style={{ marginTop: 40, marginBottom: 24}}>
                                Comments
                            </Typography>

                            <TextField
                                label="Write some of your comments..."
                                multiline
                                fullWidth
                                rows={4}
                                sx={{ backgroundColor: 'white'}}
                                variant="outlined"
                            />

                            <div style={{ width: '100%', marginBottom:40}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        marginTop: 28,
                                        display: 'flex',
                                        marginLeft: 'auto',
                                        height: 40  }}
                                >
                                    Post Comment
                                </Button>
                            </div>
                        </div>

                        {/*-----------------Comments---------------------*/}
                        <div style={{ marginTop: 16}}>
                            {post.comments.map((comment, index) => (
                                <>
                                <hr style={{
                                    borderWidth: 0,
                                    borderColor: 'rgba(145, 158, 171, 0.24)',
                                    borderBottomWidth: 'thin',
                                }}/>
                                <Comment
                                    key={index}
                                    name={comment.user.name}
                                    date={comment.date}
                                    content={comment.content}
                                />
                                </>
                            ))}
                        </div>

                        <hr style={{
                            borderWidth: 0,
                            borderColor: 'rgba(145, 158, 171, 0.24)',
                            borderBottomWidth: 'thin',
                        }}/>

                        {/*-----------------Pagination---------------------*/}
                        <div
                            style={{ marginTop: 40, marginBottom: 32,
                                    display: 'flex', justifyContent: 'center'}}>
                            <Pagination count={10} color="primary" />
                        </div>

                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

export default PostDetails;