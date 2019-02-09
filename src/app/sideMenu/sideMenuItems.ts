import * as PATHS from '../app-routing/routes';

export interface SideMenuItems {
  ref: string;
  path: string;
  title: string;
  masked?: boolean;
}

export const items: Array<SideMenuItems> = [{
  ref: 'home',
  path: PATHS.HOME_ROUTE,
  title: 'Home',
}, {
  ref: 'admin',
  path: PATHS.ADMIN_DASHBOARD_ROUTE,
  title: 'Admin Dashboard',
}];

export const authItems: Array<SideMenuItems> = [{
  ref: 'login',
  path: PATHS.LOGIN_ROUTE,
  title: 'Login',
}, {
  ref: 'register',
  path: PATHS.REGISTER_ROUTE,
  title: 'Sign in',
}];

export const optItems: Array<SideMenuItems> = [{
  ref: 'aa',
  path: 'aa',
  title: 'aa',
}, {
  ref: 'cc',
  path: 'bb',
  title: 'bb',
  masked: true,
}, {
  ref: 'cc',
  path: 'cc',
  title: 'cc'
}];
