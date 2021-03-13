import {BACKEND_HOST} from '../config/env';

const MAIN_URL = BACKEND_HOST;
const API = '/api';
const LOST = '/lost';
const FOUND = '/found';
const FILE = '/file';
const QR = '/qr';

const AUTH = '/auth';
const LOGIN = '/login';
const LOGOUT = '/logout';
const REGISTER = '/register';
const RESET_PASSWORD = '/release-reset-password-code';
const RELEASE_NEW_TOKENS = '/release-refresh-token';

const PRIVATE_PROFILE = '/private-profile';
const MARK_AS = '/mark-as';
const SEND_TO_MAIL = '/send-to-mail';

export const LOST_URI = MAIN_URL + API + LOST;
export const FOUND_URI = MAIN_URL + API + FOUND;
export const FILE_URI = MAIN_URL + API + FILE;

export const AUTH_URI = MAIN_URL + API + AUTH;
export const AUTH_LOGIN_URI = MAIN_URL + API + AUTH + LOGIN;
export const AUTH_LOGOUT_URI = MAIN_URL + API + AUTH + LOGOUT;
export const AUTH_REGISTER_URI = MAIN_URL + API + AUTH + REGISTER;
export const AUTH_RESET_PASSWORD_URI = MAIN_URL + API + AUTH + RESET_PASSWORD;
export const AUTH_RELEASE_NEW_TOKENS_URI = MAIN_URL + API + AUTH + RELEASE_NEW_TOKENS;

export const PRIVATE_PROFILE_URI = MAIN_URL + API + PRIVATE_PROFILE;
export const PRIVATE_PROFILE_MARK_AS_URI =
    MAIN_URL + API + PRIVATE_PROFILE + MARK_AS;
export const PRIVATE_PROFILE_SEND_TO_MAIL_URI =
    MAIN_URL + API + PRIVATE_PROFILE + SEND_TO_MAIL;

export const QR_URI = MAIN_URL + API + QR;

export const AGREEMENT_URI = MAIN_URL + '/agreement';
export const PRIVACY_URI = MAIN_URL + '/confidential';
