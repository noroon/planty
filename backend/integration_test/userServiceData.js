// Login test data
export const TEST_EXCEPTION = 'Test exception';

export const anyUserEmail = 'any@email.com';

export const anyUserPassword = 'anyuserpassword';

export const unregisteredUserEmail = 'unregistered@test.com';

export const registeredUserEmail = 'johndoe@test.com';

export const registeredUserPlainPwd = 'password123';

// eslint-disable-next-line operator-linebreak
export const registeredUserEncryptedPwd =
  '$2b$10$jwQMB4YgnuaqYV1avl7QceZnSO44ijfZvf1svtafFFtE4f452.SI.';

export const registeredUser = {
  _id: {
    $oid: '625d60074477ad49392e7643',
  },
  name: 'John Doe',
  password: registeredUserEncryptedPwd,
  email: registeredUserEmail,
  isAdmin: false,
  isVerified: false,
};
