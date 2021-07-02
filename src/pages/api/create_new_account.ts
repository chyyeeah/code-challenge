import type { NextApiRequest, NextApiResponse } from 'next';
import validators from 'src/utils/validators';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password }: CreateNewAccountParameters = JSON.parse(req.body);
  const isUsernameValid = validators.validateUsername(username);
  const isPasswordValid = validators.validatePassword(password);

  if (!isUsernameValid || !isPasswordValid) {
    const errorPayload: Record<string, string> = {};
    if (!isUsernameValid) errorPayload.isUsernameValid = 'false';
    if (!isPasswordValid) errorPayload.isPasswordValid = 'false';

    res.status(200).json({
      result: false,
      errors: errorPayload
    });
  } else {
    res.status(200).json({ result: true });
  }
}
