import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { loggerFactory } from 'infrastructure';

const logger = loggerFactory.getFrom('User Pool Connector');

let userPoolConnected;

const getUserPool = () => {
  if (userPoolConnected) {
    logger.info('Re-using user pool connection from context');
    return Promise.resolve(userPoolConnected);
  }

  logger.info('Creating a new user pool connection');
  userPoolConnected = new CognitoUserPool({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    Region: process.env.AWS_ENVIRONMENT_REGION
  });

  return Promise.resolve(userPoolConnected);
};

export default getUserPool;
