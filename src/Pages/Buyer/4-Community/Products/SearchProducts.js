import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Box, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../../../third-party/components/settings';
// sections
import Header from "../../../../third-party/layouts/dashboard/header";
import NavVertical from "../../../../third-party/layouts/dashboard/nav/NavVertical";
import {useState} from "react";
import Main from "../../../../third-party/layouts/dashboard/Main"
import {useDispatch} from "react-redux";
import {
  ShopProductList,
} from '../../../../third-party/e-commerce/shop';
import SearchBar from "../../../../components/searchBar";
import {getSearchResults} from "../../../../redux/products/products-service";

// ----------------------------------------------------------------------

export default function SearchProducts() {
    const { themeStretch } = useSettingsContext();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const dispatch = useDispatch();

    // ShopProductList params -- loading[bool], products[array]
    // Product attributes: id, name, picture, price
    const[products, setProducts] = useState([
        {
            "position": 1,
            "title": "Folgers Classic Roast Ground Coffee (51 oz.)-set of 4",
            "asin": "B08LSRJNGK",
            "link": "https://www.amazon.com/Folgers-Classic-Roast-Ground-Coffee/dp/B08LSRJNGK/ref=sr_1_5?keywords=coffee&qid=1681864189&sr=8-5",
            "availability": {
                "raw": "Only 10 left in stock - order soon."
            },
            "categories": [
                {
                    "name": "All Departments",
                    "id": "aps"
                }
            ],
            "image": "https://m.media-amazon.com/images/I/41fnhZpnW4L._AC_UL400_.jpg",
            "rating": 4.6,
            "ratings_total": 208,
            "prices": [
                {
                    "symbol": "$",
                    "value": 76.5,
                    "currency": "USD",
                    "raw": "$76.50",
                    "name": "$76.50",
                    "asin": "B08LSRJNGK",
                    "link": "https://www.amazon.com/Folgers-Classic-Roast-Ground-Coffee/dp/B08LSRJNGK/ref=sr_1_5?keywords=coffee&qid=1681864189&sr=8-5"
                }
            ],
            "price": {
                "symbol": "$",
                "value": 76.5,
                "currency": "USD",
                "raw": "$76.50",
                "name": "$76.50",
                "asin": "B08LSRJNGK",
                "link": "https://www.amazon.com/Folgers-Classic-Roast-Ground-Coffee/dp/B08LSRJNGK/ref=sr_1_5?keywords=coffee&qid=1681864189&sr=8-5"
            }
        },
        {
            "position": 2,
            "title": "Maxwell House Original Medium Roast Ground Coffee (30.6 oz Canister)",
            "asin": "B0084CO2W8",
            "link": "https://www.amazon.com/Maxwell-House-Coffee-Original-30-6-Ounce/dp/B0084CO2W8/ref=sr_1_6?keywords=coffee&qid=1681864189&sr=8-6",
            "categories": [
                {
                    "name": "All Departments",
                    "id": "aps"
                }
            ],
            "image": "https://m.media-amazon.com/images/I/91vtjaSnxyL._AC_UL400_.jpg",
            "amazons_choice": {
                "link": "https://www.amazon.com/Maxwell-House-Coffee-Original-30-6-Ounce/dp/B0084CO2W8/ref=ice_ac_b_dpb?keywords=coffee&qid=1681864189&sr=8-6",
                "keywords": "coffee"
            },
            "is_prime": true,
            "rating": 4.7,
            "ratings_total": 14954,
            "prices": [
                {
                    "symbol": "$",
                    "value": 9.36,
                    "currency": "USD",
                    "raw": "$9.36",
                    "name": "$9.36",
                    "is_primary": true
                },
                {
                    "symbol": "$",
                    "value": 9.96,
                    "currency": "USD",
                    "raw": "$9.96",
                    "name": "$9.36",
                    "is_rrp": true
                }
            ],
            "price": {
                "symbol": "$",
                "value": 9.36,
                "currency": "USD",
                "raw": "$9.36",
                "name": "$9.36",
                "is_primary": true
            }
        },
        {
            "position": 3,
            "title": "The Original Donut Shop Regular, Single-Serve Keurig K-Cup Pods, Medium Roast Coffee Pods, 24 Count (Pack of 4)",
            "asin": "B007TJGY6O",
            "link": "https://www.amazon.com/Donut-Shop-Regular-Portion-24-Count/dp/B007TJGY6O/ref=sr_1_7?keywords=coffee&qid=1681864189&sr=8-7",
            "categories": [
                {
                    "name": "All Departments",
                    "id": "aps"
                }
            ],
            "image": "https://m.media-amazon.com/images/I/81uwd-MUOnL._AC_UL400_.jpg",
            "is_prime": true,
            "rating": 4.7,
            "ratings_total": 74498,
            "prices": [
                {
                    "symbol": "$",
                    "value": 37.91,
                    "currency": "USD",
                    "raw": "$37.91",
                    "name": "$37.91",
                    "is_primary": true
                },
                {
                    "symbol": "$",
                    "value": 40.95,
                    "currency": "USD",
                    "raw": "$40.95",
                    "name": "$37.91",
                    "is_rrp": true
                }
            ],
            "price": {
                "symbol": "$",
                "value": 37.91,
                "currency": "USD",
                "raw": "$37.91",
                "name": "$37.91",
                "is_primary": true
            }
        },
        {
            "position": 4,
            "title": "AmazonFresh Organic Fair Trade Sumatra Whole Bean Coffee , Dark Roast, 12 Ounce",
            "asin": "B072K4P9LC",
            "link": "https://www.amazon.com/AmazonFresh-Organic-Trade-Sumatra-Coffee/dp/B072K4P9LC/ref=sxin_17_trfobq2a_0_B072K4P9LC?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B072K4P9LC&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-1-efc70162-6775-4820-9b12-f9dadff475c6",
            "categories": [
                {
                    "name": "All Departments",
                    "id": "aps"
                }
            ],
            "image": "https://m.media-amazon.com/images/I/81VE86P+G1L._AC_UL400_.jpg",
            "rating": 4.3,
            "ratings_total": 614,
            "is_carousel": true,
            "carousel": {
                "title": "Top rated from our brands",
                "sub_title": "Amazon’s private brands and select brands",
                "id": "loom-desktop-inline-slot_na-slds-pb-trfobq2a-fa"
            },
            "prices": [
                {
                    "symbol": "$",
                    "value": 8.79,
                    "currency": "USD",
                    "raw": "$8.79",
                    "name": "$8.79",
                    "asin": "B072K4P9LC",
                    "link": "https://www.amazon.com/AmazonFresh-Organic-Trade-Sumatra-Coffee/dp/B072K4P9LC/ref=sxin_17_trfobq2a_0_B072K4P9LC?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B072K4P9LC&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-1-efc70162-6775-4820-9b12-f9dadff475c6"
                }
            ],
            "price": {
                "symbol": "$",
                "value": 8.79,
                "currency": "USD",
                "raw": "$8.79",
                "name": "$8.79",
                "asin": "B072K4P9LC",
                "link": "https://www.amazon.com/AmazonFresh-Organic-Trade-Sumatra-Coffee/dp/B072K4P9LC/ref=sxin_17_trfobq2a_0_B072K4P9LC?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B072K4P9LC&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-1-efc70162-6775-4820-9b12-f9dadff475c6"
            }
        },
        {
            "position": 5,
            "title": "AmazonFresh Just Bright Ground Coffee , Light Roast, 12 Ounce",
            "asin": "B0721BFMTQ",
            "link": "https://www.amazon.com/AmazonFresh-Bright-Ground-Coffee-Light/dp/B0721BFMTQ/ref=sxin_17_trfobq2a_1_B0721BFMTQ?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B0721BFMTQ&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-2-efc70162-6775-4820-9b12-f9dadff475c6",
            "categories": [
                {
                    "name": "All Departments",
                    "id": "aps"
                }
            ],
            "image": "https://m.media-amazon.com/images/I/61DH9C5DNbL._AC_UL400_.jpg",
            "is_prime": true,
            "rating": 4.3,
            "ratings_total": 50349,
            "is_carousel": true,
            "carousel": {
                "title": "Top rated from our brands",
                "sub_title": "Amazon’s private brands and select brands",
                "id": "loom-desktop-inline-slot_na-slds-pb-trfobq2a-fa"
            },
            "prices": [
                {
                    "symbol": "$",
                    "value": 5.87,
                    "currency": "USD",
                    "raw": "$5.87",
                    "name": "$5.87",
                    "is_primary": true
                },
                {
                    "symbol": "$",
                    "value": 6.84,
                    "currency": "USD",
                    "raw": "$6.84",
                    "name": "$5.87",
                    "is_rrp": true
                }
            ],
            "price": {
                "symbol": "$",
                "value": 5.87,
                "currency": "USD",
                "raw": "$5.87",
                "name": "$5.87",
                "is_primary": true
            }
        },
        {
            "position": 6,
            "title": "Amazon Brand - Solimo Ristretto Capsules, Compatible with Nespresso Original Brewers, 50 Count",
            "asin": "B089GR9VBQ",
            "link": "https://www.amazon.com/Amazon-Brand-Ristretto-Compatible-Nespresso/dp/B089GR9VBQ/ref=sxin_17_trfobq2a_2_B089GR9VBQ?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B089GR9VBQ&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-3-efc70162-6775-4820-9b12-f9dadff475c6",
            "categories": [
                {
                    "name": "All Departments",
                    "id": "aps"
                }
            ],
            "image": "https://m.media-amazon.com/images/I/814DYXlVIlS._AC_UL400_.jpg",
            "is_prime": true,
            "rating": 4.1,
            "ratings_total": 3385,
            "is_carousel": true,
            "carousel": {
                "title": "Top rated from our brands",
                "sub_title": "Amazon’s private brands and select brands",
                "id": "loom-desktop-inline-slot_na-slds-pb-trfobq2a-fa"
            },
            "prices": [
                {
                    "symbol": "$",
                    "value": 16.5,
                    "currency": "USD",
                    "raw": "$16.50",
                    "name": "$16.50",
                    "is_primary": true
                },
                {
                    "symbol": "$",
                    "value": 24.99,
                    "currency": "USD",
                    "raw": "$24.99",
                    "name": "$16.50",
                    "is_rrp": true
                }
            ],
            "price": {
                "symbol": "$",
                "value": 16.5,
                "currency": "USD",
                "raw": "$16.50",
                "name": "$16.50",
                "is_primary": true
            }
        },
        {
            "position": 7,
            "title": "Amazon Brand - Solimo Coffee Pods, French Roast, Compatible with Keurig 2.0 K-Cup Brewers, 24 Count",
            "asin": "B07K1ZDSPF",
            "link": "https://www.amazon.com/Amazon-Brand-Solimo-Compatible-Brewers/dp/B07K1ZDSPF/ref=sxin_17_trfobq2a_3_B07K1ZDSPF?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B07K1ZDSPF&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-4-efc70162-6775-4820-9b12-f9dadff475c6",
            "categories": [
                {
                    "name": "All Departments",
                    "id": "aps"
                }
            ],
            "image": "https://m.media-amazon.com/images/I/51GTrbChgEL._AC_UL400_.jpg",
            "is_prime": true,
            "rating": 4.4,
            "ratings_total": 154993,
            "is_carousel": true,
            "carousel": {
                "title": "Top rated from our brands",
                "sub_title": "Amazon’s private brands and select brands",
                "id": "loom-desktop-inline-slot_na-slds-pb-trfobq2a-fa"
            },
            "prices": [
                {
                    "symbol": "$",
                    "value": 13.47,
                    "currency": "USD",
                    "raw": "$13.47",
                    "name": "$13.47",
                    "asin": "B07K1ZDSPF",
                    "link": "https://www.amazon.com/Amazon-Brand-Solimo-Compatible-Brewers/dp/B07K1ZDSPF/ref=sxin_17_trfobq2a_3_B07K1ZDSPF?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B07K1ZDSPF&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-4-efc70162-6775-4820-9b12-f9dadff475c6"
                }
            ],
            "price": {
                "symbol": "$",
                "value": 13.47,
                "currency": "USD",
                "raw": "$13.47",
                "name": "$13.47",
                "asin": "B07K1ZDSPF",
                "link": "https://www.amazon.com/Amazon-Brand-Solimo-Compatible-Brewers/dp/B07K1ZDSPF/ref=sxin_17_trfobq2a_3_B07K1ZDSPF?content-id=amzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1%3Aamzn1.sym.7ad3d84f-ebbc-472f-9619-269a2f0168f1&cv_ct_cx=coffee&keywords=coffee&pd_rd_i=B07K1ZDSPF&pd_rd_r=f3c6b084-d307-400e-afa1-cb7b588149bb&pd_rd_w=ZQmAC&pd_rd_wg=PbfhO&pf_rd_p=7ad3d84f-ebbc-472f-9619-269a2f0168f1&pf_rd_r=FEFZYK9R1TY78J91A8EX&qid=1681864189&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=1-4-efc70162-6775-4820-9b12-f9dadff475c6"
            }
        },
    ]);

    // Search bar
    const [filterName, setFilterName] = useState('');
    const handleInputChange = (event) => {
        setFilterName(event.target.value);
    };
    const handleSearch= async() => {
        await getSearchResults(filterName)
            .then((res) => {
                setProducts(res.data);
            })
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
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
                    <Container maxWidth="none">
                        <Typography variant="h3" paragraph>
                            Products
                        </Typography>

                        <SearchBar
                            width={360}
                            height={48}
                            searchText="Search by Product Name"
                            searchTerm={filterName}
                            setSearchTerm={setFilterName}
                            handleInputChange={handleInputChange}
                            handleSearch={handleSearch}
                            handleKeyPress={handleKeyPress}
                        />
                        <Container maxWidth={themeStretch ? false : 'lg'} style={{marginTop: 32}}>

                          <ShopProductList products={products} loading={!products.length} />
                        </Container>

                    </Container>
                </Main>
                {/*</Container>*/}
            </Box>
        </>
    );
}
