import { Handler } from 'infrastructure';
import { signInUser } from 'authenticator';
import customErrorParser from 'customErrorParser';

export const handle = new Handler('User Authenticator')
  .withHttpPayloadParser()
  .withCustomErrorParser(customErrorParser)
  .handle(async (event, context) => {
    const result = await signInUser(event.payload);
    return {
      token: result.idToken.jwtToken,
      refreshToken: result.refreshToken.token
    };
  });
