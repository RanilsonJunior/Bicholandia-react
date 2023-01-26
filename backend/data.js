import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Ranilson',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Lila',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  // Produtos ficam aqui.
};
export default data;
