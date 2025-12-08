import bcrypt from "bcryptjs";

export const passwordHasher = async (password: string) => {
  const saltRounds = process.env.SALT_ROUNDS
    ? parseInt(process.env.SALT_ROUNDS)
    : 10;
  return await bcrypt.hash(password, saltRounds);
};

export const passwordChecker = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
