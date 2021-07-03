import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  test('returns true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: { username: 'mynameiswilson8@', password: 'thispasswordisgood9#' },
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true,
    });
  });

  test('returns false with invalid username', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: { username: '@', password: 'thispasswordisgood9#' },
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { isUsernameInvalid: 'true' }
    });
  });

  test('returns false with invalid password', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: { username: 'mynameiswilson8@', password: '#' },
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { isPasswordInvalid: 'true' }
    });
  });

  test('returns false with both invalid username and invalid password', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: { username: '@', password: '#' },
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: { isUsernameInvalid: 'true', isPasswordInvalid: 'true' }
    });
  });
});
