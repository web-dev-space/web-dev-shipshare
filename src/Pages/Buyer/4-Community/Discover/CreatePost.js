import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField, RHFUpload } from "@mui-library/components/hook-form";
import Main from "@mui-library/layouts/dashboard/Main";
import Header from "@mui-library/layouts/dashboard/header";
import NavVertical from "@mui-library/layouts/dashboard/nav/NavVertical";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Typography } from '@mui/material';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { uploadImage, urlToFile } from "api/imageUpload";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPostThunk } from "redux/posts/posts-thunks";
import * as Yup from 'yup';

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

    // validation schema
    const NewBlogSchema = Yup.object().shape({
        title: Yup.string().required('Title is required')
            .max(40, 'Title must be no more than 40 characters'),
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
    const dispatch = useDispatch();

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
                            <Typography variant="h4" paragraph>
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