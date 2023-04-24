import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider, { RHFTextField } from '@mui-library/components/hook-form';
import { updateWarehouseThunk } from "redux/warehouse/warehouse-thunks";

// ----------------------------------------------------------------------

export default function WarehouseAddressForm({currentAddress} ) {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const NewAddressSchema = Yup.object().shape({
        receiver: Yup.string().required('Receiver is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        province: Yup.string().required('Province is required'),
    });


    const defaultValues = {
        _id: currentAddress?._id || '',
        receiver: currentAddress?.receiver || '',
        phoneNumber: currentAddress?.phoneNumber || '',
        street: currentAddress?.street || '',
        city: currentAddress?.city || '',
        province: currentAddress?.province || '',
    };

    const methods = useForm({
        resolver: yupResolver(NewAddressSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;


    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        try {
            console.log('DATA', data);
            await new Promise((resolve) => setTimeout(resolve, 500));
            await dispatch(updateWarehouseThunk(data));
            enqueueSnackbar('Update success!');
            navigate("./");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            style={{marginBottom:20}}
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="receiver" label="Receiver" />
                            <RHFTextField name="phoneNumber" label="Phone Number" />

                        </Box>
                        <RHFTextField name="street" label="Street" style={{marginBottom:20}}/>
                        <Box
                            style={{marginBottom:20}}
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="city" label="City" style={{marginBottom:20}}/>
                            <RHFTextField name="province" label="Province" style={{marginBottom:24}}/>
                        </Box>

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Update
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
