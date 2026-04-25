export const passwordRules = [
  {
    label: "Must be 8 to 16 characters long",
    test: (value) => value.length >= 8 && value.length <= 16,
  },

  {
    label: "At least 1 lowercase letter",
    test: (value) => /[a-z]/.test(value),
  },

  {
    label: "At least 1 uppercase letter",
    test: (value) => /[A-Z]/.test(value),
  },

  {
    label: "At least 1 number",
    test: (value) => /[0-9]/.test(value),
  },

  {
    label: "At least 1 special character",
    test: (value) => /[!@#$%^&*(){}~`'".,:;<>?]/.test(value),
  },
];

export const usernameRules = [
  {
    label: "Must be 3 to 15 characters long",
    test: (value) => /^.{3,15}$/.test(value),
  },
  {
    label: "Must start with a letter",
    test: (value) => /^[a-zA-Z]/.test(value),
  },
  {
    label:
      "Only contains letters, numbers, and the following punctuation: underscore (_), dash (-), and period (.)",
    test: (value) => /^[a-zA-Z0-9._-]+$/.test(value),
  },
];
