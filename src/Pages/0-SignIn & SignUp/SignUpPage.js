import {Box, Link, Stack, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import welcomeImg from "./welcome3.png";
import Image from "mui-image";
import InputAdornment from "@mui/material/InputAdornment";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import FormProvider, {RHFTextField} from "../../third-party/components/hook-form";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signupThunk} from "../../redux/users/users-thunks";
import {Helmet} from "react-helmet";

const SignUpPage = () => {

  // ---- handle the new post object ---
  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // validation schema
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Please enter a valid nickname'),
    email: Yup.string().required('Please enter a valid email'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Please confirm your password'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  // ---- handle the form submission ----
  const {handleSubmit, setValue} = methods;

  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentUser, error} = useSelector((state) => state.auth);

    useEffect(() => {
        if (currentUser) {
            enqueueSnackbar('Successfully created your account!');
            navigate("../parcels");
        }
        if (error && error.message === "Request failed with status code 409") {
            alert("User with same email already exists, please use another email address");
        }
    }, [currentUser, error]);

  const onSubmit = (data) => {
      data = {
          ...data,
          role: 'buyer'
      };
      dispatch(signupThunk(data));
  };

  // ---- handle the password visibility ----
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
        <Helmet>
            <title>Sign Up | ShipShare</title>
        </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'space-between',
          top: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
          height:'100%',
        }}
      >
        {/*----------------- left -----------------*/}
        <Box
          sx={{
            width: '60%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            position: 'relative',
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Stack
              spacing={3}
              sx={{
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <Typography variant="h3">
                  Create Your Account
                </Typography>
              </Box>
              <RHFTextField fullWidth={true} name="name" variant="filled" id="name" placeholder="NICKNAME"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_146_2154)">
                                      <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M11.5 2.15576C8.12763 2.15576 5.39026 4.89312 5.39026 8.2655C5.39026 11.6379 8.12763 14.3752 11.5 14.3752C14.8724 14.3752 17.6097 11.6379 17.6097 8.2655C17.6097 4.89312 14.8724 2.15576 11.5 2.15576ZM11.5 3.59398C14.0789 3.59398 16.1715 5.68662 16.1715 8.2655C16.1715 10.8444 14.0789 12.937 11.5 12.937C8.92113 12.937 6.82849 10.8444 6.82849 8.2655C6.82849 5.68662 8.92113 3.59398 11.5 3.59398Z"
                                            fill="#C2C3CB"/>
                                      <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M7.80958 13.1321C5.30293 14.4593 3.59412 17.0942 3.59412 20.1249C3.59412 20.5216 3.27175 20.844 2.875 20.844C2.47825 20.844 2.15588 20.5216 2.15588 20.1249C2.15588 16.3568 4.39085 13.1063 7.6069 11.6292C7.86673 11.5106 8.17291 11.5559 8.38638 11.7467C9.2133 12.4874 10.3044 12.937 11.5 12.937C12.6956 12.937 13.7867 12.4874 14.6136 11.7467C14.8271 11.5559 15.1333 11.5106 15.3931 11.6292C18.6091 13.1063 20.8441 16.3568 20.8441 20.1249C20.8441 20.5216 20.5218 20.844 20.125 20.844C19.7283 20.844 19.4059 20.5216 19.4059 20.1249C19.4059 17.0942 17.6971 14.4593 15.1904 13.1321C14.1662 13.9116 12.8865 14.3752 11.5 14.3752C10.1135 14.3752 8.83379 13.9116 7.80958 13.1321Z"
                                            fill="#C2C3CB"/>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_146_2154">
                                        <rect width="23" height="23" fill="white"/>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </InputAdornment>
                              )
                            }}/>
              <RHFTextField fullWidth={true} name="email" variant="filled" id="email" placeholder="EMAIL"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <svg width="23" height="19" viewBox="0 0 23 19" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M0.578368 5.38426C0.241547 8.37322 0.256561 11.8205 0.725252 14.7973C0.984589 16.4444 2.39211 17.7072 4.12953 17.8514L5.94531 18.0022C9.73146 18.3165 13.539 18.3165 17.3252 18.0022L19.141 17.8514C20.8784 17.7072 22.2859 16.4444 22.5452 14.7973C23.0139 11.8204 23.029 8.37341 22.6921 5.38444C22.6486 5.03792 22.5996 4.69187 22.5452 4.3464C22.2859 2.69926 20.8784 1.43652 19.141 1.29227L17.3252 1.14152C13.539 0.827176 9.73146 0.827176 5.94531 1.14152L4.12953 1.29227C2.3921 1.43652 0.984589 2.69926 0.725252 4.3464C0.670868 4.69181 0.621907 5.0378 0.578368 5.38426ZM6.10149 2.85753C9.78372 2.55181 13.4868 2.55181 17.169 2.85752L18.9848 3.00828C19.8917 3.08358 20.6264 3.74273 20.7618 4.60254C20.7759 4.69183 20.7895 4.78116 20.8028 4.87053L14.1168 8.4182C12.5735 9.23708 10.6969 9.23708 9.15364 8.4182L2.46764 4.87057C2.48093 4.78119 2.49461 4.69184 2.50867 4.60254C2.64405 3.74273 3.37877 3.08358 4.28572 3.00828L6.10149 2.85753ZM21.0235 6.72388C21.2567 9.32798 21.1695 11.9517 20.7618 14.5411C20.6264 15.4009 19.8917 16.0601 18.9848 16.1354L17.169 16.2861C13.4868 16.5919 9.78372 16.5919 6.10149 16.2861L4.28572 16.1354C3.37878 16.0601 2.64405 15.4009 2.50867 14.5411C2.10098 11.9517 2.01374 9.32801 2.24695 6.72392L8.2778 9.92392C10.3658 11.0318 12.9046 11.0318 14.9926 9.92392L21.0235 6.72388Z"
                                          fill="#C2C3CB"/>
                                  </svg>
                                </InputAdornment>
                              )
                            }}/>
              <RHFTextField type={passwordVisible ? "text" : "password"} fullWidth={true} name="password" variant="filled" id="password"
                            placeholder="PASSWORD"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <svg width="19" height="24" viewBox="0 0 19 24" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M7.68486 16.9635C7.68486 15.9472 8.50872 15.1233 9.525 15.1233C10.5413 15.1233 11.3651 15.9472 11.3651 16.9635C11.3651 17.9797 10.5413 18.8036 9.525 18.8036C8.50872 18.8036 7.68486 17.9797 7.68486 16.9635Z"
                                      fill="#C2C3CB"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M4.15381 10.3355L3.76684 6.8527C3.71723 6.40619 3.71723 5.95555 3.76684 5.50904L3.79477 5.25768C4.09102 2.59145 6.18707 0.481839 8.85133 0.168396C9.29888 0.115743 9.75106 0.115743 10.1986 0.168396C12.8629 0.481839 14.9589 2.59145 15.2552 5.25768L15.2831 5.50904C15.3327 5.95555 15.3327 6.40619 15.2831 6.8527L14.8961 10.3354L15.7384 10.4027C17.0667 10.5087 18.1513 11.5072 18.3666 12.8221C18.8157 15.5648 18.8157 18.3622 18.3666 21.1048C18.1513 22.4197 17.0667 23.4182 15.7384 23.5242L13.903 23.6708C10.989 23.9034 8.06106 23.9034 5.14704 23.6708L3.31164 23.5242C1.98339 23.4182 0.898807 22.4197 0.683492 21.1048C0.234409 18.3622 0.234409 15.5648 0.683492 12.8221C0.898807 11.5072 1.98339 10.5087 3.31164 10.4027L4.15381 10.3355ZM9.06633 1.99593C9.37104 1.96009 9.6789 1.96009 9.98361 1.99593C11.7975 2.20934 13.2246 3.64563 13.4263 5.46089L13.4542 5.71225C13.4888 6.02371 13.4888 6.33804 13.4542 6.64949L13.0602 10.1954C10.7058 10.0438 8.34412 10.0438 5.98972 10.1954L5.59573 6.64949C5.56112 6.33804 5.56112 6.02371 5.59573 5.71225L5.62366 5.46089C5.82535 3.64563 7.25241 2.20934 9.06633 1.99593ZM13.7566 12.0905C10.94 11.8656 8.11003 11.8656 5.29347 12.0905L3.45808 12.237C2.97359 12.2757 2.57799 12.6399 2.49945 13.1195C2.08261 15.6652 2.08261 18.2617 2.49945 20.8074C2.57799 21.2871 2.97359 21.6513 3.45808 21.6899L5.29347 21.8365C8.11003 22.0613 10.94 22.0613 13.7566 21.8365L15.592 21.6899C16.0765 21.6513 16.4721 21.2871 16.5506 20.8074C16.9675 18.2617 16.9675 15.6652 16.5506 13.1195C16.4721 12.6399 16.0765 12.2757 15.592 12.237L13.7566 12.0905Z"
                                          fill="#C2C3CB"/>
                                  </svg>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {!passwordVisible ? (
                                    <VisibilityOffIcon onClick={handleTogglePasswordVisibility} />
                                  ) : (
                                    <VisibilityIcon onClick={handleTogglePasswordVisibility} />
                                  )}
                                </InputAdornment>
                              )
                            }}/>
              <RHFTextField type={passwordVisible ? "text" : "password"} fullWidth={true} name="confirmPassword" variant="filled"
                            id="confirmPassword"
                            placeholder="CONFIRM PASSWORD"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <svg width="19" height="24" viewBox="0 0 19 24" fill="none"
                                       xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M7.68486 16.9635C7.68486 15.9472 8.50872 15.1233 9.525 15.1233C10.5413 15.1233 11.3651 15.9472 11.3651 16.9635C11.3651 17.9797 10.5413 18.8036 9.525 18.8036C8.50872 18.8036 7.68486 17.9797 7.68486 16.9635Z"
                                      fill="#C2C3CB"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M4.15381 10.3355L3.76684 6.8527C3.71723 6.40619 3.71723 5.95555 3.76684 5.50904L3.79477 5.25768C4.09102 2.59145 6.18707 0.481839 8.85133 0.168396C9.29888 0.115743 9.75106 0.115743 10.1986 0.168396C12.8629 0.481839 14.9589 2.59145 15.2552 5.25768L15.2831 5.50904C15.3327 5.95555 15.3327 6.40619 15.2831 6.8527L14.8961 10.3354L15.7384 10.4027C17.0667 10.5087 18.1513 11.5072 18.3666 12.8221C18.8157 15.5648 18.8157 18.3622 18.3666 21.1048C18.1513 22.4197 17.0667 23.4182 15.7384 23.5242L13.903 23.6708C10.989 23.9034 8.06106 23.9034 5.14704 23.6708L3.31164 23.5242C1.98339 23.4182 0.898807 22.4197 0.683492 21.1048C0.234409 18.3622 0.234409 15.5648 0.683492 12.8221C0.898807 11.5072 1.98339 10.5087 3.31164 10.4027L4.15381 10.3355ZM9.06633 1.99593C9.37104 1.96009 9.6789 1.96009 9.98361 1.99593C11.7975 2.20934 13.2246 3.64563 13.4263 5.46089L13.4542 5.71225C13.4888 6.02371 13.4888 6.33804 13.4542 6.64949L13.0602 10.1954C10.7058 10.0438 8.34412 10.0438 5.98972 10.1954L5.59573 6.64949C5.56112 6.33804 5.56112 6.02371 5.59573 5.71225L5.62366 5.46089C5.82535 3.64563 7.25241 2.20934 9.06633 1.99593ZM13.7566 12.0905C10.94 11.8656 8.11003 11.8656 5.29347 12.0905L3.45808 12.237C2.97359 12.2757 2.57799 12.6399 2.49945 13.1195C2.08261 15.6652 2.08261 18.2617 2.49945 20.8074C2.57799 21.2871 2.97359 21.6513 3.45808 21.6899L5.29347 21.8365C8.11003 22.0613 10.94 22.0613 13.7566 21.8365L15.592 21.6899C16.0765 21.6513 16.4721 21.2871 16.5506 20.8074C16.9675 18.2617 16.9675 15.6652 16.5506 13.1195C16.4721 12.6399 16.0765 12.2757 15.592 12.237L13.7566 12.0905Z"
                                          fill="#C2C3CB"/>
                                  </svg>
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {!passwordVisible ? (
                                    <VisibilityOffIcon onClick={handleTogglePasswordVisibility} />
                                  ) : (
                                    <VisibilityIcon onClick={handleTogglePasswordVisibility} />
                                  )}
                                </InputAdornment>
                              )
                            }}/>

              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                size="large"
                sx={{height: 50}}
                type={"submit"}
              >Sign Up</Button>
              <Box>
                <Typography style={{textAlign: 'center'}}>
                  Already have an account? <Link href="../login" underline="hover">Log In</Link>
                </Typography>
              </Box>

            </Stack>
          </FormProvider>
        </Box>


        {/*----------------- right -----------------*/}
        <Box
          sx={{
            width: '40%',
            height:"100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={welcomeImg}
            alt="welcome"
            sx={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              boxShadow: 1,
            }}
          />
        </Box>

      </Box>

    </>
  );
};


export default SignUpPage;