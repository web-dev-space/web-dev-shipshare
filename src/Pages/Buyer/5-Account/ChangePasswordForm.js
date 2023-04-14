import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../third-party/utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../third-party/routes/paths';
// assets
import { countries } from '../../../third-party/assets/data';
// components
import Label from '../../../third-party/components/label';
import { useSnackbar } from '../../../third-party/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../third-party/components/hook-form';
import { Avatar } from '@mui/material';
import {signupThunk, updateCurrentUserThunk, updateUserThunk} from "../../../redux/users/users-thunks";
import {useDispatch} from "react-redux";

// ----------------------------------------------------------------------

ChangePasswordForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function ChangePasswordForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      avatar: currentUser?.avatar || null,
      role: currentUser?.role || 'Buyer',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const NewUserSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Please enter your current password'),
      // .oneOf([currentUser.password], 'Current password does not match'),
    newPassword: Yup.string()
      .required('Password is required')
      .notOneOf(
        [Yup.ref('currentPassword'), null],
        'New password must be different from current password'
      ),
    confirmedPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const dispatch = useDispatch();
  const onSubmit = (data) => {
      data = {
        ...data,
        role: 'buyer'
      };
      try {
        console.log(data);
        console.log("password is " + currentUser.password);
        dispatch(updateCurrentUserThunk(data));
        reset();
        enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
        navigate("./");
      } catch (error) {
        console.log(error);
      }
  };

  const onCancel = () => {
    reset();
    navigate("../");
  }


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 6, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={
                  defaultValues.role === 'buyer'
                    ? 'primary'
                    : defaultValues.role === 'merchant'
                      ? 'secondary'
                      : 'warning'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {defaultValues.role}
              </Label>
            )}

            <Box sx={{ mt:3, display: 'flex', alignItems: 'center', flexDirection: "column"}}>
              <Avatar alt="Remy Sharp" src={defaultValues.avatar}
                            sx={{ width: 120, height: 125 }} />
              <Typography variant="h5" component="h1" paragraph sx={{mt:4}}>
                {defaultValues.name}
              </Typography>
            </Box>

          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <RHFTextField name="currentPassword" label="Current Password" id="currentPassword" sx={{mb: 2}}/>
            <RHFTextField name="newPassword" label="New Password" id="newPassword" sx={{mb: 2}}/>
            <RHFTextField name="confirmedPassword" label="Confirmed Password" id="confirmedPassword" sx={{mb:1}}/>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <div>
                <LoadingButton type="cancel" variant="outlined" style={{marginRight:10, width: 150}} onClick={onCancel}>
                  Cancel
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting} style={{width:150}}>
                  {!isEdit ? 'Create Password' : 'Save Changes'}
                </LoadingButton>
              </div>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
