import * as PATHS from '../app-routing/routes';

export interface SideMenuItems {
  ref: string;
  path: string;
  title: string;
  masked?: boolean;
}

export const items: Array<SideMenuItems> = [{
  ref: 'home',
  path: PATHS.HOME_PATH,
  title: 'Home',
}, {
  ref: 'profile',
  path: PATHS.PROFILE_PATH,
  title: 'My profile',
}, {
  ref: 'admin',
  path: PATHS.ADMIN_DASHBOARD_PATH,
  title: 'Admin Dashboard',
}];

export const authItems: Array<SideMenuItems> = [{
  ref: 'login',
  path: PATHS.LOGIN_PATH,
  title: 'Log in',
}, {
  ref: 'register',
  path: PATHS.REGISTER_PATH,
  title: 'Sign in',
}];

export const optItems: Array<SideMenuItems> =  [];

const newItems: Array<SideMenuItems> = [{
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
