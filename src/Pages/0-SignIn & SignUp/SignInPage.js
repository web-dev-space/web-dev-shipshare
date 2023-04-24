import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider, { RHFTextField } from "@mui-library/components/hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { Box, Link, Stack, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import Image from "mui-image";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginThunk } from 'redux/users/users-thunks';
import * as Yup from "yup";
import "./signIn.css";
import welcomeImg from "./welcome.png";
const LoginPage = () => {

  // ---- handle the new user object ---
  const defaultValues = {
    email: '',
    password: '',
  };

  const {currentUser, error} = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
        enqueueSnackbar('Welcome to ShipShare!');
        const role = currentUser.role;
        if (role === 'admin') {
            navigate('/home');
        }
        else if (role === 'buyer') {
            navigate('/home');
        }
        else if (role === 'merchant') {
            navigate('/home');
        }
    } else if (error) {
        if (error.message.indexOf('403') !== -1) {
            alert("Your account is banned. Please contact the administrator for more information.");
        } else {
            alert("Invalid email or password");
        }
    }
  }, [currentUser, error]);

  // validation schema
  const NewUserSchema = Yup.object().shape({
    email: Yup.string().required('Please enter a valid email'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
      handleSubmit,
      setValue,
      formState: { isSubmitting }
  }
  = methods;

    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = async(data) => {
        await dispatch(loginThunk(data))
    };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // control layout
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 900);

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth > 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    const logo = (
        <Box
            component="img"
            src="/logo/shipshare-logo.svg"
            style={{width: 140}}
        />
    );

  return (
    <>
        <Helmet>
            <title>Sign In | ShipShare</title>
        </Helmet>
        {/*-----------Logo Img---------------*/}
        <Box style={{marginTop: 16, marginLeft: 16}}>
            <Button style={{zIndex: 999}} onClick={()=> navigate("/home")}>
                {logo}
            </Button>
        </Box>
        {/* ------ main content -------- */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isWideScreen ? 'row' : 'column',
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

        {!isWideScreen && <img src={welcomeImg} alt="welcome" style={{width:'100%', height:'100%', objectFit: 'cover', filter: 'blur(5px)'}} />}

        {/*----------------- left -----------------*/}
        <Box
          sx={{
            width: isWideScreen ? '50%' : '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            position: isWideScreen? 'relative': 'absolute',
            zIndex:1,
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

            <Stack
              spacing={3}
              sx={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '10px',
                paddingX: '5vw',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  marginTop: '5vh',
                }}>
                <Typography variant="h3">
                  Sign In To Shipshare
                </Typography>
              </Box>

                <RHFTextField fullWidth={true} name="email" variant="outlined" id="email" placeholder="EMAIL"
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
                <RHFTextField type={passwordVisible ? "text" : "password"} fullWidth={true} name="password" variant="outlined" id="password"
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

              <LoadingButton
                variant="contained"
                color="primary"
                fullWidth={true}
                size="large"
                sx={{height: 55}}
                type="submit"
                loading={isSubmitting}>
                  Sign In
              </LoadingButton>
              <Box>
                <Typography style={{textAlign: 'center', marginBottom: '5vh'}} >
                  New to ShipShare?<Link href="../register" underline="hover" style={{marginLeft: 6}}>Sign Up</Link>
                </Typography>
              </Box>

            </Stack>
          </FormProvider>
        </Box>


        {/*----------------- right -----------------*/}
        {isWideScreen &&
          <Box
            sx={{
              width: '50%',
              height: "100%",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            maxWidth={900}
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
        }


      </Box>

    </>

  )
    ;
};


export default LoginPage;