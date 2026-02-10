/**
 * Données de test centralisées
 */
export const testData = {
  validUser: {
    email: 'test.user@example.com',
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
  },
  adminUser: {
    email: 'admin@example.com',
    password: 'AdminPassword123!',
    firstName: 'Admin',
    lastName: 'User',
  },
  invalidCredentials: {
    email: 'invalid@example.com',
    password: 'WrongPassword123!',
  },
  emptyCredentials: {
    email: '',
    password: '',
  },
  invalidEmail: {
    email: 'not-an-email',
    password: 'SomePassword123!',
  },
};

export const apiTestData = {
  validUser: {
    name: 'Test User',
    email: 'test.api@example.com',
    password: 'TestPassword123!',
  },
  newPost: {
    title: 'Test Post',
    content: 'This is a test post content',
    tags: ['test', 'automation'],
  },
  updatePost: {
    title: 'Updated Post Title',
    content: 'Updated content',
  },
};

export const endpoints = {
  login: '/auth/login',
  logout: '/auth/logout',
  user: '/api/user',
  posts: '/api/posts',
  comments: '/api/comments',
};
