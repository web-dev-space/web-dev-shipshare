import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '@mui-library/utils/formatNumber';
// components
import { uploadImage, urlToFile } from "api/imageUpload.js";
import { useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import FormProvider, {
	RHFTextField,
	RHFUploadAvatar,
} from '@mui-library/components/hook-form';
import Label from '@mui-library/components/label';
import { updateCurrentUserThunk } from "redux/users/users-thunks";
import { getRandomAvatar } from "utils/getRandomAvatar";
import RHFTextFieldGoogle from "Pages/Buyer/3-Groups/RHFTextFieldGoogle";

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
	isEdit: PropTypes.bool,
	currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const NewUserSchema = Yup.object().shape({
		name: Yup.string().required('Name is required'),
		phone: Yup.string().required('Phone number is required'),
		address: Yup.string().required('Address is required'),
		avatar: Yup.string().required('Avatar is required'),
	});

	const defaultValues = useMemo(
		() => ({
			name: currentUser?.name || '',
			email: currentUser?.email || '',
			phone: currentUser?.phone || '',
			address: currentUser?.address || '',
			avatar: currentUser?.avatar || getRandomAvatar(currentUser?.name || ''),
			role: currentUser?.role || 'Buyer',
			_id: currentUser?._id || '',
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentUser]
	);

	const methods = useForm({
		resolver: yupResolver(NewUserSchema),
		defaultValues,
	});

	const handleAddressChange = (d) => {
		const values = methods.getValues();
		setValue("address", { ...values.address, address: d });
	};

	const {
		reset,
		watch,
		control,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const [newFile, setNewFile] = useState({
		preview: defaultValues.avatar,
	});

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
	const onSubmit = async (data) => {
		data = {
			...data,
		}
		console.log("data: ", data);
		try {
			// await new Promise((resolve) => setTimeout(resolve, 500));
			const file = await urlToFile(newFile);
			const imageRemoteUrl = await uploadImage(file);
			data = {
				...data,
				avatar: imageRemoteUrl,
			}
			dispatch(updateCurrentUserThunk(data));

			console.log("imageRemoteUrl: " + imageRemoteUrl);

			reset();
			enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
			navigate("./");
		} catch (error) {
			console.error(error);
		}
	};

	const onCancel = () => {
		reset();
	}

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			const newFile = Object.assign(file, {
				preview: URL.createObjectURL(file),
			});

			if (file) {
				setValue('avatar', newFile.preview, { shouldValidate: true });
				setNewFile(newFile.preview);
			}
		},
		[setValue]
	);

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

						<Box sx={{ mb: 4, mt: 3 }}>
							<RHFUploadAvatar
								name="avatar"
								maxSize={3145728}
								// file={defaultValues.avatar}
								onDrop={handleDrop}
								helperText={
									<Typography
										variant="caption"
										sx={{
											mt: 2,
											mx: 'auto',
											display: 'block',
											textAlign: 'center',
											color: 'text.secondary',
										}}
									>
										Allowed *.jpeg, *.jpg, *.png, *.gif
										<br /> max size of {fData(3145728)}
									</Typography>
								}
							/>
						</Box>

					</Card>
				</Grid>

				<Grid item xs={12} md={8}>
					<Card sx={{ p: 3 }}>
						<RHFTextField name="name" label="Full Name" id="name" style={{ marginBottom: 20 }} />
						<RHFTextField name="phone" label="Phone Number" id="phone" style={{ marginBottom: 20 }} />
						{/*<RHFTextField name="address" label="Address" id="address" style={{ marginBottom: 25 }} />*/}
						<RHFTextFieldGoogle
							required
							style={{ marginBottom: 25 }}
							fullWidth={true}
							name="address"
							id="address"
							label="Address"
							placeholder={'e.g. 909 Kifer Rd, Sunnyvale, CA 94086, USA'}
							onChange={(location) => handleAddressChange(location)}
						/>

						<Stack alignItems="flex-end" sx={{ mt: 3 }}>
							<div>
								<LoadingButton type="submit" variant="contained" loading={isSubmitting} style={{ width: 150 }}>
									{!isEdit ? 'Create User' : 'Save Changes'}
								</LoadingButton>
							</div>
						</Stack>
					</Card>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
