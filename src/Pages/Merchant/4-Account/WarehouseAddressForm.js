import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useSnackbar } from '../../../third-party/components/snackbar';
import FormProvider, {
    RHFTextField,
} from '../../../third-party/components/hook-form';

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


    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            enqueueSnackbar('Update success!');
            navigate("./");
            console.log('DATA', data);
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
