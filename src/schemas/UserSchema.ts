import * as yup from 'yup';

export const UserSchema = yup.object({
  body: yup.object({
    name: yup.string().min(8).max(32).required(),
    email: yup.string().min(8).max(32).required(),
    password: yup.string().min(8).max(32).required(),
  }),
  params: yup.object({
    id: yup.number().required(),
  }),
});

export const idParamSchema = yup.object({
  params: yup.object({
    id: yup.number().required(),
  }),
});
