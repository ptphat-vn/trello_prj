export const AUTH_MESSAGE = {
  VALIDATION_ERROR: 'Validation error',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUSHT_BE_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password must be between 8 and 50 characters',
  PASSWORD_MUST_BE_STRONG: 'Password must be at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol',
  //   Confirm passowrd:
  CONFIM_PASSWORD_IS_REQUIRED: 'Confirm Password is required',
  CONFIRM_PASSWORD_MUST_BE_STRING: 'Confirm Password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm Password must be between 8 and 50 characters',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm Password must be at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm Password must be the same as Password',
  // Date of birth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of Birth must be in ISO8601 date format',
  // AUTH
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or Password is incorrect',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  NAME_MUST_BE_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name must be between 1 and 100 characters',
  NAME_IS_REQUIRED: 'Name is required',

  // Login
  INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
  LOGIN_SUCCESSFULLY: 'Login successfully',
  // Register
  REGISTER_SUCCESSFULLY: 'Register successfully'
} as const
