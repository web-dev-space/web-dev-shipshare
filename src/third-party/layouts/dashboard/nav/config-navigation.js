// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

const navConfig = [
  // Main Menu
  {
    subheader: 'Main Menu',
    items: [
      { title: 'Parcels', path: '/parcels', icon: ICONS.dashboard },
      { title: 'Shipments', path: '/shipments', icon: ICONS.ecommerce },
      { title: 'Groups', path: '/groups', icon: ICONS.analytics },
    ],
  },

  // COMMUNITY
  {
    subheader: 'Community',
    path: '/community/',
    items: [
      { title: 'Discover', path: '/community/discover', icon: ICONS.user },
      { title: 'Follow', path: '/community/follow', icon: ICONS.user },
      { title: 'My Profile', path: '/community/profile', icon: ICONS.user },
    ],
  },

  // More
  {
    subheader: 'More',
    items: [
      {
        title: 'Account',
        path: '/account/',
        icon: ICONS.user,
        children: [
          { title: 'Account Info', path: '/account/account-info' },
          { title: 'Change Password', path: '/account/change-password'},
        ],
      },
      {
        title: 'Help',
        path: '/help/',
        icon: ICONS.user,
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
