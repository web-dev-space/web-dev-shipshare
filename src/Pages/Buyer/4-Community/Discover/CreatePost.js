import {useCallback, useState} from "react";
import Header from "../../../../third-party/layouts/dashboard/header"
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../../third-party/layouts/dashboard/Main"
import {Container, Typography, Box} from '@mui/material';
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {RHFUpload} from "../../../../third-party/components/hook-form";
import FormProvider, { RHFTextField} from "../../../../third-party/components/hook-form";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {createPostThunk} from "../../../../redux/posts/posts-thunks";
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import {uploadImage, urlToFile} from "../../../../api/imageUpload";

const CreatePost = () => {
    // ---- handle the nav bar ---
    const [open, setOpen] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // ---- handle the new post object ---
    const defaultValues = {
        title: '',
        content: '',
        cover: null,
    };
    const [newPost, setNewPost] = useState(defaultValues);

    // validation schema
    const NewBlogSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        cover: Yup.mixed().required('Cover is required'),
        content: Yup.string().required('Content is required'),
    });

    const methods = useForm({
        resolver: yupResolver(NewBlogSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        setValue,
        formState: { isSubmitting }
    } = methods;

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // try {
        //     // await new Promise((resolve) => setTimeout(resolve, 500));
        //     enqueueSnackbar('Post success!');
        //     navigate("../");
        //     console.log('DATA', data);
        try {
            const file = await urlToFile(data.cover.preview);
            const imageRemoteUrl = await uploadImage(file);
            const newPost ={
                userId: currentUser._id,
                viewsAmount: 0,
                created: new Date(),
                title: data.title,
                post: data.content,
                comments: [],
                image: imageRemoteUrl,
            }
            dispatch(createPostThunk(newPost)).then((result) => {
                if (result.type.endsWith('fulfilled')) {
                    enqueueSnackbar('Post success!');
                    navigate('../');
                }
            });
        } catch (error) {
            console.log("error happens");
            console.error(error);
        }
    };


    // ---- handle the file upload component ---
    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('cover', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );

    const handleRemoveFile = () => {
        setValue('cover', null);
    };

    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    const dispatch = useDispatch();
    const postHandler = async (title, content) => {
        try {
            const newPost = { title, content };
            await dispatch(createPostThunk(newPost));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Helmet>
                <title>New Post | ShipShare</title>
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

                    {/*--------------Page Title----------------------*/}
                    <Container maxWidth={false}>
                        <Stack
                            width='100%'
                            direction="row"
                            justifyContent="space-between"
                        >
                            <Typography variant="h3" paragraph>
                                Create a new post
                            </Typography>
                        </Stack>
                    </Container>

                    {/*--------------Post Editor----------------------*/}
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Card style={{maxWidth:"400", padding: 40, margin: 24}}>
                            {/*-------------- 1. Title -----------------*/}
                            <Typography
                                variant="h5" gutterBottom
                                sx={{ color: 'text.secondary' }}
                                style={{
                                        color: "color: rgb(99, 115, 129)",
                                        marginTop: 20, marginBottom: 24}}>
                                Post Title
                            </Typography>
                            <RHFTextField name="title" label="Post Title" />

                            {/*-------------- 2. Content -----------------*/}
                            <Typography variant="h5" gutterBottom
                                        sx={{ color: 'text.secondary' }}
                                        style={{ marginTop: 20, marginBottom: 24}}>
                                Content
                            </Typography>
                            <RHFTextField name="content" label="Content"
                                            multiline rows={8}
                            />

                            <Typography variant="h5" gutterBottom
                                        sx={{ color: 'text.secondary' }}
                                        style={{ marginTop: 20, marginBottom: 24}}>
                                Cover Picture
                            </Typography>

                            {/*-------------- 3. Upload Banner Picture -----------------*/}
                            <RHFUpload
                                name="cover"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                onDelete={handleRemoveFile}
                            />

                            {/*-------------- Submit Button -----------------*/}
                            <Stack direction="row" spacing={2} sx={{ mt: 10}}
                                    display="flex" justifyContent="flex-end">
                                <Button
                                    fullWidth
                                    color="inherit"
                                    variant="outlined"
                                    size="large"
                                    style={{maxWidth: 200}}
                                    onClick={() => navigate("../")}
                                >
                                    Cancel
                                </Button>

                                <LoadingButton
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    type={"submit"}
                                    style={{maxWidth: 200}}
                                    loading={isSubmitting}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Post
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </FormProvider>
                </Main>
                {/*------------------------------------*/}
            </Box>
        </>
    );
};
export default CreatePost;