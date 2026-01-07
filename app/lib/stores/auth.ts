import { atom } from 'nanostores';

// Hardcoded credentials - change these to your desired values
const VALID_EMAIL = 'tiagocruz3@gmail.com';
const VALID_PASSWORD = 'Thiago77!';

const AUTH_KEY = 'bolt_authenticated';
const isBrowser = typeof window !== 'undefined';

// Check if user is already authenticated from localStorage
const getInitialAuthState = (): boolean => {
  if (!isBrowser) {
    return false;
  }

  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
};

export const isAuthenticatedStore = atom<boolean>(getInitialAuthState());
export const authErrorStore = atom<string | null>(null);

export const login = (email: string, password: string): boolean => {
  authErrorStore.set(null);

  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    isAuthenticatedStore.set(true);

    if (isBrowser) {
      localStorage.setItem(AUTH_KEY, 'true');
    }

    return true;
  }

  authErrorStore.set('Invalid email or password');

  return false;
};

export const logout = () => {
  isAuthenticatedStore.set(false);
  authErrorStore.set(null);

  if (isBrowser) {
    localStorage.removeItem(AUTH_KEY);
  }
};

export const clearAuthError = () => {
  authErrorStore.set(null);
};

