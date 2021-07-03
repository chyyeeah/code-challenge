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

  test('Calls /api/password_exposed', async () => {
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

  test('Renders out a bypass warning option if password has been exposed', async () => {
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

  test('Calls /api/create_new_account if password has not been exposed', async () => {
    const { getByRole, getByLabelText } = render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({ result: false }));
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    fetchMock.mockResponseOnce(JSON.stringify({ result: true }));
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/password_exposed', {
      body: '{\"password\":\"wilson\"}',
      method: 'POST',
    });
    await act(() => Promise.resolve());
    expect(fetchMock).toBeCalledTimes(2);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
      body: '{\"username\":\"wilson\",\"password\":\"wilson\"}',
      method: 'POST',
    });
  });

  test('Renders out an "Account Created" message if account creation was successful', async () => {
    const { getByRole, getByLabelText, getByText } = render(<CreateAccount />);
    fetchMock
      .mockResponseOnce(JSON.stringify({ result: false }))
      .mockResponseOnce(JSON.stringify({ result: true }));
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    await act(() => Promise.resolve());
    expect(getByText('Account Created! Redirecting to Login page...')).toBeTruthy();
  });

  test('Allows a user to bypass the password exposed warning to create an account', async () => {
    const { getByRole, getByLabelText, getByText } = render(<CreateAccount />);
    fetchMock
      .mockResponseOnce(JSON.stringify({ result: true }))
      .mockResponseOnce(JSON.stringify({ result: true }))
      .mockResponseOnce(JSON.stringify({ result: true }));
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    await act(() => Promise.resolve());
    const checkboxLabel = 'Continue with exposed password.';
    userEvent.click(getByRole('checkbox', {name: checkboxLabel }));
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    await act(() => Promise.resolve());
    expect(getByText('Account Created! Redirecting to Login page...')).toBeTruthy();
  });

  test('Renders an asterick on the Username label if the username provided is invalid', async () => {
    const { getByRole, getByLabelText, queryByLabelText } = render(<CreateAccount />);
    fetchMock
      .mockResponseOnce(JSON.stringify({ result: false }))
      .mockResponseOnce(JSON.stringify({ result: false, errors: {isUsernameInvalid: 'true'} }));
    expect(queryByLabelText(/Username.*\*/)).toBeFalsy();
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    await act(() => Promise.resolve());
    expect(queryByLabelText(/Username.*\*/)).toBeTruthy();
  });

  test('Renders an asterick on the Password label if the password provided is invalid', async () => {
    const { getByRole, getByLabelText, queryByLabelText } = render(<CreateAccount />);
    fetchMock
      .mockResponseOnce(JSON.stringify({ result: false }))
      .mockResponseOnce(JSON.stringify({ result: false, errors: {isPasswordInvalid: 'true'} }));
    expect(queryByLabelText(/Password.*\*/)).toBeFalsy();
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    await act(() => Promise.resolve());
    expect(queryByLabelText(/Password.*\*/)).toBeTruthy();
  });

  test('Renders an asterick on the Username and Password label if both the username and password provided are invalid', async () => {
    const { getByRole, getByLabelText, queryByLabelText } = render(<CreateAccount />);
    fetchMock
      .mockResponseOnce(JSON.stringify({ result: false }))
      .mockResponseOnce(JSON.stringify({
        result: false,
        errors: {
          isUsernameInvalid: 'true',
          isPasswordInvalid: 'true'
        }
      }));
    expect(queryByLabelText(/Username.*\*/)).toBeFalsy();
    expect(queryByLabelText(/Password.*\*/)).toBeFalsy();
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    await act(() => Promise.resolve());
    expect(queryByLabelText(/Username.*\*/)).toBeTruthy();
    expect(queryByLabelText(/Password.*\*/)).toBeTruthy();
  });

  test('When the username provided is invalid, display a tooltip when the focus is on the username input', async () => {
    const { getByRole, getByLabelText, queryByLabelText, queryByText } = render(<CreateAccount />);
    fetchMock
      .mockResponseOnce(JSON.stringify({ result: false }))
      .mockResponseOnce(JSON.stringify({ result: false, errors: { isUsernameInvalid: 'true' } }));
    expect(queryByLabelText(/Username.*\*/)).toBeFalsy();
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    userEvent.click(getByRole('textbox',  {name: 'Username' }));
    await act(() => Promise.resolve());
    expect(queryByText(/Must be at least 10 characters/)).toBeTruthy();
  });

  test('When the password provided is invalid, display a tooltip when the focus is on the password input', async () => {
    const { getByRole, getByLabelText, queryByLabelText, queryByText } = render(<CreateAccount />);
    fetchMock
      .mockResponseOnce(JSON.stringify({ result: false }))
      .mockResponseOnce(JSON.stringify({ result: false, errors: { isPasswordInvalid: 'true' } }));
    expect(queryByLabelText(/Password.*\*/)).toBeFalsy();
    userEvent.type(getByRole('textbox',  {name: 'Username' }), 'wilson');
    userEvent.type(getByLabelText('Password'), 'wilson');
    fireEvent.click(getByRole('button', { name: 'Create Account' }));
    userEvent.click(getByLabelText('Password'));
    await act(() => Promise.resolve());
    expect(queryByText(/Must be at least 20 characters/)).toBeTruthy();
  });
});
