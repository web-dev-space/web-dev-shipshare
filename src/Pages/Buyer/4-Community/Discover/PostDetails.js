import {useEffect, useState} from "react";
import Header from "../../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../../third-party/layouts/dashboard/Main"
import {Container, Box, Avatar, Typography, TextField, Button, Pagination, IconButton} from '@mui/material';
import Image from "mui-image";
import {useDispatch, useSelector} from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";

// sample data
import posts from "../../../../sampleData/posts";
import {deletePostThunk, findAllPostsThunk, findPostByIdThunk} from "../../../../redux/posts/posts-thunks";
import {Helmet} from "react-helmet";
import {findUserById} from "../../../../redux/users/users-service";
import {findUserByIdThunk} from "../../../../redux/users/users-thunks";

const post = posts[0];
const COMMENT_PER_PAGE = 5;


// Comment component
const Comment = ({user, date, content, role, handleDeleteComment}) => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center',
            marginTop: 32, marginBottom: 32}}>
            {/*<Avatar src={user.picture} sx={{ width: 48, height: 48, mb: 'auto' }} />*/}
            <div style={{ marginLeft: 16}}>
                <div style={{display: 'flex', flexDirection: "row"}}>
                    <div style={{width:"70%"}}>
                        <div style={{
                            fontSize: 16,
                            fontWeight: 600,
                        }}>
                            {user}
                        <div style={{
                            fontSize: 13,
                            color: '#929191'
                        }}>
                            {new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(date))}
                        </div>
                    </div>

                    </div>
                    {role === 'admin' && (
                        <div style={{width:"100%", display: "flex", justifyContent:"flex-end",
                            marginRight: 8}}>
                            <IconButton onClick={handleDeleteComment}>
                                <DeleteIcon style={{color:"lightGrey", fontSize:"large"}}/>
                            </IconButton>
                        </div>
                    )}
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
    const {id} = useParams();
    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.posts);
    const {users} = useSelector(state => state.users);

    useEffect(() => {
        dispatch(findPostByIdThunk(id));
        dispatch(findUserByIdThunk(id));
    }, [id]);

    const post = posts.find(post => post.userId === id);
    const user = users.find(user => user.email === post.userId);

    console.log(post);
    console.log("post ", user.name);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [page, setPage] = useState(1);

    const navigate = useNavigate();
    const handleDeletePost = (id) => {
        dispatch(deletePostThunk(id));
        navigate("../");
    };
   const handleDeleteComment = () => {
       console.log('delete');
       navigate("./");
    };

    const role = useSelector(state => state.auth.currentUser.role);

    return (
        <>
            <Helmet>
                <title>{post.title} | ShipShare</title>
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
                            top: 60,
                            height: 350,
                            padding: 60,
                        }}>
                            <IconButton
                                style={{ marginLeft: -40}}
                                onClick={() => navigate("../")}>
                                <ArrowBackIcon style={{ color: 'white'}}/>
                            </IconButton>
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

                        {/*-----------------Delete Button---------------------*/}
                        {role === 'admin' && (
                            <div style={{width:"100%", display: "flex", justifyContent:"flex-end",
                                marginRight: 32, marginTop: 16,}}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={()=>handleDeletePost(id)}>
                                    <DeleteIcon/>
                                    Delete Post
                                </Button>
                            </div>
                        )}

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
                            {post.comments
                                .slice((page - 1) * COMMENT_PER_PAGE, (page - 1) * COMMENT_PER_PAGE + COMMENT_PER_PAGE)
                                .map((comment, index) => (
                                <>
                                <hr style={{
                                    borderWidth: 0,
                                    borderColor: 'rgba(145, 158, 171, 0.24)',
                                    borderBottomWidth: 'thin',
                                }}/>
                                <Comment
                                    key={index}
                                    user={comment.user}
                                    date={comment.date}
                                    content={comment.content}
                                    role={role}
                                    handleDeleteComment={handleDeleteComment}
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
                            <Pagination
                                color="primary"
                                count={Math.ceil(post.comments.length / COMMENT_PER_PAGE)}
                                page={page}
                                siblingCount={2}
                                boundaryCount={1}
                                onChange={(event, value) => {
                                    setPage(value);
                                }} />
                        </div>

                    </Container>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};

export default PostDetails;