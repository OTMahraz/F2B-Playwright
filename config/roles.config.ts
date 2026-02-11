export const roles: Record<string, UserCredentials> = {
  BP: {
    username: process.env.USER_BP ?? '',
    password: process.env.PASS_BP ?? '',
    role: 'BP',
  },
  Assistante: {
    username: process.env.USER_Assistante ?? '',
    password: process.env.PASS_Assistante ?? '',
    role: 'Assistante',
  },
  MO: {
    username: process.env.USER_MO ?? '',
    password: process.env.PASS_MO ?? '',
    role: 'MO',
  },
  DC: {
    username: process.env.USER_DC ?? '',
    password: process.env.PASS_DC ?? '',
    role: 'MO',
  },
};

export interface UserCredentials {
  username: string;
  password: string;
  role?: string; // optionnel si tu veux aussi transporter le rôle
};


//ROLE=BP npx playwright test
//ROLE=MO npx playwright test