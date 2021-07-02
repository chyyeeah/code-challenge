import { cleanup, render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    cleanup();
  });

  test('rendering', () => {
    const { getByRole, getByLabelText } = render(<CreateAccount />);
    expect(getByRole('textbox',  {name: 'Username' })).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByRole('button', { name: 'Create Account' })).toBeTruthy();
  });

  test('Password has been exposed', async () => {
    const { getByRole, getByLabelText } = render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({ result: true }));
    userEvent.type(getByRole('textbox',  { name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));

    await act(() => Promise.resolve());
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: '{\"password\":\"wilson\"}',
      method: 'POST',
    });
    const checkboxLabel = 'Continue with exposed password.';
    expect(getByRole('checkbox', {name: checkboxLabel })).toBeTruthy();
  });

  test('Password has not been exposed', async () => {
    const { getByRole, getByLabelText } = render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));

    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: '{\"password\":\"wilson\"}',
      method: 'POST',
    });
    await act(() => Promise.resolve());
  });

  test('Successful account creation', async () => {
    const { getByRole, getByLabelText } = render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    fetchMock.mockResponseOnce(JSON.stringify({ result: true }));
    await act(() => Promise.resolve());
    expect(fetchMock).toBeCalledTimes(2);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: '{\"password\":\"wilson\"}',
      method: 'POST',
    });
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: '{\"username\":\"wilson\",\"password\":\"wilson\"}',
      method: 'POST',
    });
  });

  test('Unsuccessful account creation', async () => {
    const { getByRole, getByLabelText } = render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    await act(() => Promise.resolve());
    expect(fetchMock).toBeCalledTimes(2);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: '{\"password\":\"wilson\"}',
      method: 'POST',
    });
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: '{\"username\":\"wilson\",\"password\":\"wilson\"}',
      method: 'POST',
    });
  });
});
