import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, saltRounds: number) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
