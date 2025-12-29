export const API_URL: string = "https://easydev.club/api/v1";
export const TIME: number = 5000;
export const VALIDATE_CHAR_TODO: { MIN: number; MAX: number } = {
  MIN: 2,
  MAX: 64,
};

export const VALIDATE_CHAR_FORM_REGISTRATION: {
  MIN_CHAR_NAME_USER: number;
  MIN_CHAR_LOGIN: number;
  MIN_CHAR_PASSWORD: number;
  MAX_CHAR_NAME_USER: number;
  MAX_CHAR_LOGIN: number;
  MAX_CHAR_PASSWORD: number;
} = {
  MIN_CHAR_NAME_USER: 1,
  MIN_CHAR_LOGIN: 2,
  MIN_CHAR_PASSWORD: 6,
  MAX_CHAR_NAME_USER: 60,
  MAX_CHAR_LOGIN: 60,
  MAX_CHAR_PASSWORD: 60,
};
