export const usernameValidate = {
    required: {
      value: true,
      message: "Please enter username",
    },
    minLength: {
      value: 6,
      message: "Username must be at least 6 characters long",
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/,
      message: "Username must be alphanumeric",
    },
  };

  export const rollNoValidate = {
    required: {
      value: true,
      message: "Please enter username",
    },
    minLength: {
      value: 8,
      message: "Roll No must be 8 characters long.",
    },
    maxLength: {
      value: 8,
      message: "Roll No must be 8 characters long.",
    },

  };
  
  export const nameValidate = {
    required: {
      value: true,
      message: "Please enter name",
    },
  };

  export const kaggleIDValidate = {
    required: {
      value: true,
      message: "Please enter Kaggle ID to link you data",
    },
  };

  export const phoneNoValidate = {
    required: {
      value: true,
      message: "Please enter phone no.",
    },
  };

  export const emailValidate = {
    required: {
      value: true,
      message: "Please enter an email address",
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email address is not valid",
    },
  };
  
  export const passwordValidate = {
    required: {
      value: true,
      message: "Please enter password",
    },
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  };