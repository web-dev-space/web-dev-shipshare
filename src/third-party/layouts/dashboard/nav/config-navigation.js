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


  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

function navConfig(role) {
  // get the role, to set the nav paths
  const rootPath = "/"+role;


  return ([
      // Main Menu
      {
        subheader: 'Main',
        items: [
          role === 'admin' || role === "merchant"
              ? { title: 'Dashboard', path: rootPath + '/dashboard', icon: ICONS.dashboard }
              : null,
          role === 'admin'
              ? { title: 'User List', path: rootPath + '/userlist', icon: ICONS.profile }
              : null,
          { title: 'Parcels', path: rootPath + '/parcels', icon: ICONS.parcel },
          { title: 'Shipments', path: rootPath + '/shipments', icon: ICONS.shipment },
          { title: 'Groups', path: rootPath + '/groups', icon: ICONS.group },
        ].filter(Boolean), // filter null values
      },

    // COMMUNITY
      {
        subheader: 'Community',
        items: [
          { title: 'Discover', path: rootPath + '/community/discover', icon: ICONS.discover },
          role === "merchant" || role === "admin"
            ? null
            :{ title: 'My Profile', path: rootPath + '/community/profile', icon: ICONS.profile },
        ].filter(Boolean) // filter null values
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
              role === 'merchant' || role === 'admin'
                  ? {title: 'Change Warehouse Address', path: rootPath+'/change-warehouse-address'}
                  : null,
            ].filter(Boolean), // filter null values
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
