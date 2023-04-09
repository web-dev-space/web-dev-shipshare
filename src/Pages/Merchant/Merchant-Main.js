import { useState } from "react";
import Header from "../../third-party/layouts/dashboard/header"
import NavVertical from "../../third-party/layouts/dashboard/nav/NavVertical"
import Main from "../../../third-party/layouts/dashboard/Main"
import { Container, Typography, Box } from '@mui/material';
import InputCard from "../../components/InputCard"
import Button from "@mui/material/Button";
import {Add as AddIcon} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import SearchBar from "../../../components/searchBar";
import GreenChipGroup from "../../../components/GreenChipGroup";
import PostCard from "./post-components/PostCard";
import backgroundImg from "../../3-Groups/background.jpg";
import Image from "mui-image";
import {Pagination} from "@mui/lab";

const chipLabelsArray = ["Latest", "Popular"];

const examplePosts = [{
	title: "ShipShare is the Best Shipping Platform!",
	post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
	author: "Joe Doe",
	date: new Date("2021-08-01"),
	image: "https://source.unsplash.com/random",
	commentsNumber: 1910,
	viewsNumber: 8820,
	repostsNumber: 7460,
},
	{
		title: "ShipShare is the Best Shipping Platform!",
		post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
		author: "Joe Doe",
		date: new Date("2021-08-01"),
		image: "https://source.unsplash.com/random",
		commentsNumber: 1910,
		viewsNumber: 8820,
		repostsNumber: 7460,
	},
	{
		title: "ShipShare is the Best Shipping Platform!",
		post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
		author: "Joe Doe",
		date: new Date("2021-08-01"),
		image: "https://source.unsplash.com/random",
		commentsNumber: 1910,
		viewsNumber: 8820,
		repostsNumber: 7460,
	},
	{
		title: "ShipShare is the Best Shipping Platform!",
		post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
		author: "Joe Doe",
		date: new Date("2021-08-01"),
		image: "https://source.unsplash.com/random",
		commentsNumber: 1910,
		viewsNumber: 8820,
		repostsNumber: 7460,
	},
	{
		title: "ShipShare is the Best Shipping Platform!",
		post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...",
		author: "Joe Doe",
		date: new Date("2021-08-01"),
		image: "https://source.unsplash.com/random",
		commentsNumber: 1910,
		viewsNumber: 8820,
		repostsNumber: 7460,
	},

];

const Discover = () => {
	const MAX_SIZE_PER_PAGE = 10;
	const [open, setOpen] = useState(false);

	const [focusChip, setFocusChip] = useState('Latest');
	const [filter, setFilter] = useState('All');
	const [posts, setPosts] = useState(examplePosts);
	const [page, setPage] = useState(1);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handlePaginationChange = (event, page) => {
		console.log(page);
	};

	return (
		<>
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
					<Container maxWidth={false}>

						<Image
							src={backgroundImg}
							style={{borderRadius: 20,
								height: 250,
							}}
							sx={{
								width: '100%',
								zIndex: 1,
								left: 0,
								right: 0,
								// mr: 5,
								position: 'absolute',
							}}
						/>
						<div style={{height:28}}/>

						{/*--------------Title----------------------*/}
						<Stack
							width='100%'
							direction="row"
							justifyContent="space-between"
						>
							<Typography variant="h3" component="h1" paragraph>
								Discover
							</Typography>
							<Button variant="contained"
											color="primary"
											startIcon={<AddIcon />}
											style={{height:44}}
											href="/community/discover/create-new-post"
							>
								New Post
							</Button>
						</Stack>


						{/*--------------Search Bar Row----------------------*/}
						<Stack
							width='100%'
							direction="row"
							justifyContent="space-between"
							flexWrap="wrap"
						>
							{/*---Search Bar---*/}
							<SearchBar
								searchText="Search by Post Title"
								width={360}
								height={48}
							/>
							{/*---NewPost---*/}
							<GreenChipGroup chipLabelsArray={chipLabelsArray}
															focusChip={focusChip}
															setFilter={setFilter}
															setFocusChip={setFocusChip}/>
						</Stack>

						<div style={{height:30}}/>

						{/*---Post Cards---*/}
						<div style={{
							display: 'flex',
							flexDirection:'column',
							gap: 16 }}>
							{examplePosts.map((examplePost) => (
								<PostCard
									title={examplePost.title}
									post={examplePost.post}
									author={examplePost.author}
									date={examplePost.date}
									image={examplePost.image}
									commentsNumber={examplePost.commentsNumber}
									viewsNumber={examplePost.viewsNumber}
									repostsNumber={examplePost.repostsNumber} />
							))}
						</div>

						{/*---Pagination---*/}
						<div style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: 100,
						}}>
							<Pagination count={10}
													onChange={handlePaginationChange}
							/>
						</div>
					</Container>
				</Main>
				{/*------------------------------------*/}
			</Box>
		</>
	);
};
export default Discover;