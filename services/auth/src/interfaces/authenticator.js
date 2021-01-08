import { AuthenticationDetails, CognitoRefreshToken, CognitoUser } from 'amazon-cognito-identity-js';
import getUserPool from './userPoolConnector';

export const signUpUser = async ({ email, password }) => {
  const userPool = await getUserPool();
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, null, null, (error) => {
      if (error) reject(error);
      resolve('The user was succesfully registered');
    });
  });
};

const signInCallbacks = (resolve, rejects) => ({
  onSuccess: (result) => {
    return resolve(result);
  },
  onFailure: (error) => {
    rejects(error);
  }
});

export const signInUser = async ({ email, password }) => {
  const authenticationDetails = new AuthenticationDetails(
    { Username: email, Password: password }
  );

  const user = new CognitoUser({
    Username: email,
    Pool: await getUserPool()
  });

  return new Promise((resolve, rejects) => {
    user.authenticateUser(
      authenticationDetails,
      signInCallbacks(resolve, rejects)
    );
  });
};

export const renewSession = async ({ email, refreshToken }) => {
  const oldRefreshToken = new CognitoRefreshToken({
    RefreshToken: refreshToken
  });

  const user = new CognitoUser({
    Username: email,
    Pool: await getUserPool()
  });

  return new Promise((resolve, rejects) => {
    user.refreshSession(oldRefreshToken, (error, result) => {
      if (error) rejects(error);
      resolve(result);
    });
  });
};
