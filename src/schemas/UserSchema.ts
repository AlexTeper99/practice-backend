import * as yup from 'yup';

export const UserPostSchema = yup.object({
  body: yup.object({
    firstName: yup.string().min(4).max(32).required(),
    lastName: yup.string().min(4).max(32).required(),
    firstNameKana: yup.string().min(4).max(32).required(),
    lastNameKana: yup.string().min(4).max(32).required(),
    phoneNumber: yup.string().min(8).max(32).required(),
    email: yup.string().min(8).max(32).required(),
    gender: yup.string().oneOf(['male', 'female'], 'Gender must be male or female').required(),
    birthDate: yup.date().required(),
    password: yup.string().min(8).max(32).required(),
    newsletterSuscribed: yup.boolean().required(),
    newsletterPartnersSuscribed: yup.boolean().required(),
  }),
});

export const UserLoginSchema = yup.object({
  body: yup.object({
    email: yup.string().min(8).max(32).required(),
    password: yup.string().min(8).max(32).required(),
  }),
});

export const UserPutSchema = yup.object({
  body: yup.object({
    firstName: yup.string().min(4).max(32).required(),
    lastName: yup.string().min(4).max(32).required(),
    firstNameKana: yup.string().min(4).max(32).required(),
    lastNameKana: yup.string().min(4).max(32).required(),
    phoneNumber: yup.string().min(8).max(32).required(),
    phoneNumberTwo: yup.string().min(8).max(32),
    gender: yup.string().oneOf(['male', 'female'], 'Gender must be male or female').required(),
    newsletterSuscribed: yup.boolean().required(),
    newsletterPartnersSuscribed: yup.boolean().required(),
  }),
  params: yup.object({
    id: yup.number().required(),
  }),
});

export const UserPasswordPutSchema = yup.object({
  body: yup.object({
    currentPassword: yup.string().min(8).max(32).required(),
    newPassword: yup.string().min(8).max(32).required(),
    confirmationNewPassword: yup.string().min(8).max(32).required(),
  }),
  params: yup.object({
    id: yup.number().required(),
  }),
});

export const IdParamSchema = yup.object({
  params: yup.object({
    id: yup.number().required(),
  }),
});
