import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'userPoolId',
  ClientId: 'ClientId', 
};

export default new CognitoUserPool(poolData);