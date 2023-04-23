// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  parcels: path(ROOTS_DASHBOARD, '/parcels'),
  shipments: path(ROOTS_DASHBOARD, '/shipments'),
  groups: path(ROOTS_DASHBOARD, '/groups'),

  discover: path(ROOTS_DASHBOARD, '/discover'),
  follow: path(ROOTS_DASHBOARD, '/follow'),
  profile: path(ROOTS_DASHBOARD, '/profile'),

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    one: path(ROOTS_DASHBOARD, '/user/change-password'),
    two: path(ROOTS_DASHBOARD, '/user/two'),
    three: path(ROOTS_DASHBOARD, '/user/three'),
  },
  help: {
    root: path(ROOTS_DASHBOARD, '/help'),
    one: path(ROOTS_DASHBOARD, '/help/one'),
    two: path(ROOTS_DASHBOARD, '/help/two'),
    three: path(ROOTS_DASHBOARD, '/help/three'),
    four: path(ROOTS_DASHBOARD, '/help/four'),
  },
};
