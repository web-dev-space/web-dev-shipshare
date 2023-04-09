import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Header from "../../../third-party/layouts/dashboard/header";
import {useState} from "react";
import NavVertical from "../../../third-party/layouts/dashboard/nav/NavVertical";
import Main from "../../../third-party/layouts/dashboard/Main"
import {Card, CardContent, Grid} from "@mui/material";
import TextField from '@mui/material/TextField';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {CardActions} from "@mui/material";
import CheckoutStepTwo from "./Checkout-StepTwo";
import CheckoutStepOne from "./Checkout-StepOne";

// const steps = ['Choose a Route', 'Enter Group Details', 'Done'];
const steps = ['', '', '', ''];
export default function Checkout() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Header onOpenNav={handleOpen}/>
			{/*-------Box is the layout of the whole page-----*/}
			<Box
				sx={{
					display: {lg: 'flex'},
					minHeight: {lg: 1},
				}}
			>
				{/*--------------Navigation bar------------------*/}
				<NavVertical openNav={open} onCloseNav={handleClose}/>
				<Main>
					<Box sx={{width: '100%', alignItems: 'center'}}>
						<Stepper
							activeStep={activeStep}
							sx={{
								width: '50%',
								marginLeft: 'auto',
								marginRight: 'auto',
								display: 'flex',
								justifyContent: 'center',
								mb: 5,
							}}
						>
							{steps.map((label, index) => {
								const stepProps = {};
								const labelProps = {};
								// if (isStepOptional(index)) {
								//   labelProps.optional = (
								//     <Typography variant="caption">Optional</Typography>
								//   );
								// }
								// if (isStepSkipped(index)) {
								//   stepProps.completed = false;
								// }
								return (
									<Step key={label} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography sx={{mt: 2, mb: 1}}>
									All steps completed - you&apos;re finished
								</Typography>
								<Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
									<Box sx={{flex: '1 1 auto'}}/>
									<Button onClick={handleReset}>Reset</Button>
								</Box>
							</React.Fragment>
						) : (
							<React.Fragment>

								{/*Body content*/}

								{/*page 1*/}
								{activeStep === 0 ? (
									<CheckoutStepOne />
								) : (
									<React.Fragment>

									</React.Fragment>
								)}

								{/*page 2*/}
								{activeStep === 1 ? (
									<CheckoutStepTwo />
								) : (
									<React.Fragment>
									</React.Fragment>
								)}

								{/*page 3*/}
								{activeStep === 2 ? (
									<>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												mb: 5,
											}}
										>
											<Typography
												variant="h3"
											>Scan to Pay</Typography>
											<Box
												sx={{
													width: '35%',
													alignItems: 'center',
													flexDirection: 'column',
													display: 'flex',
												}}
											>
												<div>
													<Typography
														variant="caption" style={{color: '#C2C0C0'}}
													>Please scan the Venmo code for payment
													</Typography>
												</div>
												<div>
													<Typography
														variant="caption" style={{color: '#C2C0C0'}}
													>and note that we will verify the payment
													</Typography>
												</div>
												<div>
													<Typography
														variant="caption" style={{color: '#C2C0C0'}}
													>before continuing with the process.
													</Typography>
												</div>
											</Box>
										</Box>
										<Box
											sx={{
												alignItems: 'center',
												flexDirection: 'column',
												display: 'flex',
											}}>
											<div>
												<img src={require('./qrcode.png')} alt="venmo" style={{width: '100%'}}/>
											</div>
										</Box>
									</>
								) : (
									<React.Fragment>

									</React.Fragment>
								)}

								{/*page 4*/}
								{activeStep === 3 ? (
									<>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												mb: 5,
											}}
										>
											<Typography
												variant="h3"
											>Order Success</Typography>
											<Box
												sx={{
													width: '35%',
													alignItems: 'center',
													flexDirection: 'column',
													display: 'flex',
												}}
											>
												<div>
													<Typography
														variant="caption" style={{color: '#C2C0C0'}}
													>After we verify your payment,
													</Typography>
												</div>
												<div>
													<Typography
														variant="caption" style={{color: '#C2C0C0'}}
													>we will prepare for the shipment.
													</Typography>
												</div>
												<div>
													<Typography
														variant="caption" style={{color: '#C2C0C0'}}
													>Thanks for your order.
													</Typography>
												</div>
											</Box>
										</Box>
										<Box
											sx={{
												alignItems: 'center',
												flexDirection: 'column',
												display: 'flex',
											}}>
											<div>
												<svg width="397" height="298" viewBox="0 0 397 298" fill="none"
														 xmlns="http://www.w3.org/2000/svg">
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M387.5 270C392.747 270 397 265.747 397 260.5C397 255.253 392.747 251 387.5 251C382.253 251 378 255.253 378 260.5C378 265.747 382.253 270 387.5 270Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M9.5 143C14.7467 143 19 138.747 19 133.5C19 128.253 14.7467 124 9.5 124C4.25329 124 0 128.253 0 133.5C0 138.747 4.25329 143 9.5 143Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M325.5 251C327.985 251 330 248.985 330 246.5C330 244.015 327.985 242 325.5 242C323.015 242 321 244.015 321 246.5C321 248.985 323.015 251 325.5 251Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M338.5 222C340.433 222 342 220.433 342 218.5C342 216.567 340.433 215 338.5 215C336.567 215 335 216.567 335 218.5C335 220.433 336.567 222 338.5 222Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M331.5 179C333.433 179 335 177.433 335 175.5C335 173.567 333.433 172 331.5 172C329.567 172 328 173.567 328 175.5C328 177.433 329.567 179 331.5 179Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M301 239C302.657 239 304 237.657 304 236C304 234.343 302.657 233 301 233C299.343 233 298 234.343 298 236C298 237.657 299.343 239 301 239Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M282 282C283.105 282 284 281.105 284 280C284 278.895 283.105 278 282 278C280.895 278 280 278.895 280 280C280 281.105 280.895 282 282 282Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M293 108C294.105 108 295 107.105 295 106C295 104.895 294.105 104 293 104C291.895 104 291 104.895 291 106C291 107.105 291.895 108 293 108Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M373 141C374.105 141 375 140.105 375 139C375 137.895 374.105 137 373 137C371.895 137 371 137.895 371 139C371 140.105 371.895 141 373 141Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M230 77C231.105 77 232 76.1046 232 75C232 73.8954 231.105 73 230 73C228.895 73 228 73.8954 228 75C228 76.1046 228.895 77 230 77Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M152.5 79C154.433 79 156 77.433 156 75.5C156 73.567 154.433 72 152.5 72C150.567 72 149 73.567 149 75.5C149 77.433 150.567 79 152.5 79Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M76 81C78.7614 81 81 78.7614 81 76C81 73.2386 78.7614 71 76 71C73.2386 71 71 73.2386 71 76C71 78.7614 73.2386 81 76 81Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M114.5 62C116.433 62 118 60.433 118 58.5C118 56.567 116.433 55 114.5 55C112.567 55 111 56.567 111 58.5C111 60.433 112.567 62 114.5 62Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M43 26C44.6569 26 46 24.6569 46 23C46 21.3431 44.6569 20 43 20C41.3431 20 40 21.3431 40 23C40 24.6569 41.3431 26 43 26Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M56 175C57.6569 175 59 173.657 59 172C59 170.343 57.6569 169 56 169C54.3431 169 53 170.343 53 172C53 173.657 54.3431 175 56 175Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M99 245C100.657 245 102 243.657 102 242C102 240.343 100.657 239 99 239C97.3431 239 96 240.343 96 242C96 243.657 97.3431 245 99 245Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M53 298C55.7614 298 58 295.761 58 293C58 290.239 55.7614 288 53 288C50.2386 288 48 290.239 48 293C48 295.761 50.2386 298 53 298Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M151 298C152.657 298 154 296.657 154 295C154 293.343 152.657 292 151 292C149.343 292 148 293.343 148 295C148 296.657 149.343 298 151 298Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M63 225C64.1046 225 65 224.105 65 223C65 221.895 64.1046 221 63 221C61.8954 221 61 221.895 61 223C61 224.105 61.8954 225 63 225Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M209 57C211.761 57 214 54.7614 214 52C214 49.2386 211.761 47 209 47C206.239 47 204 49.2386 204 52C204 54.7614 206.239 57 209 57Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M199 10C201.761 10 204 7.76142 204 5C204 2.23858 201.761 0 199 0C196.239 0 194 2.23858 194 5C194 7.76142 196.239 10 199 10Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M231.5 26C233.433 26 235 24.433 235 22.5C235 20.567 233.433 19 231.5 19C229.567 19 228 20.567 228 22.5C228 24.433 229.567 26 231.5 26Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M322.5 51C324.433 51 326 49.433 326 47.5C326 45.567 324.433 44 322.5 44C320.567 44 319 45.567 319 47.5C319 49.433 320.567 51 322.5 51Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M311 83C312.657 83 314 81.6569 314 80C314 78.3431 312.657 77 311 77C309.343 77 308 78.3431 308 80C308 81.6569 309.343 83 311 83Z"
																fill="#A9D250"/>
													<path fill-rule="evenodd" clip-rule="evenodd"
																d="M370 124C371.657 124 373 122.657 373 121C373 119.343 371.657 118 370 118C368.343 118 367 119.343 367 121C367 122.657 368.343 124 370 124Z"
																fill="#A9D250"/>
													<g filter="url(#filter0_d_0_1)">
														<path fill-rule="evenodd" clip-rule="evenodd"
																	d="M198.5 250C244.616 250 282 212.616 282 166.5C282 120.384 244.616 83 198.5 83C152.384 83 115 120.384 115 166.5C115 212.616 152.384 250 198.5 250Z"
																	fill="#EBF4D6"/>
													</g>
													<path
														d="M270 166.5C270 205.988 237.988 238 198.5 238C159.012 238 127 205.988 127 166.5C127 127.012 159.012 95 198.5 95C237.988 95 270 127.012 270 166.5Z"
														fill="#80B213" stroke="white" stroke-width="8" stroke-linejoin="round"/>
													<path d="M174 165.443L191.279 183L224 151" stroke="white" stroke-width="9.19206"
																stroke-linecap="round" stroke-linejoin="round"/>
													<defs>
														<filter id="filter0_d_0_1" x="95" y="83" width="207" height="207"
																		filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
															<feFlood flood-opacity="0" result="BackgroundImageFix"/>
															<feColorMatrix in="SourceAlpha" type="matrix"
																						 values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
															<feOffset dy="20"/>
															<feGaussianBlur stdDeviation="10"/>
															<feColorMatrix type="matrix"
																						 values="0 0 0 0 0.843137 0 0 0 0 0.843137 0 0 0 0 0.843137 0 0 0 0.236533 0"/>
															<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
															<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
														</filter>
													</defs>
												</svg>
											</div>
										</Box>
									</>
								) : (
									<React.Fragment>

									</React.Fragment>
								)}


								<Box sx={{display: 'flex', flexDirection: 'row', pt: 2, ml: 10, mr: 10}}>
									<Button
										color="inherit"
										disabled={activeStep === 0}
										onClick={handleBack}
										sx={{mr: 1}}
									>
										Back
									</Button>
									<Box sx={{flex: '1 1 auto'}}/>
									{/*{isStepOptional(activeStep) && (*/}
									{/*  <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>*/}
									{/*    Skip*/}
									{/*  </Button>*/}
									{/*)}*/}

									<Button onClick={handleNext}>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</Box>
							</React.Fragment>
						)}
					</Box>
				</Main>
			</Box>
		</>
	);
}