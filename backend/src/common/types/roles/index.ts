import { IRoleCategoryDetails } from 'src/common/interface/roles/base';

export enum Roles {
  // User
  SUPER_USER = 'SUPER_USER',
  ADMIN = 'ADMIN',
  BANNED = 'BANNED',
  SUSPENDED = 'SUSPENDED',

  ACCESS_PROFILE = 'ACCESS_PROFILE',
  VIEW_DEVICES = 'VIEW_DEVICES',
  REMOVE_DEVICES = 'REMOVE_DEVICES',
  LOGIN = 'LOGIN',

  // Currency
  CREATE_CURRENCY = 'CREATE_CURRENCY',
  READ_CURRENCY = 'READ_CURRENCY',
  UPDATE_CURRENCY = 'UPDATE_CURRENCY',
  DELETE_CURRENCY = 'DELETE_CURRENCY',
  USE_CURRENCY = 'USE_CURRENCY',
}

export const DEFAULT_ROLES = [
  // Currency
  Roles.READ_CURRENCY,
  Roles.USE_CURRENCY,

  // User
  Roles.ACCESS_PROFILE,
  Roles.VIEW_DEVICES,
  Roles.LOGIN,
  Roles.REMOVE_DEVICES,
];

export const ROLES_DETAILS: IRoleCategoryDetails[] = [
  {
    name: 'User',
    description:
      'Account related access levels and can be used for managing your account',
    roles: [
      {
        name: 'Super User',
        description: 'Unrestricted access to all the features',
        role_id: Roles.SUPER_USER,
        active: false,
      },
      {
        name: 'Admin',
        description:
          'Administration to the application including enabling roles to users',
        role_id: Roles.ADMIN,
        active: false,
      },
      {
        name: 'Banned',
        description: 'Permanently restricted access to the application',
        role_id: Roles.BANNED,
        active: false,
      },
      {
        name: 'Suspended',
        description: 'Temporarily restricted access to the application',
        role_id: Roles.SUSPENDED,
        active: false,
      },
      {
        name: 'Access Profile',
        description: 'Access to your profile',
        role_id: Roles.ACCESS_PROFILE,
        active: false,
      },
      {
        name: 'View Devices',
        description: 'View devices linked to your account',
        role_id: Roles.VIEW_DEVICES,
        active: false,
      },
      {
        name: 'Remove Devices',
        description: 'Remove devices linked to your account',
        role_id: Roles.REMOVE_DEVICES,
        active: false,
      },
      {
        name: 'Login',
        description: 'Access to login to the application',
        role_id: Roles.LOGIN,
        active: false,
      },
    ],
  },
  {
    name: 'Currency',
    description: 'A currency is a medium of exchange for goods and services',
    roles: [
      {
        name: 'Create Currency',
        description: 'Create a new currency',
        role_id: Roles.CREATE_CURRENCY,
        active: false,
      },
      {
        name: 'Read Currency',
        description: 'Access to view currencies and their details',
        role_id: Roles.READ_CURRENCY,
        active: false,
      },
      {
        name: 'Update Currency',
        description: 'Update currency details',
        role_id: Roles.UPDATE_CURRENCY,
        active: false,
      },
      {
        name: 'Delete Currency',
        description: 'Delete a currency',
        role_id: Roles.DELETE_CURRENCY,
        active: false,
      },
      {
        name: 'Use Currency',
        description: 'Use currency in your trips',
        role_id: Roles.USE_CURRENCY,
        active: false,
      },
    ],
  },
];
