import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, {
  RHFTextField,
} from '@mui-library/components/hook-form';
import Label from '@mui-library/components/label';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Card, Grid, Stack, Typography } from '@mui/material';
import InputAdornment from "@mui/material/InputAdornment";
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  changePasswordThunk, logoutThunk
} from "redux/users/users-thunks";
import { getRandomAvatar } from "utils/getRandomAvatar";
import * as Yup from 'yup';

// ----------------------------------------------------------------------

ChangePasswordForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function ChangePasswordForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const currentUserInfo = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      avatar: currentUser?.avatar || getRandomAvatar(currentUser?.name || ''),
      role: currentUser?.role || 'Buyer',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmedPassword: '',
  };

  const NewUserSchema = Yup.object().shape({
    oldPassword: Yup.string()
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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const newObject = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      await dispatch(changePasswordThunk(newObject)).unwrap();
      enqueueSnackbar('Update success!');
      await dispatch(logoutThunk());
      navigate("/login");
    } catch (error) {
      alert('Old password is wrong! Please update the correct password!');
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleToggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/*Left part*/}
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 6, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={
                  currentUserInfo.role === 'buyer'
                    ? 'primary'
                    : currentUserInfo.role === 'merchant'
                      ? 'secondary'
                      : 'warning'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {currentUserInfo.role}
              </Label>
            )}

            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', flexDirection: "column" }}>
              <Avatar alt="avatar" src={currentUserInfo.avatar}
                sx={{ width: 120, height: 125 }} />
              <Typography variant="h5" component="h1" paragraph sx={{ mt: 4 }}>
                {currentUserInfo.name}
              </Typography>
            </Box>

          </Card>
        </Grid>

        {/*Right part*/}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <RHFTextField type={passwordVisible ? "text" : "password"} name="oldPassword" label="Current Password" id="oldPassword" sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!passwordVisible ? (
                      <VisibilityOffIcon style={{ fontSize: 16 }} onClick={handleTogglePasswordVisibility} />
                    ) : (
                      <VisibilityIcon style={{ fontSize: 16 }} onClick={handleTogglePasswordVisibility} />
                    )}
                  </InputAdornment>
                )
              }} />
            <RHFTextField name="newPassword" type={newPasswordVisible ? "text" : "password"} label="New Password" id="newPassword" sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!newPasswordVisible ? (
                      <VisibilityOffIcon style={{ fontSize: 16 }} onClick={handleToggleNewPasswordVisibility} />
                    ) : (
                      <VisibilityIcon style={{ fontSize: 16 }} onClick={handleToggleNewPasswordVisibility} />
                    )}
                  </InputAdornment>
                )
              }} />
            <RHFTextField name="confirmedPassword" type={confirmPasswordVisible ? "text" : "password"} label="Confirmed Password" id="confirmedPassword" sx={{ mb: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {!confirmPasswordVisible ? (
                      <VisibilityOffIcon style={{ fontSize: 16 }} onClick={handleToggleConfirmPasswordVisibility} />
                    ) : (
                      <VisibilityIcon style={{ fontSize: 16 }} onClick={handleToggleConfirmPasswordVisibility} />
                    )}
                  </InputAdornment>
                )
              }} />
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <div>
                <LoadingButton
                  type="submit"
                  variant="contained" style={{ width: 150 }}
                  loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </div>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
