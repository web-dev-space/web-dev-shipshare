// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
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
      { title: 'Parcels', path: PATH_DASHBOARD.parcels, icon: ICONS.dashboard },
      { title: 'Shipments', path: PATH_DASHBOARD.shipments, icon: ICONS.ecommerce },
      { title: 'Groups', path: PATH_DASHBOARD.groups, icon: ICONS.analytics },
    ],
  },

  // COMMUNITY
  {
    subheader: 'Community',
    items: [
      { title: 'Discover', path: PATH_DASHBOARD.discover, icon: ICONS.user },
      { title: 'Follow', path: PATH_DASHBOARD.follow, icon: ICONS.user },
      { title: 'My Profile', path: PATH_DASHBOARD.profile, icon: ICONS.user },
    ],
  },

  // MMore
  {
    subheader: 'More',
    items: [
      {
        title: 'Account',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Change Password', path: PATH_DASHBOARD.user.one },
          { title: 'Two', path: PATH_DASHBOARD.user.two },
          { title: 'Three', path: PATH_DASHBOARD.user.three },
        ],
      },
      {
        title: 'Help',
        path: PATH_DASHBOARD.help.root,
        icon: ICONS.user,
        children: [
          {title: 'Tutorials', path: PATH_DASHBOARD.help.one},
          {title: 'Warehouse Address', path: PATH_DASHBOARD.help.two},
          {title: 'Time & Costs', path: PATH_DASHBOARD.help.three},
          {title: 'Calculate Fees', path: PATH_DASHBOARD.help.four},
        ],
      }
    ],
  },
];

export default navConfig;
