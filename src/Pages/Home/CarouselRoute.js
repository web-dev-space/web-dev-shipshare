import Carousel, { CarouselArrows } from "@mui-library/components/carousel";
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RouteCard from "Pages/Home/RouteCard";
import PropTypes from 'prop-types';
import { useRef } from 'react';



const routes = [
  {
    route: 'Air - Sensitive',
    price: '$20',
    text1: 'Enjoy the fastest delivery!',
    text2: "You can also ship sensitive products.",
    trait1: 'Faster Delivery (2 weeks)',
    trait2: 'Accepts sensitive items',
    trait3: '',
  },
  {
    route: 'Air - Standard',
    price: '$15',
    text1: 'Enjoy the fast delivery!',
    text2: "Best choice for a ShipShare starter.",
    trait1: 'Fastest Delivery (1 weeks)',
    trait2: 'Suitable for normal items',
    trait3: '',
  },
  {
    route: 'Sea - Standard',
    price: '$5',
    text1: 'Not in hurry?',
    text2: "Enjoy the best price with this plan!",
    trait1: 'Lowest cost',
    trait2: 'Normally 4 weeks',
    trait3: 'Suitable for normal items',
  },
  {
    route: 'Sea - Sensitive',
    price: '$15',
    text1: 'Ship sensitive products with the ',
    text2: "best price!",
    trait1: 'Lower cost',
    trait2: 'Normally 6 weeks',
    trait3: 'Accepts sensitive items',
  },
];


CarouselRoute.propTypes = {
  data: PropTypes.array,
};


export default function CarouselRoute({data}){
  const carouselRef = useRef(null);
  const theme = useTheme();
  const carouselSettings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    // centerMode: true,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    infinite: false,
    responsive: [
      {
        breakpoint: 2400,
        settings: { slidesToShow: 4, slidesToScroll: 4 },
      },
      {
        breakpoint: 1800,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 1350,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };
  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrev}
        sx={{
          padding: '48px',
        }}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data.map((route, index) =>
            (<RouteCard
              index={index}
              route={route.route}
              price={route.price}
              text1={route.text1}
              text2={route.text2}
              trait1={route.trait1}
              trait2={route.trait2}
              trait3={route.trait3}
            />))
          }
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};

function CarouselItem({ item }) {
  const theme = useTheme();

  const { image, title } = item;

  return (
    <div>
      {routes.map((route, index) =>
        (<RouteCard
          index={index}
          route={route.route}
          price={route.price}
          text1={route.text1}
          text2={route.text2}
          trait1={route.trait1}
          trait2={route.trait2}
          trait3={route.trait3}
        />))
      }
    </div>
  );
}

