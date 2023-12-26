export const SIGN_UP_CONSTANTS = {
  patternPassword:
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$',

  validationMessage: {
    name: {
      required: 'Name is required',
    },

    email: {
      required: 'Email is required',
      email: 'Please provide a valid email',
    },

    password: {
      required: 'Password is required',
      pattern: 'Please provide a valid password',
    },
  },
};
