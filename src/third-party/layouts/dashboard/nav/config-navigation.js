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

function navConfig(role) {
  // get the role, to set the nav paths
  const rootPath = "/"+role;

  return ([
      // Main Menu
      {
        subheader: 'Main Menu',
        items: [
          { title: 'Parcels', path: rootPath+'/parcels', icon: ICONS.parcel },
          { title: 'Shipments', path: rootPath+'/shipments', icon: ICONS.shipment },
          { title: 'Groups', path: rootPath+'/groups', icon: ICONS.group },
        ],
      },

      // COMMUNITY
      {
        subheader: 'Community',
        items: [
          { title: 'Discover', path: rootPath+'/community/discover', icon: ICONS.discover },
          { title: 'Follow', path: rootPath+'/community/follow', icon: ICONS.follow },
          { title: 'My Profile', path: rootPath+'/community/profile', icon: ICONS.profile },
        ],
      },

      // More
      {
        subheader: 'More',
        items: [
          {
            title: 'Account',
            path: rootPath + '/account/',
            icon: ICONS.account,
            children: [
              {title: 'Account Info', path: rootPath+'/account/account-info'},
              {title: 'Change Password', path: rootPath+'/account/change-password'},
            ],
          },
          {
            title: 'Help',
            path: rootPath + '/help/',
            icon: ICONS.help,
            children: [
              {title: 'Tutorials', path: rootPath+'/help/tutorials'},
              {title: 'Warehouse Address', path: rootPath+'/help/warehouse-address'},
              {title: 'Time & Costs', path: rootPath+'/help/time-costs'},
              {title: 'Calculate Fees', path: rootPath+'/help/calculate-fees'},
            ],
          }
        ]
      }
    ]);
}

export default navConfig;
