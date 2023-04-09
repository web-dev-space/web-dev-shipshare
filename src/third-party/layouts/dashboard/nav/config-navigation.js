// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  parcel: icon('nav_parcel'),
  shipment: icon('nav_shipment'),
  group: icon('nav_groups'),
  discover: icon('nav_discover'),
  follow: icon('nav_follow'),
  profile: icon('nav_profile'),
  account: icon('nav_account'),
  help: icon('nav_help'),


  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

const navConfig = [
  // Main Menu
  {
    subheader: 'Main Menu',
    items: [
      { title: 'Parcels', path: '/parcels', icon: ICONS.parcel },
      { title: 'Shipments', path: '/shipments', icon: ICONS.shipment },
      { title: 'Groups', path: '/groups', icon: ICONS.group },
    ],
  },

  // COMMUNITY
  {
    subheader: 'Community',
    path: '/community/',
    items: [
      { title: 'Discover', path: '/community/discover', icon: ICONS.discover },
      { title: 'Follow', path: '/community/follow', icon: ICONS.follow },
      { title: 'My Profile', path: '/community/profile', icon: ICONS.profile },
    ],
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
          { title: 'Account Info', path: '/account/account-info' },
          { title: 'Change Password', path: '/account/change-password'},
        ],
      },
      {
        title: 'Help',
        path: '/help/',
        icon: ICONS.help,
        children: [
          {title: 'Tutorials', path: '/help/tutorials'},
          {title: 'Warehouse Address', path: '/help/warehouse-address'},
          {title: 'Time & Costs', path: '/help/time-costs'},
          {title: 'Calculate Fees', path: '/help/calculate-fees'},
        ],
      }
    ],
  },
];

export default navConfig;
