export interface UserCredentials {
  username: string;
  password: string;
  role?: string;
}

export const users: Record<string, UserCredentials> = {
  BP: {
    username: process.env.USER_BP ?? '',
    password: process.env.PASS_BP ?? '',
    role: 'BP',
  },
  MO: {
    username: process.env.USER_MO ?? '',
    password: process.env.PASS_MO ?? '',
    role: 'MO',
  },
  // ...
};
