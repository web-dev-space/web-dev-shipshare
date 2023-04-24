// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  home: icon('nav_home'),
  parcel: icon('nav_parcel'),
  shipment: icon('nav_shipment'),
  group: icon('nav_groups'),
  discover: icon('nav_discover'),
  follow: icon('nav_follow'),
  profile: icon('nav_profile'),
  account: icon('nav_account'),
  help: icon('nav_help'),
  dashboard: icon('ic_dashboard'),
  products: icon('ic_ecommerce'),
};

// ----------------------------------------------------------------------

function navConfig(role) {
  if (role === 'visitor') {
    return ([
      // Main Menu
      {
        subheader: 'Main',
        items: [
          { title: 'Home', path: '/home', icon: ICONS.home },
          { title: 'Parcels', path: '/parcels', icon: ICONS.parcel },
          { title: 'Shipments', path: '/shipments', icon: ICONS.shipment },
          { title: 'Groups', path: '/groups', icon: ICONS.group },
        ],
      },

      // COMMUNITY
      {
        subheader: 'Community',
        items: [
          { title: 'Discover', path: '/community/discover', icon: ICONS.discover },
          { title: 'Product Reviews', path: '/search', icon: ICONS.products },
        ]
      },

      // More
      {
        subheader: 'More',
        items: [
          {
            title: 'Help',
            path:  '/help/',
            icon: ICONS.help,
            children: [
              {title: 'Tutorials', path: '/help/tutorials'},
              {title: 'Time & Costs', path: '/help/time-costs'},
              {title: 'Calculate Fees', path: '/help/calculate-fees'},
            ],
          }
        ]
      }
    ]);
  }
  return ([
      // Main Menu
      {
        subheader: 'Main',
        items: [
          role === 'buyer' ? { title: 'Home', path: '/home', icon: ICONS.home } : null,
          role === 'admin' || role === "merchant"
              ? { title: 'Home', path: '/home', icon: ICONS.dashboard }
              : null,
          role === 'admin'
              ? { title: 'User List', path: '/userlist', icon: ICONS.profile }
              : null,
          { title: 'Parcels', path: '/parcels', icon: ICONS.parcel },
          { title: 'Shipments', path: '/shipments', icon: ICONS.shipment },
          { title: 'Groups', path: '/groups', icon: ICONS.group },
        ].filter(Boolean), // filter null values
      },

    // COMMUNITY
      {
        subheader: 'Community',
        items: [
          { title: 'Discover', path: '/community/discover', icon: ICONS.discover },
          { title: 'Product Reviews', path: '/search', icon: ICONS.products },
          role === "merchant" || role === "admin"
            ? null
            :{ title: 'My Profile', path: '/profile', icon: ICONS.profile },
        ].filter(Boolean) // filter null values
      },

      // More
      {
        subheader: 'More',
        items: [
          {
            title: 'Account',
            path: '/account/',
            icon: ICONS.account,
            children: [
              {title: 'Account Info', path: '/account/account-info'},
              {title: 'Change Password', path: '/account/change-password'},
              role === 'merchant'
                  ? {title: 'Change Warehouse Address', path: '/account/change-warehouse-address'}
                  : null,
            ].filter(Boolean), // filter null values
          },
          {
            title: 'Help',
            path:  '/help/',
            icon: ICONS.help,
            children: [
              {title: 'Tutorials', path: '/help/tutorials'},
              {title: 'Warehouse Address', path: '/help/warehouse-address'},
              {title: 'Time & Costs', path: '/help/time-costs'},
              {title: 'Calculate Fees', path: '/help/calculate-fees'},
            ],
          }
        ]
      }
    ]);
}

export default navConfig;
